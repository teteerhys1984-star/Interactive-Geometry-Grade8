import type { ContentBlock, LessonStepInput } from '../schema';

const p = (text: string): ContentBlock => ({ type: 'paragraph', text });
const math = (latex: string): ContentBlock => ({ type: 'math', latex });
const section = (title: string, blocks: ContentBlock[]): ContentBlock => ({
  type: 'callout',
  variant: 'note',
  title,
  blocks,
});

/** Selected writing material from lesson 1 only, not new teaching or exercises.
 * Definition/notation: teachingIntro; construction: teachingDirectionDistance;
 * shape rule/parallelism: teachingEveryPoint; four invariants: textbook step 4
 * and teachingWhyPreserved; cautions: teachingCommonMistakes.
 */
export const lesson01Notebook: LessonStepInput = {
  id: 'student-notebook',
  origin: 'authored',
  title: '📒 دفتر الطالب',
  kicker: 'شرح المنصّة',
  blocks: [
    {
      type: 'callout',
      variant: 'definition',
      title: '١. تعريف الانسحاب وتعيينه',
      blocks: [
        p(
          'الانسحاب حركة تنقل جميع نقاط الشكل في الاتجاه نفسه وبالمسافة نفسها، دون دوران أو قلب؛ فيتغير موضع الشكل فقط، لا شكله ولا أبعاده.',
        ),
        p(
          'يتعيّن الانسحاب بمعرفة نقطة وصورتها. فالانسحاب الذي ينقل $A$ إلى $B$ اتجاهه من $A$ نحو $B$، ومسافته الطول $AB$.',
        ),
      ],
    },
    section('٢. الرموز ومعانيها', [
      {
        type: 'list',
        ordered: false,
        items: [
          "$M'$ (تُقرأ: $M$ مسطّرة): صورة النقطة $M$ وفق الانسحاب؛ و$F'$ صورة الشكل $F$.",
          '$[AB]$: القطعة المستقيمة؛ $(AB)$: المستقيم؛ $AB$: طول القطعة.',
          '$\\parallel$: يوازي؛ $\\widehat{SMN}$: الزاوية التي رأسها $M$.',
          '$\\mathcal{A}(F)$: مساحة الشكل $F$.',
        ],
      },
    ]),
    section('٣. صورة نقطة وصورة شكل', [
      p(
        "وفق الانسحاب الذي ينقل $A$ إلى $B$، ننقل النقطة $M$ في الاتجاه من $A$ نحو $B$ وبالطول $AB$، فنصل إلى صورتها $M'$. لكل نقطتين $M$ و$N$ وصورتيهما:",
      ),
      math("MM' = NN' = AB"),
      math("(MM') \\parallel (AB) \\qquad (NN') \\parallel (AB)"),
      p("في وضع متوازي الأضلاع الموضّح في الدرس، يكون الرباعي $ABM'M$ متوازي أضلاع."),
      p(
        'صورة الشكل هي مجموعة صور جميع نقاطه وفق الانسحاب نفسه. لإيجاد صورة مضلّع، ننقل كل رأس بالاتجاه والمسافة نفسيهما، ثم نصل الصور بالترتيب نفسه؛ فالانسحاب يحفظ الاستقامة.',
      ),
      p('لتسمية الانسحاب الناقل شكلاً إلى صورته نختار رأساً وصورته المناظرة، لا أي رأس آخر.'),
    ]),
    section('٤. خواص الانسحاب', [
      p(
        "في العلاقات الآتية $M'$ و$N'$ و$S'$ و$P'$ صور النقاط $M$ و$N$ و$S$ و$P$ وفق الانسحاب نفسه.",
      ),
      {
        type: 'list',
        ordered: true,
        items: ['يحافظ الانسحاب على الأطوال: طول كل قطعة يساوي طول صورتها.'],
      },
      math("M'N' = MN"),
      p(
        "٢. يحافظ على الاستقامة: إذا كانت $M$ و$S$ و$P$ على استقامة واحدة، فإن $M'$ و$S'$ و$P'$ على استقامة واحدة.",
      ),
      p('٣. يحافظ على قياس الزوايا: قياس كل زاوية يساوي قياس صورتها.'),
      math("\\widehat{S'M'N'} = \\widehat{SMN}"),
      p('٤. يحافظ على المساحات: مساحة الشكل تساوي مساحة صورته.'),
      math("\\mathcal{A}(F') = \\mathcal{A}(F)"),
      p('كما أن كل قطعة توازي القطعة المناظرة لها في الصورة؛ فلا يتغيّر اتجاه الشكل:'),
      math("(MN) \\parallel (M'N')"),
    ]),
    section('٥. ملاحظات لازمة للتطبيق', [
      {
        type: 'list',
        ordered: false,
        items: [
          'توازي المسارات يصف حركة النقاط، أما توازي القطع المتناظرة فيصف الشكل وصورته؛ لا تخلط بين العلاقتين.',
          'تساوي الأطوال والزوايا وحده لا يكفي للحكم بأن الحركة انسحاب؛ فقد يكون الشكل مدوّراً أو مقلوباً. وكذلك التكبير ليس انسحاباً لأنه يغيّر الأطوال.',
          'تعيين الانسحاب بنقطة وصورتها لا يعني أن شكلين كاملين متناظران به: يجب تحقق الاتجاه والمسافة نفسيهما لجميع النقاط المتناظرة، لا لنقطة واحدة فقط.',
          'الانسحاب من $A$ إلى $B$ يختلف عن الانسحاب من $B$ إلى $A$: المسافة واحدة والاتجاه معاكس، وكل منهما يلغي أثر الآخر.',
        ],
      },
    ]),
  ],
};
