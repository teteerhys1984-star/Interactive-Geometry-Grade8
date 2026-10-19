/**
 * ============================================================================
 *  الدرس الثاني — الهندسة الموثّقة (صفحات 8–10)
 * ============================================================================
 *
 *  Every coordinate in this file was read from the supplied scans and then
 *  verified arithmetically; the verification record is in
 *  `docs/LESSON-02-COVERAGE.md` §5. Nothing here is eyeballed.
 *
 *  Units are lattice cells / explanatory drawing units, not printed
 *  measurements: the book prints no lengths for the blank-sheet figures.
 *
 *  Screen convention: x increases to the right, y increases upwards (the SVG
 *  renderers flip y when they draw). Point names follow the book: primes for
 *  images (`M′`, `M″`), `P` and `Q` for the pre-images of `P′` and `Q′`.
 * ============================================================================
 */

export type XY = readonly [number, number];

export const add = (p: XY, v: XY): XY => [p[0] + v[0], p[1] + v[1]];
export const sub = (a: XY, b: XY): XY => [a[0] - b[0], a[1] - b[1]];
export const scale = (v: XY, k: number): XY => [v[0] * k, v[1] * k];
export const midpoint = (a: XY, b: XY): XY => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
export const distance = (a: XY, b: XY): number => Math.hypot(b[0] - a[0], b[1] - a[1]);

/** Translation vector that carries `a` onto `b`. */
export const vectorFromTo = (a: XY, b: XY): XY => sub(b, a);

/** Image of `p` under the translation that carries `a` onto `b`. */
export const imageOf = (p: XY, a: XY, b: XY): XY => add(p, vectorFromTo(a, b));

const EPSILON = 1e-9;

export function samePoint(a: XY, b: XY, tolerance = EPSILON): boolean {
  return Math.abs(a[0] - b[0]) <= tolerance && Math.abs(a[1] - b[1]) <= tolerance;
}

/**
 * Four points form a parallelogram **in the given cyclic order** exactly when
 * the diagonals share their midpoint. This is the property the Lesson 2
 * definition names («القطعتان ... متناصفتان»), so it is the right test to use.
 */
export function isParallelogram(a: XY, b: XY, c: XY, d: XY, tolerance = 1e-9): boolean {
  const first = midpoint(a, c);
  const second = midpoint(b, d);
  return samePoint(first, second, tolerance);
}

/** Signed area of a polygon; zero when the vertices are collinear. */
export function signedArea(points: readonly XY[]): number {
  let total = 0;
  for (let index = 0; index < points.length; index += 1) {
    const current = points[index] as XY;
    const next = points[(index + 1) % points.length] as XY;
    total += current[0] * next[1] - current[1] * next[0];
  }
  return total / 2;
}

/** True when `p` lies on the line through `a` and `b` (anywhere on it). */
export function onLine(a: XY, b: XY, p: XY, tolerance = 1e-9): boolean {
  const v = sub(b, a);
  const w = sub(p, a);
  return Math.abs(v[0] * w[1] - v[1] * w[0]) <= tolerance * Math.max(1, distance(a, b));
}

/** Midpoint of the two intersections of two circles, i.e. the foot on the centre line. */
export function circleCentresFoot(c1: XY, r1: number, c2: XY, r2: number): XY | null {
  const d = distance(c1, c2);
  if (d < EPSILON || d > r1 + r2 + EPSILON || d < Math.abs(r1 - r2) - EPSILON) return null;
  const along = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
  const ux = (c2[0] - c1[0]) / d;
  const uy = (c2[1] - c1[1]) / d;
  return [c1[0] + ux * along, c1[1] + uy * along];
}

/**
 * Both intersections of two circles, as an explicit pair. Returns `null` when
 * the circles do not meet. The two points are ordered by `y` (first = lower).
 */
export function circleIntersections(
  c1: XY,
  r1: number,
  c2: XY,
  r2: number,
): readonly [XY, XY] | null {
  const foot = circleCentresFoot(c1, r1, c2, r2);
  if (!foot) return null;
  const d = distance(c1, c2);
  const along = distance(c1, foot);
  const heightSquared = r1 * r1 - along * along;
  if (heightSquared < -EPSILON) return null;
  const height = Math.sqrt(Math.max(0, heightSquared));
  const ux = (c2[0] - c1[0]) / d;
  const uy = (c2[1] - c1[1]) / d;
  // Perpendicular direction (−uy, ux).
  const low: XY = [foot[0] + uy * height, foot[1] - ux * height];
  const high: XY = [foot[0] - uy * height, foot[1] + ux * height];
  return [low, high] as const;
}

/* --------------------------------------------------------------------------
 *  PAGE 8 — النشاط · 1. على ورقة سنتيمترية
 *  Printed sheet: 9 columns × 5 rows. The printed line runs from the top-left
 *  corner (0,5) down to the bottom edge at (5,0), so every point on it
 *  satisfies x + y = 5. Per the scan, M sits on column line 6 and the sheet
 *  keeps three empty cells to its right — that is where the ninth column comes
 *  from; the eight-column reading stopped two cells short of the printed edge.
 * ----------------------------------------------------------------------- */
export const page8 = {
  cols: 9,
  rows: 5,
  line: { from: [0, 5] as XY, to: [5, 0] as XY },
  points: {
    A: [4, 1] as XY,
    B: [1, 4] as XY,
    P: [2, 3] as XY,
    M: [6, 2] as XY,
    N: [1, 2] as XY,
  },
} as const;

export const page8Vector = vectorFromTo(page8.points.A, page8.points.B);

/** Images under the translation A → B. `N′` and `P′` fall outside the crop. */
export const page8Images = {
  M: imageOf(page8.points.M, page8.points.A, page8.points.B),
  N: imageOf(page8.points.N, page8.points.A, page8.points.B),
  P: imageOf(page8.points.P, page8.points.A, page8.points.B),
} as const;

/* --------------------------------------------------------------------------
 *  PAGE 10 — تدرّب ③
 *  Printed sheet: 8 columns × 6 rows; M sits exactly on the top-right corner.
 * ----------------------------------------------------------------------- */
export const page10 = {
  cols: 8,
  rows: 6,
  points: {
    M: [8, 6] as XY,
    N: [4, 5] as XY,
    A: [5, 4] as XY,
    B: [3, 1] as XY,
    PPrime: [4, 1] as XY,
    QPrime: [6, 1] as XY,
  },
} as const;

export const page10Vector = vectorFromTo(page10.points.A, page10.points.B);
export const page10InverseVector = vectorFromTo(page10.points.B, page10.points.A);

/**
 * Every point exercise ③ asks the student to place, computed from the printed
 * data. `N″` returns to the printed point `N` — a built-in check of the reading.
 */
export const page10Answers = {
  MPrime: imageOf(page10.points.M, page10.points.A, page10.points.B),
  MDoublePrime: add(imageOf(page10.points.M, page10.points.A, page10.points.B), page10Vector),
  NPrime: imageOf(page10.points.N, page10.points.A, page10.points.B),
  NDoublePrime: add(
    imageOf(page10.points.N, page10.points.A, page10.points.B),
    page10InverseVector,
  ),
  P: add(page10.points.PPrime, sub(page10.points.A, page10.points.B)),
  Q: add(page10.points.QPrime, sub(page10.points.B, page10.points.A)),
} as const;

/* --------------------------------------------------------------------------
 *  PAGE 10 — تدرّب ① : triangle and three successive translations
 * ----------------------------------------------------------------------- */
export interface TriangleChain {
  a: XY;
  b: XY;
  c: XY;
  e: XY;
  f: XY;
  g: XY;
}

/**
 * E = image of A under B→C; F = image of E under C→A; G = image of F under A→B.
 * For every triangle the three moves cancel: G coincides with A. That is the
 * point of the exercise, and it is asserted in the test suite.
 */
export function triangleChain(a: XY, b: XY, c: XY): TriangleChain {
  const e = add(a, sub(c, b));
  const f = add(e, sub(a, c));
  const g = add(f, sub(b, a));
  return { a, b, c, e, f, g };
}

/** The triangle used in the student lesson and the Teacher Area figure. */
export const practiceTriangle = triangleChain([0, 0], [6, 0], [1.5, 4.5]);

/* --------------------------------------------------------------------------
 *  PAGE 9 — the compass construction
 *  The printed relations are: M is right of G and below HG; C₁ is centred at M
 *  with radius GH; C₂ is centred at H with radius GM; the chosen intersection
 *  is the one that completes HGMM′. Distances are ours, relations are printed.
 * ----------------------------------------------------------------------- */
export const compassGiven = {
  H: [0, 0] as XY,
  G: [6, 0] as XY,
  M: [7.6, -2.6] as XY,
} as const;

export const compass = (() => {
  const { H, G, M } = compassGiven;
  const image = imageOf(M, G, H); // M′ = M + (H − G)
  const radiusFromImageCircle = distance(H, G); // GH
  const radiusFromGivenCircle = distance(G, M); // GM
  const intersections = circleIntersections(M, radiusFromImageCircle, H, radiusFromGivenCircle);
  return {
    H,
    G,
    M,
    image,
    radiusFromImageCircle,
    radiusFromGivenCircle,
    intersections,
    /** The rejected intersection: the one that is not the parallelogram completion. */
    rejected: intersections
      ? samePoint(intersections[0], image)
        ? intersections[1]
        : intersections[0]
      : null,
    /** Common midpoint of the diagonals of HGMM′. */
    diagonalMidpoint: midpoint(H, M),
  };
})();

/* --------------------------------------------------------------------------
 *  PAGE 10 — تدرّب ② : a parallelogram, its centre and three answers
 *  A general parallelogram is built from A, B and D; then every requested
 *  image is computed symbolically (coordinates) rather than asserted in words.
 * ----------------------------------------------------------------------- */
export const practiceParallelogram = (() => {
  const a: XY = [0, 0];
  const b: XY = [7, 0];
  const d: XY = [2, 4];
  const c: XY = add(d, sub(b, a)); // ABCD in order
  const centre = midpoint(a, c);
  return {
    A: a,
    B: b,
    C: c,
    D: d,
    M: centre,
    /** 1 — image of D under A→B. */
    imageOfD: imageOf(d, a, b),
    /** 2 — the point X for which A is the image of D under C→X. */
    translationTargetForA: add(sub(a, d), c),
    /** 3 — image of C under M→A. */
    imageOfC: imageOf(c, centre, a),
  };
})();

/* --------------------------------------------------------------------------
 *  The opening hook — platform coordinates, not the book's.
 *  A(1,4) → B(4,3) is “three columns right, one row down”; M(2,2) → M′(5,1).
 * ----------------------------------------------------------------------- */
export const hookSheet = {
  cols: 7,
  rows: 5,
  points: {
    A: [1, 4] as XY,
    B: [4, 3] as XY,
    M: [2, 2] as XY,
  },
  answer: imageOf([2, 2], [1, 4], [4, 3]),
} as const;
