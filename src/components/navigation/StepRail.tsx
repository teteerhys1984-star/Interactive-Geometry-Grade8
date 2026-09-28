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
                className={isActive ? styles.activeItem : styles.item}
                aria-current={isActive ? 'step' : undefined}
                title={step.title}
              >
                <span className="numeric" dir="ltr">
                  {number}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
