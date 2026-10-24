/**
 * ============================================================================
 *  الدرس الثامن — النصوص المطبوعة (المصدر الوحيد)
 * ============================================================================
 *
 *  The printed prompts of pages 31–33 live HERE, once. Both the student steps
 *  and the Teacher Area read them from this file, so a solution can never drift
 *  away from the question it answers: if a prompt is edited, the coverage test
 *  fails until the teacher record is edited with it.
 *
 *  Wording policy (recorded, not implied):
 *    • the mathematical CONTENT of every prompt below — the given points, the
 *      asked relation, the printed instruction — is transcribed from the
 *      supplied scans of pages 31, 32 and 33;
 *    • punctuation and connective words were restored where the scan is merely
 *      cut at the page edge; nothing mathematical was added;
 *    • the two prompts whose printed sentence could not be read continuously
 *      (the example and «اكتساب معارف») carry a reviewer note on their
 *      `source.note`, so no reader has to guess which parts are reconstructed.
 *
 *  The record of what was read, and of the one derived value of «تدرّب ③», is
 *  `docs/UNIT-02-LESSON-01-SOURCE.md`.
 * ============================================================================
 */

export interface PrintedQuestion {
  /** The numbering printed in the source, kept as-is (`1.`, `①`, …). */
  label: string;
  /** The prompt, exactly as it is shown to the student. */
  text: string;
}

/* -------------------------------------------------------------------------- */
/*  صفحة ٣١ — النشاط                                                            */
/* -------------------------------------------------------------------------- */

export const L8_ACTIVITY_QUESTIONS: PrintedQuestion[] = [
  {
    label: '1.',
    text: 'ارسم ثلاثة مثلثات $ABC$، بحيث تكون الزاوية عند $A$: حادة في الأول، ومنفرجة في الثاني، وقائمة في الثالث.',
  },
  {
    label: '2.',
    text: 'عيّن في كل مثلث النقطة $M$ منتصف الضلع $[AB]$ والنقطة $N$ منتصف الضلع $[AC]$، ثم ارسم المستقيم $(MN)$.',
  },
];

/** The construction that opens the printed proof («دليل للإثبات»). */
export const L8_PROOF_START: PrintedQuestion = {
  label: '1.',
  text: 'عيّن النقطة $K$ نظيرة النقطة $M$ بالنسبة إلى النقطة $N$.',
};

/** The printed proof scaffold: three statements, each with one blank. */
export const L8_PROOF_STEPS: PrintedQuestion[] = [
  {
    label: '1.',
    text: 'القطعتان $[AC]$ و$[MK]$ هما قطرا الرباعي $AMCK$، والنقطة $N$ منتصف كلٍّ منهما؛ فالرباعي $AMCK$ ............... .',
  },
  {
    label: '2.',
    text: 'إذن $(CK) \\parallel (AM)$ و$CK = AM$؛ ولأنَّ $M$ منتصف $[AB]$ فإنَّ $AM = MB$، ومنه $(CK) \\parallel (MB)$ و$CK = MB$؛ فالرباعي $MBCK$ ............... .',
  },
  {
    label: '3.',
    text: 'إذن $(MN) \\parallel (BC)$ و$MN = \\frac{1}{2}\\,BC$.',
  },
];

/** The printed ask that closes the activity. */
export const L8_PROOF_PROMPT: PrintedQuestion = {
  label: '—',
  text: 'هل يكفي ذلك؟ صغ إثباتاً للمبرهنة الآتية: القطعة الواصلة بين منتصفي ضلعين في مثلث توازي الضلع الثالث، وتساوي نصف طوله.',
};

/* -------------------------------------------------------------------------- */
/*  صفحة ٣٢ — المثال و«اكتساب معارف»                                             */
/* -------------------------------------------------------------------------- */

export const L8_EXAMPLE_PROMPT: PrintedQuestion = {
  label: 'مثال',
  text: 'المعطيات: $I$ منتصف الضلع $[AB]$، و$J$ منتصف الضلع $[AC]$. أثبت أنَّ $(IJ) \\parallel (BC)$، واستنتج أنَّ $IJ = \\frac{1}{2}\\,BC$.',
};

export const L8_KNOWLEDGE_PROMPT: PrintedQuestion = {
  label: 'اكتساب معارف',
  text: 'كيف نثبت توازي مستقيمين؟ $ABC$ مثلث، والنقطة $O$ منتصف الضلع $[AC]$، والنقطة $I$ نظيرة النقطة $C$ بالنسبة إلى النقطة $B$. أثبت أنَّ $(OB) \\parallel (AI)$.',
};

/** The printed solution of «اكتساب معارف» (page 33). */
export const L8_KNOWLEDGE_SOLUTION: PrintedQuestion = {
  label: 'الحل',
  text: 'بما أنَّ $I$ نظيرة $C$ بالنسبة إلى $B$، فإنَّ $B$ منتصف $[CI]$؛ وبما أنَّ $O$ منتصف $[AC]$، فبتطبيق مبرهنة منتصفَي ضلعين على المثلث $ACI$ نحصل على $(OB) \\parallel (AI)$.',
};

/* -------------------------------------------------------------------------- */
/*  صفحة ٣٣ — «تحقّق من فهمك»                                                    */
/* -------------------------------------------------------------------------- */

export const L8_CHECK_INTRO =
  '$ABC$ و$ADC$ مثلثان، والنقاط $J$ و$K$ و$L$ و$M$ و$N$ منتصفات أضلاعهما كما في الشكل.';

export const L8_CHECK_QUESTIONS: PrintedQuestion[] = [
  { label: '①', text: 'ما وضع المستقيمين $(JK)$ و$(BC)$؟' },
  { label: '②', text: 'ما وضع المستقيمين $(KN)$ و$(AD)$؟' },
  { label: '③', text: 'ما وضع المستقيمين $(LN)$ و$(BD)$؟' },
  { label: '④', text: 'ما وضع المستقيمين $(JM)$ و$(BD)$؟' },
  { label: '—', text: 'ما الوضع النسبي للمستقيمين $(LN)$ و$(JM)$؟' },
];

/* -------------------------------------------------------------------------- */
/*  صفحة ٣٣ — «تدرّب»                                                            */
/* -------------------------------------------------------------------------- */

export const L8_PRACTICE_ONE: PrintedQuestion = {
  label: '①',
  text: 'نصف دائرة مركزها $O$ وقطرها $[AB]$، والنقطة $E$ تنتمي إلى نصف الدائرة، والنقطة $M$ منتصف $[AE]$. أثبت أنَّ $(OM) \\parallel (BE)$.',
};

export const L8_PRACTICE_TWO: PrintedQuestion = {
  label: '②',
  text: 'النقطة $B\'$ نظيرة $A$ بالنسبة إلى $B$، والنقطة $C\'$ نظيرة $A$ بالنسبة إلى $C$. أثبت أنَّ $(CB) \\parallel (C\'B\')$.',
};

export const L8_PRACTICE_THREE: PrintedQuestion = {
  label: '③',
  text: 'مستطيل $ABCD$ مرسوم داخل دائرة نصف قطرها $3\\,\\mathrm{cm}$، والنقاط $E$ و$F$ و$G$ و$H$ منتصفات أضلاعه. ما نوع الرباعي $EFGH$؟ احسب محيطه.',
};

/* -------------------------------------------------------------------------- */
/*  The single list the Teacher Area is checked against                       */
/* -------------------------------------------------------------------------- */

/**
 * Every printed prompt of pages 31–33, in printed order. The coverage test
 * requires exactly one teacher solution with a matching `question` for each.
 */
export const L8_PRINTED_PROMPTS: PrintedQuestion[] = [
  ...L8_ACTIVITY_QUESTIONS,
  L8_PROOF_START,
  ...L8_PROOF_STEPS,
  L8_PROOF_PROMPT,
  L8_EXAMPLE_PROMPT,
  L8_KNOWLEDGE_PROMPT,
  ...L8_CHECK_QUESTIONS,
  L8_PRACTICE_ONE,
  L8_PRACTICE_TWO,
  L8_PRACTICE_THREE,
];

/** Reviewer-facing sizes, pinned by the coverage test. */
export const L8_PRINTED_COUNTS = {
  activity: L8_ACTIVITY_QUESTIONS.length,
  proof: 1 + L8_PROOF_STEPS.length + 1,
  example: 1,
  knowledge: 1,
  check: L8_CHECK_QUESTIONS.length,
  practice: 3,
  total: L8_PRINTED_PROMPTS.length,
} as const;
