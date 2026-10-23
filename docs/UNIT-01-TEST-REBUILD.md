# Unit 1 Comprehensive Test Rebuild — «متوازيات الأضلاع والانسحاب» (`unit-01-test`)

## Scope and isolation

This document records the rebuild **in place** of the Unit 1 comprehensive test,
`unit-01-test` (Unit 1: _«متوازيات الأضلاع والانسحاب»_, textbook pages **5–19**).

- **The test id never changes:** `unit-01-test`. All **60** question ids
  `geo-u01-t01-q01 … q60` are kept, in the same order, so the Test Area, the
  Solutions Area, the saved sessions, the route tests and the visual-audit
  inventory keep resolving the same questions.
- **Touched files (5 only):**
  1. `src/tests/definitions/unit-01.ts`
  2. `src/tests/questions/unit-01.ts`
  3. `src/tests/solutions/unit-01-test.ts`
  4. `src/tests/unit01-detailed.test.tsx`
  5. `docs/UNIT-01-TEST-REBUILD.md`
- **Strict isolation preserved:**
  - Zero edits to `src/tests/schema.ts`, `scoring.ts`, `registry.ts`,
    `solutionAudit.ts`, `visualAudit.ts`, `visualAudit.test.ts`, `authoring.ts`.
  - Zero edits to `src/content/**` (lessons, labs, in-lesson assessments).
  - Zero edits to the four lesson tests (`lesson-01-test … lesson-04-test`).
  - Zero edits to routes, pages or shared styles.

---

## Defects fixed from the legacy bank

1. **Scope was wrong.** The legacy 60 items were the 28 printed unit exercises of
   Lessons 5–7 plus filler, so the «comprehensive» test did not test the unit's
   concepts at all. The 28 printed exercises are **excluded** here; Lessons 5–7
   keep their own lesson tests untouched.
2. **Wrong page attributions.** The old header claimed pages 15 / 25 / 14 / 6 and
   several items cited pages **20–23**, which are outside the four concept lessons
   (5–7, 8–10, 11–16, 17–19). Every `sourceRefs` entry now points inside 5–19,
   and each lesson question stays inside its own lesson's pages.
3. **Stale header comment** describing the old exercise-based mix is replaced by a
   header that states the real scope, the real point arithmetic and the figure
   policy.
4. **Implicit `'legacy'` solution policy** replaced by `solutionPolicy: 'detailed'`
   and 60 fully rewritten solutions on the same contract as the lesson tests
   (`answerSummary`, `given`, `steps`, `rule`, `check`, `commonError`,
   `diagramNotes`, `scoringCriteria`, `provenance`, and `parts` for composites).
5. **Weights were not verified.** Hand-picked point values disagreed with the
   grader. Every weight below is now the value returned by
   `gradeQuestionDetailed(question, undefined).maxPoints`, and every
   `scoringCriteria` total equals that same maximum.

---

## Blueprint

Coverage — 12 questions per concept, `20` points each (a fifth of the test):

| Concept                     | Lesson                                                        | Questions | Points |
| --------------------------- | ------------------------------------------------------------- | --------: | -----: |
| `u1-translation-properties` | الدرس 1: مفهوم الانسحاب وخواص الحفظ (ص 5–7)                   |        12 |     20 |
| `u1-image-point`            | الدرس 2: صورة نقطة ومتوازي الأضلاع والإنشاء بالفرجار (ص 8–10) |        12 |     20 |
| `u1-image-shape`            | الدرس 3: صورة مستقيم وقطعة ونصف مستقيم ودائرة ومضلع (ص 11–16) |        12 |     20 |
| `u1-triangle-congruence`    | الدرس 4: حالات تطابق المثلثين والمثلثان القائمان (ص 17–19)    |        12 |     20 |
| `u1-integration`            | أسئلة تركيب أصلية تربط درسين أو أكثر                          |        12 |     20 |

Difficulty — `basic 14`, `medium 22`, `advanced 18`, `thinking 6`.

Types — all sixteen authoring types are present:

| Type                 | Count | Type                         | Count |
| -------------------- | ----: | ---------------------------- | ----: |
| `single-choice`      |    16 | `ordering`                   |     3 |
| `multi-select`       |     5 | `matching`                   |     3 |
| `true-false`         |     8 | `classification`             |     1 |
| `true-false-justify` |     4 | `justification`              |     2 |
| `short-answer`       |     1 | `multi-part`                 |     2 |
| `fill-in`            |     2 | `diagram-reading`            |     1 |
| `numeric`            |     5 | `transformation-application` |     1 |
| `exact`              |     2 | `error-analysis`             |     4 |

### Points — 100, derived from the engine

The proposed 60-item mix sums to **100**, not 102. Nothing is inflated:

- **1 point each (40 questions)** — `single-choice`, `multi-select`,
  `true-false`, `numeric`, `exact`, `fill-in`, `short-answer`,
  `classification`. These graders are all-or-nothing.
- **3 points each (20 questions)** — `error-analysis` (location 1 + correction 1
  - reason 1), `true-false-justify` (verdict 1 + correction 1 + reason 1),
    `ordering` (one point per correctly placed step), `matching` (one point per
    pair), `justification` (three scored steps), and the three structured types
    `multi-part` / `diagram-reading` / `transformation-application` (three scored
    parts each).

`40 × 1 + 20 × 3 = 100`. Passing score is **60 / 100** — 60 % exactly, no
rounding ambiguity. `solutionGroupSize` is `10` (six solution groups of ten).

An early draft hand-declared a 3-point `true-false-justify` with only a verdict
and a reason part; the grader awards `1 + 1 = 2` for that shape. It was rewritten
with a real `correction` part rather than editing the grader, which is what
closed the 99/100 gap.

---

## Question matrix

`Pts` is the engine maximum. `Fig` marks the three audited figures. `Pages`
lists the cited textbook pages; integration items must cite two different
lessons.

| ID                | Type                         | Concept                | Difficulty | Pts | Fig | Pages     |
| ----------------- | ---------------------------- | ---------------------- | ---------- | --: | :-: | --------- |
| `geo-u01-t01-q01` | `single-choice`              | translation-properties | basic      |   1 |  –  | 5, 6      |
| `geo-u01-t01-q02` | `true-false`                 | translation-properties | basic      |   1 |  –  | 6         |
| `geo-u01-t01-q03` | `single-choice`              | translation-properties | basic      |   1 |  –  | 6         |
| `geo-u01-t01-q04` | `true-false`                 | translation-properties | medium     |   1 |  –  | 6         |
| `geo-u01-t01-q05` | `multi-select`               | translation-properties | medium     |   1 |  –  | 6, 7      |
| `geo-u01-t01-q06` | `ordering`                   | translation-properties | medium     |   3 |  –  | 6         |
| `geo-u01-t01-q07` | `matching`                   | translation-properties | medium     |   3 |  –  | 6, 7      |
| `geo-u01-t01-q08` | `exact`                      | translation-properties | advanced   |   1 |  –  | 6         |
| `geo-u01-t01-q09` | `error-analysis`             | translation-properties | advanced   |   3 |  –  | 6, 7      |
| `geo-u01-t01-q10` | `true-false-justify`         | translation-properties | advanced   |   3 |  –  | 6         |
| `geo-u01-t01-q11` | `single-choice`              | translation-properties | thinking   |   1 |  –  | 6         |
| `geo-u01-t01-q12` | `single-choice`              | translation-properties | thinking   |   1 |  –  | 6         |
| `geo-u01-t01-q13` | `single-choice`              | image-point            | basic      |   1 |  –  | 8         |
| `geo-u01-t01-q14` | `true-false`                 | image-point            | basic      |   1 |  –  | 10        |
| `geo-u01-t01-q15` | `single-choice`              | image-point            | basic      |   1 |  –  | 9         |
| `geo-u01-t01-q16` | `classification`             | image-point            | basic      |   1 |  –  | 8, 9      |
| `geo-u01-t01-q17` | `true-false`                 | image-point            | medium     |   1 |  –  | 9         |
| `geo-u01-t01-q18` | `multi-select`               | image-point            | medium     |   1 |  –  | 8         |
| `geo-u01-t01-q19` | `error-analysis`             | image-point            | advanced   |   3 |  ✔  | 9, 10     |
| `geo-u01-t01-q20` | `fill-in`                    | image-point            | medium     |   1 |  –  | 8         |
| `geo-u01-t01-q21` | `matching`                   | image-point            | medium     |   3 |  –  | 8, 9      |
| `geo-u01-t01-q22` | `true-false-justify`         | image-point            | medium     |   3 |  –  | 9         |
| `geo-u01-t01-q23` | `single-choice`              | image-point            | advanced   |   1 |  –  | 10        |
| `geo-u01-t01-q24` | `multi-part`                 | image-point            | advanced   |   3 |  –  | 8, 10     |
| `geo-u01-t01-q25` | `single-choice`              | image-shape            | basic      |   1 |  –  | 11, 12    |
| `geo-u01-t01-q26` | `true-false`                 | image-shape            | basic      |   1 |  –  | 13        |
| `geo-u01-t01-q27` | `single-choice`              | image-shape            | basic      |   1 |  –  | 14        |
| `geo-u01-t01-q28` | `true-false`                 | image-shape            | medium     |   1 |  –  | 14        |
| `geo-u01-t01-q29` | `multi-select`               | image-shape            | medium     |   1 |  –  | 13, 15    |
| `geo-u01-t01-q30` | `numeric`                    | image-shape            | medium     |   1 |  –  | 15        |
| `geo-u01-t01-q31` | `short-answer`               | image-shape            | medium     |   1 |  –  | 15        |
| `geo-u01-t01-q32` | `ordering`                   | image-shape            | medium     |   3 |  –  | 16        |
| `geo-u01-t01-q33` | `true-false-justify`         | image-shape            | advanced   |   3 |  –  | 11, 12    |
| `geo-u01-t01-q34` | `justification`              | image-shape            | advanced   |   3 |  –  | 11–13     |
| `geo-u01-t01-q35` | `multi-part`                 | image-shape            | advanced   |   3 |  –  | 13, 15    |
| `geo-u01-t01-q36` | `single-choice`              | image-shape            | thinking   |   1 |  –  | 11, 12    |
| `geo-u01-t01-q37` | `diagram-reading`            | triangle-congruence    | advanced   |   3 |  ✔  | 19        |
| `geo-u01-t01-q38` | `numeric`                    | triangle-congruence    | thinking   |   1 |  ✔  | 19        |
| `geo-u01-t01-q39` | `single-choice`              | triangle-congruence    | basic      |   1 |  –  | 17        |
| `geo-u01-t01-q40` | `true-false`                 | triangle-congruence    | basic      |   1 |  –  | 18        |
| `geo-u01-t01-q41` | `single-choice`              | triangle-congruence    | basic      |   1 |  –  | 17        |
| `geo-u01-t01-q42` | `multi-select`               | triangle-congruence    | medium     |   1 |  –  | 17, 18    |
| `geo-u01-t01-q43` | `exact`                      | triangle-congruence    | medium     |   1 |  –  | 17, 19    |
| `geo-u01-t01-q44` | `fill-in`                    | triangle-congruence    | medium     |   1 |  –  | 19        |
| `geo-u01-t01-q45` | `matching`                   | triangle-congruence    | medium     |   3 |  –  | 17, 18    |
| `geo-u01-t01-q46` | `true-false-justify`         | triangle-congruence    | advanced   |   3 |  –  | 17, 18    |
| `geo-u01-t01-q47` | `error-analysis`             | triangle-congruence    | advanced   |   3 |  –  | 18        |
| `geo-u01-t01-q48` | `single-choice`              | triangle-congruence    | advanced   |   1 |  –  | 19        |
| `geo-u01-t01-q49` | `ordering`                   | integration            | medium     |   3 |  –  | 8, 18     |
| `geo-u01-t01-q50` | `single-choice`              | integration            | basic      |   1 |  –  | 6, 15     |
| `geo-u01-t01-q51` | `true-false`                 | integration            | medium     |   1 |  –  | 6, 17     |
| `geo-u01-t01-q52` | `multi-select`               | integration            | medium     |   1 |  –  | 6, 18     |
| `geo-u01-t01-q53` | `numeric`                    | integration            | medium     |   1 |  –  | 6, 13     |
| `geo-u01-t01-q54` | `numeric`                    | integration            | advanced   |   1 |  –  | 8, 18     |
| `geo-u01-t01-q55` | `justification`              | integration            | advanced   |   3 |  –  | 6, 13     |
| `geo-u01-t01-q56` | `single-choice`              | integration            | advanced   |   1 |  –  | 6, 17     |
| `geo-u01-t01-q57` | `transformation-application` | integration            | advanced   |   3 |  –  | 9, 13, 18 |
| `geo-u01-t01-q58` | `numeric`                    | integration            | advanced   |   1 |  –  | 9, 17     |
| `geo-u01-t01-q59` | `error-analysis`             | integration            | thinking   |   3 |  –  | 6, 18     |
| `geo-u01-t01-q60` | `single-choice`              | integration            | thinking   |   1 |  –  | 13, 18    |

---

## Originality against the four lesson tests

The bank was written from scratch for this test. It is checked mechanically in
`src/tests/unit01-detailed.test.tsx`:

- no prompt repeats a lesson-test prompt verbatim;
- the token-set Jaccard similarity between every unit prompt and every lesson
  prompt of Lessons 1–4 stays **below 0.7** (current worst value: 0.583);
- the two pairs flagged during preflight — `q18` ↔ `geo-l02-t01-q14` and `q37`
  ↔ `geo-l04-t01-q13` — are explicitly separated.

Three items were rewritten during the duplication pass:

| Item  | Old overlap strategy                               | New item                                                               |
| ----- | -------------------------------------------------- | ---------------------------------------------------------------------- |
| `q14` | a translation-statement true/false close to L1 q09 | grid translation computation: read the vector from coordinates         |
| `q32` | image-of-a-polygon ordering close to L3 q12        | ordering of the construction steps of a polygon image                  |
| `q47` | congruence error-analysis close to a lesson item   | diagonal-equality fallacy: equal diagonals do not give a parallelogram |

The 12 integration items are genuinely synthetic: each one cites at least two
different lessons and every solution names which two results it combines.

---

## Figures — three only, unchanged

The three existing figures are kept exactly as they were, and **no shared figure
code was touched**. `visualAudit.ts` / `visualAudit.test.ts` /
`mathRenderingAudit.test.tsx` pass unchanged against the rebuilt bank.

| Item  | Figure id                                   | Content                                                                                                                       |
| ----- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `q19` | `test-u01-q19-compass-intersections`        | given arrow `A → B`, two dashed compass circles, candidates `X`, `Y` both drawn open — the figure never picks the correct one |
| `q37` | `test-u01-q37-kite-triangle-correspondence` | kite `A(0,5) B(3,1) C(0,−5) D(−3,1)`, diagonal `[AC]`, one tick on `[AB]`/`[AD]`, two ticks on `[CB]`/`[CD]`                  |
| `q38` | `test-u01-q38-right-triangle-area`          | schematic right triangle with the right-angle mark, `5 cm` and `15 cm²` printed, no vertex labels, no marked answer           |

### Manual visual audit (360 px and 750 px)

Actually performed by rendering the real `TestGeometryFigure` output to SVG and
rasterising it at the width the figure receives at each viewport:

- **360 px viewport** → content column ≈ 328 px after `--space-4` page padding →
  figure rendered at **264 px** (checked at that width, deliberately narrower
  than the real column).
- **750 px viewport** → the figure caps at its `max-width: 520px` →
  rendered and checked at **520 px**.

Method: `render(<TestGeometryFigure spec={…} />)` for each of the three figures,
the emitted `<svg>` serialised with the component's real class names, the CSS
module colours inlined (the test environment does not load CSS modules), and the
result rasterised with `@resvg/resvg-js` in `/tmp` (outside the repository, no
dependency added). The six PNGs were inspected by eye.

Findings — **pass, no change needed**:

- `q19` at 264 px: both dashed circles are complete circles, no clipping; `A`,
  `B`, `M`, `X`, `Y` all legible; `X` and `Y` both render as open circles, so the
  figure cannot leak the answer; the arrowhead sits at `B` and its label stays
  readable next to it. At 520 px the same scene is comfortably spaced.
- `q37` at 264 px: the four sides and the diagonal are crisp; the single ticks on
  `[AB]`/`[AD]` and the double ticks on `[CB]`/`[CD]` are distinguishable at both
  widths; all four labels (`A`, `B`, `C`, `D`) are clear of the segments.
- `q38` at 264 px: the right-angle mark, `5 cm` and `15 cm²` are all legible and
  stay inside the drawing; the figure is labelled «غير مقيّس» in its caption, so
  its 4 : 2.7 box is not read as the real 5 : 6 ratio.
- No horizontal overflow at either width (the SVG is `width: 100%` with
  `max-width: 520px`), and no text collides with a stroke at either width.

---

## Solutions

`src/tests/solutions/unit-01-test.ts` exports 60 detailed solutions. For every
question:

- `answerSummary` restates the correct answer in words;
- `given` lists the data actually used;
- `steps` walks through the reasoning step by step;
- `rule` names the property or congruence case invoked, with its page;
- `check` verifies the result independently;
- `commonError` names the mistake the distractors encode;
- `diagramNotes` is present on all three figure items;
- `scoringCriteria` totals **exactly** the engine maximum of the question;
- composites carry `parts`, and each part's rubric total equals that part's own
  maximum;
- `provenance` splits `sourceVerified` (the pages of Lessons 1–4) from
  `platformAuthored` (the wording and the numbers invented for the test).

`solutionSetCompletenessIssues(...)` reports **0** issues for this set.

---

## Regression suite — `src/tests/unit01-detailed.test.tsx`

26 tests in 8 groups:

1. **bank and definition** — 60 stable ids in order, all resolved, published as
   the unit test of `unit-01-parallelograms-and-translation` on the `detailed` policy, all inside
   the four concept lessons.
2. **blueprint** — the exact coverage table (12×5), the difficulty table
   (14/22/18/6) and all sixteen type counts.
3. **points** — every question is 1 or 3 points, 100 in total, 20 per concept,
   20 composites and 40 singles.
4. **grading and threshold** — a perfect sheet earns 100/100; an empty sheet
   earns 0 with 60 unanswered; **60/100 passes and 59/100 fails**; partial credit
   per composite part; the control response types grade as authored.
5. **solutions** — the set loads with zero audit issues; every rubric equals the
   engine maximum and every part rubric its part maximum; figure items carry
   diagram notes and error items carry a common error.
6. **sources** — no page outside 5–19, each lesson question inside its own pages,
   each integration question citing two different lessons.
7. **figures** — a figure on exactly `q19`, `q37`, `q38`; the compass scene keeps
   two open candidates and one given vector; the kite and right-triangle prompts
   state their givens without leaking the answer.
8. **original items** — no verbatim lesson prompt, worst overlap below 0.7, and
   the two preflight pairs separated.

---

## Verification

Executed in the repository, in this order:

- `npm run typecheck` — clean.
- `npm run lint` — clean.
- `npx vitest run src/tests/unit01-detailed.test.tsx` — 26/26 pass.
- `npx vitest run src/tests/audit.test.ts src/tests/visualAudit.test.ts src/tests/mathRenderingAudit.test.tsx`
  — pass unchanged (no shared-code edit was needed).
- `npm run verify` — passes end to end: typecheck, lint, **54 test files /
  823 tests**, production build (the 26 new tests are the whole delta from the
  `main` baseline of 53 files / 797 tests).

Shared Test Area contracts, scoring, registry, solution audit, visual audit and
all `src/content/**` files are byte-identical to `main`.
