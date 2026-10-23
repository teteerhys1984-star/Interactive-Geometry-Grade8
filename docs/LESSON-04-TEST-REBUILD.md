# Lesson 4 Test Rebuild — «تطابق المثلثات» (`lesson-04-test`)

## Scope and Isolation

This document records the standalone rebuild of **`lesson-04-test`** (Unit 1, Lesson 4: _«تطابق المثلثات»_, textbook pages **17–19**).

- **Touched files (5 only):**
  1. `src/tests/definitions/lesson-04.ts`
  2. `src/tests/questions/lesson-04.ts`
  3. `src/tests/solutions/lesson-04-test.ts`
  4. `src/tests/lesson04-detailed.test.tsx`
  5. `docs/LESSON-04-TEST-REBUILD.md`
- **Strict isolation preserved:**
  - Zero edits to Lesson 4 student/teacher/in-lesson assessment content (`src/content/**`).
  - Zero edits to shared Test Area contracts, scoring, registry, visual audit, or math rendering audit (`src/tests/schema.ts`, `scoring.ts`, `registry.ts`, `solutionAudit.ts`, `visualAudit.ts`).
  - Zero edits to Lessons 1–3 tests or to the Unit 1 comprehensive test (`src/tests/questions/unit-01.ts`).

---

## Defects Fixed from the Legacy Bank

1. **Upgraded from implicit `'legacy'` to `solutionPolicy: 'detailed'`:**
   - Replaced brief 1–3 line notes in `src/tests/solutions/lesson-04-test.ts` with complete Arabic pedagogical solutions (`answerSummary`, `given`, `steps`, `rule`, `check`, `commonError`, `diagramNotes` on all 5 figure items, `scoringCriteria`, composite `parts`, and explicit `provenance` splitting `sourceVerified` vs `platformAuthored`).
2. **Accurate textbook page boundaries (pages 17–19) and Unit 3 boundary discipline:**
   - Page **17** prints the exploratory activity, the congruence definition (equality of corresponding sides and angles), and **Case ①** only.
   - Page **18** prints Worked Example 1, **Case ②**, Worked Example 2, **Case ③**, and Worked Example 3.
   - Page **19** prints _Check your understanding_, Practice ① (kite), Practice ② (triangle pairs), Practice ③ (proving _«إذا تساوى قياسا زاويتين في مثلث كان المثلث متساوي الساقين»_ via midpoint $M$ of $[BC]$ and perpendiculars $ME \perp (AB), MF \perp (AC)$, alongside an explicit printed note deferring standalone isosceles-altitude theorems to **Unit 3**), and the closing note on right-triangle congruence (_hypotenuse + leg_ and _hypotenuse + acute angle_).
   - Removed false attributions (such as attributing «التشابه» to p. 17 in `q02`, attributing standalone isosceles-altitude theorems to p. 19 in `q18`, and claiming p. 19 proves `q20` by dropping an altitude from the apex).
3. **Composite items & partial-credit alignment (24 pts → 31 pts):**
   - Upgraded `q02`, `q07`, and `q20` from bare 1-point `true-false` to 2-point `true-false-justify` (`correction` on `q02`; `justification` on `q07` and `q20`).
   - Rebuilt `q16` and `q19` into genuine 3-part `error-analysis` items (3 points each: 3-step student work where only `s3` is faulty + 3-option error location + `correction` + `justification`).
4. **Substantive mathematical & interaction upgrades:**
   - **`q04` (`numeric`, `7.5 cm`):** gives $AC = 7.5\ \mathrm{cm}$ in isosceles $ABC$ (vertex $A$) rather than stating $AB = 7.5\ \mathrm{cm}$ directly, so both $AB = AC$ and congruence correspondence $[DE] \leftrightarrow [AB]$ are required.
   - **`q14` (`exact`, `15/2 = 7.5 cm`):** replaced the trivial integer `6/1` (which did not even require the second triangle) with a genuine rational problem on right triangles $ABC$ (at $A$) and $DEF$ (at $D$) where $BC = EF$ (symbolic), $AB = DE = 4\ \mathrm{cm}$, and $\text{Area}(ABC) = 15\ \mathrm{cm}^2$, asking for leg $[DF]$ in $DEF$. Because $EF$ is not given numerically, coupling $DEF$ to $ABC$ via hypotenuse–leg congruence ($BC = EF$, $AB = DE$) is mathematically indispensable, and $(4, 7.5, 8.5)$ forms an exact Euclidean right triangle.
   - **`q20` (`true-false-justify`):** aligned strictly with textbook Practice ③ on page 19 ($MEB \cong MFC \implies EB = FC, ME = MF$, then $MEA \cong MFA$ by common hypotenuse $[MA]$ and $ME = MF \implies AE = AF$, hence $AB = AE + EB = AF + FC = AC$), exposing circular hypotenuse assumptions in the distractor and `check`.
   - **Option & display ordering:** scrambled initial display order in `q12` (`ordering`), broke row-diagonal pairing in `q10` (`matching`), varied correct-choice indices across `single-choice` items, and refined label sides on `q15` (`A, D` → `sw`) and `q17` (`M` → `s`).

---

## 20-Question Blueprint & 31-Point Matrix

Passing score: **`60%`** → practical whole-point threshold **`19 / 31` (`61%`)** (`18 / 31` rounds to `58%`).

| ID                | Type                 | Concept                | Difficulty        | Max Points | Audited Figure                               | Textbook Pages |
| ----------------- | -------------------- | ---------------------- | ----------------- | ---------: | -------------------------------------------- | -------------- |
| `geo-l04-t01-q01` | `single-choice`      | `congruence-cases`     | `basic`           |          1 | —                                            | 17             |
| `geo-l04-t01-q02` | `true-false-justify` | `congruence-cases`     | `basic`           |          2 | —                                            | 17, 18         |
| `geo-l04-t01-q03` | `single-choice`      | `congruence-cases`     | `basic`           |          1 | —                                            | 18             |
| `geo-l04-t01-q04` | `numeric`            | `kite-isosceles`       | `basic`           |          1 | —                                            | 17, 19         |
| `geo-l04-t01-q05` | `single-choice`      | `right-triangle-cases` | `basic`           |          1 | —                                            | 19             |
| `geo-l04-t01-q06` | `single-choice`      | `congruence-cases`     | `medium`          |          1 | `test-l04-q06-corresponding-triangles`       | 17, 18         |
| `geo-l04-t01-q07` | `true-false-justify` | `right-triangle-cases` | `medium`          |          2 | —                                            | 18, 19         |
| `geo-l04-t01-q08` | `multi-select`       | `proofs-reasoning`     | `medium`          |          1 | `test-l04-q08-parallelogram-diagonal`        | 18             |
| `geo-l04-t01-q09` | `numeric`            | `kite-isosceles`       | `medium`          |          1 | —                                            | 18, 19         |
| `geo-l04-t01-q10` | `matching`           | `congruence-cases`     | `medium`          |          3 | —                                            | 17, 18         |
| `geo-l04-t01-q11` | `classification`     | `proofs-reasoning`     | `medium`          |          1 | —                                            | 17, 18, 19     |
| `geo-l04-t01-q12` | `ordering`           | `proofs-reasoning`     | `medium`          |          3 | —                                            | 18, 19         |
| `geo-l04-t01-q13` | `single-choice`      | `kite-isosceles`       | `medium`          |          1 | `test-l04-q13-kite-diagonal`                 | 18, 19         |
| `geo-l04-t01-q14` | `exact`              | `right-triangle-cases` | `advanced`        |          1 | —                                            | 17, 19         |
| `geo-l04-t01-q15` | `single-choice`      | `right-triangle-cases` | `advanced`        |          1 | `test-l04-q15-right-triangle-correspondence` | 17, 19         |
| `geo-l04-t01-q16` | `error-analysis`     | `congruence-cases`     | `advanced`        |          3 | —                                            | 17, 18         |
| `geo-l04-t01-q17` | `single-choice`      | `proofs-reasoning`     | `advanced`        |          1 | `test-l04-q17-vertical-angle-triangles`      | 17, 18         |
| `geo-l04-t01-q18` | `multi-select`       | `right-triangle-cases` | `advanced`        |          1 | —                                            | 17, 19         |
| `geo-l04-t01-q19` | `error-analysis`     | `congruence-cases`     | `thinking`        |          3 | —                                            | 17, 18         |
| `geo-l04-t01-q20` | `true-false-justify` | `kite-isosceles`       | `thinking`        |          2 | —                                            | 17, 18, 19     |
| **Total**         | **20 questions**     | **7 / 5 / 4 / 4**      | **5 / 8 / 5 / 2** |     **31** | **5 SVG figures**                            | **pp. 17–19**  |
