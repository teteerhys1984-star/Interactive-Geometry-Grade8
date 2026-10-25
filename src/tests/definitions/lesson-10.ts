import type { TestDefinitionInput } from '../schema';

/**
 * ============================================================================
 *  LESSON 10 TEST — «مستقيمات متوازية وقاطعان»
 * ============================================================================
 *
 *  Dedicated 20-question lesson test covering textbook pages 36–38 (Unit 2,
 *  Lesson 3). Per the authoring brief the bank uses only the three controlled
 *  types single-choice, true-false and numeric:
 *    • the equal-ratio property, its parallelism hypothesis and the midpoint
 *      special case (k = 1/2);
 *    • side correspondence, proportionality tables and bundle reading;
 *    • cross-multiplication length computations mirroring the two printed
 *      worked examples, the «تحقّق» question and تدرّب ②.
 * ============================================================================
 */
export const definition: TestDefinitionInput = {
  id: 'lesson-10-test',
  title: 'اختبار الدرس العاشر — مستقيمات متوازية وقاطعان',
  scope: 'lesson',
  targetId: 'lesson-10-parallel-lines-transversals',
  summary:
    'اختبار مخصّص من عشرين سؤالاً يقيس استيعاب خاصة التناسب بين أضلاع المثلثين وشرط التوازي، ومراسلة الأضلاع وقراءة جداول التناسب، وحساب الأطوال المجهولة بالضرب التبادلي بما في ذلك حالتا الكتاب المطبوعتان وتمرين تدرّب ②.',
  instructions:
    'أجب عن الأسئلة العشرين مستنداً إلى معطيات كل سؤال وإشارات الشكل المرسومة فقط دون افتراض أي توازٍ أو تناسب غير مذكور صراحةً. لا تظهر الحلول التفصيلية إلا بعد تسليم الاختبار.',
  passingScore: 60,
  solutionGroupSize: 5,
  solutionPolicy: 'detailed',
  questionIds: [
    'geo-l10-t01-q01',
    'geo-l10-t01-q02',
    'geo-l10-t01-q03',
    'geo-l10-t01-q04',
    'geo-l10-t01-q05',
    'geo-l10-t01-q06',
    'geo-l10-t01-q07',
    'geo-l10-t01-q08',
    'geo-l10-t01-q09',
    'geo-l10-t01-q10',
    'geo-l10-t01-q11',
    'geo-l10-t01-q12',
    'geo-l10-t01-q13',
    'geo-l10-t01-q14',
    'geo-l10-t01-q15',
    'geo-l10-t01-q16',
    'geo-l10-t01-q17',
    'geo-l10-t01-q18',
    'geo-l10-t01-q19',
    'geo-l10-t01-q20',
  ],
  blueprint: {
    coverage: [
      {
        concept: 'equal-ratio-property',
        label: 'خاصة النسب المتساوية: الصياغة وشرط التوازي وصيغ النسب',
        count: 5,
      },
      {
        concept: 'correspondence-and-tables',
        label: 'مراسلة الأضلاع وجداول التناسب وقراءة الأشكال المركّبة',
        count: 4,
      },
      {
        concept: 'length-computation',
        label: 'حساب الأطوال المجهولة بالضرب التبادلي',
        count: 6,
      },
      {
        concept: 'combined-and-midpoint',
        label: 'مسائل مركّبة ونسبة الجزأين وحالة المنتصف وتحليل التبرير',
        count: 5,
      },
    ],
    difficulty: [
      { level: 'basic', count: 6 },
      { level: 'medium', count: 8 },
      { level: 'advanced', count: 4 },
      { level: 'thinking', count: 2 },
    ],
    types: [
      { type: 'single-choice', count: 9 },
      { type: 'true-false', count: 5 },
      { type: 'numeric', count: 6 },
    ],
  },
};
