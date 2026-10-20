import { describe, expect, it } from 'vitest';
import { lesson04 } from './lesson-04-triangle-congruence';
import {
  L4_PRINTED_PROMPTS,
  L4_PRACTICE_THREE_QUESTIONS,
  L4_RIGHT_TRIANGLES_ITEMS,
} from './lesson-04-questions';
import { lesson04TeacherResources } from './lesson-04-teacher';
import { lesson04Assessment } from './lesson-04-assessment';

/**
 * ============================================================================
 *  LESSON 4 — structure and coverage invariants
 * ============================================================================
 *
 *  The lesson is faithful only if the printed pages are all there, in order,
 *  each in a `source` step that names its page, with the platform's own
 *  material kept separate and badged. These assertions protect that shape, and
 *  they pin the coverage matrix in `docs/LESSON-04-COVERAGE.md`.
 *
 *  This file says nothing about the end-of-unit Test Area bank
 *  (`src/tests/questions/lesson-04.ts`), which is audited separately.
 * ============================================================================
 */

type Block = { type: string; [key: string]: unknown };

const blocksOf = (blocks: readonly unknown[]): Block[] => blocks as Block[];

/** All the prose of a block tree, flattened — enough to assert on wording. */
const textOf = (blocks: readonly unknown[]): string => {
  const parts: string[] = [];
  const walk = (block: unknown): void => {
    if (!block || typeof block !== 'object') return;
    const record = block as Block;
    if (typeof record.text === 'string') parts.push(record.text);
    if (typeof record.title === 'string') parts.push(record.title);
    if (Array.isArray(record.items)) {
      for (const item of record.items) {
        if (typeof item === 'string') parts.push(item);
        else if (item && typeof item === 'object' && 'text' in (item as Block)) {
          parts.push(String((item as Block).text));
        }
      }
    }
    if (Array.isArray(record.blocks)) for (const child of record.blocks) walk(child);
  };
  for (const block of blocks) walk(block);
  return parts.join(' ');
};

const allSteps = lesson04.steps as NonNullable<typeof lesson04.steps>;
const sourceSteps = allSteps.filter((step) => step.origin === 'source');
const authoredSteps = allSteps.filter((step) => step.origin === 'authored');

describe('lesson 4 covers pages 17-19 in printed order', () => {
  it('numbers its thirteen source steps in sequence', () => {
    expect(sourceSteps.map((step) => step.id)).toEqual([
      'l4-step-01-activity',
      'l4-step-02-definition',
      'l4-step-03-case-one',
      'l4-step-04-example-one',
      'l4-step-05-case-two',
      'l4-step-06-example-two',
      'l4-step-07-case-three',
      'l4-step-08-example-three',
      'l4-step-09-check',
      'l4-step-10-practice-one',
      'l4-step-11-practice-two',
      'l4-step-12-practice-three',
      'l4-step-13-right-triangles',
    ]);
  });

  it('gives every source step a page and a locator inside 17-19', () => {
    for (const step of sourceSteps) {
      const source = step.source;
      expect(source, step.id).toBeDefined();
      expect(source?.page as number, step.id).toBeGreaterThanOrEqual(17);
      expect(source?.page as number, step.id).toBeLessThanOrEqual(19);
      expect((source?.locator ?? "").trim().length, step.id).toBeGreaterThan(0);
    }
  });

  it('walks the pages in non-decreasing order', () => {
    const pages = sourceSteps.map((step) => step.source!.page as number);
    expect(pages).toEqual([...pages].sort((a, b) => a - b));
  });

  it('has eight authored steps, each badged «شرح المنصّة» and page-free', () => {
    expect(authoredSteps).toHaveLength(8);
    for (const step of authoredSteps) {
      expect(step.kicker, step.id).toBe('شرح المنصّة');
      // A platform explanation must never claim a printed page.
      expect(step.source, step.id).toBeUndefined();
    }
  });

  it('places each authored step before the printed work it prepares', () => {
    const origins = allSteps.map((step) => step.origin);
    const lastAuthored = origins.lastIndexOf('authored');
    expect(lastAuthored).toBe(origins.length - 1);
    for (let index = 0; index < lastAuthored; index += 1) {
      if (origins[index] === 'authored') expect(origins[index + 1]).toBe('source');
    }
  });
});

describe('lesson 4 reproduces the printed text verbatim', () => {
  it('carries the four activity questions in one printed question group', () => {
    const activity = sourceSteps.find((step) => step.id === 'l4-step-01-activity')!;
    const groups = blocksOf(activity.blocks).filter((block) => block.type === 'questionGroup');
    expect(groups).toHaveLength(1);
    const items = groups[0]!.items as { label: string; text: string }[];
    expect(items.map((item) => item.label)).toEqual(['1.', '2.', '3.', '4.']);
    expect(items[0]!.text).toContain('$N$');
    expect(items[0]!.text).toContain('$M$');
  });

  it('carries the four sub-questions of «تدرّب ③» in printed order', () => {
    const practice = sourceSteps.find((step) => step.id === 'l4-step-12-practice-three')!;
    const groups = blocksOf(practice.blocks).filter((block) => block.type === 'questionGroup');
    expect(groups).toHaveLength(1);
    const items = groups[0]!.items as { label: string; text: string }[];
    expect(items.map((item) => item.label)).toEqual(['1-', '2-', '3-', '4-']);
    expect(items.map((item) => item.text)).toEqual(
      L4_PRACTICE_THREE_QUESTIONS.map((item) => item.text),
    );
  });

  it('keeps the two right-triangle cases as a printed list', () => {
    const note = sourceSteps.find((step) => step.id === 'l4-step-13-right-triangles')!;
    const text = textOf(note.blocks);
    for (const item of L4_RIGHT_TRIANGLES_ITEMS) expect(text).toContain(item);
  });
});

describe('lesson 4 never falls back on the book', () => {
  it('draws a figure on every step that discusses a figure', () => {
    const figureSteps = [
      'l4-step-02-definition',
      'l4-step-04-example-one',
      'l4-step-06-example-two',
      'l4-step-08-example-three',
      'l4-step-09-check',
      'l4-step-10-practice-one',
      'l4-step-11-practice-two',
      'l4-step-12-practice-three',
    ];
    for (const id of figureSteps) {
      const step = sourceSteps.find((entry) => entry.id === id)!;
      expect(blocksOf(step.blocks).map((block) => block.type), id).toContain('figure');
    }
  });

  it('has no `reference` diagram and no «راجع الكتاب» hand-off', () => {
    const serialised = JSON.stringify(lesson04);
    expect(serialised).not.toContain('راجع الكتاب');
    expect(serialised).not.toContain('"kind":"reference"');
  });

  it('never writes a bare «∠» or a LaTeX \\angle', () => {
    const serialised = JSON.stringify(lesson04);
    expect(serialised).not.toContain('∠');
    expect(serialised).not.toContain('\\\\angle');
  });
});

describe('the Teacher Area answers every printed prompt', () => {
  const solutions = lesson04TeacherResources.textbookSolutions ?? [];

  it('has one solution per printed prompt, plus two extra pairs for «تدرّب ②»', () => {
    expect(L4_PRINTED_PROMPTS).toHaveLength(11);
    expect(solutions).toHaveLength(L4_PRINTED_PROMPTS.length + 2);
  });

  it('answers each printed prompt verbatim', () => {
    const solved = new Set(solutions.map((solution) => solution.question));
    for (const prompt of L4_PRINTED_PROMPTS) {
      expect(solved, prompt.text).toContain(prompt.text);
    }
  });

  it('gives every solution a page reference and a worked answer', () => {
    for (const solution of solutions) {
      expect(solution.reference, solution.id).toMatch(/صفحة 1[789]/);
      // A worked answer, not a verdict: the prose has to be substantial.
      const text = textOf(solution.blocks ?? []);
      expect(text.length, solution.id).toBeGreaterThan(80);
      expect(text).not.toContain('راجع الكتاب');
      expect(text).not.toContain('انظر الكتاب');
    }
  });

  it('covers the three printed pairs of «تدرّب ②» separately', () => {
    const pairs = solutions.filter((solution) => solution.reference.includes('تدرّب — ②'));
    expect(pairs).toHaveLength(3);
    expect(pairs.map((solution) => solution.reference)).toEqual([
      'صفحة 19 — تدرّب — ② — الشكل ①',
      'صفحة 19 — تدرّب — ② — الشكل ②',
      'صفحة 19 — تدرّب — ② — الشكل ③',
    ]);
    // Three different cases — otherwise the exercise has no point.
    expect(textOf(pairs[0]!.blocks ?? [])).toMatch(/الأضلاع الثلاثة/);
    expect(textOf(pairs[1]!.blocks ?? [])).toMatch(/الزاوية المحصورة/);
    expect(textOf(pairs[2]!.blocks ?? [])).toMatch(/الزاويتان المجاورتان/);
  });

  it('flags no solution as limited: every figure is drawn', () => {
    expect(solutions.filter((solution) => solution.limitation)).toEqual([]);
  });

  it('keeps the pedagogical notes and the figure report', () => {
    const text = textOf(lesson04TeacherResources.notes ?? []);
    expect(text).toContain('لا تتضمّن أي إجابات مطبوعة');
    expect(text).toContain('LESSON-04-FIGURES.md');
  });
});

describe('the assessment is platform work and never a replacement', () => {
  const questions = lesson04Assessment.questions;

  it('marks every question as authored, with an explanation and a skill', () => {
    expect(questions.length).toBeGreaterThanOrEqual(10);
    for (const question of questions) {
      expect(question.origin, question.id).toBe('authored');
      expect(textOf(question.explanation ?? []).length, question.id).toBeGreaterThan(20);
      expect(question.skill?.trim().length ?? 0, question.id).toBeGreaterThan(0);
    }
  });

  it('asks at least three kinds of question and grades the numeric ones exactly', () => {
    const kinds = new Set(questions.map((question) => question.type));
    expect(kinds.size).toBeGreaterThanOrEqual(3);
    const numeric = questions.filter((question) => question.type === 'numeric');
    expect(numeric).toHaveLength(2);
    for (const question of numeric) {
      if (question.type !== 'numeric') continue;
      expect(question.tolerance).toBe(0);
    }
  });

  it('covers the printed arithmetic: 10 and 54', () => {
    const answers = questions
      .filter((question) => question.type === 'numeric')
      .map((question) => (question.type === 'numeric' ? question.answer : null));
    expect(answers.sort((a, b) => (a ?? 0) - (b ?? 0))).toEqual([54, 60]);
  });
});
