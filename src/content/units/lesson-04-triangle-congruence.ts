import type { ContentBlock, DiagramSpec, LessonInput } from '../schema';
import { lesson04Assessment } from './lesson-04-assessment';
import { lesson04TeacherResources } from './lesson-04-teacher';
import {
  teachCasesLab,
  teachCheckWalkthrough,
  teachChoosingCase,
  teachKiteLab,
  teachPairsLab,
  teachProofLab,
  teachRecap,
  teachWhyCongruence,
} from './lesson-04-teaching';
import {
  fig17Cases,
  fig18Asa,
  fig18Sas,
  fig18Sss,
  fig19Check,
  fig19Isosceles,
  fig19Kite,
  fig19Pairs,
  figTranslation,
  figDefinitionPair,
} from './lesson-04-figures';
import {
  L4_ACTIVITY_HINT,
  L4_ACTIVITY_QUESTIONS,
  L4_CASE_ONE,
  L4_CASE_THREE,
  L4_CASE_TWO,
  L4_CHECK_QUESTION,
  L4_DEFINITION,
  L4_DEFINITION_HINT,
  L4_EXAMPLE_ONE,
  L4_EXAMPLE_THREE,
  L4_EXAMPLE_TWO,
  L4_HEADING,
  L4_PRACTICE_ONE,
  L4_PRACTICE_THREE_INTRO,
  L4_PRACTICE_THREE_NOTE,
  L4_PRACTICE_THREE_QUESTIONS,
  L4_PRACTICE_TWO,
  L4_RIGHT_TRIANGLES_ITEMS,
  L4_RIGHT_TRIANGLES_NOTE,
} from './lesson-04-questions';

/**
 * ============================================================================
 *  الدرس الرابع — «تطابق المثلثات» (صفحات 17–19)
 * ============================================================================
 *
 *  Every printed sentence of the three supplied pages is reproduced verbatim,
 *  in printed order, inside a `source` step that names its page. The
 *  platform's own explanations are separate `authored` steps badged
 *  «شرح المنصّة», and every printed figure is rebuilt natively from the values
 *  printed on it (see `lesson-04-figures.ts` and `docs/LESSON-04-FIGURES.md`).
 *
 *  No exercise is dropped, reordered or replaced: the coverage matrix in
 *  `docs/LESSON-04-COVERAGE.md` maps all eleven printed prompts — and the
 *  thirteen Teacher Area solutions they require — to their steps.
 * ============================================================================
 */

const p = (text: string): ContentBlock => ({ type: 'paragraph', text });

const block = (diagram: DiagramSpec): ContentBlock => ({ type: 'figure', diagram });

export const lesson04: LessonInput = {
  id: 'lesson-04-triangle-congruence',
  title: 'تطابق المثلثات',
  source: { page: '17–19', locator: 'الدرس الرابع' },
  estimatedMinutes: 45,

  steps: [
    /* ── شرح المنصّة ─────────────────────────────────────────────────── */
    teachWhyCongruence,

    /* ── صفحة 17 — النشاط ─────────────────────────────────────────────── */
    {
      id: 'l4-step-01-activity',
      origin: 'source',
      kicker: 'نشاط «اكتشاف حالات تطابق المثلثات انطلاقاً من الانسحاب»',
      title: 'حالات تطابق مثلثين',
      source: { page: 17, locator: 'نشاط — 1 إلى 4' },
      blocks: [
        {
          type: 'callout',
          variant: 'hint',
          blocks: [p(L4_ACTIVITY_HINT)],
        },
        block(figTranslation),
        block(fig17Cases),
        { type: 'questionGroup', items: L4_ACTIVITY_QUESTIONS },
      ],
    },

    /* ── صفحة 17 — التعريف ────────────────────────────────────────────── */
    {
      id: 'l4-step-02-definition',
      origin: 'source',
      kicker: 'تعلّم — تعريف',
      title: 'تعريف تطابق مثلثين',
      source: { page: 17, locator: 'تعلّم — تعريف' },
      blocks: [
        block(figDefinitionPair),
        {
          type: 'callout',
          variant: 'definition',
          blocks: [p(L4_DEFINITION)],
        },
        {
          type: 'callout',
          variant: 'hint',
          blocks: [p(L4_DEFINITION_HINT)],
        },
      ],
    },

    /* ── صفحة 17 — الحالة الأولى ──────────────────────────────────────── */
    {
      id: 'l4-step-03-case-one',
      origin: 'source',
      kicker: 'حالات تطابق مثلثين',
      title: 'الحالة ①: ضلعان والزاوية المحصورة',
      source: { page: 17, locator: 'حالات تطابق مثلثين — ①' },
      blocks: [
        {
          type: 'callout',
          variant: 'theorem',
          title: L4_HEADING,
          blocks: [
            {
              type: 'paragraph',
              text: '① ' + L4_CASE_ONE,
            },
          ],
        },
      ],
    },

    /* ── شرح المنصّة — مختبر الحالات ──────────────────────────────────── */
    teachCasesLab,

    /* ── صفحة 18 — المثال الأول ───────────────────────────────────────── */
    {
      id: 'l4-step-04-example-one',
      origin: 'source',
      kicker: 'مثال — الحالة ①',
      title: 'تطبيق: الزاويتان المتقابلتان بالرأس',
      source: { page: 18, locator: 'المثال الأول' },
      blocks: [
        block(fig18Sas),
        p(L4_EXAMPLE_ONE.lead),
        p(L4_EXAMPLE_ONE.verticalAngles),
        p(L4_EXAMPLE_ONE.lengths),
        p(L4_EXAMPLE_ONE.conclusion),
      ],
    },

    /* ── صفحة 18 — الحالة الثانية ─────────────────────────────────────── */
    {
      id: 'l4-step-05-case-two',
      origin: 'source',
      kicker: 'حالات تطابق مثلثين',
      title: 'الحالة ②: ضلع وزاويتان مجاورتان',
      source: { page: 18, locator: 'حالات تطابق مثلثين — ②' },
      blocks: [
        {
          type: 'callout',
          variant: 'theorem',
          blocks: [{ type: 'paragraph', text: '② ' + L4_CASE_TWO }],
        },
      ],
    },

    /* ── صفحة 18 — المثال الثاني ─────────────────────────────────────── */
    {
      id: 'l4-step-06-example-two',
      origin: 'source',
      kicker: 'مثال — الحالة ②',
      title: 'تطبيق: متوازي الأضلاع والمستطيل',
      source: { page: 18, locator: 'المثال الثاني' },
      blocks: [
        block(fig18Asa),
        p(L4_EXAMPLE_TWO.givens),
        p(L4_EXAMPLE_TWO.sides),
        p(L4_EXAMPLE_TWO.difference),
        p(L4_EXAMPLE_TWO.oppositeAngles),
        p(L4_EXAMPLE_TWO.rightAngles),
        p(L4_EXAMPLE_TWO.conclusion),
      ],
    },

    /* ── صفحة 18 — الحالة الثالثة ─────────────────────────────────────── */
    {
      id: 'l4-step-07-case-three',
      origin: 'source',
      kicker: 'حالات تطابق مثلثين',
      title: 'الحالة ③: الأضلاع الثلاثة',
      source: { page: 18, locator: 'حالات تطابق مثلثين — ③' },
      blocks: [
        {
          type: 'callout',
          variant: 'theorem',
          blocks: [{ type: 'paragraph', text: '③ ' + L4_CASE_THREE }],
        },
      ],
    },

    /* ── صفحة 18 — المثال الثالث ─────────────────────────────────────── */
    {
      id: 'l4-step-08-example-three',
      origin: 'source',
      kicker: 'مثال — الحالة ③',
      title: 'تطبيق: قطر متوازي الأضلاع',
      source: { page: 18, locator: 'المثال الثالث' },
      blocks: [
        block(fig18Sss),
        p(L4_EXAMPLE_THREE.givens),
        p(L4_EXAMPLE_THREE.commonSide),
        p(L4_EXAMPLE_THREE.oppositeSides),
        p(L4_EXAMPLE_THREE.conclusion),
      ],
    },

    /* ── شرح المنصّة — اختيار الحالة ──────────────────────────────────── */
    teachChoosingCase,

    /* ── صفحة 19 — تحقّق من فهمك ──────────────────────────────────────── */
    {
      id: 'l4-step-09-check',
      origin: 'source',
      kicker: 'تحقّق من فهمك',
      title: 'برهن أن المثلثين طبوقان',
      source: { page: 19, locator: 'تحقّق من فهمك' },
      blocks: [
        block(fig19Check),
        { type: 'questionGroup', items: [{ text: L4_CHECK_QUESTION }] },
      ],
    },

    /* ── شرح المنصّة — برهان المستطيل ─────────────────────────────────── */
    teachCheckWalkthrough,

    /* ── صفحة 19 — تدرّب ① ────────────────────────────────────────────── */
    {
      id: 'l4-step-10-practice-one',
      origin: 'source',
      kicker: 'تدرّب — ①',
      title: 'الطائرة الورقية',
      source: { page: 19, locator: 'تدرّب — ①' },
      blocks: [
        block(fig19Kite),
        { type: 'questionGroup', items: [{ label: '①', text: L4_PRACTICE_ONE }] },
      ],
    },

    /* ── شرح المنصّة — مختبر الطائرة ─────────────────────────────────── */
    teachKiteLab,

    /* ── صفحة 19 — تدرّب ② ────────────────────────────────────────────── */
    {
      id: 'l4-step-11-practice-two',
      origin: 'source',
      kicker: 'تدرّب — ②',
      title: 'في كل حالة، علل تطابق المثلثين',
      source: { page: 19, locator: 'تدرّب — ②' },
      blocks: [
        block(fig19Pairs),
        { type: 'questionGroup', items: [{ label: '②', text: L4_PRACTICE_TWO }] },
      ],
    },

    /* ── شرح المنصّة — مختبر الحالات ──────────────────────────────────── */
    teachPairsLab,

    /* ── صفحة 19 — تدرّب ③ ────────────────────────────────────────────── */
    {
      id: 'l4-step-12-practice-three',
      origin: 'source',
      kicker: 'تدرّب — ③',
      title: 'برهان في مثلث متساوي الساقين',
      source: { page: 19, locator: 'تدرّب — ③' },
      blocks: [
        block(fig19Isosceles),
        p(L4_PRACTICE_THREE_INTRO),
        { type: 'questionGroup', items: L4_PRACTICE_THREE_QUESTIONS },
        p(L4_PRACTICE_THREE_NOTE),
      ],
    },

    /* ── شرح المنصّة — مختبر البرهان ──────────────────────────────────── */
    teachProofLab,

    /* ── صفحة 19 — الملاحظة الختامية ──────────────────────────────────── */
    {
      id: 'l4-step-13-right-triangles',
      origin: 'source',
      kicker: 'ملاحظة',
      title: 'تطابق مثلثين قائمين',
      source: { page: 19, locator: 'الملاحظة الختامية' },
      blocks: [
        {
          type: 'callout',
          variant: 'hint',
          blocks: [
            p(L4_RIGHT_TRIANGLES_NOTE),
            { type: 'list', ordered: false, items: L4_RIGHT_TRIANGLES_ITEMS },
          ],
        },
      ],
    },

    /* ── شرح المنصّة — مراجعة ─────────────────────────────────────────── */
    teachRecap,
  ],

  assessment: lesson04Assessment,
  teacherResources: lesson04TeacherResources,
};
