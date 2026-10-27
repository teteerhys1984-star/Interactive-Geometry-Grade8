# Unit 2 Final Exercises — Figure Verification Record

## 1. The contract this record answers to

`docs/DIAGRAMS.md` allows a renderer to draw a **textbook** figure only when
every coordinate was read from the scan and then verified arithmetically, and
when that verification is written down per figure. This file is that record
for the figures of `lesson-12-unit-two-exercises`.

The reconstructed figures live in one place:

| File                                                      | What it holds                                            |
| --------------------------------------------------------- | -------------------------------------------------------- |
| `src/content/units/lesson-12-unit-two-exercises-geometry.ts` | every measured coordinate, with the reading beside it  |
| `src/content/units/lesson-12-figures.ts`                    | the twelve figure specs (alt, caption, source, renderer) |
| `src/components/diagram/renderers/UnitTwoExercisesFigure.tsx` | the static SVG renderer, one scenario per figure     |
| `src/content/units/lesson-12-unit-two-exercises-geometry.test.ts` | the arithmetic checks that back this record         |

**Two coordinate systems are in use, and each one is declared in the
geometry file:**

* **Questions 28–Q34** are drawn in a canvas of `640 × …` units; the scan
  pixel reading is mapped into that canvas by ONE affine transform (uniform
  scale + translation, no shear, no per-axis stretch), and the mapping
  (region, scale, offsets) is written above each figure.
* **Questions 20–27** are drawn **in the scan pixel grid itself** — the SVG
  coordinate system of each of them is the pixel grid of its figure region.
  This keeps every reading checkable by eye against the scan, and it keeps
  the two drawings that ARE to scale (Q26 and Q27) in their printed
  proportions.

---

## 2. Inventory

| # | Figure id                                | Q   | Kind         | Origin   | Printed marks carried |
| - | ---------------------------------------- | --- | ------------ | -------- | --------------------- |
| 1 | `fig-u2-q20-flowchart`                   | 20  | interactive  | textbook | the fourteen blue boxes, the connectors, the four dotted blanks |
| 2 | `fig-u2-q21-midpoint-quadrilateral`      | 21  | interactive  | textbook | the blue `ABCD`, the red `EFGH`, the eight labels |
| 3 | `fig-u2-q24-altitude-bisector`           | 24  | interactive  | textbook | the blue altitude + right angle, the red line, four red ticks |
| 4 | `fig-u2-q26-parallel-segment`            | 26  | interactive  | textbook | the blue `(AC)` and `(MN)`, the red altitude + right angle |
| 5 | `fig-u2-q27-unknowns`                    | 27  | interactive  | textbook | the blue `(ST)` and `(GE)`, the six red measurements |
| 6 | `fig-u2-q28-midpoint-parallel`           | 28  | interactive  | textbook | two/two/one/one blue ticks, one red and one black arrowhead |
| 7 | `fig-u2-q29-equal-ratios`                | 29  | interactive  | textbook | the blue base and `[NM]`, the red transversal, `3`, `2`, `4.5` |
| 8 | `fig-u2-q30-divide-segment`              | 30  | interactive  | textbook | the blue ray, the five red ticks, the labels `A`…`F` |
| 9 | `fig-u2-q31-tower-photo`                 | 31  | **image**    | textbook | the printed photograph, kept as printed |
| 10 | `fig-u2-q32-distance-towers`            | 32  | interactive  | textbook | the blue verticals, the sight line, `40`, `30`, `50`, `x` |
| 11 | `fig-u2-q33-case-one`                   | 33  | interactive  | textbook | the two red segments |
| 12 | `fig-u2-q33-case-two`                   | 33  | interactive  | textbook | the three red segments, the point `M` |

---

## 3. Per-figure verification

### 3.1 Q20 — the printed flowchart (`fig-u2-q20-flowchart`)

* **Reading.** The fifteen blue boxes of the page were located by finding
  the blue horizontal and vertical runs of their borders; the fourteen
  rectangles and the fourteen connectors are those readings, not a redrawn
  arrangement.
* **Asserted.** Every connector starts on the border of one printed box and
  ends on the border of another (the test checks all fourteen).
* **Asserted.** Four of the boxes carry the printed dotted line and no
  wording; they stay empty — they are the printed blanks of the exercise.
* **Not asserted.** No inference is drawn from the flowchart about the proof
  it organises: the boxes that print a conclusion are printed conclusions,
  and the platform publishes no solution.
* **Reproduced directly beneath the flowchart.** The three circled sub-items
  `①–③` printed below the flowchart (completing item 4; see
  `docs/UNIT-02-EXERCISES-SOURCE.md` § 3.2).

### 3.2 Q21 — the quadrilateral and its midpoints (`fig-u2-q21-midpoint-quadrilateral`)

* **Reading.** `A (207,54) B (73,318) C (497,318) D (524,122)` and
  `E (144,186) F (285,315) G (511,221) H (369,89)`; every vertex is the
  intersection of the two lines that meet there.
* **Asserted.** `E`, `F`, `G`, `H` lie on `[AB]`, `[BC]`, `[CD]`, `[DA]`.
* **Asserted.** They are the midpoints of those sides: `E` is 4 px from the
  midpoint of `[AB]`, `F` 1 px, `G` 1 px, `H` 4 px.
* **Not asserted.** The drawn angles and lengths of the quadrilateral.

### 3.3 Q24 — the altitude and the line through the two midpoints (`fig-u2-q24-altitude-bisector`)

* **Reading.** `A (220,164) B (80,405) C (500,404) H (220,406)`,
  `I (146,286) J (356,285) K (220,286)`; the printed red line `(IJ)` runs
  from `x = 64` to `x = 547` at `y = 288` — it is drawn well past `I` and
  past `J`, and the reconstruction keeps that overhang.
* **Asserted.** `I` is 4 px from the midpoint of `[AB]`, `J` 4 px from the
  midpoint of `[AC]`, `K` 1 px from the midpoint of `[AH]`.
* **Asserted.** The printed marks: a DOUBLE tick on each of `[AI]` and
  `[IB]`, a SINGLE tick on each of `[AJ]` and `[JC]`, and the blue
  right-angle mark at `H`.
* **Not asserted.** The drawn angles of the triangle.

### 3.4 Q26 — the triangle, the parallel segment and the altitude (`fig-u2-q26-parallel-segment`)

* **Reading.** `A (454,201) B (52,499) C (680,499) H (454,499)`,
  `M (248,353) N (353,499)`.
* **This drawing IS to scale.** One printed centimetre measures 100 scan
  pixels. Measured on the reconstruction: `BM = 244 px = 2.4 cm`,
  `BN = 301 px = 3 cm`, `AB = 501 px = 5 cm`, `MN = 180 px = 1.8 cm`,
  `AH = 298 px = 3 cm` — the five printed lengths, each within 2 %.
* **Asserted.** `(MN)` and `(AC)` are drawn at 53.16° and 53.43°, i.e.
  parallel, as the sentence prints them.
* **Asserted.** The red altitude is perpendicular to the base, and `H` lies
  on `[BC]`.
* **Not asserted.** Nothing is asserted about the areas the exercise asks
  for; they are the student's task.

### 3.5 Q27 — the triangle with the two parallel segments (`fig-u2-q27-unknowns`)

* **Reading.** `F (70,398) G (507,398) E (778,58) S (509,188) T (342,398)`.
* **This drawing IS to scale.** One printed unit measures about 54.07 scan
  pixels. Measured on the reconstruction: `FS = 487 px = 9 units`,
  `TG = 165 px = 3 units`, `ST = 268 px = 5 units`, `GE = 435 px = 8 units`,
  each within 2 %.
* **Asserted.** `(ST)` is parallel to `(GE)` (the printed Thales setup).
* **Asserted.** The two ratios the exercise asks the student to prove hold
  on the drawing: `FS/FE = 0.620` and `ST/GE = 0.617`.
* **Not asserted.** The values of `x` and `y` — they are the student's task,
  and the figure shows only the printed unknowns.

### 3.6 Q28 — the quadrilateral with its marks (`fig-u2-q28-midpoint-parallel`)

* **Reading.** `E (243.9,41.3) F (42.2,376.8) G (504.4,467.0) H (600.0,184.4)
  M (143.6,205.8) N (374.3,254.3) P (421.9,112.6)`; the red line runs from
  `(445.0,43.9)` to `(346.4,337.3)`.
* **Asserted.** `M` lies on `[EF]` (0.9 px) and is 2.5 px from its midpoint;
  `N` lies on `[EG]` (0.0 px) and 0.1 px from its midpoint; `P` lies on
  `[EH]` (0.1 px).
* **Asserted.** The printed marks: TWO blue ticks on each of `[EM]` and
  `[MF]`, ONE blue tick on each of `[EN]` and `[NG]`, one red arrowhead on
  `(NP)` and one black arrowhead on `(HG)`.
* **Not asserted.** The drawn angles. The printed parallel marks are what
  decide the relation; the scan's own lines differ from perfect parallelism
  by about two degrees, and the reconstruction does not straighten them.

### 3.7 Q29 — the triangle with the transversal (`fig-u2-q29-equal-ratios`)

* **Reading.** `A (606,103) B (739,424) C (65,424) N (374,242) M (660,242)
  J (546,242) K (471,424)`.
* **Asserted.** `N` lies on `[AC]`, `M` on `[AB]`, `J` on `[NM]` and on the
  transversal `[AK]`, `K` on `[CB]`; `(NM)` and `(BC)` are horizontal.
* **Asserted.** The printed lengths sit between the points they measure:
  `3` between `N` and `J`, `2` between `J` and `M`, `4.5` between `K` and
  `B`.
* **Not asserted.** The drawn lengths — the printed numbers are the given
  data, not the drawing's proportions.

### 3.8 Q30 — the segment to be divided (`fig-u2-q30-divide-segment`)

* **Reading.** `A … F` on one line, the blue ray `[Ax)`, five red ticks.
* **Asserted.** `A`, `B`, `C`, `D`, `E`, `F` are collinear and in that
  order; the ray starts at `A` and lifts away from the segment.
* **Not asserted, and not added.** The printed figure carries no `M`: the
  exercise asks the student to place it on the ray `[Ax)`, and the
  reconstruction does not add it.

### 3.9 Q31 — the photograph (`fig-u2-q31-tower-photo`)

* **This figure is NOT redrawn.** The page prints a photograph, and the
  platform keeps it as an approved source image
  (`public/diagrams/unit-02/exercises/q31-tower-photo.png`, cropped from
  the scan, 634 × 286).
* **It is not a drawing to scale, and nothing is measured from it.** The
  exercise still asks the student for a separate schematic, and the caption
  says so.
* The printed dashed line (post top → lighthouse apex) is part of the
  photograph and is kept as it is.

### 3.10 Q32 — the two towers (`fig-u2-q32-distance-towers`)

* **Reading.** `A`, `B` (40 m), `C`, `M` (30 m), `K`, the ground line, the
  sight line `A–C–K`, the printed `50` on `[BM]` and `x` on `[MK]`.
* **Asserted.** The two verticals are vertical, `B`, `M` and `K` are on the
  ground in that order, and `C` lies on the sight line from `A` to `K`.
* **Not asserted.** The drawn lengths — the printed `40`, `30`, `50` and
  `x` are the data.

### 3.11 Q33 — the two cases (`fig-u2-q33-case-one`, `fig-u2-q33-case-two`)

* **Case ①.** `S`, `N`, `I`, `T` on one line and `S`, `K`, `J`, `U` on
  another; the printed order `N` before `I` and `K` before `J`; the two red
  segments `(NK)` and `(IJ)` parallel to the two sides.
* **Case ②.** The printed collinear triples are kept: `A`, `B`, `C`;
  `A`, `H`, `D`, `I`, `E`; `C`, `D`, `G`; `E`, `M`, `G`; the three red
  segments `(BH)`, `(CG)` and `(IM)`.
* **The printed discrepancy is reproduced, not concealed.** The printed
  sentence writes `(CG) ∥ (IF)`, but the printed figure labels the end of
  the red segment that starts at `I` with `M`, and prints no `F` anywhere in
  that figure. The reconstruction reproduces the figure exactly as printed
  (the point is `M`, no `F` is added), the student text keeps the printed
  `(IF)`, and the conflict is recorded in the Teacher Area ledger and in
  `docs/UNIT-02-EXERCISES-SOURCE.md` § 3.3.

---

## 4. Figures that were deliberately not drawn

| Exercise | Why no figure exists |
| -------- | --------------------- |
| Q7       | The page prints no figure; item 1 asks the student to draw one. |
| Q8       | The page prints no figure; item 1 asks the student to draw one. |
| Q11      | The page prints no figure; item 1 asks the student to draw one. |
| Q12      | The page prints no figure; item 1 asks the student to draw one. |
| Q22      | The page prints no figure; item 1 of its `توصية` block asks the student to draw one. |
| Q23      | The page prints no figure; the exercise is a construction. |
| Q25      | The page prints no figure; item 1 asks the student to draw one. |
| Q34      | The page prints no figure; the five cases are to be drawn by the student. |

No placeholder, no schematic and no "figure to come" was inserted for them.


---

## 5. Batch 1 — the twenty figures printed with Questions 1 to 17

| File                                                        | What it holds                                       |
| ----------------------------------------------------------- | --------------------------------------------------- |
| `src/content/units/lesson-12-batch1-geometry.ts`            | every coordinate of the twenty figures              |
| `src/content/units/lesson-12-batch1-figures.ts`             | the twenty figure specs (alt, caption, source)      |
| `src/content/units/lesson-12-batch1-geometry.test.ts`       | the arithmetic checks that back this record         |
| `src/components/diagram/renderers/UnitTwoExercisesFigure.test.tsx` | DOM/SVG checks for yellow badges, green lines, squares, and arcs |

### 5.1 Inventory (20 Batch-1 textbook figures)

| #  | Figure id                   | Q  | Scan      | Printed marks carried                                                                                      |
| -- | --------------------------- | -- | --------- | ---------------------------------------------------------------------------------------------------------- |
| 1  | `fig-u2-q1-quadrilateral`   | 1  | `image-1` | quadrilateral `ABDC`, 1 red tick on each half of `[AC]`, 2 on each half of `[AD]`, `[IJ]`, collinear `B–J–K` |
| 2  | `fig-u2-q1-case-one`        | 1  | `image-2` | right triangle `ABC`, red squares at `B` and `I`, 2 red ticks on each half of `[BC]`, yellow badge `①`     |
| 3  | `fig-u2-q1-case-two`        | 1  | `image-2` | triangle `ABC` with `[IJ]` and no marks, yellow badge `②`                                                  |
| 4  | `fig-u2-q1-case-three`      | 1  | `image-2` | triangle `ABC`, 2 red ticks on each half of `[BC]`, `[IJ]`, yellow badge `③`                               |
| 5  | `fig-u2-q1-thales-triangle` | 1  | `image-3` | triangle `NAB` (`1:3` scale), `[MP] ∥ [AB]`, red measurements `2`, `4`, `1.8`, `1.2`                       |
| 6  | `fig-u2-q2-circles`         | 2  | `image-4` | intersecting circles `ℭ` and `ℭ'`, diameters `[AB]` and `[AB']`, black centre ticks at `O` and `O'`        |
| 7  | `fig-u2-q2-triangle`        | 2  | `image-4` | triangle `ABC`, dots at `J` and `K`, 2 red ticks on each half of `[AB]` ONLY, red `8 cm`                   |
| 8  | `fig-u2-q2-quadrilateral`   | 2  | `image-5` | rays `[MD], [ME], [MF]`, segments `[AB], [BC], [DE], [EF]`, red `5, 2, 8, y, x`                            |
| 9  | `fig-u2-q3-rectangle`       | 3  | `image-6` | blue rectangle `ABCD`, red `[IK]` and `[DJ]`, black double ticks on `[AD]`, blue dashed arrows `2, 4, 8`   |
| 10 | `fig-u2-q4-triangle`        | 4  | `image-7` | blue triangle `ABC`, red `[IJ]` and red `I, J`, blue lengths `2, 2, 3, 3, 5`                               |
| 11 | `fig-u2-q5-medial-triangle` | 5  | `image-8` | blue triangle `ABC`, red medial triangle `IJK` & red `I, J, K`, black ticks `1 / 2 / 3`                    |
| 12 | `fig-u2-q6-parallelogram`   | 6  | `image-9` | blue parallelogram `ABCD`, black diagonals `[AC], [DB]`, black `[CE]` and `[BE]`                           |
| 13 | `fig-u2-q9-triangle`        | 9  | `image-12`| blue triangle `ABD` and `[AC]`, black midpoint dots `E, F, J`                                              |
| 14 | `fig-u2-q10-case-one`       | 10 | `image-13`| blue right triangle `ABC`, green line `IJ`, red squares at `B` and `J`, red double ticks, yellow badge `①` |
| 15 | `fig-u2-q10-case-two`       | 10 | `image-13`| blue triangle `ABC`, green line `IJ`, two equal red angle arcs at `B` and `J`, red double ticks, yellow badge `②` |
| 16 | `fig-u2-q13-hidden-vertex`  | 13 | `image-16`| black rectangular frame, blue `[AB]` and two blue sides exiting right edge (`C` hidden)                    |
| 17 | `fig-u2-q14-triangle`       | 14 | `image-17`| blue triangle `ABC`, black `[AD], [FC], [ED]`, black single/double ticks, black parallel arrowheads        |
| 18 | `fig-u2-q15-triangle`       | 15 | `image-18`| blue triangle `ABC`, black `[TV]`, red `3.5, 3, 6.6`, black dashed arrow under `[AB]` with red `9.9`       |
| 19 | `fig-u2-q16-triangle`       | 16 | `image-19`| black triangle `ABC` & `[DE]`, dashed arrows `12` and `6`, red `9` and `7`                                 |
| 20 | `fig-u2-q17-triangle`       | 17 | `image-20`| black triangle `LMN` & `[QP]`, dashed arrows `16` and `21`, red `4` and `9`                                |

---

## 6. Batch 2 — the three figures printed with Questions 18 and 19

| # | Figure id              | Q  | Scan              | Printed marks carried                                                                                          |
| - | ---------------------- | -- | ----------------- | -------------------------------------------------------------------------------------------------------------- |
| 1 | `fig-u2-q18-case-one`  | 18 | `batch2/image-1`  | black triangle `EHK` and `[FJ] ∥ [HK]` (`5 : 8` ratio), red `5` & `8`, black dashed arrow under `[EK]` with red `32.5` |
| 2 | `fig-u2-q18-case-two`  | 18 | `batch2/image-1`  | black triangle `MBA` and `[EJ] ∥ [BA]` (`3 : 9` ratio), red `3`, `9`, and `8` (no dashed arrows)               |
| 3 | `fig-u2-q19-proof-draft` | 19 | `batch2/image-2` | black `A–I–B–K` (3 single red ticks on `[AI], [IB], [BK]`), `A–J–C` (2 double red ticks on `[AJ], [JC]`), `[IJ]`, `[BC]`, and `[KJ]` meeting `[BC]` at `D` |

