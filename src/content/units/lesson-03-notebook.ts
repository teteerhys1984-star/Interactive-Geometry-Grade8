import type { ContentBlock, LessonStepInput } from '../schema';

const p = (text: string): ContentBlock => ({ type: 'paragraph', text });
const section = (title: string, blocks: ContentBlock[]): ContentBlock => ({
  type: 'callout',
  variant: 'note',
  title,
  blocks,
});

/**
 * Lesson 3 only: concise writing material, not another explanation or exercise.
 *
 * Source map (all references are to this lesson's student-facing material):
 * §1 step-01-line-image-conjecture (p.11): congruence by superposition;
 *    teach-03-01-shape-as-points: one translation for every point, no rotation,
 *    reflection or change of size; teach-03-06-recap: connect the images of the
 *    distinguishing points in their original order.
 * §2 step-04-image-of-a-line-rule and step-06-construct-line-image-parallel
 *    (p.12): line image and the coincident case; step-07-parallel-perpendicular-
 *    images (p.13): parallelism and perpendicularity of corresponding images.
 * §3 step-08-image-of-a-segment (p.13), step-09-image-of-ray-and-circle (p.14),
 *    teach-03-06-recap: segment length and ray direction; step-11-square-
 *    application (p.15): preservation of lengths and angles.
 * §4 step-05-construct-line-image-nonparallel (p.12), step-10-how-to-draw-line-
 *    image (p.14): two distinct points, their images, then their image line;
 *    step-13-practice-one (p.16): compass and unmarked straightedge.
 * §5 step-02-line-image-proof (p.11): proof rather than appearance;
 *    step-16-practice-four (p.16) and teach-03-06-recap: direction, one common
 *    translation, and preserving the order of connected image points.
 *
 * No separate area/collinearity theorem, coordinate/vector rule, exercise,
 * answer, or teacher-only solution is imported from another lesson.
 */
export const lesson03Notebook: LessonStepInput = {
  id: 'lesson-03-student-notebook',
  origin: 'authored',
  title: '📒 دفتر الطالب',
  kicker: 'شرح المنصّة',
  blocks: [
    {
      type: 'callout',
      variant: 'definition',
      title: '١. صورة شكل وفق انسحاب',
      blocks: [
        p('وفق الانسحاب، أي شكل وصورته قابلان للانطباق.'),
        p(
          'تنتقل نقاط الشكل كلها وفق الانسحاب نفسه؛ فلا يدور الشكل ولا ينعكس ولا يتغيّر حجمه. لرسم الصورة، ننقل النقاط المميّزة ونصل صورها بالترتيب نفسه.',
        ),
      ],
    },
    section('٢. صورة مستقيم والتوازي والتعامد', [
      p("صورة المستقيم $(d)$ وفق أي انسحاب هي مستقيم $(d')$ يوازي $(d)$."),
      p(
        "إذا كان $(d)$ يوازي مستقيم الانسحاب $(AB)$، فإن $(d')$ ينطبق على $(d)$؛ هذه هي الحالة الخاصة.",
      ),
      p("المستقيمان $(d')$ و$(D')$ هما على التوالي صورتا $(d)$ و$(D)$ وفق الانسحاب نفسه:"),
      {
        type: 'list',
        ordered: false,
        items: [
          "إذا كان $(d) \\parallel (D)$، فإن $(d') \\parallel (D')$.",
          "إذا كان $(d) \\perp (D)$، فإن $(d') \\perp (D')$.",
        ],
      },
    ]),
    section('٣. صور الأشكال الأساسية', [
      {
        type: 'list',
        ordered: false,
        items: [
          "صورة القطعة $[MN]$ هي القطعة $[M'N']$، حيث $M'$ و$N'$ صورتا $M$ و$N$؛ وتكون $[M'N'] \\parallel [MN]$ و$M'N'=MN$.",
          "صورة نصف المستقيم $[Mx)$ هي نصف المستقيم $[M'x')$ الموازي له والذي له الاتجاه نفسه؛ $M'$ صورة $M$، و$H'$ صورة النقطة غير المميّزة $H$ منه.",
          "صورة الدائرة $\\mathcal{C}$ ذات المركز $O$ هي الدائرة $\\mathcal{C}'$ التي مركزها $O'$ هو صورة $O$، ونصف قطرها يساوي نصف قطر $\\mathcal{C}$.",
          'صورة مستطيل $F$ هي مستطيل يطابق $F$.',
          'صورة مثلث $R$ هي مثلث يطابق $R$.',
        ],
      },
      p('الانسحاب يحافظ على الأطوال وقياس الزوايا.'),
    ]),
    section('٤. إنشاء صورة مستقيم', [
      p('لإنشاء صورة $(d)$ وفق الانسحاب الذي ينقل $A$ إلى $B$، باستعمال فرجار ومسطرة غير مدرجة:'),
      {
        type: 'list',
        ordered: true,
        items: [
          'نختار نقطتين مختلفتين $M$ و$N$ على المستقيم $(d)$.',
          "نرسم $M'$ و$N'$ صورتي $M$ و$N$ باستعمال الفرجار.",
          "نرسم المستقيم $(M'N')$ المار بالنقطتين $M'$ و$N'$.",
          "المستقيم $(M'N')$ هو $(d')$ صورة المستقيم $(d)$.",
        ],
      },
    ]),
    section('٥. قواعد وتنبيهات', [
      {
        type: 'list',
        ordered: false,
        items: [
          'لا نستنتج التوازي من مظهر الرسم؛ بل نبرهن عليه باستعمال الخواص.',
          'نلتزم باتجاه الانسحاب المطلوب: الانتقال من $A$ إلى $B$ يعاكس الانتقال من $B$ إلى $A$.',
          'نطبّق الحركة نفسها على جميع نقاط الشكل؛ اختلاف المسافات يغيّر أطوال الأضلاع أو الزوايا.',
          'نصل صور النقاط بالترتيب نفسه؛ تغيير ترتيب الوصل قد ينتج شكلاً معقوداً أو مقلوباً.',
        ],
      },
    ]),
  ],
};
