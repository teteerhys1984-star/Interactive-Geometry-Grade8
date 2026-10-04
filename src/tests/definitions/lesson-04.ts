import type { TestDefinitionInput } from '../schema';

export const definition: TestDefinitionInput = {
  id: 'lesson-04-test',
  title: 'اختبار الدرس الرابع — تطابق المثلثات',
  scope: 'lesson',
  targetId: 'lesson-04-triangle-congruence',
  summary:
    'اختبار شامل يغطي حالات تطابق المثلثين الثلاث، تطابق المثلثات القائمة، وتطبيقات الطائرة الورقية والمثلث المتساوي الساقين.',
  instructions:
    'عشرون سؤالاً تقيس فهمك العميق لحالات التطابق والبراهين الهندسية. يمكنك مراجعة الأسئلة قبل التسليم.',
  passingScore: 60,
  solutionGroupSize: 5,
  questionIds: [
    'geo-l04-t01-q01',
    'geo-l04-t01-q02',
    'geo-l04-t01-q03',
    'geo-l04-t01-q04',
    'geo-l04-t01-q05',
    'geo-l04-t01-q06',
    'geo-l04-t01-q07',
    'geo-l04-t01-q08',
    'geo-l04-t01-q09',
    'geo-l04-t01-q10',
    'geo-l04-t01-q11',
    'geo-l04-t01-q12',
    'geo-l04-t01-q13',
    'geo-l04-t01-q14',
    'geo-l04-t01-q15',
    'geo-l04-t01-q16',
    'geo-l04-t01-q17',
    'geo-l04-t01-q18',
    'geo-l04-t01-q19',
    'geo-l04-t01-q20',
  ],
  blueprint: {
    coverage: [
      { concept: 'congruence-cases', label: 'حالات تطابق مثلثين الثلاث الأساسية', count: 7 },
      { concept: 'right-triangle-cases', label: 'تطابق المثلثات القائمة', count: 5 },
      {
        concept: 'proofs-reasoning',
        label: 'البراهين والاستنتاجات في متوازي الأضلاع والمضلعات',
        count: 4,
      },
      {
        concept: 'kite-isosceles',
        label: 'تطبيقات الطائرة الورقية والمثلث المتساوي الساقين',
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
