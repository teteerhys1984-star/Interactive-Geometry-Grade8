import type { XY } from '@/lib/geometryFigure';

/**
 * ============================================================================
 *  UNIT 2, LESSON 2 — EXACT CARTESIAN GEOMETRY (x right, y up)
 * ============================================================================
 *
 *  Every coordinate in Lesson 9 is derived in mathematical Cartesian space
 *  (`XY = readonly [number, number]`, `x` right, `y` up) using exact midpoints,
 *  central reflections, parallel direction vectors, perpendiculars, and
 *  line-line intersections. `FigureSvg` flips `y` uniformly when painting SVG.
 * ============================================================================
 */

export function midPoint(a: XY, b: XY): XY {
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
}

export function subVec(a: XY, b: XY): XY {
  return [a[0] - b[0], a[1] - b[1]];
}

export function distXY(a: XY, b: XY): number {
  return Math.hypot(b[0] - a[0], b[1] - a[1]);
}

export function unitVec(from: XY, to: XY): XY {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const len = Math.hypot(dx, dy);
  if (len < 1e-12) return [1, 0];
  return [dx / len, dy / len];
}

/** Signed 2D cross product `(b - a) × (d - c)` — zero iff `(AB) ∥ (CD)`. */
export function cross2D(a: XY, b: XY, c: XY, d: XY): number {
  const u = subVec(b, a);
  const v = subVec(d, c);
  return u[0] * v[1] - u[1] * v[0];
}

/** 2D dot product `(b - a) · (d - c)` — zero iff `(AB) ⊥ (CD)`. */
export function dot2D(a: XY, b: XY, c: XY, d: XY): number {
  const u = subVec(b, a);
  const v = subVec(d, c);
  return u[0] * v[0] + u[1] * v[1];
}

/** Point along `a → b` extended past `b` by `overhang` units. */
export function extendBeyond(a: XY, b: XY, overhang: number): XY {
  const u = unitVec(a, b);
  return [b[0] + u[0] * overhang, b[1] + u[1] * overhang];
}

/** Counter-clockwise rotation of vector `v` by `deg` degrees (y-up). */
export function rotateVec(v: XY, deg: number): XY {
  const rad = (deg * Math.PI) / 180;
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  return [v[0] * c - v[1] * s, v[0] * s + v[1] * c];
}

/** Exact intersection of the infinite lines `(P1 P2)` and `(Q1 Q2)`. */
export function lineIntersection(p1: XY, p2: XY, q1: XY, q2: XY): XY {
  const r = subVec(p2, p1);
  const s = subVec(q2, q1);
  const denom = r[0] * s[1] - r[1] * s[0];
  if (Math.abs(denom) < 1e-10) {
    throw new Error('Lines are parallel or coincident; cannot intersect.');
  }
  const qp = subVec(q1, p1);
  const t = (qp[0] * s[1] - qp[1] * s[0]) / denom;
  return [p1[0] + t * r[0], p1[1] + t * r[1]];
}

/* -------------------------------------------------------------------------- */
/*  1. Page 34 — Salim's 3-panel activity & interactive ParallelMidpointLab   */
/* -------------------------------------------------------------------------- */

export type ParallelLabPresetId = 'acute' | 'right' | 'obtuse';

export interface ParallelLabTriangle {
  id: ParallelLabPresetId;
  label: string;
  A: XY;
  B: XY;
  C: XY;
}

export const L9_LAB_TRIANGLES: readonly ParallelLabTriangle[] = [
  {
    id: 'acute',
    label: 'مثلث حاد الزوايا',
    A: [2.6, 5.8],
    B: [0.4, 0.5],
    C: [7.8, 1.4],
  },
  {
    id: 'right',
    label: 'مثلث قائم في B',
    A: [0.9, 5.7],
    B: [0.9, 0.7],
    C: [7.9, 0.7],
  },
  {
    id: 'obtuse',
    label: 'مثلث منفرج الزاوية',
    A: [1.2, 5.5],
    B: [2.7, 0.7],
    C: [8.0, 1.2],
  },
] as const;

export interface SalimScene {
  A: XY;
  B: XY;
  C: XY;
  M: XY;
  N: XY;
  P: XY;
  dStart: XY;
  dEnd: XY;
  dPrimeStart: XY;
  dPrimeEnd: XY;
  deltaDeg: number;
  lengths: {
    AC: number;
    AN: number;
    NC: number;
    AP: number;
    PC: number;
    PN: number;
  };
}

export function buildSalimScene(
  tri: Pick<ParallelLabTriangle, 'A' | 'B' | 'C'>,
  deltaDeg: number,
  overhang = 0.85,
): SalimScene {
  const { A, B, C } = tri;
  const M = midPoint(A, B);
  const N = midPoint(A, C);
  const baseDir = unitVec(B, C);
  const dDir = rotateVec(baseDir, deltaDeg);
  const m2: XY = [M[0] + dDir[0] * 4, M[1] + dDir[1] * 4];
  const P = Math.abs(deltaDeg) < 1e-9 ? N : lineIntersection(M, m2, A, C);

  const dStart = extendBeyond(P, M, overhang);
  const dEnd = extendBeyond(M, P, overhang + 0.35);
  const dPrimeStart = extendBeyond(N, M, overhang);
  const dPrimeEnd = extendBeyond(M, N, overhang + 0.35);

  const round2 = (value: number) => Math.round(value * 100) / 100;

  return {
    A,
    B,
    C,
    M,
    N,
    P,
    dStart,
    dEnd,
    dPrimeStart,
    dPrimeEnd,
    deltaDeg,
    lengths: {
      AC: round2(distXY(A, C)),
      AN: round2(distXY(A, N)),
      NC: round2(distXY(N, C)),
      AP: round2(distXY(A, P)),
      PC: round2(distXY(P, C)),
      PN: round2(distXY(P, N)),
    },
  };
}

/**
 * Positive counter-clockwise rotation (`+13°` in y-up coordinates) tilts the
 * right end of `(d)` upward so `P` lands between `A` and `N`, matching panels
 * ② and ③ on page 34.
 */
export const L9_SALIM_FREEHAND_DEG = 13;

export const L9_ACTIVITY_PANEL_BASE = {
  A: [2.2, 5.2] as XY,
  B: [0.8, 0.7] as XY,
  C: [5.5, 1.5] as XY,
} as const;

export function buildActivityPanelScene(offsetX: number) {
  const tri = {
    A: [L9_ACTIVITY_PANEL_BASE.A[0] + offsetX, L9_ACTIVITY_PANEL_BASE.A[1]] as XY,
    B: [L9_ACTIVITY_PANEL_BASE.B[0] + offsetX, L9_ACTIVITY_PANEL_BASE.B[1]] as XY,
    C: [L9_ACTIVITY_PANEL_BASE.C[0] + offsetX, L9_ACTIVITY_PANEL_BASE.C[1]] as XY,
  };
  return buildSalimScene(tri, L9_SALIM_FREEHAND_DEG, 0.55);
}

/* -------------------------------------------------------------------------- */
/*  2. Page 34 — Worked example (`I` mid `[AB]`, `(IJ) ∥ (BC)`)               */
/* -------------------------------------------------------------------------- */

export const L9_EXAMPLE = (() => {
  const A: XY = [3.2, 5.4];
  const B: XY = [0.4, 0.6];
  const C: XY = [7.2, 0.9];
  const I = midPoint(A, B);
  const J = midPoint(A, C);
  const lineLeft = extendBeyond(J, I, 0.85);
  const lineRight = extendBeyond(I, J, 0.85);
  return { A, B, C, I, J, lineLeft, lineRight };
})();

/* -------------------------------------------------------------------------- */
/*  3. Page 35 — Knowledge Acquisition (`R` mid `[AM]`, `(d) ∥ (BC)`)         */
/* -------------------------------------------------------------------------- */

export const L9_KNOWLEDGE = (() => {
  const C: XY = [0.4, 0.6];
  const B: XY = [8.4, 0.6];
  /** `M` on `[BC]` with `CM = 4.8`, `MB = 3.2` (`M` is NOT the midpoint of `[BC]`). */
  const M: XY = [5.2, 0.6];
  const A: XY = [5.6, 5.4];
  const R = midPoint(A, M);
  const r2: XY = [R[0] + (B[0] - C[0]), R[1] + (B[1] - C[1])];
  const S = lineIntersection(R, r2, A, B);
  const dLeft = extendBeyond(S, R, 4.1);
  const dRight = extendBeyond(R, S, 1.3);
  return { A, B, C, M, R, S, dLeft, dRight };
})();

/* -------------------------------------------------------------------------- */
/*  4. Page 35 — Check Understanding ① (`E` mid `[AC]`, `(EF) ∥ (AB)`)        */
/* -------------------------------------------------------------------------- */

export const L9_CHECK_1 = (() => {
  const A: XY = [1.4, 5.4];
  const B: XY = [0.4, 0.6];
  const C: XY = [7.8, 1.8];
  const E = midPoint(A, C);
  const e2: XY = [E[0] + (B[0] - A[0]), E[1] + (B[1] - A[1])];
  const F = lineIntersection(E, e2, B, C);
  const lineTop = extendBeyond(F, E, 0.8);
  const lineBottom = extendBeyond(E, F, 0.8);
  return { A, B, C, E, F, lineTop, lineBottom };
})();

/* -------------------------------------------------------------------------- */
/*  5. Page 35 — Check Understanding ② (Right triangle at `B`, `(MN) ⊥ (AB)`) */
/* -------------------------------------------------------------------------- */

export const L9_CHECK_2 = (() => {
  const B: XY = [0.6, 0.6];
  const A: XY = [7.4, 0.6];
  const C: XY = [0.6, 5.0];
  const M = midPoint(A, B);
  const mPerp: XY = [M[0], M[1] + 2];
  const N = lineIntersection(M, mPerp, A, C);
  const lineTop = extendBeyond(M, N, 0.85);
  const lineBottom = extendBeyond(N, M, 0.65);
  return { A, B, C, M, N, lineTop, lineBottom };
})();

/* -------------------------------------------------------------------------- */
/*  6. Page 35 — Practice ① (`S` symmetric of `I` wrt `J`, `(ST) ∥ (JK)`)     */
/* -------------------------------------------------------------------------- */

export const L9_PRACTICE_1 = (() => {
  const I: XY = [0.5, 0.6];
  const J: XY = [2.6, 2.9];
  const K: XY = [4.3, 1.3];
  const S: XY = [2 * J[0] - I[0], 2 * J[1] - I[1]];
  const sParallel: XY = [S[0] + (K[0] - J[0]), S[1] + (K[1] - J[1])];
  const T = lineIntersection(S, sParallel, I, K);
  const stTop = extendBeyond(T, S, 0.65);
  const stBottom = extendBeyond(S, T, 0.7);
  const ikRight = extendBeyond(I, T, 0.75);
  return { I, J, K, S, T, stTop, stBottom, ikRight };
})();

/* -------------------------------------------------------------------------- */
/*  7. Page 35 — Practice ② (`C` mid `[AJ]`, `(AM) ∥ (CP)` cuts `(JP)` at `M`)*/
/* -------------------------------------------------------------------------- */

export const L9_PRACTICE_2 = (() => {
  const J: XY = [0.5, 0.6];
  const A: XY = [4.0, 4.9];
  const P: XY = [4.3, 1.4];
  const C = midPoint(A, J);
  const aParallel: XY = [A[0] + (P[0] - C[0]), A[1] + (P[1] - C[1])];
  const M = lineIntersection(A, aParallel, J, P);
  const amTop = extendBeyond(M, A, 0.65);
  const amBottom = extendBeyond(A, M, 0.7);
  const jmRight = extendBeyond(J, M, 0.75);
  return { A, J, P, C, M, amTop, amBottom, jmRight };
})();

/* -------------------------------------------------------------------------- */
/*  8. Shared coordinates for Test Area figures (`q10` & `q16`)               */
/* -------------------------------------------------------------------------- */

export const L9_TEST_RIGHT_TRIANGLE = {
  B: [0, 0] as XY,
  A: [8, 0] as XY,
  C: [0, 5] as XY,
  M: [4, 0] as XY,
  N: [4, 2.5] as XY,
} as const;

export const L9_TEST_CEVIAN = {
  C: [0, 0] as XY,
  M: [5.2, 0] as XY,
  B: [8, 0] as XY,
  A: [5.6, 5.2] as XY,
  R: [5.4, 2.6] as XY,
} as const;
