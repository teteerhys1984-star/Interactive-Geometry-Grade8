import {
  choicePart,
  classification,
  errorAnalysis,
  exact,
  figureBlock,
  matching,
  multiSelect,
  numeric,
  ordering,
  singleChoice,
  testFigure,
  trueFalseJustify,
} from '../authoring';
import type { TestQuestionInput } from '../schema';

/**
 * ============================================================================
 *  BANK — LESSON 3: «صورة شكل وفق انسحاب» (Textbook pages 11–16)
 * ============================================================================
 *
 *  BLUEPRINT (Contract verified by src/tests/audit.test.ts):
 *    Total questions: 20
 *    Difficulty:
 *      • basic:    5
 *      • medium:   8
 *      • advanced: 5
 *      • thinking: 2
 *    Coverage:
 *      • image-line-segment (صورة مستقيم وقطعة مستقيمة ونصف مستقيم): 5
 *      • image-parallel-perp (صورة مستقيمين متوازيين أو متعامدين): 4
 *      • image-circle-polygon (صورة دائرة ومستطيل ومثلث ومضلعات): 6
 *      • construction-applications (الإنشاءات الهندسية والتطبيقات الحسابية): 5
 *    Types:
 *      • single-choice:      7
 *      • true-false-justify: 3  (two verdict + reason, one verdict + correction)
 *      • multi-select:       2
 *      • numeric:            2
 *      • exact:              1
 *      • ordering:           1
 *      • matching:           1  (three pairs, one point per pair)
 *      • classification:     1
 *      • error-analysis:     2  (each with independently scored correction + reason)
 *    Engine maximum: 31 points.
 *
 *  SOURCE NOTE: every item is anchored to the verified Lesson 3 content records
 *  for printed pages 11–16 (`src/content/units/lesson-03-image-of-a-shape.ts`)
 *  and to the original crop inventory in `docs/LESSON-03-FIGURES.md`. The
 *  questions are assessment items authored for this platform — they are not
 *  copied textbook exercises, and every numerical value chosen by the platform
 *  is labelled as such in the detailed solution.
 * ============================================================================
 */

const LESSON_ID = 'lesson-03-image-of-a-shape';
const P11 = { page: 11, locator: 'نشاط تخمين صورة مستقيم وإثبات التوازي' };
const P12 = { page: 12, locator: 'تعلّم صورة مستقيم وإنشاء الصورة بالفرجار' };
const P13 = { page: 13, locator: 'صور المستقيمين المتوازيين والمتعامدين وصورة قطعة' };
const P14 = { page: 14, locator: 'صورة نصف مستقيم ودائرة واكتساب معارف' };
const P15 = { page: 15, locator: 'مثال المربع وتحقّق من فهمك' };
const P16 = { page: 16, locator: 'تدرّب 1 و2 و3 و4' };

export const questions: TestQuestionInput[] = [
  /* ------------------------------------------------------------------ 01 */
  singleChoice({
    id: 'geo-l03-t01-q01',
    lessonId: LESSON_ID,
    concept: 'image-line-segment',
    difficulty: 'basic',
    prompt: ['أيُّ العبارات الآتية صحيحة دائماً في شأن صورة المستقيم $(d)$ وفق انسحاب؟'],
    choices: [
      { id: 'opt-a', text: "المستقيم $(d')$ يوازي $(d)$ أو ينطبق عليه." },
      { id: 'opt-b', text: "المستقيم $(d')$ يعامد $(d)$." },
      { id: 'opt-c', text: 'نصف مستقيم مبدؤه صورة إحدى نقاط $(d)$.' },
      { id: 'opt-d', text: 'قطعة مستقيمة طولها يساوي طول متجهة الانسحاب.' },
    ],
    answer: 'opt-a',
    sourceRefs: [P11, P12],
  }),

  /* ------------------------------------------------------------------ 02 */
  trueFalseJustify({
    id: 'geo-l03-t01-q02',
    lessonId: LESSON_ID,
    concept: 'image-line-segment',
    difficulty: 'basic',
    prompt: [
      "صورة القطعة المستقيمة $[MN]$ وفق انسحاب هي قطعة مستقيمة $[M'N']$ توازي $[MN]$، وطولها يساوي طول $[MN]$.",
    ],
    answer: true,
    justification: choicePart({
      id: 'reason',
      prompt: ['اختر التعليل الصحيح للحكم:'],
      choices: [
        {
          id: 'preserve',
          text: 'الانسحاب يحفظ الأطوال، وصورة المستقيم أو القطعة توازي أصلها.',
        },
        { id: 'double', text: 'لأن الانسحاب يضاعف طول كل قطعة كلما كبرت مسافته.' },
        { id: 'fixed', text: 'لأن النقطتين $M$ و$N$ تبقىان في مكانهما بعد الانسحاب.' },
      ],
      answer: 'preserve',
    }),
    sourceRefs: [P13],
  }),

  /* ------------------------------------------------------------------ 03 */
  singleChoice({
    id: 'geo-l03-t01-q03',
    lessonId: LESSON_ID,
    concept: 'image-circle-polygon',
    difficulty: 'basic',
    prompt: [
      "دائرة $\\mathcal{C}$ مركزها $O$ ونصف قطرها $R$. صورتها وفق انسحاب هي الدائرة $\\mathcal{C}'$. ما مركز الدائرة $\\mathcal{C}'$ ونصف قطرها؟",
    ],
    choices: [
      { id: 'opt-a', text: "مركزها $O'$ صورة $O$، ونصف قطرها $R$." },
      { id: 'opt-b', text: 'مركزها $O$ نفسه، ونصف قطرها $R$.' },
      { id: 'opt-c', text: "مركزها $O'$، ونصف قطرها $R+OO'$." },
      { id: 'opt-d', text: 'مركزها نقطة من محيط $\\mathcal{C}$، ونصف قطرها $R$.' },
    ],
    answer: 'opt-a',
    sourceRefs: [P14],
  }),

  /* ------------------------------------------------------------------ 04 */
  numeric({
    id: 'geo-l03-t01-q04',
    lessonId: LESSON_ID,
    concept: 'image-circle-polygon',
    difficulty: 'basic',
    prompt: [
      'مستطيل مساحته $35\\ \\mathrm{cm}^2$. صُوِّر وفق انسحاب فنتج مستطيل جديد. ما مساحة المستطيل الناتج بالسنتيمتر المربع؟',
    ],
    answer: 35,
    tolerance: 0,
    unit: 'cm²',
    sourceRefs: [P14, P16],
  }),

  /* ------------------------------------------------------------------ 05 */
  singleChoice({
    id: 'geo-l03-t01-q05',
    lessonId: LESSON_ID,
    concept: 'image-parallel-perp',
    difficulty: 'basic',
    prompt: ['صورة مستقيمين متعامدين وفق انسحاب هما:'],
    choices: [
      { id: 'opt-a', text: 'مستقيمان متعامدان.' },
      { id: 'opt-b', text: 'مستقيمان متوازيان.' },
      { id: 'opt-c', text: 'مستقيمان متقاطعان بزاوية $45^\\circ$.' },
      { id: 'opt-d', text: 'مستقيم واحد منطبق على الآخر.' },
    ],
    answer: 'opt-a',
    sourceRefs: [P13],
  }),

  /* ------------------------------------------------------------------ 06 */
  singleChoice({
    id: 'geo-l03-t01-q06',
    lessonId: LESSON_ID,
    concept: 'image-line-segment',
    difficulty: 'medium',
    prompt: ['متى تنطبق صورة المستقيم $(d)$ وفق انسحاب على المستقيم $(d)$ نفسه؟'],
    choices: [
      { id: 'opt-a', text: 'عندما يكون اتجاه الانسحاب موازياً للمستقيم $(d)$.' },
      { id: 'opt-b', text: 'عندما يكون اتجاه الانسحاب عمودياً على المستقيم $(d)$.' },
      {
        id: 'opt-c',
        text: 'عندما تكون مسافة الانسحاب أكبر من طول أي قطعة مرسومة على $(d)$.',
      },
      { id: 'opt-d', text: 'لا يمكن أن تنطبق صورة مستقيم على المستقيم نفسه أبداً.' },
    ],
    answer: 'opt-a',
    sourceRefs: [P12, P13],
  }),

  /* ------------------------------------------------------------------ 07 */
  trueFalseJustify({
    id: 'geo-l03-t01-q07',
    lessonId: LESSON_ID,
    concept: 'image-parallel-perp',
    difficulty: 'medium',
    prompt: [
      "إذا كان $(d_1)\\perp(d_2)$، وكانت $(d_1')$ و$(d_2')$ صورتيهما وفق الانسحاب نفسه، فإن $(d_1')\\parallel(d_2')$.",
    ],
    answer: false,
    correction: choicePart({
      id: 'correction',
      prompt: ['اختر التصحيح الصحيح للعبارة:'],
      choices: [
        {
          id: 'perp',
          text: 'الصورتان متعامدتان، لأن الانسحاب يحفظ قياس الزوايا ومنها القائمة.',
        },
        { id: 'acute', text: 'الصورتان متقاطعتان بزاوية $45^\\circ$.' },
        { id: 'coincide', text: 'الصورتان تنطبقان على المستقيمين الأصليين.' },
      ],
      answer: 'perp',
    }),
    sourceRefs: [P13],
  }),

  /* ------------------------------------------------------------------ 08 */
  multiSelect({
    id: 'geo-l03-t01-q08',
    lessonId: LESSON_ID,
    concept: 'image-circle-polygon',
    difficulty: 'medium',
    prompt: [
      "مثلث $ABC$ متساوي الأضلاع طول ضلعه $5\\ \\mathrm{cm}$. صُوِّر وفق انسحاب فكانت صورته المثلث $A'B'C'$. أيُّ العبارات الآتية صحيحة؟ (اختر كل الإجابات الصحيحة)",
    ],
    choices: [
      {
        id: 'c1',
        text: "المثلث $A'B'C'$ متساوي الأضلاع، وطول كل ضلع فيه $5\\ \\mathrm{cm}$.",
      },
      { id: 'c2', text: "قياس كل زاوية من زوايا $A'B'C'$ يساوي $60^\\circ$." },
      { id: 'c3', text: "كل ضلع من أضلاع $A'B'C'$ يوازي نظيره في $ABC$." },
      { id: 'c4', text: "مساحة $A'B'C'$ ضعف مساحة $ABC$." },
    ],
    answers: ['c1', 'c2', 'c3'],
    sourceRefs: [P14, P16],
  }),

  /* ------------------------------------------------------------------ 09 */
  numeric({
    id: 'geo-l03-t01-q09',
    lessonId: LESSON_ID,
    concept: 'construction-applications',
    difficulty: 'medium',
    prompt: [
      'دائرة نصف قطرها $4\\ \\mathrm{cm}$. ما محيط صورتها وفق انسحاب، بدلالة $\\pi$؟ (اكتب معامل $\\pi$ فقط)',
    ],
    answer: 8,
    tolerance: 0,
    sourceRefs: [P14],
  }),

  /* ------------------------------------------------------------------ 10 */
  matching({
    id: 'geo-l03-t01-q10',
    lessonId: LESSON_ID,
    concept: 'image-line-segment',
    difficulty: 'medium',
    prompt: ['طابق كل شكل هندسي مع وصف صورته وفق انسحاب:'],
    left: [
      { id: 'l-ray', text: 'نصف مستقيم $[Mx)$' },
      { id: 'l-seg', text: 'قطعة مستقيمة $[MN]$' },
      { id: 'l-cir', text: 'دائرة مركزها $O$ ونصف قطرها $r$' },
    ],
    right: [
      { id: 'r-ray', text: 'نصف مستقيم يوازي $[Mx)$ وله الاتجاه نفسه.' },
      { id: 'r-seg', text: 'قطعة مستقيمة توازي $[MN]$ وطولها $MN$.' },
      { id: 'r-cir', text: "دائرة مركزها $O'$ صورة $O$، ونصف قطرها $r$." },
    ],
    pairs: { 'l-ray': 'r-ray', 'l-seg': 'r-seg', 'l-cir': 'r-cir' },
    sourceRefs: [P13, P14],
  }),

  /* ------------------------------------------------------------------ 11 */
  classification({
    id: 'geo-l03-t01-q11',
    lessonId: LESSON_ID,
    concept: 'image-parallel-perp',
    difficulty: 'medium',
    prompt: ['صنّف كل عبارة بحسب علاقة الصورة بالأصل:'],
    categories: [
      { id: 'cat-parallel', text: 'الصورة توازي الأصل دائماً.' },
      { id: 'cat-not-parallel', text: 'الصورة لا توازي الأصل بالضرورة.' },
    ],
    items: [
      { id: 'i1', text: 'صورة مستقيم وفق أي انسحاب' },
      { id: 'i2', text: 'صورة قطعة مستقيمة وفق أي انسحاب' },
      { id: 'i3', text: 'صورة مستقيم وفق دوران بزاوية $90^\\circ$' },
      { id: 'i4', text: 'صورة نصف مستقيم وفق أي انسحاب' },
    ],
    assignment: {
      i1: 'cat-parallel',
      i2: 'cat-parallel',
      i3: 'cat-not-parallel',
      i4: 'cat-parallel',
    },
    sourceRefs: [P12, P13, P14],
  }),

  /* ------------------------------------------------------------------ 12 */
  ordering({
    id: 'geo-l03-t01-q12',
    lessonId: LESSON_ID,
    concept: 'construction-applications',
    difficulty: 'medium',
    prompt: ['رتّب خطوات إنشاء صورة المستقيم $(d)$ وفق انسحاب معلوم باستخدام الفرجار والمسطرة:'],
    items: [
      {
        id: 's1',
        text: 'نختار نقطتين متمايزتين $M$ و$N$ تنتميان إلى المستقيم $(d)$.',
      },
      {
        id: 's2',
        text: "ننشئ بالفرجار النقطتين $M'$ و$N'$ صورتي $M$ و$N$ وفق الانسحاب.",
      },
      {
        id: 's3',
        text: "نرسم المستقيم المار بالنقطتين $M'$ و$N'$، فيكون هو صورة المستقيم $(d)$.",
      },
    ],
    answerOrder: ['s1', 's2', 's3'],
    sourceRefs: [P14],
  }),

  /* ------------------------------------------------------------------ 13 */
  singleChoice({
    id: 'geo-l03-t01-q13',
    lessonId: LESSON_ID,
    concept: 'image-circle-polygon',
    difficulty: 'medium',
    prompt: [
      "نقطة $A$ وصورتها $A'$، ونقطة $B$ وصورتها $B'$، وفق الانسحاب نفسه، واتجاه الانسحاب غير موازٍ للمستقيم $(AB)$. ما طبيعة الشكل الرباعي $ABB'A'$؟",
    ],
    choices: [
      { id: 'opt-a', text: 'متوازي أضلاع.' },
      { id: 'opt-b', text: 'مستطيل دائماً.' },
      { id: 'opt-c', text: 'معيّن دائماً.' },
      { id: 'opt-d', text: 'شبه منحرف لا غير.' },
    ],
    answer: 'opt-a',
    sourceRefs: [P13, P16],
  }),

  /* ------------------------------------------------------------------ 14 */
  exact({
    id: 'geo-l03-t01-q14',
    lessonId: LESSON_ID,
    concept: 'construction-applications',
    difficulty: 'advanced',
    prompt: [
      "القطعة $[MN]$ طولها $3.4\\ \\mathrm{cm}$، ونُقلت بانسحاب طول متجهته $2\\ \\mathrm{cm}$ في اتجاه غير موازٍ للمستقيم $(MN)$. ما محيط الشكل الرباعي $MNN'M'$ بالسنتيمتر؟ (اكتب كسراً أو عدداً عشرياً)",
    ],
    numerator: 54,
    denominator: 5,
    acceptEquivalentForms: true,
    sourceRefs: [P12, P16],
  }),

  /* ------------------------------------------------------------------ 15 */
  singleChoice({
    id: 'geo-l03-t01-q15',
    lessonId: LESSON_ID,
    concept: 'image-parallel-perp',
    difficulty: 'advanced',
    prompt: [
      "مستقيمان $(d_1)$ و$(d_2)$ متقاطعان في النقطة $I$. صُوِّرا بالانسحاب نفسه فنتج المستقيمان $(d_1')$ و$(d_2')$. في أي نقطة يتقاطع المستقيمان $(d_1')$ و$(d_2')$؟",
    ],
    choices: [
      { id: 'opt-a', text: "في النقطة $I'$ صورة النقطة $I$ وفق هذا الانسحاب." },
      {
        id: 'opt-b',
        text: 'في النقطة $I$ نفسها، لأن نقطة تقاطع المستقيمين لا تتغير بالانسحاب.',
      },
      { id: 'opt-c', text: 'لا يتقاطعان، بل يصيران متوازيين.' },
      { id: 'opt-d', text: "في منتصف القطعة $[II']$." },
    ],
    answer: 'opt-a',
    sourceRefs: [P13, P15],
  }),

  /* ------------------------------------------------------------------ 16 */
  errorAnalysis({
    id: 'geo-l03-t01-q16',
    lessonId: LESSON_ID,
    concept: 'construction-applications',
    difficulty: 'advanced',
    prompt: [
      'طُلب إنشاء صورة الدائرة $\\mathcal{C}$ مركزها $O$ ونصف قطرها $r$ وفق انسحاب، فعيّن أحد التلاميذ النقطة $K$ على محيطها واتخذها مركزاً للصورة. الحل المعروض أدناه يحتوي على خطأ. حدّد موضع الخطأ، ثم اختر التصحيح والتعليل.',
      figureBlock(
        testFigure({
          id: 'test-l03-q16-circle-center-and-rim',
          alt: 'دائرة تخطيطية بمركز غير مسمى ونقطة $K$ موضوعة على محيطها؛ لا تظهر صورة الدائرة المنقولة.',
          caption: 'تمثيل للدائرة الأصلية والنقطة $K$ على محيطها كما يذكر السؤال؛ الرسم غير مقيّس.',
          sourceRefs: [P14, P15],
          spec: {
            points: [
              { id: 'center', x: 0, y: 0, showLabel: false, mark: 'cross' },
              { id: 'K', x: 2.4, y: 1.8, labelSide: 'ne' },
            ],
            circles: [{ center: 'center', radius: 3 }],
            questionLabels: ['K'],
          },
        }),
      ),
    ],
    steps: [
      { id: 's1', text: 'نُعيِّن النقطة $K$ على محيط الدائرة $\\mathcal{C}$.' },
      { id: 's2', text: 'نرسم دائرة مركزها $K$ ونصف قطرها $r$.' },
      { id: 's3', text: 'نعدّ الدائرة الناتجة صورة الدائرة $\\mathcal{C}$ وفق الانسحاب.' },
    ],
    choices: [
      {
        id: 'ch-centre',
        text: "الخطوة 2: اتُّخذت النقطة $K$، وهي نقطة من المحيط، مركزاً للصورة بدل $O'$ صورة المركز $O$.",
      },
      { id: 'ch-radius', text: 'الخطوة 2: نُقل نصف القطر خطأً، وكان يجب تغييره.' },
      {
        id: 'ch-none',
        text: 'لا يوجد خطأ؛ صورة الدائرة دائرة مركزها أي نقطة من محيط الدائرة الأصلية.',
      },
    ],
    answer: 'ch-centre',
    correction: choicePart({
      id: 'correction',
      prompt: ['اختر التصحيح الكامل للحل:'],
      choices: [
        {
          id: 'centre-o-image',
          text: "نعيّن $O'$ صورة $O$، ثم نرسم دائرة مركزها $O'$ ونصف قطرها $r$.",
        },
        { id: 'centre-k', text: 'نبقي المركز $K$ على المحيط ونصحّح نصف القطر فقط.' },
        { id: 'centre-o', text: 'نرسم دائرة مركزها $O$ نفسه ونصف قطرها $r$.' },
      ],
      answer: 'centre-o-image',
    }),
    justification: choicePart({
      id: 'reason',
      prompt: ['اختر التعليل الصحيح:'],
      choices: [
        {
          id: 'image-of-centre',
          text: "صورة الدائرة هي مجموعة صور نقاطها، وصورة مركزها $O$ هي $O'$، والانسحاب يحفظ نصف القطر.",
        },
        { id: 'rim-centre', text: 'كل نقطة من المحيط تصبح مركزاً لدائرة جديدة مساوية.' },
        { id: 'radius-doubles', text: 'الانسحاب يضاعف نصف القطر، فيتغيّر المركز تبعاً لذلك.' },
      ],
      answer: 'image-of-centre',
    }),
    sourceRefs: [P14, P15],
  }),

  /* ------------------------------------------------------------------ 17 */
  singleChoice({
    id: 'geo-l03-t01-q17',
    lessonId: LESSON_ID,
    concept: 'image-circle-polygon',
    difficulty: 'advanced',
    prompt: [
      "دائرتان $\\mathcal{C}_1$ و$\\mathcal{C}_2$ متماستان في النقطة $T$. صُوِّرتا بالانسحاب نفسه فنتجت الدائرتان $\\mathcal{C}_1'$ و$\\mathcal{C}_2'$. ما وضع الدائرتين الجديدتين؟",
    ],
    choices: [
      { id: 'opt-a', text: "متماستان في النقطة $T'$ صورة $T$." },
      { id: 'opt-b', text: 'متقاطعتان في نقطتين.' },
      { id: 'opt-c', text: 'متباعدتان لا تشتركان في أي نقطة.' },
      { id: 'opt-d', text: 'متحدتان في المركز نفسه.' },
    ],
    answer: 'opt-a',
    sourceRefs: [P14, P15],
  }),

  /* ------------------------------------------------------------------ 18 */
  multiSelect({
    id: 'geo-l03-t01-q18',
    lessonId: LESSON_ID,
    concept: 'image-line-segment',
    difficulty: 'advanced',
    prompt: [
      "المستقيم $(d')$ هو صورة المستقيم $(d)$ وفق انسحاب. أيُّ الخصائص الآتية محققة دائماً؟ (اختر كل الإجابات الصحيحة)",
    ],
    choices: [
      { id: 'c1', text: "$(d')\\parallel(d)$ أو $(d')=(d)$." },
      { id: 'c2', text: "إذا كانت $M\\in(d)$ فإن صورتها $M'$ تنتمي إلى $(d')$." },
      { id: 'c3', text: "البعد العمودي بين $(d)$ و$(d')$ ثابت على طول المستقيمين." },
      { id: 'c4', text: "$(d')\\perp(d)$ دائماً." },
    ],
    answers: ['c1', 'c2', 'c3'],
    sourceRefs: [P12, P13],
  }),

  /* ------------------------------------------------------------------ 19 */
  errorAnalysis({
    id: 'geo-l03-t01-q19',
    lessonId: LESSON_ID,
    concept: 'construction-applications',
    difficulty: 'thinking',
    prompt: [
      "زعم تلميذ: «إذا كان $(d)$ و$(d')$ مستقيمين متوازيين ومتمايزين، فلا يوجد إلا انسحاب واحد ينقل $(d)$ إلى $(d')$». حلّل الزعم، ثم اختر التصحيح والتعليل.",
    ],
    steps: [
      {
        id: 's1',
        text: 'المسافة بين المستقيمين المتوازيين ثابتة، وهي وحدها ما يحدد الانسحاب.',
      },
      {
        id: 's2',
        text: 'إذن متجهة الانسحاب محددة تحديداً تاماً بالاتجاه العمودي على المستقيمين.',
      },
      { id: 's3', text: "إذن يوجد انسحاب واحد فقط ينقل $(d)$ إلى $(d')$." },
    ],
    choices: [
      {
        id: 'ch-many',
        text: "الخطوة 3: الزعم خاطئ؛ لكل نقطة $B$ على $(d')$ انسحاب ينقل نقطة $A$ من $(d)$ إليها، فتوجد انسحابات غير منتهية.",
      },
      { id: 'ch-none', text: 'لا يوجد خطأ؛ الزعم صحيح تماماً.' },
      {
        id: 'ch-direction',
        text: 'الخطوة 1: الانسحاب المطلوب هو الموازي للمستقيمين، والعمودي غير ممكن.',
      },
    ],
    answer: 'ch-many',
    correction: choicePart({
      id: 'correction',
      prompt: ['اختر التصحيح الصحيح للزعم:'],
      choices: [
        {
          id: 'any-pair',
          text: "يوجد انسحاب لكل زوج من النقطتين $A\\in(d)$ و$B\\in(d')$، ومنها انسحابات مائلة غير عمودية.",
        },
        { id: 'perpendicular-only', text: 'الانسحاب الوحيد هو العمودي على المستقيمين.' },
        { id: 'none', text: "لا يوجد أي انسحاب ينقل $(d)$ إلى $(d')$." },
      ],
      answer: 'any-pair',
    }),
    justification: choicePart({
      id: 'reason',
      prompt: ['اختر التعليل الصحيح:'],
      choices: [
        {
          id: 'same-set',
          text: "صورة $(d)$ هي المستقيم المار بـ$B$ والموازي لـ$(d)$، وهو $(d')$ نفسه أياً كان موضع $B$ عليها؛ فيتعدد الانسحاب.",
        },
        { id: 'distance-fixes', text: 'لأن المسافة بين المستقيمين تحدد الانسحاب تحديداً تاماً.' },
        {
          id: 'right-angle',
          text: 'لأن الزاوية بين الانسحاب والمستقيم يجب أن تكون قائمة، وهذا يعطي حلاً واحداً.',
        },
      ],
      answer: 'same-set',
    }),
    sourceRefs: [P11, P12],
  }),

  /* ------------------------------------------------------------------ 20 */
  trueFalseJustify({
    id: 'geo-l03-t01-q20',
    lessonId: LESSON_ID,
    concept: 'image-circle-polygon',
    difficulty: 'thinking',
    prompt: [
      "مستطيل $ABCD$، والانسحاب ينقل $A$ إلى $C$، فتصبح صورة المستطيل هي $A'B'C'D'$. صورة المستطيل مستطيل يطابق $ABCD$، ومساحته تساوي مساحته، وكل ضلع فيه يوازي ضلعاً في $ABCD$.",
    ],
    answer: true,
    justification: choicePart({
      id: 'reason',
      prompt: ['اختر التعليل الصحيح للحكم:'],
      choices: [
        {
          id: 'preserve',
          text: 'الانسحاب يحفظ الأطوال والزوايا والاتجاهات، فالصورة مستطيل مطابق وأضلاعه موازية لأضلاع الأصل.',
        },
        {
          id: 'same-vertices',
          text: 'لأن الصورة تشترك مع المستطيل الأصلي في الرؤوس نفسها فتطابقه.',
        },
        { id: 'equal-area', text: 'لأن تساوي المساحتين وحده يكفي ليطابق الشكلان.' },
      ],
      answer: 'preserve',
    }),
    sourceRefs: [P14, P16],
  }),
];
