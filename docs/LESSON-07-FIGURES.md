# Lesson 7 figure record — Unit 1 exercises, Questions 16–28

## Editorial rule

This independent lesson follows the repository's figure decision tree, with one
clarification that Lesson 7 needed and earlier lessons did not:

1. Rebuild a printed figure only when every **geometry-bearing** fact it asserts
   is explicit in the scan: which vertices are adjacent, which segments are
   actually drawn, which regions are shaded, and which equality / right-angle
   marks are printed.
2. A configuration such as “`ABCD` is a rectangle and `[AC]` is drawn” is fully
   determined **up to proportion**. Proportions in these figures carry no
   mathematical information: no length, angle or ratio is printed, and none is
   claimed. The reconstruction therefore states the same geometry as the source
   while choosing readable proportions — it never asserts a measurement.
3. Use `reference` whenever an unmeasured **position** is itself part of the
   task, or where the printed artefact is handwriting, a colour-coded
   construction sheet, or a layout whose point placement the student must copy.
   No approximate redraw is substituted for those.
4. Mark every platform-created explanation as `origin: authored` and say so in
   the caption.

No supplied scan is shipped as an `image` diagram.

## Counts

| Classification                          |  Count |
| --------------------------------------- | -----: |
| `reference` textbook figures            |      5 |
| reconstructed textbook figures          |      8 |
| `authored` figures and interactive labs |     26 |
| **Total diagram records**               | **39** |

The 26 authored records are 13 proof workshops (one per main question), 6 hint
ladders (Questions 16, 19, 22, 23, 27, 28) and 7 explanatory figures
(Questions 16, 17, 19, 21, 22, 23, 28).

## Textbook figures

| ID                                | Question | Classification | Verification / reason                                                                                                                                                   |
| --------------------------------- | -------: | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fig-ex7-q16-rect-parallelogram`  |     16 ① | reconstructed  | Adjacency, the shaded rectangle, and the collinearity of `N`, `B`, `C`, `M` are all explicit. See record below.                                                         |
| `fig-ex7-q16-case-two`            |     16 ② | `reference`    | Branch ② carries a second, independent figure whose vertex placement and marks are not determined by the printed text; redrawing it would be guesswork.                 |
| `fig-ex7-q17-figures`             |       17 | `reference`    | The three small layouts have no grid or measurements, and their point placement is the construction task of branch 2.                                                   |
| `fig-ex7-q18-cases`               |       18 | `reference`    | Case ② is on blank paper with no readable positions, and the two cases belong together; redrawing case ① alone would change the exercise.                               |
| `fig-ex7-q19-student-work`        |       19 | `reference`    | The printed artefact is a pupil's handwritten solution with the teacher's red annotations. Only the red **texts** are transcribed (into a table); no stroke is redrawn. |
| `fig-ex7-q20-rectangle-diagonals` |       20 | reconstructed  | A rectangle with both diagonals and the four printed right-angle marks. Nothing else is asserted. See record below.                                                     |
| `fig-ex7-q21-segment`             |       21 | `reference`    | Only `MN = 2 cm` is printed; the direction of the translation and the placement of `A`, `B`, `M`, `N` are unmeasured.                                                   |
| `fig-ex7-q23-proof-flow`          |       23 | reconstructed  | Carries **no geometry at all**: it is the printed deduction chart, i.e. text boxes, arrow directions and dotted blanks, all read directly from the scan.                |
| `fig-ex7-q24-parallelogram`       |       24 | reconstructed  | A parallelogram with both diagonals, centre `O`, and the two shaded triangles named in the question. See record below.                                                  |
| `fig-ex7-q25-rectangle`           |       25 | reconstructed  | A rectangle with the single printed diagonal `[AC]`; `[BD]` is deliberately **not** drawn, exactly as in the source.                                                    |
| `fig-ex7-q26-rhombus`             |       26 | reconstructed  | A rhombus with both diagonals and centre `O`. Four equal sides are enforced by a test; no right-angle mark is drawn at `O` because the source prints none.              |
| `fig-ex7-q27-isosceles`           |       27 | reconstructed  | Collinearity and order of `D`, `A`, `B`, `N`, the double tick marks `DA = BN`, and `CA = CB` are all printed. See record below.                                         |
| `fig-ex7-q28-parallels`           |       28 | reconstructed  | Two parallels cut by a transversal, with the two named angles. Their placement is fixed by the printed name «الزاويتان المتبادلتان داخلاً». See record below.           |

## Reconstruction records

All coordinates below are in the renderer's `0 0 640 360` view box, x rightward
and y downward. They are **editorial proportions**, not measurements from the
scan; what the scan fixes is the incidence structure verified underneath each
record (and pinned by `UnitFinalFigure.test.tsx`).

### Question 16 ①

`A(180,90)`, `D(510,90)`, `N(70,280)`, `B(180,280)`, `M(400,280)`, `C(510,280)`.

Verified relations, each read from the printed figure:

- `ANMD` is a parallelogram: `AN = (−110,190) = DM`, and `AD ∥ NM` with
  `AD = NM = 330`.
- `ABCD` is a rectangle: `AB` and `DC` are vertical, `AD` and `BC` horizontal.
- `N`, `B`, `C`, `M` are collinear (`y = 280`) in the printed left-to-right
  order `N`, `B`, `M`, `C`.
- The two white triangles left outside the shaded rectangle are exactly `ANB`
  and `MCD`, the pair the question names.

The same coordinates are reused by the authored figure
`auth-ex7-q16-translation-map`, which additionally draws the three translation
arrows `N→M`, `A→D`, `B→C`. Those are equal by construction:
`M − N = D − A = C − B = (330,0)`.

### Question 20

`A(250,60)`, `B(400,60)`, `C(400,300)`, `D(250,300)` — a rectangle with both
diagonals drawn in red and a right-angle square at each of the four vertices,
matching the printed figure. `AC = BD` is a consequence of the construction, not
an asserted measurement.

### Question 23

No geometry. The chart reproduces, in printed order:

1. «لدينا من النص» → «`K` هي صورة النقطة `B` وفق الانسحاب الذي ينقل `I` إلى `A`»
2. «إذن، وحسب — صورة نقطة وفق انسحاب» → «........... هو متوازي أضلاع»
   with the side box «`J` منتصف `[AB]`» feeding into it
3. «خاصة ....................» → «`J` هي منتصف `[IK]`»

Both dotted blanks are preserved; the chart never shows their answers.

### Question 24

`A(120,300)`, `B(370,300)`, `C(520,90)`, `D(270,90)`, `O(320,195)`.

- Parallelogram: `AB = (250,0) = DC` and `AD = (150,−210) = BC`.
- `O` is the common midpoint: `(A+C)/2 = (B+D)/2 = (320,195)`, so it really is
  the intersection of the two drawn diagonals.
- Shaded triangles are exactly `ABO` and `ODC`, the pair the question names.

### Question 25

`A(140,300)`, `B(500,300)`, `C(500,80)`, `D(140,80)` with the single diagonal
`[AC]`. A test asserts the figure contains exactly one `<line>`, so the second
diagonal can never creep in — drawing it would hand the student the answer to
branch 2.

### Question 26

`A(140,290)`, `B(390,290)`, `C(515,74)`, `D(265,74)`, `O(327.5,182)`.

Built from a 250-unit side at 60°: `AD = (125, −216.5)`, rounded to integers for
the view box. The four sides then agree to within half a unit, which a test
pins. `O` is the common midpoint of `[AC]` and `[BD]`. No right-angle mark is
drawn at `O`: that is the conclusion of the exercise, and the source does not
print it.

### Question 27

`D(90,300)`, `A(220,300)`, `B(400,300)`, `N(530,300)`, `C(310,70)`.

- `D`, `A`, `B`, `N` are collinear (`y = 300`) in the printed order.
- `DA = BN = 130` — carrying the printed double tick marks.
- `CA = CB` (both `≈ 246.98`) — the printed isosceles condition.

### Question 28

`(d)`: `y = 120`; `(d′)`: `y = 280`; transversal through `A(330,120)` and
`B(230,280)`.

The two angle arcs are placed on opposite sides of the transversal — `∠1` below
`(d)` towards `M`, `∠2` above `(d′)` towards `N`. That placement is not a guess:
the question names them «الزاويتان المتبادلتان داخلاً» (alternate interior), and
its own branch 2 confirms it, since the perpendicular through the midpoint `O`
meets `(d)` at `M(280,120)` — left of `A` — and `(d′)` at `N(280,280)` — right of
`B`. The authored figure `auth-ex7-q28-auxiliary-construction` draws exactly that
construction: `O = (A+B)/2 = (280,200)`, `MN` vertical through `O`, with the
right-angle marks at `M` and `N` and the equal marks on `[AO]` and `[OB]`.

## Authored figure records

| ID                                    | Question | Purpose                                                                                      |
| ------------------------------------- | -------: | -------------------------------------------------------------------------------------------- |
| `auth-ex7-q16-translation-map`        |       16 | Shows the single vector `N→M` carrying all three vertices, i.e. the “other justification”.   |
| `auth-ex7-q17-three-transformations`  |       17 | Three panels: what each of the three definitions actually fixes (centre, vector, axis).      |
| `auth-ex7-q19-general-case`           |       19 | The general case the corrector asks for: `AB ≠ AC`, so `ABC′C` is a rectangle, not a square. |
| `auth-ex7-q21-translated-segment`     |       21 | Generic illustration of length preservation; explicitly not a redraw of the printed figure.  |
| `auth-ex7-q22-parallelogram-acba`     |       22 | Question 22 prints no figure at all; this is a general, non-special triangle `ABC`.          |
| `auth-ex7-q23-parallelogram-iakb`     |       23 | Shows where the parallelogram `IAKB` sits inside the quadrilateral `ABCD`.                   |
| `auth-ex7-q28-auxiliary-construction` |       28 | The auxiliary perpendicular through the midpoint, and the two congruent triangles.           |

Every one of these is captioned «شرح المنصّة» or an equivalent explicit phrase,
so no reader can mistake one for the book's own figure.

## What is deliberately absent

- No coordinates, lengths, angles, arrow directions or point names were invented
  for any `reference` figure.
- No reconstruction shows the answer to its own question: Question 25 keeps a
  single diagonal, Question 26 carries no right-angle mark at `O`, Question 23's
  chart keeps both blanks, and Question 20's table keeps its printed row only.
- Question 22 has no printed figure, and none is presented as such.
