import { describe, expect, it } from 'vitest';
import '@/components/diagram/renderers';
import { registeredRendererKeys } from '@/components/diagram/registry';
import type { ContentBlock, DiagramSpec } from '@/content/schema';
import { unit02 } from './unit-02-triangles-midpoints-parallels';
import { lesson11 } from './lesson-11-three-ratios';
import { lesson11Assessment } from './lesson-11-assessment';
import { ALL_L11_FIGURE_SPECS, threeRatiosLabDiagram } from './lesson-11-figures';
import { lesson11TeacherResources } from './lesson-11-teacher';
import {
  L11_ACTIVITY_GOAL,
  L11_ACTIVITY_SETUP,
  L11_ACTIVITY_SETUP_NOTE,
  L11_ACTIVITY_STEP1_GIVEN,
  L11_ACTIVITY_STEP2_CONSTRUCT_J,
  L11_ACTIVITY_STEP2_CONSTRUCT_P,
  L11_ACTIVITY_STEP3_CONSTRUCT_R,
  L11_ACTIVITY_STEP3_CONSTRUCT_S,
  L11_ACTIVITY_SUBTITLE,
  L11_CHECK_CASE_1,
  L11_CHECK_CASE_2,
  L11_CHECK_INTRO,
  L11_CORRESPONDENCE_AB,
  L11_CORRESPONDENCE_AC,
  L11_CORRESPONDENCE_PARALLEL,
  L11_EXAMPLE,
  L11_EXAMPLE_PROMPT,
  L11_NOTE_EXTENSION,
  L11_NOTE_WRITING,
  L11_PRACTICE_1,
  L11_PRACTICE_2,
  L11_PRACTICE_2_READING,
  L11_PRINTED_PROMPTS,
  L11_Q_AN_RATIO,
  L11_Q_BSNM,
  L11_Q_CS,
  L11_Q_J,
  L11_Q_N,
  L11_Q_P,
  L11_SOLUTION_AF,
  L11_SOLUTION_EF,
  L11_SOLUTION_INTRO,
  L11_SOLUTION_RATIOS,
  L11_SOLUTION_SUBST,
  L11_THEOREM_CORRECTION,
  L11_THEOREM_ERRATUM_TOKEN,
  L11_THEOREM_HEADING,
  L11_THEOREM_PRINTED,
  L11_WRITE_RULE_1,
  L11_WRITE_RULE_2,
} from './lesson-11-questions';

/**
 * ============================================================================
 *  LESSON 11 — Source Fidelity, Registration & Coverage Invariants
 * ============================================================================
 *
 *  Pins Unit 2 Lesson 4 («تساوي ثلاث نسب», pages 39–41) against:
 *    • registration in fourth (last) position of Unit 2;
 *    • verbatim presence of every printed section: the activity and its three
 *      parts, the theorem box (with its documented $(MN) \parallel (AB)$
 *      erratum), the extension note, the writing rules, the worked example and
 *      its printed solution, «تحقّق من فهمك» and both «تدرّب» sections;
 *    • strict origin separation between source steps (pages 39/40/41) and
 *      authored steps («شرح المنصّة», no `source`);
 *    • 1-to-1 coverage in `lesson11TeacherResources.textbookSolutions`;
 *    • the registered `three-ratios-lab` interactive and unique figure ids;
 *    • NO claim of unit completion.
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

const diagramsIn = (blocks: readonly ContentBlock[]): DiagramSpec[] =>
  blocks.flatMap((block) => {
    if (block.type === 'figure') return [block.diagram];
    if (block.type === 'callout' || block.type === 'teaching') return diagramsIn(block.blocks);
    return [];
  });

const allSteps = lesson11.steps ?? [];
const sourceSteps = allSteps.filter((step) => step.origin === 'source');
const authoredSteps = allSteps.filter((step) => step.origin === 'authored');

describe('Unit 2 registration and Lesson 11 metadata', () => {
  it('registers Lesson 11 in the fourth position of Unit 2 right after Lesson 10', () => {
    const unitLessons = unit02.lessons ?? [];
    expect(unitLessons.map((lesson) => lesson.id)).toEqual([
      'lesson-08-triangle-midpoints',
      'lesson-09-parallel-from-midpoint',
      'lesson-10-parallel-lines-transversals',
      'lesson-11-three-ratios',
    ]);
    expect(unitLessons[3]).toBe(lesson11);
    expect(lesson11.title).toBe('تساوي ثلاث نسب');
    expect(lesson11.source).toEqual({
      page: '39–41',
      locator: 'الدرس الرابع من الوحدة الثانية',
    });
  });

  it('keeps the unit free of a unit-level assessment and invents no lesson summary', () => {
    expect(unit02.assessment).toBeUndefined();
    expect(lesson11.summary).toBeUndefined();
    expect(lesson11.objectives ?? []).toEqual([]);
    expect(lesson11.vocabulary ?? []).toEqual([]);
  });

  it('separates 8 verbatim source steps (pages 39–41) from 6 platform-authored teaching steps', () => {
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
    expect(authoredSteps.map((step) => step.id)).toEqual([
      'l11-step-a01-orientation',
      'l11-step-a02-lab',
      'l11-step-a03-proof-map',
      'l11-step-a04-theorem-guide',
      'l11-step-a05-computation-strategy',
      'l11-step-a06-recap',
    ]);

    for (const step of sourceSteps) {
      expect(step.source).toBeDefined();
      expect([39, 40, 41]).toContain(step.source?.page);
    }
    for (const step of authoredSteps) {
      expect(step.kicker).toBe('شرح المنصّة');
      expect(step.source).toBeUndefined();
    }
  });

  it('keeps pages 39, 40 and 41 in strict printed order across the source steps', () => {
    expect(sourceSteps.map((step) => step.source?.page)).toEqual([39, 39, 39, 40, 40, 41, 41, 41]);
  });

  it('interleaves the authored steps without ever preceding the printed opening', () => {
    expect(allSteps[0]!.id).toBe('l11-step-a01-orientation');
    expect(allSteps[1]!.id).toBe('l11-step-01-activity');
    expect(allSteps.at(-1)!.id).toBe('l11-step-a06-recap');
    expect(new Set(allSteps.map((step) => step.id)).size).toBe(allSteps.length);
  });
});

describe('verbatim coverage of textbook pages 39, 40 and 41', () => {
  const sourceCorpus = sourceSteps.map((step) => textOf(step.blocks)).join('\n');

  it('reproduces the page-39 activity: title, givens, goal and the 2/3 given', () => {
    expect(sourceSteps[0]!.source?.page).toBe(39);
    for (const snippet of [
      L11_ACTIVITY_SUBTITLE,
      L11_ACTIVITY_SETUP,
      L11_ACTIVITY_GOAL,
      L11_ACTIVITY_STEP1_GIVEN,
    ]) {
      expect(sourceCorpus).toContain(snippet);
    }
    // The incomplete givens are documented, never silently completed.
    expect(L11_ACTIVITY_SETUP_NOTE.length).toBeGreaterThan(80);
    expect(sourceCorpus).toContain(L11_ACTIVITY_SETUP_NOTE);
  });

  it('reproduces the three-part construction and every printed question of page 39', () => {
    for (const snippet of [
      L11_ACTIVITY_STEP2_CONSTRUCT_J,
      L11_ACTIVITY_STEP2_CONSTRUCT_P,
      L11_ACTIVITY_STEP3_CONSTRUCT_R,
      L11_ACTIVITY_STEP3_CONSTRUCT_S,
      L11_Q_J,
      L11_Q_P,
      L11_Q_N,
      L11_Q_AN_RATIO,
      L11_Q_CS,
      L11_Q_BSNM,
    ]) {
      expect(sourceCorpus).toContain(snippet);
    }
  });

  it('reproduces the page-40 theorem box verbatim, including its printed erratum, with an explicit correction', () => {
    const theoremStep = sourceSteps[3]!;
    expect(theoremStep.source?.page).toBe(40);
    expect(theoremStep.title).toBe(L11_THEOREM_HEADING);
    expect(sourceCorpus).toContain(L11_THEOREM_PRINTED);
    expect(sourceCorpus).toContain(L11_THEOREM_ERRATUM_TOKEN);
    expect(String(theoremStep.source?.note)).toContain('صندوق المبرهنة');
    expect(String(theoremStep.source?.note)).toContain(L11_THEOREM_CORRECTION);
    // The printed box really does carry the impossible (AB); the correction (BC).
    expect(L11_THEOREM_PRINTED).toContain('(AB)');
    expect(L11_THEOREM_CORRECTION).toContain('(BC)');
  });

  it('reproduces the extension note, the writing rules and the three correspondences of page 40', () => {
    for (const snippet of [
      L11_NOTE_EXTENSION,
      L11_NOTE_WRITING,
      L11_WRITE_RULE_1,
      L11_WRITE_RULE_2,
      L11_CORRESPONDENCE_AB,
      L11_CORRESPONDENCE_AC,
      L11_CORRESPONDENCE_PARALLEL,
    ]) {
      expect(sourceCorpus).toContain(snippet);
    }
  });

  it('reproduces the page-40 example and its page-41 printed solution (AF = 4, EF = 10/3)', () => {
    expect(sourceSteps[4]!.source?.page).toBe(40);
    expect(sourceSteps[5]!.source?.page).toBe(41);
    for (const snippet of [
      L11_EXAMPLE,
      L11_EXAMPLE_PROMPT,
      L11_SOLUTION_INTRO,
      L11_SOLUTION_RATIOS,
      L11_SOLUTION_SUBST,
      L11_SOLUTION_AF,
      L11_SOLUTION_EF,
    ]) {
      expect(sourceCorpus).toContain(snippet);
    }
    expect(L11_SOLUTION_AF).toContain('= 4');
    expect(L11_SOLUTION_EF).toContain('\\frac{10}{3}');
  });

  it('reproduces both page-41 exercise sections (تحقّق من فهمك وتدرّب ① و②)', () => {
    for (const step of sourceSteps.slice(6)) {
      expect(step.source?.page).toBe(41);
    }
    for (const snippet of [
      L11_CHECK_INTRO,
      L11_CHECK_CASE_1,
      L11_CHECK_CASE_2,
      L11_PRACTICE_1,
      L11_PRACTICE_2,
    ]) {
      expect(sourceCorpus).toContain(snippet);
    }
    // The ternary equality is transcribed with its printed order 8/5 = x/15.
    expect(L11_PRACTICE_1).toContain('\\frac{8}{5}');
    expect(L11_PRACTICE_1).toContain('\\frac{x}{15}');
    // The arrow-only figures carry an explicit platform reading.
    expect(sourceCorpus).toContain(L11_PRACTICE_2_READING);
  });
});

describe('printed prompts parity with Teacher Area solutions & formative assessment', () => {
  it('accounts for all 11 printed prompts across pages 39–41 in L11_PRINTED_PROMPTS', () => {
    expect(L11_PRINTED_PROMPTS).toHaveLength(11);
    expect(new Set(L11_PRINTED_PROMPTS).size).toBe(11);
  });

  it('provides one teacher-derived textbookSolution record per printed prompt in exact page order', () => {
    const solutions = lesson11TeacherResources.textbookSolutions ?? [];
    expect(solutions).toHaveLength(L11_PRINTED_PROMPTS.length);
    expect(solutions.map((item) => item.question)).toEqual([...L11_PRINTED_PROMPTS]);
    expect(new Set(solutions.map((item) => item.id)).size).toBe(solutions.length);
    for (const record of solutions) {
      expect(record.blocks.length).toBeGreaterThanOrEqual(6);
      expect(record.reference).toMatch(/صفحة (39|40|41)/);
    }
  });

  it('derives the printed answer of the worked example and the printed verdict of تدرّب ①', () => {
    const solutions = lesson11TeacherResources.textbookSolutions ?? [];
    const example = solutions.find((item) => item.id === 'l11-sol-p40-example-aef')!;
    const exampleText = textOf(example.blocks);
    expect(exampleText).toContain('= 4');
    expect(exampleText).toContain('\\frac{10}{3}');

    const practice = solutions.find((item) => item.id === 'l11-sol-p41-practice-one')!;
    const practiceText = textOf(practice.blocks);
    expect(practiceText).toContain('\\frac{35}{8}');
    expect(practiceText).toContain('\\frac{75}{8}');
    expect(practiceText).toContain('غير صحيحة');
  });

  it('includes an 8-question formative assessment spanning only multiple-choice, true-false, and numeric items', () => {
    const questions = lesson11Assessment.questions;
    expect(questions).toHaveLength(8);
    expect(new Set(questions.map((q) => q.id)).size).toBe(8);
    expect(new Set(questions.map((q) => q.type))).toEqual(
      new Set(['multiple-choice', 'true-false', 'numeric']),
    );
    expect(questions.every((q) => q.origin === 'authored')).toBe(true);
    expect(questions.every((q) => (q.explanation ?? []).length > 0)).toBe(true);
  });
});

describe('Lesson 11 figures and the three-ratio lab', () => {
  it('publishes eight unique constructed FigureSpecs with the locked figure ids', () => {
    expect(ALL_L11_FIGURE_SPECS).toHaveLength(8);
    const ids = ALL_L11_FIGURE_SPECS.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(8);
    for (const id of [
      'fig-l11-activity-panels',
      'fig-l11-theorem-line',
      'fig-l11-extension-hint',
      'fig-l11-example-given',
      'fig-l11-example-solved',
      'fig-l11-check-cases',
      'fig-l11-practice-one-cases',
      'fig-l11-practice-two-cases',
    ]) {
      expect(ids).toContain(id);
    }
  });

  it('registers the three-ratios-lab interactive renderer referenced by the lab diagram', () => {
    expect(threeRatiosLabDiagram.kind).toBe('interactive');
    expect(threeRatiosLabDiagram.renderer).toBe('three-ratios-lab');
    expect(threeRatiosLabDiagram.id).toBe('auth-11-three-ratios-lab');
    expect(registeredRendererKeys().interactive).toContain('three-ratios-lab');
  });

  it('embeds the interactive lab in an authored teaching step, never inside a source step', () => {
    const labStep = authoredSteps.find((step) => step.id === 'l11-step-a02-lab');
    expect(labStep).toBeDefined();
    expect(JSON.stringify(labStep!.blocks)).toContain('three-ratios-lab');
    for (const step of sourceSteps) {
      expect(JSON.stringify(step.blocks)).not.toContain('three-ratios-lab');
    }
  });

  it('never lets an authored figure claim to be a textbook scan', () => {
    const diagrams = allSteps.flatMap((step) => diagramsIn(step.blocks as readonly ContentBlock[]));
    // Eight constructed figures plus the one interactive lab diagram.
    expect(diagrams).toHaveLength(ALL_L11_FIGURE_SPECS.length + 1);
    for (const entry of ALL_L11_FIGURE_SPECS) {
      const diagram = diagrams.find((candidate) => candidate.id === entry.id);
      expect(diagram, `figure ${entry.id} must be embedded in a step`).toBeDefined();
      expect(diagram!.origin).toBe('authored');
      expect(diagram!.kind).toBe('constructed');
      expect(diagram!.source?.page, `figure ${entry.id} needs a page`).toBeTruthy();
    }
  });
});

describe('unit completion is NOT claimed by this lesson', () => {
  it('keeps Unit 2 without any completion flag, gate or unit assessment', () => {
    const unit = unit02 as unknown as Record<string, unknown>;
    expect(unit.assessment).toBeUndefined();
    expect(unit.completed).toBeUndefined();
    expect(unit.isComplete).toBeUndefined();
    expect(unit.gate).toBeUndefined();
  });

  it('does not describe the unit as complete in any lesson or teacher note', () => {
    const corpus = [
      ...allSteps.map((step) => `${step.title}\n${textOf(step.blocks)}`),
      ...(lesson11TeacherResources.notes ?? []).map((note) => textOf([note])),
    ]
      .join('\n')
      .replace(/\s+/g, ' ');
    for (const phrase of ['اكتملت الوحدة', 'الوحدة مكتملة', 'أنهينا الوحدة', 'تم إنجاز الوحدة']) {
      expect(corpus).not.toContain(phrase);
    }
  });
});
