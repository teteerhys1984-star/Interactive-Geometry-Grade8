# Lesson 3 — source figures and geometry audit (pages 11–16)

The source for «صورة شكل وفق انسحاب» is the six textbook-page scans supplied
for this task, in printed order: image 1 → page 11, image 2 → page 12, image 3
→ page 13, image 4 → page 14, image 5 → page 15, and image 6 → page 16. The
uploaded full-page files were temporary inputs; the repository retains the
22 figure crops used by the lesson under
`public/diagrams/unit-01/lesson-03/`.

## Textbook figures: exact source crops

These are PNG crops from the supplied scans, not redraws or approximations.
Each student-facing figure is an `image` diagram with `origin: 'textbook'`, a
printed page and locator, an Arabic alt description, and a caption. The crop
boundaries were checked against the scans; several were widened to keep printed
labels, arrows, angle marks, or grid markers intact.

| Page | Diagram id                               | Crop file                               | Printed content                                        |
| ---: | ---------------------------------------- | --------------------------------------- | ------------------------------------------------------ |
|   11 | `fig-11-line-conjecture-case-1`          | `fig-11-conjecture-case-1.png`          | Conjecture, oblique line case ①                        |
|   11 | `fig-11-line-conjecture-case-2`          | `fig-11-conjecture-case-2.png`          | Conjecture, line parallel to the translation case ②    |
|   11 | `fig-11-line-proof`                      | `fig-11-line-proof.png`                 | Intersecting lines and proof construction              |
|   12 | `fig-12-segment-activity`                | `fig-12-segment-activity.png`           | Segment $[MN]$, length 3.4 cm                          |
|   12 | `fig-12-ray-activity`                    | `fig-12-ray-activity.png`               | Ray $[Dx)$                                             |
|   12 | `fig-12-circle-activity`                 | `fig-12-circle-activity.png`            | Circle, radius 3.2 cm                                  |
|   12 | `fig-12-line-construction-nonparallel`   | `fig-12-line-construction-oblique.png`  | Constructing a non-coincident line image               |
|   12 | `fig-12-line-construction-parallel`      | `fig-12-line-construction-parallel.png` | Parallel case; the line image coincides                |
|   13 | `fig-13-parallel-lines`                  | `fig-13-parallel-lines.png`             | Images of parallel lines                               |
|   13 | `fig-13-perpendicular-lines`             | `fig-13-perpendicular-lines.png`        | Images of perpendicular lines and right-angle marks    |
|   13 | `fig-13-segment-image`                   | `fig-13-segment-image.png`              | Segment and its translated image                       |
|   14 | `fig-14-ray-image`                       | `fig-14-ray-image.png`                  | Ray and translated ray                                 |
|   14 | `fig-14-circle-image`                    | `fig-14-circle-image.png`               | Original and translated circles                        |
|   14 | `fig-14-line-image-example-given`        | `fig-14-line-image-given.png`           | Worked example givens                                  |
|   14 | `fig-14-line-image-example-construction` | `fig-14-line-image-construction.png`    | Printed compass construction and result                |
|   15 | `fig-15-square-application`              | `fig-15-square-example.png`             | Worked 3 cm square translated from $D$ to $C$          |
|   15 | `fig-15-check-parallel`                  | `fig-15-check-parallel.png`             | Grid check, parallel lines, translation $M\to M'$      |
|   15 | `fig-15-check-perpendicular`             | `fig-15-check-perpendicular.png`        | Grid check, perpendicular lines, translation $M\to M'$ |
|   16 | `fig-16-practice-one`                    | `fig-16-practice-one.png`               | Given segment and line for Practice ①                  |
|   16 | `fig-16-attempt-1`                       | `fig-16-attempt-1.png`                  | Attempt ①                                              |
|   16 | `fig-16-attempt-2`                       | `fig-16-attempt-2.png`                  | Attempt ②                                              |
|   16 | `fig-16-attempt-3`                       | `fig-16-attempt-3.png`                  | Attempt ③                                              |

The geometry of blank-sheet figures and the fine grids is deliberately not
reconstructed from guessed coordinates. Their original labels, marks and
relative positions remain visible in the crops. No textbook figure uses a
“راجع الكتاب” placeholder, and no crop is presented as platform-authored art.

## Student-facing platform-authored material

The following figures are new explanations/interactions, not printed textbook
figures. Their captions, adjacent text, or authored-step badge explicitly say
that they are from the platform.

| Diagram id                                | Renderer                 | Purpose                                                                                                                                                                  |
| ----------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auth-03-triangle-all-points`             | `translation-figure`     | Make clear that a translated shape is assembled from the images of its vertices.                                                                                         |
| `auth-03-line-image`                      | `translation-figure`     | Explain why two point-images determine the image line.                                                                                                                   |
| `auth-03-shape-explorer`                  | `shape-translation-lab`  | Select a line, segment, triangle, ray, or circle; adjust the vector; reveal paths and image. For a line, distinguishes a coincident image from a distinct parallel line. |
| `auth-03-quadrilateral-construction`      | `construction-figure`    | Progressive four-vertex construction illustrating a common translation.                                                                                                  |
| `auth-03-square-application-construction` | `construction-figure`    | Progressive p.15 construction for the printed 3 cm square and $D\to C$ translation, including $A'=B$ and $D'=C$.                                                         |
| `auth-03-practice-two-givens`             | `construction-figure`    | Collapsed p.16 Practice ② starter showing only a right triangle and $E$; deliberately omits the requested translated segment.                                            |
| `auth-03-grouped-challenges`              | `translation-challenges` | Three new questions about images, vectors, and a common-translation error; feedback appears only after grouped submission.                                               |

The p.15 authored square uses the exact 3-unit translation in its own
coordinate model; it is an additional explanation and not a trace of the
printed drawing. The p.16 collapsed starter uses $B=(0,0)$, $A=(4,0)$,
$C=(0,6)$ and $E=(2,0)$ only to satisfy the printed lengths and right angle.
It shows no $B'$ or $E'$ and does not answer the construction task.

## Exercise-to-implementation coverage

| Printed page / exercise                         | Student-facing implementation                                                                                                                       | Teacher solution coverage                                                                                                                       |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 11 — Activity 1, questions 1–2                  | Both printed line configurations are separate source crops; construction wording and the “parallel or coincident” distinction are retained.         | Four records: question 1 and question 2, each split across figures ① and ②.                                                                     |
| 11 — Activity 2, proof steps 1–5                | Original proof figure crop, five printed prompts, and a platform-authored proof construction in Teacher Area.                                       | Five records, one for each printed proof step; the parallelogram explanation includes a teacher-only diagram.                                   |
| 12 — Activity 3                                 | Separate source crops for the 3.4 cm segment, ray, and 3.2 cm circle.                                                                               | Three records, one per printed shape branch.                                                                                                    |
| 12–14 — line-image rule and worked construction | Source statements, both p.12 cases, p.13 line/segment figures, p.14 ray/circle figures, and both p.14 worked-example crops remain in printed order. | These are explanatory/solved lesson material rather than additional numbered exercise prompts.                                                  |
| 15 — worked square example                      | Exact printed 3 cm square crop and a separate platform-authored progressive model for the translation $D\to C$, including $A'=B$ and $D'=C$.        | The printed worked reasoning remains with the example; the platform model is explicitly labeled.                                                |
| 15 — Check your understanding                   | Both printed grids are separate crops: figure ① parallel lines, figure ② perpendicular lines; both completion items remain verbatim.                | Four records: one drawing solution for each grid and one exact completion for each statement.                                                   |
| 16 — Practice ①                                 | Source crop plus all four printed construction/relation subparts.                                                                                   | Four records; the inverse translation is explicitly $B\to A$.                                                                                   |
| 16 — Practice ②                                 | All five printed parts remain; the collapsed student aid contains only the right-triangle givens and $E$, not the requested image.                  | Five records; part 3 includes the complete teacher-only $[E'B']$ construction, and parts 4–5 explain parallelism and the preserved 2 cm length. |
| 16 — Practice ③                                 | The full rectangle construction prompt with both printed side lengths and the $B\to A$ translation.                                                 | One detailed construction solution with a teacher-only rectangle image.                                                                         |
| 16 — Practice ④                                 | The source names عدنان، غسان، عصام and all three printed attempts are retained as separate crops.                                                   | Two records; the scan's direction is $B\to A$, غسان is the only correct attempt, figure ③; the other two direction/length errors are explained. |

Teacher records total **28**: 9 on p.11, 3 on p.12, 4 on p.15, and 12 on p.16. Pages 13–14 have source material and worked explanations but no additional numbered exercise prompt to solve.

## Teacher-only authored constructions

Three additional declarative diagrams support the gated teacher solutions:
`teachsol-l3-proof-parallelogram` (p.11 proof),
`teachsol-l3-practice-two-image` (p.16 Practice ②), and
`teachsol-l3-practice-three-rectangle` (p.16 Practice ③). Each has an authored
provenance, an explicit platform-made caption, and exact coordinates chosen to
satisfy the stated relations. These are not textbook figures and are rendered
only with their teacher solution after the shared Teacher Gate is unlocked.

## Provenance and answer protection

`src/content/units/lesson-03-image-of-a-shape.ts` owns the source figure
metadata and maps every image to a printed page/locator. Focused source-fidelity
tests enforce all 22 image references, page metadata, and per-page coverage. A
separate asset check verified that the 22 references match 22 valid PNG files,
and the production build copied all 22 into `dist`. Authored teaching figures
use `origin: 'authored'` and never replace the source crop.

The p.16 student starter is collapsed and reveals only the givens; the source
exercise figure itself has no solution-reveal control. The separate grouped
challenge is platform-authored and waits until all three answers are submitted
before showing correctness or explanations. Textbook-derived solutions stay
behind Teacher Gate.
