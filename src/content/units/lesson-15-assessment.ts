import type { AssessmentInput, ContentBlock } from '../schema';

const p = (text: string): ContentBlock[] => [{ type: 'paragraph', text }];
const choice = (id: string, text: string) => ({ id, blocks: p(text) });

/**
 * ============================================================================
 *  UNIT 3, LESSON 3 — IN-LESSON FINAL ASSESSMENT (pages 59–61)
 * ============================================================================
 *  Formative 8-question authored check; the three in-lesson types; duplicates no
 *  printed exercise. Coverage: definition and marks, concurrence, the 2/3 ratio
 *  (both directions), the two-median construction, the centroid always inside,
 *  and the parallelogram application.
 * ============================================================================
 */
export const lesson15Assessment: AssessmentInput = {
  id: 'assessment-15-triangle-median',
  title: 'الاختبار النهائي — المتوسط في المثلث',
  passingScore: 75,
  instructions:
    'أجب عن الأسئلة الثمانية الآتية للتحقّق من استيعابك لدرس المتوسط في المثلث: تعريفه، وتلاقي المتوسطات في مركز الثقل، والنسبة 2/3 من الرأس، وكيفية تعيينه بمتوسطين.',
  questions: [
    {
      id: 'l15-q01-definition',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'تعريف المتوسط',
      prompt: p(
        'المستقيم $(d)$ مارّ بالرأس $A$ وبمنتصف $[BC]$. ما هو $(d)$ بالنسبة إلى المثلث $ABC$؟',
      ),
      choices: [
        choice('l15-q01-a', 'المتوسط المتعلق بالضلع $[BC]$'),
        choice('l15-q01-b', 'الارتفاع المتعلق بالضلع $[BC]$'),
        choice('l15-q01-c', 'محور الضلع $[BC]$'),
        choice('l15-q01-d', 'منصّف الزاوية $\\widehat{BAC}$'),
      ],
      correctChoiceId: 'l15-q01-a',
      explanation: p(
        'المتوسط يصل الرأس بمنتصف الضلع المقابل، وهذا هو الشرطان. ولا يشترط العمودية (الارتفاع) ولا أن يكون في المنتصف دون الرأس (المحور).',
      ),
    },
    {
      id: 'l15-q02-marks',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'قراءة العلامات',
      prompt: p(
        'أيّ مجموعة علامات تسمح بالحكم بأنّ مستقيمًا مارًّا بـ $A$ هو متوسط متعلق بـ $[BC]$؟',
      ),
      choices: [
        choice('l15-q02-a', 'علامتان متساويتان على نصفَي $[BC]$، دون شرط زاوية قائمة'),
        choice('l15-q02-b', 'زاوية قائمة عند قدمه فقط'),
        choice('l15-q02-c', 'زاوية قائمة مع تنصيف $[BC]$'),
        choice('l15-q02-d', 'مروره بـ $A$ دون أيّ علامة على $[BC]$'),
      ],
      correctChoiceId: 'l15-q02-a',
      explanation: p(
        'يكفي المرور بالرأس $A$ وعلامتا التنصيف على نصفَي $[BC]$. اجتماع التنصيف والعمودية يعني محورًا (أو مثلثًا متساوي الساقين)، لا متوسطًا في العموم.',
      ),
    },
    {
      id: 'l15-q03-concurrent',
      type: 'true-false',
      origin: 'authored',
      skill: 'تلاقي المتوسطات',
      prompt: p('المتوسطات الثلاثة في أيّ مثلث تتلاقى في نقطة واحدة تسمّى مركز ثقل المثلث.'),
      answer: true,
      explanation: p(
        'هذه هي الخاصّة المطبوعة في صفحة ٦٠: «المتوسطات الثلاثة في المثلث تلتقي في نقطة واحدة $G$. تسمى هذه النقطة مركز ثقل المثلث.»',
      ),
    },
    {
      id: 'l15-q04-ratio',
      type: 'numeric',
      origin: 'authored',
      skill: 'النسبة 2/3 من الرأس',
      prompt: p(
        "إذا كان $G$ مركز ثقل المثلث و$[AA']$ متوسطًا بطول $9\\ \\text{cm}$، فما طول $AG$ (بالسنتيمتر)؟",
      ),
      answer: 6,
      tolerance: 0.01,
      unit: 'cm',
      explanation: p(
        "$AG = \\frac{2}{3}AA' = \\frac{2}{3}\\times 9 = 6\\ \\text{cm}$. فالجزء الأقرب إلى الرأس ثلثا المتوسط.",
      ),
    },
    {
      id: 'l15-q05-ratio-backward',
      type: 'true-false',
      origin: 'authored',
      skill: 'من النسبة إلى مركز الثقل',
      prompt: p(
        'إذا كان $M$ منتصف $[BC]$ و$G\\in[AM]$ مع $AG = 2GM$، فإنّ $G$ مركز ثقل المثلث $ABC$.',
      ),
      answer: true,
      explanation: p(
        '$AG=2GM$ يعني $AG=\\frac{2}{3}AM$، و$[AM]$ متوسط لأنّ $M$ منتصف $[BC]$؛ فالنقطة الواقعة في نهاية الثلث الثاني من متوسط من الرأس هي مركز الثقل (مثال صفحة ٦٠).',
      ),
    },
    {
      id: 'l15-q06-two-medians',
      type: 'true-false',
      origin: 'authored',
      skill: 'تعيين مركز الثقل بمتوسطين',
      prompt: p('لتعيين مركز ثقل مثلث يجب رسم المتوسطات الثلاثة جميعًا.'),
      answer: false,
      explanation: p(
        'يكفي رسم متوسطين؛ نقطة تقاطعهما هي مركز الثقل، والمتوسط الثالث يمرّ بها بحكم الخاصّة (فقرة «اكتساب معارف»، صفحة ٦٠).',
      ),
    },
    {
      id: 'l15-q07-inside',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'موضع مركز الثقل',
      prompt: p('أين يقع مركز ثقل مثلث منفرج الزاوية؟'),
      choices: [
        choice('l15-q07-a', 'داخل المثلث دائمًا'),
        choice('l15-q07-b', 'خارج المثلث'),
        choice('l15-q07-c', 'عند رأس الزاوية المنفرجة'),
        choice('l15-q07-d', 'في منتصف أطول ضلع'),
      ],
      correctChoiceId: 'l15-q07-a',
      explanation: p(
        'مركز الثقل يقع داخل المثلث دائمًا مهما كان نوعه، بخلاف مركز التعامد الذي قد يخرج في المثلث المنفرج.',
      ),
    },
    {
      id: 'l15-q08-parallelogram',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'تطبيق متوازي الأضلاع',
      prompt: p('في متوازي الأضلاع $ABCD$ مركزه $O$، لماذا يكون $[BO]$ متوسطًا في المثلث $ABC$؟'),
      choices: [
        choice('l15-q08-a', 'لأنّ $O$ منتصف $[AC]$ (قطرا المتوازي متناصفان)'),
        choice('l15-q08-b', 'لأنّ $O$ منتصف $[AB]$'),
        choice('l15-q08-c', 'لأنّ $(BO)$ عمودي على $(AC)$'),
        choice('l15-q08-d', 'لأنّ $O$ مركز ثقل المتوازي'),
      ],
      correctChoiceId: 'l15-q08-a',
      explanation: p(
        'قطرا متوازي الأضلاع متناصفان في $O$، فـ $O$ منتصف $[AC]$؛ ومن ثمّ $[BO]$ يصل الرأس $B$ بمنتصف الضلع المقابل $[AC]$، فهو متوسط في $ABC$ (مثال صفحة ٦١).',
      ),
    },
  ],
};
