import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import {
  casesLabCases,
  fig17Cases,
  fig18Asa,
  fig18Sas,
  fig18Sss,
  fig19Check,
  fig19Isosceles,
  fig19Kite,
  fig19Pairs,
  figDefinitionPair,
  figTranslation,
  teacherActivityFigure,
  teacherCheckFigure,
  teacherIsoscelesFigure,
  teacherKiteFigure,
} from '@/content/units/lesson-04-figures';
import type { ConstructedDiagram } from '@/content/schema';
import { readFigureSpec } from '@/lib/geometryFigure';
import type { FigureSpec } from '@/lib/geometryFigure';
import {
  collectObstacles,
  rectDistance,
  rectFromCentre,
  segmentHitsRect,
  inflate,
  frameInnerRect,
  rectContainsRect,
} from '@/lib/figureLayout';
import {
  REFERENCE_FIGURE_WIDTH,
  TYPOGRAPHY_PX,
  figureTypography,
  onScreenFontSize,
} from '@/lib/figureTypography';
import { computeLabelLayout } from './FigureSvg';
import { CongruenceFigure } from './index';

/**
 * ============================================================================
 *  LESSON 4 — typography and label-placement invariants
 * ============================================================================
 *
 *  The defect these tests exist for was not a wrong triangle: every coordinate
 *  was already correct. It was that one lesson drew the same letter at 11 px in
 *  one figure and 44 px in another, and let labels sit on the ink. Neither
 *  shows up in a geometry assertion, and jsdom cannot see either.
 *
 *  So the invariants are asserted on the layout the renderer actually computes:
 *
 *    1. one type scale, whatever the figure's aspect ratio;
 *    2. a label box never touches a side, an arc, a tick, a frame border or
 *       another label;
 *    3. a label never leaves its own panel, and never drifts so far from its
 *       element that it could be read as belonging to something else;
 *    4. the ink itself is drawn at one weight across the lesson.
 *
 *  The type scale itself is pinned on purpose. A vertex name is set at 16 px —
 *  the page's body size — and a figure's own `labelScale` may shrink its
 *  printed values but never its names (see `figureTypography`). The numbers
 *  behind that decision, and the rasterised comparison at 750, 799 and
 *  1 000 px, are in docs/LESSON-04-LABEL-AUDIT.md §7.
 *
 *  What these tests still cannot see is the final paint: font metrics are
 *  estimated (see `figureTypography`), and no browser lays the page out. That
 *  limitation is stated in docs/LESSON-04-LABEL-AUDIT.md.
 * ============================================================================
 */

const LAB_VIEW_BOX = { x: 1.3, y: 0.2, w: 10.4, h: 6.6 } as const;

const constructionOf = (diagram: ConstructedDiagram): FigureSpec => {
  const spec = readFigureSpec(diagram.construction);
  if (!spec) throw new Error(`unreadable construction: ${diagram.id}`);
  return spec;
};

const figures: Record<string, FigureSpec> = {
  'fig-17-activity-cases': constructionOf(fig17Cases),
  'auth-04-translation-intro': constructionOf(figTranslation),
  'auth-04-definition-pair': constructionOf(figDefinitionPair),
  'fig-18-example-sas': constructionOf(fig18Sas),
  'fig-18-example-asa': constructionOf(fig18Asa),
  'fig-18-example-sss': constructionOf(fig18Sss),
  'fig-19-check-rectangle': constructionOf(fig19Check),
  'fig-19-kite': constructionOf(fig19Kite),
  'fig-19-pairs': constructionOf(fig19Pairs),
  'fig-19-isosceles': constructionOf(fig19Isosceles),
  'auth-04-teacher-activity': constructionOf(teacherActivityFigure),
  'auth-04-teacher-check': constructionOf(teacherCheckFigure),
  'auth-04-teacher-kite': constructionOf(teacherKiteFigure),
  'auth-04-teacher-isosceles': constructionOf(teacherIsoscelesFigure),
};

/** The four labs draw these specs inside the lab window. */
const labSpecs: Record<string, FigureSpec> = Object.fromEntries(
  casesLabCases.flatMap((entry) => [
    [`cases-lab/${entry.id}/given`, { ...entry.given, viewBox: LAB_VIEW_BOX }],
    [`cases-lab/${entry.id}/completed`, { ...entry.completed, viewBox: LAB_VIEW_BOX }],
  ]),
);

const everySpec = { ...figures, ...labSpecs };

const labelBoxes = (spec: FigureSpec) => {
  const typography = figureTypography(spec);
  const { labels } = computeLabelLayout(spec, typography);
  return { typography, labels };
};

describe('one type scale for the whole lesson', () => {
  it.each(Object.entries(everySpec))(
    '%s keeps its vertex letters at the design size',
    (_name, spec) => {
      const size = onScreenFontSize(spec, 'vertex');
      // A letter is a letter: within half a pixel of the lesson's one design
      // size, whatever its window shape — and whatever the figure's own
      // `labelScale` says about the values it prints. A name never shrinks.
      expect(size).toBeGreaterThan(TYPOGRAPHY_PX.vertex - 0.5);
      expect(size).toBeLessThan(TYPOGRAPHY_PX.vertex + 0.5);
    },
  );

  it('sets vertex names at the page’s body size', () => {
    // Deliberate, and pinned: 1 rem = 16 px, the size of the prose around the
    // figure. A name larger than the sentence it illustrates makes the drawing
    // shout and crowds the ink it names; a name smaller than the value printed
    // beside it stops being a name.
    expect(TYPOGRAPHY_PX.vertex).toBe(16);
    expect(TYPOGRAPHY_PX.vertex).toBeGreaterThan(TYPOGRAPHY_PX.measure);
    expect(TYPOGRAPHY_PX.vertex - TYPOGRAPHY_PX.measure).toBeLessThan(2);
  });

  it('keeps the roles distinct: vertex > measure > frame', () => {
    for (const spec of Object.values(everySpec)) {
      const typography = figureTypography(spec);
      expect(typography.vertex).toBeGreaterThan(typography.measure);
      expect(typography.measure).toBeGreaterThan(typography.frame);
      // An angle value is a measurement, not a name.
      expect(typography.angle).toBeLessThanOrEqual(typography.measure + 1e-9);
    }
  });

  it('draws ink at one weight across figures of every aspect ratio', () => {
    const widths = [8.6, 9.4, 10.4, 15.6, 19.6, 32.7];
    const strengths = widths.map((w) => {
      const typography = figureTypography({ viewBox: { x: 0, y: 0, w, h: w / 2 } });
      return typography.stroke * (REFERENCE_FIGURE_WIDTH / w);
    });
    for (const strength of strengths) expect(strength).toBeCloseTo(TYPOGRAPHY_PX.stroke, 6);
  });

  it('honours a deliberate per-figure label scale — for measurements only', () => {
    const base = { viewBox: { x: 0, y: 0, w: 12, h: 8 } } as const;
    const bigger = { ...base, labelScale: 1.25 } as const;
    for (const role of ['measure', 'angle', 'frame'] as const) {
      expect(onScreenFontSize(bigger, role)).toBeCloseTo(onScreenFontSize(base, role) * 1.25, 6);
    }
    // A name is not a value: the per-figure scale must leave it alone, in
    // either direction…
    expect(onScreenFontSize(bigger, 'vertex')).toBeCloseTo(onScreenFontSize(base, 'vertex'), 6);
    // …and a label scale never thickens the drawing itself.
    expect(figureTypography(bigger).stroke).toBe(figureTypography(base).stroke);
  });

  it('keeps «تدرّب ②» values scaled, and records what happens without it', () => {
    const spec = figures['fig-19-pairs']!;
    expect(spec.labelScale).toBeCloseTo(0.82, 6);
    // Its measurements are the smallest in the lesson; its names are not.
    expect(onScreenFontSize(spec, 'measure')).toBeLessThan(
      onScreenFontSize({ viewBox: spec.viewBox }, 'measure'),
    );
    expect(onScreenFontSize(spec, 'vertex')).toBeCloseTo(TYPOGRAPHY_PX.vertex, 9);

    const smallestGapPx = (candidate: FigureSpec) => {
      const { labels } = computeLabelLayout(candidate, figureTypography(candidate));
      let smallest = Infinity;
      for (let i = 0; i < labels.length; i += 1) {
        for (let j = i + 1; j < labels.length; j += 1) {
          smallest = Math.min(
            smallest,
            rectDistance(
              rectFromCentre(labels[i]!.centre, labels[i]!.width, labels[i]!.height),
              rectFromCentre(labels[j]!.centre, labels[j]!.width, labels[j]!.height),
            ),
          );
        }
      }
      return smallest * (REFERENCE_FIGURE_WIDTH / candidate.viewBox.w);
    };

    // With the override, every label in the three panels has room at the
    // reference width (measured: 9.4 px).
    expect(smallestGapPx(spec)).toBeGreaterThan(4);
    // Without it, «80°» lands on the «2» in panel ②: the smallest gap is 0 px
    // at 750, 799 and 1 000 px. The override is load-bearing, not decoration.
    expect(smallestGapPx({ ...spec, labelScale: undefined })).toBeLessThan(1);
  });

  it('renders the three families at their own font sizes, not one blanket size', () => {
    const seen = new Set<string>();
    for (const [name, spec] of Object.entries(everySpec)) {
      const { container, unmount } = render(
        <CongruenceFigure
          spec={
            {
              kind: 'constructed',
              origin: 'authored',
              renderer: 'congruence-figure',
              id: 'typography-fixture',
              alt: 'شكل للتحقق من أحجام الحروف',
              construction: spec as unknown as Record<string, unknown>,
            } satisfies ConstructedDiagram
          }
        />,
      );
      const sizes = Array.from(container.querySelectorAll('svg text')).map((node) =>
        Number(node.getAttribute('font-size')),
      );
      expect(sizes.length, `${name}: no labels`).toBeGreaterThan(0);
      for (const size of sizes) seen.add(size.toFixed(4));
      unmount();
    }
    // Four roles exist and at least three of them appear somewhere: the old
    // renderer used one size (plus its 0.9 derivative) everywhere.
    expect(seen.size).toBeGreaterThanOrEqual(3);
  });
});

describe('labels never sit on the drawing', () => {
  it.each(Object.entries(everySpec))('%s: no label touches ink', (name, spec) => {
    const { typography, labels } = labelBoxes(spec);
    const obstacles = collectObstacles(spec, typography.tick, typography.arcRadius);
    for (const label of labels) {
      const box = rectFromCentre(label.centre, label.width, label.height);
      // A tenth of the stroke width of tolerance: a glyph may sit *beside* a
      // line, never on it.
      const padded = inflate(box, typography.stroke * 0.9 - 1e-9);
      const hits = obstacles.filter((obstacle) => segmentHitsRect(obstacle.a, obstacle.b, padded));
      expect(hits.length, `${name}: «${label.text}» touches ${hits.length} line(s)`).toBe(0);
      expect(label.crowded, `${name}: «${label.text}» could not be placed`).toBe(false);
    }
  });

  it.each(Object.entries(everySpec))('%s: no two labels touch', (name, spec) => {
    const { labels } = labelBoxes(spec);
    for (let i = 0; i < labels.length; i += 1) {
      for (let j = i + 1; j < labels.length; j += 1) {
        const a = rectFromCentre(labels[i]!.centre, labels[i]!.width, labels[i]!.height);
        const b = rectFromCentre(labels[j]!.centre, labels[j]!.width, labels[j]!.height);
        expect(
          rectDistance(a, b),
          `${name}: «${labels[i]!.text}» touches «${labels[j]!.text}»`,
        ).toBeGreaterThan(0.02);
      }
    }
  });

  it.each(Object.entries(everySpec))('%s: labels stay inside their panel', (name, spec) => {
    const { labels } = labelBoxes(spec);
    const view = spec.viewBox;
    const whole = {
      x1: view.x,
      y1: view.y,
      x2: view.x + view.w,
      y2: view.y + view.h,
    };
    for (const label of labels) {
      const box = rectFromCentre(label.centre, label.width, label.height);
      const frame = (spec.frames ?? []).find((entry) =>
        rectContainsRect(frameInnerRect(entry, 0), box),
      );
      const bounds = frame ? frameInnerRect(frame, 0) : whole;
      expect(rectContainsRect(bounds, box), `${name}: «${label.text}» leaves its panel`).toBe(true);
    }
  });

  it.each(Object.entries(everySpec))('%s: a label stays near its own element', (name, spec) => {
    const { typography, labels } = labelBoxes(spec);
    // Vertex letters and measurement values must remain readable as belonging
    // to their own vertex / side: the search may nudge them, never exile them.
    // `computeLabelLayout` emits the vertex letters first, in `spec.points`
    // order, so the pairing below is positional (a figure may well have three
    // vertices called A, one per panel).
    const points = spec.points ?? [];
    for (const [index, point] of points.entries()) {
      const label = labels[index];
      if (!label) continue;
      const distance = Math.hypot(label.centre[0] - point.at[0], label.centre[1] - point.at[1]);
      // At a bare corner this is ~1 glyph; at a crossing (the kite's E, with
      // four lines through it) the letter needs two.
      expect(
        distance / typography.vertex,
        `${name}: «${label.text}» drifted away from its vertex`,
      ).toBeLessThan(2);
    }
  });
});

describe('the defects the previous revision shipped', () => {
  it('keeps M off the median AM in example ①', () => {
    const spec = figures['fig-18-example-sas']!;
    const { labels } = labelBoxes(spec);
    const m = labels.find((label) => label.text === 'M')!;
    // A is the apex, M the midpoint of [AE]: the letter used to sit on [AM].
    const box = rectFromCentre(m.centre, m.width, m.height);
    expect(segmentHitsRect([3.0, 6.6], [7.6, 3.6], box)).toBe(false);
  });

  it('keeps D off [FC] and B off [EA] in example ②', () => {
    const spec = figures['fig-18-example-asa']!;
    const { labels } = labelBoxes(spec);
    for (const [text, a, b] of [
      ['D', [8, 4.6], [8, 1.4]],
      ['B', [0, 1.4], [0, 4.6]],
    ] as const) {
      const label = labels.find((entry) => entry.text === text)!;
      const box = rectFromCentre(label.centre, label.width, label.height);
      expect(segmentHitsRect(a, b, box), `${text} sits on its side`).toBe(false);
    }
  });

  it('keeps E and F clear of the legs in the isosceles proof', () => {
    const spec = figures['fig-19-isosceles']!;
    const { labels } = labelBoxes(spec);
    for (const text of ['E', 'F'] as const) {
      const label = labels.find((entry) => entry.text === text)!;
      const box = rectFromCentre(label.centre, label.width, label.height);
      expect(segmentHitsRect([-4.2, 0], [0, 7], box), `${text} on AB`).toBe(false);
      expect(segmentHitsRect([4.2, 0], [0, 7], box), `${text} on AC`).toBe(false);
    }
  });

  it('keeps A′ clear of its own translation arrow', () => {
    const spec = figures['auth-04-translation-intro']!;
    const { labels } = labelBoxes(spec);
    const aPrime = labels.find((label) => label.text === 'A′')!;
    const box = rectFromCentre(aPrime.centre, aPrime.width, aPrime.height);
    const arrow = { a: [1.2, 0.9] as const, b: [5.0, 2.0] as const };
    expect(segmentHitsRect(arrow.a, arrow.b, box)).toBe(false);
  });

  it('never lets a model label grow wider than the shape it names', () => {
    // The old kite figure drew 40 px letters beside 6-unit sides; a letter is
    // now a small fraction of the shortest side in its own figure.
    const spec = figures['fig-19-kite']!;
    const typography = figureTypography(spec);
    expect(typography.vertex / 6).toBeLessThan(0.18);
  });
});
