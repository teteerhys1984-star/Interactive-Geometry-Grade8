import type { ConstructedDiagram, ContentBlock, InteractiveDiagram, SourceRef } from '../schema';
import type { FigureSpec, FigureTone, LabelPlace, XY } from '@/lib/geometryFigure';
import {
  L15_CHECK,
  L15_DEFINITION,
  L15_EXAMPLE,
  L15_EXAMPLE_PARALLELOGRAM,
  L15_PLUMB,
  L15_PRACTICE_CASE_ONE,
  L15_PRACTICE_CASE_TWO,
  L15_PROPERTIES,
  L15_PROOF,
  L15_TEST_ABC,
  L15_TEST_EFJ_TRIANGLE,
  type MedianScene,
} from './lesson-15-geometry';
import { midPoint } from './lesson-10-geometry';

/**
 * ============================================================================
 *  UNIT 3, LESSON 3 — «المتوسط في المثلث» (pages 59–61)
 *  THE FIGURES OF THE LESSON
 * ============================================================================
 *  Every figure is a `midline-figure` FigureSpec, `origin: 'authored'`, with a
 *  schematic caption; every incidence, midpoint, concurrence and printed
 *  magnitude is exact by construction (`lesson-15-geometry.test.ts`).
 *  Source figure → id → usage is tabulated in `docs/UNIT-03-LESSON-03-FIGURES.md`.
 * ============================================================================
 */

export const CAPTION_SCHEMATIC =
  'رسم تعليمي من إعداد المنصّة — الشكل تخطيطي غير مقيّس، والعلاقات الهندسية المعلَّمة فيه محقَّقة بالحساب.';

const S59_MEANING: SourceRef = { page: 59, locator: 'معنى الكلمات — المتوسط' };
const S59_TEST: SourceRef = { page: 59, locator: 'اختبار — متوسطات المثلثين' };
const S59_PROOF: SourceRef = { page: 59, locator: 'إثبات — تلاقي المتوسطات' };
const S59_PHYSICS: SourceRef = { page: 59, locator: 'معنى الكلمات — مركز الثقل والشاقول' };
const S60_LEARN: SourceRef = { page: 60, locator: 'تعلّم — تعريف المتوسط' };
const S60_PROPERTIES: SourceRef = { page: 60, locator: 'خواص — نسب 2/3' };
const S60_EXAMPLE: SourceRef = { page: 60, locator: 'مثال — AG = 2.4، GM = 1.2' };
const S61_EXAMPLE: SourceRef = { page: 61, locator: 'مثال — متوازي الأضلاع' };
const S61_CHECK: SourceRef = { page: 61, locator: 'تحقّق من فهمك' };
const S61_PRACTICE: SourceRef = { page: 61, locator: 'تدرّب ①' };

/* Builders (lesson-local, same vocabulary as Lessons 13–14) */
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

/** A side drawn as two equal halves carrying `ticks`. */
const halvedSide = (
  p: XY,
  q: XY,
  ticks: 1 | 2 | 3,
  tone: FigureTone = 'ink',
): NonNullable<FigureSpec['segments']> => {
  const m = midPoint(p, q);
  return [segment(p, m, { tone, ticks }), segment(m, q, { tone, ticks })];
};

/** The three medians + centroid G of a median scene (solution). */
function medianSolutionParts(
  scene: MedianScene,
  dx = 0,
): { segments: NonNullable<FigureSpec['segments']>; points: NonNullable<FigureSpec['points']> } {
  return {
    segments: scene.spans.map((s) =>
      segment(shiftXY(s.from, dx, 0), shiftXY(s.to, dx, 0), { tone: 'given' }),
    ),
    points: [point(shiftXY(scene.G, dx, 0), 'G', 'e', 'image')],
  };
}

/* 1. Page 59 — meaning */
export const fig15MeaningGiven: ContentBlock = constructedBlock(
  {
    id: 'fig-l15-meaning-given',
    alt: 'المثلث $ABC$ والمتوسط المارّ بـ $A$ ومنتصف $[BC]$، بعلامتَي تنصيف على نصفَي $[BC]$',
    caption: `صفحة ٥٩ — ${CAPTION_SCHEMATIC} معنى الكلمات: المتوسط من $A$ مارّ بـ $A$ ومنتصف الضلع المقابل $[BC]$ (علامتا تنصيف).`,
    source: S59_MEANING,
  },
  {
    segments: [
      ...triangleSides(L15_DEFINITION),
      ...halvedSide(L15_DEFINITION.B, L15_DEFINITION.C, 2),
      segment(L15_DEFINITION.span.from, L15_DEFINITION.span.to, { tone: 'given' }),
    ],
    points: [...trianglePoints(L15_DEFINITION), point(L15_DEFINITION.m, 'M', 's', 'mark')],
  },
);

/* 2. Page 59 — test (two unlabelled triangles, givens only) */
// Printed layout (page 59): the acute triangle is on the LEFT, the obtuse on the
// RIGHT. The text names them ABC then EFJ, so ① = ABC (acute, left) and
// ② = EFJ (obtuse, right). Each triangle is centred in its own frame.
const TEST_DX = [0, 8.1];
const TEST_FRAMES = [
  { x: -0.6, y: 0.2, w: 7.6, h: 6.0, label: '①' },
  { x: 8.4, y: 0.2, w: 7.6, h: 6.0, label: '②' },
];
export const fig15TestGiven: ContentBlock = constructedBlock(
  {
    id: 'fig-l15-test-given',
    alt: 'مثلثان غير موسومين: أيسرهما حاد الزوايا وأيمنهما منفرج؛ المطلوب رسم متوسطات كلٍّ منهما',
    caption: `صفحة ٥٩ — ${CAPTION_SCHEMATIC} الاختبار: مثلثان مطبوعان دون تسمية (النصّ يسمّيهما $ABC$ و$EFJ$). ارسم المتوسطات الثلاثة لكلٍّ منهما ولاحظ تلاقيها.`,
    source: S59_TEST,
  },
  {
    frames: TEST_FRAMES,
    segments: [
      ...triangleSides(L15_TEST_ABC, TEST_DX[0]!),
      ...triangleSides(L15_TEST_EFJ_TRIANGLE, TEST_DX[1]!),
    ],
  },
);
export const fig15TestSolution: ContentBlock = constructedBlock(
  {
    id: 'fig-l15-test-solution',
    alt: 'حل الاختبار: المثلثان موسومان $ABC$ و$EFJ$، ومتوسطات كلٍّ منهما تتلاقى في مركز ثقله',
    caption: `صفحة ٥٩ — ${CAPTION_SCHEMATIC} الحل: سمّينا المثلثين $ABC$ و$EFJ$ كما في النصّ؛ متوسطات كلٍّ منهما تتلاقى في نقطة واحدة (مركز الثقل).`,
    source: S59_TEST,
  },
  (() => {
    const s1 = {
      ...L15_TEST_ABC,
      G: [
        (L15_TEST_ABC.A[0] + L15_TEST_ABC.B[0] + L15_TEST_ABC.C[0]) / 3,
        (L15_TEST_ABC.A[1] + L15_TEST_ABC.B[1] + L15_TEST_ABC.C[1]) / 3,
      ] as XY,
    };
    const t2 = L15_TEST_EFJ_TRIANGLE;
    const s2 = {
      ...t2,
      G: [(t2.A[0] + t2.B[0] + t2.C[0]) / 3, (t2.A[1] + t2.B[1] + t2.C[1]) / 3] as XY,
    };
    const med = (t: { A: XY; B: XY; C: XY }, dx: number) => [
      segment(shiftXY(t.A, dx, 0), shiftXY(midPoint(t.B, t.C), dx, 0), { tone: 'given' }),
      segment(shiftXY(t.B, dx, 0), shiftXY(midPoint(t.A, t.C), dx, 0), { tone: 'given' }),
      segment(shiftXY(t.C, dx, 0), shiftXY(midPoint(t.A, t.B), dx, 0), { tone: 'given' }),
    ];
    return {
      frames: TEST_FRAMES,
      segments: [
        ...triangleSides(L15_TEST_ABC, TEST_DX[0]!),
        ...triangleSides(t2, TEST_DX[1]!),
        ...med(L15_TEST_ABC, TEST_DX[0]!),
        ...med(t2, TEST_DX[1]!),
      ],
      points: [
        point(shiftXY(L15_TEST_ABC.A, TEST_DX[0]!, 0), 'A', 'n'),
        point(shiftXY(L15_TEST_ABC.B, TEST_DX[0]!, 0), 'B', 'sw'),
        point(shiftXY(L15_TEST_ABC.C, TEST_DX[0]!, 0), 'C', 'se'),
        point(shiftXY(s1.G, TEST_DX[0]!, 0), 'G', 'e', 'image'),
        point(shiftXY(t2.A, TEST_DX[1]!, 0), 'E', 'nw'),
        point(shiftXY(t2.B, TEST_DX[1]!, 0), 'F', 'ne'),
        point(shiftXY(t2.C, TEST_DX[1]!, 0), 'J', 's'),
        point(shiftXY(s2.G, TEST_DX[1]!, 0), 'G', 'e', 'image'),
      ],
    };
  })(),
);

/* 3. Page 59 — proof */
export const fig15ProofGiven: ContentBlock = constructedBlock(
  {
    id: 'fig-l15-proof-given',
    alt: 'المثلث $ABC$، $J$ منتصف $[AB]$ و$I$ منتصف $[AC]$، والمتوسطان $(BI)$ و$(CJ)$ يتقاطعان في $G$',
    caption: `صفحة ٥٩ — ${CAPTION_SCHEMATIC} معطى الإثبات: $I$ و$J$ منتصفا $[AC]$ و$[AB]$، والمتوسطان $(BI)$ و$(CJ)$ يتقاطعان في $G$.`,
    source: S59_PROOF,
  },
  {
    segments: [
      ...triangleSides(L15_PROOF),
      ...halvedSide(L15_PROOF.A, L15_PROOF.B, 1),
      ...halvedSide(L15_PROOF.A, L15_PROOF.C, 2),
      segment(L15_PROOF.B, L15_PROOF.I, { tone: 'given' }),
      segment(L15_PROOF.C, L15_PROOF.J, { tone: 'given' }),
    ],
    points: [
      ...trianglePoints(L15_PROOF),
      point(L15_PROOF.I, 'I', 'ne', 'mark'),
      point(L15_PROOF.J, 'J', 'nw', 'mark'),
      point(L15_PROOF.G, 'G', 'e', 'image'),
    ],
  },
);
export const fig15ProofSolution: ContentBlock = constructedBlock(
  {
    id: 'fig-l15-proof-solution',
    alt: 'حل الإثبات: $D$ صورة $A$ بالتناظر مركزه $G$، $K$ تقاطع $(AD)$ و$(BC)$ منتصف $[BC]$، $BGCD$ متوازي أضلاع، و$(AK)$ المتوسط الثالث',
    caption: `صفحة ٥٩ — ${CAPTION_SCHEMATIC} الحل: $D$ صورة $A$ بمركز $G$؛ $JG\\parallel BD$ و$BD=2JG$، $IG\\parallel CD$ و$CD=2IG$؛ $BGCD$ متوازي أضلاع، قطراه يتناصفان في $K$ منتصف $[BC]$، فـ $(AK)$ المتوسط الثالث و$AG=2GK$.`,
    source: S59_PROOF,
  },
  {
    segments: [
      ...triangleSides(L15_PROOF),
      segment(L15_PROOF.B, L15_PROOF.I, { tone: 'aux', dashed: true }),
      segment(L15_PROOF.C, L15_PROOF.J, { tone: 'aux', dashed: true }),
      segment(L15_PROOF.A, L15_PROOF.D, { tone: 'given' }),
      segment(L15_PROOF.B, L15_PROOF.D, { tone: 'image' }),
      segment(L15_PROOF.C, L15_PROOF.D, { tone: 'image' }),
      segment(L15_PROOF.G, L15_PROOF.D, { tone: 'aux', dashed: true }),
    ],
    points: [
      ...trianglePoints(L15_PROOF),
      point(L15_PROOF.I, 'I', 'ne', 'mark'),
      point(L15_PROOF.J, 'J', 'nw', 'mark'),
      point(L15_PROOF.G, 'G', 'e', 'image'),
      point(L15_PROOF.D, 'D', 's', 'image'),
      point(L15_PROOF.K, 'K', 's', 'mark'),
    ],
  },
);

/* 4. Page 59 — physics plumb line */
export const fig15Physics: ContentBlock = constructedBlock(
  {
    id: 'fig-l15-physics',
    alt: 'صفيحة مثلثية معلّقة من الرأس $A$، والشاقول الرأسي المارّ بنقطة التعليق يمرّ بمركز الثقل $G$',
    caption: `صفحة ٥٩ — ${CAPTION_SCHEMATIC} صندوق الفيزياء (رسم تخطيطي): صفيحة مثلثية متجانسة معلّقة من $A$؛ الشاقول الرأسي المارّ بنقطة التعليق يمرّ بمركز الثقل $G$.`,
    source: S59_PHYSICS,
  },
  {
    segments: [
      ...triangleSides(L15_PLUMB),
      segment(L15_PLUMB.plumb.from, L15_PLUMB.plumb.to, { tone: 'given', dashed: true }),
    ],
    points: [...trianglePoints(L15_PLUMB), point(L15_PLUMB.G, 'G', 'e', 'image')],
    texts: [label(L15_PLUMB.plumb.from, 'الشاقول', { tone: 'given', away: [0.8, 0.2] })],
  },
);

/* 5. Page 60 — definition */
export const fig15Definition: ContentBlock = constructedBlock(
  {
    id: 'fig-l15-definition',
    alt: 'المثلث $ABC$ والمتوسط $[AM]$، $M$ منتصف $[BC]$ بعلامتَي تنصيف',
    caption: `صفحة ٦٠ — ${CAPTION_SCHEMATIC} تعريف المتوسط: $[AM]$ مارّ بالرأس $A$ ومنتصف $[BC]$؛ $M$ منتصف الضلع المقابل.`,
    source: S60_LEARN,
  },
  {
    segments: [
      ...triangleSides(L15_DEFINITION),
      ...halvedSide(L15_DEFINITION.B, L15_DEFINITION.C, 2),
      segment(L15_DEFINITION.A, L15_DEFINITION.m, { tone: 'given' }),
    ],
    points: [...trianglePoints(L15_DEFINITION), point(L15_DEFINITION.m, 'M', 's', 'mark')],
  },
);

/* 6. Page 60 — properties (1/3/2 ticks) */
export const fig15Properties: ContentBlock = constructedBlock(
  {
    id: 'fig-l15-properties',
    alt: "المثلث $ABC$ ومنتصفات أضلاعه $A'$ و$B'$ و$C'$ بعلامات متمايزة، والمتوسطات الثلاثة تتلاقى في $G$ مع $AG=\\frac{2}{3}AA'$",
    caption: `صفحة ٦٠ — ${CAPTION_SCHEMATIC} الخواص: المتوسطات الثلاثة تتلاقى في $G$، وتقع $G$ في نهاية الثلث الثاني من كلّ متوسط: $AG=\\frac{2}{3}AA'$ و$BG=\\frac{2}{3}BB'$ و$CG=\\frac{2}{3}CC'$. علامات التنصيف متمايزة لكلّ ضلع (1 و3 و2).`,
    source: S60_PROPERTIES,
  },
  {
    segments: [
      ...triangleSides(L15_PROPERTIES),
      ...halvedSide(L15_PROPERTIES.A, L15_PROPERTIES.B, 1),
      ...halvedSide(L15_PROPERTIES.A, L15_PROPERTIES.C, 3),
      ...halvedSide(L15_PROPERTIES.B, L15_PROPERTIES.C, 2),
      ...medianSolutionParts(L15_PROPERTIES).segments,
    ],
    points: [
      ...trianglePoints(L15_PROPERTIES),
      point(L15_PROPERTIES.feet.A, "A'", 's', 'mark'),
      point(L15_PROPERTIES.feet.B, "B'", 'ne', 'mark'),
      point(L15_PROPERTIES.feet.C, "C'", 'nw', 'mark'),
      point(L15_PROPERTIES.G, 'G', 'e', 'image'),
    ],
  },
);

/* 7. Page 60 — example 1 */
export const fig15ExampleOneGiven: ContentBlock = constructedBlock(
  {
    id: 'fig-l15-example-one-given',
    alt: 'المثلث $ABC$، $M$ منتصف $[BC]$، $G$ على $[AM]$ مع $AG=2.4$ سم و$GM=1.2$ سم',
    caption: `صفحة ٦٠ — ${CAPTION_SCHEMATIC} معطى المثال: $M$ منتصف $[BC]$، $G\\in[AM]$، $AG=2.4\\ \\text{cm}$ و$GM=1.2\\ \\text{cm}$.`,
    source: S60_EXAMPLE,
  },
  {
    segments: [
      ...triangleSides(L15_EXAMPLE),
      ...halvedSide(L15_EXAMPLE.B, L15_EXAMPLE.C, 2),
      segment(L15_EXAMPLE.A, L15_EXAMPLE.M, { tone: 'given' }),
    ],
    points: [
      ...trianglePoints(L15_EXAMPLE),
      point(L15_EXAMPLE.M, 'M', 's', 'mark'),
      point(L15_EXAMPLE.G, 'G', 'e', 'image'),
    ],
    texts: [
      label(midPoint(L15_EXAMPLE.A, L15_EXAMPLE.G), '2.4 cm', { away: [0.8, 0] }),
      label(midPoint(L15_EXAMPLE.G, L15_EXAMPLE.M), '1.2 cm', { away: [0.8, 0] }),
    ],
  },
);
export const fig15ExampleOneSolution: ContentBlock = constructedBlock(
  {
    id: 'fig-l15-example-one-solution',
    alt: 'حل المثال: $AG=2GM$ أي $AG=\\frac{2}{3}AM$، فـ $G$ مركز ثقل المثلث $ABC$',
    caption: `صفحة ٦٠ — ${CAPTION_SCHEMATIC} الحل المطبوع: $[AM]$ متوسط، و$AG=2.4=2\\times1.2=2GM$ أي $AG=\\frac{2}{3}AM$؛ فـ $G$ مركز ثقل المثلث.`,
    source: S60_EXAMPLE,
  },
  {
    segments: [
      ...triangleSides(L15_EXAMPLE),
      ...halvedSide(L15_EXAMPLE.B, L15_EXAMPLE.C, 2),
      segment(L15_EXAMPLE.A, L15_EXAMPLE.M, { tone: 'given' }),
    ],
    points: [
      ...trianglePoints(L15_EXAMPLE),
      point(L15_EXAMPLE.M, 'M', 's', 'mark'),
      point(L15_EXAMPLE.G, 'G', 'e', 'image'),
    ],
    texts: [label(L15_EXAMPLE.G, 'G مركز الثقل', { tone: 'image', away: [1.0, 0.2] })],
  },
);

/* 8. Page 61 — example 2 (parallelogram) */
const PARA = L15_EXAMPLE_PARALLELOGRAM;
export const fig15ExampleTwoGiven: ContentBlock = constructedBlock(
  {
    id: 'fig-l15-example-two-given',
    alt: 'متوازي الأضلاع $ABCD$ مركزه $O$، $M$ منتصف $[AB]$، و$G$ تقاطع $(CM)$ و$(BD)$',
    caption: `صفحة ٦١ — ${CAPTION_SCHEMATIC} معطى المثال: $ABCD$ متوازي أضلاع مركزه $O$، $M$ منتصف $[AB]$، $G=(CM)\\cap(BD)$.`,
    source: S61_EXAMPLE,
  },
  {
    polygons: [{ points: [PARA.A, PARA.B, PARA.C, PARA.D], tone: 'ink' }],
    segments: [
      segment(PARA.A, PARA.C, { tone: 'aux', dashed: true }),
      segment(PARA.B, PARA.D, { tone: 'aux', dashed: true }),
      segment(PARA.C, PARA.M, { tone: 'given' }),
      ...halvedSide(PARA.A, PARA.B, 2),
    ],
    points: [
      point(PARA.A, 'A', 'sw'),
      point(PARA.B, 'B', 'se'),
      point(PARA.C, 'C', 'ne'),
      point(PARA.D, 'D', 'nw'),
      point(PARA.O, 'O', 's', 'aux'),
      point(PARA.M, 'M', 's', 'mark'),
      point(PARA.G, 'G', 'e', 'image'),
    ],
  },
);
export const fig15ExampleTwoSolution: ContentBlock = constructedBlock(
  {
    id: 'fig-l15-example-two-solution',
    alt: 'حل المثال: $[CM]$ و$[BO]$ متوسطان في $ABC$ ($O$ منتصف $[AC]$)، يتقاطعان في $G$ مركز الثقل',
    caption: `صفحة ٦١ — ${CAPTION_SCHEMATIC} الحل المطبوع: $[CM]$ متوسط ($M$ منتصف $[AB]$)، و$[BO]$ متوسط ($O$ منتصف $[AC]$ لأنّ القطرين متناصفان)؛ يتقاطعان في $G$ فهو مركز ثقل $ABC$.`,
    source: S61_EXAMPLE,
  },
  {
    polygons: [{ points: [PARA.A, PARA.B, PARA.C, PARA.D], tone: 'aux', dashed: true }],
    segments: [
      segment(PARA.A, PARA.B, { tone: 'ink' }),
      segment(PARA.B, PARA.C, { tone: 'ink' }),
      segment(PARA.C, PARA.A, { tone: 'ink' }),
      segment(PARA.C, PARA.M, { tone: 'given' }),
      segment(PARA.B, PARA.O, { tone: 'given' }),
      ...halvedSide(PARA.A, PARA.B, 2),
      ...halvedSide(PARA.A, PARA.C, 1),
    ],
    points: [
      point(PARA.A, 'A', 'sw'),
      point(PARA.B, 'B', 'se'),
      point(PARA.C, 'C', 'ne'),
      point(PARA.O, 'O', 'ne', 'mark'),
      point(PARA.M, 'M', 's', 'mark'),
      point(PARA.G, 'G', 'e', 'image'),
    ],
  },
);

/* 9. Page 61 — check */
export const fig15CheckGiven: ContentBlock = constructedBlock(
  {
    id: 'fig-l15-check-given',
    alt: 'المثلث $ABC$ فيه $AB=7$ سم و$\\widehat{A}=70^\\circ$ و$AC=8$ سم',
    caption: `صفحة ٦١ — ${CAPTION_SCHEMATIC} معطى «تحقّق من فهمك»: $AB=7\\ \\text{cm}$، $\\widehat{A}=70^\\circ$، $AC=8\\ \\text{cm}$.`,
    source: S61_CHECK,
  },
  {
    segments: triangleSides(L15_CHECK),
    points: trianglePoints(L15_CHECK),
    texts: [
      label(midPoint(L15_CHECK.A, L15_CHECK.B), '7 cm', { away: [0, -0.7] }),
      label(midPoint(L15_CHECK.A, L15_CHECK.C), '8 cm', { away: [-0.7, 0.3] }),
      label(L15_CHECK.A, '70°', { away: [0.9, 0.2] }),
    ],
  },
);
export const fig15CheckSolution: ContentBlock = constructedBlock(
  {
    id: 'fig-l15-check-solution',
    alt: 'حل «تحقّق من فهمك»: متوسطا المثلث يتقاطعان في مركز ثقله $G$',
    caption: `صفحة ٦١ — ${CAPTION_SCHEMATIC} الحل: يكفي رسم متوسطين؛ نقطة تقاطعهما $G$ مركز ثقل المثلث.`,
    source: S61_CHECK,
  },
  {
    segments: [...triangleSides(L15_CHECK), ...medianSolutionParts(L15_CHECK).segments],
    points: [...trianglePoints(L15_CHECK), ...medianSolutionParts(L15_CHECK).points],
  },
);

/* 10. Page 61 — practice ① case ① */
const C1 = L15_PRACTICE_CASE_ONE;
export const fig15PracticeCaseOneGiven: ContentBlock = constructedBlock(
  {
    id: 'fig-l15-practice-case-one-given',
    alt: 'المثلث $ABC$، $M$ منتصف $[BC]$، $G$ على $[AM]$ مع $AG=3.4$ سم و$GM=1.7$ سم',
    caption: `صفحة ٦١ — ${CAPTION_SCHEMATIC} تدرّب ① الحالة ①: $M$ منتصف $[BC]$، $G\\in[AM]$، $AG=3.4\\ \\text{cm}$ و$GM=1.7\\ \\text{cm}$.`,
    source: S61_PRACTICE,
  },
  {
    segments: [
      ...triangleSides(C1),
      ...halvedSide(C1.B, C1.C, 2),
      segment(C1.A, C1.M, { tone: 'given' }),
    ],
    points: [...trianglePoints(C1), point(C1.M, 'M', 'e', 'mark'), point(C1.G, 'G', 'n', 'image')],
    texts: [
      label(midPoint(C1.A, C1.G), '3.4 cm', { away: [0, 0.7] }),
      label(midPoint(C1.G, C1.M), '1.7 cm', { away: [0, 0.7] }),
    ],
  },
);
export const fig15PracticeCaseOneSolution: ContentBlock = constructedBlock(
  {
    id: 'fig-l15-practice-case-one-solution',
    alt: 'حل الحالة ①: $AG=2GM$ أي $AG=\\frac{2}{3}AM$، فـ $G$ مركز ثقل المثلث',
    caption: `صفحة ٦١ — ${CAPTION_SCHEMATIC} الحل: $[AM]$ متوسط و$AG=3.4=2\\times1.7=2GM$ أي $AG=\\frac{2}{3}AM$؛ فـ $G$ مركز الثقل.`,
    source: S61_PRACTICE,
  },
  {
    segments: [
      ...triangleSides(C1),
      ...halvedSide(C1.B, C1.C, 2),
      segment(C1.A, C1.M, { tone: 'given' }),
    ],
    points: [...trianglePoints(C1), point(C1.M, 'M', 'e', 'mark'), point(C1.G, 'G', 'n', 'image')],
    texts: [label(C1.G, 'G مركز الثقل', { tone: 'image', away: [0, 0.9] })],
  },
);

/* 11. Page 61 — practice ① case  (parallelogram AMCI) */
const C2 = L15_PRACTICE_CASE_TWO;
export const fig15PracticeCaseTwoGiven: ContentBlock = constructedBlock(
  {
    id: 'fig-l15-practice-case-two-given',
    alt: 'متوازي الأضلاع $AMCI$ مركزه $J$، $I$ منتصف $[AB]$، و$G$ تقاطع $(BJ)$ و$(CI)$',
    caption: `صفحة ٦١ — ${CAPTION_SCHEMATIC} تدرّب ① الحالة ②: $AMCI$ متوازي أضلاع مركزه $J$، $I$ منتصف $[AB]$، $G=(BJ)\\cap(CI)$.`,
    source: S61_PRACTICE,
  },
  {
    polygons: [{ points: [C2.A, C2.M, C2.C, C2.I], tone: 'ink' }],
    segments: [
      segment(C2.A, C2.B, { tone: 'ink' }),
      segment(C2.B, C2.C, { tone: 'ink' }),
      segment(C2.B, C2.J, { tone: 'given' }),
      segment(C2.C, C2.I, { tone: 'given' }),
      ...halvedSide(C2.A, C2.B, 2),
    ],
    points: [
      point(C2.A, 'A', 'se'),
      point(C2.B, 'B', 'sw'),
      point(C2.C, 'C', 'nw'),
      point(C2.M, 'M', 'ne'),
      point(C2.I, 'I', 's', 'mark'),
      point(C2.J, 'J', 'e', 'aux'),
      point(C2.G, 'G', 'w', 'image'),
    ],
  },
);
export const fig15PracticeCaseTwoSolution: ContentBlock = constructedBlock(
  {
    id: 'fig-l15-practice-case-two-solution',
    alt: 'حل الحالة ②: $J$ منتصف $[AC]$ فـ $[BJ]$ متوسط، و$[CI]$ متوسط ($I$ منتصف $[AB]$)، يتقاطعان في $G$ مركز الثقل',
    caption: `صفحة ٦١ — ${CAPTION_SCHEMATIC} الحل: $J$ مركز متوازي الأضلاع فهو منتصف القطر $[AC]$، إذن $[BJ]$ متوسط؛ و$[CI]$ متوسط ($I$ منتصف $[AB]$)؛ يتقاطعان في $G$ فهو مركز ثقل $ABC$.`,
    source: S61_PRACTICE,
  },
  {
    polygons: [{ points: [C2.A, C2.M, C2.C, C2.I], tone: 'aux', dashed: true }],
    segments: [
      segment(C2.A, C2.B, { tone: 'ink' }),
      segment(C2.B, C2.C, { tone: 'ink' }),
      segment(C2.C, C2.A, { tone: 'ink' }),
      segment(C2.B, C2.J, { tone: 'given' }),
      segment(C2.C, C2.I, { tone: 'given' }),
      ...halvedSide(C2.A, C2.B, 2),
      ...halvedSide(C2.A, C2.C, 1),
    ],
    points: [
      point(C2.A, 'A', 'se'),
      point(C2.B, 'B', 'sw'),
      point(C2.C, 'C', 'nw'),
      point(C2.I, 'I', 's', 'mark'),
      point(C2.J, 'J', 'e', 'mark'),
      point(C2.G, 'G', 'w', 'image'),
    ],
  },
);

/* 12. Interactive lab */
export const medianLabDiagram: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'authored',
  id: 'auth-15-median-lab',
  renderer: 'median-lab',
  alt: "مختبر تفاعلي: المتوسطات الثلاثة تتلاقى دائمًا في $G$ مركز الثقل، وتقع $G$ في نهاية الثلث الثاني من كلّ متوسط بدءًا من الرأس ($AG=\\frac{2}{3}AA'$)",
  caption:
    "مختبر تفاعلي من إعداد المنصّة — حرّك الرأس وبدّل شكل المثلث وراقب المتوسطات الثلاثة: تتلاقى دائمًا في $G$، وتبقى النسبة $AG=\\frac{2}{3}AA'$ محقّقة مهما تغيّر المثلث.",
  source: S60_PROPERTIES,
  params: {},
};

/* Exported spec inventory */
export function specOf(block: ContentBlock): FigureSpec {
  if (block.type !== 'figure' || block.diagram.kind !== 'constructed')
    throw new Error('specOf expects a constructed figure block');
  return block.diagram.construction as unknown as FigureSpec;
}
export const ALL_L15_FIGURE_SPECS: readonly { id: string; spec: FigureSpec }[] = [
  { id: 'fig-l15-meaning-given', spec: specOf(fig15MeaningGiven) },
  { id: 'fig-l15-test-given', spec: specOf(fig15TestGiven) },
  { id: 'fig-l15-test-solution', spec: specOf(fig15TestSolution) },
  { id: 'fig-l15-proof-given', spec: specOf(fig15ProofGiven) },
  { id: 'fig-l15-proof-solution', spec: specOf(fig15ProofSolution) },
  { id: 'fig-l15-physics', spec: specOf(fig15Physics) },
  { id: 'fig-l15-definition', spec: specOf(fig15Definition) },
  { id: 'fig-l15-properties', spec: specOf(fig15Properties) },
  { id: 'fig-l15-example-one-given', spec: specOf(fig15ExampleOneGiven) },
  { id: 'fig-l15-example-one-solution', spec: specOf(fig15ExampleOneSolution) },
  { id: 'fig-l15-example-two-given', spec: specOf(fig15ExampleTwoGiven) },
  { id: 'fig-l15-example-two-solution', spec: specOf(fig15ExampleTwoSolution) },
  { id: 'fig-l15-check-given', spec: specOf(fig15CheckGiven) },
  { id: 'fig-l15-check-solution', spec: specOf(fig15CheckSolution) },
  { id: 'fig-l15-practice-case-one-given', spec: specOf(fig15PracticeCaseOneGiven) },
  { id: 'fig-l15-practice-case-one-solution', spec: specOf(fig15PracticeCaseOneSolution) },
  { id: 'fig-l15-practice-case-two-given', spec: specOf(fig15PracticeCaseTwoGiven) },
  { id: 'fig-l15-practice-case-two-solution', spec: specOf(fig15PracticeCaseTwoSolution) },
];
