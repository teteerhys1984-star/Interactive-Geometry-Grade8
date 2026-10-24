import type { TestDefinitionInput } from '../schema';

/**
 * ============================================================================
 *  LESSON 9 TEST — «موازٍ لضلع من منتصف ضلع آخر»
 * ============================================================================
 *
 *  Dedicated 20-question lesson test covering textbook pages 34–35 (Unit 2,
 *  Lesson 2):
 *    • Second Midpoint Theorem statement, hypothesis/conclusion & 3-step method
 *    • Salim's freehand activity & proof via First Midpoint Theorem + uniqueness
 *    • Connecting perpendiculars on the same line & central symmetry + lengths
 *    • Selecting the right sub-triangle / extended triangle & error analysis
 * ============================================================================
 */
export const definition: TestDefinitionInput = {
  id: 'lesson-09-test',
  title: 'اختبار الدرس التاسع — موازٍ لضلع من منتصف ضلع آخر',
  scope: 'lesson',
  targetId: 'lesson-09-parallel-from-midpoint',
  summary:
    'اختبار مخصّص من عشرين سؤالاً يقيس استيعاب المبرهنة الثانية في المنتصفات، وبرهانها من نشاط سليم، وتوظيف التعامد والتناظر المركزي، واختيار المثلث الصحيح في الأشكال المركّبة والممتدة.',
  instructions:
    'أجب عن الأسئلة العشرين مستنداً إلى معطيات كل سؤال وإشارات الشكل المرسومة فقط دون افتراض أي تساوٍ أو توازٍ غير مذكور. لا تظهر النتائج ولا الحلول التفصيلية إلا بعد تسليم الاختبار.',
  passingScore: 60,
  solutionGroupSize: 5,
  solutionPolicy: 'detailed',
  questionIds: [
    'geo-l09-t01-q01',
    'geo-l09-t01-q02',
    'geo-l09-t01-q03',
    'geo-l09-t01-q04',
    'geo-l09-t01-q05',
    'geo-l09-t01-q06',
    'geo-l09-t01-q07',
    'geo-l09-t01-q08',
    'geo-l09-t01-q09',
    'geo-l09-t01-q10',
    'geo-l09-t01-q11',
    'geo-l09-t01-q12',
    'geo-l09-t01-q13',
    'geo-l09-t01-q14',
    'geo-l09-t01-q15',
    'geo-l09-t01-q16',
    'geo-l09-t01-q17',
    'geo-l09-t01-q18',
    'geo-l09-t01-q19',
    'geo-l09-t01-q20',
  ],
  blueprint: {
    coverage: [
      {
        concept: 'second-midline-theorem',
        label: 'المبرهنة الثانية في المنتصفات: الصياغة والشروط',
        count: 5,
      },
      {
        concept: 'proof-and-salim-activity',
        label: 'البرهان ووحدانية الموازي ونشاط سليم',
        count: 4,
      },
      {
        concept: 'perpendicular-and-symmetry',
        label: 'الربط مع التعامد والتناظر المركزي وحساب الأطوال',
        count: 5,
      },
      {
        concept: 'subtriangle-applications',
        label: 'اختيار المثلث المناسب وقراءة الأشكال المركّبة',
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
      { type: 'true-false-justify', count: 2 },
      { type: 'true-false', count: 1 },
      { type: 'numeric', count: 3 },
      { type: 'fill-in', count: 1 },
      { type: 'exact', count: 1 },
      { type: 'multi-select', count: 2 },
      { type: 'ordering', count: 1 },
      { type: 'classification', count: 1 },
      { type: 'matching', count: 2 },
      { type: 'error-analysis', count: 1 },
    ],
  },
};
