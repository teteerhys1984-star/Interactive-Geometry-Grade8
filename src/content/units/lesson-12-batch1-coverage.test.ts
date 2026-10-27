import { describe, expect, it } from 'vitest';
import '@/components/diagram/renderers';
import { registeredRendererKeys } from '@/components/diagram/registry';
import type { ContentBlock, DiagramSpec, LessonStep } from '@/content/schema';
import { lesson12 } from './lesson-12-unit-two-exercises';
import { LESSON12_BATCH1_FIGURES } from './lesson-12-batch1-figures';
import {
  L12B_BLUE_ANSWER_LINES,
  L12B_PRINTED_PROMPTS,
  L12B_Q1_ITEM_1,
  L12B_Q1_ITEM_2,
  L12B_Q1_ITEM_3,
  L12B_Q1_ITEM_4,
  L12B_Q1_ITEM_5,
  L12B_Q2_ANSWER_1,
  L12B_Q2_ANSWER_2,
  L12B_Q2_ANSWER_3,
  L12B_Q2_ANSWER_4,
  L12B_Q2_ITEM_1,
  L12B_Q2_ITEM_2,
  L12B_Q2_ITEM_3,
  L12B_Q2_ITEM_4,
  L12B_Q4_STEM,
  L12B_Q5_ITEM_1,
  L12B_Q7_STEM,
  L12B_Q9_REMEMBER_1,
  L12B_Q9_REMEMBER_2,
  L12B_Q9_REMEMBER_TITLE,
  L12B_Q10_STEM,
  L12B_Q11_STEM,
} from './lesson-12-batch1-questions';

/**
 * ============================================================================
 *  «تمارين الوحدة الثانية» — BATCH 1 (Q1–Q17) · COVERAGE & FIDELITY INVARIANTS
 * ============================================================================
 */

const BATCH1_STEP_IDS = [
  'l12-step-01-one-correct-answer',
  'l12-step-02-true-or-false',
  'l12-step-03-rectangle-and-midpoint',
  'l12-step-04-midline-of-a-triangle',
  'l12-step-05-medial-triangle',
  'l12-step-06-parallelogram-and-symmetry',
  'l12-step-07-two-concentric-circles',
  'l12-step-08-translation-and-symmetry',
  'l12-step-09-midpoints-are-collinear',
  'l12-step-10-two-coloured-figures',
  'l12-step-11-two-circles-one-chord',
  'l12-step-12-a-ray-and-two-points',
  'l12-step-13-a-hidden-vertex',
  'l12-step-14-two-parallel-lines',
  'l12-step-15-a-table-to-complete',
  'l12-step-16-a-parallel-segment',
  'l12-step-17-a-parallel-segment-again',
];

function collectStrings(block: ContentBlock): string[] {
  switch (block.type) {
    case 'paragraph':
      return [block.text];
    case 'math':
      return [block.latex];
    case 'list':
      return block.items;
    case 'questionGroup':
      return [block.title ?? '', ...block.items.map((item) => item.text)];
    case 'table':
      return [block.title ?? '', ...block.columns, ...block.rows.flat()];
    case 'figure':
      return block.diagram.caption ? [block.diagram.caption] : [];
    case 'callout':
    case 'teaching':
      return [block.title ?? '', ...block.blocks.flatMap(collectStrings)];
    default:
      return [];
  }
}

function collectDiagrams(block: ContentBlock): DiagramSpec[] {
  if (block.type === 'figure') return [block.diagram];
  if (block.type === 'callout' || block.type === 'teaching') {
    return block.blocks.flatMap(collectDiagrams);
  }
  return [];
}

const steps = lesson12.steps as LessonStep[];
const studentStrings = steps.flatMap((step) => step.blocks.flatMap(collectStrings));
const studentText = studentStrings.join(' ');
const teacherText = ((lesson12.teacherResources?.notes ?? []) as ContentBlock[])
  .flatMap(collectStrings)
  .join(' ');

describe('the Batch 1 exercises of the set', () => {
  it('gives every printed exercise of Batch 1 (Q1–Q17) exactly one source step', () => {
    const sourceSteps = steps.filter((step) => step.origin === 'source');
    expect(sourceSteps).toHaveLength(34);
    expect(sourceSteps.slice(0, BATCH1_STEP_IDS.length).map((step) => step.id)).toEqual(
      BATCH1_STEP_IDS,
    );
    for (const id of BATCH1_STEP_IDS) {
      const step = sourceSteps.find((entry) => entry.id === id);
      expect(step, id).toBeDefined();
      expect(step?.source, id).toBeDefined();
    }
  });

  it('orders Q1–Q17 immediately before Q18, Q19 and Q20–Q34 in the complete Q1–Q34 sequence', () => {
    const sourceIds = steps.filter((step) => step.origin === 'source').map((step) => step.id);
    expect(sourceIds).toHaveLength(34);
    expect(sourceIds.indexOf('l12-step-17-a-parallel-segment-again')).toBe(16);
    expect(sourceIds.indexOf('l12-step-18-calculating-ej')).toBe(17);
    expect(sourceIds.indexOf('l12-step-19-writing-a-proof')).toBe(18);
    expect(sourceIds.indexOf('l12-step-20-analysing-a-flowchart')).toBe(19);
    expect(sourceIds.indexOf('l12-step-34-midpoint-again')).toBe(33);
  });

  it('cites every Batch 1 exercise by its scan and never by an invented page', () => {
    for (const id of BATCH1_STEP_IDS) {
      const step = steps.find((entry) => entry.id === id);
      expect(String(step?.source?.page)).toMatch(
        /^صورة المصدر \(الوحدة الثانية\) — السؤال \d+$/,
      );
    }
  });

  it('shows every printed prompt of Batch 1 verbatim', () => {
    const batch1Strings = steps.slice(0, BATCH1_STEP_IDS.length).flatMap((step) =>
      step.blocks.flatMap(collectStrings),
    );
    expect(L12B_PRINTED_PROMPTS.length).toBeGreaterThan(0);
    for (const prompt of L12B_PRINTED_PROMPTS) {
      const expected = L12B_PRINTED_PROMPTS.filter((entry) => entry === prompt).length;
      const occurrences = batch1Strings.filter((text) => text === prompt).length;
      expect(occurrences, `prompt "${prompt.slice(0, 28)}…"`).toBe(expected);
    }
  });

  it('keeps all five blue sub-items ①–⑤ of Question 1 as children of Green Question 1', () => {
    const step1 = steps.find((step) => step.id === 'l12-step-01-one-correct-answer');
    const groups = (step1?.blocks ?? []).filter((block) => block.type === 'questionGroup');
    expect(groups).toHaveLength(5);
    expect(groups.map((group) => (group.type === 'questionGroup' ? group.title : ''))).toEqual([
      '①',
      '②',
      '③',
      '④',
      '⑤',
    ]);
    const expectedSubTexts = [
      L12B_Q1_ITEM_1,
      L12B_Q1_ITEM_2,
      L12B_Q1_ITEM_3,
      L12B_Q1_ITEM_4,
      L12B_Q1_ITEM_5,
    ];
    groups.forEach((group, idx) => {
      expect(group.type).toBe('questionGroup');
      if (group.type !== 'questionGroup') return;
      expect(group.items.map((entry) => entry.text)).toContain(expectedSubTexts[idx]);
    });
  });

  it('keeps all four blue sub-items ①–④ of Question 2 as children of Green Question 2', () => {
    const step2 = steps.find((step) => step.id === 'l12-step-02-true-or-false');
    const groups = (step2?.blocks ?? []).filter((block) => block.type === 'questionGroup');
    expect(groups).toHaveLength(4);
    expect(groups.map((group) => (group.type === 'questionGroup' ? group.title : ''))).toEqual([
      '①',
      '②',
      '③',
      '④',
    ]);
    const pairs = [
      [L12B_Q2_ITEM_1, L12B_Q2_ANSWER_1],
      [L12B_Q2_ITEM_2, L12B_Q2_ANSWER_2],
      [L12B_Q2_ITEM_3, L12B_Q2_ANSWER_3],
      [L12B_Q2_ITEM_4, L12B_Q2_ANSWER_4],
    ] as const;
    pairs.forEach((expectedPair, idx) => {
      const group = groups[idx];
      expect(group?.type).toBe('questionGroup');
      if (group?.type !== 'questionGroup') return;
      expect(group.items.map((entry) => entry.text)).toEqual([...expectedPair]);
    });
  });

  it('shows the four blue printed answer lines of Question 2 to the student', () => {
    expect(L12B_BLUE_ANSWER_LINES).toHaveLength(4);
    for (const line of L12B_BLUE_ANSWER_LINES) {
      expect(studentText, line).toContain(line);
    }
    expect(L12B_BLUE_ANSWER_LINES).toEqual([
      L12B_Q2_ANSWER_1,
      L12B_Q2_ANSWER_2,
      L12B_Q2_ANSWER_3,
      L12B_Q2_ANSWER_4,
    ]);
  });

  it('keeps Question 4 I/J wording and diagram labels aligned without swapping', () => {
    expect(L12B_Q4_STEM).toContain('$I$ و $J$ نقطتان من ضلعيه $[AB]$ و $[AC]$ على التوالي');
    const fig4 = LESSON12_BATCH1_FIGURES.find((fig) => fig.id === 'fig-u2-q4-triangle');
    expect(fig4?.alt).toContain('$I$ على $[AB]$ و$J$ على $[AC]$');
  });

  it('keeps the «تذكَّر:» box of Question 9 with its two printed bullets', () => {
    const step9 = steps.find((step) => step.id === 'l12-step-09-midpoints-are-collinear');
    const callout = (step9?.blocks ?? []).find((block) => block.type === 'callout');
    expect(callout?.type).toBe('callout');
    if (callout?.type !== 'callout') return;
    expect(callout.variant).toBe('hint');
    expect(callout.title).toBe(L12B_Q9_REMEMBER_TITLE);
    const lines = callout.blocks.flatMap(collectStrings);
    expect(lines).toContain(L12B_Q9_REMEMBER_1);
    expect(lines).toContain(L12B_Q9_REMEMBER_2);
  });

  it('keeps the printed wording of Questions 7, 10 and 11 verbatim', () => {
    expect(studentText).toContain(L12B_Q7_STEM);
    expect(studentText).toContain('المستقيمتان $(OA)$ و $(OB)$ تقطعان');
    expect(studentText).toContain(L12B_Q10_STEM);
    expect(studentText).toContain('في كلٍّ من الشكلين ① و ② الآتيين، تقرأ معطيات');
    expect(studentText).toContain(L12B_Q11_STEM);
    expect(studentText).toContain('$2\\ cm$ و $4\\ cm$');
    expect(studentText).toContain('$IJ = 5\\ cm$');
    expect(studentText).toContain('القطعة $[OI]$ تقطع $C$ في $S$');
  });
});

describe('Batch 1 solutions remain teacher-only', () => {
  it('keeps platform teaching blocks out of the student steps while exposing teacher resources separately', () => {
    const teachingBlocks = steps.flatMap((step) =>
      step.blocks.filter((block) => block.type === 'teaching'),
    );
    expect(teachingBlocks).toHaveLength(0);
    expect((lesson12.teacherResources?.textbookSolutions ?? []).length).toBeGreaterThan(0);
  });

  it('adds no editorial commentary inside the exercise cards or student captions', () => {
    for (const marker of [
      'أُعيد',
      'تعارض',
      'بانتظار الدفعة الثانية',
      'ملاحظات المصدر',
      'يبدوان متوازيين',
      'بينما معطيات المنتصفين',
      'النص يذكر أنَّ $K$ منتصف',
      'على $[AB]$ وحدها',
      'الجدول المطبوع مع السؤال 15',
    ]) {
      expect(studentText, marker).not.toContain(marker);
    }
  });
});

describe('the figures of Batch 1', () => {
  it('publishes twenty unique figures with an Arabic description and a source', () => {
    expect(LESSON12_BATCH1_FIGURES).toHaveLength(20);
    const ids = LESSON12_BATCH1_FIGURES.map((figure) => figure.id);
    expect(new Set(ids).size).toBe(20);
    for (const figure of LESSON12_BATCH1_FIGURES) {
      expect(figure.alt.trim().length).toBeGreaterThan(20);
      expect(/[؀-ۿ]/.test(figure.alt)).toBe(true);
      expect(figure.source).toBeDefined();
      expect(figure.origin).toBe('textbook');
    }
  });

  it('registers the renderer every Batch 1 figure asks for', () => {
    expect(registeredRendererKeys().interactive).toContain('unit-two-exercises-figure');
    for (const figure of LESSON12_BATCH1_FIGURES) {
      if (figure.kind === 'interactive') {
        expect(registeredRendererKeys().interactive).toContain(figure.renderer);
      }
    }
  });

  it('invents no figure for the draw-your-own questions (Q7, Q8, Q11, Q12)', () => {
    for (const id of [
      'l12-step-07-two-concentric-circles',
      'l12-step-08-translation-and-symmetry',
      'l12-step-11-two-circles-one-chord',
      'l12-step-12-a-ray-and-two-points',
    ]) {
      const step = steps.find((entry) => entry.id === id);
      expect((step?.blocks ?? []).flatMap(collectDiagrams), id).toHaveLength(0);
    }
  });

  it('reproduces all five figures of Question 1 and both figures of Question 10', () => {
    const step1 = steps.find((step) => step.id === 'l12-step-01-one-correct-answer');
    const ids1 = (step1?.blocks ?? []).flatMap(collectDiagrams).map((diagram) => diagram.id);
    expect(ids1).toEqual([
      'fig-u2-q1-quadrilateral',
      'fig-u2-q1-case-one',
      'fig-u2-q1-case-two',
      'fig-u2-q1-case-three',
      'fig-u2-q1-thales-triangle',
    ]);
    const step10 = steps.find((step) => step.id === 'l12-step-10-two-coloured-figures');
    const ids10 = (step10?.blocks ?? []).flatMap(collectDiagrams).map((diagram) => diagram.id);
    expect(ids10).toEqual(['fig-u2-q10-case-one', 'fig-u2-q10-case-two']);
  });

  it('reproduces the printed table of Question 15 in RTL column order', () => {
    const step15 = steps.find((step) => step.id === 'l12-step-15-a-table-to-complete');
    const table = (step15?.blocks ?? []).find((block) => block.type === 'table');
    expect(table?.type).toBe('table');
    if (table?.type !== 'table') return;
    expect(table.title).toBeUndefined();
    expect(table.columns).toEqual([
      'أطوال أضلاع المثلث $ATV$',
      '$AV = 3.5$',
      '$AT = ......$',
      '$TV = 3$',
    ]);
    expect(table.rows).toEqual([
      ['أطوال أضلاع المثلث $ABC$', '$AC = ......$', '$AB = 9.9$', '$BC = 6.6$'],
    ]);
  });
});

describe('the printed defects and discrepancies stay recorded, not silently fixed', () => {
  it('keeps the duplicated word «في في» of Question 5 in the student text', () => {
    expect(L12B_Q5_ITEM_1).toContain('في في');
    expect(studentText).toContain(L12B_Q5_ITEM_1);
  });

  it('records every source discrepancy in the Teacher Area ledger', () => {
    expect(teacherText).toContain('في في');
    expect(teacherText).toContain('السؤال 1');
    expect(teacherText).toContain('السؤال 2');
    expect(teacherText).toContain('المستقيمتان');
    expect(teacherText).toContain('القطعة $[OI]$ تقطع $C$ في $S$');
    expect(teacherText).toContain('من السؤال 1 إلى السؤال 34');
  });

  it('keeps the editorial remarks out of the student view', () => {
    expect(studentText).not.toContain('تعارض');
    expect(studentText).not.toContain('بانتظار الدفعة الثانية');
  });
});
