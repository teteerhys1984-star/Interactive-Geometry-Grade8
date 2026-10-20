import type { TeacherResourcesInput } from '../schema';
import {
  fig19Isosceles,
  fig19Pairs,
  fig19Check,
  fig18Asa,
  fig18Sas,
  teacherActivityFigure,
  teacherCheckFigure,
  teacherIsoscelesFigure,
  teacherKiteFigure,
} from './lesson-04-figures';
import {
  L4_ACTIVITY_QUESTIONS,
  L4_CHECK_QUESTION,
  L4_PRACTICE_ONE,
  L4_PRACTICE_THREE_QUESTIONS,
  L4_PRACTICE_TWO,
} from './lesson-04-questions';

/**
 * ============================================================================
 *  الدرس الرابع — منطقة المعلّم
 * ============================================================================
 *
 *  The pages print NO answers. Every solution below is derived by this
 *  platform from the printed givens and the three congruence cases, and is
 *  labelled «حلول المعلم (مستنتجة من المنصّة)» by the Teacher Area.
 *
 *  One record per printed prompt — thirteen in all:
 *    صفحة 17: النشاط 1، 2، 3، 4                       (4)
 *    صفحة 19: تحقّق من فهمك                             (1)
 *    صفحة 19: تدرّب ①                                   (1)
 *    صفحة 19: تدرّب ② — الأشكال ① و② و③                (3)
 *    صفحة 19: تدرّب ③ — الأسئلة 1 و2 و3 و4               (4)
 *
 *  `lesson-04-coverage.test.ts` proves the match: it reads the printed prompts
 *  straight from the student steps and requires an identical `question` here.
 * ============================================================================
 */

const [activité1, activité2, activité3, activité4] = L4_ACTIVITY_QUESTIONS;
const [iso1, iso2, iso3, iso4] = L4_PRACTICE_THREE_QUESTIONS;

const note = 'الحل مستنتج من معطيات الكتاب المطبوعة، وليس إجابة مطبوعة.';

export const lesson04TeacherResources: TeacherResourcesInput = {
  notes: [
    {
      type: 'callout',
      variant: 'warning',
      title: 'صفة هذه الموارد',
      blocks: [
        {
          type: 'paragraph',
          text: 'الصفحات ١٧–١٩ لا تتضمّن أي إجابات مطبوعة. الحلول الآتية من إعداد المنصّة، مبنية على النص المطبوع وحالات التطابق الثلاث، وكل رسم إضافي فيها موسوم «توضيح من إعداد المنصّة».',
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'tip',
      title: 'ملاحظات تربوية',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'ابدأ كل برهان بمقابلة الرؤوس: $A \\leftrightarrow A\'$ و$B \\leftrightarrow B\'$ و$C \\leftrightarrow C\'$، ثم اشتق الأضلاع والزوايا المتقابلة.',
            'شدّد على «المحصورة» في الحالة الأولى و«المجاورتين» في الحالة الثانية؛ أكثر أخطاء الطلبة تأتي من هنا.',
            'علّم الطالب أن يذكر الحالة بالاسم قبل النتيجة، وأن يبرّر كل مساواة بمعطى أو بخاصية مطبوعة.',
            'في المثال الثاني، بيّن أن $FD$ و$BE$ ناتجتا طرح الطول نفسه من ضلعين متقابلين في متوازي الأضلاع، وهذا ما يجعل المساواة صحيحة.',
            'في التمرين ③، انتقل من التطابق إلى النتيجة: كل تطابق يعطي ضلعين متقابلين متساويين، ومنه يُبنى الاستنتاج.',
            'لا تسمح بالحكم من مظهر الرسم؛ الرسم في هذه الصفحات تخطيطي وليس مقياساً.',
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'خطأ شائع: الزاوية غير المحصورة',
      blocks: [
        {
          type: 'paragraph',
          text: 'إذا أُعطي ضلعان وزاوية غير محصورة بينهما، فقد ينشأ مثلثان مختلفان من المعطيات نفسها، فلا يصح الحكم بالتطابق. وكذلك الحال عند إعطاء الزوايا الثلاث فقط. اسأل الطالب دائماً: أين تقع الزاوية بالنسبة إلى الضلعين المعلومين؟',
        },
      ],
    },
    {
      type: 'teaching',
      variant: 'concept',
      title: 'زاوية على المستطيل: تحقّق حسابي',
      blocks: [
        {
          type: 'paragraph',
          text: 'في «تحقّق من فهمك» القطر $[BD]$ يصنع زاويتين متبادلتين داخلياً $\\widehat{ADB}$ و$\\widehat{CBD}$، وكلتاهما $30°$ كما في الشكل. لذلك $\\widehat{ABD} = 60°$ و$\\widehat{CDB} = 60°$، وهذا ما يجعل البرهان بالحالة الثانية ممكناً بالمقابلة $ABD \\leftrightarrow CDB$.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'note',
      title: 'تقرير الأشكال',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'أُعيد بناء كل أشكال الصفحات ١٧–١٩ أصلياً من قِيَمها المطبوعة (أطوال، زوايا، تعامد، تقابل بالرأس، أضلاع متوازي الأضلاع)، ولم يُقتطع أي شكل من المسح الضوئي؛ التفاصيل في docs/LESSON-04-FIGURES.md.',
            'شكل الطائرة الورقية: الأطوال المطبوعة متوافقة حسابياً: $6² + 8² = 10²$ بالضبط، و$12² + 8² = 208$ أي $\\sqrt{208} \\approx 14.42$، والمطبوع $14.4$ بعد التدوير إلى منزلة عشرية واحدة.',
            'الشكلان اللذان لا يحملان أي قياس (رسم الانسحاب في صفحة ١٧ وشكل التعريف) أُعيد رسمهما كرسمين تعليميين موسومين «رسم تعليمي من إعداد المنصّة»، لأن الصفحة لا تعطي مسافات يمكن التحقق منها.',
            'كل شكل داخل حلول المعلّم موسوم «توضيح من إعداد المنصّة» ولا يُنسب إلى الكتاب.',
          ],
        },
      ],
    },
  ],

  textbookSolutions: [
    /* ── صفحة 17 — النشاط ─────────────────────────────────────────────── */
    {
      id: 'l4-sol-p17-act-1',
      reference: 'صفحة 17 — النشاط — السؤال 1',
      question: activité1!.text,
      blocks: [
        {
          type: 'paragraph',
          text: 'الانسحاب الذي ينقل $N$ إلى $M$ ثابت في الحالات الثلاث؛ لذلك نطبّق على كل رأس الانتقال نفسه، ثم نصل صور الرؤوس بالترتيب الموافق.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'نقيس المتجهة $\\overrightarrow{NM}$ ونثبت طولها واتجاهها.',
            'نرسم من كل رأس $A$ و$B$ و$C$ قطعة موازية لـ$[NM]$ ومساوية لها بالاتجاه نفسه، فنحصل على $A′$ و$B′$ و$C′$.',
            'نصل $[A′B′]$ و$[B′C′]$ و$[C′A′]$، فتحصل على صورة الشكل.',
            'نتحقق: كل ضلع في الصورة يساوي مقابله في الأصل، وكل زاوية تساوي مقابلتها.',
          ],
        },
        {
          type: 'paragraph',
          text: 'في الحالة ① بعد إكمال المثلث نحصل على الصورة الآتية، والشكل يبيّن المسارات المتقطعة من كل رأس إلى صورته.',
        },
        { type: 'figure', diagram: teacherActivityFigure },
        { type: 'paragraph', text: note },
      ],
    },
    {
      id: 'l4-sol-p17-act-2',
      reference: 'صفحة 17 — النشاط — السؤال 2',
      question: activité2!.text,
      blocks: [
        {
          type: 'paragraph',
          text: 'إكمال الشكل يعني تحديد الرأس الثالث الذي تسمح به المعطيات، ثم وصل الأضلاع.',
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'في الحالة ①: المعطى هو الضلعان $[AB]$ و$[AC]$ والزاوية $\\widehat{BAC} = 35°$ بينهما؛ طرفا الضلعين معلومان، فيكفي وصل $B$ بـ$C$. ثم نطبق الانسحاب $N \\to M$ على الرؤوس الثلاثة.',
            'في الحالة ②: المعطى هو الضلع $[AC]$ والزاويتان $\\widehat{A} = 35°$ و$\\widehat{C} = 85°$؛ الشعاعان المرسومان عند $A$ و$C$ يتقاطعان في نقطة واحدة هي $B$، ونصلها بـ$A$ وبـ$C$، ثم نرسم الصورة.',
            'في الحالة ③: المثلث كامل أصلاً بأضلاع $4$ و$3$ و$2$؛ يبقى رسم الصورة فقط.',
          ],
        },
        {
          type: 'paragraph',
          text: 'وبما أن كل رأس ينتقل بالمتجهة نفسها، فإن الصورة مثلث يطابق الأصل في الحالات الثلاث.',
        },
        { type: 'paragraph', text: note },
      ],
    },
    {
      id: 'l4-sol-p17-act-3',
      reference: 'صفحة 17 — النشاط — السؤال 3',
      question: activité3!.text,
      blocks: [
        {
          type: 'paragraph',
          text: 'صورة المثلث $ABC$ في الحالات الثلاث هي مثلث يطابق $ABC$، والسبب واحد: الانسحاب يحافظ على الأطوال وقياسات الزوايا.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'كل رأس وصورته تفصل بينهما المسافة نفسها وفي الاتجاه نفسه؛ فالضلع $[A′B′]$ يساوي $[AB]$ لأن طرفيه انتقلا بالحركة نفسها.',
            'الزاوية $\\widehat{B′A′C′}$ تساوي $\\widehat{BAC}$ لأن كلا الضلعين انتقل دون تغيّر اتجاهه النسبي.',
            'إذن تساوت العناصر الثلاثة (ضلعان وزاوية محصورة) بين الأصل والصورة، فالمثلثان متطابقان.',
          ],
        },
        { type: 'paragraph', text: note },
      ],
    },
    {
      id: 'l4-sol-p17-act-4',
      reference: 'صفحة 17 — النشاط — السؤال 4',
      question: activité4!.text,
      blocks: [
        {
          type: 'paragraph',
          text: 'نعم؛ الحالات التي تكفي للحصول على مثلث يطابق مثلثاً معلوماً هي:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'تساوي طولي ضلعين وقياس الزاوية المحصورة بينهما، مع مقابلاتها في المثلث الآخر.',
            'تساوي طول ضلع وقياسي الزاويتين المجاورتين له، مع مقابلاتها في المثلث الآخر.',
            'تساوي أطوال الأضلاع الثلاثة مع مقابلاتها في المثلث الآخر.',
          ],
        },
        {
          type: 'paragraph',
          text: 'وفي المثلثين القائمين خاصةً: تساوي الوتر وضلع قائمة، أو تساوي الوتر وزاوية حادة. وما عدا ذلك (ثلاث زوايا فقط، أو ضلعان وزاوية غير محصورة) لا يكفي.',
        },
        { type: 'paragraph', text: note },
      ],
    },

    /* ── صفحة 19 — تحقّق من فهمك ──────────────────────────────────────── */
    {
      id: 'l4-sol-p19-check',
      reference: 'صفحة 19 — تحقّق من فهمك',
      question: L4_CHECK_QUESTION,
      blocks: [
        {
          type: 'paragraph',
          text: 'المطلوب إثبات تطابق المثلثين $ABD$ و$CDB$، والمقابلة فيهما هي $A \\leftrightarrow C$ و$B \\leftrightarrow D$ و$D \\leftrightarrow B$. ويمكن البرهنة بكل حالة من الحالات الثلاث.',
        },
        { type: 'figure', diagram: teacherCheckFigure },
        {
          type: 'teaching',
          variant: 'example',
          title: 'الطريقة الأولى — ضلعان والزاوية المحصورة',
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                '$AB = DC$ لأن كل ضلعين متقابلين في المستطيل متساويان.',
                '$AD = BC$ للسبب نفسه.',
                '$\\widehat{DAB} = \\widehat{BCD} = 90°$ لأن زوايا المستطيل قائمة، وهما محصورتان بين الضلعين المذكورين.',
                'إذن $ABD \\cong CDB$ بحالة ضلعين والزاوية المحصورة بينهما.',
              ],
            },
          ],
        },
        {
          type: 'teaching',
          variant: 'example',
          title: 'الطريقة الثانية — ضلع وزاويتان مجاورتان',
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                'الضلع $[BD]$ مشترك بين المثلثين.',
                '$\\widehat{ADB} = \\widehat{CBD} = 30°$ لأنهما زاويتان متبادلتان داخلياً بين المتوازيين $AD$ و$BC$.',
                'وبما أن $\\widehat{DAB} = 90°$ فإن $\\widehat{ABD} = 60°$؛ وبالمثل $\\widehat{CDB} = 60°$.',
                'إذن $ABD \\cong CDB$ بحالة ضلع والزاويتين المجاورتين له.',
              ],
            },
          ],
        },
        {
          type: 'teaching',
          variant: 'example',
          title: 'الطريقة الثالثة — الأضلاع الثلاثة',
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                '$AB = DC$ و$AD = BC$ لتساوي الأضلاع المتقابلة في المستطيل.',
                '$BD$ ضلع مشتركة.',
                'إذن $ABD \\cong CDB$ بحالة الأضلاع الثلاثة.',
              ],
            },
          ],
        },
        { type: 'paragraph', text: note },
      ],
    },

    /* ── صفحة 19 — تدرّب ① ────────────────────────────────────────────── */
    {
      id: 'l4-sol-p19-practice-1',
      reference: 'صفحة 19 — تدرّب — ①',
      question: L4_PRACTICE_ONE,
      blocks: [
        {
          type: 'paragraph',
          text: 'القطران $[AC]$ و$[BD]$ يتقاطعان في $E$ بزاوية قائمة، و$E$ منتصف $[BD]$ لأن $BE = ED = 8$. ومن الأطوال المطبوعة: $AB = AD = 14.4$ و$BC = CD = 10$ و$AE = 12$ و$CE = 6$.',
        },
        { type: 'figure', diagram: teacherKiteFigure },
        {
          type: 'list',
          ordered: true,
          items: [
            '$ABE \\cong ADE$: الضلع $[AE]$ مشترك، و$BE = ED$، والزاوية عند $E$ قائمة في المثلثين؛ فهما متطابقان بحالة ضلعين والزاوية المحصورة.',
            '$BCE \\cong CDE$: الضلع $[CE]$ مشترك، و$BE = ED$، والزاوية عند $E$ قائمة؛ وهما متطابقان للسبب نفسه.',
            '$ABC \\cong ADC$: $AB = AD$ و$BC = CD$ والضلع $[AC]$ مشترك؛ فالتطابق بحالة الأضلاع الثلاثة.',
          ],
        },
        {
          type: 'paragraph',
          text: 'هذه الأزواج الثلاثة هي وحدها الممكنة؛ فمثلاً $ABE$ و$BCE$ لا يتطابقان لأن الوترين مختلفان ($AB \\approx 14.4$ و$BC = 10$).',
        },
        {
          type: 'paragraph',
          text: 'تحقّق حسابي من الأطوال المطبوعة: $CE² + BE² = 6² + 8² = 100 = BC²$، و$AE² + BE² = 12² + 8² = 208$ أي $AB = \\sqrt{208} \\approx 14.42$، والمطبوع $14.4$ بعد التدوير إلى منزلة عشرية واحدة.',
        },
        { type: 'paragraph', text: note },
      ],
    },

    /* ── صفحة 19 — تدرّب ② ────────────────────────────────────────────── */
    {
      id: 'l4-sol-p19-practice-2a',
      reference: 'صفحة 19 — تدرّب — ② — الشكل ①',
      question: L4_PRACTICE_TWO,
      blocks: [
        { type: 'figure', diagram: fig19Pairs },
        {
          type: 'paragraph',
          text: 'الشكل ①: المثلثان يحملان الأطوال نفسها $2$ و$3$ و$2.6$، أي إن كل ضلع في أحدهما يساوي مقابله في الآخر.',
        },
        {
          type: 'paragraph',
          text: 'إذن يتطابق المثلثان بحالة تساوي أطوال الأضلاع الثلاثة مع مقابلاتها.',
        },
        { type: 'paragraph', text: note },
      ],
    },
    {
      id: 'l4-sol-p19-practice-2b',
      reference: 'صفحة 19 — تدرّب — ② — الشكل ②',
      question: L4_PRACTICE_TWO,
      blocks: [
        { type: 'figure', diagram: fig19Pairs },
        {
          type: 'paragraph',
          text: 'الشكل ②: في كل مثلث ضلعان طولهما $2$ و$4$، والزاوية بينهما $80°$؛ أي إن الزاوية محصورة بين الضلعين المعلومين.',
        },
        {
          type: 'paragraph',
          text: 'إذن يتطابق المثلثان بحالة تساوي طولي ضلعين وقياس الزاوية المحصورة بينهما.',
        },
        {
          type: 'paragraph',
          text: 'تحقّق: الضلع الثالث محدد بالمعطيات نفسها $(c² = 2² + 4² - 2 \\times 2 \\times 4 \\times \\cos 80°) \\approx 4.15$، فهو ليس معطى مستقلاً بل نتيجة.',
        },
        { type: 'paragraph', text: note },
      ],
    },
    {
      id: 'l4-sol-p19-practice-2c',
      reference: 'صفحة 19 — تدرّب — ② — الشكل ③',
      question: L4_PRACTICE_TWO,
      blocks: [
        { type: 'figure', diagram: fig19Pairs },
        {
          type: 'paragraph',
          text: 'الشكل ③: الضلع المعلوم طوله $4$، والزاويتان المجاورتان له $44°$ و$82°$ في كل مثلث. الزاوية الثالثة نتيجة: $180° - 44° - 82° = 54°$.',
        },
        {
          type: 'paragraph',
          text: 'إذن يتطابق المثلثان بحالة تساوي طول ضلع وقياسي الزاويتين المجاورتين له.',
        },
        { type: 'paragraph', text: note },
      ],
    },

    /* ── صفحة 19 — تدرّب ③ ────────────────────────────────────────────── */
    {
      id: 'l4-sol-p19-practice-3-1',
      reference: 'صفحة 19 — تدرّب — ③ — 1',
      question: iso1!.text,
      blocks: [
        { type: 'figure', diagram: teacherIsoscelesFigure },
        {
          type: 'list',
          ordered: true,
          items: [
            '$\\widehat{MEB} = \\widehat{MFC} = 90°$ لأن $ME \\perp (AB)$ و$MF \\perp (AC)$.',
            '$\\widehat{MBE} = \\widehat{MCF}$ لأن $\\widehat{B} = \\widehat{C}$ معطى في المثلث $ABC$.',
            '$BM = MC$ معطى، وهو الضلع المشترك بين الزاويتين المذكورتين.',
            'إذن $MEB \\cong MFC$ بحالة تساوي طول ضلع وقياسي الزاويتين المجاورتين له.',
          ],
        },
        {
          type: 'paragraph',
          text: 'نتيجة مفيدة للخطوات التالية: من التطابق نحصل على $ME = MF$.',
        },
        { type: 'paragraph', text: note },
      ],
    },
    {
      id: 'l4-sol-p19-practice-3-2',
      reference: 'صفحة 19 — تدرّب — ③ — 2',
      question: iso2!.text,
      blocks: [
        { type: 'figure', diagram: teacherIsoscelesFigure },
        {
          type: 'list',
          ordered: true,
          items: [
            'المثلثان $MEA$ و$MFA$ قائمان في $E$ و$F$ على الترتيب.',
            'الوتر $[MA]$ مشترك بين المثلثين.',
            'الضلع $ME = MF$ من تطابق $MEB$ و$MFC$ في السؤال السابق.',
            'إذن $MEA \\cong MFA$ بحالة تطابق المثلثين القائمين: تساوي الوتر وضلع قائمة.',
          ],
        },
        {
          type: 'paragraph',
          text: 'نتيجتان للخطوة التالية: $AE = AF$، و$\\widehat{EAM} = \\widehat{MAF}$.',
        },
        { type: 'paragraph', text: note },
      ],
    },
    {
      id: 'l4-sol-p19-practice-3-3',
      reference: 'صفحة 19 — تدرّب — ③ — 3',
      question: iso3!.text,
      blocks: [
        {
          type: 'paragraph',
          text: 'نستنتج من التطابقين السابقين أن $AE = AF$ و$EB = FC$. وبما أن $E$ على $[AB]$ و$F$ على $[AC]$ فإن:',
        },
        { type: 'math', latex: 'AB = AE + EB = AF + FC = AC' },
        {
          type: 'paragraph',
          text: 'إذن للمثلث $ABC$ ضلعان متساويان، فهو مثلث متساوي الساقين. وبهذا صحّت الخاصة: إذا تساوى قياسا زاويتين في مثلث كان المثلث متساوي الساقين.',
        },
        { type: 'paragraph', text: note },
      ],
    },
    {
      id: 'l4-sol-p19-practice-3-4',
      reference: 'صفحة 19 — تدرّب — ③ — 4',
      question: iso4!.text,
      blocks: [
        { type: 'figure', diagram: fig19Isosceles },
        {
          type: 'paragraph',
          text: 'أولاً: $(AM)$ منصّف للزاوية $A$. من تطابق $MEA$ و$MFA$ نجد $\\widehat{EAM} = \\widehat{MAF}$؛ وبما أن $E$ على $[AB]$ و$F$ على $[AC]$ فإن $\\widehat{BAM} = \\widehat{MAC}$.',
        },
        {
          type: 'paragraph',
          text: 'ثانياً: $(AM)$ ارتفاع. لدينا $BM = MC$، والضلع $[AM]$ مشترك، و$AB = AC$ من السؤال السابق؛ إذن $ABM \\cong ACM$ بحالة الأضلاع الثلاثة.',
        },
        {
          type: 'paragraph',
          text: 'ينتج من ذلك $\\widehat{AMB} = \\widehat{AMC}$، وهما زاويتان متجاورتان على المستقيم $[BC]$ ومجموعهما $180°$؛ فكل منهما $90°$، أي إن $(AM) \\perp (BC)$، فـ$(AM)$ ارتفاع في المثلث $ABC$.',
        },
        { type: 'paragraph', text: note },
      ],
    },
  ],
};

/** Re-exported for the coverage test: the two example figures are printed ones. */
export const lesson04TeacherExampleFigures = { fig18Sas, fig18Asa, fig19Check };
