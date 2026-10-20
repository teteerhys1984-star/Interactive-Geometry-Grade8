# Lesson 4 — source figures and geometry audit (pages 17–19)

The source for «تطابق المثلثات» is the three page scans supplied for this task:
**page 17**, **page 18** and **page 19**. This document records, figure by
figure, how each one is produced and why that decision is safe.

**Headline: no crop is published and no figure is a «راجع الكتاب» placeholder.**
Every printed figure of the lesson is rebuilt natively as SVG from the values
printed on it, and every coordinate lives in
`src/content/units/lesson-04-geometry.ts`, where it is re-measured by
`src/content/units/lesson-04-geometry.test.ts`.

| Origin     | Count | Where                                    | Badge / caption                                                            |
| ---------- | ----: | ---------------------------------------- | -------------------------------------------------------------------------- |
| `textbook` |     8 | student steps                            | «صفحة ١٧ — الشكل المطبوع — أُعيد رسمه من قِيَمه المطبوعة، مثبَّتة بالحساب.»   |
| `authored` |     6 | student steps and labs                   | «رسم تعليمي من إعداد المنصّة»                                              |
| `authored` |     4 | Teacher Area only                        | «توضيح من إعداد المنصّة»                                                   |

The eight `textbook` figures are on the `VERIFIED_TEXTBOOK_FIGURES` list in
`src/content/sourceFidelity.test.ts`; that test refuses any redrawn textbook
figure that is not on it.

## Why a redraw is faithful here

The printed pages are **schematic**: almost no figure carries a complete set of
measured distances. What each figure does carry is a set of *constraints* —
lengths, angle measures, right-angle marks, tick marks, "opposite sides of a
parallelogram", "the diagonals bisect each other", "vertically opposite angles".
For a triangle-shaped figure those constraints determine the drawing up to a
rigid motion, so the redraw is not an artist's guess: it is the unique figure
satisfying the printed data. The derivation of each one is written beside it in
`lesson-04-geometry.ts`, and the tests re-measure it against the printed values.

Two figures print **no measurement at all** (page 17's opening sketch and its
definition figure). Those are drawn by the platform as true translates and are
badged `origin: 'authored'`; they are never presented as printed distances.

## Textbook figures (8)

| Page | Diagram id                 | Source of every coordinate                                                                                                                                                                     |
| ---: | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   17 | `fig-17-activity-cases`    | ① `AC = 3`, `AB = 4`, `BÂC = 35°` → SAS constructor. ② `AC = 3`, `BÂC = 35°`, `AĈB = 85°` → ASA constructor, plus the two open rays the student must close. ③ `AB = 4`, `BC = 2`, `AC = 3` → SSS constructor. `N` and `M` are printed under every panel and are drawn under each of the three frames. |
|   18 | `fig-18-example-sas`       | `AM = ME = 5`, `BM = MF = 7`, `A`, `M`, `E` collinear and `B`, `M`, `F` collinear ⇒ `M` is the midpoint of both `[AE]` and `[BF]`. Only the *orientation* of the pair is free (the printed sketch is not to scale); it is fixed at 35°, and the test checks the vertical angles and all four lengths. |
|   18 | `fig-18-example-asa`       | `AECF` parallelogram around rectangle `ABCD`, with `B ∈ [EA]`, `D ∈ [FC]`, `AB = DC`, `FD = BE`, `F̂ = Ê` and `CBE = FDA = 90°`. Built as a 8 × 3.2 rectangle extended by the same 2.4 above and below: `mid(AC) = mid(EF)`, so the parallelogram property and `BE = FD = 2.4` both hold exactly. |
|   18 | `fig-18-example-sss`       | `ABCD` parallelogram with the diagonal `[AC]`. The printed text fixes only the parallelism and the two pairs of equal opposite sides, both of which the coordinates satisfy. |
|   19 | `fig-19-check-rectangle`   | Rectangle with right angles at `A` and `C`, one tick on `[AB]`/`[DC]`, two ticks on `[AD]`/`[BC]`, and `30°` at `D` and at `B`. Those two angles are the alternate interior angles made by the diagonal `[BD]`, so `tan 30° = AD / AB`; with `AB = 6` the rectangle is fixed (`AD = 6·tan 30° = 3.464…`). |
|   19 | `fig-19-kite`              | `AE = 12`, `CE = 6`, `BE = ED = 8`, right angles at `E`. The printed numbers are consistent: `BC² = 6² + 8² = 100 = 10²` exactly, and `AB² = 12² + 8² = 208`, i.e. `14.422…`, printed as **14.4**. The figure is rotated 24° only to match the printed lean; a rigid rotation changes no length. |
|   19 | `fig-19-pairs`             | ① sides `2, 3, 2.6` on both triangles; ② sides `2` and `4` with the included `80°`; ③ the side `4` between the angles `44°` and `82°`. The second triangle of each pair is a rigid copy (rotation + translation), which the tests verify side by side. |
|   19 | `fig-19-isosceles`          | `B̂ = Ĉ`, `BM = MC`, `ME ⟂ (AB)` with `E ∈ [AB]`, `MF ⟂ (AC)` with `F ∈ [AC]`. Isosceles triangle plus the two feet of the perpendiculars computed with `footOfPerpendicular`; the tests check `ME = MF`, both right angles and the two congruent pairs. |

### Two documented consequences of the printed data

1. **The kite's 14.4 is a rounded value.** `AB = √208 = 14.4222…`. The figure
   uses the exact construction (`AE = 12`, `BE = 8`, right angle at `E`) and
   prints `14.4`, exactly as the book does. Nothing is fudged: the test asserts
   `|AB − 14.4| ≤ 0.05`.
2. **The isosceles proof needs no assumption about `E` and `F`.** `E` and `F`
   are computed as true perpendicular feet, so `MEB ≅ MFC` (ASA) and
   `MEA ≅ MFA` (hypotenuse–leg) are consequences of the coordinates, not
   assertions. `lesson-04-geometry.test.ts` proves both.

## Student-facing platform diagrams (6)

Six new diagrams, all badged and captioned as platform work. None of them is a
printed figure, and none claims printed distances.

| Diagram id                    | Renderer                | Purpose                                                                 |
| ----------------------------- | ----------------------- | ----------------------------------------------------------------------- |
| `auth-04-translation-intro`   | `congruence-figure`     | Shows what page 17 asserts without a figure: a triangle and its image under one translation are superposable. Drawn as a true translate. |
| `auth-04-definition-pair`     | `congruence-figure`     | The two congruent triangles of the definition, with `A↔A′`, `B↔B′`, `C↔C′` explicitly paired. Also a true translate. |
| `auth-04-cases-lab`           | `congruence-cases-lab`  | The page-17 activity as an interaction: printed data → completed `ABC` → image under `N → M`, with every side and angle compared live by the renderer. |
| `auth-04-practice-pairs-lab`  | `case-justify-lab`      | The three printed pairs of «تدرّب ②»: pick the case that justifies each congruence; the whole set is reviewed at once. |
| `auth-04-kite-lab`            | `kite-pair-lab`         | «تدرّب ①»: mark the congruent pairs of the kite; the reasons arrive together on review, never per click. |
| `auth-04-proof-lab`           | `congruence-proof-lab`  | «تدرّب ③»: the four printed sub-questions as a guided proof, reviewed as a whole. |

**Totals: 8 printed figures + 6 student-facing platform diagrams + 4
teacher-only diagrams = 18 diagrams; 8 of them reproduce a printed figure, 10
are platform work, and 0 are crops.**

## Teacher-only figures (4)

Never shown on the student side; always badged «توضيح من إعداد المنصّة».

| Diagram id                  | Purpose                                                                |
| --------------------------- | ---------------------------------------------------------------------- |
| `auth-04-teacher-activity`  | Activity ①: the completed `ABC` (SAS) and its image under `N → M`, with dashed arrows `AA′`, `BB′`, `CC′` — the answer to printed questions 1 and 2. |
| `auth-04-teacher-check`     | The check-your-understanding rectangle split by `[BD]` into the two shaded triangles. |
| `auth-04-teacher-kite`      | The kite with its four small triangles shaded around the diagonal intersection. |
| `auth-04-teacher-isosceles` | The isosceles triangle with `MEB` and `MFC` shaded.                    |

## Crops

There are no crops. The scans were used only as reading material; the uploaded
images are not committed, and `public/diagrams/unit-01/lesson-04/` does not
exist. If a future revision needs one, it must be recorded here with its page
and the reason a redraw was not safe.

## Verification

| Check                                              | Command / file                                    |
| -------------------------------------------------- | ------------------------------------------------- |
| Every coordinate re-measured against the printed values | `src/content/units/lesson-04-geometry.test.ts` (22 tests) |
| Readers reject malformed specs, real content passes | `src/components/diagram/renderers/lesson4/params.test.ts` |
| Every diagram emits real SVG ink                   | `src/components/diagram/renderers/lesson4/lesson4-diagrams.test.tsx` |
| Redrawn textbook figures are on the verified list  | `src/content/sourceFidelity.test.ts`              |

**Known limitation.** No headless browser is available in this environment
(Playwright's Chromium download fails), so the figures are verified by
geometry + jsdom rendering assertions only. They have **not** been checked by
eye in a browser, and no screenshot QA is claimed.
