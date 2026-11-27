/**
 * ============================================================================
 *  UNIT 3, LESSON 4 — VERBATIM PRINTED SOURCE (PAGES 62–63)
 * ============================================================================
 *
 *  Single source of truth for the textbook text of «منصّف زاوية مثلث», the
 *  fourth lesson of Unit 3. The student-facing source steps and the Teacher Area
 *  solutions both import from here, so the wording cannot drift.
 *
 *  DOCUMENTED READING NOTES (nothing is silently repaired):
 *
 *   1. The first 💡 on page 63 is about the CIRCUMSCRIBED circle (review of
 *      Lesson 1); the second is about the INSCRIBED circle. Both are printed and
 *      both are reproduced verbatim.
 *
 *   2. Angle notation: the source writes a wide arc over three letters
 *      (e.g. $\widehat{CBA}$). The platform uses `\widehat{CBA}` (never ∠/\angle).
 *
 *   3. The proof's given figure shows $H$, $L$, $I$ and the two bisectors; $K$
 *      and the inscribed circle appear only in the solution stages (steps 4–7).
 *      $AH = AK$ is admitted by the source (a next-chapter theorem) and is not
 *      re-proved here.
 *
 *   4. The pages print NO solution for the activity, the proof, «تحقّق من فهمك»
 *      or «تدرّب»; every solution below is platform-derived.
 * ============================================================================
 */

export const L16_LESSON_TITLE = 'منصّف زاوية مثلث';
export const L16_UNIT_TITLE = 'مستقيمات مميزة في المثلث';

export const L16_SOURCE_62 = {
  page: 62,
  locator: 'نشاط + اختبار + إثبات — منصّف زاوية مثلث',
} as const;
export const L16_SOURCE_63 = { page: 63, locator: 'تعلّم + خاصة + تحقّق من فهمك + تدرّب' } as const;

/* -------------------------------------------------------------------------- */
/*  Page 62 — نشاط + اختبار                                                    */
/* -------------------------------------------------------------------------- */

export const L16_ACTIVITY_SUBTITLE = '« ملاحظة ثم تأكيد أنّ منصفات زوايا المثلث متلاقية »';

export const L16_TEST_1 = 'ارسم المثلثين $ABC$ و $EFJ$.';
export const L16_TEST_2 = 'ارسم منصفات الزوايا الثلاث في كل منهما. ماذا تلاحظ؟';

/* -------------------------------------------------------------------------- */
/*  Page 62 — إثبات                                                            */
/* -------------------------------------------------------------------------- */

export const L16_PROOF_INTRO =
  '$ABC$ مثلث، $(d_1)$ و $(d_2)$ منصّفا زاويتيه $\\widehat{B}$ و $\\widehat{C}$. نرمز إلى نقطة تقاطع $(d_1)$ و $(d_2)$ بالرمز $I$. سنستعرض إثباتًا لكون $(AI)$ هو منصف الزاوية $\\widehat{A}$.';

export const L16_PROOF_1 = 'ارسم الشكل المرافق.';
export const L16_PROOF_2 =
  'ارسم النقطة $L$ مسقط $I$ على $(BC)$. وضَع على $[BA]$ نقطة $H$ تحقق $BH = BL$.';
export const L16_PROOF_3 =
  'لماذا $(BI)$ هو محور تناظر للمثلث $BHL$؟ ولماذا هو محور ضلعه $[HL]$؟ استنتج أنّ $IH = IL$ وأنّ $\\widehat{IHB} = 90^\\circ$.';
export const L16_PROOF_4 =
  'وضَع على $[AC]$ نقطة $K$ تحقق $CK = CL$. أثبت أنّ $IK = IL$ وأنّ $\\widehat{IKC} = 90^\\circ$.';
export const L16_PROOF_5 =
  'ما صفة النقطة $I$ في المثلث $HKL$؟ (سنقبل أنّ $AH = AK$، وإثبات ذلك هو حسب مبرهنة سترد في الفصل التالي). بعد هذا، بما يمكن أن نصف المستقيم $(AI)$ بالنسبة إلى القطعة المستقيمة $[HK]$؟';
export const L16_PROOF_6 = 'اشرح، إذن، لماذا $(AI)$ هو منصف الزاوية $\\widehat{A}$؟';
export const L16_PROOF_7 = 'ارسم الدائرة $\\mathcal{C}$ التي مركزها $I$، والمارّة بالنقطة $L$.';

export const L16_PROOF_HINT =
  'سنجد في وحدة قادمة، أنّ الدائرة $\\mathcal{C}$ تمس داخلاً أضلاع $ABC$ في النقاط $L$ و $H$ و $K$ وتسمى الدائرة الماسة لأضلاع المثلث داخلاً.';

/* -------------------------------------------------------------------------- */
/*  Page 63 — تعلّم + خاصة + 💡                                                */
/* -------------------------------------------------------------------------- */

export const L16_DEFINITION_HEADING = 'تعريف';
export const L16_DEFINITION =
  'منصف الزاوية $\\widehat{A}$ هو المستقيم المار بالنقطة $A$ ويقسم هذه الزاوية إلى زاويتين قياساهما متساويان.';

export const L16_SPECIAL_HEADING = 'خاصة وتعريف';
export const L16_SPECIAL =
  'المنصفات الثلاثة لزوايا المثلث تلتقي في نقطة واحدة $I$. النقطة $I$ هي مركز الدائرة الماسة لأضلاع المثلث داخلاً.';

export const L16_HINT_CIRCUM =
  'لرسم الدائرة المارة برؤوس مثلث، يكفي رسم محوري إثنين من أضلاعه. نقطة تقاطعهما هي مركز تلك الدائرة.';

export const L16_HINT_IN =
  'لرسم الدائرة الماسة لأضلاع المثلث داخلاً، يكفي رسم منصفي إثنين من زواياه. نقطة تقاطعهما هي مركز تلك الدائرة.';

/* -------------------------------------------------------------------------- */
/*  Page 63 — تحقّق من فهمك                                                    */
/* -------------------------------------------------------------------------- */

export const L16_CHECK =
  '$ABC$ مثلث فيه $BC = 7\\ \\text{cm}$ و $\\widehat{CBA} = 36^\\circ$ و $\\widehat{BCA} = 64^\\circ$. ارسم هذا المثلث وارسم منصفات زواياه الثلاث.';

/* -------------------------------------------------------------------------- */
/*  Page 63 — تدرّب                                                            */
/* -------------------------------------------------------------------------- */

export const L16_PRACTICE_1 =
  'في الشكل المرسوم جانبًا: النقطة $C$ هي مركز الدائرة المرسومة في المثلث $ERT$. احسب قياس الزاوية $\\widehat{RET}$. علّل إجابتك.';

export const L16_PRACTICE_2_INTRO =
  '$ABC$ مثلث فيه $\\widehat{ABC} = 84^\\circ$ و $\\widehat{ACB} = 62^\\circ$. $J$ هي نقطة تقاطع منصفي هاتين الزاويتين.';

export const L16_PRACTICE_2_1 = 'ارسم شكلاً متفقًا مع معطيات النص.';
export const L16_PRACTICE_2_2 = 'احسب قياس الزاوية $\\widehat{BAC}$.';
export const L16_PRACTICE_2_3 = 'احسب قياسات زوايا كل من المثلثات $JAB$ و $JBC$ و $JCA$.';

/**
 * Every printed prompt of pages 62–63 that the platform answers, in printed
 * order. Each entry is tracked one-for-one by a record in
 * `lesson16TeacherResources.textbookSolutions` (verified by
 * `lesson-16-coverage.test.ts`). Every solution is platform-derived.
 */
export const L16_PRINTED_PROMPTS = [
  L16_TEST_1,
  L16_TEST_2,
  L16_PROOF_1,
  L16_PROOF_2,
  L16_PROOF_3,
  L16_PROOF_4,
  L16_PROOF_5,
  L16_PROOF_6,
  L16_PROOF_7,
  L16_CHECK,
  L16_PRACTICE_1,
  L16_PRACTICE_2_INTRO,
  L16_PRACTICE_2_1,
  L16_PRACTICE_2_2,
  L16_PRACTICE_2_3,
] as const;
