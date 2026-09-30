import type { TeacherResourcesInput } from '../schema';
import type { ContinuationExercise } from './lesson-06-unit-exercises-continuation';

/**
 * One detailed teacher solution per MAIN printed question. Branches remain
 * grouped under their source question and are solved in printed order.
 * Generated from the learner records so the verbatim prompt cannot drift.
 */
export function buildLesson06TeacherResources(
  exercises: ContinuationExercise[],
): TeacherResourcesInput {
  return {
    notes: [
      {
        type: 'callout',
        variant: 'warning',
        title: 'طبيعة الحلول',
        blocks: [
          {
            type: 'paragraph',
            text: 'صور المصدر الخاصة بالأسئلة 3–15 لا تتضمّن أي إجابات مطبوعة. الحلول التالية مستنتجة من المنصّة اعتماداً على نصوص الأسئلة والعلامات الهندسية الظاهرة، وليست مفتاح إجابة من الكتاب.',
          },
        ],
      },
      {
        type: 'teaching',
        variant: 'tip',
        title: 'إدارة مختبر التمرينات',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              'اطلب من الطالب قراءة النص المطبوع كاملاً قبل فتح الشرح.',
              'استخدم مختبر التفكير لتسجيل السلسلة كلها؛ لا تناقش صحة قرار منفرد قبل الإرسال المجمع.',
              'في مسائل الإنشاء، قيّم العلامات الهندسية وخطوات الفرجار والمسطرة، لا التشابه البصري وحده.',
              'في السؤالين 7 و13، اطلب فحص اتجاه المتجه قبل الحساب أو عدّ الخانات.',
              'في الأسئلة 3 و11، لا تعتمد نتيجة التطابق ما لم يكتب الطالب التناظر الصحيح بين الرؤوس.',
            ],
          },
        ],
      },
      {
        type: 'teaching',
        variant: 'pitfall',
        title: 'أخطاء تشخيصية متكررة',
        blocks: [
          {
            type: 'list',
            items: [
              'عكس متجه الانسحاب عند الانتقال من النقطة الأولى إلى الثانية.',
              'اعتبار موضع الرسم أو قياسه التقريبي معطىً هندسياً.',
              'نسيان نقل جميع رؤوس الشكل بالمتجه نفسه.',
              'إثبات متوازي الأضلاع من زوج واحد من الأضلاع من دون شرط كافٍ.',
              'الخلط بين صورة نقطة وسابق صورة نقطة في السؤال 13.',
            ],
          },
        ],
      },
    ],
    textbookSolutions: exercises.map((exercise) => ({
      id: `teacher-sol-q${exercise.number}`,
      reference: `السؤال ${exercise.number} — ${String(exercise.source.page)}`,
      question: exercise.prompt,
      blocks: [
        { type: 'paragraph', text: `المعطيات: ${exercise.given}` },
        { type: 'paragraph', text: `المطلوب: ${exercise.required}` },
        { type: 'paragraph', text: `فكرة البدء: ${exercise.start}` },
        {
          type: 'callout',
          variant: 'theorem',
          title: 'الخاصية الهندسية وسبب استخدامها',
          blocks: [
            { type: 'paragraph', text: exercise.rule },
            { type: 'paragraph', text: `سبب انطباقها: ${exercise.why}` },
          ],
        },
        {
          type: 'teaching',
          variant: 'example',
          title: 'الخطوات حسب ترتيب فروع السؤال',
          blocks: [{ type: 'list', ordered: true, items: exercise.steps }],
        },
        {
          type: 'callout',
          variant: 'note',
          title: 'النتيجة النهائية',
          blocks: [{ type: 'paragraph', text: exercise.result }],
        },
        {
          type: 'callout',
          variant: 'hint',
          title: 'التحقق',
          blocks: [{ type: 'paragraph', text: exercise.verify }],
        },
        {
          type: 'callout',
          variant: 'warning',
          title: 'الخطأ الشائع',
          blocks: [{ type: 'paragraph', text: exercise.warning }],
        },
      ],
    })),
  };
}
