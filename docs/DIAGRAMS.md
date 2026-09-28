# Diagram architecture

## Principle

This is an **extension point, not a geometry engine.**

The contract can already describe every kind of figure we anticipate, but only
the kind we are certain about (`image`) has a renderer. The first real textbook
pages will determine which geometry primitives are actually required — building
them now would mean inventing requirements.

## The contract

`DiagramSpec` (`src/content/schema.ts`) is a discriminated union on `kind`:

| `kind`        | Purpose                                | Status          |
| ------------- | -------------------------------------- | --------------- |
| `image`       | Scanned / exported textbook figures    | **Implemented** |
| `interactive` | Future draggable, manipulable figures  | Contract only   |
| `constructed` | Future declarative vector/SVG geometry | Contract only   |

Shared fields on every variant:

| Field         | Required | Notes                                          |
| ------------- | -------- | ---------------------------------------------- |
| `id`          | yes      | Slug                                           |
| `alt`         | **yes**  | Arabic alternative text — schema rejects empty |
| `caption`     | no       | Arabic caption, rendered RTL under the figure  |
| `aspectRatio` | no       | Reserves space, prevents layout shift          |
| `source`      | no       | Textbook provenance for the figure             |

`image` additionally requires `src`, which **must be base-relative** (no leading
slash) so the GitHub Pages base path `/Interactive-Geometry-Grade8/` is applied
by `assetUrl()`. The schema enforces this, and a fidelity test checks it.

`constructed.construction` is intentionally an opaque record. We will **not**
fix the geometry vocabulary (points, segments, arcs, angle marks, tick marks…)
until real figures show us what is genuinely needed.

## Dispatch

`<Diagram spec>` (`src/components/diagram/Diagram.tsx`) contains no geometry
logic at all. It switches on `spec.kind`, looks the renderer up in the registry,
and delegates. Every variant is wrapped in `<FigureFrame>`.

If a renderer is not registered, the figure degrades to a visible, accessible
notice showing the Arabic `alt` text and the missing renderer key. **An
unimplemented figure can never break a lesson.**

## Mobile-friendliness

Built in from the start, in `FigureFrame.module.css`:

- fluid width, never overflows the viewport (`max-width: 100%`),
- `aspect-ratio` box reserves vertical space so nothing jumps while loading,
- images are `object-fit: contain`, `loading="lazy"`, `decoding="async"`,
- the canvas is `direction: ltr; unicode-bidi: isolate` (diagrams draw LTR),
  while the caption stays in the page's Arabic RTL flow,
- reduced padding under 600px.

Display maths scrolls horizontally rather than breaking the page layout.

## Adding a renderer later

1. Write the component under `src/components/diagram/renderers/`:

   ```tsx
   // src/components/diagram/renderers/TriangleRenderer.tsx
   import type { ConstructedDiagram } from '@/content/schema';

   export function TriangleRenderer({ spec }: { spec: ConstructedDiagram }) {
     // read spec.construction, return responsive <svg viewBox="…">
   }
   ```

2. Register it in `src/components/diagram/renderers/index.ts`:

   ```ts
   import { registerConstructedRenderer } from '../registry';
   import { TriangleRenderer } from './TriangleRenderer';

   registerConstructedRenderer('triangle', TriangleRenderer);
   ```

   That file is imported once from `src/main.tsx`, so registration is global.

3. Author content referencing the key:

   ```ts
   { type: 'figure', diagram: { kind: 'constructed', id: 'fig-1',
     alt: 'مثلث قائم الزاوية', renderer: 'triangle', construction: { /* … */ } } }
   ```

No change to `Diagram.tsx`, routes, or the schema is required.

## Images

When real textbook figures arrive, place them under `public/diagrams/<unit>/`
and reference them base-relative:

```ts
{ kind: 'image', id: 'u1-fig-3', alt: 'مثلث قائم الزاوية ABC',
  src: 'diagrams/unit-01/fig-3.svg', aspectRatio: 4 / 3 }
```

Prefer SVG where available — it stays crisp on mobile and scales without
bandwidth cost. No image files exist in this repository yet.
