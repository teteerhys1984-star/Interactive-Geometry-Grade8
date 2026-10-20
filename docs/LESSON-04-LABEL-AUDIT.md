# Lesson 4 — audit of lettering, label placement and figure scale

This document is the **pre-fix diagnosis** required before touching the drawings,
plus the record of what was changed and how it was verified. It covers the whole
lesson (pages 17–19), not just page 17 panel ②.

Sections 1–6 record the first revision (the one that replaced the
`min(viewBox.w, viewBox.h)` rule with a width-based scale and gave every label a
real, collision-checked position). **Section 7 records the second revision,
which set the vertex size at 16 px** and limited `labelScale` to measurements.
The measured tables in §4 and §6 have been updated in place to the numbers the
shipped tree produces, so every figure of this document describes the same
build.

Scope: `src/components/diagram/renderers/lesson4/**`, `src/lib/figureLayout.ts`,
`src/lib/figureTypography.ts`, `src/lib/geometryFigure.ts`,
`src/content/units/lesson-04-figures.ts`.

## 1. Inventory — every drawing the lesson renders

|   # | Diagram                      | Where                    | Window (`viewBox`) | Labels drawn                                                          |
| --: | ---------------------------- | ------------------------ | ------------------ | --------------------------------------------------------------------- |
|   1 | `fig-17-activity-cases`      | step «نشاط»              | 33.4 × 8.6         | 3 panels: A/B/C, N/M, values 3/4/2, angles 35°/85°, frame numbers ①②③ |
|   2 | `auth-04-translation-intro`  | step «نشاط»              | 9.4 × 5.0          | A/B/C + A′/B′/C′                                                      |
|   3 | `auth-04-definition-pair`    | step «تعريف»             | 10.6 × 5.6         | A/B/C + A′/B′/C′                                                      |
|   4 | `fig-18-example-sas`         | step «المثال الأول»      | 15.6 × 7.5         | A/B/E/M/F + values 5/7/5/7                                            |
|   5 | `fig-18-example-asa`         | step «المثال الثاني»     | 9.4 × 9.2          | A/B/C/D/E/F + two right angles                                        |
|   6 | `fig-18-example-sss`         | step «المثال الثالث»     | 9.4 × 4.6          | A/B/C/D                                                               |
|   7 | `fig-19-check-rectangle`     | «تحقّق من فهمك»          | 8.6 × 6.1          | A/B/C/D + 30°/30° + ticks                                             |
|   8 | `fig-19-kite`                | «تدرّب ①»                | 19.6 × 17.6        | A/B/C/D/E + 14.4/14.4/10/10/12/6/8/8                                  |
|   9 | `fig-19-pairs`               | «تدرّب ②»                | 32.7 × 7.9         | 3 panels, 20 value labels + 80°/44°/82°                               |
|  10 | `fig-19-isosceles`           | «تدرّب ③»                | 10.4 × 9.2         | A/B/C/M/E/F + ticks                                                   |
|  11 | `auth-04-cases-lab`          | lab (3 stages × 3 cases) | 11.8 × 8.8         | A/B/C, N/M, values, angles, A′/B′/C′ at stage 3                       |
|  12 | `auth-04-practice-pairs-lab` | lab                      | figure 9           | as #9                                                                 |
|  13 | `auth-04-kite-lab`           | lab                      | figure 8           | as #8                                                                 |
|  14 | `auth-04-proof-lab`          | lab                      | figure 10          | as #10                                                                |
|  15 | `auth-04-teacher-activity`   | Teacher Area             | 11.8 × 8.8         | A/B/C + A′/B′/C′ + values                                             |
|  16 | `auth-04-teacher-check`      | Teacher Area             | 8.6 × 6.1          | A/B/C/D                                                               |
|  17 | `auth-04-teacher-kite`       | Teacher Area             | 19.6 × 17.6        | A/B/C/D/E + 6/8                                                       |
|  18 | `auth-04-teacher-isosceles`  | Teacher Area             | 10.4 × 9.2         | A/B/C/M/E/F + ME/MF                                                   |

All 18 drawings go through exactly one component: `lesson4/FigureSvg.tsx`
(rendered by `congruence-figure` and by the four labs). No other lesson imports
it, so the shared surface is **this lesson only**.

## 2. Root cause

`FigureSvg` derived every graphic size from one number:

```ts
const unit = Math.min(viewBox.w, viewBox.h);
const fontSize = Math.max(unit * 0.06, 0.2);
const stroke = Math.max(unit * 0.007, 0.012);
const arcRadius = unit * 0.1;
const tick = unit * 0.05;
```

The figure is laid out by its **width** (it is `inline-size: 100%`), so the
on-screen size of a glyph is `fontSize × (renderedWidth / viewBox.w)`. Taking
`fontSize` from `min(w, h)` makes that ratio depend on each window's aspect
ratio, which differs by a factor of four across the lesson. Measured at the
reference desktop figure width (750 px):

| Diagram                  | `viewBox`   | letter A on screen | stroke | vertex dot |
| ------------------------ | ----------- | -----------------: | -----: | ---------: |
| `fig-19-pairs`           | 32.7 × 7.9  |        **10.9 px** | 1.3 px |     2.5 px |
| `fig-17-activity-cases`  | 33.4 × 8.6  |        **11.6 px** | 1.4 px |     2.7 px |
| `fig-18-example-sas`     | 15.6 × 7.5  |            21.6 px | 2.5 px |     5.0 px |
| `fig-18-example-sss`     | 9.4 × 4.6   |            22.0 px | 2.6 px |     5.1 px |
| `fig-19-check-rectangle` | 8.6 × 6.1   |            31.9 px | 3.7 px |     7.4 px |
| `fig-19-isosceles`       | 10.4 × 9.2  |            39.8 px | 4.6 px |     9.3 px |
| `fig-19-kite`            | 19.6 × 17.6 |        **40.4 px** | 4.7 px |     9.4 px |
| `fig-18-example-asa`     | 9.4 × 9.2   |        **44.0 px** | 5.1 px |    10.3 px |
| labs (all four)          | 11.8 × 8.8  |            33.6 px | 3.9 px |     7.8 px |

Body text on the page is `1.03rem ≈ 16.5 px`. So one lesson simultaneously
shows letters at 0.66× and 2.7× the prose size, with lines 1.3 px and 5.1 px
thick, and equality ticks 9 px and 37 px long. `fig19-kite` is the worst case:
its 40 px letters are wider than the 6-unit side they sit next to.

Three consequences, all visible in the lesson:

1. **Letters disproportionate to the drawing** — the `min(w, h)` rule plus
   `max-block-size: 30rem` on `.stage` (a height cap that silently rescales a
   tall figure inside a full-width box, adding empty side margins).
2. **Labels on top of the ink** — the offset from a vertex was
   `0.62 × fontSize`, i.e. about half a glyph. Every letter therefore overlapped
   its own vertex dot, and any letter on the _inward_ side sat on a side:
   `M` in example ① on the median `AM`, `D` on `[FC]` and `B` on `[EA]` in
   example ②, `E`/`F` on the legs in the isosceles proof, `A′` under the
   translation arrow in the intro figure. The white halo (`0.06em`) was far too
   thin to separate a label from a 5 px stroke, so the stroke ran straight
   through the glyph.
3. **Values and angle marks colliding** — measurement offsets were hard constants
   (`0.5`, `0.55`, `0.6` drawing units) chosen when letters were 0.3 units tall;
   angle labels sat at a fixed `1.55 × arcRadius`. With a 44 px glyph those
   offsets are inside the glyph, so `35°`/`85°` in panel ②, `8`/`12` at the
   kite centre, and the `2`/`3`/`2.6` triples in «تدرّب ②» touched the sides,
   the ticks and each other.

No `preserveAspectRatio` distortion is involved, and the coordinates themselves
are correct (the geometry suite re-measures them). Within the component, the
defect is in the **typographic scale and the label anchor model**.

> **Correction (revision 3 — see §8).** An earlier version of this paragraph
> also claimed that _"no `font-size` rule in CSS overrides the SVG"_. **That was
> false**, and it is the reason the first two revisions produced no visible
> change on the published site. One unscoped rule in another component's
> stylesheet — `text { … font-size: 5px }` in
> `UnitExerciseFigure.module.css` — reached the shared bundle unhashed and
> outranked the `font-size` presentation attribute that `FigureSvg` writes.
> Every label in the lesson therefore painted at 5 user units whatever
> `figureTypography` returned. The measurements in §4, §6 and §7 describe the
> layout model correctly, but they describe the _intended_ size, not the size
> that was on screen. §8 records the cause, the fix and the new guard.

## 3. Fix

See sections 4–6 for results; the change itself:

- `src/lib/figureTypography.ts` — sizes derived from the **window width**
  (which is what maps to the container), expressed against one reference
  width, with separate sizes for vertices, measurements, angle values and frame
  numbers, plus line weight, dot radius, tick length and arc radius. Optional
  per-figure `labelScale` for a figure that genuinely needs its own scale.
- `src/lib/figureLayout.ts` — real label placement: every label gets a box from
  its measured text, the box is placed outside the vertex along the preferred
  direction, and a deterministic search (directions ordered by deviation,
  increasing distance) guarantees it clears every segment, every polygon edge,
  every frame edge and every other label, and stays inside the window. An
  angle's value is placed from the **arc it annotates** — inside the mouth
  first, beside the arc second, never adrift from the vertex — and the arc's
  own obstacle is taken at the radius that is actually drawn (per-angle
  `radius`, capped by the shared default) so a label cannot be pushed aside by
  an arc that is not on the paper.
- `FigureSvg.tsx` — uses both, draws with the new weights, wider halo.
- `lesson-04-figures.ts` — measurement offsets expressed in _label heights_
  instead of drawing units; vertex placement corrected where the intended
  direction ran into a side.
- `figure.module.css` — height cap removed (width alone drives the scale).

## 4. Result — one scale instead of nine

Measured on the layout the renderer computes, at the 750 px reference width
(the lesson article's inner width on a laptop):

| Diagram                            | window      | vertex letter |   value | stroke | labels placed | crowded |
| ---------------------------------- | ----------- | ------------: | ------: | -----: | ------------: | ------: |
| `fig-17-activity-cases`            | 33.4 × 8.6  |       16.0 px | 15.5 px | 2.1 px |            23 |       0 |
| `fig-18-example-sas`               | 15.6 × 7.5  |       16.0 px | 15.5 px | 2.1 px |             9 |       0 |
| `fig-18-example-asa`               | 9.4 × 9.2   |       16.0 px | 15.5 px | 2.1 px |             6 |       0 |
| `fig-18-example-sss`               | 9.4 × 4.6   |       16.0 px | 15.5 px | 2.1 px |             4 |       0 |
| `fig-19-check-rectangle`           | 8.6 × 6.1   |       16.0 px | 15.5 px | 2.1 px |             6 |       0 |
| `fig-19-kite`                      | 19.6 × 17.6 |       16.0 px | 15.5 px | 2.1 px |            13 |       0 |
| `fig-19-pairs`                     | 32.7 × 7.9  |       16.0 px | 12.7 px | 2.1 px |            18 |       0 |
| `fig-19-isosceles`                 | 10.4 × 9.2  |       16.0 px | 15.5 px | 2.1 px |             6 |       0 |
| `auth-04-translation-intro`        | 9.4 × 5.0   |       16.0 px | 15.5 px | 2.1 px |             6 |       0 |
| `auth-04-definition-pair`          | 10.6 × 5.6  |       16.0 px | 15.5 px | 2.1 px |             6 |       0 |
| lab (all three cases, both stages) | 10.4 × 6.6  |       16.0 px | 15.5 px | 2.1 px |             — |       0 |
| 4 teacher figures                  | 8.6 … 19.6  |       16.0 px | 15.5 px | 2.1 px |         4 … 8 |       0 |

Body prose is ≈ 16.5 px, so a vertex letter is now the size of the prose it
illustrates (16 px), while still being a little larger than the values printed
inside the drawing (15.5 px). The weight, not a large size difference, is what
separates a name from a measurement. The one exception is `fig-19-pairs`, whose
three-panel window gives each triangle a third of the width: it declares
`labelScale: 0.82`, which shrinks its **values** to 12.7 px and leaves its
vertex names — it draws none — alone. That is the one deliberate per-figure
decision; §7 records the renders that show why it is still needed.

The four teacher-only figures were re-measured in the same run and behave
identically; their numbers are in the table above.

Three further changes follow from the same principle:

- **The height cap is gone.** `max-block-size: 30rem` used to rescale any tall
  figure inside its full-width box, which both shrank its lettering and left
  side margins. The figure is now sized by width alone, like every other
  responsive SVG on the page.
- **The halo is real.** Label stroke went from `0.06em` (≈ 1 px at the old
  sizes) to `0.16em`, i.e. wider than the 2.1 px side stroke. A letter that
  has to sit near a line now reads instead of being cut by it.
- **Vertex letters are semi-bold, values are not.** `A`, `B′`… carry weight 600,
  so a name is distinguishable from a measurement of the same size at a glance.

## 5. What each figure needed beyond the shared fix

The shared component fixed the class of defect. Six figures also needed their
own data corrected, because a label anchored at the wrong place cannot be
rescued by any amount of collision avoidance:

| Figure                          | Defect                                                                                                                                                                                         | Fix                                                                                                                                                                                                                                                                                          |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fig-18-example-sas`            | `M` sat on the median `[AM]`; values were 0.5-unit offsets from the old scale                                                                                                                  | `M` now placed north of its vertex, clear of `[AE]` and `[AM]`; each value declared on its own side, direction away from its triangle                                                                                                                                                        |
| `fig-18-example-asa`            | `D` on `[FC]`, `B` on `[EA]` (labels pointing into the rectangle's sides)                                                                                                                      | both moved east/west outside the rectangle, off their sides                                                                                                                                                                                                                                  |
| `fig-19-kite`                   | `12`, `8`, `6`, `8` crowded against the two diagonals at the crossing `E`; 40 px letters                                                                                                       | each value keeps its own side of the crossing, so `12`/`6` and `8`/`8` can never be confused; letters at 16 px                                                                                                                                                                               |
| `fig-19-pairs`                  | `80°`/`44°`/`82°` placed from the centroid (outside the triangle, next to a side value); the shared 18 px arc radius was as wide as the triangle's waist, so no value could sit beside its arc | angle values now belong to their **arcs** in the data (`FigureAngle.label`); the arcs of this figure declare a radius in the panel's own units (`0.5`, ≈ 11 px on screen), and every value now sits **inside** its own mouth (panel ② `80°` at the incentre, 1.2 units from the side values) |
| `fig-17-activity-cases` panel ② | `35°`/`85°` overlapped the `3` and each other                                                                                                                                                  | angle values follow their arcs; `3` moved to the outer side of `[AC]`                                                                                                                                                                                                                        |
| activity lab                    | window was 11.8 × 8.8 for content spanning 2.4 … 10.4 — the drawing floated in empty space and was ~30 % smaller than it needed to be                                                          | window fitted to the activity's own coordinates (10.4 × 6.6), identical at every stage so switching stages never rescales the figure                                                                                                                                                         |

## 6. Verification

### Automated

| Check            | Command             | Result                    |
| ---------------- | ------------------- | ------------------------- |
| TypeScript       | `npm run typecheck` | pass                      |
| ESLint           | `npm run lint`      | pass                      |
| Full suite       | `npm test`          | 39 files, 630 tests, pass |
| Production build | `npm run build`     | pass                      |
| Combined         | `npm run verify`    | pass                      |

New invariants, in `src/components/diagram/renderers/lesson4/lesson4-typography.test.tsx`
(111 tests). They run against the layout the renderer really computes, for all
18 drawings:

1. every figure's vertex letter is within 0.5 px of the lesson's one design
   size — 16 px, pinned by a test — whatever the figure's aspect ratio and
   whatever its own `labelScale` says about its values;
2. the four roles stay ordered — vertex > value > frame — and at least three
   distinct font sizes are emitted per lesson, i.e. the "one size for
   everything" regression cannot come back silently; a `labelScale` may shrink
   measure / angle / frame, never vertex;
3. no label box touches a side, a polygon edge, an arc, an equality tick, a
   frame border or another label (0 toleranced pixels of ink);
4. no label leaves its own panel;
5. a vertex letter never drifts more than two glyph heights from its vertex;
6. the six originally-broken placements are asserted by name — `M` off `[AM]`,
   `D` off `[FC]`, `B` off `[EA]`, `E`/`F` off the isosceles legs, `A′` off the
   translation arrow, and the kite's letters smaller than a sixth of its
   shortest side.

### Visual

The drawings were rendered to standalone SVG through the real `FigureSvg`
(React SSR), with the real CSS module resolved into the markup and the `--fig-*`
custom properties flattened to their palette values, then rasterised with
`@resvg/resvg-js` (installed with `npm i --no-save`; neither the dependency nor
the harness is committed). All 14 static drawings were rasterised, plus the lab
in all three cases at all three stages (9 panels). The comparison images are
committed under `docs/assets/lesson-04/`:

- `docs/assets/lesson-04/*.png` — six before/after pairs from the **first**
  revision (before: the `min(w, h)` scale; after: 19 px). Kept as history; the
  «AFTER» column there is not the current build.
- `docs/assets/lesson-04/vertex-16/` — the **current** comparison, described in
  §7: all 14 figures side by side (before = `main` @ `10b2c19`, vertex 19 px;
  after = this branch, vertex 16 px) at 750 px, two three-width sheets
  (750 / 799 / 1 000 px), and the nine lab panels before and after.

**Limits of that check — stated, not glossed:**

- **No browser was available in this environment.** There is no Chromium,
  Firefox or WebKit binary in the sandbox, and installing one is blocked: the
  Playwright CLI itself installs from the npm registry, but its browser
  download (`npx playwright install chromium`) fails at the network policy, and
  `apt` is not reachable either. So no real page was rendered: no layout
  engine, no font shaping, no RTL flow, no dark mode, no mobile width. The
  checks below are a faithful offline raster, not a browser session.
- The raster used **DejaVu Sans** as a stand-in. The real stack is
  `Noto Naskh Arabic, Amiri, Segoe UI, Tahoma`; glyph metrics differ slightly,
  and the width estimates in `figureTypography` are per-character ratios rather
  than measurements. The placement has margin for that (labels are placed with
  a consistently generous box), but a browser pass remains the only way to see
  the final rendering.
- Consequently: **no claim is made that the lesson was inspected in a browser.**
  What is verified is the geometry, the type scale, the computed label boxes and
  a faithful offline raster of every figure.

### Recommended follow-up (needs a browser)

1. Open the lesson at 1 366 × 768 and at 375 × 812 and step through pages
   17–19, including panel ② of the activity and every stage of «مختبر الحالات».
2. Check the three-panel «تدرّب ②» figure at the narrowest breakpoint: its
   values are the smallest in the lesson by design (`labelScale: 0.82`).
3. Check dark mode. This is a pre-existing, separate issue and was left out of
   scope on purpose: the figure palette is fixed (`--fig-ink: #263248`, set in
   `figure.module.css`), while `FigureFrame`'s canvas follows
   `var(--color-surface-alt)`, which turns dark under
   `prefers-color-scheme: dark`. Dark ink on a dark canvas is a contrast problem
   that predates this PR and needs its own palette decision (per-theme ink
   tokens), not a font-size fix. The label halo is likewise the paper colour
   (`#fffdf7`).

---

## 7. The 16 px revision — vertex names set at the size of the prose

The first revision fixed the _class_ of the defect: one width-based scale, and
labels that are actually placed instead of nudged. It left one number
unsettled — how big a name should be. It chose 19 px, i.e. 2.5 px larger than
the body text around it (`1.03rem ≈ 16.5 px`), and it applied every figure's
`labelScale` to names as well as to values, so the three-panel «تدرّب ②» drew
its names at 15.6 px — below the page's own body size — and, had that base been
16 px instead, would have drawn them at 13.1 px, four tenths of a pixel from
the 12.7 px values they label.

This revision settles it.

### 7.1 The change

| Item                                    | Before                        | After                          |
| --------------------------------------- | ----------------------------- | ------------------------------ |
| `TYPOGRAPHY_PX.vertex`                  | 19 px                         | **16 px**                      |
| `TYPOGRAPHY_PX.measure / angle / frame` | 15.5 / 15 / 14 px             | unchanged                      |
| `labelScale` applies to                 | all four roles                | **measure, angle, frame only** |
| `fig-19-pairs` (`labelScale: 0.82`)     | names 15.6 px, values 12.7 px | names 16 px, values 12.7 px    |

Nothing else moved: no coordinate, no arc radius, no stroke weight, no tick, no
label rule, no window. `FigureSvg`, `figureLayout` and the lesson's geometry are
untouched. The only sources changed are one type-size constant, the
role-scoping of `labelScale`, and the comments and tests that document it.

### 7.2 Why 16 px

1. **It is the page's own body size.** `1rem = 16px`; the prose around the
   figure sits at ≈ 16.5 px. A name now reads at the size of the sentence it
   belongs to, and the semi-bold weight (600) is what distinguishes it.
2. **The hierarchy survives on weight, not on size.** A value at 15.5 px under
   a name at 16 px is _just_ quieter, which is the correct relationship: the
   name labels, the value measures. At 19 px the difference was 23 % (19 vs
   15.5 px) — a name noticeably larger than the values it labels and 15 %
   larger than the prose — which reads as emphasis rather than as a label.
3. **It removes the second knob.** Previously `labelScale` moved both names
   and values, so asking for slightly smaller values in a dense figure also
   made its names smaller than the rest of the lesson's. With the scale limited
   to measurements, every name is 16 px and a dense figure can still print
   smaller _values_ (12.7 px in «تدرّب ②») without its names drifting away from
   the lesson's scale. The name/value separation is then a genuine 16 / 12.7 =
   1.26 ratio instead of the 13.1 / 12.7 = 1.03 the unscoped scale would have
   produced.

### 7.3 Does `labelScale: 0.82` on `fig-19-pairs` stay? Yes — and here is the evidence

Both variants were rasterised at 750, 799 and 1 000 px through the real
component, and the computed label boxes were measured as well:

| `fig-19-pairs`                 | smallest label↔label gap px (750 / 799 / 1000) | smallest label↔ink gap px |
| ------------------------------ | ---------------------------------------------- | ------------------------- |
| with `labelScale: 0.82` (kept) | **9.4 / 10.0 / 12.6**                          | 2.8 / 3.0 / 3.7           |
| without it (removed)           | **0.0 / 0.0 / 0.0**                            | 2.5 / 2.6 / 3.3           |

Without the override the `80°` of panel ② is pushed out of its own mouth and
lands on the `2` printed under the shared side — visible in the render, and
measured as a zero gap at every width. The override was therefore **kept**, but
it now applies only to the measurements: this figure draws no vertex letters,
so no name is shrunk by it, and a future one never would be. The tests
pin both halves: `labelScale` leaves the vertex role alone, and this figure
without its override produces a zero gap while with it the gap stays above
4 px.

### 7.4 Measurements after the change

Every drawing below was rasterised through the real `FigureSvg` at the three
widths. «ink» is the smallest distance from a label box to any line, arc, tick or
frame edge; «label gap» the smallest distance between two label boxes; both in
screen pixels. 207 labels in total, **0 crowded, 0 outside their panel**.

| Drawing                     | window      | vertex px (750 / 799 / 1000) | values at 750 |     labels | ink px (750 / 799 / 1000) | label gap px          | crowded |
| --------------------------- | ----------- | ---------------------------- | ------------- | ---------: | ------------------------- | --------------------- | ------: |
| `fig-17-activity-cases`     | 33.4 × 8.6  | 16.00 / 17.05 / 21.33        | 15.5 px       |         23 | 3.8 / 4.0 / 5.0           | 8.3 / 8.9 / 11.1      |       0 |
| `auth-04-translation-intro` | 9.4 × 5.0   | 16.00 / 17.05 / 21.33        | 15.5 px       |          6 | 7.4 / 7.8 / 9.8           | 96.6 / 102.9 / 128.8  |       0 |
| `auth-04-definition-pair`   | 10.6 × 5.6  | 16.00 / 17.05 / 21.33        | 15.5 px       |          6 | 7.4 / 7.8 / 9.8           | 154.7 / 164.8 / 206.3 |       0 |
| `fig-18-example-sas`        | 15.6 × 7.5  | 16.00 / 17.05 / 21.33        | 15.5 px       |          9 | 3.7 / 3.9 / 4.9           | 87.9 / 93.7 / 117.2   |       0 |
| `fig-18-example-asa`        | 9.4 × 9.2   | 16.00 / 17.05 / 21.33        | 15.5 px       |          6 | 7.4 / 7.8 / 9.8           | 186.5 / 198.6 / 248.6 |       0 |
| `fig-18-example-sss`        | 9.4 × 4.6   | 16.00 / 17.05 / 21.33        | 15.5 px       |          4 | 7.7 / 8.2 / 10.3          | 269.5 / 287.1 / 359.4 |       0 |
| `fig-19-check-rectangle`    | 8.6 × 6.1   | 16.00 / 17.05 / 21.33        | 15.5 px       |          6 | 3.3 / 3.5 / 4.4           | 57.2 / 60.9 / 76.2    |       0 |
| `fig-19-kite`               | 19.6 × 17.6 | 16.00 / 17.05 / 21.33        | 15.5 px       |         13 | 3.6 / 3.8 / 4.8           | 83.5 / 89.0 / 111.4   |       0 |
| `fig-19-pairs`              | 32.7 × 7.9  | 16.00 / 17.05 / 21.33        | 12.7 px       |         18 | 2.8 / 3.0 / 3.7           | **9.4** / 10.0 / 12.6 |       0 |
| `fig-19-isosceles`          | 10.4 × 9.2  | 16.00 / 17.05 / 21.33        | 15.5 px       |          6 | 7.4 / 7.8 / 9.8           | 142.7 / 152.0 / 190.2 |       0 |
| `auth-04-teacher-activity`  | 10.4 × 6.6  | 16.00 / 17.05 / 21.33        | 15.5 px       |         11 | 3.8 / 4.0 / 5.0           | 36.3 / 38.7 / 48.4    |       0 |
| `auth-04-teacher-check`     | 8.6 × 6.1   | 16.00 / 17.05 / 21.33        | 15.5 px       |          4 | 7.7 / 8.2 / 10.3          | 309.3 / 329.5 / 412.4 |       0 |
| `auth-04-teacher-kite`      | 19.6 × 17.6 | 16.00 / 17.05 / 21.33        | 15.5 px       |          7 | 3.9 / 4.2 / 5.2           | 83.5 / 89.0 / 111.4   |       0 |
| `auth-04-teacher-isosceles` | 10.4 × 9.2  | 16.00 / 17.05 / 21.33        | 15.5 px       |          8 | 3.7 / 4.0 / 5.0           | 113.6 / 121.0 / 151.4 |       0 |
| lab SAS, stages 0 / 1 / 2   | 10.4 × 6.6  | 16.00 / 17.05 / 21.33        | 15.5 px       | 8 / 8 / 11 | 3.8 / 4.0 / 5.0           | 36.3 / 38.7 / 48.4    |       0 |
| lab ASA, stages 0 / 1 / 2   | 10.4 × 6.6  | 16.00 / 17.05 / 21.33        | 15.5 px       | 7 / 8 / 11 | 3.9 / 4.1 / 5.2           | 30.5 / 32.5 / 40.6    |       0 |
| lab SSS, stages 0 / 1 / 2   | 10.4 × 6.6  | 16.00 / 17.05 / 21.33        | 15.5 px       | 8 / 8 / 11 | 3.9 / 4.1 / 5.2           | 62.6 / 66.7 / 83.5    |       0 |

The three widths scale in proportion (`16 × width / 750`), which is what the
width-based rule promises: 16.00 → 17.05 → 21.33 px. Every clearance grows
with the width, and no figure becomes crowded at any of the three.

### 7.5 Comparison images

`docs/assets/lesson-04/vertex-16/` (18 files, ≈ 1.4 MB):

| File                                                                     | Content                                                                                                                                  |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `fig-17-activity-cases.png` … `auth-04-teacher-isosceles.png` (14 files) | Each static drawing side by side: **before** = `main` @ `10b2c19` (vertex 19 px), **after** = this branch (vertex 16 px), both at 750 px |
| `fig-19-pairs-widths.png`, `fig-17-activity-cases-widths.png`            | The densest and the widest figure at 750, 799 and 1 000 px, before above and after below                                                 |
| `cases-lab-before-750.png`, `cases-lab-after-750.png`                    | The nine «مختبر الحالات» panels (3 cases × 3 stages) at 750 px, before and after                                                         |

### 7.6 Verification of this revision

| Check            | Command             | Result                        |
| ---------------- | ------------------- | ----------------------------- |
| TypeScript       | `npm run typecheck` | pass                          |
| ESLint           | `npm run lint`      | pass                          |
| Full suite       | `npm test`          | 39 files, **630 tests**, pass |
| Lesson 4 suite   | see below           | 6 files, **288 tests**, pass  |
| Production build | `npm run build`     | pass                          |
| Combined         | `npm run verify`    | pass                          |

The separate Lesson 4 run is the lesson's own regression set, beside the
whole-repo `npm test`:

```bash
npx vitest run \
  src/components/diagram/renderers/lesson4 \
  src/content/units/lesson-04-geometry.test.ts \
  src/content/units/lesson-04-coverage.test.ts \
  src/content/sourceFidelity.test.ts
```

### 7.7 Limits — stated, not glossed

- **No browser was used.** There is no Chromium, Firefox or WebKit in this
  environment and the network policy blocks downloading one (and blocks `apt`).
  Nothing here is a browser session: no layout engine, no font shaping, no RTL
  flow, no dark mode, no mobile width. The rasters come from `resvg`, a
  faithful SVG renderer, but not a browser.
- **DejaVu Sans is a stand-in.** The page stack is
  `Noto Naskh Arabic, Amiri, Segoe UI, Tahoma`. The label boxes are estimated
  from per-character width ratios, not from the real font's metrics, so a glyph
  may be a little wider or narrower on the page than in these images. The
  placement keeps a margin for that, and the 9.4 px minimum gap in
  `fig-19-pairs` is the tightest in the lesson — that is the figure to look at
  first in a real browser.
- **The widths are the figure's own width, not the viewport.** 750 px is the
  lesson article's inner width on a laptop; 799 px is the next breakpoint's
  content width; 1 000 px is a wide desktop. The figures are `inline-size: 100%`,
  so any other width is the same layout scaled, which is exactly what the
  three-width sheets show.
- **Consequently: no claim is made that the lesson was inspected in a browser.**
  What is verified is the geometry, the type scale, the computed label boxes at
  three widths and an offline raster of every drawing.

## 8. Revision 3 — the stylesheet that was repainting every label

Revisions 1 and 2 (§3–§7) fixed the type scale _inside_ the renderer. Neither
changed what the published site showed. This section records why, and what was
done about it.

### 8.1 What was actually on screen

`FigureSvg` writes its size as an **SVG presentation attribute**:

```tsx
<text … fontSize={label.fontSize} …>       // FigureSvg.tsx
```

A presentation attribute is the weakest declaration in the author origin. One
rule in a _different_ component's stylesheet was tripping over it:

```css
/* src/components/diagram/renderers/UnitExerciseFigure.module.css */
text {
  fill: var(--color-text);
  font-family: serif;
  font-size: 5px;
}
```

CSS Modules hash classes and ids; they do **not** hash a bare type selector. That
rule was therefore emitted verbatim into the shared bundle
(`dist/assets/index-*.css`) and matched every `<text>` in the application — every
Lesson 4 figure, every lab stage, and the teacher diagrams. The letters were
correct in the markup and 5 user units tall on screen.

At the article's figure width (≈ 776 px on a laptop), that is:

| drawing                        | `viewBox.w` | declared | painted  |
| ------------------------------ | ----------- | -------- | -------- |
| `fig-19-check-rectangle`       | 8.6         | 16 px    | ≈ 451 px |
| `fig-18-example-asa` / `-sss`  | 9.4         | 16 px    | ≈ 413 px |
| `auth-04-translation-intro`    | 9.4         | 16 px    | ≈ 413 px |
| `fig-19-isosceles`, lab panels | 10.4        | 16 px    | ≈ 373 px |
| `auth-04-definition-pair`      | 10.6        | 16 px    | ≈ 366 px |
| `fig-18-example-sas`           | 15.6        | 16 px    | ≈ 249 px |
| `fig-19-kite`                  | 19.6        | 16 px    | ≈ 198 px |
| `fig-17-activity-cases`        | 33.4        | 16 px    | ≈ 116 px |
| `fig-19-pairs`                 | 32.7        | 16 px    | ≈ 119 px |

The last row is why «تدرّب ②» looked _least_ broken: a wide three-panel window
scales a 5-unit glyph down to about 119 px, while a single tall figure scales it
up to 450 px. One rule, wildly different damage per figure — which is also why
the earlier revisions kept chasing per-figure proportions.

`stroke-width: 0.16em` on `.label` resolved against those 5 units too (0.8 u), so
the white halo that was supposed to separate a letter from a 3 px side became
thinner than the side: the strokes ran through the glyphs.

### 8.2 Why CI stayed green

- `vite.config.ts` runs the suite with `css: false`. **No stylesheet is ever
  loaded in a test.**
- `lesson4-typography.test.tsx` reads `getAttribute('font-size')` — the exact
  value the cascade was discarding. It asserted the declaration, not the paint.
- The comparison images in §6 and §7 were produced by an uncommitted harness that
  resolved only `lesson4/figure.module.css`; the application stylesheet was not
  in the picture, so the leak could not appear in it.

The earlier claim in §2 that "no `font-size` rule in CSS overrides the SVG" was
therefore wrong, and it was load-bearing. It is corrected there.

### 8.3 The fix

1. **`UnitExerciseFigure.module.css`** — `text { … }` → `.wrap text { … }`.
   `.wrap` is the div this component already draws around its `<svg>`, so the
   matching set is unchanged and Lesson 5 renders exactly as before.
2. **`FigureSvg.tsx`** — each label now also carries the same size as an inline
   `style={{ fontSize: … }}`. The attribute stays (layout maths and the
   typography suite read it, and it is the no-CSS fallback), but the inline
   style is the one declaration no stylesheet can outrank, so the size the
   component computes is the size that paints — whatever any future stylesheet
   says about `<text>`.
3. **`lesson4-cascade.test.tsx`** — a guard that installs the application's real
   stylesheets (read from disk, with Vite's hashed class names) and asserts, for
   all 14 constructed figures and all 9 lab panels (3 cases × 3 stages), that
   the **computed** `font-size` equals the declared one. Plus a static check that
   no CSS Module ships an unscoped `text` rule, and two anchors that Lesson 5 is
   still 5 px and Lesson 1 still 16 px.

On the unmodified baseline that guard reports **17 failed / 3 passed**, naming
`UnitExerciseFigure.module.css: text` and lines such as
`«A» declared 0.183px but painted 5.000px`. After the fix: **20 passed**.

### 8.4 Result at the 750 px reference width

Every drawing, rasterised from the real rendered markup with the whole
application stylesheet applied, before (bare `text` rule) and after (scoped rule
plus inline size). `docs/assets/lesson-04/cascade-fix/` holds eight before/after
sheets (red = before, teal = after).

| drawing                            | viewBox     | labels | before    | after      |
| ---------------------------------- | ----------- | ------ | --------- | ---------- |
| `auth-04-definition-pair`          | 10.6 × 5.6  | 6      | 353.8 px  | 16 px      |
| `auth-04-teacher-activity`         | 10.4 × 6.6  | 11     | 360.6 px  | 15–16 px   |
| `auth-04-teacher-check`            | 8.6 × 6.1   | 4      | 436.0 px  | 16 px      |
| `auth-04-teacher-isosceles`        | 10.4 × 9.2  | 8      | 360.6 px  | 15.5–16 px |
| `auth-04-teacher-kite`             | 19.6 × 17.6 | 7      | 191.3 px  | 15.5–16 px |
| `auth-04-translation-intro`        | 9.4 × 5.0   | 6      | 398.9 px  | 16 px      |
| `fig-17-activity-cases`            | 33.4 × 8.6  | 26     | 112.3 px  | 14–16 px   |
| `fig-18-example-asa`               | 9.4 × 9.2   | 6      | 398.9 px  | 16 px      |
| `fig-18-example-sas`               | 15.6 × 7.5  | 9      | 240.4 px  | 15.5–16 px |
| `fig-18-example-sss`               | 9.4 × 4.6   | 4      | 398.9 px  | 16 px      |
| `fig-19-check-rectangle`           | 8.6 × 6.1   | 6      | 436.0 px  | 15–16 px   |
| `fig-19-isosceles`                 | 10.4 × 9.2  | 6      | 360.6 px  | 16 px      |
| `fig-19-kite`                      | 19.6 × 17.6 | 13     | 191.3 px  | 15.5–16 px |
| `fig-19-pairs`                     | 32.7 × 7.9  | 21     | 114.7 px  | 12.7 px    |
| lab 1–1 … 3–3 (9 panels)           | 10.4 × 6.6  | 7–11   | 360.6 px  | 15–16 px   |
| `lesson1-lab` (Lesson 1)           | 600 × 330   | —      | unchanged | unchanged  |
| `lesson5-unit-exercise` (Lesson 5) | 120 × 48    | —      | unchanged | unchanged  |

A range such as 15–16 px is the roles of one figure: a vertex at 16 px, a value
at 15.5, an angle value at 15, a panel number at 14. The lesson now paints four
sizes instead of one accidental 5. `fig-19-pairs` is the single figure with a
`labelScale` (0.82, measurements only), so its values paint at 12.7 px while its
vertex names stay at 16 px — the behaviour §7.3 defends.

Confirmed in the emitted bundle: the only `text` selectors left are
`._svg_1gxka_10 text` (Lesson 1) and `._wrap_1b4vf_1 text` (Lesson 5, scoped).
There is no bare `text` rule, and no Lesson 4 rule declares `font-size` at all.

### 8.5 Limits of this revision

- **Still no browser.** Nothing here is a browser session: no layout engine, no
  font shaping, no RTL flow, no dark mode, no mobile width. The rasters come from
  `resvg` fed the real markup and the real stylesheet — which is enough to prove
  _which rule wins_, and is what the previous two revisions lacked, but it is not
  the page.
- The rasters substitute **DejaVu Sans** for `Noto Naskh Arabic, Amiri, Segoe UI,
Tahoma`, and flatten `var(--token)` to values (resvg does not inherit the
  page's `:root` into a bare SVG fragment). Colours and letter widths therefore
  approximate the page; the _sizes_ — the subject of this revision — are exact.
- The cascade itself is not an approximation. "Presentation attribute < author
  CSS" and "inline style > author CSS" are specified behaviour, and the guard
  asserts the computed value through the DOM rather than trusting the reading.
- **The published site could not be reached from this environment** (`*.github.io`
  and the Pages artefact host are outside the network policy). The deployed
  commit was rebuilt locally with the same CI commands and its bundle inspected
  instead.
