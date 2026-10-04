import {
  classification,
  errorAnalysis,
  exact,
  figureBlock,
  matching,
  multiSelect,
  numeric,
  ordering,
  singleChoice,
  trueFalse,
} from '../authoring';
import { compassIntersectionFigure } from '../figureScenes';
import type { TestQuestionInput } from '../schema';

/**
 * ============================================================================
 *  BANK — LESSON 2: «صورة نقطة وفق انسحاب» (Textbook pages 8–10)
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
 *      • def-parallelogram (تعريف صورة نقطة وتشكيل متوازي أضلاع): 5
 *      • special-case (الحالة الخاصة عندما تقع النقطة على المستقيم): 4
 *      • compass-construction (الإنشاء بالفرجار والمسطرة): 6
 *      • grid-coordinates (التعيين والقراءة على الشبكة السنتيمترية): 5
 *    Types:
 *      • single-choice:   7
 *      • true-false:      3
 *      • multi-select:    2
 *      • numeric:         2
 *      • exact:           1
 *      • ordering:        1
 *      • matching:        1
 *      • classification:  1
 *      • error-analysis:  2
 * ============================================================================
 */

const LESSON_ID = 'lesson-02-image-of-a-point';
const P8 = { page: 8, locator: 'نشاط الورقة السنتيمترية والبيضاء وتعريف صورة نقطة' };
const P9 = { page: 9, locator: 'الحالة الخاصة وطريقة الإنشاء بالفرجار والتعليل' };
const P10 = { page: 10, locator: 'تحقق من فهمك وتدرب 1 و2 و3' };

export const questions: TestQuestionInput[] = [
  /* ------------------------------------------------------------------ 01 */
  singleChoice({
    id: 'geo-l02-t01-q01',
    lessonId: LESSON_ID,
    concept: 'def-parallelogram',
    difficulty: 'basic',
    prompt: [
      "وفق الانسحاب الذي ينقل $A$ إلى $B$، لتكن $M$ نقطة لا تنتمي إلى المستقيم $(AB)$، وصورتها $M'$. ما الترتيب الدائري الصحيح لرؤوس متوازي الأضلاع الناتج؟",
    ],
    choices: [
      { id: 'opt-a', text: "$ABM'M$" },
      { id: 'opt-b', text: "$ABMM'$" },
      { id: 'opt-c', text: "$AMBM'$" },
      { id: 'opt-d', text: "$MABM'$" },
    ],
    answer: 'opt-a',
    sourceRefs: [P8],
  }),

  /* ------------------------------------------------------------------ 02 */
  trueFalse({
    id: 'geo-l02-t01-q02',
    lessonId: LESSON_ID,
    concept: 'special-case',
    difficulty: 'basic',
    prompt: [
      "إذا كانت النقطة $M$ تنتمي إلى المستقيم $(AB)$، فإن صورتها $M'$ وفق الانسحاب الذي ينقل $A$ إلى $B$ تقع أيضاً على المستقيم $(AB)$ نفسه.",
    ],
    answer: true,
    sourceRefs: [P9],
  }),

  /* ------------------------------------------------------------------ 03 */
  singleChoice({
    id: 'geo-l02-t01-q03',
    lessonId: LESSON_ID,
    concept: 'def-parallelogram',
    difficulty: 'basic',
    prompt: [
      "في متوازي الأضلاع $ABM'M$ الناتج عن صورة النقطة $M$، أيُّ قطعتين من القطع الآتية هما قطراه المتناصفان؟",
    ],
    choices: [
      { id: 'opt-a', text: "$[AM']$ و $[BM]$" },
      { id: 'opt-b', text: "$[AB]$ و $[MM']$" },
      { id: 'opt-c', text: "$[AM]$ و $[BM']$" },
      { id: 'opt-d', text: "$[AM']$ و $[AB]$" },
    ],
    answer: 'opt-a',
    sourceRefs: [P8],
  }),

  /* ------------------------------------------------------------------ 04 */
  numeric({
    id: 'geo-l02-t01-q04',
    lessonId: LESSON_ID,
    concept: 'grid-coordinates',
    difficulty: 'basic',
    prompt: [
      "على شبكة سنتيمترية، انسحاب ينقل النقطة $A$ إلى $B$ بالتحرك $4$ وحدات يميناً و $3$ وحدات للأعلى. إذا كانت النقطة $M$ تقع عند الإحداثي السيني $x = 2$، فما الإحداثي السيني لصورتها $M'$؟",
    ],
    answer: 6,
    tolerance: 0,
    sourceRefs: [P8, P10],
  }),

  /* ------------------------------------------------------------------ 05 */
  singleChoice({
    id: 'geo-l02-t01-q05',
    lessonId: LESSON_ID,
    concept: 'compass-construction',
    difficulty: 'basic',
    prompt: [
      'عند إنشاء صورة نقطة $M$ وفق انسحاب ينقل $G$ إلى $H$ باستخدام الفرجار، ما فتحة الفرجار الأولى لرسم القوس المرتكز عند $M$؟',
    ],
    choices: [
      { id: 'opt-a', text: 'طول القطعة $[GH]$' },
      { id: 'opt-b', text: 'طول القطعة $[GM]$' },
      { id: 'opt-c', text: 'طول القطعة $[HM]$' },
      { id: 'opt-d', text: 'نصف طول القطعة $[GH]$' },
    ],
    answer: 'opt-a',
    sourceRefs: [P9],
  }),

  /* ------------------------------------------------------------------ 06 */
  singleChoice({
    id: 'geo-l02-t01-q06',
    lessonId: LESSON_ID,
    concept: 'def-parallelogram',
    difficulty: 'medium',
    prompt: [
      'إذا كانت $N$ هي صورة $M$ وفق الانسحاب الذي ينقل $P$ إلى $Q$ (حيث $M$ لا تنتمي إلى $(PQ)$)، فإن متوازي الأضلاع الناتج يُسمّى:',
    ],
    choices: [
      { id: 'opt-a', text: '$PQNM$' },
      { id: 'opt-b', text: '$PQMN$' },
      { id: 'opt-c', text: '$PMQN$' },
      { id: 'opt-d', text: '$MPQN$' },
    ],
    answer: 'opt-a',
    sourceRefs: [P8, P10],
  }),

  /* ------------------------------------------------------------------ 07 */
  trueFalse({
    id: 'geo-l02-t01-q07',
    lessonId: LESSON_ID,
    concept: 'special-case',
    difficulty: 'medium',
    prompt: [
      "في الحالة الخاصة ($M$ تنتمي إلى المستقيم $(AB)$)، لا يتشكل متوازي أضلاع حقيقي ذو مساحة، ومع ذلك تبقى القطعتان $[AM']$ و $[BM]$ متناصفتين ولهما المنتصف المشترك نفسه.",
    ],
    answer: true,
    sourceRefs: [P9],
  }),

  /* ------------------------------------------------------------------ 08 */
  multiSelect({
    id: 'geo-l02-t01-q08',
    lessonId: LESSON_ID,
    concept: 'compass-construction',
    difficulty: 'medium',
    prompt: [
      'في الإنشاء بالفرجار لصورة $M$ وفق الانسحاب من $G$ إلى $H$، تتقاطع الدائرتان في نقطتين $X$ و $Y$. على أي أساس نختار إحدى النقطتين ونرفض الأخرى؟ (اختر كل الإجابات الصحيحة)',
      figureBlock(
        compassIntersectionFigure({
          id: 'test-l02-q08-compass-intersections',
          startLabel: 'G',
          endLabel: 'H',
          alt: 'دائرتان إنشائيتان مركزاهما $H$ و$M$ تتقاطعان في النقطتين $X$ و$Y$؛ سهم $GH$ يوضح الاتجاه المعطى، من دون تمييز إحدى النقطتين.',
          caption: 'رسم تخطيطي غير مقيّس يعرض المرشحين $X$ و$Y$ معاً ولا يختار أياً منهما.',
          sourceRefs: [P9],
        }),
      ),
    ],
    choices: [
      {
        id: 'c1',
        text: "نختار النقطة التي تجعل الرباعي $GHM'M$ متوازي أضلاع يحفظ اتجاه السير من $G$ إلى $H$",
      },
      { id: 'c2', text: 'نرفض النقطة التي تقع في الاتجاه المعاكس والتي تشكل رباعياً متشابكاً' },
      { id: 'c3', text: 'نختار دائماً النقطة الأقرب إلى مركز الورقة بغض النظر عن الاتجاه' },
      { id: 'c4', text: 'كلتا نقطتي التقاطع تعطيان صورة صحيحة وفق الانسحاب نفسه' },
    ],
    answers: ['c1', 'c2'],
    sourceRefs: [P9],
  }),

  /* ------------------------------------------------------------------ 09 */
  numeric({
    id: 'geo-l02-t01-q09',
    lessonId: LESSON_ID,
    concept: 'grid-coordinates',
    difficulty: 'medium',
    prompt: [
      "انسحاب ينقل النقطة $A(1, 2)$ إلى النقطة $B(6, 2)$ على شبكة سنتيمترية. ما طول مسار النقطة $M(3, 7)$ إلى صورتها $M'$ بالسنتيمتر؟",
    ],
    answer: 5,
    tolerance: 0,
    unit: 'cm',
    sourceRefs: [P8, P10],
  }),

  /* ------------------------------------------------------------------ 10 */
  matching({
    id: 'geo-l02-t01-q10',
    lessonId: LESSON_ID,
    concept: 'compass-construction',
    difficulty: 'medium',
    prompt: [
      'طابق كل دائرة مرسومة بالفرجار مع نصف قطرها المناسب لإنشاء صورة النقطة $M$ وفق الانسحاب من $A$ إلى $B$:',
    ],
    left: [
      { id: 'l1', text: 'الدائرة الأولى مركزها $M$' },
      { id: 'l2', text: 'الدائرة الثانية مركزها $B$' },
    ],
    right: [
      { id: 'r1', text: 'نصف قطرها يساوي $AB$' },
      { id: 'r2', text: 'نصف قطرها يساوي $AM$' },
    ],
    pairs: { l1: 'r1', l2: 'r2' },
    sourceRefs: [P9],
  }),

  /* ------------------------------------------------------------------ 11 */
  classification({
    id: 'geo-l02-t01-q11',
    lessonId: LESSON_ID,
    concept: 'grid-coordinates',
    difficulty: 'medium',
    prompt: [
      'صنّف الأزواج الآتية من النقاط على شبكة إحداثية، وفقاً لما إذا كان الانسحاب الذي ينقل الأولى إلى الثانية له مسافة $5$ وحدات أم مسافة مختلفة:',
    ],
    categories: [
      { id: 'cat-5', text: 'مسافة الانسحاب تساوي 5 وحدات' },
      { id: 'cat-diff', text: 'مسافة الانسحاب تختلف عن 5 وحدات' },
    ],
    items: [
      { id: 'p1', text: 'من $(0, 0)$ إلى $(3, 4)$' },
      { id: 'p2', text: 'من $(1, 1)$ إلى $(6, 1)$' },
      { id: 'p3', text: 'من $(2, 2)$ إلى $(5, 5)$' },
      { id: 'p4', text: 'من $(0, 5)$ إلى $(0, 0)$' },
    ],
    assignment: {
      p1: 'cat-5',
      p2: 'cat-5',
      p3: 'cat-diff',
      p4: 'cat-5',
    },
    sourceRefs: [P8, P10],
  }),

  /* ------------------------------------------------------------------ 12 */
  ordering({
    id: 'geo-l02-t01-q12',
    lessonId: LESSON_ID,
    concept: 'compass-construction',
    difficulty: 'medium',
    prompt: [
      'رتّب خطوات إنشاء صورة النقطة $M$ وفق الانسحاب من $G$ إلى $H$ باستخدام الفرجار والمسطرة غير المدرجة:',
    ],
    items: [
      { id: 'st1', text: 'نفتح الفرجار بفتحة تساوي $GH$ ونرسم قوساً دائرياً مركزه $M$' },
      { id: 'st2', text: 'نفتح الفرجار بفتحة تساوي $GM$ ونرسم قوساً دائرياً مركزه $H$' },
      { id: 'st3', text: "نحدد نقطة تقاطع القوسين $M'$ التي تجعل الرباعي $GHM'M$ متوازي أضلاع" },
    ],
    answerOrder: ['st1', 'st2', 'st3'],
    sourceRefs: [P9],
  }),

  /* ------------------------------------------------------------------ 13 */
  singleChoice({
    id: 'geo-l02-t01-q13',
    lessonId: LESSON_ID,
    concept: 'def-parallelogram',
    difficulty: 'medium',
    prompt: [
      'إذا كان $ABCD$ متوازي أضلاع مركزه النقطة $O$. ما صورة النقطة $D$ وفق الانسحاب الذي ينقل $A$ إلى $B$؟',
    ],
    choices: [
      { id: 'opt-a', text: 'النقطة $C$' },
      { id: 'opt-b', text: 'النقطة $O$' },
      { id: 'opt-c', text: 'النقطة $A$' },
      { id: 'opt-d', text: 'نقطة جديدة خارج متوازي الأضلاع' },
    ],
    answer: 'opt-a',
    sourceRefs: [P8, P10],
  }),

  /* ------------------------------------------------------------------ 14 */
  exact({
    id: 'geo-l02-t01-q14',
    lessonId: LESSON_ID,
    concept: 'special-case',
    difficulty: 'advanced',
    prompt: [
      "على مستقيم مدرج، النقطة $A$ عند الفاصلة $0$، والنقطة $B$ عند الفاصلة $6$. النقطة $M$ تقع في منتصف القطعة $[AB]$. إذا كانت $M'$ صورة $M$ وفق الانسحاب من $A$ إلى $B$، فما نسبة المسافة $AM'$ إلى المسافة $AB$؟ (اكتب الإجابة ككسر أو عدد عشري)",
    ],
    numerator: 3,
    denominator: 2,
    acceptEquivalentForms: true,
    sourceRefs: [P9],
  }),

  /* ------------------------------------------------------------------ 15 */
  singleChoice({
    id: 'geo-l02-t01-q15',
    lessonId: LESSON_ID,
    concept: 'grid-coordinates',
    difficulty: 'advanced',
    prompt: [
      "على شبكة إحداثية، صورة النقطة $P$ وفق الانسحاب من $A(1, 1)$ إلى $B(4, 5)$ هي النقطة $P'(7, 8)$. ما إحداثيا النقطة الأصلية $P$؟",
    ],
    choices: [
      { id: 'opt-a', text: '$(4, 4)$' },
      { id: 'opt-b', text: '$(10, 12)$' },
      { id: 'opt-c', text: '$(3, 4)$' },
      { id: 'opt-d', text: '$(5, 3)$' },
    ],
    answer: 'opt-a',
    sourceRefs: [P8, P10],
  }),

  /* ------------------------------------------------------------------ 16 */
  errorAnalysis({
    id: 'geo-l02-t01-q16',
    lessonId: LESSON_ID,
    concept: 'compass-construction',
    difficulty: 'advanced',
    prompt: [
      'حاول تلميذ إنشاء صورة نقطة $M$ وفق الانسحاب من $A$ إلى $B$ بالفرجار، فقام بالخطوات الآتية وظهرت معه نقطة خاطئة. أين موضع الخطأ؟',
    ],
    steps: [
      { id: 's1', text: 'الخطوة 1: قاس بفتحة الفرجار المسافة $AB$.' },
      { id: 's2', text: 'الخطوة 2: ركز الفرجار في $B$ بدلاً من $M$ ورسم دائرة نصف قطرها $AB$.' },
      { id: 's3', text: 'الخطوة 3: ركز الفرجار في $M$ ورسم دائرة نصف قطرها $AM$.' },
    ],
    choices: [
      { id: 's1', text: 'الخطأ في الخطوة 1' },
      {
        id: 's2',
        text: 'الخطأ في الخطوة 2: كان يجب ركز الفرجار في $M$ لرسم القوس الأول ذي نصف القطر $AB$',
      },
      { id: 's3', text: 'الخطأ في الخطوة 3 فقط' },
    ],
    answer: 's2',
    sourceRefs: [P9],
  }),

  /* ------------------------------------------------------------------ 17 */
  singleChoice({
    id: 'geo-l02-t01-q17',
    lessonId: LESSON_ID,
    concept: 'compass-construction',
    difficulty: 'advanced',
    prompt: [
      "في التعليل الهندسي للإنشاء بالفرجار لصورة $M$ وفق الانسحاب من $G$ إلى $H$، يُثبت الكتاب أن $GHM'M$ متوازي أضلاع استناداً إلى:",
    ],
    choices: [
      {
        id: 'opt-a',
        text: "تساوي كل ضلعين متقابلين فيه: $MM' = GH$ و $HM' = GM$ لأنها أنصاف أقطار دوائر رُسمت بفتحات الفرجار",
      },
      { id: 'opt-b', text: 'قياس الزوايا بالمنقلة والتأكد من أنها متساوية' },
      { id: 'opt-c', text: 'رسم الأقطار والتأكد من تعامدها' },
      { id: 'opt-d', text: 'تطابق المساحات باستخدام الشبكة' },
    ],
    answer: 'opt-a',
    sourceRefs: [P9],
  }),

  /* ------------------------------------------------------------------ 18 */
  multiSelect({
    id: 'geo-l02-t01-q18',
    lessonId: LESSON_ID,
    concept: 'grid-coordinates',
    difficulty: 'advanced',
    prompt: [
      "إذا علمت أن النقطة $M'$ هي صورة $M$ وفق الانسحاب من $A$ إلى $B$، وكانت النقطة $M''$ هي صورة $M'$ وفق الانسحاب ذاته. أيُّ الجمل الآتية صحيحة حتماً؟ (اختر كل الإجابات الصحيحة)",
    ],
    choices: [
      { id: 'c1', text: "النقاط $M, M', M''$ تقع جميعها على استقامة واحدة" },
      { id: 'c2', text: "النقطة $M'$ هي منتصف القطعة المستقيمة $[MM'']$" },
      { id: 'c3', text: "المسافة $MM'' = 2 \\times AB$" },
      { id: 'c4', text: "المسافة $MM'' = AB$ دائماً" },
    ],
    answers: ['c1', 'c2', 'c3'],
    sourceRefs: [P8, P10],
  }),

  /* ------------------------------------------------------------------ 19 */
  errorAnalysis({
    id: 'geo-l02-t01-q19',
    lessonId: LESSON_ID,
    concept: 'def-parallelogram',
    difficulty: 'thinking',
    prompt: [
      'كتب أحد التلاميذ: «بما أن النقطة $N$ تحقق $MN = AB$ و $(MN) \\parallel (AB)$، فإن $N$ هي حتماً صورة $M$ وفق الانسحاب الذي ينقل $A$ إلى $B$». ما الخلل في هذا الاستنتاج؟',
    ],
    steps: [
      { id: 's1', text: 'التلميذ راعى تساوي الطول والتوازي.' },
      {
        id: 's2',
        text: 'لكنه أهمل شرط الاتجاه: قد تكون $N$ في الاتجاه المعاكس لاتجاه السير من $A$ إلى $B$.',
      },
    ],
    choices: [
      {
        id: 'ch-1',
        text: 'الخلل هو إهمال شرط الاتجاه؛ فالقطعة الموازية والمساوية قد تسير في الاتجاه المعاكس للانسحاب فتكون صورة وفق الانسحاب المعاكس.',
      },
      { id: 'ch-2', text: 'لا يوجد أي خلل، كلام التلميذ كافٍ وقطعي رياضياً.' },
      { id: 'ch-3', text: 'الخلل أن التوازي لا يلزم في متوازي الأضلاع.' },
    ],
    answer: 'ch-1',
    sourceRefs: [P8, P9],
  }),

  /* ------------------------------------------------------------------ 20 */
  trueFalse({
    id: 'geo-l02-t01-q20',
    lessonId: LESSON_ID,
    concept: 'special-case',
    difficulty: 'thinking',
    prompt: [
      "إذا كانت $M$ تنتمي إلى القطعة المستقيمة $[AB]$، وكانت $M'$ صورتها وفق الانسحاب من $A$ إلى $B$، فإن طول القطعة $[BM']$ يساوي دائماً طول القطعة $[AM]$.",
    ],
    answer: true,
    sourceRefs: [P9],
  }),
];
