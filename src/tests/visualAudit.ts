import type { TestQuestion } from './schema';

/**
 * ============================================================================
 *  VISUAL QUESTION AUDIT — all 200 authored Test Area questions
 * ============================================================================
 *
 *  A = a real figure is needed to read the stated spatial configuration.
 *  B = a figure materially helps orientation / correspondence, but text alone
 *      remains sufficient.
 *  C = text-only is the safer pedagogical choice: a diagram would repeat a
 *      direct rule, add unsupported geometry, or expose the result being tested.
 *
 *  The question IDs are generated from the fixed bank sizes, then each ID is
 *  assigned exactly once below. The audit test checks this inventory against
 *  the live registry and ensures every A question has a declarative figure.
 * ============================================================================
 */

export type VisualQuestionCategory = 'A' | 'B' | 'C';

export interface VisualQuestionAuditEntry {
  category: VisualQuestionCategory;
  rationale: string;
}

const bankIds = (prefix: string, count: number): string[] =>
  Array.from({ length: count }, (_, index) => `${prefix}-q${String(index + 1).padStart(2, '0')}`);

export const ALL_AUDITED_QUESTION_IDS = [
  ...Array.from({ length: 7 }, (_, index) =>
    bankIds(`geo-l${String(index + 1).padStart(2, '0')}-t01`, 20),
  ).flat(),
  ...bankIds('geo-u01-t01', 60),
];

export const FIGURE_REQUIRED_QUESTION_IDS = [
  'geo-l02-t01-q08',
  'geo-l03-t01-q16',
  'geo-l04-t01-q06',
  'geo-l04-t01-q08',
  'geo-l04-t01-q13',
  'geo-l04-t01-q15',
  'geo-l04-t01-q17',
  'geo-l05-t01-q03',
  'geo-l06-t01-q06',
  'geo-u01-t01-q19',
  'geo-u01-t01-q37',
] as const;

export const FIGURE_BENEFICIAL_QUESTION_IDS = [
  'geo-l01-t01-q10',
  'geo-l06-t01-q12',
  'geo-u01-t01-q38',
] as const;

const textOnlyRationaleByLesson: Record<string, string> = {
  'lesson-01-translation-and-properties':
    'النص يحدد المفهوم/المعطيات كاملة؛ الرسم هنا سيكرر الخاصية أو يرسم ترتيباً يكشف المطلوب.',
  'lesson-02-image-of-a-point':
    'الإحداثيات أو اتجاه الحركة معطيان نصاً؛ رسم الصورة سيكشف قيمة السؤال أو الاختيار المطلوب.',
  'lesson-03-image-of-a-shape':
    'السؤال يختبر قاعدة عامة لصورة الشكل؛ إظهار الصورة الناتجة سيعطي الخاصية محل الاختبار.',
  'lesson-04-triangle-congruence':
    'السؤال مفاهيمي أو حسابي مكتمل نصاً؛ بعض الرسوم المحتملة ستوحي بعلاقة غير معلّمة أو تكشف النتيجة.',
  'lesson-05-unit-one-exercises':
    'المعطيات كافية نصاً؛ رسم التحويل أو الرباعي الناتج سيحسم الاختيار بدلاً من اختبار التعليل.',
  'lesson-06-unit-one-exercises-continuation':
    'المسألة قاعدة أو حساب مكتمل؛ رسم النتيجة سيحوّل المظهر إلى دليل أو يكشف الإجابة.',
  'lesson-07-unit-one-exercises-final':
    'النص يكفي للاستدلال؛ إعادة رسم الخاصية أو علامة النتيجة ستتجاوز مهارة البرهان المقصودة.',
};

const textOnlyRationaleByQuestion: Record<string, string> = {
  'geo-l04-t01-q09':
    'المعطيات تحدد زاوية الرأس والتساوي؛ رسم دقيق سيُظهر قياس زاوية القاعدة المطلوب، لذا تكفي المعالجة النصية دون صورة كاشفة.',
  'geo-l05-t01-q17':
    'العلاقة بين الزاويتين تُستنتج من القائمة و35°؛ رسم مقيّس قد يُظهر 55° بصرياً، والنص كافٍ.',
  'geo-l07-t01-q07':
    'الرسم الدقيق لمستقيمين متوازيين سيجعل زاويتي التبادل الداخلي تبدوان متساويتين ويكشف حكم الصواب؛ النص وحده يكفي.',
  'geo-l07-t01-q19':
    'الرسم المضاد غير المتوازي سيُظهر اختلاف زاويتي التبادل الداخلي ويكشف الخطأ المطلوب شرحه؛ يُحفظ السؤال نصياً.',
  'geo-u01-t01-q16':
    'الأوضاع الثلاثة مكتوبة مباشرة في بنود التصنيف؛ رسمها داخل السؤال سيكشف إسناد كل بند إلى فئته.',
};

const requiredRationales: Record<(typeof FIGURE_REQUIRED_QUESTION_IDS)[number], string> = {
  'geo-l02-t01-q08':
    'تقاطع قوسي الفرجار له مرشحان مكانيان؛ يلزم إظهار المرشحين معاً دون تمييز الصحيح.',
  'geo-l03-t01-q16': 'التمييز بين مركز الدائرة ونقطة على محيطها هو موضع الخطأ الهندسي نفسه.',
  'geo-l04-t01-q06':
    'الشكلان المسمّيان ومعطيات الضلع والزاويتين المتناظرة تحتاج خريطة بصرية للمقابلة.',
  'geo-l04-t01-q08': 'القطر AC يقسم متوازي الأضلاع إلى المثلثين المطلوب تحليل عناصرهما.',
  'geo-l04-t01-q13':
    'الطائرة الورقية والقطر المشترك يحددان تكوين المثلثين؛ العلامات تقتصر على المساواة المعطاة.',
  'geo-l04-t01-q15': 'تحديد الوتر والضلع القائم المناظرين في مثلثين قائمين هو لبّ المقارنة.',
  'geo-l04-t01-q17':
    'موضع المثلثين المتقابلين عند تقاطع مستقيمين ضروري لقراءة الزاويتين المتقابلتين بالرأس.',
  'geo-l05-t01-q03': 'اتجاه المتجه داخل متوازي الأضلاع يعتمد على ترتيب الرؤوس المكاني.',
  'geo-l06-t01-q06': 'منصف الزاوية والضلع المشترك يحددان بنية البرهان في المثلثين المتجاورين.',
  'geo-u01-t01-q19': 'الإنشاء بالفرجار يعرض نقطتي تقاطع محتملتين؛ لا يُشار بصرياً إلى أي اختيار.',
  'geo-u01-t01-q37':
    'القطر AC يقسم الطائرة الورقية إلى مثلثين؛ العلامات لا تضيف إلا المساواة المذكورة.',
};

const beneficialRationales: Record<(typeof FIGURE_BENEFICIAL_QUESTION_IDS)[number], string> = {
  'geo-l01-t01-q10':
    'رسم تخطيطي لهيئتين متطابقتين مختلفتي الاتجاه يوضح معنى شرط التوازي دون علامة إجابة.',
  'geo-l06-t01-q12': 'مخطط متوازي الأضلاع والقطرين يساعد على تتبع خطوات البرهان دون علامات منتصف.',
  'geo-u01-t01-q38':
    'مثلث قائم تخطيطي يحمل المساحة والضلع المعطيين فقط ولا يضع قياساً للضلع المطلوب.',
};

const requiredSet = new Set<string>(FIGURE_REQUIRED_QUESTION_IDS);
const beneficialSet = new Set<string>(FIGURE_BENEFICIAL_QUESTION_IDS);
const allQuestionSet = new Set(ALL_AUDITED_QUESTION_IDS);

if (requiredSet.size !== FIGURE_REQUIRED_QUESTION_IDS.length) {
  throw new Error('Visual audit contains duplicate figure-required question IDs.');
}
if (beneficialSet.size !== FIGURE_BENEFICIAL_QUESTION_IDS.length) {
  throw new Error('Visual audit contains duplicate figure-beneficial question IDs.');
}
if ([...requiredSet].some((id) => beneficialSet.has(id))) {
  throw new Error('A question cannot be both figure-required and figure-beneficial.');
}
if (allQuestionSet.size !== ALL_AUDITED_QUESTION_IDS.length) {
  throw new Error('Visual audit question ID inventory contains duplicates.');
}

export const visualAuditByQuestion: ReadonlyMap<string, VisualQuestionAuditEntry> = new Map(
  ALL_AUDITED_QUESTION_IDS.map((id) => {
    const category: VisualQuestionCategory = requiredSet.has(id)
      ? 'A'
      : beneficialSet.has(id)
        ? 'B'
        : 'C';
    const questionLessonId = lessonIdForQuestionId(id);
    const rationale =
      category === 'A'
        ? requiredRationales[id as keyof typeof requiredRationales]
        : category === 'B'
          ? beneficialRationales[id as keyof typeof beneficialRationales]
          : (textOnlyRationaleByQuestion[id] ??
            textOnlyRationaleByLesson[questionLessonId] ??
            'النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.');
    return [id, { category, rationale }];
  }),
);

export function visualAuditCounts(
  questions: TestQuestion[],
): Record<VisualQuestionCategory, number> {
  const counts: Record<VisualQuestionCategory, number> = { A: 0, B: 0, C: 0 };
  for (const question of questions) {
    const entry = visualAuditByQuestion.get(question.id);
    if (entry) counts[entry.category] += 1;
  }
  return counts;
}

function lessonIdForQuestionId(id: string): string {
  if (id.startsWith('geo-l01-')) return 'lesson-01-translation-and-properties';
  if (id.startsWith('geo-l02-')) return 'lesson-02-image-of-a-point';
  if (id.startsWith('geo-l03-')) return 'lesson-03-image-of-a-shape';
  if (id.startsWith('geo-l04-')) return 'lesson-04-triangle-congruence';
  if (id.startsWith('geo-l05-')) return 'lesson-05-unit-one-exercises';
  if (id.startsWith('geo-l06-')) return 'lesson-06-unit-one-exercises-continuation';
  if (id.startsWith('geo-l07-')) return 'lesson-07-unit-one-exercises-final';

  const unitQuestionNumber = Number(id.match(/-q(\d+)$/)?.[1]);
  if (unitQuestionNumber <= 10) return 'lesson-01-translation-and-properties';
  if (unitQuestionNumber <= 20) return 'lesson-02-image-of-a-point';
  if (unitQuestionNumber <= 30) return 'lesson-03-image-of-a-shape';
  if (unitQuestionNumber <= 40) return 'lesson-04-triangle-congruence';
  if (unitQuestionNumber <= 47) return 'lesson-05-unit-one-exercises';
  if (unitQuestionNumber <= 54) return 'lesson-06-unit-one-exercises-continuation';
  if (unitQuestionNumber <= 60) return 'lesson-07-unit-one-exercises-final';
  return '';
}

export function questionFigureLabelsFromPrompt(prompt: TestQuestion['prompt']): Set<string> {
  const mathRuns: string[] = [];
  const visit = (block: TestQuestion['prompt'][number]) => {
    switch (block.type) {
      case 'paragraph':
        mathRuns.push(...extractMathRuns(block.text));
        break;
      case 'math':
        mathRuns.push(block.latex.replace(/\\prime/g, '′'));
        break;
      case 'list':
        for (const item of block.items) mathRuns.push(...extractMathRuns(item));
        break;
      case 'callout':
      case 'teaching':
        for (const child of block.blocks) visit(child);
        break;
      default:
        break;
    }
  };
  for (const block of prompt) visit(block);

  const output = new Set<string>();
  for (const run of mathRuns) {
    const withoutSubscripts = run.replace(/[A-Z]_(?:\{[^}]*\}|[A-Za-z0-9]+)/g, ' ');
    for (const match of withoutSubscripts.matchAll(/[A-Z](?:['′])?/g)) {
      const label = match[0]?.replace(/'/g, '′');
      if (label) output.add(label);
    }
  }
  return output;
}

function extractMathRuns(text: string): string[] {
  return [...text.matchAll(/\$([^$]+)\$/g)].map((match) => match[1] ?? '');
}
