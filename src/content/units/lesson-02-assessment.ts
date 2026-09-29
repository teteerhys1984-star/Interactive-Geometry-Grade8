import type { AssessmentInput } from '../schema';

/**
 * ============================================================================
 *  الاختبار النهائي للدرس الثاني — من إعداد المنصّة
 * ============================================================================
 *
 *  These twelve questions are written by this platform. They are NOT the
 *  textbook's activity, «تحقّق من فهمك» items or «تدرّب» exercises, and they do
 *  not reproduce them: each one places the concept in a new configuration.
 *
 *  They span: the definition itself, the parallelogram condition, the
 *  bisecting diagonals, preserved length and parallelism, reading a squared
 *  grid, the compass construction, the special collinear case, telling a
 *  translation from its opposite, and composing a translation twice.
 *
 *  `explanation` on every question is TEACHER-ONLY: it is rendered exclusively
 *  inside the Teacher Area, behind the passphrase gate, and never reaches the
 *  student UI before, during or after the assessment.
 * ============================================================================
 */
export const lesson02Assessment: AssessmentInput = {
  id: 'assess-lesson-02-image-of-a-point',
  title: 'الاختبار النهائي — صورة نقطة وفق انسحاب',
  instructions:
    'اثنا عشر سؤالاً تقيس فهمك لصورة النقطة وفق انسحاب: التعريف، متوازي الأضلاع، القطران المتناصفان، القراءة على الشبكة، الإنشاء بالفرجار، والحالة الخاصة. الأسئلة من إعداد المنصّة وليست أسئلة الكتاب. يظهر سؤال واحد في كل مرة، ولا تُعرض النتيجة إلا بعد التسليم.',
  passingScore: 70,
  questions: [
    /* ---------------------------------------------------------------- 1 --- */
    {
      id: 'q01-definition-quadrilateral',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'التعريف — ترتيب رؤوس متوازي الأضلاع',
      prompt: [
        {
          type: 'paragraph',
          text: "النقطة $S$ لا تنتمي إلى المستقيم $(UV)$، والنقطة $S'$ هي صورتها وفق الانسحاب الذي ينقل $U$ إلى $V$. أيُّ الرباعيات الآتية هو متوازي الأضلاع الذي يعبّر عن ذلك؟",
        },
      ],
      choices: [
        { id: 'c-a', blocks: [{ type: 'paragraph', text: "$UVS'S$" }] },
        { id: 'c-b', blocks: [{ type: 'paragraph', text: "$UVSS'$" }] },
        { id: 'c-c', blocks: [{ type: 'paragraph', text: "$USVS'$" }] },
        { id: 'c-d', blocks: [{ type: 'paragraph', text: "$SUVS'$" }] },
      ],
      correctChoiceId: 'c-a',
      explanation: [
        {
          type: 'paragraph',
          text: "الإجابة الصحيحة: $UVS'S$. يُقرأ الرباعي على محيطه، فتكون أضلاعه $[UV]$ و $[VS']$ و $[S'S]$ و $[SU]$، ويقابل الضلعُ $[UV]$ الضلعَ $[SS']$ — وهما ناتجان عن الحركة نفسها.",
        },
        {
          type: 'paragraph',
          text: "خطأ شائع: اختيار $UVSS'$ لأنها تبدو «بالترتيب الأبجدي». هذا الترتيب يجعل الضلعين يتقاطعان فينتج رباعي معقود، لا متوازي أضلاع.",
        },
      ],
    },

    /* ---------------------------------------------------------------- 2 --- */
    {
      id: 'q02-point-on-line-has-image',
      type: 'true-false',
      origin: 'authored',
      skill: 'الحالة الخاصة',
      prompt: [
        {
          type: 'paragraph',
          text: 'إذا وقعت النقطة $M$ على المستقيم $(AB)$، فلا توجد لها صورة وفق الانسحاب الذي ينقل $A$ إلى $B$.',
        },
      ],
      answer: false,
      explanation: [
        {
          type: 'paragraph',
          text: 'العبارة خاطئة. الصورة موجودة دائماً؛ ما يحدث في هذه الحالة أنها تقع على المستقيم نفسه، فتصبح النقاط الأربع على استقامة واحدة ولا يُرى متوازي الأضلاع.',
        },
        {
          type: 'paragraph',
          text: 'التفكير الخاطئ المتوقّع: «التعريف يشترط ألّا تنتمي $M$ إلى $(AB)$، إذن لا صورة». الشرط في التعريف يخصّ صياغة متوازي الأضلاع فقط، ولذلك أفرد الكتاب لها فقرة «حالة خاصة».',
        },
      ],
    },

    /* ---------------------------------------------------------------- 3 --- */
    {
      id: 'q03-length-preserved',
      type: 'numeric',
      origin: 'authored',
      skill: 'حفظ الأطوال',
      prompt: [
        {
          type: 'paragraph',
          text: "انسحاب ينقل $A$ إلى $B$ حيث $AB = 7\\ \\text{cm}$. النقطة $M$ لا تنتمي إلى $(AB)$ وصورتها $M'$. كم يساوي الطول $MM'$ بالسنتيمتر؟",
        },
      ],
      answer: 7,
      unit: 'cm',
      explanation: [
        {
          type: 'paragraph',
          text: "الجواب: $7$. الرباعي $ABM'M$ متوازي أضلاع، وفي متوازي الأضلاع يتساوى الضلعان المتقابلان، فيكون $MM' = AB = 7\\ \\text{cm}$.",
        },
        {
          type: 'paragraph',
          text: 'خطأ شائع: ظنّ أن الطول يتغيّر بحسب بُعد النقطة عن المستقيم. الانسحاب يحفظ الأطوال مهما كان موضع النقطة.',
        },
      ],
    },

    /* ---------------------------------------------------------------- 4 --- */
    {
      id: 'q04-grid-column-reading',
      type: 'numeric',
      origin: 'authored',
      skill: 'القراءة على شبكة سنتيمترية',
      prompt: [
        {
          type: 'paragraph',
          text: 'على ورقة سنتيمترية، ينقل الانسحاب النقطة $A$ إلى النقطة $B$ بالانتقال $4$ مربّعات نحو اليمين و $3$ مربّعات نحو الأعلى. تقع النقطة $M$ في العمود $2$ والسطر $5$. في أي عمود تقع صورتها؟',
        },
      ],
      answer: 6,
      explanation: [
        {
          type: 'paragraph',
          text: 'الجواب: العمود $6$، لأن الانسحاب يضيف $4$ إلى رقم العمود: $2 + 4 = 6$ (ويصبح السطر $5 + 3 = 8$).',
        },
        {
          type: 'paragraph',
          text: 'خطأ شائع: جمع العددين معاً ($4 + 3$) أو تطبيق الانتقال الأفقي على السطر. على الشبكة تُطبَّق كل حركة على محورها.',
        },
      ],
    },

    /* ---------------------------------------------------------------- 5 --- */
    {
      id: 'q05-bisecting-diagonals',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'القطران المتناصفان',
      prompt: [
        {
          type: 'paragraph',
          text: "النقطة $M'$ صورة $M$ وفق الانسحاب الذي ينقل $A$ إلى $B$، والنقطة $M$ لا تنتمي إلى $(AB)$. أيُّ قطعتين متناصفتان؟",
        },
      ],
      choices: [
        { id: 'c-a', blocks: [{ type: 'paragraph', text: "$[AM']$ و $[BM]$" }] },
        { id: 'c-b', blocks: [{ type: 'paragraph', text: "$[AB]$ و $[MM']$" }] },
        { id: 'c-c', blocks: [{ type: 'paragraph', text: "$[AM]$ و $[BM']$" }] },
        { id: 'c-d', blocks: [{ type: 'paragraph', text: '$[AB]$ و $[AM]$' }] },
      ],
      correctChoiceId: 'c-a',
      explanation: [
        {
          type: 'paragraph',
          text: "الإجابة الصحيحة: $[AM']$ و $[BM]$، وهما قطرا متوازي الأضلاع $ABM'M$، وقطرا متوازي الأضلاع يتناصفان.",
        },
        {
          type: 'paragraph',
          text: "التفكير الخاطئ الشائع: اختيار $[AB]$ و $[MM']$، وهما الضلعان المتقابلان لا القطران؛ الضلعان متوازيان ومتساويان، لكنهما لا يتقاطعان أصلاً.",
        },
      ],
    },

    /* ---------------------------------------------------------------- 6 --- */
    {
      id: 'q06-direction-matters',
      type: 'true-false',
      origin: 'authored',
      skill: 'اتجاه الانسحاب',
      prompt: [
        {
          type: 'paragraph',
          text: 'الانسحاب الذي ينقل $A$ إلى $B$ يعطي النقطة نفسَها صورةً يعطيها الانسحاب الذي ينقل $B$ إلى $A$.',
        },
      ],
      answer: false,
      explanation: [
        {
          type: 'paragraph',
          text: 'العبارة خاطئة. الطول $AB$ واحد في الحالتين، لكن الاتجاه معاكس، فالصورتان تقعان على جهتين مختلفتين من النقطة الأصلية، ويُلغي كل انسحاب أثر الآخر.',
        },
        {
          type: 'paragraph',
          text: 'يفيد هنا سؤال التلميذ: «إلى أين تشير الحركة؟» قبل «كم طولها؟».',
        },
      ],
    },

    /* ---------------------------------------------------------------- 7 --- */
    {
      id: 'q07-compass-first-circle',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'الإنشاء بالفرجار',
      prompt: [
        {
          type: 'paragraph',
          text: 'على ورقة بيضاء، نريد إنشاء صورة النقطة $K$ وفق الانسحاب الذي ينقل $R$ إلى $S$. ما الدائرة التي نرسمها أولاً؟',
        },
      ],
      choices: [
        {
          id: 'c-a',
          blocks: [{ type: 'paragraph', text: 'الدائرة التي مركزها $K$ ونصف قطرها $RS$.' }],
        },
        {
          id: 'c-b',
          blocks: [{ type: 'paragraph', text: 'الدائرة التي مركزها $R$ ونصف قطرها $RK$.' }],
        },
        {
          id: 'c-c',
          blocks: [{ type: 'paragraph', text: 'الدائرة التي مركزها $S$ ونصف قطرها $RS$.' }],
        },
        {
          id: 'c-d',
          blocks: [{ type: 'paragraph', text: 'الدائرة التي مركزها $K$ ونصف قطرها $RK$.' }],
        },
      ],
      correctChoiceId: 'c-a',
      explanation: [
        {
          type: 'paragraph',
          text: 'الإجابة الصحيحة: (أ). الصورة تبعد عن $K$ بمقدار طول الانسحاب نفسه، أي $RS$، فنأخذ فتحة الفرجار $RS$ ونضع سنّه في $K$.',
        },
        {
          type: 'paragraph',
          text: 'الدائرة الثانية مركزها $S$ ونصف قطرها $RK$، وتقاطع الدائرتين يعطي النقطتين المرشّحتين، ثم نختار التي تُكمل متوازي الأضلاع دون تقاطع الأضلاع.',
        },
      ],
    },

    /* ---------------------------------------------------------------- 8 --- */
    {
      id: 'q08-parallel-equal-not-enough',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'الاستنتاج — شرط لازم غير كافٍ',
      prompt: [
        {
          type: 'paragraph',
          text: "عُلم أنَّ $MM' = AB$ وأنَّ $(MM')$ يوازي $(AB)$، والنقطة $M$ لا تنتمي إلى $(AB)$. هل يكفي ذلك للقول إنَّ $M'$ هي صورة $M$ وفق الانسحاب الذي ينقل $A$ إلى $B$؟",
        },
      ],
      choices: [
        {
          id: 'c-a',
          blocks: [
            {
              type: 'paragraph',
              text: 'لا، لأن الحركة قد تكون بالاتجاه المعاكس فتكون الصورة على الجهة الأخرى.',
            },
          ],
        },
        {
          id: 'c-b',
          blocks: [{ type: 'paragraph', text: 'نعم، فالتوازي وتساوي الطول يكفيان دائماً.' }],
        },
        {
          id: 'c-c',
          blocks: [{ type: 'paragraph', text: 'لا، لأن الانسحاب لا يحفظ الأطوال.' }],
        },
        {
          id: 'c-d',
          blocks: [
            { type: 'paragraph', text: 'نعم، بشرط أن يكون الطول أكبر من $5\\ \\text{cm}$.' },
          ],
        },
      ],
      correctChoiceId: 'c-a',
      explanation: [
        {
          type: 'paragraph',
          text: "الإجابة الصحيحة: (أ). الشرطان يعطيان رباعياً إما متوازي أضلاع $ABM'M$ (وهو المطلوب) وإما شكلاً معقوداً حين يكون الاتجاه معاكساً، أي حين تكون $M'$ صورة $M$ وفق الانسحاب الذي ينقل $B$ إلى $A$.",
        },
        {
          type: 'paragraph',
          text: 'الخيار (ج) خاطئ رياضياً: الانسحاب يحفظ الأطوال. والخيار (د) يخترع شرطاً عددياً لا وجود له.',
        },
      ],
    },

    /* ---------------------------------------------------------------- 9 --- */
    {
      id: 'q09-midpoint-length',
      type: 'numeric',
      origin: 'authored',
      skill: 'تناصف القطرين — حساب',
      prompt: [
        {
          type: 'paragraph',
          text: "النقطة $M'$ صورة $M$ وفق الانسحاب الذي ينقل $A$ إلى $B$، والنقطة $M$ لا تنتمي إلى $(AB)$. إذا كان $AM' = 10\\ \\text{cm}$، وكانت $I$ نقطة تقاطع القطرين، فكم يساوي $AI$ بالسنتيمتر؟",
        },
      ],
      answer: 5,
      unit: 'cm',
      explanation: [
        {
          type: 'paragraph',
          text: "الجواب: $5$. القطران يتناصفان، فنقطة تقاطعهما $I$ هي منتصف $[AM']$، ومنه $AI = \\dfrac{10}{2} = 5\\ \\text{cm}$.",
        },
        {
          type: 'paragraph',
          text: 'خطأ شائع: استعمال طول الضلع بدل طول القطر، أو ظنّ أن نقطة التقاطع تقسم القطر بنسب غير متساوية.',
        },
      ],
    },

    /* --------------------------------------------------------------- 10 --- */
    {
      id: 'q10-collinear-detection',
      type: 'multiple-choice',
      origin: 'authored',
      skill: 'تمييز الحالات',
      prompt: [
        {
          type: 'paragraph',
          text: 'في أيِّ الحالات الآتية تكون النقطة وصورتها والنقطتان المعرِّفتان للانسحاب على استقامة واحدة؟',
        },
      ],
      choices: [
        {
          id: 'c-a',
          blocks: [{ type: 'paragraph', text: 'عندما تنتمي النقطة إلى المستقيم $(AB)$.' }],
        },
        {
          id: 'c-b',
          blocks: [{ type: 'paragraph', text: 'عندما تكون النقطة بعيدة جداً عن المستقيم $(AB)$.' }],
        },
        {
          id: 'c-c',
          blocks: [{ type: 'paragraph', text: 'عندما يكون الطول $AB$ صغيراً.' }],
        },
        { id: 'c-d', blocks: [{ type: 'paragraph', text: 'لا تحدث هذه الحالة أبداً.' }] },
      ],
      correctChoiceId: 'c-a',
      explanation: [
        {
          type: 'paragraph',
          text: 'الإجابة الصحيحة: (أ). إذا كانت النقطة على المستقيم فإن صورتها تبقى عليه، لأن الحركة تجري في اتجاه المستقيم نفسه.',
        },
        {
          type: 'paragraph',
          text: 'الخياران (ب) و (ج) يربطان الحالة بالمسافات، وهي لا تؤثر إطلاقاً؛ المعيار الوحيد هو انتماء النقطة إلى المستقيم.',
        },
      ],
    },

    /* --------------------------------------------------------------- 11 --- */
    {
      id: 'q11-tools-of-construction',
      type: 'true-false',
      origin: 'authored',
      skill: 'أدوات الإنشاء الهندسي',
      prompt: [
        {
          type: 'paragraph',
          text: 'في الإنشاء الهندسي لصورة نقطة على ورقة بيضاء، يُسمح بقياس الأطوال بالمسطرة المدرجة.',
        },
      ],
      answer: false,
      explanation: [
        {
          type: 'paragraph',
          text: 'العبارة خاطئة. الإنشاء الهندسي يستعمل الفرجار ومسطرة غير مدرجة فقط؛ الفرجار هو الذي ينقل الطول دون قياسه بالأرقام.',
        },
        {
          type: 'paragraph',
          text: 'ملاحظة للمعلّم: التمييز بين «الرسم بالقياس» و«الإنشاء» هدف تعليمي بحد ذاته في هذا الدرس.',
        },
      ],
    },

    /* --------------------------------------------------------------- 12 --- */
    {
      id: 'q12-translation-applied-twice',
      type: 'numeric',
      origin: 'authored',
      skill: 'تطبيق الانسحاب مرّتين',
      prompt: [
        {
          type: 'paragraph',
          text: "انسحاب ينقل $A$ إلى $B$ حيث $AB = 6\\ \\text{cm}$. طبّقناه على النقطة $M$ فحصلنا على $M'$، ثم طبّقناه على $M'$ فحصلنا على $M''$. كم يساوي الطول $MM''$ بالسنتيمتر؟",
        },
      ],
      answer: 12,
      unit: 'cm',
      explanation: [
        {
          type: 'paragraph',
          text: "الجواب: $12$. الحركتان لهما الاتجاه نفسه، فالنقاط $M$ و $M'$ و $M''$ على استقامة واحدة، ويكون $MM'' = MM' + M'M'' = 6 + 6 = 12\\ \\text{cm}$.",
        },
        {
          type: 'paragraph',
          text: 'خطأ شائع: الإجابة $6$ (نسيان أن الحركة تكرّرت) أو استعمال نظرية فيثاغورس، وهي غير واردة لأن الحركتين متتاليتان في الاتجاه نفسه لا متعامدتان.',
        },
      ],
    },
  ],
};
