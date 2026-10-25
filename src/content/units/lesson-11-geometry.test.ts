import { describe, expect, it } from 'vitest';
import { computeLabelLayout } from '@/components/diagram/renderers/lesson4/FigureSvg';
import {
  collectObstacles,
  inflate,
  rectContainsRect,
  rectDistance,
  rectFromCentre,
  segmentHitsRect,
} from '@/lib/figureLayout';
import { figureTypography } from '@/lib/figureTypography';
import { readFigureSpec, type XY } from '@/lib/geometryFigure';
import { ALL_L11_FIGURE_SPECS } from './lesson-11-figures';
import { cross2D, distXY, midPoint, sectionPoint } from './lesson-10-geometry';
import {
  buildActivityProofChain,
  buildActivityScene,
  buildThreeRatiosScene,
  L11_ACTIVITY_RATIO,
  L11_ACTIVITY_TRIANGLE,
  L11_CHECK_ONE,
  L11_CHECK_TWO,
  L11_EXAMPLE_SCENE,
  L11_EXTENSION_BEYOND_APEX,
  L11_EXTENSION_BEYOND_BASE,
  L11_LAB_TRIANGLES,
  L11_PRACTICE_ONE_CASE_1,
  L11_PRACTICE_ONE_CASE_2,
  L11_PRACTICE_ONE_CASE_3,
  L11_PRACTICE_TWO_ONE,
  L11_PRACTICE_TWO_THREE,
  L11_PRACTICE_TWO_TWO,
  L11_THEOREM_SCENE,
  triangleWithSides,
} from './lesson-11-geometry';

/**
 * ============================================================================
 *  LESSON 11 — Independent Algebraic, Geometric & Label-Layout Verification
 * ============================================================================
 *
 *  Verifies from raw coordinates that:
 *    1. Page 39's activity construction really does produce the midpoints the
 *       printed questions ask the student to prove (J, P, N) and the equal
 *       thirds CS = SR = RB, with (MN) ∥ (BC) and BSNM a parallelogram.
 *    2. The worked example of pages 40–41 carries the PRINTED lengths as exact
 *       Euclidean distances: AB = 3, AC = 6, BC = 5, AE = 2, AF = 4, EF = 10/3.
 *    3. The three «تدرّب ①» cases are internally consistent at the printed
 *       values, so the drawn figure never contradicts the question it asks.
 *    4. The lab reports the midpoint facts for k = 2/3 and drops exactly the
 *       ones that are specific to that ratio for any other k.
 *    5. Every published FigureSpec validates and places its labels inside the
 *       viewBox without touching ink or another label.
 * ============================================================================
 */

const EPS = 1e-9;
const closeTo = (actual: number, expected: number, tolerance = 1e-9) =>
  Math.abs(actual - expected) < tolerance;
const samePoint = (a: XY, b: XY) => distXY(a, b) < 1e-9;
const isMidpointOf = (m: XY, a: XY, b: XY) => samePoint(m, midPoint(a, b));
const areParallel = (a: XY, b: XY, c: XY, d: XY) => Math.abs(cross2D(a, b, c, d)) < EPS;
const areCollinear = (a: XY, b: XY, c: XY) => Math.abs(cross2D(a, b, a, c)) < EPS;
const liesOnSegment = (p: XY, a: XY, b: XY) =>
  areCollinear(a, b, p) && distXY(a, p) + distXY(p, b) - distXY(a, b) < 1e-7;

describe('triangleWithSides', () => {
  it('reproduces the three requested side lengths exactly', () => {
    const t = triangleWithSides(5, 3, 6);
    expect(closeTo(distXY(t.B, t.C), 5)).toBe(true);
    expect(closeTo(distXY(t.A, t.B), 3)).toBe(true);
    expect(closeTo(distXY(t.A, t.C), 6)).toBe(true);
  });
});

describe('page 39 — the printed activity construction at AM/AB = 2/3', () => {
  const s = buildActivityScene();

  it('places I at the midpoint of [AM] and M at the printed ratio 2/3', () => {
    expect(isMidpointOf(s.I, s.A, s.M)).toBe(true);
    expect(closeTo(distXY(s.A, s.M) / distXY(s.A, s.B), L11_ACTIVITY_RATIO)).toBe(true);
    expect(liesOnSegment(s.I, s.A, s.M)).toBe(true);
    expect(liesOnSegment(s.M, s.A, s.B)).toBe(true);
  });

  it('places N on [AC] at the same ratio, and (MN) is parallel to (BC)', () => {
    expect(liesOnSegment(s.N, s.A, s.C)).toBe(true);
    expect(closeTo(distXY(s.A, s.N) / distXY(s.A, s.C), L11_ACTIVITY_RATIO)).toBe(true);
    expect(areParallel(s.M, s.N, s.B, s.C)).toBe(true);
    expect(closeTo(distXY(s.M, s.N) / distXY(s.B, s.C), L11_ACTIVITY_RATIO)).toBe(true);
  });

  it('derives J as the parallel to (MN) through I, and J is the midpoint of [AN]', () => {
    expect(areCollinear(s.I, s.J, s.M)).toBe(false);
    expect(areParallel(s.I, s.J, s.M, s.N)).toBe(true);
    expect(liesOnSegment(s.J, s.A, s.N)).toBe(true);
    expect(isMidpointOf(s.J, s.A, s.N)).toBe(true);
  });

  it('derives P = (BJ) ∩ (MN), and P is the midpoint of [BJ]', () => {
    expect(liesOnSegment(s.P, s.B, s.J)).toBe(true);
    expect(liesOnSegment(s.P, s.M, s.N)).toBe(true);
    expect(isMidpointOf(s.P, s.B, s.J)).toBe(true);
  });

  it('makes N the midpoint of [CJ] (the printed "استنتج")', () => {
    expect(areCollinear(s.C, s.N, s.J)).toBe(true);
    expect(isMidpointOf(s.N, s.C, s.J)).toBe(true);
  });

  it('derives R and S on [BC] with (JR) ∥ (NS) ∥ (AB) and CS = SR = RB', () => {
    expect(liesOnSegment(s.R, s.B, s.C)).toBe(true);
    expect(liesOnSegment(s.S, s.B, s.C)).toBe(true);
    expect(areParallel(s.J, s.R, s.A, s.B)).toBe(true);
    expect(areParallel(s.N, s.S, s.A, s.B)).toBe(true);
    const cs = distXY(s.C, s.S);
    const sr = distXY(s.S, s.R);
    const rb = distXY(s.R, s.B);
    expect(closeTo(cs, sr, 1e-9)).toBe(true);
    expect(closeTo(sr, rb, 1e-9)).toBe(true);
    expect(closeTo(cs, distXY(s.B, s.C) / 3, 1e-9)).toBe(true);
  });

  it('makes BSNM a parallelogram with MN = BS, hence MN/BC = BS/BC = 2/3', () => {
    expect(areParallel(s.M, s.N, s.B, s.C)).toBe(true);
    expect(areParallel(s.B, s.M, s.S, s.N)).toBe(true);
    expect(closeTo(distXY(s.M, s.N), distXY(s.B, s.S), 1e-9)).toBe(true);
    expect(closeTo(distXY(s.B, s.S) / distXY(s.B, s.C), 2 / 3, 1e-9)).toBe(true);
  });
});

describe('page 39 — the printed proof chain, verified link by link', () => {
  const chain = buildActivityProofChain();

  it('derives every midpoint the printed questions ask the student to prove', () => {
    expect(chain.midpoints.I_of_AM).toBe(true);
    expect(chain.midpoints.J_of_AN).toBe(true);
    expect(chain.midpoints.P_of_BJ).toBe(true);
    expect(chain.midpoints.N_of_CJ).toBe(true);
    expect(chain.midpoints.S_of_CR).toBe(true);
    expect(chain.midpoints.R_of_BS).toBe(true);
    expect(chain.midpoints.M_of_BI).toBe(true);
    expect(chain.midpoints.T_of_BN).toBe(true);
  });

  it('justifies each link with the parallel the printed construction actually uses', () => {
    // I mid[AM] + (IJ) ∥ (MN)  ⇒ J mid[AN]
    expect(chain.midpoints.I_of_AM).toBe(true);
    expect(areParallel(chain.I, chain.J, chain.M, chain.N)).toBe(true);
    // M mid[BI] + (MP) ⊂ (MN) ∥ (IJ)  ⇒ P mid[BJ]
    expect(chain.midpoints.M_of_BI).toBe(true);
    expect(chain.parallels.mpParallelToIJ).toBe(true);
    // P mid[BJ] + (PN) ⊂ (MN) ∥ (BC)  ⇒ N mid[CJ]
    expect(chain.midpoints.P_of_BJ).toBe(true);
    expect(chain.parallels.pnParallelToBC).toBe(true);
    // N mid[CJ] + (NS) ∥ (JR)  ⇒ S mid[CR]
    expect(chain.midpoints.N_of_CJ).toBe(true);
    expect(chain.parallels.jrParallelToNS).toBe(true);
    // J mid[AN] + (JT) ∥ (AB)  ⇒ T mid[BN]; T on (JR) by construction
    expect(chain.midpoints.J_of_AN).toBe(true);
    expect(chain.parallels.tOnJR).toBe(true);
    expect(areParallel(chain.J, chain.T, chain.A, chain.B)).toBe(true);
    // T mid[BN] + (TR) ∥ (NS)  ⇒ R mid[BS]
    expect(chain.midpoints.T_of_BN).toBe(true);
    expect(areParallel(chain.T, chain.R, chain.N, chain.S)).toBe(true);
  });

  it('places the auxiliary point T exactly on [BN] and on the line (JR)', () => {
    expect(liesOnSegment(chain.T, chain.B, chain.N)).toBe(true);
    expect(areCollinear(chain.J, chain.R, chain.T)).toBe(true);
    expect(isMidpointOf(chain.T, chain.B, chain.N)).toBe(true);
  });

  it('yields CS = SR = RB and both printed ratios, then the parallelogram', () => {
    expect(chain.thirdsEqual).toBe(true);
    expect(closeTo(chain.lengths.CS, chain.lengths.SR, 1e-9)).toBe(true);
    expect(closeTo(chain.lengths.SR, chain.lengths.RB, 1e-9)).toBe(true);
    expect(closeTo(chain.lengths.BS_BC, 2 / 3, 1e-9)).toBe(true);
    expect(closeTo(chain.lengths.MN_BC, 2 / 3, 1e-9)).toBe(true);
    expect(closeTo(chain.lengths.AM_AB, 2 / 3, 1e-9)).toBe(true);
    expect(closeTo(chain.lengths.AN_AC, 2 / 3, 1e-9)).toBe(true);
    expect(chain.bsnmpParallelogram).toBe(true);
  });

  it('separates what holds for every ratio from what the printed 2/3 alone gives', () => {
    for (const k of [0.25, 0.4, 0.5, 0.75, 0.9]) {
      const other = buildActivityProofChain(undefined, k);

      // Ratio-independent, because I is the midpoint of [AM] and (MN) ∥ (BC)
      // in the construction: J is the midpoint of [AN], and the two links that
      // only consume J (T mid [BN], then R mid [BS]) follow from it.
      expect(other.midpoints.I_of_AM, `k=${k}`).toBe(true);
      expect(other.midpoints.J_of_AN, `k=${k}`).toBe(true);
      expect(other.midpoints.T_of_BN, `k=${k}`).toBe(true);
      expect(other.midpoints.R_of_BS, `k=${k}`).toBe(true);
      expect(other.bsnmpParallelogram, `k=${k}`).toBe(true);
      expect(closeTo(other.lengths.AM_AB, k, 1e-9)).toBe(true);
      expect(closeTo(other.lengths.MN_BC, k, 1e-9)).toBe(true);
      expect(closeTo(other.lengths.BS_BC, k, 1e-9)).toBe(true);

      // Ratio-specific: P, N, S and the equal thirds need the printed 2/3.
      expect(other.midpoints.M_of_BI, `k=${k}`).toBe(false);
      expect(other.midpoints.P_of_BJ, `k=${k}`).toBe(false);
      expect(other.midpoints.N_of_CJ, `k=${k}`).toBe(false);
      expect(other.midpoints.S_of_CR, `k=${k}`).toBe(false);
      expect(other.thirdsEqual, `k=${k}`).toBe(false);
    }
  });

  it('only at 2/3 does M also bisect [BI], which is the step that unlocks P', () => {
    // M is the midpoint of [BI] exactly when AI = IM = MB, i.e. k = 2/3.
    expect(chain.midpoints.M_of_BI).toBe(true);
    expect(closeTo(chain.lengths.BM_BI, 1 / 2, 1e-9)).toBe(true);
    expect(closeTo(chain.lengths.AI_AM, 1 / 2, 1e-9)).toBe(true);
    for (const k of [0.25, 0.4, 0.75]) {
      const other = buildActivityProofChain(undefined, k);
      expect(other.midpoints.M_of_BI, `k=${k}`).toBe(false);
    }
  });
});

describe('page 40 — theorem figure and the two "extensions" panels', () => {
  const t = L11_THEOREM_SCENE;

  it('keeps M ∈ [AB], N ∈ [AC] with (MN) ∥ (BC) and (d) drawn through both', () => {
    expect(liesOnSegment(t.M, t.A, t.B)).toBe(true);
    expect(liesOnSegment(t.N, t.A, t.C)).toBe(true);
    expect(areParallel(t.M, t.N, t.B, t.C)).toBe(true);
    expect(areCollinear(t.dLeft, t.M, t.N)).toBe(true);
    expect(areCollinear(t.M, t.N, t.dRight)).toBe(true);
    expect(areCollinear(t.dLeft, t.M, t.dRight)).toBe(true);
  });

  it.each([
    ['beyond apex', L11_EXTENSION_BEYOND_APEX],
    ['beyond base', L11_EXTENSION_BEYOND_BASE],
  ] as const)(
    '%s: (d) is parallel to (BC) and meets both sides outside the segments',
    (_id, panel) => {
      expect(areParallel(panel.dLeft, panel.M, panel.B, panel.C)).toBe(true);
      expect(panel.M[1]).toBeCloseTo(panel.N[1], 12);
      expect(liesOnSegment(panel.M, panel.A, panel.B)).toBe(false);
      expect(liesOnSegment(panel.N, panel.A, panel.C)).toBe(false);
      expect(areCollinear(panel.A, panel.M, panel.B)).toBe(true);
      expect(areCollinear(panel.A, panel.N, panel.C)).toBe(true);
    },
  );

  it('places the apex-case intersections above A and the base-case ones below B and C', () => {
    expect(L11_EXTENSION_BEYOND_APEX.M[1]).toBeGreaterThan(L11_EXTENSION_BEYOND_APEX.A[1]);
    expect(L11_EXTENSION_BEYOND_BASE.M[1]).toBeLessThan(L11_EXTENSION_BEYOND_BASE.A[1]);
    expect(L11_EXTENSION_BEYOND_BASE.M[1]).toBeLessThan(L11_EXTENSION_BEYOND_BASE.B[1]);
  });
});

describe('pages 40–41 — printed worked example (AB = 3, AC = 6, BC = 5, AE = 2)', () => {
  const s = L11_EXAMPLE_SCENE;

  it('carries every printed length as an exact Euclidean distance', () => {
    expect(closeTo(distXY(s.A, s.B), 3)).toBe(true);
    expect(closeTo(distXY(s.A, s.C), 6)).toBe(true);
    expect(closeTo(distXY(s.B, s.C), 5)).toBe(true);
    expect(closeTo(distXY(s.A, s.E), 2)).toBe(true);
    expect(closeTo(distXY(s.A, s.F), 4)).toBe(true);
    expect(closeTo(distXY(s.E, s.F), 10 / 3)).toBe(true);
  });

  it('keeps E ∈ [AB], F ∈ [AC] and (EF) ∥ (BC)', () => {
    expect(liesOnSegment(s.E, s.A, s.B)).toBe(true);
    expect(liesOnSegment(s.F, s.A, s.C)).toBe(true);
    expect(areParallel(s.E, s.F, s.B, s.C)).toBe(true);
    expect(areCollinear(s.dLeft, s.E, s.F)).toBe(true);
    expect(areCollinear(s.E, s.F, s.dRight)).toBe(true);
  });

  it('gives the printed ratio AE/AB = AF/AC = EF/BC = 2/3', () => {
    expect(closeTo(distXY(s.A, s.E) / distXY(s.A, s.B), 2 / 3)).toBe(true);
    expect(closeTo(distXY(s.A, s.F) / distXY(s.A, s.C), 2 / 3)).toBe(true);
    expect(closeTo(distXY(s.E, s.F) / distXY(s.B, s.C), 2 / 3)).toBe(true);
  });
});

describe('page 41 — تحقّق من فهمك', () => {
  it('case ① keeps D ∈ [AB], E ∈ [AC] and (DE) ∥ (BC)', () => {
    const s = L11_CHECK_ONE;
    expect(liesOnSegment(s.D, s.A, s.B)).toBe(true);
    expect(liesOnSegment(s.E, s.A, s.C)).toBe(true);
    expect(areParallel(s.D, s.E, s.B, s.C)).toBe(true);
  });

  it('case ② keeps I ∈ [FG], J ∈ [FH] and (IJ) ∥ (GH)', () => {
    const s = L11_CHECK_TWO;
    expect(liesOnSegment(s.I, s.F, s.G)).toBe(true);
    expect(liesOnSegment(s.J, s.F, s.H)).toBe(true);
    expect(areParallel(s.I, s.J, s.G, s.H)).toBe(true);
  });
});

describe('page 41 — تدرّب ①: the printed values are mutually consistent', () => {
  it('case ①: 5 on the upper part and x on the lower part force 5/(5 + x) = 8/15', () => {
    const s = L11_PRACTICE_ONE_CASE_1;
    expect(closeTo(s.x, 35 / 8, 1e-12)).toBe(true);
    expect(closeTo(distXY(s.A, s.P), 5, 1e-9)).toBe(true);
    expect(closeTo(distXY(s.P, s.B), 35 / 8, 1e-9)).toBe(true);
    expect(closeTo(distXY(s.P, s.Q), 8, 1e-9)).toBe(true);
    expect(closeTo(distXY(s.B, s.C), 15, 1e-9)).toBe(true);
    expect(areParallel(s.P, s.Q, s.B, s.C)).toBe(true);
    expect(closeTo(5 / (5 + s.x), 8 / 15, 1e-12)).toBe(true);
  });

  it('case ②: 8 of 15 on the right side and an interior 5 give x = 75/8 on [BC]', () => {
    const s = L11_PRACTICE_ONE_CASE_2;
    expect(closeTo(s.x, 75 / 8, 1e-12)).toBe(true);
    expect(closeTo(distXY(s.A, s.Q), 8, 1e-9)).toBe(true);
    expect(closeTo(distXY(s.A, s.C), 15, 1e-9)).toBe(true);
    expect(closeTo(distXY(s.P, s.Q), 5, 1e-9)).toBe(true);
    expect(closeTo(distXY(s.B, s.C), 75 / 8, 1e-9)).toBe(true);
    expect(closeTo(8 / 15, 5 / s.x, 1e-12)).toBe(true);
  });

  it('case ③: 5 of x on the right side and an interior 8 with base 15 give x = 75/8', () => {
    const s = L11_PRACTICE_ONE_CASE_3;
    expect(closeTo(s.x, 75 / 8, 1e-12)).toBe(true);
    expect(closeTo(distXY(s.A, s.Q), 5, 1e-9)).toBe(true);
    expect(closeTo(distXY(s.A, s.C), 75 / 8, 1e-9)).toBe(true);
    expect(closeTo(distXY(s.P, s.Q), 8, 1e-9)).toBe(true);
    expect(closeTo(distXY(s.B, s.C), 15, 1e-9)).toBe(true);
    expect(closeTo(5 / s.x, 8 / 15, 1e-12)).toBe(true);
  });
});

describe('page 41 — تدرّب ②: the three printed arrow pairs', () => {
  it('① I ∈ [AB], J ∈ [AC] and (IJ) ∥ (BC)', () => {
    const s = L11_PRACTICE_TWO_ONE;
    expect(liesOnSegment(s.I, s.A, s.B)).toBe(true);
    expect(liesOnSegment(s.J, s.A, s.C)).toBe(true);
    expect(areParallel(s.I, s.J, s.B, s.C)).toBe(true);
  });

  it('② H ∈ [EF], K ∈ [EG] and (HK) ∥ (FG)', () => {
    const s = L11_PRACTICE_TWO_TWO;
    expect(liesOnSegment(s.H, s.E, s.F)).toBe(true);
    expect(liesOnSegment(s.K, s.E, s.G)).toBe(true);
    expect(areParallel(s.H, s.K, s.F, s.G)).toBe(true);
  });

  it('③ Q ∈ [OM], P ∈ [ON] and (QP) ∥ (MN)', () => {
    const s = L11_PRACTICE_TWO_THREE;
    expect(liesOnSegment(s.Q, s.O, s.M)).toBe(true);
    expect(liesOnSegment(s.P, s.O, s.N)).toBe(true);
    expect(areParallel(s.Q, s.P, s.M, s.N)).toBe(true);
  });
});

describe('interactive lab — which facts belong to k = 2/3 alone', () => {
  it.each(L11_LAB_TRIANGLES.map((triangle) => [triangle.id, triangle] as const))(
    '%s: at k = 2/3 every printed midpoint fact holds',
    (_id, triangle) => {
      const scene = buildThreeRatiosScene(triangle, 2 / 3);
      expect(scene.facts.jMidAN).toBe(true);
      expect(scene.facts.pMidBJ).toBe(true);
      expect(scene.facts.nMidCJ).toBe(true);
      expect(scene.facts.thirdsEqual).toBe(true);
      expect(scene.facts.bsnmpParallelogram).toBe(true);
      expect(scene.ratios.AM_AB).toBe(scene.ratios.AN_AC);
      expect(scene.ratios.AM_AB).toBe(scene.ratios.MN_BC);
      expect(scene.ratios.BS_BC).toBe(scene.ratios.AM_AB);
    },
  );

  it.each([0.25, 0.4, 0.5, 0.75])(
    'at k = %s only the midline fact and the parallelogram survive',
    (k) => {
      const scene = buildThreeRatiosScene(L11_LAB_TRIANGLES[0]!, k);
      expect(scene.facts.jMidAN).toBe(true);
      expect(scene.facts.bsnmpParallelogram).toBe(true);
      expect(scene.facts.pMidBJ).toBe(false);
      expect(scene.facts.nMidCJ).toBe(false);
      expect(scene.facts.thirdsEqual).toBe(false);
      // The three ratios stay equal for every k: (MN) is parallel by construction.
      expect(closeTo(scene.ratios.AM_AB, k, 1e-4)).toBe(true);
      expect(scene.ratios.AN_AC).toBe(scene.ratios.AM_AB);
      expect(scene.ratios.MN_BC).toBe(scene.ratios.AM_AB);
    },
  );

  it('reaches the printed 2/3 case from the default triangle of the lesson figure', () => {
    const scene = buildThreeRatiosScene(L11_ACTIVITY_TRIANGLE, L11_ACTIVITY_RATIO);
    expect(scene.ratios.AM_AB).toBe(0.6667);
    expect(scene.lengths.AN).toBeCloseTo(scene.lengths.NC * 2, 6);
  });
});

describe('FigureSpec validation & collision-free label layout across all Lesson 11 figures', () => {
  it.each(ALL_L11_FIGURE_SPECS.map((entry) => [entry.id, entry.spec] as const))(
    '%s validates via readFigureSpec and places every label cleanly inside viewBox without touching ink or another label',
    (id, spec) => {
      expect(readFigureSpec(spec), `${id}: readFigureSpec returned null`).not.toBeNull();
      const typography = figureTypography(spec);
      const { labels } = computeLabelLayout(spec, typography);
      expect(labels.length, `${id}: expected labels`).toBeGreaterThan(0);

      const obstacles = collectObstacles(spec, typography.tick, typography.arcRadius);
      const bounds = {
        x1: spec.viewBox.x,
        y1: spec.viewBox.y,
        x2: spec.viewBox.x + spec.viewBox.w,
        y2: spec.viewBox.y + spec.viewBox.h,
      };

      for (const label of labels) {
        const box = rectFromCentre(label.centre, label.width, label.height);
        expect(label.crowded, `${id}: label «${label.text}» is crowded`).toBe(false);
        expect(rectContainsRect(bounds, box), `${id}: label «${label.text}» escapes viewBox`).toBe(
          true,
        );

        const padded = inflate(box, typography.stroke * 0.9 - 1e-9);
        const hits = obstacles.filter((obstacle) =>
          segmentHitsRect(obstacle.a, obstacle.b, padded),
        );
        expect(hits.length, `${id}: label «${label.text}» touches ${hits.length} line(s)`).toBe(0);
      }

      for (let i = 0; i < labels.length; i += 1) {
        for (let j = i + 1; j < labels.length; j += 1) {
          const gap = rectDistance(
            rectFromCentre(labels[i]!.centre, labels[i]!.width, labels[i]!.height),
            rectFromCentre(labels[j]!.centre, labels[j]!.width, labels[j]!.height),
          );
          expect(
            gap,
            `${id}: labels «${labels[i]!.text}» and «${labels[j]!.text}» overlap`,
          ).toBeGreaterThan(0);
        }
      }
    },
  );
});

describe('non-leakage: starter figures never print a proven result', () => {
  const byId = new Map(ALL_L11_FIGURE_SPECS.map((entry) => [entry.id, entry.spec]));

  it('the page-39 activity panels print the printed names only — never a ratio as a value', () => {
    const panels = byId.get('fig-l11-activity-panels')!;
    const labels = (panels.points ?? []).map((p) => p.label);
    for (const name of ['A', 'B', 'C', 'I', 'M', 'N', 'J', 'P', 'R', 'S']) {
      expect(labels).toContain(name);
    }
    expect(labels).not.toContain('2/3');
    // The printed ratio is carried by the three-tick marks on [AB], not by text.
    const ticked = (panels.segments ?? []).filter((seg) => seg.ticks !== undefined);
    expect(ticked).toHaveLength(2);
    expect(panels.texts ?? []).toHaveLength(0);
  });

  it('the تدرّب ① figure prints the four printed values and never the derived x', () => {
    const printed = (byId.get('fig-l11-practice-one-cases')!.texts ?? []).map((text) => text.text);
    for (const value of ['5', 'x', '8', '15']) {
      expect(printed).toContain(value);
    }
    expect(printed).not.toContain('4.375');
    expect(printed).not.toContain('9.375');
    expect(printed).not.toContain('10.666');
  });

  it('the تدرّب ② figure keeps every printed vertex name and only the printed arrows', () => {
    const spec = byId.get('fig-l11-practice-two-cases')!;
    const labels = (spec.points ?? []).map((p) => p.label);
    for (const name of [
      'A',
      'B',
      'C',
      'I',
      'J',
      'E',
      'F',
      'G',
      'H',
      'K',
      'O',
      'M',
      'N',
      'Q',
      'P',
    ]) {
      expect(labels).toContain(name);
    }
    // Parallelism is shown with chevrons (an arrow on a split segment), not text.
    expect(spec.texts ?? []).toHaveLength(0);
    const arrows = (spec.segments ?? []).filter((seg) => seg.arrow === true);
    expect(arrows.length).toBe(6);
  });
});

describe('helper parity with the shared section-point utilities', () => {
  it('sectionPoint agrees with midPoint at t = 1/2', () => {
    const a: XY = [1, 2];
    const b: XY = [7, 9];
    expect(samePoint(sectionPoint(a, b, 0.5), midPoint(a, b))).toBe(true);
  });
});
