import { useId, useMemo, useState } from 'react';
import type { InteractiveDiagram } from '@/content/schema';
import { LtrIsolate, RichText } from '@/components/math';
import styles from './ProofWorkshop.module.css';

/**
 * ============================================================================
 *  PROOF WORKSHOP — the Q16–Q28 activity engine
 * ============================================================================
 *
 *  Three task kinds so the interaction can follow the nature of the printed
 *  question instead of repeating one quiz shape thirteen times:
 *
 *    'choice' — pick the single correct given / property / conclusion
 *    'multi'  — select every element that genuinely corresponds (no partial
 *               credit hints while choosing)
 *    'order'  — arrange the steps of a proof into a valid deduction chain
 *
 *  INTERACTION CONTRACT (identical to the rest of the exercise lessons):
 *  NOTHING is judged while the learner works. No ✓, no ✗, no colour change,
 *  no score — until the whole group is complete and the learner presses the
 *  single review button. Only then is the chain reviewed as a whole.
 * ============================================================================
 */

interface Option {
  id: string;
  label: string;
}

type Task =
  | { id: string; kind: 'choice'; prompt: string; options: Option[]; answer: string }
  | { id: string; kind: 'multi'; prompt: string; options: Option[]; answers: string[] }
  | { id: string; kind: 'order'; prompt: string; items: Option[]; order: string[] };

const KIND_LABEL: Record<Task['kind'], string> = {
  choice: 'اختيار واحد',
  multi: 'اختيار متعدد',
  order: 'ترتيب الخطوات',
};

function readOptions(value: unknown): Option[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== 'object') return [];
    const record = item as Record<string, unknown>;
    return typeof record.id === 'string' && typeof record.label === 'string'
      ? [{ id: record.id, label: record.label }]
      : [];
  });
}

function readStrings(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : [];
}

function readTasks(value: unknown): Task[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item): Task[] => {
    if (!item || typeof item !== 'object') return [];
    const record = item as Record<string, unknown>;
    const { id, kind, prompt } = record;
    if (typeof id !== 'string' || typeof prompt !== 'string') return [];

    if (kind === 'choice') {
      const options = readOptions(record.options);
      if (options.length < 2 || typeof record.answer !== 'string') return [];
      return [{ id, kind: 'choice', prompt, options, answer: record.answer }];
    }
    if (kind === 'multi') {
      const options = readOptions(record.options);
      const answers = readStrings(record.answers);
      if (options.length < 2 || answers.length === 0) return [];
      return [{ id, kind: 'multi', prompt, options, answers }];
    }
    if (kind === 'order') {
      const items = readOptions(record.items);
      const order = readStrings(record.order);
      if (items.length < 2 || order.length !== items.length) return [];
      return [{ id, kind: 'order', prompt, items, order }];
    }
    return [];
  });
}

function sameSet(a: string[], b: string[]): boolean {
  return a.length === b.length && [...a].sort().join('|') === [...b].sort().join('|');
}

function sameSequence(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

interface WorkState {
  choice: Record<string, string>;
  multi: Record<string, string[]>;
  order: Record<string, string[]>;
  touched: Record<string, boolean>;
}

const EMPTY_STATE: WorkState = { choice: {}, multi: {}, order: {}, touched: {} };

export function ProofWorkshop({ spec }: { spec: InteractiveDiagram }) {
  const tasks = useMemo(() => readTasks(spec.params.tasks), [spec.params.tasks]);
  const initialOrder = useMemo(() => {
    const seed: Record<string, string[]> = {};
    for (const task of tasks) {
      if (task.kind === 'order') seed[task.id] = task.items.map((item) => item.id);
    }
    return seed;
  }, [tasks]);

  const [state, setState] = useState<WorkState>({ ...EMPTY_STATE, order: initialOrder });
  const [submitted, setSubmitted] = useState(false);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');

  const isComplete = (task: Task): boolean => {
    if (task.kind === 'choice') return Boolean(state.choice[task.id]);
    if (task.kind === 'multi') return (state.multi[task.id] ?? []).length > 0;
    return Boolean(state.touched[task.id]);
  };

  const isCorrect = (task: Task): boolean => {
    if (task.kind === 'choice') return state.choice[task.id] === task.answer;
    if (task.kind === 'multi') return sameSet(state.multi[task.id] ?? [], task.answers);
    return sameSequence(state.order[task.id] ?? [], task.order);
  };

  const completedCount = tasks.filter(isComplete).length;
  const allComplete = tasks.length > 0 && completedCount === tasks.length;
  const score = tasks.filter(isCorrect).length;

  function reset() {
    setState({ ...EMPTY_STATE, order: initialOrder });
    setSubmitted(false);
  }

  function move(taskId: string, index: number, direction: -1 | 1) {
    setState((current) => {
      const sequence = [...(current.order[taskId] ?? [])];
      const target = index + direction;
      if (target < 0 || target >= sequence.length) return current;
      const moved = sequence[index]!;
      sequence[index] = sequence[target]!;
      sequence[target] = moved;
      return {
        ...current,
        order: { ...current.order, [taskId]: sequence },
        touched: { ...current.touched, [taskId]: true },
      };
    });
  }

  const labelOf = (task: Extract<Task, { kind: 'order' }>, id: string) =>
    task.items.find((item) => item.id === id)?.label ?? '';

  return (
    <section className={styles.lab} aria-label={spec.alt.replace(/\$([^$]+)\$/g, '$1')} dir="rtl">
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>مختبر البرهان</p>
          <h3 className={styles.title}>
            <RichText text={String(spec.params.title ?? 'فكّر أولاً، ثم راجع')} />
          </h3>
        </div>
        <span className={styles.counter} aria-label="عدد المهام المكتملة">
          <LtrIsolate>{completedCount}</LtrIsolate>
          <span aria-hidden="true"> / </span>
          <LtrIsolate>{tasks.length}</LtrIsolate>
        </span>
      </header>

      {typeof spec.params.intro === 'string' ? (
        <p className={styles.intro}>
          <RichText text={spec.params.intro} />
        </p>
      ) : null}

      <div className={styles.progress} aria-hidden="true">
        <span style={{ width: `${tasks.length ? (completedCount / tasks.length) * 100 : 0}%` }} />
      </div>

      <ol className={styles.tasks}>
        {tasks.map((task, taskIndex) => {
          const reviewed = submitted;
          const correct = isCorrect(task);
          const cardClass = reviewed
            ? correct
              ? styles.cardCorrect
              : styles.cardReview
            : styles.card;

          return (
            <li key={task.id} className={cardClass}>
              <div className={styles.cardHead}>
                <span className={styles.taskNumber} dir="ltr">
                  {taskIndex + 1}
                </span>
                <div>
                  <span className={styles.kind}>{KIND_LABEL[task.kind]}</span>
                  <p className={styles.prompt}>
                    <RichText text={task.prompt} />
                  </p>
                </div>
              </div>

              {task.kind === 'choice' ? (
                <fieldset className={styles.options} disabled={submitted}>
                  <legend className="visually-hidden">مهمة {taskIndex + 1}</legend>
                  {task.options.map((option) => (
                    <label
                      key={option.id}
                      className={
                        state.choice[task.id] === option.id ? styles.optionOn : styles.option
                      }
                    >
                      <input
                        type="radio"
                        name={`${uid}-${task.id}`}
                        checked={state.choice[task.id] === option.id}
                        onChange={() =>
                          setState((current) => ({
                            ...current,
                            choice: { ...current.choice, [task.id]: option.id },
                          }))
                        }
                      />
                      <span>
                        <RichText text={option.label} />
                      </span>
                    </label>
                  ))}
                </fieldset>
              ) : null}

              {task.kind === 'multi' ? (
                <fieldset className={styles.options} disabled={submitted}>
                  <legend className="visually-hidden">مهمة {taskIndex + 1}</legend>
                  {task.options.map((option) => {
                    const picked = (state.multi[task.id] ?? []).includes(option.id);
                    return (
                      <label key={option.id} className={picked ? styles.optionOn : styles.option}>
                        <input
                          type="checkbox"
                          name={`${uid}-${task.id}`}
                          checked={picked}
                          onChange={() =>
                            setState((current) => {
                              const chosen = current.multi[task.id] ?? [];
                              return {
                                ...current,
                                multi: {
                                  ...current.multi,
                                  [task.id]: picked
                                    ? chosen.filter((value) => value !== option.id)
                                    : [...chosen, option.id],
                                },
                              };
                            })
                          }
                        />
                        <span>
                          <RichText text={option.label} />
                        </span>
                      </label>
                    );
                  })}
                </fieldset>
              ) : null}

              {task.kind === 'order' ? (
                <ol className={styles.sequence} aria-label={`ترتيب خطوات المهمة ${taskIndex + 1}`}>
                  {(state.order[task.id] ?? []).map((itemId, index, sequence) => (
                    <li key={itemId} className={styles.sequenceItem}>
                      <span className={styles.rank} dir="ltr">
                        {index + 1}
                      </span>
                      <span className={styles.sequenceText}>
                        <RichText text={labelOf(task, itemId)} />
                      </span>
                      <span className={styles.moveGroup}>
                        <button
                          type="button"
                          className={styles.move}
                          disabled={submitted || index === 0}
                          aria-label={`حرّك الخطوة ${index + 1} إلى الأعلى`}
                          onClick={() => move(task.id, index, -1)}
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          className={styles.move}
                          disabled={submitted || index === sequence.length - 1}
                          aria-label={`حرّك الخطوة ${index + 1} إلى الأسفل`}
                          onClick={() => move(task.id, index, 1)}
                        >
                          ↓
                        </button>
                      </span>
                    </li>
                  ))}
                </ol>
              ) : null}

              {reviewed ? (
                <div className={styles.review}>
                  {correct ? (
                    <p>قرارك منسجم مع سلسلة البرهان.</p>
                  ) : (
                    <>
                      <p>راجع هذه المهمة — الترتيب المنسجم مع البرهان:</p>
                      {task.kind === 'choice' ? (
                        <p className={styles.expected}>
                          <RichText
                            text={
                              task.options.find((option) => option.id === task.answer)?.label ?? ''
                            }
                          />
                        </p>
                      ) : null}
                      {task.kind === 'multi' ? (
                        <ul className={styles.expectedList}>
                          {task.answers.map((answerId) => (
                            <li key={answerId}>
                              <RichText
                                text={
                                  task.options.find((option) => option.id === answerId)?.label ?? ''
                                }
                              />
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {task.kind === 'order' ? (
                        <ol className={styles.expectedList}>
                          {task.order.map((itemId) => (
                            <li key={itemId}>
                              <RichText text={labelOf(task, itemId)} />
                            </li>
                          ))}
                        </ol>
                      ) : null}
                    </>
                  )}
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>

      {submitted ? (
        <footer className={styles.result} role="status">
          <div>
            <strong>
              حصيلة المختبر: <LtrIsolate>{score}</LtrIsolate> من{' '}
              <LtrIsolate>{tasks.length}</LtrIsolate>
            </strong>
            <p>قارن ما يحتاج مراجعة بالحل المتدرّج أسفل النشاط.</p>
          </div>
          <button type="button" onClick={reset}>
            أعد المحاولة من البداية
          </button>
        </footer>
      ) : (
        <footer className={styles.actions}>
          <p>لا تظهر أي نتيجة قبل إكمال مهام المختبر كلها.</p>
          <button type="button" disabled={!allComplete} onClick={() => setSubmitted(true)}>
            راجع عملي كاملاً
          </button>
        </footer>
      )}
    </section>
  );
}
