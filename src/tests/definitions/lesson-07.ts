import type { TestDefinitionInput } from '../schema';

export const definition: TestDefinitionInput = {
  id: 'lesson-07-test',
  title: 'اختبار الدرس السابع — تمرينات الوحدة الأولى (3)',
  scope: 'lesson',
  targetId: 'lesson-07-unit-one-exercises-final',
  summary:
    'اختبار شامل مبني على مفاهيم الأسئلة 16 إلى 28: التحرير الكتابي، براهين متوازي الأضلاع والمستطيل والمعين.',
  instructions:
    'عشرون سؤالاً تقيس مهارة التحرير الكتابي الرياضي وبناء البراهين السليمة. يمكنك المراجعة قبل التسليم.',
  passingScore: 60,
  solutionGroupSize: 5,
  questionIds: [
    'geo-l07-t01-q01',
    'geo-l07-t01-q02',
    'geo-l07-t01-q03',
    'geo-l07-t01-q04',
    'geo-l07-t01-q05',
    'geo-l07-t01-q06',
    'geo-l07-t01-q07',
    'geo-l07-t01-q08',
    'geo-l07-t01-q09',
    'geo-l07-t01-q10',
    'geo-l07-t01-q11',
    'geo-l07-t01-q12',
    'geo-l07-t01-q13',
    'geo-l07-t01-q14',
    'geo-l07-t01-q15',
    'geo-l07-t01-q16',
    'geo-l07-t01-q17',
    'geo-l07-t01-q18',
    'geo-l07-t01-q19',
    'geo-l07-t01-q20',
  ],
  blueprint: {
    coverage: [
      {
        concept: 'proof-reasoning-grids',
        label: 'البرهان الهندسي وجداول الفرض والخاصة والنتيجة',
        count: 7,
      },
      {
        concept: 'special-quadrilaterals',
        label: 'خواص المستطيل والمعين والمربع وبراهين أقطارها',
        count: 5,
      },
      {
        concept: 'advanced-translations',
        label: 'تناصف الأقطار واستعمال الانسحاب في الإثبات',
        count: 4,
      },
      {
        concept: 'parallel-lines-angles',
        label: 'الزوايا المتبادلة داخلاً والعمود على المتوازيين',
        count: 4,
      },
    ],
    difficulty: [
      { level: 'basic', count: 5 },
      { level: 'medium', count: 8 },
      { level: 'advanced', count: 5 },
      { level: 'thinking', count: 2 },
    ],
    types: [
      { type: 'single-choice', count: 7 },
      { type: 'true-false', count: 3 },
      { type: 'multi-select', count: 2 },
      { type: 'numeric', count: 2 },
      { type: 'exact', count: 1 },
      { type: 'ordering', count: 1 },
      { type: 'matching', count: 1 },
      { type: 'classification', count: 1 },
      { type: 'error-analysis', count: 2 },
    ],
  },
};
