/**
 * ============================================================================
 *  UNIT 2, LESSON 3 — VERBATIM PRINTED SOURCE (PAGES 36–38)
 * ============================================================================
 *
 *  Single source of truth for the textbook text of Lesson 3 of Unit 2
 *  («مستقيمات متوازية وقاطعان», pages 36–38 of Grade 8 Mathematics —
 *  Geometry). Both the student-facing source steps and the Teacher Area
 *  solutions import from here so a single wording cannot drift between views.
 * ============================================================================
 */

export const L10_LESSON_TITLE = 'مستقيمات متوازية وقاطعان';

export const L10_SOURCE_36 = {
  page: 36,
  section: 'الدرس 3: نشاط وتعلّم — مستقيمات متوازية وقاطعان',
} as const;

export const L10_SOURCE_37 = {
  page: 37,
  section: 'خاصة واكتساب معارف — مبرهنة النسب المتساوية',
} as const;

export const L10_SOURCE_38 = {
  page: 38,
  section: 'تحقّق من فهمك وتدرّب',
} as const;

/* -------------------------------------------------------------------------- */
/*  Page 36 — نشاط «اكتشاف التناسب بين أطوال أضلاع مثلثين»                     */
/* -------------------------------------------------------------------------- */

export const L10_ACTIVITY_SUBTITLE = '« اكتشاف التناسب بين أطوال أضلاع مثلثين »';

export const L10_ACTIVITY_SETUP =
  'مثلثان $ABC$ و $AMN$، $M \\in [AB]$ و $N \\in [AC]$ و $(MN) \\parallel (BC)$.';

export const L10_ACTIVITY_QUESTIONS = [
  {
    marker: '1.',
    text: 'في كلٍّ من الأشكال السابقة، قس أطوال أضلاع كلٍ من المثلثين $ABC$ و $AMN$، ثم نظّمْ جدولاً بالنتائج لكلّ حالة كالجدول الآتي:',
  },
  {
    marker: '2.',
    text: 'هل كل جدول من الجداول الثلاثة هو جدول تناسب؟',
  },
] as const;

/** Printed table cells of the activity (dotted blanks the student fills). */
export const L10_ACTIVITY_TABLE = {
  columns: [
    'أطوال أضلاع المثلث $AMN$',
    '$AM = \\cdots\\cdots$',
    '$AN = \\cdots\\cdots$',
    '$MN = \\cdots\\cdots$',
  ],
  secondRow: [
    'أطوال أضلاع المثلث $ABC$',
    '$AB = \\cdots\\cdots$',
    '$AC = \\cdots\\cdots$',
    '$BC = \\cdots\\cdots$',
  ],
} as const;

export const L10_ACTIVITY_BULB =
  'من المعلوم أنَّ النتيجة التي توصلنا إليها في العمل السابق لا يعد إثباتاً للحقيقة التالية:';

export const L10_ACTIVITY_BULB_QUOTE =
  '«المثلثان المحقّقان لمعطيات النشاط السابق، أطوال أضلاع أحدهما متناسبة مع أطوال أضلاع الآخر» وسوف نقبل هذه الخاصة في دراستنا اللاحقة دون إثبات، كما أننا سنعرض إثباتاً في حالة خاصة في نشاط الدرس الرابع (تساوي ثلاث نسب).';

/* -------------------------------------------------------------------------- */
/*  Page 36 — تعلّم                                                            */
/* -------------------------------------------------------------------------- */

export const L10_LEARN_HEADING = 'مستقيمان متوازيان وقاطعان';

export const L10_LEARN_EXAMPLE =
  'مثال $ABC$ و $AMN$ مثلثان مكونان من مستقيمين متوازيين $(MN)$ و $(BC)$ يقطعهما قاطعان $(MB)$ و $(AC)$. في هذه الحالة، الجدول الآتي هو جدول تناسب.';

export const L10_LEARN_TABLE = {
  columns: ['أطوال المثلث $AMN$', '$AM$', '$AN$', '$MN$'],
  secondRow: ['أطوال المثلث $ABC$', '$AB$', '$AC$', '$BC$'],
} as const;

/* -------------------------------------------------------------------------- */
/*  Page 37 — خاصة (property box)                                             */
/* -------------------------------------------------------------------------- */

/**
 * Verbatim text of the printed «خاصة» box, INCLUDING its typesetting slip:
 * the scan prints $(MN) \parallel (AB)$, which is impossible because
 * $M \in [AB]$. Every other occurrence on pages 36–38 and the worked examples
 * use the third side $(BC)$; `L10_KHASSA_CORRECTION` records the intended
 * reading, surfaced to students and teachers as a documented erratum.
 */
export const L10_KHASSA_PRINTED =
  'إذا قطع مستقيمٌ ضلعي المثلث $ABC$، $M$ في $[AB]$ و $N$ في $[AC]$ وكان $(MN) \\parallel (AB)$، كانت أطوال المثلث $AMN$ متناسبة مع أطوال أضلاع المثلث $ABC$.';

export const L10_KHASSA_ERRATUM_TOKEN = '$(MN) \\parallel (AB)$';
export const L10_KHASSA_CORRECTION = '$(MN) \\parallel (BC)$';

/* -------------------------------------------------------------------------- */
/*  Page 37 — اكتساب معارف                                                     */
/* -------------------------------------------------------------------------- */

export const L10_KNOWLEDGE_QUESTION = 'كيف نحسب طول قطعة مستقيمة باستعمال مبرهنة النسب المتساوية؟';

export const L10_KNOWLEDGE_INTRO = 'مثال في كلٍ من الحالتين الآتيتين $①$ و $②$ احسب $AS$.';

export const L10_KNOWLEDGE_CASE_1_GIVEN = '$M \\in [AR]$ و $N \\in [AS]$ و $(MN) \\parallel (RS)$';

export const L10_KNOWLEDGE_CASE_2_GIVEN = '$S \\in [AR]$ و $T \\in [AU]$ و $(ST) \\parallel (RU)$';

export const L10_KNOWLEDGE_HINT = 'لحساب الأطوال نستعمل مبرهنة النسب المتساوية.';

export const L10_KNOWLEDGE_CASE_1_SOLUTION =
  'المستقيم $(MN)$ يقطع ضلعي المثلث $ARS$ $[AR]$ و $[AS]$ ويوازي ضلعه الثالث $[RS]$، فيكون، حسب مبرهنة النسب المتساوية:';

export const L10_KNOWLEDGE_CASE_1_MATH = '\\frac{AM}{AR} = \\frac{AN}{AS}';

export const L10_KNOWLEDGE_CASE_1_SUBST =
  'وحسب الأطوال المعطاة في الشكل $\\frac{2}{8} = \\frac{3}{AS}$ ومنها';

export const L10_KNOWLEDGE_CASE_1_RESULT = 'AS = \\frac{3 \\times 8}{2} = 12';

export const L10_KNOWLEDGE_CASE_2_SOLUTION =
  'المستقيم $(TS)$ يقطع $[AR]$ و $[AU]$ ضلعي المثلث $ARU$ على التوالي في $T$ و $S$ ويوازي ضلعه الثالث $[RU]$، فيكون، حسب مبرهنة النسب المتساوية:';

export const L10_KNOWLEDGE_CASE_2_MATH = '\\frac{AT}{AU} = \\frac{AS}{AR}';

export const L10_KNOWLEDGE_CASE_2_SUBST =
  'وحسب الأطوال المعطاة في الشكل: $\\frac{2}{5} = \\frac{AS}{10}$، ومنها';

export const L10_KNOWLEDGE_CASE_2_RESULT = 'AS = \\frac{10 \\times 2}{5} = 4';

/* -------------------------------------------------------------------------- */
/*  Page 38 — تحقّق من فهمك                                                    */
/* -------------------------------------------------------------------------- */

export const L10_CHECK =
  'في الشكل المرافق، $ABC$ و $AEF$ مثلثان. $(EF) \\parallel (BC)$ و $AC = 12$ و $AE = 3$ و $AF = 4$. احسب الطول $AB$ واستنتج الطول $EB$.';

/* -------------------------------------------------------------------------- */
/*  Page 38 — تدرّب                                                            */
/* -------------------------------------------------------------------------- */

export const L10_PRACTICE_1 =
  'في كلٍ من الشكلين $①$ و $②$ خمسة مستقيمات. في كل شكل، أشر إلى كل مثلثين محددين بمستقيمين متوازيين ومستقيمين قاطعين لهما.';

export const L10_PRACTICE_2 =
  'في الشكل المرافق، $JKL$ و $JMN$ مثلثان. $(MN) \\parallel (KL)$ و $KL = 6$ و $JN = 3$ و $JM = 2.5$ و $NL = 9$. احسب كل من الطولين $JK$ ، $MN$.';

/**
 * Every printed question/example prompt on pages 36–38 tracked one-for-one in
 * `lesson10TeacherResources.textbookSolutions`.
 */
export const L10_PRINTED_PROMPTS = [
  L10_ACTIVITY_QUESTIONS[0].text,
  L10_ACTIVITY_QUESTIONS[1].text,
  L10_LEARN_EXAMPLE,
  L10_KNOWLEDGE_INTRO,
  L10_CHECK,
  L10_PRACTICE_1,
  L10_PRACTICE_2,
] as const;
