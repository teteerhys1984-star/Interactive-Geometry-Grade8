import type { ConstructedDiagram, InteractiveDiagram } from '../schema';
import type { FigureSpec, FigureTone, LabelPlace, XY } from '@/lib/geometryFigure';
import { translateFigure } from '@/lib/geometryFigure';
import {
  authoredDefinition,
  authoredIntroTranslation,
  page17Cases,
  page17GivenRays,
  page17VectorNM,
  page18Example1,
  page18Example2,
  page18Example3,
  page19Check,
  page19Isosceles,
  page19Kite,
  page19Pairs,
  PAGE19_PAIR_PANEL,
  type Triangle,
} from './lesson-04-geometry';

/**
 * ============================================================================
 *  الدرس الرابع — الأشكال (صفحات 17–19)
 * ============================================================================
 *
 *  Every figure used by Lesson 4 is built here, so provenance can be audited
 *  in one place:
 *
 *    `origin: 'textbook'` — a reproduction of a printed figure. Every
 *                           coordinate is derived from a value printed on the
 *                           page (lengths, angle measures, right angles,
 *                           "opposite sides of a parallelogram", "diagonals
 *                           bisect"), and the derivation is checked by
 *                           `lesson-04-geometry.test.ts`. The figure-by-figure
 *                           record is `docs/LESSON-04-FIGURES.md`.
 *
 *    `origin: 'authored'` — a platform teaching figure. Page 17's opening
 *                           sketch and its definition figure print NO
 *                           measurements at all, so those two are drawn by the
 *                           platform as true translates and are badged
 *                           «رسم تعليمي من إعداد المنصّة».
 *
 *  No textbook crop is published: every printed figure of this lesson can be
 *  rebuilt exactly from its own printed data.
 * ============================================================================
 */

/* --------------------------------------------------------------------------
 *  Small builders
 * ----------------------------------------------------------------------- */

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

/**
 * A value printed for a side: anchored on the side itself and directed OUT of
 * the figure (`away`). The renderer then puts the text just outside the line,
 * at a distance measured in glyphs, so the same declaration works in every
 * figure scale and the value can never end up lying on the side.
 */
function sideValue(
  from: XY,
  to: XY,
  text: string,
  side: 1 | -1,
  fraction = 0.5,
): NonNullable<FigureSpec['texts']>[number] {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const len = Math.hypot(dx, dy) || 1;
  return {
    at: [from[0] + dx * fraction, from[1] + dy * fraction],
    text,
    tone: 'mark',
    anchor: 'middle',
    away: [(-dy / len) * side, (dx / len) * side],
  };
}

/** Which side of `from→to` points away from `reference`. */
function awayFrom(from: XY, to: XY, reference: XY): 1 | -1 {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const mid: XY = [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2];
  const nx = -dy;
  const ny = dx;
  const towards = (mid[0] - reference[0]) * nx + (mid[1] - reference[1]) * ny;
  return towards >= 0 ? 1 : -1;
}

/** The four sides of a triangle plus its outline stroke. */
function triangleOutline(triangle: Triangle) {
  return [triangle.A, triangle.B, triangle.C] as const;
}

function trianglePolygon(
  triangle: Triangle,
  tone: FigureTone = 'ink',
): NonNullable<FigureSpec['polygons']>[number] {
  return { points: [...triangleOutline(triangle)], tone };
}

const CAPTION_AUTHORED =
  'رسم تعليمي من إعداد المنصّة — المسافات فيه ليست من الكتاب، والعلاقات الهندسية المطبوعة محفوظة.';
const CAPTION_TEXTBOOK = 'الشكل المطبوع — أُعيد رسمه من قِيَمه المطبوعة، مثبَّتة بالحساب.';

const page17 = { page: 17, locator: 'نشاط — الأشكال ① ② ③' } as const;
const page18Sas = { page: 18, locator: 'المثال الأول — الحالة ①' } as const;
const page18Asa = { page: 18, locator: 'المثال الثاني — الحالة ②' } as const;
const page18Sss = { page: 18, locator: 'المثال الثالث — الحالة ③' } as const;
const page19CheckSource = { page: 19, locator: 'تحقّق من فهمك' } as const;
const page19KiteSource = { page: 19, locator: 'تدرّب — ①' } as const;
const page19PairsSource = { page: 19, locator: 'تدرّب — ②' } as const;
const page19IsoscelesSource = { page: 19, locator: 'تدرّب — ③' } as const;

/* --------------------------------------------------------------------------
 *  PAGE 17 — the three activity panels (① SAS, ② ASA, ③ SSS)
 *  The printed panels are cropped on purpose: ① and ② show only the data the
 *  student is given, so the figure stops at those same segments and rays.
 * ----------------------------------------------------------------------- */

type CaseKind = 'sas' | 'asa' | 'sss';

/**
 * One panel, in its OWN coordinate window (origin at the bottom-left of the
 * panel). `completed` adds the third vertex, the missing sides and the second
 * angle: exactly what the student is asked to construct in question 2.
 */
function caseLocalSpec(kind: CaseKind, completed: boolean): FigureSpec {
  const { A, B, C } = page17Cases[kind];
  const N = page17VectorNM.from;
  const M = page17VectorNM.to;

  const points = [point(A, 'A', 'sw'), point(N, 'N', 's'), point(M, 'M', 's')];
  const segments = [segment(A, C), segment(N, M)];
  const angles: NonNullable<FigureSpec['angles']> = [];
  // [AC] carries the printed 3 on every panel, outside the figure.
  const texts = [sideValue(A, C, '3', awayFrom(A, C, B))];

  if (kind === 'sas') {
    points.push(point(B, 'B', 'e'), point(C, 'C', 'n'));
    segments.push(segment(A, B));
    angles.push({ at: A, from: C, to: B, label: '35°', tone: 'mark' });
    texts.push(sideValue(A, B, '4', awayFrom(A, B, C)));
    return { viewBox: { x: 0, y: 0, w: 11.4, h: 8.4 }, points, segments, angles, texts };
  }

  if (kind === 'asa') {
    if (completed) {
      // Question 2: the two printed rays, extended, meet at B. The finished
      // triangle REPLACES the rays — nothing may run past a vertex, otherwise
      // the drawing shows two stray lines crossing outside the triangle.
      points.push(point(B, 'B', 'se'), point(C, 'C', 'n'));
      segments.push(segment(A, B), segment(B, C));
      angles.push({ at: A, from: C, to: B, label: '35°', tone: 'mark' });
      angles.push({ at: C, from: A, to: B, label: '85°', tone: 'mark' });
      return { viewBox: { x: 0, y: 0, w: 11.4, h: 8.4 }, points, segments, angles, texts };
    }
    // Printed givens of panel ②: [AC] plus one open ray at each end. The rays
    // point at B but stop short of it (see `page17GivenRays`), so the figure
    // shows no vertex and no crossing — it never pre-draws the construction.
    const { fromA: rayFromA, fromC: rayFromC } = page17GivenRays;
    points.push(point(C, 'C', 'ne'));
    segments.push(segment(A, rayFromA), segment(C, rayFromC));
    angles.push({ at: A, from: C, to: rayFromA, label: '35°', tone: 'mark' });
    angles.push({ at: C, from: A, to: rayFromC, label: '85°', tone: 'mark' });
    return { viewBox: { x: 0, y: 0, w: 11.4, h: 8.4 }, points, segments, angles, texts };
  }

  points.push(point(B, 'B', 'e'), point(C, 'C', 'n'));
  segments.push(segment(A, B), segment(B, C));
  texts.push(sideValue(A, B, '4', awayFrom(A, B, C)));
  texts.push(sideValue(B, C, '2', awayFrom(B, C, A)));
  return { viewBox: { x: 0, y: 0, w: 11.4, h: 8.4 }, points, segments, angles, texts };
}

const PANEL_OFFSETS: [number, number][] = [
  [0.9, 0.4],
  [12.1, 0.4],
  [23.3, 0.4],
];

/**
 * The printed figure shows ONLY the givens — panel ② is the two open rays, with
 * no vertex B — because closing the triangle is the student's task (question 2).
 * The completed shape is drawn by the lesson's lab, step by step.
 */
const casePanels = PANEL_OFFSETS.map(([dx, dy], index) =>
  translateFigure(caseLocalSpec((['sas', 'asa', 'sss'] as const)[index]!, false), dx, dy),
);

export const figurePage17Cases: FigureSpec = {
  viewBox: { x: 0, y: 0, w: 33.4, h: 8.6 },
  frames: [
    { x: 0.2, y: 0.2, w: 10.7, h: 8.2, label: '①' },
    { x: 11.4, y: 0.2, w: 10.7, h: 8.2, label: '②' },
    { x: 22.6, y: 0.2, w: 10.6, h: 8.2, label: '③' },
  ],
  polygons: casePanels.flatMap((panel) => panel.polygons ?? []),
  points: casePanels.flatMap((panel) => panel.points ?? []),
  segments: casePanels.flatMap((panel) => panel.segments ?? []),
  angles: casePanels.flatMap((panel) => panel.angles ?? []),
  texts: casePanels.flatMap((panel) => panel.texts ?? []),
};

/** The lab's three cases: givens, completed triangle, and the triangle itself. */
export const casesLabCases = (['sas', 'asa', 'sss'] as const).map((kind) => ({
  id: kind,
  label: kind === 'sas' ? '①' : kind === 'asa' ? '②' : '③',
  name:
    kind === 'sas'
      ? 'ضلعان والزاوية المحصورة'
      : kind === 'asa'
        ? 'ضلع وزاويتان مجاورتان'
        : 'الأضلاع الثلاثة',
  given: caseLocalSpec(kind, false),
  completed: caseLocalSpec(kind, true),
  triangle: page17Cases[kind],
  note:
    kind === 'sas'
      ? 'المعطيات: $AC = 3$ و$AB = 4$ والزاوية $\\widehat{BAC} = 35°$ محصورة بينهما.'
      : kind === 'asa'
        ? 'المعطيات: $AC = 3$ والزاويتان المجاورتان له $35°$ عند $A$ و$85°$ عند $C$.'
        : 'المعطيات: $AB = 4$ و$AC = 3$ و$BC = 2$، وهي أطوال الأضلاع الثلاثة.',
}));

/* --------------------------------------------------------------------------
 *  PAGE 18 — example 1 (SAS): AM = ME = 5, BM = MF = 7, vertical angles at M
 * ----------------------------------------------------------------------- */

const ex1 = page18Example1;

export const figureExampleSas: FigureSpec = {
  viewBox: { x: -0.5, y: 0, w: 15.6, h: 7.5 },
  polygons: [
    trianglePolygon({ A: ex1.A, B: ex1.B, C: ex1.M }),
    { points: [ex1.M, ex1.E, ex1.F], tone: 'image' },
  ],
  segments: [
    segment(ex1.B, ex1.F),
    segment(ex1.A, ex1.E),
    // The third side of triangle MEF: without it the image polygon's own stroke
    // shows through in the image colour, unlike its two other sides.
    segment(ex1.E, ex1.F),
  ],
  points: [
    point(ex1.A, 'A', 'nw'),
    point(ex1.B, 'B', 'w'),
    point(ex1.M, 'M', 'n'),
    point(ex1.E, 'E', 'se'),
    point(ex1.F, 'F', 'e'),
  ],
  texts: [
    // Each printed length sits OUTSIDE the triangle it belongs to, so the two
    // triangles' values never mix and never lie on a side.
    sideValue(ex1.A, ex1.M, '5', awayFrom(ex1.A, ex1.M, ex1.B)),
    sideValue(ex1.B, ex1.M, '7', awayFrom(ex1.B, ex1.M, ex1.A)),
    sideValue(ex1.M, ex1.F, '7', awayFrom(ex1.M, ex1.F, ex1.E)),
    sideValue(ex1.M, ex1.E, '5', awayFrom(ex1.M, ex1.E, ex1.F)),
  ],
};

/* --------------------------------------------------------------------------
 *  PAGE 18 — example 2 (ASA): parallelogram AECF around rectangle ABCD
 * ----------------------------------------------------------------------- */

const ex2 = page18Example2;

export const figureExampleAsa: FigureSpec = {
  viewBox: { x: -0.6, y: -0.5, w: 9.4, h: 9.2 },
  polygons: [{ points: [ex2.A, ex2.E, ex2.C, ex2.F], tone: 'ink' }],
  segments: [
    segment(ex2.A, ex2.F),
    segment(ex2.F, ex2.C),
    segment(ex2.C, ex2.E),
    segment(ex2.E, ex2.A),
    segment(ex2.A, ex2.B),
    segment(ex2.B, ex2.C),
    segment(ex2.C, ex2.D),
    segment(ex2.D, ex2.A),
  ],
  points: [
    point(ex2.A, 'A', 'nw'),
    point(ex2.B, 'B', 'w'),
    point(ex2.C, 'C', 'se'),
    point(ex2.D, 'D', 'e'),
    point(ex2.E, 'E', 'sw'),
    point(ex2.F, 'F', 'ne'),
  ],
  angles: [
    // Printed: CBE = FDA = 90°.
    { at: ex2.B, from: ex2.C, to: ex2.E, right: true },
    { at: ex2.D, from: ex2.F, to: ex2.A, right: true },
  ],
};

/* --------------------------------------------------------------------------
 *  PAGE 18 — example 3 (SSS): parallelogram ABCD with the diagonal [AC]
 * ----------------------------------------------------------------------- */

const ex3 = page18Example3;

export const figureExampleSss: FigureSpec = {
  viewBox: { x: -0.6, y: -0.5, w: 9.4, h: 4.6 },
  polygons: [{ points: [ex3.A, ex3.B, ex3.C, ex3.D], tone: 'ink' }],
  segments: [segment(ex3.A, ex3.C)],
  points: [
    point(ex3.A, 'A', 'nw'),
    point(ex3.B, 'B', 'sw'),
    point(ex3.C, 'C', 'se'),
    point(ex3.D, 'D', 'ne'),
  ],
};

/* --------------------------------------------------------------------------
 *  PAGE 19 — «تحقّق من فهمك»: rectangle ABCD, diagonal [BD], 30° at D and B
 * ----------------------------------------------------------------------- */

const check = page19Check;

export const figureCheckRectangle: FigureSpec = {
  viewBox: { x: -0.9, y: -1.1, w: 8.6, h: 6.1 },
  polygons: [{ points: [check.A, check.B, check.C, check.D], tone: 'ink', fill: false }],
  segments: [
    segment(check.A, check.B, { ticks: 1 }),
    segment(check.C, check.D, { ticks: 1 }),
    segment(check.A, check.D, { ticks: 2 }),
    segment(check.B, check.C, { ticks: 2 }),
    segment(check.B, check.D),
  ],
  angles: [
    { at: check.A, from: check.B, to: check.D, right: true },
    { at: check.C, from: check.B, to: check.D, right: true },
    { at: check.D, from: check.A, to: check.B, label: '30°' },
    { at: check.B, from: check.C, to: check.D, label: '30°' },
  ],
  points: [
    point(check.A, 'A', 'nw'),
    point(check.B, 'B', 'sw'),
    point(check.C, 'C', 'se'),
    point(check.D, 'D', 'ne'),
  ],
};

/* --------------------------------------------------------------------------
 *  PAGE 19 — «تدرّب ①» : the paper kite
 *  Printed: AB = AD = 14.4, BC = CD = 10, AE = 12, CE = 6, BE = ED = 8,
 *  right angles at E. 6² + 8² = 100 = 10² and 12² + 8² = 208 = 14.42…².
 * ----------------------------------------------------------------------- */

const kite = page19Kite;

const kiteCentre: XY = [
  (kite.A[0] + kite.B[0] + kite.C[0] + kite.D[0]) / 4,
  (kite.A[1] + kite.B[1] + kite.C[1] + kite.D[1]) / 4,
];

export const figureKite: FigureSpec = {
  viewBox: { x: -0.4, y: -7.4, w: 19.6, h: 17.6 },
  polygons: [{ points: [kite.A, kite.B, kite.C, kite.D], tone: 'ink' }],
  segments: [
    segment(kite.A, kite.B),
    segment(kite.B, kite.C),
    segment(kite.C, kite.D),
    segment(kite.D, kite.A),
    segment(kite.A, kite.C),
    segment(kite.B, kite.D),
  ],
  angles: [
    // Two of the four right angles at E, kept on the WEST side so the "E"
    // label on the east has clear space (all four are 90° by construction).
    { at: kite.E, from: kite.B, to: kite.A, right: true },
    { at: kite.E, from: kite.A, to: kite.D, right: true },
  ],
  points: [
    point(kite.A, 'A', 'sw'),
    point(kite.B, 'B', 'nw'),
    point(kite.C, 'C', 'e'),
    point(kite.D, 'D', 'se'),
    point(kite.E, 'E', 'e'),
  ],
  texts: [
    // Outer sides: outward, away from the centre of the kite.
    sideValue(kite.A, kite.B, '14.4', awayFrom(kite.A, kite.B, kiteCentre)),
    sideValue(kite.A, kite.D, '14.4', awayFrom(kite.A, kite.D, kiteCentre)),
    sideValue(kite.B, kite.C, '10', awayFrom(kite.B, kite.C, kiteCentre)),
    sideValue(kite.C, kite.D, '10', awayFrom(kite.C, kite.D, kiteCentre)),
    // The four halves of the diagonals: one value on each side of the crossing
    // E, so 12/6 and 8/8 can never be confused with each other.
    sideValue(kite.A, kite.E, '12', awayFrom(kite.A, kite.E, kite.B), 0.55),
    sideValue(kite.E, kite.C, '6', awayFrom(kite.E, kite.C, kite.D), 0.5),
    sideValue(kite.B, kite.E, '8', awayFrom(kite.B, kite.E, kite.A), 0.55),
    sideValue(kite.E, kite.D, '8', awayFrom(kite.E, kite.D, kite.C), 0.5),
  ],
};

/* --------------------------------------------------------------------------
 *  PAGE 19 — «تدرّب ②» : three pairs, one per congruence case
 * ----------------------------------------------------------------------- */

function pairPanelSpec(id: 'pair-1' | 'pair-2' | 'pair-3'): FigureSpec {
  const panel = page19Pairs.find((entry) => entry.id === id)!;
  const { first, second, kind } = panel;

  const polygonFor = (triangle: Triangle, tone: FigureTone) => ({
    points: [triangle.A, triangle.B, triangle.C],
    tone,
  });

  const sides = (triangle: Triangle) => [
    segment(triangle.A, triangle.B),
    segment(triangle.B, triangle.C),
    segment(triangle.C, triangle.A),
  ];

  const centroid = (t: Triangle): XY => [
    (t.A[0] + t.B[0] + t.C[0]) / 3,
    (t.A[1] + t.B[1] + t.C[1]) / 3,
  ];

  /**
   * A length value placed OUTSIDE its own triangle. The perpendicular side is
   * chosen against that triangle's centroid, so the two copies in a panel can
   * never share a label position (the printed figure keeps them apart too).
   * The distance itself is decided by the renderer from the label's own glyph
   * box, so it stays outside the side at every scale.
   */
  const outside = (triangle: Triangle, from: XY, to: XY, text: string) =>
    sideValue(from, to, text, awayFrom(from, to, centroid(triangle)));

  const measures = (triangle: Triangle) => {
    const { A, B, C } = triangle;
    if (kind === 'sss') {
      return [
        outside(triangle, A, B, '2'),
        outside(triangle, B, C, '3'),
        outside(triangle, C, A, '2.6'),
      ];
    }
    if (kind === 'sas') {
      return [outside(triangle, A, B, '2'), outside(triangle, A, C, '4')];
    }
    return [outside(triangle, A, B, '4')];
  };

  /**
   * The printed angle values are carried BY THEIR ARCS, not by a free-floating
   * text: the value then belongs to that angle in the data, and the renderer
   * places it from the arc it annotates (inside the mouth when the mouth can
   * hold it, just beside the arc when it cannot). The previous revision placed
   * them from the centroid, which put «80°» outside the triangle next to the
   * side value «2».
   */
  const arc = (at: XY, from: XY, to: XY, label?: string) => ({
    at,
    from,
    to,
    tone: 'mark' as const,
    /*
     * These triangles are a third of a panel wide: at the lesson's standard
     * 18 px arc radius the arc alone would be as wide as the triangle's waist,
     * leaving no room for the value beside it. The radius is therefore in the
     * panel's own units, sized to the drawing (~11 px on screen), not the
     * shared default.
     */
    radius: 0.5,
    ...(label ? { label } : {}),
  });

  return {
    viewBox: { x: 0, y: 0, w: PAGE19_PAIR_PANEL.width, h: PAGE19_PAIR_PANEL.height },
    polygons: [polygonFor(first, 'ink'), polygonFor(second, 'ink')],
    segments: [...sides(first), ...sides(second)],
    angles:
      kind === 'sas'
        ? [arc(first.A, first.B, first.C, '80°'), arc(second.A, second.B, second.C, '80°')]
        : kind === 'asa'
          ? [
              arc(first.A, first.B, first.C, '44°'),
              arc(first.B, first.A, first.C, '82°'),
              arc(second.A, second.B, second.C, '44°'),
              arc(second.B, second.A, second.C, '82°'),
            ]
          : [],
    points: [],
    texts: [...measures(first), ...measures(second)],
  };
}

/** Places the panel's elements in the shared drawing window. */
function placePanel(spec: FigureSpec, dx: number, dy: number): FigureSpec {
  return translateFigure(spec, dx, dy);
}

const PAIR_DX = [0.3, 11, 21.7] as const;

const pairPanels = PAIR_DX.map((dx, index) =>
  placePanel(pairPanelSpec((['pair-1', 'pair-2', 'pair-3'] as const)[index]!), dx, 0.2),
);

export const figurePairs: FigureSpec = {
  viewBox: { x: 0, y: 0, w: PAIR_DX[2] + 11, h: 7.9 },
  /*
   * Three panels share one window, so each triangle is only about a third as
   * wide as the drawing. A value like «2.6» at the lesson's standard size would
   * then be as wide as the side it measures, so this figure — and only this
   * one — asks for slightly smaller lettering. It is a deliberate, measured
   * decision recorded in docs/LESSON-04-LABEL-AUDIT.md, not a blanket shrink.
   */
  labelScale: 0.82,
  frames: PAIR_DX.map((dx, index) => ({
    x: dx,
    y: 0.1,
    w: 10.4,
    h: 7.6,
    label: (['①', '②', '③'] as const)[index]!,
    // The second triangle reaches the upper-right corner of every panel, so the
    // panel number sits at the upper LEFT where nothing else is drawn.
    labelPlace: 'left' as const,
  })),
  polygons: pairPanels.flatMap((panel) => panel.polygons ?? []),
  segments: pairPanels.flatMap((panel) => panel.segments ?? []),
  angles: pairPanels.flatMap((panel) => panel.angles ?? []),
  texts: pairPanels.flatMap((panel) => panel.texts ?? []),
};

/* --------------------------------------------------------------------------
 *  PAGE 19 — «تدرّب ③» : B̂ = Ĉ, BM = MC, ME ⟂ (AB), MF ⟂ (AC)
 * ----------------------------------------------------------------------- */

const iso = page19Isosceles;

export const figureIsosceles: FigureSpec = {
  viewBox: { x: -5.2, y: -1.1, w: 10.4, h: 9.2 },
  polygons: [{ points: [iso.A, iso.B, iso.C], tone: 'ink' }],
  segments: [
    segment(iso.A, iso.B),
    segment(iso.B, iso.C),
    segment(iso.C, iso.A),
    segment(iso.A, iso.M),
    segment(iso.M, iso.E),
    segment(iso.M, iso.F),
    segment(iso.B, iso.M, { ticks: 2 }),
    segment(iso.M, iso.C, { ticks: 2 }),
  ],
  angles: [
    { at: iso.E, from: iso.A, to: iso.M, right: true },
    { at: iso.F, from: iso.A, to: iso.M, right: true },
  ],
  points: [
    point(iso.A, 'A', 'n'),
    point(iso.B, 'B', 'sw'),
    point(iso.C, 'C', 'se'),
    point(iso.E, 'E', 'w'),
    point(iso.F, 'F', 'e'),
    point(iso.M, 'M', 's'),
  ],
};

/* --------------------------------------------------------------------------
 *  AUTHORED — page 17's opening sketch and definition figure.
 *  Both pages print these without a single measurement: they only assert that
 *  a figure and its image under a translation are superposable. Drawing them
 *  as true translates keeps that relation exact.
 * ----------------------------------------------------------------------- */

const introFigure = authoredIntroTranslation;

/** Stop a connector short of its target, so the arrowhead points at the vertex
 *  instead of covering its dot and label. */
function stopShort(from: XY, to: XY, gap = 0.62): XY {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const len = Math.hypot(dx, dy) || 1;
  return [to[0] - (dx / len) * gap, to[1] - (dy / len) * gap];
}

export const figureTranslationIntro: FigureSpec = {
  viewBox: { x: 0.6, y: 0.2, w: 9.4, h: 5 },
  polygons: [trianglePolygon(introFigure.triangle), trianglePolygon(introFigure.image, 'image')],
  segments: [
    segment(introFigure.triangle.A, stopShort(introFigure.triangle.A, introFigure.image.A), {
      tone: 'aux',
      dashed: true,
      arrow: true,
    }),
    segment(introFigure.triangle.B, stopShort(introFigure.triangle.B, introFigure.image.B), {
      tone: 'aux',
      dashed: true,
      arrow: true,
    }),
    segment(introFigure.triangle.C, stopShort(introFigure.triangle.C, introFigure.image.C), {
      tone: 'aux',
      dashed: true,
      arrow: true,
    }),
  ],
  points: [
    point(introFigure.triangle.A, 'A', 'sw'),
    point(introFigure.triangle.B, 'B', 'se'),
    point(introFigure.triangle.C, 'C', 'n'),
    point(introFigure.image.A, 'A′', 'sw', 'image'),
    point(introFigure.image.B, 'B′', 'se', 'image'),
    point(introFigure.image.C, 'C′', 'n', 'image'),
  ],
};

export const figureTranslationImage: FigureSpec = {
  viewBox: { x: 0, y: 0, w: 11.4, h: 5.6 },
  polygons: [trianglePolygon(introFigure.image, 'image')],
  points: [
    point(introFigure.image.A, 'A′', 'sw', 'image'),
    point(introFigure.image.B, 'B′', 'se', 'image'),
    point(introFigure.image.C, 'C′', 'n', 'image'),
  ],
};

const definition = authoredDefinition;

export const figureDefinitionPair: FigureSpec = {
  viewBox: { x: 0, y: 0, w: 10.6, h: 5.6 },
  polygons: [trianglePolygon(definition.triangle), trianglePolygon(definition.image, 'image')],
  points: [
    point(definition.triangle.A, 'A', 'sw'),
    point(definition.triangle.B, 'B', 'se'),
    point(definition.triangle.C, 'C', 'n'),
    point(definition.image.A, 'A′', 'sw', 'image'),
    point(definition.image.B, 'B′', 'se', 'image'),
    point(definition.image.C, 'C′', 'n', 'image'),
  ],
};

/* --------------------------------------------------------------------------
 *  AUTHORED — teacher-only overlays
 * ----------------------------------------------------------------------- */

/** Page 19 check: the two congruent triangles ABD and CDB, shaded apart. */
export const figureCheckTriangles: FigureSpec = {
  viewBox: { x: -0.9, y: -1.1, w: 8.6, h: 6.1 },
  polygons: [
    { points: [check.A, check.B, check.D], tone: 'ink' },
    { points: [check.B, check.C, check.D], tone: 'image' },
  ],
  segments: [
    segment(check.A, check.B),
    segment(check.B, check.C),
    segment(check.C, check.D),
    segment(check.D, check.A),
    segment(check.B, check.D),
  ],
  angles: [
    { at: check.A, from: check.B, to: check.D, right: true },
    { at: check.C, from: check.D, to: check.B, right: true },
  ],
  points: [
    point(check.A, 'A', 'nw'),
    point(check.B, 'B', 'sw'),
    point(check.C, 'C', 'se'),
    point(check.D, 'D', 'ne'),
  ],
};

/** Page 19 kite: mark the three congruent pairs by their shared sides. */
export const figureKitePairs: FigureSpec = {
  viewBox: { x: -0.4, y: -7.4, w: 19.6, h: 17.6 },
  polygons: [
    { points: [kite.A, kite.B, kite.E], tone: 'ink' },
    { points: [kite.A, kite.D, kite.E], tone: 'ink' },
    { points: [kite.B, kite.C, kite.E], tone: 'image' },
    { points: [kite.C, kite.D, kite.E], tone: 'image' },
  ],
  segments: [
    segment(kite.A, kite.B),
    segment(kite.B, kite.C),
    segment(kite.C, kite.D),
    segment(kite.D, kite.A),
    segment(kite.A, kite.C),
    segment(kite.B, kite.D),
  ],
  angles: [{ at: kite.E, from: kite.B, to: kite.A, right: true }],
  points: [
    point(kite.A, 'A', 'sw'),
    point(kite.B, 'B', 'nw'),
    point(kite.C, 'C', 'e'),
    point(kite.D, 'D', 'se'),
    point(kite.E, 'E', 'e'),
  ],
  texts: [
    sideValue(kite.E, kite.C, '6', awayFrom(kite.E, kite.C, kite.D)),
    sideValue(kite.E, kite.B, '8', awayFrom(kite.E, kite.B, kite.A)),
  ],
};

/** Page 19 isosceles proof: the two pairs ME=MF and BE=CF the proof produces. */
export const figureIsoscelesPairs: FigureSpec = {
  ...figureIsosceles,
  polygons: [
    { points: [iso.A, iso.B, iso.C], tone: 'ink' },
    { points: [iso.M, iso.E, iso.B], tone: 'image' },
    { points: [iso.M, iso.F, iso.C], tone: 'image' },
  ],
  texts: [
    sideValue(iso.M, iso.E, 'ME', awayFrom(iso.M, iso.E, iso.A), 0.5),
    sideValue(iso.M, iso.F, 'MF', awayFrom(iso.M, iso.F, iso.A), 0.5),
  ],
};

/* --------------------------------------------------------------------------
 *  Diagram specs (schema-level, so the tests can read them back)
 * ----------------------------------------------------------------------- */

interface BaseOptions {
  id: string;
  alt: string;
  caption?: string;
  source?: { page: number; locator: string };
}

function constructedTextbook(options: BaseOptions, construction: FigureSpec): ConstructedDiagram {
  return {
    kind: 'constructed',
    origin: 'textbook',
    renderer: 'congruence-figure',
    id: options.id,
    alt: options.alt,
    caption: options.caption,
    source: options.source,
    construction: construction as unknown as Record<string, unknown>,
  };
}

function constructedAuthored(options: BaseOptions, construction: FigureSpec): ConstructedDiagram {
  return {
    kind: 'constructed',
    origin: 'authored',
    renderer: 'congruence-figure',
    id: options.id,
    alt: options.alt,
    caption: options.caption ?? CAPTION_AUTHORED,
    source: options.source,
    construction: construction as unknown as Record<string, unknown>,
  };
}

export const fig17Cases = constructedTextbook(
  {
    id: 'fig-17-activity-cases',
    alt: 'ثلاثة أشكال للنشاط: في ① الضلعان $AC$ و$AB$ بطولي $3$ و$4$ والزاوية عند $A$ قياسها $35°$؛ وفي ② الضلع $AC$ طوله $3$ والزاويتان عند $A$ و$C$ قياساهما $35°$ و$85°$ مع شعاعين يتجهان نحو $B$ ويتوقفان قبله؛ وفي ③ المثلث $ABC$ كامل بأطوال $3$ و$4$ و$2$. وتحت كل شكل القطعة $NM$.',
    caption: `صفحة ١٧ — ${CAPTION_TEXTBOOK}`,
    source: page17,
  },
  figurePage17Cases,
);

export const fig18Sas = constructedTextbook(
  {
    id: 'fig-18-example-sas',
    alt: 'المثلثان $AMB$ و$EMF$ متقابلان بالرأس عند $M$، فيه $AM = ME = 5$ و$BM = MF = 7$، والنقاط $A$ و$M$ و$E$ على استقامة واحدة، وكذلك $B$ و$M$ و$F$.',
    caption: `صفحة ١٨ — ${CAPTION_TEXTBOOK}`,
    source: page18Sas,
  },
  figureExampleSas,
);

export const fig18Asa = constructedTextbook(
  {
    id: 'fig-18-example-asa',
    alt: 'متوازي الأضلاع $AECF$ يحيط بالمستطيل $ABCD$، فالنقطتان $B$ و$D$ على الضلعين $EA$ و$FC$، وفيه $AB = DC$ و$FD = BE$ والزاويتان عند $B$ و$D$ قائمتان.',
    caption: `صفحة ١٨ — ${CAPTION_TEXTBOOK}`,
    source: page18Asa,
  },
  figureExampleAsa,
);

export const fig18Sss = constructedTextbook(
  {
    id: 'fig-18-example-sss',
    alt: 'متوازي الأضلاع $ABCD$ وقطره $AC$ الذي يقسمه إلى المثلثين $ACB$ و$ACD$.',
    caption: `صفحة ١٨ — ${CAPTION_TEXTBOOK}`,
    source: page18Sss,
  },
  figureExampleSss,
);

export const fig19Check = constructedTextbook(
  {
    id: 'fig-19-check-rectangle',
    alt: 'مستطيل $ABCD$ وقطره $BD$؛ الزاويتان عند $A$ و$C$ قائمتان، والضلعان $AB$ و$DC$ عليهما علامة تساوٍ واحدة، والضلعان $AD$ و$BC$ عليهما علامتان، والزاويتان $ADB$ و$CBD$ قياس كل منهما $30°$.',
    caption: `صفحة ١٩ — ${CAPTION_TEXTBOOK}`,
    source: page19CheckSource,
  },
  figureCheckRectangle,
);

export const fig19Kite = constructedTextbook(
  {
    id: 'fig-19-kite',
    alt: 'طائرة ورقية $ABCD$ تتقاطع قطراها $AC$ و$BD$ في $E$ بزاوية قائمة، وفيها $AB = AD = 14.4$ و$BC = CD = 10$ و$AE = 12$ و$CE = 6$ و$BE = ED = 8$.',
    caption: `صفحة ١٩ — ${CAPTION_TEXTBOOK}`,
    source: page19KiteSource,
  },
  figureKite,
);

export const fig19Pairs = constructedTextbook(
  {
    id: 'fig-19-pairs',
    alt: 'ثلاثة أزواج من المثلثات: ① أضلاع كل مثلث $2$ و$3$ و$2.6$؛ ② ضلعان $2$ و$4$ والزاوية المحصورة بينهما $80°$؛ ③ ضلع طوله $4$ وزاويتان مجاورتان له $44°$ و$82°$.',
    caption: `صفحة ١٩ — ${CAPTION_TEXTBOOK}`,
    source: page19PairsSource,
  },
  figurePairs,
);

export const fig19Isosceles = constructedTextbook(
  {
    id: 'fig-19-isosceles',
    alt: 'مثلث $ABC$ فيه $BM = MC$ و$ME$ عمودي على $AB$ عند $E$ و$MF$ عمودي على $AC$ عند $F$.',
    caption: `صفحة ١٩ — ${CAPTION_TEXTBOOK}`,
    source: page19IsoscelesSource,
  },
  figureIsosceles,
);

export const figTranslation = constructedAuthored(
  {
    id: 'auth-04-translation-intro',
    alt: 'مثلث وصورته وفق انسحاب، وخطوط متقطعة تصل كل رأس بصورته.',
    caption:
      'رسم تعليمي من إعداد المنصّة — يحفظ علاقة الانسحاب المطبوعة في الصفحة ١٧، والمسافات فيه ليست من الكتاب.',
  },
  figureTranslationIntro,
);

export const figDefinitionPair = constructedAuthored(
  {
    id: 'auth-04-definition-pair',
    alt: 'مثلثان $ABC$ و$A′B′C′$ متطابقان، بحيث يقابل $A$ النقطة $A′$ و$B$ النقطة $B′$ و$C$ النقطة $C′$.',
    caption:
      'رسم تعليمي من إعداد المنصّة — الصفحة ١٧ ترسم المثلثين دون أي قياس، وهذا رسم دقيق للعلاقة نفسها.',
  },
  figureDefinitionPair,
);

/* --------------------------------------------------------------------------
 *  Teacher-only diagrams (always badged as platform work)
 * ----------------------------------------------------------------------- */

export const teacherCheckFigure = constructedAuthored(
  {
    id: 'auth-04-teacher-check',
    alt: 'المستطيل $ABCD$ مقسوماً بالقطر $BD$ إلى المثلثين $ABD$ و$CDB$ الملوّنين بلونين مختلفين.',
    caption: 'توضيح من إعداد المنصّة — تظليل المثلثين المطلوب إثبات تطابقهما.',
  },
  figureCheckTriangles,
);

export const teacherKiteFigure = constructedAuthored(
  {
    id: 'auth-04-teacher-kite',
    alt: 'الطائرة الورقية مع تظليل المثلثات الأربعة الصغيرة حول تقاطع القطرين.',
    caption: 'توضيح من إعداد المنصّة — تظليل المثلثات التي تُقارن في التمرين ①.',
  },
  figureKitePairs,
);

export const teacherIsoscelesFigure = constructedAuthored(
  {
    id: 'auth-04-teacher-isosceles',
    alt: 'المثلث $ABC$ والمثلثان $MEB$ و$MFC$ ملوّنان، مع القطعتين $ME$ و$MF$.',
    caption: 'توضيح من إعداد المنصّة — تظليل المثلثين الأولين في برهان التمرين ③.',
  },
  figureIsoscelesPairs,
);

/* --------------------------------------------------------------------------
 *  Interactive diagrams
 * ----------------------------------------------------------------------- */

export const casesLabDiagram: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'authored',
  id: 'auth-04-cases-lab',
  renderer: 'congruence-cases-lab',
  alt: 'مختبر حالات التطابق: تختار حالة، فتُعرض معطياتها، ثم يكتمل المثلث $ABC$، ثم تُرسم صورته وفق الانسحاب الذي ينقل $N$ إلى $M$.',
  caption:
    'مختبر من إعداد المنصّة — يبني المثلث من معطيات النشاط المطبوعة ثم ينقله بالانسحاب $N \\to M$.',
  params: {
    title: 'أكمل المثلث ثم انقله',
    intro:
      'اختر إحدى الحالات الثلاث. المعطيات هي نفسها المطبوعة في الصفحة ١٧. أكمل المثلث، ثم ارسم صورته وفق الانسحاب الذي ينقل $N$ إلى $M$، ولاحظ ما يبقى ثابتاً.',
    vector: { from: page17VectorNM.from, to: page17VectorNM.to },
    cases: casesLabCases as unknown as Record<string, unknown>[],
  },
};

export const practicePairsDiagram: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'authored',
  id: 'auth-04-practice-pairs-lab',
  renderer: 'case-justify-lab',
  alt: 'تمرين تفاعلي: ثلاثة أزواج من المثلثات، ويُطلب اختيار حالة التطابق التي تنطبق على كل زوج.',
  caption:
    'تمرين من إعداد المنصّة — يتبع التمرين ② المطبوع، ولا يظهر التصحيح قبل مراجعة الأجوبة كلها.',
  params: {
    title: 'أي حالة تطابق؟',
    intro: 'لكل زوج من المثلثات معطيات مطبوعة. اختر الحالة التي تثبت التطابق، ثم راجع عملك كاملاً.',
    figure: figurePairs as unknown as Record<string, unknown>,
    tasks: [
      {
        id: 'pair-1',
        label: '①',
        prompt: 'الأطوال هي $2$ و$3$ و$2.6$ في المثلثين.',
        options: [
          { id: 'sss', label: 'تساوي أطوال الأضلاع الثلاثة مع مقابلاتها.' },
          { id: 'sas', label: 'تساوي ضلعين والزاوية المحصورة بينهما.' },
          { id: 'asa', label: 'تساوي ضلع وزاويتين مجاورتين له.' },
        ],
        answer: 'sss',
        reason:
          'الأطوال الثلاثة متساوية في المثلثين ($2$ و$3$ و$2.6$) مع مقابلاتها؛ فيتطابقان بحالة الأضلاع الثلاثة، ولا نحتاج إلى قياس أي زاوية.',
      },
      {
        id: 'pair-2',
        label: '②',
        prompt: 'الضلعان $2$ و$4$ والزاوية المحصورة بينهما $80°$ في المثلثين.',
        options: [
          { id: 'sss', label: 'تساوي أطوال الأضلاع الثلاثة مع مقابلاتها.' },
          { id: 'sas', label: 'تساوي ضلعين والزاوية المحصورة بينهما.' },
          { id: 'asa', label: 'تساوي ضلع وزاويتين مجاورتين له.' },
        ],
        answer: 'sas',
        reason:
          'الضلعان $2$ و$4$ متساويان في المثلثين، والزاوية $80°$ محصورة بينهما؛ فيتطابقان بحالة ضلعين والزاوية المحصورة. لو كانت الزاوية غير محصورة لما كفى ذلك.',
      },
      {
        id: 'pair-3',
        label: '③',
        prompt: 'الضلع $4$ والزاويتان المجاورتان له $44°$ و$82°$ في المثلثين.',
        options: [
          { id: 'sss', label: 'تساوي أطوال الأضلاع الثلاثة مع مقابلاتها.' },
          { id: 'sas', label: 'تساوي ضلعين والزاوية المحصورة بينهما.' },
          { id: 'asa', label: 'تساوي ضلع وزاويتين مجاورتين له.' },
        ],
        answer: 'asa',
        reason:
          'الضلع $4$ متساوٍ في المثلثين، والزاويتان $44°$ و$82°$ مجاورتان له في كليهما؛ فيتطابقان بحالة ضلع وزاويتين مجاورتين له.',
      },
    ],
  },
};

export const kiteLabDiagram: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'authored',
  id: 'auth-04-kite-lab',
  renderer: 'kite-pair-lab',
  alt: 'تمرين تفاعلي على الطائرة الورقية: يختار الطالب أزواج المثلثات التي يظنّها متطابقة، ثم يرى التصحيح مع التعليل.',
  caption: 'تمرين من إعداد المنصّة — يتبع التمرين ① المطبوع، والتصحيح لا يظهر قبل المراجعة.',
  params: {
    title: 'أزواج المثلثات في الطائرة الورقية',
    intro: 'حدّد كل زوج من المثلثات تعتقد أنه متطابق. عند المراجعة يظهر التعليل الكامل لكل اختيار.',
    figure: figureKite as unknown as Record<string, unknown>,
    options: [
      {
        id: 'abe-ade',
        label: 'المثلثان $ABE$ و$ADE$',
        answer: true,
        reason:
          'الضلع $AE$ مشترك، و$BE = ED = 8$، والزاوية عند $E$ قائمة في المثلثين؛ فيتطابقان بحالة ضلعين والزاوية المحصورة.',
      },
      {
        id: 'bce-cde',
        label: 'المثلثان $BCE$ و$CDE$',
        answer: true,
        reason:
          'الضلع $CE$ مشترك، و$BE = ED = 8$، والزاوية عند $E$ قائمة في المثلثين؛ فيتطابقان بحالة ضلعين والزاوية المحصورة.',
      },
      {
        id: 'abc-adc',
        label: 'المثلثان $ABC$ و$ADC$',
        answer: true,
        reason:
          '$AB = AD = 14.4$ و$BC = CD = 10$ والضلع $AC$ مشترك؛ فيتطابقان بحالة الأضلاع الثلاثة.',
      },
      {
        id: 'abe-bce',
        label: 'المثلثان $ABE$ و$BCE$',
        answer: false,
        reason:
          'الوتران مختلفان ($AB$ نحو $14.4$ و$BC = 10$)، فلا يتطابق المثلثان رغم اشتراكهما في الضلع $BE$.',
      },
      {
        id: 'abd-cbd',
        label: 'المثلثان $ABD$ و$CBD$',
        answer: false,
        reason:
          'المثلث $ABD$ متساوي الساقين ورأسه $A$، والمثلث $CBD$ متساوي الساقين ورأسه $C$؛ ضلعاهما $AD$ و$CD$ مختلفان، فلا تطابق.',
      },
      {
        id: 'aeb-cfb',
        label: 'المثلثان $AEB$ و$CFB$',
        answer: false,
        reason:
          'المثلث $AEB$ قائم في $E$ والوتر $AB$، والمثلث $CFB$ قائم في $F$ والوتر $CB$؛ الوتران مختلفان.',
      },
    ],
  },
};

export const proofLabDiagram: InteractiveDiagram = {
  kind: 'interactive',
  origin: 'authored',
  id: 'auth-04-proof-lab',
  renderer: 'congruence-proof-lab',
  alt: 'مختبر برهان: أربع مهام على الشكل المتساوي الساقين، تُراجع كلها معاً بعد الإجابة.',
  caption: 'برهان موجّه من إعداد المنصّة — يتبع التمرين ③ المطبوع خطوة بخطوة.',
  params: {
    title: 'برهان في مثلث متساوي الساقين',
    intro:
      'أجب عن المهام الأربع ثم اضغط «راجع برهاني». لا تظهر أي نتيجة قبل المراجعة، والتصحيح يشرح سبب كل خطوة.',
    figure: figureIsosceles as unknown as Record<string, unknown>,
    tasks: [
      {
        id: 'part-1',
        prompt: 'ما المعطيات التي تثبت تطابق $MEB$ و$MFC$؟',
        options: [
          {
            id: 'a',
            label:
              '$\\widehat{MEB} = \\widehat{MFC} = 90°$، و$BM = MC$، و$\\widehat{MBE} = \\widehat{MCF}$.',
          },
          {
            id: 'b',
            label: '$ME = MF$ فقط، فالضلعان متساويان.',
          },
          {
            id: 'c',
            label: '$\\widehat{B} = \\widehat{C}$ فقط، فزاويتا المثلثين متساويتان.',
          },
        ],
        answer: 'a',
        reason:
          'الزاويتان عند $E$ و$F$ قائمتان، والزاويتان $\\widehat{MBE}$ و$\\widehat{MCF}$ هما زاويتا القاعدة المتساويتان، والضلع $BM = MC$. الضلعان $BM$ و$MC$ هما الضلعان المعلومان، والزاوية القائمة عند $E$ (أو $F$) مجاورة لهما، فتكون الحالة: ضلع وزاويتان مجاورتان له.',
      },
      {
        id: 'part-2',
        prompt: 'بعد إثبات $MEB$ ≅ $MFC$، ما الذي يثبت تطابق $MEA$ و$MFA$؟',
        options: [
          {
            id: 'a',
            label:
              '$MA$ مشترك، و$ME = MF$، والزاويتان عند $E$ و$F$ قائمتان؛ حالة الوتر وضلع القائمة.',
          },
          { id: 'b', label: '$AE = AF$ لأنهما يبدوان كذلك في الرسم.' },
          { id: 'c', label: 'تساوي الزاويتين $\\widehat{EAM}$ و$\\widehat{MAF}$ وحده.' },
        ],
        answer: 'a',
        reason:
          'في المثلثين القائمين $MEA$ و$MFA$: الوتر $MA$ مشترك، و$ME = MF$ من التطابق السابق، والزاويتان عند $E$ و$F$ قائمتان؛ فيتطابقان بحالة الوتر وضلع قائمة.',
      },
      {
        id: 'part-3',
        prompt: 'كيف نستنتج أن المثلث $ABC$ متساوي الساقين، أي $AB = AC$؟',
        options: [
          {
            id: 'a',
            label:
              '$AE = AF$ من تطابق $MEA$ و$MFA$، و$EB = FC$ من تطابق $MEB$ و$MFC$؛ إذن $AB = AE + EB = AF + FC = AC$.',
          },
          { id: 'b', label: 'لأن $BM = MC$، وهذا يعني مباشرة أن $AB = AC$.' },
          { id: 'c', label: 'لأن الزاويتين $\\widehat{B}$ و$\\widehat{C}$ متساويتان، فيكفي ذلك.' },
        ],
        answer: 'a',
        reason:
          'كل تطابق يعطي ضلعين متقابلين متساويين، ثم نجمع القطعتين على كل ساق: $AB = AE + EB$ و$AC = AF + FC$. النتيجة $AB = AC$.',
      },
      {
        id: 'part-4',
        prompt: 'كيف نستنتج أن $(AM)$ ارتفاع ومنصّف للزاوية $A$؟',
        options: [
          {
            id: 'a',
            label:
              'من تطابق $MEA$ و$MFA$: $\\widehat{EAM} = \\widehat{MAF}$، فـ$(AM)$ منصّف؛ ومن التطابق نفسه $AE = AF$، وبما أن $M$ منتصف $BC$ فإن $(AM)$ عمودي على $BC$.',
          },
          { id: 'b', label: 'لأن الرسم يبدو متماثلاً حول $(AM)$.' },
          { id: 'c', label: 'لأن $AB = AC$ فقط.' },
        ],
        answer: 'a',
        reason:
          'تطابق المثلثين $MEA$ و$MFA$ يعطي تساوي الزاويتين عند $A$ (منصّف) وتساوي $AE$ و$AF$؛ وبما أن $BM = MC$ فإن $M$ منتصف القاعدة في المثلث المتساوي الساقين، فالوسيط $(AM)$ عمودي على القاعدة، أي ارتفاع.',
      },
    ],
  },
};

/* --------------------------------------------------------------------------
 *  Teacher-only figure for the activity (page 17, questions 1 and 2):
 *  the completed triangle ① and its image under N → M.
 * ----------------------------------------------------------------------- */

export const teacherActivityFigure = (() => {
  const base = caseLocalSpec('sas', true);
  const { A, B, C } = page17Cases.sas;
  const v: XY = [
    page17VectorNM.to[0] - page17VectorNM.from[0],
    page17VectorNM.to[1] - page17VectorNM.from[1],
  ];
  const image = {
    A: [A[0] + v[0], A[1] + v[1]] as XY,
    B: [B[0] + v[0], B[1] + v[1]] as XY,
    C: [C[0] + v[0], C[1] + v[1]] as XY,
  };

  const spec: FigureSpec = {
    // Same window as the student lab that draws this activity, so the teacher's
    // completed figure is the very same picture the class saw.
    viewBox: { x: 1.3, y: 0.2, w: 10.4, h: 6.6 },
    polygons: [...(base.polygons ?? []), { points: [image.A, image.B, image.C], tone: 'image' }],
    segments: [
      ...(base.segments ?? []),
      { from: image.A, to: image.B, tone: 'image' },
      { from: image.B, to: image.C, tone: 'image' },
      { from: image.C, to: image.A, tone: 'image' },
      { from: A, to: stopShort(A, image.A, 0.95), tone: 'aux', dashed: true, arrow: true },
      { from: B, to: stopShort(B, image.B, 0.95), tone: 'aux', dashed: true, arrow: true },
      { from: C, to: stopShort(C, image.C, 0.95), tone: 'aux', dashed: true, arrow: true },
    ],
    angles: base.angles ?? [],
    points: [
      ...(base.points ?? []),
      { at: image.A, label: 'A′', place: 'sw', tone: 'image' },
      { at: image.B, label: 'B′', place: 'se', tone: 'image' },
      { at: image.C, label: 'C′', place: 'n', tone: 'image' },
    ],
    texts: base.texts ?? [],
  };

  return constructedAuthored(
    {
      id: 'auth-04-teacher-activity',
      alt: 'المثلث $ABC$ بعد إكمال الشكل ①، وصورته $A′B′C′$ وفق الانسحاب الذي ينقل $N$ إلى $M$، مع أسهم متقطعة تصل كل رأس بصورته.',
      caption: 'توضيح من إعداد المنصّة — إكمال الشكل ① ثم رسم صورته بالانسحاب $N \\to M$.',
    },
    spec,
  );
})();
