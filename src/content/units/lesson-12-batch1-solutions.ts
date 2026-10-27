import type { ContentBlock, DiagramSpec, TeacherSolution } from '../schema';
import {
  L12B_Q1_STEM, L12B_Q1_ITEM_1, L12B_Q1_ITEM_1_OPTION_1, L12B_Q1_ITEM_1_OPTION_2, L12B_Q1_ITEM_1_OPTION_3,
  L12B_Q1_ITEM_2, L12B_Q1_ITEM_3, L12B_Q1_ITEM_4, L12B_Q1_ITEM_5,
  L12B_Q2_STEM, L12B_Q2_ITEM_1, L12B_Q2_ANSWER_1, L12B_Q2_ITEM_2, L12B_Q2_ANSWER_2, L12B_Q2_ITEM_3, L12B_Q2_ANSWER_3, L12B_Q2_ITEM_4, L12B_Q2_ANSWER_4,
  L12B_Q3_STEM, L12B_Q3_ITEM_1, L12B_Q3_ITEM_2,
  L12B_Q4_STEM, L12B_Q4_ITEM_1, L12B_Q4_ITEM_2,
  L12B_Q5_STEM, L12B_Q5_ITEM_1, L12B_Q5_ITEM_2, L12B_Q5_ITEM_3,
  L12B_Q6_STEM, L12B_Q6_ITEM_1, L12B_Q6_ITEM_2,
  L12B_Q7_STEM, L12B_Q7_ITEM_2, L12B_Q7_ITEM_3,
  L12B_Q8_STEM, L12B_Q8_ITEM_2, L12B_Q8_ITEM_3,
  L12B_Q9_STEM, L12B_Q10_STEM,
  L12B_Q11_STEM, L12B_Q11_ITEM_2, L12B_Q11_ITEM_3,
  L12B_Q12_STEM, L12B_Q12_ITEM_2,
  L12B_Q13_STEM,
  L12B_Q14_STEM, L12B_Q14_ITEM_1, L12B_Q14_ITEM_2,
  L12B_Q15_STEM, L12B_Q15_TABLE_COLUMNS, L12B_Q15_TABLE_ROW,
  L12B_Q16_STEM, L12B_Q16_ITEM_1, L12B_Q16_ITEM_2,
  L12B_Q17_STEM,
} from './lesson-12-batch1-questions';
import {
  fig12bQ1, fig12bQ1CaseOne, fig12bQ1CaseTwo, fig12bQ1CaseThree, fig12bQ1Thales,
  fig12bQ2Circles, fig12bQ2Triangle, fig12bQ2Quadrilateral,
  fig12bQ3, fig12bQ4, fig12bQ5, fig12bQ6, fig12bQ9,
  fig12bQ10CaseOne, fig12bQ10CaseTwo, fig12bQ13, fig12bQ14, fig12bQ15, fig12bQ16, fig12bQ17,
} from './lesson-12-batch1-figures';

const p = (text: string): ContentBlock => ({ type: 'paragraph', text });
const list = (...items: string[]): ContentBlock => ({ type: 'list', ordered: true, items });
const note = (title: string, text: string): ContentBlock => ({ type: 'callout', variant: 'note', title, blocks: [p(text)] });
function solution(id: string, reference: string, question: string, blocks: ContentBlock[], limitation?: string): TeacherSolution {
  return { id, reference, question, blocks, ...(limitation ? { limitation } : {}) };
}

/** Platform-derived solutions for Batch 1 (Q1–Q17), not a printed answer key. */
export const lesson12Batch1Solutions: TeacherSolution[] = [
  solution('l12-q1-midsegment', 'صورة المصدر (الوحدة الثانية) — السؤال 1، البند ①', L12B_Q1_STEM + '\n' + L12B_Q1_ITEM_1, [
    list('M منتصف [AB] وN منتصف [BC].', 'مبرهنة المنتصفين في المثلث ABC تعطي MN ∥ AC وMN = AC/2.', 'إذن الخيار الصحيح هو: ' + L12B_Q1_ITEM_1_OPTION_2),
    note('لماذا لا يصح الخياران الآخران؟', L12B_Q1_ITEM_1_OPTION_1 + ' لا يصح لأن MN يوازي AC لا BC. ' + L12B_Q1_ITEM_1_OPTION_3 + ' يعكس علاقة الطول؛ الصحيح AC = 2MN.'),
  ]),
  solution('l12-q1-figure-dependent', 'صورة المصدر (الوحدة الثانية) — السؤال 1، البنود ②–⑤', L12B_Q1_ITEM_2 + '\n' + L12B_Q1_ITEM_3 + '\n' + L12B_Q1_ITEM_4 + '\n' + L12B_Q1_ITEM_5, [
    note('حدود الإجابة', 'البنود ② و④ و⑤ تعتمد على العلامات الحمراء والأطوال الموضوعة في الأشكال المطبوعة. كما أن في البند ② تعارضاً موثقاً بين تسميات النص ومواضع بعض النقاط في الرسم. لا تُختَر إجابة لهذه البنود من النص وحده.'),
  ], 'يلزم التحقق من صور المصدر الأصلية لكل شكل قبل تسجيل خيارات نهائية.'),
  solution('l12-q2-claims', 'صورة المصدر (الوحدة الثانية) — السؤال 2', L12B_Q2_STEM + '\n' + L12B_Q2_ITEM_1 + '\n' + L12B_Q2_ANSWER_1 + '\n' + L12B_Q2_ITEM_2 + '\n' + L12B_Q2_ANSWER_2 + '\n' + L12B_Q2_ITEM_3 + '\n' + L12B_Q2_ANSWER_3 + '\n' + L12B_Q2_ITEM_4 + '\n' + L12B_Q2_ANSWER_4, [
    list('① العبارة «المستقيمان (OO′) و(BB′) متقاطعان» خاطئة: في المثلث AOO′، النقطتان B وB′ صورتا A بتناظر مركزي مركزاه O وO′؛ ومنه BB′ ∥ OO′.', '② صحيحة: J وK منتصَفا ضلعي المثلث ABC، لذلك JK = BC/2 = 8/2 = 4 cm.', '③ صحيحة: AI = AE/3 وIJ ∥ EF، فيتشابه المثلثان AIJ وAEF بنسبة 1:3؛ لذلك محيط AEF يساوي ثلاثة أمثال محيط AIJ.', '④ العبارة المطبوعة تتعلق بأطوال في الشكل؛ لا يمكن تأكيد قيمة x أو تعذّر تحديد y دون قراءة الأبعاد المرسومة.'),
  ], 'البند ④ يحتاج إلى فحص الأرقام والرموز في الشكل الأصلي.'),
  solution('l12-q3-rectangle', 'صورة المصدر (الوحدة الثانية) — السؤال 3', L12B_Q3_STEM + '\n' + L12B_Q3_ITEM_1 + '\n' + L12B_Q3_ITEM_2, [
    list('بما أن ABCD مستطيل، فإن AB = CD = 8.', 'J ∈ [AB] وBJ = 4؛ إذن AJ = AB − BJ = 8 − 4 = 4.', 'AK = 2، ومنه AK = KJ = 2؛ لذلك K منتصف [AJ].', 'في المثلث ADJ، I منتصف AD وK منتصف AJ؛ وفق مبرهنة المنتصفين IK ∥ DJ.'),
  ]),
  solution('l12-q4-figure-dependent', 'صورة المصدر (الوحدة الثانية) — السؤال 4', L12B_Q4_STEM + '\n' + L12B_Q4_ITEM_1 + '\n' + L12B_Q4_ITEM_2, [
    note('طريقة الحل', 'لإثبات IJ ∥ BC نتحقق من تساوي النسبتين AI/AB وAJ/AC، أو نستخدم عكس مبرهنة طاليس وفق المعطيات الموضوعة على الشكل. بعد إثبات التوازي نحسب IJ من نسبة التشابه نفسها.'),
  ], 'الأطوال المشار إليها على الشكل لا تظهر في النص المنقول؛ لا يمكن تثبيت البرهان العددي أو قيمة IJ من النص وحده.'),
  solution('l12-q5-midsegments', 'صورة المصدر (الوحدة الثانية) — السؤال 5', L12B_Q5_STEM + '\n' + L12B_Q5_ITEM_1 + '\n' + L12B_Q5_ITEM_2 + '\n' + L12B_Q5_ITEM_3, [
    list('بما أن I وJ وK منتصفات أضلاع المثلث ABC، فإن كل قطعة تصل بين منتصفي ضلعين توازي الضلع الثالث: IJ ∥ أحد أضلاع ABC، وIK ∥ ضلع آخر، وJK ∥ الضلع الثالث؛ يحدد الشكل أي زوج من التسميات يقابل كل ضلع.', 'تتكون ثلاثة متوازيات أضلاع صغيرة على حدود المثلث، واحد مقابل كل ضلع، وفق مواضع المنتصفات في الرسم.', 'محيط IJK = (AB + BC + AC)/2 = (8 + 12 + 10)/2 = 15 cm، أي نصف محيط ABC البالغ 30 cm.'),
  ], 'يلزم الرجوع إلى الشكل لتعيين أسماء أزواج المستقيمات المتوازية وعدّ الأشكال المرسومة دون افتراض ترتيب التسميات.'),
  solution('l12-q6-parallel-length', 'صورة المصدر (الوحدة الثانية) — السؤال 6', L12B_Q6_STEM + '\n' + L12B_Q6_ITEM_1 + '\n' + L12B_Q6_ITEM_2, [
    list('O مركز متوازي الأضلاع، لذلك O منتصف [BD]، ومن OB = 3 ينتج BD = 6 cm.', 'E نظيرة D بالنسبة إلى C، لذا C منتصف [DE].', 'في المثلث DBE، النقطتان O وC منتصفتا [DB] و[DE]؛ مبرهنة المنتصفين تعطي OC ∥ BE وBE = 2OC = 4 cm.'),
    note('النتيجة', 'BE = 4 cm و(OC) ∥ (BE).'),
  ]),
  solution('l12-q7-concentric-circles', 'صورة المصدر (الوحدة الثانية) — السؤال 7', L12B_Q7_STEM + '\n' + L12B_Q7_ITEM_2 + '\n' + L12B_Q7_ITEM_3, [
    list('OA = OB = 2.5 cm، وOA′ = OB′ = 5 cm؛ لذا OA′/OA = OB′/OB = 2.', 'بما أن A وA′ على المستقيم نفسه المار بـO، وكذلك B وB′، فإن التحاكي مركزه O الذي ينقل الدائرة C إلى الدائرة C′ معاملُه 5 / 2.5 = 2؛ لذلك (AB) ∥ (A′B′).', 'التحاكي يضاعف الأطوال بنسبة 2، ومنه A′B′ = 2 × AB = 8 cm.'),
  ]),
  solution('l12-q8-square', 'صورة المصدر (الوحدة الثانية) — السؤال 8', L12B_Q8_STEM + '\n' + L12B_Q8_ITEM_2 + '\n' + L12B_Q8_ITEM_3, [
    list('الانسحاب الذي يرسل A إلى B يرسل B إلى E؛ لذلك AB ∥ BE وAB = BE = 3 cm.', 'C مركز التناظر الذي يرسل A إلى F، إذن C منتصف AF. وبما أن ABCD مربع ضلعه 3، فإن AC = 3√2 ومنه AF = 2AC = 6√2.', 'باختيار الإحداثيات A(0,0)، B(3,0)، C(3,3)، نحصل على E(6,0) وF(6,6). إذن BC وEF مستقيمان رأسيان، فهما متوازيان.', 'AE = 6 وEF = 6 وAE ⟂ EF؛ لذلك المثلث AEF قائم ومتساوي الساقين عند E.'),
  ]),
  solution('l12-q9-collinear-midpoints', 'صورة المصدر (الوحدة الثانية) — السؤال 9', L12B_Q9_STEM, [
    list('في المثلث ABC، E وF منتصَفا AB وAC، لذلك EF ∥ BC.', 'وفي المثلث ABD، E وJ منتصَفا AB وAD، لذلك EJ ∥ BD.', 'بما أن B وC وD على استقامة واحدة، فإن BC وBD هما المستقيم نفسه. إذن EF وEJ يمران بالنقطة E وموازيان للمستقيم نفسه، فينطبقان؛ وبالتالي E وF وJ على استقامة واحدة.'),
  ]),
  solution('l12-q10-figure-dependent', 'صورة المصدر (الوحدة الثانية) — السؤال 10', L12B_Q10_STEM, [
    note('طريقة الحل', 'نستعمل العلامات الحمراء في كل شكل لتحديد القطع المتساوية أو المتوازية، ثم نثبت أن النسب على الضلعين متساوية. عندها نطبق عكس مبرهنة المنتصفين أو عكس مبرهنة طاليس لإثبات أن I منتصف [AC].'),
  ], 'الإشارات الحمراء في الشكلين ① و② هي المعطيات الحاسمة ولا يمكن إعادة بناء البرهان الصحيح من نص السؤال وحده.'),
  solution('l12-q11-circle-midpoint', 'صورة المصدر (الوحدة الثانية) — السؤال 11', L12B_Q11_STEM + '\n' + L12B_Q11_ITEM_2 + '\n' + L12B_Q11_ITEM_3, [
    list('نصف قطر الدائرة C يساوي 2 cm ونصف قطر C′ يساوي 4 cm؛ لذلك OS = 2 وOI = OJ = 4.', 'إذن OS = SI = 2، أي S منتصف [OI]. وبما أن ST ∥ IJ في المثلث OIJ، فإن T منتصف [OJ] بمبرهنة المنتصفين.', 'بما أن OJ = 4، فإن OT = OJ/2 = 2 cm، وهو نصف قطر الدائرة C؛ لذا T تنتمي إلى C.'),
  ]),
  solution('l12-q12-parallel-midpoints', 'صورة المصدر (الوحدة الثانية) — السؤال 12', L12B_Q12_STEM + '\n' + L12B_Q12_ITEM_2, [
    list('من MB = 3/2 MN وMC = 1/2 MB ينتج MC = 3/4 MN، وبالتالي MC = MB/2.', 'بما أن B وC على نصف المستقيم نفسه وMC = MB/2، فإن C منتصف [MB].', 'A منتصف [MP] حسب المعطى. في المثلث MBP، القطعة الواصلة بين منتصفي MB وMP هي AC؛ لذلك AC ∥ BP.'),
  ]),
  solution('l12-q13-construction-limitation', 'صورة المصدر (الوحدة الثانية) — السؤال 13', L12B_Q13_STEM, [
    list('لإنشاء منتصف قطعة معلومة الطرفين، نرسم قوسين متساويي نصف القطر من طرفيها، ثم نصل نقطتي تقاطع القوسين؛ هذا هو المحور العمودي للقطعة.', 'يتقاطع المحور العمودي مع القطعة في منتصفها. نكرر الإنشاء على [AC] و[BC] إذا كان موضع C محدداً بالإنشاء المطلوب.'),
  ], 'السؤال ينص على أن C مخفية وأن الإنشاء يجب أن يبقى داخل الإطار؛ يلزم الشكل المطبوع لمعرفة الإنشاء المقيد المقصود ونقاط التقاطع المتاحة.'),
  solution('l12-q14-midpoints', 'صورة المصدر (الوحدة الثانية) — السؤال 14', L12B_Q14_STEM + '\n' + L12B_Q14_ITEM_1 + '\n' + L12B_Q14_ITEM_2, [
    list('D منتصف [BC] وM منتصف [AD]. وبما أن D منتصف BC، فإن متجهة AD تساوي مجموع متجهتي AB وAC مقسومًا على 2؛ ومن ثم AM = (AB + AC)/4.', 'في المثلث ABD، يقطع المستقيم C–M–F الضلعين AB وAD، بينما تقع C على امتداد BD. بتطبيق مبرهنة مينلاوس: (AF/FB) × (BC/CD) × (DM/MA) = 1. وبما أن D منتصف BC وM منتصف AD، فإن BC/CD = 2 وDM/MA = 1؛ لذا AF/FB = 1/2، ومنه AF = AB/3.', 'بما أن DE ∥ CF وD منتصف BC، فإن E منتصف BF بعكس مبرهنة المنتصفين في المثلث BCF.', 'إذن BE = EF، وE منتصف BF. وبما أن A وF وE وB على استقامة واحدة وAF = AB/3، نحصل على AE = 2AB/3، ومنه AF = AE/2؛ أي F منتصف AE.'),
  ]),
  solution('l12-q15-similarity-table', 'صورة المصدر (الوحدة الثانية) — السؤال 15', L12B_Q15_STEM + '\n' + [...L12B_Q15_TABLE_COLUMNS, ...L12B_Q15_TABLE_ROW].join('\n'), [
    list('بما أن TV ∥ BC، فإن المثلثين ATV وABC متشابهان.', 'نسبة التشابه من ATV إلى ABC هي BC/TV = 6.6/3 = 2.2.', 'إذن AC = 2.2 × AV = 2.2 × 3.5 = 7.7 cm، وAT = AB/2.2 = 9.9/2.2 = 4.5 cm.'),
    note('تنبيه', 'الحساب يستخدم الأطوال المطبوعة في الجدول كما هي؛ يجب مراجعة ترتيب الأعمدة في الرسم عند تعبئة الخانات.'),
  ]),
  solution('l12-q16-figure-dependent', 'صورة المصدر (الوحدة الثانية) — السؤال 16', L12B_Q16_STEM + '\n' + L12B_Q16_ITEM_1 + '\n' + L12B_Q16_ITEM_2, [
    note('طريقة الحل', 'بما أن DE ∥ BC، فالمثلثان ADE وABC متشابهان: AD/AB = AE/AC = DE/BC. نعوّض أطوال الشكل لإيجاد AE ثم BC، ونقرّب BC إلى منزلة عشرية واحدة.'),
  ], 'القيم العددية اللازمة موجودة في الشكل المرافق وليست ضمن النص المستخرج؛ لا تُخترع قيم لـAE أو BC.'),
  solution('l12-q17-figure-dependent', 'صورة المصدر (الوحدة الثانية) — السؤال 17', L12B_Q17_STEM, [
    note('طريقة الحل', 'بما أن PQ ∥ MN، فالمثلثان LPQ وLMN متشابهان: LP/LM = LQ/LN = PQ/MN. نستخدم القيم المعطاة على الشكل لإيجاد LP ثم MN.'),
  ], 'الأطوال المرسومة اللازمة للحساب غير واردة في نص السؤال المستخرج.'),
];
