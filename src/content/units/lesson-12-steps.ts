import type { ContentBlock, LessonStep } from '@/content/schema';
import {
  fig12Q18CaseOne,
  fig12Q18CaseTwo,
  fig12Q19,
  fig12Q20,
  fig12Q21,
  fig12Q24,
  fig12Q26,
  fig12Q27,
  fig12Q28,
  fig12Q29,
  fig12Q30,
  fig12Q31,
  fig12Q32,
  fig12Q33CaseOne,
  fig12Q33CaseTwo,
} from './lesson-12-figures';
import {
  L12_Q18_CASE_1,
  L12_Q18_CASE_2,
  L12_Q18_STEM,
  L12_Q19_DRAFT_HEAD,
  L12_Q19_GIVEN,
  L12_Q19_GOAL,
  L12_Q19_INTRO,
  L12_Q19_REMARK_1,
  L12_Q19_REMARK_2,
  L12_Q19_STUDENT_1,
  L12_Q19_STUDENT_2,
  L12_Q20_ITEM_1,
  L12_Q20_ITEM_2,
  L12_Q20_ITEM_3,
  L12_Q20_ITEM_4,
  L12_Q20_STEM,
  L12_Q20_SUB_1,
  L12_Q20_SUB_2,
  L12_Q20_SUB_3,
  L12_Q21_STEM,
  L12_Q22_ADVICE_1,
  L12_Q22_ADVICE_2,
  L12_Q22_ADVICE_3,
  L12_Q22_ADVICE_4,
  L12_Q22_ADVICE_HEAD,
  L12_Q22_STEM,
  L12_Q23_ITEM_1,
  L12_Q23_ITEM_2,
  L12_Q23_ITEM_3,
  L12_Q23_ITEM_4,
  L12_Q23_ITEM_5,
  L12_Q23_ITEM_6,
  L12_Q24_ITEM_1,
  L12_Q24_ITEM_2,
  L12_Q24_STEM,
  L12_Q25_ITEM_1,
  L12_Q25_ITEM_2,
  L12_Q25_ITEM_3,
  L12_Q25_STEM,
  L12_Q26_ITEM_1,
  L12_Q26_ITEM_2,
  L12_Q26_STEM,
  L12_Q27_ITEM_1,
  L12_Q27_ITEM_2,
  L12_Q27_ITEM_3,
  L12_Q27_ITEM_4,
  L12_Q28_ITEM_1,
  L12_Q28_ITEM_2,
  L12_Q28_STEM,
  L12_Q29_ITEM_1,
  L12_Q29_STEM,
  L12_Q30_ITEM_1,
  L12_Q30_ITEM_2,
  L12_Q31_ITEM_1,
  L12_Q31_ITEM_2,
  L12_Q31_STEM,
  L12_Q32_ITEM_1,
  L12_Q32_ITEM_2,
  L12_Q32_ITEM_3,
  L12_Q32_STEM,
  L12_Q33_CASE_1,
  L12_Q33_CASE_2,
  L12_Q33_STEM,
  L12_Q34_ITEM_1,
  L12_Q34_ITEM_2,
  L12_Q34_ITEM_3,
  L12_Q34_ITEM_4,
  L12_Q34_ITEM_5,
  L12_Q34_REMEMBER_1,
  L12_Q34_REMEMBER_2,
  L12_Q34_REMEMBER_LEAD,
  L12_Q34_STEM,
  L12_TITLE_Q19,
  L12_TITLE_Q20,
  L12_TITLE_Q21,
  L12_TITLE_Q22,
  L12_TITLE_Q23,
  L12_TITLE_Q24,
  L12_TITLE_Q25,
  L12_TITLE_Q26,
  L12_TITLE_Q27,
  L12_TITLE_Q28,
  L12_TITLE_Q29,
  L12_TITLE_Q30,
  L12_TITLE_Q31,
  L12_TITLE_Q32,
  L12_TITLE_Q34,
  exerciseSource,
} from './lesson-12-questions';

/**
 * ============================================================================
 *  UNIT 2 — «تمارين الوحدة الثانية» · STUDENT SEQUENCE (Q28–Q34)
 * ============================================================================
 *
 *  One `origin: 'source'` step per printed exercise, in printed order. Nothing
 *  else is added to the student view of this set:
 *
 *    • no solution, no answer key, no worked proof, no hint that gives the
 *      answer away — the exercises are open-response questions and the page
 *      prints no answers, so the platform prints none either;
 *    • no assessment: the set carries no question bank of its own;
 *    • no platform commentary inside the exercise cards — every word a
 *      student reads here is a word the book prints, except the step labels.
 *
 *  The printed section title is the step title where the page prints one
 *  (Questions 28–32 and 34). Question 33 prints NO title, so its step carries
 *  the neutral label «السؤال 33» instead of an invented one.
 *
 *  The editorial uncertainty of each exercise lives in the Teacher Area
 *  (`lesson-12-teacher.ts`), never in the student view.
 * ============================================================================
 */

/**
 * The printed card of one exercise: its stem and its printed sub-items.
 *
 * The stem travels as a `paragraph` and the sub-items as a `questionGroup`,
 * because a question-group TITLE is printed as plain text: a stem that
 * carries printed notation (points, segments, parallels, lengths) has to go
 * through the paragraph renderer, which turns every `$…$` run into an
 * isolated <Math> element instead of leaving a raw dollar sign on the page.
 * The printed wording itself is untouched either way.
 */
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

const step18: LessonStep = {
  id: 'l12-step-18-calculating-ej',
  origin: 'source',
  kicker: 'تمارين الوحدة الثانية — السؤال 18',
  title: 'السؤال 18',
  source: exerciseSource(18),
  blocks: [
    ...printedCard(L12_Q18_STEM, [{ label: '①', text: L12_Q18_CASE_1 }]),
    { type: 'figure', diagram: fig12Q18CaseOne },
    ...printedCard(undefined, [{ label: '②', text: L12_Q18_CASE_2 }]),
    { type: 'figure', diagram: fig12Q18CaseTwo },
  ],
};

const step19: LessonStep = {
  id: 'l12-step-19-writing-a-proof',
  origin: 'source',
  kicker: 'تمارين الوحدة الثانية — السؤال 19',
  title: L12_TITLE_Q19,
  source: exerciseSource(
    19,
    'ملاحظتا المصحح الحمراوان والخط الأحمر تحت $(IJ) \\parallel (BC)$ جزء مطبوع من نصّ التمرين يطلب الكتاب من الطالب الأخذ به عند تحرير الإثبات.',
  ),
  blocks: [
    { type: 'paragraph', text: L12_Q19_INTRO },
    { type: 'paragraph', text: L12_Q19_GIVEN },
    { type: 'paragraph', text: L12_Q19_GOAL },
    { type: 'figure', diagram: fig12Q19 },
    {
      type: 'callout',
      variant: 'example',
      title: L12_Q19_DRAFT_HEAD,
      blocks: [
        { type: 'list', ordered: false, items: [L12_Q19_STUDENT_1] },
        { type: 'paragraph', text: L12_Q19_REMARK_1 },
        { type: 'list', ordered: false, items: [L12_Q19_STUDENT_2] },
        { type: 'paragraph', text: L12_Q19_REMARK_2 },
      ],
    },
  ],
};

const step20: LessonStep = {
  id: 'l12-step-20-analysing-a-flowchart',
  origin: 'source',
  kicker: 'تمارين الوحدة الثانية — السؤال 20',
  title: L12_TITLE_Q20,
  source: exerciseSource(
    20,
    'البنود الفرعية ① و ② و ③ مطبوعة تحت المخطط مباشرة لاستكمال البند 4.',
  ),
  blocks: [
    ...printedCard(L12_Q20_STEM, [
      { label: '1.', text: L12_Q20_ITEM_1 },
      { label: '2.', text: L12_Q20_ITEM_2 },
      { label: '3.', text: L12_Q20_ITEM_3 },
      { label: '4.', text: L12_Q20_ITEM_4 },
    ]),
    { type: 'figure', diagram: fig12Q20 },
    ...printedCard(undefined, [
      { label: '①', text: L12_Q20_SUB_1 },
      { label: '②', text: L12_Q20_SUB_2 },
      { label: '③', text: L12_Q20_SUB_3 },
    ]),
  ],
};

const step21: LessonStep = {
  id: 'l12-step-21-quadrilateral',
  origin: 'source',
  kicker: 'تمارين الوحدة الثانية — السؤال 21',
  title: L12_TITLE_Q21,
  source: exerciseSource(21),
  blocks: [...printedCard(L12_Q21_STEM, []), { type: 'figure', diagram: fig12Q21 }],
};

const step22: LessonStep = {
  id: 'l12-step-22-perpendicular-bisector',
  origin: 'source',
  kicker: 'تمارين الوحدة الثانية — السؤال 22',
  title: L12_TITLE_Q22,
  source: exerciseSource(
    22,
    'مطبوع في النص الأصلي «الضلع $AC$» دون قوسين معقوفين.',
  ),
  blocks: [
    ...printedCard(L12_Q22_STEM, []),
    {
      type: 'callout',
      variant: 'hint',
      title: L12_Q22_ADVICE_HEAD,
      blocks: [
        { type: 'list', ordered: false, items: [
          L12_Q22_ADVICE_1,
          L12_Q22_ADVICE_2,
          L12_Q22_ADVICE_3,
          L12_Q22_ADVICE_4,
        ] },
      ],
    },
  ],
};

const step23: LessonStep = {
  id: 'l12-step-23-perpendicular-bisector-of-a-segment',
  origin: 'source',
  kicker: 'تمارين الوحدة الثانية — السؤال 23',
  title: L12_TITLE_Q23,
  source: exerciseSource(23),
  blocks: [
    ...printedCard(undefined, [
      { label: '1.', text: L12_Q23_ITEM_1 },
      { label: '2.', text: L12_Q23_ITEM_2 },
      { label: '3.', text: L12_Q23_ITEM_3 },
      { label: '4.', text: L12_Q23_ITEM_4 },
      { label: '5.', text: L12_Q23_ITEM_5 },
      { label: '6.', text: L12_Q23_ITEM_6 },
    ]),
  ],
};

const step24: LessonStep = {
  id: 'l12-step-24-altitude-and-bisector',
  origin: 'source',
  kicker: 'تمارين الوحدة الثانية — السؤال 24',
  title: L12_TITLE_Q24,
  source: exerciseSource(24),
  blocks: [
    ...printedCard(L12_Q24_STEM, [
      { label: '1.', text: L12_Q24_ITEM_1 },
      { label: '2.', text: L12_Q24_ITEM_2 },
    ]),
    { type: 'figure', diagram: fig12Q24 },
  ],
};

const step25: LessonStep = {
  id: 'l12-step-25-starting-from-a-rhombus',
  origin: 'source',
  kicker: 'تمارين الوحدة الثانية — السؤال 25',
  title: L12_TITLE_Q25,
  source: exerciseSource(25),
  blocks: [
    ...printedCard(L12_Q25_STEM, [
      { label: '1.', text: L12_Q25_ITEM_1 },
      { label: '2.', text: L12_Q25_ITEM_2 },
      { label: '3.', text: L12_Q25_ITEM_3 },
    ]),
  ],
};

const step26: LessonStep = {
  id: 'l12-step-26-perimeter-and-area',
  origin: 'source',
  kicker: 'تمارين الوحدة الثانية — السؤال 26',
  title: L12_TITLE_Q26,
  source: exerciseSource(
    26,
    'الرسم مقياس: الأطوال المطبوعة كلها محقَّقة عليه.',
  ),
  blocks: [
    ...printedCard(L12_Q26_STEM, [
      { label: '1.', text: L12_Q26_ITEM_1 },
      { label: '2.', text: L12_Q26_ITEM_2 },
    ]),
    { type: 'figure', diagram: fig12Q26 },
  ],
};

const step27: LessonStep = {
  id: 'l12-step-27-unknown-lengths',
  origin: 'source',
  kicker: 'تمارين الوحدة الثانية — السؤال 27',
  title: L12_TITLE_Q27,
  source: exerciseSource(
    27,
    'الرسم مقياس: الوحدة المطبوعة الواحدة تساوي نحو أربعة وخمسين بكسل في الصورة.',
  ),
  blocks: [
    ...printedCard(undefined, [
      { label: '1.', text: L12_Q27_ITEM_1 },
      { label: '2.', text: L12_Q27_ITEM_2 },
      { label: '3.', text: L12_Q27_ITEM_3 },
      { label: '4.', text: L12_Q27_ITEM_4 },
    ]),
    { type: 'figure', diagram: fig12Q27 },
  ],
};

const step28: LessonStep = {
  id: 'l12-step-28-from-parallel-to-parallel',
  origin: 'source',
  kicker: 'تمارين الوحدة الثانية — السؤال 28',
  title: L12_TITLE_Q28,
  source: exerciseSource(28),
  blocks: [
    ...printedCard(L12_Q28_STEM, [
      { label: '1.', text: L12_Q28_ITEM_1 },
      { label: '2.', text: L12_Q28_ITEM_2 },
    ]),
    { type: 'figure', diagram: fig12Q28 },
  ],
};

const step29: LessonStep = {
  id: 'l12-step-29-equal-ratios',
  origin: 'source',
  kicker: 'تمارين الوحدة الثانية — السؤال 29',
  title: L12_TITLE_Q29,
  source: exerciseSource(29),
  blocks: [
    ...printedCard(L12_Q29_STEM, [{ text: L12_Q29_ITEM_1 }]),
    { type: 'figure', diagram: fig12Q29 },
  ],
};

const step30: LessonStep = {
  id: 'l12-step-30-dividing-a-segment',
  origin: 'source',
  kicker: 'تمارين الوحدة الثانية — السؤال 30',
  title: L12_TITLE_Q30,
  source: exerciseSource(30),
  blocks: [
    ...printedCard(undefined, [
      { label: '•', text: L12_Q30_ITEM_1 },
      { label: '•', text: L12_Q30_ITEM_2 },
    ]),
    { type: 'figure', diagram: fig12Q30 },
  ],
};

const step31: LessonStep = {
  id: 'l12-step-31-measuring-a-tower',
  origin: 'source',
  kicker: 'تمارين الوحدة الثانية — السؤال 31',
  title: L12_TITLE_Q31,
  source: exerciseSource(31),
  blocks: [
    ...printedCard(L12_Q31_STEM, [
      { label: '1.', text: L12_Q31_ITEM_1 },
      { label: '2.', text: L12_Q31_ITEM_2 },
    ]),
    { type: 'figure', diagram: fig12Q31 },
  ],
};

const step32: LessonStep = {
  id: 'l12-step-32-distance-between-two-towers',
  origin: 'source',
  kicker: 'تمارين الوحدة الثانية — السؤال 32',
  title: L12_TITLE_Q32,
  source: exerciseSource(32),
  blocks: [
    { type: 'figure', diagram: fig12Q32 },
    ...printedCard(L12_Q32_STEM, [
      { label: '1.', text: L12_Q32_ITEM_1 },
      { label: '2.', text: L12_Q32_ITEM_2 },
      { label: '3.', text: L12_Q32_ITEM_3 },
    ]),
  ],
};

const step33: LessonStep = {
  id: 'l12-step-33-three-equal-ratios',
  origin: 'source',
  kicker: 'تمارين الوحدة الثانية — السؤال 33',
  title: 'السؤال 33',
  source: exerciseSource(
    33,
    'النص المطبوع هو المرجع في هذه الحالة: انظر سجل التعارضات في ملاحظات المعلّم.',
  ),
  blocks: [
    ...printedCard(L12_Q33_STEM, [{ label: '①', text: L12_Q33_CASE_1 }]),
    { type: 'figure', diagram: fig12Q33CaseOne },
    ...printedCard(undefined, [{ label: '②', text: L12_Q33_CASE_2 }]),
    { type: 'figure', diagram: fig12Q33CaseTwo },
  ],
};

const step34: LessonStep = {
  id: 'l12-step-34-midpoint-again',
  origin: 'source',
  kicker: 'تمارين الوحدة الثانية — السؤال 34',
  title: L12_TITLE_Q34,
  source: exerciseSource(34),
  blocks: [
    ...printedCard(L12_Q34_STEM, [
      { label: '①', text: L12_Q34_ITEM_1 },
      { label: '②', text: L12_Q34_ITEM_2 },
      { label: '③', text: L12_Q34_ITEM_3 },
      { label: '④', text: L12_Q34_ITEM_4 },
      { label: '⑤', text: L12_Q34_ITEM_5 },
    ]),
    {
      type: 'callout',
      variant: 'hint',
      title: 'تذكّر',
      blocks: [
        { type: 'paragraph', text: L12_Q34_REMEMBER_LEAD },
        { type: 'list', ordered: false, items: [L12_Q34_REMEMBER_1, L12_Q34_REMEMBER_2] },
      ],
    },
  ],
};

export const lesson12Steps: LessonStep[] = [
  step18,
  step19,
  step20,
  step21,
  step22,
  step23,
  step24,
  step25,
  step26,
  step27,
  step28,
  step29,
  step30,
  step31,
  step32,
  step33,
  step34,
];
