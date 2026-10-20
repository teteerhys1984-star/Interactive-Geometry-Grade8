import type { ContentBlock, LessonInput } from '../schema';
import {
  teachingConstructionSequence,
  teachingGroupedChallenges,
  teachingLessonThreeRecap,
  teachingShapeAsPoints,
  teachingShapeExplorer,
  teachingWhyLineStaysParallel,
} from './lesson-03-teaching';
import { lesson03Assessment } from './lesson-03-assessment';
import { lesson03TeacherResources } from './lesson-03-teacher';

/**
 * Unit 1 — Lesson 3: «صورة شكل وفق انسحاب» (textbook pages 11–16).
 *
 * Source steps preserve the supplied scans in printed order. Printed figures
 * are exact crops of those scans; no unmeasured textbook geometry is redrawn.
 * Platform-made explanations and interactions are explicitly badged.
 */
const PAGE_11 = 11;
const PAGE_12 = 12;
const PAGE_13 = 13;
const PAGE_14 = 14;
const PAGE_15 = 15;
const PAGE_16 = 16;

/** Exact crops of the supplied textbook scans; never redraw unmeasured source geometry. */
function textbookFigure(
  id: string,
  page: number,
  locator: string,
  file: string,
  alt: string,
  caption: string,
): ContentBlock {
  return {
    type: 'figure',
    diagram: {
      kind: 'image',
      origin: 'textbook',
      id,
      src: `diagrams/unit-01/lesson-03/${file}`,
      alt,
      caption,
      source: { page, locator },
    },
  };
}

export const lesson03: LessonInput = {
  id: 'lesson-03-image-of-a-shape',
  title: 'صورة شكل وفق انسحاب',
  source: { page: '11–16', locator: 'الدرس الثالث' },
  steps: [
    teachingShapeAsPoints,

    /* ============================== صفحة 11 — النشاط: تخمين ============================== */
    {
      id: 'step-01-line-image-conjecture',
      kicker:
        'نشاط « رسم صورة مستقيم وفق انسحاب باستعمال أدوات هندسية، وإثبات أن المستقيم وصورته متوازيان »',
      title: '1. تخمين',
      source: { page: PAGE_11, locator: 'نشاط — 1. تخمين' },
      blocks: [
        {
          type: 'callout',
          variant: 'hint',
          blocks: [
            {
              type: 'paragraph',
              text: 'وفق الانسحاب، أي شكل وصورته قابلان للانطباق، فصورة مستقيم هي مستقيم.',
            },
          ],
        },
        textbookFigure(
          'fig-11-line-conjecture-case-1',
          PAGE_11,
          'نشاط — 1. تخمين — الشكل ①',
          'fig-11-conjecture-case-1.png',
          'الشكل ①: المستقيم $(d)$ مائل، والقطعة المنقطة تصل $A$ بـ $B$.',
          'الشكل ① من نشاط التخمين — الكتاب، صفحة ١١',
        ),
        textbookFigure(
          'fig-11-line-conjecture-case-2',
          PAGE_11,
          'نشاط — 1. تخمين — الشكل ②',
          'fig-11-conjecture-case-2.png',
          'الشكل ②: المستقيم $(d)$ موازٍ لاتجاه السهم من $A$ إلى $B$.',
          'الشكل ② من نشاط التخمين — الكتاب، صفحة ١١',
        ),
        {
          type: 'questionGroup',
          items: [
            {
              label: '1.',
              text: "انقل الشكلين التاليين ① و ② إلى صفحة بيضاء. وفي كل حالة، ارسم $(d')$ صورة المستقيم $(d)$ وفق الانسحاب الذي ينقل النقطة $A$ إلى النقطة $B$.",
            },
            {
              label: '2.',
              text: "ما وضع المستقيمين $(d)$ و $(d')$ في كل حالة؟",
            },
          ],
        },
      ],
    },

    /* ============================== صفحة 11 — النشاط: إثبات ============================== */
    {
      id: 'step-02-line-image-proof',
      kicker: 'نشاط',
      title: '2. إثبات: حالة مستقيمين غير متوازيين',
      source: { page: PAGE_11, locator: 'نشاط — 2. إثبات' },
      blocks: [
        {
          type: 'paragraph',
          text: '2. إثبات: حالة $(d)$ و $(AB)$ غير متوازيين',
        },
        textbookFigure(
          'fig-11-line-proof',
          PAGE_11,
          'نشاط — 2. إثبات — الشكل المرافق',
          'fig-11-line-proof.png',
          'المستقيم $(d)$ يمر بالنقطة $C$، والنقطتان $A$ و$B$ خارج المستقيم؛ ويُنشأ $E$ عند تقاطع $(d)$ و$(AB)$.',
          'الشكل المرافق للبرهان — الكتاب، صفحة ١١',
        ),
        {
          type: 'questionGroup',
          items: [
            {
              label: '1.',
              text: 'انقل الشكل المرافق إلى صفحة بيضاء، وضَعْ $E$ نقطة تقاطع المستقيمين $(d)$ و $(AB)$.',
            },
            {
              label: '2.',
              text: "ارسم، وفق الانسحاب الذي ينقل $A$ إلى $B$: $C'$ صورة النقطة $C$ من $(d)$ و $E'$ صورة $E$.",
            },
            {
              label: '3.',
              text: "لماذا النقطة $E'$ واقعة على المستقيم $(AB)$؟",
            },
            {
              label: '4.',
              text: "لماذا الرباعي $CC'E'E$ هو متوازي أضلاع؟",
            },
            {
              label: '5.',
              text: "استنتج أن المستقيم $(d)$ وصورته $(C'E')$ متوازيان.",
            },
          ],
        },
        {
          type: 'callout',
          variant: 'hint',
          blocks: [
            {
              type: 'paragraph',
              text: 'في الرياضيات، وبشكل خاص في الهندسة، لا يجوز استنتاج الإجابة من الشكل، بل يجب أن تتم الإجابة بالبرهان عبر سلسلة من الاستنتاجات.',
            },
          ],
        },
      ],
    },

    teachingWhyLineStaysParallel,

    /* ============================== صفحة 12 — صور أشكال أساسية ============================== */
    {
      id: 'step-03-segment-ray-circle-activity',
      kicker: '3. صورة: قطعة مستقيمة، نصف مستقيم، دائرة',
      title: 'ارسم صور الأشكال الثلاثة',
      source: { page: PAGE_12, locator: 'النشاط — 3' },
      blocks: [
        textbookFigure(
          'fig-12-segment-activity',
          PAGE_12,
          'النشاط 3 — الشكل ①',
          'fig-12-segment-activity.png',
          'القطعة $[MN]$ طولها $3.4\\,cm$، ومعها النقطتان $A$ و$B$.',
          'الشكل ①: صورة قطعة مستقيمة — الكتاب، صفحة ١٢',
        ),
        textbookFigure(
          'fig-12-ray-activity',
          PAGE_12,
          'النشاط 3 — الشكل ②',
          'fig-12-ray-activity.png',
          'نصف المستقيم $[Dx)$ ومعه النقطتان $A$ و$B$.',
          'الشكل ②: صورة نصف مستقيم — الكتاب، صفحة ١٢',
        ),
        textbookFigure(
          'fig-12-circle-activity',
          PAGE_12,
          'النشاط 3 — الشكل ③',
          'fig-12-circle-activity.png',
          'الدائرة $\\mathcal{C}$ مركزها $O$ ونصف قطرها $3.2\\,cm$، ومعها النقطتان $A$ و$B$.',
          'الشكل ③: صورة دائرة — الكتاب، صفحة ١٢',
        ),
        {
          type: 'questionGroup',
          items: [
            {
              label: '3.',
              text: 'انقل الأشكال ① و ② و ③ إلى صفحة بيضاء. وفي كل حالة، ارسم صورة الشكل وفق الانسحاب الذي ينقل النقطة $A$ إلى النقطة $B$.',
            },
          ],
        },
      ],
    },

    /* ============================== صفحة 12 — تعلّم ============================== */
    {
      id: 'step-04-image-of-a-line-rule',
      kicker: 'تعلّم',
      title: 'صورة مستقيم',
      source: { page: PAGE_12, locator: 'تعلّم — صورة مستقيم' },
      blocks: [
        {
          type: 'callout',
          variant: 'theorem',
          blocks: [
            {
              type: 'paragraph',
              text: "صورة المستقيم $(d)$ وفق أي انسحاب هي مستقيم $(d')$ يوازي $(d)$.",
            },
          ],
        },
      ],
    },
    {
      id: 'step-05-construct-line-image-nonparallel',
      kicker: 'إنشاء صورة مستقيم وفق انسحاب',
      title: 'أولاً: الحالة غير المتوازية',
      source: { page: PAGE_12, locator: 'إنشاء صورة مستقيم — الحالة الأولى' },
      blocks: [
        {
          type: 'paragraph',
          text: 'إنشاء صورة مستقيم $(d)$ وفق الانسحاب الذي ينقل $A$ إلى $B$',
        },
        { type: 'paragraph', text: 'أولاً: حالة $(d)$ لا يوازي $(AB)$:' },
        textbookFigure(
          'fig-12-line-construction-nonparallel',
          PAGE_12,
          'إنشاء صورة مستقيم — الحالة الأولى',
          'fig-12-line-construction-oblique.png',
          'مستقيم $(d)$ غير موازٍ لـ $(AB)$، وعليه النقطتان $M$ و$N$ وصورتاهما $M\\prime$ و$N\\prime$.',
          'إنشاء صورة مستقيم — الحالة الأولى — الكتاب، صفحة ١٢',
        ),
        {
          type: 'paragraph',
          text: "نختار نقطتين $M$ و $N$ من المستقيم $(d)$ ونرسم صورتيهما $M'$ و $N'$ وفق الانسحاب الذي ينقل $A$ إلى $B$. فيكون المستقيم $(d')$ المار بالنقطتين $M'$ و $N'$ صورة $(d)$.",
        },
      ],
    },
    {
      id: 'step-06-construct-line-image-parallel',
      kicker: 'إنشاء صورة مستقيم وفق انسحاب',
      title: 'ثانياً: الحالة المتوازية',
      source: { page: PAGE_12, locator: 'إنشاء صورة مستقيم — الحالة الثانية' },
      blocks: [
        {
          type: 'paragraph',
          text: 'إنشاء صورة مستقيم $(d)$ وفق الانسحاب الذي ينقل $A$ إلى $B$',
        },
        { type: 'paragraph', text: 'ثانياً: حالة $(d)$ يوازي $(AB)$:' },
        textbookFigure(
          'fig-12-line-construction-parallel',
          PAGE_12,
          'إنشاء صورة مستقيم — الحالة الثانية',
          'fig-12-line-construction-parallel.png',
          'المستقيم $(d)$ موازٍ لـ $(AB)$، وصورته $(d\\prime)$ منطبق عليه.',
          'إنشاء صورة مستقيم — الحالة الثانية — الكتاب، صفحة ١٢',
        ),
        {
          type: 'paragraph',
          text: "في هذه الحالة، ينطبق المستقيم $(d)$ على المستقيم $(d')$.",
        },
      ],
    },

    /* ============================== صفحة 13 — التوازي والتعامد ============================== */
    {
      id: 'step-07-parallel-perpendicular-images',
      kicker: 'تعلّم',
      title: 'صورة مستقيمين متوازيين أو متعامدين',
      source: { page: PAGE_13, locator: 'وفق انسحاب' },
      blocks: [
        {
          type: 'callout',
          variant: 'hint',
          title: 'وفق انسحاب:',
          blocks: [
            {
              type: 'list',
              ordered: false,
              items: [
                'صورة مستقيمين متوازيين، هما مستقيمان متوازيان.',
                'صورة مستقيمين متعامدين، هما مستقيمان متعامدان.',
              ],
            },
          ],
        },
        textbookFigure(
          'fig-13-parallel-lines',
          PAGE_13,
          'الشكل ① — صورة مستقيمين متوازيين',
          'fig-13-parallel-lines.png',
          'المستقيمان المتوازيان $(d)$ و$(D)$ وصورتاهما $(d\\prime)$ و$(D\\prime)$ وفق الانتقال من $A$ إلى $B$.',
          'الشكل ①: صورة مستقيمين متوازيين — الكتاب، صفحة ١٣',
        ),
        textbookFigure(
          'fig-13-perpendicular-lines',
          PAGE_13,
          'الشكل ② — صورة مستقيمين متعامدين',
          'fig-13-perpendicular-lines.png',
          'المستقيمان المتعامدان $(d)$ و$(D)$ وصورتاهما $(d\\prime)$ و$(D\\prime)$، مع علامتي الزاوية القائمة.',
          'الشكل ②: صورة مستقيمين متعامدين — الكتاب، صفحة ١٣',
        ),
        {
          type: 'paragraph',
          text: "في الشكل ①: المستقيمان المتوازيان $(d')$ و $(D')$ هما على التوالي صورتا المستقيمين المتوازيين $(d)$ و $(D)$ وفق الانسحاب الذي ينقل $A$ إلى $B$.",
        },
        {
          type: 'paragraph',
          text: "في الشكل ②: المستقيمان المتعامدان $(d')$ و $(D')$ هما على التوالي صورتا المستقيمين المتعامدين $(d)$ و $(D)$ وفق الانسحاب الذي ينقل $A$ إلى $B$.",
        },
      ],
    },
    {
      id: 'step-08-image-of-a-segment',
      kicker: 'صورة: قطعة مستقيمة، نصف مستقيم، دائرة',
      title: 'صورة قطعة مستقيمة',
      source: { page: PAGE_13, locator: 'صورة قطعة مستقيمة' },
      blocks: [
        textbookFigure(
          'fig-13-segment-image',
          PAGE_13,
          'شكل صورة القطعة المستقيمة',
          'fig-13-segment-image.png',
          'القطعة $[MN]$ وصورتها $[M\\prime N\\prime]$، مع أسهم الانسحاب والنقاط $A$ و$B$.',
          'صورة القطعة المستقيمة — الكتاب، صفحة ١٣',
        ),
        {
          type: 'paragraph',
          text: "صورة قطعة مستقيمة $[MN]$ وفق الانسحاب الذي ينقل $A$ إلى $B$، هي قطعة مستقيمة $[M'N']$ توازي $[MN]$.",
        },
        {
          type: 'paragraph',
          text: "($M'$ و $N'$ هما على التوالي صورتا $M$ و $N$)",
        },
      ],
    },

    teachingShapeExplorer,

    /* ============================== صفحة 14 — نصف المستقيم والدائرة ============================== */
    {
      id: 'step-09-image-of-ray-and-circle',
      kicker: 'صورة: قطعة مستقيمة، نصف مستقيم، دائرة',
      title: 'صورة نصف مستقيم وصورة دائرة',
      source: { page: PAGE_14, locator: 'صورة نصف مستقيم ودائرة' },
      blocks: [
        textbookFigure(
          'fig-14-ray-image',
          PAGE_14,
          'شكل صورة نصف المستقيم',
          'fig-14-ray-image.png',
          'نصف المستقيم $[Mx)$ وصورته $[M\\prime x\\prime)$، والنقطتان $H$ و$H\\prime$.',
          'صورة نصف المستقيم — الكتاب، صفحة ١٤',
        ),
        {
          type: 'paragraph',
          text: "صورة نصف مستقيم $[Mx)$ وفق الانسحاب الذي ينقل $A$ إلى $B$، هي نصف مستقيم $[M'x')$ يوازي $[Mx)$.",
        },
        {
          type: 'paragraph',
          text: "($M'$ هي صورة $M$ و $H'$ هي صورة $H$، حيث $H$ نقطة غير مميزة من نصف المستقيم $[Mx)$.)",
        },
        textbookFigure(
          'fig-14-circle-image',
          PAGE_14,
          'شكل صورة الدائرة',
          'fig-14-circle-image.png',
          'الدائرتان $\\mathcal{C}$ و$\\mathcal{C}\\prime$ متساويتان في نصف القطر ومركزاهما $O$ و$O\\prime$.',
          'صورة الدائرة — الكتاب، صفحة ١٤',
        ),
        {
          type: 'paragraph',
          text: "صورة دائرة $\\mathcal{C}$ مركزها $O$ وفق الانسحاب الذي ينقل $A$ إلى $B$، هي دائرة $\\mathcal{C}'$ مركزها $O'$ هو صورة $O$ وفق هذا الانسحاب، ونصف قطرها يساوي نصف قطر $\\mathcal{C}$.",
        },
        {
          type: 'callout',
          variant: 'hint',
          title: 'وفق انسحاب:',
          blocks: [
            {
              type: 'list',
              ordered: false,
              items: ['صورة مستطيل $F$ هي مستطيل يطابق $F$.', 'صورة مثلث $R$ هي مثلث يطابق $R$.'],
            },
          ],
        },
      ],
    },

    teachingConstructionSequence,

    /* ============================== صفحة 14 — اكتساب معارف ============================== */
    {
      id: 'step-10-how-to-draw-line-image',
      kicker: 'اكتساب معارف',
      title: 'كيف نرسم صورة مستقيم وفق انسحاب؟',
      source: { page: PAGE_14, locator: 'اكتساب معارف' },
      blocks: [
        {
          type: 'paragraph',
          text: 'لرسم صورة مستقيم وفق انسحاب، نرسم صورتي نقطتين منه (باستعمال الفرجار)، ثم نرسم المستقيم المار بهاتين النقطتين.',
        },
        textbookFigure(
          'fig-14-line-image-example-given',
          PAGE_14,
          'مثال — شكل المعطيات',
          'fig-14-line-image-given.png',
          'المستقيم $(d)$ والنقطتان $A$ و$B$ اللتان تحددان الانسحاب المطلوب.',
          'معطيات المثال — الكتاب، صفحة ١٤',
        ),
        textbookFigure(
          'fig-14-line-image-example-construction',
          PAGE_14,
          'مثال — شكل الحل',
          'fig-14-line-image-construction.png',
          'إنشاء النقطتين $M$ و$N$ على $(d)$، وصورتيهما $M\\prime$ و$N\\prime$، ثم رسم المستقيم $(d\\prime)$.',
          'إنشاء صورة المستقيم في حل المثال — الكتاب، صفحة ١٤',
        ),
        {
          type: 'callout',
          variant: 'example',
          title: 'مثال',
          blocks: [
            {
              type: 'paragraph',
              text: "انقل الشكل المرافق إلى ورقة بيضاء، ثم ارسم المستقيم $(d')$ صورة المستقيم $(d)$ وفق الانسحاب الذي ينقل النقطة $A$ إلى النقطة $B$.",
            },
          ],
        },
        {
          type: 'callout',
          variant: 'note',
          title: 'الحل',
          blocks: [
            {
              type: 'list',
              ordered: false,
              items: [
                'نضع على المستقيم $(d)$ النقطتين $M$ و $N$.',
                "نرسم $M'$ و $N'$ صورتي $M$ و $N$ باستعمال الفرجار.",
                "نرسم المستقيم $(M'N')$، وهو المستقيم $(d')$ المطلوب.",
              ],
            },
          ],
        },
      ],
    },

    /* ============================== صفحة 15 — تطبيق ============================== */
    {
      id: 'step-11-square-application',
      kicker: 'مثال',
      title: 'كيف نستعمل خواص الانسحاب في إنشاء هندسي؟',
      source: { page: PAGE_15, locator: 'مثال المربع' },
      blocks: [
        textbookFigure(
          'fig-15-square-application',
          PAGE_15,
          'مثال المربع — الشكل',
          'fig-15-square-example.png',
          'المربع $ABCD$ وصورته $BB\\prime C\\prime C$، مع الأطوال $3\\,cm$ وعلامات الزوايا القائمة.',
          'مثال المربع — الكتاب، صفحة ١٥',
        ),
        {
          type: 'callout',
          variant: 'example',
          title: 'مثال',
          blocks: [
            {
              type: 'paragraph',
              text: '$ABCD$ مربع طول ضلعه $3\\,cm$. ارسم هذا المربع على صفحة بيضاء، ثم ارسم صورته وفق الانسحاب الذي ينقل $D$ إلى $C$. تحقق مما أنشأت.',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'الحل وفق هذا الانسحاب:',
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'صورة النقطة $A$ هي النقطة $B$ وصورة النقطة $D$ هي النقطة $C$. فصورة القطعة $[AD]$ هي $[BC]$.',
            "نرمز إلى صورة $B$ بالرمز $B'$ وإلى صورة $C$ بالرمز $C'$.",
            "الانسحاب يحافظ على الزوايا و $\\widehat{BAD} = 90^\\circ$، إذن $\\widehat{B'BC} = 90^\\circ$.",
            "كما أن $\\widehat{ADC} = 90^\\circ$، إذن $\\widehat{BCC'} = 90^\\circ$.",
            "الانسحاب يحافظ على الأطوال و $AB = DC = 3\\,cm$، إذن $BB' = CC' = 3\\,cm$.",
          ],
        },
        {
          type: 'paragraph',
          text: "بهذا يكون المربع $BB'C'C$ صورة المربع $ABCD$ وفق هذا الانسحاب.",
        },
        {
          type: 'teaching',
          variant: 'example',
          title: 'إنشاء الصورة خطوةً خطوة',
          blocks: [
            {
              type: 'paragraph',
              text: "توضيح من إعداد المنصّة، لا من الكتاب: بُني الشكل بإحداثيات تحقق أن $ABCD$ مربع ضلعه $3\\,cm$، وأن الانسحاب ينقل $D$ إلى $C$. تقدّم لترى كيف تنطبق $A'$ على $B$ و$D'$ على $C$ ثم تكتمل الصورة.",
            },
            {
              type: 'figure',
              diagram: {
                kind: 'interactive',
                origin: 'authored',
                id: 'auth-03-square-application-construction',
                renderer: 'construction-figure',
                alt: "إنشاء تدريجي من إعداد المنصّة لمربع $ABCD$ ضلعه $3\\,cm$ وصورته $BB'C'C$ وفق الانتقال من $D$ إلى $C$؛ تظهر العلاقتان $A'=B$ و$D'=C$.",
                caption: 'توضيح من إعداد المنصّة؛ وحدات الرسم للتوضيح ولا تعيد إنتاج رسم الكتاب.',
                params: {
                  padding: 0.8,
                  steps: [
                    'المعطى: مربع ABCD طول ضلعه 3 cm.',
                    'الانسحاب من D إلى C؛ لذلك A′=B وD′=C.',
                    'نعيّن B′ وC′ بالمتجه نفسه.',
                    'نصل B وB′ وC′ وC بالترتيب فنحصل على الصورة.',
                  ],
                  elements: [
                    { kind: 'segment', from: [0, 3], to: [3, 3], step: 0 },
                    { kind: 'segment', from: [3, 3], to: [3, 0], step: 0 },
                    { kind: 'segment', from: [3, 0], to: [0, 0], step: 0 },
                    { kind: 'segment', from: [0, 0], to: [0, 3], step: 0 },
                    { kind: 'point', at: [0, 3], label: 'A', offset: [-0.35, -0.3], step: 0 },
                    { kind: 'point', at: [3, 3], label: 'B', offset: [0.15, -0.3], step: 0 },
                    { kind: 'point', at: [3, 0], label: 'C', offset: [0.15, -0.3], step: 0 },
                    { kind: 'point', at: [0, 0], label: 'D', offset: [-0.35, -0.3], step: 0 },
                    { kind: 'arrow', from: [0, 0], to: [3, 0], tone: 'mark', step: 1 },
                    {
                      kind: 'point',
                      at: [3, 3],
                      label: 'A′',
                      tone: 'image',
                      offset: [-0.5, 0.55],
                      step: 2,
                    },
                    {
                      kind: 'point',
                      at: [6, 3],
                      label: 'B′',
                      tone: 'image',
                      offset: [0.15, -0.3],
                      step: 2,
                    },
                    {
                      kind: 'point',
                      at: [6, 0],
                      label: 'C′',
                      tone: 'image',
                      offset: [0.15, -0.3],
                      step: 2,
                    },
                    {
                      kind: 'point',
                      at: [3, 0],
                      label: 'D′',
                      tone: 'image',
                      offset: [-0.5, 0.55],
                      step: 2,
                    },
                    { kind: 'segment', from: [3, 3], to: [6, 3], tone: 'image', step: 3 },
                    { kind: 'segment', from: [6, 3], to: [6, 0], tone: 'image', step: 3 },
                    { kind: 'segment', from: [6, 0], to: [3, 0], tone: 'image', step: 3 },
                    { kind: 'segment', from: [3, 0], to: [3, 3], tone: 'image', step: 3 },
                  ],
                },
              },
            },
          ],
        },
      ],
    },

    /* ============================== صفحة 15 — تحقق من فهمك ============================== */
    {
      id: 'step-12-check-understanding',
      kicker: 'تحقّق من فهمك',
      title: 'صور المستقيمات المتوازية والمتعامدة',
      source: { page: PAGE_15, locator: 'تحقّق من فهمك' },
      blocks: [
        {
          type: 'paragraph',
          text: 'انقل الشكلين ① و ② إلى دفترك، وعلى كل منهما:',
        },
        textbookFigure(
          'fig-15-check-parallel',
          PAGE_15,
          'تحقّق من فهمك — الشكل ①',
          'fig-15-check-parallel.png',
          'شبكة الشكل ①: المستقيمان $(d)$ و$\\Delta$ متوازيان، والانتقال من $M$ إلى $M\\prime$.',
          'الشكل ①: مستقيمان متوازيان — الكتاب، صفحة ١٥',
        ),
        textbookFigure(
          'fig-15-check-perpendicular',
          PAGE_15,
          'تحقّق من فهمك — الشكل ②',
          'fig-15-check-perpendicular.png',
          'شبكة الشكل ②: المستقيمان $(d)$ و$\\Delta$ متعامدان، والانتقال من $M$ إلى $M\\prime$.',
          'الشكل ②: مستقيمان متعامدان — الكتاب، صفحة ١٥',
        ),
        {
          type: 'questionGroup',
          items: [
            {
              label: '1.',
              text: "ارسم صورتي المستقيمين $(d)$ و $\\Delta$، وفق انسحاب من $M$ إلى $M'$.",
            },
            {
              label: '2. ①',
              text: 'صورة مستقيمين متوازيين وفق أي انسحاب هما ...............',
            },
            {
              label: '2. ②',
              text: 'صورة مستقيمين متعامدين وفق أي انسحاب هما ...............',
            },
          ],
        },
      ],
    },

    teachingGroupedChallenges,

    /* ============================== صفحة 16 — تدرّب ① ============================== */
    {
      id: 'step-13-practice-one',
      kicker: 'تدرّب ①',
      title: 'صورة مستقيم والانسحاب المعاكس',
      source: { page: PAGE_16, locator: 'تدرّب — ①' },
      blocks: [
        { type: 'paragraph', text: 'تأمل الشكل المرسوم جانباً:' },
        textbookFigure(
          'fig-16-practice-one',
          PAGE_16,
          'تدرّب ① — الشكل',
          'fig-16-practice-one.png',
          'القطعة الموجهة من $A$ إلى $B$ وإلى جانبها المستقيم $(d)$.',
          'شكل التمرين ① — الكتاب، صفحة ١٦',
        ),
        {
          type: 'questionGroup',
          items: [
            { label: '1.', text: 'انقل الشكل إلى دفترك.' },
            {
              label: '2.',
              text: "استعمل فرجاراً ومسطرة غير مدرجة لرسم $(d')$ صورة المستقيم $(d)$ وفق الانسحاب الذي ينقل $A$ إلى $B$.",
            },
            {
              label: '3.',
              text: "ارسم $(d'')$ صورة المستقيم $(d)$ وفق الانسحاب الذي ينقل $B$ إلى $A$.",
            },
            {
              label: '4.',
              text: "ما يمكنك قوله بما يتعلق بالمستقيمين $(d')$ و $(d'')$؟",
            },
          ],
        },
      ],
    },

    /* ============================== صفحة 16 — تدرّب ② ============================== */
    {
      id: 'step-14-practice-two',
      kicker: 'تدرّب ②',
      title: 'صورة قطعة في مثلث قائم',
      source: { page: PAGE_16, locator: 'تدرّب — ②' },
      blocks: [
        {
          type: 'paragraph',
          text: '$ABC$ مثلث قائم الزاوية في $B$، فيه $BA = 4\\,cm$ و $BC = 6\\,cm$.',
        },
        {
          type: 'questionGroup',
          items: [
            {
              label: '1.',
              text: 'ارسم هذا المثلث مستعملاً الفرجار ومسطرة غير مدرجة.',
            },
            {
              label: '2.',
              text: 'وضَعِ النقطة $E$ على الضلع $[BA]$ بحيث يكون $BE = 2\\,cm$.',
            },
            {
              label: '3.',
              text: "ارسم صورة القطعة $[EB]$ وفق الانسحاب الذي ينقل $A$ إلى $C$ وسمِّها $[E'B']$.",
            },
            {
              label: '4.',
              text: "اشرح ما يمكنك قوله بما يتعلق بالمستقيمين $(AB)$ و $(E'B')$.",
            },
            {
              label: '5.',
              text: "ما طول القطعة $[E'B']$؟ اشرح إجابتك.",
            },
          ],
        },
        {
          type: 'teaching',
          variant: 'tip',
          title: 'شكل البداية — توضيح من إعداد المنصّة',
          collapsible: true,
          revealLabel: 'افتح نموذج المعطيات بعد أن ترسم بنفسك',
          blocks: [
            {
              type: 'paragraph',
              text: "هذا نموذج تأسيسي بإحداثيات مختارة تحقق $BA=4\\,cm$ و$BC=6\\,cm$ والزاوية القائمة عند $B$، ثم تضع $E$ بحيث $BE=2\\,cm$. إنه يبيّن المعطيات فقط ولا يرسم الصورة المطلوبة $[E'B']$.",
            },
            {
              type: 'figure',
              diagram: {
                kind: 'interactive',
                origin: 'authored',
                id: 'auth-03-practice-two-givens',
                renderer: 'construction-figure',
                alt: 'نموذج من إعداد المنصّة لمثلث قائم عند $B$: $BA=4\\,cm$ و$BC=6\\,cm$، والنقطة $E$ منتصف $[BA]$ لأن $BE=2\\,cm$؛ لا تظهر صورة القطعة.',
                caption:
                  'توضيح تأسيسي من إعداد المنصّة؛ لا يمثّل رسماً مطبوعاً ولا يعرض حل الانسحاب.',
                params: {
                  padding: 0.9,
                  steps: [
                    'نرسم مثلثاً قائماً عند B بطولي الضلعين BA=4 وBC=6.',
                    'نعيّن E على [BA] بحيث BE=2؛ أي إن E منتصف [BA].',
                  ],
                  elements: [
                    { kind: 'segment', from: [0, 0], to: [4, 0], step: 0 },
                    { kind: 'segment', from: [4, 0], to: [0, 6], step: 0 },
                    { kind: 'segment', from: [0, 6], to: [0, 0], step: 0 },
                    { kind: 'segment', from: [0.42, 0], to: [0.42, 0.42], tone: 'mark', step: 0 },
                    { kind: 'segment', from: [0.42, 0.42], to: [0, 0.42], tone: 'mark', step: 0 },
                    { kind: 'point', at: [0, 0], label: 'B', offset: [-0.35, 0.55], step: 0 },
                    { kind: 'point', at: [4, 0], label: 'A', offset: [0.15, -0.3], step: 0 },
                    { kind: 'point', at: [0, 6], label: 'C', offset: [-0.35, -0.3], step: 0 },
                    {
                      kind: 'segment',
                      from: [0, 0],
                      to: [2, 0],
                      dashed: true,
                      tone: 'aux',
                      step: 1,
                    },
                    {
                      kind: 'point',
                      at: [2, 0],
                      label: 'E',
                      tone: 'mark',
                      offset: [0.12, 0.55],
                      step: 1,
                    },
                  ],
                },
              },
            },
          ],
        },
      ],
    },

    /* ============================== صفحة 16 — تدرّب ③ ============================== */
    {
      id: 'step-15-practice-three',
      kicker: 'تدرّب ③',
      title: 'صورة مستطيل',
      source: { page: PAGE_16, locator: 'تدرّب — ③' },
      blocks: [
        {
          type: 'questionGroup',
          items: [
            {
              label: '3.',
              text: 'ارسم مستطيلاً $ABCD$ بعداه $AB = 3\\,cm$ و $AD = 2\\,cm$، ثم ارسم صورة هذا المستطيل وفق الانسحاب الذي ينقل $B$ إلى $A$. اشرح خطوات عملك.',
            },
          ],
        },
      ],
    },

    /* ============================== صفحة 16 — تدرّب ④ ============================== */
    {
      id: 'step-16-practice-four',
      kicker: 'تدرّب ④',
      title: 'اكتشف خطأ الرسم',
      source: { page: PAGE_16, locator: 'تدرّب — ④' },
      blocks: [
        {
          type: 'paragraph',
          text: 'رسم كلٌّ من عدنان وغسان وعصام النقطة $D$، صورة النقطة $C$ وفق الانسحاب الذي ينقل $B$ إلى $A$، مستعملين الطول نفسه للقطعة $[CD]$.',
        },
        textbookFigure(
          'fig-16-attempt-1',
          PAGE_16,
          'تدرّب ④ — الشكل ①',
          'fig-16-attempt-1.png',
          'المحاولة ①: القطعة $[CD]$ لها الطول المعطى لكنها عمودية، وليست موازية لاتجاه الانسحاب $B$ إلى $A$.',
          'المحاولة ① — الكتاب، صفحة ١٦',
        ),
        textbookFigure(
          'fig-16-attempt-2',
          PAGE_16,
          'تدرّب ④ — الشكل ②',
          'fig-16-attempt-2.png',
          'المحاولة ②: اتجاه $C$ إلى $D$ يوافق $A$ إلى $B$، لا الانسحاب المطلوب من $B$ إلى $A$.',
          'المحاولة ② — الكتاب، صفحة ١٦',
        ),
        textbookFigure(
          'fig-16-attempt-3',
          PAGE_16,
          'تدرّب ④ — الشكل ③',
          'fig-16-attempt-3.png',
          'المحاولة ③: الاتجاه من $C$ إلى $D$ يوافق الانسحاب من $B$ إلى $A$، وطول $[CD]$ مساوٍ للطول المطلوب.',
          'المحاولة ③ — الكتاب، صفحة ١٦',
        ),
        {
          type: 'paragraph',
          text: 'فإذا كان غسان الوحيد الذي رسم $D$ بشكل صحيح:',
        },
        {
          type: 'questionGroup',
          items: [
            { label: '1.', text: 'أي الأشكال الثلاثة هو رسمه؟' },
            { label: '2.', text: 'ما الخطأ في كل من الشكلين الآخرين؟' },
          ],
        },
      ],
    },

    teachingLessonThreeRecap,
  ],
  assessment: lesson03Assessment,
  teacherResources: lesson03TeacherResources,
};
