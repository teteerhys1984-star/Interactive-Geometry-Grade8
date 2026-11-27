import { useId, useMemo, useState } from 'react';
import { FigureSvg } from '@/components/diagram/renderers/lesson4/FigureSvg';
import { Math as MathExpr, RichText } from '@/components/math';
import type { InteractiveDiagram } from '@/content/schema';
import {
  buildAltitudeLabScene,
  L14_CASES,
  type AltitudeCaseId,
  type Triangle,
} from '@/content/units/lesson-14-geometry';
import { plainTextIsolated } from '@/lib/bidi';
import type { FigureSegment, FigureSpec } from '@/lib/geometryFigure';
import styles from './AltitudeLab.module.css';

const FACT_LABELS = {
  concurrent: 'الارتفاعات الثلاثة تتلاقى في النقطة $H$',
  inside: 'في المثلث الحاد: $H$ داخل المثلث',
  outside: 'في المثلث المنفرج: $H$ خارج المثلث',
  vertex: 'في المثلث القائم: $H$ عند رأس الزاوية القائمة',
} as const;

const POSITION_LABELS: Record<'inside' | 'outside' | 'vertex', string> = {
  inside: 'داخل المثلث',
  outside: 'خارج المثلث',
  vertex: 'عند رأس الزاوية القائمة',
};

/**
 * ============================================================================
 *  ALTITUDE LAB (Unit 3, Lesson 2 — pages 56–58)
 * ============================================================================
 *
 *  The page-56 activity and the page-57 property, made dynamic. Whatever the
 *  triangle, the three altitudes always meet at one point H; where H sits
 *  depends on the triangle (inside, outside, or at the right-angle vertex).
 *  The three printed panels are the three presets. Every number shown is
 *  recomputed from `lesson-14-geometry.ts`; the lab draws through FigureSvg.
 * ============================================================================
 */
export function AltitudeLab({ spec }: { spec: InteractiveDiagram }) {
  const sliderId = useId();
  const initialT = typeof spec.params?.initialT === 'number' ? spec.params.initialT : 0;

  const [presetId, setPresetId] = useState<AltitudeCaseId>('acute');
  const [t, setT] = useState<number>(initialT);

  const preset = useMemo(
    () => L14_CASES.find((item) => item.id === presetId) ?? L14_CASES[0]!,
    [presetId],
  );

  // The slider raises/lowers the apex A, morphing the triangle so the student
  // watches H cross from inside to outside while concurrence never breaks.
  const triangle: Triangle = useMemo(
    () => ({ A: [preset.A[0], preset.A[1] + t], B: preset.B, C: preset.C }),
    [preset, t],
  );

  const scene = useMemo(() => buildAltitudeLabScene(triangle), [triangle]);

  const figureSpec: FigureSpec = useMemo(() => {
    const segments: FigureSegment[] = [
      { from: scene.A, to: scene.B, tone: 'ink' },
      { from: scene.B, to: scene.C, tone: 'ink' },
      { from: scene.C, to: scene.A, tone: 'ink' },
      ...scene.spans.map((s) => ({ from: s.from, to: s.to, tone: 'given' as const })),
    ];
    return {
      viewBox: { x: -2, y: -3, w: 13, h: 13 },
      segments,
      points: [
        { at: scene.A, label: 'A', place: 'n' },
        { at: scene.B, label: 'B', place: 'sw' },
        { at: scene.C, label: 'C', place: 'se' },
        { at: scene.H, label: 'H', place: 'ne', tone: 'image' },
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
            <div className={styles.groupLabel}>نوع المثلث</div>
            <div className={styles.buttonRow} role="group" aria-label="اختيار نوع المثلث">
              {L14_CASES.map((item) => (
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
                <RichText text={'ارتفاع الرأس $A$ (تحريك المثلث)'} />
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

          <div className={styles.metrics} aria-label="المسافات من مركز التعامد إلى الرؤوس">
            {metricCard('$HA$', `HA = ${scene.HA.toFixed(3)}`)}
            {metricCard('$HB$', `HB = ${scene.HB.toFixed(3)}`)}
            {metricCard('$HC$', `HC = ${scene.HC.toFixed(3)}`)}
          </div>

          <ul className={styles.factList} aria-label="ما يتحقّق عند الموضع الحالي">
            {factRow('concurrent', scene.concurrent)}
          </ul>

          <div className={`${styles.verdict} ${styles.verdictPrinted}`} role="status">
            <RichText
              text={`الارتفاعات الثلاثة تتلاقى في $H$، وموضع $H$ في هذا المثلث: ${POSITION_LABELS[scene.position]}.`}
            />
          </div>

          <ul className={styles.factList} aria-label="موضع النقطة H في هذا المثلث">
            {factRow('inside', scene.position === 'inside')}
            {factRow('outside', scene.position === 'outside')}
            {factRow('vertex', scene.position === 'vertex')}
          </ul>
        </div>
      </div>
    </div>
  );
}
