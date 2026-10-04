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
 *  BANK — LESSON 4: «تطابق المثلثات» (Textbook pages 17–19)
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
 *      • congruence-cases (حالات تطابق مثلثين الثلاث): 6
 *      • right-triangle-cases (تطابق المثلثات القائمة): 5
 *      • proofs-reasoning (البراهين والاستنتاجات في الأشكال الهندسية): 5
 *      • kite-isosceles (تطبيقات الطائرة الورقية والمثلث المتساوي الساقين): 4
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

const LESSON_ID = 'lesson-04-triangle-congruence';
const P17 = { page: 17, locator: 'نشاط وحالات تطابق مثلثين الثلاث' };
const P18 = { page: 18, locator: 'أمثلة الحالات الثلاث وتطبيقها' };
const P19 = { page: 19, locator: 'تحقق من فهمك وتدرب والطائرة الورقية' };

export const questions: TestQuestionInput[] = [
  /* ------------------------------------------------------------------ 01 */
  singleChoice({
    id: 'geo-l04-t01-q01',
    lessonId: LESSON_ID,
    concept: 'congruence-cases',
    difficulty: 'basic',
    prompt: ['ما هي الحالة الأولى لتطابق مثلثين بحسب ما ورد في الكتاب المدرسي؟'],
    choices: [
      { id: 'opt-a', text: 'تساوي طولي ضلعين وقياس الزاوية المحصورة بينهما مع نظائرها' },
      { id: 'opt-b', text: 'تساوي قياسات الزوايا الثلاث فقط' },
      { id: 'opt-c', text: 'تساوي المساحتين فقط' },
      { id: 'opt-d', text: 'تساوي طولي ضلعين وأية زاوية غير محصورة' },
    ],
    answer: 'opt-a',
    sourceRefs: [P17, P18],
  }),

  /* ------------------------------------------------------------------ 02 */
  trueFalse({
    id: 'geo-l04-t01-q02',
    lessonId: LESSON_ID,
    concept: 'congruence-cases',
    difficulty: 'basic',
    prompt: [
      'إذا تساوت قياسات الزوايا الثلاث في مثلث مع قياسات الزوايا الثلاث في مثلث آخر، فإن المثلثين طبوقان بالضرورة.',
    ],
    answer: false,
    sourceRefs: [P17, P18],
  }),

  /* ------------------------------------------------------------------ 03 */
  singleChoice({
    id: 'geo-l04-t01-q03',
    lessonId: LESSON_ID,
    concept: 'congruence-cases',
    difficulty: 'basic',
    prompt: ['يتطابق مثلثان بحسب الحالة الثالثة إذا تساوت:'],
    choices: [
      { id: 'opt-a', text: 'أطوال أضلاع أحدهما مع مقابلاتها في المثلث الآخر (ثلاثة أضلاع)' },
      { id: 'opt-b', text: 'زاويتان ومحيط المثلث' },
      { id: 'opt-c', text: 'طول ضلع واحد والوتر' },
      { id: 'opt-d', text: 'المساحة والارتفاع فقط' },
    ],
    answer: 'opt-a',
    sourceRefs: [P17, P18],
  }),

  /* ------------------------------------------------------------------ 04 */
  numeric({
    id: 'geo-l04-t01-q04',
    lessonId: LESSON_ID,
    concept: 'kite-isosceles',
    difficulty: 'basic',
    prompt: [
      'مثلث متساوي الساقين $ABC$ فيه $AB = AC = 7.5\\ \\mathrm{cm}$ و $BC = 5\\ \\mathrm{cm}$. طابق مثلثاً آخر $DEF$ تماماً. ما طول الضلع $DE$ بالسنتيمتر إذا كان يناظر الضلع $[AB]$؟',
    ],
    answer: 7.5,
    tolerance: 0,
    unit: 'cm',
    sourceRefs: [P18, P19],
  }),

  /* ------------------------------------------------------------------ 05 */
  singleChoice({
    id: 'geo-l04-t01-q05',
    lessonId: LESSON_ID,
    concept: 'right-triangle-cases',
    difficulty: 'basic',
    prompt: ['يتطابق مثلثان قائمان إذا تساوى في أحدهما مع نظيره في الآخر:'],
    choices: [
      { id: 'opt-a', text: 'الوتر وضلع قائم' },
      { id: 'opt-b', text: 'الوتر وزاوية منفرجة' },
      { id: 'opt-c', text: 'المساحة فقط' },
      { id: 'opt-d', text: 'الزاويتان الحادتان فقط دون أي ضلع' },
    ],
    answer: 'opt-a',
    sourceRefs: [P19],
  }),

  /* ------------------------------------------------------------------ 06 */
  singleChoice({
    id: 'geo-l04-t01-q06',
    lessonId: LESSON_ID,
    concept: 'congruence-cases',
    difficulty: 'medium',
    prompt: [
      'في المثلثين $ABC$ و $DEF$، لدينا $BC = EF = 6\\ \\mathrm{cm}$ والزاويتان المجاورتان $\\widehat{B} = \\widehat{E} = 50^\\circ$ و $\\widehat{C} = \\widehat{F} = 70^\\circ$. ما حالة التطابق التي تُثبت تطابق المثلثين؟',
    ],
    choices: [
      { id: 'opt-a', text: 'الحالة الثانية: طول ضلع وقياسا الزاويتين المجاورتين له' },
      { id: 'opt-b', text: 'الحالة الأولى: ضلعان والزاوية المحصورة' },
      { id: 'opt-c', text: 'الحالة الثالثة: الأضلاع الثلاثة' },
      { id: 'opt-d', text: 'تطابق مثلثين قائمين' },
    ],
    answer: 'opt-a',
    sourceRefs: [P17, P18],
  }),

  /* ------------------------------------------------------------------ 07 */
  trueFalse({
    id: 'geo-l04-t01-q07',
    lessonId: LESSON_ID,
    concept: 'right-triangle-cases',
    difficulty: 'medium',
    prompt: [
      'يتطابق مثلثان قائمان إذا تساوى وتر أحدهما مع وتر الآخر وتساوت زاوية حادة في الأول مع زاوية حادة مناظرة في الثاني.',
    ],
    answer: true,
    sourceRefs: [P19],
  }),

  /* ------------------------------------------------------------------ 08 */
  multiSelect({
    id: 'geo-l04-t01-q08',
    lessonId: LESSON_ID,
    concept: 'proofs-reasoning',
    difficulty: 'medium',
    prompt: [
      'في متوازي الأضلاع $ABCD$، يقسم القطر $[AC]$ الشكل إلى مثلثين $ABC$ و $CDA$. أيُّ الأدلة الآتية تُثبت تطابقهما؟ (اختر كل الإجابات الصحيحة)',
    ],
    choices: [
      { id: 'c1', text: '$[AC]$ ضلع مشتركة بين المثلثين' },
      { id: 'c2', text: '$AB = CD$ لأن كل ضلعين متقابلين في متوازي الأضلاع متساويان' },
      { id: 'c3', text: '$BC = DA$ لأن كل ضلعين متقابلين في متوازي الأضلاع متساويان' },
      { id: 'c4', text: 'لأن أقطار متوازي الأضلاع متعامدة دائماً' },
    ],
    answers: ['c1', 'c2', 'c3'],
    sourceRefs: [P18],
  }),

  /* ------------------------------------------------------------------ 09 */
  numeric({
    id: 'geo-l04-t01-q09',
    lessonId: LESSON_ID,
    concept: 'kite-isosceles',
    difficulty: 'medium',
    prompt: [
      'في مثلث متساوي الساقين $ABC$ رأسه $A$، قياس زاوية الرأس $\\widehat{A} = 40^\\circ$. ما قياس زاوية القاعدة $\\widehat{B}$ بالدرجات؟',
    ],
    answer: 70,
    tolerance: 0,
    unit: '°',
    sourceRefs: [P19],
  }),

  /* ------------------------------------------------------------------ 10 */
  matching({
    id: 'geo-l04-t01-q10',
    lessonId: LESSON_ID,
    concept: 'congruence-cases',
    difficulty: 'medium',
    prompt: ['طابق كل حالة تطابق مع شروطها المقررة في الكتاب:'],
    left: [
      { id: 'c-case1', text: 'الحالة الأولى' },
      { id: 'c-case2', text: 'الحالة الثانية' },
      { id: 'c-case3', text: 'الحالة الثالثة' },
    ],
    right: [
      { id: 'r-case1', text: 'ضلعان والزاوية المحصورة بينهما' },
      { id: 'r-case2', text: 'ضلع والزاويتان المجاورتان له' },
      { id: 'r-case3', text: 'الأضلاع الثلاثة مثنى مثنى' },
    ],
    pairs: { 'c-case1': 'r-case1', 'c-case2': 'r-case2', 'c-case3': 'r-case3' },
    sourceRefs: [P17, P18],
  }),

  /* ------------------------------------------------------------------ 11 */
  classification({
    id: 'geo-l04-t01-q11',
    lessonId: LESSON_ID,
    concept: 'proofs-reasoning',
    difficulty: 'medium',
    prompt: [
      'صنّف مجموعات المعطيات الآتية إلى معطيات تكفي لإثبات تطابق مثلثين، أو معطيات غير كافية:',
    ],
    categories: [
      { id: 'cat-suff', text: 'كافية لإثبات التطابق' },
      { id: 'cat-insuff', text: 'غير كافية لإثبات التطابق' },
    ],
    items: [
      { id: 'i1', text: 'ثلاثة أضلاع متناظرة متساوية' },
      { id: 'i2', text: 'ثلاث زوايا متناظرة متساوية' },
      { id: 'i3', text: 'ضلعان والزاوية المحصورة بينهما' },
      { id: 'i4', text: 'وتر وضلع قائم في مثلثين قائمين' },
    ],
    assignment: {
      i1: 'cat-suff',
      i2: 'cat-insuff',
      i3: 'cat-suff',
      i4: 'cat-suff',
    },
    sourceRefs: [P17, P18, P19],
  }),

  /* ------------------------------------------------------------------ 12 */
  ordering({
    id: 'geo-l04-t01-q12',
    lessonId: LESSON_ID,
    concept: 'proofs-reasoning',
    difficulty: 'medium',
    prompt: ['رتّب خطوات كتابة برهان سليم لتطابق مثلثين بحسب منهج الهندسة:'],
    items: [
      { id: 's1', text: 'تحديد المثلثين المراد إثبات تطابقهما وذكر عناصرهما المشتركة أو المعطاة' },
      { id: 's2', text: 'تطبيق حالة التطابق المناسبة (ضلعان وزاوية، أو ضلع وزاويتان، أو 3 أضلاع)' },
      { id: 's3', text: 'استنتاج تساوي بقية العناصر المتناظرة (أضلاع وزوايا) كنتيجة للتطابق' },
    ],
    answerOrder: ['s1', 's2', 's3'],
    sourceRefs: [P18, P19],
  }),

  /* ------------------------------------------------------------------ 13 */
  singleChoice({
    id: 'geo-l04-t01-q13',
    lessonId: LESSON_ID,
    concept: 'kite-isosceles',
    difficulty: 'medium',
    prompt: [
      'في شكل الطائرة الورقية $ABCD$ حيث $AB = AD$ و $CB = CD$. ما هما المثلثان الطبوقان اللذان يشتركان في القطر $[AC]$؟',
    ],
    choices: [
      { id: 'opt-a', text: 'المثلثان $ABC$ و $ADC$' },
      { id: 'opt-b', text: 'المثلثان $ABD$ و $CBD$' },
      { id: 'opt-c', text: 'لا يوجد مثلثان طبوقان في الطائرة الورقية' },
      { id: 'opt-d', text: 'المثلثان متطابقان فقط إذا كان الشكل مربعاً' },
    ],
    answer: 'opt-a',
    sourceRefs: [P19],
  }),

  /* ------------------------------------------------------------------ 14 */
  exact({
    id: 'geo-l04-t01-q14',
    lessonId: LESSON_ID,
    concept: 'right-triangle-cases',
    difficulty: 'advanced',
    prompt: [
      'مثلثان قائمان طبوقان مساحة كل منهما $12\\ \\mathrm{cm}^2$. طول أحد الأضلاع القائمة في الأول $4\\ \\mathrm{cm}$. ما طول الضلع القائم الآخر بالسنتيمتر؟ (اكتب الإجابة كعدد أو كسر)',
    ],
    numerator: 6,
    denominator: 1,
    acceptEquivalentForms: true,
    sourceRefs: [P18, P19],
  }),

  /* ------------------------------------------------------------------ 15 */
  singleChoice({
    id: 'geo-l04-t01-q15',
    lessonId: LESSON_ID,
    concept: 'right-triangle-cases',
    difficulty: 'advanced',
    prompt: [
      'في المثلثين القائمين $ABC$ في $A$ و $DEF$ في $D$، لدينا الوتران متساويان $BC = EF$ وضلعان قائمان $AB = DE$. ماذا نستنتج حتماً عن الضلعين القائمين الآخرين $[AC]$ و $[DF]$؟',
    ],
    choices: [
      { id: 'opt-a', text: '$AC = DF$ بحكم تطابق المثلثين القائمين' },
      { id: 'opt-b', text: '$AC > DF$ دائماً' },
      { id: 'opt-c', text: 'لا يمكن معرفة العلاقة دون معرفة الزوايا الحادة' },
      { id: 'opt-d', text: '$AC + DF = BC$' },
    ],
    answer: 'opt-a',
    sourceRefs: [P19],
  }),

  /* ------------------------------------------------------------------ 16 */
  errorAnalysis({
    id: 'geo-l04-t01-q16',
    lessonId: LESSON_ID,
    concept: 'congruence-cases',
    difficulty: 'advanced',
    prompt: [
      'كتب تلميذ: «المثلثان $ABC$ و $DEF$ فيهما $AB = DE$ و $BC = EF$ والزاوية $\\widehat{A} = \\widehat{D}$، إذن هما طبوقان بحسب الحالة الأولى». أين وجه الخطأ في هذا الاستدلال؟',
    ],
    steps: [
      {
        id: 'st1',
        text: 'الضلعان المعطيان هما $[AB]$ و $[BC]$، والزاوية المحصورة بينهما هي الزاوية $\\widehat{B}$.',
      },
      {
        id: 'st2',
        text: 'الزاوية $\\widehat{A}$ المعطاة ليست هي الزاوية المحصورة بين الضلعين المعطيين، فلا تنطبق الحالة الأولى.',
      },
    ],
    choices: [
      {
        id: 'c-err',
        text: 'الخطأ أن الزاوية المعطاة $\\widehat{A}$ غير محصورة بين الضلعين $[AB]$ و $[BC]$، وتطابق ضلعين وزاوية غير محصورة لا يضمن تطابق المثلثين في العموم.',
      },
      { id: 'c-ok', text: 'الاستدلال صحيح والحالة الأولى لا تشترط أن تكون الزاوية محصورة.' },
    ],
    answer: 'c-err',
    sourceRefs: [P17, P18],
  }),

  /* ------------------------------------------------------------------ 17 */
  singleChoice({
    id: 'geo-l04-t01-q17',
    lessonId: LESSON_ID,
    concept: 'proofs-reasoning',
    difficulty: 'advanced',
    prompt: [
      'في الشكل الذي فيه مستقيمان متقاطعان في $M$ بحيث $AM = ME$ و $BM = MF$. ما سبب تطابق المثلثين $AMB$ و $EMF$؟',
    ],
    choices: [
      {
        id: 'opt-a',
        text: 'تساوي ضلعي كل منهما وتساوي الزاويتين $\\widehat{AMB} = \\widehat{EMF}$ للتقابل بالرأس (الحالة الأولى)',
      },
      { id: 'opt-b', text: 'تساوي الأضلاع الثلاثة مباشرة بدون زوايا' },
      { id: 'opt-c', text: 'لأنهما مثلثان قائمان' },
      { id: 'opt-d', text: 'لأن المستقيمين متعامدان' },
    ],
    answer: 'opt-a',
    sourceRefs: [P18],
  }),

  /* ------------------------------------------------------------------ 18 */
  multiSelect({
    id: 'geo-l04-t01-q18',
    lessonId: LESSON_ID,
    concept: 'right-triangle-cases',
    difficulty: 'advanced',
    prompt: [
      'في مثلث متساوي الساقين $ABC$ ($AB = AC$)، رُسم الارتفاع $[AH]$ المتعلق بالقاعدة $[BC]$. أيُّ العبارات الآتية صحيحة ناتجة عن تطابق المثلثين القائمين $ABH$ و $ACH$؟ (اختر كل الإجابات الصحيحة)',
    ],
    choices: [
      { id: 'c1', text: '$BH = HC$ أي أن الارتفاع ينصّف القاعدة' },
      { id: 'c2', text: '$\\widehat{BAH} = \\widehat{CAH}$ أي أن الارتفاع ينصّف زاوية الرأس' },
      {
        id: 'c3',
        text: 'المثلثان $ABH$ و $ACH$ طبوقان لتساوي الوتر $AB=AC$ وضلع قائم مشترك $[AH]$',
      },
      { id: 'c4', text: '$AH = BC$ دائماً' },
    ],
    answers: ['c1', 'c2', 'c3'],
    sourceRefs: [P19],
  }),

  /* ------------------------------------------------------------------ 19 */
  errorAnalysis({
    id: 'geo-l04-t01-q19',
    lessonId: LESSON_ID,
    concept: 'congruence-cases',
    difficulty: 'thinking',
    prompt: [
      'ادعى طالب: «إذا تطابق مثلثان في محيطيهما ومساحتيهما، فإنهما طبوقان بالضرورة». كيف تفند هذا الادعاء هندسياً؟',
    ],
    steps: [
      {
        id: 's1',
        text: 'تطابق المحيط والمساحة لا يعني بالضرورة تساوي أطوال الأضلاع الثلاثة مثنى مثنى.',
      },
      {
        id: 's2',
        text: 'يمكن أن نجد مثلثاً أضلاعه مختلفة تماماً وله نفس المحيط والمساحة لمثلث آخر.',
      },
    ],
    choices: [
      {
        id: 'ch-err',
        text: 'الادعاء خاطئ؛ فتساوي المحيط والمساحة لا يضمن تساوي الأضلاع والزوايا المتناظرة ولا يدخل ضمن حالات التطابق الثلاث المبرهنة.',
      },
      { id: 'ch-ok', text: 'الادعاء صحيح ومبرهن في الهندسة.' },
    ],
    answer: 'ch-err',
    sourceRefs: [P17, P18],
  }),

  /* ------------------------------------------------------------------ 20 */
  trueFalse({
    id: 'geo-l04-t01-q20',
    lessonId: LESSON_ID,
    concept: 'kite-isosceles',
    difficulty: 'thinking',
    prompt: [
      'إذا تساوى قياسا زاويتين في مثلث، كان المثلث متساوي الساقين، ويمكن إثبات ذلك بإسقاط ارتفاع وتطبيق حالات تطابق المثلثات القائمة.',
    ],
    answer: true,
    sourceRefs: [P19],
  }),
];
