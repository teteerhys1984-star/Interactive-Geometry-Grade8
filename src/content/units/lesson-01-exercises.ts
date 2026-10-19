import { lessonStepSchema, type LessonStepInput } from '../schema';
import { lesson01Figure } from './lesson-01-start';
const BOOK_PAGE_7 = 7;
/** Printed check/practice prompts, retained in order for the existing Teacher Area only. */
const steps: LessonStepInput[] = [
  /* ──────────────────────────────────────────────────────────────────
   *  STEP 5 — pages 6–7: تحقّق من فهمك ①
   *  (figure on page 6, its six questions on page 7)
   * ────────────────────────────────────────────────────────────────── */
  {
    id: 'step-05-check-fifteen-parallelograms',
    kicker: 'تحقّق من فهمك',
    title: 'متوازيات الأضلاع الخمسة عشر',
    source: { page: '6–7', locator: 'تحقّق من فهمك — ①' },
    blocks: [
      {
        type: 'paragraph',
        text: 'لدينا في الشكل التالي 15 متوازي أضلاع طبوقة مرقمة من الرقم 1 حتى الرقم 15.',
      },
      lesson01Figure('strip', 6, 'شريط متوازيات الأضلاع الخمسة عشر'),
      {
        type: 'questionGroup',
        items: [
          {
            label: '1.',
            text: 'ما صورة كل من متوازي الأضلاع ① و ② وفق الانسحاب الذي ينقل $A$ إلى $D$.',
          },
          {
            label: '2.',
            text: 'ما صورة كل من متوازي الأضلاع ⑮ و ⑪ وفق الانسحاب الذي ينقل $F$ إلى $C$.',
          },
          {
            label: '3.',
            text: "ما صورة كل من متوازي الأضلاع ⑦ و ⑬ وفق الانسحاب الذي ينقل $D$ إلى $D'$.",
          },
          {
            label: '4.',
            text: 'وفق أي انسحاب ينتقل متوازي الأضلاع ③ إلى متوازي الأضلاع ⑦.',
          },
          {
            label: '5.',
            text: 'وفق أي انسحاب ينتقل متوازي الأضلاع ④ إلى متوازي الأضلاع ⑨.',
          },
          {
            label: '6.',
            text: 'وفق أي انسحاب ينتقل متوازي الأضلاع ⑨ إلى متوازي الأضلاع ⑬.',
          },
        ],
      },
    ],
  },

  /* ──────────────────────────────────────────────────────────────────
   *  STEP 6 — page 7: تحقّق من فهمك ②
   * ────────────────────────────────────────────────────────────────── */
  {
    id: 'step-06-check-why-not-a-translation',
    kicker: 'تحقّق من فهمك',
    title: 'لماذا ليس صورةً وفق انسحاب؟',
    source: { page: BOOK_PAGE_7, locator: 'تحقّق من فهمك — ②' },
    blocks: [
      {
        type: 'paragraph',
        text: 'اشرح لماذا الشكل الأحمر ليس صورة للشكل الأزرق وفق انسحاب.',
      },
      lesson01Figure('counter', 7, 'مقارنة الأشكال في اللوحات الأربع'),
    ],
  },

  /* ──────────────────────────────────────────────────────────────────
   *  STEP 7 — page 7: تدرّب ①
   * ────────────────────────────────────────────────────────────────── */
  {
    id: 'step-07-practice-triangular-tiling',
    kicker: 'تدرب',
    title: 'الترصيف المثلثي',
    source: { page: BOOK_PAGE_7, locator: 'تدرب — ①' },
    blocks: [
      {
        type: 'callout',
        variant: 'activity',
        title: 'تحضير',
        blocks: [{ type: 'paragraph', text: 'قص الشكل واستعمله في التدرب الآتي' }],
      },
      { type: 'paragraph', text: 'تأمل الشكل التالي:' },
      lesson01Figure('lattice', 7, 'الشبكة المثلثية والأشكال الثمانية'),
      { type: 'paragraph', text: 'دلّ على كل شكل وصورته وفق انسحاب.' },
    ],
  },

  /* ──────────────────────────────────────────────────────────────────
   *  STEP 8 — page 7: تدرّب ②
   * ────────────────────────────────────────────────────────────────── */
  {
    id: 'step-08-practice-semicircle-area',
    kicker: 'تدرب',
    title: 'نصف الدائرة والمساحة',
    source: { page: BOOK_PAGE_7, locator: 'تدرب — ②' },
    blocks: [
      { type: 'paragraph', text: 'تأمل الشكل المرسوم جانباً.' },
      lesson01Figure('semicircle', 7, 'المستطيل مع اقتطاع يساراً وإضافة يميناً'),
      {
        type: 'questionGroup',
        items: [
          {
            label: '1.',
            text: 'ما صورة نصف الدائرة التي قطرها $[BC]$ وفق الانسحاب الذي ينقل $B$ إلى $A$؟',
          },
          {
            label: '2.',
            text: 'استنتج مساحة المنطقة الملونة باللون الأزرق',
          },
        ],
      },
    ],
  },
];

export const lesson01TeacherSteps = steps.map((step) => lessonStepSchema.parse(step));
