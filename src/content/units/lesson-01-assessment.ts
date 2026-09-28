import type { AssessmentInput } from '../schema';

/**
 * ============================================================================
 *  الاختبار النهائي للدرس الأول — من إعداد المنصّة
 * ============================================================================
 *
 *  These ten questions are written by this platform. They are NOT the
 *  textbook's numbered exercises, they do not reproduce them, and none of
 *  them depends on a detail of a `reference` figure that could not be read
 *  from the scan. Each one therefore carries `origin: 'authored'`.
 *
 *  They test understanding — identifying a translation, finding the image of
 *  a point and of a figure, direction and distance, corresponding points,
 *  preservation of length / collinearity / angle measure / area, parallelism,
 *  and detecting a NON-translation — rather than recall.
 *
 *  `explanation` on every question is TEACHER-ONLY. It is rendered exclusively
 *  inside the Teacher Area, behind the passphrase gate, and is never sent to
 *  the student UI before, during or after the assessment.
 * ============================================================================
 */
export const lesson01Assessment: AssessmentInput = {
  id: 'assess-lesson-01-translation',
  title: 'الاختبار النهائي — الانسحاب وخواصه',
  instructions:
    'عشرة أسئلة تقيس فهمك للانسحاب وخواصه. اقرأ كل سؤال بتأنٍّ، واختر الإجابة أو اكتب العدد المطلوب. الأسئلة من إعداد المنصّة وليست أسئلة الكتاب. يظهر سؤال واحد في كل مرة، ويمكنك العودة إلى أي سؤال قبل التسليم.',
  passingScore: 70,
  questions: [
    /* ---------------------------------------------------------------- 1 --- */
    {
      id: 'q01-identify-a-translation',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'تمييز الانسحاب',
      prompt: [
        {
          type: 'paragraph',
          text: 'أيُّ الحركات الآتية يمكن أن تكون انسحاباً؟',
        },
      ],
      choices: [
        {
          id: 'c-a',
          blocks: [
            {
              type: 'paragraph',
              text: 'شكل انتقل إلى موضع جديد، وكل نقطة منه قطعت المسافة نفسها في الاتجاه نفسه.',
            },
          ],
        },
        {
          id: 'c-b',
          blocks: [{ type: 'paragraph', text: 'شكل دار حول إحدى نقاطه بزاوية قياسها $90°$.' }],
        },
        {
          id: 'c-c',
          blocks: [{ type: 'paragraph', text: 'شكل تضاعفت أطوال أضلاعه كلها مرّتين.' }],
        },
        {
          id: 'c-d',
          blocks: [{ type: 'paragraph', text: 'شكل انقلب كما تنقلب الصورة في المرآة.' }],
        },
      ],
      correctChoiceId: 'c-a',
      explanation: [
        {
          type: 'paragraph',
          text: 'الإجابة الصحيحة: (أ). تعريف الانسحاب هو بالضبط أن كل نقاط الشكل تنتقل بالمسافة نفسها وفي الاتجاه نفسه.',
        },
        {
          type: 'paragraph',
          text: "التعليل التفصيلي: الخياران (ب) و (د) يحفظان الأطوال والزوايا، ولذلك يخطئ كثير من التلاميذ فيهما؛ لكن (ب) يغيّر اتجاه الشكل (دوران) فلا يبقى كل ضلع موازياً لنظيره، و (د) يعكس ترتيب الرؤوس (قلب). أما (ج) فيكسر حفظ الأطوال، إذ $M'N' = 2 \\times MN \\neq MN$.",
        },
        {
          type: 'paragraph',
          text: 'خطأ شائع: الاكتفاء بملاحظة أن الشكلين متطابقان في (ب) و (د) والاستنتاج بأن الحركة انسحاب. التطابق شرط لازم وليس كافياً.',
        },
      ],
    },

    /* ---------------------------------------------------------------- 2 --- */
    {
      id: 'q02-image-of-a-point-distance',
      type: 'numeric',
      origin: 'authored',
      skill: 'صورة نقطة — المسافة',
      prompt: [
        {
          type: 'paragraph',
          text: "انسحاب ينقل النقطة $A$ إلى النقطة $B$، حيث $AB = 4.5\\ \\mathrm{cm}$. لتكن $M$ نقطة كيفية من المستوي و $M'$ صورتها. ما طول $MM'$ بالسنتيمتر؟",
        },
      ],
      answer: 4.5,
      tolerance: 0.01,
      unit: 'cm',
      explanation: [
        { type: 'paragraph', text: 'الإجابة الصحيحة: $4.5$.' },
        {
          type: 'paragraph',
          text: 'الحساب والتعليل: مسافة الانسحاب واحدة لجميع نقاط المستوي، وهي طول القطعة التي تحدّد الانسحاب.',
        },
        { type: 'math', latex: "MM' = AB = 4.5\\ \\mathrm{cm}" },
        {
          type: 'paragraph',
          text: "خطأ شائع: محاولة ربط $MM'$ ببُعد النقطة $M$ عن $A$، أو ظنّ أن النقاط البعيدة عن $A$ تنتقل مسافة أكبر. موضع $M$ لا أثر له إطلاقاً.",
        },
      ],
    },

    /* ---------------------------------------------------------------- 3 --- */
    {
      id: 'q03-direction-matters',
      type: 'true-false',
      origin: 'authored',
      skill: 'الاتجاه',
      prompt: [
        {
          type: 'paragraph',
          text: 'الانسحاب الذي ينقل $A$ إلى $B$ هو نفسه الانسحاب الذي ينقل $B$ إلى $A$.',
        },
      ],
      answer: false,
      explanation: [
        { type: 'paragraph', text: 'الإجابة الصحيحة: خطأ.' },
        {
          type: 'paragraph',
          text: 'التعليل: الانسحاب يتحدّد بعنصرين معاً هما الاتجاه والمسافة. المسافة واحدة في الحالتين لأن $AB = BA$، لكن الاتجاه معاكس تماماً، فهما انسحابان مختلفان، وتركيبهما يعيد كل نقطة إلى موضعها الأصلي.',
        },
        {
          type: 'paragraph',
          text: 'خطأ شائع: الاقتصار على المسافة ونسيان الاتجاه، فيجيب التلميذ «صح» لأن $AB = BA$. يُستحسن مطالبته برسم صورة نقطة ثالثة وفق كلٍّ من الانسحابين ليرى الفرق.',
        },
      ],
    },

    /* ---------------------------------------------------------------- 4 --- */
    {
      id: 'q04-corresponding-points-parallelogram',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'النقاط المتناظرة',
      prompt: [
        {
          type: 'paragraph',
          text: "وفق الانسحاب الذي ينقل $A$ إلى $B$، صورة النقطة $M$ هي $M'$. أيُّ العبارات الآتية صحيحة دائماً؟",
        },
      ],
      choices: [
        {
          id: 'c-a',
          blocks: [{ type: 'paragraph', text: "$MM' = AB$ و $(MM') \\parallel (AB)$" }],
        },
        {
          id: 'c-b',
          blocks: [{ type: 'paragraph', text: "$MM' = AM$ و $(MM') \\parallel (AM)$" }],
        },
        {
          id: 'c-c',
          blocks: [{ type: 'paragraph', text: "$AM = BM'$ فقط، دون أي علاقة توازٍ" }],
        },
        {
          id: 'c-d',
          blocks: [
            { type: 'paragraph', text: "النقاط $A$ و $B$ و $M$ و $M'$ على استقامة واحدة دائماً" },
          ],
        },
      ],
      correctChoiceId: 'c-a',
      explanation: [
        { type: 'paragraph', text: 'الإجابة الصحيحة: (أ).' },
        {
          type: 'paragraph',
          text: "التعليل: هذا هو نصّ تعريف الانسحاب مطبّقاً على النقطة $M$، وهو ما يجعل الشكل الرباعي $ABM'M$ متوازي أضلاع، إذ فيه ضلعان متقابلان متوازيان ومتساويان.",
        },
        {
          type: 'paragraph',
          text: "الخيار (ج) صحيح جزئياً لأن $AM = BM'$ فعلاً، لكنه ناقص إذ ينفي التوازي. والخيار (د) لا يصحّ إلا في الحالة الخاصة التي تقع فيها $M$ على المستقيم $(AB)$.",
        },
        {
          type: 'paragraph',
          text: 'خطأ شائع: الخيار (ب)، أي استعمال القطعة $[AM]$ بدل القطعة التي تحدّد الانسحاب $[AB]$.',
        },
      ],
    },

    /* ---------------------------------------------------------------- 5 --- */
    {
      id: 'q05-area-is-preserved',
      type: 'numeric',
      origin: 'authored',
      skill: 'حفظ المساحات',
      prompt: [
        {
          type: 'paragraph',
          text: "مثلث $ABC$ مساحته $18\\ \\mathrm{cm}^2$. صورته وفق انسحاب هي المثلث $A'B'C'$. ما مساحة المثلث $A'B'C'$ بالسنتيمتر المربّع؟",
        },
      ],
      answer: 18,
      tolerance: 0,
      unit: 'cm²',
      explanation: [
        { type: 'paragraph', text: 'الإجابة الصحيحة: $18$.' },
        {
          type: 'paragraph',
          text: 'التعليل: الانسحاب يحافظ على المساحات، وهي إحدى الخواص الأربع المذكورة في الكتاب. والسبب العميق أن الانسحاب يحفظ جميع الأطوال، فالصورة تطابق الأصل ولم يتغيّر إلا موضعها، والمساحة لا تعتمد على الموضع.',
        },
        { type: 'math', latex: "\\mathcal{A}(A'B'C') = \\mathcal{A}(ABC) = 18\\ \\mathrm{cm}^2" },
        {
          type: 'paragraph',
          text: 'خطأ شائع: ظنّ أن المساحة تتغيّر بتغيّر الموضع، أو محاولة ضرب المساحة في مسافة الانسحاب. لا علاقة لمسافة الانسحاب بالمساحة.',
        },
      ],
    },

    /* ---------------------------------------------------------------- 6 --- */
    {
      id: 'q06-collinearity-is-preserved',
      type: 'true-false',
      origin: 'authored',
      skill: 'حفظ الاستقامة',
      prompt: [
        {
          type: 'paragraph',
          text: "إذا كانت النقاط $M$ و $S$ و $P$ على استقامة واحدة، فإن صورها $M'$ و $S'$ و $P'$ وفق انسحاب تكون على استقامة واحدة أيضاً.",
        },
      ],
      answer: true,
      explanation: [
        { type: 'paragraph', text: 'الإجابة الصحيحة: صح.' },
        {
          type: 'paragraph',
          text: "التعليل: الانسحاب يحافظ على الاستقامة. ويمكن البرهان انطلاقاً من حفظ الأطوال: إذا كانت $S$ بين $M$ و $P$ فإن $MS + SP = MP$، وبما أن $M'S' = MS$ و $S'P' = SP$ و $M'P' = MP$ نحصل على المساواة الآتية، وهي لا تتحقق إلا إذا كانت $S'$ بين $M'$ و $P'$ على استقامة واحدة.",
        },
        { type: 'math', latex: "M'S' + S'P' = M'P'" },
        {
          type: 'paragraph',
          text: 'خطأ شائع: الاعتقاد بأن الاستقامة تنكسر إذا كان الانسحاب «مائلاً» بالنسبة للمستقيم. اتجاه الانسحاب لا يؤثّر، لأن النقاط الثلاث تنتقل جميعاً بالمقدار نفسه.',
        },
      ],
    },

    /* ---------------------------------------------------------------- 7 --- */
    {
      id: 'q07-why-angles-are-preserved',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'تعليل حفظ الزوايا',
      prompt: [
        {
          type: 'paragraph',
          text: "أيُّ التعليلات الآتية يُثبت أن $\\widehat{S'M'N'} = \\widehat{SMN}$ وفق انسحاب؟",
        },
      ],
      choices: [
        {
          id: 'c-a',
          blocks: [
            {
              type: 'paragraph',
              text: "لأن $M'S' = MS$ و $M'N' = MN$ و $S'N' = SN$، فالمثلثان متطابقان، وبالتالي تتساوى الزاويتان.",
            },
          ],
        },
        {
          id: 'c-b',
          blocks: [{ type: 'paragraph', text: 'لأن المثلثين لهما المساحة نفسها.' }],
        },
        {
          id: 'c-c',
          blocks: [{ type: 'paragraph', text: "لأن المسافة $MM'$ تساوي المسافة $NN'$ فقط." }],
        },
        {
          id: 'c-d',
          blocks: [{ type: 'paragraph', text: 'لأن الزاويتين تبدوان متساويتين في الرسم.' }],
        },
      ],
      correctChoiceId: 'c-a',
      explanation: [
        { type: 'paragraph', text: 'الإجابة الصحيحة: (أ).' },
        {
          type: 'paragraph',
          text: "التعليل: حفظ قياس الزوايا نتيجةٌ لحفظ الأطوال. تساوي الأضلاع الثلاثة يعطي تطابق المثلثين $SMN$ و $S'M'N'$، ومن التطابق تتساوى الزوايا المتناظرة.",
        },
        {
          type: 'paragraph',
          text: 'الخيار (ب) غير كافٍ: مثلثان لهما المساحة نفسها قد تختلف زواياهما تماماً. والخيار (ج) صحيح في ذاته لكنه لا يكفي وحده لاستنتاج تساوي الزوايا. والخيار (د) ليس تعليلاً رياضياً؛ من المهمّ رفضه صراحةً أمام التلاميذ.',
        },
      ],
    },

    /* ---------------------------------------------------------------- 8 --- */
    {
      id: 'q08-detect-a-non-translation',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'كشف ما ليس انسحاباً',
      prompt: [
        {
          type: 'paragraph',
          text: 'شكلان متطابقان تماماً في أطوال أضلاعهما وقياسات زواياهما، غير أن أضلاع الشكل الثاني ليست موازية للأضلاع المناظرة لها في الشكل الأول. ما الاستنتاج الصحيح؟',
        },
      ],
      choices: [
        {
          id: 'c-a',
          blocks: [
            {
              type: 'paragraph',
              text: "الشكل الثاني ليس صورة الأول وفق انسحاب، لأن الانسحاب يوجب $(MN) \\parallel (M'N')$ لكل ضلع.",
            },
          ],
        },
        {
          id: 'c-b',
          blocks: [
            { type: 'paragraph', text: 'الشكل الثاني صورة الأول وفق انسحاب، لأن الأطوال محفوظة.' },
          ],
        },
        {
          id: 'c-c',
          blocks: [
            {
              type: 'paragraph',
              text: 'الشكل الثاني صورة الأول وفق انسحاب، لأن المساحتين متساويتان.',
            },
          ],
        },
        {
          id: 'c-d',
          blocks: [{ type: 'paragraph', text: 'لا يمكن الحكم قبل معرفة مساحة الشكلين.' }],
        },
      ],
      correctChoiceId: 'c-a',
      explanation: [
        { type: 'paragraph', text: 'الإجابة الصحيحة: (أ).' },
        {
          type: 'paragraph',
          text: 'التعليل: حفظ الأطوال والزوايا والمساحات شروط لازمة للانسحاب، لكنها ليست كافية؛ فالدوران والتناظر يحققانها أيضاً. الشرط الفاصل هو بقاء اتجاه الشكل، ويظهر في توازي كل ضلع مع نظيره. غياب هذا التوازي يعني أن الشكل قد أُدير.',
        },
        {
          type: 'paragraph',
          text: 'خطأ شائع: الخياران (ب) و (ج)، أي الاستدلال بشرط لازم على أنه كافٍ. وهذا هو الخطأ المنطقي الأكثر تكراراً في هذا الدرس.',
        },
      ],
    },

    /* ---------------------------------------------------------------- 9 --- */
    {
      id: 'q09-meaning-of-parallel-paths',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'معنى علاقة التوازي',
      prompt: [
        {
          type: 'paragraph',
          text: "في الانسحاب الذي ينقل $A$ إلى $B$، نكتب $(MM') \\parallel (AB)$ و $(NN') \\parallel (AB)$. ماذا تعني هاتان العلاقتان؟",
        },
      ],
      choices: [
        {
          id: 'c-a',
          blocks: [
            {
              type: 'paragraph',
              text: 'أن مسار النقطة $M$ ومسار النقطة $N$ لهما اتجاه الانسحاب نفسه، أي أن كل النقاط تتحرك في الاتجاه ذاته.',
            },
          ],
        },
        {
          id: 'c-b',
          blocks: [{ type: 'paragraph', text: 'أن القطعة $[MN]$ موازية للقطعة $[AB]$.' }],
        },
        {
          id: 'c-c',
          blocks: [{ type: 'paragraph', text: 'أن النقطتين $M$ و $N$ تقعان على المستقيم $(AB)$.' }],
        },
        {
          id: 'c-d',
          blocks: [{ type: 'paragraph', text: "أن $MM' \\neq NN'$." }],
        },
      ],
      correctChoiceId: 'c-a',
      explanation: [
        { type: 'paragraph', text: 'الإجابة الصحيحة: (أ).' },
        {
          type: 'paragraph',
          text: "التعليل: العلاقتان تتحدثان عن المسارات $[MM']$ و $[NN']$، لا عن أضلاع الشكل. وهما تعبّران عن وحدة اتجاه الحركة. ويُضاف إليهما في الكتاب أن $MM' = NN' = AB$، أي وحدة المسافة.",
        },
        {
          type: 'paragraph',
          text: 'الخيار (ب) يخلط بين مسار النقطة وضلع الشكل؛ فالقطعة $[MN]$ ليست مساراً، ولا سبب لأن توازي $[AB]$. والخيار (ج) خاطئ لأن $M$ و $N$ نقطتان كيفيتان. والخيار (د) يناقض تعريف الانسحاب.',
        },
      ],
    },

    /* --------------------------------------------------------------- 10 --- */
    {
      id: 'q10-compute-image-coordinate',
      type: 'numeric',
      origin: 'authored',
      skill: 'حساب صورة شكل',
      prompt: [
        {
          type: 'paragraph',
          text: "على شبكة تربيعية، انسحاب ينقل النقطة $A$ إلى النقطة $A'$ بمقدار $5$ وحدات نحو اليمين و $2$ وحدة نحو الأعلى. النقطة $B$ تقع على بُعد $3$ وحدات نحو اليمين من $A$ وعلى الارتفاع نفسه.",
        },
        {
          type: 'paragraph',
          text: "كم وحدة تفصل $B'$ عن $A$ في الاتجاه الأفقي (نحو اليمين)؟",
        },
      ],
      answer: 8,
      tolerance: 0,
      unit: 'وحدة',
      explanation: [
        { type: 'paragraph', text: 'الإجابة الصحيحة: $8$.' },
        {
          type: 'paragraph',
          text: 'الحساب: النقطة $B$ تبعد $3$ وحدات أفقياً عن $A$. والانسحاب يزيد الإحداثي الأفقي لكل نقطة بمقدار $5$ وحدات. إذاً:',
        },
        { type: 'math', latex: '3 + 5 = 8' },
        {
          type: 'paragraph',
          text: "تحقّق إضافي: $A'$ تبعد $5$ وحدات أفقياً عن $A$، و $B'$ تبعد $8$ وحدات، فالفرق بينهما $3$ وحدات، وهو طول $[AB]$ نفسه. وهذا يؤكّد أن $A'B' = AB$، أي أن الانسحاب حفظ الطول.",
        },
        {
          type: 'paragraph',
          text: "أخطاء شائعة: الإجابة $5$ (تطبيق الانسحاب على $A$ فقط ونسيان أن السؤال عن $B'$)، أو الإجابة $3$ (نسيان تطبيق الانسحاب أصلاً)، أو الإجابة $2$ (استعمال المركّبة العمودية).",
        },
      ],
    },
  ],
};
