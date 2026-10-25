import type { XY } from '@/lib/geometryFigure';

/**
 * ============================================================================
 *  UNIT 2, LESSON 3 — EXACT CARTESIAN GEOMETRY (x right, y up)
 * ============================================================================
 *
 *  «مستقيمات متوازية وقاطعان» (textbook pages 36–38).
 *
 *  Every coordinate is derived in mathematical Cartesian space
 *  (`XY = readonly [number, number]`, x right, y up) using exact section
 *  points, parallel direction vectors and line intersections. The numeric
 *  scenes (pages 37–38) are constructed so the PRINTED lengths hold exactly in
 *  Euclidean distance, not merely visually: AM = 2, AR = 8, AN = 3, AS = 12,
 *  AT = 2, TU = 3, AR = 10, AS = 4, AE = 3, AF = 4, AC = 12, JM = 2.5,
 *  JN = 3, NL = 9 and KL = 6. `FigureSvg` flips y uniformly when painting SVG.
 * ============================================================================
 */

export function midPoint(a: XY, b: XY): XY {
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
}

/** Point at fraction `t` of the way from a to b (`t = AM/AB` style ratios). */
export function sectionPoint(a: XY, b: XY, t: number): XY {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
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

/** Build a ray from origin `O` at angle `deg` with point at distance `len`. */
function rayPoint(O: XY, deg: number, len: number): XY {
  const rad = (deg * Math.PI) / 180;
  return [O[0] + len * Math.cos(rad), O[1] + len * Math.sin(rad)];
}

/* -------------------------------------------------------------------------- */
/*  1. Page 36 — نشاط: three triangle panels (M ∈ [AB], N ∈ [AC], (MN) ∥ (BC)) */
/* -------------------------------------------------------------------------- */

export interface ActivityPanelShape {
  id: 'acute' | 'tilted' | 'wide';
  A: XY;
  B: XY;
  C: XY;
}

/** The three printed panel shapes; no lengths are printed on page 36. */
export const L10_ACTIVITY_SHAPES: readonly ActivityPanelShape[] = [
  {
    id: 'acute',
    A: [2.4, 5.4],
    B: [0.6, 0.6],
    C: [5.6, 1.2],
  },
  {
    id: 'tilted',
    A: [1.0, 4.6],
    B: [3.4, 0.6],
    C: [6.4, 2.6],
  },
  {
    id: 'wide',
    A: [3.6, 5.4],
    B: [0.5, 0.7],
    C: [6.7, 0.9],
  },
] as const;

/** Fixed section ratio used across the three panels (schematic, unprinted). */
export const L10_ACTIVITY_RATIO = 0.45;

export interface ActivityPanelScene extends ActivityPanelShape {
  M: XY;
  N: XY;
  /** Ratio AM/AB = AN/AC, identical on both cut sides. */
  ratio: number;
}

export function buildActivityPanelScene(shape: ActivityPanelShape): ActivityPanelScene {
  const M = sectionPoint(shape.A, shape.B, L10_ACTIVITY_RATIO);
  const N = sectionPoint(shape.A, shape.C, L10_ACTIVITY_RATIO);
  return { ...shape, M, N, ratio: L10_ACTIVITY_RATIO };
}

/* -------------------------------------------------------------------------- */
/*  2. Page 36 — تعلّم: two parallel lines (MN) and (BC) cut by (AB) and (AC)  */
/* -------------------------------------------------------------------------- */

export const L10_TRANSVERSAL = (() => {
  // Two horizontal parallel lines, cut by the two converging transversals
  // (AB) and (AC). M,N lie on the upper line; B,C on the lower line.
  const B: XY = [1.2, 0.8];
  const C: XY = [7.6, 0.8];
  const M: XY = [2.6, 3.8];
  const N: XY = [5.4, 3.8];
  const A = lineIntersection(B, M, C, N);
  const upperLeft: XY = [0.7, 3.8];
  const upperRight: XY = [8.1, 3.8];
  const lowerLeft: XY = [0.4, 0.8];
  const lowerRight: XY = [8.4, 0.8];
  return { A, B, C, M, N, upperLeft, upperRight, lowerLeft, lowerRight };
})();

/* -------------------------------------------------------------------------- */
/*  3. Page 37 — اكتساب معارف case ①: AM=2, AR=8, AN=3, AS=12                  */
/* -------------------------------------------------------------------------- */

export const L10_EXAMPLE_1 = (() => {
  const A: XY = [0, 0];
  // Two rays from A: ray AR at 235°, ray AS at 305° (angle RAS ≈ 70°).
  const R = rayPoint(A, 235, 8);
  const S = rayPoint(A, 305, 12);
  const M = rayPoint(A, 235, 2); // AM = 2
  const N = rayPoint(A, 305, 3); // AN = 3
  // Dashed extension of line (AR) beyond R and beyond A, as printed.
  const rBeyond = extendBeyond(A, R, 1.4);
  const aBeyond = extendBeyond(R, A, 1.1);
  // Parallel chevrons run on [MN] and [RS].
  return { A, R, S, M, N, rBeyond, aBeyond };
})();

/* -------------------------------------------------------------------------- */
/*  4. Page 37 — اكتساب معارف case ②: AT=2, TU=3 (AU=5), AR=10, AS=4           */
/* -------------------------------------------------------------------------- */

export const L10_EXAMPLE_2 = (() => {
  const A: XY = [0, 0];
  // Rays AU at 50° and AR at −15° (angle UAR ≈ 65°).
  const U = rayPoint(A, 50, 5); // AU = 5 (AT = 2, TU = 3)
  const R = rayPoint(A, -15, 10); // AR = 10
  const T = rayPoint(A, 50, 2); // AT = 2
  const S = rayPoint(A, -15, 4); // AS = 4
  const rBeyond = extendBeyond(A, R, 1.5);
  const aBeyond = extendBeyond(R, A, 1.1);
  return { A, U, R, T, S, rBeyond, aBeyond };
})();

/* -------------------------------------------------------------------------- */
/*  5. Page 38 — تحقّق من فهمك: AE=3, AF=4, AC=12 (AB=9, EB=6)                 */
/* -------------------------------------------------------------------------- */

export const L10_CHECK = (() => {
  const A: XY = [0, 0];
  // Rays AB at 250°, AC at 300° (angle BAC ≈ 50°).
  const B = rayPoint(A, 250, 9); // AB = 9  (AE = 3 → ratio 1/3, EB = 6)
  const C = rayPoint(A, 300, 12); // AC = 12 (AF = 4 → ratio 1/3)
  const E = rayPoint(A, 250, 3); // AE = 3
  const F = rayPoint(A, 300, 4); // AF = 4
  // Dashed extension of line (AC) beyond C carrying the printed «12».
  const cBeyond = extendBeyond(A, C, 1.6);
  return { A, B, C, E, F, cBeyond };
})();

/* -------------------------------------------------------------------------- */
/*  6. Page 38 — تدرّب ① shape ①: two parallels, two transversals (A,B,C,D…)   */
/* -------------------------------------------------------------------------- */

export const L10_BUNDLE_1 = (() => {
  // Two horizontal parallel lines.
  const topY = 4;
  const bottomY = 0;
  // Transversal (AE): A above the top line, B on the top line, E on the bottom.
  const E: XY = [1.0, bottomY];
  const B: XY = [3.0, topY];
  const A: XY = [4.0, 6.0];
  // Transversal (AF): A → C (top line) → F (bottom line).
  const F: XY = [8.6, bottomY];
  const C = lineIntersection(A, F, [0, topY], [9, topY]);
  // Third printed line (ED): E → C → D, with D on the top line.
  const D = lineIntersection(E, C, [0, topY], [9, topY]);
  const topLeft: XY = [1.6, topY];
  const topRight: XY = [9.4, topY];
  const bottomLeft: XY = [0.3, bottomY];
  const bottomRight: XY = [9.7, bottomY];
  return { A, B, C, D, E, F, topY, bottomY, topLeft, topRight, bottomLeft, bottomRight };
})();

/* -------------------------------------------------------------------------- */
/*  7. Page 38 — تدرّب ① shape ②: three parallel lines & three transversals    */
/* -------------------------------------------------------------------------- */

export const L10_BUNDLE_2 = (() => {
  // Three horizontal parallel lines y = 0 (H,K,N), y = 4 (I,J,T), y = 8 (M).
  const y0 = 0;
  const y1 = 4;
  const y2 = 8;
  // Slant 1 (H → I → G → M1) and slant 2 (K → J → M) CONVERGE at M.
  const H: XY = [0.6, y0];
  const K: XY = [5.4, y0];
  const M: XY = [7.4, y2];
  const I = lineIntersection(H, M, [0, y1], [9, y1]);
  const J = lineIntersection(K, M, [0, y1], [9, y1]);
  // G lies on slant 1 between I and M.
  const G = sectionPoint(I, M, 0.45);
  // Slant 3 (N → T) is parallel to slant 2 (K → J → M).
  const N: XY = [10.6, y0];
  const dirKM: XY = [M[0] - K[0], M[1] - K[1]];
  const T: XY = [N[0] + dirKM[0] * 0.5, N[1] + dirKM[1] * 0.5];
  return { H, I, G, M, K, J, T, N, y0, y1, y2 };
})();

/* -------------------------------------------------------------------------- */
/*  8. Page 38 — تدرّب ②: JKL with JM=2.5, JN=3, NL=9, KL=6 (JK=10, MN=1.5)    */
/* -------------------------------------------------------------------------- */

export const L10_PRACTICE_JKL = (() => {
  // Exact SSS construction: JL = 12 along the x-axis, JK = 10, KL = 6.
  const J: XY = [0, 0];
  const L: XY = [12, 0];
  // x = (JK² + JL² − KL²) / (2·JL) = (100 + 144 − 36) / 24 = 26/3.
  const Kx = 26 / 3;
  const K: XY = [Kx, Math.sqrt(100 - Kx * Kx)];
  const N: XY = [3, 0]; // JN = 3, NL = 9
  // JM = 2.5 = JK/4 → M is the quarter point on [JK], and MN ∥ KL with MN = KL/4 = 1.5.
  const M = sectionPoint(J, K, 0.25);
  return { J, K, L, M, N };
})();

/* -------------------------------------------------------------------------- */
/*  8b. Test Area — bundle identification scene (تدرّب ① style, p. 38)          */
/* -------------------------------------------------------------------------- */

/**
 * Two horizontal parallels cut by two transversals converging at A. Exact by
 * construction: B and C lie on y = 3, E and F on y = 0, with A–B–E and
 * A–C–F collinear, so (BC) ∥ (EF) and the triangle pair is ABC / AEF.
 */
export const L10_TEST_BUNDLE = (() => {
  const A: XY = [4, 6];
  const B: XY = [2.5, 3];
  const C: XY = [5.5, 3];
  const E: XY = [1, 0];
  const F: XY = [7, 0];
  return { A, B, C, E, F };
})();

/* -------------------------------------------------------------------------- */
/*  9. Interactive «مختبر التناسب» model                                       */
/* -------------------------------------------------------------------------- */

export type ThalesPresetId = 'acute' | 'right' | 'obtuse';

export interface ThalesTriangle {
  id: ThalesPresetId;
  label: string;
  A: XY;
  B: XY;
  C: XY;
}

export const L10_LAB_TRIANGLES: readonly ThalesTriangle[] = [
  {
    id: 'acute',
    label: 'مثلث حاد الزوايا',
    A: [3.4, 5.8],
    B: [0.5, 0.6],
    C: [8.0, 1.3],
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
    A: [1.4, 5.4],
    B: [2.9, 0.7],
    C: [8.2, 1.2],
  },
] as const;

export interface ThalesScene {
  A: XY;
  B: XY;
  C: XY;
  M: XY;
  N: XY;
  /** When tilted, the free line through M meets [AC] at P instead of N. */
  P: XY;
  ratios: {
    AM_AB: number;
    AN_AC: number;
    MN_BC: number;
    AP_AC: number;
  };
  lengths: {
    AM: number;
    AB: number;
    AN: number;
    AC: number;
    MN: number;
    BC: number;
  };
}

/**
 * Build the lab scene. `t` is the section AM/AB controlled by the slider;
 * `tiltDeg` rotates the line through M away from the true parallel — at 0° the
 * intersection P coincides with N and all three ratios are exactly equal.
 */
export function buildThalesScene(
  tri: Pick<ThalesTriangle, 'A' | 'B' | 'C'>,
  t: number,
  tiltDeg: number,
): ThalesScene {
  const { A, B, C } = tri;
  const M = sectionPoint(A, B, t);
  const N = sectionPoint(A, C, t);
  const baseDir = unitVec(M, N);
  const tiltedDir = rotateVec(baseDir, tiltDeg);
  const m2: XY = [M[0] + tiltedDir[0] * 4, M[1] + tiltedDir[1] * 4];
  const P = Math.abs(tiltDeg) < 1e-9 ? N : lineIntersection(M, m2, A, C);

  const round4 = (value: number) => Math.round(value * 10000) / 10000;
  const AM = distXY(A, M);
  const AB = distXY(A, B);
  const AN = distXY(A, N);
  const AC = distXY(A, C);
  const MN = distXY(M, N);
  const BC = distXY(B, C);

  return {
    A,
    B,
    C,
    M,
    N,
    P,
    ratios: {
      AM_AB: round4(AM / AB),
      AN_AC: round4(AN / AC),
      MN_BC: round4(MN / BC),
      AP_AC: round4(distXY(A, P) / AC),
    },
    lengths: {
      AM: round4(AM),
      AB: round4(AB),
      AN: round4(AN),
      AC: round4(AC),
      MN: round4(MN),
      BC: round4(BC),
    },
  };
}
