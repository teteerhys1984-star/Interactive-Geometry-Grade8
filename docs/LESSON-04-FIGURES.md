# Lesson 4 — figure-by-figure decision record (pages 17–19)

The source for «تطابق المثلثات» is the three supplied scans of pages 17–19.
The project rule remains strict: a printed figure is reconstructed only when
all geometry affecting the task is independently verifiable. A clear-looking
sketch is not automatically measurable, and a photograph is never redrawn.

## Decision

All **10 textbook figures remain `reference`**. None is approximated.

| Figure id                                | Page | Why it remains `reference`                                                                                                                                             |
| ---------------------------------------- | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fig-17-activity-translation-congruent`  | 17   | Blank-sheet sketch of a shape and its translated image; no coordinates or measurements.                                                                                |
| `fig-17-three-partial-triangles`         | 17   | The printed values (3, 4, 35°, 85°, 2) are known, but each `N`/`M` placement and the shapes' orientations are unmeasured — and they are part of the construction task. |
| `fig-17-definition-triangles`            | 17   | Illustrative pair of triangles with no printed measurements at all.                                                                                                    |
| `fig-18-example-vertical-angles`         | 18   | Lengths 5 and 7 are printed, but the angle at `M` and the lines' slopes are not.                                                                                       |
| `fig-18-example-parallelogram-rectangle` | 18   | No lengths or angles are printed; the relations in the worked text are purely stated.                                                                                  |
| `fig-18-example-parallelogram-diagonal`  | 18   | Parallelogram with diagonal, no printed dimensions.                                                                                                                    |
| `fig-19-check-quadrilateral`             | 19   | ALL givens are figure markings (right-angle squares, equality ticks, two 30° arrows); an approximation could silently add or drop a given of the requested proof.      |
| `fig-19-paper-kite`                      | 19   | A photograph of a real paper kite with measurements written on it; a substitute drawing must never be presented as the book's image.                                   |
| `fig-19-three-congruence-cases`          | 19   | Printed measures are known, but triangle positions/rotations per panel are not; the exercise asks the learner to read the printed markings themselves.                 |
| `fig-19-isosceles-configuration`         | 19   | Givens are markings (equal angles at `B`/`C`, equal ticks on `BM`/`MC`, right angles at `E`/`F`) on a sketch with no numeric dimensions.                               |

Each reference carries its page, locator, Arabic description and explicit
reason. The Teacher Area collects all 10 automatically under «تقرير الأشكال».

A note on the kite data: the printed values are internally consistent
(`14.4² = 12² + 8²` and `10² = 6² + 8²`), which confirms the reading
`AE = 12`, `EC = 6`, `EB = ED = 8`, `AB = AD = 14.4`, `CB = CD = 10`. This
verification is recorded in the figure description, but the figure itself
stays `reference` because it is a photograph.

## Platform-authored interactive analogues

The student still receives exact, responsive geometry, but it is kept visibly
separate under the badge «شرح المنصّة»:

| Figure id                        | Renderer                | Purpose                                                                                                                                                                         |
| -------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auth-04-translation-congruence` | `translation-figure`    | The lesson's bridge: a triangle and its translated image are congruent.                                                                                                         |
| `auth-04-cases-lab`              | `congruence-cases-lab`  | Case selector + sliders; two triangles built from the same three givens are congruent by construction; remaining elements are computed exactly (law of cosines / law of sines). |
| `auth-04-proof-construction`     | `construction-figure`   | Four-step walkthrough of an authored proof (two segments bisecting each other → SAS → equal third sides).                                                                       |
| `auth-04-grouped-challenges`     | `congruence-challenges` | Name the case, complete the missing datum, and find the error; one grouped check.                                                                                               |

All authored coordinates are chosen by the platform and are never claimed to
reproduce a textbook figure. The paired triangles of the challenges are exact
translates (verified by unit tests); the lab triangles are computed from the
givens, never eyeballed.

## Answer protection

No printed exercise figure has a reveal control. The grouped challenge is new
platform content and waits until all three answers are submitted before
showing feedback. Printed-question solutions remain behind Teacher Gate.
