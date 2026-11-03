import { Link } from 'react-router-dom';
import { routes } from '@/lib/routes';
import type { LessonStep } from '@/content/schema';
import styles from './StepRail.module.css';

interface StepRailProps {
  lessonId: string;
  steps: LessonStep[];
  /** 1-based index of the active step. */
  activeStep: number;
}

/** Student notebooks show their title instead of a number in the compact
 * phone rail. They are ordinary steps; no parallel tab system. */
export const isNotebookStep = (step: { id: string }): boolean =>
  step.id === 'student-notebook' ||
  step.id === 'lesson-02-student-notebook' ||
  step.id === 'lesson-03-student-notebook';

/** Compact jump-list of a lesson's steps; scrolls horizontally on mobile. */
export function StepRail({ lessonId, steps, activeStep }: StepRailProps) {
  return (
    <nav className={styles.rail} aria-label="خطوات الدرس">
      <ol className={styles.list}>
        {steps.map((step, index) => {
          const number = index + 1;
          const isActive = number === activeStep;
          return (
            <li key={step.id}>
              <Link
                to={routes.lessonStep(lessonId, number)}
                className={`${isActive ? styles.activeItem : styles.item} ${isNotebookStep(step) ? styles.notebook : ''}`}
                aria-current={isActive ? 'step' : undefined}
                title={step.title}
              >
                <span className="numeric" dir="ltr">
                  {isNotebookStep(step) ? step.title : number}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
