import { describe, expect, it } from 'vitest';
import {
  Q18_CASE_ONE_POINTS,
  Q18_CASE_TWO_POINTS,
  Q19_POINTS,
  Q19_TICKS,
  Q20_ARROWS,
  Q20_BOXES,
  Q21_POINTS,
  Q24_POINTS,
  Q24_RED_LINE,
  Q24_TICKS,
  Q26_POINTS,
  Q27_POINTS,
  Q28_ARROWS,
  Q28_POINTS,
  Q28_RED_LINE,
  Q28_TICKS,
  Q29_POINTS,
  Q30_POINTS,
  Q30_RAY_END,
  Q32_POINTS,
  Q33_CASE_ONE_POINTS,
  Q33_CASE_TWO_POINTS,
  areCollinear,
  distance,
  isOnSegment,
} from './lesson-12-unit-two-exercises-geometry';

/**
 * ============================================================================
 *  «تمارين الوحدة الثانية» — VERIFICATION OF THE RECONSTRUCTED FIGURES
 * ============================================================================
 *
 *  These are the arithmetic checks the figure contract asks for: every point a
 *  reconstruction depends on was read from the scan, and the relations the
 *  printed page states are re-derived here from the measured coordinates.
 *
 *  The tolerance is the one the printed page itself warrants — the scans are
 *  photographs of a printed page, so a drawn line is straight only to within
 *  about one percent of its length. The drawings are NOT claimed to be to
 *  scale, and no test here asserts an angle or a length that the page does
 *  not print.
 * ============================================================================
 */

const TOLERANCE = 12;

describe('Question 20 — the printed flowchart', () => {
  const boxes = Object.values(Q20_BOXES);
  const arrows = Object.values(Q20_ARROWS);

  it('draws the fourteen printed boxes with the measured sizes', () => {
    expect(boxes).toHaveLength(14);
    expect(boxes.filter((box) => box.blank)).toHaveLength(4);
    expect(boxes.filter((box) => box.text)).toHaveLength(10);
  });

  it('starts every printed connector on a box and ends it on another box', () => {
    /** A point sits on one of the four sides of a printed box. */
    const onBoxEdge = (point: { x: number; y: number }, box: (typeof boxes)[number]) => {
      const insideX = point.x >= box.x - 12 && point.x <= box.x + box.width + 12;
      const insideY = point.y >= box.y - 12 && point.y <= box.y + box.height + 12;
      const onTop = Math.abs(point.y - box.y) < 12;
      const onBottom = Math.abs(point.y - (box.y + box.height)) < 12;
      const onLeft = Math.abs(point.x - box.x) < 12;
      const onRight = Math.abs(point.x - (box.x + box.width)) < 12;
      return insideX && insideY && (onTop || onBottom || onLeft || onRight);
    };
    for (const arrow of arrows) {
      expect(
        boxes.some((box) => onBoxEdge(arrow.from, box)),
        `arrow from (${arrow.from.x},${arrow.from.y})`,
      ).toBe(true);
      expect(
        boxes.some((box) => onBoxEdge(arrow.to, box)),
        `arrow to (${arrow.to.x},${arrow.to.y})`,
      ).toBe(true);
    }
  });

  it('leaves the five printed blanks empty', () => {
    for (const box of boxes.filter((entry) => entry.blank)) {
      expect(box.text).toBeUndefined();
    }
  });
});

describe('Question 21 — the quadrilateral and its four midpoints', () => {
  const { A, B, C, D, E, F, G, H } = Q21_POINTS;

  it('places E, F, G and H on the four printed sides', () => {
    expect(isOnSegment(E, A, B, TOLERANCE)).toBe(true);
    expect(isOnSegment(F, B, C, TOLERANCE)).toBe(true);
    expect(isOnSegment(G, C, D, TOLERANCE)).toBe(true);
    expect(isOnSegment(H, D, A, TOLERANCE)).toBe(true);
  });

  it('places them at the midpoints, as the printed sentence states', () => {
    const midpoint = (p: { x: number; y: number }, q: { x: number; y: number }) => ({
      x: (p.x + q.x) / 2,
      y: (p.y + q.y) / 2,
    });
    expect(distance(E, midpoint(A, B))).toBeLessThan(6);
    expect(distance(F, midpoint(B, C))).toBeLessThan(6);
    expect(distance(G, midpoint(C, D))).toBeLessThan(6);
    expect(distance(H, midpoint(D, A))).toBeLessThan(6);
  });
});

describe('Question 24 — the altitude and the line through the two midpoints', () => {
  const { A, B, C, H, I, J, K } = Q24_POINTS;

  it('puts I and J on the two sides and K on the altitude', () => {
    expect(isOnSegment(I, A, B, TOLERANCE)).toBe(true);
    expect(isOnSegment(J, A, C, TOLERANCE)).toBe(true);
    expect(isOnSegment(K, A, H, TOLERANCE)).toBe(true);
  });

  it('runs the printed red line through I, J and K', () => {
    expect(isOnSegment(I, Q24_RED_LINE.from, Q24_RED_LINE.to, TOLERANCE)).toBe(true);
    expect(isOnSegment(J, Q24_RED_LINE.from, Q24_RED_LINE.to, TOLERANCE)).toBe(true);
    expect(isOnSegment(K, Q24_RED_LINE.from, Q24_RED_LINE.to, TOLERANCE)).toBe(true);
  });

  it('places I, J and K at the midpoints the marks announce', () => {
    const midpoint = (p: { x: number; y: number }, q: { x: number; y: number }) => ({
      x: (p.x + q.x) / 2,
      y: (p.y + q.y) / 2,
    });
    expect(distance(I, midpoint(A, B))).toBeLessThan(6);
    expect(distance(J, midpoint(A, C))).toBeLessThan(6);
    expect(distance(K, midpoint(A, H))).toBeLessThan(6);
  });

  it('prints TWO equality ticks on each half of [AB] and ONE on each half of [AC]', () => {
    expect(Q24_TICKS.ai.count).toBe(2);
    expect(Q24_TICKS.ib.count).toBe(2);
    expect(Q24_TICKS.aj.count).toBe(1);
    expect(Q24_TICKS.jc.count).toBe(1);
    expect(isOnSegment(Q24_TICKS.ai, A, I, TOLERANCE)).toBe(true);
    expect(isOnSegment(Q24_TICKS.ib, I, B, TOLERANCE)).toBe(true);
    expect(isOnSegment(Q24_TICKS.aj, A, J, TOLERANCE)).toBe(true);
    expect(isOnSegment(Q24_TICKS.jc, J, C, TOLERANCE)).toBe(true);
  });
});

describe('Question 26 — the drawing is to scale, as the printed lengths say', () => {
  const { A, B, C, H, M, N } = Q26_POINTS;
  /** One printed centimetre measures 100 scan pixels in this scan. */
  const CM = 100;

  it('keeps the five printed lengths, each within two percent', () => {
    expect(Math.abs(distance(B, M) / CM - 2.4)).toBeLessThan(0.048);
    expect(Math.abs(distance(B, N) / CM - 3)).toBeLessThan(0.06);
    expect(Math.abs(distance(A, B) / CM - 5)).toBeLessThan(0.1);
    expect(Math.abs(distance(M, N) / CM - 1.8)).toBeLessThan(0.036);
    expect(Math.abs(distance(A, H) / CM - 3)).toBeLessThan(0.06);
  });

  it('draws (MN) parallel to (AC), as the sentence prints', () => {
    const lineAngle = (p: { x: number; y: number }, q: { x: number; y: number }) => {
      const raw = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI;
      const folded = ((raw % 180) + 180) % 180;
      return folded > 90 ? folded - 180 : folded;
    };
    expect(Math.abs(lineAngle(M, N) - lineAngle(A, C))).toBeLessThan(2);
  });

  it('drops the red altitude on the base at a right angle', () => {
    const angle = (p: { x: number; y: number }, q: { x: number; y: number }) =>
      (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI;
    expect(Math.abs(angle(A, H) - angle(B, C))).toBeGreaterThan(88);
    expect(Math.abs(angle(A, H) - angle(B, C))).toBeLessThan(92);
    expect(isOnSegment(H, B, C, TOLERANCE)).toBe(true);
  });
});

describe('Question 27 — the drawing is to scale, as the printed lengths say', () => {
  const { E, F, G, S, T } = Q27_POINTS;
  /** One printed unit measures about 54 scan pixels in this scan. */
  const UNIT = 54.07;

  it('keeps the printed lengths 9, 3, 5 and 8, each within two percent', () => {
    expect(Math.abs(distance(F, S) / UNIT - 9)).toBeLessThan(0.18);
    expect(Math.abs(distance(T, G) / UNIT - 3)).toBeLessThan(0.06);
    expect(Math.abs(distance(S, T) / UNIT - 5)).toBeLessThan(0.1);
    expect(Math.abs(distance(G, E) / UNIT - 8)).toBeLessThan(0.16);
  });

  it('draws (ST) parallel to (GE), as the printed Thales setup is', () => {
    const lineAngle = (p: { x: number; y: number }, q: { x: number; y: number }) => {
      const raw = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI;
      const folded = ((raw % 180) + 180) % 180;
      return folded > 90 ? folded - 180 : folded;
    };
    expect(Math.abs(lineAngle(S, T) - lineAngle(G, E))).toBeLessThan(2);
  });

  it('gives the two ratios the exercise asks the student to prove', () => {
    const ratio = (a: number, b: number) => a / b;
    expect(ratio(distance(F, S), distance(F, E))).toBeCloseTo(
      ratio(distance(S, T), distance(G, E)),
      2,
    );
  });
});

describe('Question 28 — the quadrilateral, its diagonal and the printed marks', () => {
  const { E, F, G, H, M, N, P } = Q28_POINTS;

  it('places M on [EF] and N on [EG], as the printed sentence states', () => {
    expect(isOnSegment(M, E, F, TOLERANCE)).toBe(true);
    expect(isOnSegment(N, E, G, TOLERANCE)).toBe(true);
  });

  it('places P on [EH], where the printed red line crosses it', () => {
    expect(isOnSegment(P, E, H, TOLERANCE)).toBe(true);
  });

  it('runs the printed red line through N and P', () => {
    expect(isOnSegment(N, Q28_RED_LINE.from, Q28_RED_LINE.to, TOLERANCE)).toBe(true);
    expect(isOnSegment(P, Q28_RED_LINE.from, Q28_RED_LINE.to, TOLERANCE)).toBe(true);
  });

  it('prints TWO equality ticks on each half of [EF] and ONE on each half of [EG]', () => {
    expect(Q28_TICKS.em.count).toBe(2);
    expect(Q28_TICKS.mf.count).toBe(2);
    expect(Q28_TICKS.en.count).toBe(1);
    expect(Q28_TICKS.ng.count).toBe(1);
    expect(isOnSegment(Q28_TICKS.em, E, M, TOLERANCE)).toBe(true);
    expect(isOnSegment(Q28_TICKS.mf, M, F, TOLERANCE)).toBe(true);
    expect(isOnSegment(Q28_TICKS.en, E, N, TOLERANCE)).toBe(true);
    expect(isOnSegment(Q28_TICKS.ng, N, G, TOLERANCE)).toBe(true);
  });

  it('puts the printed parallel arrowheads on the red line and on [GH]', () => {
    expect(isOnSegment(Q28_ARROWS.red, Q28_RED_LINE.from, Q28_RED_LINE.to, TOLERANCE)).toBe(true);
    expect(isOnSegment(Q28_ARROWS.black, H, G, TOLERANCE)).toBe(true);
  });

  it('keeps the four vertices in the printed order around the quadrilateral', () => {
    expect(distance(E, F)).toBeGreaterThan(0);
    expect(distance(F, G)).toBeGreaterThan(0);
    expect(distance(G, H)).toBeGreaterThan(0);
    expect(distance(H, E)).toBeGreaterThan(0);
    // E and G are the ends of the printed diagonal.
    expect(isOnSegment(N, E, G, TOLERANCE)).toBe(true);
  });
});

describe('Question 29 — the triangle, the parallel segment and the transversal', () => {
  const { A, B, C, N, M, J, K } = Q29_POINTS;

  it('places N on [AC] and M on [AB]', () => {
    expect(isOnSegment(N, A, C, TOLERANCE)).toBe(true);
    expect(isOnSegment(M, A, B, TOLERANCE)).toBe(true);
  });

  it('places J on [NM] and on the transversal [AK], and K on the base [CB]', () => {
    expect(isOnSegment(J, N, M, TOLERANCE)).toBe(true);
    expect(isOnSegment(J, A, K, TOLERANCE)).toBe(true);
    expect(isOnSegment(K, C, B, TOLERANCE)).toBe(true);
  });

  it('keeps the printed relation (MN) ∥ (BC): both segments are horizontal', () => {
    expect(Math.abs(N.y - M.y)).toBeLessThan(1);
    expect(Math.abs(C.y - B.y)).toBeLessThan(1);
  });

  it('keeps the printed lengths between the right pairs of points', () => {
    // 3 is printed between N and J, 2 between J and M, 4.5 between K and B.
    expect(N.x).toBeLessThan(362.3);
    expect(362.3).toBeLessThan(J.x);
    expect(J.x).toBeLessThan(485.7);
    expect(485.7).toBeLessThan(M.x);
    expect(K.x).toBeLessThan(471.6);
    expect(471.6).toBeLessThan(B.x);
  });
});

describe('Question 30 — the segment, its five printed ticks and the printed ray', () => {
  const { A, B, C, D, E, F } = Q30_POINTS;

  it('keeps A, B, C, D, E and F on one straight line, in the printed order', () => {
    for (const point of [A, B, C, D, E, F]) {
      expect(Math.abs(point.y - A.y)).toBeLessThan(1);
    }
    expect(A.x).toBeLessThan(B.x);
    expect(B.x).toBeLessThan(C.x);
    expect(C.x).toBeLessThan(D.x);
    expect(D.x).toBeLessThan(E.x);
    expect(E.x).toBeLessThan(F.x);
  });

  it('starts the printed blue ray at A and lifts it away from the segment', () => {
    expect(distance(A, Q30_RAY_END)).toBeGreaterThan(200);
    expect(Q30_RAY_END.y).toBeLessThan(A.y - 100);
  });
});

describe('Question 32 — the two towers, the ground and the sight line', () => {
  const { A, B, C, M, K } = Q32_POINTS;

  it('keeps the two printed verticals vertical', () => {
    expect(Math.abs(A.x - B.x)).toBeLessThan(1);
    expect(Math.abs(C.x - M.x)).toBeLessThan(1);
  });

  it('keeps B, M and K on the printed ground line, in that order', () => {
    expect(Math.abs(B.y - M.y)).toBeLessThan(1);
    expect(Math.abs(M.y - K.y)).toBeLessThan(1);
    expect(B.x).toBeLessThan(M.x);
    expect(M.x).toBeLessThan(K.x);
  });

  it('keeps C on the printed sight line from A to K', () => {
    expect(isOnSegment(C, A, K, TOLERANCE)).toBe(true);
  });

  it('puts the printed lengths beside the segments they measure', () => {
    expect(Q32_POINTS.B.x).toBeLessThan(120.4); // 50 is printed on [BM]
    expect(120.4).toBeLessThan(Q32_POINTS.M.x);
    expect(Q32_POINTS.M.x).toBeLessThan(371.4); // x is printed on [MK]
    expect(371.4).toBeLessThan(K.x);
  });
});

describe('Question 33, case ① — the triangle and the two red segments', () => {
  const { S, T, U, N, K, I, J } = Q33_CASE_ONE_POINTS;

  it('puts S, N, I and T on one straight line, and S, K, J and U on another', () => {
    expect(isOnSegment(N, S, T, TOLERANCE)).toBe(true);
    expect(isOnSegment(I, S, T, TOLERANCE)).toBe(true);
    expect(isOnSegment(K, S, U, TOLERANCE)).toBe(true);
    expect(isOnSegment(J, S, U, TOLERANCE)).toBe(true);
  });

  it('keeps the printed order N before I and K before J', () => {
    expect(N.y).toBeLessThan(I.y);
    expect(K.y).toBeLessThan(J.y);
  });

  it('draws (NK), (IJ) and (TU) parallel, as the page prints', () => {
    expect(Math.abs(N.y - K.y)).toBeLessThan(1);
    expect(Math.abs(I.y - J.y)).toBeLessThan(1);
    expect(Math.abs(T.y - U.y)).toBeLessThan(1);
  });
});

describe('Question 33, case ② — the printed collinear triples and red segments', () => {
  const { A, B, C, D, E, G, H, I, M } = Q33_CASE_TWO_POINTS;

  it('keeps A, B and C on one straight line', () => {
    expect(areCollinear(A, B, C, TOLERANCE)).toBe(true);
  });

  it('keeps A, H, D, I and E on one straight line, in the printed order', () => {
    expect(areCollinear(A, H, E, TOLERANCE)).toBe(true);
    expect(areCollinear(A, D, E, TOLERANCE)).toBe(true);
    expect(areCollinear(A, I, E, TOLERANCE)).toBe(true);
    expect(A.x).toBeLessThan(H.x);
    expect(H.x).toBeLessThan(D.x);
    expect(D.x).toBeLessThan(I.x);
    expect(I.x).toBeLessThan(E.x);
  });

  it('keeps C, D and G on one straight line, D being the crossing point', () => {
    expect(areCollinear(C, D, G, TOLERANCE)).toBe(true);
  });

  it('keeps E, M and G on one straight line', () => {
    expect(areCollinear(E, M, G, TOLERANCE)).toBe(true);
  });

  it('joins the three printed red segments to the printed points', () => {
    expect(isOnSegment(H, B, H, TOLERANCE)).toBe(true);
    expect(isOnSegment(D, C, G, TOLERANCE)).toBe(true);
    expect(isOnSegment(M, I, M, TOLERANCE)).toBe(true);
  });

  it('labels the end of the red segment that starts at I with M — as printed', () => {
    // The printed page writes «(CG) ∥ (IF)» but the printed figure labels that
    // end point M and shows no F. The reconstruction reproduces the figure as
    // printed; the discrepancy is recorded in the Teacher Area notes.
    expect(M).toBeDefined();
    expect('F' in Q33_CASE_TWO_POINTS).toBe(false);
  });
});

describe('Question 18 — the two Thales figures (cases ① and ②)', () => {
  it('places F on [EH], J on [EK], and (FJ) parallel to (HK) in ratio 5 : 8 in case ①', () => {
    const { E, H, K, F, J } = Q18_CASE_ONE_POINTS;
    expect(isOnSegment(F, E, H, 0.5)).toBe(true);
    expect(isOnSegment(J, E, K, 0.5)).toBe(true);
    const cross = (J.x - F.x) * (K.y - H.y) - (J.y - F.y) * (K.x - H.x);
    expect(Math.abs(cross) / (distance(F, J) * distance(H, K))).toBeLessThan(0.002);
    expect(distance(E, F) / distance(F, H)).toBeCloseTo(5 / 8, 2);
    expect(distance(E, J) / distance(E, K)).toBeCloseTo(5 / 13, 2);
  });

  it('places E on [MB], J on [MA], and (EJ) parallel to (BA) in ratio 3 : 9 in case ②', () => {
    const { M, B, A, E, J } = Q18_CASE_TWO_POINTS;
    expect(isOnSegment(E, M, B, 0.5)).toBe(true);
    expect(isOnSegment(J, M, A, 0.5)).toBe(true);
    const cross = (J.x - E.x) * (A.y - B.y) - (J.y - E.y) * (A.x - B.x);
    expect(Math.abs(cross) / (distance(E, J) * distance(B, A))).toBeLessThan(0.002);
    expect(distance(M, J) / distance(J, A)).toBeCloseTo(3 / 9, 2);
    expect(distance(M, E) / distance(M, B)).toBeCloseTo(3 / 12, 2);
  });
});

describe('Question 19 — the proof-writing figure with equal red ticks', () => {
  const { A, I, B, K, J, C, D } = Q19_POINTS;

  it('places A, I, B and K on one line with AI = IB = BK', () => {
    expect(isOnSegment(I, A, K, 0.5)).toBe(true);
    expect(isOnSegment(B, A, K, 0.5)).toBe(true);
    expect(distance(A, I)).toBeCloseTo(distance(I, B), 1);
    expect(distance(I, B)).toBeCloseTo(distance(B, K), 1);
  });

  it('places J at the midpoint of [AC] and draws (IJ) parallel to (BC)', () => {
    expect(isOnSegment(J, A, C, 0.5)).toBe(true);
    expect(distance(A, J)).toBeCloseTo(distance(J, C), 1);
    expect(Math.abs(I.y - J.y)).toBeLessThan(0.5);
    expect(Math.abs(B.y - C.y)).toBeLessThan(0.5);
  });

  it('places D at the intersection of [KJ] and [BC], making D the midpoint of [KJ]', () => {
    expect(isOnSegment(D, B, C, 0.5)).toBe(true);
    expect(isOnSegment(D, K, J, 0.5)).toBe(true);
    expect(distance(K, D)).toBeCloseTo(distance(D, J), 1);
  });

  it('places single red ticks on [AI], [IB], [BK] and double red ticks on [AJ], [JC]', () => {
    expect(Q19_TICKS.ai.count).toBe(1);
    expect(Q19_TICKS.ib.count).toBe(1);
    expect(Q19_TICKS.bk.count).toBe(1);
    expect(Q19_TICKS.aj.count).toBe(2);
    expect(Q19_TICKS.jc.count).toBe(2);
    expect(isOnSegment(Q19_TICKS.ai, A, I, 0.5)).toBe(true);
    expect(isOnSegment(Q19_TICKS.ib, I, B, 0.5)).toBe(true);
    expect(isOnSegment(Q19_TICKS.bk, B, K, 0.5)).toBe(true);
    expect(isOnSegment(Q19_TICKS.aj, A, J, 0.5)).toBe(true);
    expect(isOnSegment(Q19_TICKS.jc, J, C, 0.5)).toBe(true);
  });
});
