import type { ConstructedDiagram, ContentBlock, InteractiveDiagram, SourceRef } from '../schema';
import type { FigureSpec, FigureTone, LabelPlace, XY } from '@/lib/geometryFigure';
import {
  buildActivityPanelScene,
  L10_ACTIVITY_SHAPES,
  L10_BUNDLE_1,
  L10_BUNDLE_2,
  L10_CHECK,
  L10_EXAMPLE_1,
  L10_EXAMPLE_2,
  L10_PRACTICE_JKL,
  L10_TRANSVERSAL,
  midPoint,
} from './lesson-10-geometry';

/**
 * ============================================================================
 *  UNIT 2, LESSON 3 — GEOMETRIC FIGURES (Pages 36–38)
 * ============================================================================
 *
 *  «مستقيمات متوازية وقاطعان». Every static figure is built on `FigureSpec`
 *  (x right, y up) and rendered through the shared `midline-figure`
 *  (`FigureSvg`). The numeric scenes of pages 37–38 carry the PRINTED lengths
 *  as exact Euclidean distances (2, 3, 8, 12, 2.5, 9, 6 …); every figure is
 *  `origin: 'authored'` with a caption stating it is schematic and not to scale
 *  while every incidence, parallel and metric relation is exact.
 * ============================================================================
 */

const CAPTION_SCHEMATIC =
  'رسم تعليمي من إعداد المنصّة — الشكل تخطيطي غير مقيّس، والعلاقات الهندسية المعلَّمة فيه محقَّقة بالحساب.';

const S36_ACTIVITY: SourceRef = { page: 36, locator: 'نشاط — الأشكال ① و② و③' };
const S36_LEARN: SourceRef = { page: 36, locator: 'تعلّم — مستقيمان متوازيان وقاطعان' };
const S37_EXAMPLES: SourceRef = { page: 37, locator: 'اكتساب معارف — المثالان ① و②' };
const S38_CHECK: SourceRef = { page: 38, locator: 'تحقّق من فهمك' };
const S38_BUNDLES: SourceRef = { page: 38, locator: 'تدرّب ① — الشكلان ① و②' };
const S38_PRACTICE: SourceRef = { page: 38, locator: 'تدرّب ② — المثلثان JKL و JMN' };

const point = (
  at: XY,
  label: string,
  place: LabelPlace = 'n',
  tone: FigureTone = 'ink',
  dot = true,
): NonNullable<FigureSpec['points']>[number] => ({ at, label, place, tone, dot });

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

/** Splits `[from, to]` at its midpoint so `arrow: true` places a parallel chevron. */
const parallelChevron = (from: XY, to: XY, tone: FigureTone = 'ink') => {
  const m = midPoint(from, to);
  return [segment(from, m, { tone, arrow: true }), segment(m, to, { tone })];
};

/** A printed side-length value, offset perpendicular to its side by `side`. */
function sideValue(
  from: XY,
  to: XY,
  text: string,
  away: XY,
): NonNullable<FigureSpec['texts']>[number] {
  return {
    at: midPoint(from, to),
    text,
    tone: 'mark',
    anchor: 'middle',
    ltr: true,
    away,
  };
}

function constructedBlock(
  meta: { id: string; alt: string; caption: string; source?: SourceRef },
  spec: FigureSpec,
): ContentBlock {
  const diagram: ConstructedDiagram = {
    kind: 'constructed',
    origin: 'authored',
    id: meta.id,
    renderer: 'midline-figure',
    alt: meta.alt,
    caption: meta.caption,
    ...(meta.source ? { source: meta.source } : {}),
    construction: spec as unknown as Record<string, unknown>,
  };
  return { type: 'figure', diagram };
}

/* -------------------------------------------------------------------------- */
/*  1. Page 36 — three-panel activity (① right → ② middle → ③ left in RTL)    */
/* -------------------------------------------------------------------------- */

const panel1 = buildActivityPanelScene(L10_ACTIVITY_SHAPES[0]!);
const panel2 = buildActivityPanelScene(L10_ACTIVITY_SHAPES[1]!);
const panel3 = buildActivityPanelScene(L10_ACTIVITY_SHAPES[2]!);

const panelOffset = (scene: ActivityPanelSceneLike, dx: number) => ({
  A: [scene.A[0] + dx, scene.A[1]] as XY,
  B: [scene.B[0] + dx, scene.B[1]] as XY,
  C: [scene.C[0] + dx, scene.C[1]] as XY,
  M: [scene.M[0] + dx, scene.M[1]] as XY,
  N: [scene.N[0] + dx, scene.N[1]] as XY,
});

type ActivityPanelSceneLike = ReturnType<typeof buildActivityPanelScene>;

const p1 = panelOffset(panel1, 15.4);
const p2 = panelOffset(panel2, 7.7);
const p3 = panelOffset(panel3, 0);

export const fig10ActivityPanelsSpec: FigureSpec = {
  viewBox: { x: -0.6, y: -0.4, w: 23.4, h: 6.9 },
  frames: [
    { x: 15.2, y: -0.1, w: 7.4, h: 6.3, label: '①' },
    { x: 7.5, y: -0.1, w: 7.4, h: 6.3, label: '②' },
    { x: -0.2, y: -0.1, w: 7.4, h: 6.3, label: '③' },
  ],
  polygons: [
    { points: [p1.A, p1.B, p1.C], tone: 'ink', fill: true },
    { points: [p2.A, p2.B, p2.C], tone: 'ink', fill: true },
    { points: [p3.A, p3.B, p3.C], tone: 'ink', fill: true },
  ],
  segments: [
    ...parallelChevron(p1.B, p1.C, 'ink'),
    ...parallelChevron(p1.M, p1.N, 'given'),
    ...parallelChevron(p2.B, p2.C, 'ink'),
    ...parallelChevron(p2.M, p2.N, 'given'),
    ...parallelChevron(p3.B, p3.C, 'ink'),
    ...parallelChevron(p3.M, p3.N, 'given'),
  ],
  points: [
    point(p1.A, 'A', 'n'),
    point(p1.B, 'B', 'sw'),
    point(p1.C, 'C', 'se'),
    point(p1.M, 'M', 'nw', 'given'),
    point(p1.N, 'N', 'ne', 'given'),
    point(p2.A, 'A', 'n'),
    point(p2.B, 'B', 'se'),
    point(p2.C, 'C', 'e'),
    point(p2.M, 'M', 'sw', 'given'),
    point(p2.N, 'N', 'ne', 'given'),
    point(p3.A, 'A', 'n'),
    point(p3.B, 'B', 'sw'),
    point(p3.C, 'C', 'se'),
    point(p3.M, 'M', 'nw', 'given'),
    point(p3.N, 'N', 'ne', 'given'),
  ],
};

export const fig10ActivityPanels: ContentBlock = constructedBlock(
  {
    id: 'fig-l10-activity-panels',
    alt: 'الأشكال الثلاثة ① و② و③ لنشاط اكتشاف التناسب: في كل مثلث $ABC$ تقع $M$ على $[AB]$ و$N$ على $[AC]$ و$(MN) \\parallel (BC)$',
    caption: `صفحة ٣٦ — ${CAPTION_SCHEMATIC} السهمان المتوازيان على $(MN)$ و$[BC]$ في كل لوحة يحددان المعطى المشترك للأشكال الثلاثة.`,
    source: S36_ACTIVITY,
  },
  fig10ActivityPanelsSpec,
);

/* -------------------------------------------------------------------------- */
/*  2. Page 36 — تعلّم: two parallel lines cut by two transversals             */
/* -------------------------------------------------------------------------- */

export const fig10TransversalSpec: FigureSpec = {
  viewBox: { x: -0.6, y: -0.2, w: 9.6, h: 7.4 },
  segments: [
    segment(L10_TRANSVERSAL.lowerLeft, L10_TRANSVERSAL.B, { tone: 'ink' }),
    ...parallelChevron(L10_TRANSVERSAL.B, L10_TRANSVERSAL.C, 'ink'),
    segment(L10_TRANSVERSAL.C, L10_TRANSVERSAL.lowerRight, { tone: 'ink' }),
    segment(L10_TRANSVERSAL.upperLeft, L10_TRANSVERSAL.M, { tone: 'given' }),
    ...parallelChevron(L10_TRANSVERSAL.M, L10_TRANSVERSAL.N, 'given'),
    segment(L10_TRANSVERSAL.N, L10_TRANSVERSAL.upperRight, { tone: 'given' }),
    segment(L10_TRANSVERSAL.A, L10_TRANSVERSAL.M, { tone: 'ink' }),
    segment(L10_TRANSVERSAL.M, L10_TRANSVERSAL.B, { tone: 'ink' }),
    segment(L10_TRANSVERSAL.A, L10_TRANSVERSAL.N, { tone: 'ink' }),
    segment(L10_TRANSVERSAL.N, L10_TRANSVERSAL.C, { tone: 'ink' }),
  ],
  points: [
    point(L10_TRANSVERSAL.A, 'A', 'n'),
    point(L10_TRANSVERSAL.B, 'B', 'sw'),
    point(L10_TRANSVERSAL.C, 'C', 'se'),
    point(L10_TRANSVERSAL.M, 'M', 'nw', 'given'),
    point(L10_TRANSVERSAL.N, 'N', 'ne', 'given'),
  ],
};

export const fig10Transversal: ContentBlock = constructedBlock(
  {
    id: 'fig-l10-transversal',
    alt: 'مستقيمان متوازيان $(MN)$ و$(BC)$ يقطعهما قاطعا المثلث $(AB)$ و$(AC)$ في النقاط $M$ و$N$ و$B$ و$C$',
    caption: `صفحة ٣٦ — ${CAPTION_SCHEMATIC} القاطعان $(AB)$ و$(AC)$ يلتقيان في $A$ ويقطعان المتوازيين على الترتيب.`,
    source: S36_LEARN,
  },
  fig10TransversalSpec,
);

/* -------------------------------------------------------------------------- */
/*  3. Page 37 — example ① (AM=2, AR=8, AN=3, AS=12)                           */
/* -------------------------------------------------------------------------- */

export const fig10ExampleOneSpec: FigureSpec = {
  viewBox: { x: -6.4, y: -11.6, w: 14.6, h: 13.4 },
  polygons: [
    { points: [L10_EXAMPLE_1.A, L10_EXAMPLE_1.R, L10_EXAMPLE_1.S], tone: 'ink', fill: true },
  ],
  segments: [
    segment(L10_EXAMPLE_1.aBeyond, L10_EXAMPLE_1.A, { tone: 'aux', dashed: true }),
    segment(L10_EXAMPLE_1.A, L10_EXAMPLE_1.M, { tone: 'given' }),
    segment(L10_EXAMPLE_1.M, L10_EXAMPLE_1.R, { tone: 'ink' }),
    segment(L10_EXAMPLE_1.R, L10_EXAMPLE_1.rBeyond, { tone: 'aux', dashed: true }),
    segment(L10_EXAMPLE_1.A, L10_EXAMPLE_1.N, { tone: 'given' }),
    segment(L10_EXAMPLE_1.N, L10_EXAMPLE_1.S, { tone: 'ink' }),
    ...parallelChevron(L10_EXAMPLE_1.M, L10_EXAMPLE_1.N, 'given'),
    ...parallelChevron(L10_EXAMPLE_1.R, L10_EXAMPLE_1.S, 'ink'),
  ],
  texts: [
    sideValue(L10_EXAMPLE_1.A, L10_EXAMPLE_1.M, '2', [-0.82, 0.57]),
    sideValue(L10_EXAMPLE_1.A, L10_EXAMPLE_1.N, '3', [0.82, 0.57]),
    sideValue(L10_EXAMPLE_1.M, L10_EXAMPLE_1.R, '8', [-0.82, 0.57]),
  ],
  points: [
    point(L10_EXAMPLE_1.A, 'A', 'n'),
    point(L10_EXAMPLE_1.R, 'R', 'sw'),
    point(L10_EXAMPLE_1.S, 'S', 'se'),
    point(L10_EXAMPLE_1.M, 'M', 'nw', 'given'),
    point(L10_EXAMPLE_1.N, 'N', 'ne', 'given'),
  ],
};

export const fig10ExampleOne: ContentBlock = constructedBlock(
  {
    id: 'fig-l10-example-one',
    alt: 'المثلث $ARS$ وفيه $M \\in [AR]$ و$N \\in [AS]$ و$(MN) \\parallel (RS)$ مع الأطوال المعلومة $AM = 2$ و$AN = 3$ و$AR = 8$',
    caption: `صفحة ٣٧ — ${CAPTION_SCHEMATIC} الامتداد المتقطع يمثّل المستقيم $(AR)$، والقيمة $8$ هي طول الضلع الكامل $[AR]$ كما في الكتاب.`,
    source: S37_EXAMPLES,
  },
  fig10ExampleOneSpec,
);

/* -------------------------------------------------------------------------- */
/*  4. Page 37 — example ② (AT=2, TU=3, AR=10, AS=4)                           */
/* -------------------------------------------------------------------------- */

export const fig10ExampleTwoSpec: FigureSpec = {
  viewBox: { x: -1.8, y: -4.9, w: 13.6, h: 10.6 },
  polygons: [
    { points: [L10_EXAMPLE_2.A, L10_EXAMPLE_2.U, L10_EXAMPLE_2.R], tone: 'ink', fill: true },
  ],
  segments: [
    segment(L10_EXAMPLE_2.A, L10_EXAMPLE_2.T, { tone: 'given' }),
    segment(L10_EXAMPLE_2.T, L10_EXAMPLE_2.U, { tone: 'ink' }),
    segment(L10_EXAMPLE_2.U, L10_EXAMPLE_2.R, { tone: 'ink' }),
    segment(L10_EXAMPLE_2.A, L10_EXAMPLE_2.S, { tone: 'given' }),
    segment(L10_EXAMPLE_2.S, L10_EXAMPLE_2.R, { tone: 'ink' }),
    segment(L10_EXAMPLE_2.R, L10_EXAMPLE_2.rBeyond, { tone: 'aux', dashed: true }),
    segment(L10_EXAMPLE_2.A, L10_EXAMPLE_2.aBeyond, { tone: 'aux', dashed: true }),
    ...parallelChevron(L10_EXAMPLE_2.T, L10_EXAMPLE_2.S, 'given'),
    ...parallelChevron(L10_EXAMPLE_2.U, L10_EXAMPLE_2.R, 'ink'),
  ],
  texts: [
    sideValue(L10_EXAMPLE_2.A, L10_EXAMPLE_2.T, '2', [-0.77, 0.64]),
    sideValue(L10_EXAMPLE_2.T, L10_EXAMPLE_2.U, '3', [-0.77, 0.64]),
    sideValue(L10_EXAMPLE_2.S, L10_EXAMPLE_2.R, '10', [-0.26, -0.97]),
  ],
  points: [
    point(L10_EXAMPLE_2.A, 'A', 'sw'),
    point(L10_EXAMPLE_2.U, 'U', 'n'),
    point(L10_EXAMPLE_2.R, 'R', 'se'),
    point(L10_EXAMPLE_2.T, 'T', 'nw', 'given'),
    point(L10_EXAMPLE_2.S, 'S', 's', 'given'),
  ],
};

export const fig10ExampleTwo: ContentBlock = constructedBlock(
  {
    id: 'fig-l10-example-two',
    alt: 'المثلث $ARU$ وفيه $T \\in [AU]$ و$S \\in [AR]$ و$(TS) \\parallel (RU)$ مع الأطوال المعلومة $AT = 2$ و$TU = 3$ و$AR = 10$',
    caption: `صفحة ٣٧ — ${CAPTION_SCHEMATIC} القيمة $10$ على الامتداد المتقطع تمثّل طول الضلع الكامل $[AR]$.`,
    source: S37_EXAMPLES,
  },
  fig10ExampleTwoSpec,
);

/* -------------------------------------------------------------------------- */
/*  5. Page 38 — تحقّق من فهمك (AE=3, AF=4, AC=12)                             */
/* -------------------------------------------------------------------------- */

export const fig10CheckSpec: FigureSpec = {
  viewBox: { x: -4.6, y: -12.4, w: 12.8, h: 13.6 },
  polygons: [{ points: [L10_CHECK.A, L10_CHECK.B, L10_CHECK.C], tone: 'ink', fill: true }],
  segments: [
    segment(L10_CHECK.A, L10_CHECK.E, { tone: 'given' }),
    segment(L10_CHECK.E, L10_CHECK.B, { tone: 'ink' }),
    segment(L10_CHECK.A, L10_CHECK.F, { tone: 'given' }),
    segment(L10_CHECK.F, L10_CHECK.C, { tone: 'ink' }),
    segment(L10_CHECK.C, L10_CHECK.cBeyond, { tone: 'aux', dashed: true }),
    segment(L10_CHECK.B, L10_CHECK.C, { tone: 'ink' }),
    ...parallelChevron(L10_CHECK.E, L10_CHECK.F, 'given'),
    ...parallelChevron(L10_CHECK.B, L10_CHECK.C, 'ink'),
  ],
  texts: [
    sideValue(L10_CHECK.A, L10_CHECK.E, '3', [-0.34, -0.94]),
    sideValue(L10_CHECK.A, L10_CHECK.F, '4', [0.87, 0.5]),
    sideValue(L10_CHECK.C, L10_CHECK.cBeyond, '12', [0.87, 0.5]),
  ],
  points: [
    point(L10_CHECK.A, 'A', 'n'),
    point(L10_CHECK.B, 'B', 'sw'),
    point(L10_CHECK.C, 'C', 'se'),
    point(L10_CHECK.E, 'E', 'nw', 'given'),
    point(L10_CHECK.F, 'F', 'ne', 'given'),
  ],
};

export const fig10Check: ContentBlock = constructedBlock(
  {
    id: 'fig-l10-check-aef',
    alt: 'المثلث $ABC$ وفيه $E \\in [AB]$ و$F \\in [AC]$ و$(EF) \\parallel (BC)$ مع الأطوال $AE = 3$ و$AF = 4$ و$AC = 12$',
    caption: `صفحة ٣٨ — ${CAPTION_SCHEMATIC} الامتداد المتقطع لـ $(AC)$ يحمل القيمة المطبوعة $12$، ولا يظهر طولا $AB$ و$EB$ لأنهما المطلوب حسابهما.`,
    source: S38_CHECK,
  },
  fig10CheckSpec,
);

/* -------------------------------------------------------------------------- */
/*  6. Page 38 — تدرّب ① shape ①: two parallels & the named transversals       */
/* -------------------------------------------------------------------------- */

export const fig10BundleOneSpec: FigureSpec = {
  viewBox: { x: -0.4, y: -0.6, w: 10.6, h: 7.6 },
  segments: [
    segment(L10_BUNDLE_1.bottomLeft, L10_BUNDLE_1.E, { tone: 'ink' }),
    ...parallelChevron(L10_BUNDLE_1.E, L10_BUNDLE_1.F, 'ink'),
    segment(L10_BUNDLE_1.F, L10_BUNDLE_1.bottomRight, { tone: 'ink' }),
    segment(L10_BUNDLE_1.topLeft, L10_BUNDLE_1.B, { tone: 'given' }),
    ...parallelChevron(L10_BUNDLE_1.B, L10_BUNDLE_1.C, 'given'),
    segment(L10_BUNDLE_1.C, L10_BUNDLE_1.D, { tone: 'given' }),
    segment(L10_BUNDLE_1.D, L10_BUNDLE_1.topRight, { tone: 'given' }),
    segment(L10_BUNDLE_1.A, L10_BUNDLE_1.B, { tone: 'ink' }),
    segment(L10_BUNDLE_1.B, L10_BUNDLE_1.E, { tone: 'ink' }),
    segment(L10_BUNDLE_1.A, L10_BUNDLE_1.C, { tone: 'ink' }),
    segment(L10_BUNDLE_1.C, L10_BUNDLE_1.F, { tone: 'ink' }),
    segment(L10_BUNDLE_1.E, L10_BUNDLE_1.D, { tone: 'image' }),
  ],
  points: [
    point(L10_BUNDLE_1.A, 'A', 'n'),
    point(L10_BUNDLE_1.B, 'B', 's', 'given'),
    point(L10_BUNDLE_1.C, 'C', 's', 'given'),
    point(L10_BUNDLE_1.D, 'D', 's', 'given'),
    point(L10_BUNDLE_1.E, 'E', 'sw'),
    point(L10_BUNDLE_1.F, 'F', 'se'),
  ],
};

export const fig10BundleOne: ContentBlock = constructedBlock(
  {
    id: 'fig-l10-bundle-one',
    alt: 'مستقيمان متوازيان أفقيان تقطعهما المستقيمات $(AE)$ و$(AF)$ و$(ED)$ بالنقاط $B$ و$C$ و$D$ على المستقيم العلوي و$E$ و$F$ على السفلي',
    caption: `صفحة ٣٨ — ${CAPTION_SCHEMATIC} المثلثان الرئيسيان المشتركان في الرأس $A$ هما $ABC$ و$AEF$ حيث $(BC) \\parallel (EF)$.`,
    source: S38_BUNDLES,
  },
  fig10BundleOneSpec,
);

/* -------------------------------------------------------------------------- */
/*  7. Page 38 — تدرّب ① shape ②: three parallel lines & three transversals    */
/* -------------------------------------------------------------------------- */

export const fig10BundleTwoSpec: FigureSpec = {
  viewBox: { x: -0.4, y: -0.6, w: 13.6, h: 9.4 },
  segments: [
    // Three horizontal parallel lines.
    segment([0.2, L10_BUNDLE_2.y0], [12.4, L10_BUNDLE_2.y0], { tone: 'ink' }),
    ...parallelChevron([0.2, L10_BUNDLE_2.y1], [12.4, L10_BUNDLE_2.y1], 'given'),
    segment([2.6, L10_BUNDLE_2.y2], [9.2, L10_BUNDLE_2.y2], { tone: 'given' }),
    // Converging slants (HM) through H, I, G and (KM) through K, J.
    segment(L10_BUNDLE_2.H, L10_BUNDLE_2.I, { tone: 'ink' }),
    segment(L10_BUNDLE_2.I, L10_BUNDLE_2.G, { tone: 'ink' }),
    segment(L10_BUNDLE_2.G, L10_BUNDLE_2.M, { tone: 'ink' }),
    segment(L10_BUNDLE_2.K, L10_BUNDLE_2.J, { tone: 'ink' }),
    ...parallelChevron(L10_BUNDLE_2.J, L10_BUNDLE_2.M, 'given'),
    // Third slant (TN) parallel to (KM).
    segment(L10_BUNDLE_2.N, L10_BUNDLE_2.T, { tone: 'image' }),
    ...parallelChevron(L10_BUNDLE_2.T, [L10_BUNDLE_2.T[0] + 1.0, L10_BUNDLE_2.T[1] + 4.0], 'image'),
  ],
  points: [
    point(L10_BUNDLE_2.M, 'M', 'n', 'given'),
    point(L10_BUNDLE_2.G, 'G', 'w'),
    point(L10_BUNDLE_2.I, 'I', 's'),
    point(L10_BUNDLE_2.J, 'J', 's', 'given'),
    point(L10_BUNDLE_2.T, 'T', 's', 'image'),
    point(L10_BUNDLE_2.H, 'H', 'sw'),
    point(L10_BUNDLE_2.K, 'K', 's'),
    point(L10_BUNDLE_2.N, 'N', 'se'),
  ],
};

export const fig10BundleTwo: ContentBlock = constructedBlock(
  {
    id: 'fig-l10-bundle-two',
    alt: 'ثلاثة مستقيمات أفقية متوازية تقطعها مستقيمات مائلة بينها $(TN) \\parallel (KM)$ والنقاط $M$ و$G$ و$I$ و$J$ و$T$ و$H$ و$K$ و$N$',
    caption: `صفحة ٣٨ — ${CAPTION_SCHEMATIC} المثلثان $MIJ$ و$MHK$ مشتركان في الرأس $M$ وضلعاهما $(IJ)$ و$(HK)$ محمولان على مستقيمين متوازيين.`,
    source: S38_BUNDLES,
  },
  fig10BundleTwoSpec,
);

/* -------------------------------------------------------------------------- */
/*  8. Page 38 — تدرّب ②: JKL starter (givens only) + teacher solved figure    */
/* -------------------------------------------------------------------------- */

export const fig10PracticeStarterSpec: FigureSpec = {
  viewBox: { x: -0.7, y: -1.4, w: 13.9, h: 7.4 },
  polygons: [
    {
      points: [L10_PRACTICE_JKL.J, L10_PRACTICE_JKL.K, L10_PRACTICE_JKL.L],
      tone: 'ink',
      fill: true,
    },
  ],
  segments: [
    segment(L10_PRACTICE_JKL.J, L10_PRACTICE_JKL.M, { tone: 'given' }),
    segment(L10_PRACTICE_JKL.M, L10_PRACTICE_JKL.K, { tone: 'ink' }),
    segment(L10_PRACTICE_JKL.J, L10_PRACTICE_JKL.N, { tone: 'given' }),
    segment(L10_PRACTICE_JKL.N, L10_PRACTICE_JKL.L, { tone: 'ink' }),
    ...parallelChevron(L10_PRACTICE_JKL.M, L10_PRACTICE_JKL.N, 'given'),
    ...parallelChevron(L10_PRACTICE_JKL.K, L10_PRACTICE_JKL.L, 'ink'),
  ],
  texts: [
    sideValue(L10_PRACTICE_JKL.J, L10_PRACTICE_JKL.M, '2.5', [-0.5, 0.87]),
    sideValue(L10_PRACTICE_JKL.J, L10_PRACTICE_JKL.N, '3', [0, -1]),
    sideValue(L10_PRACTICE_JKL.N, L10_PRACTICE_JKL.L, '9', [0, -1]),
    sideValue(L10_PRACTICE_JKL.K, L10_PRACTICE_JKL.L, '6', [0.5, 0.87]),
  ],
  points: [
    point(L10_PRACTICE_JKL.J, 'J', 'sw'),
    point(L10_PRACTICE_JKL.K, 'K', 'n'),
    point(L10_PRACTICE_JKL.L, 'L', 'se'),
    point(L10_PRACTICE_JKL.M, 'M', 'nw', 'given'),
    point(L10_PRACTICE_JKL.N, 'N', 's', 'given'),
  ],
};

export const fig10PracticeStarter: ContentBlock = constructedBlock(
  {
    id: 'fig-l10-practice-jkl-starter',
    alt: 'المثلث $JKL$ وفيه $M \\in [JK]$ و$N \\in [JL]$ و$(MN) \\parallel (KL)$ مع الأطوال المعلومة $JM = 2.5$ و$JN = 3$ و$NL = 9$ و$KL = 6$',
    caption: `${CAPTION_SCHEMATIC} يعرض المعطيات المطبوعة فقط من دون تعليم طولا $JK$ و$MN$ المطلوب حسابهما.`,
    source: S38_PRACTICE,
  },
  fig10PracticeStarterSpec,
);

export const fig10PracticeSolvedSpec: FigureSpec = {
  viewBox: { x: -0.7, y: -1.4, w: 13.9, h: 7.4 },
  polygons: [
    {
      points: [L10_PRACTICE_JKL.J, L10_PRACTICE_JKL.M, L10_PRACTICE_JKL.N],
      tone: 'given',
      fill: true,
    },
    {
      points: [L10_PRACTICE_JKL.J, L10_PRACTICE_JKL.K, L10_PRACTICE_JKL.L],
      tone: 'ink',
      fill: false,
    },
  ],
  segments: [
    segment(L10_PRACTICE_JKL.J, L10_PRACTICE_JKL.M, { tone: 'given', ticks: 1 }),
    segment(L10_PRACTICE_JKL.M, L10_PRACTICE_JKL.K, { tone: 'ink', ticks: 3 }),
    segment(L10_PRACTICE_JKL.J, L10_PRACTICE_JKL.N, { tone: 'given', ticks: 1 }),
    segment(L10_PRACTICE_JKL.N, L10_PRACTICE_JKL.L, { tone: 'ink', ticks: 3 }),
    ...parallelChevron(L10_PRACTICE_JKL.M, L10_PRACTICE_JKL.N, 'given'),
    ...parallelChevron(L10_PRACTICE_JKL.K, L10_PRACTICE_JKL.L, 'ink'),
  ],
  texts: [
    sideValue(L10_PRACTICE_JKL.J, L10_PRACTICE_JKL.M, '2.5', [-0.5, 0.87]),
    sideValue(L10_PRACTICE_JKL.J, L10_PRACTICE_JKL.N, '3', [0, -1]),
    sideValue(L10_PRACTICE_JKL.N, L10_PRACTICE_JKL.L, '9', [0, -1]),
    sideValue(L10_PRACTICE_JKL.K, L10_PRACTICE_JKL.L, '6', [0.5, 0.87]),
    sideValue(L10_PRACTICE_JKL.M, L10_PRACTICE_JKL.N, '1.5', [0, 1]),
  ],
  points: [
    point(L10_PRACTICE_JKL.J, 'J', 'sw'),
    point(L10_PRACTICE_JKL.K, 'K', 'n'),
    point(L10_PRACTICE_JKL.L, 'L', 'se'),
    point(L10_PRACTICE_JKL.M, 'M', 'nw', 'given'),
    point(L10_PRACTICE_JKL.N, 'N', 's', 'given'),
  ],
};

export const fig10PracticeSolved: ContentBlock = constructedBlock(
  {
    id: 'fig-l10-practice-jkl-solved',
    alt: 'شكل حل تدرّب ② مع إبراز المثلث الصغير $JMN$ وإضافة النتيجتين $JK = 10$ و$MN = 1.5$',
    caption: `${CAPTION_SCHEMATIC} بعد الحل: $JK = 4 \\times JM = 10$ و$MN = \\frac{1}{4}\\,KL = 1.5$، والعلامات الثلاثية توضّح نسبة الأجزاء $3:1$.`,
    source: S38_PRACTICE,
  },
  fig10PracticeSolvedSpec,
);

/* -------------------------------------------------------------------------- */
/*  9. Interactive «مختبر التناسب» diagram spec                                */
/* -------------------------------------------------------------------------- */

export const thalesRatioLabDiagram: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'authored',
  id: 'auth-10-thales-ratio-lab',
  renderer: 'thales-ratio-lab',
  alt: 'مختبر تفاعلي لاكتشاف تناسب أطوال أضلاع المثلثين $AMN$ و$ABC$ عند تحريك النقطة $M$ على $[AB]$ مع إمكان إمالة المستقيم عن موازاة $[BC]$',
  caption:
    'مختبر تفاعلي من إعداد المنصّة — حرّك النقطة $M$ على $[AB]$ وأمِل المستقيم $(MN)$ عن موازاة $[BC]$، وراقب متى تتساوى النسب الثلاث $\\frac{AM}{AB}=\\frac{AN}{AC}=\\frac{MN}{BC}$ ومتى تختل.',
  source: S36_ACTIVITY,
  params: {
    initialRatio: 0.4,
    initialTiltDeg: 0,
  },
};

export const ALL_L10_FIGURE_SPECS: readonly { id: string; spec: FigureSpec }[] = [
  { id: 'fig-l10-activity-panels', spec: fig10ActivityPanelsSpec },
  { id: 'fig-l10-transversal', spec: fig10TransversalSpec },
  { id: 'fig-l10-example-one', spec: fig10ExampleOneSpec },
  { id: 'fig-l10-example-two', spec: fig10ExampleTwoSpec },
  { id: 'fig-l10-check-aef', spec: fig10CheckSpec },
  { id: 'fig-l10-bundle-one', spec: fig10BundleOneSpec },
  { id: 'fig-l10-bundle-two', spec: fig10BundleTwoSpec },
  { id: 'fig-l10-practice-jkl-starter', spec: fig10PracticeStarterSpec },
  { id: 'fig-l10-practice-jkl-solved', spec: fig10PracticeSolvedSpec },
];
