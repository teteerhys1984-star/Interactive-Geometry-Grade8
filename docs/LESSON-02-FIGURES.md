# Lesson 2 — figure-by-figure decision record (pages 8–10)

The project rule is unchanged: **a printed figure is never guessed at.** But
Lesson 2 draws a distinction the earlier lessons did not need:

- A figure that **reproduces** the book must satisfy the strict test: every
  point read from the scan, then verified arithmetically, and the diagram
  carries `origin: 'textbook'` with a `source` page.
- A figure that **teaches** the same configuration on the platform's own
  distances is allowed, provided it keeps every printed *relation* (incidence,
  order, equalities, which intersection is retained) and is badged
  «رسم تعليمي من إعداد المنصّة». These carry `origin: 'authored'` and never
  claim to be the printed drawing.

Lesson 2 now has **no `reference` placeholders left**: the two squared-paper
sheets are reproduced exactly, and the five blank-sheet configurations are
drawn as badged authored reconstructions instead of apologising for themselves.

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

Sheet = 8 columns × 6 rows; `M` is the **top-right corner node**.

| Point | Coordinates |
| ----- | ----------- |
| `M`   | (8, 6)      |
| `N`   | (4, 5)      |
| `A`   | (5, 4)      |
| `B`   | (3, 1)      |
| `P'`  | (4, 1)      |
| `Q'`  | (6, 1)      |

This reading supersedes an earlier one that placed `M` at (7, 6) and every
other point one column to the left. The correction came from anchoring on the
labels rather than on the dot centres: `M` sits *on* the corner node, and with
`v = B − A = (−2, −3)` the corrected reading is the only one under which every
requested image lands on a lattice node **and** `N''` returns exactly to `N`.

Verification:

1. **Alignment.** `N` and `P'` share column 4; `A` is one column to the right
   of `N`; the gap `B → P'` is one cell while `P' → Q'` is two. All three are
   independently visible in the scan.
2. **Corner anchor.** `M` sits exactly on the top-right corner node of the
   sheet, which fixes the sheet's extent at 8 × 6 cells.
3. **Every requested image is a node inside the sheet.** With
   `v = B − A = (−2, −3)`: `M' = (6, 3)`, `M'' = (4, 0)`, `N' = (2, 2)` and
   `P = P' − v = (6, 4)`. Four independent constructions all landing on nodes
   is the strongest available evidence that the readings are right.
4. **Round trip.** `N'' = N' + (A − B) = (4, 5) = N`, exactly the printed point.
   A one-column error anywhere would break this identity.

**Known consequence:** `Q = Q' − (A − B) = (4, −2)` lies two rows below the
printed sheet — again expected, because the instruction is «انسخ الشبكة الآتية
على صفحةٍ من دفترك». The lab draws two extra rows (`extend.bottom: 2`).

### No answers are revealed on these figures

`grid-figure` supports reveal buttons, but both reproductions declare
`reveals: []`. A reproduction of a printed exercise must not hand the student
its answers; the derived answers live in the Teacher Area. A test in
`src/content/sourceFidelity.test.ts` enforces this.

## 2. Authored reconstructions (all `origin: 'authored'`)

All coordinates below are the platform's, chosen so that every printed relation
holds exactly. They are computed from the same primitives as the geometry
tests, and each one is captioned as a platform drawing.

| Figure id                      | Renderer              | Relation preserved from the printed page                                                     |
| ------------------------------ | --------------------- | -------------------------------------------------------------------------------------------- |
| `auth-02-blank-sheet`          | `construction-figure` | `A`, `B`, `N` collinear in that order; `M` off the line.                                      |
| `auth-02-definition`           | `construction-figure` | `ABM'M` is a parallelogram with `I` the common midpoint of `[AM']` and `[BM]`.                |
| `auth-02-special-case`         | `construction-figure` | `A`, `M`, `I`, `B`, `M'` collinear with `I` the common midpoint.                             |
| `auth-02-compass-given`        | `construction-figure` | `[HG]` horizontal, `M` below and to the right of `G`.                                         |
| `auth-02-compass-construction` | `compass-lab`         | `𝒞₁(M, GH)`, `𝒞₂(H, GM)`, both intersections, the retained one and the rejected one.          |
| `auth-02-compass-proof`        | `compass-lab`         | `HGMM'` parallelogram, diagonal `[HM]`, single tick on `HG`/`MM'`, double tick on `GM`/`HM'`. |
| `auth-02-two-cases`            | `point-image-lab`     | Dragging `M` onto `(AB)` flattens the parallelogram but keeps the common midpoint.            |
| `auth-02-reading-vector`       | `point-image-lab`     | `A → B` and `M → M'` are the same arrow, so `ABM'M` is a parallelogram.                        |
| `auth-02-hook`                 | `lattice-placement`   | Opening drill: `A → B` is three columns right, one row down.                                  |
| `auth-02-page8-lab`            | `lattice-placement`   | The printed page-8 sheet (line + points) with the images as placement tasks.                   |
| `auth-02-triangle-chain`       | `vector-chain`        | Three successive translations of a triangle; the third image returns to `A`.                  |
| `auth-02-parallelogram-centre` | `vector-chain`        | A parallelogram, its centre, and the three translations the exercise names.                   |
| `auth-02-exercise-3-lab`       | `lattice-placement`   | The printed page-10 sheet, with two extra rows for `Q`.                                        |

What the authored figures deliberately **do not** claim: the printed distances.
The scans give no measurements for the blank-sheet sketches, so those figures
say so in their captions, and the two solutions that would otherwise depend on
them carry a `limitation` note.

## 3. Teacher-only answer sheets

Two extra `grid-figure` specs add the computed images to the printed sheets.
They are `origin: 'authored'`, live only in the Teacher Area, and never appear in
a student step:

| Figure id                | Shows                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| `auth-02-page8-answers`  | `M' (3,5)`, `N' (−2,5)`, `P' (−1,6)`, with notebook margins on the left and above.           |
| `auth-02-page10-answers` | `M' (6,3)`, `M'' (4,0)`, `N' (2,2)`, `N'' = N`, `P (6,4)`, `Q (4,−2)`, two rows below the sheet. |

## 4. Verification log

| Check                                                        | Where it is asserted                                    |
| ------------------------------------------------------------ | ------------------------------------------------------- |
| Coordinates are integers and lie on the sheet                | `sourceFidelity.test.ts`, `GridFigure.test.tsx`          |
| `M'`, `N'`, `P'` on page 8 are the computed images            | `lesson-02-rebuild.test.tsx`                             |
| The six page-10 placements equal the computed images          | `lesson-02-rebuild.test.tsx`                             |
| `N''` returns to `N`                                          | `lesson-02-geometry.test.ts`                             |
| The compass intersections are the two circle intersections    | `lesson-02-geometry.test.ts`                             |
| `G = A` for the triangle chain                                | `lesson-02-geometry.test.ts`                             |
| The two-case lab's collinear point really is on `(AB)`        | `lesson-02-rebuild.test.tsx`                             |
| No textbook figure carries a reveal control                   | `sourceFidelity.test.ts`                                 |
| Changing a grid requires updating this file                   | `sourceFidelity.test.ts` (documented guard)              |

## 5. Changing a figure later

1. Change the geometry in `lesson-02-geometry.ts` first — it is the single
   source of truth for every coordinate.
2. Update the spec in `lesson-02-figures.ts`; captions must state `authored` or
   `textbook` honestly.
3. Update this file, including the verification performed.
4. Run `npx vitest run src/content` and `npm run verify`.
