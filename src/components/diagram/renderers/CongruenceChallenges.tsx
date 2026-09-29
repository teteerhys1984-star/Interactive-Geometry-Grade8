import { useState } from 'react';
import type { InteractiveDiagram } from '@/content/schema';
import { LtrIsolate } from '@/components/math';
import styles from './CongruenceChallenges.module.css';

/**
 * ============================================================================
 *  CONGRUENCE CHALLENGES — platform-authored grouped practice (Lesson 4)
 * ============================================================================
 *
 *  Three challenges about the congruence cases. Feedback appears only after
 *  the whole group is submitted — never per click — matching the project's
 *  no-immediate-feedback rule for in-lesson activities.
 *
 *  Every diagram is platform-made with exact coordinates (the paired triangle
 *  of challenge 1 is a strict translate of the first). Nothing here claims to
 *  reproduce a printed textbook figure.
 * ============================================================================
 */

interface Challenge {
  id: 'name-case' | 'missing-datum' | 'find-error';
  title: string;
  prompt: string;
  options: { id: string; label: string }[];
  answer: string;
  explanation: string;
}

const CHALLENGES: Challenge[] = [
  {
    id: 'name-case',
    title: 'سمِّ الحالة',
    prompt:
      'في المثلثين المرسومين: الضلعان الملوّنان من الأول يساويان مقابليهما، والزاوية المظللة المحصورة بينهما تساوي مقابلتها. بأي حالة يتطابق المثلثان؟',
    options: [
      { id: 'case-one', label: 'ضلعان والزاوية المحصورة بينهما.' },
      { id: 'case-two', label: 'ضلع والزاويتان المجاورتان له.' },
      { id: 'case-three', label: 'الأضلاع الثلاثة.' },
    ],
    answer: 'case-one',
    explanation:
      'المعطيات الثلاثة هي ضلعان والزاوية التي رأسها نقطة التقائهما، أي الزاوية المحصورة؛ فهذه الحالة الأولى حرفياً.',
  },
  {
    id: 'missing-datum',
    title: 'أكمل المعطى الناقص',
    prompt:
      'عُلم أن الضلع الملوّن من الأول يساوي مقابله، وأن الزاوية المظللة المجاورة له تساوي مقابلتها. ما المعطى الإضافي الذي يسمح بتطبيق الحالة الثانية؟',
    options: [
      { id: 'other-adjacent', label: 'تساوي الزاوية المجاورة الأخرى للضلع نفسه مع مقابلتها.' },
      { id: 'opposite-angle', label: 'تساوي الزاوية المقابلة للضلع مع مقابلتها.' },
      { id: 'perimeter', label: 'تساوي محيطي المثلثين.' },
    ],
    answer: 'other-adjacent',
    explanation:
      'الحالة الثانية تطلب الضلع والزاويتين المجاورتين له معاً؛ فالمعطى الناقص هو الزاوية المجاورة الثانية عند الطرف الآخر للضلع.',
  },
  {
    id: 'find-error',
    title: 'اكتشف الخطأ',
    prompt:
      'قال طالب: «الضلعان الملوّنان يساويان مقابليهما، والزاوية المظللة تساوي مقابلتها، إذن المثلثان طبوقان بالحالة الأولى». ما الخطأ في كلامه؟',
    options: [
      { id: 'not-included', label: 'الزاوية المظللة غير محصورة بين الضلعين المعلومين.' },
      { id: 'need-three-angles', label: 'الحالة الأولى تحتاج إلى تساوي الزوايا الثلاث.' },
      { id: 'no-error', label: 'لا يوجد خطأ؛ الاستنتاج سليم.' },
    ],
    answer: 'not-included',
    explanation:
      'الزاوية المظللة رأسها ليس نقطة التقاء الضلعين المعلومين، فهي ليست الزاوية المحصورة؛ ونص الحالة الأولى يشترط الزاوية المحصورة بالذات.',
  },
];

/** Exact translate used by challenge 1 (and verified by the renderer tests). */
const TRIANGLE: [number, number][] = [
  [0.9, 4.2],
  [4.3, 4.2],
  [1.8, 1.6],
];
const TRANSLATE: [number, number] = [6.2, 0];

const toPoints = (points: [number, number][], dx = 0, dy = 0) =>
  points.map(([x, y]) => `${(x + dx).toFixed(2)},${(y + dy).toFixed(2)}`).join(' ');

/** A small filled wedge marking the angle at `vertex` towards `p` and `q`. */
function angleWedge(
  vertex: [number, number],
  p: [number, number],
  q: [number, number],
  radius = 0.6,
): string {
  const dir = (target: [number, number]): [number, number] => {
    const dx = target[0] - vertex[0];
    const dy = target[1] - vertex[1];
    const length = Math.hypot(dx, dy);
    return [dx / length, dy / length];
  };
  const [ux, uy] = dir(p);
  const [vx, vy] = dir(q);
  const start: [number, number] = [vertex[0] + ux * radius, vertex[1] + uy * radius];
  const end: [number, number] = [vertex[0] + vx * radius, vertex[1] + vy * radius];
  const cross = ux * vy - uy * vx;
  const sweep = cross > 0 ? 1 : 0;
  return [
    `M ${vertex[0].toFixed(2)} ${vertex[1].toFixed(2)}`,
    `L ${start[0].toFixed(2)} ${start[1].toFixed(2)}`,
    `A ${radius} ${radius} 0 0 ${sweep} ${end[0].toFixed(2)} ${end[1].toFixed(2)}`,
    'Z',
  ].join(' ');
}

function ChallengeDiagram({ kind }: { kind: Challenge['id'] }) {
  const [A, B, C] = TRIANGLE as [[number, number], [number, number], [number, number]];
  const [dx, dy] = TRANSLATE;
  const A2: [number, number] = [A[0] + dx, A[1] + dy];
  const B2: [number, number] = [B[0] + dx, B[1] + dy];
  const C2: [number, number] = [C[0] + dx, C[1] + dy];

  if (kind === 'name-case') {
    return (
      <div className={styles.diagram} dir="ltr">
        <svg
          viewBox="0 0 12 5"
          role="img"
          aria-label="مثلثان، في كل منهما ضلعان مميزان بلون وزاوية مظللة محصورة بينهما"
        >
          <polygon points={toPoints(TRIANGLE)} className={styles.plainTriangle} />
          <polygon points={toPoints(TRIANGLE, dx, dy)} className={styles.pairTriangle} />
          {/* Marked sides: [AB] and [AC]; shaded angle at their meeting point A. */}
          <path d={angleWedge(A, B, C)} className={styles.angleGood} />
          <path d={angleWedge(A2, B2, C2)} className={styles.angleGood} />
          <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} className={styles.markedSide} />
          <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} className={styles.markedSideAlt} />
          <line x1={A2[0]} y1={A2[1]} x2={B2[0]} y2={B2[1]} className={styles.markedSide} />
          <line x1={A2[0]} y1={A2[1]} x2={C2[0]} y2={C2[1]} className={styles.markedSideAlt} />
        </svg>
      </div>
    );
  }

  if (kind === 'missing-datum') {
    return (
      <div className={styles.diagram} dir="ltr">
        <svg
          viewBox="0 0 12 5"
          role="img"
          aria-label="مثلثان، في كل منهما ضلع مميز وزاوية مظللة عند أحد طرفيه وعلامة استفهام عند الطرف الآخر"
        >
          <polygon points={toPoints(TRIANGLE)} className={styles.plainTriangle} />
          <polygon points={toPoints(TRIANGLE, dx, dy)} className={styles.pairTriangle} />
          {/* Marked side: [AB]; known angle at A; the missing datum sits at B. */}
          <path d={angleWedge(A, B, C)} className={styles.angleGood} />
          <path d={angleWedge(A2, B2, C2)} className={styles.angleGood} />
          <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} className={styles.markedSide} />
          <line x1={A2[0]} y1={A2[1]} x2={B2[0]} y2={B2[1]} className={styles.markedSide} />
          <text x={B[0] - 0.15} y={B[1] - 0.35} className={styles.question}>
            ?
          </text>
          <text x={B2[0] - 0.15} y={B2[1] - 0.35} className={styles.question}>
            ?
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div className={styles.diagram} dir="ltr">
      <svg
        viewBox="0 0 12 5"
        role="img"
        aria-label="مثلثان، الضلعان المميزان يلتقيان في رأس بينما الزاوية المظللة عند رأس آخر"
      >
        <polygon points={toPoints(TRIANGLE)} className={styles.plainTriangle} />
        <polygon points={toPoints(TRIANGLE, dx, dy)} className={styles.pairTriangle} />
        {/* Marked sides meet at A, but the shaded angle sits at B: NOT included. */}
        <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} className={styles.markedSide} />
        <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} className={styles.markedSideAlt} />
        <line x1={A2[0]} y1={A2[1]} x2={B2[0]} y2={B2[1]} className={styles.markedSide} />
        <line x1={A2[0]} y1={A2[1]} x2={C2[0]} y2={C2[1]} className={styles.markedSideAlt} />
        <path d={angleWedge(B, A, C)} className={styles.angleWrong} />
        <path d={angleWedge(B2, A2, C2)} className={styles.angleWrong} />
      </svg>
    </div>
  );
}

export function CongruenceChallenges({ spec }: { spec: InteractiveDiagram }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
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

              <ChallengeDiagram kind={challenge.id} />

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
                        name={`congruence-${challenge.id}`}
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
