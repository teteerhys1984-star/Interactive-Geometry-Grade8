# Unit 3 · Lesson 1 — figure record (pages 53–55)

Every figure of «محور ضلع في المثلث» is a **platform drawing**
(`origin: 'authored'`, renderer `midline-figure`), and each one says so in its
caption:

> رسم تعليمي من إعداد المنصّة — الشكل تخطيطي غير مقيّس، والعلاقات الهندسية
> المعلَّمة فيه محقَّقة بالحساب.

**Why all of them are authored.** Pages 53–55 print no measurement at all (the
only exceptions are the three side lengths of «تدرّب ③»: `AB = 5`,
`BC = 7.5`, `CA = 8` cm, which the figure writes at the sides and honours by
construction). A redraw can therefore be faithful to the _relations_ of the
printed figure, but not to its _dimensions_; presenting it as a reproduction
would claim a scale the source never gives.

Coordinates live in `src/content/units/lesson-13-geometry.ts` and are re-measured
by `lesson-13-geometry.test.ts` (40 assertions): the perpendicularity of every
bisector, the equality `MB = MC`, the concurrence at `O`, `OA = OB = OC`, and the
position of `O` in each of the three printed panels (`inside` / `outside` /
`on-side`). The static figures and the interactive lab read the same file, so
they cannot drift apart.

## The engine extension this lesson needed: circles and arcs

`FigureSpec` described segments, polygons, angles, points, frames and texts. A
bisector is _constructed from two compass arcs_, and the lesson's central claim is
about the **circle through the three vertices**, so the figure contract grew two
primitives. The change is strictly additive — no existing spec, renderer or test
changed meaning:

| File                                                     | Change                                                                                                                                                                                                                       |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/lib/geometryFigure.ts`                              | `FigureCircle { at, r }`, `FigureArc { at, r, from, to }` (from/to = degrees, counter-clockwise sweep), `circles` / `arcs` on `FigureSpec`, `readCircle` / `readArc`, `circlePolyline` / `arcPolyline`, transform + key list |
| `src/lib/figureLayout.ts`                                | `collectObstacles` gained `addPath()`; a circle becomes a 48-segment obstacle, an arc 32, so labels never sit on a drawn curve                                                                                               |
| `src/components/diagram/renderers/lesson4/FigureSvg.tsx` | draws `spec.circles` (dashed when asked) and `spec.arcs`                                                                                                                                                                     |
| `src/components/diagram/renderers/index.ts`              | registers `side-bisector-lab`                                                                                                                                                                                                |

An arc is **centre + radius + counter-clockwise sweep in degrees** and is drawn as
a polyline, never as a native SVG `A` command: the layout engine has to know where
the ink is, and a sampled polyline is the same object the label obstacle test
measures.

## Marking rules

A tick asserts equality and a square asserts perpendicularity, so nothing is
claimed by shape alone:

| Mark                               | Meaning in this lesson                                                |
| ---------------------------------- | --------------------------------------------------------------------- |
| right-angle square at a foot       | the line is perpendicular to the side at that point                   |
| double tick on **both halves**     | the line passes through the **midpoint** of that side                 |
| one tick on `[MB]`, `[MC]`         | `MB = MC` (the property, not the definition)                          |
| one tick on `[OA]`, `[OB]`, `[OC]` | `OA = OB = OC` — `O` is the centre of the circle through the vertices |
| one tick on `[AB]`, `[AC]`, `[AD]` | `AB = AC = AD` — «تدرّب ②»                                            |
| `✓` beside one panel               | that panel is the right answer of a page-53 multiple-choice question  |

Consequence, asserted in `lesson-13-coverage.test.ts`: **every figure that shows
a bisector shows its two marks** — the right angle at the foot and the two equal
halves. A bisector drawn without them is merely a line through a side.

## Page-53 panel numbering

The Arabic page numbers its three panels **right to left**: `①` is the
right-hand panel and `③` the left-hand one. All page-53 figures keep that order,
so the panel labelled `①` is drawn on the right of every frame. Page 55's three
special-case panels are printed **without** numbers; the platform numbers them
`①②③` while keeping the printed order (acute / obtuse in `Â` / right in `Â`),
and the caption says the numbering is editorial. Both decisions are recorded in
`lesson-13-questions.ts`.

## Figure-by-figure record

31 constructed specs, all embedded in the lesson (17 in the student sequence —
including the interactive lab — and 24 in the Teacher Area; **nine** figures serve
both, because a solution legitimately reads the given figure). The nine shared
figures are `fig-l13-sol-q1`, `fig-l13-sol-q2`, `fig-l13-sol-q3`,
`fig-l13-sol-q4`, `fig-l13-sol-q5`, `fig-l13-activity-given`,
`fig-l13-check-setup`, `fig-l13-practice-two-given` and
`fig-l13-practice-three-given`; the other fifteen figures belong to their own
solution record alone.

|   # | Diagram id                             | Page | Configuration                                                                          | What is carried exactly                                                                                                                                            |
| --: | -------------------------------------- | ---: | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|   1 | `fig-l13-opener-lines`                 |   53 | three panels ①②③ on one triangle `ABC`                                                 | ① altitude at `A` (right angle, **not** at the midpoint), ② bisector of `[BC]` (right angle **and** two equal halves), ③ median (two equal halves, no right angle) |
|   2 | `fig-l13-opener-angle`                 |   53 | three panels on angle `ÂMK`, `MA = MK`                                                 | the bisector through `A` in one panel only; `∠AMK = 59°` measured from coordinates                                                                                 |
|   3 | `fig-l13-opener-arcs`                  |   53 | arcs centred `E`, `F`, `A` at **two** radii: `3.0` for the `A`-arc, `2.0` for the `E`- and `F`-arcs | the page's own wording «وأنصاف أقطارها متساوية» is loose: the drawing keeps the true construction, `AE = AF = 3.0` (so the `A`-arc passes through `E` and `F`) and `PE = PF = 2.0` (so the two short arcs meet at `P`); `[AP)` bisects `∠BAC` |
|   4 | `fig-l13-sol-q1`                       |   53 | panel set of #1, `✓` on ②                                                              | same marks; the answer is shown, not asserted                                                                                                                      |
|   5 | `fig-l13-sol-q2`                       |   53 | panel set of #1, `✓` on ①                                                              | same                                                                                                                                                               |
|   6 | `fig-l13-sol-q3`                       |   53 | segment `[JK]`, its bisector `(d)`, `M ∈ (d)`, `[MJ]`, `[MK]`                          | `M` on the bisector with one tick per half; `MJ = MK` is forced, `MJ > MK` impossible                                                                              |
|   7 | `fig-l13-sol-q4`                       |   53 | panel set of #2, `✓` on ③                                                              | same                                                                                                                                                               |
|   8 | `fig-l13-sol-q5`                       |   53 | arc set of #3                                                                          | same                                                                                                                                                               |
|   9 | `fig-l13-activity-given`               |   54 | triangle `ABC`, bisectors `(d)` of `[AB]` and `(d′)` of `[BC]`, meeting at `O`         | both bisectors marked; `O` labelled; **no** equality claimed                                                                                                       |
|  10 | `fig-l13-definition`                   |   54 | `[BC]`, `(d)` perpendicular at its midpoint                                            | right angle at the foot + two equal halves                                                                                                                         |
|  11 | `fig-l13-property`                     |   54 | `M ∈ (d)`, `[MB]`, `[MC]`                                                              | the two segments carry one tick each                                                                                                                               |
|  12 | `fig-l13-special-cases`                |   55 | three panels: acute / obtuse / right; the three bisectors are the full chords of the circle | `O` inside, outside, on `[BC]`; `O` computed as the circumcentre, never placed by eye; the three chords carry the printed names `(d₁)` (bisector of `[AB]`), `(d₂)` (`[BC]`), `(d₃)` (`[AC]`) at their lower rim, and the right-angled panel carries the printed square at `A` |
|  13 | `fig-l13-check-setup`                  |   55 | circle centred `O` through `A`, `B`, `C`, triangle drawn                               | `OA = OB = OC = R`; no bisector (that is the student's work)                                                                                                       |
|  14 | `fig-l13-practice-one-given`           |   55 | `ABC`, bisectors of `[AB]` and `[BC]`, meeting at `M`                                  | both bisectors marked; `M` labelled; no equality                                                                                                                   |
|  15 | `fig-l13-practice-two-given`           |   55 | `ABC`, `ABD` isosceles in `A`, sharing `[AB]`                                          | one tick on each of `[AB]`, `[AC]`, `[AD]`                                                                                                                         |
|  16 | `fig-l13-practice-three-given`         |   55 | `ABC` with `5`, `7.5`, `8` written at the sides                                        | the three printed lengths, honoured at scale `0.5`                                                                                                                 |
|  17 | `fig-l13-sol-activity-construct`       |   54 | + `(d)`, `(d′)` built from both midpoints                                              | both marks on both bisectors; `O`                                                                                                                                  |
|  18 | `fig-l13-sol-activity-equal`           |   54 | + `[OA]`, `[OB]`, `[OC]`                                                               | one common tick: `OA = OB = OC`                                                                                                                                    |
|  19 | `fig-l13-sol-activity-third`           |   54 | + third bisector `(d″)` of `[AC]` through `O`, dashed                                  | `(d″)` passes through `O`; its marks                                                                                                                               |
|  20 | `fig-l13-sol-activity-circle`          |   54 | + circle `C` centred `O` through `A`                                                   | the circle passes through `B` and `C` as well                                                                                                                      |
|  21 | `fig-l13-sol-activity-explain`         |   54 | same configuration, drawn for «تأمّل ثم اشرح ما سبق»                                   | the three radii with one common tick; `B`, `C` on the circle                                                                                                       |
|  22 | `fig-l13-sol-activity-points`          |   54 | + a further point `N` on the circle with radius `[ON]`                                 | `ON = OA`                                                                                                                                                          |
|  23 | `fig-l13-sol-activity-arcs`            |   54 | two arcs of equal radius centred `B` and `C`, and the line through their intersections | the line is the bisector of `[BC]`: perpendicular at the midpoint                                                                                                  |
|  24 | `fig-l13-sol-check-bisectors`          |   55 | the three bisectors of #13, drawn with the compass marks                               | right angle at each foot + two equal halves; `O` **not** highlighted (that is ③)                                                                                   |
|  25 | `fig-l13-sol-check`                    |   55 | + dashed radii `[OA]`, `[OB]`, `[OC]`                                                  | the three bisectors meet at `O`, the centre of the circle                                                                                                          |
|  26 | `fig-l13-sol-practice-one`             |   55 | + `[MA]`, `[MC]` (image) and `[MB]` (dashed)                                           | `MA = MB = MC`, so `MAC` is isosceles in `M`                                                                                                                       |
|  27 | `fig-l13-sol-practice-two-draw`        |   55 | the requested drawing + dashed `[CD]`                                                  | `A` is equidistant from `B`, `C`, `D`; the circle is **not** drawn (next question)                                                                                 |
|  28 | `fig-l13-sol-practice-two`             |   55 | + circle centred `A` through `B`, `C`, `D`                                             | `A` is the centre; radius `AB`                                                                                                                                     |
|  29 | `fig-l13-sol-practice-three-circles`   |   55 | three dashed circles of radius `5.6` centred at the vertices                           | each pair meets in two points (`5.6 > 8/2`), no meeting point marked                                                                                               |
|  30 | `fig-l13-sol-practice-three-bisectors` |   55 | + the three bisectors and `P`, `Q` on the pair for `[BC]`                              | `P`, `Q` are the intersections of the circles centred `B` and `C`; `O` not named yet                                                                               |
|  31 | `fig-l13-sol-practice-three`           |   55 | + `O` and the double intersection points                                               | the bisectors concur at `O`, the centre of the circle through the vertices                                                                                         |

No spec carries a hand-tuned `viewBox`: `constructedBlock` computes it from the
geometry (`fitViewBox`), padding frames by 0.55 and plain drawings by 0.45.
`FigureBody` — the input type — therefore forbids the field, and
`lesson-13-coverage.test.ts` re-checks that every drawn segment and point falls
inside the computed box.

## Printed prompt → solution → figure

The book prints **no** solution: not for page 53, not for the activity, not for
«تحقّق من فهمك» or «تدرّب». All 24 records below are derived by the platform, and
each `reference` says so.

|   # | Printed prompt (page)                               | Solution id                    | Figure                                 |
| --: | --------------------------------------------------- | ------------------------------ | -------------------------------------- |
|   1 | محور الضلع `[BC]` في المثلث `ABC` (53)              | `l13-sol-p53-q1`               | `fig-l13-sol-q1`                       |
|   2 | الارتفاع المتعلق بالضلع `[BC]` (53)                 | `l13-sol-p53-q2`               | `fig-l13-sol-q2`                       |
|   3 | `(d)` محور `[JK]` و`M` تنتمي إلى `(d)` (53)         | `l13-sol-p53-q3`               | `fig-l13-sol-q3`                       |
|   4 | منصف الزاوية `ÂMK` (53)                             | `l13-sol-p53-q4`               | `fig-l13-sol-q4`                       |
|   5 | أقواس مركزها `E` و`F` و`A` (53)                     | `l13-sol-p53-q5`               | `fig-l13-sol-q5`                       |
|   6 | ارسم مثلثًا وارسم `(d)` و`(d′)` (54 ①)              | `l13-sol-p54-construct`        | `fig-l13-sol-activity-construct`       |
|   7 | ارمز إلى نقطة التقاطع بالرمز `O` (54 ②)             | `l13-sol-p54-intersection`     | `fig-l13-activity-given`               |
|   8 | ما خاصة المحور … `OA = OB` و`OB = OC` (54 ②①)       | `l13-sol-p54-property`         | `fig-l13-sol-activity-equal`           |
|   9 | لماذا تنتمي `O` إلى محور `[AC]` (54 ②②)             | `l13-sol-p54-third`            | `fig-l13-sol-activity-third`           |
|  10 | ارسم الدائرة `C` التي مركزها `O` (54 ③①)            | `l13-sol-p54-circle`           | `fig-l13-sol-activity-circle`          |
|  11 | تأمّل ثم اشرح ما سبق (54 ③②)                        | `l13-sol-p54-reflect`          | `fig-l13-sol-activity-explain`         |
|  12 | أعط نقاطًا تمر منها الدائرة `C` (54 ③③)             | `l13-sol-p54-points`           | `fig-l13-sol-activity-points`          |
|  13 | أقواس مركزها `B` و`C` (54 ④)                        | `l13-sol-p54-arcs`             | `fig-l13-sol-activity-arcs`            |
|  14 | ارسم دائرة مركزها `O` وثلاث نقاط عليها (55 ①)       | `l13-sol-p55-check-1`          | `fig-l13-check-setup`                  |
|  15 | ارسم بالفرجار المحاور الثلاثة (55 ②)                | `l13-sol-p55-check-2`          | `fig-l13-sol-check-bisectors`          |
|  16 | ما الملفت في الشكل الذي رسمته؟ (55 ③)               | `l13-sol-p55-check-3`          | `fig-l13-sol-check`                    |
|  17 | أثبت أنّ `MAC` متساوي الساقين (55 ①)                | `l13-sol-p55-practice-1`       | `fig-l13-sol-practice-one`             |
|  18 | المثلثان `ABC` و`ABD` متساويا الساقين في `A` (55 ②) | `l13-sol-p55-practice-2-given` | `fig-l13-practice-two-given`           |
|  19 | ارسم شكلًا (55 ②①)                                  | `l13-sol-p55-practice-2-draw`  | `fig-l13-sol-practice-two-draw`        |
|  20 | ما مركز الدائرة المارة بـ `B` و`C` و`D`؟ (55 ②②)    | `l13-sol-p55-practice-2`       | `fig-l13-sol-practice-two`             |
|  21 | ارسم مثلثًا أطوال أضلاعه `5` و`7.5` و`8` (55 ③①)    | `l13-sol-p55-practice-3-1`     | `fig-l13-practice-three-given`         |
|  22 | ارسم ثلاث دوائر نصف قطرها أكبر من `5` (55 ③②)       | `l13-sol-p55-practice-3-2`     | `fig-l13-sol-practice-three-circles`   |
|  23 | ارسم المحاور الثلاثة (55 ③③)                        | `l13-sol-p55-practice-3-3`     | `fig-l13-sol-practice-three-bisectors` |
|  24 | ما الملفت فيما يتعلق بالدوائر والمحاور؟ (55 ③④)     | `l13-sol-p55-practice-3-4`     | `fig-l13-sol-practice-three`           |

## Interactive lab

`auth-13-side-bisector-lab` (renderer `side-bisector-lab`) makes the page-54
activity dynamic and doubles as the page-55 panel viewer:

- `M` slides along the bisector of `[BC]` (`t ∈ [-2.6, 2.6]`); `MB` and `MC` are
  recomputed at every position and stay equal to three decimals — the property of
  the page-54 box, shown instead of asserted;
- the three bisectors always concur at `O`, and a toggle draws the circle centred
  `O` through the vertices, so `OA = OB = OC` is visible;
- the three printed panels are the three presets: acute (`O` inside), obtuse in
  `Â` (`O` outside), right in `Â` (`O` on the hypotenuse). Only the triangle
  changes; `O` stays the same point of the bisector construction.
- `LessonThirteenRendering.test.tsx` drives the real controls: slider, circle
  toggle, the three presets, and the label set `A`, `B`, `C`, `M`, `O` in the SVG.

## Verification

- `lesson-13-geometry.test.ts` — 40 assertions on the coordinates (perpendicular
  bisectors, midpoint feet, `MB = MC` to `1e-9`, concurrence, `OA = OB = OC`,
  `O` inside / outside / on-side for the three panels, arcs actually equal).
- `lesson-13-coverage.test.ts` — registration, verbatim coverage of pages 53–55,
  24 prompts ↔ 24 solutions, one distinct figure per solution, unique figure ids,
  viewBox containment, the lab registered and embedded in an authored step.
- `LessonThirteenRendering.test.tsx` — every step rendered through the router: no
  missing renderer, no raw `$`, no KaTeX error, maths isolated in `dir="ltr"`, the
  lab reachable and interactive.
- Every figure was additionally rasterised from the real layout output (the same
  `computeLabelLayout` the app uses) and inspected panel by panel before delivery;
  the renders found and fixed the label collisions recorded in the git history of
  `lesson-13-figures.ts` (arc radii in `fitViewBox`, bisector overhang, the
  `P`/`Q` labels of «تدرّب ③», and the even spacing of «تدرّب ②»).
