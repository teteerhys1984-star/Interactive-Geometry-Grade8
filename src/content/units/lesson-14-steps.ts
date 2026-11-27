import type { LessonStepInput } from '@/content/schema';
import {
  fig14ActivityGiven,
  fig14CheckGiven,
  fig14Definition,
  fig14ExampleOneGiven,
  fig14ExampleOneSolution,
  fig14ExampleTwoGiven,
  fig14ExampleTwoSolution,
  fig14PracticeFourGiven,
  fig14PracticeOneGiven,
  fig14PracticeTwoGiven,
  fig14ProofGiven,
  fig14SpecialCases,
} from './lesson-14-figures';
import { lesson14Notebook } from './lesson-14-notebook';
import {
  L14_ACTIVITY_1,
  L14_ACTIVITY_CASES,
  L14_ACTIVITY_SUBTITLE,
  L14_CHECK,
  L14_DEFINITION,
  L14_DEFINITION_HEADING,
  L14_DEFINITION_HINT,
  L14_EXAMPLE_1,
  L14_EXAMPLE_1_HINT,
  L14_EXAMPLE_1_SOLUTION,
  L14_EXAMPLE_2,
  L14_EXAMPLE_2_HINT,
  L14_EXAMPLE_2_SOLUTION,
  L14_PRACTICE_1,
  L14_PRACTICE_2,
  L14_PRACTICE_4_1,
  L14_PRACTICE_4_2,
  L14_PRACTICE_4_3,
  L14_PRACTICE_4_INTRO,
  L14_PROOF_1,
  L14_PROOF_2,
  L14_PROOF_3,
  L14_PROOF_4,
  L14_PROOF_5,
  L14_PROOF_CONCLUDE,
  L14_PROOF_INTRO,
  L14_SKILL_BODY,
  L14_SKILL_HEADING,
  L14_SOURCE_56,
  L14_SOURCE_57,
  L14_SOURCE_58,
  L14_SPECIAL_CONCURRENT,
  L14_SPECIAL_HEADING,
} from './lesson-14-questions';
import {
  step14ConstructionGuide,
  step14Lab,
  step14Orientation,
  step14Recap,
} from './lesson-14-teaching';

/**
 * ============================================================================
 *  UNIT 3, LESSON 2 — STUDENT SEQUENCE (pages 56–58)
 * ============================================================================
 *
 *  Ten `origin: 'source'` steps follow the printed order (56 → 56 → 56 → 57 →
 *  57 → 57 → 57 → 58 → 58 → 58); four `origin: 'authored'` steps carry the
 *  platform's explanations and the interactive lab. The notebook closes the
 *  lesson and is excluded from the teaching count.
 *
 *  The two examples print their solutions («الحل»); those are reproduced
 *  verbatim. Every other answer lives in the Teacher Area as platform-derived.
 *  Nothing here is added to the printed prompts.
 * ============================================================================
 */

/* Page 56 — نشاط */
const step01Activity: LessonStepInput = {
  id: 'l14-step-01-activity',
  kicker: 'نشاط',
  title: 'ارتفاعات المثلث متلاقية — الحالات الثلاث',
  origin: 'source',
  source: L14_SOURCE_56,
  blocks: [
    { type: 'paragraph', text: L14_ACTIVITY_SUBTITLE },
    { type: 'paragraph', text: L14_ACTIVITY_1 },
    { type: 'list', ordered: true, items: [...L14_ACTIVITY_CASES] },
    fig14ActivityGiven,
  ],
};

/* Page 56 — إثبات */
const step02Proof: LessonStepInput = {
  id: 'l14-step-02-proof',
  kicker: 'إثبات',
  title: 'برهان تلاقي الارتفاعات عبر المثلث MNP',
  origin: 'source',
  source: L14_SOURCE_56,
  blocks: [
    { type: 'paragraph', text: L14_PROOF_INTRO },
    fig14ProofGiven,
    {
      type: 'questionGroup',
      items: [
        { label: '①', text: L14_PROOF_1 },
        { label: '②', text: L14_PROOF_2 },
        { label: '③', text: L14_PROOF_3 },
        { label: '④', text: L14_PROOF_4 },
        { label: '⑤', text: L14_PROOF_5 },
      ],
    },
    { type: 'paragraph', text: L14_PROOF_CONCLUDE },
  ],
};

/* Page 56 — تعلّم */
const step03Learn: LessonStepInput = {
  id: 'l14-step-03-learn',
  kicker: 'تعلّم',
  title: L14_DEFINITION_HEADING,
  origin: 'source',
  source: L14_SOURCE_56,
  blocks: [
    {
      type: 'callout',
      variant: 'definition',
      title: L14_DEFINITION_HEADING,
      blocks: [{ type: 'paragraph', text: L14_DEFINITION }, fig14Definition],
    },
    {
      type: 'callout',
      variant: 'hint',
      title: '💡',
      blocks: [{ type: 'paragraph', text: L14_DEFINITION_HINT }],
    },
  ],
};

/* Page 57 — خاصة وتعريف */
const step04Special: LessonStepInput = {
  id: 'l14-step-04-special',
  kicker: 'خاصة وتعريف',
  title: 'الارتفاعات الثلاثة تتلاقى في H',
  origin: 'source',
  source: L14_SOURCE_57,
  blocks: [
    {
      type: 'callout',
      variant: 'theorem',
      title: L14_SPECIAL_HEADING,
      blocks: [{ type: 'paragraph', text: L14_SPECIAL_CONCURRENT }, fig14SpecialCases],
    },
  ],
};

/* Page 57 — اكتساب معارف */
const step05Skill: LessonStepInput = {
  id: 'l14-step-05-skill',
  kicker: 'اكتساب معارف',
  title: L14_SKILL_HEADING,
  origin: 'source',
  source: L14_SOURCE_57,
  blocks: [{ type: 'paragraph', text: L14_SKILL_BODY }],
};

/* Page 57 — مثال 1 (مع حلّ مطبوع) */
const step06Example1: LessonStepInput = {
  id: 'l14-step-06-example-1',
  kicker: 'مثال 1',
  title: 'مركز تعامد مثلث منفرج في Â',
  origin: 'source',
  source: L14_SOURCE_57,
  blocks: [
    { type: 'paragraph', text: L14_EXAMPLE_1 },
    fig14ExampleOneGiven,
    {
      type: 'callout',
      variant: 'hint',
      title: '💡',
      blocks: [{ type: 'paragraph', text: L14_EXAMPLE_1_HINT }],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'الحل (مطبوع)',
      blocks: [{ type: 'paragraph', text: L14_EXAMPLE_1_SOLUTION }, fig14ExampleOneSolution],
    },
  ],
};

/* Page 57 — مثال 2 */
const step07Example2: LessonStepInput = {
  id: 'l14-step-07-example-2',
  kicker: 'مثال 2',
  title: 'أين مركز تعامد المثلث AHC؟',
  origin: 'source',
  source: L14_SOURCE_57,
  blocks: [
    { type: 'paragraph', text: L14_EXAMPLE_2 },
    fig14ExampleTwoGiven,
    {
      type: 'callout',
      variant: 'hint',
      title: '💡',
      blocks: [{ type: 'paragraph', text: L14_EXAMPLE_2_HINT }],
    },
  ],
};

/* Page 58 — حل المثال 2 (مطبوع) */
const step08Example2Solution: LessonStepInput = {
  id: 'l14-step-08-example-2-solution',
  kicker: 'حل المثال 2',
  title: 'مركز تعامد AHC هو B',
  origin: 'source',
  source: L14_SOURCE_58,
  blocks: [
    {
      type: 'callout',
      variant: 'example',
      title: 'الحل (مطبوع)',
      blocks: [{ type: 'paragraph', text: L14_EXAMPLE_2_SOLUTION }, fig14ExampleTwoSolution],
    },
  ],
};

/* Page 58 — تحقّق من فهمك */
const step09Check: LessonStepInput = {
  id: 'l14-step-09-check',
  kicker: 'تحقّق من فهمك',
  title: 'مثلث منفرج في B: عيّن مركز تعامده',
  origin: 'source',
  source: L14_SOURCE_58,
  blocks: [{ type: 'paragraph', text: L14_CHECK }, fig14CheckGiven],
};

/* Page 58 — تدرّب (①، ②، ④) */
const step10Practice: LessonStepInput = {
  id: 'l14-step-10-practice',
  kicker: 'تدرّب',
  title: 'ثلاثة تمارين على مركز التعامد',
  origin: 'source',
  source: L14_SOURCE_58,
  blocks: [
    { type: 'questionGroup', title: '①', items: [{ label: '①', text: L14_PRACTICE_1 }] },
    fig14PracticeOneGiven,
    { type: 'questionGroup', title: '②', items: [{ label: '②', text: L14_PRACTICE_2 }] },
    fig14PracticeTwoGiven,
    {
      type: 'questionGroup',
      title: '④',
      items: [
        { label: '④', text: L14_PRACTICE_4_INTRO },
        { label: '④ ①', text: L14_PRACTICE_4_1 },
        { label: '④ ②', text: L14_PRACTICE_4_2 },
        { label: '④ ③', text: L14_PRACTICE_4_3 },
      ],
    },
    fig14PracticeFourGiven,
    {
      type: 'teaching',
      variant: 'tip',
      title: 'ملاحظة تحريرية (إعداد المنصّة)',
      collapsible: true,
      revealLabel: 'لماذا لا يوجد تمرين ③؟',
      blocks: [
        {
          type: 'paragraph',
          text: 'ترقيم «تدرّب» في الصفحة ٥٨ مطبوع ① ثم ② ثم ④، ولا يوجد ③. أبقينا الترقيم كما طُبع دون إضافة تمرين من عندنا.',
        },
      ],
    },
  ],
};

export const lesson14Steps: LessonStepInput[] = [
  step14Orientation,
  step01Activity,
  step14Lab,
  step02Proof,
  step03Learn,
  step04Special,
  step05Skill,
  step14ConstructionGuide,
  step06Example1,
  step07Example2,
  step08Example2Solution,
  step09Check,
  step10Practice,
  step14Recap,

  /* ───────────────────── 📒 دفتر الطالب — محطة التدوين ──────────────────── */
  lesson14Notebook,
];
