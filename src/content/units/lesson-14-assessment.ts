import type { AssessmentInput, ContentBlock } from '../schema';

const p = (text: string): ContentBlock[] => [{ type: 'paragraph', text }];
const choice = (id: string, text: string) => ({ id, blocks: p(text) });

/**
 * ============================================================================
 *  UNIT 3, LESSON 2 — IN-LESSON FINAL ASSESSMENT
 * ============================================================================
 *
 *  Formative 8-question check inside the lesson flow (`origin: 'authored'`),
 *  using the three in-lesson assessment types. It is NOT the Test Area bank and
 *  duplicates no printed exercise. Coverage of pages 56–58: the definition and
 *  its marks, the concurrence of the three altitudes, the position of H in the
 *  three kinds of triangle, the two-altitude construction, and the mutual
 *  orthocenter property.
 * ============================================================================
 */
export const lesson14Assessment: AssessmentInput = {
  id: 'assessment-14-triangle-altitude',
  title: 'الاختبار النهائي — ارتفاع مثلث',
  passingScore: 75,
  instructions:
    'أجب عن الأسئلة الثمانية الآتية للتحقّق من استيعابك لدرس ارتفاع مثلث: تعريفه والعلامات التي تُرسم عليه، وتلاقي الارتفاعات الثلاثة في مركز التعامد، وموضع هذه النقطة في أنواع المثلثات الثلاثة، وكيفية تعيينها بارتفاعين.',
  questions: [
    {
      id: 'l14-q01-definition',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'تعريف الارتفاع وتمييزه عن المحور والمتوسط',
      prompt: p(
        'المستقيم $(d)$ مارّ بالرأس $A$ وعمودي على $(BC)$. ما هو $(d)$ بالنسبة إلى المثلث $ABC$؟',
      ),
      choices: [
        choice('l14-q01-a', 'الارتفاع المتعلق بالضلع $[BC]$'),
        choice('l14-q01-b', 'محور الضلع $[BC]$'),
        choice('l14-q01-c', 'المتوسط المتعلق بالضلع $[BC]$'),
        choice('l14-q01-d', 'منصّف الزاوية $\\widehat{BAC}$'),
      ],
      correctChoiceId: 'l14-q01-a',
      explanation: p(
        'الارتفاع هو المارّ بالرأس والعمودي على الضلع المقابل، وهذا هو الشرطان. المحور عمودي أيضًا لكنّه في منتصف الضلع ولا يلزم أن يمرّ بالرأس؛ والمتوسط يصل الرأس بمنتصف الضلع دون أن يكون عموديًا.',
      ),
    },
    {
      id: 'l14-q02-marks',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'قراءة علامات الشكل',
      prompt: p(
        'أيّ مجموعة علامات تسمح بالحكم بأنّ مستقيمًا مارًّا بـ $A$ هو ارتفاع متعلق بـ $[BC]$؟',
      ),
      choices: [
        choice('l14-q02-a', 'زاوية قائمة عند قدمه على $(BC)$، دون شرط المنتصف'),
        choice('l14-q02-b', 'علامتان متساويتان على نصفَي $[BC]$ فقط'),
        choice('l14-q02-c', 'مروره بمنتصف $[BC]$ دون زاوية قائمة'),
        choice('l14-q02-d', 'مروره بمنتصف $[BC]$ مع زاوية قائمة عند المنتصف'),
      ],
      correctChoiceId: 'l14-q02-a',
      explanation: p(
        'يكفي أن يمرّ بالرأس $A$ وأن يكون عموديًا على $(BC)$ (زاوية قائمة عند القدم). ولا يلزم أن يقع القدم في المنتصف؛ فاجتماع العمودية والتنصيف يعني محورًا لا ارتفاعًا في العموم.',
      ),
    },
    {
      id: 'l14-q03-concurrent',
      type: 'true-false',
      origin: 'authored',
      skill: 'خاصّة تلاقي الارتفاعات الثلاثة',
      prompt: p('الارتفاعات الثلاثة في أيّ مثلث تتلاقى في نقطة واحدة $H$.'),
      answer: true,
      explanation: p(
        'هذه هي الخاصّة المطبوعة في صفحة ٥٧: «الارتفاعات الثلاثة في المثلث تلتقي في نقطة واحدة $H$». ويثبتها إثبات صفحة ٥٦ بردّ الارتفاعات إلى محاور أضلاع المثلث $MNP$.',
      ),
    },
    {
      id: 'l14-q04-two-altitudes',
      type: 'true-false',
      origin: 'authored',
      skill: 'تعيين مركز التعامد بارتفاعين',
      prompt: p('لتعيين نقطة تلاقي ارتفاعات مثلث يجب رسم الارتفاعات الثلاثة جميعًا.'),
      answer: false,
      explanation: p(
        'يكفي رسم ارتفاعين: نقطة تقاطعهما هي مركز التعامد، والارتفاع الثالث يمرّ بها بحكم الخاصّة. وهذا نصّ فقرة «اكتساب معارف» في صفحة ٥٧.',
      ),
    },
    {
      id: 'l14-q05-h-acute',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'موضع H في المثلث الحاد',
      prompt: p('في مثلث $ABC$ حاد الزوايا، أين يقع مركز التعامد $H$؟'),
      choices: [
        choice('l14-q05-a', 'داخل المثلث'),
        choice('l14-q05-b', 'خارج المثلث'),
        choice('l14-q05-c', 'عند أحد الرؤوس'),
        choice('l14-q05-d', 'في منتصف أحد الأضلاع'),
      ],
      correctChoiceId: 'l14-q05-a',
      explanation: p(
        'في المثلث الحاد الزوايا تقع الأقدام على الأضلاع نفسها وتتلاقى الارتفاعات داخل المثلث، كما في اللوحة الأولى من صفحة ٥٧.',
      ),
    },
    {
      id: 'l14-q06-h-right',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'موضع H في المثلث القائم',
      prompt: p('في مثلث $ABC$ قائم في $A$، أين يقع مركز التعامد $H$؟'),
      choices: [
        choice('l14-q06-a', 'داخل المثلث'),
        choice('l14-q06-b', 'عند الرأس $A$ (رأس الزاوية القائمة)'),
        choice('l14-q06-c', 'في منتصف الوتر $[BC]$'),
        choice('l14-q06-d', 'خارج المثلث'),
      ],
      correctChoiceId: 'l14-q06-b',
      explanation: p(
        'في المثلث القائم ينطبق الارتفاعان من $B$ و$C$ على الضلعين القائمين $[BA]$ و$[CA]$، فيتلاقى الجميع عند رأس الزاوية القائمة $A$. (منتصف الوتر هو مركز الدائرة المارّة بالرؤوس، لا مركز التعامد.)',
      ),
    },
    {
      id: 'l14-q07-mutual',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'خاصّة الرؤوس الأربعة المتعامدة',
      prompt: p('إذا كان $H$ مركز تعامد المثلث $ABC$، فما نقطة تلاقي ارتفاعات المثلث $AHC$؟'),
      choices: [
        choice('l14-q07-a', 'النقطة $B$'),
        choice('l14-q07-b', 'النقطة $H$'),
        choice('l14-q07-c', 'منتصف $[AC]$'),
        choice('l14-q07-d', 'النقطة $A$'),
      ],
      correctChoiceId: 'l14-q07-a',
      explanation: p(
        'لأنّ $(CH)\\perp(AB)$ فـ $[AB]$ ارتفاع من $A$ في $AHC$، و$(AH)\\perp(CB)$ فـ $[CB]$ ارتفاع من $C$؛ يتقاطعان في $B$. وهذا هو حل المثال 2 المطبوع في صفحة ٥٨.',
      ),
    },
    {
      id: 'l14-q08-obtuse-extension',
      type: 'numeric',
      origin: 'authored',
      skill: 'عدد الارتفاعات التي يلزم مدّ ضلعها في المثلث المنفرج',
      prompt: p(
        'في مثلث منفرج الزاوية، كم ارتفاعًا يقع قدمه على امتداد الضلع المقابل (لا على الضلع نفسه) فيلزم مدّ ذلك الضلع لرسمه؟',
      ),
      answer: 2,
      tolerance: 0,
      explanation: p(
        'الارتفاعان من الرأسين الحادّين يقع قدماهما على امتداد الضلعين المقابلين، فيلزم مدّ ضلعين؛ أمّا الارتفاع من الرأس المنفرج فيقع قدمه على الضلع المقابل نفسه. وهذا ما ينبّه إليه 💡 المثال 1: «نمدّد نصف المستقيم $[CA)$».',
      ),
    },
  ],
};
