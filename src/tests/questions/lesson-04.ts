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
 *  BANK — LESSON 4: «تطابق المثلثات» (Textbook pages 17–19)
 * ============================================================================
 *
 *  BLUEPRINT (Contract verified by src/tests/audit.test.ts):
 *    Total questions: 20 (31 points total)
 *    Difficulty:
 *      • basic:    5
 *      • medium:   8
 *      • advanced: 5
 *      • thinking: 2
 *    Coverage:
 *      • congruence-cases (حالات تطابق مثلثين الثلاث الأساسية): 7
 *      • right-triangle-cases (تطابق المثلثات القائمة): 5
 *      • proofs-reasoning (البراهين والاستنتاجات في متوازي الأضلاع والمضلعات): 4
 *      • kite-isosceles (تطبيقات الطائرة الورقية والمثلث المتساوي الساقين): 4
 *    Types:
 *      • single-choice:      7
 *      • true-false-justify: 3
 *      • multi-select:       2
 *      • numeric:            2
 *      • exact:              1
 *      • ordering:           1
 *      • matching:           1
 *      • classification:     1
 *      • error-analysis:     2
 * ============================================================================
 */

const LESSON_ID = 'lesson-04-triangle-congruence';

const P17_ACT = { page: 17, locator: 'نشاط استكشاف تطابق المثلثات' };
const P17_DEF = { page: 17, locator: 'تعلّم — تعريف تطابق مثلثين وتساوي العناصر المتقابلة' };
const P17_CASE1 = {
  page: 17,
  locator: 'حالات تطابق مثلثين — الحالة الأولى (ضلعان وزاوية محصورة)',
};
const P18_EX1 = { page: 18, locator: 'المثال الأول — تطبيق الحالة الأولى مع التقابل بالرأس' };
const P18_CASE2 = {
  page: 18,
  locator: 'حالات تطابق مثلثين — الحالة الثانية (ضلع وزاويتان مجاورتان)',
};
const P18_CASES_2_3 = {
  page: 18,
  locator: 'حالات تطابق مثلثين — الحالتان الثانية والثالثة',
};
const P18_CASE3 = {
  page: 18,
  locator: 'حالات تطابق مثلثين — الحالة الثالثة (الأضلاع الثلاثة)',
};
const P18_EX3 = { page: 18, locator: 'المثال الثالث — متوازي الأضلاع والقطر المشترك' };
const P18_PROOFS = { page: 18, locator: 'بنية البرهان في الأمثلة المحلولة للحالات الثلاث' };
const P19_KITE = { page: 19, locator: 'تدرّب ① — الطائرة الورقية وتطابق المثلثات' };
const P19_ISOSCELES = {
  page: 19,
  locator: 'تدرّب ③ — المثلث المتساوي الساقين واستنتاج تساوي العناصر',
};
const P19_RIGHT = { page: 19, locator: 'الملاحظة الختامية — حالتا تطابق مثلثين قائمين' };

// Exact trigonometric layout for q06: BC = EF = 6, ∠B = ∠E = 50°, ∠C = ∠F = 70°.
const asaBase = 6;
const asaAngleB = (50 * Math.PI) / 180;
const asaSideBA = (asaBase * Math.sin((70 * Math.PI) / 180)) / Math.sin((60 * Math.PI) / 180);
const asaApexX = asaSideBA * Math.cos(asaAngleB);
const asaApexY = asaSideBA * Math.sin(asaAngleB);

export const questions: TestQuestionInput[] = [
  /* ------------------------------------------------------------------ 01 */
  singleChoice({
    id: 'geo-l04-t01-q01',
    lessonId: LESSON_ID,
    concept: 'congruence-cases',
    difficulty: 'basic',
    prompt: ['ما هي الحالة الأولى لتطابق مثلثين بحسب ما ورد في الكتاب المدرسي؟'],
    choices: [
      { id: 'opt-a', text: 'تساوي قياسات الزوايا الثلاث فقط' },
      {
        id: 'opt-b',
        text: 'تساوي طولي ضلعين وقياس الزاوية المحصورة بينهما من الأول مع مقابلاتها في الآخر',
      },
      { id: 'opt-c', text: 'تساوي المساحتين فقط' },
      { id: 'opt-d', text: 'تساوي طولي ضلعين وقياس أي زاوية غير محصورة بينهما' },
    ],
    answer: 'opt-b',
    sourceRefs: [P17_CASE1],
  }),

  /* ------------------------------------------------------------------ 02 */
  trueFalseJustify({
    id: 'geo-l04-t01-q02',
    lessonId: LESSON_ID,
    concept: 'congruence-cases',
    difficulty: 'basic',
    prompt: [
      'إذا تساوت قياسات الزوايا الثلاث في مثلث مع قياسات الزوايا الثلاث المقابلة لها في مثلث آخر، فإن المثلثين طبوقان بالضرورة.',
    ],
    answer: false,
    correction: choicePart({
      id: 'correction',
      prompt: ['اختر التصحيح الصحيح للعبارة:'],
      choices: [
        {
          id: 'fix-two-angles',
          text: 'يكفي تساوي زاويتين فقط من دون أي ضلع لثبوت تطابق المثلثين.',
        },
        {
          id: 'fix-side',
          text: 'لا يكفي تساوي الزوايا الثلاث وحده للتطابق، بل يلزم تحقق إحدى حالات التطابق التي تشمل تساوي ضلع واحد على الأقل مع مقابله.',
        },
        {
          id: 'fix-sum',
          text: 'يتطابق المثلثان بتساوي الزوايا فقط عندما يزيد مجموع زواياهما على $180^\\circ$.',
        },
      ],
      answer: 'fix-side',
    }),
    sourceRefs: [P17_DEF, P17_CASE1, P18_CASES_2_3],
  }),

  /* ------------------------------------------------------------------ 03 */
  singleChoice({
    id: 'geo-l04-t01-q03',
    lessonId: LESSON_ID,
    concept: 'congruence-cases',
    difficulty: 'basic',
    prompt: ['يتطابق مثلثان بحسب الحالة الثالثة إذا تساوت:'],
    choices: [
      { id: 'opt-a', text: 'زاويتان ومحيط المثلث فقط' },
      { id: 'opt-b', text: 'المساحة والارتفاع المتعلق بأحد الأضلاع فقط' },
      {
        id: 'opt-c',
        text: 'أطوال أضلاع أحدهما الثلاثة مع مقابلاتها في المثلث الآخر',
      },
      { id: 'opt-d', text: 'طول ضلع واحد وقياس زاوية مقابلة له فقط' },
    ],
    answer: 'opt-c',
    sourceRefs: [P18_CASE3],
  }),

  /* ------------------------------------------------------------------ 04 */
  numeric({
    id: 'geo-l04-t01-q04',
    lessonId: LESSON_ID,
    concept: 'kite-isosceles',
    difficulty: 'basic',
    prompt: [
      'مثلث متساوي الساقين $ABC$ رأسه الأساسي $A$ (أي $AB = AC$)، فيه $AC = 7.5\\ \\mathrm{cm}$ و$BC = 5\\ \\mathrm{cm}$. إذا طابق المثلثُ $ABC$ المثلثَ $DEF$ وكان الضلع $[DE]$ مقابلاً للضلع $[AB]$، فما طول الضلع $[DE]$ بالسنتيمتر؟',
    ],
    answer: 7.5,
    tolerance: 0,
    unit: 'cm',
    sourceRefs: [P17_DEF, P19_ISOSCELES],
  }),

  /* ------------------------------------------------------------------ 05 */
  singleChoice({
    id: 'geo-l04-t01-q05',
    lessonId: LESSON_ID,
    concept: 'right-triangle-cases',
    difficulty: 'basic',
    prompt: ['يتطابق مثلثان قائمان إذا تساوى في أحدهما مع مقابله في الآخر:'],
    choices: [
      { id: 'opt-a', text: 'وتر وضلع قائمة' },
      { id: 'opt-b', text: 'وتر وزاوية منفرجة' },
      { id: 'opt-c', text: 'المساحة فقط' },
      { id: 'opt-d', text: 'الزاويتان الحادتان فقط من دون أي ضلع' },
    ],
    answer: 'opt-a',
    sourceRefs: [P19_RIGHT],
  }),

  /* ------------------------------------------------------------------ 06 */
  singleChoice({
    id: 'geo-l04-t01-q06',
    lessonId: LESSON_ID,
    concept: 'congruence-cases',
    difficulty: 'medium',
    prompt: [
      'في المثلثين $ABC$ و$DEF$، لدينا $BC = EF = 6\\ \\mathrm{cm}$ والزاويتان المجاورتان $\\widehat{B} = \\widehat{E} = 50^\\circ$ و$\\widehat{C} = \\widehat{F} = 70^\\circ$. ما حالة التطابق التي تُثبت تطابق المثلثين؟',
      figureBlock(
        testFigure({
          id: 'test-l04-q06-corresponding-triangles',
          alt: 'مثلثان $ABC$ و$DEF$؛ الرأس $A$ يقابل $D$، والضلع $[BC]$ يقابل $[EF]$، والعلامات تقتصر على الضلع والزاويتين المذكورة في السؤال.',
          caption:
            'رسم تخطيطي غير مقيّس يستند إلى المعطيات المذكورة في السؤال من دون إظهار قياسات إضافية.',
          sourceRefs: [P17_ACT, P18_CASE2],
          spec: {
            points: [
              { id: 'A', x: asaApexX, y: asaApexY, labelSide: 'n' },
              { id: 'B', x: 0, y: 0, labelSide: 'sw' },
              { id: 'C', x: asaBase, y: 0, labelSide: 'se' },
              { id: 'D', x: 9 + asaApexX, y: asaApexY, labelSide: 'n' },
              { id: 'E', x: 9, y: 0, labelSide: 'sw' },
              { id: 'F', x: 9 + asaBase, y: 0, labelSide: 'se' },
            ],
            segments: [
              { from: 'A', to: 'B' },
              { from: 'B', to: 'C', ticks: 1 },
              { from: 'C', to: 'A' },
              { from: 'D', to: 'E' },
              { from: 'E', to: 'F', ticks: 1 },
              { from: 'F', to: 'D' },
            ],
            angles: [
              { at: 'B', from: 'A', to: 'C' },
              { at: 'C', from: 'B', to: 'A' },
              { at: 'E', from: 'D', to: 'F' },
              { at: 'F', from: 'E', to: 'D' },
            ],
            questionLabels: ['A', 'B', 'C', 'D', 'E', 'F'],
          },
        }),
      ),
    ],
    choices: [
      { id: 'opt-a', text: 'الحالة الأولى: طول ضلعين وقياس الزاوية المحصورة بينهما' },
      { id: 'opt-b', text: 'الحالة الثانية: طول ضلع وقياسا الزاويتين المجاورتين له' },
      { id: 'opt-c', text: 'الحالة الثالثة: أطوال الأضلاع الثلاثة' },
      { id: 'opt-d', text: 'حالة الوتر وضلع القائمة في المثلثين القائمين' },
    ],
    answer: 'opt-b',
    sourceRefs: [P17_ACT, P18_CASE2],
  }),

  /* ------------------------------------------------------------------ 07 */
  trueFalseJustify({
    id: 'geo-l04-t01-q07',
    lessonId: LESSON_ID,
    concept: 'right-triangle-cases',
    difficulty: 'medium',
    prompt: [
      'يتطابق مثلثان قائمان إذا تساوى وتر أحدهما مع وتر الآخر، وتساوت زاوية حادة في الأول مع زاوية حادة مقابلة لها في الثاني.',
    ],
    answer: true,
    justification: choicePart({
      id: 'reason',
      prompt: ['اختر التعليل الهندسي الصحيح للحكم:'],
      choices: [
        {
          id: 'all-right-equal',
          text: 'لأن كل مثلثين قائمين متساويي الوتر تتساوى أضلاعهما القائمة تلقائياً من دون حاجة إلى الزاوية الحادة.',
        },
        {
          id: 'acute-asa',
          text: 'لأن تساوي الزاويتين القائمتين مع زاوية حادة يوجب تساوي الزاوية الحادة الثانية من مجموع زوايا المثلث $180^\\circ$، فيتساوى الوتر والزاويتان المجاورتان له.',
        },
        {
          id: 'hyp-equals-leg',
          text: 'لأن الوتر في أي مثلث قائم يساوي مجموع ضلعي القائمة فتتحدد الأضلاع الثلاثة.',
        },
      ],
      answer: 'acute-asa',
    }),
    sourceRefs: [P18_CASE2, P19_RIGHT],
  }),

  /* ------------------------------------------------------------------ 08 */
  multiSelect({
    id: 'geo-l04-t01-q08',
    lessonId: LESSON_ID,
    concept: 'proofs-reasoning',
    difficulty: 'medium',
    prompt: [
      'في متوازي الأضلاع $ABCD$، يقسم القطر $[AC]$ الشكل إلى المثلثين $ABC$ و$CDA$. أيُّ المعطيات الآتية تُكوّن معاً برهان تطابقهما بحسب الحالة الثالثة؟ (اختر كل الإجابات الصحيحة)',
      figureBlock(
        testFigure({
          id: 'test-l04-q08-parallelogram-diagonal',
          alt: 'متوازي الأضلاع $ABCD$ مع القطر $[AC]$ فقط كما يذكر السؤال، من دون علامات على الأضلاع أو الزوايا.',
          caption:
            'رسم تخطيطي غير مقيّس يوضح تقسيم $ABCD$ بالقطر $[AC]$ من دون علامات قياس إضافية.',
          sourceRefs: [P18_EX3],
          spec: {
            points: [
              { id: 'A', x: 0, y: 0, labelSide: 'sw' },
              { id: 'B', x: 5, y: 0, labelSide: 'se' },
              { id: 'C', x: 7, y: 3, labelSide: 'ne' },
              { id: 'D', x: 2, y: 3, labelSide: 'nw' },
            ],
            polygons: [{ points: ['A', 'B', 'C', 'D'] }],
            segments: [{ from: 'A', to: 'C' }],
            questionLabels: ['A', 'B', 'C', 'D'],
          },
        }),
      ),
    ],
    choices: [
      { id: 'c1', text: '$[AC]$ ضلع مشتركة بين المثلثين' },
      { id: 'c4', text: 'قطرا متوازي الأضلاع متعامدان دائماً' },
      { id: 'c2', text: '$AB = CD$ لتساوي كل ضلعين متقابلين في متوازي الأضلاع' },
      { id: 'c3', text: '$BC = DA$ لتساوي كل ضلعين متقابلين في متوازي الأضلاع' },
    ],
    answers: ['c1', 'c2', 'c3'],
    sourceRefs: [P18_CASE3, P18_EX3],
  }),

  /* ------------------------------------------------------------------ 09 */
  numeric({
    id: 'geo-l04-t01-q09',
    lessonId: LESSON_ID,
    concept: 'kite-isosceles',
    difficulty: 'medium',
    prompt: [
      'في مثلث متساوي الساقين $ABC$ رأسه $A$ ($AB = AC$)، قياس زاوية الرأس $\\widehat{A} = 40^\\circ$. ما قياس زاوية القاعدة $\\widehat{B}$ بالدرجات؟',
    ],
    answer: 70,
    tolerance: 0,
    unit: '°',
    sourceRefs: [P18_CASE3, P19_ISOSCELES],
  }),

  /* ------------------------------------------------------------------ 10 */
  matching({
    id: 'geo-l04-t01-q10',
    lessonId: LESSON_ID,
    concept: 'congruence-cases',
    difficulty: 'medium',
    prompt: ['طابق كل حالة من حالات تطابق مثلثين مع شرطها المقرر في الكتاب المدرسي:'],
    left: [
      { id: 'c-case1', text: 'الحالة الأولى' },
      { id: 'c-case2', text: 'الحالة الثانية' },
      { id: 'c-case3', text: 'الحالة الثالثة' },
    ],
    right: [
      { id: 'r-case3', text: 'تساوي أطوال الأضلاع الثلاثة مع مقابلاتها' },
      { id: 'r-case1', text: 'تساوي طولي ضلعين وقياس الزاوية المحصورة بينهما مع مقابلاتها' },
      { id: 'r-case2', text: 'تساوي طول ضلع وقياسي الزاويتين المجاورتين له مع مقابلاتها' },
    ],
    pairs: { 'c-case1': 'r-case1', 'c-case2': 'r-case2', 'c-case3': 'r-case3' },
    sourceRefs: [P17_CASE1, P18_CASES_2_3],
  }),

  /* ------------------------------------------------------------------ 11 */
  classification({
    id: 'geo-l04-t01-q11',
    lessonId: LESSON_ID,
    concept: 'proofs-reasoning',
    difficulty: 'medium',
    prompt: [
      'صنّف مجموعات المعطيات الآتية إلى معطيات كافية لإثبات تطابق مثلثين، أو معطيات غير كافية:',
    ],
    categories: [
      { id: 'cat-suff', text: 'كافية لإثبات التطابق' },
      { id: 'cat-insuff', text: 'غير كافية لإثبات التطابق' },
    ],
    items: [
      { id: 'i1', text: 'ثلاثة أضلاع متقابلة متساوية في الطول' },
      { id: 'i2', text: 'ثلاث زوايا متقابلة متساوية في القياس فقط' },
      { id: 'i3', text: 'ضلعان والزاوية المحصورة بينهما مع مقابلاتها' },
      { id: 'i4', text: 'وتر وضلع قائمة في مثلثين قائمين' },
    ],
    assignment: {
      i1: 'cat-suff',
      i2: 'cat-insuff',
      i3: 'cat-suff',
      i4: 'cat-suff',
    },
    sourceRefs: [P17_CASE1, P18_CASE3, P19_RIGHT],
  }),

  /* ------------------------------------------------------------------ 12 */
  ordering({
    id: 'geo-l04-t01-q12',
    lessonId: LESSON_ID,
    concept: 'proofs-reasoning',
    difficulty: 'medium',
    prompt: ['رتّب خطوات كتابة برهان هندسي كامل لتطابق مثلثين واستثمار نتيجته:'],
    items: [
      {
        id: 's2',
        text: 'تسمية حالة التطابق المتحققة وإعلان تطابق المثلثين بترتيب الرؤوس المتقابلة',
      },
      {
        id: 's3',
        text: 'استنتاج تساوي بقية العناصر المتقابلة (الأضلاع أو الزوايا المطلوبة) كنتيجة للتطابق',
      },
      {
        id: 's1',
        text: 'تحديد المثلثين وإثبات تساوي ثلاثة عناصر متقابلة مناسبة من المعطيات أو الخواص الهندسية',
      },
    ],
    answerOrder: ['s1', 's2', 's3'],
    sourceRefs: [P18_PROOFS, P19_ISOSCELES],
  }),

  /* ------------------------------------------------------------------ 13 */
  singleChoice({
    id: 'geo-l04-t01-q13',
    lessonId: LESSON_ID,
    concept: 'kite-isosceles',
    difficulty: 'medium',
    prompt: [
      'في شكل الطائرة الورقية $ABCD$ حيث $AB = AD$ و$CB = CD$، ما هما المثلثان الطبوقان اللذان يشتركان في القطر $[AC]$؟',
      figureBlock(
        testFigure({
          id: 'test-l04-q13-kite-diagonal',
          alt: 'شكل طائرة ورقية $ABCD$ مقسوم بالقطر $[AC]$؛ العلامات على $[AB]$ و$[AD]$ ثم $[CB]$ و$[CD]$ تمثل المساواتين الواردتين في السؤال.',
          caption:
            'رسم تخطيطي غير مقيّس لا تظهر فيه إلا المساواتان المصرّح بهما والقطر المشترك $[AC]$.',
          sourceRefs: [P19_KITE],
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
      { id: 'opt-a', text: 'المثلثان $ABD$ و$CBD$' },
      { id: 'opt-b', text: 'لا يوجد مثلثان طبوقان يشتركان في $[AC]$' },
      { id: 'opt-c', text: 'المثلثان $ABC$ و$ADC$' },
      { id: 'opt-d', text: 'لا يتطابق المثلثان إلا إذا كان $AB = CB$' },
    ],
    answer: 'opt-c',
    sourceRefs: [P18_CASE3, P19_KITE],
  }),

  /* ------------------------------------------------------------------ 14 */
  exact({
    id: 'geo-l04-t01-q14',
    lessonId: LESSON_ID,
    concept: 'right-triangle-cases',
    difficulty: 'advanced',
    prompt: [
      'المثلثان $ABC$ (قائم في $A$) و$DEF$ (قائم في $D$) فيهما الوتران متساويان $BC = EF$، والضلعان القائمان المتقابلان متساويان $AB = DE = 4\\ \\mathrm{cm}$. إذا كانت مساحة المثلث $ABC$ تساوي $15\\ \\mathrm{cm}^2$، فما طول الضلع القائم $[DF]$ في المثلث $DEF$ بالسنتيمتر؟ (اكتب الإجابة ككسر أو عدد عشري)',
    ],
    numerator: 15,
    denominator: 2,
    acceptEquivalentForms: true,
    unit: 'cm',
    sourceRefs: [P17_DEF, P19_RIGHT],
  }),

  /* ------------------------------------------------------------------ 15 */
  singleChoice({
    id: 'geo-l04-t01-q15',
    lessonId: LESSON_ID,
    concept: 'right-triangle-cases',
    difficulty: 'advanced',
    prompt: [
      'في المثلثين القائمين $ABC$ في $A$ و$DEF$ في $D$، لدينا الوتران متساويان $BC = EF$ وضلعان قائمان $AB = DE$. ماذا نستنتج حتماً عن الضلعين القائمين الآخرين $[AC]$ و$[DF]$؟',
      figureBlock(
        testFigure({
          id: 'test-l04-q15-right-triangle-correspondence',
          alt: 'مثلثان قائمان $ABC$ و$DEF$؛ علامة القائمة عند $A$ و$D$، وعلامات التساوي على $[BC]$ مع $[EF]$ وعلى $[AB]$ مع $[DE]$ كما في السؤال.',
          caption:
            'رسم تخطيطي غير مقيّس يكرر معطيات الوتر وضلع القائمة فقط من دون وضع علامة على الضلعين المطلوبين.',
          sourceRefs: [P19_RIGHT],
          spec: {
            points: [
              { id: 'A', x: 0, y: 0, labelSide: 'sw' },
              { id: 'B', x: 4, y: 0, labelSide: 'se' },
              { id: 'C', x: 0, y: 3, labelSide: 'nw' },
              { id: 'D', x: 8, y: 0, labelSide: 'sw' },
              { id: 'E', x: 12, y: 0, labelSide: 'se' },
              { id: 'F', x: 8, y: 3, labelSide: 'nw' },
            ],
            segments: [
              { from: 'A', to: 'B', ticks: 1 },
              { from: 'A', to: 'C' },
              { from: 'B', to: 'C', ticks: 2 },
              { from: 'D', to: 'E', ticks: 1 },
              { from: 'D', to: 'F' },
              { from: 'E', to: 'F', ticks: 2 },
            ],
            rightAngles: [
              { at: 'A', from: 'B', to: 'C' },
              { at: 'D', from: 'E', to: 'F' },
            ],
            questionLabels: ['A', 'B', 'C', 'D', 'E', 'F'],
          },
        }),
      ),
    ],
    choices: [
      { id: 'opt-a', text: '$AC > DF$ دائماً' },
      { id: 'opt-b', text: '$AC = DF$ بحكم تطابق المثلثين القائمين وتساوي العناصر المتقابلة' },
      { id: 'opt-c', text: 'لا يمكن معرفة العلاقة بينهما من دون قياس الزوايا الحادة' },
      { id: 'opt-d', text: '$AC + DF = BC$' },
    ],
    answer: 'opt-b',
    sourceRefs: [P17_DEF, P19_RIGHT],
  }),

  /* ------------------------------------------------------------------ 16 */
  errorAnalysis({
    id: 'geo-l04-t01-q16',
    lessonId: LESSON_ID,
    concept: 'congruence-cases',
    difficulty: 'advanced',
    prompt: [
      'أراد تلميذ إثبات تطابق المثلثين $ABC$ و$DEF$ انطلاقاً من المعطيات $AB = DE$ و$BC = EF$ و$\\widehat{A} = \\widehat{D}$، فكتب الخطوات الآتية. حلّل الحل وحدّد موضع الخطأ وتصويبه وتعليله.',
    ],
    steps: [
      {
        id: 's1',
        text: 'في المثلثين $ABC$ و$DEF$ لدينا الضلعان المتقابلان $AB = DE$ و$BC = EF$.',
      },
      {
        id: 's2',
        text: 'ولدينا تساوي الزاويتين $\\widehat{A} = \\widehat{D}$.',
      },
      {
        id: 's3',
        text: 'إذن المثلثان $ABC$ و$DEF$ طبوقان بحسب الحالة الأولى (ضلعان والزاوية المحصورة).',
      },
    ],
    choices: [
      {
        id: 'c-s1',
        text: 'الخطوة 1: الحالة الأولى تشترط تساوي الأضلاع الثلاثة لا ضلعين فقط.',
      },
      {
        id: 'c-err',
        text: 'الخطوة 3: طُبِّقت الحالة الأولى مع أن الزاوية $\\widehat{A}$ ليست محصورة بين الضلعين $[AB]$ و$[BC]$.',
      },
      {
        id: 'c-ok',
        text: 'لا يوجد خطأ؛ تساوي ضلعين وأي زاوية يكفي دائماً لإثبات التطابق.',
      },
    ],
    answer: 'c-err',
    correction: choicePart({
      id: 'correction',
      prompt: ['اختر التصحيح الصحيح للاستدلال:'],
      choices: [
        {
          id: 'fix-included',
          text: 'يلزم لتطبيق الحالة الأولى على الضلعين $[AB]$ و$[BC]$ إثبات تساوي الزاويتين المحصورتين $\\widehat{B} = \\widehat{E}$ بدل الاكتفاء بـ$\\widehat{A} = \\widehat{D}$.',
        },
        {
          id: 'fix-two-angles-only',
          text: 'نحذف معطى الضلع $BC = EF$ ونكتفي بـ$AB = DE$ و$\\widehat{A} = \\widehat{D}$ لإثبات التطابق.',
        },
        {
          id: 'fix-keep',
          text: 'نبقي الخطوات كما هي ونبدّل اسم الحالة فقط من «الحالة الأولى» إلى «الحالة الثالثة».',
        },
      ],
      answer: 'fix-included',
    }),
    justification: choicePart({
      id: 'reason',
      prompt: ['اختر التعليل الهندسي الصحيح:'],
      choices: [
        {
          id: 'why-perimeter',
          text: 'لأن تساوي ضلعين وزاوية غير محصورة يجعل محيطي المثلثين مختلفين دائماً.',
        },
        {
          id: 'why-right-only',
          text: 'لأن الحالة الأولى لا تصح إلا في المثلثات القائمة الزاوية.',
        },
        {
          id: 'why-included',
          text: 'لأن الزاوية المحصورة بين $[AB]$ و$[BC]$ هي $\\widehat{B}$ (ورأسها المشترك $B$)، ومعطيات ضلعين وزاوية غير محصورة لا تحدد مثلثاً وحيداً في العموم.',
        },
      ],
      answer: 'why-included',
    }),
    sourceRefs: [P17_CASE1, P18_EX1],
  }),

  /* ------------------------------------------------------------------ 17 */
  singleChoice({
    id: 'geo-l04-t01-q17',
    lessonId: LESSON_ID,
    concept: 'proofs-reasoning',
    difficulty: 'advanced',
    prompt: [
      'في الشكل الذي فيه مستقيمان متقاطعان في $M$ بحيث $AM = ME$ و$BM = MF$، ما سبب تطابق المثلثين $AMB$ و$EMF$؟',
      figureBlock(
        testFigure({
          id: 'test-l04-q17-vertical-angle-triangles',
          alt: 'مستقيمان يتقاطعان في $M$؛ النقاط $A$ و$M$ و$E$ على استقامة واحدة، وكذلك $B$ و$M$ و$F$، والعلامات تكرر $AM = ME$ و$BM = MF$ فقط.',
          caption:
            'رسم تخطيطي غير مقيّس يوضح موضع المثلثين $AMB$ و$EMF$ وعلامتي تساوي الضلعين المعطاتين من دون علامة على الزوايا.',
          sourceRefs: [P18_EX1],
          spec: {
            points: [
              { id: 'A', x: -3, y: 1, labelSide: 'nw' },
              { id: 'M', x: 0, y: 0, labelSide: 's' },
              { id: 'E', x: 3, y: -1, labelSide: 'se' },
              { id: 'B', x: -1, y: -2, labelSide: 'sw' },
              { id: 'F', x: 1, y: 2, labelSide: 'ne' },
            ],
            segments: [
              { from: 'A', to: 'M', ticks: 1 },
              { from: 'M', to: 'E', ticks: 1 },
              { from: 'B', to: 'M', ticks: 2 },
              { from: 'M', to: 'F', ticks: 2 },
              { from: 'A', to: 'B' },
              { from: 'E', to: 'F' },
            ],
            questionLabels: ['A', 'M', 'E', 'B', 'F'],
          },
        }),
      ),
    ],
    choices: [
      { id: 'opt-a', text: 'تساوي الأضلاع الثلاثة مباشرةً من المعطيات من دون استعمال أي زاوية' },
      { id: 'opt-b', text: 'تطابق مثلثين قائمين لتساوي الوترين في $M$' },
      { id: 'opt-c', text: 'تساوي الزوايا الثلاث فقط لأن المستقيمين متقاطعان' },
      {
        id: 'opt-d',
        text: 'تساوي ضلعي كل منهما وتساوي الزاويتين المحصورتين $\\widehat{AMB} = \\widehat{EMF}$ للتقابل بالرأس (الحالة الأولى)',
      },
    ],
    answer: 'opt-d',
    sourceRefs: [P17_CASE1, P18_EX1],
  }),

  /* ------------------------------------------------------------------ 18 */
  multiSelect({
    id: 'geo-l04-t01-q18',
    lessonId: LESSON_ID,
    concept: 'right-triangle-cases',
    difficulty: 'advanced',
    prompt: [
      'في مثلث متساوي الساقين $ABC$ ($AB = AC$)، رُسم الارتفاع $[AH]$ المتعلق بالقاعدة $[BC]$ حيث $H$ مسقط $A$ على $(BC)$. أيُّ العبارات الآتية صحيحة بناءً على تطابق المثلثين القائمين $ABH$ و$ACH$؟ (اختر كل الإجابات الصحيحة)',
    ],
    choices: [
      { id: 'c4', text: '$AH = BC$ دائماً في كل مثلث متساوي الساقين' },
      { id: 'c1', text: '$BH = HC$ أي إن $H$ منتصف القاعدة $[BC]$' },
      { id: 'c2', text: '$\\widehat{BAH} = \\widehat{CAH}$ أي إن $[AH)$ ينصّف زاوية الرأس' },
      {
        id: 'c3',
        text: 'المثلثان $ABH$ و$ACH$ طبوقان لتساوي الوترين $AB = AC$ وضلع القائمة المشترك $[AH]$',
      },
    ],
    answers: ['c1', 'c2', 'c3'],
    sourceRefs: [P17_DEF, P19_ISOSCELES, P19_RIGHT],
  }),

  /* ------------------------------------------------------------------ 19 */
  errorAnalysis({
    id: 'geo-l04-t01-q19',
    lessonId: LESSON_ID,
    concept: 'congruence-cases',
    difficulty: 'thinking',
    prompt: [
      'ادّعى طالب أن تساوي محيطي مثلثين وتساوي مساحتيهما يكفيان لإثبات تطابقهما، وكتب الحجة الآتية. حلّل الحجة وحدّد موضع الخطأ وتصويبه وتعليله.',
    ],
    steps: [
      {
        id: 's1',
        text: 'كل مثلثين طبوقين تتساوى أطوال أضلاعهما المتقابلة، فيكون لهما المحيط نفسه والمساحة نفسها.',
      },
      {
        id: 's2',
        text: 'في المثلثين المفروضين وجدنا المحيطين متساويين والمساحتين متساويتين.',
      },
      {
        id: 's3',
        text: 'إذن تتساوى أطوال أضلاعهما المتقابلة حتماً، ويكون المثلثان طبوقين.',
      },
    ],
    choices: [
      {
        id: 'ch-s1',
        text: 'الخطوة 1: المثلثان الطبوقان لا يشترط أن يتساوى محيطاهما أو مساحتاهما.',
      },
      {
        id: 'ch-err',
        text: 'الخطوة 3: عُكس الاستلزام خطأً؛ فتساوي المحيطين والمساحتين لا يستلزم تساوي الأضلاع المتقابلة ولا يثبت التطابق.',
      },
      {
        id: 'ch-ok',
        text: 'لا يوجد خطأ؛ تساوي المحيط والمساحة معاً يحدد أطوال الأضلاع الثلاثة تحديداً وحيداً.',
      },
    ],
    answer: 'ch-err',
    correction: choicePart({
      id: 'correction',
      prompt: ['اختر التصحيح الصحيح للادعاء:'],
      choices: [
        {
          id: 'fix-perim-only',
          text: 'يكفي تساوي المحيطين وحده من دون المساحتين لإثبات تطابق المثلثين.',
        },
        {
          id: 'fix-cases',
          text: 'لا يثبت تطابق المثلثين بتساوي المحيطين والمساحتين، بل يجب إثبات تساوي عناصر متقابلة تحقق إحدى حالات التطابق المقررة.',
        },
        {
          id: 'fix-area-only',
          text: 'يكفي تساوي المساحتين مع تساوي زاوية واحدة لإثبات التطابق دائماً.',
        },
      ],
      answer: 'fix-cases',
    }),
    justification: choicePart({
      id: 'reason',
      prompt: ['اختر التعليل الهندسي الصحيح:'],
      choices: [
        {
          id: 'why-converse',
          text: 'لأنه قد يشترك مثلثان غير طبوقين ومختلفا الأضلاع في المحيط نفسه والمساحة نفسها، فالمجموع والمساحة لا يفرضان تساوي كل ضلع مع مقابله.',
        },
        {
          id: 'why-sum-fixes',
          text: 'لأن المحيط يساوي جداء الأضلاع الثلاثة لا مجموعها.',
        },
        {
          id: 'why-angles-equal',
          text: 'لأن تساوي المحيط والمساحة يفرض تساوي الزوايا الثلاث فقط من دون الأضلاع.',
        },
      ],
      answer: 'why-converse',
    }),
    sourceRefs: [P17_DEF, P17_CASE1, P18_CASES_2_3],
  }),

  /* ------------------------------------------------------------------ 20 */
  trueFalseJustify({
    id: 'geo-l04-t01-q20',
    lessonId: LESSON_ID,
    concept: 'kite-isosceles',
    difficulty: 'thinking',
    prompt: [
      'في مثلث $ABC$ فيه $\\widehat{B} = \\widehat{C}$ و$M$ منتصف $[BC]$، إذا رُسم العمودان $ME \\perp (AB)$ و$MF \\perp (AC)$ بحيث تقع $E$ على $[AB]$ و$F$ على $[AC]$، أمكن إثبات أن المثلث $ABC$ متساوي الساقين ($AB = AC$) عبر تطابق المثلثين $MEB$ و$MFC$ ثم تطابق المثلثين القائمين $MEA$ و$MFA$.',
    ],
    answer: true,
    justification: choicePart({
      id: 'reason',
      prompt: ['اختر التعليل البرهاني الصحيح للحكم:'],
      choices: [
        {
          id: 'circular-hyp',
          text: 'لأننا نفرض منذ البداية أن الوترين $AB$ و$AC$ متساويان ثم نطبق حالة الوتر وضلع القائمة مباشرةً على المثلثين.',
        },
        {
          id: 'equal-areas',
          text: 'لأن العمودين $ME$ و$MF$ يقسمان المثلث $ABC$ إلى أربعة مثلثات متساوية المساحة دائماً.',
        },
        {
          id: 'two-step-proof',
          text: 'لأن تطابق $MEB$ و$MFC$ يعطي $EB = FC$ و$ME = MF$، ثم تطابق القائمين $MEA$ و$MFA$ بالوتر المشترك $[MA]$ وضلع القائمة $ME = MF$ يعطي $AE = AF$، فينتج $AB = AE + EB = AF + FC = AC$.',
        },
      ],
      answer: 'two-step-proof',
    }),
    sourceRefs: [P17_DEF, P18_CASE2, P19_ISOSCELES, P19_RIGHT],
  }),
];
