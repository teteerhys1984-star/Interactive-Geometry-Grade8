import type { TestDefinitionInput } from '../schema';

/**
 * ============================================================================
 *  LESSON 11 TEST — «تساوي ثلاث نسب»
 * ============================================================================
 *
 *  Dedicated 20-question lesson test covering textbook pages 39–41 (Unit 2,
 *  Lesson 4). Per the authoring brief the bank uses only the three controlled
 *  types single-choice, true-false and numeric — every item is deterministically
 *  gradable and the scoring engine is untouched.
 *
 *  Coverage: the statement and hypotheses of the three-ratio theorem (including
 *  the documented $(MN) \parallel (AB)$ erratum), the correspondence order when
 *  writing the ratios, the printed activity's auxiliary constructions and why
 *  they need k = 2/3, and the length computations of the worked example and
 *  both «تدرّب» sections.
 *
 *  This bank is NOT the lesson's formative assessment
 *  (`lesson-11-assessment.ts`); it is the separate Test Area test.
 * ============================================================================
 */
export const definition: TestDefinitionInput = {
  id: 'lesson-11-test',
  title: 'اختبار الدرس الحادي عشر — تساوي ثلاث نسب',
  scope: 'lesson',
  targetId: 'lesson-11-three-ratios',
  summary:
    'اختبار مخصّص من عشرين سؤالاً يقيس استيعاب مبرهنة النسب الثلاث المتساوية: صياغتها وفرضية التوازي، ومراسلة الأضلاع في كتابة النسب، ودور الإنشاءات المساعدة في نشاط الأثلاث ولماذا يحتاج النسبة ٢/٣، وحساب الأطوال المجهولة في المثال المطبوع وفي تمرينَي «تدرّب».',
  instructions:
    'أجب عن الأسئلة العشرين مستنداً إلى معطيات كل سؤال وإلى إشارات الشكل المرسومة فقط، دون افتراض أي توازٍ أو تناسب غير مذكور صراحةً. لا تظهر الحلول التفصيلية إلا بعد تسليم الاختبار.',
  passingScore: 60,
  solutionGroupSize: 5,
  solutionPolicy: 'detailed',
  questionIds: [
    'geo-l11-t01-q01',
    'geo-l11-t01-q02',
    'geo-l11-t01-q03',
    'geo-l11-t01-q04',
    'geo-l11-t01-q05',
    'geo-l11-t01-q06',
    'geo-l11-t01-q07',
    'geo-l11-t01-q08',
    'geo-l11-t01-q09',
    'geo-l11-t01-q10',
    'geo-l11-t01-q11',
    'geo-l11-t01-q12',
    'geo-l11-t01-q13',
    'geo-l11-t01-q14',
    'geo-l11-t01-q15',
    'geo-l11-t01-q16',
    'geo-l11-t01-q17',
    'geo-l11-t01-q18',
    'geo-l11-t01-q19',
    'geo-l11-t01-q20',
  ],
  blueprint: {
    coverage: [
      {
        concept: 'three-ratio-theorem',
        label: 'مبرهنة النسب الثلاث المتساوية: الصياغة والفرضية وحالة الامتداد',
        count: 4,
      },
      {
        concept: 'correspondence-and-writing',
        label: 'مراسلة الأضلاع وترتيب كتابة النسب',
        count: 3,
      },
      {
        concept: 'activity-proof-and-thirds',
        label: 'إنشاءات نشاط الصفحة ٣٩ وأثلاث القاعدة وشرط النسبة ٢/٣',
        count: 6,
      },
      {
        concept: 'length-computation',
        label: 'حساب الأطوال المجهولة في المثال وفي تمرينَي تدرّب',
        count: 7,
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
