import type { XY } from '@/lib/geometryFigure';
import {
  cross2D,
  distXY,
  extendBeyond,
  lineIntersection,
  midPoint,
  sectionPoint,
  subVec,
  unitVec,
} from './lesson-10-geometry';

/**
 * ============================================================================
 *  UNIT 2, LESSON 4 — EXACT CARTESIAN GEOMETRY (x right, y up)
 * ============================================================================
 *
 *  «تساوي ثلاث نسب» (textbook pages 39–41). Helper functions are imported from
 *  `lesson-10-geometry.ts` rather than copied, so the two lessons share one
 *  implementation of section points, intersections and distances.
 *
 *  Two kinds of scene live here:
 *
 *    • Page 39's activity: the printed ratio is 2/3, and every construction
 *      point (I, J, P, R, S) is DERIVED by intersection, never eyeballed. The
 *      figure therefore proves nothing by itself, but it is exactly the figure
 *      the printed questions talk about: J is the midpoint of [AN], P the
 *      midpoint of [BJ], N the midpoint of [CJ], and CS = SR = RB.
 *
 *    • The numbered exercises of pages 40–41: their printed values are carried
 *      as EXACT Euclidean lengths (AB = 3, AC = 6, BC = 5, AE = 2, AF = 4,
 *      EF = 10/3; and 8, 15, 5, x = 35/8 or 75/8 in تدرّب ①).
 * ============================================================================
 */

/* -------------------------------------------------------------------------- */
/*  A triangle built from its three printed side lengths                       */
/* -------------------------------------------------------------------------- */

/**
 * Triangle with `|BC| = base`, `|AB| = left`, `|AC| = right`, laid on the
 * x-axis with A above it. Exact up to floating point; the callers assert the
 * distances in `lesson-11-geometry.test.ts`.
 */
export function triangleWithSides(
  base: number,
  left: number,
  right: number,
): { A: XY; B: XY; C: XY } {
  const B: XY = [0, 0];
  const C: XY = [base, 0];
  const x = (left * left + base * base - right * right) / (2 * base);
  const y = Math.sqrt(Math.max(left * left - x * x, 0));
  return { A: [x, y], B, C };
}

/* -------------------------------------------------------------------------- */
/*  1. Page 39 — the activity scene, ratio 2/3                                 */
/* -------------------------------------------------------------------------- */

/** The printed given AM/AB = 2/3 (the three equal ticks on [AB]). */
export const L11_ACTIVITY_RATIO = 2 / 3;

/** Schematic scalene triangle for the four printed panels of page 39. */
export const L11_ACTIVITY_TRIANGLE = {
  A: [3.3, 6.5] as XY,
  B: [0.4, 0.7] as XY,
  C: [8.3, 1.1] as XY,
};

export interface ActivityScene {
  A: XY;
  B: XY;
  C: XY;
  /** I ∈ [AB], the midpoint of [AM] (AI = IM = MB). */
  I: XY;
  /** M ∈ [AB] with AM/AB = 2/3. */
  M: XY;
  /** N ∈ [AC] with AN/AC = 2/3. */
  N: XY;
  /** J = (parallel to (MN) through I) ∩ (AC); the midpoint of [AN]. */
  J: XY;
  /** P = (BJ) ∩ (MN); the midpoint of [BJ]. */
  P: XY;
  /** R = (parallel to (AB) through J) ∩ (BC). */
  R: XY;
  /** S = (parallel to (AB) through N) ∩ (BC). */
  S: XY;
  /** Common value AM/AB = AN/AC = MN/BC read from the scene. */
  ratio: number;
  /** Direction of (AB), used to draw/extend the printed parallels. */
  dirAB: XY;
}

/** Exact construction of page 39: every auxiliary point is an intersection. */
export function buildActivityScene(
  triangle: { A: XY; B: XY; C: XY } = L11_ACTIVITY_TRIANGLE,
  k: number = L11_ACTIVITY_RATIO,
): ActivityScene {
  const { A, B, C } = triangle;
  const M = sectionPoint(A, B, k);
  const N = sectionPoint(A, C, k);
  const I = midPoint(A, M);
  // The printed construction: through I draw the parallel to (MN).
  const dirMN = subVec(N, M);
  const J = lineIntersection(I, [I[0] + dirMN[0], I[1] + dirMN[1]], A, C);
  const P = lineIntersection(M, N, B, J);
  const dirAB = subVec(B, A);
  const R = lineIntersection(J, [J[0] + dirAB[0], J[1] + dirAB[1]], B, C);
  const S = lineIntersection(N, [N[0] + dirAB[0], N[1] + dirAB[1]], B, C);
  return {
    A,
    B,
    C,
    I,
    M,
    N,
    J,
    P,
    R,
    S,
    ratio: distXY(A, M) / distXY(A, B),
    dirAB,
  };
}

/* -------------------------------------------------------------------------- */
/*  1b. The proof chain of page 39, machine-checked                            */
/* -------------------------------------------------------------------------- */

/**
 * Every step of the printed proof, as a computed fact.
 *
 * The activity asks for five conclusions in a fixed order, and each one needs
 * the previous link:
 *
 *   I mid [AM]  ─▶ (triangle AMN) ─▶ J mid [AN]
 *   M mid [BI]  ─▶ (triangle BIJ) ─▶ P mid [BJ]
 *   P mid [BJ]  ─▶ (triangle BCJ) ─▶ N mid [CJ]
 *   N mid [CJ]  ─▶ (triangle CJR) ─▶ S mid [CR]
 *   J mid [AN]  ─▶ (triangle ABN) ─▶ T mid [BN]   (T = (JR) ∩ [BN])
 *   T mid [BN]  ─▶ (triangle BSN) ─▶ R mid [BS]
 *
 * Only the last two links need the auxiliary point T. `lesson-11-geometry.test.ts`
 * re-derives every entry from raw coordinates, so the Teacher Area solution can
 * cite them instead of asserting them.
 */
export interface ActivityProofChain extends ActivityScene {
  /** T = (parallel to (AB) through J) ∩ [BN]; the auxiliary point of part 3. */
  T: XY;
  midpoints: {
    I_of_AM: boolean;
    M_of_BI: boolean;
    J_of_AN: boolean;
    P_of_BJ: boolean;
    N_of_CJ: boolean;
    S_of_CR: boolean;
    T_of_BN: boolean;
    R_of_BS: boolean;
  };
  /** The two parallels the printed construction introduces, and what they hit. */
  parallels: {
    /** (JR) ∥ (AB) and (NS) ∥ (AB), hence (JR) ∥ (NS). */
    jrParallelToNS: boolean;
    /** (MP) ⊂ (MN) ∥ (IJ): the parallel that proves P. */
    mpParallelToIJ: boolean;
    /** (PN) ⊂ (MN) ∥ (BC): the parallel that proves N. */
    pnParallelToBC: boolean;
    /** T lies on (JR), so (TR) is the parallel through T. */
    tOnJR: boolean;
  };
  lengths: {
    AM_AB: number;
    AN_AC: number;
    MN_BC: number;
    BS_BC: number;
    CS: number;
    SR: number;
    RB: number;
    BR_BS: number;
    BM_BI: number;
    AI_AM: number;
  };
  /** CS = SR = RB, the printed conclusion of part 3 ①. */
  thirdsEqual: boolean;
  /** BSNM is a parallelogram, the printed conclusion of part 3 ②. */
  bsnmpParallelogram: boolean;
}

const equalsWithin = (a: number, b: number) => Math.abs(a - b) < 1e-9;

export function buildActivityProofChain(
  triangle: { A: XY; B: XY; C: XY } = L11_ACTIVITY_TRIANGLE,
  k: number = L11_ACTIVITY_RATIO,
): ActivityProofChain {
  const scene = buildActivityScene(triangle, k);
  const { A, B, C, I, J, M, N, P, R, S, dirAB } = scene;
  const alongAB = (point: XY): [XY, XY] => [point, [point[0] + dirAB[0], point[1] + dirAB[1]]];
  const T = lineIntersection(...alongAB(J), B, N);

  const isMid = (m: XY, a: XY, b: XY) => equalsWithin(distXY(m, a), distXY(m, b));
  const CS = distXY(C, S);
  const SR = distXY(S, R);
  const RB = distXY(R, B);

  return {
    ...scene,
    T,
    midpoints: {
      I_of_AM: isMid(I, A, M),
      M_of_BI: isMid(M, B, I),
      J_of_AN: isMid(J, A, N),
      P_of_BJ: isMid(P, B, J),
      N_of_CJ: isMid(N, C, J),
      S_of_CR: isMid(S, C, R),
      T_of_BN: isMid(T, B, N),
      R_of_BS: isMid(R, B, S),
    },
    parallels: {
      jrParallelToNS:
        Math.abs(cross2D(J, R, N, S)) < 1e-9 &&
        Math.abs(cross2D(R, J, A, B)) < 1e-9 &&
        Math.abs(cross2D(N, S, A, B)) < 1e-9,
      mpParallelToIJ: Math.abs(cross2D(M, P, I, J)) < 1e-9,
      pnParallelToBC: Math.abs(cross2D(P, N, B, C)) < 1e-9,
      tOnJR: Math.abs(cross2D(J, R, J, T)) < 1e-9,
    },
    lengths: {
      AM_AB: distXY(A, M) / distXY(A, B),
      AN_AC: distXY(A, N) / distXY(A, C),
      MN_BC: distXY(M, N) / distXY(B, C),
      BS_BC: distXY(B, S) / distXY(B, C),
      CS,
      SR,
      RB,
      BR_BS: RB / distXY(B, S),
      BM_BI: distXY(B, M) / distXY(B, I),
      AI_AM: distXY(A, I) / distXY(A, M),
    },
    thirdsEqual: equalsWithin(CS, SR) && equalsWithin(SR, RB),
    bsnmpParallelogram:
      Math.abs(cross2D(M, B, S, N)) < 1e-9 && Math.abs(cross2D(N, S, M, B)) < 1e-9,
  };
}

/* -------------------------------------------------------------------------- */
/*  2. Page 40 — the theorem figure, with (d) drawn as a full line             */
/* -------------------------------------------------------------------------- */

export const L11_THEOREM_SCENE = (() => {
  const A: XY = [4.1, 6.9];
  const B: XY = [0.7, 0.9];
  const C: XY = [8.5, 1.2];
  const k = 0.42;
  const M = sectionPoint(A, B, k);
  const N = sectionPoint(A, C, k);
  // The printed figure draws (d) as a line through M and N, overhanging the
  // triangle on both sides.
  const dLeft = extendBeyond(N, M, 1.9);
  const dRight = extendBeyond(M, N, 1.9);
  return { A, B, C, M, N, dLeft, dRight };
})();

/* -------------------------------------------------------------------------- */
/*  3. Page 40 — the two «(d) cuts the extensions» panels                      */
/* -------------------------------------------------------------------------- */

export interface ExtensionPanel {
  id: 'beyond-apex' | 'beyond-base';
  A: XY;
  B: XY;
  C: XY;
  /** Where (d) crosses the line (AB) outside the segment. */
  M: XY;
  /** Where (d) crosses the line (AC) outside the segment. */
  N: XY;
  /** Two ends of the horizontal line (d). */
  dLeft: XY;
  dRight: XY;
}

function buildExtensionPanel(
  id: ExtensionPanel['id'],
  triangle: { A: XY; B: XY; C: XY },
  y: number,
): ExtensionPanel {
  const { A, B, C } = triangle;
  const horizontal: [XY, XY] = [
    [0, y],
    [9, y],
  ];
  const M = lineIntersection(A, B, horizontal[0], horizontal[1]);
  const N = lineIntersection(A, C, horizontal[0], horizontal[1]);
  return {
    id,
    A,
    B,
    C,
    M,
    N,
    dLeft: [Math.min(M[0], N[0]) - 1.2, y],
    dRight: [Math.max(M[0], N[0]) + 1.2, y],
  };
}

/**
 * Printed case ①: (d) meets the extensions of [AB] and [AC] beyond A. The base
 * [BC] is horizontal so that the figure can show (d) ∥ (BC) by construction.
 */
export const L11_EXTENSION_BEYOND_APEX = buildExtensionPanel(
  'beyond-apex',
  { A: [4.2, 3.4], B: [1.4, 1.0], C: [7.2, 1.0] },
  5.6,
);

/** Printed case ②: (d) meets the extensions of [AB] and [AC] beyond B and C. */
export const L11_EXTENSION_BEYOND_BASE = buildExtensionPanel(
  'beyond-base',
  { A: [4.4, 6.4], B: [1.6, 2.6], C: [7.4, 2.6] },
  1.2,
);

/* -------------------------------------------------------------------------- */
/*  4. Page 40 — correspondence figure (the annotated ratio bars)              */
/* -------------------------------------------------------------------------- */

export const L11_CORRESPONDENCE = (() => {
  const A: XY = [3.6, 6.2];
  const B: XY = [0.8, 0.8];
  const C: XY = [8.0, 1.1];
  const k = 0.45;
  return { A, B, C, M: sectionPoint(A, B, k), N: sectionPoint(A, C, k) };
})();

/* -------------------------------------------------------------------------- */
/*  5. Pages 40–41 — the printed worked example (AB=3, AC=6, BC=5, AE=2)      */
/* -------------------------------------------------------------------------- */

export const L11_EXAMPLE_SCENE = (() => {
  // BC = 5 is the base; AB = 3 and AC = 6 are exact Euclidean distances.
  const triangle = triangleWithSides(5, 3, 6);
  const E = sectionPoint(triangle.A, triangle.B, 2 / 3); // AE = 2 of AB = 3
  const F = sectionPoint(triangle.A, triangle.C, 2 / 3); // AF = 4 of AC = 6
  const dLeft = extendBeyond(F, E, 1.0);
  const dRight = extendBeyond(E, F, 1.0);
  return { ...triangle, E, F, dLeft, dRight };
})();

/* -------------------------------------------------------------------------- */
/*  6. Page 41 — تحقّق من فهمك                                                 */
/* -------------------------------------------------------------------------- */

export const L11_CHECK_ONE = (() => {
  const triangle = { A: [3.5, 6.0] as XY, B: [0.7, 0.8] as XY, C: [8.1, 1.0] as XY };
  const k = 0.4;
  return {
    ...triangle,
    D: sectionPoint(triangle.A, triangle.B, k),
    E: sectionPoint(triangle.A, triangle.C, k),
  };
})();

export const L11_CHECK_TWO = (() => {
  // Printed labels: triangle FGH with I ∈ [FG] and J ∈ [FH].
  const F: XY = [0.9, 4.6];
  const G: XY = [7.9, 0.9];
  const H: XY = [4.4, 6.6];
  const k = 0.45;
  return {
    F,
    G,
    H,
    I: sectionPoint(F, G, k),
    J: sectionPoint(F, H, k),
  };
})();

/* -------------------------------------------------------------------------- */
/*  7. Page 41 — تدرّب ①: three cases, each exact at the printed values        */
/* -------------------------------------------------------------------------- */

/**
 * Case ① prints 5 on the upper part of the left side, x on the lower part, 8 on
 * the interior parallel and 15 on [BC]. Parallelism forces
 * 5 / (5 + x) = 8 / 15, i.e. x = 35/8, so the figure is drawn exact.
 */
export const L11_PRACTICE_ONE_CASE_1 = (() => {
  const ratio = 8 / 15;
  const x = 35 / 8;
  const leftSide = 5 + x;
  const triangle = triangleWithSides(15, leftSide, 13);
  const P = sectionPoint(triangle.A, triangle.B, ratio);
  const Q = sectionPoint(triangle.A, triangle.C, ratio);
  return { ...triangle, P, Q, ratio, x };
})();

/**
 * Case ② prints 8 on the upper part of the right side, 15 on the whole right
 * side (dashed bracket), 5 on the interior parallel and x on [BC]:
 * 8/15 = 5/x, i.e. x = 75/8.
 */
export const L11_PRACTICE_ONE_CASE_2 = (() => {
  const ratio = 8 / 15;
  const x = 75 / 8;
  const triangle = triangleWithSides(x, 14, 15);
  const P = sectionPoint(triangle.A, triangle.B, ratio);
  const Q = sectionPoint(triangle.A, triangle.C, ratio);
  return { ...triangle, P, Q, ratio, x, wholeSide: 15, upper: 8 };
})();

/**
 * Case ③ prints 5 on the upper part of the right side, x on the whole right
 * side, 8 on the interior parallel and 15 on [BC]: 5/x = 8/15, i.e. x = 75/8.
 */
export const L11_PRACTICE_ONE_CASE_3 = (() => {
  const ratio = 8 / 15;
  const x = 75 / 8;
  const triangle = triangleWithSides(15, 13, x);
  const P = sectionPoint(triangle.A, triangle.B, ratio);
  const Q = sectionPoint(triangle.A, triangle.C, ratio);
  return { ...triangle, P, Q, ratio, x, wholeSide: x, upper: 5 };
})();

/* -------------------------------------------------------------------------- */
/*  8. Page 41 — تدرّب ②: three triangles read from the printed arrows         */
/* -------------------------------------------------------------------------- */

export const L11_PRACTICE_TWO_ONE = (() => {
  const triangle = { A: [4.0, 6.0] as XY, B: [0.9, 0.9] as XY, C: [8.2, 1.2] as XY };
  const k = 0.45;
  return {
    ...triangle,
    I: sectionPoint(triangle.A, triangle.B, k),
    J: sectionPoint(triangle.A, triangle.C, k),
  };
})();

export const L11_PRACTICE_TWO_TWO = (() => {
  // Printed skeleton: E top-left, F bottom, G right; H ∈ [EF], K ∈ [EG].
  const E: XY = [1.0, 6.2];
  const F: XY = [4.2, 0.9];
  const G: XY = [8.6, 4.2];
  const k = 0.45;
  return {
    E,
    F,
    G,
    H: sectionPoint(E, F, k),
    K: sectionPoint(E, G, k),
  };
})();

export const L11_PRACTICE_TWO_THREE = (() => {
  // Printed skeleton: O left, M top-right, N below it; Q ∈ [OM], P ∈ [ON].
  const O: XY = [0.8, 2.6];
  const M: XY = [8.2, 6.4];
  const N: XY = [6.4, 0.9];
  const k = 0.5;
  return {
    O,
    M,
    N,
    Q: sectionPoint(O, M, k),
    P: sectionPoint(O, N, k),
  };
})();

/* -------------------------------------------------------------------------- */
/*  9. Interactive lab — the printed construction at any ratio k              */
/* -------------------------------------------------------------------------- */

export type ThreeRatiosPresetId = 'acute' | 'right' | 'obtuse';

export interface ThreeRatiosTriangle {
  id: ThreeRatiosPresetId;
  label: string;
  A: XY;
  B: XY;
  C: XY;
}

export const L11_LAB_TRIANGLES: readonly ThreeRatiosTriangle[] = [
  {
    id: 'acute',
    label: 'مثلث حاد الزوايا',
    A: [4.0, 6.4],
    B: [0.6, 0.8],
    C: [8.4, 1.2],
  },
  {
    id: 'right',
    label: 'مثلث قائم في B',
    A: [1.1, 6.3],
    B: [1.1, 0.9],
    C: [8.6, 0.9],
  },
  {
    id: 'obtuse',
    label: 'مثلث منفرج الزاوية',
    A: [1.6, 6.0],
    B: [3.2, 0.9],
    C: [8.8, 1.6],
  },
] as const;

export interface ThreeRatiosFacts {
  /** J is the midpoint of [AN] for every k (Lesson 2's midline theorem). */
  jMidAN: boolean;
  /** P is the midpoint of [BJ] only when k = 2/3. */
  pMidBJ: boolean;
  /** N is the midpoint of [CJ] only when k = 2/3. */
  nMidCJ: boolean;
  /** CS = SR = RB only when k = 2/3. */
  thirdsEqual: boolean;
  /** BSNM is a parallelogram for every k (both pairs of sides are parallel). */
  bsnmpParallelogram: boolean;
}

export interface ThreeRatiosScene extends ActivityScene {
  facts: ThreeRatiosFacts;
  ratios: { AM_AB: number; AN_AC: number; MN_BC: number; BS_BC: number };
  lengths: { AN: number; NC: number; BJ: number; BP: number; CS: number; SR: number; RB: number };
}

const EPS = 1e-9;
const round4 = (value: number) => Math.round(value * 10000) / 10000;
const same = (a: number, b: number) => Math.abs(a - b) < 1e-7;

/**
 * Build the printed construction at ratio `k`.
 *
 * At `k = 2/3` — the value of the printed activity — J, P and N are the three
 * midpoints of the printed questions and CS = SR = RB; at any other `k` only
 * J's midpoint and the parallelogram survive. That contrast is what the lab
 * shows, and it is why the textbook chose 2/3.
 */
export function buildThreeRatiosScene(
  triangle: Pick<ThreeRatiosTriangle, 'A' | 'B' | 'C'>,
  k: number,
): ThreeRatiosScene {
  const scene = buildActivityScene(triangle, k);
  const { A, B, C, J, M, N, P, R, S } = scene;

  const jMidAN = same(distXY(A, J), distXY(J, N));
  const pMidBJ = same(distXY(B, P), distXY(P, J));
  const nMidCJ = same(distXY(C, N), distXY(N, J));
  const cs = distXY(C, S);
  const sr = distXY(S, R);
  const rb = distXY(R, B);
  const thirdsEqual = same(cs, sr) && same(sr, rb);

  // BSNM: (MN) ∥ (BC) by construction, and (SN) ∥ (AB) ∥ (MB).
  const bsnmpParallelogram =
    Math.abs(cross2D(M, N, B, C)) < EPS &&
    Math.abs(cross2D(S, N, M, B)) < EPS &&
    Math.abs(cross2D(M, B, N, S)) < EPS;

  return {
    ...scene,
    facts: { jMidAN, pMidBJ, nMidCJ, thirdsEqual, bsnmpParallelogram },
    ratios: {
      AM_AB: round4(distXY(A, M) / distXY(A, B)),
      AN_AC: round4(distXY(A, N) / distXY(A, C)),
      MN_BC: round4(distXY(M, N) / distXY(B, C)),
      BS_BC: round4(distXY(B, S) / distXY(B, C)),
    },
    lengths: {
      AN: round4(distXY(A, N)),
      NC: round4(distXY(N, C)),
      BJ: round4(distXY(B, J)),
      BP: round4(distXY(B, P)),
      CS: round4(cs),
      SR: round4(sr),
      RB: round4(rb),
    },
  };
}

/** Direction used by figures that draw a parallel to a side through a point. */
export function parallelThrough(point: XY, along: XY, length = 3): [XY, XY] {
  const u = unitVec([0, 0], along);
  return [point, [point[0] + u[0] * length, point[1] + u[1] * length]];
}
