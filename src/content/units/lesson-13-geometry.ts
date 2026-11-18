import type { XY } from '@/lib/geometryFigure';
import { cross2D, distXY, dot2D, lineIntersection, midPoint, unitVec } from './lesson-10-geometry';

/**
 * ============================================================================
 *  الوحدة الثالثة، الدرس الأول — «محور ضلع في المثلث» (الصفحات 53–55)
 *  EXACT CARTESIAN GEOMETRY (x right, y up)
 * ============================================================================
 *
 *  Every coordinate of this lesson is COMPUTED, never eyeballed:
 *
 *    • «محور القطعة» is built from the midpoint of its segment and the exact
 *      normal of that segment, so it is perpendicular AT the midpoint by
 *      construction — the definition itself is what the figure draws;
 *    • the point where two bisectors meet is a LINE INTERSECTION, so the
 *      concurrence stated on page 55 is a computed fact of these scenes and not
 *      a drawing that merely looks right;
 *    • «الدائرة المارة برؤوس المثلث» is drawn from that computed centre with
 *      the computed radius, so it passes through the three vertices exactly;
 *    • the right-at-A panel of page 55 puts A on the circle of diameter [BC]
 *      (Thales), which places O exactly at the midpoint of [BC];
 *    • the obtuse panel puts O on the far side of (BC) from A, which makes the
 *      angle at A exactly obtuse.
 *
 *  `lesson-13-geometry.test.ts` re-derives every one of those claims from the
 *  raw coordinates, so no figure can drift away from what it states.
 *
 *  Shared helpers come from `lesson-10-geometry.ts` — the established
 *  convention (Lesson 11 imports from Lesson 10 rather than copying).
 * ============================================================================
 */

export interface Triangle {
  A: XY;
  B: XY;
  C: XY;
}

/** «محور القطعة [p q]»: the midpoint it cuts the segment at, and its direction. */
export interface Bisector {
  /** Midpoint of `[p q]` — where the bisector cuts the segment. */
  foot: XY;
  /** Unit vector along the bisector (normal to `[p q]`). */
  dir: XY;
  /** Direction of the segment itself, for its midpoint ticks. */
  sideDir: XY;
}

export function perpendicularBisector(p: XY, q: XY): Bisector {
  const foot = midPoint(p, q);
  const sideDir = unitVec(p, q);
  return { foot, dir: [-sideDir[1], sideDir[0]], sideDir };
}

/** The drawn portion of the bisector of `[p q]`: `back` behind, `forward` beyond. */
export function bisectorLine(p: XY, q: XY, back: number, forward: number): [XY, XY] {
  const { foot, dir } = perpendicularBisector(p, q);
  return [
    [foot[0] - dir[0] * back, foot[1] - dir[1] * back],
    [foot[0] + dir[0] * forward, foot[1] + dir[1] * forward],
  ];
}

/** A point of the bisector of `[p q]`, `t` units from the foot. */
export function pointOnBisector(p: XY, q: XY, t: number): XY {
  const { foot, dir } = perpendicularBisector(p, q);
  return [foot[0] + dir[0] * t, foot[1] + dir[1] * t];
}

/** Convenience: `{ from, to }` of the drawn portion of a bisector. */
function spanOf(p: XY, q: XY, back: number, forward: number): { from: XY; to: XY } {
  const [from, to] = bisectorLine(p, q, back, forward);
  return { from, to };
}

/** `O` — where the bisectors of `[AB]` and `[BC]` meet. */
export function circumcenter(triangle: Triangle): XY {
  const first = perpendicularBisector(triangle.A, triangle.B);
  const second = perpendicularBisector(triangle.B, triangle.C);
  return lineIntersection(
    first.foot,
    [first.foot[0] + first.dir[0], first.foot[1] + first.dir[1]],
    second.foot,
    [second.foot[0] + second.dir[0], second.foot[1] + second.dir[1]],
  );
}

/** `OA = OB = OC`. */
export function circumradius(triangle: Triangle): number {
  return distXY(circumcenter(triangle), triangle.A);
}

export function isRightAngleAt(v: XY, a: XY, b: XY): boolean {
  return Math.abs(dot2D(v, a, v, b)) < 1e-9;
}

export function isIsoscelesAt(v: XY, a: XY, b: XY): boolean {
  return Math.abs(distXY(v, a) - distXY(v, b)) < 1e-9;
}

/** True when `o` is on the segment `[pq]`. */
export function onSegment(o: XY, p: XY, q: XY): boolean {
  return (
    Math.abs(cross2D(p, q, p, o)) < 1e-9 &&
    Math.min(p[0], q[0]) - 1e-9 <= o[0] &&
    o[0] <= Math.max(p[0], q[0]) + 1e-9 &&
    Math.min(p[1], q[1]) - 1e-9 <= o[1] &&
    o[1] <= Math.max(p[1], q[1]) + 1e-9
  );
}

/** True when `o` lies on the line `(pq)` but outside the segment `[pq]`. */
export function isOnLineOutsideSegment(o: XY, p: XY, q: XY): boolean {
  return Math.abs(cross2D(p, q, p, o)) < 1e-9 && !onSegment(o, p, q);
}

/** True when `o` lies strictly inside the triangle. */
export function isInsideTriangle(o: XY, triangle: Triangle): boolean {
  const side = (p: XY, q: XY): number => {
    const u = [q[0] - p[0], q[1] - p[1]] as XY;
    const w = [o[0] - p[0], o[1] - p[1]] as XY;
    return u[0] * w[1] - u[1] * w[0];
  };
  const signs = [
    side(triangle.A, triangle.B),
    side(triangle.B, triangle.C),
    side(triangle.C, triangle.A),
  ];
  return signs.every((value) => value > 1e-9) || signs.every((value) => value < -1e-9);
}

/** Angle `kÔa` in degrees, in [0, 180]. */
export function measureAngle(k: XY, o: XY, a: XY): number {
  const u = unitVec(o, k);
  const v = unitVec(o, a);
  const cosine = Math.max(-1, Math.min(1, u[0] * v[0] + u[1] * v[1]));
  return (Math.acos(cosine) * 180) / Math.PI;
}

/** A point of the internal bisector of the angle `kMa`, `distance` from `M`. */
export function angleBisectorPoint(m: XY, k: XY, a: XY, distance: number): XY {
  const u = unitVec(m, k);
  const v = unitVec(m, a);
  const sum: XY = [u[0] + v[0], u[1] + v[1]];
  const dir = unitVec([0, 0], sum);
  return [m[0] + dir[0] * distance, m[1] + dir[1] * distance];
}

/** The two intersections of the equal circles of radius `r` centred at `p` and `q`. */
export function twoCircleIntersections(p: XY, q: XY, r: number): [XY, XY] {
  const mid = midPoint(p, q);
  const half = distXY(p, q) / 2;
  const height = Math.sqrt(Math.max(r * r - half * half, 0));
  const dir = unitVec(p, q);
  const normal: XY = [-dir[1], dir[0]];
  return [
    [mid[0] + normal[0] * height, mid[1] + normal[1] * height],
    [mid[0] - normal[0] * height, mid[1] - normal[1] * height],
  ];
}

/** The intersection of those two circles that lies nearer to `reference`. */
export function circleIntersectionNearA(c1: XY, c2: XY, r: number, reference: XY): XY {
  const [first, second] = twoCircleIntersections(c1, c2, r);
  return distXY(first, reference) <= distXY(second, reference) ? first : second;
}

/** Direction `centre → point` as an angle in degrees, counter-clockwise from +x. */
export function angleDeg(centre: XY, point: XY): number {
  const value = (Math.atan2(point[1] - centre[1], point[0] - centre[0]) * 180) / Math.PI;
  return (value + 360) % 360;
}

/**
 * The compass arc of centre `c` and radius `r` that runs from `a` to `b` on the
 * side of the circle where `through` lies.
 *
 * The renderer always sweeps counter-clockwise, so the direction has to be
 * decided here — from the geometry, not by guessing which way looks shorter.
 */
export function arcThrough(c: XY, a: XY, b: XY, through: XY): { from: number; to: number } {
  const angleA = angleDeg(c, a);
  const angleB = angleDeg(c, b);
  const angleThrough = angleDeg(c, through);
  const ccw = (angleB - angleA + 360) % 360;
  const ccwThrough = (angleThrough - angleA + 360) % 360;
  const throughIsOnCcwArc = ccwThrough <= ccw;
  return throughIsOnCcwArc ? { from: angleA, to: angleB } : { from: angleB, to: angleA };
}

/** A turned copy of the triangle, used to lay panels side by side. */
export function translateTriangle(triangle: Triangle, dx: number, dy: number): Triangle {
  const move = (p: XY): XY => [p[0] + dx, p[1] + dy];
  return { A: move(triangle.A), B: move(triangle.B), C: move(triangle.C) };
}

/* -------------------------------------------------------------------------- */
/*  1. الصفحة 54 — شكل التعريف                                                 */
/* -------------------------------------------------------------------------- */

/** Page 54, definition figure: a scalene triangle and the bisector of `[BC]`. */
export const L13_DEFINITION_TRIANGLE: Triangle = {
  A: [3.55, 6.35],
  B: [0.75, 0.95],
  C: [8.45, 1.15],
};

export const L13_DEFINITION = (() => {
  const triangle = L13_DEFINITION_TRIANGLE;
  const bisector = perpendicularBisector(triangle.B, triangle.C);
  const [from, to] = bisectorLine(triangle.B, triangle.C, 1.1, 5.9);
  return { ...triangle, bisector, from, to };
})();

/* -------------------------------------------------------------------------- */
/*  2. الصفحة 54 — شكل الخواصّ                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Page 54, properties figure: `M` is a point of the bisector of `[BC]`, so
 * `MB = MC`. The scene derives `M` FROM the bisector, so the equality is exact.
 */
export const L13_PROPERTY = (() => {
  const B: XY = [1.15, 1.15];
  const C: XY = [7.85, 1.45];
  const bisector = perpendicularBisector(B, C);
  const M: XY = [
    bisector.foot[0] + bisector.dir[0] * 5.1,
    bisector.foot[1] + bisector.dir[1] * 5.1,
  ];
  const from: XY = [
    bisector.foot[0] - bisector.dir[0] * 1.15,
    bisector.foot[1] - bisector.dir[1] * 1.15,
  ];
  const to: XY = [
    bisector.foot[0] + bisector.dir[0] * 5.9,
    bisector.foot[1] + bisector.dir[1] * 5.9,
  ];
  return { M, B, C, bisector, from, to, MB: distXY(M, B), MC: distXY(M, C) };
})();

/* -------------------------------------------------------------------------- */
/*  3. الصفحة 54 — نشاط «محاور أضلاع المثلث متلاقية»                            */
/* -------------------------------------------------------------------------- */

/**
 * The activity triangle of page 54 is deliberately SCALENE and free of right
 * angles, exactly as the printed marginal note demands («يجب ألا يُرسم شكل في
 * حالة خاصة»): with a special triangle the concurrence could be a symmetry
 * artefact rather than a theorem.
 */
export const L13_ACTIVITY_TRIANGLE: Triangle = {
  A: [3.9, 6.55],
  B: [0.7, 0.95],
  C: [8.6, 1.45],
};

export interface ActivityScene extends Triangle {
  /** (d) — bisector of [AB]. */
  d: Bisector;
  /** (d′) — bisector of [BC]. */
  dPrime: Bisector;
  /** (d″) — bisector of [AC], the line the activity's ② makes the student reach. */
  dSecond: Bisector;
  /** O = (d) ∩ (d′). */
  O: XY;
  /** R = OA = OB = OC, the radius of the circle of ③. */
  R: number;
  /** The drawn portion of each bisector, in printed order (d), (d′), (d″). */
  lines: { from: XY; to: XY }[];
  equalities: { OA_OB: boolean; OB_OC: boolean; OA_OC: boolean };
  /** O really belongs to (d″) — the conclusion of the activity's ②. */
  oOnDSecond: boolean;
  /** The triangle has no right angle and no two equal sides (the printed demand). */
  isScalene: boolean;
  hasNoRightAngle: boolean;
}

export function buildActivityScene(triangle: Triangle = L13_ACTIVITY_TRIANGLE): ActivityScene {
  const d = perpendicularBisector(triangle.A, triangle.B);
  const dPrime = perpendicularBisector(triangle.B, triangle.C);
  const dSecond = perpendicularBisector(triangle.A, triangle.C);
  const O = circumcenter(triangle);
  const R = distXY(O, triangle.A);
  const sides = [
    distXY(triangle.A, triangle.B),
    distXY(triangle.B, triangle.C),
    distXY(triangle.C, triangle.A),
  ];
  return {
    ...triangle,
    d,
    dPrime,
    dSecond,
    O,
    R,
    /**
     * Each bisector runs from a couple of units OUTSIDE the triangle to just past
     * `O`. One end therefore carries the label, and the other ends at the point
     * the whole activity is about: the two lines are seen to meet, rather than
     * asserted to.
     */
    lines: [
      spanTowardsO(triangle.A, triangle.B, O, 2.3, 0.4),
      spanTowardsO(triangle.B, triangle.C, O, 2.5, 0.4),
      spanTowardsO(triangle.A, triangle.C, O, 2.3, 0.4),
    ],
    equalities: {
      OA_OB: Math.abs(distXY(O, triangle.A) - distXY(O, triangle.B)) < 1e-9,
      OB_OC: Math.abs(distXY(O, triangle.B) - distXY(O, triangle.C)) < 1e-9,
      OA_OC: Math.abs(distXY(O, triangle.A) - distXY(O, triangle.C)) < 1e-9,
    },
    oOnDSecond:
      Math.abs(
        cross2D(
          dSecond.foot,
          [dSecond.foot[0] + dSecond.dir[0], dSecond.foot[1] + dSecond.dir[1]],
          dSecond.foot,
          O,
        ),
      ) < 1e-9,
    isScalene:
      Math.abs(sides[0]! - sides[1]!) > 1e-6 &&
      Math.abs(sides[1]! - sides[2]!) > 1e-6 &&
      Math.abs(sides[0]! - sides[2]!) > 1e-6,
    hasNoRightAngle:
      !isRightAngleAt(triangle.A, triangle.B, triangle.C) &&
      !isRightAngleAt(triangle.B, triangle.A, triangle.C) &&
      !isRightAngleAt(triangle.C, triangle.A, triangle.B),
  };
}

/* -------------------------------------------------------------------------- */
/*  4. الصفحة 55 — «خاصة وتعریف»: الحالات الثلاث                                */
/* -------------------------------------------------------------------------- */

export type SpecialCaseId = 'acute' | 'obtuse' | 'right';

export interface SpecialCaseScene extends Triangle {
  id: SpecialCaseId;
  /** Short Arabic label used by the lab's presets. */
  label: string;
  /** The printed caption under the panel. */
  caption: string;
  O: XY;
  R: number;
  /** Where the circumcentre falls relative to the triangle. */
  position: 'inside' | 'outside' | 'on-side';
  /** The three bisectors, already spanned for drawing. */
  bisectors: { from: XY; to: XY }[];
}

/**
 * The three printed panels of page 55. Their whole point is WHERE `O` falls:
 * inside for the acute triangle, beyond (BC) for the obtuse one, and exactly at
 * the middle of the hypotenuse for the right one. Each case is produced by
 * construction (O first, then A on its circle), so the position is not drawn —
 * it is forced.
 */
export const L13_SPECIAL_CASES: readonly SpecialCaseScene[] = [
  buildSpecialCase('acute', 'مثلث حاد الزوايا', 'المثلث $ABC$ حاد الزوايا', {
    A: [3.5, 6.0],
    B: [1.0, 1.5],
    C: [7.2, 1.1],
  }),
  buildSpecialCase(
    'obtuse',
    'مثلث منفرج في $\\widehat{A}$',
    'المثلث $ABC$ منفرج في $\\widehat{A}$',
    (() => {
      const B: XY = [1.0, 3.55];
      const C: XY = [7.6, 3.55];
      const O: XY = [4.3, 1.3];
      const R = distXY(O, B);
      const angle = (104 * Math.PI) / 180;
      return { A: [O[0] + R * Math.cos(angle), O[1] + R * Math.sin(angle)] as XY, B, C };
    })(),
  ),
  buildSpecialCase(
    'right',
    'مثلث قائم في $\\widehat{A}$',
    'المثلث $ABC$ قائم في $\\widehat{A}$',
    (() => {
      const B: XY = [0.9, 1.2];
      const C: XY = [7.3, 1.2];
      const O: XY = midPoint(B, C);
      const R = distXY(B, C) / 2;
      const angle = (115 * Math.PI) / 180;
      return { A: [O[0] + R * Math.cos(angle), O[1] + R * Math.sin(angle)] as XY, B, C };
    })(),
  ),
];

/**
 * The bisector of `[PQ]` as a stroke that starts just behind its foot and ends
 * just past the circumcentre. `O` is computed inside `buildSpecialCase`, so this
 * helper takes it as a parameter.
 */
function spanTowardsO(p: XY, q: XY, O: XY, back = 0.9, past = 0.35): { from: XY; to: XY } {
  const bisector = perpendicularBisector(p, q);
  const dot =
    (bisector.foot[0] - O[0]) * bisector.dir[0] + (bisector.foot[1] - O[1]) * bisector.dir[1];
  const sign = dot >= 0 ? -1 : 1; // point from the foot towards O
  const u: XY = [bisector.dir[0] * sign, bisector.dir[1] * sign];
  const toO = distXY(bisector.foot, O);
  // Only a short overhang past `O`: strokes that run far beyond the centre read
  // as a star burst instead of a crossing.
  const forward = Math.max(2.0, toO + past);
  return {
    from: [bisector.foot[0] - u[0] * back, bisector.foot[1] - u[1] * back],
    to: [bisector.foot[0] + u[0] * forward, bisector.foot[1] + u[1] * forward],
  };
}

function buildSpecialCase(
  id: SpecialCaseId,
  label: string,
  caption: string,
  triangle: Triangle,
): SpecialCaseScene {
  const O = circumcenter(triangle);
  const R = distXY(O, triangle.A);
  const position: SpecialCaseScene['position'] = isInsideTriangle(O, triangle)
    ? 'inside'
    : onSegment(O, triangle.B, triangle.C)
      ? 'on-side'
      : 'outside';
  return {
    ...triangle,
    id,
    label,
    caption,
    O,
    R,
    position,
    /**
     * Each bisector is drawn TOWARDS `O` and slightly past it.
     *
     * The whole point of the panel is that the three lines are concurrent: a
     * fixed-length stroke would stop short of `O` in the obtuse case, where the
     * centre lies far outside the triangle, and the figure would then only
     * ASSERT the concurrence instead of showing it. Lengthening towards `O`
     * makes the three lines meet on the page in every case.
     */
    bisectors: [
      spanTowardsO(triangle.A, triangle.B, O),
      spanTowardsO(triangle.B, triangle.C, O),
      spanTowardsO(triangle.A, triangle.C, O),
    ],
  };
}

export const L13_SPECIAL_ACUTE = L13_SPECIAL_CASES[0]!;
export const L13_SPECIAL_OBTUSE = L13_SPECIAL_CASES[1]!;
export const L13_SPECIAL_RIGHT = L13_SPECIAL_CASES[2]!;

/* -------------------------------------------------------------------------- */
/*  5. الصفحة 55 — «تحقّق من فهمك»                                             */
/* -------------------------------------------------------------------------- */

/**
 * «تحقّق من فهمك»: a circle centred `O` carrying three points, then the three
 * bisectors of the triangle they form. The scene reuses the acute panel, so the
 * three bisectors provably meet again at `O` — the observation the exercise
 * asks for in its ③.
 */
export const L13_CHECK = (() => {
  const scene = L13_SPECIAL_ACUTE;
  return {
    O: scene.O,
    R: scene.R,
    A: scene.A,
    B: scene.B,
    C: scene.C,
    bisectors: scene.bisectors,
  };
})();

/* -------------------------------------------------------------------------- */
/*  6. الصفحة 55 — تدرّب ①                                                     */
/* -------------------------------------------------------------------------- */

/**
 * «تدرّب ①» — the bisectors of `[AB]` and `[BC]` meet at `M`; prove `MAC` is
 * isosceles. The scene carries `MA`, `MB`, `MC` so the solution can cite the
 * two equalities of the box instead of asserting the conclusion.
 */
export const L13_PRACTICE_ONE = (() => {
  const triangle: Triangle = { A: [3.7, 6.3], B: [0.8, 1.0], C: [8.5, 1.5] };
  return {
    ...triangle,
    M: circumcenter(triangle),
    // Both bisectors run from just outside the triangle to just past `M`, so the
    // figure SHOWS `M` on the two lines instead of pointing at it.
    spans: [
      spanTowardsO(triangle.A, triangle.B, circumcenter(triangle), 2.1, 0.55),
      spanTowardsO(triangle.B, triangle.C, circumcenter(triangle), 2.1, 0.55),
    ],
    MA: distXY(circumcenter(triangle), triangle.A),
    MB: distXY(circumcenter(triangle), triangle.B),
    MC: distXY(circumcenter(triangle), triangle.C),
  };
})();

/* -------------------------------------------------------------------------- */
/*  7. الصفحة 55 — تدرّب ②                                                     */
/* -------------------------------------------------------------------------- */

/**
 * «تدرّب ②» — two triangles isosceles at `A` (ABC and ABD). `AC = AB` and
 * `AD = AB` force `AC = AD`, so B, C and D all lie on the circle centred at A:
 * the answer to the printed question is «A».
 */
export const L13_PRACTICE_TWO = (() => {
  const A: XY = [4.6, 4.1];
  const radius = 3.2;
  const onCircle = (degrees: number): XY => {
    const angle = (degrees * Math.PI) / 180;
    return [A[0] + radius * Math.cos(angle), A[1] + radius * Math.sin(angle)];
  };
  // Evenly spaced on the circle centred at `A` (120° apart), so every one of the
  // three triangles `ABC`, `ABD`, `BCD` is visibly a triangle: no two of the
  // three points come close to being antipodal, which would flatten the apex
  // angle at `A` and make «متساوي الساقين في A» look like a straight line.
  const B = onCircle(200);
  const C = onCircle(320);
  const D = onCircle(80);
  return {
    A,
    B,
    C,
    D,
    radius,
    AB: distXY(A, B),
    AC: distXY(A, C),
    AD: distXY(A, D),
  };
})();

/* -------------------------------------------------------------------------- */
/*  8. الصفحة 55 — تدرّب ③                                                     */
/* -------------------------------------------------------------------------- */

const PRACTICE_THREE_SCALE = 0.5;

/**
 * «تدرّب ③» — the printed sides 5, 7.5 and 8 cm, three circles centred at the
 * vertices with a radius GREATER THAN 5 cm, then the three bisectors.
 *
 * Every pair of circles meets in two points, because the printed radius (5.6)
 * exceeds half of the longest side (4); the line through those two points is the
 * bisector of the side the circles share. That identity is exactly what the
 * exercise's ④ asks the student to notice, and the geometry test checks it.
 */
export const L13_PRACTICE_THREE = (() => {
  const base = 7.5;
  const left = 5;
  const right = 8;
  const x = (left * left + base * base - right * right) / (2 * base);
  const y = Math.sqrt(left * left - x * x);
  const scale = PRACTICE_THREE_SCALE;
  const place = (p: XY): XY => [p[0] * scale + 1.6, p[1] * scale + 1.15];
  const A = place([x, y]);
  const B = place([0, 0]);
  const C = place([base, 0]);
  const radiusCm = 5.6; // printed condition: «أكبر من 5 cm»
  const radius = radiusCm * scale;
  return {
    A,
    B,
    C,
    scale,
    sidesCm: { AB: left, BC: base, CA: right },
    radiusCm,
    radius,
    circles: [
      { at: A, r: radius },
      { at: B, r: radius },
      { at: C, r: radius },
    ],
    bisectors: [spanOf(A, B, 1.5, 1.9), spanOf(B, C, 1.4, 1.8), spanOf(A, C, 1.5, 1.9)],
    O: circumcenter({ A, B, C }),
    R: circumradius({ A, B, C }),
    /** The circle-pair intersections, per side: they lie ON that side's bisector. */
    commonChords: [
      { side: 'BC', points: twoCircleIntersections(B, C, radius) },
      { side: 'CA', points: twoCircleIntersections(C, A, radius) },
      { side: 'AB', points: twoCircleIntersections(A, B, radius) },
    ],
  };
})();

/* -------------------------------------------------------------------------- */
/*  9. الصفحة 53 — أسئلة ① و②: الخطوط المميّزة الثلاثة                          */
/* -------------------------------------------------------------------------- */

/**
 * The three panels shared by questions ① and ② of the page-53 opener. All
 * three use the SAME scalene triangle, so only the marks can tell them apart —
 * which is exactly what the two questions ask the student to do:
 *
 *   ① the ALTITUDE from A to [BC]: perpendicular, passes through A, and its
 *     foot is NOT the midpoint (right-angle square only);
 *   ② the PERPENDICULAR BISECTOR of [BC]: perpendicular AT the midpoint, and it
 *     does not pass through A (square + the two midpoint ticks);
 *   ③ the MEDIAN from A: through the midpoint, but not perpendicular (midpoint
 *     ticks only, no square).
 */
export type PanelId = 'one' | 'two' | 'three';

export interface OpenerLinePanel {
  id: PanelId;
  label: string;
  /** Panel-local coordinates; the figure translates each panel into place. */
  triangle: Triangle;
  line: { from: XY; to: XY };
  /** Where the line meets (BC). */
  foot: XY;
  midpoint: XY;
  hasMidpointTicks: boolean;
  hasRightAngle: boolean;
  passesThroughA: boolean;
  footIsMidpoint: boolean;
}

/**
 * The one triangle of questions ① and ②.
 *
 * `A` is deliberately OFF the perpendicular through the midpoint of `[BC]`
 * (by about a unit): if the vertex sat near that perpendicular, panel ②'s
 * bisector would graze the letter `A` and a student could read the drawing as
 * «the bisector passes through the vertex» — the one thing the panel must NOT
 * say. The triangle stays scalene and free of right angles.
 */
const OPENER_TRIANGLE: Triangle = { A: [2.6, 5.45], B: [0.55, 0.75], C: [6.95, 1.05] };

export const L13_OPENER_LINE_PANELS: readonly OpenerLinePanel[] = (() => {
  const triangle = OPENER_TRIANGLE;
  const midpoint = midPoint(triangle.B, triangle.C);
  const sideDir = unitVec(triangle.B, triangle.C);
  const normal: XY = [-sideDir[1], sideDir[0]];

  // ① Altitude from A: A projected on (BC).
  const t =
    (triangle.A[0] - triangle.B[0]) * sideDir[0] + (triangle.A[1] - triangle.B[1]) * sideDir[1];
  const altitudeFoot: XY = [triangle.B[0] + sideDir[0] * t, triangle.B[1] + sideDir[1] * t];

  return [
    {
      id: 'one',
      label: '①',
      triangle,
      // The altitude is DRAWN from the vertex A down to the foot, with a short
      // overhang below [BC] as on the page; `from` stays the lower end so that
      // the right-angle square opens between [BC] and the upward direction.
      line: {
        from: [altitudeFoot[0] - normal[0] * 0.5, altitudeFoot[1] - normal[1] * 0.5],
        to: [triangle.A[0] + normal[0] * 0.4, triangle.A[1] + normal[1] * 0.4],
      },
      foot: altitudeFoot,
      midpoint,
      hasMidpointTicks: false,
      hasRightAngle: true,
      passesThroughA: true,
      footIsMidpoint: false,
    },
    {
      id: 'two',
      label: '②',
      triangle,
      line: {
        from: [midpoint[0] - normal[0] * 1.0, midpoint[1] - normal[1] * 1.0],
        to: [midpoint[0] + normal[0] * 4.5, midpoint[1] + normal[1] * 4.5],
      },
      foot: midpoint,
      midpoint,
      hasMidpointTicks: true,
      hasRightAngle: true,
      passesThroughA: false,
      footIsMidpoint: true,
    },
    {
      id: 'three',
      label: '③',
      triangle,
      line: {
        from: triangle.A,
        to: [
          midpoint[0] + (midpoint[0] - triangle.A[0]) * 0.28,
          midpoint[1] + (midpoint[1] - triangle.A[1]) * 0.28,
        ],
      },
      foot: midpoint,
      midpoint,
      hasMidpointTicks: true,
      hasRightAngle: false,
      passesThroughA: true,
      footIsMidpoint: true,
    },
  ];
})();

/* -------------------------------------------------------------------------- */
/*  10. الصفحة 53 — سؤال ③: قطعة ومحورها                                       */
/* -------------------------------------------------------------------------- */

/** Question ③: `(d)` is the bisector of `[JK]` and `M` belongs to `(d)`. */
export const L13_OPENER_SEGMENT = (() => {
  const J: XY = [2.1, 2.15];
  const K: XY = [7.3, 4.35];
  const bisector = perpendicularBisector(J, K);
  const M: XY = [
    bisector.foot[0] - bisector.dir[0] * 2.2,
    bisector.foot[1] - bisector.dir[1] * 2.2,
  ];
  const from: XY = [
    bisector.foot[0] - bisector.dir[0] * 3.2,
    bisector.foot[1] - bisector.dir[1] * 3.2,
  ];
  const to: XY = [
    bisector.foot[0] + bisector.dir[0] * 3.4,
    bisector.foot[1] + bisector.dir[1] * 3.4,
  ];
  return { J, K, M, bisector, from, to, MJ: distXY(M, J), MK: distXY(M, K) };
})();

/* -------------------------------------------------------------------------- */
/*  11. الصفحة 53 — سؤال ④: منصف الزاوية AMK                                    */
/* -------------------------------------------------------------------------- */

/**
 * The three panels of question ④. Their marks are what makes the answer
 * decidable, so each mark is reproduced exactly and its meaning is stated:
 *
 *   ① `MK = MA` is marked on the two sides, and a line is drawn through M —
 *      no mark says anything about the two ANGLES at M;
 *   ② a line joins M to the MIDPOINT of `[AK]` (equal ticks on both halves),
 *      and the right angle marked in that panel is at A, i.e. `[AK] ⟂ [AM]`.
 *      The line is therefore the MEDIAN from M of a right triangle, not the
 *      bisector of its apex angle (the two angles at M are unequal: 36.9° and
 *      53.1° — the test checks that they are);
 *   ③ the line is drawn through the two EQUAL angle marks at M.
 *
 * Only ③ marks the equality of the two angles, which is what «منصف الزاوية»
 * means — so ③ is the answer, and the other two panels are dismissed by what
 * they actually mark, not by how they look.
 */
export interface OpenerAnglePanel {
  id: PanelId;
  label: string;
  /** Panel-local coordinates. */
  M: XY;
  K: XY;
  A: XY;
  /** The red line of the panel. */
  line: { from: XY; to: XY };
  /** ① `MK = MA` marked on the two sides. */
  marksSides: boolean;
  /** ② a line from M to the midpoint of [AK]. */
  joinsMidpointOfKA: boolean;
  /** ② the right angle of that panel is at A, between [AK] and [AM]. */
  rightAngleAtA: boolean;
  /** ③ two equal angle marks at M. */
  equalAngleMarks: boolean;
  /** The two angles at M, in degrees (computed). */
  angles: { upper: number; lower: number };
}

export const L13_OPENER_ANGLE_PANELS: readonly OpenerAnglePanel[] = (() => {
  const M: XY = [0.75, 1.05];

  // ① An ISOSCELES angle at M with the two sides marked equal.
  const armOne = 5.4;
  const apexOne = (46 * Math.PI) / 180;
  const AOne: XY = [M[0] + armOne, M[1]];
  const KOne: XY = [M[0] + armOne * Math.cos(apexOne), M[1] + armOne * Math.sin(apexOne)];
  const lineOne = (16 * Math.PI) / 180;
  const atOne: XY = [M[0] + 6.1 * Math.cos(lineOne), M[1] + 6.1 * Math.sin(lineOne)];

  // ② A right triangle at A: the line joins M to the midpoint of [AK].
  const MTwo: XY = [0.75, 1.05];
  const ATwo: XY = [6.35, 1.05];
  const KTwo: XY = [6.35, 5.45];
  const midKA: XY = midPoint(KTwo, ATwo);
  const dirMid = unitVec(MTwo, midKA);

  // ③ The same isosceles angle as ①, bisected.
  const armThree = 5.4;
  const apexThree = (46 * Math.PI) / 180;
  const AThree: XY = [M[0] + armThree, M[1]];
  const KThree: XY = [M[0] + armThree * Math.cos(apexThree), M[1] + armThree * Math.sin(apexThree)];
  const bisectorAt = angleBisectorPoint(M, KThree, AThree, 6.1);

  return [
    {
      id: 'one',
      label: '①',
      M,
      K: KOne,
      A: AOne,
      line: { from: M, to: atOne },
      marksSides: true,
      joinsMidpointOfKA: false,
      rightAngleAtA: false,
      equalAngleMarks: false,
      angles: { upper: measureAngle(KOne, M, atOne), lower: measureAngle(atOne, M, AOne) },
    },
    {
      id: 'two',
      label: '②',
      M: MTwo,
      K: KTwo,
      A: ATwo,
      line: {
        from: MTwo,
        to: [midKA[0] + dirMid[0] * 0.85, midKA[1] + dirMid[1] * 0.85],
      },
      marksSides: false,
      joinsMidpointOfKA: true,
      rightAngleAtA: true,
      equalAngleMarks: false,
      angles: {
        upper: measureAngle(KTwo, MTwo, midKA),
        lower: measureAngle(midKA, MTwo, ATwo),
      },
    },
    {
      id: 'three',
      label: '③',
      M,
      K: KThree,
      A: AThree,
      line: { from: M, to: bisectorAt },
      marksSides: false,
      joinsMidpointOfKA: false,
      rightAngleAtA: false,
      equalAngleMarks: true,
      angles: {
        upper: measureAngle(KThree, M, bisectorAt),
        lower: measureAngle(bisectorAt, M, AThree),
      },
    },
  ];
})();

/* -------------------------------------------------------------------------- */
/*  12. الصفحة 53 سؤال ⑤ / الصفحة 54 سؤال ④: الأقواس                          */
/* -------------------------------------------------------------------------- */

/**
 * The compass construction of page 54's ④ (and the same figure on page 53):
 * an arc centred at A cuts the two sides at E and F (so `AE = AF`), then equal
 * arcs centred at E and F meet at P — on the same side of `(EF)` as A, so the
 * ray `[AP)` is the INTERNAL bisector of the angle.
 *
 * The page-54 version centres the arcs at B and C, at the ends of a segment,
 * and the two intersections then lie on that segment's perpendicular bisector.
 * Both are built here, because the lesson asks for both.
 */
export const L13_OPENER_ARCS = (() => {
  const A: XY = [2.2, 5.55];
  const B: XY = [0.75, 1.05];
  const C: XY = [8.25, 1.55];
  const rA = 3.0;
  const E: XY = [A[0] + unitVec(A, B)[0] * rA, A[1] + unitVec(A, B)[1] * rA];
  const F: XY = [A[0] + unitVec(A, C)[0] * rA, A[1] + unitVec(A, C)[1] * rA];
  // rEF must exceed |EF| / 2 (the arcs must meet) and stay below rA (the
  // meeting point must fall INSIDE the angle, so that [AP) bisects it).
  const rEF = 2.0;
  const P = circleIntersectionNearA(E, F, rEF, A);
  const AP = angleBisectorPoint(A, E, F, 3.6);
  // The arc centred at A runs INSIDE the angle, from E to F.
  const arcA = arcThrough(A, E, F, AP);
  // The two short arcs centred at E and at F meet at P.
  const span = 16;
  return {
    A,
    B,
    C,
    E,
    F,
    P,
    rA,
    rEF,
    arcA,
    arcE: { from: angleDeg(E, P) - span, to: angleDeg(E, P) + span },
    arcF: { from: angleDeg(F, P) - span, to: angleDeg(F, P) + span },
    bisectorTarget: AP,
    AE: distXY(A, E),
    AF: distXY(A, F),
    PE: distXY(P, E),
    PF: distXY(P, F),
    angleEAP: measureAngle(E, A, P),
    anglePAF: measureAngle(P, A, F),
  };
})();

/** Page 54's ④: equal arcs centred at B and C, at the ends of the side [BC]. */
export const L13_SEGMENT_ARCS = (() => {
  const B: XY = [1.5, 1.55];
  const C: XY = [7.9, 2.25];
  const r = 3.6;
  const [P1, P2] = twoCircleIntersections(B, C, r);
  const bisector = perpendicularBisector(B, C);
  // Each circle is drawn around the far side of the segment, so the two arcs
  // cross exactly at P1 and P2 — as the compass construction does.
  const farFrom = (centre: XY, other: XY): XY => {
    const dir = unitVec(centre, other);
    return [centre[0] - dir[0] * r, centre[1] - dir[1] * r];
  };
  return {
    B,
    C,
    r,
    P1,
    P2,
    arcB: arcThrough(B, P1, P2, farFrom(B, C)),
    arcC: arcThrough(C, P1, P2, farFrom(C, B)),
    // What the page prints: a short stroke at each intersection, on both sides.
    shortArcs: [P1, P2].flatMap((point) =>
      [B, C].map((centre) => ({
        at: centre,
        r,
        from: angleDeg(centre, point) - 15,
        to: angleDeg(centre, point) + 15,
      })),
    ),
    bisector,
    from: [
      bisector.foot[0] - bisector.dir[0] * 2.5,
      bisector.foot[1] - bisector.dir[1] * 2.5,
    ] as XY,
    to: [bisector.foot[0] + bisector.dir[0] * 2.7, bisector.foot[1] + bisector.dir[1] * 2.7] as XY,
  };
})();

/* -------------------------------------------------------------------------- */
/*  13. مختبر محور الضلع — the interactive lab scene                            */
/* -------------------------------------------------------------------------- */

export interface BisectorLabScene extends Triangle {
  O: XY;
  R: number;
  bisectors: { from: XY; to: XY }[];
  /** M — a point of the bisector of [BC], `t` units from the foot. */
  M: XY;
  foot: XY;
  MB: number;
  MC: number;
  /** `MB = MC` for EVERY `t`: the property of page 54. */
  equidistant: boolean;
  /** `O` lies on all three bisectors and `OA = OB = OC`: the «خاصة» of page 55. */
  concurrent: boolean;
  equalRadii: boolean;
  position: 'inside' | 'outside' | 'on-side';
}

/**
 * The lab of this lesson: the page-54 construction made dynamic.
 *
 * Sliding `M` along the bisector of `[BC]` never breaks `MB = MC` — the
 * property; and `O` with its circle never moves — the «خاصة». Both are
 * recomputed here from the geometry, never animated.
 */
export function buildBisectorLabScene(triangle: Triangle, t: number): BisectorLabScene {
  const O = circumcenter(triangle);
  const R = distXY(O, triangle.A);
  const bisectorBC = perpendicularBisector(triangle.B, triangle.C);
  const M: XY = [
    bisectorBC.foot[0] + bisectorBC.dir[0] * t,
    bisectorBC.foot[1] + bisectorBC.dir[1] * t,
  ];
  const MB = distXY(M, triangle.B);
  const MC = distXY(M, triangle.C);
  const onBisector = (bisector: Bisector): boolean =>
    Math.abs(
      cross2D(
        bisector.foot,
        [bisector.foot[0] + bisector.dir[0], bisector.foot[1] + bisector.dir[1]],
        bisector.foot,
        O,
      ),
    ) < 1e-9;
  const position: BisectorLabScene['position'] = isInsideTriangle(O, triangle)
    ? 'inside'
    : onSegment(O, triangle.B, triangle.C)
      ? 'on-side'
      : 'outside';
  return {
    ...triangle,
    O,
    R,
    bisectors: [
      spanTowardsO(triangle.A, triangle.B, O, 1.9, 0.4),
      spanTowardsO(triangle.B, triangle.C, O, 1.9, 0.4),
      spanTowardsO(triangle.A, triangle.C, O, 1.9, 0.4),
    ],
    M,
    foot: bisectorBC.foot,
    MB,
    MC,
    equidistant: Math.abs(MB - MC) < 1e-9,
    concurrent:
      onBisector(perpendicularBisector(triangle.A, triangle.B)) &&
      onBisector(perpendicularBisector(triangle.B, triangle.C)) &&
      onBisector(perpendicularBisector(triangle.A, triangle.C)),
    equalRadii:
      Math.abs(distXY(O, triangle.A) - distXY(O, triangle.B)) < 1e-9 &&
      Math.abs(distXY(O, triangle.B) - distXY(O, triangle.C)) < 1e-9,
    position,
  };
}
