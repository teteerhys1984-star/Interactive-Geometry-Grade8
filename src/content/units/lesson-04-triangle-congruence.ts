import type { LessonInput } from '../schema';
import {
  teachingCasesLab,
  teachingCongruenceChallenges,
  teachingElementsMatching,
  teachingFromTranslationToCongruence,
  teachingLessonFourRecap,
  teachingProofWriting,
} from './lesson-04-teaching';
import { lesson04Assessment } from './lesson-04-assessment';
import { lesson04TeacherResources } from './lesson-04-teacher';

/**
 * Unit 1 — Lesson 4: «تطابق المثلثات» (textbook pages 17–19).
 *
 * SOURCE FIDELITY
 * ---------------
 * Every source step below reproduces the supplied scans of pages 17, 18 and 19
 * verbatim and in printed order. Nothing is shortened, paraphrased or invented.
 * Angle notation keeps the source's hat convention (\widehat), never ∠.
 *
 * BIDI NOTE ON PRINTED TRIANGLE PAIRS
 * -----------------------------------
 * Pages 18–19 name congruent pairs as LTR runs inside Arabic sentences
 * (e.g. «فالمثلثان EMF , AMB طبوقان»). Page 18 prints the pair with a Latin
 * comma inside one notation run, which we keep as a single math run so the
 * printed order can never be reordered by the bidi algorithm. Page 19 uses the
 * Arabic comma «،» between the two names; each name is isolated separately and
 * the pair order follows the scan's reading order.
 *
 * FIGURES
 * -------
 * All ten textbook figures of this lesson resolve to `reference` under the
 * agreed decision tree — see docs/LESSON-04-FIGURES.md for the per-figure
 * justification. Exact, platform-made interactive analogues appear only inside
 * explicitly badged «شرح المنصّة» steps (./lesson-04-teaching.ts).
 */
const PAGE_17 = 17;
const PAGE_18 = 18;
const PAGE_19 = 19;

export const lesson04: LessonInput = {
  id: 'lesson-04-triangle-congruence',
  title: 'تطابق المثلثات',
  source: { page: '17–19', locator: 'الدرس الرابع' },

  // The textbook prints no summary, objectives or vocabulary list for this
  // lesson. Those fields are intentionally left absent rather than invented.

  steps: [
    // ── شرح المنصّة (مُعدّ من المنصّة، ليس من الكتاب) ──
    teachingFromTranslationToCongruence,

    /* ============================== صفحة 17 — النشاط ============================== */
    {
      id: 'step-01-activity-congruence-from-translation',
      kicker: 'نشاط «اكتشاف حالات تطابق المثلثات انطلاقاً من الانسحاب»',
      title: 'حالات تطابق مثلثين',
      source: { page: PAGE_17, locator: 'نشاط' },
      blocks: [
        {
          type: 'figure',
          diagram: {
            kind: 'reference',
            id: 'fig-17-activity-translation-congruent',
            alt: 'شكل رباعي مرسوم بخط أزرق وصورته وفق انسحاب، بينهما خطوط متقطعة حمراء تصل النقاط المتناظرة؛ الشكل وصورته قابلان للانطباق.',
            caption: 'شكل النشاط: شكل وصورته وفق انسحاب، صفحة ١٧',
            source: { page: PAGE_17, locator: 'شكل النشاط' },
            reason:
              'رسم تخطيطي على ورقة بيضاء بلا قياسات أو إحداثيات؛ مواضع الرؤوس واتجاه الانسحاب غير محددة عددياً.',
          },
        },
        {
          type: 'callout',
          variant: 'hint',
          blocks: [
            {
              type: 'paragraph',
              text: 'وفق الانسحاب، أي شكل وصورته قابلان للانطباق، فصورة مثلث هي مثلث يطابقه.',
            },
          ],
        },
        { type: 'paragraph', text: '1. حالات تطابق مثلثين.' },
        {
          type: 'figure',
          diagram: {
            kind: 'reference',
            id: 'fig-17-three-partial-triangles',
            alt: 'ثلاثة أشكال مرقّمة ① و② و③: في الأول ضلعان من مثلث طولاهما $3$ و $4$ تحصر بينهما زاوية قياسها $35^\\circ$ رأسها $A$ مع النقطتين $B$ و $C$؛ وفي الثاني ضلع طوله $3$ بين زاويتين قياساهما $35^\\circ$ عند $A$ و $85^\\circ$ عند $C$؛ وفي الثالث مثلث $ABC$ أطوال أضلاعه $3$ و $2$ و $4$. وتحت كل شكل قطعة طرفاها $N$ و $M$.',
            caption: 'الأشكال ① و② و③ مع قطعة الانسحاب، صفحة ١٧',
            source: { page: PAGE_17, locator: 'الأشكال ① و② و③' },
            reason:
              'القياسات المطبوعة معلومة، لكن مواضع النقطتين $N$ و $M$ واتجاه كل شكل بالنسبة إليهما مرسومة بلا شبكة؛ وهي جزء لازم من إنشاء الصورة المطلوب.',
          },
        },
        {
          type: 'questionGroup',
          items: [
            {
              label: '1.',
              text: 'انقل الأشكال ① و ② و ③ إلى صفحة بيضاء. وفي كل حالة، ارسم صورة الشكل وفق الانسحاب الذي ينقل النقطة $N$ إلى النقطة $M$.',
            },
            {
              label: '2.',
              text: 'في كل من الحالتين ① و ② أكمل الشكل لتحصل على المثلث $ABC$ ثم أكمل صورة هذا المثلث.',
            },
            {
              label: '3.',
              text: 'في كل من الحالات ① و ② و ③ ما صورة المثلث $ABC$؟ ولماذا.',
            },
            {
              label: '4.',
              text: 'إذن هل يمكنك ذكر الحالات التي يمكن من خلالها أن تحصل على مثلث يطابق مثلثاً معلوماً؟',
            },
          ],
        },
      ],
    },

    /* ============================== صفحة 17 — تعلّم: تعريف ============================== */
    {
      id: 'step-02-definition',
      kicker: 'تعلّم',
      title: 'تعريف',
      source: { page: PAGE_17, locator: 'تعلّم — تعريف' },
      blocks: [
        {
          type: 'figure',
          diagram: {
            kind: 'reference',
            id: 'fig-17-definition-triangles',
            alt: 'مثلثان: المثلث $ABC$ والمثلث $A\\prime B\\prime C\\prime$ مرسومان جنباً إلى جنب في وضعين متشابهين.',
            caption: 'شكل التعريف، صفحة ١٧',
            source: { page: PAGE_17, locator: 'شكل التعريف' },
            reason:
              'رسم توضيحي بلا أي قياسات مطبوعة؛ لا يمكن التحقق من أطواله وزواياه من المسح المتاح.',
          },
        },
        {
          type: 'callout',
          variant: 'definition',
          title: 'تعريف',
          blocks: [
            {
              type: 'paragraph',
              text: 'يتطابق مثلثان إذا تساوت عناصر أحدهما مع العناصر المقابلة لها في المثلث الآخر.',
            },
          ],
        },
        {
          type: 'callout',
          variant: 'hint',
          blocks: [{ type: 'paragraph', text: 'عناصر المثلث هي أضلاعه وزواياه.' }],
        },
      ],
    },

    teachingElementsMatching,

    /* ==================== صفحة 17–18 — الحالة الأولى ومثالها ==================== */
    {
      id: 'step-03-case-one-two-sides-included-angle',
      kicker: 'حالات تطابق مثلثين',
      title: 'الحالة الأولى ومثالها',
      source: { page: '17–18', locator: 'حالات تطابق مثلثين — ①' },
      blocks: [
        {
          type: 'callout',
          variant: 'theorem',
          blocks: [
            {
              type: 'paragraph',
              text: '① يتطابق مثلثان في حال تساوي طولي ضلعين وقياس الزاوية المحصورة بينهما من المثلث الأول مع مقابلاتها في المثلث الآخر.',
            },
          ],
        },
        {
          type: 'figure',
          diagram: {
            kind: 'reference',
            id: 'fig-18-example-vertical-angles',
            alt: 'مثلثان متقابلان بالرأس عند النقطة $M$: المثلث $AMB$ فيه $AM = 5$ و $BM = 7$، والمثلث $EMF$ فيه $ME = 5$ و $MF = 7$، والنقاط $B$ و $M$ و $F$ على استقامة واحدة وكذلك $A$ و $M$ و $E$.',
            caption: 'شكل مثال الحالة الأولى، صفحة ١٨',
            source: { page: PAGE_18, locator: 'مثال — شكل التقابل بالرأس' },
            reason:
              'الأطوال $5$ و $7$ مطبوعة، لكن قياس الزاوية عند $M$ وميل المستقيمين غير مطبوعين؛ إعادة الرسم تعني تخمين ما لم يطبع.',
          },
        },
        {
          type: 'callout',
          variant: 'example',
          title: 'مثال',
          blocks: [
            { type: 'paragraph', text: 'في الشكل المجاور:' },
            {
              type: 'paragraph',
              text: 'نلاحظ أن $\\widehat{EMF} = \\widehat{AMB}$ للتقابل بالرأس',
            },
            { type: 'paragraph', text: 'وكذلك $AM = ME = 5$ و $BM = MF = 7$' },
            {
              type: 'paragraph',
              text: 'فالمثلثان $EMF , AMB$ طبوقان لتساوي طولي ضلعين وقياس الزاوية المحصورة بينهما من المثلث الأول مع مقابلاتها في المثلث الآخر.',
            },
          ],
        },
      ],
    },

    /* ==================== صفحة 18 — الحالة الثانية ومثالها ==================== */
    {
      id: 'step-04-case-two-side-adjacent-angles',
      kicker: 'حالات تطابق مثلثين',
      title: 'الحالة الثانية ومثالها',
      source: { page: PAGE_18, locator: 'حالات تطابق مثلثين — ②' },
      blocks: [
        {
          type: 'callout',
          variant: 'theorem',
          blocks: [
            {
              type: 'paragraph',
              text: '② يتطابق مثلثان في حال تساوي طول ضلع وقياسي الزاويتين المجاورتين لها من المثلث الأول مع مقابلاتها في المثلث الآخر.',
            },
          ],
        },
        {
          type: 'figure',
          diagram: {
            kind: 'reference',
            id: 'fig-18-example-parallelogram-rectangle',
            alt: 'متوازي الأضلاع $AECF$ والمستطيل $ABCD$ داخله: النقطة $B$ على $[AE]$ والنقطة $D$ على $[CF]$، مع القطعتين $[AF]$ و $[EC]$ والقطعة $[BD]$.',
            caption: 'شكل مثال الحالة الثانية، صفحة ١٨',
            source: { page: PAGE_18, locator: 'مثال — متوازي الأضلاع والمستطيل' },
            reason:
              'الشكل لا يطبع أي أطوال أو زوايا؛ العلاقات المذكورة نصية ولا توجد قياسات تسمح بإعادة بناء المواضع بدقة.',
          },
        },
        {
          type: 'callout',
          variant: 'example',
          title: 'مثال',
          blocks: [
            { type: 'paragraph', text: '$AECF$ متوازي أضلاع و $ABCD$ مستطيل.' },
            {
              type: 'paragraph',
              text: '$AB = DC$ لتساوي كل ضلعين متقابلتين في المستطيل.',
            },
            {
              type: 'paragraph',
              text: '$FD = BE$ لأن كلاً منهما هو طول ضلع متوازي أضلاع مطروحاً منه طول ضلع مستطيل وهاتان الضلعان متقابلتان.',
            },
            {
              type: 'paragraph',
              text: '$\\widehat{F} = \\widehat{E}$ لتساوي كل زاويتين متقابلتين في متوازي أضلاع.',
            },
            {
              type: 'paragraph',
              text: 'وكذلك $\\widehat{CBE} = \\widehat{FDA} = 90^\\circ$. فالمثلثان $FDA , BEC$ طبوقان لتساوي طول ضلع وقياسي الزاويتين المجاورتين لها من المثلث الأول مع مقابلاتها في المثلث الآخر.',
            },
          ],
        },
      ],
    },

    /* ==================== صفحة 18 — الحالة الثالثة ومثالها ==================== */
    {
      id: 'step-05-case-three-three-sides',
      kicker: 'حالات تطابق مثلثين',
      title: 'الحالة الثالثة ومثالها',
      source: { page: PAGE_18, locator: 'حالات تطابق مثلثين — ③' },
      blocks: [
        {
          type: 'callout',
          variant: 'theorem',
          blocks: [
            {
              type: 'paragraph',
              text: '③ يتطابق مثلثان في حال تساوي أطوال أضلاع أحدهما مع مقابلاتها في المثلث الآخر.',
            },
          ],
        },
        {
          type: 'figure',
          diagram: {
            kind: 'reference',
            id: 'fig-18-example-parallelogram-diagonal',
            alt: 'متوازي الأضلاع $ABCD$ مرسوم فيه القطر $[AC]$ فيقسمه إلى المثلثين $ACB$ و $ACD$.',
            caption: 'شكل مثال الحالة الثالثة، صفحة ١٨',
            source: { page: PAGE_18, locator: 'مثال — متوازي الأضلاع والقطر' },
            reason:
              'رسم بلا أطوال أو زوايا مطبوعة؛ الخاصية نصية ولا يحتاج عرضها إلى تخمين أبعاد الشكل.',
          },
        },
        {
          type: 'callout',
          variant: 'example',
          title: 'مثال',
          blocks: [
            { type: 'paragraph', text: '$ABCD$ متوازي أضلاع.' },
            { type: 'paragraph', text: '$[AC]$ ضلع مشتركة للمثلثين $ACD , ACB$.' },
            {
              type: 'paragraph',
              text: 'وكذلك $AB = CD$ و $AD = BC$ لتساوي كل ضلعين متقابلتين في متوازي الأضلاع.',
            },
            {
              type: 'paragraph',
              text: 'فالمثلثان $ACD , ACB$ طبوقان لتساوي أطوال أضلاع المثلث الأول مع مقابلاتها في المثلث الآخر.',
            },
          ],
        },
      ],
    },

    teachingCasesLab,
    teachingProofWriting,

    /* ==================== صفحة 19 — تحقّق من فهمك ==================== */
    {
      id: 'step-06-check-understanding',
      kicker: 'تحقّق من فهمك',
      title: 'برهن أن المثلثين طبوقان',
      source: { page: PAGE_19, locator: 'تحقّق من فهمك' },
      blocks: [
        {
          type: 'figure',
          diagram: {
            kind: 'reference',
            id: 'fig-19-check-quadrilateral',
            alt: 'رباعي $ABCD$ فيه القطر $[BD]$، مع علامتي زاوية قائمة عند $A$ و $C$، وعلامات تساوي أطوال على أضلاع، وسهمين عند $D$ و $B$ يشيران إلى زاويتين قياس كل منهما $30^\\circ$.',
            caption: 'شكل «تحقّق من فهمك»، صفحة ١٩',
            source: { page: PAGE_19, locator: 'تحقّق من فهمك — الشكل' },
            reason:
              'المعطيات كلها علامات على الرسم (قوائم، تساوي أطوال، زاويتا $30^\\circ$)؛ لا توجد أطوال عددية كافية لإعادة البناء، والرسم التقريبي قد يضيف أو يسقط معطى من معطيات البرهان.',
          },
        },
        {
          type: 'questionGroup',
          items: [
            {
              text: 'في الشكل المجاور: باستعمال كلّ من حالات التطابق السابقة، برهن أن المثلثين طبوقان.',
            },
          ],
        },
      ],
    },

    teachingCongruenceChallenges,

    /* ==================== صفحة 19 — تدرّب ① ==================== */
    {
      id: 'step-07-practice-one-paper-kite',
      kicker: 'تدرّب ①',
      title: 'الطائرة الورقية',
      source: { page: PAGE_19, locator: 'تدرّب — ①' },
      blocks: [
        {
          type: 'figure',
          diagram: {
            kind: 'reference',
            id: 'fig-19-paper-kite',
            alt: 'صورة طائرة ورقية على هيئة رباعي $ABCD$ تتقاطع فيه العارضتان عند النقطة $E$، ومكتوب على أجزائها القياسات: $14.4$ على $[AB]$ و $[AD]$، و $10$ على $[BC]$ و $[CD]$، و $8$ على $[EB]$ و $[ED]$، و $12$ على $[AE]$، و $6$ على $[EC]$.',
            caption: 'الطائرة الورقية، صفحة ١٩',
            source: { page: PAGE_19, locator: 'تدرّب ① — صورة الطائرة الورقية' },
            reason:
              'الشكل صورة فوتوغرافية لطائرة ورقية حقيقية عليها القياسات؛ لا يجوز تقديم رسم بديل على أنه صورة الكتاب.',
          },
        },
        {
          type: 'questionGroup',
          items: [
            {
              label: '①',
              text: 'لاحظ الطائرة الورقية، هل يمكنك تحديد أزواج المثلثات الطبوقة في هذا الشكل.',
            },
          ],
        },
      ],
    },

    /* ==================== صفحة 19 — تدرّب ② ==================== */
    {
      id: 'step-08-practice-two-justify-congruence',
      kicker: 'تدرّب ②',
      title: 'علل تطابق المثلثين',
      source: { page: PAGE_19, locator: 'تدرّب — ②' },
      blocks: [
        {
          type: 'questionGroup',
          items: [
            {
              label: '②',
              text: 'في كلّ حالة، علل تطابق المثلثين',
            },
          ],
        },
        {
          type: 'figure',
          diagram: {
            kind: 'reference',
            id: 'fig-19-three-congruence-cases',
            alt: 'ثلاث حالات مرقّمة ① و② و③: في الأولى مثلثان أطوال أضلاع كل منهما $2$ و $3$ و $2.6$؛ وفي الثانية مثلثان في كل منهما ضلعان طولاهما $2$ و $4$ تحصر بينهما زاوية قياسها $80^\\circ$؛ وفي الثالثة مثلثان في كل منهما ضلع طوله $4$ بين زاويتين قياساهما $44^\\circ$ و $82^\\circ$.',
            caption: 'الحالات الثلاث للتمرين ②، صفحة ١٩',
            source: { page: PAGE_19, locator: 'تدرّب ② — الأشكال ① و② و③' },
            reason:
              'القياسات المكتوبة معلومة، لكن أوضاع المثلثات ودوراناتها في كل لوحة غير محددة؛ والمطلوب تعليل يقرأ العلامات من الرسم المطبوع نفسه.',
          },
        },
      ],
    },

    /* ==================== صفحة 19 — تدرّب ③ ==================== */
    {
      id: 'step-09-practice-three-isosceles',
      kicker: 'تدرّب ③',
      title: 'الشكل ذو الزاويتين المتساويتين',
      source: { page: PAGE_19, locator: 'تدرّب — ③' },
      blocks: [
        {
          type: 'paragraph',
          text: 'تأمّل الشكل المرسوم جانباً. فيه $\\widehat{B} = \\widehat{C}$ و $BM = MC$',
        },
        {
          type: 'figure',
          diagram: {
            kind: 'reference',
            id: 'fig-19-isosceles-configuration',
            alt: 'مثلث $ABC$ رأسه $A$ في الأعلى، والنقطة $M$ على $[BC]$ مع علامتي تساوٍ على $[BM]$ و $[MC]$، والنقطة $E$ على $[AB]$ والنقطة $F$ على $[AC]$ مع علامة زاوية قائمة عند كل من $E$ و $F$ للقطعتين $[ME]$ و $[MF]$، ونقطتين تعلّمان تساوي الزاويتين عند $B$ و $C$.',
            caption: 'شكل التمرين ③، صفحة ١٩',
            source: { page: PAGE_19, locator: 'تدرّب ③ — الشكل' },
            reason:
              'المعطيات علامات على رسم بلا قياسات عددية (تساوي زاويتين، تساوي قطعتين، تعامدان)؛ إعادة الرسم تتطلب اختيار أبعاد لم تطبع.',
          },
        },
        {
          type: 'questionGroup',
          items: [
            {
              label: '1-',
              text: 'أثبت أنّ المثلّثين $MFC$ ، $MEB$ طبوقان.',
            },
            {
              label: '2-',
              text: 'أثبت أنّ المثلّثين $MFA$ ، $MEA$ طبوقان.',
            },
            {
              label: '3-',
              text: 'استنتج صحة الخاصة "إذا تساوى قياسا زاويتين في مثلث كان المثلث متساوي الساقين".',
            },
            {
              label: '4-',
              text: 'استنتج أن $(AM)$ ارتفاع في المثلث $ABC$ وأن $(AM)$ منصف للزاوية $A$.',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'سوف تتعلم في الوحدة الثالثة خواص يتمتع بها الارتفاع المتعلق بالقاعدة في المثلث المتساوي الساقين.',
        },
      ],
    },

    /* ==================== صفحة 19 — تطابق مثلثين قائمين ==================== */
    {
      id: 'step-10-right-triangles-congruence',
      title: 'تطابق مثلثين قائمين',
      source: { page: PAGE_19, locator: 'ملاحظة تطابق المثلثين القائمين' },
      blocks: [
        {
          type: 'callout',
          variant: 'hint',
          title: 'يتطابق مثلثان قائمان في الحالتين الآتيتين:',
          blocks: [
            {
              type: 'list',
              ordered: false,
              items: [
                'إذا تساوى وتر وضلع قائمة من أحدهما مع وتر وضلع قائمة من الآخر.',
                'إذا تساوى وتر وزاوية حادة من أحدهما مع وتر وزاوية حادة من الآخر.',
              ],
            },
          ],
        },
      ],
    },

    teachingLessonFourRecap,
  ],
  assessment: lesson04Assessment,
  teacherResources: lesson04TeacherResources,
};
