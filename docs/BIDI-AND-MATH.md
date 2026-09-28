# Arabic RTL, LTR isolation and mathematical notation

## The problem

The page is Arabic and right-to-left. Mathematical and geometric notation is
inherently left-to-right. When the two mix in one sentence, the Unicode
Bidirectional Algorithm reorders the neutral characters at the boundary, and
text like `AB = 5 cm` renders as `cm 5 = AB`, or an angle `∠ABC` lands on the
wrong side of the phrase.

This is not a styling detail — it is a **correctness** problem in a geometry
course, where `AB` and `BA` and the position of `∠` carry meaning.

## The two-layer strategy

### Layer 1 — structural isolation (primary)

Every LTR run is wrapped in an element with `dir="ltr"` and
`unicode-bidi: isolate`. This makes the run an opaque neutral object to the
surrounding bidi algorithm: it orders LTR internally while keeping its correct
position in the Arabic sentence.

The single primitive is `<LtrIsolate>` (`src/components/math/LtrIsolate.tsx`).
Everything else builds on it:

| Component                          | Use                                                         |
| ---------------------------------- | ----------------------------------------------------------- |
| `<LtrIsolate>`                     | Raw escape hatch for any LTR run                            |
| `<Math latex="…">`                 | All LaTeX, inline or display. Wraps KaTeX in `<LtrIsolate>` |
| `<Fraction numerator denominator>` | Simple CSS fractions with an Arabic `aria-label`            |
| `<RichText text="…">`              | Arabic prose; converts every `$…$` run into a `<Math>`      |
| `<FigureFrame>`                    | Diagram canvas is LTR-isolated; the caption stays RTL       |

`src/styles/rtl.css` additionally forces `direction: ltr` on all `.katex`
output. KaTeX emits absolutely-positioned spans that break completely under
`direction: rtl`, so this rule is mandatory, not cosmetic.

### Layer 2 — Unicode control characters (fallback)

Where no element boundary exists — `alt` text, `aria-label`, `document.title` —
use the helpers in `src/lib/bidi.ts`:

| Helper                | Effect                                                  |
| --------------------- | ------------------------------------------------------- |
| `isolateLtr(text)`    | Wraps in `U+2066 LRI … U+2069 PDI`                      |
| `isolateAuto(text)`   | Wraps in `U+2068 FSI … U+2069 PDI` (direction inferred) |
| `stripIsolates(text)` | Removes all isolate/embedding controls                  |

## Authoring rules

**Rule 1 — never write bare notation in Arabic prose.**

```ts
// ❌ WRONG — will reorder
{ type: 'paragraph', text: 'طول الضلع AB يساوي 5 سم' }

// ✅ RIGHT — math delimited with $…$, isolated automatically
{ type: 'paragraph', text: 'طول الضلع $AB$ يساوي $5$ سم' }
```

**Rule 2 — display equations use a `math` block, not a paragraph.**

```ts
{ type: 'math', latex: 'a^2 + b^2 = c^2', label: 'قانون فيثاغورس' }
```

**Rule 3 — numbers shown inside Arabic UI text use `className="numeric" dir="ltr"`.**
This is already applied in `ProgressBar`, `StepRail` and the assessment score.

This is enforced. The source-fidelity suite runs `hasUnisolatedNotation()` over
every authored string and **fails the build** if bare notation appears outside
`$…$` or an explicit isolate.

## Layout rules

The codebase uses **CSS logical properties only** — no `left` / `right` /
`margin-left` anywhere:

| Physical           | Logical (used here)          |
| ------------------ | ---------------------------- |
| `margin-left`      | `margin-inline-start`        |
| `padding-right`    | `padding-inline-end`         |
| `border-left`      | `border-inline-start`        |
| `top`              | `inset-block-start`          |
| `width` / `height` | `inline-size` / `block-size` |

As a result the layout mirrors correctly and `Previous`/`Next` sit on the
correct sides for an Arabic reader (previous at inline-start = visually right).

## Digit convention — OPEN DECISION

Arabic-Indic digits (`٠١٢٣`) vs Latin digits (`0123`) are **deliberately not
forced** yet. The convention must follow the actual printed textbook, which we
have not seen.

The decision is a single token in `src/styles/tokens.css`:

```css
--numeric-font-feature: normal; /* current: unforced */
/* --numeric-font-feature: 'anum' 1;      Arabic-Indic */
```

applied through the `.numeric` class in `src/styles/rtl.css`. Change that one
token once Lesson 1 tells us which convention the book uses.
