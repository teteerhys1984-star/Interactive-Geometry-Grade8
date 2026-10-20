import { useId } from 'react';
import type { FigureSpec, FigureTone } from '@/lib/geometryFigure';
import {
  angleLabelCandidates,
  angleMarkSegments,
  collectObstacles,
  frameInnerRect,
  placeLabels,
  type LabelRequest,
  type PlacedLabel,
} from '@/lib/figureLayout';
import {
  figureTypography,
  textWidth,
  LABEL_BOX_HEIGHT,
  type FigureTypography,
} from '@/lib/figureTypography';
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
 *  Two things are deliberately NOT decided here:
 *
 *    • geometry — every coordinate arrives computed in `lesson-04-geometry.ts`,
 *      where the tests can re-measure it;
 *    • typography — all sizes come from `figureTypography`, which derives them
 *      from the window WIDTH so that a letter is the same size on screen in
 *      every figure of the lesson (see `docs/LESSON-04-LABEL-AUDIT.md`).
 *
 *  Labels are placed by `figureLayout`, which knows where the ink is: a letter
 *  may never sit on a side, an arc, a tick, a frame border or another label.
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

interface TaggedLabel extends PlacedLabel {
  tone: FigureTone;
  fontWeight?: 'vertex';
}

/**
 * Places every label of the figure at once.
 *
 * Priority is deliberate: vertex names first (a misplaced letter is a wrong
 * figure), then angle values, then measurement values, then panel numbers —
 * each later group must then avoid the earlier ones.
 */
export function computeLabelLayout(spec: FigureSpec, typography: FigureTypography) {
  const points = spec.points ?? [];
  const angles = spec.angles ?? [];
  const texts = spec.texts ?? [];
  const frames = spec.frames ?? [];

  const vertexRequests: LabelRequest[] = points.map((point) => ({
    text: point.label,
    at: point.at,
    fontSize: typography.vertex,
    place: point.place ?? 'n',
    clearance: typography.dotRadius,
  }));

  const angleRequests: LabelRequest[] = [];
  const angleElements: number[] = [];
  angles.forEach((angle, index) => {
    if (!angle.label) return;
    const radius = Math.min(angle.radius ?? typography.arcRadius, typography.arcRadius);
    // The value belongs to its own arc: the candidate positions are measured
    // from the arc, not from a free direction, so a 35° mouth and an 85° mouth
    // both get a legible, unambiguous position.
    const candidates = angleLabelCandidates(
      angle,
      radius,
      typography.angle,
      textWidth(angle.label, typography.angle),
      typography.angle * LABEL_BOX_HEIGHT,
    );
    angleRequests.push({
      text: angle.label,
      at: angle.at,
      // The value is drawn beside its own arc: that arc is not an obstacle.
      ignore: [`angle:${index}`],
      fontSize: typography.angle,
      preferred: [candidateBisector(angle)[0], candidateBisector(angle)[1]],
      clearance: 0,
      // An angle's value must stay beside its own arc: it may nudge, not roam.
      travel: 0.6,
      preplaced: candidates,
    });
    angleElements.push(index);
  });

  const textRequests: LabelRequest[] = texts.map((text) => ({
    text: text.text,
    at: text.at,
    fontSize: text.size ?? typography.measure,
    preferred: text.away,
    anchor: text.anchor,
    // A value with a declared side keeps its clearance from its own side via
    // `preplaced`; one written at a free point (a centroid) may simply stay.
    preplaced: text.away ? undefined : [{ at: [0, 0], cost: 0 }],
  }));

  const inkClearance = Math.max(typography.stroke * 0.9, typography.unitsPerPixel * 0.6);
  const options = {
    inkClearance,
    labelGap: typography.unitsPerPixel * 1.2,
    maxTravel: 3.4,
  };

  const obstacles = collectObstacles(spec, typography.tick, typography.arcRadius);
  const vertexLabels = placeLabels(vertexRequests, obstacles, spec, options);
  const withVertices = [
    ...obstacles,
    ...vertexLabels.map((label) => ({
      a: [label.centre[0] - label.width / 2, label.centre[1]] as const,
      b: [label.centre[0] + label.width / 2, label.centre[1]] as const,
    })),
  ];

  const angleLabels = placeLabels(angleRequests, withVertices, spec, options);
  const withAngles = [
    ...withVertices,
    ...angleLabels.map((label) => ({
      a: [label.centre[0] - label.width / 2, label.centre[1]] as const,
      b: [label.centre[0] + label.width / 2, label.centre[1]] as const,
    })),
  ];

  const textLabels = placeLabels(textRequests, withAngles, spec, options);

  const tagged: TaggedLabel[] = [
    ...vertexLabels.map((label, index) => ({
      ...label,
      tone: points[index]?.tone ?? 'ink',
      fontWeight: 'vertex' as const,
    })),
    ...angleLabels.map((label, index) => ({
      ...label,
      tone: angles[angleElements[index]!]?.tone ?? 'mark',
    })),
    ...textLabels.map((label, index) => ({
      ...label,
      tone: texts[index]?.tone ?? 'mark',
    })),
  ];

  /**
   * Panel numbers are decorative and belong in a corner, so they keep a fixed
   * spot rather than being searched for; they are drawn as part of the frame.
   */
  const frameLabels = frames
    .filter((frame) => Boolean(frame.label))
    .map((frame) => {
      const inner = frameInnerRect(frame, typography.frame * 0.55);
      const text = frame.label ?? '';
      const width = Math.max(typography.frame * 0.95, text.length * typography.frame * 0.62);
      const centre: [number, number] =
        frame.labelPlace === 'left'
          ? [inner.x1 + width / 2, inner.y2 - (typography.frame * 0.62) / 2]
          : [inner.x2 - width / 2, inner.y2 - (typography.frame * 0.62) / 2];
      return { text, centre, width, height: typography.frame * 1.08 } as const;
    });

  return { labels: tagged, frameLabels, typography };
}

/** Unit vector from an angle's vertex towards the middle of its mouth. */
function candidateBisector(
  angle: FigureSpec['angles'] extends (infer A)[] | undefined ? A : never,
) {
  const first = [angle.from[0] - angle.at[0], angle.from[1] - angle.at[1]];
  const second = [angle.to[0] - angle.at[0], angle.to[1] - angle.at[1]];
  const l1 = Math.hypot(first[0]!, first[1]!) || 1;
  const l2 = Math.hypot(second[0]!, second[1]!) || 1;
  const x = first[0]! / l1 + second[0]! / l2;
  const y = first[1]! / l1 + second[1]! / l2;
  const length = Math.hypot(x, y) || 1;
  return [x / length, y / length] as const;
}

export function FigureSvg({ spec, ariaLabel, className }: FigureSvgProps) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const arrowId = `l4-arrow-${rawId}`;
  const { viewBox } = spec;
  const { labels, frameLabels, typography } = computeLabelLayout(spec, figureTypography(spec));
  const { stroke, dotRadius, tick, arcRadius, rightAngle } = typography;

  /** mathematical y (up) → SVG y (down) */
  const sy = (y: number) => 2 * viewBox.y + viewBox.h - y;
  const P = (p: readonly [number, number]): string => `${p[0]},${sy(p[1])}`;

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
          markerWidth="7"
          markerHeight="7"
          refX="5.6"
          refY="3.5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L7,3.5 L0,7 Z" className={styles.markLine} />
        </marker>
      </defs>

      {spec.frames?.map((frame, index) => (
        <rect
          key={`frame-${index}`}
          x={frame.x}
          y={sy(frame.y + frame.h)}
          width={frame.w}
          height={frame.h}
          className={styles.frame}
          strokeWidth={Math.max(stroke * 0.55, typography.unitsPerPixel * 0.7)}
          strokeDasharray={`${typography.unitsPerPixel * 7} ${typography.unitsPerPixel * 5}`}
          rx={typography.unitsPerPixel * 4}
        />
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
          strokeLinejoin="round"
          strokeDasharray={polygon.dashed ? `${stroke * 6} ${stroke * 5}` : undefined}
          fill={polygon.fill === false ? 'none' : undefined}
        />
      ))}

      {spec.segments?.map((segment, index) => {
        const tone = segment.tone ?? 'ink';
        const mid: [number, number] = [
          (segment.from[0] + segment.to[0]) / 2,
          (segment.from[1] + segment.to[1]) / 2,
        ];
        const dx = segment.to[0] - segment.from[0];
        const dy = segment.to[1] - segment.from[1];
        const length = Math.hypot(dx, dy) || 1;
        const along: [number, number] = [dx / length, dy / length];
        const across: [number, number] = [-along[1], along[0]];
        const count = segment.ticks ?? 0;
        return (
          <g key={`segment-${index}`}>
            <line
              x1={segment.from[0]}
              y1={sy(segment.from[1])}
              x2={segment.to[0]}
              y2={sy(segment.to[1])}
              className={TONE_CLASS[tone] ?? styles.inkLine ?? ''}
              strokeWidth={stroke}
              strokeLinecap="round"
              /* Dashes are sized from the stroke, not from the figure's units,
                 so a dashed line looks the same in every figure. */
              strokeDasharray={segment.dashed ? `${stroke * 5.5} ${stroke * 4.5}` : undefined}
              markerEnd={segment.arrow ? `url(#${arrowId})` : undefined}
            />
            {Array.from({ length: count }, (_, markIndex) => {
              const offset = (markIndex - (count - 1) / 2) * tick * 1.5;
              const centre: [number, number] = [
                mid[0] + along[0] * offset,
                mid[1] + along[1] * offset,
              ];
              return (
                <line
                  key={`tick-${markIndex}`}
                  x1={centre[0] - across[0] * tick}
                  y1={sy(centre[1] - across[1] * tick)}
                  x2={centre[0] + across[0] * tick}
                  y2={sy(centre[1] + across[1] * tick)}
                  className={styles.tick}
                  strokeWidth={stroke * 1.1}
                  strokeLinecap="round"
                />
              );
            })}
          </g>
        );
      })}

      {spec.angles?.map((angle, index) => {
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
          // Its size comes from the typography, not from the figure's own units,
          // so every right angle in the lesson has the same on-screen size.
          const marks = angleMarkSegments({ ...angle, radius: rightAngle }, rightAngle, 1);
          const [first, second] = marks;
          if (!first || !second) return null;
          return (
            <polyline
              key={`angle-${index}`}
              points={[P(first.a), P(first.b), P(second.b)].join(' ')}
              className={styles.rightSquare}
              strokeWidth={Math.max(stroke * 0.85, typography.unitsPerPixel * 1.3)}
            />
          );
        }

        // A short polyline is used instead of an SVG arc so the sweep direction
        // can never be mis-guessed: the points are computed on the true circle.
        const marks = angleMarkSegments(angle, radius, 24);
        const points = marks.map((mark) => P(mark.a));
        if (marks.length > 0) points.push(P(marks[marks.length - 1]!.b));
        return (
          <polyline
            key={`angle-${index}`}
            points={points.join(' ')}
            className={`${styles.angleArc} ${toneClass}`}
            strokeWidth={Math.max(stroke * 0.85, typography.unitsPerPixel * 1.3)}
          />
        );
      })}

      {spec.points?.map((point, index) =>
        point.dot === false ? null : (
          <circle
            key={`point-${index}`}
            cx={point.at[0]}
            cy={sy(point.at[1])}
            r={dotRadius}
            className={
              point.tone === 'image'
                ? styles.dotImage
                : point.tone === 'given'
                  ? styles.dotGiven
                  : styles.dot
            }
          />
        ),
      )}

      {labels.map((label, index) => (
        <text
          key={`label-${index}`}
          x={label.centre[0]}
          y={sy(label.centre[1])}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={label.fontSize}
          /*
           * The same size again, as an inline style. A presentation attribute
           * is the weakest declaration in the author origin, so ANY author rule
           * that happens to match `<text>` silently wins it — which is exactly
           * what happened: an unscoped `text { font-size: 5px }` in another
           * component's stylesheet (CSS Modules do not hash type selectors)
           * drew every label of this lesson at 5 user units. The inline style
           * is the one declaration no stylesheet can outrank, so the size this
           * component computes is the size that paints. The attribute stays:
           * `figureTypography`/`figureLayout` and the typography suite read it,
           * and it remains the no-CSS fallback.
           */
          style={{ fontSize: `${label.fontSize}px` }}
          className={`${LABEL_CLASS[label.tone] ?? styles.label ?? ''} ${
            label.fontWeight === 'vertex' ? styles.vertexLabel : ''
          }`}
        >
          {label.text}
        </text>
      ))}

      {frameLabels.map((label, index) => (
        <text
          key={`frame-label-${index}`}
          x={label.centre[0]}
          y={sy(label.centre[1])}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={typography.frame}
          /* Inline for the same reason as the labels above. */
          style={{ fontSize: `${typography.frame}px` }}
          className={`${styles.label} ${styles.frameLabel}`}
        >
          {label.text}
        </text>
      ))}
    </svg>
  );
}
