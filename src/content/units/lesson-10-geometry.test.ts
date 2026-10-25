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
import { ALL_L10_FIGURE_SPECS } from './lesson-10-figures';
import {
  buildActivityPanelScene,
  buildThalesScene,
  cross2D,
  distXY,
  L10_ACTIVITY_SHAPES,
  L10_BUNDLE_1,
  L10_BUNDLE_2,
  L10_CHECK,
  L10_EXAMPLE_1,
  L10_EXAMPLE_2,
  L10_LAB_TRIANGLES,
  L10_PRACTICE_JKL,
  L10_TEST_BUNDLE,
  L10_TRANSVERSAL,
  sectionPoint,
} from './lesson-10-geometry';

/**
 * ============================================================================
 *  LESSON 10 — Independent Algebraic, Geometric & Label-Layout Verification
 * ============================================================================
 *
 *  Verifies from raw coordinates that:
 *    1. Every numeric scene on pages 37–38 carries the PRINTED lengths as
 *       exact Euclidean distances (2, 3, 8, 12, 2.5, 9, 6, …) and the exact
 *       parallelism / collinearity relations stated in the textbook.
 *    2. Page-36 panel scenes hold one common section ratio with (MN) ∥ (BC).
 *    3. The Thales lab reports three equal ratios at zero tilt and a broken
 *       table for any nonzero tilt.
 *    4. Starter figures never print proven results, and every authored
 *       FigureSpec validates through `readFigureSpec` with labels placed
 *       inside the viewBox without touching ink or another label.
 * ============================================================================
 */

const EPS = 1e-9;
const closeTo = (actual: number, expected: number) => Math.abs(actual - expected) < EPS;
const samePoint = (a: XY, b: XY) => distXY(a, b) < EPS;
const areParallel = (a: XY, b: XY, c: XY, d: XY) => Math.abs(cross2D(a, b, c, d)) < EPS;
const areCollinear = (a: XY, b: XY, c: XY) => Math.abs(cross2D(a, b, a, c)) < EPS;
const liesOnSegment = (p: XY, a: XY, b: XY) =>
  areCollinear(a, b, p) && distXY(a, p) + distXY(p, b) - distXY(a, b) < 1e-9;

describe('page 36 — three activity panels', () => {
  it.each(L10_ACTIVITY_SHAPES.map((shape) => [shape.id, buildActivityPanelScene(shape)] as const))(
    '%s places M and N at the common section ratio 0.45 with (MN) parallel to (BC)',
    (_id, scene) => {
      expect(closeTo(distXY(scene.A, scene.M) / distXY(scene.A, scene.B), 0.45)).toBe(true);
      expect(closeTo(distXY(scene.A, scene.N) / distXY(scene.A, scene.C), 0.45)).toBe(true);
      expect(areParallel(scene.M, scene.N, scene.B, scene.C)).toBe(true);
      expect(closeTo(distXY(scene.M, scene.N), 0.45 * distXY(scene.B, scene.C))).toBe(true);
      expect(liesOnSegment(scene.M, scene.A, scene.B)).toBe(true);
      expect(liesOnSegment(scene.N, scene.A, scene.C)).toBe(true);
    },
  );
});

describe('page 36 — تعلّم transversal scene', () => {
  const t = L10_TRANSVERSAL;

  it('keeps (MN) and (BC) on two horizontal parallel lines', () => {
    expect(areParallel(t.M, t.N, t.B, t.C)).toBe(true);
    expect(t.M[1]).toBe(t.N[1]);
    expect(t.B[1]).toBe(t.C[1]);
  });

  it('makes A–M–B and A–N–C collinear (the two converging transversals)', () => {
    expect(areCollinear(t.A, t.M, t.B)).toBe(true);
    expect(areCollinear(t.A, t.N, t.C)).toBe(true);
    expect(liesOnSegment(t.M, t.A, t.B)).toBe(true);
    expect(liesOnSegment(t.N, t.A, t.C)).toBe(true);
  });
});

describe('page 37 — worked example ①: AM=2, AR=8, AN=3, AS=12', () => {
  const e = L10_EXAMPLE_1;

  it('carries the four printed lengths as exact Euclidean distances', () => {
    expect(closeTo(distXY(e.A, e.M), 2)).toBe(true);
    expect(closeTo(distXY(e.A, e.R), 8)).toBe(true);
    expect(closeTo(distXY(e.A, e.N), 3)).toBe(true);
    expect(closeTo(distXY(e.A, e.S), 12)).toBe(true);
  });

  it('keeps M on [AR], N on [AS], and (MN) parallel to (RS)', () => {
    expect(liesOnSegment(e.M, e.A, e.R)).toBe(true);
    expect(liesOnSegment(e.N, e.A, e.S)).toBe(true);
    expect(areParallel(e.M, e.N, e.R, e.S)).toBe(true);
    expect(closeTo(distXY(e.M, e.N) / distXY(e.R, e.S), 2 / 8)).toBe(true);
  });

  it('extends the dashed auxiliary line collinearly beyond R and beyond A', () => {
    expect(areCollinear(e.A, e.R, e.rBeyond)).toBe(true);
    expect(areCollinear(e.R, e.A, e.aBeyond)).toBe(true);
  });
});

describe('page 37 — worked example ②: AT=2, TU=3, AU=5, AR=10, AS=4', () => {
  const e = L10_EXAMPLE_2;

  it('carries the printed lengths exactly, including the assembled whole side AU=5', () => {
    expect(closeTo(distXY(e.A, e.T), 2)).toBe(true);
    expect(closeTo(distXY(e.T, e.U), 3)).toBe(true);
    expect(closeTo(distXY(e.A, e.U), 5)).toBe(true);
    expect(closeTo(distXY(e.A, e.R), 10)).toBe(true);
    expect(closeTo(distXY(e.A, e.S), 4)).toBe(true);
    expect(closeTo(distXY(e.A, e.T) + distXY(e.T, e.U), distXY(e.A, e.U))).toBe(true);
  });

  it('keeps T on [AU], S on [AR], and (TS) parallel to (RU)', () => {
    expect(liesOnSegment(e.T, e.A, e.U)).toBe(true);
    expect(liesOnSegment(e.S, e.A, e.R)).toBe(true);
    expect(areParallel(e.T, e.S, e.U, e.R)).toBe(true);
    expect(closeTo(distXY(e.T, e.S) / distXY(e.U, e.R), 2 / 5)).toBe(true);
  });
});

describe('page 38 — تحقّق: AE=3, AF=4, AC=12, AB=9 (EB=6)', () => {
  const c = L10_CHECK;

  it('carries the printed lengths as exact distances', () => {
    expect(closeTo(distXY(c.A, c.E), 3)).toBe(true);
    expect(closeTo(distXY(c.A, c.F), 4)).toBe(true);
    expect(closeTo(distXY(c.A, c.C), 12)).toBe(true);
  });

  it('derives AB = 9 and EB = 6 with (EF) parallel to (BC)', () => {
    expect(closeTo(distXY(c.A, c.B), 9)).toBe(true);
    expect(closeTo(distXY(c.E, c.B), 6)).toBe(true);
    expect(areParallel(c.E, c.F, c.B, c.C)).toBe(true);
    expect(liesOnSegment(c.E, c.A, c.B)).toBe(true);
    expect(liesOnSegment(c.F, c.A, c.C)).toBe(true);
    expect(closeTo(distXY(c.A, c.F) / distXY(c.A, c.C), 1 / 3)).toBe(true);
    expect(closeTo(distXY(c.A, c.E) / distXY(c.A, c.B), 1 / 3)).toBe(true);
  });

  it('places the «12» extension beyond C on the same ray', () => {
    expect(areCollinear(c.A, c.C, c.cBeyond)).toBe(true);
  });
});

describe('page 38 — تدرّب ① bundle scenes', () => {
  it('bundle 1: (BC) ∥ (EF), with A–B–E and A–C–F collinear and E–C–D on the third slant', () => {
    const b = L10_BUNDLE_1;
    expect(areParallel(b.B, b.C, b.E, b.F)).toBe(true);
    expect(areCollinear(b.A, b.B, b.E)).toBe(true);
    expect(areCollinear(b.A, b.C, b.F)).toBe(true);
    expect(areCollinear(b.E, b.C, b.D)).toBe(true);
    expect(liesOnSegment(b.B, b.A, b.E)).toBe(true);
    expect(liesOnSegment(b.C, b.A, b.F)).toBe(true);
  });

  it('bundle 2: three horizontal parallels and (TN) parallel to (KM)', () => {
    const b = L10_BUNDLE_2;
    expect(b.y1 - b.y0).toBe(4);
    expect(b.y2 - b.y1).toBe(4);
    expect(areCollinear(b.H, b.I, b.M)).toBe(true);
    expect(areCollinear(b.K, b.J, b.M)).toBe(true);
    expect(areParallel(b.N, b.T, b.K, b.M)).toBe(true);
    expect(areParallel(b.J, b.M, b.N, b.T)).toBe(true);
  });

  it('test bundle: exact converging transversals and horizontal parallels', () => {
    const b = L10_TEST_BUNDLE;
    expect(areParallel(b.B, b.C, b.E, b.F)).toBe(true);
    expect(areCollinear(b.A, b.B, b.E)).toBe(true);
    expect(areCollinear(b.A, b.C, b.F)).toBe(true);
  });
});

describe('page 38 — تدرّب ② JKL: JL=12, JK=10, KL=6, JM=2.5, JN=3, NL=9, MN=1.5', () => {
  const j = L10_PRACTICE_JKL;

  it('satisfies the printed SSS side lengths exactly', () => {
    expect(closeTo(distXY(j.J, j.L), 12)).toBe(true);
    expect(closeTo(distXY(j.J, j.K), 10)).toBe(true);
    expect(closeTo(distXY(j.K, j.L), 6)).toBe(true);
  });

  it('places N with JN=3 and NL=9, and M as the exact quarter point of [JK]', () => {
    expect(closeTo(distXY(j.J, j.N), 3)).toBe(true);
    expect(closeTo(distXY(j.N, j.L), 9)).toBe(true);
    expect(samePoint(j.M, sectionPoint(j.J, j.K, 0.25))).toBe(true);
    expect(closeTo(distXY(j.J, j.M), 2.5)).toBe(true);
    expect(liesOnSegment(j.M, j.J, j.K)).toBe(true);
  });

  it('makes (MN) parallel to (KL) with MN = KL/4 = 1.5', () => {
    expect(areParallel(j.M, j.N, j.K, j.L)).toBe(true);
    expect(closeTo(distXY(j.M, j.N), 1.5)).toBe(true);
    expect(closeTo(distXY(j.M, j.N), distXY(j.K, j.L) / 4)).toBe(true);
  });
});

describe('Thales ratio lab model', () => {
  it('reports three exactly equal ratios and P = N at zero tilt for every preset', () => {
    for (const tri of L10_LAB_TRIANGLES) {
      for (const t of [0.2, 0.45, 0.7]) {
        const scene = buildThalesScene(tri, t, 0);
        expect(samePoint(scene.P, scene.N)).toBe(true);
        expect(closeTo(scene.ratios.AM_AB, scene.ratios.AN_AC)).toBe(true);
        expect(closeTo(scene.ratios.AM_AB, scene.ratios.MN_BC)).toBe(true);
        expect(closeTo(scene.ratios.AM_AB, t)).toBe(true);
        expect(closeTo(scene.ratios.AP_AC, scene.ratios.AN_AC)).toBe(true);
      }
    }
  });

  it('breaks proportionality (P ≠ N, AP/AC drifts away from k) for nonzero tilts', () => {
    for (const tri of L10_LAB_TRIANGLES) {
      for (const tilt of [-12, -7, 6, 11]) {
        const scene = buildThalesScene(tri, 0.4, tilt);
        expect(samePoint(scene.P, scene.N)).toBe(false);
        expect(Math.abs(scene.ratios.AP_AC - scene.ratios.AM_AB)).toBeGreaterThan(1e-4);
      }
    }
  });

  it('keeps all reported lengths internally consistent with the section points', () => {
    const scene = buildThalesScene(L10_LAB_TRIANGLES[0]!, 0.4, 0);
    // Lab lengths are rounded to four decimals for display, so compare at 1e-3.
    expect(scene.lengths.AM).toBeCloseTo(distXY(scene.A, scene.M), 3);
    expect(scene.lengths.MN).toBeCloseTo(distXY(scene.M, scene.N), 3);
    expect(scene.lengths.AM + distXY(scene.M, scene.B)).toBeCloseTo(scene.lengths.AB, 3);
    expect(scene.lengths.AN + distXY(scene.N, scene.C)).toBeCloseTo(scene.lengths.AC, 3);
  });
});

describe('non-leakage of proven results in the JKL starter figure', () => {
  const byId = new Map(ALL_L10_FIGURE_SPECS.map((entry) => [entry.id, entry.spec]));

  it('starter carries only the four printed givens and never the solved lengths 10 / 1.5', () => {
    const starter = byId.get('fig-l10-practice-jkl-starter')!;
    const printed = (starter.texts ?? []).map((text) => text.text);
    expect(printed).toEqual(expect.arrayContaining(['2.5', '3', '9', '6']));
    expect(printed).not.toContain('10');
    expect(printed).not.toContain('1.5');
  });

  it('solved figure adds MN = 1.5, the highlighted small triangle and the 1:3 tick marks', () => {
    const solved = byId.get('fig-l10-practice-jkl-solved')!;
    expect((solved.texts ?? []).map((text) => text.text)).toContain('1.5');
    const tripleTicks = (solved.segments ?? []).filter((seg) => seg.ticks === 3);
    expect(tripleTicks).toHaveLength(2);
    expect(solved.polygons?.[0]?.points).toEqual([
      L10_PRACTICE_JKL.J,
      L10_PRACTICE_JKL.M,
      L10_PRACTICE_JKL.N,
    ]);
  });
});

describe('FigureSpec schema validation & collision-free label layout across all Lesson 10 figures', () => {
  it.each(ALL_L10_FIGURE_SPECS.map((entry) => [entry.id, entry.spec] as const))(
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
