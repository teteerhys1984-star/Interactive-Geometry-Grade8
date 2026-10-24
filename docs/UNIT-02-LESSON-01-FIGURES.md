# Unit 2 · Lesson 1 — figure record (pages 31–33)

Every figure of «منتصفا ضلعين في المثلث» is a **platform drawing**
(`origin: 'authored'`, renderer `midline-figure`), and every one of them says so
in its caption:

> رسم تعليمي من إعداد المنصّة — الشكل تخطيطي غير مقيّس، والعلاقات المطبوعة فيه
> (المنتصفات والنظير والتوازي) محقَّقة بالحساب.

**Why all of them are authored.** Pages 31–33 print **no length and no angle
measure**. A redraw can therefore be faithful to the _relations_ of the printed
figure, but not to its _dimensions_; presenting it as a reproduction would claim
a scale the source never gives. So the platform chooses the triangle, says so,
and keeps `source` pointing at the page whose configuration it draws.

Coordinates live in `src/content/units/lesson-08-geometry.ts` and are re-measured
by `lesson-08-geometry.test.ts` (31 tests) — the same file that the interactive
lab reads at runtime, so the static figures and the lab cannot drift apart.

## Equality marks

A tick asserts equality, so ticks are drawn on the **two halves** of a bisected
side, never on a whole side, and different lengths get different counts:

| Tick count | Meaning in this lesson                          |
| ---------: | ----------------------------------------------- |
|          1 | `MN = NK` (`N` is the midpoint of `[MK]`)       |
|          2 | `AM = MB` (or `CB = BI`, `AB = BB′`, `AO = OB`) |
|          3 | `AN = NC` (or `AC = CC′`, `AM = ME`)            |

The page-33 figure of «تحقّق من فهمك» carries **no ticks at all**: it has five
midpoints, and one figure cannot carry five distinct counts without asserting
equalities the page never states. Its labels and the prompt carry that
information instead. This decision is asserted in `lesson-08-coverage.test.ts`.

## Figure-by-figure record

|   # | Diagram id                        |  Page | Configuration                                                                      | What is carried exactly                                                                             | Verified by                                 |
| --: | --------------------------------- | ----: | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------- |
|   1 | `fig-l8-activity-midline`         |    31 | triangle `ABC`, `M`, `N`, `[MN]`                                                   | `M`, `N` are the midpoints; `[MN]` joins them                                                       | `page 31 — M, N and K are built…`           |
|   2 | `fig-l8-proof-midline`            |    31 | + `K`, parallelogram `AMCK` (dashed), parallelogram `MBCK` (shaded)                | `N` midpoint of `[MK]`; `AMCK` and `MBCK` are parallelograms; `(MN) ∥ (BC)`; `MK = BC = 2 MN`       | `page 31 — … AMCK and MBCK parallelograms`  |
|   3 | `fig-l8-proof-midline-teaching`   |    31 | same configuration, drawn for the platform step                                    | same as #2                                                                                          | same test                                   |
|   4 | `fig-l8-theorem-midline`          |    32 | theorem figure with `M`, `N`                                                       | the midline relation                                                                                | `page 31 — … MN = BC / 2`                   |
|   5 | `fig-l8-example-midline`          |    32 | example: `I`, `J`                                                                  | `I`, `J` midpoints; `(IJ) ∥ (BC)`; `IJ = BC/2`                                                      | `page 32 — the worked example`              |
|   6 | `fig-l8-example-midline-teaching` |    32 | same example, drawn for the platform step                                          | same as #5                                                                                          | same test                                   |
|   7 | `fig-l8-knowledge-parallel`       | 32–33 | triangle `ACI`, `B` and `O` midpoints, `[OB]` dashed                               | `B` midpoint of `[CI]`; `O` midpoint of `[AC]`; `(OB) ∥ (AI)`; `OB = AI/2`                          | `page 32 & 33 — «كيف نثبت توازي مستقيمين؟»` |
|   8 | `fig-l8-check-midpoints`          |    33 | two triangles sharing `[AC]`, five midpoints                                       | all five midpoints; the four parallel pairs of items ①②③④; `(LN)` not collinear with `(JM)`         | `page 33 — «تحقّق من فهمك»`                 |
|   9 | `fig-l8-practice-semicircle`      |    33 | triangle `ABE`, `O` midpoint of `[AB]`, `M` midpoint of `[AE]`, right angle at `E` | `O` and `M` midpoints; `∠AEB = 90°` (diameter); `(OM) ∥ (BE)`; `OM = BE/2`                          | `page 33 — «تدرّب ①» the semicircle`        |
|  10 | `fig-l8-practice-symmetric`       |    33 | `ABC` with `B′`, `C′`                                                              | `B`, `C` midpoints of `[AB′]`, `[AC′]`; `(CB) ∥ (C′B′)`; `CB = C′B′/2`                              | `page 33 — «تدرّب ②»`                       |
|  11 | `fig-l8-practice-rectangle`       |    33 | rectangle `ABCD` with `E`, `F`, `G`, `H` and the diagonals                         | rectangle; four midpoints; `AC = BD = 6`; `EFGH` a rhombus of side 3 and perimeter 12, not a square | `page 33 — «تدرّب ③»`                       |

## Recorded limitation: no arcs

`FigureSpec` has **no arc or circle primitive** (it describes segments,
polygons, angles, points and texts). Therefore:

- the **semicircle** of «تدرّب ①» is not drawn; what is drawn is the triangle
  `ABE`, the diameter `[AB]` with its midpoint `O`, the midpoint `M` and the
  right angle at `E` (a consequence of `[AB]` being a diameter);
- the **circumscribed circle** of «تدرّب ③» is not drawn; what is drawn is the
  rectangle, its two diagonals (which are diameters), its centre and the four
  side-midpoints.

Both captions state that the arc/circle is not drawn, and both `alt` texts name
it. Adding a circle primitive to the shared figure contract was deliberately
**not** done: it is a shared-architecture change, it is not needed for any
relation the printed questions ask about, and this task was scoped to a lesson.

## Interactive lab

`auth-08-midline-explorer` (renderer `midline-explorer`) turns the page-31
observation into something a static figure cannot show: the apex `A` slides
between the three printed cases (acute → right → obtuse), and the read-out
recomputes `MN`, `BC`, `MN/BC`, the angle between the two lines and the angle at
`A` **from the live coordinates**.

- The right-angle position is exactly the height stored in `apex.rightAngleY`,
  so the badge turns «قائمة» at that point (±0.5°).
- The read-out says «وحدات الرسم» — never centimetres, because the page prints
  no measurement.
- A toggle draws `K` and the parallelogram `MBCK`, connecting the lab to the
  proof.
- `MidlineExplorer.test.tsx` drives the real slider and asserts the invariant:
  the ratio stays `0.50` and the angle stays `0.00°` at every height.
