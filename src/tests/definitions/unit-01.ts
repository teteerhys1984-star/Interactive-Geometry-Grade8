import type { TestDefinitionInput } from '../schema';

/**
 * ============================================================================
 *  UNIT 1 COMPREHENSIVE TEST — «متوازيات الأضلاع والانسحاب»
 * ============================================================================
 *
 *  Rebuilt in place: the id `unit-01-test` and the 60 question ids
 *  `geo-u01-t01-q01…q60` are unchanged, so the Test Area, the Solutions Area,
 *  the session storage, the visual audit inventory (200 questions) and the
 *  routes keep working with no shared-code edit.
 *
 *  SCOPE DECISION — the 28 printed unit exercises (Lessons 5–7) are NOT part of
 *  this test. Their ids were reassigned to the four concept lessons plus an
 *  explicit integration strand, because a comprehensive test must sample the
 *  unit's concepts, not re-print the exercise booklet. Lessons 5–7 keep their
 *  own lesson tests untouched.
 *
 *  POINTS — computed from the scoring engine, not declared by hand:
 *    • one point   — single-choice, multi-select, true-false, numeric, exact,
 *                    fill-in, short-answer, classification (all-or-nothing).
 *    • three points — true-false-justify (verdict + correction/reason),
 *                    error-analysis (location + correction + reason),
 *                    ordering (three ordered steps), matching (three pairs),
 *                    justification (three scored steps), and the structured
 *                    multi-part / diagram-reading / transformation-application
 *                    types (three scored parts).
 *  40 single-point questions + 20 three-point questions = 100 points.
 *  A 60 % pass mark therefore means 60/100 exactly — no rounding ambiguity.
 * ============================================================================
 */

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
    'اختبار شامل أصلي للوحدة الأولى من 60 سؤالاً و100 درجة: يغطي مفهوم الانسحاب وخواصه، وصورة النقطة، وصورة الشكل، وتطابق المثلثات، إضافة إلى أسئلة تركيب تربط بين هذه الدروس. لا يتضمن تمرينات الكتاب المطبوعة ولا يعيد أسئلة اختبارات الدروس.',
  instructions:
    'اختبار من 60 سؤالاً و100 درجة، يغطي دروس الوحدة الأولى الأربعة وأسئلة تركيب تربط بينها. تشمل الأسئلة الاختيار من متعدد، وصح أو خطأ مع التعليل، والإكمال، والترتيب، والمطابقة، والتصنيف، والتصحيح، والتبرير المنظّم، والأسئلة متعددة الأجزاء. يمكنك التنقّل بحرية بين الأسئلة ومراجعتها قبل التسليم، ولن تظهر أي نتيجة أثناء الإجابة. حلول الأسئلة التفصيلية متاحة في قسم حلول الاختبارات بعد التسليم.',
  passingScore: 60,
  solutionGroupSize: 10,
  solutionPolicy: 'detailed',
  questionIds,
  blueprint: {
    coverage: [
      {
        concept: 'u1-translation-properties',
        label: 'الدرس 1: مفهوم الانسحاب وخواص الحفظ (ص 5–7)',
        count: 12,
      },
      {
        concept: 'u1-image-point',
        label: 'الدرس 2: صورة نقطة ومتوازي الأضلاع والإنشاء بالفرجار (ص 8–10)',
        count: 12,
      },
      {
        concept: 'u1-image-shape',
        label: 'الدرس 3: صورة مستقيم وقطعة ونصف مستقيم ودائرة ومضلع (ص 11–16)',
        count: 12,
      },
      {
        concept: 'u1-triangle-congruence',
        label: 'الدرس 4: حالات تطابق المثلثين والمثلثان القائمان (ص 17–19)',
        count: 12,
      },
      {
        concept: 'u1-integration',
        label: 'أسئلة تركيب أصلية تربط بين درسين أو أكثر من دروس الوحدة',
        count: 12,
      },
    ],
    difficulty: [
      { level: 'basic', count: 14 },
      { level: 'medium', count: 22 },
      { level: 'advanced', count: 18 },
      { level: 'thinking', count: 6 },
    ],
    types: [
      { type: 'single-choice', count: 16 },
      { type: 'multi-select', count: 5 },
      { type: 'true-false', count: 8 },
      { type: 'true-false-justify', count: 4 },
      { type: 'short-answer', count: 1 },
      { type: 'fill-in', count: 2 },
      { type: 'numeric', count: 5 },
      { type: 'exact', count: 2 },
      { type: 'ordering', count: 3 },
      { type: 'matching', count: 3 },
      { type: 'classification', count: 1 },
      { type: 'justification', count: 2 },
      { type: 'multi-part', count: 2 },
      { type: 'diagram-reading', count: 1 },
      { type: 'transformation-application', count: 1 },
      { type: 'error-analysis', count: 4 },
    ],
  },
};
