import { useId, useState } from 'react';
import type { InteractiveDiagram } from '@/content/schema';
import styles from './GridFigure.module.css';

/**
 * ============================================================================
 *  GRID FIGURE — squared-paper geometry on exact integer coordinates
 * ============================================================================
 *
 *  Draws a centimetre grid, points at exact lattice coordinates, straight
 *  lines, and optional REVEALS: platform-authored help that shows the image of
 *  a point under a translation, together with the translation arrows.
 *
 *  FIDELITY
 *  --------
 *  This renderer is allowed to reproduce a TEXTBOOK figure, but only when the
 *  coordinates of every point were read off the scan and then verified
 *  arithmetically (collinearity, equal rows/columns, and the requirement that
 *  the constructed images land on lattice nodes). See docs/LESSON-02-FIGURES.md
 *  for the verification record of each figure that uses it.
 *
 *  Nothing here is eyeballed: every image point is computed as P' = P + v from
 *  the integer coordinates supplied by the content layer.
 *
 *  The reveals are OFF by default and are labelled as platform help, so the
 *  printed figure is shown exactly as printed until the student asks for more.
 * ============================================================================
 */

type Point = [number, number];

type Tone = 'ink' | 'mark' | 'image';
type Placement =
  'above' | 'below' | 'above-start' | 'above-end' | 'below-start' | 'below-end' | 'start' | 'end';

interface LabelledPoint {
  x: number;
  y: number;
  label?: string;
  tone?: Tone;
  placement?: Placement;
}

interface Segment {
  from: Point;
  to: Point;
  dashed?: boolean;
}

interface Reveal {
  id: string;
  label: string;
  points?: LabelledPoint[];
  arrows?: Segment[];
  segments?: Segment[];
  note?: string;
}

interface Params {
  /** Printed grid extent: cells 0…cols horizontally, 0…rows vertically. */
  cols: number;
  rows: number;
  /** The book prints one grid dashed violet (page 8) and one solid blue (page 10). */
  gridStyle: 'dashed' | 'solid';
  points: LabelledPoint[];
  segments: Segment[];
  reveals: Reveal[];
  /** Extra cells drawn outside the printed sheet, for images that fall off it. */
  extend: { start: number; end: number; bottom: number; top: number };
  extendNote?: string;
}

const NO_EXTENSION = { start: 0, end: 0, bottom: 0, top: 0 };

function readParams(raw: Record<string, unknown>): Params | null {
  const cols = raw.cols;
  const rows = raw.rows;
  if (typeof cols !== 'number' || typeof rows !== 'number') return null;
  const points = Array.isArray(raw.points) ? (raw.points as LabelledPoint[]) : [];
  if (points.length === 0) return null;
  const extend = (raw.extend as Params['extend'] | undefined) ?? NO_EXTENSION;
  return {
    cols,
    rows,
    gridStyle: raw.gridStyle === 'solid' ? 'solid' : 'dashed',
    points,
    segments: Array.isArray(raw.segments) ? (raw.segments as Segment[]) : [],
    reveals: Array.isArray(raw.reveals) ? (raw.reveals as Reveal[]) : [],
    extend: {
      start: extend.start ?? 0,
      end: extend.end ?? 0,
      bottom: extend.bottom ?? 0,
      top: extend.top ?? 0,
    },
    extendNote: typeof raw.extendNote === 'string' ? raw.extendNote : undefined,
  };
}

const PLACEMENTS: Record<Placement, [number, number]> = {
  above: [0, -0.34],
  below: [0, 0.78],
  'above-start': [-0.42, -0.3],
  'above-end': [0.42, -0.3],
  'below-start': [-0.42, 0.74],
  'below-end': [0.42, 0.74],
  start: [-0.48, 0.2],
  end: [0.48, 0.2],
};

export function GridFigure({ spec }: { spec: InteractiveDiagram }) {
  const params = readParams(spec.params);
  const reactId = useId();
  const [revealed, setRevealed] = useState<string[]>([]);

  if (!params) return null;
  const { cols, rows, gridStyle, points, segments, reveals, extend, extendNote } = params;

  const minX = -extend.start;
  const maxX = cols + extend.end;
  const minY = -extend.bottom;
  const maxY = rows + extend.top;

  const pad = 0.75;
  const width = maxX - minX + pad * 2;
  const height = maxY - minY + pad * 2;

  /** Mathematical (y up) → SVG (y down). */
  const sx = (x: number) => x - minX + pad;
  const sy = (y: number) => maxY - y + pad;

  const markerId = `grid-arrow-${reactId.replace(/[^a-zA-Z0-9]/g, '')}`;

  const activeReveals = reveals.filter((reveal) => revealed.includes(reveal.id));
  const revealedPoints = activeReveals.flatMap((reveal) => reveal.points ?? []);
  const revealedArrows = activeReveals.flatMap((reveal) => reveal.arrows ?? []);
  const revealedSegments = activeReveals.flatMap((reveal) => reveal.segments ?? []);

  function toggle(id: string) {
    setRevealed((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  const verticals: number[] = [];
  for (let x = Math.ceil(minX); x <= Math.floor(maxX); x += 1) verticals.push(x);
  const horizontals: number[] = [];
  for (let y = Math.ceil(minY); y <= Math.floor(maxY); y += 1) horizontals.push(y);

  const hasExtension = extend.start > 0 || extend.end > 0 || extend.bottom > 0 || extend.top > 0;

  const renderPoint = (point: LabelledPoint, key: string) => {
    const tone = point.tone ?? 'ink';
    const [ox, oy] = PLACEMENTS[point.placement ?? 'above-end'];
    return (
      <g key={key}>
        <circle
          cx={sx(point.x)}
          cy={sy(point.y)}
          r={0.13}
          className={
            tone === 'mark'
              ? styles.pointMark
              : tone === 'image'
                ? styles.pointImage
                : styles.pointInk
          }
        />
        {point.label ? (
          <text
            x={sx(point.x) + ox}
            y={sy(point.y) + oy}
            className={
              tone === 'mark'
                ? styles.labelMark
                : tone === 'image'
                  ? styles.labelImage
                  : styles.labelInk
            }
          >
            {point.label}
          </text>
        ) : null}
      </g>
    );
  };

  const renderSegment = (segment: Segment, key: string, className: string | undefined) => (
    <line
      key={key}
      x1={sx(segment.from[0])}
      y1={sy(segment.from[1])}
      x2={sx(segment.to[0])}
      y2={sy(segment.to[1])}
      className={className}
      strokeDasharray={segment.dashed ? '6 4' : undefined}
    />
  );

  return (
    <div className={styles.wrap}>
      <svg
        className={styles.svg}
        viewBox={`0 0 ${width.toFixed(3)} ${height.toFixed(3)}`}
        role="img"
        aria-label={spec.alt.replace(/\$([^$]+)\$/g, '$1')}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <marker
            id={markerId}
            markerWidth="5"
            markerHeight="5"
            refX="4.2"
            refY="2"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L4.5,2 L0,4 Z" className={styles.arrowHead} />
          </marker>
        </defs>

        {/* The sheet actually printed in the book. */}
        {hasExtension ? (
          <rect x={sx(0)} y={sy(rows)} width={cols} height={rows} className={styles.printedSheet} />
        ) : null}

        {verticals.map((x) => (
          <line
            key={`v-${x}`}
            x1={sx(x)}
            y1={sy(maxY)}
            x2={sx(x)}
            y2={sy(minY)}
            className={gridStyle === 'solid' ? styles.gridSolid : styles.gridDashed}
            opacity={x < 0 || x > cols ? 0.45 : 1}
          />
        ))}
        {horizontals.map((y) => (
          <line
            key={`h-${y}`}
            x1={sx(minX)}
            y1={sy(y)}
            x2={sx(maxX)}
            y2={sy(y)}
            className={gridStyle === 'solid' ? styles.gridSolid : styles.gridDashed}
            opacity={y < 0 || y > rows ? 0.45 : 1}
          />
        ))}

        {segments.map((segment, index) => renderSegment(segment, `s-${index}`, styles.line))}
        {revealedSegments.map((segment, index) =>
          renderSegment(segment, `rs-${index}`, styles.lineImage),
        )}

        {revealedArrows.map((arrow, index) => (
          <line
            key={`a-${index}`}
            x1={sx(arrow.from[0])}
            y1={sy(arrow.from[1])}
            x2={sx(arrow.to[0])}
            y2={sy(arrow.to[1])}
            className={styles.vector}
            markerEnd={`url(#${markerId})`}
          />
        ))}

        {points.map((point, index) => renderPoint(point, `p-${index}`))}
        {revealedPoints.map((point, index) =>
          renderPoint({ ...point, tone: 'image' }, `rp-${index}`),
        )}
      </svg>

      {reveals.length > 0 ? (
        <div className={styles.controls}>
          <p className={styles.controlsTitle}>مساعدة من المنصّة — جرّب بنفسك أولاً</p>
          <div className={styles.buttons}>
            {reveals.map((reveal) => (
              <button
                key={reveal.id}
                type="button"
                className={styles.button}
                aria-pressed={revealed.includes(reveal.id)}
                onClick={() => toggle(reveal.id)}
              >
                {reveal.label}
              </button>
            ))}
          </div>
          {activeReveals
            .filter((reveal) => reveal.note)
            .map((reveal) => (
              <p key={`note-${reveal.id}`} className={styles.note}>
                {reveal.note}
              </p>
            ))}
        </div>
      ) : null}

      {hasExtension && extendNote ? <p className={styles.extendNote}>{extendNote}</p> : null}
    </div>
  );
}
