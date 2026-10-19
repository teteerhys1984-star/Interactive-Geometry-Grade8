import { useId, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import type { InteractiveDiagram } from '@/content/schema';
import {
  imageOf,
  isParallelogram,
  midpoint,
  onLine,
  type XY,
} from '@/content/units/lesson-02-geometry';
import styles from './lab.module.css';

/**
 * ============================================================================
 *  POINT IMAGE LAB — «مختبر صورة النقطة»
 * ============================================================================
 *  The core object of Lesson 2: a point M, a translation given by A → B, and
 *  its image M′ computed exactly as M′ = M + (B − A).
 *
 *  The student moves M (sliders or drag) and watches three things at once:
 *    • M′ always slides by the same vector as A→B;
 *    • ABM′M stays a parallelogram, with its diagonals bisected at I;
 *    • when M lands on the line (AB) the parallelogram collapses — the
 *      «حالة خاصة» printed on page 9 — but the diagonal bisection survives.
 *
 *  Nothing is approximated: every drawn coordinate is computed from the
 *  parameters, so the relations hold in every state the controls can reach.
 * ============================================================================
 */

interface Bounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

interface Params {
  a: XY;
  b: XY;
  m: XY;
  bounds: Bounds;
  snap: number;
  showGrid: boolean;
  showDiagonals: boolean;
  general: XY;
  collinear: XY | null;
}

function asPoint(value: unknown): XY | null {
  if (!Array.isArray(value) || value.length !== 2) return null;
  const [x, y] = value;
  if (typeof x !== 'number' || typeof y !== 'number') return null;
  return [x, y];
}

function readParams(raw: Record<string, unknown>): Params | null {
  const a = asPoint(raw.a);
  const b = asPoint(raw.b);
  const m = asPoint(raw.m);
  const bounds = raw.bounds as Partial<Bounds> | undefined;
  if (!a || !b || !m || !bounds) return null;
  if (
    typeof bounds.minX !== 'number' ||
    typeof bounds.maxX !== 'number' ||
    typeof bounds.minY !== 'number' ||
    typeof bounds.maxY !== 'number'
  ) {
    return null;
  }
  const general = asPoint(raw.general) ?? m;
  const collinear = asPoint(raw.collinear);
  return {
    a,
    b,
    m,
    bounds: bounds as Bounds,
    snap: typeof raw.snap === 'number' && raw.snap > 0 ? raw.snap : 0.25,
    showGrid: raw.showGrid !== false,
    showDiagonals: raw.showDiagonals !== false,
    general,
    collinear,
  };
}

const round = (value: number, step: number) => Math.round(value / step) * step;

export function PointImageLab({ spec }: { spec: InteractiveDiagram }) {
  const params = readParams(spec.params);
  const reactId = useId();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [m, setM] = useState<XY>(params?.m ?? [0, 0]);
  const [dragging, setDragging] = useState(false);

  if (!params) return null;

  const { a, b, bounds, snap, showGrid, showDiagonals, general, collinear } = params;
  const pad = 0.85;
  const width = bounds.maxX - bounds.minX + pad * 2;
  const height = bounds.maxY - bounds.minY + pad * 2;
  const sx = (x: number) => x - bounds.minX + pad;
  const sy = (y: number) => bounds.maxY - y + pad;

  const image = imageOf(m, a, b);
  const centre = midpoint(a, image);
  const centreOpposite = midpoint(b, m);
  const flattened = onLine(a, b, m, 1e-6);
  const parallelogram = isParallelogram(a, b, image, m, 1e-6);

  const markerBase = `pi-${reactId.replace(/[^a-zA-Z0-9]/g, '')}`;
  const arrowImage = `${markerBase}-image`;

  const clamp = (point: XY): XY => [
    Math.min(bounds.maxX, Math.max(bounds.minX, round(point[0], snap))),
    Math.min(bounds.maxY, Math.max(bounds.minY, round(point[1], snap))),
  ];

  function pointFromClient(clientX: number, clientY: number): XY | null {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return null;
    const vx = ((clientX - rect.left) / rect.width) * width;
    const vy = ((clientY - rect.top) / rect.height) * height;
    return clamp([vx - pad + bounds.minX, bounds.maxY + pad - vy]);
  }

  function handlePointerMove(event: ReactPointerEvent<SVGSVGElement>) {
    if (!dragging) return;
    const next = pointFromClient(event.clientX, event.clientY);
    if (next) setM(next);
  }

  const gridX: number[] = [];
  for (let x = Math.ceil(bounds.minX); x <= Math.floor(bounds.maxX); x += 1) gridX.push(x);
  const gridY: number[] = [];
  for (let y = Math.ceil(bounds.minY); y <= Math.floor(bounds.maxY); y += 1) gridY.push(y);

  const fmt = (value: number) => (Number.isInteger(value) ? String(value) : value.toFixed(2));

  return (
    <div className={styles.lab}>
      <svg
        ref={svgRef}
        className={styles.stage}
        viewBox={`0 0 ${width.toFixed(3)} ${height.toFixed(3)}`}
        role="img"
        aria-label={spec.alt.replace(/\$([^$]+)\$/g, '$1')}
        preserveAspectRatio="xMidYMid meet"
        onPointerMove={handlePointerMove}
        onPointerUp={() => setDragging(false)}
        onPointerLeave={() => setDragging(false)}
      >
        <defs>
          <marker
            id={arrowImage}
            markerWidth="6"
            markerHeight="6"
            refX="4.4"
            refY="2"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L4.6,2 L0,4 Z" className={styles.arrowHead} />
          </marker>
        </defs>

        <rect
          x={sx(bounds.minX)}
          y={sy(bounds.maxY)}
          width={bounds.maxX - bounds.minX}
          height={bounds.maxY - bounds.minY}
          className={styles.paper}
        />

        {showGrid
          ? gridX.map((x) => (
              <line
                key={`gx-${x}`}
                x1={sx(x)}
                y1={sy(bounds.maxY)}
                x2={sx(x)}
                y2={sy(bounds.minY)}
                className={styles.gridLine}
              />
            ))
          : null}
        {showGrid
          ? gridY.map((y) => (
              <line
                key={`gy-${y}`}
                x1={sx(bounds.minX)}
                y1={sy(y)}
                x2={sx(bounds.maxX)}
                y2={sy(y)}
                className={styles.gridLine}
              />
            ))
          : null}

        {/* The line (AB), drawn past A and B so the two cases are visible. */}
        <line
          x1={sx(a[0] - (b[0] - a[0]) * 0.16)}
          y1={sy(a[1] - (b[1] - a[1]) * 0.16)}
          x2={sx(b[0] + (b[0] - a[0]) * 0.22)}
          y2={sy(b[1] + (b[1] - a[1]) * 0.22)}
          className={styles.segmentThin}
        />

        <polygon
          points={[a, b, image, m].map(([x, y]) => `${sx(x)},${sy(y)}`).join(' ')}
          className={flattened ? styles.shapeImage : styles.shape}
        />

        {showDiagonals ? (
          <>
            <line
              x1={sx(a[0])}
              y1={sy(a[1])}
              x2={sx(image[0])}
              y2={sy(image[1])}
              className={`${styles.diagonal}`}
            />
            <line
              x1={sx(b[0])}
              y1={sy(b[1])}
              x2={sx(m[0])}
              y2={sy(m[1])}
              className={`${styles.diagonal}`}
            />
          </>
        ) : null}

        {/* The defining vector A → B, and the same vector carried by M. */}
        <line
          x1={sx(a[0])}
          y1={sy(a[1])}
          x2={sx(b[0])}
          y2={sy(b[1])}
          className={styles.vector}
          markerEnd={`url(#${arrowImage})`}
          data-role="vector-ab"
        />
        <line
          x1={sx(m[0])}
          y1={sy(m[1])}
          x2={sx(image[0])}
          y2={sy(image[1])}
          className={styles.vectorDashed}
          markerEnd={`url(#${arrowImage})`}
          data-role="vector-mm"
        />

        {showDiagonals ? (
          <g data-testid="centre" data-x={centre[0]} data-y={centre[1]}>
            <circle cx={sx(centre[0])} cy={sy(centre[1])} r={0.13} className={styles.pointAux} />
            <text
              x={sx(centre[0]) - 0.34}
              y={sy(centre[1]) + 0.42}
              className={`${styles.label} ${styles.labelAux}`}
            >
              I
            </text>
          </g>
        ) : null}

        <g data-testid="point-a">
          <circle cx={sx(a[0])} cy={sy(a[1])} r={0.16} className={styles.pointInk} />
          <text
            x={sx(a[0]) - 0.36}
            y={sy(a[1]) + 0.5}
            className={`${styles.label} ${styles.labelInk}`}
          >
            A
          </text>
        </g>
        <g data-testid="point-b">
          <circle cx={sx(b[0])} cy={sy(b[1])} r={0.16} className={styles.pointInk} />
          <text
            x={sx(b[0]) + 0.36}
            y={sy(b[1]) + 0.5}
            className={`${styles.label} ${styles.labelInk}`}
          >
            B
          </text>
        </g>

        <g
          data-testid="point-m"
          data-x={m[0]}
          data-y={m[1]}
          role="button"
          aria-label="النقطة M — اسحبها أو استعمل شريطي التشغيل"
          tabIndex={0}
          style={{ cursor: dragging ? 'grabbing' : 'grab' }}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture?.(event.pointerId);
            setDragging(true);
          }}
          onKeyDown={(event) => {
            const step = event.shiftKey ? snap * 4 : snap;
            if (event.key === 'ArrowUp') setM(clamp([m[0], m[1] + step]));
            else if (event.key === 'ArrowDown') setM(clamp([m[0], m[1] - step]));
            else if (event.key === 'ArrowRight') setM(clamp([m[0] + step, m[1]]));
            else if (event.key === 'ArrowLeft') setM(clamp([m[0] - step, m[1]]));
            else return;
            event.preventDefault();
          }}
        >
          <circle cx={sx(m[0])} cy={sy(m[1])} r={0.22} className={styles.pointHalo} />
          <circle cx={sx(m[0])} cy={sy(m[1])} r={0.17} className={styles.pointRing} />
          <text
            x={sx(m[0]) - 0.38}
            y={sy(m[1]) - 0.3}
            className={`${styles.label} ${styles.labelInk}`}
          >
            M
          </text>
        </g>

        <g data-testid="point-image" data-x={image[0]} data-y={image[1]}>
          <circle cx={sx(image[0])} cy={sy(image[1])} r={0.17} className={styles.pointImage} />
          <text
            x={sx(image[0]) + 0.44}
            y={sy(image[1]) - 0.3}
            className={`${styles.label} ${styles.labelImage}`}
          >
            M′
          </text>
        </g>
      </svg>

      <div className={styles.controls}>
        <p className={styles.controlsTitle}>حرّك النقطة M بنفسك</p>
        <div className={styles.row}>
          <label className={styles.fieldLabel}>
            أفقي
            <input
              className={styles.slider}
              type="range"
              min={bounds.minX}
              max={bounds.maxX}
              step={snap}
              value={m[0]}
              aria-label="إحداثي النقطة M الأفقي"
              onChange={(event) => setM(clamp([Number(event.target.value), m[1]]))}
            />
          </label>
          <label className={styles.fieldLabel}>
            رأسي
            <input
              className={styles.slider}
              type="range"
              min={bounds.minY}
              max={bounds.maxY}
              step={snap}
              value={m[1]}
              aria-label="إحداثي النقطة M الرأسي"
              onChange={(event) => setM(clamp([m[0], Number(event.target.value)]))}
            />
          </label>
        </div>
        <div className={styles.buttons}>
          <button type="button" className={styles.buttonGhost} onClick={() => setM(general)}>
            الحالة العامة
          </button>
          {collinear ? (
            <button type="button" className={styles.buttonGhost} onClick={() => setM(collinear)}>
              ضع M على المستقيم (AB)
            </button>
          ) : null}
          <button type="button" className={styles.buttonGhost} onClick={() => setM(params.m)}>
            إعادة الضبط
          </button>
        </div>
      </div>

      <div className={styles.readout} role="status" aria-live="polite">
        {flattened ? (
          <>
            <span>
              <strong>الحالة الخاصة:</strong> النقطة M على المستقيم (AB)، فالنقاط A و B و M′ و M على
              استقامة واحدة ولا يظهر متوازي أضلاع.
            </span>
            <span>
              ومع ذلك تبقى القطعتان [AM′] و [BM] متناصفتين في I، لأن{' '}
              <span className={styles.mono}>(A + M′) / 2 = (B + M) / 2</span>.
            </span>
          </>
        ) : (
          <>
            <span>
              <strong>الرباعي ABM′M متوازي أضلاع</strong>، لأن كل رأس انتقل بالاتجاه نفسه والمسافة
              نفسها؛ وقطراه [AM′] و [BM] متناصفتان في I.
            </span>
            <span>
              تحقّق: منتصف [AM′] هو{' '}
              <span className={styles.mono}>
                ({fmt(centre[0])}، {fmt(centre[1])})
              </span>{' '}
              ومنتصف [BM] هو{' '}
              <span className={styles.mono}>
                ({fmt(centreOpposite[0])}، {fmt(centreOpposite[1])})
              </span>{' '}
              — النقطة نفسها.
            </span>
          </>
        )}
        <span className={styles.mono}>
          M({fmt(m[0])}, {fmt(m[1])}) → M′({fmt(image[0])}, {fmt(image[1])})
        </span>
        {!parallelogram ? <span>تنبيه: العلاقة الهندسية لا تنطبق في هذا الموضع.</span> : null}
      </div>
    </div>
  );
}
