/**
 * ============================================================================
 *  الدرس الرابع — الهندسة الموثّقة (صفحات 17–19)
 * ============================================================================
 *
 *  Every coordinate in this file is DERIVED from a value printed on pages
 *  17–19, never eyeballed from the scan. The derivation of each figure is
 *  written next to it and is re-checked arithmetically by
 *  `lesson-04-geometry.test.ts`; the figure-by-figure record is
 *  `docs/LESSON-04-FIGURES.md`.
 *
 *  Conventions:
 *    • screen/mathematical coordinates, x to the right, y UPWARDS
 *      (the SVG renderer flips y when it draws);
 *    • one unit = one explanatory drawing unit, not a printed centimetre;
 *    • point names follow the book exactly, primes for the images of the
 *      activity figure (A′, B′, C′).
 *
 *  The printed pages are schematic: no figure carries a complete set of
 *  measured distances. What they do carry — lengths, angle measures, right
 *  angles, "opposite sides of a parallelogram", "diagonals bisect" — fixes
 *  each configuration. Those are the constraints encoded below.
 * ============================================================================
 */

export type XY = readonly [number, number];

export const EPSILON = 1e-9;

export const add = (p: XY, v: XY): XY => [p[0] + v[0], p[1] + v[1]];
export const sub = (a: XY, b: XY): XY => [a[0] - b[0], a[1] - b[1]];
export const scale = (v: XY, k: number): XY => [v[0] * k, v[1] * k];
export const dot = (a: XY, b: XY): number => a[0] * b[0] + a[1] * b[1];
export const cross = (a: XY, b: XY): number => a[0] * b[1] - a[1] * b[0];
export const length = (v: XY): number => Math.hypot(v[0], v[1]);
export const distance = (a: XY, b: XY): number => length(sub(b, a));
export const midpoint = (a: XY, b: XY): XY => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

export const rad = (degrees: number): number => (degrees * Math.PI) / 180;
export const degrees = (radians: number): number => (radians * 180) / Math.PI;

/** Unit (or `len`-long) vector at `angle` degrees, measured from +x counter-clockwise. */
export const direction = (angle: number, len = 1): XY => [
  len * Math.cos(rad(angle)),
  len * Math.sin(rad(angle)),
];

export const translate = (p: XY, v: XY): XY => add(p, v);

/** Rotation about `centre`; a rigid transform, so every distance is preserved. */
export function rotate(p: XY, angle: number, centre: XY = [0, 0]): XY {
  const d = sub(p, centre);
  const c = Math.cos(rad(angle));
  const s = Math.sin(rad(angle));
  return [centre[0] + d[0] * c - d[1] * s, centre[1] + d[0] * s + d[1] * c];
}

/** Angle ABC in degrees, always in [0, 180]. */
export function angleAt(a: XY, b: XY, c: XY): number {
  const u = sub(a, b);
  const v = sub(c, b);
  const denom = length(u) * length(v);
  if (denom < EPSILON) return 0;
  const cosine = Math.max(-1, Math.min(1, dot(u, v) / denom));
  return degrees(Math.acos(cosine));
}

/** Signed angle from vector u to vector v, in degrees, in (−180, 180]. */
export function signedAngle(u: XY, v: XY): number {
  return degrees(Math.atan2(cross(u, v), dot(u, v)));
}

export function isRightAngle(a: XY, b: XY, c: XY, tolerance = 1e-7): boolean {
  return Math.abs(angleAt(a, b, c) - 90) <= tolerance;
}

export function areCollinear(a: XY, b: XY, p: XY, tolerance = 1e-9): boolean {
  return Math.abs(cross(sub(b, a), sub(p, a))) <= tolerance;
}

export function samePoint(a: XY, b: XY, tolerance = 1e-9): boolean {
  return Math.abs(a[0] - b[0]) <= tolerance && Math.abs(a[1] - b[1]) <= tolerance;
}

/** Four points form a parallelogram in the given cyclic order ⇔ the diagonals share a midpoint. */
export function isParallelogram(a: XY, b: XY, c: XY, d: XY, tolerance = 1e-9): boolean {
  return samePoint(midpoint(a, c), midpoint(b, d), tolerance);
}

/** Foot of the perpendicular from `p` onto the LINE through `a` and `b`. */
export function footOfPerpendicular(p: XY, a: XY, b: XY): XY {
  const ab = sub(b, a);
  const t = dot(sub(p, a), ab) / dot(ab, ab);
  return add(a, scale(ab, t));
}

/**
 * Intersection of the two rays `p1 + t·d1` and `p2 + s·d2`, or `null` when the
 * directions are parallel. The parameters are NOT clamped: the intersection of
 * the supporting lines is returned, which is what the constructions need.
 */
export function lineIntersection(p1: XY, d1: XY, p2: XY, d2: XY): XY | null {
  const denominator = cross(d1, d2);
  if (Math.abs(denominator) < 1e-12) return null;
  const t = cross(sub(p2, p1), d2) / denominator;
  return add(p1, scale(d1, t));
}

/* --------------------------------------------------------------------------
 *  TRIANGLE CONSTRUCTORS
 *  The textbook's three congruence cases are exactly the three ways a triangle
 *  is determined. Each constructor therefore returns the triangle the case
 *  guarantees to be unique, and the tests re-measure it against the printed
 *  values.
 * ----------------------------------------------------------------------- */

export interface Triangle {
  A: XY;
  B: XY;
  C: XY;
}

/** Case ① — two sides and the included angle at `A`. */
export function triangleFromSAS(
  A: XY,
  angleAB: number,
  AB: number,
  angleAC: number,
  AC: number,
): Triangle {
  return { A, B: add(A, direction(angleAB, AB)), C: add(A, direction(angleAC, AC)) };
}

/** Case ② — one side `[AC]` and the two adjacent angles at `A` and `C`. */
export function triangleFromASA(A: XY, C: XY, angleA: number, angleC: number): Triangle | null {
  const ac = sub(C, A);
  const baseAngle = degrees(Math.atan2(ac[1], ac[0]));
  // Interior angles open towards the same side of (AC) for a proper triangle.
  const fromA = add(A, direction(baseAngle + angleA));
  const fromC = add(C, direction(baseAngle + 180 - angleC));
  const B = lineIntersection(A, sub(fromA, A), C, sub(fromC, C));
  return B ? { A, B, C } : null;
}

/** Case ③ — the three side lengths, placed on `[AB]` pointing along `baseAngle`. */
export function triangleFromSSS(
  A: XY,
  AB: number,
  AC: number,
  BC: number,
  baseAngle = 0,
): Triangle | null {
  if (AB + AC <= BC + EPSILON || AB + BC <= AC + EPSILON || AC + BC <= AB + EPSILON) return null;
  const x = (AB * AB + AC * AC - BC * BC) / (2 * AB);
  const ySquared = AC * AC - x * x;
  if (ySquared < -1e-9) return null;
  const y = Math.sqrt(Math.max(0, ySquared));
  const B = add(A, direction(baseAngle, AB));
  const C = add(A, rotate([x, y], baseAngle));
  return { A, B, C };
}

/** Lengths of a triangle's three sides, keyed by the segment's endpoints. */
export function sideLengths(t: Triangle): { AB: number; BC: number; CA: number } {
  return { AB: distance(t.A, t.B), BC: distance(t.B, t.C), CA: distance(t.C, t.A) };
}

/* ==========================================================================
 *  PAGE 17 — نشاط «اكتشاف حالات تطابق المثلثات انطلاقاً من الانسحاب»
 * ==========================================================================
 *
 *  The printed panels give, for each case, only the data that case needs:
 *    ① AĈB … see below. Panel ① prints [AC] = 3, [AB] = 4 and BÂC = 35°.
 *    ② prints [AC] = 3, BÂC = 35° and AĈB = 85°.
 *    ③ prints [AC] = 3, [AB] = 4 and [BC] = 2 (the complete triangle).
 *
 *  The activity asks the student to TRANSLATE each panel by the vector that
 *  carries N onto M, so N and M are printed under every panel.
 * ========================================================================== */

/** Vector N→M in the activity: the printed N sits to the left of M. */
export const page17VectorNM = { from: [2.6, 0.9] as XY, to: [6.6, 0.9] as XY };

/**
 * Panel ① — the printed direction of [AC] is steeper than [AB] with BÂC = 35°:
 * the scan shows C above B, which fixes which side of the angle each length
 * occupies. 65° / 30° is a faithful placing of those two printed directions.
 */
export const page17CaseSAS = triangleFromSAS([2.6, 2.6], 30, 4, 65, 3);

/**
 * Panel ② — same side [AC] and the two adjacent angles. B is where the two
 * printed rays meet; the student completes the triangle.
 */
export const page17CaseASA =
  triangleFromASA([2.4, 2.4], add([2.4, 2.4], direction(65, 3)), 35, 85) ?? page17CaseSAS;

/** Panel ③ — the complete triangle printed with sides 4, 3 and 2. */
export const page17CaseSSS = triangleFromSSS([2.4, 2.4], 4, 3, 2, 20) ?? page17CaseSAS;

export const page17Cases = {
  sas: page17CaseSAS,
  asa: page17CaseASA,
  sss: page17CaseSSS,
} as const;

/** Printed measures of each panel, used by the tests and by the lab read-out. */
export const page17Printed = {
  sas: { AB: 4, AC: 3, angleA: 35 },
  asa: { AC: 3, angleA: 35, angleC: 85 },
  sss: { AB: 4, BC: 2, CA: 3 },
} as const;

/* ==========================================================================
 *  PAGE 18 — the three worked examples
 * ========================================================================== */

/**
 * Example 1 (SAS). Printed: AM = ME = 5, BM = MF = 7, and the two angles at M
 * are vertically opposite. That means M is the midpoint of BOTH [AE] and
 * [BF], which fixes the figure completely once one angle is chosen (35° here,
 * close to the printed sketch; the sketch itself is not to scale).
 */
export const page18Example1 = (() => {
  const M: XY = [7.4, 3.6];
  const arm = direction(145, 5);
  const A: XY = add(M, arm);
  const E: XY = sub(M, arm);
  const B: XY = [M[0] - 7, M[1]];
  const F: XY = [M[0] + 7, M[1]];
  return { M, A, E, B, F, AM: 5, BM: 7 };
})();

/**
 * Example 2 (ASA). Printed: AECF is a parallelogram, ABCD is a rectangle,
 * AB = DC, FD = BE, F̂ = Ê and CBD… see the text: CBE = FDA = 90°.
 *
 * Construction: rectangle ABCD with A(0,5.6) B(0,2.4) C(8,2.4) D(8,5.6);
 * the parallelogram is the rectangle extended by the SAME amount below B and
 * above D, E(0,0) and F(8,8). Then mid(A,C) = mid(E,F) = (4,4), so AECF really
 * is a parallelogram, and BE = FD = 2.4 exactly.
 */
export const page18Example2 = (() => {
  const A: XY = [0, 5.6];
  const B: XY = [0, 2.4];
  const C: XY = [8, 2.4];
  const D: XY = [8, 5.6];
  const E: XY = [0, 0];
  const F: XY = [8, 8];
  return { A, B, C, D, E, F, BE: 2.4, FD: 2.4, rectangle: { AB: 3.2, BC: 8 } };
})();

/**
 * Example 3 (SSS). Printed: ABCD is a parallelogram and [AC] is the common
 * side of the two triangles ACB and ACD.
 */
export const page18Example3 = (() => {
  const A: XY = [0.9, 3.2];
  const B: XY = [0, 0];
  const C: XY = [7, 0];
  const D: XY = [7.9, 3.2];
  return { A, B, C, D };
})();

/* ==========================================================================
 *  PAGE 19 — تحقّق من فهمك
 * ==========================================================================
 *
 *  The printed rectangle is marked with right angles at A and C, one tick on
 *  [AB] and [DC], two ticks on [AD] and [BC], and 30° at D and at B. Looking at
 *  the print, the 30° at B is CBD — between the base [BC] and the diagonal [BD]
 *  — and the 30° at D is ADB — between the top side [DA] and the diagonal. Those
 *  are the alternate interior angles made by [BD] between AD ∥ BC, so one of
 *  them is all the figure needs:
 *
 *      in the right triangle BCD,  tan 30° = CD / BC.
 *
 *  The printed rectangle has no scale, so the width is fixed at 6 for drawing
 *  purposes and the height follows:
 *
 *      BC = AD = 6        (the two-tick sides)
 *      AB = DC = 6·tan 30° = 3.4641…   (the one-tick sides)
 *
 *  Naming matters here: [AB] is the SHORT side and [AD] the long one — the
 *  earlier derivation had them swapped.
 * ========================================================================== */
export const page19Check = (() => {
  const width = 6; // BC = AD — the sides carrying two ticks
  const height = width * Math.tan(rad(30)); // AB = DC — the sides carrying one tick
  const B: XY = [0, 0];
  const C: XY = [width, 0];
  const A: XY = [0, height];
  const D: XY = [width, height];
  return { A, B, C, D, AB: height, AD: width, BC: width, DC: height, angle: 30 };
})();

/* ==========================================================================
 *  PAGE 19 — تدرّب ① : الطائرة الورقية
 * ==========================================================================
 *
 *  Printed on the kite: AB = AD = 14.4, BC = CD = 10, AE = 12, CE = 6 and
 *  BE = ED = 8, with right angles at E (the diagonals are perpendicular).
 *
 *  Verification that the printed numbers are consistent:
 *      BC² = CE² + BE² = 6² + 8² = 100 = 10²            (exact)
 *      AB² = AE² + BE² = 12² + 8² = 208 = 14.422…²      (printed 14.4, rounded)
 *  so E is the foot of the perpendicular from B (and D) on (AC), and the kite
 *  is fixed by the printed data alone.
 * ========================================================================== */
export const page19Kite = (() => {
  const E: XY = [12, 0];
  const A: XY = [0, 0];
  const C: XY = [18, 0];
  const B: XY = [12, 8];
  const D: XY = [12, -8];
  // The printed kite leans to the right; a rigid rotation only changes the view.
  const centre: XY = [9, 0];
  const spin = 24;
  const put = (p: XY) => rotate(p, spin, centre);
  return {
    A: put(A),
    B: put(B),
    C: put(C),
    D: put(D),
    E: put(E),
    AE: 12,
    CE: 6,
    BE: 8,
    ED: 8,
    printed: { AB: 14.4, BC: 10, CD: 10, AD: 14.4 },
  };
})();

/* ==========================================================================
 *  PAGE 19 — تدرّب ② : three pairs of triangles
 * ==========================================================================
 *
 *  ① prints the three sides 2, 3 and 2.6 on BOTH triangles  → case ③.
 *  ② prints the sides 2 and 4 with the included angle 80°    → case ①.
 *  ③ prints the side 4 between the angles 44° and 82°        → case ②.
 *
 *  The second triangle of each pair is a rigid copy (rotation + translation),
 *  exactly as printed: the pair is congruent, the question only asks why.
 * ========================================================================== */

export type PairKind = 'sss' | 'sas' | 'asa';

export interface PairPanel {
  id: string;
  label: string;
  kind: PairKind;
  first: Triangle;
  second: Triangle;
  printed: { sides?: number[]; angle?: number; angles?: number[]; side?: number };
}

/**
 * A panel's two triangles are placed by their bounding boxes, never by a
 * hand-tuned offset: the first copy sits in the panel's upper-left corner, the
 * second (a rigid rotation) in its lower-right corner. That keeps the two
 * drawings — and every measurement label — apart, as they are on the page.
 *
 * Placement is a rigid motion, so it cannot change any printed length or angle;
 * `lesson-04-geometry.test.ts` re-measures both copies of every pair.
 */
const PANEL_W = 10.6;
const PANEL_H = 7.7;
const FIRST_CORNER: XY = [1.0, 2.95];
const SECOND_CORNER: XY = [5.35, 0.5];

function triangleBounds(t: Triangle) {
  const xs = [t.A[0], t.B[0], t.C[0]];
  const ys = [t.A[1], t.B[1], t.C[1]];
  return {
    minX: Math.min(...xs),
    minY: Math.min(...ys),
    maxX: Math.max(...xs),
    maxY: Math.max(...ys),
  };
}

const mapTriangle = (t: Triangle, f: (p: XY) => XY): Triangle => ({
  A: f(t.A),
  B: f(t.B),
  C: f(t.C),
});

/** Rotate about the centroid, then translate so the bbox sits on `corner`. */
function placeTriangle(t: Triangle, angle: number, corner: XY): Triangle {
  const centre: XY = [(t.A[0] + t.B[0] + t.C[0]) / 3, (t.A[1] + t.B[1] + t.C[1]) / 3];
  const spun = mapTriangle(t, (p) => add(rotate(sub(p, centre), angle), corner));
  const bounds = triangleBounds(spun);
  return mapTriangle(spun, (p) => add(p, [corner[0] - bounds.minX, corner[1] - bounds.minY]));
}

function pairPanel(
  id: string,
  label: string,
  kind: PairKind,
  base: Triangle,
  spin: number,
  printed: PairPanel['printed'],
): PairPanel {
  return {
    id,
    label,
    kind,
    first: placeTriangle(base, 0, FIRST_CORNER),
    second: placeTriangle(base, spin, SECOND_CORNER),
    printed,
  };
}

export const PAGE19_PAIR_PANEL = { width: PANEL_W, height: PANEL_H } as const;

export const page19Pairs: PairPanel[] = [
  pairPanel('pair-1', '①', 'sss', triangleFromSSS([0, 0], 2, 2.6, 3, 0)!, 200, {
    sides: [2, 3, 2.6],
  }),
  pairPanel('pair-2', '②', 'sas', triangleFromSAS([0, 0], 0, 2, 80, 4), 195, {
    sides: [2, 4],
    angle: 80,
  }),
  pairPanel('pair-3', '③', 'asa', triangleFromASA([0, 0], [4, 0], 44, 82)!, 205, {
    angles: [44, 82],
    side: 4,
  }),
];

/* ==========================================================================
 *  PAGE 19 — تدرّب ③ : the isosceles-triangle proof
 * ==========================================================================
 *
 *  Printed: B̂ = Ĉ, BM = MC, ME ⟂ (AB) with E on [AB], MF ⟂ (AC) with F on
 *  [AC]. Equal base angles already make ABC isosceles, and M is the midpoint
 *  of the base, so the median (AM) is also the height and the bisector — which
 *  is exactly what the exercise asks the student to prove.
 * ========================================================================== */
export const page19Isosceles = (() => {
  const A: XY = [0, 7];
  const B: XY = [-4.2, 0];
  const C: XY = [4.2, 0];
  const M: XY = [0, 0];
  const E = footOfPerpendicular(M, A, B);
  const F = footOfPerpendicular(M, A, C);
  return { A, B, C, M, E, F };
})();

/* ==========================================================================
 *  Authored teaching figures (badged «رسم تعليمي من إعداد المنصّة»)
 * ==========================================================================
 *
 *  Pages 17's opening sketch and its definition figure print NO measurements:
 *  they only show that a shape and its image under a translation are
 *  superposable. Drawing them exactly (a true translate of the same triangle)
 *  is therefore both faithful to the relation and safe; the caption states
 *  that the distances are the platform's.
 * ========================================================================== */

export const authoredIntroTranslation = (() => {
  const triangle: Triangle = { A: [1.2, 0.9], B: [4.9, 0.7], C: [3.9, 3.6] };
  const vector: XY = [4.6, 1.1];
  const image: Triangle = {
    A: add(triangle.A, vector),
    B: add(triangle.B, vector),
    C: add(triangle.C, vector),
  };
  return { triangle, image, vector };
})();

export const authoredDefinition = (() => {
  const triangle: Triangle = { A: [1.0, 0.8], B: [3.9, 0.6], C: [2.5, 3.9] };
  const vector: XY = [5.6, 0.5];
  const image: Triangle = {
    A: add(triangle.A, vector),
    B: add(triangle.B, vector),
    C: add(triangle.C, vector),
  };
  return { triangle, image, vector };
})();

/* ==========================================================================
 *  LIVE VERIFICATION — used by the labs to report honestly
 * ========================================================================== */

export interface CongruenceReport {
  sss: boolean;
  sas: boolean;
  asa: boolean;
  sidesEqual: [number, number, number];
  anglesEqual: [number, number, number];
}

/**
 * Compare two triangles vertex by vertex (A↔A′, B↔B′, C↔C′). A triangle is
 * congruent exactly when all three sides and all three angles match; the three
 * flags report which of the textbook's cases the pair satisfies.
 */
export function congruenceReport(first: Triangle, second: Triangle): CongruenceReport {
  const sides = (t: Triangle): [number, number, number] => [
    distance(t.A, t.B),
    distance(t.B, t.C),
    distance(t.C, t.A),
  ];
  const angles = (t: Triangle): [number, number, number] => [
    angleAt(t.B, t.A, t.C),
    angleAt(t.A, t.B, t.C),
    angleAt(t.A, t.C, t.B),
  ];
  const a = sides(first);
  const b = sides(second);
  const aa = angles(first);
  const ab = angles(second);
  const near = (x: number, y: number) => Math.abs(x - y) <= 1e-6;

  const sidesEqual: [number, number, number] = [
    near(a[0], b[0]) ? 1 : 0,
    near(a[1], b[1]) ? 1 : 0,
    near(a[2], b[2]) ? 1 : 0,
  ];
  const anglesEqual: [number, number, number] = [
    near(aa[0], ab[0]) ? 1 : 0,
    near(aa[1], ab[1]) ? 1 : 0,
    near(aa[2], ab[2]) ? 1 : 0,
  ];

  const sss = sidesEqual.every((value) => value === 1);
  const sas = sidesEqual[0] === 1 && sidesEqual[2] === 1 && anglesEqual[0] === 1;
  const asa = sidesEqual[0] === 1 && anglesEqual[0] === 1 && anglesEqual[1] === 1;
  return { sss, sas, asa, sidesEqual, anglesEqual };
}
