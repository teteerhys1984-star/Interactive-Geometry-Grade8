import type { TestDefinitionInput } from '../schema';

export const definition: TestDefinitionInput = {
  id: 'lesson-02-test',
  title: 'اختبار الدرس الثاني — صورة نقطة وفق انسحاب',
  scope: 'lesson',
  targetId: 'lesson-02-image-of-a-point',
  summary:
    'اختبار متوازن يغطي تعريف صورة النقطة، حالة الاستقامة، الإنشاء بالفرجار، قراءة الشبكة، والتحقق من الاتجاه.',
  instructions:
    'عشرون سؤالاً متنوعاً تقيس فهم الدرس الثاني وتطبيقه. راجع إجاباتك قبل التسليم؛ لا يظهر التصحيح أثناء الإجابة. في أسئلة صح/خطأ والتحليل المركب تُحتسب الأجزاء كلٌّ على حدة.',
  passingScore: 60,
  solutionGroupSize: 5,
  solutionPolicy: 'detailed',
  questionIds: Array.from(
    { length: 20 },
    (_, index) => `geo-l02-t01-q${String(index + 1).padStart(2, '0')}`,
  ),
  blueprint: {
    coverage: [
      { concept: 'def-parallelogram', label: 'تعريف صورة نقطة ومتوازي أضلاع الانسحاب', count: 5 },
      { concept: 'special-case', label: 'الحالة الخاصة عندما تقع النقطة على المستقيم', count: 4 },
      {
        concept: 'compass-construction',
        label: 'الإنشاء الهندسي بالفرجار والمسطرة والتعليل',
        count: 6,
      },
      { concept: 'grid-coordinates', label: 'التعيين والحسابات على الشبكة السنتيمترية', count: 5 },
    ],
    difficulty: [
      { level: 'basic', count: 5 },
      { level: 'medium', count: 8 },
      { level: 'advanced', count: 5 },
      { level: 'thinking', count: 2 },
    ],
    types: [
      { type: 'single-choice', count: 7 },
      { type: 'true-false-justify', count: 3 },
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
