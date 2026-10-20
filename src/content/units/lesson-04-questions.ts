/**
 * ============================================================================
 *  الدرس الرابع — النصوص المطبوعة حرفياً (صفحات 17–19)
 * ============================================================================
 *
 *  Every string below is transcribed from the supplied scans, character for
 *  character, with the book's own notation wrapped in `$…$` so the renderer
 *  isolates it LTR. Both the student steps and the Teacher Area read from this
 *  one file, which is what lets a test prove that each printed question has a
 *  matching solution: the two cannot drift apart.
 *
 *  Nothing here is paraphrased, shortened or invented.
 * ============================================================================
 */

export const L4_ACTIVITY_HINT =
  'وفق الانسحاب، أي شكل وصورته قابلان للانطباق، فصورة مثلث هي مثلث يطابقه.';

export const L4_HEADING = 'حالات تطابق مثلثين.';

export interface PrintedQuestion {
  label: string;
  text: string;
}

export const L4_ACTIVITY_QUESTIONS: PrintedQuestion[] = [
  {
    label: '1.',
    text: 'انقل الأشكال ① و ② و ③ إلى صفحة بيضاء. وفي كل حالة، ارسم صورة الشكل وفق الانسحاب الذي ينقل النقطة $N$ إلى النقطة $M$.',
  },
  {
    label: '2.',
    text: 'في كل من الحالتين ① و ② أكمل الشكل لتحصل على المثلث $ABC$ ثم أكمل صورة هذا المثلث.',
  },
  { label: '3.', text: 'ما صورة المثلث $ABC$ في كل من الحالات ① و ② و ③؟ ولماذا؟' },
  {
    label: '4.',
    text: 'إذن هل يمكنك ذكر الحالات التي يمكن من خلالها أن نحصل على مثلث يطابق مثلثاً معلوماً؟',
  },
];

export const L4_DEFINITION =
  'يتطابق مثلثان إذا تساوت عناصر أحدهما مع العناصر المقابلة لها في المثلث الآخر.';

export const L4_DEFINITION_HINT = 'عناصر المثلث هي أضلاعه وزواياه.';

export const L4_CASE_ONE =
  'يتطابق مثلثان في حال تساوي طولي ضلعين وقياس الزاوية المحصورة بينهما من المثلث الأول مع مقابلاتها في المثلث الآخر.';

export const L4_CASE_TWO =
  'يتطابق مثلثان في حال تساوي طول ضلع وقياسي الزاويتين المجاورتين لها من المثلث الأول مع مقابلاتها في المثلث الآخر.';

export const L4_CASE_THREE =
  'يتطابق مثلثان في حال تساوي أطوال أضلاع أحدهما مع مقابلاتها في المثلث الآخر.';

export const L4_EXAMPLE_ONE = {
  lead: 'في الشكل المجاور:',
  verticalAngles: 'نلاحظ أن: $\\widehat{EMF} = \\widehat{AMB}$ للتقابل بالرأس.',
  lengths: 'وكذلك $AM = ME = 5$ و $BM = MF = 7$.',
  conclusion:
    'فالمثلثان $AMB$، $EMF$ طبوقان لتساوي طولي ضلعين وقياس الزاوية المحصورة بينهما من المثلث الأول مع مقابلاتها في المثلث الآخر.',
};

export const L4_EXAMPLE_TWO = {
  givens: '$AECF$ متوازي أضلاع و $ABCD$ مستطيل.',
  sides: '$AB = DC$ لتساوي كل ضلعين متقابلين في المستطيل.',
  difference:
    '$FD = BE$ لأن كلاً منهما هو طول ضلع متوازي أضلاع مطروحاً منه طول ضلع مستطيل وهاتان الضلعان متقابلان.',
  oppositeAngles: '$\\widehat{F} = \\widehat{E}$ لتساوي كل زاويتين متقابلتين في متوازي أضلاع.',
  rightAngles: 'وكذلك $\\widehat{CBE} = \\widehat{FDA} = 90^\\circ$.',
  conclusion:
    'فالمثلثان $BEC$، $FDA$ طبوقان لتساوي طول ضلع وقياسي الزاويتين المجاورتين لها من المثلث الأول مع مقابلاتها في المثلث الآخر.',
};

export const L4_EXAMPLE_THREE = {
  givens: '$ABCD$ متوازي أضلاع.',
  commonSide: '$[AC]$ ضلع مشتركة للمثلثين $ACB$، $ACD$.',
  oppositeSides:
    'وكذلك $AB = CD$ و $AD = BC$ لتساوي كل ضلعين متقابلين في متوازي الأضلاع.',
  conclusion:
    'فالمثلثان $ACB$، $ACD$ طبوقان لتساوي أطوال أضلاع المثلث الأول مع مقابلاتها في المثلث الآخر.',
};

export const L4_CHECK_QUESTION =
  'في الشكل المجاور: باستعمال كلّ من حالات التطابق السابقة، برهن أن المثلثين طبوقان.';

export const L4_PRACTICE_ONE =
  'لاحظ الطائرة الورقية، هل يمكنك تحديد أزواج المثلثات الطبوقة في هذا الشكل.';

export const L4_PRACTICE_TWO = 'في كل حالة، علل تطابق المثلثين';

export const L4_PRACTICE_THREE_INTRO =
  'تأمّل الشكل المرسوم جانباً. فيه $\\widehat{B} = \\widehat{C}$ و $BM = MC$.';

export const L4_PRACTICE_THREE_QUESTIONS: PrintedQuestion[] = [
  { label: '1-', text: 'أثبت أن المثلثين $MEB$، $MFC$ طبوقان.' },
  { label: '2-', text: 'أثبت أن المثلثين $MEA$، $MFA$ طبوقان.' },
  {
    label: '3-',
    text: 'استنتج صحة الخاصة: ”إذا تساوى قياسا زاويتين في مثلث كان المثلث متساوي الساقين“.',
  },
  {
    label: '4-',
    text: 'استنتج أن $(AM)$ ارتفاع في المثلث $ABC$ وأن $(AM)$ منصف للزاوية $A$.',
  },
];

export const L4_PRACTICE_THREE_NOTE =
  'سوف تتعلم في الوحدة الثالثة خواص يتمتع بها الارتفاع المتعلق بالقاعدة في المثلث المتساوي الساقين.';

export const L4_RIGHT_TRIANGLES_NOTE = 'يتطابق مثلثان قائمان في الحالتين الآتيتين:';

export const L4_RIGHT_TRIANGLES_ITEMS = [
  'إذا تساوى وتر وضلع قائمة من أحدهما مع وتر وضلع قائمة من الآخر.',
  'إذا تساوى وتر وزاوية حادة من أحدهما مع وتر وزاوية حادة من الآخر.',
];

/** Every printed prompt of the lesson, in printed order — the coverage matrix. */
export const L4_PRINTED_PROMPTS: PrintedQuestion[] = [
  ...L4_ACTIVITY_QUESTIONS,
  { label: 'تحقّق من فهمك', text: L4_CHECK_QUESTION },
  { label: '①', text: L4_PRACTICE_ONE },
  { label: '②', text: L4_PRACTICE_TWO },
  ...L4_PRACTICE_THREE_QUESTIONS,
];
