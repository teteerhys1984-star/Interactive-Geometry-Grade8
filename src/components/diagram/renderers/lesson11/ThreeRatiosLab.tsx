import { useId, useMemo, useState } from 'react';
import { FigureSvg } from '@/components/diagram/renderers/lesson4/FigureSvg';
import { Math as MathExpr, RichText } from '@/components/math';
import type { InteractiveDiagram } from '@/content/schema';
import {
  buildThreeRatiosScene,
  L11_LAB_TRIANGLES,
  type ThreeRatiosPresetId,
} from '@/content/units/lesson-11-geometry';
import { midPoint } from '@/content/units/lesson-10-geometry';
import { plainTextIsolated } from '@/lib/bidi';
import type { FigureSegment, FigureSpec, XY } from '@/lib/geometryFigure';
import styles from './ThreeRatiosLab.module.css';

/** Split a side at its midpoint so `arrow: true` paints a parallel chevron. */
function parallelSegments(from: XY, to: XY, tone: 'ink' | 'given'): FigureSegment[] {
  const m = midPoint(from, to);
  return [
    { from, to: m, tone, arrow: true },
    { from: m, to, tone },
  ];
}

const PRINTED_RATIO = 2 / 3;

const FACT_LABELS = {
  jMidAN: '$J$ منتصف $[AN]$',
  pMidBJ: '$P$ منتصف $[BJ]$',
  nMidCJ: '$N$ منتصف $[CJ]$',
  thirdsEqual: '$CS = SR = RB$',
  bsnmpParallelogram: '$BSNM$ متوازي أضلاع',
} as const;

/**
 * ============================================================================
 *  THREE-RATIO INTERACTIVE LAB (Unit 2, Lesson 4 — pages 39–41)
 * ============================================================================
 *
 *  Rebuilds the printed activity at ANY ratio k: M moves on [AB] and N on [AC]
 *  with (MN) ∥ (BC) always true, while every auxiliary point of the textbook
 *  construction is computed exactly (J, P, R, S). The student moves the slider
 *  and watches which of the five printed conclusions survive:
 *
 *    • J is the midpoint of [AN] for every k (it only needs the midline theorem
 *      inside triangle AMN);
 *    • P, N's midpoint and the equal thirds only happen at k = 2/3, the value
 *      the textbook chose — which is exactly why the activity is about 2/3.
 *
 *  The figure is drawn through the shared FigureSvg and the numbers through the
 *  shared Math component; the lab adds no notation of its own.
 * ============================================================================
 */
export function ThreeRatiosLab({ spec }: { spec: InteractiveDiagram }) {
  const ratioSliderId = useId();
  const initialRatio =
    typeof spec.params?.initialRatio === 'number' ? spec.params.initialRatio : PRINTED_RATIO;

  const [triangleId, setTriangleId] = useState<ThreeRatiosPresetId>('acute');
  const [ratio, setRatio] = useState<number>(initialRatio);
  const [showAuxiliary, setShowAuxiliary] = useState<boolean>(true);

  const triangle = useMemo(
    () => L11_LAB_TRIANGLES.find((item) => item.id === triangleId) ?? L11_LAB_TRIANGLES[0]!,
    [triangleId],
  );

  const scene = useMemo(() => buildThreeRatiosScene(triangle, ratio), [triangle, ratio]);
  // Derived from the geometry itself, not from a tolerance on the slider: the
  // printed case is announced only when the equal thirds really hold (k = 2/3).
  const atPrintedRatio = scene.facts.thirdsEqual;
  const atHalf = Math.abs(ratio - 0.5) < 1e-9;

  const figureSpec: FigureSpec = useMemo(() => {
    const segments: FigureSegment[] = [
      { from: scene.A, to: scene.B, tone: 'ink' },
      { from: scene.A, to: scene.C, tone: 'ink' },
      ...parallelSegments(scene.B, scene.C, 'ink'),
      { from: scene.A, to: scene.M, tone: 'given' },
      { from: scene.A, to: scene.N, tone: 'given' },
      ...parallelSegments(scene.M, scene.N, 'given'),
    ];

    const points: NonNullable<FigureSpec['points']> = [
      { at: scene.A, label: 'A', place: 'n' },
      { at: scene.B, label: 'B', place: 'sw' },
      { at: scene.C, label: 'C', place: 'se' },
      { at: scene.M, label: 'M', place: 'nw', tone: 'given' },
      { at: scene.N, label: 'N', place: 'ne', tone: 'given' },
    ];

    if (showAuxiliary) {
      // I and J: the printed midline IJ inside triangle AMN.
      segments.push({ from: scene.I, to: scene.J, tone: 'aux', dashed: true });
      segments.push({ from: scene.B, to: scene.J, tone: 'aux', dashed: true });
      segments.push({ from: scene.J, to: scene.R, tone: 'image' });
      segments.push({ from: scene.N, to: scene.S, tone: 'image' });
      points.push({ at: scene.I, label: 'I', place: 'sw', tone: 'aux' });
      points.push({ at: scene.J, label: 'J', place: 'w', tone: 'aux' });
      points.push({ at: scene.P, label: 'P', place: 's', tone: 'image' });
      points.push({ at: scene.R, label: 'R', place: 's', tone: 'image' });
      points.push({ at: scene.S, label: 'S', place: 's', tone: 'image' });
    }

    return {
      viewBox: { x: -0.9, y: -1.4, w: 10.4, h: 8.6 },
      polygons: [{ points: [scene.A, scene.B, scene.C], tone: 'ink', fill: true }],
      segments,
      points,
    };
  }, [scene, showAuxiliary]);

  const ratioCard = (label: string, latex: string, value: number, ok: boolean) => (
    <div className={`${styles.metricCard} ${ok ? styles.metricOk : styles.metricBad}`}>
      <span className={styles.metricLabel}>
        <RichText text={label} />
      </span>
      <span className={styles.metricValue}>
        <MathExpr latex={`${latex} = ${value.toFixed(3)}`} />
      </span>
    </div>
  );

  const factRow = (key: keyof typeof FACT_LABELS, holds: boolean) => (
    <li key={key} className={`${styles.factRow} ${holds ? styles.factOk : styles.factBad}`}>
      <span className={styles.factMark} aria-hidden="true">
        {holds ? '✓' : '✕'}
      </span>
      <span className={styles.factLabel}>
        <RichText text={FACT_LABELS[key]} />
      </span>
      <span className={styles.factVerdict}>
        <RichText text={holds ? 'يتحقّق' : 'لا يتحقّق'} />
      </span>
    </li>
  );

  return (
    <div className={styles.root}>
      <div className={styles.workspace}>
        <div className={styles.stage}>
          <FigureSvg spec={figureSpec} ariaLabel={plainTextIsolated(spec.alt)} />
        </div>

        <div className={styles.panel}>
          <div>
            <div className={styles.groupLabel}>نوع المثلث</div>
            <div className={styles.buttonRow} role="group" aria-label="اختيار نوع المثلث">
              {L11_LAB_TRIANGLES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={item.id === triangle.id}
                  className={`${styles.presetBtn} ${item.id === triangle.id ? styles.presetBtnActive : ''}`}
                  onClick={() => setTriangleId(item.id)}
                >
                  <RichText text={item.label} />
                </button>
              ))}
            </div>
          </div>

          <div className={styles.sliderBlock}>
            <label htmlFor={ratioSliderId} className={styles.sliderHeader}>
              <span>
                <RichText text="موضع $M$ على $[AB]$ — النسبة $k = \frac{AM}{AB}$" />
              </span>
              <MathExpr latex={`k = ${ratio.toFixed(3)}`} />
            </label>
            <input
              id={ratioSliderId}
              className={styles.sliderInput}
              type="range"
              min={0.15}
              max={0.9}
              step={0.01}
              value={ratio}
              onChange={(event) => setRatio(Number(event.target.value))}
            />
          </div>

          <div>
            <div className={styles.groupLabel}>حالات سريعة</div>
            <div className={styles.buttonRow}>
              <button
                type="button"
                aria-pressed={atPrintedRatio}
                className={`${styles.presetBtn} ${atPrintedRatio ? styles.presetBtnActive : ''}`}
                onClick={() => setRatio(PRINTED_RATIO)}
              >
                <RichText text="نسبة الكتاب $k = \frac{2}{3}$" />
              </button>
              <button
                type="button"
                aria-pressed={atHalf}
                className={`${styles.presetBtn} ${atHalf ? styles.presetBtnActive : ''}`}
                onClick={() => setRatio(0.5)}
              >
                <RichText text="حالة المنتصفين $k = \frac{1}{2}$" />
              </button>
            </div>
          </div>

          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={showAuxiliary}
              onChange={(event) => setShowAuxiliary(event.target.checked)}
            />
            <span>
              <RichText text="إظهار الإنشاءات المساعدة $I$ و$J$ و$P$ و$R$ و$S$" />
            </span>
          </label>

          <ul className={styles.factList} aria-label="الحالات المطبوعة عند النسبة الحالية">
            {factRow('jMidAN', scene.facts.jMidAN)}
            {factRow('pMidBJ', scene.facts.pMidBJ)}
            {factRow('nMidCJ', scene.facts.nMidCJ)}
            {factRow('thirdsEqual', scene.facts.thirdsEqual)}
            {factRow('bsnmpParallelogram', scene.facts.bsnmpParallelogram)}
          </ul>

          <div
            className={`${styles.verdict} ${atPrintedRatio ? styles.verdictPrinted : ''}`}
            role="status"
          >
            {atPrintedRatio ? (
              <RichText text="هذه هي نسبة الكتاب $k = \frac{2}{3}$: تتحقّق الحالات الخمس كلها، فتُصبح النقاط $J$ و$P$ و$N$ منتصفات، والأجزاء $CS$ و$SR$ و$RB$ متساوية، و$BSNM$ متوازي أضلاع." />
            ) : (
              <RichText text="عند أيّ نسبة غير $\frac{2}{3}$ يبقى $(MN) \parallel (BC)$ و$J$ منتصف $[AN]$ و$BSNM$ متوازي أضلاع، لكن تختلّ الحالات الأخرى: $P$ ليست منتصف $[BJ]$، ولا يتساوى $CS$ و$SR$ و$RB$." />
            )}
          </div>

          <div className={styles.metrics} aria-label="النسب الأربع للشكل الحالي">
            {ratioCard('نسبة القاطع الأول', '\\frac{AM}{AB}', scene.ratios.AM_AB, true)}
            {ratioCard('نسبة القاطع الثاني', '\\frac{AN}{AC}', scene.ratios.AN_AC, true)}
            {ratioCard('نسبة الضلعين المتوازيين', '\\frac{MN}{BC}', scene.ratios.MN_BC, true)}
            {ratioCard(
              'نسبة القاعدة',
              '\\frac{BS}{BC}',
              scene.ratios.BS_BC,
              scene.facts.thirdsEqual,
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
