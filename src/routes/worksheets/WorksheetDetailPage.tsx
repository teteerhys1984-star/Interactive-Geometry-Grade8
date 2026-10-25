import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Diagram } from '@/components/diagram';
import { PageShell } from '@/components/layout';
import { LtrIsolate, RichText } from '@/components/math';
import { Callout } from '@/components/ui';
import { assetUrl } from '@/lib/assets';
import { routes } from '@/lib/routes';
import { NotFoundPage } from '@/routes/NotFoundPage';
import {
  countWorksheetItems,
  countWorksheetQuestionGroups,
  getSchoolWorksheet,
} from '@/worksheets/registry';
import type { WorksheetPage, WorksheetQuestionGroup } from '@/worksheets/schema';
import { WorksheetSectionNav } from './WorksheetSectionNav';
import styles from './WorksheetDetailPage.module.css';

type ViewMode = 'all' | 'page-1' | 'page-2' | 'scans';

export function WorksheetDetailPage() {
  const { worksheetId = '' } = useParams<{ worksheetId: string }>();
  const worksheet = getSchoolWorksheet(worksheetId);

  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const [openScans, setOpenScans] = useState<Record<number, boolean>>({});
  const [zoomedScans, setZoomedScans] = useState<Record<number, boolean>>({});

  // Student practice workspace state (ungraded; no fabricated answer key)
  const [mcqSelections, setMcqSelections] = useState<Record<string, string>>({});
  const [agreeVerdicts, setAgreeVerdicts] = useState<Record<string, 'agree' | 'disagree'>>({});
  const [agreeReasons, setAgreeReasons] = useState<Record<string, string>>({});
  const [blankAnswers, setBlankAnswers] = useState<Record<string, string>>({});
  const [proofNotes, setProofNotes] = useState<Record<string, string>>({});

  if (!worksheet) {
    return <NotFoundPage />;
  }

  const hasWorkspaceInput =
    Object.keys(mcqSelections).length > 0 ||
    Object.keys(agreeVerdicts).length > 0 ||
    Object.values(agreeReasons).some((v) => v.trim().length > 0) ||
    Object.values(blankAnswers).some((v) => v.trim().length > 0) ||
    Object.values(proofNotes).some((v) => v.trim().length > 0);

  const resetWorkspace = () => {
    setMcqSelections({});
    setAgreeVerdicts({});
    setAgreeReasons({});
    setBlankAnswers({});
    setProofNotes({});
  };

  const toggleScan = (pageNumber: number) => {
    setOpenScans((prev) => ({ ...prev, [pageNumber]: !prev[pageNumber] }));
  };

  const toggleZoomScan = (pageNumber: number) => {
    setZoomedScans((prev) => ({ ...prev, [pageNumber]: !prev[pageNumber] }));
  };

  const visiblePages: WorksheetPage[] = worksheet.pages.filter((page) => {
    if (viewMode === 'page-1') return page.pageNumber === 1;
    if (viewMode === 'page-2') return page.pageNumber === 2;
    return true;
  });

  const renderQuestionGroup = (group: WorksheetQuestionGroup) => {
    switch (group.kind) {
      case 'multiple-choice':
        return (
          <section
            key={group.id}
            className={styles.questionGroupCard}
            aria-labelledby={`heading-${group.id}`}
          >
            <h3 id={`heading-${group.id}`} className={styles.groupHeading}>
              {group.title}
            </h3>
            <ol className={styles.mcqList}>
              {group.items.map((item) => {
                const selected = mcqSelections[item.id];
                return (
                  <li key={item.id} className={styles.mcqRow}>
                    <div className={styles.mcqStemRow}>
                      <span className={styles.numberBox} dir="ltr">
                        {item.number}
                      </span>
                      <p className={styles.mcqPromptText}>
                        <RichText text={item.prompt} />
                      </p>
                    </div>
                    <div
                      className={styles.mcqOptionsGrid}
                      role="radiogroup"
                      aria-label={`خيارات الفقرة ${item.number}`}
                    >
                      {item.options.map((opt) => {
                        const isChosen = selected === opt.id;
                        return (
                          <label
                            key={opt.id}
                            className={isChosen ? styles.mcqOptionSelected : styles.mcqOptionLabel}
                          >
                            <input
                              type="radio"
                              name={`mcq-${item.id}`}
                              value={opt.id}
                              checked={isChosen}
                              onChange={() =>
                                setMcqSelections((prev) => ({ ...prev, [item.id]: opt.id }))
                              }
                              className={styles.hiddenRadio}
                            />
                            <LtrIsolate className={styles.optionLetter}>{opt.id}</LtrIsolate>
                            <span className={styles.optionText}>
                              <RichText text={opt.text} />
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        );

      case 'agree-disagree':
        return (
          <section
            key={group.id}
            className={styles.questionGroupCard}
            aria-labelledby={`heading-${group.id}`}
          >
            <h3 id={`heading-${group.id}`} className={styles.groupHeading}>
              {group.title}
            </h3>
            <ol className={styles.statementList}>
              {group.items.map((item) => {
                const verdict = agreeVerdicts[item.id];
                const reason = agreeReasons[item.id] ?? '';
                return (
                  <li key={item.id} className={styles.statementItem}>
                    <div className={styles.statementHeader}>
                      <span className={styles.itemMarker}>{item.label}</span>
                      <p className={styles.statementText}>
                        <RichText text={item.text} />
                      </p>
                    </div>
                    <div className={styles.agreeControls}>
                      <div
                        className={styles.verdictGroup}
                        role="radiogroup"
                        aria-label={`الحكم على العبارة ${item.label}`}
                      >
                        <label
                          className={
                            verdict === 'agree' ? styles.verdictSelected : styles.verdictOption
                          }
                        >
                          <input
                            type="radio"
                            name={`verdict-${item.id}`}
                            value="agree"
                            checked={verdict === 'agree'}
                            onChange={() =>
                              setAgreeVerdicts((prev) => ({ ...prev, [item.id]: 'agree' }))
                            }
                            className={styles.hiddenRadio}
                          />
                          <span>موافق</span>
                        </label>
                        <label
                          className={
                            verdict === 'disagree' ? styles.verdictSelected : styles.verdictOption
                          }
                        >
                          <input
                            type="radio"
                            name={`verdict-${item.id}`}
                            value="disagree"
                            checked={verdict === 'disagree'}
                            onChange={() =>
                              setAgreeVerdicts((prev) => ({ ...prev, [item.id]: 'disagree' }))
                            }
                            className={styles.hiddenRadio}
                          />
                          <span>غير موافق</span>
                        </label>
                      </div>
                      <input
                        type="text"
                        value={reason}
                        onChange={(e) =>
                          setAgreeReasons((prev) => ({ ...prev, [item.id]: e.target.value }))
                        }
                        placeholder="التعليل عند عدم الموافقة..."
                        aria-label={`تعليل العبارة ${item.label}`}
                        className={styles.textField}
                      />
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        );

      case 'fill-blanks':
        return (
          <section
            key={group.id}
            className={styles.questionGroupCard}
            aria-labelledby={`heading-${group.id}`}
          >
            <h3 id={`heading-${group.id}`} className={styles.groupHeading}>
              {group.title}
            </h3>
            <ol className={styles.statementList}>
              {group.items.map((item) => {
                const value = blankAnswers[item.id] ?? '';
                return (
                  <li key={item.id} className={styles.statementItem}>
                    <div className={styles.statementHeader}>
                      <span className={styles.itemMarker}>{item.label}</span>
                      <p className={styles.statementText}>
                        <RichText text={item.text} />
                      </p>
                    </div>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) =>
                        setBlankAnswers((prev) => ({ ...prev, [item.id]: e.target.value }))
                      }
                      placeholder="اكتب ما يناسب الفراغ..."
                      aria-label={`إكمال الفراغ ${item.label}`}
                      className={styles.textField}
                    />
                  </li>
                );
              })}
            </ol>
          </section>
        );

      case 'problems':
        return (
          <section
            key={group.id}
            className={styles.questionGroupCard}
            aria-labelledby={`heading-${group.id}`}
          >
            <h3 id={`heading-${group.id}`} className={styles.groupHeading}>
              {group.title}
            </h3>
            <div className={styles.problemsList}>
              {group.problems.map((problem) => (
                <article
                  key={problem.id}
                  className={styles.problemCard}
                  aria-labelledby={`heading-${problem.id}`}
                >
                  <div className={styles.problemContent}>
                    <div className={styles.problemHeader}>
                      <h4 id={`heading-${problem.id}`} className={styles.problemTitle}>
                        {problem.title}
                      </h4>
                      <p className={styles.problemStem}>
                        <RichText text={problem.stem} />
                      </p>
                    </div>

                    <ol className={styles.subItemsList}>
                      {problem.subItems.map((sub) => {
                        const note = proofNotes[sub.id] ?? '';
                        return (
                          <li key={sub.id} className={styles.subItem}>
                            <div className={styles.subItemLine}>
                              <span className={styles.itemMarker}>{sub.label}</span>
                              <p className={styles.subItemText}>
                                <RichText text={sub.text} />
                              </p>
                            </div>
                            <textarea
                              value={note}
                              onChange={(e) =>
                                setProofNotes((prev) => ({ ...prev, [sub.id]: e.target.value }))
                              }
                              placeholder="مساحة تدوين خطوات الحل أو البرهان..."
                              aria-label={`حل ${problem.title} ${sub.label}`}
                              className={styles.proofTextarea}
                            />
                          </li>
                        );
                      })}
                    </ol>
                  </div>

                  {problem.diagram ? (
                    <div className={styles.problemFigureCol}>
                      <Diagram spec={problem.diagram} />
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        );
    }
  };

  return (
    <PageShell
      title={worksheet.title}
      lead={worksheet.summary}
      crumbs={[
        { label: 'الرئيسية', to: routes.home() },
        { label: 'أوراق عمل مدرسية', to: routes.worksheets() },
        { label: worksheet.title },
      ]}
    >
      <WorksheetSectionNav />
      {/* Printed header reproduction */}
      <header className={styles.printedSheetHeader} aria-label="ترويسة ورقة العمل المطبوعة">
        <div className={styles.institutionCol}>{worksheet.institutionLabel}</div>
        <div className={styles.centerTitleCol}>
          <p className={styles.gradeHeading}>{worksheet.gradeLabel}</p>
          <h2 className={styles.sheetMainHeading}>{worksheet.title}</h2>
        </div>
        <div className={styles.metaCol}>
          <span className={styles.metaChip}>
            عدد الصفحات: <strong dir="ltr">{worksheet.pages.length}</strong>
          </span>
          <span className={styles.metaChip}>
            الأسئلة الرئيسية: <strong dir="ltr">{countWorksheetQuestionGroups(worksheet)}</strong>
          </span>
          <span className={styles.metaChip}>
            إجمالي البنود: <strong dir="ltr">{countWorksheetItems(worksheet)}</strong>
          </span>
        </div>
      </header>

      {/* Page/View Filter Bar */}
      <div className={styles.toolbar}>
        <div className={styles.viewTabs} role="tablist" aria-label="عرض صفحات ورقة العمل">
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === 'all'}
            className={viewMode === 'all' ? styles.tabBtnActive : styles.tabBtn}
            onClick={() => setViewMode('all')}
          >
            كامل الورقة (الصفحتان 1 و 2)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === 'page-1'}
            className={viewMode === 'page-1' ? styles.tabBtnActive : styles.tabBtn}
            onClick={() => setViewMode('page-1')}
          >
            الصفحة 1 (الأسئلة 1–3)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === 'page-2'}
            className={viewMode === 'page-2' ? styles.tabBtnActive : styles.tabBtn}
            onClick={() => setViewMode('page-2')}
          >
            الصفحة 2 (السؤال الرابع — المسائل)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === 'scans'}
            className={viewMode === 'scans' ? styles.tabBtnActive : styles.tabBtn}
            onClick={() => setViewMode('scans')}
          >
            الصور الأصلية للورقة
          </button>
        </div>

        {hasWorkspaceInput ? (
          <button type="button" className={styles.resetBtn} onClick={resetWorkspace}>
            مسح مدخلاتي
          </button>
        ) : null}
      </div>

      {/* Main content area */}
      <div className={styles.pagesStack}>
        {visiblePages.map((page) => {
          const isScanVisible = viewMode === 'scans' || Boolean(openScans[page.pageNumber]);
          const isZoomed = Boolean(zoomedScans[page.pageNumber]);

          return (
            <section
              key={page.pageNumber}
              className={styles.pageSection}
              aria-labelledby={`page-heading-${page.pageNumber}`}
            >
              <div className={styles.pageBanner}>
                <div className={styles.pageBannerLeft}>
                  <span className={styles.pageBadge}>الصفحة {page.pageNumber}</span>
                  <h2 id={`page-heading-${page.pageNumber}`} className={styles.pageTitle}>
                    {page.title}
                  </h2>
                </div>

                {viewMode !== 'scans' ? (
                  <button
                    type="button"
                    className={styles.scanToggleBtn}
                    onClick={() => toggleScan(page.pageNumber)}
                    aria-expanded={isScanVisible}
                  >
                    {isScanVisible
                      ? `إخفاء الصورة الأصلية للصفحة ${page.pageNumber}`
                      : `عرض الصورة الأصلية للصفحة ${page.pageNumber}`}
                  </button>
                ) : null}
              </div>

              {isScanVisible ? (
                <figure className={styles.scanCard}>
                  <div className={styles.scanHeader}>
                    <figcaption className={styles.scanCaption}>
                      {page.originalImage.caption}
                    </figcaption>
                    <button
                      type="button"
                      className={styles.scanToggleBtn}
                      onClick={() => toggleZoomScan(page.pageNumber)}
                      aria-pressed={isZoomed}
                    >
                      {isZoomed ? 'الحجم العادي' : 'تكبير الصورة الأصلية'}
                    </button>
                  </div>
                  <div className={styles.scanImageWrap}>
                    <img
                      src={assetUrl(page.originalImage.src)}
                      alt={page.originalImage.alt}
                      className={isZoomed ? styles.scanImageZoomed : styles.scanImage}
                      loading="lazy"
                    />
                  </div>
                </figure>
              ) : null}

              {viewMode !== 'scans'
                ? page.questionGroups.map((group) => renderQuestionGroup(group))
                : null}

              {viewMode !== 'scans' && page.footerNote ? (
                <p className={styles.sheetFooterNote}>{page.footerNote}</p>
              ) : null}
            </section>
          );
        })}
      </div>

      {worksheet.sourceNotes.length > 0 ? (
        <Callout variant="note" title="ملاحظات المصدر والأمانة العلمية">
          <ul>
            {worksheet.sourceNotes.map((note, idx) => (
              <li key={idx}>
                <RichText text={note} />
              </li>
            ))}
          </ul>
        </Callout>
      ) : null}
    </PageShell>
  );
}
