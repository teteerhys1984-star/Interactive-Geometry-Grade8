# Unit 2, Lesson 2 — Verbatim Textbook Source Audit (`موازٍ لضلع من منتصف ضلع آخر`)

## 1. Source Identity

| Field                         | Value                                                   |
| ----------------------------- | ------------------------------------------------------- |
| Unit                          | الوحدة الثانية — مثلثات ومنصفات أضلاع ومستقيمات متوازية |
| Lesson Position in Unit 2     | الدرس الثاني (`2`)                                      |
| Platform Lesson ID            | `lesson-09-parallel-from-midpoint`                      |
| Official Printed Arabic Title | `موازٍ لضلع من منتصف ضلع آخر`                           |
| Verified Textbook Pages       | `34` and `35`                                           |
| Primary Theorem               | `المبرهنة الثانية في المنتصفات`                         |

---

## 2. Page-by-Page Inventory

### Page 34 (`صفحة 34`)

1. **Header**: `2 موازٍ لضلع من منتصف ضلع آخر`
2. **`نشاط` — تمهيد خاصة المستقيم المار بمنتصف ضلع موازياً ضلعاً آخر**:
   - Setup paragraph 1: Salim constructs triangle $ABC$, marks $M$ midpoint of $[AB]$, and draws line $(d)$ freehand ("يدوياً") intending it to be parallel to $[BC]$, cutting $[AC]$ at $P$.
   - Three printed panels (`①`, `②`, `③`) showing:
     - `①`: $\triangle ABC$ with $M$ midpoint of $[AB]$ (double ticks).
     - `②`: Freehand red line $(d)$ through $M$ cutting $[AC]$ at $P$ (above the true midpoint).
     - `③`: Midpoint $N$ of $[AC]$ (single ticks) and green line $(d') = (MN)$ diverging from $(d)$.
   - Setup paragraph 2: Salim tests whether $P$ is the midpoint of $[AC]$ by marking $N$ midpoint of $[AC]$ and drawing $(d')$ through $M$ and $N$, observing $(d') \neq (d)$.
   - Question `1`: «اشرح لماذا أخطأ سليم في رسم المستقيم $(d)$.»
   - Question `2`: «صغ إثباتاً، بلغة سليمة وأسلوب شيق لإثبات أنَّ: المستقيم المار بمنتصف ضلع في المثلث موازياً ضلعاً آخر، يقطع الضلع الثالثة في منتصفه.»
3. **`تعلّم` — المبرهنة الثانية في المنتصفات**:
   - Statement: «المستقيم المار بمنتصف أحد أضلاع مثلث موازياً ضلعاً آخر، يقطع الضلع الثالثة في منتصفه.»
   - Worked example (`مثال في الشكل المرافق`) on $\triangle ABC$ with $I$ midpoint of $[AB]$ and $(IJ) \parallel (BC)$ $\Longrightarrow$ $J$ midpoint of $[AC]$.
   - Method box (`لاستعمال المبرهنة الثانية في المنتصفات، يجب:`):
     1. تحديد المثلث الذي نطبق عليه المبرهنة.
     2. تحديد منتصف أحد أضلاعه والمستقيم المار بهذا المنتصف موازياً ضلعاً آخر.
     3. استنتاج « إذن النقطة .... هي منتصف الضلع الثالث .... »

### Page 35 (`صفحة 35`)

1. **`اكتساب معارف` — كيف نثبت وقوع نقطة في منتصف قطعة مستقيمة ؟**:
   - Worked example prompt: $\triangle ABC$, $M \in [BC]$, $R$ midpoint of $[AM]$, line $(d)$ through $R$ parallel to $(BC)$ cutting $[AB]$ at $S$; prove $S$ is midpoint of $[AB]$.
   - Accompanied by schematic figure (`fig-l9-knowledge-amb`) and two guidance bullets (`إرشاد`) contrasting triangle-midpoint proof vs. parallelogram-diagonals proof.
   - Printed `الحل` applying the Second Midline Theorem to sub-triangle $AMB$.
2. **Documented Printing Erratum on Page 35 (`تنبيه تحريري موثّق`)**:
   - At the end of the printed `الحل` paragraph on page 35, the scan carries an extraneous trailing clause:
     > `فالمستقيمان (OB) و (AI) متوازيان.`
   - This clause is an accidental typesetting carryover from the final line of page 33 (Unit 2, Lesson 1's `اكتساب معارف` solution, where points $O$ and $I$ exist). Neither $O$ nor $I$ exists in page 35's problem.
   - Handling in `lesson-09-questions.ts` / `lesson-09-steps.ts` / `lesson-09-teacher.ts`:
     - `L9_KNOWLEDGE_SOLUTION` preserves the exact valid proof ending at `أي إنَّ النقطة $S$ هي منتصف $[AB]$.`
     - `L9_KNOWLEDGE_ERRATUM_CLAUSE` records the carryover verbatim and documents it transparently in `step04KnowledgeSolution.source.note`, a collapsible student note, and Teacher Area notes.
3. **`تحقّق من فهمك`**:
   - Exercise `①`: $\triangle ABC$, $E$ midpoint of $[AC]$, $F \in [BC]$ with $(EF) \parallel (AB)$ (figure also draws interior segments $[AF]$ and $[BE]$); prove $F$ midpoint of $[BC]$.
   - Exercise `②`: Right triangle $ABC$ at $B$, $M$ midpoint of $[AB]$, $(MN) \perp (AB)$; prove $N$ midpoint of $[AC]$.
   - Printed reminder (`تذكر`): «العمودان على مستقيم واحد متوازيان.»
4. **`تدرّب` (unillustrated construction + proof exercises)**:
   - Exercise `①` (parts `1.` and `2.`): $\triangle IJK$, $S$ symmetric of $I$ about center $J$, line through $S$ parallel to $(JK)$ meets $(IK)$ at $T$; construct figure and prove $K$ midpoint of $[IT]$.
   - Exercise `②`: $\triangle AJP$, $C$ midpoint of $[AJ]$, line through $A$ parallel to $(CP)$ cuts $(JP)$ at $M$; construct figure and prove $P$ midpoint of $[MJ]$.
