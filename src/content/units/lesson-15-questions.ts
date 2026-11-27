/**
 * ============================================================================
 *  UNIT 3, LESSON 3 — VERBATIM PRINTED SOURCE (PAGES 59–61)
 * ============================================================================
 *
 *  Single source of truth for the textbook text of «المتوسط في المثلث», the
 *  third lesson of Unit 3. The student-facing source steps and the Teacher Area
 *  solutions both import from here, so the wording cannot drift.
 *
 *  DOCUMENTED READING NOTES (nothing is silently repaired):
 *
 *   1. Page 59 proof question 3 prints $(BD) \parallel (JG)$ and $BD = 2JG$
 *      (the midsegment of triangle $ABD$). Confirmed at high zoom: it is $JG$.
 *
 *   2. The properties figure (page 60) marks the halves of $[AB]$ with a single
 *      stroke, $[AC]$ with a small cross, and $[BC]$ with a double stroke —
 *      three distinct marks so no cross-side equality is implied. The platform
 *      expresses the same distinction with 1 / 3 / 2 ticks (documented editorial
 *      adaptation; the meaning — each side is bisected — is unchanged).
 *
 *   3. The page-59 test triangles are printed WITHOUT labels; the labels $ABC$
 *      and $EFJ$ come from the text and are applied only in solution figures.
 *
 *   4. The two examples (pages 60 and 61) print their solutions («الحل»); those
 *      are reproduced verbatim and labelled as printed. The activity, the proof,
 *      «تحقّق من فهمك» and «تدرّب» print no solution; their solutions are
 *      platform-derived.
 * ============================================================================
 */

export const L15_LESSON_TITLE = 'المتوسط في المثلث';
export const L15_UNIT_TITLE = 'مستقيمات مميزة في المثلث';

export const L15_SOURCE_59 = {
  page: 59,
  locator: 'نشاط + معنى الكلمات + إثبات — المتوسط',
} as const;
export const L15_SOURCE_60 = {
  page: 60,
  locator: 'تعلّم + خاصة + خواص + اكتساب معارف + مثال',
} as const;
export const L15_SOURCE_61 = { page: 61, locator: 'مثال + تحقّق من فهمك + تدرّب' } as const;

/* -------------------------------------------------------------------------- */
/*  Page 59 — نشاط + معنى الكلمات                                              */
/* -------------------------------------------------------------------------- */

export const L15_ACTIVITY_SUBTITLE = '« ملاحظة ثم تأكيد أنّ متوسطات المثلث متلاقية »';

export const L15_MEANING =
  'المتوسط المرسوم من $A$ في المثلث $ABC$، هو المستقيم المار بالنقطة $A$ ومنتصف الضلع المقابل $[BC]$.';

export const L15_TEST_1 = 'ارسم المثلثين $ABC$ و $EFJ$.';
export const L15_TEST_2 = 'ارسم المتوسطات الثلاثة لكل منهما.';
export const L15_TEST_3 = 'ماذا تلاحظ؟';

/* -------------------------------------------------------------------------- */
/*  Page 59 — إثبات                                                            */
/* -------------------------------------------------------------------------- */

export const L15_PROOF_INTRO =
  '$ABC$ مثلث، $I$ و $J$ منتصفا ضلعيه $[AC]$ و $[AB]$. نرمز إلى نقطة تقاطع متوسطيه $(BI)$ و $(CJ)$ بالرمز $G$. سنستعرض إثباتًا لكون $(AG)$ هو المتوسط الثالث لهذا المثلث.';

export const L15_PROOF_1 = 'ارسم الشكل المرافق.';
export const L15_PROOF_2 =
  'ارسم النقطة $D$ صورة $A$ وفق التناظر الذي مركزه $G$. ارمز إلى نقطة تقاطع $(AD)$ و $(BC)$ بالرمز $K$.';
export const L15_PROOF_3 =
  'في المثلث $ABD$، لماذا يمكن تأكيد أنّ $(BD) \\parallel (JG)$؟ وتأكيد أنّ $BD = 2JG$؟';
export const L15_PROOF_4 =
  'ما القضايا التي يمكن تأكيدها في المثلث $(ACD)$ بمثل ما أكدت في المثلث $ABD$؟';
export const L15_PROOF_5 =
  'ما طبيعة الرباعي $BGCD$؟ اشرح إجابتك، ثم استنتج أنّ $(AK)$ هو المتوسط الثالث في المثلث $ABC$.';
export const L15_PROOF_6 = 'اشرح لماذا: $BG = 2GI$ و $CG = 2GJ$ و $AG = 2GK$.';
export const L15_PROOF_7 = 'اكتب الخواص التي اكتشفتها والمتعلقة بمتوسطات المثلث ونقطة تلاقيها.';

/* -------------------------------------------------------------------------- */
/*  Page 59 — معنى الكلمات (صندوق الفيزياء)                                    */
/* -------------------------------------------------------------------------- */

export const L15_PHYSICS =
  'في الفيزياء تسمى $G$ نقطة تلاقي متوسطات المثلث «مركز ثقل المثلث». إذا علقت صفيحة مثلثية متجانسة، من نقطة منها فإنّ الشاقول المار بنقطة التعليق يمر بالنقطة $G$.';

/* -------------------------------------------------------------------------- */
/*  Page 60 — تعلّم + خاصة + خواص + اكتساب معارف                               */
/* -------------------------------------------------------------------------- */

export const L15_DEFINITION_HEADING = 'تعريف المتوسط';
export const L15_DEFINITION = 'هو المستقيم المار بأحد رؤوس المثلث ومنتصف الضلع المقابل لهذا الرأس.';
export const L15_DEFINITION_HINT =
  'في الشكل المرسوم جانبًا، نقول إنّ القطعة المستقيمة $[AM]$ هي المتوسط المرسوم من $A$ في المثلث $ABC$.';

export const L15_SPECIAL_HEADING = 'خاصة وتعريف';
export const L15_SPECIAL =
  'المتوسطات الثلاثة في المثلث تلتقي في نقطة واحدة $G$. تسمى هذه النقطة مركز ثقل المثلث.';

export const L15_PROPERTIES_HEADING = 'خواص';
export const L15_PROPERTIES =
  "نقطة تلاقي متوسطات المثلث $ABC$، ولتكن $G$، تقع في نهاية الثلث الثاني لكل من المتوسطات $[AA']$ و $[BB']$ و $[CC']$، أي إنّ: $AG = \\frac{2}{3}AA'$ و $BG = \\frac{2}{3}BB'$ و $CG = \\frac{2}{3}CC'$.";

export const L15_SKILL_HEADING = 'كيف نرسم مركز ثقل مثلث؟';
export const L15_SKILL_BODY =
  'لرسم مركز ثقل مثلث، يكفي رسم متوسطين فيه. نقطة تقاطعهما هي مركز الثقل.';

/* -------------------------------------------------------------------------- */
/*  Page 60 — مثال (مع حلّ مطبوع)                                              */
/* -------------------------------------------------------------------------- */

export const L15_EXAMPLE_1 =
  'في المثلث $ABC$ المرسوم جانبًا: النقطة $M$ هي منتصف $[BC]$، $G \\in [AM]$، $AG = 2.4\\ \\text{cm}$ و $GM = 1.2\\ \\text{cm}$. اشرح لماذا $G$ هي مركز ثقل المثلث $ABC$.';

export const L15_EXAMPLE_1_HINT =
  'مركز ثقل المثلث هو النقطة الواقعة في نهاية الثلث الثاني من أحد المتوسطات بدءًا من رأس المثلث.';

export const L15_EXAMPLE_1_SOLUTION =
  '$M$ هي منتصف $[BC]$، إذن $[AM]$ هو متوسط في المثلث $ABC$. $AG = 2.4 = 2 \\times 1.2 = 2GM$، أي إنّ $AG = \\frac{2}{3}AM$. وبهذا تكون $G$ مركز ثقل المثلث.';

/* -------------------------------------------------------------------------- */
/*  Page 61 — مثال (مع حلّ مطبوع)                                              */
/* -------------------------------------------------------------------------- */

export const L15_EXAMPLE_2 =
  '$ABCD$ متوازي أضلاع مركزه $O$. النقطة $M$ هي منتصف $[AB]$، و $G$ هي نقطة تقاطع $(CM)$ و $(BD)$. اشرح لماذا $G$ هي مركز ثقل المثلث $ABC$.';

export const L15_EXAMPLE_2_HINT = 'مركز ثقل المثلث هو نقطة تقاطع إثنين من متوسطاته.';

export const L15_EXAMPLE_2_SOLUTION =
  'في المثلث $ABC$: $M$ هي منتصف $[AB]$، إذن $[CM]$ متوسط في هذا المثلث. $O$ هي منتصف $[AC]$، لأنّ قطري متوازي الأضلاع $[BD]$ و $[AC]$ متناصفان في $O$، إذن $[BO]$ متوسط آخر في هذا المثلث. $G$ هي نقطة تقاطع المتوسطين $[CM]$ و $[BO]$ في المثلث $ABC$، فهو مركز ثقله.';

/* -------------------------------------------------------------------------- */
/*  Page 61 — تحقّق من فهمك                                                    */
/* -------------------------------------------------------------------------- */

export const L15_CHECK =
  'ارسم مثلثًا $ABC$ فيه $AB = 7\\ \\text{cm}$ و $\\widehat{A} = 70^\\circ$ و $AC = 8\\ \\text{cm}$. ثم ارسم مركز ثقل هذا المثلث.';

/* -------------------------------------------------------------------------- */
/*  Page 61 — تدرّب ①                                                          */
/* -------------------------------------------------------------------------- */

export const L15_PRACTICE_1_INTRO =
  'في كل من الحالتين ① و ② الآتيتين اشرح لماذا $G$ هي مركز ثقل المثلث $ABC$.';

export const L15_PRACTICE_1_CASE1 =
  'النقطة $M$ هي منتصف الضلع $[BC]$ في المثلث $ABC$. $G \\in [AM]$ وتحقق $AG = 3.4\\ \\text{cm}$ و $GM = 1.7\\ \\text{cm}$.';

export const L15_PRACTICE_1_CASE2 =
  '$AMCI$ متوازي أضلاع مركزه $J$. النقطة $I$ هي منتصف القطعة $[AB]$ و $G$ هي نقطة تقاطع المستقيمين $(BJ)$ و $(CI)$.';

/**
 * Every printed prompt of pages 59–61 that the platform answers, in printed
 * order. Each entry is tracked one-for-one by a record in
 * `lesson15TeacherResources.textbookSolutions` (verified by
 * `lesson-15-coverage.test.ts`). The two example solutions are reproduced
 * verbatim and labelled as printed; every other solution is platform-derived.
 */
export const L15_PRINTED_PROMPTS = [
  L15_TEST_1,
  L15_TEST_2,
  L15_TEST_3,
  L15_PROOF_1,
  L15_PROOF_2,
  L15_PROOF_3,
  L15_PROOF_4,
  L15_PROOF_5,
  L15_PROOF_6,
  L15_PROOF_7,
  L15_EXAMPLE_1,
  L15_EXAMPLE_2,
  L15_CHECK,
  L15_PRACTICE_1_INTRO,
  L15_PRACTICE_1_CASE1,
  L15_PRACTICE_1_CASE2,
] as const;
