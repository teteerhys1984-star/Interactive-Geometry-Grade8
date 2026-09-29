import type { LessonInput } from '../schema';
import {
  teachingFromShapeToPoint,
  teachingGridVersusBlankSheet,
  teachingWhyParallelogram,
  teachingTwoCases,
  teachingCompassStepByStep,
  teachingCommonMistakes,
  teachingRecap,
} from './lesson-02-teaching';
import { lesson02Assessment } from './lesson-02-assessment';
import { lesson02TeacherResources } from './lesson-02-teacher';

/**
 * ============================================================================
 *  الوحدة الأولى — الدرس الثاني: «صورة نقطة وفق انسحاب» (صفحات 8–10)
 * ============================================================================
 *
 *  SOURCE FIDELITY
 *  ---------------
 *  Every sentence, question, bullet and item below is reproduced verbatim from
 *  the supplied scans of pages 8, 9 and 10. Nothing is shortened, summarised,
 *  paraphrased, re-ordered, omitted or invented. The printed numbering
 *  (1. 2. 3. and ① ② ③) is preserved exactly as printed.
 *
 *  Notation follows the source's convention:
 *    [AB] segment · (AB) line · AB length · primes for images · (C₁) circles.
 *
 *  FIGURES — two regimes, see docs/LESSON-02-FIGURES.md
 *  ---------------------------------------------------
 *  • The two SQUARED-PAPER figures (page 8 activity, page 10 exercise ③) are
 *    reproduced exactly. Every point sits on an integer lattice node that was
 *    read from the scan and then verified arithmetically (collinearity, shared
 *    rows/columns, and the requirement that all constructed images land on
 *    lattice nodes). They therefore render through the `grid-figure` renderer
 *    with `origin: 'textbook'`.
 *  • The five BLANK-SHEET figures (white-paper activity, the definition
 *    parallelogram, the special case, the worked example and the compass
 *    construction) have no measurable coordinates in the scan, so they remain
 *    faithful `reference` placeholders. Platform-authored, mathematically
 *    exact analogues of the same configurations are offered in the badged
 *    «شرح المنصّة» steps — clearly marked as our drawing, never as the book's.
 *
 *  NO ANSWERS TO PRINTED QUESTIONS ARE SHOWN TO STUDENTS
 *  -----------------------------------------------------
 *  The printed pages carry no answer key. The figures above expose no reveal
 *  controls, precisely so that the activity and the exercises stay open. The
 *  derived solutions live in ./lesson-02-teacher.ts, behind the Teacher Area.
 * ============================================================================
 */

const PAGE_8 = 8;
const PAGE_9 = 9;
const PAGE_10 = 10;

/**
 * Page 8 activity grid — VERIFIED coordinates (origin: bottom-left node).
 *   A (4,1) · B (1,4) · P (2,3) · M (6,2) · N (1,2)
 * Checks: A, P, B satisfy x + y = 5 (the drawn line runs from (0,5) to (5,0));
 * N shares B's column; N and M share a row; and M' = M + (B − A) = (3,5)
 * lands on a lattice node, which is what question 1 asks the student to place.
 */
const gridPage8 = {
  kind: 'interactive' as const,
  origin: 'textbook' as const,
  id: 'fig-8-activity-grid',
  renderer: 'grid-figure',
  alt: 'شبكة سنتيمترية يمرّ فيها مستقيم مائل من أعلى اليسار إلى أسفل اليمين، عليه النقطة $B$ ثم النقطة $P$ ثم النقطة $A$، وخارجه النقطة $N$ على يسار الشبكة والنقطة $M$ على يمينها.',
  caption: 'الشكل المرافق للنشاط، صفحة ٨ — مُعاد رسمه بالإحداثيات نفسها.',
  source: { page: PAGE_8, locator: 'شكل النشاط — على ورقة سنتيمترية' },
  params: {
    cols: 9,
    rows: 5,
    gridStyle: 'dashed',
    segments: [{ from: [0, 5], to: [5, 0] }],
    points: [
      { x: 1, y: 4, label: 'B', tone: 'ink', placement: 'below-start' },
      { x: 2, y: 3, label: 'P', tone: 'mark', placement: 'above-end' },
      { x: 1, y: 2, label: 'N', tone: 'mark', placement: 'below-start' },
      { x: 4, y: 1, label: 'A', tone: 'ink', placement: 'below' },
      { x: 6, y: 2, label: 'M', tone: 'mark', placement: 'above-end' },
    ],
    reveals: [],
    extend: { start: 0, end: 0, bottom: 0, top: 0 },
  },
};

/**
 * Page 10, exercise ③ grid — VERIFIED coordinates (origin: bottom-left node).
 *   M (7,6) · N (3,5) · A (4,4) · B (2,1) · P' (3,1) · Q' (5,1)
 * Checks: N and P' share a column; A is one column right of N; the gap B→P' is
 * one cell and P'→Q' is two; and with v = B − A = (−2,−3) every image the
 * exercise asks for — M' (5,3), M'' (3,0), N' (1,2), P (5,4) — lands exactly on
 * a lattice node inside the printed sheet.
 */
const gridPage10 = {
  kind: 'interactive' as const,
  origin: 'textbook' as const,
  id: 'fig-10-exercise-3-grid',
  renderer: 'grid-figure',
  alt: 'شبكة مربّعة من سبعة أعمدة وستة أسطر، عليها النقطة $M$ في الزاوية العليا اليمنى، والنقطة $N$ تحتها إلى اليسار، والنقطة $A$ في الوسط، وفي السطر السفلي النقاط $B$ ثم $P$ ثم $Q$ بالترتيب.',
  caption: 'شبكة التمرين ③، صفحة ١٠ — مُعاد رسمها بالإحداثيات نفسها.',
  source: { page: PAGE_10, locator: 'تدرّب — التمرين ③' },
  params: {
    cols: 7,
    rows: 6,
    gridStyle: 'solid',
    segments: [],
    points: [
      { x: 7, y: 6, label: 'M', tone: 'ink', placement: 'above-start' },
      { x: 3, y: 5, label: 'N', tone: 'ink', placement: 'above-start' },
      { x: 4, y: 4, label: 'A', tone: 'ink', placement: 'below-end' },
      { x: 2, y: 1, label: 'B', tone: 'ink', placement: 'below-start' },
      { x: 3, y: 1, label: "P'", tone: 'ink', placement: 'below-end' },
      { x: 5, y: 1, label: "Q'", tone: 'ink', placement: 'below-end' },
    ],
    reveals: [],
    extend: { start: 0, end: 0, bottom: 0, top: 0 },
  },
};

export const lesson02: LessonInput = {
  id: 'lesson-02-image-of-a-point',
  title: 'صورة نقطة وفق انسحاب',
  source: { page: '8–10', locator: 'الدرس الثاني' },

  // The textbook prints no summary, objectives or vocabulary list for this
  // lesson either. Those fields stay absent rather than being invented.

  steps: [
    /* ── شرح المنصّة ── */
    teachingFromShapeToPoint,

    /* ==================================================================
     *  STEP — page 8: نشاط · 1. على ورقة سنتيمترية
     * ================================================================== */
    {
      id: 'step-01-activity-squared-paper',
      kicker: 'نشاط « رسم صورة نقطة وفق انسحاب، باستخدام أدوات هندسية»',
      title: '1. على ورقة سنتيمترية',
      source: { page: PAGE_8, locator: 'نشاط — 1' },
      blocks: [
        { type: 'figure', diagram: gridPage8 },
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
      ],
    },

    /* ==================================================================
     *  STEP — page 8: نشاط · 2. على ورقة بيضاء
     * ================================================================== */
    {
      id: 'step-02-activity-blank-paper',
      kicker: 'نشاط « رسم صورة نقطة وفق انسحاب، باستخدام أدوات هندسية»',
      title: '2. على ورقة بيضاء',
      source: { page: PAGE_8, locator: 'نشاط — 2' },
      blocks: [
        {
          type: 'figure',
          diagram: {
            kind: 'reference',
            id: 'fig-8-blank-sheet',
            alt: 'مستقيم مائل صاعد نحو اليمين تقع عليه النقطة $A$ في أعلاه والنقطة $B$ تحتها والنقطة $N$ تحتهما، والنقطة $M$ خارج المستقيم على يساره.',
            caption: 'الشكل المرافق للنشاط على ورقة بيضاء، صفحة ٨',
            source: { page: PAGE_8, locator: 'شكل النشاط — على ورقة بيضاء' },
            reason:
              'الشكل مرسوم على ورقة بيضاء بلا شبكة، فلا توجد إحداثيات يمكن قياسها من المسح؛ إعادة رسمه تعني اختراع مواضع لم يطبعها الكتاب.',
          },
        },
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

    /* ── شرح المنصّة ── */
    teachingGridVersusBlankSheet,

    /* ==================================================================
     *  STEP — page 8: تعلّم · تعريف
     * ================================================================== */
    {
      id: 'step-03-definition',
      kicker: 'تعلّم',
      title: 'تعريف',
      source: { page: PAGE_8, locator: 'تعلّم — تعريف' },
      blocks: [
        {
          type: 'figure',
          diagram: {
            kind: 'reference',
            id: 'fig-8-definition-parallelogram',
            alt: 'مستقيم يمرّ بالنقطتين $A$ و $B$، وفوقه النقطة $M$ ويقابلها على اليمين النقطة $M$ مسطّرة، وقد رُسمت القطعتان المنقّطتان من $M$ إلى $A$ ومن $B$ إلى $M$ مسطّرة لتُكوّن مع القطعة $AB$ متوازي أضلاع.',
            caption: 'شكل التعريف، صفحة ٨',
            source: { page: PAGE_8, locator: 'تعلّم — شكل التعريف' },
            reason:
              'شكل توضيحي على ورقة بيضاء دون شبكة أو قياسات مطبوعة؛ لا يمكن استخراج مواضع نقاطه من المسح، ولا يجوز تخمينها.',
          },
        },
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
      ],
    },

    /* ── شرح المنصّة ── */
    teachingWhyParallelogram,

    /* ==================================================================
     *  STEP — page 9: حالة خاصة
     * ================================================================== */
    {
      id: 'step-04-special-case',
      kicker: 'تعلّم',
      title: 'حالة خاصة',
      source: { page: PAGE_9, locator: 'حالة خاصة' },
      blocks: [
        {
          type: 'figure',
          diagram: {
            kind: 'reference',
            id: 'fig-9-special-case',
            alt: 'مستقيم واحد مائل نازل نحو اليمين، عليه بالترتيب النقاط $A$ ثم $M$ ثم $I$ ثم $B$ ثم $M$ مسطّرة.',
            caption: 'شكل الحالة الخاصة، صفحة ٩',
            source: { page: PAGE_9, locator: 'شكل الحالة الخاصة' },
            reason:
              'الشكل مرسوم على مستقيم دون شبكة أو قياسات؛ ترتيب النقاط مقروء لكن مواضعها ليست قابلة للقياس من المسح.',
          },
        },
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

    /* ── شرح المنصّة ── */
    teachingTwoCases,

    /* ==================================================================
     *  STEP — page 9: اكتساب معارف · مثال
     * ================================================================== */
    {
      id: 'step-05-knowledge-example',
      kicker: 'اكتسـاب معارف',
      title: 'كيف نرسم صورة نقطة؟',
      source: { page: PAGE_9, locator: 'اكتساب معارف — مثال' },
      blocks: [
        {
          type: 'figure',
          diagram: {
            kind: 'reference',
            id: 'fig-9-example-given',
            alt: 'قطعة مستقيمة أفقية طرفاها $H$ على اليسار و $G$ على اليمين، وتحتها إلى اليسار النقطة $M$ منفردة.',
            caption: 'معطيات المثال، صفحة ٩',
            source: { page: PAGE_9, locator: 'شكل المثال' },
            reason:
              'معطيات مرسومة على ورقة بيضاء؛ المسافات بين $H$ و $G$ و $M$ غير مقيسة في الكتاب ولا يمكن استنتاجها من المسح.',
          },
        },
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
     *  STEP — page 9: طريقة الإنشاء
     * ================================================================== */
    {
      id: 'step-06-construction-method',
      kicker: 'اكتسـاب معارف',
      title: 'طريقة الإنشاء',
      source: { page: PAGE_9, locator: 'طريقة الإنشاء' },
      blocks: [
        {
          type: 'figure',
          diagram: {
            kind: 'reference',
            id: 'fig-9-compass-construction',
            alt: 'القطعة $HG$ أفقية، ومنها ينطلق إنشاء بالفرجار: قوسان متقاطعان أحدهما مركزه $M$ والآخر مركزه $H$، ويتقاطعان عند النقطة $M$ مسطّرة أسفل يسار القطعة، مع خطوط منقّطة نحو النقطة $M$ على اليمين.',
            caption: 'شكل طريقة الإنشاء، صفحة ٩',
            source: { page: PAGE_9, locator: 'شكل الإنشاء بالفرجار' },
            reason:
              'الشكل إنشائي على ورقة بيضاء؛ أنصاف أقطار الدائرتين تُؤخذ بفتحة الفرجار من معطيات غير مقيسة، فلا يمكن إعادة رسمه بأمانة دون اختراع أطوال.',
          },
        },
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
     *  STEP — page 9: التعليل
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

    /* ── شرح المنصّة ── */
    teachingCompassStepByStep,

    /* ==================================================================
     *  STEP — page 10: تحقّق من فهمك
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
      ],
    },

    /* ── شرح المنصّة ── */
    teachingCommonMistakes,

    /* ==================================================================
     *  STEP — page 10: تدرّب ①
     * ================================================================== */
    {
      id: 'step-09-practice-1',
      kicker: 'تدرّب',
      title: 'التمرين ①',
      source: { page: PAGE_10, locator: 'تدرّب — ①' },
      blocks: [
        {
          type: 'paragraph',
          text: 'ارسم مثلثاً $ABC$، ثم ارسم باستعمال الفرجار:',
        },
        {
          type: 'questionGroup',
          items: [
            {
              label: '1.',
              text: 'النقطة $E$، صورة $A$ وفق الانسحاب الذي ينقل $B$ إلى $C$.',
            },
            {
              label: '2.',
              text: 'النقطة $F$، صورة $E$ وفق الانسحاب الذي ينقل $C$ إلى $A$.',
            },
            {
              label: '3.',
              text: 'النقطة $G$، صورة $F$ وفق الانسحاب الذي ينقل $A$ إلى $B$.',
            },
          ],
        },
      ],
    },

    /* ==================================================================
     *  STEP — page 10: تدرّب ②
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
            {
              label: '1.',
              text: 'صورة النقطة $D$ وفق الانسحاب الذي ينقل $A$ إلى $B$ هي ...',
            },
            {
              label: '2.',
              text: 'وفق الانسحاب الذي ينقل $C$ إلى ... ، $A$ هي صورة $D$.',
            },
            {
              label: '3.',
              text: 'وفق الانسحاب الذي ينقل $M$ إلى $A$ ، ... هي صورة $C$.',
            },
          ],
        },
      ],
    },

    /* ==================================================================
     *  STEP — page 10: تدرّب ③
     * ================================================================== */
    {
      id: 'step-11-practice-3',
      kicker: 'تدرّب',
      title: 'التمرين ③',
      source: { page: PAGE_10, locator: 'تدرّب — ③' },
      blocks: [
        {
          type: 'paragraph',
          text: 'انسخ الشبكة الآتية على صفحةٍ من دفترك:',
        },
        { type: 'figure', diagram: gridPage10 },
        {
          type: 'questionGroup',
          items: [
            {
              label: '1.',
              text: "وفق الانسحاب الذي ينقل $A$ إلى $B$: ① وضَعْ $M'$ صورة $M$. ② وضَعْ $M''$ صورة $M'$. ③ وضَعْ $N'$ صورة $N$.",
            },
            {
              label: '2.',
              text: "وفق الانسحاب الذي ينقل $B$ إلى $A$، وضَعْ $N''$ صورة $N'$.",
            },
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
      ],
    },

    /* ── شرح المنصّة ── */
    teachingRecap,
  ],

  assessment: lesson02Assessment,
  teacherResources: lesson02TeacherResources,
};
