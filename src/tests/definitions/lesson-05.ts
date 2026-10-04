import type { TestDefinitionInput } from '../schema';

export const definition: TestDefinitionInput = {
  id: 'lesson-05-test',
  title: 'اختبار الدرس الخامس — تمرينات الوحدة الأولى (1)',
  scope: 'lesson',
  targetId: 'lesson-05-unit-one-exercises',
  summary:
    'اختبار شامل مبني على مفاهيم التمرينين الأول والثاني: اختيار الإجابة، صح وخطأ، وتبريرات متوازي الأضلاع.',
  instructions:
    'عشرون سؤالاً تقيس دقة الملاحظة والتبرير الهندسي المنهجي. يمكنك مراجعة إجاباتك بحرية قبل التسليم.',
  passingScore: 60,
  solutionGroupSize: 5,
  questionIds: [
    'geo-l05-t01-q01',
    'geo-l05-t01-q02',
    'geo-l05-t01-q03',
    'geo-l05-t01-q04',
    'geo-l05-t01-q05',
    'geo-l05-t01-q06',
    'geo-l05-t01-q07',
    'geo-l05-t01-q08',
    'geo-l05-t01-q09',
    'geo-l05-t01-q10',
    'geo-l05-t01-q11',
    'geo-l05-t01-q12',
    'geo-l05-t01-q13',
    'geo-l05-t01-q14',
    'geo-l05-t01-q15',
    'geo-l05-t01-q16',
    'geo-l05-t01-q17',
    'geo-l05-t01-q18',
    'geo-l05-t01-q19',
    'geo-l05-t01-q20',
  ],
  blueprint: {
    coverage: [
      {
        concept: 'ex1-mcq-concepts',
        label: 'تطبيقات السؤال 1: اختيار الإجابة الصحيحة وتوازي الأضلاع',
        count: 10,
      },
      {
        concept: 'ex2-tf-reasoning',
        label: 'تطبيقات السؤال 2: صح أو خطأ مع التعليل الهندسي',
        count: 10,
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
