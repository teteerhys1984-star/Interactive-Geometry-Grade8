# Architecture

## Goals and constraints

| Constraint | Decision                                                                                |
| ---------- | --------------------------------------------------------------------------------------- |
| Hosting    | GitHub Pages (static files only)                                                        |
| Backend    | **None.** No server, no database, no server authentication                              |
| Deployment | GitHub Actions → `actions/deploy-pages`                                                 |
| Routing    | `HashRouter` — Pages has no rewrite rules, so deep links must resolve from `index.html` |
| Base path  | `/Interactive-Geometry-Grade8/` (set in `vite.config.ts`)                               |
| Language   | Arabic, `dir="rtl"` at the document root                                                |
| Maths      | LTR-isolated islands inside the RTL page                                                |
| State      | `localStorage` / `sessionStorage` in the learner's own browser                          |

## Learning path

The full navigation chain is wired end to end and driven entirely by data:

```
Home  →  Subject  →  Unit  →  Lesson Outline  →  Step-by-Step Lesson
                                                   ↕ Previous / Next
                                                        ↓
                                                   Completion
                                                        ↓
                                              Final / Unit Assessment

                              Teacher Area (client-side gate)
```

| Route                          | Component           | Purpose                               |
| ------------------------------ | ------------------- | ------------------------------------- |
| `/`                            | `HomePage`          | Course entry, empty-course state      |
| `/subject/:subjectId`          | `SubjectPage`       | List of units                         |
| `/unit/:unitId`                | `UnitPage`          | List of lessons + unit assessment     |
| `/lesson/:lessonId`            | `LessonOutlinePage` | Objectives, vocabulary, step map      |
| `/lesson/:lessonId/step/:step` | `LessonStepPage`    | One step + progress + Prev/Next       |
| `/lesson/:lessonId/done`       | `CompletionPage`    | Completion + next action              |
| `/assessment/:scopeId`         | `AssessmentPage`    | Unit or final assessment              |
| `/teacher`                     | `TeacherPage`       | Teacher area behind a passphrase gate |
| `*`                            | `NotFoundPage`      | Unknown route                         |

Routes are never hand-written in components. `src/lib/routes.ts` owns both the
URL builders and the route patterns.

## Content-driven design

The single most important property of this foundation: **the UI is a function of
the content registry.** Nothing about routing, navigation, progress or
assessment is hard-coded per lesson.

```
src/content/units/index.ts   ← the ONLY file you edit to add curriculum
        ↓ validated by
src/content/schema.ts        ← Zod schemas, the contract
        ↓ aggregated by
src/content/registry.ts      ← subject, lookups, prev/next ordering
        ↓ consumed by
src/routes/*                 ← every page
```

`registry.ts` derives, automatically:

- the flattened curriculum order (`allLessons`),
- previous/next neighbours **across unit boundaries** (`getLessonNeighbours`),
- unit / lesson / assessment lookups,
- `isCourseEmpty`, which drives the empty state.

Adding a unit therefore requires **zero** changes to components, routes or tests.

## Layers

```
src/
├── app/           Shell: App, router table, ScrollToTop, ErrorBoundary
├── routes/        One component per screen in the learning path
├── components/
│   ├── layout/    Header, Footer, Breadcrumbs, PageShell
│   ├── navigation/PrevNext, ProgressBar, StepRail
│   ├── math/      LtrIsolate, Math, Fraction, RichText
│   ├── diagram/   Diagram dispatcher, FigureFrame, registry, renderers/
│   ├── content/   BlockRenderer — maps content blocks to components
│   └── ui/        Card, Callout, EmptyState
├── content/       schema.ts, registry.ts, units/ (empty)
├── lib/           routes, bidi, progress, teacherAccess, assets
├── styles/        tokens.css, rtl.css, global.css
└── test/          setup + helpers
```

## Rendering pipeline

Authors do not write HTML or JSX. They write **typed content blocks**:

```
ContentBlock[]  →  <Blocks>  →  paragraph → <RichText> → <Math> → <LtrIsolate>
                                math      → <Math display>
                                list      → <ul>/<ol> + <RichText>
                                figure    → <Diagram> → <FigureFrame>
                                callout   → <Callout> → (recursive)
```

This indirection is what lets us guarantee BIDI correctness and responsive
diagrams **globally** rather than lesson by lesson.

## Error containment

`ErrorBoundary` wraps the route outlet, and `<Diagram>` degrades to a visible
notice when a renderer is missing. A single malformed lesson or an unimplemented
figure can never blank the platform.

## What is deliberately NOT built

- No geometry engine, no vector/constructed renderer, no interactive figures.
- No curriculum content, no sample lesson, no invented questions, no images.
- No backend, database, server auth, or Vercel.
- No global digit convention (see `docs/BIDI-AND-MATH.md`).

These wait for real textbook pages to define the requirement.
