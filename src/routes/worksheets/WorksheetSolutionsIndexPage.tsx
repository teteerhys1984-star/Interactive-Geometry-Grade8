import { Link } from 'react-router-dom';
import { PageShell } from '@/components/layout';
import { routes } from '@/lib/routes';
import { getSchoolWorksheet } from '@/worksheets/registry';
import { worksheetSolutionSets } from '@/worksheets/solutions/registry';
import { WorksheetSectionNav } from './WorksheetSectionNav';
import styles from './WorksheetsPage.module.css';

export function WorksheetSolutionsIndexPage() {
  return (
    <PageShell
      title="حلول أوراق العمل"
      lead="حلول تعليمية مفصّلة مستقلة عن ورقة الطالب، مرتّبة حسب الصفحات والأسئلة الأصلية. متاحة لجميع المستخدمين دون تسجيل دخول."
      crumbs={[
        { label: 'الرئيسية', to: routes.home() },
        { label: 'أوراق عمل مدرسية', to: routes.worksheets() },
        { label: 'حلول أوراق العمل' },
      ]}
    >
      <WorksheetSectionNav />
      <div className={styles.grid}>
        {worksheetSolutionSets.map((set) => {
          const worksheet = getSchoolWorksheet(set.worksheetId)!;
          const solved = set.entries.filter((entry) => entry.status === 'solved').length;
          return (
            <article key={set.worksheetId} className={styles.card}>
              <span>
                {worksheet.gradeLabel} · {worksheet.institutionLabel}
              </span>
              <h2 className={styles.cardTitle}>{worksheet.title}</h2>
              <p>
                حلول الفقرات والمطالب الفرعية:{' '}
                <strong dir="ltr">
                  {solved} / {set.entries.length}
                </strong>
              </p>
              <div className={styles.cardFooter}>
                <Link
                  className={styles.primaryBtn}
                  to={routes.worksheetSolutionSet(set.worksheetId)}
                >
                  فتح الحلول التفصيلية
                </Link>
                <Link to={routes.worksheet(set.worksheetId)}>فتح ورقة العمل الأصلية</Link>
              </div>
            </article>
          );
        })}
        {worksheetSolutionSets.length === 0 ? <p>لا توجد حلول منشورة حالياً.</p> : null}
      </div>
    </PageShell>
  );
}
