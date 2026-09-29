import type { LessonInput } from '../schema';
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
 * Source steps preserve the supplied scans in printed order. Unmeasured
 * textbook figures stay `reference`; exact platform-made analogues live only in
 * explicitly badged authored steps. Printed drawing tasks reveal no answers.
 */
const PAGE_11 = 11;
const PAGE_12 = 12;
const PAGE_13 = 13;
const PAGE_14 = 14;
const PAGE_15 = 15;
const PAGE_16 = 16;

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
        {
          type: 'figure',
          diagram: {
            kind: 'reference',
            id: 'fig-11-line-conjecture-two-cases',
            alt: 'شكلان مرقّمان ① و②: في الأول المستقيم $(d)$ غير موازٍ للقطعة $[AB]$، وفي الثاني المستقيم $(d)$ موازٍ لاتجاه الانتقال من $A$ إلى $B$.',
            caption: 'شكلا التخمين، صفحة ١١',
            source: { page: PAGE_11, locator: 'نشاط — شكلا ① و②' },
            reason:
              'رسمان تخطيطيان على ورقة بيضاء بلا شبكة أو قياسات؛ العلاقة الهندسية واضحة، أما المواضع والميل والمسافات فغير محددة عددياً.',
          },
        },
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
        {
          type: 'figure',
          diagram: {
            kind: 'reference',
            id: 'fig-11-line-proof',
            alt: 'النقطتان $A$ و $B$ وخارجهما المستقيم $(d)$ المار بالنقطة $C$، تمهيداً لوضع نقطة تقاطعه مع المستقيم $(AB)$ وبناء الصورتين.',
            caption: 'الشكل المرافق للبرهان، صفحة ١١',
            source: { page: PAGE_11, locator: 'نشاط — شكل الإثبات' },
            reason:
              'الشكل مرسوم على ورقة بيضاء ولا يحمل قياسات أو إحداثيات؛ إعادة مواضعه تعني تقدير أطوال وزوايا غير مطبوعة.',
          },
        },
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
        {
          type: 'figure',
          diagram: {
            kind: 'reference',
            id: 'fig-12-segment-ray-circle-activity',
            alt: 'ثلاثة أشكال: القطعة المستقيمة $[MN]$ وطولها $3.4\\,cm$، ونصف المستقيم $[Dx)$، ودائرة $\\mathcal{C}$ مركزها $O$ ونصف قطرها $3.2\\,cm$، ومع كل شكل النقطتان $A$ و $B$.',
            caption: 'الأشكال ① و② و③، صفحة ١٢',
            source: { page: PAGE_12, locator: 'الأشكال ① و② و③' },
            reason:
              'الأطوال المطبوعة معلومة، لكن مواقع $A$ و$B$ واتجاه كل انتقال بالنسبة إلى الشكل مرسومة بلا شبكة أو قياسات؛ وهي جزء لازم من الإنشاء.',
          },
        },
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
        {
          type: 'figure',
          diagram: {
            kind: 'reference',
            id: 'fig-12-line-construction-nonparallel',
            alt: 'المستقيم $(d)$ ونقطتان $M$ و $N$ عليه، وصورتاهما $M\\prime$ و $N\\prime$ اللتان تحددان المستقيم $(d\\prime)$، مع الانسحاب من $A$ إلى $B$.',
            caption: 'الحالة الأولى: المستقيم غير موازٍ لاتجاه الانسحاب، صفحة ١٢',
            source: { page: PAGE_12, locator: 'شكل الإنشاء — الحالة الأولى' },
            reason:
              'الشكل يشرح إنشاءً عاماً ولا يطبع إحداثيات أو أطوالاً تحدد مواضع نقاطه الدقيقة.',
          },
        },
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
        {
          type: 'figure',
          diagram: {
            kind: 'reference',
            id: 'fig-12-line-construction-parallel',
            alt: 'المستقيم $(d)$ موازٍ لاتجاه الانتقال من $A$ إلى $B$، ولذلك تحمل الصورة $(d\\prime)$ الاسم نفسه والموقع نفسه.',
            caption: 'الحالة الثانية: المستقيم موازٍ لاتجاه الانسحاب، صفحة ١٢',
            source: { page: PAGE_12, locator: 'شكل الإنشاء — الحالة الثانية' },
            reason:
              'رسم تخطيطي بلا شبكة؛ العلاقة هي الانطباق، ولا توجد مواضع عددية يمكن نقلها بأمانة.',
          },
        },
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
        {
          type: 'figure',
          diagram: {
            kind: 'reference',
            id: 'fig-13-parallel-perpendicular-images',
            alt: 'شكلان: الأول يبيّن مستقيمين متوازيين وصورتيهما المتوازيتين، والثاني يبيّن مستقيمين متعامدين وصورتيهما المتعامدتين، وفق الانسحاب من $A$ إلى $B$.',
            caption: 'الشكلان ① و②، صفحة ١٣',
            source: { page: PAGE_13, locator: 'الشكلان ① و②' },
            reason:
              'الرسوم على ورقة بيضاء ولا تحمل قياسات تحدد الفواصل والميول؛ لا حاجة إلى تخمينها لعرض الخاصية النصية.',
          },
        },
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
        {
          type: 'figure',
          diagram: {
            kind: 'reference',
            id: 'fig-13-segment-image',
            alt: 'القطعة $[MN]$ وصورتها $[M\\prime N\\prime]$ في وضع متوازٍ، مع أسهم الانسحاب من $A$ إلى $B$ ومن الطرفين إلى صورتيهما.',
            caption: 'صورة القطعة المستقيمة، صفحة ١٣',
            source: { page: PAGE_13, locator: 'شكل صورة القطعة' },
            reason:
              'المخطط لا يحدد إحداثيات أو مقياس رسم للقطعة ولمواضع $A$ و$B$؛ الخاصية محفوظة نصياً دون تخمين الرسم.',
          },
        },
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
        {
          type: 'figure',
          diagram: {
            kind: 'reference',
            id: 'fig-14-ray-image',
            alt: 'نصف المستقيم $[Mx)$ وصورته الموازية $[M\\prime x\\prime)$، مع نقطتين $H$ و $H\\prime$ وسهمي الانسحاب من $A$ إلى $B$.',
            caption: 'صورة نصف المستقيم، صفحة ١٤',
            source: { page: PAGE_14, locator: 'شكل صورة نصف المستقيم' },
            reason:
              'الشكل تخطيطي بلا شبكة أو أطوال؛ مواضع النقاط لا يمكن استخراجها عددياً من المصدر.',
          },
        },
        {
          type: 'paragraph',
          text: "صورة نصف مستقيم $[Mx)$ وفق الانسحاب الذي ينقل $A$ إلى $B$، هي نصف مستقيم $[M'x')$ يوازي $[Mx)$.",
        },
        {
          type: 'paragraph',
          text: "($M'$ هي صورة $M$ و $H'$ هي صورة $H$، حيث $H$ نقطة غير مميزة من نصف المستقيم $[Mx)$.)",
        },
        {
          type: 'figure',
          diagram: {
            kind: 'reference',
            id: 'fig-14-circle-image',
            alt: 'دائرتان متساويتان $\\mathcal{C}$ و $\\mathcal{C}\\prime$ مركزاهما $O$ و $O\\prime$، مع انتقال المركز وفق الانسحاب من $A$ إلى $B$.',
            caption: 'صورة الدائرة، صفحة ١٤',
            source: { page: PAGE_14, locator: 'شكل صورة الدائرة' },
            reason:
              'نصف القطر متساوٍ في الرسم لكن لا توجد قيمة أو إحداثيات تحدد موضع الدائرتين بالنسبة إلى $A$ و$B$.',
          },
        },
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
        {
          type: 'figure',
          diagram: {
            kind: 'reference',
            id: 'fig-14-line-image-example',
            alt: 'معطيات المثال: المستقيم $(d)$ والنقطتان $A$ و $B$، ثم شكل الحل الذي يضع $M$ و $N$ على المستقيم ويرسم صورتيهما $M\\prime$ و $N\\prime$ والمستقيم $(d\\prime)$.',
            caption: 'المثال وحلّه، صفحة ١٤',
            source: { page: PAGE_14, locator: 'مثال — شكل المعطيات والحل' },
            reason:
              'المثال إنشائي على ورقة بيضاء، ولا يطبع أطوالاً أو زوايا تسمح بإعادة مواضع الشكل الأصلي بدقة.',
          },
        },
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
        {
          type: 'figure',
          diagram: {
            kind: 'reference',
            id: 'fig-15-square-application',
            alt: 'المربع $ABCD$ طول ضلعه $3\\,cm$ وصورته المربع $BB\\prime C\\prime C$ وفق الانسحاب الذي ينقل $D$ إلى $C$، مع علامات الزوايا القائمة والأطوال.',
            caption: 'شكل المثال، صفحة ١٥',
            source: { page: PAGE_15, locator: 'مثال المربع — الشكل' },
            reason:
              'المعطيات تحدد مربّعين، لكن الشكل جزء من حل مطبوع كامل؛ أبقيناه مرجعياً كي لا يُعرض الرسم النهائي قبل قراءة تسلسل الحل الأصلي.',
          },
        },
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
        {
          type: 'figure',
          diagram: {
            kind: 'reference',
            id: 'fig-15-check-two-grids',
            alt: 'شبكتان مرقمتان ① و②: الأولى فيها مستقيمان متوازيان $(d)$ و $\\Delta$ والنقطتان $M$ و $M\\prime$، والثانية فيها مستقيمان متعامدان $(d)$ و $\\Delta$ والنقطتان $M$ و $M\\prime$.',
            caption: 'شكلا «تحقّق من فهمك»، صفحة ١٥',
            source: { page: PAGE_15, locator: 'الشكلان ① و②' },
            reason:
              'مع أن الشكلين على شبكة، فإن مواضع عدة نقاط وخطوط تقع بين علامات متقاربة في المسح؛ أي قراءة غير متيقنة ستغيّر صورة المستقيم المطلوبة.',
          },
        },
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
        {
          type: 'figure',
          diagram: {
            kind: 'reference',
            id: 'fig-16-practice-one',
            alt: 'القطعة الموجهة من $A$ إلى $B$ وإلى جانبها المستقيم $(d)$، تمهيداً لرسم صورته وفق انسحاب ثم وفق الانسحاب المعاكس.',
            caption: 'شكل التمرين ①، صفحة ١٦',
            source: { page: PAGE_16, locator: 'تدرّب ① — الشكل' },
            reason:
              'الشكل مرسوم على ورقة بيضاء بلا قياسات؛ يلزم الطالب نسخ الوضع المطبوع ثم إجراء إنشاء بالفرجار.',
          },
        },
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
          text: 'رسم كلٌّ من عدنان وغسان وشاكر النقطة $D$، صورة النقطة $C$ وفق الانسحاب الذي ينقل $B$ إلى $A$، مستعملين الطول نفسه للقطعة $[CD]$.',
        },
        {
          type: 'figure',
          diagram: {
            kind: 'reference',
            id: 'fig-16-practice-four-attempts',
            alt: 'ثلاث محاولات مرقّمة ① و② و③ لوضع النقطة $D$ صورةً للنقطة $C$ وفق الانسحاب الذي ينقل $B$ إلى $A$؛ واحدة تغيّر الاتجاه، وأخرى تعكسه، والثالثة تحقق الحركة المطلوبة.',
            caption: 'الأشكال الثلاثة للتمرين ④، صفحة ١٦',
            source: { page: PAGE_16, locator: 'تدرّب ④ — الأشكال ① و② و③' },
            reason:
              'الحكم يعتمد على اتجاه الأسهم وعلامات تساوي الأطوال في الرسم المطبوع؛ إبقاء الشكل مرجعياً يمنع استبداله برسم تقريبي يكشف الجواب.',
          },
        },
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
