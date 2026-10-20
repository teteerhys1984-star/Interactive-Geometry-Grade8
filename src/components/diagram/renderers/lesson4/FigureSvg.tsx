import { useId } from 'react';
import type { FigureSpec, FigureTone, LabelPlace, XY } from '@/lib/geometryFigure';
import styles from './figure.module.css';

/**
 * ============================================================================
 *  FIGURE SVG — the one drawing engine of Lesson 4
 * ============================================================================
 *
 *  Draws a `FigureSpec` in mathematical coordinates (y up). The same component
 *  renders the static textbook figures and every stage of the interactive
 *  labs, which is why a translated image in a lab is guaranteed to be the very
 *  same picture as in the printed figure — only moved.
 *
 *  Nothing here decides geometry: every coordinate arrives already computed in
 *  `lesson-04-geometry.ts`, where the tests can re-measure it.
 * ============================================================================
 */

interface FigureSvgProps {
  spec: FigureSpec;
  ariaLabel: string;
  className?: string;
}

const TONE_CLASS: Record<FigureTone, string | undefined> = {
  ink: styles.inkLine,
  given: styles.givenLine,
  image: styles.imageLine,
  aux: styles.auxLine,
  mark: styles.markLine,
};

const LABEL_CLASS: Record<FigureTone, string | undefined> = {
  ink: styles.label,
  given: `${styles.label} ${styles.labelGiven}`,
  image: `${styles.label} ${styles.labelImage}`,
  aux: `${styles.label} ${styles.labelAux}`,
  mark: `${styles.label} ${styles.labelMark}`,
};

const PLACE_OFFSET: Record<LabelPlace, XY> = {
  n: [0, 1],
  s: [0, -1],
  e: [1, 0],
  w: [-1, 0],
  ne: [0.72, 0.72],
  nw: [-0.72, 0.72],
  se: [0.72, -0.72],
  sw: [-0.72, -0.72],
};

const normalise = (v: XY): XY => {
  const len = Math.hypot(v[0], v[1]) || 1;
  return [v[0] / len, v[1] / len];
};

export function FigureSvg({ spec, ariaLabel, className }: FigureSvgProps) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const arrowId = `l4-arrow-${rawId}`;
  const { viewBox } = spec;
  const unit = Math.min(viewBox.w, viewBox.h);
  const stroke = Math.max(unit * 0.007, 0.012);
  const fontSize = Math.max(unit * 0.06, 0.2);
  const arcRadius = unit * 0.1;
  const tick = unit * 0.05;

  /** mathematical y (up) → SVG y (down) */
  const sy = (y: number) => 2 * viewBox.y + viewBox.h - y;
  const P = (p: XY): string => `${p[0]},${sy(p[1])}`;

  return (
    <svg
      viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
      className={className ? `${styles.stage} ${className}` : styles.stage}
      role="img"
      aria-label={ariaLabel}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <marker
          id={arrowId}
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L6,3 L0,6 Z" className={styles.markLine} />
        </marker>
      </defs>

      {spec.frames?.map((frame, index) => (
        <g key={`frame-${index}`}>
          <rect
            x={frame.x}
            y={sy(frame.y + frame.h)}
            width={frame.w}
            height={frame.h}
            className={styles.frame}
            strokeWidth={stroke * 0.6}
            rx={unit * 0.03}
          />
          {frame.label ? (
            <text
              x={
                frame.labelPlace === 'left'
                  ? frame.x + unit * 0.035
                  : frame.x + frame.w - unit * 0.035
              }
              y={sy(frame.y + frame.h) + fontSize * 0.85}
              textAnchor={frame.labelPlace === 'left' ? 'start' : 'end'}
              fontSize={fontSize * 0.9}
              className={`${styles.label} ${styles.frameLabel}`}
            >
              {frame.label}
            </text>
          ) : null}
        </g>
      ))}

      {spec.polygons?.map((polygon, index) => (
        <polygon
          key={`polygon-${index}`}
          points={polygon.points.map(P).join(' ')}
          className={
            polygon.tone === 'image'
              ? styles.imagePolygon
              : polygon.tone === 'ink'
                ? styles.inkPolygon
                : styles.plainPolygon
          }
          strokeWidth={stroke}
          strokeDasharray={polygon.dashed ? `${stroke * 8} ${stroke * 6}` : undefined}
          fill={polygon.fill === false ? 'none' : undefined}
        />
      ))}

      {spec.segments?.map((segment, index) => {
        const tone = segment.tone ?? 'ink';
        const mid: XY = [
          (segment.from[0] + segment.to[0]) / 2,
          (segment.from[1] + segment.to[1]) / 2,
        ];
        const along = normalise([segment.to[0] - segment.from[0], segment.to[1] - segment.from[1]]);
        const across: XY = [-along[1], along[0]];
        const count = segment.ticks ?? 0;
        return (
          <g key={`segment-${index}`}>
            <line
              x1={segment.from[0]}
              y1={sy(segment.from[1])}
              x2={segment.to[0]}
              y2={sy(segment.to[1])}
              className={`${TONE_CLASS[tone] ?? styles.inkLine ?? ''} ${segment.dashed ? styles.dashed : ''}`}
              strokeWidth={stroke}
              strokeLinecap="round"
              markerEnd={segment.arrow ? `url(#${arrowId})` : undefined}
            />
            {Array.from({ length: count }, (_, markIndex) => {
              const offset = (markIndex - (count - 1) / 2) * tick * 1.5;
              const centre: XY = [mid[0] + along[0] * offset, mid[1] + along[1] * offset];
              return (
                <line
                  key={`tick-${markIndex}`}
                  x1={centre[0] - across[0] * tick * 0.75}
                  y1={sy(centre[1] - across[1] * tick * 0.75)}
                  x2={centre[0] + across[0] * tick * 0.75}
                  y2={sy(centre[1] + across[1] * tick * 0.75)}
                  className={styles.tick}
                  strokeWidth={stroke * 1.15}
                />
              );
            })}
          </g>
        );
      })}

      {spec.angles?.map((angle, index) => {
        const first = normalise([angle.from[0] - angle.at[0], angle.from[1] - angle.at[1]]);
        const second = normalise([angle.to[0] - angle.at[0], angle.to[1] - angle.at[1]]);
        const radius = angle.radius ?? arcRadius;
        const toneClass =
          angle.tone === 'given'
            ? styles.angleGiven
            : angle.tone === 'image'
              ? styles.angleImage
              : '';

        if (angle.right) {
          // The right-angle mark is an OPEN square corner: from one side, through
          // the far corner, to the other side. Closing the path would draw the
          // chord between the two sides — a diagonal that is not in the figure.
          const corner: XY = [
            angle.at[0] + (first[0] + second[0]) * radius,
            angle.at[1] + (first[1] + second[1]) * radius,
          ];
          return (
            <g key={`angle-${index}`}>
              <polyline
                points={[
                  P([angle.at[0] + first[0] * radius, angle.at[1] + first[1] * radius]),
                  P(corner),
                  P([angle.at[0] + second[0] * radius, angle.at[1] + second[1] * radius]),
                ].join(' ')}
                className={styles.rightSquare}
                strokeWidth={stroke * 0.9}
              />
            </g>
          );
        }

        // A short polyline is used instead of an SVG arc so the sweep direction
        // can never be mis-guessed: the points are computed on the true circle.
        const start = Math.atan2(first[1], first[0]);
        const end = Math.atan2(second[1], second[0]);
        let delta = end - start;
        while (delta > Math.PI) delta -= 2 * Math.PI;
        while (delta < -Math.PI) delta += 2 * Math.PI;
        const steps = 22;
        const points = Array.from({ length: steps + 1 }, (_, step) => {
          const angleValue = start + (delta * step) / steps;
          return P([
            angle.at[0] + Math.cos(angleValue) * radius,
            angle.at[1] + Math.sin(angleValue) * radius,
          ]);
        }).join(' ');

        const labelAt = start + delta / 2;
        return (
          <g key={`angle-${index}`}>
            <polyline
              points={points}
              className={`${styles.angleArc} ${toneClass}`}
              strokeWidth={stroke * 0.9}
            />
            {angle.label ? (
              <text
                x={angle.at[0] + Math.cos(labelAt) * radius * 1.55}
                y={sy(angle.at[1] + Math.sin(labelAt) * radius * 1.55)}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={fontSize * 0.78}
                className={`${styles.label} ${styles.labelMark}`}
              >
                {angle.label}
              </text>
            ) : null}
          </g>
        );
      })}

      {spec.points?.map((point, index) => {
        const place = PLACE_OFFSET[point.place ?? 'n'];
        const tone = point.tone ?? 'ink';
        const dotClass =
          tone === 'image' ? styles.dotImage : tone === 'given' ? styles.dotGiven : styles.dot;
        return (
          <g key={`point-${index}`}>
            {point.dot === false ? null : (
              <circle cx={point.at[0]} cy={sy(point.at[1])} r={unit * 0.014} className={dotClass} />
            )}
            <text
              x={point.at[0] + place[0] * fontSize * 0.62}
              // `place` is given in mathematical coordinates (y up); the screen
              // y axis points down, so the vertical component is subtracted.
              y={sy(point.at[1]) - place[1] * fontSize * 0.62}
              textAnchor={place[0] === 0 ? 'middle' : place[0] > 0 ? 'start' : 'end'}
              dominantBaseline="middle"
              fontSize={fontSize}
              className={LABEL_CLASS[tone] ?? styles.label ?? ''}
            >
              {point.label}
            </text>
          </g>
        );
      })}

      {spec.texts?.map((text, index) => (
        <text
          key={`text-${index}`}
          x={text.at[0]}
          y={sy(text.at[1])}
          textAnchor={text.anchor ?? 'middle'}
          dominantBaseline="middle"
          fontSize={text.size ?? fontSize * 0.9}
          className={LABEL_CLASS[text.tone ?? 'mark'] ?? styles.label ?? ''}
        >
          {text.text}
        </text>
      ))}
    </svg>
  );
}
