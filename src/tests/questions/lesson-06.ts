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
 *  BANK — LESSON 6: «تتمة الدرس الخامس (1)» (Questions 3–15)
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
 *      • congruence-proofs (تطابق المثلثات القائمة وتطبيقاتها): 5
 *      • parallelogram-symmetry (إكمال متوازي الأضلاع والتناظر المركزي): 5
 *      • grid-coordinates-transforms (الانسحاب المتكرر والإحداثيات على الشبكة): 5
 *      • geometric-constructions (إنشاءات الفرجار والمسطرة والحالات الست): 5
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

const LESSON_ID = 'lesson-06-unit-one-exercises-continuation';
const S_EX = { page: 'تمرينات 3–15', locator: 'الأسئلة 3 إلى 15' };

export const questions: TestQuestionInput[] = [
  /* ------------------------------------------------------------------ 01 */
  singleChoice({
    id: 'geo-l06-t01-q01',
    lessonId: LESSON_ID,
    concept: 'congruence-proofs',
    difficulty: 'basic',
    prompt: ['يتطابق مثلثان قائمان إذا تساوى فيهما:'],
    choices: [
      { id: 'opt-a', text: 'الوتر وزاوية حادة متناظرة' },
      { id: 'opt-b', text: 'الزاويتان الحادتان فقط دون أي ضلع' },
      { id: 'opt-c', text: 'المحيطان فقط' },
      { id: 'opt-d', text: 'المساحتان فقط' },
    ],
    answer: 'opt-a',
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 02 */
  trueFalse({
    id: 'geo-l06-t01-q02',
    lessonId: LESSON_ID,
    concept: 'parallelogram-symmetry',
    difficulty: 'basic',
    prompt: ['إذا تناصف قطرا شكل رباعي، كان الرباعي متوازي أضلاع بالضرورة.'],
    answer: true,
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 03 */
  singleChoice({
    id: 'geo-l06-t01-q03',
    lessonId: LESSON_ID,
    concept: 'grid-coordinates-transforms',
    difficulty: 'basic',
    prompt: [
      'إذا كان متجه الانسحاب هو $(u, v) = (3, -2)$، فما صورة النقطة $(4, 5)$ وفق هذا الانسحاب؟',
    ],
    choices: [
      { id: 'opt-a', text: '$(7, 3)$' },
      { id: 'opt-b', text: '$(1, 7)$' },
      { id: 'opt-c', text: '$(12, -10)$' },
      { id: 'opt-d', text: '$(7, 7)$' },
    ],
    answer: 'opt-a',
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 04 */
  numeric({
    id: 'geo-l06-t01-q04',
    lessonId: LESSON_ID,
    concept: 'grid-coordinates-transforms',
    difficulty: 'basic',
    prompt: [
      'مثلث قائم طولا ضلعيه القائمين $3\\ \\mathrm{cm}$ و $4\\ \\mathrm{cm}$. طُبِّق عليه انسحاب. ما طول وتر المثلث الناتج بالسنتيمتر؟',
    ],
    answer: 5,
    tolerance: 0,
    unit: 'cm',
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 05 */
  singleChoice({
    id: 'geo-l06-t01-q05',
    lessonId: LESSON_ID,
    concept: 'geometric-constructions',
    difficulty: 'basic',
    prompt: ['ما هي صورة مستقيم $(d)$ وفق انسحاب معلوم؟'],
    choices: [
      { id: 'opt-a', text: 'مستقيم يوازيه (أو ينطبق عليه)' },
      { id: 'opt-b', text: 'مستقيم يعامده دائماً' },
      { id: 'opt-c', text: 'دائرة تمر بالمركز' },
      { id: 'opt-d', text: 'قطعة مستقيمة محدودة' },
    ],
    answer: 'opt-a',
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 06 */
  singleChoice({
    id: 'geo-l06-t01-q06',
    lessonId: LESSON_ID,
    concept: 'congruence-proofs',
    difficulty: 'medium',
    prompt: [
      'في مثلث متساوي الساقين $ABC$ ($AB = AC$)، رُسم منصف الزاوية $\\widehat{A}$ وقطع القاعدة $[BC]$ في $D$. ما سبب تطابق المثلثين $ABD$ و $ACD$؟',
    ],
    choices: [
      {
        id: 'opt-a',
        text: 'تساوي ضلعين $AB=AC$ وزاويتين محصورتين وضلع مشترك $[AD]$ (الحالة الأولى)',
      },
      { id: 'opt-b', text: 'لأنهما متجاوران فقط' },
      { id: 'opt-c', text: 'تساوي الأضلاع الثلاثة مباشرة بدون برهان' },
      { id: 'opt-d', text: 'لأن الزاوية $\\widehat{D}$ قائمة بالفرض' },
    ],
    answer: 'opt-a',
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 07 */
  trueFalse({
    id: 'geo-l06-t01-q07',
    lessonId: LESSON_ID,
    concept: 'geometric-constructions',
    difficulty: 'medium',
    prompt: [
      "لإنشاء صورة مستقيم $(d)$ يمر بنقطة معلومة $C$ وفق انسحاب، يكفي إنشاء صورة النقطة $C'$ ثم رسم المستقيم الموازي لـ $(d)$ والمار بـ $C'$.",
    ],
    answer: true,
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 08 */
  multiSelect({
    id: 'geo-l06-t01-q08',
    lessonId: LESSON_ID,
    concept: 'parallelogram-symmetry',
    difficulty: 'medium',
    prompt: [
      'متوازي الأضلاع ذو الزاوية القائمة هو مستطيل. أيُّ الخواص الآتية صحيحة له؟ (اختر كل الإجابات الصحيحة)',
    ],
    choices: [
      { id: 'c1', text: 'قطراه متساويا الطول ومتناصفان' },
      { id: 'c2', text: 'جميع زواياه الأربع قائمة ($90^\\circ$)' },
      { id: 'c3', text: 'كل ضلعين متقابلين فيه متوازيان ومتساويان' },
      { id: 'c4', text: 'قطراه متعامدان دائماً حتى لو لم يكن مربعاً' },
    ],
    answers: ['c1', 'c2', 'c3'],
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 09 */
  numeric({
    id: 'geo-l06-t01-q09',
    lessonId: LESSON_ID,
    concept: 'grid-coordinates-transforms',
    difficulty: 'medium',
    prompt: [
      'إذا طُبِّق انسحاب ينقل $(0, 0)$ إلى $(2, 3)$ ثلاث مرات متتالية على النقطة $(1, 1)$. ما الإحداثي الصادي النهائي للنقطة الناتجة؟',
    ],
    answer: 10,
    tolerance: 0,
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 10 */
  matching({
    id: 'geo-l06-t01-q10',
    lessonId: LESSON_ID,
    concept: 'parallelogram-symmetry',
    difficulty: 'medium',
    prompt: ['طابق كل تحويل هندسي مع الخاصية المميزة له:'],
    left: [
      { id: 't-trans', text: 'الانسحاب' },
      { id: 't-symm', text: 'التناظر المركزي' },
    ],
    right: [
      { id: 'p-trans', text: 'يحافظ على اتجاه الشكل وتوازي الأضلاع النظيرة دون نقطة صامدة' },
      { id: 'p-symm', text: 'يقلب الاتجاه بنصف دورة وله مركز صامد هو منتصف كل نقطة ونظيرتها' },
    ],
    pairs: { 't-trans': 'p-trans', 't-symm': 'p-symm' },
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 11 */
  classification({
    id: 'geo-l06-t01-q11',
    lessonId: LESSON_ID,
    concept: 'geometric-constructions',
    difficulty: 'medium',
    prompt: ['صنّف حالات إنشاء صورة مستقيم بالانسحاب وفقاً لعلاقة مستقيم الصورة بالمستقيم الأصلي:'],
    categories: [
      { id: 'cat-coincide', text: 'المستقيمان ينطبقان' },
      { id: 'cat-parallel-distinct', text: 'المستقيمان متوازيان متمايزان' },
    ],
    items: [
      { id: 'cs1', text: 'اتجاه الانسحاب يوازي المستقيم' },
      { id: 'cs2', text: 'اتجاه الانسحاب عمودي على المستقيم' },
      { id: 'cs3', text: 'اتجاه الانسحاب يصنع زاوية حادة مع المستقيم' },
      { id: 'cs4', text: 'مسافة الانسحاب واقعة على المستقيم نفسه' },
    ],
    assignment: {
      cs1: 'cat-coincide',
      cs2: 'cat-parallel-distinct',
      cs3: 'cat-parallel-distinct',
      cs4: 'cat-coincide',
    },
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 12 */
  ordering({
    id: 'geo-l06-t01-q12',
    lessonId: LESSON_ID,
    concept: 'parallelogram-symmetry',
    difficulty: 'medium',
    prompt: ['رتّب خطوات إثبات أن النقطة $O$ هي منتصف القطرين في متوازي الأضلاع $ABCD$:'],
    items: [
      {
        id: 's1',
        text: 'إثبات تطابق المثلثين $OAB$ و $OCD$ بالزاويتين المتبادلتين داخلاً والضلع $AB=CD$',
      },
      { id: 's2', text: 'استنتاج تساوي القطعتين $OA = OC$ و $OB = OD$ من نتائج التطابق' },
      { id: 's3', text: 'استنتاج أن النقطة $O$ هي منتصف كل من القطرين $[AC]$ و $[BD]$' },
    ],
    answerOrder: ['s1', 's2', 's3'],
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 13 */
  singleChoice({
    id: 'geo-l06-t01-q13',
    lessonId: LESSON_ID,
    concept: 'grid-coordinates-transforms',
    difficulty: 'medium',
    prompt: [
      'مستطيل $R$ صُوِّر بثلاثة انسحابات متتالية مختلفة. ما العلاقة بين المستطيل النهائي والمستطيل الأصلي؟',
    ],
    choices: [
      { id: 'opt-a', text: 'مطابق له تماماً وتوازي أضلاعه أضلاع المستطيل الأصلي' },
      { id: 'opt-b', text: 'مختلف في المساحة والزوايا' },
      { id: 'opt-c', text: 'دائماً مربع' },
      { id: 'opt-d', text: 'معكوس كصورة المرآة' },
    ],
    answer: 'opt-a',
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 14 */
  exact({
    id: 'geo-l06-t01-q14',
    lessonId: LESSON_ID,
    concept: 'congruence-proofs',
    difficulty: 'advanced',
    prompt: [
      'مثلثان قائمان طبوقان طول وتر كل منهما $10\\ \\mathrm{cm}$ وطول أحد الأضلاع القائمة $8\\ \\mathrm{cm}$. ما النسبة بين مساحة المثلث الأول ومساحة المثلث الثاني؟',
    ],
    numerator: 1,
    denominator: 1,
    acceptEquivalentForms: true,
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 15 */
  singleChoice({
    id: 'geo-l06-t01-q15',
    lessonId: LESSON_ID,
    concept: 'congruence-proofs',
    difficulty: 'advanced',
    prompt: [
      'في مثلث متساوي الساقين $ABC$، إذا كان الارتفاع ينصف زاوية الرأس وينصف القاعدة، فهل يمثل محور تناظر للمثلث؟',
    ],
    choices: [
      { id: 'opt-a', text: 'نعم، لأن التناظر المحوري حوله يطابق المثلث $ABH$ على $ACH$' },
      { id: 'opt-b', text: 'لا، محور التناظر للمستطيل فقط' },
      { id: 'opt-c', text: 'نعم، ولكن فقط إذا كان المثلث متساوي الأضلاع' },
      { id: 'opt-d', text: 'لا علاقة بين الارتفاع ومحور التناظر' },
    ],
    answer: 'opt-a',
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 16 */
  errorAnalysis({
    id: 'geo-l06-t01-q16',
    lessonId: LESSON_ID,
    concept: 'parallelogram-symmetry',
    difficulty: 'advanced',
    prompt: [
      'قال طالب: «بما أن قطري الشكل الرباعي متساويان في الطول، فإن الشكل مستطيل حتماً». ما الخطأ في هذا الاستنتاج؟',
    ],
    steps: [
      {
        id: 'st1',
        text: 'شبه المنحرف متساوي الساقين قطراه متساويان في الطول ومع ذلك ليس مستطيلاً.',
      },
      {
        id: 'st2',
        text: 'ليكون الرباعي مستطيلاً، يجب أن يكون متوازي أضلاع أولاً (قطراه متناصفان) ومتساوي القطرين معاً.',
      },
    ],
    choices: [
      {
        id: 'c-err',
        text: 'الخطأ أن تساوي القطرين وحده لا يكفي؛ بل يجب أن يتناصف القطران أيضاً (أي يكون متوازي أضلاع أولاً).',
      },
      { id: 'c-ok', text: 'استنتاج الطالب سليم مئة بالمئة.' },
    ],
    answer: 'c-err',
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 17 */
  singleChoice({
    id: 'geo-l06-t01-q17',
    lessonId: LESSON_ID,
    concept: 'geometric-constructions',
    difficulty: 'advanced',
    prompt: [
      'إذا نُقل مثلث قائم باتجاه وتره بانسحاب مسافته تساوي طول الوتر، فما الوضع النسبي للوتر الأصلي ووصف وتر الصورة؟',
    ],
    choices: [
      { id: 'opt-a', text: 'يقعان على مستقيم واحد متجاورين ويشتركان بنقطة واحدة' },
      { id: 'opt-b', text: 'متعامدان' },
      { id: 'opt-c', text: 'متباعدان بمسافة عمودية' },
      { id: 'opt-d', text: 'ينطبقان تماماً' },
    ],
    answer: 'opt-a',
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 18 */
  multiSelect({
    id: 'geo-l06-t01-q18',
    lessonId: LESSON_ID,
    concept: 'grid-coordinates-transforms',
    difficulty: 'advanced',
    prompt: [
      'على شبكة منتظمة، إذا كانت $T$ عملية انسحاب بمتجه $(3, 4)$، أيُّ العبارات الآتية صحيحة عددياً وهندسياً؟ (اختر كل الإجابات الصحيحة)',
    ],
    choices: [
      { id: 'c1', text: 'مسافة الانسحاب لكل نقطة هي $\\sqrt{3^2 + 4^2} = 5$ وحدات' },
      { id: 'c2', text: 'صورة النقطة $(1, 1)$ هي $(4, 5)$' },
      { id: 'c3', text: 'صورة أي قطعة طولها $7$ وحدات هي قطعة طولها $7$ وحدات' },
      { id: 'c4', text: 'صورة المستقيم $(x=0)$ هي المستقيم نفسه' },
    ],
    answers: ['c1', 'c2', 'c3'],
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 19 */
  errorAnalysis({
    id: 'geo-l06-t01-q19',
    lessonId: LESSON_ID,
    concept: 'congruence-proofs',
    difficulty: 'thinking',
    prompt: [
      'في برهان تطابق مثلثين قائمين، كتب تلميذ: «المثلثان طبوقان لأن زواياهما الثلاث متساوية ($90^\\circ$ و $45^\\circ$ و $45^\\circ$)». كيف تصحح هذا البرهان؟',
    ],
    steps: [
      {
        id: 's1',
        text: 'تساوي الزوايا يثبت أن المثلثين متشابهان فقط، فقد يكون أحدهما صغيراً والآخر كبيراً.',
      },
      {
        id: 's2',
        text: 'لإثبات التطابق لا بد من إثبات تساوي ضلع واحد على الأقل (كالوتر أو أحد الضلعين القائمين).',
      },
    ],
    choices: [
      {
        id: 'ch-err',
        text: 'التصحيح: لا يكفي تساوي الزوايا بل يشترط تساوي ضلع متناظر واحد على الأقل لإثبات التطابق.',
      },
      { id: 'ch-ok', text: 'البرهان لا يحتاج تصحيحاً.' },
    ],
    answer: 'ch-err',
    sourceRefs: [S_EX],
  }),

  /* ------------------------------------------------------------------ 20 */
  trueFalse({
    id: 'geo-l06-t01-q20',
    lessonId: LESSON_ID,
    concept: 'parallelogram-symmetry',
    difficulty: 'thinking',
    prompt: [
      "إذا كانت $A'$ صورة $A$ بانسحاب، وكانت $A''$ نظيرة $A'$ بالنسبة لنقطة $O$، فإن التحويل الكلي المركب ليس انسحاباً بالضرورة بل يعكس الاتجاه.",
    ],
    answer: true,
    sourceRefs: [S_EX],
  }),
];
