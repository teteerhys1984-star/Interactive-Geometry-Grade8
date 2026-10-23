# Lesson 3 test rebuild — source, coverage, scoring, and figure audit

## Source scope and provenance

The repository's Lesson 3 content record identifies the lesson as **«صورة شكل وفق انسحاب»**, printed textbook pages **11–16** (`src/content/units/lesson-03-image-of-a-shape.ts`, `source: { page: '11–16' }`). Unlike Lessons 1 and 2, this lesson also ships its **original printed figures**: 22 exact crops under `public/diagrams/unit-01/lesson-03/`, tabulated page-by-page in [`LESSON-03-FIGURES.md`](LESSON-03-FIGURES.md). That inventory — not an external re-reading of the book — is the page-level source map used here:

- **Page 11:** the conjecture activity (oblique line ①, line parallel to the translation ②) and the proof that the image line is parallel.
- **Page 12:** the learned rule «صورة المستقيم $(d)$ … مستقيم $(d')$ يوازي $(d)$»; the two construction cases (non-parallel → a distinct parallel image; parallel → the image coincides); activity 3 (segment `[MN] = 3.4 cm`, ray `[Dx)`, circle radius `3.2 cm`).
- **Page 13:** images of parallel lines are parallel, images of perpendicular lines are perpendicular; the image of a segment.
- **Page 14:** image of a ray and of a circle (centre `O'` is the image of `O`, same radius); «وفق انسحاب: صورة مستطيل مستطيل يطابق، وصورة مثلث مثلث يطابق»; «اكتساب معارف» — draw two point-images with the compass, then draw the line through them.
- **Page 15:** the 3 cm square example under the translation `D → C` (`A' = B`, `D' = C`, right angles and `3 cm` sides preserved); «تحقّق من فهمك» filling in the images of parallel/perpendicular lines.
- **Page 16:** practices ①–④ (image line under `A → B` and under `B → A`; the right triangle `BA = 4`, `BC = 6`, `E` on `[BA]` with `BE = 2`, image of `[EB]` under `A → C`; the `3 × 2` rectangle under `B → A`; the three student attempts for the image of `C` under `B → A`).

Question wording, numerical values, distractors and worked reasoning are **platform-authored**, not textbook quotations. Every solution separates statements verified against the page records above (`provenance.sourceVerified`) from the platform's own numbers and explanations (`provenance.platformAuthored`), and cites the printed page and section it rests on. The full scanned pages are **not** tracked in this repository — only the 22 crops — so this document claims fidelity to the recorded page text and crop inventory, not an independent visual re-reading of whole pages.

## Audit findings and rebuild decisions

The previous bank already had 20 stable IDs, correct page ranges, and broadly sound answer keys, but it did not meet the detailed-solution policy and had several assessment weaknesses. The rebuild keeps every ID and page anchor while addressing them:

- **q02, q07, q20** were bare true/false. They now require a controlled second part, scored separately: q02 and q20 (true statements) require a justification; **q07 is now a false statement requiring a correction**. The former q07 did **not** assert anything about perpendicular lines: it repeated the page 12–13 rule for _parallel_ lines («إذا كان $(d_1)\parallel(d_2)$ … فإن $(d_1')\parallel(d_2')$») as a bare verdict answering «صحيح», so it measured recall of one rule with no reasoning. The new q07 targets the second rule printed on page 13 — the image of perpendicular lines stays perpendicular — by stating it inverted («$(d_1')\parallel(d_2')$») and asking the learner to reject it and choose the correction. Parallel-line coverage is still measured by q18 (multi-select) and q11 (classification), so the strand loses no coverage.
- **q16 and q19** were error-analysis items scored all-or-nothing. Both now have an independently scored **location / correction / reason** structure and an explicit `commonError`, matching the printed rules (page 14 for the circle centre; pages 11–12 for the image line).
- **q19's** claim was kept because it is a genuine thinking item: for two distinct parallel lines there are **infinitely many** translations mapping one onto the other (one per choice of target point on the image line), and only the perpendicular component is fixed. The displayed derivation now states those two facts correctly in steps 1–2 (the distance is constant; the perpendicular translation of that length exists), so **the only false step is s3**, the uniqueness claim itself. That makes the keyed answer («الخطوة 3») the single unambiguous location, and the solution demonstrates the infinity of solutions instead of merely asserting it.
- **q09** carried an irrelevant centre coordinate `(2, 3)` that played no role in the answer; it was removed so the prompt states only what is used.
- **q13** previously lacked the condition that rules out the degenerate case; it now states that the translation direction is not parallel to `(AB)`, so «متوازي أضلاع» is the only correct conclusion and «مستطيل» / «معيّن» are demonstrably not forced.
- **q04 and q14's concepts were swapped** (`image-circle-polygon` ↔ `construction-applications`) so that the coverage counts still match the declared blueprint exactly: the rectangle-area item is a polygon item, and the perimeter computation is an application. **q14 is now a genuine exact-fraction item**: for `[MN] = 3.4 cm` translated by `2 cm` in a non-parallel direction, `MNN'M'` is a parallelogram with perimeter `2(3.4 + 2) = 10.8 cm = 54/5`; the former item asked for a perimeter ratio whose answer was trivially `1`.
- **Three source-page citations were tightened** while the question IDs, concepts, difficulty and answer keys stayed fixed. **q01** cited pages 11, 12 _and_ 13; the triple parallel/perpendicular rule it tests is printed on page 13, but the item itself only needs the page 11 conjecture and the page 12 rule, so it now cites 11–12 and page 13 is left to the items that actually rely on it (q05, q07). **q14** cited pages 14 and 16 for a perimeter computation; the segment `[MN] = 3.4 cm` it uses is the printed activity on **page 12**, and page 16 is the printed practice that asks for the image of a segment, so it now cites 12–16. **q19** cited pages 12 and 15, but the argument rests on the page 12 image-line rule and the page 11 conjecture; page 15 (the square example and «تحقّق من فهمك») never discussed how many translations map one parallel line onto another, so the citation moved to 11–12. In all three cases the new set is a subset-and-sharpen of the old one, and no question now cites a page its solution does not also cite.
- The earlier solution file gave one-line answers. It is replaced with Arabic givens, derivations, a named rule, an independent check, the misconception each item targets, explicit source/platform provenance, and rubrics checked against the grading engine. The engine's existing all-or-nothing classification and multi-select scoring is retained rather than implying itemwise credit.

The bank remains at **20 stable IDs** (`geo-l03-t01-q01`–`q20`) over the four documented strands: image of a line/segment/ray (5), parallel and perpendicular images (4), circle and polygon images (6), and constructions/applications (5). Difficulty is unchanged: 5 basic, 8 medium, 5 advanced, 2 thinking. The type mix is 7 single-choice, **3 true/false with a scored second part**, 2 multi-select, 2 numeric, 1 exact, 1 matching (three pairs), 1 classification, 1 ordering, and 2 error-analysis items.

## Scoring — 31 points

The engine assigns **31 points** in total. The point maximums by question:

| Question | Type                                 | Points | Source page(s) |
| -------- | ------------------------------------ | -----: | -------------- |
| q01      | single-choice                        |      1 | 11, 12         |
| q02      | true/false + justification           |      2 | 13             |
| q03      | single-choice                        |      1 | 14             |
| q04      | numeric                              |      1 | 14, 16         |
| q05      | single-choice                        |      1 | 13             |
| q06      | single-choice                        |      1 | 12, 13         |
| q07      | true/false + correction              |      2 | 13             |
| q08      | multi-select                         |      1 | 14, 16         |
| q09      | numeric                              |      1 | 14             |
| q10      | matching (three pairs)               |      3 | 13, 14         |
| q11      | classification                       |      1 | 12, 13, 14     |
| q12      | ordering (three steps)               |      3 | 14             |
| q13      | single-choice                        |      1 | 13, 16         |
| q14      | exact (fraction)                     |      1 | 12, 16         |
| q15      | single-choice                        |      1 | 13, 15         |
| q16      | error analysis + correction + reason |      3 | 14, 15         |
| q17      | single-choice                        |      1 | 14, 15         |
| q18      | multi-select                         |      1 | 12, 13         |
| q19      | error analysis + correction + reason |      3 | 11, 12         |
| q20      | true/false + justification           |      2 | 14, 16         |

Matching earns one point per pair; ordering earns one point per correctly placed step; classification keeps the engine's all-or-nothing one-point rule. A true/false verdict, its correction or justification, and the error-analysis location/correction/reason are scored as independent parts. The **theoretical 60 % passing threshold** follows the Lesson 1 and Lesson 2 convention and means **18.6 of 31 points**. Because points are only ever awarded as whole numbers, the engine compares the _rounded_ percentage (`Math.round(earned / 31 * 100) >= 60`), so in practice **18/31 = 58 % fails and 19/31 = 61 % passes: the lowest passing score is 19/31, about 61.3 % before the displayed percentage is rounded**. This is a direct consequence of a 31-point maximum, not a second threshold, and it is asserted in the detailed test. The Solutions Area keeps the established five-question grouping, so the test publishes four solution groups.

`src/tests/lesson03-detailed.test.tsx` asserts this table twice: every authored rubric must sum to the engine maximum for its question (and for each structured part), and the engine maximum over the 20 questions must be exactly **31**.

## Figure audit

The only assessment figure is **`test-l03-q16-circle-center-and-rim`**, the existing declarative authored scene (unlabelled centre marked with a cross, `K` on the circumference, one circle). It is required because the item's whole error is confusing a rim point with the centre, and it is classified `A — required` in [`TEST-AREA-VISUAL-AUDIT.md`](TEST-AREA-VISUAL-AUDIT.md). The scene deliberately does not draw the image circle and does not label the centre, so it cannot reveal the answer; the prompt names `K`. Its spec and a DOM SVG render are asserted in the new detailed test, and `src/tests/visualAudit.test.ts` continues to enforce the single-figure rule and the “figure must not state its answer” rule.

## Regression evidence and remaining limitations

`src/tests/lesson03-detailed.test.tsx` checks: bank and ID integrity with the exact 20-ID sequence; lesson scope; every question and every solution citation inside pages 11–16 with a locator; the strict detailed-solution audit (zero issues); rubric totals against engine maxima; a fully correct **31/31** sheet at 100 % and an empty sheet at 0 % with `passed: false`; representative partial scores (true/false verdict without its second part → 1/2, one of three matching pairs → 1/3, error location correct but correction wrong → 2/3, fully wrong error analysis → 0/3, ordering with one step misplaced → 1/3, and the exact answer accepted as `54/5` or `10.8` but not `5.4`); KaTeX/RTL rendering of all 20 prompts with no raw delimiters, no KaTeX errors and LTR isolation; the q16 SVG/spec; and the matching, correction and classification answer shapes.

The rebuild uses the shared registry, solution audit, scoring engine, renderer and visual-audit registry **unchanged**. The single edit outside the Lesson 3 files is in `src/tests/lesson02-detailed.test.tsx`: its assertion that the detailed-policy list equals exactly `['lesson-01-test', 'lesson-02-test']` is narrowed to “Lesson 2 is still on the detailed policy” (`toContain`), the same shape Lesson 1 already used. No Lesson 1 or Lesson 2 content, solution, scoring or user-visible behaviour changes. The engine maximum for Lesson 1 (40) and Lesson 2 (30) is untouched.

Remaining limitations, stated rather than glossed:

- The scanned textbook pages are not in the repository; fidelity is verified against the recorded page text and the 22 crop inventory, not against a fresh inspection of the raster pages.
- DOM/SVG rendering tests are not browser visual verification.
- The figure inventory allows exactly one assessment figure this lesson; adding a second would require editing the shared visual-audit registry and its documented counts, which was out of scope for this rebuild.
