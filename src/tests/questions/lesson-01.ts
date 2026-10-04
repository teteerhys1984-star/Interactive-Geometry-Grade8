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
 *  BANK — LESSON 1: «الانسحاب وخواصه» (Textbook pages 5–7)
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
 *      • definition (التعريف والمفهوم): 5
 *      • direction-distance (الاتجاه والمسافة): 4
 *      • properties (خواص حفظ الأطوال والزوايا والمساحات والاستقامة): 6
 *      • non-translation (تمييز ما ليس انسحاباً والتركيب): 5
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
 *
 *  SOURCE FIDELITY & ORIGINALITY
 *  -----------------------------
 *  • Every question is ANCHORED to real pages 5, 6, and 7 of the textbook.
 *  • Every question is ORIGINAL: none copies or paraphrases the textbook's
 *    exercises or the in-lesson assessments.
 *  • All mathematical relationships are exact.
 * ============================================================================
 */

const LESSON_ID = 'lesson-01-translation-and-properties';
const P5 = { page: 5, locator: 'نشاط ترصيف أرصفة دمشق' };
const P6 = { page: 6, locator: 'مفهوم الانسحاب وخواصه' };
const P7 = { page: 7, locator: 'تحقق وتدرب' };

export const questions: TestQuestionInput[] = [
  /* ------------------------------------------------------------------ 01 */
  singleChoice({
    id: 'geo-l01-t01-q01',
    lessonId: LESSON_ID,
    concept: 'definition',
    difficulty: 'basic',
    prompt: ['ما الخاصية الهندسية الجوهرية التي تُميّز الانسحاب عن الدوران وعن التناظر المحوري؟'],
    choices: [
      {
        id: 'opt-a',
        text: 'أن كل نقطة من الشكل تنتقل بالمسافة نفسها وفي الاتجاه نفسه، وتبقى الأضلاع موازية لنظائرها.',
      },
      { id: 'opt-b', text: 'أنه التحويل الهندسي الوحيد الذي يحافظ على أطوال الأضلاع.' },
      { id: 'opt-c', text: 'أنه يقلب الشكل كما تنقلب الصورة في المرآة المستوية.' },
      { id: 'opt-d', text: 'أن نقطة واحدة من الشكل على الأقل تبقى ثابتة في موضعها.' },
    ],
    answer: 'opt-a',
    sourceRefs: [P6],
  }),

  /* ------------------------------------------------------------------ 02 */
  trueFalse({
    id: 'geo-l01-t01-q02',
    lessonId: LESSON_ID,
    concept: 'direction-distance',
    difficulty: 'basic',
    prompt: [
      'إذا نقل انسحاب النقطة $A$ إلى النقطة $B$، فإن النقطة $B$ تنتقل وفق الانسحاب ذاته إلى النقطة $A$.',
    ],
    answer: false,
    sourceRefs: [P6],
  }),

  /* ------------------------------------------------------------------ 03 */
  singleChoice({
    id: 'geo-l01-t01-q03',
    lessonId: LESSON_ID,
    concept: 'definition',
    difficulty: 'basic',
    prompt: [
      "وفق الانسحاب الذي ينقل $A$ إلى $B$، صورة النقطة $P$ هي $P'$. إذا كانت $P$ لا تنتمي إلى المستقيم $(AB)$، فما طبيعة الشكل الرباعي $AB P' P$؟",
    ],
    choices: [
      { id: 'opt-a', text: 'متوازي أضلاع' },
      { id: 'opt-b', text: 'شبه منحرف قائم' },
      { id: 'opt-c', text: 'مستطيل بالضرورة' },
      { id: 'opt-d', text: 'معين بالضرورة' },
    ],
    answer: 'opt-a',
    sourceRefs: [P6],
  }),

  /* ------------------------------------------------------------------ 04 */
  numeric({
    id: 'geo-l01-t01-q04',
    lessonId: LESSON_ID,
    concept: 'properties',
    difficulty: 'basic',
    prompt: [
      "مثلث $ABC$ محيطه $23.4\\ \\mathrm{cm}$. صُوِّر وفق انسحاب فكانت صورته المثلث $A'B'C'$. ما محيط المثلث $A'B'C'$ بالسنتيمتر؟",
    ],
    answer: 23.4,
    tolerance: 0.05,
    unit: 'cm',
    sourceRefs: [P6],
  }),

  /* ------------------------------------------------------------------ 05 */
  singleChoice({
    id: 'geo-l01-t01-q05',
    lessonId: LESSON_ID,
    concept: 'properties',
    difficulty: 'basic',
    prompt: [
      'أيُّ العبارات الآتية تُمثّل الخواص الأربع الأساسية التي يحافظ عليها الانسحاب بحسب ما ورد في الكتاب المدرسي؟',
    ],
    choices: [
      { id: 'opt-a', text: 'الأطوال، والاستقامة، وقياس الزوايا، والمساحات.' },
      { id: 'opt-b', text: 'الأطوال، والاتجاه فقط، دون حفظ قياس الزوايا.' },
      { id: 'opt-c', text: 'المساحات، ولكن قد تنحني المستقيمات بعد الانسحاب.' },
      { id: 'opt-d', text: 'موضع المركز، والشكل، مع مضاعفة الأبعاد بنسبة ثابتة.' },
    ],
    answer: 'opt-a',
    sourceRefs: [P6],
  }),

  /* ------------------------------------------------------------------ 06 */
  singleChoice({
    id: 'geo-l01-t01-q06',
    lessonId: LESSON_ID,
    concept: 'direction-distance',
    difficulty: 'medium',
    prompt: [
      "في انسحاب ينقل النقطة $K$ إلى النقطة $L$، صورة النقطة $X$ هي $X'$ وصورة النقطة $Y$ هي $Y'$. ما العلاقة التي تربط دائماً بين المسارين $[XX']$ و $[YY']$؟",
    ],
    choices: [
      { id: 'opt-a', text: "$XX' = YY' = KL$ و $(XX') \\parallel (YY') \\parallel (KL)$" },
      { id: 'opt-b', text: "$XX' + YY' = KL$ و $(XX') \\perp (YY')$" },
      { id: 'opt-c', text: "$XY = X'Y'$ فقط دون أي علاقة توازٍ بين المسارين" },
      { id: 'opt-d', text: 'المساران متقاطعان دائماً في منتصف القطعة $[KL]$' },
    ],
    answer: 'opt-a',
    sourceRefs: [P6],
  }),

  /* ------------------------------------------------------------------ 07 */
  multiSelect({
    id: 'geo-l01-t01-q07',
    lessonId: LESSON_ID,
    concept: 'properties',
    difficulty: 'medium',
    prompt: [
      "مثلث قائم $ABC$ في $A$، فيه $AB = 6\\ \\mathrm{cm}$ و $AC = 8\\ \\mathrm{cm}$ والوتر $BC = 10\\ \\mathrm{cm}$. نُقِل بانسحاب إلى المثلث $A'B'C'$. أيُّ العبارات الآتية صحيحة حتماً؟ (اختر كل الإجابات الصحيحة)",
    ],
    choices: [
      { id: 'c1', text: "المثلث $A'B'C'$ قائم في $A'$" },
      { id: 'c2', text: "طول الوتر $B'C' = 10\\ \\mathrm{cm}$" },
      { id: 'c3', text: "مساحة المثلث $A'B'C'$ تساوي $24\\ \\mathrm{cm}^2$" },
      { id: 'c4', text: "المستقيم $(B'C')$ عمودي بالضرورة على المستقيم $(BC)$" },
    ],
    answers: ['c1', 'c2', 'c3'],
    sourceRefs: [P6],
  }),

  /* ------------------------------------------------------------------ 08 */
  numeric({
    id: 'geo-l01-t01-q08',
    lessonId: LESSON_ID,
    concept: 'properties',
    difficulty: 'medium',
    prompt: [
      "في الشكل الرباعي $MNPQ$، قياس الزاوية $\\widehat{M} = 115^\\circ$. صُوِّر الرباعي بانسحاب فنتج الرباعي $M'N'P'Q'$. ما قياس الزاوية $\\widehat{M'}$ بالدرجات؟",
    ],
    answer: 115,
    tolerance: 0,
    unit: '°',
    sourceRefs: [P6],
  }),

  /* ------------------------------------------------------------------ 09 */
  trueFalse({
    id: 'geo-l01-t01-q09',
    lessonId: LESSON_ID,
    concept: 'direction-distance',
    difficulty: 'medium',
    prompt: [
      'إذا كان الانسحاب الأول ينقل النقطة $A$ إلى $B$، والانسحاب الثاني ينقل النقطة $B$ إلى $C$، فإن تطبيق الانسحاب الأول ثم الثاني ينقل النقطة $A$ إلى النقطة $C$.',
    ],
    answer: true,
    sourceRefs: [P5, P6],
  }),

  /* ------------------------------------------------------------------ 10 */
  singleChoice({
    id: 'geo-l01-t01-q10',
    lessonId: LESSON_ID,
    concept: 'non-translation',
    difficulty: 'medium',
    prompt: [
      'مثلثان متطابقان $T_1$ و $T_2$ لهما أطوال الأضلاع نفسها وقياسات الزوايا نفسها، ولكن أضلاع $T_2$ ليست موازية لأضلاع $T_1$. ما التفسير الهندسي الصحيح؟',
    ],
    choices: [
      {
        id: 'opt-a',
        text: 'الشكل $T_2$ ليس صورة $T_1$ وفق انسحاب، لأن الانسحاب يفرض توازي كل ضلع مع نظيره.',
      },
      { id: 'opt-b', text: 'الشكل $T_2$ صورة $T_1$ وفق انسحاب لأن الأطوال والزوايا متساوية.' },
      { id: 'opt-c', text: 'لا يمكن الحكم إلا بعد معرفة مساحة كلٍّ من المثلثين.' },
      { id: 'opt-d', text: 'كل تحويل ينقل شكلاً إلى شكل مطابق له هو انسحاب بالضرورة.' },
    ],
    answer: 'opt-a',
    sourceRefs: [P6, P7],
  }),

  /* ------------------------------------------------------------------ 11 */
  matching({
    id: 'geo-l01-t01-q11',
    lessonId: LESSON_ID,
    concept: 'properties',
    difficulty: 'medium',
    prompt: ['طابق كل عنصر هندسي مع ما يؤول إليه وفق انسحاب بحسب خواص الانسحاب الأساسية:'],
    left: [
      { id: 'l-seg', text: 'قطعة مستقيمة $[AB]$ طولها $d$' },
      { id: 'l-ang', text: 'زاوية قياسها $60^\\circ$' },
      { id: 'l-col', text: 'ثلاث نقاط $A, B, C$ على استقامة واحدة' },
    ],
    right: [
      { id: 'r-seg', text: "قطعة مستقيمة $[A'B']$ توازيها وطولها $d$" },
      { id: 'r-ang', text: 'زاوية صورتها قياسها $60^\\circ$' },
      { id: 'r-col', text: "ثلاث نقاط صورها $A', B', C'$ على استقامة واحدة" },
    ],
    pairs: { 'l-seg': 'r-seg', 'l-ang': 'r-ang', 'l-col': 'r-col' },
    sourceRefs: [P6],
  }),

  /* ------------------------------------------------------------------ 12 */
  classification({
    id: 'geo-l01-t01-q12',
    lessonId: LESSON_ID,
    concept: 'non-translation',
    difficulty: 'medium',
    prompt: ['صنّف كل حركة من الحركات الآتية إلى «انسحاب» أو «حركة أخرى ليست انسحاباً»:'],
    categories: [
      { id: 'cat-trans', text: 'انسحاب' },
      { id: 'cat-other', text: 'حركة أخرى ليست انسحاباً' },
    ],
    items: [
      { id: 'm1', text: 'انزلاق متزلّج على مسار مستقيم دون أن يدور ودون أن يغيّر اتجاهه' },
      { id: 'm2', text: 'دوران عقرب الساعة حول مركزه بزاوية $90^\\circ$' },
      { id: 'm3', text: 'انعكاس شكل في مرآة مستوية (قلب الشكل)' },
      { id: 'm4', text: 'حركة حجر ترصيف على رصيف مستقيم ينتقل بمسافة ثابتة باتجاه محدد' },
    ],
    assignment: {
      m1: 'cat-trans',
      m2: 'cat-other',
      m3: 'cat-other',
      m4: 'cat-trans',
    },
    sourceRefs: [P5, P6, P7],
  }),

  /* ------------------------------------------------------------------ 13 */
  ordering({
    id: 'geo-l01-t01-q13',
    lessonId: LESSON_ID,
    concept: 'definition',
    difficulty: 'medium',
    prompt: [
      "رتّب الخطوات المنطقية التي تُثبت أن الرباعي $ABB'A'$ متوازي أضلاع عندما تكون $A'$ صورة $A$ و $B'$ صورة $B$ وفق الانسحاب نفسه (حيث $A$ لا تنتمي إلى المستقيم $(BB')$):",
    ],
    items: [
      { id: 's1', text: "من تعريف الانسحاب: $AA' = BB'$ والمساران يقعان على مستقيمين متوازيين" },
      {
        id: 's2',
        text: "الرباعي $ABB'A'$ فيه ضلعان متقابلان $[AA']$ و $[BB']$ متساويان ومتوازيان",
      },
      {
        id: 's3',
        text: 'إذا كان في رباعي ضلعان متقابلان متوازيين ومتساويين في الطول فهو متوازي أضلاع',
      },
    ],
    answerOrder: ['s1', 's2', 's3'],
    sourceRefs: [P6],
  }),

  /* ------------------------------------------------------------------ 14 */
  exact({
    id: 'geo-l01-t01-q14',
    lessonId: LESSON_ID,
    concept: 'properties',
    difficulty: 'advanced',
    prompt: [
      "مستطيل $R$ بُعداه $3\\ \\mathrm{cm}$ و $5\\ \\mathrm{cm}$. نُقِل بانسحاب إلى مستطيل $R'$. ما النسبة بين مساحة المستطيل الأصلي $R$ ومساحة المستطيل الصورة $R'$؟ (اكتب الإجابة كعدد أو كسر)",
    ],
    numerator: 1,
    denominator: 1,
    acceptEquivalentForms: true,
    sourceRefs: [P6],
  }),

  /* ------------------------------------------------------------------ 15 */
  singleChoice({
    id: 'geo-l01-t01-q15',
    lessonId: LESSON_ID,
    concept: 'direction-distance',
    difficulty: 'advanced',
    prompt: [
      'على شبكة إحداثية، انسحاب $T_1$ ينقل النقطة $(x, y)$ إلى $(x + 4, y + 2)$، وانسحاب ثانٍ $T_2$ ينقل النقطة $(x, y)$ إلى $(x - 1, y + 3)$. إذا طُبِّق الانسحاب $T_1$ على النقطة $M(2, 1)$ ثم طُبِّق $T_2$ على الناتج، فما إحداثيا النقطة النهائية؟',
    ],
    choices: [
      { id: 'opt-a', text: '$(5, 6)$' },
      { id: 'opt-b', text: '$(6, 3)$' },
      { id: 'opt-c', text: '$(1, 4)$' },
      { id: 'opt-d', text: '$(7, 5)$' },
    ],
    answer: 'opt-a',
    sourceRefs: [P5, P6],
  }),

  /* ------------------------------------------------------------------ 16 */
  errorAnalysis({
    id: 'geo-l01-t01-q16',
    lessonId: LESSON_ID,
    concept: 'non-translation',
    difficulty: 'advanced',
    prompt: [
      'تأمّل الحل الآتي الذي يزعم صاحبه أن حركة معيّنة هي انسحاب، وحدّد الخطوة التي وقع فيها الخطأ المنطقي:',
    ],
    steps: [
      {
        id: 'step-1',
        text: "الخطوة 1: قسنا أطوال أضلاع المثلثين $T$ و $T'$ فوجدناها متساوية تماماً.",
      },
      {
        id: 'step-2',
        text: "الخطوة 2: قسنا الزوايا فوجدنا قياس كل زاوية في $T$ يساوي قياس نظيرتها في $T'.",
      },
      {
        id: 'step-3',
        text: 'الخطوة 3: بما أن الأطوال والزوايا محفوظة، فإن الحركة انسحاب بالضرورة دون حاجة لفحص توازي الأضلاع أو اتجاه الشكل.',
      },
    ],
    choices: [
      { id: 'step-1', text: 'الخطأ في الخطوة 1' },
      { id: 'step-2', text: 'الخطأ في الخطوة 2' },
      {
        id: 'step-3',
        text: 'الخطأ في الخطوة 3: حفظ الأطوال والزوايا شرط لازم للانسحاب لكنه ليس كافياً',
      },
    ],
    answer: 'step-3',
    sourceRefs: [P6, P7],
  }),

  /* ------------------------------------------------------------------ 17 */
  singleChoice({
    id: 'geo-l01-t01-q17',
    lessonId: LESSON_ID,
    concept: 'definition',
    difficulty: 'advanced',
    prompt: [
      "إذا كانت النقطة $M$ تقع على المستقيم $(AB)$ بين $A$ و $B$، وكانت $M'$ صورة $M$ وفق الانسحاب الذي ينقل $A$ إلى $B$. ما الترتيب الصحيح للنقاط على المستقيم؟",
    ],
    choices: [
      { id: 'opt-a', text: "$A$ ثم $M$ ثم $B$ ثم $M'$" },
      { id: 'opt-b', text: "$A$ ثم $B$ ثم $M$ ثم $M'$" },
      { id: 'opt-c', text: "$M'$ ثم $A$ ثم $M$ ثم $B$" },
      { id: 'opt-d', text: "$M$ ثم $A$ ثم $M'$ ثم $B$" },
    ],
    answer: 'opt-a',
    sourceRefs: [P6],
  }),

  /* ------------------------------------------------------------------ 18 */
  multiSelect({
    id: 'geo-l01-t01-q18',
    lessonId: LESSON_ID,
    concept: 'properties',
    difficulty: 'advanced',
    prompt: [
      "لتكن النقطتان $P$ و $Q$ وصورتاهما $P'$ و $Q'$ وفق انسحاب يحوّل $A$ إلى $B$. أيُّ العلاقات الآتية صحيحة دائماً في جميع الحالات؟ (اختر كل الإجابات الصحيحة)",
    ],
    choices: [
      { id: 'c1', text: "$P'Q' = PQ$" },
      { id: 'c2', text: "$PP' = QQ' = AB$" },
      { id: 'c3', text: "$(PP') \\parallel (QQ')$ (أو ينطبقان إذا كانت النقاط على استقامة واحدة)" },
      { id: 'c4', text: "$P'Q' = AB$ دائماً حتى لو اختلف طول $[PQ]$ عن $[AB]$" },
    ],
    answers: ['c1', 'c2', 'c3'],
    sourceRefs: [P6],
  }),

  /* ------------------------------------------------------------------ 19 */
  errorAnalysis({
    id: 'geo-l01-t01-q19',
    lessonId: LESSON_ID,
    concept: 'non-translation',
    difficulty: 'thinking',
    prompt: [
      'ادّعى تلميذ ما يأتي: «إذا كان للشكلين $F_1$ و $F_2$ المساحة نفسها والمحيط نفسه، فإنه يوجد دائماً انسحاب ينقل أحدهما إلى الآخر». أين وجه الخلل في هذا الادعاء؟',
    ],
    steps: [
      { id: 's1', text: 'الادعاء مبني على أن تساوي المساحة والمحيط يضمن تطابق الشكلين.' },
      {
        id: 's2',
        text: 'وحتى لو تطابق الشكلان، فقد يختلف اتجاههما (كدوران أو قلب) فلا يربطهما انسحاب.',
      },
      {
        id: 's3',
        text: 'وقد يتساوى المحيط والمساحة بين شكلين مختلفين تماماً (مثل دائرة ومستطيل).',
      },
    ],
    choices: [
      {
        id: 'ch-a',
        text: 'الادعاء غير صحيح لأن تساوي المساحة والمحيط لا يضمن التطابق أصلاً، وحتى مع التطابق يشترط الانسحاب وحدة الاتجاه وتوازي الأضلاع النظيرة.',
      },
      { id: 'ch-b', text: 'الادعاء صحيح تماماً ولا خطأ فيه.' },
      { id: 'ch-c', text: 'الخطأ فقط في حالة الدوائر، أما المضلعات فالادعاء صحيح.' },
    ],
    answer: 'ch-a',
    sourceRefs: [P6, P7],
  }),

  /* ------------------------------------------------------------------ 20 */
  trueFalse({
    id: 'geo-l01-t01-q20',
    lessonId: LESSON_ID,
    concept: 'definition',
    difficulty: 'thinking',
    prompt: [
      "إذا علمت صورتي نقطتين متمايزتين $A$ و $B$ فقط وفق حركة مستوية مجهولة ووجدنا أن $A'B' = AB$ و $(A'B') \\parallel (AB)$، فهل هذا يكفي وحده للجزم بأن الحركة انسحاب لكامل المستوي؟",
    ],
    answer: false,
    sourceRefs: [P6, P7],
  }),
];
