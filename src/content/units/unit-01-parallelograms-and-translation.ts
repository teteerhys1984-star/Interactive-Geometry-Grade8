import type { UnitInput } from '../schema';
import { launchSteps, lesson01Figure, reasoning } from './lesson-01-start';
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
import { lesson06 } from './lesson-06-unit-exercises-continuation';
import { lesson07 } from './lesson-07-unit-exercises-final';

/** Lesson 1 only: verified pages 3–7. Printed prompts are kept separate from
 * platform-derived reasoning. Check/practice prompts live in lesson-01-exercises
 * and the existing Teacher Area; no authentication or hosting changes. Source
 * artwork is not republished without permission. See docs/LESSON-01-COVERAGE.md. */

const BOOK_PAGE_5 = 5;
const BOOK_PAGE_6 = 6;

export const unit01: UnitInput = {
  id: 'unit-01-parallelograms-and-translation',
  title: 'متوازيات الأضلاع والانسحاب',
  source: { page: 3, locator: 'الوحدة الأولى' },

  lessons: [
    {
      id: 'lesson-01-translation-and-properties',
      title: 'الانسحاب وخواصه',
      source: { page: '3–7', locator: 'الدرس الأول مع انطلاقة الوحدة' },

      // The textbook prints no summary, objectives or vocabulary list for this
      // lesson. Those fields are intentionally left absent rather than invented.

      steps: [
        // ── شرح المنصّة (مُعدّ من المنصّة، ليس من الكتاب) ──
        ...launchSteps,
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
            lesson01Figure('pavement', 5, 'الترصيف والأحجار الاثنا عشر والنقاط المعلّمة'),
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
            reasoning(
              'حلّ النشاط 1 — تتبّع النقل ثم علّل',
              '1. ضع القصاصتين بالاتجاه نفسه. علّم $A,C,E$ على القصاصة الأولى. المستقيمات $(AB)$ و$(CD)$ و$(EF)$ أفقية ومتوازية على الترصيف؛ وهي مسارات النقاط في هذا النقل.',
              '2. تنطبق ① على ② بانزلاق إلى اليسار دون دوران. جرّب شريط الحركة: تتحرك جميع زوايا القصاصة بالمقدار نفسه، فلا يتغير شكلها.',
              '3. بالنقل نفسه تكون صورة $A$ هي $B$، وصورة $C$ هي $D$، وصورة $E$ هي $F$. الحجر ④ ينتقل إلى موضع ⑤، والحجر ⑨ إلى موضع ⑩. نتحقق بمقارنة الزوايا المناظرة، لا بمراكز الأحجار وحدها.',
              '4. في $ABDC$ يتوازى ويتساوى $[AB]$ و$[CD]$ لأنهما مسارا نقطتين في الانسحاب نفسه؛ فهو متوازي أضلاع. وبالمثل $[AB]$ و$[EF]$ متوازيان ومتساويان، فيكون $ABFE$ متوازي أضلاع. ارسم الأضلاع وفق ترتيب كل اسم، ولا تخلط الضلع بالقطر.',
            ),
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
            lesson01Figure('pavement-second', 5, 'الترصيف والانسحاب الناقل A إلى M'),
            {
              type: 'questionGroup',
              items: [
                {
                  label: '1.',
                  text: 'هذه المرة، وفق الانسحاب الذي ينقل النقطة $A$ إلى النقطة $M$. ما صورة الحجر ①؟ وما صورة الحجر ⑥؟ وما صورة كل من النقطتين $C$ و $E$؟ وأخيراً، ما صورة الحجر ⑦؟',
                },
                {
                  label: '2.',
                  text: 'هل يوجد انسحاب ينقل الحجر ⑧ إلى الحجر ⑪؟ إنْ نعم، ما هو؟',
                },
              ],
            },
            reasoning(
              'حلّ النشاط 2 — الناقل تغيّر لكن القاعدة ثابتة',
              '1. الاتجاه الآن من $A$ إلى $M$، أي مائل نحو اليسار والأسفل. ننقل كل زاوية بالمقدار والاتجاه نفسيهما: صورة ① هي ④، وصورة ⑥ هي ⑪، وصورة $C$ هي $N$، وصورة $E$ هي $P$، وصورة ⑦ هي ⑩.',
              'للتحقق ضع القصاصة على الهدف: يجب أن تتطابق جميع الزوايا، لا زاوية واحدة فقط. لون الحجر لا يغيّر حدوده الهندسية.',
              '2. نعم، ينقل الانسحاب الذي ينقل $B$ إلى $M$ الحجر ⑧ إلى ⑪؛ الفرق بين زاويتين متناظرتين هو نفسه الفرق من $B$ إلى $M$. نتحقق من بقاء اتجاه الصليب وحجم كل ذراع، ثم من انطباق حدوده كاملة.',
            ),
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
            lesson01Figure(
              'translation',
              6,
              'بديل تعليمي يوضح انسحاب شكل ثابت دون تدوير أو تغيير أبعاده',
            ),
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
            reasoning(
              'اقرأ العلاقات دون الحاجة إلى صورة المتزلّج',
              'في الكتاب يظهر متزلّج ونظيره. لا ننشر الرسم الأصلي دون إذن. الرسم التعليمي هنا بديل معلن: نسمّي الشكل قبل الحركة وبعدها، وننقل كل نقطة بالاتجاه والمقدار نفسيهما. لذلك تنطبق العلاقات الآتية على النقاط المتناظرة في مثال الكتاب، وليست معلومات تؤخذ من مظهر الرسم البديل.',
            ),
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

        teachingWorkedExample,
        teachingCommonMistakes,
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

    /* تتمة مستقلة للدرس الخامس — تمرينات الوحدة الأولى: الأسئلة 3–15. */
    lesson06,

    /* تتمة مستقلة ثانية — تمرينات الوحدة الأولى: الأسئلة 16–28، وبها تكتمل المجموعة. */
    lesson07,
  ],
};
