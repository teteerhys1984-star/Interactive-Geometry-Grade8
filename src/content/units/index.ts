import { unitSchema } from '../schema';
import type { Unit } from '../schema';
import { unit01 } from './unit-01-parallelograms-and-translation';

/**
 * ============================================================================
 *  COURSE UNITS
 * ============================================================================
 *
 *  Only content verified against the supplied textbook scans appears here.
 *
 *  Currently authored:
 *    • Unit 1 «متوازيات الأضلاع والانسحاب» — Lesson 1, pages 5–7.
 *    • Unit 1 «متوازيات الأضلاع والانسحاب» — Lesson 2, pages 8–10.
 *    • Unit 1 «متوازيات الأضلاع والانسحاب» — Lesson 3, pages 11–16.
 *    • Unit 1 «متوازيات الأضلاع والانسحاب» — Lesson 4, pages 17–19.
 *    • Unit 1 «تمرينات الوحدة الأولى» — Lesson 5, questions 1–2.
 *    • Unit 1 «تتمة الدرس الخامس (1)» — independent continuation, questions 3–15.
 *
 *  NOT yet authored (deliberately):
 *    • Units 2–5                                     pages 30+
 *
 *  TO ADD THE NEXT LESSON: append it to `unit01.lessons` in curriculum order,
 *  built strictly from the real pages, with a `source` on the lesson and on
 *  every question. Routing, navigation, progress and the teacher area update
 *  automatically.
 * ============================================================================
 */
const rawUnits: unknown[] = [unit01];

/** Units validated against the schema at module load. Fails fast on bad data. */
export const units: Unit[] = rawUnits.map((unit) => unitSchema.parse(unit));
