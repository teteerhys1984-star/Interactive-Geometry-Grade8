import type { SourceRef } from '../schema';

/**
 * ============================================================================
 *  UNIT 2 — «تمارين الوحدة الثانية» · THE PRINTED TEXT OF Q1–Q17 (BATCH 1)
 * ============================================================================
 *
 *  Every string below is transcribed directly from the twenty source scans of
 *  Batch 1 (`image-1.png` … `image-20.png` in
 *  `docs/source-scans/unit-02-exercises/batch1/`):
 *
 *    • images 1–3  → Question 1 (green stem + blue sub-items ①–⑤)
 *    • images 4–5  → Question 2 (green stem + blue sub-items ①–④ + 4 blue lines)
 *    • images 6–20 → Questions 3–17
 *
 *  The printed wording, spelling, punctuation, numbering and maths notation
 *  are kept exactly as the page prints them — including the defects the page
 *  itself carries:
 *
 *    • Q5 item 1 prints «في في» (the preposition repeated);
 *    • Q7 prints «المستقيمتان $(OA)$ و $(OB)$ تقطعان» (feminine dual for
 *      `مستقيم`);
 *    • Q11 prints «$C$ و $C'$» (italic $C$ beside roman $C'$) and
 *      «القطعة $[OI]$ تقطع $C$ في $S$» beside «القطعة المستقيمة $[OJ]$».
 *
 *  Nothing is corrected silently: every discrepancy is recorded in
 *  `lesson-12-batch1-teacher.ts` for the Teacher Area.
 *
 *  THE FOUR BLUE PRINTED ANSWER LINES
 *  ----------------------------------------------------------------------------
 *  Question 2 prints four claim/answer lines in blue ink — one closing each of
 *  its four blue sub-items ①–④ — which the student is asked to evaluate
 *  («أيها صحيحة وأيها خطأ ؟ علِّلْ إجابتك.»):
 *
 *    1. «فالمستقيمان $(OO')$ و $(BB')$ متقاطعان.»               (closes ①)
 *    2. «إذن $JK = 4\ cm$»                                       (closes ②)
 *    3. «محيط المثلث $AEF$ يساوي ثلاثة أمثال محيط المثلث $AIJ$.» (closes ③)
 *    4. «يمكن حساب $x = 3.2$ ولا يمكن حساب قيمة $y$.»             (closes ④)
 *
 *  They are exported as `L12B_BLUE_ANSWER_LINES` so the test-suite pins that
 *  all four reach the student verbatim and that no solution is authored.
 * ============================================================================
 */

/* -------------------------------------------------------------------------- */
/*  Question 1 (images 1–3)                                                     */
/* -------------------------------------------------------------------------- */

export const L12B_Q1_STEM =
  'في كلّ حالة من الحالات الآتية، إجابة صحيحة واحدة من بين ثلاث إجابات. أشر إليها.';

export const L12B_Q1_ITEM_1 = '$ABC$ مثلث. $M$ منتصف $[AB]$ و $N$ منتصف $[BC]$، إذن';
export const L12B_Q1_ITEM_1_OPTION_1 = '$(MN) \\parallel (BC)$ و $BC = 2MN$.';
export const L12B_Q1_ITEM_1_OPTION_2 = '$(MN) \\parallel (AC)$ و $AC = 2MN$.';
export const L12B_Q1_ITEM_1_OPTION_3 = '$(MN) \\parallel (AC)$ و $MN = 2AC$.';

export const L12B_Q1_ITEM_2 = '$I \\in [AC]$ و $J \\in [AD]$ و $K \\in [CD]$.';
export const L12B_Q1_ITEM_2_LEAD = 'مع المعطيات المتوفرة على الشكل، يمكن تأكيد أنَّ:';
export const L12B_Q1_ITEM_2_OPTION_1 = '$K$ هي منتصف $[CD]$.';
export const L12B_Q1_ITEM_2_OPTION_2 = '$(CD) \\parallel (AB)$.';
export const L12B_Q1_ITEM_2_OPTION_3 = '$(IJ) \\parallel (CD)$.';

export const L12B_Q1_ITEM_3 =
  '$B$ و $I$ و $C$ ثلاث نقاط على استقامة واحدة، كذلك النقاط $A$ و $J$ و $C$. يمكن تأكيد أنَّ $J$ هي منتصف $[AC]$، فالشكل المعبر عن هذه المعطيات هو:';

export const L12B_Q1_ITEM_4_LEAD = 'في الشكل المرافق:';
export const L12B_Q1_ITEM_4 = '$M \\in [AN]$ و $P \\in [BN]$ و $(MP) \\parallel (AB)$، إذن:';
export const L12B_Q1_ITEM_4_OPTION_1 = '$NB = 5.8$';
export const L12B_Q1_ITEM_4_OPTION_2 = '$NB = 5.4$';
export const L12B_Q1_ITEM_4_OPTION_3 = '$NB = 3.6$';

export const L12B_Q1_ITEM_5_LEAD = 'في الشكل السابق:';
export const L12B_Q1_ITEM_5 = '$M \\in [AN]$ و $P \\in [BN]$ و $(MP) \\parallel (AB)$، إذن:';
export const L12B_Q1_ITEM_5_OPTION_1 = '$AB = 2.4$';
export const L12B_Q1_ITEM_5_OPTION_2 = '$AB = 3.6$';
export const L12B_Q1_ITEM_5_OPTION_3 = '$AB = 5.2$';

/* -------------------------------------------------------------------------- */
/*  Question 2 (images 4–5)                                                     */
/* -------------------------------------------------------------------------- */

export const L12B_Q2_STEM =
  'تمعَّنْ العبارات الآتية. أيها صحيحة وأيها خطأ ؟ علِّلْ إجابتك.';

export const L12B_Q2_ITEM_1 =
  "$\\mathcal{C}$ و $\\mathcal{C}'$ دائرتان مركزاهما على التوالي $O$ و $O'$. $A$ هي إحدى نقطتي تقاطعهما. $(AO)$ يقطع $\\mathcal{C}$ في $B$ و $(AO')$ يقطع $\\mathcal{C}'$ في $B'$.";
export const L12B_Q2_ITEM_2 =
  'في المثلث $ABC$ : $J$ منتصف $[AB]$ و $K$ منتصف $[AC]$. و $BC = 8\\ cm$.';
export const L12B_Q2_ITEM_3 =
  '$AEF$ مثلث. $I$ نقطة من $[AE]$ تحقق $AI = \\frac{1}{3} AE$. المستقيم المرسوم من $I$ موازياً $(EF)$ يقطع $[AF]$ في $J$، كما إنَّ $JI = 4\\ cm$ و $EF = 8\\ cm$.';
export const L12B_Q2_ITEM_4 =
  'في الشكل المرافق: $A \\in [MD]$ و $B \\in [ME]$ و $C \\in [MF]$. أطوال بعض القطع في الشكل مشار إليها عددياً أو بالرموز $x$ و $y$.';

/** The four lines the page prints in BLUE — printed lines of the book. */
export const L12B_Q2_ANSWER_1 = "فالمستقيمان $(OO')$ و $(BB')$ متقاطعان.";
export const L12B_Q2_ANSWER_2 = 'إذن $JK = 4\\ cm$';
export const L12B_Q2_ANSWER_3 =
  'محيط المثلث $AEF$ يساوي ثلاثة أمثال محيط المثلث $AIJ$.';
export const L12B_Q2_ANSWER_4 =
  'يمكن حساب $x = 3.2$ ولا يمكن حساب قيمة $y$.';

export const L12B_BLUE_ANSWER_LINES: readonly string[] = [
  L12B_Q2_ANSWER_1,
  L12B_Q2_ANSWER_2,
  L12B_Q2_ANSWER_3,
  L12B_Q2_ANSWER_4,
];

/* -------------------------------------------------------------------------- */
/*  Question 3 (image 6)                                                        */
/* -------------------------------------------------------------------------- */

export const L12B_Q3_STEM =
  '$ABCD$ مستطيل. $CD = 8$، والنقطة $I$ هي منتصف $[AD]$. $K$ و $J$ نقطتان من $[AB]$ تحققان $AK = 2$ و $BJ = 4$';
export const L12B_Q3_ITEM_1 = 'أثبت أنَّ النقطة $K$ هي منتصف $[AJ]$.';
export const L12B_Q3_ITEM_2 = 'استنتج أنَّ المستقيم $(IK)$ يوازي المستقيم $(DJ)$.';

/* -------------------------------------------------------------------------- */
/*  Question 4 (image 7)                                                        */
/* -------------------------------------------------------------------------- */

export const L12B_Q4_STEM =
  '$ABC$ مثلث. $I$ و $J$ نقطتان من ضلعيه $[AB]$ و $[AC]$ على التوالي، وتحققان الأطوال المشار إليها على الشكل.';
export const L12B_Q4_ITEM_1 = 'أثبت أنَّ المستقيمين $(IJ)$ و $(BC)$ متوازيان.';
export const L12B_Q4_ITEM_2 = 'احسب طول القطعة $[IJ]$.';

/* -------------------------------------------------------------------------- */
/*  Question 5 (image 8)                                                        */
/* -------------------------------------------------------------------------- */

export const L12B_Q5_STEM =
  '$ABC$ مثلث. $BC = 12\\ cm$ و $AB = 8\\ cm$ و $AC = 10\\ cm$. $I$ و $J$ و $K$ هي منتصفات أضلاعه حسب توضعها على الشكل المرافق.';
/** The page prints «في في» — the duplicated word is kept, not repaired. */
export const L12B_Q5_ITEM_1 = 'حدد معللاً كل مستقيمين متوازيين في في الشكل.';
export const L12B_Q5_ITEM_2 = 'ما عدد متوازيات الأضلاع في الشكل؟';
export const L12B_Q5_ITEM_3 =
  'احسب محيط المثلث $IJK$، ووازنه بمحيط المثلث $ABC$.';

/* -------------------------------------------------------------------------- */
/*  Question 6 (image 9)                                                        */
/* -------------------------------------------------------------------------- */

export const L12B_Q6_STEM =
  '$ABCD$ متوازي أضلاع مركزه $O$. $OB = 3\\ cm$ و $OC = 2\\ cm$. $E$ هي نظيرة النقطة $D$ بالنسبة إلى $C$.';
export const L12B_Q6_ITEM_1 = 'أثبت أنَّ المستقيمين $(OC)$ و $(BE)$ متوازيان.';
export const L12B_Q6_ITEM_2 = 'احسب الطول $BE$.';
export const L12B_Q6_ITEM_3 = 'ارسم شكلاً في حالة $\\widehat{COB} = 60^\\circ$.';

/* -------------------------------------------------------------------------- */
/*  Question 7 (image 10)                                                       */
/* -------------------------------------------------------------------------- */

/** The page prints «المستقيمتان $(OA)$ و $(OB)$ تقطعان» — kept as printed. */
export const L12B_Q7_STEM =
  "$C$ و $C'$ دائرتان متمركزتان في $O$، ونصفا قطريهما على التوالي $2.5\\ cm$ و $5\\ cm$. $A$ و $B$ نقطتان من الدائرة $C$ تحققان $AB = 4\\ cm$. المستقيمتان $(OA)$ و $(OB)$ تقطعان الدائرة $C'$ على التوالي في $A'$ و $B'$.";
export const L12B_Q7_ITEM_1 = 'ارسم شكلاً يحقق معطيات النص.';
export const L12B_Q7_ITEM_2 = "ما الوضع النسبي للمستقيمين $(AB)$ و $(A'B')$؟";
export const L12B_Q7_ITEM_3 = "احسب طول القطعة $[A'B']$.";

/* -------------------------------------------------------------------------- */
/*  Question 8 (image 11)                                                       */
/* -------------------------------------------------------------------------- */

export const L12B_Q8_STEM =
  '$ABCD$ مربع طول ضلعه $3\\ cm$. $E$ هي صورة النقطة $B$ وفق الانسحاب الذي ينقل $A$ إلى $B$. $F$ هي صورة النقطة $A$ وفق التناظر الذي مركزه $C$.';
export const L12B_Q8_ITEM_1 = 'ارسم شكلاً يتفق مع معطيات النص.';
export const L12B_Q8_ITEM_2 = 'أثبت أنَّ $(BC)$ و $(EF)$ متوازيان.';
export const L12B_Q8_ITEM_3 = 'ما نوع المثلث $AEF$ ؟ اشرح إجابتك.';

/* -------------------------------------------------------------------------- */
/*  Question 9 (image 12)                                                       */
/* -------------------------------------------------------------------------- */

export const L12B_Q9_STEM =
  '$B$ و $C$ و $D$ ثلاث نقاط على استقامة واحدة، $A$ نقطة خارج المستقيم المار بها. $E$ و $F$ و $J$ هي على التوالي منتصفات القطع المستقيمة $[AB]$ و $[AC]$ و $[AD]$. أثبت أنَّ النقاط $E$ و $F$ و $J$ هي على استقامة واحدة.';

/** The «تذكَّر:» box the page prints under Question 9, with its light bulb. */
export const L12B_Q9_REMEMBER_TITLE = 'تذكَّر:';
export const L12B_Q9_REMEMBER_1 = 'المستقيمان الموازيان لثالث متوازيان.';
export const L12B_Q9_REMEMBER_2 =
  'المستقيمان المتوازيان ينطبقان إذا اشتركا بنقطة.';

/* -------------------------------------------------------------------------- */
/*  Question 10 (image 13)                                                      */
/* -------------------------------------------------------------------------- */

export const L12B_Q10_STEM =
  '$ABC$ مثلث. تنتمي $I$ إلى $[AC]$ وتنتمي $J$ إلى $[BC]$. في كلٍّ من الشكلين ① و ② الآتيين، تقرأ معطيات عبر إشارات ملونة بالأحمر. استعمل هذه المعطيات في إثبات أنَّ $I$ هي منتصف $[AC]$.';

/* -------------------------------------------------------------------------- */
/*  Question 11 (image 14)                                                      */
/* -------------------------------------------------------------------------- */

/** The page prints «القطعة $[OI]$ تقطع $C$ في $S$» — kept as printed. */
export const L12B_Q11_STEM =
  "$C$ و $C'$ دائرتان متمركزتان في $O$، نصفا قطريهما على التوالي $2\\ cm$ و $4\\ cm$. $I$ و $J$ نقطتان من $C'$ تحققان $IJ = 5\\ cm$. القطعة $[OI]$ تقطع $C$ في $S$، والمستقيم المار بالنقطة $S$ موازياً $(IJ)$ يقطع القطعة المستقيمة $[OJ]$ في $T$.";
export const L12B_Q11_ITEM_1 = 'ارسم شكلاً حسب معطيات النص.';
export const L12B_Q11_ITEM_2 = 'أثبت أنَّ $T$ هي منتصف $[OJ]$.';
export const L12B_Q11_ITEM_3 = 'استنتج أنَّ $T$ تنتمي إلى الدائرة $C$.';

/* -------------------------------------------------------------------------- */
/*  Question 12 (image 15)                                                      */
/* -------------------------------------------------------------------------- */

export const L12B_Q12_STEM =
  '$MNP$ مثلث. $B$ و $C$ نقطتان من نصف المستقيم $[MN)$ تحققان $MB = \\frac{3}{2} MN$ و $MC = \\frac{1}{2} MB$. النقطة $A$ هي منتصف $[MP]$.';
export const L12B_Q12_ITEM_1 = 'ارسم شكلاً متفقاً ومعطيات النص.';
export const L12B_Q12_ITEM_2 = 'أثبت أنَّ المستقيمين $(AC)$ و $(BP)$ متوازيان.';

/* -------------------------------------------------------------------------- */
/*  Question 13 (image 16)                                                      */
/* -------------------------------------------------------------------------- */

export const L12B_Q13_STEM =
  'في الشكل المرافق، $ABC$ مثلث، والنقطة $C$ مخفية! دون أن ترسم خارج الإطار، استخدم المسطرة والفرجار لرسم النقطة $M$ منتصف $[AC]$ والنقطة $N$ منتصف $[BC]$.';

/* -------------------------------------------------------------------------- */
/*  Question 14 (image 17)                                                      */
/* -------------------------------------------------------------------------- */

export const L12B_Q14_STEM =
  '$ABC$ مثلث. $D$ منتصف $[BC]$ و $M$ منتصف $[AD]$. المستقيم $(CM)$ يقطع $[AB]$ في $F$. نرسم من $D$ المستقيم الموازي للمستقيم $(CF)$، فيقطع $(AB)$ في $E$.';
export const L12B_Q14_ITEM_1 = 'أثبت أنَّ $F$ هي منتصف $[AE]$.';
export const L12B_Q14_ITEM_2 = 'أثبت أنَّ $E$ هي منتصف $[BF]$.';

/* -------------------------------------------------------------------------- */
/*  Question 15 (image 18)                                                      */
/* -------------------------------------------------------------------------- */

export const L12B_Q15_STEM =
  'في الشكل المرافق، $ABC$ و $ATV$ مثلثان. $(TV)$ و $(BC)$ متوازيان. انسخ الجدول الآتي وأكمله.';

/**
 * The printed table, in RTL column order (`<table dir="rtl">` puts index 0 on
 * the right, matching the shaded right-hand header cell of `image-18.png`).
 */
export const L12B_Q15_TABLE_COLUMNS: readonly string[] = [
  'أطوال أضلاع المثلث $ATV$',
  '$AV = 3.5$',
  '$AT = ......$',
  '$TV = 3$',
];
export const L12B_Q15_TABLE_ROW: readonly string[] = [
  'أطوال أضلاع المثلث $ABC$',
  '$AC = ......$',
  '$AB = 9.9$',
  '$BC = 6.6$',
];
export const L12B_Q15_TABLE_ROWS: readonly (readonly string[])[] = [L12B_Q15_TABLE_ROW];

/* -------------------------------------------------------------------------- */
/*  Question 16 (image 19)                                                      */
/* -------------------------------------------------------------------------- */

export const L12B_Q16_STEM =
  'في الشكل المرافق: $D \\in [AB]$ و $E \\in [AC]$ و $(DE) \\parallel (BC)$.';
export const L12B_Q16_ITEM_1 = 'احسب طول القطعة $[AE]$.';
export const L12B_Q16_ITEM_2 = 'احسب $BC$ مقرباً الجواب لرقم عشري واحد.';

/* -------------------------------------------------------------------------- */
/*  Question 17 (image 20)                                                      */
/* -------------------------------------------------------------------------- */

export const L12B_Q17_STEM =
  'في الشكل المرافق: $P \\in [LM]$ و $Q \\in [LN]$ و $(PQ) \\parallel (MN)$. احسب كلاً من الطولين $LP$ و $MN$.';

/* -------------------------------------------------------------------------- */
/*  The inventory the test-suite pins                                            */
/* -------------------------------------------------------------------------- */

/** The printed questions of Batch 1, in printed order. */
export const L12B_QUESTION_NUMBERS: readonly number[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
];

/** Every printed prompt of Batch 1, in printed order. */
export const L12B_PRINTED_PROMPTS: readonly string[] = [
  L12B_Q1_STEM,
  L12B_Q1_ITEM_1,
  L12B_Q1_ITEM_1_OPTION_1,
  L12B_Q1_ITEM_1_OPTION_2,
  L12B_Q1_ITEM_1_OPTION_3,
  L12B_Q1_ITEM_2,
  L12B_Q1_ITEM_2_LEAD,
  L12B_Q1_ITEM_2_OPTION_1,
  L12B_Q1_ITEM_2_OPTION_2,
  L12B_Q1_ITEM_2_OPTION_3,
  L12B_Q1_ITEM_3,
  L12B_Q1_ITEM_4_LEAD,
  L12B_Q1_ITEM_4,
  L12B_Q1_ITEM_4_OPTION_1,
  L12B_Q1_ITEM_4_OPTION_2,
  L12B_Q1_ITEM_4_OPTION_3,
  L12B_Q1_ITEM_5_LEAD,
  L12B_Q1_ITEM_5,
  L12B_Q1_ITEM_5_OPTION_1,
  L12B_Q1_ITEM_5_OPTION_2,
  L12B_Q1_ITEM_5_OPTION_3,
  L12B_Q2_STEM,
  L12B_Q2_ITEM_1,
  L12B_Q2_ANSWER_1,
  L12B_Q2_ITEM_2,
  L12B_Q2_ANSWER_2,
  L12B_Q2_ITEM_3,
  L12B_Q2_ANSWER_3,
  L12B_Q2_ITEM_4,
  L12B_Q2_ANSWER_4,
  L12B_Q3_STEM,
  L12B_Q3_ITEM_1,
  L12B_Q3_ITEM_2,
  L12B_Q4_STEM,
  L12B_Q4_ITEM_1,
  L12B_Q4_ITEM_2,
  L12B_Q5_STEM,
  L12B_Q5_ITEM_1,
  L12B_Q5_ITEM_2,
  L12B_Q5_ITEM_3,
  L12B_Q6_STEM,
  L12B_Q6_ITEM_1,
  L12B_Q6_ITEM_2,
  L12B_Q6_ITEM_3,
  L12B_Q7_STEM,
  L12B_Q7_ITEM_1,
  L12B_Q7_ITEM_2,
  L12B_Q7_ITEM_3,
  L12B_Q8_STEM,
  L12B_Q8_ITEM_1,
  L12B_Q8_ITEM_2,
  L12B_Q8_ITEM_3,
  L12B_Q9_STEM,
  L12B_Q9_REMEMBER_TITLE,
  L12B_Q9_REMEMBER_1,
  L12B_Q9_REMEMBER_2,
  L12B_Q10_STEM,
  L12B_Q11_STEM,
  L12B_Q11_ITEM_1,
  L12B_Q11_ITEM_2,
  L12B_Q11_ITEM_3,
  L12B_Q12_STEM,
  L12B_Q12_ITEM_1,
  L12B_Q12_ITEM_2,
  L12B_Q13_STEM,
  L12B_Q14_STEM,
  L12B_Q14_ITEM_1,
  L12B_Q14_ITEM_2,
  L12B_Q15_STEM,
  ...L12B_Q15_TABLE_COLUMNS,
  ...L12B_Q15_TABLE_ROW,
  L12B_Q16_STEM,
  L12B_Q16_ITEM_1,
  L12B_Q16_ITEM_2,
  L12B_Q17_STEM,
];

/**
 * The source reference of one printed exercise of Batch 1.
 *
 * The page itself prints no page number for this set, so the reference names
 * the SCAN and the question instead of inventing a printed page number.
 */
export function batch1Source(number: number, note?: string): SourceRef {
  return {
    page: `صورة المصدر (الوحدة الثانية) — السؤال ${number}`,
    locator: `تمارين الوحدة الثانية — السؤال ${number}`,
    ...(note ? { note } : {}),
  };
}
