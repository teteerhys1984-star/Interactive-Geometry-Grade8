import { describe, expect, it } from 'vitest';
import '@/components/diagram/renderers';
import { registeredRendererKeys } from '@/components/diagram/registry';
import { isNotebookStep } from '../schema';
import type { ContentBlock, DiagramSpec } from '@/content/schema';
import { unit03 } from './unit-03-remarkable-lines';
import { lesson15 } from './lesson-15-triangle-median';
import { lesson15Assessment } from './lesson-15-assessment';
import { ALL_L15_FIGURE_SPECS, medianLabDiagram } from './lesson-15-figures';
import { lesson15TeacherResources } from './lesson-15-teacher';
import {
  L15_CHECK,
  L15_DEFINITION,
  L15_EXAMPLE_1,
  L15_EXAMPLE_1_SOLUTION,
  L15_EXAMPLE_2,
  L15_EXAMPLE_2_SOLUTION,
  L15_LESSON_TITLE,
  L15_MEANING,
  L15_PHYSICS,
  L15_PRACTICE_1_CASE1,
  L15_PRACTICE_1_CASE2,
  L15_PRACTICE_1_INTRO,
  L15_PRINTED_PROMPTS,
  L15_PROPERTIES,
  L15_PROOF_3,
  L15_PROOF_INTRO,
  L15_SKILL_BODY,
  L15_SPECIAL,
  L15_TEST_1,
  L15_TEST_2,
  L15_TEST_3,
} from './lesson-15-questions';

/**
 * ============================================================================
 *  LESSON 15 — Source Fidelity, Registration & Coverage Invariants (pp. 59–61)
 * ============================================================================
 */

type Block = { type: string; [key: string]: unknown };
const textOf = (blocks: readonly unknown[]): string => {
  const parts: string[] = [];
  const walk = (block: unknown): void => {
    if (!block || typeof block !== 'object') return;
    const r = block as Block;
    if (typeof r.text === 'string') parts.push(r.text);
    if (typeof r.title === 'string') parts.push(r.title);
    if (typeof r.latex === 'string') parts.push(r.latex);
    if (Array.isArray(r.items))
      for (const it of r.items) {
        if (typeof it === 'string') parts.push(it);
        else if (it && typeof it === 'object' && 'text' in (it as Block))
          parts.push(String((it as Block).text));
      }
    if (Array.isArray(r.rows)) for (const row of r.rows as unknown[][]) parts.push(row.join(' '));
    if (Array.isArray(r.columns)) parts.push(...(r.columns as string[]));
    if (Array.isArray(r.blocks)) for (const c of r.blocks) walk(c);
  };
  for (const b of blocks) walk(b);
  return parts.join('\n');
};
const diagramsIn = (blocks: readonly ContentBlock[]): DiagramSpec[] =>
  blocks.flatMap((b) =>
    b.type === 'figure'
      ? [b.diagram]
      : b.type === 'callout' || b.type === 'teaching'
        ? diagramsIn(b.blocks)
        : [],
  );

const allSteps = lesson15.steps ?? [];
const sourceSteps = allSteps.filter((s) => s.origin === 'source');
const authoredSteps = allSteps.filter((s) => s.origin === 'authored');
const teachingSteps = authoredSteps.filter((s) => !isNotebookStep(s));
const notebookSteps = allSteps.filter((s) => isNotebookStep(s));

describe('Unit 3 registration and Lesson 15 metadata', () => {
  it('registers Lesson 15 in Unit 3 immediately after Lesson 14', () => {
    const ids = (unit03.lessons ?? []).map((l) => l.id);
    expect(ids).toContain('lesson-15-triangle-median');
    expect(ids.indexOf('lesson-15-triangle-median')).toBe(
      ids.indexOf('lesson-14-triangle-altitude') + 1,
    );
    expect(lesson15.title).toBe(L15_LESSON_TITLE);
    expect(lesson15.source).toEqual({ page: '59–61', locator: 'الدرس الثالث من الوحدة الثالثة' });
  });
  it('invent no lesson summary, objectives or vocabulary', () => {
    expect(lesson15.summary).toBeUndefined();
    expect(lesson15.objectives ?? []).toEqual([]);
    expect(lesson15.vocabulary ?? []).toEqual([]);
  });
  it('separates 11 source steps from 4 authored teaching steps and one final notebook', () => {
    expect(sourceSteps.map((s) => s.id)).toEqual([
      'l15-step-01-meaning',
      'l15-step-02-test',
      'l15-step-03-proof',
      'l15-step-04-physics',
      'l15-step-05-learn',
      'l15-step-06-special',
      'l15-step-07-skill',
      'l15-step-08-example-1',
      'l15-step-09-example-2',
      'l15-step-10-check',
      'l15-step-11-practice',
    ]);
    expect(teachingSteps.map((s) => s.id)).toEqual([
      'l15-step-a01-orientation',
      'l15-step-a02-lab',
      'l15-step-a03-centroid-construction',
      'l15-step-a04-recap',
    ]);
    expect(notebookSteps).toHaveLength(1);
    expect(notebookSteps[0]).toMatchObject({
      id: 'lesson-15-student-notebook',
      origin: 'authored',
      role: 'notebook',
      kicker: 'شرح المنصّة',
    });
    for (const s of sourceSteps) {
      expect(s.source).toBeDefined();
      expect([59, 60, 61]).toContain(s.source?.page);
    }
    for (const s of authoredSteps) {
      expect(s.kicker).toBe('شرح المنصّة');
      expect(s.source).toBeUndefined();
    }
  });
  it('keeps pages 59, 60 and 61 in strict printed order', () => {
    expect(sourceSteps.map((s) => s.source?.page)).toEqual([
      59, 59, 59, 59, 60, 60, 60, 60, 61, 61, 61,
    ]);
  });
  it('opens with the orientation, ends with the recap then the notebook, no repeated id', () => {
    expect(allSteps[0]!.id).toBe('l15-step-a01-orientation');
    expect(allSteps.at(-2)!.id).toBe('l15-step-a04-recap');
    expect(allSteps.at(-1)!.id).toBe('lesson-15-student-notebook');
    expect(new Set(allSteps.map((s) => s.id)).size).toBe(allSteps.length);
  });
});

describe('verbatim coverage of textbook pages 59, 60 and 61', () => {
  const corpus = sourceSteps.map((s) => textOf(s.blocks as readonly ContentBlock[])).join('\n');
  it('reproduces the meaning, the test, the proof and the physics box', () => {
    for (const snippet of [
      L15_MEANING,
      L15_TEST_1,
      L15_TEST_2,
      L15_TEST_3,
      L15_PROOF_INTRO,
      L15_PROOF_3,
      L15_PHYSICS,
    ])
      expect(corpus).toContain(snippet);
  });
  it('reproduces the definition, the property, the 2/3 ratios, the skill rule and both printed example solutions', () => {
    for (const snippet of [
      L15_DEFINITION,
      L15_SPECIAL,
      L15_PROPERTIES,
      L15_SKILL_BODY,
      L15_EXAMPLE_1,
      L15_EXAMPLE_1_SOLUTION,
      L15_EXAMPLE_2,
      L15_EXAMPLE_2_SOLUTION,
    ])
      expect(corpus).toContain(snippet);
  });
  it('reproduces «تحقّق من فهمك» and «تدرّب ①» with the printed magnitudes', () => {
    for (const snippet of [
      L15_CHECK,
      L15_PRACTICE_1_INTRO,
      L15_PRACTICE_1_CASE1,
      L15_PRACTICE_1_CASE2,
    ])
      expect(corpus).toContain(snippet);
    expect(L15_CHECK).toContain('7');
    expect(L15_CHECK).toContain('70');
    expect(L15_CHECK).toContain('8');
    expect(L15_PRACTICE_1_CASE1).toContain('3.4');
    expect(L15_PRACTICE_1_CASE1).toContain('1.7');
  });
});

describe('printed prompts parity with Teacher Area solutions & formative assessment', () => {
  it('accounts for all 16 printed prompts', () => {
    expect(L15_PRINTED_PROMPTS).toHaveLength(16);
    expect(new Set(L15_PRINTED_PROMPTS).size).toBe(16);
  });
  it('provides one textbookSolution record per printed prompt, in exact printed order', () => {
    const solutions = lesson15TeacherResources.textbookSolutions ?? [];
    expect(solutions).toHaveLength(L15_PRINTED_PROMPTS.length);
    expect(solutions.map((s) => s.question)).toEqual([...L15_PRINTED_PROMPTS]);
    expect(new Set(solutions.map((s) => s.id)).size).toBe(solutions.length);
    for (const r of solutions) {
      expect(r.blocks.length).toBeGreaterThanOrEqual(6);
      expect(r.reference).toMatch(/صفحة (٥٩|٦٠|٦١)/);
    }
  });
  it('solves every printed question that appears inside a student step', () => {
    const printed = new Set<string>();
    for (const s of sourceSteps)
      for (const b of s.blocks as readonly ContentBlock[])
        if (b.type === 'questionGroup') for (const it of b.items) printed.add(it.text);
    const solved = new Set(
      (lesson15TeacherResources.textbookSolutions ?? []).map((r) => r.question),
    );
    for (const q of printed) expect(solved, `no teacher solution for: ${q}`).toContain(q);
  });
  it('gives every solution at least one authored figure with a page', () => {
    for (const r of lesson15TeacherResources.textbookSolutions ?? []) {
      const d = diagramsIn(r.blocks as readonly ContentBlock[]);
      expect(d.length, `${r.id} needs a figure`).toBeGreaterThan(0);
      for (const dia of d) {
        expect(dia.origin).toBe('authored');
        expect(dia.source?.page).toBeTruthy();
      }
    }
  });
  it('labels the two example solutions as printed and the rest as platform-derived', () => {
    const solutions = lesson15TeacherResources.textbookSolutions ?? [];
    expect(solutions.find((s) => s.id === 'l15-sol-p60-example-1')!.reference).toContain('مطبوع');
    expect(solutions.find((s) => s.id === 'l15-sol-p61-example-2')!.reference).toContain('مطبوع');
    expect(solutions.find((s) => s.id === 'l15-sol-p59-test-1')!.reference).toContain(
      'إعداد المنصّة',
    );
  });
  it('includes an 8-question formative assessment spanning the three in-lesson types', () => {
    const q = lesson15Assessment.questions;
    expect(q).toHaveLength(8);
    expect(new Set(q.map((x) => x.id)).size).toBe(8);
    expect(new Set(q.map((x) => x.type))).toEqual(
      new Set(['multiple-choice', 'true-false', 'numeric']),
    );
    expect(q.every((x) => x.origin === 'authored')).toBe(true);
    expect(q.every((x) => (x.explanation ?? []).length > 0)).toBe(true);
    expect(lesson15Assessment.passingScore).toBe(75);
  });
});

describe('Lesson 15 figures and the median lab', () => {
  it('publishes 18 unique constructed FigureSpecs', () => {
    expect(ALL_L15_FIGURE_SPECS).toHaveLength(18);
    const ids = ALL_L15_FIGURE_SPECS.map((e) => e.id);
    expect(new Set(ids).size).toBe(18);
    for (const id of [
      'fig-l15-meaning-given',
      'fig-l15-test-given',
      'fig-l15-test-solution',
      'fig-l15-proof-given',
      'fig-l15-proof-solution',
      'fig-l15-physics',
      'fig-l15-definition',
      'fig-l15-properties',
      'fig-l15-example-one-given',
      'fig-l15-example-one-solution',
      'fig-l15-example-two-given',
      'fig-l15-example-two-solution',
      'fig-l15-check-given',
      'fig-l15-check-solution',
      'fig-l15-practice-case-one-given',
      'fig-l15-practice-case-one-solution',
      'fig-l15-practice-case-two-given',
      'fig-l15-practice-case-two-solution',
    ])
      expect(ids).toContain(id);
  });
  it('gives every spec a positive viewBox containing all of its geometry', () => {
    for (const { id, spec } of ALL_L15_FIGURE_SPECS) {
      expect(spec.viewBox.w, `${id}: width`).toBeGreaterThan(0);
      expect(spec.viewBox.h, `${id}: height`).toBeGreaterThan(0);
      const { x, y, w, h } = spec.viewBox;
      const inside = (p: readonly number[]) =>
        p[0]! >= x - 1e-6 && p[0]! <= x + w + 1e-6 && p[1]! >= y - 1e-6 && p[1]! <= y + h + 1e-6;
      for (const s of spec.segments ?? []) {
        expect(inside(s.from), `${id}: seg start`).toBe(true);
        expect(inside(s.to), `${id}: seg end`).toBe(true);
      }
      for (const d of spec.points ?? []) expect(inside(d.at), `${id}: point`).toBe(true);
    }
  });
  it('registers the median-lab interactive renderer', () => {
    expect(medianLabDiagram.kind).toBe('interactive');
    expect(medianLabDiagram.renderer).toBe('median-lab');
    expect(registeredRendererKeys().interactive).toContain('median-lab');
  });
  it('embeds the lab in an authored step, never in a source step', () => {
    const lab = authoredSteps.find((s) => s.id === 'l15-step-a02-lab');
    expect(lab).toBeDefined();
    expect(JSON.stringify(lab!.blocks)).toContain('median-lab');
    for (const s of sourceSteps) expect(JSON.stringify(s.blocks)).not.toContain('median-lab');
  });
  it('embeds every published figure somewhere and never as a textbook scan', () => {
    const student = allSteps.flatMap((s) => diagramsIn(s.blocks as readonly ContentBlock[]));
    const solution = (lesson15TeacherResources.textbookSolutions ?? []).flatMap((r) =>
      diagramsIn(r.blocks as readonly ContentBlock[]),
    );
    expect(student.some((d) => d.kind === 'interactive')).toBe(true);
    const embedded = new Set([...student, ...solution].map((d) => d.id));
    for (const e of ALL_L15_FIGURE_SPECS)
      expect(embedded, `figure ${e.id} never embedded`).toContain(e.id);
    for (const d of [...student, ...solution]) {
      expect(d.origin).toBe('authored');
      expect(d.kind === 'constructed' || d.kind === 'interactive').toBe(true);
      expect(d.source?.page).toBeTruthy();
    }
  });
});

describe('unit completion is NOT claimed by this lesson', () => {
  it('does not describe the unit as complete', () => {
    const corpus = [
      ...allSteps.map((s) => `${s.title}\n${textOf(s.blocks as readonly ContentBlock[])}`),
      ...(lesson15TeacherResources.notes ?? []).map((n) => textOf([n])),
    ]
      .join('\n')
      .replace(/\s+/g, ' ');
    for (const phrase of ['اكتملت الوحدة', 'الوحدة مكتملة', 'أنهينا الوحدة', 'تم إنجاز الوحدة'])
      expect(corpus).not.toContain(phrase);
  });
});
