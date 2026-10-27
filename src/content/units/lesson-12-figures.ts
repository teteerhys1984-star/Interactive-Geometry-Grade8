import type { ImageDiagram, InteractiveDiagram } from '../schema';
import { exerciseSource } from './lesson-12-questions';

/**
 * ============================================================================
 *  UNIT 2 — «تمارين الوحدة الثانية» · THE FIGURES OF Q28–Q34
 * ============================================================================
 *
 *  Six figures are RECONSTRUCTED from the supplied scans (Q28, Q29, Q30, Q32,
 *  and the two cases of Q33); one is the PHOTOGRAPH the page prints (Q31).
 *
 *  Every reconstructed figure is `origin: 'textbook'`: it reproduces a figure
 *  printed in the source, drawn from the coordinates measured in
 *  `lesson-12-unit-two-exercises-geometry.ts` (read from the scan, never
 *  guessed) and carrying the printed marks — equality ticks, parallel
 *  arrowheads, printed measurements, printed colours. The per-figure
 *  verification record is in docs/UNIT-02-EXERCISES-FIGURES.md.
 *
 *  Question 31's figure is NOT redrawn: the page prints a photograph, and the
 *  exercise still asks the student for a separate schematic of his own. The
 *  photograph is kept as an approved source image.
 *
 *  Questions 25 and 34 print no figure at all, and none is invented for them.
 * ============================================================================
 */

const Q28_SOURCE = exerciseSource(28);
const Q29_SOURCE = exerciseSource(29);
const Q30_SOURCE = exerciseSource(30);
const Q31_SOURCE = exerciseSource(31);
const Q32_SOURCE = exerciseSource(32);
const Q33_SOURCE = exerciseSource(
  33,
  'النص المطبوع هو المرجع: يذكر «$(IF)$» بينما الرسم المطبوع يسمّي نهاية المقطع الأحمر الخارج من $I$ بالحرف $M$، ولا يظهر أي حرف $F$ في الرسم. الرسم أُعيد كما هو مطبوع، والتعارض مسجَّل في ملاحظات المعلّم.',
);

/** Question 28 — the quadrilateral with its diagonal, the red line and the marks. */
export const fig12Q28: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-u2-q28-midpoint-parallel',
  renderer: 'unit-two-exercises-figure',
  alt: 'رسم رباعي $EHGF$ أضلاعه $[EH]$ و$[HG]$ و$[GF]$ و$[FE]$، وقطره $[EG]$، والضلع $[EF]$ مقسوم إلى نصفين متساويين عند $M$ بعلامتَي تساوٍ مزدوجتين، والقطر $[EG]$ مقسوم إلى نصفين متساويين عند $N$ بعلامتَي تساوٍ مفردتين، ويقطع المستقيم $(NP)$ المرسوم بالأحمر الضلع $[EH]$ عند $P$، ويحمل الشكل سهمين — أحدهما أحمر والآخر أسود — دالّين على التوازي بين $(NP)$ و$(HG)$.',
  caption: 'رسم مطبوع مُعاد بناؤه — الموضع داخل الشكل تخطيطي، وعلامة التوازي هي التي تقرّر العلاقة.',
  source: Q28_SOURCE,
  params: { scenario: 'q28-midpoint-parallel' },
};

/** Question 29 — the triangle, the blue segment parallel to the base and the red transversal. */
export const fig12Q29: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-u2-q29-equal-ratios',
  renderer: 'unit-two-exercises-figure',
  alt: 'مثلث $ABC$ رأسه $A$، وقاعدته $[CB]$ مرسومة بالأزرق، و$[NM]$ قطعة مرسومة بالأزرق موازية للقاعدة وتقطع $[AC]$ في $N$ و$[AB]$ في $M$، ويقطع المستقيم الأحمر $AJK$ القطعةَ $[NM]$ في $J$ والقاعدةَ $[CB]$ في $K$، وتُطبع الأطوال $3$ و$2$ على $[NJ]$ و$[JM]$، والطول $4.5$ على $[KB]$.',
  caption: 'رسم مطبوع مُعاد بناؤه — الأطوال المطبوعة هي المعطيات، وأطوال الرسم تخطيطية.',
  source: Q29_SOURCE,
  params: { scenario: 'q29-equal-ratios' },
};

/** Question 30 — the segment to be divided, its five printed ticks and the blue ray. */
export const fig12Q30: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-u2-q30-divide-segment',
  renderer: 'unit-two-exercises-figure',
  alt: 'قطعة مستقيمة $[AF]$ سوداء تنطلق من $A$ إلى $F$، وعليها خمس علامات تساوٍ حمراء تفصل بين $B$ و$C$ و$D$ و$E$ و$F$، ويخرج من $A$ نصف مستقيم أزرق $[Ax)$ نحو الحرف $x$، ولا تظهر النقطة $M$ في الرسم.',
  caption: 'رسم مطبوع مُعاد بناؤه — النقطة $M$ لا تظهر في الشكل المطبوع، والمطلوب وضعها على نصف المستقيم $[Ax)$.',
  source: Q30_SOURCE,
  params: { scenario: 'q30-divide-segment' },
};

/** Question 31 — the photograph the page prints, kept as printed. */
export const fig12Q31: ImageDiagram = {
  kind: 'image',
  origin: 'textbook',
  id: 'fig-u2-q31-tower-photo',
  src: 'diagrams/unit-02/exercises/q31-tower-photo.png',
  aspectRatio: 634 / 286,
  alt: 'صورة فوتوغرافية لمشهد ساحلي: فتاة تقف على اليسار على مسافة قصيرة من عمود، ويمتد خط نظر متقطع مستقيم من عينها مارّاً بأعلى العمود إلى قمة المنارة البيضاء في الطرف الأيمن.',
  caption: 'الصورة المطبوعة في الكتاب — ليست رسماً بمقياس، ولذلك يطلب السؤال رسم شكل معبر.',
  source: Q31_SOURCE,
};

/** Question 32 — the two towers, the ground line and the sight line. */
export const fig12Q32: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-u2-q32-distance-towers',
  renderer: 'unit-two-exercises-figure',
  alt: 'برجان عموديان مرسومان بالأزرق: $[AB]$ ارتفاعه $40\\ m$ و$[MC]$ ارتفاعه $30\\ m$، يجمعهما خط ساحل أسود يمر بـ $B$ و$M$ و$K$، ومن قمة البرج $A$ يمر خط نظر أسود إلى $K$ مارّاً بـ $C$، وتُطبع المسافة $50$ على $[BM]$ والمسافة المجهولة $x$ على $[MK]$.',
  caption: 'رسم مطبوع مُعاد بناؤه — الأطوال المطبوعة هي المعطيات، وأطوال الرسم تخطيطية.',
  source: Q32_SOURCE,
  params: { scenario: 'q32-distance-towers' },
};

/** Question 33, case ① — the triangle with the two red parallel segments. */
export const fig12Q33CaseOne: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-u2-q33-case-one',
  renderer: 'unit-two-exercises-figure',
  alt: 'مثلث $STU$ رأسه $S$، و$N$ و$I$ نقطتان على $[ST]$ بالترتيب من الأعلى إلى الأسفل، و$K$ و$J$ نقطتان على $[SU]$ بالترتيب نفسه، ويصل بينها المقطعان الأحمران $[NK]$ و$[IJ]$.',
  caption: 'رسم مطبوع مُعاد بناؤه — المقطعان $[NK]$ و$[IJ]$ هما ما تصفه عبارتا التوازي المطبوعتان.',
  source: Q33_SOURCE,
  params: { scenario: 'q33-case-one' },
};

/**
 * Question 33, case ② — reproduced EXACTLY as printed: the red segment that
 * starts at $I$ ends at the point the page labels $M$, and no $F$ is labelled
 * anywhere in the printed figure, although the printed text writes
 * «$(CG) \parallel (IF)$». The text is authoritative and is reproduced
 * verbatim; the figure is not silently relabelled to agree with it.
 */
export const fig12Q33CaseTwo: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-u2-q33-case-two',
  renderer: 'unit-two-exercises-figure',
  alt: 'نصف مستقيم $[ABC]$ ينطلق من $A$ صعوداً إلى $B$ ثم إلى $C$، وخط أفقي يمر بـ $A$ و$H$ و$D$ و$I$ و$E$ بالترتيب، وينزل من $E$ خط إلى $M$ ثم إلى $G$، وتُرسم ثلاثة مقاطع حمراء: $[BH]$ و$[CG]$ المارّ بـ $D$ و$[IM]$.',
  caption: 'رسم مطبوع مُعاد بناؤه للشكل المرافق للحالة ② من السؤال 33.',
  source: Q33_SOURCE,
  params: { scenario: 'q33-case-two' },
};

/* ========================================================================== */
/*  BATCH 2 — Questions 18–27                                                   */
/* ========================================================================== */

const Q18_SOURCE = exerciseSource(18);
const Q19_SOURCE = exerciseSource(19);
const Q20_SOURCE = exerciseSource(20);
const Q21_SOURCE = exerciseSource(21);
const Q24_SOURCE = exerciseSource(24);
const Q26_SOURCE = exerciseSource(
  26,
  'رسم هذه الصفحة مقياسه: السنتيمتر الواحد المطبوع يساوي نحو مئة بكسل في الصورة، والأطوال المطبوعة كلها محقَّقة على الرسم.',
);
const Q27_SOURCE = exerciseSource(
  27,
  'رسم هذه الصفحة مقياسه: الوحدة المطبوعة الواحدة تساوي نحو أربعة وخمسين بكسل في الصورة.',
);

/** Question 18, case ① — triangle EHK with parallel segment [FJ] and dashed arrow 32.5. */
export const fig12Q18CaseOne: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-u2-q18-case-one',
  renderer: 'unit-two-exercises-figure',
  alt: 'مثلث $EHK$ بخطوط سوداء قاعدته الأفقية $[EK]$ ورأسه $H$، والنقطة $F$ على $[EH]$ والنقطة $J$ على $[EK]$ بحيث $[FJ]$ موازٍ لـ $[HK]$، ويُطبع الطولان الأحمران $5$ على $[EF]$ و$8$ على $[FH]$، وأسفل $[EK]$ سهم متقطع مزدوج الرأسين بالأسود تحته الطول الأحمر $32.5$.',
  caption: 'رسم مطبوع مُعاد بناؤه للحالة ① من السؤال 18 — الأطوال المطبوعة بالأحمر هي المعطيات.',
  source: Q18_SOURCE,
  params: { scenario: 'q18-case-one' },
};

/** Question 18, case ② — triangle MBA with parallel segment [EJ] and red lengths 3, 9, 8. */
export const fig12Q18CaseTwo: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-u2-q18-case-two',
  renderer: 'unit-two-exercises-figure',
  alt: 'مثلث $MBA$ بخطوط سوداء قاعدته الأفقية $[MA]$ ورأسه $B$، والنقطة $E$ على $[MB]$ والنقطة $J$ على $[MA]$ بحيث $[EJ]$ موازٍ لـ $[BA]$، وتُطبع بالأحمر الأطوال $3$ أسفل $[MJ]$ و$9$ أسفل $[JA]$ و$8$ بجانب $[BA]$.',
  caption: 'رسم مطبوع مُعاد بناؤه للحالة ② من السؤال 18 — الأطوال المطبوعة بالأحمر هي المعطيات.',
  source: Q18_SOURCE,
  params: { scenario: 'q18-case-two' },
};

/** Question 19 — triangle ABC extended along [AB) to K, with [IJ], [BC] and [KJ] meeting at D. */
export const fig12Q19: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-u2-q19-proof-draft',
  renderer: 'unit-two-exercises-figure',
  alt: 'شكل هندسي بخطوط سوداء: النقاط $A$ و$I$ و$B$ و$K$ على استقامة واحدة مع علامة تساوٍ حمراء مفردة على كل من $[AI]$ و$[IB]$ و$[BK]$، والنقطة $J$ منتصف $[AC]$ بعلامتَي تساوٍ حمراوين مزدوجتين على كل من $[AJ]$ و$[JC]$، وتُوصَل القطعتان $[IJ]$ و$[BC]$، وتقطع القطعة $[KJ]$ الضلع $[BC]$ في النقطة $D$.',
  caption: 'رسم مطبوع مُعاد بناؤه للسؤال 19 — علامات التساوي الحمراء على $[AK]$ و$[AC]$ هي المعطيات المرمّزة على الشكل.',
  source: Q19_SOURCE,
  params: { scenario: 'q19-proof-draft' },
};

/** Question 20 — the printed proof flowchart, with its printed dotted blanks. */
export const fig12Q20: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-u2-q20-flowchart',
  renderer: 'unit-two-exercises-figure',
  alt: 'مخطط بياني مطبوع من مربعات زرقاء: في أعلى اليسار مربّع «$ABC$ قائم في $A$» ينزل منه خط إلى مربّع «تعريف المثلث القائم» ثم إلى مربّع «$\\widehat{A} = 90°$»، وفي أعلى اليمين ثلاثة مربعات: «$C\'$ منتصف $[AB]$» و«$A\'$ منتصف $[BC]$» و«$B\'$ منتصف $[AC]$»، وتلتقي تحتها مربعات فارغة منقّطة تنتهي بعبارتي «$(A\'C\') \\parallel (AC)$» و«$(A\'B\') \\parallel (AB)$» ثم بمربّع «$AB\'A\'C\'$ هو متوازي أضلاع» ثم بمربّع «$AB\'A\'C\'$ هو مستطيل».',
  caption: 'رسم مطبوع مُعاد بناؤه — المربعات ذات النقاط هي فراغات التمرين المطبوعة، وتُترك فارغة.',
  source: Q20_SOURCE,
  params: { scenario: 'q20-flowchart' },
};

/** Question 21 — the quadrilateral and its medial quadrilateral. */
export const fig12Q21: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-u2-q21-midpoint-quadrilateral',
  renderer: 'unit-two-exercises-figure',
  alt: 'رباعي $ABCD$ مرسوم بالأزرق، ورأسه $A$ في الأعلى و$B$ و$C$ في الأسفل و$D$ في اليمين، ويرسم داخله بالأحمر الرباعي $EFGH$ حيث $E$ على $[AB]$ و$F$ على $[BC]$ و$G$ على $[CD]$ و$H$ على $[DA]$.',
  caption: 'رسم مطبوع مُعاد بناؤه — النقاط الأربع هي منتصفات الأضلاع كما يذكر النص.',
  source: Q21_SOURCE,
  params: { scenario: 'q21-midpoint-quadrilateral' },
};

/** Question 24 — the triangle, its altitude and the line through the two midpoints. */
export const fig12Q24: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-u2-q24-altitude-bisector',
  renderer: 'unit-two-exercises-figure',
  alt: 'مثلث $ABC$ رأسه $A$ في الأعلى، وقاعدته $[BC]$ سوداء، و$AH$ ارتفاع أزرق ينزل من $A$ إلى $H$ على $[BC]$ وعند $H$ علامة زاوية قائمة زرقاء، ويقطع المستقيم الأحمر $(IJ)$ ضلع $[AB]$ في $I$ و$[AC]$ في $J$ و$[AH]$ في $K$، وعلى $[AI]$ و$[IB]$ علامة تساوٍ مزدوجة حمراء، وعلى $[AJ]$ و$[JC]$ علامة تساوٍ مفردة حمراء.',
  caption: 'رسم مطبوع مُعاد بناؤه — $[AH]$ أزرق و$(IJ)$ أحمر، والعلامات تصف ما يذكره النص.',
  source: Q24_SOURCE,
  params: { scenario: 'q24-altitude-bisector' },
};

/** Question 26 — the triangle, the parallel segment and the altitude. */
export const fig12Q26: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-u2-q26-parallel-segment',
  renderer: 'unit-two-exercises-figure',
  alt: 'مثلث $ABC$ رأسه $A$، و$[AB]$ و$[BC]$ سوداوان، و$[AC]$ أزرق، و$[MN]$ قطعة زرقاء توازي $[AC]$ وتقطع $[AB]$ في $M$ و$[BC]$ في $N$، و$[AH]$ ارتفاع أحمر ينزل من $A$ إلى $H$ على $[BC]$ وعند $H$ علامة زاوية قائمة حمراء.',
  caption: 'رسم مطبوع مُعاد بناؤه — هذا الرسم مقياس: الأطوال المطبوعة محقَّقة عليه.',
  source: Q26_SOURCE,
  params: { scenario: 'q26-parallel-segment' },
};

/** Question 27 — the triangle with the two parallel segments and the six unknowns. */
export const fig12Q27: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-u2-q27-unknowns',
  renderer: 'unit-two-exercises-figure',
  alt: 'مثلث $FGE$ رأسه $E$ في أعلى اليمين، و$[FE]$ و$[FG]$ سوداوان، و$[ST]$ قطعة زرقاء من $S$ على $[FE]$ إلى $T$ على $[FG]$، و$[GE]$ أزرق، وتُطبع بالأحمر الأطوال $9$ على $[FS]$ و$x$ على $[SE]$ و$y$ على $[FT]$ و$3$ على $[TG]$ و$8$ على $[GE]$ و$5$ على $[ST]$.',
  caption: 'رسم مطبوع مُعاد بناؤه — هذا الرسم مقياس: الأطوال المطبوعة محقَّقة عليه.',
  source: Q27_SOURCE,
  params: { scenario: 'q27-unknowns' },
};

/** Every figure of Questions 18–34, in printed order. */
export const LESSON12_FIGURES = [
  fig12Q18CaseOne,
  fig12Q18CaseTwo,
  fig12Q19,
  fig12Q20,
  fig12Q21,
  fig12Q24,
  fig12Q26,
  fig12Q27,
  fig12Q28,
  fig12Q29,
  fig12Q30,
  fig12Q31,
  fig12Q32,
  fig12Q33CaseOne,
  fig12Q33CaseTwo,
] as const;
