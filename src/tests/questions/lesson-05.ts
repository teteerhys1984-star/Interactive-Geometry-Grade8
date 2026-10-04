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
 *  BANK — LESSON 5: «تمرينات الوحدة الأولى» (Questions 1 & 2)
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
 *      • ex1-mcq-concepts (تطبيقات السؤال 1: اختيار الإجابة الصحيحة): 10
 *      • ex2-tf-reasoning (تطبيقات السؤال 2: صح أو خطأ مع التعليل): 10
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

const LESSON_ID = 'lesson-05-unit-one-exercises';
const S_EX1 = { page: 'تمرينات 1–2', locator: 'السؤال 1: اختر الإجابة الصحيحة' };
const S_EX2 = { page: 'تمرينات 1–2', locator: 'السؤال 2: أجب بصح أو خطأ وعلل' };

export const questions: TestQuestionInput[] = [
  /* ------------------------------------------------------------------ 01 */
  singleChoice({
    id: 'geo-l05-t01-q01',
    lessonId: LESSON_ID,
    concept: 'ex1-mcq-concepts',
    difficulty: 'basic',
    prompt: ['إذا نقل انسحاب النقطة $R$ إلى $S$ والنقطة $P$ إلى $Q$، فإن الرباعي $RSQP$ هو:'],
    choices: [
      { id: 'opt-a', text: 'متوازي أضلاع' },
      { id: 'opt-b', text: 'شبه منحرف' },
      { id: 'opt-c', text: 'مستطيل بالضرورة' },
      { id: 'opt-d', text: 'مربع بالضرورة' },
    ],
    answer: 'opt-a',
    sourceRefs: [S_EX1],
  }),

  /* ------------------------------------------------------------------ 02 */
  trueFalse({
    id: 'geo-l05-t01-q02',
    lessonId: LESSON_ID,
    concept: 'ex2-tf-reasoning',
    difficulty: 'basic',
    prompt: [
      "إذا كان $(d)$ و $(d')$ مستقيمين متقاطعين، فإنه لا يوجد أي انسحاب ينقل $(d)$ إلى $(d')$.",
    ],
    answer: true,
    sourceRefs: [S_EX2],
  }),

  /* ------------------------------------------------------------------ 03 */
  singleChoice({
    id: 'geo-l05-t01-q03',
    lessonId: LESSON_ID,
    concept: 'ex1-mcq-concepts',
    difficulty: 'basic',
    prompt: ['في متوازي الأضلاع $MNPQ$، المتجه $\\overrightarrow{MQ}$ يكافئ المتجه:'],
    choices: [
      { id: 'opt-a', text: '$\\overrightarrow{NP}$' },
      { id: 'opt-b', text: '$\\overrightarrow{PN}$' },
      { id: 'opt-c', text: '$\\overrightarrow{QP}$' },
      { id: 'opt-d', text: '$\\overrightarrow{MN}$' },
    ],
    answer: 'opt-a',
    sourceRefs: [S_EX1],
  }),

  /* ------------------------------------------------------------------ 04 */
  numeric({
    id: 'geo-l05-t01-q04',
    lessonId: LESSON_ID,
    concept: 'ex1-mcq-concepts',
    difficulty: 'basic',
    prompt: [
      'مثلث قائم مساحته $28\\ \\mathrm{cm}^2$. نُقِل بانسحاب فنتج مثلث آخر. ما مساحة المثلث الناتج بالسنتيمتر المربع؟',
    ],
    answer: 28,
    tolerance: 0,
    unit: 'cm²',
    sourceRefs: [S_EX1],
  }),

  /* ------------------------------------------------------------------ 05 */
  singleChoice({
    id: 'geo-l05-t01-q05',
    lessonId: LESSON_ID,
    concept: 'ex2-tf-reasoning',
    difficulty: 'basic',
    prompt: [
      "دائرتان $\\mathcal{C}$ و $\\mathcal{C}'$ نصفا قطريهما متساويان. كم انسحاباً ينقل $\\mathcal{C}$ إلى $\\mathcal{C}'$؟",
    ],
    choices: [
      { id: 'opt-a', text: 'انسحاب واحد فقط ينقل مركز الأولى إلى مركز الثانية' },
      { id: 'opt-b', text: 'انسحابات لا نهائية' },
      { id: 'opt-c', text: 'انسحابان اثنان' },
      { id: 'opt-d', text: 'لا يوجد أي انسحاب' },
    ],
    answer: 'opt-a',
    sourceRefs: [S_EX2],
  }),

  /* ------------------------------------------------------------------ 06 */
  singleChoice({
    id: 'geo-l05-t01-q06',
    lessonId: LESSON_ID,
    concept: 'ex1-mcq-concepts',
    difficulty: 'medium',
    prompt: [
      "إذا كان المستقيمان $(d_1)$ و $(d_2)$ متقاطعين في النقطة $M$، ونقلهما انسحاب إلى $(d_1')$ و $(d_2')$. ما هي نقطة تقاطع المستقيمين الجديدين؟",
    ],
    choices: [
      { id: 'opt-a', text: "النقطة $M'$ صورة $M$ وفق الانسحاب نفسه" },
      { id: 'opt-b', text: 'النقطة $M$ الأصلية' },
      { id: 'opt-c', text: 'لا يتقاطعان بل يتوازيان' },
      { id: 'opt-d', text: 'نقطة كيفية ليس لها علاقة بـ $M$' },
    ],
    answer: 'opt-a',
    sourceRefs: [S_EX1],
  }),

  /* ------------------------------------------------------------------ 07 */
  trueFalse({
    id: 'geo-l05-t01-q07',
    lessonId: LESSON_ID,
    concept: 'ex2-tf-reasoning',
    difficulty: 'medium',
    prompt: [
      "إذا كان $(d)$ و $(d')$ مستقيمين متوازيين، فإنه يوجد انسحاب واحد فقط ينقل $(d)$ إلى $(d')$.",
    ],
    answer: false,
    sourceRefs: [S_EX2],
  }),

  /* ------------------------------------------------------------------ 08 */
  multiSelect({
    id: 'geo-l05-t01-q08',
    lessonId: LESSON_ID,
    concept: 'ex1-mcq-concepts',
    difficulty: 'medium',
    prompt: ['في متوازي الأضلاع $ABCD$، أيُّ الانسحابات الآتية صحيحة؟ (اختر كل الإجابات الصحيحة)'],
    choices: [
      { id: 'c1', text: 'الانسحاب الذي ينقل $B$ إلى $A$ ينقل أيضاً $C$ إلى $D$' },
      { id: 'c2', text: 'الانسحاب الذي ينقل $A$ إلى $D$ ينقل أيضاً $B$ إلى $C$' },
      { id: 'c3', text: 'الانسحاب الذي ينقل $D$ إلى $A$ ينقل أيضاً $C$ إلى $B$' },
      { id: 'c4', text: 'الانسحاب الذي ينقل $A$ إلى $C$ ينقل $B$ إلى $D$' },
    ],
    answers: ['c1', 'c2', 'c3'],
    sourceRefs: [S_EX1, S_EX2],
  }),

  /* ------------------------------------------------------------------ 09 */
  numeric({
    id: 'geo-l05-t01-q09',
    lessonId: LESSON_ID,
    concept: 'ex1-mcq-concepts',
    difficulty: 'medium',
    prompt: [
      'في مثلثين طبوقين، قياس إحدى الزوايا في المثلث الأول $53^\\circ$ والأخرى $67^\\circ$. ما قياس الزاوية الثالثة في المثلث الثاني بالدرجات؟',
    ],
    answer: 60,
    tolerance: 0,
    unit: '°',
    sourceRefs: [S_EX1],
  }),

  /* ------------------------------------------------------------------ 10 */
  matching({
    id: 'geo-l05-t01-q10',
    lessonId: LESSON_ID,
    concept: 'ex2-tf-reasoning',
    difficulty: 'medium',
    prompt: ['طابق كل عبارة مع التبرير الرياضي الدقيق لكونها صحيحة أو خاطئة:'],
    left: [
      { id: 'l1', text: 'مستقيمان متقاطعان لا ينقل أحدهما للآخر انسحاب' },
      { id: 'l2', text: 'مستقيمان متوازيان توجد بينهما انسحابات لا نهائية' },
    ],
    right: [
      { id: 'r1', text: 'لأن صورة مستقيم بانسحاب توازيه حتماً ولا تقاطعه' },
      { id: 'r2', text: 'لإمكانية ربط أي نقطة من الأول بأية نقطة من الثاني' },
    ],
    pairs: { l1: 'r1', l2: 'r2' },
    sourceRefs: [S_EX2],
  }),

  /* ------------------------------------------------------------------ 11 */
  classification({
    id: 'geo-l05-t01-q11',
    lessonId: LESSON_ID,
    concept: 'ex1-mcq-concepts',
    difficulty: 'medium',
    prompt: ['صنّف العلاقات الناتجة عن انسحاب نقطتين $A$ إلى $B$ و $C$ إلى $D$:'],
    categories: [
      { id: 'cat-true', text: 'صحيحة دائماً في متوازي الأضلاع' },
      { id: 'cat-false', text: 'غير صحيحة في العموم' },
    ],
    items: [
      { id: 'i1', text: '$AC = BD$ و $(AC) \\parallel (BD)$' },
      { id: 'i2', text: '$AB = CD$ و $(AB) \\parallel (CD)$' },
      { id: 'i3', text: '$[AD]$ يعامد $[BC]$ دائماً' },
      { id: 'i4', text: 'القطران $[AD]$ و $[BC]$ متناصفان' },
    ],
    assignment: {
      i1: 'cat-true',
      i2: 'cat-true',
      i3: 'cat-false',
      i4: 'cat-true',
    },
    sourceRefs: [S_EX1],
  }),

  /* ------------------------------------------------------------------ 12 */
  ordering({
    id: 'geo-l05-t01-q12',
    lessonId: LESSON_ID,
    concept: 'ex2-tf-reasoning',
    difficulty: 'medium',
    prompt: [
      'رتّب خطوات البرهان على أن: «إذا كان $B$ نظيرة $C$ بالنسبة إلى $A$، فإن انسحاباً ينقل $C$ إلى $A$ ينقل أيضاً $A$ إلى $B$»:',
    ],
    items: [
      { id: 's1', text: 'من تعريف النظير، النقطة $A$ هي منتصف القطعة $[CB]$' },
      {
        id: 's2',
        text: 'هذا يعني أن $CA = AB$ وأن النقاط $C, A, B$ على استقامة واحدة وبنفس الاتجاه',
      },
      { id: 's3', text: 'إذن الانسحاب الذي ينقل $C$ إلى $A$ ينقل النقطة $A$ إلى $B$' },
    ],
    answerOrder: ['s1', 's2', 's3'],
    sourceRefs: [S_EX2],
  }),

  /* ------------------------------------------------------------------ 13 */
  singleChoice({
    id: 'geo-l05-t01-q13',
    lessonId: LESSON_ID,
    concept: 'ex1-mcq-concepts',
    difficulty: 'medium',
    prompt: [
      'على شبكة إحداثية، انسحاب ينقل النقطة $(1, 1)$ إلى $(4, 3)$. ما صورة القطعة المستقيمة التي طرفاها $(0, 2)$ و $(2, 5)$؟',
    ],
    choices: [
      { id: 'opt-a', text: 'قطعة توازيها ولها الطول نفسه وطرفاها (3, 5) و (5, 8)' },
      { id: 'opt-b', text: 'قطعة عمودية عليها وطرفاها (1, 4) و (3, 7)' },
      { id: 'opt-c', text: 'مستقيم لا نهائي يمر بنقطة الأصل' },
      { id: 'opt-d', text: 'قطعة مضاعفة الطول' },
    ],
    answer: 'opt-a',
    sourceRefs: [S_EX1],
  }),

  /* ------------------------------------------------------------------ 14 */
  exact({
    id: 'geo-l05-t01-q14',
    lessonId: LESSON_ID,
    concept: 'ex1-mcq-concepts',
    difficulty: 'advanced',
    prompt: ['دائرتان متطابقتان مساحة كل منهما $9\\pi$. ما النسبة بين نصفي قطري الدائرتين؟'],
    numerator: 1,
    denominator: 1,
    acceptEquivalentForms: true,
    sourceRefs: [S_EX1],
  }),

  /* ------------------------------------------------------------------ 15 */
  singleChoice({
    id: 'geo-l05-t01-q15',
    lessonId: LESSON_ID,
    concept: 'ex2-tf-reasoning',
    difficulty: 'advanced',
    prompt: [
      "إذا كانت النقطة $M'$ تقع على المستقيم $(d')$ صورة المستقيم $(d)$، فهل هذا يكفي وحده للقول إن $M'$ هي صورة نقطة معينة $M$ من $(d)$؟",
    ],
    choices: [
      {
        id: 'opt-a',
        text: "لا، بل يجب أيضاً أن يكون المتجه من $M$ إلى $M'$ مساوياً لمتجه الانسحاب وموازياً له",
      },
      { id: 'opt-b', text: 'نعم، مجرد وقوعها على المستقيم يكفي دائماً' },
      { id: 'opt-c', text: 'نعم، بشرط أن تكون الزاوية قائمة' },
      { id: 'opt-d', text: 'لا، لأن المستقيم لا يحتوي على صور' },
    ],
    answer: 'opt-a',
    sourceRefs: [S_EX2],
  }),

  /* ------------------------------------------------------------------ 16 */
  errorAnalysis({
    id: 'geo-l05-t01-q16',
    lessonId: LESSON_ID,
    concept: 'ex2-tf-reasoning',
    difficulty: 'advanced',
    prompt: [
      "قال تلميذ: «بما أن الانسحاب ينقل المستقيم $(d)$ إلى $(d')$، فإن أي نقطة على $(d)$ صورتها هي أقرب نقطة إليها على $(d')$ (المسقط العمودي)». ما الخطأ في هذا الفهم؟",
    ],
    steps: [
      {
        id: 'st1',
        text: 'الانسحاب ينقل كل نقطة باتجاه متجه الانسحاب المحدد وليس باتجاه العمود بالضرورة.',
      },
      {
        id: 'st2',
        text: 'المسقط العمودي يحدد المسافة العمودية فقط ولا يمثل صورة النقطة إلا إذا كان اتجاه الانسحاب عمودياً على المستقيم.',
      },
    ],
    choices: [
      {
        id: 'c-err',
        text: 'الخطأ أن صورة النقطة تتبع اتجاه متجه الانسحاب ومسافته، وليست المسقط العمودي دائماً.',
      },
      { id: 'c-ok', text: 'كلام التلميذ صحيح دائماً' },
    ],
    answer: 'c-err',
    sourceRefs: [S_EX2],
  }),

  /* ------------------------------------------------------------------ 17 */
  singleChoice({
    id: 'geo-l05-t01-q17',
    lessonId: LESSON_ID,
    concept: 'ex1-mcq-concepts',
    difficulty: 'advanced',
    prompt: [
      'صورة مثلث قائم زاويته الحادة $35^\\circ$ وفق انسحاب هي مثلث قائم. ما قياس الزاوية الحادة الأخرى في المثلث الناتج؟',
    ],
    choices: [
      { id: 'opt-a', text: '$55^\\circ$' },
      { id: 'opt-b', text: '$35^\\circ$' },
      { id: 'opt-c', text: '$45^\\circ$' },
      { id: 'opt-d', text: '$65^\\circ$' },
    ],
    answer: 'opt-a',
    sourceRefs: [S_EX1],
  }),

  /* ------------------------------------------------------------------ 18 */
  multiSelect({
    id: 'geo-l05-t01-q18',
    lessonId: LESSON_ID,
    concept: 'ex2-tf-reasoning',
    difficulty: 'advanced',
    prompt: [
      "إذا كانت $F'$ صورة شكل $F$ وفق انسحاب ينقل $A$ إلى $A'$. أيُّ الخصائص الآتية محققة بالضرورة؟ (اختر كل الإجابات الصحيحة)",
    ],
    choices: [
      { id: 'c1', text: "كل نقطة من $F$ ومقابلتها في $F'$ تحقق مسافة قدرها $AA'$" },
      { id: 'c2', text: "الشكل $F'$ لا ينقلب كصورة المرآة بل يحافظ على ترتيب اتجاهه" },
      { id: 'c3', text: "كل قطعة مستقيمة في $F$ توازي مقابلتها في $F'$" },
      { id: 'c4', text: 'مركز ثقل الشكل يظل في مكانه الأصلي' },
    ],
    answers: ['c1', 'c2', 'c3'],
    sourceRefs: [S_EX2],
  }),

  /* ------------------------------------------------------------------ 19 */
  errorAnalysis({
    id: 'geo-l05-t01-q19',
    lessonId: LESSON_ID,
    concept: 'ex2-tf-reasoning',
    difficulty: 'thinking',
    prompt: [
      'في إثبات علاقة الانسحاب والتناظر المركزي، زعم طالب: «تكرار الانسحاب مرتين متتاليتين بالمتجه نفسه يعطي تناظراً مركزياً». ما الخلل المنطقي؟',
    ],
    steps: [
      { id: 's1', text: 'تكرار الانسحاب مرتين يعطي انسحاباً جديداً مسافته ضعف المسافة الأولى.' },
      {
        id: 's2',
        text: 'التناظر المركزي يقلب الاتجاه بزاوية $180^\\circ$ ويعيّن نقطة صامدة وحيدة هي المركز، بينما الانسحاب لا نقطة صامدة له إطلاقاً.',
      },
    ],
    choices: [
      {
        id: 'ch-err',
        text: 'الخلل أن تكرار الانسحاب ينتج انسحاباً بمسافة مضاعفة ولا يقلب الاتجاه، بينما التناظر المركزي يقلب الاتجاه ويحتوي مركزاً صامداً.',
      },
      { id: 'ch-ok', text: 'الزعم صحيح والتناظر المركزي هو انسحاب مكرر.' },
    ],
    answer: 'ch-err',
    sourceRefs: [S_EX2],
  }),

  /* ------------------------------------------------------------------ 20 */
  trueFalse({
    id: 'geo-l05-t01-q20',
    lessonId: LESSON_ID,
    concept: 'ex2-tf-reasoning',
    difficulty: 'thinking',
    prompt: [
      'إذا نقل انسحاب النقطة $A$ إلى $B$، ثم نقل انسحاب آخر النقطة $B$ إلى $A$، فإن التحويل المركب يثبت كل نقاط المستوي في أماكنها.',
    ],
    answer: true,
    sourceRefs: [S_EX2],
  }),
];
