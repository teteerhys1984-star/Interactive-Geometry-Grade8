import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';
import { isNotebookStep } from '@/components/navigation';
import railStyles from '@/components/navigation/StepRail.module.css';
import { allLessons, getLesson } from '@/content/registry';
import { lessonStepSchema } from '@/content/schema';
import type { ContentBlock } from '@/content/schema';
import { lesson08Assessment } from '@/content/units/lesson-08-assessment';
import { lesson08Notebook } from '@/content/units/lesson-08-notebook';
import { L8_KNOWLEDGE_SOLUTION, L8_PRINTED_PROMPTS } from '@/content/units/lesson-08-questions';
import { lesson08TeacherResources } from '@/content/units/lesson-08-teacher';
import { teachingProof, teachingRecap } from '@/content/units/lesson-08-teaching';
import { hasUnisolatedNotation } from '@/lib/bidi';
import { loadProgress, resetProgress } from '@/lib/progress';
import { routes } from '@/lib/routes';
import { TEACHER_PASSPHRASE, lockTeacherArea, unlockTeacherArea } from '@/lib/teacherAccess';
import pageStyles from '@/routes/LessonStepPage.module.css';
import { questions as testBankQuestions } from '@/tests/questions/lesson-08';
import { solutionSet as testBankSolutions } from '@/tests/solutions/lesson-08-test';

const LESSON_ID = 'lesson-08-triangle-midpoints';
const NOTEBOOK_ID = 'lesson-08-student-notebook';
const NOTEBOOK_TITLE = '📒 دفتر الطالب';

const lesson = getLesson(LESSON_ID)!.lesson;
const notebook = lesson.steps.at(-1)!;
const notebookStepNumber = lesson.steps.length;

const ORIGINAL_STEP_IDS = [
  'l8-step-a01-orientation',
  'l8-step-01-activity',
  'l8-step-a02-observation',
  'l8-step-02-proof-scaffold',
  'l8-step-a03-proof-explained',
  'l8-step-03-theorem',
  'l8-step-04-example',
  'l8-step-a04-example-solution',
  'l8-step-05-knowledge',
  'l8-step-06-knowledge-solution',
  'l8-step-07-check',
  'l8-step-08-practice',
  'l8-step-a05-recap',
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

describe('Lesson 8 student notebook — identity, structural role, and placement', () => {
  it('validates with structural role "notebook" and occurs once in Lesson 8 only', () => {
    expect(notebook).toEqual(lessonStepSchema.parse(lesson08Notebook));
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
    expect(isNotebookStep(teachingRecap)).toBe(false);

    expect(lesson.steps.filter((step) => step.id === NOTEBOOK_ID)).toHaveLength(1);
    expect(lesson.steps.filter((step) => isNotebookStep(step))).toHaveLength(1);
    expect(
      allLessons
        .filter(({ lesson: other }) => other.steps.some((step) => step.id === NOTEBOOK_ID))
        .map(({ lesson: other }) => other.id),
    ).toEqual([LESSON_ID]);
  });

  it('sits as step 14 immediately after teachingRecap and before the final assessment', () => {
    expect(lesson.steps.map((step) => step.id)).toEqual([...ORIGINAL_STEP_IDS, NOTEBOOK_ID]);
    expect(notebookStepNumber).toBe(14);
    expect(lesson.steps[notebookStepNumber - 2]).toEqual(lessonStepSchema.parse(teachingRecap));
    expect(lesson.assessment?.id).toBe('lesson-08-final-assessment');
  });

  it('preserves the printed page sequence (31 → 33) and all source references', () => {
    const sourceSteps = lesson.steps.filter((step) => step.origin === 'source');
    expect(sourceSteps).toHaveLength(8);
    expect(sourceSteps.map((step) => step.source?.page)).toEqual([31, 31, 32, 32, 32, 33, 33, 33]);
  });
});

describe('Lesson 8 student notebook — static block contract and callout variants', () => {
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
      ['definition', '١. قطعة منتصفَي ضلعين في مثلث'],
      ['theorem', '٢. المبرهنة الأولى في المنتصفات — التوازي'],
      ['theorem', '٣. العلاقة الطولية لقطعة المنتصفين'],
      ['note', '٤. كيف نميّز المبرهنة ونطبّقها؟'],
      ['note', '٥. الهيكل المنطقي للبرهان'],
      ['warning', '٦. تنبيهات وأخطاء شائعة'],
    ]);
  });
});

describe('Lesson 8 student notebook — mathematical coverage and curriculum boundary', () => {
  it('covers the midpoint segment, both conclusions, recognition rules, proof skeleton, and pitfalls', () => {
    for (const expected of [
      'القطعة الواصلة بين منتصفَي ضلعين',
      'الضلع الثالث',
      'AM = MB,\\qquad AN = NC',
      '(MN) \\parallel (BC)',
      'MN = \\frac{1}{2}\\,BC',
      'BC = 2\\,MN',
      'سمِّ المثلث الذي تعمل فيه',
      'النقطة المساعدة $K$ نظيرة $M$ بالنسبة إلى $N$',
      'AMCK',
      'MBCK',
      'AM \\neq MB',
      'وليس نصف $AB$ أو نصف $AC$',
      'عدم الخلط بين نتيجتي التوازي والطول',
    ]) {
      expect(text, expected).toContain(expected);
    }
  });

  it('does not copy full teaching paragraphs or introduce the Lesson 9 converse theorem', () => {
    const parsedTeachingProof = lessonStepSchema.parse(teachingProof);
    const teachingProofParagraphs = walkBlocks(parsedTeachingProof.blocks).flatMap((block) =>
      block.type === 'list' ? block.items : block.type === 'paragraph' ? [block.text] : [],
    );
    for (const item of teachingProofParagraphs) {
      expect(text, item).not.toContain(item);
    }
    // Converse theorem (Unit 2, Lesson 2, pp. 34–35) and later proportionality theorems must not appear.
    expect(text).not.toMatch(/المبرهنة الثانية|عكس المبرهنة|يمرّ بمنتصف ضلع ويوازي|تاليس|ثلاث نسب/);
    // Dotted fill-in-the-blank markers from p. 31 scaffold must not appear.
    expect(text).not.toContain('...............');
  });
});

describe('Lesson 8 student notebook — zero exercise, assessment, teacher, or test-bank leakage', () => {
  it('does not leak printed exercise prompts, the printed p. 33 solution, or exercise-specific figures/values', () => {
    for (const prompt of [...L8_PRINTED_PROMPTS, L8_KNOWLEDGE_SOLUTION]) {
      expect(text, prompt.text).not.toContain(prompt.text);
    }
    // Exercise-specific configurations and numeric values from pp. 32–33 and assessments:
    expect(notebookJson).not.toMatch(
      /EFGH|ACI|BCD|ABD|JK|KN|LN|JM|C'B'|B'C'|نصف دائرة|معيّن|محيطه/,
    );
    expect(notebookJson).not.toMatch(/\b(14|16|12|4\.5|7\.6|3\.8)\b|mathrm\{cm\}/);
  });

  it('does not contain assessment IDs, prompts, choices, explanations, or Teacher Area solutions', () => {
    for (const question of lesson08Assessment.questions) {
      expect(notebookJson, question.id).not.toContain(question.id);
      for (const prompt of leaves(question.prompt)) {
        if (prompt.length >= 20) expect(text, prompt).not.toContain(prompt);
      }
      for (const explanation of leaves(question.explanation ?? [])) {
        if (explanation.length >= 20) expect(text, explanation).not.toContain(explanation);
      }
    }
    for (const solution of lesson08TeacherResources.textbookSolutions ?? []) {
      expect(notebookJson, solution.id).not.toContain(solution.id);
      expect(notebookJson, solution.reference).not.toContain(solution.reference);
      for (const value of leaves(solution.blocks)) {
        if (value.length >= 25) expect(text, value).not.toContain(value);
      }
    }
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

describe('Lesson 8 student notebook — KaTeX, Arabic RTL, navigation, progress, and Teacher stats', () => {
  it('renders valid KaTeX expressions, BIDI-safe prose, and natural RTL notebook label in StepRail', () => {
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

  it('integrates with outline, Prev/Next navigation, and localStorage progress without retaining hidden DOM panels', () => {
    const outline = renderRoute(routes.lesson(LESSON_ID));
    expect(
      within(outline.container).getByRole('link', { name: new RegExp(NOTEBOOK_TITLE) }),
    ).toHaveAttribute('href', routes.lessonStep(LESSON_ID, notebookStepNumber));
    outline.unmount();

    // Start at step 3 (`midline-explorer` lab), adjust slider and checkbox, navigate to notebook and back.
    const labStepNumber =
      lesson.steps.findIndex((step) => step.id === 'l8-step-a02-observation') + 1;
    const { container, unmount } = renderRoute(routes.lessonStep(LESSON_ID, labStepNumber));

    const slider = screen.getByLabelText(/ارتفاع الرأس/) as HTMLInputElement;
    const initialSliderValue = slider.value;
    const changedSliderValue = initialSliderValue === '6.2' ? '2.4' : '6.2';
    fireEvent.change(slider, { target: { value: changedSliderValue } });
    expect(slider.value).toBe(changedSliderValue);

    const checkbox = screen.getByLabelText(/أظهر متوازي الأضلاع/) as HTMLInputElement;
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);

    // Jump to step 13 (recap), then click Next into step 14 (notebook).
    const sidebar = () => screen.getByRole('navigation', { name: 'مخطّط الدرس' });
    fireEvent.click(within(sidebar()).getByRole('link', { name: new RegExp(teachingRecap.title) }));
    expect(
      screen.getByRole('heading', { level: 1, name: teachingRecap.title }),
    ).toBeInTheDocument();

    const stepNav = () => screen.getByRole('navigation', { name: 'التنقّل بين الخطوات' });
    fireEvent.click(within(stepNav()).getByRole('link', { name: new RegExp(NOTEBOOK_TITLE) }));

    expect(screen.getByRole('heading', { level: 1, name: NOTEBOOK_TITLE })).toBeInTheDocument();
    expect(container.querySelectorAll('article > div[hidden]')).toHaveLength(0);
    expect(loadProgress().lessons[LESSON_ID]?.completedStepIds).toEqual(
      expect.arrayContaining(['l8-step-a02-observation', 'l8-step-a05-recap', NOTEBOOK_ID]),
    );

    // Next action on the notebook step leads to the final assessment; Previous returns to recap.
    expect(within(stepNav()).getByRole('link', { name: /الاختبار النهائي/ })).toHaveAttribute(
      'href',
      routes.assessment(lesson08Assessment.id),
    );
    fireEvent.click(within(stepNav()).getByRole('link', { name: new RegExp(teachingRecap.title) }));
    expect(
      screen.getByRole('heading', { level: 1, name: teachingRecap.title }),
    ).toBeInTheDocument();

    // Returning to step 3 remounts `MidlineExplorer` at its initial state (non-retained path),
    // while viewed-step progress in localStorage remains intact.
    const sidebarStepLinks = within(within(sidebar()).getByRole('list')).getAllByRole('link');
    fireEvent.click(sidebarStepLinks[labStepNumber - 1]!);
    expect((screen.getByLabelText(/ارتفاع الرأس/) as HTMLInputElement).value).toBe(
      initialSliderValue,
    );
    expect((screen.getByLabelText(/أظهر متوازي الأضلاع/) as HTMLInputElement).checked).toBe(false);
    expect(loadProgress().lessons[LESSON_ID]?.completedStepIds).toContain(NOTEBOOK_ID);
    unmount();
  });

  it('excludes the notebook from ordinary platform teaching explanations in Teacher Area statistics', () => {
    expect(unlockTeacherArea(TEACHER_PASSPHRASE)).toBe(true);
    const { unmount } = renderRoute(routes.teacherLesson(LESSON_ID));
    const coverage = screen.getByRole('list', { name: 'تغطية المصدر' });
    const items = within(coverage)
      .getAllByRole('listitem')
      .map((item) => item.textContent?.replace(/\s+/g, ' ').trim());

    expect(items).toContain('خطوات منقولة حرفياً من الكتاب: 8');
    expect(items).toContain('خطوات شرح من إعداد المنصّة: 5');
    unmount();
  });
});
