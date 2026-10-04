import { useId, useMemo } from 'react';
import type { ConstructedDiagram } from '@/content/schema';
import { plainText } from '@/lib/bidi';
import {
  pointById,
  sceneBounds,
  testFigureSpecSchema,
  type SceneBounds,
  type TestFigurePoint,
  type TestFigureSpec,
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
  const parsed = testFigureSpecSchema.safeParse(spec.construction);
  if (!parsed.success) {
    return (
      <div className={styles.invalid} role="note">
        <p className={styles.invalidTitle}>الرسم غير متاح</p>
        <p className={styles.invalidAlt}>{plainText(spec.alt)}</p>
      </div>
    );
  }
  return <SceneSvg scene={parsed.data} title={plainText(spec.alt)} />;
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

function layoutOf(scene: TestFigureSpec): Layout {
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

function SceneSvg({ scene, title }: { scene: TestFigureSpec; title: string }) {
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
      className={styles.svg}
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
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
          orient="auto"
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
            />
          ))}
          {range(scene.grid.minY, scene.grid.maxY).map((y) => (
            <line
              key={`gy-${y}`}
              x1={sx(scene.grid!.minX)}
              y1={sy(y)}
              x2={sx(scene.grid!.maxX)}
              y2={sy(y)}
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
            markerEnd={arrow === 'end' || arrow === 'both' ? `url(#arrow-${uid})` : undefined}
            markerStart={arrow === 'both' ? `url(#arrow-${uid})` : undefined}
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
            ticks={mark.ticks ?? 1}
            strokeWidth={layout.strokeWidth}
          />
        );
      })}

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
              />
            ) : null}
            {mark === 'cross' ? (
              <g className={styles.pointCross}>
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
            <text
              x={sx(point.x) + dx * layout.labelGap}
              y={sy(point.y) + dy * layout.labelGap}
              className={styles.pointLabel}
              fontSize={layout.fontSize}
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {point.label ?? point.id}
            </text>
          </g>
        );
      })}
    </svg>
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
  ticks: 1 | 2 | 3;
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

  return (
    <g className={styles.angleMark}>
      <path
        d={`M${start.x},${start.y} A${radius},${radius} 0 0 ${sweep} ${end.x},${end.y}`}
        fill="none"
      />
      {Array.from({ length: ticks }, (_, tick) => {
        const offset = ticks === 1 ? 0 : (tick - (ticks - 1) / 2) * strokeWidth * 3;
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
