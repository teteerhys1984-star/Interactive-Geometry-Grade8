import { useId, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { InteractiveDiagram } from '@/content/schema';
import { LtrIsolate } from '@/components/math';
import styles from './TranslationPlayground.module.css';

/**
 * ============================================================================
 *  TRANSLATION PLAYGROUND — «اسحب النقطة M وشاهد صورتها»
 * ============================================================================
 *
 *  PLATFORM-AUTHORED teaching figure (never a textbook reproduction).
 *
 *  The student drags M on a lattice; the platform computes the image
 *  M' = M + (B − A) exactly, draws the quadrilateral ABM'M, and states which
 *  of the lesson's two cases applies:
 *
 *    • M ∉ (AB)  → ABM'M is a parallelogram, [AM'] and [BM] bisect each other.
 *    • M ∈ (AB)  → A, B, M, M' are collinear (the lesson's «حالة خاصة»).
 *
 *  Accessibility: M is a focusable element and can be moved with the arrow
 *  keys, so the figure is usable without a pointer.
 * ============================================================================
 */

type Point = [number, number];

interface Params {
  cols: number;
  rows: number;
  a: Point;
  b: Point;
  start: Point;
}

function readParams(raw: Record<string, unknown>): Params | null {
  const a = raw.a as Point | undefined;
  const b = raw.b as Point | undefined;
  const start = raw.start as Point | undefined;
  if (!Array.isArray(a) || !Array.isArray(b) || !Array.isArray(start)) return null;
  return {
    cols: typeof raw.cols === 'number' ? raw.cols : 10,
    rows: typeof raw.rows === 'number' ? raw.rows : 7,
    a,
    b,
    start,
  };
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** Latin geometric notation inside Arabic prose — always bidi-isolated. */
function Sym({ children }: { children: ReactNode }) {
  return <LtrIsolate>{children}</LtrIsolate>;
}

export function TranslationPlayground({ spec }: { spec: InteractiveDiagram }) {
  const params = readParams(spec.params);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const reactId = useId();
  const [m, setM] = useState<Point>(params ? params.start : [0, 0]);
  const [dragging, setDragging] = useState(false);

  if (!params) return null;
  const { cols, rows, a, b } = params;

  const pad = 0.8;
  const width = cols + pad * 2;
  const height = rows + pad * 2;
  const sx = (x: number) => x + pad;
  const sy = (y: number) => rows - y + pad;

  const vector: Point = [b[0] - a[0], b[1] - a[1]];
  const image: Point = [m[0] + vector[0], m[1] + vector[1]];

  // Collinearity of M with (AB) — exact integer cross product, no tolerance.
  const cross = vector[0] * (m[1] - a[1]) - vector[1] * (m[0] - a[0]);
  const onLine = cross === 0;

  const markerId = `tp-arrow-${reactId.replace(/[^a-zA-Z0-9]/g, '')}`;

  function moveTo(clientX: number, clientY: number) {
    const svg = svgRef.current;
    if (!svg || typeof svg.getScreenCTM !== 'function') return;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const point = svg.createSVGPoint();
    point.x = clientX;
    point.y = clientY;
    const local = point.matrixTransform(ctm.inverse());
    const mathX = Math.round(local.x - pad);
    const mathY = Math.round(rows - (local.y - pad));
    setM([
      clamp(mathX, Math.max(0, -vector[0]), Math.min(cols, cols - vector[0])),
      clamp(mathY, Math.max(0, -vector[1]), Math.min(rows, rows - vector[1])),
    ]);
  }

  function nudge(dx: number, dy: number) {
    setM(([x, y]) => [
      clamp(x + dx, Math.max(0, -vector[0]), Math.min(cols, cols - vector[0])),
      clamp(y + dy, Math.max(0, -vector[1]), Math.min(rows, rows - vector[1])),
    ]);
  }

  const lattice: Point[] = [];
  for (let x = 0; x <= cols; x += 1) {
    for (let y = 0; y <= rows; y += 1) lattice.push([x, y]);
  }

  return (
    <div className={styles.wrap}>
      <svg
        ref={svgRef}
        className={styles.svg}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={spec.alt.replace(/\$([^$]+)\$/g, '$1')}
        onPointerMove={(event) => {
          if (!dragging) return;
          event.preventDefault();
          moveTo(event.clientX, event.clientY);
        }}
        onPointerUp={() => setDragging(false)}
        onPointerLeave={() => setDragging(false)}
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

        {Array.from({ length: cols + 1 }, (_, x) => (
          <line
            key={`v${x}`}
            x1={sx(x)}
            y1={sy(rows)}
            x2={sx(x)}
            y2={sy(0)}
            className={styles.grid}
          />
        ))}
        {Array.from({ length: rows + 1 }, (_, y) => (
          <line
            key={`h${y}`}
            x1={sx(0)}
            y1={sy(y)}
            x2={sx(cols)}
            y2={sy(y)}
            className={styles.grid}
          />
        ))}

        {/* (AB) — the line that decides which of the two cases applies. */}
        <line
          x1={sx(a[0] - vector[0] * 4)}
          y1={sy(a[1] - vector[1] * 4)}
          x2={sx(b[0] + vector[0] * 4)}
          y2={sy(b[1] + vector[1] * 4)}
          className={styles.axis}
        />

        {/* Quadrilateral ABM'M — a genuine parallelogram whenever M ∉ (AB). */}
        <polygon
          points={[
            [sx(a[0]), sy(a[1])],
            [sx(b[0]), sy(b[1])],
            [sx(image[0]), sy(image[1])],
            [sx(m[0]), sy(m[1])],
          ]
            .map(([x, y]) => `${x},${y}`)
            .join(' ')}
          className={onLine ? styles.degenerate : styles.parallelogram}
        />

        {/* Diagonals [AM'] and [BM]: the lesson's bisection property. */}
        <line
          x1={sx(a[0])}
          y1={sy(a[1])}
          x2={sx(image[0])}
          y2={sy(image[1])}
          className={styles.diagonal}
        />
        <line x1={sx(b[0])} y1={sy(b[1])} x2={sx(m[0])} y2={sy(m[1])} className={styles.diagonal} />
        <circle
          cx={sx((a[0] + image[0]) / 2)}
          cy={sy((a[1] + image[1]) / 2)}
          r={0.11}
          className={styles.midpoint}
        />

        <line
          x1={sx(a[0])}
          y1={sy(a[1])}
          x2={sx(b[0])}
          y2={sy(b[1])}
          className={styles.vector}
          markerEnd={`url(#${markerId})`}
        />
        <line
          x1={sx(m[0])}
          y1={sy(m[1])}
          x2={sx(image[0])}
          y2={sy(image[1])}
          className={styles.vector}
          markerEnd={`url(#${markerId})`}
        />

        {lattice.map(([x, y]) => (
          <circle key={`n${x}-${y}`} cx={sx(x)} cy={sy(y)} r={0.055} className={styles.node} />
        ))}

        <g>
          <circle cx={sx(a[0])} cy={sy(a[1])} r={0.14} className={styles.pointInk} />
          <text x={sx(a[0]) - 0.36} y={sy(a[1]) + 0.62} className={styles.labelInk}>
            A
          </text>
          <circle cx={sx(b[0])} cy={sy(b[1])} r={0.14} className={styles.pointInk} />
          <text x={sx(b[0]) + 0.36} y={sy(b[1]) - 0.3} className={styles.labelInk}>
            B
          </text>
          <circle cx={sx(image[0])} cy={sy(image[1])} r={0.14} className={styles.pointImage} />
          <text x={sx(image[0]) + 0.46} y={sy(image[1]) - 0.3} className={styles.labelImage}>
            M&#x2032;
          </text>
        </g>

        {/* Draggable M — pointer and keyboard. */}
        <g
          className={styles.handle}
          tabIndex={0}
          role="slider"
          aria-label="اسحب النقطة M أو حرّكها بمفاتيح الأسهم"
          aria-valuetext={`M عند العمود ${m[0]} والسطر ${m[1]}`}
          aria-valuenow={m[0]}
          aria-valuemin={0}
          aria-valuemax={cols}
          onPointerDown={(event) => {
            event.preventDefault();
            setDragging(true);
            moveTo(event.clientX, event.clientY);
          }}
          onKeyDown={(event) => {
            const map: Record<string, Point> = {
              ArrowRight: [1, 0],
              ArrowLeft: [-1, 0],
              ArrowUp: [0, 1],
              ArrowDown: [0, -1],
            };
            const delta = map[event.key];
            if (!delta) return;
            event.preventDefault();
            nudge(delta[0], delta[1]);
          }}
        >
          <circle cx={sx(m[0])} cy={sy(m[1])} r={0.42} className={styles.handleHalo} />
          <circle cx={sx(m[0])} cy={sy(m[1])} r={0.16} className={styles.pointMark} />
          <text x={sx(m[0]) - 0.4} y={sy(m[1]) + 0.64} className={styles.labelMark}>
            M
          </text>
        </g>
      </svg>

      <div className={styles.readout} role="status">
        {onLine ? (
          <p className={styles.state}>
            الحالة الخاصة: النقطة <Sym>M</Sym> تنتمي إلى المستقيم <Sym>(AB)</Sym>، فالنقاط{' '}
            <Sym>A</Sym> و <Sym>B</Sym> و <Sym>M</Sym> و <Sym>M&#x2032;</Sym> على استقامة واحدة.
          </p>
        ) : (
          <p className={styles.state}>
            الحالة العامة: النقطة <Sym>M</Sym> لا تنتمي إلى المستقيم <Sym>(AB)</Sym>، فالرباعي{' '}
            <Sym>ABM&#x2032;M</Sym> متوازي أضلاع، والقطعتان <Sym>[AM&#x2032;]</Sym> و{' '}
            <Sym>[BM]</Sym> متناصفتان.
          </p>
        )}
        <p className={styles.hint}>اسحب النقطة الحمراء M، أو ركّز عليها واستعمل مفاتيح الأسهم.</p>
      </div>
    </div>
  );
}
