/**
 * ============================================================================
 *  الدرس الثامن — «منتصفا ضلعين في المثلث» (الوحدة الثانية، الدرس الأول)
 *  الهندسة الموثّقة — صفحات 31–33
 * ============================================================================
 *
 *  Every coordinate in this file is DERIVED from what the three supplied pages
 *  actually fix:
 *
 *    صفحة 31 — النشاط:  M منتصف [AB] و N منتصف [AC] و K نظيرة M بالنسبة إلى N.
 *                       الصفحة لا تطبع أي طول ولا أي قياس زاوية، فالرسم
 *                       تخطيطي: الشكل اختير من المنصّة، وكل علاقة مطبوعة
 *                       (المنتصفان والنظير) محقّقة بدقة.
 *    صفحة 32 — المثال:   I منتصف [AB] و J منتصف [AC].
 *    صفحة 32 — مثال «اكتساب معارف»: O منتصف [AC]، و I نظيرة C بالنسبة إلى B.
 *    صفحة 33 — تحقّق من فهمك: J و K و L و M و N منتصفات أضلاع المثلثين ABC
 *              و ADC المشتركين في الضلع [AC].
 *    صفحة 33 — تدرّب ①: نصف دائرة مركزها O وقطرها [AB]، و M منتصف [AE].
 *    صفحة 33 — تدرّب ③: مستطيل في دائرة نصف قطرها 3 cm، و E و F و G و H
 *              منتصفات أضلاعه.
 *
 *  Conventions:
 *    • mathematical coordinates, x to the right, y UPWARDS (the SVG renderer
 *      flips y when it draws);
 *    • one unit = one drawing unit, NOT a printed centimetre;
 *    • point names follow the book exactly.
 *
 *  `lesson-08-geometry.test.ts` re-measures every claim below: the midpoints,
 *  the symmetry, both parallelograms of the proof, the parallel pairs of the
 *  page-33 figure, the ½ ratio, and the 12 cm perimeter.
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

/** Image of `p` under the central symmetry of centre `centre`. */
export const symmetric = (p: XY, centre: XY): XY => [
  2 * centre[0] - p[0],
  2 * centre[1] - p[1],
];

export const rad = (degrees: number): number => (degrees * Math.PI) / 180;
export const degrees = (radians: number): number => (radians * 180) / Math.PI;

/** Vector of length `len` at `angle` degrees, measured from +x counter-clockwise. */
export const direction = (angle: number, len = 1): XY => [
  len * Math.cos(rad(angle)),
  len * Math.sin(rad(angle)),
];

/** Angle ABC in degrees, always in [0, 180]. */
export function angleAt(a: XY, b: XY, c: XY): number {
  const u = sub(a, b);
  const v = sub(c, b);
  const denominator = length(u) * length(v);
  if (denominator < EPSILON) return 0;
  const cosine = Math.max(-1, Math.min(1, dot(u, v) / denominator));
  return degrees(Math.acos(cosine));
}

export function isRightAngle(a: XY, b: XY, c: XY, tolerance = 1e-7): boolean {
  return Math.abs(angleAt(a, b, c) - 90) <= tolerance;
}

export function areCollinear(a: XY, b: XY, p: XY, tolerance = 1e-9): boolean {
  return Math.abs(cross(sub(b, a), sub(p, a))) <= tolerance;
}

/** Two segments are parallel when their direction vectors are proportional. */
export function areParallel(a: XY, b: XY, c: XY, d: XY, tolerance = 1e-9): boolean {
  const first = sub(b, a);
  const second = sub(d, c);
  return Math.abs(cross(first, second)) <= tolerance * Math.max(1, length(first), length(second));
}

export function samePoint(a: XY, b: XY, tolerance = 1e-9): boolean {
  return Math.abs(a[0] - b[0]) <= tolerance && Math.abs(a[1] - b[1]) <= tolerance;
}

/** Four points form a parallelogram in the given cyclic order ⇔ diagonals bisect. */
export function isParallelogram(a: XY, b: XY, c: XY, d: XY, tolerance = 1e-9): boolean {
  return samePoint(midpoint(a, c), midpoint(b, d), tolerance);
}

/** Is `p` the midpoint of [ab]? */
export function isMidpointOf(p: XY, a: XY, b: XY, tolerance = 1e-9): boolean {
  return samePoint(p, midpoint(a, b), tolerance);
}

export interface Triangle {
  A: XY;
  B: XY;
  C: XY;
}

/* --------------------------------------------------------------------------
 *  PAGE 31 — THE DISCOVERY ACTIVITY
 *
 *  The printed study asks for THREE triangles: one with an acute angle at A,
 *  one with an obtuse angle at A, and one right-angled at A. The three shapes
 *  below satisfy exactly that, and the tests re-measure the three angles so a
 *  later edit cannot silently turn «منفرجة» into an acute triangle.
 * ----------------------------------------------------------------------- */

export interface ActivityTriangle {
  id: 'acute' | 'right' | 'obtuse';
  label: string;
  /** What the printed page asks the student to draw. */
  description: string;
  A: XY;
  B: XY;
  C: XY;
}

const baseB: XY = [0, 0];
const baseC: XY = [7.2, 0];

export const activityTriangles: ActivityTriangle[] = [
  {
    id: 'acute',
    label: '①',
    description: 'الزاوية عند $A$ حادة',
    A: [3.6, 6.2],
    B: baseB,
    C: baseC,
  },
  {
    id: 'right',
    label: '②',
    description: 'الزاوية عند $A$ قائمة',
    A: [3.6, 3.6],
    B: baseB,
    C: baseC,
  },
  {
    id: 'obtuse',
    label: '③',
    description: 'الزاوية عند $A$ منفرجة',
    A: [3.6, 2.4],
    B: baseB,
    C: baseC,
  },
];

export interface MidlinePoints {
  M: XY;
  N: XY;
  /** The symmetric of M about N — printed step «1. في … إثبات» of page 31. */
  K: XY;
}

/** M, N and K of one activity triangle, computed — never eyeballed. */
export function midlinePoints(triangle: Triangle): MidlinePoints {
  const M = midpoint(triangle.A, triangle.B);
  const N = midpoint(triangle.A, triangle.C);
  return { M, N, K: symmetric(M, N) };
}

export interface MidlineReport {
  MN: number;
  BC: number;
  /** MN / BC — the printed «نصف طول الضلع الثالث». */
  ratio: number;
  /** Angle between (MN) and (BC) in degrees: 0 means parallel. */
  angle: number;
  MK: number;
}

/** Everything the page-31 study asks the student to observe, measured. */
export function midlineReport(triangle: Triangle): MidlineReport {
  const { M, N, K } = midlinePoints(triangle);
  return {
    MN: distance(M, N),
    BC: distance(triangle.B, triangle.C),
    ratio: distance(M, N) / distance(triangle.B, triangle.C),
    angle: degrees(
      Math.acos(
        Math.max(
          -1,
          Math.min(
            1,
            dot(sub(N, M), sub(triangle.C, triangle.B)) /
              (length(sub(N, M)) * length(sub(triangle.C, triangle.B))),
          ),
        ),
      ),
    ),
    MK: distance(M, K),
  };
}

/* --------------------------------------------------------------------------
 *  PAGE 32 — THE WORKED EXAMPLE («مثال»)
 * ----------------------------------------------------------------------- */

export const page32Example = {
  triangle: {
    A: [3.4, 5.8],
    B: [0, 0],
    C: [7.6, 0],
  } satisfies Triangle,
  /** I is the midpoint of [AB], J of [AC] — printed «المعطيات». */
  I: midpoint([3.4, 5.8], [0, 0]),
  J: midpoint([3.4, 5.8], [7.6, 0]),
};

/* --------------------------------------------------------------------------
 *  PAGE 32 — «اكتساب معارف: كيف نثبت توازي مستقيمين؟»
 *
 *  ABC مثلث، O منتصف [AC]، I نظيرة C بالنسبة إلى B.
 *  The printed answer of page 33 then proves (OB) ∥ (AI) in triangle ACI.
 * ----------------------------------------------------------------------- */

export const page32Knowledge = {
  A: [2.8, 5.6] as XY,
  C: [0, 0] as XY,
  B: [4.4, 0] as XY,
  /** I is the symmetric of C about B, so B is the midpoint of [CI]. */
  I: symmetric([0, 0], [4.4, 0]),
  /** O is the midpoint of [AC]. */
  O: midpoint([2.8, 5.6], [0, 0]),
};

/* --------------------------------------------------------------------------
 *  PAGE 33 — «تحقّق من فهمك»
 *
 *  ABC و ADC مثلثان يشتركان في الضلع [AC]؛ و J و K و L و M و N منتصفات
 *  الأضلاع كما في الشكل:
 *      J ∈ [AB]، L ∈ [BC]، K ∈ [AC]، M ∈ [AD]، N ∈ [CD].
 * ----------------------------------------------------------------------- */

const checkA: XY = [3.4, 6.2];
const checkB: XY = [0, 0];
const checkC: XY = [5.6, 0];
const checkD: XY = [9.4, 3.0];

export const page33Check = {
  A: checkA,
  B: checkB,
  C: checkC,
  D: checkD,
  J: midpoint(checkA, checkB),
  K: midpoint(checkA, checkC),
  L: midpoint(checkB, checkC),
  M: midpoint(checkA, checkD),
  N: midpoint(checkC, checkD),
};

/** The way the printed page joins the two triangles: ABC blue, ADC green. */
export const page33CheckSides = {
  blue: [
    ['A', 'B'],
    ['B', 'C'],
  ] as const,
  shared: ['A', 'C'] as const,
  green: [
    ['C', 'D'],
    ['D', 'A'],
  ] as const,
};

/* --------------------------------------------------------------------------
 *  PAGE 33 — «تدرّب ①»: نصف دائرة مركزها O وقطرها [AB]، و M منتصف [AE]
 *
 *  A and B are the two ends of a diameter, so O is the midpoint of [AB];
 *  M is the midpoint of [AE]; therefore (OM) ∥ (BE) in triangle ABE.
 *  E is placed on the circle, which is what the printed drawing shows.
 * ----------------------------------------------------------------------- */

const semicircleCentre: XY = [4, 4];
const semicircleRadius = 3;

export const page33TrainSemicircle = {
  O: semicircleCentre,
  radius: semicircleRadius,
  A: add(semicircleCentre, direction(120, semicircleRadius)),
  B: add(semicircleCentre, direction(-60, semicircleRadius)),
  E: add(semicircleCentre, direction(210, semicircleRadius)),
  M: midpoint(
    add(semicircleCentre, direction(120, semicircleRadius)),
    add(semicircleCentre, direction(210, semicircleRadius)),
  ),
};

/* --------------------------------------------------------------------------
 *  PAGE 33 — «تدرّب ③»: مستطيل في دائرة نصف قطرها 3 cm
 *
 *  The radius is printed, so the diagonal is fixed at 6 cm. The rectangle is
 *  otherwise free, and the platform fixes its shape at 3√3 × 3 — a shape whose
 *  half-diagonal is exactly 3, so the circle claim is exact.
 *  E, F, G, H are the midpoints of the sides, in printed order.
 * ----------------------------------------------------------------------- */

const rectangleCentre: XY = [5.5, 5];
const rectangleRadius = 3;
const rectangleCorner = (angle: number): XY => add(rectangleCentre, direction(angle, rectangleRadius));

const rectangleA = rectangleCorner(150);
const rectangleB = rectangleCorner(30);
const rectangleC = rectangleCorner(-30);
const rectangleD = rectangleCorner(210);

export const page33TrainRectangle = {
  O: rectangleCentre,
  radius: rectangleRadius,
  /** A top-left, B top-right, C bottom-right, D bottom-left — printed order. */
  A: rectangleA,
  B: rectangleB,
  C: rectangleC,
  D: rectangleD,
  E: midpoint(rectangleA, rectangleB),
  F: midpoint(rectangleB, rectangleC),
  G: midpoint(rectangleD, rectangleC),
  H: midpoint(rectangleA, rectangleD),
};

/** Side of the rhombus EFGH: half the diagonal of the rectangle = the radius. */
export function rhombusSide(): number {
  return distance(page33TrainRectangle.E, page33TrainRectangle.F);
}

/** Printed question ③: «ما نوع الرباعي EFGH؟ احسب محيطه.» — 4 × 3 = 12 cm. */
export function rhombusPerimeterCm(): number {
  const { E, F } = page33TrainRectangle;
  return 4 * distance(E, F);
}

/* --------------------------------------------------------------------------
 *  AUTHORED — the Varignon figure used by the Test Area (a quadrilateral whose
 *  four side-midpoints are joined). Nothing here is printed: it is a platform
 *  application of the same theorem, and it is labelled as such everywhere.
 * ----------------------------------------------------------------------- */

const varignonA: XY = [1, 6];
const varignonB: XY = [0, 1];
const varignonC: XY = [6, 0];
const varignonD: XY = [8, 4];

export const varignonFigure = {
  A: varignonA,
  B: varignonB,
  C: varignonC,
  D: varignonD,
  E: midpoint(varignonA, varignonB),
  F: midpoint(varignonB, varignonC),
  G: midpoint(varignonC, varignonD),
  H: midpoint(varignonD, varignonA),
};

/* --------------------------------------------------------------------------
 *  AUTHORED — a triangle used by one Test Area question, with M and N marked
 *  as midpoints and BC given in the prompt.
 * ----------------------------------------------------------------------- */

const testTriangle: Triangle = {
  A: [3.2, 6],
  B: [0, 0],
  C: [8, 0],
};

export const testMidpointTriangle = {
  ...testTriangle,
  M: midpoint(testTriangle.A, testTriangle.B),
  N: midpoint(testTriangle.A, testTriangle.C),
};

/* --------------------------------------------------------------------------
 *  PAGE 33 — «تدرّب ②»: B′ and C′ are the symmetric points of A about B and C
 *
 *  Printed ask: prove (CB) ∥ (C′B′).  B is the midpoint of [AB′] and C is the
 *  midpoint of [AC′], so in triangle AB′C′ the two midpoints B and C are
 *  joined by a midline: (BC) ∥ (B′C′) and BC = B′C′ / 2.
 * ----------------------------------------------------------------------- */

const symmetricA: XY = [4, 4.6];
const symmetricB: XY = [1, 1.6];
const symmetricC: XY = [7.2, 1.2];

export const page33TrainSymmetric = {
  A: symmetricA,
  B: symmetricB,
  C: symmetricC,
  BPrime: symmetric(symmetricA, symmetricB),
  CPrime: symmetric(symmetricA, symmetricC),
};
