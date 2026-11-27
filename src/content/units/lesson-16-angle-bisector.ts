import type { LessonInput } from '../schema';
import { lesson16Assessment } from './lesson-16-assessment';
import { L16_LESSON_TITLE } from './lesson-16-questions';
import { lesson16Steps } from './lesson-16-steps';
import { lesson16TeacherResources } from './lesson-16-teacher';

/**
 * ============================================================================
 *  الوحدة الثالثة — الدرس الرابع: «منصّف زاوية مثلث»
 *  الصفحات ٦٢–٦٣
 * ============================================================================
 *  Assembled from the same modular contracts as Lessons 13–15. `summary`,
 *  `objectives` and `vocabulary` stay omitted: the printed pages carry none.
 * ============================================================================
 */
export const lesson16: LessonInput = {
  id: 'lesson-16-angle-bisector',
  title: L16_LESSON_TITLE,
  source: { page: '62–63', locator: 'الدرس الرابع من الوحدة الثالثة' },
  steps: lesson16Steps,
  assessment: lesson16Assessment,
  teacherResources: lesson16TeacherResources,
  estimatedMinutes: 50,
};
