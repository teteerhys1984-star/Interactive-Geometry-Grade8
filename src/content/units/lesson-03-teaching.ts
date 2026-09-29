import type { LessonStepInput } from '../schema';

/**
 * Platform-authored teaching for Lesson 3. None of these words or figures is
 * presented as textbook content. Every teaching figure uses coordinates chosen
 * here and computes images by one exact translation vector.
 */
const AUTHORED = 'authored' as const;
const KICKER = 'شرح المنصّة';

export const teachingShapeAsPoints: LessonStepInput = {
  id: 'teach-03-01-shape-as-points',
  origin: AUTHORED,
  kicker: KICKER,
  title: 'من صورة نقطة إلى صورة شكل كامل',
  blocks: [
    {
      type: 'teaching',
      variant: 'concept',
      title: 'نكرّر الحركة نفسها لكل نقطة',
      blocks: [
        {
          type: 'paragraph',
          text: 'في الدرس السابق رسمنا صورة نقطة واحدة. أمّا صورة الشكل فتُبنى بالطريقة نفسها: نرسم صورة كل نقطة مهمّة فيه وفق الانسحاب ذاته، ثم نصل الصور بالترتيب نفسه. لا يدور الشكل ولا ينعكس ولا يتغيّر حجمه؛ إنه ينتقل فقط.',
        },
        {
          type: 'figure',
          diagram: {
            kind: 'constructed',
            origin: AUTHORED,
            id: 'auth-03-triangle-all-points',
            renderer: 'translation-figure',
            alt: 'مثلث $ABC$ وصورته $A\\prime B\\prime C\\prime$، مع ثلاثة أسهم متساوية ومتوازية تصل كل رأس بصورته.',
            caption: 'مثال من إعداد المنصّة: كل رأس ينتقل بالاتجاه نفسه وبالمسافة نفسها.',
            construction: {
              shape: [
                [0, 0],
                [2.4, 0.2],
                [0.8, 2.2],
              ],
              vector: [3.8, 1.1],
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
      variant: 'tip',
      title: 'اختبار سريع قبل أن تبدأ الرسم',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'حدّد اتجاه الحركة من النقطة الأولى إلى الثانية، لا بالعكس.',
            'استعمل الحركة نفسها لكل رؤوس الشكل بلا استثناء.',
            'أعِد وصل صور الرؤوس بالترتيب نفسه الذي وُصلت به الرؤوس الأصلية.',
          ],
        },
      ],
    },
  ],
};

export const teachingWhyLineStaysParallel: LessonStepInput = {
  id: 'teach-03-02-why-line-stays-parallel',
  origin: AUTHORED,
  kicker: KICKER,
  title: 'لماذا تبقى صورة المستقيم موازية له؟',
  blocks: [
    {
      type: 'teaching',
      variant: 'why',
      title: 'يكفي تتبّع نقطتين',
      blocks: [
        {
          type: 'paragraph',
          text: "اختر نقطتين مختلفتين $M$ و $N$ على المستقيم. بعد الانسحاب نحصل على $M'$ و $N'$. الحركة من $M$ إلى $M'$ هي نفسها من $N$ إلى $N'$، لذلك يكون الرباعي $MM'N'N$ متوازي أضلاع، ومن ثم يكون الضلع $[M'N']$ موازياً للضلع $[MN]$.",
        },
        {
          type: 'paragraph',
          text: "إذا كان اتجاه الانسحاب موازياً للمستقيم نفسه، فإن صور نقاط المستقيم تبقى عليه؛ لذلك تنطبق الصورة $(d')$ على الأصل $(d)$. الانطباق هنا لا يناقض التوازي، بل هو الحالة الخاصة المذكورة في الكتاب.",
        },
        {
          type: 'figure',
          diagram: {
            kind: 'constructed',
            origin: AUTHORED,
            id: 'auth-03-line-image',
            renderer: 'translation-figure',
            alt: 'قطعة من مستقيم تمر بالنقطتين $M$ و $N$ وصورتها الموازية المارة بالنقطتين $M\\prime$ و $N\\prime$.',
            caption: 'رسم من إعداد المنصّة: النقطتان تكفيان لتحديد المستقيم وصورته.',
            construction: {
              shape: [
                [0, 0],
                [3.2, 1.3],
              ],
              vector: [1.1, 2.5],
              labels: ['M', 'N'],
              connectors: [0, 1],
              closed: false,
              shade: false,
              grid: false,
            },
          },
        },
      ],
    },
  ],
};

export const teachingShapeExplorer: LessonStepInput = {
  id: 'teach-03-03-shape-explorer',
  origin: AUTHORED,
  kicker: KICKER,
  title: 'مختبر صورة الشكل',
  blocks: [
    {
      type: 'teaching',
      variant: 'example',
      title: 'غيّر الشكل والانسحاب وراقب ما يبقى ثابتاً',
      blocks: [
        {
          type: 'paragraph',
          text: 'هذا مختبر من إعداد المنصّة، وليس شكلاً من الكتاب. اختر شكلاً، ثم غيّر مركبتي الحركة. يمكنك إظهار البناء على مراحل: الأصل، ثم مسارات النقاط، ثم الصورة الكاملة.',
        },
        {
          type: 'figure',
          diagram: {
            kind: 'interactive',
            origin: AUTHORED,
            id: 'auth-03-shape-explorer',
            renderer: 'shape-translation-lab',
            alt: 'مختبر تفاعلي يعرض شكلاً أصلياً وصورته، ويتيح تغيير نوع الشكل ومركبتي الانسحاب وإظهار البناء على مراحل.',
            caption: 'تفاعل من إعداد المنصّة: الصورة تُحسب بإضافة الحركة نفسها إلى كل نقطة.',
            params: {},
          },
        },
      ],
    },
  ],
};

export const teachingConstructionSequence: LessonStepInput = {
  id: 'teach-03-04-construction-sequence',
  origin: AUTHORED,
  kicker: KICKER,
  title: 'إنشاء صورة شكل خطوةً خطوة',
  blocks: [
    {
      type: 'teaching',
      variant: 'example',
      title: 'من الرؤوس إلى الصورة النهائية',
      blocks: [
        {
          type: 'paragraph',
          text: 'المثال الآتي من إعداد المنصّة. نريد صورة الرباعي $ABCD$ وفق حركة مقدارها أربع وحدات يميناً ووحدتان إلى الأعلى. تقدّم خطوةً خطوة ولاحظ أن كل رأس يُعالج بالطريقة ذاتها قبل رسم الأضلاع الجديدة.',
        },
        {
          type: 'figure',
          diagram: {
            kind: 'interactive',
            origin: AUTHORED,
            id: 'auth-03-quadrilateral-construction',
            renderer: 'construction-figure',
            alt: 'إنشاء تدريجي لصورة رباعي: يظهر الأصل، ثم أسهم انتقال الرؤوس، ثم نقاط الصورة، ثم أضلاع الصورة.',
            caption: 'إنشاء من إعداد المنصّة: لا يظهر الشكل النهائي قبل المرور بخطوات البناء.',
            params: {
              padding: 1,
              steps: [
                'الشكل الأصلي ونقاطه الأربع.',
                'نطبّق الحركة نفسها على كل رأس.',
                'تظهر صور الرؤوس الأربع.',
                'نصل الصور بالترتيب نفسه فنحصل على الشكل النهائي.',
              ],
              elements: [
                { kind: 'segment', from: [0, 0], to: [2.4, 0.2], step: 0 },
                { kind: 'segment', from: [2.4, 0.2], to: [2.1, 2.1], step: 0 },
                { kind: 'segment', from: [2.1, 2.1], to: [0.4, 2.6], step: 0 },
                { kind: 'segment', from: [0.4, 2.6], to: [0, 0], step: 0 },
                { kind: 'point', at: [0, 0], label: 'A', step: 0 },
                { kind: 'point', at: [2.4, 0.2], label: 'B', step: 0 },
                { kind: 'point', at: [2.1, 2.1], label: 'C', step: 0 },
                { kind: 'point', at: [0.4, 2.6], label: 'D', step: 0 },
                { kind: 'arrow', from: [0, 0], to: [4, 2], step: 1 },
                { kind: 'arrow', from: [2.4, 0.2], to: [6.4, 2.2], step: 1 },
                { kind: 'arrow', from: [2.1, 2.1], to: [6.1, 4.1], step: 1 },
                { kind: 'arrow', from: [0.4, 2.6], to: [4.4, 4.6], step: 1 },
                { kind: 'point', at: [4, 2], label: "A'", tone: 'image', step: 2 },
                { kind: 'point', at: [6.4, 2.2], label: "B'", tone: 'image', step: 2 },
                { kind: 'point', at: [6.1, 4.1], label: "C'", tone: 'image', step: 2 },
                { kind: 'point', at: [4.4, 4.6], label: "D'", tone: 'image', step: 2 },
                { kind: 'segment', from: [4, 2], to: [6.4, 2.2], tone: 'image', step: 3 },
                { kind: 'segment', from: [6.4, 2.2], to: [6.1, 4.1], tone: 'image', step: 3 },
                { kind: 'segment', from: [6.1, 4.1], to: [4.4, 4.6], tone: 'image', step: 3 },
                { kind: 'segment', from: [4.4, 4.6], to: [4, 2], tone: 'image', step: 3 },
              ],
            },
          },
        },
      ],
    },
  ],
};

export const teachingGroupedChallenges: LessonStepInput = {
  id: 'teach-03-05-grouped-challenges',
  origin: AUTHORED,
  kicker: KICKER,
  title: 'تحديات قبل التمرينات',
  blocks: [
    {
      type: 'teaching',
      variant: 'example',
      title: 'حدّد الصورة، استخرج الحركة، واكتشف الخطأ',
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
            id: 'auth-03-grouped-challenges',
            renderer: 'translation-challenges',
            alt: 'ثلاثة تحديات هندسية تفاعلية من إعداد المنصّة حول تحديد صورة شكل واستخراج حركة انسحاب واكتشاف خطأ في صورة مثلث.',
            caption: 'تدريب من إعداد المنصّة: النتيجة تظهر بعد تسليم الإجابات الثلاث معاً.',
            params: {},
          },
        },
      ],
    },
  ],
};

export const teachingLessonThreeRecap: LessonStepInput = {
  id: 'teach-03-06-recap',
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
            'صورة المستقيم مستقيم يوازيه، وقد تنطبق عليه عندما يكون اتجاه الانسحاب موازياً له.',
            'صورة القطعة مستقيمة قطعة توازي الأصل وتساويه في الطول.',
            'صورة نصف المستقيم نصف مستقيم يوازي الأصل وله الاتجاه نفسه.',
            'صورة الدائرة دائرة لها نصف القطر نفسه، ومركزها هو صورة المركز.',
            'الانسحاب يحافظ على التوازي والتعامد والأطوال والزوايا؛ لذلك يحافظ على نوع الشكل وقياساته.',
            'لرسم صورة شكل: ارسم صور نقاطه المميّزة، ثم صِلها بالترتيب نفسه.',
          ],
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'pitfall',
      title: 'ثلاثة أخطاء شائعة',
      collapsible: true,
      revealLabel: 'اكشف الأخطاء بعد أن تسمّيها بنفسك',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'عكس اتجاه الانسحاب: استعمال الحركة من الصورة إلى الأصل بدل الحركة المطلوبة.',
            'نقل بعض الرؤوس بمسافات مختلفة، فيتغيّر طول ضلع أو زاوية.',
            'وصل صور الرؤوس بترتيب مختلف، فينتج شكل معقود أو مقلوب.',
          ],
        },
      ],
    },
  ],
};
