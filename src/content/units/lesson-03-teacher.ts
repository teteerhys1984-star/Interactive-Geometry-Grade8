import type { ContentBlock, TeacherResourcesInput } from '../schema';

const paragraph = (text: string): ContentBlock => ({ type: 'paragraph', text });

function authoredConstructionFigure(
  id: string,
  alt: string,
  caption: string,
  params: Record<string, unknown>,
): ContentBlock {
  return {
    type: 'figure',
    diagram: {
      kind: 'interactive',
      origin: 'authored',
      id,
      renderer: 'construction-figure',
      alt,
      caption,
      params,
    },
  };
}

function solution(id: string, reference: string, question: string, blocks: ContentBlock[]) {
  return { id, reference, question, blocks };
}

/** Teacher-only diagram: a translated oblique line and its proof parallelogram. */
const proofFigure = authoredConstructionFigure(
  'teachsol-l3-proof-parallelogram',
  'توضيح من إعداد المنصّة: المستقيم $(d)$ يمر بـ$E$ و$C$، وصورته $(d\\prime)$ تمر بـ$E\\prime$ و$C\\prime$؛ والرباعي $CC\\prime E\\prime E$ متوازي أضلاع.',
  'توضيح برهاني من إعداد المنصّة؛ إحداثيات مختارة لإظهار العلاقات، لا لإعادة رسم شكل الكتاب.',
  {
    padding: 0.9,
    steps: [
      'نضع E على المستقيم AB وC على المستقيم المائل d.',
      'نطبّق المتجه نفسه من A إلى B على النقطتين E وC.',
      'نصل C وC′ وE′ وE؛ فنرى متوازي الأضلاع.',
    ],
    elements: [
      { kind: 'line', from: [1.4, 0], to: [2.2, 3], extend: 1.1, step: 0 },
      { kind: 'line', from: [0, 0], to: [4, 0], extend: 1.7, step: 0 },
      { kind: 'point', at: [0, 0], label: 'A', offset: [-0.35, 0.55], step: 0 },
      { kind: 'point', at: [4, 0], label: 'B', offset: [0.15, 0.55], step: 0 },
      { kind: 'point', at: [1.4, 0], label: 'E', offset: [-0.1, -0.3], step: 0 },
      { kind: 'point', at: [2.2, 3], label: 'C', offset: [0.15, -0.3], step: 0 },
      { kind: 'arrow', from: [0, 0], to: [4, 0], tone: 'mark', step: 1 },
      { kind: 'point', at: [5.4, 0], label: 'E′', tone: 'image', offset: [0.1, 0.55], step: 2 },
      { kind: 'point', at: [6.2, 3], label: 'C′', tone: 'image', offset: [0.15, -0.3], step: 2 },
      { kind: 'line', from: [5.4, 0], to: [6.2, 3], extend: 1.1, tone: 'image', step: 2 },
      { kind: 'arrow', from: [1.4, 0], to: [5.4, 0], tone: 'mark', step: 2 },
      { kind: 'arrow', from: [2.2, 3], to: [6.2, 3], tone: 'mark', step: 2 },
    ],
  },
);

/** Teacher-only construction for page 16, exercise ②; all points use A→C. */
const practiceTwoImageFigure = authoredConstructionFigure(
  'teachsol-l3-practice-two-image',
  'مثلث قائم $ABC$ عند $B$ مع $E$ على $[BA]$، وصورة القطعة $[EB]$ وهي $[E\\prime B\\prime]$ تحت الانسحاب من $A$ إلى $C$.',
  'رسم هندسي من إعداد المنصّة، يحقق أطوال السؤال بدقة ولا ينسخ رسماً مطبوعاً.',
  {
    padding: 0.9,
    steps: [
      'المعطيات: مثلث قائم عند B بطولي BA=4 وBC=6.',
      'نضع E على BA بحيث BE=2.',
      'متجه الانسحاب هو من A إلى C.',
      'نعيّن B′ وE′ بالمتجه نفسه.',
      'نصل E′ بـB′؛ طول الصورة يساوي 2 cm.',
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
      { kind: 'segment', from: [0, 0], to: [2, 0], tone: 'aux', dashed: true, step: 1 },
      { kind: 'point', at: [2, 0], label: 'E', tone: 'mark', offset: [0.12, 0.55], step: 1 },
      { kind: 'arrow', from: [4, 0], to: [0, 6], tone: 'mark', step: 2 },
      { kind: 'point', at: [-4, 6], label: 'B′', tone: 'image', offset: [-0.4, -0.3], step: 3 },
      { kind: 'point', at: [-2, 6], label: 'E′', tone: 'image', offset: [0.12, -0.3], step: 3 },
      { kind: 'arrow', from: [0, 0], to: [-4, 6], tone: 'aux', step: 3 },
      { kind: 'arrow', from: [2, 0], to: [-2, 6], tone: 'aux', step: 3 },
      { kind: 'segment', from: [-2, 6], to: [-4, 6], tone: 'image', step: 4 },
    ],
  },
);

/** Teacher-only construction for page 16, exercise ③. */
const practiceThreeRectangleFigure = authoredConstructionFigure(
  'teachsol-l3-practice-three-rectangle',
  'المستطيل $ABCD$ أبعاده $AB=3$ و$AD=2$ وصورته $A\\prime B\\prime C\\prime D\\prime$ وفق الانسحاب من $B$ إلى $A$.',
  'رسم توضيحي من إعداد المنصّة؛ الأبعاد والعلاقات تطابق معطيات السؤال، وليس رسماً من الكتاب.',
  {
    padding: 0.9,
    steps: [
      'نرسم ABCD مستطيلاً أبعاده 3 و2.',
      'نطبّق الانسحاب من B إلى A، أي ثلاث وحدات إلى اليسار في هذا الرسم.',
      'نعيّن صور الرؤوس؛ B′=A وC′=D.',
      'نصل A′ وB′ وC′ وD′ بالترتيب.',
    ],
    elements: [
      { kind: 'segment', from: [0, 0], to: [3, 0], step: 0 },
      { kind: 'segment', from: [3, 0], to: [3, 2], step: 0 },
      { kind: 'segment', from: [3, 2], to: [0, 2], step: 0 },
      { kind: 'segment', from: [0, 2], to: [0, 0], step: 0 },
      { kind: 'point', at: [0, 0], label: 'A', offset: [0.15, -0.3], step: 0 },
      { kind: 'point', at: [3, 0], label: 'B', offset: [0.15, -0.3], step: 0 },
      { kind: 'point', at: [3, 2], label: 'C', offset: [0.15, -0.3], step: 0 },
      { kind: 'point', at: [0, 2], label: 'D', offset: [0.15, -0.3], step: 0 },
      { kind: 'arrow', from: [3, 0], to: [0, 0], tone: 'mark', step: 1 },
      { kind: 'point', at: [-3, 0], label: 'A′', tone: 'image', offset: [-0.4, -0.3], step: 2 },
      { kind: 'point', at: [0, 0], label: 'B′', tone: 'image', offset: [-0.6, 0.6], step: 2 },
      { kind: 'point', at: [0, 2], label: 'C′', tone: 'image', offset: [-0.6, 0.6], step: 2 },
      { kind: 'point', at: [-3, 2], label: 'D′', tone: 'image', offset: [-0.4, -0.3], step: 2 },
      { kind: 'segment', from: [-3, 0], to: [0, 0], tone: 'image', step: 3 },
      { kind: 'segment', from: [0, 0], to: [0, 2], tone: 'image', step: 3 },
      { kind: 'segment', from: [0, 2], to: [-3, 2], tone: 'image', step: 3 },
      { kind: 'segment', from: [-3, 2], to: [-3, 0], tone: 'image', step: 3 },
    ],
  },
);

/**
 * Derived teacher guidance for pages 11–16. The scans print no answer key;
 * solutions are platform-derived and are never presented as printed answers.
 */
export const lesson03TeacherResources: TeacherResourcesInput = {
  notes: [
    {
      type: 'callout',
      variant: 'warning',
      title: 'صفة هذه الموارد',
      blocks: [
        paragraph(
          'الصفحات المرفقة لا تتضمّن أي إجابات مطبوعة. الحلول الآتية حلول معلّم مشتقة من تعريف الانسحاب وخواصه، وليست نصاً منسوباً إلى الكتاب.',
        ),
      ],
    },
    {
      type: 'teaching',
      variant: 'tip',
      title: 'تسلسل تدريس مقترح',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'ابدأ بالفرق بين نقل نقطة ونقل شكل: الشكل مجموعة نقاط، والحركة واحدة للجميع.',
            'دع التلاميذ ينجزون التخمين في الحالتين قبل صياغة قاعدة توازي المستقيم وصورته.',
            'في البرهان، لا تقبل عبارة «واضح من الشكل»؛ اطلب تسمية متوازي الأضلاع ثم الخاصية المستعملة.',
            'ميّز بين «متوازيان» و«منطبقان» عند كون اتجاه الانسحاب موازياً للمستقيم.',
            'أجّل تصحيح رسومات صفحة ١٦ إلى مناقشة جماعية بعد أن يثبت كل تلميذ اتجاه حركته.',
          ],
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'pitfall',
      title: 'أخطاء شائعة تستحق الرصد',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'عكس الانتقال من $A$ إلى $B$ ليصبح من $B$ إلى $A$.',
            'المحافظة على طول القطعة مع إهمال توازيها واتجاهها؛ تساوي الطولين وحده لا يكفي.',
            'نقل مركز الدائرة وتغيير نصف قطرها، أو إبقاء المركز ونقل المحيط فقط.',
            'اختيار نقطتين على مستقيم ثم نقل كل واحدة بحركة مختلفة.',
            'اعتقاد أن الصورة يجب أن تكون منفصلة عن الأصل؛ قد تنطبق صورة المستقيم عليه.',
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'note',
      title: 'تقرير الأشكال',
      blocks: [
        paragraph(
          'الرسوم المطبوعة في الصفحات ١١–١٦ معروضة بقصاصات دقيقة من الصور المرفقة، ولم يُخمَّن أي موضع أو طول لإعادة رسمها. كل نموذج هندسي إضافي في شرح المنصّة أو حلول المعلّم يحمل وسمه صراحةً ولا يُنسب إلى الكتاب.',
        ),
      ],
    },
  ],
  textbookSolutions: [
    solution(
      'l3-sol-p11-conjecture-q1-fig1',
      'صفحة 11 — النشاط 1 — السؤال 1 — الشكل ①',
      "انقل الشكلين التاليين ① و ② إلى صفحة بيضاء. وفي كل حالة، ارسم $(d')$ صورة المستقيم $(d)$ وفق الانسحاب الذي ينقل النقطة $A$ إلى النقطة $B$.",
      [
        paragraph(
          "في الشكل ① نختار نقطتين مختلفتين $M$ و$N$ على $(d)$. ننشئ $M'$ و$N'$ بحيث يكون كل من المتجهين $\\overrightarrow{MM'}$ و$\\overrightarrow{NN'}$ مساوياً للمتجه $\\overrightarrow{AB}$، ثم نرسم المستقيم $(M'N')$. بما أن $(d)$ غير موازٍ لاتجاه $AB$، تكون $(d')$ موازية لـ$(d)$ ومتميزة عنها.",
        ),
      ],
    ),
    solution(
      'l3-sol-p11-conjecture-q1-fig2',
      'صفحة 11 — النشاط 1 — السؤال 1 — الشكل ②',
      "انقل الشكلين التاليين ① و ② إلى صفحة بيضاء. وفي كل حالة، ارسم $(d')$ صورة المستقيم $(d)$ وفق الانسحاب الذي ينقل النقطة $A$ إلى النقطة $B$.",
      [
        paragraph(
          "في الشكل ② اتجاه الانسحاب موازٍ للمستقيم $(d)$. لكل نقطة $P$ على $(d)$ تكون صورتها $P'$ على المستقيم نفسه؛ ومن ثم فإن مجموعة صور نقاط $(d)$ هي $(d)$ ذاته، أي إن $(d')$ منطبق على $(d)$.",
        ),
      ],
    ),
    solution(
      'l3-sol-p11-conjecture-q2-fig1',
      'صفحة 11 — النشاط 1 — السؤال 2 — الشكل ①',
      "ما وضع المستقيمين $(d)$ و $(d')$ في كل حالة؟",
      [paragraph('في الشكل ① المستقيمان متوازيان ومتميزان؛ فالانتقال ليس موازياً للمستقيم $(d)$.')],
    ),
    solution(
      'l3-sol-p11-conjecture-q2-fig2',
      'صفحة 11 — النشاط 1 — السؤال 2 — الشكل ②',
      "ما وضع المستقيمين $(d)$ و $(d')$ في كل حالة؟",
      [
        paragraph(
          'في الشكل ② المستقيمان منطبقان؛ واتجاه الانتقال موازٍ لـ$(d)$، فتكون صورة المستقيم هي المستقيم نفسه.',
        ),
      ],
    ),
    solution(
      'l3-sol-p11-proof-1',
      'صفحة 11 — النشاط 2 — البرهان — البند 1',
      'انقل الشكل المرافق إلى صفحة بيضاء، وضَعْ $E$ نقطة تقاطع المستقيمين $(d)$ و $(AB)$.',
      [
        paragraph(
          'نمدّ المستقيمين كما يلزم حتى يتقاطعا، ثم نسمّي نقطة التقاطع $E$. ولأن $(d)$ غير موازٍ لـ$(AB)$، فالتقاطع نقطة واحدة محددة.',
        ),
      ],
    ),
    solution(
      'l3-sol-p11-proof-2',
      'صفحة 11 — النشاط 2 — البرهان — البند 2',
      "ارسم، وفق الانسحاب الذي ينقل $A$ إلى $B$: $C'$ صورة النقطة $C$ من $(d)$ و $E'$ صورة $E$.",
      [
        paragraph(
          "ليكن $\\vec v=\\overrightarrow{AB}$. ننشئ $C'$ بحيث $\\overrightarrow{CC'}=\\vec v$، وننشئ $E'$ بحيث $\\overrightarrow{EE'}=\\vec v$. يجب أن يكون المتجه نفسه في الاتجاه والمقدار عند نقل النقطتين.",
        ),
      ],
    ),
    solution(
      'l3-sol-p11-proof-3',
      'صفحة 11 — النشاط 2 — البرهان — البند 3',
      "لماذا النقطة $E'$ واقعة على المستقيم $(AB)$؟",
      [
        paragraph(
          'النقطة $E$ تقع على $(AB)$، كما أن متجه الانسحاب $\\overrightarrow{AB}$ موازٍ لهذا المستقيم. نقل نقطة على مستقيم بمتجه موازٍ له يبقي صورتها على المستقيم نفسه؛ لذلك $E\\prime\\in(AB)$.',
        ),
      ],
    ),
    solution(
      'l3-sol-p11-proof-4',
      'صفحة 11 — النشاط 2 — البرهان — البند 4',
      "لماذا الرباعي $CC'E'E$ هو متوازي أضلاع؟",
      [
        paragraph(
          "بما أن $C'$ و$E'$ صورتا $C$ و$E$ بالانسحاب نفسه، فإن $\\overrightarrow{CC'}=\\overrightarrow{EE'}=\\overrightarrow{AB}$. إذن الضلعان المتقابلان $[CC']$ و$[EE']$ متوازيان ومتساويان؛ وبخاصية متوازي الأضلاع يكون $CC'E'E$ متوازي أضلاع.",
        ),
        proofFigure,
      ],
    ),
    solution(
      'l3-sol-p11-proof-5',
      'صفحة 11 — النشاط 2 — البرهان — البند 5',
      "استنتج أن المستقيم $(d)$ وصورته $(C'E')$ متوازيان.",
      [
        paragraph(
          "في متوازي الأضلاع $CC'E'E$ الضلعان المتقابلان $[CE]$ و$[C'E']$ متوازيان. والنقطتان $C$ و$E$ على $(d)$، أما $C'$ و$E'$ فتحددان صورة المستقيم؛ لذلك $(d)\\parallel(C'E')$.",
        ),
      ],
    ),
    solution(
      'l3-sol-p12-shape-segment',
      'صفحة 12 — النشاط 3 — الشكل ① — القطعة المستقيمة',
      'انقل الأشكال ① و ② و ③ إلى صفحة بيضاء. وفي كل حالة، ارسم صورة الشكل وفق الانسحاب الذي ينقل النقطة $A$ إلى النقطة $B$.',
      [
        paragraph(
          "ننقل الطرفين $M$ و$N$ بالمتجه نفسه $\\overrightarrow{AB}$ فنحصل على $M'$ و$N'$. نرسم $[M'N']$؛ والانسحاب يحافظ على الطول والتوازي، لذا $M'N'=MN=3.4\\,cm$ و$[M'N']\\parallel[MN]$.",
        ),
      ],
    ),
    solution(
      'l3-sol-p12-shape-ray',
      'صفحة 12 — النشاط 3 — الشكل ② — نصف المستقيم',
      'انقل الأشكال ① و ② و ③ إلى صفحة بيضاء. وفي كل حالة، ارسم صورة الشكل وفق الانسحاب الذي ينقل النقطة $A$ إلى النقطة $B$.',
      [
        paragraph(
          "ننقل مبدأ نصف المستقيم $D$ إلى $D'$، وننقل نقطة ثانية عليه بالمتجه $\\overrightarrow{AB}$. بوصل المبدأ بصورة النقطة الثانية وبمتابعة الاتجاه نفسه نحصل على نصف المستقيم الصورة $[D'x')$؛ وهو موازٍ للأصل وله اتجاهه.",
        ),
      ],
    ),
    solution(
      'l3-sol-p12-shape-circle',
      'صفحة 12 — النشاط 3 — الشكل ③ — الدائرة',
      'انقل الأشكال ① و ② و ③ إلى صفحة بيضاء. وفي كل حالة، ارسم صورة الشكل وفق الانسحاب الذي ينقل النقطة $A$ إلى النقطة $B$.',
      [
        paragraph(
          "ننقل المركز $O$ بالمتجه $\\overrightarrow{AB}$ إلى $O'$، ثم نرسم دائرة مركزها $O'$ ونصف قطرها الأصلي $3.2\\,cm$. لأن المسافات محفوظة، تكون هذه الدائرة صورة $\\mathcal C$.",
        ),
      ],
    ),
    solution(
      'l3-sol-p15-check-draw-parallel',
      'صفحة 15 — تحقّق من فهمك — السؤال 1 — الشكل ①',
      "ارسم صورتي المستقيمين $(d)$ و $\\Delta$، وفق انسحاب من $M$ إلى $M'$.",
      [
        paragraph(
          "نقرأ المتجه من $M$ إلى $M'$ على شبكة الشكل ①. نختار نقطتين على كل من $(d)$ و$\\Delta$، وننقل كل نقطة بالمتجه نفسه، ثم نرسم المستقيم المار بصورتيها. لأن المستقيمين الأصليين متوازيان، تبقى صورتاهما متوازيتين. تُستخدم الشبكة المرفقة لتحديد العقد كما هي مطبوعة.",
        ),
      ],
    ),
    solution(
      'l3-sol-p15-check-draw-perpendicular',
      'صفحة 15 — تحقّق من فهمك — السؤال 1 — الشكل ②',
      "ارسم صورتي المستقيمين $(d)$ و $\\Delta$، وفق انسحاب من $M$ إلى $M'$.",
      [
        paragraph(
          "نقرأ المتجه من $M$ إلى $M'$ على شبكة الشكل ②. ننقل نقطتين مختارتين من كل مستقيم بالمتجه نفسه ونصل صورتيهما. الخاصية تحفظ قياس الزوايا؛ لذا تبقى صورتا المستقيمين متعامدتين كما في الشكل الأصلي.",
        ),
      ],
    ),
    solution(
      'l3-sol-p15-check-parallel-fill',
      'صفحة 15 — تحقّق من فهمك — السؤال 2 — ①',
      'صورة مستقيمين متوازيين وفق أي انسحاب هما ...............',
      [paragraph('الإكمال المطلوب: متوازيان؛ فالانسحاب يحافظ على التوازي.')],
    ),
    solution(
      'l3-sol-p15-check-perpendicular-fill',
      'صفحة 15 — تحقّق من فهمك — السؤال 2 — ②',
      'صورة مستقيمين متعامدين وفق أي انسحاب هما ...............',
      [paragraph('الإكمال المطلوب: متعامدان؛ فالانسحاب يحافظ على قياس الزوايا القائمة.')],
    ),
    solution('l3-sol-p16-ex1-1', 'صفحة 16 — تدرّب ① — البند 1', 'انقل الشكل إلى دفترك.', [
      paragraph(
        'ينسخ التلميذ مواضع $A$ و$B$ والمستقيم $(d)$ مع المحافظة على اتجاه القطعة $[AB]$ بالنسبة إلى المستقيم. صورة التمرين المرفقة تحفظ العلامات والمواضع المطبوعة.',
      ),
    ]),
    solution(
      'l3-sol-p16-ex1-2',
      'صفحة 16 — تدرّب ① — البند 2',
      "استعمل فرجاراً ومسطرة غير مدرجة لرسم $(d')$ صورة المستقيم $(d)$ وفق الانسحاب الذي ينقل $A$ إلى $B$.",
      [
        paragraph(
          "نختار نقطتين $M$ و$N$ على $(d)$. بالفرجار ننقل طول $AB$ وبالمسطرة نضبط اتجاه النقل من $A$ إلى $B$ لننشئ $M'$ و$N'$ بحيث $\\overrightarrow{MM'}=\\overrightarrow{NN'}=\\overrightarrow{AB}$. المستقيم المار بـ$M'$ و$N'$ هو $(d')$.",
        ),
      ],
    ),
    solution(
      'l3-sol-p16-ex1-3',
      'صفحة 16 — تدرّب ① — البند 3',
      "ارسم $(d'')$ صورة المستقيم $(d)$ وفق الانسحاب الذي ينقل $B$ إلى $A$.",
      [
        paragraph(
          "نكرر الإنشاء بمتجه معاكس: ننقل نقطتين من $(d)$ بالمتجه $\\overrightarrow{BA}=-\\overrightarrow{AB}$، ثم نصل صورتيهما لرسم $(d'')$. لا نعكس الطول وحده؛ نعكس الاتجاه أيضاً.",
        ),
      ],
    ),
    solution(
      'l3-sol-p16-ex1-4',
      'صفحة 16 — تدرّب ① — البند 4',
      "ما يمكنك قوله بما يتعلق بالمستقيمين $(d')$ و $(d'')$؟",
      [
        paragraph(
          "كل من $(d')$ و$(d'')$ يوازي $(d)$، ومن ثم فهما متوازيان. وهما متميزان في الشكل لأن $(d)$ غير موازٍ لاتجاه $AB$؛ فالانتقالان المتعاكسان ينقلان $(d)$ إلى جهتين مختلفتين.",
        ),
      ],
    ),
    solution(
      'l3-sol-p16-ex2-1',
      'صفحة 16 — تدرّب ② — البند 1',
      'ارسم هذا المثلث مستعملاً الفرجار ومسطرة غير مدرجة.',
      [
        paragraph(
          'ننشئ زاوية قائمة رأسها $B$. نعيّن $A$ على أحد ضلعيها بحيث $BA=4\\,cm$، و$C$ على الضلع الآخر بحيث $BC=6\\,cm$، ثم نصل $A$ بـ$C$؛ فيكون $ABC$ مثلثاً قائماً في $B$.',
        ),
      ],
    ),
    solution(
      'l3-sol-p16-ex2-2',
      'صفحة 16 — تدرّب ② — البند 2',
      'وضَعِ النقطة $E$ على الضلع $[BA]$ بحيث يكون $BE = 2\\,cm$.',
      [
        paragraph(
          'نقيس $2\\,cm$ ابتداءً من $B$ على القطعة $[BA]$ ونسمّي الموضع $E$. بما أن $BA=4\\,cm$ فإن $EA=BA-BE=2\\,cm$؛ لذا $BE=EA$ و$E$ منتصف $[BA]$.',
        ),
      ],
    ),
    solution(
      'l3-sol-p16-ex2-3',
      'صفحة 16 — تدرّب ② — البند 3',
      "ارسم صورة القطعة $[EB]$ وفق الانسحاب الذي ينقل $A$ إلى $C$ وسمِّها $[E'B']$.",
      [
        paragraph(
          "متجه الانسحاب هو $\\overrightarrow{AC}$. ننشئ $B'$ بحيث $\\overrightarrow{BB'}=\\overrightarrow{AC}$ و$E'$ بحيث $\\overrightarrow{EE'}=\\overrightarrow{AC}$، ثم نصل $E'$ بـ$B'$. بذلك تكون صورة القطعة كلها $[E'B']$، لا أحد طرفيها فقط.",
        ),
        practiceTwoImageFigure,
      ],
    ),
    solution(
      'l3-sol-p16-ex2-4',
      'صفحة 16 — تدرّب ② — البند 4',
      "اشرح ما يمكنك قوله بما يتعلق بالمستقيمين $(AB)$ و $(E'B')$.",
      [
        paragraph(
          "القطعة $[EB]$ تقع على المستقيم $(AB)$. صورة هذا المستقيم وفق انسحاب مستقيم توازيه، وصورتا $E$ و$B$ هما $E'$ و$B'$؛ لذلك $(E'B')\\parallel(AB)$. وهما متمايزان لأن $C$ لا ينتمي إلى $(AB)$، ومن ثم فإن متجهة الانسحاب $\\overrightarrow{AC}$ ليست موازية لـ$(AB)$.",
        ),
      ],
    ),
    solution(
      'l3-sol-p16-ex2-5',
      'صفحة 16 — تدرّب ② — البند 5',
      "ما طول القطعة $[E'B']$؟ اشرح إجابتك.",
      [
        paragraph(
          'طول الصورة يساوي طول الأصل لأن الانسحاب يحافظ على الأطوال. وبما أن $BE=2\\,cm$، فإن $E\\prime B\\prime=EB=2\\,cm$.',
        ),
      ],
    ),
    solution(
      'l3-sol-p16-ex3',
      'صفحة 16 — تدرّب ③',
      'ارسم مستطيلاً $ABCD$ بعداه $AB = 3\\,cm$ و $AD = 2\\,cm$، ثم ارسم صورة هذا المستطيل وفق الانسحاب الذي ينقل $B$ إلى $A$. اشرح خطوات عملك.',
      [
        paragraph(
          "ننشئ أولاً المستطيل $ABCD$ بأبعاده المعطاة. متجه الانسحاب $\\overrightarrow{BA}$ ينقل $B$ إلى $A$. ننقل الرؤوس الأربعة بالمتجه نفسه: $B'=A$، و$C'=D$ لأن $[BC]$ و$[AD]$ متساويتان ومتوازيتان، ثم ننشئ $A'$ و$D'$ بالطريقة نفسها. نصل $A'B'C'D'$ بالترتيب؛ وبحفظ الأطوال والزوايا تكون الصورة مستطيلاً مطابقاً أبعاده $3\\,cm$ و$2\\,cm$.",
        ),
        practiceThreeRectangleFigure,
      ],
    ),
    solution('l3-sol-p16-ex4-1', 'صفحة 16 — تدرّب ④ — السؤال 1', 'أي الأشكال الثلاثة هو رسمه؟', [
      paragraph(
        'رسم غسان هو الشكل ③. في هذا الشكل يتساوى المتجهان $\\overrightarrow{CD}$ و$\\overrightarrow{BA}$ في المقدار والاتجاه، وهو شرط أن تكون $D$ صورة $C$ بالانسحاب الذي ينقل $B$ إلى $A$.',
      ),
    ]),
    solution(
      'l3-sol-p16-ex4-2',
      'صفحة 16 — تدرّب ④ — السؤال 2',
      'ما الخطأ في كل من الشكلين الآخرين؟',
      [
        paragraph(
          'في الشكل ① حُفظ طول $[CD]$ فقط؛ اتجاهه عمودي، ولا يوازي اتجاه $\\overrightarrow{BA}$، لذلك لا يمثل الانسحاب المطلوب.',
        ),
        paragraph(
          'في الشكل ② القطعة $[CD]$ موازية ومساوية في الطول، لكن اتجاه $\\overrightarrow{CD}$ هو اتجاه $\\overrightarrow{AB}$، المعاكس للمتجه المطلوب $\\overrightarrow{BA}$. لذلك الشكل ③ وحده صحيح.',
        ),
      ],
    ),
  ],
};
