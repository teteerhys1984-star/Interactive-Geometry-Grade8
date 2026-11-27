import type { LessonStepInput } from '@/content/schema';
import {
  fig15CheckGiven,
  fig15Definition,
  fig15ExampleOneGiven,
  fig15ExampleOneSolution,
  fig15ExampleTwoGiven,
  fig15ExampleTwoSolution,
  fig15MeaningGiven,
  fig15Physics,
  fig15PracticeCaseOneGiven,
  fig15PracticeCaseTwoGiven,
  fig15ProofGiven,
  fig15Properties,
  fig15TestGiven,
} from './lesson-15-figures';
import { lesson15Notebook } from './lesson-15-notebook';
import {
  L15_ACTIVITY_SUBTITLE,
  L15_CHECK,
  L15_DEFINITION,
  L15_DEFINITION_HEADING,
  L15_DEFINITION_HINT,
  L15_EXAMPLE_1,
  L15_EXAMPLE_1_HINT,
  L15_EXAMPLE_1_SOLUTION,
  L15_EXAMPLE_2,
  L15_EXAMPLE_2_HINT,
  L15_EXAMPLE_2_SOLUTION,
  L15_MEANING,
  L15_PHYSICS,
  L15_PRACTICE_1_CASE1,
  L15_PRACTICE_1_CASE2,
  L15_PRACTICE_1_INTRO,
  L15_PROPERTIES,
  L15_PROPERTIES_HEADING,
  L15_PROOF_1,
  L15_PROOF_2,
  L15_PROOF_3,
  L15_PROOF_4,
  L15_PROOF_5,
  L15_PROOF_6,
  L15_PROOF_7,
  L15_PROOF_INTRO,
  L15_SKILL_BODY,
  L15_SKILL_HEADING,
  L15_SOURCE_59,
  L15_SOURCE_60,
  L15_SOURCE_61,
  L15_SPECIAL,
  L15_SPECIAL_HEADING,
  L15_TEST_1,
  L15_TEST_2,
  L15_TEST_3,
} from './lesson-15-questions';
import {
  step15ConstructionGuide,
  step15Lab,
  step15Orientation,
  step15Recap,
} from './lesson-15-teaching';

/**
 * ============================================================================
 *  UNIT 3, LESSON 3 — STUDENT SEQUENCE (pages 59–61)
 * ============================================================================
 *  Eleven `origin: 'source'` steps in printed order (59×4 → 60×4 → 61×3); four
 *  authored teaching steps; the notebook closes the lesson. The two examples
 *  print their solutions (reproduced verbatim); every other answer is in the
 *  Teacher Area as platform-derived.
 * ============================================================================
 */

const step01Meaning: LessonStepInput = {
  id: 'l15-step-01-meaning',
  kicker: 'نشاط — معنى الكلمات',
  title: 'المتوسط من A إلى منتصف الضلع المقابل',
  origin: 'source',
  source: L15_SOURCE_59,
  blocks: [
    { type: 'paragraph', text: L15_ACTIVITY_SUBTITLE },
    { type: 'paragraph', text: L15_MEANING },
    fig15MeaningGiven,
  ],
};

const step02Test: LessonStepInput = {
  id: 'l15-step-02-test',
  kicker: 'اختبار',
  title: 'متوسطات المثلثين: ماذا تلاحظ؟',
  origin: 'source',
  source: L15_SOURCE_59,
  blocks: [
    {
      type: 'questionGroup',
      items: [
        { label: '①', text: L15_TEST_1 },
        { label: '②', text: L15_TEST_2 },
        { label: '③', text: L15_TEST_3 },
      ],
    },
    fig15TestGiven,
  ],
};

const step03Proof: LessonStepInput = {
  id: 'l15-step-03-proof',
  kicker: 'إثبات',
  title: 'برهان تلاقي المتوسطات والنسبة 2/3',
  origin: 'source',
  source: L15_SOURCE_59,
  blocks: [
    { type: 'paragraph', text: L15_PROOF_INTRO },
    fig15ProofGiven,
    {
      type: 'questionGroup',
      items: [
        { label: '①', text: L15_PROOF_1 },
        { label: '②', text: L15_PROOF_2 },
        { label: '③', text: L15_PROOF_3 },
        { label: '④', text: L15_PROOF_4 },
        { label: '⑤', text: L15_PROOF_5 },
        { label: '⑥', text: L15_PROOF_6 },
        { label: '⑦', text: L15_PROOF_7 },
      ],
    },
  ],
};

const step04Physics: LessonStepInput = {
  id: 'l15-step-04-physics',
  kicker: 'معنى الكلمات — الفيزياء',
  title: 'مركز الثقل والشاقول',
  origin: 'source',
  source: L15_SOURCE_59,
  blocks: [
    {
      type: 'callout',
      variant: 'note',
      title: 'في الفيزياء',
      blocks: [{ type: 'paragraph', text: L15_PHYSICS }, fig15Physics],
    },
  ],
};

const step05Learn: LessonStepInput = {
  id: 'l15-step-05-learn',
  kicker: 'تعلّم',
  title: L15_DEFINITION_HEADING,
  origin: 'source',
  source: L15_SOURCE_60,
  blocks: [
    {
      type: 'callout',
      variant: 'definition',
      title: L15_DEFINITION_HEADING,
      blocks: [{ type: 'paragraph', text: L15_DEFINITION }, fig15Definition],
    },
    {
      type: 'callout',
      variant: 'hint',
      title: '💡',
      blocks: [{ type: 'paragraph', text: L15_DEFINITION_HINT }],
    },
  ],
};

const step06Special: LessonStepInput = {
  id: 'l15-step-06-special',
  kicker: 'خاصة وتعريف + خواص',
  title: 'المتوسطات تتلاقى في مركز الثقل بنسبة 2/3',
  origin: 'source',
  source: L15_SOURCE_60,
  blocks: [
    {
      type: 'callout',
      variant: 'theorem',
      title: L15_SPECIAL_HEADING,
      blocks: [{ type: 'paragraph', text: L15_SPECIAL }],
    },
    {
      type: 'callout',
      variant: 'theorem',
      title: L15_PROPERTIES_HEADING,
      blocks: [{ type: 'paragraph', text: L15_PROPERTIES }, fig15Properties],
    },
  ],
};

const step07Skill: LessonStepInput = {
  id: 'l15-step-07-skill',
  kicker: 'اكتساب معارف',
  title: L15_SKILL_HEADING,
  origin: 'source',
  source: L15_SOURCE_60,
  blocks: [{ type: 'paragraph', text: L15_SKILL_BODY }],
};

const step08Example1: LessonStepInput = {
  id: 'l15-step-08-example-1',
  kicker: 'مثال',
  title: 'AG = 2GM ⇒ G مركز الثقل',
  origin: 'source',
  source: L15_SOURCE_60,
  blocks: [
    { type: 'paragraph', text: L15_EXAMPLE_1 },
    fig15ExampleOneGiven,
    {
      type: 'callout',
      variant: 'hint',
      title: '💡',
      blocks: [{ type: 'paragraph', text: L15_EXAMPLE_1_HINT }],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'الحل (مطبوع)',
      blocks: [{ type: 'paragraph', text: L15_EXAMPLE_1_SOLUTION }, fig15ExampleOneSolution],
    },
  ],
};

const step09Example2: LessonStepInput = {
  id: 'l15-step-09-example-2',
  kicker: 'مثال',
  title: 'مركز ثقل ABC داخل متوازي الأضلاع',
  origin: 'source',
  source: L15_SOURCE_61,
  blocks: [
    { type: 'paragraph', text: L15_EXAMPLE_2 },
    fig15ExampleTwoGiven,
    {
      type: 'callout',
      variant: 'hint',
      title: '💡',
      blocks: [{ type: 'paragraph', text: L15_EXAMPLE_2_HINT }],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'الحل (مطبوع)',
      blocks: [{ type: 'paragraph', text: L15_EXAMPLE_2_SOLUTION }, fig15ExampleTwoSolution],
    },
  ],
};

const step10Check: LessonStepInput = {
  id: 'l15-step-10-check',
  kicker: 'تحقّق من فهمك',
  title: 'ارسم مركز ثقل مثلث بمعطيات محدّدة',
  origin: 'source',
  source: L15_SOURCE_61,
  blocks: [{ type: 'paragraph', text: L15_CHECK }, fig15CheckGiven],
};

const step11Practice: LessonStepInput = {
  id: 'l15-step-11-practice',
  kicker: 'تدرّب ①',
  title: 'حالتان لتعليل أنّ G مركز الثقل',
  origin: 'source',
  source: L15_SOURCE_61,
  blocks: [
    { type: 'paragraph', text: L15_PRACTICE_1_INTRO },
    { type: 'questionGroup', title: '①', items: [{ label: '①', text: L15_PRACTICE_1_CASE1 }] },
    fig15PracticeCaseOneGiven,
    { type: 'questionGroup', title: '②', items: [{ label: '②', text: L15_PRACTICE_1_CASE2 }] },
    fig15PracticeCaseTwoGiven,
  ],
};

export const lesson15Steps: LessonStepInput[] = [
  step15Orientation,
  step01Meaning,
  step15Lab,
  step02Test,
  step03Proof,
  step04Physics,
  step05Learn,
  step06Special,
  step07Skill,
  step15ConstructionGuide,
  step08Example1,
  step09Example2,
  step10Check,
  step11Practice,
  step15Recap,
  lesson15Notebook,
];
