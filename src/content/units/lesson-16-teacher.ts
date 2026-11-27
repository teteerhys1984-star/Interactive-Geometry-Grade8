import type { ContentBlock, TeacherResourcesInput, TeacherSolution } from '../schema';
import {
  fig16CheckSolution,
  fig16PracticeOneGiven,
  fig16PracticeOneSolution,
  fig16PracticeTwoGiven,
  fig16PracticeTwoSolution,
  fig16ProofGiven,
  fig16ProofSolution,
  fig16Properties,
  fig16TestGiven,
  fig16TestSolution,
} from './lesson-16-figures';
import {
  L16_CHECK,
  L16_PRACTICE_1,
  L16_PRACTICE_2_1,
  L16_PRACTICE_2_2,
  L16_PRACTICE_2_3,
  L16_PRACTICE_2_INTRO,
  L16_PROOF_1,
  L16_PROOF_2,
  L16_PROOF_3,
  L16_PROOF_4,
  L16_PROOF_5,
  L16_PROOF_6,
  L16_PROOF_7,
  L16_TEST_1,
  L16_TEST_2,
} from './lesson-16-questions';

const p = (text: string): ContentBlock => ({ type: 'paragraph', text });

function record(input: {
  id: string;
  reference: string;
  question: string;
  given: string;
  steps: string[];
  rule: string;
  check: string;
  commonError: string;
  diagram: string;
  extra?: ContentBlock[];
}): TeacherSolution {
  return {
    id: input.id,
    reference: input.reference,
    question: input.question,
    blocks: [
      { type: 'callout', variant: 'note', title: 'المعطيات', blocks: [p(input.given)] },
      { type: 'list', ordered: true, items: input.steps },
      { type: 'callout', variant: 'theorem', title: 'القاعدة المستعملة', blocks: [p(input.rule)] },
      ...(input.extra ?? []),
      { type: 'callout', variant: 'hint', title: 'تحقّق مستقل', blocks: [p(input.check)] },
      { type: 'callout', variant: 'warning', title: 'خطأ شائع', blocks: [p(input.commonError)] },
      { type: 'callout', variant: 'definition', title: 'قراءة الشكل', blocks: [p(input.diagram)] },
    ],
  };
}

const BISECTOR_RULE =
  'تعريف المنصف (صفحة ٦٣): المستقيم المارّ بالرأس والذي يقسم زاويته إلى زاويتين متساويتين.';
const CONCURRENCE_RULE =
  'خاصّة الصفحة ٦٣: المنصفات الثلاثة تتلاقى في $I$ مركز الدائرة الماسة لأضلاع المثلث داخلاً؛ ويكفي رسم منصّفين لتعيينها.';
const EQUIDIST_RULE =
  'خاصّة المنصف: كلّ نقطة على منصّف زاوية تبعد بالمسافة نفسها عن ضلعَي الزاوية؛ ومن ثمّ $I$ متساوية البعد عن الأضلاع الثلاثة.';
const ANGLE_SUM_RULE =
  'مجموع زوايا المثلث $180^\\circ$؛ والمنصّف يقسم زاويته إلى نصفين، فالزاوية الكاملة ضعف نصفها.';

/**
 * ============================================================================
 *  UNIT 3, LESSON 4 — TEACHER RESOURCES & DERIVED SOLUTIONS (pages 62–63)
 * ============================================================================
 *  The pages print no solution for any prompt; every solution below is
 *  platform-derived. $AH = AK$ is admitted exactly as the source admits it.
 *  See `docs/UNIT-03-LESSON-04-FIGURES.md`.
 * ============================================================================
 */
export const lesson16TeacherResources: TeacherResourcesInput = {
  notes: [
    {
      type: 'callout',
      variant: 'note',
      title: 'ما تطبعه الصفحات وما لا تطبعه',
      blocks: [
        p(
          'الصفحة ٦٢ تطبع النشاط والاختبار والإثبات مع 💡. والصفحة ٦٣ تطبع التعريف والخاصة وتلميحَين (الأول للمارّة بالرؤوس مراجعةً، والثاني للماسّة داخلاً) و«تحقّق من فهمك» و«تدرّب». والصفحات لا تتضمّن أي إجابات مطبوعة لأيّ سؤال؛ كلّ حلول هذا القسم استنتاجية من إعداد المنصّة ولم تُنقل عن أيّ مصدر خارجي.',
        ),
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'ما يُقبل دون برهان',
      blocks: [
        p(
          'في الإثبات (صفحة ٦٢، الفقرة ⑤) تقبل الصفحة أنّ $AH = AK$ وتنصّ على أنّ إثبات ذلك حسب مبرهنة سترد في الفصل التالي. قبلنا هذه المساواة كما قبلها المصدر ولم نبرهنها هنا؛ أمّا بقيّة السلسلة ($IH=IL$، $IK=IL$، الزوايا القائمة، وكون $(AI)$ محور $[HK]$ ومنصّف $\\widehat{A}$) فمبرهنة ومحقّقة بالحساب.',
        ),
      ],
    },
  ],
  textbookSolutions: [
    record({
      id: 'l16-sol-p62-test-1',
      reference: 'صفحة ٦٢ — الاختبار ① (حلّ من إعداد المنصّة)',
      question: L16_TEST_1,
      given: 'المثلثان $ABC$ و$EFJ$ كما في الشكل.',
      steps: [
        'نرسم المثلثين $ABC$ و$EFJ$ كما طُبعًا ($E$ أعلى اليسار، $F$ أعلى اليمين، $J$ أسفل).',
      ],
      rule: BISECTOR_RULE,
      check: 'الإحداثيات في `lesson-16-geometry.ts` تمثّل المثلثين.',
      commonError: 'خلط رؤوس المثلث $EFJ$.',
      diagram: 'المثلثان كما طُبعًا.',
      extra: [fig16TestGiven],
    }),
    record({
      id: 'l16-sol-p62-test-2',
      reference: 'صفحة ٦٢ — الاختبار ② (حلّ من إعداد المنصّة)',
      question: L16_TEST_2,
      given: 'المثلثان $ABC$ و$EFJ$.',
      steps: [
        'في كلّ مثلث نرسم منصفات الزوايا الثلاث (كلّ منصّف يقسم زاويته إلى نصفين).',
        'نلاحظ أنّ المنصفات الثلاثة تتلاقى في نقطة واحدة $I$.',
        'هذه النقطة هي مركز الدائرة الماسة لأضلاع المثلث داخلاً.',
      ],
      rule: CONCURRENCE_RULE,
      check: 'التلاقي محقّق بالحساب في المثلثين (`lesson-16-geometry.test.ts`).',
      commonError: 'توقّع عدم التلاقي في المثلث المنفرج؛ وهي تتلاقى دائمًا.',
      diagram: 'المنصفات الثلاثة ونقطة التلاقي $I$ في كلّ مثلث.',
      extra: [fig16TestSolution],
    }),
    record({
      id: 'l16-sol-p62-proof-1',
      reference: 'صفحة ٦٢ — الإثبات ① (حلّ من إعداد المنصّة)',
      question: L16_PROOF_1,
      given: 'منصّفا $\\widehat{B}$ و$\\widehat{C}$ يتقاطعان في $I$.',
      steps: [
        'نرسم المثلث $ABC$ والمنصّفين $(d_1)$ من $B$ و$(d_2)$ من $C$.',
        'نرمز لتقاطعهما بـ $I$.',
      ],
      rule: BISECTOR_RULE,
      check: 'الشكل يحقّق أنّ $(d_1),(d_2)$ منصّفا الزاويتين وأنّ $I$ تلاقيهما.',
      commonError: 'رسم منصّفَي رأسين غير $B$ و$C$.',
      diagram: 'المنصّفان $(d_1)$ و$(d_2)$ يتقاطعان في $I$.',
      extra: [fig16ProofGiven],
    }),
    record({
      id: 'l16-sol-p62-proof-2',
      reference: 'صفحة ٦٢ — الإثبات ② (حلّ من إعداد المنصّة)',
      question: L16_PROOF_2,
      given: 'النقطة $I$.',
      steps: [
        'نرسم $L$ مسقط $I$ على $(BC)$ (عمود من $I$ على $(BC)$).',
        'نضع على $[BA]$ نقطة $H$ بحيث $BH = BL$.',
      ],
      rule: 'الإسقاط العمودي + نقل طول بالفرجار.',
      check: 'الاختبار يتحقّق أنّ $L$ مسقط $I$ وأنّ $BH=BL$ و$H\\in[BA]$.',
      commonError: 'وضع $H$ بحيث $AH=AL$ بدل $BH=BL$.',
      diagram: '$L$ على $[BC]$ بزاوية قائمة، و$H$ على $[BA]$ مع $BH=BL$.',
      extra: [fig16ProofGiven],
    }),
    record({
      id: 'l16-sol-p62-proof-3',
      reference: 'صفحة ٦٢ — الإثبات ③ (حلّ من إعداد المنصّة)',
      question: L16_PROOF_3,
      given: '$BH=BL$ و$(BI)$ منصّف $\\widehat{B}$.',
      steps: [
        'في المثلث $BHL$: $BH=BL$ و$(BI)$ منصّف زاوية الرأس $\\widehat{HBL}$؛ فهو محور تناظر المثلث المتساوي الساقين $BHL$.',
        'ومحور تناظر مثلث متساوي الساقين هو محور قاعدته $[HL]$.',
        'وبما أنّ $I$ على هذا المحور فإنّ $IH=IL$؛ و$(BI)\\perp(HL)$ عند منتصفه، ومنه $\\widehat{IHB}=90^\\circ$.',
      ],
      rule: 'المثلث المتساوي الساقين: منصّف زاوية الرأس محور تناظر ومحور القاعدة.',
      check: 'الاختبار يتحقّق $IH=IL$ و$\\widehat{IHB}=90^\\circ$.',
      commonError: 'الاستنتاج $IH=IL$ دون تبرير محور التناظر.',
      diagram: '$[IH]$ و$[IL]$ متساويتان وزاوية قائمة عند $H$.',
      extra: [fig16ProofSolution],
    }),
    record({
      id: 'l16-sol-p62-proof-4',
      reference: 'صفحة ٦٢ — الإثبات ④ (حلّ من إعداد المنصّة)',
      question: L16_PROOF_4,
      given: '$CK=CL$ و$(CI)$ منصّف $\\widehat{C}$.',
      steps: [
        'نضع على $[AC]$ نقطة $K$ بحيث $CK=CL$.',
        'في المثلث $CKL$: $CK=CL$ و$(CI)$ منصّف $\\widehat{KCL}$؛ فهو محور تناظر ومحور $[KL]$.',
        'ومنه $IK=IL$ و$\\widehat{IKC}=90^\\circ$.',
      ],
      rule: 'المثلث المتساوي الساقين: منصّف زاوية الرأس محور القاعدة.',
      check: 'الاختبار يتحقّق $IK=IL$ و$\\widehat{IKC}=90^\\circ$.',
      commonError: 'نسيان أنّ $I$ على منصّف $\\widehat{C}$ أيضًا.',
      diagram: '$[IK]$ و$[IL]$ متساويتان وزاوية قائمة عند $K$.',
      extra: [fig16ProofSolution],
    }),
    record({
      id: 'l16-sol-p62-proof-5',
      reference: 'صفحة ٦٢ — الإثبات ⑤ (حلّ من إعداد المنصّة؛ $AH=AK$ مقبولة)',
      question: L16_PROOF_5,
      given: '$IH=IL=IK$؛ و$AH=AK$ مقبولة (مبرهنة لاحقة).',
      steps: [
        '$I$ متساوية البعد عن $H,K,L$ فهي مركز الدائرة المارّة بهذه النقاط (صفة $I$ في المثلث $HKL$).',
        'وبما أنّ $AH=AK$ (مقبولة) و$IH=IK$، فإنّ $A$ و$I$ كلتاهما متساوية البعد عن $H$ و$K$.',
        'إذن $(AI)$ هو محور القطعة $[HK]$ (عمودي عليها في منتصفها).',
      ],
      rule: 'نقطتان متساويتا البعد عن طرفَي قطعة تعيّنان محورها.',
      check: 'الاختبار يتحقّق أنّ $(AI)$ عمودي على $[HK]$ في منتصفه وأنّ $AH=AK$.',
      commonError: 'محاولة برهان $AH=AK$ هنا؛ وهي مقبولة من المصدر لمبرهنة لاحقة.',
      diagram: '$(AI)$ محور $[HK]$.',
      extra: [fig16ProofSolution],
    }),
    record({
      id: 'l16-sol-p62-proof-6',
      reference: 'صفحة ٦٢ — الإثبات ⑥ (حلّ من إعداد المنصّة)',
      question: L16_PROOF_6,
      given: '$(AI)$ محور $[HK]$، و$AH=AK$.',
      steps: [
        'في المثلث $AHK$ المتساوي الساقين في $A$ ($AH=AK$)، محور القاعدة $[HK]$ المارّ بـ $A$ هو منصّف زاوية الرأس $\\widehat{HAK}=\\widehat{A}$.',
        'إذن $(AI)$ منصّف الزاوية $\\widehat{A}$؛ فتتلاقى المنصفات الثلاثة في $I$.',
      ],
      rule: 'المثلث المتساوي الساقين: محور القاعدة منصّف زاوية الرأس.',
      check: 'الاختبار يتحقّق أنّ $(AI)$ يقسم $\\widehat{A}$ إلى نصفين متساويين.',
      commonError: 'الخلط بين محور $[HK]$ ومنصّف $\\widehat{A}$ دون ربطهما بتساوي الساقين.',
      diagram: '$(AI)$ يقسم $\\widehat{A}$ إلى نصفين متساويين.',
      extra: [fig16ProofSolution],
    }),
    record({
      id: 'l16-sol-p62-proof-7',
      reference: 'صفحة ٦٢ — الإثبات ⑦ (حلّ من إعداد المنصّة)',
      question: L16_PROOF_7,
      given: '$I$ متساوية البعد عن $L,H,K$.',
      steps: [
        'نرسم الدائرة $\\mathcal{C}$ مركزها $I$ ونصف قطرها $IL$.',
        'لأنّ $IH=IL=IK$ تمرّ الدائرة بـ $L$ و$H$ و$K$.',
        'ولأنّ $IL\\perp(BC)$ و$IH\\perp(AB)$ و$IK\\perp(AC)$، تمسّ الدائرة الأضلاع الثلاثة داخلاً (💡).',
      ],
      rule: EQUIDIST_RULE,
      check: 'الاختبار يتحقّق أنّ نصف القطر $IL$ يساوي بعد $I$ عن كلّ ضلع (تماس).',
      commonError: 'رسم دائرة تمرّ بالرؤوس بدل التماس مع الأضلاع.',
      diagram: 'الدائرة مركزها $I$ تمسّ الأضلاع في $L,H,K$.',
      extra: [fig16ProofSolution, fig16Properties],
    }),
    record({
      id: 'l16-sol-p63-check',
      reference: 'صفحة ٦٣ — تحقّق من فهمك (حلّ من إعداد المنصّة)',
      question: L16_CHECK,
      given: '$BC=7$ cm، $\\widehat{CBA}=36^\\circ$، $\\widehat{BCA}=64^\\circ$.',
      steps: [
        'نرسم $[BC]$ بطول 7 cm، وعند $B$ زاوية $36^\\circ$ وعند $C$ زاوية $64^\\circ$؛ يتقاطع الضلعان في $A$.',
        '$\\widehat{A}=180-36-64=80^\\circ$.',
        'نرسم منصفات الزوايا الثلاث فتتلاقى في $I$ مركز الدائرة الداخلية.',
      ],
      rule: CONCURRENCE_RULE,
      check:
        'الاختبار يتحقّق $BC=7$ و$\\widehat{B}=36^\\circ$ و$\\widehat{C}=64^\\circ$ و$\\widehat{A}=80^\\circ$ والتلاقي.',
      commonError: 'خلط الزاويتين $B$ و$C$ (36 عند $B$ و64 عند $C$).',
      diagram: 'المثلث بمعطياته ومنصفاته تتلاقى في $I$.',
      extra: [fig16CheckSolution],
    }),
    record({
      id: 'l16-sol-p63-practice-1',
      reference: 'صفحة ٦٣ — تدرّب ① (حلّ من إعداد المنصّة)',
      question: L16_PRACTICE_1,
      given:
        '$C$ مركز الدائرة الداخلية في $ERT$؛ $\\widehat{CRT}=25^\\circ$، $\\widehat{CTR}=31^\\circ$.',
      steps: [
        '$C$ مركز الدائرة الداخلية، فـ $[RC)$ منصّف $\\widehat{R}$ و$[TC)$ منصّف $\\widehat{T}$.',
        '$\\widehat{R}=2\\times\\widehat{CRT}=2\\times25=50^\\circ$، و$\\widehat{T}=2\\times\\widehat{CTR}=2\\times31=62^\\circ$.',
        '$\\widehat{RET}=180-\\widehat{R}-\\widehat{T}=180-50-62=68^\\circ$.',
      ],
      rule: ANGLE_SUM_RULE,
      check:
        'الاختبار يتحقّق $\\widehat{R}=50^\\circ$ و$\\widehat{T}=62^\\circ$ و$\\widehat{RET}=68^\\circ$.',
      commonError: 'استعمال 25 و31 كزاويتين كاملتين بدل نصفَيهما.',
      diagram: 'المنصّفان $[RC)$ و$[TC)$ والزاوية $\\widehat{RET}=68^\\circ$.',
      extra: [fig16PracticeOneGiven, fig16PracticeOneSolution],
    }),
    record({
      id: 'l16-sol-p63-practice-2-intro',
      reference: 'صفحة ٦٣ — تدرّب ②: المعطى (حلّ من إعداد المنصّة)',
      question: L16_PRACTICE_2_INTRO,
      given: '$\\widehat{ABC}=84^\\circ$، $\\widehat{ACB}=62^\\circ$، $J$ تلاقي منصّفيهما.',
      steps: [
        'نرسم المثلث $ABC$ بالزاويتين المعطاتين.',
        'نرسم منصّفَي $\\widehat{B}$ و$\\widehat{C}$ ونرمز لتقاطعهما بـ $J$ (مركز الدائرة الداخلية).',
      ],
      rule: CONCURRENCE_RULE,
      check: 'الاختبار يتحقّق أنّ $J$ مركز الدائرة الداخلية (تلاقي المنصّفين).',
      commonError: 'أخذ $J$ تقاطع متوسطَين أو ارتفاعَين بدل المنصّفين.',
      diagram: 'المنصّفان من $B$ و$C$ يتقاطعان في $J$.',
      extra: [fig16PracticeTwoGiven],
    }),
    record({
      id: 'l16-sol-p63-practice-2-1',
      reference: 'صفحة ٦٣ — تدرّب ② ① (حلّ من إعداد المنصّة)',
      question: L16_PRACTICE_2_1,
      given: 'المعطى؛ المطلوب رسم شكل متفق معه.',
      steps: [
        'نرسم $ABC$ بـ $\\widehat{B}=84^\\circ$ و$\\widehat{C}=62^\\circ$، ومنصّفَيهما يتقاطعان في $J$.',
        'نصل $J$ بـ $A$ لتكوين المثلثات $JAB,JBC,JCA$.',
      ],
      rule: BISECTOR_RULE,
      check: 'الشكل يحقّق المعطيات بالحساب (`lesson-16-geometry.ts`).',
      commonError: 'رسم مثلث خاصّ يخفي عموم النتيجة.',
      diagram: 'المثلث $ABC$ و$J$ والمنصفات.',
      extra: [fig16PracticeTwoGiven],
    }),
    record({
      id: 'l16-sol-p63-practice-2-2',
      reference: 'صفحة ٦٣ — تدرّب ② ② (حلّ من إعداد المنصّة)',
      question: L16_PRACTICE_2_2,
      given: '$\\widehat{B}=84^\\circ$، $\\widehat{C}=62^\\circ$.',
      steps: ['مجموع زوايا المثلث $180^\\circ$.', '$\\widehat{BAC}=180-84-62=34^\\circ$.'],
      rule: ANGLE_SUM_RULE,
      check: 'الاختبار يتحقّق $\\widehat{BAC}=34^\\circ$.',
      commonError: 'جمع خاطئ أو استعمال نصف الزاوية.',
      diagram: 'الزاوية $\\widehat{A}=34^\\circ$.',
      extra: [fig16PracticeTwoSolution],
    }),
    record({
      id: 'l16-sol-p63-practice-2-3',
      reference: 'صفحة ٦٣ — تدرّب ② ③ (حلّ من إعداد المنصّة)',
      question: L16_PRACTICE_2_3,
      given:
        '$\\widehat{A}=34^\\circ$، $\\widehat{B}=84^\\circ$، $\\widehat{C}=62^\\circ$؛ $J$ تلاقي المنصّفين.',
      steps: [
        'أنصاف الزوايا: $\\widehat{A}/2=17^\\circ$، $\\widehat{B}/2=42^\\circ$، $\\widehat{C}/2=31^\\circ$.',
        'المثلث $JAB$: عند $A$ نصف $\\widehat{A}=17^\\circ$، وعند $B$ نصف $\\widehat{B}=42^\\circ$، وعند $J$ $=180-17-42=121^\\circ$.',
        'المثلث $JBC$: عند $B$ $42^\\circ$، وعند $C$ $31^\\circ$، وعند $J$ $=180-42-31=107^\\circ$.',
        'المثلث $JCA$: عند $C$ $31^\\circ$، وعند $A$ $17^\\circ$، وعند $J$ $=180-31-17=132^\\circ$.',
        'تحقّق: مجموع الزوايا حول $J$ $=121+107+132=360^\\circ$.',
      ],
      rule: ANGLE_SUM_RULE,
      check: 'الاختبار يتحقّق زوايا المثلثات الثلاثة ومجموع الزوايا حول $J$ يساوي $360^\\circ$.',
      commonError: 'استعمال الزوايا الكاملة بدل أنصافها عند $J$.',
      diagram: 'زوايا $JAB,JBC,JCA$ ومجموع الزوايا حول $J$.',
      extra: [fig16PracticeTwoSolution],
    }),
  ],
};
