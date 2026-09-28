import type { LessonStepInput } from '../schema';

/**
 * ============================================================================
 *  الدرس الأول — الشروح المُعدّة من المنصّة (ليست من الكتاب)
 * ============================================================================
 *
 *  Everything in this file is PLATFORM-AUTHORED teaching material. None of it
 *  is textbook text, and none of it replaces, shortens or paraphrases the
 *  source. It is interleaved between the verbatim steps and is rendered inside
 *  badged «شرح المنصّة» cards so a student can always tell the two apart.
 *
 *  RULES OBSERVED HERE
 *  -------------------
 *  1. No textbook sentence, figure or numbering is reproduced or imitated.
 *  2. No claim is made about any detail of a `reference` figure that could not
 *     be read from the scan. The worked examples below use points and shapes
 *     invented by this platform, on our own coordinates, never the book's.
 *  3. Every diagram here is `origin: 'authored'` and `kind: 'constructed'`:
 *     we draw it ourselves from exact coordinates, so its geometry is exact by
 *     construction — the image of every vertex is computed as P' = P + v.
 *  4. Notation follows the source convention: [AB] segment, (AB) line,
 *     AB length, \widehat{ABC} angle, \parallel, primes for images.
 * ============================================================================
 */

const AUTHORED = 'authored' as const;

/* -------------------------------------------------------------------------
 *  T1 — before the first textbook activity: what a translation *is*.
 * ---------------------------------------------------------------------- */
export const teachingIntro: LessonStepInput = {
  id: 'teach-01-what-is-a-translation',
  origin: AUTHORED,
  kicker: 'شرح المنصّة',
  title: 'ما هو الانسحاب؟ فكرة قبل أن نبدأ',
  blocks: [
    {
      type: 'teaching',
      variant: 'concept',
      title: 'الانسحاب = انزلاق دون دوران ودون قلب',
      blocks: [
        {
          type: 'paragraph',
          text: 'تخيّل أنك تدفع كتاباً على سطح طاولة من مكان إلى مكان آخر، دون أن تديره ودون أن تقلبه. كل نقطة من الكتاب — الزاوية اليمنى العليا، منتصف الغلاف، طرف الكعب — انزلقت في الاتجاه نفسه وبالمسافة نفسها تماماً. هذه هي فكرة الانسحاب.',
        },
        {
          type: 'paragraph',
          text: "الانسحاب إذاً ليس تغييراً للشكل، بل تغيير لموضعه فقط. الشكل الناتج يُسمّى صورة الشكل الأصلي، ونكتب صورة النقطة $M$ بالرمز $M'$ (نقرأ: $M$ مسطّرة).",
        },
        {
          type: 'figure',
          diagram: {
            kind: 'constructed',
            origin: 'authored',
            id: 'auth-01-slide-a-quadrilateral',
            renderer: 'translation-figure',
            alt: 'شكل رباعي أزرق متّصل، وإلى جانبه صورته بخط متقطّع، وقد انتقلت كل نقطة من الشكل الأصلي إلى صورتها بالاتجاه نفسه والمسافة نفسها؛ الأسهم بين النقاط المتناظرة متوازية ومتساوية الطول.',
            caption: 'رسم من إعداد المنصّة: كل رأس ينزلق بالمقدار نفسه وفي الاتجاه نفسه.',
            construction: {
              shape: [
                [0, 0],
                [2.4, 0.6],
                [2.0, 2.6],
                [0.3, 2.1],
              ],
              vector: [4.2, 1.1],
              labels: ['A', 'B', 'C', 'D'],
            },
          },
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'tip',
      title: 'ما الذي يُعيّن الانسحاب؟',
      blocks: [
        {
          type: 'paragraph',
          text: 'يكفي أن نعرف نقطة واحدة وصورتها. إذا قلنا «الانسحاب الذي ينقل $A$ إلى $B$» فقد حدّدنا شيئين معاً:',
        },
        {
          type: 'list',
          ordered: false,
          items: ['الاتجاه: من $A$ نحو $B$ (وليس من $B$ نحو $A$).', 'المسافة: الطول $AB$.'],
        },
        {
          type: 'paragraph',
          text: 'وبهذين المعطيين وحدهما تصبح صورة كل نقطة من المستوي معروفة.',
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'pitfall',
      title: 'انتبه: الاتجاه له معنى',
      collapsible: true,
      revealLabel: 'فكّر أولاً، ثم اكشف الإجابة',
      blocks: [
        {
          type: 'paragraph',
          text: 'هل الانسحاب الذي ينقل $A$ إلى $B$ هو نفسه الانسحاب الذي ينقل $B$ إلى $A$؟',
        },
        {
          type: 'paragraph',
          text: 'لا. المسافة واحدة في الحالتين لأن $AB = BA$، لكن الاتجاه معاكس. فهما انسحابان مختلفان، وكل منهما يُلغي أثر الآخر.',
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------
 *  T2 — after the two textbook activities: direction + distance.
 * ---------------------------------------------------------------------- */
export const teachingDirectionDistance: LessonStepInput = {
  id: 'teach-02-direction-and-distance',
  origin: AUTHORED,
  kicker: 'شرح المنصّة',
  title: 'الاتجاه والمسافة: عنصرا الانسحاب',
  blocks: [
    {
      type: 'teaching',
      variant: 'concept',
      title: 'من نقطة إلى نقطة: كيف نجد صورة نقطة؟',
      blocks: [
        {
          type: 'paragraph',
          text: "ليكن الانسحاب الذي ينقل $A$ إلى $B$. لتعيين صورة نقطة $M$ نرسم من $M$ قطعة لها الاتجاه نفسه والطول نفسه اللذان للقطعة من $A$ إلى $B$. النقطة التي نصل إليها هي $M'$.",
        },
        { type: 'math', latex: "MM' = AB \\qquad (MM') \\parallel (AB)" },
        {
          type: 'paragraph',
          text: "ولهذا السبب يكون الشكل الرباعي $ABM'M$ متوازي أضلاع: ضلعان متقابلان فيه متوازيان ومتساويان في الطول. وهذه ملاحظة مهمة، لأنها تربط الانسحاب بمتوازي الأضلاع، وهو موضوع هذه الوحدة.",
        },
      ],
    },
    {
      type: 'compare',
      title: 'الانسحاب ليس أي حركة',
      columns: ['حركة تُعدّ انسحاباً', 'حركة لا تُعدّ انسحاباً'],
      rows: [
        ['كل النقاط تتحرك في الاتجاه نفسه', 'بعض النقاط تتحرك في اتجاه مختلف عن غيرها'],
        ['كل النقاط تقطع المسافة نفسها', 'النقاط تقطع مسافات مختلفة (تكبير أو تصغير)'],
        ['الشكل يبقى بالاتجاه نفسه على الورقة', 'الشكل يُدار بزاوية ما (دوران)'],
        ['الشكل لا يُقلَب', 'الشكل يُقلَب كما في المرآة (تناظر محوري)'],
      ],
    },
    {
      type: 'teaching',
      variant: 'example',
      title: 'مثال موجّه: نقطة واحدة تكفي',
      collapsible: true,
      revealLabel: 'اعرض الحل خطوة بخطوة',
      blocks: [
        {
          type: 'paragraph',
          text: "انسحاب ينقل النقطة $A$ إلى النقطة $B$ حيث $AB = 5\\ \\mathrm{cm}$. النقطة $M$ تبعد عن $A$ مسافة كبيرة جداً. كم يساوي $MM'$؟",
        },
        {
          type: 'paragraph',
          text: 'الخطوة 1: موضع $M$ لا يؤثّر إطلاقاً. الانسحاب لا «يقيس» بُعد النقطة عن $A$.',
        },
        {
          type: 'paragraph',
          text: 'الخطوة 2: الانسحاب ينقل كل نقطة بالمسافة نفسها، وهي $AB$.',
        },
        { type: 'math', latex: "MM' = AB = 5\\ \\mathrm{cm}" },
        {
          type: 'paragraph',
          text: "الخطوة 3: وكذلك $(MM') \\parallel (AB)$، أي أن مسار $M$ موازٍ لمسار $A$.",
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------
 *  T3 — after «تعلّم»: one translation moves every point alike.
 * ---------------------------------------------------------------------- */
export const teachingEveryPoint: LessonStepInput = {
  id: 'teach-03-every-point-moves-alike',
  origin: AUTHORED,
  kicker: 'شرح المنصّة',
  title: 'انسحاب واحد يحرّك كل نقاط الشكل',
  blocks: [
    {
      type: 'teaching',
      variant: 'concept',
      title: 'معنى «صورة شكل»',
      blocks: [
        {
          type: 'paragraph',
          text: "صورة شكل ليست شيئاً جديداً نرسمه بالتقريب: هي مجموعة صور كل نقاطه. نأخذ كل نقطة من الشكل، نطبّق عليها الانسحاب نفسه، فنحصل على نقطة جديدة؛ ومجموع هذه النقاط الجديدة هو الشكل $F'$ صورة الشكل $F$.",
        },
        {
          type: 'paragraph',
          text: 'عملياً يكفي أن ننقل رؤوس المضلّع، لأن الانسحاب يحافظ على الاستقامة، فالضلع ينتقل إلى ضلع مستقيم بين الصورتين.',
        },
        {
          type: 'figure',
          diagram: {
            kind: 'constructed',
            origin: 'authored',
            id: 'auth-02-triangle-image',
            renderer: 'translation-figure',
            alt: "مثلث أزرق رؤوسه $M$ و $N$ و $P$، وصورته بخط متقطّع رؤوسها $M'$ و $N'$ و $P'$. الأسهم الثلاثة الواصلة بين كل رأس وصورته متوازية ومتساوية الطول، ولذلك فإن $MM' = NN' = PP'$.",
            caption:
              "رسم من إعداد المنصّة: المسارات الثلاثة $[MM']$ و $[NN']$ و $[PP']$ متوازية ومتساوية.",
            construction: {
              shape: [
                [0, 0],
                [2.8, 0.4],
                [1.1, 2.4],
              ],
              vector: [4.0, 0.9],
              labels: ['M', 'N', 'P'],
            },
          },
        },
        { type: 'math', latex: "MM' = NN' = PP'" },
      ],
    },
    {
      type: 'teaching',
      variant: 'why',
      title: 'لماذا تظهر علاقات التوازي في الدرس؟',
      blocks: [
        {
          type: 'paragraph',
          text: 'في نصّ الكتاب نقرأ علاقتين من نوعين مختلفين، ومن المفيد التمييز بينهما:',
        },
        {
          type: 'list',
          ordered: false,
          items: [
            "توازي المسارات: $(MM') \\parallel (AB)$ و $(NN') \\parallel (AB)$. هذا يقول إن كل النقاط تتحرك في الاتجاه نفسه، اتجاه الانسحاب.",
            "توازي الشكل وصورته: كل قطعة في الشكل توازي القطعة المناظرة لها في الصورة، أي $(MN) \\parallel (M'N')$. هذا يقول إن الصورة لم تُدَر.",
          ],
        },
        {
          type: 'paragraph',
          text: 'الأولى تصف حركة النقاط، والثانية تصف نتيجة الحركة على الشكل. والعلاقتان معاً هما ما يجعل الانسحاب مختلفاً عن الدوران.',
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------
 *  T4 — after «خواص الانسحاب»: WHY the properties hold.
 * ---------------------------------------------------------------------- */
export const teachingWhyPreserved: LessonStepInput = {
  id: 'teach-04-why-properties-are-preserved',
  origin: AUTHORED,
  kicker: 'شرح المنصّة',
  title: 'لماذا يحافظ الانسحاب على هذه الخواص؟',
  blocks: [
    {
      type: 'paragraph',
      text: 'ذكر الكتاب الخواص الأربع. أما لماذا تصحّ، فهذا ما نوضّحه هنا، لأن فهم السبب يجعل تطبيق الخاصة أسهل بكثير من حفظها.',
    },
    {
      type: 'teaching',
      variant: 'why',
      title: '1 — لماذا تبقى الأطوال متساوية؟',
      blocks: [
        {
          type: 'paragraph',
          text: "لتكن $M$ و $N$ نقطتين، و $M'$ و $N'$ صورتيهما وفق الانسحاب الذي ينقل $A$ إلى $B$. نعلم من تعريف الانسحاب أن:",
        },
        { type: 'math', latex: "MM' = NN' = AB \\qquad (MM') \\parallel (NN')" },
        {
          type: 'paragraph',
          text: "إذاً في الشكل الرباعي $MM'N'N$ يوجد ضلعان متقابلان متوازيان ومتساويان في الطول، فهو متوازي أضلاع. ومن خواص متوازي الأضلاع يكون الضلعان الآخران متساويين أيضاً:",
        },
        { type: 'math', latex: "MN = M'N' \\qquad (MN) \\parallel (M'N')" },
        {
          type: 'paragraph',
          text: 'وهذا بالضبط معنى «يحافظ الانسحاب على الأطوال»: أي قطعة في الشكل يساوي طولها طول القطعة المناظرة لها في الصورة.',
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'why',
      title: '2 — لماذا يبقى المستقيم مستقيماً؟',
      blocks: [
        {
          type: 'paragraph',
          text: 'لتكن $M$ و $S$ و $P$ ثلاث نقاط على استقامة واحدة، مع وقوع $S$ بين $M$ و $P$، أي $MS + SP = MP$. بما أن الانسحاب يحافظ على الأطوال فإن:',
        },
        { type: 'math', latex: "M'S' = MS \\qquad S'P' = SP \\qquad M'P' = MP" },
        { type: 'math', latex: "M'S' + S'P' = M'P'" },
        {
          type: 'paragraph',
          text: "والمساواة الأخيرة لا تتحقق إلا إذا كانت $S'$ واقعة بين $M'$ و $P'$ على استقامة واحدة. إذاً الاستقامة محفوظة، وهذا يفسّر العبارة الواردة في الكتاب عن النقاط $M$ و $S$ و $P$.",
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'why',
      title: '3 — لماذا تبقى قياسات الزوايا كما هي؟',
      blocks: [
        {
          type: 'paragraph',
          text: "خذ الزاوية $\\widehat{SMN}$. رأسها $M$ وضلعاها يمرّان بالنقطتين $S$ و $N$. صورتها هي الزاوية $\\widehat{S'M'N'}$. لدينا من الخاصة الأولى:",
        },
        { type: 'math', latex: "M'S' = MS \\qquad M'N' = MN \\qquad S'N' = SN" },
        {
          type: 'paragraph',
          text: "فالمثلثان $SMN$ و $S'M'N'$ لهما الأضلاع الثلاثة متساوية كل ضلع مع نظيره، وبالتالي هما متطابقان، فتتساوى زواياهما:",
        },
        { type: 'math', latex: "\\widehat{S'M'N'} = \\widehat{SMN}" },
        {
          type: 'paragraph',
          text: 'الخلاصة: حفظ الأطوال يجرّ معه حفظ الزوايا. ليست خاصة مستقلة، بل نتيجة.',
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'why',
      title: '4 — لماذا تبقى المساحة كما هي؟',
      blocks: [
        {
          type: 'paragraph',
          text: 'بما أن كل الأطوال وكل الزوايا محفوظة، فإن الصورة تطابق الشكل الأصلي تماماً؛ لم يتغيّر منها إلا الموضع. ومساحة الشكل لا تعتمد على موضعه على الورقة.',
        },
        {
          type: 'paragraph',
          text: 'يمكنك التحقق من ذلك في حالة بسيطة: مثلث قاعدته $b$ وارتفاعه $h$ مساحته $\\dfrac{b \\times h}{2}$. الانسحاب يحفظ القاعدة والارتفاع، فتبقى المساحة كما هي.',
        },
        { type: 'math', latex: "\\mathcal{A}(F') = \\mathcal{A}(F)" },
      ],
    },
    {
      type: 'teaching',
      variant: 'example',
      title: 'تطبيق سريع',
      collapsible: true,
      revealLabel: 'جرّب ثم اكشف الحل',
      blocks: [
        {
          type: 'paragraph',
          text: "مثلث $ABC$ فيه $AB = 7\\ \\mathrm{cm}$ و $\\widehat{ABC} = 40°$ ومساحته $12\\ \\mathrm{cm}^2$. ما طول $A'B'$ وقياس $\\widehat{A'B'C'}$ ومساحة $A'B'C'$ وفق أي انسحاب؟",
        },
        {
          type: 'paragraph',
          text: 'كل هذه المقادير محفوظة، ولا حاجة لمعرفة الانسحاب نفسه:',
        },
        {
          type: 'math',
          latex:
            "A'B' = 7\\ \\mathrm{cm} \\qquad \\widehat{A'B'C'} = 40° \\qquad \\mathcal{A}(A'B'C') = 12\\ \\mathrm{cm}^2",
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------
 *  T5 — after the 15-parallelogram exercise: a fully worked example
 *       on OUR OWN grid (never on the book's unreadable figure).
 * ---------------------------------------------------------------------- */
export const teachingWorkedExample: LessonStepInput = {
  id: 'teach-05-worked-example-on-a-grid',
  origin: AUTHORED,
  kicker: 'شرح المنصّة',
  title: 'مثال محلول خطوة بخطوة',
  blocks: [
    {
      type: 'paragraph',
      text: 'لنعمل على شبكة من إعداد المنصّة، حتى تكون كل الإحداثيات واضحة ويمكنك التحقق من كل خطوة بنفسك. (هذه الشبكة ليست من الكتاب.)',
    },
    {
      type: 'teaching',
      variant: 'example',
      title: 'المعطيات',
      blocks: [
        {
          type: 'paragraph',
          text: "في الشبكة أدناه، الشكل الأصلي مثلث رؤوسه $A$ و $B$ و $C$، والانسحاب هو الذي ينقل $A$ إلى $A'$ بمقدار $5$ وحدات نحو اليمين ووحدتين نحو الأعلى.",
        },
        {
          type: 'figure',
          diagram: {
            kind: 'constructed',
            origin: 'authored',
            id: 'auth-03-worked-grid',
            renderer: 'translation-figure',
            alt: "شبكة مربّعات عليها مثلث أزرق رؤوسه $A$ و $B$ و $C$، وصورته بخط متقطّع رؤوسها $A'$ و $B'$ و $C'$، منقولة خمس وحدات نحو اليمين ووحدتين نحو الأعلى.",
            caption: 'رسم من إعداد المنصّة: انسحاب بمقدار $5$ وحدات أفقياً و $2$ وحدة عمودياً.',
            construction: {
              shape: [
                [0, 0],
                [3, 0],
                [3, 2],
              ],
              vector: [5, 2],
              labels: ['A', 'B', 'C'],
              grid: true,
            },
          },
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'example',
      title: 'الحل',
      collapsible: true,
      revealLabel: 'اعرض الخطوات',
      blocks: [
        {
          type: 'paragraph',
          text: "الخطوة 1 — نحدّد الانسحاب: الانتقال من $A$ إلى $A'$ هو $5$ وحدات يميناً و $2$ وحدة أعلى.",
        },
        {
          type: 'paragraph',
          text: "الخطوة 2 — نطبّق الانتقال نفسه على كل رأس، لا على الرأس $A$ وحده. فإذا كان $B$ يقع على بُعد $3$ وحدات يمين $A$، فإن $B'$ يقع على بُعد $3$ وحدات يمين $A'$.",
        },
        {
          type: 'paragraph',
          text: 'الخطوة 3 — نصل الرؤوس الجديدة. المثلث الناتج هو الصورة.',
        },
        {
          type: 'paragraph',
          text: "الخطوة 4 — نتحقّق: طول الضلع $[AB]$ يساوي $3$ وحدات، وطول $[A'B']$ يساوي $3$ وحدات أيضاً. والمثلث قائم الزاوية في $B$، وصورته قائمة الزاوية في $B'$. والمسافات الثلاث $AA'$ و $BB'$ و $CC'$ متساوية.",
        },
        { type: 'math', latex: "AB = A'B' \\qquad AA' = BB' = CC'" },
      ],
    },
    {
      type: 'teaching',
      variant: 'tip',
      title: 'كيف تُسمّي الانسحاب الذي ينقل شكلاً إلى آخر؟',
      blocks: [
        {
          type: 'paragraph',
          text: 'إذا طُلب منك تعيين الانسحاب الذي ينقل الشكل الأول إلى الشكل الثاني، فاختر رأساً واحداً من الشكل الأول وحدّد الرأس المناظر له في الشكل الثاني — لا أي رأس آخر — ثم قل: «الانسحاب الذي ينقل هذا الرأس إلى نظيره». الرأس المناظر هو الذي يشغل الموقع نفسه من الشكل.',
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------
 *  T6 — after the counter-example exercise: common mistakes.
 * ---------------------------------------------------------------------- */
export const teachingCommonMistakes: LessonStepInput = {
  id: 'teach-06-common-mistakes',
  origin: AUTHORED,
  kicker: 'شرح المنصّة',
  title: 'أخطاء شائعة عند الحكم: هل هذه صورة وفق انسحاب؟',
  blocks: [
    {
      type: 'paragraph',
      text: 'كثير من الأخطاء في هذا الدرس سببها الاكتفاء بالنظرة الأولى. إليك قائمة فحص قصيرة، ثم الأخطاء الأربعة الأكثر تكراراً.',
    },
    {
      type: 'teaching',
      variant: 'tip',
      title: 'قائمة فحص من ثلاث خطوات',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'هل الشكلان متطابقان في القياسات (الأطوال والزوايا)؟ إن لم يكونا كذلك فليس انسحاباً.',
            'هل الشكلان بالاتجاه نفسه، أي لم يُدَر أحدهما ولم يُقلَب؟',
            'هل كل زوج من النقاط المتناظرة يعطي المسافة نفسها والاتجاه نفسه؟ اختبر رأسين على الأقل، لا رأساً واحداً.',
          ],
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'pitfall',
      title: 'الخطأ 1 — الخلط بين الانسحاب والدوران',
      blocks: [
        {
          type: 'paragraph',
          text: "الشكلان متطابقان، لكن أحدهما مائل بزاوية عن الآخر. الأطوال محفوظة والزوايا محفوظة، ومع ذلك فالحركة دوران وليست انسحاباً، لأن اتجاه الشكل تغيّر. العلامة الفاصلة: في الانسحاب يكون كل ضلع موازياً لنظيره، $(MN) \\parallel (M'N')$.",
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'pitfall',
      title: 'الخطأ 2 — الخلط بين الانسحاب والتناظر (القلب)',
      blocks: [
        {
          type: 'paragraph',
          text: 'الشكل المقلوب كما في المرآة يحافظ على الأطوال وعلى قياسات الزوايا أيضاً، لذلك لا يكفي فحص القياسات. انظر إلى ترتيب الرؤوس: إذا كان ترتيبها في الشكل الأصلي عكس ترتيبها في الشكل الثاني، فقد حدث قلب، وليس انسحاباً.',
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'pitfall',
      title: 'الخطأ 3 — الخلط بين الانسحاب والتكبير',
      blocks: [
        {
          type: 'paragraph',
          text: "شكلان لهما الاتجاه نفسه وتبدو أضلاعهما متوازية، لكن أحدهما أكبر. هنا تنكسر خاصة حفظ الأطوال فوراً: $M'N' \\neq MN$، فليست صورة وفق انسحاب.",
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'pitfall',
      title: 'الخطأ 4 — الاكتفاء بمطابقة نقطة واحدة',
      blocks: [
        {
          type: 'paragraph',
          text: 'يمكن دائماً إيجاد انسحاب ينقل نقطة معيّنة إلى نقطة معيّنة. لكن هذا لا يعني أن الشكل كله انتقل بذلك الانسحاب. يجب أن تتحقّق المسافة نفسها والاتجاه نفسه لجميع النقاط المتناظرة، لا لنقطة واحدة.',
        },
        {
          type: 'figure',
          diagram: {
            kind: 'constructed',
            origin: 'authored',
            id: 'auth-04-check-two-vertices',
            renderer: 'translation-figure',
            alt: 'مضلّع أزرق خماسي وصورته بخط متقطّع، مع أسهم بين كل رأس وصورته؛ الأسهم الخمسة متوازية ومتساوية الطول، وهذا ما يجب التحقق منه قبل الحكم بأن الحركة انسحاب.',
            caption: 'رسم من إعداد المنصّة: في الانسحاب الصحيح تكون كل الأسهم متوازية ومتساوية.',
            construction: {
              shape: [
                [0, 0],
                [2.2, 0],
                [2.8, 1.5],
                [1.1, 2.6],
                [-0.6, 1.5],
              ],
              vector: [4.6, 0.4],
              labels: ['A', 'B', 'C', 'D', 'E'],
            },
          },
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------
 *  T7 — closing recap before the final assessment.
 * ---------------------------------------------------------------------- */
export const teachingRecap: LessonStepInput = {
  id: 'teach-07-recap-before-assessment',
  origin: AUTHORED,
  kicker: 'شرح المنصّة',
  title: 'خلاصة الدرس قبل الاختبار',
  blocks: [
    {
      type: 'teaching',
      variant: 'summary',
      title: 'ما ينبغي أن تكون قادراً عليه الآن',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'أن تصف الانسحاب بأنه انزلاق بالاتجاه نفسه والمسافة نفسها لكل النقاط.',
            'أن تعيّن الانسحاب بمعرفة نقطة وصورتها فقط.',
            'أن تجد صورة نقطة، وصورة شكل، بنقل كل رأس بالمقدار نفسه.',
            'أن تذكر الخواص الأربع: الأطوال والاستقامة وقياس الزوايا والمساحات.',
            'أن تعلّل كل خاصة منها، لا أن تحفظها فقط.',
            'أن تميّز بين الانسحاب والدوران والقلب والتكبير.',
          ],
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'summary',
      title: 'العلاقات الأساسية',
      blocks: [
        { type: 'math', latex: "MM' = NN' = AB", label: 'كل النقاط تقطع مسافة الانسحاب نفسها' },
        {
          type: 'math',
          latex: "(MM') \\parallel (AB)",
          label: 'كل النقاط تتحرك في اتجاه الانسحاب',
        },
        { type: 'math', latex: "MN = M'N' \\qquad (MN) \\parallel (M'N')", label: 'الشكل وصورته' },
        { type: 'math', latex: "\\widehat{S'M'N'} = \\widehat{SMN}", label: 'قياس الزاوية محفوظ' },
      ],
    },
    {
      type: 'callout',
      variant: 'hint',
      title: 'الاختبار النهائي',
      blocks: [
        {
          type: 'paragraph',
          text: 'في الخطوة التالية اختبار من عشرة أسئلة يقيس فهمك للدرس. الأسئلة من إعداد المنصّة وليست أسئلة الكتاب، وهي تركّز على التعليل لا على الحفظ.',
        },
      ],
    },
  ],
};

export const authoredTeachingSteps = {
  teachingIntro,
  teachingDirectionDistance,
  teachingEveryPoint,
  teachingWhyPreserved,
  teachingWorkedExample,
  teachingCommonMistakes,
  teachingRecap,
};
