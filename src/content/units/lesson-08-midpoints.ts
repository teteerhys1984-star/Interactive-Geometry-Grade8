import type { LessonInput } from '../schema';
import { lesson08Assessment } from './lesson-08-assessment';
import { lesson08Steps } from './lesson-08-steps';
import { lesson08TeacherResources } from './lesson-08-teacher';

/**
 * ============================================================================
 *  الدرس الثامن — «منتصفا ضلعين في المثلث»
 *  الوحدة الثانية، الدرس الأول — الصفحات ٣١–٣٣
 * ============================================================================
 *
 *  All six pieces are assembled here, exactly like Lessons 1–7:
 *
 *    lesson-08-geometry.ts   coordinates, derived and unit-tested
 *    lesson-08-figures.ts    every diagram of the lesson
 *    lesson-08-questions.ts  the printed prompts, once, for students + teachers
 *    lesson-08-steps.ts      the student sequence (source + platform steps)
 *    lesson-08-teaching.ts   the platform's own explanations
 *    lesson-08-assessment.ts platform-written final assessment
 *    lesson-08-teacher.ts    the Teacher Area records
 *
 *  `summary`, `objectives` and `vocabulary` are deliberately absent: the
 *  printed lesson carries none of them, and the source-fidelity suite forbids
 *  inventing them (see `sourceFidelity.test.ts`).
 *
 *  The unit opener of page 30 («انطلاقة نشطة») is CONTEXT, not this lesson's
 *  title and not reproduced as a step: its wording was not fully legible in the
 *  supplied scan. `docs/UNIT-02-LESSON-01-SOURCE.md` records that decision.
 * ============================================================================
 */
export const lesson08: LessonInput = {
  id: 'lesson-08-triangle-midpoints',
  title: 'منتصفا ضلعين في المثلث',
  source: { page: '31–33', locator: 'الدرس الأول من الوحدة الثانية' },
  steps: lesson08Steps,
  assessment: lesson08Assessment,
  teacherResources: lesson08TeacherResources,
  estimatedMinutes: 55,
};
