import type { ConstructedDiagram, InteractiveDiagram, SourceRef } from '../schema';
import type { FigureSpec, FigureTone, LabelPlace, XY } from '@/lib/geometryFigure';
import {
  activityTriangles,
  midlinePoints,
  page32Example,
  page32Knowledge,
  page33Check,
  page33TrainRectangle,
  page33TrainSemicircle,
  page33TrainSymmetric,
  testMidpointTriangle,
  varignonFigure,
} from './lesson-08-geometry';

/**
 * ============================================================================
 *  الدرس الثامن — الأشكال (صفحات ٣١–٣٣، الوحدة الثانية)
 * ============================================================================
 *
 *  Every figure of this lesson is drawn here from `lesson-08-geometry.ts`, so
 *  provenance can be audited in one place and no coordinate is written twice.
 *
 *  Every figure carries `origin: 'authored'`, for one specific reason: pages
 *  31–33 print NO lengths and NO angle measures. The printed drawings fix
 *  incidence and the equality marks only (M and N are midpoints; K is the
 *  symmetric of M about N; O is the midpoint of [AC]…). The platform therefore
 *  chooses the triangle, and says so:
 *
 *    • the caption badges the drawing «رسم تعليمي من إعداد المنصّة»;
 *    • the caption states that the drawing is schematic and not to scale;
 *    • `source` still records WHICH printed figure the configuration comes
 *      from, so a reviewer can compare it with the scan;
 *    • `lesson-08-geometry.test.ts` re-measures every printed relation, so the
 *      drawing cannot drift away from the book although its shape is ours.
 *
 *  EQUALITY MARKS. A tick mark asserts equality, so ticks go on the two HALVES
 *  of a bisected side (M is a midpoint ⇔ AM and MB carry the same count), never
 *  on a whole side. Different lengths get different counts (1 / 2 / 3). The
 *  page-33 figure has five midpoints and therefore receives NO ticks: one
 *  figure cannot carry five distinct counts without asserting equalities the
 *  page does not state, so the labels and the prompt carry that information.
 *
 *  The per-figure record is `docs/UNIT-02-LESSON-01-FIGURES.md`.
 *
 *  LIMITATION, recorded rather than hidden: `FigureSpec` has no arc primitive,
 *  so the semicircle of «تدرّب ①» and the circle circumscribing the rectangle
 *  of «تدرّب ③» are NOT drawn. Everything the printed question needs from them
 *  is drawn instead: the diameter [AB] with its midpoint O and the right angle
 *  at E; the two diagonals of the rectangle and its four side-midpoints. The
 *  alt text names the circle, and the caption says the arc is not drawn.
 * ============================================================================
 */

/* -------------------------------------------------------------------------- */
/*  Small builders (the idiom the shared renderer expects)                    */
/* -------------------------------------------------------------------------- */

const point = (
  at: XY,
  label: string,
  place: LabelPlace = 'n',
  tone: FigureTone = 'ink',
): NonNullable<FigureSpec['points']>[number] => ({ at, label, place, tone });

const segment = (
  from: XY,
  to: XY,
  options: {
    tone?: FigureTone;
    dashed?: boolean;
    ticks?: 1 | 2 | 3;
    arrow?: boolean;
  } = {},
): NonNullable<FigureSpec['segments']>[number] => ({ from, to, ...options });

const polygon = (
  points: XY[],
  options: { tone?: FigureTone; fill?: boolean; dashed?: boolean } = {},
): NonNullable<FigureSpec['polygons']>[number] => ({ points, ...options });

const rightAngle = (at: XY, from: XY, to: XY): NonNullable<FigureSpec['angles']>[number] => ({
  at,
  from,
  to,
  right: true,
  tone: 'mark',
});

/** Equal-length marks on both halves of [from, midpoint, to]. */
const halves = (from: XY, mid: XY, to: XY, ticks: 1 | 2 | 3) => [
  segment(from, mid, { ticks }),
  segment(mid, to, { ticks }),
];

const CAPTION_AUTHORED =
  'رسم تعليمي من إعداد المنصّة — الشكل تخطيطي غير مقيّس، والعلاقات المطبوعة فيه (المنتصفات والنظير والتوازي) محقَّقة بالحساب.';

const page31 = { page: 31, locator: 'نشاط — منتصفا ضلعين في المثلث' } as const;
const page31Proof = { page: 31, locator: 'نشاط — دليل للإثبات' } as const;
const page32TheoremSource = { page: 32, locator: 'تعلّم — المبرهنة الأولى في المنتصفات' } as const;
const page32ExampleSource = { page: 32, locator: 'مثال' } as const;
const page32KnowledgeSource = { page: 32, locator: 'اكتساب معارف' } as const;
const page33CheckSource = { page: 33, locator: 'تحقّق من فهمك' } as const;
const page33Practice1 = { page: 33, locator: 'تدرّب — ①' } as const;
const page33Practice2 = { page: 33, locator: 'تدرّب — ②' } as const;
const page33Practice3 = { page: 33, locator: 'تدرّب — ③' } as const;

/* -------------------------------------------------------------------------- */
/*  Page 31 — the discovery figure: M, N and the midline                      */
/* -------------------------------------------------------------------------- */

const activityTriangle = activityTriangles[0]!;
const activityMidline = midlinePoints(activityTriangle);

export const figureActivityMidline: FigureSpec = {
  viewBox: { x: -1.1, y: -1.2, w: 9.4, h: 8.6 },
  polygons: [polygon([activityTriangle.A, activityTriangle.B, activityTriangle.C])],
  segments: [
    ...halves(activityTriangle.A, activityMidline.M, activityTriangle.B, 2),
    ...halves(activityTriangle.A, activityMidline.N, activityTriangle.C, 3),
    segment(activityTriangle.B, activityTriangle.C),
    segment(activityMidline.M, activityMidline.N, { tone: 'mark' }),
  ],
  points: [
    point(activityTriangle.A, 'A'),
    point(activityTriangle.B, 'B', 'sw'),
    point(activityTriangle.C, 'C', 'se'),
    point(activityMidline.M, 'M', 'w'),
    point(activityMidline.N, 'N', 'e'),
  ],
};

/* -------------------------------------------------------------------------- */
/*  Page 31 — the proof figure: K, and the two parallelograms                 */
/* -------------------------------------------------------------------------- */

export const figureProofMidline: FigureSpec = {
  viewBox: { x: -1.1, y: -1.6, w: 12, h: 9.2 },
  polygons: [
    polygon([activityTriangle.A, activityTriangle.B, activityTriangle.C]),
    // AMCK: diagonals [AC] and [MK] bisect at N.
    polygon([activityTriangle.A, activityMidline.M, activityTriangle.C, activityMidline.K], {
      tone: 'aux',
      dashed: true,
    }),
    // MBCK: the parallelogram the printed proof aims at.
    polygon([activityMidline.M, activityTriangle.B, activityTriangle.C, activityMidline.K], {
      tone: 'mark',
      fill: true,
      dashed: true,
    }),
  ],
  segments: [
    ...halves(activityTriangle.A, activityMidline.M, activityTriangle.B, 2),
    ...halves(activityTriangle.A, activityMidline.N, activityTriangle.C, 3),
    segment(activityTriangle.B, activityTriangle.C),
    segment(activityMidline.M, activityMidline.N, { ticks: 1, tone: 'mark' }),
    segment(activityMidline.N, activityMidline.K, { ticks: 1, tone: 'mark' }),
    segment(activityTriangle.C, activityMidline.K, { tone: 'aux', dashed: true }),
  ],
  points: [
    point(activityTriangle.A, 'A'),
    point(activityTriangle.B, 'B', 'sw'),
    point(activityTriangle.C, 'C', 'se'),
    point(activityMidline.M, 'M', 'w'),
    point(activityMidline.N, 'N', 's'),
    point(activityMidline.K, 'K', 'e'),
  ],
};

/* -------------------------------------------------------------------------- */
/*  Page 32 — the worked example: I and J                                     */
/* -------------------------------------------------------------------------- */

const example = page32Example;

export const figureExampleMidline: FigureSpec = {
  viewBox: { x: -1.1, y: -1.2, w: 9.9, h: 8.4 },
  polygons: [polygon([example.triangle.A, example.triangle.B, example.triangle.C])],
  segments: [
    ...halves(example.triangle.A, example.I, example.triangle.B, 2),
    ...halves(example.triangle.A, example.J, example.triangle.C, 3),
    segment(example.triangle.B, example.triangle.C),
    segment(example.I, example.J, { tone: 'mark' }),
  ],
  points: [
    point(example.triangle.A, 'A'),
    point(example.triangle.B, 'B', 'sw'),
    point(example.triangle.C, 'C', 'se'),
    point(example.I, 'I', 'w'),
    point(example.J, 'J', 'e'),
  ],
};

/* -------------------------------------------------------------------------- */
/*  Page 32 — «كيف نثبت توازي مستقيمين؟»: (OB) ∥ (AI)                          */
/* -------------------------------------------------------------------------- */

const knowledge = page32Knowledge;

export const figureKnowledgeParallel: FigureSpec = {
  viewBox: { x: -1.2, y: -1.4, w: 11.6, h: 8.6 },
  polygons: [polygon([knowledge.A, knowledge.C, knowledge.I], { tone: 'ink' })],
  segments: [
    ...halves(knowledge.A, knowledge.O, knowledge.C, 3),
    ...halves(knowledge.C, knowledge.B, knowledge.I, 2),
    segment(knowledge.A, knowledge.I),
    // [OB] is the segment the printed question asks the student to prove
    // parallel to [AI]; it is dashed so it never looks like a given.
    segment(knowledge.O, knowledge.B, { tone: 'mark', dashed: true }),
  ],
  points: [
    point(knowledge.A, 'A'),
    point(knowledge.C, 'C', 'sw'),
    point(knowledge.B, 'B', 's'),
    point(knowledge.I, 'I', 'se'),
    point(knowledge.O, 'O', 'w'),
  ],
};

/* -------------------------------------------------------------------------- */
/*  Page 33 — «تحقّق من فهمك»: the two triangles and the five midpoints        */
/* -------------------------------------------------------------------------- */

const check = page33Check;

export const figureCheckMidpoints: FigureSpec = {
  viewBox: { x: -1.1, y: -1.2, w: 11.6, h: 8.6 },
  polygons: [
    polygon([check.A, check.B, check.C], { tone: 'given' }),
    polygon([check.A, check.C, check.D], { tone: 'aux' }),
  ],
  points: [
    point(check.A, 'A'),
    point(check.B, 'B', 'sw'),
    point(check.C, 'C', 's'),
    point(check.D, 'D', 'se'),
    point(check.J, 'J', 'nw'),
    point(check.K, 'K', 'ne'),
    point(check.L, 'L', 's'),
    point(check.M, 'M', 'ne'),
    point(check.N, 'N', 's'),
  ],
};

/* -------------------------------------------------------------------------- */
/*  Page 33 — «تدرّب ①»: (OM) ∥ (BE) in the semicircle                          */
/* -------------------------------------------------------------------------- */

const semicircle = page33TrainSemicircle;

export const figurePracticeSemicircle: FigureSpec = {
  viewBox: { x: -1.4, y: -1.4, w: 10.6, h: 9.6 },
  polygons: [polygon([semicircle.A, semicircle.E, semicircle.B])],
  segments: [
    ...halves(semicircle.A, semicircle.O, semicircle.B, 2),
    ...halves(semicircle.A, semicircle.M, semicircle.E, 3),
    segment(semicircle.E, semicircle.B),
    // [OM] joins the two midpoints: the segment whose parallelism is asked for.
    segment(semicircle.O, semicircle.M, { tone: 'mark', dashed: true }),
  ],
  angles: [rightAngle(semicircle.E, semicircle.A, semicircle.B)],
  points: [
    point(semicircle.A, 'A', 'w'),
    point(semicircle.B, 'B', 'e'),
    point(semicircle.E, 'E', 's'),
    point(semicircle.O, 'O', 'n'),
    point(semicircle.M, 'M', 'nw'),
  ],
};

/* -------------------------------------------------------------------------- */
/*  Page 33 — «تدرّب ②»: B′ and C′ are the symmetric points of A               */
/* -------------------------------------------------------------------------- */

const symmetric = page33TrainSymmetric;

export const figurePracticeSymmetric: FigureSpec = {
  viewBox: { x: -3.4, y: -3.8, w: 16, h: 11.4 },
  polygons: [polygon([symmetric.A, symmetric.B, symmetric.C])],
  segments: [
    ...halves(symmetric.A, symmetric.B, symmetric.BPrime, 2),
    ...halves(symmetric.A, symmetric.C, symmetric.CPrime, 3),
    segment(symmetric.B, symmetric.C),
    segment(symmetric.BPrime, symmetric.CPrime, { tone: 'mark', dashed: true }),
  ],
  points: [
    point(symmetric.A, 'A', 'n'),
    point(symmetric.B, 'B', 'nw'),
    point(symmetric.C, 'C', 'ne'),
    point(symmetric.BPrime, "B'", 'sw'),
    point(symmetric.CPrime, "C'", 'se'),
  ],
};

/* -------------------------------------------------------------------------- */
/*  Page 33 — «تدرّب ③»: EFGH around a rectangle whose diagonal is 6 cm        */
/* -------------------------------------------------------------------------- */

const rectangle = page33TrainRectangle;

export const figurePracticeRectangle: FigureSpec = {
  viewBox: { x: 2.3, y: 2.8, w: 6.6, h: 4.4 },
  polygons: [
    polygon([rectangle.A, rectangle.B, rectangle.C, rectangle.D]),
    polygon([rectangle.E, rectangle.F, rectangle.G, rectangle.H], {
      tone: 'mark',
      fill: true,
    }),
  ],
  segments: [
    // The two diagonals are both diameters of the circumscribed circle.
    segment(rectangle.A, rectangle.C, { tone: 'aux', dashed: true }),
    segment(rectangle.B, rectangle.D, { tone: 'aux', dashed: true }),
  ],
  points: [
    point(rectangle.A, 'A', 'nw'),
    point(rectangle.B, 'B', 'ne'),
    point(rectangle.C, 'C', 'se'),
    point(rectangle.D, 'D', 'sw'),
    point(rectangle.E, 'E', 'n'),
    point(rectangle.F, 'F', 'e'),
    point(rectangle.G, 'G', 's'),
    point(rectangle.H, 'H', 'w'),
    point(rectangle.O, 'O', 's', 'aux'),
  ],
};

/* -------------------------------------------------------------------------- */
/*  Authored applications (used by the assessment)                            */
/* -------------------------------------------------------------------------- */

const varignon = varignonFigure;

export const figureVarignon: FigureSpec = {
  viewBox: { x: -1.3, y: -1.3, w: 10.6, h: 8.9 },
  polygons: [
    polygon([varignon.A, varignon.B, varignon.C, varignon.D], { tone: 'ink', dashed: true }),
    polygon([varignon.E, varignon.F, varignon.G, varignon.H], { tone: 'mark', fill: true }),
  ],
  points: [
    point(varignon.A, 'A', 'nw'),
    point(varignon.B, 'B', 'sw'),
    point(varignon.C, 'C', 'se'),
    point(varignon.D, 'D', 'ne'),
    point(varignon.E, 'E', 'w'),
    point(varignon.F, 'F', 's'),
    point(varignon.G, 'G', 'e'),
    point(varignon.H, 'H', 'n'),
  ],
};

const testTriangle = testMidpointTriangle;

export const figureTestMidline: FigureSpec = {
  viewBox: { x: -1.1, y: -1.2, w: 10.2, h: 8.3 },
  polygons: [polygon([testTriangle.A, testTriangle.B, testTriangle.C])],
  segments: [
    ...halves(testTriangle.A, testTriangle.M, testTriangle.B, 2),
    ...halves(testTriangle.A, testTriangle.N, testTriangle.C, 3),
    segment(testTriangle.B, testTriangle.C),
    segment(testTriangle.M, testTriangle.N, { tone: 'mark' }),
  ],
  points: [
    point(testTriangle.A, 'A'),
    point(testTriangle.B, 'B', 'sw'),
    point(testTriangle.C, 'C', 'se'),
    point(testTriangle.M, 'M', 'w'),
    point(testTriangle.N, 'N', 'e'),
  ],
};

/* -------------------------------------------------------------------------- */
/*  DiagramSpec builders                                                      */
/* -------------------------------------------------------------------------- */

interface BaseOptions {
  id: string;
  alt: string;
  caption?: string;
  source?: SourceRef;
}

function constructed(options: BaseOptions, construction: FigureSpec): ConstructedDiagram {
  return {
    kind: 'constructed',
    origin: 'authored',
    renderer: 'midline-figure',
    id: options.id,
    alt: options.alt,
    caption: options.caption ?? CAPTION_AUTHORED,
    ...(options.source ? { source: options.source } : {}),
    construction: construction as unknown as Record<string, unknown>,
  };
}

export const figActivityMidline = constructed(
  {
    id: 'fig-l8-activity-midline',
    alt: 'مثلث $ABC$، النقطة $M$ منتصف الضلع $[AB]$ والنقطة $N$ منتصف الضلع $[AC]$، والقطعة $[MN]$ مرسومة، وعلامتان على كل من نصفَي $[AB]$ وثلاث علامات على كل من نصفَي $[AC]$.',
    caption: `صفحة ٣١ — ${CAPTION_AUTHORED}`,
    source: page31,
  },
  figureActivityMidline,
);

export const figProofMidline = constructed(
  {
    id: 'fig-l8-proof-midline',
    alt: 'المثلث $ABC$ نفسه، مع النقطة $K$ نظيرة $M$ بالنسبة إلى $N$؛ الرباعي $AMCK$ مرسوم بخط متقطّع لأن قطرَيه $[AC]$ و$[MK]$ متناصفان عند $N$، والرباعي $MBCK$ مظلَّل لأنه متوازي الأضلاع المطلوب.',
    caption: `صفحة ٣١ — ${CAPTION_AUTHORED}`,
    source: page31Proof,
  },
  figureProofMidline,
);

export const figTheoremMidline = constructed(
  {
    id: 'fig-l8-theorem-midline',
    alt: 'مثلث $ABC$ مع النقطة $M$ منتصف $[AB]$ والنقطة $N$ منتصف $[AC]$، والقطعة $[MN]$ مرسومة؛ وهي القطعة التي تتحدث عنها المبرهنة.',
    caption: `صفحة ٣٢ — ${CAPTION_AUTHORED}`,
    source: page32TheoremSource,
  },
  figureActivityMidline,
);

export const figExampleMidline = constructed(
  {
    id: 'fig-l8-example-midline',
    alt: 'مثلث $ABC$، النقطة $I$ منتصف $[AB]$ والنقطة $J$ منتصف $[AC]$، والقطعة $[IJ]$ مرسومة، وعلامتان على نصفَي $[AB]$ وثلاث علامات على نصفَي $[AC]$.',
    caption: `صفحة ٣٢ — ${CAPTION_AUTHORED}`,
    source: page32ExampleSource,
  },
  figureExampleMidline,
);

export const figKnowledgeParallel = constructed(
  {
    id: 'fig-l8-knowledge-parallel',
    alt: 'المثلث $ACI$، النقطة $B$ منتصف $[CI]$ والنقطة $O$ منتصف $[AC]$، والقطعة $[OB]$ مرسومة بخط متقطّع لأن المطلوب إثبات توازيها مع $[AI]$.',
    caption: `صفحة ٣٢ — ${CAPTION_AUTHORED}`,
    source: page32KnowledgeSource,
  },
  figureKnowledgeParallel,
);

/* The same configurations, drawn again for the platform's own explanation
 * steps: a diagram id must be unique in the course, so the teaching steps carry
 * their own instance of the figure instead of re-using the source one. */
export const figProofMidlineTeaching = constructed(
  {
    id: 'fig-l8-proof-midline-teaching',
    alt: 'المثلث $ABC$ مع النقطة $K$ نظيرة $M$ بالنسبة إلى $N$؛ الرباعي $AMCK$ مرسوم بخط متقطّع لتناصف قطرَيه $[AC]$ و$[MK]$، والرباعي $MBCK$ مظلَّل لأنه متوازي الأضلاع الذي يعطي النتيجة.',
    caption: `صفحة ٣١ — ${CAPTION_AUTHORED}`,
    source: page31Proof,
  },
  figureProofMidline,
);

export const figExampleMidlineTeaching = constructed(
  {
    id: 'fig-l8-example-midline-teaching',
    alt: 'مثلث $ABC$ مع النقطة $I$ منتصف $[AB]$ والنقطة $J$ منتصف $[AC]$ والقطعة $[IJ]$؛ يُقارن $IJ$ بالضلع الثالث $[BC]$.',
    caption: `صفحة ٣٢ — ${CAPTION_AUTHORED}`,
    source: page32ExampleSource,
  },
  figureExampleMidline,
);

export const figCheckMidpoints = constructed(
  {
    id: 'fig-l8-check-midpoints',
    alt: 'المثلثان $ABC$ و$ADC$ يشتركان في الضلع $[AC]$؛ النقاط $J$ و$K$ و$L$ على أضلاع $ABC$، و$M$ و$N$ على ضلعي $ADC$، وكلها منتصفات، ولا تُرسم أي قطعة بينها حتى لا يُكشف المطلوب.',
    caption: `صفحة ٣٣ — ${CAPTION_AUTHORED} لا تُرسم القطع $[JK]$ و$[KN]$ و$[LN]$ و$[JM]$: استنتاج توازيها هو المطلوب.`,
    source: page33CheckSource,
  },
  figureCheckMidpoints,
);

export const figPracticeSemicircle = constructed(
  {
    id: 'fig-l8-practice-semicircle',
    alt: 'المثلث $ABE$ حيث $[AB]$ قطر نصف دائرة مركزها $O$، فالنقطة $O$ منتصف $[AB]$، والنقطة $M$ منتصف $[AE]$، والزاوية عند $E$ قائمة، والقطعة $[OM]$ مرسومة بخط متقطّع. القوس نفسه غير مرسوم.',
    caption: `صفحة ٣٣ — ${CAPTION_AUTHORED} القوس غير مرسوم؛ والزاوية القائمة عند $E$ نتيجة كون $[AB]$ قطراً.`,
    source: page33Practice1,
  },
  figurePracticeSemicircle,
);

export const figPracticeSymmetric = constructed(
  {
    id: 'fig-l8-practice-symmetric',
    alt: 'المثلث $ABC$، والنقطتان $B\'$ و$C\'$ نظيرتا $A$ بالنسبة إلى $B$ و$C$ على الترتيب، فالقطعتان $[AB\']$ و$[AC\']$ تحملان علامات التناصف، والقطعة $[B\'C\']$ مرسومة بخط متقطّع.',
    caption: `صفحة ٣٣ — ${CAPTION_AUTHORED}`,
    source: page33Practice2,
  },
  figurePracticeSymmetric,
);

export const figPracticeRectangle = constructed(
  {
    id: 'fig-l8-practice-rectangle',
    alt: 'المستطيل $ABCD$ قطراه $[AC]$ و$[BD]$ مرسومان بخط متقطّع، والنقاط $E$ و$F$ و$G$ و$H$ منتصفات أضلاعه، والرباعي $EFGH$ مظلَّل، والنقطة $O$ مركز المستطيل ونصف قطر الدائرة المحيطة $3\\,\\mathrm{cm}$. الدائرة نفسها غير مرسومة.',
    caption: `صفحة ٣٣ — ${CAPTION_AUTHORED} الدائرة المحيطة غير مرسومة؛ قطرها هو قطر المستطيل.`,
    source: page33Practice3,
  },
  figurePracticeRectangle,
);

/* -------------------------------------------------------------------------- */
/*  Interactive lab — «مختبر منتصفَي الضلعين»                                  */
/* -------------------------------------------------------------------------- */

export const midlineExplorerDiagram: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'authored',
  id: 'auth-08-midline-explorer',
  renderer: 'midline-explorer',
  alt: 'مختبر تفاعلي: يحرّك الطالب رأس المثلث $A$ فيتغيّر شكل المثلث، وتُحسب $M$ و$N$ منتصفَي الضلعين في كل لحظة، ويقرأ في الوقت نفسه $MN$ ونسبتها إلى $BC$ والزاوية بين المستقيمين.',
  caption:
    'مختبر من إعداد المنصّة — القياسات معروضة بوحدات الرسم لا بالسنتيمتر، وهدف المختبر ملاحظة ما لا يتغيّر.',
  source: page31,
  params: {
    title: 'مختبر منتصفَي الضلعين',
    intro:
      'حرّك رأس المثلث $A$ صعوداً ونزولاً: تصبح الزاوية عند $A$ حادة، ثم قائمة، ثم منفرجة — كما في النشاط المطبوع. راقب في كل وضع قيمة $MN$ ونسبتها إلى $BC$، والزاوية بين المستقيمين.',
    base: { B: activityTriangles[0]!.B, C: activityTriangles[0]!.C },
    apex: {
      x: activityTriangles[0]!.A[0],
      minY: activityTriangles[2]!.A[1],
      maxY: activityTriangles[0]!.A[1],
      step: 0.05,
      initialY: activityTriangles[0]!.A[1],
      rightAngleY: activityTriangles[1]!.A[1],
    },
    presets: activityTriangles.map((triangle) => ({
      id: triangle.id,
      label: triangle.label,
      description: triangle.description,
      y: triangle.A[1],
    })),
    readout: {
      mn: 'طول $MN$',
      bc: 'طول $BC$',
      ratio: 'النسبة $MN/BC$',
      angle: 'الزاوية بين $(MN)$ و$(BC)$',
      apexAngle: 'قياس الزاوية $\\widehat{BAC}$',
    },
    toggleLabel: 'أظهر متوازي الأضلاع $MBCK$',
  },
};
