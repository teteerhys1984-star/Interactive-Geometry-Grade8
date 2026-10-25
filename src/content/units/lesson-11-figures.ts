import type { ConstructedDiagram, ContentBlock, InteractiveDiagram, SourceRef } from '../schema';
import type { FigureSpec, FigureTone, LabelPlace, XY } from '@/lib/geometryFigure';
import {
  L11_CHECK_ONE,
  L11_CHECK_TWO,
  L11_EXAMPLE_SCENE,
  L11_EXTENSION_BEYOND_APEX,
  L11_EXTENSION_BEYOND_BASE,
  L11_PRACTICE_ONE_CASE_1,
  L11_PRACTICE_ONE_CASE_2,
  L11_PRACTICE_ONE_CASE_3,
  L11_PRACTICE_TWO_ONE,
  L11_PRACTICE_TWO_THREE,
  L11_PRACTICE_TWO_TWO,
  L11_THEOREM_SCENE,
  buildActivityScene,
} from './lesson-11-geometry';
import { midPoint } from './lesson-10-geometry';

/**
 * ============================================================================
 *  UNIT 2, LESSON 4 — GEOMETRIC FIGURES (Pages 39–41)
 * ============================================================================
 *
 *  «تساوي ثلاث نسب». Every static figure is a `midline-figure` FigureSpec
 *  (x right, y up) drawn through the shared `FigureSvg`; every one is
 *  `origin: 'authored'` with a caption that says it is schematic and not to
 *  scale, while every incidence, parallel, midpoint and printed magnitude is
 *  exact by construction (`lesson-11-geometry.test.ts` re-derives them).
 *
 *  Two rules are inherited from Lessons 9–10 and enforced by the tests:
 *
 *    • STARTER figures print the givens only. The proven conclusions (the
 *      midpoints J, P, N and the equal thirds CS = SR = RB) appear only in the
 *      panel that the proof has already reached, and in no earlier panel.
 *    • A printed value is written beside the segment it measures. Where the
 *      book prints a whole side and one of its parts on the same side (AB = 3
 *      and AE = 2), the whole-side value sits on the remaining part [EB] —
 *      exactly as Lesson 10 did with AR = 8 on [MR].
 * ============================================================================
 */

const CAPTION_SCHEMATIC =
  'رسم تعليمي من إعداد المنصّة — الشكل تخطيطي غير مقيّس، والعلاقات الهندسية المعلَّمة فيه محقَّقة بالحساب.';

const S39_ACTIVITY: SourceRef = { page: 39, locator: 'نشاط — إثبات الخاصّة السابقة في حالة خاصّة' };
const S40_THEOREM: SourceRef = { page: 40, locator: 'تعلّم — مبرهنة النسب الثلاث المتساوية' };
const S40_EXAMPLE: SourceRef = { page: 40, locator: 'مثال — المثلث AEF' };
const S41_SOLUTION: SourceRef = { page: 41, locator: 'تكملة الحل — أطوال أضلاع المثلث AEF' };
const S41_CHECK: SourceRef = { page: 41, locator: 'تحقّق من فهمك — الحالتان ① و②' };
const S41_PRACTICE_1: SourceRef = { page: 41, locator: 'تدرّب ① — الحالات ① و② و③' };
const S41_PRACTICE_2: SourceRef = { page: 41, locator: 'تدرّب ② — الأشكال الثلاثة' };

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

/** Splits `[from, to]` at its midpoint so `arrow: true` paints a parallel chevron. */
const parallelChevron = (from: XY, to: XY, tone: FigureTone = 'ink') => {
  const m = midPoint(from, to);
  return [segment(from, m, { tone, arrow: true }), segment(m, to, { tone })];
};

const shift = (at: XY, dx: number, dy: number): XY => [at[0] + dx, at[1] + dy];

/** A printed value or letter, offset perpendicular to its side by `away`. */
function sideValue(
  from: XY,
  to: XY,
  text: string,
  away: XY,
  tone: FigureTone = 'mark',
): NonNullable<FigureSpec['texts']>[number] {
  return { at: midPoint(from, to), text, tone, anchor: 'middle', ltr: true, away };
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
/*  1. Page 39 — the four-stage activity, panels ①–④ in a 2 × 2 grid           */
/* -------------------------------------------------------------------------- */

const base = buildActivityScene();

/** Each panel is the same triangle with one more stage of the construction. */
const panelOffset =
  (dx: number, dy: number) =>
  (at: XY): XY =>
    shift(at, dx, dy);

const panelOne = panelOffset(8.9, 7.2); // ① top-right
const panelTwo = panelOffset(0, 7.2); // ② top-left
const panelThree = panelOffset(8.9, 0); // ③ bottom-right
const panelFour = panelOffset(0, 0); // ④ bottom-left

const at = (f: (p: XY) => XY, p: XY) => f(p);
const A = base.A;
const B = base.B;
const C = base.C;
const I = base.I;
const M = base.M;
const N = base.N;
const J = base.J;
const P = base.P;
const R = base.R;
const S = base.S;

const triangleOutlines = (f: (p: XY) => XY): NonNullable<FigureSpec['polygons']> => [
  { points: [at(f, A), at(f, B), at(f, C)], tone: 'ink', fill: true },
];

export const fig11ActivityPanelsSpec: FigureSpec = {
  viewBox: { x: -0.5, y: -0.4, w: 17.8, h: 14.6 },
  frames: [
    { x: 8.7, y: 7.4, w: 8.4, h: 6.6, label: '①' },
    { x: -0.2, y: 7.4, w: 8.4, h: 6.6, label: '②' },
    { x: 8.7, y: 0.2, w: 8.4, h: 6.6, label: '③' },
    { x: -0.2, y: 0.2, w: 8.4, h: 6.6, label: '④' },
  ],
  polygons: [
    ...triangleOutlines(panelOne),
    ...triangleOutlines(panelTwo),
    ...triangleOutlines(panelThree),
    ...triangleOutlines(panelFour),
    // Panel ③ highlights the two sub-triangles the printed proof isolates.
    {
      points: [at(panelThree, A), at(panelThree, I), at(panelThree, J)],
      tone: 'given',
      fill: true,
    },
    {
      points: [at(panelThree, J), at(panelThree, N), at(panelThree, C)],
      tone: 'aux',
      fill: true,
    },
  ],
  segments: [
    // Panel ① — the two midlines (IJ) and (MN).
    segment(at(panelOne, A), at(panelOne, B), { tone: 'ink' }),
    segment(at(panelOne, A), at(panelOne, C), { tone: 'ink' }),
    ...parallelChevron(at(panelOne, B), at(panelOne, C), 'ink'),
    segment(at(panelOne, I), at(panelOne, M), { tone: 'given', ticks: 3 }),
    segment(at(panelOne, M), at(panelOne, B), { tone: 'given', ticks: 3 }),
    segment(at(panelOne, I), at(panelOne, J), { tone: 'given' }),
    ...parallelChevron(at(panelOne, M), at(panelOne, N), 'given'),
    // Panel ② — adds (BJ) meeting (MN) at P.
    segment(at(panelTwo, A), at(panelTwo, B), { tone: 'ink' }),
    segment(at(panelTwo, A), at(panelTwo, C), { tone: 'ink' }),
    ...parallelChevron(at(panelTwo, B), at(panelTwo, C), 'ink'),
    segment(at(panelTwo, I), at(panelTwo, J), { tone: 'aux', dashed: true }),
    ...parallelChevron(at(panelTwo, M), at(panelTwo, N), 'given'),
    segment(at(panelTwo, B), at(panelTwo, P), { tone: 'aux' }),
    segment(at(panelTwo, P), at(panelTwo, J), { tone: 'aux' }),
    // Panel ③ — the shaded sub-triangles ABC / AIJ / JNC.
    segment(at(panelThree, A), at(panelThree, B), { tone: 'ink' }),
    segment(at(panelThree, A), at(panelThree, C), { tone: 'ink' }),
    ...parallelChevron(at(panelThree, B), at(panelThree, C), 'ink'),
    segment(at(panelThree, I), at(panelThree, J), { tone: 'given' }),
    ...parallelChevron(at(panelThree, M), at(panelThree, N), 'given'),
    segment(at(panelThree, J), at(panelThree, C), { tone: 'aux', dashed: true }),
    // Panel ④ — adds the two parallels through J and N meeting (BC) at R and S.
    segment(at(panelFour, A), at(panelFour, B), { tone: 'ink' }),
    segment(at(panelFour, A), at(panelFour, C), { tone: 'ink' }),
    ...parallelChevron(at(panelFour, B), at(panelFour, C), 'ink'),
    segment(at(panelFour, I), at(panelFour, J), { tone: 'aux', dashed: true }),
    ...parallelChevron(at(panelFour, M), at(panelFour, N), 'given'),
    segment(at(panelFour, J), at(panelFour, R), { tone: 'image' }),
    segment(at(panelFour, N), at(panelFour, S), { tone: 'image' }),
  ],
  points: [
    // ①
    point(at(panelOne, A), 'A', 'n'),
    point(at(panelOne, B), 'B', 'sw'),
    point(at(panelOne, C), 'C', 'se'),
    point(at(panelOne, I), 'I', 'nw', 'given'),
    point(at(panelOne, M), 'M', 's', 'given'),
    point(at(panelOne, N), 'N', 'ne', 'given'),
    point(at(panelOne, J), 'J', 'w', 'given'),
    // ②
    point(at(panelTwo, A), 'A', 'n'),
    point(at(panelTwo, B), 'B', 'sw'),
    point(at(panelTwo, C), 'C', 'se'),
    point(at(panelTwo, I), 'I', 'nw', 'given'),
    point(at(panelTwo, M), 'M', 's', 'given'),
    point(at(panelTwo, N), 'N', 'ne', 'given'),
    point(at(panelTwo, J), 'J', 'w', 'given'),
    point(at(panelTwo, P), 'P', 'e', 'aux'),
    // ③
    point(at(panelThree, A), 'A', 'n'),
    point(at(panelThree, B), 'B', 'sw'),
    point(at(panelThree, C), 'C', 'se'),
    point(at(panelThree, I), 'I', 'nw', 'given'),
    point(at(panelThree, M), 'M', 's', 'given'),
    point(at(panelThree, N), 'N', 'ne', 'given'),
    point(at(panelThree, J), 'J', 'w', 'given'),
    // ④
    point(at(panelFour, A), 'A', 'n'),
    point(at(panelFour, B), 'B', 'sw'),
    point(at(panelFour, C), 'C', 'se'),
    point(at(panelFour, I), 'I', 'nw', 'given'),
    point(at(panelFour, M), 'M', 's', 'given'),
    point(at(panelFour, N), 'N', 'ne', 'given'),
    point(at(panelFour, J), 'J', 'w', 'given'),
    point(at(panelFour, R), 'R', 's', 'image'),
    point(at(panelFour, S), 'S', 's', 'image'),
  ],
};

export const fig11ActivityPanels: ContentBlock = constructedBlock(
  {
    id: 'fig-l11-activity-panels',
    alt: 'اللوحات الأربع ① و② و③ و④ لنشاط الصفحة ٣٩: المثلث $ABC$ وفيه $I$ و$M$ على $[AB]$ و$N$ على $[AC]$ مع $(MN) \\parallel (BC)$، ثم الإنشاءات المساعدة $J$ و$P$ و$R$ و$S$',
    caption: `صفحة ٣٩ — ${CAPTION_SCHEMATIC} اللوحة ① تحمل القطع الواصلة $[IJ]$ و$[MN]$، واللوحة ② تضيف $(BJ)$ ولقاءها مع $(MN)$ في $P$، واللوحة ③ تظهّر المثلثين الجزئيين، واللوحة ④ تضيف الموازيين من $J$ ومن $N$ إلى $[BC]$ في $R$ و$S$. العلامات الثلاثية على $[IM]$ و$[MB]$ هي علامات الأجزاء الثلاثة المتساوية المطبوعة على $[AB]$.`,
    source: S39_ACTIVITY,
  },
  fig11ActivityPanelsSpec,
);

/* -------------------------------------------------------------------------- */
/*  2. Page 40 — the theorem figure: the line (d) through M and N              */
/* -------------------------------------------------------------------------- */

export const fig11TheoremLineSpec: FigureSpec = {
  viewBox: { x: -1.4, y: -2.2, w: 12.4, h: 10.6 },
  polygons: [
    { points: [L11_THEOREM_SCENE.A, L11_THEOREM_SCENE.B, L11_THEOREM_SCENE.C], fill: true },
  ],
  segments: [
    segment(L11_THEOREM_SCENE.dLeft, L11_THEOREM_SCENE.M, { tone: 'aux', dashed: true }),
    segment(L11_THEOREM_SCENE.M, L11_THEOREM_SCENE.N, { tone: 'given' }),
    segment(L11_THEOREM_SCENE.N, L11_THEOREM_SCENE.dRight, { tone: 'aux', dashed: true }),
    ...parallelChevron(L11_THEOREM_SCENE.M, L11_THEOREM_SCENE.N, 'given'),
    ...parallelChevron(L11_THEOREM_SCENE.B, L11_THEOREM_SCENE.C, 'ink'),
  ],
  points: [
    point(L11_THEOREM_SCENE.A, 'A', 'n'),
    point(L11_THEOREM_SCENE.B, 'B', 'sw'),
    point(L11_THEOREM_SCENE.C, 'C', 'se'),
    point(L11_THEOREM_SCENE.M, 'M', 'sw', 'given'),
    point(L11_THEOREM_SCENE.N, 'N', 'se', 'given'),
  ],
};

export const fig11TheoremLine: ContentBlock = constructedBlock(
  {
    id: 'fig-l11-theorem-line',
    alt: 'المثلث $ABC$ يقطعه المستقيم $(d)$ في $M$ على $[AB]$ و$N$ على $[AC]$ مع $(MN) \\parallel (BC)$',
    caption: `صفحة ٤٠ — ${CAPTION_SCHEMATIC} المستقيم $(d)$ مرسوم ممتداً على الجانبين كما في الشكل المطبوع، والجزء الداخلي منه هو القطعة $[MN]$. السهمان على $(MN)$ و$(BC)$ يعلّمان التوازي.`,
    source: S40_THEOREM,
  },
  fig11TheoremLineSpec,
);

/* -------------------------------------------------------------------------- */
/*  3. Page 40 — the two «(d) cuts the extensions» panels                      */
/* -------------------------------------------------------------------------- */

const extOne = (p: XY): XY => shift(p, 9.8, 0);
const extTwo = (p: XY): XY => p;

export const fig11ExtensionCasesSpec: FigureSpec = {
  viewBox: { x: -1.4, y: -0.9, w: 21.4, h: 8.6 },
  frames: [
    { x: 9.6, y: -0.6, w: 9.6, h: 8.0, label: '①' },
    { x: -1.2, y: -0.6, w: 9.6, h: 8.0, label: '②' },
  ],
  segments: [
    // Panel ① — (d) meets the extensions beyond the apex A.
    segment(extOne(L11_EXTENSION_BEYOND_APEX.dLeft), extOne(L11_EXTENSION_BEYOND_APEX.M), {
      tone: 'aux',
      dashed: true,
    }),
    segment(extOne(L11_EXTENSION_BEYOND_APEX.M), extOne(L11_EXTENSION_BEYOND_APEX.N), {
      tone: 'given',
    }),
    segment(extOne(L11_EXTENSION_BEYOND_APEX.N), extOne(L11_EXTENSION_BEYOND_APEX.dRight), {
      tone: 'aux',
      dashed: true,
    }),
    segment(extOne(L11_EXTENSION_BEYOND_APEX.A), extOne(L11_EXTENSION_BEYOND_APEX.B), {
      tone: 'ink',
    }),
    segment(extOne(L11_EXTENSION_BEYOND_APEX.B), extOne(L11_EXTENSION_BEYOND_APEX.C), {
      tone: 'ink',
    }),
    segment(extOne(L11_EXTENSION_BEYOND_APEX.C), extOne(L11_EXTENSION_BEYOND_APEX.A), {
      tone: 'ink',
    }),
    ...parallelChevron(
      extOne(L11_EXTENSION_BEYOND_APEX.B),
      extOne(L11_EXTENSION_BEYOND_APEX.C),
      'ink',
    ),
    // Panel ② — (d) meets the extensions beyond B and C.
    segment(extTwo(L11_EXTENSION_BEYOND_BASE.dLeft), extTwo(L11_EXTENSION_BEYOND_BASE.M), {
      tone: 'aux',
      dashed: true,
    }),
    segment(extTwo(L11_EXTENSION_BEYOND_BASE.M), extTwo(L11_EXTENSION_BEYOND_BASE.N), {
      tone: 'given',
    }),
    segment(extTwo(L11_EXTENSION_BEYOND_BASE.N), extTwo(L11_EXTENSION_BEYOND_BASE.dRight), {
      tone: 'aux',
      dashed: true,
    }),
    segment(extTwo(L11_EXTENSION_BEYOND_BASE.A), extTwo(L11_EXTENSION_BEYOND_BASE.B), {
      tone: 'ink',
    }),
    segment(extTwo(L11_EXTENSION_BEYOND_BASE.B), extTwo(L11_EXTENSION_BEYOND_BASE.C), {
      tone: 'ink',
    }),
    segment(extTwo(L11_EXTENSION_BEYOND_BASE.C), extTwo(L11_EXTENSION_BEYOND_BASE.A), {
      tone: 'ink',
    }),
    ...parallelChevron(
      extTwo(L11_EXTENSION_BEYOND_BASE.B),
      extTwo(L11_EXTENSION_BEYOND_BASE.C),
      'ink',
    ),
  ],
  points: [
    point(extOne(L11_EXTENSION_BEYOND_APEX.A), 'A', 'sw'),
    point(extOne(L11_EXTENSION_BEYOND_APEX.B), 'B', 'sw'),
    point(extOne(L11_EXTENSION_BEYOND_APEX.C), 'C', 'se'),
    point(extOne(L11_EXTENSION_BEYOND_APEX.M), 'M', 'ne', 'given'),
    point(extOne(L11_EXTENSION_BEYOND_APEX.N), 'N', 'nw', 'given'),
    point(extTwo(L11_EXTENSION_BEYOND_BASE.A), 'A', 'n'),
    point(extTwo(L11_EXTENSION_BEYOND_BASE.B), 'B', 'nw'),
    point(extTwo(L11_EXTENSION_BEYOND_BASE.C), 'C', 'ne'),
    point(extTwo(L11_EXTENSION_BEYOND_BASE.M), 'M', 'w', 'given'),
    point(extTwo(L11_EXTENSION_BEYOND_BASE.N), 'N', 'e', 'given'),
  ],
};

export const fig11ExtensionCases: ContentBlock = constructedBlock(
  {
    id: 'fig-l11-extension-hint',
    alt: 'حالتان للمستقيم $(d)$ قاطعاً امتدادي الضلعين $[AB]$ و$[AC]$: في الحالة ① يقطع الامتدادين فوق الرأس $A$، وفي الحالة ② يقطعهما تحت القاعدة $[BC]$',
    caption: `صفحة ٤٠ — ${CAPTION_SCHEMATIC} الحالتان توضّحان ملاحظة الكتاب: تبقى المبرهنة صحيحة حين يقطع $(d)$ امتدادي $[AB]$ و$[AC]$ خارج القطعتين، مع بقاء $(d) \\parallel (BC)$.`,
    source: S40_THEOREM,
  },
  fig11ExtensionCasesSpec,
);

/* -------------------------------------------------------------------------- */
/*  4. Page 40 — example starter (givens only)                                 */
/* -------------------------------------------------------------------------- */

export const fig11ExampleGivenSpec: FigureSpec = {
  viewBox: { x: -1.6, y: -1.8, w: 10.2, h: 8.6 },
  polygons: [
    { points: [L11_EXAMPLE_SCENE.A, L11_EXAMPLE_SCENE.B, L11_EXAMPLE_SCENE.C], fill: true },
  ],
  segments: [
    segment(L11_EXAMPLE_SCENE.dLeft, L11_EXAMPLE_SCENE.E, { tone: 'aux', dashed: true }),
    segment(L11_EXAMPLE_SCENE.E, L11_EXAMPLE_SCENE.F, { tone: 'given' }),
    segment(L11_EXAMPLE_SCENE.F, L11_EXAMPLE_SCENE.dRight, { tone: 'aux', dashed: true }),
    ...parallelChevron(L11_EXAMPLE_SCENE.E, L11_EXAMPLE_SCENE.F, 'given'),
    ...parallelChevron(L11_EXAMPLE_SCENE.B, L11_EXAMPLE_SCENE.C, 'ink'),
  ],
  texts: [
    // AE = 2 (given) and AB = 3 (given, printed on the remaining part [EB]).
    sideValue(L11_EXAMPLE_SCENE.A, L11_EXAMPLE_SCENE.E, '2', [-0.92, 0.4]),
    sideValue(L11_EXAMPLE_SCENE.E, L11_EXAMPLE_SCENE.B, '3', [-0.92, 0.4]),
    sideValue(L11_EXAMPLE_SCENE.A, L11_EXAMPLE_SCENE.C, '6', [0.92, 0.4]),
    sideValue(L11_EXAMPLE_SCENE.B, L11_EXAMPLE_SCENE.C, '5', [0.1, -1]),
  ],
  points: [
    point(L11_EXAMPLE_SCENE.A, 'A', 'n'),
    point(L11_EXAMPLE_SCENE.B, 'B', 'sw'),
    point(L11_EXAMPLE_SCENE.C, 'C', 'se'),
    point(L11_EXAMPLE_SCENE.E, 'E', 'nw', 'given'),
    point(L11_EXAMPLE_SCENE.F, 'F', 'ne', 'given'),
  ],
};

export const fig11ExampleGiven: ContentBlock = constructedBlock(
  {
    id: 'fig-l11-example-given',
    alt: 'المثلث $ABC$ وفيه $E$ على $[AB]$ و$F$ على $[AC]$ و$(EF) \\parallel (BC)$ مع المعطيات المطبوعة $AB = 3$ و$AC = 6$ و$BC = 5$ و$AE = 2$',
    caption: `صفحة ٤٠ — ${CAPTION_SCHEMATIC} يعرض الشكل المعطيات المطبوعة فقط: $AB = 3$ و$AC = 6$ و$BC = 5$ و$AE = 2$. القيمة $3$ موضوعة على الجزء $[EB]$ لأنها طول الضلع الكامل $[AB]$ كما في الكتاب، ولا يظهر طولا $AF$ و$EF$ المطلوب حسابهما.`,
    source: S40_EXAMPLE,
  },
  fig11ExampleGivenSpec,
);

/* -------------------------------------------------------------------------- */
/*  5. Page 41 — the printed solution (AF = 4, EF = 10/3)                      */
/* -------------------------------------------------------------------------- */

export const fig11ExampleSolvedSpec: FigureSpec = {
  viewBox: { x: -2.8, y: -3.0, w: 12.0, h: 10.4 },
  polygons: [
    {
      points: [L11_EXAMPLE_SCENE.A, L11_EXAMPLE_SCENE.E, L11_EXAMPLE_SCENE.F],
      tone: 'given',
      fill: true,
    },
    { points: [L11_EXAMPLE_SCENE.A, L11_EXAMPLE_SCENE.B, L11_EXAMPLE_SCENE.C], tone: 'ink' },
  ],
  segments: [
    segment(L11_EXAMPLE_SCENE.dLeft, L11_EXAMPLE_SCENE.E, { tone: 'aux', dashed: true }),
    segment(L11_EXAMPLE_SCENE.E, L11_EXAMPLE_SCENE.F, { tone: 'given' }),
    segment(L11_EXAMPLE_SCENE.F, L11_EXAMPLE_SCENE.dRight, { tone: 'aux', dashed: true }),
    ...parallelChevron(L11_EXAMPLE_SCENE.E, L11_EXAMPLE_SCENE.F, 'given'),
    ...parallelChevron(L11_EXAMPLE_SCENE.B, L11_EXAMPLE_SCENE.C, 'ink'),
  ],
  texts: [
    sideValue(L11_EXAMPLE_SCENE.A, L11_EXAMPLE_SCENE.E, '2', [-0.92, 0.4]),
    sideValue(L11_EXAMPLE_SCENE.E, L11_EXAMPLE_SCENE.B, '3', [-0.92, 0.4]),
    sideValue(L11_EXAMPLE_SCENE.A, L11_EXAMPLE_SCENE.C, '6', [0.92, 0.4]),
    sideValue(L11_EXAMPLE_SCENE.B, L11_EXAMPLE_SCENE.C, '5', [0.1, -1]),
    sideValue(L11_EXAMPLE_SCENE.A, L11_EXAMPLE_SCENE.F, '4', [0.86, 0.5], 'image'),
    sideValue(L11_EXAMPLE_SCENE.E, L11_EXAMPLE_SCENE.F, '10/3', [-0.2, 1], 'image'),
  ],
  points: [
    point(L11_EXAMPLE_SCENE.A, 'A', 'n'),
    point(L11_EXAMPLE_SCENE.B, 'B', 'sw'),
    point(L11_EXAMPLE_SCENE.C, 'C', 'se'),
    point(L11_EXAMPLE_SCENE.E, 'E', 'nw', 'given'),
    point(L11_EXAMPLE_SCENE.F, 'F', 'ne', 'given'),
  ],
};

export const fig11ExampleSolved: ContentBlock = constructedBlock(
  {
    id: 'fig-l11-example-solved',
    alt: 'شكل حل المثال: المثلث الصغير $AEF$ مظلَّل داخل $ABC$ مع النتيجتين $AF = 4$ و$EF = \\frac{10}{3}$',
    caption: `صفحة ٤١ — ${CAPTION_SCHEMATIC} بعد تطبيق مبرهنة النسب المتساوية: $AF = 4$ و$EF = \\frac{10}{3} \\approx 3.33$، والنسبة المشتركة $\\frac{2}{3}$ هي نفسها في النسب الثلاث.`,
    source: S41_SOLUTION,
  },
  fig11ExampleSolvedSpec,
);

/* -------------------------------------------------------------------------- */
/*  6. Page 41 — تحقّق من فهمك: two panels                                     */
/* -------------------------------------------------------------------------- */

const checkLeft = (p: XY): XY => p;
const checkRight = (p: XY): XY => shift(p, 9.9, 0);

export const fig11CheckCasesSpec: FigureSpec = {
  viewBox: { x: -1.4, y: -1.4, w: 20.2, h: 9.6 },
  frames: [
    { x: 9.7, y: -1.2, w: 8.9, h: 9.2, label: '②' },
    { x: -1.2, y: -1.2, w: 8.9, h: 9.2, label: '①' },
  ],
  segments: [
    // ① triangle ABC with D ∈ [AB], E ∈ [AC], (DE) ∥ (BC).
    segment(checkLeft(L11_CHECK_ONE.A), checkLeft(L11_CHECK_ONE.B), { tone: 'ink' }),
    segment(checkLeft(L11_CHECK_ONE.B), checkLeft(L11_CHECK_ONE.C), { tone: 'ink' }),
    segment(checkLeft(L11_CHECK_ONE.C), checkLeft(L11_CHECK_ONE.A), { tone: 'ink' }),
    ...parallelChevron(checkLeft(L11_CHECK_ONE.D), checkLeft(L11_CHECK_ONE.E), 'given'),
    ...parallelChevron(checkLeft(L11_CHECK_ONE.B), checkLeft(L11_CHECK_ONE.C), 'ink'),
    // ② triangle FGH with I ∈ [FG], J ∈ [FH], (IJ) ∥ (GH).
    segment(checkRight(L11_CHECK_TWO.F), checkRight(L11_CHECK_TWO.G), { tone: 'ink' }),
    segment(checkRight(L11_CHECK_TWO.G), checkRight(L11_CHECK_TWO.H), { tone: 'ink' }),
    segment(checkRight(L11_CHECK_TWO.H), checkRight(L11_CHECK_TWO.F), { tone: 'ink' }),
    ...parallelChevron(checkRight(L11_CHECK_TWO.I), checkRight(L11_CHECK_TWO.J), 'given'),
    ...parallelChevron(checkRight(L11_CHECK_TWO.G), checkRight(L11_CHECK_TWO.H), 'ink'),
  ],
  points: [
    point(checkLeft(L11_CHECK_ONE.A), 'A', 'n'),
    point(checkLeft(L11_CHECK_ONE.B), 'B', 'sw'),
    point(checkLeft(L11_CHECK_ONE.C), 'C', 'se'),
    point(checkLeft(L11_CHECK_ONE.D), 'D', 'nw', 'given'),
    point(checkLeft(L11_CHECK_ONE.E), 'E', 'ne', 'given'),
    point(checkRight(L11_CHECK_TWO.F), 'F', 'sw'),
    point(checkRight(L11_CHECK_TWO.G), 'G', 'se'),
    point(checkRight(L11_CHECK_TWO.H), 'H', 'n'),
    point(checkRight(L11_CHECK_TWO.I), 'I', 's', 'given'),
    point(checkRight(L11_CHECK_TWO.J), 'J', 'ne', 'given'),
  ],
};

export const fig11CheckCases: ContentBlock = constructedBlock(
  {
    id: 'fig-l11-check-cases',
    alt: 'الحالتان ① و② من فقرة «تحقّق من فهمك»: في ① المثلث $ABC$ وفيه $D$ على $[AB]$ و$E$ على $[AC]$ و$(DE) \\parallel (BC)$، وفي ② المثلث $FGH$ وفيه $I$ على $[FG]$ و$J$ على $[FH]$ و$(IJ) \\parallel (GH)$',
    caption: `صفحة ٤١ — ${CAPTION_SCHEMATIC} المعطيات المطبوعة فقط: الانتماء إلى الضلعين والتوازي. لا يُكتب أي تساوٍ للنسب لأن المطلوب من التلميذ كتابته.`,
    source: S41_CHECK,
  },
  fig11CheckCasesSpec,
);

/* -------------------------------------------------------------------------- */
/*  7. Page 41 — تدرّب ①: three numbered cases with printed values only        */
/* -------------------------------------------------------------------------- */

/** Uniform fit: printed units are far too large for a 9-unit panel. */
const fit =
  (scale: number, dx: number, dy: number) =>
  (p: XY): XY => [p[0] * scale + dx, p[1] * scale + dy];

const PRACTICE_ONE_SCALE = 0.46;
const prac1 = fit(PRACTICE_ONE_SCALE, 18.6, 1.1);
const prac2 = fit(PRACTICE_ONE_SCALE, 9.3, 1.1);
const prac3 = fit(PRACTICE_ONE_SCALE, 0, 1.1);

const practiceTriangle = (
  f: (p: XY) => XY,
  scene: { A: XY; B: XY; C: XY; P: XY; Q: XY },
): NonNullable<FigureSpec['segments']> => [
  segment(f(scene.A), f(scene.B), { tone: 'ink' }),
  segment(f(scene.B), f(scene.C), { tone: 'ink' }),
  segment(f(scene.C), f(scene.A), { tone: 'ink' }),
  ...parallelChevron(f(scene.P), f(scene.Q), 'given'),
  ...parallelChevron(f(scene.B), f(scene.C), 'given'),
];

export const fig11PracticeOneCasesSpec: FigureSpec = {
  viewBox: { x: -1.6, y: -1.4, w: 28.6, h: 7.0 },
  frames: [
    { x: 18.2, y: -1.1, w: 9.6, h: 6.4, label: '①' },
    { x: 8.9, y: -1.1, w: 9.6, h: 6.4, label: '②' },
    { x: -0.4, y: -1.1, w: 9.6, h: 6.4, label: '③' },
  ],
  segments: [
    ...practiceTriangle(prac1, L11_PRACTICE_ONE_CASE_1),
    ...practiceTriangle(prac2, L11_PRACTICE_ONE_CASE_2),
    ...practiceTriangle(prac3, L11_PRACTICE_ONE_CASE_3),
  ],
  texts: [
    // ① 5 (upper part of [AB]), x (lower part), 8 (parallel), 15 (base).
    sideValue(
      prac1(L11_PRACTICE_ONE_CASE_1.A),
      prac1(L11_PRACTICE_ONE_CASE_1.P),
      '5',
      [-0.86, 0.5],
    ),
    sideValue(
      prac1(L11_PRACTICE_ONE_CASE_1.P),
      prac1(L11_PRACTICE_ONE_CASE_1.B),
      'x',
      [-0.86, 0.5],
    ),
    sideValue(prac1(L11_PRACTICE_ONE_CASE_1.P), prac1(L11_PRACTICE_ONE_CASE_1.Q), '8', [0, 1]),
    sideValue(prac1(L11_PRACTICE_ONE_CASE_1.B), prac1(L11_PRACTICE_ONE_CASE_1.C), '15', [0, -1]),
    // ② 8 (upper part of [AC]), 15 (whole [AC], dashed bracket), 5 (parallel), x (base).
    sideValue(prac2(L11_PRACTICE_ONE_CASE_2.A), prac2(L11_PRACTICE_ONE_CASE_2.Q), '8', [0.9, 0.45]),
    sideValue(
      prac2(L11_PRACTICE_ONE_CASE_2.Q),
      prac2(L11_PRACTICE_ONE_CASE_2.C),
      '15',
      [0.9, 0.45],
    ),
    sideValue(prac2(L11_PRACTICE_ONE_CASE_2.P), prac2(L11_PRACTICE_ONE_CASE_2.Q), '5', [0, 1]),
    sideValue(prac2(L11_PRACTICE_ONE_CASE_2.B), prac2(L11_PRACTICE_ONE_CASE_2.C), 'x', [0, -1]),
    // ③ 5 (upper part of [AC]), x (whole [AC]), 8 (parallel), 15 (base).
    sideValue(prac3(L11_PRACTICE_ONE_CASE_3.A), prac3(L11_PRACTICE_ONE_CASE_3.Q), '5', [0.9, 0.45]),
    sideValue(prac3(L11_PRACTICE_ONE_CASE_3.Q), prac3(L11_PRACTICE_ONE_CASE_3.C), 'x', [0.9, 0.45]),
    sideValue(prac3(L11_PRACTICE_ONE_CASE_3.P), prac3(L11_PRACTICE_ONE_CASE_3.Q), '8', [0, 1]),
    sideValue(prac3(L11_PRACTICE_ONE_CASE_3.B), prac3(L11_PRACTICE_ONE_CASE_3.C), '15', [0, -1]),
  ],
};

export const fig11PracticeOneCases: ContentBlock = constructedBlock(
  {
    id: 'fig-l11-practice-one-cases',
    alt: 'الحالات الثلاث ① و② و③ من «تدرّب ①»: في كل حالة مثلث وقطعة داخلية موازية للقاعدة، والقيم المطبوعة ٥ و٨ و١٥ والمجهول $x$ موزّعة كما في الكتاب',
    caption: `صفحة ٤١ — ${CAPTION_SCHEMATIC} القيم المطبوعة فقط: $5$ و$x$ و$8$ و$15$ في الحالة ①، و$8$ و$15$ و$5$ و$x$ في الحالة ②، و$5$ و$x$ و$8$ و$15$ في الحالة ③. المستقيمان الأحمران (القطعة الداخلية والقاعدة) متوازيان في الحالات الثلاث.`,
    source: S41_PRACTICE_1,
  },
  fig11PracticeOneCasesSpec,
);

/* -------------------------------------------------------------------------- */
/*  8. Page 41 — تدرّب ②: three triangles marked by printed arrow pairs        */
/* -------------------------------------------------------------------------- */

const p2a = (p: XY): XY => p;
const p2b = (p: XY): XY => shift(p, 9.2, 0);
const p2c = (p: XY): XY => shift(p, 18.4, 0);

const smallTriangle = (
  f: (p: XY) => XY,
  apex: XY,
  left: XY,
  right: XY,
  innerLeft: XY,
  innerRight: XY,
  apexPlace: LabelPlace,
  leftPlace: LabelPlace,
  rightPlace: LabelPlace,
  innerLeftPlace: LabelPlace,
  innerRightPlace: LabelPlace,
  names: [string, string, string, string, string],
): {
  segments: NonNullable<FigureSpec['segments']>;
  points: NonNullable<FigureSpec['points']>;
} => ({
  segments: [
    segment(f(apex), f(left), { tone: 'ink' }),
    segment(f(left), f(right), { tone: 'ink' }),
    segment(f(right), f(apex), { tone: 'ink' }),
    ...parallelChevron(f(innerLeft), f(innerRight), 'given'),
    ...parallelChevron(f(left), f(right), 'ink'),
  ],
  points: [
    point(f(apex), names[0], apexPlace),
    point(f(left), names[1], leftPlace),
    point(f(right), names[2], rightPlace),
    point(f(innerLeft), names[3], innerLeftPlace, 'given'),
    point(f(innerRight), names[4], innerRightPlace, 'given'),
  ],
});

const practiceTwoOne = smallTriangle(
  p2a,
  L11_PRACTICE_TWO_ONE.A,
  L11_PRACTICE_TWO_ONE.B,
  L11_PRACTICE_TWO_ONE.C,
  L11_PRACTICE_TWO_ONE.I,
  L11_PRACTICE_TWO_ONE.J,
  'n',
  'sw',
  'se',
  'w',
  'e',
  ['A', 'B', 'C', 'I', 'J'],
);

const practiceTwoTwo = smallTriangle(
  p2b,
  L11_PRACTICE_TWO_TWO.E,
  L11_PRACTICE_TWO_TWO.F,
  L11_PRACTICE_TWO_TWO.G,
  L11_PRACTICE_TWO_TWO.H,
  L11_PRACTICE_TWO_TWO.K,
  'nw',
  's',
  'ne',
  'w',
  'e',
  ['E', 'F', 'G', 'H', 'K'],
);

const practiceTwoThree = smallTriangle(
  p2c,
  L11_PRACTICE_TWO_THREE.O,
  L11_PRACTICE_TWO_THREE.M,
  L11_PRACTICE_TWO_THREE.N,
  L11_PRACTICE_TWO_THREE.Q,
  L11_PRACTICE_TWO_THREE.P,
  'w',
  'ne',
  's',
  'n',
  'n',
  ['O', 'M', 'N', 'Q', 'P'],
);

export const fig11PracticeTwoCasesSpec: FigureSpec = {
  viewBox: { x: -1.4, y: -1.4, w: 29.4, h: 9.6 },
  frames: [
    { x: 18.2, y: -1.0, w: 9.4, h: 8.8, label: '①' },
    { x: 9.0, y: -1.0, w: 9.4, h: 8.8, label: '②' },
    { x: -0.2, y: -1.0, w: 9.4, h: 8.8, label: '③' },
  ],
  segments: [...practiceTwoOne.segments, ...practiceTwoTwo.segments, ...practiceTwoThree.segments],
  points: [...practiceTwoOne.points, ...practiceTwoTwo.points, ...practiceTwoThree.points],
};

export const fig11PracticeTwoCases: ContentBlock = constructedBlock(
  {
    id: 'fig-l11-practice-two-cases',
    alt: 'الأشكال الثلاثة من «تدرّب ②»: ① المثلث $ABC$ وفيه $I$ على $[AB]$ و$J$ على $[AC]$ و$(IJ) \\parallel (BC)$، ② المثلث $EFG$ وفيه $H$ على $[EF]$ و$K$ على $[EG]$ و$(HK) \\parallel (FG)$، ③ المثلث $OMN$ وفيه $Q$ على $[OM]$ و$P$ على $[ON]$ و$(QP) \\parallel (MN)$',
    caption: `صفحة ٤١ — ${CAPTION_SCHEMATIC} الأشكال الثلاثة لا تحمل نصاً مطبوعاً: يقتصر المطبوع على أسماء الرؤوس وأسهم التوازي، وقد نقلت المنصّة هذه الأسهم كمعلَمة التوازي على القطعة الداخلية وعلى القاعدة في كل مثلث.`,
    source: S41_PRACTICE_2,
  },
  fig11PracticeTwoCasesSpec,
);

/* -------------------------------------------------------------------------- */
/*  9. Interactive «مختبر النسب الثلاث» diagram                                */
/* -------------------------------------------------------------------------- */

export const threeRatiosLabDiagram: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'authored',
  id: 'auth-11-three-ratios-lab',
  renderer: 'three-ratios-lab',
  alt: 'مختبر تفاعلي يعيد إنشاء نشاط الصفحة ٣٩ عند أي نسبة $k$: يتحرّك $M$ على $[AB]$ و$N$ على $[AC]$ مع $(MN) \\parallel (BC)$، وترسم المنصّة النقاط المساعدة $I$ و$J$ و$P$ و$R$ و$S$ لتُظهر أيّ حالات المنتصف تصحّ فقط عند $k = \\frac{2}{3}$',
  caption:
    'مختبر تفاعلي من إعداد المنصّة — حرّك النسبة $k$ وراقب النقاط المساعدة: $J$ منتصف $[AN]$ دائماً، بينما لا يصبح $P$ منتصف $[BJ]$ و$N$ منتصف $[CJ]$ ولا تتساوى الأجزاء $CS$ و$SR$ و$RB$ إلا عند $k = \\frac{2}{3}$ وهي القيمة التي اختارها الكتاب.',
  source: S39_ACTIVITY,
  // Deliberately NO `initialRatio`: the lab opens at the exact printed ratio
  // 2/3, and a decimal literal such as 0.6667 would silently break the midpoint
  // conclusions, which only hold at the true 2/3.
  params: {},
};

export const ALL_L11_FIGURE_SPECS: readonly { id: string; spec: FigureSpec }[] = [
  { id: 'fig-l11-activity-panels', spec: fig11ActivityPanelsSpec },
  { id: 'fig-l11-theorem-line', spec: fig11TheoremLineSpec },
  { id: 'fig-l11-extension-hint', spec: fig11ExtensionCasesSpec },
  { id: 'fig-l11-example-given', spec: fig11ExampleGivenSpec },
  { id: 'fig-l11-example-solved', spec: fig11ExampleSolvedSpec },
  { id: 'fig-l11-check-cases', spec: fig11CheckCasesSpec },
  { id: 'fig-l11-practice-one-cases', spec: fig11PracticeOneCasesSpec },
  { id: 'fig-l11-practice-two-cases', spec: fig11PracticeTwoCasesSpec },
];
