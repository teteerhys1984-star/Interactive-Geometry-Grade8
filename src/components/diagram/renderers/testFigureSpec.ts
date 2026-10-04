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
 *  Coordinates are renderer layout coordinates (x right, y up), not question
 *  data unless a question explicitly supplies a grid. Unmeasured scenes are
 *  labelled as schematic in their caption and never presented as to scale.
 *  The renderer flips y for SVG while keeping one equal scale on both axes.
 *
 *  This is a TEST-ONLY figure format. It does not reproduce textbook figures —
 *  those keep their own rules (see docs/LESSON-0X-FIGURES.md).
 * ============================================================================
 */

const finiteNumber = z.number().finite();

export const TEST_FIGURE_RENDERER = 'test-geometry-figure';

export const testFigurePointSchema = z.object({
  /** Internal reference name, e.g. "A" or "candidate-upper". */
  id: z.string().min(1),
  x: finiteNumber,
  y: finiteNumber,
  /** Displayed label; defaults to `id` unless `showLabel` is false. */
  label: z.string().min(1).optional(),
  showLabel: z.boolean().default(true),
  mark: z.enum(['dot', 'open', 'cross', 'none']).optional(),
  labelSide: z.enum(['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw']).optional(),
});

export const testFigureSegmentSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  dashed: z.boolean().optional(),
  arrow: z.enum(['none', 'end', 'both']).optional(),
  /** Equal-segment marks; use only for equalities stated in the question. */
  ticks: z.union([z.literal(1), z.literal(2), z.literal(3)]).optional(),
});

export const testFigurePolygonSchema = z.object({
  points: z.array(z.string().min(1)).min(3),
  fill: z.boolean().optional(),
});

export const testFigureCircleSchema = z.object({
  /** Id of the point that is the centre. */
  center: z.string().min(1),
  radius: finiteNumber.positive(),
  dashed: z.boolean().optional(),
});

export const testFigureAngleSchema = z.object({
  /** Vertex. */
  at: z.string().min(1),
  from: z.string().min(1),
  to: z.string().min(1),
  /** Equality ticks on the arc. No ticks means a plain, non-equality arc. */
  ticks: z.union([z.literal(1), z.literal(2), z.literal(3)]).optional(),
});

export const testFigureRightAngleSchema = z.object({
  at: z.string().min(1),
  from: z.string().min(1),
  to: z.string().min(1),
});

export const testFigureAnnotationSchema = z.object({
  x: finiteNumber,
  y: finiteNumber,
  /** Plain, LTR geometry notation such as "35°" or "15 cm²". */
  text: z.string().min(1),
  anchor: z.enum(['start', 'middle', 'end']).default('middle'),
});

const testFigureSpecBaseSchema = z.object({
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
  annotations: z.array(testFigureAnnotationSchema).optional(),
  /** Visible geometry labels that must also occur in the question stem. */
  questionLabels: z.array(z.string().min(1)).default([]),
});

export const testFigureSpecSchema = testFigureSpecBaseSchema.superRefine((scene, context) => {
  const pointsById = new Map(scene.points.map((point) => [point.id, point]));
  if (pointsById.size !== scene.points.length) {
    context.addIssue({ code: 'custom', path: ['points'], message: 'point ids must be unique' });
  }

  const pointAt = (id: string, path: (string | number)[]) => {
    const point = pointsById.get(id);
    if (!point) {
      context.addIssue({ code: 'custom', path, message: `unknown point reference "${id}"` });
    }
    return point;
  };

  const hasGeometry = Boolean(
    scene.grid?.maxX !== undefined ||
    scene.segments?.length ||
    scene.polygons?.length ||
    scene.circles?.length ||
    scene.angles?.length ||
    scene.rightAngles?.length,
  );
  if (!hasGeometry) {
    context.addIssue({
      code: 'custom',
      path: [],
      message: 'a figure must contain at least one geometric primitive',
    });
  }

  if (scene.grid && (scene.grid.minX >= scene.grid.maxX || scene.grid.minY >= scene.grid.maxY)) {
    context.addIssue({
      code: 'custom',
      path: ['grid'],
      message: 'grid minimums must be smaller than maximums',
    });
  }

  for (const [index, segment] of (scene.segments ?? []).entries()) {
    const from = pointAt(segment.from, ['segments', index, 'from']);
    const to = pointAt(segment.to, ['segments', index, 'to']);
    if (from && to && from.x === to.x && from.y === to.y) {
      context.addIssue({
        code: 'custom',
        path: ['segments', index],
        message: 'a segment must have non-zero length',
      });
    }
  }

  for (const [index, polygon] of (scene.polygons ?? []).entries()) {
    const points = polygon.points.map((id, pointIndex) =>
      pointAt(id, ['polygons', index, 'points', pointIndex]),
    );
    if (new Set(polygon.points).size !== polygon.points.length) {
      context.addIssue({
        code: 'custom',
        path: ['polygons', index, 'points'],
        message: 'a polygon cannot repeat a vertex',
      });
    }
    if (points.every(isDefinedPoint) && Math.abs(signedArea(points)) < 1e-9) {
      context.addIssue({
        code: 'custom',
        path: ['polygons', index],
        message: 'a polygon must have non-zero area',
      });
    }
  }

  for (const [index, circle] of (scene.circles ?? []).entries()) {
    pointAt(circle.center, ['circles', index, 'center']);
  }

  for (const [index, angle] of (scene.angles ?? []).entries()) {
    const vertex = pointAt(angle.at, ['angles', index, 'at']);
    const first = pointAt(angle.from, ['angles', index, 'from']);
    const second = pointAt(angle.to, ['angles', index, 'to']);
    if (vertex && first && second && isCollinear(vertex, first, second)) {
      context.addIssue({
        code: 'custom',
        path: ['angles', index],
        message: 'an angle arc needs two non-collinear rays',
      });
    }
  }

  for (const [index, mark] of (scene.rightAngles ?? []).entries()) {
    const vertex = pointAt(mark.at, ['rightAngles', index, 'at']);
    const first = pointAt(mark.from, ['rightAngles', index, 'from']);
    const second = pointAt(mark.to, ['rightAngles', index, 'to']);
    if (vertex && first && second) {
      const firstVector = { x: first.x - vertex.x, y: first.y - vertex.y };
      const secondVector = { x: second.x - vertex.x, y: second.y - vertex.y };
      const dot = firstVector.x * secondVector.x + firstVector.y * secondVector.y;
      const scale =
        Math.hypot(firstVector.x, firstVector.y) * Math.hypot(secondVector.x, secondVector.y);
      if (scale === 0 || Math.abs(dot) > scale * 1e-8) {
        context.addIssue({
          code: 'custom',
          path: ['rightAngles', index],
          message: 'a right-angle mark must be geometrically perpendicular',
        });
      }
    }
  }

  const visibleLabelList = scene.points
    .filter((point) => point.showLabel)
    .map((point) => point.label ?? point.id);
  const visibleLabels = new Set(visibleLabelList);
  const declaredLabels = new Set(scene.questionLabels);
  if (visibleLabels.size !== visibleLabelList.length) {
    context.addIssue({
      code: 'custom',
      path: ['points'],
      message: 'visible point labels must be unique',
    });
  }
  if (
    visibleLabels.size !== declaredLabels.size ||
    [...visibleLabels].some((label) => !declaredLabels.has(label))
  ) {
    context.addIssue({
      code: 'custom',
      path: ['questionLabels'],
      message: 'questionLabels must exactly match the visible point labels',
    });
  }
  if (declaredLabels.size !== scene.questionLabels.length) {
    context.addIssue({
      code: 'custom',
      path: ['questionLabels'],
      message: 'questionLabels must be unique',
    });
  }
});

export type TestFigureSpec = z.input<typeof testFigureSpecSchema>;
export type ParsedTestFigureSpec = z.output<typeof testFigureSpecSchema>;
export type TestFigurePoint = z.output<typeof testFigurePointSchema>;
export type TestFigureAnnotation = z.output<typeof testFigureAnnotationSchema>;

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
export function sceneBounds(spec: ParsedTestFigureSpec): SceneBounds | undefined {
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
    if (center) {
      include(center.x - circle.radius, center.y - circle.radius);
      include(center.x + circle.radius, center.y + circle.radius);
    }
  }
  for (const annotation of spec.annotations ?? []) include(annotation.x, annotation.y);
  if (spec.grid) {
    include(spec.grid.minX, spec.grid.minY);
    include(spec.grid.maxX, spec.grid.maxY);
  }

  if (!Number.isFinite(minX)) return undefined;
  return { minX, maxX, minY, maxY };
}

/** Coordinates of one scene point, by id. */
export function pointById(spec: ParsedTestFigureSpec, id: string): TestFigurePoint | undefined {
  return spec.points.find((point) => point.id === id);
}

function signedArea(points: TestFigurePoint[]): number {
  return (
    points.reduce((area, point, index) => {
      const next = points[(index + 1) % points.length];
      return next ? area + point.x * next.y - next.x * point.y : area;
    }, 0) / 2
  );
}

function isCollinear(
  vertex: TestFigurePoint,
  first: TestFigurePoint,
  second: TestFigurePoint,
): boolean {
  const ax = first.x - vertex.x;
  const ay = first.y - vertex.y;
  const bx = second.x - vertex.x;
  const by = second.y - vertex.y;
  return Math.abs(ax * by - ay * bx) < 1e-9;
}

function isDefinedPoint(point: TestFigurePoint | undefined): point is TestFigurePoint {
  return point !== undefined;
}
