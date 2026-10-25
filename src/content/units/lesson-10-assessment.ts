import type { AssessmentInput, ContentBlock } from '../schema';

const p = (text: string): ContentBlock[] => [{ type: 'paragraph', text }];
const choice = (id: string, text: string) => ({ id, blocks: p(text) });

/**
 * ============================================================================
 *  UNIT 2, LESSON 3 — IN-LESSON FINAL ASSESSMENT
 * ============================================================================
 *
 *  Formative 8-question check inside the lesson flow (`origin: 'authored'`),
 *  covering the three in-lesson assessment types (`multiple-choice`,
 *  `true-false`, `numeric`) and the page 36–38 objectives: the equal-ratio
 *  property, its parallelism hypothesis, cross-multiplication computations,
 *  and the midpoint special case.
 * ============================================================================
 */
export const lesson10Assessment: AssessmentInput = {
  id: 'assessment-10-parallel-lines-transversals',
  title: 'الاختبار النهائي — مستقيمات متوازية وقاطعان',
  passingScore: 75,
  instructions:
    'أجب عن الأسئلة الثمانية الآتية للتحقّق من استيعابك لخاصة التناسب بين أطوال أضلاع المثلثين وطرائق حساب الأطوال باستعمال مبرهنة النسب المتساوية.',
  questions: [
    {
      id: 'l10-q01-property-core',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'صياغة خاصة التناسب وتحديد النسب المتساوية الثلاث',
      prompt: p(
        'في المثلث $ABC$، $M \\in [AB]$ و$N \\in [AC]$ و$(MN) \\parallel (BC)$. أيّ تساوٍ للنسب ينتج مباشرةً عن خاصة الدرس؟',
      ),
      choices: [
        choice('l10-q01-a', '$\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}$'),
        choice('l10-q01-b', '$\\frac{AM}{MB} = \\frac{AN}{NC} = 1$'),
        choice('l10-q01-c', '$AM = AN$ و$MB = NC$'),
        choice('l10-q01-d', '$\\frac{AM}{AN} = \\frac{BC}{MN}$'),
      ],
      correctChoiceId: 'l10-q01-a',
      explanation: p(
        'القاطعان $(AB)$ و$(AC)$ يقطعان المتوازيين $(MN)$ و$(BC)$، فتتناسب أطوال أضلاع المثلث الصغير $AMN$ مع نظائرها في المثلث الكبير $ABC$: $\\frac{AM}{AB}=\\frac{AN}{AC}=\\frac{MN}{BC}$. الخطأ الشائع قلب النسبة الثانية أو افتراض تساوي الأطوال لا تناسبها.',
      ),
    },
    {
      id: 'l10-q02-missing-parallel',
      type: 'true-false',
      origin: 'authored',
      skill: 'التحقّق من شرط التوازي في فرضية الخاصة',
      prompt: p(
        'في المثلث $EFG$، نقطة $H$ من $[EF]$ ونقطة $K$ من $[EG]$ من دون أي شرط توازٍ. الجدول الذي يربط أطوال $EHK$ بأطوال $EFG$ يكون دائماً جدول تناسب.',
      ),
      answer: false,
      explanation: p(
        'لا يتحقّق التناسب إلا إذا كان $(HK) \\parallel (FG)$. مجرد وقوع النقطتين على الضلعين لا يكفي، كما يوضّح السؤال 2 من نشاط الصفحة 36 عند إمالة المستقيم.',
      ),
    },
    {
      id: 'l10-q03-correspondence',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'مراسلة الأضلاع المتناظرة بين المثلثين',
      prompt: p(
        'في المثلث $ARS$، $M \\in [AR]$ و$N \\in [AS]$ و$(MN) \\parallel (RS)$. الضلع $[AN]$ في المثلث الصغير يناظر أيّ ضلع في المثلث الكبير؟',
      ),
      choices: [
        choice('l10-q03-a', 'الضلع $[AS]$'),
        choice('l10-q03-b', 'الضلع $[AR]$'),
        choice('l10-q03-c', 'الضلع $[RS]$'),
        choice('l10-q03-d', 'الضلع $[MN]$'),
      ],
      correctChoiceId: 'l10-q03-a',
      explanation: p(
        'النقطة $N$ تقع على الضلع $[AS]$، فالقطعة $[AN]$ جزء من $[AS]$ وبهذا تكونان ضلعين متناظرين؛ وكذلك $[AM]$ يناظر $[AR]$ و$[MN]$ يناظر $[RS]$.',
      ),
    },
    {
      id: 'l10-q04-basic-numeric',
      type: 'numeric',
      origin: 'authored',
      skill: 'حساب ضلع كامل من نسبة معلومة',
      prompt: p(
        'في المثلث $ABC$، $(MN) \\parallel (BC)$ و$\\frac{AM}{AB} = \\frac{2}{5}$. إذا كان $AN = 4\\,\\mathrm{cm}$، فما طول الضلع $AC$ بالسنتيمتر؟',
      ),
      answer: 10,
      tolerance: 0,
      unit: 'cm',
      explanation: p(
        'حسب الخاصة $\\frac{AN}{AC} = \\frac{AM}{AB} = \\frac{2}{5}$، ومنه $AC = \\frac{5 \\times 4}{2} = 10\\,\\mathrm{cm}$.',
      ),
    },
    {
      id: 'l10-q05-midpoint-special-case',
      type: 'true-false',
      origin: 'authored',
      skill: 'ربط الخاصة العامة بمبرهنتي المنتصفات (نسبة النصف)',
      prompt: p(
        'إذا كانت $M$ منتصف $[AB]$ و$(MN) \\parallel (BC)$ مع $N \\in [AC]$، فإنّ خاصة هذا الدرس تعطي $\\frac{AN}{AC} = \\frac{1}{2}$ و$MN = \\frac{1}{2}\\,BC$.',
      ),
      answer: true,
      explanation: p(
        'عند $\\frac{AM}{AB}=\\frac{1}{2}$ تصبح النسب الثلاث جميعها $\\frac{1}{2}$، فتعود النتيجة إلى مبرهنتي المنتصفات في الدرسين السابقين.',
      ),
    },
    {
      id: 'l10-q06-cross-multiplication',
      type: 'numeric',
      origin: 'authored',
      skill: 'الضرب التبادلي لحساب طول مجهول على غرار المثالين المطبوعين',
      prompt: p(
        'في المثلث $ARS$، $(MN) \\parallel (RS)$ و$AM = 3$ و$AR = 9$ و$AN = 4$. ما طول القطعة $AS$؟',
      ),
      answer: 12,
      tolerance: 0,
      explanation: p(
        '$\\frac{AM}{AR} = \\frac{AN}{AS}$ أي $\\frac{3}{9} = \\frac{4}{AS}$، وبالضرب التبادلي $AS = \\frac{9 \\times 4}{3} = 12$.',
      ),
    },
    {
      id: 'l10-q07-ratio-direction',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'تمييز اتجاه النسبة وتفادي قلب المقامات',
      prompt: p(
        'في المثلث $JKL$، $(MN) \\parallel (KL)$ و$M \\in [JK]$ و$N \\in [JL]$. أيّ المعادلات الآتية صحيحة لاستنتاج طول $MN$ من طول $KL$؟',
      ),
      choices: [
        choice('l10-q07-a', '$\\frac{MN}{KL} = \\frac{JM}{JK}$'),
        choice('l10-q07-b', '$\\frac{MN}{KL} = \\frac{JK}{JM}$'),
        choice('l10-q07-c', '$\\frac{MN}{KL} = \\frac{JN}{NL}$'),
        choice('l10-q07-d', '$MN = KL - JM$'),
      ],
      correctChoiceId: 'l10-q07-a',
      explanation: p(
        'الضلعان المتوازيان $[MN]$ و$[KL]$ متناظران، فنسبتهما كنسبة الجزء $[JM]$ إلى الضلع الكامل $[JK]$؛ قلب البسط والمقام يعطي نسبة أكبر من الواحد خلافاً لكون $MN$ أقصر من $KL$.',
      ),
    },
    {
      id: 'l10-q08-check-page38',
      type: 'numeric',
      origin: 'authored',
      skill: 'تطبيق رقمي على وضعية «تحقّق من فهمك»',
      prompt: p(
        'في المثلث $ABC$، $(EF) \\parallel (BC)$ و$E \\in [AB]$ و$F \\in [AC]$، و$AE = 3$ و$AF = 4$ و$AC = 12$. ما طول الضلع $AB$؟',
      ),
      answer: 9,
      tolerance: 0,
      explanation: p(
        'النسبة المشتركة $\\frac{AF}{AC} = \\frac{4}{12} = \\frac{1}{3}$، ومنه $\\frac{AE}{AB} = \\frac{1}{3}$ أي $AB = 3 \\times 3 = 9$، ثم $EB = AB - AE = 6$.',
      ),
    },
  ],
};
