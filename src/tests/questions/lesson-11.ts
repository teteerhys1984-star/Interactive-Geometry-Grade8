import { numeric, singleChoice, trueFalse } from '../authoring';
import type { TestQuestionInput } from '../schema';

/**
 * ============================================================================
 *  LESSON 11 TEST BANK — «تساوي ثلاث نسب» (Unit 2, Lesson 4)
 * ============================================================================
 *
 *  20 questions covering textbook pages 39–41. Per the authoring brief the
 *  bank uses only the three controlled types: single-choice, true-false and
 *  numeric — every item is deterministically gradable and the scoring engine
 *  is untouched. IDs are stable, unique and human-readable
 *  (`geo-l11-t01-q01 … q20`); every question is anchored to a real page.
 *
 *  Blueprint (must match the definition in ../definitions/lesson-11.ts):
 *    concepts  · three-ratio-theorem 4 · correspondence-and-writing 3
 *                activity-proof-and-thirds 6 · length-computation 7
 *    levels    · basic 6 · medium 8 · advanced 4 · thinking 2
 *    types     · single-choice 9 · true-false 5 · numeric 6
 *
 *  No Test Area figure is attached: every question is answerable from its own
 *  printed givens, so the lesson's eight authored figures stay in the lesson
 *  body and the figure-audit inventory is not disturbed by the Test Area.
 * ============================================================================
 */

const LESSON_ID = 'lesson-11-three-ratios';

const REF_ACTIVITY_39 = [{ page: 39, section: 'نشاط — إثبات الخاصّة السابقة في حالة خاصّة' }];
const REF_PROOF_39 = [{ page: 39, section: 'نشاط — الإنشاءات المساعدة والأسئلة ① إلى ③' }];
const REF_THEOREM_40 = [{ page: 40, section: 'تعلّم — مبرهنة النسب الثلاث المتساوية' }];
const REF_NOTE_40 = [{ page: 40, section: 'ملاحظة — حالة الامتداد وقواعد كتابة النسب' }];
const REF_EXAMPLE_40 = [{ page: 40, section: 'مثال — المثلث ABC والمثلث AEF' }];
const REF_SOLUTION_41 = [{ page: 41, section: 'تكملة الحل — حساب AF و EF' }];
const REF_CHECK_41 = [{ page: 41, section: 'تحقّق من فهمك — الحالتان ① و②' }];
const REF_PRACTICE1_41 = [{ page: 41, section: 'تدرّب ① — المساواة بين النسب في ثلاث حالات' }];

export const questions: TestQuestionInput[] = [
  /* ---- Q01 · basic · single-choice · three-ratio-theorem --------------- */
  singleChoice({
    id: 'geo-l11-t01-q01',
    lessonId: LESSON_ID,
    concept: 'three-ratio-theorem',
    difficulty: 'basic',
    sourceRefs: REF_THEOREM_40,
    prompt: [
      'في المثلث $ABC$، $M$ نقطة من $[AB]$ و$N$ نقطة من $(AC)$، والمستقيم $(MN)$ موازٍ للمستقيم $(BC)$. أيّ مساواة تعبّر عن مبرهنة النسب الثلاث المتساوية؟',
    ],
    choices: [
      { id: 'opt-a', text: '$\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}$' },
      { id: 'opt-b', text: '$\\frac{AM}{MB} = \\frac{AN}{NC} = \\frac{MN}{BC}$' },
      { id: 'opt-c', text: '$\\frac{AM}{AN} = \\frac{MB}{NC} = \\frac{BC}{MN}$' },
      { id: 'opt-d', text: '$AM + AN = MN$' },
    ],
    answer: 'opt-a',
  }),

  /* ---- Q02 · basic · true-false · three-ratio-theorem ------------------ */
  trueFalse({
    id: 'geo-l11-t01-q02',
    lessonId: LESSON_ID,
    concept: 'three-ratio-theorem',
    difficulty: 'basic',
    sourceRefs: REF_THEOREM_40,
    prompt: [
      'إذا كانت $M$ نقطة من $[AB]$ و$N$ نقطة من $[AC]$ من دون أي شرط توازٍ، فإنّ $\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}$ تبقى صحيحة.',
    ],
    answer: false,
  }),

  /* ---- Q03 · medium · single-choice · three-ratio-theorem -------------- */
  singleChoice({
    id: 'geo-l11-t01-q03',
    lessonId: LESSON_ID,
    concept: 'three-ratio-theorem',
    difficulty: 'medium',
    sourceRefs: REF_NOTE_40,
    prompt: [
      'ينصّ صندوق الملاحظة في الدرس على أنّ المبرهنة تصحّ أيضاً «في حالة كون المستقيم $(d)$ قاطعاً امتدادي $[AB]$ و $[AC]$». ماذا يحدث للنسب في هذه الحالة إذا كان $(d)$ يقطع الامتدادين بعد $B$ و $C$ وكان موازياً لـ $(BC)$؟',
    ],
    choices: [
      {
        id: 'opt-a',
        text: 'تبقى النسب الثلاث متساوية، وتُقاس الأطوال على الامتدادين كما تُقاس على الضلعين.',
      },
      {
        id: 'opt-b',
        text: 'تبقى المساواة صحيحة لكن على $\\frac{MB}{AB} = \\frac{NC}{AC} = \\frac{MN}{BC}$ فقط.',
      },
      { id: 'opt-c', text: 'تبطل المساواة لأنّ $M$ و $N$ خارج المثلث.' },
      { id: 'opt-d', text: 'تصبح النسب متساوية بمقدار $2$ دائماً.' },
    ],
    answer: 'opt-a',
  }),

  /* ---- Q04 · advanced · single-choice · three-ratio-theorem ------------ */
  singleChoice({
    id: 'geo-l11-t01-q04',
    lessonId: LESSON_ID,
    concept: 'three-ratio-theorem',
    difficulty: 'advanced',
    sourceRefs: REF_THEOREM_40,
    prompt: [
      'يطبع صندوق المبرهنة الفرض «وكان $(MN) \\parallel (AB)$»، مع أنّ $M$ تنتمي إلى $[AB]$. ما القراءة الوحيدة التي تجعل نصّ المبرهنة قابلاً للتطبيق على الشكل المطبوع نفسه؟',
    ],
    choices: [
      {
        id: 'opt-a',
        text: 'أن يُقرأ الفرض $(MN) \\parallel (BC)$، لأنّ $(MN)$ يقطع $[AB]$ في $M$ فلا يمكن أن يوازيه، ولأنّ الشكل المطبوع يعلّم التوازي مع $[BC]$.',
      },
      {
        id: 'opt-b',
        text: 'أن تكون $M$ و $N$ نقطتين متطابقتين حتى يوازي $(MN)$ الضلع $(AB)$.',
      },
      {
        id: 'opt-c',
        text: 'أن يُحذف الفرض كاملاً وتُستعمل المساواة من دون أي شرط توازٍ.',
      },
      {
        id: 'opt-d',
        text: 'أن يُقرأ الفرض $(MN) \\parallel (AC)$ لأنّ $N$ تنتمي إلى $(AC)$.',
      },
    ],
    answer: 'opt-a',
  }),

  /* ---- Q05 · basic · single-choice · correspondence-and-writing --------- */
  singleChoice({
    id: 'geo-l11-t01-q05',
    lessonId: LESSON_ID,
    concept: 'correspondence-and-writing',
    difficulty: 'basic',
    sourceRefs: REF_CHECK_41,
    prompt: [
      'في الحالة ① من «تحقّق من فهمك»: $D \\in [AB]$ و $E \\in [AC]$ و $(DE) \\parallel (BC)$. أيّ مجموعة من النسب الثلاث المتساوية هي الصحيحة؟',
    ],
    choices: [
      { id: 'opt-a', text: '$\\frac{AD}{AB} = \\frac{AE}{AC} = \\frac{DE}{BC}$' },
      { id: 'opt-b', text: '$\\frac{AD}{AB} = \\frac{AE}{BC} = \\frac{DE}{AC}$' },
      { id: 'opt-c', text: '$\\frac{AD}{DE} = \\frac{AE}{AB} = \\frac{DB}{BC}$' },
      { id: 'opt-d', text: '$\\frac{AD}{AC} = \\frac{AE}{AB} = \\frac{DE}{BC}$' },
    ],
    answer: 'opt-a',
  }),

  /* ---- Q06 · medium · true-false · correspondence-and-writing ---------- */
  trueFalse({
    id: 'geo-l11-t01-q06',
    lessonId: LESSON_ID,
    concept: 'correspondence-and-writing',
    difficulty: 'medium',
    sourceRefs: REF_NOTE_40,
    prompt: [
      'إذا كانت $\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}$، فإنّ $\\frac{AM}{AC} = \\frac{AN}{AB}$ صحيحة أيضاً في كل مثلث.',
    ],
    answer: false,
  }),

  /* ---- Q07 · medium · single-choice · correspondence-and-writing -------- */
  singleChoice({
    id: 'geo-l11-t01-q07',
    lessonId: LESSON_ID,
    concept: 'correspondence-and-writing',
    difficulty: 'medium',
    sourceRefs: REF_NOTE_40,
    prompt: [
      'قاعدة الكتاب في الكتابة: «نكتب في البسوط أضلاع أحد المثلثين، وفي المقامات أضلاع المثلث الآخر الموافقة بالترتيب». في المثلث $FGH$ حيث $I \\in [FG]$ و $J \\in [FH]$ و $(IJ) \\parallel (GH)$، أيّ كتابة تلتزم هذه القاعدة وتصل الأضلاع المتناظرة؟',
    ],
    choices: [
      { id: 'opt-a', text: '$\\frac{FI}{FG} = \\frac{FJ}{FH} = \\frac{IJ}{GH}$' },
      { id: 'opt-b', text: '$\\frac{FI}{FH} = \\frac{FJ}{FG} = \\frac{IJ}{GH}$' },
      { id: 'opt-c', text: '$\\frac{FI}{GH} = \\frac{FJ}{FG} = \\frac{IJ}{FH}$' },
      { id: 'opt-d', text: '$\\frac{FI}{IJ} = \\frac{FJ}{FH} = \\frac{GH}{FG}$' },
    ],
    answer: 'opt-a',
  }),

  /* ---- Q08 · medium · single-choice · activity-proof-and-thirds -------- */
  singleChoice({
    id: 'geo-l11-t01-q08',
    lessonId: LESSON_ID,
    concept: 'activity-proof-and-thirds',
    difficulty: 'medium',
    sourceRefs: REF_PROOF_39,
    prompt: [
      'في نشاط الصفحة ٣٩، لإثبات أنّ $J$ منتصف $[AN]$ نستعمل مبرهنة المستقيم الموازي لأحد أضلاع مثلث. في أيّ مثلث، وبأيّ معلومة نبدأ؟',
    ],
    choices: [
      {
        id: 'opt-a',
        text: 'في المثلث $AMN$: $I$ منتصف $[AM]$، والمستقيم $(IJ)$ موازٍ لـ $(MN)$، إذن $J$ منتصف $[AN]$.',
      },
      {
        id: 'opt-b',
        text: 'في المثلث $ABC$: $M$ منتصف $[AB]$، والمستقيم $(BC)$ موازٍ لـ $(MN)$، إذن $J$ منتصف $[AN]$.',
      },
      {
        id: 'opt-c',
        text: 'في المثلث $IBJ$: $M$ منتصف $[IB]$، إذن $J$ منتصف $[AN]$ مباشرةً.',
      },
      {
        id: 'opt-d',
        text: 'لا حاجة إلى أيّ مثلث؛ يكفي أنّ النقطة $J$ مرسومة على $(AC)$.',
      },
    ],
    answer: 'opt-a',
  }),

  /* ---- Q09 · basic · true-false · activity-proof-and-thirds ------------ */
  trueFalse({
    id: 'geo-l11-t01-q09',
    lessonId: LESSON_ID,
    concept: 'activity-proof-and-thirds',
    difficulty: 'basic',
    sourceRefs: REF_ACTIVITY_39,
    prompt: ['في معطيات نشاط الصفحة ٣٩، النقطة $M$ هي منتصف الضلع $[AB]$.'],
    answer: false,
  }),

  /* ---- Q10 · medium · single-choice · activity-proof-and-thirds -------- */
  singleChoice({
    id: 'geo-l11-t01-q10',
    lessonId: LESSON_ID,
    concept: 'activity-proof-and-thirds',
    difficulty: 'medium',
    sourceRefs: REF_PROOF_39,
    prompt: [
      'لإثبات أنّ $P$ منتصف $[BJ]$، نعمل داخل المثلث $IBJ$. ما المعلومة الصحيحة عن النقطة $M$ في هذا المثلث؟',
    ],
    choices: [
      {
        id: 'opt-a',
        text: '$M$ منتصف $[IB]$ (لأنّ $IM = MB$)، والمستقيم المارّ بـ $M$ والموازي لـ $(IJ)$ هو $(MN)$ نفسه، فيقطع $[BJ]$ في منتصفه.',
      },
      { id: 'opt-b', text: '$M$ منتصف $[IJ]$، فينتج أنّ $P$ منتصف $[BJ]$.' },
      { id: 'opt-c', text: '$M$ تنتمي إلى $[JB]$ و$P$ تنتمي إلى $[MN]$ فينتج التناصف من التناظر.' },
      { id: 'opt-d', text: '$M$ منتصف $[AB]$، وهذا وحده يكفي.' },
    ],
    answer: 'opt-a',
  }),

  /* ---- Q11 · medium · single-choice · activity-proof-and-thirds -------- */
  singleChoice({
    id: 'geo-l11-t01-q11',
    lessonId: LESSON_ID,
    concept: 'activity-proof-and-thirds',
    difficulty: 'medium',
    sourceRefs: REF_PROOF_39,
    prompt: ['بعد إثبات أنّ $P$ منتصف $[BJ]$، نستنتج أنّ $N$ منتصف $[CJ]$. أيّ تبرير هو الصحيح؟'],
    choices: [
      {
        id: 'opt-a',
        text: 'في المثلث $BCJ$: $P$ منتصف $[BJ]$، والمستقيم المارّ بـ $P$ والموازي لـ $(BC)$ هو $(MN)$ ويقطع $[CJ]$ في $N$، إذن $N$ منتصف $[CJ]$.',
      },
      {
        id: 'opt-b',
        text: 'لأنّ $N$ تنتمي إلى $[AC]$ و$J$ تنتمي إلى $[AC]$ فالنقطتان متماثلتان بالنسبة إلى $A$.',
      },
      {
        id: 'opt-c',
        text: 'لأنّ $(PN)$ يوازي $(BJ)$، فينتج التناصف مباشرةً.',
      },
      {
        id: 'opt-d',
        text: 'لأنّ $N$ منتصف $[AC]$ أصلاً حسب معطيات النشاط.',
      },
    ],
    answer: 'opt-a',
  }),

  /* ---- Q12 · advanced · true-false · activity-proof-and-thirds --------- */
  trueFalse({
    id: 'geo-l11-t01-q12',
    lessonId: LESSON_ID,
    concept: 'activity-proof-and-thirds',
    difficulty: 'advanced',
    sourceRefs: REF_PROOF_39,
    prompt: ['استنتاج $CS = SR = RB$ يحتاج إلى نتيجتين معاً: $S$ منتصف $[CR]$ و $R$ منتصف $[BS]$.'],
    answer: true,
  }),

  /* ---- Q13 · medium · numeric · activity-proof-and-thirds -------------- */
  numeric({
    id: 'geo-l11-t01-q13',
    lessonId: LESSON_ID,
    concept: 'activity-proof-and-thirds',
    difficulty: 'medium',
    sourceRefs: REF_PROOF_39,
    prompt: [
      'بعد إثبات أنّ $BSNM$ متوازي أضلاع، نعلم أنّ $MN = BS$. إذا كان $\\frac{BS}{BC} = \\frac{2}{3}$ و $BC = 12$، فما طول $MN$؟ (بالسنتيمتر)',
    ],
    answer: 8,
    tolerance: 0.001,
    unit: 'سم',
  }),

  /* ---- Q14 · basic · numeric · length-computation ----------------------- */
  numeric({
    id: 'geo-l11-t01-q14',
    lessonId: LESSON_ID,
    concept: 'length-computation',
    difficulty: 'basic',
    sourceRefs: REF_EXAMPLE_40,
    prompt: [
      'في المثال المطبوع: $AB = 3$ و $AC = 6$ و $BC = 5$ و $AE = 2$ و $(EF) \\parallel (BC)$. احسب $AF$.',
    ],
    answer: 4,
    tolerance: 0.001,
    unit: 'سم',
  }),

  /* ---- Q15 · thinking · numeric · length-computation -------------------- */
  numeric({
    id: 'geo-l11-t01-q15',
    lessonId: LESSON_ID,
    concept: 'length-computation',
    difficulty: 'thinking',
    sourceRefs: REF_SOLUTION_41,
    prompt: [
      'بالمعطيات نفسها ($AB = 3$، $AC = 6$، $BC = 5$، $AE = 2$، $(EF) \\parallel (BC)$)، احسب $EF$ واكتب الجواب عدداً عشرياً مقرّباً إلى منزلتين عشريتين.',
    ],
    answer: 3.33,
    tolerance: 0.01,
    unit: 'سم',
  }),

  /* ---- Q16 · basic · numeric · length-computation ----------------------- */
  numeric({
    id: 'geo-l11-t01-q16',
    lessonId: LESSON_ID,
    concept: 'length-computation',
    difficulty: 'basic',
    sourceRefs: REF_EXAMPLE_40,
    prompt: ['في المثال المطبوع، $E$ تنتمي إلى $[AB]$ و $AE = 2$ و $AB = 3$. ما طول $EB$؟'],
    answer: 1,
    tolerance: 0.001,
    unit: 'سم',
  }),

  /* ---- Q17 · medium · numeric · length-computation ---------------------- */
  numeric({
    id: 'geo-l11-t01-q17',
    lessonId: LESSON_ID,
    concept: 'length-computation',
    difficulty: 'medium',
    sourceRefs: REF_PRACTICE1_41,
    prompt: [
      'في الحالة ① من «تدرّب ①»، المستقيمان الملوّنان متوازيان: على أحد الضلعين جزآن طولاهما $5$ و $x$، وعلى الآخر الموازي الداخلي $8$ والضلع $[BC]$ هو $15$، بحيث ينتج $\\frac{5}{5 + x} = \\frac{8}{15}$. احسب $x$.',
    ],
    answer: 4.375,
    tolerance: 0.01,
  }),

  /* ---- Q18 · advanced · numeric · length-computation -------------------- */
  numeric({
    id: 'geo-l11-t01-q18',
    lessonId: LESSON_ID,
    concept: 'length-computation',
    difficulty: 'advanced',
    sourceRefs: REF_PRACTICE1_41,
    prompt: [
      'في الحالة ② من «تدرّب ①»، الطول المطبوع على الضلع كاملاً هو $15$ وجزؤه الأعلى $8$، والموازي الداخلي $5$ والضلع $[BC]$ هو $x$، بحيث ينتج $\\frac{8}{15} = \\frac{5}{x}$. احسب $x$.',
    ],
    answer: 9.375,
    tolerance: 0.01,
  }),

  /* ---- Q19 · advanced · true-false · length-computation ----------------- */
  trueFalse({
    id: 'geo-l11-t01-q19',
    lessonId: LESSON_ID,
    concept: 'length-computation',
    difficulty: 'advanced',
    sourceRefs: REF_PRACTICE1_41,
    prompt: [
      'في «تدرّب ①» يطلب الكتاب بيان إن كانت المساواة $\\frac{8}{5} = \\frac{x}{15}$ صحيحة. هذه المساواة المطبوعة صحيحة في الحالة ①.',
    ],
    answer: false,
  }),

  /* ---- Q20 · thinking · single-choice · length-computation -------------- */
  singleChoice({
    id: 'geo-l11-t01-q20',
    lessonId: LESSON_ID,
    concept: 'length-computation',
    difficulty: 'thinking',
    sourceRefs: REF_PROOF_39,
    prompt: [
      'في المختبر التفاعلي لهذا الدرس نحرّك النسبة $k = \\frac{AM}{AB}$ بعيداً عن القيمة المطبوعة $\\frac{2}{3}$. أيّ العبارات يبقى صحيحاً عند كل قيمة لـ $k$؟',
    ],
    choices: [
      {
        id: 'opt-a',
        text: 'يبقى $(MN) \\parallel (BC)$ و$\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}$، ويبقى $J$ منتصف $[AN]$، بينما تبطل $CS = SR = RB$ وكون $N$ منتصف $[CJ]$.',
      },
      {
        id: 'opt-b',
        text: 'تبقى $CS = SR = RB$ صحيحة لأنّ الإنشاءات المساعدة لا تتغيّر.',
      },
      {
        id: 'opt-c',
        text: 'تصبح النسب الثلاث مختلفة عن بعضها عند كل قيمة جديدة لـ $k$.',
      },
      {
        id: 'opt-d',
        text: 'يبقى $BSNM$ متوازي أضلاع فقط إذا كانت $k = \\frac{1}{2}$.',
      },
    ],
    answer: 'opt-a',
  }),
];
