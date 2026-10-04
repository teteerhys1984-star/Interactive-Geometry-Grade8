import { Link } from 'react-router-dom';
import { EmptyState } from '@/components/ui';
import { allLessons, isCourseEmpty, subject } from '@/content/registry';
import { routes } from '@/lib/routes';
import { loadProgress } from '@/lib/progress';
import styles from './HomePage.module.css';

export function HomePage() {
  const progress = loadProgress();
  const lessonCount = allLessons.length;
  const stepCount = allLessons.reduce((total, entry) => total + entry.lesson.steps.length, 0);
  const firstLesson = allLessons[0];
  const inProgress = allLessons.find(
    (entry) => (progress.lessons[entry.lesson.id]?.completedStepIds.length ?? 0) > 0,
  );
  const resumeTarget = inProgress ?? firstLesson;

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>الصف الثامن · رياضيات</p>
          <h1 className={styles.heroTitle}>{subject.title}</h1>
          <p className={styles.heroLead}>{subject.description}</p>

          {isCourseEmpty ? null : (
            <>
              <div className={styles.stats}>
                <Stat value={subject.units.length} label="وحدة" />
                <Stat value={lessonCount} label="درس" />
                <Stat value={stepCount} label="خطوة تعليمية" />
              </div>
              <div className={styles.ctaRow}>
                {resumeTarget ? (
                  <Link className={styles.ctaPrimary} to={routes.lesson(resumeTarget.lesson.id)}>
                    {inProgress ? 'تابع من حيث توقفت' : 'ابدأ الدرس الأول'}
                  </Link>
                ) : null}
                <Link className={styles.ctaSecondary} to={routes.subject(subject.id)}>
                  تصفّح المقرر
                </Link>
              </div>
            </>
          )}
        </div>

        <div className={styles.heroArt} aria-hidden="true">
          <TranslationMark />
        </div>
      </section>

      {isCourseEmpty ? (
        <EmptyState
          title="لم تتم إضافة أي وحدة بعد"
          description="سيظهر محتوى المقرر هنا فور إضافة أول وحدة من الكتاب المدرسي."
        />
      ) : (
        <section className={styles.units} aria-labelledby="units-heading">
          <h2 id="units-heading" className={styles.sectionTitle}>
            وحدات المقرر
          </h2>
          <div className={styles.unitGrid}>
            {subject.units.map((unit, index) => (
              <Link key={unit.id} to={routes.unit(unit.id)} className={styles.unitCard}>
                <span className={styles.unitIndex} dir="ltr">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={styles.unitBody}>
                  <span className={styles.unitTitle}>{unit.title}</span>
                  <span className={styles.unitMeta}>
                    {unit.lessons.length === 1
                      ? 'درس واحد متاح'
                      : `${unit.lessons.length} دروس متاحة`}
                  </span>
                </span>
                <span className={styles.unitArrow} aria-hidden="true">
                  ‹
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className={styles.teacher} aria-labelledby="teacher-heading">
        <div>
          <h2 id="teacher-heading" className={styles.sectionTitle}>
            للمعلّمين
          </h2>
          <p className={styles.teacherText}>
            منطقة مخصّصة لعرض بنية المقرر، ومصادر كل درس، والأشكال التي تتطلّب الرجوع إلى الكتاب.
          </p>
        </div>
        <Link className={styles.ctaSecondary} to={routes.teacher()}>
          منطقة المعلّم
        </Link>
      </section>

      <section className={styles.testsSection} aria-labelledby="tests-section-heading">
        <div>
          <h2 id="tests-section-heading" className={styles.sectionTitle}>
            منطقة الاختبارات
          </h2>
          <p className={styles.teacherText}>
            نظام اختبارات مستقل لقياس فهمك الهندسي بأسئلة أصلية متدرجة الصعوبة وحلول تربوية تفصيلية.
          </p>
        </div>
        <Link className={styles.ctaPrimary} to={routes.tests()}>
          دخول الاختبارات
        </Link>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className={styles.stat}>
      <span className={styles.statValue} dir="ltr">
        {value}
      </span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

/** Decorative: a shape and its image under a translation. */
function TranslationMark() {
  return (
    <svg viewBox="0 0 220 150" className={styles.mark} role="presentation">
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" />
        </marker>
      </defs>
      <polygon points="20,110 60,40 100,110" className={styles.markSource} />
      <polygon points="110,110 150,40 190,110" className={styles.markImage} />
      <line
        x1="60"
        y1="75"
        x2="145"
        y2="75"
        className={styles.markVector}
        markerEnd="url(#arrowhead)"
      />
    </svg>
  );
}
