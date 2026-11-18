import { useId, useMemo, useState } from 'react';
import { FigureSvg } from '@/components/diagram/renderers/lesson4/FigureSvg';
import { Math as MathExpr, RichText } from '@/components/math';
import type { InteractiveDiagram } from '@/content/schema';
import {
  buildBisectorLabScene,
  L13_SPECIAL_CASES,
  type SpecialCaseId,
} from '@/content/units/lesson-13-geometry';
import { plainTextIsolated } from '@/lib/bidi';
import type { FigureSegment, FigureSpec } from '@/lib/geometryFigure';
import styles from './SideBisectorLab.module.css';

const FACT_LABELS = {
  equidistant: '$MB = MC$ لكلّ موضع للنقطة $M$ على المحور',
  concurrent: 'المحاور الثلاثة تتلاقى في النقطة $O$',
  equalRadii: '$OA = OB = OC$: النقطة $O$ مركز الدائرة المارّة بالرؤوس',
  insideAcute: 'في المثلث الحاد: $O$ داخل المثلث',
  outsideObtuse: 'في المثلث المنفرج في $\\widehat{A}$: $O$ خارج المثلث',
  onSideRight: 'في المثلث القائم في $\\widehat{A}$: $O$ منتصف الوتر $[BC]$',
} as const;

const POSITION_LABELS: Record<'inside' | 'outside' | 'on-side', string> = {
  inside: 'داخل المثلث',
  outside: 'خارج المثلث',
  'on-side': 'على الوتر $[BC]$',
};

/**
 * ============================================================================
 *  SIDE-BISECTOR LAB (Unit 3, Lesson 1 — pages 53–55)
 * ============================================================================
 *
 *  The page-54 activity, made dynamic. `M` slides along the bisector of `[BC]`
 *  of a triangle that is never a special case, and two things are watched:
 *
 *    • `MB = MC` does not budge: that is the PROPERTY of the bisector (page 54),
 *      and it is the reason the point of the bisector can be recognised;
 *    • `O`, where the three bisectors meet, does not budge either, and it is the
 *      centre of the circle through the vertices (page 55) — but where that
 *      centre sits depends on the triangle: inside, outside, or on the
 *      hypotenuse. The three printed panels are the three presets below.
 *
 *  Every number shown is recomputed from `lesson-13-geometry.ts`; the lab adds
 *  no geometry of its own and draws through the shared FigureSvg.
 * ============================================================================
 */
export function SideBisectorLab({ spec }: { spec: InteractiveDiagram }) {
  const sliderId = useId();
  const initialT = typeof spec.params?.initialT === 'number' ? spec.params.initialT : 1.6;

  const [presetId, setPresetId] = useState<SpecialCaseId>('acute');
  const [t, setT] = useState<number>(initialT);
  const [showCircle, setShowCircle] = useState<boolean>(true);

  const triangle = useMemo(
    () => L13_SPECIAL_CASES.find((item) => item.id === presetId) ?? L13_SPECIAL_CASES[0]!,
    [presetId],
  );

  const scene = useMemo(() => buildBisectorLabScene(triangle, t), [triangle, t]);

  const figureSpec: FigureSpec = useMemo(() => {
    const segments: FigureSegment[] = [
      { from: scene.A, to: scene.B, tone: 'ink' },
      { from: scene.B, to: scene.C, tone: 'ink' },
      { from: scene.C, to: scene.A, tone: 'ink' },
      ...scene.bisectors.map((line) => ({ from: line.from, to: line.to, tone: 'given' as const })),
      { from: scene.M, to: scene.B, tone: 'image' },
      { from: scene.M, to: scene.C, tone: 'image' },
    ];

    return {
      viewBox: { x: -1, y: -1, w: 12, h: 10 },
      circles: showCircle
        ? [{ at: scene.O, r: scene.R, tone: 'aux' as const, dashed: true }]
        : [],
      segments,
      points: [
        { at: scene.A, label: 'A', place: 'n' },
        { at: scene.B, label: 'B', place: 'sw' },
        { at: scene.C, label: 'C', place: 'se' },
        { at: scene.foot, label: 'I', place: 's', tone: 'aux' },
        { at: scene.O, label: 'O', place: 'e', tone: 'aux' },
        { at: scene.M, label: 'M', place: 'w', tone: 'image' },
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
            <div className={styles.groupLabel}>نوع المثلث</div>
            <div className={styles.buttonRow} role="group" aria-label="اختيار نوع المثلث">
              {L13_SPECIAL_CASES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={item.id === triangle.id}
                  className={`${styles.presetBtn} ${item.id === triangle.id ? styles.presetBtnActive : ''}`}
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
                <RichText text={'موضع $M$ على محور $[BC]$'} />
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
              <RichText text={'إظهار الدائرة المارّة بالرؤوس الثلاثة'} />
            </span>
          </label>

          <div className={styles.metrics} aria-label="المسافات من النقطة المتحرّكة">
            {metricCard('$MB$', `MB = ${scene.MB.toFixed(3)}`)}
            {metricCard('$MC$', `MC = ${scene.MC.toFixed(3)}`)}
          </div>

          <ul className={styles.factList} aria-label="ما يتحقّق عند الموضع الحالي">
            {factRow('equidistant', scene.equidistant)}
            {factRow('concurrent', scene.concurrent)}
            {factRow('equalRadii', scene.equalRadii)}
          </ul>

          <div className={`${styles.verdict} ${styles.verdictPrinted}`} role="status">
            <RichText
              text={
                scene.equidistant
                  ? `النقطة $M$ على محور $[BC]$، لذلك $MB = MC$؛ وموضع $O$ في هذا المثلث: ${POSITION_LABELS[scene.position]}.`
                  : 'النقطة $M$ ليست على محور $[BC]$، فلا يلزم أن يتساوى $MB$ و$MC$ — وهذا هو الاتجاه العكسي لخاصّة المحور.'
              }
            />
          </div>

          {!scene.equidistant ? null : (
            <ul className={styles.factList} aria-label="موضع النقطة O في هذا المثلث">
              {factRow('insideAcute', scene.position === 'inside')}
              {factRow('outsideObtuse', scene.position === 'outside')}
              {factRow('onSideRight', scene.position === 'on-side')}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
