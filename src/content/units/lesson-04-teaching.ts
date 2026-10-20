import type { LessonStepInput } from '../schema';
import {
  casesLabDiagram,
  kiteLabDiagram,
  practicePairsDiagram,
  proofLabDiagram,
  teacherCheckFigure,
} from './lesson-04-figures';

/**
 * ============================================================================
 *  الدرس الرابع — خطوات «شرح المنصّة» (ليست من الكتاب)
 * ============================================================================
 *
 *  Every step here carries `origin: 'authored'` and the badge «شرح المنصّة»,
 *  so a student can always tell the book's words from the platform's. Each one
 *  sits NEXT TO the printed step it explains and never reorders or replaces it.
 *
 *  The lesson's identity is «البصمة الثلاثية»: a triangle is pinned down by
 *  three well-chosen data, and a congruence proof is the act of matching those
 *  three data with their counterparts. The labs make the student *do* that
 *  matching instead of reading a finished conclusion.
 * ============================================================================
 */

const KICKER = 'شرح المنصّة';
const authored = 'authored' as const;

export const teachWhyCongruence: LessonStepInput = {
  id: 'teach-04-01-why-congruence',
  origin: authored,
  kicker: KICKER,
  title: 'التطابق: نفس العناصر لا نفس الشكل فقط',
  blocks: [
    {
      type: 'teaching',
      variant: 'concept',
      title: 'قصّ، أدر، أنطبق',
      blocks: [
        {
          type: 'paragraph',
          text: 'تخيّل أنك قصصت المثلث $ABC$ ووضعته فوق المثلث $A\'B\'C\'$؛ إن انطبق كل رأس على مقابله، وكل ضلع على مقابله، وكل زاوية على مقابلتها، فالرأس $A$ يقابل $A\'$ والضلع $[AB]$ يقابل $[A\'B\']$ والزاوية $\\widehat{BAC}$ تقابل $\\widehat{B\'A\'C\'}$. هذا هو معنى التطابق: تساوي العناصر المتقابلة كلها.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'اقرأ مقابلة الرؤوس أولاً: $A \\leftrightarrow A\'$ و$B \\leftrightarrow B\'$ و$C \\leftrightarrow C\'$.',
            'استخرج من المقابلة الأضلاع المتقابلة والزوايا المتقابلة.',
            'لا تحكم من مظهر الرسم: الرسم يساعد على القراءة، لكنه ليس دليلاً.',
          ],
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'pitfall',
      title: 'خطأ شائع: التشابه ليس تطابقاً',
      blocks: [
        {
          type: 'paragraph',
          text: 'إذا تساوت الزوايا الثلاث فقط، فقد يكون أحد المثلثين صورة مكبّرة للآخر: الزوايا تحدّد الشكل ولا تحدّد الحجم. التطابق يحتاج دائماً إلى ضلع واحد صحيح على الأقل، وهذا ما تفعله الحالات الثلاث في هذا الدرس.',
        },
      ],
    },
  ],
};

export const teachCasesLab: LessonStepInput = {
  id: 'teach-04-02-cases-lab',
  origin: authored,
  kicker: KICKER,
  title: 'المختبر: من المعطيات إلى الصورة',
  blocks: [
    {
      type: 'teaching',
      variant: 'concept',
      title: 'ثلاث بصمات تكفي',
      blocks: [
        {
          type: 'paragraph',
          text: 'المعطيات المطبوعة في النشاط هي ثلاث «بصمات» مختلفة. جرّبها واحدة واحدة: أكمل المثلث، ثم انقله بالانسحاب الذي ينقل $N$ إلى $M$، وراقب أطوال الصورة وقياسات زواياها. ستجد أن الصورة تطابق الأصل في الحالات الثلاث، لأن الانسحاب لا يغيّر الأطوال ولا الزوايا.',
        },
      ],
    },
    { type: 'figure', diagram: casesLabDiagram },
  ],
};

export const teachChoosingCase: LessonStepInput = {
  id: 'teach-04-03-choosing-case',
  origin: authored,
  kicker: KICKER,
  title: 'كيف أختار الحالة المناسبة؟',
  blocks: [
    {
      type: 'teaching',
      variant: 'concept',
      title: 'قارن المعطيات بالحالات',
      blocks: [
        {
          type: 'compare',
          title: 'المعطيات ← الحالة',
          columns: ['ما تعرفه', 'الحالة التي تستعملها'],
          rows: [
            ['ضلعان والزاوية بينهما', 'ضلعان والزاوية المحصورة'],
            ['ضلع والزاويتان عند طرفيه', 'ضلع وزاويتان مجاورتان'],
            ['الأضلاع الثلاثة', 'الأضلاع الثلاثة'],
            ['وتر وضلع قائمة في مثلثين قائمين', 'حالة خاصة للمثلثين القائمين'],
            ['وتر وزاوية حادة في مثلثين قائمين', 'حالة خاصة ثانية للمثلثين القائمين'],
          ],
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'why',
      title: 'لماذا كلمة «المحصورة» مهمة؟',
      blocks: [
        {
          type: 'paragraph',
          text: 'الزاوية المحصورة بين ضلعين هي الزاوية التي رأسها مشترك بينهما. لو أعطاك أحدهم ضلعين وزاوية غير محصورة، فقد ينشأ مثلثان مختلفان من المعطيات نفسها؛ لهذا لا تُعدّ تلك المعطيات حالة تطابق. وفي الحالة الثانية يجب أن تكون الزاويتان مجاورتين للضلع المعلوم، أي أن الضلع ضلعٌ في كل منهما.',
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'tip',
      title: 'ترتيب الحروف هو البرهان',
      collapsible: true,
      revealLabel: 'اعرض طريقة ضبط الترتيب',
      blocks: [
        {
          type: 'paragraph',
          text: 'اكتب دائماً المثلثين بترتيب رؤوس متقابلة: إذا كتبت $ABC \\cong DEF$ فأنت تقول إن $A \\leftrightarrow D$ و$B \\leftrightarrow E$ و$C \\leftrightarrow F$. كل مساواة تذكرها بعد ذلك يجب أن تحترم هذا الترتيب، وإلا صار البرهان غير منسجم مع النتيجة.',
        },
      ],
    },
  ],
};

export const teachCheckWalkthrough: LessonStepInput = {
  id: 'teach-04-04-check-walkthrough',
  origin: authored,
  kicker: KICKER,
  title: 'برهان على المستطيل: ثلاث طرائق',
  blocks: [
    {
      type: 'figure',
      diagram: teacherCheckFigure,
    },
    {
      type: 'teaching',
      variant: 'example',
      title: 'المطلوب: $ABD \\cong CDB$',
      blocks: [
        {
          type: 'paragraph',
          text: 'القطر $[BD]$ يقسم المستطيل إلى المثلثين $ABD$ و$CDB$. جرّب أن تثبت تطابقهما ثلاث مرات، مرة بكل حالة. لاحظ أن كل طريقة تستعمل معطيات مختلفة، وأن النتيجة واحدة.',
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'example',
      title: 'بالضلعان والزاوية المحصورة',
      collapsible: true,
      revealLabel: 'اكشف البرهان الأول',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            '$AB = DC$ لأن كل ضلعين متقابلين في المستطيل متساويان.',
            '$AD = BC$ للسبب نفسه.',
            '$\\widehat{DAB} = \\widehat{BCD} = 90^\\circ$ لأن زوايا المستطيل قائمة.',
            'إذن $ABD \\cong CDB$ بحالة ضلعين والزاوية المحصورة بينهما.',
          ],
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'example',
      title: 'بالضلع والزاويتين المجاورتين',
      collapsible: true,
      revealLabel: 'اكشف البرهان الثاني',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'الضلع $[BD]$ مشترك بين المثلثين.',
            '$\\widehat{ADB} = \\widehat{CBD} = 30^\\circ$ لأنهما زاويتان متبادلتان داخلياً بين المتوازيين $AD$ و$BC$.',
            'وبما أن $\\widehat{DAB} = 90^\\circ$ فإن $\\widehat{ABD} = 90^\\circ - 30^\\circ = 60^\\circ$، وبالمثل $\\widehat{CDB} = 60^\\circ$.',
            'إذن $ABD \\cong CDB$ بحالة ضلع والزاويتين المجاورتين له.',
          ],
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'example',
      title: 'بالأضلاع الثلاثة',
      collapsible: true,
      revealLabel: 'اكشف البرهان الثالث',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            '$AB = DC$ و$AD = BC$ لأن الأضلاع المتقابلة في المستطيل متساوية.',
            '$BD$ ضلع مشتركة.',
            'إذن $ABD \\cong CDB$ بحالة الأضلاع الثلاثة.',
          ],
        },
      ],
    },
  ],
};

export const teachKiteLab: LessonStepInput = {
  id: 'teach-04-05-kite-lab',
  origin: authored,
  kicker: KICKER,
  title: 'ابحث عن الأزواج في الطائرة الورقية',
  blocks: [
    {
      type: 'teaching',
      variant: 'concept',
      title: 'ابدأ من القطرين',
      blocks: [
        {
          type: 'paragraph',
          text: 'القطران $[AC]$ و$[BD]$ متعامدان في $E$، وكل قطر ينصّف الآخر: $BE = ED$ و$AE = 12$ و$CE = 6$. هذه المساواة هي مفتاح كل زوج متطابق، لأن الزاوية القائمة عند $E$ محصورة بين قطعتين متساويتين.',
        },
      ],
    },
    { type: 'figure', diagram: kiteLabDiagram },
  ],
};

export const teachPairsLab: LessonStepInput = {
  id: 'teach-04-06-pairs-lab',
  origin: authored,
  kicker: KICKER,
  title: 'علّل التطابق: أي حالة؟',
  blocks: [
    {
      type: 'teaching',
      variant: 'concept',
      title: 'من المعطيات إلى اسم الحالة',
      blocks: [
        {
          type: 'paragraph',
          text: 'لا تكتب «المثلثان متطابقان» فقط؛ اذكر الحالة التي تسمح لك بالحكم. المعطيات في كل زوج من التمرين ② مطبوعة على الشكل، فاقرأها أولاً ثم اختر الحالة، ثم راجع عملك كاملاً.',
        },
      ],
    },
    { type: 'figure', diagram: practicePairsDiagram },
  ],
};

export const teachProofLab: LessonStepInput = {
  id: 'teach-04-07-proof-lab',
  origin: authored,
  kicker: KICKER,
  title: 'برهان متسلسل في مثلث متساوي الساقين',
  blocks: [
    {
      type: 'teaching',
      variant: 'concept',
      title: 'كل خطوة تعتمد على ما قبلها',
      blocks: [
        {
          type: 'paragraph',
          text: 'في التمرين ③ تبدأ من $BM = MC$ و$\\widehat{B} = \\widehat{C}$، وتنتهي إلى أن $(AM)$ ارتفاع ومنصّف. بين البداية والنهاية أربع خطوات، كل واحدة تستعمل نتيجة الخطوة السابقة. راجع كل خطوة بعد الإجابة، ولا تعتمد على تماثل الرسم.',
        },
      ],
    },
    { type: 'figure', diagram: proofLabDiagram },
  ],
};

export const teachRecap: LessonStepInput = {
  id: 'teach-04-08-recap',
  origin: authored,
  kicker: KICKER,
  title: 'قائمة التحقّق قبل الاختبار',
  blocks: [
    {
      type: 'teaching',
      variant: 'summary',
      title: 'خمس نقاط تكفي',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'التطابق يعني تساوي كل العناصر المتقابلة، لا تشابه الشكل فقط.',
            'الحالات الثلاث: ضلعان والزاوية المحصورة؛ ضلع والزاويتان المجاورتان؛ الأضلاع الثلاثة.',
            'في المثلثين القائمين: الوتر وضلع قائمة، أو الوتر وزاوية حادة.',
            'اكتب الرؤوس بترتيب متقابل، واذكر الحالة صراحةً قبل النتيجة.',
            'الرسم يساعد على القراءة، لكن البرهان يقوم على المساواة المكتوبة.',
          ],
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'tip',
      title: 'تحقّق سريع من نفسك',
      collapsible: true,
      revealLabel: 'اعرض أسئلة التحقّق',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'هل الزاوية التي أعطيتَها محصورة فعلاً بين الضلعين المعلومين؟',
            'هل الزاويتان في الحالة الثانية مجاورتان للضلع المعلوم؟',
            'هل رتّبتَ الرؤوس في النتيجة كما رتّبتها في المساواة؟',
            'هل استعملتَ معطى مطبوعاً أو نتيجة مثبتة، لا مجرد مظهر الرسم؟',
          ],
        },
      ],
    },
  ],
};

/** All authored steps, in the order they interleave with the source steps. */
export const authoredSteps = {
  whyCongruence: teachWhyCongruence,
  casesLab: teachCasesLab,
  choosingCase: teachChoosingCase,
  checkWalkthrough: teachCheckWalkthrough,
  kiteLab: teachKiteLab,
  pairsLab: teachPairsLab,
  proofLab: teachProofLab,
  recap: teachRecap,
};
