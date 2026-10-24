import type { ConstructedDiagram, ContentBlock, InteractiveDiagram, SourceRef } from '../schema';
import type { FigureSegment, FigureSpec, FigureTone, LabelPlace, XY } from '@/lib/geometryFigure';
import {
  buildActivityPanelScene,
  L9_CHECK_1,
  L9_CHECK_2,
  L9_EXAMPLE,
  L9_KNOWLEDGE,
  L9_PRACTICE_1,
  L9_PRACTICE_2,
  midPoint,
} from './lesson-09-geometry';

/**
 * ============================================================================
 *  UNIT 2, LESSON 2 — GEOMETRIC FIGURES (Pages 34–35)
 * ============================================================================
 *
 *  Every static diagram in Lesson 9 is built on `FigureSpec` (`x` right, `y` up)
 *  and rendered through `midline-figure` (`FigureSvg`).
 *
 *  Pages 34–35 print NO numeric lengths and NO degree measures; the printed
 *  drawings specify incidence, equality ticks, parallel chevrons, and right-
 *  angle squares. Just like Lesson 8 (`lesson-08-figures.ts`), every figure
 *  carries `origin: 'authored'` with `source` recording the printed figure it
 *  models and a caption explicitly stating that the drawing is schematic and
 *  not to scale while every incidence/midpoint/parallel relation is exact.
 * ============================================================================
 */

const CAPTION_SCHEMATIC =
  'رسم تعليمي من إعداد المنصّة — الشكل تخطيطي غير مقيّس، والعلاقات الهندسية المعلَّمة فيه محقَّقة بالحساب.';

const S34_ACTIVITY: SourceRef = { page: 34, locator: 'نشاط — الأشكال ① و② و③' };
const S34_EXAMPLE: SourceRef = { page: 34, locator: 'تعلّم — المثال المرافق' };
const S35_KNOWLEDGE: SourceRef = { page: 35, locator: 'اكتساب معارف — المثال' };
const S35_CHECK_1: SourceRef = { page: 35, locator: 'تحقّق من فهمك — ①' };
const S35_CHECK_2: SourceRef = { page: 35, locator: 'تحقّق من فهمك — ②' };
const S35_PRACTICE_1: SourceRef = { page: 35, locator: 'تدرّب — ①' };
const S35_PRACTICE_2: SourceRef = { page: 35, locator: 'تدرّب — ②' };

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
): FigureSegment => ({ from, to, ...options });

const rightAngle = (at: XY, from: XY, to: XY): NonNullable<FigureSpec['angles']>[number] => ({
  at,
  from,
  to,
  right: true,
  tone: 'mark',
});

/** Splits `[from, to]` at its midpoint so `arrow: true` places a parallel chevron at the middle. */
const parallelChevron = (from: XY, to: XY, tone: FigureTone = 'ink'): FigureSegment[] => {
  const m = midPoint(from, to);
  return [segment(from, m, { tone, arrow: true }), segment(m, to, { tone })];
};

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
/*  1. Page 34 — Salim's 3-panel activity (`①` right → `②` middle → `③` left) */
/* -------------------------------------------------------------------------- */

const p1 = buildActivityPanelScene(15.2); // Panel ① (rightmost in RTL)
const p2 = buildActivityPanelScene(7.6); // Panel ② (middle)
const p3 = buildActivityPanelScene(0); // Panel ③ (leftmost in RTL)

export const fig09ActivityPanelsSpec: FigureSpec = {
  viewBox: { x: -0.6, y: -0.4, w: 23.0, h: 6.7 },
  frames: [
    { x: 15.0, y: -0.1, w: 7.1, h: 6.1, label: '①' },
    { x: 7.4, y: -0.1, w: 7.1, h: 6.1, label: '②' },
    { x: -0.2, y: -0.1, w: 7.1, h: 6.1, label: '③' },
  ],
  polygons: [
    { points: [p1.A, p1.B, p1.C], tone: 'ink', fill: true },
    { points: [p2.A, p2.B, p2.C], tone: 'ink', fill: true },
    { points: [p3.A, p3.B, p3.C], tone: 'ink', fill: true },
  ],
  segments: [
    // Panel ①: triangle ABC + M midpoint of [AB]
    segment(p1.A, p1.M, { ticks: 2 }),
    segment(p1.M, p1.B, { ticks: 2 }),
    segment(p1.B, p1.C),
    segment(p1.C, p1.A),

    // Panel ②: adds Salim's tilted freehand line (d) through M cutting [AC] at P
    segment(p2.A, p2.M, { ticks: 2 }),
    segment(p2.M, p2.B, { ticks: 2 }),
    segment(p2.B, p2.C),
    segment(p2.C, p2.A),
    segment(p2.dStart, p2.dEnd, { tone: 'image' }),

    // Panel ③: adds true midpoint N of [AC] and line (d') = (MN) non-coincident with (d)
    segment(p3.A, p3.M, { ticks: 2 }),
    segment(p3.M, p3.B, { ticks: 2 }),
    segment(p3.B, p3.C),
    segment(p3.A, p3.N, { ticks: 1 }),
    segment(p3.N, p3.C, { ticks: 1 }),
    segment(p3.dStart, p3.dEnd, { tone: 'image' }),
    segment(p3.dPrimeStart, p3.dPrimeEnd, { tone: 'given' }),
  ],
  points: [
    // Panel ①
    point(p1.A, 'A', 'n'),
    point(p1.B, 'B', 'sw'),
    point(p1.C, 'C', 'se'),
    point(p1.M, 'M', 'w', 'given'),

    // Panel ②
    point(p2.A, 'A', 'n'),
    point(p2.B, 'B', 'sw'),
    point(p2.C, 'C', 'se'),
    point(p2.M, 'M', 'nw', 'given'),
    point(p2.P, 'P', 'ne', 'image'),
    point(p2.dEnd, '(d)', 'n', 'image', false),

    // Panel ③
    point(p3.A, 'A', 'n'),
    point(p3.B, 'B', 'sw'),
    point(p3.C, 'C', 'se'),
    point(p3.M, 'M', 'nw', 'given'),
    point(p3.N, 'N', 'se', 'given'),
    point(p3.dEnd, '(d)', 'n', 'image', false),
    point(p3.dPrimeEnd, "(d')", 'e', 'given', false),
  ],
};

export const fig09ActivityPanels: ContentBlock = constructedBlock(
  {
    id: 'fig-l9-activity-panels',
    alt: "الأشكال الثلاثة ① و② و③ لنشاط سليم في المثلث $ABC$ مع المستقيم اليدوي $(d)$ والمستقيم $(d')$ المار بمنتصفَي $[AB]$ و$[AC]$",
    caption: `صفحة ٣٤ — ${CAPTION_SCHEMATIC} المراحل من اليمين إلى اليسار: ① تعيين $M$ منتصف $[AB]$، ② رسم $(d)$ يدوياً فقطع $[AC]$ في $P$، ③ رسم $(d')$ من $M$ و$N$ منتصف $[AC]$.`,
    source: S34_ACTIVITY,
  },
  fig09ActivityPanelsSpec,
);

/* -------------------------------------------------------------------------- */
/*  2. Page 34 — Worked example (`I` mid `[AB]`, `(IJ) ∥ (BC)`)               */
/* -------------------------------------------------------------------------- */

export const fig09ExampleSpec: FigureSpec = {
  viewBox: { x: -0.9, y: -0.4, w: 9.8, h: 6.6 },
  polygons: [{ points: [L9_EXAMPLE.A, L9_EXAMPLE.B, L9_EXAMPLE.C], tone: 'ink', fill: true }],
  segments: [
    segment(L9_EXAMPLE.A, L9_EXAMPLE.I, { ticks: 1 }),
    segment(L9_EXAMPLE.I, L9_EXAMPLE.B, { ticks: 1 }),
    ...parallelChevron(L9_EXAMPLE.B, L9_EXAMPLE.C, 'ink'),
    segment(L9_EXAMPLE.A, L9_EXAMPLE.C),
    segment(L9_EXAMPLE.lineLeft, L9_EXAMPLE.I, { tone: 'given' }),
    ...parallelChevron(L9_EXAMPLE.I, L9_EXAMPLE.J, 'given'),
    segment(L9_EXAMPLE.J, L9_EXAMPLE.lineRight, { tone: 'given' }),
  ],
  points: [
    point(L9_EXAMPLE.A, 'A', 'n'),
    point(L9_EXAMPLE.B, 'B', 'sw'),
    point(L9_EXAMPLE.C, 'C', 'se'),
    point(L9_EXAMPLE.I, 'I', 'nw', 'given'),
    point(L9_EXAMPLE.J, 'J', 'ne', 'image'),
  ],
};

export const fig09Example: ContentBlock = constructedBlock(
  {
    id: 'fig-l9-example-ij',
    alt: 'المثلث $ABC$ حيث $I$ منتصف $[AB]$ والمستقيم $(IJ)$ موازٍ للضلع $(BC)$ ويقطع $[AC]$ في $J$',
    caption: `صفحة ٣٤ — ${CAPTION_SCHEMATIC} العلامة المفردة على $[AI]$ و$[IB]$ والسهمان على $(IJ)$ و$[BC]$ يمثّلان المعطيات فقط من دون تعليم $[AJ]$ و$[JC]$.`,
    source: S34_EXAMPLE,
  },
  fig09ExampleSpec,
);

/* -------------------------------------------------------------------------- */
/*  3. Page 35 — Knowledge Acquisition (`R` mid `[AM]`, `(d) ∥ (BC)`)         */
/* -------------------------------------------------------------------------- */

export const fig09KnowledgeSpec: FigureSpec = {
  viewBox: { x: -0.5, y: -0.5, w: 10.2, h: 6.7 },
  polygons: [{ points: [L9_KNOWLEDGE.A, L9_KNOWLEDGE.C, L9_KNOWLEDGE.B], tone: 'ink', fill: true }],
  segments: [
    segment(L9_KNOWLEDGE.A, L9_KNOWLEDGE.C),
    ...parallelChevron(L9_KNOWLEDGE.C, L9_KNOWLEDGE.M, 'ink'),
    segment(L9_KNOWLEDGE.M, L9_KNOWLEDGE.B),
    segment(L9_KNOWLEDGE.A, L9_KNOWLEDGE.B),
    segment(L9_KNOWLEDGE.A, L9_KNOWLEDGE.R, { ticks: 1 }),
    segment(L9_KNOWLEDGE.R, L9_KNOWLEDGE.M, { ticks: 1 }),
    ...parallelChevron(L9_KNOWLEDGE.dLeft, L9_KNOWLEDGE.R, 'image'),
    segment(L9_KNOWLEDGE.R, L9_KNOWLEDGE.dRight, { tone: 'image' }),
  ],
  points: [
    point(L9_KNOWLEDGE.A, 'A', 'n'),
    point(L9_KNOWLEDGE.C, 'C', 'sw'),
    point(L9_KNOWLEDGE.M, 'M', 's'),
    point(L9_KNOWLEDGE.B, 'B', 'se'),
    point(L9_KNOWLEDGE.R, 'R', 'nw', 'given'),
    point(L9_KNOWLEDGE.S, 'S', 'ne', 'image'),
    point(L9_KNOWLEDGE.dLeft, '(d)', 'n', 'image', false),
  ],
};

export const fig09Knowledge: ContentBlock = constructedBlock(
  {
    id: 'fig-l9-knowledge-amb',
    alt: 'المثلث $ABC$ وفيه $M$ نقطة من $[BC]$ و$R$ منتصف $[AM]$ والمستقيم $(d)$ المار بـ $R$ موازياً $(BC)$ وقاطعاً $[AB]$ في $S$',
    caption: `صفحة ٣٥ — ${CAPTION_SCHEMATIC} النقطة $M$ ليست منتصف $[BC]$، والتساوي المعلَّم في المعطيات هو $AR = RM$ فقط.`,
    source: S35_KNOWLEDGE,
  },
  fig09KnowledgeSpec,
);

export const fig09KnowledgeSubtriangleSpec: FigureSpec = {
  viewBox: { x: -0.5, y: -0.5, w: 10.2, h: 6.7 },
  polygons: [
    { points: [L9_KNOWLEDGE.A, L9_KNOWLEDGE.C, L9_KNOWLEDGE.M], tone: 'aux', fill: false },
    { points: [L9_KNOWLEDGE.A, L9_KNOWLEDGE.M, L9_KNOWLEDGE.B], tone: 'given', fill: true },
  ],
  segments: [
    segment(L9_KNOWLEDGE.A, L9_KNOWLEDGE.C, { tone: 'aux', dashed: true }),
    segment(L9_KNOWLEDGE.C, L9_KNOWLEDGE.M, { tone: 'aux', dashed: true }),
    ...parallelChevron(L9_KNOWLEDGE.M, L9_KNOWLEDGE.B, 'given'),
    segment(L9_KNOWLEDGE.A, L9_KNOWLEDGE.S, { tone: 'ink', ticks: 2 }),
    segment(L9_KNOWLEDGE.S, L9_KNOWLEDGE.B, { tone: 'ink', ticks: 2 }),
    segment(L9_KNOWLEDGE.A, L9_KNOWLEDGE.R, { tone: 'given', ticks: 1 }),
    segment(L9_KNOWLEDGE.R, L9_KNOWLEDGE.M, { tone: 'given', ticks: 1 }),
    segment(L9_KNOWLEDGE.dLeft, L9_KNOWLEDGE.R, { tone: 'aux', dashed: true }),
    ...parallelChevron(L9_KNOWLEDGE.R, L9_KNOWLEDGE.S, 'image'),
    segment(L9_KNOWLEDGE.S, L9_KNOWLEDGE.dRight, { tone: 'image' }),
  ],
  points: [
    point(L9_KNOWLEDGE.A, 'A', 'n'),
    point(L9_KNOWLEDGE.C, 'C', 'sw', 'aux'),
    point(L9_KNOWLEDGE.M, 'M', 's', 'given'),
    point(L9_KNOWLEDGE.B, 'B', 'se', 'given'),
    point(L9_KNOWLEDGE.R, 'R', 'nw', 'given'),
    point(L9_KNOWLEDGE.S, 'S', 'ne', 'image'),
    point(L9_KNOWLEDGE.dRight, '(d)', 'n', 'image', false),
  ],
};

export const fig09KnowledgeSubtriangle: ContentBlock = constructedBlock(
  {
    id: 'fig-l9-knowledge-subtriangle',
    alt: 'إبراز المثلث الجزئي $AMB$ داخل المثلث $ABC$ لتطبيق المبرهنة الثانية في المنتصفات واستنتاج $AS = SB$',
    caption: `${CAPTION_SCHEMATIC} بعزل المثلث المظلّل $AMB$ نرى أنَّ $[AM]$ و$[MB]$ و$[AB]$ هي أضلاعه الثلاثة.`,
    source: S35_KNOWLEDGE,
  },
  fig09KnowledgeSubtriangleSpec,
);

export const fig09KnowledgeSubtriangleTeacher: ContentBlock = constructedBlock(
  {
    id: 'fig-l9-knowledge-subtriangle-teacher',
    alt: 'شكل حل مثال اكتساب المعارف مع إبراز المثلث $AMB$ وتساوي $AS = SB$',
    caption: `${CAPTION_SCHEMATIC} تطبيق المبرهنة الثانية على المثلث $AMB$.`,
    source: S35_KNOWLEDGE,
  },
  fig09KnowledgeSubtriangleSpec,
);

/* -------------------------------------------------------------------------- */
/*  4. Page 35 — Check Understanding ①                                        */
/* -------------------------------------------------------------------------- */

export const fig09CheckOneSpec: FigureSpec = {
  viewBox: { x: -0.5, y: -0.5, w: 9.2, h: 6.7 },
  polygons: [{ points: [L9_CHECK_1.A, L9_CHECK_1.B, L9_CHECK_1.C], tone: 'ink', fill: true }],
  segments: [
    ...parallelChevron(L9_CHECK_1.A, L9_CHECK_1.B, 'ink'),
    segment(L9_CHECK_1.B, L9_CHECK_1.C),
    segment(L9_CHECK_1.A, L9_CHECK_1.E, { ticks: 2 }),
    segment(L9_CHECK_1.E, L9_CHECK_1.C, { ticks: 2 }),
    segment(L9_CHECK_1.A, L9_CHECK_1.F),
    segment(L9_CHECK_1.B, L9_CHECK_1.E),
    segment(L9_CHECK_1.lineTop, L9_CHECK_1.E, { tone: 'image' }),
    ...parallelChevron(L9_CHECK_1.E, L9_CHECK_1.F, 'image'),
    segment(L9_CHECK_1.F, L9_CHECK_1.lineBottom, { tone: 'image' }),
  ],
  points: [
    point(L9_CHECK_1.A, 'A', 'nw'),
    point(L9_CHECK_1.B, 'B', 'sw'),
    point(L9_CHECK_1.C, 'C', 'e'),
    point(L9_CHECK_1.E, 'E', 'ne', 'given'),
    point(L9_CHECK_1.F, 'F', 'se', 'image'),
  ],
};

export const fig09CheckOne: ContentBlock = constructedBlock(
  {
    id: 'fig-l9-check-one',
    alt: 'المثلث $ABC$ وفيه $E$ منتصف $[AC]$ والمستقيم $(EF)$ يوازي $(AB)$ مع القطعتين الداخليتين $[AF]$ و$[BE]$',
    caption: `صفحة ٣٥ — ${CAPTION_SCHEMATIC} القطعتان $[AF]$ و$[BE]$ مرسومتان داخل المثلث كما في الكتاب، والمبرهنة تُطبَّق على المثلث $ABC$.`,
    source: S35_CHECK_1,
  },
  fig09CheckOneSpec,
);

/* -------------------------------------------------------------------------- */
/*  5. Page 35 — Check Understanding ②                                        */
/* -------------------------------------------------------------------------- */

export const fig09CheckTwoSpec: FigureSpec = {
  viewBox: { x: -0.4, y: -0.7, w: 8.8, h: 6.7 },
  polygons: [{ points: [L9_CHECK_2.A, L9_CHECK_2.B, L9_CHECK_2.C], tone: 'ink', fill: true }],
  segments: [
    segment(L9_CHECK_2.B, L9_CHECK_2.M, { ticks: 1 }),
    segment(L9_CHECK_2.M, L9_CHECK_2.A, { ticks: 1 }),
    segment(L9_CHECK_2.B, L9_CHECK_2.C),
    segment(L9_CHECK_2.C, L9_CHECK_2.A),
    segment(L9_CHECK_2.lineBottom, L9_CHECK_2.lineTop, { tone: 'image' }),
  ],
  angles: [
    rightAngle(L9_CHECK_2.B, L9_CHECK_2.C, L9_CHECK_2.A),
    rightAngle(L9_CHECK_2.M, L9_CHECK_2.N, L9_CHECK_2.A),
  ],
  points: [
    point(L9_CHECK_2.C, 'C', 'nw'),
    point(L9_CHECK_2.B, 'B', 'sw'),
    point(L9_CHECK_2.A, 'A', 'se'),
    point(L9_CHECK_2.M, 'M', 'se', 'given'),
    point(L9_CHECK_2.N, 'N', 'ne', 'image'),
  ],
};

export const fig09CheckTwo: ContentBlock = constructedBlock(
  {
    id: 'fig-l9-check-two',
    alt: 'المثلث $ABC$ القائم في $B$ حيث $M$ منتصف $[AB]$ والمستقيم $(MN)$ عمودي على $(AB)$ ويقطع $[AC]$ في $N$',
    caption: `صفحة ٣٥ — ${CAPTION_SCHEMATIC} الزاويتان القائمتان عند $B$ وعند $M$ هما المعطى لتبرير التوازي قبل استنتاج منتصف $[AC]$.`,
    source: S35_CHECK_2,
  },
  fig09CheckTwoSpec,
);

/* -------------------------------------------------------------------------- */
/*  6. Page 35 — Practice ① (starter givens-only + Teacher solved figure)     */
/* -------------------------------------------------------------------------- */

export const fig09PracticeOneStarterSpec: FigureSpec = {
  viewBox: { x: -0.4, y: -0.4, w: 9.8, h: 6.7 },
  polygons: [
    { points: [L9_PRACTICE_1.I, L9_PRACTICE_1.J, L9_PRACTICE_1.K], tone: 'ink', fill: true },
  ],
  segments: [
    segment(L9_PRACTICE_1.I, L9_PRACTICE_1.J, { tone: 'given', ticks: 1 }),
    segment(L9_PRACTICE_1.J, L9_PRACTICE_1.S, { tone: 'given', ticks: 1 }),
    ...parallelChevron(L9_PRACTICE_1.J, L9_PRACTICE_1.K, 'ink'),
    segment(L9_PRACTICE_1.I, L9_PRACTICE_1.ikRight),
    segment(L9_PRACTICE_1.stTop, L9_PRACTICE_1.S, { tone: 'image' }),
    ...parallelChevron(L9_PRACTICE_1.S, L9_PRACTICE_1.T, 'image'),
    segment(L9_PRACTICE_1.T, L9_PRACTICE_1.stBottom, { tone: 'image' }),
  ],
  points: [
    point(L9_PRACTICE_1.I, 'I', 'sw'),
    point(L9_PRACTICE_1.J, 'J', 'nw', 'given'),
    point(L9_PRACTICE_1.K, 'K', 's'),
    point(L9_PRACTICE_1.S, 'S', 'nw', 'given'),
    point(L9_PRACTICE_1.T, 'T', 'ne', 'image'),
  ],
};

export const fig09PracticeOneStarter: ContentBlock = constructedBlock(
  {
    id: 'fig-l9-practice-one-starter',
    alt: 'نموذج تحقق للرسم في تدرّب ①: المثلث $IJK$ والنقطة $S$ نظيرة $I$ بالنسبة إلى $J$ والمستقيم $(ST)$ الموازي لـ $(JK)$',
    caption: `${CAPTION_SCHEMATIC} يعرض هذا النموذج المعطيات فقط ($IJ = JS$ و$(ST) \\parallel (JK)$) دون تعليم التساوي المطلوب إثباته على $[IT]$.`,
    source: S35_PRACTICE_1,
  },
  fig09PracticeOneStarterSpec,
);

export const fig09PracticeOneSolvedSpec: FigureSpec = {
  viewBox: { x: -0.4, y: -0.4, w: 9.8, h: 6.7 },
  polygons: [
    { points: [L9_PRACTICE_1.I, L9_PRACTICE_1.S, L9_PRACTICE_1.T], tone: 'given', fill: true },
  ],
  segments: [
    segment(L9_PRACTICE_1.I, L9_PRACTICE_1.J, { tone: 'given', ticks: 1 }),
    segment(L9_PRACTICE_1.J, L9_PRACTICE_1.S, { tone: 'given', ticks: 1 }),
    ...parallelChevron(L9_PRACTICE_1.J, L9_PRACTICE_1.K, 'given'),
    segment(L9_PRACTICE_1.I, L9_PRACTICE_1.K, { tone: 'ink', ticks: 2 }),
    segment(L9_PRACTICE_1.K, L9_PRACTICE_1.T, { tone: 'ink', ticks: 2 }),
    segment(L9_PRACTICE_1.T, L9_PRACTICE_1.ikRight, { tone: 'aux', dashed: true }),
    segment(L9_PRACTICE_1.stTop, L9_PRACTICE_1.S, { tone: 'image' }),
    ...parallelChevron(L9_PRACTICE_1.S, L9_PRACTICE_1.T, 'image'),
    segment(L9_PRACTICE_1.T, L9_PRACTICE_1.stBottom, { tone: 'image' }),
  ],
  points: [
    point(L9_PRACTICE_1.I, 'I', 'sw'),
    point(L9_PRACTICE_1.J, 'J', 'nw', 'given'),
    point(L9_PRACTICE_1.K, 'K', 's', 'image'),
    point(L9_PRACTICE_1.S, 'S', 'nw', 'given'),
    point(L9_PRACTICE_1.T, 'T', 'ne', 'image'),
  ],
};

export const fig09PracticeOneSolved: ContentBlock = constructedBlock(
  {
    id: 'fig-l9-practice-one-solved',
    alt: 'شكل حل تدرّب ① مع إبراز المثلث $IST$ وتساوي $IK = KT$',
    caption: `${CAPTION_SCHEMATIC} تطبيق المبرهنة الثانية على المثلث الكبير $IST$ يثبت أنَّ $K$ منتصف $[IT]$.`,
    source: S35_PRACTICE_1,
  },
  fig09PracticeOneSolvedSpec,
);

/* -------------------------------------------------------------------------- */
/*  7. Page 35 — Practice ② (starter givens-only + Teacher solved figure)     */
/* -------------------------------------------------------------------------- */

export const fig09PracticeTwoStarterSpec: FigureSpec = {
  viewBox: { x: -0.4, y: -0.4, w: 9.8, h: 6.5 },
  polygons: [
    { points: [L9_PRACTICE_2.A, L9_PRACTICE_2.J, L9_PRACTICE_2.P], tone: 'ink', fill: true },
  ],
  segments: [
    segment(L9_PRACTICE_2.A, L9_PRACTICE_2.C, { tone: 'given', ticks: 1 }),
    segment(L9_PRACTICE_2.C, L9_PRACTICE_2.J, { tone: 'given', ticks: 1 }),
    segment(L9_PRACTICE_2.A, L9_PRACTICE_2.P),
    ...parallelChevron(L9_PRACTICE_2.C, L9_PRACTICE_2.P, 'given'),
    segment(L9_PRACTICE_2.J, L9_PRACTICE_2.jmRight),
    segment(L9_PRACTICE_2.amTop, L9_PRACTICE_2.A, { tone: 'image' }),
    ...parallelChevron(L9_PRACTICE_2.A, L9_PRACTICE_2.M, 'image'),
    segment(L9_PRACTICE_2.M, L9_PRACTICE_2.amBottom, { tone: 'image' }),
  ],
  points: [
    point(L9_PRACTICE_2.A, 'A', 'n'),
    point(L9_PRACTICE_2.J, 'J', 'sw'),
    point(L9_PRACTICE_2.C, 'C', 'nw', 'given'),
    point(L9_PRACTICE_2.P, 'P', 's'),
    point(L9_PRACTICE_2.M, 'M', 'ne', 'image'),
  ],
};

export const fig09PracticeTwoStarter: ContentBlock = constructedBlock(
  {
    id: 'fig-l9-practice-two-starter',
    alt: 'نموذج تحقق للرسم في تدرّب ②: المثلث $AJP$ ومنتصف $[AJ]$ النقطة $C$ والموازي لـ $(CP)$ من $A$ الذي يقطع $(JP)$ في $M$',
    caption: `${CAPTION_SCHEMATIC} يعرض هذا النموذج المعطيات فقط ($AC = CJ$ و$(AM) \\parallel (CP)$) دون تعليم التساوي المطلوب إثباته على $[JM]$.`,
    source: S35_PRACTICE_2,
  },
  fig09PracticeTwoStarterSpec,
);

export const fig09PracticeTwoSolvedSpec: FigureSpec = {
  viewBox: { x: -0.4, y: -0.4, w: 9.8, h: 6.5 },
  polygons: [
    { points: [L9_PRACTICE_2.J, L9_PRACTICE_2.A, L9_PRACTICE_2.M], tone: 'given', fill: true },
  ],
  segments: [
    segment(L9_PRACTICE_2.A, L9_PRACTICE_2.C, { tone: 'given', ticks: 1 }),
    segment(L9_PRACTICE_2.C, L9_PRACTICE_2.J, { tone: 'given', ticks: 1 }),
    segment(L9_PRACTICE_2.A, L9_PRACTICE_2.P, { tone: 'aux', dashed: true }),
    ...parallelChevron(L9_PRACTICE_2.C, L9_PRACTICE_2.P, 'given'),
    segment(L9_PRACTICE_2.J, L9_PRACTICE_2.P, { tone: 'ink', ticks: 2 }),
    segment(L9_PRACTICE_2.P, L9_PRACTICE_2.M, { tone: 'ink', ticks: 2 }),
    segment(L9_PRACTICE_2.M, L9_PRACTICE_2.jmRight, { tone: 'aux', dashed: true }),
    segment(L9_PRACTICE_2.amTop, L9_PRACTICE_2.A, { tone: 'image' }),
    ...parallelChevron(L9_PRACTICE_2.A, L9_PRACTICE_2.M, 'image'),
    segment(L9_PRACTICE_2.M, L9_PRACTICE_2.amBottom, { tone: 'image' }),
  ],
  points: [
    point(L9_PRACTICE_2.A, 'A', 'n'),
    point(L9_PRACTICE_2.J, 'J', 'sw'),
    point(L9_PRACTICE_2.C, 'C', 'nw', 'given'),
    point(L9_PRACTICE_2.P, 'P', 's', 'image'),
    point(L9_PRACTICE_2.M, 'M', 'ne', 'image'),
  ],
};

export const fig09PracticeTwoSolved: ContentBlock = constructedBlock(
  {
    id: 'fig-l9-practice-two-solved',
    alt: 'شكل حل تدرّب ② مع إبراز المثلث $JAM$ وتساوي $JP = PM$',
    caption: `${CAPTION_SCHEMATIC} في المثلث الكبير $JAM$ يقطع المستقيم $(CP)$ الضلع الثالث $[JM]$ في منتصفه $P$.`,
    source: S35_PRACTICE_2,
  },
  fig09PracticeTwoSolvedSpec,
);

/* -------------------------------------------------------------------------- */
/*  8. Interactive lab diagram spec                                            */
/* -------------------------------------------------------------------------- */

export const parallelMidpointLabDiagram: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'authored',
  id: 'auth-09-parallel-midpoint-lab',
  renderer: 'parallel-midpoint-lab',
  alt: 'مختبر تفاعلي لمقارنة المستقيم المرسوم يدوياً من منتصف ضلع مع المستقيم الموازي الدقيق في مثلث',
  caption:
    "مختبر تفاعلي من إعداد المنصّة — غيّر انحراف المستقيم $(d)$ عن موازاة $[BC]$ أو بدّل نوع المثلث وراقب متى ينطبق $(d)$ على $(d')$ ومتى تقع $P$ في منتصف $[AC]$.",
  source: S34_ACTIVITY,
  params: {
    initialDeltaDeg: 9,
  },
};

export const ALL_L9_FIGURE_SPECS: readonly { id: string; spec: FigureSpec }[] = [
  { id: 'fig-l9-activity-panels', spec: fig09ActivityPanelsSpec },
  { id: 'fig-l9-example-ij', spec: fig09ExampleSpec },
  { id: 'fig-l9-knowledge-amb', spec: fig09KnowledgeSpec },
  { id: 'fig-l9-knowledge-subtriangle', spec: fig09KnowledgeSubtriangleSpec },
  { id: 'fig-l9-check-one', spec: fig09CheckOneSpec },
  { id: 'fig-l9-check-two', spec: fig09CheckTwoSpec },
  { id: 'fig-l9-practice-one-starter', spec: fig09PracticeOneStarterSpec },
  { id: 'fig-l9-practice-one-solved', spec: fig09PracticeOneSolvedSpec },
  { id: 'fig-l9-practice-two-starter', spec: fig09PracticeTwoStarterSpec },
  { id: 'fig-l9-practice-two-solved', spec: fig09PracticeTwoSolvedSpec },
];
