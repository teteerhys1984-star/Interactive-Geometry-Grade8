import {
  classification,
  errorAnalysis,
  exact,
  matching,
  multiSelect,
  numeric,
  ordering,
  singleChoice,
  trueFalse,
} from '../authoring';
import type { TestQuestionInput } from '../schema';

/**
 * ============================================================================
 *  BANK — LESSON 7: «تتمة الدرس الخامس (2)» (Questions 16–28)
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
 *      • proof-reasoning-grids (البرهان الهندسي وجداول الفرض والخاصة والنتيجة): 6
 *      • special-quadrilaterals (خواص المستطيل والمعين والمربع): 5
 *      • advanced-translations (تناصف الأقطار واستعمال الانسحاب في الإثبات): 5
 *      • parallel-lines-angles (الزوايا المتبادلة والعمود على المتوازيين): 4
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

const LESSON_ID = 'lesson-07-unit-one-exercises-final';
const S_EX = { page: 'تمرينات 16–28', locator: 'الأسئلة 16 إلى 28' };

export const questions: TestQuestionInput[] = [
  /* ------------------------------------------------------------------ 01 */
  singleChoice({
    id: 'geo-l07-t01-q01',
    lessonId: LESSON_ID,
    concept: 'special-quadrilaterals',
    difficulty: 'basic',
    prompt: ['ما الخاصية المميزة لقطري المستطيل؟'],
    choices: [
      { id: 'opt-a', text: 'متساويا الطول ومتناصفان' },
      { id: 'opt-b', text: 'متعامدان دائماً' },
      { id: 'opt-c', text: 'أحدهما ضعف الآخر' },
      { id: 'opt-d', text: 'لا يتناصفان' },
    ],
    answer: 'opt-a',
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 02 */
  trueFalse({
    id: 'geo-l07-t01-q02',
    lessonId: LESSON_ID,
    concept: 'special-quadrilaterals',
    difficulty: 'basic',
    prompt: ['قطرا المعين متعامدان ومتناصفان.'],
    answer: true,
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 03 */
  singleChoice({
    id: 'geo-l07-t01-q03',
    lessonId: LESSON_ID,
    concept: 'parallel-lines-angles',
    difficulty: 'basic',
    prompt: ['المستقيم العمود على أحد مستقيمين متوازيين يكون:'],
    choices: [
      { id: 'opt-a', text: 'عمودياً على الآخر أيضاً' },
      { id: 'opt-b', text: 'موازياً للآخر' },
      { id: 'opt-c', text: 'منطبقاً على الآخر' },
      { id: 'opt-d', text: 'يصنع زاوية حادة مع الآخر' },
    ],
    answer: 'opt-a',
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 04 */
  numeric({
    id: 'geo-l07-t01-q04',
    lessonId: LESSON_ID,
    concept: 'special-quadrilaterals',
    difficulty: 'basic',
    prompt: ['مستطيل $ABCD$ قطره $AC = 13\\ \\mathrm{cm}$. ما طول القطر الآخر $BD$ بالسنتيمتر؟'],
    answer: 13,
    tolerance: 0,
    unit: 'cm',
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 05 */
  singleChoice({
    id: 'geo-l07-t01-q05',
    lessonId: LESSON_ID,
    concept: 'proof-reasoning-grids',
    difficulty: 'basic',
    prompt: ['في جداول الاستدلال والبرهان الهندسي، ماذا يُقصد بخانة «الفرض»؟'],
    choices: [
      { id: 'opt-a', text: 'المعطيات والحقائق المعطاة في نص المسألة والمتحققة مسبقاً' },
      { id: 'opt-b', text: 'المطلوب إثباته في النهاية' },
      { id: 'opt-c', text: 'رأي شخصي للتلميذ دون دليل' },
      { id: 'opt-d', text: 'الرسم التقريبي فقط' },
    ],
    answer: 'opt-a',
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 06 */
  singleChoice({
    id: 'geo-l07-t01-q06',
    lessonId: LESSON_ID,
    concept: 'advanced-translations',
    difficulty: 'medium',
    prompt: [
      "إذا كانت النقطة $A'$ هي صورة $A$ وفق الانسحاب الذي ينقل $C$ إلى $B$، فما طبيعة الشكل الرباعي $ACBA'$؟",
    ],
    choices: [
      { id: 'opt-a', text: 'متوازي أضلاع' },
      { id: 'opt-b', text: 'شبه منحرف' },
      { id: 'opt-c', text: 'مثلث' },
      { id: 'opt-d', text: 'مستطيل بالضرورة' },
    ],
    answer: 'opt-a',
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 07 */
  trueFalse({
    id: 'geo-l07-t01-q07',
    lessonId: LESSON_ID,
    concept: 'parallel-lines-angles',
    difficulty: 'medium',
    prompt: [
      'إذا قطع مستقيم قاطع مستقيمين متوازيين، فإن كل زاويتين متبادلتين داخلاً تكونان متساويتين في القياس.',
    ],
    answer: true,
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 08 */
  multiSelect({
    id: 'geo-l07-t01-q08',
    lessonId: LESSON_ID,
    concept: 'proof-reasoning-grids',
    difficulty: 'medium',
    prompt: [
      'أيُّ العناصر الآتية تُشكّل الهيكل المنطقي السليم لبرهان جدول «الفرض / الخاصة / النتيجة»؟ (اختر كل الإجابات الصحيحة)',
    ],
    choices: [
      { id: 'c1', text: 'الفرض: تحديد الشروط الهندسية المتحققة بالمعطيات' },
      { id: 'c2', text: 'الخاصة: ذكر القاعدة أو النظرية الهندسية المبرهنة المعتمدة' },
      { id: 'c3', text: 'النتيجة: الاستنتاج المنطقي المستخلص بدقة' },
      { id: 'c4', text: 'الاعتماد على المظهر البصري المجرد دون ذكر خاصة' },
    ],
    answers: ['c1', 'c2', 'c3'],
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 09 */
  numeric({
    id: 'geo-l07-t01-q09',
    lessonId: LESSON_ID,
    concept: 'special-quadrilaterals',
    difficulty: 'medium',
    prompt: ['معين طول ضلعه $6.5\\ \\mathrm{cm}$. ما محيط المعين بالسنتيمتر؟'],
    answer: 26,
    tolerance: 0,
    unit: 'cm',
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 10 */
  matching({
    id: 'geo-l07-t01-q10',
    lessonId: LESSON_ID,
    concept: 'special-quadrilaterals',
    difficulty: 'medium',
    prompt: ['طابق كل رباعي خاص مع الخاصية المحددة لقطريه:'],
    left: [
      { id: 'q-rec', text: 'المستطيل' },
      { id: 'q-rhom', text: 'المعين' },
      { id: 'q-sq', text: 'المربع' },
    ],
    right: [
      { id: 'r-rec', text: 'قطراه متناصفان ومتساويا الطول وغير متعامدين عموماً' },
      { id: 'r-rhom', text: 'قطراه متناصفان ومتعامدان وغير متساويين عموماً' },
      { id: 'r-sq', text: 'قطراه متناصفان ومتساويا الطول ومتعامدان معاً' },
    ],
    pairs: { 'q-rec': 'r-rec', 'q-rhom': 'r-rhom', 'q-sq': 'r-sq' },
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 11 */
  classification({
    id: 'geo-l07-t01-q11',
    lessonId: LESSON_ID,
    concept: 'proof-reasoning-grids',
    difficulty: 'medium',
    prompt: [
      'صنّف العبارات الرياضية الآتية إلى ما يصلح أن يكون «خاصة هندسية عامة» أو «فرض خاص بمسألة»:',
    ],
    categories: [
      { id: 'cat-rule', text: 'خاصة هندسية عامة' },
      { id: 'cat-hypo', text: 'فرض خاص بمسألة' },
    ],
    items: [
      { id: 'e1', text: 'قطرا متوازي الأضلاع متناصفان' },
      { id: 'e2', text: 'في الشكل المعطى $AB = 5\\ \\mathrm{cm}$' },
      { id: 'e3', text: 'المستقيم العمود على أحد متوازيين عمود على الآخر' },
      { id: 'e4', text: 'النقطة $M$ هي منتصف القطعة $[BC]$ بالفرض' },
    ],
    assignment: {
      e1: 'cat-rule',
      e2: 'cat-hypo',
      e3: 'cat-rule',
      e4: 'cat-hypo',
    },
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 12 */
  ordering({
    id: 'geo-l07-t01-q12',
    lessonId: LESSON_ID,
    concept: 'advanced-translations',
    difficulty: 'medium',
    prompt: [
      'رتّب خطوات إثبات أن منتصف القطعة $[IK]$ هو نفسه منتصف القطعة $[AB]$ باستعمال الانسحاب:',
    ],
    items: [
      { id: 'st1', text: 'إثبات أن $K$ هي صورة $B$ بالانسحاب من $I$ إلى $A$' },
      { id: 'st2', text: 'استنتاج أن الرباعي $IAKB$ هو متوازي أضلاع' },
      {
        id: 'st3',
        text: 'استنتاج أن قطري متوازي الأضلاع $[IK]$ و $[AB]$ متناصفان ولهما المنتصف نفسه',
      },
    ],
    answerOrder: ['st1', 'st2', 'st3'],
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 13 */
  singleChoice({
    id: 'geo-l07-t01-q13',
    lessonId: LESSON_ID,
    concept: 'proof-reasoning-grids',
    difficulty: 'medium',
    prompt: [
      'في إثبات أن قطري المعين متعامدان، ما المثلثان اللذان نثبت تطابقهما حول نقطة تقاطع القطرين $O$؟',
    ],
    choices: [
      { id: 'opt-a', text: 'مثلثان متجاوران يشتركان في نصف قطر وضلعين متجاورين متساويين للمعين' },
      { id: 'opt-b', text: 'المثلثان المتقابلان بالرأس فقط' },
      { id: 'opt-c', text: 'مثلثان خارج المعين' },
      { id: 'opt-d', text: 'لا نحتاج لتطابق مثلثات' },
    ],
    answer: 'opt-a',
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 14 */
  exact({
    id: 'geo-l07-t01-q14',
    lessonId: LESSON_ID,
    concept: 'parallel-lines-angles',
    difficulty: 'advanced',
    prompt: [
      'مستقيمان متوازيان قطعهما قاطع فتشكلت زاوية قياسها $60^\\circ$. ما النسبة بين قياس الزاوية المتبادلة داخلاً معها وقياس الزاوية المتجاورة معها على خط مستقيم؟',
    ],
    numerator: 1,
    denominator: 2,
    acceptEquivalentForms: true,
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 15 */
  singleChoice({
    id: 'geo-l07-t01-q15',
    lessonId: LESSON_ID,
    concept: 'advanced-translations',
    difficulty: 'advanced',
    prompt: [
      'إذا كان $ABCD$ متوازي أضلاع، والنقطة $E$ صورة $B$ وفق الانسحاب من $A$ إلى $B$. ما العلاقة بين القطعتين $[AB]$ و $[BE]$؟',
    ],
    choices: [
      { id: 'opt-a', text: '$AB = BE$ وتقعان على المستقيم نفسه' },
      { id: 'opt-b', text: '$[AB]$ تعامد $[BE]$' },
      { id: 'opt-c', text: '$BE = 2 \\times AB$' },
      { id: 'opt-d', text: 'لا توجد علاقة محددة' },
    ],
    answer: 'opt-a',
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 16 */
  errorAnalysis({
    id: 'geo-l07-t01-q16',
    lessonId: LESSON_ID,
    concept: 'proof-reasoning-grids',
    difficulty: 'advanced',
    prompt: [
      'كتب تلميذ في خانة «الخاصة»: «لأن الشكل يبدو في الرسم مربعاً». ما النقد المنهجي السليم لهذا التبرير؟',
    ],
    steps: [
      { id: 's1', text: 'الرسم الهندسي قد يكون غير دقيق أو حالة خاصة مضللة.' },
      {
        id: 's2',
        text: 'البرهان الرياضي يجب أن يستند إلى تعريف أو مبرهنة مبرهنة سابقة تربط المعطيات بالنتائج.',
      },
    ],
    choices: [
      {
        id: 'c-err',
        text: 'التبرير خاطئ تماماً؛ فالهندسة لا تعتمد على المظهر البصري بل تتطلب خاصة أو تعريفاً هندسياً مبرهناً.',
      },
      { id: 'c-ok', text: 'التبرير مقبول إذا كان الرسم واضحاً بالألوان.' },
    ],
    answer: 'c-err',
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 17 */
  singleChoice({
    id: 'geo-l07-t01-q17',
    lessonId: LESSON_ID,
    concept: 'proof-reasoning-grids',
    difficulty: 'advanced',
    prompt: ['في إثبات أن قطري المستطيل $ABCD$ متساويا الطول، نثبت تطابق المثلثين القائمين:'],
    choices: [
      { id: 'opt-a', text: '$ABC$ و $DCB$ بضلعين وقائمة محصورة' },
      { id: 'opt-b', text: '$AOB$ و $COD$ فقط' },
      { id: 'opt-c', text: 'مثلثين خارج المستطيل' },
      { id: 'opt-d', text: 'لا يمكن إثبات ذلك بالمثلثات' },
    ],
    answer: 'opt-a',
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 18 */
  multiSelect({
    id: 'geo-l07-t01-q18',
    lessonId: LESSON_ID,
    concept: 'advanced-translations',
    difficulty: 'advanced',
    prompt: [
      'عند استخدام الانسحاب لإثبات خواص التوازي وتناصف الأقطار، أيُّ الاستنتاجات الآتية صحيحة؟ (اختر كل الإجابات الصحيحة)',
    ],
    choices: [
      { id: 'c1', text: 'كل انسحاب يعيّن متوازي أضلاع بين أي نقطة وصورتها ونقطتي الانسحاب' },
      { id: 'c2', text: 'تناصف قطري متوازي الأضلاع الناتج يثبت التناصف المشترك للقطع' },
      { id: 'c3', text: 'تساوي أطوال القطع تحت الانسحاب يثبت تساوي الأضلاع النظيرة' },
      { id: 'c4', text: 'الانسحاب يغيّر الزوايا القائمة إلى حادة' },
    ],
    answers: ['c1', 'c2', 'c3'],
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 19 */
  errorAnalysis({
    id: 'geo-l07-t01-q19',
    lessonId: LESSON_ID,
    concept: 'parallel-lines-angles',
    difficulty: 'thinking',
    prompt: [
      'زعم تلميذ: «أي زاويتين في وضع التبادل الداخلي متساويتان دائماً مهما كان وضع المستقيمين». أين موضع الخطأ؟',
    ],
    steps: [
      { id: 's1', text: 'وضع التبادل الداخلي هو وصف لموقع الزاويتين بالنسبة للقاطع والمستقيمين.' },
      {
        id: 's2',
        text: 'تساوي قياس الزاويتين المتبادلتين داخلاً لا يتحقق إلا إذا كان المستقيمان متوازيين.',
      },
    ],
    choices: [
      {
        id: 'ch-err',
        text: 'الخطأ هو إهمال شرط التوازي؛ فالزاويتان المتبادلتان داخلاً لا تتساويان إلا إذا كان المستقيمان متوازيين.',
      },
      { id: 'ch-ok', text: 'الزعم صحيح والتبادل الداخلي يعني التساوي دائماً.' },
    ],
    answer: 'ch-err',
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 20 */
  trueFalse({
    id: 'geo-l07-t01-q20',
    lessonId: LESSON_ID,
    concept: 'proof-reasoning-grids',
    difficulty: 'thinking',
    prompt: [
      'في الاستدلال الهندسي الصارم، لا يجوز استنتاج أن الزاوية قائمة لمجرد أنها تبدو قائمة في الشكل المرفق، بل يلزم وجود رمز التعامد في الفرض أو برهان ينتج عنه قياس 90 درجة.',
    ],
    answer: true,
    sourceRefs: [S_EX],
  }),
];
