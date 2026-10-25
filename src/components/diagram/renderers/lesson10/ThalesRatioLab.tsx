import { useId, useMemo, useState } from 'react';
import { FigureSvg } from '@/components/diagram/renderers/lesson4/FigureSvg';
import { Math as MathExpr, RichText } from '@/components/math';
import type { InteractiveDiagram } from '@/content/schema';
import {
  buildThalesScene,
  L10_LAB_TRIANGLES,
  midPoint,
  type ThalesPresetId,
} from '@/content/units/lesson-10-geometry';
import { plainTextIsolated } from '@/lib/bidi';
import type { FigureSegment, FigureSpec, XY } from '@/lib/geometryFigure';
import styles from './ThalesRatioLab.module.css';

/** Split a side at its midpoint so `arrow: true` paints a parallel chevron. */
function parallelSegments(from: XY, to: XY, tone: 'ink' | 'given'): FigureSegment[] {
  const m = midPoint(from, to);
  return [
    { from, to: m, tone, arrow: true },
    { from: m, to, tone },
  ];
}

/**
 * ============================================================================
 *  THALES EQUAL-RATIO INTERACTIVE LAB (Unit 2, Lesson 3 — pages 36–38)
 * ============================================================================
 *
 *  Laptop-first interactive counterpart of the page-36 discovery activity.
 *  The student moves M along [AB] (ratio slider) and tilts the line through M
 *  away from the true parallel to [BC]. At zero tilt the intersection P is N
 *  and the three ratios AM/AB = AN/AC = MN/BC are exactly equal; any tilt
 *  breaks the proportionality, answering activity question 2 empirically.
 * ============================================================================
 */
export function ThalesRatioLab({ spec }: { spec: InteractiveDiagram }) {
  const ratioSliderId = useId();
  const tiltSliderId = useId();
  const initialRatio =
    typeof spec.params?.initialRatio === 'number' ? spec.params.initialRatio : 0.4;
  const initialTilt =
    typeof spec.params?.initialTiltDeg === 'number' ? spec.params.initialTiltDeg : 0;

  const [triangleId, setTriangleId] = useState<ThalesPresetId>('acute');
  const [ratio, setRatio] = useState<number>(initialRatio);
  const [tiltDeg, setTiltDeg] = useState<number>(initialTilt);
  const [showTrueParallel, setShowTrueParallel] = useState<boolean>(true);

  const triangle = useMemo(
    () => L10_LAB_TRIANGLES.find((item) => item.id === triangleId) ?? L10_LAB_TRIANGLES[0]!,
    [triangleId],
  );

  const scene = useMemo(
    () => buildThalesScene(triangle, ratio, tiltDeg),
    [triangle, ratio, tiltDeg],
  );
  const isParallel = tiltDeg === 0;
  const ratiosAgree =
    Math.abs(scene.ratios.AM_AB - scene.ratios.AN_AC) < 1e-9 &&
    Math.abs(scene.ratios.AM_AB - scene.ratios.MN_BC) < 1e-9;

  const figureSpec: FigureSpec = useMemo(() => {
    const segments: FigureSegment[] = [
      // Outer triangle ABC.
      { from: scene.A, to: scene.B, tone: 'ink' },
      { from: scene.A, to: scene.C, tone: 'ink' },
      ...parallelSegments(scene.B, scene.C, 'ink'),
      // Small-triangle sides up to the moving section points.
      { from: scene.A, to: scene.M, tone: 'given' },
      { from: scene.A, to: scene.N, tone: 'given', dashed: !isParallel },
    ];

    if (isParallel) {
      segments.push(...parallelSegments(scene.M, scene.N, 'given'));
    } else {
      if (showTrueParallel) {
        segments.push(
          ...parallelSegments(scene.M, scene.N, 'given').map((seg) => ({ ...seg, dashed: true })),
        );
      }
      // The free (tilted) line through M meeting [AC] at P ≠ N.
      segments.push({ from: scene.M, to: scene.P, tone: 'image' });
    }

    const points: NonNullable<FigureSpec['points']> = [
      { at: scene.A, label: 'A', place: 'n' },
      { at: scene.B, label: 'B', place: 'sw' },
      { at: scene.C, label: 'C', place: 'se' },
      { at: scene.M, label: 'M', place: 'nw', tone: 'given' },
      { at: scene.N, label: 'N', place: isParallel ? 'ne' : 'se', tone: 'given' },
    ];

    if (!isParallel) {
      points.push({ at: scene.P, label: 'P', place: 'ne', tone: 'image' });
    }

    return {
      viewBox: { x: -0.7, y: -0.6, w: 9.6, h: 7.2 },
      polygons: [{ points: [scene.A, scene.B, scene.C], tone: 'ink', fill: true }],
      segments,
      points,
    };
  }, [scene, isParallel, showTrueParallel]);

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
              {L10_LAB_TRIANGLES.map((item) => (
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
                <RichText text="موضع النقطة $M$ على $[AB]$ — النسبة المشتركة $k$" />
              </span>
              <MathExpr latex={`k = ${ratio.toFixed(2)}`} />
            </label>
            <input
              id={ratioSliderId}
              className={styles.sliderInput}
              type="range"
              min={0.1}
              max={0.9}
              step={0.05}
              value={ratio}
              onChange={(event) => setRatio(Number(event.target.value))}
            />
          </div>

          <div className={styles.sliderBlock}>
            <label htmlFor={tiltSliderId} className={styles.sliderHeader}>
              <span>
                <RichText text="إمالة المستقيم المار بـ $M$ عن موازاة $[BC]$" />
              </span>
              <MathExpr latex={`${tiltDeg > 0 ? '+' : ''}${tiltDeg}^\\circ`} />
            </label>
            <input
              id={tiltSliderId}
              className={styles.sliderInput}
              type="range"
              min={-15}
              max={15}
              step={1}
              value={tiltDeg}
              onChange={(event) => setTiltDeg(Number(event.target.value))}
            />
          </div>

          <div>
            <div className={styles.groupLabel}>حالات سريعة</div>
            <div className={styles.buttonRow}>
              <button
                type="button"
                aria-pressed={tiltDeg === -10}
                className={`${styles.presetBtn} ${tiltDeg === -10 ? styles.presetBtnActive : ''}`}
                onClick={() => setTiltDeg(-10)}
              >
                <RichText text="إمالة $-10^\circ$" />
              </button>
              <button
                type="button"
                aria-pressed={isParallel}
                className={`${styles.presetBtn} ${isParallel ? styles.presetBtnActive : ''}`}
                onClick={() => setTiltDeg(0)}
              >
                <RichText text="توازٍ دقيق ($(MN) \parallel (BC)$)" />
              </button>
              <button
                type="button"
                aria-pressed={tiltDeg === 10}
                className={`${styles.presetBtn} ${tiltDeg === 10 ? styles.presetBtnActive : ''}`}
                onClick={() => setTiltDeg(10)}
              >
                <RichText text="إمالة $+10^\circ$" />
              </button>
            </div>
          </div>

          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={showTrueParallel}
              onChange={(event) => setShowTrueParallel(event.target.checked)}
            />
            <span>
              <RichText text="إظهار الموازي الحقيقي $(MN)$ متقطّعاً عند الإمالة" />
            </span>
          </label>

          <div
            className={`${styles.verdict} ${isParallel ? styles.verdictParallel : ''}`}
            role="status"
          >
            {isParallel ? (
              <RichText text="الحالة الدقيقة: $(MN) \parallel (BC)$، فتتساوى النسب الثلاث $\frac{AM}{AB}=\frac{AN}{AC}=\frac{MN}{BC}=k$ والجدول جدول تناسب مهما كان نوع المثلث." />
            ) : (
              <RichText text="بما أنَّ المستقيم المار بـ $M$ لا يوازي $[BC]$، فإنه يلقى $[AC]$ في $P \neq N$، وتختلّ النسبة $\frac{AP}{AC}$ عن $k$؛ الجدول إذن ليس جدول تناسب." />
            )}
          </div>

          <div className={styles.metrics} aria-label="النسب الأربع للشكل الحالي">
            {ratioCard('النسبة المرجعية', '\\frac{AM}{AB}', scene.ratios.AM_AB, true)}
            {ratioCard('نسبة القاطع الثاني', '\\frac{AN}{AC}', scene.ratios.AN_AC, ratiosAgree)}
            {ratioCard(
              'نسبة الضلعين المتوازيين',
              '\\frac{MN}{BC}',
              scene.ratios.MN_BC,
              ratiosAgree,
            )}
            {ratioCard(
              'نسبة نقطة التقاطع الفعلية',
              '\\frac{AP}{AC}',
              scene.ratios.AP_AC,
              isParallel,
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
