# Lesson 6 figure record — continuation of Unit 1 exercises (Questions 3–15)

## Editorial rule

This independent lesson follows the repository's figure decision tree:

1. Rebuild a textbook figure only when every geometry-bearing relation can be verified from an explicit grid, printed measurement, or construction mark.
2. Use `reference` when unmeasured positions, slopes, or angles are part of the task. No approximate redraw is substituted.
3. Mark every platform-created explanation or interaction as `origin: authored` and identify it in the caption when it is a visual explanation.

No supplied scan is shipped as an `image` diagram.

## Source evidence used for this pass

The scans themselves are not stored in the repository (they are only read while
authoring). This pass therefore re-verified every figure against the Phase-1B
source-audit record already embedded in the repository — the pinned prompts in
`src/content/lesson-06-source-fidelity.test.ts`, the reconstruction records
below, and the printed marks quoted in each question's `given`/`alt` text. No
figure relation was invented or "tidied up"; the one correction applied is the
Q6 point `C` described below, which the audit record fixes exactly.

### Later supplied crops

Two question crops were supplied after the first pass and were read directly:

- **Q6 (whole question)** confirms item 4 as «4. ممّ تكون قد تحققت؟»: the word is
  drawn with two joined meems, a shadda with a fatha above it sits on the final
  meem, and there is no alif. The alternative «مَ تكون …» reading is not in the
  source, so the pinned prompt stands and the teacher `limitation` now records
  the resolution instead of an open discrepancy.
- **The second crop is Q12 item 3**, not Q13: it reads «3. هل المستقيمان (Δ) و (d)
  متوازيان؟ اشرح إجابتك.» exactly as pinned for Q12. It contains neither
  «طبوقين» nor «متطابقين», so it does **not** settle Q13's third item; that
  wording stays as pinned («مثلثين طبوقين») and still needs a crop of Q13.

## Counts

| Classification                          |  Count |
| --------------------------------------- | -----: |
| `reference` textbook figures            |      5 |
| reconstructed textbook figures          |      3 |
| `authored` figures and interactive labs |     18 |
| **Total diagram records**               | **26** |

The 18 authored records consist of 13 grouped reasoning labs (one per main question) and 5 explanatory figures (Questions 5, 7, 8, 12, and 14).

## Textbook figures

| ID                               | Question | Classification | Verification / reason                                                                                                          |
| -------------------------------- | -------: | -------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `fig-ex6-q3-angle-bisector`      |        3 | `reference`    | Perpendicular and equal-angle marks are readable, but no numeric coordinates or angles are printed.                            |
| `fig-ex6-q4-three-points`        |        4 | `reference`    | The two point layouts have no grid or measurements; their relative positions are recorded below and are the construction task. |
| `fig-ex6-q6-grid-shape`          |        6 | reconstructed  | Every boundary lies on the visible square grid; see lattice record below.                                                      |
| `fig-ex6-q9-six-lines`           |        9 | `reference`    | Six ungridded line/point layouts; approximating a slope or incidence could change the required construction.                   |
| `fig-ex6-q10-line-construction`  |       10 | `reference`    | The line slope and point distances are unmeasured.                                                                             |
| `fig-ex6-q11-isosceles-altitude` |       11 | `reference`    | Equality and right-angle marks are readable, but the unmeasured figure is not assigned invented coordinates.                   |
| `fig-ex6-q13-point-grid`         |       13 | reconstructed  | All labelled points lie on visible dashed-grid intersections; see lattice record below.                                        |
| `fig-ex6-q15-right-triangle`     |       15 | reconstructed  | The right angle and all geometry-bearing measurements are printed: `AB = 3 cm`, `AC = 2 cm`, `CE = 1 cm`, with `E ∈ [BC]`.     |

## Reference-layout records

### Question 4 — both printed boxes

The two boxes carry no grid and no measurements, so they remain `reference`.
Their **relative** point positions are nevertheless verified and preserved; they
are quoted in the figure `alt` text and in the per-case teacher solution.

- Box ①: `A` upper-left, `C` middle-right, `B` lower-middle.
- Box ②: `A` upper-left, `B` lower-middle-left, `C` lower-right.
- In both boxes the required vertex order is `A, B, C, D`; `D` is the
  intersection of the line through `A` parallel to `(BC)` with the line through
  `C` parallel to `(AB)`.

No coordinates are invented for `A`, `B` or `C`: any such numbers would be a
geometry-bearing approximation of a figure whose whole purpose is construction.

### Question 9 — the six printed cases

The six ungridded cases remain `reference`. Only the relations already recorded
in the Phase-1B audit are stated, one per case, and no slope or distance is
invented:

| Case  | Verified relation used by the solution                  |
| ----- | ------------------------------------------------------- |
| (1)-① | direction `AB` is parallel to `(d)`                     |
| (1)-② | no labelled point of `(d)` is the start of the movement |
| (1)-③ | `A ∈ (d)`                                               |
| (2)-① | `B ∈ (d)` while `A ∉ (d)`                               |
| (2)-② | segment `[AB]` meets `(d)` at an unlabelled point       |
| (2)-③ | general case                                            |

## Reconstruction records

### Question 6

The audit fixes the printed nodes in a **bottom-left** origin system. The
renderer draws with a top-left origin, so `y_top = 5 − y_bottom`:

- Grid: 8 columns × 5 rows.
- Yellow unit cells (bottom-left origin): `[1,4]×[3,4] ∪ [3,5]×[2,3]`, i.e.
  three cells in the upper row and two shifted-right cells in the second row.
- Label ① in cell `[3,4]×[3,4]`.
- `A = (7,4)` bottom-left → `(7,1)` in the renderer.
- `C = (4,2)` bottom-left → `(4,3)` in the renderer.
- Therefore the printed movement `A → C` is exactly **3 grid units left and 2
  grid units down**.

An earlier draft of this record placed `C` at renderer `(4,4)` and described the
movement as 3 left and 3 down. That contradicted the verified audit node and the
alt text ("the fourth node from the left"): the renderer has been corrected to
`(4,3)` and the movement to 3 left + 2 down. The reconstruction still draws
neither ② nor ③.

### Question 13

Use column/row indices on the printed dashed grid:

- Bottom row: `F(1,3)`, `L(2,3)`, `A(3,3)`, `G(4,3)`, `H(5,3)`, `B(6,3)`, `I(8,3)`, `J(9,3)`.
- Middle row: `K(3,2)`, `C(5,2)`, `D(6,2)`, `E(8,2)`.
- Top row: `M(4,1)`, `N(7,1)`.

Thus `A → B` is exactly three columns right with no vertical displacement. The renderer contains no answer arrows or highlighted pairs.

### Question 15

Choose a rendering scale only; the geometry is fixed by the source:

- `A = (0,0)`.
- `B = (3,0)` from `AB = 3 cm`.
- `C = (0,2)` from `AC = 2 cm` and the right angle at `A`.
- `|BC| = √13`.
- `E = C + (B - C) / √13`, which places `E` on `[BC]` and gives `CE = 1 cm` exactly.

The scale affects pixels only, not the geometry. The source renderer shows the original triangle and `E`; it does not draw the translated image.

## Authored explanatory figures

| ID                                    | Question | Purpose                                                                            |
| ------------------------------------- | -------: | ---------------------------------------------------------------------------------- |
| `auth-ex6-q5-central-symmetry`        |        5 | Shows the two diagonals bisected at `O`.                                           |
| `auth-ex6-q7-coordinate-images`       |        7 | Verifies the two opposite coordinate translations after the solution is revealed.  |
| `auth-ex6-q8-rectangle-proof`         |        8 | Shows the inferred rectangle and equal diagonals.                                  |
| `auth-ex6-q12-parallel-images`        |       12 | Summarises the three parallel lines after reasoning.                               |
| `auth-ex6-q14-rectangle-translations` |       14 | Uses a 30 px/cm display scale to show the three exact source vectors after reveal. |

Every explanatory figure is inside the progressive solution reveal and is captioned as platform-authored. The 13 `auth-ex6-q*-reasoning-lab` records are grouped interactions; they reveal no correctness until all decisions in that question's activity have been completed and submitted together.
