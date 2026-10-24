import type { UnitInput } from '../schema';
import { lesson08 } from './lesson-08-midpoints';
import { lesson09 } from './lesson-09-parallel-from-midpoint';

/**
 * ============================================================================
 *  الوحدة الثانية — «مثلثات ومنصفات أضلاع ومستقيمات متوازية»
 * ============================================================================
 *
 *  Title transcribed from the unit opener, page 30.
 *
 *  Authored so far:
 *    • Lesson 1 «منتصفا ضلعين في المثلث» (pages 31–33).
 *    • Lesson 2 «موازٍ لضلع من منتصف ضلع آخر» (pages 34–35).
 *
 *  The unit carries NO unit-level assessment: the source prints none, and
 *  `sourceFidelity.test.ts` pins that absence for every unit in the course.
 *
 *  Page 30's «انطلاقة نشطة» is the unit's opening page. It is not a lesson and
 *  is not reproduced here (see `lesson-08-midpoints.ts`).
 * ============================================================================
 */
export const unit02: UnitInput = {
  id: 'unit-02-triangles-midpoints-parallels',
  title: 'مثلثات ومنصفات أضلاع ومستقيمات متوازية',
  source: { page: 30, locator: 'الوحدة الثانية' },
  lessons: [lesson08, lesson09],
};
