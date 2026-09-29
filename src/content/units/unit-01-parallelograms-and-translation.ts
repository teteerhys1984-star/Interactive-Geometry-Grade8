import type { UnitInput } from '../schema';
import {
  teachingIntro,
  teachingDirectionDistance,
  teachingEveryPoint,
  teachingWhyPreserved,
  teachingWorkedExample,
  teachingCommonMistakes,
  teachingRecap,
} from './lesson-01-teaching';
import { lesson01Assessment } from './lesson-01-assessment';
import { lesson01TeacherResources } from './lesson-01-teacher';
import { lesson02 } from './lesson-02-image-of-a-point';
import { lesson03 } from './lesson-03-image-of-a-shape';
import { lesson04 } from './lesson-04-triangle-congruence';
import { lesson05 } from './lesson-05-unit-exercises';

/**
 * ============================================================================
 *  الوحدة الأولى — متوازيات الأضلاع والانسحاب
 *  Lesson 1: «الانسحاب وخواصه» (textbook pages 5–7).
 *  Lesson 2: «صورة نقطة وفق انسحاب» (textbook pages 8–10).
 *  Lesson 3: «صورة شكل وفق انسحاب» (textbook pages 11–16) — see its split
 *            data, teaching, assessment and teacher-resource modules.
 * ============================================================================
 *
 *  SOURCE FIDELITY
 *  ---------------
 *  All prose, questions and notation below are reproduced verbatim from the
 *  supplied scans of pages 5, 6 and 7. Nothing is shortened, summarised,
 *  paraphrased, omitted or invented.
 *
 *  Notation follows the source's French/Syrian convention exactly:
 *    [AB] segment · (AB) line · AB length · \widehat{ABC} angle · \parallel · primes
 *  The source uses the arc/hat over letters for angles and never the ∠ glyph.
 *
 *  Numeric/unit formatting is preserved as printed, not normalised.
 *
 *  AUTHORED TEACHING MATERIAL
 *  -------------------------
 *  Seven platform-written steps are interleaved between the eight verbatim
 *  steps (see ./lesson-01-teaching.ts). They are marked `origin: 'authored'`,
 *  carry no textbook page, and render inside badged «شرح المنصّة» cards. The
 *  eight source steps below keep their original ids, order and wording; not a
 *  single character of them is changed by the interleaving.
 *
 *  The end-of-lesson assessment (./lesson-01-assessment.ts) and the teacher
 *  resources (./lesson-01-teacher.ts) are likewise platform-authored. The
 *  teacher resources are rendered only behind the Teacher Area gate.
 *
 *  FIGURES
 *  -------
 *  All six figures resolve to `reference` under the agreed decision tree.
 *  See docs/LESSON-01-FIGURES.md for the per-figure justification and for the
 *  exact verification that would promote each one to `constructed`.
 * ============================================================================
 */

const BOOK_PAGE_5 = 5;
const BOOK_PAGE_6 = 6;
const BOOK_PAGE_7 = 7;

export const unit01: UnitInput = {
  id: 'unit-01-parallelograms-and-translation',
  title: 'متوازيات الأضلاع والانسحاب',
  source: { page: 3, locator: 'الوحدة الأولى' },

  lessons: [
    {
      id: 'lesson-01-translation-and-properties',
      title: 'الانسحاب وخواصه',
      source: { page: '5–7', locator: 'الدرس الأول' },

      // The textbook prints no summary, objectives or vocabulary list for this
      // lesson. Those fields are intentionally left absent rather than invented.

      steps: [
        // ── شرح المنصّة (مُعدّ من المنصّة، ليس من الكتاب) ──
        teachingIntro,

        /* ──────────────────────────────────────────────────────────────────
         *  STEP 1 — page 5: نشاط · 1. في أحد أرصفة دمشق
         * ────────────────────────────────────────────────────────────────── */
        {
          id: 'step-01-activity-damascus-pavement',
          kicker: 'نشاط «نحو مفهوم الانسحاب انطلاقاً من ترصيف»',
          title: 'في أحد أرصفة دمشق',
          source: { page: BOOK_PAGE_5, locator: 'نشاط — 1' },
          blocks: [
            {
              type: 'callout',
              variant: 'activity',
              title: 'تحضير',
              blocks: [{ type: 'paragraph', text: 'قص الشكل واستعمله في النشاط الآتي' }],
            },
            {
              type: 'figure',
              diagram: {
                kind: 'reference',
                id: 'fig-5-a-pavement-tessellation',
                alt: 'ترصيف مربّع من أحجار متشابكة على شكل صليب، بلونين: بنّي داكن وأصفر فاتح. عليه نقاط مُعلّمة بالحروف $A$ و $B$ و $C$ و $D$ و $E$ و $F$ و $G$ و $M$ و $N$ و $P$، وأحجار مرقّمة بأرقام داخل دوائر حمراء من ① حتى ⑩ وما بعدها.',
                caption: 'ترصيف من أرصفة دمشق',
                source: { page: BOOK_PAGE_5, locator: 'شكل النشاط' },
                reason:
                  'تعذّر تحديد مطابقة كل رقم مع حجره، ومواضع النقاط على زوايا الأحجار، من دقة الصورة المتاحة.',
              },
            },
            {
              type: 'paragraph',
              text: 'الأسئلة الآتية تسمح بطرح مفهوم الانسحاب وفق مستقيم.',
            },
            {
              type: 'questionGroup',
              items: [
                {
                  label: '1.',
                  text: 'ضع، على ورقة شفافة، قصاصتي الحجر ① والحجر ②. علّمْ أيضاً النقاط $A$ و $C$ و $E$، ثم ارسم المستقيمات $(AB)$ و $(CD)$ و $(EF)$.',
                },
                {
                  label: '2.',
                  text: 'وفق أية حركة يمكن أن تنتقل قصاصة الحجر ① لتنطبق على قصاصة الحجر ②؟',
                },
                {
                  label: '3.',
                  text: 'وفق تلك الحركة، ما النقاط التي تنطبق عليها $A$ و $C$ و $E$؟ وما المواضع التي تشغلها قصاصتا الحجر ④ و الحجر ⑨؟',
                },
                {
                  label: '4.',
                  text: 'ارسم على ورقة شفافة الشكلين الرباعيين $ABDC$ و $ABFE$. ما طبيعة كلٍّ منهما؟',
                },
              ],
            },
            {
              type: 'callout',
              variant: 'hint',
              blocks: [
                {
                  type: 'paragraph',
                  text: 'نقول إن الحجر ② هو صورة الحجر ① وفق الانسحاب الذي ينقل النقطة $A$ إلى النقطة $B$.',
                },
              ],
            },
          ],
        },

        /* ──────────────────────────────────────────────────────────────────
         *  STEP 2 — page 5: نشاط · 2. انسحاب آخر
         * ────────────────────────────────────────────────────────────────── */
        {
          id: 'step-02-activity-another-translation',
          kicker: 'نشاط «نحو مفهوم الانسحاب انطلاقاً من ترصيف»',
          title: 'انسحاب آخر',
          source: { page: BOOK_PAGE_5, locator: 'نشاط — 2' },
          blocks: [
            {
              type: 'figure',
              diagram: {
                kind: 'reference',
                id: 'fig-5-a-pavement-tessellation-again',
                alt: 'الترصيف نفسه الوارد في النشاط السابق، بالنقاط $A$ و $B$ و $C$ و $D$ و $E$ و $F$ و $G$ و $M$ و $N$ و $P$ والأحجار المرقّمة.',
                caption: 'الترصيف نفسه الوارد في النشاط السابق',
                source: { page: BOOK_PAGE_5, locator: 'شكل النشاط' },
                reason: 'الشكل نفسه الوارد في الخطوة السابقة.',
              },
            },
            {
              type: 'questionGroup',
              items: [
                {
                  label: '1.',
                  text: 'هذه المرة، وفق الانسحاب الذي ينقل النقطة $A$ إلى النقطة $M$. ما صورة الحجر ①؟ وما صورة الحجر ⑥؟ وما صورة كل من النقطتين $C$ و $E$؟ وأخيراً، ما صورة الحجر ⑦؟',
                },
                {
                  label: '2.',
                  text: 'هل يوجد انسحاب ينقل الحجر ⑩ إلى الحجر ⑧؟ إنْ نعم، ما هو؟',
                },
              ],
            },
          ],
        },

        // ── شرح المنصّة ──
        teachingDirectionDistance,

        /* ──────────────────────────────────────────────────────────────────
         *  STEP 3 — page 6: تعلّم
         * ────────────────────────────────────────────────────────────────── */
        {
          id: 'step-03-learn-translation-concept',
          kicker: 'تعلّم',
          title: 'مفهوم الانسحاب',
          source: { page: BOOK_PAGE_6, locator: 'تعلّم' },
          blocks: [
            {
              type: 'paragraph',
              text: "عند التزلج من $A$ إلى $B$، ينطبق الشكل $F$ على الشكل $F'$. نقول إنّ الشكل $F'$ هو صورة الشكل $F$ وفق الانسحاب الذي ينقل $A$ إلى $B$.",
            },
            {
              type: 'figure',
              diagram: {
                kind: 'reference',
                id: 'fig-6-a-skier',
                alt: "صورتان لمتزلّج بلباس أزرق وقبّعة وقفازين حمراوين على زلّاجتين. المتزلّج على اليسار مُعلَّم بالرمز $F$ وعليه النقاط $N$ و $M$ و $P$ و $S$ والنقطة $A$، والمتزلّج على اليمين مُعلَّم بالرمز $F'$ وعليه النقاط $N'$ و $M'$ و $P'$ و $S'$ والنقطة $B$.",
                source: { page: BOOK_PAGE_6, locator: 'صورة المتزلّج' },
                reason:
                  'رسم فنّي نقطي (raster) لشخص؛ لا يمكن إعادة إنتاجه بأمانة كرسم متجهي، ولا توجد صورة مصدر معتمدة للنشر.',
              },
            },
            {
              type: 'math',
              latex: "MM' = NN' = AB \\qquad (NN') \\parallel (AB) \\qquad (MM') \\parallel (AB)",
            },
          ],
        },

        // ── شرح المنصّة ──
        teachingEveryPoint,

        /* ──────────────────────────────────────────────────────────────────
         *  STEP 4 — page 6: خواص الانسحاب + في الصورة السابقة
         * ────────────────────────────────────────────────────────────────── */
        {
          id: 'step-04-properties-of-translation',
          kicker: 'تعلّم',
          title: 'خواص الانسحاب',
          source: { page: BOOK_PAGE_6, locator: 'خواص الانسحاب' },
          blocks: [
            {
              type: 'callout',
              variant: 'theorem',
              title: 'خواص الانسحاب',
              blocks: [
                { type: 'paragraph', text: 'يحافظ الانسحاب على:' },
                {
                  type: 'list',
                  ordered: false,
                  items: ['الأطوال', 'الاستقامة', 'قياس الزوايا', 'المساحات'],
                },
              ],
            },
            { type: 'paragraph', text: 'في الصورة السابقة' },
            {
              type: 'list',
              ordered: false,
              items: [
                "$M'$ و $N'$ و $P'$ و $S'$ هي صور النقاط $M$ و $N$ و $P$ و $S$ وفق الانسحاب الذي ينقل النقطة $A$ إلى النقطة $B$.",
                "$M'N' = MN$",
                "النقاط $M$ و $S$ و $P$ على استقامة واحدة، فالنقاط $M'$ و $S'$ و $P'$ على استقامة واحدة.",
                "$\\widehat{S'M'N'} = \\widehat{SMN}$",
                "مساحة المثلث $S'M'N'$ تساوي مساحة المثلث $SMN$.",
              ],
            },
          ],
        },

        // ── شرح المنصّة ──
        teachingWhyPreserved,

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
              text: 'لدينا في الشكل التالي 15 متوازي أضلاع مرقمة من الرقم 1 حتى الرقم 15.',
            },
            {
              type: 'figure',
              diagram: {
                kind: 'reference',
                id: 'fig-6-b-fifteen-parallelograms',
                alt: "شريط أفقي من 15 متوازي أضلاع متطابقة، مرتّبة في ثلاثة صفوف وخمسة أعمدة، ملوّنة بالأزرق الفاتح والأصفر بالتناوب. الأرقام من ① حتى ⑮ موزّعة على الأشكال، وعلى الشكل حروف $A$ و $B$ و $C$ و $D$ و $E$ و $F$ في السطر الأوسط، و $A'$ و $B'$ و $C'$ و $D'$ و $E'$ و $F'$ في السطر السفلي.",
                source: { page: BOOK_PAGE_6, locator: 'شكل تحقّق من فهمك' },
                reason:
                  'تعذّر التحقّق من ميل متوازيات الأضلاع، ومن توزيع الألوان، ومن المواضع الدقيقة للنقاط المُعلَّمة على الشبكة؛ وهي تفاصيل تحدّد إجابات الأسئلة الستة.',
              },
            },
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

        // ── شرح المنصّة ──
        teachingWorkedExample,

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
            {
              type: 'figure',
              diagram: {
                kind: 'reference',
                id: 'fig-7-a-four-counterexamples',
                alt: 'أربع خانات متجاورة مرقّمة من ① إلى ④ من اليمين إلى اليسار، في كل خانة شكل أزرق وشكل أحمر. الخانة ① فيها شكل مضلّع يشبه السهم، والخانة ② فيها الحرف اللاتيني $A$، والخانة ③ فيها شكل عَلَم، والخانة ④ فيها دائرتان.',
                source: { page: BOOK_PAGE_7, locator: 'شكل السؤال ②' },
                reason:
                  'الشكل مركّب من أربع خانات؛ لا يمكن رسم حدود الأشكال في الخانات ① و ② و ③ بأمانة من دقة الصورة المتاحة، وإعادة إنتاج جزء منه دون الباقي تُعدّ تعديلاً للشكل.',
              },
            },
          ],
        },

        // ── شرح المنصّة ──
        teachingCommonMistakes,

        /* ──────────────────────────────────────────────────────────────────
         *  STEP 7 — page 7: تدرّب ①
         * ────────────────────────────────────────────────────────────────── */
        {
          id: 'step-07-practice-triangular-tiling',
          kicker: 'تدرُب',
          title: 'الترصيف المثلثي',
          source: { page: BOOK_PAGE_7, locator: 'تدرُب — ①' },
          blocks: [
            {
              type: 'callout',
              variant: 'activity',
              title: 'تحضير',
              blocks: [{ type: 'paragraph', text: 'قص الشكل واستعمله في التدرب الآتي' }],
            },
            { type: 'paragraph', text: 'تأمل الشكل التالي:' },
            {
              type: 'figure',
              diagram: {
                kind: 'reference',
                id: 'fig-7-b-triangular-lattice',
                alt: 'شبكة مثلثية زرقاء فاتحة، عليها ثمانية أشكال صفراء مرقّمة من ① إلى ⑧، موزّعة في صفّين.',
                source: { page: BOOK_PAGE_7, locator: 'شكل تدرُب ①' },
                reason:
                  'تعذّر تحديد حدود الأشكال الثمانية ومواضعها على الشبكة المثلثية من دقة الصورة المتاحة.',
              },
            },
            { type: 'paragraph', text: 'دلّ على كل شكل وصورته وفق انسحاب.' },
          ],
        },

        /* ──────────────────────────────────────────────────────────────────
         *  STEP 8 — page 7: تدرّب ②
         * ────────────────────────────────────────────────────────────────── */
        {
          id: 'step-08-practice-semicircle-area',
          kicker: 'تدرُب',
          title: 'نصف الدائرة والمساحة',
          source: { page: BOOK_PAGE_7, locator: 'تدرُب — ②' },
          blocks: [
            { type: 'paragraph', text: 'تأمل الشكل المرسوم جانباً.' },
            {
              type: 'figure',
              diagram: {
                kind: 'reference',
                id: 'fig-7-c-rectangle-with-semicircles',
                alt: 'شكل مستطيل $ABCD$ ملوّن بالأزرق الفاتح، رؤوسه $A$ في الأعلى يساراً و $B$ في الأعلى يميناً و $D$ في الأسفل يساراً و $C$ في الأسفل يميناً. طول الضلع العلوي $6 \\ \\mathrm{cm}$ وطول الضلع الجانبي $3 \\ \\mathrm{cm}$، وعلى طرفَي الشكل نصفا دائرة، والقطعتان $[AD]$ و $[BC]$ مرسومتان بخط أحمر متقطّع.',
                source: { page: BOOK_PAGE_7, locator: 'شكل تدرُب ②' },
                reason:
                  'تعذّر التحقّق من اتجاه نصفَي الدائرة (بارز إلى الخارج أم مقتطع إلى الداخل)، وهو ما يحدّد قيمة المساحة المطلوبة في السؤال الثاني.',
              },
            },
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
        // ── شرح المنصّة ──
        teachingRecap,
      ],

      /** Platform-authored final assessment (10 questions). */
      assessment: lesson01Assessment,

      /** Teacher-only; rendered exclusively behind the Teacher Area gate. */
      teacherResources: lesson01TeacherResources,
    },

    /* ======================================================================
     *  الدرس الثاني — «صورة نقطة وفق انسحاب» (صفحات 8–10)
     * ==================================================================== */
    lesson02,

    /* ======================================================================
     *  الدرس الثالث — «صورة شكل وفق انسحاب» (صفحات 11–16)
     *  Registry-driven routes, progress and Teacher Area discover it here.
     * ==================================================================== */
    lesson03,

    /* ======================================================================
     *  الدرس الرابع — «تطابق المثلثات» (صفحات 17–19)
     * ==================================================================== */
    lesson04,

    /* الدرس الخامس — تمرينات الوحدة الأولى؛ الدفعة الأولى: السؤالان 1 و2 فقط. */
    lesson05,
  ],
};
