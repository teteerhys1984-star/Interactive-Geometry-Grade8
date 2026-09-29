# Lesson 3 — figure-by-figure decision record (pages 11–16)

The source for «صورة شكل وفق انسحاب» is the six supplied scans of pages 11–16.
The project rule remains strict: a printed figure is reconstructed only when all
geometry affecting the task is independently verifiable. A clear-looking sketch
is not automatically measurable.

## Decision

All **14 textbook figures remain `reference`**. None is approximated.

| Figure id                              | Page | Why it remains `reference`                                                                 |
| -------------------------------------- | ---- | ------------------------------------------------------------------------------------------ |
| `fig-11-line-conjecture-two-cases`     | 11   | Blank-sheet slopes and the locations of `A`, `B` and `(d)` have no numeric specification.  |
| `fig-11-line-proof`                    | 11   | The proof sketch has no coordinates, lengths or angle measures.                            |
| `fig-12-segment-ray-circle-activity`   | 12   | The printed radii/lengths are known, but each `A → B` placement is unmeasured.             |
| `fig-12-line-construction-nonparallel` | 12   | General construction sketch, not a measured configuration.                                 |
| `fig-12-line-construction-parallel`    | 12   | General coincident-line sketch, not a measured configuration.                              |
| `fig-13-parallel-perpendicular-images` | 13   | Relations are certain; offsets and slopes are not numerically fixed.                       |
| `fig-13-segment-image`                 | 13   | The property is certain, but the whole arrangement has no scale.                           |
| `fig-14-ray-image`                     | 14   | The positions of the marked points are not specified.                                      |
| `fig-14-circle-image`                  | 14   | Equal radii are certain, but the radius and centres' positions are not specified.          |
| `fig-14-line-image-example`            | 14   | Compass construction starts from unmeasured blank-sheet givens.                            |
| `fig-15-square-application`            | 15   | It is part of the printed worked solution; redrawing the finish early would pre-empt it.   |
| `fig-15-check-two-grids`               | 15   | Several lines/points lie among fine grid marks that cannot all be read with certainty.     |
| `fig-16-practice-one`                  | 16   | The learner must copy a blank-sheet configuration and construct from that copy.            |
| `fig-16-practice-four-attempts`        | 16   | Arrow direction and equality marks determine the answer; an approximation could reveal it. |

Each reference carries its page, locator, Arabic description and explicit
reason. The Teacher Area collects all 14 automatically under «تقرير الأشكال».

## Platform-authored interactive analogues

The student still receives exact, responsive geometry, but it is kept visibly
separate under the badge «شرح المنصّة»:

| Figure id                            | Renderer                 | Purpose                                                               |
| ------------------------------------ | ------------------------ | --------------------------------------------------------------------- |
| `auth-03-triangle-all-points`        | `translation-figure`     | A whole shape as the images of its individual vertices.               |
| `auth-03-line-image`                 | `translation-figure`     | Why two point-images determine a parallel image line.                 |
| `auth-03-shape-explorer`             | `shape-translation-lab`  | Shape selector, vector sliders and progressive original/path/image.   |
| `auth-03-quadrilateral-construction` | `construction-figure`    | Four-step construction from source vertices to the completed image.   |
| `auth-03-grouped-challenges`         | `translation-challenges` | Identify image, find translation and detect error; one grouped check. |

All authored coordinates are chosen by the platform and are never claimed to
reproduce a textbook figure. Image points are calculated as `P′ = P + v` (or
supplied as that exact sum in the declarative construction).

## Answer protection

No printed exercise figure has a reveal control. The grouped challenge is new
platform content and waits until all three answers are submitted before showing
feedback. Printed-question solutions remain behind Teacher Gate.
