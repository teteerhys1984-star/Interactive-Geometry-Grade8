import { Link, useParams } from 'react-router-dom';
import { PageShell } from '@/components/layout';
import { Card, EmptyState } from '@/components/ui';
import { getUnit, subject } from '@/content/registry';
import { routes } from '@/lib/routes';
import { loadProgress } from '@/lib/progress';
import { NotFoundPage } from './NotFoundPage';
import styles from './UnitPage.module.css';

export function UnitPage() {
  const { unitId } = useParams();
  const unit = unitId ? getUnit(unitId) : undefined;
  if (!unit) return <NotFoundPage />;
  const progress = loadProgress();

  return (
    <PageShell
      title={unit.title}
      lead={unit.summary}
      crumbs={[
        { label: 'الرئيسية', to: routes.home() },
        { label: subject.title, to: routes.subject(subject.id) },
        { label: unit.title },
      ]}
    >
      {unit.lessons.length === 0 ? (
        <EmptyState title="لا توجد دروس في هذه الوحدة بعد" />
      ) : (
        <div className={styles.journey}>
          {unit.lessons.map((lesson, index) => {
            const completed = progress.lessons[lesson.id]?.completedStepIds.length ?? 0;
            const percent = Math.round((completed / Math.max(lesson.steps.length, 1)) * 100);
            return (
              <Link key={lesson.id} to={routes.lesson(lesson.id)} className={styles.lessonCard}>
                <span className={styles.node} dir="ltr" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={styles.body}>
                  <span className={styles.kicker}>
                    {percent === 100
                      ? 'مكتمل'
                      : percent > 0
                        ? 'قيد الدراسة'
                        : 'محطة التعلّم التالية'}
                  </span>
                  <strong className={styles.title}>{lesson.title}</strong>
                  {lesson.summary ? <span className={styles.summary}>{lesson.summary}</span> : null}
                  <span className={styles.meta}>
                    <span>{lesson.steps.length} خطوات</span>
                    <span>
                      صفحة <span dir="ltr">{String(lesson.source.page)}</span>
                    </span>
                    <span dir="ltr">{percent}%</span>
                  </span>
                </span>
                <span className={styles.action} aria-hidden="true">
                  ‹
                </span>
              </Link>
            );
          })}
        </div>
      )}

      {unit.assessment ? (
        <section className={styles.assessment}>
          <h2>تقويم الوحدة</h2>
          <Card title={unit.assessment.title} to={routes.assessment(unit.assessment.id)} />
        </section>
      ) : null}
    </PageShell>
  );
}
