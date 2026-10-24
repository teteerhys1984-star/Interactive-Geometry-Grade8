import { describe, expect, it } from 'vitest';
import { lesson08 } from './lesson-08-midpoints';
import { lesson08Assessment } from './lesson-08-assessment';
import { lesson08TeacherResources } from './lesson-08-teacher';
import {
  L8_ACTIVITY_QUESTIONS,
  L8_CHECK_QUESTIONS,
  L8_EXAMPLE_PROMPT,
  L8_KNOWLEDGE_PROMPT,
  L8_KNOWLEDGE_SOLUTION,
  L8_PRACTICE_ONE,
  L8_PRACTICE_THREE,
  L8_PRACTICE_TWO,
  L8_PRINTED_COUNTS,
  L8_PRINTED_PROMPTS,
  L8_PROOF_PROMPT,
  L8_PROOF_START,
  L8_PROOF_STEPS,
} from './lesson-08-questions';

/**
 * ============================================================================
 *  LESSON 8 — structure and coverage invariants
 * ============================================================================
 *
 *  The lesson is faithful only if every supplied page is there, in printed
 *  order, inside a `source` step that names its page, with the platform's own
 *  material kept separate and badged. These assertions pin the coverage matrix
 *  in `docs/UNIT-02-LESSON-01-COVERAGE.md`.
 *
 *  This file says nothing about the end-of-lesson Test Area bank
 *  (`src/tests/questions/lesson-08.ts`), which is audited separately by
 *  `src/tests/audit.test.ts` and `src/tests/visualAudit.test.ts`.
 * ============================================================================
 */

type Block = { type: string; [key: string]: unknown };

const blocksOf = (blocks: readonly unknown[]): Block[] => blocks as Block[];

/** Flatten all the prose of a block tree — enough to assert on wording. */
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

const diagramsOf = (blocks: readonly unknown[]): Block[] => {
  const output: Block[] = [];
  const walk = (block: unknown): void => {
    if (!block || typeof block !== 'object') return;
    const record = block as Block;
    if (record.type === 'figure' && record.diagram) output.push(record.diagram as Block);
    if (Array.isArray(record.blocks)) for (const child of record.blocks) walk(child);
  };
  for (const block of blocks) walk(block);
  return output;
};

const allSteps = lesson08.steps as NonNullable<typeof lesson08.steps>;
const sourceSteps = allSteps.filter((step) => step.origin === 'source');
const authoredSteps = allSteps.filter((step) => step.origin === 'authored');

describe('lesson 8 covers pages 31–33 in printed order', () => {
  it('numbers its eight source steps in sequence', () => {
    expect(sourceSteps.map((step) => step.id)).toEqual([
      'l8-step-01-activity',
      'l8-step-02-proof-scaffold',
      'l8-step-03-theorem',
      'l8-step-04-example',
      'l8-step-05-knowledge',
      'l8-step-06-knowledge-solution',
      'l8-step-07-check',
      'l8-step-08-practice',
    ]);
  });

  it('gives every source step a page and a locator inside 31–33', () => {
    for (const step of sourceSteps) {
      const source = step.source;
      expect(source, step.id).toBeDefined();
      expect(source?.page as number, step.id).toBeGreaterThanOrEqual(31);
      expect(source?.page as number, step.id).toBeLessThanOrEqual(33);
      expect((source?.locator ?? '').trim().length, step.id).toBeGreaterThan(0);
    }
  });

  it('walks the pages in non-decreasing order', () => {
    const pages = sourceSteps.map((step) => step.source!.page as number);
    expect(pages).toEqual([...pages].sort((a, b) => a - b));
  });

  it('has five authored steps, each badged «شرح المنصّة» and page-free', () => {
    expect(authoredSteps).toHaveLength(5);
    for (const step of authoredSteps) {
      expect(step.kicker, step.id).toBe('شرح المنصّة');
      expect(step.source, step.id).toBeUndefined();
    }
  });

  it('interleaves the platform steps without ever breaking the printed sequence', () => {
    const origins = allSteps.map((step) => step.origin);
    const lastAuthored = origins.lastIndexOf('authored');
    expect(lastAuthored).toBe(origins.length - 1);
    for (let index = 0; index < lastAuthored; index += 1) {
      if (origins[index] === 'authored') expect(origins[index + 1]).toBe('source');
    }
    // The printed pages, read on their own, are still 31 → 33.
    const sourcePages = sourceSteps.map((step) => String(step.source?.page));
    expect(sourcePages).toEqual(['31', '31', '32', '32', '32', '33', '33', '33']);
  });
});

describe('lesson 8 names the lesson correctly and never borrows the unit opener', () => {
  it('uses the printed lesson title, not «انطلاقة نشطة»', () => {
    expect(lesson08.title).toBe('منتصفا ضلعين في المثلث');
    expect(lesson08.title).not.toContain('انطلاقة');
  });

  it('mentions the unit opener only as context, never as a reproduced page', () => {
    const orientation = authoredSteps.find((step) => step.id === 'l8-step-a01-orientation')!;
    expect(textOf(orientation.blocks)).toContain('انطلاقة نشطة');
    // No source step claims page 30: its wording was not legible in the scan.
    expect(sourceSteps.some((step) => String(step.source?.page) === '30')).toBe(false);
  });

  it('declares no summary, objectives or vocabulary (absent from the source)', () => {
    expect(lesson08.summary).toBeUndefined();
    expect(lesson08.objectives ?? []).toEqual([]);
    expect(lesson08.vocabulary ?? []).toEqual([]);
  });
});

describe('lesson 8 reproduces the printed prompts verbatim', () => {
  it('carries the activity construction as one printed question group', () => {
    const activity = sourceSteps.find((step) => step.id === 'l8-step-01-activity')!;
    const groups = blocksOf(activity.blocks).filter((block) => block.type === 'questionGroup');
    expect(groups).toHaveLength(1);
    const items = groups[0]!.items as { label: string; text: string }[];
    expect(items.map((item) => item.label)).toEqual(['1.', '2.']);
    expect(items.map((item) => item.text)).toEqual(L8_ACTIVITY_QUESTIONS.map((item) => item.text));
  });

  it('keeps the three proof blanks in printed order', () => {
    const proof = sourceSteps.find((step) => step.id === 'l8-step-02-proof-scaffold')!;
    const text = textOf(proof.blocks);
    expect(text).toContain(L8_PROOF_START.text);
    expect(text).toContain(L8_PROOF_PROMPT.text);
    for (const item of L8_PROOF_STEPS) expect(text).toContain(item.text);
    // Three numbered blanks, each ending on a dotted gap or on the conclusion.
    expect(L8_PROOF_STEPS.filter((item) => item.text.includes('...............'))).toHaveLength(2);
  });

  it('carries the theorem, the example and «اكتساب معارف» word for word', () => {
    const theorem = textOf(sourceSteps.find((step) => step.id === 'l8-step-03-theorem')!.blocks);
    expect(theorem).toContain('المستقيم المار بمنتصفي ضلعين في مثلث يوازي الضلع الثالث.');
    expect(theorem).toContain('القطعة الواصلة بين منتصفي ضلعين في مثلث تساوي نصف طول الضلع الثالث.');

    const example = textOf(sourceSteps.find((step) => step.id === 'l8-step-04-example')!.blocks);
    expect(example).toContain(L8_EXAMPLE_PROMPT.text);

    const knowledge = textOf(sourceSteps.find((step) => step.id === 'l8-step-05-knowledge')!.blocks);
    expect(knowledge).toContain(L8_KNOWLEDGE_PROMPT.text);

    // Page 33 prints exactly one solution; it is reproduced, not re-derived.
    const printed = textOf(
      sourceSteps.find((step) => step.id === 'l8-step-06-knowledge-solution')!.blocks,
    );
    expect(printed).toContain(L8_KNOWLEDGE_SOLUTION.text);
  });

  it('carries the five parts of «تحقّق من فهمك» in printed order', () => {
    const check = sourceSteps.find((step) => step.id === 'l8-step-07-check')!;
    const groups = blocksOf(check.blocks).filter((block) => block.type === 'questionGroup');
    expect(groups).toHaveLength(1);
    const items = groups[0]!.items as { label: string; text: string }[];
    expect(items.map((item) => item.label)).toEqual(['①', '②', '③', '④', '—']);
    expect(items.map((item) => item.text)).toEqual(L8_CHECK_QUESTIONS.map((item) => item.text));
  });

  it('carries the three «تدرّب» prompts with their figures, in printed order', () => {
    const practice = sourceSteps.find((step) => step.id === 'l8-step-08-practice')!;
    const text = textOf(practice.blocks);
    expect(text).toContain(L8_PRACTICE_ONE.text);
    expect(text).toContain(L8_PRACTICE_TWO.text);
    expect(text).toContain(L8_PRACTICE_THREE.text);
    expect(diagramsOf(practice.blocks)).toHaveLength(3);
  });
});

describe('lesson 8 never falls back on the book', () => {
  it('draws a figure on every step that discusses a figure', () => {
    const figureSteps = [
      'l8-step-01-activity',
      'l8-step-02-proof-scaffold',
      'l8-step-03-theorem',
      'l8-step-04-example',
      'l8-step-05-knowledge',
      'l8-step-07-check',
      'l8-step-08-practice',
    ];
    for (const id of figureSteps) {
      const step = sourceSteps.find((entry) => entry.id === id)!;
      expect(diagramsOf(step.blocks).length, id).toBeGreaterThan(0);
    }
  });

  it('has no `reference` diagram and no «راجع الكتاب» hand-off', () => {
    const serialised = JSON.stringify(lesson08);
    expect(serialised).not.toContain('راجع الكتاب');
    expect(serialised).not.toContain('"kind":"reference"');
  });

  it('never writes a bare «∠» or a LaTeX \\angle', () => {
    const serialised = JSON.stringify(lesson08);
    expect(serialised).not.toContain('∠');
    expect(serialised).not.toContain('\\\\angle');
  });

  it('badges every figure as a platform drawing, with a page and an alt', () => {
    const figures = allSteps
      .flatMap((step) => diagramsOf(step.blocks))
      .filter((diagram) => diagram.kind === 'constructed');
    // Eleven platform drawings: the activity, the proof (twice — the source
    // step and the platform's own explanation), the theorem, the example
    // (twice), «اكتساب معارف», «تحقّق من فهمك» and the three «تدرّب» figures.
    expect(figures).toHaveLength(11);
    for (const diagram of figures) {
      expect(diagram.kind, String(diagram.id)).toBe('constructed');
      expect(diagram.origin, String(diagram.id)).toBe('authored');
      expect(diagram.renderer, String(diagram.id)).toBe('midline-figure');
      expect(String(diagram.alt).length, String(diagram.id)).toBeGreaterThan(30);
      expect(String(diagram.caption), String(diagram.id)).toMatch(/إعداد المنصّة/);
      expect([31, 32, 33], String(diagram.id)).toContain(
        Number((diagram.source as { page?: number } | undefined)?.page),
      );
      // Not-to-scale must be said out loud on every drawing.
      expect(String(diagram.caption), String(diagram.id)).toMatch(/غير مقيّس|تخطيطي/);
    }
  });

  it('exposes the page-31 observation as one interactive lab with the three printed cases', () => {
    const labs = allSteps
      .flatMap((step) => diagramsOf(step.blocks))
      .filter((diagram) => diagram.kind === 'interactive');
    expect(labs).toHaveLength(1);
    expect(labs[0]!.renderer).toBe('midline-explorer');
    const params = labs[0]!.params as { presets: { id: string; y: number }[] };
    expect(params.presets.map((preset) => preset.id)).toEqual(['acute', 'right', 'obtuse']);
    // The three presets are the three heights the activity asks the student to draw.
    const ys = params.presets.map((preset) => preset.y);
    expect(new Set(ys).size).toBe(3);
    expect(Math.max(...ys)).toBeGreaterThan(6);
    expect(Math.min(...ys)).toBeLessThan(3);
  });
});

describe('the Teacher Area answers every printed prompt', () => {
  const solutions = lesson08TeacherResources.textbookSolutions ?? [];

  it('has exactly one solution per printed prompt', () => {
    expect(L8_PRINTED_COUNTS.total).toBe(17);
    expect(L8_PRINTED_PROMPTS).toHaveLength(L8_PRINTED_COUNTS.total);
    expect(solutions).toHaveLength(L8_PRINTED_COUNTS.total);
  });

  it('answers each printed prompt verbatim', () => {
    const solved = solutions.map((solution) => solution.question);
    for (const prompt of L8_PRINTED_PROMPTS) {
      expect(solved, prompt.text).toContain(prompt.text);
    }
    expect(new Set(solved).size).toBe(solved.length);
  });

  it('gives every solution a page reference and a worked answer, not a verdict', () => {
    for (const solution of solutions) {
      expect(solution.reference, solution.id).toMatch(/صفحة ٣[١٢٣]/);
      const text = textOf(solution.blocks ?? []);
      expect(text.length, solution.id).toBeGreaterThan(300);
      expect(text).not.toContain('راجع الكتاب');
      expect(text).not.toContain('انظر الكتاب');
      // The five required parts of a teacher solution.
      expect(text, solution.id).toContain('المعطيات');
      expect(text, solution.id).toContain('القاعدة المستعملة');
      expect(text, solution.id).toContain('تحقّق مستقل');
      expect(text, solution.id).toContain('الخطأ الشائع');
      expect(text, solution.id).toContain('قراءة الشكل');
    }
  });

  it('covers the four different triangles of «تحقّق من فهمك» separately', () => {
    const records = solutions.filter((solution) => solution.reference.includes('تحقّق من فهمك'));
    expect(records).toHaveLength(5);
    const text = records.map((record) => textOf(record.blocks ?? ''));
    expect(text[0]).toMatch(/المثلث \$ABC\$/);
    expect(text[1]).toMatch(/المثلث \$ACD\$/);
    expect(text[2]).toMatch(/المثلث \$BCD\$/);
    expect(text[3]).toMatch(/المثلث \$ABD\$/);
    expect(text[4]).toMatch(/تعدية التوازي|متوازيان/);
  });

  it('flags no solution as limited: every figure is drawn', () => {
    expect(solutions.filter((solution) => solution.limitation)).toEqual([]);
  });

  it('keeps the pedagogical notes and the source record', () => {
    const text = textOf(lesson08TeacherResources.notes ?? []);
    expect(text).toContain('لا تتضمّن أي إجابات مطبوعة');
    expect(text).toContain('UNIT-02-LESSON-01-SOURCE.md');
    expect(text).toContain('UNIT-02-LESSON-01-FIGURES.md');
  });
});

describe('the assessment is platform work and never a replacement', () => {
  const questions = lesson08Assessment.questions;

  it('marks every question as authored, with an explanation and a skill', () => {
    expect(questions).toHaveLength(12);
    for (const question of questions) {
      expect(question.origin, question.id).toBe('authored');
      expect(textOf(question.explanation ?? []).length, question.id).toBeGreaterThan(60);
      expect(question.skill?.trim().length ?? 0, question.id).toBeGreaterThan(0);
    }
    expect(new Set(questions.map((question) => question.id)).size).toBe(questions.length);
  });

  it('asks at least three kinds of question and grades the numeric ones exactly', () => {
    const kinds = new Set(questions.map((question) => question.type));
    expect(kinds.size).toBeGreaterThanOrEqual(3);
    const numeric = questions.filter((question) => question.type === 'numeric');
    expect(numeric).toHaveLength(3);
    for (const question of numeric) {
      if (question.type !== 'numeric') continue;
      expect(question.tolerance).toBe(0);
    }
  });

  it('covers the arithmetic the printed pages force: 7, 9 and 12', () => {
    const answers = questions
      .filter((question) => question.type === 'numeric')
      .map((question) => (question.type === 'numeric' ? question.answer : null));
    expect(answers.sort((a, b) => (a ?? 0) - (b ?? 0))).toEqual([7, 9, 12]);
  });

  it('keeps one defensible answer per multiple-choice question', () => {
    for (const question of questions) {
      if (question.type !== 'multiple-choice') continue;
      const ids = question.choices.map((choice) => choice.id);
      expect(new Set(ids).size, question.id).toBe(ids.length);
      expect(ids, question.id).toContain(question.correctChoiceId);
      expect(textOf(question.prompt).length, question.id).toBeGreaterThan(20);
    }
  });
});
