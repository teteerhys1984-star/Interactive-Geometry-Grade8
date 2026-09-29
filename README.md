# Interactive Geometry — Grade 8 (Arabic)

منصة تعليمية تفاعلية لمقرر الهندسة للصف الثامن — Arabic-first, right-to-left,
static, and deployed to GitHub Pages.

> **Status: Unit 1 · Lessons 1–3 implemented** (teaching steps, final
> assessment and teacher resources for each) — «الانسحاب وخواصه» (pages 5–7),
> «صورة نقطة وفق انسحاب» (pages 8–10), and «صورة شكل وفق انسحاب» (pages 11–16).
> All source content is preserved from the supplied scans. Lesson 4 and Units
> 2–5 are not yet authored. No textbook content is invented.

## Stack

React 19 · TypeScript (strict) · Vite 8 · React Router 7 (`HashRouter`) ·
KaTeX · Zod · Vitest + Testing Library · CSS Modules

No backend. No database. No server authentication. No Vercel.

## Quick start

Requires Node **≥ 22.22.2** — the test toolchain (vitest 5, jsdom 30) does not
support Node 20. [`.nvmrc`](.nvmrc) pins the version CI runs, so `nvm use`
reproduces the exact verified runtime.

```bash
nvm use           # optional: read the pinned version from .nvmrc
npm ci
npm run dev       # http://localhost:5173
npm run verify    # typecheck + lint + test + build
```

| Script                    | Purpose                                     |
| ------------------------- | ------------------------------------------- |
| `dev`                     | Vite dev server                             |
| `build`                   | Typecheck then production build to `dist/`  |
| `preview`                 | Serve `dist/` as GitHub Pages will          |
| `typecheck`               | `tsc -b --force`                            |
| `lint` / `lint:fix`       | ESLint                                      |
| `format` / `format:check` | Prettier                                    |
| `test` / `test:watch`     | Vitest (includes the source-fidelity suite) |
| `verify`                  | All quality gates, in CI order              |

## Learning path

```
Home → Subject → Unit → Lesson Outline → Step-by-Step (Prev/Next)
     → Final Assessment → Result → Completion    + Teacher Area
```

Every screen is driven by the content registry, so adding a unit requires no
component or routing changes.

## Adding the first real lesson

Edit **one** directory: `src/content/units/`. Full walkthrough in
[`docs/CONTENT-AUTHORING.md`](docs/CONTENT-AUTHORING.md).

## Documentation

| Document                                                 | Contents                                         |
| -------------------------------------------------------- | ------------------------------------------------ |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)           | Layers, routing, content-driven design           |
| [`docs/CONTENT-AUTHORING.md`](docs/CONTENT-AUTHORING.md) | How to add units, lessons, questions             |
| [`docs/BIDI-AND-MATH.md`](docs/BIDI-AND-MATH.md)         | Arabic RTL, LTR isolation, notation rules        |
| [`docs/DIAGRAMS.md`](docs/DIAGRAMS.md)                   | `DiagramSpec` contract, renderer registry        |
| [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)               | GitHub Pages setup and the remaining manual step |

## Lesson 1 content model

Lesson 1 («الانسحاب وخواصه», pages 5–7) has **15 steps**:

| Kind                            | Count | `origin`   | Rendering                               |
| ------------------------------- | ----- | ---------- | --------------------------------------- |
| Verbatim textbook steps         | 8     | `source`   | plain lesson card, carries a page ref   |
| Platform-written teaching steps | 7     | `authored` | badged «شرح المنصّة» cards, no page ref |

The eight source steps keep their printed order and wording; the authored steps
are interleaved between them and are visually badged so a student can always
tell the book from our explanation. A fidelity test asserts the source sequence
and a verbatim sentence corpus survive untouched.

It ends with a **10-question final assessment** written by this platform
(`src/content/units/lesson-01-assessment.ts`). Questions are graded in the
browser; the student sees a score and per-question ✓/✗ only. Every question's
worked `explanation` renders **exclusively** in the Teacher Area.

`src/content/units/lesson-01-teacher.ts` holds the teacher resources: 16
teacher-derived solutions to the printed questions (labelled «حلول المعلم»,
never as the book's answers, each flagging any dependency on an unreadable
figure) plus the full assessment answer key.

## Lesson 2 content model

Lesson 2 («صورة نقطة وفق انسحاب», pages 8–10) has **18 steps**: 11 verbatim
textbook steps and 7 platform-written teaching steps, interleaved and badged
«شرح المنصّة» exactly as in Lesson 1. It ends with a **12-question** final
assessment and ships 17 teacher-derived solutions to the printed questions.

Its figures split into two regimes, recorded in
[`docs/LESSON-02-FIGURES.md`](docs/LESSON-02-FIGURES.md):

- the two **squared-paper** figures (pages 8 and 10) are reproduced exactly,
  because every point sits on an integer lattice node that was read from the
  scan and then verified arithmetically (collinearity, shared rows/columns, and
  every constructed image landing on a node);
- the five **blank-sheet** figures stay faithful `reference` placeholders, with
  mathematically exact platform-authored analogues offered alongside them.

Lesson 2 also introduces three interactive renderers — a squared-paper figure,
a step-by-step compass construction, and a draggable point whose image is
computed live — plus a per-lesson colour identity
(`src/lib/lessonTheme.ts` + `data-lesson-theme` in `src/styles/tokens.css`).
Lesson 1 keeps the default palette and is untouched.

## Lesson 3 content model

Lesson 3 («صورة شكل وفق انسحاب», pages 11–16) has **22 steps**: 16 source
steps in printed order and 6 badged platform-teaching steps. It ends with a
new **12-question** final assessment and includes 23 teacher-derived solutions
to every printed prompt.

Its 14 textbook figures remain faithful `reference` diagrams because their
blank-sheet geometry (and the fine grids on page 15) cannot be reconstructed
without guessing. The decision record is
[`docs/LESSON-03-FIGURES.md`](docs/LESSON-03-FIGURES.md). Exact platform-made
analogues add a shape/vector laboratory, a progressive four-vertex
construction, and three grouped challenges whose feedback appears only after
one combined submission.

## Source fidelity

Every lesson and question must carry a `source` reference to the printed
textbook. The test suite rejects missing sources, placeholder text, duplicate
ids, diagrams without Arabic alt text, and mathematical notation that is not
BIDI-isolated.

## Teacher Area

`/#/teacher` is gated by a shared client-side passphrase. Past the gate it
shows a lesson picker (one card per lesson, derived from the content
registry); each lesson's teacher area lives at `/#/teacher/:lessonId` and is
split into four navigable sections (tabs): textbook-question solutions,
the assessment answer key with justifications and common wrong reasoning,
the reference-figure report, and teaching notes — plus the lesson's source
coverage. A newly authored lesson appears in the picker automatically.

> ⚠️ **This is not real security.** The site is static and public; the
> passphrase ships in the JavaScript bundle and can be read by anyone. It is a
> convenience speed bump only. Never place confidential data, grades or
> personal information behind it. See `src/lib/teacherAccess.ts`.

## Instructor

**المهندس سومر شاهين: 0930215022**

## Deployment

GitHub Pages via GitHub Actions, base path `/Interactive-Geometry-Grade8/`.

**Pages is not enabled yet** — set _Settings → Pages → Source_ to
**GitHub Actions** to publish. See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).
