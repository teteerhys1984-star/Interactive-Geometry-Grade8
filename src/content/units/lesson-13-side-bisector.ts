import type { LessonInput } from '../schema';
import { lesson13Assessment } from './lesson-13-assessment';
import { L13_LESSON_TITLE } from './lesson-13-questions';
import { lesson13Steps } from './lesson-13-steps';
import { lesson13TeacherResources } from './lesson-13-teacher';

/**
 * ============================================================================
 *  الوحدة الثالثة — الدرس الأول: «محور ضلع في المثلث»
 *  الصفحات ٥٣–٥٥
 * ============================================================================
 *
 *  Assembled from the same modular contracts as Lessons 8–11:
 *
 *    lesson-13-geometry.ts   exact Euclidean coordinates, unit-tested
 *    lesson-13-figures.ts    the 26 FigureSpecs and the interactive lab spec
 *    lesson-13-questions.ts  verbatim printed source strings (pages 53–55)
 *    lesson-13-steps.ts      interleaved student sequence (11 source + 6 authored)
 *    lesson-13-teaching.ts   platform-authored explanations & the interactive lab
 *    lesson-13-assessment.ts formative 8-question in-lesson check
 *    lesson-13-teacher.ts    Teacher Area notes and 20 derived solutions
 *
 *  PAGE RANGE: pages 54–55 are the lesson proper («1 محور ضلع في المثلث»);
 *  page 53 is the unit opener («انطلاقة نشطة»). It is included here because all
 *  five of its questions are about the very object of this lesson — the
 *  perpendicular bisector against the altitude and the median — and the lesson
 *  is their natural answer sheet. Unit 2's own opener (page 30) was left out of
 *  Lesson 8 because it carried no question of its own; this one does, so the
 *  two decisions do not conflict. The opener's answers are NOT printed and are
 *  marked as platform-derived everywhere they appear.
 *
 *  `summary`, `objectives` and `vocabulary` stay omitted at lesson level: the
 *  printed pages carry no such sections, and the platform never invents them.
 * ============================================================================
 */
export const lesson13: LessonInput = {
  id: 'lesson-13-side-bisector',
  title: L13_LESSON_TITLE,
  source: { page: '53–55', locator: 'الدرس الأول من الوحدة الثالثة' },
  steps: lesson13Steps,
  assessment: lesson13Assessment,
  teacherResources: lesson13TeacherResources,
  estimatedMinutes: 55,
};
