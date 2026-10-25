# School worksheet solutions — source and verification audit

## Preflight (2026-10-25)

- Session branch: `arena/f6a3a424-interactive-geometry-grade8`.
- Clean initial worktree; initial HEAD and fetched `origin/main` both
  `adaff757aeeae7947ebac5f19efa9ef358a359d4`.
- `gh pr view 36`: **MERGED**, merged at `2026-10-25T14:33:07Z` into `main`.
  No change to PR #36 or its branch was needed. This feature uses the separate
  session branch already based on that merge.
- Both original scans opened and visually read:
  `public/worksheets/unit-01-worksheet-01/page-{1,2}.jpg`.
- Source inventory agrees with the implemented worksheet: 4 question groups,
  12 MCQ + 7 agree/disagree + 6 completions + 3 geometry problems.
  Geometry problems contain 2 + 2 + 3 demands: **32 leaf-level solutions**.
- Baseline `npm ci` and `npm run verify` passed: 66 test files, 1003 tests,
  typecheck, lint and production build. Existing large-chunk warning; npm
  installation reported 7 dependency vulnerabilities (3 moderate, 4 high).
  No dependency changes are part of this feature.

## Navigation and access

`أوراق عمل مدرسية` → `حلول أوراق العمل` → `فتح الحلول التفصيلية`.

Routes (HashRouter, under the existing deployment base):

- `/worksheets` and `/worksheets/:worksheetId` remain student-facing.
- `/worksheets/solutions` lists registered solution sets.
- `/worksheets/solutions/:worksheetId` renders worked solutions.

Route-backed subsection links reuse existing worksheet tab styling, PageShell,
breadcrumbs, central route builders and existing math/diagram renderers. Native
links are navigation, not ARIA tabs with incomplete keyboard semantics. Local
question-group jump controls are buttons, avoiding collision with HashRouter.

Solutions are **public**, like Test Area solutions. The existing Teacher Area
has a separate client-side convenience passphrase gate, not server security.
No gate, account, submission, grading or permission system was added. Student
questions do not import or render the key alongside their inputs.

## Source-to-solution map

All entries are under worksheet ID `unit-01-worksheet-01`. First-page entries
link to page, group and original item ID. Second-page entries additionally link
to their original parent problem ID and sub-question ID. Numbering, group titles,
question text, and diagrams are read from the **unchanged student definition**.

| Page / group     | Item suffixes | Checked answer / method                                                              |
| ---------------- | ------------- | ------------------------------------------------------------------------------------ |
| 1 / `ws01-q1`    | `01`–`12`     | A, A, C, C, A, C, B, B, B, B (conditional), C, A                                     |
| 1 / `ws01-q2`    | `01`–`07`     | غير موافق، غير موافق، غير موافق، غير موافق، موافق، موافق، غير موافق                  |
| 1 / `ws01-q3`    | `01`          | O: midpoint of BD implies vector BO = vector OD                                      |
| 1 / `ws01-q3`    | `02`          | Perpendicular lines                                                                  |
| 1 / `ws01-q3`    | `03`          | Triangle of area 6 cm²                                                               |
| 1 / `ws01-q3`    | `04`          | Equal corresponding hypotenuses and one leg; valid acute-angle alternative explained |
| 1 / `ws01-q3`    | `05`          | Congruent rectangle; F′ may name its image                                           |
| 1 / `ws01-q3`    | `06`          | Base × corresponding perpendicular height ÷ 2                                        |
| 2 / `ws01-q4-p1` | `1`           | ABM ≅ ACM, ASA after deriving the equal angles at M                                  |
| 2 / `ws01-q4-p1` | `2`           | CM = MB, corresponding sides                                                         |
| 2 / `ws01-q4-p2` | `1`           | ABN ≅ DCM, SAS; NB = MC by subtraction of BM                                         |
| 2 / `ws01-q4-p2` | `2`           | Translation N → M maps A → D, B → C, N → M                                           |
| 2 / `ws01-q4-p3` | `1`           | ACM ≅ BCN, ASA using vertical angles and printed marks                               |
| 2 / `ws01-q4-p3` | `2`           | NAB ≅ MBA, SSS; AN = BM by segment addition                                          |
| 2 / `ws01-q4-p3` | `3`           | CAB is isosceles at C because AC = BC                                                |

Every entry includes an answer or explicitly qualified interpretation and explanatory steps, not only the answer
in this audit table. Geometry proofs use printed markings and incidence, never
lengths measured from the drawing. Independent coordinate witnesses check the
existing reconstructed diagrams but do not replace the general written proofs.

## Printed wording needing attention

1. **Q1/1:** A (rectangle) is the most specific intended classification, but C
   (parallelogram) is also true as a superclass. The single-choice formulation
   is not logically exclusive. Both valid classifications appear in the answer itself; the rectangle is
   described as the likely intended, most specific classification, not the
   uniquely correct choice. Accepting only one requires a teacher decision;
   the original options were not edited.
2. **Q1/8:** B uses the curriculum's “تسايرها” (same direction). Coincident
   supporting lines are possible; equal length is also preserved. A says
   “تساويها فقط”, which is not the complete property.
3. **Q1/10:** The printed sentence does not explicitly repeat “وفق انسحاب”.
   B (25 m²) is conditional on translation, consistent with the surrounding
   worksheet. A different unspecified transformation need not preserve area.
   The answer begins “إذا كان التحويل انسحاباً” and explicitly says it is
   conditional, not definitive. Each calculation repeats the assumption;
   preservation of area is explained only under translation. The notice
   requests teacher confirmation before adopting the proposed option.
4. **Q4/problem 3/part 2:** The source names triangles NAB and MAB. These are
   indeed congruent triangles, but an ordered congruence statement must be
   **NAB ≅ MBA** (N ↔ M, A ↔ B, B ↔ A), not NAB ≅ MAB. The solution explicitly
   distinguishes naming a triangle from ordered vertex correspondence.
5. **Q3/1:** No correction is needed. The literal printed translation O → D
   sends B to **O**, because O bisects BD.

No source text, source image, worksheet ID or question numbering was changed.
There are no illegible items or omitted demands. The source ambiguities above
remain visible rather than being silently repaired.

## Add another solution set

1. Add the worksheet using the existing `src/worksheets/` schema/registry.
2. Author a separate `WorksheetSolutionSet` under `src/worksheets/solutions/`.
3. Register it in `worksheetSolutionSets` in that directory's `registry.ts`.
4. Follow `worksheetSolutionTargets` order. Every source target must appear
   exactly once, either `solved` (nonempty answer and steps, MCQ option or
   agree/disagree verdict as appropriate) or `unresolved` with a nonempty
   source-specific reason. Unpublished worksheets need not have solution sets.

The catalog rejects unknown worksheets, duplicate sets, missing/extra/reordered
references, wrong page/group/parent/sub-question links and invalid options.
This is an additive solutions contract; the student schema and shared lesson /
Test Area contracts were not changed. Future definitions automatically use the
same listing and detail components.

## Verification

- Targeted: `npx vitest run src/worksheets/solutions/solutions.test.tsx src/worksheets/worksheets.test.tsx`
  — **2 files / 28 tests passed**.
- Full: `npm run verify` — **67 files / 1023 tests passed**, typecheck, lint and
  production build passed. Existing >500 kB chunk warning remains.
- Tests cover complete ordered linkage, future sets, unresolved records,
  malformed records, expected answer selections and verdicts, independent
  numerical/vector/diagram witnesses, strict KaTeX parsing, BIDI audit,
  navigation, deep links, public access and the unchanged student worksheet.
- Actual **headless Chromium** via Playwright at **1366 × 900**, separate from
  jsdom: navigated parent → solutions → detail; inspected screenshots of the
  parent tabs, solution header, MCQ/source notice, and geometric proofs and
  diagrams; opened source scan; returned to student worksheet and selected an
  option via its visible label; back/reload preserved solution routing.
- Browser metrics: RTL; document width = viewport width (1366 px); 32 solutions;
  KaTeX-rendered maths; 3 SVG diagrams; zero KaTeX errors, zero detected
  overflowing solution blocks, zero page errors; original scan loaded.
- Browser tooling was installed outside the repository only. Initial Chromium
  launch lacked NSS libraries; extracting the bundled runtime resolved it.
  No browser dependency or binary was added to the project.

## PR #37 pre-merge review follow-up (2026-10-25)

- Before changes: branch `arena/f6a3a424-interactive-geometry-grade8`, clean
  worktree, HEAD `efd8405ed58b9e759486be4076837c9da42dc1e2`; PR #37 OPEN,
  `mergedAt: null`. Its then-current verify CI check succeeded; build/deploy
  jobs were skipped as configured for pull requests.
- Reused the existing `sourceNote` field and warning Callout. Source warnings
  now appear **before** the answer, not after the proof. For entries carrying
  a source note, the heading is “قراءة الحل مع مراعاة التنبيه” and an option
  is labelled “الخيار المقترح”, not an unconditional single correct answer.
  This also moves the existing Q1/8 and Q4/problem 3 correspondence notes ahead
  of their explanations; their mathematical content remains unchanged.
- Q1/1 explicitly identifies both rectangle (A) and parallelogram (C) as valid
  and leaves adopting one answer to the teacher. Q1/10 explicitly conditions
  25 m² on translation and requests teacher confirmation.
- Two new scoped detail-page tests assert the visible warning content, warning
  order before the answer, teacher decision/confirmation, qualified headings,
  both Q1/1 options and the condition within Q1/10's answer itself. Existing
  assertions and mathematical tests remain intact.
- Re-ran `npm run verify`: typecheck, lint, 67 files / 1023 tests and production
  build passed; the existing large-chunk warning remains. Targeted worksheet
  tests: 2 files / 28 passed. `git diff --check` passed.
- Re-inspected actual Chromium screenshots of **both changed entries** at
  1366 × 900, independently of jsdom. Both warnings are readable ahead of the
  proposed answer. RTL and equations remain readable, document width equals
  viewport width (1366 px), 32 solution entries remain, and no KaTeX or browser
  page errors were observed. Browser tools stayed outside the repository.
- No student worksheet definition, scan, question ID, schema, registry, route,
  permission model or dependency was changed in this follow-up.
