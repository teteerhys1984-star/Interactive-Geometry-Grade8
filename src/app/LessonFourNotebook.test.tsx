import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { App } from './App';
import { allLessons, getLesson } from '@/content/registry';
import { lessonStepSchema } from '@/content/schema';
import type { ContentBlock } from '@/content/schema';
import { lesson04Notebook } from '@/content/units/lesson-04-notebook';
import { teachRecap } from '@/content/units/lesson-04-teaching';
import { lesson04Assessment } from '@/content/units/lesson-04-assessment';
import { lesson04TeacherResources } from '@/content/units/lesson-04-teacher';
import { questions as testBankQuestions } from '@/tests/questions/lesson-04';
import { solutionSet as testBankSolutions } from '@/tests/solutions/lesson-04-test';
import pageStyles from '@/routes/LessonStepPage.module.css';
import { routes } from '@/lib/routes';

const NOTEBOOK_ID = 'lesson-04-student-notebook';
const NOTEBOOK_TITLE = '📒 دفتر الطالب';
const LESSON_ID = 'lesson-04-triangle-congruence';
const lesson = getLesson(LESSON_ID)!.lesson;
const notebook = lesson.steps.at(-1)!;
const notebookNumber = lesson.steps.length;

const ORIGINAL_STEP_IDS = [
  'teach-04-01-why-congruence',
  'l4-step-01-activity',
  'l4-step-02-definition',
  'l4-step-03-case-one',
  'teach-04-02-cases-lab',
  'l4-step-04-example-one',
  'l4-step-05-case-two',
  'l4-step-06-example-two',
  'l4-step-07-case-three',
  'l4-step-08-example-three',
  'teach-04-03-choosing-case',
  'l4-step-09-check',
  'teach-04-04-check-walkthrough',
  'l4-step-10-practice-one',
  'teach-04-05-kite-lab',
  'l4-step-11-practice-two',
  'teach-04-06-pairs-lab',
  'l4-step-12-practice-three',
  'teach-04-07-proof-lab',
  'l4-step-13-right-triangles',
  'teach-04-08-recap',
];

function walk(blocks: readonly ContentBlock[]): ContentBlock[] {
  return blocks.flatMap((block) => [
    block,
    ...(block.type === 'callout' || block.type === 'teaching' ? walk(block.blocks) : []),
  ]);
}
function strings(blocks: readonly ContentBlock[]): string[] {
  return walk(blocks).flatMap((block) => {
    if (block.type === 'paragraph') return [block.text];
    if (block.type === 'list') return block.items;
    if (block.type === 'math') return [block.latex];
    return [];
  });
}
/** Every string leaf of an arbitrary structure (used for leakage checks). */
function leaves(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(leaves);
  if (value && typeof value === 'object') return Object.values(value).flatMap(leaves);
  return [];
}

const text = strings(notebook.blocks).join('\n');
const notebookJson = JSON.stringify(notebook);

const open = (step: number) =>
  render(
    <MemoryRouter initialEntries={[routes.lessonStep(LESSON_ID, step)]}>
      <App />
    </MemoryRouter>,
  );
const sidebar = () => screen.getByRole('navigation', { name: 'مخطّط الدرس' });

describe('lesson 4 student notebook — identity and placement', () => {
  it('validates as its own authored step and is the only copy in the course', () => {
    expect(notebook).toEqual(lessonStepSchema.parse(lesson04Notebook));
    expect(notebook).toMatchObject({
      id: NOTEBOOK_ID,
      title: NOTEBOOK_TITLE,
      origin: 'authored',
      kicker: 'شرح المنصّة',
    });
    expect(notebook.source).toBeUndefined();
    expect(notebook.check).toBeUndefined();
    expect(lesson.steps.filter((step) => step.id === NOTEBOOK_ID)).toHaveLength(1);
    expect(
      allLessons
        .filter(({ lesson: other }) => other.steps.some((step) => step.id === NOTEBOOK_ID))
        .map(({ lesson: other }) => other.id),
    ).toEqual([LESSON_ID]);
  });

  it('is step 22, directly after the unchanged recap, with the original 21 IDs in order', () => {
    expect(lesson.steps.map((step) => step.id)).toEqual([...ORIGINAL_STEP_IDS, NOTEBOOK_ID]);
    expect(notebookNumber).toBe(22);
    expect(lesson.steps[notebookNumber - 2]).toEqual(lessonStepSchema.parse(teachRecap));
    expect(lesson.steps.at(-1)).toEqual(lessonStepSchema.parse(lesson04Notebook));
  });

  it('keeps the assessment and the Teacher Area separate from the notebook', () => {
    expect(lesson.assessment?.questions).toHaveLength(lesson04Assessment.questions.length);
    expect(lesson.assessment?.id).toBe('lesson-04-final-assessment');
    expect(lesson.teacherResources?.textbookSolutions).toHaveLength(
      (lesson04TeacherResources.textbookSolutions ?? []).length,
    );
    expect(JSON.stringify(lesson.steps.filter((step) => step.origin === 'source'))).not.toContain(
      NOTEBOOK_ID,
    );
  });
});

describe('lesson 4 student notebook — static content structure', () => {
  it('uses only static copying blocks: callouts, paragraphs, lists and math', () => {
    const types = new Set(walk(notebook.blocks).map((block) => block.type));
    expect(types).toEqual(new Set(['callout', 'paragraph', 'list', 'math']));
    expect(JSON.stringify(notebook)).not.toMatch(
      /"type":"(figure|questionGroup|teaching|compare|table|button|input)"|"collapsible":true|"check"|"interactive"/,
    );
  });

  it('has exactly the six expected sections, in order', () => {
    expect(notebook.blocks.map((block) => block.type === 'callout' && block.title)).toEqual([
      '١. تعريف تطابق مثلثين',
      '٢. حالات تطابق المثلثات الثلاث',
      '٣. العناصر المتناظرة والاستنتاج',
      '٤. تطابق المثلثين القائمين',
      '٥. قواعد البرهان الهندسي',
      '٦. تنبيهات وأخطاء شائعة',
    ]);
  });

  it('covers the required mathematical content of the lesson', () => {
    for (const item of [
      'تساوت كل عناصر أحدهما مع العناصر المقابلة لها',
      "ABC \\cong A'B'C'",
      "A \\leftrightarrow A',\\quad B \\leftrightarrow B',\\quad C \\leftrightarrow C'",
      'ضلعان والزاوية المحصورة بينهما',
      'ضلع والزاويتان المجاورتان له',
      'الأضلاع الثلاثة',
      'الزاوية المحصورة بين ضلعين',
      'الوتر هو الضلع المقابل للزاوية القائمة',
      'وتر وضلع قائمة',
      'وتر وزاوية حادة',
      'لا تطبّق هاتين الحالتين على مثلثين غير قائمين',
      'لا تبدّل ترتيب الحروف',
      'حالة التطابق المستعملة قبل النتيجة',
      'ثلاث زوايا متساوية وحدها لا تثبت التطابق',
      'لا تُثبت التطابق بالنظر إلى الرسم',
    ]) {
      expect(text, item).toContain(item);
    }
  });

  it('contains no numbers, no angle symbol and no unsupported terms', () => {
    expect(text).not.toMatch(/[0-9٠-٩]/);
    expect(notebookJson).not.toMatch(/∠|\\\\angle|CPCTC|HL|RHS|فيثاغورس|مساحة|محيط/);
  });
});

describe('lesson 4 student notebook — no answer or teacher leakage', () => {
  it('does not contain assessment prompts, explanations, answer IDs or Teacher solutions', () => {
    for (const question of lesson04Assessment.questions) {
      expect(notebookJson, question.id).not.toContain(question.id);
      for (const prompt of leaves(question.prompt)) {
        if (prompt.length >= 20) expect(text, prompt).not.toContain(prompt);
      }
      for (const explanation of leaves(question.explanation ?? [])) {
        if (explanation.length >= 20) expect(text, explanation).not.toContain(explanation);
      }
    }
    for (const solution of lesson04TeacherResources.textbookSolutions ?? []) {
      expect(notebookJson, solution.id).not.toContain(solution.id);
      for (const value of leaves(solution)) {
        if (value.length >= 20) expect(text, value).not.toContain(value);
      }
    }
  });

  it('does not contain Test Area questions, solutions or their IDs', () => {
    for (const question of testBankQuestions) {
      expect(notebookJson, question.id).not.toContain(question.id);
      for (const value of leaves(question)) {
        if (value.length >= 30) expect(text, value).not.toContain(value);
      }
    }
    for (const [id, answer] of Object.entries(testBankSolutions.solutions)) {
      expect(notebookJson, id).not.toContain(id);
      for (const value of leaves(answer)) {
        if (value.length >= 30) expect(text, value).not.toContain(value);
      }
    }
  });

  it('never writes the exercise-specific correspondence used by the final assessment', () => {
    expect(notebookJson).not.toContain('DEF');
    expect(notebookJson).not.toContain('MEB');
  });
});

describe('lesson 4 student notebook — rendering in the lesson route', () => {
  it('renders the notebook as the last step with its title and notebook styling', () => {
    const { container, unmount } = open(notebookNumber);
    expect(screen.getByRole('heading', { level: 1, name: NOTEBOOK_TITLE })).toBeInTheDocument();
    const links = within(sidebar()).getAllByRole('link');
    expect(links.at(-1)).toHaveTextContent(NOTEBOOK_TITLE);
    expect(links.at(-1)).toHaveAttribute('href', routes.lessonStep(LESSON_ID, notebookNumber));
    expect(pageStyles.notebook).toBeTruthy();
    expect(container.querySelector('article > div')).toHaveClass(pageStyles.notebook!);
    expect(
      container.querySelectorAll('article button, article input, article select'),
    ).toHaveLength(0);
    expect(container.querySelectorAll('.katex-error')).toHaveLength(0);
    unmount();
  });

  it('does not wrap ordinary lesson steps in the notebook container', () => {
    const { container, unmount } = open(notebookNumber - 1);
    expect(screen.getByRole('heading', { level: 1, name: teachRecap.title })).toBeInTheDocument();
    expect(container.querySelector(`article > div.${pageStyles.notebook}`)).toBeNull();
    unmount();
  });
});
