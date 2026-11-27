import type { ConstructedDiagram, ContentBlock, InteractiveDiagram, SourceRef } from '../schema';
import type { FigureSpec, FigureTone, LabelPlace, XY } from '@/lib/geometryFigure';
import {
  L14_CASES,
  L14_CHECK,
  L14_DEFINITION,
  L14_EXAMPLE_ONE,
  L14_EXAMPLE_TWO,
  L14_PRACTICE_FOUR,
  L14_PRACTICE_ONE,
  L14_PRACTICE_TWO,
  L14_PROOF,
  type AltitudeScene,
} from './lesson-14-geometry';
import { midPoint, unitVec } from './lesson-10-geometry';

/**
 * ============================================================================
 *  UNIT 3, LESSON 2 — «ارتفاع مثلث» (pages 56–58)
 *  THE FIGURES OF THE LESSON
 * ============================================================================
 *
 *  Every figure is a `midline-figure` FigureSpec (x right, y up) drawn through
 *  the shared `FigureSvg`; every one is `origin: 'authored'` with a caption that
 *  says it is a schematic redraw, while every incidence, perpendicularity,
 *  midpoint, concurrence and printed magnitude is exact by construction
 *  (`lesson-14-geometry.test.ts` re-derives them).
 *
 *  Rules inherited from Lesson 13, enforced by this lesson's tests:
 *    • A QUESTION figure shows the givens only; H and the altitude marks appear
 *      only in SOLUTION figures, where the text has established them.
 *    • Panel numbers run RIGHT to LEFT (① on the right), as the Arabic page
 *      reads.
 *    • Every printed prompt that needs a diagram has one beside the question
 *      and beside its Teacher Area solution.
 *
 *  Source figure → figure id → usage is tabulated in
 *  `docs/UNIT-03-LESSON-02-FIGURES.md`.
 * ============================================================================
 */

export const CAPTION_SCHEMATIC =
  'رسم تعليمي من إعداد المنصّة — الشكل تخطيطي غير مقيّس، والعلاقات الهندسية المعلَّمة فيه محقَّقة بالحساب.';

const S56_ACTIVITY: SourceRef = { page: 56, locator: 'نشاط — ارتفاعات المثلث متلاقية' };
const S56_PROOF: SourceRef = { page: 56, locator: 'إثبات — تلاقي ارتفاعات المثلث' };
const S56_LEARN: SourceRef = { page: 56, locator: 'تعلّم — تعريف ارتفاع المثلث' };
const S57_SPECIAL: SourceRef = { page: 57, locator: 'خاصة وتعريف — تلاقي الارتفاعات الثلاثة' };
const S57_EXAMPLE1: SourceRef = { page: 57, locator: 'مثال 1' };
const S57_EXAMPLE2: SourceRef = { page: 57, locator: 'مثال 2' };
const S58_EXAMPLE2: SourceRef = { page: 58, locator: 'حل المثال 2' };
const S58_CHECK: SourceRef = { page: 58, locator: 'تحقّق من فهمك' };
const S58_PRACTICE: SourceRef = { page: 58, locator: 'تدرّب' };

/* -------------------------------------------------------------------------- */
/*  Builders (lesson-local, same vocabulary as Lesson 13)                      */
/* -------------------------------------------------------------------------- */

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
  options: { tone?: FigureTone; dashed?: boolean; ticks?: 1 | 2 | 3; arrow?: boolean } = {},
): NonNullable<FigureSpec['segments']>[number] => ({ from, to, ...options });

const rightAngle = (at: XY, dirA: XY, dirB: XY): NonNullable<FigureSpec['angles']>[number] => ({
  at,
  from: [at[0] + dirA[0], at[1] + dirA[1]],
  to: [at[0] + dirB[0], at[1] + dirB[1]],
  right: true,
  tone: 'mark',
});

const label = (
  at: XY,
  text: string,
  options: { tone?: FigureTone; anchor?: 'start' | 'middle' | 'end'; away?: XY } = {},
): NonNullable<FigureSpec['texts']>[number] => ({
  at,
  text,
  tone: options.tone ?? 'given',
  anchor: options.anchor ?? 'middle',
  ltr: true,
  ...(options.away ? { away: options.away } : {}),
});

const shiftXY = (p: XY, dx: number, dy: number): XY => [p[0] + dx, p[1] + dy];

const lineName = (
  line: { from: XY; to: XY },
  text: string,
  tone: FigureTone = 'given',
): NonNullable<FigureSpec['texts']>[number] => {
  const dx = line.from[0] - line.to[0];
  const dy = line.from[1] - line.to[1];
  const length = Math.hypot(dx, dy) || 1;
  return label(line.from, text, { tone, away: [(dx / length) * 0.7, (dy / length) * 0.7] });
};

type FigureBody = Omit<FigureSpec, 'viewBox'>;

function fitViewBox(spec: FigureBody, pad = 0.5): FigureSpec {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  const add = (x: number, y: number): void => {
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  };
  for (const frame of spec.frames ?? []) {
    add(frame.x, frame.y);
    add(frame.x + frame.w, frame.y + frame.h);
  }
  for (const polygon of spec.polygons ?? []) for (const p of polygon.points) add(p[0], p[1]);
  for (const item of spec.segments ?? []) {
    add(item.from[0], item.from[1]);
    add(item.to[0], item.to[1]);
  }
  for (const circle of spec.circles ?? []) {
    add(circle.at[0] - circle.r, circle.at[1] - circle.r);
    add(circle.at[0] + circle.r, circle.at[1] + circle.r);
  }
  for (const arc of spec.arcs ?? []) {
    const sweep = (((arc.to - arc.from) % 360) + 360) % 360 || 360;
    for (let index = 0; index <= 12; index += 1) {
      const angle = ((arc.from + (sweep * index) / 12) * Math.PI) / 180;
      add(arc.at[0] + arc.r * Math.cos(angle), arc.at[1] + arc.r * Math.sin(angle));
    }
  }
  for (const p of spec.points ?? []) add(p.at[0], p.at[1]);
  for (const text of spec.texts ?? []) {
    const half = 0.34 * text.text.length;
    add(text.at[0] - half, text.at[1] - 0.8);
    add(text.at[0] + half, text.at[1] + 0.9);
  }
  if (!Number.isFinite(minX) || !Number.isFinite(minY)) {
    return { ...spec, viewBox: { x: 0, y: 0, w: 1, h: 1 } };
  }
  return {
    ...spec,
    viewBox: { x: minX - pad, y: minY - pad, w: maxX - minX + 2 * pad, h: maxY - minY + 2 * pad },
  };
}

function constructedBlock(
  meta: { id: string; alt: string; caption: string; source?: SourceRef },
  rawSpec: FigureBody,
): ContentBlock {
  const spec = fitViewBox(rawSpec, rawSpec.frames ? 0.55 : 0.45);
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

/** The three sides of a triangle as ink segments. */
const triangleSides = (t: { A: XY; B: XY; C: XY }, dx = 0): NonNullable<FigureSpec['segments']> => [
  segment(shiftXY(t.A, dx, 0), shiftXY(t.B, dx, 0)),
  segment(shiftXY(t.B, dx, 0), shiftXY(t.C, dx, 0)),
  segment(shiftXY(t.C, dx, 0), shiftXY(t.A, dx, 0)),
];

const trianglePoints = (t: { A: XY; B: XY; C: XY }, dx = 0): NonNullable<FigureSpec['points']> => [
  point(shiftXY(t.A, dx, 0), 'A', 'n'),
  point(shiftXY(t.B, dx, 0), 'B', 'sw'),
  point(shiftXY(t.C, dx, 0), 'C', 'se'),
];

/** Altitudes + feet right-angle marks + H for an altitude scene (solution). */
function altitudeSolutionParts(
  scene: AltitudeScene,
  dx = 0,
): {
  segments: NonNullable<FigureSpec['segments']>;
  angles: NonNullable<FigureSpec['angles']>;
  points: NonNullable<FigureSpec['points']>;
} {
  const verts = [scene.A, scene.B, scene.C];
  const sides: [XY, XY][] = [
    [scene.B, scene.C],
    [scene.A, scene.C],
    [scene.A, scene.B],
  ];
  const feet = [scene.feet.A, scene.feet.B, scene.feet.C];
  const segments = scene.spans.map((s) =>
    segment(shiftXY(s.from, dx, 0), shiftXY(s.to, dx, 0), { tone: 'given' }),
  );
  const angles = feet.map((f, i) =>
    rightAngle(shiftXY(f, dx, 0), unitVec(sides[i]![0], sides[i]![1]), unitVec(verts[i]!, f)),
  );
  return {
    segments,
    angles,
    points: [point(shiftXY(scene.H, dx, 0), 'H', 'ne', 'image')],
  };
}

/* -------------------------------------------------------------------------- */
/*  1. Page 56 — activity: the three cases (givens only)                       */
/* -------------------------------------------------------------------------- */

const CASE_DX = [17.0, 8.5, 0];
const CASE_FRAMES = [
  { x: 16.4, y: -0.6, w: 8.0, h: 7.0, label: '①' },
  { x: 7.9, y: -0.6, w: 8.0, h: 7.0, label: '②' },
  { x: -0.6, y: -0.6, w: 8.0, h: 7.0, label: '③' },
];

export const fig14ActivityGiven: ContentBlock = constructedBlock(
  {
    id: 'fig-l14-activity-given',
    alt: 'ثلاث لوحات ① و② و③: مثلث حاد الزوايا، ومثلث فيه زاوية منفرجة، ومثلث فيه زاوية قائمة؛ المطلوب رسم ارتفاعات كلٍّ منها',
    caption: `صفحة ٥٦ — ${CAPTION_SCHEMATIC} الحالات الثلاث للنشاط: ① حاد الزوايا (يمينًا)، ② فيه زاوية منفرجة، ③ فيه زاوية قائمة. ارسم ارتفاعات كل مثلث ولاحظ تلاقيها.`,
    source: S56_ACTIVITY,
  },
  {
    frames: CASE_FRAMES,
    segments: L14_CASES.flatMap((c, i) => triangleSides(c, CASE_DX[i]!)),
    points: L14_CASES.flatMap((c, i) => trianglePoints(c, CASE_DX[i]!)),
  },
);

/* -------------------------------------------------------------------------- */
/*  2. Page 56 — proof: the anticomplementary triangle MNP                     */
/* -------------------------------------------------------------------------- */

export const fig14ProofGiven: ContentBlock = constructedBlock(
  {
    id: 'fig-l14-proof-given',
    alt: 'المثلث $ABC$ وثلاثة مستقيمات مارّة برؤوسه كلٌّ يوازي الضلع المقابل، تتلاقى في $M$ و$N$ و$P$؛ على المستقيم العلوي الترتيب $M$ ثم $A$ ثم $P$',
    caption: `صفحة ٥٦ — ${CAPTION_SCHEMATIC} شكل الإثبات: المستقيم المارّ بـ $A$ يوازي $[BC]$، والمارّ بـ $B$ يوازي $[AC]$، والمارّ بـ $C$ يوازي $[AB]$؛ تتلاقى في $M$ و$N$ و$P$.`,
    source: S56_PROOF,
  },
  {
    polygons: [{ points: [L14_PROOF.A, L14_PROOF.B, L14_PROOF.C], tone: 'ink', fill: true }],
    segments: [
      ...triangleSides(L14_PROOF),
      ...L14_PROOF.sides.map((s) => segment(s.from, s.to, { tone: 'aux', dashed: true })),
    ],
    points: [
      ...trianglePoints(L14_PROOF),
      point(L14_PROOF.M, 'M', 'nw', 'aux'),
      point(L14_PROOF.N, 'N', 's', 'aux'),
      point(L14_PROOF.P, 'P', 'ne', 'aux'),
    ],
  },
);

export const fig14ProofBisectors: ContentBlock = constructedBlock(
  {
    id: 'fig-l14-proof-bisectors',
    alt: 'محاور أضلاع المثلث $MNP$ هي ارتفاعات المثلث $ABC$، تتلاقى في $H$؛ و$A$ و$B$ و$C$ منتصفات أضلاع $MNP$',
    caption: `صفحة ٥٦ — ${CAPTION_SCHEMATIC} حل الإثبات: $A$ منتصف $[MP]$ و$B$ منتصف $[MN]$ و$C$ منتصف $[NP]$؛ فمحاور أضلاع $MNP$ تمرّ برؤوس $ABC$ وعمودية على أضلاعه المقابلة، أي إنّها ارتفاعاته، وتتلاقى في $H$.`,
    source: S56_PROOF,
  },
  {
    polygons: [{ points: [L14_PROOF.A, L14_PROOF.B, L14_PROOF.C], tone: 'ink', fill: true }],
    segments: [
      ...triangleSides(L14_PROOF),
      ...L14_PROOF.sides.map((s) => segment(s.from, s.to, { tone: 'aux', dashed: true })),
      // midpoint ticks on the three sides of MNP
      segment(L14_PROOF.M, L14_PROOF.A, { ticks: 1 }),
      segment(L14_PROOF.A, L14_PROOF.P, { ticks: 1 }),
      segment(L14_PROOF.M, L14_PROOF.B, { ticks: 2 }),
      segment(L14_PROOF.B, L14_PROOF.N, { ticks: 2 }),
      segment(L14_PROOF.N, L14_PROOF.C, { ticks: 3 }),
      segment(L14_PROOF.C, L14_PROOF.P, { ticks: 3 }),
      ...L14_PROOF.bisectors.map((s) => segment(s.from, s.to, { tone: 'given' })),
    ],
    points: [
      ...trianglePoints(L14_PROOF),
      point(L14_PROOF.M, 'M', 'nw', 'aux'),
      point(L14_PROOF.N, 'N', 's', 'aux'),
      point(L14_PROOF.P, 'P', 'ne', 'aux'),
      point(L14_PROOF.H, 'H', 'e', 'image'),
    ],
  },
);

/* -------------------------------------------------------------------------- */
/*  3. Page 56 — definition figure                                             */
/* -------------------------------------------------------------------------- */

export const fig14Definition: ContentBlock = constructedBlock(
  {
    id: 'fig-l14-definition',
    alt: 'المثلث $ABC$ والمستقيم $(d)$ المارّ بـ $A$ والعمودي على $(BC)$ في قدمه $P$، بزاوية قائمة عند $P$',
    caption: `صفحة ٥٦ — ${CAPTION_SCHEMATIC} تعريف الارتفاع: $(d)$ مارّ بالرأس $A$ وعمودي على الضلع المقابل $(BC)$؛ $P$ مسقط $A$ على $(BC)$، والقطعة $[AP]$ هي الارتفاع المرسوم من $A$.`,
    source: S56_LEARN,
  },
  {
    segments: [
      ...triangleSides(L14_DEFINITION),
      segment(L14_DEFINITION.from, L14_DEFINITION.to, { tone: 'given' }),
    ],
    angles: [
      rightAngle(
        L14_DEFINITION.foot,
        unitVec(L14_DEFINITION.B, L14_DEFINITION.C),
        unitVec(L14_DEFINITION.A, L14_DEFINITION.foot),
      ),
    ],
    points: [...trianglePoints(L14_DEFINITION), point(L14_DEFINITION.foot, 'P', 's', 'mark')],
    texts: [lineName({ from: L14_DEFINITION.from, to: L14_DEFINITION.to }, '(d)', 'given')],
  },
);

/* -------------------------------------------------------------------------- */
/*  4. Page 57 — خاصة وتعريف: the three panels with altitudes and H            */
/* -------------------------------------------------------------------------- */

export const fig14SpecialCases: ContentBlock = constructedBlock(
  {
    id: 'fig-l14-special-cases',
    alt: 'ثلاث لوحات: في الحاد $H$ داخل المثلث، وفي المنفرج في $\\widehat{A}$ يقع $H$ خارجه، وفي القائم في $\\widehat{A}$ يقع $H$ عند الرأس $A$؛ الارتفاعات الثلاثة حمراء وزوايا قائمة عند الأقدام',
    caption: `صفحة ٥٧ — ${CAPTION_SCHEMATIC} الارتفاعات الثلاثة تتلاقى في $H$: ① الحاد (يمينًا) $H$ داخله، ② المنفرج في $\\widehat{A}$ $H$ خارجه، ③ القائم في $\\widehat{A}$ $H$ عند $A$.`,
    source: S57_SPECIAL,
  },
  {
    frames: CASE_FRAMES,
    segments: L14_CASES.flatMap((c, i) => [
      ...triangleSides(c, CASE_DX[i]!),
      ...altitudeSolutionParts(c, CASE_DX[i]!).segments,
    ]),
    angles: L14_CASES.flatMap((c, i) => altitudeSolutionParts(c, CASE_DX[i]!).angles),
    points: L14_CASES.flatMap((c, i) => [
      ...trianglePoints(c, CASE_DX[i]!),
      ...altitudeSolutionParts(c, CASE_DX[i]!).points,
    ]),
  },
);

/* -------------------------------------------------------------------------- */
/*  5. Page 57 — example 1                                                     */
/* -------------------------------------------------------------------------- */

export const fig14ExampleOneGiven: ContentBlock = constructedBlock(
  {
    id: 'fig-l14-example-one-given',
    alt: 'مثلث $ABC$ زاويته $\\widehat{A}$ منفرجة، $B$ أعلى اليسار و$C$ أعلى اليمين و$A$ في الأسفل',
    caption: `صفحة ٥٧ — ${CAPTION_SCHEMATIC} معطى المثال 1: مثلث منفرج في $\\widehat{A}$ كما في الكتاب ($B$ و$C$ في الأعلى و$A$ في الأسفل). المطلوب رسم نقطة تلاقي ارتفاعاته.`,
    source: S57_EXAMPLE1,
  },
  {
    segments: triangleSides(L14_EXAMPLE_ONE),
    points: [
      point(L14_EXAMPLE_ONE.A, 'A', 's'),
      point(L14_EXAMPLE_ONE.B, 'B', 'nw'),
      point(L14_EXAMPLE_ONE.C, 'C', 'ne'),
    ],
  },
);

export const fig14ExampleOneSolution: ContentBlock = constructedBlock(
  {
    id: 'fig-l14-example-one-solution',
    alt: 'حل المثال 1: الارتفاع من $A$ عمودي على $(BC)$، والارتفاع من $B$ عمودي على $(CA)$ الممدّد بعد $A$ (متقطّع)، يتقاطعان في $H$ خارج المثلث تحت $A$',
    caption: `صفحة ٥٧ — ${CAPTION_SCHEMATIC} الحل المطبوع: نرسم ارتفاعي $A$ و$B$؛ ولرسم ارتفاع $B$ نمدّد $[CA)$ بعد $A$. يتقاطعان في $H$ الواقعة خارج المثلث.`,
    source: S57_EXAMPLE1,
  },
  {
    segments: [
      ...triangleSides(L14_EXAMPLE_ONE),
      segment(L14_EXAMPLE_ONE.extension.from, L14_EXAMPLE_ONE.extension.to, {
        tone: 'aux',
        dashed: true,
      }),
      segment(L14_EXAMPLE_ONE.spans[0]!.from, L14_EXAMPLE_ONE.spans[0]!.to, { tone: 'given' }),
      segment(L14_EXAMPLE_ONE.spans[1]!.from, L14_EXAMPLE_ONE.spans[1]!.to, { tone: 'given' }),
    ],
    angles: [
      rightAngle(
        L14_EXAMPLE_ONE.feet.A,
        unitVec(L14_EXAMPLE_ONE.B, L14_EXAMPLE_ONE.C),
        unitVec(L14_EXAMPLE_ONE.A, L14_EXAMPLE_ONE.feet.A),
      ),
      rightAngle(
        L14_EXAMPLE_ONE.footB,
        unitVec(L14_EXAMPLE_ONE.C, L14_EXAMPLE_ONE.A),
        unitVec(L14_EXAMPLE_ONE.B, L14_EXAMPLE_ONE.footB),
      ),
    ],
    points: [
      point(L14_EXAMPLE_ONE.A, 'A', 's'),
      point(L14_EXAMPLE_ONE.B, 'B', 'nw'),
      point(L14_EXAMPLE_ONE.C, 'C', 'ne'),
      point(L14_EXAMPLE_ONE.H, 'H', 's', 'image'),
    ],
  },
);

/* -------------------------------------------------------------------------- */
/*  6. Pages 57–58 — example 2                                                 */
/* -------------------------------------------------------------------------- */

export const fig14ExampleTwoGiven: ContentBlock = constructedBlock(
  {
    id: 'fig-l14-example-two-given',
    alt: 'المثلث $ABC$ وارتفاعاه $[AL]$ و$[CK]$ يتقاطعان في $H$، $L$ على $[BC]$ و$K$ على $[AB]$، بزاويتين قائمتين عند $L$ و$K$',
    caption: `صفحة ٥٧ — ${CAPTION_SCHEMATIC} معطى المثال 2: $[AL]$ و$[CK]$ ارتفاعان يتقاطعان في $H$ نقطة تلاقي ارتفاعات $ABC$. المطلوب نقطة تلاقي ارتفاعات المثلث $AHC$.`,
    source: S57_EXAMPLE2,
  },
  {
    segments: [
      ...triangleSides(L14_EXAMPLE_TWO),
      segment(L14_EXAMPLE_TWO.AL.from, L14_EXAMPLE_TWO.AL.to, { tone: 'given' }),
      segment(L14_EXAMPLE_TWO.CK.from, L14_EXAMPLE_TWO.CK.to, { tone: 'given' }),
    ],
    angles: [
      rightAngle(
        L14_EXAMPLE_TWO.L,
        unitVec(L14_EXAMPLE_TWO.B, L14_EXAMPLE_TWO.C),
        unitVec(L14_EXAMPLE_TWO.A, L14_EXAMPLE_TWO.L),
      ),
      rightAngle(
        L14_EXAMPLE_TWO.K,
        unitVec(L14_EXAMPLE_TWO.A, L14_EXAMPLE_TWO.B),
        unitVec(L14_EXAMPLE_TWO.C, L14_EXAMPLE_TWO.K),
      ),
    ],
    points: [
      ...trianglePoints(L14_EXAMPLE_TWO),
      point(L14_EXAMPLE_TWO.L, 'L', 's', 'mark'),
      point(L14_EXAMPLE_TWO.K, 'K', 'nw', 'mark'),
      point(L14_EXAMPLE_TWO.H, 'H', 'e', 'image'),
    ],
  },
);

export const fig14ExampleTwoSolution: ContentBlock = constructedBlock(
  {
    id: 'fig-l14-example-two-solution',
    alt: 'حل المثال 2: في المثلث $AHC$ يكون $[AB]$ عموديًا على $(CH)$ و$[CB]$ عموديًا على $(AH)$، فيتقاطعان في $B$؛ إذن $B$ نقطة تلاقي ارتفاعات $AHC$',
    caption: `صفحة ٥٨ — ${CAPTION_SCHEMATIC} الحل المطبوع: $(CH)\\perp(AB)$ فـ $[AB]$ ارتفاع من $A$ في $AHC$، و$(AH)\\perp(CB)$ فـ $[CB]$ ارتفاع من $C$؛ يتقاطعان في $B$، فهو نقطة تلاقي ارتفاعات $AHC$.`,
    source: S58_EXAMPLE2,
  },
  {
    segments: [
      ...triangleSides(L14_EXAMPLE_TWO),
      segment(L14_EXAMPLE_TWO.AL.from, L14_EXAMPLE_TWO.AL.to, { tone: 'aux', dashed: true }),
      segment(L14_EXAMPLE_TWO.CK.from, L14_EXAMPLE_TWO.CK.to, { tone: 'aux', dashed: true }),
      segment(L14_EXAMPLE_TWO.A, L14_EXAMPLE_TWO.B, { tone: 'given' }),
      segment(L14_EXAMPLE_TWO.C, L14_EXAMPLE_TWO.B, { tone: 'given' }),
    ],
    angles: [
      rightAngle(
        L14_EXAMPLE_TWO.K,
        unitVec(L14_EXAMPLE_TWO.A, L14_EXAMPLE_TWO.B),
        unitVec(L14_EXAMPLE_TWO.C, L14_EXAMPLE_TWO.K),
      ),
      rightAngle(
        L14_EXAMPLE_TWO.L,
        unitVec(L14_EXAMPLE_TWO.B, L14_EXAMPLE_TWO.C),
        unitVec(L14_EXAMPLE_TWO.A, L14_EXAMPLE_TWO.L),
      ),
    ],
    points: [
      ...trianglePoints(L14_EXAMPLE_TWO),
      point(L14_EXAMPLE_TWO.H, 'H', 'e', 'image'),
      point(L14_EXAMPLE_TWO.L, 'L', 's', 'mark'),
      point(L14_EXAMPLE_TWO.K, 'K', 'nw', 'mark'),
    ],
    texts: [label(L14_EXAMPLE_TWO.B, 'B = مركز تعامد AHC', { tone: 'image', away: [-0.2, -0.9] })],
  },
);

/* -------------------------------------------------------------------------- */
/*  7. Page 58 — check                                                         */
/* -------------------------------------------------------------------------- */

export const fig14CheckGiven: ContentBlock = constructedBlock(
  {
    id: 'fig-l14-check-given',
    alt: 'المثلث $ABC$ فيه $\\widehat{B} = 120^\\circ$ و$BA = 5$ سم و$BC = 4$ سم',
    caption: `صفحة ٥٨ — ${CAPTION_SCHEMATIC} معطى «تحقّق من فهمك»: $\\widehat{B} = 120^\\circ$، $BA = 5\\ \\text{cm}$، $BC = 4\\ \\text{cm}$. المثلث منفرج في $B$.`,
    source: S58_CHECK,
  },
  {
    segments: triangleSides(L14_CHECK),
    points: trianglePoints(L14_CHECK),
    texts: [
      label(midPoint(L14_CHECK.B, L14_CHECK.A), '5 cm', { away: [-0.7, 0.3] }),
      label(midPoint(L14_CHECK.B, L14_CHECK.C), '4 cm', { away: [0, -0.7] }),
      label(L14_CHECK.B, '120°', { away: [0.9, 0.5] }),
    ],
  },
);

export const fig14CheckSolution: ContentBlock = constructedBlock(
  {
    id: 'fig-l14-check-solution',
    alt: 'حل «تحقّق من فهمك»: ارتفاعات المثلث المنفرج في $B$ تتلاقى في $H$ خارج المثلث',
    caption: `صفحة ٥٨ — ${CAPTION_SCHEMATIC} الحل: المثلث منفرج في $B$، فنقطة تلاقي ارتفاعاته $H$ تقع خارجه؛ يكفي رسم ارتفاعين لتعيينها.`,
    source: S58_CHECK,
  },
  {
    segments: [...triangleSides(L14_CHECK), ...altitudeSolutionParts(L14_CHECK).segments],
    angles: altitudeSolutionParts(L14_CHECK).angles,
    points: [...trianglePoints(L14_CHECK), ...altitudeSolutionParts(L14_CHECK).points],
  },
);

/* -------------------------------------------------------------------------- */
/*  8. Page 58 — practice ①                                                    */
/* -------------------------------------------------------------------------- */

export const fig14PracticeOneGiven: ContentBlock = constructedBlock(
  {
    id: 'fig-l14-practice-one-given',
    alt: 'المثلث $ABC$ ونقطة تلاقي ارتفاعاته $H$ مع الارتفاعات الثلاثة',
    caption: `صفحة ٥٨ — ${CAPTION_SCHEMATIC} معطى «تدرّب ①»: مثلث $ABC$ ونقطة تلاقي ارتفاعاته $H$. المطلوب نقطة تلاقي ارتفاعات كل من $AHB$ و$AHC$ و$BHC$.`,
    source: S58_PRACTICE,
  },
  {
    segments: [
      ...triangleSides(L14_PRACTICE_ONE),
      ...altitudeSolutionParts(L14_PRACTICE_ONE).segments,
    ],
    angles: altitudeSolutionParts(L14_PRACTICE_ONE).angles,
    points: [...trianglePoints(L14_PRACTICE_ONE), point(L14_PRACTICE_ONE.H, 'H', 'e', 'image')],
  },
);

export const fig14PracticeOneSolution: ContentBlock = constructedBlock(
  {
    id: 'fig-l14-practice-one-solution',
    alt: 'حل «تدرّب ①»: نقطة تلاقي ارتفاعات $AHB$ هي $C$، و$AHC$ هي $B$، و$BHC$ هي $A$',
    caption: `صفحة ٥٨ — ${CAPTION_SCHEMATIC} الحل: الرؤوس الأربعة $A,B,C,H$ متعامدة مثنى مثنى؛ فنقطة تلاقي ارتفاعات $AHB$ هي $C$، و$AHC$ هي $B$، و$BHC$ هي $A$.`,
    source: S58_PRACTICE,
  },
  {
    segments: [
      ...triangleSides(L14_PRACTICE_ONE),
      segment(L14_PRACTICE_ONE.A, L14_PRACTICE_ONE.H, { tone: 'aux', dashed: true }),
      segment(L14_PRACTICE_ONE.B, L14_PRACTICE_ONE.H, { tone: 'aux', dashed: true }),
      segment(L14_PRACTICE_ONE.C, L14_PRACTICE_ONE.H, { tone: 'aux', dashed: true }),
    ],
    points: [...trianglePoints(L14_PRACTICE_ONE), point(L14_PRACTICE_ONE.H, 'H', 'e', 'image')],
    texts: [
      label(L14_PRACTICE_ONE.C, 'C ← AHB', { tone: 'image', away: [0.9, -0.4] }),
      label(L14_PRACTICE_ONE.B, 'B ← AHC', { tone: 'image', away: [-0.9, -0.4] }),
      label(L14_PRACTICE_ONE.A, 'A ← BHC', { tone: 'image', away: [0, 0.9] }),
    ],
  },
);

/* -------------------------------------------------------------------------- */
/*  9. Page 58 — practice ②                                                    */
/* -------------------------------------------------------------------------- */

export const fig14PracticeTwoGiven: ContentBlock = constructedBlock(
  {
    id: 'fig-l14-practice-two-given',
    alt: 'المثلث $ABC$، $E$ على $[AC]$ و$F$ على $[AB]$، الارتفاعان $[BE]$ و$[CF]$ يتقاطعان في $J$، والقطعة $[AJ]$ مرسومة',
    caption: `صفحة ٥٨ — ${CAPTION_SCHEMATIC} معطى «تدرّب ②»: $[BE]$ و$[CF]$ ارتفاعان يتقاطعان في $J$، و$[AJ]$ مرسومة. المطلوب نقطة تلاقي ارتفاعات المثلث $AJB$.`,
    source: S58_PRACTICE,
  },
  {
    segments: [
      ...triangleSides(L14_PRACTICE_TWO),
      segment(L14_PRACTICE_TWO.BE.from, L14_PRACTICE_TWO.BE.to, { tone: 'given' }),
      segment(L14_PRACTICE_TWO.CF.from, L14_PRACTICE_TWO.CF.to, { tone: 'given' }),
      segment(L14_PRACTICE_TWO.AJ.from, L14_PRACTICE_TWO.AJ.to, { tone: 'image' }),
    ],
    angles: [
      rightAngle(
        L14_PRACTICE_TWO.E,
        unitVec(L14_PRACTICE_TWO.A, L14_PRACTICE_TWO.C),
        unitVec(L14_PRACTICE_TWO.B, L14_PRACTICE_TWO.E),
      ),
      rightAngle(
        L14_PRACTICE_TWO.F,
        unitVec(L14_PRACTICE_TWO.A, L14_PRACTICE_TWO.B),
        unitVec(L14_PRACTICE_TWO.C, L14_PRACTICE_TWO.F),
      ),
    ],
    points: [
      ...trianglePoints(L14_PRACTICE_TWO),
      point(L14_PRACTICE_TWO.E, 'E', 'ne', 'mark'),
      point(L14_PRACTICE_TWO.F, 'F', 'nw', 'mark'),
      point(L14_PRACTICE_TWO.J, 'J', 'e', 'image'),
    ],
  },
);

export const fig14PracticeTwoSolution: ContentBlock = constructedBlock(
  {
    id: 'fig-l14-practice-two-solution',
    alt: 'حل «تدرّب ②»: في المثلث $AJB$ يكون $[AC]$ عموديًا على $(BJ)$ و$[BC]$ عموديًا على $(AJ)$، فيتقاطعان في $C$؛ إذن $C$ نقطة تلاقي ارتفاعات $AJB$',
    caption: `صفحة ٥٨ — ${CAPTION_SCHEMATIC} الحل: $(BJ)\\perp(AC)$ و$(AJ)\\perp(BC)$، فارتفاعا $AJB$ من $A$ و$B$ هما $[AC]$ و$[BC]$، يتقاطعان في $C$؛ فهو نقطة تلاقي ارتفاعات $AJB$.`,
    source: S58_PRACTICE,
  },
  {
    segments: [
      ...triangleSides(L14_PRACTICE_TWO),
      segment(L14_PRACTICE_TWO.BE.from, L14_PRACTICE_TWO.BE.to, { tone: 'aux', dashed: true }),
      segment(L14_PRACTICE_TWO.CF.from, L14_PRACTICE_TWO.CF.to, { tone: 'aux', dashed: true }),
      segment(L14_PRACTICE_TWO.AJ.from, L14_PRACTICE_TWO.AJ.to, { tone: 'aux', dashed: true }),
      segment(L14_PRACTICE_TWO.A, L14_PRACTICE_TWO.C, { tone: 'given' }),
      segment(L14_PRACTICE_TWO.B, L14_PRACTICE_TWO.C, { tone: 'given' }),
    ],
    points: [...trianglePoints(L14_PRACTICE_TWO), point(L14_PRACTICE_TWO.J, 'J', 'e', 'image')],
    texts: [label(L14_PRACTICE_TWO.C, 'C = مركز تعامد AJB', { tone: 'image', away: [0.9, -0.5] })],
  },
);

/* -------------------------------------------------------------------------- */
/*  10. Page 58 — practice ④                                                   */
/* -------------------------------------------------------------------------- */

export const fig14PracticeFourGiven: ContentBlock = constructedBlock(
  {
    id: 'fig-l14-practice-four-given',
    alt: 'المستطيل $ABCD$ مركزه $O$، والعمود من $O$ على $(AC)$ يلاقي $(DC)$ في $N$ و$(AD)$ في $M$',
    caption: `صفحة ٥٨ — ${CAPTION_SCHEMATIC} معطى «تدرّب ④»: المستطيل $ABCD$ مركزه $O$؛ العمود من $O$ على $(AC)$ يلاقي $(DC)$ في $N$ و$(AD)$ في $M$ (بعد $D$).`,
    source: S58_PRACTICE,
  },
  {
    polygons: [
      {
        points: [
          L14_PRACTICE_FOUR.A,
          L14_PRACTICE_FOUR.B,
          L14_PRACTICE_FOUR.C,
          L14_PRACTICE_FOUR.D,
        ],
        tone: 'ink',
      },
    ],
    segments: [
      segment(L14_PRACTICE_FOUR.A, L14_PRACTICE_FOUR.C, { tone: 'aux', dashed: true }),
      segment(L14_PRACTICE_FOUR.MN.from, L14_PRACTICE_FOUR.MN.to, { tone: 'given' }),
    ],
    angles: [
      rightAngle(
        L14_PRACTICE_FOUR.O,
        unitVec(L14_PRACTICE_FOUR.A, L14_PRACTICE_FOUR.C),
        unitVec(L14_PRACTICE_FOUR.M, L14_PRACTICE_FOUR.N),
      ),
    ],
    points: [
      point(L14_PRACTICE_FOUR.A, 'A', 'sw'),
      point(L14_PRACTICE_FOUR.B, 'B', 'se'),
      point(L14_PRACTICE_FOUR.C, 'C', 'ne'),
      point(L14_PRACTICE_FOUR.D, 'D', 'nw'),
      point(L14_PRACTICE_FOUR.O, 'O', 's', 'aux'),
      point(L14_PRACTICE_FOUR.M, 'M', 'w', 'image'),
      point(L14_PRACTICE_FOUR.N, 'N', 'n', 'image'),
    ],
  },
);

export const fig14PracticeFourSolution: ContentBlock = constructedBlock(
  {
    id: 'fig-l14-practice-four-solution',
    alt: 'حل «تدرّب ④»: في المثلث $AMC$ يكون $(MN)$ عموديًا على $(AC)$ و$(AD)$ عموديًا على $(MC)$، فيتقاطعان في $N$؛ فهو نقطة تلاقي الارتفاعات، والارتفاع الثالث من $A$ عمودي على $(MC)$ ويمرّ بـ $N$',
    caption: `صفحة ٥٨ — ${CAPTION_SCHEMATIC} الحل: $(MN)\\perp(AC)$ ارتفاع من $M$، و$(AD)\\perp(MC)$ ارتفاع من $C$ (لأنّ $ABCD$ مستطيل)؛ يتقاطعان في $N$ فهو مركز تعامد $AMC$. الارتفاع الثالث من $A$ عمودي على $(MC)$ ويمرّ بـ $N$.`,
    source: S58_PRACTICE,
  },
  {
    polygons: [
      {
        points: [
          L14_PRACTICE_FOUR.A,
          L14_PRACTICE_FOUR.B,
          L14_PRACTICE_FOUR.C,
          L14_PRACTICE_FOUR.D,
        ],
        tone: 'aux',
        dashed: true,
      },
    ],
    segments: [
      segment(L14_PRACTICE_FOUR.A, L14_PRACTICE_FOUR.M, { tone: 'ink' }),
      segment(L14_PRACTICE_FOUR.M, L14_PRACTICE_FOUR.C, { tone: 'ink' }),
      segment(L14_PRACTICE_FOUR.C, L14_PRACTICE_FOUR.A, { tone: 'ink' }),
      segment(L14_PRACTICE_FOUR.MN.from, L14_PRACTICE_FOUR.MN.to, { tone: 'given' }),
      segment(L14_PRACTICE_FOUR.third.from, L14_PRACTICE_FOUR.third.to, { tone: 'image' }),
    ],
    angles: [
      rightAngle(
        L14_PRACTICE_FOUR.O,
        unitVec(L14_PRACTICE_FOUR.A, L14_PRACTICE_FOUR.C),
        unitVec(L14_PRACTICE_FOUR.M, L14_PRACTICE_FOUR.N),
      ),
      rightAngle(
        L14_PRACTICE_FOUR.footThird,
        unitVec(L14_PRACTICE_FOUR.M, L14_PRACTICE_FOUR.C),
        unitVec(L14_PRACTICE_FOUR.A, L14_PRACTICE_FOUR.footThird),
      ),
    ],
    points: [
      point(L14_PRACTICE_FOUR.A, 'A', 'sw'),
      point(L14_PRACTICE_FOUR.M, 'M', 'w', 'image'),
      point(L14_PRACTICE_FOUR.C, 'C', 'ne'),
      point(L14_PRACTICE_FOUR.N, 'N', 'n', 'image'),
      point(L14_PRACTICE_FOUR.D, 'D', 'nw', 'aux'),
    ],
  },
);

/* -------------------------------------------------------------------------- */
/*  11. Interactive lab diagram                                                */
/* -------------------------------------------------------------------------- */

export const altitudeLabDiagram: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'authored',
  id: 'auth-14-altitude-lab',
  renderer: 'altitude-lab',
  alt: 'مختبر تفاعلي: الارتفاعات الثلاثة تتلاقى دائمًا في $H$؛ وموضع $H$ يتبع نوع المثلث: داخله في الحاد، وخارجه في المنفرج، وعند رأس الزاوية القائمة في القائم',
  caption:
    'مختبر تفاعلي من إعداد المنصّة — بدّل نوع المثلث وحرّك الرأس وراقب الارتفاعات الثلاثة: تتلاقى دائمًا في $H$. وموضع $H$ يتبع نوع المثلث: داخله في الحاد، وخارجه في المنفرج، وعند رأس القائمة في القائم.',
  source: S57_SPECIAL,
  params: {},
};

/* -------------------------------------------------------------------------- */
/*  Exported spec inventory (used by the figure test)                          */
/* -------------------------------------------------------------------------- */

export function specOf(block: ContentBlock): FigureSpec {
  if (block.type !== 'figure' || block.diagram.kind !== 'constructed') {
    throw new Error('specOf expects a constructed figure block');
  }
  return block.diagram.construction as unknown as FigureSpec;
}

export const ALL_L14_FIGURE_SPECS: readonly { id: string; spec: FigureSpec }[] = [
  { id: 'fig-l14-activity-given', spec: specOf(fig14ActivityGiven) },
  { id: 'fig-l14-proof-given', spec: specOf(fig14ProofGiven) },
  { id: 'fig-l14-proof-bisectors', spec: specOf(fig14ProofBisectors) },
  { id: 'fig-l14-definition', spec: specOf(fig14Definition) },
  { id: 'fig-l14-special-cases', spec: specOf(fig14SpecialCases) },
  { id: 'fig-l14-example-one-given', spec: specOf(fig14ExampleOneGiven) },
  { id: 'fig-l14-example-one-solution', spec: specOf(fig14ExampleOneSolution) },
  { id: 'fig-l14-example-two-given', spec: specOf(fig14ExampleTwoGiven) },
  { id: 'fig-l14-example-two-solution', spec: specOf(fig14ExampleTwoSolution) },
  { id: 'fig-l14-check-given', spec: specOf(fig14CheckGiven) },
  { id: 'fig-l14-check-solution', spec: specOf(fig14CheckSolution) },
  { id: 'fig-l14-practice-one-given', spec: specOf(fig14PracticeOneGiven) },
  { id: 'fig-l14-practice-one-solution', spec: specOf(fig14PracticeOneSolution) },
  { id: 'fig-l14-practice-two-given', spec: specOf(fig14PracticeTwoGiven) },
  { id: 'fig-l14-practice-two-solution', spec: specOf(fig14PracticeTwoSolution) },
  { id: 'fig-l14-practice-four-given', spec: specOf(fig14PracticeFourGiven) },
  { id: 'fig-l14-practice-four-solution', spec: specOf(fig14PracticeFourSolution) },
];
