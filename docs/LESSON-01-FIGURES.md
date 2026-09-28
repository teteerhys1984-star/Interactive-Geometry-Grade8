# Lesson 1 — figure decisions (pages 5–7)

Decision tree applied to every figure:

```
Faithfully reproducible geometry from verified source → constructed / interactive
Provided AND approved for publication                 → image
Otherwise                                             → reference
```

**Outcome: all six figures resolved to `reference`.**

No source image has been provided or approved for platform use, so `image` was
unavailable for every figure. The remaining question for each was therefore only
whether it could be **reproduced faithfully** — and in each case it could not, at
the resolution available.

`reference` is a deliberate editorial outcome, not unfinished work.

---

## Per-figure justification

### Fig. 5-A — Damascus pavement tessellation · page 5

_Used in steps 1 and 2._

**Why not `constructed`:** a Greek-cross tessellation is a regular, reproducible
pattern — but the activity depends entirely on **which tile carries which red
numeral** (①–⑩ and beyond) and **on which tile corner each labelled point sits**
(`A B C D E F G M N P`). Neither mapping is legible at the supplied resolution.
Reproducing the tiling while guessing the numbering would silently change every
answer in the activity.

**To promote to `constructed`:** a scan in which each red circled numeral and each
black point marker is individually legible against its tile.

---

### Fig. 6-A — skier illustration · page 6

_Used in step 3._ **Settled — no further verification can change this.**

**Why not `constructed`:** raster artwork depicting a person. It cannot be
reproduced faithfully as vector geometry at any resolution.

**To promote to `image`:** provide the illustration and explicitly approve it for
publication. There is no third option.

---

### Fig. 6-B — strip of 15 parallelograms · page 6

_Used in step 5, with its six questions from page 7._

**Why not `constructed`:** the structure is regular (3 rows × 5 columns,
numbered ①–⑮ down each column, vertices `A…F` and `A'…F'`), and it
cross-validates against all six exercises. But the **slant of the
parallelograms**, the **blue/yellow colour assignment per cell**, and the
**exact lattice positions of the labelled vertices** could not be verified.
Those positions determine every answer — e.g. whether `D → D'` spans one row or
two changes which parallelogram is the image.

**This is the figure closest to promotion.** Its mathematical structure is
understood; only the drawing details are unverified.

**To promote to `constructed`:** a scan showing the parallelogram outlines, the
colour of each of the 15 cells, and the precise vertex each of `A…F` / `A'…F'`
marks.

---

### Fig. 7-A — four counter-example panels · page 7

_Used in step 6._

**Why not `constructed`:** the figure is a single composite of four panels
(①–④, ordered right-to-left). Panel ④ (two circles) is individually
constructible, but the silhouettes in panels ①, ② and ③ are not traceable at
this resolution. **Reproducing part of a composite figure while placeholder-ing
the rest would be altering it**, so the figure is treated as atomic.

**To promote:** either a legible scan of all four silhouettes, or approval of
the source image.

---

### Fig. 7-B — triangular lattice with 8 shapes · page 7

_Used in step 7._

**Why not `constructed`:** the isometric lattice itself is trivially
reproducible, but the **outlines and lattice positions of the eight yellow
shapes** (①–⑧) are not determinable, nor is it confirmed that all eight are
congruent. The exercise is to pair each shape with its image under a
translation, so those positions _are_ the content.

**To promote to `constructed`:** a scan in which each of the eight shape
outlines and its position on the lattice is legible.

---

### Fig. 7-C — rectangle with semicircular caps · page 7

_Used in step 8._

**Why not `constructed`:** the labels (`A` `B` `C` `D`) and dimensions
(`6 cm`, `3 cm`) were read confidently, and the primitives are simple. However
the **orientation of the two semicircles — convex (added) or concave (removed) —
could not be verified**, and that single detail is mathematically decisive:

- both caps convex → area `= 18 + 2.25π` cm²
- left concave, right convex → area `= 18` cm² (the translation argument the
  question is steering toward)

Drawing the wrong orientation would make question 2 produce the wrong answer, so
a placeholder is strictly preferable.

**To promote to `constructed`:** a scan showing clearly whether each end cap
bulges outward or is cut inward.

---

## Summary

| Figure | Page | Step | Outcome     | Blocking detail                       |
| ------ | ---- | ---- | ----------- | ------------------------------------- |
| 5-A    | 5    | 1, 2 | `reference` | Tile↔numeral and point↔corner mapping |
| 6-A    | 6    | 3    | `reference` | Raster artwork — not vectorisable     |
| 6-B    | 6    | 5    | `reference` | Slant, colours, vertex positions      |
| 7-A    | 7    | 6    | `reference` | Panel ①②③ silhouettes                 |
| 7-B    | 7    | 7    | `reference` | Shape outlines and lattice positions  |
| 7-C    | 7    | 8    | `reference` | Convex vs concave end caps            |

Every `reference` figure carries its page number, an Arabic description, and a
machine-readable `reason`, all enforced by the source-fidelity suite and
surfaced in the Teacher Area.
