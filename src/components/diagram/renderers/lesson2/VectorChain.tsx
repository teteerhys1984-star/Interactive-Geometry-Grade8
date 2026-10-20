import { useId, useState } from 'react';
import type { InteractiveDiagram } from '@/content/schema';
import {
  distance,
  imageOf,
  isParallelogram,
  midpoint,
  samePoint,
  triangleChain,
  type XY,
} from '@/content/units/lesson-02-geometry';
import { RichText } from '@/components/math';
import styles from './lab.module.css';

/**
 * ============================================================================
 *  VECTOR CHAIN — «سلسلة الانسحابات»
 * ============================================================================
 *  Two configurations of Lesson 2's exercises, both exact:
 *
 *   • `triangle` — exercise ①: E is the image of A under B→C, F the image of E
 *     under C→A, G the image of F under A→B. The three moves cancel, so G lands
 *     back on A; the lab walks the student through that discovery.
 *
 *   • `parallelogram` — exercise ②: a parallelogram ABCD with centre M, and the
 *     three translations the printed questions name. Choosing one draws the
 *     vector and its image, so the student can check an answer on the figure.
 *
 *  The component itself never decides an answer: every point comes from the
 *  parameters through the verified functions in `lesson-02-geometry.ts`.
 * ============================================================================
 */

interface TriangleParams {
  mode: 'triangle';
  a: XY;
  b: XY;
  c: XY;
  captions: string[];
  finalNote: string;
}

interface ParallelogramTask {
  id: string;
  label: string;
  from: XY;
  to: XY;
  applyTo: XY;
  imageLabel: string;
  note: string;
}

interface ParallelogramParams {
  mode: 'parallelogram';
  a: XY;
  b: XY;
  c: XY;
  d: XY;
  tasks: ParallelogramTask[];
}

type Params = TriangleParams | ParallelogramParams;

function asPoint(value: unknown): XY | null {
  if (!Array.isArray(value) || value.length !== 2) return null;
  const [x, y] = value;
  if (typeof x !== 'number' || typeof y !== 'number') return null;
  return [x, y];
}

function readTask(value: unknown): ParallelogramTask | null {
  if (!value || typeof value !== 'object') return null;
  const record = value as Record<string, unknown>;
  const from = asPoint(record.from);
  const to = asPoint(record.to);
  const applyTo = asPoint(record.applyTo);
  if (
    !from ||
    !to ||
    !applyTo ||
    typeof record.id !== 'string' ||
    typeof record.label !== 'string' ||
    typeof record.imageLabel !== 'string' ||
    typeof record.note !== 'string'
  ) {
    return null;
  }
  return {
    id: record.id,
    label: record.label,
    from,
    to,
    applyTo,
    imageLabel: record.imageLabel,
    note: record.note,
  };
}

function readParams(raw: Record<string, unknown>): Params | null {
  if (raw.mode === 'triangle') {
    const a = asPoint(raw.a);
    const b = asPoint(raw.b);
    const c = asPoint(raw.c);
    if (!a || !b || !c) return null;
    return {
      mode: 'triangle',
      a,
      b,
      c,
      captions: Array.isArray(raw.captions)
        ? raw.captions.filter((s): s is string => typeof s === 'string')
        : [],
      finalNote: typeof raw.finalNote === 'string' ? raw.finalNote : '',
    };
  }
  if (raw.mode === 'parallelogram') {
    const a = asPoint(raw.a);
    const b = asPoint(raw.b);
    const c = asPoint(raw.c);
    const d = asPoint(raw.d);
    const tasks = Array.isArray(raw.tasks)
      ? raw.tasks.map(readTask).filter((task): task is ParallelogramTask => task !== null)
      : [];
    if (!a || !b || !c || !d || tasks.length === 0) return null;
    return { mode: 'parallelogram', a, b, c, d, tasks };
  }
  return null;
}

function Arrow({
  from,
  to,
  className,
  marker,
  dash,
}: {
  from: XY;
  to: XY;
  className?: string;
  marker: string;
  dash?: boolean;
}) {
  return (
    <line
      x1={from[0]}
      y1={from[1]}
      x2={to[0]}
      y2={to[1]}
      className={className}
      markerEnd={`url(#${marker})`}
      strokeDasharray={dash ? '5 4' : undefined}
    />
  );
}

export function VectorChain({ spec }: { spec: InteractiveDiagram }) {
  const params = readParams(spec.params);
  const reactId = useId();
  const [step, setStep] = useState(0);
  const [taskId, setTaskId] = useState<string | null>(null);

  if (!params) return null;

  const markerBase = `vc-${reactId.replace(/[^a-zA-Z0-9]/g, '')}`;

  /* ------------------------------------------------------------ triangle */
  if (params.mode === 'triangle') {
    const chain = triangleChain(params.a, params.b, params.c);
    const { a, b, c, e, f, g } = chain;
    const captions = params.captions;
    const last = 3;
    const points = [a, b, c, e, f, g];
    const pad = 0.9;
    const minX = Math.min(...points.map(([x]) => x)) - pad;
    const maxX = Math.max(...points.map(([x]) => x)) + pad;
    const minY = Math.min(...points.map(([, y]) => y)) - pad;
    const maxY = Math.max(...points.map(([, y]) => y)) + pad;
    const sx = (x: number) => x - minX;
    const sy = (y: number) => maxY - y;
    const closedAtStart = samePoint(g, a, 1e-9);

    const moves = [
      { guide: [b, c] as [XY, XY], from: a, to: e, label: 'E' },
      { guide: [c, a] as [XY, XY], from: e, to: f, label: 'F' },
      { guide: [a, b] as [XY, XY], from: f, to: g, label: 'G' },
    ];

    return (
      <div className={styles.lab}>
        <svg
          className={styles.stage}
          viewBox={`0 0 ${(maxX - minX).toFixed(3)} ${(maxY - minY).toFixed(3)}`}
          role="img"
          aria-label={spec.alt.replace(/\$([^$]+)\$/g, '$1')}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <marker
              id={`${markerBase}-a`}
              markerWidth="6"
              markerHeight="6"
              refX="4.4"
              refY="2"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L4.6,2 L0,4 Z" className={styles.arrowHead} />
            </marker>
            <marker
              id={`${markerBase}-b`}
              markerWidth="6"
              markerHeight="6"
              refX="4.4"
              refY="2"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L4.6,2 L0,4 Z" className={styles.arrowHeadInk} />
            </marker>
          </defs>

          <polygon
            points={[a, b, c].map(([x, y]) => `${sx(x)},${sy(y)}`).join(' ')}
            className={styles.shape}
          />
          {step === last && closedAtStart ? (
            <polygon
              points={[e, f, g].map(([x, y]) => `${sx(x)},${sy(y)}`).join(' ')}
              className={styles.shapeImage}
            />
          ) : null}

          {moves.map((move, index) => {
            if (index + 1 > step) return null;
            return (
              <g key={move.label}>
                <Arrow
                  from={[sx(move.guide[0][0]), sy(move.guide[0][1])]}
                  to={[sx(move.guide[1][0]), sy(move.guide[1][1])]}
                  className={styles.vectorDashed}
                  marker={`${markerBase}-b`}
                  dash
                />
                <Arrow
                  from={[sx(move.from[0]), sy(move.from[1])]}
                  to={[sx(move.to[0]), sy(move.to[1])]}
                  className={styles.flow}
                  marker={`${markerBase}-a`}
                />
              </g>
            );
          })}

          {[
            { point: a, label: 'A', tone: 'ink' },
            { point: b, label: 'B', tone: 'ink' },
            { point: c, label: 'C', tone: 'ink' },
          ].map((item) => (
            <g key={item.label}>
              <circle
                cx={sx(item.point[0])}
                cy={sy(item.point[1])}
                r={0.15}
                className={styles.pointInk}
              />
              <text
                x={sx(item.point[0]) - 0.28}
                y={sy(item.point[1]) - 0.28}
                className={`${styles.label} ${styles.labelInk}`}
              >
                {item.label}
              </text>
            </g>
          ))}

          {step >= 1 ? (
            <g data-testid="chain-e" data-x={e[0]} data-y={e[1]}>
              <circle cx={sx(e[0])} cy={sy(e[1])} r={0.17} className={styles.pointImage} />
              <text
                x={sx(e[0]) - 0.3}
                y={sy(e[1]) - 0.3}
                className={`${styles.label} ${styles.labelImage}`}
              >
                E
              </text>
            </g>
          ) : null}
          {step >= 2 ? (
            <g data-testid="chain-f" data-x={f[0]} data-y={f[1]}>
              <circle cx={sx(f[0])} cy={sy(f[1])} r={0.17} className={styles.pointImage} />
              <text
                x={sx(f[0]) - 0.32}
                y={sy(f[1]) + 0.5}
                className={`${styles.label} ${styles.labelImage}`}
              >
                F
              </text>
            </g>
          ) : null}
          {step >= 3 ? (
            <g data-testid="chain-g" data-x={g[0]} data-y={g[1]}>
              <circle cx={sx(g[0])} cy={sy(g[1])} r={0.26} className={styles.pointHalo} />
              <circle cx={sx(g[0])} cy={sy(g[1])} r={0.17} className={styles.pointRing} />
              <text
                x={sx(g[0]) + 0.34}
                y={sy(g[1]) + 0.5}
                className={`${styles.label} ${styles.labelImage}`}
              >
                G
              </text>
            </g>
          ) : null}
        </svg>

        <div className={styles.controls}>
          <p className={styles.controlsTitle}>سلسلة الانسحابات الثلاثة</p>
          <p className={styles.readout} role="status" aria-live="polite">
            <span>
              <RichText text={captions[step] ?? ''} />
            </span>
          </p>
          <div className={styles.buttons}>
            <button
              type="button"
              className={styles.button}
              onClick={() => setStep((current) => Math.max(0, current - 1))}
              disabled={step === 0}
            >
              الخطوة السابقة
            </button>
            <button
              type="button"
              className={styles.button}
              onClick={() => setStep((current) => Math.min(last, current + 1))}
              disabled={step === last}
            >
              الخطوة التالية
            </button>
            <button type="button" className={styles.buttonGhost} onClick={() => setStep(0)}>
              إعادة
            </button>
          </div>
          {step === last && params.finalNote ? (
            <p className={styles.note} data-testid="chain-final">
              <RichText text={params.finalNote} />
            </p>
          ) : null}
          {step === last ? (
            <ul className={styles.legend}>
              <li>
                <span className={`${styles.dot} ${styles.dotImage}`} aria-hidden="true" /> الأشكال
                الصور
              </li>
              <li>
                <span className={`${styles.dot} ${styles.dotInk}`} aria-hidden="true" /> المثلث
                الأصلي
              </li>
            </ul>
          ) : null}
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------- parallelogram */
  const { a, b, c, d, tasks } = params;
  const centre = midpoint(a, c);
  const activeTask = tasks.find((task) => task.id === taskId) ?? null;
  const image = activeTask ? imageOf(activeTask.applyTo, activeTask.from, activeTask.to) : null;
  const points = [a, b, c, d, centre];
  if (image) points.push(image);
  const pad = 0.9;
  const minX = Math.min(...points.map(([x]) => x)) - pad;
  const maxX = Math.max(...points.map(([x]) => x)) + pad;
  const minY = Math.min(...points.map(([, y]) => y)) - pad;
  const maxY = Math.max(...points.map(([, y]) => y)) + pad;
  const sx = (x: number) => x - minX;
  const sy = (y: number) => maxY - y;

  const labels: { point: XY; label: string; tone: 'ink' | 'image' }[] = [
    { point: a, label: 'A', tone: 'ink' },
    { point: b, label: 'B', tone: 'ink' },
    { point: c, label: 'C', tone: 'ink' },
    { point: d, label: 'D', tone: 'ink' },
    { point: centre, label: 'M', tone: 'ink' },
  ];
  if (image && activeTask) {
    const coincides = labels.some((item) => samePoint(item.point, image, 1e-9));
    if (!coincides) labels.push({ point: image, label: activeTask.imageLabel, tone: 'image' });
  }

  const parallelogramCheck = isParallelogram(a, b, c, d, 1e-6);
  const sideLengths = {
    ab: distance(a, b),
    cd: distance(c, d),
    bc: distance(b, c),
    da: distance(d, a),
  };

  return (
    <div className={styles.lab}>
      <svg
        className={styles.stage}
        viewBox={`0 0 ${(maxX - minX).toFixed(3)} ${(maxY - minY).toFixed(3)}`}
        role="img"
        aria-label={spec.alt.replace(/\$([^$]+)\$/g, '$1')}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <marker
            id={`${markerBase}-p`}
            markerWidth="6"
            markerHeight="6"
            refX="4.4"
            refY="2"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L4.6,2 L0,4 Z" className={styles.arrowHead} />
          </marker>
        </defs>

        <polygon
          points={[a, b, c, d].map(([x, y]) => `${sx(x)},${sy(y)}`).join(' ')}
          className={styles.shape}
          data-role="parallelogram"
        />
        <line x1={sx(a[0])} y1={sy(a[1])} x2={sx(c[0])} y2={sy(c[1])} className={styles.diagonal} />
        <line x1={sx(b[0])} y1={sy(b[1])} x2={sx(d[0])} y2={sy(d[1])} className={styles.diagonal} />

        {image ? (
          <circle
            cx={sx(image[0])}
            cy={sy(image[1])}
            r={0.34}
            className={styles.pointHalo}
            data-testid="task-image-halo"
          />
        ) : null}

        {activeTask && image ? (
          <>
            <Arrow
              from={[sx(activeTask.from[0]), sy(activeTask.from[1])]}
              to={[sx(activeTask.to[0]), sy(activeTask.to[1])]}
              className={styles.vector}
              marker={`${markerBase}-p`}
            />
            <line
              x1={sx(activeTask.applyTo[0])}
              y1={sy(activeTask.applyTo[1])}
              x2={sx(image[0])}
              y2={sy(image[1])}
              className={styles.vectorDashed}
              markerEnd={`url(#${markerBase}-p)`}
            />
          </>
        ) : null}

        {labels.map((item, index) => {
          const isImage = item.tone === 'image';
          return (
            <g
              key={`${item.label}-${index}`}
              data-testid={`vertex-${item.label}`}
              data-x={item.point[0]}
              data-y={item.point[1]}
            >
              <circle
                cx={sx(item.point[0])}
                cy={sy(item.point[1])}
                r={isImage ? 0.2 : 0.15}
                className={isImage ? styles.pointImage : styles.pointInk}
              />
              {isImage ? (
                <circle
                  cx={sx(item.point[0])}
                  cy={sy(item.point[1])}
                  r={0.3}
                  className={styles.pointHalo}
                />
              ) : null}
              <text
                x={sx(item.point[0]) + 0.3}
                y={sy(item.point[1]) - 0.28}
                className={`${styles.label} ${isImage ? styles.labelImage : styles.labelInk}`}
              >
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>

      <div className={styles.controls}>
        <p className={styles.controlsTitle}>تحقّق من كل حركة على الرسم</p>
        <div className={styles.buttons}>
          {tasks.map((task) => (
            <button
              key={task.id}
              type="button"
              className={task.id === taskId ? styles.button : styles.buttonGhost}
              aria-pressed={task.id === taskId}
              onClick={() => setTaskId((current) => (current === task.id ? null : task.id))}
            >
              {task.label}
            </button>
          ))}
        </div>
        <p className={styles.readout} role="status" aria-live="polite">
          <span>
            {activeTask ? (
              <RichText text={activeTask.note} />
            ) : (
              'اختر إحدى الحركات الثلاث لترى شعاعها وصورة النقطة المطلوبة.'
            )}
          </span>
          {activeTask && image ? (
            <span className={styles.mono}>
              {activeTask.imageLabel} ({image[0]}, {image[1]})
            </span>
          ) : null}
        </p>
        <p className={styles.note}>
          تحقّق من الرسم: <span className={styles.mono}>AB = CD = {sideLengths.ab.toFixed(2)}</span>{' '}
          و <span className={styles.mono}>BC = DA = {sideLengths.bc.toFixed(2)}</span>
          {parallelogramCheck ? ' — الشكل متوازي أضلاع.' : ''}
        </p>
      </div>
    </div>
  );
}
