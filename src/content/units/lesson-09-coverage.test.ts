import { describe, expect, it } from 'vitest';
import { unit02 } from './unit-02-triangles-midpoints-parallels';
import { lesson09 } from './lesson-09-parallel-from-midpoint';
import { lesson09Assessment } from './lesson-09-assessment';
import { lesson09TeacherResources } from './lesson-09-teacher';
import {
  L9_ACTIVITY_QUESTIONS,
  L9_ACTIVITY_SETUP_1,
  L9_ACTIVITY_SETUP_2,
  L9_ACTIVITY_SUBTITLE,
  L9_CHECK_ONE,
  L9_CHECK_REMINDER,
  L9_CHECK_TWO,
  L9_EXAMPLE_GIVEN,
  L9_EXAMPLE_REASON,
  L9_EXAMPLE_RESULT,
  L9_KNOWLEDGE_ERRATUM_CLAUSE,
  L9_KNOWLEDGE_HINTS,
  L9_KNOWLEDGE_PROMPT,
  L9_KNOWLEDGE_QUESTION,
  L9_KNOWLEDGE_SOLUTION,
  L9_METHOD_STEPS,
  L9_METHOD_TITLE,
  L9_PRACTICE_ONE_INTRO,
  L9_PRACTICE_ONE_PARTS,
  L9_PRACTICE_TWO,
  L9_PRINTED_PROMPTS,
  L9_THEOREM_STATEMENT,
} from './lesson-09-questions';

/**
 * ============================================================================
 *  LESSON 9 — Source Fidelity, Registration & Coverage Invariants
 * ============================================================================
 *
 *  Pins Unit 2 Lesson 2 («موازٍ لضلع من منتصف ضلع آخر», pages 34–35) against:
 *    • registration in second position of Unit 2;
 *    • verbatim presence of every printed section, theorem, worked example,
 *      hint, reminder, and exercise from pages 34 and 35;
 *    • explicit documentation of the page-35 printing carryover clause;
 *    • strict origin separation between `source` steps (with page 34/35 refs)
 *      and `authored` steps (`شرح المنصّة`, no `source`);
 *    • 1-to-1 coverage in `lesson09TeacherResources.textbookSolutions`.
 * ============================================================================
 */

type Block = { type: string; [key: string]: unknown };

const textOf = (blocks: readonly unknown[]): string => {
  const parts: string[] = [];
  const walk = (block: unknown): void => {
    if (!block || typeof block !== 'object') return;
    const record = block as Block;
    if (typeof record.text === 'string') parts.push(record.text);
    if (typeof record.title === 'string') parts.push(record.title);
    if (typeof record.latex === 'string') parts.push(record.latex);
    if (Array.isArray(record.items)) {
      for (const item of record.items) {
        if (typeof item === 'string') parts.push(item);
        else if (item && typeof item === 'object' && 'text' in (item as Block)) {
          parts.push(String((item as Block).text));
        }
      }
    }
    if (Array.isArray(record.rows)) {
      for (const row of record.rows as unknown[][]) parts.push(row.join(' '));
    }
    if (Array.isArray(record.blocks)) for (const child of record.blocks) walk(child);
  };
  for (const block of blocks) walk(block);
  return parts.join(' ');
};

const allSteps = lesson09.steps ?? [];
const sourceSteps = allSteps.filter((step) => step.origin === 'source');
const authoredSteps = allSteps.filter((step) => step.origin === 'authored');

describe('Unit 2 registration and Lesson 9 metadata', () => {
  it('registers Lesson 9 in the second position of Unit 2 right after Lesson 8 (Lessons 10 and 11 follow)', () => {
    const unitLessons = unit02.lessons ?? [];
    expect(unitLessons.map((lesson) => lesson.id)).toEqual([
      'lesson-08-triangle-midpoints',
      'lesson-09-parallel-from-midpoint',
      'lesson-10-parallel-lines-transversals',
      'lesson-11-three-ratios',
    ]);
    expect(unitLessons[1]).toBe(lesson09);
    expect(lesson09.title).toBe('موازٍ لضلع من منتصف ضلع آخر');
    expect(lesson09.source).toEqual({
      page: '34–35',
      locator: 'الدرس الثاني من الوحدة الثانية',
    });
  });

  it('separates 6 verbatim source steps (pages 34–35) from 5 platform-authored teaching steps', () => {
    expect(sourceSteps.map((step) => step.id)).toEqual([
      'l9-step-01-activity',
      'l9-step-02-theorem',
      'l9-step-03-knowledge',
      'l9-step-04-knowledge-solution',
      'l9-step-05-check',
      'l9-step-06-practice',
    ]);
    expect(authoredSteps.map((step) => step.id)).toEqual([
      'l9-step-a01-orientation',
      'l9-step-a02-lab-and-proof',
      'l9-step-a03-method-guide',
      'l9-step-a04-subtriangle-strategy',
      'l9-step-a05-recap',
    ]);

    for (const step of sourceSteps) {
      expect(step.source).toBeDefined();
      expect([34, 35]).toContain(step.source?.page);
    }
    for (const step of authoredSteps) {
      expect(step.kicker).toBe('شرح المنصّة');
      expect(step.source).toBeUndefined();
    }
  });
});

describe('verbatim coverage of textbook pages 34 and 35', () => {
  const sourceCorpus = sourceSteps.map((step) => textOf(step.blocks)).join('\n');

  it('reproduces every printed section of page 34 (Activity, Second Midline Theorem, worked example, 3-step method)', () => {
    expect(sourceSteps[0]!.source?.page).toBe(34);
    expect(sourceSteps[1]!.source?.page).toBe(34);

    for (const snippet of [
      L9_ACTIVITY_SUBTITLE,
      L9_ACTIVITY_SETUP_1,
      L9_ACTIVITY_SETUP_2,
      L9_ACTIVITY_QUESTIONS[0].text,
      L9_ACTIVITY_QUESTIONS[1].text,
      L9_THEOREM_STATEMENT,
      L9_EXAMPLE_GIVEN,
      L9_EXAMPLE_REASON,
      L9_EXAMPLE_RESULT,
      L9_METHOD_TITLE,
      ...L9_METHOD_STEPS,
    ]) {
      expect(sourceCorpus).toContain(snippet);
    }
  });

  it('reproduces every printed section of page 35 (Acquire Knowledge, hints, solution, Check ①–②, reminder, Practice ①–②)', () => {
    for (const step of sourceSteps.slice(2)) {
      expect(step.source?.page).toBe(35);
    }

    expect(sourceSteps[2]!.title).toBe(L9_KNOWLEDGE_QUESTION);
    for (const snippet of [
      L9_KNOWLEDGE_PROMPT,
      ...L9_KNOWLEDGE_HINTS,
      L9_KNOWLEDGE_SOLUTION,
      L9_CHECK_ONE,
      L9_CHECK_TWO,
      L9_CHECK_REMINDER,
      L9_PRACTICE_ONE_INTRO,
      L9_PRACTICE_ONE_PARTS[0].text,
      L9_PRACTICE_ONE_PARTS[1].text,
      L9_PRACTICE_TWO,
    ]) {
      expect(sourceCorpus).toContain(snippet);
    }
  });

  it('documents the page-35 printing carryover clause explicitly without corrupting the proof body', () => {
    const solutionStep = sourceSteps[3]!;
    expect(L9_KNOWLEDGE_SOLUTION).not.toContain(L9_KNOWLEDGE_ERRATUM_CLAUSE);
    expect(solutionStep.source?.note).toContain('فالمستقيمان (OB) و (AI) متوازيان.');
    expect(textOf(solutionStep.blocks)).toContain(L9_KNOWLEDGE_ERRATUM_CLAUSE);
  });
});

describe('printed prompts parity with Teacher Area solutions & formative assessment', () => {
  it('accounts for all 9 printed prompts across pages 34 and 35 in L9_PRINTED_PROMPTS', () => {
    expect(L9_PRINTED_PROMPTS).toHaveLength(9);
  });

  it('provides one teacher-derived textbookSolution record per printed prompt in exact page order', () => {
    const solutions = lesson09TeacherResources.textbookSolutions ?? [];
    expect(solutions).toHaveLength(L9_PRINTED_PROMPTS.length);
    expect(solutions.map((item) => item.question)).toEqual([...L9_PRINTED_PROMPTS]);
    expect(new Set(solutions.map((item) => item.id)).size).toBe(solutions.length);
  });

  it('includes an 8-question formative assessment spanning multiple-choice, true-false, and exact numeric items', () => {
    const questions = lesson09Assessment.questions;
    expect(questions).toHaveLength(8);
    expect(new Set(questions.map((q) => q.id)).size).toBe(8);
    const types = new Set(questions.map((q) => q.type));
    expect(types).toEqual(new Set(['multiple-choice', 'true-false', 'numeric']));
  });
});
