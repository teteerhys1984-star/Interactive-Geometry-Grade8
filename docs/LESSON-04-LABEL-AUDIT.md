# Lesson 4 — audit of lettering, label placement and figure scale

This document is the **pre-fix diagnosis** required before touching the drawings,
plus the record of what was changed and how it was verified. It covers the whole
lesson (pages 17–19), not just page 17 panel ②.

Scope: `src/components/diagram/renderers/lesson4/**`,
`src/lib/geometryFigure.ts`, `src/content/units/lesson-04-figures.ts`.

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

No `font-size` rule in CSS overrides the SVG, no `preserveAspectRatio`
distortion is involved, and the coordinates themselves are correct (the
geometry suite re-measures them). The defect is purely in the **typographic
scale and the label anchor model** of the one shared drawing component.

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
| `fig-17-activity-cases`            | 33.4 × 8.6  |       19.0 px | 15.5 px | 2.1 px |            23 |       0 |
| `fig-18-example-sas`               | 15.6 × 7.5  |       19.0 px | 15.5 px | 2.1 px |             9 |       0 |
| `fig-18-example-asa`               | 9.4 × 9.2   |       19.0 px | 15.5 px | 2.1 px |             6 |       0 |
| `fig-18-example-sss`               | 9.4 × 4.6   |       19.0 px | 15.5 px | 2.1 px |             4 |       0 |
| `fig-19-check-rectangle`           | 8.6 × 6.1   |       19.0 px | 15.5 px | 2.1 px |             6 |       0 |
| `fig-19-kite`                      | 19.6 × 17.6 |       19.0 px | 15.5 px | 2.1 px |            13 |       0 |
| `fig-19-pairs`                     | 32.7 × 7.9  |       15.6 px | 12.7 px | 2.1 px |            18 |       0 |
| `fig-19-isosceles`                 | 10.4 × 9.2  |       19.0 px | 15.5 px | 2.1 px |             6 |       0 |
| `auth-04-translation-intro`        | 9.4 × 5.0   |       19.0 px | 15.5 px | 2.1 px |             6 |       0 |
| `auth-04-definition-pair`          | 10.6 × 5.6  |       19.0 px | 15.5 px | 2.1 px |             6 |       0 |
| lab (all three cases, both stages) | 10.4 × 6.6  |       19.0 px | 15.5 px | 2.1 px |             — |       0 |
| 4 teacher figures                  | 8.6 … 19.6  |       19.0 px | 15.5 px | 2.1 px |         4 … 8 |       0 |

Body prose is ≈ 16.5 px, so a vertex letter is now slightly larger than the
prose (as a name should be) and a printed value slightly smaller — everywhere.
The only exception is `fig-19-pairs`, whose three-panel window gives each
triangle a third of the width: it declares `labelScale: 0.82` (15.6 px / 12.7 px).
That is the one deliberate per-figure decision, and it is visible in the data
above rather than hidden in a CSS rule.

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
| `fig-19-kite`                   | `12`, `8`, `6`, `8` crowded against the two diagonals at the crossing `E`; 40 px letters                                                                                                       | each value keeps its own side of the crossing, so `12`/`6` and `8`/`8` can never be confused; letters at 19 px                                                                                                                                                                               |
| `fig-19-pairs`                  | `80°`/`44°`/`82°` placed from the centroid (outside the triangle, next to a side value); the shared 18 px arc radius was as wide as the triangle's waist, so no value could sit beside its arc | angle values now belong to their **arcs** in the data (`FigureAngle.label`); the arcs of this figure declare a radius in the panel's own units (`0.5`, ≈ 11 px on screen), and every value now sits **inside** its own mouth (panel ② `80°` at the incentre, 1.2 units from the side values) |
| `fig-17-activity-cases` panel ② | `35°`/`85°` overlapped the `3` and each other                                                                                                                                                  | angle values follow their arcs; `3` moved to the outer side of `[AC]`                                                                                                                                                                                                                        |
| activity lab                    | window was 11.8 × 8.8 for content spanning 2.4 … 10.4 — the drawing floated in empty space and was ~30 % smaller than it needed to be                                                          | window fitted to the activity's own coordinates (10.4 × 6.6), identical at every stage so switching stages never rescales the figure                                                                                                                                                         |

## 6. Verification

### Automated

| Check            | Command             | Result                    |
| ---------------- | ------------------- | ------------------------- |
| TypeScript       | `npm run typecheck` | pass                      |
| ESLint           | `npm run lint`      | pass                      |
| Full suite       | `npm test`          | 39 files, 628 tests, pass |
| Production build | `npm run build`     | pass                      |
| Combined         | `npm run verify`    | pass                      |

New invariants, in `src/components/diagram/renderers/lesson4/lesson4-typography.test.tsx`
(109 tests). They run against the layout the renderer really computes, for all
18 drawings:

1. every figure's vertex letter is within 0.5 px of its design size, and never
   below 75 % of the standard (the `labelScale` escape hatch stays honest);
2. the four roles stay ordered — vertex > value > frame — and at least three
   distinct font sizes are emitted per lesson, i.e. the "one size for
   everything" regression cannot come back silently;
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
custom properties flattened to their palette values, then rasterised at 1 000 and
1 500 px with `@resvg/resvg-js` (installed with `npm i --no-save`; neither the
dependency nor the harness is committed). All 14 static drawings were
rasterised, plus the lab in all three cases at all three stages (9 panels) —
23 rasters at 1 000 px and a subset at 1 500 px. Six before/after pairs are
committed under `docs/assets/lesson-04/`.

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
