import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';
import { isNotebookStep } from '@/components/navigation';
import railStyles from '@/components/navigation/StepRail.module.css';
import { allLessons, getLesson } from '@/content/registry';
import { lessonStepSchema } from '@/content/schema';
import type { ContentBlock } from '@/content/schema';
import { lesson11Assessment } from '@/content/units/lesson-11-assessment';
import { lesson11Notebook } from '@/content/units/lesson-11-notebook';
import {
  L11_ACTIVITY_SETUP,
  L11_PRINTED_PROMPTS,
  L11_SOLUTION_AF,
  L11_SOLUTION_EF,
  L11_THEOREM_CORRECTION,
  L11_THEOREM_ERRATUM_TOKEN,
  L11_THEOREM_PRINTED,
} from '@/content/units/lesson-11-questions';
import { lesson11TeacherResources } from '@/content/units/lesson-11-teacher';
import {
  step11ComputationStrategy,
  step11Lab,
  step11Orientation,
  step11ProofMap,
  step11Recap,
  step11TheoremGuide,
} from '@/content/units/lesson-11-teaching';
import { hasUnisolatedNotation } from '@/lib/bidi';
import { loadProgress, resetProgress } from '@/lib/progress';
import { routes } from '@/lib/routes';
import { TEACHER_PASSPHRASE, lockTeacherArea, unlockTeacherArea } from '@/lib/teacherAccess';
import pageStyles from '@/routes/LessonStepPage.module.css';
import { questions as testBankQuestions } from '@/tests/questions/lesson-11';
import { solutionSet as testBankSolutions } from '@/tests/solutions/lesson-11-test';

const LESSON_ID = 'lesson-11-three-ratios';
const NOTEBOOK_ID = 'lesson-11-student-notebook';
const NOTEBOOK_TITLE = '📒 دفتر الطالب';

const lesson = getLesson(LESSON_ID)!.lesson;
const notebook = lesson.steps.at(-1)!;
const notebookStepNumber = lesson.steps.length;

const ORIGINAL_STEP_IDS = [
  'l11-step-a01-orientation',
  'l11-step-01-activity',
  'l11-step-a02-lab',
  'l11-step-02-activity-part-two',
  'l11-step-03-activity-part-three',
  'l11-step-a03-proof-map',
  'l11-step-04-theorem',
  'l11-step-a04-theorem-guide',
  'l11-step-05-example',
  'l11-step-06-solution',
  'l11-step-a05-computation-strategy',
  'l11-step-07-check',
  'l11-step-08-practice',
  'l11-step-a06-recap',
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

describe('Lesson 11 student notebook — identity, structural role, and placement', () => {
  it('validates with structural role "notebook" and occurs once in Lesson 11 only', () => {
    expect(notebook).toEqual(lessonStepSchema.parse(lesson11Notebook));
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
    expect(isNotebookStep(step11Recap)).toBe(false);

    expect(lesson.steps.filter((step) => step.id === NOTEBOOK_ID)).toHaveLength(1);
    expect(lesson.steps.filter((step) => isNotebookStep(step))).toHaveLength(1);
    expect(
      allLessons
        .filter(({ lesson: other }) => other.steps.some((step) => step.id === NOTEBOOK_ID))
        .map(({ lesson: other }) => other.id),
    ).toEqual([LESSON_ID]);

    // All four Unit 2 teaching lessons end with their notebook; Unit 2 Exercises stays excluded.
    for (const teachingId of [
      'lesson-08-triangle-midpoints',
      'lesson-09-parallel-from-midpoint',
      'lesson-10-parallel-lines-transversals',
      'lesson-11-three-ratios',
    ]) {
      const target = getLesson(teachingId)!.lesson;
      expect(isNotebookStep(target.steps.at(-1)!), teachingId).toBe(true);
    }
    const exercises = getLesson('lesson-12-unit-two-exercises')!.lesson;
    expect(exercises.steps.some((step) => isNotebookStep(step))).toBe(false);
  });

  it('sits as step 15 immediately after step11Recap and before the final assessment', () => {
    expect(lesson.steps.map((step) => step.id)).toEqual([...ORIGINAL_STEP_IDS, NOTEBOOK_ID]);
    expect(notebookStepNumber).toBe(15);
    expect(lesson.steps[notebookStepNumber - 2]).toEqual(lessonStepSchema.parse(step11Recap));
    expect(lesson.assessment?.id).toBe('assessment-11-three-ratios');
  });

  it('preserves the printed page sequence (39 → 40 → 41) and every source reference', () => {
    const sourceSteps = lesson.steps.filter((step) => step.origin === 'source');
    expect(sourceSteps).toHaveLength(8);
    expect(sourceSteps.map((step) => step.id)).toEqual([
      'l11-step-01-activity',
      'l11-step-02-activity-part-two',
      'l11-step-03-activity-part-three',
      'l11-step-04-theorem',
      'l11-step-05-example',
      'l11-step-06-solution',
      'l11-step-07-check',
      'l11-step-08-practice',
    ]);
    expect(sourceSteps.map((step) => step.source?.page)).toEqual([39, 39, 39, 40, 40, 41, 41, 41]);
    for (const step of sourceSteps) {
      expect(step.origin, step.id).toBe('source');
      expect(step.source?.page, step.id).toBeGreaterThanOrEqual(39);
      expect(step.source?.page, step.id).toBeLessThanOrEqual(41);
    }
  });
});

describe('Lesson 11 student notebook — static block contract and callout variants', () => {
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
      ['definition', '١. إثبات الحالة الخاصة في النشاط'],
      ['theorem', '٢. نصّ مبرهنة النسب الثلاث المتساوية'],
      ['note', '٣. حالة امتدادي الضلعين'],
      ['note', '٤. قاعدة كتابة النسب والمراسلة الصحيحة'],
      ['note', '٥. استراتيجية الحساب وموقع الدرس في الوحدة الثانية'],
      ['warning', '٦. تنبيهات وأخطاء شائعة'],
    ]);
  });
});

describe('Lesson 11 student notebook — mathematical coverage, errata preservation, and boundary', () => {
  it('preserves the cut-off p. 39 activity setup and verbatim p. 40 theorem erratum without silent repair', () => {
    const activitySection = notebook.blocks[0];
    expect(activitySection?.type).toBe('callout');
    if (activitySection?.type !== 'callout') throw new Error('expected definition callout');
    const activityText = allNotebookStrings(activitySection.blocks).join('\n');
    expect(activityText).toContain(L11_ACTIVITY_SETUP);
    expect(activityText).toContain('تحققان.');
    expect(activityText).toContain('AI = IM = MB');

    const theoremSection = notebook.blocks[1];
    expect(theoremSection?.type).toBe('callout');
    if (theoremSection?.type !== 'callout') throw new Error('expected theorem callout');
    expect(theoremSection.variant).toBe('theorem');
    const theoremText = allNotebookStrings(theoremSection.blocks).join('\n');
    expect(theoremText).toContain(L11_THEOREM_PRINTED);
    expect(theoremText).toContain(L11_THEOREM_ERRATUM_TOKEN);
    expect(theoremText).toContain(L11_THEOREM_CORRECTION);
    expect(theoremText).toContain('خطأ مطبعي');
    expect(theoremText).toContain('توضيح من المنصّة');
  });

  it('covers the complete non-circular 2/3 proof (initial conditions, J/P/R/S/T, BIJ/BCJ/CJR/ABN/BSN, BSNM), extension cases, numerator/denominator rule, exact fractions, Unit 2 progression, and pitfalls', () => {
    for (const expected of [
      // Initial setup & midpoint consequences
      'AI = IM = MB',
      '$I$ منتصف $[AM]$',
      '$M$ منتصف $[IB]$',
      '$(MN) \\parallel (BC)$',
      // Stage 1: division of [AC]
      'المثلث $AMN$',
      '$J$ منتصف $[AN]$',
      'المثلث $BIJ$',
      '$P$ منتصف $[BJ]$',
      'المثلث $BCJ$',
      '$N$ منتصف $[CJ]$',
      'AJ = JN = NC',
      '\\frac{AN}{AC} = \\frac{2}{3}',
      // Stage 2: division of [BC] with auxiliary T
      'المثلث $CJR$',
      '$S$ منتصف $[CR]$',
      'T = (JR) \\cap [BN]',
      'المثلث $ABN$',
      '$T$ منتصف $[BN]$',
      'المثلث $BSN$',
      '$R$ منتصف $[BS]$',
      'CS = SR = RB',
      '\\frac{BS}{BC} = \\frac{2}{3}',
      // Stage 3: parallelogram BSNM -> third ratio -> conclusion
      'الرباعي $BSNM$',
      'متوازي أضلاع',
      'MN = BS',
      '\\frac{MN}{BC} = \\frac{BS}{BC} = \\frac{2}{3}',
      '\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC} = \\frac{2}{3}',
      // Theorem, extensions, calculation rules, progression, pitfalls
      '\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}',
      'امتدادَي الضلعين',
      'تجاوزت النسبة المشتركة العدد $1$',
      'البسوط',
      'المقامات',
      'الضرب التبادلي',
      'كسر مضبوط',
      'خلاصة تدرّج الوحدة الثانية',
      'توضيح من المنصّة',
    ]) {
      expect(text, expected).toContain(expected);
    }

    // Ensure the corrected proof map in lesson-11-teaching.ts stays aligned and never reintroduces invalid triangles.
    const proofMapText = JSON.stringify(step11ProofMap);
    expect(proofMapText).not.toMatch(/\b(BAN|JBC|NCB)\b/);
    for (const triangleOrFigure of ['AMN', 'BIJ', 'BCJ', 'CJR', 'ABN', 'BSN', 'BSNM', 'T = (JR)']) {
      expect(proofMapText).toContain(triangleOrFigure);
    }
  });

  it('does not copy platform teaching steps paragraph for paragraph', () => {
    for (const teachingStep of [
      step11Orientation,
      step11Lab,
      step11ProofMap,
      step11TheoremGuide,
      step11ComputationStrategy,
      step11Recap,
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

describe('Lesson 11 student notebook — zero exercise, assessment, teacher, or test-bank leakage', () => {
  it('does not leak printed exercise prompts, worked solutions, or exercise figures/numbers while allowing legitimate 2/3 proof intermediates', () => {
    for (const prompt of [...L11_PRINTED_PROMPTS, L11_SOLUTION_AF, L11_SOLUTION_EF]) {
      expect(text, prompt).not.toContain(prompt);
    }
    // Printed example/exercise triangles must not leak; BSNM and CS = SR = RB are legitimate proof content.
    expect(notebookJson).not.toMatch(/\b(AEF|ADE|FGH|FIJ|EFG|OMN)\b/);
    // Block worked-example & exercise lengths/fractions while permitting 2/3 proof fractions, part-multipliers (2\,JN, 3\,JN, 2\,SR, 3\,SR), and الدرس 2.
    const textWithoutProofConstants = text.replace(
      /\\frac\{1\}\{2\}|\\frac\{2\}\{3\}|\b[23]\\,(?:JN|SR)\b|الدرس\s+2/g,
      '',
    );
    expect(textWithoutProofConstants).not.toMatch(
      /\\frac\{10\}\{3\}|\\frac\{35\}\{8\}|\\frac\{75\}\{8\}|\\frac\{8\}\{5\}|\\frac\{x\}\{15\}|\b(15|24|6|5|4|3|2)\b/,
    );
  });

  it('does not contain assessment IDs, prompts, choices, or explanations', () => {
    const canonicalEquation = '$\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}$';
    for (const question of lesson11Assessment.questions) {
      expect(notebookJson, question.id).not.toContain(question.id);
      for (const prompt of leaves(question.prompt)) {
        if (prompt.length >= 20) expect(text, prompt).not.toContain(prompt);
      }
      for (const choice of question.type === 'multiple-choice' ? question.choices : []) {
        for (const choiceText of leaves(choice.blocks)) {
          if (choiceText === canonicalEquation) continue; // core theorem equality tested by q02
          if (choiceText.length >= 20) expect(text, choiceText).not.toContain(choiceText);
        }
      }
      for (const explanation of leaves(question.explanation ?? [])) {
        if (explanation.length >= 20) expect(text, explanation).not.toContain(explanation);
      }
    }
  });

  it('does not contain Teacher Area solution IDs, references, blocks, or notes', () => {
    for (const solution of lesson11TeacherResources.textbookSolutions ?? []) {
      expect(notebookJson, solution.id).not.toContain(solution.id);
      expect(notebookJson, solution.reference).not.toContain(solution.reference);
      for (const value of leaves(solution.blocks)) {
        if (value.length >= 25) expect(text, value).not.toContain(value);
      }
    }
    for (const note of lesson11TeacherResources.notes ?? []) {
      for (const value of leaves(note)) {
        if (value.length >= 30) expect(text, value).not.toContain(value);
      }
    }
  });

  it('does not share long contiguous prose clauses with Teacher Area, Assessment, or Test Bank solutions (with documented exception for canonical theorem equations)', () => {
    const MIN_SHARED_CLAUSE = 50;
    // Strip only the verbatim canonical LaTeX theorem equations (>50 chars of LaTeX syntax)
    // so prose-clause plagiarism protection stays strictly enforced at < 50 chars.
    const stripCanonicalEquations = (value: string): string =>
      normalizeArabic(
        value
          .replace(
            /\\frac\{AM\}\{AB\} = \\frac\{AN\}\{AC\} = \\frac\{MN\}\{BC\} = \\frac\{2\}\{3\}/g,
            '',
          )
          .replace(/\\frac\{AM\}\{AB\} = \\frac\{AN\}\{AC\} = \\frac\{MN\}\{BC\}/g, ''),
      );

    const notebookProse = walkBlocks(notebook.blocks).flatMap((block) => {
      if (block.type === 'paragraph') return [block.text];
      if (block.type === 'list') return block.items;
      return [];
    });
    const protectedLeaves = [
      ...(lesson11TeacherResources.textbookSolutions ?? []).flatMap((s) => leaves(s.blocks)),
      ...(lesson11TeacherResources.notes ?? []).flatMap((n) => leaves(n)),
      ...lesson11Assessment.questions.flatMap((q) => leaves(q.explanation ?? [])),
      ...Object.values(testBankSolutions.solutions).flatMap((s) => leaves(s)),
    ].map(stripCanonicalEquations);

    let checkedPairs = 0;
    for (const unit of notebookProse) {
      if (unit.includes(L11_ACTIVITY_SETUP) || unit.includes(L11_THEOREM_PRINTED)) continue;
      const clause = stripCanonicalEquations(unit);
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

describe('Lesson 11 student notebook — KaTeX, Arabic RTL, navigation, progress, and Teacher stats', () => {
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

    const labStepNumber = lesson.steps.findIndex((step) => step.id === 'l11-step-a02-lab') + 1;
    const { container, unmount } = renderRoute(routes.lessonStep(LESSON_ID, labStepNumber));

    const halfPreset = [...container.querySelectorAll('button')].find((button) =>
      button.textContent?.includes('حالة المنتصفين'),
    )!;
    fireEvent.click(halfPreset);
    expect(container.textContent).toContain('تختلّ الحالات الأخرى');

    const toggle = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(toggle.checked).toBe(true);
    fireEvent.click(toggle);
    expect(toggle.checked).toBe(false);

    const sidebar = () => screen.getByRole('navigation', { name: 'مخطّط الدرس' });
    fireEvent.click(within(sidebar()).getByRole('link', { name: new RegExp(step11Recap.title) }));
    expect(screen.getByRole('heading', { level: 1, name: step11Recap.title })).toBeInTheDocument();

    const stepNav = () => screen.getByRole('navigation', { name: 'التنقّل بين الخطوات' });
    fireEvent.click(within(stepNav()).getByRole('link', { name: new RegExp(NOTEBOOK_TITLE) }));

    expect(screen.getByRole('heading', { level: 1, name: NOTEBOOK_TITLE })).toBeInTheDocument();
    expect(container.querySelectorAll('article > div[hidden]')).toHaveLength(0);
    expect(loadProgress().lessons[LESSON_ID]?.completedStepIds).toEqual(
      expect.arrayContaining(['l11-step-a02-lab', 'l11-step-a06-recap', NOTEBOOK_ID]),
    );

    expect(within(stepNav()).getByRole('link', { name: /الاختبار النهائي/ })).toHaveAttribute(
      'href',
      routes.assessment(lesson11Assessment.id),
    );
    fireEvent.click(within(stepNav()).getByRole('link', { name: new RegExp(step11Recap.title) }));
    expect(screen.getByRole('heading', { level: 1, name: step11Recap.title })).toBeInTheDocument();

    const sidebarStepLinks = within(within(sidebar()).getByRole('list')).getAllByRole('link');
    fireEvent.click(sidebarStepLinks[labStepNumber - 1]!);
    expect(container.textContent).toContain('تتحقّق الحالات الخمس');
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

    expect(items).toContain('خطوات منقولة حرفياً من الكتاب: 8');
    expect(items).toContain('خطوات شرح من إعداد المنصّة: 6');
    unmount();
  });
});
