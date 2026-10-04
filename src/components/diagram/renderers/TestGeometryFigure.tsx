import { useId, useMemo, useState } from 'react';
import type { ConstructedDiagram } from '@/content/schema';
import { plainTextIsolated } from '@/lib/bidi';
import {
  pointById,
  sceneBounds,
  testFigureSpecSchema,
  type SceneBounds,
  type ParsedTestFigureSpec,
  type TestFigurePoint,
} from './testFigureSpec';
import styles from './TestGeometryFigure.module.css';

/**
 * ============================================================================
 *  TEST GEOMETRY FIGURE
 * ============================================================================
 *
 *  Draws the declarative scene described in `./testFigureSpec.ts`.
 *
 *  Guarantees that matter for a geometry test:
 *    • one equal scale on both axes — no stretched or squashed figures;
 *    • y is flipped exactly once, so "above" in the data is above on screen;
 *    • every element is derived from the labelled points, so the drawing cannot
 *      disagree with the statements it accompanies;
 *    • labels are LTR-isolated inside the Arabic RTL page;
 *    • an invalid scene degrades to a visible notice instead of crashing.
 * ============================================================================
 */
export function TestGeometryFigure({ spec }: { spec: ConstructedDiagram }) {
  const [zoomed, setZoomed] = useState(false);
  const viewportId = `test-figure-viewport-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const parsed = testFigureSpecSchema.safeParse(spec.construction);
  if (!parsed.success) {
    return (
      <div className={styles.invalid} role="note">
        <p className={styles.invalidTitle}>الرسم غير متاح</p>
        <p className={styles.invalidAlt}>{plainTextIsolated(spec.alt)}</p>
      </div>
    );
  }
  return (
    <div className={styles.figure}>
      <div className={styles.controls} dir="rtl">
        <button
          className={styles.zoomButton}
          type="button"
          aria-expanded={zoomed}
          aria-controls={viewportId}
          onClick={() => setZoomed((current) => !current)}
        >
          {zoomed ? 'إعادة الحجم الأصلي' : 'تكبير الرسم'}
        </button>
      </div>
      <div className={styles.viewport} id={viewportId}>
        <SceneSvg scene={parsed.data} title={plainTextIsolated(spec.alt)} zoomed={zoomed} />
      </div>
    </div>
  );
}

const LABEL_OFFSETS: Record<NonNullable<TestFigurePoint['labelSide']>, [number, number]> = {
  n: [0, -1],
  s: [0, 1],
  e: [1, 0],
  w: [-1, 0],
  ne: [0.8, -0.8],
  nw: [-0.8, -0.8],
  se: [0.8, 0.8],
  sw: [-0.8, 0.8],
};

interface Layout {
  bounds: SceneBounds;
  size: number;
  dotRadius: number;
  strokeWidth: number;
  fontSize: number;
  labelGap: number;
  arcRadius: number;
  rightAngleSize: number;
}

function layoutOf(scene: ParsedTestFigureSpec): Layout {
  const bounds = sceneBounds(scene) ?? { minX: 0, maxX: 1, minY: 0, maxY: 1 };
  const spanX = Math.max(bounds.maxX - bounds.minX, 1);
  const spanY = Math.max(bounds.maxY - bounds.minY, 1);
  const size = Math.max(spanX, spanY);
  return {
    bounds,
    size,
    dotRadius: size * 0.014,
    strokeWidth: size * 0.007,
    fontSize: size * 0.07,
    labelGap: size * 0.05,
    arcRadius: size * 0.09,
    rightAngleSize: size * 0.06,
  };
}

function SceneSvg({
  scene,
  title,
  zoomed,
}: {
  scene: ParsedTestFigureSpec;
  title: string;
  zoomed: boolean;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const layout = useMemo(() => layoutOf(scene), [scene]);
  const bounds = layout.bounds;
  const padding = layout.size * 0.16;
  const viewBox = [
    bounds.minX - padding,
    -(bounds.maxY + padding),
    bounds.maxX - bounds.minX + padding * 2,
    bounds.maxY - bounds.minY + padding * 2,
  ].join(' ');

  /** Mathematical (x, y-up) → SVG (x right, y down). */
  const sx = (x: number) => x;
  const sy = (y: number) => -y;

  const at = (id: string): TestFigurePoint | undefined => pointById(scene, id);

  return (
    <svg
      className={zoomed ? `${styles.svg} ${styles.svgZoomed}` : styles.svg}
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      style={{ direction: 'ltr', unicodeBidi: 'isolate' }}
      role="img"
      aria-label={title}
    >
      <defs>
        <marker
          id={`arrow-${uid}`}
          markerWidth="10"
          markerHeight="10"
          refX="8"
          refY="3"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L8,3 L0,6 Z" className={styles.arrowHead} />
        </marker>
      </defs>

      {scene.grid ? (
        <g className={styles.grid} aria-hidden="true">
          {range(scene.grid.minX, scene.grid.maxX).map((x) => (
            <line
              key={`gx-${x}`}
              x1={sx(x)}
              y1={sy(scene.grid!.minY)}
              x2={sx(x)}
              y2={sy(scene.grid!.maxY)}
              style={{
                strokeWidth: layout.strokeWidth * 0.55,
                strokeDasharray: `${layout.size * 0.015} ${layout.size * 0.015}`,
              }}
            />
          ))}
          {range(scene.grid.minY, scene.grid.maxY).map((y) => (
            <line
              key={`gy-${y}`}
              x1={sx(scene.grid!.minX)}
              y1={sy(y)}
              x2={sx(scene.grid!.maxX)}
              y2={sy(y)}
              style={{
                strokeWidth: layout.strokeWidth * 0.55,
                strokeDasharray: `${layout.size * 0.015} ${layout.size * 0.015}`,
              }}
            />
          ))}
        </g>
      ) : null}

      {(scene.polygons ?? []).map((polygon, index) => {
        const points = polygon.points.map(at).filter(definedPoint);
        if (points.length < 3) return null;
        const path = points
          .map((point, position) => `${position === 0 ? 'M' : 'L'}${sx(point.x)},${sy(point.y)}`)
          .join(' ');
        return (
          <path
            key={`poly-${index}`}
            d={`${path} Z`}
            className={polygon.fill ? styles.polygonFilled : styles.polygon}
            style={{ strokeWidth: layout.strokeWidth }}
          />
        );
      })}

      {(scene.circles ?? []).map((circle, index) => {
        const center = at(circle.center);
        if (!center) return null;
        return (
          <circle
            key={`circle-${index}`}
            cx={sx(center.x)}
            cy={sy(center.y)}
            r={circle.radius}
            className={circle.dashed ? styles.circleDashed : styles.circle}
            style={{
              strokeWidth: layout.strokeWidth,
              ...(circle.dashed
                ? { strokeDasharray: `${layout.size * 0.04} ${layout.size * 0.04}` }
                : {}),
            }}
          />
        );
      })}

      {(scene.segments ?? []).map((segment, index) => {
        const from = at(segment.from);
        const to = at(segment.to);
        if (!from || !to) return null;
        const arrow = segment.arrow ?? 'none';
        return (
          <line
            key={`seg-${index}`}
            x1={sx(from.x)}
            y1={sy(from.y)}
            x2={sx(to.x)}
            y2={sy(to.y)}
            className={segment.dashed ? styles.segmentDashed : styles.segment}
            style={{
              strokeWidth: layout.strokeWidth,
              ...(segment.dashed
                ? { strokeDasharray: `${layout.size * 0.04} ${layout.size * 0.04}` }
                : {}),
            }}
            markerEnd={arrow === 'end' || arrow === 'both' ? `url(#arrow-${uid})` : undefined}
            markerStart={arrow === 'both' ? `url(#arrow-${uid})` : undefined}
          />
        );
      })}

      {(scene.segments ?? []).map((segment, index) => {
        if (!segment.ticks) return null;
        const from = at(segment.from);
        const to = at(segment.to);
        if (!from || !to) return null;
        return (
          <SegmentTicks
            key={`segment-ticks-${index}`}
            from={from}
            to={to}
            count={segment.ticks}
            size={layout.size}
            strokeWidth={layout.strokeWidth}
            toSvgY={sy}
          />
        );
      })}

      {(scene.rightAngles ?? []).map((mark, index) => {
        const vertex = at(mark.at);
        const first = at(mark.from);
        const second = at(mark.to);
        if (!vertex || !first || !second) return null;
        const u1 = unit(vertex, first);
        const u2 = unit(vertex, second);
        const r = layout.rightAngleSize;
        const p1 = { x: vertex.x + u1.x * r, y: vertex.y + u1.y * r };
        const p3 = { x: vertex.x + u2.x * r, y: vertex.y + u2.y * r };
        const p2 = { x: p1.x + u2.x * r, y: p1.y + u2.y * r };
        return (
          <polyline
            key={`right-${index}`}
            points={`${sx(p1.x)},${sy(p1.y)} ${sx(p2.x)},${sy(p2.y)} ${sx(p3.x)},${sy(p3.y)}`}
            className={styles.angleMark}
            style={{ strokeWidth: layout.strokeWidth }}
          />
        );
      })}

      {(scene.angles ?? []).map((mark, index) => {
        const vertex = at(mark.at);
        const first = at(mark.from);
        const second = at(mark.to);
        if (!vertex || !first || !second) return null;
        return (
          <AngleArc
            key={`angle-${index}`}
            vertex={vertex}
            first={first}
            second={second}
            radius={layout.arcRadius}
            ticks={mark.ticks}
            strokeWidth={layout.strokeWidth}
          />
        );
      })}

      {(scene.annotations ?? []).map((annotation, index) => (
        <text
          key={`annotation-${index}`}
          x={sx(annotation.x)}
          y={sy(annotation.y)}
          className={styles.annotation}
          fontSize={layout.fontSize * 0.88}
          textAnchor={annotation.anchor}
          dominantBaseline="middle"
          direction="ltr"
          unicodeBidi="isolate"
        >
          {annotation.text}
        </text>
      ))}

      {scene.points.map((point) => {
        const side = point.labelSide ?? 'n';
        const [dx, dy] = LABEL_OFFSETS[side];
        const mark = point.mark ?? 'dot';
        return (
          <g key={`point-${point.id}`}>
            {mark === 'dot' ? (
              <circle
                cx={sx(point.x)}
                cy={sy(point.y)}
                r={layout.dotRadius}
                className={styles.pointDot}
              />
            ) : null}
            {mark === 'open' ? (
              <circle
                cx={sx(point.x)}
                cy={sy(point.y)}
                r={layout.dotRadius * 1.2}
                className={styles.pointOpen}
                style={{ strokeWidth: layout.strokeWidth }}
              />
            ) : null}
            {mark === 'cross' ? (
              <g className={styles.pointCross} style={{ strokeWidth: layout.strokeWidth }}>
                <line
                  x1={sx(point.x) - layout.dotRadius * 1.4}
                  y1={sy(point.y) - layout.dotRadius * 1.4}
                  x2={sx(point.x) + layout.dotRadius * 1.4}
                  y2={sy(point.y) + layout.dotRadius * 1.4}
                />
                <line
                  x1={sx(point.x) - layout.dotRadius * 1.4}
                  y1={sy(point.y) + layout.dotRadius * 1.4}
                  x2={sx(point.x) + layout.dotRadius * 1.4}
                  y2={sy(point.y) - layout.dotRadius * 1.4}
                />
              </g>
            ) : null}
            {point.showLabel ? (
              <text
                x={sx(point.x) + dx * layout.labelGap}
                y={sy(point.y) + dy * layout.labelGap}
                className={styles.pointLabel}
                fontSize={layout.fontSize}
                textAnchor="middle"
                dominantBaseline="middle"
                direction="ltr"
                unicodeBidi="isolate"
              >
                {point.label ?? point.id}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

function SegmentTicks({
  from,
  to,
  count,
  size,
  strokeWidth,
  toSvgY,
}: {
  from: TestFigurePoint;
  to: TestFigurePoint;
  count: 1 | 2 | 3;
  size: number;
  strokeWidth: number;
  toSvgY: (y: number) => number;
}) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy) || 1;
  const tangent = { x: dx / length, y: dy / length };
  const normal = { x: -tangent.y, y: tangent.x };
  const tickLength = size * 0.055;
  const gap = size * 0.035;
  const center = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 };

  return (
    <g className={styles.segmentTick} style={{ strokeWidth }} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => {
        const offset = (index - (count - 1) / 2) * gap;
        const tickCenter = {
          x: center.x + tangent.x * offset,
          y: center.y + tangent.y * offset,
        };
        const first = {
          x: tickCenter.x - normal.x * tickLength * 0.5,
          y: tickCenter.y - normal.y * tickLength * 0.5,
        };
        const second = {
          x: tickCenter.x + normal.x * tickLength * 0.5,
          y: tickCenter.y + normal.y * tickLength * 0.5,
        };
        return (
          <line key={index} x1={first.x} y1={toSvgY(first.y)} x2={second.x} y2={toSvgY(second.y)} />
        );
      })}
    </g>
  );
}

function AngleArc({
  vertex,
  first,
  second,
  radius,
  ticks,
  strokeWidth,
}: {
  vertex: TestFigurePoint;
  first: TestFigurePoint;
  second: TestFigurePoint;
  radius: number;
  ticks: 1 | 2 | 3 | undefined;
  strokeWidth: number;
}) {
  const centerX = vertex.x;
  const centerY = -vertex.y;
  const angleOne = Math.atan2(-first.y - centerY, first.x - centerX);
  const angleTwo = Math.atan2(-second.y - centerY, second.x - centerX);

  let delta = angleTwo - angleOne;
  while (delta > Math.PI) delta -= Math.PI * 2;
  while (delta < -Math.PI) delta += Math.PI * 2;

  const start = {
    x: centerX + radius * Math.cos(angleOne),
    y: centerY + radius * Math.sin(angleOne),
  };
  const end = {
    x: centerX + radius * Math.cos(angleOne + delta),
    y: centerY + radius * Math.sin(angleOne + delta),
  };
  const sweep = delta >= 0 ? 1 : 0;

  const midAngle = angleOne + delta / 2;
  const tickCenter = {
    x: centerX + radius * Math.cos(midAngle),
    y: centerY + radius * Math.sin(midAngle),
  };
  const tickNormal = { x: Math.cos(midAngle), y: Math.sin(midAngle) };
  const tickLength = radius * 0.28;
  const tickCount = ticks ?? 0;

  return (
    <g className={styles.angleMark} style={{ strokeWidth }}>
      <path
        d={`M${start.x},${start.y} A${radius},${radius} 0 0 ${sweep} ${end.x},${end.y}`}
        fill="none"
      />
      {Array.from({ length: tickCount }, (_, tick) => {
        const offset = tickCount === 1 ? 0 : (tick - (tickCount - 1) / 2) * strokeWidth * 3;
        const along = {
          x: tickCenter.x + tickNormal.x * offset,
          y: tickCenter.y + tickNormal.y * offset,
        };
        const perpendicular = { x: -tickNormal.y, y: tickNormal.x };
        return (
          <line
            key={tick}
            x1={along.x - perpendicular.x * tickLength * 0.5}
            y1={along.y - perpendicular.y * tickLength * 0.5}
            x2={along.x + perpendicular.x * tickLength * 0.5}
            y2={along.y + perpendicular.y * tickLength * 0.5}
          />
        );
      })}
    </g>
  );
}

function unit(from: TestFigurePoint, to: TestFigurePoint): { x: number; y: number } {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy) || 1;
  return { x: dx / length, y: dy / length };
}

function definedPoint(point: TestFigurePoint | undefined): point is TestFigurePoint {
  return point !== undefined;
}

function range(from: number, to: number): number[] {
  const output: number[] = [];
  for (let value = from; value <= to; value += 1) output.push(value);
  return output;
}
