import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PageShell } from '@/components/layout';
import { getLesson, getLessonNeighbours, lessonDiagrams, subject } from '@/content/registry';
import { routes } from '@/lib/routes';
import { markLessonCompleted } from '@/lib/progress';
import { NotFoundPage } from './NotFoundPage';
import styles from './CompletionPage.module.css';

export function CompletionPage() {
  const { lessonId } = useParams();
  const entry = lessonId ? getLesson(lessonId) : undefined;

  useEffect(() => {
    if (entry) markLessonCompleted(entry.lesson.id);
  }, [entry]);

  if (!entry) return <NotFoundPage />;
  const { lesson, unit } = entry;
  const { next } = getLessonNeighbours(lesson.id);
  const diagrams = lessonDiagrams(lesson);
  // Count DISTINCT figures: the pavement figure is shown in two steps.
  const referenceCount = new Set(
    diagrams.filter((diagram) => diagram.kind === 'reference').map((diagram) => diagram.id),
  ).size;

  return (
    <PageShell
      narrow
      title=""
      crumbs={[
        { label: 'الرئيسية', to: routes.home() },
        { label: subject.title, to: routes.subject(subject.id) },
        { label: unit.title, to: routes.unit(unit.id) },
        { label: lesson.title, to: routes.lesson(lesson.id) },
        { label: 'الإنجاز' },
      ]}
    >
      <div className={styles.card}>
        <span className={styles.badge} aria-hidden="true">
          ✓
        </span>
        <h1 className={styles.title}>أحسنت! أكملت الدرس</h1>
        <p className={styles.lesson}>{lesson.title}</p>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue} dir="ltr">
              {lesson.steps.length}
            </span>
            <span className={styles.statLabel}>خطوة مكتملة</span>
          </div>
          {referenceCount > 0 ? (
            <div className={styles.stat}>
              <span className={styles.statValue} dir="ltr">
                {referenceCount}
              </span>
              <span className={styles.statLabel}>أشكال راجعها في الكتاب</span>
            </div>
          ) : null}
        </div>
      </div>

      <div className={styles.actions}>
        <Link className={styles.secondary} to={routes.lesson(lesson.id)}>
          مراجعة الدرس
        </Link>
        {lesson.assessment ? (
          <Link className={styles.secondary} to={routes.assessment(lesson.assessment.id)}>
            إعادة الاختبار النهائي
          </Link>
        ) : null}
        {unit.assessment ? (
          <Link className={styles.secondary} to={routes.assessment(unit.assessment.id)}>
            تقويم الوحدة
          </Link>
        ) : null}
        {next ? (
          <Link className={styles.primary} to={routes.lesson(next.lesson.id)}>
            الدرس التالي: {next.lesson.title}
          </Link>
        ) : subject.finalAssessment ? (
          <Link className={styles.primary} to={routes.assessment(subject.finalAssessment.id)}>
            التقويم النهائي
          </Link>
        ) : (
          <Link className={styles.primary} to={routes.unit(unit.id)}>
            العودة إلى الوحدة
          </Link>
        )}
      </div>

      {!next ? (
        <p className={styles.note}>
          هذا آخر درس متاح حالياً. ستُضاف الدروس التالية تباعاً من الكتاب المدرسي.
        </p>
      ) : null}
    </PageShell>
  );
}
