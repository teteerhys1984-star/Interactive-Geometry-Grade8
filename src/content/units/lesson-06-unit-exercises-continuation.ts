import type { ContentBlock, LessonInput, LessonStepInput, SourceRef } from '../schema';
import { buildLesson06TeacherResources } from './lesson-06-teacher';

export interface ReasoningChoice {
  id: string;
  label: string;
}

export interface ReasoningTask {
  id: string;
  prompt: string;
  choices: ReasoningChoice[];
  answer: string;
}

interface FigureRecord {
  id: string;
  scenario?: string;
  alt: string;
  caption: string;
  type: 'reference' | 'reconstructed';
  reason?: string;
}

export interface ContinuationExercise {
  number: number;
  title: string;
  prompt: string;
  /** Atomic printed instructions/cases, used only for coverage reporting. */
  printedTaskCount: number;
  source: SourceRef;
  sourceFigure?: FigureRecord;
  sourceExtras?: ContentBlock[];
  given: string;
  required: string;
  start: string;
  rule: string;
  why: string;
  steps: string[];
  result: string;
  verify: string;
  warning: string;
  activityTitle: string;
  tasks: ReasoningTask[];
  authoredFigure?: Omit<FigureRecord, 'type' | 'reason'>;
}

const choices = (...labels: string[]): ReasoningChoice[] =>
  labels.map((label, index) => ({ id: `choice-${index + 1}`, label }));

const answer = (index: number) => `choice-${index}`;
const source = (number: number): SourceRef => ({
  page: `صورة المصدر — السؤال ${number}`,
  locator: `تمرينات الوحدة الأولى — السؤال ${number}`,
});

/**
 * Canonical, source-first records for Questions 3–15. Every printed question is
 * kept in one `prompt` string so its wording, branch numbering and order cannot
 * drift between the learner flow and the Teacher Area.
 */
export const lesson06Exercises: ContinuationExercise[] = [
  {
    number: 3,
    printedTaskCount: 2,
    title: 'تطابق مثلثين حول منصف زاوية',
    source: source(3),
    prompt:
      'في الشكل المجاور، $\\widehat{xAz}=\\widehat{yAz}$.\n1. أثبت أنّ المثلثين $ABM$، $AMC$ طبوقان.\n2. استنتج أنّ $CM=MB$.',
    sourceFigure: {
      id: 'fig-ex6-q3-angle-bisector',
      type: 'reference',
      alt: 'شكل عند الرأس $A$ فيه الشعاع $Ax$ أفقي، والشعاع $Ay$ مائل إلى أعلى، والشعاع $Az$ بينهما. تقع $B$ على $Ax$ و$C$ على $Ay$ و$M$ على $Az$، مع $BM \\perp Ax$ و$CM \\perp Ay$.',
      caption: 'الشكل المطبوع للسؤال 3.',
      reason:
        'العلاقات وعلامتا الزاوية القائمة واضحتان، لكن مواضع النقاط وقياسات الزوايا غير معطاة عددياً؛ لذلك لا تُخمن إحداثيات لإعادة الرسم.',
    },
    given:
      '$\\widehat{xAz}=\\widehat{yAz}$، و$BM \\perp AB$، و$CM \\perp AC$، والقطعة $AM$ مشتركة بين المثلثين.',
    required: 'إثبات تطابق المثلثين، ثم استنتاج مساواة الضلعين $CM$ و$MB$.',
    start: 'حدّد أولاً الزاويتين القائمتين، ثم ابحث عن ضلع مشترك وزاويتين متساويتين.',
    rule: 'يتطابق مثلثان قائمان إذا تساوى الوتر وزاوية حادة متناظرة فيهما؛ ويمكن أيضاً استعمال معيار زاويتين وضلع متناظر.',
    why: 'القطعة $AM$ وتر في كل من المثلثين القائمين، والزاويتان عند $A$ متساويتان بالمعطى، والزاويتان عند $B$ و$C$ قائمتان.',
    steps: [
      '$\\widehat{ABM}=\\widehat{ACM}=90^\\circ$ لأن علامتي الزاوية القائمة ظاهرتان في الشكل.',
      '$\\widehat{BAM}=\\widehat{MAC}$ لأن $AM$ يقع على الشعاع $Az$، وهذا هو معطى السؤال.',
      '$AM=AM$ لأنه ضلع مشترك، وهو الوتر في كلا المثلثين القائمين.',
      'إذن المثلثان $ABM$ و$ACM$ طبوقان، والتناظر هو $A \\leftrightarrow A$ و$B \\leftrightarrow C$ و$M \\leftrightarrow M$.',
      'الأضلاع المتناظرة في مثلثين طبوقين متساوية، فينتج $MB=CM$.',
    ],
    result: 'المثلثان طبوقان، ومنه $CM=MB$.',
    verify: 'تحقّق من التناظر قبل نقل النتيجة: الرأس القائم $B$ يقابل الرأس القائم $C$.',
    warning:
      'لا يكفي أن يبدو المثلثان متشابهين في الرسم؛ يجب ذكر الزاويتين القائمتين والوتر المشترك.',
    activityTitle: 'ابنِ حجة التطابق',
    tasks: [
      {
        id: 'criterion',
        prompt: 'أي مجموعة معطيات تبدأ بها برهان التطابق؟',
        choices: choices(
          'وتر مشترك وزاويتان متناظرتان متساويتان',
          'تشابه الشكلين في الرسم فقط',
          'تساوي $AB$ و$AC$ من دون معطى',
        ),
        answer: answer(1),
      },
      {
        id: 'correspondence',
        prompt: 'ما التناظر الذي يقود إلى المطلوب؟',
        choices: choices(
          '$B \\leftrightarrow C$',
          '$B \\leftrightarrow M$',
          '$A \\leftrightarrow C$',
        ),
        answer: answer(1),
      },
    ],
  },
  {
    number: 4,
    printedTaskCount: 2,
    title: 'إكمال متوازي الأضلاع',
    source: source(4),
    prompt:
      'في كلٍّ من الشكلين ① و ② ثلاث نقاط $A$ و $B$ و $C$.\nانقل الشكل إلى صفحة بيضاء وأكمل في كل حالة متوازي الأضلاع $ABCD$.',
    sourceFigure: {
      id: 'fig-ex6-q4-three-points',
      type: 'reference',
      alt: 'مستطيلان مرقمان ① و②، في كل منهما ثلاث نقاط مسماة $A$ و$B$ و$C$ في مواضع مختلفة لإكمال متوازي الأضلاع $ABCD$.',
      caption: 'الحالتان المطبوعتان ① و② في السؤال 4.',
      reason:
        'لا توجد شبكة أو قياسات تضبط إحداثيات النقاط الثلاث في أي من الحالتين، ومواقعها هي مادة نشاط الإنشاء نفسه.',
    },
    given: 'ثلاث نقاط $A$ و$B$ و$C$ في كل حالة، وترتيب الرؤوس المطلوب هو $A,B,C,D$.',
    required: 'إنشاء الرأس الرابع $D$ في كل من الحالتين ① و②.',
    start: 'في الترتيب $ABCD$ يكون $AB$ مقابلاً لـ$CD$، ويكون $BC$ مقابلاً لـ$AD$.',
    rule: 'الضلعان المتقابلان في متوازي الأضلاع متوازيان.',
    why: 'إذا تقاطع المستقيم المار بـ$A$ والموازي لـ$BC$ مع المستقيم المار بـ$C$ والموازي لـ$AB$، تحقق زوجا التوازي المطلوبان.',
    steps: [
      'في الحالة ①، ارسم من $A$ مستقيماً يوازي $(BC)$.',
      'ارسم من $C$ مستقيماً يوازي $(AB)$، وسمّ نقطة التقاطع $D$.',
      'أعد الإنشاء نفسه في الحالة ② مع المحافظة على ترتيب $A,B,C,D$.',
      'يكون $AD \\parallel BC$ و$CD \\parallel AB$، ولذلك $ABCD$ متوازي أضلاع في كل حالة.',
    ],
    result: 'النقطة $D$ هي تقاطع موازي $(BC)$ المار بـ$A$ وموازي $(AB)$ المار بـ$C$.',
    verify: 'افحص زوجي الأضلاع المتقابلة، لا طول ضلع واحد فقط.',
    warning: 'قد ينتج متوازي أضلاع آخر إذا غُيّر ترتيب الرؤوس؛ المطلوب تحديداً هو الترتيب $ABCD$.',
    activityTitle: 'اختر خطّي الإنشاء',
    tasks: [
      {
        id: 'through-a',
        prompt: 'أي مستقيم يجب رسمه من $A$؟',
        choices: choices('موازٍ لـ$(BC)$', 'موازٍ لـ$(AB)$', 'عمودي على $(BC)$'),
        answer: answer(1),
      },
      {
        id: 'through-c',
        prompt: 'أي مستقيم يجب رسمه من $C$؟',
        choices: choices('موازٍ لـ$(AB)$', 'موازٍ لـ$(BC)$', 'المستقيم $(AC)$ نفسه'),
        answer: answer(1),
      },
    ],
  },
  {
    number: 5,
    printedTaskCount: 2,
    title: 'التناظر المركزي ومتوازي الأضلاع',
    source: source(5),
    prompt:
      '$AOB$ مثلث متساوي الساقين في $O$. والنقطتان $C$ و $D$ هما نظيرتا $A$ و $B$ على التوالي.\n1. ارسم شكلاً يحقق معطيات المسألة.\n2. أثبت أنّ الرباعي $ABCD$ هو متوازي أضلاع.',
    sourceExtras: [
      {
        type: 'callout',
        variant: 'hint',
        blocks: [
          {
            type: 'paragraph',
            text: 'نقول إنّ المثلث $AOB$ متساوي الساقين في $O$، عندما تكون $O$ نقطة تقاطع ضلعيه المتساويين.',
          },
        ],
      },
    ],
    given: '$OA=OB$، و$C$ نظيرة $A$ بالنسبة إلى $O$، و$D$ نظيرة $B$ بالنسبة إلى $O$.',
    required: 'رسم شكل موافق للمعطيات، ثم إثبات أن $ABCD$ متوازي أضلاع.',
    start: 'حوّل معنى التناظر المركزي إلى عبارتين عن المنتصف.',
    rule: 'إذا تناصف قطرا رباعي، كان الرباعي متوازي أضلاع.',
    why: 'كون $C$ نظيرة $A$ يجعل $O$ منتصف $[AC]$، وكون $D$ نظيرة $B$ يجعل $O$ منتصف $[BD]$.',
    steps: [
      'ارسم ساقي المثلث بحيث $OA=OB$.',
      'على المستقيم $(AO)$ ضع $C$ في الجهة المقابلة لـ$A$ بحيث $OC=OA$.',
      'على المستقيم $(BO)$ ضع $D$ في الجهة المقابلة لـ$B$ بحيث $OD=OB$.',
      'إذن $O$ منتصف كل من القطرين $[AC]$ و$[BD]$.',
      'قطرا الرباعي $ABCD$ يتناصفان، ولذلك $ABCD$ متوازي أضلاع.',
    ],
    result: 'الرباعي $ABCD$ متوازي أضلاع لأن قطريه $[AC]$ و$[BD]$ يتناصفان في $O$.',
    verify: 'تتبّع ترتيب الرؤوس حول الرباعي وتأكد أن القطعتين $[AC]$ و$[BD]$ هما قطراه.',
    warning: 'تساوي $OA$ و$OB$ وحده لا يثبت متوازي الأضلاع؛ الحجة الحاسمة هي أن $O$ منتصف القطرين.',
    activityTitle: 'حوّل التناظر إلى خاصية أقطار',
    tasks: [
      {
        id: 'c-symmetry',
        prompt: 'ماذا يعني أن $C$ نظيرة $A$ بالنسبة إلى $O$؟',
        choices: choices('$O$ منتصف $[AC]$', '$A$ منتصف $[OC]$', '$AC \\perp OB$'),
        answer: answer(1),
      },
      {
        id: 'd-symmetry',
        prompt: 'ماذا يعني أن $D$ نظيرة $B$ بالنسبة إلى $O$؟',
        choices: choices('$O$ منتصف $[BD]$', '$B$ منتصف $[OD]$', '$BD \\parallel AC$ فقط'),
        answer: answer(1),
      },
      {
        id: 'property',
        prompt: 'ما الخاصية التي تحسم البرهان؟',
        choices: choices(
          'قطرا الرباعي يتناصفان',
          'للرباعي ضلعان متساويان فقط',
          'للمثلث ضلعان متساويان',
        ),
        answer: answer(1),
      },
    ],
    authoredFigure: {
      id: 'auth-ex6-q5-central-symmetry',
      scenario: 'q5-central-symmetry',
      alt: 'شكل تعليمي يوضح الرباعي $ABCD$ وقطريه $AC$ و$BD$ المتناصفين في $O$.',
      caption: 'شكل تعليمي من إعداد المنصّة — ليس شكلاً من الكتاب.',
    },
  },
  {
    number: 6,
    printedTaskCount: 4,
    title: 'تكرار الانسحاب على شبكة',
    source: source(6),
    prompt:
      'تأمّل الشكل المرسوم جانباً:\n1. انقل هذا الشكل إلى صفحة سنتمترية.\n2. ارسم صورة الشكل ① ولتكن الشكل ② وفق الانسحاب الذي ينقل $A$ إلى $C$.\n3. استعمل الانسحاب ذاته لرسم صورة الشكل ② وارمز لهذه الصورة بالرمز ③.\n4. ممّ تكون قد تحققت؟',
    sourceFigure: {
      id: 'fig-ex6-q6-grid-shape',
      type: 'reconstructed',
      scenario: 'q6-source-grid',
      alt: 'شبكة من ثمانية أعمدة وخمسة صفوف، عليها شكل ① أصفر من خمس مربعات وحدة، والنقطة $A$ عند العقدة السابعة من اليسار في الصف الأول، والنقطة $C$ عند العقدة الرابعة من اليسار في الصف الرابع.',
      caption: 'إعادة بناء الشكل المطبوع على عقد ومربعات الشبكة الظاهرة بوضوح.',
    },
    given: 'شكل ① على شبكة، ومتجه الانسحاب محدد بالنقطتين $A$ و$C$.',
    required: 'رسم الشكلين ② و③ باستعمال الانسحاب نفسه، ثم وصف ما تم التحقق منه.',
    start: 'عدّ الانتقال من $A$ إلى $C$ أفقياً وعمودياً، وطبّقه على كل رأس من رؤوس الشكل.',
    rule: 'في الانسحاب تنتقل كل نقطة بالاتجاه نفسه والمسافة نفسها، وتكرار الانسحاب يعني جمع متجه الحركة بنفسه.',
    why: 'الشكل لا ينتقل كوحدة بالتخمين؛ صور رؤوسه كلها تحدد الصورة بدقة.',
    steps: [
      'من $A$ إلى $C$ نتحرك ثلاث خانات إلى اليسار وثلاث خانات إلى الأسفل على الرسم.',
      'انقل كل رأس من الشكل ① بالحركة نفسها، ثم صِل الصور بالترتيب لتحصل على الشكل ②.',
      'كرر الحركة نفسها لكل رأس من الشكل ② لتحصل على الشكل ③.',
      'كل من ② و③ مطابق للشكل السابق له ويحافظ على الاتجاه والمساحة.',
      'الانتقال المباشر من ① إلى ③ يساوي تطبيق متجه $\\overrightarrow{AC}$ مرتين.',
    ],
    result:
      'تحققنا عملياً من ثبات الشكل والقياس والاتجاه، ومن أن تكرار الانسحاب يجمع الحركة نفسها مرتين.',
    verify:
      'اختر رأساً واحداً في الأشكال الثلاثة؛ يجب أن تكون الإزاحتان المتتاليتان متوازيتين ومتساويتين.',
    warning:
      'لا تنقل بعض المربعات اعتماداً على شكلها العام؛ انقل الرؤوس أو المربعات كلها بعدّ الشبكة.',
    activityTitle: 'حلّل حركة الشبكة قبل الرسم',
    tasks: [
      {
        id: 'vector',
        prompt: 'ما حركة $A \\mapsto C$ على الشبكة؟',
        choices: choices(
          '3 يساراً و3 إلى الأسفل',
          '3 يميناً و3 إلى الأعلى',
          '4 يساراً و3 إلى الأسفل',
        ),
        answer: answer(1),
      },
      {
        id: 'repeat',
        prompt: 'كيف نحصل على الشكل ③؟',
        choices: choices('نطبق الحركة نفسها على ②', 'نعكس ② حول $C$', 'ندير ② ربع دورة'),
        answer: answer(1),
      },
      {
        id: 'invariant',
        prompt: 'ما الذي يبقى محفوظاً بعد المرتين؟',
        choices: choices('الشكل والقياس والاتجاه', 'الموضع فقط', 'اللون وحده'),
        answer: answer(1),
      },
    ],
  },
  {
    number: 7,
    printedTaskCount: 3,
    title: 'إحداثيا صورة نقطة',
    source: source(7),
    prompt:
      'في معلم متجانس:\n1. وضّع النقاط $A(-2,0)$ و $B(2,3)$ و $M(4,1)$.\n2. وضّع صورة النقطة $M$ واكتب إحداثييها:\n① وفق الانسحاب الذي ينقل $A$ إلى $B$.\n② وفق الانسحاب الذي ينقل $B$ إلى $A$.',
    given: '$A(-2,0)$ و$B(2,3)$ و$M(4,1)$.',
    required: 'إيجاد إحداثيي صورة $M$ وفق انسحابين متعاكسين.',
    start: 'اطرح إحداثيي نقطة البداية من إحداثيي نقطة النهاية لتجد مركبتي كل انسحاب.',
    rule: 'إذا كان متجه الانسحاب $(u,v)$ فإن صورة $(x,y)$ هي $(x+u,y+v)$.',
    why: 'الفرق بين إحداثيي النقطتين يصف الحركة الأفقية والعمودية نفسها التي تطبق على $M$.',
    steps: [
      '$\\overrightarrow{AB}=(2-(-2),3-0)=(4,3)$.',
      'صورة $M$ وفق $A \\mapsto B$ هي $(4+4,1+3)=(8,4)$.',
      '$\\overrightarrow{BA}=(-2-2,0-3)=(-4,-3)$.',
      'صورة $M$ وفق $B \\mapsto A$ هي $(4-4,1-3)=(0,-2)$.',
    ],
    result: 'في ① الصورة هي $(8,4)$، وفي ② الصورة هي $(0,-2)$.',
    verify: 'المتجهان متعاكسان؛ لذلك متوسط إحداثيي الصورتين يساوي إحداثيي $M$.',
    warning:
      'لا تخلط بين $\\overrightarrow{AB}$ و$\\overrightarrow{BA}$؛ تبديل البداية والنهاية يغيّر إشارة المركبتين.',
    activityTitle: 'احسب المتجه ثم الصورة',
    tasks: [
      {
        id: 'ab-image',
        prompt: 'ما صورة $M$ وفق الانسحاب $A \\mapsto B$؟',
        choices: choices('$(8,4)$', '$(0,-2)$', '$(6,4)$'),
        answer: answer(1),
      },
      {
        id: 'ba-image',
        prompt: 'ما صورة $M$ وفق الانسحاب $B \\mapsto A$؟',
        choices: choices('$(0,-2)$', '$(8,4)$', '$(-2,0)$'),
        answer: answer(1),
      },
    ],
    authoredFigure: {
      id: 'auth-ex6-q7-coordinate-images',
      scenario: 'q7-coordinate-images',
      alt: 'معلم تعليمي يوضح النقاط $A(-2,0)$ و$B(2,3)$ و$M(4,1)$ وصورتي $M$ الناتجتين عن المتجهين المتعاكسين.',
      caption: 'تحقق بصري من إعداد المنصّة — ليس شكلاً مطبوعاً في السؤال.',
    },
  },
  {
    number: 8,
    printedTaskCount: 3,
    title: 'مستطيل من صورة نقطة',
    source: source(8),
    prompt:
      '$REC$ مثلث قائم الزاوية في $R$.\nالنقطة $A$ هي صورة $E$ وفق الانسحاب الذي ينقل $R$ إلى $C$.\n1. ارسم شكلاً متّفقاً مع معطيات المسألة.\n2. ما طبيعة الرباعي $REAC$؟ اشرح إجابتك.\n3. وازن بين طولي $[EC]$ و $[RA]$. اشرح إجابتك.',
    given: '$RE \\perp RC$، والانسحاب نفسه يحقق $R \\mapsto C$ و$E \\mapsto A$.',
    required: 'تحديد طبيعة $REAC$، ثم مقارنة طولي قطريه $[EC]$ و$[RA]$.',
    start: 'اكتب زوجي الصور، ثم استنتج زوجي الأضلاع المتوازية في الرباعي.',
    rule: 'انسحاب نقطتين يولد متوازي أضلاع، ومتوازي الأضلاع ذو الزاوية القائمة مستطيل، وقطرا المستطيل متساويان.',
    why: '$\\overrightarrow{RC}=\\overrightarrow{EA}$، كما يحافظ الانسحاب على اتجاه $RE$ فيكون $RE \\parallel CA$.',
    steps: [
      'بما أن $R \\mapsto C$ و$E \\mapsto A$، فإن $RC \\parallel EA$ و$RC=EA$.',
      'صورة القطعة $[RE]$ هي $[CA]$، ومنه $RE \\parallel CA$ و$RE=CA$.',
      'إذن $REAC$ متوازي أضلاع.',
      'الزاوية عند $R$ قائمة لأن المثلث $REC$ قائم في $R$، فمتوازي الأضلاع مستطيل.',
      '$[EC]$ و$[RA]$ قطرا المستطيل، وقطرا المستطيل متساويان.',
    ],
    result: '$REAC$ مستطيل، و$EC=RA$.',
    verify: 'ترتيب $R,E,A,C$ يعطي الضلعين $RE$ و$AC$ متقابلين، والضلعين $EA$ و$CR$ متقابلين.',
    warning: 'لا تتوقف عند «متوازي أضلاع»؛ الزاوية القائمة المعطاة ترفع النتيجة إلى مستطيل.',
    activityTitle: 'اربط الصورة بنوع الرباعي',
    tasks: [
      {
        id: 'quadrilateral',
        prompt: 'ما الوصف الأدق للرباعي $REAC$؟',
        choices: choices('مستطيل', 'متوازي أضلاع غير محدد فقط', 'معيّن بالضرورة'),
        answer: answer(1),
      },
      {
        id: 'diagonals',
        prompt: 'ما العلاقة بين $EC$ و$RA$؟',
        choices: choices('$EC=RA$', '$EC>RA$', '$EC<RA$'),
        answer: answer(1),
      },
    ],
    authoredFigure: {
      id: 'auth-ex6-q8-rectangle-proof',
      scenario: 'q8-rectangle-proof',
      alt: 'مستطيل تعليمي رؤوسه بالترتيب $R,E,A,C$ مع قطريه $EC$ و$RA$.',
      caption: 'شكل استنتاجي من إعداد المنصّة — ليس شكلاً مطبوعاً في السؤال.',
    },
  },
  {
    number: 9,
    printedTaskCount: 6,
    title: 'صورة مستقيم في ست حالات',
    source: source(9),
    prompt:
      'ارسم، في كلّ حالة، صورة المستقيم $(d)$ وفق الانسحاب الذي ينقل النقطة $A$ إلى النقطة $B$.',
    sourceFigure: {
      id: 'fig-ex6-q9-six-lines',
      type: 'reference',
      alt: 'ست حالات مرتبة في صفين مرقمين (1) و(2)، وفي كل صف الحالات ① و② و③؛ تعرض كل حالة مستقيماً أحمر $(d)$ والنقطتين $A$ و$B$ في أوضاع مختلفة.',
      caption: 'الحالات الست المرسومة في السؤال 9.',
      reason:
        'لا توجد شبكة أو قياسات تضبط ميول المستقيمات ومواضع النقطتين، وإعادة رسمها تقريبياً قد تغير حالة الانتماء أو التوازي التي يبنى عليها الإنشاء.',
    },
    given: 'في كل حالة مستقيم $(d)$ ومتجه انسحاب محدد من $A$ إلى $B$.',
    required: 'إنشاء صورة $(d)$ في الحالات الست مع مراعاة الحالات الخاصة.',
    start: 'اسأل في كل رسم: هل $A$ تنتمي إلى $(d)$؟ وهل اتجاه $AB$ موازٍ للمستقيم؟',
    rule: 'صورة مستقيم وفق انسحاب مستقيم يوازيه؛ وينطبق المستقيمان إذا كان متجه الانسحاب موازياً للمستقيم.',
    why: 'تكفي صورتا نقطتين من $(d)$ لتحديد مستقيم الصورة، ويمكن اختصار الإنشاء إذا عُرفت صورة نقطة تنتمي إلى المستقيم.',
    steps: [
      'في (1)-①، اتجاه $AB$ موازٍ لـ$(d)$، لذلك تنطبق صورة $(d)$ على $(d)$.',
      'في (1)-②، لا تبدأ الحركة من نقطة معلومة على $(d)$؛ اختر نقطتين من $(d)$ وانقلهما بالمتجه $\\overrightarrow{AB}$ ثم صِل صورتيهما.',
      'في (1)-③، النقطة $A$ على $(d)$ وصورتها $B$؛ ارسم من $B$ مستقيماً موازياً لـ$(d)$.',
      'في (2)-①، وجود $B$ على $(d)$ لا يجعلها صورة نقطة من $(d)$؛ استعمل طريقة نقل نقطتين.',
      'في (2)-②، تقاطع القطعة $[AB]$ مع $(d)$ لا يحدد صورة نقطة مسماة؛ انقل نقطتين من $(d)$.',
      'في (2)-③، انقل نقطتين من $(d)$ بالمتجه نفسه ثم ارسم المستقيم المار بصورتيهما.',
    ],
    result: 'في كل حالة تكون الصورة موازية لـ$(d)$ أو منطبقة عليه في الحالة الموازية الخاصة.',
    verify:
      'قارن اتجاه الصورة باتجاه $(d)$، ثم افحص أن كل نقطة مختارة تحركت فعلاً من $A$ إلى $B$ بالاتجاه والمسافة نفسيهما.',
    warning:
      'وجود $B$ على $(d)$ لا يعني أن مستقيم الصورة يمر بـ$B$؛ هذا صحيح مباشرة عندما تكون $A$ هي النقطة الواقعة على $(d)$.',
    activityTitle: 'شخّص الحالة قبل استعمال المسطرة',
    tasks: [
      {
        id: 'one-one',
        prompt: 'في الحالة (1)-①، ما صورة $(d)$؟',
        choices: choices('ينطبق $(d)$ على صورته', 'مستقيم عمودي عليه', 'أي مستقيم يمر بـ$B$'),
        answer: answer(1),
      },
      {
        id: 'one-two',
        prompt: 'في الحالة (1)-②، ما الطريقة المضمونة؟',
        choices: choices('نقل نقطتين من $(d)$', 'رسم مستقيم عبر $B$ مباشرة', 'تدوير $(d)$'),
        answer: answer(1),
      },
      {
        id: 'one-three',
        prompt: 'في الحالة (1)-③، أين تمر الصورة؟',
        choices: choices('بالنقطة $B$', 'بالنقطة $A$ فقط', 'بمنتصف $[AB]$'),
        answer: answer(1),
      },
      {
        id: 'two-one',
        prompt: 'في الحالة (2)-①، هل وقوع $B$ على $(d)$ يكفي لرسم الصورة عبر $B$؟',
        choices: choices('لا؛ ننقل نقطتين من $(d)$', 'نعم دائماً', 'نعم إذا أدرنا المستقيم'),
        answer: answer(1),
      },
      {
        id: 'two-two',
        prompt: 'في الحالة (2)-②، ماذا نفعل بعد اختيار نقطتين من $(d)$؟',
        choices: choices('نرسم المستقيم المار بصورتيهما', 'نصل $A$ بـ$B$ فقط', 'نرسم محور القطعة'),
        answer: answer(1),
      },
      {
        id: 'two-three',
        prompt: 'ما الخاصية المشتركة لصورة المستقيم في الحالة (2)-③؟',
        choices: choices('توازي $(d)$', 'تعامد $(d)$', 'تمر حتماً بـ$A$'),
        answer: answer(1),
      },
    ],
  },
  {
    number: 10,
    printedTaskCount: 3,
    title: 'إنشاء صورة مستقيم بالفرجار والمسطرة',
    source: source(10),
    prompt:
      'في الشكل المرسوم جانباً، $C$ نقطة من المستقيم $(d)$.\n1. انقل هذا الشكل إلى دفترك.\n2. ارسم $C’$ صورة النقطة $C$ وفق الانسحاب الذي ينقل $B$ إلى $A$.\n3. وباستعمال الفرجار والمسطرة، ارسم $(d’)$ صورة المستقيم $(d)$ وفق ذلك الانسحاب. اشرح عملك.',
    sourceFigure: {
      id: 'fig-ex6-q10-line-construction',
      type: 'reference',
      alt: 'مستقيم أحمر مائل $(d)$ تقع عليه النقطة $C$، والنقطة $B$ أعلى يمين المستقيم، والنقطة $A$ أسفل يمينه.',
      caption: 'الشكل المطبوع للسؤال 10.',
      reason:
        'لا توجد قياسات أو شبكة تضبط ميل $(d)$ والمسافات بين $A$ و$B$ و$C$؛ وهي بيانات إنشائية لا ينبغي تخمينها.',
    },
    given: '$C \\in (d)$، ومتجه الانسحاب هو $\\overrightarrow{BA}$.',
    required: 'إنشاء $C’$ ثم إنشاء المستقيم $(d’)$ صورة $(d)$ بالفرجار والمسطرة.',
    start: 'أنشئ أولاً صورة النقطة المعروفة على المستقيم، ثم استعمل خاصية صورة المستقيم.',
    rule: 'إذا كانت $C’$ صورة $C$، فإن صورة $(d)$ هي المستقيم المار بـ$C’$ والموازي لـ$(d)$.',
    why: 'الانسحاب يحافظ على الانتماء والتوازي: $C \\in(d)$ يقتضي $C’ \\in(d’)$.',
    steps: [
      'أنشئ $C’$ بحيث $\\overrightarrow{CC’}=\\overrightarrow{BA}$؛ يمكن إكمال الرباعي $BACC’$ إلى متوازي أضلاع.',
      'بالفرجار تحقق من $CC’=BA$ ومن الاتجاه الموافق للحركة من $B$ إلى $A$.',
      'أنشئ من $C’$ مستقيماً موازياً لـ$(d)$ باستعمال الفرجار والمسطرة.',
      'سمّ هذا المستقيم $(d’)$؛ فهو يمر بصورة نقطة من $(d)$ ويحافظ على اتجاهه.',
    ],
    result: 'المستقيم $(d’)$ هو الموازي لـ$(d)$ والمار بالنقطة $C’$.',
    verify:
      'اختر نقطة ثانية من $(d)$ وانقلها بالمتجه $\\overrightarrow{BA}$؛ يجب أن تقع صورتها على $(d’)$.',
    warning: 'لا ترسم موازياً عشوائياً؛ مرور الصورة بـ$C’$ شرط أساسي يحدد المستقيم.',
    activityTitle: 'رتّب منطق الإنشاء',
    tasks: [
      {
        id: 'vector',
        prompt: 'أي مساواة متجهية تحدد $C’$؟',
        choices: choices(
          '$\\overrightarrow{CC’}=\\overrightarrow{BA}$',
          '$\\overrightarrow{CC’}=\\overrightarrow{AB}$',
          '$\\overrightarrow{BC’}=\\overrightarrow{CA}$',
        ),
        answer: answer(1),
      },
      {
        id: 'line',
        prompt: 'بعد إنشاء $C’$، كيف نحدد $(d’)$؟',
        choices: choices(
          'الموازي لـ$(d)$ المار بـ$C’$',
          'العمودي على $(d)$ المار بـ$A$',
          'المستقيم $(AB)$',
        ),
        answer: answer(1),
      },
      {
        id: 'check',
        prompt: 'ما تحقق إضافي صالح؟',
        choices: choices('نقل نقطة ثانية من $(d)$', 'قياس زاوية عند $B$ فقط', 'فحص لون المستقيم'),
        answer: answer(1),
      },
    ],
  },
  {
    number: 11,
    printedTaskCount: 3,
    title: 'مع مثلث متساوي الساقين',
    source: source(11),
    prompt:
      'في الشكل المجاور، $ABC$ مثلث متساوي الساقين.\n1. أثبت أنّ المثلثين $CNA$، $CBN$ طبوقان.\n2. استنتج أنّ $AN=NB$.\n3. هل $\\widehat{ACN}=\\widehat{NCB}$ ولماذا؟',
    sourceFigure: {
      id: 'fig-ex6-q11-isosceles-altitude',
      type: 'reference',
      alt: 'مثلث $ABC$ متساوي الساقين رأسه $C$ وقاعدته $AB$، والقطعة $CN$ مرسومة من $C$ إلى $N$ على القاعدة، مع علامة زاوية قائمة عند $N$.',
      caption: 'الشكل المطبوع للسؤال 11.',
      reason:
        'التساوي والزاوية القائمة واضحان، لكن قياسات الأضلاع وموضع $N$ العددي غير معطاة؛ لذلك لا تُخمن إحداثيات للرسم.',
    },
    given: '$CA=CB$، و$CN \\perp AB$، والضلع $CN$ مشترك.',
    required: 'إثبات التطابق، ثم استنتاج تنصيف القاعدة وتنصيف زاوية الرأس.',
    start: 'انظر إلى المثلثين القائمين على جانبي $CN$: لهما وتران متساويان وضلع مشترك.',
    rule: 'يتطابق مثلثان قائمان إذا تساوى الوتر وضلع قائم متناظر.',
    why: '$CA$ و$CB$ وترا المثلثين وهما متساويان، و$CN$ ضلع قائم مشترك.',
    steps: [
      '$\\widehat{CNA}=\\widehat{CNB}=90^\\circ$.',
      '$CA=CB$ لأن $ABC$ متساوي الساقين، و$CN=CN$ ضلع مشترك.',
      'إذن المثلثان القائمان $CNA$ و$CNB$ طبوقان بمعيار الوتر وضلع قائم.',
      'من تناظر الأضلاع نحصل على $AN=NB$.',
      'ومن تناظر الزوايا عند $C$ نحصل على $\\widehat{ACN}=\\widehat{NCB}$.',
    ],
    result:
      '$AN=NB$، ونعم: $\\widehat{ACN}=\\widehat{NCB}$ لأنهما زاويتان متناظرتان في مثلثين طبوقين.',
    verify: 'التناظر هو $A \\leftrightarrow B$ و$N \\leftrightarrow N$ و$C \\leftrightarrow C$.',
    warning: 'لا تستنتج أن $N$ منتصف القاعدة من شكل الرسم؛ استنتجه فقط بعد إثبات التطابق.',
    activityTitle: 'استخرج نتيجتين من تطابق واحد',
    tasks: [
      {
        id: 'criterion',
        prompt: 'ما معيار التطابق الأنسب؟',
        choices: choices('الوتر وضلع قائم', 'ثلاث زوايا', 'التشابه البصري'),
        answer: answer(1),
      },
      {
        id: 'side',
        prompt: 'أي ضلعين متناظرين يعطيان النتيجة الثانية؟',
        choices: choices('$AN$ و$NB$', '$CN$ و$CA$', '$AB$ و$CB$'),
        answer: answer(1),
      },
      {
        id: 'angle',
        prompt: 'لماذا تتساوى زاويتا الرأس حول $CN$؟',
        choices: choices(
          'لأنهما متناظرتان في مثلثين طبوقين',
          'لأن الرسم متناظر شكلياً فقط',
          'لأن كلتيهما قائمة',
        ),
        answer: answer(1),
      },
    ],
  },
  {
    number: 12,
    printedTaskCount: 4,
    title: 'صورة مستقيم بانسحاب وتناظر مركزي',
    source: source(12),
    prompt:
      'ارسم مستقيماً مارّاً بنقطتين $U$ و $V$ ونقطة $J$ لا تنتمي إليه.\n1. ارسم $(\\Delta)$ صورة المستقيم $(UV)$ وفق الانسحاب الذي ينقل $V$ إلى $J$.\n2. ارسم $(d)$ صورة المستقيم $(UV)$ وفق التناظر الذي مركزه $J$.\n3. هل المستقيمان $(\\Delta)$ و $(d)$ متوازيان؟ اشرح إجابتك.',
    given: '$J \\notin(UV)$؛ المستقيم $(\\Delta)$ صورة بانسحاب، و$(d)$ صورة بتناظر مركزي.',
    required: 'إنشاء الصورتين ثم تحديد العلاقة بينهما مع التعليل.',
    start: 'قارن اتجاه كل صورة باتجاه المستقيم الأصلي $(UV)$.',
    rule: 'صورة مستقيم بانسحاب مستقيم يوازيه، وصورة مستقيم لا يمر بمركز التناظر المركزي مستقيم يوازيه.',
    why: 'كل من التحويلين يحافظ على استقامة الصورة واتجاه المستقيم في هذه الحالة.',
    steps: [
      'بما أن $V \\mapsto J$ و$V \\in(UV)$، فإن $(\\Delta)$ يمر بـ$J$ ويوازي $(UV)$.',
      'أنشئ نظير نقطتين من $(UV)$ بالنسبة إلى $J$، ثم ارسم المستقيم $(d)$ المار بصورتيهما.',
      'لأن $J$ لا تنتمي إلى $(UV)$، يكون $(d)$ مستقيماً موازياً مميزاً عن $(UV)$.',
      'صار كل من $(\\Delta)$ و$(d)$ موازياً لـ$(UV)$، إذن هما متوازيان.',
    ],
    result: 'نعم، $(\\Delta) \\parallel (d)$ لأن كليهما يوازي $(UV)$.',
    verify:
      'إذا كان مستقيمان يوازيان المستقيم نفسه في المستوى، فهما متوازيان أو منطبقان؛ وهنا الإنشاء يحدد موضعيهما.',
    warning: 'لا تقل إن $(d)$ يمر بـ$J$؛ مركز التناظر ليس بالضرورة نقطة على صورة المستقيم.',
    activityTitle: 'قارن أثر تحويلين',
    tasks: [
      {
        id: 'translation',
        prompt: 'ما وضع $(\\Delta)$ بالنسبة إلى $(UV)$؟',
        choices: choices('موازٍ له ويمر بـ$J$', 'عمودي عليه', 'ينطبق عليه دائماً'),
        answer: answer(1),
      },
      {
        id: 'symmetry',
        prompt: 'ما وضع $(d)$ بالنسبة إلى $(UV)$؟',
        choices: choices('موازٍ له', 'عمودي عليه', 'يمر حتماً بـ$J$'),
        answer: answer(1),
      },
      {
        id: 'conclusion',
        prompt: 'ما العلاقة النهائية؟',
        choices: choices(
          '$(\\Delta) \\parallel (d)$',
          '$(\\Delta) \\perp (d)$',
          'لا يمكن المقارنة',
        ),
        answer: answer(1),
      },
    ],
    authoredFigure: {
      id: 'auth-ex6-q12-parallel-images',
      scenario: 'q12-parallel-images',
      alt: 'شكل تعليمي يوضح ثلاثة مستقيمات متوازية: $(UV)$ وصورته $(\\Delta)$ بالانسحاب وصورته $(d)$ بالتناظر المركزي.',
      caption: 'تلخيص بصري من إعداد المنصّة — ليس شكلاً مطبوعاً في السؤال.',
    },
  },
  {
    number: 13,
    printedTaskCount: 8,
    title: 'صور نقاط ومثلثات على شبكة',
    source: source(13),
    prompt:
      'تأمّل الشكل الآتي:\n1. وفق الانسحاب الذي ينقل $A$ إلى $B$، ما صورة:\n① النقطة $C$؟ ② النقطة $F$؟ ③ النقطة $H$؟ ④ النقطة $M$؟\n2. وفق الانسحاب الذي ينقل $A$ إلى $B$، ما النقطة التي:\n① صورتها $D$؟ ② صورتها $I$؟ ③ صورتها $H$؟\nحدّد وفق الانسحاب الذي ينقل $A$ إلى $B$، مثلثين طبوقين',
    sourceFigure: {
      id: 'fig-ex6-q13-point-grid',
      type: 'reconstructed',
      scenario: 'q13-source-grid',
      alt: 'شبكة من ثلاث سويات أفقية وتسعة أعمدة؛ على السطر السفلي النقاط $F,L,A,G,H,B,I,J$، وعلى الأوسط $K,C,D,E$، وعلى العلوي $M,N$، والمسافة الأفقية من $A$ إلى $B$ ثلاث خانات.',
      caption: 'إعادة بناء الشبكة والنقاط من مواضع العقد الواضحة في المصدر.',
    },
    given: 'متجه الانسحاب $\\overrightarrow{AB}$ يساوي ثلاث خانات أفقية نحو اليمين.',
    required: 'إيجاد أربع صور، وثلاث سوابق صور، ثم تحديد مثلث وصورته.',
    start: 'لكل صورة تحرك ثلاث خانات يميناً؛ ولإيجاد الأصل تحرك ثلاث خانات يساراً.',
    rule: 'الانسحاب ينقل كل نقطة بالمتجه نفسه ويحافظ على الأطوال والزوايا، فتكون صورة أي مثلث مثلثاً مطابقاً له.',
    why: 'النقطتان $A$ و$B$ على السطر نفسه وبينهما ثلاث فواصل شبكية.',
    steps: [
      'صور النقاط: $C \\mapsto E$، و$F \\mapsto G$، و$H \\mapsto I$، و$M \\mapsto N$.',
      'سوابق الصور: $K \\mapsto D$، و$H \\mapsto I$، و$L \\mapsto H$.',
      'مثال لمثلثين طبوقين: المثلث $KAM$ وصورته المثلث $DBN$.',
      'فالانسحاب يحقق $K \\mapsto D$ و$A \\mapsto B$ و$M \\mapsto N$.',
    ],
    result: 'الصور هي $E,G,I,N$؛ والسوابق هي $K,H,L$؛ ومن الأمثلة $KAM$ و$DBN$.',
    verify: 'عدّ ثلاث خانات أفقية لكل زوج، وتأكد أن الارتفاع الشبكي لا يتغير.',
    warning: 'السؤال الثاني يطلب النقطة الأصلية لا الصورة؛ لذلك نتحرك بعكس اتجاه $A \\mapsto B$.',
    activityTitle: 'أكمل خريطة الصور والسوابق',
    tasks: [
      { id: 'c', prompt: 'صورة $C$ هي:', choices: choices('$E$', '$D$', '$K$'), answer: answer(1) },
      { id: 'f', prompt: 'صورة $F$ هي:', choices: choices('$G$', '$H$', '$A$'), answer: answer(1) },
      {
        id: 'h-image',
        prompt: 'صورة $H$ هي:',
        choices: choices('$I$', '$J$', '$B$'),
        answer: answer(1),
      },
      { id: 'm', prompt: 'صورة $M$ هي:', choices: choices('$N$', '$C$', '$D$'), answer: answer(1) },
      {
        id: 'd-preimage',
        prompt: 'النقطة التي صورتها $D$ هي:',
        choices: choices('$K$', '$C$', '$A$'),
        answer: answer(1),
      },
      {
        id: 'i-preimage',
        prompt: 'النقطة التي صورتها $I$ هي:',
        choices: choices('$H$', '$B$', '$E$'),
        answer: answer(1),
      },
      {
        id: 'h-preimage',
        prompt: 'النقطة التي صورتها $H$ هي:',
        choices: choices('$L$', '$F$', '$A$'),
        answer: answer(1),
      },
      {
        id: 'triangles',
        prompt: 'أي زوج يمثل مثلثاً وصورته؟',
        choices: choices('$KAM$ و$DBN$', '$KAM$ و$CEN$', '$FCM$ و$GDN$'),
        answer: answer(1),
      },
    ],
  },
  {
    number: 14,
    printedTaskCount: 4,
    title: 'ثلاث صور لمستطيل واحد',
    source: source(14),
    prompt:
      '1. ارسم، باللون الأسود، مستطيلاً $ABCD$ بعداه $AB=2\\,cm$ و $AD=4\\,cm$.\n2. ارسم:\n① باللون الأزرق، صورة المستطيل $ABCD$ وفق الانسحاب الذي ينقل $A$ إلى $B$.\n② باللون الأحمر، صورة المستطيل $ABCD$ وفق الانسحاب الذي ينقل $D$ إلى $A$.\n③ باللون الأخضر، صورة المستطيل $ABCD$ وفق الانسحاب الذي ينقل $B$ إلى $D$.',
    given: 'مستطيل $ABCD$ بعداه $AB=2\\,cm$ و$AD=4\\,cm$، وثلاثة متجهات انسحاب مختلفة.',
    required: 'رسم الأصل الأسود وثلاث صور بالألوان المحددة، مع الحفاظ على القياسات والاتجاه.',
    start: 'سمّ رؤوس كل صورة مؤقتاً، وانقل كل رأس بالمتجه المطلوب بدلاً من تحريك الشكل بالتقدير.',
    rule: 'الانسحاب يحافظ على الأطوال والتوازي والزوايا والاتجاه؛ وتنتقل الرؤوس كلها بالمتجه نفسه.',
    why: 'معرفة صورة رأس واحد لا تكفي للرسم الحر، لكنها تحدد متجهاً يطبق على الرؤوس الأربعة.',
    steps: [
      'ارسم $AB=2\\,cm$، ثم أقم عمودين عند $A$ و$B$ بطول $4\\,cm$ لإكمال $ABCD$ بالأسود.',
      'للصورة الزرقاء، طبّق $\\overrightarrow{AB}$ على الرؤوس؛ فتكون صورة $A$ هي $B$ وصورة $D$ هي $C$.',
      'للصورة الحمراء، طبّق $\\overrightarrow{DA}$؛ فتكون صورة $D$ هي $A$ وصورة $C$ هي $B$.',
      'للصورة الخضراء، طبّق $\\overrightarrow{BD}$ على كل رأس؛ فتكون صورة $B$ هي $D$.',
      'صل رؤوس كل صورة بالترتيب نفسه، واستعمل اللون المحدد في نص السؤال.',
    ],
    result:
      'نحصل على ثلاثة مستطيلات مطابقة للأصل، مواضعها تحددها المتجهات $\\overrightarrow{AB}$ و$\\overrightarrow{DA}$ و$\\overrightarrow{BD}$.',
    verify:
      'قِس في كل صورة ضلعين متجاورين: يجب أن يبقيا $2\\,cm$ و$4\\,cm$، وأن تبقى الزوايا قائمة.',
    warning: 'المتجه الثالث $\\overrightarrow{BD}$ قطري؛ لا تستبدله بحركة أفقية أو عمودية منفردة.',
    activityTitle: 'طابق اللون بمتجه الحركة',
    tasks: [
      {
        id: 'blue',
        prompt: 'ما المتجه المستعمل للصورة الزرقاء؟',
        choices: choices(
          '$\\overrightarrow{AB}$',
          '$\\overrightarrow{BA}$',
          '$\\overrightarrow{AD}$',
        ),
        answer: answer(1),
      },
      {
        id: 'red',
        prompt: 'ما المتجه المستعمل للصورة الحمراء؟',
        choices: choices(
          '$\\overrightarrow{DA}$',
          '$\\overrightarrow{AD}$',
          '$\\overrightarrow{DC}$',
        ),
        answer: answer(1),
      },
      {
        id: 'green',
        prompt: 'أي رأس يصل إلى $D$ في الصورة الخضراء؟',
        choices: choices('$B$', '$A$', '$C$'),
        answer: answer(1),
      },
    ],
    authoredFigure: {
      id: 'auth-ex6-q14-rectangle-translations',
      scenario: 'q14-rectangle-translations',
      alt: 'تحقق تعليمي يعرض المستطيل الأسود ونُسخه الزرقاء والحمراء والخضراء بعد تطبيق المتجهات الثلاثة المحددة.',
      caption: 'حل بصري مقيّس من إعداد المنصّة — ليس رسماً مطبوعاً في السؤال.',
    },
  },
  {
    number: 15,
    printedTaskCount: 2,
    title: 'صورة مثلث قائم باتجاه الوتر',
    source: source(15),
    prompt:
      'المثلث $ABC$ المرسوم جانباً، قائمٌ في $A$ و $AB=3\\,cm$ و $AC=2\\,cm$. $E$ نقطة من وتره $[BC]$، $CE=1\\,cm$.\nارسم هذا المثلث على دفترك، ثم ارسم صورته وفق الانسحاب الذي ينقل $C$ إلى $E$.',
    sourceFigure: {
      id: 'fig-ex6-q15-right-triangle',
      type: 'reconstructed',
      scenario: 'q15-source-triangle',
      alt: 'مثلث $ABC$ قائم في $A$، ضلعه الأفقي $AB=3\\,cm$ وضلعه العمودي $AC=2\\,cm$، والنقطة $E$ على الوتر $[BC]$ بحيث $CE=1\\,cm$.',
      caption: 'إعادة بناء مقيّسة من المعطيات العددية وعلامة الزاوية القائمة في المصدر.',
    },
    given: '$AB=3\\,cm$ و$AC=2\\,cm$ و$\\widehat{A}=90^\\circ$، و$E \\in[BC]$ مع $CE=1\\,cm$.',
    required: 'رسم المثلث المعطى ثم رسم صورته كاملة وفق $C \\mapsto E$.',
    start:
      'أنشئ الأصل بالمقاسين والزاوية القائمة، ثم اعتبر $\\overrightarrow{CE}$ متجه الحركة لكل رأس.',
    rule: 'صورة المثلث هي المثلث الذي رؤوسه صور رؤوس الأصل، ويحافظ الانسحاب على الأطوال والزوايا.',
    why: 'تحديد $C \\mapsto E$ يعطي اتجاهاً على الوتر ومسافة $1\\,cm$، ويطبق هذا الانتقال نفسه على $A$ و$B$.',
    steps: [
      'ارسم $AB=3\\,cm$، ثم أقم من $A$ عموداً على $(AB)$ وحدد عليه $C$ بحيث $AC=2\\,cm$.',
      'صل $B$ بـ$C$، ثم حدد $E$ على $[BC]$ بحيث $CE=1\\,cm$.',
      'النقطة $C’$، صورة $C$، هي $E$ نفسها.',
      'أنشئ $A’$ بحيث $\\overrightarrow{AA’}=\\overrightarrow{CE}$، وأنشئ $B’$ بحيث $\\overrightarrow{BB’}=\\overrightarrow{CE}$.',
      'صل $A’$ و$B’$ و$C’$؛ فيكون $A’B’C’$ صورة المثلث.',
    ],
    result: 'الصورة مثلث قائم مطابق للأصل، وفيها $C’=E$ و$A’B’=3\\,cm$ و$A’C’=2\\,cm$.',
    verify:
      'يجب أن تكون القطع $AA’$ و$BB’$ و$CC’$ متوازية ومتساوية وطول كل منها $1\\,cm$ باتجاه $C$ إلى $E$.',
    warning: 'لا تنقل $C$ وحدها؛ يجب تطبيق $\\overrightarrow{CE}$ نفسه على الرؤوس الثلاثة.',
    activityTitle: 'ثبّت متجه الصورة قبل الإنشاء',
    tasks: [
      {
        id: 'c-image',
        prompt: 'ما صورة $C$ مباشرة؟',
        choices: choices('$E$', '$A$', '$B$'),
        answer: answer(1),
      },
      {
        id: 'movement',
        prompt: 'ما طول انتقال كل رأس؟',
        choices: choices('$1\\,cm$', '$2\\,cm$', '$3\\,cm$'),
        answer: answer(1),
      },
      {
        id: 'preserved',
        prompt: 'ما الذي يجب أن يبقى في المثلث الصورة؟',
        choices: choices('الزاوية القائمة وطولا الضلعين', 'موضع $A$ نفسه', 'الوتر في مكانه نفسه'),
        answer: answer(1),
      },
    ],
  },
];

function sourceFigureBlock(exercise: ContinuationExercise): ContentBlock[] {
  const figure = exercise.sourceFigure;
  if (!figure) return [];
  if (figure.type === 'reference') {
    return [
      {
        type: 'figure',
        diagram: {
          kind: 'reference',
          origin: 'textbook',
          id: figure.id,
          alt: figure.alt,
          caption: figure.caption,
          source: exercise.source,
          reason: figure.reason,
        },
      },
    ];
  }
  return [
    {
      type: 'figure',
      diagram: {
        kind: 'interactive',
        origin: 'textbook',
        id: figure.id,
        renderer: 'unit-continuation-figure',
        alt: figure.alt,
        caption: figure.caption,
        source: exercise.source,
        params: { scenario: figure.scenario },
      },
    },
  ];
}

function reasoningLab(exercise: ContinuationExercise): ContentBlock {
  return {
    type: 'figure',
    diagram: {
      kind: 'interactive',
      origin: 'authored',
      id: `auth-ex6-q${exercise.number}-reasoning-lab`,
      renderer: 'exercise-reasoning-lab',
      alt: `نشاط تفاعلي مجمّع للسؤال ${exercise.number}؛ لا يكشف نتيجة أي قرار قبل إكمال السلسلة.`,
      caption: 'أكمل القرارات كلها، ثم تحقّق من السلسلة دفعة واحدة.',
      params: { title: exercise.activityTitle, tasks: exercise.tasks },
    },
  };
}

function authoredFigureBlock(exercise: ContinuationExercise): ContentBlock[] {
  const figure = exercise.authoredFigure;
  if (!figure) return [];
  return [
    {
      type: 'figure',
      diagram: {
        kind: 'interactive',
        origin: 'authored',
        id: figure.id,
        renderer: 'unit-continuation-figure',
        alt: figure.alt,
        caption: figure.caption,
        params: { scenario: figure.scenario },
      },
    },
  ];
}

function exerciseStep(exercise: ContinuationExercise): LessonStepInput {
  return {
    id: `exercise-q${exercise.number}`,
    kicker: `تمرينات الوحدة الأولى — السؤال ${exercise.number}`,
    title: exercise.title,
    source: exercise.source,
    blocks: [
      {
        type: 'questionGroup',
        title: 'نصّ السؤال المطبوع كاملاً',
        items: [{ label: String(exercise.number), text: exercise.prompt }],
      },
      ...sourceFigureBlock(exercise),
      ...(exercise.sourceExtras ?? []),
      {
        type: 'teaching',
        variant: 'concept',
        title: 'افهم المهمة قبل الحل',
        blocks: [
          { type: 'paragraph', text: `المعطيات: ${exercise.given}` },
          { type: 'paragraph', text: `المطلوب: ${exercise.required}` },
          { type: 'paragraph', text: `كيف نبدأ؟ ${exercise.start}` },
        ],
      },
      reasoningLab(exercise),
      {
        type: 'teaching',
        variant: 'why',
        title: 'الحل خطوة بخطوة',
        collapsible: true,
        revealLabel: 'حاول أولاً، ثم اكشف الحل والتحقق',
        blocks: [
          {
            type: 'callout',
            variant: 'theorem',
            title: 'القاعدة / الخاصية الهندسية',
            blocks: [
              { type: 'paragraph', text: exercise.rule },
              { type: 'paragraph', text: `لماذا نستخدمها؟ ${exercise.why}` },
            ],
          },
          { type: 'list', ordered: true, items: exercise.steps },
          ...authoredFigureBlock(exercise),
          {
            type: 'callout',
            variant: 'note',
            title: 'النتيجة النهائية',
            blocks: [{ type: 'paragraph', text: exercise.result }],
          },
          {
            type: 'callout',
            variant: 'hint',
            title: 'التحقق',
            blocks: [{ type: 'paragraph', text: exercise.verify }],
          },
          {
            type: 'teaching',
            variant: 'pitfall',
            title: 'خطأ شائع',
            blocks: [{ type: 'paragraph', text: exercise.warning }],
          },
        ],
      },
    ],
  };
}

export const lesson06: LessonInput = {
  id: 'lesson-06-unit-one-exercises-continuation',
  title: 'تتمة الدرس الخامس (1): تمرينات الوحدة الأولى — الأسئلة 3–15',
  source: { page: 'صور المصدر — الأسئلة 3–15', locator: 'تمرينات الوحدة الأولى' },
  steps: lesson06Exercises.map(exerciseStep),
  teacherResources: buildLesson06TeacherResources(lesson06Exercises),
};
