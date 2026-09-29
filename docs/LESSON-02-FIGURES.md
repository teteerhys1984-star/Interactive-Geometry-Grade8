# Lesson 2 — figure-by-figure decision record (pages 8–10)

The project rule is unchanged: **a printed figure is never guessed at.** It is
reproduced only when its geometry can be established from the scan and then
verified independently; otherwise it stays a faithful `reference` placeholder
pointing the student at the printed page.

Lesson 2 is the first lesson where part of that test is passed, so this file
records exactly why — and exactly where it is not.

## 1. Reproduced figures (`interactive`, renderer `grid-figure`)

Two figures are drawn on squared paper. Every point sits on a grid node, so the
figure is a finite list of integers, not an approximation.

### `fig-8-activity-grid` — page 8, نشاط · 1. على ورقة سنتيمترية

Origin = bottom-left node of the printed sheet; unit = one cell.

| Point | Coordinates |
| ----- | ----------- |
| `A`   | (4, 1)      |
| `B`   | (1, 4)      |
| `P`   | (2, 3)      |
| `M`   | (6, 2)      |
| `N`   | (1, 2)      |

Verification performed before the figure was allowed out of `reference`:

1. **Collinearity.** The printed line passes through `B`, `P`, `A`. The read
   coordinates satisfy `x + y = 5` for all three, i.e. they are exactly
   collinear on a slope −1 line, and the drawn line runs corner to corner from
   (0, 5) to (5, 0) as printed.
2. **Shared row / column.** `N` and `B` share column 1; `N` and `M` share row 2.
   Both are directly visible in the scan and both agree with the readings.
3. **Constructed image lands on a node.** The activity asks for the point `M'`
   that makes `ABM'M` a parallelogram. With `v = B − A = (−3, 3)` this gives
   `M' = (3, 5)` — a lattice node on the top edge of the printed sheet. A wrong
   reading would almost certainly have produced a non-node.

**Known consequence, not an error:** with the same `v`, `N' = (−2, 5)` and
`P' = (−1, 6)` fall outside the printed sheet. The printed instruction is
«انقل الشكل المرافق إلى ورقة سنتيمترية», so the student's own paper extends
beyond the printed crop. This is flagged for the teacher in the Teacher Area.

### `fig-10-exercise-3-grid` — page 10, تدرّب ③

| Point | Coordinates |
| ----- | ----------- |
| `M`   | (7, 6)      |
| `N`   | (3, 5)      |
| `A`   | (4, 4)      |
| `B`   | (2, 1)      |
| `P'`  | (3, 1)      |
| `Q'`  | (5, 1)      |

Verification:

1. **Alignment.** `N` and `P'` share a column; `A` is one column to the right of
   `N`; the gap `B → P'` is one cell while `P' → Q'` is two. All three are
   independently visible in the scan.
2. **Corner anchor.** `M` sits exactly on the top-right corner node of the
   sheet, which fixes the sheet's extent at 7 × 6 cells.
3. **Every requested image is a node inside the sheet.** With
   `v = B − A = (−2, −3)`: `M' = (5, 3)`, `M'' = (3, 0)`, `N' = (1, 2)` and
   `P = P' − v = (5, 4)`. Four independent constructions all landing on nodes is
   the strongest available evidence that the readings are right.

**Known consequence:** `Q = Q' − (A − B) = (3, −2)` lies two rows below the
printed sheet — again expected, because the instruction is «انسخ الشبكة الآتية
على صفحةٍ من دفترك».

### No answers are revealed on these figures

`grid-figure` supports reveal buttons, but both reproductions declare
`reveals: []`. A reproduction of a printed exercise must not hand the student
its answers; the derived answers live in the Teacher Area. A test in
`src/content/sourceFidelity.test.ts` enforces this.

## 2. Figures that remain `reference`

All five are drawn on a blank sheet with no grid, no printed measurement and no
derivable coordinates. Redrawing them would mean inventing positions.

| Figure id                        | Page | Why it cannot be reproduced faithfully                                  |
| -------------------------------- | ---- | ----------------------------------------------------------------------- |
| `fig-8-blank-sheet`              | 8    | Blank-sheet activity; only the relative arrangement is legible.         |
| `fig-8-definition-parallelogram` | 8    | Schematic parallelogram; no coordinates, no lengths.                    |
| `fig-9-special-case`             | 9    | Collinear schematic; the order of the points is legible, positions not. |
| `fig-9-example-given`            | 9    | The distances between `H`, `G` and `M` are not printed.                 |
| `fig-9-compass-construction`     | 9    | Compass radii are taken from unmeasured givens.                         |

## 3. Platform-authored analogues

For each configuration above, a mathematically exact, clearly badged
platform-authored figure is offered inside a «شرح المنصّة» step, so the student
still gets an interactive model without the book being misquoted:

| Authored figure                | Renderer                 | What it models                                                         |
| ------------------------------ | ------------------------ | ---------------------------------------------------------------------- |
| `auth-02-shape-then-point`     | `translation-figure`     | A whole shape sliding, to link Lesson 1 to Lesson 2.                   |
| `auth-02-practice-grid`        | `grid-figure`            | Our own squared-paper drill, reveals allowed.                          |
| `auth-02-drag-playground`      | `translation-playground` | Drag `M`; the image, the parallelogram and the two cases.              |
| `auth-02-collinear-case`       | `construction-figure`    | The collinear case with the common midpoint.                           |
| `auth-02-compass-construction` | `construction-figure`    | The compass method, step by step, including the rejected intersection. |

Every one of them is `origin: 'authored'`, uses coordinates chosen by this
platform, and computes each image point as `P' = P + v`.
