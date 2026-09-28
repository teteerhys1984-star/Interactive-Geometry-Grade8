import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PageShell } from '@/components/layout';
import { ProgressBar } from '@/components/navigation';
import { Blocks } from '@/components/content';
import { getAssessment, subject } from '@/content/registry';
import { routes } from '@/lib/routes';
import { recordAssessmentScore } from '@/lib/progress';
import { gradeAssessment, isAnswered } from '@/lib/grading';
import type { AnswerMap } from '@/lib/grading';
import { NotFoundPage } from './NotFoundPage';
import styles from './AssessmentPage.module.css';

/**
 * Final assessment runner — one question at a time, mirroring the lesson's
 * step-by-step UX.
 *
 * Grading happens entirely in the browser; there is no server.
 *
 * IMPORTANT: teacher explanations (`question.explanation`) are NEVER rendered
 * here. They exist only in the Teacher Area, behind the passphrase gate.
 */
export function AssessmentPage() {
  const { scopeId } = useParams();
  const found = scopeId ? getAssessment(scopeId) : undefined;

  const [answers, setAnswers] = useState<AnswerMap>({});
  const [index, setIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [started, setStarted] = useState(false);

  if (!found) return <NotFoundPage />;
  const { assessment, unit, lesson } = found;

  const total = assessment.questions.length;
  const question = assessment.questions[index];
  const result = gradeAssessment(assessment, answers);
  const answeredCount = result.outcomes.filter((outcome) => outcome.answered).length;

  const crumbs = [
    { label: 'الرئيسية', to: routes.home() },
    { label: subject.title, to: routes.subject(subject.id) },
    ...(unit ? [{ label: unit.title, to: routes.unit(unit.id) }] : []),
    ...(lesson ? [{ label: lesson.title, to: routes.lesson(lesson.id) }] : []),
    { label: assessment.title },
  ];

  function setAnswer(questionId: string, value: string) {
    setAnswers((previous) => ({ ...previous, [questionId]: value }));
  }

  /* ----------------------------------------------------------- intro --- */
  if (!started) {
    return (
      <PageShell narrow title={assessment.title} crumbs={crumbs}>
        <div className={styles.intro}>
          {assessment.instructions ? (
            <p className={styles.instructions}>{assessment.instructions}</p>
          ) : null}
          <ul className={styles.introList}>
            <li>
              عدد الأسئلة: <strong dir="ltr">{total}</strong>
            </li>
            <li>
              درجة النجاح: <strong dir="ltr">{assessment.passingScore}%</strong>
            </li>
            <li>يظهر سؤال واحد في كل مرة، ويمكنك التنقّل بين الأسئلة قبل التسليم.</li>
            <li>تُحسب النتيجة في متصفّحك، ولا تُرسل إلى أي خادم.</li>
          </ul>
          <button type="button" className={styles.primary} onClick={() => setStarted(true)}>
            ابدأ الاختبار
          </button>
        </div>
      </PageShell>
    );
  }

  /* ---------------------------------------------------------- result --- */
  if (submitted) {
    return (
      <PageShell narrow title="نتيجة الاختبار" crumbs={crumbs}>
        <div className={result.passed ? styles.resultPass : styles.resultFail}>
          <p className={styles.resultScore} dir="ltr">
            {result.score}%
          </p>
          <p className={styles.resultLabel}>
            {result.passed ? 'أحسنت — لقد نجحت في الاختبار' : 'تحتاج إلى مراجعة الدرس'}
          </p>
          <p className={styles.resultCount}>
            الإجابات الصحيحة: <strong dir="ltr">{result.correctCount}</strong> من{' '}
            <strong dir="ltr">{total}</strong>
          </p>
        </div>

        <ol className={styles.review}>
          {result.outcomes.map((outcome, position) => (
            <li
              key={outcome.question.id}
              className={outcome.correct ? styles.reviewCorrect : styles.reviewWrong}
            >
              <span className={styles.reviewIndex} dir="ltr">
                {position + 1}
              </span>
              <span className={styles.reviewMark} aria-hidden="true">
                {outcome.correct ? '✓' : '✕'}
              </span>
              <span className={styles.reviewSkill}>
                {outcome.question.skill ?? 'سؤال'}
                {!outcome.answered ? ' — لم تُجب' : ''}
              </span>
            </li>
          ))}
        </ol>

        <p className={styles.noKey}>الحلول التفصيلية متاحة للمعلّم فقط في منطقة المعلّم.</p>

        <div className={styles.resultActions}>
          <button
            type="button"
            className={styles.secondary}
            onClick={() => {
              setAnswers({});
              setIndex(0);
              setSubmitted(false);
            }}
          >
            إعادة المحاولة
          </button>
          {lesson ? (
            <Link className={styles.primary} to={routes.lessonCompletion(lesson.id)}>
              إنهاء الدرس
            </Link>
          ) : null}
        </div>
      </PageShell>
    );
  }

  /* -------------------------------------------------------- question --- */
  if (!question) return <NotFoundPage />;

  const isLast = index === total - 1;

  return (
    <PageShell narrow title={assessment.title} crumbs={crumbs}>
      <ProgressBar current={index + 1} total={total} label="أسئلة الاختبار" />

      <p className={styles.answeredHint}>
        أجبت عن <strong dir="ltr">{answeredCount}</strong> من <strong dir="ltr">{total}</strong>{' '}
        أسئلة
      </p>

      <article className={styles.card}>
        <p className={styles.questionKicker}>
          السؤال <span dir="ltr">{index + 1}</span>
          {question.skill ? <span className={styles.skill}>{question.skill}</span> : null}
        </p>

        <div className={styles.prompt}>
          <Blocks blocks={question.prompt} />
        </div>

        {question.type === 'multiple-choice' ? (
          <ul className={styles.choices}>
            {question.choices.map((choice) => {
              const checked = answers[question.id] === choice.id;
              return (
                <li key={choice.id}>
                  <label className={checked ? styles.choiceChecked : styles.choice}>
                    <input
                      type="radio"
                      name={question.id}
                      value={choice.id}
                      checked={checked}
                      onChange={() => setAnswer(question.id, choice.id)}
                    />
                    <span className={styles.choiceBody}>
                      <Blocks blocks={choice.blocks} />
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        ) : null}

        {question.type === 'true-false' ? (
          <div className={styles.trueFalse}>
            {(
              [
                ['true', 'صح'],
                ['false', 'خطأ'],
              ] as const
            ).map(([value, label]) => (
              <label
                key={value}
                className={answers[question.id] === value ? styles.tfChecked : styles.tf}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={value}
                  checked={answers[question.id] === value}
                  onChange={() => setAnswer(question.id, value)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        ) : null}

        {question.type === 'numeric' ? (
          <label className={styles.numericField}>
            <span className="visually-hidden">الإجابة العددية</span>
            <input
              type="number"
              step="any"
              inputMode="decimal"
              dir="ltr"
              className={styles.numericInput}
              value={answers[question.id] ?? ''}
              onChange={(event) => setAnswer(question.id, event.target.value)}
            />
            {question.unit ? <span className={styles.unit}>{question.unit}</span> : null}
          </label>
        ) : null}
      </article>

      <nav className={styles.nav} aria-label="التنقّل بين الأسئلة">
        <button
          type="button"
          className={styles.secondary}
          disabled={index === 0}
          onClick={() => setIndex((value) => Math.max(0, value - 1))}
        >
          السؤال السابق
        </button>

        {isLast ? (
          <button
            type="button"
            className={styles.primary}
            onClick={() => {
              setSubmitted(true);
              recordAssessmentScore(assessment.id, gradeAssessment(assessment, answers).score);
            }}
          >
            إنهاء وتسليم
          </button>
        ) : (
          <button
            type="button"
            className={styles.primary}
            disabled={!isAnswered(question, answers)}
            onClick={() => setIndex((value) => Math.min(total - 1, value + 1))}
          >
            السؤال التالي
          </button>
        )}
      </nav>

      <ol className={styles.dots} aria-label="الانتقال إلى سؤال">
        {assessment.questions.map((item, position) => (
          <li key={item.id}>
            <button
              type="button"
              aria-label={`السؤال ${position + 1}`}
              aria-current={position === index ? 'step' : undefined}
              className={
                position === index
                  ? styles.dotActive
                  : isAnswered(item, answers)
                    ? styles.dotDone
                    : styles.dot
              }
              onClick={() => setIndex(position)}
              dir="ltr"
            >
              {position + 1}
            </button>
          </li>
        ))}
      </ol>
    </PageShell>
  );
}
