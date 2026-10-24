import { describe, expect, it } from 'vitest';
import {
  activityTriangles,
  angleAt,
  areCollinear,
  areParallel,
  distance,
  isMidpointOf,
  isParallelogram,
  isRightAngle,
  midlinePoints,
  midlineReport,
  page32Example,
  page32Knowledge,
  page33Check,
  page33TrainRectangle,
  page33TrainSemicircle,
  page33TrainSymmetric,
  rhombusPerimeterCm,
  rhombusSide,
  samePoint,
  testMidpointTriangle,
  varignonFigure,
} from './lesson-08-geometry';

/**
 * ============================================================================
 *  LESSON 8 — arithmetic verification of every reconstructed figure
 * ============================================================================
 *
 *  The figures of this lesson are redrawn natively. A redraw is only faithful
 *  when every relation the printed page states is an EXACT consequence of the
 *  coordinates. These tests re-measure the coordinates and re-derive both
 *  parallelograms of the proof, the parallel pairs of page 33, the ½ ratio and
 *  the 12 cm perimeter, so a wrong vertex fails the build instead of silently
 *  producing a misleading drawing.
 * ============================================================================
 */

const close = (value: number, expected: number, tolerance = 1e-9) =>
  expect(Math.abs(value - expected)).toBeLessThanOrEqual(tolerance);

describe('page 31 — the three activity triangles are acute, right and obtuse at A', () => {
  it('prints exactly the three cases the activity asks the student to draw', () => {
    expect(activityTriangles.map((triangle) => triangle.id)).toEqual([
      'acute',
      'right',
      'obtuse',
    ]);
    expect(activityTriangles.map((triangle) => triangle.label)).toEqual(['①', '②', '③']);
  });

  it('measures the angle at A in each case', () => {
    const acute = activityTriangles.find((triangle) => triangle.id === 'acute')!;
    const right = activityTriangles.find((triangle) => triangle.id === 'right')!;
    const obtuse = activityTriangles.find((triangle) => triangle.id === 'obtuse')!;

    expect(angleAt(acute.B, acute.A, acute.C)).toBeLessThan(90);
    expect(angleAt(right.B, right.A, right.C)).toBeCloseTo(90, 9);
    expect(isRightAngle(right.B, right.A, right.C)).toBe(true);
    expect(angleAt(obtuse.B, obtuse.A, obtuse.C)).toBeGreaterThan(90);
  });

  it('keeps B and C on the same baseline in the three shapes', () => {
    for (const triangle of activityTriangles) {
      close(triangle.B[1], 0);
      close(triangle.C[1], 0);
      expect(triangle.C[0]).toBeGreaterThan(triangle.B[0]);
    }
  });
});

describe('page 31 — M, N and K are built, not eyeballed', () => {
  for (const triangle of activityTriangles) {
    it(`places M and N at the midpoints and K as the symmetric of M about N (${triangle.id})`, () => {
      const { M, N, K } = midlinePoints(triangle);
      expect(isMidpointOf(M, triangle.A, triangle.B)).toBe(true);
      expect(isMidpointOf(N, triangle.A, triangle.C)).toBe(true);
      // K is the symmetric of M about N ⇔ N is the midpoint of [MK].
      expect(isMidpointOf(N, M, K)).toBe(true);
      expect(samePoint(M, triangle.B)).toBe(false);
    });

    it(`yields MN = BC / 2 and (MN) ∥ (BC) in the ${triangle.id} case`, () => {
      const { M, N } = midlinePoints(triangle);
      const report = midlineReport(triangle);
      expect(distance(M, N)).toBeCloseTo(report.BC / 2, 9);
      expect(report.ratio).toBeCloseTo(0.5, 12);
      expect(areParallel(M, N, triangle.B, triangle.C)).toBe(true);
      expect(report.angle).toBeCloseTo(0, 9);
      // The page-31 print extends [MN] beyond N to K, so M, N and K are collinear.
      expect(areCollinear(M, N, midlinePoints(triangle).K)).toBe(true);
      expect(report.MK).toBeCloseTo(report.BC, 9);
    });

    it(`makes AMCK and MBCK parallelograms in the ${triangle.id} case`, () => {
      const { M, K } = midlinePoints(triangle);
      // AMCK: diagonals [AC] and [MK] bisect at N.
      expect(isParallelogram(triangle.A, M, triangle.C, K)).toBe(true);
      // MBCK: diagonals [MC] and [BK] share their midpoint.
      expect(isParallelogram(M, triangle.B, triangle.C, K)).toBe(true);
      // The pair of opposite sides the proof uses: (MB) ∥ (CK) and MB = CK.
      expect(areParallel(M, triangle.B, triangle.C, K)).toBe(true);
      expect(distance(M, triangle.B)).toBeCloseTo(distance(triangle.C, K), 9);
      // …and the pair that yields the midline: (MK) ∥ (BC), MK = BC.
      expect(areParallel(M, K, triangle.B, triangle.C)).toBe(true);
      expect(distance(M, K)).toBeCloseTo(distance(triangle.B, triangle.C), 9);
    });
  }
});

describe('page 32 — the worked example («مثال»)', () => {
  it('places I and J at the printed midpoints', () => {
    const { triangle, I, J } = page32Example;
    expect(isMidpointOf(I, triangle.A, triangle.B)).toBe(true);
    expect(isMidpointOf(J, triangle.A, triangle.C)).toBe(true);
  });

  it('gives the printed result: (IJ) ∥ (BC) and IJ = BC / 2', () => {
    const { triangle, I, J } = page32Example;
    expect(areParallel(I, J, triangle.B, triangle.C)).toBe(true);
    expect(distance(I, J)).toBeCloseTo(distance(triangle.B, triangle.C) / 2, 9);
  });
});

describe('page 32 & 33 — «كيف نثبت توازي مستقيمين؟»', () => {
  it('makes B the midpoint of [CI] and O the midpoint of [AC]', () => {
    const { A, B, C, I, O } = page32Knowledge;
    expect(isMidpointOf(B, C, I)).toBe(true);
    expect(isMidpointOf(O, A, C)).toBe(true);
  });

  it('proves (OB) ∥ (AI) in triangle ACI with OB = AI / 2', () => {
    const { A, B, C, I, O } = page32Knowledge;
    expect(areParallel(O, B, A, I)).toBe(true);
    expect(distance(O, B)).toBeCloseTo(distance(A, I) / 2, 9);
    // O, B and I must not be collinear, otherwise the triangle would be flat.
    expect(areCollinear(A, C, I)).toBe(false);
  });
});

describe('page 33 — «تحقّق من فهمك»', () => {
  const { A, B, C, D, J, K, L, M, N } = page33Check;

  it('places all five points at the midpoints the printed figure marks', () => {
    expect(isMidpointOf(J, A, B)).toBe(true);
    expect(isMidpointOf(K, A, C)).toBe(true);
    expect(isMidpointOf(L, B, C)).toBe(true);
    expect(isMidpointOf(M, A, D)).toBe(true);
    expect(isMidpointOf(N, C, D)).toBe(true);
  });

  it('answers question 1: (JK) ∥ (BC), (KN) ∥ (AD), (LN) ∥ (BD), (JM) ∥ (BD)', () => {
    expect(areParallel(J, K, B, C)).toBe(true);
    expect(areParallel(K, N, A, D)).toBe(true);
    expect(areParallel(L, N, B, D)).toBe(true);
    expect(areParallel(J, M, B, D)).toBe(true);
  });

  it('answers question 2: (LN) and (JM) are parallel to each other, not the same line', () => {
    expect(areParallel(L, N, J, M)).toBe(true);
    // They share a direction, so they must not be collinear to be distinct.
    expect(areCollinear(L, N, J)).toBe(false);
  });

  it('keeps the shared side [AC] common to the two printed triangles', () => {
    expect(areCollinear(A, C, K)).toBe(true);
    expect(distance(K, A)).toBeCloseTo(distance(K, C), 9);
    expect(areCollinear(A, B, C)).toBe(false);
    expect(areCollinear(A, D, C)).toBe(false);
  });
});

describe('page 33 — «تدرّب ①» the semicircle', () => {
  const { O, A, B, E, M, radius } = page33TrainSemicircle;

  it('has O as the midpoint of the printed diameter [AB] and M as the midpoint of [AE]', () => {
    expect(isMidpointOf(O, A, B)).toBe(true);
    expect(isMidpointOf(M, A, E)).toBe(true);
    close(distance(O, A), radius);
    close(distance(O, B), radius);
  });

  it('proves (OM) ∥ (BE) with OM = BE / 2, without any measurement of the drawing', () => {
    expect(areParallel(O, M, B, E)).toBe(true);
    expect(distance(O, M)).toBeCloseTo(distance(B, E) / 2, 9);
  });

  it('places E on the circle, so triangle ABE is right-angled at E (as printed)', () => {
    close(distance(O, E), radius);
    expect(isRightAngle(A, E, B)).toBe(true);
  });
});

describe('page 33 — «تدرّب ②» the symmetric points', () => {
  const { A, B, C, BPrime, CPrime } = page33TrainSymmetric;

  it('makes B and C the midpoints of [AB′] and [AC′]', () => {
    expect(isMidpointOf(B, A, BPrime)).toBe(true);
    expect(isMidpointOf(C, A, CPrime)).toBe(true);
  });

  it('proves (CB) ∥ (C′B′) with CB = C′B′ / 2 in triangle AB′C′', () => {
    expect(areParallel(C, B, CPrime, BPrime)).toBe(true);
    expect(distance(C, B)).toBeCloseTo(distance(CPrime, BPrime) / 2, 9);
    // B, C and A must not be collinear for the triangle to exist.
    expect(areCollinear(A, B, C)).toBe(false);
  });
});

describe('page 33 — «تدرّب ③» the rectangle in a circle', () => {
  const rectangle = page33TrainRectangle;

  it('is a true rectangle whose vertices sit on the circle of radius 3', () => {
    for (const corner of [rectangle.A, rectangle.B, rectangle.C, rectangle.D]) {
      close(distance(rectangle.O, corner), 3);
    }
    expect(isRightAngle(rectangle.B, rectangle.A, rectangle.D)).toBe(true);
    expect(isRightAngle(rectangle.C, rectangle.B, rectangle.A)).toBe(true);
    expect(isParallelogram(rectangle.A, rectangle.B, rectangle.C, rectangle.D)).toBe(true);
  });

  it('fixes the diagonal at the printed diameter 6 cm', () => {
    close(distance(rectangle.A, rectangle.C), 6, 1e-9);
    close(distance(rectangle.B, rectangle.D), 6, 1e-9);
  });

  it('makes EFGH a rhombus of side 3 cm — half the diagonal — and not a square', () => {
    const { E, F, G, H } = rectangle;
    // Opposite side-midpoints are symmetric about the centre of the rectangle.
    close(distance(rectangle.O, E), distance(rectangle.O, G), 1e-9);
    close(distance(rectangle.O, F), distance(rectangle.O, H), 1e-9);
    expect(distance(E, F)).toBeCloseTo(3, 9);
    expect(distance(F, G)).toBeCloseTo(3, 9);
    expect(distance(G, H)).toBeCloseTo(3, 9);
    expect(distance(H, E)).toBeCloseTo(3, 9);
    expect(rhombusSide()).toBeCloseTo(3, 9);
    expect(areParallel(E, F, rectangle.A, rectangle.C)).toBe(true);
    expect(areParallel(F, G, rectangle.B, rectangle.D)).toBe(true);
    // Not a square: consecutive sides are not perpendicular.
    expect(isRightAngle(E, F, G)).toBe(false);
  });

  it('answers «احسب محيطه» with 12 cm', () => {
    close(rhombusPerimeterCm(), 12, 1e-9);
  });
});

describe('authored applications', () => {
  it('gives Varignon’s parallelogram as two applications of the same theorem', () => {
    const { A, B, C, D, E, F, G, H } = varignonFigure;
    expect(isMidpointOf(E, A, B)).toBe(true);
    expect(isMidpointOf(F, B, C)).toBe(true);
    expect(isMidpointOf(G, C, D)).toBe(true);
    expect(isMidpointOf(H, D, A)).toBe(true);
    expect(areParallel(E, F, A, C)).toBe(true);
    expect(areParallel(G, H, A, C)).toBe(true);
    expect(areParallel(F, G, B, D)).toBe(true);
    expect(areParallel(H, E, B, D)).toBe(true);
    expect(isParallelogram(E, F, G, H)).toBe(true);
    // ABCD itself is not a parallelogram, so the result is genuinely new.
    expect(isParallelogram(A, B, C, D)).toBe(false);
  });

  it('builds the Test Area triangle with M and N at the midpoints of [AB] and [AC]', () => {
    const { A, B, C, M, N } = testMidpointTriangle;
    expect(isMidpointOf(M, A, B)).toBe(true);
    expect(isMidpointOf(N, A, C)).toBe(true);
    expect(areParallel(M, N, B, C)).toBe(true);
    expect(distance(M, N)).toBeCloseTo(distance(B, C) / 2, 9);
  });
});
