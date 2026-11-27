# Unit 3 · Lesson 3 — figure record (pages 59–61)

Lesson `lesson-15-triangle-median` — «المتوسط في المثلث».

Every figure is a **platform drawing** (`origin: 'authored'`, renderer
`midline-figure`), captioned as a teaching redraw. Pages 59–61 print no
measurement except the example/practice data (`AG = 2.4`, `GM = 1.2`;
`AB = 7`, `Â = 70°`, `AC = 8`; `AG = 3.4`, `GM = 1.7` cm), which the figures
write at the sides and honour by construction.

Coordinates live in `src/content/units/lesson-15-geometry.ts`, re-measured by
`lesson-15-geometry.test.ts` (25 assertions): each median passes through the
midpoint of the opposite side, the three concur at the centroid `G`, and
`AG = ⅔AA′` (equivalently `AG = 2GA′`), likewise for `B`, `C`. The proof
construction (`D` = reflection of `A` in `G`, `JG ∥ BD`, `BD = 2JG`, `BGCD` a
parallelogram, `K = AD∩BC` the midpoint of `[BC]`) is verified arithmetically.

## Marking rules

| Mark                                 | Meaning                                               |
| ------------------------------------ | ----------------------------------------------------- |
| double tick on both halves of a side | the line passes through the **midpoint** of that side |
| `G` (image tone)                     | the centroid — concurrence of the three medians       |
| 1 / 3 / 2 ticks (properties)         | three **distinct** midpoint marks, one per side       |

**Properties figure (p.60), documented editorial adaptation.** The source marks
the halves of `[AB]` with a single stroke, `[AC]` with a small cross, `[BC]` with
a double stroke — three distinct marks so no cross-side equality is implied. The
platform's tick vocabulary expresses the same distinction with **1 / 3 / 2**
ticks respectively; the meaning (each side is bisected) is unchanged. The printed
properties figure marks the midpoints and the concurrence at `G`; the **2:1 ratio
is stated in the خواص text** (`AG = ⅔AA′`), not tick-marked on the figure, and the
platform reproduces it the same way (the ratio is shown in the lab metrics and
the example/practice figures that print it).

## Page-59 test panels — printed layout (correction recorded)

The printed test figure shows **two unlabelled triangles: the acute one on the
LEFT, the obtuse one on the RIGHT**. The text names them `ABC` then `EFJ`. The
platform therefore draws `① = ABC` (acute, left) and `② = EFJ` (obtuse, right),
each centred in its own frame (`TEST_DX = [0, 8.1]`).

> **Correction during the visual audit.** An earlier draft mirrored the layout
> (`TEST_DX = [9.0, 0]`, acute right). Rasterizing the real pipeline output and
> comparing with the page-59 scan exposed the mirror; the panels were swapped to
> match the print (and the figure's own alt text «أيسرهما حاد الزوايا وأيمنهما
> منفرج»). The labels `ABC`/`EFJ` are an editorial assignment (the print is
> unlabelled), documented in `lesson-15-questions.ts`.

## Figure-by-figure record

18 constructed specs, all embedded, plus the interactive lab `auth-15-median-lab`.

|   # | Diagram id                           | Page | Configuration                                                               |
| --: | ------------------------------------ | ---: | --------------------------------------------------------------------------- |
|   1 | `fig-l15-meaning-given`              |   59 | line through `A` and midpoint `M` of `[BC]` (double ticks)                  |
|   2 | `fig-l15-test-given`                 |   59 | two unlabelled triangles: acute left ①, obtuse right ②                      |
|   3 | `fig-l15-test-solution`              |   59 | labelled `ABC` (left), `EFJ` (right); medians concur at `G`                 |
|   4 | `fig-l15-proof-given`                |   59 | `J` midpoint `AB` (1 tick), `I` midpoint `AC` (2 ticks); `BI`,`CJ` meet `G` |
|   5 | `fig-l15-proof-solution`             |   59 | `D` reflection of `A` in `G`; `K=AD∩BC`; parallelogram `BGCD`; median `AK`  |
|   6 | `fig-l15-physics`                    |   59 | triangle hung from `A`, vertical plumb line (الشاقول) through `A`,`G`       |
|   7 | `fig-l15-definition`                 |   60 | median `[AM]`, `M` midpoint of `[BC]` (double ticks)                        |
|   8 | `fig-l15-properties`                 |   60 | midpoints `A′,B′,C′` (1/3/2 ticks); medians concur at `G`                   |
|   9 | `fig-l15-example-one-given`          |   60 | `G∈[AM]`, `AG=2.4`, `GM=1.2` cm                                             |
|  10 | `fig-l15-example-one-solution`       |   60 | `G` labelled «مركز الثقل»                                                   |
|  11 | `fig-l15-example-two-given`          |   61 | parallelogram `ABCD`, center `O`, `M` midpoint `AB`, `G=CM∩BD`              |
|  12 | `fig-l15-example-two-solution`       |   61 | triangle `ABC`, medians `CM`,`BO` (`O` midpoint `AC`) meet `G`              |
|  13 | `fig-l15-check-given`                |   61 | `AB=7`, `Â=70°`, `AC=8` cm                                                  |
|  14 | `fig-l15-check-solution`             |   61 | three medians concur at `G`                                                 |
|  15 | `fig-l15-practice-case-one-given`    |   61 | `A` left, `C` top-right, `B` bottom-right; `AG=3.4`, `GM=1.7` cm            |
|  16 | `fig-l15-practice-case-one-solution` |   61 | `G` labelled centroid                                                       |
|  17 | `fig-l15-practice-case-two-given`    |   61 | parallelogram `AMCI`, center `J`, `I` midpoint `AB`, `G=BJ∩CI`              |
|  18 | `fig-l15-practice-case-two-solution` |   61 | triangle `ABC`, medians `CI`,`BJ` (`J` midpoint `AC`) meet `G`              |

`constructedBlock` computes every `viewBox` (`fitViewBox`); the coverage test
re-checks containment of every segment and point.

## Printed prompt → solution → figure

The book prints a solution **only for the two examples** (pp.60, 61); those are
reproduced verbatim and labelled «مطبوع». Every other prompt has **no** printed
solution; the 16 Teacher Area records are platform-derived («حلّ من إعداد
المنصّة»). The proof prints `(BD)∥(JG)` and `BD=2JG` (midsegment of `ABD`); the
platform keeps `JG` (not `IG`) verbatim.

## Interactive lab

`auth-15-median-lab` (renderer `median-lab`): the three medians always concur at
`G`, with `AG = ⅔AA′` shown in the metrics; the three presets are the printed
parallelogram/triangle configurations (scalene, acute, obtuse). The centroid is
always inside. `LessonFifteenRendering.test.tsx` drives the slider, the presets,
and the label set `A`, `B`, `C`, `G`.

## Verification

- `lesson-15-geometry.test.ts` — 25 assertions.
- `lesson-15-coverage.test.ts` — registration, verbatim coverage of pages 59–61,
  16 prompts ↔ 16 solutions, figure ids, viewBox containment, lab embedded.
- `LessonFifteenRendering.test.tsx` — every step rendered through the router.
- **Visual rasterization.** All 18 static figures and the three lab presets were
  rasterised from the real pipeline output and inspected against the scans. The
  test-panel mirror was found and fixed (above); the properties ticks (1/3/2),
  the example/practice ratios (2.4/1.2, 3.4/1.7), the check data (7 cm, 70°,
  8 cm), the proof parallelogram, and the plumb-line schematic were all confirmed.
