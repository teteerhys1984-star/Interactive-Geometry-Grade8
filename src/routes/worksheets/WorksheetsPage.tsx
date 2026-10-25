import { Link } from 'react-router-dom';
import { PageShell } from '@/components/layout';
import { Callout, EmptyState } from '@/components/ui';
import { routes } from '@/lib/routes';
import {
  countWorksheetItems,
  countWorksheetQuestionGroups,
  schoolWorksheets,
} from '@/worksheets/registry';
import { WorksheetSectionNav } from './WorksheetSectionNav';
import styles from './WorksheetsPage.module.css';

/**
 * ============================================================================
 *  SCHOOL WORKSHEETS («أوراق عمل مدرسية») — LANDING PAGE
 * ============================================================================
 *
 *  Dedicated, top-level section for school worksheets, completely independent
 *  from the textbook lessons (`src/content/`) and the Test Area (`src/tests/`).
 * ============================================================================
 */
export function WorksheetsPage() {
  const totalPages = schoolWorksheets.reduce((sum, ws) => sum + ws.pages.length, 0);
  const totalQuestionGroups = schoolWorksheets.reduce(
    (sum, ws) => sum + countWorksheetQuestionGroups(ws),
    0,
  );

  return (
    <PageShell
      title="أوراق عمل مدرسية"
      lead="قسم مخصّص لأوراق العمل المدرسية المرقمنة بأمانة عن النسخ الأصلية، مع الحفاظ على ترتيب الأسئلة والرموز الرياضية والأشكال الهندسية والصفحات المرجعية."
      crumbs={[{ label: 'الرئيسية', to: routes.home() }, { label: 'أوراق عمل مدرسية' }]}
    >
      <WorksheetSectionNav />
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <span className={styles.statValue} dir="ltr">
            {schoolWorksheets.length}
          </span>
          <span className={styles.statLabel}>أوراق عمل منشورة</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue} dir="ltr">
            {totalPages}
          </span>
          <span className={styles.statLabel}>صفحات أصلية</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue} dir="ltr">
            {totalQuestionGroups}
          </span>
          <span className={styles.statLabel}>أسئلة رئيسية</span>
        </div>
      </div>

      {schoolWorksheets.length === 0 ? (
        <EmptyState
          title="لا توجد أوراق عمل مدرسية منشورة حالياً"
          description="ستُضاف أوراق العمل المدرسية هنا تباعاً مع الحفاظ على نصوصها وأشكالها الأصلية."
        />
      ) : (
        <section className={styles.section} aria-labelledby="worksheets-list-heading">
          <div className={styles.sectionHeader}>
            <h2 id="worksheets-list-heading" className={styles.sectionTitle}>
              أوراق العمل المتاحة
            </h2>
            <p className={styles.sectionDesc}>
              اختر ورقة العمل لاستعراض صفحاتها وأسئلتها وأشكالها الهندسية والتدرّب عليها مباشرةً.
            </p>
          </div>

          <div className={styles.grid}>
            {schoolWorksheets.map((worksheet) => {
              const groupCount = countWorksheetQuestionGroups(worksheet);
              const itemCount = countWorksheetItems(worksheet);
              const questionTitles = worksheet.pages.flatMap((page) =>
                page.questionGroups.map((group) => group.title),
              );

              return (
                <article key={worksheet.id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div className={styles.badges}>
                      <span className={styles.badgePrimary}>{worksheet.gradeLabel}</span>
                      {worksheet.institutionLabel ? (
                        <span className={styles.badgeSecondary}>{worksheet.institutionLabel}</span>
                      ) : null}
                    </div>
                    <span className={styles.badgeSecondary}>
                      عدد الصفحات: <strong dir="ltr">{worksheet.pages.length}</strong>
                    </span>
                  </div>

                  <h3 className={styles.cardTitle}>{worksheet.title}</h3>
                  <p className={styles.cardSummary}>{worksheet.summary}</p>

                  <ol className={styles.groupPreviewList} aria-label="أقسام ورقة العمل">
                    {questionTitles.map((title, idx) => (
                      <li key={idx}>{title}</li>
                    ))}
                  </ol>

                  <div className={styles.cardFooter}>
                    <div className={styles.metaList}>
                      <span>
                        الأسئلة الرئيسية: <strong dir="ltr">{groupCount}</strong>
                      </span>
                      <span>
                        الفقرات والمسائل: <strong dir="ltr">{itemCount}</strong>
                      </span>
                    </div>
                    <Link to={routes.worksheet(worksheet.id)} className={styles.primaryBtn}>
                      فتح ورقة العمل
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      <Callout variant="note" title="استقلالية أوراق العمل المدرسية">
        <p>
          تُعرض أوراق العمل في هذا القسم مستقلةً عن دروس الكتاب المدرسي وبنك الاختبارات، مع إتاحة
          الصور الأصلية لكل صفحة كمرجع بصري مباشر إلى جانب النصوص والأشكال الهندسية المرقمنة.
        </p>
      </Callout>
    </PageShell>
  );
}
