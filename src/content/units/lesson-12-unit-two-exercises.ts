import type { LessonInput } from '../schema';
import { L12_LESSON_TITLE } from './lesson-12-questions';
import { lesson12Batch1Steps } from './lesson-12-batch1-steps';
import { lesson12Batch1TeacherNotes } from './lesson-12-batch1-teacher';
import { lesson12Steps } from './lesson-12-steps';
import { lesson12TeacherResources } from './lesson-12-teacher';

/**
 * ============================================================================
 *  الوحدة الثانية — «تمارين الوحدة الثانية»
 * ============================================================================
 *
 *  The exercise set of Unit 2, reproduced from the supplied scans:
 *
 *    lesson-12-batch1-questions.ts              the printed text of Q1–Q17
 *    lesson-12-batch1-geometry.ts               the source geometry of Q1–Q17
 *    lesson-12-batch1-figures.ts                the twenty figures of Q1–Q17
 *    lesson-12-batch1-steps.ts                  one source step per exercise
 *    lesson-12-batch1-teacher.ts                editorial ledger (no solutions)
 *    lesson-12-unit-two-exercises-geometry.ts   measured source coordinates
 *    lesson-12-questions.ts                     verbatim printed text (Q18–Q34)
 *    lesson-12-figures.ts                       the fifteen figures (Q18–Q34)
 *    lesson-12-steps.ts                         one source step per exercise
 *    lesson-12-teacher.ts                       editorial ledger (no solutions)
 *
 *  Rules this lesson follows:
 *
 *    • one `origin: 'source'` step per printed exercise, in printed order;
 *    • every student-facing word is a word the book prints (plus the step
 *      labels) — no solution, no answer key, no assessment, no commentary
 *      inside the exercise cards;
 *    • the editorial uncertainty of each exercise is recorded in the Teacher
 *      Area, never in the student view;
 *    • the set carries no `assessment`: the page prints none.
 *
 *  THE ORDER OF THE SET
 *  ----------------------------------------------------------------------------
 *  Batch 1 (Q1–Q17) comes first, followed immediately by Q18–Q34, producing
 *  the complete printed student sequence Q1–Q34 (34 source steps).
 *
 *  The supplied pages carry no printed page numbers, so the exercises are
 *  cited by their scan («صورة المصدر (الوحدة الثانية) — السؤال N») and never
 *  by an invented textbook page.
 *
 *  Registering this lesson does NOT add a unit-level assessment: Unit 2 still
 *  has no unit-level assessment and no completion gate, exactly as before.
 * ============================================================================
 */

/** The complete student sequence: Q1–Q34 in printed order. */
const lesson12AllSteps = [...lesson12Batch1Steps, ...lesson12Steps];

export const lesson12: LessonInput = {
  id: 'lesson-12-unit-two-exercises',
  title: L12_LESSON_TITLE,
  source: { page: 'صور المصدر (الوحدة الثانية)', locator: 'تمارين الوحدة الثانية' },
  steps: lesson12AllSteps,
  teacherResources: {
    ...lesson12TeacherResources,
    notes: [...lesson12Batch1TeacherNotes, ...(lesson12TeacherResources.notes ?? [])],
  },
  estimatedMinutes: 120,
};
