import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import { LtrIsolate, RichText } from '@/components/math';
import { plainText } from '@/lib/bidi';
import type { FigureSpec } from '@/lib/geometryFigure';
import { FigureSvg } from './FigureSvg';
import type { ChoiceLabTask } from './params';
import styles from './lab.module.css';

/**
 * ============================================================================
 *  CHOICE LAB — the shared "answer, then review everything" engine
 * ============================================================================
 *
 *  Interaction contract (identical to the rest of the platform's exercise
 *  labs): NOTHING is judged while the learner works. No tick, no cross, no
 *  colour, no score — until every task is answered and «راجع» is pressed.
 *
 *  Two Lesson 4 exercises need exactly this engine (the printed ② of «تدرّب»
 *  and the guided proof of ③), so they share it instead of duplicating a
 *  fourth interaction pattern.
 * ============================================================================
 */

interface ChoiceLabProps {
  ariaLabel: string;
  eyebrow: string;
  title: string;
  intro: string;
  figure: FigureSpec;
  figureLabel: string;
  tasks: ChoiceLabTask[];
  reviewLabel: string;
  resetLabel: string;
  taskWord: string;
  footerNote: ReactNode;
}

export function ChoiceLab({
  ariaLabel,
  eyebrow,
  title,
  intro,
  figure,
  figureLabel,
  tasks,
  reviewLabel,
  resetLabel,
  taskWord,
  footerNote,
}: ChoiceLabProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');

  const answered = tasks.filter((task) => Boolean(answers[task.id])).length;
  const complete = answered === tasks.length;
  const score = tasks.filter((task) => answers[task.id] === task.answer).length;

  const optionLabel = (task: ChoiceLabTask, optionId: string) =>
    task.options.find((option) => option.id === optionId)?.label ?? '';

  return (
    <section className={styles.lab} aria-label={ariaLabel} dir="rtl">
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h3 className={styles.title}>
            <RichText text={title} />
          </h3>
        </div>
        <span className={styles.counter} aria-label={`${taskWord} المكتملة`}>
          <LtrIsolate>{answered}</LtrIsolate>
          <span aria-hidden="true"> / </span>
          <LtrIsolate>{tasks.length}</LtrIsolate>
        </span>
      </header>

      <p className={styles.intro}>
        <RichText text={intro} />
      </p>

      <div className={styles.figureWrap}>
        <FigureSvg spec={figure} ariaLabel={figureLabel} />
      </div>

      <ol className={styles.tasks}>
        {tasks.map((task, index) => {
          const chosen = answers[task.id];
          const correct = chosen === task.answer;
          const cardClass = submitted
            ? correct
              ? styles.cardCorrect
              : styles.cardWrong
            : styles.card;

          return (
            <li key={task.id} className={cardClass}>
              <div className={styles.cardHead}>
                <span className={styles.taskNumber} dir="ltr">
                  {index + 1}
                </span>
                <div>
                  {task.label ? <span className={styles.eyebrow}>{task.label}</span> : null}
                  <p className={styles.prompt}>
                    <RichText text={task.prompt} />
                  </p>
                </div>
              </div>

              <fieldset className={styles.options} disabled={submitted}>
                <legend className="visually-hidden">{plainText(task.prompt)}</legend>
                {task.options.map((option) => (
                  <label
                    key={option.id}
                    className={chosen === option.id ? styles.optionOn : styles.option}
                  >
                    <input
                      type="radio"
                      name={`${uid}-${task.id}`}
                      checked={chosen === option.id}
                      onChange={() =>
                        setAnswers((current) => ({ ...current, [task.id]: option.id }))
                      }
                    />
                    <span>
                      <RichText text={option.label} />
                    </span>
                  </label>
                ))}
              </fieldset>

              {submitted ? (
                <div className={styles.review}>
                  {correct ? (
                    <p>إجابتك صحيحة.</p>
                  ) : (
                    <p>
                      الخيار المنسجم مع البرهان:{' '}
                      <strong>
                        <RichText text={optionLabel(task, task.answer)} />
                      </strong>
                    </p>
                  )}
                  <p className={styles.reason}>
                    <RichText text={task.reason} />
                  </p>
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>

      {submitted ? (
        <footer className={styles.actions} role="status">
          <div>
            <strong>
              حصيلة المراجعة: <LtrIsolate>{score}</LtrIsolate> من{' '}
              <LtrIsolate>{tasks.length}</LtrIsolate>
            </strong>
            <p>{footerNote}</p>
          </div>
          <button
            type="button"
            className={styles.secondary}
            onClick={() => {
              setAnswers({});
              setSubmitted(false);
            }}
          >
            {resetLabel}
          </button>
        </footer>
      ) : (
        <footer className={styles.actions}>
          <p>لا يظهر أي تصحيح قبل الإجابة عن المهام كلها ثم الضغط على زر المراجعة.</p>
          <button
            type="button"
            className={styles.primary}
            disabled={!complete}
            onClick={() => setSubmitted(true)}
          >
            {reviewLabel}
          </button>
        </footer>
      )}
    </section>
  );
}
