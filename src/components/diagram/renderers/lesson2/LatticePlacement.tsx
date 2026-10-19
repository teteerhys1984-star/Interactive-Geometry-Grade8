import { useState } from 'react';
import type { InteractiveDiagram } from '@/content/schema';
import { RichText } from '@/components/math';
import styles from './lab.module.css';

/**
 * ============================================================================
 *  LATTICE PLACEMENT — «ضع النقطة على الشبكة»
 * ============================================================================
 *  A squared sheet the student works on directly. Each task asks for one
 *  point; the student clicks a node or types its column and row, and the lab
 *  answers with the *method* («عدّ من A إلى B …») rather than the result.
 *  The result appears only when the student lands on it, or after repeated
 *  attempts when they explicitly ask for the solution.
 *
 *  Answers never enter the rendered text until that happens, so the printed
 *  exercises stay exercises. The pure answers live in
 *  `lesson-02-geometry.ts`, where the test suite verifies them.
 * ============================================================================
 */

interface SheetPoint {
  x: number;
  y: number;
  label?: string;
  tone?: 'ink' | 'mark';
}

interface SheetSegment {
  from: readonly [number, number];
  to: readonly [number, number];
  dashed?: boolean;
}

interface Task {
  id: string;
  prompt: string;
  label: string;
  answer: { x: number; y: number };
  hint: string;
  success: string;
  revealAfter?: number;
}

interface Extend {
  left: number;
  right: number;
  bottom: number;
  top: number;
}

interface Params {
  cols: number;
  rows: number;
  gridStyle: 'dashed' | 'solid';
  points: SheetPoint[];
  /** Printed straight lines (e.g. page 8's oblique line) drawn under the points. */
  segments: SheetSegment[];
  tasks: Task[];
  instruction: string | null;
  /** Extra squares drawn outside the printed sheet, as a larger notebook page. */
  extend: Extend;
}

function readPoint(value: unknown): SheetPoint | null {
  if (!value || typeof value !== 'object') return null;
  const record = value as Record<string, unknown>;
  if (typeof record.x !== 'number' || typeof record.y !== 'number') return null;
  return {
    x: record.x,
    y: record.y,
    label: typeof record.label === 'string' ? record.label : undefined,
    tone: record.tone === 'mark' ? 'mark' : 'ink',
  };
}

function readSegment(value: unknown): SheetSegment | null {
  if (!value || typeof value !== 'object') return null;
  const record = value as Record<string, unknown>;
  const from = record.from;
  const to = record.to;
  if (!Array.isArray(from) || !Array.isArray(to)) return null;
  if (from.length !== 2 || to.length !== 2) return null;
  if (!from.every((n) => typeof n === 'number') || !to.every((n) => typeof n === 'number')) {
    return null;
  }
  return {
    from: [from[0] as number, from[1] as number],
    to: [to[0] as number, to[1] as number],
    dashed: record.dashed === true,
  };
}

function readTask(value: unknown): Task | null {
  if (!value || typeof value !== 'object') return null;
  const record = value as Record<string, unknown>;
  const answer = readPoint(record.answer);
  if (
    !answer ||
    typeof record.id !== 'string' ||
    typeof record.prompt !== 'string' ||
    typeof record.label !== 'string' ||
    typeof record.hint !== 'string' ||
    typeof record.success !== 'string'
  ) {
    return null;
  }
  return {
    id: record.id,
    prompt: record.prompt,
    label: record.label,
    answer: { x: answer.x, y: answer.y },
    hint: record.hint,
    success: record.success,
    revealAfter: typeof record.revealAfter === 'number' ? record.revealAfter : 3,
  };
}

function readParams(raw: Record<string, unknown>): Params | null {
  if (typeof raw.cols !== 'number' || typeof raw.rows !== 'number') return null;
  const points = Array.isArray(raw.points)
    ? raw.points.map(readPoint).filter((point): point is SheetPoint => point !== null)
    : [];
  const segments = Array.isArray(raw.segments)
    ? raw.segments.map(readSegment).filter((segment): segment is SheetSegment => segment !== null)
    : [];
  const tasks = Array.isArray(raw.tasks)
    ? raw.tasks.map(readTask).filter((task): task is Task => task !== null)
    : [];
  if (tasks.length === 0) return null;
  const rawExtend = (raw.extend as Partial<Extend> | undefined) ?? {};
  return {
    cols: raw.cols,
    rows: raw.rows,
    gridStyle: raw.gridStyle === 'dashed' ? 'dashed' : 'solid',
    points,
    segments,
    tasks,
    instruction: typeof raw.instruction === 'string' ? raw.instruction : null,
    extend: {
      left: typeof rawExtend.left === 'number' ? Math.max(0, Math.ceil(rawExtend.left)) : 0,
      right: typeof rawExtend.right === 'number' ? Math.max(0, Math.ceil(rawExtend.right)) : 0,
      bottom: typeof rawExtend.bottom === 'number' ? Math.max(0, Math.ceil(rawExtend.bottom)) : 0,
      top: typeof rawExtend.top === 'number' ? Math.max(0, Math.ceil(rawExtend.top)) : 0,
    },
  };
}

type Feedback = { tone: 'ok' | 'retry' | 'info'; text: string } | null;

export function LatticePlacement({ spec }: { spec: InteractiveDiagram }) {
  const params = readParams(spec.params);
  const [solved, setSolved] = useState<string[]>([]);
  const [revealed, setRevealed] = useState<string[]>([]);
  const [attempts, setAttempts] = useState<Record<string, number>>({});
  const [wrong, setWrong] = useState<{ x: number; y: number } | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [column, setColumn] = useState('');
  const [row, setRow] = useState('');

  if (!params) return null;

  const { cols, rows, gridStyle, points, segments, tasks, instruction, extend } = params;
  const pad = 0.9;
  const minX = -extend.left;
  const maxX = cols + extend.right;
  const minY = -extend.bottom;
  const maxY = rows + extend.top;
  const width = maxX - minX + pad * 2;
  const height = maxY - minY + pad * 2;
  const sx = (x: number) => x - minX + pad;
  const sy = (y: number) => maxY - y + pad;
  const hasExtension = extend.left > 0 || extend.right > 0 || extend.bottom > 0 || extend.top > 0;
  const inPrintedSheet = (x: number, y: number) => x >= 0 && x <= cols && y >= 0 && y <= rows;

  const active = tasks.find((task) => !solved.includes(task.id) && !revealed.includes(task.id));
  const doneCount = tasks.filter(
    (task) => solved.includes(task.id) || revealed.includes(task.id),
  ).length;
  const activeAttempts = active ? (attempts[active.id] ?? 0) : 0;
  const canReveal = Boolean(active) && activeAttempts >= (active?.revealAfter ?? 3);

  function submit(point: { x: number; y: number }) {
    if (!active) return;
    if (!Number.isInteger(point.x) || !Number.isInteger(point.y)) {
      setFeedback({
        tone: 'retry',
        text: 'استعمل أعداداً صحيحة: النقطة تقع على تقاطع خطّي الشبكة.',
      });
      return;
    }
    if (point.x < minX || point.x > maxX || point.y < minY || point.y > maxY) {
      setFeedback({ tone: 'retry', text: 'هذه النقطة خارج المساحة المرسومة.' });
      return;
    }
    if (point.x === active.answer.x && point.y === active.answer.y) {
      setSolved((current) => [...current, active.id]);
      setWrong(null);
      setFeedback({ tone: 'ok', text: active.success });
      return;
    }
    setAttempts((current) => ({ ...current, [active.id]: (current[active.id] ?? 0) + 1 }));
    setWrong(point);
    setFeedback({ tone: 'retry', text: `ليست هذه النقطة. ${active.hint}` });
  }

  function reveal() {
    if (!active) return;
    setRevealed((current) => [...current, active.id]);
    setWrong(null);
    setFeedback({
      tone: 'info',
      text: `النقطة الصحيحة هي ${active.label} عند العمود ${active.answer.x} والسطر ${active.answer.y}. ${active.hint}`,
    });
  }

  function reset() {
    setSolved([]);
    setRevealed([]);
    setAttempts({});
    setWrong(null);
    setFeedback(null);
    setColumn('');
    setRow('');
  }

  const nodes: { x: number; y: number }[] = [];
  for (let x = minX; x <= maxX; x += 1) {
    for (let y = minY; y <= maxY; y += 1) nodes.push({ x, y });
  }

  return (
    <div className={styles.lab}>
      <svg
        className={styles.stage}
        viewBox={`0 0 ${width.toFixed(3)} ${height.toFixed(3)}`}
        role="img"
        aria-label={spec.alt.replace(/\$([^$]+)\$/g, '$1')}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* The notebook page: everything the student may write on. */}
        <rect
          x={sx(minX)}
          y={sy(maxY)}
          width={maxX - minX}
          height={maxY - minY}
          className={styles.notebook}
        />
        {/* The sheet as printed: the frame the lesson keeps referring to. */}
        <rect
          x={sx(0)}
          y={sy(rows)}
          width={cols}
          height={rows}
          className={styles.paper}
          data-role="printed-sheet"
        />

        {Array.from({ length: maxX - minX + 1 }, (_, index) => minX + index).map((x) => (
          <line
            key={`cx-${x}`}
            x1={sx(x)}
            y1={sy(maxY)}
            x2={sx(x)}
            y2={sy(minY)}
            className={
              inPrintedSheet(x, 0) || inPrintedSheet(x, rows)
                ? styles.gridLineStrong
                : styles.gridLine
            }
            strokeDasharray={gridStyle === 'dashed' ? '6 4' : undefined}
          />
        ))}
        {Array.from({ length: maxY - minY + 1 }, (_, index) => minY + index).map((y) => (
          <line
            key={`cy-${y}`}
            x1={sx(minX)}
            y1={sy(y)}
            x2={sx(maxX)}
            y2={sy(y)}
            className={
              inPrintedSheet(0, y) || inPrintedSheet(cols, y)
                ? styles.gridLineStrong
                : styles.gridLine
            }
            strokeDasharray={gridStyle === 'dashed' ? '6 4' : undefined}
          />
        ))}

        {/* Origin affordance: the printed sheet has no axes, so the lab labels
            the platform's own reading of columns and rows. */}
        {segments.map((segment, index) => (
          <line
            key={`seg-${index}`}
            x1={sx(segment.from[0])}
            y1={sy(segment.from[1])}
            x2={sx(segment.to[0])}
            y2={sy(segment.to[1])}
            className={styles.segment}
            strokeDasharray={segment.dashed ? '5 4' : undefined}
            aria-hidden="true"
          />
        ))}

        {Array.from({ length: maxX - minX + 1 }, (_, index) => minX + index).map((x) => (
          <text
            key={`nx-${x}`}
            x={sx(x)}
            y={sy(minY) + 0.58}
            className={`${styles.label} ${styles.labelAux} ${styles.axisLabel}`}
          >
            {x}
          </text>
        ))}
        {Array.from({ length: maxY - minY + 1 }, (_, index) => minY + index).map((y) => (
          <text
            key={`ny-${y}`}
            x={sx(minX) - 0.42}
            y={sy(y) + 0.12}
            className={`${styles.label} ${styles.labelAux} ${styles.axisLabel}`}
          >
            {y}
          </text>
        ))}

        {nodes.map((node) => (
          <circle
            key={`n-${node.x}-${node.y}`}
            cx={sx(node.x)}
            cy={sy(node.y)}
            r={0.2}
            className={styles.node}
            data-node={`${node.x},${node.y}`}
            aria-hidden="true"
            onClick={() => submit(node)}
          />
        ))}

        {wrong ? (
          <g aria-hidden="true">
            <line
              x1={sx(wrong.x) - 0.17}
              y1={sy(wrong.y) - 0.17}
              x2={sx(wrong.x) + 0.17}
              y2={sy(wrong.y) + 0.17}
              className={styles.wrong}
            />
            <line
              x1={sx(wrong.x) - 0.17}
              y1={sy(wrong.y) + 0.17}
              x2={sx(wrong.x) + 0.17}
              y2={sy(wrong.y) - 0.17}
              className={styles.wrong}
            />
          </g>
        ) : null}

        {points.map((point, index) => (
          <g key={`p-${index}`} data-testid={`printed-${point.label ?? index}`}>
            <circle
              cx={sx(point.x)}
              cy={sy(point.y)}
              r={0.16}
              className={point.tone === 'mark' ? styles.pointAux : styles.pointInk}
            />
            {point.label ? (
              <text
                x={sx(point.x) - 0.22}
                y={sy(point.y) - 0.3}
                className={`${styles.label} ${point.tone === 'mark' ? styles.labelAux : styles.labelInk}`}
              >
                {point.label}
              </text>
            ) : null}
          </g>
        ))}

        {tasks.map((task) => {
          const isSolved = solved.includes(task.id);
          const isRevealed = revealed.includes(task.id);
          if (!isSolved && !isRevealed) return null;
          return (
            <g
              key={`s-${task.id}`}
              data-testid={`placed-${task.label}`}
              data-x={task.answer.x}
              data-y={task.answer.y}
            >
              <circle
                cx={sx(task.answer.x)}
                cy={sy(task.answer.y)}
                r={0.2}
                className={styles.pointHalo}
              />
              <circle
                cx={sx(task.answer.x)}
                cy={sy(task.answer.y)}
                r={0.16}
                className={styles.pointImage}
              />
              <text
                x={sx(task.answer.x) + 0.42}
                y={sy(task.answer.y) - 0.28}
                className={`${styles.label} ${styles.labelImage}`}
              >
                {task.label}
              </text>
            </g>
          );
        })}
      </svg>

      <div className={styles.controls}>
        <p className={styles.progress}>
          أُنجز <span className={styles.mono}>{doneCount}</span> من{' '}
          <span className={styles.mono}>{tasks.length}</span>
        </p>
        {active ? (
          <>
            <p className={styles.controlsTitle}>
              <RichText text={active.prompt} />
            </p>
            {instruction ? (
              <p className={styles.note}>
                <RichText text={instruction} />
              </p>
            ) : null}
            <div className={styles.row}>
              <label className={styles.fieldLabel}>
                العمود
                <input
                  className={styles.field}
                  type="number"
                  inputMode="numeric"
                  min={minX}
                  max={maxX}
                  value={column}
                  aria-label="رقم العمود"
                  onChange={(event) => setColumn(event.target.value)}
                />
              </label>
              <label className={styles.fieldLabel}>
                السطر
                <input
                  className={styles.field}
                  type="number"
                  inputMode="numeric"
                  min={minY}
                  max={maxY}
                  value={row}
                  aria-label="رقم السطر"
                  onChange={(event) => setRow(event.target.value)}
                />
              </label>
              <button
                type="button"
                className={styles.button}
                onClick={() => submit({ x: Number(column), y: Number(row) })}
                disabled={column === '' || row === ''}
              >
                ضع النقطة
              </button>
              {canReveal ? (
                <button type="button" className={styles.buttonGhost} onClick={reveal}>
                  أظهر الحل
                </button>
              ) : null}
              <button type="button" className={styles.buttonGhost} onClick={reset}>
                إعادة المحاولة
              </button>
            </div>
            <p className={styles.note}>
              يمكنك أيضاً النقر مباشرة على تقاطع في الشبكة. الأصل في الزاوية اليسرى السفلى.
              {hasExtension
                ? ' الإطار الملوّن هو الشبكة المطبوعة؛ والأسطر السالبة مساحة إضافية تطلب التعليمة نسخ الشبكة على صفحة أوسع.'
                : ''}
            </p>
          </>
        ) : (
          <p className={styles.controlsTitle}>أكملت جميع المطلوب في هذه الشبكة.</p>
        )}
        {feedback ? (
          <p
            className={`${styles.status} ${
              feedback.tone === 'ok'
                ? styles.statusOk
                : feedback.tone === 'info'
                  ? styles.statusInfo
                  : styles.statusRetry
            }`}
            role="status"
            aria-live="polite"
          >
            <RichText text={feedback.text} />
          </p>
        ) : null}
      </div>
    </div>
  );
}
