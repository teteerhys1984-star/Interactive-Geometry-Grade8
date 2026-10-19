# Lesson 1 — pages 3–7: source coverage and implementation record

## Boundary and evidence

The owner supplied five page PNGs in chat (printed numbers 3, 4, 5, 6, 7), then a clearer crop of page 4 question 4 and clarification of the circle names. They were visually read before implementation. The previous chat audit matrix remains the source plan; the rows below make its implementation destinations explicit. Source attachments are **not** committed or published. Answers and explanatory diagrams are platform-derived, not a printed answer key.

Only Lesson 1 is rebuilt. Hosting, access mechanism, password, other lessons, Test Area, and unit tests/definitions are unchanged. Existing public teacher data is extractable: the gate is only a UI barrier, not server authorization. The owner explicitly deferred that issue. No service, subscription, domain, or security migration is included.

Student step keys:

- **N** `launch-naming-area`
- **P** `launch-properties`
- **C** `launch-criteria`
- **G** `launch-grid`
- **M** `launch-marked`
- **O** `launch-circles`
- **A1/A2** `step-01-activity-damascus-pavement` / `step-02-activity-another-translation`
- **L/H** `step-03-learn-translation-concept` / `step-04-properties-of-translation`
- **T1–T10** Teacher Area solution IDs `l1-teacher-1` … `l1-teacher-10`.

Verification: **S** manual comparison with supplied source; **G** mathematical checks in `lesson-01-rebuild.test.tsx`; **R** source/destination regression tests; **D** DOM rendering/control tests. Browser visual QA is a separate acceptance check, not implied by these codes.

## Page 3 — «انطلاقة نشطة»

| Source item              | Exact mathematical information / instruction                       | Destination / treatment                                           | Verification |
| ------------------------ | ------------------------------------------------------------------ | ----------------------------------------------------------------- | ------------ |
| Unit and launch headings | متوازيات الأضلاع والانسحاب؛ انطلاقة نشطة                           | Existing unit title; N/P/C/G/M/O kickers                          | S/R          |
| Q1 instruction           | One correct answer among ①②③; indicate it                          | N/P/C, repeated locally for readability                           | S/R          |
| Q1.1 stem                | Another reading of ABCD                                            | N, full worked reasoning                                          | S/R          |
| Q1.1 alternatives        | ABDC; ADCB; DCAB                                                   | N, all three preserved                                            | S/R          |
| Q1.2 stem                | ABCD parallelogram; identify bisecting segments                    | N, distinguish opposite sides from diagonals                      | S/R          |
| Q1.2 alternatives        | AB/CD; AD/BC; AC/BD                                                | N, all three with segment notation                                | S/R          |
| Q1.3 stem/options        | Area; 12, 15, 20 cm²                                               | N, 5×3 with explanation and rejected distractors                  | S/R          |
| Q1.3 figure              | ABCD; 5 cm base; both slants 4 cm; perpendicular height 3 cm       | N, authored schematic explicitly not to scale                     | S/D          |
| Q1.4 stem                | EFGH parallelogram                                                 | P, explain opposite sides                                         | S/R          |
| Q1.4 alternatives        | EF=HG and EH=FG; EG=HF; EF=FG                                      | P, all alternatives plus why stronger claims fail                 | S/R          |
| Q1.5 stem                | ABCD, centre O                                                     | P, explain central symmetry                                       | S/R          |
| Q1.5 alternatives        | OA=OB; O midpoint AB; O symmetry centre                            | P, preserve and evaluate each                                     | S/R          |
| Q1.6 stem/figure         | QP and NM bisect each other; distinct tick styles on each diagonal | P, original schematic with exact midpoint and attached tick marks | S/G/D        |
| Q1.6 alternatives        | MNQP; MNPQ; MPNQ                                                   | P, explain why third order has required diagonals                 | S/R          |

## Page 4 — continuation

| Source item       | Exact mathematical information / instruction               | Destination / treatment                                                     | Verification |
| ----------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------- | ------------ |
| Q1.7 conditions   | AB parallel FE; AF parallel BE                             | C, identify opposite sides                                                  | S/R          |
| Q1.7 alternatives | AFBE; AEBF; ABEF                                           | C, preserve all and explain third                                           | S/R          |
| Q1.8 condition    | Convex quadrilateral, one opposite pair parallel AND equal | C, sufficient criterion with reasoning                                      | S/R          |
| Q1.8 alternatives | Rectangle; rhombus; parallelogram                          | C, explain limits of conclusion                                             | S/R          |
| Q1.9 conditions   | Convex ABCD; AB=CD; AD=BC                                  | C, diagonal/congruent triangles reasoning                                   | S/R          |
| Q1.9 alternatives | Rectangle; rhombus; parallelogram                          | C, preserve all and justify third                                           | S/R          |
| Q2 instruction    | Name ALL parallelograms with vertices among seven points   | G, permanent systematic solution                                            | S/G/R        |
| Q2 figure         | A,B,C top; E,D middle; F,G bottom on printed grid          | G, normalized coordinates read from grid; selector highlights seven results | S/G/D        |
| Q2 completeness   | Every valid quadrilateral, not just an example             | G, 21 segment pairs grouped by midpoint; seven nondegenerate vertex sets    | G/R          |
| Q3 introduction   | Two quadrilaterals ①② drawn by hand                        | M, text preserved; diagram schematic, not imitation of hand wobble          | S/R          |
| Q3.①              | LTEM; both diagonals bisect, distinct marks                | M, proof via bisecting diagonals                                            | S/D          |
| Q3.②              | UCEP; UC=PE and angle CUE=UEP, diagonal UE                 | M, marked arcs, derive parallelism then criterion                           | S/D          |
| Q3 request        | Nature of EACH, justify                                    | M, separate permanent reasoned solutions                                    | S/R          |
| Q4 conditions     | Circles C and C′ centred O; AB/CD diameters; angle AOD=30° | O, clarified source crop; use calligraphic circle symbols                   | S/R          |
| Q4.1              | Draw consistent figure                                     | O, explicit construction steps and adjustable second radius                 | S/D          |
| Q4.2              | Prove ACBD parallelogram                                   | O, identify its diagonals, common midpoint; no equal-radius assumption      | S/R          |
| Q4 note 1         | Common centre means concentric                             | O, retained                                                                 | S/R          |
| Q4 note 2         | Calligraphic circle symbol is graphic form of C            | O, retained                                                                 | S/R          |

## Page 5 — pavement discovery

| Source item            | Details                                                         | Destination / treatment                                 | Verification |
| ---------------------- | --------------------------------------------------------------- | ------------------------------------------------------- | ------------ |
| Lesson/activity titles | الانسحاب وخواصه؛ نحو مفهوم الانسحاب انطلاقاً من ترصيف           | Lesson title and A1/A2                                  | S/R          |
| Preparation            | Cut shape and use it in activity                                | A1, instruction retained; digital cross copy            | S/R/D        |
| Context                | Damascus pavement; questions introduce translation along a line | A1                                                      | S/R          |
| 5-A                    | Cross tiling; twelve numbered tiles; A B C D E F G M N P        | A1/A2, authored normalized model, not a book image      | S/G/D        |
| A1.1a                  | Tracing paper and copies of ①②                                  | A1 prompt and permanent solution                        | S/R          |
| A1.1b                  | Mark A,C,E                                                      | A1, labels and explanation                              | S/G          |
| A1.1c                  | Draw AB,CD,EF lines                                             | A1, explain three horizontal paths                      | S/G          |
| A1.2                   | Motion applying ① to ②                                          | A1, slider constrains every vertex to same displacement | S/G/D        |
| A1.3a–c                | Images of A,C,E                                                 | A1 solution: B,D,F, each checked                        | S/G/R        |
| A1.3d–e                | Positions of ④ and ⑨                                            | A1 solution: ⑤ and ⑩                                    | S/G/R        |
| A1.4a–b                | Draw ABDC and ABFE                                              | A1, both names and construction instruction retained    | S/R          |
| A1.4c–d                | Nature of each                                                  | A1, proof for each using opposite equal parallel sides  | S/G/R        |
| Printed conclusion     | ② image of ① under A to B                                       | A1, retained as source, distinct from derived reasoning | S/R          |
| A2 setup               | Another translation, A to M                                     | A2, new constrained slider                              | S/G/D        |
| A2.1a                  | Image of ①                                                      | A2 solution ④                                           | S/G          |
| A2.1b                  | Image of ⑥                                                      | A2 solution ⑪                                           | S/G          |
| A2.1c                  | Image of C                                                      | A2 solution N                                           | S/G          |
| A2.1d                  | Image of E                                                      | A2 solution P                                           | S/G          |
| A2.1e                  | Image of ⑦                                                      | A2 solution ⑩                                           | S/G          |
| A2.2                   | Does a translation take ⑧ to ⑪? If yes, which?                  | A2, yes, B to M, with full-boundary verification        | S/G/R        |

**Correction to old implementation:** it read A2.2 as ⑩ to ⑧. The supplied page reads ⑧ to ⑪. This is a source correction, not a new question.

## Page 6 — concept/properties and start of check

| Source item          | Details                                                                                                | Destination / treatment                                                              | Verification |
| -------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------ |
| Definition           | Skier F to F′ as A goes to B                                                                           | L, verbatim prose and explanatory alternative                                        | S/R          |
| 6-A artwork          | Original skier and paired labels F/F′, A/B, M/N/P/S and primes                                         | Not republished: permission unconfirmed; explicit authored rigid-polygon alternative | S/R/D        |
| Movement lengths     | MM′=NN′=AB                                                                                             | L, printed relation retained                                                         | S/R          |
| Movement parallelism | NN′ parallel AB; MM′ parallel AB                                                                       | L, both relations retained                                                           | S/R          |
| Four properties      | Length, collinearity, angle measure, area                                                              | H + existing why-preserved step, each explained                                      | S/R          |
| Point images         | M′ N′ P′ S′ under A to B                                                                               | H, preserved                                                                         | S/R          |
| Segment length       | M′N′=MN                                                                                                | H, distinguish object length from displacement                                       | S/R          |
| Collinearity         | M,S,P and their images                                                                                 | H, source and explanation                                                            | S/R          |
| Angle                | S′M′N′ equals SMN                                                                                      | H, correct vertex order and hat notation                                             | S/R          |
| Area                 | Triangle S′M′N′ and SMN equal                                                                          | H, source plus preservation reasoning                                                | S/R          |
| Check ① introduction | 15 congruent parallelograms numbered 1–15                                                              | Teacher notes and T1–T6 context                                                      | S/R          |
| 6-B                  | 3 rows; numbering down columns; alternating colours; A…F on first/second row boundary; A′…F′ at bottom | T1–T6, authored schematic with same relationships                                    | S/D          |

## Page 7 — teacher destinations only

| Source item             | Details                                                    | Destination / treatment                                                    | Verification |
| ----------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------- | ------------ |
| Check ①.1a/b            | Images of ①② under A to D                                  | T1: ⑩⑪ with three-column reasoning                                         | S/R          |
| Check ①.2a/b            | Images of ⑮⑪ under F to C                                  | T2: ⑥② with reverse displacement check                                     | S/R          |
| Check ①.3a/b            | Images of ⑦⑬ under D to D′                                 | T3: ⑨⑮ with two-row reasoning                                              | S/R          |
| Check ①.4               | ③ to ⑦: identify translation                               | T4: A′ to C, equivalent B′ to D                                            | S/R          |
| Check ①.5               | ④ to ⑨: identify translation                               | T5: A to B′, equivalent B to C′                                            | S/R          |
| Check ①.6               | ⑨ to ⑬: identify translation                               | T6: A′ to C, equivalent C′ to E                                            | S/R          |
| Check ② instruction     | Explain why red is not a translation image of blue         | T7, all four reasons                                                       | S/R          |
| 7-A panel ①             | Smaller irregular polygon                                  | T7, size not preserved                                                     | S/D          |
| 7-A panel ②             | Changed A dimensions                                       | T7, lengths not preserved                                                  | S/D          |
| 7-A panel ③             | Opposite flag directions                                   | T7, reflected orientation                                                  | S/D          |
| 7-A panel ④             | Unequal circle radii                                       | T7, length/radius not preserved                                            | S/D          |
| Practice preparation    | Cut shape and use in following practice                    | Teacher notes/T8, original instruction retained                            | S/R          |
| Cut figure              | Hexagon partitioned into six triangles                     | T8, separate six-triangle hexagon below the digital lattice                | S            |
| Practice ① introduction | Examine following figure                                   | Teacher notes/T8                                                           | S/R          |
| 7-B                     | Eight numbered five-triangle regions on triangular lattice | T8, oriented polygon outlines and positions, no source raster              | S/G/D        |
| Practice ① request      | Every shape and its translation image                      | T8, all pairs ①⑧,②④,③⑥,⑤⑦ and inverse directions                           | S/G/R        |
| Practice ② introduction | Examine adjacent figure                                    | Teacher notes/T9–T10                                                       | S/R          |
| 7-C                     | ABCD; AB=6 cm, AD=3 cm; concave left, convex right         | T9–T10, exact rectangle/semicircle construction                            | S/D          |
| Practice ②.1            | Image of semicircle on BC under B to A                     | T9, diameter AD, arc on right of AD fills cut-out                          | S/R          |
| Practice ②.2            | Infer blue area                                            | T10, moved cap cancels removed cap; 18 cm², geometric and arithmetic check | S/R          |

## Acceptance / limitations

- No original source raster is published and no authored diagram is captioned «صورة من الكتاب».
- 6-A remains an explicit artwork/publication limitation, not an unresolved mathematical condition.
- New normalized geometry is tested independently for launch-grid completeness, pavement mappings and lattice pairs. Source comparison itself is a human audit, not something a unit test can prove.
- Teacher materials stay behind the existing UI gate. They remain extractable from the public source/bundle; no security improvement is claimed.
- No browser visual sign-off is implied by DOM tests. See PR verification evidence for actual commands and remaining QA.

## Verification run for this rebuild

- `npm ci`: completed; lockfile unchanged. Audit reports one existing high-severity transitive `source-map-js` advisory, GHSA-68fv-2mgg-jv7q. No unrelated dependency upgrade attempted.
- `npm run verify`: passed (typecheck, ESLint, all **335 tests in 31 files**, production build). Final full test run: 63.32 s. No timeout changes, removed tests, or framework/config changes.
- `npm run format:check`: passed.
- `git diff --check`: passed.
- Earlier failing checks identified stale Lesson 1 expectations, an escaped-string test comparison, and missing note-title updates; these were corrected before the final successful run. New tests additionally caught/guard flag orientation and check every strip mapping at all four vertices.
- Build succeeds with a warning for the existing large application chunk (approximately 836 kB minified). No broad code-splitting refactor performed.
- A Vite development preview was started on port 5173. Starting a preview is **not** browser QA.
- No installed Chromium/Chrome executable was found. No real-browser laptop/narrow viewport inspection, screenshot inspection of the rendered application, console check, or production-host smoke test was performed. Source-image inspection and jsdom tests must not be confused with those outstanding checks.
- Shared navigation, progress/completion, WhatsApp display, authentication UI, other lesson rendering and Test Area regression tests passed. Authentication internals, test banks, workflows and deployment settings are unchanged.
