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
 *      • image-circle-polygon (صورة دائرة ومستطيل ومثلث): 6
 *      • construction-applications (الإنشاءات الهندسية والتطبيقات الحسابية): 5
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

const LESSON_ID = 'lesson-03-image-of-a-shape';
const P11 = { page: 11, locator: 'نشاط تخمين صورة مستقيم' };
const P12 = { page: 12, locator: 'إثبات توازي صورة المستقيم' };
const P13 = { page: 13, locator: 'صورة مستقيمين متوازيين أو متعامدين وصورة قطعة' };
const P14 = { page: 14, locator: 'صورة نصف مستقيم وصورة دائرة واكتساب معارف' };
const P15 = { page: 15, locator: 'تطبيقات هندسية وتحقق من فهمك' };
const P16 = { page: 16, locator: 'تدرب 1 و2 و3 و4' };

export const questions: TestQuestionInput[] = [
  /* ------------------------------------------------------------------ 01 */
  singleChoice({
    id: 'geo-l03-t01-q01',
    lessonId: LESSON_ID,
    concept: 'image-line-segment',
    difficulty: 'basic',
    prompt: [
      'ما هي صورة مستقيم $(d)$ وفق انسحاب في الحالة العامة التي لا يوازي فيها المستقيم اتجاه الحركة؟',
    ],
    choices: [
      { id: 'opt-a', text: 'مستقيم يوازي المستقيم $(d)$' },
      { id: 'opt-b', text: 'مستقيم يعامد المستقيم $(d)$' },
      { id: 'opt-c', text: 'نصف مستقيم يبدأ من نقطة الانسحاب' },
      { id: 'opt-d', text: 'قطعة مستقيمة طولها يساوي مسافة الانسحاب' },
    ],
    answer: 'opt-a',
    sourceRefs: [P11, P12, P13],
  }),

  /* ------------------------------------------------------------------ 02 */
  trueFalse({
    id: 'geo-l03-t01-q02',
    lessonId: LESSON_ID,
    concept: 'image-line-segment',
    difficulty: 'basic',
    prompt: [
      "صورة قطعة مستقيمة $[MN]$ وفق انسحاب هي قطعة مستقيمة $[M'N']$ توازيها وتساويها في الطول تماماً.",
    ],
    answer: true,
    sourceRefs: [P13],
  }),

  /* ------------------------------------------------------------------ 03 */
  singleChoice({
    id: 'geo-l03-t01-q03',
    lessonId: LESSON_ID,
    concept: 'image-circle-polygon',
    difficulty: 'basic',
    prompt: [
      "دائرة $\\mathcal{C}$ مركزها $O$ ونصف قطرها $R$. صورتها وفق انسحاب ينقل $A$ إلى $B$ هي دائرة $\\mathcal{C}'$. ما مركز ونصف قطر الدائرة $\\mathcal{C}'$؟",
    ],
    choices: [
      { id: 'opt-a', text: "مركزها $O'$ صورة $O$ وفق الانسحاب، ونصف قطرها يساوي $R$" },
      { id: 'opt-b', text: 'مركزها $B$، ونصف قطرها يساوي $R + AB$' },
      { id: 'opt-c', text: 'مركزها $O$، ونصف قطرها يتضاعف' },
      { id: 'opt-d', text: "مركزها $O'$، ونصف قطرها يساوي مسافة الانسحاب $AB$" },
    ],
    answer: 'opt-a',
    sourceRefs: [P14],
  }),

  /* ------------------------------------------------------------------ 04 */
  numeric({
    id: 'geo-l03-t01-q04',
    lessonId: LESSON_ID,
    concept: 'construction-applications',
    difficulty: 'basic',
    prompt: [
      "مستطيل $ABCD$ مساحته $35\\ \\mathrm{cm}^2$. صورته وفق انسحاب هي المستطيل $A'B'C'D'$. ما مساحة المستطيل $A'B'C'D'$ بالسنتيمتر المربع؟",
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
    prompt: ['وفق انسحاب، صورة مستقيمين متعامدين هما:'],
    choices: [
      { id: 'opt-a', text: 'مستقيمان متعامدان' },
      { id: 'opt-b', text: 'مستقيمان متوازيان' },
      { id: 'opt-c', text: 'مستقيمان يتقاطعان بزاوية $45^\\circ$' },
      { id: 'opt-d', text: 'مستقيم واحد منطبق' },
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
    prompt: ['متى تكون صورة مستقيم $(d)$ وفق انسحاب هي المستقيم $(d)$ نفسه (أي ينطبق على نفسه)؟'],
    choices: [
      { id: 'opt-a', text: 'عندما يكون اتجاه الانسحاب موازياً للمستقيم $(d)$' },
      { id: 'opt-b', text: 'عندما يكون اتجاه الانسحاب عمودياً على المستقيم $(d)$' },
      { id: 'opt-c', text: 'عندما تكون مسافة الانسحاب أكبر من $10\\ \\mathrm{cm}$' },
      { id: 'opt-d', text: 'لا يمكن لصورة مستقيم أن تنطبق عليه إطلاقاً' },
    ],
    answer: 'opt-a',
    sourceRefs: [P12, P13],
  }),

  /* ------------------------------------------------------------------ 07 */
  trueFalse({
    id: 'geo-l03-t01-q07',
    lessonId: LESSON_ID,
    concept: 'image-parallel-perp',
    difficulty: 'medium',
    prompt: [
      "إذا كان $(d_1) \\parallel (d_2)$، وكانت $(d_1')$ و $(d_2')$ صورتيهما وفق انسحاب، فإن $(d_1') \\parallel (d_2')$.",
    ],
    answer: true,
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
      { id: 'c1', text: "المثلث $A'B'C'$ متساوي الأضلاع أيضاً وطول ضلعه $5\\ \\mathrm{cm}$" },
      { id: 'c2', text: "قياس كل زاوية من زوايا $A'B'C'$ يساوي $60^\\circ$" },
      { id: 'c3', text: "كل ضلع من أضلاع $A'B'C'$ يوازي نظيره في $ABC$" },
      { id: 'c4', text: "مساحة $A'B'C'$ ضعف مساحة $ABC$" },
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
      'دائرة مركزها النقطة $(2, 3)$ ونصف قطرها $4\\ \\mathrm{cm}$. نُقلت بانسحاب مقداره $6\\ \\mathrm{cm}$. ما محيط الدائرة الناتجة بدلالة $\\pi$ (اكتب معامل $\\pi$)؟',
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
      { id: 'r-ray', text: "نصف مستقيم $[M'x') يوازيه وله الاتجاه نفسه" },
      { id: 'r-seg', text: "قطعة مستقيمة $[M'N']$ توازيها ولها الطول نفسه" },
      { id: 'r-cir', text: "دائرة مركزها $O'$ ونصف قطرها $r$" },
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
    prompt: ['صنّف العلاقات بين المستقيمات الأصلية وصورها:'],
    categories: [
      { id: 'cat-always-parallel', text: 'تكون الصورة موازية للأصل دائماً' },
      { id: 'cat-not-parallel', text: 'ليست موازية للأصل بالضرورة' },
    ],
    items: [
      { id: 'i1', text: 'صورة مستقيم $(d)$ وفق أي انسحاب' },
      { id: 'i2', text: 'صورة قطعة مستقيمة $[AB]$ وفق أي انسحاب' },
      { id: 'i3', text: 'صورة مستقيم وفق دوران بزاوية $90^\\circ$' },
      { id: 'i4', text: 'صورة نصف مستقيم $[Ox)$ وفق أي انسحاب' },
    ],
    assignment: {
      i1: 'cat-always-parallel',
      i2: 'cat-always-parallel',
      i3: 'cat-not-parallel',
      i4: 'cat-always-parallel',
    },
    sourceRefs: [P12, P13, P14],
  }),

  /* ------------------------------------------------------------------ 12 */
  ordering({
    id: 'geo-l03-t01-q12',
    lessonId: LESSON_ID,
    concept: 'construction-applications',
    difficulty: 'medium',
    prompt: ['رتّب خطوات إنشاء صورة مستقيم $(d)$ وفق انسحاب معلوم باستخدام الفرجار والمسطرة:'],
    items: [
      { id: 's1', text: 'نختار نقطتين متمايزتين $M$ و $N$ تنتميان إلى المستقيم $(d)$' },
      { id: 's2', text: "ننشئ بالفرجار النقطتين $M'$ و $N'$ صورتي $M$ و $N$ وفق الانسحاب" },
      { id: 's3', text: "نرسم المستقيم المار بالنقطتين $M'$ و $N'$ فيكون هو صورة المستقيم $(d)$" },
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
      "مثلث $ABC$ قائم الزاوية في $A$. صورته وفق انسحاب هي المثلث $A'B'C'$. ما طبيعة الشكل الرباعي $ABB'A'$؟",
    ],
    choices: [
      { id: 'opt-a', text: 'متوازي أضلاع' },
      { id: 'opt-b', text: 'مثلث متساوي الساقين' },
      { id: 'opt-c', text: 'مستطيل دائماً' },
      { id: 'opt-d', text: 'شبه منحرف متساوي الساقين' },
    ],
    answer: 'opt-a',
    sourceRefs: [P13, P16],
  }),

  /* ------------------------------------------------------------------ 14 */
  exact({
    id: 'geo-l03-t01-q14',
    lessonId: LESSON_ID,
    concept: 'image-circle-polygon',
    difficulty: 'advanced',
    prompt: [
      "مربع مساحته $16\\ \\mathrm{cm}^2$. صورته وفق انسحاب هي المربع $S'$. ما النسبة بين محيط المربع $S'$ ومحيط المربع الأصلي؟",
    ],
    numerator: 1,
    denominator: 1,
    acceptEquivalentForms: true,
    sourceRefs: [P14, P16],
  }),

  /* ------------------------------------------------------------------ 15 */
  singleChoice({
    id: 'geo-l03-t01-q15',
    lessonId: LESSON_ID,
    concept: 'image-parallel-perp',
    difficulty: 'advanced',
    prompt: [
      "مستقيمان متقاطعان $(d_1)$ و $(d_2)$ في النقطة $I$. صُوِّرا بالانسحاب نفسه فنتج المستقيمان $(d_1')$ و $(d_2')$. في أي نقطة يتقاطع $(d_1')$ و $(d_2')$؟",
    ],
    choices: [
      { id: 'opt-a', text: "في النقطة $I'$ صورة النقطة $I$ وفق هذا الانسحاب" },
      { id: 'opt-b', text: 'في النقطة $I$ نفسها لأن نقطة التقاطع لا تتغير' },
      { id: 'opt-c', text: 'المستقيمان لا يتقاطعان بل يصبحان متوازيين' },
      { id: 'opt-d', text: 'في نقطة منتصف مسافة الانسحاب' },
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
      'طُلب إنشاء صورة دائرة بالانسحاب، فقام تلميذ بتعيين صورة نقطة واحدة $K$ من محيط الدائرة ورسم دائرة مركزها $K$. أين وجه الخطأ؟',
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
      { id: 'st1', text: "صورة دائرة تتحدد بنقل مركز الدائرة $O$ إلى $O'$ أولاً." },
      {
        id: 'st2',
        text: 'نقل نقطة من المحيط وجعلها مركزاً يغيّر موضع مركز الدائرة كلياً ويُنتج دائرة خاطئة.',
      },
    ],
    choices: [
      {
        id: 'c-err',
        text: "الخطأ هو اعتبار نقطة المحيط مركزاً، فالقاعدة تقتضي نقل المركز الأصلي $O$ لتحديد المركز الجديد $O'$",
      },
      { id: 'c-ok', text: 'طريقة التلميذ صحيحة ومقبولة هندسياً' },
    ],
    answer: 'c-err',
    sourceRefs: [P14],
  }),

  /* ------------------------------------------------------------------ 17 */
  singleChoice({
    id: 'geo-l03-t01-q17',
    lessonId: LESSON_ID,
    concept: 'image-circle-polygon',
    difficulty: 'advanced',
    prompt: [
      'دائرتان متماستان في النقطة $T$. صُوِّر الشكل كاملاً وفق انسحاب فنتجت دائرتان جديدتان. ما العلاقة بين الدائرتين الجديدتين؟',
    ],
    choices: [
      { id: 'opt-a', text: "دائرتان متماستان في النقطة $T'$ صورة النقطة $T$" },
      { id: 'opt-b', text: 'دائرتان متقاطعتان في نقطتين' },
      { id: 'opt-c', text: 'دائرتان متباعدتان لا تشتركان بأي نقطة' },
      { id: 'opt-d', text: 'دائرتان متحدتان في المركز' },
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
      "المستقيم $(d')$ هو صورة المستقيم $(d)$ وفق انسحاب ينقل $A$ إلى $B$. أيُّ الخصائص الآتية محققة دائماً؟ (اختر كل الإجابات الصحيحة)",
    ],
    choices: [
      { id: 'c1', text: "$(d') \\parallel (d)$ أو ينطبقان" },
      { id: 'c2', text: "إذا كانت $M \\in (d)$ فإن صورتها $M' \\in (d')$" },
      { id: 'c3', text: "المسافة العمودية بين $(d)$ و $(d')$ ثابتة على طول المستقيمين" },
      { id: 'c4', text: "$(d') \\perp (d)$ دائماً" },
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
      "زعم أحد التلاميذ: «إذا كان لدينا مستقيمان متوازيان $(d)$ و $(d')$، فإنه يوجد انسحاب واحد فقط ينقل $(d)$ إلى $(d')$». ما الخطأ في هذا الزعم؟",
    ],
    steps: [
      {
        id: 's1',
        text: "اختيار أي نقطة $A$ من $(d)$ ونقطة $B$ من $(d')$ يعيّن انسحاباً ينقل $(d)$ إلى $(d').",
      },
      {
        id: 's2',
        text: "بما أنه توجد نقاط غير منتهية على $(d')$، فإنه توجد انسحابات لا نهائية تنقل $(d)$ إلى $(d').",
      },
    ],
    choices: [
      {
        id: 'ch-err',
        text: 'الزعم خاطئ؛ إذ توجد انسحابات غير منتهية تنقل مستقيماً إلى موازٍ له باختلاف النقطة المختارة كهدف على المستقيم الموازي.',
      },
      { id: 'ch-ok', text: 'الزعم صحيح، لا يوجد سوى انسحاب وحيد عمودي.' },
    ],
    answer: 'ch-err',
    sourceRefs: [P12, P15],
  }),

  /* ------------------------------------------------------------------ 20 */
  trueFalse({
    id: 'geo-l03-t01-q20',
    lessonId: LESSON_ID,
    concept: 'image-circle-polygon',
    difficulty: 'thinking',
    prompt: [
      'إذا كان لدينا مستطيل $ABCD$، وأجرينا انسحاباً ينقل $A$ إلى $C$، فإن صورة المستطيل تطابقه تماماً ومساحته مساوية لمساحة المستطيل الأصلي، وجميع أضلاعه الجديدة توازي أضلاعه الأصلية.',
    ],
    answer: true,
    sourceRefs: [P14, P16],
  }),
];
