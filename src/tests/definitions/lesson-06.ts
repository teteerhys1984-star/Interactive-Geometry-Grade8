import type { TestDefinitionInput } from '../schema';

export const definition: TestDefinitionInput = {
  id: 'lesson-06-test',
  title: 'اختبار الدرس السادس — تمرينات الوحدة الأولى (2)',
  scope: 'lesson',
  targetId: 'lesson-06-unit-one-exercises-continuation',
  summary:
    'اختبار شامل مبني على مفاهيم الأسئلة 3 إلى 15: تطابق المثلثات القائمة، إكمال متوازي الأضلاع، والشبكة.',
  instructions:
    'عشرون سؤالاً تغطي التطبيقات المتنوعة للوحدة الأولى. راجع إجاباتك جيداً قبل التسليم النهائي.',
  passingScore: 60,
  solutionGroupSize: 5,
  questionIds: [
    'geo-l06-t01-q01',
    'geo-l06-t01-q02',
    'geo-l06-t01-q03',
    'geo-l06-t01-q04',
    'geo-l06-t01-q05',
    'geo-l06-t01-q06',
    'geo-l06-t01-q07',
    'geo-l06-t01-q08',
    'geo-l06-t01-q09',
    'geo-l06-t01-q10',
    'geo-l06-t01-q11',
    'geo-l06-t01-q12',
    'geo-l06-t01-q13',
    'geo-l06-t01-q14',
    'geo-l06-t01-q15',
    'geo-l06-t01-q16',
    'geo-l06-t01-q17',
    'geo-l06-t01-q18',
    'geo-l06-t01-q19',
    'geo-l06-t01-q20',
  ],
  blueprint: {
    coverage: [
      {
        concept: 'congruence-proofs',
        label: 'تطابق المثلثات القائمة والبراهين الهندسية',
        count: 5,
      },
      {
        concept: 'parallelogram-symmetry',
        label: 'إكمال متوازي الأضلاع والتناظر المركزي وتناصف الأقطار',
        count: 6,
      },
      {
        concept: 'grid-coordinates-transforms',
        label: 'الانسحاب المتكرر وحساب الإحداثيات على الشبكة',
        count: 5,
      },
      {
        concept: 'geometric-constructions',
        label: 'إنشاءات الفرجار وصور المستقيمات في حالاتها المختلفة',
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
