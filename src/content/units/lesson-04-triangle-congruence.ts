import type { LessonInput } from '../schema';
import { lesson04Assessment } from './lesson-04-assessment';
import { lesson04TeacherResources } from './lesson-04-teacher';
import {
  teachingCases,
  teachingCongruenceIntro,
  teachingProof,
  teachingRecap,
} from './lesson-04-teaching';
const ref = (
  id: string,
  page: number,
  locator: string,
  alt: string,
  reason = 'الشكل تخطيطي مطبوع بلا إحداثيات أو مقياس رسم كامل؛ إبقاؤه مرجعياً يمنع تخمين المواضع والزوايا.',
) => ({
  type: 'figure' as const,
  diagram: {
    kind: 'reference' as const,
    id,
    alt,
    caption: `${locator}، صفحة ${page}`,
    source: { page, locator },
    reason,
  },
});
export const lesson04: LessonInput = {
  id: 'lesson-04-triangle-congruence',
  title: 'تطابق المثلثات',
  source: { page: '17–19', locator: 'الدرس الرابع' },
  steps: [
    teachingCongruenceIntro,
    {
      id: 'l4-step-01-activity',
      kicker: 'نشاط « اكتشاف حالات تطابق المثلثات انطلاقاً من الانسحاب »',
      title: 'حالات تطابق مثلثين',
      source: { page: 17, locator: 'نشاط — 1 إلى 4' },
      blocks: [
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
        ref(
          'fig-17-activity-translation',
          17,
          'رسم التمهيد',
          'مثلث وصورته وفق انسحاب، مع خطوط متقطعة تبيّن انتقال الرؤوس.',
        ),
        ref(
          'fig-17-three-cases',
          17,
          'الأشكال ① و② و③',
          'ثلاثة أشكال لبناء المثلث $ABC$: في ① ضلعان $3$ و$4$ وزاوية $35^\\circ$، وفي ② ضلع $3$ وزاويتان $35^\\circ$ و$85^\\circ$، وفي ③ أضلاع $3$ و$2$ و$4$، ومع كل شكل النقطتان $N$ و$M$.',
        ),
        {
          type: 'questionGroup',
          items: [
            {
              label: '1.',
              text: 'انقل الأشكال ① و ② و ③ إلى صفحة بيضاء، وفي كل حالة، ارسم صورة الشكل وفق الانسحاب الذي ينقل النقطة $N$ إلى النقطة $M$.',
            },
            {
              label: '2.',
              text: 'في كل من الحالتين ① و ② أكمل الشكل لتحصل على المثلث $ABC$ ثم أكمل صورة هذا المثلث.',
            },
            { label: '3.', text: 'ما صورة المثلث $ABC$ في كل من الحالات ① و ② و ③؟ ولماذا؟' },
            {
              label: '4.',
              text: 'إذن هل يمكنك ذكر الحالات التي يمكن من خلالها أن نحصل على مثلث يطابق مثلثاً معلوماً؟',
            },
          ],
        },
      ],
    },
    {
      id: 'l4-step-02-definition',
      kicker: 'تعلّم — تعريف',
      title: 'تعريف تطابق مثلثين',
      source: { page: 17, locator: 'تعلّم — تعريف' },
      blocks: [
        ref(
          'fig-17-corresponding-triangles',
          17,
          'شكل التعريف',
          'المثلث $ABC$ والمثلث $A\\prime B\\prime C\\prime$ مع بيان الرؤوس والعناصر المتقابلة.',
        ),
        {
          type: 'callout',
          variant: 'definition',
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
    teachingCases,
    {
      id: 'l4-step-03-case-one',
      kicker: 'حالات تطابق مثلثين',
      title: 'الحالة الأولى: ضلعان والزاوية المحصورة',
      source: { page: 17, locator: 'حالات تطابق مثلثين — ①' },
      blocks: [
        {
          type: 'paragraph',
          text: '① يتطابق مثلثان في حال تساوي طولي ضلعين وقياس الزاوية المحصورة بينهما من المثلث الأول مع مقابلاتها في المثلث الآخر.',
        },
      ],
    },
    {
      id: 'l4-step-04-example-one',
      kicker: 'مثال',
      title: 'تطبيق الحالة الأولى',
      source: { page: 18, locator: 'المثال الأول' },
      blocks: [
        ref(
          'fig-18-sas-example',
          18,
          'شكل المثال الأول',
          'مثلثا $AMB$ و$EMF$؛ فيهما $AM=ME=5$ و$BM=MF=7$، والزاويتان $\\widehat{AMB}$ و$\\widehat{EMF}$ متقابلتان بالرأس.',
        ),
        { type: 'paragraph', text: 'في الشكل المجاور:' },
        { type: 'paragraph', text: 'نلاحظ أن: $\\widehat{EMF} = \\widehat{AMB}$ للتقابل بالرأس.' },
        { type: 'paragraph', text: 'وكذلك $AM = ME = 5$ و $BM = MF = 7$.' },
        {
          type: 'paragraph',
          text: 'فالمثلثان $AMB$، $EMF$ طبوقان لتساوي طولي ضلعين وقياس الزاوية المحصورة بينهما من المثلث الأول مع مقابلاتها في المثلث الآخر.',
        },
      ],
    },
    {
      id: 'l4-step-05-case-two',
      kicker: 'حالات تطابق مثلثين',
      title: 'الحالة الثانية: ضلع وزاويتان مجاورتان',
      source: { page: 18, locator: 'حالات تطابق مثلثين — ②' },
      blocks: [
        {
          type: 'paragraph',
          text: '② يتطابق مثلثان في حال تساوي طول ضلع وقياسي الزاويتين المجاورتين لها من المثلث الأول مع مقابلاتها في المثلث الآخر.',
        },
      ],
    },
    {
      id: 'l4-step-06-example-two',
      kicker: 'مثال',
      title: 'تطبيق الحالة الثانية',
      source: { page: 18, locator: 'المثال الثاني' },
      blocks: [
        ref(
          'fig-18-asa-example',
          18,
          'شكل المثال الثاني',
          'متوازي الأضلاع $AECF$ والمستطيل $ABCD$ والقطعتان $AC$ و$BD$، لاستخراج تطابق المثلثين $BEC$ و$FDA$.',
        ),
        { type: 'paragraph', text: '$AECF$ متوازي أضلاع و $ABCD$ مستطيل.' },
        { type: 'paragraph', text: '$AB = DC$ لتساوي كل ضلعين متقابلين في المستطيل.' },
        {
          type: 'paragraph',
          text: '$FD = BE$ لأن كلاً منهما هو طول ضلع متوازي أضلاع مطروحاً منه طول ضلع مستطيل وهاتان الضلعان متقابلان.',
        },
        {
          type: 'paragraph',
          text: '$\\widehat{F} = \\widehat{E}$ لتساوي كل زاويتين متقابلتين في متوازي أضلاع.',
        },
        { type: 'paragraph', text: 'وكذلك $\\widehat{CBE} = \\widehat{FDA} = 90^\\circ$.' },
        {
          type: 'paragraph',
          text: 'فالمثلثان $BEC$، $FDA$ طبوقان لتساوي طول ضلع وقياسي الزاويتين المجاورتين لها من المثلث الأول مع مقابلاتها في المثلث الآخر.',
        },
      ],
    },
    {
      id: 'l4-step-07-case-three',
      kicker: 'حالات تطابق مثلثين',
      title: 'الحالة الثالثة: الأضلاع الثلاثة',
      source: { page: 18, locator: 'حالات تطابق مثلثين — ③' },
      blocks: [
        {
          type: 'paragraph',
          text: '③ يتطابق مثلثان في حال تساوي أطوال أضلاع أحدهما مع مقابلاتها في المثلث الآخر.',
        },
      ],
    },
    {
      id: 'l4-step-08-example-three',
      kicker: 'مثال',
      title: 'تطبيق الحالة الثالثة',
      source: { page: 18, locator: 'المثال الثالث' },
      blocks: [
        ref(
          'fig-18-sss-example',
          18,
          'شكل المثال الثالث',
          'متوازي الأضلاع $ABCD$ وقطره $AC$ الذي يقسمه إلى المثلثين $ACB$ و$ACD$.',
        ),
        { type: 'paragraph', text: '$ABCD$ متوازي أضلاع.' },
        { type: 'paragraph', text: '$[AC]$ ضلع مشتركة للمثلثين $ACB$، $ACD$.' },
        {
          type: 'paragraph',
          text: 'وكذلك $AB = CD$ و $AD = BC$ لتساوي كل ضلعين متقابلين في متوازي الأضلاع.',
        },
        {
          type: 'paragraph',
          text: 'فالمثلثان $ACB$، $ACD$ طبوقان لتساوي أطوال أضلاع المثلث الأول مع مقابلاتها في المثلث الآخر.',
        },
      ],
    },
    teachingProof,
    {
      id: 'l4-step-09-check',
      kicker: 'تحقّق من فهمك',
      title: 'برهن أن المثلثين طبوقان',
      source: { page: 19, locator: 'تحقّق من فهمك' },
      blocks: [
        ref(
          'fig-19-check-rectangle',
          19,
          'شكل تحقّق من فهمك',
          'مستطيل $ABCD$ قطره $BD$، مع علامات $AB=DC$ و$AD=BC$ وزاويتين مقدار كل منهما $30^\\circ$ وزاويتين قائمتين.',
        ),
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
    {
      id: 'l4-step-10-practice-one-two',
      kicker: 'تدرّب',
      title: 'الطائرة الورقية وحالات التطابق',
      source: { page: 19, locator: 'تدرّب — ① و②' },
      blocks: [
        ref(
          'fig-19-kite',
          19,
          'الطائرة الورقية',
          'طائرة ورقية مقسمة إلى مثلثات؛ تظهر الأطوال $14.4$ و$10$ و$12$ و$8$ و$6$ حول النقاط $A,B,C,D,E$.',
        ),
        {
          type: 'questionGroup',
          items: [
            {
              label: '①',
              text: 'لاحظ الطائرة الورقية، هل يمكنك تحديد أزواج المثلثات الطبوقة في هذا الشكل.',
            },
          ],
        },
        ref(
          'fig-19-three-congruence-pairs',
          19,
          'أشكال التمرين ②',
          'ثلاثة أزواج من المثلثات: ① أطوال $2$ و$3$ و$2.6$، و② ضلعان $2$ و$4$ وزاوية $80^\\circ$، و③ زاويتان $44^\\circ$ و$82^\\circ$ وضلع $4$.',
        ),
        { type: 'questionGroup', items: [{ label: '②', text: 'في كل حالة، علل تطابق المثلثين' }] },
      ],
    },
    {
      id: 'l4-step-11-practice-proof',
      kicker: 'تدرّب ③',
      title: 'برهان في مثلث متساوي الساقين',
      source: { page: 19, locator: 'تدرّب — ③' },
      blocks: [
        ref(
          'fig-19-isosceles-proof',
          19,
          'شكل التمرين ③',
          'مثلث $ABC$ فيه $BM=MC$ و$\\widehat{B}=\\widehat{C}$، والنقطة $M$ على $BC$، و$ME$ عمودي على $AB$ و$MF$ عمودي على $AC$.',
        ),
        {
          type: 'paragraph',
          text: 'تأمل الشكل المرسوم جانباً. فيه $\\widehat{B} = \\widehat{C}$ و $BM = MC$.',
        },
        {
          type: 'questionGroup',
          items: [
            { label: '1-', text: 'أثبت أن المثلثين $MEB$، $MFC$ طبوقان.' },
            { label: '2-', text: 'أثبت أن المثلثين $MEA$، $MFA$ طبوقان.' },
            {
              label: '3-',
              text: 'استنتج صحة الخاصة: ”إذا تساوى قياسا زاويتين في مثلث كان المثلث متساوي الساقين“.',
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
    {
      id: 'l4-step-12-right-triangles',
      kicker: 'ملاحظة',
      title: 'تطابق مثلثين قائمين',
      source: { page: 19, locator: 'الملاحظة الختامية' },
      blocks: [
        {
          type: 'callout',
          variant: 'hint',
          blocks: [
            { type: 'paragraph', text: 'يتطابق مثلثان قائمان في الحالتين الآتيتين:' },
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
    teachingRecap,
  ],
  assessment: lesson04Assessment,
  teacherResources: lesson04TeacherResources,
};
