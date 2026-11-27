import type { LessonStepInput } from '@/content/schema';
import {
  fig16CheckGiven,
  fig16Definition,
  fig16PracticeOneGiven,
  fig16PracticeTwoGiven,
  fig16ProofGiven,
  fig16Properties,
  fig16TestGiven,
} from './lesson-16-figures';
import { lesson16Notebook } from './lesson-16-notebook';
import {
  L16_ACTIVITY_SUBTITLE,
  L16_CHECK,
  L16_DEFINITION,
  L16_DEFINITION_HEADING,
  L16_HINT_CIRCUM,
  L16_HINT_IN,
  L16_PRACTICE_1,
  L16_PRACTICE_2_1,
  L16_PRACTICE_2_2,
  L16_PRACTICE_2_3,
  L16_PRACTICE_2_INTRO,
  L16_PROOF_1,
  L16_PROOF_2,
  L16_PROOF_3,
  L16_PROOF_4,
  L16_PROOF_5,
  L16_PROOF_6,
  L16_PROOF_7,
  L16_PROOF_HINT,
  L16_PROOF_INTRO,
  L16_SOURCE_62,
  L16_SOURCE_63,
  L16_SPECIAL,
  L16_SPECIAL_HEADING,
  L16_TEST_1,
  L16_TEST_2,
} from './lesson-16-questions';
import {
  step16ConstructionGuide,
  step16Lab,
  step16Orientation,
  step16Recap,
} from './lesson-16-teaching';

/**
 * ============================================================================
 *  UNIT 3, LESSON 4 — STUDENT SEQUENCE (pages 62–63)
 * ============================================================================
 *  Six `origin: 'source'` steps in printed order (62×2 → 63×4); four authored
 *  teaching steps; the notebook closes the lesson. No printed solution exists
 *  for any prompt; every answer is in the Teacher Area as platform-derived.
 * ============================================================================
 */

const step01Test: LessonStepInput = {
  id: 'l16-step-01-test',
  kicker: 'نشاط — اختبار',
  title: 'منصفات زوايا المثلثين: ماذا تلاحظ؟',
  origin: 'source',
  source: L16_SOURCE_62,
  blocks: [
    { type: 'paragraph', text: L16_ACTIVITY_SUBTITLE },
    {
      type: 'questionGroup',
      items: [
        { label: '①', text: L16_TEST_1 },
        { label: '②', text: L16_TEST_2 },
      ],
    },
    fig16TestGiven,
  ],
};

const step02Proof: LessonStepInput = {
  id: 'l16-step-02-proof',
  kicker: 'إثبات',
  title: 'برهان تلاقي المنصفات في I',
  origin: 'source',
  source: L16_SOURCE_62,
  blocks: [
    { type: 'paragraph', text: L16_PROOF_INTRO },
    fig16ProofGiven,
    {
      type: 'questionGroup',
      items: [
        { label: '①', text: L16_PROOF_1 },
        { label: '②', text: L16_PROOF_2 },
        { label: '③', text: L16_PROOF_3 },
        { label: '④', text: L16_PROOF_4 },
        { label: '⑤', text: L16_PROOF_5 },
        { label: '⑥', text: L16_PROOF_6 },
        { label: '⑦', text: L16_PROOF_7 },
      ],
    },
    {
      type: 'callout',
      variant: 'hint',
      title: '💡',
      blocks: [{ type: 'paragraph', text: L16_PROOF_HINT }],
    },
  ],
};

const step03Learn: LessonStepInput = {
  id: 'l16-step-03-learn',
  kicker: 'تعلّم',
  title: L16_DEFINITION_HEADING,
  origin: 'source',
  source: L16_SOURCE_63,
  blocks: [
    {
      type: 'callout',
      variant: 'definition',
      title: L16_DEFINITION_HEADING,
      blocks: [{ type: 'paragraph', text: L16_DEFINITION }, fig16Definition],
    },
  ],
};

const step04Special: LessonStepInput = {
  id: 'l16-step-04-special',
  kicker: 'خاصة وتعريف',
  title: 'المنصفات تتلاقى في مركز الدائرة الداخلية',
  origin: 'source',
  source: L16_SOURCE_63,
  blocks: [
    {
      type: 'callout',
      variant: 'theorem',
      title: L16_SPECIAL_HEADING,
      blocks: [{ type: 'paragraph', text: L16_SPECIAL }, fig16Properties],
    },
    {
      type: 'callout',
      variant: 'hint',
      title: '💡 (مراجعة: الدائرة المارّة بالرؤوس)',
      blocks: [{ type: 'paragraph', text: L16_HINT_CIRCUM }],
    },
    {
      type: 'callout',
      variant: 'hint',
      title: '💡 (الدائرة الماسّة داخلاً)',
      blocks: [{ type: 'paragraph', text: L16_HINT_IN }],
    },
  ],
};

const step05Check: LessonStepInput = {
  id: 'l16-step-05-check',
  kicker: 'تحقّق من فهمك',
  title: 'ارسم منصفات مثلث بمعطيات محدّدة',
  origin: 'source',
  source: L16_SOURCE_63,
  blocks: [{ type: 'paragraph', text: L16_CHECK }, fig16CheckGiven],
};

const step06Practice: LessonStepInput = {
  id: 'l16-step-06-practice',
  kicker: 'تدرّب',
  title: 'تمرينان حسابيان على المنصفات',
  origin: 'source',
  source: L16_SOURCE_63,
  blocks: [
    { type: 'questionGroup', title: '①', items: [{ label: '①', text: L16_PRACTICE_1 }] },
    fig16PracticeOneGiven,
    {
      type: 'questionGroup',
      title: '②',
      items: [
        { label: '②', text: L16_PRACTICE_2_INTRO },
        { label: '② ①', text: L16_PRACTICE_2_1 },
        { label: '② ②', text: L16_PRACTICE_2_2 },
        { label: '② ③', text: L16_PRACTICE_2_3 },
      ],
    },
    fig16PracticeTwoGiven,
  ],
};

export const lesson16Steps: LessonStepInput[] = [
  step16Orientation,
  step01Test,
  step16Lab,
  step02Proof,
  step03Learn,
  step04Special,
  step16ConstructionGuide,
  step05Check,
  step06Practice,
  step16Recap,
  lesson16Notebook,
];
