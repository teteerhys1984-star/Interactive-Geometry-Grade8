import { describe, expect, it } from 'vitest';
import '@/components/diagram/renderers';
import { registeredRendererKeys } from '@/components/diagram/registry';
import { isNotebookStep } from '../schema';
import type { ContentBlock, DiagramSpec } from '@/content/schema';
import { unit03 } from './unit-03-remarkable-lines';
import { lesson13 } from './lesson-13-side-bisector';
import { lesson13Assessment } from './lesson-13-assessment';
import { ALL_L13_FIGURE_SPECS, sideBisectorLabDiagram } from './lesson-13-figures';
import { lesson13TeacherResources } from './lesson-13-teacher';
import {
  L13_ACTIVITY_1_1,
  L13_ACTIVITY_1_2,
  L13_ACTIVITY_2_1,
  L13_ACTIVITY_2_2,
  L13_ACTIVITY_3_1,
  L13_ACTIVITY_3_2,
  L13_ACTIVITY_3_3,
  L13_ACTIVITY_4,
  L13_ACTIVITY_SUBTITLE,
  L13_ACTIVITY_WARNING,
  L13_CHECK_1,
  L13_CHECK_2,
  L13_CHECK_3,
  L13_DEFINITION,
  L13_LESSON_TITLE,
  L13_OPENER_Q1,
  L13_OPENER_Q2,
  L13_OPENER_Q3_SETUP,
  L13_OPENER_Q4,
  L13_OPENER_Q5,
  L13_PRACTICE_1,
  L13_PRACTICE_2_1,
  L13_PRACTICE_2_2,
  L13_PRACTICE_2_INTRO,
  L13_PRACTICE_3_2,
  L13_PRACTICE_3_3,
  L13_PRACTICE_3_4,
  L13_PRACTICE_3_INTRO,
  L13_PRINTED_PROMPTS,
  L13_PROPERTY_BACKWARD,
  L13_PROPERTY_FORWARD,
  L13_SPECIAL_CENTRE,
  L13_SPECIAL_CONCURRENT,
  L13_SPECIAL_RADII,
} from './lesson-13-questions';

/**
 * ============================================================================
 *  LESSON 13 — Source Fidelity, Registration & Coverage Invariants
 * ============================================================================
 *
 *  Pins Unit 3 Lesson 1 («محور ضلع في المثلث», pages 53–55) against:
 *    • registration as the first lesson of Unit 3;
 *    • verbatim presence of every printed section: the five page-53 opener
 *      questions, the page-54 activity with its marginal warning, the
 *      «تعريف / خواصّ» boxes and the page-55 «خاصة وتعریف» with
 *      «تحقّق من فهمك» and «تدرّب» ①–③;
 *    • strict origin separation: source steps carry a page, authored steps
 *      carry the «شرح المنصّة» kicker and no page;
 *    • 1-to-1 coverage between the 24 printed prompts and the 24 derived
 *      Teacher Area solutions, each of which carries a figure;
 *    • the registered `side-bisector-lab` interactive and unique figure ids;
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

const allSteps = lesson13.steps ?? [];
const sourceSteps = allSteps.filter((step) => step.origin === 'source');
const authoredSteps = allSteps.filter((step) => step.origin === 'authored');
const teachingSteps = authoredSteps.filter((step) => !isNotebookStep(step));
const notebookSteps = allSteps.filter((step) => isNotebookStep(step));

describe('Unit 3 registration and Lesson 13 metadata', () => {
  it('registers Lesson 13 as the first lesson of Unit 3 (followed by Lessons 14–16)', () => {
    const unitLessons = unit03.lessons ?? [];
    expect(unitLessons.map((lesson) => lesson.id)).toEqual([
      'lesson-13-side-bisector',
      'lesson-14-triangle-altitude',
      'lesson-15-triangle-median',
      'lesson-16-angle-bisector',
    ]);
    expect(unitLessons[0]).toBe(lesson13);
    expect(unit03.title).toBe('مستقيمات مميزة في المثلث');
    expect(unit03.source).toEqual({ page: 53, locator: 'الوحدة الثالثة' });
    expect(lesson13.title).toBe(L13_LESSON_TITLE);
    expect(lesson13.source).toEqual({
      page: '53–55',
      locator: 'الدرس الأول من الوحدة الثالثة',
    });
  });

  it('keeps the unit free of a unit-level assessment and invents no lesson summary', () => {
    expect(unit03.assessment).toBeUndefined();
    expect(lesson13.summary).toBeUndefined();
    expect(lesson13.objectives ?? []).toEqual([]);
    expect(lesson13.vocabulary ?? []).toEqual([]);
  });

  it('separates 10 verbatim source steps from 5 authored teaching steps and one structurally marked final notebook', () => {
    expect(sourceSteps.map((step) => step.id)).toEqual([
      'l13-step-01-opener-lines',
      'l13-step-02-opener-rest',
      'l13-step-04-activity-construct',
      'l13-step-05-activity-reason',
      'l13-step-06-activity-circle',
      'l13-step-07-activity-arcs',
      'l13-step-08-learn',
      'l13-step-09-special',
      'l13-step-10-check',
      'l13-step-11-practice',
    ]);
    expect(teachingSteps.map((step) => step.id)).toEqual([
      'l13-step-a01-orientation',
      'l13-step-03-opener-solutions',
      'l13-step-a02-lab',
      'l13-step-a03-compass-construction',
      'l13-step-a04-recap',
    ]);
    expect(notebookSteps).toHaveLength(1);
    expect(notebookSteps[0]).toMatchObject({
      id: 'lesson-13-student-notebook',
      origin: 'authored',
      role: 'notebook',
      kicker: 'شرح المنصّة',
    });

    for (const step of sourceSteps) {
      expect(step.source).toBeDefined();
      expect([53, 54, 55]).toContain(step.source?.page);
    }
    for (const step of authoredSteps) {
      expect(step.kicker).toBe('شرح المنصّة');
      expect(step.source).toBeUndefined();
    }
  });

  it('keeps pages 53, 54 and 55 in strict printed order across the source steps', () => {
    expect(sourceSteps.map((step) => step.source?.page)).toEqual([
      53, 53, 54, 54, 54, 54, 54, 55, 55, 55,
    ]);
  });

  it('opens with the orientation, ends with the recap then the notebook, and never repeats a step id', () => {
    expect(allSteps[0]!.id).toBe('l13-step-a01-orientation');
    expect(allSteps[1]!.id).toBe('l13-step-01-opener-lines');
    expect(allSteps.at(-2)!.id).toBe('l13-step-a04-recap');
    expect(allSteps.at(-1)!.id).toBe('lesson-13-student-notebook');
    expect(new Set(allSteps.map((step) => step.id)).size).toBe(allSteps.length);
  });
});

describe('verbatim coverage of textbook pages 53, 54 and 55', () => {
  const sourceCorpus = sourceSteps
    .map((step) => textOf(step.blocks as readonly ContentBlock[]))
    .join('\n');

  it('reproduces the five page-53 opener questions of the unit', () => {
    for (const snippet of [
      L13_OPENER_Q1,
      L13_OPENER_Q2,
      L13_OPENER_Q3_SETUP,
      L13_OPENER_Q4,
      L13_OPENER_Q5,
    ]) {
      expect(sourceCorpus).toContain(snippet);
    }
    // Question ③ is printed without any figure: the platform must not invent one.
    expect(JSON.stringify(sourceSteps[1]!.blocks)).not.toContain('fig13SolutionQ3');
  });

  it('reproduces the page-54 activity, its marginal warning, and every printed sub-question', () => {
    for (const snippet of [
      L13_ACTIVITY_SUBTITLE,
      L13_ACTIVITY_1_1,
      L13_ACTIVITY_1_2,
      L13_ACTIVITY_2_1,
      L13_ACTIVITY_2_2,
      L13_ACTIVITY_3_1,
      L13_ACTIVITY_3_2,
      L13_ACTIVITY_3_3,
      L13_ACTIVITY_4,
      L13_ACTIVITY_WARNING,
    ]) {
      expect(sourceCorpus).toContain(snippet);
    }
    // The warning is printed verbatim, including its one-emphatic «يجب ألّا».
    expect(L13_ACTIVITY_WARNING).toContain('يجب ألّا يُرسم شكل في حالة خاصة');
  });

  it('reproduces the «تعريف» and «خواصّ» boxes of page 54 and the «خاصة وتعریف» of page 55', () => {
    for (const snippet of [
      L13_DEFINITION,
      L13_PROPERTY_FORWARD,
      L13_PROPERTY_BACKWARD,
      L13_SPECIAL_CONCURRENT,
      L13_SPECIAL_CENTRE,
      L13_SPECIAL_RADII,
    ]) {
      expect(sourceCorpus).toContain(snippet);
    }
  });

  it('reproduces «تحقّق من فهمك» and the three «تدرّب» questions with their given lengths', () => {
    for (const snippet of [
      L13_CHECK_1,
      L13_CHECK_2,
      L13_CHECK_3,
      L13_PRACTICE_1,
      L13_PRACTICE_2_INTRO,
      L13_PRACTICE_2_1,
      L13_PRACTICE_2_2,
      L13_PRACTICE_3_INTRO,
      L13_PRACTICE_3_2,
      L13_PRACTICE_3_3,
      L13_PRACTICE_3_4,
    ]) {
      expect(sourceCorpus).toContain(snippet);
    }
    expect(L13_PRACTICE_3_INTRO).toContain('5');
    expect(L13_PRACTICE_3_INTRO).toContain('7.5');
    expect(L13_PRACTICE_3_INTRO).toContain('8');
  });
});

describe('printed prompts parity with Teacher Area solutions & formative assessment', () => {
  it('accounts for all 24 printed prompts across pages 53–55 in L13_PRINTED_PROMPTS', () => {
    expect(L13_PRINTED_PROMPTS).toHaveLength(24);
    expect(new Set(L13_PRINTED_PROMPTS).size).toBe(24);
  });

  it('provides one derived textbookSolution record per printed prompt, in exact printed order', () => {
    const solutions = lesson13TeacherResources.textbookSolutions ?? [];
    expect(solutions).toHaveLength(L13_PRINTED_PROMPTS.length);
    expect(solutions.map((item) => item.question)).toEqual([...L13_PRINTED_PROMPTS]);
    expect(new Set(solutions.map((item) => item.id)).size).toBe(solutions.length);
    for (const record of solutions) {
      expect(record.blocks.length).toBeGreaterThanOrEqual(6);
      expect(record.reference).toMatch(/صفحة (٥٣|٥٤|٥٥)/);
    }
  });

  it('solves every printed question that appears inside a student step', () => {
    const printed = new Set<string>();
    for (const step of sourceSteps) {
      for (const block of step.blocks as readonly ContentBlock[]) {
        if (block.type !== 'questionGroup') continue;
        for (const item of block.items) printed.add(item.text);
      }
    }
    const solved = new Set(
      (lesson13TeacherResources.textbookSolutions ?? []).map((record) => record.question),
    );
    expect(printed.size).toBeGreaterThan(0);
    for (const question of printed) {
      expect(solved, `no teacher solution for: ${question}`).toContain(question);
    }
  });

  it('gives every solution its own figure, so no reasoning is left undrawn', () => {
    const solutions = lesson13TeacherResources.textbookSolutions ?? [];
    const seen = new Map<string, string>();
    for (const record of solutions) {
      const diagrams = diagramsIn(record.blocks as readonly ContentBlock[]);
      expect(diagrams.length, `${record.id} needs at least one figure`).toBeGreaterThan(0);
      for (const diagram of diagrams) {
        expect(diagram.origin).toBe('authored');
        expect(diagram.source?.page, `${record.id}/${diagram.id} needs a page`).toBeTruthy();
        expect(
          seen.get(diagram.id),
          `${diagram.id} is reused by ${seen.get(diagram.id)}`,
        ).toBeUndefined();
        seen.set(diagram.id, record.id);
      }
    }
  });

  it('says in its notes that the printed pages carry no solutions', () => {
    const notes = textOf(lesson13TeacherResources.notes ?? []).replace(/\s+/g, ' ');
    expect(notes).toContain('لا تتضمّن أي إجابات مطبوعة');
  });

  it('includes an 8-question formative assessment spanning only multiple-choice, true-false and numeric items', () => {
    const questions = lesson13Assessment.questions;
    expect(questions).toHaveLength(8);
    expect(new Set(questions.map((q) => q.id)).size).toBe(8);
    expect(new Set(questions.map((q) => q.type))).toEqual(
      new Set(['multiple-choice', 'true-false', 'numeric']),
    );
    expect(questions.every((q) => q.origin === 'authored')).toBe(true);
    expect(questions.every((q) => (q.explanation ?? []).length > 0)).toBe(true);
    expect(lesson13Assessment.passingScore).toBe(75);
  });
});

describe('Lesson 13 figures and the side-bisector lab', () => {
  it('publishes unique constructed FigureSpecs under the locked figure ids', () => {
    expect(ALL_L13_FIGURE_SPECS).toHaveLength(31);
    const ids = ALL_L13_FIGURE_SPECS.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(31);
    for (const id of [
      'fig-l13-opener-lines',
      'fig-l13-opener-angle',
      'fig-l13-opener-arcs',
      'fig-l13-activity-given',
      'fig-l13-definition',
      'fig-l13-property',
      'fig-l13-special-cases',
      'fig-l13-check-setup',
      'fig-l13-practice-one-given',
      'fig-l13-practice-two-given',
      'fig-l13-practice-three-given',
      'fig-l13-sol-q1',
      'fig-l13-sol-q2',
      'fig-l13-sol-q3',
      'fig-l13-sol-q4',
      'fig-l13-sol-q5',
      'fig-l13-sol-activity-arcs',
      'fig-l13-sol-activity-construct',
      'fig-l13-sol-activity-equal',
      'fig-l13-sol-activity-third',
      'fig-l13-sol-activity-circle',
      'fig-l13-sol-activity-explain',
      'fig-l13-sol-activity-points',
      'fig-l13-sol-check-bisectors',
      'fig-l13-sol-check',
      'fig-l13-sol-practice-one',
      'fig-l13-sol-practice-two-draw',
      'fig-l13-sol-practice-two',
      'fig-l13-sol-practice-three-circles',
      'fig-l13-sol-practice-three-bisectors',
      'fig-l13-sol-practice-three',
    ]) {
      expect(ids).toContain(id);
    }
  });

  it('names the three bisectors of the page-55 panels and marks the right angle at A', () => {
    const entry = ALL_L13_FIGURE_SPECS.find((item) => item.id === 'fig-l13-special-cases')!;
    const names = (entry.spec.texts ?? []).map((text) => text.text);
    // The page names the three bisectors; each name appears once per panel.
    for (const name of ['(d₁)', '(d₂)', '(d₃)']) {
      expect(
        names.filter((text) => text === name),
        `${name} in all three panels`,
      ).toHaveLength(3);
    }
    // The right angle is printed at `A` in the right-angled panel only — the
    // leftmost panel of the three.
    const rightAngles = (entry.spec.angles ?? []).filter((angle) => angle.right);
    expect(rightAngles).toHaveLength(1);
    const square = rightAngles[0]!;
    expect(square.at[0]).toBeGreaterThanOrEqual(0);
    expect(square.at[0]).toBeLessThanOrEqual(10.2);
    expect(square.from[0]).not.toBeCloseTo(square.to[0]);
    expect(square.from[1]).not.toBeCloseTo(square.to[1]);
  });

  it('gives every spec a positive viewBox that contains all of its geometry', () => {
    for (const { id, spec } of ALL_L13_FIGURE_SPECS) {
      expect(spec.viewBox.w, `${id}: width`).toBeGreaterThan(0);
      expect(spec.viewBox.h, `${id}: height`).toBeGreaterThan(0);
      const { x, y, w, h } = spec.viewBox;
      const inside = (point: readonly number[]) =>
        point[0]! >= x - 1e-6 &&
        point[0]! <= x + w + 1e-6 &&
        point[1]! >= y - 1e-6 &&
        point[1]! <= y + h + 1e-6;
      for (const segment of spec.segments ?? []) {
        expect(inside(segment.from), `${id}: segment start outside the viewBox`).toBe(true);
        expect(inside(segment.to), `${id}: segment end outside the viewBox`).toBe(true);
      }
      for (const dot of spec.points ?? []) {
        expect(inside(dot.at), `${id}: point outside the viewBox`).toBe(true);
      }
    }
  });

  it('registers the side-bisector-lab interactive renderer referenced by the lab diagram', () => {
    expect(sideBisectorLabDiagram.kind).toBe('interactive');
    expect(sideBisectorLabDiagram.renderer).toBe('side-bisector-lab');
    expect(registeredRendererKeys().interactive).toContain('side-bisector-lab');
  });

  it('embeds the interactive lab in an authored teaching step, never inside a source step', () => {
    const labStep = authoredSteps.find((step) => step.id === 'l13-step-a02-lab');
    expect(labStep).toBeDefined();
    expect(JSON.stringify(labStep!.blocks)).toContain('side-bisector-lab');
    for (const step of sourceSteps) {
      expect(JSON.stringify(step.blocks)).not.toContain('side-bisector-lab');
    }
  });

  it('embeds every figure exactly where it belongs, and never as a textbook scan', () => {
    const studentDiagrams = allSteps.flatMap((step) =>
      diagramsIn(step.blocks as readonly ContentBlock[]),
    );
    const solutionDiagrams = (lesson13TeacherResources.textbookSolutions ?? []).flatMap((record) =>
      diagramsIn(record.blocks as readonly ContentBlock[]),
    );
    // The student sequence carries the givens and the platform's explanation
    // figures, plus the one interactive lab diagram.
    expect(studentDiagrams.length).toBeGreaterThan(1);
    expect(studentDiagrams.some((diagram) => diagram.kind === 'interactive')).toBe(true);
    expect(solutionDiagrams.length).toBe(24);

    const embedded = new Set(
      [...studentDiagrams, ...solutionDiagrams].map((diagram) => diagram.id),
    );
    for (const entry of ALL_L13_FIGURE_SPECS) {
      expect(embedded, `figure ${entry.id} is published but never embedded`).toContain(entry.id);
    }
    for (const diagram of [...studentDiagrams, ...solutionDiagrams]) {
      expect(diagram.origin).toBe('authored');
      expect(diagram.kind === 'constructed' || diagram.kind === 'interactive').toBe(true);
      expect(diagram.source?.page, `figure ${diagram.id} needs a page`).toBeTruthy();
    }
  });
});

describe('unit completion is NOT claimed by this lesson', () => {
  it('keeps Unit 3 without any completion flag, gate or unit assessment', () => {
    const unit = unit03 as unknown as Record<string, unknown>;
    expect(unit.assessment).toBeUndefined();
    expect(unit.completed).toBeUndefined();
    expect(unit.isComplete).toBeUndefined();
    expect(unit.gate).toBeUndefined();
  });

  it('does not describe the unit as complete in any lesson or teacher note', () => {
    const corpus = [
      ...allSteps.map((step) => `${step.title}\n${textOf(step.blocks as readonly ContentBlock[])}`),
      ...(lesson13TeacherResources.notes ?? []).map((note) => textOf([note])),
    ]
      .join('\n')
      .replace(/\s+/g, ' ');
    for (const phrase of ['اكتملت الوحدة', 'الوحدة مكتملة', 'أنهينا الوحدة', 'تم إنجاز الوحدة']) {
      expect(corpus).not.toContain(phrase);
    }
  });
});
