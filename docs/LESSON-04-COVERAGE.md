# Lesson 4 — coverage matrix (pages 17–19)

The lesson reproduces **every printed sentence** of pages 17–19 of «تطابق
المثلثات», in printed order, and answers **every printed exercise and every
sub-question**. This file is the auditable map: printed prompt → student step →
Teacher Area solution.

Nothing is paraphrased into a summary, nothing is dropped, and no exercise is
replaced by a multiple-choice question. The labs are *additional* practice on
top of the printed work, never a substitute for it.

## Printed text → step

| Page | Printed element (verbatim source: `src/content/units/lesson-04-questions.ts`) | Student step | Origin |
| ---: | ----------------------------------------------------------------------------- | ------------ | ------ |
|   17 | Hint «وفق الانسحاب، أي شكل وصورته قابلان للانطباق…»                          | `l4-step-01-activity` | source |
|   17 | Activity figures ① ② ③ with `N` and `M` under each                            | `l4-step-01-activity` | source |
|   17 | Definition «يتطابق مثلثان إذا تساوت عناصر أحدهما…» + hint «عناصر المثلث…»      | `l4-step-02-definition` | source |
|   17 | «حالات تطابق مثلثين.» — case ①                                                | `l4-step-03-case-one` | source |
|   17 | Case ②                                                                        | `l4-step-05-case-two` | source |
|   17 | Case ③                                                                        | `l4-step-07-case-three` | source |
|   18 | Worked example ① (`AMB`, `EMF`)                                                | `l4-step-04-example-one` | source |
|   18 | Worked example ② (`AECF` / `ABCD`)                                             | `l4-step-06-example-two` | source |
|   18 | Worked example ③ (`ABCD`, diagonal `[AC]`)                                     | `l4-step-08-example-three` | source |
|   19 | «تحقّق من فهمك» — the rectangle                                                | `l4-step-09-check` | source |
|   19 | «تدرّب ①» — the kite                                                          | `l4-step-10-practice-one` | source |
|   19 | «تدرّب ②» — «في كل حالة، علل تطابق المثلثين»                                   | `l4-step-11-practice-two` | source |
|   19 | «تدرّب ③» — intro + sub-questions 1–4 + closing note                          | `l4-step-12-practice-three` | source |
|   18 | Closing note: the two right-triangle cases                                    | `l4-step-13-right-triangles` | source |

The eight platform steps (`شرح المنصّة`) sit between the source steps and never
carry a page number: `teachWhyCongruence`, `teachCasesLab`,
`teachChoosingCase`, `teachCheckWalkthrough`, `teachKiteLab`, `teachPairsLab`,
`teachProofLab`, `teachRecap`.

## Eleven printed prompts, thirteen solutions

`L4_PRINTED_PROMPTS` holds **eleven** prompts: the four activity questions, the
«تحقّق» question, «تدرّب ①», «تدرّب ②», and the four sub-questions of
«تدرّب ③». «تدرّب ②» is one prompt printed over **three figure pairs**, so the
Teacher Area carries one solution per pair — **thirteen** solutions in total.

| # | Printed prompt (verbatim) | Step | Teacher solution (`lesson-04-teacher.ts`) | Page ref |
| --: | --- | --- | --- | --- |
| 1 | «انقل الأشكال ① و ② و ③ إلى صفحة بيضاء. وفي كل حالة، ارسم صورة الشكل وفق الانسحاب الذي ينقل النقطة $N$ إلى النقطة $M$.» | `l4-step-01-activity` | the translation `N → M` is the same vector for all three panels; the image is drawn `NM` away from every vertex, and the printed lengths/angles survive because a translation is rigid | `صفحة 17 — النشاط — السؤال 1` |
| 2 | «في كل من الحالتين ① و ② أكمل الشكل لتحصل على المثلث $ABC$ ثم أكمل صورة هذا المثلث.» | `l4-step-01-activity` | ① is already closed by `[BC]` from `AB = 4`, `AC = 3`, `BÂC = 35°`; ② is closed by intersecting the two printed rays, and the closing sides are then translated | `صفحة 17 — النشاط — السؤال 2` |
| 3 | «ما صورة المثلث $ABC$ في كل من الحالات ① و ② و ③؟ ولماذا؟» | `l4-step-01-activity` | the image is the triangle `A′B′C′` with `AA′ = BB′ = CC′ = NM`; it is congruent because a translation preserves distances and angles | `صفحة 17 — النشاط — السؤال 3` |
| 4 | «إذن هل يمكنك ذكر الحالات التي يمكن من خلالها أن نحصل على مثلث يطابق مثلثاً معلوماً؟» | `l4-step-01-activity` | the three cases, each with the reason it determines the triangle (two sides + included angle; one side + its two adjacent angles; three sides) | `صفحة 17 — النشاط — السؤال 4` |
| 5 | «في الشكل المجاور: باستعمال كلّ من حالات التطابق السابقة، برهن أن المثلثين طبوقان.» | `l4-step-09-check` | three proofs of `ABD ≅ CDB`: SSS (equal opposite sides + common diagonal), SAS (right angles + equal legs), ASA (the `30°` at `B` and at `D` plus the common diagonal) | `صفحة 19 — تحقّق من فهمك` |
| 6 | «لاحظ الطائرة الورقية، هل يمكنك تحديد أزواج المثلثات الطبوقة في هذا الشكل.» | `l4-step-10-practice-one` | exactly three pairs — `ABE ≅ ADE` (SAS), `BCE ≅ DCE` (SAS), `ABC ≅ ADC` (SSS) — with the arithmetic `6² + 8² = 10²`, `12² + 8² = 208 ≈ 14.4²` | `صفحة 19 — تدرّب — ①` |
| 7 | «في كل حالة، علل تطابق المثلثين» — pair ① (`2, 3, 2.6`) | `l4-step-11-practice-two` | three equal sides ⇒ case ③ | `صفحة 19 — تدرّب — ② — الشكل ①` |
| 8 | same prompt — pair ② (`2, 4`, `80°`) | `l4-step-11-practice-two` | two sides + the included angle ⇒ case ① | `صفحة 19 — تدرّب — ② — الشكل ②` |
| 9 | same prompt — pair ③ (`4`, `44°`, `82°`) | `l4-step-11-practice-two` | one side + its two adjacent angles ⇒ case ② | `صفحة 19 — تدرّب — ② — الشكل ③` |
| 10 | «أثبت أن المثلثين $MEB$، $MFC$ طبوقان.» | `l4-step-12-practice-three` | `B̂ = Ĉ` (given), `BM = MC` (given), `MEB = MFC = 90°` ⇒ ASA | `صفحة 19 — تدرّب — ③ — 1` |
| 11 | «أثبت أن المثلثين $MEA$، $MFA$ طبوقان.» | `l4-step-12-practice-three` | `MA` common hypotenuse, `ME = MF` from (1), right angles at `E` and `F` ⇒ hypotenuse–leg | `صفحة 19 — تدرّب — ③ — 2` |
| 12 | «استنتج صحة الخاصة: ”إذا تساوى قياسا زاويتين في مثلث كان المثلث متساوي الساقين“.» | `l4-step-12-practice-three` | `AE = AF` and `EB = FC` from the two congruences ⇒ `AB = AE + EB = AF + FC = AC` | `صفحة 19 — تدرّب — ③ — 3` |
| 13 | «استنتج أن $(AM)$ ارتفاع في المثلث $ABC$ وأن $(AM)$ منصف للزاوية $A$.» | `l4-step-12-practice-three` | `MEA ≅ MFA` ⇒ `EÂM = MÂF` (bisector); `BM = MC` with `AB = AC` ⇒ median and height coincide | `صفحة 19 — تدرّب — ③ — 4` |

Every solution is a real derivation on the page — no «راجع الكتاب», no
one-line verdict without a reason. The Teacher Area labels them «حلول المعلم
(مستنتجة من المنصّة)» because the book prints no answers of its own.

## Worked examples: progressive reveal

The three page-18 examples are reproduced line by line, and each is shown with
its figure first. The student lab that follows (`teachCasesLab`) never prints a
verdict before review. The printed proofs are **not** converted into
multiple-choice: the two lab exercises that use choices *ask for the
justification* of a congruence the book already states, and the guided proof lab
asks for the reason of each step of «تدرّب ③».

## Platform additions (all badged)

| Addition | Badge | Why it exists |
| --- | --- | --- |
| 8 authored steps `شرح المنصّة` | kicker «شرح المنصّة» | connect the printed cases to the definition, and prepare each printed exercise |
| `auth-04-translation-intro`, `auth-04-definition-pair` | «رسم تعليمي من إعداد المنصّة» | page 17 prints a relation, not a measured figure |
| four labs | «رسم تعليمي» / «تمرين من إعداد المنصّة» | extra practice, reviewed as a whole |
| 12 assessment questions | `origin: 'authored'` | a lesson assessment the book does not print; it never replaces a printed exercise |
| 4 teacher overlays | «توضيح من إعداد المنصّة» | make the shaded triangles of the solutions visible |

No platform text is attributed to the textbook, and no textbook text is
attributed to the platform.

## How this is enforced

- `src/content/sourceFidelity.test.ts` — every textbook figure is verified, no
  lesson-4 figure is a `reference` placeholder, and each printed question has a
  solution.
- `src/app/App.test.tsx` — the Teacher Area renders exactly one disclosure per
  solution, with its page reference, under the «حلول المعلم» label.
- `src/components/diagram/renderers/lesson4/lesson4-diagrams.test.tsx` — the
  lesson's diagrams and labs render their controls, and no lab reveals a verdict
  before review.
