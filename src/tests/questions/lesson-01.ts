import {
  choicePart,
  classification,
  diagramReading,
  errorAnalysis,
  exact,
  figureBlock,
  fillIn,
  fillInBlank,
  justification,
  matching,
  multiSelect,
  numeric,
  ordering,
  singleChoice,
  testFigure,
  transformationApplication,
  trueFalse,
  trueFalseJustify,
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
 *      • properties (خواص حفظ الأطوال والزوايا والمساحات والاستقامة): 7
 *      • non-translation (تمييز ما ليس انسحاباً والتركيب): 4
 *    Types:
 *      • single-choice:              4  (q01, q03, q10, q17)
 *      • true-false:                 1  (q09)
 *      • true-false-justify:         2  (q02, q20)
 *      • multi-select:               2  (q07, q18)
 *      • fill-in:                    1  (q05)
 *      • numeric:                    2  (q04, q08)
 *      • exact:                      1  (q14)
 *      • diagram-reading:            1  (q06 — figure required)
 *      • transformation-application: 1  (q15 — grid figure)
 *      • matching:                   1  (q11)
 *      • ordering:                   1  (q13)
 *      • classification:             1  (q12)
 *      • justification:              1  (q19)
 *      • error-analysis:             1  (q16)
 *
 *  SOURCE FIDELITY & ORIGINALITY
 *  -----------------------------
 *  • Every question is ANCHORED to real pages 5, 6, and 7 of the textbook.
 *  • Every question is ORIGINAL: none copies or paraphrases the textbook's
 *    exercises or the in-lesson assessments.
 *  • All mathematical relationships are exact; figures use exact coordinates
 *    so the drawing can never contradict the stem (see testFigureSpec.ts).
 *  • Source-verified facts used here (docs/LESSON-01-COVERAGE.md):
 *      – p.5: the pavement activity — one fixed direction, one fixed distance.
 *      – p.6: definition (A goes to B ⇒ every point moves alike) and the
 *        printed relations MM' = NN' = AB, (MM') ∥ (AB), (NN') ∥ (AB).
 *      – p.6: the four preserved properties — lengths, collinearity, angle
 *        measures, areas.
 *      – p.7: «تحقق» panel ③ — a reflected (flipped) orientation is NOT a
 *        translation image.
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
  trueFalseJustify({
    id: 'geo-l01-t01-q02',
    lessonId: LESSON_ID,
    concept: 'direction-distance',
    difficulty: 'basic',
    prompt: [
      'إذا نقل انسحاب النقطة $A$ إلى النقطة $B$، فإن النقطة $B$ تعود إلى النقطة $A$ وفق الانسحاب ذاته.',
    ],
    answer: false,
    correction: choicePart({
      id: 'correction',
      prompt: ['اختر العبارة الصحيحة:'],
      choices: [
        {
          id: 'fix-a',
          text: 'وفق الانسحاب ذاته تنتقل $B$ أبعد في الاتجاه نفسه، أما الانسحاب الذي يعيد $B$ إلى $A$ فهو انسحاب معاكس في الاتجاه.',
        },
        {
          id: 'fix-b',
          text: 'الانسحاب ذاته ينقل $B$ إلى $A$ لأن المسافة $AB$ تساوي المسافة $BA$.',
        },
        { id: 'fix-c', text: 'لا يمكن لأي انسحاب أن ينقل النقطة $B$ إطلاقاً.' },
      ],
      answer: 'fix-a',
    }),
    justification: choicePart({
      id: 'justification',
      prompt: ['لماذا العبارة الأصلية خاطئة؟'],
      choices: [
        {
          id: 'why-a',
          text: 'لأن الانسحاب يتحدد بالاتجاه والمسافة معاً، والاتجاه من $B$ إلى $A$ يعاكس اتجاه الانسحاب المعطى.',
        },
        { id: 'why-b', text: 'لأن المسافة من $B$ إلى $A$ أكبر من المسافة من $A$ إلى $B$.' },
        { id: 'why-c', text: 'لأن الانسحاب يؤثر في نقطة البداية فقط دون بقية النقاط.' },
      ],
      answer: 'why-a',
    }),
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
  fillIn({
    id: 'geo-l01-t01-q05',
    lessonId: LESSON_ID,
    concept: 'properties',
    difficulty: 'basic',
    prompt: [
      'أكمل كل فراغ باسم الخاصية المحفوظة المناسبة، وفق خواص الانسحاب الأربع كما وردت في الكتاب المدرسي:',
    ],
    blanks: [
      fillInBlank({
        id: 'b-lengths',
        label:
          "الخاصية الأولى: يحافظ الانسحاب على … ؛ فطول القطعة $[MN]$ يساوي طول صورتها $[M'N']$.",
        acceptedAnswers: ['الأطوال', 'أطوال', 'الطول', 'طول'],
      }),
      fillInBlank({
        id: 'b-collinearity',
        label:
          'الخاصية الثانية: يحافظ الانسحاب على … ؛ فإذا كانت ثلاث نقاط على استقامة واحدة فإن صورها تبقى على استقامة واحدة.',
        acceptedAnswers: ['الاستقامة', 'استقامة', 'استقامة النقاط'],
      }),
      fillInBlank({
        id: 'b-angles',
        label: 'الخاصية الثالثة: يحافظ الانسحاب على … ؛ فصورة الزاوية زاوية لها القياس نفسه.',
        acceptedAnswers: ['قياس الزوايا', 'قياسات الزوايا', 'قياس الزاوية', 'الزوايا', 'زوايا'],
      }),
      fillInBlank({
        id: 'b-areas',
        label: 'الخاصية الرابعة: يحافظ الانسحاب على … ؛ فمساحة الشكل تساوي مساحة صورته.',
        acceptedAnswers: ['المساحات', 'مساحات', 'المساحة', 'مساحة'],
      }),
    ],
    sourceRefs: [P6],
  }),

  /* ------------------------------------------------------------------ 06 */
  diagramReading({
    id: 'geo-l01-t01-q06',
    lessonId: LESSON_ID,
    concept: 'direction-distance',
    difficulty: 'medium',
    prompt: [
      "في الشكل، انسحاب ينقل النقطة $A$ إلى النقطة $B$، والنقطة $M'$ هي صورة النقطة $M$، والنقطة $N'$ هي صورة النقطة $N$. العلامات المتماثلة على الأسهم الثلاثة تعني أن المسارات الثلاثة متساوية في الطول. اقرأ الشكل ثم أجب عن كل جزء:",
      figureBlock(
        testFigure({
          id: 'test-l01-q06-paths-of-translation',
          alt: "شكل يمثّل انسحاباً ينقل $A$ إلى $B$: سهم من $M$ إلى $M'$ وسهم من $N$ إلى $N'$، والعلامات المتماثلة على المسارات الثلاثة تعني تساوي أطوالها، والقطعة $[MN]$ وصورتها $[M'N']$ مرسومتان دون علامات.",
          caption:
            'رسم من إعداد المنصّة: المسارات مرسومة كأسهم، والعلامات المتماثلة هي المعطى الوحيد عن الأطوال.',
          sourceRefs: [P6],
          spec: {
            points: [
              { id: 'A', x: 0, y: 0, labelSide: 'sw' },
              { id: 'B', x: 4, y: 1, labelSide: 'ne' },
              { id: 'M', x: 1, y: 3, labelSide: 'nw' },
              { id: 'M-prime', label: 'M′', x: 5, y: 4, labelSide: 'n' },
              { id: 'N', x: 6, y: 2, labelSide: 's' },
              { id: 'N-prime', label: 'N′', x: 10, y: 3, labelSide: 'se' },
            ],
            segments: [
              { from: 'A', to: 'B', arrow: 'end', ticks: 1 },
              { from: 'M', to: 'M-prime', arrow: 'end', ticks: 1 },
              { from: 'N', to: 'N-prime', arrow: 'end', ticks: 1 },
              { from: 'M', to: 'N' },
              { from: 'M-prime', to: 'N-prime' },
            ],
            questionLabels: ['A', 'B', 'M', 'N', 'M′', 'N′'],
          },
        }),
      ),
    ],
    parts: [
      {
        id: 'part-length',
        type: 'single-choice',
        prompt: [{ type: 'paragraph', text: "إلى ماذا يساوي طول المسار $[MM']$؟" }],
        choices: [
          { id: 'len-ab', text: 'طول القطعة $[AB]$' },
          { id: 'len-mn', text: 'طول القطعة $[MN]$' },
          { id: 'len-mnp', text: "طول القطعة $[M'N']$" },
        ],
        answerId: 'len-ab',
      },
      {
        id: 'part-position',
        type: 'single-choice',
        prompt: [
          { type: 'paragraph', text: "ما الوضع النسبي بين المستقيم $(NN')$ والمستقيم $(AB)$؟" },
        ],
        choices: [
          { id: 'pos-parallel', text: 'متوازيان' },
          { id: 'pos-perp', text: 'متعامدان' },
          { id: 'pos-secant', text: 'متقاطعان في نقطة واحدة' },
        ],
        answerId: 'pos-parallel',
      },
      {
        id: 'part-equal-paths',
        type: 'true-false',
        prompt: [{ type: 'paragraph', text: "بحسب العلامات المعطاة في الشكل: $MM' = NN'$." }],
        answer: true,
      },
    ],
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
      figureBlock(
        testFigure({
          id: 'test-l01-q07-right-triangle',
          alt: 'مثلث قائم $ABC$ زاويته القائمة في $A$، طول $[AB]$ هو $6\\ \\mathrm{cm}$ وطول $[AC]$ هو $8\\ \\mathrm{cm}$ وطول الوتر $[BC]$ هو $10\\ \\mathrm{cm}$.',
          caption: 'رسم من إعداد المنصّة: المثلث الأصلي بمعطياته فقط، دون رسم صورته.',
          sourceRefs: [P6],
          spec: {
            points: [
              { id: 'A', x: 0, y: 0, labelSide: 'sw' },
              { id: 'B', x: 6, y: 0, labelSide: 'se' },
              { id: 'C', x: 0, y: 8, labelSide: 'nw' },
            ],
            polygons: [{ points: ['A', 'B', 'C'], fill: true }],
            rightAngles: [{ at: 'A', from: 'B', to: 'C' }],
            annotations: [
              { x: 3, y: -0.75, text: '6 cm' },
              { x: -0.9, y: 4, text: '8 cm', anchor: 'end' },
              { x: 3.6, y: 4.5, text: '10 cm' },
            ],
            questionLabels: ['A', 'B', 'C'],
          },
        }),
      ),
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
      figureBlock(
        testFigure({
          id: 'test-l01-q10-triangle-orientations',
          alt: 'مثلثان متطابقان بهيئتين مختلفتي الاتجاه على الصفحة، من دون علامات قياس.',
          caption:
            'هيئتان مثلثيتان تخطيطيتان غير مقيّستين وباتجاهين مختلفين؛ لا توجد أبعاد أو زوايا مقاسة.',
          sourceRefs: [P6, P7],
          spec: {
            points: [
              { id: 't1-a', x: 0, y: 0, showLabel: false, mark: 'none' },
              { id: 't1-b', x: 3, y: 0, showLabel: false, mark: 'none' },
              { id: 't1-c', x: 1, y: 2, showLabel: false, mark: 'none' },
              { id: 't2-a', x: 7, y: 0, showLabel: false, mark: 'none' },
              {
                id: 't2-b',
                x: 7 + 3 / Math.sqrt(2),
                y: 3 / Math.sqrt(2),
                showLabel: false,
                mark: 'none',
              },
              {
                id: 't2-c',
                x: 7 - 1 / Math.sqrt(2),
                y: 3 / Math.sqrt(2),
                showLabel: false,
                mark: 'none',
              },
            ],
            polygons: [{ points: ['t1-a', 't1-b', 't1-c'] }, { points: ['t2-a', 't2-b', 't2-c'] }],
            annotations: [
              { x: 1.3, y: -0.65, text: 'T₁' },
              { x: 7.65, y: -0.65, text: 'T₂' },
            ],
            questionLabels: [],
          },
        }),
      ),
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
  transformationApplication({
    id: 'geo-l01-t01-q15',
    lessonId: LESSON_ID,
    concept: 'direction-distance',
    difficulty: 'advanced',
    prompt: [
      'على شبكة مربعات مرسومٌ الانسحابان $T_1$ و$T_2$: الأول ينقل أي نقطة $(x, y)$ إلى $(x + 4, y + 2)$، والثاني ينقل أي نقطة $(x, y)$ إلى $(x - 1, y + 3)$، وكل سهم في الشكل يحدد اتجاه الانسحاب ومسافته. النقطة $M(2, 1)$ مرسومة على الشبكة ولم تُرسم أي صورة لها. ليكن $M_1$ صورة $M$ وفق $T_1$ و$M_2$ صورة $M_1$ وفق $T_2$. طبّق الانسحابين ثم أجب عن كل جزء:',
      figureBlock(
        testFigure({
          id: 'test-l01-q15-composed-translations-grid',
          alt: 'شبكة إحداثية مربعة عليها النقطة $M$ وإحداثياها $(2, 1)$، وسهمان يصدران من نقطة واحدة: أولهما يمثّل الانسحاب $T_1$ وثانيهما يمثّل الانسحاب $T_2$، ولم تُرسم أي صورة للنقطة $M$.',
          caption: 'رسم من إعداد المنصّة: كل سهم يحدد اتجاه الانسحاب ومسافته فقط.',
          sourceRefs: [P5, P6],
          spec: {
            grid: { minX: -2, maxX: 5, minY: -1, maxY: 4 },
            points: [
              { id: 'O', x: 0, y: 0, showLabel: false, mark: 'none' },
              { id: 'v1', x: 4, y: 2, showLabel: false, mark: 'none' },
              { id: 'v2', x: -1, y: 3, showLabel: false, mark: 'none' },
              { id: 'M', x: 2, y: 1, mark: 'dot', labelSide: 'se' },
            ],
            segments: [
              { from: 'O', to: 'v1', arrow: 'end' },
              { from: 'O', to: 'v2', arrow: 'end' },
            ],
            annotations: [
              { x: 4.35, y: 2.3, text: 'T₁', anchor: 'start' },
              { x: -1.35, y: 3.3, text: 'T₂', anchor: 'end' },
            ],
            questionLabels: ['M'],
          },
        }),
      ),
    ],
    parts: [
      {
        id: 'p-x1',
        type: 'numeric',
        prompt: [{ type: 'paragraph', text: 'سينا النقطة $M_1$ (صورة $M$ وفق $T_1$):' }],
        answer: 6,
        tolerance: 0,
      },
      {
        id: 'p-y1',
        type: 'numeric',
        prompt: [{ type: 'paragraph', text: 'صاد النقطة $M_1$:' }],
        answer: 3,
        tolerance: 0,
      },
      {
        id: 'p-x2',
        type: 'numeric',
        prompt: [{ type: 'paragraph', text: 'سينا النقطة $M_2$ (صورة $M_1$ وفق $T_2$):' }],
        answer: 5,
        tolerance: 0,
      },
      {
        id: 'p-y2',
        type: 'numeric',
        prompt: [{ type: 'paragraph', text: 'صاد النقطة $M_2$:' }],
        answer: 6,
        tolerance: 0,
      },
    ],
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
        text: "الخطوة 2: قسنا الزوايا فوجدنا قياس كل زاوية في $T$ يساوي قياس نظيرتها في $T'.$",
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
    correction: choicePart({
      id: 'correction',
      prompt: ['اختر العبارة التي تصحّح الحل المعروض:'],
      choices: [
        {
          id: 'fix-a',
          text: 'حفظ الأطوال والزوايا شرط لازم للانسحاب لكنه غير كافٍ؛ يجب فحص بقاء اتجاه الشكل وتوازي كل ضلع مع نظيره.',
        },
        { id: 'fix-b', text: 'يكفي قياس الأطوال وحدها للحكم بأن الحركة انسحاب.' },
        { id: 'fix-c', text: 'يكفي قياس الزوايا وحدها للحكم بأن الحركة انسحاب.' },
      ],
      answer: 'fix-a',
    }),
    justification: choicePart({
      id: 'justification',
      prompt: ['لماذا لا يكفي حفظ الأطوال والزوايا للحكم بأن الحركة انسحاب؟'],
      choices: [
        {
          id: 'why-a',
          text: 'لأن الدوران والتناظر المحوري يحفظان الأطوال والزوايا أيضاً، ومع ذلك فليسا انسحاباً.',
        },
        { id: 'why-b', text: 'لأن الأطوال تتغير في الدوران.' },
        { id: 'why-c', text: 'لأن قياسات الزوايا لا تُحفظ في التناظر المحوري.' },
      ],
      answer: 'why-a',
    }),
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
  justification({
    id: 'geo-l01-t01-q19',
    lessonId: LESSON_ID,
    concept: 'non-translation',
    difficulty: 'thinking',
    prompt: [
      'ادّعى تلميذ: «إذا كان للشكلين $F_1$ و$F_2$ المساحة نفسها والمحيط نفسه، فإنه يوجد دائماً انسحاب ينقل أحدهما إلى الآخر». أكمل خطوات التبرير الآتية لتقويم هذا الادعاء:',
    ],
    steps: [
      choicePart({
        id: 'step-premise',
        prompt: ['أولاً: هل يضمن تساوي المساحة والمحيط أن يكون الشكلان متطابقين؟'],
        choices: [
          {
            id: 'premise-a',
            text: 'نعم؛ فتساوي المساحة والمحيط يفرض تساوي جميع الأضلاع والزوايا.',
          },
          {
            id: 'premise-b',
            text: 'لا؛ فقد يتساوى شكلان في المساحة والمحيط مع اختلاف أطوال الأضلاع أو قياسات الزوايا.',
          },
        ],
        answer: 'premise-b',
      }),
      choicePart({
        id: 'step-orientation',
        prompt: [
          'ثانياً: إذا كان الشكلان متطابقين، فهل يلزم أن يوجد انسحاب ينقل أحدهما إلى الآخر؟',
        ],
        choices: [
          {
            id: 'orient-a',
            text: 'نعم؛ فالتطابق يعني تساوي الأطوال والزوايا، وهذا وحده يكفي لوجود الانسحاب.',
          },
          {
            id: 'orient-b',
            text: 'لا؛ فقد يختلف اتجاه الشكلين بدوران أو قلب، والانسحاب يشترط بقاء الاتجاه وتوازي كل ضلع مع نظيره.',
          },
        ],
        answer: 'orient-b',
      }),
      choicePart({
        id: 'step-verdict',
        prompt: ['الخلاصة: ما الحكم النهائي على ادعاء التلميذ؟'],
        choices: [
          {
            id: 'verdict-a',
            text: 'الادعاء خاطئ: تساوي المساحة والمحيط لا يضمن التطابق، وحتى مع التطابق يشترط بقاء اتجاه الشكل لوجود انسحاب.',
          },
          { id: 'verdict-b', text: 'الادعاء صحيح بالنسبة إلى المضلعات فقط.' },
          { id: 'verdict-c', text: 'الادعاء صحيح لأن الانسحاب يحفظ المساحات والمحيطات.' },
        ],
        answer: 'verdict-a',
      }),
    ],
    sourceRefs: [P6, P7],
  }),

  /* ------------------------------------------------------------------ 20 */
  trueFalseJustify({
    id: 'geo-l01-t01-q20',
    lessonId: LESSON_ID,
    concept: 'definition',
    difficulty: 'thinking',
    prompt: [
      "نقلت حركة مستوية مجهولة نقطتين متمايزتين $A$ و$B$ إلى $A'$ و$B'$ على الترتيب، ووُجد أن $A'B' = AB$ وأن $(A'B') \\parallel (AB)$. هل تكفي هذه المعطيات وحدها للجزم بأن الحركة انسحاب لكامل المستوي؟",
    ],
    answer: false,
    correction: choicePart({
      id: 'correction',
      prompt: ['اختر العبارة الصحيحة:'],
      choices: [
        {
          id: 'fix-a',
          text: 'لا تكفي نقطتان وحدهما؛ فقد تنطبق هاتان العلاقتان على حركة أخرى غير الانسحاب، ويُحسم الأمر بفحص صورة نقطة ثالثة ليست على المستقيم $(AB)$ أو بالتحقق من بقاء اتجاه الأشكال.',
        },
        { id: 'fix-b', text: 'تكفي نقطتان دائماً لأن تعريف الانسحاب يُقرأ من نقطتين.' },
        { id: 'fix-c', text: 'لا تكفي ثلاث نقاط أبداً مهما كانت، فلا سبيل إلى الجزم بأي حركة.' },
      ],
      answer: 'fix-a',
    }),
    justification: choicePart({
      id: 'justification',
      prompt: ['أي مثال مضاد يبيّن أن هاتين العلاقتين لا تكفيان؟'],
      choices: [
        {
          id: 'why-a',
          text: 'الانعكاس حول محور يوازي المستقيم $(AB)$: ينقل $A$ و$B$ إلى نقطتين قطعتهما مساوية لـ $[AB]$ وموازية له، ومع ذلك فهو قلبٌ وليس انسحاباً.',
        },
        {
          id: 'why-b',
          text: 'الدوران بزاوية $360^\\circ$ حول منتصف $[AB]$: فهو يحرّك كل نقطة ثم يعيدها، لذلك يناقض الانسحاب.',
        },
        {
          id: 'why-c',
          text: 'لا يوجد مثال مضاد: فحفظ الطول والتوازي بين نقطتين هو تعريف الانسحاب نفسه.',
        },
      ],
      answer: 'why-a',
    }),
    sourceRefs: [P6, P7],
  }),
];
