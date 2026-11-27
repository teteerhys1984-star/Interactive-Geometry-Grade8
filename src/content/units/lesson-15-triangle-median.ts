import type { LessonInput } from '../schema';
import { lesson15Assessment } from './lesson-15-assessment';
import { L15_LESSON_TITLE } from './lesson-15-questions';
import { lesson15Steps } from './lesson-15-steps';
import { lesson15TeacherResources } from './lesson-15-teacher';

/**
 * ============================================================================
 *  الوحدة الثالثة — الدرس الثالث: «المتوسط في المثلث»
 *  الصفحات ٥٩–٦١
 * ============================================================================
 *  Assembled from the same modular contracts as Lessons 13–14. `summary`,
 *  `objectives` and `vocabulary` stay omitted: the printed pages carry none.
 * ============================================================================
 */
export const lesson15: LessonInput = {
  id: 'lesson-15-triangle-median',
  title: L15_LESSON_TITLE,
  source: { page: '59–61', locator: 'الدرس الثالث من الوحدة الثالثة' },
  steps: lesson15Steps,
  assessment: lesson15Assessment,
  teacherResources: lesson15TeacherResources,
  estimatedMinutes: 55,
};
