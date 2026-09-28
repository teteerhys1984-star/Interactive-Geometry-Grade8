import { useState } from 'react';
import { PageShell } from '@/components/layout';
import { Callout, EmptyState } from '@/components/ui';
import { Blocks } from '@/components/content';
import { RichText } from '@/components/math';
import { allLessons, isCourseEmpty, referenceFigures, subject } from '@/content/registry';
import type { Lesson } from '@/content/schema';
import { routes } from '@/lib/routes';
import { isTeacherUnlocked, lockTeacherArea, unlockTeacherArea } from '@/lib/teacherAccess';
import { loadProgress, resetProgress } from '@/lib/progress';
import styles from './TeacherPage.module.css';

/**
 * Teacher Area.
 *
 * Gated by a shared client-side passphrase. See `src/lib/teacherAccess.ts` —
 * this is a convenience speed bump, NOT security. A static GitHub Pages site
 * cannot keep secrets.
 */
export function TeacherPage() {
  const [unlocked, setUnlocked] = useState(isTeacherUnlocked);

  return (
    <PageShell
      title="منطقة المعلّم"
      crumbs={[{ label: 'الرئيسية', to: routes.home() }, { label: 'منطقة المعلّم' }]}
      lead="لوحة عمل للمعلّم: بنية المقرر، تغطية المصدر، حلول أسئلة الكتاب، مفتاح إجابات الاختبار، وتقرير الأشكال."
    >
      {unlocked ? (
        <TeacherDashboard
          onLock={() => {
            lockTeacherArea();
            setUnlocked(false);
          }}
        />
      ) : (
        <PassphraseGate onUnlock={() => setUnlocked(true)} />
      )}
    </PageShell>
  );
}

function PassphraseGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (unlockTeacherArea(value)) {
      setError(false);
      onUnlock();
    } else {
      setError(true);
    }
  }

  return (
    <div className={styles.gate}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="teacher-pass" className={styles.label}>
          كلمة المرور المشتركة
        </label>
        <input
          id="teacher-pass"
          type="password"
          dir="ltr"
          autoComplete="off"
          className={styles.input}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        {error ? (
          <p role="alert" className={styles.error}>
            كلمة المرور غير صحيحة.
          </p>
        ) : null}
        <button type="submit" className={styles.submit}>
          دخول
        </button>
      </form>

      <Callout variant="warning" title="تنبيه أمني مهم">
        <p>
          هذا الموقع ثابت (Static) ويُستضاف على GitHub Pages، ولا يوجد فيه خادم أو قاعدة بيانات أو
          نظام مصادقة. كلمة المرور موجودة داخل ملفات الموقع ويمكن لأي شخص قراءتها.
        </p>
        <p>
          الغرض منها منع الدخول العرضي للطلاب فقط، وليست حماية حقيقية. لا تضع خلفها أي بيانات سرّية
          أو درجات أو معلومات شخصية.
        </p>
      </Callout>
    </div>
  );
}

function TeacherDashboard({ onLock }: { onLock: () => void }) {
  const progress = loadProgress();
  const lessonCount = subject.units.reduce((total, unit) => total + unit.lessons.length, 0);
  const completedCount = Object.values(progress.lessons).filter((item) => item.completed).length;

  return (
    <div>
      <div className={styles.toolbar}>
        <button type="button" className={styles.secondary} onClick={onLock}>
          قفل المنطقة
        </button>
        <button
          type="button"
          className={styles.secondary}
          onClick={() => {
            resetProgress();
            window.location.reload();
          }}
        >
          إعادة تعيين تقدّم هذا الجهاز
        </button>
      </div>

      <section>
        <h2>ملخّص المقرر</h2>
        <ul>
          <li>
            عدد الوحدات:{' '}
            <span className="numeric" dir="ltr">
              {subject.units.length}
            </span>
          </li>
          <li>
            عدد الدروس:{' '}
            <span className="numeric" dir="ltr">
              {lessonCount}
            </span>
          </li>
          <li>
            الدروس المكتملة على هذا الجهاز:{' '}
            <span className="numeric" dir="ltr">
              {completedCount}
            </span>
          </li>
        </ul>
      </section>

      <section>
        <h2>بنية المقرر</h2>
        {isCourseEmpty ? (
          <EmptyState
            title="لا توجد وحدات بعد"
            description="ستظهر بنية الوحدات والدروس هنا فور إضافة محتوى الكتاب المدرسي."
          />
        ) : (
          <ol>
            {subject.units.map((unit) => (
              <li key={unit.id}>
                {unit.title}
                <ol>
                  {unit.lessons.map((lesson) => (
                    <li key={lesson.id}>
                      {lesson.title}{' '}
                      <span className={styles.source}>
                        (المصدر: {lesson.source.book} — ص{' '}
                        <span className="numeric" dir="ltr">
                          {String(lesson.source.page)}
                        </span>
                        )
                      </span>
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ol>
        )}
      </section>

      <section>
        <h2>الأشكال التي تتطلّب الرجوع إلى الكتاب</h2>
        {referenceFigures.length === 0 ? (
          <p>لا توجد أشكال من هذا النوع.</p>
        ) : (
          <>
            <p className={styles.source}>
              هذه الأشكال لم يكن من الممكن إعادة إنتاجها بأمانة، فعُرضت كإحالة إلى الكتاب. هذا خيار
              تحريري مقصود وليس عملاً ناقصاً.
            </p>
            <ul className={styles.referenceList}>
              {referenceFigures.map(({ lesson, diagram }) => (
                <li key={diagram.id} className={styles.referenceItem}>
                  <span className={styles.referencePage} dir="ltr">
                    {String(diagram.source.page)}
                  </span>
                  <span>
                    <strong>{lesson.title}</strong>
                    {diagram.source.locator ? ` — ${diagram.source.locator}` : null}
                    {diagram.reason ? (
                      <span className={styles.source}> · {diagram.reason}</span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      {allLessons.map(({ lesson }) => (
        <LessonTeacherResources key={lesson.id} lesson={lesson} />
      ))}

      <Callout variant="note" title="ملاحظة">
        <p>
          بيانات التقدّم محفوظة في متصفّح هذا الجهاز فقط (localStorage)، ولا تُرسل إلى أي خادم ولا
          تُشارك بين الأجهزة.
        </p>
      </Callout>
    </div>
  );
}

/**
 * ============================================================================
 *  LESSON TEACHER RESOURCES
 * ============================================================================
 *
 *  Rendered ONLY inside the unlocked Teacher Area.
 *
 *  Two distinct bodies of material, deliberately kept apart:
 *    A. «حلول المعلم» — solutions DERIVED by this platform from the printed
 *       questions. The textbook prints no answers, so these are never labelled
 *       as the book's answers, and each one carries its `limitation` note when
 *       it depends on a part of a figure that could not be read.
 *    B. The answer key for the platform's own 10-question assessment, with the
 *       correct answer, the justification, and the common wrong reasoning.
 *
 *  Students never reach this component: it renders behind the passphrase gate.
 * ============================================================================
 */
function LessonTeacherResources({ lesson }: { lesson: Lesson }) {
  const resources = lesson.teacherResources;
  const assessment = lesson.assessment;
  if (!resources && !assessment) return null;

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

  return (
    <section className={styles.resources}>
      <h2>موارد المعلّم — {lesson.title}</h2>

      {/* ------------------------------------------------- source coverage --- */}
      <h3>تغطية المصدر</h3>
      <ul className={styles.coverage}>
        <li>
          صفحات الكتاب المُغطّاة:{' '}
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
          أسئلة الاختبار من إعداد المنصّة:{' '}
          <strong className="numeric" dir="ltr">
            {assessment ? assessment.questions.length : 0}
          </strong>
        </li>
      </ul>

      {/* ------------------------------------------------ teacher solutions --- */}
      {resources && resources.textbookSolutions.length > 0 ? (
        <>
          <h3>حلول المعلم لأسئلة الكتاب</h3>
          <Callout variant="warning" title="حلول المعلم — ليست إجابات الكتاب">
            <p>
              الصفحات المعنيّة من الكتاب لا تتضمّن إجابات مطبوعة. الحلول التالية مستنتجة من قِبل
              المنصّة اعتماداً على نصّ السؤال وعلى خواص الانسحاب، وهي للاسترشاد فقط.
            </p>
          </Callout>

          <ol className={styles.solutionList}>
            {resources.textbookSolutions.map((solution) => (
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
      ) : null}

      {/* ----------------------------------------------------- answer key --- */}
      {assessment ? (
        <>
          <h3>مفتاح إجابات الاختبار النهائي</h3>
          <Callout variant="warning" title="لا تُعرض هذه الإجابات للتلاميذ">
            <p>
              مفتاح الإجابات التالي خاص بالمعلّم. شاشة نتيجة التلميذ تعرض الدرجة وعلامة صح أو خطأ
              لكل سؤال فقط، ولا تعرض أي تعليل.
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
      ) : null}

      {/* -------------------------------------------------- teacher notes --- */}
      {resources && resources.notes.length > 0 ? (
        <>
          <h3>ملاحظات تربوية</h3>
          <Blocks blocks={resources.notes} />
        </>
      ) : null}
    </section>
  );
}
