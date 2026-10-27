import type { SourceRef } from '../schema';

/**
 * ============================================================================
 *  UNIT 2 — «تمارين الوحدة الثانية» · VERBATIM PRINTED SOURCE (Q28–Q34)
 * ============================================================================
 *
 *  Single source of truth for the printed text of the Unit 2 exercise set, so
 *  that the student-facing steps and the Teacher Area notes cannot drift apart.
 *  Every string below is a transcription of the supplied scans — nothing is
 *  paraphrased, corrected or completed.
 *
 *  THE SUPPLIED PAGES CARRY NO PRINTED PAGE NUMBERS. The exercises are
 *  therefore cited by the scan they were read from («صورة المصدر (الوحدة
 *  الثانية) — السؤال N»), never by an invented textbook page. The scan-to-
 *  question map is in docs/UNIT-02-EXERCISES-SOURCE.md.
 *
 *  DOCUMENTED READING NOTES (nothing here is silently repaired):
 *
 *   1. Question 28 prints «$M$ منتصف القطعة $[EF]$» and «$N$ منتصف $[EG]$»:
 *      the two midpoints are named on two DIFFERENT segments, and that
 *      asymmetry is printed, not a slip of this transcription.
 *
 *   2. Question 33 has NO printed section title, while Questions 28–32 and 34
 *      do. No title is invented for it.
 *
 *   3. Question 33, case ② prints «$(CG) \parallel (IF)$» while the printed
 *      figure labels the end of the red segment that starts at $I$ with $M$,
 *      and no $F$ is labelled anywhere in that figure. The printed TEXT is
 *      authoritative and is reproduced verbatim; the discrepancy is recorded in
 *      `lesson-12-teacher.ts` and in docs/UNIT-02-EXERCISES-FIGURES.md, and
 *      the figure is reproduced exactly as printed (the point is $M$).
 *
 *   4. Question 30 asks the student to place $M$ on the ray $[Ax)$; the
 *      printed figure carries no $M$. The figure is reproduced without adding
 *      one.
 *
 *   5. Question 31 is answered with a PHOTOGRAPH, not with a scaled drawing:
 *      the photograph is kept as printed, and the exercise still asks for a
 *      separate schematic.
 * ============================================================================
 */

export const L12_LESSON_TITLE = 'تمارين الوحدة الثانية';

/** The printed green section titles, verbatim. Questions 18 and 33 print none. */
export const L12_TITLE_Q19 = 'تعلُّم تحرير إثبات';
export const L12_TITLE_Q28 = 'من توازٍ إلى تواز';
export const L12_TITLE_Q29 = 'نسب متساوية';
export const L12_TITLE_Q30 = 'تقسيم قطعة مستقيمة';
export const L12_TITLE_Q31 = 'قياس ارتفاع برج';
export const L12_TITLE_Q32 = 'قياس المسافة بين نقطتين لا يمكن الوصول إليهما';
export const L12_TITLE_Q34 = 'التعرف، من جديد، بمنتصف قطعة مستقيمة';

/**
 * The source page label of every exercise of the set. The set is read from
 * the supplied scans; the label names the exercise, not a textbook page.
 */
export function exercisePage(number: number): string {
  return `صورة المصدر (الوحدة الثانية) — السؤال ${number}`;
}

export function exerciseSource(number: number, note?: string): SourceRef {
  return {
    page: exercisePage(number),
    locator: `تمارين الوحدة الثانية — السؤال ${number}`,
    ...(note ? { note } : {}),
  };
}

/* -------------------------------------------------------------------------- */
/*  Question 28                                                                  */
/* -------------------------------------------------------------------------- */

export const L12_Q28_STEM =
  'في الشكل المرافق: $M$ منتصف القطعة $[EF]$ و $N$ منتصف $[EG]$. المستقيم $(NP)$ يوازي $(GH)$.';
export const L12_Q28_ITEM_1 = 'ما الموقع الخاص بالنقطة $P$. اشرح إجابتك.';
export const L12_Q28_ITEM_2 = 'أثبت أنَّ المستقيم $(MP)$ يوازي المستقيم $(FH)$.';

/* -------------------------------------------------------------------------- */
/*  Question 29                                                                  */
/* -------------------------------------------------------------------------- */

export const L12_Q29_STEM =
  'في الشكل المرافق، تجد أطوال بعض القطع. وعُلم أنَّ $(MN) \\parallel (BC)$.';
export const L12_Q29_ITEM_1 = 'احسب $BC$.';

/* -------------------------------------------------------------------------- */
/*  Question 30                                                                  */
/* -------------------------------------------------------------------------- */

export const L12_Q30_ITEM_1 = 'تأمل الشكل المرافق، ووضِّعْ نقطةً $M$ على نصف المستقيم $[Ax)$.';
export const L12_Q30_ITEM_2 =
  'دون استعمال مسطرة مدرجة، قسِّمْ القطعة المستقيمة $[AM]$ إلى خمس قطع متساوية.';

/* -------------------------------------------------------------------------- */
/*  Question 31                                                                  */
/* -------------------------------------------------------------------------- */

export const L12_Q31_STEM =
  'لقياس ارتفاع البرج الذي تشاهد تصويراً له، وقفت جوري، التي طولها $1.70\\ m$، على بعد $1\\ m$ من جدار ارتفاعه $2\\ m$ ويبعد عن البرج مسافة $57\\ m$، فرأت من البرج قمته.';
export const L12_Q31_ITEM_1 =
  'ارسم شكلاً معبراً وارمز إلى النقاط المميزة ووضِّعْ الأطوال على القطع المعلومة.';
export const L12_Q31_ITEM_2 = 'احسب ارتفاع البرج.';

/* -------------------------------------------------------------------------- */
/*  Question 32                                                                  */
/* -------------------------------------------------------------------------- */

export const L12_Q32_STEM =
  '$[MC]$ و $[BA]$ برجا مراقبة، ارتفاعاهما $MC = 30\\ m$ و $BA = 40\\ m$، $[MC]$ على شاطئ البحر و $[BA]$ على بعد $50\\ m$ عن الشاطئ. $K$ قارب في البحر على مسافة $x$ عن البرج $[MC]$، بحيث يشاهد من $A$ و $C$ كما في المخطط المرسوم أعلاه.';
export const L12_Q32_ITEM_1 = 'اشرح لماذا $\\frac{KB}{KM} = \\frac{AB}{CM}$.';
export const L12_Q32_ITEM_2 =
  'لاحظ أنَّ $KB = x + 50$. استفد من هذه الملاحظة لبيان أنَّ $x + 50 = \\frac{4}{3}x$.';
export const L12_Q32_ITEM_3 = 'احسب بعد القارب عن الشاطئ.';

/* -------------------------------------------------------------------------- */
/*  Question 33                                                                  */
/* -------------------------------------------------------------------------- */

export const L12_Q33_STEM =
  'في كلٍّ من الحالتين ① و ② اكتب كل تساوي ثلاث نسب، مع ذكر المثلثين المعنيين:';

export const L12_Q33_CASE_1 =
  '$S$ و $N$ و $I$ و $T$ على استقامة واحدة\n$S$ و $K$ و $J$ و $U$ على استقامة واحدة\n$(NK) \\parallel (IJ)$\nو $(IJ) \\parallel (TU)$';

export const L12_Q33_CASE_2 =
  '$A$ و $B$ و $C$ على استقامة واحدة\n$A$ و $H$ و $D$ و $I$ و $E$ على استقامة واحدة\n$C$ و $D$ و $G$ على استقامة واحدة\n$(BH) \\parallel (CG)$ و $(CG) \\parallel (IF)$\n$E$ و $M$ و $G$ على استقامة واحدة';

/* -------------------------------------------------------------------------- */
/*  Question 34                                                                  */
/* -------------------------------------------------------------------------- */

export const L12_Q34_STEM =
  'في كلٍّ من الحالات الآتية، ارسم شكلاً متفقاً مع النص، ثم دل على منتصف كل قطعة مستقيمة.';
export const L12_Q34_ITEM_1 = '$ABCD$ متوازي أضلاع مركزه $O$.';
export const L12_Q34_ITEM_2 = '$A$ هي صورة $B$ بالنسبة إلى التناظر الذي مركزه $M$.';
export const L12_Q34_ITEM_3 =
  '$AB = 8\\ cm$. $J$ نقطة من القطعة المستقيمة $[AB]$ تحقق $JB = 4\\ cm$.';
export const L12_Q34_ITEM_4 =
  '$A$ و $B$ و $C$ و $D$ أربع نقاط، بهذا الترتيب، على استقامة واحدة وتحقق:\n$AB = 5\\ cm$ و $BC = 2.5\\ cm$ و $CD = 2.5\\ cm$.';
export const L12_Q34_ITEM_5 = 'محور القطعة المستقيمة $[MN]$ يقطعها في $M$.';

/** The printed 💡 «تذكّر» box that closes Question 34, verbatim. */
export const L12_Q34_REMEMBER_LEAD = 'القول « $M$ منتصف $[AB]$ » يعني، بالتعريف:';
export const L12_Q34_REMEMBER_1 = '$A$ و $M$ و $B$ على استقامة واحدة.';
export const L12_Q34_REMEMBER_2 = '$MA = MB$.';

/* ========================================================================== */
/*  BATCH 2 — Questions 18–19 (`docs/source-scans/unit-02-exercises/batch2/`) */
/* ========================================================================== */

/* -------------------------------------------------------------------------- */
/*  Question 18 (`batch2/image-1.png`) — no printed green section title       */
/* -------------------------------------------------------------------------- */

export const L12_Q18_STEM =
  'في كلٍّ من الحالتين ① و ② احسب الطول $EJ$.';
export const L12_Q18_CASE_1 =
  '$F \\in [EH]$ و $J \\in [EK]$\nو $(FJ) \\parallel (HK)$';
export const L12_Q18_CASE_2 =
  '$E \\in [MB]$ و $J \\in [MA]$\nو $(EJ) \\parallel (BA)$';

/* -------------------------------------------------------------------------- */
/*  Question 19 (`batch2/image-2.png`) — «تعلُّم تحرير إثبات»                  */
/* -------------------------------------------------------------------------- */

export const L12_Q19_INTRO =
  'اقرأ النص والحل المنجز من قبل أحد الطلاب. ثم حرِّرْ الحل مع الأخذ بمجمل ملاحظات المصحح.';
export const L12_Q19_GIVEN =
  'خذْ بالاعتبار المعلومات المعبر عنها بالرموز على الشكل المرافق،';
export const L12_Q19_GOAL =
  'ثم أثبت أنَّ النقطة $D$ هي منتصف القطعة $[JK]$.';

/** Printed blue heading introducing the student draft + grader remarks. */
export const L12_Q19_DRAFT_HEAD = 'حل الطالب، مع ملاحظات المصحح';

/**
 * The two bullet lines of the fictional student's draft, verbatim.
 * In the first bullet, `(IJ) ∥ (BC)` carries a printed red underline; the
 * underline is preserved via `\underline{(IJ) \parallel (BC)}`.
 */
export const L12_Q19_STUDENT_1 =
  '$\\underline{(IJ) \\parallel (BC)}$، إذن $(IJ) \\parallel (BD)$';
export const L12_Q19_STUDENT_2 =
  '$B$ هي منتصف $[IK]$ و $(IJ) \\parallel (BD)$، إذن $D$ هي منتصف $[JK]$';

/**
 * The two RED grader remarks (`ملاحظات المصحح`) printed directly beneath the
 * two student bullets in Question 19. Unlike Question 20's red teacher-only
 * footer lines, Question 19 explicitly asks the student to read these grader
 * remarks and rewrite the proof («مع الأخذ بمجمل ملاحظات المصحح»), so they
 * are student-facing printed lines of the exercise itself (remark 1 prints no
 * trailing period; remark 2 ends with a period).
 */
export const L12_Q19_REMARK_1 = 'هذا ليس من معطيات النص';
export const L12_Q19_REMARK_2 =
  'جيد، ولكن عليك أن تذكر في أي مثلث تعمل.';

export const L12_Q19_GRADER_REMARKS: readonly string[] = [
  L12_Q19_REMARK_1,
  L12_Q19_REMARK_2,
];

/* ========================================================================== */
/*  Questions 20–27                                                           */
/* ========================================================================== */

/*
 * Questions 20–27 are transcribed verbatim from the verified scans of the set,
 * including the printed green section titles, the printed item numbers, the
 * printed «توجيه:» block of Question 22 and the three sub-items ①–③ printed
 * beneath the flowchart of Question 20.
 */

/* -------------------------------------------------------------------------- */
/*  Question 20                                                                  */
/* -------------------------------------------------------------------------- */

export const L12_TITLE_Q20 = 'تحليل مخطط الإثبات';

export const L12_Q20_STEM =
  "$ABC$ مثلث قائم في $A$. النقطة $A'$ هي منتصف $[BC]$ والنقطة $B'$ هي منتصف $[AC]$ و $C'$ هي منتصف $[AB]$. ما نوع الرباعي $AB'A'C'$؟ حقِّقْ إجابتك.";
export const L12_Q20_ITEM_1 = 'ما هي معطيات هذا النص؟';
export const L12_Q20_ITEM_2 =
  'ارسم شكلاً يتفق مع النص وثبت عليه رموزاً دالة على معطيات النص.';
export const L12_Q20_ITEM_3 =
  "إجابة من النمط « $AB'A'C'$ هو مستطيل » هل هي مرضية بالنسبة لما هو مطلوب؟";
export const L12_Q20_ITEM_4 = 'إليك طريقة للتحقق من إجابتك:';

/**
 * The three sub-items printed beneath the flowchart of Question 20 (with red
 * circled numerals ①, ②, ③ and black question text), completing item 4's
 * verification task for the student.
 */
export const L12_Q20_SUB_1 = 'أعد كتابة المخطط السابق وأكمله بملء الأطر المنقطة بما يناسب.';
export const L12_Q20_SUB_2 = 'أين تتوضع معطيات النص؟ وأين تتوضع النتيجة النهائية؟';
export const L12_Q20_SUB_3 = 'صِغْ إثباتاً بلغة سليمة.';

/* -------------------------------------------------------------------------- */
/*  Question 21                                                                  */
/* -------------------------------------------------------------------------- */

export const L12_TITLE_Q21 = 'في شكلٍ رباعي';

export const L12_Q21_STEM =
  '$E$ و $F$ و $G$ و $H$ هي منتصفات أضلاع $ABCD$. أثبت أنَّ $EFGH$ هو متوازي أضلاع.';

/* -------------------------------------------------------------------------- */
/*  Question 22                                                                  */
/* -------------------------------------------------------------------------- */

export const L12_TITLE_Q22 = 'استعمال للمنتصف';

export const L12_Q22_STEM =
  '$ABC$ مثلث. $M$ نقطة من الضلع $[AB]$، والمستقيم المرسوم من $M$ موازياً $(BC)$ يقطع الضلع $AC$ في $N$. النقطة $K$ هي صورة النقطة $M$ وفق التناظر الذي مركزه $B$. $L$ هي نقطة تقاطع القطعتين $[BC]$ و $[KN]$. أثبت أنَّ النقطة $L$ هي منتصف القطعة $[KN]$.';

/** The printed blue heading of the printed «توجيه:» block (with its bulb). */
export const L12_Q22_ADVICE_HEAD = 'توجيه:';
export const L12_Q22_ADVICE_1 = 'ارسم شكلاً يتفق ومعطيات النص.';
export const L12_Q22_ADVICE_2 = 'رمِّزْ القطع المستقيمة المتساوية، ولوِّنْ مستقيمين متوازيين.';
export const L12_Q22_ADVICE_3 = 'لماذا يمكن استعمال مبرهنة المنتصفات الثانية؟ وفي أي مثلث؟';
export const L12_Q22_ADVICE_4 = 'أنجز الحل بلغة سليمة.';

/* -------------------------------------------------------------------------- */
/*  Question 23                                                                  */
/* -------------------------------------------------------------------------- */

export const L12_TITLE_Q23 = 'محور قطعة مستقيمة';

export const L12_Q23_ITEM_1 =
  'ارسم قطعة مستقيمة $[AB]$ طولها $6\\ cm$، ثم ارسم محورها $(d)$.';
export const L12_Q23_ITEM_2 =
  "ارسم المستقيم $(d')$ ماراً بالنقطة $B$ وموازياً المستقيم $(d)$.";
export const L12_Q23_ITEM_3 =
  "وضِّعْ النقطة $E$ على المستقيم $(d')$ بحيث يكون $BE = 7\\ cm$.";
export const L12_Q23_ITEM_4 = 'ارمز إلى نقطة تقاطع المستقيمين $(d)$ و $(AE)$ بالرمز $M$.';
export const L12_Q23_ITEM_5 = 'أثبت أنَّ $M$ هي منتصف القطعة المستقيمة $[AE]$.';
export const L12_Q23_ITEM_6 =
  'لتكن $N$ منتصف القطعة المستقيمة $[AB]$. احسب مساحة المثلث $AMN$.';

/* -------------------------------------------------------------------------- */
/*  Question 24                                                                  */
/* -------------------------------------------------------------------------- */

export const L12_TITLE_Q24 = 'ارتفاع ومحور';

export const L12_Q24_STEM =
  'في الشكل المرافق: $[AH]$ ارتفاع للمثلث $ABC$، $I$ و $J$ هما على التوالي منتصفا $[AB]$ و $[AC]$، والمستقيم $(IJ)$ يقطع $[AH]$ في $K$.';
export const L12_Q24_ITEM_1 = 'أثبت أنَّ $K$ هي منتصف $[AH]$.';
export const L12_Q24_ITEM_2 =
  'أثبت أنَّ المستقيم $(IJ)$ هو محور القطعة المستقيمة $[AH]$.';

/* -------------------------------------------------------------------------- */
/*  Question 25                                                                  */
/* -------------------------------------------------------------------------- */

export const L12_TITLE_Q25 = 'انطلاقاً من معين';

export const L12_Q25_STEM =
  '$ABCD$ معين مركزه $O$، والنقطة $E$ هي نظيرة النقطة $A$ بالنسبة إلى $B$.';
export const L12_Q25_ITEM_1 = 'ارسم شكلاً يتفق ومعطيات النص.';
export const L12_Q25_ITEM_2 = 'أثبت أنَّ المستقيمين $(EC)$ و $(OB)$ متوازيان.';
export const L12_Q25_ITEM_3 = 'ما نوع المثلث $ACE$ ؟ علِّلْ إجابتك.';

/* -------------------------------------------------------------------------- */
/*  Question 26                                                                  */
/* -------------------------------------------------------------------------- */

export const L12_TITLE_Q26 = 'محيط ومساحة مثلث';

export const L12_Q26_STEM =
  'في الشكل المرافق: $(MN)$ و $(AC)$ متوازيان و $[AH] \\perp [BC]$. $BN = 3\\ cm$ و $BM = 2.4\\ cm$ و $AB = 5\\ cm$ و $MN = 1.8\\ cm$.';
export const L12_Q26_ITEM_1 = 'احسب محيط المثلث $ABC$.';
export const L12_Q26_ITEM_2 =
  '$AH = 3\\ cm$، احسب مساحة المثلث $ABC$، ثم مساحة المثلث $BMN$.';

/* -------------------------------------------------------------------------- */
/*  Question 27                                                                  */
/* -------------------------------------------------------------------------- */

export const L12_TITLE_Q27 = 'استعمال مجاهيل';

export const L12_Q27_ITEM_1 = 'احسب $FE$ بدلالة $x$ و $FG$ بدلالة $y$.';
export const L12_Q27_ITEM_2 =
  'طبق مبرهنة « النسب المتساوية الثلاث » على المثلثين $FTS$ و $FGE$.';
export const L12_Q27_ITEM_3 =
  'استنتج أنَّ $5(9 + x) = 72$، ثم احسب قيمة $x$.';
export const L12_Q27_ITEM_4 =
  'احسب قيمة $y$، ثم استنتج أنَّ المثلث $FGE$ هو متساوي الساقين.';

/* -------------------------------------------------------------------------- */
/*  Every printed prompt of the set, in printed order                           */
/* -------------------------------------------------------------------------- */

/**
 * The complete list of the printed prompts of Questions 18–34, in the order
 * the page prints them. The coverage test checks that every one of them
 * reaches the student view exactly once, and that nothing else does.
 */
export const L12_PRINTED_PROMPTS: readonly string[] = [
  L12_Q18_STEM,
  L12_Q18_CASE_1,
  L12_Q18_CASE_2,
  L12_Q19_INTRO,
  L12_Q19_GIVEN,
  L12_Q19_GOAL,
  L12_Q19_DRAFT_HEAD,
  L12_Q19_STUDENT_1,
  L12_Q19_REMARK_1,
  L12_Q19_STUDENT_2,
  L12_Q19_REMARK_2,
  L12_Q20_STEM,
  L12_Q20_ITEM_1,
  L12_Q20_ITEM_2,
  L12_Q20_ITEM_3,
  L12_Q20_ITEM_4,
  L12_Q20_SUB_1,
  L12_Q20_SUB_2,
  L12_Q20_SUB_3,
  L12_Q21_STEM,
  L12_Q22_STEM,
  L12_Q22_ADVICE_HEAD,
  L12_Q22_ADVICE_1,
  L12_Q22_ADVICE_2,
  L12_Q22_ADVICE_3,
  L12_Q22_ADVICE_4,
  L12_Q23_ITEM_1,
  L12_Q23_ITEM_2,
  L12_Q23_ITEM_3,
  L12_Q23_ITEM_4,
  L12_Q23_ITEM_5,
  L12_Q23_ITEM_6,
  L12_Q24_STEM,
  L12_Q24_ITEM_1,
  L12_Q24_ITEM_2,
  L12_Q25_STEM,
  L12_Q25_ITEM_1,
  L12_Q25_ITEM_2,
  L12_Q25_ITEM_3,
  L12_Q26_STEM,
  L12_Q26_ITEM_1,
  L12_Q26_ITEM_2,
  L12_Q27_ITEM_1,
  L12_Q27_ITEM_2,
  L12_Q27_ITEM_3,
  L12_Q27_ITEM_4,
  L12_Q28_STEM,
  L12_Q28_ITEM_1,
  L12_Q28_ITEM_2,
  L12_Q29_STEM,
  L12_Q29_ITEM_1,
  L12_Q30_ITEM_1,
  L12_Q30_ITEM_2,
  L12_Q31_STEM,
  L12_Q31_ITEM_1,
  L12_Q31_ITEM_2,
  L12_Q32_STEM,
  L12_Q32_ITEM_1,
  L12_Q32_ITEM_2,
  L12_Q32_ITEM_3,
  L12_Q33_STEM,
  L12_Q33_CASE_1,
  L12_Q33_CASE_2,
  L12_Q34_STEM,
  L12_Q34_ITEM_1,
  L12_Q34_ITEM_2,
  L12_Q34_ITEM_3,
  L12_Q34_ITEM_4,
  L12_Q34_ITEM_5,
  L12_Q34_REMEMBER_LEAD,
  L12_Q34_REMEMBER_1,
  L12_Q34_REMEMBER_2,
];

/** The printed section titles of Questions 18–34, in printed order (Questions 18 and 33 print none). */
export const L12_PRINTED_TITLES: readonly string[] = [
  L12_TITLE_Q19,
  L12_TITLE_Q20,
  L12_TITLE_Q21,
  L12_TITLE_Q22,
  L12_TITLE_Q23,
  L12_TITLE_Q24,
  L12_TITLE_Q25,
  L12_TITLE_Q26,
  L12_TITLE_Q27,
  L12_TITLE_Q28,
  L12_TITLE_Q29,
  L12_TITLE_Q30,
  L12_TITLE_Q31,
  L12_TITLE_Q32,
  L12_TITLE_Q34,
];

/** The three sub-items printed beneath the flowchart of Question 20. */
export const L12_Q20_FLOWCHART_SUBITEMS: readonly string[] = [
  L12_Q20_SUB_1,
  L12_Q20_SUB_2,
  L12_Q20_SUB_3,
];
