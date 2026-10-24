# Unit 2 · Lesson 1 — coverage matrix (pages 31–33)

«منتصفا ضلعين في المثلث» reproduces the printed lesson of pages 31–33 in
printed order, answers **all 17 printed prompts** in the Teacher Area, and adds
platform teaching material that is always badged «شرح المنصّة».
`src/content/units/lesson-08-coverage.test.ts` pins every row below.

## Printed text → step

| Page | Printed element (verbatim source: `lesson-08-questions.ts`)        | Student step                    | Origin                            |
| ---: | ------------------------------------------------------------------ | ------------------------------- | --------------------------------- |
|   31 | «ارسم ثلاثة مثلثات `ABC`…» + «عيّن… `M`… `N`… وارسم `(MN)`»        | `l8-step-01-activity`           | source                            |
|   31 | figure with `M`, `N` and the midline                               | `l8-step-01-activity`           | source (figure: platform drawing) |
|   31 | «عيّن النقطة `K` نظيرة `M` بالنسبة إلى `N`»                        | `l8-step-02-proof-scaffold`     | source                            |
|   31 | the three proof steps with their dotted gaps                       | `l8-step-02-proof-scaffold`     | source                            |
|   31 | «هل يكفي ذلك؟ صغ إثباتاً…»                                         | `l8-step-02-proof-scaffold`     | source                            |
|   32 | «تعلّم»: the two printed sentences of the theorem                  | `l8-step-03-theorem`            | source                            |
|   32 | «مثال»: `I`, `J` ⇒ `(IJ) ∥ (BC)`, `IJ = ½ BC`                      | `l8-step-04-example`            | source                            |
|   32 | «اكتساب معارف»: `O`, `I` ⇒ prove `(OB) ∥ (AI)`                     | `l8-step-05-knowledge`          | source                            |
|   33 | «الحل» (the one printed solution)                                  | `l8-step-06-knowledge-solution` | source                            |
|   33 | «تحقّق من فهمك»: ① ② ③ ④ + the relative position of `(LN)`, `(JM)` | `l8-step-07-check`              | source                            |
|   33 | «تدرّب ①» the semicircle                                           | `l8-step-08-practice`           | source                            |
|   33 | «تدرّب ②» the symmetric points                                     | `l8-step-08-practice`           | source                            |
|   33 | «تدرّب ③» the rectangle in a circle                                | `l8-step-08-practice`           | source                            |

The five platform steps sit between the source steps, never inside a printed
prompt:

| Step                           | Purpose                                                      |
| ------------------------------ | ------------------------------------------------------------ |
| `l8-step-a01-orientation`      | where the lesson sits in Unit 2; why page 30 is context only |
| `l8-step-a02-observation`      | what the three drawings show, with the interactive lab       |
| `l8-step-a03-proof-explained`  | the proof written out, with the pitfall list                 |
| `l8-step-a04-example-solution` | the printed example solved                                   |
| `l8-step-a05-recap`            | summary, checklist, what-is-given/what-is-derived table      |

## Seventeen printed prompts, seventeen Teacher Area records

|   # | Page | Prompt (verbatim)                                   | Teacher record             |
| --: | ---: | --------------------------------------------------- | -------------------------- |
|   1 |   31 | draw three triangles, acute / obtuse / right at `A` | `l8-sol-p31-activity-1`    |
|   2 |   31 | mark `M`, `N` and draw `(MN)`                       | `l8-sol-p31-activity-2`    |
|   3 |   31 | construct `K`, the symmetric of `M` about `N`       | `l8-sol-p31-proof-k`       |
|   4 |   31 | blank 1: `AMCK` is …                                | `l8-sol-p31-proof-blank-1` |
|   5 |   31 | blank 2: `MBCK` is …                                | `l8-sol-p31-proof-blank-2` |
|   6 |   31 | blank 3 / conclusion                                | `l8-sol-p31-proof-blank-3` |
|   7 |   31 | «هل يكفي ذلك؟ صغ إثباتاً…»                          | `l8-sol-p31-proof-write`   |
|   8 |   32 | the worked example `I`, `J`                         | `l8-sol-p32-example`       |
|   9 |   32 | «اكتساب معارف»: `(OB) ∥ (AI)`                       | `l8-sol-p32-knowledge`     |
|  10 |   33 | «تحقّق» ① `(JK)`                                    | `l8-sol-p33-check-1`       |
|  11 |   33 | «تحقّق» ② `(KN)`                                    | `l8-sol-p33-check-2`       |
|  12 |   33 | «تحقّق» ③ `(LN)`                                    | `l8-sol-p33-check-3`       |
|  13 |   33 | «تحقّق» ④ `(JM)`                                    | `l8-sol-p33-check-4`       |
|  14 |   33 | «تحقّق» — position of `(LN)` and `(JM)`             | `l8-sol-p33-check-5`       |
|  15 |   33 | «تدرّب ①» `(OM) ∥ (BE)`                             | `l8-sol-p33-practice-1`    |
|  16 |   33 | «تدرّب ②» `(CB) ∥ (C′B′)`                           | `l8-sol-p33-practice-2`    |
|  17 |   33 | «تدرّب ③» nature and perimeter of `EFGH`            | `l8-sol-p33-practice-3`    |

Every record carries the five required parts — **المعطيات**, the reasoning
steps, **القاعدة المستعملة**, **تحقّق مستقل**, **الخطأ الشائع** — plus
**قراءة الشكل**. None carries a `limitation`: no figure was left undrawn.

### The five answers of «تحقّق من فهمك»

| Item | Answer                                       | Triangle used    |
| ---- | -------------------------------------------- | ---------------- |
| ①    | `(JK) ∥ (BC)`                                | `ABC`            |
| ②    | `(KN) ∥ (AD)`                                | `ACD`            |
| ③    | `(LN) ∥ (BD)`                                | `BCD`            |
| ④    | `(JM) ∥ (BD)`                                | `ABD`            |
| —    | `(LN) ∥ (JM)`, distinct lines, equal lengths | ③ and ④ together |

## Lesson assessment and Test Area

| Artefact                   | Where                                   | Size                                                                            |
| -------------------------- | --------------------------------------- | ------------------------------------------------------------------------------- |
| In-lesson final assessment | `lesson-08-assessment.ts`               | 12 authored questions (multiple-choice, true/false, numeric)                    |
| Test Area bank             | `src/tests/questions/lesson-08.ts`      | 20 questions, ids `geo-l08-t01-q01…q20`                                         |
| Test definition            | `src/tests/definitions/lesson-08.ts`    | `lesson-08-test`, 5 per solution group, pass 60 %, `solutionPolicy: 'detailed'` |
| Detailed solutions         | `src/tests/solutions/lesson-08-test.ts` | 20 records, 2 solution parts for the error-analysis question                    |
| Visual audit               | `src/tests/visualAudit.ts`              | 1 figure-required (q17), 1 figure-beneficial (q16), 18 text-only                |

The bank covers four concepts (6 / 4 / 4 / 6 questions), four difficulty levels
(5 / 8 / 5 / 2) and ten question types. Both the in-lesson assessment and the
bank are entirely platform-written: the printed pages carry no assessment, so
`origin: 'authored'` everywhere and no unit-level assessment exists.

## Verification status and open limitations

### What was actually run

| Check            | Command                                | Result                                         |
| ---------------- | -------------------------------------- | ---------------------------------------------- |
| Type checking    | `npm run typecheck` (`tsc -b --force`) | clean                                          |
| Linting          | `npm run lint`                         | clean                                          |
| Full test suite  | `npm test` (`vitest run`)              | 57 files / 888 tests pass                      |
| Production build | `npm run build`                        | succeeds (one pre-existing chunk-size warning) |
| Aggregate gate   | `npm run verify`                       | exit 0                                         |

The suite now includes four checks written for this lesson:
`lesson-08-geometry.test.ts`, `lesson-08-coverage.test.ts`,
`MidlineExplorer.test.tsx`, and the shared audits that were extended
(`audit.test.ts`, `visualAudit.test.ts`, `sourceFidelity.test.ts`,
`mathRenderingAudit.test.tsx`).

### What was **not** verified — real-browser rendering

No Chromium/Chrome binary exists in the authoring sandbox, and
`npx playwright install chromium` fails at the network policy
(`cdn.playwright.dev` is unreachable). Consequently **no real-browser desktop
or narrow-viewport inspection was performed**: no screenshots, no console-log
capture, no scroll-overflow measurement, and no check that the twelve steps and
the `MidlineExplorer` slider behave at a phone width. The jsdom tests exercise
the DOM and the slider's state, but they cannot substitute for layout.

This is the same limitation recorded for Lesson 1
(`docs/LESSON-01-COVERAGE.md`, final section) and it must be closed by a human
before the lesson is treated as visually signed off. The points most worth a
look:

1. **Desktop (~1440 px)** — the 5-midpoint figure of «تحقّق ④» (q17) and the
   proof figures, whose labels are the densest in the lesson.
2. **Narrow (~390 px)** — the `MidlineExplorer` control row (slider, case
   badge, read-out) and the teacher-area tables in
   `#teacher-panel-solutions`.
3. **Both widths** — that the twelve step cards keep their scroll position,
   that KaTeX formulas do not overflow their card, and that the
   «شرح المنصّة» kicker stays on the first line of each authored step.

The lesson's structure, math isolation, figure registration, scoring and
provenance are covered by the automated audits above; only the pixel-level
layout review is outstanding.
