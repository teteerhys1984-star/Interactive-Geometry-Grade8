import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';
import { isNotebookStep } from '@/components/navigation';
import railStyles from '@/components/navigation/StepRail.module.css';
import { allLessons, getLesson } from '@/content/registry';
import { lessonStepSchema } from '@/content/schema';
import type { ContentBlock } from '@/content/schema';
import { lesson09Assessment } from '@/content/units/lesson-09-assessment';
import { lesson09Notebook } from '@/content/units/lesson-09-notebook';
import {
  L9_KNOWLEDGE_SOLUTION,
  L9_PRINTED_PROMPTS,
  L9_THEOREM_STATEMENT,
} from '@/content/units/lesson-09-questions';
import { lesson09TeacherResources } from '@/content/units/lesson-09-teacher';
import { step09LabAndProof, step09Recap } from '@/content/units/lesson-09-teaching';
import { hasUnisolatedNotation } from '@/lib/bidi';
import { loadProgress, resetProgress } from '@/lib/progress';
import { routes } from '@/lib/routes';
import { TEACHER_PASSPHRASE, lockTeacherArea, unlockTeacherArea } from '@/lib/teacherAccess';
import pageStyles from '@/routes/LessonStepPage.module.css';
import { questions as testBankQuestions } from '@/tests/questions/lesson-09';
import { solutionSet as testBankSolutions } from '@/tests/solutions/lesson-09-test';

const LESSON_ID = 'lesson-09-parallel-from-midpoint';
const NOTEBOOK_ID = 'lesson-09-student-notebook';
const NOTEBOOK_TITLE = '📒 دفتر الطالب';
/** Printed statement of the First Midline Theorem (Unit 2, Lesson 1). */
const FIRST_MIDLINE_THEOREM = 'المستقيم المار بمنتصفي ضلعين في مثلث يوازي الضلع الثالث.';

const lesson = getLesson(LESSON_ID)!.lesson;
const notebook = lesson.steps.at(-1)!;
const notebookStepNumber = lesson.steps.length;

const ORIGINAL_STEP_IDS = [
  'l9-step-a01-orientation',
  'l9-step-01-activity',
  'l9-step-a02-lab-and-proof',
  'l9-step-02-theorem',
  'l9-step-a03-method-guide',
  'l9-step-03-knowledge',
  'l9-step-04-knowledge-solution',
  'l9-step-a04-subtriangle-strategy',
  'l9-step-05-check',
  'l9-step-06-practice',
  'l9-step-a05-recap',
];

function walkBlocks(blocks: readonly ContentBlock[]): ContentBlock[] {
  return blocks.flatMap((block) => [
    block,
    ...(block.type === 'callout' || block.type === 'teaching' ? walkBlocks(block.blocks) : []),
  ]);
}

/** Collect every authored string in a block tree, including titles and math labels. */
function allNotebookStrings(blocks: readonly ContentBlock[]): string[] {
  return walkBlocks(blocks).flatMap((block) => {
    if (block.type === 'paragraph') return [block.text];
    if (block.type === 'list') return block.items;
    if (block.type === 'math') return block.label ? [block.latex, block.label] : [block.latex];
    if (block.type === 'callout') return block.title ? [block.title] : [];
    return [];
  });
}

/** Collect prose strings (titles, paragraphs, list items, math labels) for BIDI checks. */
function proseStrings(blocks: readonly ContentBlock[]): string[] {
  return walkBlocks(blocks).flatMap((block) => {
    if (block.type === 'paragraph') return [block.text];
    if (block.type === 'list') return block.items;
    if (block.type === 'math') return block.label ? [block.label] : [];
    if (block.type === 'callout') return block.title ? [block.title] : [];
    return [];
  });
}

function leaves(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(leaves);
  if (value && typeof value === 'object') return Object.values(value).flatMap(leaves);
  return [];
}

/** Diacritic-insensitive Arabic text, so a copied clause is compared on its wording. */
function normalizeArabic(value: string): string {
  return value
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Length of the longest CONTIGUOUS run shared by two strings, stopping early
 * once `stopAt` is reached. Used by the Teacher Area leakage guard: a copied
 * clause shares a long run even when the rest of the sentence was adapted, so
 * plain containment of a whole answer sheet is not enough.
 */
function longestSharedRun(a: string, b: string, stopAt: number): number {
  let best = 0;
  let previous = new Array<number>(b.length + 1).fill(0);
  for (let i = 1; i <= a.length; i += 1) {
    const current = new Array<number>(b.length + 1).fill(0);
    for (let j = 1; j <= b.length; j += 1) {
      if (a[i - 1] !== b[j - 1]) continue;
      const run = (previous[j - 1] ?? 0) + 1;
      current[j] = run;
      if (run > best) best = run;
    }
    if (best >= stopAt) return best;
    previous = current;
  }
  return best;
}

const text = allNotebookStrings(notebook.blocks).join('\n');
const notebookJson = JSON.stringify(notebook);

function renderRoute(route: string) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  resetProgress();
  lockTeacherArea();
});

describe('Lesson 9 student notebook — identity, structural role, and placement', () => {
  it('validates with structural role "notebook" and occurs once in Lesson 9 only', () => {
    expect(notebook).toEqual(lessonStepSchema.parse(lesson09Notebook));
    expect(notebook).toMatchObject({
      id: NOTEBOOK_ID,
      title: NOTEBOOK_TITLE,
      origin: 'authored',
      role: 'notebook',
      kicker: 'شرح المنصّة',
    });
    expect(notebook.source).toBeUndefined();
    expect(notebook.check).toBeUndefined();
    expect(isNotebookStep(notebook)).toBe(true);
    // Authoritative structural check: `role` governs recognition over step ID.
    expect(isNotebookStep({ id: 'custom-notebook-step', role: 'notebook' })).toBe(true);
    expect(isNotebookStep({ id: NOTEBOOK_ID, role: 'step' })).toBe(false);
    expect(isNotebookStep(step09Recap)).toBe(false);

    expect(lesson.steps.filter((step) => step.id === NOTEBOOK_ID)).toHaveLength(1);
    expect(lesson.steps.filter((step) => isNotebookStep(step))).toHaveLength(1);
    expect(
      allLessons
        .filter(({ lesson: other }) => other.steps.some((step) => step.id === NOTEBOOK_ID))
        .map(({ lesson: other }) => other.id),
    ).toEqual([LESSON_ID]);
  });

  it('sits as step 12 immediately after step09Recap and before the final assessment', () => {
    expect(lesson.steps.map((step) => step.id)).toEqual([...ORIGINAL_STEP_IDS, NOTEBOOK_ID]);
    expect(notebookStepNumber).toBe(12);
    expect(lesson.steps[notebookStepNumber - 2]).toEqual(lessonStepSchema.parse(step09Recap));
    expect(lesson.assessment?.id).toBe('assessment-09-parallel-from-midpoint');
  });

  it('preserves the printed page sequence (34 → 35) and every source reference', () => {
    const sourceSteps = lesson.steps.filter((step) => step.origin === 'source');
    expect(sourceSteps).toHaveLength(6);
    expect(sourceSteps.map((step) => step.id)).toEqual([
      'l9-step-01-activity',
      'l9-step-02-theorem',
      'l9-step-03-knowledge',
      'l9-step-04-knowledge-solution',
      'l9-step-05-check',
      'l9-step-06-practice',
    ]);
    expect(sourceSteps.map((step) => step.source?.page)).toEqual([34, 34, 35, 35, 35, 35]);
    for (const step of sourceSteps) {
      // This lesson cites its printed pages by `page` (34/35) only; no source
      // reference may be retargeted by the notebook integration.
      expect(step.source?.page, step.id).toBeGreaterThanOrEqual(34);
      expect(step.source?.page, step.id).toBeLessThanOrEqual(35);
      expect(step.origin, step.id).toBe('source');
    }
  });
});

describe('Lesson 9 student notebook — static block contract and callout variants', () => {
  it('uses only callout, paragraph, list, and math blocks with zero interactive elements', () => {
    const types = new Set(walkBlocks(notebook.blocks).map((block) => block.type));
    expect(types).toEqual(new Set(['callout', 'paragraph', 'list', 'math']));
    expect(notebookJson).not.toMatch(
      /"type":"(figure|questionGroup|teaching|compare|table)"|"collapsible":true|"check"|"interactive"/,
    );
  });

  it('organizes six concise sections using definition, theorem, note, and warning variants', () => {
    expect(
      notebook.blocks.map((block) =>
        block.type === 'callout' ? [block.variant, block.title] : null,
      ),
    ).toEqual([
      ['definition', '١. الوضع الهندسي الجديد في هذا الدرس'],
      ['theorem', '٢. المبرهنة الثانية في المنتصفات'],
      ['note', '٣. موقعها من المبرهنة الأولى في المنتصفات'],
      ['note', '٤. كيف نميّز المبرهنة ونطبّقها؟'],
      ['note', '٥. فكرة البرهان والشرطان المستتران'],
      ['warning', '٦. تنبيهات وأخطاء شائعة'],
    ]);
  });
});

describe('Lesson 9 student notebook — mathematical coverage and curriculum boundary', () => {
  it('covers the theorem, its midpoint conclusion, the half-length reading, recognition rules, proof skeleton, and pitfalls', () => {
    for (const expected of [
      L9_THEOREM_STATEMENT,
      'الضلع الثالث',
      'I \\in [AB],\\; AI = IB',
      '(IJ) \\parallel (BC)',
      'AJ = JC',
      'AJ = JC = \\frac{1}{2}\\,AC',
      'AC = 2\\,AJ',
      'تذكير من الدرس الأول',
      'وحدانية الموازي',
      'العمودان على مستقيم واحد متوازيان',
      'يتناصف القطران',
      'مصادرة على المطلوب',
      'ولا يُقرأ من الشكل',
      'توضيح من المنصّة',
    ]) {
      expect(text, expected).toContain(expected);
    }
  });

  it('teaches the Second Midline Theorem as this lesson and keeps the First only as labelled recall', () => {
    const theoremSection = notebook.blocks[1];
    expect(theoremSection?.type).toBe('callout');
    if (theoremSection?.type !== 'callout') throw new Error('expected a theorem callout');
    expect(theoremSection.variant).toBe('theorem');
    expect(allNotebookStrings(theoremSection.blocks).join('\n')).toContain(L9_THEOREM_STATEMENT);

    // The previous lesson's theorem is explicitly badged as recall, never as the new result.
    expect(text).toContain('تذكير من الدرس الأول، وليس مبرهنة جديدة هنا');
    expect(text).not.toContain(FIRST_MIDLINE_THEOREM);

    // The proof skeleton of this lesson's theorem is platform-authored, not a copied solution.
    expect(text).toContain('هيكل البرهان الآتي توضيح من المنصّة');
  });

  it('does not introduce Lesson 3 parallel-line/transversal or Lesson 4 proportionality material', () => {
    expect(text).not.toMatch(
      /قاطعان|قاطعين|زوايا متبادلة|زاويتان متبادلتان|تاليس|ثلاث نسب|المبرهنة الثالثة|التناسبية/,
    );
  });

  it('does not copy the platform teaching steps paragraph for paragraph', () => {
    const labTeaching = lessonStepSchema.parse(step09LabAndProof);
    const teachingParagraphs = walkBlocks(labTeaching.blocks).flatMap((block) =>
      block.type === 'list' ? block.items : block.type === 'paragraph' ? [block.text] : [],
    );
    expect(teachingParagraphs.length).toBeGreaterThan(0);
    for (const item of teachingParagraphs) {
      expect(text, item).not.toContain(item);
    }
  });
});

describe('Lesson 9 student notebook — zero exercise, assessment, teacher, or test-bank leakage', () => {
  it('does not leak printed exercise prompts, the printed solution, or exercise-specific configurations', () => {
    for (const prompt of [...L9_PRINTED_PROMPTS, L9_KNOWLEDGE_SOLUTION]) {
      expect(text, prompt).not.toContain(prompt);
    }
    // Exercise-specific configurations and numeric values from pp. 34–35:
    expect(notebookJson).not.toMatch(/AMB|AJP|IJK|IST|EFG|ABM|MJA/);
    expect(notebookJson).not.toMatch(/\b(14|5\.5|11|7|3\.2|4\.8)\b|mathrm\{cm\}/);
  });

  it('does not contain assessment IDs, prompts, choices, explanations, or answer values', () => {
    for (const question of lesson09Assessment.questions) {
      expect(notebookJson, question.id).not.toContain(question.id);
      for (const prompt of leaves(question.prompt)) {
        if (prompt.length >= 20) expect(text, prompt).not.toContain(prompt);
      }
      for (const choice of question.type === 'multiple-choice' ? question.choices : []) {
        for (const choiceText of leaves(choice.blocks)) {
          if (choiceText.length >= 20) expect(text, choiceText).not.toContain(choiceText);
        }
      }
      for (const explanation of leaves(question.explanation ?? [])) {
        if (explanation.length >= 20) expect(text, explanation).not.toContain(explanation);
      }
    }
  });

  it('does not contain Teacher Area solution IDs, references, or blocks', () => {
    for (const solution of lesson09TeacherResources.textbookSolutions ?? []) {
      expect(notebookJson, solution.id).not.toContain(solution.id);
      expect(notebookJson, solution.reference).not.toContain(solution.reference);
      for (const value of leaves(solution.blocks)) {
        if (value.length >= 25) expect(text, value).not.toContain(value);
      }
    }
    for (const note of lesson09TeacherResources.notes ?? []) {
      for (const value of leaves(note)) {
        if (value.length >= 30) expect(text, value).not.toContain(value);
      }
    }
  });

  it('does not reproduce long clauses of Teacher Area answer sheets in either direction', () => {
    // The check above proves that no complete teacher leaf was pasted into the
    // notebook. This complementary guard watches the opposite direction: a long
    // contiguous clause of teacher-answer prose reused inside a notebook
    // sentence. The documented page-34 theorem quotation is excluded, and the
    // tolerance sits above the longest standard phrase in the notebook (the
    // uniqueness wording is 46 characters, the p. 35 perpendiculars reminder
    // shorter still) so ordinary mathematical phrasing is never rejected.
    const MIN_SHARED_CLAUSE = 50;
    const notebookProse = walkBlocks(notebook.blocks).flatMap((block) => {
      if (block.type === 'paragraph') return [block.text];
      if (block.type === 'list') return block.items;
      return [];
    });
    const teacherLeaves = (lesson09TeacherResources.textbookSolutions ?? []).flatMap((solution) =>
      leaves(solution.blocks).map(normalizeArabic),
    );

    let checkedPairs = 0;
    for (const unit of notebookProse) {
      if (unit.includes(L9_THEOREM_STATEMENT)) continue; // documented quotation
      const clause = normalizeArabic(unit);
      if (clause.length < MIN_SHARED_CLAUSE) continue;
      for (const leaf of teacherLeaves) {
        if (leaf.length < MIN_SHARED_CLAUSE) continue;
        checkedPairs += 1;
        expect(
          longestSharedRun(clause, leaf, MIN_SHARED_CLAUSE),
          `copied teacher-answer clause in: ${clause}`,
        ).toBeLessThan(MIN_SHARED_CLAUSE);
      }
    }
    expect(checkedPairs).toBeGreaterThan(0);
  });

  it('does not contain Test Area question IDs, prompts, or detailed solutions', () => {
    for (const question of testBankQuestions) {
      expect(notebookJson, question.id).not.toContain(question.id);
      for (const value of leaves(question.prompt)) {
        if (value.length >= 25) expect(text, value).not.toContain(value);
      }
    }
    for (const [id, answer] of Object.entries(testBankSolutions.solutions)) {
      expect(notebookJson, id).not.toContain(id);
      for (const value of leaves(answer)) {
        if (value.length >= 30) expect(text, value).not.toContain(value);
      }
    }
  });
});

describe('Lesson 9 student notebook — KaTeX, Arabic RTL, navigation, progress, and Teacher stats', () => {
  it('renders valid KaTeX expressions, BIDI-safe prose, and natural RTL in StepRail', () => {
    for (const line of proseStrings(notebook.blocks)) {
      expect(hasUnisolatedNotation(line), `unisolated notation: ${line}`).toBe(false);
    }
    expect(notebookJson).not.toMatch(/∠|\\\\angle/);

    const { container, unmount } = renderRoute(routes.lessonStep(LESSON_ID, notebookStepNumber));
    expect(screen.getByRole('heading', { level: 1, name: NOTEBOOK_TITLE })).toBeInTheDocument();
    expect(container.querySelector('article > div')).toHaveClass(pageStyles.notebook!);
    expect(
      container.querySelectorAll('article button, article input, article select'),
    ).toHaveLength(0);
    expect(container.querySelectorAll('.katex-error')).toHaveLength(0);
    expect(container.querySelector('article')!.textContent).not.toContain('$');

    const katexNodes = container.querySelectorAll('article .katex');
    expect(katexNodes.length).toBeGreaterThanOrEqual(5);
    for (const node of katexNodes) {
      expect(node.closest('[dir="ltr"]')).not.toBeNull();
    }

    // StepRail RTL verification: numeric pills use `.numeric[dir="ltr"]`,
    // whereas the notebook pill preserves natural RTL without `dir="ltr"` or `.numeric`.
    const rail = screen.getByRole('navigation', { name: 'خطوات الدرس' });
    const railLinks = within(rail).getAllByRole('link');
    expect(railLinks).toHaveLength(notebookStepNumber);

    for (const numericLink of railLinks.slice(0, -1)) {
      expect(numericLink.querySelector('span.numeric[dir="ltr"]')).not.toBeNull();
    }
    const notebookRailLink = railLinks.at(-1)!;
    expect(notebookRailLink).toHaveTextContent(NOTEBOOK_TITLE);
    expect(notebookRailLink).toHaveClass(railStyles.notebook!);
    expect(notebookRailLink).toHaveAttribute('aria-current', 'step');
    expect(notebookRailLink).not.toHaveAttribute('dir', 'ltr');
    expect(notebookRailLink.querySelector('[dir="ltr"], .numeric')).toBeNull();
    unmount();
  });

  it('integrates with outline, sidebar, Prev/Next, and localStorage progress while resetting lab state', () => {
    const outline = renderRoute(routes.lesson(LESSON_ID));
    expect(
      within(outline.container).getByRole('link', { name: new RegExp(NOTEBOOK_TITLE) }),
    ).toHaveAttribute('href', routes.lessonStep(LESSON_ID, notebookStepNumber));
    outline.unmount();

    // Start at step 3 (`parallel-midpoint-lab`), change the slider, hide the midline, then leave.
    const labStepNumber =
      lesson.steps.findIndex((step) => step.id === 'l9-step-a02-lab-and-proof') + 1;
    const { container, unmount } = renderRoute(routes.lessonStep(LESSON_ID, labStepNumber));

    const slider = screen.getByLabelText(/انحراف المستقيم/) as HTMLInputElement;
    expect(slider.value).toBe('9');
    fireEvent.change(slider, { target: { value: '0' } });
    expect(slider.value).toBe('0');

    const toggle = screen.getByLabelText(/إظهار الشكل/) as HTMLInputElement;
    expect(toggle.checked).toBe(true);
    fireEvent.click(toggle);
    expect(toggle.checked).toBe(false);

    const sidebar = () => screen.getByRole('navigation', { name: 'مخطّط الدرس' });
    fireEvent.click(within(sidebar()).getByRole('link', { name: new RegExp(step09Recap.title) }));
    expect(screen.getByRole('heading', { level: 1, name: step09Recap.title })).toBeInTheDocument();

    const stepNav = () => screen.getByRole('navigation', { name: 'التنقّل بين الخطوات' });
    fireEvent.click(within(stepNav()).getByRole('link', { name: new RegExp(NOTEBOOK_TITLE) }));

    expect(screen.getByRole('heading', { level: 1, name: NOTEBOOK_TITLE })).toBeInTheDocument();
    expect(container.querySelectorAll('article > div[hidden]')).toHaveLength(0);
    expect(loadProgress().lessons[LESSON_ID]?.completedStepIds).toEqual(
      expect.arrayContaining(['l9-step-a02-lab-and-proof', 'l9-step-a05-recap', NOTEBOOK_ID]),
    );

    // The notebook is the final learning step: Next leads to the assessment, Previous to the recap.
    expect(within(stepNav()).getByRole('link', { name: /الاختبار النهائي/ })).toHaveAttribute(
      'href',
      routes.assessment(lesson09Assessment.id),
    );
    fireEvent.click(within(stepNav()).getByRole('link', { name: new RegExp(step09Recap.title) }));
    expect(screen.getByRole('heading', { level: 1, name: step09Recap.title })).toBeInTheDocument();

    // Returning to the lab remounts it at its initial state (Lesson 9 is not a retained lesson),
    // while viewed-step progress in localStorage remains intact.
    const sidebarStepLinks = within(within(sidebar()).getByRole('list')).getAllByRole('link');
    fireEvent.click(sidebarStepLinks[labStepNumber - 1]!);
    expect((screen.getByLabelText(/انحراف المستقيم/) as HTMLInputElement).value).toBe('9');
    expect((screen.getByLabelText(/إظهار الشكل/) as HTMLInputElement).checked).toBe(true);
    expect(loadProgress().lessons[LESSON_ID]?.completedStepIds).toContain(NOTEBOOK_ID);
    unmount();
  });

  it('excludes the notebook from platform teaching explanations in Teacher Area statistics', () => {
    expect(unlockTeacherArea(TEACHER_PASSPHRASE)).toBe(true);
    const { unmount } = renderRoute(routes.teacherLesson(LESSON_ID));
    const coverage = screen.getByRole('list', { name: 'تغطية المصدر' });
    const items = within(coverage)
      .getAllByRole('listitem')
      .map((item) => item.textContent?.replace(/\s+/g, ' ').trim());

    expect(items).toContain('خطوات منقولة حرفياً من الكتاب: 6');
    expect(items).toContain('خطوات شرح من إعداد المنصّة: 5');
    unmount();
  });
});
