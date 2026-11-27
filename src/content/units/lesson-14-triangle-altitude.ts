import type { LessonInput } from '../schema';
import { lesson14Assessment } from './lesson-14-assessment';
import { L14_LESSON_TITLE } from './lesson-14-questions';
import { lesson14Steps } from './lesson-14-steps';
import { lesson14TeacherResources } from './lesson-14-teacher';

/**
 * ============================================================================
 *  الوحدة الثالثة — الدرس الثاني: «ارتفاع مثلث»
 *  الصفحات ٥٦–٥٨
 * ============================================================================
 *
 *  Assembled from the same modular contracts as Lesson 13:
 *
 *    lesson-14-geometry.ts   exact Euclidean coordinates, unit-tested
 *    lesson-14-figures.ts    the FigureSpecs and the interactive lab spec
 *    lesson-14-questions.ts  verbatim printed source strings (pages 56–58)
 *    lesson-14-steps.ts      interleaved student sequence (10 source + 4 authored)
 *    lesson-14-teaching.ts   platform-authored explanations & the interactive lab
 *    lesson-14-assessment.ts formative 8-question in-lesson check
 *    lesson-14-teacher.ts    Teacher Area notes and derived/printed solutions
 *
 *  `summary`, `objectives` and `vocabulary` stay omitted at lesson level: the
 *  printed pages carry no such sections, and the platform never invents them.
 * ============================================================================
 */
export const lesson14: LessonInput = {
  id: 'lesson-14-triangle-altitude',
  title: L14_LESSON_TITLE,
  source: { page: '56–58', locator: 'الدرس الثاني من الوحدة الثالثة' },
  steps: lesson14Steps,
  assessment: lesson14Assessment,
  teacherResources: lesson14TeacherResources,
  estimatedMinutes: 55,
};
