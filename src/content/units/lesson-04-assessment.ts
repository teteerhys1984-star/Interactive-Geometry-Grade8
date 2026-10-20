import type { AssessmentInput, ContentBlock } from '../schema';

/**
 * ============================================================================
 *  الدرس الرابع — الاختبار النهائي (من إعداد المنصّة)
 * ============================================================================
 *
 *  Twelve platform-written questions. They are NOT printed exercises: the book
 *  prints no assessment for these pages, so every question carries
 *  `origin: 'authored'` and its own teacher-only explanation.
 *
 *  Correctness rules honoured here:
 *    • every multiple-choice question has exactly one defensible answer;
 *    • numeric answers are exact (54, 60) and use tolerance 0;
 *    • no question can be answered from the answer key, because the key is
 *      rendered only inside the Teacher Area.
 * ============================================================================
 */

const p = (text: string): ContentBlock[] => [{ type: 'paragraph', text }];
const choice = (id: string, text: string) => ({ id, blocks: p(text) });

export const lesson04Assessment: AssessmentInput = {
  id: 'lesson-04-final-assessment',
  title: 'الاختبار النهائي — تطابق المثلثات',
  passingScore: 70,
  instructions:
    'أجب عن الأسئلة كلها، ويمكنك تعديل إجاباتك قبل التسليم. لا يظهر التصحيح إلا بعد تسليم الاختبار كاملاً.',
  questions: [
    {
      id: 'l4-q01-identify-sas',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'تمييز حالة ضلعان والزاوية المحصورة',
      prompt: p(
        'في مثلثين: $AB = DE = 5$، و$AC = DF = 7$، و$\\widehat{BAC} = \\widehat{EDF} = 40°$. أي حالة تثبت التطابق؟',
      ),
      choices: [
        choice('l4-q01-a', 'ضلعان والزاوية المحصورة بينهما.'),
        choice('l4-q01-b', 'ضلع وزاويتان مجاورتان له.'),
        choice('l4-q01-c', 'الأضلاع الثلاثة.'),
      ],
      correctChoiceId: 'l4-q01-a',
      explanation: p(
        'الزاوية $\\widehat{BAC}$ محصورة بين $[AB]$ و$[AC]$، والزاوية $\\widehat{EDF}$ محصورة بين $[DE]$ و$[DF]$؛ فالمعطيات هي ضلعان والزاوية المحصورة.',
      ),
    },
    {
      id: 'l4-q02-asa-true',
      type: 'true-false',
      origin: 'authored',
      skill: 'حالة ضلع وزاويتين مجاورتين',
      prompt: p(
        'يتطابق مثلثان إذا تساوى طول ضلع وقياسا الزاويتين المجاورتين له من أحدهما مع مقابلاتها في المثلث الآخر.',
      ),
      answer: true,
      explanation: p('هذه هي الحالة الثانية الواردة في الدرس، بشرط أن تكون الزاويتان مجاورتين للضلع المعلوم.'),
    },
    {
      id: 'l4-q03-correspondence',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'العناصر المتقابلة',
      prompt: p('إذا كان $ABC \\cong DEF$، فأي ضلع يقابل $[AB]$؟'),
      choices: [
        choice('l4-q03-a', '$[DE]$'),
        choice('l4-q03-b', '$[DF]$'),
        choice('l4-q03-c', '$[EF]$'),
      ],
      correctChoiceId: 'l4-q03-a',
      explanation: p('الترتيب $ABC \\cong DEF$ يعني $A \\leftrightarrow D$ و$B \\leftrightarrow E$، فيقابل $[AB]$ الضلع $[DE]$.'),
    },
    {
      id: 'l4-q04-aaa-not-enough',
      type: 'true-false',
      origin: 'authored',
      skill: 'تمييز المعطيات الكافية',
      prompt: p('تساوي قياسات الزوايا الثلاث في مثلثين يكفي دائماً لإثبات تطابقهما.'),
      answer: false,
      explanation: p(
        'تساوي الزوايا يحدّد شكل المثلث لا حجمه؛ فقد يكون أحدهما مكبّراً للآخر، فيكونان متشابهين لا متطابقين.',
      ),
    },
    {
      id: 'l4-q05-included-angle',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'الزاوية المحصورة',
      prompt: p('ما الزاوية المحصورة بين الضلعين $[AB]$ و$[AC]$؟'),
      choices: [
        choice('l4-q05-a', '$\\widehat{BAC}$'),
        choice('l4-q05-b', '$\\widehat{ABC}$'),
        choice('l4-q05-c', '$\\widehat{ACB}$'),
      ],
      correctChoiceId: 'l4-q05-a',
      explanation: p('رأس الزاوية المحصورة بين ضلعين هو نقطة التقائهما المشتركة، وهي هنا $A$.'),
    },
    {
      id: 'l4-q06-third-angle',
      type: 'numeric',
      origin: 'authored',
      skill: 'مجموع زوايا المثلث',
      prompt: p('زاويتان في مثلث قياساهما $44°$ و$82°$. ما قياس الزاوية الثالثة؟'),
      answer: 54,
      tolerance: 0,
      unit: 'درجة',
      explanation: p('$180° - 44° - 82° = 54°$.'),
    },
    {
      id: 'l4-q07-right-hypotenuse-leg',
      type: 'true-false',
      origin: 'authored',
      skill: 'تطابق المثلثين القائمين',
      prompt: p(
        'يتطابق مثلثان قائمان إذا تساوى وتر وضلع قائمة من أحدهما مع وتر وضلع قائمة من الآخر.',
      ),
      answer: true,
      explanation: p('هذه إحدى الحالتين الخاصتين المذكورتين في نهاية الدرس للمثلثين القائمين.'),
    },
    {
      id: 'l4-q08-right-hypotenuse-angle',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'تطابق المثلثين القائمين',
      prompt: p('في مثلثين قائمين، تساوى الوتر وزاوية حادة. ما النتيجة؟'),
      choices: [
        choice('l4-q08-a', 'المثلثان متطابقان.'),
        choice('l4-q08-b', 'لا يمكن أن يتطابقا.'),
        choice('l4-q08-c', 'يتساوى محيطاهما فقط دون تطابق.'),
      ],
      correctChoiceId: 'l4-q08-a',
      explanation: p('هذه الحالة الخاصة الثانية: الوتر وزاوية حادة، وبها يثبت التطابق.'),
    },
    {
      id: 'l4-q09-definition',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'تعريف التطابق',
      prompt: p('ما معنى أن يتطابق مثلثان؟'),
      choices: [
        choice('l4-q09-a', 'تساوي عناصر أحدهما مع العناصر المقابلة لها في المثلث الآخر.'),
        choice('l4-q09-b', 'تساوي مساحتيهما فقط.'),
        choice('l4-q09-c', 'وجود زاوية مشتركة بينهما.'),
      ],
      correctChoiceId: 'l4-q09-a',
      explanation: p('هذا هو تعريف الدرس، وعناصر المثلث هي أضلاعه وزواياه.'),
    },
    {
      id: 'l4-q10-conclusion-isosceles',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'الاستنتاج من التطابق',
      prompt: p(
        'في التمرين ③، أثبتنا أن $MEB \\cong MFC$. أي مساواة تنتج مباشرة من هذا التطابق؟',
      ),
      choices: [
        choice('l4-q10-a', '$ME = MF$'),
        choice('l4-q10-b', '$AB = BC$'),
        choice('l4-q10-c', '$\\widehat{A} = 90°$'),
      ],
      correctChoiceId: 'l4-q10-a',
      explanation: p(
        'التطابق يعطي تساوي العناصر المتقابلة: $M \\leftrightarrow M$ و$E \\leftrightarrow F$، فالضلع $[ME]$ يقابل $[MF]$.',
      ),
    },
    {
      id: 'l4-q11-rectangle-angle',
      type: 'numeric',
      origin: 'authored',
      skill: 'زوايا المستطيل والزوايا المتبادلة',
      prompt: p(
        'في مستطيل $ABCD$، القطر $[BD]$، والزاوية $\\widehat{ADB} = 30°$. ما قياس الزاوية $\\widehat{ABD}$؟',
      ),
      answer: 60,
      tolerance: 0,
      unit: 'درجة',
      explanation: p(
        'الزاوية عند $A$ قائمة، ومجموع زوايا المثلث $ABD$ هو $180°$؛ إذن $\\widehat{ABD} = 180° - 90° - 30° = 60°$.',
      ),
    },
    {
      id: 'l4-q12-why-proof',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'طبيعة البرهان',
      prompt: p('لماذا لا يكفي أن يبدو المثلثان متطابقين في الرسم؟'),
      choices: [
        choice(
          'l4-q12-a',
          'لأن الرسم تخطيطي وقد لا يكون مرسوماً بمقياس، والبرهان يحتاج مساواة مكتوبة ومبرَّرة.',
        ),
        choice('l4-q12-b', 'لأن الرسم لا يُستعمل أبداً في الهندسة.'),
        choice('l4-q12-c', 'لأن التطابق لا يمكن إثباته إلا بالقياس بالأدوات.'),
      ],
      correctChoiceId: 'l4-q12-a',
      explanation: p(
        'الرسم يساعد على قراءة المعطيات وترتيب الرؤوس، لكن الحكم يحتاج مساواة مستندة إلى معطى أو خاصية مثبتة.',
      ),
    },
  ],
};
