import type { InteractiveDiagram } from '@/content/schema';
import {
  Q18_CASE_ONE_MEASURES,
  Q18_CASE_ONE_POINTS,
  Q18_CASE_ONE_VIEW_BOX,
  Q18_CASE_TWO_MEASURES,
  Q18_CASE_TWO_POINTS,
  Q18_CASE_TWO_VIEW_BOX,
  Q19_POINTS,
  Q19_TICKS,
  Q19_VIEW_BOX,
  Q20_ARROWS,
  Q20_BOXES,
  Q20_VIEW_BOX,
  Q21_LABELS,
  Q21_POINTS,
  Q21_VIEW_BOX,
  Q24_LABELS,
  Q24_POINTS,
  Q24_RED_LINE,
  Q24_RIGHT_ANGLE,
  Q24_TICKS,
  Q24_VIEW_BOX,
  Q26_LABELS,
  Q26_POINTS,
  Q26_RIGHT_ANGLE,
  Q26_VIEW_BOX,
  Q27_LABELS,
  Q27_MEASURES,
  Q27_POINTS,
  Q27_VIEW_BOX,
  Q28_ARROWS,
  Q28_POINTS,
  Q28_RED_LINE,
  Q28_TICKS,
  Q28_VIEW_BOX,
  Q29_MEASURES,
  Q29_POINTS,
  Q29_VIEW_BOX,
  Q30_POINTS,
  Q30_RAY_END,
  Q30_VIEW_BOX,
  Q32_MEASURES,
  Q32_POINTS,
  Q32_VIEW_BOX,
  Q33_CASE_ONE_POINTS,
  Q33_CASE_ONE_VIEW_BOX,
  Q33_CASE_TWO_POINTS,
  Q33_CASE_TWO_VIEW_BOX,
  type FigurePoint,
  type FlowArrow,
  type FlowBox,
} from '@/content/units/lesson-12-unit-two-exercises-geometry';
import {
  Q1_CASE_ONE_POINTS,
  Q1_CASE_ONE_TICKS,
  Q1_CASE_ONE_VIEW_BOX,
  Q1_CASE_THREE_POINTS,
  Q1_CASE_THREE_TICKS,
  Q1_CASE_THREE_VIEW_BOX,
  Q1_CASE_TWO_POINTS,
  Q1_CASE_TWO_VIEW_BOX,
  Q1_POINTS,
  Q1_THALES_MEASURES,
  Q1_THALES_POINTS,
  Q1_THALES_VIEW_BOX,
  Q1_TICKS,
  Q1_VIEW_BOX,
  Q10_CASE_ONE_POINTS,
  Q10_CASE_ONE_TICKS,
  Q10_CASE_ONE_VIEW_BOX,
  Q10_CASE_TWO_POINTS,
  Q10_CASE_TWO_TICKS,
  Q10_CASE_TWO_VIEW_BOX,
  Q13_POINTS,
  Q13_VIEW_BOX,
  Q14_ARROWS,
  Q14_POINTS,
  Q14_TICKS,
  Q14_VIEW_BOX,
  Q15_MEASURES,
  Q15_POINTS,
  Q15_VIEW_BOX,
  Q16_MEASURES,
  Q16_POINTS,
  Q16_VIEW_BOX,
  Q17_MEASURES,
  Q17_POINTS,
  Q17_VIEW_BOX,
  Q2_CIRCLES,
  Q2_CIRCLES_VIEW_BOX,
  Q2_QUADRILATERAL_MEASURES,
  Q2_QUADRILATERAL_POINTS,
  Q2_QUADRILATERAL_VIEW_BOX,
  Q2_TRIANGLE_POINTS,
  Q2_TRIANGLE_TICKS,
  Q2_TRIANGLE_VIEW_BOX,
  Q3_ARROWS,
  Q3_POINTS,
  Q3_TICKS,
  Q3_VIEW_BOX,
  Q4_MEASURES,
  Q4_POINTS,
  Q4_VIEW_BOX,
  Q5_POINTS,
  Q5_TICKS,
  Q5_VIEW_BOX,
  Q6_POINTS,
  Q6_VIEW_BOX,
  Q9_POINTS,
  Q9_VIEW_BOX,
} from '@/content/units/lesson-12-batch1-geometry';
import styles from './UnitTwoExercisesFigure.module.css';

/**
 * ============================================================================
 *  UNIT 2 — «تمارين الوحدة الثانية» · RECONSTRUCTED SOURCE FIGURES (Q28–Q34)
 * ============================================================================
 *
 *  Every figure here REPRODUCES a figure printed in the supplied scans. They
 *  are drawn from the coordinates measured in
 *  `lesson-12-unit-two-exercises-geometry.ts` — read from the scan, never
 *  guessed — and they carry the printed marks: the equality ticks, the
 *  parallel arrowheads, the printed measurements and the printed colours.
 *
 *  They are NOT drawings "to scale": in these exercises the printed angles
 *  and lengths carry no mathematical information (the same convention as the
 *  Unit 1 exercise figures, docs/LESSON-07-FIGURES.md). What the drawings
 *  guarantee is incidence, order along a line, and the printed marks. The
 *  verification record per figure is in docs/UNIT-02-EXERCISES-FIGURES.md.
 *
 *  Everything is a static SVG with `dir="ltr"`, so no Latin point name can be
 *  reordered by the surrounding Arabic RTL text.
 * ============================================================================
 */

interface Label {
  readonly text: string;
  readonly at: FigurePoint;
  readonly dx?: number;
  readonly dy?: number;
  readonly anchor?: 'start' | 'middle' | 'end';
  readonly tone?: 'red' | 'redItalic' | 'blue' | 'blueNumber' | 'green';
}

function LabelText({ text, at, dx = 0, dy = -12, anchor = 'middle', tone }: Label) {
  return (
    <text
      x={at.x + dx}
      y={at.y + dy}
      textAnchor={anchor}
      className={
        tone === 'red'
          ? styles.labelRed
          : tone === 'redItalic'
            ? styles.labelRedItalic
            : tone === 'blue'
              ? styles.labelBlue
              : tone === 'blueNumber'
                ? styles.labelBlueNumber
                : tone === 'green'
                  ? styles.labelGreen
                  : styles.label
      }
    >
      {text}
    </text>
  );
}

function Dot({ at }: { at: FigurePoint }) {
  return <circle cx={at.x} cy={at.y} r="4" className={styles.dot} />;
}

/** `count` short strokes across the middle of the segment, perpendicular to it. */
function Ticks({
  at,
  count,
  angle,
  tone = 'blue',
}: {
  at: FigurePoint;
  count: number;
  angle: number;
  tone?: 'blue' | 'red' | 'black';
}) {
  const ux = Math.cos(angle);
  const uy = Math.sin(angle);
  const size = 9;
  const gap = 7;
  const tickClass =
    tone === 'red' ? styles.tickRed : tone === 'black' ? styles.tickBlack : styles.tickBlue;
  return (
    <g className={tickClass}>
      {Array.from({ length: count }, (_, index) => {
        const offset = (index - (count - 1) / 2) * gap;
        const cx = at.x + ux * offset;
        const cy = at.y + uy * offset;
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

/** A filled arrowhead at `at`, pointing along (dx, dy). */
function ArrowHead({
  at,
  dx,
  dy,
  tone = 'black',
}: {
  at: FigurePoint;
  dx: number;
  dy: number;
  tone?: 'black' | 'red' | 'blue';
}) {
  const length = Math.hypot(dx, dy) || 1;
  const ux = dx / length;
  const uy = dy / length;
  const size = 13;
  const half = 6;
  return (
    <polygon
      points={`${at.x},${at.y} ${at.x - ux * size - uy * half},${at.y - uy * size + ux * half} ${
        at.x - ux * size + uy * half
      },${at.y - uy * size - ux * half}`}
      className={
        tone === 'red' ? styles.arrowRed : tone === 'blue' ? styles.arrowBlue : styles.arrowBlack
      }
    />
  );
}

function Polyline({
  points,
  className,
}: {
  points: readonly FigurePoint[];
  className?: string;
}) {
  return (
    <polyline
      points={points.map((p) => `${p.x},${p.y}`).join(' ')}
      className={className}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  Question 28 — «من توازٍ إلى توازٍ»                                          */
/* -------------------------------------------------------------------------- */

function Q28Source() {
  const { E, F, G, H, M, N, P } = Q28_POINTS;
  const direction = {
    x: Q28_RED_LINE.to.x - Q28_RED_LINE.from.x,
    y: Q28_RED_LINE.to.y - Q28_RED_LINE.from.y,
  };
  return (
    <svg viewBox={Q28_VIEW_BOX} role="img" aria-label="الشكل المرافق للسؤال 28">
      {/* the quadrilateral E-H-G-F and its diagonal E-G */}
      <Polyline points={[E, H, G, F, E]} className={styles.outline} />
      <Polyline points={[E, G]} className={styles.outline} />
      {/* the printed red line (NP) with its arrowhead */}
      <line
        x1={Q28_RED_LINE.from.x}
        y1={Q28_RED_LINE.from.y}
        x2={Q28_RED_LINE.to.x}
        y2={Q28_RED_LINE.to.y}
        className={styles.redLine}
      />
      <ArrowHead at={Q28_ARROWS.red} dx={direction.x} dy={direction.y} tone="red" />
      {/* the parallel mark on (GH) */}
      <ArrowHead at={Q28_ARROWS.black} dx={G.x - H.x} dy={G.y - H.y} />
      {/* the printed equality marks */}
      <Ticks at={Q28_TICKS.em} count={Q28_TICKS.em.count} angle={Math.atan2(F.y - E.y, F.x - E.x)} />
      <Ticks at={Q28_TICKS.mf} count={Q28_TICKS.mf.count} angle={Math.atan2(F.y - E.y, F.x - E.x)} />
      <Ticks at={Q28_TICKS.en} count={Q28_TICKS.en.count} angle={Math.atan2(G.y - E.y, G.x - E.x)} />
      <Ticks at={Q28_TICKS.ng} count={Q28_TICKS.ng.count} angle={Math.atan2(G.y - E.y, G.x - E.x)} />
      <Dot at={M} />
      {/* the point P sits on [EH] where the red line crosses it */}
      <Dot at={P} />
      <LabelText text="E" at={E} dx={-4} dy={-16} />
      <LabelText text="F" at={F} dx={-14} dy={8} anchor="end" />
      <LabelText text="G" at={G} dx={10} dy={22} />
      <LabelText text="H" at={H} dx={10} dy={8} anchor="start" />
      <LabelText text="M" at={M} dx={-18} dy={6} anchor="end" />
      <LabelText text="N" at={N} dx={-14} dy={16} anchor="end" />
      <LabelText text="P" at={P} dx={-14} dy={-10} anchor="end" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Question 29 — «نسب متساوية»                                                  */
/* -------------------------------------------------------------------------- */

function Q29Source() {
  const { A, B, C, N, M, J, K } = Q29_POINTS;
  return (
    <svg viewBox={Q29_VIEW_BOX} role="img" aria-label="الشكل المرافق للسؤال 29">
      {/* the two sides of the triangle */}
      <Polyline points={[A, C]} className={styles.outline} />
      <Polyline points={[A, B]} className={styles.outline} />
      {/* the printed blue segments: the base [CB] and [NM] */}
      <Polyline points={[C, B]} className={styles.blueLine} />
      <Polyline points={[N, M]} className={styles.blueLine} />
      {/* the printed red transversal A-J-K */}
      <Polyline points={[A, K]} className={styles.redLine} />
      <LabelText text="A" at={A} dx={12} dy={-12} />
      <LabelText text="B" at={B} dx={14} dy={12} anchor="start" />
      <LabelText text="C" at={C} dx={-10} dy={12} anchor="end" />
      <LabelText text="N" at={N} dx={-14} dy={-8} anchor="end" />
      <LabelText text="M" at={M} dx={14} dy={-4} anchor="start" />
      <LabelText text="J" at={J} dx={-12} dy={-16} anchor="end" />
      <LabelText text="K" at={K} dx={-6} dy={24} anchor="end" />
      <LabelText text="3" at={Q29_MEASURES.three} tone="red" />
      <LabelText text="2" at={Q29_MEASURES.two} tone="red" />
      <LabelText text="4.5" at={Q29_MEASURES.fourPointFive} tone="red" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Question 30 — «تقسيم قطعة مستقيمة»                                          */
/* -------------------------------------------------------------------------- */

function Q30Source() {
  const { A, B, C, D, E, F } = Q30_POINTS;
  const tick = (at: FigurePoint) => (
    <g key={`${at.x}`} className={styles.tickRed}>
      <line x1={at.x} y1={at.y - 11} x2={at.x} y2={at.y + 7} />
    </g>
  );
  return (
    <svg viewBox={Q30_VIEW_BOX} role="img" aria-label="الشكل المرافق للسؤال 30">
      {/* the printed blue ray (Ax) */}
      <Polyline points={[A, Q30_RAY_END]} className={styles.blueLine} />
      {/* the segment [AF] */}
      <Polyline points={[A, F]} className={styles.outline} />
      {/* the five printed ticks that mark the equal parts */}
      {tick(B)}
      {tick(C)}
      {tick(D)}
      {tick(E)}
      {tick(F)}
      <LabelText text="x" at={Q30_RAY_END} dx={14} dy={-4} anchor="start" />
      <LabelText text="A" at={A} dx={-8} dy={22} anchor="end" />
      <LabelText text="B" at={B} dy={38} />
      <LabelText text="C" at={C} dy={38} />
      <LabelText text="D" at={D} dy={38} />
      <LabelText text="E" at={E} dy={38} />
      <LabelText text="F" at={F} dx={-2} dy={38} />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Question 32 — «قياس المسافة بين نقطتين لا يمكن الوصول إليهما»                */
/* -------------------------------------------------------------------------- */

function Q32Source() {
  const { A, B, C, M, K } = Q32_POINTS;
  return (
    <svg viewBox={Q32_VIEW_BOX} role="img" aria-label="الشكل المرافق للسؤال 32">
      {/* the two printed blue verticals */}
      <Polyline points={[A, B]} className={styles.blueLine} />
      <Polyline points={[C, M]} className={styles.blueLine} />
      {/* the ground line and the sight line */}
      <Polyline points={[B, K]} className={styles.outline} />
      <Polyline points={[A, K]} className={styles.outline} />
      <LabelText text="A" at={A} dx={-12} dy={-8} anchor="end" />
      <LabelText text="B" at={B} dy={22} />
      <LabelText text="C" at={C} dx={12} dy={-8} anchor="start" />
      <LabelText text="M" at={M} dy={22} />
      <LabelText text="K" at={K} dx={10} dy={22} anchor="start" />
      <LabelText text="40" at={Q32_MEASURES.forty} tone="red" />
      <LabelText text="30" at={Q32_MEASURES.thirty} tone="red" />
      <LabelText text="50" at={Q32_MEASURES.fifty} tone="red" />
      <LabelText text="x" at={Q32_MEASURES.x} tone="red" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Question 33 — case ①                                                         */
/* -------------------------------------------------------------------------- */

function Q33CaseOneSource() {
  const { S, T, U, N, K, I, J } = Q33_CASE_ONE_POINTS;
  return (
    <svg viewBox={Q33_CASE_ONE_VIEW_BOX} role="img" aria-label="الشكل المرافق للحالة الأولى من السؤال 33">
      <Polyline points={[S, T, U, S]} className={styles.outline} />
      <Polyline points={[N, K]} className={styles.redLine} />
      <Polyline points={[I, J]} className={styles.redLine} />
      <LabelText text="S" at={S} dx={0} dy={-14} />
      <LabelText text="T" at={T} dx={-10} dy={6} anchor="end" />
      <LabelText text="U" at={U} dx={12} dy={6} anchor="start" />
      <LabelText text="N" at={N} dx={-14} dy={-6} anchor="end" />
      <LabelText text="K" at={K} dx={14} dy={-6} anchor="start" />
      <LabelText text="I" at={I} dx={-14} dy={-2} anchor="end" />
      <LabelText text="J" at={J} dx={14} dy={-2} anchor="start" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Question 33 — case ②                                                         */
/* -------------------------------------------------------------------------- */

function Q33CaseTwoSource() {
  const { A, B, C, D, E, G, H, I, M } = Q33_CASE_TWO_POINTS;
  return (
    <svg viewBox={Q33_CASE_TWO_VIEW_BOX} role="img" aria-label="الشكل المرافق للحالة الثانية من السؤال 33">
      {/* the ray A-B-C, the line A-H-D-I-E and the line E-M-G */}
      <Polyline points={[A, B, C]} className={styles.outline} />
      <Polyline points={[A, H, D, I, E]} className={styles.outline} />
      <Polyline points={[E, M, G]} className={styles.outline} />
      {/* the three printed red segments */}
      <Polyline points={[B, H]} className={styles.redLine} />
      <Polyline points={[C, G]} className={styles.redLine} />
      <Polyline points={[I, M]} className={styles.redLine} />
      <Dot at={E} />
      <Dot at={H} />
      <Dot at={I} />
      <LabelText text="A" at={A} dx={-10} dy={6} anchor="end" />
      <LabelText text="B" at={B} dx={-10} dy={-8} anchor="end" />
      <LabelText text="C" at={C} dx={0} dy={-14} />
      <LabelText text="D" at={D} dx={-12} dy={26} anchor="end" />
      <LabelText text="E" at={E} dx={14} dy={-6} anchor="start" />
      <LabelText text="G" at={G} dx={-12} dy={16} anchor="end" />
      <LabelText text="H" at={H} dx={-8} dy={26} anchor="end" />
      <LabelText text="I" at={I} dx={14} dy={-6} anchor="start" />
      <LabelText text="M" at={M} dx={14} dy={16} anchor="start" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Question 20 — the printed proof flowchart                                  */
/* -------------------------------------------------------------------------- */

function FlowBoxShape({ box, rtl }: { box: FlowBox; rtl?: boolean }) {
  const centreY = box.y + box.height / 2;
  return (
    <g>
      <rect x={box.x} y={box.y} width={box.width} height={box.height} className={styles.flowBox} />
      {box.blank ? (
        <line
          x1={box.x + box.width * 0.3}
          y1={centreY}
          x2={box.x + box.width * 0.7}
          y2={centreY}
          className={styles.flowBlank}
        />
      ) : null}
      {box.text ? (
        <text
          x={box.x + box.width / 2}
          y={centreY}
          className={rtl ? `${styles.flowText} ${styles.flowTextRtl}` : styles.flowText}
        >
          {box.text}
        </text>
      ) : null}
    </g>
  );
}

function FlowArrowShape({ arrow }: { arrow: FlowArrow }) {
  return (
    <g>
      <line
        x1={arrow.from.x}
        y1={arrow.from.y}
        x2={arrow.to.x}
        y2={arrow.to.y}
        className={styles.flowArrowLine}
      />
      {arrow.head === false ? null : (
        <ArrowHead
          at={arrow.to}
          dx={arrow.to.x - arrow.from.x}
          dy={arrow.to.y - arrow.from.y}
          tone="blue"
        />
      )}
    </g>
  );
}

function Q20Source() {
  return (
    <svg viewBox={Q20_VIEW_BOX} role="img" aria-label="مخطط الإثبات المطبوع في السؤال 20">
      {Object.values(Q20_ARROWS).map((arrow, index) => (
        <FlowArrowShape key={index} arrow={arrow} />
      ))}
      <FlowBoxShape box={Q20_BOXES.given} rtl />
      <FlowBoxShape box={Q20_BOXES.cMidpoint} />
      <FlowBoxShape box={Q20_BOXES.aMidpoint} />
      <FlowBoxShape box={Q20_BOXES.bMidpoint} />
      <FlowBoxShape box={Q20_BOXES.blankLeft} />
      <FlowBoxShape box={Q20_BOXES.blankRight} />
      <FlowBoxShape box={Q20_BOXES.parallelOne} />
      <FlowBoxShape box={Q20_BOXES.parallelTwo} />
      <FlowBoxShape box={Q20_BOXES.blankMiddle} />
      <FlowBoxShape box={Q20_BOXES.rightTriangle} rtl />
      <FlowBoxShape box={Q20_BOXES.angle} />
      <FlowBoxShape box={Q20_BOXES.parallelogram} />
      <FlowBoxShape box={Q20_BOXES.blankBottom} />
      <FlowBoxShape box={Q20_BOXES.rectangle} />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Question 21 — the quadrilateral and its medial quadrilateral                */
/* -------------------------------------------------------------------------- */

function Q21Source() {
  const { A, B, C, D, E, F, G, H } = Q21_POINTS;
  return (
    <svg viewBox={Q21_VIEW_BOX} role="img" aria-label="الشكل المرافق للسؤال 21">
      {/* the printed quadrilateral, in blue */}
      <Polyline points={[A, B, C, D, A]} className={styles.blueLine} />
      {/* the printed quadrilateral of the midpoints, in red */}
      <Polyline points={[E, F, G, H, E]} className={styles.redLine} />
      <LabelText text="A" at={Q21_LABELS.A} dy={0} />
      <LabelText text="B" at={Q21_LABELS.B} dy={0} />
      <LabelText text="C" at={Q21_LABELS.C} dy={0} />
      <LabelText text="D" at={Q21_LABELS.D} dy={0} />
      <LabelText text="E" at={Q21_LABELS.E} dy={0} />
      <LabelText text="F" at={Q21_LABELS.F} dy={0} />
      <LabelText text="G" at={Q21_LABELS.G} dy={0} />
      <LabelText text="H" at={Q21_LABELS.H} dy={0} />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Question 24 — the altitude and the line through the two midpoints           */
/* -------------------------------------------------------------------------- */

function RightAngleMark({
  at,
  size,
  tone,
}: {
  at: FigurePoint;
  size: number;
  tone: 'blue' | 'red';
}) {
  return (
    <path
      d={`M ${at.x} ${at.y} L ${at.x} ${at.y - size} L ${at.x + size} ${at.y - size} L ${at.x + size} ${at.y}`}
      className={tone === 'blue' ? styles.rightAngleBlue : styles.rightAngleRed}
    />
  );
}

function Q24Source() {
  const { A, B, C, H, K } = Q24_POINTS;
  return (
    <svg viewBox={Q24_VIEW_BOX} role="img" aria-label="الشكل المرافق للسؤال 24">
      {/* the triangle and its base */}
      <Polyline points={[A, B, C, A]} className={styles.outline} />
      {/* the printed blue altitude */}
      <Polyline points={[A, H]} className={styles.blueLine} />
      <RightAngleMark at={Q24_RIGHT_ANGLE.at} size={Q24_RIGHT_ANGLE.size} tone="blue" />
      {/* the printed red line (IJ) */}
      <line
        x1={Q24_RED_LINE.from.x}
        y1={Q24_RED_LINE.from.y}
        x2={Q24_RED_LINE.to.x}
        y2={Q24_RED_LINE.to.y}
        className={styles.redLine}
      />
      {/* the printed equality marks */}
      <Ticks
        at={Q24_TICKS.ai}
        count={Q24_TICKS.ai.count}
        angle={Math.atan2(B.y - A.y, B.x - A.x)}
        tone="red"
      />
      <Ticks
        at={Q24_TICKS.ib}
        count={Q24_TICKS.ib.count}
        angle={Math.atan2(B.y - A.y, B.x - A.x)}
        tone="red"
      />
      <Ticks
        at={Q24_TICKS.aj}
        count={Q24_TICKS.aj.count}
        angle={Math.atan2(C.y - A.y, C.x - A.x)}
        tone="red"
      />
      <Ticks
        at={Q24_TICKS.jc}
        count={Q24_TICKS.jc.count}
        angle={Math.atan2(C.y - A.y, C.x - A.x)}
        tone="red"
      />
      <Dot at={K} />
      <LabelText text="A" at={Q24_LABELS.A} dy={0} />
      <LabelText text="B" at={Q24_LABELS.B} dy={0} />
      <LabelText text="C" at={Q24_LABELS.C} dy={0} />
      <LabelText text="H" at={Q24_LABELS.H} dy={0} />
      <LabelText text="I" at={Q24_LABELS.I} dy={0} />
      <LabelText text="J" at={Q24_LABELS.J} dy={0} />
      <LabelText text="K" at={Q24_LABELS.K} dy={0} />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Question 26 — the triangle, the parallel segment and the altitude           */
/* -------------------------------------------------------------------------- */

function Q26Source() {
  const { A, B, C, H, M, N } = Q26_POINTS;
  return (
    <svg viewBox={Q26_VIEW_BOX} role="img" aria-label="الشكل المرافق للسؤال 26">
      {/* the two black sides */}
      <Polyline points={[A, B, C]} className={styles.outline} />
      {/* the two printed blue sides: (AC) and (MN) */}
      <Polyline points={[A, C]} className={styles.blueLine} />
      <Polyline points={[M, N]} className={styles.blueLine} />
      {/* the printed red altitude */}
      <Polyline points={[A, H]} className={styles.redLine} />
      <RightAngleMark at={Q26_RIGHT_ANGLE.at} size={Q26_RIGHT_ANGLE.size} tone="red" />
      <LabelText text="A" at={Q26_LABELS.A} dy={0} />
      <LabelText text="B" at={Q26_LABELS.B} dy={0} />
      <LabelText text="C" at={Q26_LABELS.C} dy={0} />
      <LabelText text="H" at={Q26_LABELS.H} dy={0} />
      <LabelText text="M" at={Q26_LABELS.M} dy={0} />
      <LabelText text="N" at={Q26_LABELS.N} dy={0} />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Question 27 — the triangle with the two parallel segments                   */
/* -------------------------------------------------------------------------- */

function Q27Source() {
  const { E, F, G, S, T } = Q27_POINTS;
  return (
    <svg viewBox={Q27_VIEW_BOX} role="img" aria-label="الشكل المرافق للسؤال 27">
      {/* the two black sides */}
      <Polyline points={[F, E]} className={styles.outline} />
      <Polyline points={[F, G]} className={styles.outline} />
      {/* the two printed blue segments */}
      <Polyline points={[S, T]} className={styles.blueLine} />
      <Polyline points={[G, E]} className={styles.blueLine} />
      <LabelText text="E" at={Q27_LABELS.E} dy={0} />
      <LabelText text="F" at={Q27_LABELS.F} dy={0} />
      <LabelText text="G" at={Q27_LABELS.G} dy={0} />
      <LabelText text="S" at={Q27_LABELS.S} dy={0} />
      <LabelText text="T" at={Q27_LABELS.T} dy={0} />
      <LabelText text="9" at={Q27_MEASURES.nine} tone="red" />
      <LabelText text="x" at={Q27_MEASURES.x} tone="red" />
      <LabelText text="5" at={Q27_MEASURES.five} tone="red" />
      <LabelText text="8" at={Q27_MEASURES.eight} tone="red" />
      <LabelText text="y" at={Q27_MEASURES.y} tone="red" />
      <LabelText text="3" at={Q27_MEASURES.three} tone="red" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Helpers for the Batch 1 figures (Q1–Q17)                                    */
/* -------------------------------------------------------------------------- */

/** The printed yellow-highlighted label box that carries a figure number. */
function Badge({ at, text }: { at: FigurePoint; text: string }) {
  return (
    <g>
      <rect
        x={at.x - 16}
        y={at.y - 16}
        width="32"
        height="32"
        rx="2"
        className={styles.badgeYellow}
      />
      <text x={at.x} y={at.y} className={styles.badgeText}>
        {text}
      </text>
    </g>
  );
}

/** A printed angle arc, swept from `from` to `to` in degrees (SVG coords). */
function AngleArc({
  at,
  radius,
  from,
  to,
  tone = 'red',
}: {
  at: FigurePoint;
  radius: number;
  from: number;
  to: number;
  tone?: 'red' | 'blue';
}) {
  const a0 = (from * Math.PI) / 180;
  const a1 = (to * Math.PI) / 180;
  const x0 = at.x + radius * Math.cos(a0);
  const y0 = at.y + radius * Math.sin(a0);
  const x1 = at.x + radius * Math.cos(a1);
  const y1 = at.y + radius * Math.sin(a1);
  const large = Math.abs(to - from) > 180 ? 1 : 0;
  const sweep = to > from ? 1 : 0;
  return (
    <path
      d={`M ${x0} ${y0} A ${radius} ${radius} 0 ${large} ${sweep} ${x1} ${y1}`}
      className={tone === 'red' ? styles.arcRed : styles.arcBlue}
    />
  );
}

/** A printed double-headed measurement arrow — dashed by default. */
function MeasureArrow({
  from,
  to,
  tone = 'black',
  dashed = true,
}: {
  from: FigurePoint;
  to: FigurePoint;
  tone?: 'black' | 'blue';
  dashed?: boolean;
}) {
  const className = dashed
    ? tone === 'blue'
      ? styles.dashedBlue
      : styles.dashedBlack
    : tone === 'blue'
      ? styles.blueLine
      : styles.outline;
  const headTone = tone === 'blue' ? 'blue' : 'black';
  return (
    <g>
      <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} className={className} />
      <ArrowHead at={from} dx={from.x - to.x} dy={from.y - to.y} tone={headTone} />
      <ArrowHead at={to} dx={to.x - from.x} dy={to.y - from.y} tone={headTone} />
    </g>
  );
}

/* -------------------------------------------------------------------------- */
/*  Question 1 — the five printed figures (images 1–3)                          */
/* -------------------------------------------------------------------------- */

function Q1Source() {
  const { A, B, C, D, I, J, K } = Q1_POINTS;
  return (
    <svg viewBox={Q1_VIEW_BOX} role="img" aria-label="الشكل المرافق للبند الثاني من السؤال 1">
      <Polyline points={[A, B]} className={styles.outline} />
      <Polyline points={[A, C]} className={styles.outline} />
      <Polyline points={[C, D]} className={styles.outline} />
      <Polyline points={[A, D]} className={styles.outline} />
      <Polyline points={[B, K]} className={styles.outline} />
      <Polyline points={[I, J]} className={styles.outline} />
      <Ticks at={Q1_TICKS.ai} count={Q1_TICKS.ai.count} angle={Math.atan2(C.y - A.y, C.x - A.x)} tone="red" />
      <Ticks at={Q1_TICKS.ic} count={Q1_TICKS.ic.count} angle={Math.atan2(C.y - A.y, C.x - A.x)} tone="red" />
      <Ticks at={Q1_TICKS.aj} count={Q1_TICKS.aj.count} angle={Math.atan2(D.y - A.y, D.x - A.x)} tone="red" />
      <Ticks at={Q1_TICKS.jd} count={Q1_TICKS.jd.count} angle={Math.atan2(D.y - A.y, D.x - A.x)} tone="red" />
      <LabelText text="A" at={A} dx={-10} dy={-8} anchor="end" />
      <LabelText text="B" at={B} dx={12} dy={-4} anchor="start" />
      <LabelText text="C" at={C} dx={-12} dy={8} anchor="end" />
      <LabelText text="D" at={D} dx={12} dy={8} anchor="start" />
      <LabelText text="I" at={I} dx={-12} dy={6} anchor="end" />
      <LabelText text="J" at={J} dx={14} dy={4} anchor="start" />
      <LabelText text="K" at={K} dx={0} dy={26} />
    </svg>
  );
}

function Q1CaseThreeSource() {
  const { A, B, C, I, J } = Q1_CASE_THREE_POINTS;
  return (
    <svg viewBox={Q1_CASE_THREE_VIEW_BOX} role="img" aria-label="الشكل الثالث من البند الثالث للسؤال 1">
      <Polyline points={[A, B, C, A]} className={styles.outline} />
      <Polyline points={[I, J]} className={styles.outline} />
      <Ticks at={Q1_CASE_THREE_TICKS.bi} count={Q1_CASE_THREE_TICKS.bi.count} angle={Math.atan2(C.y - B.y, C.x - B.x)} tone="red" />
      <Ticks at={Q1_CASE_THREE_TICKS.ic} count={Q1_CASE_THREE_TICKS.ic.count} angle={Math.atan2(C.y - B.y, C.x - B.x)} tone="red" />
      <LabelText text="A" at={A} dx={-12} dy={8} anchor="end" />
      <LabelText text="B" at={B} dx={0} dy={-10} />
      <LabelText text="C" at={C} dx={12} dy={10} anchor="start" />
      <LabelText text="I" at={I} dx={12} dy={-4} anchor="start" />
      <LabelText text="J" at={J} dx={-8} dy={24} anchor="end" />
      <Badge at={{ x: 190, y: 348 }} text="③" />
    </svg>
  );
}

function Q1CaseTwoSource() {
  const { A, B, C, I, J } = Q1_CASE_TWO_POINTS;
  return (
    <svg viewBox={Q1_CASE_TWO_VIEW_BOX} role="img" aria-label="الشكل الثاني من البند الثالث للسؤال 1">
      <Polyline points={[A, B, C, A]} className={styles.outline} />
      <Polyline points={[I, J]} className={styles.outline} />
      <LabelText text="A" at={A} dx={12} dy={6} anchor="start" />
      <LabelText text="B" at={B} dx={-10} dy={-4} anchor="end" />
      <LabelText text="C" at={C} dx={0} dy={26} />
      <LabelText text="I" at={I} dx={-14} dy={6} anchor="end" />
      <LabelText text="J" at={J} dx={12} dy={16} anchor="start" />
      <Badge at={{ x: 165, y: 348 }} text="②" />
    </svg>
  );
}

function Q1CaseOneSource() {
  const { A, B, C, I, J } = Q1_CASE_ONE_POINTS;
  return (
    <svg viewBox={Q1_CASE_ONE_VIEW_BOX} role="img" aria-label="الشكل الأول من البند الثالث للسؤال 1">
      <Polyline points={[A, B, C, A]} className={styles.outline} />
      <Polyline points={[I, J]} className={styles.outline} />
      <RightAngleMark at={B} size={24} tone="red" />
      <RightAngleMark at={I} size={24} tone="red" />
      <Ticks at={Q1_CASE_ONE_TICKS.bi} count={Q1_CASE_ONE_TICKS.bi.count} angle={0} tone="red" />
      <Ticks at={Q1_CASE_ONE_TICKS.ic} count={Q1_CASE_ONE_TICKS.ic.count} angle={0} tone="red" />
      <LabelText text="A" at={A} dx={-4} dy={-10} />
      <LabelText text="B" at={B} dx={-12} dy={10} anchor="end" />
      <LabelText text="C" at={C} dx={12} dy={10} anchor="start" />
      <LabelText text="I" at={I} dx={0} dy={24} />
      <LabelText text="J" at={J} dx={12} dy={-6} anchor="start" />
      <Badge at={{ x: 140, y: 348 }} text="①" />
    </svg>
  );
}

function Q1ThalesSource() {
  const { N, A, B, M, P } = Q1_THALES_POINTS;
  return (
    <svg viewBox={Q1_THALES_VIEW_BOX} role="img" aria-label="الشكل المرافق للبندين الرابع والخامس من السؤال 1">
      <Polyline points={[N, A, B, N]} className={styles.outline} />
      <Polyline points={[M, P]} className={styles.outline} />
      <LabelText text="N" at={N} dx={2} dy={-10} />
      <LabelText text="A" at={A} dx={-12} dy={8} anchor="end" />
      <LabelText text="B" at={B} dx={12} dy={10} anchor="start" />
      <LabelText text="M" at={M} dx={-14} dy={4} anchor="end" />
      <LabelText text="P" at={P} dx={14} dy={12} anchor="start" />
      <LabelText text="2" at={Q1_THALES_MEASURES.two} dy={0} tone="red" />
      <LabelText text="4" at={Q1_THALES_MEASURES.four} dy={0} tone="red" />
      <LabelText text="1.8" at={Q1_THALES_MEASURES.onePointEight} dy={0} tone="red" />
      <LabelText text="1.2" at={Q1_THALES_MEASURES.onePointTwo} dy={0} tone="red" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Question 2 — the two circles, the triangle and the measured figure           */
/* -------------------------------------------------------------------------- */

function Q2CirclesSource() {
  const { O, OPrime, radius, radiusPrime, A, B, BPrime } = Q2_CIRCLES;
  return (
    <svg viewBox={Q2_CIRCLES_VIEW_BOX} role="img" aria-label="الشكل المرافق للبند الأول من السؤال 2">
      <circle cx={O.x} cy={O.y} r={radius} className={styles.outline} />
      <circle cx={OPrime.x} cy={OPrime.y} r={radiusPrime} className={styles.outline} />
      <Polyline points={[A, B]} className={styles.outline} />
      <Polyline points={[A, BPrime]} className={styles.outline} />
      {/* the printed centre ticks right at O and O' */}
      <Ticks at={O} count={1} angle={Math.atan2(B.y - A.y, B.x - A.x)} tone="black" />
      <Ticks at={OPrime} count={1} angle={Math.atan2(BPrime.y - A.y, BPrime.x - A.x)} tone="black" />
      <LabelText text="ℭ" at={{ x: 52, y: 42 }} dx={0} dy={0} />
      <LabelText text="ℭ′" at={{ x: 468, y: 66 }} dx={0} dy={0} />
      <LabelText text="A" at={A} dx={0} dy={-14} />
      <LabelText text="B" at={B} dx={-12} dy={10} anchor="end" />
      <LabelText text="B′" at={BPrime} dx={12} dy={16} anchor="start" />
      <LabelText text="O" at={O} dx={-14} dy={-4} anchor="end" />
      <LabelText text="O′" at={OPrime} dx={14} dy={6} anchor="start" />
    </svg>
  );
}

function Q2TriangleSource() {
  const { A, B, C, J, K } = Q2_TRIANGLE_POINTS;
  return (
    <svg viewBox={Q2_TRIANGLE_VIEW_BOX} role="img" aria-label="الشكل المرافق للبند الثاني من السؤال 2">
      <Polyline points={[A, B, C, A]} className={styles.outline} />
      <Polyline points={[J, K]} className={styles.outline} />
      <Ticks at={Q2_TRIANGLE_TICKS.aj} count={Q2_TRIANGLE_TICKS.aj.count} angle={Math.atan2(B.y - A.y, B.x - A.x)} tone="red" />
      <Ticks at={Q2_TRIANGLE_TICKS.jb} count={Q2_TRIANGLE_TICKS.jb.count} angle={Math.atan2(B.y - A.y, B.x - A.x)} tone="red" />
      <Dot at={J} />
      <Dot at={K} />
      <LabelText text="A" at={A} dx={0} dy={-10} />
      <LabelText text="B" at={B} dx={-12} dy={10} anchor="end" />
      <LabelText text="C" at={C} dx={12} dy={10} anchor="start" />
      <LabelText text="J" at={J} dx={-12} dy={6} anchor="end" />
      <LabelText text="K" at={K} dx={14} dy={4} anchor="start" />
      <LabelText text="8 cm" at={{ x: 200, y: 256 }} dy={0} tone="red" />
    </svg>
  );
}

function Q2QuadrilateralSource() {
  const { M, A, B, C, D, E, F } = Q2_QUADRILATERAL_POINTS;
  return (
    <svg viewBox={Q2_QUADRILATERAL_VIEW_BOX} role="img" aria-label="الشكل المرافق للبند الرابع من السؤال 2">
      <Polyline points={[M, D]} className={styles.outline} />
      <Polyline points={[M, E]} className={styles.outline} />
      <Polyline points={[M, F]} className={styles.outline} />
      <Polyline points={[D, E]} className={styles.outline} />
      <Polyline points={[E, F]} className={styles.outline} />
      <Polyline points={[A, B]} className={styles.outline} />
      <Polyline points={[B, C]} className={styles.outline} />
      <LabelText text="M" at={M} dx={0} dy={-10} />
      <LabelText text="A" at={A} dx={-12} dy={6} anchor="end" />
      <LabelText text="B" at={B} dx={-4} dy={24} />
      <LabelText text="C" at={C} dx={10} dy={-6} anchor="start" />
      <LabelText text="D" at={D} dx={-12} dy={8} anchor="end" />
      <LabelText text="E" at={E} dx={10} dy={16} anchor="start" />
      <LabelText text="F" at={F} dx={12} dy={4} anchor="start" />
      <LabelText text="y" at={Q2_QUADRILATERAL_MEASURES.y} dy={0} tone="redItalic" />
      <LabelText text="2" at={Q2_QUADRILATERAL_MEASURES.two} dy={0} tone="red" />
      <LabelText text="5" at={Q2_QUADRILATERAL_MEASURES.five} dy={0} tone="red" />
      <LabelText text="8" at={Q2_QUADRILATERAL_MEASURES.eight} dy={0} tone="red" />
      <LabelText text="x" at={Q2_QUADRILATERAL_MEASURES.x} dy={0} tone="redItalic" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Questions 3, 4 and 5 — the rectangle and the two triangles                   */
/* -------------------------------------------------------------------------- */

function Q3Source() {
  const { A, B, C, D, I, K, J } = Q3_POINTS;
  return (
    <svg viewBox={Q3_VIEW_BOX} role="img" aria-label="الشكل المرافق للسؤال 3">
      <Polyline points={[A, B, C, D, A]} className={styles.blueLine} />
      {/* the printed red segments [IK] and [DJ] */}
      <Polyline points={[I, K]} className={styles.redLine} />
      <Polyline points={[D, J]} className={styles.redLine} />
      {/* the printed black double ticks on [AI] and [ID] */}
      <Ticks at={Q3_TICKS.ai} count={Q3_TICKS.ai.count} angle={Math.PI / 2} tone="black" />
      <Ticks at={Q3_TICKS.id} count={Q3_TICKS.id.count} angle={Math.PI / 2} tone="black" />
      {/* the printed blue dashed measurement arrows */}
      <MeasureArrow from={Q3_ARROWS.ak.from} to={Q3_ARROWS.ak.to} tone="blue" />
      <MeasureArrow from={Q3_ARROWS.jb.from} to={Q3_ARROWS.jb.to} tone="blue" />
      <MeasureArrow from={Q3_ARROWS.dc.from} to={Q3_ARROWS.dc.to} tone="blue" />
      <LabelText text="A" at={A} dx={-12} dy={4} anchor="end" />
      <LabelText text="B" at={B} dx={12} dy={4} anchor="start" />
      <LabelText text="C" at={C} dx={12} dy={10} anchor="start" />
      <LabelText text="D" at={D} dx={-12} dy={10} anchor="end" />
      <LabelText text="I" at={I} dx={-12} dy={6} anchor="end" />
      <LabelText text="K" at={K} dx={4} dy={-12} />
      <LabelText text="J" at={J} dx={0} dy={-12} />
      <LabelText text="2" at={{ x: 91, y: 20 }} dy={0} tone="blueNumber" />
      <LabelText text="4" at={{ x: 375, y: 20 }} dy={0} tone="blueNumber" />
      <LabelText text="8" at={{ x: 260, y: 324 }} dy={0} tone="blueNumber" />
    </svg>
  );
}

function Q4Source() {
  const { A, B, C, I, J } = Q4_POINTS;
  return (
    <svg viewBox={Q4_VIEW_BOX} role="img" aria-label="الشكل المرافق للسؤال 4">
      <Polyline points={[A, B, C, A]} className={styles.blueLine} />
      <Polyline points={[I, J]} className={styles.redLine} />
      <LabelText text="A" at={A} dx={0} dy={-10} />
      <LabelText text="B" at={B} dx={-12} dy={8} anchor="end" />
      <LabelText text="C" at={C} dx={12} dy={8} anchor="start" />
      <LabelText text="I" at={I} dx={-12} dy={6} anchor="end" tone="redItalic" />
      <LabelText text="J" at={J} dx={12} dy={4} anchor="start" tone="redItalic" />
      <LabelText text="2" at={Q4_MEASURES.ai} dy={0} tone="blueNumber" />
      <LabelText text="2" at={Q4_MEASURES.ib} dy={0} tone="blueNumber" />
      <LabelText text="3" at={Q4_MEASURES.aj} dy={0} tone="blueNumber" />
      <LabelText text="3" at={Q4_MEASURES.jc} dy={0} tone="blueNumber" />
      <LabelText text="5" at={Q4_MEASURES.bc} dy={0} tone="blueNumber" />
    </svg>
  );
}

function Q5Source() {
  const { A, B, C, I, J, K } = Q5_POINTS;
  return (
    <svg viewBox={Q5_VIEW_BOX} role="img" aria-label="الشكل المرافق للسؤال 5">
      <Polyline points={[A, B, C, A]} className={styles.blueLine} />
      <Polyline points={[I, K]} className={styles.redLine} />
      <Polyline points={[I, J]} className={styles.redLine} />
      <Polyline points={[J, K]} className={styles.redLine} />
      <Ticks at={Q5_TICKS.ai} count={Q5_TICKS.ai.count} angle={Math.atan2(B.y - A.y, B.x - A.x)} tone="black" />
      <Ticks at={Q5_TICKS.ib} count={Q5_TICKS.ib.count} angle={Math.atan2(B.y - A.y, B.x - A.x)} tone="black" />
      <Ticks at={Q5_TICKS.ak} count={Q5_TICKS.ak.count} angle={Math.atan2(C.y - A.y, C.x - A.x)} tone="black" />
      <Ticks at={Q5_TICKS.kc} count={Q5_TICKS.kc.count} angle={Math.atan2(C.y - A.y, C.x - A.x)} tone="black" />
      <Ticks at={Q5_TICKS.bj} count={Q5_TICKS.bj.count} angle={0} tone="black" />
      <Ticks at={Q5_TICKS.jc} count={Q5_TICKS.jc.count} angle={0} tone="black" />
      <LabelText text="A" at={A} dx={0} dy={-10} />
      <LabelText text="B" at={B} dx={-12} dy={10} anchor="end" />
      <LabelText text="C" at={C} dx={12} dy={10} anchor="start" />
      <LabelText text="I" at={I} dx={-12} dy={6} anchor="end" tone="redItalic" />
      <LabelText text="J" at={J} dx={0} dy={28} tone="redItalic" />
      <LabelText text="K" at={K} dx={14} dy={4} anchor="start" tone="redItalic" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Questions 6 and 9                                                            */
/* -------------------------------------------------------------------------- */

function Q6Source() {
  const { A, B, C, D, O, E } = Q6_POINTS;
  return (
    <svg viewBox={Q6_VIEW_BOX} role="img" aria-label="الشكل المرافق للسؤال 6">
      {/* the blue parallelogram ABCD */}
      <Polyline points={[A, B, C, D, A]} className={styles.blueLine} />
      {/* the black diagonals, extension [CE] and segment [BE] */}
      <Polyline points={[C, E]} className={styles.outline} />
      <Polyline points={[A, C]} className={styles.outline} />
      <Polyline points={[D, B]} className={styles.outline} />
      <Polyline points={[B, E]} className={styles.outline} />
      <LabelText text="A" at={A} dx={-10} dy={-6} anchor="end" />
      <LabelText text="B" at={B} dx={12} dy={-4} anchor="start" />
      <LabelText text="C" at={C} dx={0} dy={26} />
      <LabelText text="D" at={D} dx={-12} dy={8} anchor="end" />
      <LabelText text="O" at={O} dx={-4} dy={28} />
      <LabelText text="E" at={E} dx={12} dy={8} anchor="start" />
    </svg>
  );
}

function Q9Source() {
  const { A, B, C, D, E, F, J } = Q9_POINTS;
  return (
    <svg viewBox={Q9_VIEW_BOX} role="img" aria-label="الشكل المرافق للسؤال 9">
      <Polyline points={[A, B, D, A]} className={styles.blueLine} />
      <Polyline points={[A, C]} className={styles.blueLine} />
      <Dot at={E} />
      <Dot at={F} />
      <Dot at={J} />
      <LabelText text="A" at={A} dx={0} dy={-10} />
      <LabelText text="B" at={B} dx={-12} dy={10} anchor="end" />
      <LabelText text="C" at={C} dx={-4} dy={24} />
      <LabelText text="D" at={D} dx={12} dy={10} anchor="start" />
      <LabelText text="E" at={E} dx={-14} dy={6} anchor="end" />
      <LabelText text="F" at={F} dx={14} dy={6} anchor="start" />
      <LabelText text="J" at={J} dx={14} dy={6} anchor="start" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Question 10 — the two printed figures (image 13)                             */
/* -------------------------------------------------------------------------- */

function Q10CaseOneSource() {
  const { A, B, C, I, J, greenTop, greenBottom } = Q10_CASE_ONE_POINTS;
  return (
    <svg viewBox={Q10_CASE_ONE_VIEW_BOX} role="img" aria-label="الشكل الأول من السؤال 10">
      <Polyline points={[A, B, C, A]} className={styles.blueLine} />
      <Polyline points={[greenTop, greenBottom]} className={styles.greenLine} />
      {/* the printed red right-angle squares at BOTH B and J */}
      <RightAngleMark at={B} size={22} tone="red" />
      <RightAngleMark at={J} size={22} tone="red" />
      <Ticks at={Q10_CASE_ONE_TICKS.bj} count={Q10_CASE_ONE_TICKS.bj.count} angle={0} tone="red" />
      <Ticks at={Q10_CASE_ONE_TICKS.jc} count={Q10_CASE_ONE_TICKS.jc.count} angle={0} tone="red" />
      <LabelText text="A" at={A} dx={0} dy={-10} />
      <LabelText text="B" at={B} dx={-12} dy={14} anchor="end" />
      <LabelText text="C" at={C} dx={12} dy={10} anchor="start" />
      <LabelText text="I" at={I} dx={14} dy={-4} anchor="start" />
      <LabelText text="J" at={J} dx={0} dy={24} />
      <Badge at={{ x: 155, y: 342 }} text="①" />
    </svg>
  );
}

function Q10CaseTwoSource() {
  const { A, B, C, I, J, greenTop, greenBottom } = Q10_CASE_TWO_POINTS;
  return (
    <svg viewBox={Q10_CASE_TWO_VIEW_BOX} role="img" aria-label="الشكل الثاني من السؤال 10">
      <Polyline points={[A, B, C, A]} className={styles.blueLine} />
      <Polyline points={[greenTop, greenBottom]} className={styles.greenLine} />
      {/* the printed red equal-angle arcs inside ∠CBA and ∠CJI (above [BC]) */}
      <AngleArc at={B} radius={36} from={-65} to={0} />
      <AngleArc at={J} radius={36} from={-65} to={0} />
      <Ticks at={Q10_CASE_TWO_TICKS.bj} count={Q10_CASE_TWO_TICKS.bj.count} angle={0} tone="red" />
      <Ticks at={Q10_CASE_TWO_TICKS.jc} count={Q10_CASE_TWO_TICKS.jc.count} angle={0} tone="red" />
      <LabelText text="A" at={A} dx={4} dy={-10} />
      <LabelText text="B" at={B} dx={-12} dy={12} anchor="end" />
      <LabelText text="C" at={C} dx={12} dy={10} anchor="start" />
      <LabelText text="I" at={I} dx={14} dy={6} anchor="start" />
      <LabelText text="J" at={J} dx={-6} dy={24} />
      <Badge at={{ x: 155, y: 342 }} text="②" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Questions 13 to 17                                                           */
/* -------------------------------------------------------------------------- */

function Q13Source() {
  const { frame, A, B, aTo, bTo } = Q13_POINTS;
  return (
    <svg viewBox={Q13_VIEW_BOX} role="img" aria-label="الشكل المرافق للسؤال 13">
      <rect x={frame.x} y={frame.y} width={frame.width} height={frame.height} className={styles.outline} />
      <Polyline points={[A, B]} className={styles.blueLine} />
      <Polyline points={[A, aTo]} className={styles.blueLine} />
      <Polyline points={[B, bTo]} className={styles.blueLine} />
      <LabelText text="A" at={A} dx={-12} dy={4} anchor="end" />
      <LabelText text="B" at={B} dx={-12} dy={8} anchor="end" />
    </svg>
  );
}

function Q14Source() {
  const { A, B, C, D, M, F, E } = Q14_POINTS;
  return (
    <svg viewBox={Q14_VIEW_BOX} role="img" aria-label="الشكل المرافق للسؤال 14">
      <Polyline points={[A, B, C, A]} className={styles.blueLine} />
      <Polyline points={[A, D]} className={styles.outline} />
      <Polyline points={[F, C]} className={styles.outline} />
      <Polyline points={[E, D]} className={styles.outline} />
      <Ticks at={Q14_TICKS.am} count={Q14_TICKS.am.count} angle={Math.atan2(D.y - A.y, D.x - A.x)} tone="black" />
      <Ticks at={Q14_TICKS.md} count={Q14_TICKS.md.count} angle={Math.atan2(D.y - A.y, D.x - A.x)} tone="black" />
      <ArrowHead at={Q14_ARROWS.fc} dx={C.x - F.x} dy={C.y - F.y} />
      <ArrowHead at={Q14_ARROWS.ed} dx={D.x - E.x} dy={D.y - E.y} />
      <Ticks at={{ x: 116.75, y: 367.75 }} count={2} angle={0} tone="black" />
      <Ticks at={{ x: 310.25, y: 369.25 }} count={2} angle={0} tone="black" />
      <LabelText text="A" at={A} dx={0} dy={-8} />
      <LabelText text="B" at={B} dx={-12} dy={8} anchor="end" />
      <LabelText text="C" at={C} dx={12} dy={8} anchor="start" />
      <LabelText text="D" at={D} dx={0} dy={26} />
      <LabelText text="M" at={M} dx={12} dy={-4} anchor="start" />
      <LabelText text="F" at={F} dx={-12} dy={4} anchor="end" />
      <LabelText text="E" at={E} dx={-12} dy={6} anchor="end" />
    </svg>
  );
}

function Q15Source() {
  const { A, B, C, V, T } = Q15_POINTS;
  return (
    <svg viewBox={Q15_VIEW_BOX} role="img" aria-label="الشكل المرافق للسؤال 15">
      <Polyline points={[A, C, B, A]} className={styles.blueLine} />
      <Polyline points={[T, V]} className={styles.outline} />
      <MeasureArrow from={Q15_MEASURES.abArrow.from} to={Q15_MEASURES.abArrow.to} />
      <LabelText text="A" at={A} dx={-12} dy={8} anchor="end" />
      <LabelText text="B" at={B} dx={12} dy={10} anchor="start" />
      <LabelText text="C" at={C} dx={0} dy={-8} />
      <LabelText text="T" at={T} dx={0} dy={24} />
      <LabelText text="V" at={V} dx={-10} dy={-6} anchor="end" />
      <LabelText text="3.5" at={Q15_MEASURES.av} dy={0} tone="red" />
      <LabelText text="3" at={Q15_MEASURES.tv} dy={0} tone="red" />
      <LabelText text="6.6" at={Q15_MEASURES.cb} dy={0} tone="red" />
      <LabelText text="9.9" at={Q15_MEASURES.ab} dy={0} tone="red" />
    </svg>
  );
}

function Q16Source() {
  const { A, B, C, D, E, baArrow, acArrow } = Q16_POINTS;
  return (
    <svg viewBox={Q16_VIEW_BOX} role="img" aria-label="الشكل المرافق للسؤال 16">
      <Polyline points={[A, B, C, A]} className={styles.outline} />
      <Polyline points={[D, E]} className={styles.outline} />
      <MeasureArrow from={baArrow.from} to={baArrow.to} />
      <MeasureArrow from={acArrow.from} to={acArrow.to} />
      <LabelText text="A" at={A} dx={12} dy={-4} anchor="start" />
      <LabelText text="B" at={B} dx={-12} dy={8} anchor="end" />
      <LabelText text="C" at={C} dx={10} dy={22} anchor="start" />
      <LabelText text="D" at={D} dx={-4} dy={-10} />
      <LabelText text="E" at={E} dx={12} dy={12} anchor="start" />
      <LabelText text="12" at={Q16_MEASURES.twelve} dy={0} tone="red" />
      <LabelText text="9" at={Q16_MEASURES.nine} dy={0} tone="red" />
      <LabelText text="6" at={Q16_MEASURES.six} dy={0} tone="red" />
      <LabelText text="7" at={Q16_MEASURES.de} dy={0} tone="red" />
    </svg>
  );
}

function Q17Source() {
  const { L, N, M, Q, P, lnArrow, lmArrow } = Q17_POINTS;
  return (
    <svg viewBox={Q17_VIEW_BOX} role="img" aria-label="الشكل المرافق للسؤال 17">
      <Polyline points={[L, N, M, L]} className={styles.outline} />
      <Polyline points={[Q, P]} className={styles.outline} />
      <MeasureArrow from={lnArrow.from} to={lnArrow.to} />
      <MeasureArrow from={lmArrow.from} to={lmArrow.to} />
      <LabelText text="L" at={L} dx={-12} dy={8} anchor="end" />
      <LabelText text="N" at={N} dx={2} dy={-10} />
      <LabelText text="M" at={M} dx={12} dy={6} anchor="start" />
      <LabelText text="Q" at={Q} dx={-12} dy={-2} anchor="end" />
      <LabelText text="P" at={P} dx={6} dy={24} />
      <LabelText text="16" at={Q17_MEASURES.sixteen} dy={0} tone="red" />
      <LabelText text="21" at={Q17_MEASURES.twentyOne} dy={0} tone="red" />
      <LabelText text="4" at={Q17_MEASURES.qn} dy={0} tone="red" />
      <LabelText text="9" at={Q17_MEASURES.qp} dy={0} tone="red" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Questions 18 and 19 (Batch 2)                                               */
/* -------------------------------------------------------------------------- */

function Q18CaseOneSource() {
  const { E, H, K, F, J, ekArrow } = Q18_CASE_ONE_POINTS;
  return (
    <svg viewBox={Q18_CASE_ONE_VIEW_BOX} role="img" aria-label="الشكل الأول من السؤال 18">
      <Polyline points={[E, H, K, E]} className={styles.outline} />
      <Polyline points={[F, J]} className={styles.outline} />
      <MeasureArrow from={ekArrow.from} to={ekArrow.to} />
      <LabelText text="E" at={E} dx={-12} dy={6} anchor="end" />
      <LabelText text="F" at={F} dx={-8} dy={-6} anchor="end" />
      <LabelText text="H" at={H} dx={0} dy={-10} />
      <LabelText text="J" at={J} dx={0} dy={24} />
      <LabelText text="K" at={K} dx={12} dy={6} anchor="start" />
      <LabelText text="5" at={Q18_CASE_ONE_MEASURES.five} dy={0} tone="red" />
      <LabelText text="8" at={Q18_CASE_ONE_MEASURES.eight} dy={0} tone="red" />
      <LabelText text="32.5" at={Q18_CASE_ONE_MEASURES.thirtyTwoPointFive} dy={0} tone="red" />
    </svg>
  );
}

function Q18CaseTwoSource() {
  const { M, B, A, E, J } = Q18_CASE_TWO_POINTS;
  return (
    <svg viewBox={Q18_CASE_TWO_VIEW_BOX} role="img" aria-label="الشكل الثاني من السؤال 18">
      <Polyline points={[M, B, A, M]} className={styles.outline} />
      <Polyline points={[E, J]} className={styles.outline} />
      <LabelText text="M" at={M} dx={-12} dy={6} anchor="end" />
      <LabelText text="E" at={E} dx={-10} dy={-4} anchor="end" />
      <LabelText text="B" at={B} dx={-6} dy={-10} />
      <LabelText text="J" at={J} dx={0} dy={24} />
      <LabelText text="A" at={A} dx={12} dy={6} anchor="start" />
      <LabelText text="3" at={Q18_CASE_TWO_MEASURES.three} dy={0} tone="red" />
      <LabelText text="9" at={Q18_CASE_TWO_MEASURES.nine} dy={0} tone="red" />
      <LabelText text="8" at={Q18_CASE_TWO_MEASURES.eight} dy={0} tone="red" />
    </svg>
  );
}

function Q19Source() {
  const { A, I, B, K, J, C, D } = Q19_POINTS;
  const akAngle = Math.atan2(K.y - A.y, K.x - A.x);
  const acAngle = Math.atan2(C.y - A.y, C.x - A.x);
  return (
    <svg viewBox={Q19_VIEW_BOX} role="img" aria-label="الشكل المرافق للسؤال 19">
      <Polyline points={[K, A, C]} className={styles.outline} />
      <Polyline points={[I, J]} className={styles.outline} />
      <Polyline points={[B, C]} className={styles.outline} />
      <Polyline points={[K, J]} className={styles.outline} />
      <Ticks at={Q19_TICKS.ai} count={Q19_TICKS.ai.count} angle={akAngle} tone="red" />
      <Ticks at={Q19_TICKS.ib} count={Q19_TICKS.ib.count} angle={akAngle} tone="red" />
      <Ticks at={Q19_TICKS.bk} count={Q19_TICKS.bk.count} angle={akAngle} tone="red" />
      <Ticks at={Q19_TICKS.aj} count={Q19_TICKS.aj.count} angle={acAngle} tone="red" />
      <Ticks at={Q19_TICKS.jc} count={Q19_TICKS.jc.count} angle={acAngle} tone="red" />
      <LabelText text="A" at={A} dx={2} dy={-10} />
      <LabelText text="I" at={I} dx={-14} dy={6} anchor="end" />
      <LabelText text="J" at={J} dx={14} dy={6} anchor="start" />
      <LabelText text="B" at={B} dx={-14} dy={4} anchor="end" />
      <LabelText text="D" at={D} dx={8} dy={24} anchor="start" />
      <LabelText text="C" at={C} dx={12} dy={6} anchor="start" />
      <LabelText text="K" at={K} dx={-10} dy={14} anchor="end" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Entry point                                                                  */
/* -------------------------------------------------------------------------- */

export function UnitTwoExercisesFigure({ spec }: { spec: InteractiveDiagram }) {
  const scenario = String(spec.params.scenario ?? '');
  return (
    <div className={styles.wrap}>
      {scenario === 'q18-case-one' ? <Q18CaseOneSource /> : null}
      {scenario === 'q18-case-two' ? <Q18CaseTwoSource /> : null}
      {scenario === 'q19-proof-draft' ? <Q19Source /> : null}
      {scenario === 'q20-flowchart' ? <Q20Source /> : null}
      {scenario === 'q21-midpoint-quadrilateral' ? <Q21Source /> : null}
      {scenario === 'q24-altitude-bisector' ? <Q24Source /> : null}
      {scenario === 'q26-parallel-segment' ? <Q26Source /> : null}
      {scenario === 'q27-unknowns' ? <Q27Source /> : null}
      {scenario === 'q28-midpoint-parallel' ? <Q28Source /> : null}
      {scenario === 'q29-equal-ratios' ? <Q29Source /> : null}
      {scenario === 'q30-divide-segment' ? <Q30Source /> : null}
      {scenario === 'q32-distance-towers' ? <Q32Source /> : null}
      {scenario === 'q33-case-one' ? <Q33CaseOneSource /> : null}
      {scenario === 'q33-case-two' ? <Q33CaseTwoSource /> : null}
      {scenario === 'q1-quadrilateral' ? <Q1Source /> : null}
      {scenario === 'q1-case-three' ? <Q1CaseThreeSource /> : null}
      {scenario === 'q1-case-two' ? <Q1CaseTwoSource /> : null}
      {scenario === 'q1-case-one' ? <Q1CaseOneSource /> : null}
      {scenario === 'q1-thales-triangle' ? <Q1ThalesSource /> : null}
      {scenario === 'q2-circles' ? <Q2CirclesSource /> : null}
      {scenario === 'q2-triangle' ? <Q2TriangleSource /> : null}
      {scenario === 'q2-quadrilateral' ? <Q2QuadrilateralSource /> : null}
      {scenario === 'q3-rectangle' ? <Q3Source /> : null}
      {scenario === 'q4-triangle' ? <Q4Source /> : null}
      {scenario === 'q5-medial-triangle' ? <Q5Source /> : null}
      {scenario === 'q6-parallelogram' ? <Q6Source /> : null}
      {scenario === 'q9-triangle' ? <Q9Source /> : null}
      {scenario === 'q10-case-one' ? <Q10CaseOneSource /> : null}
      {scenario === 'q10-case-two' ? <Q10CaseTwoSource /> : null}
      {scenario === 'q13-hidden-vertex' ? <Q13Source /> : null}
      {scenario === 'q14-triangle' ? <Q14Source /> : null}
      {scenario === 'q15-triangle' ? <Q15Source /> : null}
      {scenario === 'q16-triangle' ? <Q16Source /> : null}
      {scenario === 'q17-triangle' ? <Q17Source /> : null}
    </div>
  );
}
