import { useId, useMemo, useState } from 'react';
import { FigureSvg } from '@/components/diagram/renderers/lesson4/FigureSvg';
import { Math as MathExpr, RichText } from '@/components/math';
import type { InteractiveDiagram } from '@/content/schema';
import {
  buildBisectorLabScene,
  L16_PROPERTIES_TRIANGLE,
  L16_TEST_ABC,
  L16_TEST_EFJ_TRIANGLE,
  type Triangle,
} from '@/content/units/lesson-16-geometry';
import { plainTextIsolated } from '@/lib/bidi';
import type { FigureSegment, FigureSpec } from '@/lib/geometryFigure';
import styles from './AngleBisectorLab.module.css';

const FACT_LABELS = {
  concurrent: 'المنصّفات الثلاثة تتلاقى في النقطة $I$',
  bisects: 'كلّ منصّف يقسم زاويته إلى زاويتين متساويتين',
  equidistant: '$I$ تبعد بالمسافة نفسها عن الأضلاع الثلاثة (مركز الدائرة الداخلية)',
} as const;

const PRESETS: { id: string; label: string; triangle: Triangle }[] = [
  { id: 'scalene', label: 'مثلث مختلف الأضلاع', triangle: L16_PROPERTIES_TRIANGLE },
  { id: 'acute', label: 'مثلث حاد الزوايا', triangle: L16_TEST_ABC },
  { id: 'flat', label: 'مثلث منفرج', triangle: L16_TEST_EFJ_TRIANGLE },
];

/**
 * ============================================================================
 *  ANGLE-BISECTOR LAB (Unit 3, Lesson 4 — pages 62–63)
 * ============================================================================
 *
 *  The page-62 activity and the page-63 property, made dynamic. Whatever the
 *  triangle, the three internal bisectors meet at the incenter I, equidistant
 *  from the three sides; the incircle centered at I is tangent to all three.
 *  Every number shown is recomputed from `lesson-16-geometry.ts`; the lab draws
 *  through FigureSvg.
 * ============================================================================
 */
export function AngleBisectorLab({ spec }: { spec: InteractiveDiagram }) {
  const sliderId = useId();
  const initialT = typeof spec.params?.initialT === 'number' ? spec.params.initialT : 0;

  const [presetId, setPresetId] = useState<string>('scalene');
  const [t, setT] = useState<number>(initialT);
  const [showCircle, setShowCircle] = useState<boolean>(true);

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

  const scene = useMemo(() => buildBisectorLabScene(triangle), [triangle]);

  const figureSpec: FigureSpec = useMemo(() => {
    const segments: FigureSegment[] = [
      { from: scene.A, to: scene.B, tone: 'ink' },
      { from: scene.B, to: scene.C, tone: 'ink' },
      { from: scene.C, to: scene.A, tone: 'ink' },
      ...scene.spans.map((s) => ({ from: s.from, to: s.to, tone: 'given' as const })),
    ];
    return {
      viewBox: { x: -2, y: -1, w: 13, h: 9 },
      circles: showCircle
        ? [{ at: scene.circle.center, r: scene.circle.radius, tone: 'aux' as const, dashed: true }]
        : [],
      segments,
      points: [
        { at: scene.A, label: 'A', place: 'n' },
        { at: scene.B, label: 'B', place: 'sw' },
        { at: scene.C, label: 'C', place: 'se' },
        { at: scene.I, label: 'I', place: 'e', tone: 'image' },
      ],
    };
  }, [scene, showCircle]);

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

          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={showCircle}
              onChange={(event) => setShowCircle(event.target.checked)}
            />
            <span>
              <RichText text={'إظهار الدائرة الماسة لأضلاع المثلث داخلاً'} />
            </span>
          </label>

          <div className={styles.metrics} aria-label="بعد مركز الدائرة الداخلية عن الأضلاع">
            {metricCard('بعد عن $[BC]$', `d = ${scene.sideDistances.BC.toFixed(3)}`)}
            {metricCard('بعد عن $[CA]$', `d = ${scene.sideDistances.CA.toFixed(3)}`)}
            {metricCard('بعد عن $[AB]$', `d = ${scene.sideDistances.AB.toFixed(3)}`)}
          </div>

          <ul className={styles.factList} aria-label="ما يتحقّق عند الموضع الحالي">
            {factRow('concurrent', scene.concurrent)}
            {factRow('bisects', scene.bisects)}
            {factRow('equidistant', scene.equidistant)}
          </ul>

          <div className={`${styles.verdict} ${styles.verdictPrinted}`} role="status">
            <RichText
              text={`المنصّفات الثلاثة تتلاقى في $I$، وهي مركز الدائرة الماسة لأضلاع المثلث داخلاً؛ المسافات الثلاث إلى الأضلاع متساوية وتساوي نصف قطر هذه الدائرة.`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
