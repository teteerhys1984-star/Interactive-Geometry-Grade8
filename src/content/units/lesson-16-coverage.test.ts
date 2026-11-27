import { describe, expect, it } from 'vitest';
import '@/components/diagram/renderers';
import { registeredRendererKeys } from '@/components/diagram/registry';
import { isNotebookStep } from '../schema';
import type { ContentBlock, DiagramSpec } from '@/content/schema';
import { unit03 } from './unit-03-remarkable-lines';
import { lesson16 } from './lesson-16-angle-bisector';
import { lesson16Assessment } from './lesson-16-assessment';
import { ALL_L16_FIGURE_SPECS, angleBisectorLabDiagram } from './lesson-16-figures';
import { lesson16TeacherResources } from './lesson-16-teacher';
import {
  L16_CHECK,
  L16_DEFINITION,
  L16_HINT_CIRCUM,
  L16_HINT_IN,
  L16_LESSON_TITLE,
  L16_PRACTICE_1,
  L16_PRACTICE_2_1,
  L16_PRACTICE_2_2,
  L16_PRACTICE_2_3,
  L16_PRACTICE_2_INTRO,
  L16_PRINTED_PROMPTS,
  L16_PROOF_5,
  L16_PROOF_HINT,
  L16_PROOF_INTRO,
  L16_SPECIAL,
  L16_TEST_1,
  L16_TEST_2,
} from './lesson-16-questions';

/**
 * ============================================================================
 *  LESSON 16 — Source Fidelity, Registration & Coverage Invariants (pp. 62–63)
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

const allSteps = lesson16.steps ?? [];
const sourceSteps = allSteps.filter((s) => s.origin === 'source');
const authoredSteps = allSteps.filter((s) => s.origin === 'authored');
const teachingSteps = authoredSteps.filter((s) => !isNotebookStep(s));
const notebookSteps = allSteps.filter((s) => isNotebookStep(s));

describe('Unit 3 registration and Lesson 16 metadata', () => {
  it('registers Lesson 16 in Unit 3 immediately after Lesson 15', () => {
    const ids = (unit03.lessons ?? []).map((l) => l.id);
    expect(ids).toContain('lesson-16-angle-bisector');
    expect(ids.indexOf('lesson-16-angle-bisector')).toBe(
      ids.indexOf('lesson-15-triangle-median') + 1,
    );
    expect(lesson16.title).toBe(L16_LESSON_TITLE);
    expect(lesson16.source).toEqual({ page: '62–63', locator: 'الدرس الرابع من الوحدة الثالثة' });
  });
  it('invent no lesson summary, objectives or vocabulary', () => {
    expect(lesson16.summary).toBeUndefined();
    expect(lesson16.objectives ?? []).toEqual([]);
    expect(lesson16.vocabulary ?? []).toEqual([]);
  });
  it('separates 6 source steps from 4 authored teaching steps and one final notebook', () => {
    expect(sourceSteps.map((s) => s.id)).toEqual([
      'l16-step-01-test',
      'l16-step-02-proof',
      'l16-step-03-learn',
      'l16-step-04-special',
      'l16-step-05-check',
      'l16-step-06-practice',
    ]);
    expect(teachingSteps.map((s) => s.id)).toEqual([
      'l16-step-a01-orientation',
      'l16-step-a02-lab',
      'l16-step-a03-incenter-construction',
      'l16-step-a04-recap',
    ]);
    expect(notebookSteps).toHaveLength(1);
    expect(notebookSteps[0]).toMatchObject({
      id: 'lesson-16-student-notebook',
      origin: 'authored',
      role: 'notebook',
      kicker: 'شرح المنصّة',
    });
    for (const s of sourceSteps) {
      expect(s.source).toBeDefined();
      expect([62, 63]).toContain(s.source?.page);
    }
    for (const s of authoredSteps) {
      expect(s.kicker).toBe('شرح المنصّة');
      expect(s.source).toBeUndefined();
    }
  });
  it('keeps pages 62 and 63 in strict printed order', () => {
    expect(sourceSteps.map((s) => s.source?.page)).toEqual([62, 62, 63, 63, 63, 63]);
  });
  it('opens with the orientation, ends with the recap then the notebook, no repeated id', () => {
    expect(allSteps[0]!.id).toBe('l16-step-a01-orientation');
    expect(allSteps.at(-2)!.id).toBe('l16-step-a04-recap');
    expect(allSteps.at(-1)!.id).toBe('lesson-16-student-notebook');
    expect(new Set(allSteps.map((s) => s.id)).size).toBe(allSteps.length);
  });
});

describe('verbatim coverage of textbook pages 62 and 63', () => {
  const corpus = sourceSteps.map((s) => textOf(s.blocks as readonly ContentBlock[])).join('\n');
  it('reproduces the test, the proof and its hint', () => {
    for (const snippet of [L16_TEST_1, L16_TEST_2, L16_PROOF_INTRO, L16_PROOF_5, L16_PROOF_HINT])
      expect(corpus).toContain(snippet);
  });
  it('reproduces the definition, the property and both 💡 hints (circumcircle review + incircle)', () => {
    for (const snippet of [L16_DEFINITION, L16_SPECIAL, L16_HINT_CIRCUM, L16_HINT_IN])
      expect(corpus).toContain(snippet);
  });
  it('reproduces «تحقّق من فهمك» and «تدرّب» ①② with the printed angles', () => {
    for (const snippet of [
      L16_CHECK,
      L16_PRACTICE_1,
      L16_PRACTICE_2_INTRO,
      L16_PRACTICE_2_1,
      L16_PRACTICE_2_2,
      L16_PRACTICE_2_3,
    ])
      expect(corpus).toContain(snippet);
    expect(L16_CHECK).toContain('36');
    expect(L16_CHECK).toContain('64');
    expect(L16_CHECK).toContain('7');
    expect(L16_PRACTICE_2_INTRO).toContain('84');
    expect(L16_PRACTICE_2_INTRO).toContain('62');
  });
  it('uses \\widehat notation and never the ∠ glyph or \\angle', () => {
    expect(corpus).toContain('\\widehat');
    expect(corpus).not.toContain('∠');
    expect(corpus).not.toContain('\\angle');
  });
});

describe('printed prompts parity with Teacher Area solutions & formative assessment', () => {
  it('accounts for all 15 printed prompts', () => {
    expect(L16_PRINTED_PROMPTS).toHaveLength(15);
    expect(new Set(L16_PRINTED_PROMPTS).size).toBe(15);
  });
  it('provides one textbookSolution record per printed prompt, in exact printed order', () => {
    const solutions = lesson16TeacherResources.textbookSolutions ?? [];
    expect(solutions).toHaveLength(L16_PRINTED_PROMPTS.length);
    expect(solutions.map((s) => s.question)).toEqual([...L16_PRINTED_PROMPTS]);
    expect(new Set(solutions.map((s) => s.id)).size).toBe(solutions.length);
    for (const r of solutions) {
      expect(r.blocks.length).toBeGreaterThanOrEqual(6);
      expect(r.reference).toMatch(/صفحة (٦٢|٦٣)/);
    }
  });
  it('solves every printed question that appears inside a student step', () => {
    const printed = new Set<string>();
    for (const s of sourceSteps)
      for (const b of s.blocks as readonly ContentBlock[])
        if (b.type === 'questionGroup') for (const it of b.items) printed.add(it.text);
    const solved = new Set(
      (lesson16TeacherResources.textbookSolutions ?? []).map((r) => r.question),
    );
    for (const q of printed) expect(solved, `no teacher solution for: ${q}`).toContain(q);
  });
  it('gives every solution at least one authored figure with a page', () => {
    for (const r of lesson16TeacherResources.textbookSolutions ?? []) {
      const d = diagramsIn(r.blocks as readonly ContentBlock[]);
      expect(d.length, `${r.id} needs a figure`).toBeGreaterThan(0);
      for (const dia of d) {
        expect(dia.origin).toBe('authored');
        expect(dia.source?.page).toBeTruthy();
      }
    }
  });
  it('admits AH = AK exactly as the source admits it (no re-proof claimed)', () => {
    const proof5 = (lesson16TeacherResources.textbookSolutions ?? []).find(
      (s) => s.id === 'l16-sol-p62-proof-5',
    )!;
    expect(proof5.reference).toContain('مقبولة');
    expect(textOf(proof5.blocks)).toContain('AH=AK');
  });
  it('includes an 8-question formative assessment spanning the three in-lesson types', () => {
    const q = lesson16Assessment.questions;
    expect(q).toHaveLength(8);
    expect(new Set(q.map((x) => x.id)).size).toBe(8);
    expect(new Set(q.map((x) => x.type))).toEqual(
      new Set(['multiple-choice', 'true-false', 'numeric']),
    );
    expect(q.every((x) => x.origin === 'authored')).toBe(true);
    expect(q.every((x) => (x.explanation ?? []).length > 0)).toBe(true);
    expect(lesson16Assessment.passingScore).toBe(75);
  });
});

describe('Lesson 16 figures and the angle-bisector lab', () => {
  it('publishes 12 unique constructed FigureSpecs', () => {
    expect(ALL_L16_FIGURE_SPECS).toHaveLength(12);
    const ids = ALL_L16_FIGURE_SPECS.map((e) => e.id);
    expect(new Set(ids).size).toBe(12);
    for (const id of [
      'fig-l16-test-given',
      'fig-l16-test-solution',
      'fig-l16-proof-given',
      'fig-l16-proof-solution',
      'fig-l16-definition',
      'fig-l16-properties',
      'fig-l16-check-given',
      'fig-l16-check-solution',
      'fig-l16-practice-one-given',
      'fig-l16-practice-one-solution',
      'fig-l16-practice-two-given',
      'fig-l16-practice-two-solution',
    ])
      expect(ids).toContain(id);
  });
  it('gives every spec a positive viewBox containing all of its geometry', () => {
    for (const { id, spec } of ALL_L16_FIGURE_SPECS) {
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
  it('registers the angle-bisector-lab interactive renderer', () => {
    expect(angleBisectorLabDiagram.kind).toBe('interactive');
    expect(angleBisectorLabDiagram.renderer).toBe('angle-bisector-lab');
    expect(registeredRendererKeys().interactive).toContain('angle-bisector-lab');
  });
  it('embeds the lab in an authored step, never in a source step', () => {
    const lab = authoredSteps.find((s) => s.id === 'l16-step-a02-lab');
    expect(lab).toBeDefined();
    expect(JSON.stringify(lab!.blocks)).toContain('angle-bisector-lab');
    for (const s of sourceSteps)
      expect(JSON.stringify(s.blocks)).not.toContain('angle-bisector-lab');
  });
  it('embeds every published figure somewhere and never as a textbook scan', () => {
    const student = allSteps.flatMap((s) => diagramsIn(s.blocks as readonly ContentBlock[]));
    const solution = (lesson16TeacherResources.textbookSolutions ?? []).flatMap((r) =>
      diagramsIn(r.blocks as readonly ContentBlock[]),
    );
    expect(student.some((d) => d.kind === 'interactive')).toBe(true);
    const embedded = new Set([...student, ...solution].map((d) => d.id));
    for (const e of ALL_L16_FIGURE_SPECS)
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
      ...(lesson16TeacherResources.notes ?? []).map((n) => textOf([n])),
    ]
      .join('\n')
      .replace(/\s+/g, ' ');
    for (const phrase of ['اكتملت الوحدة', 'الوحدة مكتملة', 'أنهينا الوحدة', 'تم إنجاز الوحدة'])
      expect(corpus).not.toContain(phrase);
  });
});
