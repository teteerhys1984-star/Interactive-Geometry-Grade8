import { useId, useState } from 'react';
import type { InteractiveDiagram } from '@/content/schema';
import { LtrIsolate } from '@/components/math';
import styles from './UnitExerciseLab.module.css';

type Answers = Record<number, string>;

export function UnitExerciseLab({ spec }: { spec: InteractiveDiagram }) {
  const count = typeof spec.params.count === 'number' ? spec.params.count : 0;
  const expected = Array.isArray(spec.params.answers) ? spec.params.answers.map(String) : [];
  const mode = spec.params.mode === 'agree-disagree' ? 'agree-disagree' : 'multiple-choice';
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const options =
    mode === 'multiple-choice'
      ? [
          { id: '1', label: '①' },
          { id: '2', label: '②' },
          { id: '3', label: '③' },
        ]
      : [
          { id: 'agree', label: 'موافق' },
          { id: 'disagree', label: 'غير موافق' },
        ];
  const complete = Object.keys(answers).length === count;
  const score = expected.filter((answer, index) => answers[index] === answer).length;

  function reset() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <section className={styles.lab} aria-label={spec.alt.replace(/\$([^$]+)\$/g, '$1')}>
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>مساحة قرار</span>
          <h3>أكمل المجموعة قبل كشف النتيجة</h3>
        </div>
        <span className={styles.counter}>
          <LtrIsolate>{Object.keys(answers).length}</LtrIsolate> / <LtrIsolate>{count}</LtrIsolate>
        </span>
      </header>
      <div className={styles.progress} aria-hidden="true">
        <span style={{ width: `${count ? (Object.keys(answers).length / count) * 100 : 0}%` }} />
      </div>
      <ol className={styles.grid}>
        {Array.from({ length: count }, (_, index) => (
          <li
            key={index}
            className={
              submitted
                ? answers[index] === expected[index]
                  ? styles.correct
                  : styles.review
                : styles.item
            }
          >
            <span className={styles.number} dir="ltr">
              {index + 1}
            </span>
            <fieldset disabled={submitted} className={styles.choices}>
              <legend className="visually-hidden">إجابة الفقرة {index + 1}</legend>
              {options.map((option) => (
                <label
                  key={option.id}
                  className={answers[index] === option.id ? styles.selected : styles.choice}
                >
                  <input
                    type="radio"
                    name={`${uid}-${index}`}
                    checked={answers[index] === option.id}
                    onChange={() => setAnswers((current) => ({ ...current, [index]: option.id }))}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </fieldset>
            {submitted && answers[index] !== expected[index] ? (
              <span className={styles.answer}>
                راجع: {options.find((o) => o.id === expected[index])?.label}
              </span>
            ) : null}
          </li>
        ))}
      </ol>
      {submitted ? (
        <div className={styles.result} role="status">
          <div>
            <strong>
              نتيجتك المجمّعة: <LtrIsolate>{score}</LtrIsolate> من <LtrIsolate>{count}</LtrIsolate>
            </strong>
            <p>
              ارجع إلى بطاقة «اكشف الحل خطوة بخطوة» للفقرات المعلّمة للمراجعة؛ السبب أهم من
              الاختيار.
            </p>
          </div>
          <button type="button" onClick={reset}>
            محاولة جديدة
          </button>
        </div>
      ) : (
        <div className={styles.actions}>
          <p>لن تظهر صحة أي اختيار قبل إنهاء المجموعة.</p>
          <button type="button" disabled={!complete} onClick={() => setSubmitted(true)}>
            تحقّق من المجموعة
          </button>
        </div>
      )}
    </section>
  );
}
