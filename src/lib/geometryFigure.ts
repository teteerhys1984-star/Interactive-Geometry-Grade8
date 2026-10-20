/**
 * ============================================================================
 *  GEOMETRY FIGURE SPEC — the declarative contract for Lesson 4's drawings
 * ============================================================================
 *
 *  Lesson 4 is the first lesson whose subject matter is *triangles themselves*,
 *  so it needs a small set of primitives that Lessons 1–3 never needed:
 *  polygons, marked segments (one / two ticks for equal lengths), angle arcs,
 *  right-angle squares, dashed construction lines and lettered points.
 *
 *  The contract is deliberately narrow: it describes a PLANE FIGURE in
 *  mathematical coordinates (y up) and nothing else. It cannot express a
 *  transformation or a proof — those live in the lab components, which compute
 *  with `lesson-04-geometry.ts` and draw through the same renderer.
 *
 *  `readFigureSpec` is the runtime guard: malformed data returns `null` and the
 *  figure degrades to nothing rather than to a wrong drawing (the same contract
 *  the Lesson 2 labs follow).
 * ============================================================================
 */

export type XY = readonly [number, number];

/** Ink meanings, mapped to lesson-theme colours by the renderer. */
export type FigureTone =
  | 'ink' // given figure, normal ink
  | 'given' // a datum the student is handed (length / angle used in the case)
  | 'image' // the image of a figure under a translation
  | 'aux' // auxiliary / dashed construction
  | 'mark'; // equality or right-angle mark

export type LabelPlace = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

export interface FigurePoint {
  at: XY;
  label: string;
  place?: LabelPlace;
  tone?: FigureTone;
  /** Draw the solid dot (printed vertices are dotted). Default true. */
  dot?: boolean;
}

export interface FigureSegment {
  from: XY;
  to: XY;
  tone?: FigureTone;
  dashed?: boolean;
  /** Equality marks drawn at the midpoint: 1, 2 or 3 short strokes. */
  ticks?: 1 | 2 | 3;
  /** Arrow head at the `to` end (rays / displacement vectors). */
  arrow?: boolean;
}

export interface FigurePolygon {
  points: XY[];
  tone?: FigureTone;
  /** Soft fill behind the outline. */
  fill?: boolean;
  dashed?: boolean;
}

export interface FigureAngle {
  /** Vertex. */
  at: XY;
  /** A point on the first side, and on the second side. */
  from: XY;
  to: XY;
  label?: string;
  /** Right angle: draw the small square instead of an arc. */
  right?: boolean;
  radius?: number;
  tone?: FigureTone;
}

export interface FigureText {
  at: XY;
  text: string;
  tone?: FigureTone;
  anchor?: 'start' | 'middle' | 'end';
  size?: number;
  /** Isolate the run LTR (labels such as A′ or 14.4). Default true. */
  ltr?: boolean;
  /**
   * Direction in which the text should sit *away* from `at`, if `at` is a point
   * of the figure (the foot of a value's side, the centre of a shape…). The
   * renderer places the text clear of that ink in this direction; omitting it
   * keeps the text at `at` unless the drawing forces it aside.
   */
  away?: XY;
}

export interface FigureFrame {
  x: number;
  y: number;
  w: number;
  h: number;
  label?: string;
  /** Which inner corner carries the frame number. Default `right`. */
  labelPlace?: 'left' | 'right';
}

export interface FigureSpec {
  /** Drawing window in mathematical coordinates. */
  viewBox: { x: number; y: number; w: number; h: number };
  /**
   * Typographic multiplier for this figure's MEASUREMENTS (default 1): printed
   * values, angle values and panel numbers. Labels are sized from the window
   * WIDTH, so figures already share one scale; use this only when a drawing is
   * measurably denser (or larger) than the rest. Vertex names are not scaled:
   * their size is the lesson's, so a dense figure cannot drag its names below
   * the values they label.
   */
  labelScale?: number;
  frames?: FigureFrame[];
  polygons?: FigurePolygon[];
  segments?: FigureSegment[];
  angles?: FigureAngle[];
  points?: FigurePoint[];
  texts?: FigureText[];
}

const isNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);

const isPoint = (value: unknown): value is XY =>
  Array.isArray(value) && value.length === 2 && isNumber(value[0]) && isNumber(value[1]);

const TONES: readonly FigureTone[] = ['ink', 'given', 'image', 'aux', 'mark'];
const PLACES: readonly LabelPlace[] = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'];

function tone(value: unknown): FigureTone | undefined {
  return TONES.includes(value as FigureTone) ? (value as FigureTone) : undefined;
}

function readPoint(value: unknown): FigurePoint | null {
  if (!value || typeof value !== 'object') return null;
  const record = value as Record<string, unknown>;
  if (!isPoint(record.at) || typeof record.label !== 'string') return null;
  return {
    at: record.at,
    label: record.label,
    place: PLACES.includes(record.place as LabelPlace) ? (record.place as LabelPlace) : undefined,
    tone: tone(record.tone),
    dot: typeof record.dot === 'boolean' ? record.dot : undefined,
  };
}

function readSegment(value: unknown): FigureSegment | null {
  if (!value || typeof value !== 'object') return null;
  const record = value as Record<string, unknown>;
  if (!isPoint(record.from) || !isPoint(record.to)) return null;
  const ticks = record.ticks;
  return {
    from: record.from,
    to: record.to,
    tone: tone(record.tone),
    dashed: record.dashed === true,
    ticks: ticks === 1 || ticks === 2 || ticks === 3 ? ticks : undefined,
    arrow: record.arrow === true,
  };
}

function readPolygon(value: unknown): FigurePolygon | null {
  if (!value || typeof value !== 'object') return null;
  const record = value as Record<string, unknown>;
  if (!Array.isArray(record.points) || record.points.length < 3) return null;
  if (!record.points.every(isPoint)) return null;
  return {
    points: record.points as XY[],
    tone: tone(record.tone),
    fill: record.fill === true,
    dashed: record.dashed === true,
  };
}

function readAngle(value: unknown): FigureAngle | null {
  if (!value || typeof value !== 'object') return null;
  const record = value as Record<string, unknown>;
  if (!isPoint(record.at) || !isPoint(record.from) || !isPoint(record.to)) return null;
  return {
    at: record.at,
    from: record.from,
    to: record.to,
    label: typeof record.label === 'string' ? record.label : undefined,
    right: record.right === true,
    radius: isNumber(record.radius) ? record.radius : undefined,
    tone: tone(record.tone),
  };
}

function readText(value: unknown): FigureText | null {
  if (!value || typeof value !== 'object') return null;
  const record = value as Record<string, unknown>;
  if (!isPoint(record.at) || typeof record.text !== 'string') return null;
  const anchor = record.anchor;
  return {
    at: record.at,
    text: record.text,
    tone: tone(record.tone),
    anchor: anchor === 'start' || anchor === 'middle' || anchor === 'end' ? anchor : undefined,
    size: isNumber(record.size) ? record.size : undefined,
    ltr: record.ltr === false ? false : true,
    away: isPoint(record.away) ? record.away : undefined,
  };
}

function readFrame(value: unknown): FigureFrame | null {
  if (!value || typeof value !== 'object') return null;
  const record = value as Record<string, unknown>;
  if (!isNumber(record.x) || !isNumber(record.y) || !isNumber(record.w) || !isNumber(record.h)) {
    return null;
  }
  return {
    x: record.x,
    y: record.y,
    w: record.w,
    h: record.h,
    label: typeof record.label === 'string' ? record.label : undefined,
    labelPlace: record.labelPlace === 'left' ? 'left' : undefined,
  };
}

function readArray<T>(value: unknown, reader: (item: unknown) => T | null): T[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const items = value.flatMap((item) => {
    const parsed = reader(item);
    return parsed ? [parsed] : [];
  });
  return items.length === value.length ? items : undefined;
}

/**
 * Strict-ish reader: a malformed entry invalidates the whole figure, because a
 * drawing that silently drops a vertex or a right-angle mark would be worse
 * than no drawing at all.
 */
export function readFigureSpec(value: unknown): FigureSpec | null {
  if (!value || typeof value !== 'object') return null;
  const record = value as Record<string, unknown>;
  const view = record.viewBox;
  if (!view || typeof view !== 'object') return null;
  const box = view as Record<string, unknown>;
  if (!isNumber(box.x) || !isNumber(box.y) || !isNumber(box.w) || !isNumber(box.h)) {
    return null;
  }
  if (box.w <= 0 || box.h <= 0) return null;

  const spec: FigureSpec = {
    viewBox: { x: box.x, y: box.y, w: box.w, h: box.h },
    labelScale:
      isNumber(record.labelScale) && record.labelScale > 0 ? record.labelScale : undefined,
    frames: readArray(record.frames, readFrame),
    polygons: readArray(record.polygons, readPolygon),
    segments: readArray(record.segments, readSegment),
    angles: readArray(record.angles, readAngle),
    points: readArray(record.points, readPoint),
    texts: readArray(record.texts, readText),
  };

  for (const key of ['frames', 'polygons', 'segments', 'angles', 'points', 'texts'] as const) {
    if (record[key] !== undefined && spec[key] === undefined) return null;
  }
  return spec;
}

/** Translate every coordinate in a spec. Used to place a translated image. */
export function translateFigure(spec: FigureSpec, dx: number, dy: number): FigureSpec {
  const move = (p: XY): XY => [p[0] + dx, p[1] + dy];
  return {
    ...spec,
    polygons: spec.polygons?.map((polygon) => ({ ...polygon, points: polygon.points.map(move) })),
    segments: spec.segments?.map((segment) => ({
      ...segment,
      from: move(segment.from),
      to: move(segment.to),
    })),
    angles: spec.angles?.map((angle) => ({
      ...angle,
      at: move(angle.at),
      from: move(angle.from),
      to: move(angle.to),
    })),
    points: spec.points?.map((point) => ({ ...point, at: move(point.at) })),
    texts: spec.texts?.map((text) => ({ ...text, at: move(text.at) })),
  };
}

/** Prime every point label: A → A′. Images in the book always carry a prime. */
export function primedFigure(spec: FigureSpec): FigureSpec {
  return {
    ...spec,
    points: spec.points?.map((point) => ({ ...point, label: `${point.label}′` })),
  };
}
