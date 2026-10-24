import { unitSchema } from '../schema';
import type { Unit } from '../schema';
import { unit01 } from './unit-01-parallelograms-and-translation';
import { unit02 } from './unit-02-triangles-midpoints-parallels';

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
 *    • Unit 1 «تتمة الدرس الخامس (2)» — independent continuation, questions 16–28.
 *    • Unit 2 «مثلثات ومنصفات أضلاع ومستقيمات متوازية» — Lesson 1, pages 31–33.
 *
 *  NOT yet authored (deliberately):
 *    • The rest of Unit 2, and Units 3–5             page 34 onwards
 *
 *  TO ADD THE NEXT LESSON: append it to its unit's `lessons` in curriculum order,
 *  built strictly from the real pages, with a `source` on the lesson and on
 *  every question. Routing, navigation, progress and the teacher area update
 *  automatically.
 * ============================================================================
 */
const rawUnits: unknown[] = [unit01, unit02];

/** Units validated against the schema at module load. Fails fast on bad data. */
export const units: Unit[] = rawUnits.map((unit) => unitSchema.parse(unit));
