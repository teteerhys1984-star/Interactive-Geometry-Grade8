# Lesson 6 figure record — continuation of Unit 1 exercises (Questions 3–15)

## Editorial rule

This independent lesson follows the repository's figure decision tree:

1. Rebuild a textbook figure when every geometry-bearing relation the task depends on can be verified from an explicit grid, printed measurement, or construction mark, and any remaining degree of freedom is provably not read by the task.
2. Do not ship a placeholder where a printed figure exists. If a relation genuinely cannot be recovered, name the missing crop and stop — a «راجع الكتاب» card is not an acceptable end state for a figure the printed page supplies.
3. Any non-printed choice (angle size, slope, spacing, panel placement) must be documented here as a drawing choice that no solution step cites as a measurement.
4. Mark every platform-created explanation or interaction as `origin: authored` and identify it in the caption when it is a visual explanation.

No supplied scan is shipped as an `image` diagram.

**Corrective note.** An earlier version of this lesson classified five figures (Q3, Q4, Q9, Q10, Q11) as `reference`, which rendered the student-facing
placeholder «يوجد رسم هنا — راجع الكتاب». That classification was itself the bug: in all five cases the printed page states the relations the exercise
turns on, so the figures were rebuilt here and the placeholder wording no longer appears anywhere in Lesson 06. The rule above was amended accordingly;
Lesson 05 and Lesson 07 were not touched by this pass.

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
  «طبوقين» nor «متطابقين», so it did **not** settle Q13's third item.
- **The third crop is the Q13 grid question.** Its unnumbered closing line reads
  «حدد وفق الانسحاب الذي ينقل A إلى B، مثلثين طبوقين»: the adjective is
  «طبوقين» (ط + ب, one dot below), never «متطابقين», and the line has no leading
  numeral and no closing period. The pinned prompt already carried exactly that
  wording, so no content changed; the fidelity test now pins the whole line.
  The same line's leading verb appears in the crop **without** a visible shadda
  (the mark band above the two dal bodies is blank, while the hamza below «إلى»
  in the same line is clearly printed). The pinned «حدّد» was left untouched:
  one crop cannot prove the typesetting omits shadda rather than the scan losing
  it, and that diacritic is outside the ambiguity this crop was supplied for.

## Counts

| Classification                          |  Count |
| --------------------------------------- | -----: |
| `reference` textbook figures            |      0 |
| reconstructed textbook figures          |      8 |
| `authored` figures and interactive labs |     18 |
| **Total diagram records**               | **26** |

**No Lesson 06 figure is a «راجع الكتاب» placeholder.** The five that were
`reference` (Q3, Q4, Q9, Q10, Q11) are now drawn in-platform as SVG, because in
each case the printed page fixes exactly what the task needs and nothing more;
see the per-figure records below for what is verified and what is a drawing
choice. A regression test renders all 13 student steps and fails if the
placeholder wording ever reappears.

The 18 authored records consist of 13 grouped reasoning labs (one per main question) and 5 explanatory figures (Questions 5, 7, 8, 12, and 14).

## Textbook figures

| ID                               | Question | Classification | Verification / reason                                                                                                      |
| -------------------------------- | -------: | -------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `fig-ex6-q3-angle-bisector`      |        3 | reconstructed  | Bisector + two perpendicular feet are exact; the 50° angle pair is a drawing choice (see below).                           |
| `fig-ex6-q4-three-points`        |        4 | reconstructed  | Both boxes drawn at the verified relative layouts; vertex `D` is deliberately not drawn.                                   |
| `fig-ex6-q6-grid-shape`          |        6 | reconstructed  | Every boundary lies on the visible square grid; see lattice record below.                                                  |
| `fig-ex6-q9-six-lines`           |        9 | reconstructed  | Six panels; each recorded relation holds exactly, the panel layout itself is schematic (see below).                        |
| `fig-ex6-q10-line-construction`  |       10 | reconstructed  | `C ∈ (d)` exact, `B` above and `A` below `(d)`; slope and distances are drawing choices.                                   |
| `fig-ex6-q11-isosceles-altitude` |       11 | reconstructed  | `CA = CB`, `N ∈ [AB]`, `CN ⟂ AB` exact; no `AN = NB` mark because that is the result.                                      |
| `fig-ex6-q13-point-grid`         |       13 | reconstructed  | All labelled points lie on visible dashed-grid intersections; see lattice record below.                                    |
| `fig-ex6-q15-right-triangle`     |       15 | reconstructed  | The right angle and all geometry-bearing measurements are printed: `AB = 3 cm`, `AC = 2 cm`, `CE = 1 cm`, with `E ∈ [BC]`. |

## Reconstructions added in the corrective pass

The five figures below were previously `reference` placeholders. Each is now
drawn from the recorded relations only. The rule applied to all five: anything
the printed page states is exact in the drawing; anything it does not state is a
schematic choice that cannot be read as a measurement.

### Question 3 — angle bisector with two perpendiculars

Exact in the drawing (`tests` assert each one numerically):

- `Ax` is horizontal, `B ∈ Ax`; `Ay` is oblique, `C ∈ Ay`; `Az` lies between them.
- `Az` bisects `xÂy`: both half-angles are equal, and the two arcs are drawn.
- `BM ⟂ Ax` and `CM ⟂ Ay`, both marked with a right angle. With `AB = AC`, the
  point `M = (300, 300·tan 25°)` satisfies both perpendiculars simultaneously,
  which is why the marking is legitimate rather than decorative.

Drawing choice, not printed: the size of the angle pair (50°). No printed value
contradicts it and no step of the proof depends on it. No equality between `AB`
and `AC` is claimed anywhere in the figure or the solution.

### Question 4 — both printed boxes

Both boxes are drawn at the **verified relative** layouts, and the fourth vertex
`D` is **not** drawn because constructing it is the exercise.

- Box ①: `A` upper-left, `C` middle-right, `B` lower-middle.
- Box ②: `A` upper-left, `B` lower-middle-left, `C` lower-right.
- In both boxes the required vertex order is `A, B, C, D`; `D` is the
  intersection of the line through `A` parallel to `(BC)` with the line through
  `C` parallel to `(AB)`.

No distance, angle or grid is implied: the boxes are paper frames, and the only
information a student may read from them is the relative position of the three
named points.

### Question 9 — the six printed cases

The six panels are numbered exactly as printed — row `(1)` then row `(2)`, each
with `①②③` — and each panel prints the name `(d)` of its line. The recorded
relation is **exact** in every panel, and the renderer builds each point from a
parameter along the line plus a perpendicular offset, so the relation cannot
drift:

| Case  | Printed relation           | How the drawing guarantees it                              |
| ----- | -------------------------- | ---------------------------------------------------------- |
| (1)-① | direction `AB` ∥ `(d)`     | `A` and `B` carry identical perpendicular offsets          |
| (1)-② | no labelled point on `(d)` | both offsets are non-zero (checked > 20 px)                |
| (1)-③ | `A ∈ (d)`                  | offset of `A` is exactly 0                                 |
| (2)-① | `B ∈ (d)`, `A ∉ (d)`       | offset of `B` is exactly 0, `A` non-zero on the other side |
| (2)-② | `[AB]` meets `(d)`         | the two offsets have opposite signs, so they straddle it   |
| (2)-③ | general case               | both offsets non-zero, same side, segment not ∥ `(d)`      |

**The panel layout is a reconstruction, not a source-exact redraw.** The printed
page fixes the relation per case but not the slopes, the distances or where in
each panel the figures sit; those are schematic. No additional incidence,
parallelism or coincidence is claimed, and the solution text never cites the
drawing for a property the page does not state.

### Question 10 — a line with C on it

Exact: `C ∈ (d)`; `B` on the upper-right side of `(d)`; `A` on the lower-right
side. Drawing choice: the slope of `(d)` and the three distances, none of which
is printed and none of which the construction uses.

### Question 11 — isosceles triangle with its altitude

Exact and marked: `CA = CB` (equality ticks on `[CA]` and `[CB]`), `N ∈ [AB]`,
and `CN ⟂ AB` with the right angle marked at `N`.

Deliberately **not** marked: `AN = NB`. It is conclusion 2 of the exercise, not a
given, so the two halves of the base carry no tick — a test asserts that no
`tick-AN` or `tick-NB` exists.

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
