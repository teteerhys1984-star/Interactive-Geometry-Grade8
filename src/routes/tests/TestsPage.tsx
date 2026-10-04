import { Link } from 'react-router-dom';
import { catalog, totalQuestionCount } from '@/tests/registry';
import { testSessionStatus, SESSION_STATUS_LABELS } from '@/tests/session';
import { routes } from '@/lib/routes';
import { TestShell } from './TestShell';
import styles from './TestsPage.module.css';

/**
 * ============================================================================
 *  TEST AREA — HOMEPAGE
 * ============================================================================
 *
 *  Main landing page for tests. Completely DATA-DRIVEN via `catalog`:
 *  - Lesson Tests
 *  - Unit Tests
 *  - Comprehensive Tests (only renders if any exist — none invented)
 *  - Solutions Area entry card
 *
 *  Never enumerates lessons manually; adding a new lesson test definition
 *  causes it to appear here automatically.
 * ============================================================================
 */
export function TestsPage() {
  const lessonTests = catalog.lessonTests;
  const unitTests = catalog.unitTests;
  const compTests = catalog.comprehensiveTests;
  const totalQuestions = totalQuestionCount();

  const crumbs = [{ label: 'الرئيسية', to: routes.home() }, { label: 'منطقة الاختبارات' }];

  return (
    <TestShell
      title="منطقة الاختبارات"
      lead="نظام اختبارات مستقل لقياس فهمك الهندسي لكل درس ووحدة، بأسئلة أصلية وحلول تعليمية خطوة بخطوة."
      crumbs={crumbs}
      actions={
        <Link to={routes.testSolutions()} className={styles.solutionsLink}>
          الانتقال إلى حلول الاختبارات ←
        </Link>
      }
    >
      <div className={styles.overviewStats}>
        <div className={styles.statBox}>
          <span className={styles.statNumber} dir="ltr">
            {lessonTests.length}
          </span>
          <span className={styles.statLabel}>اختبارات الدروس</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.statNumber} dir="ltr">
            {unitTests.length}
          </span>
          <span className={styles.statLabel}>اختبارات الوحدات</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.statNumber} dir="ltr">
            {totalQuestions}
          </span>
          <span className={styles.statLabel}>سؤالاً في بنك الاختبارات</span>
        </div>
      </div>

      {/* ── Lesson Tests ── */}
      <section className={styles.section} aria-labelledby="lesson-tests-heading">
        <div className={styles.sectionHeader}>
          <h2 id="lesson-tests-heading" className={styles.sectionTitle}>
            اختبارات الدروس
          </h2>
          <p className={styles.sectionDesc}>
            اختبر فهمك المعمق لكل درس بمفرده فور الانتهاء من دراسته.
          </p>
        </div>

        <div className={styles.grid}>
          {lessonTests.map((entry) => {
            const status = testSessionStatus(entry.definition.id);
            return (
              <article key={entry.definition.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardBadge}>اختبار درس</span>
                  <span className={`${styles.statusBadge} ${styles[status]}`}>
                    {SESSION_STATUS_LABELS[status]}
                  </span>
                </div>
                <h3 className={styles.cardTitle}>{entry.definition.title}</h3>
                <p className={styles.cardSummary}>{entry.definition.summary}</p>
                <div className={styles.cardMeta}>
                  <span>
                    عدد الأسئلة: <strong dir="ltr">{entry.questions.length}</strong>
                  </span>
                  <span>
                    درجة النجاح: <strong dir="ltr">{entry.definition.passingScore}%</strong>
                  </span>
                </div>
                <div className={styles.cardActions}>
                  <Link to={entry.href} className={styles.primaryBtn}>
                    {status === 'not-started'
                      ? 'بدء الاختبار'
                      : status === 'in-progress'
                        ? 'متابعة الاختبار'
                        : 'عرض النتيجة / إعادة المحاولة'}
                  </Link>
                  <Link to={entry.solutionHref} className={styles.secondaryBtn}>
                    عرض الحلول
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── Unit Tests ── */}
      <section className={styles.section} aria-labelledby="unit-tests-heading">
        <div className={styles.sectionHeader}>
          <h2 id="unit-tests-heading" className={styles.sectionTitle}>
            اختبارات الوحدات
          </h2>
          <p className={styles.sectionDesc}>
            اختبار شامل يجمع موضوعات الوحدة الأولى كاملة ويقيس الربط بين المفاهيم.
          </p>
        </div>

        {unitTests.length === 0 ? (
          <p className={styles.emptyNotice}>لا توجد اختبارات وحدات منشورة حالياً.</p>
        ) : (
          <div className={styles.grid}>
            {unitTests.map((entry) => {
              const status = testSessionStatus(entry.definition.id);
              return (
                <article key={entry.definition.id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardBadge}>اختبار وحدة</span>
                    <span className={`${styles.statusBadge} ${styles[status]}`}>
                      {SESSION_STATUS_LABELS[status]}
                    </span>
                  </div>
                  <h3 className={styles.cardTitle}>{entry.definition.title}</h3>
                  <p className={styles.cardSummary}>{entry.definition.summary}</p>
                  <div className={styles.cardMeta}>
                    <span>
                      عدد الأسئلة: <strong dir="ltr">{entry.questions.length}</strong>
                    </span>
                    <span>
                      درجة النجاح: <strong dir="ltr">{entry.definition.passingScore}%</strong>
                    </span>
                  </div>
                  <div className={styles.cardActions}>
                    <Link to={entry.href} className={styles.primaryBtn}>
                      {status === 'not-started' ? 'بدء الاختبار' : 'متابعة الاختبار'}
                    </Link>
                    <Link to={entry.solutionHref} className={styles.secondaryBtn}>
                      عرض الحلول
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* ── Comprehensive Tests (Only if authored; zero fake data) ── */}
      {compTests.length > 0 ? (
        <section className={styles.section} aria-labelledby="comp-tests-heading">
          <div className={styles.sectionHeader}>
            <h2 id="comp-tests-heading" className={styles.sectionTitle}>
              الاختبارات الشاملة
            </h2>
          </div>
          <div className={styles.grid}>
            {compTests.map((entry) => (
              <article key={entry.definition.id} className={styles.card}>
                <h3 className={styles.cardTitle}>{entry.definition.title}</h3>
                <Link to={entry.href} className={styles.primaryBtn}>
                  بدء الاختبار
                </Link>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {/* ── Solutions Area Banner ── */}
      <section className={styles.solutionsBanner}>
        <div>
          <h2 className={styles.bannerTitle}>حلول الاختبارات التفصيلية</h2>
          <p className={styles.bannerDesc}>
            تفسيرات تربوية مدعّمة بالخواص الهندسية وخطوات الحل والتحقق ورصد الأخطاء الشائعة، مستقلة
            عن منطقة المعلم.
          </p>
        </div>
        <Link to={routes.testSolutions()} className={styles.primaryBtn}>
          استعراض الحلول
        </Link>
      </section>
    </TestShell>
  );
}
