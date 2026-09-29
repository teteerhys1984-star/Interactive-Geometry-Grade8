import { useId, useState } from 'react';
import type { InteractiveDiagram } from '@/content/schema';
import styles from './ConstructionFigure.module.css';

/**
 * ============================================================================
 *  CONSTRUCTION FIGURE — step-by-step plane geometry (no grid)
 * ============================================================================
 *
 *  Renders points, segments, lines, circles and translation arrows, each
 *  belonging to a construction STEP. The student walks the construction with
 *  «الخطوة التالية» instead of staring at a finished picture.
 *
 *  All coordinates are supplied by the content layer and are exact: image
 *  points are computed there as P' = P + v, so the parallelogram relations the
 *  figure claims are true to the last decimal, not eyeballed.
 *
 *  This renderer draws PLATFORM-AUTHORED teaching figures. It is never used to
 *  claim a reproduction of a printed figure whose geometry could not be read.
 * ============================================================================
 */

type Point = [number, number];
type Tone = 'ink' | 'mark' | 'image' | 'aux';

interface PointElement {
  kind: 'point';
  at: Point;
  label?: string;
  tone?: Tone;
  /** Label offset in drawing units, [dx, dy] with y downwards. */
  offset?: Point;
  step?: number;
}

interface SegmentElement {
  kind: 'segment';
  from: Point;
  to: Point;
  dashed?: boolean;
  tone?: Tone;
  step?: number;
}

interface LineElement {
  kind: 'line';
  from: Point;
  to: Point;
  /** How far to extend past both endpoints, in drawing units. */
  extend?: number;
  tone?: Tone;
  step?: number;
}

interface CircleElement {
  kind: 'circle';
  center: Point;
  radius: number;
  label?: string;
  tone?: Tone;
  step?: number;
}

interface ArrowElement {
  kind: 'arrow';
  from: Point;
  to: Point;
  tone?: Tone;
  step?: number;
}

type Element = PointElement | SegmentElement | LineElement | CircleElement | ArrowElement;

interface Params {
  elements: Element[];
  steps: string[];
  padding: number;
}

function readParams(raw: Record<string, unknown>): Params | null {
  const elements = raw.elements;
  if (!Array.isArray(elements) || elements.length === 0) return null;
  return {
    elements: elements as Element[],
    steps: Array.isArray(raw.steps) ? (raw.steps as string[]) : [],
    padding: typeof raw.padding === 'number' ? raw.padding : 0.9,
  };
}

/** Join class names, dropping anything the CSS module did not define. */
function cx(...names: (string | undefined)[]): string {
  return names.filter(Boolean).join(' ');
}

function toneClass(tone: Tone | undefined, kind: 'stroke' | 'fill'): string {
  const key = tone ?? 'ink';
  if (kind === 'fill') {
    if (key === 'mark') return cx(styles.fillMark);
    if (key === 'image') return cx(styles.fillImage);
    if (key === 'aux') return cx(styles.fillAux);
    return cx(styles.fillInk);
  }
  if (key === 'mark') return cx(styles.strokeMark);
  if (key === 'image') return cx(styles.strokeImage);
  if (key === 'aux') return cx(styles.strokeAux);
  return cx(styles.strokeInk);
}

function labelClass(tone: Tone | undefined): string {
  return cx(styles.label, toneClass(tone, 'fill'));
}

function extremes(elements: Element[]): { minX: number; maxX: number; minY: number; maxY: number } {
  const xs: number[] = [];
  const ys: number[] = [];
  for (const element of elements) {
    switch (element.kind) {
      case 'point':
        xs.push(element.at[0]);
        ys.push(element.at[1]);
        break;
      case 'segment':
      case 'line':
      case 'arrow':
        xs.push(element.from[0], element.to[0]);
        ys.push(element.from[1], element.to[1]);
        break;
      case 'circle':
        xs.push(element.center[0] - element.radius, element.center[0] + element.radius);
        ys.push(element.center[1] - element.radius, element.center[1] + element.radius);
        break;
    }
  }
  return {
    minX: Math.min(...xs),
    maxX: Math.max(...xs),
    minY: Math.min(...ys),
    maxY: Math.max(...ys),
  };
}

export function ConstructionFigure({ spec }: { spec: InteractiveDiagram }) {
  const params = readParams(spec.params);
  const reactId = useId();
  const [step, setStep] = useState(0);

  if (!params) return null;
  const { elements, steps, padding } = params;

  const stepped = steps.length > 0;
  const visible = stepped ? elements.filter((element) => (element.step ?? 0) <= step) : elements;

  const box = extremes(elements);
  const width = box.maxX - box.minX + padding * 2;
  const height = box.maxY - box.minY + padding * 2;

  const sx = (x: number) => x - box.minX + padding;
  const sy = (y: number) => box.maxY - y + padding;

  const markerId = `cf-arrow-${reactId.replace(/[^a-zA-Z0-9]/g, '')}`;

  const isLast = step === steps.length - 1;

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
            <path d="M0,0 L4.5,2 L0,4 Z" className={styles.fillImage} />
          </marker>
        </defs>

        {visible.map((element, index) => {
          const key = `${element.kind}-${index}`;
          switch (element.kind) {
            case 'circle':
              return (
                <circle
                  key={key}
                  cx={sx(element.center[0])}
                  cy={sy(element.center[1])}
                  r={element.radius}
                  className={cx(styles.circle, toneClass(element.tone ?? 'aux', 'stroke'))}
                />
              );
            case 'segment':
              return (
                <line
                  key={key}
                  x1={sx(element.from[0])}
                  y1={sy(element.from[1])}
                  x2={sx(element.to[0])}
                  y2={sy(element.to[1])}
                  className={cx(styles.segment, toneClass(element.tone, 'stroke'))}
                  strokeDasharray={element.dashed ? '5 4' : undefined}
                />
              );
            case 'line': {
              const [x1, y1] = element.from;
              const [x2, y2] = element.to;
              const length = Math.hypot(x2 - x1, y2 - y1) || 1;
              const extend = element.extend ?? 1.2;
              const ux = ((x2 - x1) / length) * extend;
              const uy = ((y2 - y1) / length) * extend;
              return (
                <line
                  key={key}
                  x1={sx(x1 - ux)}
                  y1={sy(y1 - uy)}
                  x2={sx(x2 + ux)}
                  y2={sy(y2 + uy)}
                  className={cx(styles.segment, toneClass(element.tone, 'stroke'))}
                />
              );
            }
            case 'arrow':
              return (
                <line
                  key={key}
                  x1={sx(element.from[0])}
                  y1={sy(element.from[1])}
                  x2={sx(element.to[0])}
                  y2={sy(element.to[1])}
                  className={cx(styles.arrow, toneClass(element.tone ?? 'image', 'stroke'))}
                  markerEnd={`url(#${markerId})`}
                />
              );
            case 'point': {
              const [ox, oy] = element.offset ?? [0.34, -0.3];
              return (
                <g key={key}>
                  <circle
                    cx={sx(element.at[0])}
                    cy={sy(element.at[1])}
                    r={0.12}
                    className={toneClass(element.tone, 'fill')}
                  />
                  {element.label ? (
                    <text
                      x={sx(element.at[0]) + ox}
                      y={sy(element.at[1]) + oy}
                      className={labelClass(element.tone)}
                    >
                      {element.label}
                    </text>
                  ) : null}
                </g>
              );
            }
            default:
              return null;
          }
        })}
      </svg>

      {stepped ? (
        <div className={styles.stepper}>
          <p className={styles.caption}>
            <span className={styles.stepBadge} dir="ltr">
              {step + 1}/{steps.length}
            </span>
            {steps[step]}
          </p>
          <div className={styles.buttons}>
            <button
              type="button"
              className={styles.button}
              onClick={() => setStep((current) => Math.max(0, current - 1))}
              disabled={step === 0}
            >
              الخطوة السابقة
            </button>
            <button
              type="button"
              className={styles.button}
              onClick={() => setStep((current) => Math.min(steps.length - 1, current + 1))}
              disabled={isLast}
            >
              الخطوة التالية
            </button>
            <button
              type="button"
              className={styles.buttonGhost}
              onClick={() => setStep(0)}
              disabled={step === 0}
            >
              إعادة
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
