import type { CalloutVariant } from '@/components/ui';
import type { ContentBlock, LessonStepInput } from '../schema';
import {
  L13_ACTIVITY_WARNING,
  L13_DEFINITION,
  L13_PROPERTY_BACKWARD,
  L13_PROPERTY_FORWARD,
  L13_SPECIAL_CENTRE,
  L13_SPECIAL_CONCURRENT,
  L13_SPECIAL_RADII,
} from './lesson-13-questions';

const p = (text: string): ContentBlock => ({ type: 'paragraph', text });
const math = (latex: string, label: string): ContentBlock => ({ type: 'math', latex, label });
const section = (variant: CalloutVariant, title: string, blocks: ContentBlock[]): ContentBlock => ({
  type: 'callout',
  variant,
  title,
  blocks,
});

/**
 * ============================================================================
 *  الوحدة الثالثة · الدرس الأول — 📒 دفتر الطالب
 *  «محور ضلع في المثلث» (الصفحات ٥٣–٥٥)
 * ============================================================================
 *
 *  A static copying-and-reference station placed at the end of the lesson,
 *  immediately after the recap and before the in-lesson assessment.
 *
 *  Provenance & scope boundaries:
 *    • Quotes the definition, the two properties and the three bullets of
 *      «خاصة وتعریف» verbatim from `lesson-13-questions.ts`.
 *    • Adds ONLY generic reasoning: the reading of the marks, the two proof
 *      patterns that follow from the properties, the compass construction, and
 *      the three positions of `O`. No fixed numbers, no exercise data, no
 *      assessment item and no Teacher Area material appears here.
 *    • Uses the generic letters of the lesson (`A B C`, `M`, `O`, `E F P`) and
 *      never the values of «تدرّب» or of the in-lesson check.
 * ============================================================================
 */
export const lesson13Notebook: LessonStepInput = {
  id: 'lesson-13-student-notebook',
  origin: 'authored',
  role: 'notebook',
  title: '📒 دفتر الطالب',
  kicker: 'شرح المنصّة',
  blocks: [
    section('definition', '١. التعريف والعلامات التي تُرسم عليه', [
      p(`تعريف الكتاب (صفحة ٥٤): «${L13_DEFINITION}»`),
      p(
        'على الشكل، تُقرأ المحورية من علامتين معًا لا من مظهر المستقيم: زاوية قائمة عند نقطة التقاطع مع الضلع، وعلامتان متساويتان على نصفَي الضلع. علامة واحدة لا تكفي: الزاوية القائمة وحدها تعني ارتفاعًا، والتنصيف وحده يعني متوسطًا.',
      ),
      {
        type: 'list',
        ordered: false,
        items: [
          'الارتفاع المتعلق بـ $[BC]$: عمودي على $(BC)$ ومارّ بالرأس $A$؛ لا يلزم أن يقع قدمه في منتصف $[BC]$.',
          'محور $[BC]$: عمودي على $(BC)$ في منتصفها؛ لا يلزم أن يمرّ بالرأس $A$ إلّا إذا كان $AB = AC$.',
          'المتوسط المتعلق بـ $[BC]$: يصل $A$ بمنتصف $[BC]$؛ لا يلزم أن يكون عموديًا على $(BC)$ إلّا إذا كان $AB = AC$.',
        ],
      },
      p(
        'ولذلك تمنع صفحة ٥٤ رسم مثلث قائم أو متساوي الساقين في النشاط: في مثل هذه الحالة تختلط المستقيمات الثلاثة ويصير التلاقي نتيجة تناظر لا نتيجة برهان.',
      ),
      p(`نصّ التحذير المطبوع: «${L13_ACTIVITY_WARNING}»`),
    ]),

    section('theorem', '٢. خاصّة المحور في الاتجاهين', [
      p(`الاتجاه المباشر: «${L13_PROPERTY_FORWARD}»`),
      p(`الاتجاه العكسي: «${L13_PROPERTY_BACKWARD}»`),
      math('M \\in (d) \\iff MB = MC', 'صيغة الخاصّة الموحّدة'),
      p(
        'الاستعمال الأول (من المحور إلى المساواة): إذا عرفنا أنّ مستقيمًا محورٌ لقطعة، فكلّ نقطة منه تبعد بالمسافة نفسها عن طرفَيها؛ ومنه نستنتج تساوي قطع، ثمّ نستنتج أنّ مثلثًا متساوي الساقين.',
      ),
      p(
        'الاستعمال الثاني (من المساواة إلى المحور): إذا أثبتنا أنّ نقطة تبعد بالمسافة نفسها عن طرفَي قطعة، حكمنا بأنّها تنتمي إلى محورها؛ وبنقطتين من هذا النوع نُثبت أنّ مستقيمًا هو المحور نفسه.',
      ),
      {
        type: 'list',
        ordered: true,
        items: [
          'نحدّد القطعة والمستقيم المرشّح لأن يكون محورها.',
          'نثبت أنّ نقطتين مختلفتين من المستقيم تحقّقان $XB = XC$ (أو نثبت أنّ المستقيم عمودي على القطعة في منتصفها).',
          'نستنتج أنّ المستقيم هو محور القطعة، ثم نستعمل الخاصّة المباشرة على أيّ نقطة أخرى منه.',
        ],
      },
    ]),

    section('theorem', '٣. المحاور الثلاثة والدائرة المارّة بالرؤوس', [
      p(`«${L13_SPECIAL_CONCURRENT}»`),
      p(`«${L13_SPECIAL_CENTRE}»`),
      p(`«${L13_SPECIAL_RADII}»`),
      math('OA = OB = OC', 'نصف قطر الدائرة المارّة بالرؤوس الثلاثة'),
      p(
        'البرهان في سطرين: محورا $[AB]$ و$[BC]$ يلتقيان في $O$؛ فـ $OA = OB$ (لأنّ $O$ من محور $[AB]$) و$OB = OC$ (لأنّ $O$ من محور $[BC]$)، ومنه $OA = OC$، أي إنّ $O$ تنتمي إلى محور $[AC]$ أيضًا، وهي مركز الدائرة المارّة بالرؤوس.',
      ),
      p(
        'موضع $O$ يتبع نوع المثلث، في ثلاث حالات مطبوعة في صفحة ٥٥: في المثلث الحاد الزوايا يقع $O$ داخل المثلث؛ وفي المثلث المنفرج في $\\widehat{A}$ يقع خارجه في الجهة المقابلة لـ $[BC]$؛ وفي المثلث القائم في $\\widehat{A}$ يقع $O$ في منتصف الوتر $[BC]$.',
      ),
    ]),

    section('note', '٤. إنشاء محور قطعة بالفرجار', [
      {
        type: 'list',
        ordered: true,
        items: [
          'افتح الفرجار بفتحة $r$ أكبر من نصف طول $[BC]$، وإلّا لم يتقاطع القوسان.',
          'ارسم قوسًا مركزه $B$ ثم قوسًا بالفتحة نفسها مركزه $C$؛ يتقاطع القوسان في نقطتين $P$ و$Q$.',
          'المستقيم $(PQ)$ هو محور $[BC]$.',
        ],
      },
      p(
        'التبرير: النقطتان $P$ و$Q$ تحقّقان $PB = PC$ و$QB = QC$ لأنّ نصف القطر واحد؛ فكلتاهما على محور $[BC]$ بحسب الاتجاه العكسي للخاصّة، والمستقيم المارّ بهما هو المحور.',
      ),
      p(
        'وبالطريقة نفسها يُنشأ منصّف زاوية: قوس مركزه الرأس يقطع الضلعين في نقطتين متساويتي البعد عن الرأس، ثم قوسان متساويان مركزاهما هاتان النقطتان يتقاطعان في نقطة $P$؛ والمستقيم المارّ بالرأس وبـ $P$ هو المنصّف.',
      ),
    ]),

    section('warning', '٥. تنبيهات وأخطاء شائعة', [
      {
        type: 'list',
        ordered: false,
        items: [
          'الحكم على الشكل من مظهره: مستقيم «يبدو» في المنتصف وليس كذلك، أو «يبدو» عموديًا دون علامة قائمة.',
          'الخلط بين المحور والمتوسط: كلاهما يمرّ بمنتصف الضلع، لكنّ المحور وحده عمودي عليه.',
          'الخلط بين المحور والارتفاع: الارتفاع يمرّ بالرأس دومًا، والمحور يمرّ به فقط في المثلث المتساوي الساقين في ذلك الرأس.',
          'استعمال الخاصّة في الاتجاه الخطأ: من $MB = MC$ نستنتج أنّ $M$ على المحور، لا أنّ المستقيم المرسوم من $M$ عمودي على $[BC]$ في منتصفها قبل إثبات أنّ $M$ من المحور.',
          'نسيان شرط الفتحة في إنشاء الفرجار: فتحة أصغر من نصف طول القطعة لا تُنتج أيّ تقاطع.',
        ],
      },
    ]),
  ],
};
