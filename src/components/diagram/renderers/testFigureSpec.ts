import { z } from 'zod';

/**
 * ============================================================================
 *  TEST FIGURE — DECLARATIVE SCENE
 * ============================================================================
 *
 *  A test question that needs a drawing declares a SCENE of mathematically
 *  exact points, and every other element (segment, polygon, circle, angle mark)
 *  references those points by name. The renderer therefore draws exactly the
 *  geometry the question states — a mismatch between the wording and the figure
 *  is impossible by construction.
 *
 *  Coordinates are ordinary mathematical coordinates: x to the right, y UP.
 *  The renderer flips y for SVG while keeping one equal scale on both axes, so
 *  the picture is never distorted (a square stays a square).
 *
 *  This is a TEST-ONLY figure format. It does not reproduce textbook figures —
 *  those keep their own rules (see docs/LESSON-0X-FIGURES.md).
 * ============================================================================
 */

export const TEST_FIGURE_RENDERER = 'test-geometry-figure';

export const testFigurePointSchema = z.object({
  /** Reference name inside the scene, e.g. "A" or "M2". */
  id: z.string().min(1),
  x: z.number(),
  y: z.number(),
  /** Displayed label; defaults to `id`. */
  label: z.string().min(1).optional(),
  mark: z.enum(['dot', 'open', 'cross', 'none']).optional(),
  labelSide: z.enum(['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw']).optional(),
});

export const testFigureSegmentSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  dashed: z.boolean().optional(),
  arrow: z.enum(['none', 'end', 'both']).optional(),
});

export const testFigurePolygonSchema = z.object({
  points: z.array(z.string().min(1)).min(3),
  fill: z.boolean().optional(),
});

export const testFigureCircleSchema = z.object({
  /** Id of the point that is the centre. */
  center: z.string().min(1),
  radius: z.number().positive(),
  dashed: z.boolean().optional(),
});

export const testFigureAngleSchema = z.object({
  /** Vertex. */
  at: z.string().min(1),
  from: z.string().min(1),
  to: z.string().min(1),
  /** Equality tick marks on the arc: 1, 2 or 3. */
  ticks: z.union([z.literal(1), z.literal(2), z.literal(3)]).optional(),
});

export const testFigureRightAngleSchema = z.object({
  at: z.string().min(1),
  from: z.string().min(1),
  to: z.string().min(1),
});

export const testFigureSpecSchema = z.object({
  /** Square grid covering the integer range, drawn faintly. */
  grid: z
    .object({
      minX: z.number().int(),
      maxX: z.number().int(),
      minY: z.number().int(),
      maxY: z.number().int(),
    })
    .optional(),
  points: z.array(testFigurePointSchema).min(1),
  segments: z.array(testFigureSegmentSchema).optional(),
  polygons: z.array(testFigurePolygonSchema).optional(),
  circles: z.array(testFigureCircleSchema).optional(),
  angles: z.array(testFigureAngleSchema).optional(),
  rightAngles: z.array(testFigureRightAngleSchema).optional(),
});

export type TestFigureSpec = z.infer<typeof testFigureSpecSchema>;
export type TestFigurePoint = z.infer<typeof testFigurePointSchema>;

export interface SceneBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

/**
 * Outer bounds of everything in the scene, used to size the viewBox.
 * Returns `undefined` for an empty scene.
 */
export function sceneBounds(spec: TestFigureSpec): SceneBounds | undefined {
  let minX = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;

  const include = (x: number, y: number) => {
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  };

  for (const point of spec.points) include(point.x, point.y);
  for (const circle of spec.circles ?? []) {
    const center = spec.points.find((point) => point.id === circle.center);
    if (!center) continue;
    include(center.x - circle.radius, center.y - circle.radius);
    include(center.x + circle.radius, center.y + circle.radius);
  }
  if (spec.grid) {
    include(spec.grid.minX, spec.grid.minY);
    include(spec.grid.maxX, spec.grid.maxY);
  }

  if (!Number.isFinite(minX)) return undefined;
  return { minX, maxX, minY, maxY };
}

/** Coordinates of one scene point, by id. */
export function pointById(spec: TestFigureSpec, id: string): TestFigurePoint | undefined {
  return spec.points.find((point) => point.id === id);
}
