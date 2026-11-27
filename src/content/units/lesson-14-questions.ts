/**
 * ============================================================================
 *  UNIT 3, LESSON 2 — VERBATIM PRINTED SOURCE (PAGES 56–58)
 * ============================================================================
 *
 *  Single source of truth for the textbook text of «ارتفاع مثلث», the second
 *  lesson of Unit 3 «مستقيمات مميزة في المثلث». The student-facing source steps
 *  and the Teacher Area solutions both import from here, so the wording cannot
 *  drift between the two views.
 *
 *  DOCUMENTED READING NOTES (nothing is silently repaired):
 *
 *   1. Page 58 «تدرّب» prints its items ①, ②, ④ — there is NO ③. The platform
 *      keeps the printed labels ①, ②, ④ verbatim and does not invent a ③.
 *
 *   2. The page-56 proof names the parallelograms $MACB$ and $BACN$ and asks to
 *      deduce $MA = AP$. $MACB$ gives $MA = BC$; the parallelogram giving
 *      $AP = BC$ is $ABCP$ (same argument). The printed names are reproduced
 *      verbatim; the derived solution states the full chain explicitly. This is
 *      a documented reading note, not a guessed correction.
 *
 *   3. The definition figure names the foot of the altitude from $A$ as $P$;
 *      this is independent of the proof figure's $P$.
 *
 *   4. The pages print NO answer for the activity, the proof, «تحقّق من فهمك»
 *      or «تدرّب». Example 1 and Example 2 DO print a solution («الحل»); those
 *      are reproduced verbatim and labelled as printed, while every other
 *      solution is platform-derived.
 * ============================================================================
 */

export const L14_LESSON_TITLE = 'ارتفاع مثلث';
export const L14_UNIT_TITLE = 'مستقيمات مميزة في المثلث';

export const L14_SOURCE_56 = {
  page: 56,
  locator: 'نشاط + إثبات + تعلّم — ارتفاع مثلث',
} as const;

export const L14_SOURCE_57 = {
  page: 57,
  locator: 'خاصة وتعريف + اكتساب معارف + مثالان',
} as const;

export const L14_SOURCE_58 = {
  page: 58,
  locator: 'حل المثال 2 + تحقّق من فهمك + تدرّب',
} as const;

/* -------------------------------------------------------------------------- */
/*  Page 56 — نشاط «ارتفاعات المثلث متلاقية»                                   */
/* -------------------------------------------------------------------------- */

export const L14_ACTIVITY_SUBTITLE = '« ملاحظة ثم تأكيد أنّ ارتفاعات المثلث متلاقية »';

export const L14_ACTIVITY_1 =
  'في كل من الحالات الآتية، ارسم مثلثًا $ABC$ وارسم ارتفاعاته المتعلقة بأضلاعه الثلاثة. ماذا تلاحظ؟';

export const L14_ACTIVITY_CASES = [
  'المثلث $ABC$ حاد الزوايا.',
  'في المثلث $ABC$ زاوية منفرجة.',
  'في المثلث $ABC$ زاوية قائمة.',
] as const;

/* -------------------------------------------------------------------------- */
/*  Page 56 — إثبات                                                            */
/* -------------------------------------------------------------------------- */

export const L14_PROOF_INTRO =
  'في الشكل المرافق ثلاثة مستقيمات مارّة برؤوس المثلث $ABC$ متلاقية في $M$ و $N$ و $P$ وكل منها يوازي الضلع المقابل.';

export const L14_PROOF_1 = 'ارسم الشكل لديك.';

export const L14_PROOF_2 =
  'لماذا كل من الرباعيين $MACB$ و $BACN$ هو متوازي أضلاع؟ اشرح، إذن، لماذا $MA = AP$؟ ماذا تستنتج فيما يتعلق بالنقطة $A$؟';

export const L14_PROOF_3 = 'بطريقة مماثلة، ماذا تستنتج فيما يتعلق بكل من النقطتين $B$ و $C$؟';

export const L14_PROOF_4 = 'ارسم محاور أضلاع المثلث $MNP$. ارمز إلى نقطة تلاقيها بالرمز $H$.';

export const L14_PROOF_5 = 'ماذا تعني تلك المحاور بالنسبة إلى المثلث $ABC$؟';

export const L14_PROOF_CONCLUDE = 'اشرح إجابتك، ثم اكتب نصًّا لخاصة بارتفاعات مثلث.';

/* -------------------------------------------------------------------------- */
/*  Page 56 — تعلّم: تعريف ارتفاع المثلث                                       */
/* -------------------------------------------------------------------------- */

export const L14_DEFINITION_HEADING = 'تعريف ارتفاع المثلث';

export const L14_DEFINITION = 'هو المستقيم المار بأحد رؤوسه والعمودي على الضلع المقابل لهذا الرأس.';

export const L14_DEFINITION_HINT =
  'في الشكل المرسوم جانبًا: نقول إنّ النقطة $P$ هي موقع الارتفاع $(d)$ المرسوم من $A$، وهي مسقط $A$ على $(BC)$. ونقول أحيانًا إنّ القطعة المستقيمة $[AP]$ هي الارتفاع المرسوم من $A$ للمثلث $ABC$.';

/* -------------------------------------------------------------------------- */
/*  Page 57 — خاصة وتعريف                                                      */
/* -------------------------------------------------------------------------- */

export const L14_SPECIAL_HEADING = 'خاصة وتعريف';

export const L14_SPECIAL_CONCURRENT = 'الارتفاعات الثلاثة في المثلث تلتقي في نقطة واحدة $H$.';

/** The captions printed under the three panels of page 57 (right → left). */
export const L14_SPECIAL_PANEL_CAPTIONS = [
  'المثلث $ABC$ حاد الزوايا',
  'المثلث $ABC$ منفرج في $\\widehat{A}$',
  'المثلث $ABC$ قائم في $\\widehat{A}$',
] as const;

/* -------------------------------------------------------------------------- */
/*  Page 57 — اكتساب معارف                                                     */
/* -------------------------------------------------------------------------- */

export const L14_SKILL_HEADING = 'كيف نحدد نقطة تلاقي ارتفاعات مثلث (مركز تعامد المثلث)؟';

export const L14_SKILL_BODY =
  'لتحديد نقطة تلاقي ارتفاعات مثلث، يكفي رسم ارتفاعين له. فتكون نقطة تقاطعهما هي نقطة تلاقي ارتفاعات هذا المثلث.';

/* -------------------------------------------------------------------------- */
/*  Page 57 — مثال 1 (مع حلّ مطبوع)                                            */
/* -------------------------------------------------------------------------- */

export const L14_EXAMPLE_1 =
  'ارسم مثلثًا $ABC$ زاويته $\\widehat{A}$ منفرجة، مثل المثلث المرسوم جانبًا. ارسم نقطة تلاقي ارتفاعاته $H$.';

export const L14_EXAMPLE_1_HINT = 'لرسم الارتفاع من الرأس $B$، نمدّد نصف المستقيم $[CA)$.';

export const L14_EXAMPLE_1_SOLUTION =
  'نرسم ارتفاعي المثلث من $A$ و $B$ فيتقاطعان في نقطة $H$، هي نقطة تلاقي الارتفاعات. (لاحظ أنّ $H$ تقع خارج المثلث $ABC$).';

/* -------------------------------------------------------------------------- */
/*  Page 57–58 — مثال 2 (مع حلّ مطبوع في صفحة 58)                              */
/* -------------------------------------------------------------------------- */

export const L14_EXAMPLE_2 =
  '$[AL]$ و $[CK]$ ارتفاعان في المثلث $ABC$. $H$ هي نقطة تلاقي ارتفاعات هذا المثلث. أين تقع نقطة تلاقي ارتفاعات المثلث $AHC$؟ اشرح إجابتك.';

export const L14_EXAMPLE_2_HINT =
  'لتحديد نقطة تلاقي ارتفاعات مثلث $AHC$ نبحث عن ارتفاعين لهذا المثلث.';

export const L14_EXAMPLE_2_SOLUTION =
  'في المثلث $AHC$: $(CH)$ و $(AB)$ متعامدان، إذن $[AB]$ هو الارتفاع المرسوم من $A$. $(AH)$ و $(CB)$ متعامدان، إذن $[CB]$ هو الارتفاع المرسوم من $C$. هذان الارتفاعان متقاطعان في $B$، فنقطة تلاقي ارتفاعات المثلث $AHC$ هي النقطة $B$.';

/* -------------------------------------------------------------------------- */
/*  Page 58 — تحقّق من فهمك                                                    */
/* -------------------------------------------------------------------------- */

export const L14_CHECK =
  'ارسم مثلثًا $ABC$ بحيث يكون $\\widehat{B} = 120^\\circ$ و $BA = 5\\ \\text{cm}$ و $BC = 4\\ \\text{cm}$. ثم عين على الرسم نقطة تلاقي ارتفاعات هذا المثلث.';

/* -------------------------------------------------------------------------- */
/*  Page 58 — تدرّب (①، ②، ④ — لا ③ مطبوعة)                                   */
/* -------------------------------------------------------------------------- */

export const L14_PRACTICE_1 =
  'ارسم مثلثًا $ABC$ وارسم نقطة تلاقي ارتفاعاته $H$. ما نقطة تلاقي ارتفاعات كل من المثلثات $AHB$ و $AHC$ و $BHC$؟';

export const L14_PRACTICE_2 =
  'في الشكل المجاور، $[BE]$ و $[CF]$ ارتفاعان في المثلث $ABC$. النقطة $J$ هي نقطة تلاقي ارتفاعات المثلث $ABC$. ما نقطة تلاقي ارتفاعات المثلث $AJB$؟ اشرح إجابتك.';

export const L14_PRACTICE_4_INTRO =
  '$ABCD$ مستطيل مركزه $O$. العمود المرسوم من $O$ على $(AC)$ يلاقي $(DC)$ في $N$ و $(AD)$ في $M$.';

export const L14_PRACTICE_4_1 = 'ارسم شكلاً متفقًا مع معطيات النص.';

export const L14_PRACTICE_4_2 = 'ما نقطة تلاقي ارتفاعات المثلث $AMC$؟';

export const L14_PRACTICE_4_3 = 'ارسم الارتفاع الثالث لهذا المثلث.';

/**
 * Every printed prompt of pages 56–58 that the platform answers, in printed
 * order — instructions included («ارسم الشكل لديك.»), because drawing the
 * figure and naming the intersection are part of what the lesson teaches.
 *
 * Each entry is tracked one-for-one by a record in
 * `lesson14TeacherResources.textbookSolutions` (verified by
 * `lesson-14-coverage.test.ts`), so no printed prompt can be dropped without a
 * test failing. The two printed example solutions are reproduced verbatim and
 * labelled as printed; every other solution is platform-derived.
 */
export const L14_PRINTED_PROMPTS = [
  L14_ACTIVITY_1,
  L14_PROOF_1,
  L14_PROOF_2,
  L14_PROOF_3,
  L14_PROOF_4,
  L14_PROOF_5,
  L14_PROOF_CONCLUDE,
  L14_EXAMPLE_1,
  L14_EXAMPLE_2,
  L14_CHECK,
  L14_PRACTICE_1,
  L14_PRACTICE_2,
  L14_PRACTICE_4_INTRO,
  L14_PRACTICE_4_1,
  L14_PRACTICE_4_2,
  L14_PRACTICE_4_3,
] as const;
