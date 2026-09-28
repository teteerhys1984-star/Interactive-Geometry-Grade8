import { Link } from 'react-router-dom';
import { routes } from '@/lib/routes';
import type { LessonStep } from '@/content/schema';
import styles from './LessonSidebar.module.css';

interface LessonSidebarProps {
  lessonId: string;
  lessonTitle: string;
  steps: LessonStep[];
  /** 1-based index of the active step. */
  activeStep: number;
  /** Ids of steps already viewed. */
  viewed: Set<string>;
}

/**
 * Lesson outline / side navigation shown alongside the step content.
 *
 * Sticky on desktop; on narrow screens the layout collapses and the compact
 * <StepRail> takes over (see LessonStepPage).
 */
export function LessonSidebar({
  lessonId,
  lessonTitle,
  steps,
  activeStep,
  viewed,
}: LessonSidebarProps) {
  return (
    <nav className={styles.sidebar} aria-label="مخطّط الدرس">
      <p className={styles.heading}>مخطّط الدرس</p>
      <Link to={routes.lesson(lessonId)} className={styles.lessonLink}>
        {lessonTitle}
      </Link>
      <ol className={styles.list}>
        {steps.map((step, index) => {
          const number = index + 1;
          const isActive = number === activeStep;
          const isViewed = viewed.has(step.id);
          return (
            <li key={step.id}>
              <Link
                to={routes.lessonStep(lessonId, number)}
                className={isActive ? styles.activeItem : styles.item}
                aria-current={isActive ? 'step' : undefined}
              >
                <span
                  className={isActive ? styles.dotActive : isViewed ? styles.dotDone : styles.dot}
                  dir="ltr"
                  aria-hidden="true"
                >
                  {isViewed && !isActive ? '✓' : number}
                </span>
                <span className={styles.label}>{step.title}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
