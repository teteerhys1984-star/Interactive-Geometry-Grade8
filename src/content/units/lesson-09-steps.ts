import type { LessonStep } from '@/content/schema';
import {
  fig09ActivityPanels,
  fig09CheckOne,
  fig09CheckTwo,
  fig09Example,
  fig09Knowledge,
  fig09PracticeOneStarter,
  fig09PracticeTwoStarter,
} from './lesson-09-figures';
import {
  L9_ACTIVITY_QUESTIONS,
  L9_ACTIVITY_SETUP_1,
  L9_ACTIVITY_SETUP_2,
  L9_ACTIVITY_SUBTITLE,
  L9_CHECK_ONE,
  L9_CHECK_REMINDER,
  L9_CHECK_TWO,
  L9_EXAMPLE_GIVEN,
  L9_EXAMPLE_HEADER,
  L9_EXAMPLE_REASON,
  L9_EXAMPLE_RESULT,
  L9_KNOWLEDGE_ERRATUM_CLAUSE,
  L9_KNOWLEDGE_HINTS,
  L9_KNOWLEDGE_PROMPT,
  L9_KNOWLEDGE_QUESTION,
  L9_KNOWLEDGE_SOLUTION,
  L9_METHOD_STEPS,
  L9_METHOD_TITLE,
  L9_PRACTICE_ONE_INTRO,
  L9_PRACTICE_ONE_PARTS,
  L9_PRACTICE_TWO,
  L9_SOURCE_34,
  L9_SOURCE_35,
  L9_THEOREM_STATEMENT,
} from './lesson-09-questions';
import {
  step09LabAndProof,
  step09MethodGuide,
  step09Orientation,
  step09Recap,
  step09SubtriangleStrategy,
} from './lesson-09-teaching';

/* -------------------------------------------------------------------------- */
/*  Source steps — Page 34                                                     */
/* -------------------------------------------------------------------------- */

const step01Activity: LessonStep = {
  id: 'l9-step-01-activity',
  kicker: 'نشاط',
  title: 'تمهيد خاصة المستقيم المار بمنتصف ضلع موازياً ضلعاً آخر',
  origin: 'source',
  source: L9_SOURCE_34,
  blocks: [
    {
      type: 'paragraph',
      text: L9_ACTIVITY_SUBTITLE,
    },
    {
      type: 'paragraph',
      text: L9_ACTIVITY_SETUP_1,
    },
    fig09ActivityPanels,
    {
      type: 'paragraph',
      text: L9_ACTIVITY_SETUP_2,
    },
    {
      type: 'questionGroup',
      items: L9_ACTIVITY_QUESTIONS.map((item) => ({
        label: item.marker,
        text: item.text,
      })),
    },
  ],
};

const step02Theorem: LessonStep = {
  id: 'l9-step-02-theorem',
  kicker: 'تعلّم',
  title: 'المبرهنة الثانية في المنتصفات',
  origin: 'source',
  source: L9_SOURCE_34,
  blocks: [
    {
      type: 'callout',
      variant: 'theorem',
      title: 'المبرهنة الثانية في المنتصفات',
      blocks: [
        {
          type: 'paragraph',
          text: L9_THEOREM_STATEMENT,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: L9_EXAMPLE_HEADER,
      blocks: [
        {
          type: 'paragraph',
          text: L9_EXAMPLE_GIVEN,
        },
        {
          type: 'paragraph',
          text: L9_EXAMPLE_REASON,
        },
        {
          type: 'paragraph',
          text: L9_EXAMPLE_RESULT,
        },
      ],
    },
    fig09Example,
    {
      type: 'callout',
      variant: 'hint',
      title: L9_METHOD_TITLE,
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [...L9_METHOD_STEPS],
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Source steps — Page 35                                                     */
/* -------------------------------------------------------------------------- */

const step03Knowledge: LessonStep = {
  id: 'l9-step-03-knowledge',
  kicker: 'اكتساب معارف',
  title: L9_KNOWLEDGE_QUESTION,
  origin: 'source',
  source: L9_SOURCE_35,
  blocks: [
    {
      type: 'questionGroup',
      title: 'مثال:',
      items: [
        {
          label: '•',
          text: L9_KNOWLEDGE_PROMPT,
        },
      ],
    },
    fig09Knowledge,
    {
      type: 'callout',
      variant: 'hint',
      title: 'إرشاد الكتاب',
      blocks: L9_KNOWLEDGE_HINTS.map((hint) => ({
        type: 'paragraph' as const,
        text: hint,
      })),
    },
  ],
};

const step04KnowledgeSolution: LessonStep = {
  id: 'l9-step-04-knowledge-solution',
  kicker: 'الحل',
  title: 'الحل المطبوع لمثال اكتساب المعارف',
  origin: 'source',
  source: {
    ...L9_SOURCE_35,
    note: 'في الطبعة المصوّرة (ص 35) لحقت بنهاية فقرة الحل عبارة زائدة بالصفّ الطباعي من نهاية حل ص 33 هي: «فالمستقيمان (OB) و (AI) متوازيان.»، وقد وُثّقت صراحةً في التنبيه المرافق أدناه.',
  },
  blocks: [
    {
      type: 'callout',
      variant: 'note',
      title: 'الحل',
      blocks: [
        {
          type: 'paragraph',
          text: L9_KNOWLEDGE_SOLUTION,
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'pitfall',
      title: 'تنبيه تحريري حول النسخة المطبوعة (ص 35)',
      collapsible: true,
      revealLabel: 'لماذا تظهر عبارة إضافية في آخر سطر الحل في الكتاب الورقي؟',
      blocks: [
        {
          type: 'paragraph',
          text: `ينتهي البرهان التام لمثال «اكتساب معارف» عند جملة «أي إنَّ النقطة $S$ هي منتصف $[AB]$.». أمّا العبارة «${L9_KNOWLEDGE_ERRATUM_CLAUSE}» الظاهرة في ذيل السطر المطبوع في الصفحة 35 فهي بقيّة مطبعية منقولة سهواً من نهاية حل مثال الصفحة 33 في الدرس الأول، ولا تنتمي إلى رموز هذا التمرين.`,
        },
      ],
    },
  ],
};

const step05Check: LessonStep = {
  id: 'l9-step-05-check',
  kicker: 'تحقّق من فهمك',
  title: 'تطبيقان على المبرهنة الثانية في المنتصفات',
  origin: 'source',
  source: L9_SOURCE_35,
  blocks: [
    {
      type: 'questionGroup',
      items: [{ label: '①', text: L9_CHECK_ONE }],
    },
    fig09CheckOne,
    {
      type: 'questionGroup',
      items: [{ label: '②', text: L9_CHECK_TWO }],
    },
    fig09CheckTwo,
    {
      type: 'callout',
      variant: 'hint',
      title: 'تذكير من الكتاب',
      blocks: [
        {
          type: 'paragraph',
          text: L9_CHECK_REMINDER,
        },
      ],
    },
  ],
};

const step06Practice: LessonStep = {
  id: 'l9-step-06-practice',
  kicker: 'تدرّب',
  title: 'إنشاء الشكل الهندسي وإثبات المنتصف',
  origin: 'source',
  source: L9_SOURCE_35,
  blocks: [
    {
      type: 'paragraph',
      text: `① ${L9_PRACTICE_ONE_INTRO}`,
    },
    {
      type: 'questionGroup',
      items: L9_PRACTICE_ONE_PARTS.map((part) => ({
        label: part.marker,
        text: part.text,
      })),
    },
    {
      type: 'teaching',
      variant: 'tip',
      title: 'تحقّق من رسمك للتمرين ① (إضافة المنصّة)',
      collapsible: true,
      revealLabel: 'ارسم الشكل على دفترك أولاً، ثم افتح للتحقّق من رسمك',
      blocks: [
        {
          type: 'paragraph',
          text: 'بما أنَّ $S$ صورة $I$ وفق التناظر الذي مركزه $J$، تقع $I$ و$J$ و$S$ على استقامة واحدة وتكون $J$ منتصف $[IS]$، ثم نرسم من $S$ موازياً لـ $(JK)$ يلاقي المستقيم $(IK)$ في $T$:',
        },
        fig09PracticeOneStarter,
      ],
    },
    {
      type: 'questionGroup',
      items: [{ label: '②', text: L9_PRACTICE_TWO }],
    },
    {
      type: 'teaching',
      variant: 'tip',
      title: 'تحقّق من رسمك للتمرين ② (إضافة المنصّة)',
      collapsible: true,
      revealLabel: 'ارسم الشكل على دفترك أولاً، ثم افتح للتحقّق من رسمك',
      blocks: [
        {
          type: 'paragraph',
          text: 'نعيّن $C$ منتصف $[AJ]$ في المثلث $AJP$ ونصل $[CP]$، ثم نرسم من $A$ مستقيماً يوازي $(CP)$ فيلاقي امتداد المستقيم $(JP)$ في النقطة $M$:',
        },
        fig09PracticeTwoStarter,
      ],
    },
  ],
};

export const lesson09Steps: LessonStep[] = [
  step09Orientation,
  step01Activity,
  step09LabAndProof,
  step02Theorem,
  step09MethodGuide,
  step03Knowledge,
  step04KnowledgeSolution,
  step09SubtriangleStrategy,
  step05Check,
  step06Practice,
  step09Recap,
];
