import type { LessonInput } from '../schema';
import { lesson11Assessment } from './lesson-11-assessment';
import { L11_LESSON_TITLE } from './lesson-11-questions';
import { lesson11Steps } from './lesson-11-steps';
import { lesson11TeacherResources } from './lesson-11-teacher';

/**
 * ============================================================================
 *  الدرس الحادي عشر — «تساوي ثلاث نسب»
 *  الوحدة الثانية، الدرس الرابع (الأخير) — الصفحات ٣٩–٤١
 * ============================================================================
 *
 *  Assembled from the same modular contracts as Lessons 8–10:
 *
 *    lesson-11-geometry.ts   exact Euclidean coordinates, unit-tested
 *    lesson-11-figures.ts    the eight FigureSpecs and the interactive lab spec
 *    lesson-11-questions.ts  verbatim printed source strings (pages 39–41)
 *    lesson-11-steps.ts      interleaved student sequence (8 source + 6 authored)
 *    lesson-11-teaching.ts   platform-authored explanations & the interactive lab
 *    lesson-11-assessment.ts formative 8-question in-lesson check
 *    lesson-11-teacher.ts    Teacher Area notes and 11 derived solutions
 *
 *  `summary`, `objectives` and `vocabulary` stay omitted at lesson level: the
 *  printed pages carry no such sections, and the platform never invents them.
 *
 *  Registering this lesson does NOT complete Unit 2 or change any
 *  unit-completion rule: the unit still has no unit-level assessment and no
 *  completion gate, exactly as the source and the existing tests require.
 * ============================================================================
 */
export const lesson11: LessonInput = {
  id: 'lesson-11-three-ratios',
  title: L11_LESSON_TITLE,
  source: { page: '39–41', locator: 'الدرس الرابع من الوحدة الثانية' },
  steps: lesson11Steps,
  assessment: lesson11Assessment,
  teacherResources: lesson11TeacherResources,
  estimatedMinutes: 55,
};
