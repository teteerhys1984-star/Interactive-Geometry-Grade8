import type { InteractiveDiagram } from '../schema';
import {
  compassGiven,
  hookSheet,
  page10,
  page10Answers,
  page8,
  page8Images,
  practiceParallelogram,
  practiceTriangle,
} from './lesson-02-geometry';
import type { XY } from './lesson-02-geometry';

/**
 * ============================================================================
 *  الدرس الثاني — الأشكال (صفحات 8–10)
 * ============================================================================
 *  Every diagram spec used by Lesson 2 lives here, so provenance can be audited
 *  in one place:
 *
 *    `origin: 'textbook'`  — the two squared-paper sheets. Each was read off
 *                            the scan coordinate by coordinate and verified
 *                            arithmetically (docs/LESSON-02-COVERAGE.md §5).
 *
 *    `origin: 'authored'`  — every other figure. These preserve the *relations*
 *                            printed in the book (incidence, order, equalities,
 *                            which intersection is chosen) but their distances
 *                            are the platform's, because the printed blank-sheet
 *                            figures carry no measurements. Each captions itself
 *                            as «رسم تعليمي من إعداد المنصّة».
 *
 *  No printed scan is published with the lesson.
 * ============================================================================
 */

const page8Source = { page: 8, locator: 'نشاط — 1. على ورقة سنتيمترية' } as const;
const page10Source = { page: 10, locator: 'تدرّب — ③' } as const;

const AUTHORED_CAPTION =
  'رسم تعليمي من إعداد المنصّة — يحفظ العلاقات المطبوعة، والمسافات فيه ليست من الكتاب.';
/** For the two «تحقّق من فهمك» diagrams: the page prints no figure at all. */
const CHECK_CAPTION =
  'رسم تعليمي من إعداد المنصّة — الصفحة المطبوعة لا ترسم شكلاً لهذين المطلوبين، والمسافات هنا ليست من الكتاب.';
const TEXTBOOK_CAPTION = 'الشكل المطبوع — أُعيد رسمه بالشبكة نفسها والإحداثيات نفسها.';

/* --------------------------------------------------------------------------
 *  PAGE 8 — squared paper: 9 × 5, line from (0,5) to (5,0). M sits on column
 *  line 6, so three of the nine columns lie to its right, as printed.
 * ----------------------------------------------------------------------- */
export const figPage8Grid: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-8-activity-grid',
  renderer: 'grid-figure',
  alt: 'شبكة سنتيمترية من تسعة أعمدة وخمسة أسطر، يمرّ فيها مستقيم من الزاوية العليا اليسرى نازلاً إلى الحافة السفلى عند العمود الخامس، وعليه النقاط $B$ ثم $P$ ثم $A$. وداخل الشبكة النقطة $N$ في العمود الأول والسطر الثاني، والنقطة $M$ في العمود السادس والسطر الثاني، وتمتدّ ثلاثة أعمدة إلى يمين $M$ حتى الحافة اليمنى.',
  caption: `صفحة ٨ — ${TEXTBOOK_CAPTION}`,
  source: page8Source,
  params: {
    cols: page8.cols,
    rows: page8.rows,
    gridStyle: 'dashed',
    segments: [
      { from: [page8.line.from[0], page8.line.from[1]], to: [page8.line.to[0], page8.line.to[1]] },
    ],
    points: [
      {
        x: page8.points.B[0],
        y: page8.points.B[1],
        label: 'B',
        tone: 'ink',
        placement: 'below-start',
      },
      {
        x: page8.points.P[0],
        y: page8.points.P[1],
        label: 'P',
        tone: 'mark',
        placement: 'above-end',
      },
      {
        x: page8.points.N[0],
        y: page8.points.N[1],
        label: 'N',
        tone: 'mark',
        placement: 'below-start',
      },
      { x: page8.points.A[0], y: page8.points.A[1], label: 'A', tone: 'ink', placement: 'below' },
      {
        x: page8.points.M[0],
        y: page8.points.M[1],
        label: 'M',
        tone: 'mark',
        placement: 'above-end',
      },
    ],
    reveals: [],
    extend: { start: 0, end: 0, bottom: 0, top: 0 },
  },
};

/* --------------------------------------------------------------------------
 *  PAGE 8 — the same sheet as a placement lab (the printed activity asks for
 *  M′; the second task is a platform-authored extension on to N′).
 * ----------------------------------------------------------------------- */
export const figPage8Lab: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'authored',
  id: 'auth-02-page8-lab',
  renderer: 'lattice-placement',
  alt: 'شبكة نشاط الصفحة ٨: تسعة أعمدة وخمسة أسطر، والمستقيم المائل المطبوع، والنقاط $A$ و$B$ و$M$ و$N$ و$P$، مع مساحة إضافية على اليسار تقع فيها الصورة الخارجية $N′$.',
  caption:
    'شبكة نشاط الصفحة ٨ مع مساحة إضافية على صفحة الدفتر — المساحة الإضافية من إعداد المنصّة، والنقاط والمستقيم من الشكل المطبوع.',
  params: {
    cols: page8.cols,
    rows: page8.rows,
    gridStyle: 'dashed',
    segments: [
      { from: [page8.line.from[0], page8.line.from[1]], to: [page8.line.to[0], page8.line.to[1]] },
    ],
    points: [
      { x: page8.points.A[0], y: page8.points.A[1], label: 'A' },
      { x: page8.points.B[0], y: page8.points.B[1], label: 'B' },
      { x: page8.points.M[0], y: page8.points.M[1], label: 'M' },
      { x: page8.points.N[0], y: page8.points.N[1], label: 'N' },
      { x: page8.points.P[0], y: page8.points.P[1], label: 'P' },
    ],
    instruction:
      'من $A$ إلى $B$: ثلاثة أعمدة إلى اليسار وثلاثة أسطر إلى الأعلى. طبّق المقدار نفسه على كل نقطة.',
    tasks: [
      {
        id: 'page8-m-prime',
        prompt:
          "ضع $M'$ صورة $M$ وفق الانسحاب الذي ينقل $A$ إلى $B$ — وهذا هو المطلوب في نشاط الصفحة ٨.",
        label: "M'",
        answer: { x: page8Images.M[0], y: page8Images.M[1] },
        hint: 'طبّق المقدار نفسه على $M$ الواقعة في العمود 6 والسطر 2.',
        success: "أحسنت: $M'$ في العمود 3 والسطر 5، والرباعي $ABM'M$ متوازي أضلاع.",
        revealAfter: 3,
      },
      {
        id: 'page8-n-prime',
        prompt: "تمرين إضافي من المنصّة: ضع $N'$ صورة $N$. لاحظ أن الصورة تخرج عن الشبكة المطبوعة.",
        label: "N'",
        answer: { x: page8Images.N[0], y: page8Images.N[1] },
        hint: 'ابدأ من $N$ في العمود 1 والسطر 2، ثم انزل ثلاثة أعمدة إلى اليسار وارتفع ثلاثة أسطر.',
        success:
          "صحيح: $N'$ تقع في العمود −2 والسطر 5، خارج الشبكة المطبوعة — ولهذا طلبت التعليمة نقل الشكل إلى ورقة سنتيمترية.",
        revealAfter: 3,
      },
    ],
    extend: { left: 2, right: 0, bottom: 0, top: 0 },
  },
};

/* --------------------------------------------------------------------------
 *  PAGE 10 — squared paper: 8 × 6, M on the top-right corner
 * ----------------------------------------------------------------------- */
export const figPage10Grid: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'fig-10-exercise-3-grid',
  renderer: 'grid-figure',
  alt: 'شبكة من ثمانية أعمدة وستة أسطر، فيها النقطة $M$ في الزاوية العليا اليمنى، والنقطة $N$ في العمود الرابع والسطر الخامس، والنقطة $A$ في العمود الخامس والسطر الرابع، وفي السطر الأول فوق الحافة السفلى النقاط $B$ ثم $P′$ ثم $Q′$ من اليسار إلى اليمين.',
  caption: `صفحة ١٠ — ${TEXTBOOK_CAPTION}`,
  source: page10Source,
  params: {
    cols: page10.cols,
    rows: page10.rows,
    gridStyle: 'solid',
    segments: [],
    points: [
      {
        x: page10.points.M[0],
        y: page10.points.M[1],
        label: 'M',
        tone: 'ink',
        placement: 'above-start',
      },
      {
        x: page10.points.N[0],
        y: page10.points.N[1],
        label: 'N',
        tone: 'ink',
        placement: 'above-start',
      },
      {
        x: page10.points.A[0],
        y: page10.points.A[1],
        label: 'A',
        tone: 'ink',
        placement: 'below-end',
      },
      {
        x: page10.points.B[0],
        y: page10.points.B[1],
        label: 'B',
        tone: 'ink',
        placement: 'below-start',
      },
      {
        x: page10.points.PPrime[0],
        y: page10.points.PPrime[1],
        label: "P'",
        tone: 'ink',
        placement: 'below-end',
      },
      {
        x: page10.points.QPrime[0],
        y: page10.points.QPrime[1],
        label: "Q'",
        tone: 'ink',
        placement: 'below-end',
      },
    ],
    reveals: [],
    extend: { start: 0, end: 0, bottom: 0, top: 0 },
  },
};

/* --------------------------------------------------------------------------
 *  PAGE 8 — the blank-sheet activity: A, B, N collinear, M off the line
 * ----------------------------------------------------------------------- */
const blank = {
  A: [6.4, 4.4] as XY,
  B: [3.6, 2.6] as XY,
  N: [2.48, 1.88] as XY,
  M: [1.0, 3.2] as XY,
};

export const figBlankSheet: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'authored',
  id: 'auth-02-blank-sheet',
  renderer: 'construction-figure',
  alt: 'مستقيم مائل من أعلى اليمين إلى أسفل اليسار، عليه بالترتيب النقطة $A$ ثم $B$ ثم $N$، وإلى يسار المستقيم النقطة $M$ خارجه.',
  caption: `صفحة ٨ — معطيات النشاط على ورقة بيضاء. ${AUTHORED_CAPTION}`,
  params: {
    padding: 0.8,
    steps: [],
    elements: [
      { kind: 'line', from: blank.A, to: blank.N, extend: 1.6, tone: 'ink' },
      { kind: 'point', at: blank.A, label: 'A', tone: 'ink', offset: [0.34, -0.34] },
      { kind: 'point', at: blank.B, label: 'B', tone: 'ink', offset: [0.34, -0.34] },
      { kind: 'point', at: blank.N, label: 'N', tone: 'ink', offset: [0.3, 0.5] },
      { kind: 'point', at: blank.M, label: 'M', tone: 'mark', offset: [-0.34, -0.3] },
    ],
  },
};

/* --------------------------------------------------------------------------
 *  PAGE 8 — the definition figure: ABM′M with its two diagonals
 * ----------------------------------------------------------------------- */
const definition = {
  A: [0, 0] as XY,
  B: [7.4, -1.9] as XY,
  M: [1.4, 4.0] as XY,
};
/** Authored sheet for the two-case lab: (3,−1) lies exactly on (AB). */
const twoCasesSheet = {
  A: [0, 0] as XY,
  B: [6, -2] as XY,
  M: [1, 4] as XY,
  collinear: [3, -1] as XY,
};
const definitionImage: XY = [
  definition.M[0] + definition.B[0] - definition.A[0],
  definition.M[1] + definition.B[1] - definition.A[1],
];
const definitionCentre: XY = [
  (definition.A[0] + definitionImage[0]) / 2,
  (definition.A[1] + definitionImage[1]) / 2,
];

export const figDefinition: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'authored',
  id: 'auth-02-definition',
  renderer: 'construction-figure',
  alt: "مستقيم يمرّ بالنقطتين $A$ و$B$، والنقطة $M$ فوقه إلى اليسار، وصورتها $M'$ إلى يمينها؛ والقطعتان $[AM']$ و$[BM]$ مرسومتان متقطعتين لتتقاطعا في نقطة واحدة تفصل كل قطعة إلى نصفين متساويين.",
  caption: `صفحة ٨ — شكل التعريف. ${AUTHORED_CAPTION}`,
  params: {
    padding: 0.9,
    steps: [],
    elements: [
      { kind: 'line', from: definition.A, to: definition.B, extend: 1.4, tone: 'ink' },
      { kind: 'segment', from: definition.M, to: definitionImage, dashed: false, tone: 'ink' },
      { kind: 'segment', from: definition.B, to: definitionImage, tone: 'ink' },
      { kind: 'segment', from: definition.M, to: definition.A, tone: 'ink' },
      { kind: 'segment', from: definition.A, to: definitionImage, tone: 'mark', dashed: true },
      { kind: 'segment', from: definition.B, to: definition.M, tone: 'mark', dashed: true },
      { kind: 'point', at: definition.A, label: 'A', tone: 'ink', offset: [-0.14, 0.52] },
      { kind: 'point', at: definition.B, label: 'B', tone: 'ink', offset: [-0.2, 0.55] },
      { kind: 'point', at: definition.M, label: 'M', tone: 'mark', offset: [-0.36, -0.28] },
      { kind: 'point', at: definitionImage, label: "M'", tone: 'mark', offset: [0.46, -0.18] },
      { kind: 'point', at: definitionCentre, label: 'I', tone: 'aux', offset: [-0.3, 0.45] },
    ],
  },
};

/* --------------------------------------------------------------------------
 *  PAGE 9 — the special case: A, M, I, B, M′ collinear, I the common midpoint
 * ----------------------------------------------------------------------- */
const special = {
  A: [0, 4] as XY,
  B: [9, 2.2] as XY,
  M: [3.6, 3.28] as XY,
  I: [6.3, 2.74] as XY,
  image: [12.6, 1.48] as XY,
};

export const figSpecialCase: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'authored',
  id: 'auth-02-special-case',
  renderer: 'construction-figure',
  alt: "مستقيم واحد مائل نازل إلى اليمين، عليه بالترتيب النقاط $A$ ثم $M$ ثم $I$ ثم $B$ ثم $M'$، والنقطة $I$ تقع في منتصف $[AM']$ ومنتصف $[BM]$ في الوقت نفسه.",
  caption: `صفحة ٩ — شكل الحالة الخاصة. ${AUTHORED_CAPTION}`,
  params: {
    padding: 1,
    steps: [],
    elements: [
      { kind: 'line', from: special.A, to: special.image, extend: 0.8, tone: 'ink' },
      { kind: 'point', at: special.A, label: 'A', tone: 'ink', offset: [-0.12, 0.52] },
      { kind: 'point', at: special.M, label: 'M', tone: 'mark', offset: [-0.2, 0.55] },
      { kind: 'point', at: special.I, label: 'I', tone: 'aux', offset: [-0.1, 0.55] },
      { kind: 'point', at: special.B, label: 'B', tone: 'ink', offset: [-0.1, 0.55] },
      { kind: 'point', at: special.image, label: "M'", tone: 'mark', offset: [0.3, 0.55] },
    ],
  },
};

/* --------------------------------------------------------------------------
 *  PAGE 9 — the example's givens: [HG] and M
 * ----------------------------------------------------------------------- */
export const figCompassGiven: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'authored',
  id: 'auth-02-compass-given',
  renderer: 'construction-figure',
  alt: 'القطعة $[HG]$ أفقية، وفي أسفلها إلى يمين $G$ النقطة $M$.',
  caption: `صفحة ٩ — معطيات المثال. ${AUTHORED_CAPTION}`,
  params: {
    padding: 0.8,
    steps: [],
    elements: [
      { kind: 'segment', from: compassGiven.H, to: compassGiven.G, tone: 'ink' },
      { kind: 'point', at: compassGiven.H, label: 'H', tone: 'ink', offset: [-0.34, 0.5] },
      { kind: 'point', at: compassGiven.G, label: 'G', tone: 'ink', offset: [0.18, 0.52] },
      { kind: 'point', at: compassGiven.M, label: 'M', tone: 'mark', offset: [0.42, 0.48] },
    ],
  },
};

/* --------------------------------------------------------------------------
 *  PAGE 9 — the construction, and the proof that justifies it
 * ----------------------------------------------------------------------- */
const COMPASS_STEPS = [
  "لنكمل $HGM$ إلى متوازي أضلاع $HGMM'$.",
  'نرسم الدائرة $(C_1)$ التي مركزها $M$ ونصف قطرها يساوي $GH$ (فتحة الفرجار).',
  'نرسم الدائرة $(C_2)$ التي مركزها $H$ ونصف قطرها يساوي $GM$ (فتحة الفرجار).',
  "تتقاطع الدائرتان في نقطتين. نختار النقطة التي تكمل $HGM$ إلى رباعي. فتكون النقطة $M'$ هي صورة النقطة $M$.",
];

export const figCompassConstruction: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'authored',
  id: 'auth-02-compass-construction',
  renderer: 'compass-lab',
  alt: "إنشاء بالفرجار: القطعة $[HG]$، ودائرة مركزها $M$ نصف قطرها $GH$، ودائرة مركزها $H$ نصف قطرها $GM$، تتقاطعان في نقطتين، إحداهما $M'$ التي تكمل الرباعي $HGMM'$ إلى متوازي أضلاع.",
  caption: `صفحة ٩ — طريقة الإنشاء خطوة بخطوة. ${AUTHORED_CAPTION}`,
  params: {
    mode: 'construction',
    h: compassGiven.H,
    g: compassGiven.G,
    m: compassGiven.M,
    steps: COMPASS_STEPS,
    proofStep: null,
    rejectedNote:
      "هذه النقطة ليست الصورة: لكي يكون $HGXM$ متوازي أضلاع يجب أن تتحقق المساواة $X = M + (H - G)$ تماماً، وهي لا تتحقق إلا للنقطة $M'$.",
  },
};

export const figCompassProof: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'authored',
  id: 'auth-02-compass-proof',
  renderer: 'compass-lab',
  alt: "الرباعي $HGMM'$ بعد إتمام الإنشاء، مع القطر $[HM]$، وعلامة مفردة على $[HG]$ و$[MM']$ تدل على تساويهما، وعلامة مزدوجة على $[GM]$ و$[HM']$ تدل على تساويهما.",
  caption: `صفحة ٩ — تعليل الإنشاء. ${AUTHORED_CAPTION}`,
  params: {
    mode: 'proof',
    h: compassGiven.H,
    g: compassGiven.G,
    m: compassGiven.M,
    steps: [],
    proofStep: 0,
    proofCaption:
      "العلامة المفردة على $[HG]$ و$[MM']$ تعني تساويهما، والمزدوجة على $[GM]$ و$[HM']$ تعني تساويهما؛ وبذلك يكون $HGMM'$ متوازي أضلاع.",
    rejectedNote: 'النقطة الأخرى لا تكمل متوازي الأضلاع، ولذلك لا تصلح صورةً للنقطة $M$.',
  },
};

/* --------------------------------------------------------------------------
 *  The two cases, explored by the student
 * ----------------------------------------------------------------------- */
export const figTwoCasesLab: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'authored',
  id: 'auth-02-two-cases',
  renderer: 'point-image-lab',
  alt: "شبكة ورسم متوازي أضلاع $ABM'M$ مع قطريه $[AM']$ و$[BM]$ المتقاطعين في $I$؛ وتحريك النقطة $M$ إلى المستقيم $(AB)$ يجعل النقاط الأربع على استقامة واحدة.",
  caption: `رسم تفاعلي من إعداد المنصّة: حرّك $M$ وراقب متوازي الأضلاع والقطرين. ${AUTHORED_CAPTION}`,
  params: {
    a: twoCasesSheet.A,
    b: twoCasesSheet.B,
    m: twoCasesSheet.M,
    general: twoCasesSheet.M,
    collinear: twoCasesSheet.collinear,
    bounds: { minX: -1.5, maxX: 10.5, minY: -4, maxY: 5.6 },
    snap: 0.25,
    showGrid: true,
    showDiagonals: true,
  },
};

/* --------------------------------------------------------------------------
 *  Reading a translation off squared paper (our own example)
 * ----------------------------------------------------------------------- */
export const figReadingVector: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'authored',
  id: 'auth-02-reading-vector',
  renderer: 'point-image-lab',
  alt: "شبكة سنتيمترية عليها $A$ و$B$ والنقطة $M$ فوقهما، وصورة $M$ هي $M'$؛ الشعاعان $A \\to B$ و$M \\to M'$ متوازيان ومتساويان.",
  caption: `رسم تعليمي من إعداد المنصّة: الانتقال من $A$ إلى $B$ هو نفسه من $M$ إلى $M'$. ${AUTHORED_CAPTION}`,
  params: {
    a: [1, 1],
    b: [5, 0],
    m: [2, 4],
    general: [2, 4],
    bounds: { minX: 0, maxX: 7, minY: -1, maxY: 5.5 },
    snap: 0.25,
    showGrid: true,
    showDiagonals: false,
  },
};

/* --------------------------------------------------------------------------
 *  The opening hook — place the image on our own sheet
 * ----------------------------------------------------------------------- */
export const figHook: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'authored',
  id: 'auth-02-hook',
  renderer: 'lattice-placement',
  alt: 'شبكة من سبعة أعمدة وخمسة أسطر، فيها $A$ أعلاه و$B$ إلى يمينه وأسفل منه، والنقطة $M$ تحت $A$؛ والمطلوب تعيين صورة $M$.',
  caption: 'رسم من إعداد المنصّة — شبكة تدريب أولى، ليست من الكتاب.',
  params: {
    cols: hookSheet.cols,
    rows: hookSheet.rows,
    gridStyle: 'solid',
    points: [
      { x: hookSheet.points.A[0], y: hookSheet.points.A[1], label: 'A' },
      { x: hookSheet.points.B[0], y: hookSheet.points.B[1], label: 'B' },
      { x: hookSheet.points.M[0], y: hookSheet.points.M[1], label: 'M', tone: 'mark' },
    ],
    instruction:
      'اضغط على تقاطع في الشبكة أو اكتب رقمي العمود والسطر، ثم اضغط «ضع النقطة». إن أخطأت ستحصل على تلميح عن طريقة العدّ، لا على الجواب.',
    tasks: [
      {
        id: 'hook-place-image',
        prompt: "$M$ صورةُ أي نقطة وفق الانسحاب الذي ينقل $A$ إلى $B$؟ ضع $M'$ على الشبكة.",
        label: "M'",
        answer: { x: hookSheet.answer[0], y: hookSheet.answer[1] },
        hint: 'من $A$ إلى $B$: ثلاثة أعمدة إلى اليمين وسطر واحد إلى الأسفل. طبّق المقدار نفسه على $M$.',
        success:
          "أحسنت؛ هذا هو موضع $M'$. لاحظ أن $[MM']$ يوازي $[AB]$ ويساويه — وهذا هو الانسحاب نفسه.",
        revealAfter: 2,
      },
    ],
    extend: { left: 0, right: 0, bottom: 0, top: 0 },
  },
};

/* --------------------------------------------------------------------------
 *  Exercise ① — the triangle chain
 * ----------------------------------------------------------------------- */
export const figPracticeTriangle: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'authored',
  id: 'auth-02-triangle-chain',
  renderer: 'vector-chain',
  alt: 'مثلث $ABC$، ثم صورة $A$ هي $E$ وفق الانسحاب $B \\to C$، وصورة $E$ هي $F$ وفق $C \\to A$، وصورة $F$ هي $G$ وفق $A \\to B$؛ والنقطة $G$ تنطبق على $A$.',
  caption: 'رسم تعليمي من إعداد المنصّة — مثلث بمعطيات من عندنا، لا من الكتاب.',
  params: {
    mode: 'triangle',
    a: practiceTriangle.a,
    b: practiceTriangle.b,
    c: practiceTriangle.c,
    captions: [
      'المعطى: المثلث $ABC$. لنبدأ بالنقطة $A$: ما صورتها وفق الانسحاب الذي ينقل $B$ إلى $C$؟',
      '$E$ صورة $A$: الشعاع $A \\to E$ موازٍ لـ $B \\to C$ ويساويه — وهذا هو معنى الانسحاب.',
      '$F$ صورة $E$ وفق الانسحاب الذي ينقل $C$ إلى $A$: مرة أخرى شعاع موازٍ ومساوٍ.',
      '$G$ صورة $F$ وفق الانسحاب الذي ينقل $A$ إلى $B$.',
    ],
    finalNote:
      'لاحظ المفاجأة: $G$ تنطبق على $A$ تماماً. الانسحابات الثلاثة تلغي بعضها، والمثلث $EFG$ مطابق للمثلث $ABC$: $EF = CA$ و$FG = AB$ و$GE = BC$.',
  },
};

/* --------------------------------------------------------------------------
 *  Exercise ② — the parallelogram and its centre
 * ----------------------------------------------------------------------- */
export const figPracticeParallelogram: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'authored',
  id: 'auth-02-parallelogram-centre',
  renderer: 'vector-chain',
  alt: 'متوازي أضلاع $ABCD$ مركزه $M$ تقاطع قطريه، وثلاث حركات انسحاب يمكن اختيارها لرؤية صورة النقطة المطلوبة في كل عبارة.',
  caption: 'رسم تعليمي من إعداد المنصّة — متوازي أضلاع بمعطيات من عندنا، لا من الكتاب.',
  params: {
    mode: 'parallelogram',
    a: practiceParallelogram.A,
    b: practiceParallelogram.B,
    c: practiceParallelogram.C,
    d: practiceParallelogram.D,
    tasks: [
      {
        id: 'task-1',
        label: 'الحركة ①',
        from: practiceParallelogram.A,
        to: practiceParallelogram.B,
        applyTo: practiceParallelogram.D,
        imageLabel: 'C',
        note: 'صورة $D$ وفق الانسحاب الذي ينقل $A$ إلى $B$ هي $C$؛ لأن $[DC]$ يوازي $[AB]$ ويساويه.',
      },
      {
        id: 'task-2',
        label: 'الحركة ②',
        from: practiceParallelogram.C,
        to: practiceParallelogram.B,
        applyTo: practiceParallelogram.D,
        imageLabel: 'A',
        note: 'الانسحاب الذي ينقل $C$ إلى $B$ ينقل $D$ إلى $A$؛ فالعبارة تكتمل بـ $B$.',
      },
      {
        id: 'task-3',
        label: 'الحركة ③',
        from: practiceParallelogram.M,
        to: practiceParallelogram.A,
        applyTo: practiceParallelogram.C,
        imageLabel: 'M',
        note: 'بما أن $M$ منتصف $[AC]$، فإن الانسحاب الذي ينقل $M$ إلى $A$ ينقل $C$ إلى $M$ نفسها.',
      },
    ],
  },
};

/* --------------------------------------------------------------------------
 *  Exercise ③ — the copied sheet with the extension area
 * ----------------------------------------------------------------------- */
export const figPracticeGrid: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'authored',
  id: 'auth-02-exercise-3-lab',
  renderer: 'lattice-placement',
  alt: "شبكة التمرين ③ نفسها: ثمانية أعمدة وستة أسطر، مع مساحة إضافية أسفلها؛ والمطلوب وضع النقاط $M'$ و$M''$ و$N'$ و$N''$ والنقطتين $P$ و$Q$.",
  caption:
    'شبكة التمرين ③ (صفحة ١٠) مع مساحة إضافية أسفل منها — من إعداد المنصّة؛ والتعليمة تطلب نسخ الشبكة على صفحة من الدفتر لأن بعض النقاط تقع تحت الشبكة المطبوعة.',
  params: {
    cols: page10.cols,
    rows: page10.rows,
    gridStyle: 'solid',
    points: [
      { x: page10.points.M[0], y: page10.points.M[1], label: 'M' },
      { x: page10.points.N[0], y: page10.points.N[1], label: 'N' },
      { x: page10.points.A[0], y: page10.points.A[1], label: 'A' },
      { x: page10.points.B[0], y: page10.points.B[1], label: 'B' },
      { x: page10.points.PPrime[0], y: page10.points.PPrime[1], label: "P'" },
      { x: page10.points.QPrime[0], y: page10.points.QPrime[1], label: "Q'" },
    ],
    instruction:
      'من $A$ إلى $B$: عمودان إلى اليسار وثلاثة أسطر إلى الأسفل. استعمل هذا المقدار، أو معكوسه عند الحاجة.',
    tasks: [
      {
        id: 'page10-m-prime',
        prompt: "① ضع $M'$ صورة $M$ وفق الانسحاب الذي ينقل $A$ إلى $B$.",
        label: "M'",
        answer: { x: page10Answers.MPrime[0], y: page10Answers.MPrime[1] },
        hint: 'طبّق المقدار على $M$ الواقعة في العمود 8 والسطر 6.',
        success: "$M'$ في العمود 6 والسطر 3: نفس الاتجاه ونفس المسافة.",
        revealAfter: 3,
      },
      {
        id: 'page10-m-double-prime',
        prompt: "② ضع $M''$ صورة $M'$ بالانسحاب نفسه.",
        label: "M''",
        answer: { x: page10Answers.MDoublePrime[0], y: page10Answers.MDoublePrime[1] },
        hint: "أعد تطبيق المقدار نفسه، لكن انطلاقاً من $M'$ هذه المرة.",
        success: "$M''$ في العمود 4 والسطر 0، على السطر السفلي للشبكة المطبوعة.",
        revealAfter: 3,
      },
      {
        id: 'page10-n-prime',
        prompt: "③ ضع $N'$ صورة $N$.",
        label: "N'",
        answer: { x: page10Answers.NPrime[0], y: page10Answers.NPrime[1] },
        hint: 'طبّق المقدار نفسه على $N$ الواقعة في العمود 4 والسطر 5.',
        success: "$N'$ في العمود 2 والسطر 2.",
        revealAfter: 3,
      },
      {
        id: 'page10-n-double-prime',
        prompt: "2. ضع $N''$ صورة $N'$ وفق الانسحاب الذي ينقل $B$ إلى $A$.",
        label: "N''",
        answer: { x: page10Answers.NDoublePrime[0], y: page10Answers.NDoublePrime[1] },
        hint: 'الانسحاب معاكس الآن: من $B$ إلى $A$، أي عمودان إلى اليمين وثلاثة أسطر إلى الأعلى.',
        success: "$N''$ تنطبق على $N$ نفسها: الانسحاب ثم معكوسه يعيد النقطة إلى مكانها.",
        revealAfter: 3,
      },
      {
        id: 'page10-p',
        prompt: "3. ضع النقطة $P$، علمًا أنّ $P'$ هي صورتها وفق الانسحاب الذي ينقل $A$ إلى $B$.",
        label: 'P',
        answer: { x: page10Answers.P[0], y: page10Answers.P[1] },
        hint: 'للعودة من الصورة إلى الأصل نستعمل الانسحاب المعاكس: من $B$ إلى $A$.',
        success: '$P$ في العمود 6 والسطر 4.',
        revealAfter: 3,
      },
      {
        id: 'page10-q',
        prompt: "4. ضع النقطة $Q$، علمًا أنّ $Q'$ هي صورتها وفق الانسحاب الذي ينقل $B$ إلى $A$.",
        label: 'Q',
        answer: { x: page10Answers.Q[0], y: page10Answers.Q[1] },
        hint: "الانسحاب من $B$ إلى $A$؛ فمن $Q'$ إلى $Q$ نستعمل المقدار من $A$ إلى $B$: عمودان إلى اليسار وثلاثة أسفل.",
        success:
          '$Q$ تقع تحت الشبكة المطبوعة بسطرين — ولهذا تطلب التعليمة نسخ الشبكة على صفحة أوسع.',
        revealAfter: 4,
      },
    ],
    extend: { left: 0, right: 0, bottom: 2, top: 0 },
  },
};

/* --------------------------------------------------------------------------
 *  TEACHER-ONLY answer sheets — the printed grids with every image added.
 *  These are `authored` because the book prints no answer key; they are used
 *  exclusively behind the Teacher Area so students never see them.
 * ----------------------------------------------------------------------- */
export const figPage8Answers: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'authored',
  id: 'auth-02-page8-answers',
  renderer: 'grid-figure',
  alt: "شبكة نشاط الصفحة ٨ مع صور النقاط الثلاث: $M'$ في العمود 3 والسطر 5، و$N'$ خارج الحافة اليسرى في العمود −2 والسطر 5، و$P'$ خارج الحافتين في العمود −1 والسطر 6.",
  caption: 'ورقة إجابات المعلّم — الصور على شبكة النشاط نفسها (من إعداد المنصّة).',
  params: {
    cols: page8.cols,
    rows: page8.rows,
    gridStyle: 'dashed',
    segments: [
      { from: [page8.line.from[0], page8.line.from[1]], to: [page8.line.to[0], page8.line.to[1]] },
    ],
    points: [
      { x: page8.points.A[0], y: page8.points.A[1], label: 'A', tone: 'ink', placement: 'below' },
      {
        x: page8.points.B[0],
        y: page8.points.B[1],
        label: 'B',
        tone: 'ink',
        placement: 'below-start',
      },
      {
        x: page8.points.M[0],
        y: page8.points.M[1],
        label: 'M',
        tone: 'mark',
        placement: 'above-end',
      },
      {
        x: page8.points.N[0],
        y: page8.points.N[1],
        label: 'N',
        tone: 'mark',
        placement: 'below-start',
      },
      {
        x: page8.points.P[0],
        y: page8.points.P[1],
        label: 'P',
        tone: 'mark',
        placement: 'above-end',
      },
      {
        x: page8Images.M[0],
        y: page8Images.M[1],
        label: "M'",
        tone: 'image',
        placement: 'below-end',
      },
      {
        x: page8Images.N[0],
        y: page8Images.N[1],
        label: "N'",
        tone: 'image',
        placement: 'below-start',
      },
      {
        x: page8Images.P[0],
        y: page8Images.P[1],
        label: "P'",
        tone: 'image',
        placement: 'above-end',
      },
    ],
    reveals: [],
    extend: { start: 2, end: 0, bottom: 0, top: 1 },
    extendNote:
      'المساحة الإضافية على اليسار والأعلى هي ورقة الدفتر التي تطلب التعليمة النقل إليها.',
  },
};

export const figPage10Answers: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'authored',
  id: 'auth-02-page10-answers',
  renderer: 'grid-figure',
  alt: "شبكة التمرين ③ مع جميع النقاط المطلوبة: $M'$ في العمود 6 والسطر 3، و$M''$ في العمود 4 والسطر 0، و$N'$ في العمود 2 والسطر 2، و$N''$ منطبقة على $N$، و$P$ في العمود 6 والسطر 4، و$Q$ تحت الشبكة في العمود 4 والسطر −2.",
  caption: 'ورقة إجابات المعلّم — التمرين ③ على الشبكة نفسها (من إعداد المنصّة).',
  params: {
    cols: page10.cols,
    rows: page10.rows,
    gridStyle: 'solid',
    segments: [],
    points: [
      {
        x: page10.points.M[0],
        y: page10.points.M[1],
        label: 'M',
        tone: 'ink',
        placement: 'above-start',
      },
      {
        x: page10.points.N[0],
        y: page10.points.N[1],
        label: 'N',
        tone: 'ink',
        placement: 'above-start',
      },
      {
        x: page10.points.A[0],
        y: page10.points.A[1],
        label: 'A',
        tone: 'ink',
        placement: 'below-end',
      },
      {
        x: page10.points.B[0],
        y: page10.points.B[1],
        label: 'B',
        tone: 'ink',
        placement: 'below-start',
      },
      {
        x: page10.points.PPrime[0],
        y: page10.points.PPrime[1],
        label: "P'",
        tone: 'ink',
        placement: 'below-end',
      },
      {
        x: page10.points.QPrime[0],
        y: page10.points.QPrime[1],
        label: "Q'",
        tone: 'ink',
        placement: 'below-end',
      },
      {
        x: page10Answers.MPrime[0],
        y: page10Answers.MPrime[1],
        label: "M'",
        tone: 'image',
        placement: 'above-end',
      },
      {
        x: page10Answers.MDoublePrime[0],
        y: page10Answers.MDoublePrime[1],
        label: "M''",
        tone: 'image',
        placement: 'below-start',
      },
      {
        x: page10Answers.NPrime[0],
        y: page10Answers.NPrime[1],
        label: "N'",
        tone: 'image',
        placement: 'below-start',
      },
      {
        x: page10Answers.P[0],
        y: page10Answers.P[1],
        label: 'P',
        tone: 'image',
        placement: 'above-end',
      },
      {
        x: page10Answers.Q[0],
        y: page10Answers.Q[1],
        label: 'Q',
        tone: 'image',
        placement: 'below-end',
      },
    ],
    reveals: [],
    extend: { start: 0, end: 0, bottom: 2, top: 0 },
    extendNote: 'السطران الإضافيان أسفل الشبكة هما المساحة التي يوفّرها الدفتر، وفيهما تقع $Q$.',
  },
};

/* --------------------------------------------------------------------------
 *  TEACHER-ONLY check-understanding figures.
 *  «تحقّق من فهمك» prints two fill-in prompts and no drawing at all: the whole
 *  answer is the order of the four vertices. Each figure below is one exact
 *  instance of the order the solution names, with the translated pair of sides
 *  drawn dashed so the teacher can show why that pair is parallel and equal.
 *  The distances are the platform's; no printed figure is being reproduced.
 * ----------------------------------------------------------------------- */
const checkPqnm = {
  P: [0, 0] as XY,
  Q: [3, 1] as XY,
  M: [0, 4] as XY,
};
const checkPqnmImage: XY = [
  checkPqnm.M[0] + checkPqnm.Q[0] - checkPqnm.P[0],
  checkPqnm.M[1] + checkPqnm.Q[1] - checkPqnm.P[1],
];

export const figCheckPqnm: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'authored',
  id: 'auth-02-check-pqnm',
  renderer: 'construction-figure',
  alt: 'الرباعي $PQNM$ مرسوم بترتيب رؤوسه على المحيط: $P$ ثم $Q$ ثم $N$ ثم $M$؛ والضلعان $[PQ]$ و$[MN]$ مرسومان متقطّعين للدلالة على أنهما الزوج المتبادل بالانسحاب نفسه، فيكونان متوازيين ومتساويين.',
  caption: `صفحة ١٠ — تحقّق من فهمك، العبارة ١. ${CHECK_CAPTION}`,
  params: {
    padding: 0.75,
    steps: [],
    elements: [
      { kind: 'segment', from: checkPqnm.P, to: checkPqnm.Q, tone: 'mark', dashed: true },
      { kind: 'segment', from: checkPqnm.M, to: checkPqnmImage, tone: 'mark', dashed: true },
      { kind: 'segment', from: checkPqnm.Q, to: checkPqnmImage, tone: 'ink' },
      { kind: 'segment', from: checkPqnmImage, to: checkPqnm.M, tone: 'ink' },
      { kind: 'segment', from: checkPqnm.M, to: checkPqnm.P, tone: 'ink' },
      { kind: 'point', at: checkPqnm.P, label: 'P', tone: 'ink', offset: [-0.52, 0.5] },
      { kind: 'point', at: checkPqnm.Q, label: 'Q', tone: 'ink', offset: [0.35, 0.5] },
      { kind: 'point', at: checkPqnmImage, label: 'N', tone: 'mark', offset: [0.35, -0.3] },
      { kind: 'point', at: checkPqnm.M, label: 'M', tone: 'mark', offset: [-0.62, -0.28] },
    ],
  },
};

const checkJkrt = {
  J: [0, 0] as XY,
  K: [4, 2] as XY,
  T: [1, 4] as XY,
};
const checkJkrtImage: XY = [
  checkJkrt.T[0] + checkJkrt.K[0] - checkJkrt.J[0],
  checkJkrt.T[1] + checkJkrt.K[1] - checkJkrt.J[1],
];

export const figCheckJkrt: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'authored',
  id: 'auth-02-check-jkrt',
  renderer: 'construction-figure',
  alt: 'الرباعي $JKRT$ مرسوم بترتيب رؤوسه على المحيط: $J$ ثم $K$ ثم $R$ ثم $T$؛ والضلعان $[JK]$ و$[TR]$ مرسومان متقطّعين للدلالة على أنهما الزوج المتبادل بالانسحاب نفسه، فيكونان متوازيين ومتساويين.',
  caption: `صفحة ١٠ — تحقّق من فهمك، العبارة ٢. ${CHECK_CAPTION}`,
  params: {
    padding: 0.75,
    steps: [],
    elements: [
      { kind: 'segment', from: checkJkrt.J, to: checkJkrt.K, tone: 'mark', dashed: true },
      { kind: 'segment', from: checkJkrt.T, to: checkJkrtImage, tone: 'mark', dashed: true },
      { kind: 'segment', from: checkJkrt.K, to: checkJkrtImage, tone: 'ink' },
      { kind: 'segment', from: checkJkrtImage, to: checkJkrt.T, tone: 'ink' },
      { kind: 'segment', from: checkJkrt.T, to: checkJkrt.J, tone: 'ink' },
      { kind: 'point', at: checkJkrt.J, label: 'J', tone: 'ink', offset: [-0.5, 0.5] },
      { kind: 'point', at: checkJkrt.K, label: 'K', tone: 'ink', offset: [0.35, 0.42] },
      { kind: 'point', at: checkJkrtImage, label: 'R', tone: 'mark', offset: [0.3, -0.28] },
      { kind: 'point', at: checkJkrt.T, label: 'T', tone: 'mark', offset: [-0.62, -0.24] },
    ],
  },
};
