import { useId, useMemo, useState } from 'react';
import { FigureSvg } from '@/components/diagram/renderers/lesson4/FigureSvg';
import { Math as MathExpr, RichText } from '@/components/math';
import type { InteractiveDiagram } from '@/content/schema';
import {
  buildSalimScene,
  L9_LAB_TRIANGLES,
  midPoint,
  type ParallelLabPresetId,
} from '@/content/units/lesson-09-geometry';
import { plainTextIsolated } from '@/lib/bidi';
import type { FigureSegment, FigureSpec, XY } from '@/lib/geometryFigure';
import styles from './ParallelMidpointLab.module.css';

function parallelSegments(from: XY, to: XY, tone: 'ink' | 'given' | 'image'): FigureSegment[] {
  const m = midPoint(from, to);
  return [
    { from, to: m, tone, arrow: true },
    { from: m, to, tone },
  ];
}

/**
 * ============================================================================
 *  PARALLEL-FROM-MIDPOINT INTERACTIVE LAB (Lesson 9)
 * ============================================================================
 *
 *  Laptop-first interactive exploration of Salim's activity (page 34) and the
 *  Second Midpoint Theorem across acute, right, and obtuse triangles.
 * ============================================================================
 */
export function ParallelMidpointLab({ spec }: { spec: InteractiveDiagram }) {
  const sliderId = useId();
  const initialDelta =
    typeof spec.params?.initialDeltaDeg === 'number' ? spec.params.initialDeltaDeg : 9;

  const [triangleId, setTriangleId] = useState<ParallelLabPresetId>('acute');
  const [deltaDeg, setDeltaDeg] = useState<number>(initialDelta);
  const [showTrueMidline, setShowTrueMidline] = useState<boolean>(true);

  const triangle = useMemo(
    () => L9_LAB_TRIANGLES.find((item) => item.id === triangleId) ?? L9_LAB_TRIANGLES[0]!,
    [triangleId],
  );

  const scene = useMemo(() => buildSalimScene(triangle, deltaDeg, 0.9), [triangle, deltaDeg]);
  const isParallel = deltaDeg === 0;

  const figureSpec: FigureSpec = useMemo(() => {
    const segments: FigureSegment[] = [
      { from: scene.A, to: scene.M, tone: 'ink', ticks: 2 },
      { from: scene.M, to: scene.B, tone: 'ink', ticks: 2 },
      ...(isParallel
        ? parallelSegments(scene.B, scene.C, 'ink')
        : [{ from: scene.B, to: scene.C, tone: 'ink' as const }]),
    ];

    if (showTrueMidline || isParallel) {
      segments.push(
        { from: scene.A, to: scene.N, tone: 'ink', ticks: 1 },
        { from: scene.N, to: scene.C, tone: 'ink', ticks: 1 },
      );
    } else {
      segments.push({ from: scene.A, to: scene.C, tone: 'ink' });
    }

    if (isParallel) {
      segments.push(
        { from: scene.dPrimeStart, to: scene.M, tone: 'given' },
        ...parallelSegments(scene.M, scene.N, 'given'),
        { from: scene.N, to: scene.dPrimeEnd, tone: 'given' },
      );
    } else {
      if (showTrueMidline) {
        segments.push({
          from: scene.dPrimeStart,
          to: scene.dPrimeEnd,
          tone: 'given',
          dashed: true,
        });
      }
      segments.push({ from: scene.dStart, to: scene.dEnd, tone: 'image' });
    }

    const points: NonNullable<FigureSpec['points']> = [
      { at: scene.A, label: 'A', place: 'n' },
      { at: scene.B, label: 'B', place: 'sw' },
      { at: scene.C, label: 'C', place: 'se' },
      { at: scene.M, label: 'M', place: 'nw', tone: 'given' },
    ];

    if (isParallel) {
      points.push(
        { at: scene.N, label: 'P=N', place: 'ne', tone: 'given' },
        {
          at: scene.dPrimeEnd,
          label: showTrueMidline ? "(d)=(d')" : '(d)',
          place: 'e',
          tone: 'given',
          dot: false,
        },
      );
    } else {
      points.push(
        { at: scene.P, label: 'P', place: deltaDeg > 0 ? 'ne' : 'se', tone: 'image' },
        {
          at: scene.dEnd,
          label: '(d)',
          place: deltaDeg > 0 ? 'n' : 's',
          tone: 'image',
          dot: false,
        },
      );
      if (showTrueMidline) {
        points.push(
          { at: scene.N, label: 'N', place: deltaDeg > 0 ? 'se' : 'ne', tone: 'given' },
          { at: scene.dPrimeEnd, label: "(d')", place: 'e', tone: 'given', dot: false },
        );
      }
    }

    return {
      viewBox: { x: -0.9, y: -0.4, w: 10.6, h: 7.0 },
      polygons: [{ points: [scene.A, scene.B, scene.C], tone: 'ink', fill: true }],
      segments,
      angles:
        triangle.id === 'right'
          ? [{ at: scene.B, from: scene.A, to: scene.C, right: true, tone: 'mark' }]
          : undefined,
      points,
    };
  }, [scene, isParallel, showTrueMidline, deltaDeg, triangle.id]);

  return (
    <div className={styles.root}>
      <div className={styles.workspace}>
        <div className={styles.stage}>
          <FigureSvg spec={figureSpec} ariaLabel={plainTextIsolated(spec.alt)} />
        </div>

        <div className={styles.panel}>
          <div>
            <div className={styles.groupLabel}>حالات سريعة للمقارنة</div>
            <div className={styles.buttonRow}>
              <button
                type="button"
                aria-pressed={deltaDeg === 9}
                className={`${styles.presetBtn} ${deltaDeg === 9 ? styles.presetBtnActive : ''}`}
                onClick={() => setDeltaDeg(9)}
              >
                <RichText text="رسم سليم اليدوي ($P \neq N$)" />
              </button>
              <button
                type="button"
                aria-pressed={isParallel}
                className={`${styles.presetBtn} ${isParallel ? styles.presetBtnActive : ''}`}
                onClick={() => setDeltaDeg(0)}
              >
                <RichText text="توازٍ دقيق ($(d) \parallel (BC)$)" />
              </button>
              <button
                type="button"
                aria-pressed={deltaDeg === -8}
                className={`${styles.presetBtn} ${deltaDeg === -8 ? styles.presetBtnActive : ''}`}
                onClick={() => setDeltaDeg(-8)}
              >
                <RichText text="انحراف لأسفل" />
              </button>
            </div>
          </div>

          <div className={styles.sliderBlock}>
            <label htmlFor={sliderId} className={styles.sliderHeader}>
              <span>
                <RichText text="انحراف المستقيم $(d)$ عن موازاة $[BC]$" />
              </span>
              <MathExpr latex={`${deltaDeg > 0 ? '+' : ''}${deltaDeg}^\\circ`} />
            </label>
            <input
              id={sliderId}
              className={styles.sliderInput}
              type="range"
              min={-12}
              max={12}
              step={1}
              value={deltaDeg}
              onChange={(event) => setDeltaDeg(Number(event.target.value))}
            />
          </div>

          <div>
            <div className={styles.groupLabel}>نوع المثلث</div>
            <div className={styles.buttonRow} role="group" aria-label="اختيار نوع المثلث">
              {L9_LAB_TRIANGLES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={item.id === triangle.id}
                  className={`${styles.presetBtn} ${
                    item.id === triangle.id ? styles.presetBtnActive : ''
                  }`}
                  onClick={() => setTriangleId(item.id)}
                >
                  <RichText text={item.id === 'right' ? 'مثلث قائم في $B$' : item.label} />
                </button>
              ))}
            </div>
          </div>

          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={showTrueMidline}
              onChange={(event) => setShowTrueMidline(event.target.checked)}
            />
            <span>
              <RichText text="إظهار الشكل ③: النقطة $N$ منتصف $[AC]$ والمستقيم $(d')$ المار بـ $M$ و$N$" />
            </span>
          </label>

          <div
            className={`${styles.verdict} ${isParallel ? styles.verdictParallel : ''}`}
            role="status"
          >
            {isParallel ? (
              <RichText text="الحالة الدقيقة: $(d) \parallel (BC)$، فينطبق $(d)$ على $(d')$ وتنطبق $P$ على $N$ منتصف $[AC]$ مهما كان نوع المثلث." />
            ) : (
              <RichText text="بما أنَّ الانحراف لا يساوي $0^\circ$، فالمستقيم $(d)$ لا يوازي $[BC]$ فعلياً؛ لذلك يبتعد عن $(d')$ ولا تقع $P$ في منتصف $[AC]$." />
            )}
          </div>

          <div className={styles.metrics} aria-label="قياسات المقارنة على الضلع الثالث">
            <div className={styles.metricCard}>
              <span className={styles.metricLabel}>
                <RichText text="طولا جزأَي $P$: $AP$ و $PC$" />
              </span>
              <span className={styles.metricValue}>
                <MathExpr
                  latex={`${scene.lengths.AP.toFixed(2)} \\; , \\; ${scene.lengths.PC.toFixed(2)}`}
                />
              </span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricLabel}>
                <RichText text="نصفا الضلع: $AN = NC$" />
              </span>
              <span className={styles.metricValue}>
                <MathExpr latex={scene.lengths.AN.toFixed(2)} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
