import type { LessonInput } from '../schema';
import {
  teachingHook,
  teachingReadingTheVector,
  teachingNoGrid,
  teachingWhyParallelogram,
  teachingTwoCases,
  teachingWhyConstruction,
  teachingRecap,
} from './lesson-02-teaching';
import {
  figBlankSheet,
  figCompassConstruction,
  figCompassGiven,
  figDefinition,
  figPage8Grid,
  figPage10Grid,
  figPracticeGrid,
  figPracticeParallelogram,
  figPracticeTriangle,
  figSpecialCase,
} from './lesson-02-figures';
import { lesson02Assessment } from './lesson-02-assessment';
import { lesson02TeacherResources } from './lesson-02-teacher';

/**
 * ============================================================================
 *  الوحدة الأولى — الدرس الثاني: «صورة نقطة وفق انسحاب» (صفحات 8–10)
 * ============================================================================
 *
 *  SOURCE FIDELITY
 *  ---------------
 *  Every printed sentence, question, bullet and item below is reproduced
 *  verbatim from the supplied scans of pages 8, 9 and 10. Nothing is shortened,
 *  summarised, paraphrased, re-ordered, omitted or invented. The printed
 *  numbering (1. 2. 3. and ① ② ③) is preserved exactly as printed. The eleven
 *  `step-NN-…` ids are unchanged, so a regression in source order fails the
 *  existing fidelity suite.
 *
 *  Notation follows the source's convention:
 *    [AB] segment · (AB) line · AB length · primes for images · (𝒞₁) circles.
 *
 *  FIGURES — see docs/LESSON-02-FIGURES.md
 *  --------------------------------------
 *  All figures now live in ./lesson-02-figures.ts. Two regimes:
 *  • `origin: 'textbook'` — the two squared-paper sheets (page 8 activity,
 *    page 10 exercise ③), reproduced on the same lattice with the same points.
 *  • `origin: 'authored'` — the blank-sheet configurations (activity 2, the
 *    definition, the special case, the compass example and construction). These
 *    keep every printed relation (incidence, order, equalities, which
 *    intersection is retained) and are captioned «رسم تعليمي من إعداد المنصّة».
 *    The previous `reference` placeholders are gone: the lesson now draws the
 *    figure instead of apologising for it.
 *
 *  ANSWERS TO PRINTED QUESTIONS
 *  ----------------------------
 *  The printed pages carry no answer key. No student block below states an
 *  answer to a printed question. The interactive labs answer a student's own
 *  attempt (method first, result only on success), and the derived solutions
 *  live in ./lesson-02-teacher.ts, behind the Teacher Area.
 * ============================================================================
 */

const PAGE_8 = 8;
const PAGE_9 = 9;
const PAGE_10 = 10;

export const lesson02: LessonInput = {
  id: 'lesson-02-image-of-a-point',
  title: 'صورة نقطة وفق انسحاب',
  source: { page: '8–10', locator: 'الدرس الثاني' },

  // The textbook prints no summary, objectives or vocabulary list for this
  // lesson either. Those fields stay absent rather than being invented.

  steps: [
    /* ── 1 · شرح المنصّة — الانطلاقة ── */
    teachingHook,

    /* ==================================================================
     *  2 · STEP — page 8: نشاط · 1. على ورقة سنتيمترية
     * ================================================================== */
    {
      id: 'step-01-activity-squared-paper',
      kicker: 'نشاط « رسم صورة نقطة وفق انسحاب، باستخدام أدوات هندسية »',
      title: '1. على ورقة سنتيمترية',
      source: { page: PAGE_8, locator: 'نشاط — 1' },
      blocks: [
        { type: 'figure', diagram: figPage8Grid },
        {
          type: 'questionGroup',
          items: [
            {
              label: '1.',
              text: "انقل الشكل المرافق إلى ورقة سنتيمترية. وضَعِ النقطة $M'$ التي تجعل الرباعي $ABM'M$ متوازي أضلاع.",
            },
            {
              label: '2.',
              text: 'ما صورة النقطة $M$ وفق الانسحاب الذي ينقل النقطة $A$ إلى النقطة $B$؟',
            },
            {
              label: '3.',
              text: "وضَعْ وفق هذا الانسحاب: ① $N'$ صورة النقطة $N$ ② $P'$ صورة النقطة $P$",
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'الشبكة أعلاه هي الشكل المطبوع نفسه، بلا أي إضافة. جرّب الحل على ورقتك أولاً، ثم انتقل إلى الخطوة التالية لتضع النقاط بنفسك على الشبكة نفسها.',
        },
      ],
    },

    /* ── 3 · شرح المنصّة — قراءة الانسحاب ── */
    teachingReadingTheVector,

    /* ==================================================================
     *  4 · STEP — page 8: نشاط · 2. على ورقة بيضاء
     * ================================================================== */
    {
      id: 'step-02-activity-blank-paper',
      kicker: 'نشاط « رسم صورة نقطة وفق انسحاب، باستخدام أدوات هندسية »',
      title: '2. على ورقة بيضاء',
      source: { page: PAGE_8, locator: 'نشاط — 2' },
      blocks: [
        { type: 'figure', diagram: figBlankSheet },
        {
          type: 'questionGroup',
          items: [
            { label: '1.', text: 'انقل الشكل المرافق إلى ورقة بيضاء.' },
            {
              label: '2.',
              text: "ليكن $T$ الانسحاب الذي ينقل النقطة $A$ إلى النقطة $B$. وفق هذا الانسحاب، استعمل الأدوات الهندسية لرسم النقطة $M'$ صورة النقطة $M$، والنقطة $N'$ صورة النقطة $N$. اشرح العمل الذي قمت به.",
            },
          ],
        },
      ],
    },

    /* ── 5 · شرح المنصّة — حين تختفي المربّعات ── */
    teachingNoGrid,

    /* ==================================================================
     *  6 · STEP — page 8: تعلّم · تعريف
     * ================================================================== */
    {
      id: 'step-03-definition',
      kicker: 'تعلّم',
      title: 'تعريف',
      source: { page: PAGE_8, locator: 'تعلّم — تعريف' },
      blocks: [
        { type: 'figure', diagram: figDefinition },
        {
          type: 'callout',
          variant: 'definition',
          title: 'تعريف:',
          blocks: [
            {
              type: 'paragraph',
              text: "القول إنَّ « النقطة $M'$ هي صورة النقطة $M$ التي لا تنتمي إلى المستقيم $(AB)$، وفق الانسحاب الذي ينقل النقطة $A$ إلى النقطة $B$ » يعني أنَّ « الرباعي $ABM'M$ متوازي أضلاع » ويترتب على ذلك أنَّ القطعتين $[AM']$ و $[BM]$ متناصفتان.",
            },
          ],
        },
        {
          type: 'paragraph',
          text: "على الشكل: القطعتان المتقاطعتان هما القطران، ونقطة تقاطعهما $I$ منتصف لكلٍّ منهما. لاحظ الترتيب $A$ ثم $B$ ثم $M'$ ثم $M$: هو ما يحدّد القطرين.",
        },
      ],
    },

    /* ── 7 · شرح المنصّة — لماذا متوازي الأضلاع ── */
    teachingWhyParallelogram,

    /* ==================================================================
     *  8 · STEP — page 9: حالة خاصة
     * ================================================================== */
    {
      id: 'step-04-special-case',
      kicker: 'تعلّم',
      title: 'حالة خاصة',
      source: { page: PAGE_9, locator: 'حالة خاصة' },
      blocks: [
        { type: 'figure', diagram: figSpecialCase },
        {
          type: 'callout',
          variant: 'note',
          title: 'حالة خاصة:',
          blocks: [
            {
              type: 'paragraph',
              text: "في حالة النقطة $M$ تنتمي إلى المستقيم $(AB)$، تكون النقاط $A$ و $B$ و $M'$ و $M$ على استقامة واحدة، وتكون القطعتان $[AM']$ و $[BM]$ متناصفتين.",
            },
          ],
        },
      ],
    },

    /* ── 9 · شرح المنصّة — الحالتان ── */
    teachingTwoCases,

    /* ==================================================================
     *  10 · STEP — page 9: اكتساب معارف · مثال
     * ================================================================== */
    {
      id: 'step-05-knowledge-example',
      kicker: 'اكتسـاب معارف',
      title: 'كيف نرسم صورة نقطة؟',
      source: { page: PAGE_9, locator: 'اكتساب معارف — مثال' },
      blocks: [
        { type: 'figure', diagram: figCompassGiven },
        {
          type: 'callout',
          variant: 'example',
          title: 'مثال',
          blocks: [
            {
              type: 'paragraph',
              text: "ارسمْ ( مستخدماً الفرجار ) النقطة $M'$ صورة النقطة $M$ وفق الانسحاب الذي ينقل النقطة $G$ إلى النقطة $H$.",
            },
          ],
        },
        {
          type: 'callout',
          variant: 'hint',
          title: 'تذكَّر:',
          blocks: [
            {
              type: 'paragraph',
              text: 'في الإنشاء الهندسي، نستعمل فقط فرجاراً ومسطرةً غير مدرجة.',
            },
          ],
        },
      ],
    },

    /* ==================================================================
     *  11 · STEP — page 9: طريقة الإنشاء
     * ================================================================== */
    {
      id: 'step-06-construction-method',
      kicker: 'اكتسـاب معارف',
      title: 'طريقة الإنشاء',
      source: { page: PAGE_9, locator: 'طريقة الإنشاء' },
      blocks: [
        { type: 'figure', diagram: figCompassConstruction },
        {
          type: 'list',
          ordered: false,
          items: [
            "لنكمل $HGM$ إلى متوازي أضلاع $HGMM'$.",
            'نرسم الدائرة $(\\mathcal{C}_1)$ التي مركزها $M$ و نصف قطرها يساوي $GH$ (فتحة الفرجار)',
            'نرسم الدائرة $(\\mathcal{C}_2)$ التي مركزها $H$ و نصف قطرها يساوي $GM$ (فتحة الفرجار)',
            "تتقاطع الدائرتان في نقطتين. نختار النقطة التي تكمل $HGM$ إلى رباعي. فتكون النقطة $M'$ هي صورة النقطة $M$.",
          ],
        },
      ],
    },

    /* ==================================================================
     *  12 · STEP — page 9: التعليل
     * ================================================================== */
    {
      id: 'step-07-justification',
      kicker: 'اكتسـاب معارف',
      title: 'التعليل:',
      source: { page: PAGE_9, locator: 'التعليل' },
      blocks: [
        { type: 'math', latex: "MM' = GH", label: 'نصف قطر الدائرة الأولى' },
        { type: 'math', latex: "HM' = GM", label: 'نصف قطر الدائرة الثانية' },
        {
          type: 'paragraph',
          text: "فالرباعي $HGMM'$ متوازي أضلاع، ويترتب على ذلك أنَّ $M'$ هي صورة $M$.",
        },
      ],
    },

    /* ── 13 · شرح المنصّة — البرهان الكامل ── */
    teachingWhyConstruction,

    /* ==================================================================
     *  14 · STEP — page 10: تحقّق من فهمك
     * ================================================================== */
    {
      id: 'step-08-check-understanding',
      kicker: 'تحقّق من فهمك',
      title: 'أكمل العبارتين',
      source: { page: PAGE_10, locator: 'تحقّق من فهمك' },
      blocks: [
        {
          type: 'paragraph',
          text: 'في كلٍ من الحالتين الآتيتين، ارسم الشكل الموافق ثم أكمل العبارتين الآتيتين:',
        },
        {
          type: 'questionGroup',
          items: [
            {
              label: '1.',
              text: '$N$ هي صورة $M$ وفق الانسحاب الذي ينقل $P$ إلى $Q$ والنقطة $M$ لا تقع على $(PQ)$، إذن ........ هو متوازي أضلاع.',
            },
            {
              label: '2.',
              text: 'وفق الانسحاب الذي ينقل $J$ إلى $K$، $R$ هي صورة $T$ والنقطة $T$ لا تقع على $(JK)$، إذن ........ هو متوازي أضلاع.',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'تلميح عن الطريقة: اكتب الرؤوس الأربعة بترتيب العبارة نفسها — نقطة الانسحاب، صورتها، النقطة، صورتها — ثم اقرأ الرباعي. الحل الكامل مع التعليل في مساحة المعلّم.',
        },
      ],
    },

    /* ==================================================================
     *  15 · STEP — page 10: تدرّب ①
     * ================================================================== */
    {
      id: 'step-09-practice-1',
      kicker: 'تدرّب',
      title: 'التمرين ①',
      source: { page: PAGE_10, locator: 'تدرّب — ①' },
      blocks: [
        { type: 'paragraph', text: 'ارسم مثلثاً $ABC$، ثم ارسم باستعمال الفرجار:' },
        {
          type: 'questionGroup',
          items: [
            { label: '1.', text: 'النقطة $E$، صورة $A$ وفق الانسحاب الذي ينقل $B$ إلى $C$.' },
            { label: '2.', text: 'النقطة $F$، صورة $E$ وفق الانسحاب الذي ينقل $C$ إلى $A$.' },
            { label: '3.', text: 'النقطة $G$، صورة $F$ وفق الانسحاب الذي ينقل $A$ إلى $B$.' },
          ],
        },
        {
          type: 'paragraph',
          text: 'الرسم التالي نموذج من إعداد المنصّة لمثلث بمعطياتنا، لأن الكتاب لا يطبع أطوالاً لهذا المثلث. استعمله للتحقّق من طريقة الإنشاء، لا كبديل عن إنشائك.',
        },
        { type: 'figure', diagram: figPracticeTriangle },
      ],
    },

    /* ==================================================================
     *  16 · STEP — page 10: تدرّب ②
     * ================================================================== */
    {
      id: 'step-10-practice-2',
      kicker: 'تدرّب',
      title: 'التمرين ②',
      source: { page: PAGE_10, locator: 'تدرّب — ②' },
      blocks: [
        {
          type: 'paragraph',
          text: 'ارسم متوازي أضلاع $ABCD$ مركزه $M$، ثم انقل العبارات الآتية إلى دفترك وأكملها:',
        },
        {
          type: 'questionGroup',
          items: [
            { label: '1.', text: 'صورة النقطة $D$ وفق الانسحاب الذي ينقل $A$ إلى $B$ هي ...' },
            { label: '2.', text: 'وفق الانسحاب الذي ينقل $C$ إلى ... ، $A$ هي صورة $D$.' },
            { label: '3.', text: 'وفق الانسحاب الذي ينقل $M$ إلى $A$ ، ... هي صورة $C$.' },
          ],
        },
        {
          type: 'paragraph',
          text: 'الرسم التالي متوازي أضلاع من إعداد المنصّة. اختر كل حركة لترى الصورة على الشكل، ثم صُغ العبارة بنفسك قبل أن تفتح أي حل.',
        },
        { type: 'figure', diagram: figPracticeParallelogram },
      ],
    },

    /* ==================================================================
     *  17 · STEP — page 10: تدرّب ③
     * ================================================================== */
    {
      id: 'step-11-practice-3',
      kicker: 'تدرّب',
      title: 'التمرين ③',
      source: { page: PAGE_10, locator: 'تدرّب — ③' },
      blocks: [
        { type: 'paragraph', text: 'انسخ الشبكة الآتية على صفحةٍ من دفترك:' },
        { type: 'figure', diagram: figPage10Grid },
        {
          type: 'questionGroup',
          items: [
            {
              label: '1.',
              text: "وفق الانسحاب الذي ينقل $A$ إلى $B$: ① وضَعْ $M'$ صورة $M$. ② وضَعْ $M''$ صورة $M'$. ③ وضَعْ $N'$ صورة $N$.",
            },
            { label: '2.', text: "وفق الانسحاب الذي ينقل $B$ إلى $A$، وضَعْ $N''$ صورة $N'$." },
            {
              label: '3.',
              text: "$P'$ هي صورة $P$ وفق الانسحاب الذي ينقل $A$ إلى $B$. وضَعْ النقطة $P$.",
            },
            {
              label: '4.',
              text: "$Q'$ هي صورة $Q$ وفق الانسحاب الذي ينقل $B$ إلى $A$. وضَعْ النقطة $Q$.",
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'الشبكة التالية هي الشبكة نفسها مع مساحة إضافية أسفلها، لأن بعض النقاط المطلوبة تقع تحت الشبكة المطبوعة. ضع النقاط واحدة واحدة؛ إن أخطأت تحصل على تلميح عن طريقة العدّ لا على الجواب.',
        },
        { type: 'figure', diagram: figPracticeGrid },
      ],
    },

    /* ── 18 · شرح المنصّة — الخلاصة ── */
    teachingRecap,
  ],

  assessment: lesson02Assessment,
  teacherResources: lesson02TeacherResources,
};
