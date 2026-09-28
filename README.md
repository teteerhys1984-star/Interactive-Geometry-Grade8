# Interactive Geometry — Grade 8 (Arabic)

منصة تعليمية تفاعلية لمقرر الهندسة للصف الثامن — Arabic-first, right-to-left,
static, and deployed to GitHub Pages.

> **Status: Unit 1 · Lesson 1 implemented (expanded: teaching steps, final assessment, teacher resources)** — «الانسحاب وخواصه», textbook pages 5–7.
> All content is reproduced verbatim from the supplied scans. Lessons 2–4 and
> Units 2–5 are not yet authored. No content is invented.

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

## Source fidelity

Every lesson and question must carry a `source` reference to the printed
textbook. The test suite rejects missing sources, placeholder text, duplicate
ids, diagrams without Arabic alt text, and mathematical notation that is not
BIDI-isolated.

## Teacher Area

`/#/teacher` is gated by a shared client-side passphrase and contains, per
lesson: source coverage, teacher-derived solutions to the printed questions,
the assessment answer key with justifications and common wrong reasoning,
the reference-figure report, and teaching notes.

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
