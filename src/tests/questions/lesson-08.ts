import {
  choicePart,
  classification,
  errorAnalysis,
  exact,
  figureBlock,
  fillIn,
  fillInBlank,
  matching,
  multiSelect,
  numeric,
  ordering,
  singleChoice,
  testFigure,
  trueFalse,
} from '../authoring';
import type { TestQuestionInput } from '../schema';

/**
 * ============================================================================
 *  BANK — LESSON 8: «منتصفا ضلعين في المثلث» (صفحات ٣١–٣٣)
 * ============================================================================
 *
 *  BLUEPRINT (contract verified by src/tests/audit.test.ts):
 *    Total questions: 20
 *    Difficulty:  basic 5 · medium 8 · advanced 5 · thinking 2
 *    Coverage:
 *      • midline-theorem        (المبرهنة وصياغتها وشروطها): 6
 *      • midline-computation    (حساب الأطوال والنسب):        4
 *      • proof-and-construction (البرهان والنقطة المساعدة):   4
 *      • applications-figures   (تطبيقات مركّبة وأشكال):       6
 *    Types:
 *      • single-choice: 5   • true-false: 3   • numeric: 3
 *      • matching: 2        • multi-select: 2 • exact: 1
 *      • fill-in: 1         • ordering: 1     • classification: 1
 *      • error-analysis: 1
 *
 *  Two questions carry a figure, because the spatial configuration is the
 *  question: the five side-midpoints of «تحقّق من فهمك» (figure required) and
 *  the rectangle circumscribed by a circle (figure beneficial). Both are built
 *  from `lesson-08-geometry.ts`, so no coordinate is typed twice.
 * ============================================================================
 */

const LESSON_ID = 'lesson-08-triangle-midpoints';
const S31 = { page: 31, locator: 'النشاط' } as const;
const S32 = { page: 32, locator: 'تعلّم — المبرهنة الأولى في المنتصفات' } as const;
const S33 = { page: 33, locator: 'تحقّق من فهمك' } as const;
const S33P = { page: 33, locator: 'تدرّب' } as const;

export const questions: TestQuestionInput[] = [
  /* ------------------------------------------------------------------ 01 */
  singleChoice({
    id: 'geo-l08-t01-q01',
    lessonId: LESSON_ID,
    concept: 'midline-theorem',
    difficulty: 'basic',
    prompt: [
      'في مثلث $ABC$، النقطة $M$ منتصف $[AB]$ والنقطة $N$ منتصف $[AC]$. أي زوج من العبارتين صحيح دائماً؟',
    ],
    choices: [
      { id: 'opt-a', text: '$(MN) \\parallel (BC)$ و$MN = \\frac{1}{2}\\,BC$' },
      { id: 'opt-b', text: '$(MN) \\parallel (BC)$ و$MN = 2\\,BC$' },
      { id: 'opt-c', text: '$(MN) \\perp (BC)$ و$MN = \\frac{1}{2}\\,BC$' },
      { id: 'opt-d', text: '$(MN) \\parallel (AB)$ و$MN = \\frac{1}{2}\\,AB$' },
    ],
    answer: 'opt-a',
    sourceRefs: [S32],
  }),

  /* ------------------------------------------------------------------ 02 */
  trueFalse({
    id: 'geo-l08-t01-q02',
    lessonId: LESSON_ID,
    concept: 'midline-theorem',
    difficulty: 'basic',
    prompt: ['المستقيم المار بمنتصفي ضلعين في مثلث يوازي الضلع الثالث.'],
    answer: true,
    sourceRefs: [S32],
  }),

  /* ------------------------------------------------------------------ 03 */
  numeric({
    id: 'geo-l08-t01-q03',
    lessonId: LESSON_ID,
    concept: 'midline-computation',
    difficulty: 'basic',
    prompt: [
      'في مثلث $ABC$، $M$ منتصف $[AB]$ و$N$ منتصف $[AC]$، والضلع $BC = 16\\,\\mathrm{cm}$. ما طول $MN$ بالسنتيمتر؟',
    ],
    answer: 8,
    tolerance: 0,
    unit: 'cm',
    sourceRefs: [S32],
  }),

  /* ------------------------------------------------------------------ 04 */
  singleChoice({
    id: 'geo-l08-t01-q04',
    lessonId: LESSON_ID,
    concept: 'midline-computation',
    difficulty: 'basic',
    prompt: [
      'في مثلث $ABC$، $M$ منتصف $[AB]$ و$N$ منتصف $[AC]$، و$MN = 6\\,\\mathrm{cm}$. ما طول $BC$ بالسنتيمتر؟',
    ],
    choices: [
      { id: 'opt-a', text: '$3$' },
      { id: 'opt-b', text: '$6$' },
      { id: 'opt-c', text: '$12$' },
      { id: 'opt-d', text: '$24$' },
    ],
    answer: 'opt-c',
    sourceRefs: [S32],
  }),

  /* ------------------------------------------------------------------ 05 */
  matching({
    id: 'geo-l08-t01-q05',
    lessonId: LESSON_ID,
    concept: 'midline-theorem',
    difficulty: 'basic',
    prompt: ['طابق كل عنصر في العمود الأول بما يناسبه في العمود الثاني.'],
    left: [
      { id: 'l-1', text: 'وضع المستقيم المار بالمنتصفين' },
      { id: 'l-2', text: 'طول القطعة الواصلة بين المنتصفين' },
      { id: 'l-3', text: 'شرط انطباق المبرهنة' },
    ],
    right: [
      { id: 'r-1', text: 'يوازي الضلع الثالث' },
      { id: 'r-2', text: 'يساوي نصف الضلع الثالث' },
      { id: 'r-3', text: 'منتصفان على ضلعين مختلفين' },
    ],
    pairs: { 'l-1': 'r-1', 'l-2': 'r-2', 'l-3': 'r-3' },
    sourceRefs: [S32],
  }),

  /* ------------------------------------------------------------------ 06 */
  numeric({
    id: 'geo-l08-t01-q06',
    lessonId: LESSON_ID,
    concept: 'midline-computation',
    difficulty: 'medium',
    prompt: [
      'في مثلث $ABC$، $M$ منتصف $[AB]$ و$N$ منتصف $[AC]$، و$MN = 3.5\\,\\mathrm{cm}$. ما طول $BC$ بالسنتيمتر؟',
    ],
    answer: 7,
    tolerance: 0,
    unit: 'cm',
    sourceRefs: [S32],
  }),

  /* ------------------------------------------------------------------ 07 */
  singleChoice({
    id: 'geo-l08-t01-q07',
    lessonId: LESSON_ID,
    concept: 'midline-computation',
    difficulty: 'medium',
    prompt: [
      'في مثلث $ABC$، $M$ منتصف $[AB]$ و$N$ منتصف $[AC]$، و$MN = 5\\,\\mathrm{cm}$، و$AB = 12\\,\\mathrm{cm}$، و$AC = 14\\,\\mathrm{cm}$. ما طول $BC$ بالسنتيمتر؟',
    ],
    choices: [
      { id: 'opt-a', text: '$5$' },
      { id: 'opt-b', text: '$7$' },
      { id: 'opt-c', text: '$10$' },
      { id: 'opt-d', text: '$13$' },
    ],
    answer: 'opt-c',
    sourceRefs: [S32],
  }),

  /* ------------------------------------------------------------------ 08 */
  trueFalse({
    id: 'geo-l08-t01-q08',
    lessonId: LESSON_ID,
    concept: 'midline-theorem',
    difficulty: 'medium',
    prompt: [
      'إذا كان في مثلث $ABC$: $MN = \\frac{1}{2}\\,BC$، فإنَّ $M$ منتصف $[AB]$ و$N$ منتصف $[AC]$ بالضرورة.',
    ],
    answer: false,
    sourceRefs: [S32],
  }),

  /* ------------------------------------------------------------------ 09 */
  fillIn({
    id: 'geo-l08-t01-q09',
    lessonId: LESSON_ID,
    concept: 'midline-theorem',
    difficulty: 'medium',
    prompt: [
      'أكمل الفراغين: المستقيم المار بمنتصفي ضلعين في مثلث يوازي الضلع .............. ، والقطعة الواصلة بينهما تساوي .............. الضلع الثالث.',
    ],
    blanks: [
      fillInBlank({
        id: 'blank-third',
        label: 'الضلع الذي يوازيه المستقيم',
        acceptedAnswers: ['الثالث', 'الضلع الثالث', 'third'],
      }),
      fillInBlank({
        id: 'blank-half',
        label: 'مقدار القطعة من الضلع الثالث',
        acceptedAnswers: ['نصف', 'نصف طول', 'النصف'],
      }),
    ],
    sourceRefs: [S32],
  }),

  /* ------------------------------------------------------------------ 10 */
  exact({
    id: 'geo-l08-t01-q10',
    lessonId: LESSON_ID,
    concept: 'midline-theorem',
    difficulty: 'medium',
    prompt: [
      'في مثلث $ABC$، $M$ منتصف $[AB]$ و$N$ منتصف $[AC]$. ما قيمة النسبة $\\dfrac{MN}{BC}$؟',
    ],
    numerator: 1,
    denominator: 2,
    acceptEquivalentForms: true,
    sourceRefs: [S32],
  }),

  /* ------------------------------------------------------------------ 11 */
  multiSelect({
    id: 'geo-l08-t01-q11',
    lessonId: LESSON_ID,
    concept: 'applications-figures',
    difficulty: 'medium',
    prompt: [
      'في مثلث $ABC$، $M$ منتصف $[AB]$ و$N$ منتصف $[AC]$. اختر كل العبارات الصحيحة.',
    ],
    choices: [
      { id: 'opt-a', text: '$(MN) \\parallel (BC)$' },
      { id: 'opt-b', text: '$MN = \\frac{1}{2}\\,BC$' },
      { id: 'opt-c', text: '$MN = \\frac{1}{2}\\,AB$' },
      { id: 'opt-d', text: '$(MN) \\parallel (AB)$' },
      { id: 'opt-e', text: '$MN + BC = 3\\,MN$' },
    ],
    answers: ['opt-a', 'opt-b', 'opt-e'],
    sourceRefs: [S32],
  }),

  /* ------------------------------------------------------------------ 12 */
  ordering({
    id: 'geo-l08-t01-q12',
    lessonId: LESSON_ID,
    concept: 'proof-and-construction',
    difficulty: 'medium',
    prompt: ['رتّب خطوات برهان مبرهنة منتصفَي ضلعين بالترتيب الصحيح.'],
    items: [
      { id: 'step-1', text: 'عيّن $K$ نظيرة $M$ بالنسبة إلى $N$.' },
      {
        id: 'step-2',
        text: 'استنتج أنَّ $AMCK$ متوازي أضلاع، لأنَّ قطرَيه $[AC]$ و$[MK]$ متناصفان عند $N$.',
      },
      {
        id: 'step-3',
        text: 'استنتج أنَّ $MBCK$ متوازي أضلاع، لأنَّ $(CK) \\parallel (MB)$ و$CK = MB$.',
      },
      {
        id: 'step-4',
        text: 'استنتج $(MN) \\parallel (BC)$ و$MN = \\frac{1}{2}\\,BC$.',
      },
    ],
    answerOrder: ['step-1', 'step-2', 'step-3', 'step-4'],
    sourceRefs: [S31],
  }),

  /* ------------------------------------------------------------------ 13 */
  singleChoice({
    id: 'geo-l08-t01-q13',
    lessonId: LESSON_ID,
    concept: 'proof-and-construction',
    difficulty: 'medium',
    prompt: [
      'في برهان مبرهنة منتصفَي ضلعين، لماذا يكون الرباعي $AMCK$ متوازي أضلاع؟',
    ],
    choices: [
      { id: 'opt-a', text: 'لأنَّ قطرَيه $[AC]$ و$[MK]$ متناصفان عند $N$.' },
      { id: 'opt-b', text: 'لأنَّ أضلاعه الأربعة متساوية.' },
      { id: 'opt-c', text: 'لأنَّ زاويتين متقابلتان فيه متساويتان.' },
      { id: 'opt-d', text: 'لأنَّه يبدو كذلك في الرسم.' },
    ],
    answer: 'opt-a',
    sourceRefs: [S31],
  }),

  /* ------------------------------------------------------------------ 14 */
  trueFalse({
    id: 'geo-l08-t01-q14',
    lessonId: LESSON_ID,
    concept: 'proof-and-construction',
    difficulty: 'advanced',
    prompt: [
      'يستعمل برهان المبرهنة نقطة مساعدة $K$ تُنشأ بحيث تكون $N$ منتصف $[MK]$، ثم متوازيَي أضلاع متتاليين.',
    ],
    answer: true,
    sourceRefs: [S31],
  }),

  /* ------------------------------------------------------------------ 15 */
  classification({
    id: 'geo-l08-t01-q15',
    lessonId: LESSON_ID,
    concept: 'applications-figures',
    difficulty: 'advanced',
    prompt: ['صنّف كل عبارة: هل هي معطى أو خاصية كافية، أم نتيجة للمبرهنة، أم عبارة غير صحيحة؟'],
    categories: [
      { id: 'cat-given', text: 'معطى أو خاصية كافية' },
      { id: 'cat-result', text: 'نتيجة المبرهنة' },
      { id: 'cat-false', text: 'عبارة غير صحيحة' },
    ],
    items: [
      { id: 'item-1', text: 'إذا تناصف قطرا رباعي فهو متوازي أضلاع.' },
      { id: 'item-2', text: '$MN = \\frac{1}{2}\\,BC$ في مثلث منتصفاه $M$ و$N$.' },
      { id: 'item-3', text: '$(MN) \\perp (BC)$ في مثلث منتصفاه $M$ و$N$.' },
      { id: 'item-4', text: '$M$ منتصف $[AB]$.' },
      { id: 'item-5', text: '$MN = 2\\,BC$ في مثلث منتصفاه $M$ و$N$.' },
    ],
    assignment: {
      'item-1': 'cat-given',
      'item-2': 'cat-result',
      'item-3': 'cat-false',
      'item-4': 'cat-given',
      'item-5': 'cat-false',
    },
    sourceRefs: [S31],
  }),

  /* ------------------------------------------------------------------ 16 */
  numeric({
    id: 'geo-l08-t01-q16',
    lessonId: LESSON_ID,
    concept: 'applications-figures',
    difficulty: 'advanced',
    prompt: [
      figureBlock(
        testFigure({
          id: 'test-l08-q16-rectangle-midpoints',
          alt: 'المستطيل $ABCD$، والنقطة $O$ مركزه، والنقاط $E$ و$F$ و$G$ و$H$ منتصفات أضلاعه، والرباعي $EFGH$ مرسوم.',
          caption: 'رسم تخطيطي غير مقيّس؛ القيم المعطاة في نص السؤال فقط.',
          sourceRefs: [S33P],
          spec: {
            points: [
              { id: 'A', x: 1, y: 4, labelSide: 'nw' },
              { id: 'B', x: 6, y: 4, labelSide: 'ne' },
              { id: 'C', x: 6, y: 1, labelSide: 'se' },
              { id: 'D', x: 1, y: 1, labelSide: 'sw' },
              { id: 'E', x: 3.5, y: 4, labelSide: 'n' },
              { id: 'F', x: 6, y: 2.5, labelSide: 'e' },
              { id: 'G', x: 3.5, y: 1, labelSide: 's' },
              { id: 'H', x: 1, y: 2.5, labelSide: 'w' },
              { id: 'O', x: 3.5, y: 2.5, labelSide: 'n', mark: 'open' },
            ],
            polygons: [
              { points: ['A', 'B', 'C', 'D'] },
              { points: ['E', 'F', 'G', 'H'], fill: true },
            ],
            questionLabels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'O'],
          },
        }),
      ),
      'مستطيل $ABCD$ مركزه $O$ مرسوم داخل دائرة نصف قطرها $5\\,\\mathrm{cm}$، والنقاط $E$ و$F$ و$G$ و$H$ منتصفات أضلاعه. ما محيط الرباعي $EFGH$ بالسنتيمتر؟',
    ],
    answer: 20,
    tolerance: 0,
    unit: 'cm',
    sourceRefs: [S33P],
  }),

  /* ------------------------------------------------------------------ 17 */
  matching({
    id: 'geo-l08-t01-q17',
    lessonId: LESSON_ID,
    concept: 'applications-figures',
    difficulty: 'advanced',
    prompt: [
      figureBlock(
        testFigure({
          id: 'test-l08-q17-five-midpoints',
          alt: 'المثلثان $ABC$ و$ADC$ يشتركان في الضلع $[AC]$، والنقاط $J$ و$K$ و$L$ و$M$ و$N$ منتصفات أضلاعهما، ولا تُرسم أي قطعة بينها.',
          caption: 'رسم تخطيطي غير مقيّس؛ لا يُظهر أي قطعة من القطع المطلوب مطابقتها.',
          sourceRefs: [S33],
          spec: {
            points: [
              { id: 'A', x: 3, y: 6, labelSide: 'n' },
              { id: 'B', x: 0, y: 0, labelSide: 'sw' },
              { id: 'C', x: 5, y: 0, labelSide: 's' },
              { id: 'D', x: 8, y: 3, labelSide: 'se' },
              { id: 'J', x: 1.5, y: 3, labelSide: 'nw' },
              { id: 'K', x: 4, y: 3, labelSide: 'ne' },
              { id: 'L', x: 2.5, y: 0, labelSide: 's' },
              { id: 'M', x: 5.5, y: 4.5, labelSide: 'ne' },
              { id: 'N', x: 6.5, y: 1.5, labelSide: 's' },
            ],
            polygons: [
              { points: ['A', 'B', 'C'] },
              { points: ['A', 'C', 'D'] },
            ],
            questionLabels: ['A', 'B', 'C', 'D', 'J', 'K', 'L', 'M', 'N'],
          },
        }),
      ),
      'المثلثان $ABC$ و$ADC$ يشتركان في $[AC]$، والنقاط $J$ و$K$ و$L$ و$M$ و$N$ منتصفات أضلاعهما كما في الشكل. طابق كل قطعة من قطع المنتصفين مع الضلع الموازي لها. قد يتكرر الضلع نفسه في العمود الثاني.',
    ],
    left: [
      { id: 'seg-jk', text: '$[JK]$' },
      { id: 'seg-kn', text: '$[KN]$' },
      { id: 'seg-ln', text: '$[LN]$' },
      { id: 'seg-jm', text: '$[JM]$' },
    ],
    right: [
      { id: 'side-bc', text: '$[BC]$' },
      { id: 'side-ad', text: '$[AD]$' },
      { id: 'side-bd', text: '$[BD]$' },
    ],
    pairs: {
      'seg-jk': 'side-bc',
      'seg-kn': 'side-ad',
      'seg-ln': 'side-bd',
      'seg-jm': 'side-bd',
    },
    allowReuse: true,
    sourceRefs: [S33],
  }),

  /* ------------------------------------------------------------------ 18 */
  multiSelect({
    id: 'geo-l08-t01-q18',
    lessonId: LESSON_ID,
    concept: 'applications-figures',
    difficulty: 'advanced',
    prompt: ['أي العبارات صحيحة عن برهان مبرهنة منتصفَي ضلعين؟'],
    choices: [
      { id: 'opt-a', text: 'يستعمل نقطة مساعدة $K$ تُنشأ لجعل $N$ منتصف $[MK]$.' },
      { id: 'opt-b', text: 'يعتمد على خاصية تناصف قطري متوازي الأضلاع.' },
      { id: 'opt-c', text: 'يعتمد على قياس الزاوية عند $A$ في كل حالة.' },
      { id: 'opt-d', text: 'يصلح للمثلث القائم وحده.' },
      { id: 'opt-e', text: 'ينتهي باستعمال $MK = 2\\,MN$ و$MK = BC$ للوصول إلى النصفية.' },
    ],
    answers: ['opt-a', 'opt-b', 'opt-e'],
    sourceRefs: [S31],
  }),

  /* ------------------------------------------------------------------ 19 */
  errorAnalysis({
    id: 'geo-l08-t01-q19',
    lessonId: LESSON_ID,
    concept: 'proof-and-construction',
    difficulty: 'thinking',
    prompt: [
      'كتب تلميذ البرهان الآتي. حدّد الخطوة التي تحتوي الخطأ، ثم اختر التصحيح والتعليل.',
    ],
    steps: [
      { id: 'step-1', text: 'المعطى: $M$ منتصف $[AB]$ و$N$ منتصف $[AC]$.' },
      { id: 'step-2', text: 'إذن $(MN) \\parallel (BC)$.' },
      { id: 'step-3', text: 'وبالتالي $MN = BC$.' },
    ],
    choices: [
      { id: 'opt-1', text: 'الخطوة 1' },
      { id: 'opt-2', text: 'الخطوة 2' },
      { id: 'opt-3', text: 'الخطوة 3' },
    ],
    answer: 'opt-3',
    correction: choicePart({
      id: 'correction',
      prompt: ['ما التصحيح الصحيح للخطوة 3؟'],
      choices: [
        { id: 'fix-a', text: '$MN = \\frac{1}{2}\\,BC$' },
        { id: 'fix-b', text: '$MN = 2\\,BC$' },
        { id: 'fix-c', text: '$MN = BC$ كما هي' },
      ],
      answer: 'fix-a',
    }),
    justification: choicePart({
      id: 'justification',
      prompt: ['لماذا؟'],
      choices: [
        { id: 'why-a', text: 'لأنَّ المبرهنة تعطي نصف الضلع الثالث لا مساواته.' },
        { id: 'why-b', text: 'لأنَّ $[MN]$ أطول من $[BC]$.' },
        { id: 'why-c', text: 'لأنَّ $M$ و$N$ منتصفا الضلعين نفسهما.' },
      ],
      answer: 'why-a',
    }),
    sourceRefs: [S31, S32],
  }),

  /* ------------------------------------------------------------------ 20 */
  singleChoice({
    id: 'geo-l08-t01-q20',
    lessonId: LESSON_ID,
    concept: 'applications-figures',
    difficulty: 'thinking',
    prompt: ['أي جملة تصف بدقة دور الرسم في هذا الدرس؟'],
    choices: [
      {
        id: 'opt-a',
        text: 'الرسم يثبت التوازي إذا رُسم بدقة كافية، فلا حاجة إلى برهان.',
      },
      {
        id: 'opt-b',
        text: 'الرسم يساعد على الملاحظة وبناء الحدس، والبرهان وحده يثبت الخاصية.',
      },
      {
        id: 'opt-c',
        text: 'الرسم لا يفيد شيئاً في الهندسة، ولا يُستعمل إلا للزينة.',
      },
      {
        id: 'opt-d',
        text: 'يكفي التحقق من الخاصية في مثلث واحد لتعميمها على كل المثلثات.',
      },
    ],
    answer: 'opt-b',
    sourceRefs: [S31],
  }),
];
