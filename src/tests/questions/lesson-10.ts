import { L10_CHECK, L10_PRACTICE_JKL, L10_TEST_BUNDLE } from '@/content/units/lesson-10-geometry';
import { figureBlock, numeric, singleChoice, testFigure, trueFalse } from '../authoring';
import type { TestQuestionInput } from '../schema';

/**
 * ============================================================================
 *  LESSON 10 TEST BANK — «مستقيمات متوازية وقاطعان» (Unit 2, Lesson 3)
 * ============================================================================
 *
 *  20 questions covering textbook pages 36–38. Per the authoring brief the
 *  bank uses only the three controlled types: single-choice, true-false and
 *  numeric — every item is deterministically gradable and the scoring engine
 *  is untouched. IDs are stable, unique and human-readable
 *  (`geo-l10-t01-q01 … q20`); every question is anchored to a real page.
 *
 *  Blueprint (must match the definition in ../definitions/lesson-10.ts):
 *    concepts  · equal-ratio-property 5 · correspondence-and-tables 4
 *                length-computation 6 · combined-and-midpoint 5
 *    levels    · basic 6 · medium 8 · advanced 4 · thinking 2
 *    types     · single-choice 9 · true-false 5 · numeric 6
 * ============================================================================
 */

const LESSON_ID = 'lesson-10-parallel-lines-transversals';

const REF_ACTIVITY_36 = [{ page: 36, section: 'نشاط — اكتشاف التناسب بين أطوال أضلاع مثلثين' }];
const REF_LEARN_36 = [{ page: 36, section: 'تعلّم — مستقيمان متوازيان وقاطعان' }];
const REF_KHASSA_37 = [{ page: 37, section: 'خاصة — التناسب بين أطوال أضلاع المثلثين' }];
const REF_KNOWLEDGE_37 = [{ page: 37, section: 'اكتساب معارف — حساب AS في الحالتين ① و②' }];
const REF_CHECK_38 = [{ page: 38, section: 'تحقّق من فهمك — المثلثان ABC و AEF' }];
const REF_PRACTICE1_38 = [{ page: 38, section: 'تدرّب ① — حزم المستقيمات المتوازية' }];
const REF_PRACTICE2_38 = [{ page: 38, section: 'تدرّب ② — المثلثان JKL و JMN' }];
const REF_BOTH_37_38 = [
  { page: 37, section: 'اكتساب معارف — مبرهنة النسب المتساوية' },
  { page: 38, section: 'تحقّق من فهمك وتدرّب' },
];

/* -------------------------------------------------------------------------- */
/*  Audited Test Area figures (three total: two A, one B)                     */
/* -------------------------------------------------------------------------- */

const q10Figure = figureBlock(
  testFigure({
    id: 'test-l10-q10-bundle',
    sourceRefs: REF_PRACTICE1_38,
    alt: 'مستقيمان متوازيان أفقيان $(BC)$ و$(EF)$ يقطعهما القاطعان $(AE)$ و$(AF)$ في النقاط $B$ و$C$ و$E$ و$F$ ويلتقيان في $A$',
    caption: 'رسم تخطيطي غير مقيّس: المستقيمان $(BC)$ و$(EF)$ متوازيان والقاطعان يلتقيان في $A$.',
    spec: {
      questionLabels: ['A', 'B', 'C', 'E', 'F'],
      points: [
        { id: 'A', x: L10_TEST_BUNDLE.A[0], y: L10_TEST_BUNDLE.A[1], labelSide: 'n' },
        { id: 'B', x: L10_TEST_BUNDLE.B[0], y: L10_TEST_BUNDLE.B[1], labelSide: 'ne' },
        { id: 'C', x: L10_TEST_BUNDLE.C[0], y: L10_TEST_BUNDLE.C[1], labelSide: 'nw' },
        { id: 'E', x: L10_TEST_BUNDLE.E[0], y: L10_TEST_BUNDLE.E[1], labelSide: 'sw' },
        { id: 'F', x: L10_TEST_BUNDLE.F[0], y: L10_TEST_BUNDLE.F[1], labelSide: 'se' },
      ],
      polygons: [{ points: ['A', 'B', 'C'], fill: true }],
      segments: [
        { from: 'A', to: 'B' },
        { from: 'B', to: 'E' },
        { from: 'A', to: 'C' },
        { from: 'C', to: 'F' },
        { from: 'B', to: 'C' },
        { from: 'E', to: 'F' },
      ],
    },
  }),
);

const q13Figure = figureBlock(
  testFigure({
    id: 'test-l10-q13-check-aef',
    sourceRefs: REF_CHECK_38,
    alt: 'المثلث $ABC$ وفيه $E$ من $[AB]$ و$F$ من $[AC]$ و$(EF) \\parallel (BC)$ مع الأطوال المعلومة $AE = 3$ و$AF = 4$ و$AC = 12$',
    caption: 'رسم تخطيطي غير مقيّس يقتصر على المعطيات المطبوعة: $AE = 3$ و$AF = 4$ و$AC = 12$.',
    spec: {
      questionLabels: ['A', 'B', 'C', 'E', 'F'],
      points: [
        { id: 'A', x: L10_CHECK.A[0], y: L10_CHECK.A[1], labelSide: 'n' },
        { id: 'E', x: L10_CHECK.E[0], y: L10_CHECK.E[1], labelSide: 'ne' },
        { id: 'B', x: L10_CHECK.B[0], y: L10_CHECK.B[1], labelSide: 'sw' },
        { id: 'F', x: L10_CHECK.F[0], y: L10_CHECK.F[1], labelSide: 'nw' },
        { id: 'C', x: L10_CHECK.C[0], y: L10_CHECK.C[1], labelSide: 'se' },
      ],
      polygons: [{ points: ['A', 'B', 'C'], fill: true }],
      segments: [
        { from: 'A', to: 'E' },
        { from: 'E', to: 'B' },
        { from: 'A', to: 'F' },
        { from: 'F', to: 'C' },
        { from: 'E', to: 'F' },
        { from: 'B', to: 'C' },
      ],
      annotations: [
        { x: -1.35, y: -1.15, text: '3', anchor: 'middle' },
        { x: 2.35, y: -1.75, text: '4', anchor: 'middle' },
        { x: 5.1, y: -6.95, text: '12', anchor: 'middle' },
      ],
    },
  }),
);

const q16Figure = figureBlock(
  testFigure({
    id: 'test-l10-q16-jkl',
    sourceRefs: REF_PRACTICE2_38,
    alt: 'المثلث $JKL$ وفيه $M$ من $[JK]$ و$N$ من $[JL]$ و$(MN) \\parallel (KL)$ مع المعطيات $JM = 2.5$ و$JN = 3$ و$NL = 9$ و$KL = 6$',
    caption: 'رسم تخطيطي غير مقيّس يعرض معطيات تدرّب ② فقط من دون طولا $JK$ و$MN$ المطلوبين.',
    spec: {
      questionLabels: ['J', 'K', 'L', 'M', 'N'],
      points: [
        { id: 'J', x: L10_PRACTICE_JKL.J[0], y: L10_PRACTICE_JKL.J[1], labelSide: 'sw' },
        { id: 'K', x: L10_PRACTICE_JKL.K[0], y: L10_PRACTICE_JKL.K[1], labelSide: 'n' },
        { id: 'L', x: L10_PRACTICE_JKL.L[0], y: L10_PRACTICE_JKL.L[1], labelSide: 'se' },
        { id: 'M', x: L10_PRACTICE_JKL.M[0], y: L10_PRACTICE_JKL.M[1], labelSide: 'nw' },
        { id: 'N', x: L10_PRACTICE_JKL.N[0], y: L10_PRACTICE_JKL.N[1], labelSide: 's' },
      ],
      polygons: [{ points: ['J', 'K', 'L'], fill: true }],
      segments: [
        { from: 'J', to: 'M' },
        { from: 'M', to: 'K' },
        { from: 'J', to: 'N' },
        { from: 'N', to: 'L' },
        { from: 'M', to: 'N' },
        { from: 'K', to: 'L' },
      ],
      annotations: [
        { x: 1.1, y: 1.15, text: '2.5', anchor: 'middle' },
        { x: 1.5, y: -0.55, text: '3', anchor: 'middle' },
        { x: 7.5, y: -0.55, text: '9', anchor: 'middle' },
        { x: 10.95, y: 3.0, text: '6', anchor: 'middle' },
      ],
    },
  }),
);

/* -------------------------------------------------------------------------- */
/*  Question bank                                                              */
/* -------------------------------------------------------------------------- */

export const questions: TestQuestionInput[] = [
  /* ---- Q01 · basic · single-choice · equal-ratio-property -------------- */
  singleChoice({
    id: 'geo-l10-t01-q01',
    lessonId: LESSON_ID,
    concept: 'equal-ratio-property',
    difficulty: 'basic',
    sourceRefs: REF_KHASSA_37,
    prompt: [
      'في المثلث $ABC$، $M \\in [AB]$ و$N \\in [AC]$ و$(MN) \\parallel (BC)$. أيّ تساوٍ للنسب ينتج مباشرةً عن خاصة الدرس؟',
    ],
    choices: [
      { id: 'opt-a', text: '$\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}$' },
      { id: 'opt-b', text: '$\\frac{AM}{MB} = \\frac{AN}{NC} = 1$' },
      { id: 'opt-c', text: '$AM = AN$ و$MB = NC$' },
      { id: 'opt-d', text: '$\\frac{AM}{AN} = \\frac{BC}{MN}$' },
    ],
    answer: 'opt-a',
  }),

  /* ---- Q02 · basic · true-false · equal-ratio-property ----------------- */
  trueFalse({
    id: 'geo-l10-t01-q02',
    lessonId: LESSON_ID,
    concept: 'equal-ratio-property',
    difficulty: 'basic',
    sourceRefs: REF_ACTIVITY_36,
    prompt: [
      'في المثلث $EFG$، نقطة $H$ من $[EF]$ ونقطة $K$ من $[EG]$ من دون أي شرط توازٍ. الجدول الذي يربط أطوال $EHK$ بأطوال $EFG$ يكون دائماً جدول تناسب.',
    ],
    answer: false,
  }),

  /* ---- Q03 · basic · single-choice · equal-ratio-property -------------- */
  singleChoice({
    id: 'geo-l10-t01-q03',
    lessonId: LESSON_ID,
    concept: 'equal-ratio-property',
    difficulty: 'basic',
    sourceRefs: REF_LEARN_36,
    prompt: [
      'مستقيم يقطع ضلعي المثلث $ABC$ في $M$ من $[AB]$ و$N$ من $[AC]$. أيّ شرط يكفي لضمان أنّ $\\frac{AM}{AB} = \\frac{AN}{AC}$؟',
    ],
    choices: [
      { id: 'opt-a', text: 'أن يكون $(MN) \\parallel (BC)$' },
      { id: 'opt-b', text: 'أن تكون $AM = AN$' },
      { id: 'opt-c', text: 'أن يكون المثلث $ABC$ متساوي الأضلاع' },
      { id: 'opt-d', text: 'أن تكون $M$ منتصف $[AB]$ فقط' },
    ],
    answer: 'opt-a',
  }),

  /* ---- Q04 · basic · true-false · combined-and-midpoint ---------------- */
  trueFalse({
    id: 'geo-l10-t01-q04',
    lessonId: LESSON_ID,
    concept: 'combined-and-midpoint',
    difficulty: 'basic',
    sourceRefs: REF_BOTH_37_38,
    prompt: [
      'إذا كانت $M$ منتصف $[AB]$ و$(MN) \\parallel (BC)$ مع $N \\in [AC]$، فإنّ خاصة هذا الدرس تعطي $\\frac{AN}{AC} = \\frac{1}{2}$ و$MN = \\frac{1}{2}\\,BC$.',
    ],
    answer: true,
  }),

  /* ---- Q05 · medium · single-choice · equal-ratio-property ------------- */
  singleChoice({
    id: 'geo-l10-t01-q05',
    lessonId: LESSON_ID,
    concept: 'equal-ratio-property',
    difficulty: 'medium',
    sourceRefs: REF_KHASSA_37,
    prompt: [
      'في المثلث $ABC$، $(MN) \\parallel (BC)$ و$M \\in [AB]$ و$N \\in [AC]$. إذا كان $\\frac{AM}{MB} = \\frac{2}{3}$، فما قيمة $\\frac{AM}{AB}$؟',
    ],
    choices: [
      { id: 'opt-a', text: '$\\frac{2}{5}$' },
      { id: 'opt-b', text: '$\\frac{2}{3}$' },
      { id: 'opt-c', text: '$\\frac{3}{5}$' },
      { id: 'opt-d', text: '$\\frac{3}{2}$' },
    ],
    answer: 'opt-a',
  }),

  /* ---- Q06 · medium · true-false · equal-ratio-property --------------- */
  trueFalse({
    id: 'geo-l10-t01-q06',
    lessonId: LESSON_ID,
    concept: 'equal-ratio-property',
    difficulty: 'medium',
    sourceRefs: REF_KHASSA_37,
    prompt: [
      'إذا تحقّق $(MN) \\parallel (BC)$ في المثلث $ABC$، فإنّ نسبتي الجزأين على القاطعين متساويتان أيضاً: $\\frac{AM}{MB} = \\frac{AN}{NC}$.',
    ],
    answer: true,
  }),

  /* ---- Q07 · basic · single-choice · correspondence -------------------- */
  singleChoice({
    id: 'geo-l10-t01-q07',
    lessonId: LESSON_ID,
    concept: 'correspondence-and-tables',
    difficulty: 'basic',
    sourceRefs: REF_KNOWLEDGE_37,
    prompt: [
      'في المثلث $ARS$، $M \\in [AR]$ و$N \\in [AS]$ و$(MN) \\parallel (RS)$. الضلع $[AN]$ في المثلث الصغير يناظر أيّ ضلع في المثلث الكبير؟',
    ],
    choices: [
      { id: 'opt-a', text: 'الضلع $[AS]$' },
      { id: 'opt-b', text: 'الضلع $[AR]$' },
      { id: 'opt-c', text: 'الضلع $[RS]$' },
      { id: 'opt-d', text: 'الضلع $[MN]$' },
    ],
    answer: 'opt-a',
  }),

  /* ---- Q08 · medium · single-choice · correspondence ------------------- */
  singleChoice({
    id: 'geo-l10-t01-q08',
    lessonId: LESSON_ID,
    concept: 'correspondence-and-tables',
    difficulty: 'medium',
    sourceRefs: REF_LEARN_36,
    prompt: [
      'في المثلث $ABC$، $(MN) \\parallel (BC)$ و$AM = 6$ و$AB = 10$ و$AC = 15$. ما طول القطعة $AN$؟',
    ],
    choices: [
      { id: 'opt-a', text: '$9$' },
      { id: 'opt-b', text: '$8$' },
      { id: 'opt-c', text: '$10$' },
      { id: 'opt-d', text: '$12$' },
    ],
    answer: 'opt-a',
  }),

  /* ---- Q09 · medium · true-false · correspondence ---------------------- */
  trueFalse({
    id: 'geo-l10-t01-q09',
    lessonId: LESSON_ID,
    concept: 'correspondence-and-tables',
    difficulty: 'medium',
    sourceRefs: REF_ACTIVITY_36,
    prompt: [
      'إذا أُرسم من $M$ مستقيم مائل يلقى $[AC]$ في نقطة $P \\neq N$ بدل الموازي $(MN)$، فإنّ الجدول الذي يربط أطوال $AMP$ بأطوال $ABC$ لا يعود جدول تناسب.',
    ],
    answer: true,
  }),

  /* ---- Q10 · advanced · single-choice + figure · correspondence -------- */
  singleChoice({
    id: 'geo-l10-t01-q10',
    lessonId: LESSON_ID,
    concept: 'correspondence-and-tables',
    difficulty: 'advanced',
    sourceRefs: REF_PRACTICE1_38,
    prompt: [
      q10Figure,
      'في الشكل المرافق $(BC) \\parallel (EF)$ والقاطعان $(AE)$ و$(AF)$ يلتقيان في $A$. أيّ زوج من المثلثات يحدّده المستقيمان المتوازيان والقاطعان؟',
    ],
    choices: [
      { id: 'opt-a', text: 'المثلثان $ABC$ و$AEF$' },
      { id: 'opt-b', text: 'المثلثان $ABE$ و$ACF$' },
      { id: 'opt-c', text: 'المثلثان $BCE$ و$BCF$' },
      { id: 'opt-d', text: 'المثلثان $ABE$ و$EFC$' },
    ],
    answer: 'opt-a',
  }),

  /* ---- Q11 · basic · numeric · length-computation (book case ①) -------- */
  numeric({
    id: 'geo-l10-t01-q11',
    lessonId: LESSON_ID,
    concept: 'length-computation',
    difficulty: 'basic',
    sourceRefs: REF_KNOWLEDGE_37,
    prompt: [
      'في المثلث $ARS$، $M \\in [AR]$ و$N \\in [AS]$ و$(MN) \\parallel (RS)$ و$AM = 2$ و$AR = 8$ و$AN = 3$. احسب الطول $AS$.',
    ],
    answer: 12,
  }),

  /* ---- Q12 · advanced · numeric · length-computation (book case ②) ----- */
  numeric({
    id: 'geo-l10-t01-q12',
    lessonId: LESSON_ID,
    concept: 'length-computation',
    difficulty: 'advanced',
    sourceRefs: REF_KNOWLEDGE_37,
    prompt: [
      'في المثلث $ARU$، $T \\in [AU]$ و$S \\in [AR]$ و$(TS) \\parallel (RU)$ و$AT = 2$ و$TU = 3$ و$AR = 10$. احسب الطول $AS$.',
    ],
    answer: 4,
  }),

  /* ---- Q13 · medium · numeric + figure · length-computation (check) ---- */
  numeric({
    id: 'geo-l10-t01-q13',
    lessonId: LESSON_ID,
    concept: 'length-computation',
    difficulty: 'medium',
    sourceRefs: REF_CHECK_38,
    prompt: [
      q13Figure,
      'في الشكل المرافق $(EF) \\parallel (BC)$ و$AE = 3$ و$AF = 4$ و$AC = 12$. احسب الطول $AB$.',
    ],
    answer: 9,
  }),

  /* ---- Q14 · medium · numeric · length-computation (part of a side) ---- */
  numeric({
    id: 'geo-l10-t01-q14',
    lessonId: LESSON_ID,
    concept: 'length-computation',
    difficulty: 'medium',
    sourceRefs: REF_CHECK_38,
    prompt: [
      'في المثلث $ABC$، $(EF) \\parallel (BC)$ و$E \\in [AB]$ و$F \\in [AC]$، وُجد أنّ $AB = 9$ و$AE = 3$. احسب الطول $EB$.',
    ],
    answer: 6,
  }),

  /* ---- Q15 · medium · single-choice · length-computation -------------- */
  singleChoice({
    id: 'geo-l10-t01-q15',
    lessonId: LESSON_ID,
    concept: 'length-computation',
    difficulty: 'medium',
    sourceRefs: REF_KNOWLEDGE_37,
    prompt: [
      'بعد كتابة مبرهنة النسب المتساوية وصل تلميذ إلى $\\frac{3}{9} = \\frac{4}{AS}$. أيّ معادلة ناتجة عن الضرب التبادلي الصحيح؟',
    ],
    choices: [
      { id: 'opt-a', text: '$3 \\times AS = 4 \\times 9$' },
      { id: 'opt-b', text: '$3 \\times 4 = 9 \\times AS$' },
      { id: 'opt-c', text: '$3 \\times 9 = 4 \\times AS$' },
      { id: 'opt-d', text: '$AS = 3 \\times 9 \\times 4$' },
    ],
    answer: 'opt-a',
  }),

  /* ---- Q16 · advanced · numeric + figure · length-computation (J/K/L) -- */
  numeric({
    id: 'geo-l10-t01-q16',
    lessonId: LESSON_ID,
    concept: 'length-computation',
    difficulty: 'advanced',
    sourceRefs: REF_PRACTICE2_38,
    prompt: [
      q16Figure,
      'في الشكل المرافق $(MN) \\parallel (KL)$ و$JM = 2.5$ و$JN = 3$ و$NL = 9$ و$KL = 6$. احسب الطول $JK$.',
    ],
    answer: 10,
  }),

  /* ---- Q17 · medium · numeric · combined-and-midpoint ------------------ */
  numeric({
    id: 'geo-l10-t01-q17',
    lessonId: LESSON_ID,
    concept: 'combined-and-midpoint',
    difficulty: 'medium',
    sourceRefs: REF_PRACTICE2_38,
    prompt: [
      'في المثلث $JKL$، $(MN) \\parallel (KL)$ و$M \\in [JK]$ و$N \\in [JL]$، و$JN = 3$ و$NL = 9$ و$KL = 6$. احسب الطول $MN$.',
    ],
    answer: 1.5,
  }),

  /* ---- Q18 · advanced · single-choice · combined-and-midpoint ---------- */
  singleChoice({
    id: 'geo-l10-t01-q18',
    lessonId: LESSON_ID,
    concept: 'combined-and-midpoint',
    difficulty: 'advanced',
    sourceRefs: REF_BOTH_37_38,
    prompt: [
      'في المثلث $ABC$، $(MN) \\parallel (BC)$ و$\\frac{AM}{MB} = \\frac{2}{3}$ و$AC = 20$. ما طول القطعة $AN$؟',
    ],
    choices: [
      { id: 'opt-a', text: '$8$' },
      { id: 'opt-b', text: '$10$' },
      { id: 'opt-c', text: '$12$' },
      { id: 'opt-d', text: '$15$' },
    ],
    answer: 'opt-a',
  }),

  /* ---- Q19 · thinking · true-false · combined-and-midpoint ------------- */
  trueFalse({
    id: 'geo-l10-t01-q19',
    lessonId: LESSON_ID,
    concept: 'combined-and-midpoint',
    difficulty: 'thinking',
    sourceRefs: REF_KHASSA_37,
    prompt: [
      'يقول تلميذ: «بما أنّ $(MN) \\parallel (BC)$ في المثلث $ABC$، فإنّ الطولين $AM$ و$AN$ متساويان دائماً». حكم هذه العبارة.',
    ],
    answer: false,
  }),

  /* ---- Q20 · thinking · single-choice · combined-and-midpoint ---------- */
  singleChoice({
    id: 'geo-l10-t01-q20',
    lessonId: LESSON_ID,
    concept: 'combined-and-midpoint',
    difficulty: 'thinking',
    sourceRefs: REF_BOTH_37_38,
    prompt: [
      'في المثلث $ABC$، $(MN) \\parallel (BC)$ و$AM = 4$ و$MB = 6$ و$AN = 6$. أيّ الاستنتاجات الآتية مبرَّر وفق مبرهنة النسب المتساوية؟',
    ],
    choices: [
      { id: 'opt-a', text: '$NC = 9$ لأنّ $\\frac{AM}{MB} = \\frac{AN}{NC} = \\frac{2}{3}$' },
      { id: 'opt-b', text: '$NC = 6$ لأنّ $AN = AM$' },
      { id: 'opt-c', text: '$NC = 4$ لأنّ $MB - AM = 2$' },
      { id: 'opt-d', text: 'لا يمكن حساب $NC$ من دون معرفة $BC$' },
    ],
    answer: 'opt-a',
  }),
];
