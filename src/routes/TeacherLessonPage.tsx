import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PageShell } from '@/components/layout';
import { Callout, EmptyState } from '@/components/ui';
import { Blocks } from '@/components/content';
import { RichText } from '@/components/math';
import { TeacherGate } from '@/components/teacher';
import { getLesson, referenceFigures } from '@/content/registry';
import type { FlatLesson } from '@/content/registry';
import type { Lesson } from '@/content/schema';
import { routes } from '@/lib/routes';
import { NotFoundPage } from './NotFoundPage';
import styles from './TeacherLessonPage.module.css';

/**
 * ============================================================================
 *  TEACHER AREA — ONE LESSON.
 * ============================================================================
 *
 *  The lesson's teacher material is split into four navigable sections (tabs)
 *  instead of one long page:
 *
 *    1. «حلول أسئلة الكتاب»      — platform-derived textbook solutions
 *    2. «مفتاح الاختبار النهائي»  — answer key with justifications
 *    3. «تقرير الأشكال»           — figures that still refer to the book
 *    4. «الملاحظات التربوية»      — pedagogical notes
 *
 *  Everything is read from the content registry via the :lessonId route param,
 *  so a future Lesson 3 works here with zero changes to this file.
 *
 *  STUDENTS NEVER REACH THIS CONTENT: every panel renders only inside
 *  <TeacherGate>, behind the shared passphrase.
 * ============================================================================
 */

type TabId = 'solutions' | 'assessment' | 'figures' | 'notes';

const TABS: readonly { id: TabId; label: string }[] = [
  { id: 'solutions', label: 'حلول أسئلة الكتاب' },
  { id: 'assessment', label: 'مفتاح الاختبار النهائي' },
  { id: 'figures', label: 'تقرير الأشكال' },
  { id: 'notes', label: 'الملاحظات التربوية' },
];

export function TeacherLessonPage() {
  const { lessonId } = useParams();
  const entry = lessonId ? getLesson(lessonId) : undefined;
  if (!entry) return <NotFoundPage />;

  const { lesson, unit } = entry;

  return (
    <PageShell
      title={`منطقة المعلّم — ${lesson.title}`}
      crumbs={[
        { label: 'الرئيسية', to: routes.home() },
        { label: 'منطقة المعلّم', to: routes.teacher() },
        { label: lesson.title },
      ]}
      lead={`موارد المعلّم الخاصة بهذا الدرس — ${unit.title}.`}
    >
      <TeacherGate>{({ lock }) => <LessonTeacherArea entry={entry} onLock={lock} />}</TeacherGate>
    </PageShell>
  );
}

function LessonTeacherArea({ entry, onLock }: { entry: FlatLesson; onLock: () => void }) {
  const { lesson } = entry;
  const [activeTab, setActiveTab] = useState<TabId>('solutions');

  const sourceSteps = lesson.steps.filter((step) => step.origin === 'source');
  const authoredSteps = lesson.steps.filter((step) => step.origin === 'authored');
  const printedQuestionCount = sourceSteps.reduce(
    (total, step) =>
      total +
      step.blocks.reduce(
        (inner, block) => inner + (block.type === 'questionGroup' ? block.items.length : 0),
        0,
      ),
    0,
  );
  const figures = referenceFigures.filter((item) => item.lesson.id === lesson.id);

  return (
    <div>
      <div className={styles.toolbar}>
        <Link to={routes.teacher()} className={styles.backLink}>
          كل الدروس ←
        </Link>
        <button type="button" className={styles.secondary} onClick={onLock}>
          قفل المنطقة
        </button>
      </div>

      {/* -------------------------------------------------- source coverage --- */}
      <ul className={styles.coverage} aria-label="تغطية المصدر">
        <li>
          صفحات الكتاب:{' '}
          <strong className="numeric" dir="ltr">
            {String(lesson.source.page)}
          </strong>
        </li>
        <li>
          خطوات منقولة حرفياً من الكتاب:{' '}
          <strong className="numeric" dir="ltr">
            {sourceSteps.length}
          </strong>
        </li>
        <li>
          خطوات شرح من إعداد المنصّة:{' '}
          <strong className="numeric" dir="ltr">
            {authoredSteps.length}
          </strong>
        </li>
        <li>
          أسئلة الكتاب المطبوعة:{' '}
          <strong className="numeric" dir="ltr">
            {printedQuestionCount}
          </strong>
        </li>
        <li>
          أسئلة الاختبار النهائي:{' '}
          <strong className="numeric" dir="ltr">
            {lesson.assessment ? lesson.assessment.questions.length : 0}
          </strong>
        </li>
      </ul>

      {/* --------------------------------------------------------- sections --- */}
      <div className={styles.tablist} role="tablist" aria-label="أقسام منطقة المعلّم">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`teacher-tab-${tab.id}`}
            aria-selected={activeTab === tab.id}
            aria-controls={`teacher-panel-${tab.id}`}
            className={activeTab === tab.id ? `${styles.tab} ${styles.tabActive}` : styles.tab}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/*
        All four panels stay mounted and are toggled with `hidden`, so any
        <details> the teacher opened keeps its state while switching sections.
      */}
      <section
        role="tabpanel"
        id="teacher-panel-solutions"
        aria-labelledby="teacher-tab-solutions"
        hidden={activeTab !== 'solutions'}
        className={styles.panel}
      >
        <SolutionsPanel lesson={lesson} />
      </section>

      <section
        role="tabpanel"
        id="teacher-panel-assessment"
        aria-labelledby="teacher-tab-assessment"
        hidden={activeTab !== 'assessment'}
        className={styles.panel}
      >
        <AnswerKeyPanel lesson={lesson} />
      </section>

      <section
        role="tabpanel"
        id="teacher-panel-figures"
        aria-labelledby="teacher-tab-figures"
        hidden={activeTab !== 'figures'}
        className={styles.panel}
      >
        <FigureReportPanel lesson={lesson} figures={figures} />
      </section>

      <section
        role="tabpanel"
        id="teacher-panel-notes"
        aria-labelledby="teacher-tab-notes"
        hidden={activeTab !== 'notes'}
        className={styles.panel}
      >
        <NotesPanel lesson={lesson} />
      </section>
    </div>
  );
}

/**
 * «حلول المعلم» — solutions DERIVED by this platform from the printed
 * questions. The textbook prints no answers, so these are never labelled as
 * the book's answers, and each one carries its `limitation` note when it
 * depends on a part of a figure that could not be read.
 */
function SolutionsPanel({ lesson }: { lesson: Lesson }) {
  const solutions = lesson.teacherResources?.textbookSolutions ?? [];
  if (solutions.length === 0) {
    return (
      <EmptyState
        title="لا توجد حلول لأسئلة الكتاب بعد"
        description="عند إعداد «حلول المعلم» لهذا الدرس ستظهر هنا."
      />
    );
  }

  return (
    <>
      <Callout variant="warning" title="حلول المعلم — ليست إجابات الكتاب">
        <p>
          الصفحات المعنيّة من الكتاب لا تتضمّن إجابات مطبوعة. الحلول التالية مستنتجة من قِبل المنصّة
          اعتماداً على نصّ السؤال وعلى خواص الانسحاب، وهي للاسترشاد فقط.
        </p>
      </Callout>

      <ol className={styles.solutionList}>
        {solutions.map((solution) => (
          <li key={solution.id}>
            <details className={styles.solution}>
              <summary className={styles.solutionSummary}>
                <span className={styles.solutionRef}>{solution.reference}</span>
                <span className={styles.solutionQuestion}>
                  <RichText text={solution.question} />
                </span>
              </summary>
              <div className={styles.solutionBody}>
                <p className={styles.solutionBadge}>حلول المعلم (مستنتجة من المنصّة)</p>
                <Blocks blocks={solution.blocks} />
                {solution.limitation ? (
                  <Callout variant="warning" title="حدود هذا الحل">
                    <p>
                      <RichText text={solution.limitation} />
                    </p>
                  </Callout>
                ) : null}
              </div>
            </details>
          </li>
        ))}
      </ol>
    </>
  );
}

/** The answer key for the platform's own end-of-lesson assessment. */
function AnswerKeyPanel({ lesson }: { lesson: Lesson }) {
  const assessment = lesson.assessment;
  if (!assessment) {
    return (
      <EmptyState
        title="لا يوجد اختبار نهائي لهذا الدرس بعد"
        description="عند إعداد الاختبار النهائي لهذا الدرس سيظهر مفتاح إجاباته هنا."
      />
    );
  }

  return (
    <>
      <Callout variant="warning" title="لا تُعرض هذه الإجابات للتلاميذ">
        <p>
          مفتاح الإجابات التالي خاص بالمعلّم. شاشة نتيجة التلميذ تعرض الدرجة وعلامة صح أو خطأ لكل
          سؤال فقط، ولا تعرض أي تعليل.
        </p>
      </Callout>

      <ol className={styles.solutionList}>
        {assessment.questions.map((question, index) => (
          <li key={question.id}>
            <details className={styles.solution}>
              <summary className={styles.solutionSummary}>
                <span className={styles.solutionRef}>
                  السؤال <span dir="ltr">{index + 1}</span>
                  {question.skill ? ` — ${question.skill}` : ''}
                </span>
                <span className={styles.solutionQuestion}>
                  <Blocks blocks={question.prompt} />
                </span>
              </summary>
              <div className={styles.solutionBody}>
                <p className={styles.answerLine}>
                  الإجابة الصحيحة:{' '}
                  <strong>
                    {question.type === 'true-false'
                      ? question.answer
                        ? 'صح'
                        : 'خطأ'
                      : question.type === 'numeric'
                        ? `${question.answer}${question.unit ? ` ${question.unit}` : ''}`
                        : `الخيار رقم ${
                            question.choices.findIndex(
                              (choice) => choice.id === question.correctChoiceId,
                            ) + 1
                          }`}
                  </strong>
                </p>
                {question.type === 'multiple-choice' ? (
                  <ol className={styles.keyChoices}>
                    {question.choices.map((choice) => (
                      <li
                        key={choice.id}
                        className={
                          choice.id === question.correctChoiceId
                            ? styles.keyChoiceCorrect
                            : undefined
                        }
                      >
                        <Blocks blocks={choice.blocks} />
                      </li>
                    ))}
                  </ol>
                ) : null}
                {question.explanation ? <Blocks blocks={question.explanation} /> : null}
              </div>
            </details>
          </li>
        ))}
      </ol>
    </>
  );
}

/**
 * «تقرير الأشكال» — the figures of THIS lesson that resolved to the faithful
 * `reference` placeholder. A deliberate editorial outcome, not unfinished
 * work: they stayed «راجع الكتاب» because they could not be reproduced
 * faithfully.
 */
function FigureReportPanel({
  lesson,
  figures,
}: {
  lesson: Lesson;
  figures: typeof referenceFigures;
}) {
  if (figures.length === 0) {
    return (
      <EmptyState
        title="لا توجد أشكال مرجعية في هذا الدرس"
        description="كل أشكال هذا الدرس معاد إنتاجها داخل المنصّة، ولا شيء منها يحيل إلى الكتاب."
      />
    );
  }

  return (
    <>
      <p className={styles.muted}>
        هذه الأشكال لم يكن من الممكن إعادة إنتاجها بأمانة، فعُرضت للتلميذ كإحالة إلى الكتاب. هذا
        خيار تحريري مقصود وليس عملاً ناقصاً.
      </p>
      <ul className={styles.referenceList} aria-label={`الأشكال المرجعية في ${lesson.title}`}>
        {figures.map(({ diagram }) => (
          <li key={diagram.id} className={styles.referenceItem}>
            <span className={styles.referencePage} dir="ltr">
              {String(diagram.source.page)}
            </span>
            <span>
              {diagram.source.locator ? <strong>{diagram.source.locator}</strong> : null}
              {diagram.reason ? <span className={styles.muted}> · {diagram.reason}</span> : null}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

/** «الملاحظات التربوية» — the platform's pedagogical notes for this lesson. */
function NotesPanel({ lesson }: { lesson: Lesson }) {
  const notes = lesson.teacherResources?.notes ?? [];
  if (notes.length === 0) {
    return (
      <EmptyState
        title="لا توجد ملاحظات تربوية بعد"
        description="عند إعداد ملاحظات تربوية لهذا الدرس ستظهر هنا."
      />
    );
  }
  return <Blocks blocks={notes} />;
}
