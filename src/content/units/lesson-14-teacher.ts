import type { ContentBlock, TeacherResourcesInput, TeacherSolution } from '../schema';
import {
  fig14ActivityGiven,
  fig14CheckSolution,
  fig14ExampleOneSolution,
  fig14ExampleTwoSolution,
  fig14PracticeFourGiven,
  fig14PracticeFourSolution,
  fig14PracticeOneGiven,
  fig14PracticeOneSolution,
  fig14PracticeTwoGiven,
  fig14PracticeTwoSolution,
  fig14ProofBisectors,
  fig14ProofGiven,
  fig14SpecialCases,
} from './lesson-14-figures';
import {
  L14_ACTIVITY_1,
  L14_CHECK,
  L14_EXAMPLE_1,
  L14_EXAMPLE_1_SOLUTION,
  L14_EXAMPLE_2,
  L14_EXAMPLE_2_SOLUTION,
  L14_PRACTICE_1,
  L14_PRACTICE_2,
  L14_PRACTICE_4_1,
  L14_PRACTICE_4_2,
  L14_PRACTICE_4_3,
  L14_PRACTICE_4_INTRO,
  L14_PROOF_1,
  L14_PROOF_2,
  L14_PROOF_3,
  L14_PROOF_4,
  L14_PROOF_5,
  L14_PROOF_CONCLUDE,
  L14_SPECIAL_PANEL_CAPTIONS,
} from './lesson-14-questions';

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

const CONCURRENCE_RULE =
  'خاصّة الصفحة ٥٧: الارتفاعات الثلاثة في المثلث تلتقي في نقطة واحدة $H$ (مركز التعامد)؛ ويكفي رسم ارتفاعين لتعيينها.';

const MUTUAL_RULE =
  'خاصّة الرؤوس الأربعة: إذا كان $H$ مركز تعامد $ABC$ فإنّ $(AH)\\perp(BC)$ و$(BH)\\perp(AC)$ و$(CH)\\perp(AB)$؛ فكلّ رأس من $A,B,C,H$ هو مركز تعامد المثلث المؤلّف من الثلاثة الأخرى.';

/**
 * ============================================================================
 *  UNIT 3, LESSON 2 — TEACHER RESOURCES & DERIVED SOLUTIONS
 * ============================================================================
 *
 *  Covers every printed prompt of pages 56–58. The two examples print their
 *  solutions («الحل»); those are reproduced verbatim and labelled as printed.
 *  The activity, the proof, «تحقّق من فهمك» and «تدرّب» print no solution, so
 *  every solution below for them is DERIVED BY THE PLATFORM and labelled as
 *  such in its `reference`. See `docs/UNIT-03-LESSON-02-FIGURES.md`.
 * ============================================================================
 */
export const lesson14TeacherResources: TeacherResourcesInput = {
  notes: [
    {
      type: 'callout',
      variant: 'note',
      title: 'ما تطبعه الصفحات وما لا تطبعه',
      blocks: [
        p(
          'الصفحة ٥٦ تطبع النشاط والإثبات وتعريف الارتفاع مع 💡. والصفحة ٥٧ تطبع الخاصة في ثلاث لوحات، وفقرة «اكتساب معارف»، ومثالَين لكلٍّ منهما حلّ مطبوع. والصفحة ٥٨ تطبع حل المثال 2 و«تحقّق من فهمك» و«تدرّب». والصفحات لا تتضمّن أي إجابات مطبوعة للأسئلة عدا المثالَين؛ فللمثالَين حلّ مطبوع ننقله كما طُبع، وكلّ ما عداهما من حلول هذا القسم استنتاجي من إعداد المنصّة ولم يُنقل عن أيّ مصدر خارجي.',
        ),
      ],
    },
    {
      type: 'callout',
      variant: 'note',
      title: 'ترقيم اللوحات وترقيم تدرّب',
      blocks: [
        p(
          `لوحات الصفحة ٥٧ مطبوعة من اليمين إلى اليسار: ${L14_SPECIAL_PANEL_CAPTIONS.join(' / ')} — أي ① الحاد (يمينًا) و② المنفرج (وسطًا) و③ القائم (يسارًا). وكلّ أشكال الدرس تحفظ هذا الترتيب.`,
        ),
        p(
          'و«تدرّب» في الصفحة ٥٨ مطبوع ① ثم ② ثم ④ دون ③؛ أبقينا الترقيم كما طُبع ولم نُضف تمرينًا من عندنا.',
        ),
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'ملاحظة قراءة في الإثبات',
      blocks: [
        p(
          'تسمّي الصفحة ٥٦ الرباعيَين $MACB$ و$BACN$ وتطلب استنتاج $MA = AP$. الرباعي $MACB$ يعطي $MA = BC$، والرباعي الذي يعطي $AP = BC$ هو $ABCP$ (بالبرهان نفسه). والحل الاستنتاجي أدناه يصرّح بالسلسلة كاملة دون تغيير أيّ لفظ مطبوع. هذه ملاحظة قراءة موثّقة لا تصحيح مخفي.',
        ),
      ],
    },
  ],

  textbookSolutions: [
    /* ---- Page 56 — النشاط ---- */
    record({
      id: 'l14-sol-p56-activity',
      reference: 'صفحة ٥٦ — النشاط (حلّ من إعداد المنصّة: الصفحة لا تطبع الحلّ)',
      question: L14_ACTIVITY_1,
      given: 'ثلاث حالات: مثلث حاد الزوايا، ومثلث فيه زاوية منفرجة، ومثلث فيه زاوية قائمة.',
      steps: [
        'في كلّ حالة نرسم الارتفاعات الثلاثة: عمودًا من كلّ رأس على الضلع المقابل (ومدّ الضلع إن وقع القدم خارجه).',
        'في المثلث الحاد تتلاقى الارتفاعات داخل المثلث.',
        'في المثلث المنفرج تتلاقى خارج المثلث (بعد مدّ ضلعين).',
        'في المثلث القائم تتلاقى عند رأس الزاوية القائمة.',
        'الملاحظة المشتركة: الارتفاعات الثلاثة تتلاقى دائمًا في نقطة واحدة $H$.',
      ],
      rule: CONCURRENCE_RULE,
      check:
        'الإحداثيات في `lesson-14-geometry.ts` تحقّق التلاقي في الحالات الثلاث (الاختبار يتحقّق من مرور الارتفاعات الثلاثة بـ $H$).',
      commonError: 'اعتبار خروج $H$ في المنفرج خطأً في الرسم؛ وهو نتيجة صحيحة.',
      diagram:
        'اللوحات الثلاث تُظهر الارتفاعات الحمراء وزوايا قائمة عند الأقدام، وموضع $H$ في كلّ حالة.',
      extra: [fig14ActivityGiven, fig14SpecialCases],
    }),

    /* ---- Page 56 — الإثبات ---- */
    record({
      id: 'l14-sol-p56-proof-1',
      reference: 'صفحة ٥٦ — الإثبات ① (حلّ من إعداد المنصّة)',
      question: L14_PROOF_1,
      given: 'المثلث $ABC$ وثلاثة مستقيمات مارّة برؤوسه كلٌّ يوازي الضلع المقابل.',
      steps: [
        'نرسم عبر $A$ مستقيمًا يوازي $[BC]$، وعبر $B$ مستقيمًا يوازي $[AC]$، وعبر $C$ مستقيمًا يوازي $[AB]$.',
        'يتقاطع المارّ بـ $A$ مع المارّ بـ $B$ في $M$، ومع المارّ بـ $C$ في $P$؛ ويتقاطع المارّ بـ $B$ مع المارّ بـ $C$ في $N$.',
        'نحصل على المثلث $MNP$، وعلى المستقيم العلوي الترتيب $M$ ثم $A$ ثم $P$.',
      ],
      rule: 'التوازي: مستقيمان يوازيان الضلع نفسه يتقاطعان مع ثالث في رؤوس مثلث محيط.',
      check:
        'في `lesson-14-geometry.ts`: $M=A+B-C$، $N=B+C-A$، $P=A+C-B$؛ وكلّ ضلع من $MNP$ يوازي الضلع المقابل من $ABC$.',
      commonError: 'خلط ترتيب $M,A,P$ على المستقيم العلوي؛ $A$ بين $M$ و$P$.',
      diagram: 'المثلث $ABC$ (مظلّل) داخل المثلث $MNP$ ذي الأضلاع المتقطّعة الموازية.',
      extra: [fig14ProofGiven],
    }),
    record({
      id: 'l14-sol-p56-proof-2',
      reference: 'صفحة ٥٦ — الإثبات ② (حلّ من إعداد المنصّة)',
      question: L14_PROOF_2,
      given:
        'الرباعيان $MACB$ و$BACN$؛ المطلوب تبرير كونهما متوازيَي أضلاع واستنتاج $MA = AP$ وموقع $A$.',
      steps: [
        'في $MACB$: $(MA)\\parallel(BC)$ (المارّ بـ $A$ يوازي $[BC]$) و$(MB)\\parallel(AC)$ (المارّ بـ $B$ يوازي $[AC]$)؛ فهو متوازي أضلاع، ومنه $MA = BC$.',
        'وبالبرهان نفسه الرباعي $ABCP$ متوازي أضلاع ($(AP)\\parallel(BC)$ و$(AB)\\parallel(PC)$)، ومنه $AP = BC$.',
        'إذن $MA = BC = AP$، أي $MA = AP$؛ و$A$ تقع بين $M$ و$P$، فهي منتصف $[MP]$.',
      ],
      rule: 'متوازي الأضلاع: كلّ ضلعين متقابلين متوازيان ومتساويان.',
      check: 'الاختبار يتحقّق أنّ $A$ منتصف $[MP]$ وأنّ $MA = AP = BC$.',
      commonError:
        'الاكتفاء بـ $MACB$ وحده لاستنتاج $MA=AP$؛ يلزم الرباعي الثاني ($ABCP$) لـ $AP=BC$.',
      diagram: 'العلامات على $[MA]$ و$[AP]$ متماثلة (منتصف)، وعلى أضلاع $MNP$.',
      extra: [fig14ProofBisectors],
    }),
    record({
      id: 'l14-sol-p56-proof-3',
      reference: 'صفحة ٥٦ — الإثبات ③ (حلّ من إعداد المنصّة)',
      question: L14_PROOF_3,
      given: 'الطريقة نفسها للنقطتين $B$ و$C$.',
      steps: [
        'بالنسبة إلى $B$: الرباعي $MACB$ يعطي $MB = AC$ (ضلعاه المتقابلان $[AC]$ و$[MB]$)، والرباعي $BACN$ يعطي $BN = AC$؛ إذن $MB = BN$ و$B$ منتصف $[MN]$.',
        'بالنسبة إلى $C$: بالبرهان نفسه $NC = CP$ و$C$ منتصف $[NP]$.',
      ],
      rule: 'متوازي الأضلاع + تعريف المنتصف.',
      check: 'الاختبار يتحقّق أنّ $B$ منتصف $[MN]$ و$C$ منتصف $[NP]$ ($MB=BN$، $NC=CP$).',
      commonError: 'نسيان أنّ المنتصفات الثلاث معًا هي ما يربط $ABC$ بـ $MNP$.',
      diagram: 'علامات التنصيف على $[MN]$ عند $B$ وعلى $[NP]$ عند $C$.',
      extra: [fig14ProofBisectors],
    }),
    record({
      id: 'l14-sol-p56-proof-4',
      reference: 'صفحة ٥٦ — الإثبات ④ (حلّ من إعداد المنصّة)',
      question: L14_PROOF_4,
      given: 'المثلث $MNP$؛ المطلوب رسم محاور أضلاعه ونقطة تلاقيها $H$.',
      steps: [
        'نرسم محاور أضلاع $MNP$ الثلاثة (عمود في منتصف كلّ ضلع).',
        'بحكم درس المحور تتلاقى المحاور في نقطة واحدة نرمز إليها بـ $H$.',
      ],
      rule: 'خاصّة المحور (الدرس الأول): محاور أضلاع مثلث تتلاقى في نقطة واحدة.',
      check:
        'الاختبار يتحقّق أنّ $H$ يبعد بالمسافة نفسها عن $M$ و$N$ و$P$ (مركز الدائرة المارّة برؤوس $MNP$).',
      commonError: 'رسم محورٍ دون شرطَي العمودية والتنصيف معًا.',
      diagram: 'المحاور الثلاثة (الملوّنة) تتلاقى في $H$.',
      extra: [fig14ProofBisectors],
    }),
    record({
      id: 'l14-sol-p56-proof-5',
      reference: 'صفحة ٥٦ — الإثبات ⑤ (حلّ من إعداد المنصّة)',
      question: L14_PROOF_5,
      given: 'محاور أضلاع $MNP$؛ المطلوب وصفها بالنسبة إلى $ABC$.',
      steps: [
        'محور $[MP]$ عمودي على $(MP)$ في منتصفه $A$؛ و$(MP)\\parallel(BC)$، فهو عمودي على $(BC)$ ومارّ بـ $A$: إنّه الارتفاع من $A$.',
        'وبالمثل محور $[MN]$ هو الارتفاع من $B$، ومحور $[NP]$ هو الارتفاع من $C$.',
        'إذن محاور أضلاع $MNP$ هي ارتفاعات $ABC$.',
      ],
      rule: 'مستقيم عمودي على أحد مستقيمين متوازيين يكون عموديًا على الآخر.',
      check: 'الاختبار يتحقّق أنّ كلّ محور من $MNP$ مارّ برأس من $ABC$ وعمودي على ضلعه المقابل.',
      commonError: 'عدم ربط التوازي $(MP)\\parallel(BC)$ بالعمودية على $(BC)$.',
      diagram: 'كلّ محور يمرّ برأس من $ABC$ وعليه زاوية قائمة مع الضلع المقابل.',
      extra: [fig14ProofBisectors],
    }),
    record({
      id: 'l14-sol-p56-proof-conclude',
      reference: 'صفحة ٥٦ — الإثبات: نصّ الخاصة (حلّ من إعداد المنصّة)',
      question: L14_PROOF_CONCLUDE,
      given: 'المحاور هي الارتفاعات وتتلاقى في $H$.',
      steps: [
        'بما أنّ محاور أضلاع $MNP$ تتلاقى في نقطة واحدة، وبما أنّها ارتفاعات $ABC$، فإنّ ارتفاعات $ABC$ تتلاقى في نقطة واحدة.',
        'نصّ الخاصة: «الارتفاعات الثلاثة في المثلث تلتقي في نقطة واحدة $H$.»',
      ],
      rule: CONCURRENCE_RULE,
      check: 'التلاقي محقّق بالحساب في الحالات الثلاث (`lesson-14-geometry.test.ts`).',
      commonError: 'صياغة الخاصة على أنّها حالة خاصة (مثلث حادّ فقط)؛ وهي عامة لكلّ مثلث.',
      diagram: 'اللوحات الثلاث تؤكّد الخاصة في الحاد والمنفرج والقائم.',
      extra: [fig14SpecialCases],
    }),

    /* ---- Page 57 — مثال 1 (حلّ مطبوع) ---- */
    record({
      id: 'l14-sol-p57-example-1',
      reference: 'صفحة ٥٧ — مثال 1 (الحل مطبوع في الصفحة)',
      question: L14_EXAMPLE_1,
      given: 'مثلث $ABC$ زاويته $\\widehat{A}$ منفرجة.',
      steps: [
        'نرسم الارتفاع من $A$: عمودًا على $(BC)$.',
        'نرسم الارتفاع من $B$: عمودًا على $(CA)$، ولوقوع قدمه خارج $[CA]$ نمدّد نصف المستقيم $[CA)$ بعد $A$.',
        'يتقاطع الارتفاعان في $H$، وهي نقطة تلاقي الارتفاعات، وتقع خارج المثلث.',
      ],
      rule: CONCURRENCE_RULE,
      check: `الحل المطبوع: «${L14_EXAMPLE_1_SOLUTION}» — ويطابقه الحساب: $H$ خارج المثلث.`,
      commonError: 'رسم ارتفاع $B$ على $[CA]$ دون مدّه، فيقع القدم خطأً داخل الضلع.',
      diagram: 'الارتفاعان من $A$ و$B$، والضلع $[CA)$ ممدّد متقطّعًا، و$H$ تحت $A$.',
      extra: [fig14ExampleOneSolution],
    }),

    /* ---- Pages 57–58 — مثال 2 (حلّ مطبوع) ---- */
    record({
      id: 'l14-sol-p58-example-2',
      reference: 'صفحتا ٥٧–٥٨ — مثال 2 (الحل مطبوع في صفحة ٥٨)',
      question: L14_EXAMPLE_2,
      given: '$[AL]$ و$[CK]$ ارتفاعان في $ABC$ يتقاطعان في $H$.',
      steps: [
        'في المثلث $AHC$: $(CH)$ هو حامل الارتفاع $[CK]$، وهو عمودي على $(AB)$؛ إذن $[AB]$ هو الارتفاع من $A$.',
        '$(AH)$ هو حامل الارتفاع $[AL]$، وهو عمودي على $(CB)$؛ إذن $[CB]$ هو الارتفاع من $C$.',
        'الارتفاعان $[AB]$ و$[CB]$ يتقاطعان في $B$؛ فنقطة تلاقي ارتفاعات $AHC$ هي $B$.',
      ],
      rule: MUTUAL_RULE,
      check: `الحل المطبوع: «${L14_EXAMPLE_2_SOLUTION}» — ويطابقه الحساب: مركز تعامد $AHC$ هو $B$.`,
      commonError: 'البحث عن ارتفاعين جديدين بدل استثمار التعامدات القائمة أصلًا.',
      diagram: '$[AB]$ و$[CB]$ مظلّلان كارتفاعَي $AHC$، يتقاطعان في $B$.',
      extra: [fig14ExampleTwoSolution],
    }),

    /* ---- Page 58 — تحقّق من فهمك ---- */
    record({
      id: 'l14-sol-p58-check',
      reference: 'صفحة ٥٨ — تحقّق من فهمك (حلّ من إعداد المنصّة)',
      question: L14_CHECK,
      given: '$\\widehat{B} = 120^\\circ$، $BA = 5\\ \\text{cm}$، $BC = 4\\ \\text{cm}$.',
      steps: [
        'نرسم $[BC]$ بطول 4 cm، وعند $B$ زاوية $120^\\circ$، وعلى ضلعها الثاني $[BA]$ بطول 5 cm.',
        'المثلث منفرج في $B$؛ نرسم ارتفاعين (من $A$ ومن $C$ مثلًا) ومدّ الضلعين إن لزم.',
        'نقطة تقاطعهما $H$ تقع خارج المثلث، وهي مركز التعامد المطلوب.',
      ],
      rule: CONCURRENCE_RULE,
      check:
        'الاختبار يتحقّق أنّ $\\widehat{B}=120^\\circ$ و$BA=5$ و$BC=4$ وأنّ $H$ خارج المثلث والتلاقي محقّق.',
      commonError: 'توقّع $H$ داخل المثلث رغم أنّ الزاوية $B$ منفرجة.',
      diagram: 'المثلث المنفرج في $B$ وارتفاعاته تتلاقى في $H$ خارجه.',
      extra: [fig14CheckSolution],
    }),

    /* ---- Page 58 — تدرّب ① ---- */
    record({
      id: 'l14-sol-p58-practice-1',
      reference: 'صفحة ٥٨ — تدرّب ① (حلّ من إعداد المنصّة)',
      question: L14_PRACTICE_1,
      given: 'مثلث $ABC$ ومركز تعامده $H$.',
      steps: [
        'من التعامدات $(AH)\\perp(BC)$، $(BH)\\perp(AC)$، $(CH)\\perp(AB)$ نستنتج أنّ كلّ رأس من الأربع مركز تعامد مثلث الثلاثة الأخرى.',
        'مركز تعامد $AHB$ هو $C$؛ ومركز تعامد $AHC$ هو $B$؛ ومركز تعامد $BHC$ هو $A$.',
      ],
      rule: MUTUAL_RULE,
      check: 'الاختبار يتحقّق أنّ مراكز تعامد $AHB,AHC,BHC$ هي $C,B,A$ على الترتيب.',
      commonError: 'إجابة واحدة للمثلثات الثلاثة بدل تمييز كلّ مثلث برأسه المقابل.',
      diagram: 'القطع $[HA],[HB],[HC]$ متقطّعة، وكلّ رأس موسوم بمركز تعامد المثلث المقابل.',
      extra: [fig14PracticeOneGiven, fig14PracticeOneSolution],
    }),

    /* ---- Page 58 — تدرّب ② ---- */
    record({
      id: 'l14-sol-p58-practice-2',
      reference: 'صفحة ٥٨ — تدرّب ② (حلّ من إعداد المنصّة)',
      question: L14_PRACTICE_2,
      given: '$[BE]$ و$[CF]$ ارتفاعان يتقاطعان في $J$، و$[AJ]$ مرسومة.',
      steps: [
        '$(BJ)$ حامل $[BE]$ عمودي على $(AC)$؛ إذن $[AC]$ ارتفاع من $A$ في المثلث $AJB$.',
        '$(AJ)$ عمودي على $(BC)$ (لأنّ $J$ مركز تعامد $ABC$)؛ إذن $[BC]$ ارتفاع من $B$ في $AJB$.',
        'يتقاطع $[AC]$ و$[BC]$ في $C$؛ فنقطة تلاقي ارتفاعات $AJB$ هي $C$.',
      ],
      rule: MUTUAL_RULE,
      check: 'الاختبار يتحقّق أنّ مركز تعامد $AJB$ هو $C$.',
      commonError: 'اعتبار $J$ مركز تعامد $AJB$؛ وهو رأس منه لا مركزه.',
      diagram: '$[AC]$ و$[BC]$ مظلّلان كارتفاعَي $AJB$ يتقاطعان في $C$.',
      extra: [fig14PracticeTwoGiven, fig14PracticeTwoSolution],
    }),

    /* ---- Page 58 — تدرّب ④ ---- */
    record({
      id: 'l14-sol-p58-practice-4-intro',
      reference: 'صفحة ٥٨ — تدرّب ④: المعطى (حلّ من إعداد المنصّة)',
      question: L14_PRACTICE_4_INTRO,
      given:
        '$ABCD$ مستطيل مركزه $O$؛ العمود من $O$ على $(AC)$ يلاقي $(DC)$ في $N$ و$(AD)$ في $M$.',
      steps: [
        'نرسم المستطيل $ABCD$ وقطريه فيتقاطعان في المركز $O$.',
        'نرسم العمود من $O$ على $(AC)$؛ يلاقي $(DC)$ في $N$ (على القطعة) و$(AD)$ في $M$ (بعد $D$).',
      ],
      rule: 'المستطيل: قطراه متناصفان، وزواياه قوائم.',
      check:
        'الاختبار يتحقّق أنّ $O$ منتصف القطرين، وأنّ $(MN)\\perp(AC)$ و$N\\in[DC]$ و$M$ بعد $D$ على $(AD)$.',
      commonError: 'وضع $M$ على $[AD]$ داخل القطعة؛ وهو يقع بعد $D$ في هذا المستطيل ($a>b$).',
      diagram: 'المستطيل وقطراه والعمود $(MN)$ من $O$.',
      extra: [fig14PracticeFourGiven],
    }),
    record({
      id: 'l14-sol-p58-practice-4-1',
      reference: 'صفحة ٥٨ — تدرّب ④ ① (حلّ من إعداد المنصّة)',
      question: L14_PRACTICE_4_1,
      given: 'معطى النصّ؛ المطلوب رسم شكل متفق معه.',
      steps: [
        'نرسم $ABCD$ مستطيلًا، $O$ مركزه، والعمود من $O$ على $(AC)$ يقطع $(DC)$ في $N$ و$(AD)$ في $M$.',
        'نحصل على المثلث $AMC$ الذي سنبحث مركز تعامده.',
      ],
      rule: 'إنشاء مطابق للمعطى.',
      check: 'الشكل يحقّق كلّ المعطيات بالحساب (انظر `lesson-14-geometry.ts`).',
      commonError: 'رسم مثلث خاصّ (متساوي الساقين) يخفي عموم النتيجة.',
      diagram: 'المستطيل والمثلث $AMC$ والعمود $(MN)$.',
      extra: [fig14PracticeFourGiven],
    }),
    record({
      id: 'l14-sol-p58-practice-4-2',
      reference: 'صفحة ٥٨ — تدرّب ④ ② (حلّ من إعداد المنصّة)',
      question: L14_PRACTICE_4_2,
      given: 'المثلث $AMC$؛ المطلوب نقطة تلاقي ارتفاعاته.',
      steps: [
        '$(MN)$ عمودي على $(AC)$ ومارّ بـ $M$؛ فهو الارتفاع من $M$ في $AMC$.',
        'الضلع $(AM)$ هو نفسه $(AD)$ لأنّ $M\\in(AD)$؛ والعمود من $C$ على $(AD)$ هو $(CD)$ (زاوية المستطيل قائمة عند $D$). فهو الارتفاع من $C$ في $AMC$.',
        'الارتفاعان $(MN)$ و$(CD)$ يتقاطعان في $N$ (لأنّ $N\\in(DC)$ و$N\\in(MN)$)؛ فنقطة تلاقي ارتفاعات $AMC$ هي $N$.',
      ],
      rule: CONCURRENCE_RULE,
      check: 'الاختبار يتحقّق أنّ مركز تعامد $AMC$ هو $N$ بالضبط.',
      commonError: 'تخمين المركز دون إثبات تعامدَين مارّين به.',
      diagram: 'الارتفاعان $(MN)$ و$(CD)$ يتقاطعان في $N$.',
      extra: [fig14PracticeFourSolution],
    }),
    record({
      id: 'l14-sol-p58-practice-4-3',
      reference: 'صفحة ٥٨ — تدرّب ④ ③ (حلّ من إعداد المنصّة)',
      question: L14_PRACTICE_4_3,
      given: 'المثلث $AMC$ ومركز تعامده $N$؛ المطلوب الارتفاع الثالث.',
      steps: [
        'الارتفاع الثالث من $A$ عمودي على $(MC)$.',
        'بحكم الخاصّة يمرّ بمركز التعامد $N$؛ فهو المستقيم $(AN)$، وعمودي على $(MC)$.',
      ],
      rule: CONCURRENCE_RULE,
      check: 'الاختبار يتحقّق أنّ $(AN)\\perp(MC)$ وأنّه مارّ بـ $N$.',
      commonError: 'رسم الارتفاع الثالث دون التحقق من مروره بـ $N$ وعموديته على $(MC)$.',
      diagram: 'الارتفاع الثالث من $A$ (ملوّن) عمودي على $(MC)$ ويمرّ بـ $N$.',
      extra: [fig14PracticeFourSolution],
    }),
  ],
};
