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
  testFigure,
  trueFalse,
} from '../authoring';
import { compassIntersectionFigure } from '../figureScenes';
import type { TestQuestionInput } from '../schema';

/**
 * ============================================================================
 *  BANK — UNIT 1: «متوازيات الأضلاع والانسحاب» (Comprehensive 60 Questions)
 * ============================================================================
 *
 *  BLUEPRINT (Contract verified by src/tests/audit.test.ts):
 *    Total questions: 60
 *    Difficulty:
 *      • basic:    15
 *      • medium:   25
 *      • advanced: 14
 *      • thinking: 6
 *    Coverage by Lesson Domain:
 *      • u1-translation-properties (الدرس 1): 10
 *      • u1-image-point (الدرس 2): 10
 *      • u1-image-shape (الدرس 3): 10
 *      • u1-triangle-congruence (الدرس 4): 10
 *      • u1-exercises-part1 (الدرس 5): 7
 *      • u1-exercises-part2 (الدرس 6): 7
 *      • u1-exercises-part3 (الدرس 7): 6
 *    Types:
 *      • single-choice:   21
 *      • true-false:      9
 *      • multi-select:    6
 *      • numeric:         6
 *      • exact:           3
 *      • ordering:        3
 *      • matching:        3
 *      • classification:  3
 *      • error-analysis:  6
 * ============================================================================
 */

const L1 = 'lesson-01-translation-and-properties';
const L2 = 'lesson-02-image-of-a-point';
const L3 = 'lesson-03-image-of-a-shape';
const L4 = 'lesson-04-triangle-congruence';
const L5 = 'lesson-05-unit-one-exercises';
const L6 = 'lesson-06-unit-one-exercises-continuation';
const L7 = 'lesson-07-unit-one-exercises-final';

const S1 = [{ page: '5–7', locator: 'الوحدة الأولى — الدرس 1' }];
const S2 = [{ page: '8–10', locator: 'الوحدة الأولى — الدرس 2' }];
const S3 = [{ page: '11–16', locator: 'الوحدة الأولى — الدرس 3' }];
const S4 = [{ page: '17–19', locator: 'الوحدة الأولى — الدرس 4' }];
const S5 = [{ page: '20', locator: 'الوحدة الأولى — الدرس 5' }];
const S6 = [{ page: '20–21', locator: 'الوحدة الأولى — الدرس 6' }];
const S7 = [{ page: '21–23', locator: 'الوحدة الأولى — الدرس 7' }];

export const questions: TestQuestionInput[] = [
  /* =========================================================================
   * DOMAIN 1: Lesson 1 — «الانسحاب وخواصه» (10 Questions: Q01–Q10)
   * ======================================================================= */
  singleChoice({
    id: 'geo-u01-t01-q01',
    lessonId: L1,
    concept: 'u1-translation-properties',
    difficulty: 'basic',
    prompt: ['الانسحاب تحويل هندسي يحافظ على أربعة عناصر أساسية هي:'],
    choices: [
      { id: 'a', text: 'الأطوال، والاستقامة، وقياس الزوايا، والمساحات' },
      { id: 'b', text: 'الأطوال والمحيط فقط، مع تغيير قياس الزوايا' },
      { id: 'c', text: 'المساحات فقط، دون حفظ الاستقامة' },
      { id: 'd', text: 'الشكل العام فقط مع مضاعفة الأبعاد' },
    ],
    answer: 'a',
    sourceRefs: S1,
  }),

  trueFalse({
    id: 'geo-u01-t01-q02',
    lessonId: L1,
    concept: 'u1-translation-properties',
    difficulty: 'basic',
    prompt: [
      'الانسحاب يحفظ استقامة النقاط، فإذا كانت ثلاث نقاط على استقامة واحدة كانت صورها على استقامة واحدة أيضاً.',
    ],
    answer: true,
    sourceRefs: S1,
  }),

  singleChoice({
    id: 'geo-u01-t01-q03',
    lessonId: L1,
    concept: 'u1-translation-properties',
    difficulty: 'basic',
    prompt: ['ما الشرط الفاصل الذي يميز صورة شكل بانسحاب عن صورته بدوران مع المحافظة على التطابق؟'],
    choices: [
      { id: 'a', text: 'بقاء كل ضلع موازياً لنظيره الأصلي بالانسحاب' },
      { id: 'b', text: 'تساوي أطوال الأضلاع فقط' },
      { id: 'c', text: 'تساوي المساحتين فقط' },
      { id: 'd', text: 'وجود زاوية قائمة' },
    ],
    answer: 'a',
    sourceRefs: S1,
  }),

  numeric({
    id: 'geo-u01-t01-q04',
    lessonId: L1,
    concept: 'u1-translation-properties',
    difficulty: 'medium',
    prompt: [
      'مثلث مساحته $42\\ \\mathrm{cm}^2$. صُوِّر بانسحاب مسافته $9\\ \\mathrm{cm}$. ما مساحة المثلث الناتج بالسنتيمتر المربع؟',
    ],
    answer: 42,
    tolerance: 0,
    unit: 'cm²',
    sourceRefs: S1,
  }),

  multiSelect({
    id: 'geo-u01-t01-q05',
    lessonId: L1,
    concept: 'u1-translation-properties',
    difficulty: 'medium',
    prompt: [
      "في انسحاب ينقل $A$ إلى $B$، لتكن $M$ نقطة كيفية وصورتها $M'$. أيُّ العبارات الآتية صحيحة حتماً؟ (اختر كل الإجابات الصحيحة)",
    ],
    choices: [
      { id: 'c1', text: "$MM' = AB$" },
      { id: 'c2', text: "$(MM') \\parallel (AB)$" },
      { id: 'c3', text: "المسار $[MM']$ له نفس اتجاه المسار $[AB]$" },
      { id: 'c4', text: "$AM = BM'$ وزاويتهما قائمة دائماً" },
    ],
    answers: ['c1', 'c2', 'c3'],
    sourceRefs: S1,
  }),

  ordering({
    id: 'geo-u01-t01-q06',
    lessonId: L1,
    concept: 'u1-translation-properties',
    difficulty: 'medium',
    prompt: ['رتّب خطوات الحكم على شكلين لمعرفة ما إذا كان الثاني صورة الأول وفق انسحاب:'],
    items: [
      { id: 's1', text: 'التحقق من تطابق الأطوال وقياسات الزوايا' },
      { id: 's2', text: 'التحقق من توازي الأضلاع المتناظرة وعدم دوران الشكل' },
      { id: 's3', text: 'التحقق من وحدة اتجاه ومسافة انتقال الرؤوس جميعاً' },
    ],
    answerOrder: ['s1', 's2', 's3'],
    sourceRefs: S1,
  }),

  matching({
    id: 'geo-u01-t01-q07',
    lessonId: L1,
    concept: 'u1-translation-properties',
    difficulty: 'medium',
    prompt: ['طابق كل خاصية حفظ مع التعبير الرياضي المعبر عنها:'],
    left: [
      { id: 'l1', text: 'حفظ الأطوال' },
      { id: 'l2', text: 'حفظ قياس الزوايا' },
    ],
    right: [
      { id: 'r1', text: "$M'N' = MN$" },
      { id: 'r2', text: "$\\widehat{A'B'C'} = \\widehat{ABC}$" },
    ],
    pairs: { l1: 'r1', l2: 'r2' },
    sourceRefs: S1,
  }),

  exact({
    id: 'geo-u01-t01-q08',
    lessonId: L1,
    concept: 'u1-translation-properties',
    difficulty: 'advanced',
    prompt: [
      "شبه منحرف مساحته $18\\ \\mathrm{cm}^2$. صُوِّر بانسحاب فنتج شبه منحرف مساحته $S'$. ما النسبة بين مساحة الصورة ومساحة الأصل؟",
    ],
    numerator: 1,
    denominator: 1,
    acceptEquivalentForms: true,
    sourceRefs: S1,
  }),

  errorAnalysis({
    id: 'geo-u01-t01-q09',
    lessonId: L1,
    concept: 'u1-translation-properties',
    difficulty: 'advanced',
    prompt: [
      'حلّل الخطأ في القول: «الانسحاب الذي ينقل $A$ إلى $B$ هو نفسه الذي ينقل $B$ إلى $A$ لأن طول $AB = BA$».',
    ],
    steps: [
      { id: 's1', text: 'المسافة متساوية فعلاً لأن $AB = BA$.' },
      {
        id: 's2',
        text: 'لكن الانسحاب يعتمد على المسافة والاتجاه معاً؛ والاتجاهان هنا متعاكسان تماماً.',
      },
    ],
    choices: [
      { id: 'c-err', text: 'الخطأ هو إهمال شرط الاتجاه؛ فهما انسحابان متعاكسان ومختلفان.' },
      { id: 'c-ok', text: 'القول صحيح' },
    ],
    answer: 'c-err',
    sourceRefs: S1,
  }),

  trueFalse({
    id: 'geo-u01-t01-q10',
    lessonId: L1,
    concept: 'u1-translation-properties',
    difficulty: 'thinking',
    prompt: [
      'لا يمكن لأي انسحاب أن يثبت نقطة واحدة فقط من المستوي دون باقي النقاط (إما أن يحرك كل النقاط أو يثبتها جميعاً كالتحويل المحايد).',
    ],
    answer: true,
    sourceRefs: S1,
  }),

  /* =========================================================================
   * DOMAIN 2: Lesson 2 — «صورة نقطة وفق انسحاب» (10 Questions: Q11–Q20)
   * ======================================================================= */
  singleChoice({
    id: 'geo-u01-t01-q11',
    lessonId: L2,
    concept: 'u1-image-point',
    difficulty: 'basic',
    prompt: [
      "القول إن $M'$ هي صورة $M$ (غير الواقعة على $(AB)$) وفق الانسحاب من $A$ إلى $B$ يعني أن الرباعي $ABM'M$ هو:",
    ],
    choices: [
      { id: 'a', text: 'متوازي أضلاع' },
      { id: 'b', text: 'مستطيل' },
      { id: 'c', text: 'شبه منحرف' },
      { id: 'd', text: 'معين' },
    ],
    answer: 'a',
    sourceRefs: S2,
  }),

  trueFalse({
    id: 'geo-u01-t01-q12',
    lessonId: L2,
    concept: 'u1-image-point',
    difficulty: 'basic',
    prompt: [
      "في الحالة الخاصة ($M$ تنتمي إلى المستقيم $(AB)$)، تكون النقاط $A, B, M', M$ جميعها على استقامة واحدة.",
    ],
    answer: true,
    sourceRefs: S2,
  }),

  singleChoice({
    id: 'geo-u01-t01-q13',
    lessonId: L2,
    concept: 'u1-image-point',
    difficulty: 'basic',
    prompt: ["ما القطعتان المتناصفتان في متوازي الأضلاع $ABM'M$؟"],
    choices: [
      { id: 'a', text: "$[AM']$ و $[BM]$" },
      { id: 'b', text: "$[AB]$ و $[MM']$" },
      { id: 'c', text: "$[AM]$ و $[BM']$" },
      { id: 'd', text: "$[AB]$ و $[AM']$" },
    ],
    answer: 'a',
    sourceRefs: S2,
  }),

  numeric({
    id: 'geo-u01-t01-q14',
    lessonId: L2,
    concept: 'u1-image-point',
    difficulty: 'medium',
    prompt: ['انسحاب ينقل $A(2, 3)$ إلى $B(5, 7)$. ما مسافة هذا الانسحاب (طول المسار) بالوحدات؟'],
    answer: 5,
    tolerance: 0,
    sourceRefs: S2,
  }),

  multiSelect({
    id: 'geo-u01-t01-q15',
    lessonId: L2,
    concept: 'u1-image-point',
    difficulty: 'medium',
    prompt: [
      'عند إنشاء صورة نقطة $M$ بالفرجار وفق الانسحاب من $G$ إلى $H$، نرسم دائرتين. ما هما؟ (اختر كل الإجابات الصحيحة)',
    ],
    choices: [
      { id: 'c1', text: 'دائرة مركزها $M$ ونصف قطرها $GH$' },
      { id: 'c2', text: 'دائرة مركزها $H$ ونصف قطرها $GM$' },
      { id: 'c3', text: 'دائرة مركزها $G$ ونصف قطرها $10\\ \\mathrm{cm}$ دائماً' },
      { id: 'c4', text: 'دائرة مركزها $H$ ونصف قطرها $GH$' },
    ],
    answers: ['c1', 'c2'],
    sourceRefs: S2,
  }),

  classification({
    id: 'geo-u01-t01-q16',
    lessonId: L2,
    concept: 'u1-image-point',
    difficulty: 'medium',
    prompt: ['صنّف مواضع النقاط بالنسبة لمستقيم الانسحاب $(AB)$:'],
    categories: [
      { id: 'gen', text: 'حالة عامة (تشكل متوازي أضلاع)' },
      { id: 'spec', text: 'حالة خاصة (نقاط على استقامة واحدة)' },
    ],
    items: [
      { id: 'p1', text: 'نقطة $M$ تقع خارج المستقيم $(AB)$' },
      { id: 'p2', text: 'نقطة $M$ تنتمي إلى المستقيم $(AB)$' },
      { id: 'p3', text: 'نقطة $M$ هي منتصف القطعة $[AB]$' },
    ],
    assignment: { p1: 'gen', p2: 'spec', p3: 'spec' },
    sourceRefs: S2,
  }),

  singleChoice({
    id: 'geo-u01-t01-q17',
    lessonId: L2,
    concept: 'u1-image-point',
    difficulty: 'advanced',
    prompt: [
      'إذا كان $ABCD$ متوازي أضلاع مركزه $M$. وفق الانسحاب الذي ينقل $M$ إلى $A$، ما هي صورة النقطة $C$؟',
    ],
    choices: [
      { id: 'a', text: 'النقطة $M$' },
      { id: 'b', text: 'النقطة $B$' },
      { id: 'c', text: 'النقطة $D$' },
      { id: 'd', text: 'النقطة $A$' },
    ],
    answer: 'a',
    sourceRefs: S2,
  }),

  exact({
    id: 'geo-u01-t01-q18',
    lessonId: L2,
    concept: 'u1-image-point',
    difficulty: 'advanced',
    prompt: [
      "على مستقيم، النقطة $M$ تبعد عن $A$ ربع المسافة $AB$ (أي $AM = \\frac{1}{4} AB$). إذا كانت $M'$ صورتها وفق الانسحاب من $A$ إلى $B$، فما نسبة $AM'$ إلى $AB$؟",
    ],
    numerator: 5,
    denominator: 4,
    acceptEquivalentForms: true,
    sourceRefs: S2,
  }),

  errorAnalysis({
    id: 'geo-u01-t01-q19',
    lessonId: L2,
    concept: 'u1-image-point',
    difficulty: 'thinking',
    prompt: [
      'في الإنشاء بالفرجار لصورة $M$ وفق الانسحاب الذي ينقل $A$ إلى $B$، تتقاطع القوسان في نقطتين $X$ و $Y$. كيف نميز النقطة الصحيحة؟',
      figureBlock(
        compassIntersectionFigure({
          id: 'test-u01-q19-compass-intersections',
          startLabel: 'A',
          endLabel: 'B',
          alt: 'دائرتان إنشائيتان مركزاهما $B$ و$M$ تتقاطعان في النقطتين $X$ و$Y$؛ سهم $AB$ يوضح الاتجاه المعطى من دون تمييز الصحيح.',
          caption: 'رسم تخطيطي غير مقيّس يعرض المرشحين $X$ و$Y$ معاً ولا يختار أياً منهما.',
          sourceRefs: S2,
        }),
      ),
    ],
    steps: [
      { id: 's1', text: 'إحدى النقطتين تحقق الاتجاه من $A$ إلى $B$ وتكمل متوازي الأضلاع.' },
      { id: 's2', text: 'النقطة الأخرى تعطي رباعياً متشابكاً واتجاهاً معاكساً فنرفضها.' },
    ],
    choices: [
      { id: 'c-err', text: 'نختار النقطة التي تحقق الاتجاه وتكمل متوازي أضلاع بسيطاً غير متشابك.' },
      { id: 'c-ok', text: 'أي من النقطتين مقبولة وتصلح صورة.' },
    ],
    answer: 'c-err',
    sourceRefs: S2,
  }),

  trueFalse({
    id: 'geo-u01-t01-q20',
    lessonId: L2,
    concept: 'u1-image-point',
    difficulty: 'thinking',
    prompt: [
      "في الحالة الخاصة ($M$ على $(AB)$)، يكون منتصف القطعة $[AM']$ هو دائماً منتصف القطعة $[BM]$.",
    ],
    answer: true,
    sourceRefs: S2,
  }),

  /* =========================================================================
   * DOMAIN 3: Lesson 3 — «صورة شكل وفق انسحاب» (10 Questions: Q21–Q30)
   * ======================================================================= */
  singleChoice({
    id: 'geo-u01-t01-q21',
    lessonId: L3,
    concept: 'u1-image-shape',
    difficulty: 'basic',
    prompt: ['صورة مستقيم وفق انسحاب غير موازٍ له هي:'],
    choices: [
      { id: 'a', text: 'مستقيم يوازيه' },
      { id: 'b', text: 'مستقيم يعامده' },
      { id: 'c', text: 'نصف مستقيم' },
      { id: 'd', text: 'قطعة مستقيمة' },
    ],
    answer: 'a',
    sourceRefs: S3,
  }),

  trueFalse({
    id: 'geo-u01-t01-q22',
    lessonId: L3,
    concept: 'u1-image-shape',
    difficulty: 'basic',
    prompt: [
      'صورة دائرة مركزها $O$ ونصف قطرها $r$ هي دائرة مركزها صورة $O$ ونصف قطرها يساوي $r$ نفسه.',
    ],
    answer: true,
    sourceRefs: S3,
  }),

  singleChoice({
    id: 'geo-u01-t01-q23',
    lessonId: L3,
    concept: 'u1-image-shape',
    difficulty: 'basic',
    prompt: ['صورة نصف المستقيم $[Mx)$ وفق انسحاب هي:'],
    choices: [
      { id: 'a', text: "نصف مستقيم $[M'x') يوازيه وله الاتجاه نفسه" },
      { id: 'b', text: 'مستقيم كامل غير محدود' },
      { id: 'c', text: 'قطعة مستقيمة محدودة' },
      { id: 'd', text: 'نصف مستقيم معاكس في الاتجاه' },
    ],
    answer: 'a',
    sourceRefs: S3,
  }),

  numeric({
    id: 'geo-u01-t01-q24',
    lessonId: L3,
    concept: 'u1-image-shape',
    difficulty: 'medium',
    prompt: [
      'مثلث أطوال أضلاعه $5\\ \\mathrm{cm}$ و $7\\ \\mathrm{cm}$ و $9\\ \\mathrm{cm}$. ما محيط صورة هذا المثلث بالسنتيمتر وفق أي انسحاب؟',
    ],
    answer: 21,
    tolerance: 0,
    unit: 'cm',
    sourceRefs: S3,
  }),

  multiSelect({
    id: 'geo-u01-t01-q25',
    lessonId: L3,
    concept: 'u1-image-shape',
    difficulty: 'medium',
    prompt: [
      'أيُّ العلاقات الآتية تبقى محفوظة عند تصوير مستقيمين بالانسحاب؟ (اختر كل الإجابات الصحيحة)',
    ],
    choices: [
      { id: 'c1', text: 'التوازي: صورة المتوازيين مستقيمان متوازيان' },
      { id: 'c2', text: 'التعامد: صورة المتعامدين مستقيمان متعامدان' },
      { id: 'c3', text: 'التقاطع: صورة نقطة التقاطع هي نقطة تقاطع الصورتين' },
      { id: 'c4', text: 'المستقيمان المتقاطعان يتحولان إلى متوازيين' },
    ],
    answers: ['c1', 'c2', 'c3'],
    sourceRefs: S3,
  }),

  ordering({
    id: 'geo-u01-t01-q26',
    lessonId: L3,
    concept: 'u1-image-shape',
    difficulty: 'medium',
    prompt: ['رتّب خطوات إنشاء صورة مثلث $ABC$ وفق انسحاب معلوم:'],
    items: [
      { id: 's1', text: "إنشاء صور الرؤوس الثلاثة $A', B', C'$ كلٌّ منها على حدة" },
      { id: 's2', text: "الوصل بالمسطرة بين الرؤوس الناتجة لتشكيل القطع $[A'B'], [B'C'], [A'C']$" },
      { id: 's3', text: 'التحقق من توازي أضلاع المثلث الناتج مع أضلاع المثلث الأصلي ومطابقتها' },
    ],
    answerOrder: ['s1', 's2', 's3'],
    sourceRefs: S3,
  }),

  matching({
    id: 'geo-u01-t01-q27',
    lessonId: L3,
    concept: 'u1-image-shape',
    difficulty: 'medium',
    prompt: ['طابق كل شكل هندسي مع ما يطابقه تحت الانسحاب:'],
    left: [
      { id: 'l1', text: 'صورة مستطيل' },
      { id: 'l2', text: 'صورة مثلث' },
    ],
    right: [
      { id: 'r1', text: 'مستطيل يطابقه وتوازي أضلاعه أضلاع الأصل' },
      { id: 'r2', text: 'مثلث يطابقه وتوازي أضلاعه أضلاع الأصل' },
    ],
    pairs: { l1: 'r1', l2: 'r2' },
    sourceRefs: S3,
  }),

  singleChoice({
    id: 'geo-u01-t01-q28',
    lessonId: L3,
    concept: 'u1-image-shape',
    difficulty: 'advanced',
    prompt: ['متى تنطبق صورة مستقيم $(d)$ على المستقيم $(d)$ نفسه؟'],
    choices: [
      { id: 'a', text: 'عندما يكون منحى الانسحاب موازياً للمستقيم $(d)$' },
      { id: 'b', text: 'عندما يكون الانسحاب عمودياً على $(d)$' },
      { id: 'c', text: 'لا تنطبق عليه إطلاقاً' },
      { id: 'd', text: 'فقط إذا كانت مسافة الانسحاب صفراً' },
    ],
    answer: 'a',
    sourceRefs: S3,
  }),

  errorAnalysis({
    id: 'geo-u01-t01-q29',
    lessonId: L3,
    concept: 'u1-image-shape',
    difficulty: 'advanced',
    prompt: [
      "ادعى تلميذ: «لإنشاء صورة مستقيم $(d)$، يكفي إنشاء صورة نقطة واحدة منه $A'$ ورسم أي مستقيم يمر بها». ما وجه الخلل؟",
    ],
    steps: [
      { id: 's1', text: 'صورة المستقيم يجب أن توازي المستقيم الأصلي.' },
      {
        id: 's2',
        text: 'رسم أي مستقيم يمر بالنقطة لا يضمن التوازي ما لم يكن موازياً لـ $(d)$ أو نحدد نقطة ثانية.',
      },
    ],
    choices: [
      {
        id: 'c-err',
        text: 'الخلل أنه أهمل شرط التوازي؛ فيجب رسم الموازي حصراً أو إنشاء صورتي نقطتين.',
      },
      { id: 'c-ok', text: 'طريقة التلميذ كاملة وصحيحة' },
    ],
    answer: 'c-err',
    sourceRefs: S3,
  }),

  trueFalse({
    id: 'geo-u01-t01-q30',
    lessonId: L3,
    concept: 'u1-image-shape',
    difficulty: 'thinking',
    prompt: [
      'إذا تقاطعت دائرتان في نقطتين، فإن صورتيهما وفق أي انسحاب تتقاطعان أيضاً في نقطتين، والمسافة بين مركزي الصورتين تساوي المسافة بين مركزي الأصلين.',
    ],
    answer: true,
    sourceRefs: S3,
  }),

  /* =========================================================================
   * DOMAIN 4: Lesson 4 — «تطابق المثلثات» (10 Questions: Q31–Q40)
   * ======================================================================= */
  singleChoice({
    id: 'geo-u01-t01-q31',
    lessonId: L4,
    concept: 'u1-triangle-congruence',
    difficulty: 'basic',
    prompt: ['يتطابق مثلثان بحسب الحالة الأولى إذا تساوى فيهما:'],
    choices: [
      { id: 'a', text: 'طولا ضلعين وقياس الزاوية المحصورة بينهما' },
      { id: 'b', text: 'طولا ضلعين وأية زاوية' },
      { id: 'c', text: 'الزوايا الثلاث' },
      { id: 'd', text: 'المحيط والمساحة' },
    ],
    answer: 'a',
    sourceRefs: S4,
  }),

  trueFalse({
    id: 'geo-u01-t01-q32',
    lessonId: L4,
    concept: 'u1-triangle-congruence',
    difficulty: 'basic',
    prompt: [
      'يتطابق مثلثان في حال تساوي أطوال أضلاع أحدهما مع مقابلاتها في المثلث الآخر (الحالة الثالثة).',
    ],
    answer: true,
    sourceRefs: S4,
  }),

  singleChoice({
    id: 'geo-u01-t01-q33',
    lessonId: L4,
    concept: 'u1-triangle-congruence',
    difficulty: 'basic',
    prompt: ['يتطابق مثلثان قائمان إذا تساوى في أحدهما مع الآخر:'],
    choices: [
      { id: 'a', text: 'الوتر وضلع قائم' },
      { id: 'b', text: 'الزاويتان الحادتان فقط' },
      { id: 'c', text: 'المساحة والارتفاع فقط' },
      { id: 'd', text: 'الوتر فقط دون أي عنصر آخر' },
    ],
    answer: 'a',
    sourceRefs: S4,
  }),

  numeric({
    id: 'geo-u01-t01-q34',
    lessonId: L4,
    concept: 'u1-triangle-congruence',
    difficulty: 'medium',
    prompt: [
      'في مثلث متساوي الساقين، قياس إحدى زاويتي القاعدة $65^\\circ$. ما قياس زاوية الرأس بالدرجات؟',
    ],
    answer: 50,
    tolerance: 0,
    unit: '°',
    sourceRefs: S4,
  }),

  multiSelect({
    id: 'geo-u01-t01-q35',
    lessonId: L4,
    concept: 'u1-triangle-congruence',
    difficulty: 'medium',
    prompt: [
      'أيُّ الحالات الآتية كافية بالضرورة لإثبات تطابق مثلثين كيفيين؟ (اختر كل الإجابات الصحيحة)',
    ],
    choices: [
      { id: 'c1', text: 'ضلعان والزاوية المحصورة بينهما' },
      { id: 'c2', text: 'ضلع والزاويتان المجاورتان له' },
      { id: 'c3', text: 'الأضلاع الثلاثة' },
      { id: 'c4', text: 'الزوايا الثلاث دون أضلاع' },
    ],
    answers: ['c1', 'c2', 'c3'],
    sourceRefs: S4,
  }),

  classification({
    id: 'geo-u01-t01-q36',
    lessonId: L4,
    concept: 'u1-triangle-congruence',
    difficulty: 'medium',
    prompt: ['صنّف شروط التطابق الآتية:'],
    categories: [
      { id: 'gen', text: 'تنطبق على أي مثلثين' },
      { id: 'rt', text: 'خاصة بالمثلثين القائمين' },
    ],
    items: [
      { id: 'i1', text: 'تساوي الأضلاع الثلاثة' },
      { id: 'i2', text: 'تساوي الوتر وزاوية حادة' },
      { id: 'i3', text: 'تساوي الوتر وضلع قائم' },
      { id: 'i4', text: 'ضلعان والزاوية المحصورة' },
    ],
    assignment: { i1: 'gen', i2: 'rt', i3: 'rt', i4: 'gen' },
    sourceRefs: S4,
  }),

  singleChoice({
    id: 'geo-u01-t01-q37',
    lessonId: L4,
    concept: 'u1-triangle-congruence',
    difficulty: 'advanced',
    prompt: [
      'في الطائرة الورقية $ABCD$ حيث $AB = AD$ و $CB = CD$. ما الخاصية التي تجعل المثلثين $ABC$ و $ADC$ طبوقين؟',
      figureBlock(
        testFigure({
          id: 'test-u01-q37-kite-triangle-correspondence',
          alt: 'الطائرة الورقية $ABCD$ مقسومة بالقطر $AC$؛ علامات $AB=AD$ و$CB=CD$ كما وردت في السؤال.',
          caption: 'رسم تخطيطي غير مقيّس؛ العلامات تعرض المساواتين المذكورتين والقطر المشترك فقط.',
          sourceRefs: S4,
          spec: {
            points: [
              { id: 'A', x: 0, y: 5, labelSide: 'n' },
              { id: 'B', x: 3, y: 1, labelSide: 'e' },
              { id: 'C', x: 0, y: -5, labelSide: 's' },
              { id: 'D', x: -3, y: 1, labelSide: 'w' },
            ],
            segments: [
              { from: 'A', to: 'B', ticks: 1 },
              { from: 'B', to: 'C', ticks: 2 },
              { from: 'C', to: 'D', ticks: 2 },
              { from: 'D', to: 'A', ticks: 1 },
              { from: 'A', to: 'C' },
            ],
            questionLabels: ['A', 'B', 'C', 'D'],
          },
        }),
      ),
    ],
    choices: [
      { id: 'a', text: 'تساوي الأضلاع الثلاثة (ضلعان معطيان والقطر $[AC]$ مشترك)' },
      { id: 'b', text: 'تساوي زاويتين قائمتين' },
      { id: 'c', text: 'تعامد القطرين فقط' },
      { id: 'd', text: 'توازي الأضلاع' },
    ],
    answer: 'a',
    sourceRefs: S4,
  }),

  exact({
    id: 'geo-u01-t01-q38',
    lessonId: L4,
    concept: 'u1-triangle-congruence',
    difficulty: 'advanced',
    prompt: [
      'مثلثان قائمان طبوقان مساحة كل منهما $15\\ \\mathrm{cm}^2$. طول أحد الأضلاع القائمة $5\\ \\mathrm{cm}$. ما طول الضلع القائم الآخر؟',
      figureBlock(
        testFigure({
          id: 'test-u01-q38-right-triangle-area',
          alt: 'مثلث قائم تخطيطي واحد من المثلثين المتطابقين؛ يوضح الضلع القائم المعطى $5$ والمساحة المعطاة $15$ فقط.',
          caption:
            'رسم تخطيطي غير مقيّس لأحد المثلثين المتطابقين؛ النسب البصرية لا تمثل الأطوال، ولا يوسم الضلع المطلوب.',
          sourceRefs: S4,
          spec: {
            points: [
              { id: 'right', x: 0, y: 0, showLabel: false, mark: 'none' },
              { id: 'known-leg-end', x: 4, y: 0, showLabel: false, mark: 'none' },
              { id: 'other-leg-end', x: 0, y: 2.7, showLabel: false, mark: 'none' },
            ],
            segments: [
              { from: 'right', to: 'known-leg-end' },
              { from: 'right', to: 'other-leg-end' },
              { from: 'known-leg-end', to: 'other-leg-end' },
            ],
            rightAngles: [{ at: 'right', from: 'known-leg-end', to: 'other-leg-end' }],
            annotations: [
              { x: 2, y: 0.36, text: '5 cm' },
              { x: 1.1, y: 1.05, text: '15 cm²' },
            ],
            questionLabels: [],
          },
        }),
      ),
    ],
    numerator: 6,
    denominator: 1,
    acceptEquivalentForms: true,
    sourceRefs: S4,
  }),

  errorAnalysis({
    id: 'geo-u01-t01-q39',
    lessonId: L4,
    concept: 'u1-triangle-congruence',
    difficulty: 'thinking',
    prompt: [
      'زعم طالب: «تطابق مثلثين في زاويتين وضلع يثبت تطابقهما دائماً، ولا يهم موقع الضلع بالنسبة للزاويتين». ما النقد الدقيق؟',
    ],
    steps: [
      {
        id: 's1',
        text: 'مجموع زوايا المثلث ثابت ($180^\\circ$)، فتساوي زاويتين يضمن تساوي الثالثة.',
      },
      {
        id: 's2',
        text: 'لكن يجب أن يكون الضلع المتساوي مناظراً في المثلثين (يقابل الزاوية نفسها في كل منهما).',
      },
    ],
    choices: [
      {
        id: 'c-err',
        text: 'يشترط أن يكون الضلع مناظراً في الموضع للضلع في المثلث الآخر (يقابل نفس الزاوية).',
      },
      { id: 'c-ok', text: 'الزعم سليم تماماً' },
    ],
    answer: 'c-err',
    sourceRefs: S4,
  }),

  trueFalse({
    id: 'geo-u01-t01-q40',
    lessonId: L4,
    concept: 'u1-triangle-congruence',
    difficulty: 'thinking',
    prompt: [
      'إذا تساوى قياسا زاويتين في مثلث كان متساوي الساقين، ويمكن إثبات ذلك بتطابق مثلثين قائمين ينتجان عن رسم الارتفاع.',
    ],
    answer: true,
    sourceRefs: S4,
  }),

  /* =========================================================================
   * DOMAIN 5: Lesson 5 — «تمرينات الوحدة الأولى: 1 & 2» (7 Questions: Q41–Q47)
   * ======================================================================= */
  singleChoice({
    id: 'geo-u01-t01-q41',
    lessonId: L5,
    concept: 'u1-exercises-part1',
    difficulty: 'basic',
    prompt: [
      'إذا نقل انسحاب $R$ إلى $S$ و $P$ إلى $Q$، فإن الرباعي $RSQP$ هو متوازي أضلاع. ما السببان الهندسيان المباشران لذلك؟',
    ],
    choices: [
      { id: 'a', text: '$RS = PQ$ و $(RS) \\parallel (PQ)$' },
      { id: 'b', text: '$RP = SQ$ والقطران متعامدان' },
      { id: 'c', text: 'الزوايا قائمة' },
      { id: 'd', text: 'تطابق المساحتين فقط' },
    ],
    answer: 'a',
    sourceRefs: S5,
  }),

  trueFalse({
    id: 'geo-u01-t01-q42',
    lessonId: L5,
    concept: 'u1-exercises-part1',
    difficulty: 'basic',
    prompt: ['المستقيمان المتقاطعان لا يمكن لأي انسحاب أن ينقل أحدهما إلى الآخر.'],
    answer: true,
    sourceRefs: S5,
  }),

  singleChoice({
    id: 'geo-u01-t01-q43',
    lessonId: L5,
    concept: 'u1-exercises-part1',
    difficulty: 'medium',
    prompt: ['في متوازي الأضلاع $ABCD$، الانسحاب الذي ينقل $A$ إلى $B$ ينقل أيضاً النقطة $D$ إلى:'],
    choices: [
      { id: 'a', text: 'النقطة $C$' },
      { id: 'b', text: 'النقطة $A$' },
      { id: 'c', text: 'مركز متوازي الأضلاع' },
      { id: 'd', text: 'نقطة خارج الشكل' },
    ],
    answer: 'a',
    sourceRefs: S5,
  }),

  numeric({
    id: 'geo-u01-t01-q44',
    lessonId: L5,
    concept: 'u1-exercises-part1',
    difficulty: 'medium',
    prompt: [
      'في مثلثين طبوقين، زاويتان في الأول $40^\\circ$ و $85^\\circ$. ما قياس أصغر زاوية في المثلث الثاني بالدرجات؟',
    ],
    answer: 40,
    tolerance: 0,
    unit: '°',
    sourceRefs: S5,
  }),

  multiSelect({
    id: 'geo-u01-t01-q45',
    lessonId: L5,
    concept: 'u1-exercises-part1',
    difficulty: 'advanced',
    prompt: [
      "بين مستقيمين متوازيين $(d)$ و $(d')$، أيُّ العبارات الآتية صحيحة؟ (اختر كل الإجابات الصحيحة)",
    ],
    choices: [
      { id: 'c1', text: "توجد انسحابات لا نهائية تنقل $(d)$ إلى $(d')$" },
      {
        id: 'c2',
        text: "اختيار أي نقطة من $(d)$ ونقطة من $(d')$ يحدد انسحاباً ينقل $(d)$ إلى $(d')$",
      },
      { id: 'c3', text: 'يوجد انسحاب وحيد فقط عمودي' },
      { id: 'c4', text: 'لا يوجد أي انسحاب ينقلهما' },
    ],
    answers: ['c1', 'c2'],
    sourceRefs: S5,
  }),

  errorAnalysis({
    id: 'geo-u01-t01-q46',
    lessonId: L5,
    concept: 'u1-exercises-part1',
    difficulty: 'advanced',
    prompt: ['قال طالب: «صورة نقطة على مستقيم هي مسقطها العمودي على مستقيم الصورة». أين الخطأ؟'],
    steps: [
      { id: 's1', text: 'الانسحاب ينقل النقطة باتجاه متجه الانسحاب ومسافته.' },
      { id: 's2', text: 'المسقط العمودي يتبع اتجاه العمود فقط، وهما مختلفان عموماً.' },
    ],
    choices: [
      {
        id: 'c-err',
        text: 'الخطأ أن صورة النقطة تتبع متجه الانسحاب الخاص بالحركة وليست المسقط العمودي بالضرورة.',
      },
      { id: 'c-ok', text: 'كلام الطالب صحيح' },
    ],
    answer: 'c-err',
    sourceRefs: S5,
  }),

  trueFalse({
    id: 'geo-u01-t01-q47',
    lessonId: L5,
    concept: 'u1-exercises-part1',
    difficulty: 'thinking',
    prompt: [
      'إذا كانت $B$ نظيرة $C$ بالنسبة إلى $A$، فإن الانسحاب الذي ينقل $C$ إلى $A$ ينقل أيضاً النقطة $A$ إلى $B$.',
    ],
    answer: true,
    sourceRefs: S5,
  }),

  /* =========================================================================
   * DOMAIN 6: Lesson 6 — «تتمة تمرينات الوحدة: 3–15» (7 Questions: Q48–Q54)
   * ======================================================================= */
  singleChoice({
    id: 'geo-u01-t01-q48',
    lessonId: L6,
    concept: 'u1-exercises-part2',
    difficulty: 'basic',
    prompt: ['إذا تناصف قطرا شكل رباعي، كان الرباعي:'],
    choices: [
      { id: 'a', text: 'متوازي أضلاع' },
      { id: 'b', text: 'شبه منحرف' },
      { id: 'c', text: 'مستطيلاً بالضرورة' },
      { id: 'd', text: 'معيناً بالضرورة' },
    ],
    answer: 'a',
    sourceRefs: S6,
  }),

  singleChoice({
    id: 'geo-u01-t01-q49',
    lessonId: L6,
    concept: 'u1-exercises-part2',
    difficulty: 'medium',
    prompt: [
      'على شبكة إحداثية، إذا نقل انسحاب النقطة $(1, 2)$ إلى $(5, 6)$، فما هي صورة النقطة $(0, 0)$؟',
    ],
    choices: [
      { id: 'a', text: '$(4, 4)$' },
      { id: 'b', text: '$(5, 6)$' },
      { id: 'c', text: '$(6, 8)$' },
      { id: 'd', text: '$(1, 2)$' },
    ],
    answer: 'a',
    sourceRefs: S6,
  }),

  numeric({
    id: 'geo-u01-t01-q50',
    lessonId: L6,
    concept: 'u1-exercises-part2',
    difficulty: 'medium',
    prompt: [
      'مثلث قائم أطوال أضلاعه $6\\ \\mathrm{cm}$ و $8\\ \\mathrm{cm}$ و $10\\ \\mathrm{cm}$. نُقِل بانسحاب باتجاه وتره. ما مساحة المثلث الناتج بالسنتيمتر المربع؟',
    ],
    answer: 24,
    tolerance: 0,
    unit: 'cm²',
    sourceRefs: S6,
  }),

  matching({
    id: 'geo-u01-t01-q51',
    lessonId: L6,
    concept: 'u1-exercises-part2',
    difficulty: 'medium',
    prompt: ['طابق كل خاصية هندسية مع نتيجتها في إكمال متوازي الأضلاع:'],
    left: [
      { id: 'l1', text: 'تناصف القطرين' },
      { id: 'l2', text: 'تساوي وتوازي ضلعين متقابلين' },
    ],
    right: [
      { id: 'r1', text: 'الرباعي متوازي أضلاع وتناظر مركزي حول المنتصف' },
      { id: 'r2', text: 'الرباعي متوازي أضلاع ناتج عن انسحاب' },
    ],
    pairs: { l1: 'r1', l2: 'r2' },
    sourceRefs: S6,
  }),

  singleChoice({
    id: 'geo-u01-t01-q52',
    lessonId: L6,
    concept: 'u1-exercises-part2',
    difficulty: 'advanced',
    prompt: ['إذا كان متوازي الأضلاع فيه زاوية قائمة، فما النتيجة الحتمية لطولي قطريه؟'],
    choices: [
      { id: 'a', text: 'متساويا الطول (لأنه مستطيل)' },
      { id: 'b', text: 'متعامدان فقط' },
      { id: 'c', text: 'أحدهما ضعف الآخر' },
      { id: 'd', text: 'لا يتساويان' },
    ],
    answer: 'a',
    sourceRefs: S6,
  }),

  errorAnalysis({
    id: 'geo-u01-t01-q53',
    lessonId: L6,
    concept: 'u1-exercises-part2',
    difficulty: 'advanced',
    prompt: ['زعم تلميذ: «أي رباعي فيه قطران متساويان هو مستطيل». كيف تفند زعمه بمثال مضاد؟'],
    steps: [
      { id: 's1', text: 'شبه المنحرف متساوي الساقين قطراه متساويان في الطول.' },
      { id: 's2', text: 'شبه المنحرف ليس متوازي أضلاع ولا مستطيلاً لأن قطريه لا يتناصفان.' },
    ],
    choices: [
      {
        id: 'c-err',
        text: 'المثال المضاد هو شبه المنحرف متساوي الساقين؛ فالمستطيل يشترط تناصف القطرين مع تساويهما.',
      },
      { id: 'c-ok', text: 'الزعم صحيح' },
    ],
    answer: 'c-err',
    sourceRefs: S6,
  }),

  trueFalse({
    id: 'geo-u01-t01-q54',
    lessonId: L6,
    concept: 'u1-exercises-part2',
    difficulty: 'thinking',
    prompt: [
      'تكرار الانسحاب $n$ مرة لقطعة مستقيمة يحافظ على استقامة القطع المتتالية إذا كان اتجاه الانسحاب واقعاً على حامل القطعة.',
    ],
    answer: true,
    sourceRefs: S6,
  }),

  /* =========================================================================
   * DOMAIN 7: Lesson 7 — «تتمة تمرينات الوحدة: 16–28» (6 Questions: Q55–Q60)
   * ======================================================================= */
  singleChoice({
    id: 'geo-u01-t01-q55',
    lessonId: L7,
    concept: 'u1-exercises-part3',
    difficulty: 'basic',
    prompt: ['في المعين، ما العلاقة المميزة بين القطرين؟'],
    choices: [
      { id: 'a', text: 'متعامدان ومتناصفان' },
      { id: 'b', text: 'متساويا الطول وغير متعامدين' },
      { id: 'c', text: 'متوازيان' },
      { id: 'd', text: 'لا يلتقيان' },
    ],
    answer: 'a',
    sourceRefs: S7,
  }),

  trueFalse({
    id: 'geo-u01-t01-q56',
    lessonId: L7,
    concept: 'u1-exercises-part3',
    difficulty: 'basic',
    prompt: ['المستقيم العمود على أحد مستقيمين متوازيين يكون عمودياً على الآخر أيضاً.'],
    answer: true,
    sourceRefs: S7,
  }),

  singleChoice({
    id: 'geo-u01-t01-q57',
    lessonId: L7,
    concept: 'u1-exercises-part3',
    difficulty: 'medium',
    prompt: ['في جدول البرهان الهندسي المنهجي، الخانات الثلاث المرتبة منطقياً هي:'],
    choices: [
      { id: 'a', text: 'الفرض ثم الخاصة ثم النتيجة' },
      { id: 'b', text: 'النتيجة ثم الفرض ثم الرسم' },
      { id: 'c', text: 'الخاصة ثم الرسم ثم النتيجة' },
      { id: 'd', text: 'الرأي ثم التخمين ثم الحل' },
    ],
    answer: 'a',
    sourceRefs: S7,
  }),

  classification({
    id: 'geo-u01-t01-q58',
    lessonId: L7,
    concept: 'u1-exercises-part3',
    difficulty: 'medium',
    prompt: ['صنّف الرباعيات الخاصة بحسب صفة أقطارها:'],
    categories: [
      { id: 'perp', text: 'أقطارها متعامدة' },
      { id: 'eq', text: 'أقطارها متساوية الطول وغير متعامدة عموماً' },
    ],
    items: [
      { id: 'r1', text: 'المستطيل' },
      { id: 'r2', text: 'المعين' },
      { id: 'r3', text: 'طائرة ورقية' },
    ],
    assignment: { r1: 'eq', r2: 'perp', r3: 'perp' },
    sourceRefs: S7,
  }),

  singleChoice({
    id: 'geo-u01-t01-q59',
    lessonId: L7,
    concept: 'u1-exercises-part3',
    difficulty: 'advanced',
    prompt: [
      'لإثبات أن قطري المستطيل متساويا الطول، نثبت تطابق مثلثين قائمين يشتركان في ضلع المستطيل. ما حالة التطابق المعتمدة؟',
    ],
    choices: [
      { id: 'a', text: 'ضلعان وزاوية قائمة محصورة بينهما (الحالة الأولى)' },
      { id: 'b', text: 'الزوايا الثلاث' },
      { id: 'c', text: 'الوتر وزاوية حادة' },
      { id: 'd', text: 'الأضلاع الثلاثة مباشرة قبل إثبات تساوي القطرين' },
    ],
    answer: 'a',
    sourceRefs: S7,
  }),

  errorAnalysis({
    id: 'geo-u01-t01-q60',
    lessonId: L7,
    concept: 'u1-exercises-part3',
    difficulty: 'thinking',
    prompt: [
      'في مسألة برهان، علل تلميذ تعامد مستقيمين بقوله: «لأنهما يبدوان متعامدين تماماً في الرسم المطبوع». ما النقد المنهجي السليم؟',
    ],
    steps: [
      { id: 's1', text: 'الملاحظة البصرية ليست دليلاً هندسياً.' },
      {
        id: 's2',
        text: 'يجب أن يستند البرهان إلى خاصة هندسية مبرهنة (كالعمود على أحد متوازيين، أو مجموع زوايا 90°، أو تطابق مثلثات).',
      },
    ],
    choices: [
      {
        id: 'c-err',
        text: 'التعليل باطل منهجياً؛ فالرسم وسيلة توضيح والبرهان يتطلب خاصة أو مبرهنة تربط الفرض بالنتيجة.',
      },
      { id: 'c-ok', text: 'التعليل كافٍ' },
    ],
    answer: 'c-err',
    sourceRefs: S7,
  }),
];
