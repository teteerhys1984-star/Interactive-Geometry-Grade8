import type { ContentBlock, LessonStepInput } from '../schema';

const p = (text: string): ContentBlock => ({ type: 'paragraph', text });
const math = (latex: string, label: string): ContentBlock => ({ type: 'math', latex, label });
const section = (title: string, blocks: ContentBlock[]): ContentBlock => ({
  type: 'callout',
  variant: 'note',
  title,
  blocks,
});

/** Static copying material for Lesson 4 only. Not activities, worked answers or new theory.
 * Definition, the three cases and the right-triangle cases: source steps p.17–19 (paraphrased).
 * Vertex-order reading, pitfalls and proof rules: the Lesson 4 «شرح المنصّة» steps.
 * Correspondence is written with primed vertices (A′B′C′), never with the printed letters
 * of any exercise. No numerical example, page attribution or exercise solution is included.
 */
export const lesson04Notebook: LessonStepInput = {
  id: 'lesson-04-student-notebook',
  origin: 'authored',
  title: '📒 دفتر الطالب',
  kicker: 'شرح المنصّة',
  blocks: [
    section('١. تعريف تطابق مثلثين', [
      p(
        'يتطابق مثلثان إذا تساوت كل عناصر أحدهما مع العناصر المقابلة لها في المثلث الآخر. عناصر المثلث هي أضلاعه وزواياه.',
      ),
      p('نكتب التطابق بترتيب متقابل للرؤوس، فيكون:'),
      math("ABC \\cong A'B'C'", 'تطابق المثلثين'),
      math(
        "A \\leftrightarrow A',\\quad B \\leftrightarrow B',\\quad C \\leftrightarrow C'",
        'الرؤوس المتقابلة',
      ),
      p('ومن هذه المقابلة تتساوى العناصر المتقابلة:'),
      math("AB = A'B',\\quad BC = B'C',\\quad CA = C'A'", 'الأضلاع المتقابلة'),
      math(
        "\\widehat{BAC} = \\widehat{B'A'C'},\\quad \\widehat{ABC} = \\widehat{A'B'C'},\\quad \\widehat{BCA} = \\widehat{B'C'A'}",
        'الزوايا المتقابلة',
      ),
    ]),

    section('٢. حالات تطابق المثلثات الثلاث', [
      p('يكفي في كل حالة أن نتحقق من المعطيات المحدَّدة فيها:'),
      {
        type: 'list',
        ordered: true,
        items: [
          'الحالة الأولى: ضلعان والزاوية المحصورة بينهما متساوية في المثلثين.',
          'الحالة الثانية: ضلع والزاويتان المجاورتان له متساويتان في المثلثين.',
          'الحالة الثالثة: الأضلاع الثلاثة متساوية في المثلثين.',
        ],
      },
      math(
        "AB = A'B',\\quad AC = A'C',\\quad \\widehat{BAC} = \\widehat{B'A'C'}",
        'الحالة الأولى: ضلعان وزاوية محصورة',
      ),
      math(
        "BC = B'C',\\quad \\widehat{ABC} = \\widehat{A'B'C'},\\quad \\widehat{BCA} = \\widehat{B'C'A'}",
        'الحالة الثانية: ضلع وزاويتان مجاورتان',
      ),
      math("AB = A'B',\\quad BC = B'C',\\quad CA = C'A'", 'الحالة الثالثة: الأضلاع الثلاثة'),
      p(
        'الزاوية المحصورة بين ضلعين هي الزاوية التي رأسها هو الرأس المشترك للضلعين. والضلع المعطى في الحالة الثانية هو الضلع الواصل بين رأسي الزاويتين.',
      ),
    ]),

    section('٣. العناصر المتناظرة والاستنتاج', [
      {
        type: 'list',
        ordered: true,
        items: [
          'اقرأ المقابلة من ترتيب الرؤوس: الأول مع الأول، والثاني مع الثاني، والثالث مع الثالث.',
          'استنتج تساوي كل ضلع مع الضلع المقابل له، وكل زاوية مع الزاوية المقابلة لها، بالترتيب نفسه.',
          'اكتب كل مساواة مستنتجة مع سببها: معطى، أو نتيجة سابقة، أو حالة التطابق المستعملة.',
        ],
      },
      math(
        "ABC \\cong A'B'C' \\;\\Longrightarrow\\; AB = A'B',\\quad \\widehat{ABC} = \\widehat{A'B'C'}",
        'استنتاج من ترتيب الرؤوس',
      ),
      p(
        'لا تبدّل ترتيب الحروف في المساواة المستنتجة، ولا تستنتج مساواة لا تنتج من المقابلة أو من المعطيات.',
      ),
    ]),

    section('٤. تطابق المثلثين القائمين', [
      p(
        'الوتر هو الضلع المقابل للزاوية القائمة. الحالتان الآتيتان خاصتان بالمثلثين القائمين فقط، فتحقّق أولاً من أن المثلثين قائمان:',
      ),
      {
        type: 'list',
        ordered: false,
        items: [
          'الحالة الأولى: وتر وضلع قائمة في أحد المثلثين يساويان وتراً وضلع قائمة في المثلث الآخر.',
          'الحالة الثانية: وتر وزاوية حادة في أحد المثلثين يساويان وتراً وزاوية حادة في المثلث الآخر.',
        ],
      },
      p('لا تطبّق هاتين الحالتين على مثلثين غير قائمين.'),
    ]),

    section('٥. قواعد البرهان الهندسي', [
      {
        type: 'list',
        ordered: true,
        items: [
          'ابدأ من المعطيات، واكتب كل مساواة مع سببها: معطى، أو خاصية أو نتيجة مثبتة سابقاً.',
          'اذكر حالة التطابق المستعملة قبل النتيجة.',
          'اكتب الرؤوس بترتيب متقابل في علاقة التطابق وفي كل مساواة بعدها.',
        ],
      },
      p(
        'المثلثان اللذان يبدوان متطابقين في الرسم ليسا دليلاً على التطابق؛ الدليل هو المعطيات والحالة المستعملة.',
      ),
    ]),

    section('٦. تنبيهات وأخطاء شائعة', [
      {
        type: 'list',
        ordered: false,
        items: [
          'الزاوية المحصورة ليست أي زاوية: في الحالة الأولى يجب أن تكون بين الضلعين المعطيين.',
          'لا تخلط بين الضلع المعلوم والضلع المقابل لإحدى الزوايا: في الحالة الثانية يجب أن يكون الضلع المعلوم واصلاً بين رأسي الزاويتين.',
          "ترتيب الرؤوس الخاطئ يغيّر المساواة: إذا كتبت $ABC \\cong A'B'C'$ فإن $AB = A'B'$، وليس $AB = B'C'$.",
          'ثلاث زوايا متساوية وحدها لا تثبت التطابق، لأن المثلث المكبَّر له الزوايا نفسها.',
          'لا تُثبت التطابق بالنظر إلى الرسم؛ اذكر المعطى أو الحالة التي تبرّر كل مساواة.',
        ],
      },
    ]),
  ],
};
