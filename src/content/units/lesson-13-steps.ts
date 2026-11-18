import type { LessonStepInput } from '@/content/schema';
import {
  fig13ActivityGiven,
  fig13Definition,
  fig13OpenerAngle,
  fig13OpenerArcs,
  fig13OpenerLines,
  fig13PracticeOneGiven,
  fig13PracticeThreeGiven,
  fig13PracticeTwoGiven,
  fig13Property,
  fig13SolutionActivityArcs,
  fig13SolutionActivityCircle,
  fig13SolutionActivityConstruct,
  fig13SolutionActivityEqual,
  fig13SolutionActivityPoints,
  fig13SolutionActivityThird,
  fig13SolutionQ1,
  fig13SolutionQ2,
  fig13SolutionQ3,
  fig13SolutionQ4,
  fig13SolutionQ5,
  fig13SpecialCases,
  fig13CheckSetup,
} from './lesson-13-figures';
import { lesson13Notebook } from './lesson-13-notebook';
import {
  L13_ACTIVITY_1_1,
  L13_ACTIVITY_1_2,
  L13_ACTIVITY_2_1,
  L13_ACTIVITY_2_2,
  L13_ACTIVITY_3_1,
  L13_ACTIVITY_3_2,
  L13_ACTIVITY_3_3,
  L13_ACTIVITY_4,
  L13_ACTIVITY_4_OPTIONS,
  L13_ACTIVITY_SUBTITLE,
  L13_ACTIVITY_WARNING,
  L13_CHECK_1,
  L13_CHECK_2,
  L13_CHECK_3,
  L13_DEFINITION,
  L13_DEFINITION_HEADING,
  L13_OPENER_INTRO,
  L13_OPENER_Q1,
  L13_OPENER_Q2,
  L13_OPENER_Q3_OPTIONS,
  L13_OPENER_Q3_SETUP,
  L13_OPENER_Q4,
  L13_OPENER_Q5,
  L13_OPENER_Q5_OPTIONS,
  L13_PRACTICE_1,
  L13_PRACTICE_2_1,
  L13_PRACTICE_2_2,
  L13_PRACTICE_2_INTRO,
  L13_PRACTICE_3_2,
  L13_PRACTICE_3_3,
  L13_PRACTICE_3_4,
  L13_PRACTICE_3_INTRO,
  L13_PROPERTIES_HEADING,
  L13_PROPERTIES_INTRO,
  L13_PROPERTY_BACKWARD,
  L13_PROPERTY_FORWARD,
  L13_SOURCE_53,
  L13_SOURCE_54,
  L13_SOURCE_55,
  L13_SPECIAL_CENTRE,
  L13_SPECIAL_CONCURRENT,
  L13_SPECIAL_HEADING,
  L13_SPECIAL_RADII,
} from './lesson-13-questions';
import {
  step13ConstructionGuide,
  step13Lab,
  step13Orientation,
  step13Recap,
} from './lesson-13-teaching';

/**
 * ============================================================================
 *  UNIT 3, LESSON 1 — STUDENT SEQUENCE (pages 53–55)
 * ============================================================================
 *
 *  Eleven `origin: 'source'` steps follow the printed order (53 → 53 → 54 →
 *  54 → 54 → 54 → 55 → 55 → 55 → 55 → 55); six `origin: 'authored'` steps carry
 *  the platform's explanations, the answers to the opener, and the interactive
 *  lab. The notebook closes the lesson and is excluded from the teaching count.
 *
 *  Nothing here is added to the printed prompts: every `questionGroup` item is
 *  a constant from `lesson-13-questions.ts`.
 * ============================================================================
 */

/* -------------------------------------------------------------------------- */
/*  Page 53 — الانطلاقة نشاطة                                                   */
/* -------------------------------------------------------------------------- */

const step01OpenerLines: LessonStepInput = {
  id: 'l13-step-01-opener-lines',
  kicker: 'انطلاقة نشاطة',
  title: 'التمييز بين محور الضلع والارتفاع بالعلامات',
  origin: 'source',
  source: L13_SOURCE_53,
  blocks: [
    { type: 'paragraph', text: L13_OPENER_INTRO },
    fig13OpenerLines,
    {
      type: 'questionGroup',
      items: [
        { label: '①', text: L13_OPENER_Q1 },
        { label: '②', text: L13_OPENER_Q2 },
      ],
    },
    {
      type: 'teaching',
      variant: 'tip',
      title: 'قاعدة القراءة (إعداد المنصّة)',
      collapsible: true,
      revealLabel: 'اعرض المفتاح: علامة واحدة تحسم الأمر',
      blocks: [
        {
          type: 'paragraph',
          text: 'اللوحات الثلاث ترسم المثلث نفسه، فلا يفرّق بينها إلا العلامات: زاوية قائمة بلا تنصيف تعني ارتفاعًا، وزاوية قائمة مع تنصيف تعني محورًا، وتنصيف بلا زاوية قائمة يعني متوسطًا. ابحث أولًا عن علامتَي التنصيف على نصفَي $[BC]$، ثم عن الزاوية القائمة.',
        },
      ],
    },
  ],
};

const step02OpenerRest: LessonStepInput = {
  id: 'l13-step-02-opener-rest',
  kicker: 'انطلاقة نشاطة — تكملة',
  title: 'القطعة ومحورها، ومنصّف الزاوية، ودور الأقواس',
  origin: 'source',
  source: L13_SOURCE_53,
  blocks: [
    {
      type: 'callout',
      variant: 'note',
      title: '③',
      blocks: [
        { type: 'paragraph', text: L13_OPENER_Q3_SETUP },
        {
          type: 'list',
          ordered: false,
          items: L13_OPENER_Q3_OPTIONS.map((option) => option),
        },
        { type: 'paragraph', text: 'كما تلاحظ: السؤال ③ مطبوع دون شكل.' },
      ],
    },
    { type: 'paragraph', text: L13_OPENER_Q4 },
    fig13OpenerAngle,
    { type: 'paragraph', text: L13_OPENER_Q5 },
    fig13OpenerArcs,
    {
      type: 'list',
      ordered: false,
      items: L13_OPENER_Q5_OPTIONS.map((option) => option),
    },
  ],
};

const step03OpenerSolutions: LessonStepInput = {
  id: 'l13-step-03-opener-solutions',
  kicker: 'شرح المنصّة',
  title: 'حلّ أسئلة الانطلاقة الخمسة، شكلًا بعد شكل',
  origin: 'authored',
  blocks: [
    {
      type: 'paragraph',
      text: 'انطلاقة الصفحة ٥٣ لا تُطبع بحلول، وهذه الإجابات من إعداد المنصّة، وكلّها مبنية على العلامات المرسومة لا على مظهر الشكل.',
    },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'السؤال ① — الإجابة ②: محور الضلع',
      blocks: [
        {
          type: 'paragraph',
          text: 'المحور هو العمودي على $[BC]$ في منتصفها؛ ولوحة ② هي الوحيدة التي تحمل الزاوية القائمة عند المنتصف مع علامتَي التنصيف على النصفين. أمّا ① فعمودي في نقطة ليست المنتصف (فهو الارتفاع)، وأمّا ③ فيمرّ بالمنتصف دون أن يكون عموديًا (فهو المتوسط).',
        },
        fig13SolutionQ1,
      ],
    },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'السؤال ② — الإجابة ①: الارتفاع المتعلق بالضلع',
      blocks: [
        {
          type: 'paragraph',
          text: 'الارتفاع هو العمود من الرأس $A$ على $(BC)$، ولا يلزم أن يقع قدمه في المنتصف: لوحة ① تحمل زاوية قائمة بلا علامة تنصيف. ولوحة ③ تحمل التنصيف دون قائمة (فهي المتوسط).',
        },
        fig13SolutionQ2,
      ],
    },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'السؤال ③ — الإجابة ③: المسافتان متساويتان',
      blocks: [
        {
          type: 'paragraph',
          text: 'النقطتان $J$ و$K$ طرفا القطعة $[JK]$ و$(d)$ محورها، و$M$ تنتمي إلى $(d)$؛ فبحسب خاصّة المحور $MJ = MK$. والسؤال مطبوع دون شكل، وهذا شكل توضيحي من إعداد المنصّة.',
        },
        fig13SolutionQ3,
      ],
    },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'السؤال ④ — الإجابة ③: منصف الزاوية',
      blocks: [
        {
          type: 'paragraph',
          text: 'لوحة ① تُعلّم تساوي الضلعين $MK$ و$MA$ ولا تقول شيئًا عن الزاويتين. ولوحة ② تصل $M$ بمنتصف $[AK]$ والزاوية القائمة فيها عند $A$، فهي متوسط مثلث قائم لا منصّف زاوية. ولوحة ③ وحدها تحمل علامتي الزاويتين المتساويتين عند $M$.',
        },
        fig13SolutionQ4,
      ],
    },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'السؤال ⑤ — الإجابة ③: منصف زاوية الرأس',
      blocks: [
        {
          type: 'paragraph',
          text: 'القوس المتمركز في $A$ يقطع الضلعين في $E$ و$F$ بالفتحة نفسها، فيكون $AE = AF$؛ والقوسان المتمركزان في $E$ و$F$ بالفتحة نفسها يتقاطعان في $P$، فيكون $PE = PF$. إذن $A$ و$P$ كلتاهما متساوية البعد عن $E$ و$F$، فالمستقيم $(AP)$ هو محور $[EF]$، وبالتالي منصّف الزاوية في $A$.',
        },
        fig13SolutionQ5,
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Page 54 — النشاط                                                           */
/* -------------------------------------------------------------------------- */

const step04ActivityConstruct: LessonStepInput = {
  id: 'l13-step-04-activity-construct',
  kicker: 'نشاط',
  title: 'محاور أضلاع المثلث متلاقية — إنشاء الشكل',
  origin: 'source',
  source: L13_SOURCE_54,
  blocks: [
    { type: 'paragraph', text: L13_ACTIVITY_SUBTITLE },
    {
      type: 'questionGroup',
      items: [
        { label: '1 ①', text: L13_ACTIVITY_1_1 },
        { label: '1 ②', text: L13_ACTIVITY_1_2 },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'ملاحظة مطبوعة في هامش الصفحة',
      blocks: [{ type: 'paragraph', text: L13_ACTIVITY_WARNING }],
    },
    fig13ActivityGiven,
  ],
};

const step05ActivityReason: LessonStepInput = {
  id: 'l13-step-05-activity-reason',
  kicker: 'نشاط — الجزء 2',
  title: 'خاصّة المحور وبرهان تلاقي المحاور الثلاثة',
  origin: 'source',
  source: L13_SOURCE_54,
  blocks: [
    {
      type: 'questionGroup',
      items: [
        { label: '2 ①', text: L13_ACTIVITY_2_1 },
        { label: '2 ②', text: L13_ACTIVITY_2_2 },
      ],
    },
  ],
};

const step06ActivityCircle: LessonStepInput = {
  id: 'l13-step-06-activity-circle',
  kicker: 'نشاط — الجزء 3',
  title: 'الدائرة المارّة بالرؤوس الثلاثة',
  origin: 'source',
  source: L13_SOURCE_54,
  blocks: [
    {
      type: 'questionGroup',
      items: [
        { label: '3 ①', text: L13_ACTIVITY_3_1 },
        { label: '3 ②', text: L13_ACTIVITY_3_2 },
        { label: '3 ③', text: L13_ACTIVITY_3_3 },
      ],
    },
  ],
};

const step07ActivityArcs: LessonStepInput = {
  id: 'l13-step-07-activity-arcs',
  kicker: 'نشاط — الجزء 4',
  title: 'الأقواس المتساوية نصف القطر: بماذا تفيد؟',
  origin: 'source',
  source: L13_SOURCE_54,
  blocks: [
    {
      type: 'questionGroup',
      items: [{ label: '4', text: L13_ACTIVITY_4 }],
    },
    {
      type: 'list',
      ordered: false,
      items: L13_ACTIVITY_4_OPTIONS.map((option) => option),
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Page 54 — تعلّم                                                            */
/* -------------------------------------------------------------------------- */

const step08Learn: LessonStepInput = {
  id: 'l13-step-08-learn',
  kicker: 'تعلّم',
  title: `${L13_DEFINITION_HEADING} المحور و${L13_PROPERTIES_HEADING}`,
  origin: 'source',
  source: L13_SOURCE_54,
  blocks: [
    {
      type: 'callout',
      variant: 'definition',
      title: L13_DEFINITION_HEADING,
      blocks: [{ type: 'paragraph', text: L13_DEFINITION }, fig13Definition],
    },
    {
      type: 'callout',
      variant: 'theorem',
      title: L13_PROPERTIES_HEADING,
      blocks: [
        { type: 'paragraph', text: L13_PROPERTIES_INTRO },
        {
          type: 'list',
          ordered: false,
          items: [L13_PROPERTY_FORWARD, L13_PROPERTY_BACKWARD],
        },
        fig13Property,
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Page 55 — خاصة وتعریف                                                      */
/* -------------------------------------------------------------------------- */

const step09Special: LessonStepInput = {
  id: 'l13-step-09-special',
  kicker: 'خاصة وتعریف',
  title: 'المحاور الثلاثة تتلاقى في مركز الدائرة المارّة بالرؤوس',
  origin: 'source',
  source: L13_SOURCE_55,
  blocks: [
    {
      type: 'callout',
      variant: 'theorem',
      title: L13_SPECIAL_HEADING,
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [L13_SPECIAL_CONCURRENT, L13_SPECIAL_CENTRE, L13_SPECIAL_RADII],
        },
        fig13SpecialCases,
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Page 55 — تحقّق من فهمك                                                    */
/* -------------------------------------------------------------------------- */

const step10Check: LessonStepInput = {
  id: 'l13-step-10-check',
  kicker: 'تحقّق من فهمك',
  title: 'دائرة وثلاث نقاط عليها: أين تلتقي المحاور؟',
  origin: 'source',
  source: L13_SOURCE_55,
  blocks: [
    { type: 'paragraph', text: 'المعطى: دائرة مركزها $O$ وعليها ثلاث نقاط $A$ و$B$ و$C$.' },
    fig13CheckSetup,
    {
      type: 'questionGroup',
      items: [
        { label: '①', text: L13_CHECK_1 },
        { label: '②', text: L13_CHECK_2 },
        { label: '③', text: L13_CHECK_3 },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Page 55 — تدرّب                                                            */
/* -------------------------------------------------------------------------- */

const step11Practice: LessonStepInput = {
  id: 'l13-step-11-practice',
  kicker: 'تدرّب',
  title: 'ثلاثة تمارين: برهان، ومركز دائرة، وملاحظة إنشاء',
  origin: 'source',
  source: L13_SOURCE_55,
  blocks: [
    {
      type: 'questionGroup',
      title: '①',
      items: [{ label: '①', text: L13_PRACTICE_1 }],
    },
    fig13PracticeOneGiven,
    {
      type: 'questionGroup',
      title: '②',
      items: [
        { label: '②', text: L13_PRACTICE_2_INTRO },
        { label: '② ①', text: L13_PRACTICE_2_1 },
        { label: '② ②', text: L13_PRACTICE_2_2 },
      ],
    },
    fig13PracticeTwoGiven,
    {
      type: 'questionGroup',
      title: '③',
      items: [
        { label: '③', text: L13_PRACTICE_3_INTRO },
        { label: '③ ②', text: L13_PRACTICE_3_2 },
        { label: '③ ③', text: L13_PRACTICE_3_3 },
        { label: '③ ④', text: L13_PRACTICE_3_4 },
      ],
    },
    fig13PracticeThreeGiven,
  ],
};

export const lesson13Steps: LessonStepInput[] = [
  step13Orientation,
  step01OpenerLines,
  step02OpenerRest,
  step03OpenerSolutions,
  step04ActivityConstruct,
  step13Lab,
  step05ActivityReason,
  step13ConstructionGuide,
  step06ActivityCircle,
  step07ActivityArcs,
  step08Learn,
  step09Special,
  step10Check,
  step11Practice,
  step13Recap,

  /* ───────────────────── 📒 دفتر الطالب — محطة التدوين ──────────────────── */
  lesson13Notebook,
];

/** The staged solutions of the activity, exported for the Teacher Area. */
export const L13_ACTIVITY_SOLUTION_FIGURES = {
  construct: fig13SolutionActivityConstruct,
  equal: fig13SolutionActivityEqual,
  third: fig13SolutionActivityThird,
  circle: fig13SolutionActivityCircle,
  points: fig13SolutionActivityPoints,
  arcs: fig13SolutionActivityArcs,
} as const;
