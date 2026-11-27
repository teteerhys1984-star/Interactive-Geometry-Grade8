import type { ConstructedDiagram, ContentBlock, InteractiveDiagram, SourceRef } from '../schema';
import type { FigureSpec, FigureTone, LabelPlace, XY } from '@/lib/geometryFigure';
import {
  L16_CHECK,
  L16_DEFINITION,
  L16_PRACTICE_ONE,
  L16_PRACTICE_TWO,
  L16_PROPERTIES,
  L16_PROOF,
  L16_TEST_ABC,
  L16_TEST_EFJ_TRIANGLE,
  buildBisectorScene,
  type BisectorScene,
} from './lesson-16-geometry';
import { projectOnLine } from './lesson-14-geometry';
import { unitVec } from './lesson-10-geometry';

/**
 * ============================================================================
 *  UNIT 3, LESSON 4 — «منصّف زاوية مثلث» (pages 62–63)
 *  THE FIGURES OF THE LESSON
 * ============================================================================
 *  Every figure is a `midline-figure` FigureSpec, `origin: 'authored'`, with a
 *  schematic caption; every incidence, equal-half-angle, concurrence, tangency
 *  and printed angle is exact by construction (`lesson-16-geometry.test.ts`).
 *  Source figure → id → usage is tabulated in `docs/UNIT-03-LESSON-04-FIGURES.md`.
 * ============================================================================
 */

export const CAPTION_SCHEMATIC =
  'رسم تعليمي من إعداد المنصّة — الشكل تخطيطي غير مقيّس، والعلاقات الهندسية المعلَّمة فيه محقَّقة بالحساب.';

const S62_TEST: SourceRef = { page: 62, locator: 'اختبار — منصفات المثلثين' };
const S62_PROOF: SourceRef = { page: 62, locator: 'إثبات — تلاقي المنصفات' };
const S63_LEARN: SourceRef = { page: 63, locator: 'تعلّم — تعريف المنصف' };
const S63_SPECIAL: SourceRef = { page: 63, locator: 'خاصة وتعريف — الدائرة الداخلية' };
const S63_CHECK: SourceRef = { page: 63, locator: 'تحقّق من فهمك' };
const S63_PRACTICE: SourceRef = { page: 63, locator: 'تدرّب' };

/* Builders (lesson-local) */
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
const circleEl = (
  at: XY,
  r: number,
  options: { tone?: FigureTone; dashed?: boolean } = {},
): NonNullable<FigureSpec['circles']>[number] => ({ at, r, ...options });
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
const rightAngle = (at: XY, dirA: XY, dirB: XY): NonNullable<FigureSpec['angles']>[number] => ({
  at,
  from: [at[0] + dirA[0], at[1] + dirA[1]],
  to: [at[0] + dirB[0], at[1] + dirB[1]],
  right: true,
  tone: 'mark',
});
/** An angle arc at `o` between directions toward `p` and `q`, with an equality mark. */
const angleArc = (
  o: XY,
  p: XY,
  q: XY,
  radius: number,
  mark: string,
): NonNullable<FigureSpec['angles']>[number] => ({
  at: o,
  from: [o[0] + unitVec(o, p)[0] * radius, o[1] + unitVec(o, p)[1] * radius],
  to: [o[0] + unitVec(o, q)[0] * radius, o[1] + unitVec(o, q)[1] * radius],
  label: mark,
  radius,
  tone: 'mark',
});

type FigureBody = Omit<FigureSpec, 'viewBox'>;
function fitViewBox(spec: FigureBody, pad = 0.5): FigureSpec {
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  const add = (x: number, y: number): void => {
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  };
  for (const f of spec.frames ?? []) {
    add(f.x, f.y);
    add(f.x + f.w, f.y + f.h);
  }
  for (const poly of spec.polygons ?? []) for (const p of poly.points) add(p[0], p[1]);
  for (const s of spec.segments ?? []) {
    add(s.from[0], s.from[1]);
    add(s.to[0], s.to[1]);
  }
  for (const c of spec.circles ?? []) {
    add(c.at[0] - c.r, c.at[1] - c.r);
    add(c.at[0] + c.r, c.at[1] + c.r);
  }
  for (const a of spec.arcs ?? []) {
    const sweep = (((a.to - a.from) % 360) + 360) % 360 || 360;
    for (let i = 0; i <= 12; i += 1) {
      const ang = ((a.from + (sweep * i) / 12) * Math.PI) / 180;
      add(a.at[0] + a.r * Math.cos(ang), a.at[1] + a.r * Math.sin(ang));
    }
  }
  for (const p of spec.points ?? []) add(p.at[0], p.at[1]);
  for (const t of spec.texts ?? []) {
    const half = 0.34 * t.text.length;
    add(t.at[0] - half, t.at[1] - 0.8);
    add(t.at[0] + half, t.at[1] + 0.9);
  }
  if (!Number.isFinite(minX) || !Number.isFinite(minY))
    return { ...spec, viewBox: { x: 0, y: 0, w: 1, h: 1 } };
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

/** The three bisectors + incenter I of a bisector scene (solution). */
function bisectorSolutionParts(
  scene: BisectorScene,
  dx = 0,
): { segments: NonNullable<FigureSpec['segments']>; points: NonNullable<FigureSpec['points']> } {
  return {
    segments: scene.spans.map((s) =>
      segment(shiftXY(s.from, dx, 0), shiftXY(s.to, dx, 0), { tone: 'given' }),
    ),
    points: [point(shiftXY(scene.I, dx, 0), 'I', 'e', 'image')],
  };
}

/* 1. Page 62 — test (two labelled triangles) */
// Printed layout (page 62): ABC is labelled on the LEFT, EFJ on the RIGHT
// (E top-left, F top-right, J bottom). ① = ABC (left), ② = EFJ (right); each
// triangle is centred in its own frame.
const TEST_DX = [0, 8.1];
const TEST_FRAMES = [
  { x: -0.6, y: 0.2, w: 7.6, h: 6.0, label: '①' },
  { x: 8.4, y: 0.2, w: 7.6, h: 6.0, label: '②' },
];
export const fig16TestGiven: ContentBlock = constructedBlock(
  {
    id: 'fig-l16-test-given',
    alt: 'المثلثان $ABC$ (أيسر) و$EFJ$ (أيمن، $E$ أعلى اليسار و$F$ أعلى اليمين و$J$ أسفل)؛ المطلوب رسم منصفات زوايا كلٍّ منهما',
    caption: `صفحة ٦٢ — ${CAPTION_SCHEMATIC} الاختبار: المثلثان $ABC$ و$EFJ$. ارسم منصفات الزوايا الثلاث في كلٍّ منهما ولاحظ تلاقيها.`,
    source: S62_TEST,
  },
  {
    frames: TEST_FRAMES,
    segments: [
      ...triangleSides(L16_TEST_ABC, TEST_DX[0]!),
      ...triangleSides(L16_TEST_EFJ_TRIANGLE, TEST_DX[1]!),
    ],
    points: [
      ...trianglePoints(L16_TEST_ABC, TEST_DX[0]!),
      point(shiftXY(L16_TEST_EFJ_TRIANGLE.A, TEST_DX[1]!, 0), 'E', 'nw'),
      point(shiftXY(L16_TEST_EFJ_TRIANGLE.B, TEST_DX[1]!, 0), 'F', 'ne'),
      point(shiftXY(L16_TEST_EFJ_TRIANGLE.C, TEST_DX[1]!, 0), 'J', 's'),
    ],
  },
);
export const fig16TestSolution: ContentBlock = constructedBlock(
  {
    id: 'fig-l16-test-solution',
    alt: 'حل الاختبار: منصفات زوايا كل مثلث تتلاقى في نقطة واحدة $I$ (مركز الدائرة الداخلية)',
    caption: `صفحة ٦٢ — ${CAPTION_SCHEMATIC} الحل: منصفات الزوايا الثلاث في كلّ مثلث تتلاقى في نقطة واحدة $I$، هي مركز الدائرة الماسة لأضلاع المثلث داخلاً.`,
    source: S62_TEST,
  },
  (() => {
    const s1 = buildBisectorScene(L16_TEST_ABC);
    const s2 = buildBisectorScene(L16_TEST_EFJ_TRIANGLE);
    return {
      frames: TEST_FRAMES,
      segments: [
        ...triangleSides(L16_TEST_ABC, TEST_DX[0]!),
        ...triangleSides(L16_TEST_EFJ_TRIANGLE, TEST_DX[1]!),
        ...bisectorSolutionParts(s1, TEST_DX[0]!).segments,
        ...bisectorSolutionParts(s2, TEST_DX[1]!).segments,
      ],
      points: [
        ...trianglePoints(L16_TEST_ABC, TEST_DX[0]!),
        point(shiftXY(s1.I, TEST_DX[0]!, 0), 'I', 'e', 'image'),
        point(shiftXY(L16_TEST_EFJ_TRIANGLE.A, TEST_DX[1]!, 0), 'E', 'nw'),
        point(shiftXY(L16_TEST_EFJ_TRIANGLE.B, TEST_DX[1]!, 0), 'F', 'ne'),
        point(shiftXY(L16_TEST_EFJ_TRIANGLE.C, TEST_DX[1]!, 0), 'J', 's'),
        point(shiftXY(s2.I, TEST_DX[1]!, 0), 'I', 'e', 'image'),
      ],
    };
  })(),
);

/* 2. Page 62 — proof */
export const fig16ProofGiven: ContentBlock = constructedBlock(
  {
    id: 'fig-l16-proof-given',
    alt: 'المثلث $ABC$ والمنصّفان $(d_1)$ من $B$ و$(d_2)$ من $C$ يتقاطعان في $I$؛ $L$ مسقط $I$ على $(BC)$ بزاوية قائمة، و$H$ على $[BA]$ مع $BH=BL$، والقطعتان $[IH]$ و$[IL]$',
    caption: `صفحة ٦٢ — ${CAPTION_SCHEMATIC} معطى الإثبات: $(d_1)$ و$(d_2)$ منصّفا $\\widehat{B}$ و$\\widehat{C}$ يتقاطعان في $I$؛ $L$ مسقط $I$ على $(BC)$، و$H$ على $[BA]$ مع $BH=BL$.`,
    source: S62_PROOF,
  },
  {
    segments: [
      ...triangleSides(L16_PROOF),
      segment(L16_PROOF.B, L16_PROOF.I, { tone: 'given' }),
      segment(L16_PROOF.C, L16_PROOF.I, { tone: 'given' }),
      segment(L16_PROOF.I, L16_PROOF.L, { tone: 'image' }),
      segment(L16_PROOF.I, L16_PROOF.H, { tone: 'image' }),
      segment(L16_PROOF.B, L16_PROOF.H, { ticks: 2 }),
      segment(L16_PROOF.B, L16_PROOF.L, { ticks: 2 }),
    ],
    // The printed given figure marks the right angle at L only; ∠IHB = 90° is
    // the conclusion of step ③ and is shown in the solution figure, not here.
    angles: [
      rightAngle(L16_PROOF.L, unitVec(L16_PROOF.B, L16_PROOF.C), unitVec(L16_PROOF.I, L16_PROOF.L)),
    ],
    points: [
      ...trianglePoints(L16_PROOF),
      point(L16_PROOF.I, 'I', 'e', 'image'),
      point(L16_PROOF.L, 'L', 's', 'mark'),
      point(L16_PROOF.H, 'H', 'nw', 'mark'),
    ],
    texts: [
      label(L16_PROOF.B, '(d₁)', { tone: 'given', away: [0.8, 0.5] }),
      label(L16_PROOF.C, '(d₂)', { tone: 'given', away: [-0.8, 0.5] }),
    ],
  },
);
export const fig16ProofSolution: ContentBlock = constructedBlock(
  {
    id: 'fig-l16-proof-solution',
    alt: 'حل الإثبات: $K$ على $[AC]$ مع $CK=CL$، $IH=IL=IK$ وزوايا قائمة عند $H,L,K$؛ $(AI)$ منصّف $\\widehat{A}$، والدائرة مركزها $I$ تمرّ بـ $L,H,K$ وتمسّ الأضلاع داخلاً',
    caption: `صفحة ٦٢ — ${CAPTION_SCHEMATIC} الحل: $IH=IL$ و$IHB=90^\\circ$، ثم $IK=IL$ و$IKC=90^\\circ$؛ فـ $I$ متساوية البعد عن $H,L,K$. ومع $AH=AK$ (مقبولة) يكون $(AI)$ محور $[HK]$ ومنصّف $\\widehat{A}$. الدائرة مركزها $I$ ونصف قطرها $IL$ تمسّ الأضلاع في $L,H,K$.`,
    source: S62_PROOF,
  },
  {
    circles: [
      circleEl(
        L16_PROOF.I,
        Math.hypot(L16_PROOF.I[0] - L16_PROOF.L[0], L16_PROOF.I[1] - L16_PROOF.L[1]),
        { tone: 'aux', dashed: true },
      ),
    ],
    segments: [
      ...triangleSides(L16_PROOF),
      segment(L16_PROOF.B, L16_PROOF.I, { tone: 'given' }),
      segment(L16_PROOF.C, L16_PROOF.I, { tone: 'given' }),
      segment(L16_PROOF.A, L16_PROOF.I, { tone: 'given' }),
      segment(L16_PROOF.I, L16_PROOF.L, { tone: 'image' }),
      segment(L16_PROOF.I, L16_PROOF.H, { tone: 'image' }),
      segment(L16_PROOF.I, L16_PROOF.K, { tone: 'image' }),
    ],
    angles: [
      rightAngle(L16_PROOF.L, unitVec(L16_PROOF.B, L16_PROOF.C), unitVec(L16_PROOF.I, L16_PROOF.L)),
      rightAngle(L16_PROOF.H, unitVec(L16_PROOF.B, L16_PROOF.A), unitVec(L16_PROOF.I, L16_PROOF.H)),
      rightAngle(L16_PROOF.K, unitVec(L16_PROOF.A, L16_PROOF.C), unitVec(L16_PROOF.I, L16_PROOF.K)),
    ],
    points: [
      ...trianglePoints(L16_PROOF),
      point(L16_PROOF.I, 'I', 'e', 'image'),
      point(L16_PROOF.L, 'L', 's', 'mark'),
      point(L16_PROOF.H, 'H', 'nw', 'mark'),
      point(L16_PROOF.K, 'K', 'ne', 'mark'),
    ],
  },
);

/* 3. Page 63 — definition */
export const fig16Definition: ContentBlock = constructedBlock(
  {
    id: 'fig-l16-definition',
    alt: 'المثلث $ABC$ ومنصّف الزاوية $\\widehat{A}$ يقسمها إلى زاويتين متساويتين (علامتا زاوية متماثلتان)، وقدمه $E$ على $[BC]$',
    caption: `صفحة ٦٣ — ${CAPTION_SCHEMATIC} تعريف المنصف: المستقيم المارّ بـ $A$ يقسم $\\widehat{A}$ إلى زاويتين متساويتين (العلامتان المتماثلتان).`,
    source: S63_LEARN,
  },
  {
    segments: [
      ...triangleSides(L16_DEFINITION),
      segment(L16_DEFINITION.span.from, L16_DEFINITION.span.to, { tone: 'given' }),
    ],
    angles: [
      angleArc(L16_DEFINITION.A, L16_DEFINITION.B, L16_DEFINITION.foot, 1.1, '˟'),
      angleArc(L16_DEFINITION.A, L16_DEFINITION.foot, L16_DEFINITION.C, 1.1, '˟'),
    ],
    points: [...trianglePoints(L16_DEFINITION), point(L16_DEFINITION.foot, 'E', 's', 'mark')],
  },
);

/* 4. Page 63 — properties (three bisectors + incircle) */
export const fig16Properties: ContentBlock = constructedBlock(
  {
    id: 'fig-l16-properties',
    alt: 'المثلث $ABC$ ومنصفات زواياه الثلاثة تتلاقى في $I$، والدائرة الماسة لأضلاع المثلث داخلاً مركزها $I$، بعلامات زاويتين متساويتين عند كلّ رأس وزوايا قائمة عند نقاط التماس',
    caption: `صفحة ٦٣ — ${CAPTION_SCHEMATIC} الخاصة: المنصفات الثلاثة تتلاقى في $I$ مركز الدائرة الماسة لأضلاع المثلث داخلاً؛ الدائرة تمسّ الأضلاع الثلاثة (زوايا قائمة عند نقاط التماس).`,
    source: S63_SPECIAL,
  },
  (() => {
    const s = L16_PROPERTIES;
    const tBC = projectOnLine(s.I, s.B, s.C);
    const tCA = projectOnLine(s.I, s.C, s.A);
    const tAB = projectOnLine(s.I, s.A, s.B);
    return {
      circles: [circleEl(s.circle.center, s.circle.radius, { tone: 'aux', dashed: true })],
      segments: [...triangleSides(s), ...bisectorSolutionParts(s).segments],
      angles: [
        angleArc(s.A, s.B, s.feet.A, 0.9, '˟'),
        angleArc(s.A, s.feet.A, s.C, 0.9, '˟'),
        rightAngle(tBC, unitVec(s.B, s.C), unitVec(s.I, tBC)),
        rightAngle(tCA, unitVec(s.C, s.A), unitVec(s.I, tCA)),
        rightAngle(tAB, unitVec(s.A, s.B), unitVec(s.I, tAB)),
      ],
      points: [...trianglePoints(s), point(s.I, 'I', 'e', 'image')],
    };
  })(),
);

/* 5. Page 63 — check */
export const fig16CheckGiven: ContentBlock = constructedBlock(
  {
    id: 'fig-l16-check-given',
    alt: 'المثلث $ABC$ فيه $BC=7$ سم و$\\widehat{CBA}=36^\\circ$ و$\\widehat{BCA}=64^\\circ$',
    caption: `صفحة ٦٣ — ${CAPTION_SCHEMATIC} معطى «تحقّق من فهمك»: $BC=7\\ \\text{cm}$، $\\widehat{CBA}=36^\\circ$، $\\widehat{BCA}=64^\\circ$.`,
    source: S63_CHECK,
  },
  {
    segments: triangleSides(L16_CHECK),
    points: trianglePoints(L16_CHECK),
    texts: [
      label(L16_CHECK.B, '36°', { away: [0.9, 0.4] }),
      label(L16_CHECK.C, '64°', { away: [-0.9, 0.4] }),
      label([(L16_CHECK.B[0] + L16_CHECK.C[0]) / 2, L16_CHECK.B[1]], '7 cm', { away: [0, -0.7] }),
    ],
  },
);
export const fig16CheckSolution: ContentBlock = constructedBlock(
  {
    id: 'fig-l16-check-solution',
    alt: 'حل «تحقّق من فهمك»: منصفات زوايا المثلث الثلاثة تتلاقى في $I$، و$\\widehat{A}=80^\\circ$',
    caption: `صفحة ٦٣ — ${CAPTION_SCHEMATIC} الحل: $\\widehat{A}=180-36-64=80^\\circ$؛ نرسم المنصفات الثلاثة فتتلاقى في $I$ مركز الدائرة الداخلية.`,
    source: S63_CHECK,
  },
  {
    segments: [...triangleSides(L16_CHECK), ...bisectorSolutionParts(L16_CHECK).segments],
    points: [...trianglePoints(L16_CHECK), ...bisectorSolutionParts(L16_CHECK).points],
  },
);

/* 6. Page 63 — practice ① (ERT, incenter C) */
const P1 = L16_PRACTICE_ONE;
export const fig16PracticeOneGiven: ContentBlock = constructedBlock(
  {
    id: 'fig-l16-practice-one-given',
    alt: 'المثلث $ERT$ ($E$ أعلى، $R$ أسفل اليسار، $T$ أسفل اليمين)، $C$ مركز الدائرة الداخلية، والمنصّفان $[RC)$ و$[TC)$ مع $\\widehat{CRT}=25^\\circ$ و$\\widehat{CTR}=31^\\circ$',
    caption: `صفحة ٦٣ — ${CAPTION_SCHEMATIC} معطى «تدرّب ①»: $C$ مركز الدائرة المرسومة في $ERT$؛ $\\widehat{CRT}=25^\\circ$ و$\\widehat{CTR}=31^\\circ$. المطلوب $\\widehat{RET}$.`,
    source: S63_PRACTICE,
  },
  {
    segments: [
      segment(P1.E, P1.R),
      segment(P1.R, P1.T),
      segment(P1.T, P1.E),
      segment(P1.spanRC.from, P1.spanRC.to, { tone: 'given' }),
      segment(P1.spanTC.from, P1.spanTC.to, { tone: 'given' }),
    ],
    points: [
      point(P1.E, 'E', 'n'),
      point(P1.R, 'R', 'sw'),
      point(P1.T, 'T', 'se'),
      point(P1.C, 'C', 'e', 'image'),
    ],
    texts: [
      label(P1.R, '25°', { tone: 'given', away: [1.0, 0.4] }),
      label(P1.T, '31°', { tone: 'given', away: [-1.0, 0.4] }),
    ],
  },
);
export const fig16PracticeOneSolution: ContentBlock = constructedBlock(
  {
    id: 'fig-l16-practice-one-solution',
    alt: 'حل «تدرّب ①»: $\\widehat{R}=2\\times25=50^\\circ$ و$\\widehat{T}=2\\times31=62^\\circ$، فـ $\\widehat{RET}=180-50-62=68^\\circ$',
    caption: `صفحة ٦٣ — ${CAPTION_SCHEMATIC} الحل: $[RC)$ و$[TC)$ منصّفان، فـ $\\widehat{R}=50^\\circ$ و$\\widehat{T}=62^\\circ$؛ ومنه $\\widehat{RET}=180-50-62=68^\\circ$.`,
    source: S63_PRACTICE,
  },
  {
    segments: [
      segment(P1.E, P1.R),
      segment(P1.R, P1.T),
      segment(P1.T, P1.E),
      segment(P1.spanRC.from, P1.spanRC.to, { tone: 'given' }),
      segment(P1.spanTC.from, P1.spanTC.to, { tone: 'given' }),
      segment(P1.E, P1.C, { tone: 'aux', dashed: true }),
    ],
    points: [
      point(P1.E, 'E', 'n'),
      point(P1.R, 'R', 'sw'),
      point(P1.T, 'T', 'se'),
      point(P1.C, 'C', 'e', 'image'),
    ],
    texts: [
      label(P1.E, '68°', { tone: 'image', away: [0, 0.9] }),
      label(P1.R, '50°', { tone: 'image', away: [1.0, 0.4] }),
      label(P1.T, '62°', { tone: 'image', away: [-1.0, 0.4] }),
    ],
  },
);

/* 7. Page 63 — practice ② (ABC, J incenter) */
const P2 = L16_PRACTICE_TWO;
export const fig16PracticeTwoGiven: ContentBlock = constructedBlock(
  {
    id: 'fig-l16-practice-two-given',
    alt: 'المثلث $ABC$ فيه $\\widehat{ABC}=84^\\circ$ و$\\widehat{ACB}=62^\\circ$، و$J$ نقطة تقاطع منصّفي هاتين الزاويتين',
    caption: `صفحة ٦٣ — ${CAPTION_SCHEMATIC} معطى «تدرّب ②»: $\\widehat{ABC}=84^\\circ$ و$\\widehat{ACB}=62^\\circ$، $J$ تلاقي منصّفيهما.`,
    source: S63_PRACTICE,
  },
  {
    segments: [
      ...triangleSides(P2),
      segment(P2.spanBJ.from, P2.spanBJ.to, { tone: 'given' }),
      segment(P2.spanCJ.from, P2.spanCJ.to, { tone: 'given' }),
    ],
    points: [...trianglePoints(P2), point(P2.J, 'J', 'e', 'image')],
    texts: [
      label(P2.B, '84°', { tone: 'given', away: [-0.9, 0.4] }),
      label(P2.C, '62°', { tone: 'given', away: [0.9, 0.4] }),
    ],
  },
);
export const fig16PracticeTwoSolution: ContentBlock = constructedBlock(
  {
    id: 'fig-l16-practice-two-solution',
    alt: 'حل «تدرّب ②»: $\\widehat{BAC}=34^\\circ$؛ زوايا $JAB$: $17^\\circ,42^\\circ,121^\\circ$؛ $JBC$: $42^\\circ,31^\\circ,107^\\circ$؛ $JCA$: $31^\\circ,17^\\circ,132^\\circ$',
    caption: `صفحة ٦٣ — ${CAPTION_SCHEMATIC} الحل: $\\widehat{BAC}=180-84-62=34^\\circ$. ومثلثات $JAB$ و$JBC$ و$JCA$ زواياها: $(17,42,121)$ و$(42,31,107)$ و$(31,17,132)$؛ ومجموع الزوايا حول $J$ يساوي $360^\\circ$.`,
    source: S63_PRACTICE,
  },
  {
    segments: [
      ...triangleSides(P2),
      segment(P2.spanBJ.from, P2.spanBJ.to, { tone: 'given' }),
      segment(P2.spanCJ.from, P2.spanCJ.to, { tone: 'given' }),
      segment(P2.A, P2.J, { tone: 'aux', dashed: true }),
    ],
    points: [...trianglePoints(P2), point(P2.J, 'J', 'e', 'image')],
    texts: [
      label(P2.A, '34°', { tone: 'image', away: [0.9, 0.3] }),
      label(P2.J, '121° / 107° / 132°', { tone: 'image', away: [0, -1.0] }),
    ],
  },
);

/* 8. Interactive lab */
export const angleBisectorLabDiagram: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'authored',
  id: 'auth-16-angle-bisector-lab',
  renderer: 'angle-bisector-lab',
  alt: 'مختبر تفاعلي: منصّفات الزوايا الثلاثة تتلاقى دائمًا في $I$ مركز الدائرة الماسة لأضلاع المثلث داخلاً، و$I$ تبعد بالمسافة نفسها عن الأضلاع الثلاثة',
  caption:
    'مختبر تفاعلي من إعداد المنصّة — حرّك الرأس وبدّل شكل المثلث وراقب المنصفات الثلاثة: تتلاقى دائمًا في $I$، وتبقى المسافات إلى الأضلاع الثلاثة متساوية (نصف قطر الدائرة الداخلية).',
  source: S63_SPECIAL,
  params: {},
};

/* Exported spec inventory */
export function specOf(block: ContentBlock): FigureSpec {
  if (block.type !== 'figure' || block.diagram.kind !== 'constructed')
    throw new Error('specOf expects a constructed figure block');
  return block.diagram.construction as unknown as FigureSpec;
}
export const ALL_L16_FIGURE_SPECS: readonly { id: string; spec: FigureSpec }[] = [
  { id: 'fig-l16-test-given', spec: specOf(fig16TestGiven) },
  { id: 'fig-l16-test-solution', spec: specOf(fig16TestSolution) },
  { id: 'fig-l16-proof-given', spec: specOf(fig16ProofGiven) },
  { id: 'fig-l16-proof-solution', spec: specOf(fig16ProofSolution) },
  { id: 'fig-l16-definition', spec: specOf(fig16Definition) },
  { id: 'fig-l16-properties', spec: specOf(fig16Properties) },
  { id: 'fig-l16-check-given', spec: specOf(fig16CheckGiven) },
  { id: 'fig-l16-check-solution', spec: specOf(fig16CheckSolution) },
  { id: 'fig-l16-practice-one-given', spec: specOf(fig16PracticeOneGiven) },
  { id: 'fig-l16-practice-one-solution', spec: specOf(fig16PracticeOneSolution) },
  { id: 'fig-l16-practice-two-given', spec: specOf(fig16PracticeTwoGiven) },
  { id: 'fig-l16-practice-two-solution', spec: specOf(fig16PracticeTwoSolution) },
];
