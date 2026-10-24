import type { TestDefinitionInput } from '../schema';

/**
 * ============================================================================
 *  اختبار الدرس الثامن — «منتصفا ضلعين في المثلث»
 * ============================================================================
 *
 *  Twenty questions, five per solution group, detailed solutions
 *  (`solutionPolicy: 'detailed'`), pass mark 60 %. The blueprint below is
 *  checked against the actual bank by `src/tests/audit.test.ts`; it is a
 *  contract, not a description.
 *
 *  Sources: pages 31–33 (the activity and its proof, the theorem, the worked
 *  example, «اكتساب معارف», «تحقّق من فهمك» and «تدرّب»).
 * ============================================================================
 */
export const definition: TestDefinitionInput = {
  id: 'lesson-08-test',
  title: 'اختبار الدرس الثامن — منتصفا ضلعين في المثلث',
  scope: 'lesson',
  targetId: 'lesson-08-triangle-midpoints',
  summary:
    'اختبار مبني على صفحات ٣١–٣٣: مبرهنة منتصفَي ضلعين، برهانها بالنقطة المساعدة، وحسابات الأطوال وتطبيقاتها على أشكال مركّبة.',
  instructions:
    'عشرون سؤالاً تقيس المبرهنة وصياغتها وشروطها وحساب الأطوال وتوظيفها في البرهان. يمكنك المراجعة قبل التسليم.',
  passingScore: 60,
  solutionGroupSize: 5,
  questionIds: [
    'geo-l08-t01-q01',
    'geo-l08-t01-q02',
    'geo-l08-t01-q03',
    'geo-l08-t01-q04',
    'geo-l08-t01-q05',
    'geo-l08-t01-q06',
    'geo-l08-t01-q07',
    'geo-l08-t01-q08',
    'geo-l08-t01-q09',
    'geo-l08-t01-q10',
    'geo-l08-t01-q11',
    'geo-l08-t01-q12',
    'geo-l08-t01-q13',
    'geo-l08-t01-q14',
    'geo-l08-t01-q15',
    'geo-l08-t01-q16',
    'geo-l08-t01-q17',
    'geo-l08-t01-q18',
    'geo-l08-t01-q19',
    'geo-l08-t01-q20',
  ],
  blueprint: {
    coverage: [
      {
        concept: 'midline-theorem',
        label: 'مبرهنة منتصفَي ضلعين: الصياغة والشرط',
        count: 6,
      },
      {
        concept: 'midline-computation',
        label: 'حساب الأطوال والنسب',
        count: 4,
      },
      {
        concept: 'proof-and-construction',
        label: 'البرهان والنقطة المساعدة',
        count: 4,
      },
      {
        concept: 'applications-figures',
        label: 'تطبيقات مركّبة وقراءة أشكال',
        count: 6,
      },
    ],
    difficulty: [
      { level: 'basic', count: 5 },
      { level: 'medium', count: 8 },
      { level: 'advanced', count: 5 },
      { level: 'thinking', count: 2 },
    ],
    types: [
      { type: 'single-choice', count: 5 },
      { type: 'true-false', count: 3 },
      { type: 'numeric', count: 3 },
      { type: 'matching', count: 2 },
      { type: 'multi-select', count: 2 },
      { type: 'exact', count: 1 },
      { type: 'fill-in', count: 1 },
      { type: 'ordering', count: 1 },
      { type: 'classification', count: 1 },
      { type: 'error-analysis', count: 1 },
    ],
  },
  solutionPolicy: 'detailed',
};
