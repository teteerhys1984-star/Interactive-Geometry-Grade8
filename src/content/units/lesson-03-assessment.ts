import type { AssessmentInput, ContentBlock } from '../schema';

const prompt = (text: string): ContentBlock[] => [{ type: 'paragraph', text }];
const choice = (id: string, text: string) => ({ id, blocks: prompt(text) });

/** Platform-authored final assessment. Answers are revealed only in Teacher Area. */
export const lesson03Assessment: AssessmentInput = {
  id: 'lesson-03-final-assessment',
  title: 'الاختبار النهائي — صورة شكل وفق انسحاب',
  instructions:
    'أجب عن الأسئلة كلها، ويمكنك الرجوع إلى أي سؤال قبل التسليم. لن يظهر التصحيح إلا بعد تسليم الاختبار كاملاً.',
  passingScore: 70,
  questions: [
    {
      id: 'l3-q01-line-image',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'صورة مستقيم',
      prompt: prompt("ما العلاقة العامة بين مستقيم $(d)$ وصورته $(d')$ وفق انسحاب؟"),
      choices: [
        choice('l3-q01-a', 'متوازيان، وقد ينطبقان في الحالة الخاصة.'),
        choice('l3-q01-b', 'متعامدان دائماً.'),
        choice('l3-q01-c', 'متقاطعان دائماً.'),
        choice('l3-q01-d', 'لا توجد علاقة ثابتة بينهما.'),
      ],
      correctChoiceId: 'l3-q01-a',
      explanation: prompt(
        'صورة المستقيم وفق انسحاب مستقيم يوازيه. وإذا كان اتجاه الانسحاب موازياً للمستقيم فإن الصورة تنطبق على الأصل.',
      ),
    },
    {
      id: 'l3-q02-coincident-case',
      type: 'true-false',
      origin: 'authored',
      skill: 'الحالة الخاصة للمستقيم',
      prompt: prompt(
        'إذا كان المستقيم $(r)$ موازياً لاتجاه الانسحاب، فإن صورة $(r)$ تنطبق على $(r)$.',
      ),
      answer: true,
      explanation: prompt(
        'كل نقطة من المستقيم تنتقل إلى نقطة أخرى على المستقيم نفسه، ولذلك يكون المستقيم هو صورته.',
      ),
    },
    {
      id: 'l3-q03-segment-length',
      type: 'numeric',
      origin: 'authored',
      skill: 'المحافظة على الأطوال',
      prompt: prompt("طول القطعة $[KL]$ يساوي $7.5\\,cm$. ما طول صورتها $[K'L']$ وفق انسحاب؟"),
      answer: 7.5,
      tolerance: 0,
      unit: 'cm',
      explanation: prompt('الانسحاب يحافظ على الأطوال، لذلك طول القطعة وصورتها متساويان.'),
    },
    {
      id: 'l3-q04-circle-image',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'صورة دائرة',
      prompt: prompt(
        "دائرة مركزها $O$ ونصف قطرها $4\\,cm$. إذا كانت $O'$ صورة $O$، فأي وصف يحدد صورة الدائرة؟",
      ),
      choices: [
        choice('l3-q04-a', "دائرة مركزها $O'$ ونصف قطرها $4\\,cm$."),
        choice('l3-q04-b', 'دائرة مركزها $O$ ونصف قطرها $8\\,cm$.'),
        choice('l3-q04-c', "دائرة مركزها $O'$ ونصف قطرها $2\\,cm$."),
        choice('l3-q04-d', 'قطع ناقص مركزه صورة المركز.'),
      ],
      correctChoiceId: 'l3-q04-a',
      explanation: prompt(
        'ينتقل المركز إلى صورته ويبقى نصف القطر ثابتاً، لأن الانسحاب يحافظ على الأطوال.',
      ),
    },
    {
      id: 'l3-q05-perpendicular-lines',
      type: 'true-false',
      origin: 'authored',
      skill: 'المحافظة على التعامد',
      prompt: prompt('يمكن أن تصبح صورة مستقيمين متعامدين مستقيمين غير متعامدين بعد انسحاب.'),
      answer: false,
      explanation: prompt('الانسحاب يحافظ على قياس الزوايا، فتحافظ الزاوية القائمة على قياسها.'),
    },
    {
      id: 'l3-q06-point-image-coordinates',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'تطبيق الحركة نفسها',
      prompt: prompt(
        "في شبكة من إعداد المنصّة، ينقل الانسحاب كل نقطة ثلاث وحدات يميناً ووحدتين إلى الأعلى. إذا كانت $P=(1,4)$، فما $P'$؟",
      ),
      choices: [
        choice('l3-q06-a', "$P'=(4,6)$"),
        choice('l3-q06-b', "$P'=(4,2)$"),
        choice('l3-q06-c', "$P'=(-2,6)$"),
        choice('l3-q06-d', "$P'=(3,2)$"),
      ],
      correctChoiceId: 'l3-q06-a',
      explanation: prompt(
        'نضيف ثلاثاً إلى الإحداثي الأول واثنتين إلى الإحداثي الثاني، فنحصل على $(4,6)$.',
      ),
    },
    {
      id: 'l3-q07-find-translation',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'استخراج الانسحاب',
      prompt: prompt(
        "انتقلت النقطة $A=(2,5)$ إلى $A'=(6,3)$. ما الحركة التي يجب تطبيقها على بقية رؤوس الشكل؟",
      ),
      choices: [
        choice('l3-q07-a', 'أربع وحدات يميناً ووحدتان إلى الأسفل.'),
        choice('l3-q07-b', 'أربع وحدات يساراً ووحدتان إلى الأعلى.'),
        choice('l3-q07-c', 'ست وحدات يميناً وثلاث وحدات إلى الأسفل.'),
        choice('l3-q07-d', 'وحدتان يميناً وأربع وحدات إلى الأسفل.'),
      ],
      correctChoiceId: 'l3-q07-a',
      explanation: prompt(
        'الفرق في الإحداثي الأفقي يساوي $6-2=4$، والفرق في الشاقولي يساوي $3-5=-2$.',
      ),
    },
    {
      id: 'l3-q08-error-detection',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'كشف خطأ',
      prompt: prompt(
        "نقل طالب رؤوس مثلث بالحركة نفسها، لكنه وصل $A'$ بـ $C'$ ثم $C'$ بـ $B'$ ثم $B'$ بـ $A'$. ما الخطأ؟",
      ),
      choices: [
        choice('l3-q08-a', 'لم يحافظ على ترتيب وصل الرؤوس.'),
        choice('l3-q08-b', 'كان يجب تغيير طول أحد الأضلاع.'),
        choice('l3-q08-c', 'كان يجب تدوير الصورة.'),
        choice('l3-q08-d', 'لا يوجد خطأ.'),
      ],
      correctChoiceId: 'l3-q08-a',
      explanation: prompt(
        'بعد نقل الرؤوس يجب وصل صورها بالترتيب الموافق للأصل، وإلا تغيّرت الأضلاع التي تكوّن الشكل.',
      ),
    },
    {
      id: 'l3-q09-square-properties',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'صورة مضلّع',
      prompt: prompt('أي عبارة تصف صورة مربع وفق انسحاب؟'),
      choices: [
        choice('l3-q09-a', 'مربع مطابق له، أضلاعه المتماثلة متوازية ومتساوية.'),
        choice('l3-q09-b', 'مستطيل أطول منه دائماً.'),
        choice('l3-q09-c', 'مربع مدوّر بزاوية قائمة.'),
        choice('l3-q09-d', 'شكل له المساحة نفسها وقد تتغيّر زواياه.'),
      ],
      correctChoiceId: 'l3-q09-a',
      explanation: prompt(
        'الانسحاب يحافظ على الأطوال والزوايا والتوازي، فتكون صورة المربع مربعاً مطابقاً له من دون دوران.',
      ),
    },
    {
      id: 'l3-q10-ray-direction',
      type: 'true-false',
      origin: 'authored',
      skill: 'صورة نصف مستقيم',
      prompt: prompt('صورة نصف المستقيم نصف مستقيم موازٍ له وله الاتجاه نفسه.'),
      answer: true,
      explanation: prompt(
        'ينتقل المبدأ إلى صورته، وتنتقل نقطة أخرى من نصف المستقيم بالحركة نفسها، فيُحفظ الاتجاه.',
      ),
    },
    {
      id: 'l3-q11-perimeter',
      type: 'numeric',
      origin: 'authored',
      skill: 'المحافظة على القياسات',
      prompt: prompt('محيط مستطيل يساوي $18\\,cm$. ما محيط صورته وفق انسحاب؟'),
      answer: 18,
      tolerance: 0,
      unit: 'cm',
      explanation: prompt('تبقى أطوال الأضلاع كلها ثابتة، لذلك يبقى مجموعها، أي المحيط، ثابتاً.'),
    },
    {
      id: 'l3-q12-construction-order',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'خطوات الإنشاء',
      prompt: prompt('أي ترتيب يصلح لرسم صورة مضلّع وفق انسحاب؟'),
      choices: [
        choice('l3-q12-a', 'نرسم صور الرؤوس بالحركة نفسها، ثم نصلها بالترتيب الموافق للأصل.'),
        choice('l3-q12-b', 'نصل رؤوساً جديدة أولاً، ثم نختار انسحاباً يناسبها.'),
        choice('l3-q12-c', 'نرسم صورة رأس واحد، ثم ندوّر الشكل حوله.'),
        choice('l3-q12-d', 'نغيّر طول كل ضلع بحسب موضعه.'),
      ],
      correctChoiceId: 'l3-q12-a',
      explanation: prompt(
        'الشكل مجموعة نقاط؛ لذلك نبدأ بصور نقاطه المميّزة وفق انسحاب واحد، ثم نعيد بناء الأضلاع بالترتيب نفسه.',
      ),
    },
  ],
};
