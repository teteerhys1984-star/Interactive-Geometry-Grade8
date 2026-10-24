import type { AssessmentInput, ContentBlock } from '../schema';

/**
 * ============================================================================
 *  الدرس الثامن — الاختبار النهائي (من إعداد المنصّة)
 * ============================================================================
 *
 *  Twelve platform-written questions. The printed pages carry no assessment at
 *  all, so every question is `origin: 'authored'` and has its own teacher-only
 *  explanation. Nothing here is presented as a printed exercise.
 *
 *  Correctness rules honoured:
 *    • every multiple-choice question has exactly one defensible answer, and
 *      the distractors are the mistakes the platform actually sees;
 *    • numeric answers are exact and use tolerance 0;
 *    • no question can be answered from the answer key: the key is rendered
 *      only inside the Teacher Area;
 *    • the arithmetic of every answer is re-derived in the explanation, so a
 *      reviewer never has to trust the option list.
 * ============================================================================
 */

const p = (text: string): ContentBlock[] => [{ type: 'paragraph', text }];
const choice = (id: string, text: string) => ({ id, blocks: p(text) });

export const lesson08Assessment: AssessmentInput = {
  id: 'lesson-08-final-assessment',
  title: 'الاختبار النهائي — منتصفا ضلعين في المثلث',
  passingScore: 60,
  instructions:
    'أجب عن الأسئلة الاثني عشر كلها، ويمكنك تعديل إجاباتك قبل التسليم. لا يظهر التصحيح إلا بعد تسليم الاختبار كاملاً.',
  questions: [
    /* ------------------------------------------------------------------ 01 */
    {
      id: 'l8-q01-midline-relation',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'مبرهنة منتصفَي ضلعين: الصياغة الكاملة',
      prompt: p(
        'في مثلث $ABC$، النقطة $M$ منتصف $[AB]$ والنقطة $N$ منتصف $[AC]$. أي عبارة صحيحة دائماً؟',
      ),
      choices: [
        choice('l8-q01-a', '$(MN) \\parallel (BC)$ و$MN = \\frac{1}{2}\\,BC$.'),
        choice('l8-q01-b', '$(MN) \\parallel (BC)$ و$MN = 2\\,BC$.'),
        choice('l8-q01-c', '$(MN) \\perp (BC)$ و$MN = \\frac{1}{2}\\,BC$.'),
        choice('l8-q01-d', '$(MN) \\parallel (AB)$ و$MN = \\frac{1}{2}\\,AB$.'),
      ],
      correctChoiceId: 'l8-q01-a',
      explanation: p(
        'المبرهنة تعطي الأمرين معاً: المستقيم المار بمنتصفي ضلعين يوازي الضلع الثالث، والقطعة الواصلة بينهما تساوي نصفه. الخيار (ب) يعكس النسبة، و(ج) يستبدل التوازي بالتعامد، و(د) يجعل النصف تابعاً للضلع الذي يحمل المنتصفين بدلاً من الضلع الثالث $[BC]$.',
      ),
    },

    /* ------------------------------------------------------------------ 02 */
    {
      id: 'l8-q02-half-of-wrong-side',
      type: 'true-false',
      origin: 'authored',
      skill: 'تمييز الضلع الذي تُنسب إليه النصفية',
      prompt: p(
        'إذا كانت $M$ منتصف $[AB]$ و$N$ منتصف $[AC]$ في مثلث $ABC$، فإنَّ $MN = \\frac{1}{2}\\,AB$.',
      ),
      answer: false,
      explanation: p(
        'خطأ. القطعة $[MN]$ تصل منتصفي $[AB]$ و$[AC]$، فالنصف يخصّ الضلع الثالث $[BC]$: $MN = \\frac{1}{2}\\,BC$. أما $AB$ فهو أحد الضلعين اللذين يحملان المنتصفين، ولا تدخل نصفه في النتيجة. (خطأ شائع: نسبة النصف إلى الضلع الذي يحمل المنتصفين.)',
      ),
    },

    /* ------------------------------------------------------------------ 03 */
    {
      id: 'l8-q03-compute-midline',
      type: 'numeric',
      origin: 'authored',
      skill: 'حساب طول قطعة المنتصفين',
      prompt: p(
        'في مثلث $ABC$، $M$ منتصف $[AB]$ و$N$ منتصف $[AC]$، والضلع $BC = 14\\,\\mathrm{cm}$. ما طول $MN$ بالسنتيمتر؟',
      ),
      answer: 7,
      tolerance: 0,
      unit: 'cm',
      explanation: p(
        'بتطبيق المبرهنة: $MN = \\frac{1}{2}\\,BC = \\frac{1}{2} \\times 14 = 7\\,\\mathrm{cm}$.',
      ),
    },

    /* ------------------------------------------------------------------ 04 */
    {
      id: 'l8-q04-recover-base',
      type: 'numeric',
      origin: 'authored',
      skill: 'الانتقال من القطعة إلى الضلع الثالث',
      prompt: p(
        'في مثلث $ABC$، $M$ منتصف $[AB]$ و$N$ منتصف $[AC]$، و$MN = 4.5\\,\\mathrm{cm}$. ما طول $BC$ بالسنتيمتر؟',
      ),
      answer: 9,
      tolerance: 0,
      unit: 'cm',
      explanation: p(
        'من المبرهنة $MN = \\frac{1}{2}\\,BC$، إذن $BC = 2\\,MN = 2 \\times 4.5 = 9\\,\\mathrm{cm}$. الخطأ الشائع هنا هو القسمة على 2 بدل الضرب فيها.',
      ),
    },

    /* ------------------------------------------------------------------ 05 */
    {
      id: 'l8-q05-which-side-parallel',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'تحديد الضلع الموازي',
      prompt: p(
        'في مثلث $ABC$، المستقيم المار بمنتصفي الضلعين $[AB]$ و$[AC]$ يوازي أي ضلع؟',
      ),
      choices: [
        choice('l8-q05-a', 'الضلع $[AB]$.'),
        choice('l8-q05-b', 'الضلع $[AC]$.'),
        choice('l8-q05-c', 'الضلع $[BC]$.'),
        choice('l8-q05-d', 'الأضلاع الثلاثة معاً.'),
      ],
      correctChoiceId: 'l8-q05-c',
      explanation: p(
        'المستقيم المار بمنتصفَي ضلعين يوازي الضلع الثالث، أي الضلع الذي لا يحمل أياً من المنتصفين. هنا المنتصفان على $[AB]$ و$[AC]$، فالثالث هو $[BC]$. ولا يمكن لمستقيم أن يوازي ثلاثة أضلاع لمثلث غير منعدم في الوقت نفسه.',
      ),
    },

    /* ------------------------------------------------------------------ 06 */
    {
      id: 'l8-q06-theorem-statement',
      type: 'true-false',
      origin: 'authored',
      skill: 'القطعة الواصلة بين منتصفين',
      prompt: p('القطعة الواصلة بين منتصفي ضلعين في مثلث تساوي نصف طول الضلع الثالث.'),
      answer: true,
      explanation: p(
        'هذه هي الصيغة الثانية للمبرهنة نفسها: المستقيم يوازي الضلع الثالث، والقطعة تساوي نصفه. الشرط أن تكون النقطتان منتصفَي ضلعين مختلفين في المثلث.',
      ),
    },

    /* ------------------------------------------------------------------ 07 */
    {
      id: 'l8-q07-choose-triangle-semicircle',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'اختيار المثلث الذي تنطبق عليه المبرهنة',
      prompt: p(
        'في «تدرّب ①»: نصف دائرة مركزها $O$ وقطرها $[AB]$، والنقطة $M$ منتصف $[AE]$. لإثبات $(OM) \\parallel (BE)$ نطبّق المبرهنة على المثلث:',
      ),
      choices: [
        choice('l8-q07-a', 'المثلث $AOM$.'),
        choice('l8-q07-b', 'المثلث $ABE$.'),
        choice('l8-q07-c', 'المثلث $OBE$.'),
      ],
      correctChoiceId: 'l8-q07-b',
      explanation: p(
        'في المثلث $ABE$: النقطة $O$ منتصف $[AB]$ (لأنَّ $[AB]$ قطر و$O$ مركز)، والنقطة $M$ منتصف $[AE]$. إذن $[OM]$ تصل منتصفي ضلعين، فتوازي الضلع الثالث $[BE]$ وتساوي نصفه. المثلثان $AOM$ و$OBE$ لا يحملان المنتصفين معاً بالشكل المطلوب.',
      ),
    },

    /* ------------------------------------------------------------------ 08 */
    {
      id: 'l8-q08-choose-triangle-symmetry',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'اختيار المثلث في مسألة تناظر',
      prompt: p(
        'في «اكتساب معارف»: $ABC$ مثلث، $O$ منتصف $[AC]$، و$I$ نظيرة $C$ بالنسبة إلى $B$. لإثبات $(OB) \\parallel (AI)$ نطبّق المبرهنة على المثلث:',
      ),
      choices: [
        choice('l8-q08-a', 'المثلث $ABC$.'),
        choice('l8-q08-b', 'المثلث $ACI$.'),
        choice('l8-q08-c', 'المثلث $ABI$.'),
      ],
      correctChoiceId: 'l8-q08-b',
      explanation: p(
        'النظير يعطي $CB = BI$، فالنقطة $B$ منتصف $[CI]$؛ والنقطة $O$ منتصف $[AC]$. إذن في المثلث $ACI$: $B$ و$O$ منتصفا ضلعين، والقطعة $[BO]$ توازي الضلع الثالث $[AI]$. النقطتان $B$ و$O$ ليستا منتصفَي ضلعين في المثلث $ABC$، فالمبرهنة لا تنطبق عليه.',
      ),
    },

    /* ------------------------------------------------------------------ 09 */
    {
      id: 'l8-q09-rhombus-perimeter',
      type: 'numeric',
      origin: 'authored',
      skill: 'محيط الرباعي الناتج عن منتصفات مستطيل',
      prompt: p(
        'مستطيل $ABCD$ مرسوم داخل دائرة نصف قطرها $3\\,\\mathrm{cm}$، والنقاط $E$ و$F$ و$G$ و$H$ منتصفات أضلاعه على الترتيب. ما محيط الرباعي $EFGH$ بالسنتيمتر؟',
      ),
      answer: 12,
      tolerance: 0,
      unit: 'cm',
      explanation: p(
        'قطر المستطيل هو قطر الدائرة، أي $AC = 2 \\times 3 = 6\\,\\mathrm{cm}$. في المثلث $ABC$: $E$ منتصف $[AB]$ و$F$ منتصف $[BC]$، إذن $EF = \\frac{1}{2}\\,AC = 3\\,\\mathrm{cm}$. وبالطريقة نفسها مع المثلثات الثلاثة الأخرى، كل ضلع من $EFGH$ يساوي نصف قطر الدائرة، أي $3\\,\\mathrm{cm}$؛ فالمحيط $= 4 \\times 3 = 12\\,\\mathrm{cm}$.',
      ),
    },

    /* ------------------------------------------------------------------ 10 */
    {
      id: 'l8-q10-rhombus-nature',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'طبيعة الرباعي الناتج',
      prompt: p(
        'في السؤال السابق، ما نوع الرباعي $EFGH$؟ اختر الوصف الأدقّ الذي يثبته البرهان.',
      ),
      choices: [
        choice('l8-q10-a', 'مربع، لأنَّ المستطيل $ABCD$ أضلاعه متساوية.'),
        choice('l8-q10-b', 'معيّن، لأنَّ أضلاعه الأربعة متساوية ولا يلزم أن تكون زواياه قائمة.'),
        choice('l8-q10-c', 'شبه منحرف، لأنَّ ضلعين فقط متوازيان.'),
        choice('l8-q10-d', 'مستطيل فقط، وليس معيّناً.'),
      ],
      correctChoiceId: 'l8-q10-b',
      explanation: p(
        'أضلاع $EFGH$ الأربعة تساوي نصف القطر، فهي متساوية، والرباعي معيّن. وليس مربعاً بالضرورة: زواياه القائمة تحتاج إلى تعامد القطرين في $ABCD$، وهذا لا يضمنه كون $ABCD$ مستطيلاً (يصبح مربعاً عندما يتساوى طوله وعرضه). والخيار (ج) خطأ لأنَّ كل ضلعين متقابلين في $EFGH$ متوازيان.',
      ),
    },

    /* ------------------------------------------------------------------ 11 */
    {
      id: 'l8-q11-double-relation',
      type: 'true-false',
      origin: 'authored',
      skill: 'العلاقة العكسية بين القطعة والضلع',
      prompt: p(
        'إذا كانت $M$ منتصف $[AB]$ و$N$ منتصف $[AC]$، وكان $MN = 3\\,\\mathrm{cm}$، فإنَّ $BC = 6\\,\\mathrm{cm}$.',
      ),
      answer: true,
      explanation: p(
        'صحيح: $MN = \\frac{1}{2}\\,BC$، إذن $BC = 2\\,MN = 2 \\times 3 = 6\\,\\mathrm{cm}$. السؤال يعكس العملية الحسابية نفسها التي في السؤال 04، للتأكد من أنَّ العلاقة مفهومة في الاتجاهين لا محفوظة في اتجاه واحد.',
      ),
    },

    /* ------------------------------------------------------------------ 12 */
    {
      id: 'l8-q12-insufficient-data',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'شروط انطباق المبرهنة',
      prompt: p(
        'أي مجموعة معطيات لا تسمح بتطبيق مبرهنة منتصفَي ضلعين في المثلث $ABC$؟',
      ),
      choices: [
        choice('l8-q12-a', '$M$ منتصف $[AB]$ و$N$ منتصف $[AC]$.'),
        choice('l8-q12-b', '$M$ منتصف $[AB]$، والنقطة $N$ على $[AC]$ بحيث $AN \\neq NC$.'),
        choice('l8-q12-c', '$M$ منتصف $[AC]$ و$N$ منتصف $[BC]$.'),
        choice('l8-q12-d', '$M$ منتصف $[AB]$ و$N$ منتصف $[BC]$.'),
      ],
      correctChoiceId: 'l8-q12-b',
      explanation: p(
        'المبرهنة تحتاج إلى منتصفَين. في الخيار (ب) النقطة $N$ تقع على الضلع لكنها ليست منتصفه، فشرط المبرهنة غير متحقق ولا يجوز استعمالها. الخيارات الأخرى تعطي منتصفَي ضلعين في كل مرة (وينتج عنها التوازي مع الضلع الثالث المختلف باختلاف الزوج).',
      ),
    },
  ],
};
