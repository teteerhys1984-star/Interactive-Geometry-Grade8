/**
 * ============================================================================
 *  FIGURE LAYOUT — where a label may stand
 * ============================================================================
 *
 *  Writing a label at `vertex + 0.62 × fontSize` in the preferred direction is
 *  not placement: it is a guess that only works when the figure happens to be
 *  empty on that side. On the real pages it is empty on almost no side — a
 *  triangle vertex has two sides, a median, a tick and often an arc within one
 *  glyph.
 *
 *  This module places every label properly:
 *
 *    1. every graphic element of the spec becomes an obstacle (sides, polygon
 *       edges, ticks, arcs, right-angle squares, frame borders, arrow shafts);
 *    2. a label is a box derived from its text and font size;
 *    3. the box is tried along the declared direction first, then along every
 *       other direction, at increasing distances, and the first candidate that
 *       touches nothing wins;
 *    4. the search is bounded (the label may not leave its panel, and may not
 *       travel more than a few glyphs away from its own element), and the
 *       scoring prefers the closest, straightest placement.
 *
 *  Everything is deterministic, so a figure always renders identically — which
 *  is what makes the placement testable. Coordinates are mathematical
 *  (y up), like every other figure coordinate in this lesson.
 * ============================================================================
 */

import type { FigureAngle, FigureFrame, FigureSpec, LabelPlace, XY } from './geometryFigure';
import { LABEL_BOX_HEIGHT, textWidth } from './figureTypography';

export interface Rect {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface Obstacle {
  a: XY;
  b: XY;
  /**
   * Optional identity, e.g. `angle:2`. A label may be told to ignore the ink it
   * annotates (an angle's value is drawn beside its own arc), and matching by
   * VALUE would also excuse a different mark that happens to coincide.
   */
  tag?: string;
}

export interface PlacedLabel {
  text: string;
  /** Centre of the label box, mathematical coordinates. */
  centre: XY;
  width: number;
  height: number;
  fontSize: number;
  /** True when nothing at all could be found and the box may touch ink. */
  crowded: boolean;
}

export interface LabelRequest {
  text: string;
  /** Where the label wants to be: its own element (vertex, arc, side…). */
  at: XY;
  fontSize: number;
  /** Preferred compass direction of travel from `at`. */
  place?: LabelPlace;
  /** Preferred direction of travel from `at` (wins over `place`). */
  preferred?: XY;
  /**
   * Horizontal anchor of the declared position, honoured as the starting box
   * before any displacement: `start` means the text begins at `at`.
   */
  anchor?: 'start' | 'middle' | 'end';
  /** Extra clearance around this particular label, in drawing units. */
  clearance?: number;
  /**
   * How far past its declared position this label may wander, in glyph
   * heights (default 3.4). A value that belongs to a specific arc keeps this
   * small: a measure two glyphs from its own angle is ambiguous, so it is
   * better to accept a tight fit than a distant one.
   */
  travel?: number;
  /**
   * Obstacles this particular label is allowed to ignore. An angle's value
   * belongs to its own arc — it is drawn beside that arc on purpose — so it
   * must not be pushed away by it; the sides still constrain it.
   */
  ignore?: string[];
  /**
   * Fixed positions tried before the search, each with its own priority
   * (`cost`, lower wins). Used by angle values, which have a small set of
   * conventional places around their own arc, and by measurement labels,
   * which already know which side of their own segment they belong to.
   */
  preplaced?: { at: XY; cost?: number }[];
}

/* --------------------------------------------------------------------------
 *  Primitive geometry
 * ----------------------------------------------------------------------- */

const normalise = (v: XY): XY => {
  const len = Math.hypot(v[0], v[1]);
  return len < 1e-12 ? [0, 1] : [v[0] / len, v[1] / len];
};

export const PLACE_DIRECTION: Record<LabelPlace, XY> = {
  n: [0, 1],
  s: [0, -1],
  e: [1, 0],
  w: [-1, 0],
  ne: [Math.SQRT1_2, Math.SQRT1_2],
  nw: [-Math.SQRT1_2, Math.SQRT1_2],
  se: [Math.SQRT1_2, -Math.SQRT1_2],
  sw: [-Math.SQRT1_2, -Math.SQRT1_2],
};

export const rectFromCentre = (centre: XY, width: number, height: number): Rect => ({
  x1: centre[0] - width / 2,
  y1: centre[1] - height / 2,
  x2: centre[0] + width / 2,
  y2: centre[1] + height / 2,
});

export function rectsOverlap(a: Rect, b: Rect, gap = 0): boolean {
  return !(a.x2 + gap <= b.x1 || b.x2 + gap <= a.x1 || a.y2 + gap <= b.y1 || b.y2 + gap <= a.y1);
}

export const rectContains = (rect: Rect, p: XY): boolean =>
  p[0] >= rect.x1 && p[0] <= rect.x2 && p[1] >= rect.y1 && p[1] <= rect.y2;

export const rectContainsRect = (outer: Rect, inner: Rect): boolean =>
  inner.x1 >= outer.x1 && inner.x2 <= outer.x2 && inner.y1 >= outer.y1 && inner.y2 <= outer.y2;

export function inflate(rect: Rect, by: number): Rect {
  return { x1: rect.x1 - by, y1: rect.y1 - by, x2: rect.x2 + by, y2: rect.y2 + by };
}

/** Does the segment `a→b` touch `rect`? (Liang–Barsky clipping.) */
export function segmentHitsRect(a: XY, b: XY, rect: Rect): boolean {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  let t0 = 0;
  let t1 = 1;
  const edges: [number, number][] = [
    [-dx, a[0] - rect.x1],
    [dx, rect.x2 - a[0]],
    [-dy, a[1] - rect.y1],
    [dy, rect.y2 - a[1]],
  ];
  for (const [p, q] of edges) {
    if (Math.abs(p) < 1e-12) {
      if (q < 0) return false;
      continue;
    }
    const r = q / p;
    if (p < 0) {
      if (r > t1) return false;
      if (r > t0) t0 = r;
    } else {
      if (r < t0) return false;
      if (r < t1) t1 = r;
    }
  }
  return t0 <= t1;
}

/** Shortest distance between two boxes (0 when they overlap). */
export function rectDistance(a: Rect, b: Rect): number {
  const dx = Math.max(0, Math.max(a.x1 - b.x2, b.x1 - a.x2));
  const dy = Math.max(0, Math.max(a.y1 - b.y2, b.y1 - a.y2));
  return Math.hypot(dx, dy);
}

/* --------------------------------------------------------------------------
 *  Obstacles
 * ----------------------------------------------------------------------- */

/** Radius of an angle arc as it is actually drawn (mirrors FigureSvg). */
const arcRadius = (angle: FigureAngle, fallback: number) => angle.radius ?? fallback;

/**
 * The polyline an angle mark draws, as segments. Kept identical to the drawing
 * code so a label can never sit on an arc it is supposed to sit beside.
 */
export function angleMarkSegments(
  angle: FigureAngle,
  fallbackRadius: number,
  steps = 22,
): Obstacle[] {
  const radius = arcRadius(angle, fallbackRadius);
  const first = normalise([angle.from[0] - angle.at[0], angle.from[1] - angle.at[1]]);
  const second = normalise([angle.to[0] - angle.at[0], angle.to[1] - angle.at[1]]);

  if (angle.right) {
    const corner: XY = [
      angle.at[0] + (first[0] + second[0]) * radius,
      angle.at[1] + (first[1] + second[1]) * radius,
    ];
    const p1: XY = [angle.at[0] + first[0] * radius, angle.at[1] + first[1] * radius];
    const p2: XY = [angle.at[0] + second[0] * radius, angle.at[1] + second[1] * radius];
    return [
      { a: p1, b: corner },
      { a: corner, b: p2 },
    ];
  }

  const start = Math.atan2(first[1], first[0]);
  const end = Math.atan2(second[1], second[0]);
  let delta = end - start;
  while (delta > Math.PI) delta -= 2 * Math.PI;
  while (delta < -Math.PI) delta += 2 * Math.PI;

  const segments: Obstacle[] = [];
  let previous: XY = [
    angle.at[0] + Math.cos(start) * radius,
    angle.at[1] + Math.sin(start) * radius,
  ];
  for (let step = 1; step <= steps; step += 1) {
    const value = start + (delta * step) / steps;
    const point: XY = [
      angle.at[0] + Math.cos(value) * radius,
      angle.at[1] + Math.sin(value) * radius,
    ];
    segments.push({ a: previous, b: point });
    previous = point;
  }
  return segments;
}

/** Midpoint of a segment and its unit normal — the axis a value label sits on. */
export function segmentFrame(a: XY, b: XY) {
  const along = normalise([b[0] - a[0], b[1] - a[1]]);
  const across: XY = [-along[1], along[0]];
  return { mid: [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2] as XY, along, across };
}

/**
 * Every piece of ink in a spec, as segments. `arcRadius` must be the radius the
 * renderer actually draws with: the caller's list of ignored obstacles is
 * matched by identity, so a different fallback radius here would silently keep
 * the arc in the way of its own label.
 */
export function collectObstacles(spec: FigureSpec, tick: number, arcRadius = 16): Obstacle[] {
  const obstacles: Obstacle[] = [];

  for (const polygon of spec.polygons ?? []) {
    const points = polygon.points;
    for (let index = 0; index < points.length; index += 1) {
      obstacles.push({ a: points[index]!, b: points[(index + 1) % points.length]! });
    }
  }

  for (const segment of spec.segments ?? []) {
    obstacles.push({ a: segment.from, b: segment.to });
    const count = segment.ticks ?? 0;
    if (count > 0) {
      const { mid, along, across } = segmentFrame(segment.from, segment.to);
      for (let index = 0; index < count; index += 1) {
        const offset = (index - (count - 1) / 2) * tick * 1.5;
        const centre: XY = [mid[0] + along[0] * offset, mid[1] + along[1] * offset];
        obstacles.push({
          a: [centre[0] - across[0] * tick, centre[1] - across[1] * tick],
          b: [centre[0] + across[0] * tick, centre[1] + across[1] * tick],
        });
      }
    }
  }

  (spec.angles ?? []).forEach((angle, index) => {
    // The drawn arc keeps its own radius when the figure asks for one; the
    // obstacle must be the arc that is actually on the paper, or a label would
    // be placed to clear an arc that is not there.
    const radius = Math.min(angle.radius ?? arcRadius, arcRadius);
    for (const mark of angleMarkSegments(angle, radius)) {
      obstacles.push({ ...mark, tag: `angle:${index}` });
    }
  });

  for (const frame of spec.frames ?? []) {
    frameEdges(frame).forEach((edge) => obstacles.push(edge));
  }

  return obstacles;
}

export function frameEdges(frame: FigureFrame): Obstacle[] {
  const { x, y, w, h } = frame;
  const corners: XY[] = [
    [x, y],
    [x + w, y],
    [x + w, y + h],
    [x, y + h],
  ];
  return corners.map((corner, index) => ({ a: corner, b: corners[(index + 1) % 4]! }));
}

/** Inner rectangle of a frame: where a label of that panel may stand. */
export function frameInnerRect(frame: FigureFrame, inset: number): Rect {
  return {
    x1: frame.x + inset,
    y1: frame.y + inset,
    x2: frame.x + frame.w - inset,
    y2: frame.y + frame.h - inset,
  };
}

/* --------------------------------------------------------------------------
 *  Placement
 * ----------------------------------------------------------------------- */

/**
 * Cost added to every position the generic search invents, so a conventional
 * position (inside the angle's mouth, beside its arc) always wins when it is
 * free — the search is the safety net, not the designer.
 */
const GENERIC_COST = 12;

/** 16 directions, ordered by deviation from any preferred one. */
const DIRECTIONS: XY[] = Array.from({ length: 16 }, (_, index) => {
  const angle = (index * Math.PI) / 8;
  return [Math.cos(angle), Math.sin(angle)] as XY;
});

function boundsFor(at: XY, spec: FigureSpec, fallback: Rect, inset: number): Rect {
  for (const frame of spec.frames ?? []) {
    const inner = frameInnerRect(frame, 0);
    if (rectContains(inner, at)) return frameInnerRect(frame, inset);
  }
  return inflate(fallback, -inset);
}

/** Half-extent of a box along a unit direction. */
const halfExtent = (width: number, height: number, direction: XY): number =>
  (width / 2) * Math.abs(direction[0]) + (height / 2) * Math.abs(direction[1]);

export interface PlacementOptions {
  /** Line/obstacle clearance, drawing units. */
  inkClearance: number;
  /** Space kept between two labels. */
  labelGap: number;
  /** How far past the minimum distance a label may travel (glyph multiples). */
  maxTravel: number;
}

export function placeLabels(
  requests: LabelRequest[],
  obstacles: Obstacle[],
  spec: FigureSpec,
  options: PlacementOptions,
): PlacedLabel[] {
  const view = spec.viewBox;
  const whole: Rect = { x1: view.x, y1: view.y, x2: view.x + view.w, y2: view.y + view.h };
  const placed: PlacedLabel[] = [];
  const boxes: Rect[] = [];

  for (const request of requests) {
    const height = request.fontSize * LABEL_BOX_HEIGHT;
    const width = textWidth(request.text, request.fontSize);
    const clearance = options.inkClearance + (request.clearance ?? 0);
    const bounds = boundsFor(request.at, spec, whole, options.labelGap);

    const preferred = request.preferred
      ? normalise(request.preferred)
      : request.place
        ? PLACE_DIRECTION[request.place]
        : ([0, 1] as XY);
    const anchorShift =
      request.anchor === 'start' ? width / 2 : request.anchor === 'end' ? -width / 2 : 0;
    const startDistance = halfExtent(width, height, preferred) + clearance + height * 0.12;
    const step = Math.max(height * 0.4, clearance);
    const travelLimit = height * (request.travel ?? options.maxTravel);

    const candidates: { centre: XY; cost: number }[] = [];
    const pushCandidate = (centre: XY, direction: XY, distance: number) => {
      const deviation = Math.acos(
        Math.max(-1, Math.min(1, direction[0] * preferred[0] + direction[1] * preferred[1])),
      );
      const cost = distance + deviation * height * 0.95 + GENERIC_COST;
      candidates.push({ centre, cost });
    };

    let preIndex = 0;
    for (const entry of request.preplaced ?? []) {
      const offset = entry.at;
      const weight = entry.cost ?? Math.hypot(offset[0], offset[1]);
      const centre: XY = [request.at[0] + offset[0] + anchorShift, request.at[1] + offset[1]];
      candidates.push({ centre, cost: weight + preIndex * 1e-3 });
      preIndex += 1;
    }

    const ordered = [...DIRECTIONS].sort((first, second) => {
      const dot = (d: XY) => d[0] * preferred[0] + d[1] * preferred[1];
      return dot(second) - dot(first);
    });

    for (const direction of ordered) {
      for (
        let distance = startDistance;
        distance <= startDistance + travelLimit;
        distance += step
      ) {
        pushCandidate(
          [
            request.at[0] + anchorShift + direction[0] * distance,
            request.at[1] + direction[1] * distance,
          ],
          direction,
          distance,
        );
      }
    }

    let best: PlacedLabel | null = null;
    let bestCost = Number.POSITIVE_INFINITY;
    let fallback: { label: PlacedLabel; cost: number } | null = null;
    const ignored = new Set(request.ignore ?? []);
    const relevant =
      ignored.size === 0 ? obstacles : obstacles.filter((o) => !(o.tag && ignored.has(o.tag)));

    for (const candidate of candidates) {
      const box = rectFromCentre(candidate.centre, width, height);
      const inside = rectContainsRect(bounds, box);

      let collisions = 0;
      for (const obstacle of relevant) {
        if (segmentHitsRect(obstacle.a, obstacle.b, inflate(box, clearance))) collisions += 1;
      }
      for (const other of boxes) {
        if (rectsOverlap(inflate(box, options.labelGap), other)) collisions += 1;
      }

      const label: PlacedLabel = {
        text: request.text,
        centre: candidate.centre,
        width,
        height,
        fontSize: request.fontSize,
        crowded: false,
      };

      if (inside && collisions === 0) {
        if (candidate.cost < bestCost) {
          best = label;
          bestCost = candidate.cost;
        }
      } else if (!inside && collisions === 0) {
        // Out of the panel: acceptable only if nothing better exists.
        const cost = candidate.cost + 1000;
        if (!fallback || cost < fallback.cost) fallback = { label, cost };
      } else {
        const cost = candidate.cost + 400 * collisions + (inside ? 0 : 1000);
        if (!fallback || cost < fallback.cost)
          fallback = { label: { ...label, crowded: true }, cost };
      }
    }

    const chosen = best ??
      fallback?.label ?? {
        text: request.text,
        centre: [request.at[0] + anchorShift, request.at[1]] as XY,
        width,
        height,
        fontSize: request.fontSize,
        crowded: true,
      };
    placed.push(chosen);
    boxes.push(rectFromCentre(chosen.centre, chosen.width, chosen.height));
  }

  return placed;
}

/** Ideal anchor of an angle value: on the bisector, just outside the arc. */
export function angleLabelAnchor(angle: FigureAngle, radius: number): XY {
  const first = normalise([angle.from[0] - angle.at[0], angle.from[1] - angle.at[1]]);
  const second = normalise([angle.to[0] - angle.at[0], angle.to[1] - angle.at[1]]);
  const start = Math.atan2(first[1], first[0]);
  const end = Math.atan2(second[1], second[0]);
  let delta = end - start;
  while (delta > Math.PI) delta -= 2 * Math.PI;
  while (delta < -Math.PI) delta += 2 * Math.PI;
  const bisector = start + delta / 2;
  return [angle.at[0] + Math.cos(bisector) * radius, angle.at[1] + Math.sin(bisector) * radius];
}

/**
 * Conventional places for the value of one angle, cheapest first.
 *
 * All returned points are OFFSETS from the angle's vertex (the renderer applies
 * them to the request position).
 *
 *   1. inside the angle's mouth, walking outward from the arc along the
 *      bisector — the textbook position. Walking outward is what makes a
 *      narrow angle work: the mouth widens with distance, so a 35° wedge holds
 *      its value a little further from the vertex, while an 85° wedge holds it
 *      right beside the arc;
 *   2. just OUTSIDE the mouth, beside each end of the arc, when even the widest
 *      in-mouth position is occupied (a vertex shared by four lines, say).
 *
 * The angular offset of group 2 is computed from the label's own half-width,
 * not guessed: sitting a fixed 20° off the bisector leaves the text inside the
 * wedge again as soon as the wedge is wider than that.
 */
export function angleLabelCandidates(
  angle: FigureAngle,
  radius: number,
  fontSize: number,
  width = fontSize * 1.2,
  height = fontSize * LABEL_BOX_HEIGHT,
): { at: XY; cost: number }[] {
  const first = normalise([angle.from[0] - angle.at[0], angle.from[1] - angle.at[1]]);
  const second = normalise([angle.to[0] - angle.at[0], angle.to[1] - angle.at[1]]);
  const start = Math.atan2(first[1], first[0]);
  const end = Math.atan2(second[1], second[0]);
  let delta = end - start;
  while (delta > Math.PI) delta -= 2 * Math.PI;
  while (delta < -Math.PI) delta += 2 * Math.PI;
  const bisector = start + delta / 2;
  const half = Math.abs(delta) / 2;

  const offset = (direction: number, distance: number): XY => [
    Math.cos(direction) * distance,
    Math.sin(direction) * distance,
  ];
  const extent = (direction: number) => {
    const directionVector: XY = [Math.cos(direction), Math.sin(direction)];
    return halfExtent(width, height, directionVector);
  };

  const candidates: { at: XY; cost: number }[] = [];
  const gap = fontSize * 0.22;

  // 1. Inside the mouth, walking outward from the arc along the bisector. The
  //    box's own extent is what decides where the text starts, so the value
  //    sits clear of the arc instead of on top of it.
  const startDistance = Math.max(
    radius + extent(bisector) + gap,
    (width / 2 + gap) / Math.max(Math.sin(half), 0.25) + gap,
  );
  //    Three tries is deliberate: in a small triangle the mouth runs out of
  //    room after about a glyph, and a value pushed further would end up beyond
  //    the opposite side — detached from the arc it measures. Past that, the
  //    "beside the arc" positions below take over.
  for (let index = 0; index < 3; index += 1) {
    const distance = startDistance + index * (height * 0.75);
    candidates.push({ at: offset(bisector, distance), cost: 0.4 + index * 0.25 });
  }

  // 2. Beside each end of the arc, OUTSIDE the mouth — the textbook place for
  //    the value of a narrow angle, where the wedge itself is too thin to hold
  //    a number. Sitting beyond the arc keeps the value attached to the angle
  //    it measures (and therefore to the right vertex) without touching either
  //    side.
  const sides = delta >= 0 ? [1, -1] : [-1, 1];
  for (const side of sides) {
    for (const [index, distance] of [1, 1.9].entries()) {
      const reach = radius * distance + extent(bisector) + gap;
      const clearanceAngle = Math.asin(
        Math.min(0.9, (extent(bisector) + gap) / Math.max(reach, 1e-6)),
      );
      const direction = bisector + side * (half + clearanceAngle + 0.08);
      candidates.push({ at: offset(direction, reach), cost: 2 + index * 0.2 });
    }
  }

  // 3. Outside the VERTEX, on the far side of the mouth: the fallback when even
  //    the arc's flanks are occupied. The box's near edge — not its centre — is
  //    what clears the vertex, so the value never drifts off the figure.
  const outward = bisector + Math.PI;
  for (let index = 0; index < 2; index += 1) {
    const distance = extent(outward) + gap * 1.6 + index * height * 0.8;
    candidates.push({ at: offset(outward, distance), cost: 3.2 + index * 0.3 });
  }

  return candidates;
}

/**
 * Distance from `at` to the closest obstacle, along the segment — used by the
 * tests as an objective measure of "the label is off the ink".
 */
export function boxClearsObstacles(
  label: PlacedLabel,
  obstacles: Obstacle[],
  clearance: number,
): boolean {
  const box = rectFromCentre(label.centre, label.width, label.height);
  const padded = inflate(box, clearance);
  return obstacles.every((obstacle) => !segmentHitsRect(obstacle.a, obstacle.b, padded));
}

/** Distance from a label box to the nearest other label box (0 when touching). */
export function labelGap(first: PlacedLabel, second: PlacedLabel): number {
  return rectDistance(
    rectFromCentre(first.centre, first.width, first.height),
    rectFromCentre(second.centre, second.width, second.height),
  );
}
