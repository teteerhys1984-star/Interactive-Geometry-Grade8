import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Breadcrumbs } from '@/components/layout';
import { LessonSidebar, PrevNext, ProgressBar, StepRail } from '@/components/navigation';
import { Blocks } from '@/components/content';
import { getLesson, subject } from '@/content/registry';
import { routes } from '@/lib/routes';
import { loadProgress, markStepViewed } from '@/lib/progress';
import { lessonTheme } from '@/lib/lessonTheme';
import { NotFoundPage } from './NotFoundPage';
import styles from './LessonStepPage.module.css';

export function LessonStepPage() {
  const { lessonId, step } = useParams();
  const entry = lessonId ? getLesson(lessonId) : undefined;
  const stepNumber = Number(step);

  const stepId =
    entry && Number.isInteger(stepNumber) ? entry.lesson.steps[stepNumber - 1]?.id : undefined;

  /**
   * Viewed steps are derived synchronously from storage during render, with the
   * current step folded in optimistically. Persisting happens in the effect
   * below, so no setState-in-effect cascade is needed.
   */
  const viewed = new Set(
    lessonId ? (loadProgress().lessons[lessonId]?.completedStepIds ?? []) : [],
  );
  if (stepId) viewed.add(stepId);

  useEffect(() => {
    if (lessonId && stepId) markStepViewed(lessonId, stepId);
  }, [lessonId, stepId]);

  if (!entry) return <NotFoundPage />;
  const { lesson, unit } = entry;

  if (!Number.isInteger(stepNumber) || stepNumber < 1) {
    return <Navigate to={routes.lessonStep(lesson.id, 1)} replace />;
  }

  const currentStep = lesson.steps[stepNumber - 1];
  if (!currentStep) return <NotFoundPage />;

  const isLastStep = stepNumber === lesson.steps.length;

  const previous =
    stepNumber > 1
      ? {
          label: lesson.steps[stepNumber - 2]?.title ?? 'الخطوة السابقة',
          to: routes.lessonStep(lesson.id, stepNumber - 1),
        }
      : { label: 'مخطّط الدرس', to: routes.lesson(lesson.id) };

  // After the last step the student goes to the lesson's final assessment
  // when there is one, and straight to the completion screen otherwise.
  const next = isLastStep
    ? lesson.assessment
      ? { label: 'الاختبار النهائي', to: routes.assessment(lesson.assessment.id) }
      : { label: 'إنهاء الدرس', to: routes.lessonCompletion(lesson.id) }
    : {
        label: lesson.steps[stepNumber]?.title ?? 'الخطوة التالية',
        to: routes.lessonStep(lesson.id, stepNumber + 1),
      };

  return (
    <div className={styles.layout} data-lesson-theme={lessonTheme(lesson.id)}>
      <aside className={styles.aside}>
        <LessonSidebar
          lessonId={lesson.id}
          lessonTitle={lesson.title}
          steps={lesson.steps}
          activeStep={stepNumber}
          viewed={viewed}
        />
      </aside>

      <div className={styles.main}>
        <Breadcrumbs
          items={[
            { label: 'الرئيسية', to: routes.home() },
            { label: subject.title, to: routes.subject(subject.id) },
            { label: unit.title, to: routes.unit(unit.id) },
            { label: lesson.title, to: routes.lesson(lesson.id) },
            { label: currentStep.title },
          ]}
        />

        <ProgressBar current={stepNumber} total={lesson.steps.length} label="خطوات الدرس" />

        <div className={styles.railWrap}>
          <StepRail lessonId={lesson.id} steps={lesson.steps} activeStep={stepNumber} />
        </div>

        <article className={styles.article}>
          <header className={styles.header}>
            {currentStep.kicker ? <p className={styles.kicker}>{currentStep.kicker}</p> : null}
            <h1 className={styles.title}>{currentStep.title}</h1>
            {currentStep.source ? (
              <p className={styles.source}>
                المصدر: صفحة <span dir="ltr">{String(currentStep.source.page)}</span>
                {currentStep.source.locator ? ` · ${currentStep.source.locator}` : null}
              </p>
            ) : null}
          </header>

          <Blocks blocks={currentStep.blocks} />
        </article>

        <PrevNext previous={previous} next={next} />
      </div>
    </div>
  );
}
