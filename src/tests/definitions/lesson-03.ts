import type { TestDefinitionInput } from '../schema';

export const definition: TestDefinitionInput = {
  id: 'lesson-03-test',
  title: 'اختبار الدرس الثالث — صورة شكل وفق انسحاب',
  scope: 'lesson',
  targetId: 'lesson-03-image-of-a-shape',
  summary:
    'اختبار شامل يغطي صور المستقيمات والقطع والدوائر والمضلعات، والتوازي والتعامد والإنشاءات.',
  instructions:
    'عشرون سؤالاً تقيس فهمك لقواعد صور الأشكال الهندسية. يمكنك التنقل والمراجعة بحرية قبل تسليم الاختبار.',
  passingScore: 60,
  solutionGroupSize: 5,
  questionIds: [
    'geo-l03-t01-q01',
    'geo-l03-t01-q02',
    'geo-l03-t01-q03',
    'geo-l03-t01-q04',
    'geo-l03-t01-q05',
    'geo-l03-t01-q06',
    'geo-l03-t01-q07',
    'geo-l03-t01-q08',
    'geo-l03-t01-q09',
    'geo-l03-t01-q10',
    'geo-l03-t01-q11',
    'geo-l03-t01-q12',
    'geo-l03-t01-q13',
    'geo-l03-t01-q14',
    'geo-l03-t01-q15',
    'geo-l03-t01-q16',
    'geo-l03-t01-q17',
    'geo-l03-t01-q18',
    'geo-l03-t01-q19',
    'geo-l03-t01-q20',
  ],
  blueprint: {
    coverage: [
      { concept: 'image-line-segment', label: 'صورة مستقيم وقطعة مستقيمة ونصف مستقيم', count: 5 },
      {
        concept: 'image-parallel-perp',
        label: 'صورة مستقيمين متوازيين أو متعامدين ونقاط التقاطع',
        count: 4,
      },
      { concept: 'image-circle-polygon', label: 'صورة دائرة ومستطيل ومثلث ومضلعات', count: 6 },
      {
        concept: 'construction-applications',
        label: 'الإنشاءات الهندسية والتطبيقات والحسابات',
        count: 5,
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
