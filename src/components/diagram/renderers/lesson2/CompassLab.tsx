import { useState } from 'react';
import type { InteractiveDiagram } from '@/content/schema';
import {
  circleIntersections,
  distance,
  imageOf,
  midpoint,
  samePoint,
  type XY,
} from '@/content/units/lesson-02-geometry';
import { RichText } from '@/components/math';
import styles from './lab.module.css';

/**
 * ============================================================================
 *  COMPASS LAB — «الإنشاء بالفرجار»
 * ============================================================================
 *  Step-by-step reproduction of the construction printed on page 9:
 *  complete HGM to the parallelogram HGMM′ using two compass circles.
 *
 *  Circle (C₁): centre M, radius GH.  Circle (C₂): centre H, radius GM.
 *  Their two intersections are the two candidates; only one completes HGMM′.
 *  The rejected candidate is available on request, with the reason, because
 *  “why is that point wrong?” is the question students actually ask.
 *
 *  Every coordinate and radius is computed, never drawn by eye, so the
 *  figure cannot drift away from the text that justifies it. The viewBox is
 *  fixed from the *points* of the construction (not from the circles), so the
 *  figure stays a consistent zoom across steps instead of shrinking to fit two
 *  six-unit circles; the circles simply leave the sheet, as they would on paper.
 * ============================================================================
 */

interface Params {
  h: XY;
  g: XY;
  m: XY;
  steps: string[];
  proofStep: number | null;
  rejectedNote: string | null;
  /** `proof` draws the finished construction with the equality marks, no stepper. */
  mode: 'construction' | 'proof';
  proofCaption: string | null;
}

function asPoint(value: unknown): XY | null {
  if (!Array.isArray(value) || value.length !== 2) return null;
  const [x, y] = value;
  if (typeof x !== 'number' || typeof y !== 'number') return null;
  return [x, y];
}

function readParams(raw: Record<string, unknown>): Params | null {
  const h = asPoint(raw.h);
  const g = asPoint(raw.g);
  const m = asPoint(raw.m);
  if (!h || !g || !m) return null;
  return {
    h,
    g,
    m,
    steps: Array.isArray(raw.steps)
      ? raw.steps.filter((s): s is string => typeof s === 'string')
      : [],
    proofStep: typeof raw.proofStep === 'number' ? raw.proofStep : null,
    rejectedNote: typeof raw.rejectedNote === 'string' ? raw.rejectedNote : null,
    mode: raw.mode === 'proof' ? 'proof' : 'construction',
    proofCaption: typeof raw.proofCaption === 'string' ? raw.proofCaption : null,
  };
}

/** A single or double tick across the middle of [a b] — the equality mark. */
function Tick({ a, b, double = false }: { a: XY; b: XY; double?: boolean }) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const length = Math.hypot(dx, dy) || 1;
  const x = (a[0] + b[0]) / 2;
  const y = (a[1] + b[1]) / 2;
  const nx = (-dy / length) * 0.2;
  const ny = (dx / length) * 0.2;
  const ux = (dx / length) * 0.14;
  const uy = (dy / length) * 0.14;
  return (
    <g>
      {(double ? [-1, 1] : [0]).map((offset) => (
        <line
          key={offset}
          x1={x + ux * offset - nx}
          y1={y + uy * offset - ny}
          x2={x + ux * offset + nx}
          y2={y + uy * offset + ny}
          className={styles.tick}
        />
      ))}
    </g>
  );
}

export function CompassLab({ spec }: { spec: InteractiveDiagram }) {
  const params = readParams(spec.params);
  const [step, setStep] = useState(0);
  const [showRejected, setShowRejected] = useState(false);

  if (!params) return null;

  const { h, g, m, steps, proofStep, rejectedNote, mode, proofCaption } = params;
  const expected = imageOf(m, g, h); // M′ = M + (H − G)
  const radiusFromImageCircle = distance(h, g); // GH
  const radiusFromGivenCircle = distance(g, m); // GM
  const intersections = circleIntersections(m, radiusFromImageCircle, h, radiusFromGivenCircle);

  // The figure must be true even if the content numbers drifted: the printed
  // construction keeps the intersection that completes the parallelogram.
  const chosen = intersections
    ? samePoint(intersections[0], expected, 1e-6)
      ? intersections[0]
      : intersections[1]
    : expected;
  const rejected = intersections
    ? samePoint(intersections[0], chosen, 1e-9)
      ? intersections[1]
      : intersections[0]
    : null;

  const proofMode = mode === 'proof';
  const lastStep = Math.max(0, steps.length - 1);
  const proof = proofMode || (proofStep !== null && step >= proofStep);
  const showFirstArc = proofMode || step >= 1;
  const showSecondArc = proofMode || step >= 2;
  const showIntersections = proofMode || step >= 3;
  const showParallelogram = proofMode || step >= 3;

  /*
   * Fixed frame, computed from the points of the construction only. Including
   * the circle extents would shrink the drawing by a factor of two and leave
   * most of the sheet empty on the first steps.
   */
  const xs = [h[0], g[0], m[0], chosen[0], ...(rejected ? [rejected[0]] : [])];
  const ys = [h[1], g[1], m[1], chosen[1], ...(rejected ? [rejected[1]] : [])];
  const pad = 1.15;
  const minX = Math.min(...xs) - pad;
  const maxX = Math.max(...xs) + pad;
  const minY = Math.min(...ys) - pad;
  const maxY = Math.max(...ys) + pad;
  const width = maxX - minX;
  const height = maxY - minY;
  const sx = (x: number) => x - minX;
  const sy = (y: number) => maxY - y;

  const centre = midpoint(h, m);
  /** Content coordinates → SVG coordinates, for the mark helpers. */
  const project = (p: XY): XY => [sx(p[0]), sy(p[1])];

  return (
    <div className={styles.lab}>
      <svg
        className={`${styles.stage} ${styles.stageClipped}`}
        viewBox={`0 0 ${width.toFixed(3)} ${height.toFixed(3)}`}
        role="img"
        aria-label={spec.alt.replace(/\$([^$]+)\$/g, '$1')}
        preserveAspectRatio="xMidYMid meet"
      >
        <rect x={0} y={0} width={width} height={height} className={styles.paper} />

        {/* The finished parallelogram, as a soft area behind everything. */}
        {showParallelogram ? (
          <polygon
            points={[h, g, m, chosen].map((p) => `${sx(p[0])},${sy(p[1])}`).join(' ')}
            className={styles.area}
          />
        ) : null}

        {showFirstArc ? (
          <circle
            cx={sx(m[0])}
            cy={sy(m[1])}
            r={radiusFromImageCircle}
            className={styles.arcImage}
            data-role="c1"
            data-radius={radiusFromImageCircle}
          />
        ) : null}
        {showSecondArc ? (
          <circle
            cx={sx(h[0])}
            cy={sy(h[1])}
            r={radiusFromGivenCircle}
            className={styles.arc}
            data-role="c2"
            data-radius={radiusFromGivenCircle}
          />
        ) : null}

        {/* The given segment [HG]. */}
        <line
          x1={sx(h[0])}
          y1={sy(h[1])}
          x2={sx(g[0])}
          y2={sy(g[1])}
          className={styles.segment}
          data-role="given-hg"
        />

        {showParallelogram ? (
          <>
            {(
              [
                [g, m],
                [m, chosen],
                [chosen, h],
              ] as [XY, XY][]
            ).map(([from, to], index) => (
              <line
                key={index}
                x1={sx(from[0])}
                y1={sy(from[1])}
                x2={sx(to[0])}
                y2={sy(to[1])}
                className={`${styles.segmentThin} ${styles.dashed}`}
              />
            ))}
          </>
        ) : null}

        {proof ? (
          <>
            <line
              x1={sx(h[0])}
              y1={sy(h[1])}
              x2={sx(m[0])}
              y2={sy(m[1])}
              className={styles.proof}
              data-role="proof-diagonal"
            />
            <Tick a={project(h)} b={project(g)} />
            <Tick a={project(m)} b={project(chosen)} />
            <Tick a={project(g)} b={project(m)} double />
            <Tick a={project(h)} b={project(chosen)} double />
          </>
        ) : null}

        {showIntersections && rejected ? (
          <g
            data-testid="rejected-point"
            data-x={rejected[0]}
            data-y={rejected[1]}
            opacity={showRejected ? 1 : 0}
          >
            <circle
              cx={sx(rejected[0])}
              cy={sy(rejected[1])}
              r={0.2}
              fill="none"
              stroke="#b3261e"
              strokeWidth={1.6}
              strokeDasharray="3 3"
              vectorEffect="non-scaling-stroke"
            />
            <text
              x={sx(rejected[0]) + 0.28}
              y={sy(rejected[1]) - 0.24}
              className={`${styles.label} ${styles.labelWarn}`}
            >
              X
            </text>
          </g>
        ) : null}

        {showIntersections ? (
          <g data-testid="compass-image" data-x={chosen[0]} data-y={chosen[1]}>
            <circle cx={sx(chosen[0])} cy={sy(chosen[1])} r={0.22} className={styles.pointHalo} />
            <circle cx={sx(chosen[0])} cy={sy(chosen[1])} r={0.17} className={styles.pointImage} />
            <text
              x={sx(chosen[0]) - 0.52}
              y={sy(chosen[1]) + 0.62}
              className={`${styles.label} ${styles.labelImage}`}
            >
              M′
            </text>
          </g>
        ) : null}

        <g data-testid="given-h">
          <circle cx={sx(h[0])} cy={sy(h[1])} r={0.17} className={styles.pointInk} />
          <text
            x={sx(h[0]) - 0.48}
            y={sy(h[1]) + 0.52}
            className={`${styles.label} ${styles.labelInk}`}
          >
            H
          </text>
        </g>
        <g data-testid="given-g">
          <circle cx={sx(g[0])} cy={sy(g[1])} r={0.17} className={styles.pointInk} />
          <text
            x={sx(g[0]) + 0.26}
            y={sy(g[1]) + 0.52}
            className={`${styles.label} ${styles.labelInk}`}
          >
            G
          </text>
        </g>
        <g data-testid="given-m">
          <circle cx={sx(m[0])} cy={sy(m[1])} r={0.18} className={styles.pointGiven} />
          <text
            x={sx(m[0]) + 0.36}
            y={sy(m[1]) + 0.44}
            className={`${styles.label} ${styles.labelInk}`}
          >
            M
          </text>
        </g>

        {proof ? (
          <g data-testid="proof-centre" data-x={centre[0]} data-y={centre[1]}>
            <circle cx={sx(centre[0])} cy={sy(centre[1])} r={0.12} className={styles.pointAux} />
          </g>
        ) : null}
      </svg>

      <div className={styles.controls}>
        <p className={styles.controlsTitle}>
          {proofMode ? 'لماذا يثبت الإنشاء؟' : 'الإنشاء خطوة بخطوة'}
        </p>
        {proofMode ? (
          <p className={styles.readout} role="status" aria-live="polite">
            <span>
              <RichText text={proofCaption ?? ''} />
            </span>
          </p>
        ) : (
          <p className={styles.readout} role="status" aria-live="polite">
            <span>
              <strong>
                <span className={styles.mono}>
                  {step + 1}/{steps.length}
                </span>{' '}
                — الخطوة الحالية:
              </strong>{' '}
              <RichText text={steps[step] ?? ''} />
            </span>
          </p>
        )}
        {proofMode ? null : (
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
              onClick={() => setStep((current) => Math.min(lastStep, current + 1))}
              disabled={step === lastStep}
            >
              الخطوة التالية
            </button>
            <button
              type="button"
              className={styles.buttonGhost}
              onClick={() => {
                setStep(0);
                setShowRejected(false);
              }}
            >
              إعادة
            </button>
          </div>
        )}

        {showIntersections ? (
          <label className={styles.toggle}>
            <input
              type="checkbox"
              checked={showRejected}
              onChange={(event) => setShowRejected(event.target.checked)}
            />
            أظهر نقطة التقاطع الأخرى
          </label>
        ) : null}
        {showRejected && rejectedNote ? (
          <p className={styles.note}>
            <RichText text={rejectedNote} />
          </p>
        ) : null}

        <ul className={styles.legend} aria-label="دليل الرموز">
          <li>
            <span className={`${styles.dot} ${styles.dotInk}`} aria-hidden="true" /> نقاط المعطى
          </li>
          <li>
            <span className={`${styles.dot} ${styles.dotImage}`} aria-hidden="true" /> الصورة
          </li>
          <li>
            <span className={`${styles.dot} ${styles.dotAux}`} aria-hidden="true" /> مساعدات الإنشاء
            والبرهان
          </li>
        </ul>
      </div>
    </div>
  );
}
