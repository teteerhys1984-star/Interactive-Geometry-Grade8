import { useId, useMemo, useState } from 'react';
import type { InteractiveDiagram } from '@/content/schema';
import { RichText } from '@/components/math';
import { plainText } from '@/lib/bidi';
import type { FigureSpec, XY } from '@/lib/geometryFigure';
import { FigureSvg } from '../lesson4/FigureSvg';
import { readText } from '../lesson4/params';
import styles from './midline.module.css';

/**
 * ============================================================================
 *  MIDLINE EXPLORER — «مختبر منتصفَي الضلعين»
 * ============================================================================
 *
 *  The page-31 activity asks the student to draw the SAME construction on three
 *  triangles — acute, right-angled and obtuse at A — and to observe what does
 *  not change. A static figure cannot show "what does not change"; this lab
 *  can, because it recomputes M and N from the live triangle instead of storing
 *  pre-drawn positions.
 *
 *  Contract, inherited from the platform's other labs:
 *    • every length shown is COMPUTED from the current coordinates;
 *    • nothing is called a centimetre — the read-out says «وحدات الرسم»;
 *    • the drawing never claims to be to scale: it is a schematic whose
 *      relations are exact;
 *    • malformed params degrade to nothing rather than to a wrong drawing.
 *
 *  The learner moves A on a vertical slider. At the height stored in
 *  `apex.rightAngleY` the angle at A is exactly 90°, so the three cases of the
 *  printed activity are reached by the same control.
 * ============================================================================
 */

interface Preset {
  id: string;
  label: string;
  description: string;
  y: number;
}

interface ApexRange {
  x: number;
  minY: number;
  maxY: number;
  step: number;
  initialY: number;
  rightAngleY: number;
}

interface ExplorerData {
  base: { B: XY; C: XY };
  apex: ApexRange;
  presets: Preset[];
  readout: { mn: string; bc: string; ratio: string; angle: string; apexAngle: string };
  toggleLabel: string;
}

const isPoint = (value: unknown): value is XY =>
  Array.isArray(value) &&
  value.length === 2 &&
  typeof value[0] === 'number' &&
  typeof value[1] === 'number';

const isNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);

/** Validate the params once; `null` means "draw nothing". */
function readData(params: Record<string, unknown>): ExplorerData | null {
  const base = params.base as Record<string, unknown> | undefined;
  const apex = params.apex as Record<string, unknown> | undefined;
  const readout = params.readout as Record<string, unknown> | undefined;
  if (!base || !apex || !readout) return null;
  if (!isPoint(base.B) || !isPoint(base.C)) return null;
  if (
    !isNumber(apex.x) ||
    !isNumber(apex.minY) ||
    !isNumber(apex.maxY) ||
    !isNumber(apex.step) ||
    !isNumber(apex.initialY) ||
    !isNumber(apex.rightAngleY)
  ) {
    return null;
  }
  if (apex.minY >= apex.maxY) return null;

  const presets: Preset[] = Array.isArray(params.presets)
    ? params.presets.flatMap((item) => {
        if (!item || typeof item !== 'object') return [];
        const record = item as Record<string, unknown>;
        if (
          typeof record.id !== 'string' ||
          typeof record.label !== 'string' ||
          typeof record.y !== 'number'
        ) {
          return [];
        }
        return [
          {
            id: record.id,
            label: record.label,
            description: readText(record.description, ''),
            y: record.y,
          },
        ];
      })
    : [];

  return {
    base: { B: base.B, C: base.C },
    apex: {
      x: apex.x,
      minY: apex.minY,
      maxY: apex.maxY,
      step: apex.step,
      initialY: apex.initialY,
      rightAngleY: apex.rightAngleY,
    },
    presets,
    readout: {
      mn: readText(readout.mn, 'طول $MN$'),
      bc: readText(readout.bc, 'طول $BC$'),
      ratio: readText(readout.ratio, 'النسبة $MN/BC$'),
      angle: readText(readout.angle, 'الزاوية'),
      apexAngle: readText(readout.apexAngle, 'قياس الزاوية عند $A$'),
    },
    toggleLabel: readText(params.toggleLabel, 'أظهر متوازي الأضلاع $MBCK$'),
  };
}

const midpoint = (a: XY, b: XY): XY => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
const distance = (a: XY, b: XY): number => Math.hypot(b[0] - a[0], b[1] - a[1]);

const minus = (a: XY, b: XY): XY => [a[0] - b[0], a[1] - b[1]];

/** Angle ABC in degrees, in [0, 180]. */
function angleAt(a: XY, b: XY, c: XY): number {
  const u = minus(a, b);
  const v = minus(c, b);
  const denominator = Math.hypot(u[0], u[1]) * Math.hypot(v[0], v[1]);
  if (denominator === 0) return 0;
  const cosine = Math.max(-1, Math.min(1, (u[0] * v[0] + u[1] * v[1]) / denominator));
  return (Math.acos(cosine) * 180) / Math.PI;
}

/** Angle between two segments, in degrees, folded into [0, 90]. */
function angleBetween(a: XY, b: XY, c: XY, d: XY): number {
  const u = minus(b, a);
  const v = minus(d, c);
  const denominator = Math.hypot(u[0], u[1]) * Math.hypot(v[0], v[1]);
  if (denominator === 0) return 0;
  const cosine = Math.abs((u[0] * v[0] + u[1] * v[1]) / denominator);
  return (Math.acos(Math.max(-1, Math.min(1, cosine))) * 180) / Math.PI;
}

const fmt = (value: number): string => value.toFixed(2);

function buildFigure(
  A: XY,
  B: XY,
  C: XY,
  M: XY,
  N: XY,
  K: XY,
  showParallelogram: boolean,
): FigureSpec {
  const spec: FigureSpec = {
    viewBox: { x: -1.2, y: -2.4, w: 11.4, h: 11 },
    polygons: [{ points: [A, B, C] }],
    segments: [
      { from: A, to: M, ticks: 2, tone: 'mark' },
      { from: M, to: B, ticks: 2, tone: 'mark' },
      { from: A, to: N, ticks: 3, tone: 'mark' },
      { from: N, to: C, ticks: 3, tone: 'mark' },
      { from: B, to: C },
      { from: M, to: N, tone: 'given' },
    ],
    points: [
      { at: A, label: 'A', place: 'n' },
      { at: B, label: 'B', place: 'sw' },
      { at: C, label: 'C', place: 'se' },
      { at: M, label: 'M', place: 'w' },
      { at: N, label: 'N', place: 'e' },
    ],
  };

  if (!showParallelogram) return spec;

  return {
    ...spec,
    polygons: [
      ...(spec.polygons ?? []),
      { points: [M, B, C, K], tone: 'aux', dashed: true, fill: true },
    ],
    segments: [
      ...(spec.segments ?? []),
      { from: N, to: K, dashed: true, tone: 'aux' },
      { from: C, to: K, dashed: true, tone: 'aux' },
    ],
    points: [...(spec.points ?? []), { at: K, label: 'K', place: 'e' }],
  };
}

export function MidlineExplorer({ spec }: { spec: InteractiveDiagram }) {
  const params = useMemo(() => spec.params ?? {}, [spec.params]);
  const data = useMemo(() => readData(params), [params]);
  const [apexY, setApexY] = useState(() => (data ? data.apex.initialY : 0));
  const [showParallelogram, setShowParallelogram] = useState(false);
  const sliderId = useId();

  if (!data) return null;

  const A: XY = [data.apex.x, apexY];
  const M = midpoint(A, data.base.B);
  const N = midpoint(A, data.base.C);
  const K: XY = [2 * N[0] - M[0], 2 * N[1] - M[1]];

  const report = {
    mn: distance(M, N),
    bc: distance(data.base.B, data.base.C),
    ratio: distance(M, N) / distance(data.base.B, data.base.C),
    angle: angleBetween(M, N, data.base.B, data.base.C),
    apex: angleAt(data.base.B, A, data.base.C),
  };

  const drawablePresets = data.presets.filter(
    (preset) => preset.y >= data.apex.minY && preset.y <= data.apex.maxY,
  );

  return (
    <section className={styles.lab} aria-label={plainText(spec.alt)}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>مختبر من إعداد المنصّة</p>
          <h3 className={styles.title}>
            <RichText text={readText(params.title, 'مختبر منتصفَي الضلعين')} />
          </h3>
        </div>
        <span className={styles.caseBadge}>
          <RichText
            text={
              Math.abs(report.apex - 90) < 0.5
                ? 'الزاوية عند $A$ قائمة'
                : report.apex > 90
                  ? 'الزاوية عند $A$ منفرجة'
                  : 'الزاوية عند $A$ حادة'
            }
          />
        </span>
      </header>

      <p className={styles.intro}>
        <RichText text={readText(params.intro, '')} />
      </p>

      <div className={styles.controls}>
        {drawablePresets.length > 0 ? (
          <div className={styles.presets} role="group" aria-label="أوضاع جاهزة">
            {drawablePresets.map((preset) => {
              const active = Math.abs(preset.y - apexY) < data.apex.step / 2;
              return (
                <button
                  key={preset.id}
                  type="button"
                  className={active ? styles.presetActive : styles.preset}
                  aria-pressed={active}
                  onClick={() => setApexY(preset.y)}
                >
                  <span className={styles.presetLabel}>{preset.label}</span>
                  <RichText text={preset.description} />
                </button>
              );
            })}
          </div>
        ) : null}

        <div className={styles.sliderRow}>
          <label className={styles.sliderLabel} htmlFor={sliderId}>
            ارتفاع الرأس <span dir="ltr">A</span> عن القاعدة
          </label>
          <input
            id={sliderId}
            className={styles.slider}
            type="range"
            min={data.apex.minY}
            max={data.apex.maxY}
            step={data.apex.step}
            value={apexY}
            onChange={(event) => setApexY(Number(event.target.value))}
          />
        </div>

        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={showParallelogram}
            onChange={(event) => setShowParallelogram(event.target.checked)}
          />
          <RichText text={data.toggleLabel} />
        </label>
      </div>

      <figure className={styles.figure}>
        <FigureSvg
          spec={buildFigure(A, data.base.B, data.base.C, M, N, K, showParallelogram)}
          ariaLabel={plainText(spec.alt)}
        />
        <figcaption className={styles.caption}>
          رسم تخطيطي غير مقيّس — كل قيمة في الجدول محسوبة من الإحداثيات الحالية.
        </figcaption>
      </figure>

      <dl className={styles.readout}>
        <div className={styles.readoutItem}>
          <dt>
            <RichText text={data.readout.mn} />
          </dt>
          <dd dir="ltr">{fmt(report.mn)}</dd>
        </div>
        <div className={styles.readoutItem}>
          <dt>
            <RichText text={data.readout.bc} />
          </dt>
          <dd dir="ltr">{fmt(report.bc)}</dd>
        </div>
        <div className={`${styles.readoutItem} ${styles.readoutKey}`}>
          <dt>
            <RichText text={data.readout.ratio} />
          </dt>
          <dd dir="ltr">{fmt(report.ratio)}</dd>
        </div>
        <div className={styles.readoutItem}>
          <dt>
            <RichText text={data.readout.angle} />
          </dt>
          <dd dir="ltr">{`${fmt(report.angle)}°`}</dd>
        </div>
        <div className={styles.readoutItem}>
          <dt>
            <RichText text={data.readout.apexAngle} />
          </dt>
          <dd dir="ltr">{`${fmt(report.apex)}°`}</dd>
        </div>
      </dl>

      <p className={styles.footnote}>
        القياسات بوحدات الرسم لا بالسنتيمتر. مهما تحرّك الرأس، تبقى النسبة $MN/BC$ تساوي
        $0.50$ وتبقى الزاوية بين $(MN)$ و$(BC)$ تساوي $0°$ — وهذا ما تثبته المبرهنة.
      </p>
    </section>
  );
}
