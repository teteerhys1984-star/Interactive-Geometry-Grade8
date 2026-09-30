import { useId, useMemo, useState } from 'react';
import type { InteractiveDiagram } from '@/content/schema';
import { LtrIsolate, RichText } from '@/components/math';
import styles from './ExerciseReasoningLab.module.css';

interface Choice {
  id: string;
  label: string;
}

interface Task {
  id: string;
  prompt: string;
  choices: Choice[];
  answer: string;
}

function readTasks(value: unknown): Task[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== 'object') return [];
    const record = item as Record<string, unknown>;
    if (
      typeof record.id !== 'string' ||
      typeof record.prompt !== 'string' ||
      typeof record.answer !== 'string' ||
      !Array.isArray(record.choices)
    ) {
      return [];
    }
    const choices = record.choices.flatMap((choice) => {
      if (!choice || typeof choice !== 'object') return [];
      const candidate = choice as Record<string, unknown>;
      return typeof candidate.id === 'string' && typeof candidate.label === 'string'
        ? [{ id: candidate.id, label: candidate.label }]
        : [];
    });
    return choices.length > 1
      ? [{ id: record.id, prompt: record.prompt, answer: record.answer, choices }]
      : [];
  });
}

/**
 * A grouped reasoning activity for the unit-exercise continuation.
 *
 * Deliberately withholds ALL correctness feedback until every decision in the
 * group is complete and the learner presses the single submit button. This is
 * the interaction contract requested for the exercise lab: think first,
 * commit to the whole chain, then review the chain as a whole.
 */
export function ExerciseReasoningLab({ spec }: { spec: InteractiveDiagram }) {
  const tasks = useMemo(() => readTasks(spec.params.tasks), [spec.params.tasks]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const complete = tasks.length > 0 && tasks.every((task) => Boolean(answers[task.id]));
  const score = tasks.filter((task) => answers[task.id] === task.answer).length;

  function reset() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <section className={styles.lab} aria-label={spec.alt.replace(/\$([^$]+)\$/g, '$1')} dir="rtl">
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>مختبر التفكير</p>
          <h3 className={styles.title}>
            {String(spec.params.title ?? 'ابنِ الحل قبل كشف النتيجة')}
          </h3>
        </div>
        <span className={styles.counter} aria-label="عدد القرارات المكتملة">
          <LtrIsolate>{Object.keys(answers).length}</LtrIsolate>
          <span aria-hidden="true"> / </span>
          <LtrIsolate>{tasks.length}</LtrIsolate>
        </span>
      </header>

      <div className={styles.progress} aria-hidden="true">
        <span
          style={{
            width: `${tasks.length ? (Object.keys(answers).length / tasks.length) * 100 : 0}%`,
          }}
        />
      </div>

      <ol className={styles.tasks}>
        {tasks.map((task, taskIndex) => {
          const correct = answers[task.id] === task.answer;
          return (
            <li
              key={task.id}
              className={submitted ? (correct ? styles.correct : styles.review) : styles.task}
            >
              <div className={styles.taskHead}>
                <span className={styles.taskNumber} dir="ltr">
                  {taskIndex + 1}
                </span>
                <p className={styles.prompt}>
                  <RichText text={task.prompt} />
                </p>
              </div>
              <fieldset className={styles.choices} disabled={submitted}>
                <legend className="visually-hidden">قرار {taskIndex + 1}</legend>
                {task.choices.map((choice) => (
                  <label
                    key={choice.id}
                    className={answers[task.id] === choice.id ? styles.selected : styles.choice}
                  >
                    <input
                      type="radio"
                      name={`${uid}-${task.id}`}
                      checked={answers[task.id] === choice.id}
                      onChange={() =>
                        setAnswers((current) => ({ ...current, [task.id]: choice.id }))
                      }
                    />
                    <span>
                      <RichText text={choice.label} />
                    </span>
                  </label>
                ))}
              </fieldset>
              {submitted ? (
                <p className={styles.feedback}>
                  {correct ? 'اختيارك منسجم مع سلسلة الحل.' : 'راجع هذا القرار:'}{' '}
                  {!correct ? (
                    <strong>
                      <RichText
                        text={task.choices.find((choice) => choice.id === task.answer)?.label ?? ''}
                      />
                    </strong>
                  ) : null}
                </p>
              ) : null}
            </li>
          );
        })}
      </ol>

      {submitted ? (
        <footer className={styles.result} role="status">
          <div>
            <strong>
              حصيلة السلسلة: <LtrIsolate>{score}</LtrIsolate> من{' '}
              <LtrIsolate>{tasks.length}</LtrIsolate>
            </strong>
            <p>قارن القرارات التي تحتاج مراجعة بالحل المتدرّج أسفل النشاط.</p>
          </div>
          <button type="button" onClick={reset}>
            أعد بناء السلسلة
          </button>
        </footer>
      ) : (
        <footer className={styles.actions}>
          <p>لا تظهر نتيجة أي قرار قبل إكمال المجموعة كلها.</p>
          <button type="button" disabled={!complete} onClick={() => setSubmitted(true)}>
            تحقّق من السلسلة كاملة
          </button>
        </footer>
      )}
    </section>
  );
}
