/**
 * ============================================================================
 *  UNIT 2, LESSON 4 — VERBATIM PRINTED SOURCE (PAGES 39–41)
 * ============================================================================
 *
 *  Single source of truth for the textbook text of the last lesson of Unit 2
 *  («تساوي ثلاث نسب», pages 39–41). Both the student-facing source steps and
 *  the Teacher Area solutions import from here so the wording cannot drift
 *  between the two views.
 *
 *  DOCUMENTED READING NOTES (nothing here is silently repaired):
 *
 *   1. Page 39 prints «I و M نقطتان من ضلعه [AB] تحققان.» and breaks off; the
 *      condition itself is never spelled out in that sentence. Step ① of the
 *      activity then states «حسب معطيات النص AM/AB = 2/3», and the printed
 *      figure carries three equal-part ticks on [AB]. `L11_ACTIVITY_SETUP_NOTE`
 *      records that reading; no extra condition is invented.
 *
 *   2. The theorem box on page 40 prints $(MN) \parallel (AB)$, which is
 *      impossible since $M \in [AB]$: the same typesetting slip already
 *      documented for the «خاصة» box of page 37 (Lesson 3). The printed wording
 *      is preserved verbatim in `L11_THEOREM_PRINTED`; `L11_THEOREM_CORRECTION`
 *      records the reading used by every figure and computation on pages 39–41.
 *
 *   3. The three figures of «تدرّب ②» (page 41) carry no printed condition: the
 *      parallel relation is shown by the printed arrow marks only. The
 *      reading used is stated in `L11_PRACTICE_2_READING`.
 * ============================================================================
 */

export const L11_LESSON_TITLE = 'تساوي ثلاث نسب';

export const L11_SOURCE_39 = {
  page: 39,
  section: 'الدرس 4: نشاط — إثبات الخاصة السابقة في حالة خاصة',
} as const;

export const L11_SOURCE_40 = {
  page: 40,
  section: 'تعلّم — مبرهنة النسب الثلاث المتساوية',
} as const;

export const L11_SOURCE_41 = {
  page: 41,
  section: 'تكملة الحل — تحقّق من فهمك وتدرّب',
} as const;

/* -------------------------------------------------------------------------- */
/*  Page 39 — نشاط «إثبات الخاصة السابقة في حالة خاصة»                        */
/* -------------------------------------------------------------------------- */

export const L11_ACTIVITY_SUBTITLE = '« إثبات الخاصة السابقة في حالة خاصة »';

export const L11_ACTIVITY_SETUP =
  'مثلث $ABC$، $I$ و $M$ نقطتان من ضلعه $[AB]$ تحققان. $N$ نقطة من الضلع $[AC]$ تحقق $(MN) \\parallel (BC)$.';

export const L11_ACTIVITY_SETUP_NOTE =
  'الجملة المطبوعة تقف عند «تحققان.» دون ذكر الشرط صراحةً؛ والشرط الذي تعتمده المنصّة هو ما تصرّح به الخطوة ① من النشاط نفسه («حسب معطيات النص $\\frac{AM}{AB} = \\frac{2}{3}$») وما تحمله علامات التساوي الثلاث على $[AB]$ في الشكل المطبوع: $AI = IM = MB$، ومنها $I$ منتصف $[AM]$ و $\\frac{AM}{AB} = \\frac{2}{3}$.';

export const L11_ACTIVITY_GOAL =
  'نسعى إلى إثبات أن $\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}$';

export const L11_ACTIVITY_STEP1_TITLE = 'النسبة $\\frac{AM}{AB}$';

export const L11_ACTIVITY_STEP1_GIVEN = 'حسب معطيات النص $\\frac{AM}{AB} = \\frac{2}{3}$';

export const L11_ACTIVITY_STEP2_TITLE = 'النسبة $\\frac{AN}{AC}$';

export const L11_ACTIVITY_STEP2_CONSTRUCT_J =
  'نرسم من النقطة $I$ المستقيم الموازي للمستقيم $(MN)$ ونرمز إلى نقطة تقاطعه مع $(AC)$ بالرمز $J$.';

export const L11_ACTIVITY_STEP2_CONSTRUCT_P =
  'نرسم المستقيم $(BJ)$ ونرمز إلى نقطة تقاطعه مع $(MN)$ بالرمز $P$.';

export const L11_ACTIVITY_STEP3_TITLE = 'النسبة $\\frac{MN}{BC}$';

export const L11_ACTIVITY_STEP3_CONSTRUCT_R =
  'نرسم من النقطة $J$ المستقيم الموازي للمستقيم $(AB)$ ونرمز إلى نقطة تقاطعه مع $(BC)$ بالرمز $R$.';

export const L11_ACTIVITY_STEP3_CONSTRUCT_S =
  'نرسم من النقطة $N$ المستقيم الموازي للمستقيم $(AB)$ ونرمز إلى نقطة تقاطعه مع $(BC)$ بالرمز $S$.';

/* -------------------------------------------------------------------------- */
/*  The printed questions of page 39 (verbatim, one constant per prompt)      */
/* -------------------------------------------------------------------------- */

export const L11_Q_J = 'أثبت أن $J$ هي منتصف $[AN]$.';

export const L11_Q_P = 'أثبت أن $P$ هي منتصف $[BJ]$.';

export const L11_Q_N = 'استنتج أن $N$ هي منتصف $[CJ]$.';

export const L11_Q_AN_RATIO = 'اشرح لماذا $\\frac{AN}{AC} = \\frac{2}{3}$؟';

export const L11_Q_CS = 'اشرح لماذا $CS = SR = RB$. استنتج قيمة النسبة $\\frac{BS}{BC}$.';

export const L11_Q_BSNM =
  'ما طبيعة الرباعي $BSNM$؟ علّل إجابتك. استنتج أن $\\frac{MN}{BC} = \\frac{2}{3}$.';

/* -------------------------------------------------------------------------- */
/*  Page 40 — تعلّم «مبرهنة النسب الثلاث المتساوية»                            */
/* -------------------------------------------------------------------------- */

export const L11_THEOREM_HEADING = 'مبرهنة النسب الثلاث المتساوية:';

/**
 * Verbatim statement of the printed theorem box, INCLUDING its typesetting
 * slip: the scan prints $(MN) \parallel (AB)$ although $M \in [AB]$, exactly
 * as in the page-37 «خاصة» box. `L11_THEOREM_CORRECTION` is the reading used
 * everywhere else in the lesson and in the figures of pages 39–41.
 */
export const L11_THEOREM_PRINTED =
  'إذا قطع مستقيم $(d)$ ضلعي المثلث $ABC$، $[AB]$ في $M$ و $(AC)$ في $N$، وكان $(MN) \\parallel (AB)$، كان $\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}$.';

export const L11_THEOREM_ERRATUM_TOKEN = '$(MN) \\parallel (AB)$';
export const L11_THEOREM_CORRECTION = '$(MN) \\parallel (BC)$';

export const L11_NOTE_EXTENSION =
  'تصح هذه المبرهنة أيضاً في حالة كون المستقيم $(d)$ قاطعاً امتدادي $[AB]$ و $[AC]$.';

export const L11_NOTE_WRITING =
  'لكتابة المساواة المبنية على مبرهنة النسب الثلاث المتساوية والمتعلقة بمثلثين متشابهين:';

export const L11_WRITE_RULE_1 = 'نكتب في البسوط أضلاع أحد المثلثين.';

export const L11_WRITE_RULE_2 =
  'نكتب في المقامات أضلاع المثلث الآخر الموافقة بالترتيب مع أضلاع المثلث الأول.';

export const L11_CORRESPONDENCE_AB = 'ضلعان على $(AB)$';
export const L11_CORRESPONDENCE_AC = 'ضلعان على $(AC)$';
export const L11_CORRESPONDENCE_PARALLEL = 'ضلعان متوازيان';

/* -------------------------------------------------------------------------- */
/*  Page 40 — مثال                                                             */
/* -------------------------------------------------------------------------- */

export const L11_EXAMPLE =
  'مثلث $ABC$ أطوال أضلاعه $AB = 3$ و $AC = 6$ و $BC = 5$. المستقيم $(d)$ يوازي $(BC)$ ويقطع $[AB]$ في $E$ و $[AC]$ في $F$. فإذا علمت أن $AE = 2$. احسب أطوال أضلاع المثلث $AEF$.';

export const L11_EXAMPLE_PROMPT = 'احسب أطوال أضلاع المثلث $AEF$.';

export const L11_SOLUTION_INTRO =
  'نرسم شكلاً يتفق مع معطيات النص. ولحساب أطوال أضلاع المثلث $AEF$، نستعمل مبرهنة النسب المتساوية. المستقيم $(d)$ يقطع $[AB]$ و $[AC]$ ضلعي المثلث $ABC$ على التوالي في $E$ و $F$ ويوازي ضلعه الثالث $[BC]$،';

export const L11_SOLUTION_RATIOS =
  'فيكون، حسب مبرهنة النسب المتساوية: $\\frac{AE}{AB} = \\frac{AF}{AC} = \\frac{EF}{BC}$.';

export const L11_SOLUTION_SUBST =
  'وحسب الأطوال المعطاة في الشكل: $\\frac{AE}{AB} = \\frac{2}{3} = \\frac{AF}{6} = \\frac{EF}{5}$ ($AE = 2$ حسب النص)';

export const L11_SOLUTION_AF = 'AF = \\frac{6 \\times 2}{3} = 4';

export const L11_SOLUTION_EF = 'EF = \\frac{5 \\times 2}{3} = \\frac{10}{3}';

/* -------------------------------------------------------------------------- */
/*  Page 41 — تحقّق من فهمك                                                    */
/* -------------------------------------------------------------------------- */

export const L11_CHECK_INTRO = 'في كلٍّ من الحالتين ① و ② اكتب ثلاث نسب متساوية.';

export const L11_CHECK_CASE_1 = '$D \\in [AB]$ ؛ $E \\in [AC]$ ؛ $(DE) \\parallel (BC)$';

export const L11_CHECK_CASE_2 = '$I \\in [FG]$ ؛ $J \\in [FH]$ ؛ $(IJ) \\parallel (GH)$';

/* -------------------------------------------------------------------------- */
/*  Page 41 — تدرّب                                                            */
/* -------------------------------------------------------------------------- */

export const L11_PRACTICE_1 =
  'في كلٍّ من الحالات الآتية، المستقيمان الملوّنان بالأحمر متوازيان. بيّن إن كانت المساواة $\\frac{8}{5} = \\frac{x}{15}$ صحيحة أم لا.';

export const L11_PRACTICE_2 = 'في كلٍّ من الأشكال الثلاث الآتية، اكتب النسب المتساوية الثلاث.';

/**
 * The three figures of «تدرّب ②» print vertex names and parallel arrow marks
 * only; the relation itself is not written in words. This is the reading used
 * by the published solutions — recorded here rather than presented as printed
 * prose.
 */
export const L11_PRACTICE_2_READING =
  'الأشكال الثلاثة لا تحمل نصاً مطبوعاً: يقتصر المطبوع على أسماء الرؤوس وأسهم التوازي. والقراءة المعتمدة هي: ① $I \\in [AB]$ و $J \\in [AC]$ و $(IJ) \\parallel (BC)$ في المثلث $ABC$؛ ② $H \\in [EF]$ و $K \\in [EG]$ و $(HK) \\parallel (FG)$ في المثلث $EFG$؛ ③ $Q \\in [OM]$ و $P \\in [ON]$ و $(QP) \\parallel (MN)$ في المثلث $OMN$.';

/**
 * Every printed question/example prompt on pages 39–41, in printed order and
 * tracked one-for-one in `lesson11TeacherResources.textbookSolutions`.
 *
 * The two section instructions (`L11_CHECK_INTRO`, the «تدرّب» lead-ins
 * «في كلٍّ من الحالات الآتية…» / «في كلٍّ من الأشكال الثلاثة…») are rendered as
 * group titles; the prompts below are the exact strings the student answers,
 * and each one has a teacher record whose `question` field is this same string
 * (verified by `lesson-11-coverage.test.ts`).
 */
export const L11_PRINTED_PROMPTS = [
  L11_Q_J,
  L11_Q_P,
  L11_Q_N,
  L11_Q_AN_RATIO,
  L11_Q_CS,
  L11_Q_BSNM,
  L11_EXAMPLE_PROMPT,
  L11_CHECK_CASE_1,
  L11_CHECK_CASE_2,
  L11_PRACTICE_1,
  L11_PRACTICE_2,
] as const;
