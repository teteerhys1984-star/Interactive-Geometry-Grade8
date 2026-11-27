import type { XY } from '@/lib/geometryFigure';
import { cross2D, distXY, midPoint, unitVec } from './lesson-10-geometry';
import { angleAt, measureAngle, projectOnLine } from './lesson-14-geometry';

/**
 * ============================================================================
 *  الوحدة الثالثة، الدرس الرابع — «منصّف زاوية مثلث» (الصفحات 62–63)
 *  EXACT CARTESIAN GEOMETRY (x right, y up)
 * ============================================================================
 *
 *    • the bisector of Â is the ray from A along the sum of the unit vectors
 *      toward B and C — it makes two EQUAL angles with [AB] and [AC];
 *    • the incenter `I` is the weighted average (a·A + b·B + c·C)/(a+b+c),
 *      where a=|BC|, b=|CA|, c=|AB| — the computed intersection of the three
 *      internal bisectors — and it is equidistant from the three sides;
 *    • the incircle is centered at I with radius = that common distance,
 *      tangent to all three sides.
 *
 *  Printed data (pages 62–63), reconstructed and checked:
 *    • proof: bisectors of B̂ and Ĉ meet at I; L = foot of I on (BC); H on [BA]
 *      with BH = BL; K on [AC] with CK = CL; IH = IL, IK = IL, IHB = IKC = 90°;
 *      AH = AK admitted (next-chapter theorem); (AI) bisects Â.
 *    • check: BC = 7 cm, CBA = 36°, BCA = 64° ⇒ Â = 80°.
 *    • practice ①: triangle ERT, incenter C, CRT = 25°, CTR = 31° ⇒ R̂ = 50°,
 *      T̂ = 62°, RÊT = 68°.
 *    • practice ②: ABC = 84°, ACB = 62°, J = incenter ⇒ BÂC = 34°; the angles of
 *      JAB, JBC, JCA are 17/42/121, 42/31/107, 31/17/132.
 * ============================================================================
 */

export interface Triangle {
  A: XY;
  B: XY;
  C: XY;
}

/** Unit vector along the internal bisector of the angle at `o` (toward k, a). */
export function bisectorDirection(k: XY, o: XY, a: XY): XY {
  const u = unitVec(o, k);
  const v = unitVec(o, a);
  const sx = u[0] + v[0];
  const sy = u[1] + v[1];
  const len = Math.hypot(sx, sy) || 1;
  return [sx / len, sy / len];
}

/** Foot of the internal bisector from `o` on the opposite side [k a]. */
export function bisectorFoot(k: XY, o: XY, a: XY): XY {
  // angle-bisector theorem: kf/fa = ok/oa
  const ok = distXY(o, k);
  const oa = distXY(o, a);
  const t = ok / (ok + oa);
  return [k[0] + t * (a[0] - k[0]), k[1] + t * (a[1] - k[1])];
}

/** `I` — the incenter (weighted average by opposite side lengths). */
export function incenter(t: Triangle): XY {
  const a = distXY(t.B, t.C);
  const b = distXY(t.C, t.A);
  const c = distXY(t.A, t.B);
  const s = a + b + c;
  return [(a * t.A[0] + b * t.B[0] + c * t.C[0]) / s, (a * t.A[1] + b * t.B[1] + c * t.C[1]) / s];
}

/** Distance from `p` to the line through `from`–`to`. */
export function distanceToLine(p: XY, from: XY, to: XY): number {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const len = Math.hypot(dx, dy) || 1;
  return Math.abs((p[0] - from[0]) * dy - (p[1] - from[1]) * dx) / len;
}

/** Incircle radius: the common distance from I to the three sides. */
export function incircleRadius(t: Triangle): number {
  return distanceToLine(incenter(t), t.B, t.C);
}

/** Build a triangle from base [B C] and the two base angles (degrees). */
export function triangleFromBaseAngles(B: XY, C: XY, bDeg: number, cDeg: number): Triangle {
  const bAng = (bDeg * Math.PI) / 180;
  const cAng = (cDeg * Math.PI) / 180;
  const dB: XY = [Math.cos(bAng), Math.sin(bAng)];
  const dC: XY = [-Math.cos(cAng), Math.sin(cAng)];
  const det = dB[0] * -dC[1] - -dC[0] * dB[1];
  const rx = C[0] - B[0];
  const ry = C[1] - B[1];
  const s = (rx * -dC[1] - -dC[0] * ry) / det;
  const A: XY = [B[0] + s * dB[0], B[1] + s * dB[1]];
  return { A, B, C };
}

export interface BisectorScene extends Triangle {
  I: XY;
  /** Feet of the bisectors from A, B, C on the opposite sides. */
  feet: { A: XY; B: XY; C: XY };
  /** Drawn bisector segments from each vertex to its foot. */
  spans: { from: XY; to: XY }[];
  /** The two half-angles at each vertex (equal when the bisector is correct). */
  halves: { A: [number, number]; B: [number, number]; C: [number, number] };
  concurrent: boolean;
  bisects: boolean;
  equidistant: boolean;
  radius: number;
}

export function buildBisectorScene(t: Triangle): BisectorScene {
  const I = incenter(t);
  const feet = {
    A: bisectorFoot(t.B, t.A, t.C),
    B: bisectorFoot(t.A, t.B, t.C),
    C: bisectorFoot(t.A, t.C, t.B),
  };
  const spans = [
    { from: t.A, to: feet.A },
    { from: t.B, to: feet.B },
    { from: t.C, to: feet.C },
  ];
  const halves = {
    A: [measureAngle(t.B, t.A, feet.A), measureAngle(feet.A, t.A, t.C)] as [number, number],
    B: [measureAngle(t.A, t.B, feet.B), measureAngle(feet.B, t.B, t.C)] as [number, number],
    C: [measureAngle(t.A, t.C, feet.C), measureAngle(feet.C, t.C, t.B)] as [number, number],
  };
  const onLine = (s: { from: XY; to: XY }): boolean =>
    Math.abs(cross2D(s.from, s.to, s.from, I)) < 1e-7;
  const eq = (a: number, b: number): boolean => Math.abs(a - b) < 1e-6;
  const rBC = distanceToLine(I, t.B, t.C);
  const rCA = distanceToLine(I, t.C, t.A);
  const rAB = distanceToLine(I, t.A, t.B);
  return {
    ...t,
    I,
    feet,
    spans,
    halves,
    concurrent: spans.every(onLine),
    bisects:
      eq(halves.A[0], halves.A[1]) && eq(halves.B[0], halves.B[1]) && eq(halves.C[0], halves.C[1]),
    equidistant: eq(rBC, rCA) && eq(rCA, rAB),
    radius: rBC,
  };
}

/* -------------------------------------------------------------------------- */
/*  1. الصفحة 62–63 — تعريف المنصّف                                            */
/* -------------------------------------------------------------------------- */

export const L16_DEFINITION_TRIANGLE: Triangle = {
  A: [3.0, 5.6],
  B: [0.8, 1.0],
  C: [8.2, 1.2],
};

/** Definition figure: the bisector from A, its two equal half-angles, foot E. */
export const L16_DEFINITION = (() => {
  const t = L16_DEFINITION_TRIANGLE;
  const foot = bisectorFoot(t.B, t.A, t.C);
  return {
    ...t,
    foot,
    span: { from: t.A, to: foot },
    halfA: [measureAngle(t.B, t.A, foot), measureAngle(foot, t.A, t.C)] as [number, number],
  };
})();

/* -------------------------------------------------------------------------- */
/*  2. الصفحة 62 — اختبار: مثلثان ABC و EFJ                                    */
/* -------------------------------------------------------------------------- */

export const L16_TEST_ABC: Triangle = { A: [2.7, 5.3], B: [0.7, 1.1], C: [5.6, 0.9] };
export const L16_TEST_EFJ: { E: XY; F: XY; J: XY } = {
  E: [0.4, 4.6],
  F: [7.6, 4.7],
  J: [4.4, 1.2],
};
export const L16_TEST_EFJ_TRIANGLE: Triangle = {
  A: L16_TEST_EFJ.E,
  B: L16_TEST_EFJ.F,
  C: L16_TEST_EFJ.J,
};

/* -------------------------------------------------------------------------- */
/*  3. الصفحة 62 — الإثبات: (d1),(d2) منصّفا B̂ و Ĉ، I تلاقيهما، (AI) منصّف Â    */
/* -------------------------------------------------------------------------- */

export const L16_PROOF_TRIANGLE: Triangle = { A: [3.2, 5.7], B: [0.8, 1.0], C: [7.6, 1.3] };

export interface BisectorProofScene extends Triangle {
  I: XY;
  /** L = foot of I on (BC); H on [BA] with BH = BL; K on [AC] with CK = CL. */
  L: XY;
  H: XY;
  K: XY;
  /** IH = IL, IK = IL; IHB = IKC = 90°; I equidistant from H, K, L. */
  IH_IL: boolean;
  IK_IL: boolean;
  IHB90: boolean;
  IKC90: boolean;
  /** AH = AK is admitted (next-chapter theorem), verified numerically here. */
  AH_AK: boolean;
  /** (AI) is the perpendicular bisector of [HK] and the bisector of Â. */
  AI_bisectsHK: boolean;
  AI_bisectsA: boolean;
  distances: { AB: number; AC: number; BC: number };
}

export function buildBisectorProofScene(t: Triangle = L16_PROOF_TRIANGLE): BisectorProofScene {
  const I = incenter(t);
  const L = projectOnLine(I, t.B, t.C); // foot of I on (BC)
  const BL = distXY(t.B, L);
  const CL = distXY(t.C, L);
  // H on [BA] with BH = BL
  const uBA = unitVec(t.B, t.A);
  const H: XY = [t.B[0] + BL * uBA[0], t.B[1] + BL * uBA[1]];
  // K on [AC] with CK = CL
  const uCA = unitVec(t.C, t.A);
  const K: XY = [t.C[0] + CL * uCA[0], t.C[1] + CL * uCA[1]];
  const eq = (a: number, b: number): boolean => Math.abs(a - b) < 1e-6;
  const right = (p: XY, o: XY, q: XY): boolean => eq(measureAngle(p, o, q), 90);
  const distances = {
    AB: distanceToLine(I, t.A, t.B),
    AC: distanceToLine(I, t.A, t.C),
    BC: distanceToLine(I, t.B, t.C),
  };
  const midHK = midPoint(H, K);
  const AI_bisectsHK =
    Math.abs(cross2D(t.A, I, t.A, midHK)) < 1e-6 && eq(measureAngle(t.A, midHK, K), 90);
  const AI_bisectsA = eq(measureAngle(t.B, t.A, I), measureAngle(I, t.A, t.C));
  return {
    ...t,
    I,
    L,
    H,
    K,
    IH_IL: eq(distXY(I, H), distXY(I, L)),
    IK_IL: eq(distXY(I, K), distXY(I, L)),
    IHB90: right(I, H, t.B),
    IKC90: right(I, K, t.C),
    AH_AK: eq(distXY(t.A, H), distXY(t.A, K)),
    AI_bisectsHK,
    AI_bisectsA,
    distances,
  };
}

export const L16_PROOF = buildBisectorProofScene();

/* -------------------------------------------------------------------------- */
/*  4. الصفحة 63 — خواص: المنصّفات الثلاثة، نقطة التلاقي I، الدائرة الداخلية    */
/* -------------------------------------------------------------------------- */

export const L16_PROPERTIES_TRIANGLE: Triangle = { A: [2.9, 5.9], B: [0.8, 1.0], C: [8.0, 1.3] };

export const L16_PROPERTIES = (() => {
  const scene = buildBisectorScene(L16_PROPERTIES_TRIANGLE);
  return { ...scene, circle: { center: scene.I, radius: scene.radius } };
})();

/* -------------------------------------------------------------------------- */
/*  5. الصفحة 63 — تحقّق: BC = 7 cm، CBA = 36°، BCA = 64° ⇒ Â = 80°             */
/* -------------------------------------------------------------------------- */

const CHECK_SCALE = 0.62;

export const L16_CHECK = (() => {
  const B: XY = [0.9, 1.1];
  const C: XY = [B[0] + 7 * CHECK_SCALE, 1.1]; // BC = 7 cm
  const t = triangleFromBaseAngles(B, C, 36, 64); // B̂ = 36°, Ĉ = 64°
  const scene = buildBisectorScene(t);
  return {
    ...scene,
    angles: angleAt(t),
    Ahat: angleAt(t).A,
    scale: CHECK_SCALE,
    sidesCm: { BC: 7 },
    baseAngles: { B: 36, C: 64 },
  };
})();

/* -------------------------------------------------------------------------- */
/*  6. الصفحة 63 — تدرّب ①: ERT، C مركز الدائرة الداخلية، CRT = 25°، CTR = 31°  */
/* -------------------------------------------------------------------------- */

/**
 * Practice ①: triangle ERT (E top, R bottom-left, T bottom-right), incenter C.
 * [RC) bisects R̂ and [TC) bisects T̂. Given CRT = 25°, CTR = 31° ⇒ R̂ = 50°,
 * T̂ = 62°, Ê = RÊT = 68°.
 */
export const L16_PRACTICE_ONE = (() => {
  const Rhat = 2 * 25; // 50°
  const That = 2 * 31; // 62°
  const R: XY = [0.9, 1.1];
  const T: XY = [8.0, 1.1];
  const tERT: Triangle = triangleFromBaseAngles(R, T, Rhat, That); // A=E, B=R, C=T
  const E = tERT.A;
  const C = incenter(tERT); // incenter named C in the printed figure
  return {
    E,
    R,
    T,
    C,
    spanRC: { from: R, to: C },
    spanTC: { from: T, to: C },
    given: { CRT: 25, CTR: 31 },
    Rhat,
    That,
    RET: measureAngle(R, E, T),
    CRTcomputed: measureAngle(C, R, T),
    CTRcomputed: measureAngle(C, T, R),
    RhatComputed: measureAngle(E, R, T),
    ThatComputed: measureAngle(R, T, E),
  };
})();

/* -------------------------------------------------------------------------- */
/*  7. الصفحة 63 — تدرّب ②: ABC = 84°، ACB = 62°، J تلاقي المنصّفين            */
/* -------------------------------------------------------------------------- */

/**
 * Practice ②: triangle ABC, ABC = 84°, ACB = 62° ⇒ BÂC = 34°. J is the
 * intersection of the bisectors of B̂ and Ĉ (the incenter). The angles of the
 * sub-triangles JAB, JBC, JCA are derived and checked.
 */
export const L16_PRACTICE_TWO = (() => {
  const Bhat = 84;
  const Chat = 62;
  const Ahat = 180 - Bhat - Chat; // 34°
  const A: XY = [0.9, 1.1];
  const B: XY = [8.2, 1.1];
  // base [AB]; angle at A = 34°, at B = 84° ⇒ apex C above [AB].
  // triangleFromBaseAngles(base1=A, base2=B, ...) returns the apex as `.A`.
  const apex = triangleFromBaseAngles(A, B, Ahat, Bhat).A;
  const C = apex;
  const tri: Triangle = { A, B, C };
  const J = incenter(tri);
  const ang = angleAt(tri);
  const sub = {
    JAB: { A: measureAngle(J, A, B), B: measureAngle(J, B, A), J: measureAngle(A, J, B) },
    JBC: { B: measureAngle(J, B, C), C: measureAngle(J, C, B), J: measureAngle(B, J, C) },
    JCA: { C: measureAngle(J, C, A), A: measureAngle(J, A, C), J: measureAngle(C, J, A) },
  };
  return {
    A,
    B,
    C: apex,
    J,
    spanBJ: { from: B, to: J },
    spanCJ: { from: apex, to: J },
    angles: ang,
    Bhat,
    Chat,
    Ahat: ang.A,
    sub,
    atJ: { AJB: sub.JAB.J, BJC: sub.JBC.J, CJA: sub.JCA.J },
    printed: { ABC: 84, ACB: 62 },
  };
})();

/* -------------------------------------------------------------------------- */
/*  8. مختبر المنصّف — the interactive lab scene                               */
/* -------------------------------------------------------------------------- */

export interface BisectorLabScene extends BisectorScene {
  circle: { center: XY; radius: number };
  sideDistances: { BC: number; CA: number; AB: number };
}

export function buildBisectorLabScene(t: Triangle): BisectorLabScene {
  const scene = buildBisectorScene(t);
  return {
    ...scene,
    circle: { center: scene.I, radius: scene.radius },
    sideDistances: {
      BC: distanceToLine(scene.I, t.B, t.C),
      CA: distanceToLine(scene.I, t.C, t.A),
      AB: distanceToLine(scene.I, t.A, t.B),
    },
  };
}

export { angleAt, distXY, measureAngle, midPoint, unitVec };
