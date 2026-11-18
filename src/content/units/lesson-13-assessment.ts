import type { AssessmentInput, ContentBlock } from '../schema';

const p = (text: string): ContentBlock[] => [{ type: 'paragraph', text }];
const choice = (id: string, text: string) => ({ id, blocks: p(text) });

/**
 * ============================================================================
 *  UNIT 3, LESSON 1 — IN-LESSON FINAL ASSESSMENT
 * ============================================================================
 *
 *  Formative 8-question check inside the lesson flow (`origin: 'authored'`),
 *  using the three in-lesson assessment types (`multiple-choice`,
 *  `true-false`, `numeric`) exactly as Lessons 8–11 do. It is NOT the Test Area
 *  bank and it duplicates no printed exercise.
 *
 *  Coverage of pages 53–55: the definition and its marks, the two directions of
 *  the property, the concurrence of the three bisectors and the centre of the
 *  circumscribed circle, the position of `O` in the three kinds of triangle,
 *  and the compass construction.
 * ============================================================================
 */
export const lesson13Assessment: AssessmentInput = {
  id: 'assessment-13-side-bisector',
  title: 'الاختبار النهائي — محور ضلع في المثلث',
  passingScore: 75,
  instructions:
    'أجب عن الأسئلة الثمانية الآتية للتحقّق من استيعابك لدرس محور ضلع في المثلث: تعريفه والعلامات التي تُرسم عليه، وخاصّته في الاتجاهين، وتلاقي المحاور الثلاثة في مركز الدائرة المارّة بالرؤوس، وموضع هذه النقطة في أنواع المثلثات الثلاثة.',
  questions: [
    {
      id: 'l13-q01-definition',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'تعريف محور ضلع وتمييزه عن الارتفاع والمتوسط',
      prompt: p(
        'المستقيم $(d)$ عمودي على $[BC]$ في منتصفها. ما هو $(d)$ بالنسبة إلى المثلث $ABC$؟',
      ),
      choices: [
        choice('l13-q01-a', 'محور الضلع $[BC]$'),
        choice('l13-q01-b', 'الارتفاع المتعلق بالضلع $[BC]$'),
        choice('l13-q01-c', 'المتوسط المتعلق بالضلع $[BC]$'),
        choice('l13-q01-d', 'منصّف الزاوية $\\widehat{BAC}$'),
      ],
      correctChoiceId: 'l13-q01-a',
      explanation: p(
        'المحور هو العمودي على الضلع في منتصفه، وهذا هو الشرطان معًا. الارتفاع عمودي أيضًا لكنه يُنشأ من الرأس $A$ ولا يلزم أن يقع قدمه في المنتصف؛ والمتوسط يمرّ بالمنتصف دون أن يكون عموديًا؛ ومنصّف الزاوية يُنشأ من الرأس لا من الضلع.',
      ),
    },
    {
      id: 'l13-q02-marks',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'قراءة علامات الشكل بدل الحكم على المظهر',
      prompt: p(
        'رُسم مستقيم يمرّ بنقطة من $[BC]$؛ أيّ مجموعة علامات تسمح بالحكم بأنّه محور $[BC]$؟',
      ),
      choices: [
        choice('l13-q02-a', 'زاوية قائمة عند نقطة التقاطع فقط'),
        choice('l13-q02-b', 'علامتان متساويتان على نصفَي $[BC]$ فقط'),
        choice('l13-q02-c', 'زاوية قائمة عند نقطة التقاطع مع علامتين متساويتين على نصفَي $[BC]$'),
        choice('l13-q02-d', 'مرور المستقيم بمنتصف $[BC]$ ومروره بالرأس $A$'),
      ],
      correctChoiceId: 'l13-q02-c',
      explanation: p(
        'الزاوية القائمة وحدها تعني ارتفاعًا، والتنصيف وحده يعني متوسطًا؛ والمحور يحتاج الشرطين معًا: عمودية في المنتصف. ومرور المستقيم بالرأس $A$ لا يعني شيئًا في العموم، بل لا يتحقّق إلّا في المثلث المتساوي الساقين في $A$.',
      ),
    },
    {
      id: 'l13-q03-forward-property',
      type: 'true-false',
      origin: 'authored',
      skill: 'استعمال الاتجاه المباشر من خاصّة المحور',
      prompt: p('إذا كانت $(d)$ محور $[BC]$ و$M$ نقطة من $(d)$، فإنّ $MB = MC$.'),
      answer: true,
      explanation: p(
        'هذا هو الاتجاه المباشر المطبوع في صفحة ٥٤: «أيًّا كانت $M$ من $(d)$، كان $MB = MC$». ويُستعمل لاستنتاج تساوي قطع، ثمّ لاستنتاج أنّ مثلثًا متساوي الساقين.',
      ),
    },
    {
      id: 'l13-q04-backward-property',
      type: 'true-false',
      origin: 'authored',
      skill: 'استعمال الاتجاه العكسي من خاصّة المحور',
      prompt: p('إذا كانت $M$ نقطة تحقّق $MB = MC$، فإنّ $M$ تنتمي إلى محور $[BC]$.'),
      answer: true,
      explanation: p(
        'هذا هو الاتجاه العكسي المطبوع في الصفحة نفسها، وهو الذي يجعل المحور قابلًا للإنشاء بالفرجار: يكفي أن نجد نقطتين متساويتي البعد عن الطرفين لنحكم بأنّ المستقيم المارّ بهما هو المحور.',
      ),
    },
    {
      id: 'l13-q05-o-inside',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'موضع مركز الدائرة المارّة بالرؤوس في المثلث الحاد',
      prompt: p('في مثلث $ABC$ حاد الزوايا، أين يقع $O$ نقطة تلاقي محاور الأضلاع الثلاثة؟'),
      choices: [
        choice('l13-q05-a', 'داخل المثلث'),
        choice('l13-q05-b', 'خارج المثلث في الجهة المقابلة لـ $[BC]$'),
        choice('l13-q05-c', 'في منتصف $[BC]$'),
        choice('l13-q05-d', 'على أحد أضلاع المثلث'),
      ],
      correctChoiceId: 'l13-q05-a',
      explanation: p(
        'في المثلث الحاد الزوايا يقع مركز الدائرة المارّة بالرؤوس داخل المثلث، كما في اللوحة الأولى من لوحات صفحة ٥٥. الخروج إلى الجهة المقابلة لـ $[BC]$ يخصّ المثلث المنفرج في $A$، والوقوع في منتصف $[BC]$ يخصّ المثلث القائم في $A$.',
      ),
    },
    {
      id: 'l13-q06-o-right',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'موضع مركز الدائرة المارّة بالرؤوس في المثلث القائم',
      prompt: p('في مثلث $ABC$ قائم في $A$، أين يقع $O$ مركز الدائرة المارّة بالرؤوس الثلاثة؟'),
      choices: [
        choice('l13-q06-a', 'داخل المثلث'),
        choice('l13-q06-b', 'في منتصف الوتر $[BC]$'),
        choice('l13-q06-c', 'في منتصف الضلع $[AB]$'),
        choice('l13-q06-d', 'خارج المثلث في الجهة المقابلة لـ $A$'),
      ],
      correctChoiceId: 'l13-q06-b',
      explanation: p(
        'لأنّ $OA = OB = OC$، وفي المثلث القائم يكون مركز الدائرة المارّة بالرؤوس منتصفَ الوتر: $OA$ يساوي نصف الوتر أيضًا. وهو ما تُصوّره اللوحة الثالثة من صفحة ٥٥.',
      ),
    },
    {
      id: 'l13-q07-concurrence-reason',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'البرهان على تلاقي المحاور الثلاثة',
      prompt: p(
        'محورا $[AB]$ و$[BC]$ يتقاطعان في $O$. ما الذي يسمح بالقول إنّ $O$ تنتمي أيضًا إلى محور $[AC]$؟',
      ),
      choices: [
        choice(
          'l13-q07-a',
          'لأنّ $O$ من محور $[AB]$ فـ $OA = OB$، ولأنّها من محور $[BC]$ فـ $OB = OC$، ومنه $OA = OC$',
        ),
        choice('l13-q07-b', 'لأنّ $O$ تقع داخل المثلث'),
        choice('l13-q07-c', 'لأنّ $[AC]$ هو أطول أضلاع المثلث'),
        choice('l13-q07-d', 'لأنّ محاور الأضلاع متوازية'),
      ],
      correctChoiceId: 'l13-q07-a',
      explanation: p(
        'هذا هو البرهان المطلوب في الفقرة ② من نشاط الصفحة ٥٤: من المساواتين $OA = OB$ و$OB = OC$ ينتج $OA = OC$، والاتجاه العكسي لخاصّة المحور يعطي أنّ $O$ تنتمي إلى محور $[AC]$.',
      ),
    },
    {
      id: 'l13-q08-compass',
      type: 'numeric',
      origin: 'authored',
      skill: 'شرط فتحة الفرجار في إنشاء محور قطعة',
      prompt: p(
        'لإنشاء محور قطعة $[BC]$ بالفرجار نفتحه بفتحة $r$ ونرسم قوسين مركزاهما $B$ و$C$. إذا كان $BC = 6\\ \\text{cm}$، فما أصغر طول يجب أن تكون الفتحة $r$ أكبر منه (بالسنتيمتر)؟',
      ),
      answer: 3,
      tolerance: 0.01,
      unit: 'cm',
      explanation: p(
        'يلزم أن يتقاطع القوسان، وهذا يتحقّق إذا وفقط إذا كانت الفتحة أكبر من نصف طول القطعة: $3\\ \\text{cm}$. عند الفتحة $3$ بالضبط يكون القوسان متماستين في نقطة واحدة هي منتصف القطعة، فلا نحصل على نقطتين لتعيين المحور.',
      ),
    },
  ],
};
