import { describe, expect, it } from 'vitest';
import {
  angleAt,
  areCollinear,
  congruenceReport,
  distance,
  isParallelogram,
  isRightAngle,
  cross,
  degrees,
  direction,
  lineIntersection,
  midpoint,
  page17Cases,
  page17GivenRays,
  page17Printed,
  page18Example1,
  page18Example2,
  page18Example3,
  page19Check,
  page19Isosceles,
  page19Kite,
  page19Pairs,
  rad,
  samePoint,
  triangleFromSSS,
  type Triangle,
} from './lesson-04-geometry';
import { authoredDefinition, authoredIntroTranslation } from './lesson-04-geometry';

/**
 * ============================================================================
 *  LESSON 4 — arithmetic verification of every reconstructed figure
 * ============================================================================
 *
 *  The figures are only allowed out of `reference` because their coordinates
 *  are DERIVED from values printed on pages 17–19. These tests re-measure the
 *  derived coordinates and compare them with the printed numbers, so a wrong
 *  vertex, a flipped angle or a mis-copied length fails the build.
 *
 *  Nothing here checks "a drawing exists": every assertion is an exact
 *  geometric relation.
 * ============================================================================
 */

const close = (value: number, expected: number, tolerance = 1e-9) =>
  expect(Math.abs(value - expected)).toBeLessThanOrEqual(tolerance);

const triangle = (A: Triangle['A'], B: Triangle['B'], C: Triangle['C']): Triangle => ({
  A,
  B,
  C,
});

describe('page 17 — the three activity panels use the printed data', () => {
  it('panel ① is fixed by AB = 4, AC = 3 and BÂC = 35°', () => {
    const { A, B, C } = page17Cases.sas;
    close(distance(A, B), page17Printed.sas.AB);
    close(distance(A, C), page17Printed.sas.AC);
    close(angleAt(B, A, C), page17Printed.sas.angleA);
  });

  it('panel ② is fixed by AC = 3 and the adjacent angles 35° and 85°', () => {
    const { A, B, C } = page17Cases.asa;
    close(distance(A, C), page17Printed.asa.AC);
    close(angleAt(B, A, C), page17Printed.asa.angleA);
    close(angleAt(A, C, B), page17Printed.asa.angleC);
    // The third angle is a consequence: 180 − 35 − 85 = 60.
    close(angleAt(A, B, C), 60);
  });

  it('panel ② closes on the printed side of [AC], where its two rays point', () => {
    const { A, B, C } = page17Cases.asa;
    // The printed panel puts C above A and opens both given rays to the RIGHT
    // of [AC], so the vertex that closes them must be there too. The default
    // `side` of `triangleFromASA` mirrors the triangle; this pins the choice.
    expect(cross([C[0] - A[0], C[1] - A[1]], [B[0] - A[0], B[1] - A[1]])).toBeLessThan(0);

    // B is exactly where the printed 35° ray from A meets the 85° ray from C.
    const acAngle = degrees(Math.atan2(C[1] - A[1], C[0] - A[0]));
    const meet = lineIntersection(
      A,
      direction(acAngle - page17Printed.asa.angleA),
      C,
      direction(acAngle + 180 + page17Printed.asa.angleC),
    )!;
    close(meet[0], B[0]);
    close(meet[1], B[1]);

    // Law of sines on AC = 3 with 35° at A, 85° at C and 60° at B.
    close(distance(A, B), (page17Printed.asa.AC * Math.sin(rad(85))) / Math.sin(rad(60)));
    close(distance(B, C), (page17Printed.asa.AC * Math.sin(rad(35))) / Math.sin(rad(60)));
  });

  it('draws the two given rays of panel ② short of B, so they never cross', () => {
    const { A, B, C } = page17Cases.asa;
    const { fromA, fromC } = page17GivenRays;
    // Each ray stops on its side of the vertex: the printed givens must not
    // already contain the completed triangle, nor a line past its endpoint.
    expect(distance(A, fromA)).toBeLessThan(distance(A, B) - 0.2);
    expect(distance(C, fromC)).toBeLessThan(distance(C, B) - 0.2);
    // They point along the printed sides …
    close(angleAt(C, A, fromA), page17Printed.asa.angleA);
    close(angleAt(A, C, fromC), page17Printed.asa.angleC);
    // … and leave a visible gap instead of meeting in a stray crossing.
    expect(distance(fromA, fromC)).toBeGreaterThan(0.4);
  });

  it('panel ③ carries the three printed sides 4, 3 and 2', () => {
    const { A, B, C } = page17Cases.sss;
    close(distance(A, B), page17Printed.sss.AB);
    close(distance(B, C), page17Printed.sss.BC);
    close(distance(C, A), page17Printed.sss.CA);
    // The triangle is non-degenerate: 2 + 3 > 4.
    expect(distance(A, B) + distance(B, C)).toBeGreaterThan(distance(C, A));
  });

  it('refuses side lengths that cannot close a triangle', () => {
    expect(triangleFromSSS([0, 0], 2, 3, 10)).toBeNull();
    expect(triangleFromSSS([0, 0], 4, 3, 2)).not.toBeNull();
  });
});

describe('page 18 — the three worked examples', () => {
  it('example ①: AM = ME = 5, BM = MF = 7, and the angles at M are vertical', () => {
    const { A, B, E, F, M } = page18Example1;
    close(distance(A, M), 5);
    close(distance(M, E), 5);
    close(distance(B, M), 7);
    close(distance(M, F), 7);
    expect(samePoint(midpoint(A, E), M)).toBe(true);
    expect(samePoint(midpoint(B, F), M)).toBe(true);
    expect(areCollinear(A, M, E)).toBe(true);
    expect(areCollinear(B, M, F)).toBe(true);
    close(angleAt(A, M, B), angleAt(E, M, F));
    // The two triangles really are congruent with A↔E, B↔F, M↔M.
    const report = congruenceReport(triangle(A, B, M), triangle(E, F, M));
    expect(report.sss).toBe(true);
  });

  it('example ②: AECF is a parallelogram around the rectangle ABCD', () => {
    const { A, B, C, D, E, F } = page18Example2;
    expect(isParallelogram(A, E, C, F)).toBe(true);
    // Rectangle ABCD: four right angles, equal opposite sides.
    expect(isRightAngle(B, A, D)).toBe(true);
    expect(isRightAngle(A, B, C)).toBe(true);
    expect(isRightAngle(B, C, D)).toBe(true);
    expect(isRightAngle(A, D, C)).toBe(true);
    close(distance(A, B), distance(D, C));
    close(distance(A, D), distance(B, C));
    // B lies on [EA] and D lies on [FC], as printed.
    expect(areCollinear(E, A, B)).toBe(true);
    expect(areCollinear(F, C, D)).toBe(true);
    // FD = BE, and both right angles used by the proof are right.
    close(distance(F, D), distance(B, E));
    close(distance(B, E), 2.4);
    expect(isRightAngle(E, B, C)).toBe(true);
    expect(isRightAngle(A, D, F)).toBe(true);
    // F̂ = Ê: the opposite angles of the parallelogram AECF.
    close(angleAt(A, F, C), angleAt(A, E, C));
  });

  it('example ③: [AC] is the common side of ACB and ACD', () => {
    const { A, B, C, D } = page18Example3;
    expect(isParallelogram(A, B, C, D)).toBe(true);
    close(distance(A, B), distance(C, D));
    close(distance(B, C), distance(A, D));
    // Same segment [AC] in both triangles, so it trivially has the same length.
    close(distance(A, C), distance(C, A));
    const report = congruenceReport(triangle(A, C, B), triangle(C, A, D));
    expect(report.sss).toBe(true);
  });
});

describe('page 19 — check-your-understanding rectangle', () => {
  const { A, B, C, D } = page19Check;

  it('is a rectangle with the printed 30° at D and at B', () => {
    expect(isRightAngle(B, A, D)).toBe(true);
    expect(isRightAngle(B, C, D)).toBe(true);
    close(angleAt(A, D, B), 30);
    close(angleAt(C, B, D), 30);
    // Consequence used in the second proof: the other angle is 60°.
    close(angleAt(A, B, D), 60);
    close(angleAt(C, D, B), 60);
  });

  it('labels the sides with the lengths the derivation actually gives', () => {
    // Regression: the first derivation called the 6-unit side [AB] and the
    // 6·tan 30° side [AD]. The printed ticks say otherwise — [AB] and [DC]
    // carry one tick, [AD] and [BC] carry two — and so does the drawing.
    close(distance(A, B), 6 * Math.tan(Math.PI / 6));
    close(distance(A, D), 6);
    close(page19Check.AB, distance(A, B));
    close(page19Check.AD, distance(A, D));
    close(page19Check.BC, distance(B, C));
    close(page19Check.DC, distance(D, C));
    // The 30° is measured from the diagonal to the base at B, so tan 30° =
    // CD / BC = AB / AD.
    close(distance(A, B) / distance(A, D), Math.tan(Math.PI / 6));
  });

  it('has equal opposite sides and a common diagonal', () => {
    close(distance(A, B), distance(D, C));
    close(distance(A, D), distance(B, C));
    const report = congruenceReport(triangle(A, B, D), triangle(C, D, B));
    expect(report.sss).toBe(true);
    expect(report.sas).toBe(true);
    expect(report.asa).toBe(true);
  });
});

describe('page 19 — the paper kite', () => {
  const kite = page19Kite;

  it('matches the printed lengths AE = 12, CE = 6, BE = ED = 8', () => {
    close(distance(kite.A, kite.E), 12);
    close(distance(kite.E, kite.C), 6);
    close(distance(kite.B, kite.E), 8);
    close(distance(kite.E, kite.D), 8);
  });

  it('has perpendicular diagonals, and BC = CD = 10 exactly', () => {
    expect(isRightAngle(kite.A, kite.E, kite.B)).toBe(true);
    expect(isRightAngle(kite.C, kite.E, kite.B)).toBe(true);
    close(distance(kite.B, kite.C), 10);
    close(distance(kite.C, kite.D), 10);
    expect(samePoint(midpoint(kite.B, kite.D), kite.E)).toBe(true);
  });

  it('has AB = AD, whose printed 14.4 is the rounded √208', () => {
    close(distance(kite.A, kite.B), distance(kite.A, kite.D));
    close(distance(kite.A, kite.B) ** 2, 208, 1e-6);
    // The book prints one decimal: 14.4, while √208 = 14.4222…
    expect(Math.abs(distance(kite.A, kite.B) - kite.printed.AB)).toBeLessThanOrEqual(0.05);
  });

  it('yields exactly the three congruent pairs the solution claims', () => {
    const abe = congruenceReport(
      triangle(kite.A, kite.B, kite.E),
      triangle(kite.A, kite.D, kite.E),
    );
    expect(abe.sas).toBe(true);

    const bce = congruenceReport(
      triangle(kite.B, kite.C, kite.E),
      triangle(kite.D, kite.C, kite.E),
    );
    expect(bce.sas).toBe(true);

    const abc = congruenceReport(
      triangle(kite.A, kite.B, kite.C),
      triangle(kite.A, kite.D, kite.C),
    );
    expect(abc.sss).toBe(true);

    // ... and that ABE is NOT congruent to BCE (different hypotenuses).
    const wrong = congruenceReport(
      triangle(kite.A, kite.B, kite.E),
      triangle(kite.B, kite.C, kite.E),
    );
    expect(wrong.sss).toBe(false);
    expect(wrong.sas).toBe(false);
    expect(wrong.asa).toBe(false);
  });
});

describe('page 19 — the three printed pairs', () => {
  it('pair ① is the SSS pair 2, 3, 2.6', () => {
    const panel = page19Pairs.find((entry) => entry.id === 'pair-1')!;
    const report = congruenceReport(panel.first, panel.second);
    expect(report.sss).toBe(true);
    const sides = [
      distance(panel.first.A, panel.first.B),
      distance(panel.first.B, panel.first.C),
      distance(panel.first.C, panel.first.A),
    ].sort((a, b) => a - b);
    close(sides[0]!, 2);
    close(sides[1]!, 2.6);
    close(sides[2]!, 3);
  });

  it('pair ② is the SAS pair: sides 2 and 4 with an 80° included angle', () => {
    const panel = page19Pairs.find((entry) => entry.id === 'pair-2')!;
    close(distance(panel.first.A, panel.first.B), 2);
    close(distance(panel.first.A, panel.first.C), 4);
    close(angleAt(panel.first.B, panel.first.A, panel.first.C), 80);
    expect(congruenceReport(panel.first, panel.second).sas).toBe(true);
  });

  it('pair ③ is the ASA pair: angles 44° and 82° on the side of length 4', () => {
    const panel = page19Pairs.find((entry) => entry.id === 'pair-3')!;
    // The printed side of 4 is [AC]; the 44° sits at A and the 82° at C, so
    // the two printed angles really are adjacent to the printed side.
    close(distance(panel.first.A, panel.first.C), 4);
    close(angleAt(panel.first.B, panel.first.A, panel.first.C), 44);
    close(angleAt(panel.first.A, panel.first.C, panel.first.B), 82);
    close(angleAt(panel.first.A, panel.first.B, panel.first.C), 54);
    expect(congruenceReport(panel.first, panel.second).asa).toBe(true);
  });

  it('keeps the two copies of a panel apart, so no label lands on the other triangle', () => {
    const bounds = (t: {
      A: readonly [number, number];
      B: readonly [number, number];
      C: readonly [number, number];
    }) => {
      const xs = [t.A[0], t.B[0], t.C[0]];
      const ys = [t.A[1], t.B[1], t.C[1]];
      return {
        minX: Math.min(...xs),
        maxX: Math.max(...xs),
        minY: Math.min(...ys),
        maxY: Math.max(...ys),
      };
    };
    for (const panel of page19Pairs) {
      const first = bounds(panel.first);
      const second = bounds(panel.second);
      const overlapX = Math.min(first.maxX, second.maxX) - Math.max(first.minX, second.minX);
      const overlapY = Math.min(first.maxY, second.maxY) - Math.max(first.minY, second.minY);
      // Regression: a hand-tuned shift used to put pair ③'s copies on top of
      // each other, which collided their measurement labels.
      expect(overlapX <= 0 || overlapY <= 0, panel.id).toBe(true);
    }
  });

  it('draws the second triangle of every pair as a rigid copy', () => {
    for (const panel of page19Pairs) {
      const first = [
        distance(panel.first.A, panel.first.B),
        distance(panel.first.B, panel.first.C),
        distance(panel.first.C, panel.first.A),
      ];
      const second = [
        distance(panel.second.A, panel.second.B),
        distance(panel.second.B, panel.second.C),
        distance(panel.second.C, panel.second.A),
      ];
      for (let index = 0; index < 3; index += 1) {
        close(first[index]!, second[index]!);
      }
      expect(congruenceReport(panel.first, panel.second).sss).toBe(true);
    }
  });
});

describe('page 19 — the isosceles-triangle configuration', () => {
  const { A, B, C, M, E, F } = page19Isosceles;

  it('has AB = AC and BM = MC', () => {
    close(distance(A, B), distance(A, C));
    close(distance(B, M), distance(M, C));
    close(angleAt(C, B, A), angleAt(B, C, A));
  });

  it('drops the perpendiculars ME on AB and MF on AC with ME = MF', () => {
    expect(isRightAngle(A, E, M)).toBe(true);
    expect(isRightAngle(A, F, M)).toBe(true);
    expect(areCollinear(A, B, E)).toBe(true);
    expect(areCollinear(A, C, F)).toBe(true);
    close(distance(M, E), distance(M, F));
  });

  it('makes MEB ≅ MFC and MEA ≅ MFA hold, as the exercise asserts', () => {
    const first = congruenceReport(triangle(M, E, B), triangle(M, F, C));
    expect(first.asa).toBe(true);

    const second = congruenceReport(triangle(M, E, A), triangle(M, F, A));
    expect(second.asa).toBe(true);
  });

  it('makes (AM) a height and the bisector of A', () => {
    expect(isRightAngle(B, M, A)).toBe(true);
    close(angleAt(B, A, M), angleAt(M, A, C));
  });
});

describe('authored teaching figures preserve the translation relation exactly', () => {
  it('draws the image of the definition figure as a true translate', () => {
    for (const source of [authoredIntroTranslation, authoredDefinition]) {
      const { triangle: origin, image, vector } = source;
      close(image.A[0] - origin.A[0], vector[0]);
      close(image.A[1] - origin.A[1], vector[1]);
      const report = congruenceReport(origin, image);
      expect(report.sss).toBe(true);
      expect(report.sidesEqual).toEqual([1, 1, 1]);
      expect(report.anglesEqual).toEqual([1, 1, 1]);
    }
  });
});
