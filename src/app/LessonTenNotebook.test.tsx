import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';
import { isNotebookStep } from '@/components/navigation';
import railStyles from '@/components/navigation/StepRail.module.css';
import { allLessons, getLesson } from '@/content/registry';
import { lessonStepSchema } from '@/content/schema';
import type { ContentBlock } from '@/content/schema';
import { lesson10Assessment } from '@/content/units/lesson-10-assessment';
import { lesson10Notebook } from '@/content/units/lesson-10-notebook';
import {
  L10_KHASSA_CORRECTION,
  L10_KHASSA_ERRATUM_TOKEN,
  L10_KHASSA_PRINTED,
  L10_KNOWLEDGE_CASE_1_RESULT,
  L10_KNOWLEDGE_CASE_2_RESULT,
  L10_PRINTED_PROMPTS,
} from '@/content/units/lesson-10-questions';
import { lesson10TeacherResources } from '@/content/units/lesson-10-teacher';
import {
  step10ComputationStrategy,
  step10LabAndDiscovery,
  step10Orientation,
  step10Recap,
  step10TheoremGuide,
} from '@/content/units/lesson-10-teaching';
import { hasUnisolatedNotation } from '@/lib/bidi';
import { loadProgress, resetProgress } from '@/lib/progress';
import { routes } from '@/lib/routes';
import { TEACHER_PASSPHRASE, lockTeacherArea, unlockTeacherArea } from '@/lib/teacherAccess';
import pageStyles from '@/routes/LessonStepPage.module.css';
import { questions as testBankQuestions } from '@/tests/questions/lesson-10';
import { solutionSet as testBankSolutions } from '@/tests/solutions/lesson-10-test';

const LESSON_ID = 'lesson-10-parallel-lines-transversals';
const NOTEBOOK_ID = 'lesson-10-student-notebook';
const NOTEBOOK_TITLE = '📒 دفتر الطالب';

const lesson = getLesson(LESSON_ID)!.lesson;
const notebook = lesson.steps.at(-1)!;
const notebookStepNumber = lesson.steps.length;

const ORIGINAL_STEP_IDS = [
  'l10-step-a01-orientation',
  'l10-step-01-activity',
  'l10-step-a02-lab-and-discovery',
  'l10-step-02-learn',
  'l10-step-03-khassa',
  'l10-step-a03-theorem-guide',
  'l10-step-04-knowledge',
  'l10-step-a04-computation-strategy',
  'l10-step-05-check',
  'l10-step-06-practice',
  'l10-step-a05-recap',
];

function walkBlocks(blocks: readonly ContentBlock[]): ContentBlock[] {
  return blocks.flatMap((block) => [
    block,
    ...(block.type === 'callout' || block.type === 'teaching' ? walkBlocks(block.blocks) : []),
  ]);
}

function allNotebookStrings(blocks: readonly ContentBlock[]): string[] {
  return walkBlocks(blocks).flatMap((block) => {
    if (block.type === 'paragraph') return [block.text];
    if (block.type === 'list') return block.items;
    if (block.type === 'math') return block.label ? [block.latex, block.label] : [block.latex];
    if (block.type === 'callout') return block.title ? [block.title] : [];
    return [];
  });
}

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

function normalizeArabic(value: string): string {
  return value
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/\s+/g, ' ')
    .trim();
}

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

describe('Lesson 10 student notebook — identity, structural role, and placement', () => {
  it('validates with structural role "notebook" and occurs once in Lesson 10 only', () => {
    expect(notebook).toEqual(lessonStepSchema.parse(lesson10Notebook));
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
    expect(isNotebookStep({ id: 'custom-notebook-step', role: 'notebook' })).toBe(true);
    expect(isNotebookStep({ id: NOTEBOOK_ID, role: 'step' })).toBe(false);
    expect(isNotebookStep(step10Recap)).toBe(false);

    expect(lesson.steps.filter((step) => step.id === NOTEBOOK_ID)).toHaveLength(1);
    expect(lesson.steps.filter((step) => isNotebookStep(step))).toHaveLength(1);
    expect(
      allLessons
        .filter(({ lesson: other }) => other.steps.some((step) => step.id === NOTEBOOK_ID))
        .map(({ lesson: other }) => other.id),
    ).toEqual([LESSON_ID]);

    const exercises = getLesson('lesson-12-unit-two-exercises')!.lesson;
    expect(exercises.steps.some((step) => isNotebookStep(step))).toBe(false);
  });

  it('sits as step 12 immediately after step10Recap and before the final assessment', () => {
    expect(lesson.steps.map((step) => step.id)).toEqual([...ORIGINAL_STEP_IDS, NOTEBOOK_ID]);
    expect(notebookStepNumber).toBe(12);
    expect(lesson.steps[notebookStepNumber - 2]).toEqual(lessonStepSchema.parse(step10Recap));
    expect(lesson.assessment?.id).toBe('assessment-10-parallel-lines-transversals');
  });

  it('preserves the printed page sequence (36 → 37 → 38) and every source reference', () => {
    const sourceSteps = lesson.steps.filter((step) => step.origin === 'source');
    expect(sourceSteps).toHaveLength(6);
    expect(sourceSteps.map((step) => step.id)).toEqual([
      'l10-step-01-activity',
      'l10-step-02-learn',
      'l10-step-03-khassa',
      'l10-step-04-knowledge',
      'l10-step-05-check',
      'l10-step-06-practice',
    ]);
    expect(sourceSteps.map((step) => step.source?.page)).toEqual([36, 36, 37, 37, 38, 38]);
    for (const step of sourceSteps) {
      expect(step.origin, step.id).toBe('source');
      expect(step.source?.page, step.id).toBeGreaterThanOrEqual(36);
      expect(step.source?.page, step.id).toBeLessThanOrEqual(38);
    }
  });
});

describe('Lesson 10 student notebook — static block contract and callout variants', () => {
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
      ['definition', '١. المثلثان المكوَّنان من مستقيمين متوازيين وقاطعين'],
      ['theorem', '٢. نصّ الخاصة والمراسلة بين الأضلاع'],
      ['note', '٣. جدول التناسب وقراءة الأضلاع المتناظرة'],
      ['note', '٤. خطوات حساب طول مجهول'],
      ['note', '٥. التناسب بين الأجزاء مقابل التناسب بين الجزء والكل'],
      ['warning', '٦. أخطاء شائعة يجب تجنّبها'],
    ]);
  });
});

describe('Lesson 10 student notebook — mathematical coverage, errata preservation, and boundary', () => {
  it('quotes L10_KHASSA_PRINTED verbatim without silent correction and explicitly flags the erratum', () => {
    const theoremSection = notebook.blocks[1];
    expect(theoremSection?.type).toBe('callout');
    if (theoremSection?.type !== 'callout') throw new Error('expected a theorem callout');
    expect(theoremSection.variant).toBe('theorem');

    const theoremText = allNotebookStrings(theoremSection.blocks).join('\n');
    expect(theoremText).toContain(L10_KHASSA_PRINTED);
    expect(theoremText).toContain(L10_KHASSA_ERRATUM_TOKEN);
    expect(theoremText).toContain(L10_KHASSA_CORRECTION);
    expect(theoremText).toContain('زلّة طباعية');
    expect(theoremText).toContain('توضيح من المنصّة');
  });

  it('covers proportionality table, side correspondence, part-vs-whole distinction, proof status, prior recall, and pitfalls', () => {
    for (const expected of [
      'جدول تناسب',
      'تذكير بموقع الدرس من الدرسين الأول والثاني',
      '\\frac{1}{2}',
      'دون برهان كامل',
      'مبرهنة النسب المتساوية',
      '\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC} = k',
      '\\frac{AM}{MB} = \\frac{AN}{NC}',
      'الضرب التبادلي',
      'AB = AM + MB',
      'MB = AB - AM',
    ]) {
      expect(text, expected).toContain(expected);
    }
  });

  it('does not anticipate Unit 2 Lesson 4 (three-ratio theorem title, extension cases, or 2/3 auxiliary proof)', () => {
    expect(text).not.toMatch(
      /مبرهنة النسب الثلاث المتساوية|تساوي ثلاث نسب|امتداد|امتدادي|BSNM|CS = SR = RB|\\frac\{2\}\{3\}/,
    );
  });

  it('does not copy platform teaching steps paragraph for paragraph', () => {
    for (const teachingStep of [
      step10Orientation,
      step10LabAndDiscovery,
      step10TheoremGuide,
      step10ComputationStrategy,
      step10Recap,
    ]) {
      const parsed = lessonStepSchema.parse(teachingStep);
      const teachingParagraphs = walkBlocks(parsed.blocks).flatMap((block) =>
        block.type === 'list' ? block.items : block.type === 'paragraph' ? [block.text] : [],
      );
      expect(teachingParagraphs.length).toBeGreaterThan(0);
      for (const item of teachingParagraphs) {
        expect(text, item).not.toContain(item);
      }
    }
  });
});

describe('Lesson 10 student notebook — zero exercise, assessment, teacher, or test-bank leakage', () => {
  it('does not leak printed exercise prompts, worked solutions, or exercise-specific figures/numbers', () => {
    for (const prompt of [
      ...L10_PRINTED_PROMPTS,
      L10_KNOWLEDGE_CASE_1_RESULT,
      L10_KNOWLEDGE_CASE_2_RESULT,
    ]) {
      expect(text, prompt).not.toContain(prompt);
    }
    expect(notebookJson).not.toMatch(/ARS|ARU|AEF|MIJ|MHK|JKL|JMN|EFG|EHK|ABE|ACF|BCE|BCF|AMP/);
    expect(text.replace(/\\frac\{1\}\{2\}/g, '')).not.toMatch(
      /\b(12|10|9|8|7\.5|6|4|3|2\.5|2|1\.5)\b|mathrm\{cm\}/,
    );
  });

  it('does not contain assessment IDs, prompts, choices, or explanations', () => {
    const canonicalEquation = '$\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}$';
    for (const question of lesson10Assessment.questions) {
      expect(notebookJson, question.id).not.toContain(question.id);
      for (const prompt of leaves(question.prompt)) {
        if (prompt.length >= 20) expect(text, prompt).not.toContain(prompt);
      }
      for (const choice of question.type === 'multiple-choice' ? question.choices : []) {
        for (const choiceText of leaves(choice.blocks)) {
          if (choiceText === canonicalEquation) continue; // core lesson formula tested by q01
          if (choiceText.length >= 20) expect(text, choiceText).not.toContain(choiceText);
        }
      }
      for (const explanation of leaves(question.explanation ?? [])) {
        if (explanation.length >= 20) expect(text, explanation).not.toContain(explanation);
      }
    }
  });

  it('does not contain Teacher Area solution IDs, references, blocks, or notes', () => {
    for (const solution of lesson10TeacherResources.textbookSolutions ?? []) {
      expect(notebookJson, solution.id).not.toContain(solution.id);
      expect(notebookJson, solution.reference).not.toContain(solution.reference);
      for (const value of leaves(solution.blocks)) {
        if (value.length >= 25) expect(text, value).not.toContain(value);
      }
    }
    for (const note of lesson10TeacherResources.notes ?? []) {
      for (const value of leaves(note)) {
        if (value.length >= 30) expect(text, value).not.toContain(value);
      }
    }
  });

  it('does not share long contiguous prose clauses with Teacher Area, Assessment, or Test Bank solutions', () => {
    const MIN_SHARED_CLAUSE = 50;
    const notebookProse = walkBlocks(notebook.blocks).flatMap((block) => {
      if (block.type === 'paragraph') return [block.text];
      if (block.type === 'list') return block.items;
      return [];
    });
    const protectedLeaves = [
      ...(lesson10TeacherResources.textbookSolutions ?? []).flatMap((s) => leaves(s.blocks)),
      ...(lesson10TeacherResources.notes ?? []).flatMap((n) => leaves(n)),
      ...lesson10Assessment.questions.flatMap((q) => leaves(q.explanation ?? [])),
      ...Object.values(testBankSolutions.solutions).flatMap((s) => leaves(s)),
    ].map(normalizeArabic);

    let checkedPairs = 0;
    for (const unit of notebookProse) {
      if (unit.includes(L10_KHASSA_PRINTED)) continue;
      const clause = normalizeArabic(unit);
      if (clause.length < MIN_SHARED_CLAUSE) continue;
      for (const leaf of protectedLeaves) {
        if (leaf.length < MIN_SHARED_CLAUSE) continue;
        checkedPairs += 1;
        expect(
          longestSharedRun(clause, leaf, MIN_SHARED_CLAUSE),
          `copied protected clause in: ${clause}`,
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

describe('Lesson 10 student notebook — KaTeX, Arabic RTL, navigation, progress, and Teacher stats', () => {
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

    const labStepNumber =
      lesson.steps.findIndex((step) => step.id === 'l10-step-a02-lab-and-discovery') + 1;
    const { container, unmount } = renderRoute(routes.lessonStep(LESSON_ID, labStepNumber));

    const sliders = container.querySelectorAll('input[type="range"]');
    const tiltSlider = sliders[1] as HTMLInputElement;
    expect(tiltSlider.value).toBe('0');
    fireEvent.change(tiltSlider, { target: { value: '10' } });
    expect(tiltSlider.value).toBe('10');

    const toggle = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(toggle.checked).toBe(true);
    fireEvent.click(toggle);
    expect(toggle.checked).toBe(false);

    const sidebar = () => screen.getByRole('navigation', { name: 'مخطّط الدرس' });
    fireEvent.click(within(sidebar()).getByRole('link', { name: new RegExp(step10Recap.title) }));
    expect(screen.getByRole('heading', { level: 1, name: step10Recap.title })).toBeInTheDocument();

    const stepNav = () => screen.getByRole('navigation', { name: 'التنقّل بين الخطوات' });
    fireEvent.click(within(stepNav()).getByRole('link', { name: new RegExp(NOTEBOOK_TITLE) }));

    expect(screen.getByRole('heading', { level: 1, name: NOTEBOOK_TITLE })).toBeInTheDocument();
    expect(container.querySelectorAll('article > div[hidden]')).toHaveLength(0);
    expect(loadProgress().lessons[LESSON_ID]?.completedStepIds).toEqual(
      expect.arrayContaining(['l10-step-a02-lab-and-discovery', 'l10-step-a05-recap', NOTEBOOK_ID]),
    );

    expect(within(stepNav()).getByRole('link', { name: /الاختبار النهائي/ })).toHaveAttribute(
      'href',
      routes.assessment(lesson10Assessment.id),
    );
    fireEvent.click(within(stepNav()).getByRole('link', { name: new RegExp(step10Recap.title) }));
    expect(screen.getByRole('heading', { level: 1, name: step10Recap.title })).toBeInTheDocument();

    const sidebarStepLinks = within(within(sidebar()).getByRole('list')).getAllByRole('link');
    fireEvent.click(sidebarStepLinks[labStepNumber - 1]!);
    expect((container.querySelectorAll('input[type="range"]')[1] as HTMLInputElement).value).toBe(
      '0',
    );
    expect((container.querySelector('input[type="checkbox"]') as HTMLInputElement).checked).toBe(
      true,
    );
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
