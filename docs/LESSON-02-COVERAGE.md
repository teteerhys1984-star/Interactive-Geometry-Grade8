# Lesson 2 — pages 8–10: source audit, coverage matrix and implementation record

This file is the audit that had to be finished **before** any content edit. It lists
every element printed on the supplied pages, the page it comes from, its exact
mathematical content, where it lives in the rebuilt lesson, and how its presence
and correctness are verified.

## 0. Evidence, numbering and scope

### Supplied images

| Attachment       | Printed page | Notes                                                    |
| ---------------- | ------------ | -------------------------------------------------------- |
| `image-1.png`    | **8**        | lesson title, activity 1 and 2, «تعلّم / تعريف»           |
| `image-2.png`    | **9**        | «حالة خاصة», «اكتساب معارف», example, method, justification |
| `image-3.png`    | **10**       | «تحقّق من فهمك», «تدرّب» ①②③                              |

`source.page` in the content files always stores the **printed** number (8, 9, 10).
No separate PDF page index was supplied, so none is recorded; the attachment order
above is the only mapping used.

### Scope

Only Lesson 2 (`lesson-02-image-of-a-point`) is rebuilt. Lesson 1, Lessons 3–7,
the Test Area, navigation, progress, access gate, workflows and hosting are
untouched. No source raster is committed or published; every figure in the lesson
is either an exact redraw of a verified integer grid or a clearly badged
platform-authored teaching drawing.

### Reading method

The three pages were read line by line, then the two squared-paper figures were
calibrated numerically (grid-line detection + point centroids) so that no
coordinate is eyeballed:

- page 8 sheet: **9 columns × 5 rows** (ten vertical grid lines, nine cells),
  points `A(4,1) B(1,4) P(2,3) M(6,2) N(1,2)`, printed line from `(0,5)` to
  `(5,0)`. `M` sits on column line 6, and the sheet keeps three cells to its
  right; an earlier eight-column reading cut two of them off and is superseded;
- page 10 sheet: **8 columns × 6 rows**, points `M(8,6) N(4,5) A(5,4) B(3,1) P′(4,1) Q′(6,1)`,
  with `M` exactly on the top-right corner node.

Two independent checks were added afterwards (see §5): on page 10 the exercise
asks for the image of `N′` under the opposite translation, and the answer is a
point that is *already printed* (`N″ = N`); on page 8 every required image lands
on a lattice node. Either check failing would have falsified the readings.

### Unreadable elements

None. Every word, number, label, circled marker and figure relation on the three
pages is legible in the supplied images, including the small green point `I` on
page 9 and the three numbered sub-items ①②③ of exercise ③. No part of the
source was guessed at or replaced by a similar problem.

## 1. Page 8 — «نشاط» and «تعريف»

| ID      | Printed item (verbatim)                                                                       | Destination                                 | Treatment / verification                                        |
| ------- | --------------------------------------------------------------------------------------------- | ------------------------------------------- | --------------------------------------------------------------- |
| P8-H    | «2 صورة نقطة وفق انسحاب»                                                                       | lesson title + `step-01` kicker              | S/R — unchanged wording                                         |
| P8-ACT  | «نشاط « رسم صورة نقطة وفق انسحاب، باستخدام أدوات هندسية »»                                     | kicker of `step-01` and `step-02`            | S/R — verbatim in both activity steps                           |
| P8-S1   | «1. على ورقة سنتيمترية»                                                                        | `step-01-activity-squared-paper`             | S/R — step title                                                |
| P8-F1   | squared sheet, `A B P M N`, line through `B,P,A`                                               | `step-01` figure `fig-8-activity-grid`       | S/G — exact lattice redraw; collinearity `x+y=5` tested         |
| P8-1-1  | «انقل الشكل المرافق إلى ورقة سنتيمترية. وضَعِ النقطة M′ التي تجعل الرباعي ABM′M متوازي أضلاع.» | `step-01` question 1 + placement lab         | S/G/D — student places `M′` and gets feedback, no answer shown   |
| P8-1-2  | «ما صورة النقطة M وفق الانسحاب الذي ينقل النقطة A إلى النقطة B؟»                              | `step-01` question 2                         | S — verbatim; solved in `teach-02` after the attempt            |
| P8-1-3  | «وضَعْ وفق هذا الانسحاب: ① N′ صورة النقطة N ② P′ صورة النقطة P»                               | `step-01` question 3                         | S/R — both sub-items kept, including ① and ②                    |
| P8-S2   | «2. على ورقة بيضاء»                                                                            | `step-02-activity-blank-paper`               | S/R                                                             |
| P8-F2   | blank sheet: `A,B,N` collinear, `M` off the line                                               | `step-02` figure `auth-02-blank-sheet`       | relations preserved exactly; spacing is platform-authored (badge)|
| P8-2-1  | «انقل الشكل المرافق إلى ورقة بيضاء.»                                                           | `step-02` question 1                        | S                                                               |
| P8-2-2  | «ليكن T الانسحاب الذي ينقل النقطة A إلى النقطة B ... اشرح العمل الذي قمت به.»                  | `step-02` question 2 + teacher solution      | S/R — full sentence, including «اشرح العمل»                      |
| P8-LRN  | «تعلّم»                                                                                        | `step-03` kicker                            | S                                                               |
| P8-DEF  | «تعريف: ... الرباعي ABM′M متوازي أضلاع ... [AM′] و [BM] متناصفتان.»                            | `step-03-definition` callout                | S/R — verbatim, including the exclusion «لا تنتمي إلى (AB)»      |
| P8-DEF-F| parallelogram `A B M′ M`: sides `[AB]` and `[MM′]` drawn, `[AM]` and `[BM′]` dashed. **The printed figure draws no diagonals `[AM′]`, `[BM]` and no point `I`** | `step-03` figure `auth-02-definition`        | authored instance of the printed configuration (badged), **plus** the platform's diagonals `[AM′]`, `[BM]` and their midpoint `I`, added to make «متناصفتان» visible |

## 2. Page 9 — «حالة خاصة» and «اكتساب معارف»

| ID       | Printed item                                                                       | Destination                     | Treatment / verification                                              |
| -------- | ---------------------------------------------------------------------------------- | ------------------------------- | ---------------------------------------------------------------------- |
| P9-CASE  | «حالة خاصة:» + text (`A,B,M′,M` collinear; `[AM′]` and `[BM]` bisected)             | `step-04-special-case`          | S/R — verbatim callout                                                 |
| P9-CASE-F| line with `A M I B M′`, `I` green midpoint                                          | `step-04` figure `auth-02-special-case` | authored exact instance; `I` is the common midpoint (tested)     |
| P9-KNOW  | «اكتساب معارف» / «كيف نرسم صورة نقطة؟»                                              | `step-05` kicker + title        | S/R                                                                     |
| P9-EX    | «ارسمْ ( مستخدماً الفرجار فقط ) النقطة M′ صورة النقطة M وفق الانسحاب الذي ينقل G إلى H.» | `step-05-knowledge-example`     | S — verbatim, full prompt                                               |
| P9-EX-F  | given: segment `HG` and point `M`                                                    | `step-05` figure `auth-02-compass-given` | authored; the printed relations (M right of G, below) preserved |
| P9-REM   | «تذكّر: في الإنشاء الهندسي، نستعمل فقط فرجاراً ومسطرةً غير مدرجة.»                    | `step-05` hint callout          | S/R — verbatim                                                          |
| P9-METH  | «طريقة الانشاء» + 4 bullets (complete to `HGMM′`, `(C₁)`, `(C₂)`, two intersections) | `step-06-construction-method`   | S/R — four bullets verbatim + step-through construction lab             |
| P9-METH-F| arcs `(C₁)` and `(C₂)`, both intersections, chosen `M′`                              | `step-06` figure `auth-02-compass-construction` | authored; radii are the printed `GH` and `GM` (asserted)     |
| P9-JUST  | «التعليل:» `MM′ = GH` (radius of `C₁`), `HM′ = GM` (radius of `C₂`), conclusion        | `step-07-justification`         | S/R — both equalities and the conclusion verbatim                       |
| P9-EX-SOL| the example is a printed *task* with no printed answer                              | teacher solution `sol-p9-example` + `step-06` proof | full construction, reasons, parallelogram proof, verification |

## 3. Page 10 — «تحقّق من فهمك» and «تدرّب»

| ID        | Printed item                                                                                       | Destination                     | Treatment / verification                                                  |
| --------- | -------------------------------------------------------------------------------------------------- | ------------------------------- | -------------------------------------------------------------------------- |
| P10-CH-I  | «في كلٍّ من الحالتين الآتيتين، ارسم الشكل الموافق ثم أكمل العبارتين الآتيتين:»                       | `step-08` intro                 | S                                                                          |
| P10-CH-1  | `N` image of `M` under `P→Q`, `M ∉ (PQ)` ⇒ …… is a parallelogram                                     | `step-08` item 1 + teacher      | S/R — blank kept; model answer is collapsible after the attempt            |
| P10-CH-2  | under `J→K`, `R` is image of `T`, `T ∉ (JK)` ⇒ …… is a parallelogram                                 | `step-08` item 2 + teacher      | S/R                                                                        |
| P10-PR1-I | «ارسم مثلثاً ABC، ثم ارسم باستعمال الفرجار:»                                                        | `step-09` intro                 | S                                                                          |
| P10-PR1-1 | `E`, image of `A` under `B→C`                                                                       | `step-09` item 1 + interactive  | S/G/D — vector-chain lab walks the three translations                      |
| P10-PR1-2 | `F`, image of `E` under `C→A`                                                                       | `step-09` item 2                | S/G                                                                        |
| P10-PR1-3 | `G`, image of `F` under `A→B`                                                                       | `step-09` item 3                | S/G — tested invariant `G = A`                                             |
| P10-PR2-I | «ارسم متوازي أضلاع ABCD مركزه M، ثم انقل العبارات ... وأكملها:»                                     | `step-10` intro                 | S                                                                          |
| P10-PR2-1 | image of `D` under `A→B`                                                                            | `step-10` item 1 + guided MCQ   | S/G — answer `C`                                                           |
| P10-PR2-2 | under `C→…`, `A` is image of `D`                                                                    | `step-10` item 2                | S/G — answer `B`                                                           |
| P10-PR2-3 | under `M→A`, `…` is image of `C`                                                                    | `step-10` item 3                | S/G — answer `M` (midpoint relation, explained)                            |
| P10-PR3-I | «انسخ الشبكة الآتية على صفحةٍ من دفترك:» + sheet                                                    | `step-11` intro + `fig-10-exercise-3-grid` | S/G — exact lattice redraw (8 × 6, `M` on the corner)             |
| P10-PR3-1 | under `A→B`: ① `M′` image of `M` ② `M″` image of `M′` ③ `N′` image of `N`                            | `step-11` item 1 + placement lab| S/G/D — three sub-items kept separately, each validated on click           |
| P10-PR3-2 | under `B→A`, place `N″` image of `N′`                                                               | `step-11` item 2                | S/G — tested: `N″ = N` (lands on an already printed point)                  |
| P10-PR3-3 | `P′` is image of `P` under `A→B`; place `P`                                                         | `step-11` item 3                | S/G — answer `P(6,4)` on a node                                             |
| P10-PR3-4 | `Q′` is image of `Q` under `B→A`; place `Q`                                                         | `step-11` item 4                | S/G — `Q(4,-2)` lies two rows below the printed sheet (documented)          |

## 4. Lesson architecture (18 steps)

Source steps keep the ids they had, in printed order, so a regression in source
ordering fails the existing fidelity suite. Authored steps are inserted between
them and are all badged «شرح المنصّة».

| #  | Step id                             | Origin  | Role                                                              |
| -- | ----------------------------------- | ------- | ----------------------------------------------------------------- |
| 1  | `teach-01-one-point-moves`          | authored| hook: predict one image on a sheet, then reveal why               |
| 2  | `step-01-activity-squared-paper`    | page 8  | activity 1 + the verified sheet, with no answer controls          |
| 3  | `teach-02-reading-the-vector`       | authored| worked example, then the page-8 placement lab (`M′`, `N′`)        |
| 4  | `step-02-activity-blank-paper`      | page 8  | activity 2 (the grid disappears)                                  |
| 5  | `teach-03-when-the-grid-disappears` | authored| why a compass is now needed; what “image” must guarantee          |
| 6  | `step-03-definition`                | page 8  | the printed definition; the diagonals and `I` are the platform's  |
| 7  | `teach-04-why-a-parallelogram`      | authored| why the definition is exactly “same direction, same distance”     |
| 8  | `step-04-special-case`              | page 9  | printed special case                                              |
| 9  | `teach-05-two-cases`                | authored| both cases side by side; draggable lab switches between them      |
| 10 | `step-05-knowledge-example`         | page 9  | printed example + given + «تذكّر»                                  |
| 11 | `step-06-construction-method`       | page 9  | printed method + step-through construction                        |
| 12 | `step-07-justification`             | page 9  | printed justification                                             |
| 13 | `teach-06-why-the-construction-works`| authored| proof: equal opposite sides ⇒ parallelogram ⇒ image               |
| 14 | `step-08-check-understanding`       | page 10 | printed check + collapsible model answers                         |
| 15 | `step-09-practice-1`                | page 10 | exercise ① + vector-chain lab                                     |
| 16 | `step-10-practice-2`                | page 10 | exercise ② + vector-chain lab, no answers stated                  |
| 17 | `step-11-practice-3`                | page 10 | exercise ③ + lattice placement lab (four prompts, feedback)       |
| 18 | `teach-07-recap-and-self-check`     | authored| summary + four-statement self-check                               |

Deliberate rule: exercises ①–③ and the check of page 10 do **not** expose the
answers before the student attempts them. Feedback gives the *method*, not the
result; the result is revealed only after a correct placement, an answered
choice, or an explicit «أظهر الحل» after repeated attempts. Full solutions live
in the Teacher Area.

## 5. Mathematical verification performed

All of the following are assertions in `src/content/lesson-02-rebuild.test.tsx`
and `src/content/units/lesson-02-geometry.test.ts`; they are independent of the
rendering layer.

| Claim                                                                            | How it is checked                                   |
| -------------------------------------------------------------------------------- | --------------------------------------------------- |
| `A,P,B` on page 8 are collinear on `x + y = 5`                                    | exact integer check                                  |
| `N` shares `B`'s column; `N` and `M` share a row                                   | exact integer check                                  |
| page 8 images `M′(3,5) N′(−2,5) P′(−1,6)`                                          | `P + (B − A)`, all on lattice nodes                  |
| page 10 sheet is 8 × 6 with `M` on the top-right corner                           | exact integer check                                  |
| `M′(6,3) M″(4,0) N′(2,2)` land on nodes inside the sheet                           | `P + (B − A)`                                        |
| `N″ = N′ + (A − B) = N` — the return translation lands on a printed point         | exact vector check                                   |
| `P = P′ − (B − A) = (6,4)`; `Q = Q′ − (A − B) = (4,−2)`                             | exact vector check; `Q` below the sheet documented   |
| exercise ①: `G = A` for every triangle (not just one example)                      | algebraic identity + several numeric triangles       |
| exercise ①: `EFG` is congruent to the original triangle                            | side-length comparison                               |
| exercise ②: `D→C`, `A→D` under `C→B`, `C→M` under `M→A`                            | vector computation in a general parallelogram        |
| compass construction: `|MM′| = |GH|`, `|HM′| = |GM|` for the authored given          | exact distance comparison                            |
| the rejected intersection is **not** a parallelogram completion                    | reflection across the centre line checked numerically|
| `HGMM′` is a parallelogram and `I` bisects both diagonals in the special case      | midpoint equality                                    |
| the draggable lab satisfies `M′ = M + (B − A)` in every reachable state            | sweep over the slider ranges                         |
| the rendered circles use exactly `GH` and `GM` as radii                            | DOM attribute read against the computed values       |

## 6. Known, documented consequences (not defects)

1. **Images off the printed sheet.** On page 8, `N′` and `P′` fall outside the
   printed crop; on page 10, `Q` falls two rows below it. The printed
   instructions ask the student to copy the figure onto a centimetre sheet or
   into the exercise book, which is wider than the crop. The lesson says this
   explicitly and the Teacher Area warns to leave margins.
2. **The special case is not an exception.** When `M ∈ (AB)` the four points are
   collinear and no visible parallelogram appears, but the diagonal bisection
   still holds. The definition excludes this case only so that the word
   «parallelogram» applies.
3. **Authored figures replace five blank-sheet scans.** Those five printed
   figures have no measurable coordinates. They are now drawn by the platform,
   preserving every printed relation (incidence, order, equalities, which
   intersection is chosen) and are captioned «رسم تعليمي من إعداد المنصّة».
   This removes the «راجع الكتاب» placeholder from the student flow without
   claiming to reproduce the printed layout.
4. **Access gate unchanged.** Teacher material is still only a UI barrier and is
   extractable from the public bundle. Not addressed here (out of scope).

## 7. Identity of the rebuild

Lesson 2 has its own palette — «ورق مربّعات دافئ» — and it deliberately does not
reuse Lesson 1's default identity:

| Token | Value | Used for |
| ----- | ----- | -------- |
| `--color-primary` | `#0f4c5c` petrol | ink points, headings, proofs |
| `--color-accent` | `#b4471f` burnt coral | images `M′`, vectors, the active lab |
| `--color-reference-accent` | `#9a6a08` saffron | compass arcs, diagonals, the midpoint `I` |
| paper | `#fffdf7` on `#f4ecdc` | the squared sheet on the notebook page |

The motif is the diagonal bisection: every diagram either shows the two
diagonals meeting at `I`, or shows why they must. Theme application is scoped
through `[data-lesson-theme='paper']` (`src/lib/lessonTheme.ts`), so no other
lesson's palette, layout, spacing or typography changes.

## 8. Rebuild outcome (recorded when the rebuild was finished)

| Item                          | Result                                                                    |
| ----------------------------- | ------------------------------------------------------------------------- |
| Steps                         | 18 — 11 printed (ids unchanged, printed order) + 7 authored, all badged.   |
| Figures                       | 2 reproduced sheets, 13 authored student figures, 2 teacher-only answer sheets, 2 teacher-only check figures. |
| `reference` placeholders       | 0 (the five blank-sheet ones were replaced by badged reconstructions).     |
| Teacher solutions              | 17 — one per printed prompt; steps, rule, check, figure and page each.     |
| Assessment                    | 12 platform-authored questions, 3 types, every one with an explanation.    |
| `lesson-02-geometry.test.ts`   | 29 / 29 pass.                                                              |
| `lesson-02-rebuild.test.tsx`   | 29 / 29 pass.                                                              |
| Full suite                     | 396 / 396 pass across 34 files (`npm run verify`).                         |
| Build                          | production build succeeds (only the pre-existing chunk-size warning).      |

The visual check was performed in a real Chromium instance (headless shell 131)
at 1440 px and 390 px, on all 18 student steps, the assessment and the unlocked
Teacher Area. Interaction was driven in that browser: placing `M′` and `N′` on
the page-8 lab, advancing the compass stepper, switching the two-case lab to
`M ∈ (AB)`, and opening all 17 teacher solutions. No console error was
recorded, and no horizontal overflow appeared at 390 px. See the pull request
body for the exact commands.
