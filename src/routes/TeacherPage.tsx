import { Link } from 'react-router-dom';
import { PageShell } from '@/components/layout';
import { Callout, EmptyState } from '@/components/ui';
import { TeacherGate } from '@/components/teacher';
import { isCourseEmpty, referenceFigures, subject } from '@/content/registry';
import type { Lesson } from '@/content/schema';
import { routes } from '@/lib/routes';
import { loadProgress, resetProgress } from '@/lib/progress';
import styles from './TeacherPage.module.css';

/**
 * ============================================================================
 *  TEACHER AREA — landing dashboard (lesson picker).
 * ============================================================================
 *
 *  Past the passphrase gate the teacher no longer gets one giant page mixing
 *  every lesson's material. They pick a LESSON here; that lesson's teacher
 *  material (solutions, answer key, figure report, notes) lives one level
 *  down at /teacher/:lessonId (see TeacherLessonPage).
 *
 *  Every card below is derived from the content registry — authoring a new
 *  lesson in src/content/units adds its card automatically, with no edits
 *  here. Nothing teacher-only renders before the gate unlocks.
 * ============================================================================
 */
export function TeacherPage() {
  return (
    <PageShell
      title="منطقة المعلّم"
      crumbs={[{ label: 'الرئيسية', to: routes.home() }, { label: 'منطقة المعلّم' }]}
      lead="لوحة عمل للمعلّم: اختر الدرس للوصول إلى حلول أسئلة الكتاب، مفتاح الاختبار النهائي، تقرير الأشكال، والملاحظات التربوية."
    >
      <TeacherGate>{({ lock }) => <TeacherDashboard onLock={lock} />}</TeacherGate>
    </PageShell>
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

      <ul className={styles.stats} aria-label="ملخّص المقرر">
        <li>
          الوحدات:{' '}
          <strong className="numeric" dir="ltr">
            {subject.units.length}
          </strong>
        </li>
        <li>
          الدروس:{' '}
          <strong className="numeric" dir="ltr">
            {lessonCount}
          </strong>
        </li>
        <li>
          الدروس المكتملة على هذا الجهاز:{' '}
          <strong className="numeric" dir="ltr">
            {completedCount}
          </strong>
        </li>
      </ul>

      <h2 className={styles.pickerTitle}>اختر الدرس</h2>
      {isCourseEmpty ? (
        <EmptyState
          title="لا توجد وحدات بعد"
          description="ستظهر بطاقات الدروس هنا فور إضافة محتوى الكتاب المدرسي."
        />
      ) : (
        subject.units.map((unit) => (
          <section key={unit.id} className={styles.unitGroup} aria-label={unit.title}>
            <h3 className={styles.unitTitle}>{unit.title}</h3>
            <ul className={styles.lessonGrid}>
              {unit.lessons.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))}
            </ul>
          </section>
        ))
      )}

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
 * One lesson in the picker. The counts are read straight from the lesson's
 * registry entry, so they can never drift out of sync with the content.
 */
function LessonCard({ lesson }: { lesson: Lesson }) {
  const solutionsCount = lesson.teacherResources?.textbookSolutions.length ?? 0;
  const assessmentCount = lesson.assessment?.questions.length ?? 0;
  const figuresCount = referenceFigures.filter((entry) => entry.lesson.id === lesson.id).length;
  const notesCount = lesson.teacherResources?.notes.length ?? 0;

  return (
    <li className={styles.card}>
      <h4 className={styles.cardTitle}>{lesson.title}</h4>
      <p className={styles.cardSource}>
        المصدر: {lesson.source.book ? `${lesson.source.book} — ` : ''}ص{' '}
        <span className="numeric" dir="ltr">
          {String(lesson.source.page)}
        </span>
      </p>
      <ul className={styles.cardStats}>
        <li>
          حلول الكتاب:{' '}
          <span className="numeric" dir="ltr">
            {solutionsCount}
          </span>
        </li>
        <li>
          أسئلة الاختبار:{' '}
          <span className="numeric" dir="ltr">
            {assessmentCount}
          </span>
        </li>
        <li>
          أشكال مرجعية:{' '}
          <span className="numeric" dir="ltr">
            {figuresCount}
          </span>
        </li>
        <li>
          ملاحظات تربوية:{' '}
          <span className="numeric" dir="ltr">
            {notesCount}
          </span>
        </li>
      </ul>
      <Link to={routes.teacherLesson(lesson.id)} className={styles.openButton}>
        فتح منطقة المعلم
      </Link>
    </li>
  );
}
