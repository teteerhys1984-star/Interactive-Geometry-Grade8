import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getTestEntry, loadSolutionSet } from '@/tests/registry';
import type { SolutionSet, TestQuestion } from '@/tests/schema';
import { Blocks } from '@/components/content';
import { RichText } from '@/components/math';
import { routes } from '@/lib/routes';
import { TestShell } from './TestShell';
import { NotFoundPage } from '../NotFoundPage';
import styles from './TestSolutionDetailPage.module.css';

/**
 * ============================================================================
 *  WORKED SOLUTIONS VIEW
 * ============================================================================
 *
 *  Shows detailed, pedagogical explanations for every question in a test.
 *  Grouped in chunks (default 5 for lessons, 10 for units) to prevent massive
 *  unmanageable pages.
 * ============================================================================
 */
export function TestSolutionDetailPage() {
  const { testId } = useParams();
  const entry = getTestEntry(testId);

  const [solutionSet, setSolutionSet] = useState<SolutionSet | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [groupIndex, setGroupIndex] = useState(0);

  useEffect(() => {
    if (!testId) return;
    let active = true;
    loadSolutionSet(testId)
      .then((set) => {
        if (!active) return;
        setSolutionSet(set);
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setSolutionSet(undefined);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [testId]);

  if (!entry) return <NotFoundPage />;
  const { definition, questions } = entry;
  const chunkSize = definition.solutionGroupSize || 5;

  // Chunk questions
  const groups: TestQuestion[][] = [];
  for (let i = 0; i < questions.length; i += chunkSize) {
    groups.push(questions.slice(i, i + chunkSize));
  }
  const currentGroup = groups[groupIndex] ?? groups[0] ?? [];

  const crumbs = [
    { label: 'الرئيسية', to: routes.home() },
    { label: 'منطقة الاختبارات', to: routes.tests() },
    { label: 'حلول الاختبارات', to: routes.testSolutions() },
    { label: definition.title },
  ];

  return (
    <TestShell
      title={`حلول ${definition.title}`}
      lead="تفسيرات هندسية دقيقة وخطوات معللة لكل سؤال من أسئلة الاختبار."
      crumbs={crumbs}
      actions={
        <Link to={entry.href} className={styles.takeTestBtn}>
          الانتقال إلى تقديم الاختبار ←
        </Link>
      }
      narrow
    >
      {/* Group selector tabs */}
      {groups.length > 1 ? (
        <nav className={styles.groupTabs} aria-label="مجموعات الأسئلة">
          {groups.map((_, idx) => {
            const startNum = idx * chunkSize + 1;
            const endNum = Math.min((idx + 1) * chunkSize, questions.length);
            const isActive = idx === groupIndex;
            return (
              <button
                key={idx}
                type="button"
                className={`${styles.groupTab} ${isActive ? styles.activeTab : ''}`}
                onClick={() => setGroupIndex(idx)}
              >
                الأسئلة{' '}
                <span dir="ltr">
                  {startNum}–{endNum}
                </span>
              </button>
            );
          })}
        </nav>
      ) : null}

      {loading ? (
        <p className={styles.loading}>جارٍ تحميل الحلول...</p>
      ) : !solutionSet ? (
        <div className={styles.errorNotice}>
          <p>لم يتم العثور على حزمة الحلول لهذا الاختبار بعد.</p>
        </div>
      ) : (
        <div className={styles.solutionsList}>
          {currentGroup.map((question, pos) => {
            const globalNumber = groupIndex * chunkSize + pos + 1;
            const sol = solutionSet.solutions[question.id];

            return (
              <article key={question.id} className={styles.solutionCard}>
                <header className={styles.cardHeader}>
                  <span className={styles.questionIndexBadge} dir="ltr">
                    السؤال {globalNumber}
                  </span>
                  <div className={styles.promptSummary}>
                    <Blocks blocks={question.prompt} />
                  </div>
                </header>

                {sol ? (
                  <div className={styles.solutionBody}>
                    <div className={styles.answerRow}>
                      <span className={styles.answerTag}>الإجابة الصحيحة:</span>
                      <strong className={styles.answerSummary}>
                        <RichText text={sol.answerSummary} />
                      </strong>
                    </div>

                    <div className={styles.stepsSection}>
                      <span className={styles.sectionLabel}>التعليل وخطوات الحل:</span>
                      <div className={styles.stepsContent}>
                        <Blocks blocks={sol.steps} />
                      </div>
                    </div>

                    {sol.rule ? (
                      <div className={styles.metaRow}>
                        <span className={styles.metaLabel}>القاعدة أو الخاصية:</span>
                        <span className={styles.metaText}>
                          <RichText text={sol.rule} />
                        </span>
                      </div>
                    ) : null}

                    {sol.check ? (
                      <div className={styles.metaRow}>
                        <span className={styles.metaLabel}>طريقة التحقق:</span>
                        <span className={styles.metaText}>
                          <RichText text={sol.check} />
                        </span>
                      </div>
                    ) : null}

                    {sol.commonError ? (
                      <div className={`${styles.metaRow} ${styles.warningRow}`}>
                        <span className={styles.metaLabel}>خطأ شائع يجب الانتباه له:</span>
                        <span className={styles.metaText}>
                          <RichText text={sol.commonError} />
                        </span>
                      </div>
                    ) : null}

                    {question.sourceRefs.length > 0 ? (
                      <footer className={styles.sourceFooter}>
                        مرجع الكتاب المدرسي: ص. {question.sourceRefs.map((r) => r.page).join('، ')}
                        {question.sourceRefs[0]?.locator
                          ? ` (${question.sourceRefs[0].locator})`
                          : ''}
                      </footer>
                    ) : null}
                  </div>
                ) : (
                  <p className={styles.missingSol}>الحل قيد التدقيق.</p>
                )}
              </article>
            );
          })}
        </div>
      )}
    </TestShell>
  );
}
