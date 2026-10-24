# Unit 2, Lesson 2 — Pedagogical, Assessment & Test Coverage Matrix

## 1. Lesson Step Sequence (`src/content/units/lesson-09-steps.ts`)

| #   | Step ID                            | Origin     | Source Page | Purpose                                                                                                                                                |
| --- | ---------------------------------- | ---------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | `l9-step-a01-orientation`          | `authored` | —           | Contrasts Lesson 1 (two midpoints $\Rightarrow$ parallel + half-length) with Lesson 2 (one midpoint + parallel $\Rightarrow$ midpoint of third side)   |
| 2   | `l9-step-01-activity`              | `source`   | `34`        | Verbatim Salim investigation (`نشاط`), 3-panel figure, and Questions 1–2                                                                               |
| 3   | `l9-step-a02-lab-and-proof`        | `authored` | —           | Interactive `ParallelMidpointLab` + complete 5-step proof using Lesson 1 + uniqueness of the parallel                                                  |
| 4   | `l9-step-02-theorem`               | `source`   | `34`        | Verbatim `تعلّم` theorem box, worked example (`fig-l9-example-ij`), and 3-step method checklist                                                        |
| 5   | `l9-step-a03-method-guide`         | `authored` | —           | Reading given vs. proven diagram marks, symbolic summary, and Theorem 1 vs. Theorem 2 comparison table                                                 |
| 6   | `l9-step-03-knowledge`             | `source`   | `35`        | Verbatim `اكتساب معارف` sub-triangle problem, figure (`fig-l9-knowledge-amb`), and 2 printed hints                                                     |
| 7   | `l9-step-04-knowledge-solution`    | `source`   | `35`        | Verbatim printed proof + transparent editorial note on the p. 35 printing carryover clause                                                             |
| 8   | `l9-step-a04-subtriangle-strategy` | `authored` | —           | Sub-triangle selection (`AMB` vs `ABC`) and hidden-hypothesis bridges (perpendiculars $\Rightarrow$ parallel; central symmetry $\Rightarrow$ midpoint) |
| 9   | `l9-step-05-check`                 | `source`   | `35`        | Verbatim `تحقّق من فهمك` ① & ② with figures and printed perpendiculars reminder                                                                        |
| 10  | `l9-step-06-practice`              | `source`   | `35`        | Verbatim `تدرّب` ① (parts 1–2) & ② with collapsible self-check starter constructions                                                                   |
| 11  | `l9-step-a05-recap`                | `authored` | —           | Midpoint-proving decision table and pre-assessment self-check                                                                                          |

---

## 2. Printed Prompts $\leftrightarrow$ Teacher Area Solutions Parity (`9 / 9`)

Every prompt in `L9_PRINTED_PROMPTS` (`src/content/units/lesson-09-questions.ts`) maps 1-to-1 in page order to `lesson09TeacherResources.textbookSolutions` (`src/content/units/lesson-09-teacher.ts`):

1. `sol-p34-act-q1` — p. 34 Activity Q1 (why Salim's freehand line $(d)$ missed the midpoint)
2. `sol-p34-act-q2` — p. 34 Activity Q2 (rigorous proof via midpoint $N$, midline $(d')$, and parallel uniqueness)
3. `sol-p34-learn-example` — p. 34 Learn worked example ($I \in [AB]$, $(IJ) \parallel (BC) \Rightarrow J = \text{mid}(AC)$)
4. `sol-p35-knowledge-example` — p. 35 Acquire Knowledge example ($\triangle AMB$ sub-triangle proof + isolated diagram)
5. `sol-p35-check-1` — p. 35 Check ① ($E = \text{mid}(AC)$, $(EF) \parallel (AB) \Rightarrow F = \text{mid}(BC)$, ignoring distractor cevians)
6. `sol-p35-check-2` — p. 35 Check ② (right angle at $B$ + $(MN) \perp (AB) \Rightarrow (MN) \parallel (BC) \Rightarrow N = \text{mid}(AC)$)
7. `sol-p35-practice-1-p1` — p. 35 Practice ① Part 1 (central symmetry construction + solved diagram)
8. `sol-p35-practice-1-p2` — p. 35 Practice ① Part 2 (proof that $K = \text{mid}(IT)$ in $\triangle IST$)
9. `sol-p35-practice-2` — p. 35 Practice ② (construction + proof that $P = \text{mid}(MJ)$ in $\triangle JAM$)

---

## 3. Dedicated 20-Question Lesson Test (`lesson-09-test`, 33 Engine Points)

| ID    | Type                 | Difficulty | Concept Tag                  | Pts | Cognitive Focus                                                                               |
| ----- | -------------------- | ---------- | ---------------------------- | --- | --------------------------------------------------------------------------------------------- |
| `q01` | `single-choice`      | `basic`    | `second-midline-theorem`     | 1   | Direct conclusion of the Second Midline Theorem                                               |
| `q02` | `true-false-justify` | `basic`    | `second-midline-theorem`     | 2   | Rejecting missing-parallelism fallacy + selecting required condition                          |
| `q03` | `true-false`         | `basic`    | `proof-and-salim-activity`   | 1   | Explaining Salim's freehand inaccuracy on p. 34                                               |
| `q04` | `single-choice`      | `basic`    | `second-midline-theorem`     | 1   | Identifying the correct third side bisected by the parallel                                   |
| `q05` | `numeric`            | `basic`    | `perpendicular-and-symmetry` | 1   | Direct half-length calculation after midpoint deduction                                       |
| `q06` | `numeric`            | `medium`   | `perpendicular-and-symmetry` | 1   | Doubling half-segment to find full third side                                                 |
| `q07` | `single-choice`      | `medium`   | `proof-and-salim-activity`   | 1   | Role of parallel uniqueness through $M$ in proving $(d) = (d')$                               |
| `q08` | `true-false-justify` | `medium`   | `perpendicular-and-symmetry` | 2   | Right-triangle perpendicular bridge $\Rightarrow$ parallel $\Rightarrow$ midpoint             |
| `q09` | `fill-in`            | `medium`   | `second-midline-theorem`     | 2   | Completing the two hypotheses of the Second Midline Theorem                                   |
| `q10` | `exact`              | `medium`   | `perpendicular-and-symmetry` | 1   | Rational hypotenuse half-length ($13/2\,\text{cm}$) from audited figure (`Cat. B`)            |
| `q11` | `multi-select`       | `medium`   | `subtriangle-applications`   | 1   | Selecting all valid deductions in Check ① configuration with interior cevians                 |
| `q12` | `ordering`           | `medium`   | `proof-and-salim-activity`   | 4   | Ordering the 4 logical steps of the Second Midline Theorem proof                              |
| `q13` | `single-choice`      | `medium`   | `subtriangle-applications`   | 1   | Selecting the extended triangle $IST$ in Practice ① central symmetry                          |
| `q14` | `numeric`            | `advanced` | `perpendicular-and-symmetry` | 1   | Multi-step length chain combining Practice ① central symmetry + Theorem 2                     |
| `q15` | `classification`     | `advanced` | `second-midline-theorem`     | 1   | Classifying 4 triangle setups into Theorem 1, Theorem 2, or insufficient data                 |
| `q16` | `matching`           | `advanced` | `subtriangle-applications`   | 4   | Dual sub-triangle matching ($\triangle AMB$ & $\triangle AMC$) from audited figure (`Cat. A`) |
| `q17` | `matching`           | `advanced` | `subtriangle-applications`   | 3   | Matching 3 composite configurations to their exact target triangles                           |
| `q18` | `multi-select`       | `advanced` | `proof-and-salim-activity`   | 1   | Valid geometric tools for proving a midpoint across pages 34–35                               |
| `q19` | `error-analysis`     | `thinking` | `subtriangle-applications`   | 3   | Detecting, correcting, and justifying the $\triangle ABC$ vs $\triangle AMB$ proof error      |
| `q20` | `single-choice`      | `thinking` | `subtriangle-applications`   | 1   | Chained two-application reasoning ($D \to E \to F$) in an unfamiliar scalene setup            |
