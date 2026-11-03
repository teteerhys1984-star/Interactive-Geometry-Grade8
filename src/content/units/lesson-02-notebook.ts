import type { ContentBlock, LessonStepInput } from '../schema';

const p = (text: string): ContentBlock => ({ type: 'paragraph', text });
const math = (latex: string, label: string): ContentBlock => ({ type: 'math', latex, label });
const section = (title: string, blocks: ContentBlock[]): ContentBlock => ({
  type: 'callout',
  variant: 'note',
  title,
  blocks,
});

/**
 * ============================================================================
 *  الدرس الثاني — 📒 دفتر الطالب (مادّة التدوين فقط، لا شرح جديد)
 * ============================================================================
 *  Everything below is extracted from Lesson 2 alone. No story, activity,
 *  printed question, exercise, worked answer or long teaching explanation is
 *  reproduced; only what the student has to copy into a school notebook.
 *
 *  PROVENANCE (printed text first, then the platform's own teaching):
 *   §1  `step-03-definition` (page 8) — the definition, the two bisected
 *       segments, the midpoint `I` and the order of the four vertices;
 *       `teach-04-why-a-parallelogram` (diagonals, not sides);
 *       `teach-05-two-cases` (why the definition excludes (AB)).
 *   §2  `step-04-special-case` (page 9) — verbatim statement, the common
 *       midpoint and the image still existing; `teach-05-two-cases`.
 *   §3  `step-05-knowledge-example` «تذكّر» (page 9) — the two tools;
 *       `teach-03-when-the-grid-disappears` (the compass carries a length);
 *       `step-06-construction-method` (page 9) — the four printed steps, kept
 *       as ONE connected ordered list with (C₁), (C₂) and the chosen intersection;
 *       `teach-06-why-the-construction-works` (rejected intersection, SSS proof);
 *       `step-07-justification` (page 9) — the two radius equalities and the
 *       conclusion.
 *   §4  `teach-02-reading-the-vector` (count columns/rows, the pair of
 *       numbers, printed sheet ≠ page edge) and `step-11-practice-3` (wider
 *       notebook page). No coordinates or counts are invented here.
 *   §5  `teach-03-when-the-grid-disappears`, `teach-04-why-a-parallelogram`,
 *       `teach-05-two-cases`, `teach-06-why-the-construction-works`,
 *       `teach-02-reading-the-vector` — the differences and the warned errors.
 *
 *  Notation is the lesson's own: [AB] segment · (AB) line · AB length ·
 *  primes for images · (𝒞₁) circles. No vector or coordinate convention is
 *  introduced, and nothing is borrowed from Lesson 1's notebook.
 * ============================================================================
 */
export const lesson02Notebook: LessonStepInput = {
  id: 'lesson-02-student-notebook',
  origin: 'authored',
  title: '📒 دفتر الطالب',
  kicker: 'شرح المنصّة',
  blocks: [
    {
      type: 'callout',
      variant: 'definition',
      title: '١. تعريف صورة نقطة وفق انسحاب',
      blocks: [
        p(
          "القول إنَّ « النقطة $M'$ هي صورة النقطة $M$ التي لا تنتمي إلى المستقيم $(AB)$، وفق الانسحاب الذي ينقل النقطة $A$ إلى النقطة $B$ » يعني أنَّ « الرباعي $ABM'M$ متوازي أضلاع » ويترتب على ذلك أنَّ القطعتين $[AM']$ و $[BM]$ متناصفتان.",
        ),
        p(
          "القطعتان المتقاطعتان هما القطران $[AM']$ و $[BM]$، ونقطة تقاطعهما $I$ منتصف لكلٍّ منهما؛ أمّا $[AB]$ و $[MM']$ فضلعان متقابلان لا يتقاطعان.",
        ),
        p(
          'شرط عدم انتماء $M$ إلى $(AB)$ يجعل للرباعي مساحة، فيصحّ وصفه بمتوازي أضلاع؛ وهو شرط في صياغة التعريف لا في وجود الصورة.',
        ),
      ],
    },

    section('٢. الحالة الخاصة', [
      p(
        "في حالة النقطة $M$ تنتمي إلى المستقيم $(AB)$، تكون النقاط $A$ و $B$ و $M'$ و $M$ على استقامة واحدة، وتكون القطعتان $[AM']$ و $[BM]$ متناصفتين.",
      ),
      p('القطعتان على المستقيم نفسه، ومنتصفهما نقطة واحدة مشتركة.'),
      p(
        "الصورة $M'$ موجودة في الحالتين، والانسحاب يعمل هنا كما يعمل هناك؛ الذي يسقط هو وصف الرباعي بمتوازي أضلاع فقط.",
      ),
    ]),

    section('٣. إنشاء صورة نقطة', [
      p(
        'في الإنشاء الهندسي نستعمل فقط فرجاراً ومسطرةً غير مدرجة؛ المسطرة المدرجة تقرأ الطول بالأرقام، أمّا الفرجار فينقل الطول دون أن يقرأه.',
      ),
      p('خطوات الإنشاء وفق الانسحاب الذي ينقل $G$ إلى $H$:'),
      {
        type: 'list',
        ordered: true,
        items: [
          "لنكمل $HGM$ إلى متوازي أضلاع $HGMM'$.",
          'نرسم الدائرة $(\\mathcal{C}_1)$ التي مركزها $M$ و نصف قطرها يساوي $GH$ (فتحة الفرجار)',
          'نرسم الدائرة $(\\mathcal{C}_2)$ التي مركزها $H$ و نصف قطرها يساوي $GM$ (فتحة الفرجار)',
          "تتقاطع الدائرتان في نقطتين. نختار النقطة التي تكمل $HGM$ إلى رباعي. فتكون النقطة $M'$ هي صورة النقطة $M$.",
        ],
      },
      p(
        'نقطة التقاطع الأخرى لا تكمل متوازي الأضلاع، فلا تصلح صورةً لـ $M$؛ واختيار النقطة الصحيحة جزء من الإنشاء.',
      ),
      math("MM' = GH", 'نصف قطر الدائرة الأولى'),
      math("HM' = GM", 'نصف قطر الدائرة الثانية'),
      p(
        "التعليل: التساويان ناتجان عن نصفَي القطر، والمثلثان $HGM$ و $MM'H$ متطابقان (ض.ض.ض)، فيتوازى $[HG]$ و $[MM']$؛ فالرباعي $HGMM'$ متوازي أضلاع، ويترتب على ذلك أنَّ $M'$ هي صورة $M$.",
      ),
    ]),

    section('٤. العمل على الشبكة', [
      p(
        'نقرأ الانسحاب الذي ينقل $A$ إلى $B$ على الورقة السنتيمترية بالعدّ: اتجاهه من $A$ نحو $B$، ومقداره زوج من عدد الأعمدة أفقياً وعدد الأسطر رأسياً؛ ثم نطبّق المقدار نفسه على كل نقطة.',
      ),
      p('لكلٍّ من الأعمدة والأسطر محوره، وقد يختلف المقداران؛ فلا يُجمعان في رقم واحد.'),
      p(
        'إذا خرجت الصورة عن حدود الشبكة المطبوعة فهي صحيحة: الشبكة المطبوعة ليست حدود الورقة، والتعليمة تطلب نقل الشكل إلى ورقة سنتيمترية أوسع أو نسخ الشبكة على صفحة من الدفتر مع ترك هامش كافٍ.',
      ),
    ]),

    section('٥. قواعد وملاحظات التطبيق', [
      {
        type: 'list',
        ordered: false,
        items: [
          'القياس بالمسطرة المدرجة رسم بالقياس لا إنشاءً؛ الإنشاء يعتمد على الأطوال المعطاة نفسها ويثبت أن الناتج هو الصورة بلا قياس.',
          "الحالة العامة: $M$ لا تنتمي إلى $(AB)$ والرباعي $ABM'M$ متوازي أضلاع له مساحة. الحالة الخاصة: $M$ تنتمي إلى $(AB)$ والنقاط الأربع على استقامة واحدة، والصورة موجودة.",
          "يُقرأ الرباعي على محيطه بالترتيب $A$ ثم $B$ ثم $M'$ ثم $M$؛ هذا الترتيب هو ما يحدّد القطرين، وتغييره يغيّر القطرين والمعنى.",
          "أخطاء حذّر منها الدرس: عدّ $[AB]$ و $[MM']$ قطرين متناصفين، وهما ضلعان متقابلان؛ ظنّ أن $M$ على $(AB)$ فلا صورة لها؛ ظنّ أن $[AM']$ و $[BM]$ لا تتقاطعان في الحالة الخاصة؛ جمع الأعمدة والأسطر في رقم واحد؛ رفض صورة خرجت عن الشبكة المطبوعة.",
          'أن يبدو الشكل متوازياً ليس برهاناً؛ البرهان هو التساويان الناتجان عن الفرجار، ثم تطابق المثلثين، ثم التوازي.',
        ],
      },
    ]),
  ],
};
