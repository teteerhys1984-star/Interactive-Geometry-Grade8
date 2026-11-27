# Unit 3 · Lesson 4 — figure record (pages 62–63)

Lesson `lesson-16-angle-bisector` — «منصّف زاوية مثلث».

Every figure is a **platform drawing** (`origin: 'authored'`, renderer
`midline-figure`), captioned as a teaching redraw. Pages 62–63 print no
measurement except the check/practice data (`BC = 7`, `B̂ = 36°`, `Ĉ = 64°`;
`∠CRT = 25°`, `∠CTR = 31°`; `B̂ = 84°`, `Ĉ = 62°`), which the figures write and
honour by construction.

Coordinates live in `src/content/units/lesson-16-geometry.ts`, re-measured by
`lesson-16-geometry.test.ts` (25 assertions): each bisector divides its angle
into two equal angles, the three concur at the incenter `I`, `I` is equidistant
from the three sides (inradius), and the inscribed circle is tangent to all three
sides. The proof (`L` foot on `BC`; `H` on `BA` with `BH=BL` ⇒ `IH=IL`,
`∠IHB=90°`; `K` on `AC` with `CK=CL` ⇒ `IK=IL`, `∠IKC=90°`; with `AH=AK`
**admitted**, `(AI)` is the perpendicular bisector of `[HK]` and the bisector of
`Â`) is verified where the source proves it. `AH=AK` is admitted exactly as the
source admits it (a next-chapter theorem) and is **not** re-proved.

## Marking rules

| Mark                          | Meaning                                           |
| ----------------------------- | ------------------------------------------------- |
| two equal-angle marks (˟˟)    | the line bisects the vertex angle                 |
| right-angle square at a foot  | the radius/perpendicular is ⟂ to the side         |
| double ticks `BH=BL`, `CK=CL` | the proof's equal segments                        |
| `I` (image tone)              | the incenter — concurrence of the three bisectors |
| dashed circle                 | the inscribed circle, tangent to the three sides  |

## Page-62 test panels — printed layout (correction recorded)

The printed test figure shows **two labelled triangles: `ABC` on the LEFT,
`EFJ` on the RIGHT** (`E` top-left, `F` top-right, `J` bottom). The platform
draws `① = ABC` (left) and `② = EFJ` (right), each centred in its own frame
(`TEST_DX = [0, 8.1]`).

> **Correction during the visual audit.** An earlier draft mirrored the layout
> (`TEST_DX = [9.0, 0]`, `ABC` right). Rasterizing the real pipeline output and
> comparing with the page-62 scan exposed the mirror; the panels were swapped to
> match the printed labels (and the figure's own alt text «ABC (أيسر) وEFJ
> (أيمن)»). Unlike Lesson 3, the print here **labels** the triangles, so the
> assignment is not editorial.

## Proof given figure — right-angle mark (correction recorded)

The printed **given** figure marks the right angle **only at `L`** (the foot of
the perpendicular from `I` on `BC`); it shows `H` on `AB` with `BH=BL` (double
ticks) and the segments `IH`, `IL`. `∠IHB = 90°` is the **conclusion of step ③**,
and `K`/the inscribed circle appear only in steps 4–7.

> **Correction during the visual audit.** An earlier draft of
> `fig-l16-proof-given` added a right-angle mark at `H`, which both contradicted
> the print and gave away step ③. The mark was removed from the given figure; it
> remains in `fig-l16-proof-solution` (right angles at `H`, `L`, `K`), where the
> conclusion belongs. This matches reading note #3 of the source map.

## Figure-by-figure record

12 constructed specs, all embedded, plus the interactive lab
`auth-16-angle-bisector-lab`.

|   # | Diagram id                      | Page | Configuration                                                                          |
| --: | ------------------------------- | ---: | -------------------------------------------------------------------------------------- |
|   1 | `fig-l16-test-given`            |   62 | `ABC` left ①, `EFJ` right ② (labelled)                                                 |
|   2 | `fig-l16-test-solution`         |   62 | three bisectors concur at `I` in each triangle                                         |
|   3 | `fig-l16-proof-given`           |   62 | `(d₁)`,`(d₂)` meet `I`; `L` foot (right angle); `H` with `BH=BL`; `IH`,`IL`            |
|   4 | `fig-l16-proof-solution`        |   62 | `IH=IL=IK`, right angles `H,L,K`; `(AI)` bisects `Â`; incircle through `L,H,K`         |
|   5 | `fig-l16-definition`            |   63 | bisector from `A` to `E` on `BC`; two equal-angle marks at `A`                         |
|   6 | `fig-l16-properties`            |   63 | three bisectors concur at `I`; incircle tangent to the sides; right angles at tangency |
|   7 | `fig-l16-check-given`           |   63 | `BC=7`, `B̂=36°`, `Ĉ=64°` cm                                                            |
|   8 | `fig-l16-check-solution`        |   63 | three bisectors concur at `I`                                                          |
|   9 | `fig-l16-practice-one-given`    |   63 | `ERT` (`E` top, `R` left, `T` right), incenter `C`; `∠CRT=25°`, `∠CTR=31°`             |
|  10 | `fig-l16-practice-one-solution` |   63 | `∠R=50°`, `∠T=62°`, `∠RET=68°`; `EC` third bisector                                    |
|  11 | `fig-l16-practice-two-given`    |   63 | `B̂=84°`, `Ĉ=62°`; `J` intersection of their bisectors                                  |
|  12 | `fig-l16-practice-two-solution` |   63 | `Â=34°`; angles about `J` = `121°/107°/132°`; `JA` third bisector                      |

`constructedBlock` computes every `viewBox`; the coverage test re-checks
containment.

## Printed prompt → solution → figure

Pages 62–63 print **no** solution for any prompt; all 15 Teacher Area records are
platform-derived («حلّ من إعداد المنصّة»). The first 💡 on p.63 is the
**circumscribed**-circle review (Lesson 1), the second the **inscribed** circle;
both are reproduced verbatim. The check angles are `36°` at `B` and `64°` at `C`
(not swapped); practice ② uses `84°`/`62°` with `J` the incenter.

## Interactive lab

`auth-16-angle-bisector-lab` (renderer `angle-bisector-lab`): the three bisectors
always concur at `I`; a toggle draws the inscribed circle (tangent to the three
sides). The incenter is always inside. The three presets are scalene / acute /
obtuse. `LessonSixteenRendering.test.tsx` drives the slider, the incircle toggle,
the presets, and the label set `A`, `B`, `C`, `I`.

## Verification

- `lesson-16-geometry.test.ts` — 25 assertions.
- `lesson-16-coverage.test.ts` — registration, verbatim coverage of pages 62–63,
  15 prompts ↔ 15 solutions, figure ids, viewBox containment, lab embedded,
  `AH=AK` admitted (not re-proved).
- `LessonSixteenRendering.test.tsx` — every step rendered through the router.
- **Visual rasterization.** All 12 static figures and the six lab states (three
  presets × incircle on/off) were rasterised from the real pipeline output and
  inspected against the scans. The test-panel mirror and the premature
  right-angle mark at `H` were found and fixed (above); the check data (7 cm,
  36°, 64°), practice ① (25°/31° ⇒ 50°/62°/68°), practice ② (84°/62° ⇒ 34° and
  121°/107°/132°), the definition marks, and the incircle tangency were all
  confirmed.
