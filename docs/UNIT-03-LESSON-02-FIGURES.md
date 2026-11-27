# Unit 3 · Lesson 2 — figure record (pages 56–58)

Lesson `lesson-14-triangle-altitude` — «ارتفاع مثلث».

Every figure is a **platform drawing** (`origin: 'authored'`, renderer
`midline-figure`), and each caption says so:

> رسم تعليمي من إعداد المنصّة — الشكل تخطيطي غير مقيّس، والعلاقات الهندسية
> المعلَّمة فيه محقَّقة بالحساب.

**Why all of them are authored.** Pages 56–58 print no measurement except the
three data of «تحقّق من فهمك» (`B̂ = 120°`, `BA = 5`, `BC = 4` cm), which the
check figure writes at the sides and honours by construction. A redraw can be
faithful to the _relations_ of the printed figure, but not to its _dimensions_;
presenting it as a reproduction would claim a scale the source never gives.

Coordinates live in `src/content/units/lesson-14-geometry.ts` and are re-measured
by `lesson-14-geometry.test.ts` (31 assertions): the perpendicularity of every
altitude, the concurrence at `H` (orthocenter), and the position of `H` in each
of the three printed panels (`inside` / `outside` / `vertex`). The static figures
and the interactive lab read the same file, so they cannot drift apart.

## Marking rules

| Mark                          | Meaning in this lesson                                            |
| ----------------------------- | ----------------------------------------------------------------- |
| right-angle square at a foot  | the altitude is perpendicular to the opposite side                |
| `H` (image tone)              | the orthocenter — concurrence of the three altitudes              |
| double / triple ticks (proof) | `MA = AP`, `MB = BN`, `NC = CP` in the anticomplementary triangle |

## Page-57 panel numbering

The Arabic page numbers its three special-case panels **right to left**: `①` is
the right-hand panel (acute, `H` inside), `②` the middle (obtuse in `Â`, `H`
outside beyond `A`), `③` the left-hand one (right in `Â`, `H` at `A`). The
platform keeps that order in `fig-l14-special-cases` and in the lab presets.

## Figure-by-figure record

17 constructed specs, all embedded in the lesson, plus the interactive lab
`auth-14-altitude-lab`. Several figures serve both the student sequence and the
Teacher Area (a solution legitimately reads the given figure).

|   # | Diagram id                       | Page | Configuration                                                                                          |
| --: | -------------------------------- | ---: | ------------------------------------------------------------------------------------------------------ |
|   1 | `fig-l14-activity-given`         |   56 | three triangles (acute / obtuse / right) for the page-56 activity                                      |
|   2 | `fig-l14-proof-given`            |   56 | triangle `ABC` + lines through each vertex ∥ opposite side, meeting `M,N,P`                            |
|   3 | `fig-l14-proof-bisectors`        |   56 | altitudes of `ABC` as perpendicular bisectors of `MNP`; ticks `MA=AP`, `MB=BN`, `NC=CP`; concur at `H` |
|   4 | `fig-l14-definition`             |   56 | altitude `(d)` from `A` ⟂ `(BC)` at foot `P`, right angle at `P`                                       |
|   5 | `fig-l14-special-cases`          |   57 | three panels ①②③: acute (`H` inside) / obtuse (`H` outside) / right (`H` at `A`)                       |
|   6 | `fig-l14-example-one-given`      |   57 | obtuse triangle, `B` top-left, `C` top-right, `A` below                                                |
|   7 | `fig-l14-example-one-solution`   |   57 | altitudes from `A` and `B` meet at `H` below `A`; `[CA)` extended                                      |
|   8 | `fig-l14-example-two-given`      |   57 | `[AL]`, `[CK]` altitudes meeting at `H`; right angles at `L`, `K`                                      |
|   9 | `fig-l14-example-two-solution`   |   58 | triangle `AHC`, its altitudes `[AB]`, `[CB]` meet at `B`                                               |
|  10 | `fig-l14-check-given`            |   58 | `B̂ = 120°`, `BA = 5`, `BC = 4` cm written at the sides                                                 |
|  11 | `fig-l14-check-solution`         |   58 | the three altitudes of the obtuse triangle meet at `H` outside                                         |
|  12 | `fig-l14-practice-one-given`     |   58 | acute triangle, three altitudes concur at `H`                                                          |
|  13 | `fig-l14-practice-one-solution`  |   58 | orthocenters labelled: `AHC→B`, `AHB→C`, `BHC→A`                                                       |
|  14 | `fig-l14-practice-two-given`     |   58 | `[BE]`, `[CF]` altitudes meet at `J`; `[AJ]` drawn; right angles `E`,`F`                               |
|  15 | `fig-l14-practice-two-solution`  |   58 | orthocenter of `AJB` is `C`                                                                            |
|  16 | `fig-l14-practice-four-given`    |   58 | rectangle `ABCD`, center `O`, perpendicular from `O` to `(AC)` meets `(DC)` at `N`, `(AD)` at `M`      |
|  17 | `fig-l14-practice-four-solution` |   58 | triangle `AMC`, orthocenter `N`, third altitude `(AN)` ⟂ `(MC)`                                        |

No spec carries a hand-tuned `viewBox`: `constructedBlock` computes it from the
geometry (`fitViewBox`), padding frames by 0.55 and plain drawings by 0.45.
`lesson-14-coverage.test.ts` re-checks that every drawn segment and point falls
inside the computed box.

## Printed prompt → solution → figure

The book prints a solution **only for the two examples** (مثال 1، مثال 2);
those are reproduced verbatim and labelled «مطبوع». Every other prompt (activity,
proof, «تحقّق من فهمك», «تدرّب ①②④») has **no** printed solution; the 16 Teacher
Area records are platform-derived, and each `reference` says «حلّ من إعداد
المنصّة». «تدرّب» is printed ① then ② then ④ (no ③); the platform keeps the
printed labels verbatim. The proof names `MACB`/`BACN` verbatim; the derived
solution states the full chain (`MACB ⇒ MA=BC`, `ABCP ⇒ AP=BC`, hence `MA=AP`)
as a documented reading note, not a silent correction.

## Interactive lab

`auth-14-altitude-lab` (renderer `altitude-lab`) makes the page-56/57 concurrency
dynamic:

- the slider raises/lowers the apex `A`, morphing the triangle so the student
  watches `H` cross from inside to outside while concurrence never breaks;
- the three printed panels of page 57 are the three presets: acute (`H` inside),
  obtuse in `Â` (`H` outside), right in `Â` (`H` at the right-angle vertex);
- `HA`, `HB`, `HC` are recomputed at every position;
- `LessonFourteenRendering.test.tsx` drives the real controls: slider, the three
  presets, and the label set `A`, `B`, `C`, `H` in the SVG.

## Verification

- `lesson-14-geometry.test.ts` — 31 assertions on the coordinates.
- `lesson-14-coverage.test.ts` — registration, verbatim coverage of pages 56–58,
  16 prompts ↔ 16 solutions, figure ids, viewBox containment, the lab registered
  and embedded in an authored step.
- `LessonFourteenRendering.test.tsx` — every step rendered through the router.
- **Visual rasterization.** Every figure (17 static + the lab presets and the
  slider extremes `t = ±2.6`) was rasterised from the real layout output (the
  same `computeLabelLayout`/`figureTypography` the app uses) via resvg and
  inspected panel by panel. The acute/obtuse/right panels, the proof ticks, the
  check data (120°, 5 cm, 4 cm), and the orthocenter positions were all confirmed
  against the scans. At both slider extremes `H` stays within the lab viewBox
  `{-2,-3,13,13}` — no clipping.
