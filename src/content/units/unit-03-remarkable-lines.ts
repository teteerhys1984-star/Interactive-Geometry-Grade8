import type { UnitInput } from '../schema';
import { lesson13 } from './lesson-13-side-bisector';

/**
 * ============================================================================
 *  الوحدة الثالثة — «مستقيمات مميزة في المثلث»
 * ============================================================================
 *
 *  Title transcribed from the unit opener, page 53.
 *
 *  Authored so far:
 *    • Lesson 1 «محور ضلع في المثلث» (pages 54–55, with the unit opener of
 *      page 53 as its diagnostic entry).
 *
 *  Page 53's «انطلاقة نشطة» is the unit's opening page. Unlike Unit 2's opener
 *  (page 30), it carries five questions about the very object of Lesson 1, so it
 *  is taught as that lesson's entry — see the header of `lesson-13-side-bisector.ts`.
 *
 *  The unit carries NO unit-level assessment: the source prints none, and
 *  `sourceFidelity.test.ts` pins that absence for every unit in the course.
 * ============================================================================
 */
export const unit03: UnitInput = {
  id: 'unit-03-remarkable-lines',
  title: 'مستقيمات مميزة في المثلث',
  source: { page: 53, locator: 'الوحدة الثالثة' },
  lessons: [lesson13],
};
