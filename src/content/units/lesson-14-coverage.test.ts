import { describe, expect, it } from 'vitest';
import '@/components/diagram/renderers';
import { registeredRendererKeys } from '@/components/diagram/registry';
import { isNotebookStep } from '../schema';
import type { ContentBlock, DiagramSpec } from '@/content/schema';
import { unit03 } from './unit-03-remarkable-lines';
import { lesson14 } from './lesson-14-triangle-altitude';
import { lesson14Assessment } from './lesson-14-assessment';
import { ALL_L14_FIGURE_SPECS, altitudeLabDiagram } from './lesson-14-figures';
import { lesson14TeacherResources } from './lesson-14-teacher';
import {
  L14_ACTIVITY_1,
  L14_ACTIVITY_CASES,
  L14_ACTIVITY_SUBTITLE,
  L14_CHECK,
  L14_DEFINITION,
  L14_DEFINITION_HINT,
  L14_EXAMPLE_1,
  L14_EXAMPLE_1_SOLUTION,
  L14_EXAMPLE_2,
  L14_EXAMPLE_2_SOLUTION,
  L14_LESSON_TITLE,
  L14_PRACTICE_1,
  L14_PRACTICE_2,
  L14_PRACTICE_4_1,
  L14_PRACTICE_4_2,
  L14_PRACTICE_4_3,
  L14_PRACTICE_4_INTRO,
  L14_PRINTED_PROMPTS,
  L14_PROOF_2,
  L14_PROOF_INTRO,
  L14_SKILL_BODY,
  L14_SPECIAL_CONCURRENT,
} from './lesson-14-questions';

/**
 * ============================================================================
 *  LESSON 14 — Source Fidelity, Registration & Coverage Invariants
 * ============================================================================
 *  Pins Unit 3 Lesson 2 («ارتفاع مثلث», pages 56–58): registration after Lesson
 *  13; verbatim presence of every printed section; strict origin separation;
 *  1-to-1 coverage between the 16 printed prompts and the Teacher Area
 *  solutions; the registered `altitude-lab` interactive; unique figure ids; the
 *  final notebook; and NO claim of unit completion.
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
    if (Array.isArray(record.rows))
      for (const row of record.rows as unknown[][]) parts.push(row.join(' '));
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

const allSteps = lesson14.steps ?? [];
const sourceSteps = allSteps.filter((step) => step.origin === 'source');
const authoredSteps = allSteps.filter((step) => step.origin === 'authored');
const teachingSteps = authoredSteps.filter((step) => !isNotebookStep(step));
const notebookSteps = allSteps.filter((step) => isNotebookStep(step));

describe('Unit 3 registration and Lesson 14 metadata', () => {
  it('registers Lesson 14 in Unit 3 immediately after Lesson 13', () => {
    const ids = (unit03.lessons ?? []).map((lesson) => lesson.id);
    expect(ids).toContain('lesson-14-triangle-altitude');
    expect(ids.indexOf('lesson-14-triangle-altitude')).toBe(
      ids.indexOf('lesson-13-side-bisector') + 1,
    );
    expect(lesson14.title).toBe(L14_LESSON_TITLE);
    expect(lesson14.source).toEqual({ page: '56–58', locator: 'الدرس الثاني من الوحدة الثالثة' });
  });

  it('invent no lesson summary, objectives or vocabulary', () => {
    expect(lesson14.summary).toBeUndefined();
    expect(lesson14.objectives ?? []).toEqual([]);
    expect(lesson14.vocabulary ?? []).toEqual([]);
  });

  it('separates 10 source steps from 4 authored teaching steps and one final notebook', () => {
    expect(sourceSteps.map((step) => step.id)).toEqual([
      'l14-step-01-activity',
      'l14-step-02-proof',
      'l14-step-03-learn',
      'l14-step-04-special',
      'l14-step-05-skill',
      'l14-step-06-example-1',
      'l14-step-07-example-2',
      'l14-step-08-example-2-solution',
      'l14-step-09-check',
      'l14-step-10-practice',
    ]);
    expect(teachingSteps.map((step) => step.id)).toEqual([
      'l14-step-a01-orientation',
      'l14-step-a02-lab',
      'l14-step-a03-orthocenter-construction',
      'l14-step-a04-recap',
    ]);
    expect(notebookSteps).toHaveLength(1);
    expect(notebookSteps[0]).toMatchObject({
      id: 'lesson-14-student-notebook',
      origin: 'authored',
      role: 'notebook',
      kicker: 'شرح المنصّة',
    });
    for (const step of sourceSteps) {
      expect(step.source).toBeDefined();
      expect([56, 57, 58]).toContain(step.source?.page);
    }
    for (const step of authoredSteps) {
      expect(step.kicker).toBe('شرح المنصّة');
      expect(step.source).toBeUndefined();
    }
  });

  it('keeps pages 56, 57 and 58 in strict printed order across the source steps', () => {
    expect(sourceSteps.map((step) => step.source?.page)).toEqual([
      56, 56, 56, 57, 57, 57, 57, 58, 58, 58,
    ]);
  });

  it('opens with the orientation, ends with the recap then the notebook, and never repeats a step id', () => {
    expect(allSteps[0]!.id).toBe('l14-step-a01-orientation');
    expect(allSteps.at(-2)!.id).toBe('l14-step-a04-recap');
    expect(allSteps.at(-1)!.id).toBe('lesson-14-student-notebook');
    expect(new Set(allSteps.map((step) => step.id)).size).toBe(allSteps.length);
  });
});

describe('verbatim coverage of textbook pages 56, 57 and 58', () => {
  const sourceCorpus = sourceSteps
    .map((step) => textOf(step.blocks as readonly ContentBlock[]))
    .join('\n');

  it('reproduces the activity, its three cases, the proof and the definition with its hint', () => {
    for (const snippet of [
      L14_ACTIVITY_SUBTITLE,
      L14_ACTIVITY_1,
      ...L14_ACTIVITY_CASES,
      L14_PROOF_INTRO,
      L14_PROOF_2,
      L14_DEFINITION,
      L14_DEFINITION_HINT,
    ]) {
      expect(sourceCorpus).toContain(snippet);
    }
  });

  it('reproduces the concurrence property, the skill rule and both printed example solutions', () => {
    for (const snippet of [
      L14_SPECIAL_CONCURRENT,
      L14_SKILL_BODY,
      L14_EXAMPLE_1,
      L14_EXAMPLE_1_SOLUTION,
      L14_EXAMPLE_2,
      L14_EXAMPLE_2_SOLUTION,
    ]) {
      expect(sourceCorpus).toContain(snippet);
    }
  });

  it('reproduces «تحقّق من فهمك» and «تدرّب» ①②④ with the printed numbering (no ③)', () => {
    for (const snippet of [
      L14_CHECK,
      L14_PRACTICE_1,
      L14_PRACTICE_2,
      L14_PRACTICE_4_INTRO,
      L14_PRACTICE_4_1,
      L14_PRACTICE_4_2,
      L14_PRACTICE_4_3,
    ]) {
      expect(sourceCorpus).toContain(snippet);
    }
    expect(L14_CHECK).toContain('120');
    expect(L14_CHECK).toContain('5');
    expect(L14_CHECK).toContain('4');
    // The practice step keeps the printed labels ① ② ④ and invents no ③.
    const practice = sourceSteps.find((step) => step.id === 'l14-step-10-practice')!;
    const labels = (practice.blocks as ContentBlock[])
      .filter((b) => b.type === 'questionGroup')
      .map((b) => (b as { title?: string }).title);
    expect(labels).toEqual(['①', '②', '④']);
  });
});

describe('printed prompts parity with Teacher Area solutions & formative assessment', () => {
  it('accounts for all 16 printed prompts in L14_PRINTED_PROMPTS', () => {
    expect(L14_PRINTED_PROMPTS).toHaveLength(16);
    expect(new Set(L14_PRINTED_PROMPTS).size).toBe(16);
  });

  it('provides one textbookSolution record per printed prompt, in exact printed order', () => {
    const solutions = lesson14TeacherResources.textbookSolutions ?? [];
    expect(solutions).toHaveLength(L14_PRINTED_PROMPTS.length);
    expect(solutions.map((item) => item.question)).toEqual([...L14_PRINTED_PROMPTS]);
    expect(new Set(solutions.map((item) => item.id)).size).toBe(solutions.length);
    for (const record of solutions) {
      expect(record.blocks.length).toBeGreaterThanOrEqual(6);
      expect(record.reference).toMatch(/صفحة (٥٦|٥٧|٥٨)/);
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
      (lesson14TeacherResources.textbookSolutions ?? []).map((r) => r.question),
    );
    expect(printed.size).toBeGreaterThan(0);
    for (const question of printed)
      expect(solved, `no teacher solution for: ${question}`).toContain(question);
  });

  it('gives every solution at least one authored figure with a page', () => {
    for (const record of lesson14TeacherResources.textbookSolutions ?? []) {
      const diagrams = diagramsIn(record.blocks as readonly ContentBlock[]);
      expect(diagrams.length, `${record.id} needs at least one figure`).toBeGreaterThan(0);
      for (const diagram of diagrams) {
        expect(diagram.origin).toBe('authored');
        expect(diagram.source?.page, `${record.id}/${diagram.id} needs a page`).toBeTruthy();
      }
    }
  });

  it('labels the two example solutions as printed and the rest as platform-derived', () => {
    const solutions = lesson14TeacherResources.textbookSolutions ?? [];
    const ex1 = solutions.find((s) => s.id === 'l14-sol-p57-example-1')!;
    const ex2 = solutions.find((s) => s.id === 'l14-sol-p58-example-2')!;
    expect(ex1.reference).toContain('مطبوع');
    expect(ex2.reference).toContain('مطبوع');
    const activity = solutions.find((s) => s.id === 'l14-sol-p56-activity')!;
    expect(activity.reference).toContain('إعداد المنصّة');
  });

  it('includes an 8-question formative assessment spanning the three in-lesson types', () => {
    const questions = lesson14Assessment.questions;
    expect(questions).toHaveLength(8);
    expect(new Set(questions.map((q) => q.id)).size).toBe(8);
    expect(new Set(questions.map((q) => q.type))).toEqual(
      new Set(['multiple-choice', 'true-false', 'numeric']),
    );
    expect(questions.every((q) => q.origin === 'authored')).toBe(true);
    expect(questions.every((q) => (q.explanation ?? []).length > 0)).toBe(true);
    expect(lesson14Assessment.passingScore).toBe(75);
  });
});

describe('Lesson 14 figures and the altitude lab', () => {
  it('publishes 17 unique constructed FigureSpecs under the locked figure ids', () => {
    expect(ALL_L14_FIGURE_SPECS).toHaveLength(17);
    const ids = ALL_L14_FIGURE_SPECS.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(17);
    for (const id of [
      'fig-l14-activity-given',
      'fig-l14-proof-given',
      'fig-l14-proof-bisectors',
      'fig-l14-definition',
      'fig-l14-special-cases',
      'fig-l14-example-one-given',
      'fig-l14-example-one-solution',
      'fig-l14-example-two-given',
      'fig-l14-example-two-solution',
      'fig-l14-check-given',
      'fig-l14-check-solution',
      'fig-l14-practice-one-given',
      'fig-l14-practice-one-solution',
      'fig-l14-practice-two-given',
      'fig-l14-practice-two-solution',
      'fig-l14-practice-four-given',
      'fig-l14-practice-four-solution',
    ]) {
      expect(ids).toContain(id);
    }
  });

  it('gives every spec a positive viewBox that contains all of its geometry', () => {
    for (const { id, spec } of ALL_L14_FIGURE_SPECS) {
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
      for (const dot of spec.points ?? [])
        expect(inside(dot.at), `${id}: point outside the viewBox`).toBe(true);
    }
  });

  it('registers the altitude-lab interactive renderer referenced by the lab diagram', () => {
    expect(altitudeLabDiagram.kind).toBe('interactive');
    expect(altitudeLabDiagram.renderer).toBe('altitude-lab');
    expect(registeredRendererKeys().interactive).toContain('altitude-lab');
  });

  it('embeds the interactive lab in an authored teaching step, never inside a source step', () => {
    const labStep = authoredSteps.find((step) => step.id === 'l14-step-a02-lab');
    expect(labStep).toBeDefined();
    expect(JSON.stringify(labStep!.blocks)).toContain('altitude-lab');
    for (const step of sourceSteps)
      expect(JSON.stringify(step.blocks)).not.toContain('altitude-lab');
  });

  it('embeds every published figure somewhere and never as a textbook scan', () => {
    const studentDiagrams = allSteps.flatMap((step) =>
      diagramsIn(step.blocks as readonly ContentBlock[]),
    );
    const solutionDiagrams = (lesson14TeacherResources.textbookSolutions ?? []).flatMap((r) =>
      diagramsIn(r.blocks as readonly ContentBlock[]),
    );
    expect(studentDiagrams.some((d) => d.kind === 'interactive')).toBe(true);
    const embedded = new Set([...studentDiagrams, ...solutionDiagrams].map((d) => d.id));
    for (const entry of ALL_L14_FIGURE_SPECS) {
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
  it('does not describe the unit as complete in any lesson or teacher note', () => {
    const corpus = [
      ...allSteps.map((step) => `${step.title}\n${textOf(step.blocks as readonly ContentBlock[])}`),
      ...(lesson14TeacherResources.notes ?? []).map((note) => textOf([note])),
    ]
      .join('\n')
      .replace(/\s+/g, ' ');
    for (const phrase of ['اكتملت الوحدة', 'الوحدة مكتملة', 'أنهينا الوحدة', 'تم إنجاز الوحدة']) {
      expect(corpus).not.toContain(phrase);
    }
  });
});
