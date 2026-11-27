import { describe, expect, it } from 'vitest';
import {
  L15_CHECK,
  L15_DEFINITION,
  L15_EXAMPLE,
  L15_EXAMPLE_PARALLELOGRAM,
  L15_PLUMB,
  L15_PRACTICE_CASE_ONE,
  L15_PRACTICE_CASE_TWO,
  L15_PROPERTIES,
  L15_PROOF,
  L15_TEST_ABC,
  L15_TEST_EFJ_TRIANGLE,
  buildMedianLabScene,
  buildMedianProofScene,
  buildMedianScene,
  centroid,
  measureAngle,
  medianFoot,
  reflect,
  type Triangle,
} from './lesson-15-geometry';
import { cross2D, distXY, midPoint } from './lesson-10-geometry';

type P = readonly [number, number];
function distanceToLine(p: P, from: P, to: P): number {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const len = Math.hypot(dx, dy) || 1;
  return Math.abs((p[0] - from[0]) * dy - (p[1] - from[1]) * dx) / len;
}

describe('Lesson 15 — median basics', () => {
  it('the median foot is the midpoint of the opposite side', () => {
    const t: Triangle = { A: [2, 5], B: [0, 0], C: [6, 1] };
    expect(distXY(medianFoot(t.B, t.C), midPoint(t.B, t.C))).toBeLessThan(1e-12);
  });

  it('the centroid is the average of the vertices and lies on all three medians', () => {
    for (const t of [L15_TEST_ABC, L15_TEST_EFJ_TRIANGLE, L15_PROPERTIES]) {
      const G = centroid(t);
      expect(G[0]).toBeCloseTo((t.A[0] + t.B[0] + t.C[0]) / 3, 9);
      const scene = buildMedianScene(t);
      expect(scene.concurrent).toBe(true);
      const verts = [t.A, t.B, t.C];
      const feet = [scene.feet.A, scene.feet.B, scene.feet.C];
      scene.spans.forEach((s, i) => {
        expect(distanceToLine(G, s.from, s.to)).toBeLessThan(1e-7);
        expect(distanceToLine(verts[i]!, s.from, s.to)).toBeLessThan(1e-7);
        expect(distanceToLine(feet[i]!, s.from, s.to)).toBeLessThan(1e-7);
      });
    }
  });

  it('each median is divided 2:1 from the vertex (AG = (2/3)AA′)', () => {
    for (const t of [L15_TEST_ABC, L15_TEST_EFJ_TRIANGLE, L15_PROPERTIES]) {
      const scene = buildMedianScene(t);
      expect(scene.twoThirds).toBe(true);
      expect(scene.ratios.A).toBeCloseTo(2 / 3, 9);
      expect(scene.ratios.B).toBeCloseTo(2 / 3, 9);
      expect(scene.ratios.C).toBeCloseTo(2 / 3, 9);
      // equivalently AG = 2·GA'
      expect(distXY(t.A, scene.G)).toBeCloseTo(2 * distXY(scene.G, scene.feet.A), 8);
    }
  });
});

describe('Lesson 15 — the page-59 proof', () => {
  const s = L15_PROOF;
  it('I and J are the midpoints of [AC] and [AB]', () => {
    expect(distXY(s.I, midPoint(s.A, s.C))).toBeLessThan(1e-9);
    expect(distXY(s.J, midPoint(s.A, s.B))).toBeLessThan(1e-9);
  });
  it('D is the reflection of A in G, so G is the midpoint of [AD]', () => {
    expect(distXY(reflect(s.A, s.G), s.D)).toBeLessThan(1e-9);
    expect(distXY(s.G, midPoint(s.A, s.D))).toBeLessThan(1e-9);
  });
  it('JG ∥ BD with BD = 2JG, and IG ∥ CD with CD = 2IG', () => {
    expect(s.midsegments).toEqual({
      JG_BD: true,
      IG_CD: true,
      BD_2JG: true,
      CD_2IG: true,
    });
  });
  it('BGCD is a parallelogram', () => {
    expect(s.parallelogram).toBe(true);
  });
  it('K = AD ∩ BC is the midpoint of [BC] and of [GD]', () => {
    expect(s.kMidBC).toBe(true);
    expect(s.kMidGD).toBe(true);
    expect(Math.abs(cross2D(s.B, s.C, s.B, s.K))).toBeLessThan(1e-8);
  });
  it('AG = 2GK, BG = 2GI, CG = 2GJ', () => {
    expect(s.doubleRelations).toEqual({ AG_2GK: true, BG_2GI: true, CG_2GJ: true });
  });
  it('holds for another scalene triangle', () => {
    const o = buildMedianProofScene({ A: [4, 6], B: [1, 1], C: [7, 2] });
    expect(o.parallelogram).toBe(true);
    expect(o.kMidBC).toBe(true);
    expect(o.doubleRelations).toEqual({ AG_2GK: true, BG_2GI: true, CG_2GJ: true });
  });
});

describe('Lesson 15 — definition figure (pages 59–60)', () => {
  it('draws the median from A through the midpoint of [BC]', () => {
    const d = L15_DEFINITION;
    expect(distXY(d.m, midPoint(d.B, d.C))).toBeLessThan(1e-9);
    expect(distanceToLine(d.A, d.span.from, d.span.to)).toBeLessThan(1e-9);
    expect(distanceToLine(d.m, d.span.from, d.span.to)).toBeLessThan(1e-9);
  });
});

describe('Lesson 15 — page-60 example (AG = 2.4, GM = 1.2)', () => {
  const s = L15_EXAMPLE;
  it('M is the midpoint of [BC] and AG = 2·GM = 2.4, GM = 1.2', () => {
    expect(distXY(s.M, midPoint(s.B, s.C))).toBeLessThan(1e-9);
    expect(s.AG).toBeCloseTo(2.4, 6);
    expect(s.GM).toBeCloseTo(1.2, 6);
    expect(s.AG).toBeCloseTo(2 * s.GM, 6);
  });
  it('G is the centroid of ABC', () => {
    expect(distXY(s.G, centroid({ A: s.A, B: s.B, C: s.C }))).toBeLessThan(1e-8);
  });
});

describe('Lesson 15 — page-61 parallelogram example', () => {
  const s = L15_EXAMPLE_PARALLELOGRAM;
  it('ABCD is a parallelogram with center O', () => {
    expect(distXY(midPoint(s.A, s.C), s.O)).toBeLessThan(1e-9);
    expect(distXY(midPoint(s.B, s.D), s.O)).toBeLessThan(1e-9);
  });
  it('G = CM ∩ BD is the centroid of triangle ABC', () => {
    expect(s.isCentroid).toBe(true);
    expect(distanceToLine(s.G, s.C, s.M)).toBeLessThan(1e-7);
    expect(distanceToLine(s.G, s.B, s.D)).toBeLessThan(1e-7);
  });
});

describe('Lesson 15 — check (page 61): AB = 7, A = 70°, AC = 8', () => {
  const s = L15_CHECK;
  it('honours the printed magnitudes', () => {
    expect(measureAngle(s.B, s.A, s.C)).toBeCloseTo(70, 6);
    expect(distXY(s.A, s.B) / s.scale).toBeCloseTo(7, 6);
    expect(distXY(s.A, s.C) / s.scale).toBeCloseTo(8, 6);
  });
  it('the three medians are concurrent at the centroid with 2/3 ratios', () => {
    expect(s.concurrent).toBe(true);
    expect(s.twoThirds).toBe(true);
  });
});

describe('Lesson 15 — practice ① case ① (AG = 3.4, GM = 1.7)', () => {
  const s = L15_PRACTICE_CASE_ONE;
  it('M is the midpoint of [BC], AG = 2·GM, and G is the centroid', () => {
    expect(distXY(s.M, midPoint(s.B, s.C))).toBeLessThan(1e-9);
    expect(s.AG).toBeCloseTo(3.4, 6);
    expect(s.GM).toBeCloseTo(1.7, 6);
    expect(s.isCentroid).toBe(true);
  });
});

describe('Lesson 15 — practice ① case ② (parallelogram AMCI)', () => {
  const s = L15_PRACTICE_CASE_TWO;
  it('I is the midpoint of [AB] and J the center of AMCI', () => {
    expect(distXY(s.I, midPoint(s.A, s.B))).toBeLessThan(1e-9);
    expect(s.jMidAC).toBe(true);
    expect(s.jMidMI).toBe(true);
  });
  it('AMCI is a parallelogram (AM ∥ IC, MC ∥ AI)', () => {
    expect(Math.abs(cross2D(s.A, s.M, s.I, s.C))).toBeLessThan(1e-8);
    expect(Math.abs(cross2D(s.M, s.C, s.A, s.I))).toBeLessThan(1e-8);
  });
  it('G = BJ ∩ CI is the centroid of triangle ABC', () => {
    expect(s.isCentroid).toBe(true);
    expect(distanceToLine(s.G, s.B, s.J)).toBeLessThan(1e-7);
    expect(distanceToLine(s.G, s.C, s.I)).toBeLessThan(1e-7);
  });
});

describe('Lesson 15 — plumb-line experiment (page 59)', () => {
  it('the vertical plumb line through the suspension vertex A passes through G', () => {
    expect(L15_PLUMB.verticalThroughG).toBe(true);
    expect(Math.abs(L15_PLUMB.plumb.from[0] - L15_PLUMB.G[0])).toBeLessThan(1e-9);
    // the median from A is vertical (A above the midpoint of [BC])
    expect(Math.abs(L15_PLUMB.A[0] - L15_PLUMB.midBC[0])).toBeLessThan(1e-9);
  });
});

describe('Lesson 15 — the median lab recomputes for any triangle', () => {
  it.each([
    { A: [3, 6], B: [1, 1], C: [7, 1.5] },
    { A: [2, 2], B: [0, 5], C: [8, 5] },
    { A: [5, 5], B: [1, 1], C: [6, 2] },
  ] as Triangle[])('case %#', (t) => {
    const scene = buildMedianLabScene(t);
    expect(scene.concurrent).toBe(true);
    expect(scene.twoThirds).toBe(true);
    expect(distXY(scene.G, centroid(t))).toBeLessThan(1e-12);
    expect(scene.vertexParts.AG).toBeCloseTo((2 / 3) * scene.medians.AA, 8);
  });
});
