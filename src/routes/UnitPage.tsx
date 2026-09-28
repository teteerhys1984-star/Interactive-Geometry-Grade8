import { useParams } from 'react-router-dom';
import { PageShell } from '@/components/layout';
import { Card, EmptyState } from '@/components/ui';
import { getUnit, subject } from '@/content/registry';
import { routes } from '@/lib/routes';
import { NotFoundPage } from './NotFoundPage';
import styles from './ListPage.module.css';

export function UnitPage() {
  const { unitId } = useParams();
  const unit = unitId ? getUnit(unitId) : undefined;
  if (!unit) return <NotFoundPage />;

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
        <div className={styles.grid}>
          {unit.lessons.map((lesson) => (
            <Card
              key={lesson.id}
              title={lesson.title}
              description={lesson.summary ?? undefined}
              to={routes.lesson(lesson.id)}
              meta={
                <>
                  <span>{lesson.steps.length} خطوات</span>
                  <span>
                    صفحة <span dir="ltr">{String(lesson.source.page)}</span>
                  </span>
                </>
              }
            />
          ))}
        </div>
      )}

      {unit.assessment ? (
        <section className={styles.section}>
          <h2>تقويم الوحدة</h2>
          <Card title={unit.assessment.title} to={routes.assessment(unit.assessment.id)} />
        </section>
      ) : null}
    </PageShell>
  );
}
