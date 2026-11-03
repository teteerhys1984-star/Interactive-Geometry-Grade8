import type { ContentBlock, LessonStepInput } from '../schema';

const p = (text: string): ContentBlock => ({ type: 'paragraph', text });
const math = (latex: string, label: string): ContentBlock => ({ type: 'math', latex, label });
const section = (title: string, blocks: ContentBlock[]): ContentBlock => ({
  type: 'callout',
  variant: 'note',
  title,
  blocks,
});

/** Copying material from Lesson 3 only, not activities, worked answers or new theory.
 * §1: teach-03-01-shape-as-points; step-01 (p.11), step-09 (p.14), step-11 (p.15).
 * §2: step-04/05/06 (p.12), step-08 (p.13), step-09 (p.14); teach-03-06-recap.
 * §3: step-07 (p.13): (d′), (D′) are respectively the images of (d), (D).
 * §4: step-05 (p.12), step-10 (p.14), step-13 (p.16: compass/unmarked ruler).
 * §5: step-02 (p.11: prove, don't eyeball); teach-03-01 and teach-03-06.
 * Collinearity and area are not independently established here, so are not added.
 */
export const lesson03Notebook: LessonStepInput = {
  id: 'lesson-03-student-notebook',
  origin: 'authored',
  title: '📒 دفتر الطالب',
  kicker: 'شرح المنصّة',
  blocks: [
    section('١. صورة الشكل', [
      p(
        'صورة الشكل تتكوّن من صور نقاطه وفق الانسحاب نفسه؛ كل نقطة تنتقل بالاتجاه نفسه وبالمسافة نفسها.',
      ),
      p('وفق الانسحاب، أي شكل وصورته قابلان للانطباق؛ فلا يدور الشكل ولا يتغيّر حجمه.'),
      p('صورة المثلث $R$ مثلث يطابق $R$، وصورة المستطيل $F$ مستطيل يطابق $F$.'),
      p('يحافظ الانسحاب على الأطوال وقياس الزوايا.'),
    ]),

    section('٢. صور الأشكال الأساسية', [
      p('فيما يأتي نعتمد الانسحاب الذي ينقل $A$ إلى $B$:'),
      {
        type: 'list',
        ordered: false,
        items: [
          "صورة المستقيم $(d)$ مستقيم $(d')$ يوازيه. إذا كان $(d)$ يوازي $(AB)$، فإن $(d')$ ينطبق على $(d)$.",
          "صورة القطعة $[MN]$ هي القطعة $[M'N']$ الموازية لها؛ $M'$ و$N'$ صورتا $M$ و$N$ على الترتيب، و$M'N'=MN$.",
          "صورة نصف المستقيم $[Mx)$ هي نصف المستقيم $[M'x')$ الموازي له وبالاتجاه نفسه؛ $M'$ صورة المبدأ $M$، و$H'$ صورة نقطة أخرى $H$ منه.",
          "صورة الدائرة $\\mathcal{C}$ ذات المركز $O$ دائرة $\\mathcal{C}'$ مركزها $O'$ صورة $O$، ونصف قطرها يساوي نصف قطر $\\mathcal{C}$.",
        ],
      },
    ]),

    section('٣. حفظ التوازي والتعامد', [
      p(
        "إذا كان $(d')$ و$(D')$ صورتَي المستقيمين $(d)$ و$(D)$ على الترتيب وفق الانسحاب نفسه، فإن:",
      ),
      math("(d) \\parallel (D) \\Longrightarrow (d') \\parallel (D')", 'صورة مستقيمين متوازيين'),
      math("(d) \\perp (D) \\Longrightarrow (d') \\perp (D')", 'صورة مستقيمين متعامدين'),
    ]),

    section('٤. إنشاء صورة مستقيم', [
      p('لإنشاء صورة $(d)$ وفق الانسحاب الذي ينقل $A$ إلى $B$، نستعمل فرجاراً ومسطرة غير مدرجة:'),
      {
        type: 'list',
        ordered: true,
        items: [
          'نختار نقطتين مختلفتين $M$ و$N$ على المستقيم $(d)$.',
          "ننشئ صورتيهما $M'$ و$N'$ وفق الانسحاب نفسه، باستعمال الفرجار بالطريقة المتعلّمة سابقاً.",
          "نرسم المستقيم $(M'N')$ المار بصورتي النقطتين.",
          "نسمّيه $(d')$؛ وهو صورة المستقيم $(d)$ وفق هذا الانسحاب.",
        ],
      },
    ]),

    section('٥. قواعد لازمة للرسم والبرهان', [
      {
        type: 'list',
        ordered: false,
        items: [
          'لا نستنتج التوازي من مظهر الرسم؛ نعلّل بالخواص وسلسلة من الاستنتاجات.',
          'نلتزم اتجاه الانسحاب المطلوب والمسافة نفسها لكل الرؤوس، ثم نصل صورها بالترتيب الموافق للأصل.',
        ],
      },
    ]),
  ],
};
