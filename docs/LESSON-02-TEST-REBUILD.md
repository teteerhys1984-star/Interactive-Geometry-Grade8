# Lesson 2 test rebuild — source, coverage, scoring, and figure audit

## Source scope and provenance

The repository's Lesson 2 source audit identifies the lesson as **«صورة نقطة وفق انسحاب»**, printed textbook pages **8–10** (`docs/LESSON-02-COVERAGE.md`). This test uses those page records as its source map:

- **Page 8:** activity on squared/blank paper; definition of the image of a point using parallelogram `ABM′M`; the diagonal-midpoint relation.
- **Page 9:** the collinear special case; compass construction using circles centered at `M` and `H` with radii `GH` and `GM`; the radius equalities and parallelogram justification.
- **Page 10:** understanding check and practice applying translations to points, including successive images on a grid.

Question text, numerical values, distractors, coordinate examples, and worked reasoning in the test are **platform-authored**, not textbook quotations. Each solution explicitly separates statements verified against the repository's page-level source audit from the platform's application or explanation, and cites the relevant printed page and section. The original page images mentioned in the existing source audit are not tracked in this repository; this rebuild relies on that documented audit and does not claim a new independent visual comparison of the scans. No unsupported textbook page or quotation is added.

## Audit findings and rebuild decisions

The prior bank already had 20 stable IDs and generally correct core answer keys, but it did not meet the detailed-solution policy and had several scope/assessment weaknesses. The rebuild keeps the IDs while addressing these findings:

- q02, q07, and q20 were bare true/false; they now require a controlled justification, with verdict and reason scored separately.
- q16's prior displayed construction steps did not consistently describe the two prescribed circle constructions; the corrected item has one identifiable wrong center while the second-circle step is correct, and it now asks for a correction and reason.
- q19 previously diagnosed only the direction omission; it now scores the diagnosis, the missing oriented-vector condition, and why equal length plus parallelism alone is insufficient.
- q08's two correct options previously overlapped in meaning. They now ask separately for the required direction/parallelogram completion and for rejecting the crossed, reverse-direction candidate. The figure continues to show both intersections without selecting one.
- q11's former diagonal 3–4–5 and 3–3 coordinate cases invoked distance reasoning not established by the available Lesson 2 source audit. They have been replaced by horizontal/vertical examples whose distance is counted directly on the grid; these values are platform-authored.
- The earlier solution file mostly gave answer lines and short assertions. It is replaced with Arabic givens, derivations, named rules, misconception notes, explicit source/platform provenance, and rubrics checked against the engine. The engine's existing all-or-nothing classification and multi-select scoring is retained rather than suggesting itemwise partial credit.

The complete bank remains at 20 stable IDs (`geo-l02-t01-q01`–`q20`) and covers the four documented lesson strands: definition/parallelogram (5 questions), special collinear case (4), compass construction (6), and grid application (5). The mix is 7 single-choice, 3 true/false with justification, 2 multi-select, 2 numeric, 1 exact fraction, 1 matching, 1 classification, 1 ordering, and 2 error-analysis questions. This combines direct recognition with construction, calculation, structured reasoning, and misconception analysis without introducing unsupported response types.

The engine assigns **30 points** in total. The point maximums by question are:

| Question | Type                                 | Points | Source page(s) |
| -------- | ------------------------------------ | -----: | -------------- |
| q01      | single-choice                        |      1 | 8              |
| q02      | true/false + justification           |      2 | 9              |
| q03      | single-choice                        |      1 | 8              |
| q04      | numeric                              |      1 | 8, 10          |
| q05      | single-choice                        |      1 | 9              |
| q06      | single-choice                        |      1 | 8, 10          |
| q07      | true/false + justification           |      2 | 9              |
| q08      | multi-select                         |      1 | 9              |
| q09      | numeric                              |      1 | 8, 10          |
| q10      | matching                             |      2 | 9              |
| q11      | classification                       |      1 | 8, 10          |
| q12      | ordering                             |      3 | 9              |
| q13      | single-choice                        |      1 | 8, 10          |
| q14      | exact                                |      1 | 9              |
| q15      | single-choice                        |      1 | 8, 10          |
| q16      | error analysis + correction + reason |      3 | 9              |
| q17      | single-choice                        |      1 | 9              |
| q18      | multi-select                         |      1 | 8, 10          |
| q19      | error analysis + correction + reason |      3 | 8, 9           |
| q20      | true/false + justification           |      2 | 9              |

Matching earns one point per pair; ordering earns one point per correctly placed step; classification follows the existing engine's all-or-nothing one-point rule. True/false verdicts and their controlled justification, and the error-analysis identification/correction/reason, are scored as independent parts. The **60% passing threshold** follows the existing Lesson 1 convention and means 18/30 points; the Solutions Area keeps the established five-question grouping.

## Figure audit

The only assessment figure is **`test-l02-q08-compass-intersections`**, a reused declarative authored SVG from the existing `compassIntersectionFigure` scene builder. It is required for q08 because the two candidate intersections must be compared spatially. It shows the given `G→H` direction and both circle intersections without selecting/highlighting either answer; the prompt names `X` and `Y`. Its two circles use the specified centers/radii; the renderer's figure-spec schema and a DOM SVG render are asserted in `src/tests/lesson02-detailed.test.tsx`. Existing Lesson 2 visual registry entry q08 already correctly classifies it as figure-required, so no unrelated visual-audit entry was changed.

## Regression evidence and remaining limitation

`src/tests/lesson02-detailed.test.tsx` checks bank/ID integrity, lesson scope, source page range, strict detailed-solution audit, root and part rubric totals against engine maxima, a fully correct 30/30 passing sheet, representative partial/incorrect scores, all-question math rendering, RTL/LTR math isolation, the matching/correction/classification answer shapes, and the q08 SVG/spec. It deliberately uses the shared renderer and scoring engine unchanged. The existing Lesson 1 detailed-contract test had a temporary assertion that only Lesson 1 could opt in; that stale exclusivity assertion is narrowed to preserve Lesson 1's detailed policy while allowing this explicitly opted-in Lesson 2 test. No Lesson 1 content, scoring, or user behavior changed.

The source-page and content-record gap above remains: the scanned textbook pages are not checked into the repository, so this PR can verify fidelity against the existing textual audit but cannot independently inspect the source raster. DOM rendering tests are not described as browser visual verification.
