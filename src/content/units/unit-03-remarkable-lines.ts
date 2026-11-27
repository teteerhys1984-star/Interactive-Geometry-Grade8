import type { UnitInput } from '../schema';
import { lesson13 } from './lesson-13-side-bisector';
import { lesson14 } from './lesson-14-triangle-altitude';
import { lesson15 } from './lesson-15-triangle-median';
import { lesson16 } from './lesson-16-angle-bisector';

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
 *    • Lesson 2 «ارتفاع مثلث» (pages 56–58).
 *    • Lesson 3 «المتوسط في المثلث» (pages 59–61).
 *    • Lesson 4 «منصّف زاوية مثلث» (pages 62–63).
 *
 *  The Unit 3 exercises section is out of scope here (a separate PR).
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
  lessons: [lesson13, lesson14, lesson15, lesson16],
};
