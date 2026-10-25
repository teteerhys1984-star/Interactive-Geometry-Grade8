import { Link, useParams } from 'react-router-dom';
import { PageShell } from '@/components/layout';
import { Diagram } from '@/components/diagram';
import { LtrIsolate, RichText } from '@/components/math';
import { Callout } from '@/components/ui';
import { assetUrl } from '@/lib/assets';
import { routes } from '@/lib/routes';
import { NotFoundPage } from '@/routes/NotFoundPage';
import { getSchoolWorksheet } from '@/worksheets/registry';
import { getWorksheetSolutions } from '@/worksheets/solutions/registry';
import type { WorksheetSolution } from '@/worksheets/solutions/schema';
import { WorksheetSectionNav } from './WorksheetSectionNav';
import styles from './WorksheetSolutions.module.css';
import sheetStyles from './WorksheetDetailPage.module.css';

function WorkedSolution({
  entry,
  label,
  question,
}: {
  entry: WorksheetSolution;
  label: string;
  question: string;
}) {
  return (
    <article className={styles.solution} data-solution-id={entry.subQuestionId ?? entry.questionId}>
      <h4 className={styles.question}>
        <span className={sheetStyles.numberBox}>{label}</span>
        <span>
          <RichText text={question} />
        </span>
      </h4>
      {entry.status === 'unresolved' ? (
        <Callout variant="warning" title="بانتظار توضيح المصدر">
          <RichText text={entry.reason} />
        </Callout>
      ) : (
        <>
          <div className={styles.answer}>
            <strong>الإجابة: </strong>
            {entry.optionId ? (
              <>
                الخيار <LtrIsolate>{entry.optionId}</LtrIsolate> —{' '}
              </>
            ) : null}
            {entry.verdict ? <strong>{entry.verdict} — </strong> : null}
            <RichText text={entry.answer} />
          </div>
          <p className={styles.reasonLabel}>خطوات الحل والتعليل</p>
          <ol className={styles.steps}>
            {entry.steps.map((step, index) => (
              <li key={index}>
                <RichText text={step} />
              </li>
            ))}
          </ol>
          {entry.sourceNote ? (
            <Callout variant="warning" title="تنبيه حول المصدر">
              <RichText text={entry.sourceNote} />
            </Callout>
          ) : null}
        </>
      )}
    </article>
  );
}

export function WorksheetSolutionDetailPage() {
  const { worksheetId = '' } = useParams<{ worksheetId: string }>();
  const worksheet = getSchoolWorksheet(worksheetId);
  const set = getWorksheetSolutions(worksheetId);
  if (!worksheet || !set) return <NotFoundPage />;
  const entryFor = (id: string) =>
    set.entries.find((entry) => (entry.subQuestionId ?? entry.questionId) === id)!;
  return (
    <PageShell
      title={`حلول — ${worksheet.title}`}
      lead={`${worksheet.gradeLabel} · ${worksheet.institutionLabel ?? ''} — شرح خطوة بخطوة وفق الصورتين الأصليتين.`}
      crumbs={[
        { label: 'الرئيسية', to: routes.home() },
        { label: 'أوراق عمل مدرسية', to: routes.worksheets() },
        { label: 'حلول أوراق العمل', to: routes.worksheetSolutions() },
        { label: worksheet.title },
      ]}
      actions={
        <Link className={styles.returnLink} to={routes.worksheet(worksheet.id)}>
          العودة إلى ورقة العمل الأصلية
        </Link>
      }
    >
      <WorksheetSectionNav />
      <Callout variant="note" title="عن هذه الحلول">
        <p>
          حلول من إعداد المنصّة وليست مفتاحاً مطبوعاً في المصدر. متاحة للجميع، ومنفصلة عن مساحة
          إجابات الطالب. تظهر التنبيهات عند وجود صياغة تحتاج إلى مراجعة المعلم.
        </p>
      </Callout>
      <nav className={styles.groupLinks} aria-label="الانتقال إلى مجموعة حلول">
        {worksheet.pages.flatMap((page) =>
          page.questionGroups.map((group) => (
            <button
              type="button"
              key={group.id}
              onClick={() => {
                document
                  .getElementById(`solution-${group.id}`)
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {group.title.split(' : ')[0]}
            </button>
          )),
        )}
      </nav>
      <div className={styles.pages}>
        {worksheet.pages.map((page) => (
          <section key={page.pageNumber} aria-labelledby={`solution-page-${page.pageNumber}`}>
            <h2 id={`solution-page-${page.pageNumber}`}>حلول الصفحة {page.pageNumber}</h2>
            <details className={styles.scan}>
              <summary>مرجع: الصورة الأصلية للصفحة {page.pageNumber}</summary>
              <figure>
                <a href={assetUrl(page.originalImage.src)} target="_blank" rel="noreferrer">
                  فتح الصورة بالحجم الأصلي
                </a>
                <img
                  className={sheetStyles.scanImage}
                  src={assetUrl(page.originalImage.src)}
                  alt={page.originalImage.alt}
                  loading="lazy"
                />
                <figcaption>{page.originalImage.caption}</figcaption>
              </figure>
            </details>
            {page.questionGroups.map((group) => (
              <section
                key={group.id}
                id={`solution-${group.id}`}
                className={styles.group}
                aria-labelledby={`solution-heading-${group.id}`}
              >
                <h3 id={`solution-heading-${group.id}`}>{group.title}</h3>
                {group.kind === 'problems'
                  ? group.problems.map((problem) => (
                      <div key={problem.id} className={styles.problem}>
                        <h4>{problem.title}</h4>
                        <p>
                          <strong>المعطيات المطبوعة: </strong>
                          <RichText text={problem.stem} />
                        </p>
                        {problem.diagram ? (
                          <div className={styles.diagram}>
                            <Diagram spec={problem.diagram} />
                          </div>
                        ) : null}
                        {problem.subItems.map((sub) => (
                          <WorkedSolution
                            key={sub.id}
                            entry={entryFor(sub.id)}
                            label={sub.label}
                            question={sub.text}
                          />
                        ))}
                      </div>
                    ))
                  : group.items.map((item) => (
                      <WorkedSolution
                        key={item.id}
                        entry={entryFor(item.id)}
                        label={'number' in item ? item.number : item.label}
                        question={'prompt' in item ? item.prompt : item.text}
                      />
                    ))}
              </section>
            ))}
          </section>
        ))}
      </div>
    </PageShell>
  );
}
