import type { LessonStepInput } from '../schema';

/**
 * Platform-authored teaching for Lesson 4 «تطابق المثلثات». None of these
 * words or figures is presented as textbook content: every step is badged
 * «شرح المنصّة», carries `origin: 'authored'` and no textbook page. All
 * coordinates in the teaching figures are chosen here and are exact by
 * construction.
 */
const AUTHORED = 'authored' as const;
const KICKER = 'شرح المنصّة';

export const teachingFromTranslationToCongruence: LessonStepInput = {
  id: 'teach-04-01-from-translation-to-congruence',
  origin: AUTHORED,
  kicker: KICKER,
  title: 'من الانسحاب إلى تطابق المثلثات',
  blocks: [
    {
      type: 'teaching',
      variant: 'concept',
      title: 'ماذا يعني أن يتطابق مثلثان؟',
      blocks: [
        {
          type: 'paragraph',
          text: 'تعلّمت في الدروس السابقة أن الانسحاب ينقل الشكل من دون أن يغيّر أطواله ولا زواياه؛ فإذا وضعت المثلث فوق صورته انطبقا تماماً. هذا الانطباق التام هو ما نسمّيه «التطابق»: مثلثان يتطابقان عندما يمكن أن ينطبق أحدهما على الآخر بحيث يقع كل رأس على رأس، وكل ضلع على ضلع، وكل زاوية على زاوية.',
        },
        {
          type: 'paragraph',
          text: 'في هذا الدرس سنقلب السؤال: بدل أن ننقل المثلث فعلياً ونتحقق من الانطباق، سنبحث عن أقل ما يكفي من المعلومات (أطوال أو زوايا) لنحكم أن مثلثين متطابقان من دون قصّ ولا نقل. هذا هو سرّ «حالات التطابق» الثلاث التي ستكتشفها في نشاط الكتاب.',
        },
        {
          type: 'figure',
          diagram: {
            kind: 'constructed',
            origin: AUTHORED,
            id: 'auth-04-translation-congruence',
            renderer: 'translation-figure',
            alt: 'مثلث $ABC$ وصورته وفق انسحاب، مع أسهم متوازية متساوية تصل كل رأس بصورته؛ المثلثان قابلان للانطباق.',
            caption: 'مثال من إعداد المنصّة: المثلث وصورته وفق انسحاب مثلثان متطابقان.',
            construction: {
              shape: [
                [0, 0],
                [2.6, 0.3],
                [0.9, 2.1],
              ],
              vector: [3.9, 1],
              labels: ['A', 'B', 'C'],
              connectors: [0, 1, 2],
              grid: true,
            },
          },
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'why',
      title: 'لماذا لا نحتاج إلى العناصر الستة كلها؟',
      blocks: [
        {
          type: 'paragraph',
          text: 'لكل مثلث ستة عناصر: ثلاثة أضلاع وثلاث زوايا. قد تظن أنه يجب التحقق من الستة كلها حتى نحكم بالتطابق، لكن العناصر مترابطة: فمجموع الزوايا ثابت، وطولا ضلعين مع الزاوية المحصورة بينهما يحدّدان الضلع الثالث تحديداً كاملاً. لذلك يكفي اختيار ثلاثة عناصر «مناسبة» ليتحدّد المثلث كله، وهذا بالضبط ما يفحصه نشاط الكتاب في الأشكال ① و② و③.',
        },
      ],
    },
  ],
};

export const teachingElementsMatching: LessonStepInput = {
  id: 'teach-04-02-elements-matching',
  origin: AUTHORED,
  kicker: KICKER,
  title: 'العناصر المتقابلة: كيف نقرؤها؟',
  blocks: [
    {
      type: 'teaching',
      variant: 'concept',
      title: 'التطابق مراسلة بين العناصر',
      blocks: [
        {
          type: 'paragraph',
          text: "تعريف الكتاب يقول: «تساوت عناصر أحدهما مع العناصر المقابلة لها في المثلث الآخر». كلمة «المقابلة» هي مفتاح الدرس كله: لا يكفي أن تتساوى القياسات كيفما اتفق، بل يجب أن يتقابل كل عنصر مع نظيره. فإذا انطبق المثلث $ABC$ على المثلث $A'B'C'$ بحيث وقع $A$ على $A'$ و $B$ على $B'$ و $C$ على $C'$، فإن التقابل يكون كما في الجدول الآتي:",
        },
        {
          type: 'compare',
          title: 'جدول من إعداد المنصّة',
          // Column headers render as plain text, so they stay free of $…$ notation.
          columns: ['في المثلث الأول', 'يقابله في المثلث الآخر'],
          rows: [
            ['الضلع $[AB]$', "الضلع $[A'B']$"],
            ['الضلع $[BC]$', "الضلع $[B'C']$"],
            ['الضلع $[AC]$', "الضلع $[A'C']$"],
            ['الزاوية $\\widehat{A}$', "الزاوية $\\widehat{A'}$"],
            ['الزاوية $\\widehat{B}$', "الزاوية $\\widehat{B'}$"],
            ['الزاوية $\\widehat{C}$', "الزاوية $\\widehat{C'}$"],
          ],
        },
        {
          type: 'paragraph',
          text: 'لاحظ أن الزاوية تقابل الزاوية التي رأسها هو الرأس المقابل، وأن الضلع يقابل الضلع الذي طرفاه هما الرأسان المقابلان. وفي الأشكال، نتعرّف العناصر المتساوية من العلامات: شرطة أو شرطتان على الأضلاع المتساوية، وقوس أو نقطة للزوايا المتساوية.',
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'tip',
      title: 'ما معنى «الزاوية المحصورة» و«الزاويتان المجاورتان»؟',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'الزاوية المحصورة بين ضلعين هي الزاوية التي رأسها نقطة التقاء هذين الضلعين؛ في المثلث $ABC$ الزاوية المحصورة بين $[AB]$ و $[AC]$ هي $\\widehat{A}$.',
            'الزاويتان المجاورتان لضلع هما الزاويتان اللتان رأساهما طرفا هذا الضلع؛ فللضلع $[BC]$ الزاويتان المجاورتان هما $\\widehat{B}$ و $\\widehat{C}$.',
            'انتبه: زاوية غير محصورة بين الضلعين المعلومين لا تصلح للحالة الأولى، وزاوية غير مجاورة للضلع المعلوم لا تصلح للحالة الثانية.',
          ],
        },
      ],
    },
  ],
};

export const teachingCasesLab: LessonStepInput = {
  id: 'teach-04-03-cases-lab',
  origin: AUTHORED,
  kicker: KICKER,
  title: 'مختبر حالات التطابق',
  blocks: [
    {
      type: 'teaching',
      variant: 'example',
      title: 'ثلاثة معطيات مناسبة تحدّد المثلث كله',
      blocks: [
        {
          type: 'paragraph',
          text: 'هذا مختبر من إعداد المنصّة، وليس شكلاً من الكتاب. اختر إحدى الحالات الثلاث ثم غيّر المعطيات بالمنزلقات: تُبنى نسختان من المثلث من المعطيات نفسها، فتجدهما متطابقتين دائماً، وتُحسب لك العناصر الباقية لتلاحظ أنها خرجت متساوية من تلقاء نفسها من دون أن نفرضها.',
        },
        {
          type: 'figure',
          diagram: {
            kind: 'interactive',
            origin: AUTHORED,
            id: 'auth-04-cases-lab',
            renderer: 'congruence-cases-lab',
            alt: 'مختبر تفاعلي يعرض مثلثين مبنيين من المعطيات نفسها وفق إحدى حالات التطابق الثلاث، مع منزلقات لتغيير الأطوال والزوايا وعرض العناصر المحسوبة.',
            caption: 'تفاعل من إعداد المنصّة: المعطيات الثلاثة المناسبة تنتج مثلثاً واحداً لا غير.',
            params: {},
          },
        },
      ],
    },
  ],
};

export const teachingProofWriting: LessonStepInput = {
  id: 'teach-04-04-proof-writing',
  origin: AUTHORED,
  kicker: KICKER,
  title: 'كيف نكتب برهان تطابق؟',
  blocks: [
    {
      type: 'teaching',
      variant: 'concept',
      title: 'وصفة من أربع خطوات',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'سمِّ المثلثين اللذين تريد إثبات تطابقهما.',
            'اجمع ثلاث تساويات بين عناصر متقابلة، واذكر مع كل تساوٍ سببه (معطى، تقابل بالرأس، خاصة متوازي الأضلاع، ضلع مشترك، …).',
            'تأكد أن التساويات الثلاث توافق إحدى حالات التطابق: ضلعان والزاوية المحصورة، أو ضلع والزاويتان المجاورتان، أو الأضلاع الثلاثة.',
            'استنتج التطابق مسمّياً الحالة التي استعملتها، كما تفعل أمثلة الكتاب حرفياً.',
          ],
        },
        {
          type: 'paragraph',
          text: 'تذكّر قاعدة الكتاب من الدرس الثالث: لا يجوز استنتاج الإجابة من الشكل، بل بالبرهان عبر سلسلة من الاستنتاجات. الشكل يذكّرك بالمعطيات، أما كل تساوٍ فيحتاج إلى سبب مكتوب.',
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'example',
      title: 'مثال محلول من إعداد المنصّة',
      blocks: [
        {
          type: 'paragraph',
          text: 'القطعتان $[AB]$ و $[CD]$ متناصفتان في النقطة $M$ (أي إن $M$ منتصف كل منهما). لنبرهن أن المثلثين $MAC$ و $MBD$ طبوقان، ثم نستنتج أن $AC = BD$. تقدّم في الإنشاء خطوة خطوة:',
        },
        {
          type: 'figure',
          diagram: {
            kind: 'interactive',
            origin: AUTHORED,
            id: 'auth-04-proof-construction',
            renderer: 'construction-figure',
            alt: 'إنشاء تدريجي من إعداد المنصّة: قطعتان متناصفتان في $M$، ثم إبراز نصفي القطعة الأولى، ثم نصفي الثانية، ثم رسم الضلعين الثالثين المتساويين.',
            caption: 'إنشاء من إعداد المنصّة: كل خطوة تقابل سطراً من البرهان.',
            params: {
              padding: 0.9,
              // Plain Arabic only: these captions render as raw text, not rich text.
              steps: [
                'المعطيات: قطعتان متناصفتان في نقطة مشتركة هي منتصف كل منهما.',
                'التساوي الأول: نصفا القطعة الأولى متساويان لأن نقطة التقاطع منتصفها.',
                'التساوي الثاني: نصفا القطعة الثانية متساويان، والزاويتان عند نقطة التقاطع متساويتان للتقابل بالرأس.',
                'النتيجة: المثلثان طبوقان بالحالة الأولى، فيتساوى الضلعان الثالثان.',
              ],
              elements: [
                { kind: 'segment', from: [0.4, 2.6], to: [4.4, 0.2], step: 0 },
                { kind: 'segment', from: [0.8, 0.5], to: [4, 2.3], step: 0 },
                { kind: 'point', at: [0.4, 2.6], label: 'A', step: 0 },
                { kind: 'point', at: [4.4, 0.2], label: 'B', step: 0 },
                { kind: 'point', at: [0.8, 0.5], label: 'C', step: 0 },
                { kind: 'point', at: [4, 2.3], label: 'D', step: 0 },
                { kind: 'point', at: [2.4, 1.4], label: 'M', tone: 'mark', step: 0 },
                { kind: 'segment', from: [0.4, 2.6], to: [2.4, 1.4], tone: 'mark', step: 1 },
                { kind: 'segment', from: [2.4, 1.4], to: [4.4, 0.2], tone: 'mark', step: 1 },
                { kind: 'segment', from: [0.8, 0.5], to: [2.4, 1.4], tone: 'aux', step: 2 },
                { kind: 'segment', from: [2.4, 1.4], to: [4, 2.3], tone: 'aux', step: 2 },
                { kind: 'segment', from: [0.4, 2.6], to: [0.8, 0.5], tone: 'image', step: 3 },
                { kind: 'segment', from: [4.4, 0.2], to: [4, 2.3], tone: 'image', step: 3 },
              ],
            },
          },
        },
        {
          type: 'paragraph',
          text: 'صياغة البرهان كاملة: في المثلثين $MAC$ و $MBD$ لدينا $MA = MB$ (لأن $M$ منتصف $[AB]$)، و $MC = MD$ (لأن $M$ منتصف $[CD]$)، والزاوية $\\widehat{AMC}$ تساوي الزاوية $\\widehat{BMD}$ للتقابل بالرأس، وهي محصورة بين الضلعين المتساويين في كل مثلث. فالمثلثان طبوقان لتساوي طولي ضلعين وقياس الزاوية المحصورة بينهما، ويترتب على التطابق تساوي الضلعين المتقابلين: $AC = BD$.',
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'pitfall',
      title: 'أخطاء شائعة في براهين التطابق',
      collapsible: true,
      revealLabel: 'حاول أن تعدّدها بنفسك ثم اكشفها',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'استعمال زاوية غير محصورة بين الضلعين المعلومين ثم الادعاء أن الحالة الأولى تنطبق.',
            'مقابلة عناصر غير متناظرة: تساوي ضلع من الأول مع ضلع غير مقابله في الآخر لا يفيد البرهان شيئاً.',
            'كتابة تساويات من دون أسباب، أو الاستناد إلى «يبدو من الشكل» بدل خاصة معروفة.',
            'نسيان الضلع المشترك: كثير من البراهين يكتمل بملاحظة أن ضلعاً واحداً مشترك بين المثلثين.',
          ],
        },
      ],
    },
  ],
};

export const teachingCongruenceChallenges: LessonStepInput = {
  id: 'teach-04-05-grouped-challenges',
  origin: AUTHORED,
  kicker: KICKER,
  title: 'تحديات قبل التمرينات',
  blocks: [
    {
      type: 'teaching',
      variant: 'example',
      title: 'سمِّ الحالة، أكمل المعطى، واكتشف الخطأ',
      blocks: [
        {
          type: 'paragraph',
          text: 'أجب عن التحديات الثلاثة أولاً، ثم سلّم المجموعة كلها. لن يظهر تصحيح بعد كل نقرة، ويمكنك تغيير أي إجابة قبل التسليم.',
        },
        {
          type: 'figure',
          diagram: {
            kind: 'interactive',
            origin: AUTHORED,
            id: 'auth-04-grouped-challenges',
            renderer: 'congruence-challenges',
            alt: 'ثلاثة تحديات تفاعلية من إعداد المنصّة: تسمية حالة التطابق من علامات الشكل، واختيار المعطى الناقص لإتمام حالة، واكتشاف خطأ في برهان تطابق.',
            caption: 'تدريب من إعداد المنصّة: النتيجة تظهر بعد تسليم الإجابات الثلاث معاً.',
            params: {},
          },
        },
      ],
    },
  ],
};

export const teachingLessonFourRecap: LessonStepInput = {
  id: 'teach-04-06-recap',
  origin: AUTHORED,
  kicker: KICKER,
  title: 'خلاصة قبل الاختبار النهائي',
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
            'يتطابق مثلثان إذا تساوت عناصر أحدهما مع العناصر المقابلة لها في الآخر، وعناصر المثلث أضلاعه وزواياه.',
            'الحالة الأولى: ضلعان والزاوية المحصورة بينهما.',
            'الحالة الثانية: ضلع والزاويتان المجاورتان له.',
            'الحالة الثالثة: الأضلاع الثلاثة.',
            'للمثلثين القائمين حالتان خاصتان: وتر وضلع قائمة، أو وتر وزاوية حادة.',
            'البرهان الجيد: ثلاث تساويات متقابلة مع أسبابها، ثم تسمية الحالة، ثم الاستنتاج.',
            'بعد إثبات التطابق يحق لك استنتاج تساوي أي عنصرين متقابلين آخرين — وهذه فائدته الكبرى.',
          ],
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'pitfall',
      title: 'قبل أن تدخل الاختبار',
      collapsible: true,
      revealLabel: 'اكشف التنبيهات الأخيرة',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'اقرأ العلامات على الأشكال بدقة: شرطات الأضلاع وأقواس الزوايا هي معطياتك.',
            'تحقق أن الزاوية محصورة والزاويتين مجاورتان قبل تسمية الحالة.',
            'رتب أسماء الرؤوس بحسب التقابل حتى تستخرج العناصر المتساوية الصحيحة بعد التطابق.',
          ],
        },
      ],
    },
  ],
};
