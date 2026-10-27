import type { UnitInput } from '../schema';
import { lesson08 } from './lesson-08-midpoints';
import { lesson09 } from './lesson-09-parallel-from-midpoint';
import { lesson10 } from './lesson-10-parallel-lines-transversals';
import { lesson11 } from './lesson-11-three-ratios';
import { lesson12 } from './lesson-12-unit-two-exercises';

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
 *    • Lesson 3 «مستقيمات متوازية وقاطعان» (pages 36–38).
 *    • Lesson 4 «تساوي ثلاث نسب» (pages 39–41).
 *    • «تمارين الوحدة الثانية» — the exercise set of the unit, reproduced
 *      from the supplied scans (no printed page numbers: the exercises are
 *      cited by their scan).
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
  // The lessons of the unit, in printed order, followed by the unit's exercise
  // set. Registering them does NOT complete the unit: there is no completion
  // gate and no unit-level assessment, and `sourceFidelity.test.ts` pins that
  // absence.
  lessons: [lesson08, lesson09, lesson10, lesson11, lesson12],
};
