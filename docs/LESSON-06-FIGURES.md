# Lesson 6 figure record — continuation of Unit 1 exercises (Questions 3–15)

## Editorial rule

This independent lesson follows the repository's figure decision tree:

1. Rebuild a textbook figure only when every geometry-bearing relation can be verified from an explicit grid, printed measurement, or construction mark.
2. Use `reference` when unmeasured positions, slopes, or angles are part of the task. No approximate redraw is substituted.
3. Mark every platform-created explanation or interaction as `origin: authored` and identify it in the caption when it is a visual explanation.

No supplied scan is shipped as an `image` diagram.

## Counts

| Classification                          |  Count |
| --------------------------------------- | -----: |
| `reference` textbook figures            |      5 |
| reconstructed textbook figures          |      3 |
| `authored` figures and interactive labs |     18 |
| **Total diagram records**               | **26** |

The 18 authored records consist of 13 grouped reasoning labs (one per main question) and 5 explanatory figures (Questions 5, 7, 8, 12, and 14).

## Textbook figures

| ID                               | Question | Classification | Verification / reason                                                                                                      |
| -------------------------------- | -------: | -------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `fig-ex6-q3-angle-bisector`      |        3 | `reference`    | Perpendicular and equal-angle marks are readable, but no numeric coordinates or angles are printed.                        |
| `fig-ex6-q4-three-points`        |        4 | `reference`    | The two point layouts have no grid or measurements; their positions are the construction task.                             |
| `fig-ex6-q6-grid-shape`          |        6 | reconstructed  | Every boundary lies on the visible square grid; see lattice record below.                                                  |
| `fig-ex6-q9-six-lines`           |        9 | `reference`    | Six ungridded line/point layouts; approximating a slope or incidence could change the required construction.               |
| `fig-ex6-q10-line-construction`  |       10 | `reference`    | The line slope and point distances are unmeasured.                                                                         |
| `fig-ex6-q11-isosceles-altitude` |       11 | `reference`    | Equality and right-angle marks are readable, but the unmeasured figure is not assigned invented coordinates.               |
| `fig-ex6-q13-point-grid`         |       13 | reconstructed  | All labelled points lie on visible dashed-grid intersections; see lattice record below.                                    |
| `fig-ex6-q15-right-triangle`     |       15 | reconstructed  | The right angle and all geometry-bearing measurements are printed: `AB = 3 cm`, `AC = 2 cm`, `CE = 1 cm`, with `E ∈ [BC]`. |

## Reconstruction records

### Question 6

Use visual grid coordinates with the top-left grid intersection as `(0,0)`, increasing rightward and downward.

- Grid: 8 columns × 5 rows.
- Yellow unit cells: `(1,1)`, `(2,1)`, `(3,1)`, `(3,2)`, `(4,2)`.
- `A = (7,1)`.
- `C = (4,4)`.
- Therefore the printed movement `A → C` is exactly 3 grid units left and 3 grid units down.

The renderer shows only the printed starting figure. It does not draw shapes ② or ③ and therefore does not reveal the exercise answer.

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
