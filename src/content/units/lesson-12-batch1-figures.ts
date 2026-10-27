import type { InteractiveDiagram } from '../schema';
import { batch1Source } from './lesson-12-batch1-questions';

/**
 * ============================================================================
 *  UNIT 2 — «تمارين الوحدة الثانية» · THE FIGURES OF Q1–Q17 (BATCH 1)
 * ============================================================================
 *
 *  Twenty figures, all `origin: 'textbook'`: every one of them reproduces a
 *  figure printed in the twenty scans of Batch 1 (`image-1` … `image-20`).
 *  Nothing is drawn for the questions that print no figure at all — Questions
 *  7, 8, 11 and 12 ask the student to draw his own figure, and the page prints
 *  none for them.
 * ============================================================================
 */

/** Question 1, item ② — the quadrilateral with the three marked points. */
export const fig12bQ1: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-u2-q1-quadrilateral',
  renderer: 'unit-two-exercises-figure',
  alt: 'رسم رباعي $ABDC$ رأساه $A$ و$B$ في الأعلى و$C$ و$D$ في الأسفل، و$[AB]$ موازٍ لـ $[CD]$ كما هو مطبوع، و$I$ منتصف $[AC]$ بعلامتَي تساوٍ مفردتين حمراوين، و$J$ منتصف $[AD]$ بعلامتَي تساوٍ مزدوجتين حمراوين، و$K$ على $[CD]$ حيث يقطعه المستقيم $(BJK)$، و$[IJ]$ قطعة أفقية تربط $I$ بـ $J$.',
  caption: 'رسم مطبوع مُعاد بناؤه للشكل المرافق للبند ② من السؤال 1.',
  source: batch1Source(
    1,
    'الرسم المطبوع يوازي $[AB]$ بـ $[CD]$ ويجمع $B$ و$J$ و$K$ على مستقيم واحد، وهو أبعد مما يذكره النص؛ أُعيد كما هو مطبوع.',
  ),
  params: { scenario: 'q1-quadrilateral' },
};

/** Question 1, item ③ — candidate figure ① (rightmost in RTL order). */
export const fig12bQ1CaseOne: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-u2-q1-case-one',
  renderer: 'unit-two-exercises-figure',
  alt: 'المثلث القائم $ABC$ وزاويته القائمة في $B$ بعلامة مربعة حمراء، و$I$ منتصف $[BC]$ بعلامتَي تساوٍ مزدوجتين حمراوين، و$J$ على $[AC]$، والقطعة $[IJ]$ عمودية على $[BC]$ بعلامة مربعة حمراء عند $I$، وتحته الرقم ① بخلفية صفراء.',
  caption: 'الشكل ① من البند ③ في السؤال 1 — كما هو مطبوع.',
  source: batch1Source(1),
  params: { scenario: 'q1-case-one' },
};

/** Question 1, item ③ — candidate figure ② (middle). */
export const fig12bQ1CaseTwo: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-u2-q1-case-two',
  renderer: 'unit-two-exercises-figure',
  alt: 'المثلث $ABC$ ورأسه $B$ في الأعلى، و$I$ على $[BC]$ و$J$ على $[AC]$، والقطعة $[IJ]$ تربط بينهما بلا علامات، وتحته الرقم ② بخلفية صفراء.',
  caption: 'الشكل ② من البند ③ في السؤال 1 — كما هو مطبوع.',
  source: batch1Source(1),
  params: { scenario: 'q1-case-two' },
};

/** Question 1, item ③ — candidate figure ③ (leftmost in RTL order). */
export const fig12bQ1CaseThree: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-u2-q1-case-three',
  renderer: 'unit-two-exercises-figure',
  alt: 'المثلث $ABC$ ورأسه $B$ في الأعلى، و$I$ على $[BC]$ بعلامتَي تساوٍ مزدوجتين حمراوين، و$J$ على $[AC]$، والقطعة $[IJ]$ تربط بينهما، وتحته الرقم ③ بخلفية صفراء.',
  caption: 'الشكل ③ من البند ③ في السؤال 1 — كما هو مطبوع.',
  source: batch1Source(1),
  params: { scenario: 'q1-case-three' },
};

/** Question 1, items ④–⑤ — the triangle NAB with [MP] ∥ [AB] (image 3). */
export const fig12bQ1Thales: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-u2-q1-thales-triangle',
  renderer: 'unit-two-exercises-figure',
  alt: 'المثلث $NAB$ ورأسه $N$ في الأعلى، و$M$ على $[AN]$ و$P$ على $[BN]$، والقطعة $[MP]$ موازية لـ $[AB]$، وتُطبع الأطوال الحمراء $2$ على $[NM]$ و$4$ على $[MA]$ و$1.8$ على $[NP]$ و$1.2$ تحت $[MP]$.',
  caption: 'الشكل المرافق للبندين ④ و⑤ من السؤال 1 — مرسوم بمقياس في المصدر والأطوال المطبوعة بالأحمر هي المعطيات.',
  source: batch1Source(1),
  params: { scenario: 'q1-thales-triangle' },
};

/** Question 2, item ① — the two circles. */
export const fig12bQ2Circles: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-u2-q2-circles',
  renderer: 'unit-two-exercises-figure',
  alt: "دائرتان $\\mathcal{C}$ و$\\mathcal{C}'$ مركزاهما على التوالي $O$ و$O'$، تتقاطعان في $A$، و$(AO)$ يقطع $\\mathcal{C}$ في $B$، و$(AO')$ يقطع $\\mathcal{C}'$ في $B'$، مع إشارة تعيين المركز عند كلٍّ من $O$ و$O'$.",
  caption: 'رسم مطبوع مُعاد بناؤه — الدائرتان متقاطعتان في $A$، والقطعتان $[AB]$ و$[AB\']$ قطران فيهما يمران بـ $O$ و$O\'$.',
  source: batch1Source(2),
  params: { scenario: 'q2-circles' },
};

/** Question 2, item ② — the triangle with J and K. */
export const fig12bQ2Triangle: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-u2-q2-triangle',
  renderer: 'unit-two-exercises-figure',
  alt: 'المثلث $ABC$ رأسه $A$، و$J$ على $[AB]$ و$K$ على $[AC]$، والقطعة $[JK]$ توازي القاعدة، وعلامتا تساوٍ مزدوجتان حمراوان على $[AB]$ فقط، والطول $8\\ cm$ مكتوب تحت $[BC]$.',
  caption: 'رسم مطبوع مُعاد بناؤه للشكل المرافق للبند ② من السؤال 2.',
  source: batch1Source(
    2,
    'النص يقول إن $K$ منتصف $[AC]$، والرسم المطبوع يضع علامات التساوي على $[AB]$ وحدها؛ أُعيد الرسم كما هو مطبوع.',
  ),
  params: { scenario: 'q2-triangle' },
};

/** Question 2, item ④ — the figure carrying x, y, 2, 5 and 8. */
export const fig12bQ2Quadrilateral: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-u2-q2-quadrilateral',
  renderer: 'unit-two-exercises-figure',
  alt: 'الشكل $MDEF$ و$M$ في الأعلى، و$A$ على $[MD]$ و$B$ على $[ME]$ و$C$ على $[MF]$، و$[AB]$ و$[BC]$ و$[DE]$ و$[EF]$ قطع مرسومة، وتُطبع الأطوال $5$ و$2$ و$8$ و$y$ و$x$ بالأحمر على القطع التي تقيسها.',
  caption: 'رسم مطبوع مُعاد بناؤه — الأطوال المطبوعة بالأحمر هي المعطيات، وأطوال الرسم تخطيطية.',
  source: batch1Source(2),
  params: { scenario: 'q2-quadrilateral' },
};

/** Question 3 — the rectangle. */
export const fig12bQ3: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-u2-q3-rectangle',
  renderer: 'unit-two-exercises-figure',
  alt: 'مستطيل $ABCD$ مرسوم بالأزرق، و$I$ منتصف $[AD]$ بعلامتَي تساوٍ مزدوجتين سوداوين، و$K$ و$J$ على $[AB]$، والقطعتان $[IK]$ و$[DJ]$ حمراوان، وثلاثة أسهم مزدوجة متقطعة زرقاء تقيس $AK$ بـ $2$ و$JB$ بـ $4$ و$DC$ بـ $8$.',
  caption: 'رسم مطبوع مُعاد بناؤه — الأطوال المطبوعة هي المعطيات، وأطوال الرسم تخطيطية.',
  source: batch1Source(3),
  params: { scenario: 'q3-rectangle' },
};

/** Question 4 — the triangle with the two midpoints. */
export const fig12bQ4: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-u2-q4-triangle',
  renderer: 'unit-two-exercises-figure',
  alt: 'المثلث $ABC$ مرسوم بالأزرق، و$I$ على $[AB]$ و$J$ على $[AC]$، والقطعة $[IJ]$ حمراء، وتُطبع الأطوال الزرقاء $2$ و$2$ على $[AB]$ و$3$ و$3$ على $[AC]$ و$5$ تحت $[BC]$، وحرفا $I$ و$J$ باللون الأحمر.',
  caption: 'رسم مطبوع مُعاد بناؤه — الأطوال المطبوعة هي المعطيات، وأطوال الرسم تخطيطية.',
  source: batch1Source(4),
  params: { scenario: 'q4-triangle' },
};

/** Question 5 — the triangle with its three midpoints. */
export const fig12bQ5: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-u2-q5-medial-triangle',
  renderer: 'unit-two-exercises-figure',
  alt: 'المثلث $ABC$ مرسوم بالأزرق، و$I$ و$K$ و$J$ منتصفات $[AB]$ و$[AC]$ و$[BC]$ بتسميات حمراء، والمثلث $IJK$ مرسوم بالأحمر، وعلامات التساوي السوداء مفردة على $[AB]$ ومزدوجة على $[AC]$ وثلاثية على $[BC]$.',
  caption: 'رسم مطبوع مُعاد بناؤه — الأطوال المطبوعة في النص هي المعطيات، وأطوال الرسم تخطيطية.',
  source: batch1Source(5),
  params: { scenario: 'q5-medial-triangle' },
};

/** Question 6 — the parallelogram and its reflection in C. */
export const fig12bQ6: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-u2-q6-parallelogram',
  renderer: 'unit-two-exercises-figure',
  alt: 'متوازي الأضلاع $ABCD$ مرسوم بالأزرق، و$O$ مركزه عند تقاطع قطريه $AC$ و$DB$ المرسومين بالأسود، و$E$ على امتداد $[DC]$ بالأسود بحيث تكون $C$ منتصف $[DE]$، والقطعة $[BE]$ سوداء.',
  caption: 'رسم مطبوع مُعاد بناؤه — $C$ هي منتصف $[DE]$ كما يذكر النص، ومتوازي الأضلاع أزرق بينما القطران و$[CE]$ و$[BE]$ بالأسود.',
  source: batch1Source(6),
  params: { scenario: 'q6-parallelogram' },
};

/** Question 9 — the triangle with the three midpoints. */
export const fig12bQ9: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-u2-q9-triangle',
  renderer: 'unit-two-exercises-figure',
  alt: 'المثلث $ABD$ مرسوم بالأزرق و$C$ على $[BD]$، والقطعة $[AC]$ زرقاء، و$E$ و$F$ و$J$ منتصفات $[AB]$ و$[AC]$ و$[AD]$ معلّمة بثلاث نقاط سوداء وتسميات سوداء.',
  caption: 'رسم مطبوع مُعاد بناؤه — المواضع تخطيطية ومنتصفات القطع هي التي تصف الشكل.',
  source: batch1Source(9),
  params: { scenario: 'q9-triangle' },
};

/** Question 10 — the first printed figure (①). */
export const fig12bQ10CaseOne: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-u2-q10-case-one',
  renderer: 'unit-two-exercises-figure',
  alt: 'المثلث القائم $ABC$ مرسوم بالأزرق بعلامة زاوية قائمة حمراء عند $B$، ومستقيم أخضر يمر بـ $I$ على $[AC]$ وبـ $J$ على $[BC]$ مع علامة زاوية قائمة حمراء عند $J$، وعلامتَي تساوٍ مزدوجتين حمراوين على $[BJ]$ و$[JC]$، وتحته الرقم ① بخلفية صفراء.',
  caption: 'الشكل ① من السؤال 10 — كما هو مطبوع، بمستقيم أخضر وإشارات حمراء ورقم ① بخلفية صفراء.',
  source: batch1Source(10),
  params: { scenario: 'q10-case-one' },
};

/** Question 10 — the second printed figure (②). */
export const fig12bQ10CaseTwo: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-u2-q10-case-two',
  renderer: 'unit-two-exercises-figure',
  alt: 'المثلث $ABC$ مرسوم بالأزرق، ومستقيم أخضر يمر بـ $I$ على $[AC]$ وبـ $J$ على $[BC]$، وعلامتا تساوٍ مزدوجتان حمراوان على $[BJ]$ و$[JC]$، وقوسا زاويتين متساويتين بالأحمر عند $B$ وعند $J$، وتحته الرقم ② بخلفية صفراء.',
  caption: 'الشكل ② من السؤال 10 — كما هو مطبوع، بمستقيم أخضر وإشارات حمراء ورقم ② بخلفية صفراء.',
  source: batch1Source(10),
  params: { scenario: 'q10-case-two' },
};

/** Question 13 — the frame with the hidden vertex. */
export const fig12bQ13: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-u2-q13-hidden-vertex',
  renderer: 'unit-two-exercises-figure',
  alt: 'إطار أسود مستطيل، وداخله جزء من المثلث $ABC$ مرسوم بالأزرق: الضلع $[AB]$ كامل، والضلعان الآخران يخرجان من الجهة اليمنى للإطار فلا تظهر النقطة $C$.',
  caption: 'رسم مطبوع مُعاد بناؤه — الإطار الأسود جزء من الشكل، والنقطة $C$ خارجه فلا تظهر.',
  source: batch1Source(13),
  params: { scenario: 'q13-hidden-vertex' },
};

/** Question 14 — the triangle with the two parallel lines. */
export const fig12bQ14: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-u2-q14-triangle',
  renderer: 'unit-two-exercises-figure',
  alt: 'المثلث $ABC$ مرسوم بالأزرق، و$D$ منتصف $[BC]$ بعلامتَي تساوٍ مزدوجتين سوداوين، و$M$ منتصف $[AD]$ بعلامتَي تساوٍ مفردتين سوداوين، و$[FC]$ سوداء تمر بـ $M$، و$[ED]$ سوداء، ورأس سهم أسود على كلٍّ منهما علامة للتوازي.',
  caption: 'رسم مطبوع مُعاد بناؤه — $D$ و$M$ منتصفا $[BC]$ و$[AD]$ كما يذكر النص، وسهما التوازي المطبوعان على $[FC]$ و$[ED]$.',
  source: batch1Source(14),
  params: { scenario: 'q14-triangle' },
};

/** Question 15 — the triangle and the parallel segment. */
export const fig12bQ15: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-u2-q15-triangle',
  renderer: 'unit-two-exercises-figure',
  alt: 'المثلث $ABC$ مرسوم بالأزرق و$A$ و$B$ في الأسفل و$C$ في الأعلى، و$V$ على $[AC]$ و$T$ على $[AB]$، والقطعة $[VT]$ مرسومة بالأسود، وتُطبع الأطوال الحمراء $3.5$ و$3$ و$6.6$ على $[AV]$ و$[VT]$ و$[CB]$، وسهم متقطع أسود تحت $[AB]$ يحمل الطول الأحمر $9.9$.',
  caption: 'رسم مطبوع مُعاد بناؤه — الأطوال المطبوعة هي المعطيات، وأطوال الرسم تخطيطية.',
  source: batch1Source(15),
  params: { scenario: 'q15-triangle' },
};

/** Question 16 — the triangle with the parallel segment. */
export const fig12bQ16: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-u2-q16-triangle',
  renderer: 'unit-two-exercises-figure',
  alt: 'المثلث $ABC$ بخطوط سوداء، و$D$ على $[AB]$ و$E$ على $[AC]$، والقطعة $[DE]$ سوداء موازية لـ $[BC]$، وسهم متقطع مزدوج فوق $[BA]$ يحمل الطول الأحمر $12$، وسهم متقطع مزدوج بجانب $[AC]$ يحمل $6$، والطولان الأحمران $9$ فوق $[DA]$ و$7$ فوق $[DE]$.',
  caption: 'رسم مطبوع مُعاد بناؤه — الأطوال المطبوعة هي المعطيات، وأطوال الرسم تخطيطية.',
  source: batch1Source(16),
  params: { scenario: 'q16-triangle' },
};

/** Question 17 — the triangle with the parallel segment. */
export const fig12bQ17: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-u2-q17-triangle',
  renderer: 'unit-two-exercises-figure',
  alt: 'المثلث $LMN$ بخطوط سوداء، و$Q$ على $[LN]$ و$P$ على $[LM]$، والقطعة $[QP]$ سوداء موازية لـ $[MN]$، وسهم متقطع مزدوج خارج $[LN]$ يحمل الطول الأحمر $16$ وآخر خارج $[LM]$ يحمل $21$، والطولان الأحمران $4$ على $[QN]$ و$9$ على $[QP]$.',
  caption: 'رسم مطبوع مُعاد بناؤه — الأطوال المطبوعة هي المعطيات، وأطوال الرسم تخطيطية.',
  source: batch1Source(17),
  params: { scenario: 'q17-triangle' },
};

/** Every printed figure of Batch 1, in printed order. */
export const LESSON12_BATCH1_FIGURES: readonly InteractiveDiagram[] = [
  fig12bQ1,
  fig12bQ1CaseOne,
  fig12bQ1CaseTwo,
  fig12bQ1CaseThree,
  fig12bQ1Thales,
  fig12bQ2Circles,
  fig12bQ2Triangle,
  fig12bQ2Quadrilateral,
  fig12bQ3,
  fig12bQ4,
  fig12bQ5,
  fig12bQ6,
  fig12bQ9,
  fig12bQ10CaseOne,
  fig12bQ10CaseTwo,
  fig12bQ13,
  fig12bQ14,
  fig12bQ15,
  fig12bQ16,
  fig12bQ17,
];
