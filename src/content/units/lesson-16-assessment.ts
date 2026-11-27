import type { AssessmentInput, ContentBlock } from '../schema';

const p = (text: string): ContentBlock[] => [{ type: 'paragraph', text }];
const choice = (id: string, text: string) => ({ id, blocks: p(text) });

/**
 * ============================================================================
 *  UNIT 3, LESSON 4 — IN-LESSON FINAL ASSESSMENT (pages 62–63)
 * ============================================================================
 *  Formative 8-question authored check; the three in-lesson types; duplicates no
 *  printed exercise. Coverage: definition and marks, concurrence, the incenter
 *  and incircle, the two-bisector construction, the inside position, and the
 *  angle-doubling computation.
 * ============================================================================
 */
export const lesson16Assessment: AssessmentInput = {
  id: 'assessment-16-angle-bisector',
  title: 'الاختبار النهائي — منصّف زاوية مثلث',
  passingScore: 75,
  instructions:
    'أجب عن الأسئلة الثمانية الآتية للتحقّق من استيعابك لدرس منصّف زاوية مثلث: تعريفه، وتلاقي المنصفات في مركز الدائرة الداخلية، وكيفية تعيينه بمنصّفين، واستعماله في حساب الزوايا.',
  questions: [
    {
      id: 'l16-q01-definition',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'تعريف المنصف',
      prompt: p(
        'المستقيم $(d)$ مارّ بالرأس $A$ ويقسم $\\widehat{A}$ إلى زاويتين متساويتين. ما هو $(d)$؟',
      ),
      choices: [
        choice('l16-q01-a', 'منصّف الزاوية $\\widehat{A}$'),
        choice('l16-q01-b', 'الارتفاع من $A$'),
        choice('l16-q01-c', 'المتوسط من $A$'),
        choice('l16-q01-d', 'محور $[BC]$'),
      ],
      correctChoiceId: 'l16-q01-a',
      explanation: p(
        'المنصّف يقسم زاوية الرأس إلى زاويتين متساويتين، وهذا هو تعريفه. الارتفاع عمودي على الضلع المقابل، والمتوسط يصل بمنتصفه، والمحور عمودي في المنتصف.',
      ),
    },
    {
      id: 'l16-q02-marks',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'قراءة العلامات',
      prompt: p('أيّ علامة تسمح بالحكم بأنّ مستقيمًا مارًّا بـ $A$ هو منصّف $\\widehat{A}$؟'),
      choices: [
        choice('l16-q02-a', 'علامتا زاويتين متساويتين عند $A$ (نصفَا الزاوية)'),
        choice('l16-q02-b', 'زاوية قائمة عند قدمه على $[BC]$'),
        choice('l16-q02-c', 'علامتا تنصيف على نصفَي $[BC]$'),
        choice('l16-q02-d', 'مروره بمنتصف $[BC]$'),
      ],
      correctChoiceId: 'l16-q02-a',
      explanation: p(
        'المنصّف يُعرف بتساوي نصفَي الزاوية عند الرأس؛ أمّا الزاوية القائمة فتخصّ الارتفاع، وعلامتا التنصيف تخصّان المتوسط أو المحور.',
      ),
    },
    {
      id: 'l16-q03-concurrent',
      type: 'true-false',
      origin: 'authored',
      skill: 'تلاقي المنصفات',
      prompt: p(
        'المنصفات الثلاثة لزوايا المثلث تتلاقى في نقطة واحدة $I$ هي مركز الدائرة الماسة لأضلاع المثلث داخلاً.',
      ),
      answer: true,
      explanation: p(
        'هذه هي الخاصّة المطبوعة في صفحة ٦٣: «المنصفات الثلاثة لزوايا المثلث تلتقي في نقطة واحدة $I$. النقطة $I$ هي مركز الدائرة الماسة لأضلاع المثلث داخلاً.»',
      ),
    },
    {
      id: 'l16-q04-equidistant',
      type: 'true-false',
      origin: 'authored',
      skill: 'تساوي المسافات إلى الأضلاع',
      prompt: p('مركز الدائرة الداخلية $I$ يبعد بالمسافة نفسها عن أضلاع المثلث الثلاثة.'),
      answer: true,
      explanation: p(
        'لأنّ $I$ على كلّ منصّف، وكلّ نقطة على منصّف زاوية تبعد بالمسافة نفسها عن ضلعَي الزاوية؛ فتتساوى المسافات الثلاث، وهي نصف قطر الدائرة الداخلية.',
      ),
    },
    {
      id: 'l16-q05-two-bisectors',
      type: 'true-false',
      origin: 'authored',
      skill: 'تعيين المركز بمنصّفين',
      prompt: p('لتعيين مركز الدائرة الداخلية يجب رسم المنصفات الثلاثة جميعًا.'),
      answer: false,
      explanation: p(
        'يكفي رسم منصّفَين؛ نقطة تقاطعهما هي المركز، والمنصّف الثالث يمرّ بها بحكم الخاصّة (💡 صفحة ٦٣).',
      ),
    },
    {
      id: 'l16-q06-inside',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'موضع المركز',
      prompt: p('أين يقع مركز الدائرة الماسة لأضلاع المثلث داخلاً؟'),
      choices: [
        choice('l16-q06-a', 'داخل المثلث دائمًا'),
        choice('l16-q06-b', 'خارج المثلث'),
        choice('l16-q06-c', 'عند أحد الرؤوس'),
        choice('l16-q06-d', 'في منتصف أحد الأضلاع'),
      ],
      correctChoiceId: 'l16-q06-a',
      explanation: p(
        'مركز الدائرة الداخلية يقع داخل المثلث دائمًا مهما كان نوعه، لأنّ المنصفات الداخلية تتلاقى داخله.',
      ),
    },
    {
      id: 'l16-q07-distinguish',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'التمييز بين الدائرتين',
      prompt: p('الدائرة المارّة برؤوس المثلث مركزها نقطة تلاقي .....'),
      choices: [
        choice('l16-q07-a', 'محاور الأضلاع'),
        choice('l16-q07-b', 'منصفات الزوايا'),
        choice('l16-q07-c', 'الارتفاعات'),
        choice('l16-q07-d', 'المتوسطات'),
      ],
      correctChoiceId: 'l16-q07-a',
      explanation: p(
        'الدائرة المارّة بالرؤوس مركزها تلاقي المحاور (درس المحور)؛ أمّا الدائرة الماسّة للأضلاع داخلاً فمركزها تلاقي المنصفات. والصفحة ٦٣ تطبع تلميحَين يميّزان بينهما.',
      ),
    },
    {
      id: 'l16-q08-angle-doubling',
      type: 'numeric',
      origin: 'authored',
      skill: 'مضاعفة نصف الزاوية',
      prompt: p(
        'في مثلث $ERT$ مركز دائرته الداخلية $C$، كان $\\widehat{CRT} = 25^\\circ$ و$\\widehat{CTR} = 31^\\circ$. ما قياس $\\widehat{RET}$ (بالدرجات)؟',
      ),
      answer: 68,
      tolerance: 0.01,
      unit: '°',
      explanation: p(
        '$[RC)$ و$[TC)$ منصّفان، فـ $\\widehat{R}=2\\times25=50^\\circ$ و$\\widehat{T}=2\\times31=62^\\circ$؛ ومنه $\\widehat{RET}=180-50-62=68^\\circ$ (تدرّب ①).',
      ),
    },
  ],
};
