import type { ConstructedDiagram, ContentBlock, InteractiveDiagram, SourceRef } from '../schema';
import type { FigureSpec, FigureTone, LabelPlace, XY } from '@/lib/geometryFigure';
import {
  L13_ACTIVITY_TRIANGLE,
  L13_CHECK,
  L13_DEFINITION,
  L13_OPENER_ANGLE_PANELS,
  L13_OPENER_ARCS,
  L13_OPENER_LINE_PANELS,
  L13_OPENER_SEGMENT,
  L13_PRACTICE_ONE,
  L13_PRACTICE_THREE,
  L13_PRACTICE_TWO,
  L13_PROPERTY,
  L13_SEGMENT_ARCS,
  L13_SPECIAL_CASES,
  buildActivityScene,
  type OpenerAnglePanel,
  type OpenerLinePanel,
  type PanelId,
} from './lesson-13-geometry';
import { midPoint, unitVec } from './lesson-10-geometry';

/**
 * ============================================================================
 *  UNIT 3, LESSON 1 — «محور ضلع في المثلث» (pages 53–55)
 *  THE FIGURES OF THE LESSON
 * ============================================================================
 *
 *  Every figure is a `midline-figure` FigureSpec (x right, y up) drawn through
 *  the shared `FigureSvg`; every one is `origin: 'authored'` with a caption
 *  that says it is a schematic redraw, while every incidence,
 *  perpendicularity, midpoint, concurrence and printed magnitude is exact by
 *  construction (`lesson-13-geometry.test.ts` re-derives them).
 *
 *  Rules inherited from Lessons 9–11, and enforced here by the lesson's tests:
 *
 *    • A QUESTION figure shows the givens only. `O`, the circle and the
 *      equality marks appear only in SOLUTION figures, where the text has
 *      already established them — never in a figure that is part of the task.
 *    • Panel numbers run RIGHT to LEFT (① on the right), as the Arabic page
 *      reads, so a panel keeps its number between the book and the screen.
 *    • The panels of the opener use the SAME triangle, so a student must read
 *      the MARKS — not the silhouette — to answer the question.
 *    • Every printed prompt that needs a diagram has one BOTH beside the
 *      question and beside its Teacher Area solution, and the solution figure
 *      carries whatever construction the answer introduces.
 *
 *  Source figure → figure id → usage, including every solution figure, is
 *  tabulated in `docs/LESSON-13-FIGURES.md`.
 * ============================================================================
 */

export const CAPTION_SCHEMATIC =
  'رسم تعليمي من إعداد المنصّة — الشكل تخطيطي غير مقيّس، والعلاقات الهندسية المعلَّمة فيه محقَّقة بالحساب.';

const S53_OPENER: SourceRef = { page: 53, locator: 'الانطلاقة نشاط — الوحدة الثالثة' };
const S54_ACTIVITY: SourceRef = { page: 54, locator: 'نشاط — محاور أضلاع المثلث متلاقية' };
const S54_LEARN: SourceRef = { page: 54, locator: 'تعلّم — تعريف محور ضلع وخواصّه' };
const S55_SPECIAL: SourceRef = { page: 55, locator: 'خاصة وتعریف — تلاقي المحاور الثلاثة' };
const S55_CHECK: SourceRef = { page: 55, locator: 'تحقّق من فهمك' };
const S55_PRACTICE: SourceRef = { page: 55, locator: 'تدرّب' };

/* -------------------------------------------------------------------------- */
/*  Builders                                                                   */
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
  options: {
    tone?: FigureTone;
    dashed?: boolean;
    ticks?: 1 | 2 | 3;
    arrow?: boolean;
  } = {},
): NonNullable<FigureSpec['segments']>[number] => ({ from, to, ...options });

const circleEl = (
  at: XY,
  r: number,
  options: { tone?: FigureTone; dashed?: boolean } = {},
): NonNullable<FigureSpec['circles']>[number] => ({ at, r, ...options });

const arcEl = (
  at: XY,
  r: number,
  from: number,
  to: number,
  options: { tone?: FigureTone; dashed?: boolean } = {},
): NonNullable<FigureSpec['arcs']>[number] => ({ at, r, from, to, ...options });

/** A right-angle square at `at`, opening between the two given directions. */
const rightAngle = (at: XY, dirA: XY, dirB: XY): NonNullable<FigureSpec['angles']>[number] => ({
  at,
  from: [at[0] + dirA[0], at[1] + dirA[1]],
  to: [at[0] + dirB[0], at[1] + dirB[1]],
  right: true,
  tone: 'mark',
});

/** A side drawn as two equal halves, each carrying the double tick. */
const halvedSide = (
  p: XY,
  q: XY,
  options: { tone?: FigureTone } = {},
): NonNullable<FigureSpec['segments']> => {
  const m = midPoint(p, q);
  return [
    segment(p, m, { tone: options.tone ?? 'ink', ticks: 2 }),
    segment(m, q, { tone: options.tone ?? 'ink', ticks: 2 }),
  ];
};

/**
 * The right-angle square where a bisector crosses its side.
 *
 * `bisectors[i]` is the bisector of the `i`-th side of `[A,B]`, `[B,C]`, `[A,C]`.
 * A bisector is perpendicular to its side at that side's midpoint, and the
 * figure must SAY so: without the square the drawn line could be any line
 * through the middle.
 */
const bisectorAngles = (
  triangle: { A: XY; B: XY; C: XY },
  bisectors: readonly { from: XY; to: XY }[],
): NonNullable<FigureSpec['angles']> => {
  const sides: [XY, XY][] = [
    [triangle.A, triangle.B],
    [triangle.B, triangle.C],
    [triangle.A, triangle.C],
  ];
  return sides.map(([p, q], index) =>
    rightAngle(
      midPoint(p, q),
      unitVec(p, q),
      unitVec(bisectors[index]!.from, bisectors[index]!.to),
    ),
  );
};

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

const tick = (): { text: string; tone: FigureTone; anchor: 'middle'; ltr: boolean } => ({
  text: '✓',
  tone: 'given',
  anchor: 'middle',
  ltr: true,
});

const shiftXY = (p: XY, dx: number, dy: number): XY => [p[0] + dx, p[1] + dy];

/**
 * The name of a LINE, written at its outer end and pushed further out.
 *
 * `(d)`, `(d′)` and `(d″)` all pass through the same point `O`, so a label placed
 * at the inner end lands on top of its two neighbours. Naming each line where it
 * leaves the drawing keeps the three names apart and, more importantly, ties each
 * name to the line it belongs to.
 */
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

/**
 * Grow the drawing window until every mark of the figure sits inside it.
 *
 * The figures below are authored in mathematical coordinates, so their extent is
 * known only after the last mark is placed; a hand-tuned `viewBox` is exactly the
 * kind of number that goes stale and clips a circle or a label. Measuring the
 * content instead makes clipping impossible by construction. Text is measured
 * with a generous width per character so that a label never touches the edge.
 */
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
  for (const polygon of spec.polygons ?? []) {
    for (const p of polygon.points) add(p[0], p[1]);
  }
  for (const item of spec.segments ?? []) {
    add(item.from[0], item.from[1]);
    add(item.to[0], item.to[1]);
  }
  for (const circle of spec.circles ?? []) {
    add(circle.at[0] - circle.r, circle.at[1] - circle.r);
    add(circle.at[0] + circle.r, circle.at[1] + circle.r);
  }
  for (const arc of spec.arcs ?? []) {
    // Sample the sweep itself: a compass mark is a small stroke of a big circle,
    // and its FULL bounding box would inflate the window by the whole radius.
    const sweep = (((arc.to - arc.from) % 360) + 360) % 360 || 360;
    const steps = 12;
    for (let index = 0; index <= steps; index += 1) {
      const angle = ((arc.from + (sweep * index) / steps) * Math.PI) / 180;
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
    viewBox: {
      x: minX - pad,
      y: minY - pad,
      w: maxX - minX + 2 * pad,
      h: maxY - minY + 2 * pad,
    },
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

/* -------------------------------------------------------------------------- */
/*  1. Page 53 — opener questions ① and ②                                      */
/* -------------------------------------------------------------------------- */

/** ① is the RIGHT-hand panel: the Arabic page numbers its panels right to left. */
const PANEL_DX: Record<PanelId, number> = { one: 17.3, two: 8.65, three: 0 };

const PANEL_FRAMES = [
  { x: 16.7, y: -1.1, w: 7.9, h: 7.5, label: '①' },
  { x: 8.05, y: -1.1, w: 7.9, h: 7.5, label: '②' },
  { x: -0.6, y: -1.1, w: 7.9, h: 7.5, label: '③' },
];

function linePanelContent(panel: OpenerLinePanel): {
  segments: NonNullable<FigureSpec['segments']>;
  points: NonNullable<FigureSpec['points']>;
  angles: NonNullable<FigureSpec['angles']>;
} {
  const t = (p: XY): XY => shiftXY(p, PANEL_DX[panel.id], 0);
  const { triangle } = panel;

  const segments: NonNullable<FigureSpec['segments']> = [
    segment(t(triangle.A), t(triangle.B)),
    segment(t(triangle.B), t(triangle.C)),
    segment(t(triangle.C), t(triangle.A)),
    segment(t(panel.line.from), t(panel.line.to), { tone: 'image' }),
  ];

  if (panel.hasMidpointTicks) {
    // The same mark on both halves of [BC]: the foot is the midpoint.
    segments.push(segment(t(triangle.B), t(panel.midpoint), { ticks: 2 }));
    segments.push(segment(t(panel.midpoint), t(triangle.C), { ticks: 2 }));
  }

  const angles: NonNullable<FigureSpec['angles']> = [];
  if (panel.hasRightAngle) {
    angles.push(
      rightAngle(
        t(panel.foot),
        unitVec(triangle.B, triangle.C),
        unitVec(panel.line.from, panel.line.to),
      ),
    );
  }

  return {
    segments,
    angles,
    points: [
      point(t(triangle.A), 'A', 'n'),
      point(t(triangle.B), 'B', 'sw'),
      point(t(triangle.C), 'C', 'se'),
    ],
  };
}

export const fig13OpenerLinesSpec: FigureBody = (() => {
  const panels = L13_OPENER_LINE_PANELS.map(linePanelContent);
  return {
    frames: PANEL_FRAMES,
    segments: panels.flatMap((panel) => panel.segments),
    angles: panels.flatMap((panel) => panel.angles),
    points: panels.flatMap((panel) => panel.points),
  };
})();

const OPENER_LINES_ALT =
  'اللوحات الثلاث ① و② و③ لسؤالي الافتتاح على المثلث $ABC$ نفسه: في ① عمود من $A$ على $[BC]$ بزاوية قائمة وليس في المنتصف، وفي ② عمود على $[BC]$ في منتصفه بزاوية قائمة وعلامتَي تنصيف، وفي ③ القطعة من $A$ إلى منتصف $[BC]$ بعلامتَي تنصيف ودون زاوية قائمة';

export const fig13OpenerLines: ContentBlock = constructedBlock(
  {
    id: 'fig-l13-opener-lines',
    alt: OPENER_LINES_ALT,
    caption: `صفحة ٥٣ — ${CAPTION_SCHEMATIC} اللوحات الثلاث ترسم المثلث نفسه، ولا يفصل بينها إلا العلامات: ① زاوية قائمة بلا تنصيف، ② زاوية قائمة مع تنصيف $[BC]$، ③ تنصيف بلا زاوية قائمة.`,
    source: S53_OPENER,
  },
  fig13OpenerLinesSpec,
);

function openerLinesSolution(
  id: string,
  answer: PanelId,
  text: { alt: string; caption: string },
): ContentBlock {
  return constructedBlock(
    { id, alt: text.alt, caption: text.caption, source: S53_OPENER },
    {
      ...fig13OpenerLinesSpec,
      texts: [{ ...tick(), at: [PANEL_DX[answer] + 6.75, 5.85] }],
    },
  );
}

export const fig13SolutionQ1: ContentBlock = openerLinesSolution('fig-l13-sol-q1', 'two', {
  alt: `حل السؤال ①: اللوحة ② معلَّمة بعلامة الصحّ. ${OPENER_LINES_ALT}`,
  caption: `صفحة ٥٣ — ${CAPTION_SCHEMATIC} الحل ②: الشكل ② هو محور الضلع $[BC]$، لأنّه العمودي على $[BC]$ في منتصفه (زاوية قائمة، مع علامتَي تنصيف على نصفَي الضلع معًا). أمّا ① فعمودي في نقطة ليست المنتصف (فهو الارتفاع)، وأمّا ③ فيمرّ بالمنتصف دون أن يكون عمودياً (فهو المتوسط).`,
});

export const fig13SolutionQ2: ContentBlock = openerLinesSolution('fig-l13-sol-q2', 'one', {
  alt: `حل السؤال ②: اللوحة ① معلَّمة بعلامة الصحّ. ${OPENER_LINES_ALT}`,
  caption: `صفحة ٥٣ — ${CAPTION_SCHEMATIC} الحل ①: الشكل ① هو الارتفاع المتعلق بالضلع $[BC]$، لأنّه العمود من الرأس $A$ على $[BC]$، ولا يلزم أن يقع في منتصفه (ولا علامة تنصيف فيه). أمّا ② فمحور الضلع، وأمّا ③ فالمتوسط.`,
});

/* -------------------------------------------------------------------------- */
/*  2. Page 53 — opener question ③: a segment and its bisector                 */
/* -------------------------------------------------------------------------- */

/** Question ③ prints no figure, so the diagram appears WITH THE SOLUTION. */
export const fig13SolutionQ3: ContentBlock = constructedBlock(
  {
    id: 'fig-l13-sol-q3',
    alt: 'القطعة $[JK]$ ومحورها $(d)$ عمودي عليها في منتصفها، والنقطة $M$ من $(d)$ موصولة بـ $J$ و$K$ بعلامتين متساويتين',
    caption: `صفحة ٥٣ — ${CAPTION_SCHEMATIC} حل السؤال ③ (المطبوعة بلا شكل): $(d)$ عمودي على $[JK]$ في منتصفه، و$M$ نقطة من $(d)$؛ والعلامتان المتماثلتان على $[MJ]$ و$[MK]$ تعبّران عن $MJ = MK$، فالإجابة ③.`,
    source: S53_OPENER,
  },
  {
    segments: [
      segment(L13_OPENER_SEGMENT.J, L13_OPENER_SEGMENT.K, { tone: 'ink' }),
      segment(L13_OPENER_SEGMENT.from, L13_OPENER_SEGMENT.to, { tone: 'given' }),
      segment(L13_OPENER_SEGMENT.J, L13_OPENER_SEGMENT.bisector.foot, { tone: 'ink', ticks: 2 }),
      segment(L13_OPENER_SEGMENT.bisector.foot, L13_OPENER_SEGMENT.K, { tone: 'ink', ticks: 2 }),
      segment(L13_OPENER_SEGMENT.M, L13_OPENER_SEGMENT.J, { tone: 'image', ticks: 1 }),
      segment(L13_OPENER_SEGMENT.M, L13_OPENER_SEGMENT.K, { tone: 'image', ticks: 1 }),
    ],
    angles: [
      rightAngle(
        L13_OPENER_SEGMENT.bisector.foot,
        unitVec(L13_OPENER_SEGMENT.J, L13_OPENER_SEGMENT.K),
        L13_OPENER_SEGMENT.bisector.dir,
      ),
    ],
    points: [
      point(L13_OPENER_SEGMENT.J, 'J', 'sw'),
      point(L13_OPENER_SEGMENT.K, 'K', 'ne'),
      point(L13_OPENER_SEGMENT.M, 'M', 'w', 'image'),
    ],
    texts: [lineName(L13_OPENER_SEGMENT, '(d)', 'given')],
  },
);

/* -------------------------------------------------------------------------- */
/*  3. Page 53 — opener question ④                                             */
/* -------------------------------------------------------------------------- */

const ANGLE_PANEL_DX: Record<PanelId, number> = { one: 15.2, two: 7.6, three: 0 };

const ANGLE_PANEL_FRAMES = [
  { x: 14.9, y: 0.3, w: 7.3, h: 6.0, label: '①' },
  { x: 7.3, y: 0.3, w: 7.3, h: 6.0, label: '②' },
  { x: -0.3, y: 0.3, w: 7.3, h: 6.0, label: '③' },
];

function anglePanelContent(panel: OpenerAnglePanel): {
  segments: NonNullable<FigureSpec['segments']>;
  angles: NonNullable<FigureSpec['angles']>;
  points: NonNullable<FigureSpec['points']>;
} {
  const t = (p: XY): XY => shiftXY(p, ANGLE_PANEL_DX[panel.id], 0);

  const segments: NonNullable<FigureSpec['segments']> = [
    segment(t(panel.M), t(panel.K), { tone: 'ink', ...(panel.marksSides ? { ticks: 2 } : {}) }),
    segment(t(panel.M), t(panel.A), { tone: 'ink', ...(panel.marksSides ? { ticks: 2 } : {}) }),
    segment(t(panel.M), t(panel.line.to), { tone: 'image' }),
  ];
  const angles: NonNullable<FigureSpec['angles']> = [];

  if (panel.joinsMidpointOfKA) {
    const mid = midPoint(panel.A, panel.K);
    segments.push(segment(t(panel.K), t(mid), { tone: 'ink', ticks: 2 }));
    segments.push(segment(t(mid), t(panel.A), { tone: 'ink', ticks: 2 }));
    if (panel.rightAngleAtA) {
      angles.push(rightAngle(t(panel.A), unitVec(panel.A, panel.K), unitVec(panel.A, panel.M)));
    }
  }

  if (panel.equalAngleMarks) {
    // The two equal angle marks at M — the very marks the question asks about.
    angles.push({
      at: t(panel.M),
      from: t(panel.K),
      to: t(panel.line.to),
      radius: 1.3,
      tone: 'mark',
    });
    angles.push({
      at: t(panel.M),
      from: t(panel.line.to),
      to: t(panel.A),
      radius: 1.3,
      tone: 'mark',
    });
  }

  return {
    segments,
    angles,
    points: [
      point(t(panel.M), 'M', 'sw'),
      point(t(panel.K), 'K', 'nw'),
      point(t(panel.A), 'A', 'se'),
    ],
  };
}

export const fig13OpenerAngleSpec: FigureBody = (() => {
  const panels = L13_OPENER_ANGLE_PANELS.map(anglePanelContent);
  return {
    frames: ANGLE_PANEL_FRAMES,
    segments: panels.flatMap((panel) => panel.segments),
    angles: panels.flatMap((panel) => panel.angles),
    points: panels.flatMap((panel) => panel.points),
  };
})();

const OPENER_ANGLE_ALT =
  'اللوحات الثلاث لسؤال ④ حول الزاوية $\\widehat{AMK}$: في ① الضلعان $[MK]$ و$[MA]$ متساويان والمستقيم المرسوم داخلها، وفي ② مستقيم من $M$ إلى منتصف $[AK]$ والزاوية القائمة في $A$، وفي ③ الضلعان مع قوسَي زاويتين متساويتين عند $M$';

export const fig13OpenerAngle: ContentBlock = constructedBlock(
  {
    id: 'fig-l13-opener-angle',
    alt: OPENER_ANGLE_ALT,
    caption: `صفحة ٥٣ — ${CAPTION_SCHEMATIC} شكل السؤال ④: العلامات في كل لوحة هي التي تحكم. ① يعلّم تساوي الضلعين فقط، و② يعلّم تنصيف $[AK]$ (والقائمة في $A$)، و③ يعلّم تساوي الزاويتين عند $M$.`,
    source: S53_OPENER,
  },
  fig13OpenerAngleSpec,
);

export const fig13SolutionQ4: ContentBlock = constructedBlock(
  {
    id: 'fig-l13-sol-q4',
    alt: `حل السؤال ④: اللوحة ③ معلَّمة بعلامة الصحّ. ${OPENER_ANGLE_ALT}`,
    caption: `صفحة ٥٣ — ${CAPTION_SCHEMATIC} الحل ③: القوسان عند $M$ يحملان العلامة نفسها، فالزاويتان $\\widehat{KMP}$ و$\\widehat{PMA}$ متساويتان ومنصف الزاوية هو المستقيم المرسوم. أمّا ① فيعلّم تساوي الضلعين لا الزاويتين، وأمّا ② فالمستقيم فيه يصل $M$ بمنتصف $[AK]$ (متوسط) والزاويتان عنده غير متساويتين (٣٦٬٩° و٥٣٬١°).`,
    source: S53_OPENER,
  },
  {
    ...fig13OpenerAngleSpec,
    texts: [{ ...tick(), at: [ANGLE_PANEL_DX.three + 6.6, 5.9] }],
  },
);

/* -------------------------------------------------------------------------- */
/*  4. Page 53 — opener question ⑤: the compass arcs                           */
/* -------------------------------------------------------------------------- */

export const fig13OpenerArcsSpec: FigureBody = {
  segments: [
    segment(L13_OPENER_ARCS.A, L13_OPENER_ARCS.B, { tone: 'ink' }),
    segment(L13_OPENER_ARCS.B, L13_OPENER_ARCS.C, { tone: 'ink' }),
    segment(L13_OPENER_ARCS.C, L13_OPENER_ARCS.A, { tone: 'ink' }),
  ],
  arcs: [
    arcEl(
      L13_OPENER_ARCS.A,
      L13_OPENER_ARCS.rA,
      L13_OPENER_ARCS.arcA.from,
      L13_OPENER_ARCS.arcA.to,
    ),
    arcEl(
      L13_OPENER_ARCS.E,
      L13_OPENER_ARCS.rEF,
      L13_OPENER_ARCS.arcE.from,
      L13_OPENER_ARCS.arcE.to,
    ),
    arcEl(
      L13_OPENER_ARCS.F,
      L13_OPENER_ARCS.rEF,
      L13_OPENER_ARCS.arcF.from,
      L13_OPENER_ARCS.arcF.to,
    ),
  ],
  points: [
    point(L13_OPENER_ARCS.A, 'A', 'n'),
    point(L13_OPENER_ARCS.B, 'B', 'sw'),
    point(L13_OPENER_ARCS.C, 'C', 'e'),
    point(L13_OPENER_ARCS.E, 'E', 'sw', 'mark'),
    point(L13_OPENER_ARCS.F, 'F', 'ne', 'mark'),
    point(L13_OPENER_ARCS.P, 'P', 's', 'mark'),
  ],
};

const OPENER_ARCS_ALT =
  'الأقواس الدائرية المتساوية أنصاف الأقطار التي مراكزها $A$ و$E$ و$F$: قوس مركزه $A$ يقطع الضلعين في $E$ و$F$، وقوسان مركزاهما $E$ و$F$ يتقاطعان في $P$';

export const fig13OpenerArcs: ContentBlock = constructedBlock(
  {
    id: 'fig-l13-opener-arcs',
    alt: OPENER_ARCS_ALT,
    caption: `صفحة ٥٣ — ${CAPTION_SCHEMATIC} شكل السؤال ⑤: ثلاثة أقواس لأنصاف أقطار متساوية مراكزها $A$ و$E$ و$F$. المستقيم $[AP)$ غير مرسوم، لأنّ تحديد ما تفيده هذه الأقواس هو المطلوب.`,
    source: S53_OPENER,
  },
  fig13OpenerArcsSpec,
);

export const fig13SolutionQ5: ContentBlock = constructedBlock(
  {
    id: 'fig-l13-sol-q5',
    alt: `${OPENER_ARCS_ALT}. وأُضيف النصف المستقيم $[AP)$ والقوسان المتساويان عند $A$`,
    caption: `صفحة ٥٣ — ${CAPTION_SCHEMATIC} الحل ③: القوسان في $E$ و$F$ لهما نصف القطر نفسه، فـ $PE = PF$، و$AE = AF$ من القوس الأول؛ فالنقطتان $A$ و$P$ تنتميان إلى محور $[EF]$، ومنه يقسم $[AP)$ الزاوية $\\widehat{BAC}$ إلى زاويتين متساويتين.`,
    source: S53_OPENER,
  },
  {
    ...fig13OpenerArcsSpec,
    segments: [
      ...(fig13OpenerArcsSpec.segments ?? []),
      segment(L13_OPENER_ARCS.A, L13_OPENER_ARCS.bisectorTarget, { tone: 'image' }),
      segment(L13_OPENER_ARCS.E, L13_OPENER_ARCS.P, { tone: 'aux', dashed: true }),
      segment(L13_OPENER_ARCS.F, L13_OPENER_ARCS.P, { tone: 'aux', dashed: true }),
    ],
    angles: [
      {
        at: L13_OPENER_ARCS.A,
        from: L13_OPENER_ARCS.E,
        to: L13_OPENER_ARCS.bisectorTarget,
        radius: 0.95,
        tone: 'mark',
      },
      {
        at: L13_OPENER_ARCS.A,
        from: L13_OPENER_ARCS.bisectorTarget,
        to: L13_OPENER_ARCS.F,
        radius: 0.95,
        tone: 'mark',
      },
    ],
  },
);

/* -------------------------------------------------------------------------- */
/*  5. Page 54 — the activity (givens only)                                    */
/* -------------------------------------------------------------------------- */

const activity = buildActivityScene(L13_ACTIVITY_TRIANGLE);

export const fig13ActivityGivenSpec: FigureBody = {
  segments: [
    segment(activity.A, activity.B, { tone: 'ink' }),
    segment(activity.B, activity.C, { tone: 'ink' }),
    segment(activity.C, activity.A, { tone: 'ink' }),
    segment(activity.lines[0]!.from, activity.lines[0]!.to, { tone: 'given' }),
    segment(activity.lines[1]!.from, activity.lines[1]!.to, { tone: 'image' }),
  ],
  points: [
    point(activity.A, 'A', 'n'),
    point(activity.B, 'B', 'sw'),
    point(activity.C, 'C', 'se'),
    point(activity.O, 'O', 'w', 'aux'),
  ],
  texts: [
    lineName(activity.lines[0]!, '(d)', 'given'),
    lineName(activity.lines[1]!, '(d′)', 'image'),
  ],
};

export const fig13ActivityGiven: ContentBlock = constructedBlock(
  {
    id: 'fig-l13-activity-given',
    alt: 'المثلث $ABC$ ومحور ضلعه $[AB]$ وهو $(d)$، ومحور ضلعه $[BC]$ وهو $(d′)$، ونقطة تقاطعهما $O$',
    caption: `صفحة ٥٤ — ${CAPTION_SCHEMATIC} شكل النشاط لا يرسم إلا ما يطلبه النص: المحوران $(d)$ و$(d′)$ ونقطة تقاطعهما $O$. المثلث مختلف الأضلاع وليس قائم الزاوية، كما تشترط الملاحظة المطبوعة.`,
    source: S54_ACTIVITY,
  },
  fig13ActivityGivenSpec,
);

/* -------------------------------------------------------------------------- */
/*  6. Page 54 — the definition figure                                         */
/* -------------------------------------------------------------------------- */

export const fig13DefinitionSpec: FigureBody = {
  segments: [
    segment(L13_DEFINITION.A, L13_DEFINITION.B, { tone: 'ink' }),
    segment(L13_DEFINITION.B, L13_DEFINITION.C, { tone: 'ink' }),
    segment(L13_DEFINITION.C, L13_DEFINITION.A, { tone: 'ink' }),
    segment(L13_DEFINITION.from, L13_DEFINITION.to, { tone: 'given' }),
    segment(L13_DEFINITION.B, L13_DEFINITION.bisector.foot, { tone: 'ink', ticks: 2 }),
    segment(L13_DEFINITION.bisector.foot, L13_DEFINITION.C, { tone: 'ink', ticks: 2 }),
  ],
  angles: [
    rightAngle(
      L13_DEFINITION.bisector.foot,
      unitVec(L13_DEFINITION.B, L13_DEFINITION.C),
      L13_DEFINITION.bisector.dir,
    ),
  ],
  points: [
    point(L13_DEFINITION.A, 'A', 'n'),
    point(L13_DEFINITION.B, 'B', 'sw'),
    point(L13_DEFINITION.C, 'C', 'se'),
  ],
  texts: [lineName(L13_DEFINITION, '(d)', 'given')],
};

export const fig13Definition: ContentBlock = constructedBlock(
  {
    id: 'fig-l13-definition',
    alt: 'المثلث $ABC$ ومحور ضلعه $[BC]$: المستقيم $(d)$ عمودي على $[BC]$ في منتصفه',
    caption: `صفحة ٥٤ — ${CAPTION_SCHEMATIC} شكل التعريف: علامتا التنصيف على $[BC]$ تعنيان أنّ $(d)$ يمرّ بمنتصف الضلع، والزاوية القائمة تعني أنّه عمودي عليه.`,
    source: S54_LEARN,
  },
  fig13DefinitionSpec,
);

/* -------------------------------------------------------------------------- */
/*  7. Page 54 — the properties figure                                         */
/* -------------------------------------------------------------------------- */

export const fig13PropertySpec: FigureBody = {
  segments: [
    segment(L13_PROPERTY.M, L13_PROPERTY.B, { tone: 'ink', ticks: 1 }),
    segment(L13_PROPERTY.M, L13_PROPERTY.C, { tone: 'ink', ticks: 1 }),
    segment(L13_PROPERTY.B, L13_PROPERTY.C, { tone: 'ink' }),
    segment(L13_PROPERTY.from, L13_PROPERTY.to, { tone: 'given' }),
    segment(L13_PROPERTY.B, L13_PROPERTY.bisector.foot, { tone: 'ink', ticks: 2 }),
    segment(L13_PROPERTY.bisector.foot, L13_PROPERTY.C, { tone: 'ink', ticks: 2 }),
  ],
  points: [
    point(L13_PROPERTY.M, 'M', 'n', 'ink'),
    point(L13_PROPERTY.B, 'B', 'sw'),
    point(L13_PROPERTY.C, 'C', 'se'),
  ],
  texts: [lineName(L13_PROPERTY, '(d)', 'given')],
};

export const fig13Property: ContentBlock = constructedBlock(
  {
    id: 'fig-l13-property',
    alt: 'المثلث $MBC$ والنقطة $M$ على محور $[BC]$، والقطعتان $[MB]$ و$[MC]$ تحملان العلامة نفسها',
    caption: `صفحة ٥٤ — ${CAPTION_SCHEMATIC} شكل الخواصّ: $(d)$ محور $[BC]$ و$M$ نقطة منه، فـ $MB = MC$؛ والعلامة نفسها على $[MB]$ و$[MC]$ تعبيراً عن هذه المساواة.`,
    source: S54_LEARN,
  },
  fig13PropertySpec,
);

/* -------------------------------------------------------------------------- */
/*  8. Page 55 — «خاصة وتعریف»: the three panels                               */
/* -------------------------------------------------------------------------- */

/** The three panels, ③ leftmost, exactly as the page prints them. */
const SPECIAL_FRAME_W = 10.2;
const SPECIAL_PANEL_GAP = 0.4;

const SPECIAL_FRAMES = [0, 1, 2].map((index) => ({
  x: (2 - index) * (SPECIAL_FRAME_W + SPECIAL_PANEL_GAP),
  y: -1.0,
  w: SPECIAL_FRAME_W,
  h: 10.0,
  label: ['①', '②', '③'][index]!,
}));

/**
 * A panel of «خاصة وتعریف».
 *
 * Each panel is placed by its CIRCUMCIRCLE, not by its vertices: `O` goes to the
 * centre of the frame and the whole scene is scaled about `O`. The circle is the
 * biggest thing in the drawing, so centring it is what guarantees that no arc,
 * vertex or letter runs over the frame — in the obtuse panel the centre sits far
 * outside the triangle and a vertex-based layout would push the circle out.
 */
const SPECIAL_SCALE = 0.88;

/**
 * The printed names of the three bisectors, in `bisectors` order.
 *
 * `bisectors[0]` bisects `[AB]`, `[1]` bisects `[BC]` and `[2]` bisects `[AC]`.
 * The page names each line where it leaves the circle: `(d₁)` low on the right,
 * for the bisector of the leg `[AB]` that runs down-right; `(d₂)` low in the
 * middle, for the bisector of `[BC]` that runs vertical; `(d₃)` low on the left,
 * for the bisector of `[AC]` that runs down-left. The same three names go on the
 * same three lines in every panel, so the panels can be read against each other.
 */
const SPECIAL_BISECTOR_NAMES = ['(d₁)', '(d₂)', '(d₃)'] as const;

function specialPanelContent(
  scene: (typeof L13_SPECIAL_CASES)[number],
  frame: (typeof SPECIAL_FRAMES)[number],
): FigureBody {
  const centre: XY = [frame.x + frame.w / 2, frame.y + frame.h / 2];
  const t = (p: XY): XY => [
    centre[0] + SPECIAL_SCALE * (p[0] - scene.O[0]),
    centre[1] + SPECIAL_SCALE * (p[1] - scene.O[1]),
  ];
  const A = t(scene.A);
  const B = t(scene.B);
  const C = t(scene.C);
  const O = t(scene.O);
  const R = scene.R * SPECIAL_SCALE;

  /**
   * The three lines, drawn the way the page draws them: each is the full chord
   * of the circumcircle through its foot and `O`, and the page writes its name
   * where that chord leaves the circle at the bottom. Drawing the chord rather
   * than a stroke that stops at `O` is what gives every line an outer end of its
   * own — with short strokes the three lines end together at `O` and their names
   * would have to be written on top of it, or in the empty ring with nothing to
   * attach them to.
   */
  const RIM_OVERHANG = 0.35;
  const drawn = scene.bisectors.map((item) => {
    const from = t(item.from);
    const to = t(item.to);
    const dx = to[0] - from[0];
    const dy = to[1] - from[1];
    const length = Math.hypot(dx, dy) || 1;
    const dir: XY = [dx / length, dy / length];
    const rim = (sign: number): XY => [
      O[0] + dir[0] * sign * (R + RIM_OVERHANG),
      O[1] + dir[1] * sign * (R + RIM_OVERHANG),
    ];
    const up = rim(1);
    const down = rim(-1);
    return { from: up, to: down, named: down[1] < up[1] ? down : up };
  });

  /** Where the letters `A`, `B`, `C`, `O` stand, and how much room they need. */
  const letters: XY[] = [
    [A[0], A[1] + 1.0],
    [B[0] - 1.0, B[1]],
    [C[0] + 1.0, C[1]],
    [O[0], O[1] - 0.9],
  ];

  /**
   * The three names, written just outside the rim on their own chord's lower end.
   *
   * `(d₁)` names the bisector of `[AB]`, `(d₂)` the bisector of `[BC]` and `(d₃)`
   * the bisector of `[AC]` — the same three lines in all three panels. The name
   * is set at `R + 1` from `O` on its own radius; when that spot would sit on a
   * letter, on another name, or outside the frame, it turns along the rim in
   * small steps (and by never more than 31°) until it is clear. The search is
   * ordered and has no randomness, so the figure is identical on every build.
   */
  const NAME_RING = R + 1.0;
  const taken: XY[] = [];
  const names = drawn.map(({ named }, index) => {
    const angle = Math.atan2(named[1] - O[1], named[0] - O[0]);
    const at = (turn: number): XY => [
      O[0] + Math.cos(angle + turn) * NAME_RING,
      O[1] + Math.sin(angle + turn) * NAME_RING,
    ];
    const fits = (p: XY): boolean =>
      p[0] > frame.x + 1.0 &&
      p[0] < frame.x + frame.w - 1.0 &&
      p[1] > frame.y + 0.6 &&
      p[1] < frame.y + frame.h - 1.6 &&
      letters.every((q) => Math.hypot(p[0] - q[0], p[1] - q[1]) > 1.7) &&
      taken.every((q) => Math.hypot(p[0] - q[0], p[1] - q[1]) > 2.2);
    let spot = at(0);
    for (const turn of [0, 0.18, -0.18, 0.36, -0.36, 0.54, -0.54]) {
      const candidate = at(turn);
      if (fits(candidate)) {
        spot = candidate;
        break;
      }
    }
    taken.push(spot);
    return label(spot, SPECIAL_BISECTOR_NAMES[index]!, { tone: 'given' });
  });

  return {
    segments: [
      segment(A, B, { tone: 'ink' }),
      segment(B, C, { tone: 'ink' }),
      segment(C, A, { tone: 'ink' }),
      ...drawn.map(({ from, to }) => segment(from, to, { tone: 'given' })),
    ],
    circles: [circleEl(O, R, { tone: 'image' })],
    points: [
      point(A, 'A', 'n'),
      point(B, 'B', 'w'),
      point(C, 'C', 'e'),
      point(O, 'O', 's', 'given'),
    ],
    texts: names,
    // The page marks the right angle at `A` in the right-triangle panel: without
    // the square, that panel would only be the one with `O` on a side, and the
    // 90° the lesson talks about would be asserted by the caption instead of
    // shown by the figure.
    ...(scene.id === 'right'
      ? {
          angles: [rightAngle(A, unitVec(scene.A, scene.B), unitVec(scene.A, scene.C))],
        }
      : {}),
  };
}

export const fig13SpecialCasesSpec: FigureBody = (() => {
  const panels = L13_SPECIAL_CASES.map((scene, index) =>
    specialPanelContent(scene, SPECIAL_FRAMES[index]!),
  );
  // Provisional window around the three frames; `constructedBlock` refits it to
  // the ink that is actually drawn.
  const first = SPECIAL_FRAMES[0]!;
  const last = SPECIAL_FRAMES[SPECIAL_FRAMES.length - 1]!;
  return {
    viewBox: {
      x: first.x - 0.5,
      y: first.y - 0.5,
      w: last.x + last.w - first.x + 1,
      h: first.h + 1,
    },
    frames: SPECIAL_FRAMES,
    circles: panels.flatMap((panel) => panel.circles ?? []),
    segments: panels.flatMap((panel) => panel.segments ?? []),
    angles: panels.flatMap((panel) => panel.angles ?? []),
    points: panels.flatMap((panel) => panel.points ?? []),
    texts: panels.flatMap((panel) => panel.texts ?? []),
  };
})();

export const fig13SpecialCases: ContentBlock = constructedBlock(
  {
    id: 'fig-l13-special-cases',
    alt: 'ثلاث حالات لمثلث ومحاوره الثلاثة المسماة $(d_1)$ و$(d_2)$ و$(d_3)$ ودائرته المارّة برؤوسه: ① مثلث حاد الزوايا و$O$ داخله، ② مثلث منفرج في $\\widehat{A}$ و$O$ خارجه، ③ مثلث قائم في $\\widehat{A}$ — والزاوية القائمة معلَّمة عند $A$ — و$O$ في منتصف الوتر $[BC]$',
    caption: `صفحة ٥٥ — ${CAPTION_SCHEMATIC} اللوحات الثلاث هي أشكال الصفحة: ① حاد الزوايا و$O$ داخله، ② منفرج في $\\widehat{A}$ و$O$ خارج المثلث في الجهة المقابلة لـ $[BC]$، ③ قائم في $\\widehat{A}$ و$O$ منتصف الوتر $[BC]$. في الحالات الثلاث تمرّ الدائرة بالرؤوس الثلاثة و$OA = OB = OC$.`,
    source: S55_SPECIAL,
  },
  fig13SpecialCasesSpec,
);

/* -------------------------------------------------------------------------- */
/*  9. Page 54/55 — the compass arcs `(B)` and `(C)`                           */
/* -------------------------------------------------------------------------- */

const ARC_PANEL_SEGMENTS: NonNullable<FigureSpec['segments']> = [
  segment(L13_SEGMENT_ARCS.B, L13_SEGMENT_ARCS.C, { tone: 'ink' }),
  segment(L13_SEGMENT_ARCS.from, L13_SEGMENT_ARCS.to, { tone: 'given' }),
  segment(L13_SEGMENT_ARCS.B, L13_SEGMENT_ARCS.bisector.foot, { tone: 'ink', ticks: 2 }),
  segment(L13_SEGMENT_ARCS.bisector.foot, L13_SEGMENT_ARCS.C, { tone: 'ink', ticks: 2 }),
];

const ARC_PANEL_ARCS: NonNullable<FigureSpec['arcs']> = L13_SEGMENT_ARCS.shortArcs.map((arc) =>
  arcEl(arc.at, arc.r, arc.from, arc.to, { tone: 'aux' }),
);

export const fig13SolutionActivityArcs: ContentBlock = constructedBlock(
  {
    id: 'fig-l13-sol-activity-arcs',
    alt: 'قوسان متساوي نصفَي القطر مركزاهما $B$ و$C$ يتقاطعان في نقطتين، والمستقيم المارّ بهما هو محور الضلع $[BC]$',
    caption: `صفحة ٥٤ — ${CAPTION_SCHEMATIC} حل السؤال ④ من النشاط: القوسان مركزاهما $B$ و$C$ ولهما نصف القطر نفسه، فكلّ نقطة من نقطتَي تقاطعهما على المسافة نفسها من $B$ ومن $C$؛ فالمستقيم المارّ بهما هو محور $[BC]$، والإجابة ②.`,
    source: S54_ACTIVITY,
  },
  {
    arcs: ARC_PANEL_ARCS,
    segments: ARC_PANEL_SEGMENTS,
    angles: [
      rightAngle(
        L13_SEGMENT_ARCS.bisector.foot,
        unitVec(L13_SEGMENT_ARCS.B, L13_SEGMENT_ARCS.C),
        L13_SEGMENT_ARCS.bisector.dir,
      ),
    ],
    points: [
      point(L13_SEGMENT_ARCS.B, 'B', 'w'),
      point(L13_SEGMENT_ARCS.C, 'C', 'e'),
      point(L13_SEGMENT_ARCS.P1, 'P', 'n', 'mark'),
      point(L13_SEGMENT_ARCS.P2, 'Q', 's', 'mark'),
    ],
    texts: [lineName({ from: L13_SEGMENT_ARCS.from, to: L13_SEGMENT_ARCS.to }, '(d)', 'given')],
  },
);

/* -------------------------------------------------------------------------- */
/*  10. Page 54 — the activity solutions, stage by stage                       */
/* -------------------------------------------------------------------------- */

type ActivityStage = 'construct' | 'equal' | 'third' | 'circle' | 'points';

function activitySolutionSpec(stage: ActivityStage): FigureBody {
  const segments: NonNullable<FigureSpec['segments']> = [
    segment(activity.A, activity.B, { tone: 'ink' }),
    segment(activity.B, activity.C, { tone: 'ink' }),
    segment(activity.C, activity.A, { tone: 'ink' }),
    segment(activity.lines[0]!.from, activity.lines[0]!.to, { tone: 'given' }),
    segment(activity.lines[1]!.from, activity.lines[1]!.to, { tone: 'image' }),
    // The two midpoints the construction cuts at, with their right angles.
    segment(activity.A, activity.d.foot, { tone: 'ink', ticks: 2 }),
    segment(activity.d.foot, activity.B, { tone: 'ink', ticks: 2 }),
    segment(activity.B, activity.dPrime.foot, { tone: 'ink', ticks: 2 }),
    segment(activity.dPrime.foot, activity.C, { tone: 'ink', ticks: 2 }),
  ];
  const angles: NonNullable<FigureSpec['angles']> = [
    rightAngle(activity.d.foot, unitVec(activity.A, activity.B), activity.d.dir),
    rightAngle(activity.dPrime.foot, unitVec(activity.B, activity.C), activity.dPrime.dir),
  ];
  const points: NonNullable<FigureSpec['points']> = [
    point(activity.A, 'A', 'n'),
    point(activity.B, 'B', 'sw'),
    point(activity.C, 'C', 'se'),
    point(activity.O, 'O', 'sw', 'aux'),
  ];
  const texts: NonNullable<FigureSpec['texts']> = [
    lineName(activity.lines[0]!, '(d)', 'given'),
    lineName(activity.lines[1]!, '(d′)', 'image'),
  ];
  const circles: NonNullable<FigureSpec['circles']> = [];

  if (stage !== 'construct') {
    // The three radii, carrying ONE mark: OA = OB = OC.
    segments.push(segment(activity.O, activity.A, { tone: 'aux', ticks: 1 }));
    segments.push(segment(activity.O, activity.B, { tone: 'aux', ticks: 1 }));
    segments.push(segment(activity.O, activity.C, { tone: 'aux', ticks: 1 }));
  }

  if (stage === 'third' || stage === 'circle' || stage === 'points') {
    segments.push(segment(activity.A, activity.dSecond.foot, { tone: 'ink', ticks: 2 }));
    segments.push(segment(activity.dSecond.foot, activity.C, { tone: 'ink', ticks: 2 }));
    segments.push(
      segment(activity.lines[2]!.from, activity.lines[2]!.to, { tone: 'aux', dashed: true }),
    );
    angles.push(
      rightAngle(activity.dSecond.foot, unitVec(activity.A, activity.C), activity.dSecond.dir),
    );
    texts.push(lineName(activity.lines[2]!, '(d″)', 'aux'));
  }

  if (stage === 'circle' || stage === 'points') {
    circles.push(circleEl(activity.O, activity.R, { tone: 'image' }));
  }

  if (stage === 'points') {
    // A further point of the circle, reached by a radius: ③ asks for such points.
    const onCircle: XY = [
      activity.O[0] + activity.R * Math.cos((208 * Math.PI) / 180),
      activity.O[1] + activity.R * Math.sin((208 * Math.PI) / 180),
    ];
    points.push(point(onCircle, 'N', 'w', 'image'));
    segments.push(segment(activity.O, onCircle, { tone: 'aux', dashed: true }));
  }

  return {
    segments,
    circles,
    angles,
    points,
    texts,
  };
}

export const fig13SolutionActivityConstruct: ContentBlock = constructedBlock(
  {
    id: 'fig-l13-sol-activity-construct',
    alt: 'حل السؤال ① من النشاط: محور $[AB]$ هو $(d)$ ومحور $[BC]$ هو $(d′)$، وكلّ منهما عمودي في منتصف ضلعه، ونقطة تقاطعهما $O$',
    caption: `صفحة ٥٤ — ${CAPTION_SCHEMATIC} حل ①: يُنشأ $(d)$ عمودياً على $[AB]$ في منتصفه، و$(d′)$ عمودياً على $[BC]$ في منتصفه (العلامة المزدوجة على كلّ نصف، والقائمة عند القدم)، ثم تُرمز نقطة تقاطعهما بـ $O$.`,
    source: S54_ACTIVITY,
  },
  activitySolutionSpec('construct'),
);

export const fig13SolutionActivityEqual: ContentBlock = constructedBlock(
  {
    id: 'fig-l13-sol-activity-equal',
    alt: 'حل السؤال ②: القطعتان $[OA]$ و$[OB]$ متساويتان ($O$ على $(d)$)، والقطعتان $[OB]$ و$[OC]$ متساويتان ($O$ على $(d′)$)، والقطع الثلاث تحمل العلامة نفسها',
    caption: `صفحة ٥٤ — ${CAPTION_SCHEMATIC} حل ②①: لأنّ $O$ تنتمي إلى $(d)$ محور $[AB]$ فإنّ $OA = OB$، ولأنّها تنتمي إلى $(d′)$ محور $[BC]$ فإنّ $OB = OC$؛ وبما أنّ القطعتين تساويان القطعة نفسها فإنّ $OA = OB = OC$، وهي ما تعبّر عنه العلامة الواحدة على القطع الثلاث.`,
    source: S54_ACTIVITY,
  },
  activitySolutionSpec('equal'),
);

export const fig13SolutionActivityThird: ContentBlock = constructedBlock(
  {
    id: 'fig-l13-sol-activity-third',
    alt: 'حل السؤال ②②: $(d″)$ محور $[AC]$ يمرّ بالنقطة $O$، لأنّ $OA = OC$',
    caption: `صفحة ٥٤ — ${CAPTION_SCHEMATIC} حل ②②: من الفقرة السابقة $OA = OC$، فالنقطة $O$ على المسافة نفسها من $A$ ومن $C$، ومنه تنتمي إلى محور $[AC]$ أي إلى $(d″)$؛ فالمحاور الثلاثة تلتقي في $O$.`,
    source: S54_ACTIVITY,
  },
  activitySolutionSpec('third'),
);

export const fig13SolutionActivityCircle: ContentBlock = constructedBlock(
  {
    id: 'fig-l13-sol-activity-circle',
    alt: 'حل السؤال ③: الدائرة التي مركزها $O$ نصف قطرها $OA$ تمرّ بـ $A$ و$B$ و$C$',
    caption: `صفحة ٥٤ — ${CAPTION_SCHEMATIC} حل ③: بما أنّ $OA = OB = OC$، فالدائرة التي مركزها $O$ والمارة بـ $A$ تمرّ أيضاً بـ $B$ وبـ $C$: إنها «الدائرة المارّة برؤوس المثلث».`,
    source: S54_ACTIVITY,
  },
  activitySolutionSpec('circle'),
);

export const fig13SolutionActivityPoints: ContentBlock = constructedBlock(
  {
    id: 'fig-l13-sol-activity-points',
    alt: 'حل السؤال ③③: نقاط تمرّ منها الدائرة، مثل $A$ و$B$ و$C$ وكلّ نقطة $N$ تحقق $ON = OA$',
    caption: `صفحة ٥٤ — ${CAPTION_SCHEMATIC} حل ③③: تمرّ الدائرة بالرؤوس $A$ و$B$ و$C$، وبكلّ نقطة $N$ تحقّق $ON = OA$ (رسمت المنصّة إحداها)؛ فالدائرة تحوي ما لا نهاية من النقاط، ومنها الرؤوس الثلاثة.`,
    source: S54_ACTIVITY,
  },
  activitySolutionSpec('points'),
);

/* -------------------------------------------------------------------------- */
/*  11. Page 55 — «تحقّق من فهمك»: the solution                                */
/* -------------------------------------------------------------------------- */

export const fig13SolutionCheck: ContentBlock = constructedBlock(
  {
    id: 'fig-l13-sol-check',
    alt: 'حل «تحقّق من فهمك»: المحاور الثلاثة لأضلاع المثلث المدرج في الدائرة تلتقي في مركزها $O$',
    caption: `صفحة ٥٥ — ${CAPTION_SCHEMATIC} الحل: المحاور الثلاثة تلتقي في نقطة واحدة هي $O$، وهي مركز الدائرة التي اختيرت في البداية؛ فمحاور أضلاع المثلث تتلاقى دائماً في نقطة واحدة.`,
    source: S55_CHECK,
  },
  {
    circles: [circleEl(L13_CHECK.O, L13_CHECK.R, { tone: 'image' })],
    segments: [
      ...halvedSide(L13_CHECK.A, L13_CHECK.B),
      ...halvedSide(L13_CHECK.B, L13_CHECK.C),
      ...halvedSide(L13_CHECK.C, L13_CHECK.A),
      ...L13_CHECK.bisectors.map((item) => segment(item.from, item.to, { tone: 'given' })),
      segment(L13_CHECK.O, L13_CHECK.A, { tone: 'aux', dashed: true, ticks: 1 }),
      segment(L13_CHECK.O, L13_CHECK.B, { tone: 'aux', dashed: true, ticks: 1 }),
      segment(L13_CHECK.O, L13_CHECK.C, { tone: 'aux', dashed: true, ticks: 1 }),
    ],
    angles: bisectorAngles(L13_CHECK, L13_CHECK.bisectors),
    points: [
      point(L13_CHECK.A, 'A', 'n'),
      point(L13_CHECK.B, 'B', 'w'),
      point(L13_CHECK.C, 'C', 'e'),
      point(L13_CHECK.O, 'O', 's', 'given'),
    ],
  },
);

/**
 * «تحقّق من فهمك» ② — the three bisectors, drawn with the compass.
 *
 * Same verified configuration as the complete solution above, minus the three
 * dashed radii: at this stage the student has only just constructed the
 * bisectors, and the concurrence at `O` is the discovery of question ③, so it is
 * deliberately *not* drawn here.
 */
export const fig13SolutionCheckBisectors: ContentBlock = constructedBlock(
  {
    id: 'fig-l13-sol-check-bisectors',
    alt: 'حل «تحقّق من فهمك» ②: المحاور الثلاثة لأضلاع المثلث $ABC$ مرسومة بالفرجار، كلّ منها عمودي على ضلعه في منتصفه',
    caption: `صفحة ٥٥ — ${CAPTION_SCHEMATIC} حل ②: يُرسم كلّ محور بالفرجار بفتحة واحدة من طرفَي الضلع، وبوصل نقطتَي التقاطع؛ والنتيجة ثلاثة مستقيمات، كلّ منها عمودي على ضلع في منتصفه. نقطة تلاقيها هي موضوع السؤال ③، ولذلك لا تُبرز هنا.`,
    source: S55_CHECK,
  },
  {
    circles: [circleEl(L13_CHECK.O, L13_CHECK.R, { tone: 'image' })],
    segments: [
      ...halvedSide(L13_CHECK.A, L13_CHECK.B),
      ...halvedSide(L13_CHECK.B, L13_CHECK.C),
      ...halvedSide(L13_CHECK.C, L13_CHECK.A),
      ...L13_CHECK.bisectors.map((item) => segment(item.from, item.to, { tone: 'given' })),
    ],
    angles: bisectorAngles(L13_CHECK, L13_CHECK.bisectors),
    points: [
      point(L13_CHECK.A, 'A', 'n'),
      point(L13_CHECK.B, 'B', 'w'),
      point(L13_CHECK.C, 'C', 'e'),
      point(L13_CHECK.O, 'O', 's', 'given'),
    ],
  },
);

/* -------------------------------------------------------------------------- */
/*  12. Page 55 — «تحقّق من فهمك»: the given setup                             */
/* -------------------------------------------------------------------------- */

export const fig13CheckSetupSpec: FigureBody = {
  circles: [circleEl(L13_CHECK.O, L13_CHECK.R, { tone: 'given' })],
  segments: [
    segment(L13_CHECK.A, L13_CHECK.B, { tone: 'ink' }),
    segment(L13_CHECK.B, L13_CHECK.C, { tone: 'ink' }),
    segment(L13_CHECK.C, L13_CHECK.A, { tone: 'ink' }),
  ],
  points: [
    point(L13_CHECK.A, 'A', 'n'),
    point(L13_CHECK.B, 'B', 'w'),
    point(L13_CHECK.C, 'C', 'e'),
    point(L13_CHECK.O, 'O', 's', 'given'),
  ],
};

export const fig13CheckSetup: ContentBlock = constructedBlock(
  {
    id: 'fig-l13-check-setup',
    alt: 'دائرة مركزها $O$ وعليها ثلاث نقاط $A$ و$B$ و$C$ موصولة بالمثلث $ABC$',
    caption: `صفحة ٥٥ — ${CAPTION_SCHEMATIC} حالة البداية في «تحقّق من فهمك»: دائرة مركزها $O$ وثلاث نقاط عليها. المحاور الثلاثة غير مرسومة، فهي عمل التلميذ بالفرجار.`,
    source: S55_CHECK,
  },
  fig13CheckSetupSpec,
);

/* -------------------------------------------------------------------------- */
/*  13. Page 55 — تدرّب ①                                                      */
/* -------------------------------------------------------------------------- */

/**
 * «تدرّب ①» — the givens.
 *
 * The two lines are BISECTORS, and a bisector is only that if the figure says
 * so: each carries its right-angle square at the foot and the two equal halves
 * of its side. Without the marks the drawing would merely claim to be the
 * configuration of the exercise.
 */
const PRACTICE_ONE_HALVES: NonNullable<FigureSpec['segments']> = [
  segment(L13_PRACTICE_ONE.A, midPoint(L13_PRACTICE_ONE.A, L13_PRACTICE_ONE.B), {
    tone: 'ink',
    ticks: 2,
  }),
  segment(midPoint(L13_PRACTICE_ONE.A, L13_PRACTICE_ONE.B), L13_PRACTICE_ONE.B, {
    tone: 'ink',
    ticks: 2,
  }),
  segment(L13_PRACTICE_ONE.B, midPoint(L13_PRACTICE_ONE.B, L13_PRACTICE_ONE.C), {
    tone: 'ink',
    ticks: 2,
  }),
  segment(midPoint(L13_PRACTICE_ONE.B, L13_PRACTICE_ONE.C), L13_PRACTICE_ONE.C, {
    tone: 'ink',
    ticks: 2,
  }),
];

export const fig13PracticeOneGivenSpec: FigureBody = {
  segments: [
    segment(L13_PRACTICE_ONE.A, L13_PRACTICE_ONE.B, { tone: 'ink' }),
    segment(L13_PRACTICE_ONE.B, L13_PRACTICE_ONE.C, { tone: 'ink' }),
    segment(L13_PRACTICE_ONE.C, L13_PRACTICE_ONE.A, { tone: 'ink' }),
    ...PRACTICE_ONE_HALVES,
    segment(L13_PRACTICE_ONE.spans[0]!.from, L13_PRACTICE_ONE.spans[0]!.to, { tone: 'given' }),
    segment(L13_PRACTICE_ONE.spans[1]!.from, L13_PRACTICE_ONE.spans[1]!.to, { tone: 'image' }),
  ],
  angles: [
    rightAngle(
      midPoint(L13_PRACTICE_ONE.A, L13_PRACTICE_ONE.B),
      unitVec(L13_PRACTICE_ONE.A, L13_PRACTICE_ONE.B),
      unitVec(L13_PRACTICE_ONE.spans[0]!.from, L13_PRACTICE_ONE.spans[0]!.to),
    ),
    rightAngle(
      midPoint(L13_PRACTICE_ONE.B, L13_PRACTICE_ONE.C),
      unitVec(L13_PRACTICE_ONE.B, L13_PRACTICE_ONE.C),
      unitVec(L13_PRACTICE_ONE.spans[1]!.from, L13_PRACTICE_ONE.spans[1]!.to),
    ),
  ],
  points: [
    point(L13_PRACTICE_ONE.A, 'A', 'n'),
    point(L13_PRACTICE_ONE.B, 'B', 'sw'),
    point(L13_PRACTICE_ONE.C, 'C', 'se'),
    point(L13_PRACTICE_ONE.M, 'M', 'w', 'aux'),
  ],
};

export const fig13PracticeOneGiven: ContentBlock = constructedBlock(
  {
    id: 'fig-l13-practice-one-given',
    alt: 'المثلث $ABC$ ومحور ضلعه $[AB]$ ومحور ضلعه $[BC]$، ونقطة تقاطعهما $M$',
    caption: `صفحة ٥٥ — ${CAPTION_SCHEMATIC} معطيات «تدرّب ①»: محورا $[AB]$ و$[BC]$ ونقطة تقاطعهما $M$. المطلوب إثبات أنّ $MAC$ متساوي الساقين، فلا يُرسم أيّ تساوٍ في هذه اللوحة.`,
    source: S55_PRACTICE,
  },
  fig13PracticeOneGivenSpec,
);

export const fig13SolutionPracticeOne: ContentBlock = constructedBlock(
  {
    id: 'fig-l13-sol-practice-one',
    alt: 'حل «تدرّب ①»: $M$ على محورَي $[AB]$ و$[BC]$، فالقطع $[MA]$ و$[MB]$ و$[MC]$ متساوية، والمثلث $MAC$ متساوي الساقين في $M$',
    caption: `صفحة ٥٥ — ${CAPTION_SCHEMATIC} الحل: $M$ تنتمي إلى محور $[AB]$ فـ $MA = MB$، وإلى محور $[BC]$ فـ $MB = MC$؛ إذن $MA = MC$، فالمثلث $MAC$ متساوي الساقين رأسه $M$.`,
    source: S55_PRACTICE,
  },
  {
    ...fig13PracticeOneGivenSpec,
    // No fill: a shaded MAC would bury the marks that prove it is isosceles.
    segments: [
      ...(fig13PracticeOneGivenSpec.segments ?? []),
      segment(L13_PRACTICE_ONE.M, L13_PRACTICE_ONE.A, { tone: 'image', ticks: 1 }),
      segment(L13_PRACTICE_ONE.M, L13_PRACTICE_ONE.B, { tone: 'aux', dashed: true, ticks: 1 }),
      segment(L13_PRACTICE_ONE.M, L13_PRACTICE_ONE.C, { tone: 'image', ticks: 1 }),
    ],
  },
);

/* -------------------------------------------------------------------------- */
/*  14. Page 55 — تدرّب ②                                                      */
/* -------------------------------------------------------------------------- */

export const fig13PracticeTwoGivenSpec: FigureBody = {
  segments: [
    segment(L13_PRACTICE_TWO.A, L13_PRACTICE_TWO.B, { tone: 'ink', ticks: 1 }),
    segment(L13_PRACTICE_TWO.B, L13_PRACTICE_TWO.C, { tone: 'ink' }),
    segment(L13_PRACTICE_TWO.C, L13_PRACTICE_TWO.A, { tone: 'ink', ticks: 1 }),
    segment(L13_PRACTICE_TWO.B, L13_PRACTICE_TWO.D, { tone: 'ink' }),
    segment(L13_PRACTICE_TWO.D, L13_PRACTICE_TWO.A, { tone: 'ink', ticks: 1 }),
  ],
  points: [
    point(L13_PRACTICE_TWO.A, 'A', 'n'),
    point(L13_PRACTICE_TWO.B, 'B', 'sw'),
    point(L13_PRACTICE_TWO.C, 'C', 'se'),
    point(L13_PRACTICE_TWO.D, 'D', 'ne'),
  ],
};

export const fig13PracticeTwoGiven: ContentBlock = constructedBlock(
  {
    id: 'fig-l13-practice-two-given',
    alt: 'المثلثان $ABC$ و$ABD$ متساويا الساقين في $A$ ويشتركان في الضلع $[AB]$',
    caption: `صفحة ٥٥ — ${CAPTION_SCHEMATIC} معطيات «تدرّب ②»: المثلثان متساويا الساقين في $A$، أي $AB = AC$ و$AB = AD$، والعلامة نفسها على الأضلاع الثلاثة. مركز الدائرة المارّة بـ $B$ و$C$ و$D$ هو المطلوب.`,
    source: S55_PRACTICE,
  },
  fig13PracticeTwoGivenSpec,
);

export const fig13SolutionPracticeTwo: ContentBlock = constructedBlock(
  {
    id: 'fig-l13-sol-practice-two',
    alt: 'حل «تدرّب ②»: الدائرة التي مركزها $A$ وتمرّ بـ $B$ و$C$ و$D$، لأنّ $AB = AC = AD$',
    caption: `صفحة ٥٥ — ${CAPTION_SCHEMATIC} الحل: من تساوي الساقين في المثلثين، $AB = AC$ و$AB = AD$، ومنه $AB = AC = AD$؛ فالنقاط $B$ و$C$ و$D$ على المسافة نفسها من $A$، فمركز الدائرة المارّة بها هو $A$ نفسه.`,
    source: S55_PRACTICE,
  },
  {
    ...fig13PracticeTwoGivenSpec,
    // The circle is the only new ink: AB = AC = AD is already marked on the
    // sides, so re-drawing them dashed would blur the marks instead of adding.
    circles: [circleEl(L13_PRACTICE_TWO.A, L13_PRACTICE_TWO.radius, { tone: 'image' })],
  },
);

/**
 * «تدرّب ②» — the requested drawing.
 *
 * `ارسم شكلًا` asks for the figure the givens describe. That drawing is the
 * given figure itself plus the base `[CD]`, drawn dashed because the printed text
 * only names it indirectly — through «المثلث $BCD$» in the next question. The
 * circle is not drawn here: it is the answer of that question.
 */
export const fig13SolutionPracticeTwoDraw: ContentBlock = constructedBlock(
  {
    id: 'fig-l13-sol-practice-two-draw',
    alt: 'حل «تدرّب ②» (ارسم شكلًا): المثلثان المتساويا الساقين في $A$ مرسومان بفتحة فرجار واحدة، مع القاعدة المتقطّعة $[CD]$',
    caption: `صفحة ٥٥ — ${CAPTION_SCHEMATIC} الرسم المطلوب: القاعدة $[AB]$، ثم النقطتان $C$ و$D$ على قوس واحد مركزه $A$ ونصف قطره $AB$. القطعة $[CD]$ متقطّعة لأنّ النص لا يذكرها إلا بذكر «المثلث $BCD$» في السؤال التالي.`,
    source: S55_PRACTICE,
  },
  {
    ...fig13PracticeTwoGivenSpec,
    segments: [
      ...(fig13PracticeTwoGivenSpec.segments ?? []),
      segment(L13_PRACTICE_TWO.C, L13_PRACTICE_TWO.D, { tone: 'aux', dashed: true }),
    ],
  },
);

/* -------------------------------------------------------------------------- */
/*  15. Page 55 — تدرّب ③                                                      */
/* -------------------------------------------------------------------------- */

export const fig13PracticeThreeGivenSpec: FigureBody = {
  segments: [
    segment(L13_PRACTICE_THREE.A, L13_PRACTICE_THREE.B, { tone: 'ink' }),
    segment(L13_PRACTICE_THREE.B, L13_PRACTICE_THREE.C, { tone: 'ink' }),
    segment(L13_PRACTICE_THREE.C, L13_PRACTICE_THREE.A, { tone: 'ink' }),
  ],
  points: [
    point(L13_PRACTICE_THREE.A, 'A', 'n'),
    point(L13_PRACTICE_THREE.B, 'B', 'sw'),
    point(L13_PRACTICE_THREE.C, 'C', 'se'),
  ],
  texts: [
    label(midPoint(L13_PRACTICE_THREE.A, L13_PRACTICE_THREE.B), '5', { away: [-1.0, 0.3] }),
    label(midPoint(L13_PRACTICE_THREE.B, L13_PRACTICE_THREE.C), '7.5', { away: [0.1, -1.0] }),
    label(midPoint(L13_PRACTICE_THREE.C, L13_PRACTICE_THREE.A), '8', { away: [1.0, 0.3] }),
  ],
};

export const fig13PracticeThreeGiven: ContentBlock = constructedBlock(
  {
    id: 'fig-l13-practice-three-given',
    alt: 'المثلث $ABC$ المطبوع أطوال أضلاعه $AB = 5$ و$BC = 7.5$ و$CA = 8$ بالسنتيمتر',
    caption: `صفحة ٥٥ — ${CAPTION_SCHEMATIC} معطيات «تدرّب ③»: أطوال الأضلاع المطبوعة $5$ و$7.5$ و$8$ (سم). الدوائر الثلاث والمحاور هي عمل التلميذ.`,
    source: S55_PRACTICE,
  },
  fig13PracticeThreeGivenSpec,
);

export const fig13SolutionPracticeThree: ContentBlock = constructedBlock(
  {
    id: 'fig-l13-sol-practice-three',
    alt: 'حل «تدرّب ③»: الدوائر الثلاث المتساوية أنصاف الأقطار مركزها الرؤوس، والمحاور الثلاثة المارّة بنقاط تقاطع كلّ دائرتين، وتلتقي في $O$',
    caption: `صفحة ٥٥ — ${CAPTION_SCHEMATIC} الحل: كلّ دائرتين من الدوائر الثلاث تتقاطعان في نقطتين (لأنّ نصف القطر ٥٬٦ أكبر من نصف أطول ضلع)، والمستقيم المارّ بالنقطتين هو محور الضلع المشترك؛ والمحاور الثلاثة تتلاقى في $O$، مركز الدائرة المارّة بالرؤوس.`,
    source: S55_PRACTICE,
  },
  {
    circles: L13_PRACTICE_THREE.circles.map((item) =>
      circleEl(item.at, item.r, { tone: 'aux', dashed: true }),
    ),
    segments: [
      ...halvedSide(L13_PRACTICE_THREE.A, L13_PRACTICE_THREE.B),
      ...halvedSide(L13_PRACTICE_THREE.B, L13_PRACTICE_THREE.C),
      ...halvedSide(L13_PRACTICE_THREE.C, L13_PRACTICE_THREE.A),
      ...L13_PRACTICE_THREE.bisectors.map((item) => segment(item.from, item.to, { tone: 'given' })),
    ],
    angles: bisectorAngles(L13_PRACTICE_THREE, L13_PRACTICE_THREE.bisectors),
    points: [
      point(L13_PRACTICE_THREE.A, 'A', 'n'),
      point(L13_PRACTICE_THREE.B, 'B', 'w'),
      point(L13_PRACTICE_THREE.C, 'C', 'e'),
      point(L13_PRACTICE_THREE.O, 'O', 's', 'given'),
      point(L13_PRACTICE_THREE.commonChords[0]!.points[0], 'P', 'n', 'mark'),
      point(L13_PRACTICE_THREE.commonChords[0]!.points[1], 'Q', 's', 'mark'),
    ],
  },
);

/* -------------------------------------------------------------------------- */
/*  15b. Page 55 — تدرّب ③, stage by stage (the circles, then the bisectors)   */
/* -------------------------------------------------------------------------- */

/**
 * «تدرّب ③ ②» — the three circles.
 *
 * Three circles of the same radius (r = 5.6 cm > 5 cm, the largest side) centred
 * at the vertices. The radius is large enough for every pair to meet twice,
 * which is exactly the fact question ④ asks the student to notice; the meeting
 * points themselves are the answer of ③ and are not marked yet.
 */
export const fig13SolutionPracticeThreeCircles: ContentBlock = constructedBlock(
  {
    id: 'fig-l13-sol-practice-three-circles',
    alt: 'حل «تدرّب ③②»: ثلاث دوائر أنصاف أقطارها متساوية ومراكزها رؤوس المثلث $ABC$، تتقاطع مثنى مثنى في نقطتين',
    caption: `صفحة ٥٥ — ${CAPTION_SCHEMATIC} حل ②: الفتحة $5.6\\ \\text{cm}$ أكبر من نصف أطول ضلع ($4\\ \\text{cm}$)، فكلّ دائرتين تتقاطعان في نقطتين. لهذا التقاطع وجهان: نقطتا تقاطع دائرتين مركزاهما طرفا ضلع هما نقطتان متساويتا البعد عن طرفَي ذلك الضلع.`,
    source: S55_PRACTICE,
  },
  {
    circles: L13_PRACTICE_THREE.circles.map((item) =>
      circleEl(item.at, item.r, { tone: 'aux', dashed: true }),
    ),
    segments: [
      segment(L13_PRACTICE_THREE.A, L13_PRACTICE_THREE.B, { tone: 'ink' }),
      segment(L13_PRACTICE_THREE.B, L13_PRACTICE_THREE.C, { tone: 'ink' }),
      segment(L13_PRACTICE_THREE.C, L13_PRACTICE_THREE.A, { tone: 'ink' }),
    ],
    points: [
      point(L13_PRACTICE_THREE.A, 'A', 'n'),
      point(L13_PRACTICE_THREE.B, 'B', 'w'),
      point(L13_PRACTICE_THREE.C, 'C', 'e'),
    ],
  },
);

/**
 * «تدرّب ③ ③» — the three bisectors built from those circles.
 *
 * Each bisector is the line through the two meeting points of the two circles
 * centred at the ends of its side (`P` and `Q` on the one drawn for `[BC]`).
 * `O` is left unmarked: naming it is the answer of ④.
 */
export const fig13SolutionPracticeThreeBisectors: ContentBlock = constructedBlock(
  {
    id: 'fig-l13-sol-practice-three-bisectors',
    alt: 'حل «تدرّب ③③»: المحاور الثلاثة، كلّ منها يمرّ بنقطتَي تقاطع دائرتَي طرفَي ضلعه',
    caption: `صفحة ٥٥ — ${CAPTION_SCHEMATIC} حل ③: المستقيم المارّ بنقطتَي تقاطع كلّ دائرتين هو محور الضلع المشترك بين مركزيهما. النقطتان $P$ و$Q$ مثال على ذلك بالنسبة إلى $[BC]$؛ والنقطتان متساويتا البعد عن $B$ وعن $C$ لأنّ نصفَي القطرين متساويان.`,
    source: S55_PRACTICE,
  },
  {
    circles: L13_PRACTICE_THREE.circles.map((item) =>
      circleEl(item.at, item.r, { tone: 'aux', dashed: true }),
    ),
    segments: [
      ...halvedSide(L13_PRACTICE_THREE.A, L13_PRACTICE_THREE.B),
      ...halvedSide(L13_PRACTICE_THREE.B, L13_PRACTICE_THREE.C),
      ...halvedSide(L13_PRACTICE_THREE.C, L13_PRACTICE_THREE.A),
      ...L13_PRACTICE_THREE.bisectors.map((item) => segment(item.from, item.to, { tone: 'given' })),
    ],
    angles: bisectorAngles(L13_PRACTICE_THREE, L13_PRACTICE_THREE.bisectors),
    points: [
      point(L13_PRACTICE_THREE.A, 'A', 'n'),
      point(L13_PRACTICE_THREE.B, 'B', 'w'),
      point(L13_PRACTICE_THREE.C, 'C', 'e'),
      point(L13_PRACTICE_THREE.commonChords[0]!.points[0], 'P', 'n', 'mark'),
      point(L13_PRACTICE_THREE.commonChords[0]!.points[1], 'Q', 's', 'mark'),
    ],
  },
);

/**
 * «النشاط ③②» — «تأمّل ثم اشرح ما سبق».
 *
 * The same verified configuration as ③, re-captioned for the explanation: the
 * circle is drawn from `O` with radius `OA`, and the three equal radii say why
 * `B` and `C` lie on it. A distinct diagram id keeps the two readings of the
 * same figure apart in the Teacher Area.
 */
export const fig13SolutionActivityExplain: ContentBlock = constructedBlock(
  {
    id: 'fig-l13-sol-activity-explain',
    alt: 'حل «تأمّل ثم اشرح ما سبق»: القطع $[OA]$ و$[OB]$ و$[OC]$ تحمل العلامة نفسها، فالنقاط الثلاث على الدائرة نفسها',
    caption: `صفحة ٥٤ — ${CAPTION_SCHEMATIC} شرح ما سبق: نصف القطر اختير $OA$، والقطع الثلاث $[OA]$ و$[OB]$ و$[OC]$ متساوية، فالنقطتان $B$ و$C$ على الدائرة $\\mathcal{C}$ نفسها، والدائرة التي رسمت من $A$ تمرّ بالرؤوس الثلاثة.`,
    source: S54_ACTIVITY,
  },
  activitySolutionSpec('circle'),
);

/* -------------------------------------------------------------------------- */
/*  16. Interactive lab diagram                                               */
/* -------------------------------------------------------------------------- */

export const sideBisectorLabDiagram: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'authored',
  id: 'auth-13-side-bisector-lab',
  renderer: 'side-bisector-lab',
  alt: 'مختبر تفاعلي: تتحرّك $M$ على محور $[BC]$ عند أيّ موضع فيبقى $MB = MC$ دائماً، وتبقى المحاور الثلاثة متلاقية في $O$ والدائرة المارّة بالرؤوس ثابتة',
  caption:
    'مختبر تفاعلي من إعداد المنصّة — حرّك $M$ على محور $[BC]$ وراقب $MB$ و$MC$: لا تنكسر المساواة أبداً، وهذا معنى خاصّة المحور. ثم بدّل نوع المثلث وراقب موضع $O$: داخله في الحاد، وخارجه في المنفرج، وفي منتصف الوتر في القائم.',
  source: S54_ACTIVITY,
  params: {},
};

/* -------------------------------------------------------------------------- */
/*  Exported spec inventory (used by the figure test)                          */
/* -------------------------------------------------------------------------- */

/** The FigureSpec a constructed block actually carries — the single source. */
export function specOf(block: ContentBlock): FigureSpec {
  if (block.type !== 'figure' || block.diagram.kind !== 'constructed') {
    throw new Error('specOf expects a constructed figure block');
  }
  return block.diagram.construction as unknown as FigureSpec;
}

/**
 * Every figure of the lesson, in reading order, taken FROM the blocks that are
 * actually embedded. The inventory therefore cannot drift away from the
 * content: if a figure is dropped from the lesson, it disappears from here too,
 * and the figure test fails.
 */
export const ALL_L13_FIGURE_SPECS: readonly { id: string; spec: FigureSpec }[] = [
  { id: 'fig-l13-opener-lines', spec: specOf(fig13OpenerLines) },
  { id: 'fig-l13-opener-angle', spec: specOf(fig13OpenerAngle) },
  { id: 'fig-l13-opener-arcs', spec: specOf(fig13OpenerArcs) },
  { id: 'fig-l13-activity-given', spec: specOf(fig13ActivityGiven) },
  { id: 'fig-l13-definition', spec: specOf(fig13Definition) },
  { id: 'fig-l13-property', spec: specOf(fig13Property) },
  { id: 'fig-l13-special-cases', spec: specOf(fig13SpecialCases) },
  { id: 'fig-l13-check-setup', spec: specOf(fig13CheckSetup) },
  { id: 'fig-l13-sol-check-bisectors', spec: specOf(fig13SolutionCheckBisectors) },
  { id: 'fig-l13-sol-activity-explain', spec: specOf(fig13SolutionActivityExplain) },
  { id: 'fig-l13-sol-practice-two-draw', spec: specOf(fig13SolutionPracticeTwoDraw) },
  { id: 'fig-l13-sol-practice-three-circles', spec: specOf(fig13SolutionPracticeThreeCircles) },
  { id: 'fig-l13-sol-practice-three-bisectors', spec: specOf(fig13SolutionPracticeThreeBisectors) },
  { id: 'fig-l13-practice-one-given', spec: specOf(fig13PracticeOneGiven) },
  { id: 'fig-l13-practice-two-given', spec: specOf(fig13PracticeTwoGiven) },
  { id: 'fig-l13-practice-three-given', spec: specOf(fig13PracticeThreeGiven) },
  { id: 'fig-l13-sol-q1', spec: specOf(fig13SolutionQ1) },
  { id: 'fig-l13-sol-q2', spec: specOf(fig13SolutionQ2) },
  { id: 'fig-l13-sol-q3', spec: specOf(fig13SolutionQ3) },
  { id: 'fig-l13-sol-q4', spec: specOf(fig13SolutionQ4) },
  { id: 'fig-l13-sol-q5', spec: specOf(fig13SolutionQ5) },
  { id: 'fig-l13-sol-activity-arcs', spec: specOf(fig13SolutionActivityArcs) },
  { id: 'fig-l13-sol-activity-construct', spec: specOf(fig13SolutionActivityConstruct) },
  { id: 'fig-l13-sol-activity-equal', spec: specOf(fig13SolutionActivityEqual) },
  { id: 'fig-l13-sol-activity-third', spec: specOf(fig13SolutionActivityThird) },
  { id: 'fig-l13-sol-activity-circle', spec: specOf(fig13SolutionActivityCircle) },
  { id: 'fig-l13-sol-activity-points', spec: specOf(fig13SolutionActivityPoints) },
  { id: 'fig-l13-sol-check', spec: specOf(fig13SolutionCheck) },
  { id: 'fig-l13-sol-practice-one', spec: specOf(fig13SolutionPracticeOne) },
  { id: 'fig-l13-sol-practice-two', spec: specOf(fig13SolutionPracticeTwo) },
  { id: 'fig-l13-sol-practice-three', spec: specOf(fig13SolutionPracticeThree) },
];
