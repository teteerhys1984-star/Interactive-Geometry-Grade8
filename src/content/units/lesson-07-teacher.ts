import type { TeacherResourcesInput } from '../schema';
import type { FinalExercise } from './lesson-07-unit-exercises-final';

/**
 * One detailed teacher solution per MAIN printed question of the Q16–Q28 set.
 * Branches stay grouped under their source question and are solved in printed
 * order. Everything is generated from the learner records, so the verbatim
 * prompt in the Teacher Area cannot drift away from the one students read.
 *
 * Nothing in this module reaches the DOM before the shared passphrase is
 * accepted — the Teacher Area gates it, and a rendering test pins that.
 */
export function buildLesson07TeacherResources(exercises: FinalExercise[]): TeacherResourcesInput {
  return {
    notes: [
      {
        type: 'callout',
        variant: 'warning',
        title: 'طبيعة الحلول',
        blocks: [
          {
            type: 'paragraph',
            text: 'صور المصدر الخاصة بالأسئلة 16–28 لا تتضمّن أي إجابات مطبوعة. الحلول التالية مستنتجة من المنصّة اعتماداً على نصوص الأسئلة وجداولها ومخططاتها والعلامات الهندسية الظاهرة، وليست مفتاح إجابة من الكتاب.',
          },
        ],
      },
      {
        type: 'teaching',
        variant: 'tip',
        title: 'إدارة الحصّة في الأسئلة 16–28',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              'اطلب من الطالب نقل الجدول أو المخطط المطبوع إلى دفتره وملأه بقلمه قبل فتح النشاط التفاعلي.',
              'في ورشة البرهان لا تناقش صحّة قرار منفرد؛ انتظر المراجعة المجمّعة ثم اقرأ السلسلة كوحدة واحدة.',
              'سلّم التلميحات لا يصدر حكماً على الطالب؛ استعمله لمن توقّف، لا لمن أخطأ.',
              'في الأسئلة 24 و25 و26، لا تقبل نتيجة التطابق ما لم يكتب الطالب التناظر بين الرؤوس صراحة.',
              'في السؤال 19، اجعل الهدف تشخيص نوع الخطأ (رسم / تعليل / نتيجة) لا مجرد إعطاء الجواب الصحيح.',
              'في السؤال 20، خصّص وقتاً لمناقشة الفرق بين الخاصة وعكسها؛ هذا هو جوهر السؤال لا الفراغ المنقّط.',
            ],
          },
        ],
      },
      {
        type: 'teaching',
        variant: 'pitfall',
        title: 'أخطاء تشخيصية متكررة في هذه المجموعة',
        blocks: [
          {
            type: 'list',
            items: [
              'كتابة اسم الرباعي بترتيب خاطئ، فينقلب القطران وينهار البرهان (السؤالان 22 و23).',
              'قلب الخاصة تلقائياً واعتبار عكسها صحيحاً من دون برهان (السؤال 20).',
              'استعمال زاويتي قاعدة المثلث المتساوي الساقين بدل متمّمتيهما (السؤال 27).',
              'افتراض زاوية قائمة غير معطاة بدل استنتاجها من خاصة العمود على أحد متوازيين (السؤال 28).',
              'رسم حالة خاصة غير منصوص عليها ثم قراءة النتيجة من الرسم (السؤال 19).',
              'الاكتفاء بتساوي زاويتين عند نقطة تقاطع من دون ذكر أنهما متجاورتان على مستقيم (السؤال 26).',
            ],
          },
        ],
      },
      {
        type: 'callout',
        variant: 'note',
        title: 'تغطية الفروع المطبوعة',
        blocks: [
          {
            type: 'paragraph',
            text: 'الأسئلة الثلاثة عشر تحتوي 39 فرعاً وتعليمة مطبوعة، موزّعة كالآتي: 6 في السؤال 16، و4 في السؤال 17، و3 في السؤال 18، و4 في السؤال 19، وفرعان في كل من الأسئلة 20 و21 و24 و25 و26 و27، و4 في السؤال 22، و3 في كل من السؤالين 23 و28. لا فرع محذوف ولا فرع مدمج بغيره.',
          },
        ],
      },
    ],
    textbookSolutions: exercises.map((exercise) => ({
      id: `teacher-sol-q${exercise.number}`,
      reference: `السؤال ${exercise.number} — ${String(exercise.source.page)}`,
      question: exercise.prompt,
      ...(exercise.limitation ? { limitation: exercise.limitation } : {}),
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
