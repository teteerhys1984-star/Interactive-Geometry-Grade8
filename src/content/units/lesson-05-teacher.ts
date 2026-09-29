import type { TeacherResourcesInput } from '../schema';

interface SolvableExercise {
  id: string;
  number: string;
  question: string;
  source: { page: number | string; locator?: string };
  given: string;
  required: string;
  idea: string;
  rule: string;
  why: string;
  steps: string[];
  result: string;
  verify: string;
  warning?: string;
}

/** Builds teacher-only resources from the same canonical exercise records used
 * by the learner flow. This prevents the printed prompt from drifting between
 * the two areas. The result is rendered only after TeacherGate authentication. */
export function buildLesson05TeacherResources(
  first: SolvableExercise[],
  second: SolvableExercise[],
): TeacherResourcesInput {
  const all = [
    ...first.map((exercise) => ({ ...exercise, main: 1 })),
    ...second.map((exercise) => ({ ...exercise, main: 2 })),
  ];

  return {
    notes: [
      {
        type: 'callout',
        variant: 'warning',
        title: 'طبيعة الحلول وحدود الدفعة',
        blocks: [
          {
            type: 'paragraph',
            text: 'صور المصدر الخمس لا تتضمّن أي إجابات مطبوعة. الحلول التسعة عشر مستنتجة من المنصّة، وتغطي السؤالين 1 و2 فقط. لا توجد في هذا الدرس أي مادة مفترضة للأسئلة 3 فما بعدها.',
          },
        ],
      },
      {
        type: 'teaching',
        variant: 'tip',
        title: 'استراتيجية إدارة المختبر',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              'اطلب من التلميذ استخراج المعطيات والمطلوب قبل قراءة الخيارات.',
              'لا تعتمد الإجابة دون تعليل بخاصية هندسية أو بقراءة موثقة للرسم.',
              'استخدم مختبر القرار بعد إنهاء فقرات كل سؤال، لا قبلها؛ فهو أداة مراجعة مجمعة لا أداة تخمين.',
              'في السؤال 1، الفقرة 3، نبّه إلى أن مواضع النص في الصورة هي المرجع عند مراجعة الخيارين ② و③.',
              'في السؤال 2، قارن الفقرتين 6 و7 لإبراز الفرق بين صورة مستقيم وصورة قطعة ذات طرفين.',
            ],
          },
        ],
      },
      {
        type: 'teaching',
        variant: 'pitfall',
        title: 'أخطاء تشخيصية متوقعة',
        blocks: [
          {
            type: 'list',
            items: [
              'اعتبار كل شكلين متطابقين صورةً وفق انسحاب، مع إهمال الدوران أو القلب.',
              'عكس اتجاه الانسحاب عند قراءة «ينقل النقطة الأولى إلى الثانية».',
              'مطابقة رؤوس المثلثين من موضع الرسم بدلاً من علامات الأضلاع.',
              'الخلط بين انتماء صورة نقطة إلى مستقيم الصورة وبين تعيين تلك الصورة كنقطة مسماة بعينها.',
            ],
          },
        ],
      },
    ],
    textbookSolutions: all.map((exercise) => ({
      id: `teacher-sol-${exercise.id}`,
      reference: `السؤال ${exercise.main} — الفقرة ${exercise.number} — ${String(exercise.source.page)}`,
      question: exercise.question,
      blocks: [
        { type: 'paragraph', text: `المعطيات: ${exercise.given}` },
        { type: 'paragraph', text: `المطلوب: ${exercise.required}` },
        { type: 'paragraph', text: `فكرة الحل: ${exercise.idea}` },
        {
          type: 'callout',
          variant: 'theorem',
          title: 'القاعدة / الخاصية',
          blocks: [
            { type: 'paragraph', text: exercise.rule },
            { type: 'paragraph', text: `سبب انطباقها: ${exercise.why}` },
          ],
        },
        { type: 'list', ordered: true, items: exercise.steps },
        {
          type: 'callout',
          variant: 'note',
          title: 'الإجابة النهائية',
          blocks: [{ type: 'paragraph', text: exercise.result }],
        },
        {
          type: 'callout',
          variant: 'hint',
          title: 'طريقة التحقق',
          blocks: [{ type: 'paragraph', text: exercise.verify }],
        },
        ...(exercise.warning
          ? [
              {
                type: 'callout' as const,
                variant: 'warning' as const,
                title: 'ملاحظة تربوية',
                blocks: [{ type: 'paragraph' as const, text: exercise.warning }],
              },
            ]
          : []),
      ],
    })),
  };
}
