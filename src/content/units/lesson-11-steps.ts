import type { LessonStep } from '@/content/schema';
import {
  fig11ActivityPanels,
  fig11CheckCases,
  fig11ExampleGiven,
  fig11ExampleSolved,
  fig11ExtensionCases,
  fig11PracticeOneCases,
  fig11PracticeTwoCases,
  fig11TheoremLine,
} from './lesson-11-figures';
import {
  L11_ACTIVITY_GOAL,
  L11_ACTIVITY_SETUP,
  L11_ACTIVITY_SETUP_NOTE,
  L11_ACTIVITY_STEP1_GIVEN,
  L11_ACTIVITY_STEP1_TITLE,
  L11_ACTIVITY_STEP2_CONSTRUCT_J,
  L11_ACTIVITY_STEP2_CONSTRUCT_P,
  L11_ACTIVITY_STEP3_CONSTRUCT_R,
  L11_ACTIVITY_STEP3_CONSTRUCT_S,
  L11_ACTIVITY_SUBTITLE,
  L11_CHECK_CASE_1,
  L11_CHECK_CASE_2,
  L11_CHECK_INTRO,
  L11_CORRESPONDENCE_AB,
  L11_CORRESPONDENCE_AC,
  L11_CORRESPONDENCE_PARALLEL,
  L11_EXAMPLE,
  L11_EXAMPLE_PROMPT,
  L11_NOTE_EXTENSION,
  L11_NOTE_WRITING,
  L11_PRACTICE_1,
  L11_PRACTICE_2,
  L11_PRACTICE_2_READING,
  L11_Q_AN_RATIO,
  L11_Q_BSNM,
  L11_Q_CS,
  L11_Q_J,
  L11_Q_N,
  L11_Q_P,
  L11_SOLUTION_AF,
  L11_SOLUTION_EF,
  L11_SOLUTION_INTRO,
  L11_SOLUTION_RATIOS,
  L11_SOLUTION_SUBST,
  L11_SOURCE_39,
  L11_SOURCE_40,
  L11_SOURCE_41,
  L11_THEOREM_CORRECTION,
  L11_THEOREM_ERRATUM_TOKEN,
  L11_THEOREM_HEADING,
  L11_THEOREM_PRINTED,
  L11_WRITE_RULE_1,
  L11_WRITE_RULE_2,
} from './lesson-11-questions';
import {
  step11ComputationStrategy,
  step11Lab,
  step11Orientation,
  step11ProofMap,
  step11Recap,
  step11TheoremGuide,
} from './lesson-11-teaching';

/**
 * ============================================================================
 *  UNIT 2, LESSON 4 — STUDENT SEQUENCE (pages 39–41)
 * ============================================================================
 *
 *  Eight `origin: 'source'` steps reproduce the printed order page by page
 *  (39 → 39 → 39 → 40 → 40 → 41 → 41 → 41); six `origin: 'authored'` steps
 *  carry the platform's explanation and the interactive lab. The two are
 *  visually distinct everywhere they are rendered.
 *
 *  Nothing here is added to the printed prompts: every `questionGroup` item is
 *  a constant from `lesson-11-questions.ts`, that is, a verbatim transcription.
 * ============================================================================
 */

/* -------------------------------------------------------------------------- */
/*  Source — page 39                                                          */
/* -------------------------------------------------------------------------- */

const step01Activity: LessonStep = {
  id: 'l11-step-01-activity',
  kicker: 'نشاط',
  title: 'إثبات الخاصّة السابقة في حالة خاصّة',
  origin: 'source',
  source: L11_SOURCE_39,
  blocks: [
    { type: 'paragraph', text: L11_ACTIVITY_SUBTITLE },
    { type: 'paragraph', text: L11_ACTIVITY_SETUP },
    fig11ActivityPanels,
    {
      type: 'callout',
      variant: 'activity',
      title: 'هدف النشاط',
      blocks: [{ type: 'paragraph', text: L11_ACTIVITY_GOAL }],
    },
    {
      type: 'paragraph',
      text: `${L11_ACTIVITY_STEP1_TITLE}: ${L11_ACTIVITY_STEP1_GIVEN}.`,
    },
    {
      type: 'teaching',
      variant: 'why',
      title: 'قراءة المنصّة لمعطيات النص (توضيح من إعداد المنصّة)',
      collapsible: true,
      revealLabel: 'لماذا لم يُذكر الشرط كاملاً في الجملة المطبوعة؟',
      blocks: [{ type: 'paragraph', text: L11_ACTIVITY_SETUP_NOTE }],
    },
  ],
};

const step02ActivityPartTwo: LessonStep = {
  id: 'l11-step-02-activity-part-two',
  kicker: 'نشاط — الجزء 2',
  title: 'الجزء 2: إنشاء النقطتين المساعدتين وإثبات النسبة الثانية',
  origin: 'source',
  source: L11_SOURCE_39,
  blocks: [
    { type: 'paragraph', text: L11_ACTIVITY_STEP2_CONSTRUCT_J },
    {
      type: 'questionGroup',
      items: [{ label: '①', text: L11_Q_J }],
    },
    { type: 'paragraph', text: L11_ACTIVITY_STEP2_CONSTRUCT_P },
    {
      type: 'questionGroup',
      items: [
        { label: '②', text: L11_Q_P },
        { label: '②', text: L11_Q_N },
      ],
    },
    {
      type: 'questionGroup',
      title: 'النتيجة المطلوبة من هذا الجزء',
      items: [{ label: '•', text: L11_Q_AN_RATIO }],
    },
  ],
};

const step03ActivityPartThree: LessonStep = {
  id: 'l11-step-03-activity-part-three',
  kicker: 'نشاط — الجزء 3',
  title: 'الجزء 3: إنشاء مستقيمين موازيين وإثبات النسبة الثالثة',
  origin: 'source',
  source: L11_SOURCE_39,
  blocks: [
    { type: 'paragraph', text: L11_ACTIVITY_STEP3_CONSTRUCT_R },
    { type: 'paragraph', text: L11_ACTIVITY_STEP3_CONSTRUCT_S },
    {
      type: 'questionGroup',
      items: [
        { label: '①', text: L11_Q_CS },
        { label: '②', text: L11_Q_BSNM },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Source — page 40                                                          */
/* -------------------------------------------------------------------------- */

const step04Theorem: LessonStep = {
  id: 'l11-step-04-theorem',
  kicker: 'تعلّم',
  title: L11_THEOREM_HEADING,
  origin: 'source',
  source: {
    ...L11_SOURCE_40,
    note: `تطبع النسخة المصوّرة (ص 40) في صندوق المبرهنة العبارة ${L11_THEOREM_ERRATUM_TOKEN}، وهي مستحيلة لأنّ $M \\in [AB]$؛ والقراءة المعتمدة في كل الأشكال والحسابات هي ${L11_THEOREM_CORRECTION}، وهي الموافقة لفرضية النص نفسه ولنشاط ص 39 وللمثال المحلول ص 40–41 (يُوثّق ذلك صراحةً في تنبيه مرافق، ولا يُصحَّح النص المطبوع صامتاً).`,
  },
  blocks: [
    {
      type: 'callout',
      variant: 'theorem',
      title: L11_THEOREM_HEADING,
      blocks: [{ type: 'paragraph', text: L11_THEOREM_PRINTED }],
    },
    fig11TheoremLine,
    {
      type: 'callout',
      variant: 'note',
      title: 'ملاحظة الكتاب عن حالة الامتدادين',
      blocks: [{ type: 'paragraph', text: L11_NOTE_EXTENSION }, fig11ExtensionCases],
    },
    {
      type: 'callout',
      variant: 'note',
      title: 'ملاحظة الكتاب: كيفية كتابة المساواة',
      blocks: [
        { type: 'paragraph', text: L11_NOTE_WRITING },
        {
          type: 'list',
          ordered: true,
          items: [L11_WRITE_RULE_1, L11_WRITE_RULE_2],
        },
        {
          type: 'list',
          ordered: false,
          items: [L11_CORRESPONDENCE_AB, L11_CORRESPONDENCE_AC, L11_CORRESPONDENCE_PARALLEL],
        },
      ],
    },
  ],
};

const step05Example: LessonStep = {
  id: 'l11-step-05-example',
  kicker: 'مثال',
  title: 'مثال: حساب أطوال أضلاع المثلث الصغير',
  origin: 'source',
  source: L11_SOURCE_40,
  blocks: [
    {
      type: 'callout',
      variant: 'example',
      title: 'مثال',
      blocks: [{ type: 'paragraph', text: L11_EXAMPLE }, fig11ExampleGiven],
    },
    {
      type: 'questionGroup',
      items: [{ label: '•', text: L11_EXAMPLE_PROMPT }],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Source — page 41                                                          */
/* -------------------------------------------------------------------------- */

const step06Solution: LessonStep = {
  id: 'l11-step-06-solution',
  kicker: 'مثال — الحل',
  title: 'الحل المطبوع للمثال خطوةً خطوة',
  origin: 'source',
  source: L11_SOURCE_41,
  blocks: [
    { type: 'paragraph', text: L11_SOLUTION_INTRO },
    { type: 'paragraph', text: L11_SOLUTION_RATIOS },
    { type: 'paragraph', text: L11_SOLUTION_SUBST },
    { type: 'math', latex: L11_SOLUTION_AF, label: 'إذن' },
    { type: 'math', latex: L11_SOLUTION_EF, label: 'و' },
    fig11ExampleSolved,
  ],
};

const step07Check: LessonStep = {
  id: 'l11-step-07-check',
  kicker: 'تحقّق من فهمك',
  title: 'كتابة ثلاث نسب متساوية في حالتين',
  origin: 'source',
  source: L11_SOURCE_41,
  blocks: [
    fig11CheckCases,
    {
      type: 'questionGroup',
      title: L11_CHECK_INTRO,
      items: [
        { label: '①', text: L11_CHECK_CASE_1 },
        { label: '②', text: L11_CHECK_CASE_2 },
      ],
    },
  ],
};

const step08Practice: LessonStep = {
  id: 'l11-step-08-practice',
  kicker: 'تدرّب',
  title: 'التحقّق من مساواة نسبية وكتابة النسب في ثلاثة أشكال',
  origin: 'source',
  source: L11_SOURCE_41,
  blocks: [
    {
      type: 'questionGroup',
      items: [{ label: '①', text: L11_PRACTICE_1 }],
    },
    fig11PracticeOneCases,
    {
      type: 'questionGroup',
      items: [{ label: '②', text: L11_PRACTICE_2 }],
    },
    fig11PracticeTwoCases,
    {
      type: 'teaching',
      variant: 'why',
      title: 'قراءة المنصّة لأشكال «تدرّب ②» (توضيح من إعداد المنصّة)',
      collapsible: true,
      revealLabel: 'اعرض قراءة المنصّة للأشكال الثلاثة',
      blocks: [{ type: 'paragraph', text: L11_PRACTICE_2_READING }],
    },
  ],
};

export const lesson11Steps: LessonStep[] = [
  step11Orientation,
  step01Activity,
  step11Lab,
  step02ActivityPartTwo,
  step03ActivityPartThree,
  step11ProofMap,
  step04Theorem,
  step11TheoremGuide,
  step05Example,
  step06Solution,
  step11ComputationStrategy,
  step07Check,
  step08Practice,
  step11Recap,
];
