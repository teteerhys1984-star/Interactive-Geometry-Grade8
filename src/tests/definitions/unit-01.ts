import type { TestDefinitionInput } from '../schema';

const questionIds = Array.from({ length: 60 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return `geo-u01-t01-q${num}`;
});

export const definition: TestDefinitionInput = {
  id: 'unit-01-test',
  title: 'اختبار الوحدة الأولى — متوازيات الأضلاع والانسحاب',
  scope: 'unit',
  targetId: 'unit-01-parallelograms-and-translation',
  summary:
    'اختبار شامل للوحدة الأولى من 60 سؤالاً أصلياً يغطي الانسحاب وخواصه وصورة نقطة وشكل وتطابق المثلثات وتمرينات الوحدة.',
  instructions:
    'اختبار شامل مكوّن من 60 سؤالاً يغطي كافة مفاهيم الوحدة الأولى. يمكنك التنقل بين الأسئلة ومراجعتها قبل التسليم. تُعرض الحلول التفصيلية في قسم حلول الاختبارات.',
  passingScore: 60,
  solutionGroupSize: 10,
  questionIds,
  blueprint: {
    coverage: [
      {
        concept: 'u1-translation-properties',
        label: 'الدرس 1: مفهوم الانسحاب وخواص الحفظ الأربع',
        count: 10,
      },
      {
        concept: 'u1-image-point',
        label: 'الدرس 2: صورة نقطة ومتوازي الأضلاع والإنشاء بالفرجار',
        count: 10,
      },
      { concept: 'u1-image-shape', label: 'الدرس 3: صورة مستقيم وقطعة ودائرة ومضلع', count: 10 },
      {
        concept: 'u1-triangle-congruence',
        label: 'الدرس 4: حالات تطابق المثلثين وتطابق المثلثات القائمة',
        count: 10,
      },
      {
        concept: 'u1-exercises-part1',
        label: 'الدرس 5: تمرينات الوحدة الأولى (1) — السؤالان 1 و2',
        count: 7,
      },
      {
        concept: 'u1-exercises-part2',
        label: 'الدرس 6: تمرينات الوحدة الأولى (2) — الأسئلة 3 إلى 15',
        count: 7,
      },
      {
        concept: 'u1-exercises-part3',
        label: 'الدرس 7: تمرينات الوحدة الأولى (3) — الأسئلة 16 إلى 28',
        count: 6,
      },
    ],
    difficulty: [
      { level: 'basic', count: 17 },
      { level: 'medium', count: 21 },
      { level: 'advanced', count: 13 },
      { level: 'thinking', count: 9 },
    ],
    types: [
      { type: 'single-choice', count: 19 },
      { type: 'true-false', count: 12 },
      { type: 'numeric', count: 6 },
      { type: 'multi-select', count: 5 },
      { type: 'ordering', count: 2 },
      { type: 'matching', count: 3 },
      { type: 'exact', count: 3 },
      { type: 'error-analysis', count: 7 },
      { type: 'classification', count: 3 },
    ],
  },
};
