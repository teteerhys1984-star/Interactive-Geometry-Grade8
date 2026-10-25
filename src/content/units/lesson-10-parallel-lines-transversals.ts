import type { LessonInput } from '../schema';
import { lesson10Assessment } from './lesson-10-assessment';
import { L10_LESSON_TITLE } from './lesson-10-questions';
import { lesson10Steps } from './lesson-10-steps';
import { lesson10TeacherResources } from './lesson-10-teacher';

/**
 * ============================================================================
 *  الدرس العاشر — «مستقيمات متوازية وقاطعان»
 *  الوحدة الثانية، الدرس الثالث — الصفحات ٣٦–٣٨
 * ============================================================================
 *
 *  Assembled from the same modular contracts as Lessons 8 and 9:
 *
 *    lesson-10-geometry.ts   exact Euclidean coordinates, unit-tested
 *    lesson-10-figures.ts    source, starter, and teacher-solution FigureSpecs
 *    lesson-10-questions.ts  verbatim printed source strings (pages 36–38)
 *    lesson-10-steps.ts      interleaved student sequence (source + authored)
 *    lesson-10-teaching.ts   platform-authored explanations & interactive lab
 *    lesson-10-assessment.ts formative 8-question in-lesson check
 *    lesson-10-teacher.ts    Teacher Area objectives, notes, and solutions
 *
 *  `summary`, `objectives`, and `vocabulary` remain omitted at Lesson level in
 *  accordance with the platform's source-fidelity contract.
 * ============================================================================
 */
export const lesson10: LessonInput = {
  id: 'lesson-10-parallel-lines-transversals',
  title: L10_LESSON_TITLE,
  source: { page: '36–38', locator: 'الدرس الثالث من الوحدة الثانية' },
  steps: lesson10Steps,
  assessment: lesson10Assessment,
  teacherResources: lesson10TeacherResources,
  estimatedMinutes: 55,
};
