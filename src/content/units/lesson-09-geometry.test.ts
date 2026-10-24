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
import { ALL_L9_FIGURE_SPECS } from './lesson-09-figures';
import {
  buildActivityPanelScene,
  buildSalimScene,
  cross2D,
  distXY,
  dot2D,
  L9_CHECK_1,
  L9_CHECK_2,
  L9_EXAMPLE,
  L9_KNOWLEDGE,
  L9_LAB_TRIANGLES,
  L9_PRACTICE_1,
  L9_PRACTICE_2,
  L9_TEST_CEVIAN,
  L9_TEST_RIGHT_TRIANGLE,
  lineIntersection,
  midPoint,
} from './lesson-09-geometry';

/**
 * ============================================================================
 *  LESSON 9 — Independent Algebraic, Geometric & Label-Layout Verification
 * ============================================================================
 *
 *  Verifies from raw coordinates that:
 *    1. Every scene on pages 34–35 satisfies the exact midpoint, parallel,
 *       perpendicular, central-symmetry, and sub-triangle relations stated in
 *       the textbook.
 *    2. Deliberate non-equality guards hold (Salim's hand-drawn line is NOT
 *       parallel to BC and misses N; M in the p. 35 Knowledge example is NOT
 *       the midpoint of BC; starter figures never reveal proven midpoints).
 *    3. Every Lesson 9 FigureSpec validates through `readFigureSpec` and
 *       places all vertex/line/frame labels inside its viewBox without
 *       touching ink or colliding with another label.
 * ============================================================================
 */

const EPS = 1e-9;
const samePoint = (a: XY, b: XY) => distXY(a, b) < EPS;
const isMidpointOf = (m: XY, a: XY, b: XY) => samePoint(m, midPoint(a, b));
const areParallel = (a: XY, b: XY, c: XY, d: XY) => Math.abs(cross2D(a, b, c, d)) < EPS;
const areCollinear = (a: XY, b: XY, c: XY) => Math.abs(cross2D(a, b, a, c)) < EPS;
const arePerpendicular = (a: XY, b: XY, c: XY, d: XY) => Math.abs(dot2D(a, b, c, d)) < EPS;

describe('page 34 — Activity (Salim’s three-panel investigation)', () => {
  const s = buildActivityPanelScene(0);

  it('places M at the exact midpoint of [AB] and N at the exact midpoint of [AC]', () => {
    expect(isMidpointOf(s.M, s.A, s.B)).toBe(true);
    expect(isMidpointOf(s.N, s.A, s.C)).toBe(true);
  });

  it('makes the true midline (d′) = (MN) strictly parallel to (BC)', () => {
    expect(areParallel(s.M, s.N, s.B, s.C)).toBe(true);
    expect(areCollinear(s.dPrimeStart, s.M, s.N)).toBe(true);
    expect(areCollinear(s.M, s.N, s.dPrimeEnd)).toBe(true);
    expect(distXY(s.M, s.N)).toBeCloseTo(distXY(s.B, s.C) / 2, 9);
  });

  it('makes Salim’s hand-drawn line (d) pass through M, intersect [AC] at P ≠ N, and fail parallelism with (BC)', () => {
    expect(areCollinear(s.dStart, s.M, s.P)).toBe(true);
    expect(areCollinear(s.M, s.P, s.dEnd)).toBe(true);
    expect(areCollinear(s.A, s.P, s.C)).toBe(true);
    expect(areParallel(s.M, s.P, s.B, s.C)).toBe(false);
    expect(samePoint(s.P, s.N)).toBe(false);
    expect(Math.abs(distXY(s.A, s.P) - distXY(s.P, s.C))).toBeGreaterThan(0.5);
  });
});

describe('page 34 — Learn worked example (triangle ABC with I and J)', () => {
  const s = L9_EXAMPLE;

  it('satisfies I midpoint of [AB], (IJ) ∥ (BC), and J midpoint of [AC]', () => {
    expect(isMidpointOf(s.I, s.A, s.B)).toBe(true);
    expect(areParallel(s.I, s.J, s.B, s.C)).toBe(true);
    expect(areCollinear(s.lineLeft, s.I, s.J)).toBe(true);
    expect(areCollinear(s.I, s.J, s.lineRight)).toBe(true);
    expect(isMidpointOf(s.J, s.A, s.C)).toBe(true);
  });

  it('uses a scalene triangle so AB ≠ AC ≠ BC (avoiding accidental isosceles assumptions)', () => {
    const ab = distXY(s.A, s.B);
    const ac = distXY(s.A, s.C);
    const bc = distXY(s.B, s.C);
    expect(Math.abs(ab - ac)).toBeGreaterThan(0.4);
    expect(Math.abs(ab - bc)).toBeGreaterThan(0.4);
    expect(Math.abs(ac - bc)).toBeGreaterThan(0.4);
  });
});

describe('page 35 — Acquire Knowledge worked example (sub-triangle AMB inside ABC)', () => {
  const s = L9_KNOWLEDGE;

  it('places M strictly on [BC] away from the midpoint of [BC]', () => {
    expect(areCollinear(s.B, s.M, s.C)).toBe(true);
    expect(distXY(s.C, s.M) + distXY(s.M, s.B)).toBeCloseTo(distXY(s.C, s.B), 9);
    expect(isMidpointOf(s.M, s.B, s.C)).toBe(false);
    expect(Math.abs(distXY(s.C, s.M) - distXY(s.M, s.B))).toBeGreaterThan(1.0);
  });

  it('satisfies R midpoint of [AM], (d) = (SR) ∥ (BC) ∥ (BM), and S midpoint of [AB]', () => {
    expect(isMidpointOf(s.R, s.A, s.M)).toBe(true);
    expect(areParallel(s.S, s.R, s.B, s.C)).toBe(true);
    expect(areParallel(s.S, s.R, s.B, s.M)).toBe(true);
    expect(areCollinear(s.dLeft, s.R, s.S)).toBe(true);
    expect(areCollinear(s.R, s.S, s.dRight)).toBe(true);
    expect(isMidpointOf(s.S, s.A, s.B)).toBe(true);
  });

  it('keeps R strictly off all three sides of ABC (confirming ABC cannot apply the theorem directly to R)', () => {
    expect(areCollinear(s.A, s.R, s.B)).toBe(false);
    expect(areCollinear(s.A, s.R, s.C)).toBe(false);
    expect(areCollinear(s.B, s.R, s.C)).toBe(false);
    // Once S is proved to be the midpoint of [AB] via sub-triangle AMB, line (d)
    // also bisects [AC] in triangle ABC by a second application of the theorem.
    const Q = lineIntersection(s.R, s.S, s.A, s.C);
    expect(isMidpointOf(Q, s.A, s.C)).toBe(true);
  });
});

describe('page 35 — Check Your Understanding ① and ②', () => {
  it('Check ①: E midpoint of [AC] and (EF) ∥ (AB) yield F midpoint of [BC], with interior cevians [AF] and [BE]', () => {
    const s = L9_CHECK_1;
    expect(isMidpointOf(s.E, s.A, s.C)).toBe(true);
    expect(areParallel(s.E, s.F, s.A, s.B)).toBe(true);
    expect(isMidpointOf(s.F, s.B, s.C)).toBe(true);
    expect(areCollinear(s.lineTop, s.E, s.F)).toBe(true);
    expect(areCollinear(s.E, s.F, s.lineBottom)).toBe(true);
  });

  it('Check ②: right angle at B and (MN) ⊥ (AB) at midpoint M yield (MN) ∥ (BC) and N midpoint of [AC]', () => {
    const s = L9_CHECK_2;
    expect(arePerpendicular(s.B, s.A, s.B, s.C)).toBe(true);
    expect(isMidpointOf(s.M, s.A, s.B)).toBe(true);
    expect(arePerpendicular(s.M, s.N, s.A, s.B)).toBe(true);
    expect(areParallel(s.M, s.N, s.B, s.C)).toBe(true);
    expect(isMidpointOf(s.N, s.A, s.C)).toBe(true);
  });
});

describe('page 35 — Practice ① and ② (extended triangles IST and JAM) & Test Area figures', () => {
  it('Practice ①: S symmetric of I about J makes J midpoint of [IS], and (ST) ∥ (JK) makes K midpoint of [IT]', () => {
    const s = L9_PRACTICE_1;
    expect(areCollinear(s.I, s.J, s.S)).toBe(true);
    expect(isMidpointOf(s.J, s.I, s.S)).toBe(true);
    expect(areParallel(s.S, s.T, s.J, s.K)).toBe(true);
    expect(areCollinear(s.I, s.K, s.T)).toBe(true);
    expect(isMidpointOf(s.K, s.I, s.T)).toBe(true);
  });

  it('Practice ②: C midpoint of [AJ] and (AM) ∥ (CP) with M ∈ (JP) make P midpoint of [MJ]', () => {
    const s = L9_PRACTICE_2;
    expect(isMidpointOf(s.C, s.A, s.J)).toBe(true);
    expect(areParallel(s.A, s.M, s.C, s.P)).toBe(true);
    expect(areCollinear(s.J, s.P, s.M)).toBe(true);
    expect(isMidpointOf(s.P, s.M, s.J)).toBe(true);
  });

  it('verifies Test Area shared coordinates for q10 (right triangle) and q16 (cevian midpoint)', () => {
    const rt = L9_TEST_RIGHT_TRIANGLE;
    expect(arePerpendicular(rt.B, rt.A, rt.B, rt.C)).toBe(true);
    expect(isMidpointOf(rt.M, rt.A, rt.B)).toBe(true);
    expect(arePerpendicular(rt.M, rt.N, rt.A, rt.B)).toBe(true);
    expect(isMidpointOf(rt.N, rt.A, rt.C)).toBe(true);

    const cv = L9_TEST_CEVIAN;
    expect(areCollinear(cv.B, cv.M, cv.C)).toBe(true);
    expect(isMidpointOf(cv.M, cv.B, cv.C)).toBe(false);
    expect(isMidpointOf(cv.R, cv.A, cv.M)).toBe(true);
    const sMid = midPoint(cv.A, cv.B);
    expect(areParallel(cv.R, sMid, cv.B, cv.C)).toBe(true);
  });
});

describe('interactive lab algebraic model (buildSalimScene)', () => {
  it('satisfies exact coincidence P = N and AP = PC at deltaDeg = 0° for all three triangle presets', () => {
    for (const preset of L9_LAB_TRIANGLES) {
      const state = buildSalimScene(preset, 0);
      expect(isMidpointOf(state.M, preset.A, preset.B)).toBe(true);
      expect(isMidpointOf(state.N, preset.A, preset.C)).toBe(true);
      expect(samePoint(state.P, state.N)).toBe(true);
      expect(state.lengths.PN).toBe(0);
      expect(state.lengths.AP).toBeCloseTo(state.lengths.PC, 2);
      expect(areParallel(state.M, state.P, preset.B, preset.C)).toBe(true);
    }
  });

  it('produces P ≠ N and AP ≠ PC whenever deltaDeg ≠ 0°', () => {
    for (const preset of L9_LAB_TRIANGLES) {
      for (const deg of [-12, -6, 5, 11]) {
        const state = buildSalimScene(preset, deg);
        expect(samePoint(state.P, state.N)).toBe(false);
        expect(state.lengths.PN).toBeGreaterThan(0.1);
        expect(areParallel(state.M, state.P, preset.B, preset.C)).toBe(false);
      }
    }
  });
});

describe('non-leakage of proven conclusions in question/starter figures', () => {
  const byId = new Map(ALL_L9_FIGURE_SPECS.map((entry) => [entry.id, entry.spec]));

  it('marks ticks ONLY on the given midpoint side in Example, Knowledge, Check ①, Check ②, and Practice starters', () => {
    for (const id of [
      'fig-l9-example-ij',
      'fig-l9-knowledge-amb',
      'fig-l9-check-one',
      'fig-l9-check-two',
      'fig-l9-practice-one-starter',
      'fig-l9-practice-two-starter',
    ]) {
      const spec = byId.get(id)!;
      const ticked = (spec.segments ?? []).filter((seg) => seg.ticks !== undefined);
      expect(ticked, `${id}: ticked segment count`).toHaveLength(2);
    }
  });

  it('adds the proven double-tick marks ONLY in the teacher solved figures for Practice ① and ②', () => {
    for (const id of ['fig-l9-practice-one-solved', 'fig-l9-practice-two-solved']) {
      const spec = byId.get(id)!;
      const singleTicked = (spec.segments ?? []).filter((seg) => seg.ticks === 1);
      const doubleTicked = (spec.segments ?? []).filter((seg) => seg.ticks === 2);
      expect(singleTicked).toHaveLength(2);
      expect(doubleTicked).toHaveLength(2);
    }
  });
});

describe('FigureSpec schema validation & collision-free label layout across all Lesson 9 figures', () => {
  it.each(ALL_L9_FIGURE_SPECS.map((entry) => [entry.id, entry.spec] as const))(
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
