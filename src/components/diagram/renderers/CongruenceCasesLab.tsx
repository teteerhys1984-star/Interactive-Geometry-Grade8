import { useState } from 'react';
import type { InteractiveDiagram } from '@/content/schema';
import { LtrIsolate } from '@/components/math';
import styles from './CongruenceCasesLab.module.css';

/**
 * ============================================================================
 *  CONGRUENCE CASES LAB — platform-authored interactive (Lesson 4)
 * ============================================================================
 *
 *  The student picks one of the three congruence cases printed in the lesson
 *  and adjusts its three givens with sliders. TWO triangles are then built
 *  from exactly the same data. Because the construction is deterministic, the
 *  triangles are congruent by construction — which is precisely the point of
 *  each case: three suitable givens determine the whole triangle.
 *
 *  All geometry is computed exactly (law of cosines / angle intersection),
 *  never eyeballed. This renderer draws PLATFORM-AUTHORED figures only and is
 *  never used to claim a reproduction of a printed textbook figure.
 * ============================================================================
 */

type CaseId = 'sas' | 'asa' | 'sss';

const CASES: readonly { id: CaseId; label: string; description: string }[] = [
  {
    id: 'sas',
    label: 'ضلعان والزاوية المحصورة',
    description: 'الحالة الأولى: نعطي طولي ضلعين وقياس الزاوية المحصورة بينهما.',
  },
  {
    id: 'asa',
    label: 'ضلع والزاويتان المجاورتان',
    description: 'الحالة الثانية: نعطي طول ضلع وقياسي الزاويتين المجاورتين له.',
  },
  {
    id: 'sss',
    label: 'الأضلاع الثلاثة',
    description: 'الحالة الثالثة: نعطي أطوال الأضلاع الثلاثة.',
  },
];

const DEG = Math.PI / 180;

interface TriangleData {
  /** Vertices A, B, C in drawing units (y upwards). */
  vertices: [number, number][];
  /** Side lengths a = BC, b = AC, c = AB. */
  sides: [number, number, number];
  /** Angles at A, B, C in degrees. */
  angles: [number, number, number];
}

function buildSas(b: number, c: number, angleA: number): TriangleData {
  const A: [number, number] = [0, 0];
  const B: [number, number] = [c, 0];
  const C: [number, number] = [b * Math.cos(angleA * DEG), b * Math.sin(angleA * DEG)];
  return withMetrics([A, B, C]);
}

function buildAsa(c: number, angleA: number, angleB: number): TriangleData {
  const A: [number, number] = [0, 0];
  const B: [number, number] = [c, 0];
  // Law of sines: AC = AB·sin(B̂)/sin(Ĉ); then C lies on the ray from A at angleA.
  const angleC = 180 - angleA - angleB;
  const b = (c * Math.sin(angleB * DEG)) / Math.sin(angleC * DEG);
  const C: [number, number] = [b * Math.cos(angleA * DEG), b * Math.sin(angleA * DEG)];
  return withMetrics([A, B, C]);
}

function buildSss(a: number, b: number, c: number): TriangleData {
  const A: [number, number] = [0, 0];
  const B: [number, number] = [c, 0];
  const x = (b * b + c * c - a * a) / (2 * c);
  const y = Math.sqrt(Math.max(0, b * b - x * x));
  return withMetrics([A, B, [x, y]]);
}

function distance(p: [number, number], q: [number, number]): number {
  return Math.hypot(q[0] - p[0], q[1] - p[1]);
}

function withMetrics(vertices: [number, number][]): TriangleData {
  const [A, B, C] = vertices as [[number, number], [number, number], [number, number]];
  const a = distance(B, C);
  const b = distance(A, C);
  const c = distance(A, B);
  const angleA = Math.acos((b * b + c * c - a * a) / (2 * b * c)) / DEG;
  const angleB = Math.acos((a * a + c * c - b * b) / (2 * a * c)) / DEG;
  const angleC = 180 - angleA - angleB;
  return { vertices, sides: [a, b, c], angles: [angleA, angleB, angleC] };
}

const round1 = (value: number) => Math.round(value * 10) / 10;

interface SliderSpec {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  unit: 'length' | 'angle';
}

const SLIDERS: Record<CaseId, SliderSpec[]> = {
  sas: [
    { key: 'c', label: 'الضلع الأول', min: 2, max: 5, step: 0.5, unit: 'length' },
    { key: 'b', label: 'الضلع الثاني', min: 2, max: 5, step: 0.5, unit: 'length' },
    { key: 'angleA', label: 'الزاوية المحصورة', min: 25, max: 130, step: 5, unit: 'angle' },
  ],
  asa: [
    { key: 'c', label: 'الضلع المعلوم', min: 3, max: 6, step: 0.5, unit: 'length' },
    { key: 'angleA', label: 'الزاوية الأولى المجاورة', min: 25, max: 95, step: 5, unit: 'angle' },
    { key: 'angleB', label: 'الزاوية الثانية المجاورة', min: 25, max: 95, step: 5, unit: 'angle' },
  ],
  sss: [
    { key: 'a', label: 'الضلع الأول', min: 2.5, max: 5, step: 0.5, unit: 'length' },
    { key: 'b', label: 'الضلع الثاني', min: 2.5, max: 5, step: 0.5, unit: 'length' },
    { key: 'c', label: 'الضلع الثالث', min: 3, max: 6, step: 0.5, unit: 'length' },
  ],
};

const DEFAULTS: Record<CaseId, Record<string, number>> = {
  sas: { c: 4, b: 3, angleA: 50 },
  asa: { c: 4.5, angleA: 55, angleB: 45 },
  sss: { a: 3, b: 4, c: 4.5 },
};

/** Keep ASA angle sums valid and SSS triangle inequality strict. */
function sanitize(caseId: CaseId, values: Record<string, number>): Record<string, number> {
  if (caseId === 'asa') {
    const output = { ...values };
    if (output.angleA! + output.angleB! >= 155) {
      output.angleB = 155 - output.angleA!;
    }
    return output;
  }
  if (caseId === 'sss') {
    const output = { ...values };
    const { a, b, c } = output as { a: number; b: number; c: number };
    // Clamp c so a strict triangle survives every slider position.
    const minC = Math.abs(a - b) + 0.5;
    const maxC = a + b - 0.5;
    output.c = Math.min(Math.max(c, minC), maxC);
    return output;
  }
  return values;
}

function buildTriangle(caseId: CaseId, values: Record<string, number>): TriangleData {
  if (caseId === 'sas') return buildSas(values.b!, values.c!, values.angleA!);
  if (caseId === 'asa') return buildAsa(values.c!, values.angleA!, values.angleB!);
  return buildSss(values.a!, values.b!, values.c!);
}

const LABELS = ['A', 'B', 'C'] as const;

export function CongruenceCasesLab({ spec }: { spec: InteractiveDiagram }) {
  const [caseId, setCaseId] = useState<CaseId>('sas');
  const [values, setValues] = useState<Record<string, number>>(DEFAULTS.sas);

  const activeCase = CASES.find((entry) => entry.id === caseId)!;
  const triangle = buildTriangle(caseId, sanitize(caseId, values));

  // The second triangle is the SAME construction translated to the right —
  // congruent because it is built from the same three givens. Obtuse givens can
  // push a vertex to negative x, so the whole scene is shifted to stay in view.
  const xs = triangle.vertices.map(([x]) => x);
  const minX = Math.min(0, ...xs);
  const maxX = Math.max(...xs);
  const width = maxX - minX;
  const height = Math.max(...triangle.vertices.map(([, y]) => y));
  const gap = 1.6;
  const shift = 0.6 - minX;
  const offsetX = width + gap;
  const viewWidth = offsetX + width + 1.2;
  const viewHeight = height + 1.6;
  const sy = (y: number) => viewHeight - 0.9 - y;

  const pointString = (points: [number, number][], dx: number) =>
    points.map(([x, y]) => `${(x + dx + shift).toFixed(3)},${sy(y).toFixed(3)}`).join(' ');

  function selectCase(next: CaseId) {
    setCaseId(next);
    setValues(DEFAULTS[next]);
  }

  const [a, b, c] = triangle.sides.map(round1) as [number, number, number];
  const [angleA, angleB, angleC] = triangle.angles.map(round1) as [number, number, number];

  return (
    <div className={styles.wrap}>
      <div className={styles.casePicker} role="group" aria-label="اختر حالة التطابق">
        {CASES.map((entry) => (
          <button
            key={entry.id}
            type="button"
            className={caseId === entry.id ? styles.caseActive : styles.caseButton}
            aria-pressed={caseId === entry.id}
            onClick={() => selectCase(entry.id)}
          >
            {entry.label}
          </button>
        ))}
      </div>

      <p className={styles.caseDescription}>{activeCase.description}</p>

      <div className={styles.controls}>
        {SLIDERS[caseId].map((slider) => {
          const value = sanitize(caseId, values)[slider.key]!;
          return (
            <label key={slider.key} className={styles.sliderLabel}>
              <span>{slider.label}</span>
              <span className={styles.value} dir="ltr">
                {slider.unit === 'angle' ? `${value}°` : value}
              </span>
              <input
                type="range"
                min={slider.min}
                max={slider.max}
                step={slider.step}
                value={value}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    [slider.key]: Number(event.target.value),
                  }))
                }
              />
            </label>
          );
        })}
      </div>

      <div className={styles.canvas} dir="ltr">
        <svg
          viewBox={`0 0 ${viewWidth.toFixed(2)} ${viewHeight.toFixed(2)}`}
          className={styles.svg}
          role="img"
          aria-label={spec.alt.replace(/\$([^$]+)\$/g, '$1')}
          preserveAspectRatio="xMidYMid meet"
        >
          <polygon points={pointString(triangle.vertices, 0)} className={styles.firstTriangle} />
          <polygon
            points={pointString(triangle.vertices, offsetX)}
            className={styles.secondTriangle}
          />
          {triangle.vertices.map(([x, y], index) => (
            <g key={`first-${LABELS[index]}`}>
              <circle cx={x + shift} cy={sy(y)} r={0.09} className={styles.firstPoint} />
              <text
                x={x + shift + (index === 2 ? 0.12 : -0.34)}
                y={sy(y) + (index === 2 ? -0.18 : 0.45)}
                className={styles.firstLabel}
              >
                {LABELS[index]}
              </text>
            </g>
          ))}
          {triangle.vertices.map(([x, y], index) => (
            <g key={`second-${LABELS[index]}`}>
              <circle cx={x + offsetX + shift} cy={sy(y)} r={0.09} className={styles.secondPoint} />
              <text
                x={x + offsetX + shift + (index === 2 ? 0.12 : -0.34)}
                y={sy(y) + (index === 2 ? -0.18 : 0.45)}
                className={styles.secondLabel}
              >
                {LABELS[index]}′
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className={styles.readout} role="status">
        <p className={styles.readoutTitle}>
          العناصر الستة خرجت متساوية في المثلثين — حسبناها من المعطيات الثلاثة فقط:
        </p>
        <ul className={styles.metrics}>
          <li>
            الأضلاع: <LtrIsolate>{`${a}, ${b}, ${c}`}</LtrIsolate>
          </li>
          <li>
            الزوايا: <LtrIsolate>{`${angleA}°, ${angleB}°, ${angleC}°`}</LtrIsolate>
          </li>
        </ul>
        <p className={styles.note}>
          مهما غيّرت المنزلقات، يُبنى المثلثان من المعطيات نفسها فيبقيان متطابقين: هذا معنى أن ثلاثة
          معطيات مناسبة «تحدّد» المثلث.
        </p>
      </div>
    </div>
  );
}
