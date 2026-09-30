import type { InteractiveDiagram } from '@/content/schema';
import { plainText } from '@/lib/bidi';
import styles from './UnitFinalFigure.module.css';

/**
 * ============================================================================
 *  UNIT-FINAL FIGURES (Questions 16–28)
 * ============================================================================
 *
 *  Two families, never mixed up:
 *
 *  1. SOURCE RECONSTRUCTIONS (`origin: 'textbook'`). Drawn only where every
 *     geometry-bearing fact of the printed figure is explicit: which vertices
 *     are adjacent, which segments are drawn, which regions are shaded and
 *     which equality marks are printed. Proportions carry no mathematical
 *     information in these configurations and are stated in
 *     docs/LESSON-07-FIGURES.md. Where a printed figure depends on unmeasured
 *     positions it is NOT drawn here — it stays a `reference` placeholder.
 *
 *  2. AUTHORED TEACHING FIGURES (`origin: 'authored'`). Platform-made
 *     explanations, captioned as such, never presented as the book's figure.
 *
 *  Everything is a static SVG with `dir="ltr"` so no Latin label, prime or
 *  measurement can be reordered by the surrounding Arabic RTL text.
 * ============================================================================
 */

interface Point {
  x: number;
  y: number;
}

function Dot({
  x,
  y,
  label,
  dx = 10,
  dy = -10,
  tone,
}: Point & { label: string; dx?: number; dy?: number; tone?: 'accent' }) {
  return (
    <g>
      <circle cx={x} cy={y} r="4" className={styles.dot} />
      <text x={x + dx} y={y + dy} className={tone === 'accent' ? styles.labelAccent : styles.label}>
        {label}
      </text>
    </g>
  );
}

/** Small square drawn inside the corner `at`, towards `a` and `b`. */
function RightAngle({ at, a, b, size = 20 }: { at: Point; a: Point; b: Point; size?: number }) {
  const unit = (from: Point, to: Point) => {
    const length = Math.hypot(to.x - from.x, to.y - from.y) || 1;
    return { x: ((to.x - from.x) / length) * size, y: ((to.y - from.y) / length) * size };
  };
  const u = unit(at, a);
  const v = unit(at, b);
  return (
    <polyline
      points={`${at.x + u.x},${at.y + u.y} ${at.x + u.x + v.x},${at.y + u.y + v.y} ${at.x + v.x},${at.y + v.y}`}
      className={styles.rightMark}
    />
  );
}

/** `count` short strokes across the middle of [a,b] — the printed equality mark. */
function TickMark({ a, b, count = 1 }: { a: Point; b: Point; count?: number }) {
  const midX = (a.x + b.x) / 2;
  const midY = (a.y + b.y) / 2;
  const length = Math.hypot(b.x - a.x, b.y - a.y) || 1;
  const ux = (b.x - a.x) / length;
  const uy = (b.y - a.y) / length;
  const size = 9;
  return (
    <g className={styles.tick}>
      {Array.from({ length: count }, (_, index) => {
        const offset = (index - (count - 1) / 2) * 7;
        const cx = midX + ux * offset;
        const cy = midY + uy * offset;
        return (
          <line
            key={index}
            x1={cx - uy * size}
            y1={cy + ux * size}
            x2={cx + uy * size}
            y2={cy - ux * size}
          />
        );
      })}
    </g>
  );
}

/** Angle arc at vertex `at`, opening from ray `at→a` towards ray `at→b`. */
function AngleArc({
  at,
  a,
  b,
  radius = 34,
  label,
}: {
  at: Point;
  a: Point;
  b: Point;
  radius?: number;
  label?: string;
}) {
  const angleOf = (p: Point) => Math.atan2(p.y - at.y, p.x - at.x);
  const start = angleOf(a);
  const end = angleOf(b);
  const from = { x: at.x + radius * Math.cos(start), y: at.y + radius * Math.sin(start) };
  const to = { x: at.x + radius * Math.cos(end), y: at.y + radius * Math.sin(end) };
  let delta = end - start;
  while (delta <= -Math.PI) delta += 2 * Math.PI;
  while (delta > Math.PI) delta -= 2 * Math.PI;
  const sweep = delta > 0 ? 1 : 0;
  const mid = start + delta / 2;
  return (
    <g>
      <path
        d={`M ${from.x} ${from.y} A ${radius} ${radius} 0 0 ${sweep} ${to.x} ${to.y}`}
        className={styles.angleArc}
      />
      {label ? (
        <text
          x={at.x + (radius + 18) * Math.cos(mid)}
          y={at.y + (radius + 18) * Math.sin(mid) + 6}
          textAnchor="middle"
          className={styles.angleLabel}
        >
          {label}
        </text>
      ) : null}
    </g>
  );
}

const poly = (points: Point[]) => points.map((point) => `${point.x},${point.y}`).join(' ');

export function UnitFinalFigure({ spec }: { spec: InteractiveDiagram }) {
  const scenario = String(spec.params.scenario ?? '');
  return (
    <div className={styles.wrap} dir="ltr">
      <svg viewBox="0 0 640 360" role="img" aria-label={plainText(spec.alt)}>
        <defs>
          <marker id="uf-arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
            <path d="M0,0 L9,4.5 L0,9 z" className={styles.arrowHead} />
          </marker>
        </defs>

        {scenario === 'q16-parallelogram-rectangle' ? <Q16Source /> : null}
        {scenario === 'q20-rectangle-diagonals' ? <Q20Source /> : null}
        {scenario === 'q24-parallelogram-diagonals' ? <Q24Source /> : null}
        {scenario === 'q25-rectangle-diagonal' ? <Q25Source /> : null}
        {scenario === 'q26-rhombus-diagonals' ? <Q26Source /> : null}
        {scenario === 'q27-isosceles-extended' ? <Q27Source /> : null}
        {scenario === 'q28-parallel-lines' ? <Q28Source /> : null}

        {scenario === 'q16-translation-map' ? <Q16Authored /> : null}
        {scenario === 'q17-three-transformations' ? <Q17Authored /> : null}
        {scenario === 'q19-general-case' ? <Q19Authored /> : null}
        {scenario === 'q21-translated-segment' ? <Q21Authored /> : null}
        {scenario === 'q22-parallelogram-acba' ? <Q22Authored /> : null}
        {scenario === 'q23-parallelogram-iakb' ? <Q23Authored /> : null}
        {scenario === 'q28-auxiliary-construction' ? <Q28Authored /> : null}
      </svg>
    </div>
  );
}

/* ══════════════════════════ SOURCE RECONSTRUCTIONS ══════════════════════════ */

/** Q16 ① — ANMD parallelogram and ABCD rectangle on a common base line. */
const Q16 = {
  A: { x: 180, y: 90 },
  D: { x: 510, y: 90 },
  N: { x: 70, y: 280 },
  B: { x: 180, y: 280 },
  M: { x: 400, y: 280 },
  C: { x: 510, y: 280 },
};

function Q16Source() {
  return (
    <>
      <polygon points={poly([Q16.A, Q16.B, Q16.C, Q16.D])} className={styles.shadedWarm} />
      <polygon points={poly([Q16.A, Q16.N, Q16.B])} className={styles.plainRegion} />
      <polygon points={poly([Q16.M, Q16.C, Q16.D])} className={styles.plainRegion} />
      <polygon points={poly([Q16.A, Q16.N, Q16.M, Q16.D])} className={styles.outline} />
      <line x1={Q16.A.x} y1={Q16.A.y} x2={Q16.B.x} y2={Q16.B.y} className={styles.edge} />
      <line x1={Q16.D.x} y1={Q16.D.y} x2={Q16.C.x} y2={Q16.C.y} className={styles.edge} />
      <line x1={Q16.N.x} y1={Q16.N.y} x2={Q16.C.x} y2={Q16.C.y} className={styles.edge} />
      <Dot {...Q16.A} label="A" dx={-6} dy={-16} />
      <Dot {...Q16.D} label="D" dx={10} dy={-10} />
      <Dot {...Q16.N} label="N" dx={-10} dy={28} />
      <Dot {...Q16.B} label="B" dx={-6} dy={28} />
      <Dot {...Q16.M} label="M" dx={-8} dy={28} />
      <Dot {...Q16.C} label="C" dx={6} dy={28} />
    </>
  );
}

/** Q20 — rectangle ABCD with both diagonals and the four printed right angles. */
const Q20 = {
  A: { x: 250, y: 60 },
  B: { x: 400, y: 60 },
  C: { x: 400, y: 300 },
  D: { x: 250, y: 300 },
};

function Q20Source() {
  return (
    <>
      <polygon points={poly([Q20.A, Q20.B, Q20.C, Q20.D])} className={styles.shadedCool} />
      <line x1={Q20.A.x} y1={Q20.A.y} x2={Q20.C.x} y2={Q20.C.y} className={styles.diagonalRed} />
      <line x1={Q20.B.x} y1={Q20.B.y} x2={Q20.D.x} y2={Q20.D.y} className={styles.diagonalRed} />
      <RightAngle at={Q20.A} a={Q20.B} b={Q20.D} />
      <RightAngle at={Q20.B} a={Q20.A} b={Q20.C} />
      <RightAngle at={Q20.C} a={Q20.B} b={Q20.D} />
      <RightAngle at={Q20.D} a={Q20.A} b={Q20.C} />
      <Dot {...Q20.A} label="A" dx={-22} dy={-12} />
      <Dot {...Q20.B} label="B" dx={10} dy={-12} />
      <Dot {...Q20.C} label="C" dx={10} dy={24} />
      <Dot {...Q20.D} label="D" dx={-24} dy={24} />
    </>
  );
}

/** Q24 — parallelogram ABCD, centre O, triangles ABO and ODC shaded. */
const Q24 = {
  A: { x: 120, y: 300 },
  B: { x: 370, y: 300 },
  C: { x: 520, y: 90 },
  D: { x: 270, y: 90 },
  O: { x: 320, y: 195 },
};

function Q24Source() {
  return (
    <>
      <polygon points={poly([Q24.O, Q24.D, Q24.C])} className={styles.shadedWarm} />
      <polygon points={poly([Q24.A, Q24.B, Q24.O])} className={styles.shadedCool} />
      <polygon points={poly([Q24.A, Q24.B, Q24.C, Q24.D])} className={styles.outline} />
      <line x1={Q24.A.x} y1={Q24.A.y} x2={Q24.C.x} y2={Q24.C.y} className={styles.edge} />
      <line x1={Q24.B.x} y1={Q24.B.y} x2={Q24.D.x} y2={Q24.D.y} className={styles.edge} />
      <Dot {...Q24.A} label="A" dx={-24} dy={22} />
      <Dot {...Q24.B} label="B" dx={8} dy={24} />
      <Dot {...Q24.C} label="C" dx={12} dy={-10} />
      <Dot {...Q24.D} label="D" dx={-22} dy={-10} />
      <Dot {...Q24.O} label="O" dx={-8} dy={-14} />
    </>
  );
}

/** Q25 — rectangle ABCD with the single printed diagonal [AC]. */
const Q25 = {
  A: { x: 140, y: 300 },
  B: { x: 500, y: 300 },
  C: { x: 500, y: 80 },
  D: { x: 140, y: 80 },
};

function Q25Source() {
  return (
    <>
      <polygon points={poly([Q25.A, Q25.C, Q25.D])} className={styles.shadedWarm} />
      <polygon points={poly([Q25.A, Q25.B, Q25.C])} className={styles.shadedCool} />
      <polygon points={poly([Q25.A, Q25.B, Q25.C, Q25.D])} className={styles.outline} />
      <line x1={Q25.A.x} y1={Q25.A.y} x2={Q25.C.x} y2={Q25.C.y} className={styles.edge} />
      <Dot {...Q25.A} label="A" dx={-22} dy={24} />
      <Dot {...Q25.B} label="B" dx={10} dy={24} />
      <Dot {...Q25.C} label="C" dx={12} dy={-10} />
      <Dot {...Q25.D} label="D" dx={-24} dy={-10} />
    </>
  );
}

/** Q26 — rhombus ABCD, centre O, triangles ABO and ODA shaded. */
const Q26 = {
  A: { x: 140, y: 290 },
  B: { x: 390, y: 290 },
  C: { x: 515, y: 74 },
  D: { x: 265, y: 74 },
  O: { x: 327.5, y: 182 },
};

function Q26Source() {
  return (
    <>
      <polygon points={poly([Q26.O, Q26.D, Q26.A])} className={styles.shadedWarm} />
      <polygon points={poly([Q26.A, Q26.B, Q26.O])} className={styles.shadedCool} />
      <polygon points={poly([Q26.A, Q26.B, Q26.C, Q26.D])} className={styles.outline} />
      <line x1={Q26.A.x} y1={Q26.A.y} x2={Q26.C.x} y2={Q26.C.y} className={styles.edge} />
      <line x1={Q26.B.x} y1={Q26.B.y} x2={Q26.D.x} y2={Q26.D.y} className={styles.edge} />
      <Dot {...Q26.A} label="A" dx={-24} dy={22} />
      <Dot {...Q26.B} label="B" dx={10} dy={24} />
      <Dot {...Q26.C} label="C" dx={12} dy={-10} />
      <Dot {...Q26.D} label="D" dx={-22} dy={-10} />
      <Dot {...Q26.O} label="O" dx={10} dy={-10} />
    </>
  );
}

/** Q27 — isosceles ABC on a base line carrying D and N, with DA = BN marked. */
const Q27 = {
  D: { x: 90, y: 300 },
  A: { x: 220, y: 300 },
  B: { x: 400, y: 300 },
  N: { x: 530, y: 300 },
  C: { x: 310, y: 70 },
};

function Q27Source() {
  return (
    <>
      <polygon points={poly([Q27.C, Q27.D, Q27.A])} className={styles.shadedCool} />
      <polygon points={poly([Q27.C, Q27.B, Q27.N])} className={styles.shadedCool} />
      <polygon points={poly([Q27.A, Q27.B, Q27.C])} className={styles.shadedWarm} />
      <polygon points={poly([Q27.C, Q27.D, Q27.N])} className={styles.outline} />
      <line x1={Q27.C.x} y1={Q27.C.y} x2={Q27.A.x} y2={Q27.A.y} className={styles.edge} />
      <line x1={Q27.C.x} y1={Q27.C.y} x2={Q27.B.x} y2={Q27.B.y} className={styles.edge} />
      <TickMark a={Q27.D} b={Q27.A} count={2} />
      <TickMark a={Q27.B} b={Q27.N} count={2} />
      <Dot {...Q27.D} label="D" dx={-12} dy={28} />
      <Dot {...Q27.A} label="A" dx={-6} dy={28} />
      <Dot {...Q27.B} label="B" dx={-6} dy={28} />
      <Dot {...Q27.N} label="N" dx={4} dy={28} />
      <Dot {...Q27.C} label="C" dx={-6} dy={-16} />
    </>
  );
}

/** Q28 — the parallels (d) and (d′) cut by the transversal (Δ) at A and B. */
const Q28 = {
  A: { x: 330, y: 120 },
  B: { x: 230, y: 280 },
  dLeft: { x: 80, y: 120 },
  dRight: { x: 560, y: 120 },
  dpLeft: { x: 80, y: 280 },
  dpRight: { x: 560, y: 280 },
  top: { x: 385, y: 32 },
  bottom: { x: 185, y: 352 },
};

function Q28Source() {
  return (
    <>
      <line
        x1={Q28.dLeft.x}
        y1={Q28.dLeft.y}
        x2={Q28.dRight.x}
        y2={Q28.dRight.y}
        className={styles.parallelLine}
      />
      <line
        x1={Q28.dpLeft.x}
        y1={Q28.dpLeft.y}
        x2={Q28.dpRight.x}
        y2={Q28.dpRight.y}
        className={styles.parallelLine}
      />
      <line
        x1={Q28.bottom.x}
        y1={Q28.bottom.y}
        x2={Q28.top.x}
        y2={Q28.top.y}
        className={styles.transversal}
      />
      <AngleArc at={Q28.A} a={Q28.dLeft} b={Q28.B} radius={36} label="1" />
      <AngleArc at={Q28.B} a={Q28.A} b={Q28.dpRight} radius={36} label="2" />
      <Dot {...Q28.A} label="A" dx={6} dy={-14} />
      <Dot {...Q28.B} label="B" dx={-24} dy={24} />
      <text x="88" y="108" className={styles.lineLabel}>
        (d)
      </text>
      <text x="88" y="268" className={styles.lineLabel}>
        (d′)
      </text>
      <text x="394" y="34" className={styles.lineLabelRed}>
        (Δ)
      </text>
    </>
  );
}

/* ═══════════════════════ AUTHORED TEACHING FIGURES ═══════════════════════ */

/** Q16 — the translation N → M carries triangle ANB onto triangle MCD. */
function Q16Authored() {
  return (
    <>
      <polygon points={poly([Q16.A, Q16.N, Q16.B])} className={styles.shadedCool} />
      <polygon points={poly([Q16.M, Q16.C, Q16.D])} className={styles.shadedWarm} />
      <polygon points={poly([Q16.A, Q16.N, Q16.M, Q16.D])} className={styles.outline} />
      <line x1={Q16.A.x} y1={Q16.A.y} x2={Q16.B.x} y2={Q16.B.y} className={styles.edge} />
      <line x1={Q16.D.x} y1={Q16.D.y} x2={Q16.C.x} y2={Q16.C.y} className={styles.edge} />
      <line x1={Q16.N.x} y1={Q16.N.y} x2={Q16.C.x} y2={Q16.C.y} className={styles.edge} />
      {(
        [
          [Q16.N, Q16.M],
          [Q16.A, Q16.D],
          [Q16.B, Q16.C],
        ] as [Point, Point][]
      ).map(([from, to], index) => (
        <line
          key={index}
          x1={from.x + 12}
          y1={from.y - 12}
          x2={to.x - 12}
          y2={to.y - 12}
          className={styles.vector}
          markerEnd="url(#uf-arrow)"
        />
      ))}
      <Dot {...Q16.A} label="A" dx={-6} dy={-16} />
      <Dot {...Q16.D} label="D" dx={10} dy={-10} />
      <Dot {...Q16.N} label="N" dx={-10} dy={28} />
      <Dot {...Q16.B} label="B" dx={-6} dy={28} />
      <Dot {...Q16.M} label="M" dx={-8} dy={28} />
      <Dot {...Q16.C} label="C" dx={6} dy={28} />
      <text x="320" y="345" textAnchor="middle" className={styles.note}>
        N → M , A → D , B → C
      </text>
    </>
  );
}

/** Q17 — one panel per transformation named in the three printed definitions. */
function Q17Authored() {
  return (
    <>
      {[30, 226, 422].map((x) => (
        <rect key={x} x={x} y={40} width={188} height={250} rx="10" className={styles.panel} />
      ))}

      {/* ① central symmetry about O */}
      <line x1="72" y1="230" x2="182" y2="110" className={styles.helper} />
      <Dot x={72} y={230} label="A" dx={-22} dy={8} />
      <Dot x={127} y={170} label="O" dx={10} dy={-8} tone="accent" />
      <Dot x={182} y={110} label="B" dx={8} dy={-8} />
      <TickMark a={{ x: 72, y: 230 }} b={{ x: 127, y: 170 }} />
      <TickMark a={{ x: 127, y: 170 }} b={{ x: 182, y: 110 }} />
      <text x="124" y="316" textAnchor="middle" className={styles.note}>
        O = midpoint AB
      </text>

      {/* ② translation I → J */}
      <line
        x1="268"
        y1="240"
        x2="360"
        y2="240"
        className={styles.vector}
        markerEnd="url(#uf-arrow)"
      />
      <line
        x1="288"
        y1="130"
        x2="380"
        y2="130"
        className={styles.vector}
        markerEnd="url(#uf-arrow)"
      />
      <Dot x={268} y={240} label="I" dx={-16} dy={22} />
      <Dot x={368} y={240} label="J" dx={6} dy={22} />
      <Dot x={288} y={130} label="D" dx={-20} dy={-10} />
      <Dot x={388} y={130} label="C" dx={8} dy={-10} />
      <text x="320" y="316" textAnchor="middle" className={styles.note}>
        IJ = DC
      </text>

      {/* ③ axial symmetry about (d) */}
      <line x1="516" y1="60" x2="516" y2="272" className={styles.axisLine} />
      <line x1="452" y1="170" x2="580" y2="170" className={styles.helper} />
      <Dot x={452} y={170} label="E" dx={-22} dy={-8} />
      <Dot x={580} y={170} label="F" dx={6} dy={-8} />
      <RightAngle at={{ x: 516, y: 170 }} a={{ x: 580, y: 170 }} b={{ x: 516, y: 60 }} size={14} />
      <TickMark a={{ x: 452, y: 170 }} b={{ x: 516, y: 170 }} />
      <TickMark a={{ x: 516, y: 170 }} b={{ x: 580, y: 170 }} />
      <text x="516" y="300" textAnchor="middle" className={styles.lineLabel}>
        (d)
      </text>
      <text x="516" y="330" textAnchor="middle" className={styles.note}>
        (d) ⊥ EF
      </text>
    </>
  );
}

/** Q19 — the general (non-isosceles) configuration the corrector asks for. */
const Q19 = {
  A: { x: 140, y: 300 },
  B: { x: 320, y: 300 },
  C: { x: 140, y: 150 },
  Bp: { x: 500, y: 300 },
  Cp: { x: 320, y: 150 },
};

function Q19Authored() {
  return (
    <>
      <polygon points={poly([Q19.A, Q19.B, Q19.Cp, Q19.C])} className={styles.shadedWarm} />
      <polygon points={poly([Q19.A, Q19.B, Q19.C])} className={styles.outline} />
      <polygon points={poly([Q19.B, Q19.Bp, Q19.Cp])} className={styles.outlineDashed} />
      <RightAngle at={Q19.A} a={Q19.B} b={Q19.C} />
      <RightAngle at={Q19.B} a={Q19.Bp} b={Q19.Cp} />
      <line
        x1={Q19.A.x}
        y1={Q19.A.y + 26}
        x2={Q19.B.x}
        y2={Q19.B.y + 26}
        className={styles.vector}
        markerEnd="url(#uf-arrow)"
      />
      <Dot {...Q19.A} label="A" dx={-24} dy={22} />
      <Dot {...Q19.B} label="B" dx={-6} dy={22} />
      <Dot {...Q19.Bp} label="B′" dx={8} dy={22} />
      <Dot {...Q19.C} label="C" dx={-24} dy={-10} />
      <Dot {...Q19.Cp} label="C′" dx={6} dy={-10} />
      <text x="500" y="120" textAnchor="middle" className={styles.note}>
        AB ≠ AC
      </text>
      <text x="230" y="230" textAnchor="middle" className={styles.noteStrong}>
        ABC′C
      </text>
    </>
  );
}

/** Q21 — the translation carries [MN] onto [M′N′], so both measure 2 cm. */
const Q21 = {
  A: { x: 130, y: 300 },
  B: { x: 420, y: 300 },
  M: { x: 100, y: 210 },
  Mp: { x: 390, y: 210 },
  N: { x: 170, y: 90 },
  Np: { x: 460, y: 90 },
};

function Q21Authored() {
  return (
    <>
      <polygon points={poly([Q21.A, Q21.B, Q21.Mp, Q21.M])} className={styles.shadedCool} />
      <line x1={Q21.M.x} y1={Q21.M.y} x2={Q21.N.x} y2={Q21.N.y} className={styles.redSegment} />
      <line x1={Q21.Mp.x} y1={Q21.Mp.y} x2={Q21.Np.x} y2={Q21.Np.y} className={styles.redSegment} />
      <line
        x1={Q21.A.x}
        y1={Q21.A.y}
        x2={Q21.B.x}
        y2={Q21.B.y}
        className={styles.vector}
        markerEnd="url(#uf-arrow)"
      />
      <line
        x1={Q21.M.x}
        y1={Q21.M.y}
        x2={Q21.Mp.x}
        y2={Q21.Mp.y}
        className={styles.vector}
        markerEnd="url(#uf-arrow)"
      />
      <line
        x1={Q21.N.x}
        y1={Q21.N.y}
        x2={Q21.Np.x}
        y2={Q21.Np.y}
        className={styles.vectorSoft}
        markerEnd="url(#uf-arrow)"
      />
      <Dot {...Q21.A} label="A" dx={-10} dy={26} />
      <Dot {...Q21.B} label="B" dx={4} dy={26} />
      <Dot {...Q21.M} label="M" dx={-26} dy={6} />
      <Dot {...Q21.Mp} label="M′" dx={6} dy={24} />
      <Dot {...Q21.N} label="N" dx={-22} dy={-8} />
      <Dot {...Q21.Np} label="N′" dx={8} dy={-8} />
      <text x={(Q21.M.x + Q21.N.x) / 2 - 34} y={(Q21.M.y + Q21.N.y) / 2} className={styles.measure}>
        2 cm
      </text>
      <text
        x={(Q21.Mp.x + Q21.Np.x) / 2 + 34}
        y={(Q21.Mp.y + Q21.Np.y) / 2}
        className={styles.measure}
      >
        2 cm
      </text>
    </>
  );
}

/** Q22 — ACBA′ is a parallelogram, so its diagonals [AB] and [A′C] bisect. */
const Q22 = {
  A: { x: 180, y: 80 },
  C: { x: 200, y: 300 },
  B: { x: 480, y: 250 },
  Ap: { x: 460, y: 30 },
  centre: { x: 330, y: 165 },
};

function Q22Authored() {
  return (
    <>
      <polygon points={poly([Q22.A, Q22.C, Q22.B, Q22.Ap])} className={styles.shadedCool} />
      <polygon points={poly([Q22.A, Q22.B, Q22.C])} className={styles.outline} />
      <line x1={Q22.A.x} y1={Q22.A.y} x2={Q22.B.x} y2={Q22.B.y} className={styles.edge} />
      <line x1={Q22.C.x} y1={Q22.C.y} x2={Q22.Ap.x} y2={Q22.Ap.y} className={styles.edge} />
      <line
        x1={Q22.C.x}
        y1={Q22.C.y}
        x2={Q22.B.x}
        y2={Q22.B.y}
        className={styles.vectorGhost}
        markerEnd="url(#uf-arrow)"
      />
      <line
        x1={Q22.A.x}
        y1={Q22.A.y}
        x2={Q22.Ap.x}
        y2={Q22.Ap.y}
        className={styles.vector}
        markerEnd="url(#uf-arrow)"
      />
      <TickMark a={Q22.A} b={Q22.centre} />
      <TickMark a={Q22.centre} b={Q22.B} />
      <TickMark a={Q22.C} b={Q22.centre} count={2} />
      <TickMark a={Q22.centre} b={Q22.Ap} count={2} />
      <Dot {...Q22.A} label="A" dx={-22} dy={-8} />
      <Dot {...Q22.C} label="C" dx={-22} dy={18} />
      <Dot {...Q22.B} label="B" dx={12} dy={16} />
      <Dot {...Q22.Ap} label="A′" dx={10} dy={-8} />
      <Dot {...Q22.centre} label="" dx={0} dy={0} />
      <text x="320" y="345" textAnchor="middle" className={styles.note}>
        C → B , A → A′
      </text>
    </>
  );
}

/** Q23 — IAKB is a parallelogram whose diagonals [IK] and [AB] meet at J. */
const Q23 = {
  A: { x: 181, y: 216 },
  B: { x: 549, y: 216 },
  C: { x: 606, y: 132 },
  D: { x: 262, y: 104 },
  I: { x: 434, y: 118 },
  J: { x: 365, y: 216 },
  K: { x: 296, y: 314 },
};

function Q23Authored() {
  return (
    <>
      <polygon points={poly([Q23.I, Q23.A, Q23.K, Q23.B])} className={styles.shadedCool} />
      <polygon points={poly([Q23.A, Q23.B, Q23.C, Q23.D])} className={styles.outlineDashed} />
      <line x1={Q23.I.x} y1={Q23.I.y} x2={Q23.K.x} y2={Q23.K.y} className={styles.edge} />
      <line x1={Q23.A.x} y1={Q23.A.y} x2={Q23.B.x} y2={Q23.B.y} className={styles.edge} />
      <line
        x1={Q23.I.x}
        y1={Q23.I.y}
        x2={Q23.A.x}
        y2={Q23.A.y}
        className={styles.vector}
        markerEnd="url(#uf-arrow)"
      />
      <line
        x1={Q23.B.x}
        y1={Q23.B.y}
        x2={Q23.K.x}
        y2={Q23.K.y}
        className={styles.vectorSoft}
        markerEnd="url(#uf-arrow)"
      />
      <TickMark a={Q23.A} b={Q23.J} />
      <TickMark a={Q23.J} b={Q23.B} />
      <TickMark a={Q23.I} b={Q23.J} count={2} />
      <TickMark a={Q23.J} b={Q23.K} count={2} />
      <Dot {...Q23.A} label="A" dx={-24} dy={16} />
      <Dot {...Q23.B} label="B" dx={12} dy={14} />
      <Dot {...Q23.C} label="C" dx={8} dy={-10} />
      <Dot {...Q23.D} label="D" dx={-20} dy={-10} />
      <Dot {...Q23.I} label="I" dx={6} dy={-10} />
      <Dot {...Q23.J} label="J" dx={-6} dy={26} />
      <Dot {...Q23.K} label="K" dx={-6} dy={28} />
      <text x="320" y="350" textAnchor="middle" className={styles.note}>
        I → A , B → K
      </text>
    </>
  );
}

/** Q28 — the auxiliary line through the midpoint O of [AB]. */
function Q28Authored() {
  const O = { x: 280, y: 200 };
  const M = { x: 280, y: 120 };
  const N = { x: 280, y: 280 };
  return (
    <>
      <polygon points={poly([O, M, Q28.A])} className={styles.shadedCool} />
      <polygon points={poly([O, N, Q28.B])} className={styles.shadedWarm} />
      <line
        x1={Q28.dLeft.x}
        y1={Q28.dLeft.y}
        x2={Q28.dRight.x}
        y2={Q28.dRight.y}
        className={styles.parallelLine}
      />
      <line
        x1={Q28.dpLeft.x}
        y1={Q28.dpLeft.y}
        x2={Q28.dpRight.x}
        y2={Q28.dpRight.y}
        className={styles.parallelLine}
      />
      <line
        x1={Q28.bottom.x}
        y1={Q28.bottom.y}
        x2={Q28.top.x}
        y2={Q28.top.y}
        className={styles.transversal}
      />
      <line x1={M.x} y1={M.y - 34} x2={N.x} y2={N.y + 34} className={styles.helper} />
      <RightAngle at={M} a={{ x: 340, y: 120 }} b={{ x: 280, y: 200 }} size={16} />
      <RightAngle at={N} a={{ x: 340, y: 280 }} b={{ x: 280, y: 200 }} size={16} />
      <TickMark a={Q28.A} b={O} />
      <TickMark a={O} b={Q28.B} />
      <Dot {...Q28.A} label="A" dx={8} dy={-12} />
      <Dot {...Q28.B} label="B" dx={-24} dy={22} />
      <Dot {...O} label="O" dx={10} dy={-8} tone="accent" />
      <Dot {...M} label="M" dx={-12} dy={-14} />
      <Dot {...N} label="N" dx={-12} dy={28} />
      <text x="88" y="108" className={styles.lineLabel}>
        (d)
      </text>
      <text x="88" y="268" className={styles.lineLabel}>
        (d′)
      </text>
      <text x="470" y="200" textAnchor="middle" className={styles.note}>
        OMA ≅ ONB
      </text>
    </>
  );
}
