import { describe, expect, it } from 'vitest';
import {
  Q1_CASE_ONE_POINTS,
  Q1_CASE_THREE_POINTS,
  Q1_CASE_TWO_POINTS,
  Q1_POINTS,
  Q1_THALES_POINTS,
  Q10_CASE_ONE_POINTS,
  Q10_CASE_TWO_POINTS,
  Q14_POINTS,
  Q15_POINTS,
  Q16_POINTS,
  Q17_POINTS,
  Q2_CIRCLES,
  Q2_QUADRILATERAL_POINTS,
  Q2_TRIANGLE_POINTS,
  Q3_POINTS,
  Q4_POINTS,
  Q5_POINTS,
  Q6_POINTS,
  Q9_POINTS,
  type FigurePoint,
} from './lesson-12-batch1-geometry';

/**
 * ============================================================================
 *  «تمارين الوحدة الثانية» — BATCH 1 (Q1–Q17) · THE PRINTED GEOMETRY
 * ============================================================================
 */

const EPSILON = 0.01;

function distance(a: FigurePoint, b: FigurePoint): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function midpoint(a: FigurePoint, b: FigurePoint): FigurePoint {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

function liesOn(point: FigurePoint, a: FigurePoint, b: FigurePoint, tolerance = 0.25): boolean {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const length = Math.hypot(dx, dy);
  if (length === 0) return false;
  const t = ((point.x - a.x) * dx + (point.y - a.y) * dy) / (length * length);
  if (t < -EPSILON || t > 1 + EPSILON) return false;
  return distance(point, { x: a.x + t * dx, y: a.y + t * dy }) <= tolerance;
}

function collinear(a: FigurePoint, b: FigurePoint, c: FigurePoint, tolerance = 0.01): boolean {
  const cross = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
  const scale = Math.hypot(b.x - a.x, b.y - a.y) * Math.hypot(c.x - a.x, c.y - a.y);
  return Math.abs(cross) / (scale || 1) <= tolerance;
}

function parallel(
  a: FigurePoint,
  b: FigurePoint,
  c: FigurePoint,
  d: FigurePoint,
  tolerance = 0.005,
): boolean {
  const u = { x: b.x - a.x, y: b.y - a.y };
  const v = { x: d.x - c.x, y: d.y - c.y };
  const cross = u.x * v.y - u.y * v.x;
  return Math.abs(cross) / (Math.hypot(u.x, u.y) * Math.hypot(v.x, v.y)) <= tolerance;
}

describe('Question 1 — the quadrilateral, the three candidates, and the Thales triangle', () => {
  it('puts I at the midpoint of [AC] and J at the midpoint of [AD]', () => {
    const { A, C, D, I, J } = Q1_POINTS;
    expect(distance(I, midpoint(A, C))).toBeLessThan(0.01);
    expect(distance(J, midpoint(A, D))).toBeLessThan(0.01);
  });

  it('puts K on [CD] and B, J, K on one straight line, as the page draws them', () => {
    const { B, C, D, J, K } = Q1_POINTS;
    expect(liesOn(K, C, D)).toBe(true);
    expect(collinear(B, J, K)).toBe(true);
    expect(liesOn(J, B, K)).toBe(true);
  });

  it('draws [IJ] parallel to [CD]', () => {
    const { C, D, I, J } = Q1_POINTS;
    expect(parallel(I, J, C, D)).toBe(true);
  });

  it('puts I at the midpoint of [BC] and J on [AC] in all three candidate figures of item ③', () => {
    expect(distance(Q1_CASE_THREE_POINTS.I, midpoint(Q1_CASE_THREE_POINTS.B, Q1_CASE_THREE_POINTS.C))).toBeLessThan(0.01);
    expect(distance(Q1_CASE_TWO_POINTS.I, midpoint(Q1_CASE_TWO_POINTS.B, Q1_CASE_TWO_POINTS.C))).toBeLessThan(0.01);
    expect(distance(Q1_CASE_ONE_POINTS.I, midpoint(Q1_CASE_ONE_POINTS.B, Q1_CASE_ONE_POINTS.C))).toBeLessThan(0.01);
    expect(liesOn(Q1_CASE_THREE_POINTS.J, Q1_CASE_THREE_POINTS.A, Q1_CASE_THREE_POINTS.C)).toBe(true);
    expect(liesOn(Q1_CASE_TWO_POINTS.J, Q1_CASE_TWO_POINTS.A, Q1_CASE_TWO_POINTS.C)).toBe(true);
    expect(liesOn(Q1_CASE_ONE_POINTS.J, Q1_CASE_ONE_POINTS.A, Q1_CASE_ONE_POINTS.C)).toBe(true);
  });

  it('draws figure ① of item ③ with [AB] and [IJ] perpendicular to [BC]', () => {
    const { A, B, C, I, J } = Q1_CASE_ONE_POINTS;
    expect(A.x).toBeCloseTo(B.x, 6);
    expect(parallel(I, J, B, C)).toBe(false);
    expect(Math.abs(J.x - I.x)).toBeLessThan(0.01);
  });

  it('puts M on [AN], P on [BN], and (MP) parallel to (AB) in ratio 1:3 for items ④–⑤', () => {
    const { N, A, B, M, P } = Q1_THALES_POINTS;
    expect(liesOn(M, N, A)).toBe(true);
    expect(liesOn(P, N, B)).toBe(true);
    expect(parallel(M, P, A, B)).toBe(true);
    expect(distance(N, M) / distance(N, A)).toBeCloseTo(1 / 3, 2);
    expect(distance(N, P) / distance(N, B)).toBeCloseTo(1 / 3, 2);
  });
});

describe('Question 2 — the circles, the triangle and the measured figure', () => {
  it('puts A, O and B on one line, and A, O′ and B′ on one line', () => {
    const { A, B, BPrime, O, OPrime } = Q2_CIRCLES;
    expect(collinear(A, O, B)).toBe(true);
    expect(collinear(A, OPrime, BPrime)).toBe(true);
  });

  it('keeps every printed point on the circle the page prints', () => {
    const { A, B, BPrime, O, OPrime, radius, radiusPrime } = Q2_CIRCLES;
    expect(distance(A, O)).toBeCloseTo(radius, 1);
    expect(distance(A, OPrime)).toBeCloseTo(radiusPrime, 1);
    expect(distance(B, O)).toBeCloseTo(radius, 1);
    expect(distance(BPrime, OPrime)).toBeCloseTo(radiusPrime, 1);
  });

  it('puts J and K at the midpoints of [AB] and [AC] and draws [JK] parallel to [BC]', () => {
    const { A, B, C, J, K } = Q2_TRIANGLE_POINTS;
    expect(distance(J, midpoint(A, B))).toBeLessThan(0.01);
    expect(distance(K, midpoint(A, C))).toBeLessThan(0.01);
    expect(parallel(J, K, B, C)).toBe(true);
  });

  it('puts A, B and C on the three rays [MD], [ME] and [MF]', () => {
    const { M, A, B, C, D, E, F } = Q2_QUADRILATERAL_POINTS;
    expect(liesOn(A, M, D)).toBe(true);
    expect(liesOn(B, M, E)).toBe(true);
    expect(liesOn(C, M, F)).toBe(true);
  });
});

describe('Question 3 — the rectangle', () => {
  it('puts I at the midpoint of [AD], K at the midpoint of [AJ], and [IK] parallel to [DJ]', () => {
    const { A, B, D, I, J, K } = Q3_POINTS;
    expect(distance(I, midpoint(A, D))).toBeLessThan(0.01);
    expect(liesOn(K, A, B)).toBe(true);
    expect(liesOn(J, A, B)).toBe(true);
    expect(distance(K, midpoint(A, J))).toBeLessThan(0.01);
    expect(parallel(I, K, D, J)).toBe(true);
  });

  it('keeps the printed order A, K, J, B along [AB]', () => {
    const { A, B, J, K } = Q3_POINTS;
    expect(K.x).toBeGreaterThan(A.x);
    expect(J.x).toBeGreaterThan(K.x);
    expect(B.x).toBeGreaterThan(J.x);
  });
});

describe('Question 4 — the triangle with the two midpoints', () => {
  it('puts I and J at the midpoints of [AB] and [AC] and draws [IJ] parallel to [BC]', () => {
    const { A, B, C, I, J } = Q4_POINTS;
    expect(distance(I, midpoint(A, B))).toBeLessThan(0.01);
    expect(distance(J, midpoint(A, C))).toBeLessThan(0.01);
    expect(parallel(I, J, B, C)).toBe(true);
  });
});

describe('Question 5 — the triangle with its three midpoints', () => {
  it('puts I, J and K at the midpoints of [AB], [BC] and [AC]', () => {
    const { A, B, C, I, J, K } = Q5_POINTS;
    expect(distance(I, midpoint(A, B))).toBeLessThan(0.01);
    expect(distance(J, midpoint(B, C))).toBeLessThan(0.01);
    expect(distance(K, midpoint(A, C))).toBeLessThan(0.01);
  });
});

describe('Question 6 — the parallelogram and its reflection', () => {
  it('puts O at the centre and C at the midpoint of [DE]', () => {
    const { A, B, C, D, E, O } = Q6_POINTS;
    expect(distance(O, midpoint(A, C))).toBeLessThan(0.01);
    expect(distance(O, midpoint(D, B))).toBeLessThan(0.01);
    expect(distance(C, midpoint(D, E))).toBeLessThan(0.01);
    expect(parallel(O, C, B, E)).toBe(true);
  });
});

describe('Question 9 — the triangle with the three midpoints', () => {
  it('puts E, F and J at the midpoints of [AB], [AC] and [AD], all collinear', () => {
    const { A, B, C, D, E, F, J } = Q9_POINTS;
    expect(liesOn(C, B, D)).toBe(true);
    expect(distance(E, midpoint(A, B))).toBeLessThan(0.01);
    expect(distance(F, midpoint(A, C))).toBeLessThan(0.01);
    expect(distance(J, midpoint(A, D))).toBeLessThan(0.01);
    expect(collinear(E, F, J)).toBe(true);
  });
});

describe('Question 10 — the two printed figures', () => {
  it('puts I on [AC], J at the midpoint of [BC] and the green line through both', () => {
    const { A, B, C, I, J, greenBottom, greenTop } = Q10_CASE_ONE_POINTS;
    expect(liesOn(I, A, C)).toBe(true);
    expect(liesOn(J, B, C)).toBe(true);
    expect(distance(J, midpoint(B, C))).toBeLessThan(0.01);
    expect(collinear(greenTop, greenBottom, I)).toBe(true);
    expect(collinear(greenTop, greenBottom, J)).toBe(true);
  });

  it('draws the green line of figure ① perpendicular to [BC]', () => {
    const { B, C, greenBottom, greenTop } = Q10_CASE_ONE_POINTS;
    expect(Math.abs(greenTop.x - greenBottom.x)).toBeLessThan(0.01);
    expect(parallel(B, C, greenTop, greenBottom)).toBe(false);
  });

  it('marks the same angle at B and at J in figure ②', () => {
    const { A, B, C, I, J, greenBottom, greenTop } = Q10_CASE_TWO_POINTS;
    expect(liesOn(I, A, C)).toBe(true);
    expect(liesOn(J, B, C)).toBe(true);
    expect(distance(J, midpoint(B, C))).toBeLessThan(0.01);
    expect(collinear(greenTop, greenBottom, I)).toBe(true);
    expect(collinear(greenTop, greenBottom, J)).toBe(true);
    const angleAtB = Math.atan2(A.y - B.y, A.x - B.x);
    const angleAtJ = Math.atan2(I.y - J.y, I.x - J.x);
    expect(angleAtB).toBeCloseTo(angleAtJ, 2);
  });
});

describe('Question 14 — the triangle with the two parallel lines', () => {
  it('puts D at the midpoint of [BC] and M at the midpoint of [AD]', () => {
    const { A, B, C, D, M } = Q14_POINTS;
    expect(distance(D, midpoint(B, C))).toBeLessThan(0.01);
    expect(distance(M, midpoint(A, D))).toBeLessThan(0.01);
  });

  it('puts F on [AB] with F, M and C on one line, and E on [AB]', () => {
    const { A, B, C, E, F, M } = Q14_POINTS;
    expect(liesOn(F, A, B)).toBe(true);
    expect(collinear(F, M, C)).toBe(true);
    expect(liesOn(E, A, B)).toBe(true);
  });

  it('draws (ED) parallel to (CF)', () => {
    const { C, E, D, F } = Q14_POINTS;
    expect(parallel(E, D, F, C)).toBe(true);
  });
});

describe('Questions 15, 16 and 17 — the parallel segments', () => {
  it('puts V on [AC] and T on [AB] with (TV) parallel to (CB)', () => {
    const { A, B, C, T, V } = Q15_POINTS;
    expect(liesOn(V, A, C)).toBe(true);
    expect(liesOn(T, A, B)).toBe(true);
    expect(parallel(T, V, C, B)).toBe(true);
  });

  it('puts D on [AB] and E on [AC] with (DE) parallel to (BC)', () => {
    const { A, B, C, D, E } = Q16_POINTS;
    expect(liesOn(D, A, B)).toBe(true);
    expect(liesOn(E, A, C)).toBe(true);
    expect(parallel(D, E, B, C)).toBe(true);
  });

  it('puts Q on [LN] and P on [LM] with (QP) parallel to (MN)', () => {
    const { L, M, N, P, Q } = Q17_POINTS;
    expect(liesOn(Q, L, N)).toBe(true);
    expect(liesOn(P, L, M)).toBe(true);
    expect(parallel(Q, P, M, N)).toBe(true);
  });
});
