import type { XY } from '@/lib/geometryFigure';
import {
  cross2D,
  distXY,
  lineIntersection,
  midPoint,
  sectionPoint,
  unitVec,
} from './lesson-10-geometry';

/**
 * ============================================================================
 *  الوحدة الثالثة، الدرس الثالث — «المتوسط في المثلث» (الصفحات 59–61)
 *  EXACT CARTESIAN GEOMETRY (x right, y up)
 * ============================================================================
 *
 *    • the median from a vertex is the line through that vertex and the
 *      MIDPOINT of the opposite side;
 *    • the centroid `G` is the average of the three vertices — the computed
 *      intersection of the three medians — and it divides each median in the
 *      ratio 2:1 from the vertex: AG = (2/3)AA', BG = (2/3)BB', CG = (2/3)CC';
 *    • the page-59 proof reflects A in G to D; BGCD is a parallelogram, K =
 *      AD ∩ BC is the midpoint of [BC], and AG = 2GK, BG = 2GI, CG = 2GJ.
 *
 *  `lesson-15-geometry.test.ts` re-derives every claim. Shared helpers come
 *  from `lesson-10-geometry.ts`.
 * ============================================================================
 */

export interface Triangle {
  A: XY;
  B: XY;
  C: XY;
}

/** Midpoint of the side opposite `vertex` — the foot of the median. */
export function medianFoot(p: XY, q: XY): XY {
  return midPoint(p, q);
}

/** `G` — the centroid (average of the vertices). */
export function centroid(t: Triangle): XY {
  return [(t.A[0] + t.B[0] + t.C[0]) / 3, (t.A[1] + t.B[1] + t.C[1]) / 3];
}

/** Reflection of `p` in the center `o` (point symmetry). */
export function reflect(p: XY, o: XY): XY {
  return [2 * o[0] - p[0], 2 * o[1] - p[1]];
}

/** Angle `kÔa` in degrees, in [0, 180]. */
export function measureAngle(k: XY, o: XY, a: XY): number {
  const u = unitVec(o, k);
  const v = unitVec(o, a);
  const c = Math.max(-1, Math.min(1, u[0] * v[0] + u[1] * v[1]));
  return (Math.acos(c) * 180) / Math.PI;
}

/** The drawn median from `vertex` to the midpoint `m`, slightly overhung. */
export function medianSpan(vertex: XY, m: XY, overhang = 0.5): { from: XY; to: XY } {
  const u = unitVec(vertex, m);
  return {
    from: [vertex[0] - u[0] * overhang, vertex[1] - u[1] * overhang],
    to: [m[0] + u[0] * overhang, m[1] + u[1] * overhang],
  };
}

export interface MedianScene extends Triangle {
  G: XY;
  /** Midpoints of the sides opposite A, B, C (A', B', C'). */
  feet: { A: XY; B: XY; C: XY };
  /** Drawn medians from A, B, C. */
  spans: { from: XY; to: XY }[];
  /** AG/AA', BG/BB', CG/CC' — each exactly 2/3. */
  ratios: { A: number; B: number; C: number };
  concurrent: boolean;
  twoThirds: boolean;
}

export function buildMedianScene(t: Triangle): MedianScene {
  const G = centroid(t);
  const feet = {
    A: medianFoot(t.B, t.C),
    B: medianFoot(t.A, t.C),
    C: medianFoot(t.A, t.B),
  };
  const spans = [medianSpan(t.A, feet.A), medianSpan(t.B, feet.B), medianSpan(t.C, feet.C)];
  const ratio = (v: XY, f: XY): number => distXY(v, G) / distXY(v, f);
  const ratios = { A: ratio(t.A, feet.A), B: ratio(t.B, feet.B), C: ratio(t.C, feet.C) };
  const onLine = (s: { from: XY; to: XY }): boolean =>
    Math.abs(cross2D(s.from, s.to, s.from, G)) < 1e-7;
  const isTwoThirds = (r: number): boolean => Math.abs(r - 2 / 3) < 1e-9;
  return {
    ...t,
    G,
    feet,
    spans,
    ratios,
    concurrent: spans.every(onLine),
    twoThirds: isTwoThirds(ratios.A) && isTwoThirds(ratios.B) && isTwoThirds(ratios.C),
  };
}

/* -------------------------------------------------------------------------- */
/*  1. الصفحة 59 — معنى الكلمات + الصفحة 60 — تعريف المتوسط                     */
/* -------------------------------------------------------------------------- */

export const L15_DEFINITION_TRIANGLE: Triangle = {
  A: [3.0, 5.6],
  B: [0.8, 1.0],
  C: [8.2, 1.2],
};

export const L15_DEFINITION = (() => {
  const t = L15_DEFINITION_TRIANGLE;
  const m = medianFoot(t.B, t.C);
  return { ...t, m, span: medianSpan(t.A, m, 0.8) };
})();

/* -------------------------------------------------------------------------- */
/*  2. الصفحة 59 — اختبار: مثلثان (حاد ومنفرج)                                 */
/* -------------------------------------------------------------------------- */

/** Left triangle (acute) — named ABC by the text. */
export const L15_TEST_ABC: Triangle = { A: [2.7, 5.3], B: [0.7, 1.1], C: [5.6, 0.9] };
/** Right triangle (obtuse, flat top) — named EFJ by the text. */
export const L15_TEST_EFJ: { E: XY; F: XY; J: XY } = {
  E: [0.4, 4.6],
  F: [7.6, 4.7],
  J: [4.4, 1.2],
};
/** The EFJ triangle as a Triangle (E→A, F→B, J→C) for the median scene. */
export const L15_TEST_EFJ_TRIANGLE: Triangle = {
  A: L15_TEST_EFJ.E,
  B: L15_TEST_EFJ.F,
  C: L15_TEST_EFJ.J,
};

/* -------------------------------------------------------------------------- */
/*  3. الصفحة 59 — الإثبات: I و J منتصفا [AC] و[AB]، G تلاقي (BI) و(CJ)         */
/* -------------------------------------------------------------------------- */

export interface MedianProofScene extends Triangle {
  I: XY;
  J: XY;
  G: XY;
  D: XY;
  K: XY;
  /** JG ∥ BD and BD = 2JG; IG ∥ CD and CD = 2IG. */
  midsegments: { JG_BD: boolean; IG_CD: boolean; BD_2JG: boolean; CD_2IG: boolean };
  /** BGCD is a parallelogram; K is the midpoint of [BC] and of [GD]. */
  parallelogram: boolean;
  kMidBC: boolean;
  kMidGD: boolean;
  /** AG = 2GK, BG = 2GI, CG = 2GJ. */
  doubleRelations: { AG_2GK: boolean; BG_2GI: boolean; CG_2GJ: boolean };
}

export const L15_PROOF_TRIANGLE: Triangle = { A: [3.3, 5.8], B: [0.8, 1.0], C: [7.6, 1.3] };

export function buildMedianProofScene(t: Triangle = L15_PROOF_TRIANGLE): MedianProofScene {
  const I = medianFoot(t.A, t.C); // midpoint of [AC]
  const J = medianFoot(t.A, t.B); // midpoint of [AB]
  const G = centroid(t);
  const D = reflect(t.A, G);
  const K = lineIntersection(t.A, D, t.B, t.C);
  const eq = (a: number, b: number): boolean => Math.abs(a - b) < 1e-8;
  const par = (a: XY, b: XY, c: XY, d: XY): boolean => Math.abs(cross2D(a, b, c, d)) < 1e-8;
  const near = (p: XY, q: XY): boolean => distXY(p, q) < 1e-8;
  // BGCD parallelogram: BG ∥ CD and GC ∥ BD.
  const parallelogram = par(t.B, G, t.C, D) && par(G, t.C, t.B, D);
  return {
    ...t,
    I,
    J,
    G,
    D,
    K,
    midsegments: {
      JG_BD: par(J, G, t.B, D),
      IG_CD: par(I, G, t.C, D),
      BD_2JG: eq(distXY(t.B, D), 2 * distXY(J, G)),
      CD_2IG: eq(distXY(t.C, D), 2 * distXY(I, G)),
    },
    parallelogram,
    kMidBC: near(K, midPoint(t.B, t.C)),
    kMidGD: near(K, midPoint(G, D)),
    doubleRelations: {
      AG_2GK: eq(distXY(t.A, G), 2 * distXY(G, K)),
      BG_2GI: eq(distXY(t.B, G), 2 * distXY(G, I)),
      CG_2GJ: eq(distXY(t.C, G), 2 * distXY(G, J)),
    },
  };
}

export const L15_PROOF = buildMedianProofScene();

/* -------------------------------------------------------------------------- */
/*  4. الصفحة 60 — خواص: المتوسطات الثلاثة والنسب 2/3                            */
/* -------------------------------------------------------------------------- */

export const L15_PROPERTIES_TRIANGLE: Triangle = {
  A: [2.9, 5.9],
  B: [0.8, 1.0],
  C: [8.0, 1.3],
};

export const L15_PROPERTIES = buildMedianScene(L15_PROPERTIES_TRIANGLE);

/* -------------------------------------------------------------------------- */
/*  5. الصفحة 60 — مثال: M منتصف [BC]، AG = 2.4، GM = 1.2                       */
/* -------------------------------------------------------------------------- */

const EXAMPLE_SCALE = 1.0;

/**
 * Page-60 example: M midpoint of [BC], G on [AM] with AG = 2.4 cm, GM = 1.2 cm.
 * Built so AG = 2·GM exactly (G is the centroid). The triangle is drawn with
 * [AM] of length 3.6 cm so the printed magnitudes hold.
 */
export const L15_EXAMPLE = (() => {
  // Place A directly above M so that AM = 3.6 exactly (drawing units = cm).
  const M: XY = [3.4, 1.2];
  const A: XY = [M[0], M[1] + 3.6 * EXAMPLE_SCALE];
  const B: XY = [0.9, 1.0];
  const C: XY = [2 * M[0] - B[0], 2 * M[1] - B[1]]; // M is midpoint of [BC]
  const t: Triangle = { A, B, C };
  const G = sectionPoint(A, M, 2 / 3); // AG = (2/3)AM = 2.4
  return {
    ...t,
    M,
    G,
    span: { from: A, to: M },
    AG: distXY(A, G),
    GM: distXY(G, M),
    scale: EXAMPLE_SCALE,
  };
})();

/* -------------------------------------------------------------------------- */
/*  6. الصفحة 61 — مثال: متوازي أضلاع ABCD، G = CM ∩ BD                         */
/* -------------------------------------------------------------------------- */

/**
 * Page-61 example: parallelogram ABCD, center O, M midpoint of [AB]. G = CM ∩ BD
 * is the centroid of triangle ABC (CM and BO are two of its medians).
 */
export const L15_EXAMPLE_PARALLELOGRAM = (() => {
  const A: XY = [0.9, 1.0];
  const B: XY = [6.0, 1.0];
  const D: XY = [2.4, 4.4];
  const C: XY = [B[0] + (D[0] - A[0]), B[1] + (D[1] - A[1])];
  const O = midPoint(A, C);
  const M = medianFoot(A, B);
  const G = lineIntersection(C, M, B, D);
  const tABC: Triangle = { A, B, C };
  return {
    A,
    B,
    C,
    D,
    O,
    M,
    G,
    centroidOfABC: centroid(tABC),
    isCentroid: distXY(G, centroid(tABC)) < 1e-8,
  };
})();

/* -------------------------------------------------------------------------- */
/*  7. الصفحة 61 — تحقّق من فهمك: AB = 7، A = 70°، AC = 8                       */
/* -------------------------------------------------------------------------- */

const CHECK_SCALE = 0.62;

export const L15_CHECK = (() => {
  const A: XY = [1.2, 1.2];
  const ang = (70 * Math.PI) / 180;
  const B: XY = [A[0] + 7 * CHECK_SCALE, A[1]];
  const C: XY = [A[0] + 8 * CHECK_SCALE * Math.cos(ang), A[1] + 8 * CHECK_SCALE * Math.sin(ang)];
  const t: Triangle = { A, B, C };
  return { ...buildMedianScene(t), scale: CHECK_SCALE, sidesCm: { AB: 7, AC: 8 }, angleA: 70 };
})();

/* -------------------------------------------------------------------------- */
/*  8. الصفحة 61 — تدرّب ① الحالة ①: AG = 3.4، GM = 1.7                         */
/* -------------------------------------------------------------------------- */

/**
 * Practice ① case ①: A left, C top-right, B bottom-right, M midpoint of [BC],
 * G on [AM] with AG = 3.4 cm, GM = 1.7 cm (AG = 2·GM ⇒ centroid).
 */
export const L15_PRACTICE_CASE_ONE = (() => {
  const A: XY = [0.9, 2.6];
  const M: XY = [A[0] + 5.1, 2.6]; // AM = 5.1 cm (3.4 + 1.7)
  const C: XY = [M[0] + 0.5, 4.6];
  const B: XY = [2 * M[0] - C[0], 2 * M[1] - C[1]];
  const t: Triangle = { A, B, C };
  const G = sectionPoint(A, M, 3.4 / 5.1);
  return {
    ...t,
    M,
    G,
    span: { from: A, to: M },
    AG: distXY(A, G),
    GM: distXY(G, M),
    isCentroid: distXY(G, centroid(t)) < 1e-8,
  };
})();

/* -------------------------------------------------------------------------- */
/*  9. الصفحة 61 — تدرّب ① الحالة ②: متوازي AMCI مركزه J، G = BJ ∩ CI           */
/* -------------------------------------------------------------------------- */

/**
 * Practice ① case ②: parallelogram AMCI with center J; I midpoint of [AB];
 * G = BJ ∩ CI is the centroid of ABC (BJ and CI are two medians).
 */
export const L15_PRACTICE_CASE_TWO = (() => {
  const A: XY = [6.6, 1.0];
  const B: XY = [0.8, 1.0];
  const I = medianFoot(A, B); // midpoint of [AB]
  const C: XY = [2.3, 4.7];
  // AMCI parallelogram: A→M→C→I. M = A + (C - I).
  const M: XY = [A[0] + (C[0] - I[0]), A[1] + (C[1] - I[1])];
  const J = midPoint(A, C); // center of parallelogram = midpoint of diagonal AC
  const G = lineIntersection(B, J, C, I);
  const tABC: Triangle = { A, B, C };
  return {
    A,
    B,
    C,
    I,
    M,
    J,
    G,
    centroidOfABC: centroid(tABC),
    isCentroid: distXY(G, centroid(tABC)) < 1e-8,
    jMidAC: distXY(J, midPoint(A, C)) < 1e-9,
    jMidMI: distXY(J, midPoint(M, I)) < 1e-9,
  };
})();

/* -------------------------------------------------------------------------- */
/*  10. الصفحة 59 — صندوق الفيزياء: الشاقول المار بنقطة التعليق يمر بـ G        */
/* -------------------------------------------------------------------------- */

/**
 * The plumb-line experiment: a triangular plate hung from vertex A. The median
 * from A is vertical (A directly above the midpoint of [BC]), so the vertical
 * plumb line through A passes through G exactly.
 */
export const L15_PLUMB = (() => {
  const mid: XY = [3.6, 1.4];
  const A: XY = [3.6, 5.6]; // directly above the midpoint of [BC]
  const B: XY = [1.4, 1.0];
  const C: XY = [2 * mid[0] - B[0], 2 * mid[1] - B[1]];
  const t: Triangle = { A, B, C };
  const G = centroid(t);
  return {
    ...t,
    G,
    midBC: midPoint(B, C),
    // vertical plumb line through A (and G), drawn from above A to below G.
    plumb: { from: [A[0], A[1] + 0.9] as XY, to: [A[0], G[1] - 1.4] as XY },
    verticalThroughG: Math.abs(A[0] - G[0]) < 1e-9,
  };
})();

/* -------------------------------------------------------------------------- */
/*  11. مختبر المتوسط — the interactive lab scene                              */
/* -------------------------------------------------------------------------- */

export interface MedianLabScene extends MedianScene {
  /** Lengths of the three medians and the vertex-to-G parts (metric cards). */
  medians: { AA: number; BB: number; CC: number };
  vertexParts: { AG: number; BG: number; CG: number };
}

export function buildMedianLabScene(t: Triangle): MedianLabScene {
  const scene = buildMedianScene(t);
  return {
    ...scene,
    medians: {
      AA: distXY(t.A, scene.feet.A),
      BB: distXY(t.B, scene.feet.B),
      CC: distXY(t.C, scene.feet.C),
    },
    vertexParts: {
      AG: distXY(t.A, scene.G),
      BG: distXY(t.B, scene.G),
      CG: distXY(t.C, scene.G),
    },
  };
}

export { distXY, midPoint, sectionPoint, unitVec };
