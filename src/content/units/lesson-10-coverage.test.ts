import { describe, expect, it } from 'vitest';
import '@/components/diagram/renderers';
import { registeredRendererKeys } from '@/components/diagram/registry';
import { unit02 } from './unit-02-triangles-midpoints-parallels';
import { lesson10 } from './lesson-10-parallel-lines-transversals';
import { lesson10Assessment } from './lesson-10-assessment';
import { ALL_L10_FIGURE_SPECS, thalesRatioLabDiagram } from './lesson-10-figures';
import { lesson10TeacherResources } from './lesson-10-teacher';
import {
  L10_ACTIVITY_BULB,
  L10_ACTIVITY_BULB_QUOTE,
  L10_ACTIVITY_QUESTIONS,
  L10_ACTIVITY_SETUP,
  L10_ACTIVITY_SUBTITLE,
  L10_ACTIVITY_TABLE,
  L10_CHECK,
  L10_KHASSA_CORRECTION,
  L10_KHASSA_ERRATUM_TOKEN,
  L10_KHASSA_PRINTED,
  L10_KNOWLEDGE_CASE_1_GIVEN,
  L10_KNOWLEDGE_CASE_1_MATH,
  L10_KNOWLEDGE_CASE_1_RESULT,
  L10_KNOWLEDGE_CASE_2_GIVEN,
  L10_KNOWLEDGE_CASE_2_MATH,
  L10_KNOWLEDGE_CASE_2_RESULT,
  L10_KNOWLEDGE_HINT,
  L10_KNOWLEDGE_INTRO,
  L10_KNOWLEDGE_QUESTION,
  L10_LEARN_EXAMPLE,
  L10_LEARN_HEADING,
  L10_LEARN_TABLE,
  L10_PRACTICE_1,
  L10_PRACTICE_2,
  L10_PRINTED_PROMPTS,
} from './lesson-10-questions';

/**
 * ============================================================================
 *  LESSON 10 — Source Fidelity, Registration & Coverage Invariants
 * ============================================================================
 *
 *  Pins Unit 2 Lesson 3 («مستقيمات متوازية وقاطعان», pages 36–38) against:
 *    • registration in third position of Unit 2;
 *    • verbatim presence of every printed section, the «خاصة» box (with its
 *      documented $(MN) ∥ (AB) erratum), both worked cases and both exercises;
 *    • strict origin separation between source steps (page 36/37/38 refs) and
 *      authored steps («شرح المنصّة», no `source`);
 *    • 1-to-1 coverage in `lesson10TeacherResources.textbookSolutions`;
 *    • the registered `thales-ratio-lab` interactive and unique figure ids.
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
    if (Array.isArray(record.columns)) parts.push(...(record.columns as string[]));
    if (Array.isArray(record.blocks)) for (const child of record.blocks) walk(child);
  };
  for (const block of blocks) walk(block);
  return parts.join('\n');
};

const allSteps = lesson10.steps ?? [];
const sourceSteps = allSteps.filter((step) => step.origin === 'source');
const authoredSteps = allSteps.filter((step) => step.origin === 'authored');

describe('Unit 2 registration and Lesson 10 metadata', () => {
  it('registers Lesson 10 in the third position of Unit 2 right after Lesson 9 (Lesson 11 and the exercise set follow)', () => {
    const unitLessons = unit02.lessons ?? [];
    expect(unitLessons.map((lesson) => lesson.id)).toEqual([
      'lesson-08-triangle-midpoints',
      'lesson-09-parallel-from-midpoint',
      'lesson-10-parallel-lines-transversals',
      'lesson-11-three-ratios',
      'lesson-12-unit-two-exercises',
    ]);
    expect(unitLessons[2]).toBe(lesson10);
    expect(lesson10.title).toBe('مستقيمات متوازية وقاطعان');
    expect(lesson10.source).toEqual({
      page: '36–38',
      locator: 'الدرس الثالث من الوحدة الثانية',
    });
  });

  it('separates 6 verbatim source steps (pages 36–38) from 5 platform-authored teaching steps', () => {
    expect(sourceSteps.map((step) => step.id)).toEqual([
      'l10-step-01-activity',
      'l10-step-02-learn',
      'l10-step-03-khassa',
      'l10-step-04-knowledge',
      'l10-step-05-check',
      'l10-step-06-practice',
    ]);
    expect(authoredSteps.map((step) => step.id)).toEqual([
      'l10-step-a01-orientation',
      'l10-step-a02-lab-and-discovery',
      'l10-step-a03-theorem-guide',
      'l10-step-a04-computation-strategy',
      'l10-step-a05-recap',
    ]);

    for (const step of sourceSteps) {
      expect(step.source).toBeDefined();
      expect([36, 37, 38]).toContain(step.source?.page);
    }
    for (const step of authoredSteps) {
      expect(step.kicker).toBe('شرح المنصّة');
      expect(step.source).toBeUndefined();
    }
  });

  it('keeps pages 36, 37 and 38 in strict printed order across the source steps', () => {
    expect(sourceSteps.map((step) => step.source?.page)).toEqual([36, 36, 37, 37, 38, 38]);
  });
});

describe('verbatim coverage of textbook pages 36, 37 and 38', () => {
  const sourceCorpus = sourceSteps.map((step) => textOf(step.blocks)).join('\n');

  it('reproduces every printed section of page 36 (activity, table, bulb note, تعلّم example and table)', () => {
    expect(sourceSteps[0]!.source?.page).toBe(36);
    expect(sourceSteps[1]!.source?.page).toBe(36);

    for (const snippet of [
      L10_ACTIVITY_SUBTITLE,
      L10_ACTIVITY_SETUP,
      L10_ACTIVITY_QUESTIONS[0].text,
      L10_ACTIVITY_QUESTIONS[1].text,
      L10_ACTIVITY_BULB,
      L10_ACTIVITY_BULB_QUOTE,
      L10_ACTIVITY_TABLE.columns[1]!,
      L10_ACTIVITY_TABLE.secondRow[1]!,
      L10_LEARN_HEADING,
      L10_LEARN_EXAMPLE,
      L10_LEARN_TABLE.columns[1]!,
      L10_LEARN_TABLE.secondRow[1]!,
    ]) {
      expect(sourceCorpus).toContain(snippet);
    }
  });

  it('reproduces the page-37 «خاصة» box verbatim, including its printed erratum, with an explicit correction', () => {
    const khassaStep = sourceSteps[2]!;
    expect(khassaStep.source?.page).toBe(37);
    expect(sourceCorpus).toContain(L10_KHASSA_PRINTED);
    expect(sourceCorpus).toContain(L10_KHASSA_ERRATUM_TOKEN);
    expect(sourceCorpus).toContain(L10_KHASSA_CORRECTION);
    expect(String(khassaStep.source?.note)).toContain('صندوق «خاصة»');
    // The corrected parallelism is the one used by every worked example.
    expect(L10_KHASSA_ERRATUM_TOKEN).toContain('(AB)');
    expect(L10_KHASSA_CORRECTION).toContain('(BC)');
  });

  it('reproduces the page-37 worked example: question, both givens, hint and both printed solutions with AS = 12 and AS = 4', () => {
    const knowledgeStep = sourceSteps[3]!;
    expect(knowledgeStep.source?.page).toBe(37);
    expect(knowledgeStep.title).toBe(L10_KNOWLEDGE_QUESTION);

    for (const snippet of [
      L10_KNOWLEDGE_INTRO,
      L10_KNOWLEDGE_CASE_1_GIVEN,
      L10_KNOWLEDGE_CASE_2_GIVEN,
      L10_KNOWLEDGE_HINT,
      L10_KNOWLEDGE_CASE_1_MATH,
      L10_KNOWLEDGE_CASE_1_RESULT,
      L10_KNOWLEDGE_CASE_2_MATH,
      L10_KNOWLEDGE_CASE_2_RESULT,
    ]) {
      expect(sourceCorpus).toContain(snippet);
    }
    expect(sourceCorpus).toContain('AS = \\frac{3 \\times 8}{2} = 12');
    expect(sourceCorpus).toContain('AS = \\frac{10 \\times 2}{5} = 4');
  });

  it('reproduces both page-38 printed exercise prompts (تحقّق and تدرّب ① و②)', () => {
    for (const step of sourceSteps.slice(4)) {
      expect(step.source?.page).toBe(38);
    }
    expect(sourceCorpus).toContain(L10_CHECK);
    expect(sourceCorpus).toContain(L10_PRACTICE_1);
    expect(sourceCorpus).toContain(L10_PRACTICE_2);
  });
});

describe('printed prompts parity with Teacher Area solutions & formative assessment', () => {
  it('accounts for all 7 printed prompts across pages 36–38 in L10_PRINTED_PROMPTS', () => {
    expect(L10_PRINTED_PROMPTS).toHaveLength(7);
    expect(new Set(L10_PRINTED_PROMPTS).size).toBe(7);
  });

  it('provides one teacher-derived textbookSolution record per printed prompt in exact page order', () => {
    const solutions = lesson10TeacherResources.textbookSolutions ?? [];
    expect(solutions).toHaveLength(L10_PRINTED_PROMPTS.length);
    expect(solutions.map((item) => item.question)).toEqual([...L10_PRINTED_PROMPTS]);
    expect(new Set(solutions.map((item) => item.id)).size).toBe(solutions.length);
    // Every record carries the full detailed-solution contract.
    for (const record of solutions) {
      expect(record.blocks.length).toBeGreaterThanOrEqual(6);
      expect(record.reference).toMatch(/صفحة 3[678]/);
    }
  });

  it('includes an 8-question formative assessment spanning only multiple-choice, true-false, and numeric items', () => {
    const questions = lesson10Assessment.questions;
    expect(questions).toHaveLength(8);
    expect(new Set(questions.map((q) => q.id)).size).toBe(8);
    expect(new Set(questions.map((q) => q.type))).toEqual(
      new Set(['multiple-choice', 'true-false', 'numeric']),
    );
    expect(questions.every((q) => q.origin === 'authored')).toBe(true);
  });
});

describe('Lesson 10 figures and the Thales ratio lab', () => {
  it('publishes nine unique constructed FigureSpecs with the locked figure ids', () => {
    expect(ALL_L10_FIGURE_SPECS).toHaveLength(9);
    const ids = ALL_L10_FIGURE_SPECS.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(9);
    for (const id of [
      'fig-l10-activity-panels',
      'fig-l10-transversal',
      'fig-l10-example-one',
      'fig-l10-example-two',
      'fig-l10-check-aef',
      'fig-l10-bundle-one',
      'fig-l10-bundle-two',
      'fig-l10-practice-jkl-starter',
      'fig-l10-practice-jkl-solved',
    ]) {
      expect(ids).toContain(id);
    }
  });

  it('registers the thales-ratio-lab interactive renderer referenced by the lab diagram', () => {
    expect(thalesRatioLabDiagram.kind).toBe('interactive');
    expect(thalesRatioLabDiagram.renderer).toBe('thales-ratio-lab');
    expect(thalesRatioLabDiagram.id).toBe('auth-10-thales-ratio-lab');
    expect(registeredRendererKeys().interactive).toContain('thales-ratio-lab');
  });

  it('embeds the interactive lab in an authored teaching step, never inside a source step', () => {
    const labStep = authoredSteps.find((step) => step.id === 'l10-step-a02-lab-and-discovery');
    expect(labStep).toBeDefined();
    const rendered = JSON.stringify(labStep!.blocks);
    expect(rendered).toContain('thales-ratio-lab');
    for (const step of sourceSteps) {
      expect(JSON.stringify(step.blocks)).not.toContain('thales-ratio-lab');
    }
  });
});
