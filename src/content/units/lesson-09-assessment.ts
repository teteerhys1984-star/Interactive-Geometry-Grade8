import type { AssessmentInput, ContentBlock } from '../schema';

const p = (text: string): ContentBlock[] => [{ type: 'paragraph', text }];
const choice = (id: string, text: string) => ({ id, blocks: p(text) });

/**
 * ============================================================================
 *  UNIT 2, LESSON 2 — IN-LESSON FINAL ASSESSMENT
 * ============================================================================
 *
 *  Formative 8-question check inside the lesson flow (`origin: 'authored'`),
 *  covering all three in-lesson assessment types (`multiple-choice`,
 *  `true-false`, `numeric`).
 * ============================================================================
 */
export const lesson09Assessment: AssessmentInput = {
  id: 'assessment-09-parallel-from-midpoint',
  title: 'الاختبار النهائي — موازٍ لضلع من منتصف ضلع آخر',
  passingScore: 75,
  instructions:
    'أجب عن الأسئلة الثمانية الآتية للتحقّق من استيعابك للمبرهنة الثانية في المنتصفات وطرائق تطبيقها.',
  questions: [
    {
      id: 'l9-q01-theorem-core',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'صياغة المبرهنة الثانية في المنتصفات وتحديد نتيجتها',
      prompt: p(
        'في المثلث $ABC$، النقطة $I$ منتصف $[AB]$، والمستقيم $(d)$ يمر بـ $I$ موازياً $(BC)$ ويقطع $[AC]$ في $J$. ماذا نستنتج مباشرةً من المبرهنة الثانية في المنتصفات؟',
      ),
      choices: [
        choice('l9-q01-a', 'النقطة $J$ هي منتصف الضلع $[AC]$.'),
        choice('l9-q01-b', 'المستقيم $(IJ)$ عمودي على $[AC]$.'),
        choice('l9-q01-c', 'المثلث $ABC$ متساوي الساقين.'),
        choice('l9-q01-d', 'النقطة $J$ تنطبق على الرأس $C$.'),
      ],
      correctChoiceId: 'l9-q01-a',
      explanation: p(
        'المستقيم المار بمنتصف أحد أضلاع مثلث $[AB]$ موازياً ضلعاً آخر $(BC)$ يقطع الضلع الثالثة $[AC]$ في منتصفه $J$. خطأ شائع: استبدال التناصف بالتعامد أو باشتراط تساوي الساقين.',
      ),
    },
    {
      id: 'l9-q02-salim-error',
      type: 'true-false',
      origin: 'authored',
      skill: 'تفسير نشاط سليم ودور وحدانية الموازي',
      prompt: p(
        "في نشاط سليم، سبب عدم انطباق المستقيم اليدوي $(d)$ على المستقيم $(d')$ المار بمنتصفَي $[AB]$ و$[AC]$ هو أنَّ رسم $(d)$ باليد لم يحقّق التوازي الدقيق مع $[BC]$.",
      ),
      answer: true,
      explanation: p(
        "حسب المبرهنة الأولى يوازي $(d')$ الضلع $[BC]$، ولو كان $(d)$ موازياً فعلاً لـ $[BC]$ لانطبق على $(d')$ لوحدانية الموازي المار بالنقطة $M$.",
      ),
    },
    {
      id: 'l9-q03-missing-parallel',
      type: 'true-false',
      origin: 'authored',
      skill: 'التحقّق من اكتمال شرطَي المبرهنة الثانية',
      prompt: p(
        'في أي مثلث $EFG$، كل مستقيم يمر بمنتصف الضلع $[EF]$ ويقطع $[EG]$ في $H$ يجعل $H$ منتصف $[EG]$ حتى لو لم يكن موازياً للضلع $(FG)$.',
      ),
      answer: false,
      explanation: p(
        'لا يكفي مرور المستقيم بمنتصف ضلع واحد؛ لا بدّ أيضاً من أن يوازي ضلعاً ثانية من المثلث حتى يقطع الضلع الثالثة في منتصفه.',
      ),
    },
    {
      id: 'l9-q04-half-length',
      type: 'numeric',
      origin: 'authored',
      skill: 'حساب طول نصف الضلع الثالث بعد إثبات المنتصف',
      prompt: p(
        'في المثلث $ABC$، النقطة $M$ منتصف $[AB]$، والمستقيم المار بـ $M$ موازياً $(BC)$ يقطع $[AC]$ في $N$. إذا كان $AC = 14\\,\\mathrm{cm}$، فكم سنتيمتراً يساوي طول $[AN]$؟',
      ),
      answer: 7,
      tolerance: 0,
      unit: 'cm',
      explanation: p(
        'حسب المبرهنة الثانية في المنتصفات تكون $N$ منتصف $[AC]$، ومنه $AN = \\frac{1}{2}\\,AC = \\frac{14}{2} = 7\\,\\mathrm{cm}$.',
      ),
    },
    {
      id: 'l9-q05-subtriangle-choice',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'اختيار المثلث الجزئي المناسب في شكل مركّب',
      prompt: p(
        'في المثلث $ABC$، $M$ نقطة من $[BC]$ (ليست منتصفه)، و$R$ منتصف $[AM]$، والمستقيم $(SR)$ يمر بـ $R$ موازياً $(BC)$ ويقطع $[AB]$ في $S$. ما المثلث الذي نطبّق عليه المبرهنة الثانية لإثبات أنَّ $S$ منتصف $[AB]$؟',
      ),
      choices: [
        choice('l9-q05-a', 'المثلث $ABC$.'),
        choice('l9-q05-b', 'المثلث $AMB$.'),
        choice('l9-q05-c', 'المثلث $AMC$.'),
        choice('l9-q05-d', 'المثلث $RBM$.'),
      ],
      correctChoiceId: 'l9-q05-b',
      explanation: p(
        'القطعة $[AM]$ التي نعلم منتصفها $R$ والقطعة $[AB]$ المطلوب إثبات منتصفها $S$ هما ضلعان في المثلث $AMB$، وضلعه الثالث $[BM]$ محمول على $(BC)$ فيكون $(SR) \\parallel (BM)$.',
      ),
    },
    {
      id: 'l9-q06-right-triangle-bridge',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'استنتاج التوازي من عمودين على مستقيم واحد قبل تطبيق المبرهنة الثانية',
      prompt: p(
        'في المثلث $ABC$ القائم في $B$، النقطة $M$ منتصف $[AB]$ و$(MN) \\perp (AB)$ يقطع $[AC]$ في $N$. ما التبرير الذي يوفّر شرط التوازي قبل تطبيق المبرهنة الثانية؟',
      ),
      choices: [
        choice('l9-q06-a', 'قطرا متوازي الأضلاع متناصفان.'),
        choice('l9-q06-b', 'العمودان $(BC)$ و$(MN)$ على المستقيم الواحد $(AB)$ متوازيان.'),
        choice('l9-q06-c', 'التناظر المركزي يحفظ المسافات.'),
        choice('l9-q06-d', 'الوتر أطول أضلاع المثلث القائم.'),
      ],
      correctChoiceId: 'l9-q06-b',
      explanation: p(
        'كون $ABC$ قائماً في $B$ يعني $(BC) \\perp (AB)$، ومع $(MN) \\perp (AB)$ نستنتج $(MN) \\parallel (BC)$ لأنَّ العمودين على مستقيم واحد متوازيان.',
      ),
    },
    {
      id: 'l9-q07-full-side-numeric',
      type: 'numeric',
      origin: 'authored',
      skill: 'حساب طول الضلع الكامل انطلاقاً من أحد نصفيه بعد إثبات المنتصف',
      prompt: p(
        'في المثلث $ABC$ القائم في $B$، $M$ منتصف $[AB]$ و$(MN) \\perp (AB)$ يقطع $[AC]$ في $N$. إذا كان $NC = 5.5\\,\\mathrm{cm}$، فكم سنتيمتراً يساوي طول الوتر $[AC]$؟',
      ),
      answer: 11,
      tolerance: 0,
      unit: 'cm',
      explanation: p(
        'بما أنَّ $(BC) \\perp (AB)$ و$(MN) \\perp (AB)$ فإنَّ $(MN) \\parallel (BC)$، ومنه $N$ منتصف $[AC]$ حسب المبرهنة الثانية، إذن $AC = 2 \\times NC = 2 \\times 5.5 = 11\\,\\mathrm{cm}$.',
      ),
    },
    {
      id: 'l9-q08-symmetry-practice',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'توظيف التناظر المركزي لتجهيز المنتصف في المثلث الممتد',
      prompt: p(
        'في التمرين: «$IJK$ مثلث، $S$ صورة $I$ وفق التناظر الذي مركزه $J$، والموازي لـ $(JK)$ المار بـ $S$ يلاقي $(IK)$ في $T$»، ما المعطى المباشر الذي يقدّمه التناظر المركزي؟',
      ),
      choices: [
        choice('l9-q08-a', 'النقطة $I$ منتصف $[JS]$.'),
        choice('l9-q08-b', 'النقطة $S$ منتصف $[IJ]$.'),
        choice('l9-q08-c', 'النقطة $J$ منتصف $[IS]$.'),
        choice('l9-q08-d', 'النقطة $K$ منتصف $[IJ]$.'),
      ],
      correctChoiceId: 'l9-q08-c',
      explanation: p(
        'بالتعريف، كون $S$ صورة $I$ وفق التناظر الذي مركزه $J$ يعني أنَّ المركز $J$ هو منتصف القطعة الواصلة $[IS]$، فيصبح $[JK]$ ماراً بمنتصف $[IS]$ وموازياً $[ST]$ في المثلث $IST$.',
      ),
    },
  ],
};
