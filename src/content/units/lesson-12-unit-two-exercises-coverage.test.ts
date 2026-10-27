import { describe, expect, it } from 'vitest';
import '@/components/diagram/renderers';
import { registeredRendererKeys } from '@/components/diagram/registry';
import type { ContentBlock, DiagramSpec, LessonStep } from '@/content/schema';
import { unit02 } from './unit-02-triangles-midpoints-parallels';
import { lesson12 } from './lesson-12-unit-two-exercises';
import { LESSON12_FIGURES } from './lesson-12-figures';
import {
  L12_PRINTED_PROMPTS,
  L12_PRINTED_TITLES,
  L12_Q18_CASE_1,
  L12_Q18_CASE_2,
  L12_Q18_STEM,
  L12_Q19_DRAFT_HEAD,
  L12_Q19_GRADER_REMARKS,
  L12_Q19_REMARK_1,
  L12_Q19_REMARK_2,
  L12_Q19_STUDENT_1,
  L12_Q19_STUDENT_2,
  L12_Q20_FLOWCHART_SUBITEMS,
  L12_Q33_CASE_2,
  L12_Q33_STEM,
  L12_Q34_ITEM_1,
  L12_TITLE_Q19,
  exercisePage,
} from './lesson-12-questions';

/**
 * ============================================================================
 *  «تمارين الوحدة الثانية» — REGISTRATION, COVERAGE & FIDELITY INVARIANTS
 * ============================================================================
 *
 *  Pins the Unit 2 exercise set against:
 *    • registration as the last lesson of Unit 2, with no unit-level
 *      assessment and no unit-completion claim;
 *    • one source step per printed exercise, in printed order;
 *    • every printed prompt present exactly once, and nothing added to the
 *      student view — no solution, no answer key, no assessment, no
 *      platform commentary inside the exercise cards;
 *    • every figure carrying an id, an Arabic description and a source
 *      reference; the renderer key registered; Question 31 keeping the
 *      photograph; no figure invented for Question 34;
 *    • Question 33 keeping the printed «(IF)» in the student text while the
 *      discrepancy with its printed figure stays recorded in the Teacher
 *      Area.
 * ============================================================================
 */

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
      return [block.title ?? '', ...block.rows.flat()];
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
const studentDiagrams = steps.flatMap((step) => step.blocks.flatMap(collectDiagrams));

describe('Unit 2 registration and the exercise-set metadata', () => {
  it('registers the exercise set as the last lesson of Unit 2', () => {
    expect((unit02.lessons ?? []).map((lesson) => lesson.id)).toEqual([
      'lesson-08-triangle-midpoints',
      'lesson-09-parallel-from-midpoint',
      'lesson-10-parallel-lines-transversals',
      'lesson-11-three-ratios',
      'lesson-12-unit-two-exercises',
    ]);
    expect((unit02.lessons ?? [])[4]?.title).toBe('تمارين الوحدة الثانية');
  });

  it('keeps the unit free of a unit-level assessment and invents no lesson summary', () => {
    expect((unit02 as { assessment?: unknown }).assessment).toBeUndefined();
    expect(lesson12.summary).toBeUndefined();
    expect(lesson12.objectives ?? []).toEqual([]);
    expect(lesson12.vocabulary ?? []).toEqual([]);
  });

  it('carries no assessment of its own: the printed set prints none', () => {
    expect(lesson12.assessment).toBeUndefined();
  });
});

describe('the printed exercises of the set', () => {
  it('gives every printed exercise Q1–Q34 exactly one source step, in printed order', () => {
    const sourceSteps = steps.filter((step) => step.origin === 'source');
    expect(sourceSteps).toHaveLength(34);
    expect(sourceSteps.map((step) => step.source?.page)).toEqual(
      Array.from({ length: 34 }, (_, idx) => `صورة المصدر (الوحدة الثانية) — السؤال ${idx + 1}`),
    );
    expect(sourceSteps.slice(17).map((step) => step.id)).toEqual([
      'l12-step-18-calculating-ej',
      'l12-step-19-writing-a-proof',
      'l12-step-20-analysing-a-flowchart',
      'l12-step-21-quadrilateral',
      'l12-step-22-perpendicular-bisector',
      'l12-step-23-perpendicular-bisector-of-a-segment',
      'l12-step-24-altitude-and-bisector',
      'l12-step-25-starting-from-a-rhombus',
      'l12-step-26-perimeter-and-area',
      'l12-step-27-unknown-lengths',
      'l12-step-28-from-parallel-to-parallel',
      'l12-step-29-equal-ratios',
      'l12-step-30-dividing-a-segment',
      'l12-step-31-measuring-a-tower',
      'l12-step-32-distance-between-two-towers',
      'l12-step-33-three-equal-ratios',
      'l12-step-34-midpoint-again',
    ]);
    expect(sourceSteps.every((step) => step.source !== undefined)).toBe(true);
  });

  it('adds no authored step to the exercise set', () => {
    expect(steps.filter((step) => step.origin === 'authored')).toHaveLength(0);
  });

  it('shows every printed prompt exactly once, in printed order', () => {
    const printed = L12_PRINTED_PROMPTS;
    expect(printed.length).toBeGreaterThan(0);
    for (const prompt of printed) {
      // Some sentences are printed twice by the book (Questions 22 and 25
      // both print «ارسم شكلاً يتفق ومعطيات النص.»), so the expected count is
      // the number of times the page prints that very sentence.
      //
      // «$ABCD$ متوازي أضلاع مركزه $O$.» is printed twice as well: it opens
      // the stem of Question 6 (Batch 1) and it is item 1 of Question 34.
      const expected =
        prompt === L12_Q34_ITEM_1 ? 2 : printed.filter((entry) => entry === prompt).length;
      const occurrences = studentStrings.filter((text) => text.includes(prompt)).length;
      expect(occurrences, `prompt "${prompt.slice(0, 24)}…"`).toBe(expected);
    }
  });

  it('prints every printed green section title and invents none for Questions 18 and 33', () => {
    for (const title of L12_PRINTED_TITLES) {
      expect(steps.some((step) => step.title === title)).toBe(true);
    }
    const q18 = steps.find((step) => step.id === 'l12-step-18-calculating-ej');
    expect(q18?.title).toBe('السؤال 18');
    expect(L12_PRINTED_TITLES).not.toContain('السؤال 18');
    const q19 = steps.find((step) => step.id === 'l12-step-19-writing-a-proof');
    expect(q19?.title).toBe(L12_TITLE_Q19);
    const q33 = steps.find((step) => step.id === 'l12-step-33-three-equal-ratios');
    expect(q33?.title).toBe('السؤال 33');
    expect(L12_PRINTED_TITLES).not.toContain('السؤال 33');
  });

  it('cites every exercise by its scan and never by an invented printed page', () => {
    for (const step of steps) {
      expect(String(step.source?.page)).toMatch(/^صورة المصدر \(الوحدة الثانية\) — السؤال \d+$/);
    }
    expect(exercisePage(28)).toBe('صورة المصدر (الوحدة الثانية) — السؤال 28');
  });
});

describe('the student view carries no answer', () => {
  it('contains no solution, no answer key and no platform teaching block', () => {
    const teachingBlocks = steps.flatMap((step) =>
      step.blocks.filter((block) => block.type === 'teaching'),
    );
    expect(teachingBlocks).toHaveLength(0);
  });

  it('keeps teacher solution records separate from the student steps', () => {
    expect(lesson12.teacherResources?.textbookSolutions.length).toBeGreaterThan(0);
  });

  it('renders the three circled sub-items ①–③ beneath the Question 20 flowchart in the student view', () => {
    const q20 = steps.find((step) => step.id === 'l12-step-20-analysing-a-flowchart');
    expect(q20).toBeDefined();
    const figIdx = q20!.blocks.findIndex((block) => block.type === 'figure');
    expect(figIdx).toBeGreaterThan(0);
    const afterFigure = q20!.blocks.slice(figIdx + 1).flatMap(collectStrings).join(' ');
    for (const line of L12_Q20_FLOWCHART_SUBITEMS) {
      expect(afterFigure, line).toContain(line);
    }
  });

  it('places the Question 32 figure above its stem («كما في المخطط المرسوم أعلاه»)', () => {
    const q32 = steps.find((step) => step.id === 'l12-step-32-distance-between-two-towers');
    expect(q32).toBeDefined();
    expect(q32!.blocks[0]?.type).toBe('figure');
  });

  it('keeps the editorial uncertainty in the Teacher Area, not in the student view', () => {
    const notes = ((lesson12.teacherResources?.notes ?? []) as ContentBlock[])
      .flatMap(collectStrings)
      .join(' ');
    expect(notes).toContain('السؤال 33');
    expect(notes).toContain('(IF)');
    // Editorial discrepancy remarks must not appear in student blocks or figure captions.
    const allStudentVisible = studentStrings.join(' ');
    for (const marker of [
      'تعارض',
      'يبدوان متوازيين',
      'على $[AB]$ وحدها',
      'نهاية المقطع الأحمر الخارج من',
    ]) {
      expect(allStudentVisible, marker).not.toContain(marker);
    }
  });
});

describe('the figures of the set', () => {
  it('publishes fifteen unique Q18–Q34 figures (35 across Q1–Q34) with Arabic descriptions and sources', () => {
    expect(LESSON12_FIGURES).toHaveLength(15);
    expect(studentDiagrams).toHaveLength(35);
    const ids = LESSON12_FIGURES.map((figure) => figure.id);
    expect(new Set(ids).size).toBe(15);
    for (const figure of LESSON12_FIGURES) {
      expect(figure.alt.trim().length).toBeGreaterThan(20);
      expect(/[؀-ۿ]/.test(figure.alt)).toBe(true);
      expect(figure.source).toBeDefined();
      expect(figure.origin).toBe('textbook');
    }
  });

  it('registers the renderer every reconstructed figure asks for', () => {
    expect(registeredRendererKeys().interactive).toContain('unit-two-exercises-figure');
    for (const figure of LESSON12_FIGURES) {
      if (figure.kind === 'interactive') {
        expect(registeredRendererKeys().interactive).toContain(figure.renderer);
      }
    }
  });

  it('keeps the photograph of Question 31 as printed instead of redrawing it', () => {
    const photo = studentDiagrams.find((diagram) => diagram.id === 'fig-u2-q31-tower-photo');
    expect(photo?.kind).toBe('image');
    if (photo?.kind === 'image') {
      expect(photo.src).toBe('diagrams/unit-02/exercises/q31-tower-photo.png');
      expect(photo.aspectRatio).toBeGreaterThan(2);
    }
    const caption = photo?.caption ?? '';
    expect(caption).toContain('ليست رسماً بمقياس');
  });

  it('invents no figure for Questions 22, 23 and 25, which print none', () => {
    for (const id of [
      'l12-step-22-perpendicular-bisector',
      'l12-step-23-perpendicular-bisector-of-a-segment',
      'l12-step-25-starting-from-a-rhombus',
    ]) {
      const step = steps.find((entry) => entry.id === id);
      expect((step?.blocks ?? []).flatMap(collectDiagrams), id).toHaveLength(0);
    }
  });

  it('invents no figure for Question 34, which prints none', () => {
    const step34 = steps.find((step) => step.id === 'l12-step-34-midpoint-again');
    const diagrams = (step34?.blocks ?? []).flatMap(collectDiagrams);
    expect(diagrams).toHaveLength(0);
  });

  it('reproduces the two cases of Question 33 with their own figure', () => {
    const step33 = steps.find((step) => step.id === 'l12-step-33-three-equal-ratios');
    const diagrams = (step33?.blocks ?? []).flatMap(collectDiagrams);
    expect(diagrams.map((diagram) => diagram.id)).toEqual([
      'fig-u2-q33-case-one',
      'fig-u2-q33-case-two',
    ]);
  });
});

describe('Question 33 keeps the printed text and records its figure discrepancy', () => {
  it('shows the printed «(IF)» to the student', () => {
    expect(L12_Q33_STEM).toContain('اكتب كل تساوي ثلاث نسب');
    expect(L12_Q33_CASE_2).toContain('$(CG) \\parallel (IF)$');
    expect(studentStrings.join(' ')).toContain('$(CG) \\parallel (IF)$');
  });

  it('records the discrepancy between the printed text and the printed figure', () => {
    const notes = ((lesson12.teacherResources?.notes ?? []) as ContentBlock[])
      .flatMap(collectStrings)
      .join(' ');
    expect(notes).toContain('(IF)');
    expect(notes).toContain('$M$');
    expect(notes).toContain('لم تُغلق هذه الملاحظة');
  });

  it('does not add an F to the reconstructed figure of case ② and keeps its student caption neutral', () => {
    const figure = LESSON12_FIGURES.find((diagram) => diagram.id === 'fig-u2-q33-case-two');
    expect(figure?.alt).not.toContain('$F$');
    expect(figure?.alt).toContain('$M$');
    expect(figure?.caption).not.toContain('$F$');
    expect(figure?.caption).not.toContain('نهاية المقطع الأحمر الخارج من');
  });
});

describe('Questions 18 and 19 (Batch 2) preserve printed text, figures, and annotation roles', () => {
  it('reproduces Question 18 with both cases ① and ② and their two figures', () => {
    const step18 = steps.find((step) => step.id === 'l12-step-18-calculating-ej');
    expect(step18?.title).toBe('السؤال 18');
    const step18Text = (step18?.blocks ?? []).flatMap(collectStrings).join(' ');
    expect(step18Text).toContain(L12_Q18_STEM);
    expect(step18Text).toContain(L12_Q18_CASE_1);
    expect(step18Text).toContain(L12_Q18_CASE_2);
    expect(L12_Q18_CASE_2).toContain('(EJ) \\parallel (BA)');
    const diagrams = (step18?.blocks ?? []).flatMap(collectDiagrams);
    expect(diagrams.map((diagram) => diagram.id)).toEqual([
      'fig-u2-q18-case-one',
      'fig-u2-q18-case-two',
    ]);
  });

  it('reproduces Question 19 with the student draft, underlined claim, and grader remarks in student view', () => {
    const step19 = steps.find((step) => step.id === 'l12-step-19-writing-a-proof');
    expect(step19?.title).toBe('تعلُّم تحرير إثبات');
    const draftCallout = (step19?.blocks ?? []).find((block) => block.type === 'callout');
    expect(draftCallout?.type).toBe('callout');
    if (draftCallout?.type === 'callout') {
      expect(draftCallout.variant).toBe('example');
    }
    const step19Strings = (step19?.blocks ?? []).flatMap(collectStrings);
    expect(step19Strings).toContain(L12_Q19_DRAFT_HEAD);
    expect(step19Strings).toContain(L12_Q19_STUDENT_1);
    expect(step19Strings).toContain(L12_Q19_STUDENT_2);
    expect(L12_Q19_STUDENT_1).toContain('\\underline{(IJ) \\parallel (BC)}');
    expect(L12_Q19_GRADER_REMARKS).toEqual([L12_Q19_REMARK_1, L12_Q19_REMARK_2]);
    for (const remark of L12_Q19_GRADER_REMARKS) {
      expect(step19Strings, remark).toContain(remark);
    }
    // Remark 1 prints without a trailing period; remark 2 ends with a period.
    expect(L12_Q19_REMARK_1.endsWith('.')).toBe(false);
    expect(L12_Q19_REMARK_2.endsWith('.')).toBe(true);
    const diagrams = (step19?.blocks ?? []).flatMap(collectDiagrams);
    expect(diagrams.map((diagram) => diagram.id)).toEqual(['fig-u2-q19-proof-draft']);
  });
});
