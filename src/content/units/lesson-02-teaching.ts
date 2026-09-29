import type { LessonStepInput } from '../schema';

/**
 * ============================================================================
 *  الدرس الثاني — الشروح المُعدّة من المنصّة (ليست من الكتاب)
 * ============================================================================
 *
 *  Everything in this file is PLATFORM-AUTHORED. It never reproduces, imitates,
 *  shortens or replaces the printed text of pages 8–10; it is interleaved
 *  between the verbatim steps and rendered inside badged «شرح المنصّة» cards.
 *
 *  RULES OBSERVED HERE
 *  -------------------
 *  1. No printed sentence, figure or numbering is copied.
 *  2. Every figure is `origin: 'authored'` and is drawn from coordinates WE
 *     choose, never from the book's. Image points are computed exactly as
 *     P' = P + v, so each claimed parallelogram really is one.
 *  3. Interactive reveals are allowed here — they expose OUR points, never the
 *     answers to the textbook's own activity and exercises.
 *  4. Notation stays inside `$…$` so it is bidi-isolated by the renderer.
 * ============================================================================
 */

const AUTHORED = 'authored' as const;
const KICKER = 'شرح المنصّة';

/* -------------------------------------------------------------------------
 *  T1 — bridge from Lesson 1 (a whole shape slides) to Lesson 2 (one point).
 * ---------------------------------------------------------------------- */
export const teachingFromShapeToPoint: LessonStepInput = {
  id: 'teach-01-from-shape-to-point',
  origin: AUTHORED,
  kicker: KICKER,
  title: 'من انسحاب الشكل إلى صورة النقطة',
  blocks: [
    {
      type: 'teaching',
      variant: 'concept',
      title: 'الدرس السابق حرّك شكلاً كاملاً، وهذا الدرس يحرّك نقطة واحدة',
      blocks: [
        {
          type: 'paragraph',
          text: 'في الدرس الأول رأينا الانسحاب وهو ينقل شكلاً بأكمله: كل نقاط الشكل تنزلق في الاتجاه نفسه وبالمسافة نفسها. لكن الشكل ليس إلا مجموعة نقاط، فإذا عرفنا كيف نرسم صورة نقطة واحدة، صار بإمكاننا رسم صورة أي شكل مهما كان.',
        },
        {
          type: 'paragraph',
          text: "لذلك يبدأ هذا الدرس من أصغر عنصر ممكن: نقطة $M$ وانسحاب معلوم، والمطلوب موضع صورتها $M'$ بدقة — لا بالتقريب ولا بالعين.",
        },
        {
          type: 'figure',
          diagram: {
            kind: 'constructed',
            origin: AUTHORED,
            id: 'auth-02-shape-then-point',
            renderer: 'translation-figure',
            alt: 'مثلث أزرق وصورته بخط متقطّع بعد انسحاب، والأسهم بين كل رأس وصورته متوازية ومتساوية الطول، ما يبيّن أن كل نقطة على حدة لها صورة.',
            caption: 'رسم من إعداد المنصّة: صورة الشكل ليست إلا صور نقاطه واحدةً واحدة.',
            construction: {
              shape: [
                [0, 0],
                [2.2, 0.4],
                [1.1, 2.2],
              ],
              vector: [3.6, 1.2],
              labels: ['A', 'B', 'M'],
            },
          },
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'tip',
      title: 'ما الذي ستملكه في نهاية الدرس؟',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'تعريف دقيق لصورة نقطة، مبني على متوازي الأضلاع.',
            'طريقة رسم على الورقة السنتيمترية (بالعدّ).',
            'طريقة إنشاء على الورقة البيضاء (بالفرجار والمسطرة غير المدرجة).',
            'تمييز الحالة الخاصة التي تقع فيها النقطة على المستقيم نفسه.',
          ],
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------
 *  T2 — after both activities: why two different sheets, two different tools.
 *  The authored twin grid uses OUR points, so the book's activity stays open.
 * ---------------------------------------------------------------------- */
export const teachingGridVersusBlankSheet: LessonStepInput = {
  id: 'teach-02-grid-versus-blank-sheet',
  origin: AUTHORED,
  kicker: KICKER,
  title: 'لماذا ورقتان مختلفتان؟',
  blocks: [
    {
      type: 'teaching',
      variant: 'why',
      title: 'الورقة السنتيمترية تُعطيك الانسحاب مكتوباً بالمربّعات',
      blocks: [
        {
          type: 'paragraph',
          text: 'على الورقة السنتيمترية يتحوّل الانسحاب إلى تعليمات عدّ بسيطة. إذا كان الانسحاب ينقل $A$ إلى $B$، فانظر كم مربّعاً تتحرّك أفقياً وكم مربّعاً تتحرّك شاقولياً للانتقال من $A$ إلى $B$، ثم كرّر الحركة نفسها بالضبط انطلاقاً من أي نقطة أخرى.',
        },
        {
          type: 'paragraph',
          text: 'أما الورقة البيضاء فلا تحتوي مربّعات تعدّها، ولهذا يلزمنا الفرجار: فهو الأداة التي تنقل طولاً بدقة دون قياسه بالمسطرة المدرجة.',
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'example',
      title: 'شبكة تدريب من المنصّة — جرّب العدّ قبل كشف الإجابة',
      blocks: [
        {
          type: 'paragraph',
          text: 'هذه شبكة من إعداد المنصّة (نقاطها ليست نقاط الكتاب). الانسحاب فيها ينقل $A$ إلى $B$: أي ثلاثة مربّعات نحو اليمين ومربّع واحد نحو الأعلى. طبّق الحركة نفسها على $M$ ثم على $N$ ثم على $P$، وبعد أن تضع إجاباتك اكشفها بالأزرار.',
        },
        {
          type: 'figure',
          diagram: {
            kind: 'interactive',
            origin: AUTHORED,
            id: 'auth-02-practice-grid',
            renderer: 'grid-figure',
            alt: 'شبكة مربّعة من إعداد المنصّة عليها النقطتان $A$ و $B$ على مستقيم مائل صاعد، والنقاط $M$ و $N$ خارج المستقيم والنقطة $P$ عليه، مع أزرار لكشف صور هذه النقاط.',
            caption:
              'رسم من إعداد المنصّة: الانسحاب هنا هو «ثلاثة مربّعات يميناً ومربّع واحد أعلى».',
            params: {
              cols: 11,
              rows: 7,
              gridStyle: 'solid',
              segments: [{ from: [0, 0.6667], to: [11, 4.3333] }],
              points: [
                { x: 1, y: 1, label: 'A', tone: 'ink', placement: 'below-start' },
                { x: 4, y: 2, label: 'B', tone: 'ink', placement: 'below-end' },
                { x: 2, y: 4, label: 'M', tone: 'mark', placement: 'above-start' },
                { x: 3, y: 6, label: 'N', tone: 'mark', placement: 'above-start' },
                { x: 7, y: 3, label: 'P', tone: 'mark', placement: 'below-end' },
              ],
              reveals: [
                {
                  id: 'reveal-m',
                  label: 'اكشف صورة M',
                  points: [{ x: 5, y: 5, label: "M'", placement: 'above-end' }],
                  arrows: [
                    { from: [2, 4], to: [5, 5] },
                    { from: [1, 1], to: [4, 2] },
                  ],
                  segments: [
                    { from: [1, 1], to: [4, 2] },
                    { from: [4, 2], to: [5, 5], dashed: true },
                    { from: [5, 5], to: [2, 4], dashed: true },
                    { from: [2, 4], to: [1, 1], dashed: true },
                  ],
                  note: 'الرباعي الذي رؤوسه A ثم B ثم صورة M ثم M هو متوازي أضلاع، لأن الضلعين المتقابلين ينتجان عن الحركة نفسها.',
                },
                {
                  id: 'reveal-n',
                  label: 'اكشف صورة N',
                  points: [{ x: 6, y: 7, label: "N'", placement: 'above-end' }],
                  arrows: [{ from: [3, 6], to: [6, 7] }],
                },
                {
                  id: 'reveal-p',
                  label: 'اكشف صورة P (الحالة الخاصة)',
                  points: [{ x: 10, y: 4, label: "P'", placement: 'below-end' }],
                  arrows: [{ from: [7, 3], to: [10, 4] }],
                  note: 'النقطة P تقع على المستقيم نفسه، فصورتها تقع عليه أيضاً ولا يظهر متوازي أضلاع — هذه هي الحالة الخاصة.',
                },
              ],
              extend: { start: 0, end: 0, bottom: 0, top: 0 },
            },
          },
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------
 *  T3 — after the definition: why a parallelogram, and a draggable model.
 * ---------------------------------------------------------------------- */
export const teachingWhyParallelogram: LessonStepInput = {
  id: 'teach-03-why-a-parallelogram',
  origin: AUTHORED,
  kicker: KICKER,
  title: 'لماذا يُعرَّف الانسحاب بمتوازي أضلاع؟',
  blocks: [
    {
      type: 'teaching',
      variant: 'why',
      title: 'لأن متوازي الأضلاع يقول «الاتجاه نفسه والمسافة نفسها» بلغة الهندسة',
      blocks: [
        {
          type: 'paragraph',
          text: "الانسحاب يعني أن الحركة من $M$ إلى $M'$ هي الحركة نفسها من $A$ إلى $B$: الاتجاه ذاته والطول ذاته. وفي الهندسة المستوية لا توجد صيغة أبسط للتعبير عن ذلك من قول إنَّ الضلعين $[AB]$ و $[MM']$ متوازيان ومتساويان في الطول — وهذا بالضبط شرط متوازي الأضلاع.",
        },
        {
          type: 'paragraph',
          text: "وحين يكون الرباعي متوازي أضلاع فإنَّ قطريه يتناصفان، أي يتقاطعان في منتصف كلٍّ منهما. لذلك يذكر التعريف أنَّ $[AM']$ و $[BM]$ متناصفتان: إنها نتيجة مباشرة، وليست شرطاً إضافياً.",
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'example',
      title: 'حرّك النقطة بنفسك',
      collapsible: false,
      blocks: [
        {
          type: 'paragraph',
          text: "اسحب النقطة الحمراء $M$ (أو استعمل مفاتيح الأسهم بعد التركيز عليها) ولاحظ ثلاثة أمور: الصورة $M'$ تتبع الحركة نفسها دائماً، والرباعي يبقى متوازي أضلاع، والقطران يتقاطعان في منتصفهما المشترك. وإن وضعت $M$ على المستقيم انقلب المشهد إلى الحالة الخاصة.",
        },
        {
          type: 'figure',
          diagram: {
            kind: 'interactive',
            origin: AUTHORED,
            id: 'auth-02-drag-playground',
            renderer: 'translation-playground',
            alt: 'شبكة تفاعلية عليها النقطتان $A$ و $B$ ونقطة $M$ يمكن سحبها؛ تظهر صورة $M$ والرباعي الناتج وقطراه المتناصفان، وتتغير الرسالة عندما تقع $M$ على المستقيم.',
            caption: 'رسم تفاعلي من إعداد المنصّة: صورة النقطة تُحسب بدقة في كل موضع.',
            params: {
              cols: 10,
              rows: 7,
              a: [2, 2],
              b: [6, 3],
              start: [3, 5],
            },
          },
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'pitfall',
      title: 'ترتيب الحروف ليس تفصيلاً',
      collapsible: true,
      revealLabel: 'فكّر أولاً، ثم اكشف الإجابة',
      blocks: [
        {
          type: 'paragraph',
          text: "هل $ABM'M$ و $ABMM'$ الشيء نفسه؟",
        },
        {
          type: 'paragraph',
          text: "لا. الرباعي يُقرأ برؤوسه بالترتيب على محيطه. الرباعي $ABM'M$ أضلاعه $[AB]$ و $[BM']$ و $[M'M]$ و $[MA]$، وهو المطلوب. أما $ABMM'$ فيقرأ الرؤوس بترتيب يجعل الشكل «معقوداً» متقاطع الضلعين، وليس متوازي أضلاع.",
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------
 *  T4 — after the special case: compare the two situations explicitly.
 * ---------------------------------------------------------------------- */
export const teachingTwoCases: LessonStepInput = {
  id: 'teach-04-two-cases',
  origin: AUTHORED,
  kicker: KICKER,
  title: 'الحالتان جنباً إلى جنب',
  blocks: [
    {
      type: 'teaching',
      variant: 'concept',
      title: 'حالة واحدة في الجوهر، منظران مختلفان',
      blocks: [
        {
          type: 'paragraph',
          text: 'الانسحاب لا يتغيّر: الصورة تُؤخذ دائماً بالاتجاه نفسه والمسافة نفسها. ما يتغيّر هو مظهر الشكل الناتج، لأن متوازي الأضلاع يحتاج أربعة رؤوس ليست على استقامة واحدة. فإذا كانت $M$ على المستقيم $(AB)$ انطبق «متوازي الأضلاع» على المستقيم نفسه فلم يعد يُرى.',
        },
        {
          type: 'compare',
          title: 'مقارنة سريعة',
          columns: ['النقطة خارج المستقيم', 'النقطة على المستقيم'],
          rows: [
            ['الشرط: $M$ لا تنتمي إلى $(AB)$', 'الشرط: $M$ تنتمي إلى $(AB)$'],
            [
              "الرباعي $ABM'M$ متوازي أضلاع حقيقي",
              "النقاط $A$ و $B$ و $M$ و $M'$ على استقامة واحدة",
            ],
            ["$[AM']$ و $[BM]$ متناصفتان", "$[AM']$ و $[BM]$ متناصفتان أيضاً"],
            ["الطول $MM'$ يساوي $AB$", "الطول $MM'$ يساوي $AB$"],
          ],
        },
        {
          type: 'paragraph',
          text: 'لاحظ أن السطرين الأخيرين متطابقان في الحالتين: خواص الانسحاب محفوظة دائماً، والاختلاف في الشكل المرئي فقط.',
        },
        {
          type: 'figure',
          diagram: {
            kind: 'interactive',
            origin: AUTHORED,
            id: 'auth-02-collinear-case',
            renderer: 'construction-figure',
            alt: 'مستقيم واحد عليه بالترتيب النقاط $A$ ثم $M$ ثم النقطة $I$ منتصف القطعتين ثم $B$ ثم $M$ مسطّرة، ويبيّن أن القطعتين متناصفتان رغم غياب متوازي أضلاع مرئي.',
            caption:
              'رسم من إعداد المنصّة بإحداثيات خاصة به: الحالة التي تقع فيها النقطة على المستقيم.',
            params: {
              padding: 0.9,
              steps: [
                'المعطيات: المستقيم يمرّ بالنقطتين A و B، والنقطة M واقعة عليه.',
                'نطبّق الحركة نفسها على M فنحصل على صورتها، وتبقى على المستقيم نفسه.',
                'منتصف القطعة الواصلة بين A وصورة M هو نفسه منتصف القطعة الواصلة بين B و M: القطعتان متناصفتان.',
              ],
              elements: [
                { kind: 'line', from: [0, 0], to: [4, 1.6], extend: 0.8, tone: 'ink', step: 0 },
                {
                  kind: 'point',
                  at: [0, 0],
                  label: 'A',
                  tone: 'ink',
                  offset: [-0.1, 0.72],
                  step: 0,
                },
                {
                  kind: 'point',
                  at: [1, 0.4],
                  label: 'M',
                  tone: 'mark',
                  offset: [-0.1, 0.72],
                  step: 0,
                },
                {
                  kind: 'point',
                  at: [3, 1.2],
                  label: 'B',
                  tone: 'ink',
                  offset: [-0.1, 0.72],
                  step: 0,
                },
                { kind: 'arrow', from: [0, 0], to: [3, 1.2], tone: 'image', step: 1 },
                { kind: 'arrow', from: [1, 0.4], to: [4, 1.6], tone: 'image', step: 1 },
                {
                  kind: 'point',
                  at: [4, 1.6],
                  label: "M'",
                  tone: 'image',
                  offset: [0.3, -0.28],
                  step: 1,
                },
                { kind: 'segment', from: [0, 0], to: [4, 1.6], dashed: true, tone: 'aux', step: 2 },
                {
                  kind: 'segment',
                  from: [1, 0.4],
                  to: [3, 1.2],
                  dashed: true,
                  tone: 'mark',
                  step: 2,
                },
                {
                  kind: 'point',
                  at: [2, 0.8],
                  label: 'I',
                  tone: 'aux',
                  offset: [-0.05, -0.32],
                  step: 2,
                },
              ],
            },
          },
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------
 *  T5 — after the printed justification: walk the compass construction.
 * ---------------------------------------------------------------------- */
export const teachingCompassStepByStep: LessonStepInput = {
  id: 'teach-05-compass-step-by-step',
  origin: AUTHORED,
  kicker: KICKER,
  title: 'الإنشاء بالفرجار خطوة بخطوة',
  blocks: [
    {
      type: 'teaching',
      variant: 'example',
      title: 'المشهد نفسه، لكن بمعطيات من إعداد المنصّة',
      blocks: [
        {
          type: 'paragraph',
          text: 'الإنشاء التالي يستعمل نقاطاً اخترناها نحن، لا نقاط الكتاب، حتى تتدرّب على الطريقة مرّتين. تنقّل بين الخطوات وراقب كيف تُحدّد كل دائرة شرطاً واحداً فقط، وكيف يلتقي الشرطان في نقطة واحدة مطلوبة.',
        },
        {
          type: 'figure',
          diagram: {
            kind: 'interactive',
            origin: AUTHORED,
            id: 'auth-02-compass-construction',
            renderer: 'construction-figure',
            alt: 'إنشاء بالفرجار: قطعة بين نقطتين ونقطة ثالثة، ثم دائرة مركزها النقطة الثالثة ونصف قطرها طول القطعة، ودائرة أخرى، وتقاطعهما يعطي الصورة المطلوبة مع إبراز النقطة المرفوضة.',
            caption:
              'رسم تفاعلي من إعداد المنصّة: كل نصف قطر مأخوذ بفتحة الفرجار من طول موجود فعلاً في الشكل.',
            params: {
              padding: 1,
              steps: [
                'المعطيات: النقطتان G و H، والنقطة M خارج المستقيم.',
                'الدائرة الأولى: مركزها M ونصف قطرها يساوي الطول بين G و H — كل نقطة عليها تبعد عن M بمقدار الانسحاب.',
                'الدائرة الثانية: مركزها H ونصف قطرها يساوي الطول بين G و M.',
                'الدائرتان تتقاطعان في نقطتين؛ المطلوبة هي التي تُكمل الرباعي دون أن تتقاطع أضلاعه، والأخرى مرفوضة.',
                'التحقق: الضلعان المتقابلان متساويان، فالرباعي متوازي أضلاع وصورة النقطة مضبوطة.',
              ],
              elements: [
                { kind: 'segment', from: [1, 3], to: [5, 4], tone: 'ink', step: 0 },
                {
                  kind: 'point',
                  at: [1, 3],
                  label: 'G',
                  tone: 'ink',
                  offset: [-0.06, -0.3],
                  step: 0,
                },
                {
                  kind: 'point',
                  at: [5, 4],
                  label: 'H',
                  tone: 'ink',
                  offset: [0.3, -0.28],
                  step: 0,
                },
                {
                  kind: 'point',
                  at: [2.2, 1],
                  label: 'M',
                  tone: 'mark',
                  offset: [-0.06, 0.72],
                  step: 0,
                },
                { kind: 'circle', center: [2.2, 1], radius: 4.1231, tone: 'aux', step: 1 },
                { kind: 'circle', center: [5, 4], radius: 2.3324, tone: 'mark', step: 2 },
                {
                  kind: 'point',
                  at: [2.922, 5.059],
                  label: '×',
                  tone: 'aux',
                  offset: [0.34, -0.26],
                  step: 3,
                },
                {
                  kind: 'point',
                  at: [6.2, 2],
                  label: "M'",
                  tone: 'image',
                  offset: [0.36, -0.26],
                  step: 3,
                },
                { kind: 'segment', from: [2.2, 1], to: [6.2, 2], tone: 'image', step: 4 },
                { kind: 'segment', from: [5, 4], to: [6.2, 2], tone: 'image', step: 4 },
                { kind: 'segment', from: [1, 3], to: [2.2, 1], dashed: true, tone: 'aux', step: 4 },
              ],
            },
          },
        },
        {
          type: 'list',
          ordered: true,
          items: [
            "الدائرة الأولى تضمن أن الطول $MM'$ يساوي طول الانسحاب.",
            'الدائرة الثانية تضمن أن الضلع الثاني يساوي نظيره.',
            'تساوي الضلعين المتقابلين في الرباعي يكفي ليكون متوازي أضلاع، وهذا ما يجعل النقطة الناتجة هي الصورة فعلاً.',
          ],
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'tip',
      title: 'لماذا نرفض إحدى نقطتي التقاطع؟',
      collapsible: true,
      revealLabel: 'اكشف السبب',
      blocks: [
        {
          type: 'paragraph',
          text: 'النقطتان تحقّقان شرطي الطول معاً، لكن إحداهما تقع في الجهة التي تجعل ضلعي الرباعي يتقاطعان، فينتج شكل معقود لا متوازي أضلاع. المعيار عملي وبسيط: اختر النقطة التي تجعلك تدور على رؤوس الرباعي دون أن يقطع ضلعٌ ضلعاً.',
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------
 *  T6 — the mistakes this particular lesson actually produces.
 * ---------------------------------------------------------------------- */
export const teachingCommonMistakes: LessonStepInput = {
  id: 'teach-06-common-mistakes',
  origin: AUTHORED,
  kicker: KICKER,
  title: 'أخطاء شائعة في هذا الدرس',
  blocks: [
    {
      type: 'teaching',
      variant: 'pitfall',
      title: 'أربعة أخطاء تتكرّر كثيراً',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'عكس اتجاه الانسحاب: الانسحاب الذي ينقل $A$ إلى $B$ غير الانسحاب الذي ينقل $B$ إلى $A$؛ الطول واحد والاتجاه معاكس، فالصورتان مختلفتان.',
            'كتابة الرباعي بترتيب خاطئ للرؤوس، فينتج شكل معقود بدل متوازي الأضلاع.',
            'استعمال المسطرة المدرجة للقياس في الإنشاء، بينما المطلوب فرجار ومسطرة غير مدرجة فقط.',
            'الظنّ أنَّ وقوع النقطة على المستقيم يُلغي الانسحاب؛ الصحيح أنَّ الصورة موجودة دائماً، لكنها تقع على المستقيم نفسه.',
          ],
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'tip',
      title: 'اختبار ذاتي سريع',
      collapsible: true,
      revealLabel: 'فكّر ثم اكشف',
      blocks: [
        {
          type: 'paragraph',
          text: "إذا كانت $M'$ صورة $M$ وفق انسحاب، فما صورة $M'$ وفق الانسحاب المعاكس؟",
        },
        {
          type: 'paragraph',
          text: 'هي $M$ نفسها. الانسحاب المعاكس يُلغي أثر الأول تماماً، لأن الاتجاه انعكس والمسافة بقيت كما هي.',
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------
 *  T7 — closing recap before the final assessment.
 * ---------------------------------------------------------------------- */
export const teachingRecap: LessonStepInput = {
  id: 'teach-07-recap',
  origin: AUTHORED,
  kicker: KICKER,
  title: 'خلاصة الدرس قبل الاختبار',
  blocks: [
    {
      type: 'teaching',
      variant: 'summary',
      title: 'ثلاث جمل تختصر كل شيء',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            "صورة النقطة $M$ وفق الانسحاب الذي ينقل $A$ إلى $B$ هي النقطة $M'$ التي تجعل الرباعي $ABM'M$ متوازي أضلاع، عندما لا تنتمي $M$ إلى $(AB)$.",
            "يترتب على ذلك أنَّ $[AM']$ و $[BM]$ متناصفتان، وأنَّ الطول $MM'$ يساوي الطول $AB$.",
            'إذا انتمت $M$ إلى $(AB)$، بقيت الصورة على المستقيم نفسه وصارت النقاط الأربع على استقامة واحدة.',
          ],
        },
        {
          type: 'paragraph',
          text: 'وعلى مستوى الأدوات: على الورقة السنتيمترية نعدّ المربّعات، وعلى الورقة البيضاء ننشئ بالفرجار دائرتين ونختار نقطة تقاطعهما المناسبة.',
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'tip',
      title: 'تحدٍّ قصير قبل أن تبدأ',
      collapsible: true,
      revealLabel: 'اكشف الإجابة بعد المحاولة',
      blocks: [
        {
          type: 'paragraph',
          text: "نقطة $M$ صورتها $M'$ وفق انسحاب ينقل $A$ إلى $B$. إذا كان $AB = 5\\ \\text{cm}$، فكم يساوي $MM'$؟ وماذا نقول عن المستقيمين $(AB)$ و $(MM')$ إذا لم تكن $M$ على $(AB)$؟",
        },
        {
          type: 'paragraph',
          text: "الطول $MM' = 5\\ \\text{cm}$ لأن أضلاع متوازي الأضلاع المتقابلة متساوية، والمستقيمان $(AB)$ و $(MM')$ متوازيان لأنهما ضلعان متقابلان في متوازي الأضلاع نفسه.",
        },
      ],
    },
  ],
};
