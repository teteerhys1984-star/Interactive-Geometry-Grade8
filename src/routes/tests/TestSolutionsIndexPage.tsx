import { Link } from 'react-router-dom';
import { catalog } from '@/tests/registry';
import { routes } from '@/lib/routes';
import { TestShell } from './TestShell';
import styles from './TestSolutionsIndexPage.module.css';

/**
 * ============================================================================
 *  SOLUTIONS AREA — INDEX PAGE
 * ============================================================================
 *
 *  Independent solutions section inside the Test Area (never in Teacher Area).
 *  Lists all authored solution sets by category:
 *  - Lesson test solutions
 *  - Unit test solutions
 * ============================================================================
 */
export function TestSolutionsIndexPage() {
  const crumbs = [
    { label: 'الرئيسية', to: routes.home() },
    { label: 'منطقة الاختبارات', to: routes.tests() },
    { label: 'حلول الاختبارات' },
  ];

  return (
    <TestShell
      title="حلول الاختبارات والتفسيرات الهندسية"
      lead="تفسيرات تربوية خطوة بخطوة لكل سؤال، مع بيان الخاصية الهندسية المعتمدة وخطوات التحقق ورصد الأخطاء الشائعة."
      crumbs={crumbs}
    >
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>حلول اختبارات الدروس</h2>
        <div className={styles.list}>
          {catalog.lessonTests.map((entry) => (
            <Link key={entry.definition.id} to={entry.solutionHref} className={styles.solutionItem}>
              <div className={styles.itemBody}>
                <span className={styles.itemBadge}>حلول اختبار درس</span>
                <strong className={styles.itemTitle}>{entry.definition.title}</strong>
                <span className={styles.itemMeta}>
                  {entry.questions.length} سؤالاً محلولاً · مقسمة على مجموعات لسهولة القراءة
                </span>
              </div>
              <span className={styles.arrow} aria-hidden="true">
                ‹
              </span>
            </Link>
          ))}
        </div>
      </section>

      {catalog.unitTests.length > 0 ? (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>حلول اختبارات الوحدات</h2>
          <div className={styles.list}>
            {catalog.unitTests.map((entry) => (
              <Link
                key={entry.definition.id}
                to={entry.solutionHref}
                className={styles.solutionItem}
              >
                <div className={styles.itemBody}>
                  <span className={styles.itemBadge}>حلول اختبار وحدة</span>
                  <strong className={styles.itemTitle}>{entry.definition.title}</strong>
                  <span className={styles.itemMeta}>{entry.questions.length} سؤالاً محلولاً</span>
                </div>
                <span className={styles.arrow} aria-hidden="true">
                  ‹
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </TestShell>
  );
}
