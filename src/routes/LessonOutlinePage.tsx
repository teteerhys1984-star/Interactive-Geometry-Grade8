import { Link, useParams } from 'react-router-dom';
import { PageShell } from '@/components/layout';
import { getLesson, lessonDiagrams, subject } from '@/content/registry';
import { routes } from '@/lib/routes';
import { RichText } from '@/components/math';
import { loadProgress } from '@/lib/progress';
import { NotFoundPage } from './NotFoundPage';
import styles from './LessonOutlinePage.module.css';

export function LessonOutlinePage() {
  const { lessonId } = useParams();
  const entry = lessonId ? getLesson(lessonId) : undefined;
  if (!entry) return <NotFoundPage />;

  const { lesson, unit } = entry;
  const progress = loadProgress();
  const lessonProgress = progress.lessons[lesson.id];
  const viewed = new Set(lessonProgress?.completedStepIds ?? []);
  const started = viewed.size > 0;
  const diagrams = lessonDiagrams(lesson);
  // Count DISTINCT figures: the pavement figure is shown in two steps.
  const referenceCount = new Set(
    diagrams.filter((diagram) => diagram.kind === 'reference').map((diagram) => diagram.id),
  ).size;

  const resumeIndex = lesson.steps.findIndex((step) => !viewed.has(step.id));
  const resumeStep = resumeIndex === -1 ? 1 : resumeIndex + 1;

  return (
    <PageShell
      narrow
      title={lesson.title}
      crumbs={[
        { label: 'الرئيسية', to: routes.home() },
        { label: subject.title, to: routes.subject(subject.id) },
        { label: unit.title, to: routes.unit(unit.id) },
        { label: lesson.title },
      ]}
    >
      <div className={styles.meta}>
        <span className={styles.chip}>
          <span dir="ltr">{lesson.steps.length}</span>{' '}
          {lesson.steps.length >= 11 ? 'خطوة' : 'خطوات'}
        </span>
        <span className={styles.chip}>
          المصدر: صفحة <span dir="ltr">{String(lesson.source.page)}</span>
        </span>
        {lesson.assessment ? (
          <span className={styles.chip}>
            اختبار نهائي: <span dir="ltr">{lesson.assessment.questions.length}</span> أسئلة
          </span>
        ) : null}
        {referenceCount > 0 ? (
          <span className={`${styles.chip} ${styles.chipReference}`}>
            <span dir="ltr">{referenceCount}</span> أشكال تتطلّب الرجوع إلى الكتاب
          </span>
        ) : null}
      </div>

      {lesson.summary ? <p className={styles.summary}>{lesson.summary}</p> : null}

      {lesson.objectives.length > 0 ? (
        <section aria-labelledby="objectives">
          <h2 id="objectives">أهداف الدرس</h2>
          <ul>
            {lesson.objectives.map((objective, index) => (
              <li key={index}>
                <RichText text={objective} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {lesson.vocabulary.length > 0 ? (
        <section aria-labelledby="vocabulary">
          <h2 id="vocabulary">المفردات والمصطلحات</h2>
          <dl className={styles.vocab}>
            {lesson.vocabulary.map((item) => (
              <div key={item.term} className={styles.vocabRow}>
                <dt>{item.term}</dt>
                <dd>
                  <RichText text={item.definition} />
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      <section aria-labelledby="steps">
        <h2 id="steps">مخطّط الدرس</h2>
        <ol className={styles.steps}>
          {lesson.steps.map((step, index) => {
            const isViewed = viewed.has(step.id);
            return (
              <li key={step.id} className={styles.stepItem}>
                <Link to={routes.lessonStep(lesson.id, index + 1)} className={styles.stepLink}>
                  <span
                    className={isViewed ? styles.stepNumberDone : styles.stepNumber}
                    dir="ltr"
                    aria-hidden="true"
                  >
                    {isViewed ? '✓' : index + 1}
                  </span>
                  <span className={styles.stepBody}>
                    {step.kicker ? (
                      <span
                        className={
                          step.origin === 'authored' ? styles.stepKickerAuthored : styles.stepKicker
                        }
                      >
                        {step.kicker}
                      </span>
                    ) : null}
                    <span className={styles.stepTitle}>{step.title}</span>
                  </span>
                  {step.source ? (
                    <span className={styles.stepPage} dir="ltr">
                      {String(step.source.page)}
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ol>

        {lesson.assessment ? (
          <Link className={styles.assessmentLink} to={routes.assessment(lesson.assessment.id)}>
            <span className={styles.assessmentIcon} aria-hidden="true">
              ★
            </span>
            <span className={styles.stepBody}>
              <span className={styles.stepKicker}>بعد الخطوة الأخيرة</span>
              <span className={styles.stepTitle}>{lesson.assessment.title}</span>
            </span>
          </Link>
        ) : null}
      </section>

      <Link className={styles.start} to={routes.lessonStep(lesson.id, resumeStep)}>
        {started ? 'متابعة الدرس' : 'ابدأ الدرس'}
      </Link>
    </PageShell>
  );
}
