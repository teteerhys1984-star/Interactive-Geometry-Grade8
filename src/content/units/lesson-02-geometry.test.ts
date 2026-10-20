import { describe, expect, it } from 'vitest';
import {
  add,
  circleIntersections,
  compass,
  compassGiven,
  distance,
  hookSheet,
  imageOf,
  isParallelogram,
  midpoint,
  onLine,
  page8,
  page8Images,
  page8Vector,
  page10,
  page10Answers,
  page10Vector,
  practiceParallelogram,
  practiceTriangle,
  samePoint,
  signedArea,
  triangleChain,
  type XY,
} from './lesson-02-geometry';

/**
 * ============================================================================
 *  LESSON 2 — INDEPENDENT GEOMETRIC VERIFICATION
 * ============================================================================
 *  These assertions do not touch React or the content tree. They re-derive the
 *  printed relations from the recorded coordinates and would fail if any point
 *  were transcribed wrongly.
 * ============================================================================
 */

describe('page 8 — the squared-paper activity', () => {
  it('draws the sheet as 9 columns by 5 rows with the line x + y = 5', () => {
    expect(page8.cols).toBe(9);
    expect(page8.rows).toBe(5);
    expect(page8.line.from).toEqual([0, 5]);
    expect(page8.line.to).toEqual([5, 0]);
  });

  it('puts every printed point on a sheet node, with three cells right of M', () => {
    // The scan has ten vertical lines, i.e. nine columns. M sits on column
    // line 6 and the sheet keeps cells 6, 7 and 8 to its right: an eight-column
    // sheet would have cut two of them off.
    expect(page8.cols - page8.points.M[0]).toBe(3);
    for (const point of Object.values(page8.points)) {
      expect(Number.isInteger(point[0]) && Number.isInteger(point[1])).toBe(true);
      expect(point[0]).toBeGreaterThanOrEqual(0);
      expect(point[0]).toBeLessThanOrEqual(page8.cols);
      expect(point[1]).toBeGreaterThanOrEqual(0);
      expect(point[1]).toBeLessThanOrEqual(page8.rows);
    }
    // The two right-hand columns carry no printed point.
    const columns = new Set(Object.values(page8.points).map((point) => point[0]));
    expect(columns.has(7)).toBe(false);
    expect(columns.has(8)).toBe(false);
  });

  it('keeps B, P and A exactly on the printed line', () => {
    for (const name of ['B', 'P', 'A'] as const) {
      const point = page8.points[name];
      expect(point[0] + point[1]).toBe(5);
      expect(onLine(page8.line.from, page8.line.to, point)).toBe(true);
    }
  });

  it('places N in B’s column and on M’s row', () => {
    expect(page8.points.N[0]).toBe(page8.points.B[0]);
    expect(page8.points.N[1]).toBe(page8.points.M[1]);
  });

  it('computes the three images from A → B, all on lattice nodes', () => {
    expect(page8Vector).toEqual([-3, 3]);
    expect(page8Images.M).toEqual([3, 5]);
    expect(page8Images.N).toEqual([-2, 5]);
    expect(page8Images.P).toEqual([-1, 6]);
    for (const image of Object.values(page8Images)) {
      expect(Number.isInteger(image[0]) && Number.isInteger(image[1])).toBe(true);
    }
  });

  it('makes ABM′M a parallelogram with diagonals bisected at one point', () => {
    const { A, B, M } = page8.points;
    const image = page8Images.M;
    expect(isParallelogram(A, B, image, M)).toBe(true);
    expect(midpoint(A, image)).toEqual(midpoint(B, M));
    expect(signedArea([A, B, image, M])).not.toBe(0);
  });

  it('keeps P′ on the line (a collinear point stays collinear)', () => {
    expect(onLine(page8.line.from, page8.line.to, page8Images.P)).toBe(true);
    // …while N′ leaves the line, which is why it gives a real parallelogram.
    expect(onLine(page8.line.from, page8.line.to, page8Images.N)).toBe(false);
  });
});

describe('page 10 — the copied grid', () => {
  it('is 8 × 6 with M on the top-right corner node', () => {
    expect(page10.cols).toBe(8);
    expect(page10.rows).toBe(6);
    expect(page10.points.M).toEqual([8, 6]);
  });

  it('reads the printed points off whole nodes', () => {
    for (const point of Object.values(page10.points)) {
      expect(Number.isInteger(point[0]) && Number.isInteger(point[1])).toBe(true);
    }
  });

  it('computes every requested image from A → B', () => {
    expect(page10Vector).toEqual([-2, -3]);
    expect(page10Answers.MPrime).toEqual([6, 3]);
    expect(page10Answers.MDoublePrime).toEqual([4, 0]);
    expect(page10Answers.NPrime).toEqual([2, 2]);
    expect(page10Answers.NPrime[0]).toBe(page10.points.N[0] - 2);
  });

  it('returns N″ exactly to the printed point N', () => {
    // Translating by A → B and then by B → A is the identity, so the answer is
    // a point that already exists on the sheet — an independent check that the
    // coordinates were read correctly.
    expect(page10Answers.NDoublePrime).toEqual([4, 5]);
    expect(samePoint(page10Answers.NDoublePrime, page10.points.N)).toBe(true);
  });

  it('places P on a node inside the sheet and Q two rows below it', () => {
    expect(page10Answers.P).toEqual([6, 4]);
    expect(page10Answers.P[0]).toBeLessThanOrEqual(page10.cols);
    expect(page10Answers.P[1]).toBeLessThanOrEqual(page10.rows);
    expect(page10Answers.Q).toEqual([4, -2]);
    expect(page10Answers.Q[1]).toBeLessThan(0);
  });

  it('keeps the printed adjacent gaps B → P′ → Q′', () => {
    expect(page10.points.PPrime[0] - page10.points.B[0]).toBe(1);
    expect(page10.points.QPrime[0] - page10.points.PPrime[0]).toBe(2);
    expect(page10.points.PPrime[1]).toBe(page10.points.B[1]);
    expect(page10.points.QPrime[1]).toBe(page10.points.B[1]);
  });
});

describe('exercise ① — three successive translations', () => {
  it('returns G onto A for the lesson triangle', () => {
    expect(samePoint(practiceTriangle.g, practiceTriangle.a)).toBe(true);
  });

  it('returns G onto A for any triangle (algebraic identity)', () => {
    const triangles: [XY, XY, XY][] = [
      [
        [0, 0],
        [6, 0],
        [1.5, 4.5],
      ],
      [
        [-3, 2],
        [4, -1],
        [2, 7],
      ],
      [
        [1, 1],
        [1.5, 6.2],
        [8.4, 3.3],
      ],
    ];
    for (const [a, b, c] of triangles) {
      const chain = triangleChain(a, b, c);
      expect(samePoint(chain.g, chain.a, 1e-9)).toBe(true);
      // Each step really is the translation named in the exercise.
      expect(samePoint(chain.e, imageOf(a, b, c))).toBe(true);
      expect(samePoint(chain.f, imageOf(chain.e, c, a))).toBe(true);
    }
  });

  it('produces a triangle congruent to the original', () => {
    const { a, b, c, e, f, g } = practiceTriangle;
    expect(distance(e, f)).toBeCloseTo(distance(c, a), 9);
    expect(distance(f, g)).toBeCloseTo(distance(a, b), 9);
    expect(distance(g, e)).toBeCloseTo(distance(b, c), 9);
    // …and non-degenerate.
    expect(signedArea([e, f, g])).not.toBe(0);
  });
});

describe('exercise ② — parallelogram and centre', () => {
  const { A, B, C, D, M, imageOfD, translationTargetForA, imageOfC } = practiceParallelogram;

  it('builds a genuine parallelogram with its centre', () => {
    expect(isParallelogram(A, B, C, D)).toBe(true);
    expect(midpoint(A, C)).toEqual(midpoint(B, D));
    expect(M).toEqual(midpoint(A, C));
  });

  it('sends D to C under A → B', () => {
    expect(samePoint(imageOfD, C)).toBe(true);
  });

  it('answers “A is the image of D under C → …” with B', () => {
    expect(samePoint(translationTargetForA, B)).toBe(true);
    expect(samePoint(imageOf(D, C, translationTargetForA), A)).toBe(true);
  });

  it('sends C to the centre M under M → A', () => {
    expect(samePoint(imageOfC, M)).toBe(true);
    // Derived, not assumed: M is the midpoint of [AC], so the move halves it.
    expect(samePoint(midpoint(A, C), M)).toBe(true);
  });
});

describe('page 9 — the compass construction', () => {
  it('uses exactly the two printed radii', () => {
    expect(compass.radiusFromImageCircle).toBeCloseTo(distance(compassGiven.H, compassGiven.G), 12);
    expect(compass.radiusFromGivenCircle).toBeCloseTo(distance(compassGiven.G, compassGiven.M), 12);
  });

  it('puts M′ on both circles', () => {
    expect(distance(compass.M, compass.image)).toBeCloseTo(compass.radiusFromImageCircle, 12);
    expect(distance(compass.H, compass.image)).toBeCloseTo(compass.radiusFromGivenCircle, 12);
  });

  it('chooses one of the two real intersections', () => {
    expect(compass.intersections).not.toBeNull();
    const [first, second] = compass.intersections!;
    for (const candidate of [first, second]) {
      expect(distance(compass.M, candidate)).toBeCloseTo(compass.radiusFromImageCircle, 9);
      expect(distance(compass.H, candidate)).toBeCloseTo(compass.radiusFromGivenCircle, 9);
    }
  });

  it('rejects the other intersection because it does not complete HGMM′', () => {
    expect(compass.rejected).not.toBeNull();
    const rejected = compass.rejected!;
    expect(samePoint(rejected, compass.image, 1e-9)).toBe(false);
    // HGMM′ would need M′ = M + (H − G); the rejected point is the reflection
    // of the chosen one across the centre line, so it fails.
    const completion = add(compassGiven.M, [
      compassGiven.H[0] - compassGiven.G[0],
      compassGiven.H[1] - compassGiven.G[1],
    ]);
    expect(samePoint(rejected, completion, 1e-9)).toBe(false);
    expect(samePoint(compass.image, completion, 1e-9)).toBe(true);
  });

  it('gives HGMM′ a real interior and bisecting diagonals', () => {
    const { H, G, M, image } = compass;
    expect(isParallelogram(H, G, M, image)).toBe(true);
    expect(Math.abs(signedArea([H, G, M, image]))).toBeGreaterThan(0.5);
    expect(midpoint(H, M)).toEqual(compass.diagonalMidpoint);
    expect(midpoint(G, image)).toEqual(compass.diagonalMidpoint);
  });

  it('equals the algebraic image M + (H − G)', () => {
    expect(samePoint(compass.image, imageOf(compassGiven.M, compassGiven.G, compassGiven.H))).toBe(
      true,
    );
    // The printed definition of the construction is “M′ is the image of M
    // under G → H”, so this is the same claim, computed twice.
    expect(compass.image).toEqual([compassGiven.M[0] - compassGiven.G[0], compassGiven.M[1]]);
  });
});

describe('circle geometry used by the compass lab', () => {
  it('finds both intersections symmetrically about the centre line', () => {
    const result = circleIntersections([0, 0], 5, [6, 0], 5);
    expect(result).not.toBeNull();
    const [low, high] = result!;
    expect(low[0]).toBeCloseTo(3, 12);
    expect(high[0]).toBeCloseTo(3, 12);
    expect(low[1]).toBeCloseTo(-4, 12);
    expect(high[1]).toBeCloseTo(4, 12);
  });

  it('returns null for circles that never meet', () => {
    expect(circleIntersections([0, 0], 1, [10, 0], 1)).toBeNull();
    expect(circleIntersections([0, 0], 1, [0, 0], 1)).toBeNull();
  });
});

describe('the opening hook', () => {
  it('keeps the answer inside the sheet and on a node', () => {
    expect(hookSheet.answer).toEqual([5, 1]);
    expect(hookSheet.answer[0]).toBeLessThanOrEqual(hookSheet.cols);
    expect(hookSheet.answer[1]).toBeGreaterThanOrEqual(0);
    expect(
      samePoint(
        hookSheet.answer,
        imageOf(hookSheet.points.M, hookSheet.points.A, hookSheet.points.B),
      ),
    ).toBe(true);
  });
});
