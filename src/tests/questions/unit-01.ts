import {
  classification,
  exact,
  errorAnalysis,
  figureBlock,
  fillIn,
  fillInBlank,
  matching,
  multiPart,
  multiSelect,
  numeric,
  ordering,
  paragraph,
  shortAnswer,
  singleChoice,
  testFigure,
  transformationApplication,
  trueFalse,
  trueFalseJustify,
  choicePart,
  diagramReading,
  justification,
} from '../authoring';
import { compassIntersectionFigure } from '../figureScenes';
import type { TestQuestionInput } from '../schema';

/**
 * ============================================================================
 *  BANK — UNIT 1 «متوازيات الأضلاع والانسحاب» (UNIT TEST, 60 questions)
 * ============================================================================
 *
 *  BLUEPRINT — the single source of truth is `src/tests/definitions/unit-01.ts`;
 *  the tables below restate it and are asserted by
 *  `src/tests/unit01-detailed.test.tsx`.
 *
 *    Total questions: 60            Engine maximum: 100 points
 *    Concepts (12 questions / 20 points each):
 *      • u1-translation-properties   (Lessons 1 · pages 5–7)
 *      • u1-image-point              (Lesson 2 · pages 8–10)
 *      • u1-image-shape              (Lesson 3 · pages 11–16)
 *      • u1-triangle-congruence      (Lesson 4 · pages 17–19)
 *      • u1-integration              (original synthesis, two lessons each)
 *
 *    Difficulty — basic 14 · medium 22 · advanced 18 · thinking 6
 *
 *    Point weights are the ONLY weights the scoring engine can produce:
 *      one point   — single-choice, multi-select, true-false, numeric, exact,
 *                    fill-in, short-answer, classification (all-or-nothing)
 *      three points — true-false-justify (verdict + correction/reason),
 *                    error-analysis (location + correction + reason),
 *                    ordering (three ordered steps),
 *                    matching (three pairs),
 *                    justification (three scored steps),
 *                    multi-part / diagram-reading / transformation-application
 *                    (three scored parts)
 *    Twenty composite questions × 3 + forty single-point questions = 100.
 *
 *  CONTENT RULES
 *    • The 28 printed unit exercises (Lessons 5–7) are NOT part of this bank.
 *      Every item below is platform-authored for the unit test.
 *    • No item is copied from a lesson test: the `u1-integration` items combine
 *      concepts from two different lessons, which no lesson bank can do.
 *    • Source pages stay inside the verified 5–19 range; the old 20–23 claims
 *      (the exercise lessons print no page numbers in the supplied sources)
 *      were removed.
 *    • Only the three visually audited figures remain: q19 (A), q37 (A),
 *      q38 (B). Everything else is deliberately text-only, exactly as
 *      `src/tests/visualAudit.ts` records.
 * ============================================================================
 */

const L1 = 'lesson-01-translation-and-properties';
const L2 = 'lesson-02-image-of-a-point';
const L3 = 'lesson-03-image-of-a-shape';
const L4 = 'lesson-04-triangle-congruence';

/* Verified textbook pages only. Lessons 5–7 print no page numbers. */
const P5 = { page: 5, locator: 'نشاط الترصيف — الانسحاب والاتجاه والمسافة' };
const P6 = { page: 6, locator: 'تعلّم — مفهوم الانسحاب وخواص الحفظ' };
const P7 = { page: 7, locator: 'تحقّق — الانعكاس ليس انسحاباً' };
const P8 = { page: 8, locator: 'تعلّم — صورة نقطة ومتوازي الأضلاع ABM′M' };
const P9 = { page: 9, locator: 'الحالة الخاصة والإنشاء بالفرجار' };
const P10 = { page: 10, locator: 'تحقّق وتدرّب — تطبيقات على الشبكة' };
const P11 = { page: 11, locator: 'نشاط التخمين — صورة المستقيم' };
const P12 = { page: 12, locator: 'تعلّم — إنشاء صورة مستقيم' };
const P13 = { page: 13, locator: 'المستقيمان المتوازيان والمتعامدان وصورة قطعة' };
const P14 = { page: 14, locator: 'صورة نصف مستقيم ودائرة' };
const P15 = { page: 15, locator: 'مثال المربع وتحقق من فهمك' };
const P16 = { page: 16, locator: 'تدرّب — تطبيقات على صورة الشكل' };
const P17 = { page: 17, locator: 'الحالة الأولى لتطابق المثلثين' };
const P18 = { page: 18, locator: 'الحالتان الثانية والثالثة والأمثلة المحلولة' };
const P19 = { page: 19, locator: 'الطائرة الورقية وحالتا تطابق المثلثين القائمين' };

export const questions: TestQuestionInput[] = [
  /* =======================================================================
   * CONCEPT 1 — Lesson 1: «الانسحاب وخواصه» (q01–q12 · 20 points)
   * ===================================================================== */
  singleChoice({
    id: 'geo-u01-t01-q01',
    lessonId: L1,
    concept: 'u1-translation-properties',
    difficulty: 'basic',
    prompt: ['أيُّ العبارات الآتية يصف الانسحاب وصفاً دقيقاً وكاملاً؟'],
    choices: [
      {
        id: 'a',
        text: 'تحويل ينقل كل نقطة من المستوي في الاتجاه نفسه وبالمسافة نفسها.',
      },
      {
        id: 'b',
        text: 'تحويل ينقل كل نقطة مسافة واحدة لكن في اتجاهات مختلفة بحسب موقعها.',
      },
      {
        id: 'c',
        text: 'تحويل يدير الشكل حول نقطة ثابتة بزاوية معيّنة.',
      },
      {
        id: 'd',
        text: 'تحويل يعكس الشكل بالنسبة إلى مستقيم ثابت.',
      },
    ],
    answer: 'a',
    sourceRefs: [P5, P6],
  }),

  trueFalse({
    id: 'geo-u01-t01-q02',
    lessonId: L1,
    concept: 'u1-translation-properties',
    difficulty: 'basic',
    prompt: [
      "إذا كانت $M'$ صورة $M$ وفق انسحاب ينقل $A$ إلى $B$، فإن القطعتين $[MM']$ و$[AB]$ متوازيتان ومتساويتان في الطول.",
    ],
    answer: true,
    sourceRefs: [P6],
  }),

  singleChoice({
    id: 'geo-u01-t01-q03',
    lessonId: L1,
    concept: 'u1-translation-properties',
    difficulty: 'basic',
    prompt: ['العناصر التي يحافظ عليها الانسحاب هي:'],
    choices: [
      {
        id: 'a',
        text: 'الأطوال، واستقامة النقاط، وقياس الزوايا، والمساحات.',
      },
      {
        id: 'b',
        text: 'الأطوال والمساحات فقط، مع تغيّر قياس الزوايا.',
      },
      {
        id: 'c',
        text: 'قياس الزوايا فقط، دون حفظ استقامة النقاط.',
      },
      {
        id: 'd',
        text: 'الشكل العام فقط، مع مضاعفة الأبعاد.',
      },
    ],
    answer: 'a',
    sourceRefs: [P6],
  }),

  trueFalse({
    id: 'geo-u01-t01-q04',
    lessonId: L1,
    concept: 'u1-translation-properties',
    difficulty: 'medium',
    prompt: ['قد تتغيّر مساحة الشكل بعد انسحابه إذا كانت مسافة الانسحاب كبيرة.'],
    answer: false,
    sourceRefs: [P6],
  }),

  multiSelect({
    id: 'geo-u01-t01-q05',
    lessonId: L1,
    concept: 'u1-translation-properties',
    difficulty: 'medium',
    prompt: ['اختر كل العبارات الصحيحة عن الانسحاب:'],
    choices: [
      { id: 'c1', text: 'يحفظ توازي المستقيمات: صور المستقيمات المتوازية تبقى متوازية.' },
      { id: 'c2', text: 'يقلب اتجاه الشكل كما يفعل الانعكاس بالنسبة إلى مستقيم.' },
      { id: 'c3', text: 'يضاعف أطوال أضلاع الشكل عند مضاعفة مسافة الانسحاب.' },
      {
        id: 'c4',
        text: 'إذا كانت ثلاث نقاط على استقامة واحدة فإن صورها الثلاث على استقامة واحدة.',
      },
    ],
    answers: ['c1', 'c4'],
    sourceRefs: [P6, P7],
  }),

  ordering({
    id: 'geo-u01-t01-q06',
    lessonId: L1,
    concept: 'u1-translation-properties',
    difficulty: 'medium',
    prompt: [
      'رتّب الخطوات بالترتيب الصحيح لإثبات أن صورة القطعة $[MN]$ وفق الانسحاب الذي ينقل $A$ إلى $B$ قطعةٌ مساوية لها في الطول.',
    ],
    items: [
      { id: 's1', text: "الانسحاب ينقل $M$ إلى $M'$ و$N$ إلى $N'$ بالمتجهة نفسها." },
      {
        id: 's2',
        text: "إذن $MM' = NN'$ و$(MM') \\parallel (NN')$، فالرباعي $MNN'M'$ متوازي أضلاع.",
      },
      { id: 's3', text: "في متوازي الأضلاع يتساوى الضلعان المتقابلان، إذن $MN = M'N'$." },
    ],
    answerOrder: ['s1', 's2', 's3'],
    sourceRefs: [P6],
  }),

  matching({
    id: 'geo-u01-t01-q07',
    lessonId: L1,
    concept: 'u1-translation-properties',
    difficulty: 'medium',
    prompt: ['طابق كل وصف للتحويل مع نوعه الصحيح.'],
    left: [
      { id: 'l1', text: 'كل نقطة تنتقل في الاتجاه نفسه وبالمسافة نفسها.' },
      { id: 'l2', text: 'كل نقطة وصورتها على استقامة واحدة مع مركز ثابت وعلى مسافة متساوية منه.' },
      { id: 'l3', text: 'الشكل وصورته متماثلان بالنسبة إلى مستقيم ثابت.' },
    ],
    right: [
      { id: 'r1', text: 'انسحاب' },
      { id: 'r2', text: 'دوران' },
      { id: 'r3', text: 'انعكاس' },
    ],
    pairs: { l1: 'r1', l2: 'r2', l3: 'r3' },
    sourceRefs: [P6, P7],
  }),

  exact({
    id: 'geo-u01-t01-q08',
    lessonId: L1,
    concept: 'u1-translation-properties',
    difficulty: 'advanced',
    prompt: [
      'على المستقيم $(AB)$ نُفِّذ انسحابان متتاليان في الاتجاه نفسه من $A$ إلى $B$: مسافة الأول $\\frac{1}{4}AB$ ومسافة الثاني $\\frac{1}{2}AB$. ما مسافة الانسحاب المكافئ بالنسبة إلى $AB$؟',
    ],
    numerator: 3,
    denominator: 4,
    sourceRefs: [P6],
  }),

  errorAnalysis({
    id: 'geo-u01-t01-q09',
    lessonId: L1,
    concept: 'u1-translation-properties',
    difficulty: 'advanced',
    prompt: [
      'أراد تلميذ أن يستنتج أن شكلاً هو صورة شكل آخر بانسحاب، فكتب الخطوات الآتية. حدّد موضع الخطأ ثم اختر التصحيح والتعليل.',
    ],
    steps: [
      {
        id: 's1',
        text: 'قارنّا الشكلين فوجدنا أطوالهما المتناظرة متساوية وزواياهما المتناظرة متساوية.',
      },
      { id: 's2', text: 'كل تحويل يحافظ على الأطوال والزوايا هو انسحاب بالضرورة.' },
      { id: 's3', text: 'إذن الشكل الثاني صورة الشكل الأول بانسحاب.' },
    ],
    choices: [
      {
        id: 'ch-none',
        text: 'لا يوجد خطأ؛ التطابق وحده يكفي للحكم بأن التحويل انسحاب.',
      },
      {
        id: 'ch-s2',
        text: 'الخطوة 2: حفظ الأطوال والزوايا لا يميّز الانسحاب، لأن الدوران والانعكاس يحفظانهما أيضاً.',
      },
      {
        id: 'ch-s1',
        text: 'الخطوة 1: كان يجب أن يبدأ بقياس المساحات لا الأطوال.',
      },
    ],
    answer: 'ch-s2',
    correction: choicePart({
      id: 'correction',
      prompt: ['اختر التصحيح الصحيح للاستدلال:'],
      choices: [
        {
          id: 'fix-direction',
          text: 'يلزم أن يتحقّق أن كل نقطة وصورتها تُحدِّدان المتجهة نفسها (توازٍ واتجاه وتساوٍ في المسافة)، وهذا ما يخصّ الانسحاب.',
        },
        {
          id: 'fix-drop',
          text: 'نحذف شرط التطابق ونكتفي بأن التشابه يكفي للحكم بالانسحاب.',
        },
        {
          id: 'fix-area',
          text: 'نستبدل شرط الزوايا بشرط تساوي المحيطين فقط.',
        },
      ],
      answer: 'fix-direction',
    }),
    justification: choicePart({
      id: 'reason',
      prompt: ['اختر التعليل الهندسي الصحيح:'],
      choices: [
        {
          id: 'why-same-vector',
          text: 'لأن ما يميّز الانسحاب هو أن جميع النقاط تنتقل بالمتجهة نفسها، وهذا أقوى من مجرّد حفظ الأطوال والزوايا.',
        },
        {
          id: 'why-area',
          text: 'لأن الانسحاب يغيّر المساحة، وهذا يجعله مختلفاً عن الدوران.',
        },
        {
          id: 'why-angles',
          text: 'لأن الدوران يغيّر قياس الزوايا بينما الانسحاب يحفظها.',
        },
      ],
      answer: 'why-same-vector',
    }),
    sourceRefs: [P6, P7],
  }),

  trueFalseJustify({
    id: 'geo-u01-t01-q10',
    lessonId: L1,
    concept: 'u1-translation-properties',
    difficulty: 'advanced',
    prompt: [
      'يكفي أن يكون للشكلين المساحة نفسها والمحيط نفسه للحكم بأن أحدهما صورة الآخر بانسحاب.',
    ],
    answer: false,
    correction: choicePart({
      id: 'correction',
      prompt: ['اختر التصحيح الصحيح:'],
      choices: [
        {
          id: 'fix-vector',
          text: 'يلزم أن تتحقّق إزاحة واحدة لجميع النقاط: كل نقطة وصورتها تحدّدان المتجهة نفسها.',
        },
        {
          id: 'fix-perimeter',
          text: 'يكفي أن يكون المحيطان متساويين ولا حاجة إلى أي شرط آخر.',
        },
        {
          id: 'fix-area-only',
          text: 'المساحة وحدها تكفي إذا كان الشكل مضلعاً منتظماً.',
        },
      ],
      answer: 'fix-vector',
    }),
    justification: choicePart({
      id: 'reason',
      prompt: ['اختر التعليل الصحيح:'],
      choices: [
        {
          id: 'why-invariant',
          text: 'لأن المساحة والمحيط من الخواص المحفوظة بالانسحاب، لكن كثيراً من الأشكال المختلفة تشترك فيهما.',
        },
        {
          id: 'why-rotation',
          text: 'لأن المساحة تتغيّر بالانسحاب بينما المحيط يحفظ.',
        },
        {
          id: 'why-none',
          text: 'لأن الانسحاب لا يحفظ لا المساحة ولا المحيط.',
        },
      ],
      answer: 'why-invariant',
    }),
    sourceRefs: [P6],
  }),

  singleChoice({
    id: 'geo-u01-t01-q11',
    lessonId: L1,
    concept: 'u1-translation-properties',
    difficulty: 'thinking',
    prompt: [
      "إذا كانت $M'$ صورة $M$ و$N'$ صورة $N$ بانسحاب واحد، فما أقصر معطى يكفي وحده للتأكد من ذلك؟",
    ],
    choices: [
      {
        id: 'a',
        text: "أن يكون $\\overrightarrow{MM'} = \\overrightarrow{NN'}$: توازٍ واتجاه واحد وطولان متساويان.",
      },
      {
        id: 'b',
        text: "أن يكون $MM' = NN'$ في الطول فقط.",
      },
      {
        id: 'c',
        text: 'أن تكون المساحتان الناتجتان متساويتين.',
      },
      {
        id: 'd',
        text: "أن يكون $(MN) \\parallel (M'N')$ فقط.",
      },
    ],
    answer: 'a',
    sourceRefs: [P6],
  }),

  singleChoice({
    id: 'geo-u01-t01-q12',
    lessonId: L1,
    concept: 'u1-translation-properties',
    difficulty: 'thinking',
    prompt: [
      'انسحابان متتاليان بمسافتين متساويتين في اتجاهين متعاكسين. ما التحويل المكافئ لتركيبهما؟',
    ],
    choices: [
      { id: 'a', text: 'انسحاب مسافته ضعف المسافة الأولى في الاتجاه الأول.' },
      { id: 'b', text: 'دوران بزاوية $180^\\circ$ حول منتصف المسار.' },
      { id: 'c', text: 'تحويل يترك كل نقطة في موضعها (انسحاب معدوم).' },
      { id: 'd', text: 'انعكاس بالنسبة إلى المستقيم العمودي على المسار.' },
    ],
    answer: 'c',
    sourceRefs: [P6],
  }),

  /* =======================================================================
   * CONCEPT 2 — Lesson 2: «صورة نقطة» (q13–q24 · 20 points)
   * ===================================================================== */
  singleChoice({
    id: 'geo-u01-t01-q13',
    lessonId: L2,
    concept: 'u1-image-point',
    difficulty: 'basic',
    prompt: ["إذا كان الانسحاب ينقل $A$ إلى $B$، فإن صورة النقطة $M$ هي النقطة $M'$ التي تحقق:"],
    choices: [
      { id: 'a', text: "أن يكون الرباعي $ABM'M$ متوازي أضلاع." },
      { id: 'b', text: "أن يكون $MM' = AB$ في الطول فقط دون شرط الاتجاه." },
      { id: 'c', text: "أن تكون $M'$ منتصف القطعة $[AB]$." },
      { id: 'd', text: "أن يكون $(AM') \\parallel (BM)$ فقط." },
    ],
    answer: 'a',
    sourceRefs: [P8],
  }),

  trueFalse({
    id: 'geo-u01-t01-q14',
    lessonId: L2,
    concept: 'u1-image-point',
    difficulty: 'basic',
    prompt: [
      'إذا كان الانسحاب ينقل النقطة $(0;0)$ إلى $(0;3)$، فإن صورة النقطة $(2;1)$ هي النقطة $(2;4)$.',
    ],
    answer: true,
    sourceRefs: [P10],
  }),

  singleChoice({
    id: 'geo-u01-t01-q15',
    lessonId: L2,
    concept: 'u1-image-point',
    difficulty: 'basic',
    prompt: ["إذا كانت $M$ نقطة من المستقيم $(AB)$ تقع خارج القطعة $[AB]$، فأين تقع صورتها $M'$؟"],
    choices: [
      { id: 'a', text: 'على المستقيم $(AB)$ نفسه.' },
      { id: 'b', text: 'على مستقيم عمودي على $(AB)$.' },
      { id: 'c', text: 'داخل القطعة $[AB]$ دائماً.' },
      { id: 'd', text: 'خارج المستوي الذي يحوي $(AB)$.' },
    ],
    answer: 'a',
    sourceRefs: [P9],
  }),

  classification({
    id: 'geo-u01-t01-q16',
    lessonId: L2,
    concept: 'u1-image-point',
    difficulty: 'basic',
    prompt: [
      "صنّف كل عبارة عن النقطة $M$ وصورتها $M'$ وفق الانسحاب الذي ينقل $A$ إلى $B$ ضمن الفئة المناسبة.",
    ],
    categories: [
      { id: 'cat-always', text: 'صحيحة دائماً' },
      { id: 'cat-sometimes', text: 'صحيحة في حالات خاصة' },
      { id: 'cat-never', text: 'خاطئة' },
    ],
    items: [
      { id: 'i1', text: "المسافة $MM'$ تساوي المسافة $AB$." },
      { id: 'i2', text: "المتجهتان $\\overrightarrow{MM'}$ و$\\overrightarrow{AB}$ متساويتان." },
      { id: 'i3', text: "النقطة $M'$ تنتمي إلى المستقيم $(AB)$." },
      { id: 'i4', text: "المسافة $MM'$ تساوي ضعف المسافة $AB$." },
    ],
    assignment: { i1: 'cat-always', i2: 'cat-always', i3: 'cat-sometimes', i4: 'cat-never' },
    sourceRefs: [P8, P9],
  }),

  trueFalse({
    id: 'geo-u01-t01-q17',
    lessonId: L2,
    concept: 'u1-image-point',
    difficulty: 'medium',
    prompt: [
      "إذا كانت $M$ منتصف القطعة $[AB]$ فإن صورتها $M'$ تقع على المستقيم $(AB)$ خارج القطعة $[AB]$.",
    ],
    answer: true,
    sourceRefs: [P9],
  }),

  multiSelect({
    id: 'geo-u01-t01-q18',
    lessonId: L2,
    concept: 'u1-image-point',
    difficulty: 'medium',
    prompt: [
      "في متوازي الأضلاع $ABM'M$ الناتج عن الانسحاب من $A$ إلى $B$، اختر كل العبارات الصحيحة:",
    ],
    choices: [
      { id: 'c1', text: "القطعتان $[AM']$ و$[BM]$ متوازيتان ومتساويتان." },
      { id: 'c2', text: "القطعتان $[AB]$ و$[M'M]$ متوازيتان ومتساويتان." },
      { id: 'c3', text: "القطران $[AM]$ و$[BM']$ متناصفان." },
      { id: 'c4', text: 'الزاويتان عند $A$ وعند $B$ متساويتان دائماً.' },
    ],
    answers: ['c1', 'c2', 'c3'],
    sourceRefs: [P8],
  }),

  errorAnalysis({
    id: 'geo-u01-t01-q19',
    lessonId: L2,
    concept: 'u1-image-point',
    difficulty: 'advanced',
    prompt: [
      'في إنشاء صورة $M$ وفق الانسحاب الذي ينقل $A$ إلى $B$ بالفرجار، تتقاطع الدائرتان في النقطتين $X$ و$Y$، فاعتمد أحد التلاميذ النقطتين معاً بوصفهما صورتين صحيحتين للنقطة $M$. حلّل الحل وحدّد موضع الخطأ ثم اختر التصحيح والتعليل.',
      figureBlock(
        compassIntersectionFigure({
          id: 'test-u01-q19-compass-intersections',
          startLabel: 'A',
          endLabel: 'B',
          alt: 'دائرتان إنشائيتان مركزاهما $M$ و$B$ تتقاطعان في النقطتين $X$ و$Y$؛ سهم $AB$ يوضح الاتجاه المعطى من دون تمييز الصحيح.',
          caption: 'رسم تخطيطي غير مقيّس يعرض المرشحين $X$ و$Y$ معاً ولا يختار أياً منهما.',
          sourceRefs: [P9],
        }),
      ),
    ],
    steps: [
      {
        id: 's1',
        text: 'رُسمت دائرتان: الأولى مركزها $M$، والثانية مركزها $B$، وتقاطعتا في $X$ و$Y$.',
      },
      {
        id: 's2',
        text: 'بما أن النقطتين $X$ و$Y$ تحققان شرطي المسافة نفسها، فهما صورتان مقبولتان معاً للنقطة $M$.',
      },
      { id: 's3', text: 'إذن الإنشاء يعطي صورتين ولا حاجة إلى التمييز بينهما.' },
    ],
    choices: [
      { id: 'ch-none', text: 'لا يوجد خطأ؛ كل تقاطع صالح دائماً لإنشاء صورة نقطة.' },
      {
        id: 'ch-s2',
        text: 'الخطوة 2: تساوي المسافتين لا يكفي؛ يجب اختيار النقطة التي تحقق اتجاه المتجهة من $A$ إلى $B$.',
      },
      {
        id: 'ch-s1',
        text: 'الخطوة 1: كان يجب رسم دائرتين مركزاهما $A$ و$M$ بدل $M$ و$B$.',
      },
    ],
    answer: 'ch-s2',
    correction: choicePart({
      id: 'correction',
      prompt: ['اختر التصحيح الكامل للإنشاء:'],
      choices: [
        {
          id: 'fix-direction',
          text: "نُبقي النقطة التي تجعل $ABM'M$ متوازي الأضلاع غير متشابك وباتجاه $A$ إلى $B$، ونرفض الأخرى لأنها تعطي الاتجاه المعاكس.",
        },
        {
          id: 'fix-both',
          text: 'نحتفظ بالنقطتين ونسمّي إحداهما صورة للمسافة والأخرى صورة للاتجاه.',
        },
        {
          id: 'fix-radius',
          text: 'نغيّر نصف قطر إحدى الدائرتين حتى يبقى تقاطع واحد فقط، فيُحسم الاختيار هندسياً.',
        },
      ],
      answer: 'fix-direction',
    }),
    justification: choicePart({
      id: 'reason',
      prompt: ['اختر التعليل الهندسي الصحيح:'],
      choices: [
        {
          id: 'why-parallelogram',
          text: "لأن صورة النقطة يجب أن تُكمل متوازي الأضلاع $ABM'M$ بالتوجيه الصحيح، وإحدى النقطتين تعطي رباعياً متشابكاً واتجاهاً معاكساً.",
        },
        {
          id: 'why-any',
          text: 'لأن الانسحاب تحويل غير وحيد النتيجة، فأي صورة مقبولة.',
        },
        {
          id: 'why-distance',
          text: 'لأن الصورة الصحيحة هي النقطة الأبعد عن $A$ دائماً.',
        },
      ],
      answer: 'why-parallelogram',
    }),
    sourceRefs: [P9, P10],
  }),

  fillIn({
    id: 'geo-u01-t01-q20',
    lessonId: L2,
    concept: 'u1-image-point',
    difficulty: 'medium',
    prompt: ["أكمل الفراغ: في الانسحاب الذي ينقل $A$ إلى $B$، يكون الرباعي $ABM'M$ _______."],
    blanks: [
      fillInBlank({
        id: 'b1',
        label: 'نوع الرباعي',
        acceptedAnswers: ['متوازي الأضلاع', 'متوازي أضلاع'],
      }),
    ],
    sourceRefs: [P8],
  }),

  matching({
    id: 'geo-u01-t01-q21',
    lessonId: L2,
    concept: 'u1-image-point',
    difficulty: 'medium',
    prompt: ["طابق كل معطى عن النقطتين $M$ و$M'$ مع النتيجة الصحيحة المترتبة عليه."],
    left: [
      { id: 'l1', text: "$M'$ صورة $M$ بالانسحاب من $A$ إلى $B$." },
      { id: 'l2', text: '$M$ تنتمي إلى المستقيم $(AB)$.' },
      { id: 'l3', text: '$M$ تنطبق على $A$.' },
    ],
    right: [
      { id: 'r1', text: "الرباعي $ABM'M$ متوازي أضلاع." },
      { id: 'r2', text: "$M'$ تنتمي أيضاً إلى المستقيم $(AB)$." },
      { id: 'r3', text: "$M'$ تنطبق على $B$." },
    ],
    pairs: { l1: 'r1', l2: 'r2', l3: 'r3' },
    sourceRefs: [P8, P9],
  }),

  trueFalseJustify({
    id: 'geo-u01-t01-q22',
    lessonId: L2,
    concept: 'u1-image-point',
    difficulty: 'medium',
    prompt: [
      'في إنشاء صورة نقطة بالفرجار، إذا تقاطع القوسان في نقطتين فإن كلتيهما صورة صحيحة للنقطة الأصلية.',
    ],
    answer: false,
    correction: choicePart({
      id: 'correction',
      prompt: ['اختر التصحيح الصحيح:'],
      choices: [
        {
          id: 'fix-one',
          text: 'نختار النقطة التي تحقق اتجاه المتجهة المعطاة وتكمل متوازي الأضلاع بالتوجيه الصحيح.',
        },
        {
          id: 'fix-two',
          text: 'نأخذ النقطتين معاً ونعتبر إحداهما صورة للمسافة والأخرى صورة للاتجاه.',
        },
        {
          id: 'fix-any',
          text: 'نأخذ أي نقطة منهما لأن الانسحاب لا يحدد صورة واحدة.',
        },
      ],
      answer: 'fix-one',
    }),
    justification: choicePart({
      id: 'reason',
      prompt: ['اختر التعليل الصحيح:'],
      choices: [
        {
          id: 'why-vector',
          text: 'لأن تحديد الصورة يقتضي متجهة انسحاب واحدة، فأحد التقاطعين يعطي الاتجاه المعاكس للاتجاه المطلوب.',
        },
        {
          id: 'why-symmetry',
          text: 'لأن الانسحاب تحويل متماثل، فلكل صورة صورة ثانية مساوية لها.',
        },
        {
          id: 'why-radius',
          text: 'لأن نصفي القطرين مختلفان فتصبح إحدى النقطتين خارج نطاق الإنشاء.',
        },
      ],
      answer: 'why-vector',
    }),
    sourceRefs: [P9],
  }),

  singleChoice({
    id: 'geo-u01-t01-q23',
    lessonId: L2,
    concept: 'u1-image-point',
    difficulty: 'advanced',
    prompt: ['إذا كان الانسحاب ينقل $A(1;2)$ إلى $B(4;6)$، فما صورة النقطة $M(0;0)$؟'],
    choices: [
      { id: 'a', text: "$M'(3;4)$" },
      { id: 'b', text: "$M'(4;6)$" },
      { id: 'c', text: "$M'(-3;-4)$" },
      { id: 'd', text: "$M'(5;8)$" },
    ],
    answer: 'a',
    sourceRefs: [P10],
  }),

  multiPart({
    id: 'geo-u01-t01-q24',
    lessonId: L2,
    concept: 'u1-image-point',
    difficulty: 'advanced',
    prompt: [
      'على شبكة مربعات: $A(1;1)$ و$B(3;1)$ و$M(2;3)$، والانسحاب ينقل $A$ إلى $B$. أجب عن الأجزاء الآتية.',
    ],
    parts: [
      {
        id: 'p1',
        type: 'single-choice',
        prompt: [
          paragraph("أي رباعي يمثّل العلاقة الصحيحة بين النقاط الأربع $A$ و$B$ و$M$ و$M'$؟"),
        ],
        choices: [
          { id: 'a', text: "$ABM'M$" },
          { id: 'b', text: "$AMBM'$" },
          { id: 'c', text: "$ABMM'$" },
        ],
        answerId: 'a',
      },
      {
        id: 'p2',
        type: 'numeric',
        prompt: [paragraph("ما فاصلة النقطة $M'$؟")],
        answer: 4,
      },
      {
        id: 'p3',
        type: 'numeric',
        prompt: [paragraph("ما ترتيب النقطة $M'$؟")],
        answer: 3,
      },
    ],
    sourceRefs: [P8, P10],
  }),

  /* =======================================================================
   * CONCEPT 3 — Lesson 3: «صورة شكل» (q25–q36 · 20 points)
   * ===================================================================== */
  singleChoice({
    id: 'geo-u01-t01-q25',
    lessonId: L3,
    concept: 'u1-image-shape',
    difficulty: 'basic',
    prompt: ['صورة المستقيم $(d)$ وفق انسحاب غير موازٍ له هي:'],
    choices: [
      { id: 'a', text: "مستقيم $(d')$ يوازي $(d)$ ولا ينطبق عليه." },
      { id: 'b', text: 'قطعة مستقيمة.' },
      { id: 'c', text: 'نصف مستقيم.' },
      { id: 'd', text: 'دائرة تمر بجميع نقاط $(d)$.' },
    ],
    answer: 'a',
    sourceRefs: [P11, P12],
  }),

  trueFalse({
    id: 'geo-u01-t01-q26',
    lessonId: L3,
    concept: 'u1-image-shape',
    difficulty: 'basic',
    prompt: ['صورة القطعة $[MN]$ وفق انسحاب هي قطعة لها الطول نفسه.'],
    answer: true,
    sourceRefs: [P13],
  }),

  singleChoice({
    id: 'geo-u01-t01-q27',
    lessonId: L3,
    concept: 'u1-image-shape',
    difficulty: 'basic',
    prompt: ["دائرة مركزها $O$ ونصف قطرها $r$ صُوِّرت بانسحاب ينقل $O$ إلى $O'$. صورة الدائرة هي:"],
    choices: [
      { id: 'a', text: "دائرة مركزها $O'$ ونصف قطرها $r$." },
      { id: 'b', text: 'دائرة مركزها $O$ ونصف قطرها $r$.' },
      { id: 'c', text: "دائرة مركزها $O'$ ونصف قطرها $2r$." },
      { id: 'd', text: 'نقطتان على محيط الدائرة الأصلية.' },
    ],
    answer: 'a',
    sourceRefs: [P14],
  }),

  trueFalse({
    id: 'geo-u01-t01-q28',
    lessonId: L3,
    concept: 'u1-image-shape',
    difficulty: 'medium',
    prompt: [
      'صورة نصف المستقيم $[Ax)$ وفق انسحاب هي نصف مستقيم يوازيه (أو ينطبق عليه) وله الاتجاه نفسه.',
    ],
    answer: true,
    sourceRefs: [P14],
  }),

  multiSelect({
    id: 'geo-u01-t01-q29',
    lessonId: L3,
    concept: 'u1-image-shape',
    difficulty: 'medium',
    prompt: ['اختر كل ما يحفظه الانسحاب عند تصوير الأشكال:'],
    choices: [
      { id: 'c1', text: 'توازي مستقيمين متوازيين.' },
      { id: 'c2', text: 'تعامد مستقيمين متعامدين.' },
      { id: 'c3', text: 'ترتيب رؤوس المضلع يُعكس من اليمين إلى اليسار.' },
      { id: 'c4', text: 'قياسات زوايا المضلع.' },
    ],
    answers: ['c1', 'c2', 'c4'],
    sourceRefs: [P13, P15],
  }),

  numeric({
    id: 'geo-u01-t01-q30',
    lessonId: L3,
    concept: 'u1-image-shape',
    difficulty: 'medium',
    prompt: ['مربع مساحته $36\\ \\mathrm{cm}^2$ صُوِّر بانسحاب. ما محيط المربع الصورة بالسنتيمتر؟'],
    answer: 24,
    unit: 'cm',
    sourceRefs: [P15],
  }),

  shortAnswer({
    id: 'geo-u01-t01-q31',
    lessonId: L3,
    concept: 'u1-image-shape',
    difficulty: 'medium',
    prompt: ['مربع صُوِّر بانسحاب. ما نوع الشكل الناتج؟ اكتب اسم الشكل فقط.'],
    acceptedAnswers: ['مربع', 'المربع'],
    sourceRefs: [P15],
  }),

  ordering({
    id: 'geo-u01-t01-q32',
    lessonId: L3,
    concept: 'u1-image-shape',
    difficulty: 'medium',
    prompt: ['رتّب خطوات إنشاء صورة المضلع $ABCD$ وفق انسحاب معلوم.'],
    items: [
      { id: 's1', text: "ننشئ صور الرؤوس الأربعة $A'$ و$B'$ و$C'$ و$D'$ بالانسحاب المعطى." },
      { id: 's2', text: 'نتحقق من أن ترتيب الصور يوافق ترتيب الرؤوس حول المضلع الأصلي.' },
      { id: 's3', text: 'نصل الصور بعضها ببعض وفق ذلك الترتيب لنحصل على المضلع الصورة.' },
    ],
    answerOrder: ['s1', 's2', 's3'],
    sourceRefs: [P16],
  }),

  trueFalseJustify({
    id: 'geo-u01-t01-q33',
    lessonId: L3,
    concept: 'u1-image-shape',
    difficulty: 'advanced',
    prompt: [
      'إذا كان اتجاه الانسحاب موازياً للمستقيم $(d)$ فإن صورة $(d)$ مستقيم يوازيه ومنفصل عنه.',
    ],
    answer: false,
    correction: choicePart({
      id: 'correction',
      prompt: ['اختر التصحيح الصحيح:'],
      choices: [
        {
          id: 'fix-coincide',
          text: 'الصورة تنطبق على $(d)$ نفسه لأن كل نقطة منه تنتقل على المستقيم الحامل له.',
        },
        { id: 'fix-perp', text: 'الصورة مستقيم عمودي على $(d)$.' },
        { id: 'fix-point', text: 'الصورة نقطة واحدة على $(d)$.' },
      ],
      answer: 'fix-coincide',
    }),
    justification: choicePart({
      id: 'reason',
      prompt: ['اختر التعليل الهندسي الصحيح:'],
      choices: [
        {
          id: 'why-on-line',
          text: 'لأن كل نقطة من $(d)$ تنتقل في اتجاه موازٍ لـ$(d)$ فتبقى على $(d)$، فتكون مجموعة الصور $(d)$ نفسه.',
        },
        {
          id: 'why-distance',
          text: 'لأن مسافة الانسحاب أكبر من بعد المستقيم عن نفسه فتنفصل الصورة.',
        },
        {
          id: 'why-flip',
          text: 'لأن الانسحاب يقلب اتجاه المستقيم عندما يكون اتجاهه موازياً له.',
        },
      ],
      answer: 'why-on-line',
    }),
    sourceRefs: [P11, P12],
  }),

  justification({
    id: 'geo-u01-t01-q34',
    lessonId: L3,
    concept: 'u1-image-shape',
    difficulty: 'advanced',
    prompt: [
      'أكمل خطوات إثبات أن صورة المستقيم $(d)$ وفق انسحاب مسافته غير معدومة هي مستقيم يوازي $(d)$.',
    ],
    steps: [
      choicePart({
        id: 's1',
        prompt: [paragraph('الخطوة الأولى:')],
        choices: [
          { id: 'a', text: "نأخذ نقطتين مختلفتين $M$ و$N$ على $(d)$ وننشئ صورتيهما $M'$ و$N'$." },
          { id: 'b', text: 'نرسم مباشرة مستقيماً موازياً لـ$(d)$ بمسافة عشوائية.' },
          { id: 'c', text: 'نأخذ نقطة واحدة فقط على $(d)$ ونكتفي بصورتها.' },
        ],
        answer: 'a',
      }),
      choicePart({
        id: 's2',
        prompt: [paragraph('الخطوة الثانية:')],
        choices: [
          {
            id: 'a',
            text: "المتجهتان $\\overrightarrow{MM'}$ و$\\overrightarrow{NN'}$ متساويتان، إذن $MNN'M'$ متوازي أضلاع.",
          },
          { id: 'b', text: "المسافتان $MM'$ و$NN'$ متساويتان فقط، وهذا يكفي لاستنتاج التعامد." },
          { id: 'c', text: "الزاويتان عند $M$ وعند $N'$ متقايستان لأن الانسحاب يحفظ الزوايا." },
        ],
        answer: 'a',
      }),
      choicePart({
        id: 's3',
        prompt: [paragraph('الخطوة الثالثة:')],
        choices: [
          {
            id: 'a',
            text: "في متوازي الأضلاع $MNN'M'$: $(M'N') \\parallel (MN)$، أي $(d') \\parallel (d)$.",
          },
          { id: 'b', text: "في متوازي الأضلاع $MNN'M'$: $(M'N') \\perp (MN)$." },
          { id: 'c', text: "نستنتج أن $(d')$ و$(d)$ متقاطعان في نقطة واحدة." },
        ],
        answer: 'a',
      }),
    ],
    sourceRefs: [P11, P12, P13],
  }),

  multiPart({
    id: 'geo-u01-t01-q35',
    lessonId: L3,
    concept: 'u1-image-shape',
    difficulty: 'advanced',
    prompt: [
      'في معلم متعامد: $A(0;0)$ و$B(2;0)$ و$C(0;3)$، والانسحاب ينقل $A$ إلى $B$. أجب عن الأجزاء الآتية.',
    ],
    parts: [
      {
        id: 'p1',
        type: 'numeric',
        prompt: [paragraph("ما فاصلة النقطة $B'$ صورة $B$؟")],
        answer: 4,
      },
      {
        id: 'p2',
        type: 'numeric',
        prompt: [paragraph("ما ترتيب النقطة $C'$ صورة $C$؟")],
        answer: 3,
      },
      {
        id: 'p3',
        type: 'single-choice',
        prompt: [paragraph("ما مساحة المثلث الصورة $A'B'C'$؟")],
        choices: [
          { id: 'a', text: '$3$ وحدات مربعة' },
          { id: 'b', text: '$6$ وحدات مربعة' },
          { id: 'c', text: '$9$ وحدات مربعة' },
        ],
        answerId: 'a',
      },
    ],
    sourceRefs: [P13, P15],
  }),

  singleChoice({
    id: 'geo-u01-t01-q36',
    lessonId: L3,
    concept: 'u1-image-shape',
    difficulty: 'thinking',
    prompt: [
      'إذا كانت صورة المستقيم $(d)$ وفق انسحاب ما هي $(d)$ نفسه، فماذا نستنتج عن متجهة الانسحاب؟',
    ],
    choices: [
      { id: 'a', text: 'أنها موازية لـ$(d)$ (أو منطبقة على أحد مستقيماته).' },
      { id: 'b', text: 'أنها عمودية على $(d)$ بالضرورة.' },
      { id: 'c', text: 'أن مسافتها معدومة بالضرورة.' },
      { id: 'd', text: 'أن اتجاهها غير محدد ولا يمكن استنتاجه.' },
    ],
    answer: 'a',
    sourceRefs: [P11, P12],
  }),

  /* =======================================================================
   * CONCEPT 4 — Lesson 4: «تطابق المثلثات» (q37–q48 · 20 points)
   * ===================================================================== */
  diagramReading({
    id: 'geo-u01-t01-q37',
    lessonId: L4,
    concept: 'u1-triangle-congruence',
    difficulty: 'advanced',
    prompt: [
      'في الطائرة الورقية $ABCD$ لدينا $AB = AD$ و$CB = CD$، والقطر $[AC]$ مشترك. اقرأ الشكل ثم أجب عن الأجزاء الآتية.',
      figureBlock(
        testFigure({
          id: 'test-u01-q37-kite-triangle-correspondence',
          alt: 'الطائرة الورقية $ABCD$ مقسومة بالقطر $AC$؛ علامات $AB=AD$ و$CB=CD$ كما وردت في السؤال.',
          caption: 'رسم تخطيطي غير مقيّس؛ العلامات تعرض المساواتين المذكورتين والقطر المشترك فقط.',
          sourceRefs: [P19],
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
    parts: [
      {
        id: 'p1',
        type: 'single-choice',
        prompt: [paragraph('أي حالة تطابق تثبت أن المثلثين $ABC$ و$ADC$ طبوقان؟')],
        choices: [
          { id: 'a', text: 'الحالة الثالثة (الأضلاع الثلاثة).' },
          { id: 'b', text: 'الحالة الثانية (ضلع وزاويتان مجاورتان).' },
          { id: 'c', text: 'الحالة الأولى (ضلعان والزاوية المحصورة).' },
        ],
        answerId: 'a',
      },
      {
        id: 'p2',
        type: 'single-choice',
        prompt: [paragraph('ما الزاوية التي تنصفها القطعة $[AC]$ في الزاوية عند $A$؟')],
        choices: [
          { id: 'a', text: 'الزاوية $\\widehat{BAC}$ تساوي الزاوية $\\widehat{DAC}$.' },
          { id: 'b', text: 'الزاوية $\\widehat{ABC}$ تساوي الزاوية $\\widehat{BAC}$.' },
          { id: 'c', text: 'الزاوية $\\widehat{BCA}$ تساوي الزاوية $\\widehat{BAC}$.' },
        ],
        answerId: 'a',
      },
      {
        id: 'p3',
        type: 'true-false',
        prompt: [paragraph('العبارة: القطعة $[AC]$ تنصّف الزاوية عند $C$ أيضاً.')],
        answer: true,
      },
    ],
    sourceRefs: [P19],
  }),

  numeric({
    id: 'geo-u01-t01-q38',
    lessonId: L4,
    concept: 'u1-triangle-congruence',
    difficulty: 'thinking',
    prompt: [
      'مثلثان قائمان طبوقان مساحة كل منهما $15\\ \\mathrm{cm}^2$، وطول أحد ضلعي القائمة في المثلث الأول $5\\ \\mathrm{cm}$. ما طول ضلع القائمة المناظر له في المثلث الثاني بالسنتيمتر؟',
      figureBlock(
        testFigure({
          id: 'test-u01-q38-right-triangle-area',
          alt: 'مثلث قائم تخطيطي واحد من المثلثين المتطابقين؛ يوضح الضلع القائم المعطى $5$ والمساحة المعطاة $15$ فقط.',
          caption:
            'رسم تخطيطي غير مقيّس لأحد المثلثين المتطابقين؛ النسب البصرية لا تمثل الأطوال، ولا يوسم الضلع المطلوب.',
          sourceRefs: [P19],
          spec: {
            points: [
              { id: 'right', x: 0, y: 0, showLabel: false, mark: 'none' },
              { id: 'known-leg-end', x: 4, y: 0, showLabel: false, mark: 'none' },
              { id: 'other-leg-end', x: 0, y: 2.7, showLabel: false, mark: 'none' },
            ],
            segments: [
              { from: 'right', to: 'known-leg-end' },
              { from: 'right', to: 'other-leg-end' },
              { from: 'known-leg-end', to: 'other-leg-end' },
            ],
            rightAngles: [{ at: 'right', from: 'known-leg-end', to: 'other-leg-end' }],
            annotations: [
              { x: 2, y: 0.36, text: '5 cm' },
              { x: 1.1, y: 1.05, text: '15 cm²' },
            ],
            questionLabels: [],
          },
        }),
      ),
    ],
    answer: 6,
    unit: 'cm',
    sourceRefs: [P19],
  }),

  singleChoice({
    id: 'geo-u01-t01-q39',
    lessonId: L4,
    concept: 'u1-triangle-congruence',
    difficulty: 'basic',
    prompt: ['يكون المثلثان $ABC$ و$DEF$ طبوقين عندما:'],
    choices: [
      {
        id: 'a',
        text: 'تتساوى أطوال أضلاعهما المتناظرة وقياسات زواياهما المتناظرة.',
      },
      { id: 'b', text: 'تتساوى مساحتاهما فقط.' },
      { id: 'c', text: 'تتساوى زاويتان فقط من دون أي شرط على الأضلاع.' },
      { id: 'd', text: 'يكون لكل منهما زاوية قائمة فقط.' },
    ],
    answer: 'a',
    sourceRefs: [P17],
  }),

  trueFalse({
    id: 'geo-u01-t01-q40',
    lessonId: L4,
    concept: 'u1-triangle-congruence',
    difficulty: 'basic',
    prompt: ['إذا تساوت أطوال الأضلاع الثلاثة في مثلثين كانا طبوقين (الحالة الثالثة).'],
    answer: true,
    sourceRefs: [P18],
  }),

  singleChoice({
    id: 'geo-u01-t01-q41',
    lessonId: L4,
    concept: 'u1-triangle-congruence',
    difficulty: 'basic',
    prompt: [
      'في المثلثين $ABC$ و$DEF$: $AB = DE$، و$AC = DF$، و$\\widehat{A} = \\widehat{D}$. أي حالة تطابق تُطبَّق؟',
    ],
    choices: [
      { id: 'a', text: 'الحالة الأولى: ضلعان والزاوية المحصورة بينهما.' },
      { id: 'b', text: 'الحالة الثانية: ضلع وزاويتان مجاورتان.' },
      { id: 'c', text: 'الحالة الثالثة: الأضلاع الثلاثة.' },
      { id: 'd', text: 'لا تُطبَّق أي حالة.' },
    ],
    answer: 'a',
    sourceRefs: [P17],
  }),

  multiSelect({
    id: 'geo-u01-t01-q42',
    lessonId: L4,
    concept: 'u1-triangle-congruence',
    difficulty: 'medium',
    prompt: ['اختر كل مجموعات المعطيات التي تكفي لإثبات تطابق مثلثين:'],
    choices: [
      { id: 'c1', text: 'أطوال الأضلاع الثلاثة المتناظرة.' },
      { id: 'c2', text: 'ضلعان وزاوية غير محصورة بينهما.' },
      { id: 'c3', text: 'ضلع والزاويتان المجاورتان له.' },
      { id: 'c4', text: 'زاويتان فقط دون أي ضلع.' },
    ],
    answers: ['c1', 'c3'],
    sourceRefs: [P17, P18],
  }),

  exact({
    id: 'geo-u01-t01-q43',
    lessonId: L4,
    concept: 'u1-triangle-congruence',
    difficulty: 'medium',
    prompt: [
      'مثلثان قائمان طبوقان في $A$ و$D$: $AB = DE = 6\\ \\mathrm{cm}$، والوتر $BC = EF = 7.5\\ \\mathrm{cm}$. ما طول $AC$ بالسنتيمتر؟',
    ],
    numerator: 9,
    denominator: 2,
    unit: 'cm',
    sourceRefs: [P17, P19],
  }),

  fillIn({
    id: 'geo-u01-t01-q44',
    lessonId: L4,
    concept: 'u1-triangle-congruence',
    difficulty: 'medium',
    prompt: [
      'أكمل الفراغ: الحالة التي يتحقق بها تطابق مثلثين قائمين عند تساوي الوتر وأحد ضلعي القائمة تسمّى حالة _______.',
    ],
    blanks: [
      fillInBlank({
        id: 'b1',
        label: 'اسم الحالة',
        acceptedAnswers: ['الوتر وضلع القائمة', 'وتر وضلع القائمة'],
      }),
    ],
    sourceRefs: [P19],
  }),

  matching({
    id: 'geo-u01-t01-q45',
    lessonId: L4,
    concept: 'u1-triangle-congruence',
    difficulty: 'medium',
    prompt: ['طابق كل مجموعة معطيات مع حالة التطابق المناسبة.'],
    left: [
      { id: 'l1', text: 'ثلاثة أضلاع متناظرة متساوية.' },
      { id: 'l2', text: 'ضلعان والزاوية المحصورة بينهما.' },
      { id: 'l3', text: 'ضلع والزاويتان المجاورتان له.' },
    ],
    right: [
      { id: 'r1', text: 'الحالة الثالثة' },
      { id: 'r2', text: 'الحالة الأولى' },
      { id: 'r3', text: 'الحالة الثانية' },
    ],
    pairs: { l1: 'r1', l2: 'r2', l3: 'r3' },
    sourceRefs: [P17, P18],
  }),

  trueFalseJustify({
    id: 'geo-u01-t01-q46',
    lessonId: L4,
    concept: 'u1-triangle-congruence',
    difficulty: 'advanced',
    prompt: [
      'إذا تساوى في مثلثين طولا ضلعين وقياس زاوية غير محصورة بينهما، حُكم بأن المثلثين طبوقان دائماً.',
    ],
    answer: false,
    correction: choicePart({
      id: 'correction',
      prompt: ['اختر التصحيح الصحيح:'],
      choices: [
        {
          id: 'fix-included',
          text: 'لا يُحكم بالتطابق دائماً؛ بل يلزم أن تكون الزاوية المعطاة محصورة بين الضلعين المعطيين.',
        },
        {
          id: 'fix-sss',
          text: 'يكفي شرط ضلعين وزاوية غير محصورة إذا كان المثلث متساوي الساقين فقط.',
        },
        {
          id: 'fix-area',
          text: 'يُحكم بالتطابق إذا تساوت المساحتان إضافة إلى المعطيات.',
        },
      ],
      answer: 'fix-included',
    }),
    justification: choicePart({
      id: 'reason',
      prompt: ['اختر التعليل الصحيح:'],
      choices: [
        {
          id: 'why-two-triangles',
          text: 'لأن قوس الضلع الثاني قد يقطع ضلع الزاوية في موضعين، فينشأ مثلثان مختلفان يشتركان في ضلعين وزاوية غير محصورة.',
        },
        {
          id: 'why-angles',
          text: 'لأن مجموع زوايا المثلث لا يساوي $180^\\circ$ في هذه الحالة.',
        },
        {
          id: 'why-hypotenuse',
          text: 'لأن الحالة تصلح للمثلثات القائمة فقط، فتُرفض في غيرها دون سبب آخر.',
        },
      ],
      answer: 'why-two-triangles',
    }),
    sourceRefs: [P17, P18],
  }),

  errorAnalysis({
    id: 'geo-u01-t01-q47',
    lessonId: L4,
    concept: 'u1-triangle-congruence',
    difficulty: 'advanced',
    prompt: [
      "في متوازي الأضلاع $ABM'M$، أراد تلميذ أن يستنتج أن $AM = BM$ فكتب الخطوات الآتية. حدّد موضع الخطأ ثم اختر التصحيح والتعليل.",
    ],
    steps: [
      { id: 's1', text: "في متوازي الأضلاع يتساوى الضلعان المتقابلان: $AB = M'M$." },
      { id: 's2', text: "وفي متوازي الأضلاع يتساوى القطران أيضاً: $AM = BM'$." },
      { id: 's3', text: 'إذن المثلث $ABM$ متساوي الساقين، ومنه $AM = BM$.' },
    ],
    choices: [
      {
        id: 'ch-s2',
        text: 'الخطوة 2: القطران في متوازي الأضلاع متناصفان لا متساويان، وتساويهما يتحقق في المستطيل خاصةً.',
      },
      {
        id: 'ch-s1',
        text: 'الخطوة 1: الأضلاع المتقابلة في متوازي الأضلاع متوازية فقط وليست متساوية.',
      },
      { id: 'ch-none', text: 'لا يوجد خطأ؛ القطران متساويان في كل متوازي أضلاع.' },
    ],
    answer: 'ch-s2',
    correction: choicePart({
      id: 'correction',
      prompt: ['اختر التصحيح الصحيح للاستدلال:'],
      choices: [
        {
          id: 'fix-sides',
          text: "نستعمل الضلعين المتقابلين $BM = AM'$ فقط، ولا يُستنتج شيء عن $AM$ و$BM$ من تناصف القطرين.",
        },
        {
          id: 'fix-diagonals',
          text: "نكتب $AM = 2 BM'$ لأن القطرين متناصفان، ومنه يُستنتج المطلوب.",
        },
        {
          id: 'fix-midpoint',
          text: "نفرض أن نقطة تقاطع القطرين هي منتصف $[AM]$ و$[BM']$ ومنه يتساوى الضلعان.",
        },
      ],
      answer: 'fix-sides',
    }),
    justification: choicePart({
      id: 'reason',
      prompt: ['اختر التعليل الصحيح:'],
      choices: [
        {
          id: 'why-bisect',
          text: 'لأن تناصف القطرين يعني أن كل قطر يقسم الآخر إلى نصفين متساويين، لا أن القطرين متساويان؛ والقطران متساويان في المستطيل فقط.',
        },
        {
          id: 'why-equal',
          text: 'لأن القطرين متساويان دائماً في متوازي الأضلاع، والخطأ في الخطوة 3 فقط.',
        },
        {
          id: 'why-angle',
          text: 'لأن الزوايا المتقابلة نصفها قائم، وهذا يجعل القطرين متساويين.',
        },
      ],
      answer: 'why-bisect',
    }),
    sourceRefs: [P18],
  }),

  singleChoice({
    id: 'geo-u01-t01-q48',
    lessonId: L4,
    concept: 'u1-triangle-congruence',
    difficulty: 'advanced',
    prompt: [
      'في طائرة ورقية $ABCD$ لدينا $AB = AD$ و$CB = CD$. ماذا نستنتج استنتاجاً صحيحاً من تطابق المثلثين $ABC$ و$ADC$؟',
    ],
    choices: [
      { id: 'a', text: 'أن القطعة $[AC]$ تنصّف الزاويتين عند $A$ وعند $C$.' },
      { id: 'b', text: 'أن القطعة $[BD]$ تنصّف الزاويتين عند $B$ وعند $D$.' },
      { id: 'c', text: 'أن $AB \\parallel CD$.' },
      { id: 'd', text: 'أن الزاويتين عند $A$ وعند $C$ متساويتان.' },
    ],
    answer: 'a',
    sourceRefs: [P19],
  }),

  /* =======================================================================
   * CONCEPT 5 — INTEGRATION: original synthesis across two lessons
   *             (q49–q60 · 20 points)
   * ===================================================================== */
  ordering({
    id: 'geo-u01-t01-q49',
    lessonId: L1,
    concept: 'u1-integration',
    difficulty: 'medium',
    prompt: [
      "ربط بين الدرسين 2 و4: إذا كانت $M'$ صورة $M$ وفق الانسحاب الذي ينقل $A$ إلى $B$، فرتّب الخطوات التي تثبت تطابق المثلثين $ABM$ و$M'MA$.",
    ],
    items: [
      {
        id: 's1',
        text: "الانسحاب يعطي $MM' = AB$ و$(MM') \\parallel (AB)$، فالرباعي $ABM'M$ متوازي أضلاع.",
      },
      { id: 's2', text: "في متوازي الأضلاع: $AB = M'M$ و$BM = AM'$." },
      {
        id: 's3',
        text: 'الضلع $[AM]$ مشترك، إذن المثلثان طبوقان بالحالة الثالثة (الأضلاع الثلاثة).',
      },
    ],
    answerOrder: ['s1', 's2', 's3'],
    sourceRefs: [P8, P18],
  }),

  singleChoice({
    id: 'geo-u01-t01-q50',
    lessonId: L2,
    concept: 'u1-integration',
    difficulty: 'basic',
    prompt: ['ربط بين الدرسين 1 و3: ما الذي يضمن أن صورة مربع بانسحاب هي مربع؟'],
    choices: [
      {
        id: 'a',
        text: 'أن الانسحاب يحفظ الأطوال والزوايا والتوازي في الوقت نفسه.',
      },
      { id: 'b', text: 'أن مساحة الصورة تساوي مساحة الأصل فقط.' },
      { id: 'c', text: 'أن الصورة تقع إلى يمين الشكل الأصلي دائماً.' },
      { id: 'd', text: 'أن عدد رؤوس الشكل لا يتغيّر فقط.' },
    ],
    answer: 'a',
    sourceRefs: [P6, P15],
  }),

  trueFalse({
    id: 'geo-u01-t01-q51',
    lessonId: L3,
    concept: 'u1-integration',
    difficulty: 'medium',
    prompt: [
      'ربط بين الدرسين 1 و4: إذا كان الانسحاب الذي ينقل $A$ إلى $D$ ينقل $B$ إلى $E$، فإن القطعتين $[AB]$ و$[DE]$ متوازيتان ومتساويتان.',
    ],
    answer: true,
    sourceRefs: [P6, P17],
  }),

  multiSelect({
    id: 'geo-u01-t01-q52',
    lessonId: L4,
    concept: 'u1-integration',
    difficulty: 'medium',
    prompt: ['ربط بين الدرسين 3 و4: اختر كل العبارات الصحيحة معاً عن الانسحاب والتطابق.'],
    choices: [
      { id: 'c1', text: 'صورة مثلث متساوي الساقين بانسحاب مثلث متساوي الساقين.' },
      { id: 'c2', text: 'إذا تطابق شكلان فبالتأكيد أحدهما صورة الآخر بانسحاب.' },
      { id: 'c3', text: 'الانسحاب يحفظ المساحات وقياسات الزوايا في الوقت نفسه.' },
      { id: 'c4', text: 'صورة متوازي أضلاع بانسحاب متوازي أضلاع.' },
    ],
    answers: ['c1', 'c3', 'c4'],
    sourceRefs: [P6, P18],
  }),

  numeric({
    id: 'geo-u01-t01-q53',
    lessonId: L1,
    concept: 'u1-integration',
    difficulty: 'medium',
    prompt: [
      'مربع طول ضلعه $5\\ \\mathrm{cm}$ صُوِّر بانسحاب مسافته $3\\ \\mathrm{cm}$ في اتجاه موازٍ لأحد ضلعيه. ما المسافة بالسنتيمتر بين الضلعين المتوازيين المتناظرين في الشكل الأصلي وصورته؟',
    ],
    answer: 3,
    unit: 'cm',
    sourceRefs: [P6, P13],
  }),

  numeric({
    id: 'geo-u01-t01-q54',
    lessonId: L2,
    concept: 'u1-integration',
    difficulty: 'advanced',
    prompt: [
      "في متوازي الأضلاع $ABM'M$ الناتج عن انسحاب: $AB = 5\\ \\mathrm{cm}$ و$BM = 4\\ \\mathrm{cm}$ و$AM = 6\\ \\mathrm{cm}$. ما محيط المثلث $M'MA$ بالسنتيمتر؟",
    ],
    answer: 15,
    unit: 'cm',
    sourceRefs: [P8, P18],
  }),

  justification({
    id: 'geo-u01-t01-q55',
    lessonId: L3,
    concept: 'u1-integration',
    difficulty: 'advanced',
    prompt: [
      'ربط بين الدرسين 1 و3: أكمل خطوات البرهان على أن صورة القطعة $[MN]$ وفق انسحاب قطعة مساوية لها.',
    ],
    steps: [
      choicePart({
        id: 's1',
        prompt: [paragraph('الخطوة الأولى:')],
        choices: [
          {
            id: 'a',
            text: "النقطتان $M'$ و$N'$ صورتا $M$ و$N$، إذن $\\overrightarrow{MM'} = \\overrightarrow{NN'}$.",
          },
          { id: 'b', text: "النقطتان $M'$ و$N'$ صورتا $M$ و$N$، إذن $MM' = NN'$ في الطول فقط." },
          { id: 'c', text: 'الانسحاب يحوّل القطعة إلى دائرة نصف قطرها $MN$.' },
        ],
        answer: 'a',
      }),
      choicePart({
        id: 's2',
        prompt: [paragraph('الخطوة الثانية:')],
        choices: [
          {
            id: 'a',
            text: "من تساوي المتجهتين ينتج $MM' = NN'$ و$(MM') \\parallel (NN')$، فالرباعي $MNN'M'$ متوازي أضلاع.",
          },
          { id: 'b', text: "من تساوي المتجهتين ينتج أن $MNN'M'$ معيّن بالضرورة." },
          { id: 'c', text: "من تساوي المتجهتين ينتج أن $MNN'M'$ مستطيل بالضرورة." },
        ],
        answer: 'a',
      }),
      choicePart({
        id: 's3',
        prompt: [paragraph('الخطوة الثالثة:')],
        choices: [
          { id: 'a', text: "في متوازي الأضلاع يتساوى الضلعان المتقابلان: $MN = M'N'$." },
          { id: 'b', text: "في متوازي الأضلاع يتساوى القطران: $MN' = M'N$، ومنه يُستنتج المطلوب." },
          { id: 'c', text: 'لا يمكن استنتاج تساوي الطولين من متوازي الأضلاع.' },
        ],
        answer: 'a',
      }),
    ],
    sourceRefs: [P6, P13],
  }),

  singleChoice({
    id: 'geo-u01-t01-q56',
    lessonId: L1,
    concept: 'u1-integration',
    difficulty: 'advanced',
    prompt: [
      'ربط بين الدرسين 1 و4: انسحاب ينقل $A$ إلى $D$ و$B$ إلى $E$ و$C$ إلى $F$. أي عبارة صحيحة بالضرورة؟',
    ],
    choices: [
      { id: 'a', text: 'المثلثان $ABC$ و$DEF$ طبوقان وكل ضلع يوازي نظيره.' },
      { id: 'b', text: 'المثلثان $ABC$ و$DEF$ متشابهان فقط وليسا طبوقين.' },
      { id: 'c', text: 'الزاوية عند $A$ تساوي الزاوية عند $E$ دائماً.' },
      { id: 'd', text: 'مساحة $DEF$ تساوي ضعف مساحة $ABC$.' },
    ],
    answer: 'a',
    sourceRefs: [P6, P17],
  }),

  transformationApplication({
    id: 'geo-u01-t01-q57',
    lessonId: L3,
    concept: 'u1-integration',
    difficulty: 'advanced',
    prompt: [
      'ربط بين الدروس 2 و3 و4: في معلم متعامد، $A(0;0)$ و$B(3;0)$ و$C(0;4)$، والانسحاب ينقل $A$ إلى $B$. طبّق الانسحاب على المثلث $ABC$ ثم أجب عن الأجزاء الآتية.',
    ],
    parts: [
      {
        id: 'p1',
        type: 'single-choice',
        prompt: [paragraph("في النقطة $A'$ صورة $A$، تكون الزاوية القائمة في المثلث الصورة:")],
        choices: [
          { id: 'a', text: "عند $A'(3;0)$" },
          { id: 'b', text: "عند $B'(6;0)$" },
          { id: 'c', text: "عند $C'(3;4)$" },
        ],
        answerId: 'a',
      },
      {
        id: 'p2',
        type: 'numeric',
        prompt: [paragraph('ما مساحة المثلث الصورة بوحدات المساحة؟')],
        answer: 6,
      },
      {
        id: 'p3',
        type: 'single-choice',
        prompt: [paragraph("ما العلاقة بين القطعة $[BC]$ وصورتها $[B'C']$؟")],
        choices: [
          { id: 'a', text: 'متوازيتان ومتساويتان في الطول.' },
          { id: 'b', text: 'متعامدتان ومتساويتان في الطول.' },
          { id: 'c', text: 'متوازيتان ومتفاوتتان في الطول.' },
        ],
        answerId: 'a',
      },
    ],
    sourceRefs: [P9, P13, P18],
  }),

  numeric({
    id: 'geo-u01-t01-q58',
    lessonId: L2,
    concept: 'u1-integration',
    difficulty: 'advanced',
    prompt: [
      'ربط بين الدرسين 2 و4: مثلث $ABC$ قائم في $A$ حيث $AB = 9\\ \\mathrm{cm}$ و$AC = 12\\ \\mathrm{cm}$، وصُوِّر بانسحاب. ما محيط المثلث الصورة بالسنتيمتر؟',
    ],
    answer: 36,
    unit: 'cm',
    sourceRefs: [P9, P17],
  }),

  errorAnalysis({
    id: 'geo-u01-t01-q59',
    lessonId: L4,
    concept: 'u1-integration',
    difficulty: 'thinking',
    prompt: [
      'ربط بين الدرسين 1 و4: كتب تلميذ الخطوات الآتية ليثبت أن التطابق وحده يكفي للحكم بأن أحد المثلثين صورة الآخر بانسحاب. حدّد موضع الخطأ ثم اختر التصحيح والتعليل.',
    ],
    steps: [
      { id: 's1', text: 'المثلثان $ABC$ و$DEF$ طبوقان، إذن أطوال أضلاعهما المتناظرة متساوية.' },
      { id: 's2', text: 'لأن الانسحاب يحفظ الأطوال، فإن كل تطابق ناتج عن انسحاب.' },
      { id: 's3', text: 'إذن $[AB] \\parallel [DE]$ بالضرورة.' },
    ],
    choices: [
      {
        id: 'ch-s2',
        text: 'الخطوة 2: التطابق لا يحدّد نوع التحويل؛ فقد ينتج عن انعكاس أو دوران لا عن انسحاب.',
      },
      { id: 'ch-s1', text: 'الخطوة 1: التطابق لا يقتضي تساوي الأطوال المتناظرة.' },
      { id: 'ch-s3', text: 'الخطوة 3: التقاطع بين $[AB]$ و$[DE]$ يمنع التطابق.' },
    ],
    answer: 'ch-s2',
    correction: choicePart({
      id: 'correction',
      prompt: ['اختر التصحيح الصحيح:'],
      choices: [
        {
          id: 'fix-need-vector',
          text: 'يلزم إثبات أن $\\overrightarrow{AD} = \\overrightarrow{BE} = \\overrightarrow{CF}$، وعندها فقط يُحكم بأن أحد المثلثين صورة الآخر بانسحاب.',
        },
        {
          id: 'fix-area',
          text: 'يكفي إثبات تساوي المساحتين للحكم بالانسحاب.',
        },
        {
          id: 'fix-angle',
          text: 'يكفي إثبات تساوي زاويتين متناظرتين للحكم بالانسحاب.',
        },
      ],
      answer: 'fix-need-vector',
    }),
    justification: choicePart({
      id: 'reason',
      prompt: ['اختر التعليل الصحيح:'],
      choices: [
        {
          id: 'why-orientation',
          text: 'لأن الانسحاب يحفظ الاتجاه ويجعل كل نقطة وصورتها بالمتجهة نفسها، أما التطابق فيشمل تحويلات تقلب الاتجاه أيضاً.',
        },
        {
          id: 'why-area',
          text: 'لأن التطابق لا يحفظ المساحات، ولهذا لا يكفي للحكم بالانسحاب.',
        },
        {
          id: 'why-angles',
          text: 'لأن الانسحاب يغيّر قياس الزوايا بينما التطابق يحفظها.',
        },
      ],
      answer: 'why-orientation',
    }),
    sourceRefs: [P6, P18],
  }),

  singleChoice({
    id: 'geo-u01-t01-q60',
    lessonId: L4,
    concept: 'u1-integration',
    difficulty: 'thinking',
    prompt: [
      'ربط بين الدرسين 3 و4: أي تسلسل استدلال صحيح لإثبات أن صورة متوازي الأضلاع بانسحاب متوازي أضلاع؟',
    ],
    choices: [
      {
        id: 'a',
        text: 'نصوّر الرؤوس الأربعة، فتصبح القطعتان المتقابلتان صوراً لقطعتين متوازيتين ومتساويتين، فيكون الشكل الناتج متوازي أضلاع.',
      },
      {
        id: 'b',
        text: 'نلاحظ أن مساحة الشكل الناتج تساوي مساحة الأصل، وهذا وحده يثبت أنه متوازي أضلاع.',
      },
      {
        id: 'c',
        text: 'نفترض مسبقاً أن الشكل الناتج متوازي أضلاع، ثم نستعمل الحالة الثالثة لتأكيد ذلك.',
      },
      {
        id: 'd',
        text: 'نكتفي بأن عدد أضلاع الشكل الناتج أربعة.',
      },
    ],
    answer: 'a',
    sourceRefs: [P13, P18],
  }),
];
