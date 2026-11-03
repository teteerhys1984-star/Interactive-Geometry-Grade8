import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Breadcrumbs } from '@/components/layout';
import {
  LessonSidebar,
  PrevNext,
  ProgressBar,
  StepRail,
  isNotebookStep,
} from '@/components/navigation';
import { Blocks } from '@/components/content';
import { getLesson, subject } from '@/content/registry';
import type { ContentBlock } from '@/content/schema';
import { routes } from '@/lib/routes';
import { loadProgress, markStepViewed } from '@/lib/progress';
import { lessonTheme } from '@/lib/lessonTheme';
import { NotFoundPage } from './NotFoundPage';
import styles from './LessonStepPage.module.css';
import { LessonOnePanel } from './LessonOnePanel';
import type { HasLocalState } from './LessonOnePanel';

/** Only these three lessons opt in to retaining stateful visited panels.
 * Every other lesson keeps the original one-panel-at-a-time rendering.
 */
const RETAINED_LESSON_IDS = new Set([
  'lesson-01-translation-and-properties',
  'lesson-02-image-of-a-point',
  'lesson-03-image-of-a-shape',
]);

/** Lesson 2 only: exactly the blocks that really own learner state.
 * The four labs have controls; `grid-figure` has state only with reveals and
 * `construction-figure` only with steps (Lesson 2 uses neither), so the fixed
 * explanatory drawings are unmounted with their inactive panel. Collapsible
 * teaching cards keep their open/closed state. No lab implementation changes.
 */
const LESSON_TWO_STATEFUL_RENDERERS = new Set([
  'compass-lab',
  'point-image-lab',
  'lattice-placement',
  'vector-chain',
]);

const lessonTwoHasLocalState: HasLocalState = (block: ContentBlock): boolean => {
  if (block.type === 'figure') {
    const diagram = block.diagram;
    if (diagram.kind !== 'interactive') return false;
    if (LESSON_TWO_STATEFUL_RENDERERS.has(diagram.renderer)) return true;
    if (diagram.renderer === 'grid-figure') {
      return Array.isArray(diagram.params.reveals) && diagram.params.reveals.length > 0;
    }
    if (diagram.renderer === 'construction-figure') {
      return Array.isArray(diagram.params.steps) && diagram.params.steps.length > 0;
    }
    return false;
  }
  if (block.type === 'teaching') {
    return Boolean(block.collapsible) || block.blocks.some(lessonTwoHasLocalState);
  }
  return block.type === 'callout' && block.blocks.some(lessonTwoHasLocalState);
};

/** Lesson 3 only: the explorer's controls, grouped answers/submission, and
 * construction steppers own state. All three construction figures in this
 * lesson have steps; a stepless construction would not be retained. Disclosure
 * cards keep their open/closed state, including the nested p.16 starter.
 * Text, textbook crops and constructed translation figures stay unretained.
 */
const LESSON_THREE_STATEFUL_RENDERERS = new Set([
  'shape-translation-lab',
  'translation-challenges',
]);

const lessonThreeHasLocalState: HasLocalState = (block: ContentBlock): boolean => {
  if (block.type === 'figure') {
    const diagram = block.diagram;
    if (diagram.kind !== 'interactive') return false;
    if (LESSON_THREE_STATEFUL_RENDERERS.has(diagram.renderer)) return true;
    return (
      diagram.renderer === 'construction-figure' &&
      Array.isArray(diagram.params.steps) &&
      diagram.params.steps.length > 0
    );
  }
  if (block.type === 'teaching') {
    return Boolean(block.collapsible) || block.blocks.some(lessonThreeHasLocalState);
  }
  return block.type === 'callout' && block.blocks.some(lessonThreeHasLocalState);
};

export function LessonStepPage() {
  const { lessonId, step } = useParams();
  const entry = lessonId ? getLesson(lessonId) : undefined;
  const stepNumber = Number(step);
  // Only the three explicit opt-ins retain stateful blocks from visited panels.
  // Static content is removed when inactive; labs/disclosures keep their keys.
  const retainPanels = lessonId ? RETAINED_LESSON_IDS.has(lessonId) : false;
  const hasState =
    lessonId === 'lesson-03-image-of-a-shape'
      ? lessonThreeHasLocalState
      : lessonId === 'lesson-02-image-of-a-point'
        ? lessonTwoHasLocalState
        : undefined;
  const [visited, setVisited] = useState({ lessonId, numbers: [stepNumber] });
  if (visited.lessonId !== lessonId) {
    setVisited({ lessonId, numbers: [stepNumber] });
  } else if (retainPanels && !visited.numbers.includes(stepNumber)) {
    setVisited({ lessonId, numbers: [...visited.numbers, stepNumber] });
  }

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

          {retainPanels ? (
            lesson.steps.map((panel, index) =>
              visited.numbers.includes(index + 1) ? (
                <LessonOnePanel
                  key={`${lesson.id}-${panel.id}`}
                  blocks={panel.blocks}
                  active={index + 1 === stepNumber}
                  hasState={hasState}
                  className={isNotebookStep(panel) ? styles.notebook : undefined}
                />
              ) : null,
            )
          ) : (
            <Blocks blocks={currentStep.blocks} />
          )}
        </article>

        <PrevNext previous={previous} next={next} />
      </div>
    </div>
  );
}
