import { L9_TEST_CEVIAN, L9_TEST_RIGHT_TRIANGLE } from '@/content/units/lesson-09-geometry';
import {
  choicePart,
  classification,
  errorAnalysis,
  exact,
  figureBlock,
  fillIn,
  fillInBlank,
  matching,
  multiSelect,
  numeric,
  ordering,
  singleChoice,
  testFigure,
  trueFalse,
  trueFalseJustify,
} from '../authoring';
import type { TestQuestionInput } from '../schema';

const LESSON_ID = 'lesson-09-parallel-from-midpoint';

const REF_ACTIVITY_34 = [{ page: 34, section: 'نشاط — تمهيد خاصة المستقيم المار بمنتصف ضلع' }];
const REF_LEARN_34 = [{ page: 34, section: 'تعلّم — المبرهنة الثانية في المنتصفات' }];
const REF_METHOD_34 = [{ page: 34, section: 'تعلّم — خطوات استعمال المبرهنة الثانية' }];
const REF_KNOWLEDGE_35 = [{ page: 35, section: 'اكتساب معارف — إثبات وقوع نقطة في منتصف قطعة' }];
const REF_CHECK1_35 = [{ page: 35, section: 'تحقّق من فهمك — التمرين ①' }];
const REF_CHECK2_35 = [{ page: 35, section: 'تحقّق من فهمك — التمرين ②' }];
const REF_PRACTICE1_35 = [{ page: 35, section: 'تدرّب — التمرين ①' }];
const REF_PRACTICE2_35 = [{ page: 35, section: 'تدرّب — التمرين ②' }];
const REF_BOTH_34_35 = [
  { page: 34, section: 'تعلّم — المبرهنة الثانية في المنتصفات' },
  { page: 35, section: 'اكتساب معارف وتحقّق من فهمك وتدرّب' },
];

const q10Figure = figureBlock(
  testFigure({
    id: 'test-l09-q10-right-triangle',
    sourceRefs: REF_CHECK2_35,
    alt: 'مثلث $ABC$ قائم في $B$ والنقطة $M$ منتصف $[AB]$ والعمود $[MN]$ على $[AB]$ يلاقي $[AC]$ في $N$',
    caption:
      'رسم تخطيطي غير مقيّس للمثلث $ABC$ القائم في $B$ مع $M$ منتصف $[AB]$ و$(MN) \\perp (AB)$',
    spec: {
      questionLabels: ['A', 'B', 'C', 'M', 'N'],
      points: [
        {
          id: 'B',
          x: L9_TEST_RIGHT_TRIANGLE.B[0],
          y: L9_TEST_RIGHT_TRIANGLE.B[1],
          labelSide: 'sw',
        },
        {
          id: 'A',
          x: L9_TEST_RIGHT_TRIANGLE.A[0],
          y: L9_TEST_RIGHT_TRIANGLE.A[1],
          labelSide: 'se',
        },
        {
          id: 'C',
          x: L9_TEST_RIGHT_TRIANGLE.C[0],
          y: L9_TEST_RIGHT_TRIANGLE.C[1],
          labelSide: 'nw',
        },
        { id: 'M', x: L9_TEST_RIGHT_TRIANGLE.M[0], y: L9_TEST_RIGHT_TRIANGLE.M[1], labelSide: 's' },
        {
          id: 'N',
          x: L9_TEST_RIGHT_TRIANGLE.N[0],
          y: L9_TEST_RIGHT_TRIANGLE.N[1],
          labelSide: 'ne',
        },
      ],
      polygons: [{ points: ['A', 'B', 'C'], fill: true }],
      segments: [
        { from: 'B', to: 'M', ticks: 1 },
        { from: 'M', to: 'A', ticks: 1 },
        { from: 'B', to: 'C' },
        { from: 'C', to: 'A' },
        { from: 'M', to: 'N' },
      ],
      rightAngles: [
        { at: 'B', from: 'A', to: 'C' },
        { at: 'M', from: 'A', to: 'N' },
      ],
    },
  }),
);

const q16Figure = figureBlock(
  testFigure({
    id: 'test-l09-q16-cevian-midpoint',
    sourceRefs: REF_KNOWLEDGE_35,
    alt: 'مثلث $ABC$ والنقطة $M$ على الضلع $[BC]$ والقطعة $[AM]$ التي منتصفها $R$',
    caption:
      'رسم تخطيطي غير مقيّس للمثلث $ABC$ مقسوماً بالقطعة $[AM]$ إلى المثلثين $AMB$ و$AMC$ مع $R$ منتصف $[AM]$',
    spec: {
      questionLabels: ['A', 'B', 'C', 'M', 'R'],
      points: [
        { id: 'C', x: L9_TEST_CEVIAN.C[0], y: L9_TEST_CEVIAN.C[1], labelSide: 'sw' },
        { id: 'M', x: L9_TEST_CEVIAN.M[0], y: L9_TEST_CEVIAN.M[1], labelSide: 's' },
        { id: 'B', x: L9_TEST_CEVIAN.B[0], y: L9_TEST_CEVIAN.B[1], labelSide: 'se' },
        { id: 'A', x: L9_TEST_CEVIAN.A[0], y: L9_TEST_CEVIAN.A[1], labelSide: 'n' },
        { id: 'R', x: L9_TEST_CEVIAN.R[0], y: L9_TEST_CEVIAN.R[1], labelSide: 'w' },
      ],
      polygons: [{ points: ['A', 'C', 'B'], fill: true }],
      segments: [
        { from: 'A', to: 'C' },
        { from: 'C', to: 'B' },
        { from: 'A', to: 'B' },
        { from: 'A', to: 'R', ticks: 1 },
        { from: 'R', to: 'M', ticks: 1 },
      ],
    },
  }),
);

export const questions: TestQuestionInput[] = [
  /* ---- Q01 · basic · single-choice · second-midline-theorem ------------ */
  singleChoice({
    id: 'geo-l09-t01-q01',
    lessonId: LESSON_ID,
    concept: 'second-midline-theorem',
    difficulty: 'basic',
    sourceRefs: REF_LEARN_34,
    prompt: [
      'في المثلث $ABC$، النقطة $I$ منتصف الضلع $[AB]$، والمستقيم المار بالنقطة $I$ موازياً $(BC)$ يقطع الضلع $[AC]$ في $J$. ما النتيجة المباشرة للمبرهنة الثانية في المنتصفات؟',
    ],
    choices: [
      { id: 'opt-a', text: 'النقطة $I$ هي منتصف $[BC]$' },
      { id: 'opt-b', text: 'النقطة $J$ هي منتصف $[AC]$' },
      { id: 'opt-c', text: 'الطول $IJ$ يساوي الطول $BC$' },
      { id: 'opt-d', text: 'المستقيم $(IJ)$ عمودي على $[AC]$' },
    ],
    answer: 'opt-b',
  }),

  /* ---- Q02 · basic · true-false-justify · second-midline-theorem ------- */
  trueFalseJustify({
    id: 'geo-l09-t01-q02',
    lessonId: LESSON_ID,
    concept: 'second-midline-theorem',
    difficulty: 'basic',
    sourceRefs: REF_LEARN_34,
    prompt: [
      'احكم على العبارة الآتية ثم اختر التصويب الدقيق لها: «في أي مثلث $ABC$، إذا كانت $M$ منتصف $[AB]$، ومرّ مستقيم بالنقطة $M$ قاطعاً $[AC]$ في $P$ من دون أي شرط آخر، فإنَّ $P$ تكون حتماً منتصف $[AC]$».',
    ],
    answer: false,
    correction: choicePart({
      id: 'correction',
      prompt: ['ما الشرط الناقص الذي يجعل النقطة $P$ منتصف $[AC]$ حتماً؟'],
      choices: [
        {
          id: 'fix-parallel',
          text: 'يجب أن يوازي المستقيم $(MP)$ الضلع $(BC)$ في المثلث $ABC$.',
        },
        {
          id: 'fix-equilateral',
          text: 'يجب أن يكون المثلث $ABC$ متساوي الأضلاع دائماً.',
        },
        {
          id: 'fix-perp-ac',
          text: 'يجب أن يكون المستقيم $(MP)$ عمودياً على $[AB]$ في كل مثلث كيفي.',
        },
      ],
      answer: 'fix-parallel',
    }),
  }),

  /* ---- Q03 · basic · true-false · proof-and-salim-activity ------------- */
  trueFalse({
    id: 'geo-l09-t01-q03',
    lessonId: LESSON_ID,
    concept: 'proof-and-salim-activity',
    difficulty: 'basic',
    sourceRefs: REF_ACTIVITY_34,
    prompt: [
      "في نشاط سليم، لو رسم سليم المستقيم $(d)$ المار بمنتصف $[AB]$ موازياً فعلاً للضلع $[BC]$ بأدوات هندسية دقيقة، لانطبق $(d)$ على المستقيم $(d')$ المار بمنتصفَي $[AB]$ و$[AC]$.",
    ],
    answer: true,
  }),

  /* ---- Q04 · basic · single-choice · second-midline-theorem ------------ */
  singleChoice({
    id: 'geo-l09-t01-q04',
    lessonId: LESSON_ID,
    concept: 'second-midline-theorem',
    difficulty: 'basic',
    sourceRefs: REF_METHOD_34,
    prompt: [
      'في المثلث $EFG$، النقطة $K$ منتصف $[EF]$، والمستقيم المار بـ $K$ موازياً $(FG)$ يقطع $[EG]$ في $L$. وفق خطوات استعمال المبرهنة الثانية في المنتصفات، ما هو «الضلع الثالث» الذي تُثبت المبرهنة أنَّ $L$ منتصفه؟',
    ],
    choices: [
      { id: 'opt-a', text: 'الضلع $[EF]$' },
      { id: 'opt-b', text: 'الضلع $[FG]$' },
      { id: 'opt-c', text: 'الضلع $[EG]$' },
      { id: 'opt-d', text: 'القطعة $[KL]$' },
    ],
    answer: 'opt-c',
  }),

  /* ---- Q05 · basic · numeric · perpendicular-and-symmetry -------------- */
  numeric({
    id: 'geo-l09-t01-q05',
    lessonId: LESSON_ID,
    concept: 'perpendicular-and-symmetry',
    difficulty: 'basic',
    sourceRefs: REF_LEARN_34,
    prompt: [
      'في المثلث $ABC$، النقطة $I$ منتصف $[AB]$، والمستقيم المار بـ $I$ موازياً $(BC)$ يقطع $[AC]$ في $J$. إذا كان $AC = 18\\,\\mathrm{cm}$، فما طول القطعة $[AJ]$ بالسنتيمتر؟',
    ],
    answer: 9,
    tolerance: 0,
    unit: 'cm',
  }),

  /* ---- Q06 · medium · numeric · perpendicular-and-symmetry ------------- */
  numeric({
    id: 'geo-l09-t01-q06',
    lessonId: LESSON_ID,
    concept: 'perpendicular-and-symmetry',
    difficulty: 'medium',
    sourceRefs: REF_CHECK1_35,
    prompt: [
      'في المثلث $ABC$، النقطة $E$ منتصف $[AC]$، والنقطة $F$ من $[BC]$ تحقق $(EF) \\parallel (AB)$. إذا كان $BF = 6.5\\,\\mathrm{cm}$، فما طول الضلع $[BC]$ كاملاً بالسنتيمتر؟',
    ],
    answer: 13,
    tolerance: 0,
    unit: 'cm',
  }),

  /* ---- Q07 · medium · single-choice · proof-and-salim-activity --------- */
  singleChoice({
    id: 'geo-l09-t01-q07',
    lessonId: LESSON_ID,
    concept: 'proof-and-salim-activity',
    difficulty: 'medium',
    sourceRefs: REF_ACTIVITY_34,
    prompt: [
      'في برهان المبرهنة الثانية في المنتصفات (حيث $M$ منتصف $[AB]$ و$N$ منتصف $[AC]$)، بعد استنتاج $(MN) \\parallel (BC)$ من المبرهنة الأولى، ما المسلمة أو الخاصية التي تجزم بأنَّ المستقيم $(d)$ المار بـ $M$ والموازي لـ $(BC)$ ينطبق على $(MN)$؟',
    ],
    choices: [
      { id: 'opt-a', text: 'قطرا متوازي الأضلاع يتقاطعان في منتصفهما' },
      { id: 'opt-b', text: 'العمودان على مستقيم واحد متوازيان' },
      { id: 'opt-c', text: 'التناظر المركزي يحفظ الأطوال والاصطفاف' },
      { id: 'opt-d', text: 'من نقطة معلومة خارج مستقيم يمر مستقيم وحيد يوازي هذا المستقيم' },
    ],
    answer: 'opt-d',
  }),

  /* ---- Q08 · medium · true-false-justify · perpendicular-and-symmetry -- */
  trueFalseJustify({
    id: 'geo-l09-t01-q08',
    lessonId: LESSON_ID,
    concept: 'perpendicular-and-symmetry',
    difficulty: 'medium',
    sourceRefs: REF_CHECK2_35,
    prompt: [
      'ليكن $DEF$ مثلثاً قائماً في $E$، ولتكن $H$ منتصف الضلع $[DE]$، وليكن المستقيم $(HK)$ عمودياً على $(DE)$ ويقطع الوتر $[DF]$ في $K$. احكم على العبارة: «النقطة $K$ هي منتصف $[DF]$»، ثم اختر التعليل الصحيح.',
    ],
    answer: true,
    justification: choicePart({
      id: 'justification',
      prompt: ['ما التعليل الهندسي الكامل الذي يربط المعطيات بالمبرهنة الثانية؟'],
      choices: [
        {
          id: 'why-perp-parallel',
          text: 'لأنَّ $(EF) \\perp (DE)$ و$(HK) \\perp (DE)$ فيكون $(HK) \\parallel (EF)$، وبمروره بمنتصف $[DE]$ يقطع $[DF]$ في منتصفه.',
        },
        {
          id: 'why-equal-legs',
          text: 'لأنَّ كل مثلث قائم يكون متساوي الساقين فتتساوى فيه جميع القطع الداخلية.',
        },
        {
          id: 'why-first-only',
          text: 'لأنَّ المبرهنة الأولى وحدها تفترض مسبقاً أنَّ $K$ منتصف $[DF]$ دون حاجة إلى التعامد.',
        },
      ],
      answer: 'why-perp-parallel',
    }),
  }),

  /* ---- Q09 · medium · fill-in · second-midline-theorem ----------------- */
  fillIn({
    id: 'geo-l09-t01-q09',
    lessonId: LESSON_ID,
    concept: 'second-midline-theorem',
    difficulty: 'medium',
    sourceRefs: REF_LEARN_34,
    prompt: [
      'أكمل نصّ المبرهنة الثانية في المنتصفات بكلمتين دقيقتين: «المستقيم المار بـ (1) ........ أحد أضلاع مثلث و(2) ........ ضلعاً آخر، يقطع الضلع الثالثة في منتصفه».',
    ],
    blanks: [
      fillInBlank({
        id: 'blank-1',
        label: 'الفراغ (1)',
        acceptedAnswers: ['منتصف'],
      }),
      fillInBlank({
        id: 'blank-2',
        label: 'الفراغ (2)',
        acceptedAnswers: ['يوازي', 'موازيا', 'موازياً', 'مواز'],
      }),
    ],
  }),

  /* ---- Q10 · medium · exact · perpendicular-and-symmetry (Category B) -- */
  exact({
    id: 'geo-l09-t01-q10',
    lessonId: LESSON_ID,
    concept: 'perpendicular-and-symmetry',
    difficulty: 'medium',
    sourceRefs: REF_CHECK2_35,
    prompt: [
      q10Figure,
      'في الشكل المرفق، $ABC$ مثلث قائم في $B$، والنقطة $M$ منتصف $[AB]$، والمستقيم $(MN)$ عمودي على $(AB)$ ويقطع الوتر $[AC]$ في $N$. إذا كان $AC = 9\\,\\mathrm{cm}$، فما الطول الدقيق للقطعة $[NC]$ بالسنتيمتر؟ (يُقبل الكسر مثل $9/2$ أو العشري مثل $4.5$).',
    ],
    numerator: 9,
    denominator: 2,
    acceptEquivalentForms: true,
    unit: 'cm',
  }),

  /* ---- Q11 · medium · multi-select · subtriangle-applications ---------- */
  multiSelect({
    id: 'geo-l09-t01-q11',
    lessonId: LESSON_ID,
    concept: 'subtriangle-applications',
    difficulty: 'medium',
    sourceRefs: REF_CHECK1_35,
    prompt: [
      'في المثلث $ABC$، النقطة $E$ منتصف $[AC]$، والنقطة $F$ من $[BC]$ تحقق $(EF) \\parallel (AB)$، وعُلم أنَّ $BC = 10\\,\\mathrm{cm}$، ورُسمت القطعتان الداخليتان $[AF]$ و$[BE]$. اختر جميع الاستنتاجات الصحيحة حتماً:',
    ],
    choices: [
      { id: 'opt-a', text: 'النقطة $F$ هي منتصف الضلع $[BC]$' },
      { id: 'opt-b', text: 'طول كلٍّ من $[BF]$ و$[FC]$ يساوي $5\\,\\mathrm{cm}$' },
      { id: 'opt-c', text: 'العلاقة $BC = 2\\,FC$ محقّقة' },
      { id: 'opt-d', text: 'المستقيمان $(AF)$ و$(BE)$ متوازيان' },
      { id: 'opt-e', text: 'النقطة $F$ هي منتصف الضلع $[AB]$' },
    ],
    answers: ['opt-a', 'opt-b', 'opt-c'],
  }),

  /* ---- Q12 · medium · ordering · proof-and-salim-activity -------------- */
  ordering({
    id: 'geo-l09-t01-q12',
    lessonId: LESSON_ID,
    concept: 'proof-and-salim-activity',
    difficulty: 'medium',
    sourceRefs: REF_ACTIVITY_34,
    prompt: [
      'رتّب الخطوات الأربع الآتية بالترتيب المنطقي الصحيح لبرهان المبرهنة الثانية في المثلث $ABC$ (حيث $M$ منتصف $[AB]$، والمستقيم $(d)$ يمر بـ $M$ موازياً $(BC)$ ويقطع $[AC]$ في $P$):',
    ],
    items: [
      {
        id: 'step-3',
        text: 'بما أنَّ $(d)$ و$(MN)$ يمرّان معاً بالنقطة $M$ ويوازيان $(BC)$، فهما ينطبقان لوحدانية الموازي من نقطة معلومة.',
      },
      {
        id: 'step-1',
        text: 'نعيّن النقطة المساعدة $N$ في منتصف الضلع $[AC]$ ونرسم المستقيم $(MN)$.',
      },
      {
        id: 'step-4',
        text: 'تنطبق نقطة تقاطع $(d)$ مع $[AC]$ على $N$، فتكون $P$ هي منتصف $[AC]$.',
      },
      {
        id: 'step-2',
        text: 'حسب المبرهنة الأولى في المنتصفات نستنتج أنَّ $(MN) \\parallel (BC)$ لأنَّ $M$ و$N$ منتصفا ضلعين في $ABC$.',
      },
    ],
    answerOrder: ['step-1', 'step-2', 'step-3', 'step-4'],
  }),

  /* ---- Q13 · medium · single-choice · subtriangle-applications --------- */
  singleChoice({
    id: 'geo-l09-t01-q13',
    lessonId: LESSON_ID,
    concept: 'subtriangle-applications',
    difficulty: 'medium',
    sourceRefs: REF_PRACTICE1_35,
    prompt: [
      '$IJK$ مثلث، و$S$ هي صورة النقطة $I$ وفق التناظر الذي مركزه $J$. المستقيم المار بالنقطة $S$ موازياً $(JK)$ يلاقي المستقيم $(IK)$ في $T$. ما المثلث الذي نطبّق عليه المبرهنة الثانية في المنتصفات لإثبات أنَّ $K$ منتصف $[IT]$؟',
    ],
    choices: [
      { id: 'opt-a', text: 'المثلث $IST$' },
      { id: 'opt-b', text: 'المثلث $IJK$' },
      { id: 'opt-c', text: 'المثلث $JKS$' },
      { id: 'opt-d', text: 'المثلث $JKT$' },
    ],
    answer: 'opt-a',
  }),

  /* ---- Q14 · advanced · numeric · perpendicular-and-symmetry ----------- */
  numeric({
    id: 'geo-l09-t01-q14',
    lessonId: LESSON_ID,
    concept: 'perpendicular-and-symmetry',
    difficulty: 'advanced',
    sourceRefs: REF_PRACTICE2_35,
    prompt: [
      '$AJP$ مثلث و$C$ منتصف $[AJ]$. نرسم من النقطة $A$ المستقيم الموازي للمستقيم $(CP)$ فيقطع المستقيم $(JP)$ في $M$. إذا كان $JP = 7.5\\,\\mathrm{cm}$، فما طول القطعة $[JM]$ بالسنتيمتر؟',
    ],
    answer: 15,
    tolerance: 0,
    unit: 'cm',
  }),

  /* ---- Q15 · advanced · classification · second-midline-theorem -------- */
  classification({
    id: 'geo-l09-t01-q15',
    lessonId: LESSON_ID,
    concept: 'second-midline-theorem',
    difficulty: 'advanced',
    sourceRefs: REF_BOTH_34_35,
    prompt: ['صنّف كل وضعية هندسية في المثلث $ABC$ ضمن الفئة المنهجية المناسبة لها:'],
    categories: [
      { id: 'cat-first', text: 'تُطبَّق المبرهنة الأولى لإثبات التوازي' },
      { id: 'cat-second', text: 'تُطبَّق المبرهنة الثانية لإثبات المنتصف' },
      { id: 'cat-insufficient', text: 'المعطيات غير كافية لتطبيق أيٍّ منهما' },
    ],
    items: [
      {
        id: 'item-1',
        text: '$M$ منتصف $[AB]$، والمستقيم $(MP)$ يوازي $(BC)$ ويقطع $[AC]$ في $P$ (والمطلوب موقع $P$).',
      },
      {
        id: 'item-2',
        text: '$M$ منتصف $[AB]$ و$N$ منتصف $[AC]$ (والمطلوب وضع $(MN)$ بالنسبة إلى $(BC)$).',
      },
      {
        id: 'item-3',
        text: '$M$ نقطة من $[AB]$ تحقق $AM = 3\\,\\mathrm{cm}$ و$MB = 5\\,\\mathrm{cm}$، و$(MP) \\parallel (BC)$.',
      },
      {
        id: 'item-4',
        text: '$ABC$ قائم في $B$، و$M$ منتصف $[AB]$، و$(MN) \\perp (AB)$ يقطع $[AC]$ في $N$ (بعد استنتاج التوازي).',
      },
    ],
    assignment: {
      'item-1': 'cat-second',
      'item-2': 'cat-first',
      'item-3': 'cat-insufficient',
      'item-4': 'cat-second',
    },
  }),

  /* ---- Q16 · advanced · matching · subtriangle-applications (Cat. A) --- */
  matching({
    id: 'geo-l09-t01-q16',
    lessonId: LESSON_ID,
    concept: 'subtriangle-applications',
    difficulty: 'advanced',
    sourceRefs: REF_KNOWLEDGE_35,
    prompt: [
      q16Figure,
      'في الشكل المرفق، $ABC$ مثلث، و$M$ نقطة من $[BC]$ ليست منتصفه، و$R$ منتصف القطعة $[AM]$. إذا رُسم من $R$ المستقيم الموازي لـ $(BC)$ فقطع $[AB]$ في $S$ وقطع $[AC]$ في $T$، فطابق كل عنصر في العمود الأول بما يناسبه في العمود الثاني:',
    ],
    left: [
      { id: 'l-s', text: 'موقع النقطة $S$ على الضلع $[AB]$' },
      { id: 'l-t', text: 'موقع النقطة $T$ على الضلع $[AC]$' },
      { id: 'l-amb', text: 'المثلث الذي نطبّق عليه المبرهنة الثانية لإثبات موقع $S$' },
      { id: 'l-amc', text: 'المثلث الذي نطبّق عليه المبرهنة الثانية لإثبات موقع $T$' },
    ],
    right: [
      { id: 'r-amc', text: 'المثلث $AMC$' },
      { id: 'r-mid-ab', text: 'منتصف الضلع $[AB]$' },
      { id: 'r-amb', text: 'المثلث $AMB$' },
      { id: 'r-mid-ac', text: 'منتصف الضلع $[AC]$' },
    ],
    pairs: {
      'l-s': 'r-mid-ab',
      'l-t': 'r-mid-ac',
      'l-amb': 'r-amb',
      'l-amc': 'r-amc',
    },
  }),

  /* ---- Q17 · advanced · matching · subtriangle-applications ------------ */
  matching({
    id: 'geo-l09-t01-q17',
    lessonId: LESSON_ID,
    concept: 'subtriangle-applications',
    difficulty: 'advanced',
    sourceRefs: REF_BOTH_34_35,
    prompt: [
      'طابق كل وضعية من وضعيات الدرس بالمثلث الدقيق الذي تُطبَّق عليه المبرهنة الثانية في المنتصفات مباشرةً:',
    ],
    left: [
      {
        id: 'case-1',
        text: '$ABC$ مثلث، $M \\in [BC]$، $R$ منتصف $[AM]$، و$(RS) \\parallel (BC)$ يقطع $[AB]$ في $S$.',
      },
      {
        id: 'case-2',
        text: '$IJK$ مثلث، $S$ نظيرة $I$ بالنسبة إلى $J$، والموازي لـ $(JK)$ من $S$ يقطع $(IK)$ في $T$.',
      },
      {
        id: 'case-3',
        text: '$AJP$ مثلث، $C$ منتصف $[AJ]$، والموازي لـ $(CP)$ من $A$ يقطع $(JP)$ في $M$.',
      },
    ],
    right: [
      { id: 'tri-jam', text: 'المثلث $JAM$' },
      { id: 'tri-abc', text: 'المثلث $ABC$' },
      { id: 'tri-amb', text: 'المثلث $AMB$' },
      { id: 'tri-ist', text: 'المثلث $IST$' },
    ],
    pairs: {
      'case-1': 'tri-amb',
      'case-2': 'tri-ist',
      'case-3': 'tri-jam',
    },
  }),

  /* ---- Q18 · advanced · multi-select · proof-and-salim-activity -------- */
  multiSelect({
    id: 'geo-l09-t01-q18',
    lessonId: LESSON_ID,
    concept: 'proof-and-salim-activity',
    difficulty: 'advanced',
    sourceRefs: REF_BOTH_34_35,
    prompt: [
      'بحسب ما ورد في الدرس وإرشاداته المنهجية، أيُّ الطرائق الآتية صالحة هندسياً لإثبات أنَّ نقطةً هي منتصف قطعة مستقيمة (عند توافر معطياتها)؟ اختر جميع الإجابات الصحيحة:',
    ],
    choices: [
      {
        id: 'opt-a',
        text: 'تطبيق المبرهنة الثانية في المنتصفات عند مرور مستقيم بمنتصف ضلع في مثلث موازياً ضلعاً آخر',
      },
      {
        id: 'opt-b',
        text: 'استعمال خاصية تناصف قطري متوازي الأضلاع عندما تكون القطعة أحد القطرين',
      },
      {
        id: 'opt-c',
        text: 'الاستناد إلى تعريف التناظر المركزي عندما يكون أحد طرفي القطعة صورة الطرف الآخر بالنسبة إلى تلك النقطة',
      },
      {
        id: 'opt-d',
        text: 'الاكتفاء برسم تقريبي باليد الحرة وملاحظة تقارب الجزأين بالعين',
      },
      {
        id: 'opt-e',
        text: 'مجرد توازي مستقيم مع ضلع في المثلث من دون مروره بمنتصف ضلع آخر',
      },
    ],
    answers: ['opt-a', 'opt-b', 'opt-c'],
  }),

  /* ---- Q19 · thinking · error-analysis · subtriangle-applications ------ */
  errorAnalysis({
    id: 'geo-l09-t01-q19',
    lessonId: LESSON_ID,
    concept: 'subtriangle-applications',
    difficulty: 'thinking',
    sourceRefs: REF_KNOWLEDGE_35,
    prompt: [
      'كتب تلميذ البرهان الآتي لحل مسألة «$ABC$ مثلث، $M$ نقطة من $[BC]$ ليست منتصفه، و$R$ منتصف $[AM]$، والمستقيم $(SR)$ يمر بـ $R$ موازياً $(BC)$ ويقطع $[AB]$ في $S$. أثبت أنَّ $S$ منتصف $[AB]$». حدّد الخطوة الخاطئة وتصويبها وسبب الخطأ:',
    ],
    steps: [
      {
        id: 'step-1',
        text: 'الخطوة 1: من الفرض لدينا $R$ منتصف القطعة $[AM]$، والمستقيم $(SR)$ يوازي $(BC)$.',
      },
      {
        id: 'step-2',
        text: 'الخطوة 2: بما أنَّ $M$ تنتمي إلى $[BC]$ (و$M \\neq B$)، فالمستقيم $(BM)$ منطبق على $(BC)$، ومنه $(SR) \\parallel (BM)$.',
      },
      {
        id: 'step-3',
        text: 'الخطوة 3: نطبّق المبرهنة الثانية في المنتصفات على المثلث $ABC$ لأنَّ $(SR)$ يمر بمنتصف ضلعه $[AM]$ ويوازي $[BC]$، فنستنتج أنَّ $S$ منتصف $[AB]$.',
      },
    ],
    choices: [
      { id: 'ch-s1', text: 'الخطأ في الخطوة 1' },
      { id: 'ch-s2', text: 'الخطأ في الخطوة 2' },
      { id: 'ch-s3', text: 'الخطأ في الخطوة 3' },
    ],
    answer: 'ch-s3',
    correction: choicePart({
      id: 'correction',
      prompt: ['ما التصويب السليم للخطوة الخاطئة؟'],
      choices: [
        {
          id: 'fix-amb',
          text: 'نطبّق المبرهنة الثانية في المنتصفات على المثلث $AMB$ حيث $R$ منتصف $[AM]$ و$(SR) \\parallel (BM)$، فيقطع الضلع الثالث $[AB]$ في منتصفه $S$.',
        },
        {
          id: 'fix-amc',
          text: 'نطبّق المبرهنة الثانية على المثلث $AMC$ لاستنتاج أنَّ $S$ منتصف $[AB]$.',
        },
        {
          id: 'fix-first',
          text: 'نبقي المثلث $ABC$ ونستبدل المبرهنة الثانية بالمبرهنة الأولى فقط.',
        },
      ],
      answer: 'fix-amb',
    }),
    justification: choicePart({
      id: 'justification',
      prompt: ['لماذا تُعدّ الخطوة المختارة خاطئة هندسياً؟'],
      choices: [
        {
          id: 'why-not-side',
          text: 'لأنَّ القطعة $[AM]$ قطعة داخلية وليست ضلعاً من أضلاع المثلث $ABC$، بينما هي ضلع في المثلث $AMB$.',
        },
        {
          id: 'why-m-mid',
          text: 'لأنَّ النقطة $M$ منتصف $[BC]$ دائماً في كل مثلث.',
        },
        {
          id: 'why-right-only',
          text: 'لأنَّ المبرهنة الثانية لا تصحّ إلا في المثلث القائم.',
        },
      ],
      answer: 'why-not-side',
    }),
  }),

  /* ---- Q20 · thinking · single-choice · subtriangle-applications ------- */
  singleChoice({
    id: 'geo-l09-t01-q20',
    lessonId: LESSON_ID,
    concept: 'subtriangle-applications',
    difficulty: 'thinking',
    sourceRefs: REF_BOTH_34_35,
    prompt: [
      'في مثلث كيفي $ABC$، عُيّنت $D$ منتصف $[AB]$. رُسم من $D$ مستقيم يوازي $(BC)$ فقطع $[AC]$ في $E$، ثم رُسم من $E$ مستقيم يوازي $(AB)$ فقطع $[BC]$ في $F$. استناداً إلى المبرهنة الثانية في المنتصفات، ما الوصف الدقيق لموقع النقطة $F$؟',
    ],
    choices: [
      { id: 'opt-a', text: 'النقطة $F$ تنطبق دائماً على الرأس $B$' },
      { id: 'opt-b', text: 'لا يتحدّد موقع $F$ إلا إذا عُرفت أطوال أضلاع المثلث $ABC$ الثلاثة' },
      { id: 'opt-c', text: 'النقطة $F$ هي منتصف الضلع $[BC]$' },
      { id: 'opt-d', text: 'تقع $F$ في منتصف $[BC]$ فقط إذا كان المثلث $ABC$ متساوي الساقين' },
    ],
    answer: 'opt-c',
  }),
];
