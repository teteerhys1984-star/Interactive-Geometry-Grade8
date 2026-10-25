import { TEST_FIGURE_RENDERER } from '@/components/diagram/renderers/testFigureSpec';
import type { SchoolWorksheetInput } from '../schema';

/**
 * ============================================================================
 *  ورقة عمل الوحدة الأولى هندسة — الصف الثامن (آفاق المستقبل)
 * ============================================================================
 *
 *  Transcribed faithfully from the two supplied worksheet page scans:
 *    - Page 1 (`worksheets/unit-01-worksheet-01/page-1.jpg`):
 *        • السؤال الأول : اختر الإجابة الصحيحة لكل مما يلي (12 فقرة، خيارات A/B/C)
 *        • السؤال الثاني : أجب بموافق أو غير موافق معللاً عدم موافقتك (7 فقرات)
 *        • السؤال الثالث : املأ الفراغات التالية بما يناسبها (6 فقرات)
 *    - Page 2 (`worksheets/unit-01-worksheet-01/page-2.jpg`):
 *        • السؤال الرابع : حل كل من المسائل الآتية (3 مسائل هندسية مع أشكالها)
 *        • تذييل الصفحة: "== انتهت الأسئلة =="
 *
 *  Source fidelity rules applied:
 *    - Original wording, spelling, punctuation, and numbering are preserved.
 *    - All mathematical and geometric symbols are isolated in `$…$`.
 *    - No fabricated answer key is attached (the scans print questions only).
 * ============================================================================
 */
export const unit01Worksheet01: SchoolWorksheetInput = {
  id: 'unit-01-worksheet-01',
  title: 'ورقة عمل الوحدة الأولى هندسة',
  gradeLabel: 'الصف الثامن',
  institutionLabel: 'آفاق المستقبل',
  summary:
    'ورقة عمل مدرسية من صفحتين تغطي موضوعات الوحدة الأولى في الهندسة (الانسحاب وخواصه، متوازي الأضلاع والمستطيل والمعين والمربع، وتطابق المثلثات) عبر أربعة أسئلة رئيسية ورسومها الهندسية.',
  pages: [
    {
      pageNumber: 1,
      title: 'الصفحة الأولى — الأسئلة الأول والثاني والثالث',
      originalImage: {
        src: 'worksheets/unit-01-worksheet-01/page-1.jpg',
        alt: 'الصورة الأصلية للصفحة الأولى من ورقة عمل الوحدة الأولى هندسة للصف الثامن (آفاق المستقبل)، وتضم السؤال الأول (12 فقرة اختيار من متعدد)، والسؤال الثاني (7 فقرات موافق أو غير موافق مع التعليل)، والسؤال الثالث (6 فقرات إملاء فراغات).',
        caption: 'نسخة الصفحة الأولى الأصلية كما وردت في ورقة العمل المدرسية.',
      },
      questionGroups: [
        {
          id: 'ws01-q1',
          kind: 'multiple-choice',
          title: 'السؤال الأول : اختر الإجابة الصحيحة لكل مما يلي :',
          items: [
            {
              id: 'ws01-q1-01',
              number: '1',
              prompt: 'شكل رباعي قطراه متناصفان و متساويان بالطول',
              options: [
                { id: 'A', text: 'مستطيل' },
                { id: 'B', text: 'معين' },
                { id: 'C', text: 'متوازي أضلاع' },
              ],
            },
            {
              id: 'ws01-q1-02',
              number: '2',
              prompt: "الدائرة $C'$ صورة الدائرة $C$ وفق انسحاب عندئذ لهما :",
              options: [
                { id: 'A', text: 'نصف القطر ذاته' },
                { id: 'B', text: 'المركز نفسه' },
                { id: 'C', text: 'نصفي قطرين غير متساويين' },
              ],
            },
            {
              id: 'ws01-q1-03',
              number: '3',
              prompt:
                'النقطة $P$ غير واقعة على المستقيم $(RS)$ ، النقطة $Q$ صورة النقطة $P$ وفق الانسحاب من $R$ إلى $S$ عندئذ :',
              options: [
                { id: 'A', text: '$RSPQ$ متوازي أضلاع' },
                { id: 'B', text: '$PQRS$ متوازي أضلاع' },
                { id: 'C', text: '$RSQP$ متوازي أضلاع' },
              ],
            },
            {
              id: 'ws01-q1-04',
              number: '4',
              prompt: 'صورة مثلث قائم وفق انسحاب هي :',
              options: [
                { id: 'A', text: 'مثلث ليس بالضرورة قائم' },
                { id: 'B', text: 'مثلث قائم و متساوي الساقين' },
                { id: 'C', text: 'مثلث قائم' },
              ],
            },
            {
              id: 'ws01-q1-05',
              number: '5',
              prompt: 'صورتا مستقيمان متوازيان وفق انسحاب هما :',
              options: [
                { id: 'A', text: 'مستقيمان متوازيان' },
                { id: 'B', text: 'مستقيمان متعامدان' },
                { id: 'C', text: 'مستقيمان متقاطعان' },
              ],
            },
            {
              id: 'ws01-q1-06',
              number: '6',
              prompt:
                '$ABC$ مثلث قائم الزاوية في $A$ و قياس $\\widehat{B} = 50^\\circ$ فإن قياس الزاوية $\\widehat{C}$ يساوي :',
              options: [
                { id: 'A', text: '$55^\\circ$' },
                { id: 'B', text: '$35^\\circ$' },
                { id: 'C', text: '$40^\\circ$' },
              ],
            },
            {
              id: 'ws01-q1-07',
              number: '7',
              prompt: 'اذا كان $EFGH$ متوازي أضلاع ، إن $H$ صورة $G$ وفق الانسحاب :',
              options: [
                { id: 'A', text: 'من $E$ إلى $F$' },
                { id: 'B', text: 'من $F$ إلى $E$' },
                { id: 'C', text: 'من $E$ إلى $G$' },
              ],
            },
            {
              id: 'ws01-q1-08',
              number: '8',
              prompt: 'صورة قطعة مستقيمة وفق انسحاب هي قطعة مستقيمة :',
              options: [
                { id: 'A', text: 'تساويها فقط' },
                { id: 'B', text: 'تسايرها' },
                { id: 'C', text: 'تقاطعها' },
              ],
            },
            {
              id: 'ws01-q1-09',
              number: '9',
              prompt:
                'في متوازي الأضلاع $ADCB$ ، وفق الانسحاب الذي ينقل $D$ إلى $A$ فإن صورة $C$ هي :',
              options: [
                { id: 'A', text: '$A$' },
                { id: 'B', text: '$B$' },
                { id: 'C', text: '$C$' },
              ],
            },
            {
              id: 'ws01-q1-10',
              number: '10',
              prompt: 'مربع مساحته $25\\,m^2$ فإن صورته مربع مساحته :',
              options: [
                { id: 'A', text: '$50\\,m^2$' },
                { id: 'B', text: '$25\\,m^2$' },
                { id: 'C', text: '$12.5\\,m^2$' },
              ],
            },
            {
              id: 'ws01-q1-11',
              number: '11',
              prompt: 'يتطابق مثلثان قائمان عند تطابق :',
              options: [
                { id: 'A', text: 'وتر و ضلع قائمة' },
                { id: 'B', text: 'وتر و قياس زاوية حادة' },
                { id: 'C', text: 'كل ما سبق صحيح' },
              ],
            },
            {
              id: 'ws01-q1-12',
              number: '12',
              prompt: '$ABC$ مثلث قائم الزاوية في $B$ و متساوي الساقين ، فإن قياس الزاوية $C$ :',
              options: [
                { id: 'A', text: '$\\widehat{C} = 45^\\circ$' },
                { id: 'B', text: '$\\widehat{C} = 35^\\circ$' },
                { id: 'C', text: '$\\widehat{C} = 55^\\circ$' },
              ],
            },
          ],
        },
        {
          id: 'ws01-q2',
          kind: 'agree-disagree',
          title: 'السؤال الثاني : أجب بموافق أو غير موافق معللاً عدم موافقتك :',
          items: [
            {
              id: 'ws01-q2-01',
              label: '١)',
              text: '$d$ و $(AB)$ مستقيمان غير متوازيان فصورة $d$ وفق الانسحاب الذي ينقل $A$ إلى $B$ هو مستقيم يوازي $(AB)$',
            },
            {
              id: 'ws01-q2-02',
              label: '٢)',
              text: 'يتطابق مثلثان اذا تساوت زوايا المثلث الأول مع مقابلاتها من زوايا المثلث الثاني .',
            },
            {
              id: 'ws01-q2-03',
              label: '٣)',
              text: 'قطرا المعين متناصفان و متساويان .',
            },
            {
              id: 'ws01-q2-04',
              label: '٤)',
              text: '$ABCD$ متوازي أضلاع صورة $B$ هي $A$ وفق الانسحاب الذي ينقل $D$ إلى $C$ .',
            },
            {
              id: 'ws01-q2-05',
              label: '٥)',
              text: 'صورة نصف مستقيم وفق انسحاب هو نصف مستقيم يسايره .',
            },
            {
              id: 'ws01-q2-06',
              label: '٦)',
              text: 'مثلث قائم مساحته $24\\,cm^2$ فصورته وفق انسحاب مثلث مساحته $24\\,cm^2$',
            },
            {
              id: 'ws01-q2-07',
              label: '٧)',
              text: 'الدائرة وصورتها وفق انسحاب لهما المركز ذاته .',
            },
          ],
        },
        {
          id: 'ws01-q3',
          kind: 'fill-blanks',
          title: 'السؤال الثالث : املأ الفراغات التالية بما يناسبها :',
          items: [
            {
              id: 'ws01-q3-01',
              label: '١)',
              text: '$ABCD$ متوازي أضلاع مركزه النقطة $O$ ، صورة $B$ وفق انسحاب من $O$ إلى $D$ هي ....................',
            },
            {
              id: 'ws01-q3-02',
              label: '٢)',
              text: 'وفق انسحاب صورتا مستقيمان متعامدان هما ..................',
            },
            {
              id: 'ws01-q3-03',
              label: '٣)',
              text: 'مثلث مساحته $6\\,cm^2$ فصورته وفق انسحاب ...................',
            },
            {
              id: 'ws01-q3-04',
              label: '٤)',
              text: 'يتطابق مثلثان قائمان اذا تساوى...................................',
            },
            {
              id: 'ws01-q3-05',
              label: '٥)',
              text: 'صورة مستطيل $F$ وفق انسحاب هي مستطيل....................',
            },
            {
              id: 'ws01-q3-06',
              label: '٦)',
              text: 'تعطى مساحة المثلث بالعلاقة .................................',
            },
          ],
        },
      ],
    },
    {
      pageNumber: 2,
      title: 'الصفحة الثانية — السؤال الرابع : المسائل الهندسية',
      originalImage: {
        src: 'worksheets/unit-01-worksheet-01/page-2.jpg',
        alt: 'الصورة الأصلية للصفحة الثانية من ورقة عمل الوحدة الأولى هندسة، وتضم السؤال الرابع بثلاث مسائل هندسية وأشكالها المرسومة وتذييل انتهت الأسئلة.',
        caption: 'نسخة الصفحة الثانية الأصلية كما وردت في ورقة العمل المدرسية.',
      },
      footerNote: '== انتهت الأسئلة ==',
      questionGroups: [
        {
          id: 'ws01-q4',
          kind: 'problems',
          title: 'السؤال الرابع : حل كل من المسائل الآتية :',
          problems: [
            {
              id: 'ws01-q4-p1',
              title: 'المسألة الأولى :',
              stem: 'في الشكل المجاور $\\widehat{yAz} = \\widehat{xAz}$',
              subItems: [
                {
                  id: 'ws01-q4-p1-1',
                  label: '١)',
                  text: 'أثبت أن المثلثين $ABM$ و $ACM$ طبوقان',
                },
                {
                  id: 'ws01-q4-p1-2',
                  label: '٢)',
                  text: 'استنتج أن $CM = MB$',
                },
              ],
              diagram: {
                kind: 'constructed',
                origin: 'authored',
                id: 'ws01-p2-fig-01',
                renderer: TEST_FIGURE_RENDERER,
                alt: 'الشكل المجاور للمسألة الأولى: زاوية رأسها $A$ ضلعاها نصفا المستقيمين $[Ax)$ و $[Ay)$، ونصف المستقيم $[Az)$ داخلها تمر عليه النقطة $M$، مع $[MB] \\perp [Ax)$ عند $B$ و $[MC] \\perp [Ay)$ عند $C$ وعلامتي الزاوية القائمة عند $B$ و $C$.',
                caption: 'إعادة تمثيل هندسية للشكل المطبوع بجانب المسألة الأولى.',
                construction: {
                  points: [
                    { id: 'A', x: 0, y: 0, labelSide: 'sw' },
                    { id: 'B', x: 10, y: 0, labelSide: 's' },
                    { id: 'x', x: 14, y: 0, label: 'x', mark: 'none', labelSide: 's' },
                    { id: 'C', x: 6, y: 8, labelSide: 'nw' },
                    { id: 'y', x: 8.4, y: 11.2, label: 'y', mark: 'none', labelSide: 'nw' },
                    { id: 'M', x: 10, y: 5, labelSide: 'ne' },
                    { id: 'z', x: 13.6, y: 6.8, label: 'z', mark: 'none', labelSide: 'ne' },
                  ],
                  polygons: [
                    { points: ['A', 'B', 'M'], fill: true },
                    { points: ['A', 'M', 'C'], fill: true },
                  ],
                  segments: [
                    { from: 'A', to: 'x' },
                    { from: 'A', to: 'y' },
                    { from: 'A', to: 'z' },
                    { from: 'B', to: 'M' },
                    { from: 'C', to: 'M' },
                  ],
                  rightAngles: [
                    { at: 'B', from: 'A', to: 'M' },
                    { at: 'C', from: 'A', to: 'M' },
                  ],
                  questionLabels: ['A', 'B', 'C', 'M', 'x', 'y', 'z'],
                },
              },
            },
            {
              id: 'ws01-q4-p2',
              title: 'المسألة الثانية :',
              stem: '$ABCD$ مستطيل و $ANMD$ متوازي أضلاع',
              subItems: [
                {
                  id: 'ws01-q4-p2-1',
                  label: '١)',
                  text: 'أثبت تطابق المثلثين $ABN$ و $DCM$',
                },
                {
                  id: 'ws01-q4-p2-2',
                  label: '٢)',
                  text: 'حدد صورة المثلث $ABN$ وفق الانسحاب من $N$ إلى $M$',
                },
              ],
              diagram: {
                kind: 'constructed',
                origin: 'authored',
                id: 'ws01-p2-fig-02',
                renderer: TEST_FIGURE_RENDERER,
                alt: 'الشكل المجاور للمسألة الثانية: المستطيل $ABCD$ المظلّل، ومتوازي الأضلاع $ANMD$ المشترك معه في الضلع العلوي $[AD]$، حيث تقع النقاط $N$ و $B$ و $M$ و $C$ على المستقيم السفلي بالترتيب.',
                caption: 'إعادة تمثيل هندسية للشكل المطبوع بجانب المسألة الثانية.',
                construction: {
                  points: [
                    { id: 'N', x: 0, y: 0, labelSide: 's' },
                    { id: 'B', x: 3, y: 0, labelSide: 's' },
                    { id: 'M', x: 9, y: 0, labelSide: 's' },
                    { id: 'C', x: 12, y: 0, labelSide: 's' },
                    { id: 'A', x: 3, y: 5, labelSide: 'nw' },
                    { id: 'D', x: 12, y: 5, labelSide: 'ne' },
                  ],
                  polygons: [
                    { points: ['A', 'B', 'C', 'D'], fill: true },
                    { points: ['A', 'N', 'M', 'D'] },
                  ],
                  segments: [
                    { from: 'A', to: 'D' },
                    { from: 'N', to: 'C' },
                    { from: 'A', to: 'N' },
                    { from: 'A', to: 'B' },
                    { from: 'D', to: 'M' },
                    { from: 'D', to: 'C' },
                  ],
                  questionLabels: ['A', 'B', 'C', 'D', 'M', 'N'],
                },
              },
            },
            {
              id: 'ws01-q4-p3',
              title: 'المسألة الثالثة :',
              stem: 'في الشكل المجاور :',
              subItems: [
                {
                  id: 'ws01-q4-p3-1',
                  label: '١)',
                  text: 'أثبت تطابق المثلثين $ACM$ و $BCN$',
                },
                {
                  id: 'ws01-q4-p3-2',
                  label: '٢)',
                  text: 'أثبت تطابق المثلثين $NAB$ و $MAB$',
                },
                {
                  id: 'ws01-q4-p3-3',
                  label: '٣)',
                  text: 'ما نوع المثلث $CAB$',
                },
              ],
              diagram: {
                kind: 'constructed',
                origin: 'authored',
                id: 'ws01-p2-fig-03',
                renderer: TEST_FIGURE_RENDERER,
                alt: 'الشكل المجاور للمسألة الثالثة: القطعتان $[AN]$ و $[BM]$ متقاطعتان في النقطة $C$، والقطع $[AB]$ و $[AM]$ و $[BN]$ مرسومة، مع علامتي تساوٍ على $[CM]$ و $[CN]$ وقوسي تساوي زاويتين عند الرأسين $M$ و $N$ للزاويتين $\\widehat{AMC}$ و $\\widehat{BNC}$.',
                caption: 'إعادة تمثيل هندسية للشكل المطبوع بجانب المسألة الثالثة.',
                construction: {
                  points: [
                    { id: 'C', x: 0, y: 0, labelSide: 'n' },
                    { id: 'A', x: -3.85, y: 2.2, labelSide: 'nw' },
                    { id: 'B', x: -4.4, y: -0.55, labelSide: 'sw' },
                    { id: 'M', x: 8, y: 1, labelSide: 'e' },
                    { id: 'N', x: 7, y: -4, labelSide: 'se' },
                  ],
                  polygons: [
                    { points: ['A', 'B', 'C'], fill: true },
                    { points: ['A', 'C', 'M'] },
                    { points: ['B', 'C', 'N'] },
                  ],
                  segments: [
                    { from: 'A', to: 'B' },
                    { from: 'A', to: 'M' },
                    { from: 'B', to: 'N' },
                    { from: 'A', to: 'C' },
                    { from: 'B', to: 'C' },
                    { from: 'C', to: 'M', ticks: 1 },
                    { from: 'C', to: 'N', ticks: 1 },
                  ],
                  angles: [
                    { at: 'M', from: 'A', to: 'C', ticks: 1 },
                    { at: 'N', from: 'C', to: 'B', ticks: 1 },
                  ],
                  questionLabels: ['A', 'B', 'C', 'M', 'N'],
                },
              },
            },
          ],
        },
      ],
    },
  ],
  sourceNotes: [
    'نُقلت نصوص الأسئلة والخيارات والفراغات والترقيم كما وردت في الصورتين المرفقتين حرفياً دون إعادة صياغة أو اختلاق مفتاح إجابات.',
    'في السؤال الأول (الفقرة 9): الخيارات المطبوعة في الجدول هي النقاط $A$ و $B$ و $C$ مقابلةً لرموز الخيارات A و B و C.',
    'في السؤال الثالث (الفقرة ١): النص المطبوع هو «$ABCD$ متوازي أضلاع مركزه النقطة $O$ ، صورة $B$ وفق انسحاب من $O$ إلى $D$ هي ....................»، وحُفظت الصياغة المطبوعة كما هي للمراجعة التربوية.',
  ],
};
