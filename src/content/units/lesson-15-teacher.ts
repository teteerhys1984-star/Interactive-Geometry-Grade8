import type { ContentBlock, TeacherResourcesInput, TeacherSolution } from '../schema';
import {
  fig15CheckSolution,
  fig15ExampleOneSolution,
  fig15ExampleTwoSolution,
  fig15MeaningGiven,
  fig15PracticeCaseOneSolution,
  fig15PracticeCaseTwoSolution,
  fig15ProofGiven,
  fig15ProofSolution,
  fig15Properties,
  fig15TestGiven,
  fig15TestSolution,
} from './lesson-15-figures';
import {
  L15_CHECK,
  L15_EXAMPLE_1,
  L15_EXAMPLE_1_SOLUTION,
  L15_EXAMPLE_2,
  L15_EXAMPLE_2_SOLUTION,
  L15_PRACTICE_1_CASE1,
  L15_PRACTICE_1_CASE2,
  L15_PRACTICE_1_INTRO,
  L15_PROOF_1,
  L15_PROOF_2,
  L15_PROOF_3,
  L15_PROOF_4,
  L15_PROOF_5,
  L15_PROOF_6,
  L15_PROOF_7,
  L15_TEST_1,
  L15_TEST_2,
  L15_TEST_3,
} from './lesson-15-questions';

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

const MEDIAN_RULE =
  'تعريف المتوسط (صفحة ٦٠): المستقيم المارّ بأحد رؤوس المثلث ومنتصف الضلع المقابل لهذا الرأس.';
const CONCURRENCE_RULE =
  'خاصّة الصفحة ٦٠: المتوسطات الثلاثة تتلاقى في نقطة واحدة $G$ مركز ثقل المثلث؛ ويكفي رسم متوسطين لتعيينها.';
const RATIO_RULE =
  "خواص الصفحة ٦٠: $AG=\\frac{2}{3}AA'$ و$BG=\\frac{2}{3}BB'$ و$CG=\\frac{2}{3}CC'$؛ أي $AG=2GA'$ وهكذا (من الرأس).";
const MIDSEGMENT_RULE =
  'مبرهنة المنتصفين (الوحدة الثانية): المستقيم الواصل بين منتصفَي ضلعين في مثلث يوازي الضلع الثالث ويساوي نصفه.';

/**
 * ============================================================================
 *  UNIT 3, LESSON 3 — TEACHER RESOURCES & DERIVED SOLUTIONS (pages 59–61)
 * ============================================================================
 *  The two examples print their solutions (reproduced verbatim, labelled as
 *  printed). The activity/test, proof, check and practice print none; their
 *  solutions are platform-derived. See `docs/UNIT-03-LESSON-03-FIGURES.md`.
 * ============================================================================
 */
export const lesson15TeacherResources: TeacherResourcesInput = {
  notes: [
    {
      type: 'callout',
      variant: 'note',
      title: 'ما تطبعه الصفحات وما لا تطبعه',
      blocks: [
        p(
          'الصفحة ٥٩ تطبع النشاط ومعنى الكلمات والاختبار والإثبات وصندوق الفيزياء. والصفحة ٦٠ تطبع التعريف والخاصة والخواص وفقرة اكتساب معارف ومثالًا بحلّ مطبوع. والصفحة ٦١ تطبع مثالًا بحلّ مطبوع و«تحقّق من فهمك» و«تدرّب ①». والصفحات لا تتضمّن أي إجابات مطبوعة للأسئلة عدا المثالَين؛ فللمثالَين حلّ مطبوع ننقله كما طُبع، وكلّ ما عداهما استنتاجي من إعداد المنصّة ولم يُنقل عن أيّ مصدر خارجي.',
        ),
      ],
    },
    {
      type: 'callout',
      variant: 'note',
      title: 'ملاحظات قراءة موثّقة',
      blocks: [
        p(
          'سؤال الإثبات ③ يطبع $(BD)\\parallel(JG)$ و$BD=2JG$ (منتصفا المثلث $ABD$)؛ وهو $JG$ لا $IG$. وعلامات التنصيف في شكل الخواص (صفحة ٦٠) متمايزة لكلّ ضلع: عبّرنا عنها بـ 1 و3 و2 شرطةً على الترتيب $[AB]$ و$[AC]$ و$[BC]$، والمعنى (تنصيف كلّ ضلع) لم يتغيّر. ومثلثا الاختبار (صفحة ٥٩) مطبوعان دون تسمية، وسمّيناهما $ABC$ و$EFJ$ في أشكال الحلّ فقط كما يسمّيهما النصّ.',
        ),
      ],
    },
  ],
  textbookSolutions: [
    record({
      id: 'l15-sol-p59-test-1',
      reference: 'صفحة ٥٩ — الاختبار ① (حلّ من إعداد المنصّة)',
      question: L15_TEST_1,
      given: 'مثلثان مطبوعان دون تسمية؛ النصّ يسمّيهما $ABC$ و$EFJ$.',
      steps: [
        'نرسم المثلثين كما في الشكل (أيسرهما حادّ وأيمنهما منفرج).',
        'نسمّيهما $ABC$ و$EFJ$ كما في النصّ (التسمية إضافة تحريرية في شكل الحلّ).',
      ],
      rule: MEDIAN_RULE,
      check: 'الإحداثيات في `lesson-15-geometry.ts` تمثّل المثلثين.',
      commonError: 'نسبة التسمية إلى الشكل المطبوع؛ وهو مطبوع دون أسماء.',
      diagram: 'المثلثان كما طُبعًا، ثم موسومَين في شكل الحلّ.',
      extra: [fig15TestGiven, fig15TestSolution],
    }),
    record({
      id: 'l15-sol-p59-test-2',
      reference: 'صفحة ٥٩ — الاختبار ② (حلّ من إعداد المنصّة)',
      question: L15_TEST_2,
      given: 'المثلثان $ABC$ و$EFJ$.',
      steps: [
        'في كلّ مثلث نصل كلّ رأس بمنتصف الضلع المقابل: ثلاثة متوسطات.',
        'نرسم المتوسطات الثلاثة لكلٍّ من المثلثين.',
      ],
      rule: MEDIAN_RULE,
      check: 'كلّ متوسط يصل رأسًا بمنتصف الضلع المقابل بالحساب.',
      commonError: 'رسم متوسطَين فقط ونسيان الثالث.',
      diagram: 'المتوسطات الثلاثة في كلّ مثلث.',
      extra: [fig15TestSolution],
    }),
    record({
      id: 'l15-sol-p59-test-3',
      reference: 'صفحة ٥٩ — الاختبار ③ (حلّ من إعداد المنصّة)',
      question: L15_TEST_3,
      given: 'متوسطات كلّ مثلث.',
      steps: [
        'نلاحظ أنّ المتوسطات الثلاثة في كلّ مثلث تتلاقى في نقطة واحدة.',
        'هذه النقطة هي مركز ثقل المثلث $G$.',
      ],
      rule: CONCURRENCE_RULE,
      check: 'التلاقي محقّق بالحساب في المثلثين (`lesson-15-geometry.test.ts`).',
      commonError: 'توقّع عدم التلاقي في المثلث المنفرج؛ وهي تتلاقى دائمًا.',
      diagram: 'نقطة التلاقي $G$ في كلّ مثلث.',
      extra: [fig15TestSolution],
    }),
    record({
      id: 'l15-sol-p59-proof-1',
      reference: 'صفحة ٥٩ — الإثبات ① (حلّ من إعداد المنصّة)',
      question: L15_PROOF_1,
      given: '$I$ و$J$ منتصفا $[AC]$ و$[AB]$، $G=(BI)\\cap(CJ)$.',
      steps: [
        'نرسم المثلث $ABC$ ومنتصفَي $[AC]$ و$[AB]$ ($I$ و$J$).',
        'نرسم المتوسطين $(BI)$ و$(CJ)$ ونرمز لتقاطعهما بـ $G$.',
      ],
      rule: MEDIAN_RULE,
      check: 'الشكل يحقّق أنّ $I,J$ منتصفا الضلعين وأنّ $G$ على المتوسطين.',
      commonError: 'خلط $I$ و$J$ (كلٌّ على ضلعه).',
      diagram: 'المتوسطان $(BI)$ و$(CJ)$ يتقاطعان في $G$.',
      extra: [fig15ProofGiven],
    }),
    record({
      id: 'l15-sol-p59-proof-2',
      reference: 'صفحة ٥٩ — الإثبات ② (حلّ من إعداد المنصّة)',
      question: L15_PROOF_2,
      given: 'النقطة $G$.',
      steps: [
        'نرسم $D$ صورة $A$ بالتناظر مركزه $G$، فيكون $G$ منتصف $[AD]$.',
        'نرمز إلى تقاطع $(AD)$ و$(BC)$ بـ $K$.',
      ],
      rule: 'التناظر المركزي: الصورة تحقّق أنّ المركز منتصف القطعة الواصلة بين النقطة وصورتها.',
      check: 'الاختبار يتحقّق أنّ $G$ منتصف $[AD]$ وأنّ $K=(AD)\\cap(BC)$.',
      commonError: 'أخذ $D$ صورة $G$ بمركز $A$ بدل العكس.',
      diagram: '$D$ تحت $BC$، و$K$ على $[BC]$.',
      extra: [fig15ProofSolution],
    }),
    record({
      id: 'l15-sol-p59-proof-3',
      reference: 'صفحة ٥٩ — الإثبات ③ (حلّ من إعداد المنصّة)',
      question: L15_PROOF_3,
      given: 'المثلث $ABD$، $J$ منتصف $[AB]$ و$G$ منتصف $[AD]$.',
      steps: [
        'في المثلث $ABD$: $J$ منتصف $[AB]$ و$G$ منتصف $[AD]$.',
        'بمبرهنة المنتصفين: $(JG)\\parallel(BD)$ و$JG=\\frac{1}{2}BD$، أي $BD=2JG$.',
      ],
      rule: MIDSEGMENT_RULE,
      check: 'الاختبار يتحقّق $JG\\parallel BD$ و$BD=2JG$.',
      commonError: 'استعمال $IG$ بدل $JG$ في هذا المثلث.',
      diagram: 'القطعة $[JG]$ موازية لـ $[BD]$ ونصفها.',
      extra: [fig15ProofSolution],
    }),
    record({
      id: 'l15-sol-p59-proof-4',
      reference: 'صفحة ٥٩ — الإثبات ④ (حلّ من إعداد المنصّة)',
      question: L15_PROOF_4,
      given: 'المثلث $ACD$، $I$ منتصف $[AC]$ و$G$ منتصف $[AD]$.',
      steps: [
        'في المثلث $ACD$: $I$ منتصف $[AC]$ و$G$ منتصف $[AD]$.',
        'بمبرهنة المنتصفين: $(IG)\\parallel(CD)$ و$CD=2IG$.',
      ],
      rule: MIDSEGMENT_RULE,
      check: 'الاختبار يتحقّق $IG\\parallel CD$ و$CD=2IG$.',
      commonError: 'نسيان أنّ $G$ منتصف $[AD]$ في كلا المثلثين.',
      diagram: 'القطعة $[IG]$ موازية لـ $[CD]$ ونصفها.',
      extra: [fig15ProofSolution],
    }),
    record({
      id: 'l15-sol-p59-proof-5',
      reference: 'صفحة ٥٩ — الإثبات ⑤ (حلّ من إعداد المنصّة)',
      question: L15_PROOF_5,
      given: '$BD=2JG$ و$CD=2IG$ مع التوازيين.',
      steps: [
        'من $(JG)\\parallel(BD)$ و$(IG)\\parallel(CD)$ ينتج $(GC)\\parallel(BD)$ و$(GB)\\parallel(CD)$ (لأنّ $G,I,C$ و$G,J,B$ على استقامة واحدة).',
        'إذن $BGCD$ متوازي أضلاع؛ قطراه $[BC]$ و$[GD]$ يتناصفان في $K$.',
        'فـ $K$ منتصف $[BC]$، و$(AK)$ يصل $A$ بمنتصف $[BC]$: إنّه المتوسط الثالث.',
      ],
      rule: 'متوازي الأضلاع: قطراه متناصفان.',
      check: 'الاختبار يتحقّق أنّ $BGCD$ متوازي أضلاع وأنّ $K$ منتصف $[BC]$ و$[GD]$.',
      commonError: 'الاستنتاج أنّ $K$ منتصف دون إثبات التوازيين.',
      diagram: '$BGCD$ متوازي أضلاع قطراه يتناصفان في $K$.',
      extra: [fig15ProofSolution],
    }),
    record({
      id: 'l15-sol-p59-proof-6',
      reference: 'صفحة ٥٩ — الإثبات ⑥ (حلّ من إعداد المنصّة)',
      question: L15_PROOF_6,
      given: '$G$ منتصف $[AD]$ و$K$ منتصف $[GD]$.',
      steps: [
        '$G$ منتصف $[AD]$ فـ $AG=GD$؛ و$K$ منتصف $[GD]$ فـ $GK=\\frac{1}{2}GD=\\frac{1}{2}AG$، أي $AG=2GK$.',
        'وبالمثل في المتوازي: $BG=2GI$ و$CG=2GJ$.',
      ],
      rule: RATIO_RULE,
      check: 'الاختبار يتحقّق $AG=2GK$ و$BG=2GI$ و$CG=2GJ$.',
      commonError: 'قلب النسبة فتصبح $GK=2AG$.',
      diagram: 'الأجزاء على المتوسطات بنسبة 2:1 من الرأس.',
      extra: [fig15ProofSolution],
    }),
    record({
      id: 'l15-sol-p59-proof-7',
      reference: 'صفحة ٥٩ — الإثبات ⑦ (حلّ من إعداد المنصّة)',
      question: L15_PROOF_7,
      given: 'النتائج السابقة.',
      steps: [
        'المتوسطات الثلاثة تتلاقى في نقطة واحدة $G$ (مركز الثقل).',
        "تقع $G$ في نهاية الثلث الثاني من كلّ متوسط من الرأس: $AG=\\frac{2}{3}AA'$ وهكذا.",
      ],
      rule: CONCURRENCE_RULE,
      check: 'الخاصّتان محقّقتان بالحساب في أيّ مثلث.',
      commonError: 'صياغة الخاصة على أنّها حالة خاصة؛ وهي عامة.',
      diagram: 'المتوسطات الثلاثة والنسب 2/3.',
      extra: [fig15Properties],
    }),
    record({
      id: 'l15-sol-p60-example-1',
      reference: 'صفحة ٦٠ — مثال (الحل مطبوع في الصفحة)',
      question: L15_EXAMPLE_1,
      given: '$M$ منتصف $[BC]$، $G\\in[AM]$، $AG=2.4$ cm، $GM=1.2$ cm.',
      steps: [
        '$M$ منتصف $[BC]$ إذن $[AM]$ متوسط.',
        '$AG=2.4=2\\times1.2=2GM$، أي $AG=\\frac{2}{3}AM$.',
        'النقطة الواقعة في نهاية الثلث الثاني من متوسط من الرأس هي مركز الثقل؛ فـ $G$ مركز ثقل $ABC$.',
      ],
      rule: RATIO_RULE,
      check: `الحل المطبوع: «${L15_EXAMPLE_1_SOLUTION}» — ويطابقه الحساب: $AG=2GM$ و$G$ مركز الثقل.`,
      commonError: 'الاكتفاء بأنّ $G$ على المتوسط دون التحقق من النسبة.',
      diagram: '$[AM]$ متوسط و$G$ عليه بنسبة 2:1.',
      extra: [fig15ExampleOneSolution],
    }),
    record({
      id: 'l15-sol-p61-example-2',
      reference: 'صفحة ٦١ — مثال (الحل مطبوع في الصفحة)',
      question: L15_EXAMPLE_2,
      given: '$ABCD$ متوازي أضلاع مركزه $O$، $M$ منتصف $[AB]$، $G=(CM)\\cap(BD)$.',
      steps: [
        '$M$ منتصف $[AB]$ إذن $[CM]$ متوسط في $ABC$.',
        '$O$ منتصف $[AC]$ لأنّ قطري المتوازي متناصفان؛ إذن $[BO]$ متوسط آخر في $ABC$.',
        '$G$ تقاطع المتوسطين $[CM]$ و$[BO]$ (إذ $O\\in(BD)$)، فهو مركز ثقل $ABC$.',
      ],
      rule: CONCURRENCE_RULE,
      check: `الحل المطبوع: «${L15_EXAMPLE_2_SOLUTION}» — ويطابقه الحساب: $G$ مركز ثقل $ABC$.`,
      commonError: 'عدم ملاحظة أنّ $O$ منتصف $[AC]$ فيصير $[BO]$ متوسطًا.',
      diagram: '$[CM]$ و$[BO]$ متوسطان يتقاطعان في $G$.',
      extra: [fig15ExampleTwoSolution],
    }),
    record({
      id: 'l15-sol-p61-check',
      reference: 'صفحة ٦١ — تحقّق من فهمك (حلّ من إعداد المنصّة)',
      question: L15_CHECK,
      given: '$AB=7$ cm، $\\widehat{A}=70^\\circ$، $AC=8$ cm.',
      steps: [
        'نرسم $[AB]$ بطول 7 cm، وعند $A$ زاوية $70^\\circ$، وعلى ضلعها الثاني $[AC]$ بطول 8 cm.',
        'نرسم متوسطين (من $B$ ومن $C$ مثلًا).',
        'نقطة تقاطعهما $G$ هي مركز الثقل المطلوب.',
      ],
      rule: CONCURRENCE_RULE,
      check:
        'الاختبار يتحقّق $AB=7$ و$AC=8$ و$\\widehat{A}=70^\\circ$ وأنّ المتوسطات تتلاقى في $G$.',
      commonError: 'رسم ثلاثة متوسطات رغم كفاية اثنين.',
      diagram: 'المثلث بمعطياته ومتوسطاه يتقاطعان في $G$.',
      extra: [fig15CheckSolution],
    }),
    record({
      id: 'l15-sol-p61-practice-intro',
      reference: 'صفحة ٦١ — تدرّب ①: المقدّمة (حلّ من إعداد المنصّة)',
      question: L15_PRACTICE_1_INTRO,
      given: 'حالتان؛ المطلوب تعليل أنّ $G$ مركز ثقل $ABC$ في كلّ منهما.',
      steps: [
        'نبيّن في كلّ حالة أنّ $G$ نقطة تقاطع متوسطَين في $ABC$، أو أنّها تقع في نهاية الثلث الثاني من متوسط من الرأس.',
        'ثم نستنتج أنّها مركز الثقل.',
      ],
      rule: CONCURRENCE_RULE,
      check: 'الحالتان محقّقتان بالحساب في `lesson-15-geometry.ts`.',
      commonError: 'معالجة الحالة ② كال① دون استثمار تناصف القطرين.',
      diagram: 'الحالتان في شكليهما.',
      extra: [fig15MeaningGiven],
    }),
    record({
      id: 'l15-sol-p61-practice-case-1',
      reference: 'صفحة ٦١ — تدرّب ① الحالة ① (حلّ من إعداد المنصّة)',
      question: L15_PRACTICE_1_CASE1,
      given: '$M$ منتصف $[BC]$، $G\\in[AM]$، $AG=3.4$ cm، $GM=1.7$ cm.',
      steps: [
        '$[AM]$ متوسط لأنّ $M$ منتصف $[BC]$.',
        '$AG=3.4=2\\times1.7=2GM$، أي $AG=\\frac{2}{3}AM$.',
        'فـ $G$ مركز ثقل $ABC$.',
      ],
      rule: RATIO_RULE,
      check: 'الاختبار يتحقّق $AG=2GM$ وأنّ $G$ مركز الثقل.',
      commonError: 'عدم التحقق من النسبة والاكتفاء بالانتماء إلى المتوسط.',
      diagram: '$[AM]$ متوسط و$G$ عليه بنسبة 2:1.',
      extra: [fig15PracticeCaseOneSolution],
    }),
    record({
      id: 'l15-sol-p61-practice-case-2',
      reference: 'صفحة ٦١ — تدرّب ① الحالة ② (حلّ من إعداد المنصّة)',
      question: L15_PRACTICE_1_CASE2,
      given: '$AMCI$ متوازي أضلاع مركزه $J$، $I$ منتصف $[AB]$، $G=(BJ)\\cap(CI)$.',
      steps: [
        '$J$ مركز المتوازي فهو منتصف القطر $[AC]$؛ إذن $[BJ]$ متوسط في $ABC$.',
        '$I$ منتصف $[AB]$ إذن $[CI]$ متوسط في $ABC$.',
        '$G$ تقاطع المتوسطين $[BJ]$ و$[CI]$، فهو مركز ثقل $ABC$.',
      ],
      rule: CONCURRENCE_RULE,
      check: 'الاختبار يتحقّق أنّ $J$ منتصف $[AC]$ وأنّ $G$ مركز ثقل $ABC$.',
      commonError: 'عدم ملاحظة أنّ مركز المتوازي منتصف القطر $[AC]$.',
      diagram: '$[BJ]$ و$[CI]$ متوسطان يتقاطعان في $G$.',
      extra: [fig15PracticeCaseTwoSolution],
    }),
  ],
};
