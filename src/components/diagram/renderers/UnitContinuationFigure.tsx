import type { InteractiveDiagram } from '@/content/schema';
import { plainText } from '@/lib/bidi';
import styles from './UnitContinuationFigure.module.css';

function GridLines({
  columns,
  rows,
  x,
  y,
  cell,
}: {
  columns: number;
  rows: number;
  x: number;
  y: number;
  cell: number;
}) {
  return (
    <g className={styles.grid}>
      {Array.from({ length: columns + 1 }, (_, index) => (
        <line
          key={`v-${index}`}
          x1={x + index * cell}
          y1={y}
          x2={x + index * cell}
          y2={y + rows * cell}
        />
      ))}
      {Array.from({ length: rows + 1 }, (_, index) => (
        <line
          key={`h-${index}`}
          x1={x}
          y1={y + index * cell}
          x2={x + columns * cell}
          y2={y + index * cell}
        />
      ))}
    </g>
  );
}

function Dot({
  x,
  y,
  label,
  dx = 4,
  dy = -5,
}: {
  x: number;
  y: number;
  label: string;
  dx?: number;
  dy?: number;
}) {
  return (
    <g>
      <circle cx={x} cy={y} r="2.5" className={styles.dot} />
      <text x={x + dx} y={y + dy} className={styles.label}>
        {label}
      </text>
    </g>
  );
}

/** Static SVGs whose geometry is either source-verified or explicitly authored. */
export function UnitContinuationFigure({ spec }: { spec: InteractiveDiagram }) {
  const scenario = String(spec.params.scenario ?? '');
  return (
    <div className={styles.wrap} dir="ltr">
      <svg viewBox="0 0 640 360" role="img" aria-label={plainText(spec.alt)}>
        <defs>
          <marker id="uc-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" className={styles.arrowHead} />
          </marker>
          <pattern id="uc-dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" className={styles.patternDot} />
          </pattern>
        </defs>

        {scenario === 'q6-source-grid' ? <Q6Source /> : null}
        {scenario === 'q13-source-grid' ? <Q13Source /> : null}
        {scenario === 'q15-source-triangle' ? <Q15Source /> : null}
        {scenario === 'q5-central-symmetry' ? <Q5Authored /> : null}
        {scenario === 'q7-coordinate-images' ? <Q7Authored /> : null}
        {scenario === 'q8-rectangle-proof' ? <Q8Authored /> : null}
        {scenario === 'q12-parallel-images' ? <Q12Authored /> : null}
        {scenario === 'q14-rectangle-translations' ? <Q14Authored /> : null}
      </svg>
    </div>
  );
}

function Q6Source() {
  const x = 80;
  const y = 48;
  const cell = 52;
  return (
    <>
      <GridLines columns={8} rows={5} x={x} y={y} cell={cell} />
      {/* Source cells: three in the first occupied row, then two shifted right. */}
      {[
        [1, 1],
        [2, 1],
        [3, 1],
        [3, 2],
        [4, 2],
      ].map(([column, row], index) => (
        <rect
          key={index}
          x={x + column! * cell + 1}
          y={y + row! * cell + 1}
          width={cell - 2}
          height={cell - 2}
          className={styles.yellowCell}
        />
      ))}
      <circle cx={x + 7 * cell} cy={y + cell} r="6" className={styles.redDot} />
      <text x={x + 7 * cell + 10} y={y + cell - 10} className={styles.redLabel}>
        A
      </text>
      <circle cx={x + 4 * cell} cy={y + 4 * cell} r="6" className={styles.redDot} />
      <text x={x + 4 * cell + 10} y={y + 4 * cell - 10} className={styles.redLabel}>
        C
      </text>
      <circle cx={x + 3.55 * cell} cy={y + 1.55 * cell} r="18" className={styles.exerciseBubble} />
      <text
        x={x + 3.55 * cell}
        y={y + 1.67 * cell}
        textAnchor="middle"
        className={styles.exerciseNumber}
      >
        ①
      </text>
    </>
  );
}

function Q13Source() {
  const x = 58;
  const y = 38;
  const cellX = 57;
  const cellY = 88;
  const points = [
    { label: 'F', gx: 1, gy: 3 },
    { label: 'L', gx: 2, gy: 3 },
    { label: 'A', gx: 3, gy: 3, red: true },
    { label: 'G', gx: 4, gy: 3 },
    { label: 'H', gx: 5, gy: 3 },
    { label: 'B', gx: 6, gy: 3, red: true },
    { label: 'I', gx: 8, gy: 3 },
    { label: 'J', gx: 9, gy: 3 },
    { label: 'K', gx: 3, gy: 2 },
    { label: 'C', gx: 5, gy: 2 },
    { label: 'D', gx: 6, gy: 2 },
    { label: 'E', gx: 8, gy: 2 },
    { label: 'M', gx: 4, gy: 1 },
    { label: 'N', gx: 7, gy: 1 },
  ];
  return (
    <>
      <rect x="28" y="17" width="584" height="326" rx="4" className={styles.paper} />
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((column) => (
        <line
          key={`v-${column}`}
          x1={x + column * cellX}
          y1="30"
          x2={x + column * cellX}
          y2="326"
          className={styles.dashedGrid}
        />
      ))}
      {[1, 2, 3].map((row) => (
        <line
          key={`h-${row}`}
          x1="34"
          y1={y + row * cellY}
          x2="606"
          y2={y + row * cellY}
          className={styles.dashedGrid}
        />
      ))}
      {points.map((point) => {
        const px = x + point.gx * cellX;
        const py = y + point.gy * cellY;
        return point.red ? (
          <g key={point.label}>
            <line x1={px - 7} y1={py - 7} x2={px + 7} y2={py + 7} className={styles.redCross} />
            <line x1={px - 7} y1={py + 7} x2={px + 7} y2={py - 7} className={styles.redCross} />
            <text x={px} y={py + 28} textAnchor="middle" className={styles.redLabel}>
              {point.label}
            </text>
          </g>
        ) : (
          <Dot
            key={point.label}
            x={px}
            y={py}
            label={point.label}
            dx={-8}
            dy={point.gy === 3 ? 29 : -10}
          />
        );
      })}
    </>
  );
}

function Q15Source() {
  // Exact source data: A=(0,0), B=(3,0), C=(0,2); E lies one unit from C on BC.
  const ax = 120;
  const ay = 292;
  const scale = 112;
  const bx = ax + 3 * scale;
  const by = ay;
  const cx = ax;
  const cy = ay - 2 * scale;
  const hypotenuse = Math.sqrt(13);
  const ex = cx + ((bx - cx) * 1) / hypotenuse;
  const ey = cy + ((by - cy) * 1) / hypotenuse;
  return (
    <>
      <polyline
        points={`${cx},${cy} ${ax},${ay} ${bx},${by} ${cx},${cy}`}
        className={styles.sourceTriangle}
      />
      <path d={`M ${ax} ${ay - 24} h 24 v 24`} className={styles.rightMark} />
      <Dot x={ax} y={ay} label="A" dx={-25} dy={22} />
      <Dot x={bx} y={by} label="B" dx={10} dy={22} />
      <Dot x={cx} y={cy} label="C" dx={-24} dy={-8} />
      <Dot x={ex} y={ey} label="E" dx={10} dy={-8} />
      <text x={(ax + bx) / 2} y={ay + 38} textAnchor="middle" className={styles.measure}>
        3 cm
      </text>
      <text x={ax - 54} y={(ay + cy) / 2} textAnchor="middle" className={styles.measure}>
        2 cm
      </text>
      <text
        x={(cx + ex) / 2 + 16}
        y={(cy + ey) / 2 - 18}
        textAnchor="middle"
        className={styles.measure}
      >
        1 cm
      </text>
    </>
  );
}

function Q5Authored() {
  return (
    <>
      <polygon points="135,180 320,55 505,180 320,305" className={styles.authoredShape} />
      <line x1="135" y1="180" x2="505" y2="180" className={styles.diagonal} />
      <line x1="320" y1="55" x2="320" y2="305" className={styles.diagonal} />
      <Dot x={135} y={180} label="A" dx={-25} dy={5} />
      <Dot x={320} y={55} label="B" dx={-6} dy={-14} />
      <Dot x={505} y={180} label="C" dx={12} dy={5} />
      <Dot x={320} y={305} label="D" dx={-6} dy={26} />
      <Dot x={320} y={180} label="O" dx={10} dy={-10} />
      <text x="320" y="345" textAnchor="middle" className={styles.authoredNote}>
        O منتصف AC و BD
      </text>
    </>
  );
}

function Q7Authored() {
  const originX = 240;
  const originY = 235;
  const scale = 34;
  const toX = (value: number) => originX + value * scale;
  const toY = (value: number) => originY - value * scale;
  return (
    <>
      <rect x="36" y="20" width="568" height="315" fill="url(#uc-dots)" rx="8" />
      <line
        x1="45"
        y1={originY}
        x2="595"
        y2={originY}
        className={styles.axis}
        markerEnd="url(#uc-arrow)"
      />
      <line
        x1={originX}
        y1="325"
        x2={originX}
        y2="28"
        className={styles.axis}
        markerEnd="url(#uc-arrow)"
      />
      <line
        x1={toX(-2)}
        y1={toY(0)}
        x2={toX(2)}
        y2={toY(3)}
        className={styles.vector}
        markerEnd="url(#uc-arrow)"
      />
      <line
        x1={toX(4)}
        y1={toY(1)}
        x2={toX(8)}
        y2={toY(4)}
        className={styles.vectorSoft}
        markerEnd="url(#uc-arrow)"
      />
      <line
        x1={toX(4)}
        y1={toY(1)}
        x2={toX(0)}
        y2={toY(-2)}
        className={styles.vectorAlt}
        markerEnd="url(#uc-arrow)"
      />
      <Dot x={toX(-2)} y={toY(0)} label="A(-2,0)" dx={-66} dy={-10} />
      <Dot x={toX(2)} y={toY(3)} label="B(2,3)" dx={8} dy={-8} />
      <Dot x={toX(4)} y={toY(1)} label="M(4,1)" dx={8} dy={-8} />
      <Dot x={toX(8)} y={toY(4)} label="M₁(8,4)" dx={-76} dy={-10} />
      <Dot x={toX(0)} y={toY(-2)} label="M₂(0,-2)" dx={10} dy={22} />
    </>
  );
}

function Q8Authored() {
  return (
    <>
      <polygon points="145,285 145,75 500,75 500,285" className={styles.authoredShape} />
      <line x1="145" y1="285" x2="500" y2="75" className={styles.diagonal} />
      <line x1="145" y1="75" x2="500" y2="285" className={styles.diagonal} />
      <path d="M145 255 h30 v30" className={styles.rightMark} />
      <Dot x={145} y={285} label="R" dx={-25} dy={22} />
      <Dot x={145} y={75} label="E" dx={-24} dy={-8} />
      <Dot x={500} y={75} label="A" dx={12} dy={-8} />
      <Dot x={500} y={285} label="C" dx={12} dy={22} />
      <text x="320" y="338" textAnchor="middle" className={styles.authoredNote}>
        EC = RA
      </text>
    </>
  );
}

function Q12Authored() {
  return (
    <>
      <line x1="70" y1="260" x2="570" y2="95" className={styles.baseLine} />
      <line x1="70" y1="185" x2="570" y2="20" className={styles.vector} />
      <line x1="70" y1="335" x2="570" y2="170" className={styles.vectorAlt} />
      <Dot x={360} y={89} label="J" dx={10} dy={-10} />
      <text x="82" y="278" className={styles.label}>
        (UV)
      </text>
      <text x="82" y="201" className={styles.label}>
        Δ
      </text>
      <text x="82" y="348" className={styles.label}>
        d
      </text>
      <text x="490" y="320" className={styles.authoredNote}>
        Δ ∥ d ∥ (UV)
      </text>
    </>
  );
}

function Q14Authored() {
  // Scale 30 px/cm: AB=2 cm and AD=4 cm. The four copies use exact source vectors.
  const rectangles = [
    { x: 300, y: 140, className: styles.blackRectangle, label: 'ABCD' },
    { x: 360, y: 140, className: styles.blueRectangle, label: 'A→B' },
    { x: 300, y: 260, className: styles.redRectangle, label: 'D→A' },
    { x: 240, y: 20, className: styles.greenRectangle, label: 'B→D' },
  ];
  return (
    <>
      {rectangles.map((rectangle) => (
        <g key={rectangle.label}>
          <rect
            x={rectangle.x}
            y={rectangle.y}
            width="60"
            height="120"
            className={rectangle.className}
          />
          <text
            x={rectangle.x + 30}
            y={rectangle.y + 65}
            textAnchor="middle"
            className={styles.copyLabel}
          >
            {rectangle.label}
          </text>
        </g>
      ))}
      <Dot x={300} y={260} label="A" dx={-18} dy={23} />
      <Dot x={360} y={260} label="B" dx={8} dy={23} />
      <Dot x={360} y={140} label="C" dx={8} dy={-8} />
      <Dot x={300} y={140} label="D" dx={-20} dy={-8} />
    </>
  );
}
