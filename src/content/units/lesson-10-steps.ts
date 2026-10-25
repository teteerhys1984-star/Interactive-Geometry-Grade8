import type { LessonStep } from '@/content/schema';
import {
  fig10ActivityPanels,
  fig10BundleOne,
  fig10BundleTwo,
  fig10Check,
  fig10ExampleOne,
  fig10ExampleTwo,
  fig10PracticeStarter,
  fig10Transversal,
} from './lesson-10-figures';
import {
  L10_ACTIVITY_BULB,
  L10_ACTIVITY_BULB_QUOTE,
  L10_ACTIVITY_QUESTIONS,
  L10_ACTIVITY_SETUP,
  L10_ACTIVITY_SUBTITLE,
  L10_ACTIVITY_TABLE,
  L10_CHECK,
  L10_KHASSA_CORRECTION,
  L10_KHASSA_ERRATUM_TOKEN,
  L10_KHASSA_PRINTED,
  L10_KNOWLEDGE_CASE_1_GIVEN,
  L10_KNOWLEDGE_CASE_1_MATH,
  L10_KNOWLEDGE_CASE_1_RESULT,
  L10_KNOWLEDGE_CASE_1_SOLUTION,
  L10_KNOWLEDGE_CASE_1_SUBST,
  L10_KNOWLEDGE_CASE_2_GIVEN,
  L10_KNOWLEDGE_CASE_2_MATH,
  L10_KNOWLEDGE_CASE_2_RESULT,
  L10_KNOWLEDGE_CASE_2_SOLUTION,
  L10_KNOWLEDGE_CASE_2_SUBST,
  L10_KNOWLEDGE_HINT,
  L10_KNOWLEDGE_INTRO,
  L10_KNOWLEDGE_QUESTION,
  L10_LEARN_EXAMPLE,
  L10_LEARN_HEADING,
  L10_LEARN_TABLE,
  L10_PRACTICE_1,
  L10_PRACTICE_2,
  L10_SOURCE_36,
  L10_SOURCE_37,
  L10_SOURCE_38,
} from './lesson-10-questions';
import {
  step10ComputationStrategy,
  step10LabAndDiscovery,
  step10Orientation,
  step10Recap,
  step10TheoremGuide,
} from './lesson-10-teaching';

/* -------------------------------------------------------------------------- */
/*  Source steps — Page 36                                                     */
/* -------------------------------------------------------------------------- */

const step01Activity: LessonStep = {
  id: 'l10-step-01-activity',
  kicker: 'نشاط',
  title: 'اكتشاف التناسب بين أطوال أضلاع مثلثين',
  origin: 'source',
  source: L10_SOURCE_36,
  blocks: [
    { type: 'paragraph', text: L10_ACTIVITY_SUBTITLE },
    { type: 'paragraph', text: L10_ACTIVITY_SETUP },
    fig10ActivityPanels,
    {
      type: 'questionGroup',
      items: L10_ACTIVITY_QUESTIONS.map((item) => ({ label: item.marker, text: item.text })),
    },
    {
      type: 'table',
      caption:
        'جدول النشاط المطبوع — تُملأ الفراغات المنقّطة بالقياسات لكل شكل من الأشكال الثلاثة.',
      columns: [...L10_ACTIVITY_TABLE.columns],
      rows: [[...L10_ACTIVITY_TABLE.secondRow]],
    },
    {
      type: 'callout',
      variant: 'hint',
      title: 'ملاحظة الكتاب',
      blocks: [
        { type: 'paragraph', text: L10_ACTIVITY_BULB },
        { type: 'paragraph', text: L10_ACTIVITY_BULB_QUOTE },
      ],
    },
  ],
};

const step02Learn: LessonStep = {
  id: 'l10-step-02-learn',
  kicker: 'تعلّم',
  title: L10_LEARN_HEADING,
  origin: 'source',
  source: L10_SOURCE_36,
  blocks: [
    {
      type: 'callout',
      variant: 'definition',
      title: L10_LEARN_HEADING,
      blocks: [{ type: 'paragraph', text: L10_LEARN_EXAMPLE }],
    },
    fig10Transversal,
    {
      type: 'table',
      caption: 'الجدول المطبوع في فقرة «تعلّم» — جدول تناسب بين أطوال أضلاع المثلثين.',
      columns: [...L10_LEARN_TABLE.columns],
      rows: [[...L10_LEARN_TABLE.secondRow]],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Source steps — Page 37                                                     */
/* -------------------------------------------------------------------------- */

const step03Khassa: LessonStep = {
  id: 'l10-step-03-khassa',
  kicker: 'خاصة',
  title: 'خاصة التناسب بين أطوال أضلاع المثلثين',
  origin: 'source',
  source: {
    ...L10_SOURCE_37,
    note: 'في الطبعة المصوّرة (ص 37) ورد في صندوق «خاصة» رمز التوازي $(MN) \\parallel (AB)$، وهو مستحيل لأنَّ $M \\in [AB]$؛ والقراءة الصحيحة الموافقة لبقية الصفحات وللأمثلة المحلولة هي $(MN) \\parallel (BC)$، وقد وُثّق ذلك صراحةً في التنبيه المرافق.',
  },
  blocks: [
    {
      type: 'callout',
      variant: 'theorem',
      title: 'نص «خاصة» كما ورد مطبوعاً',
      blocks: [{ type: 'paragraph', text: L10_KHASSA_PRINTED }],
    },
    {
      type: 'teaching',
      variant: 'pitfall',
      title: 'تنبيه تحريري حول صندوق «خاصة» في الطبعة المصوّرة (ص 37)',
      collapsible: true,
      revealLabel: 'لماذا لا يمكن أن يوازي المستقيم (MN) الضلع (AB)؟',
      blocks: [
        {
          type: 'paragraph',
          text: `يطبع الكتاب العبارة ${L10_KHASSA_ERRATUM_TOKEN}، لكن النقطة $M$ تنتمي إلى الضلع $[AB]$ نفسه، فلا يمكن للمستقيم المار بـ $M$ أن يوازي المستقيم $(AB)$ (مستقيمان يتقاطعان لا يكونان متوازيين). القراءة الهندسية الصحيحة، والمستعملة في نشاط ص 36 وفي المثالين المحلولين ص 37 وفي تمريني ص 38، هي ${L10_KHASSA_CORRECTION}: المستقيم يوازي الضلع الثالث فقط.`,
        },
        {
          type: 'paragraph',
          text: 'تُحفظ العبارة المطبوعة بحرفيتها في صندوق «خاصة» أمانةً للمصدر، ويُعتمد التصويب $(MN) \\parallel (BC)$ في كل تطبيق لاحق.',
        },
      ],
    },
  ],
};

const step04Knowledge: LessonStep = {
  id: 'l10-step-04-knowledge',
  kicker: 'اكتساب معارف',
  title: L10_KNOWLEDGE_QUESTION,
  origin: 'source',
  source: L10_SOURCE_37,
  blocks: [
    {
      type: 'questionGroup',
      title: 'مثال:',
      items: [{ label: '•', text: L10_KNOWLEDGE_INTRO }],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'الحالة ①',
      blocks: [{ type: 'paragraph', text: L10_KNOWLEDGE_CASE_1_GIVEN }, fig10ExampleOne],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'الحالة ②',
      blocks: [{ type: 'paragraph', text: L10_KNOWLEDGE_CASE_2_GIVEN }, fig10ExampleTwo],
    },
    {
      type: 'callout',
      variant: 'hint',
      title: 'الحل — إرشاد الكتاب',
      blocks: [{ type: 'paragraph', text: L10_KNOWLEDGE_HINT }],
    },
    {
      type: 'callout',
      variant: 'note',
      title: 'الحل المطبوع — الحالة ①',
      blocks: [
        { type: 'paragraph', text: L10_KNOWLEDGE_CASE_1_SOLUTION },
        { type: 'math', latex: L10_KNOWLEDGE_CASE_1_MATH },
        { type: 'paragraph', text: L10_KNOWLEDGE_CASE_1_SUBST },
        { type: 'math', latex: L10_KNOWLEDGE_CASE_1_RESULT, label: 'إذن' },
      ],
    },
    {
      type: 'callout',
      variant: 'note',
      title: 'الحل المطبوع — الحالة ②',
      blocks: [
        { type: 'paragraph', text: L10_KNOWLEDGE_CASE_2_SOLUTION },
        { type: 'math', latex: L10_KNOWLEDGE_CASE_2_MATH },
        { type: 'paragraph', text: L10_KNOWLEDGE_CASE_2_SUBST },
        { type: 'math', latex: L10_KNOWLEDGE_CASE_2_RESULT, label: 'إذن' },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Source steps — Page 38                                                     */
/* -------------------------------------------------------------------------- */

const step05Check: LessonStep = {
  id: 'l10-step-05-check',
  kicker: 'تحقّق من فهمك',
  title: 'حساب طول ضلع واستنتاج جزءه',
  origin: 'source',
  source: L10_SOURCE_38,
  blocks: [
    fig10Check,
    {
      type: 'questionGroup',
      items: [{ label: '•', text: L10_CHECK }],
    },
    {
      type: 'teaching',
      variant: 'tip',
      title: 'توجيه ذاتي قبل فتح الحل في منطقة المعلم',
      collapsible: true,
      revealLabel: 'اعرض مفاتيح الحل من دون الحل الكامل',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'حدّد النسبة المشتركة من الضلع الذي تعرف طوله كاملاً وجزءه: $\\frac{AF}{AC}$.',
            'ساويها بـ $\\frac{AE}{AB}$ لتجد طول $AB$ كاملاً.',
            'استنتج $EB = AB - AE$ تحققاً من أنّ الجزأين مجموعهما الضلع الكامل.',
          ],
        },
      ],
    },
  ],
};

const step06Practice: LessonStep = {
  id: 'l10-step-06-practice',
  kicker: 'تدرّب',
  title: 'حزم المستقيمات المتوازية وتطبيق التناسب',
  origin: 'source',
  source: L10_SOURCE_38,
  blocks: [
    {
      type: 'questionGroup',
      items: [{ label: '①', text: L10_PRACTICE_1 }],
    },
    fig10BundleOne,
    fig10BundleTwo,
    {
      type: 'teaching',
      variant: 'tip',
      title: 'تحقّق من تحديدك للمثلثات في التمرين ① (إضافة المنصّة)',
      collapsible: true,
      revealLabel: 'حدّد المثلثات بنفسك أولاً ثم افتح للتحقّق',
      blocks: [
        {
          type: 'paragraph',
          text: 'في الشكل ① المثلثان الرئيسيان هما $ABC$ و$AEF$ المشتركان في الرأس $A$، حيث $(BC) \\parallel (EF)$ والقاطعان $(AE)$ و$(AF)$. وفي الشكل ② نجد المثلثين $MIJ$ و$MHK$ المشتركين في الرأس $M$ مع $(IJ) \\parallel (HK)$، ويضيف المستقيم $(TN) \\parallel (KM)$ وضعية تناسب إضافية.',
        },
      ],
    },
    {
      type: 'questionGroup',
      items: [{ label: '②', text: L10_PRACTICE_2 }],
    },
    fig10PracticeStarter,
    {
      type: 'teaching',
      variant: 'tip',
      title: 'تحقّق من انطلاقتك في التمرين ② (إضافة المنصّة)',
      collapsible: true,
      revealLabel: 'اعرف من أين تبدأ قبل فتح الحل الكامل',
      blocks: [
        {
          type: 'paragraph',
          text: 'ابدأ بتجميع الضلع الكامل $JL = JN + NL = 12$ لتستخرج النسبة المشتركة $\\frac{JN}{JL} = \\frac{1}{4}$، ثم طبّقها على الضلعين الآخرين. الحل الكامل معروض في شرح المنصّة وفي منطقة المعلم.',
        },
      ],
    },
  ],
};

export const lesson10Steps: LessonStep[] = [
  step10Orientation,
  step01Activity,
  step10LabAndDiscovery,
  step02Learn,
  step03Khassa,
  step10TheoremGuide,
  step04Knowledge,
  step10ComputationStrategy,
  step05Check,
  step06Practice,
  step10Recap,
];
