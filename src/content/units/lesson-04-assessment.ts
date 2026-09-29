import type { AssessmentInput, ContentBlock } from '../schema';

const prompt = (text: string): ContentBlock[] => [{ type: 'paragraph', text }];
const choice = (id: string, text: string) => ({ id, blocks: prompt(text) });

/** Platform-authored final assessment. Answers are revealed only in Teacher Area. */
export const lesson04Assessment: AssessmentInput = {
  id: 'lesson-04-final-assessment',
  title: 'الاختبار النهائي — تطابق المثلثات',
  instructions:
    'أجب عن الأسئلة كلها، ويمكنك الرجوع إلى أي سؤال قبل التسليم. لن يظهر التصحيح إلا بعد تسليم الاختبار كاملاً.',
  passingScore: 70,
  questions: [
    {
      id: 'l4-q01-elements',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'تعريف التطابق وعناصره',
      prompt: prompt('ما عناصر المثلث التي يُقارن بينها عند الحكم بتطابق مثلثين؟'),
      choices: [
        choice('l4-q01-a', 'أضلاعه وزواياه.'),
        choice('l4-q01-b', 'أضلاعه فقط.'),
        choice('l4-q01-c', 'زواياه فقط.'),
        choice('l4-q01-d', 'مساحته ومحيطه فقط.'),
      ],
      correctChoiceId: 'l4-q01-a',
      explanation: prompt(
        'عناصر المثلث هي أضلاعه وزواياه، ويتطابق مثلثان إذا تساوت عناصر أحدهما مع العناصر المقابلة لها في الآخر.',
      ),
    },
    {
      id: 'l4-q02-included-angle',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'الحالة الأولى',
      prompt: prompt(
        'في الحالة الأولى من حالات التطابق، عُلم تساوي طولي ضلعين من مثلث مع مقابليهما. ما الشرط الذي يجب أن تحققه الزاوية الثالثة المعلومة؟',
      ),
      choices: [
        choice('l4-q02-a', 'أن تكون محصورة بين الضلعين المعلومين.'),
        choice('l4-q02-b', 'أن تكون مقابلة لأحد الضلعين المعلومين.'),
        choice('l4-q02-c', 'أن تكون قائمة دائماً.'),
        choice('l4-q02-d', 'أن تكون أكبر زوايا المثلث.'),
      ],
      correctChoiceId: 'l4-q02-a',
      explanation: prompt(
        'نص الحالة الأولى: تساوي طولي ضلعين وقياس الزاوية المحصورة بينهما مع مقابلاتها. الزاوية غير المحصورة لا تحدد المثلث تحديداً واحداً.',
      ),
    },
    {
      id: 'l4-q03-sss',
      type: 'true-false',
      origin: 'authored',
      skill: 'الحالة الثالثة',
      prompt: prompt(
        'إذا تساوت أطوال أضلاع مثلث مع مقابلاتها في مثلث آخر، فإن المثلثين متطابقان من دون الحاجة إلى معرفة أي زاوية.',
      ),
      answer: true,
      explanation: prompt(
        'هذه هي الحالة الثالثة حرفياً: تساوي أطوال أضلاع أحدهما مع مقابلاتها في المثلث الآخر يكفي وحده للحكم بالتطابق.',
      ),
    },
    {
      id: 'l4-q04-vertical-angles-case',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'تطبيق الحالة الأولى',
      prompt: prompt(
        'تقاطعت القطعتان $[AE]$ و $[BF]$ في النقطة $M$ بحيث $MA = ME$ و $MB = MF$. بأي حالة يتطابق المثلثان $AMB$ و $EMF$؟',
      ),
      choices: [
        choice(
          'l4-q04-a',
          'ضلعان والزاوية المحصورة بينهما، لأن الزاويتين عند $M$ متقابلتان بالرأس.',
        ),
        choice('l4-q04-b', 'ضلع والزاويتان المجاورتان له.'),
        choice('l4-q04-c', 'الأضلاع الثلاثة.'),
        choice('l4-q04-d', 'لا يمكن الحكم بالتطابق من هذه المعطيات.'),
      ],
      correctChoiceId: 'l4-q04-a',
      explanation: prompt(
        'كما في مثال الكتاب صفحة ١٨: الزاويتان عند $M$ متساويتان للتقابل بالرأس وهما محصورتان بين الضلعين المتساويين في كل مثلث، فتنطبق الحالة الأولى.',
      ),
    },
    {
      id: 'l4-q05-corresponding-side',
      type: 'numeric',
      origin: 'authored',
      skill: 'استنتاج عناصر بعد التطابق',
      prompt: prompt(
        'مثلثان متطابقان، طول ضلع في الأول $6\\,cm$. ما طول الضلع المقابل له في المثلث الآخر؟',
      ),
      answer: 6,
      tolerance: 0,
      unit: 'cm',
      explanation: prompt('من التعريف: كل عنصر يساوي مقابله، فالضلع المقابل طوله $6\\,cm$ أيضاً.'),
    },
    {
      id: 'l4-q06-corresponding-angle',
      type: 'numeric',
      origin: 'authored',
      skill: 'استنتاج عناصر بعد التطابق',
      prompt: prompt(
        'مثلثان متطابقان، قياس زاوية في الأول $52$ درجة. ما قياس الزاوية المقابلة لها في المثلث الآخر بالدرجات؟',
      ),
      answer: 52,
      tolerance: 0,
      explanation: prompt(
        'الزوايا المتقابلة في مثلثين متطابقين متساوية، فقياس الزاوية المقابلة $52$ درجة.',
      ),
    },
    {
      id: 'l4-q07-adjacent-angles',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'الحالة الثانية',
      prompt: prompt(
        'في الحالة الثانية من حالات التطابق، عُلم تساوي طول ضلع من مثلث مع مقابله. ما الزاويتان اللتان يجب أن تتساويا مع مقابلتيهما؟',
      ),
      choices: [
        choice('l4-q07-a', 'الزاويتان المجاورتان لهذا الضلع.'),
        choice('l4-q07-b', 'الزاوية المقابلة للضلع وأي زاوية أخرى.'),
        choice('l4-q07-c', 'زاويتان قائمتان.'),
        choice('l4-q07-d', 'الزوايا الثلاث كلها.'),
      ],
      correctChoiceId: 'l4-q07-a',
      explanation: prompt(
        'نص الحالة الثانية: تساوي طول ضلع وقياسي الزاويتين المجاورتين لها مع مقابلاتها في المثلث الآخر.',
      ),
    },
    {
      id: 'l4-q08-correspondence-reading',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'قراءة التقابل',
      prompt: prompt(
        'المثلثان $ABC$ و $DEF$ طبوقان بحيث يقع $A$ على $D$ و $B$ على $E$ و $C$ على $F$. أي زاوية تساوي الزاوية $\\widehat{B}$؟',
      ),
      choices: [
        choice('l4-q08-a', '$\\widehat{E}$'),
        choice('l4-q08-b', '$\\widehat{D}$'),
        choice('l4-q08-c', '$\\widehat{F}$'),
        choice('l4-q08-d', 'لا يمكن تحديدها.'),
      ],
      correctChoiceId: 'l4-q08-a',
      explanation: prompt(
        'الزاوية تقابل الزاوية التي رأسها هو الرأس المقابل؛ وبما أن $B$ يقع على $E$ فإن $\\widehat{B} = \\widehat{E}$.',
      ),
    },
    {
      id: 'l4-q09-right-triangles',
      type: 'true-false',
      origin: 'authored',
      skill: 'تطابق المثلثين القائمين',
      prompt: prompt(
        'يتطابق مثلثان قائمان إذا تساوى وتر وضلع قائمة من أحدهما مع وتر وضلع قائمة من الآخر.',
      ),
      answer: true,
      explanation: prompt(
        'هذه إحدى الحالتين الخاصتين المذكورتين في نهاية الدرس؛ والثانية: تساوي وتر وزاوية حادة من أحدهما مع وتر وزاوية حادة من الآخر.',
      ),
    },
    {
      id: 'l4-q10-insufficient-data',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'تمييز الحالات الكافية',
      prompt: prompt('أي مجموعة من المعطيات الآتية ليست من حالات تطابق المثلثات الواردة في الدرس؟'),
      choices: [
        choice('l4-q10-a', 'تساوي الزوايا الثلاث مع مقابلاتها.'),
        choice('l4-q10-b', 'ضلعان والزاوية المحصورة بينهما مع مقابلاتها.'),
        choice('l4-q10-c', 'ضلع والزاويتان المجاورتان له مع مقابلاتها.'),
        choice('l4-q10-d', 'الأضلاع الثلاثة مع مقابلاتها.'),
      ],
      correctChoiceId: 'l4-q10-a',
      explanation: prompt(
        'حالات الدرس الثلاث كلها تتضمن ضلعاً واحداً على الأقل. تساوي الزوايا الثلاث وحده لا يرد بين الحالات: يمكن لمثلثين مختلفي الحجم أن تتساوى زواياهما من دون أن تتساوى أضلاعهما.',
      ),
    },
    {
      id: 'l4-q11-perimeter',
      type: 'numeric',
      origin: 'authored',
      skill: 'استنتاج قياسات بعد التطابق',
      prompt: prompt('مثلثان متطابقان، محيط الأول $24\\,cm$. ما محيط المثلث الآخر؟'),
      answer: 24,
      tolerance: 0,
      unit: 'cm',
      explanation: prompt(
        'كل ضلع يساوي مقابله، فمجموع الأضلاع — أي المحيط — واحد في المثلثين: $24\\,cm$.',
      ),
    },
    {
      id: 'l4-q12-proof-order',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'كتابة برهان تطابق',
      prompt: prompt('أي ترتيب يصف برهان تطابق سليماً كما في أمثلة الكتاب؟'),
      choices: [
        choice(
          'l4-q12-a',
          'نجمع ثلاث تساويات بين عناصر متقابلة مع أسبابها، ثم نسمّي الحالة الموافقة، ثم نستنتج التطابق.',
        ),
        choice('l4-q12-b', 'نقيس العناصر من الشكل بالمسطرة والمنقلة ثم نعلن التطابق.'),
        choice('l4-q12-c', 'نذكر أن المثلثين متشابهان في الرسم فنستنتج تطابقهما.'),
        choice('l4-q12-d', 'يكفي تساوي عنصر واحد مع مقابله لنستنتج التطابق.'),
      ],
      correctChoiceId: 'l4-q12-a',
      explanation: prompt(
        'البرهان سلسلة استنتاجات معللة: ثلاث تساويات متقابلة بأسبابها، ثم تسمية الحالة، ثم النتيجة — ولا يجوز الاستنتاج من الشكل وحده.',
      ),
    },
  ],
};
