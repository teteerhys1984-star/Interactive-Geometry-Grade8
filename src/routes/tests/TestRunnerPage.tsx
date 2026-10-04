import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getTestEntry } from '@/tests/registry';
import { clearTestSession, loadTestSession, saveTestSession } from '@/tests/session';
import { gradeTest, isAnswered } from '@/tests/scoring';
import {
  ANSWER_INSTRUCTIONS,
  DIFFICULTY_LABELS,
  QUESTION_TYPE_LABELS,
  type AnswerMap,
  type AnswerValue,
} from '@/tests/schema';
import { routes } from '@/lib/routes';
import { TestShell } from './TestShell';
import { QuestionRenderer } from './QuestionRenderer';
import { NotFoundPage } from '../NotFoundPage';
import styles from './TestRunnerPage.module.css';

/**
 * ============================================================================
 *  TEST RUNNER PAGE
 * ============================================================================
 *
 *  Full test taking experience:
 *  1. Intro screen with blueprint summary and instructions.
 *  2. Step-by-step question runner:
 *     - One question at a time
 *     - Clear question counter & progress bar
 *     - Jump rail to jump to any question (marks Answered vs Unanswered)
 *     - Previous / Next / Skip controls
 *     - ZERO feedback or solution leakage before submit
 *  3. Submit confirmation & deterministic grading
 *  4. Result review screen with score %, count correct/incorrect, review list,
 *     link to pedagogical solutions, and Restart button.
 * ============================================================================
 */
export function TestRunnerPage() {
  const { testId } = useParams();
  const entry = getTestEntry(testId);

  // Load existing session or default
  const savedSession = testId ? loadTestSession(testId) : undefined;

  const [answers, setAnswers] = useState<AnswerMap>(savedSession?.answers ?? {});
  const [index, setIndex] = useState<number>(savedSession?.currentIndex ?? 0);
  const [submitted, setSubmitted] = useState<boolean>(savedSession?.submitted ?? false);
  const [started, setStarted] = useState<boolean>(
    Boolean(
      savedSession && (savedSession.submitted || Object.keys(savedSession.answers).length > 0),
    ),
  );

  if (!entry) return <NotFoundPage />;
  const { definition, questions } = entry;
  const total = questions.length;
  const currentQuestion = questions[index];

  const persist = (nextAnswers: AnswerMap, nextIndex: number, nextSubmitted: boolean) => {
    saveTestSession({
      testId: definition.id,
      answers: nextAnswers,
      currentIndex: nextIndex,
      submitted: nextSubmitted,
    });
  };

  const handleAnswerChange = (val: AnswerValue) => {
    if (!currentQuestion) return;
    const nextAnswers: AnswerMap = { ...answers, [currentQuestion.id]: val };
    setAnswers(nextAnswers);
    persist(nextAnswers, index, submitted);
  };

  const handleRestart = () => {
    clearTestSession(definition.id);
    setAnswers({});
    setIndex(0);
    setSubmitted(false);
    setStarted(false);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    persist(answers, index, true);
  };

  const crumbs = [
    { label: 'الرئيسية', to: routes.home() },
    { label: 'منطقة الاختبارات', to: routes.tests() },
    { label: definition.title },
  ];

  /* ------------------------------------------------------------- 1. Intro */
  if (!started && !submitted) {
    return (
      <TestShell title={definition.title} lead={definition.summary} crumbs={crumbs} narrow>
        <div className={styles.introCard}>
          <div className={styles.introMetaGrid}>
            <div className={styles.introMetaItem}>
              <span className={styles.metaLabel}>عدد الأسئلة</span>
              <strong className={styles.metaVal} dir="ltr">
                {total}
              </strong>
            </div>
            <div className={styles.introMetaItem}>
              <span className={styles.metaLabel}>درجة النجاح</span>
              <strong className={styles.metaVal} dir="ltr">
                {definition.passingScore}%
              </strong>
            </div>
            <div className={styles.introMetaItem}>
              <span className={styles.metaLabel}>نوع الاختبار</span>
              <strong className={styles.metaVal}>
                {definition.scope === 'lesson'
                  ? 'اختبار درس'
                  : definition.scope === 'unit'
                    ? 'اختبار وحدة'
                    : 'شامل'}
              </strong>
            </div>
          </div>

          <div className={styles.introInstructions}>
            <h3>تعليمات هامة قبل البدء:</h3>
            <ul>
              <li>{definition.instructions}</li>
              <li>يظهر سؤال واحد في كل خطوة، ويمكنك التنقّل والمراجعة والعودة بحرية.</li>
              <li>لن تظهر أية نتيجة أو مؤشرات إجابة صحيحة/خاطئة حتى تضغط على «تسليم الاختبار».</li>
              <li>تُحفظ إجاباتك محلياً في متصفحك حتى لا تضيع في حال انقطاع الجلسة.</li>
            </ul>
          </div>

          <div className={styles.introActions}>
            <button
              type="button"
              className={styles.primaryBtnLarge}
              onClick={() => {
                setStarted(true);
                persist(answers, index, false);
              }}
            >
              بدء الاختبار الآن
            </button>
            <Link to={entry.solutionHref} className={styles.textLink}>
              الانتقال مباشرة لحلول هذا الاختبار ←
            </Link>
          </div>
        </div>
      </TestShell>
    );
  }

  /* ------------------------------------------------------------ 2. Result */
  if (submitted) {
    const result = gradeTest(definition.id, definition.passingScore, questions, answers);

    return (
      <TestShell title="نتيجة الاختبار" crumbs={crumbs} narrow>
        <div className={`${styles.resultBanner} ${result.passed ? styles.passed : styles.failed}`}>
          <p className={styles.resultScoreText} dir="ltr">
            {result.score}%
          </p>
          <h2 className={styles.resultHeading}>
            {result.passed
              ? 'أحسنت! اجتزت الاختبار بنجاح'
              : 'تحتاج إلى مراجعة بعض المفاهيم الهندسية'}
          </h2>
          <div className={styles.resultStatsRow}>
            <span>
              الإجابات الصحيحة: <strong dir="ltr">{result.correct}</strong>
            </span>
            <span>
              الإجابات الخاطئة: <strong dir="ltr">{result.incorrect}</strong>
            </span>
            <span>
              غير مجاب: <strong dir="ltr">{result.unanswered}</strong>
            </span>
            <span>
              المجموع: <strong dir="ltr">{result.total}</strong>
            </span>
          </div>
        </div>

        <section className={styles.reviewSection} aria-labelledby="review-heading">
          <h3 id="review-heading" className={styles.reviewHeading}>
            مراجعة الأسئلة
          </h3>
          <ol className={styles.reviewList}>
            {result.outcomes.map((item, pos) => {
              const q = questions[pos];
              if (!q) return null;
              const isCorrect = item.outcome === 'correct';
              const isUnanswered = item.outcome === 'unanswered';

              return (
                <li
                  key={item.questionId}
                  className={`${styles.reviewItem} ${
                    isCorrect
                      ? styles.revCorrect
                      : isUnanswered
                        ? styles.revUnanswered
                        : styles.revIncorrect
                  }`}
                >
                  <div className={styles.reviewItemHeader}>
                    <span className={styles.revNum} dir="ltr">
                      {pos + 1}
                    </span>
                    <span className={styles.revStatus}>
                      {isCorrect
                        ? '✓ إجابة صحيحة'
                        : isUnanswered
                          ? '— لم تتم الإجابة'
                          : '✕ إجابة خاطئة'}
                    </span>
                    <span className={styles.revType}>
                      {QUESTION_TYPE_LABELS[q.type]} · {DIFFICULTY_LABELS[q.difficulty]}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <div className={styles.resultFooterActions}>
          <button type="button" className={styles.secondaryBtn} onClick={handleRestart}>
            إعادة الاختبار (Restart)
          </button>
          <Link to={entry.solutionHref} className={styles.primaryBtnLarge}>
            عرض الحلول والتفسيرات التفصيلية
          </Link>
        </div>
      </TestShell>
    );
  }

  /* ---------------------------------------------------------- 3. Runner */
  if (!currentQuestion) return <NotFoundPage />;

  const answeredCount = questions.filter((q) => isAnswered(q, answers[q.id])).length;
  const progressPercent = Math.round(((index + 1) / total) * 100);

  return (
    <TestShell title={definition.title} crumbs={crumbs} narrow>
      {/* Top progress bar */}
      <div className={styles.runnerHeader}>
        <div className={styles.runnerMeta}>
          <span className={styles.stepCounter}>
            السؤال <strong dir="ltr">{index + 1}</strong> من <strong dir="ltr">{total}</strong>
          </span>
          <span className={styles.answeredCounter}>
            المُجاب: <strong dir="ltr">{answeredCount}</strong> / {total}
          </span>
        </div>
        <div className={styles.progressBarTrack} role="progressbar" aria-valuenow={progressPercent}>
          <div className={styles.progressBarFill} style={{ inlineSize: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Question metadata badge */}
      <div className={styles.questionKickerRow}>
        <span className={styles.badgeType}>{QUESTION_TYPE_LABELS[currentQuestion.type]}</span>
        <span className={styles.badgeDiff}>{DIFFICULTY_LABELS[currentQuestion.difficulty]}</span>
        <span className={styles.instructionText}>{ANSWER_INSTRUCTIONS[currentQuestion.type]}</span>
      </div>

      {/* Main question interactive renderer */}
      <QuestionRenderer
        question={currentQuestion}
        value={answers[currentQuestion.id]}
        onChange={handleAnswerChange}
      />

      {/* Navigation controls */}
      <div className={styles.navRow}>
        <button
          type="button"
          className={styles.navBtn}
          disabled={index === 0}
          onClick={() => {
            const nextIdx = Math.max(0, index - 1);
            setIndex(nextIdx);
            persist(answers, nextIdx, false);
          }}
        >
          → السؤال السابق
        </button>

        {index === total - 1 ? (
          <button type="button" className={styles.submitBtn} onClick={handleSubmit}>
            تسليم الاختبار وإنهاؤه
          </button>
        ) : (
          <button
            type="button"
            className={styles.nextBtn}
            onClick={() => {
              const nextIdx = Math.min(total - 1, index + 1);
              setIndex(nextIdx);
              persist(answers, nextIdx, false);
            }}
          >
            السؤال التالي ←
          </button>
        )}
      </div>

      {/* Jump dots rail */}
      <nav className={styles.railWrapper} aria-label="أرقام الأسئلة">
        <ol className={styles.railList}>
          {questions.map((q, pos) => {
            const isCurrent = pos === index;
            const hasAns = isAnswered(q, answers[q.id]);
            return (
              <li key={q.id}>
                <button
                  type="button"
                  dir="ltr"
                  aria-label={`السؤال ${pos + 1}`}
                  aria-current={isCurrent ? 'step' : undefined}
                  className={`${styles.railDot} ${isCurrent ? styles.activeDot : ''} ${
                    hasAns ? styles.answeredDot : ''
                  }`}
                  onClick={() => {
                    setIndex(pos);
                    persist(answers, pos, false);
                  }}
                >
                  {pos + 1}
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </TestShell>
  );
}
