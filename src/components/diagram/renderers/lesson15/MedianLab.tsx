import { useId, useMemo, useState } from 'react';
import { FigureSvg } from '@/components/diagram/renderers/lesson4/FigureSvg';
import { Math as MathExpr, RichText } from '@/components/math';
import type { InteractiveDiagram } from '@/content/schema';
import {
  buildMedianLabScene,
  L15_PROPERTIES_TRIANGLE,
  L15_TEST_ABC,
  L15_TEST_EFJ_TRIANGLE,
  type Triangle,
} from '@/content/units/lesson-15-geometry';
import { plainTextIsolated } from '@/lib/bidi';
import type { FigureSegment, FigureSpec } from '@/lib/geometryFigure';
import styles from './MedianLab.module.css';

const FACT_LABELS = {
  concurrent: 'المتوسطات الثلاثة تتلاقى في النقطة $G$',
  twoThirds: "$AG = \\frac{2}{3}AA'$ وكذلك $BG$ و$CG$ (مركز الثقل)",
} as const;

const PRESETS: { id: string; label: string; triangle: Triangle }[] = [
  { id: 'scalene', label: 'مثلث مختلف الأضلاع', triangle: L15_PROPERTIES_TRIANGLE },
  { id: 'acute', label: 'مثلث حاد الزوايا', triangle: L15_TEST_ABC },
  { id: 'flat', label: 'مثلث منفرج', triangle: L15_TEST_EFJ_TRIANGLE },
];

/**
 * ============================================================================
 *  MEDIAN LAB (Unit 3, Lesson 3 — pages 59–61)
 * ============================================================================
 *
 *  The page-59 activity and the page-60 property, made dynamic. Whatever the
 *  triangle, the three medians meet at the centroid G, and G divides each
 *  median in the ratio 2:1 from the vertex (AG = (2/3)AA'). Every number shown
 *  is recomputed from `lesson-15-geometry.ts`; the lab draws through FigureSvg.
 * ============================================================================
 */
export function MedianLab({ spec }: { spec: InteractiveDiagram }) {
  const sliderId = useId();
  const initialT = typeof spec.params?.initialT === 'number' ? spec.params.initialT : 0;

  const [presetId, setPresetId] = useState<string>('scalene');
  const [t, setT] = useState<number>(initialT);

  const preset = useMemo(
    () => PRESETS.find((item) => item.id === presetId) ?? PRESETS[0]!,
    [presetId],
  );

  const triangle: Triangle = useMemo(
    () => ({
      A: [preset.triangle.A[0] + t, preset.triangle.A[1]],
      B: preset.triangle.B,
      C: preset.triangle.C,
    }),
    [preset, t],
  );

  const scene = useMemo(() => buildMedianLabScene(triangle), [triangle]);

  const figureSpec: FigureSpec = useMemo(() => {
    const segments: FigureSegment[] = [
      { from: scene.A, to: scene.B, tone: 'ink' },
      { from: scene.B, to: scene.C, tone: 'ink' },
      { from: scene.C, to: scene.A, tone: 'ink' },
      ...scene.spans.map((s) => ({ from: s.from, to: s.to, tone: 'given' as const })),
    ];
    return {
      viewBox: { x: -2, y: -1, w: 13, h: 9 },
      segments,
      points: [
        { at: scene.A, label: 'A', place: 'n' },
        { at: scene.B, label: 'B', place: 'sw' },
        { at: scene.C, label: 'C', place: 'se' },
        { at: scene.feet.A, label: "A'", place: 's', tone: 'aux' },
        { at: scene.feet.B, label: "B'", place: 'ne', tone: 'aux' },
        { at: scene.feet.C, label: "C'", place: 'nw', tone: 'aux' },
        { at: scene.G, label: 'G', place: 'e', tone: 'image' },
      ],
    };
  }, [scene]);

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

  const metricCard = (label: string, latex: string) => (
    <div key={label} className={`${styles.metricCard} ${styles.metricOk}`}>
      <span className={styles.metricLabel}>
        <RichText text={label} />
      </span>
      <span className={styles.metricValue}>
        <MathExpr latex={latex} />
      </span>
    </div>
  );

  return (
    <div className={styles.root}>
      <div className={styles.workspace}>
        <div className={styles.stage}>
          <FigureSvg spec={figureSpec} ariaLabel={plainTextIsolated(spec.alt)} />
        </div>

        <div className={styles.panel}>
          <div>
            <div className={styles.groupLabel}>شكل المثلث</div>
            <div className={styles.buttonRow} role="group" aria-label="اختيار شكل المثلث">
              {PRESETS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={item.id === preset.id}
                  className={`${styles.presetBtn} ${item.id === preset.id ? styles.presetBtnActive : ''}`}
                  onClick={() => setPresetId(item.id)}
                >
                  <RichText text={item.label} />
                </button>
              ))}
            </div>
          </div>

          <div className={styles.sliderBlock}>
            <label htmlFor={sliderId} className={styles.sliderHeader}>
              <span>
                <RichText text={'إزاحة الرأس $A$ أفقيًا (تحريك المثلث)'} />
              </span>
              <MathExpr latex={`t = ${t.toFixed(2)}`} />
            </label>
            <input
              id={sliderId}
              className={styles.sliderInput}
              type="range"
              min={-2.6}
              max={2.6}
              step={0.05}
              value={t}
              onChange={(event) => setT(Number(event.target.value))}
            />
          </div>

          <div className={styles.metrics} aria-label="أجزاء المتوسطات من الرؤوس إلى مركز الثقل">
            {metricCard('$AG$', `AG = ${scene.vertexParts.AG.toFixed(3)}`)}
            {metricCard('$BG$', `BG = ${scene.vertexParts.BG.toFixed(3)}`)}
            {metricCard('$CG$', `CG = ${scene.vertexParts.CG.toFixed(3)}`)}
          </div>

          <ul className={styles.factList} aria-label="ما يتحقّق عند الموضع الحالي">
            {factRow('concurrent', scene.concurrent)}
            {factRow('twoThirds', scene.twoThirds)}
          </ul>

          <div className={`${styles.verdict} ${styles.verdictPrinted}`} role="status">
            <RichText
              text={`المتوسطات الثلاثة تتلاقى في $G$ مركز ثقل المثلث، وتقع $G$ في نهاية الثلث الثاني من كلّ متوسط بدءًا من الرأس: $AG = \\frac{2}{3}AA'$.`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
