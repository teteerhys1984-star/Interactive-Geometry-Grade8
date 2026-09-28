import { Navigate, useParams } from 'react-router-dom';
import { PageShell } from '@/components/layout';
import { Card, EmptyState } from '@/components/ui';
import { subject } from '@/content/registry';
import { routes } from '@/lib/routes';
import styles from './ListPage.module.css';

export function SubjectPage() {
  const { subjectId } = useParams();
  if (subjectId !== subject.id) return <Navigate to={routes.home()} replace />;

  return (
    <PageShell
      title={subject.title}
      lead={subject.description}
      crumbs={[{ label: 'الرئيسية', to: routes.home() }, { label: subject.title }]}
    >
      {subject.units.length === 0 ? (
        <EmptyState
          title="لا توجد وحدات بعد"
          description="ستُضاف الوحدات تباعًا اعتمادًا على صفحات الكتاب المدرسي الأصلية."
        />
      ) : (
        <div className={styles.grid}>
          {subject.units.map((unit) => (
            <Card
              key={unit.id}
              title={unit.title}
              description={unit.summary ?? undefined}
              to={routes.unit(unit.id)}
              meta={<span>{unit.lessons.length} دروس</span>}
            />
          ))}
        </div>
      )}

      {subject.finalAssessment ? (
        <section className={styles.section}>
          <h2>التقويم النهائي</h2>
          <Card
            title={subject.finalAssessment.title}
            to={routes.assessment(subject.finalAssessment.id)}
          />
        </section>
      ) : null}
    </PageShell>
  );
}
