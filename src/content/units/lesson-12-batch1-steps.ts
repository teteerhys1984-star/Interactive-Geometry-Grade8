import type { ContentBlock, LessonStep } from '@/content/schema';
import {
  fig12bQ1,
  fig12bQ1CaseOne,
  fig12bQ1CaseThree,
  fig12bQ1CaseTwo,
  fig12bQ1Thales,
  fig12bQ2Circles,
  fig12bQ2Quadrilateral,
  fig12bQ2Triangle,
  fig12bQ3,
  fig12bQ4,
  fig12bQ5,
  fig12bQ6,
  fig12bQ9,
  fig12bQ10CaseOne,
  fig12bQ10CaseTwo,
  fig12bQ13,
  fig12bQ14,
  fig12bQ15,
  fig12bQ16,
  fig12bQ17,
} from './lesson-12-batch1-figures';
import {
  L12B_Q1_ITEM_1,
  L12B_Q1_ITEM_1_OPTION_1,
  L12B_Q1_ITEM_1_OPTION_2,
  L12B_Q1_ITEM_1_OPTION_3,
  L12B_Q1_ITEM_2,
  L12B_Q1_ITEM_2_LEAD,
  L12B_Q1_ITEM_2_OPTION_1,
  L12B_Q1_ITEM_2_OPTION_2,
  L12B_Q1_ITEM_2_OPTION_3,
  L12B_Q1_ITEM_3,
  L12B_Q1_ITEM_4,
  L12B_Q1_ITEM_4_LEAD,
  L12B_Q1_ITEM_4_OPTION_1,
  L12B_Q1_ITEM_4_OPTION_2,
  L12B_Q1_ITEM_4_OPTION_3,
  L12B_Q1_ITEM_5,
  L12B_Q1_ITEM_5_LEAD,
  L12B_Q1_ITEM_5_OPTION_1,
  L12B_Q1_ITEM_5_OPTION_2,
  L12B_Q1_ITEM_5_OPTION_3,
  L12B_Q1_STEM,
  L12B_Q10_STEM,
  L12B_Q11_ITEM_1,
  L12B_Q11_ITEM_2,
  L12B_Q11_ITEM_3,
  L12B_Q11_STEM,
  L12B_Q12_ITEM_1,
  L12B_Q12_ITEM_2,
  L12B_Q12_STEM,
  L12B_Q13_STEM,
  L12B_Q14_ITEM_1,
  L12B_Q14_ITEM_2,
  L12B_Q14_STEM,
  L12B_Q15_STEM,
  L12B_Q15_TABLE_COLUMNS,
  L12B_Q15_TABLE_ROWS,
  L12B_Q16_ITEM_1,
  L12B_Q16_ITEM_2,
  L12B_Q16_STEM,
  L12B_Q17_STEM,
  L12B_Q2_ANSWER_1,
  L12B_Q2_ANSWER_2,
  L12B_Q2_ANSWER_3,
  L12B_Q2_ANSWER_4,
  L12B_Q2_ITEM_1,
  L12B_Q2_ITEM_2,
  L12B_Q2_ITEM_3,
  L12B_Q2_ITEM_4,
  L12B_Q2_STEM,
  L12B_Q3_ITEM_1,
  L12B_Q3_ITEM_2,
  L12B_Q3_STEM,
  L12B_Q4_ITEM_1,
  L12B_Q4_ITEM_2,
  L12B_Q4_STEM,
  L12B_Q5_ITEM_1,
  L12B_Q5_ITEM_2,
  L12B_Q5_ITEM_3,
  L12B_Q5_STEM,
  L12B_Q6_ITEM_1,
  L12B_Q6_ITEM_2,
  L12B_Q6_ITEM_3,
  L12B_Q6_STEM,
  L12B_Q7_ITEM_1,
  L12B_Q7_ITEM_2,
  L12B_Q7_ITEM_3,
  L12B_Q7_STEM,
  L12B_Q8_ITEM_1,
  L12B_Q8_ITEM_2,
  L12B_Q8_ITEM_3,
  L12B_Q8_STEM,
  L12B_Q9_REMEMBER_1,
  L12B_Q9_REMEMBER_2,
  L12B_Q9_REMEMBER_TITLE,
  L12B_Q9_STEM,
  batch1Source,
} from './lesson-12-batch1-questions';

/**
 * ============================================================================
 *  UNIT 2 — «تمارين الوحدة الثانية» · THE STUDENT SEQUENCE OF Q1–Q17
 * ============================================================================
 *
 *  One `origin: 'source'` step per printed exercise, in printed order, before
 *  the steps of Questions 20–Q34. The set therefore reads Q1 … Q17, then
 *  Q20 … Q34 — the printed order, with the gap where Batch 2 (Q18 and Q19)
 *  will be inserted.
 *
 *  NOTHING IS ADDED TO THE STUDENT VIEW:
 *
 *    • no solution, no answer key, no worked proof, no platform commentary —
 *      every sentence a student reads here is a sentence the book prints,
 *      except the neutral step labels the page does not print;
 *    • the four BLUE lines of Question 2 are printed lines OF THE BOOK, and
 *      they are shown to the student because the page prints them;
 *    • no figure is drawn for Questions 7, 8, 11 and 12 — the page prints
 *      none for them, they ask the student to draw his own.
 *
 *  The green number of each exercise is the step; the BLUE numbers printed
 *  inside Questions 1 and 2 (①–⑤ under Q1, ①–④ under Q2) are its sub-items
 *  and are kept as the title of their own group, never promoted to separate
 *  questions.
 * ============================================================================
 */

/** A printed stem (paragraph) followed by its printed sub-items (a group). */
function printedCard(
  stem: string | undefined,
  items: { label?: string; text: string }[],
): ContentBlock[] {
  const group: ContentBlock = {
    type: 'questionGroup',
    items: items.map((item) => (item.label ? { label: item.label, text: item.text } : { text: item.text })),
  };
  if (stem) return [{ type: 'paragraph', text: stem }, ...(items.length ? [group] : [])];
  return items.length ? [group] : [];
}

/**
 * One BLUE sub-item of a green exercise: the blue number is the group title,
 * the printed lines under it are its items.
 */
function blueItem(
  label: string,
  lines: { label?: string; text: string }[],
): ContentBlock {
  return {
    type: 'questionGroup',
    title: label,
    items: lines.map((line) => (line.label ? { label: line.label, text: line.text } : { text: line.text })),
  };
}

/* -------------------------------------------------------------------------- */
/*  Question 1 (images 1–3: blue sub-items ①–⑤)                                 */
/* -------------------------------------------------------------------------- */

const step1: LessonStep = {
  id: 'l12-step-01-one-correct-answer',
  origin: 'source',
  kicker: 'تمارين الوحدة الثانية — السؤال 1',
  title: 'السؤال 1',
  source: batch1Source(
    1,
    'الرسم المطبوع للبند ② يوازي $[AB]$ بـ $[CD]$ ويجمع $B$ و$J$ و$K$ على مستقيم واحد، وهو أبعد مما يذكره النص؛ أُعيد كما هو مطبوع.',
  ),
  blocks: [
    { type: 'paragraph', text: L12B_Q1_STEM },
    blueItem('①', [
      { text: L12B_Q1_ITEM_1 },
      { label: '①', text: L12B_Q1_ITEM_1_OPTION_1 },
      { label: '②', text: L12B_Q1_ITEM_1_OPTION_2 },
      { label: '③', text: L12B_Q1_ITEM_1_OPTION_3 },
    ]),
    blueItem('②', [
      { text: L12B_Q1_ITEM_2 },
      { text: L12B_Q1_ITEM_2_LEAD },
      { label: '①', text: L12B_Q1_ITEM_2_OPTION_1 },
      { label: '②', text: L12B_Q1_ITEM_2_OPTION_2 },
      { label: '③', text: L12B_Q1_ITEM_2_OPTION_3 },
    ]),
    { type: 'figure', diagram: fig12bQ1 },
    blueItem('③', [{ text: L12B_Q1_ITEM_3 }]),
    { type: 'figure', diagram: fig12bQ1CaseOne },
    { type: 'figure', diagram: fig12bQ1CaseTwo },
    { type: 'figure', diagram: fig12bQ1CaseThree },
    blueItem('④', [
      { text: L12B_Q1_ITEM_4_LEAD },
      { text: L12B_Q1_ITEM_4 },
      { label: '①', text: L12B_Q1_ITEM_4_OPTION_1 },
      { label: '②', text: L12B_Q1_ITEM_4_OPTION_2 },
      { label: '③', text: L12B_Q1_ITEM_4_OPTION_3 },
    ]),
    { type: 'figure', diagram: fig12bQ1Thales },
    blueItem('⑤', [
      { text: L12B_Q1_ITEM_5_LEAD },
      { text: L12B_Q1_ITEM_5 },
      { label: '①', text: L12B_Q1_ITEM_5_OPTION_1 },
      { label: '②', text: L12B_Q1_ITEM_5_OPTION_2 },
      { label: '③', text: L12B_Q1_ITEM_5_OPTION_3 },
    ]),
  ],
};

/* -------------------------------------------------------------------------- */
/*  Question 2 (images 4–5: blue sub-items ①–④ + 4 blue printed lines)          */
/* -------------------------------------------------------------------------- */

const step2: LessonStep = {
  id: 'l12-step-02-true-or-false',
  origin: 'source',
  kicker: 'تمارين الوحدة الثانية — السؤال 2',
  title: 'السؤال 2',
  source: batch1Source(
    2,
    'الأسطر الزرقاء الأربعة مطبوعة في الكتاب ضمن نصّ التمرين. والرسم المطبوع للبند ② يضع علامات التساوي على $[AB]$ وحدها.',
  ),
  blocks: [
    { type: 'paragraph', text: L12B_Q2_STEM },
    blueItem('①', [
      { text: L12B_Q2_ITEM_1 },
      { text: L12B_Q2_ANSWER_1 },
    ]),
    { type: 'figure', diagram: fig12bQ2Circles },
    blueItem('②', [
      { text: L12B_Q2_ITEM_2 },
      { text: L12B_Q2_ANSWER_2 },
    ]),
    { type: 'figure', diagram: fig12bQ2Triangle },
    blueItem('③', [
      { text: L12B_Q2_ITEM_3 },
      { text: L12B_Q2_ANSWER_3 },
    ]),
    blueItem('④', [
      { text: L12B_Q2_ITEM_4 },
      { text: L12B_Q2_ANSWER_4 },
    ]),
    { type: 'figure', diagram: fig12bQ2Quadrilateral },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Questions 3 to 8                                                            */
/* -------------------------------------------------------------------------- */

const step3: LessonStep = {
  id: 'l12-step-03-rectangle-and-midpoint',
  origin: 'source',
  kicker: 'تمارين الوحدة الثانية — السؤال 3',
  title: 'السؤال 3',
  source: batch1Source(3),
  blocks: [
    ...printedCard(L12B_Q3_STEM, [
      { label: '1.', text: L12B_Q3_ITEM_1 },
      { label: '2.', text: L12B_Q3_ITEM_2 },
    ]),
    { type: 'figure', diagram: fig12bQ3 },
  ],
};

const step4: LessonStep = {
  id: 'l12-step-04-midline-of-a-triangle',
  origin: 'source',
  kicker: 'تمارين الوحدة الثانية — السؤال 4',
  title: 'السؤال 4',
  source: batch1Source(4),
  blocks: [
    ...printedCard(L12B_Q4_STEM, [
      { label: '1.', text: L12B_Q4_ITEM_1 },
      { label: '2.', text: L12B_Q4_ITEM_2 },
    ]),
    { type: 'figure', diagram: fig12bQ4 },
  ],
};

const step5: LessonStep = {
  id: 'l12-step-05-medial-triangle',
  origin: 'source',
  kicker: 'تمارين الوحدة الثانية — السؤال 5',
  title: 'السؤال 5',
  source: batch1Source(
    5,
    'البند 1 مطبوع «في في» — تكرار الكلمة في الكتاب، أُعيد كما هو.',
  ),
  blocks: [
    ...printedCard(L12B_Q5_STEM, [
      { label: '1.', text: L12B_Q5_ITEM_1 },
      { label: '2.', text: L12B_Q5_ITEM_2 },
      { label: '3.', text: L12B_Q5_ITEM_3 },
    ]),
    { type: 'figure', diagram: fig12bQ5 },
  ],
};

const step6: LessonStep = {
  id: 'l12-step-06-parallelogram-and-symmetry',
  origin: 'source',
  kicker: 'تمارين الوحدة الثانية — السؤال 6',
  title: 'السؤال 6',
  source: batch1Source(6),
  blocks: [
    ...printedCard(L12B_Q6_STEM, [
      { label: '1.', text: L12B_Q6_ITEM_1 },
      { label: '2.', text: L12B_Q6_ITEM_2 },
      { label: '3.', text: L12B_Q6_ITEM_3 },
    ]),
    { type: 'figure', diagram: fig12bQ6 },
  ],
};

const step7: LessonStep = {
  id: 'l12-step-07-two-concentric-circles',
  origin: 'source',
  kicker: 'تمارين الوحدة الثانية — السؤال 7',
  title: 'السؤال 7',
  source: batch1Source(
    7,
    'يطبع الكتاب «المستقيمتان $(OA)$ و $(OB)$ تقطعان»، ولا يطبع شكلاً لهذا السؤال.',
  ),
  blocks: [
    ...printedCard(L12B_Q7_STEM, [
      { label: '1.', text: L12B_Q7_ITEM_1 },
      { label: '2.', text: L12B_Q7_ITEM_2 },
      { label: '3.', text: L12B_Q7_ITEM_3 },
    ]),
  ],
};

const step8: LessonStep = {
  id: 'l12-step-08-translation-and-symmetry',
  origin: 'source',
  kicker: 'تمارين الوحدة الثانية — السؤال 8',
  title: 'السؤال 8',
  source: batch1Source(8, 'لا يطبع الكتاب أي شكل لهذا السؤال: الشكل يطلبه التلميذ.'),
  blocks: [
    ...printedCard(L12B_Q8_STEM, [
      { label: '1.', text: L12B_Q8_ITEM_1 },
      { label: '2.', text: L12B_Q8_ITEM_2 },
      { label: '3.', text: L12B_Q8_ITEM_3 },
    ]),
  ],
};

/* -------------------------------------------------------------------------- */
/*  Question 9                                                                  */
/* -------------------------------------------------------------------------- */

const step9: LessonStep = {
  id: 'l12-step-09-midpoints-are-collinear',
  origin: 'source',
  kicker: 'تمارين الوحدة الثانية — السؤال 9',
  title: 'السؤال 9',
  source: batch1Source(9),
  blocks: [
    { type: 'paragraph', text: L12B_Q9_STEM },
    {
      type: 'callout',
      variant: 'hint',
      title: L12B_Q9_REMEMBER_TITLE,
      blocks: [
        { type: 'list', ordered: false, items: [L12B_Q9_REMEMBER_1, L12B_Q9_REMEMBER_2] },
      ],
    },
    { type: 'figure', diagram: fig12bQ9 },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Question 10                                                                 */
/* -------------------------------------------------------------------------- */

const step10: LessonStep = {
  id: 'l12-step-10-two-coloured-figures',
  origin: 'source',
  kicker: 'تمارين الوحدة الثانية — السؤال 10',
  title: 'السؤال 10',
  source: batch1Source(10),
  blocks: [
    { type: 'paragraph', text: L12B_Q10_STEM },
    { type: 'figure', diagram: fig12bQ10CaseOne },
    { type: 'figure', diagram: fig12bQ10CaseTwo },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Questions 11 and 12                                                         */
/* -------------------------------------------------------------------------- */

const step11: LessonStep = {
  id: 'l12-step-11-two-circles-one-chord',
  origin: 'source',
  kicker: 'تمارين الوحدة الثانية — السؤال 11',
  title: 'السؤال 11',
  source: batch1Source(
    11,
    'النص مطبوع «القطعة $[OI]$ تقطع $C$ في $S$» مع كتابة $C$ مائلة و$C\'$ قائمة؛ أُعيد كما هو ولا شكل مطبوع له.',
  ),
  blocks: [
    ...printedCard(L12B_Q11_STEM, [
      { label: '1.', text: L12B_Q11_ITEM_1 },
      { label: '2.', text: L12B_Q11_ITEM_2 },
      { label: '3.', text: L12B_Q11_ITEM_3 },
    ]),
  ],
};

const step12: LessonStep = {
  id: 'l12-step-12-a-ray-and-two-points',
  origin: 'source',
  kicker: 'تمارين الوحدة الثانية — السؤال 12',
  title: 'السؤال 12',
  source: batch1Source(12, 'لا يطبع الكتاب أي شكل لهذا السؤال: الشكل يطلبه التلميذ.'),
  blocks: [
    ...printedCard(L12B_Q12_STEM, [
      { label: '1.', text: L12B_Q12_ITEM_1 },
      { label: '2.', text: L12B_Q12_ITEM_2 },
    ]),
  ],
};

/* -------------------------------------------------------------------------- */
/*  Question 13                                                                 */
/* -------------------------------------------------------------------------- */

const step13: LessonStep = {
  id: 'l12-step-13-a-hidden-vertex',
  origin: 'source',
  kicker: 'تمارين الوحدة الثانية — السؤال 13',
  title: 'السؤال 13',
  source: batch1Source(13),
  blocks: [
    ...printedCard(L12B_Q13_STEM, []),
    { type: 'figure', diagram: fig12bQ13 },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Question 14                                                                 */
/* -------------------------------------------------------------------------- */

const step14: LessonStep = {
  id: 'l12-step-14-two-parallel-lines',
  origin: 'source',
  kicker: 'تمارين الوحدة الثانية — السؤال 14',
  title: 'السؤال 14',
  source: batch1Source(14),
  blocks: [
    ...printedCard(L12B_Q14_STEM, [
      { label: '1.', text: L12B_Q14_ITEM_1 },
      { label: '2.', text: L12B_Q14_ITEM_2 },
    ]),
    { type: 'figure', diagram: fig12bQ14 },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Question 15                                                                 */
/* -------------------------------------------------------------------------- */

const step15: LessonStep = {
  id: 'l12-step-15-a-table-to-complete',
  origin: 'source',
  kicker: 'تمارين الوحدة الثانية — السؤال 15',
  title: 'السؤال 15',
  source: batch1Source(15),
  blocks: [
    ...printedCard(L12B_Q15_STEM, []),
    {
      type: 'table',
      columns: [...L12B_Q15_TABLE_COLUMNS],
      rows: L12B_Q15_TABLE_ROWS.map((row) => [...row]),
    },
    { type: 'figure', diagram: fig12bQ15 },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Questions 16 and 17                                                         */
/* -------------------------------------------------------------------------- */

const step16: LessonStep = {
  id: 'l12-step-16-a-parallel-segment',
  origin: 'source',
  kicker: 'تمارين الوحدة الثانية — السؤال 16',
  title: 'السؤال 16',
  source: batch1Source(16),
  blocks: [
    ...printedCard(L12B_Q16_STEM, [
      { label: '1.', text: L12B_Q16_ITEM_1 },
      { label: '2.', text: L12B_Q16_ITEM_2 },
    ]),
    { type: 'figure', diagram: fig12bQ16 },
  ],
};

const step17: LessonStep = {
  id: 'l12-step-17-a-parallel-segment-again',
  origin: 'source',
  kicker: 'تمارين الوحدة الثانية — السؤال 17',
  title: 'السؤال 17',
  source: batch1Source(17),
  blocks: [
    ...printedCard(L12B_Q17_STEM, []),
    { type: 'figure', diagram: fig12bQ17 },
  ],
};

/** The student sequence of Batch 1, in printed order. */
export const lesson12Batch1Steps: LessonStep[] = [
  step1,
  step2,
  step3,
  step4,
  step5,
  step6,
  step7,
  step8,
  step9,
  step10,
  step11,
  step12,
  step13,
  step14,
  step15,
  step16,
  step17,
];
