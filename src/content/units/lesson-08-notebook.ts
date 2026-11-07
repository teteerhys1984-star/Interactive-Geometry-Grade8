import type { CalloutVariant } from '@/components/ui';
import type { ContentBlock, LessonStepInput } from '../schema';

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
 *  الوحدة الثانية · الدرس الأول — 📒 دفتر الطالب
 *  «منتصفا ضلعين في المثلث» (الصفحات ٣١–٣٣)
 * ============================================================================
 *
 *  Static student copying and reference station placed at the end of Lesson 8,
 *  immediately after `teachingRecap` and before the final assessment.
 *
 *  Provenance & scope boundaries:
 *    • Mathematical core (midpoint segment, the two parts of the First Midpoint
 *      Theorem, and the auxiliary-point proof idea via AMCK and MBCK) reflects
 *      pages 31–32 (`docs/UNIT-02-LESSON-01-SOURCE.md`), paraphrased for
 *      concise notebook transcription without claiming verbatim quotation.
 *    • Inverse algebraic reading (`BC = 2 MN`), recognition steps, and common
 *      pitfalls are platform-authored study clarifications («توضيح من المنصّة»).
 *    • Strictly restricted to the First Midpoint Theorem: the converse theorem
 *      of Unit 2, Lesson 2 (pages 34–35) is never introduced here.
 *    • Uses only generic vertices (`A, B, C, M, N, K`); contains no printed
 *      exercise, no worked solution, no numeric exercise value, and no
 *      assessment or Teacher Area leakage.
 * ============================================================================
 */
export const lesson08Notebook: LessonStepInput = {
  id: 'lesson-08-student-notebook',
  origin: 'authored',
  role: 'notebook',
  title: '📒 دفتر الطالب',
  kicker: 'شرح المنصّة',
  blocks: [
    section('definition', '١. قطعة منتصفَي ضلعين في مثلث', [
      p(
        'في مثلث $ABC$، إذا كانت $M$ منتصف الضلع $[AB]$ وكانت $N$ منتصف الضلع $[AC]$، فإن القطعة $[MN]$ هي القطعة الواصلة بين منتصفَي ضلعين في هذا المثلث، ويسمّى الضلع $[BC]$ — الذي لا يحمل أياً من المنتصفين — الضلع الثالث.',
      ),
      math('AM = MB,\\qquad AN = NC', 'شرط المنتصفين على ضلعي المثلث'),
      p(
        'توضيح من المنصّة: يشترك الضلعان الحاملان للمنتصفين في رأس واحد من رؤوس المثلث (وهو هنا $A$)، ويقابله الضلع الثالث $[BC]$.',
      ),
    ]),

    section('theorem', '٢. المبرهنة الأولى في المنتصفات — التوازي', [
      p(
        'في أي مثلث، إذا مرّ مستقيم بمنتصفَي ضلعين فيه فإنه يوازي حامل الضلع الثالث. ففي المثلث $ABC$ حيث $M$ منتصف $[AB]$ و$N$ منتصف $[AC]$:',
      ),
      math('(MN) \\parallel (BC)', 'توازي مستقيم المنتصفين والضلع الثالث'),
      p(
        'تصحّ هذه الخاصية أيّاً كان شكل المثلث (سواء أكانت الزاوية عند $A$ حادة أم قائمة أم منفرجة).',
      ),
    ]),

    section('theorem', '٣. العلاقة الطولية لقطعة المنتصفين', [
      p(
        'في أي مثلث، طول القطعة الواصلة بين منتصفَي ضلعين فيه يساوي نصف طول الضلع الثالث. ففي المثلث $ABC$ حيث $M$ منتصف $[AB]$ و$N$ منتصف $[AC]$:',
      ),
      math('MN = \\frac{1}{2}\\,BC', 'طول قطعة المنتصفين يساوي نصف طول الضلع الثالث'),
      p(
        'استنتاج حسابي (توضيح من المنصّة): عند معرفة طول قطعة المنتصفين $MN$ نحصل على طول الضلع الثالث بالضرب في اثنين:',
      ),
      math('BC = 2\\,MN', 'حساب طول الضلع الثالث من طول قطعة المنتصفين'),
    ]),

    section('note', '٤. كيف نميّز المبرهنة ونطبّقها؟', [
      p('لتطبيق المبرهنة في مسألة هندسية (تنظيم إرشادي من المنصّة منسجم مع خطوات الكتاب):'),
      {
        type: 'list',
        ordered: true,
        items: [
          'سمِّ المثلث الذي تعمل فيه صراحةً قبل كتابة أي نتيجة.',
          'حدّد الضلعين المشتركين في رأس واحد، وتحقّق من كون كل نقطة منتصف ضلعها بالمعطيات أو بخاصية مثبتة (مثل التناظر المركزي أو مركز القطر).',
          'عيّن الضلع الثالث للمثلث نفسه، وهو الضلع الذي لا تقع عليه أيٌّ من النقطتين.',
          'اكتب الاستنتاج المطلوب منسوباً إلى الضلع الثالث: توازي المستقيمين $(MN) \\parallel (BC)$ أو علاقة الطول $MN = \\frac{1}{2}\\,BC$.',
        ],
      },
    ]),

    section('note', '٥. الهيكل المنطقي للبرهان', [
      p(
        'تعتمد فكرة البرهان على ربط المنتصفين بخواص متوازي الأضلاع المدروسة في الوحدة الأولى، عبر إنشاء النقطة المساعدة $K$ نظيرة $M$ بالنسبة إلى $N$ (بحيث تكون $N$ منتصف $[MK]$):',
      ),
      {
        type: 'list',
        ordered: true,
        items: [
          'القطران $[AC]$ و$[MK]$ متناصفان في $N$، فيكون الرباعي $AMCK$ متوازي أضلاع، ومنه $(CK) \\parallel (AM)$ و$CK = AM$.',
          'بما أن $AM = MB$ على استقامة واحدة، ينتقل التوازي والتساوي إلى $[CK]$ و$[MB]$، فيكون الرباعي $MBCK$ متوازي أضلاع.',
          'من متوازي الأضلاع $MBCK$ ينتج $(MK) \\parallel (BC)$ و$MK = BC$؛ ولأن $N$ منتصف $[MK]$ يثبت أن $(MN) \\parallel (BC)$ وأن $MN = \\frac{1}{2}\\,BC$.',
        ],
      },
    ]),

    section('warning', '٦. تنبيهات وأخطاء شائعة', [
      {
        type: 'list',
        ordered: false,
        items: [
          'عدم الخلط بين المنتصف وأي نقطة اختيارية على الضلع: إذا لم يثبت التنصيف بالمعطيات أو البرهان (كأن يكون $AM \\neq MB$)، فلا يصحّ تطبيق المبرهنة اعتماداً على مظهر الرسم.',
          'عدم تطبيق المبرهنة من دون تحديد المثلث الصحيح في الأشكال المركّبة: يجب أن تقع النقطتان على ضلعين من مثلث واحد بالذات.',
          'عدم نسبة النصفية إلى أحد الضلعين الحاملين للمنتصفين: الطول $MN$ يساوي نصف الضلع الثالث $BC$، وليس نصف $AB$ أو نصف $AC$.',
          'عدم الخلط بين نتيجتي التوازي والطول: التوازي علاقة اتجاه بين مستقيمين تُكتب $(MN) \\parallel (BC)$، أما علاقة الطول فتخصّ قياسَي القطعتين وتُكتب $MN = \\frac{1}{2}\\,BC$.',
        ],
      },
    ]),
  ],
};
