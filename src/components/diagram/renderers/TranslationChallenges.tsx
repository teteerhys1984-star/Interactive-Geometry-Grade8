import { useId, useState } from 'react';
import type { InteractiveDiagram } from '@/content/schema';
import { LtrIsolate } from '@/components/math';
import styles from './TranslationChallenges.module.css';

interface Challenge {
  id: 'image' | 'vector' | 'error';
  title: string;
  prompt: string;
  options: { id: string; label: string }[];
  answer: string;
  explanation: string;
}

const CHALLENGES: Challenge[] = [
  {
    id: 'image',
    title: 'حدّد الصورة الصحيحة',
    prompt: 'المثلث الأزرق ينتقل وفق السهم الرمادي. أي مثلث مرقّم هو صورته؟',
    options: [
      { id: 'one', label: 'المثلث ①' },
      { id: 'two', label: 'المثلث ②' },
      { id: 'three', label: 'المثلث ③' },
    ],
    answer: 'two',
    explanation: 'المثلث ② وحده نقل الرؤوس الثلاثة أربع وحدات يميناً ووحدة واحدة إلى الأعلى.',
  },
  {
    id: 'vector',
    title: 'استخرج الحركة',
    prompt: 'على الشبكة، ما الحركة التي تنقل النقطة A إلى النقطة A′؟',
    options: [
      { id: 'right-up', label: '٣ يميناً و٢ أعلى' },
      { id: 'right-down', label: '٣ يميناً و٢ أسفل' },
      { id: 'left-up', label: '٣ يساراً و٢ أعلى' },
    ],
    answer: 'right-up',
    explanation: 'من A إلى A′ نعدّ ثلاث خلايا نحو اليمين وخليتين نحو الأعلى.',
  },
  {
    id: 'error',
    title: 'اكتشف الخطأ',
    prompt:
      'في الصورة البرتقالية، نُقل رأسان بالحركة نفسها لكن الرأس الثالث وصل إلى موضع خاطئ. ما القاعدة التي كُسرت؟',
    options: [
      { id: 'same-vector', label: 'يجب أن تنتقل النقاط كلها بالحركة نفسها.' },
      { id: 'different-lengths', label: 'يجب أن تتغيّر أطوال الأضلاع.' },
      { id: 'rotate', label: 'يجب تدوير الشكل بعد نقله.' },
    ],
    answer: 'same-vector',
    explanation:
      'الانسحاب حركة واحدة مشتركة لكل النقاط؛ اختلاف حركة رأس واحد يغيّر الشكل فلا يعود صورةً وفق انسحاب.',
  },
];

export function TranslationChallenges({ spec }: { spec: InteractiveDiagram }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const baseId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const complete = CHALLENGES.every((challenge) => answers[challenge.id]);
  const score = CHALLENGES.filter((challenge) => answers[challenge.id] === challenge.answer).length;

  function choose(challengeId: string, optionId: string) {
    if (submitted) return;
    setAnswers((current) => ({ ...current, [challengeId]: optionId }));
  }

  return (
    <div className={styles.wrap} aria-label={spec.alt.replace(/\$([^$]+)\$/g, '$1')}>
      <ol className={styles.list}>
        {CHALLENGES.map((challenge, index) => {
          const correct = answers[challenge.id] === challenge.answer;
          return (
            <li key={challenge.id} className={styles.card}>
              <header className={styles.header}>
                <span className={styles.number} dir="ltr">
                  {index + 1}
                </span>
                <div>
                  <h4 className={styles.title}>{challenge.title}</h4>
                  <p className={styles.prompt}>{challenge.prompt}</p>
                </div>
              </header>

              <ChallengeDiagram kind={challenge.id} markerBase={`${baseId}-${challenge.id}`} />

              <fieldset className={styles.options} disabled={submitted}>
                <legend className="visually-hidden">خيارات {challenge.title}</legend>
                {challenge.options.map((option) => {
                  const checked = answers[challenge.id] === option.id;
                  return (
                    <label
                      key={option.id}
                      className={checked ? styles.optionChecked : styles.option}
                    >
                      <input
                        type="radio"
                        name={`${baseId}-${challenge.id}`}
                        checked={checked}
                        onChange={() => choose(challenge.id, option.id)}
                      />
                      <span>{option.label}</span>
                    </label>
                  );
                })}
              </fieldset>

              {submitted ? (
                <div className={correct ? styles.feedbackCorrect : styles.feedbackWrong}>
                  <strong>{correct ? 'إجابة موفّقة.' : 'تحتاج إلى مراجعة.'}</strong>{' '}
                  {challenge.explanation}
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>

      {submitted ? (
        <div className={styles.result} role="status">
          <p>
            النتيجة: <LtrIsolate>{score}</LtrIsolate> من{' '}
            <LtrIsolate>{CHALLENGES.length}</LtrIsolate>
          </p>
          <button
            type="button"
            className={styles.secondary}
            onClick={() => {
              setAnswers({});
              setSubmitted(false);
            }}
          >
            محاولة جديدة
          </button>
        </div>
      ) : (
        <div className={styles.submitRow}>
          <span>
            أُجيب عن <LtrIsolate>{Object.keys(answers).length}</LtrIsolate> من{' '}
            <LtrIsolate>{CHALLENGES.length}</LtrIsolate>
          </span>
          <button
            type="button"
            className={styles.submit}
            disabled={!complete}
            onClick={() => setSubmitted(true)}
          >
            تحقق من المجموعة
          </button>
        </div>
      )}
    </div>
  );
}

function ChallengeDiagram({ kind, markerBase }: { kind: Challenge['id']; markerBase: string }) {
  if (kind === 'image') {
    const markerId = `arrow-${markerBase}`;
    return (
      <div className={styles.diagram} dir="ltr">
        <svg viewBox="0 0 12 5" role="img" aria-label="مثلث أصلي وسهم وثلاث صور محتملة">
          <defs>
            <marker id={markerId} markerWidth="5" markerHeight="5" refX="4" refY="2" orient="auto">
              <path d="M0,0 L4,2 L0,4 Z" className={styles.arrowHead} />
            </marker>
          </defs>
          <polygon points="0.7,3.7 2.5,3.6 1.2,1.6" className={styles.original} />
          <line
            x1="2.6"
            y1="2.8"
            x2="5"
            y2="2.2"
            className={styles.arrow}
            markerEnd={`url(#${markerId})`}
          />
          <polygon points="4.7,4.5 6.5,4.4 5.2,2.4" className={styles.candidate} />
          <text x="5.6" y="4.9" className={styles.diagramLabel}>
            ①
          </text>
          <polygon points="4.7,2.7 6.5,2.6 5.2,0.6" className={styles.candidate} />
          <text x="5.6" y="3.2" className={styles.diagramLabel}>
            ②
          </text>
          <polygon points="8.7,2.7 10.5,2.6 9.2,0.6" className={styles.candidate} />
          <text x="9.6" y="3.2" className={styles.diagramLabel}>
            ③
          </text>
        </svg>
      </div>
    );
  }

  if (kind === 'vector') {
    return (
      <div className={styles.diagram} dir="ltr">
        <svg viewBox="0 0 8 6" role="img" aria-label="شبكة عليها A عند 1 و1 وA مسطّرة عند 4 و3">
          {Array.from({ length: 9 }, (_, x) => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2="6" className={styles.grid} />
          ))}
          {Array.from({ length: 7 }, (_, y) => (
            <line key={`h${y}`} x1="0" y1={y} x2="8" y2={y} className={styles.grid} />
          ))}
          <circle cx="1" cy="5" r="0.13" className={styles.originalPoint} />
          <text x="0.65" y="5.5" className={styles.pointLabel}>
            A
          </text>
          <circle cx="4" cy="3" r="0.13" className={styles.imagePoint} />
          <text x="4.25" y="2.75" className={styles.pointLabelImage}>
            A′
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div className={styles.diagram} dir="ltr">
      <svg
        viewBox="0 0 10 5"
        role="img"
        aria-label="مثلث أصلي وصورة خاطئة انتقل أحد رؤوسها بحركة مختلفة"
      >
        <polygon points="0.8,4 3,3.8 1.6,1.3" className={styles.original} />
        <polygon points="5.2,3 7.4,2.8 6.7,0.4" className={styles.wrongImage} />
        <line x1="0.8" y1="4" x2="5.2" y2="3" className={styles.guide} />
        <line x1="3" y1="3.8" x2="7.4" y2="2.8" className={styles.guide} />
        <line x1="1.6" y1="1.3" x2="6.7" y2="0.4" className={styles.guideWrong} />
        <circle cx="6.7" cy="0.4" r="0.24" className={styles.errorHalo} />
      </svg>
    </div>
  );
}
