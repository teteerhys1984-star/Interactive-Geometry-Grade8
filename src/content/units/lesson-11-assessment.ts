import type { AssessmentInput, ContentBlock } from '../schema';

const p = (text: string): ContentBlock[] => [{ type: 'paragraph', text }];
const choice = (id: string, text: string) => ({ id, blocks: p(text) });

/**
 * ============================================================================
 *  UNIT 2, LESSON 4 — IN-LESSON FINAL ASSESSMENT
 * ============================================================================
 *
 *  Formative 8-question check inside the lesson flow (`origin: 'authored'`),
 *  using the three in-lesson assessment types (`multiple-choice`,
 *  `true-false`, `numeric`) exactly as Lessons 8–10 do. It is NOT the Test Area
 *  bank: `src/tests/questions/lesson-11.ts` is a separate 20-question test with
 *  its own definition and detailed solutions.
 *
 *  Coverage of pages 39–41: the three-ratio statement and its hypotheses, the
 *  auxiliary constructions of the activity, the printed worked example
 *  (AF = 4, EF = 10/3), the correspondence order, and the extension case.
 * ============================================================================
 */
export const lesson11Assessment: AssessmentInput = {
  id: 'assessment-11-three-ratios',
  title: 'الاختبار النهائي — تساوي ثلاث نسب',
  passingScore: 75,
  instructions:
    'أجب عن الأسئلة الثمانية الآتية للتحقّق من استيعابك لمبرهنة النسب الثلاث المتساوية: صياغتها وشرطها، ومراسلة الأضلاع في كتابة النسب، وحساب الأطوال المجهولة، ودور الإنشاءات المساعدة في برهان حالة الأثلاث.',
  questions: [
    {
      id: 'l11-q01-theorem-statement',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'صياغة مبرهنة النسب الثلاث المتساوية وشرطها',
      prompt: p(
        'في المثلث $ABC$، $M \\in [AB]$ و$N \\in [AC]$. أيّ شرط يجعل النسب الثلاث $\\frac{AM}{AB}$ و$\\frac{AN}{AC}$ و$\\frac{MN}{BC}$ متساوية؟',
      ),
      choices: [
        choice('l11-q01-a', 'أن يكون $(MN) \\parallel (BC)$'),
        choice('l11-q01-b', 'أن تكون $M$ و$N$ منتصفي الضلعين'),
        choice('l11-q01-c', 'أن يكون $AM = AN$'),
        choice('l11-q01-d', 'أن يكون المثلث $ABC$ متساوي الساقين'),
      ],
      correctChoiceId: 'l11-q01-a',
      explanation: p(
        'الشرط الوحيد في فرضية المبرهنة هو توازي المستقيم القاطع مع الضلع الثالث: $(MN) \\parallel (BC)$. أمّا كون النقطتين منتصفين فهو حالة خاصة تُحقّق الشرط لا شرط مستقل، وتساوي $AM = AN$ لا ينتج عنه أي تناسب مضمون.',
      ),
    },
    {
      id: 'l11-q02-sequence-of-ratio',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'مراسلة الأضلاع وتحديد بسط كل نسبة ومقامها',
      prompt: p(
        'في المثلث $ABC$، $M \\in [AB]$ و$N \\in [AC]$ و$(MN) \\parallel (BC)$. أيّ كتابة تُطابق قاعدة الكتاب في المراسلة؟',
      ),
      choices: [
        choice('l11-q02-a', '$\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}$'),
        choice('l11-q02-b', '$\\frac{AM}{AN} = \\frac{AB}{AC} = \\frac{MN}{BC}$'),
        choice('l11-q02-c', '$\\frac{AM}{AC} = \\frac{AN}{AB} = \\frac{MN}{BC}$'),
        choice('l11-q02-d', '$\\frac{MB}{AB} = \\frac{NC}{AC} = \\frac{MN}{BC}$'),
      ],
      correctChoiceId: 'l11-q02-a',
      explanation: p(
        'نكتب في البسوط أضلاع المثلث الصغير $AMN$، وفي المقامات الأضلاع الموافقة من المثلث الكبير $ABC$: $[AM]$ مع $[AB]$ على المستقيم نفسه، و$[AN]$ مع $[AC]$ كذلك، و$[MN]$ مع المتوازي $[BC]$. الخيار (د) يعطي نسبة الجزء المتبقي لا نسبة الجزء إلى الكل.',
      ),
    },
    {
      id: 'l11-q03-parallel-hypothesis',
      type: 'true-false',
      origin: 'authored',
      skill: 'التحقّق من فرضية التوازي وتمييزها عن النتائج',
      prompt: p(
        'إذا كان $M \\in [AB]$ و$N \\in [AC]$ و$\\frac{AM}{AB} = \\frac{AN}{AC}$ في المثلث $ABC$، فإنّ $(MN) \\parallel (BC)$ بالضرورة.',
      ),
      answer: true,
      explanation: p(
        'هذه هي العكسية المستعملة في الدرس 3 لتحديد التوازي: تساوي النسبتين على ضلعين يقطعان الزاوية نفسها يفرض توازي القطعة الواصلة بين نقطتي القطع مع الضلع الثالث. وتُستعمل في نشاط الصفحة ٣٩ ضمناً حين نستنتج من تساوي النسب أنّ القطع متوازية.',
      ),
    },
    {
      id: 'l11-q04-activity-goal',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'ربط الإنشاءات المساعدة بالنتيجة المطلوبة',
      prompt: p(
        'في نشاط الصفحة ٣٩، رُسم من $I$ المستقيم الموازي لـ $(MN)$ فلقي $(AC)$ في $J$. ما الذي يُثبته هذا الإنشاء مباشرةً؟',
      ),
      choices: [
        choice('l11-q04-a', 'أنّ $J$ منتصف $[AN]$'),
        choice('l11-q04-b', 'أنّ $P$ منتصف $[BJ]$'),
        choice('l11-q04-c', 'أنّ $CS = SR = RB$'),
        choice('l11-q04-d', 'أنّ $\\frac{MN}{BC} = \\frac{2}{3}$'),
      ],
      correctChoiceId: 'l11-q04-a',
      explanation: p(
        'في المثلث $AMN$، النقطة $I$ منتصف $[AM]$ والمستقيم $(IJ)$ يوازي $(MN)$، فمبرهنة منتصفي ضلعين تعطي أنّ $J$ منتصف $[AN]$. أمّا $P$ فيأتي من إنشاء لاحق هو $(BJ)$، و$R$ و$S$ من إنشاء الجزء الثالث.',
      ),
    },
    {
      id: 'l11-q05-example-af',
      type: 'numeric',
      origin: 'authored',
      skill: 'حساب طول بالضرب التبادلي (المثال المطبوع)',
      prompt: p(
        'في المثلث $ABC$، $E \\in [AB]$ و$F \\in [AC]$ و$(EF) \\parallel (BC)$، مع $AB = 3$ و$AC = 6$ و$BC = 5$ و$AE = 2$. احسب الطول $AF$.',
      ),
      answer: 4,
      explanation: p(
        'النسبة المشتركة $\\frac{AE}{AB} = \\frac{2}{3}$، ومنها $\\frac{AF}{AC} = \\frac{2}{3}$ أي $AF = \\frac{6 \\times 2}{3} = 4$، وهو الحل المطبوع نفسه في صفحة ٤١.',
      ),
    },
    {
      id: 'l11-q06-example-ef',
      type: 'numeric',
      origin: 'authored',
      skill: 'التعامل مع ناتج كسري غير مختزل إلى عدد صحيح',
      prompt: p(
        'بمعطيات السؤال السابق نفسها: $AB = 3$ و$AC = 6$ و$BC = 5$ و$AE = 2$ و$(EF) \\parallel (BC)$. احسب الطول $EF$ (اكتب الناتج بصيغة عشرية).',
      ),
      answer: 3.3333,
      tolerance: 0.001,
      explanation: p(
        '$\\frac{EF}{BC} = \\frac{2}{3}$ ومنه $EF = \\frac{5 \\times 2}{3} = \\frac{10}{3} \\approx 3.3333$، وهو الناتج المطبوع $\\frac{10}{3}$ في صفحة ٤١. السماحية المسموحة $0.001$ لأنّ السؤال يطلب صيغة عشرية.',
      ),
    },
    {
      id: 'l11-q07-third-ratio',
      type: 'true-false',
      origin: 'authored',
      skill: 'استنتاج النسبة الثالثة من نسبتي القاطعين',
      prompt: p(
        'في المثلث $ABC$، $M \\in [AB]$ و$N \\in [AC]$ و$(MN) \\parallel (BC)$، فإذا كان $\\frac{AM}{AB} = \\frac{3}{5}$ فإنّ $\\frac{MN}{BC} = \\frac{3}{5}$ أيضاً.',
      ),
      answer: true,
      explanation: p(
        'النسب الثلاث متساوية بنص المبرهنة، فمعرفة نسبة القاطعين تحدد نسبة الضلعين المتوازيين مباشرةً: $\\frac{MN}{BC} = \\frac{AM}{AB} = \\frac{3}{5}$.',
      ),
    },
    {
      id: 'l11-q08-extension-case',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'قراءة ملاحظة الكتاب عن حالة امتدادي الضلعين',
      prompt: p(
        'ماذا يحدث لمبرهنة النسب الثلاث المتساوية إذا قطع المستقيم $(d)$ امتدادي $[AB]$ و$[AC]$ خارج القطعتين، مع بقاء $(d) \\parallel (BC)$؟',
      ),
      choices: [
        choice('l11-q08-a', 'تبقى صحيحة، وقد تصبح النسبة المشتركة أكبر من $1$'),
        choice('l11-q08-b', 'تصبح خاطئة لأنّ النقاط خرجت من الضلعين'),
        choice('l11-q08-c', 'تبقى صحيحة لكن النسبة تساوي $\\frac{1}{2}$ دائماً'),
        choice('l11-q08-d', 'تصبح صحيحة فقط إذا كان المثلث متساوي الأضلاع'),
      ],
      correctChoiceId: 'l11-q08-a',
      explanation: p(
        'ملاحظة الكتاب في صفحة ٤٠ تنصّ على أنّ المبرهنة تبقى صحيحة في هذه الحالة. والفرق أنّ المثلث الصغير يصبح أكبر من المثلث الأصلي، فتكبر النسبة المشتركة عن $1$ بدل أن تبقى محصورة بين $0$ و$1$.',
      ),
    },
  ],
};
