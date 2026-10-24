# Unit 2, Lesson 2 — Geometric Figures, Interactive Lab & Visual Audit

## 1. Coordinate & Discipline Rules

All Lesson 9 figures are computed in `src/content/units/lesson-09-geometry.ts` using exact Euclidean coordinates (`XY = readonly [number, number]`, x right, y up) and rendered through the shared `FigureSvg` / `midline-figure` pipeline (`src/content/units/lesson-09-figures.ts`).

- **Schematic honesty**: Pages 34–35 print zero numeric lengths or angle degrees. Every diagram is therefore badged `origin: 'authored'` with a schematic non-scale caption while satisfying 100% of stated geometric incidences, midpoints, parallelisms, and right angles to `< 1e-9`.
- **Zero visual leakage**: Student prompt and starter diagrams mark **only** the given midpoints, right angles, and parallel lines. Equal-half tick marks on the third side appear **exclusively** in Teacher Area solved figures (`fig-l9-practice-one-solved`, `fig-l9-practice-two-solved`).
- **Automated layout verification**: `src/content/units/lesson-09-geometry.test.ts` runs `computeLabelLayout` and `collectObstacles` across all 10 static `FigureSpec`s, verifying zero crowded labels, zero label-on-ink hits, zero label-to-label overlaps, and 100% `viewBox` containment.

---

## 2. Lesson & Teacher Figure Inventory

| Diagram ID                                                   | Kind / Renderer                         | Placement                                                                  | Geometric Invariants Verified                                                                                                                                                                     |
| ------------------------------------------------------------ | --------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fig-l9-activity-panels`                                     | `constructed` / `midline-figure`        | Step `l9-step-01-activity` (p. 34)                                         | 3 framed panels (`③`, `②`, `①` RTL): $M = \text{mid}(AB)$, $N = \text{mid}(AC)$, $(d') = (MN) \parallel (BC)$, freehand $(d)$ tilted $+13^\circ$ so $P \in [AC]$ with $P \neq N$                  |
| `auth-09-parallel-midpoint-lab`                              | `interactive` / `parallel-midpoint-lab` | Step `l9-step-a02-lab-and-proof`                                           | Live angle tilt $\delta \in [-12^\circ, +12^\circ]$, presets (`+9^\circ`, `0^\circ`, `-8^\circ`), acute/right/obtuse triangles, $(d')$ toggle; exact $P = N$ and $AP = PC$ iff $\delta = 0^\circ$ |
| `fig-l9-example-ij`                                          | `constructed` / `midline-figure`        | Step `l9-step-02-theorem` (p. 34)                                          | Scalene $\triangle ABC$, $I = \text{mid}(AB)$ (ticks on $[AI],[IB]$ only), $(IJ) \parallel (BC)$ (parallel arrows), $J = \text{mid}(AC)$                                                          |
| `fig-l9-knowledge-amb`                                       | `constructed` / `midline-figure`        | Step `l9-step-03-knowledge` (p. 35)                                        | $\triangle ABC$, $M \in [BC]$ with $CM = 4.8 \neq MB = 3.2$, $R = \text{mid}(AM)$, $(d) = (SR) \parallel (BC)$, $S = \text{mid}(AB)$                                                              |
| `fig-l9-knowledge-subtriangle`                               | `constructed` / `midline-figure`        | Step `l9-step-a04-subtriangle-strategy`                                    | Isolates shaded sub-triangle $AMB$ inside $\triangle ABC$ so students see why $[AM]$ is a side of $AMB$                                                                                           |
| `fig-l9-knowledge-subtriangle-teacher`                       | `constructed` / `midline-figure`        | Teacher solution `sol-p35-knowledge-example`                               | Dedicated unique-ID copy of the $AMB$ sub-triangle isolation figure for the Teacher Area                                                                                                          |
| `fig-l9-check-one`                                           | `constructed` / `midline-figure`        | Step `l9-step-05-check` (p. 35 ①)                                          | $\triangle ABC$, $E = \text{mid}(AC)$ (double ticks), $(EF) \parallel (AB)$, $F = \text{mid}(BC)$, plus interior cevians $[AF]$ and $[BE]$                                                        |
| `fig-l9-check-two`                                           | `constructed` / `midline-figure`        | Step `l9-step-05-check` (p. 35 ②)                                          | Right $\triangle ABC$ at $B$, $M = \text{mid}(AB)$, $(MN) \perp (AB)$ (two right-angle squares at $B$ and $M$), $N = \text{mid}(AC)$                                                              |
| `fig-l9-practice-one-starter` / `fig-l9-practice-one-solved` | `constructed` / `midline-figure`        | Step `l9-step-06-practice` (collapsible) / Teacher `sol-p35-practice-1-p1` | $\triangle IJK$, $S$ symmetric of $I$ about $J$ ($J = \text{mid}(IS)$), $(ST) \parallel (JK)$ meeting $(IK)$ at $T$ ($K = \text{mid}(IT)$); double ticks on $[IK],[KT]$ in solved version only    |
| `fig-l9-practice-two-starter` / `fig-l9-practice-two-solved` | `constructed` / `midline-figure`        | Step `l9-step-06-practice` (collapsible) / Teacher `sol-p35-practice-2`    | $\triangle AJP$, $C = \text{mid}(AJ)$, $(AM) \parallel (CP)$ meeting $(JP)$ at $M$ ($P = \text{mid}(MJ)$); double ticks on $[JP],[PM]$ in solved version only                                     |

---

## 3. Dedicated Lesson Test Visual Audit (`lesson-09-test`)

Registered in `src/tests/visualAudit.ts` across all 20 questions (`geo-l09-t01-q01` … `geo-l09-t01-q20`):

- **`geo-l09-t01-q16` — Category `A` (`test-l09-q16-cevian-midpoint`)**: Multi-triangle scene ($\triangle ABC$ with non-midpoint $M \in [BC]$ and $R = \text{mid}(AM)$) where identifying sub-triangles $AMB$ and $AMC$ visually is essential without drawing the parallel line or revealing $S, T$.
- **`geo-l09-t01-q10` — Category `B` (`test-l09-q10-right-triangle`)**: Right triangle $ABC$ at $B$ with perpendicular $(MN) \perp (AB)$ at midpoint $M$, clarifying the shared perpendicular baseline without marking $[AN]$ or $[NC]$.
- **Remaining 18 questions — Category `C`**: Self-contained symbolic/verbal specifications where adding a diagram would visually give away the midpoint or extended-triangle configuration being tested.
