import type { XY } from '@/lib/geometryFigure';
import {
  cross2D,
  distXY,
  dot2D,
  lineIntersection,
  midPoint,
  subVec,
  unitVec,
} from './lesson-10-geometry';

/**
 * ============================================================================
 *  الوحدة الثالثة، الدرس الثاني — «ارتفاع مثلث» (الصفحات 56–58)
 *  EXACT CARTESIAN GEOMETRY (x right, y up)
 * ============================================================================
 *
 *  Every coordinate is COMPUTED, never eyeballed:
 *
 *    • the altitude from a vertex is the line through that vertex perpendicular
 *      to the opposite side; its foot is the orthogonal projection of the
 *      vertex on that side's line;
 *    • the orthocenter `H` is the LINE INTERSECTION of two altitudes, so the
 *      concurrence stated on page 57 is a computed fact of these scenes;
 *    • the page-56 proof builds the anticomplementary triangle `MNP`
 *      (M = A+B−C, N = B+C−A, P = A+C−B), whose side-midpoints are exactly
 *      A, B, C; the perpendicular bisectors of MNP are the altitudes of ABC,
 *      and their concurrence H is the circumcenter of MNP;
 *    • the three printed panels of page 57 place H inside (acute), outside
 *      (obtuse in A) and at the right-angle vertex (right in A).
 *
 *  `lesson-14-geometry.test.ts` re-derives every claim from the raw coordinates.
 *  Shared helpers come from `lesson-10-geometry.ts` (the established convention).
 * ============================================================================
 */

export interface Triangle {
  A: XY;
  B: XY;
  C: XY;
}

/** Orthogonal projection of `p` on the infinite line `(a b)`. */
export function projectOnLine(p: XY, a: XY, b: XY): XY {
  const u = unitVec(a, b);
  const t = (p[0] - a[0]) * u[0] + (p[1] - a[1]) * u[1];
  return [a[0] + u[0] * t, a[1] + u[1] * t];
}

/** Foot of the altitude from `vertex` on the opposite side's line `(p q)`. */
export function altitudeFoot(vertex: XY, p: XY, q: XY): XY {
  return projectOnLine(vertex, p, q);
}

/** `H` — where the altitudes from `A` and from `B` meet (the orthocenter). */
export function orthocenter(t: Triangle): XY {
  const nBC = normal(t.B, t.C);
  const nAC = normal(t.A, t.C);
  return lineIntersection(t.A, [t.A[0] + nBC[0], t.A[1] + nBC[1]], t.B, [
    t.B[0] + nAC[0],
    t.B[1] + nAC[1],
  ]);
}

/** A unit normal to the line `(p q)`. */
function normal(p: XY, q: XY): XY {
  const u = unitVec(p, q);
  return [-u[1], u[0]];
}

/** True when the angle at `v` in `v-a-b` is a right angle. */
export function isRightAngleAt(v: XY, a: XY, b: XY): boolean {
  return Math.abs(dot2D(v, a, v, b)) < 1e-9;
}

/** True when `o` lies strictly inside the triangle. */
export function isInsideTriangle(o: XY, t: Triangle): boolean {
  const side = (p: XY, q: XY): number => cross2D(p, q, p, o);
  const signs = [side(t.A, t.B), side(t.B, t.C), side(t.C, t.A)];
  return signs.every((s) => s > 1e-9) || signs.every((s) => s < -1e-9);
}

/** True when `o` is on the segment `[pq]` (within tolerance). */
export function onSegment(o: XY, p: XY, q: XY): boolean {
  return (
    Math.abs(cross2D(p, q, p, o)) < 1e-9 &&
    Math.min(p[0], q[0]) - 1e-9 <= o[0] &&
    o[0] <= Math.max(p[0], q[0]) + 1e-9 &&
    Math.min(p[1], q[1]) - 1e-9 <= o[1] &&
    o[1] <= Math.max(p[1], q[1]) + 1e-9
  );
}

/** Angle `kÔa` in degrees, in [0, 180]. */
export function measureAngle(k: XY, o: XY, a: XY): number {
  const u = unitVec(o, k);
  const v = unitVec(o, a);
  const c = Math.max(-1, Math.min(1, u[0] * v[0] + u[1] * v[1]));
  return (Math.acos(c) * 180) / Math.PI;
}

/** The three interior angles (degrees) at the vertices of a triangle. */
export function angleAt(t: Triangle): { A: number; B: number; C: number } {
  return {
    A: measureAngle(t.B, t.A, t.C),
    B: measureAngle(t.A, t.B, t.C),
    C: measureAngle(t.A, t.C, t.B),
  };
}

/**
 * The drawn portion of the altitude from `vertex`, covering the vertex, its
 * foot `F` and the orthocenter `H`, with a small overhang at each end. Drawing
 * the whole line through the three points makes the concurrence VISIBLE in
 * every case (the obtuse case needs the stroke to run past the triangle to H).
 */
export function altitudeSpan(vertex: XY, foot: XY, H: XY, overhang = 0.5): { from: XY; to: XY } {
  const dir = unitVec(vertex, foot);
  const param = (p: XY): number => (p[0] - vertex[0]) * dir[0] + (p[1] - vertex[1]) * dir[1];
  const ts = [0, param(foot), param(H)];
  const lo = Math.min(...ts) - overhang;
  const hi = Math.max(...ts) + overhang;
  return {
    from: [vertex[0] + dir[0] * lo, vertex[1] + dir[1] * lo],
    to: [vertex[0] + dir[0] * hi, vertex[1] + dir[1] * hi],
  };
}

export interface AltitudeScene extends Triangle {
  H: XY;
  /** Feet of the altitudes from A, B, C respectively. */
  feet: { A: XY; B: XY; C: XY };
  /** Drawn spans of the altitudes from A, B, C (each covers vertex, foot, H). */
  spans: { from: XY; to: XY }[];
  position: 'inside' | 'outside' | 'vertex';
  /** The three altitude lines all pass through H (computed concurrence). */
  concurrent: boolean;
}

export function buildAltitudeScene(t: Triangle): AltitudeScene {
  const H = orthocenter(t);
  const feet = {
    A: altitudeFoot(t.A, t.B, t.C),
    B: altitudeFoot(t.B, t.A, t.C),
    C: altitudeFoot(t.C, t.A, t.B),
  };
  const spans = [
    altitudeSpan(t.A, feet.A, H),
    altitudeSpan(t.B, feet.B, H),
    altitudeSpan(t.C, feet.C, H),
  ];
  const atVertex = distXY(H, t.A) < 1e-6 || distXY(H, t.B) < 1e-6 || distXY(H, t.C) < 1e-6;
  const position: AltitudeScene['position'] = atVertex
    ? 'vertex'
    : isInsideTriangle(H, t)
      ? 'inside'
      : 'outside';
  const onLine = (span: { from: XY; to: XY }): boolean =>
    Math.abs(cross2D(span.from, span.to, span.from, H)) < 1e-7;
  return {
    ...t,
    H,
    feet,
    spans,
    position,
    concurrent: spans.every(onLine),
  };
}

/* -------------------------------------------------------------------------- */
/*  1. الصفحة 56 — شكل التعريف                                                 */
/* -------------------------------------------------------------------------- */

/** Definition figure: a scalene acute triangle and the altitude from A. */
export const L14_DEFINITION_TRIANGLE: Triangle = {
  A: [3.0, 5.4],
  B: [0.7, 0.9],
  C: [8.3, 1.1],
};

export const L14_DEFINITION = (() => {
  const t = L14_DEFINITION_TRIANGLE;
  const foot = altitudeFoot(t.A, t.B, t.C);
  const dir = unitVec(t.A, foot);
  return {
    ...t,
    foot,
    // The line (d) runs a little above A and a little below the foot, as printed.
    from: [t.A[0] - dir[0] * 0.9, t.A[1] - dir[1] * 0.9] as XY,
    to: [foot[0] + dir[0] * 0.9, foot[1] + dir[1] * 0.9] as XY,
  };
})();

/* -------------------------------------------------------------------------- */
/*  2. الصفحة 56 — شكل الإثبات: المثلث MNP والمثلث الأصلي ABC                   */
/* -------------------------------------------------------------------------- */

export interface ProofScene extends Triangle {
  M: XY;
  N: XY;
  P: XY;
  /** A is the midpoint of [MP], B of [MN], C of [NP]. */
  midpoints: { A: boolean; B: boolean; C: boolean };
  /** The three side-lines of MNP (each through a vertex of ABC, ∥ opposite side). */
  sides: { from: XY; to: XY }[];
  /** The perpendicular bisectors of MNP = the altitudes of ABC, meeting at H. */
  H: XY;
  bisectors: { from: XY; to: XY }[];
  /** MA = AP, MB = BN, NC = CP (the printed parallelogram consequences). */
  equalities: { MA_AP: boolean; MB_BN: boolean; NC_CP: boolean };
}

export const L14_PROOF_TRIANGLE: Triangle = {
  A: [3.4, 5.6],
  B: [1.0, 1.2],
  C: [6.4, 1.5],
};

export function buildProofScene(t: Triangle = L14_PROOF_TRIANGLE): ProofScene {
  const M: XY = [t.A[0] + t.B[0] - t.C[0], t.A[1] + t.B[1] - t.C[1]];
  const N: XY = [t.B[0] + t.C[0] - t.A[0], t.B[1] + t.C[1] - t.A[1]];
  const P: XY = [t.A[0] + t.C[0] - t.B[0], t.A[1] + t.C[1] - t.B[1]];
  const H = orthocenter(t);
  const eq = (a: number, b: number): boolean => Math.abs(a - b) < 1e-9;
  const near = (p: XY, q: XY): boolean => distXY(p, q) < 1e-9;
  // Each side-line of MNP is drawn a little beyond its two endpoints.
  const over = (a: XY, b: XY): { from: XY; to: XY } => {
    const u = unitVec(a, b);
    return {
      from: [a[0] - u[0] * 0.7, a[1] - u[1] * 0.7],
      to: [b[0] + u[0] * 0.7, b[1] + u[1] * 0.7],
    };
  };
  return {
    ...t,
    M,
    N,
    P,
    midpoints: {
      A: near(midPoint(M, P), t.A),
      B: near(midPoint(M, N), t.B),
      C: near(midPoint(N, P), t.C),
    },
    sides: [over(M, P), over(M, N), over(N, P)],
    H,
    bisectors: [
      altitudeSpan(t.A, altitudeFoot(t.A, t.B, t.C), H, 0.7),
      altitudeSpan(t.B, altitudeFoot(t.B, t.A, t.C), H, 0.7),
      altitudeSpan(t.C, altitudeFoot(t.C, t.A, t.B), H, 0.7),
    ],
    equalities: {
      MA_AP: eq(distXY(M, t.A), distXY(t.A, P)),
      MB_BN: eq(distXY(M, t.B), distXY(t.B, N)),
      NC_CP: eq(distXY(N, t.C), distXY(t.C, P)),
    },
  };
}

export const L14_PROOF = buildProofScene();

/* -------------------------------------------------------------------------- */
/*  3. الصفحة 57 — «خاصة وتعريف»: الحالات الثلاث                                */
/* -------------------------------------------------------------------------- */

export type AltitudeCaseId = 'acute' | 'obtuse' | 'right';

export interface AltitudeCase extends AltitudeScene {
  id: AltitudeCaseId;
  label: string;
  caption: string;
}

/**
 * The three printed panels of page 57. Their whole point is WHERE `H` falls:
 * inside for the acute triangle, outside (beyond A) for the obtuse one, and
 * exactly at A for the right one. Each is produced by construction.
 */
export const L14_CASES: readonly AltitudeCase[] = [
  {
    ...buildAltitudeScene({ A: [3.3, 5.7], B: [0.9, 1.0], C: [7.4, 1.3] }),
    id: 'acute',
    label: 'مثلث حاد الزوايا',
    caption: 'المثلث $ABC$ حاد الزوايا',
  },
  {
    ...buildAltitudeScene({ A: [3.6, 2.5], B: [0.8, 4.6], C: [7.6, 4.9] }),
    id: 'obtuse',
    label: 'مثلث منفرج في $\\widehat{A}$',
    caption: 'المثلث $ABC$ منفرج في $\\widehat{A}$',
  },
  {
    // Right angle at A by Thales: A on the circle of diameter [BC].
    ...buildAltitudeScene(
      (() => {
        const B: XY = [0.9, 1.0];
        const C: XY = [6.9, 1.0];
        const O = midPoint(B, C);
        const r = distXY(B, C) / 2;
        const th = (115 * Math.PI) / 180;
        const A: XY = [O[0] + r * Math.cos(th), O[1] + r * Math.sin(th)];
        return { A, B, C };
      })(),
    ),
    id: 'right',
    label: 'مثلث قائم في $\\widehat{A}$',
    caption: 'المثلث $ABC$ قائم في $\\widehat{A}$',
  },
];

export const L14_ACUTE = L14_CASES[0]!;
export const L14_OBTUSE = L14_CASES[1]!;
export const L14_RIGHT = L14_CASES[2]!;

/* -------------------------------------------------------------------------- */
/*  4. الصفحة 57 — مثال 1: مثلث منفرج في A، الارتفاعان من A و B                 */
/* -------------------------------------------------------------------------- */

/**
 * Example 1 (page 57): an obtuse triangle at A drawn as in the book — B
 * top-left, C top-right, A below. The altitude from A is ⟂ (BC); the altitude
 * from B is ⟂ (CA) and meets the extension of [CA) beyond A. They meet at H
 * below A, outside the triangle.
 */
export const L14_EXAMPLE_ONE_TRIANGLE: Triangle = {
  A: [3.0, 1.5],
  B: [0.8, 4.7],
  C: [7.8, 4.5],
};

export const L14_EXAMPLE_ONE = (() => {
  const t = L14_EXAMPLE_ONE_TRIANGLE;
  const scene = buildAltitudeScene(t);
  const footB = altitudeFoot(t.B, t.C, t.A);
  return {
    ...scene,
    footB,
    // The extension of [CA) beyond A, drawn dashed to the foot of B's altitude.
    extension: { from: t.A, to: footB },
  };
})();

/* -------------------------------------------------------------------------- */
/*  5. الصفحة 58 — حل مثال 2: ارتفاعا [AL] و[CK] يتقاطعان في H                  */
/* -------------------------------------------------------------------------- */

/**
 * Example 2 (pages 57–58): [AL] and [CK] are two altitudes of ABC meeting at H.
 * The orthocenter of triangle AHC is B. The figure shows L on BC, K on AB.
 */
export const L14_EXAMPLE_TWO_TRIANGLE: Triangle = {
  A: [2.9, 5.6],
  B: [0.8, 1.0],
  C: [7.9, 1.2],
};

export const L14_EXAMPLE_TWO = (() => {
  const t = L14_EXAMPLE_TWO_TRIANGLE;
  const H = orthocenter(t);
  const L = altitudeFoot(t.A, t.B, t.C);
  const K = altitudeFoot(t.C, t.A, t.B);
  return {
    ...t,
    H,
    L,
    K,
    // The two printed altitudes [AL] and [CK].
    AL: { from: t.A, to: L },
    CK: { from: t.C, to: K },
    /** Orthocenter of AHC is B (verified in the test). */
    orthocenterOfAHC: orthocenter({ A: t.A, B: H, C: t.C }),
  };
})();

/* -------------------------------------------------------------------------- */
/*  6. الصفحة 58 — تحقّق من فهمك: B = 120°, BA = 5, BC = 4                      */
/* -------------------------------------------------------------------------- */

const CHECK_SCALE = 0.62;

/**
 * «تحقّق من فهمك»: angle B = 120°, BA = 5 cm, BC = 4 cm. Obtuse at B, so the
 * orthocenter H lies outside the triangle. Built from the printed magnitudes.
 */
export const L14_CHECK = (() => {
  const B: XY = [1.4, 1.3];
  const C: XY = [B[0] + 4 * CHECK_SCALE, B[1]];
  const angle = (120 * Math.PI) / 180;
  const A: XY = [
    B[0] + 5 * CHECK_SCALE * Math.cos(angle),
    B[1] + 5 * CHECK_SCALE * Math.sin(angle),
  ];
  const t: Triangle = { A, B, C };
  const scene = buildAltitudeScene(t);
  return {
    ...scene,
    scale: CHECK_SCALE,
    sidesCm: { BA: 5, BC: 4 },
    angleB: 120,
  };
})();

/* -------------------------------------------------------------------------- */
/*  7. الصفحة 58 — تدرّب ①: المثلثات AHB و AHC و BHC                            */
/* -------------------------------------------------------------------------- */

/**
 * Practice ①: a triangle ABC with orthocenter H. The orthocenters of AHB, AHC,
 * BHC are C, B, A respectively. The scene carries all four points.
 */
export const L14_PRACTICE_ONE_TRIANGLE: Triangle = {
  A: [3.2, 5.8],
  B: [0.8, 1.0],
  C: [8.0, 1.4],
};

export const L14_PRACTICE_ONE = (() => {
  const t = L14_PRACTICE_ONE_TRIANGLE;
  const scene = buildAltitudeScene(t);
  return {
    ...scene,
    orthocenters: {
      AHB: orthocenter({ A: t.A, B: scene.H, C: t.B }),
      AHC: orthocenter({ A: t.A, B: scene.H, C: t.C }),
      BHC: orthocenter({ A: t.B, B: scene.H, C: t.C }),
    },
  };
})();

/* -------------------------------------------------------------------------- */
/*  8. الصفحة 58 — تدرّب ②: [BE] و[CF] ارتفاعان، J تلاقيهما، [AJ] مرسومة        */
/* -------------------------------------------------------------------------- */

/**
 * Practice ②: [BE] and [CF] are altitudes of ABC meeting at J; [AJ] is drawn.
 * The orthocenter of AJB is C. E on AC, F on AB.
 */
export const L14_PRACTICE_TWO_TRIANGLE: Triangle = {
  A: [3.1, 5.9],
  B: [0.8, 1.0],
  C: [7.7, 1.2],
};

export const L14_PRACTICE_TWO = (() => {
  const t = L14_PRACTICE_TWO_TRIANGLE;
  const J = orthocenter(t);
  const E = altitudeFoot(t.B, t.A, t.C);
  const F = altitudeFoot(t.C, t.A, t.B);
  return {
    ...t,
    J,
    E,
    F,
    BE: { from: t.B, to: E },
    CF: { from: t.C, to: F },
    AJ: { from: t.A, to: J },
    orthocenterOfAJB: orthocenter({ A: t.A, B: J, C: t.B }),
  };
})();

/* -------------------------------------------------------------------------- */
/*  9. الصفحة 58 — تدرّب ④: مستطيل ABCD، العمود من O على (AC)                  */
/* -------------------------------------------------------------------------- */

/**
 * Practice ④: rectangle ABCD, center O. The perpendicular from O to (AC) meets
 * (DC) at N and (AD) at M. With A=(0,0), B=(a,0), C=(a,b), D=(0,b), a>b, M lies
 * on (AD) beyond D and N on [DC]. The orthocenter of AMC is N; the third
 * altitude is the line (AN) ⟂ (MC).
 */
export const L14_PRACTICE_FOUR = (() => {
  const a = 6.4;
  const b = 3.6;
  const off: XY = [1.0, 1.0];
  const A: XY = [off[0], off[1]];
  const B: XY = [off[0] + a, off[1]];
  const C: XY = [off[0] + a, off[1] + b];
  const D: XY = [off[0], off[1] + b];
  const O = midPoint(A, C);
  // Perpendicular to (AC) through O: direction normal to AC.
  const uAC = unitVec(A, C);
  const n: XY = [-uAC[1], uAC[0]];
  const far: XY = [O[0] + n[0] * 40, O[1] + n[1] * 40];
  const N = lineIntersection(O, far, D, C); // meets (DC)
  const M = lineIntersection(O, far, A, D); // meets (AD)
  const tAMC: Triangle = { A, B: M, C };
  const H = orthocenter(tAMC);
  const footThird = altitudeFoot(A, M, C);
  return {
    A,
    B,
    C,
    D,
    O,
    M,
    N,
    /** The perpendicular (MN) through O. */
    MN: { from: M, to: N },
    /** Orthocenter of AMC equals N (verified). */
    orthocenterOfAMC: H,
    /** Third altitude: from A ⟂ (MC), passing through N. */
    third: { from: A, to: footThird },
    footThird,
    nOnDC: onSegment(N, D, C),
    mBeyondD: !onSegment(M, A, D) && Math.abs(cross2D(A, D, A, M)) < 1e-9,
  };
})();

/* -------------------------------------------------------------------------- */
/*  10. مختبر الارتفاع — the interactive lab scene                             */
/* -------------------------------------------------------------------------- */

export interface AltitudeLabScene extends AltitudeScene {
  /** Distance from H to each vertex (for the metric cards). */
  HA: number;
  HB: number;
  HC: number;
}

/**
 * The lab of this lesson: the page-56/57 concurrency made dynamic. The three
 * altitudes always meet at H; where H sits depends on the triangle (inside,
 * outside, or at the right-angle vertex). Recomputed from the geometry.
 */
export function buildAltitudeLabScene(t: Triangle): AltitudeLabScene {
  const scene = buildAltitudeScene(t);
  return {
    ...scene,
    HA: distXY(scene.H, t.A),
    HB: distXY(scene.H, t.B),
    HC: distXY(scene.H, t.C),
  };
}

/** Re-export the shared helpers the figures/tests use. */
export { distXY, midPoint, subVec, unitVec };
