/**
 * ============================================================================
 *  UNIT 3, LESSON 1 — VERBATIM PRINTED SOURCE (PAGES 53–55)
 * ============================================================================
 *
 *  Single source of truth for the textbook text of «محور ضلع في المثلث», the
 *  first lesson of Unit 3 «مستقيمات مميزة في المثلث». The student-facing source
 *  steps and the Teacher Area solutions both import from here, so the wording
 *  cannot drift between the two views.
 *
 *  DOCUMENTED READING NOTES (nothing is silently repaired):
 *
 *   1. Page 53 is the unit's «انطلاقة نشطة» — five multiple-choice questions,
 *      each with three panels/options ① ② ③. The page does NOT print the answers
 *      and does NOT print a figure for question ③. The lesson answers them in
 *      the Teacher Area and in the solution figures; no answer is attributed to
 *      the book.
 *
 *   2. Page 53's panel numbers run RIGHT TO LEFT, as the page prints them: in
 *      questions ① and ② the panel ① is the RIGHTMOST, ③ the leftmost. Every
 *      figure of this lesson keeps that order (`docs/LESSON-13-FIGURES.md`).
 *
 *   3. Page 54's activity prints a marginal warning in the imperative:
 *      «يجب ألّا يُرسم شكل في حالة خاصة. في مثالنا لا يجب رسم مثلث قائم أو
 *      متساوي الساقين.» — recorded verbatim, and the activity triangle of
 *      `lesson-13-geometry.ts` is scalene and right-angle-free to honour it.
 *
 *   4. Page 55's «خاصة وتعریف» box is printed as a bulleted list under a single
 *      heading; the numbering «① ② ③» used by the platform's figures is the
 *      PLATFORM's annotation of the three unnumbered panels (the page only
 *      captions them «حاد الزوايا» / «منفرج في Â» / «قائم في Â»).
 *
 *   5. Page 55 «تدرّب ③ ②» prints «أكبر من 5 cm» for the radius; the lesson's
 *      figure uses 5.6 cm so that every pair of circles really meets — the
 *      smallest value that satisfies the printed condition with a visible
 *      margin (5 cm would be exactly the largest side/2 threshold... see the
 *      note in `lesson-13-geometry.ts`: with 5 the two circles of the pair
 *      (CA, AB) are tangent, not secant, so nothing could be constructed).
 * ============================================================================
 */

export const L13_LESSON_TITLE = 'محور ضلع في المثلث';
export const L13_UNIT_TITLE = 'مستقيمات مميزة في المثلث';

export const L13_SOURCE_53 = {
  page: 53,
  locator: 'الانطلاقة نشاطة — الوحدة الثالثة',
} as const;

export const L13_SOURCE_54 = {
  page: 54,
  locator: 'نشاط + تعلّم — محور ضلع في المثلث',
} as const;

export const L13_SOURCE_55 = {
  page: 55,
  locator: 'خاصة وتعریف + تحقّق من فهمك + تدرّب',
} as const;

/* -------------------------------------------------------------------------- */
/*  Page 53 — الانطلاقة نشاطة                                                  */
/* -------------------------------------------------------------------------- */

export const L13_OPENER_INTRO =
  'في كلٍّ مما يلي، واحدة فقط من الإجابات الثلاث ① و ② و ③ المقترحة صحيحة، أشر إليها:';

export const L13_OPENER_Q1 = 'محور الضلع $[BC]$ في المثلث $ABC$ هو في الشكل .....';

export const L13_OPENER_Q2 = 'الارتفاع المتعلق بالضلع $[BC]$ في المثلث $ABC$ هو في الشكل .....';

export const L13_OPENER_Q3_SETUP = '$(d)$ هو محور القطعة $[JK]$ و $M$ تنتمي إلى $(d)$.';

export const L13_OPENER_Q3_OPTIONS = ['$MJ > MK$', '$MJ < MK$', '$MJ = MK$'] as const;

export const L13_OPENER_Q4 = 'منصف الزاوية $\\widehat{AMK}$ مرسوم في الشكل .....';

export const L13_OPENER_Q5 =
  'الأقواس الدائرية التي مراكزها $E$ و $F$ و $A$ وأنصاف أقطارها متساوية تفيد في رسم:';

export const L13_OPENER_Q5_OPTIONS = [
  'الارتفاع المتعلق بالضلع $[BC]$.',
  'محور الضلع $[BC]$.',
  'منصف الزاوية $\\widehat{BAC}$.',
] as const;

/* -------------------------------------------------------------------------- */
/*  Page 54 — نشاط «محاور أضلاع المثلث متلاقية»                                */
/* -------------------------------------------------------------------------- */

export const L13_ACTIVITY_SUBTITLE = '« محاور أضلاع المثلث متلاقية »';

export const L13_ACTIVITY_1_1 =
  "ارسم مثلثًا $ABC$ ثم ارسم $(d)$ محور ضلعه $[AB]$ و $(d')$ محور ضلعه $[BC]$.";

export const L13_ACTIVITY_1_2 = "ارمز إلى نقطة تقاطع $(d)$ و $(d')$ بالرمز $O$.";

/** The marginal warning of the page, verbatim. */
export const L13_ACTIVITY_WARNING =
  'يجب ألّا يُرسم شكل في حالة خاصة. في مثالنا لا يجب رسم مثلث قائم أو متساوي الساقين.';

export const L13_ACTIVITY_2_1 =
  'ما خاصة المحور التي تسمح بتأكيد كلٍّ من المساواتين $OA = OB$ و $OB = OC$؟';

export const L13_ACTIVITY_2_2 = 'بالاستفادة من الفقرة ①، اشرح لماذا تنتمي $O$ إلى محور $[AC]$.';

export const L13_ACTIVITY_3_1 = 'ارسم الدائرة $\\mathcal{C}$ التي مركزها $O$ والمارة بالنقطة $A$.';

export const L13_ACTIVITY_3_2 = 'تأمّل ثم اشرح ما سبق.';

export const L13_ACTIVITY_3_3 = 'أعط نقاطًا تمر منها الدائرة $\\mathcal{C}$؟';

export const L13_ACTIVITY_4 =
  'الأقواس الدائرية التي مراكزها $B$ و $C$ وأنصاف أقطارها متساوية حدّد مما يأتي بماذا تفيد هذه الأقواس:';

export const L13_ACTIVITY_4_OPTIONS = [
  'في رسم الارتفاع المتعلق بالضلع $[BC]$.',
  'في رسم محور الضلع $[BC]$.',
  'في رسم منصف الزاوية $\\widehat{BAC}$.',
] as const;

/* -------------------------------------------------------------------------- */
/*  Page 54 — تعلّم: التعريف والخواصّ                                           */
/* -------------------------------------------------------------------------- */

export const L13_DEFINITION_HEADING = 'تعريف';

export const L13_DEFINITION = 'محور ضلع في المثلث هو المستقيم العمودي على هذا الضلع في منتصفه.';

export const L13_PROPERTIES_HEADING = 'خواصّ';

export const L13_PROPERTIES_INTRO = 'إذا كان $(d)$ محور القطعة المستقيمة $[BC]$، عندئذ:';

/** First direction: the point is on the bisector, so it is equidistant. */
export const L13_PROPERTY_FORWARD = 'أيًّا كانت $M$ من $(d)$، كان $MB = MC$.';

/** Converse: equidistant from the ends, so it lies on the bisector. */
export const L13_PROPERTY_BACKWARD = 'إذا كانت النقطة $M$ تحقّق $MB = MC$، كانت $M$ نقطة من $(d)$.';

/* -------------------------------------------------------------------------- */
/*  Page 55 — خاصة وتعریف                                                      */
/* -------------------------------------------------------------------------- */

export const L13_SPECIAL_HEADING = 'خاصة وتعریف';

export const L13_SPECIAL_CONCURRENT = 'المحاور الثلاثة في المثلث تلتقي في نقطة واحدة $O$.';

export const L13_SPECIAL_CENTRE = 'النقطة $O$ هي مركز الدائرة المارة برؤوس المثلث.';

export const L13_SPECIAL_RADII = '$OA = OB = OC$.';

/** The captions printed under the three unnumbered panels of page 55. */
export const L13_SPECIAL_PANEL_CAPTIONS = [
  'المثلث $ABC$ حاد الزوايا',
  'المثلث $ABC$ منفرج في $\\widehat{A}$',
  'المثلث $ABC$ قائم في $\\widehat{A}$',
] as const;

/* -------------------------------------------------------------------------- */
/*  Page 55 — تحقّق من فهمك                                                    */
/* -------------------------------------------------------------------------- */

export const L13_CHECK_1 = 'ارسم دائرة مركزها $O$ ووضع عليها ثلاث نقاط $A$ و $B$ و $C$.';

export const L13_CHECK_2 = 'ارسم مستعينًا بالفرجار المحاور الثلاثة لأضلاع المثلث $ABC$.';

export const L13_CHECK_3 = 'ما الملفت في الشكل الذي رسمته؟';

/* -------------------------------------------------------------------------- */
/*  Page 55 — تدرّب                                                            */
/* -------------------------------------------------------------------------- */

export const L13_PRACTICE_1 =
  'ارسم مثلثًا $ABC$ وارسم محوري ضلعيه $[AB]$ و $[BC]$. ارمز إلى نقطة تقاطعهما بالرمز $M$. أثبت أنّ المثلث $MAC$ متساوي الساقين.';

export const L13_PRACTICE_2_INTRO = 'المثلثان $ABC$ و $ABD$ متساويا الساقين في $A$.';

export const L13_PRACTICE_2_1 = 'ارسم شكلًا.';

export const L13_PRACTICE_2_2 = 'ما مركز الدائرة المارة برؤوس المثلث $BCD$؟';

export const L13_PRACTICE_3_INTRO =
  'ارسم مثلثًا $ABC$ أطوال أضلاعه $AB = 5\\ \\text{cm}$ و $BC = 7.5\\ \\text{cm}$ و $CA = 8\\ \\text{cm}$.';

export const L13_PRACTICE_3_2 =
  'ارسم ثلاث دوائر مراكزها رؤوس المثلث $ABC$ ونصف قطر كلٍّ منها أكبر من $5\\ \\text{cm}$.';

export const L13_PRACTICE_3_3 = 'ارسم المحاور الثلاثة لأضلاع المثلث $ABC$.';

export const L13_PRACTICE_3_4 = 'ما الملفت فيما يتعلق بالدوائر الثلاث والمحاور الثلاثة؟';

/**
 * Every printed prompt of pages 53–55, in printed order — instructions included
 * («ارمز إلى…», «ارسم شكلًا.»), because the platform answers those too: naming
 * the intersection and drawing the figure are part of what the lesson teaches.
 *
 * Each entry is tracked one-for-one by a record in
 * `lesson13TeacherResources.textbookSolutions` (verified by
 * `lesson-13-coverage.test.ts`), so no printed prompt can be dropped without a
 * test failing.
 */
export const L13_PRINTED_PROMPTS = [
  L13_OPENER_Q1,
  L13_OPENER_Q2,
  L13_OPENER_Q3_SETUP,
  L13_OPENER_Q4,
  L13_OPENER_Q5,
  L13_ACTIVITY_1_1,
  L13_ACTIVITY_1_2,
  L13_ACTIVITY_2_1,
  L13_ACTIVITY_2_2,
  L13_ACTIVITY_3_1,
  L13_ACTIVITY_3_2,
  L13_ACTIVITY_3_3,
  L13_ACTIVITY_4,
  L13_CHECK_1,
  L13_CHECK_2,
  L13_CHECK_3,
  L13_PRACTICE_1,
  L13_PRACTICE_2_INTRO,
  L13_PRACTICE_2_1,
  L13_PRACTICE_2_2,
  L13_PRACTICE_3_INTRO,
  L13_PRACTICE_3_2,
  L13_PRACTICE_3_3,
  L13_PRACTICE_3_4,
] as const;
