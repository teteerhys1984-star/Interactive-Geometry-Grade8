import type { LessonStepInput } from '../schema';
import {
  figActivityMidline,
  figCheckMidpoints,
  figExampleMidline,
  figKnowledgeParallel,
  figPracticeRectangle,
  figPracticeSemicircle,
  figPracticeSymmetric,
  figProofMidline,
  figTheoremMidline,
} from './lesson-08-figures';
import {
  L8_ACTIVITY_QUESTIONS,
  L8_CHECK_INTRO,
  L8_CHECK_QUESTIONS,
  L8_EXAMPLE_PROMPT,
  L8_KNOWLEDGE_PROMPT,
  L8_KNOWLEDGE_SOLUTION,
  L8_PRACTICE_ONE,
  L8_PRACTICE_THREE,
  L8_PRACTICE_TWO,
  L8_PROOF_PROMPT,
  L8_PROOF_START,
  L8_PROOF_STEPS,
} from './lesson-08-questions';

import {
  teachingExample,
  teachingObservation,
  teachingOrientation,
  teachingProof,
  teachingRecap,
} from './lesson-08-teaching';

/**
 * ============================================================================
 *  الدرس الثامن — خطوات الدرس (صفحات ٣١–٣٣)
 * ============================================================================
 *
 *  The student sequence, in printed order:
 *
 *    ص.٣١  نشاط (الإنشاء) → «دليل للإثبات» (فراغات) → صياغة الإثبات
 *    ص.٣٢  تعلّم (المبرهنة) → مثال → اكتساب معارف
 *    ص.٣٣  الحل المطبوع → تحقّق من فهمك → تدرّب (① ② ③)
 *
 *  Platform steps are interleaved where they help, never between a printed
 *  prompt and its printed figure, and never in place of a printed page.
 * ============================================================================
 */

const P31 = { page: 31, locator: 'نشاط — منتصفا ضلعين في المثلث' } as const;
const P31_PROOF = { page: 31, locator: 'نشاط — دليل للإثبات' } as const;
const P32_THEOREM = { page: 32, locator: 'تعلّم — المبرهنة الأولى في المنتصفات' } as const;
const P32_EXAMPLE = {
  page: 32,
  locator: 'مثال',
  note: 'المعطيات والمطلوب مطابقان للمطبوع؛ أُعيدت صياغة الجملة بعد قطع في حافة الصفحة.',
} as const;
const P32_KNOWLEDGE = {
  page: 32,
  locator: 'اكتساب معارف',
  note: 'المعطيات والمطلوب مطابقان للمطبوع؛ أُعيدت صياغة الجملة الافتتاحية بعد قطع في حافة الصفحة.',
} as const;
const P33_SOLUTION = { page: 33, locator: 'الحل' } as const;
const P33_CHECK = { page: 33, locator: 'تحقّق من فهمك' } as const;
const P33_PRACTICE = { page: 33, locator: 'تدرّب' } as const;

export const lesson08Steps: LessonStepInput[] = [
  /* ─────────────────────────── شرح المنصّة: التوجيه ─────────────────────── */
  teachingOrientation,

  /* ───────────────────────── ص.٣١ — النشاط المطبوع ──────────────────────── */
  {
    id: 'l8-step-01-activity',
    kicker: 'نشاط',
    title: 'منتصفا ضلعين في المثلث',
    origin: 'source',
    source: P31,
    blocks: [
      {
        type: 'paragraph',
        text: 'يطلب النشاط تكرار الإنشاء نفسه على ثلاثة مثلثات مختلفة في قياس الزاوية عند $A$، ثم ملاحظة ما يبقى ثابتاً.',
      },
      {
        type: 'questionGroup',
        title: 'الإنشاء',
        items: L8_ACTIVITY_QUESTIONS.map((item) => ({ label: item.label, text: item.text })),
      },
      {
        type: 'figure',
        diagram: figActivityMidline,
      },
    ],
  },

  /* ─────────────────────── شرح المنصّة: الملاحظة ────────────────────────── */
  teachingObservation,

  /* ───────────────────── ص.٣١ — دليل للإثبات (فراغات) ───────────────────── */
  {
    id: 'l8-step-02-proof-scaffold',
    kicker: 'دليل للإثبات',
    title: 'كيف نبرهن؟ الفراغات الثلاثة',
    origin: 'source',
    source: P31_PROOF,
    blocks: [
      {
        type: 'paragraph',
        text: L8_PROOF_START.text,
      },
      {
        type: 'figure',
        diagram: figProofMidline,
      },
      {
        type: 'list',
        ordered: true,
        items: L8_PROOF_STEPS.map((item) => item.text),
      },
      {
        type: 'callout',
        variant: 'hint',
        title: 'تذكير من الوحدة الأولى',
        blocks: [
          {
            type: 'list',
            ordered: false,
            items: [
              'إذا تناصف قطرا رباعي، فهو متوازي أضلاع.',
              'إذا توازى ضلعان متقابلان في رباعي وتساويا، فهو متوازي أضلاع.',
              'في متوازي الأضلاع، كل ضلعين متقابلين متوازيان ومتساويان.',
            ],
          },
        ],
      },
      {
        type: 'paragraph',
        text: L8_PROOF_PROMPT.text,
      },
    ],
  },

  /* ────────────────────── شرح المنصّة: البرهان كاملاً ───────────────────── */
  teachingProof,

  /* ───────────────────────── ص.٣٢ — تعلّم: المبرهنة ─────────────────────── */
  {
    id: 'l8-step-03-theorem',
    kicker: 'تعلّم',
    title: 'المبرهنة الأولى في المنتصفات',
    origin: 'source',
    source: P32_THEOREM,
    blocks: [
      {
        type: 'paragraph',
        text: 'المستقيم المار بمنتصفي ضلعين في مثلث يوازي الضلع الثالث.',
      },
      {
        type: 'paragraph',
        text: 'القطعة الواصلة بين منتصفي ضلعين في مثلث تساوي نصف طول الضلع الثالث.',
      },
      {
        type: 'math',
        latex: '(MN) \\parallel (BC) \\qquad MN = \\tfrac{1}{2}\\,BC',
        label: 'صياغة رمزية للمبرهنة',
      },
      {
        type: 'figure',
        diagram: figTheoremMidline,
      },
      {
        type: 'callout',
        variant: 'note',
        title: 'معنى الكلمات',
        blocks: [
          {
            type: 'paragraph',
            text: 'قبل أن تكتب النتيجة: اذكر المثلث الذي تعمل فيه، ثم الضلعين ومنتصفيهما، ثم قل إنَّ المستقيمين المذكورين متوازيان.',
          },
        ],
      },
    ],
  },

  /* ───────────────────────────── ص.٣٢ — مثال ────────────────────────────── */
  {
    id: 'l8-step-04-example',
    kicker: 'مثال',
    title: 'تطبيق مباشر على المبرهنة',
    origin: 'source',
    source: P32_EXAMPLE,
    blocks: [
      {
        type: 'paragraph',
        text: L8_EXAMPLE_PROMPT.text,
      },
      {
        type: 'figure',
        diagram: figExampleMidline,
      },
    ],
  },

  /* ────────────────────── شرح المنصّة: حلّ المثال ───────────────────────── */
  teachingExample,

  /* ─────────────────── ص.٣٢ — اكتساب معارف (تطبيق مركّب) ────────────────── */
  {
    id: 'l8-step-05-knowledge',
    kicker: 'اكتساب معارف',
    title: 'كيف نثبت توازي مستقيمين؟',
    origin: 'source',
    source: P32_KNOWLEDGE,
    blocks: [
      {
        type: 'paragraph',
        text: L8_KNOWLEDGE_PROMPT.text,
      },
      {
        type: 'figure',
        diagram: figKnowledgeParallel,
      },
      {
        type: 'callout',
        variant: 'hint',
        title: 'مفتاح الحل',
        blocks: [
          {
            type: 'paragraph',
            text: 'المطلوب توازي $(OB)$ مع $(AI)$. أين المنتصفان في مثلث واحد؟ ابحث عن المثلث الذي تكون فيه $O$ و$B$ منتصفَي ضلعين — لا عن المثلث $ABC$ وحده.',
          },
        ],
      },
    ],
  },

  /* ──────────────────────── ص.٣٣ — الحل المطبوع ─────────────────────────── */
  {
    id: 'l8-step-06-knowledge-solution',
    kicker: 'الحل',
    title: 'الحل كما ورد في الصفحة',
    origin: 'source',
    source: P33_SOLUTION,
    blocks: [
      {
        type: 'paragraph',
        text: L8_KNOWLEDGE_SOLUTION.text,
      },
      {
        type: 'math',
        latex: '(OB) \\parallel (AI)',
        label: 'النتيجة',
      },
      {
        type: 'callout',
        variant: 'note',
        title: 'لماذا يعمل هذا الحل؟',
        blocks: [
          {
            type: 'paragraph',
            text: 'لأنَّ $B$ منتصف $[CI]$ و$O$ منتصف $[AC]$، وهما منتصفا ضلعين في المثلث $ACI$؛ فالقطعة $[OB]$ تصل منتصفي هذين الضلعين، والمبرهنة تنطبق فتضمَن التوازي مع الضلع الثالث $[AI]$.',
          },
        ],
      },
    ],
  },

  /* ───────────────────── ص.٣٣ — تحقّق من فهمك ───────────────────────────── */
  {
    id: 'l8-step-07-check',
    kicker: 'تحقّق من فهمك',
    title: 'خمسة منتصفات على مثلثين',
    origin: 'source',
    source: P33_CHECK,
    blocks: [
      {
        type: 'paragraph',
        text: L8_CHECK_INTRO,
      },
      {
        type: 'figure',
        diagram: figCheckMidpoints,
      },
      {
        type: 'questionGroup',
        items: L8_CHECK_QUESTIONS.map((item) => ({ label: item.label, text: item.text })),
      },
    ],
  },

  /* ─────────────────────────── ص.٣٣ — تدرّب ─────────────────────────────── */
  {
    id: 'l8-step-08-practice',
    kicker: 'تدرّب',
    title: 'ثلاثة تطبيقات مختلفة',
    origin: 'source',
    source: P33_PRACTICE,
    blocks: [
      { type: 'paragraph', text: L8_PRACTICE_ONE.text },
      { type: 'figure', diagram: figPracticeSemicircle },
      { type: 'paragraph', text: L8_PRACTICE_TWO.text },
      { type: 'figure', diagram: figPracticeSymmetric },
      { type: 'paragraph', text: L8_PRACTICE_THREE.text },
      { type: 'figure', diagram: figPracticeRectangle },
    ],
  },

  /* ─────────────────────────── شرح المنصّة: الخلاصة ─────────────────────── */
  teachingRecap,
];
