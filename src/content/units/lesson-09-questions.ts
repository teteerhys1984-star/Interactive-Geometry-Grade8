/**
 * ============================================================================
 *  UNIT 2, LESSON 2 — VERBATIM PRINTED SOURCE (PAGES 34–35)
 * ============================================================================
 *
 *  Single source of truth for the textbook text of Lesson 2 of Unit 2
 *  («موازٍ لضلع من منتصف ضلع آخر», pages 34–35 of Grade 8 Mathematics —
 *  Geometry). Both the student-facing source steps and the Teacher Area
 *  solutions import from here so a single wording cannot drift between views.
 * ============================================================================
 */

export const L9_LESSON_TITLE = 'موازٍ لضلع من منتصف ضلع آخر';

export const L9_SOURCE_34 = {
  page: 34,
  section: 'الدرس 2: موازٍ لضلع من منتصف ضلع آخر',
} as const;

export const L9_SOURCE_35 = {
  page: 35,
  section: 'اكتساب معارف · تحقّق من فهمك · تدرّب',
} as const;

/* -------------------------------------------------------------------------- */
/*  Page 34 — نشاط                                                             */
/* -------------------------------------------------------------------------- */

export const L9_ACTIVITY_SUBTITLE =
  '« تمهيد خاصة المستقيم المار بمنتصف ضلع في المثلث موازياً ضلعاً آخر منه »';

export const L9_ACTIVITY_SETUP_1 =
  'في الشكل ① ، $ABC$ مثلث، $M$ منتصف الضلع $[AB]$. رسم سليم يدوياً المستقيم $(d)$ ماراً بالنقطة $M$ وموازياً ضلعه $[BC]$، فقطع $[AC]$ في $P$. وحصل على الشكل ② .';

export const L9_ACTIVITY_SETUP_2 =
  "وضَعَ النقطة $N$ في منتصف $[AC]$ ورسم المستقيم $(d')$ ماراً بالنقطتين $M$ و $N$، فحصل على الشكل ③ ، واتضح أنَّ المستقيمين $(d')$ و $(d)$ غير منطبقين.";

export const L9_ACTIVITY_QUESTIONS = [
  {
    marker: '1.',
    text: 'اشرح لماذا أخطأ سليم في رسم المستقيم $(d)$.',
  },
  {
    marker: '2.',
    text: 'صغ إثباتاً، بلغة سليمة وأسلوب شيق لإثبات أنَّ: المستقيم المار بمنتصف ضلع في المثلث موازياً ضلعاً آخر، يقطع الضلع الثالثة في منتصفه.',
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  Page 34 — تعلّم                                                            */
/* -------------------------------------------------------------------------- */

export const L9_THEOREM_STATEMENT =
  'المستقيم المار بمنتصف أحد أضلاع مثلث موازياً ضلعاً آخر، يقطع الضلع الثالثة في منتصفه.';

export const L9_EXAMPLE_HEADER = 'مثال في الشكل المرافق:';
export const L9_EXAMPLE_GIVEN =
  'المعطيات: في المثلث $ABC$ ، $I$ منتصف $[AB]$ و $(IJ) \\parallel (BC)$';
export const L9_EXAMPLE_REASON = 'حسب المبرهنة الثانية في المنتصفات';
export const L9_EXAMPLE_RESULT = 'النتيجة: $J$ منتصف $[AC]$.';

export const L9_EXAMPLE_PROMPT = `${L9_EXAMPLE_GIVEN} — ${L9_EXAMPLE_REASON} — ${L9_EXAMPLE_RESULT}`;

export const L9_METHOD_TITLE = 'لاستعمال المبرهنة الثانية في المنتصفات، يجب:';

export const L9_METHOD_STEPS = [
  'تحديد المثلث الذي نطبق عليه المبرهنة.',
  'تحديد منتصف أحد أضلاعه والمستقيم المار بهذا المنتصف موازياً ضلعاً آخر.',
  'استنتاج « إذن النقطة .... هي منتصف الضلع الثالث .... »',
] as const;

/* -------------------------------------------------------------------------- */
/*  Page 35 — اكتساب معارف                                                     */
/* -------------------------------------------------------------------------- */

export const L9_KNOWLEDGE_QUESTION = 'كيف نثبت وقوع نقطة في منتصف قطعة مستقيمة ؟';

export const L9_KNOWLEDGE_PROMPT =
  '$ABC$ مثلث، $M$ نقطة من $[BC]$ و $R$ منتصف $[AM]$ و $(d)$ هو المستقيم المار بالنقطة $R$ موازياً $(BC)$ وقاطعاً $[AB]$ في $S$. أثبت أنَّ $S$ هي منتصف $[AB]$.';

export const L9_KNOWLEDGE_HINTS = [
  'لإثبات أنَّ نقطةً هي منتصف قطعة مستقيمة، فكِّرْ باستعمال قطري متوازي الأضلاع.',
  'في حالة المثال الذي نحن بصدده، معطيات النص توجهنا إلى التفكير بمبرهنة المنتصفات الثانية.',
] as const;

/**
 * Validated mathematical body of the printed «الحل» on page 35.
 *
 * Editorial transparency note: the printed scan of page 35 appends the stray
 * four-word clause «فالمستقيمان $(OB)$ و $(AI)$ متوازيان.» at the end of this
 * paragraph — an accidental typesetting carryover from the final line of
 * Lesson 1's «الحل» on page 33 (where points $O$ and $I$ exist). Both the
 * student-facing step and the Teacher Area document this carryover explicitly
 * so learners reading from the physical textbook are not confused by $O$ and $I$.
 */
export const L9_KNOWLEDGE_SOLUTION =
  'في المثلث $AMB$ ، المستقيم $(SR)$ يمر بالنقطة $R$ منتصف ضلعه $[AM]$ ويوازي ضلعاً آخر $[BM]$ فهو، حسب المبرهنة الثانية للمنتصفات، يقطع ضلعه الثالث $[AB]$ في منتصفه. أي إنَّ النقطة $S$ هي منتصف $[AB]$.';

export const L9_KNOWLEDGE_ERRATUM_CLAUSE = 'فالمستقيمان $(OB)$ و $(AI)$ متوازيان.';

/* -------------------------------------------------------------------------- */
/*  Page 35 — تحقّق من فهمك                                                    */
/* -------------------------------------------------------------------------- */

export const L9_CHECK_ONE =
  '$ABC$ مثلث. $E$ منتصف $[AC]$ في هذا المثلث، $F$ نقطة من $[BC]$ تحقق $(EF) \\parallel (AB)$. أثبت أنَّ $F$ منتصف $[BC]$.';

export const L9_CHECK_TWO =
  '$ABC$ مثلث قائم في $B$ ، $M$ منتصف $[AB]$ و $(MN) \\perp (AB)$. أثبت أنَّ $N$ منتصف $[AC]$.';

export const L9_CHECK_REMINDER = 'تذكر: العمودان على مستقيم واحد متوازيان.';

/* -------------------------------------------------------------------------- */
/*  Page 35 — تدرّب                                                            */
/* -------------------------------------------------------------------------- */

export const L9_PRACTICE_ONE_INTRO =
  '$IJK$ مثلث. $S$ هي صورة النقطة $I$ وفق التناظر الذي مركزه $J$. المستقيم المار بالنقطة $S$ موازياً $(JK)$ يلاقي المستقيم $(IK)$ في $T$.';

export const L9_PRACTICE_ONE_PARTS = [
  { marker: '1.', text: 'ارسم شكلاً يتفق مع معطيات النص.' },
  { marker: '2.', text: 'أثبت أنَّ $K$ هي منتصف القطعة $[IT]$.' },
] as const;

export const L9_PRACTICE_TWO =
  '$AJP$ مثلث و $C$ منتصف $[AJ]$. نرسم من النقطة $A$ المستقيم الموازي للمستقيم $(CP)$ فيقطع المستقيم $(JP)$ في $M$. ارسم شكلاً يتفق مع معطيات النص، ثم أثبت أنَّ $P$ هي منتصف $[MJ]$.';

/**
 * Every printed question/example prompt on pages 34–35 tracked one-for-one in
 * `lesson09TeacherResources.textbookSolutions`.
 */
export const L9_PRINTED_PROMPTS = [
  ...L9_ACTIVITY_QUESTIONS.map((q) => q.text),
  L9_EXAMPLE_PROMPT,
  L9_KNOWLEDGE_PROMPT,
  L9_CHECK_ONE,
  L9_CHECK_TWO,
  ...L9_PRACTICE_ONE_PARTS.map((q) => q.text),
  L9_PRACTICE_TWO,
] as const;
