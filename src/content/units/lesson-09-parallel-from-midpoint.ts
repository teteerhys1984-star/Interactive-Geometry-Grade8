import type { LessonInput } from '../schema';
import { lesson09Assessment } from './lesson-09-assessment';
import { L9_LESSON_TITLE } from './lesson-09-questions';
import { lesson09Steps } from './lesson-09-steps';
import { lesson09TeacherResources } from './lesson-09-teacher';

/**
 * ============================================================================
 *  الدرس التاسع — «موازٍ لضلع من منتصف ضلع آخر»
 *  الوحدة الثانية، الدرس الثاني — الصفحتان ٣٤–٣٥
 * ============================================================================
 *
 *  Assembled from the same modular contracts as Lesson 8 and Unit 1:
 *
 *    lesson-09-geometry.ts   exact Euclidean coordinates, unit-tested
 *    lesson-09-figures.ts    source, starter, and teacher-solution FigureSpecs
 *    lesson-09-questions.ts  verbatim printed source strings (pages 34–35)
 *    lesson-09-steps.ts      interleaved student sequence (source + authored)
 *    lesson-09-teaching.ts   platform-authored explanations & interactive lab
 *    lesson-09-assessment.ts formative 8-question in-lesson check
 *    lesson-09-teacher.ts    Teacher Area objectives, notes, and solutions
 *
 *  `summary`, `objectives`, and `vocabulary` remain omitted at Lesson level in
 *  accordance with the platform's source-fidelity contract.
 * ============================================================================
 */
export const lesson09: LessonInput = {
  id: 'lesson-09-parallel-from-midpoint',
  title: L9_LESSON_TITLE,
  source: { page: '34–35', locator: 'الدرس الثاني من الوحدة الثانية' },
  steps: lesson09Steps,
  assessment: lesson09Assessment,
  teacherResources: lesson09TeacherResources,
  estimatedMinutes: 50,
};
