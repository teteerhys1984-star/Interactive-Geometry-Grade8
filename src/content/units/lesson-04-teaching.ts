import type { LessonStepInput } from '../schema';
const origin = 'authored' as const;
const kicker = 'شرح المنصّة';
export const teachingCongruenceIntro: LessonStepInput = {
  id: 'teach-04-01-intro',
  origin,
  kicker,
  title: 'ما معنى أن يتطابق مثلثان؟',
  blocks: [
    {
      type: 'teaching',
      variant: 'concept',
      title: 'تطابق كامل لا تشابه في الشكل فقط',
      blocks: [
        {
          type: 'paragraph',
          text: 'يمكن تخيّل قصّ أحد المثلثين ووضعه فوق الآخر: إذا انطبق كل رأس على رأس، وكل ضلع على ضلع، وكل زاوية على زاوية، فالمثلثان متطابقان. لا يكفي أن يبدوا بالشكل نفسه؛ يجب أن يتساويا في الحجم أيضاً.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'اكتب مقابلة الرؤوس أولاً.',
            'استخرج منها الأضلاع والزوايا المتقابلة.',
            'ابحث عن حالة تطابق كاملة، ولا تعتمد على مظهر الرسم.',
          ],
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'pitfall',
      title: 'خطأ شائع',
      blocks: [
        {
          type: 'paragraph',
          text: 'تساوي الزوايا الثلاث يجعل المثلثين متشابهين، لكنه لا يضمن التطابق؛ فقد يكون أحدهما نسخة مكبّرة من الآخر.',
        },
      ],
    },
  ],
};
export const teachingCases: LessonStepInput = {
  id: 'teach-04-02-cases',
  origin,
  kicker,
  title: 'كيف أختار حالة التطابق؟',
  blocks: [
    {
      type: 'teaching',
      variant: 'concept',
      title: 'ثلاث بصمات كافية',
      blocks: [
        {
          type: 'compare',
          title: 'قارن المعطيات',
          columns: ['المعطيات', 'الحالة'],
          rows: [
            ['ضلعان والزاوية الواقعة بينهما', 'ضلع–زاوية محصورة–ضلع'],
            ['ضلع والزاويتان عند طرفيه', 'زاوية–ضلع–زاوية'],
            ['الأضلاع الثلاثة', 'ضلع–ضلع–ضلع'],
          ],
        },
        {
          type: 'paragraph',
          text: 'في الحالة الأولى انتبه إلى كلمة «المحصورة»: يجب أن تكون الزاوية بين الضلعين المعلومين. وفي الحالة الثانية يجب أن تكون الزاويتان مجاورتين للضلع المعلوم.',
        },
      ],
    },
  ],
};
export const teachingProof: LessonStepInput = {
  id: 'teach-04-03-proof',
  origin,
  kicker,
  title: 'بناء برهان تطابق واضح',
  blocks: [
    {
      type: 'teaching',
      variant: 'example',
      title: 'قالب من ثلاث خطوات',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'دوّن المعطيات المتساوية، مع عزل أسماء النقاط والرموز الرياضية.',
            'حدّد الحالة التي تحققها المعطيات بالضبط.',
            'اكتب المثلثين بترتيب رؤوس متقابلة، ثم استنتج تساوي العناصر المطلوبة.',
          ],
        },
        {
          type: 'paragraph',
          text: 'مثال من المنصّة: إذا كان $AB=DE$ و$AC=DF$ و$\\widehat{BAC}=\\widehat{EDF}$، فالزاويتان محصورتان بين الضلعين المذكورين؛ لذلك يتطابق المثلثان $ABC$ و$DEF$ بحالة ضلعين والزاوية المحصورة.',
        },
      ],
    },
  ],
};
export const teachingRecap: LessonStepInput = {
  id: 'teach-04-04-recap',
  origin,
  kicker,
  title: 'مراجعة قبل الاختبار',
  blocks: [
    {
      type: 'teaching',
      variant: 'summary',
      title: 'قائمة التحقّق',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'التطابق يعني تساوي العناصر المتقابلة كلها.',
            'الحالات العامة الثلاث: ضلعان والزاوية المحصورة؛ ضلع والزاويتان المجاورتان؛ الأضلاع الثلاثة.',
            'في المثلثين القائمين تكفي أيضاً مساواة الوتر وضلع قائمة، أو الوتر وزاوية حادة.',
            'الشكل المرسوم يساعد على القراءة، لكنه ليس برهاناً وحده.',
          ],
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'tip',
      title: 'تحقّق من ترتيب الحروف',
      collapsible: true,
      revealLabel: 'اعرض طريقة التحقّق',
      blocks: [
        {
          type: 'paragraph',
          text: 'إذا كتبت $ABC$ مقابل $DEF$ فهذا يعني $A↔D$ و$B↔E$ و$C↔F$. راجع كل مساواة وفق هذا الترتيب قبل اعتمادها.',
        },
      ],
    },
  ],
};
