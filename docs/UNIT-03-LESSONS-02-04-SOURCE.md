# Unit 3 · Lessons 2–4 — source map and fidelity audit (pages 56–63)

This is the Phase-1 source map for the three remaining teaching lessons of
Unit 3 «مستقيمات مميزة في المثلث». The eight supplied scans are the sole source
of truth. Page boundaries are strict:

| Lesson | Repository id                 | Printed title     | Pages | Scans          |
| ------ | ----------------------------- | ----------------- | ----- | -------------- |
| 2      | `lesson-14-triangle-altitude` | ارتفاع مثلث       | 56–58 | images 1, 2, 3 |
| 3      | `lesson-15-triangle-median`   | المتوسط في المثلث | 59–61 | images 4, 5, 6 |
| 4      | `lesson-16-angle-bisector`    | منصّف زاوية مثلث  | 62–63 | images 7, 8    |

The Unit 3 exercises section is **out of scope** and is not touched here.

Every figure is reconstructed as a platform drawing (`origin: 'authored'`,
renderer `midline-figure`) whose caption states it is a schematic, unmeasured
redraw with computationally verified relations — the same convention as
Lesson 13 (`docs/UNIT-03-LESSON-01-FIGURES.md`). Coordinates live in each
lesson's `lesson-NN-geometry.ts` and are re-derived by its geometry test.

---

## Lesson 2 — «ارتفاع مثلث» (pages 56–58)

### Page 56 (image 1)

- **نشاط** subtitle: «ملاحظة ثم تأكيد أنّ ارتفاعات المثلث متلاقية».
- **1 تعبير**: «في كل من الحالات الآتية، ارسم مثلثًا $ABC$ وارسم ارتفاعاته
  المتعلقة بأضلاعه الثلاثة. ماذا تلاحظ؟»
  1. المثلث $ABC$ حاد الزوايا.
  2. في المثلث $ABC$ زاوية منفرجة.
  3. في المثلث $ABC$ زاوية قائمة.
- **2 إثبات**: «في الشكل المرافق ثلاثة مستقيمات مارّة برؤوس المثلث $ABC$
  متلاقية في $M$ و $N$ و $P$ وكل منها يوازي الضلع المقابل.»
  1. ارسم الشكل لديك.
  2. لماذا كل من الرباعيين $MACB$ و $BACN$ هو متوازي أضلاع؟ اشرح، إذن، لماذا
     $MA = AP$؟ ماذا تستنتج فيما يتعلق بالنقطة $A$؟
  3. بطريقة مماثلة، ماذا تستنتج فيما يتعلق بكل من النقطتين $B$ و $C$؟
  4. ارسم محاور أضلاع المثلث $MNP$. ارمز إلى نقطة تلاقيها بالرمز $H$.
  5. ماذا تعني تلك المحاور بالنسبة إلى المثلث $ABC$؟
  - «اشرح إجابتك، ثم اكتب نصًّا لخاصة بارتفاعات مثلث.»
  - **Figure (proof):** triangle $ABC$ (blue fill), with the line through $A$
    parallel to $[BC]$ meeting the line through $B$ (parallel to $[AC]$) at $M$
    and the line through $C$ (parallel to $[AB]$) at $P$; the lines through $B$
    and $C$ meet at $N$. Order on the top line: $M, A, P$. $N$ below.
- **تعلّم — تعريف ارتفاع المثلث**: «هو المستقيم المار بأحد رؤوسه والعمودي على
  الضلع المقابل لهذا الرأس.»
  - 💡 «في الشكل المرسوم جانبًا: نقول إنّ النقطة $P$ هي موقع الارتفاع $(d)$
    المرسوم من $A$، وهي مسقط $A$ على $(BC)$. ونقول أحيانًا إنّ القطعة المستقيمة
    $[AP]$ هي الارتفاع المرسوم من $A$ للمثلث $ABC$.»
  - **Figure (definition):** triangle $ABC$, red line $(d)$ through $A$
    perpendicular to $(BC)$ at foot $P$, right-angle square at $P$.

### Page 57 (image 2)

- **خاصة وتعريف**: «الارتفاعات الثلاثة في المثلث تلتقي في نقطة واحدة $H$.»
  - **Three panels** (printed right→left): acute (H inside), obtuse in
    $\widehat{A}$ (H outside, above $A$), right in $\widehat{A}$ (H at $A$).
    Each shows the three red altitudes and right-angle squares at the feet.
- **اكتساب معارف**: «كيف نحدد نقطة تلاقي ارتفاعات مثلث (مركز تعامد المثلث)؟»
  - «لتحديد نقطة تلاقي ارتفاعات مثلث، يكفي رسم ارتفاعين له. فتكون نقطة تقاطعهما
    هي نقطة تلاقي ارتفاعات هذا المثلث.»
- **مثال 1**: «ارسم مثلثًا $ABC$ زاويته $\widehat{A}$ منفرجة، مثل المثلث المرسوم
  جانبًا. ارسم نقطة تلاقي ارتفاعاته $H$.»
  - 💡 «لرسم الارتفاع من الرأس $B$، نمدّد نصف المستقيم $[CA)$.»
  - **الحل**: «نرسم ارتفاعي المثلث من $A$ و $B$ فيتقاطعان في نقطة $H$، هي نقطة
    تلاقي الارتفاعات. (لاحظ أنّ $H$ تقع خارج المثلث $ABC$).»
  - **Figure (example given):** obtuse triangle, $B$ top-left, $C$ top-right,
    $A$ below. **Figure (solution):** altitude from $A$ ⟂ $(BC)$; altitude from
    $B$ ⟂ $(CA)$ extended beyond $A$ (dashed); they meet at $H$ below $A$.
- **مثال 2**: «$[AL]$ و $[CK]$ ارتفاعان في المثلث $ABC$. $H$ هي نقطة تلاقي
  ارتفاعات هذا المثلث. أين تقع نقطة تلاقي ارتفاعات المثلث $AHC$؟ اشرح إجابتك.»
  - 💡 «لتحديد نقطة تلاقي ارتفاعات مثلث $AHC$ نبحث عن ارتفاعين لهذا المثلث.»
  - (No figure on p.57; the solution figure is on p.58.)

### Page 58 (image 3)

- **الحل (مثال 2)**: «في المثلث $AHC$: $(CH)$ و $(AB)$ متعامدان، إذن $[AB]$ هو
  الارتفاع المرسوم من $A$. $(AH)$ و $(CB)$ متعامدان، إذن $[CB]$ هو الارتفاع
  المرسوم من $C$. هذان الارتفاعان متقاطعان في $B$، فنقطة تلاقي ارتفاعات المثلث
  $AHC$ هي النقطة $B$.»
  - **Figure:** triangle $ABC$, altitude $[AL]$ (foot $L$ on $BC$), altitude
    $[CK]$ (foot $K$ on $AB$), meeting at $H$; right angles at $L$ and $K$.
- **تحقّق من فهمك**: «ارسم مثلثًا $ABC$ بحيث يكون $\widehat{B} = 120^\circ$ و
  $BA = 5\ \text{cm}$ و $BC = 4\ \text{cm}$. ثم عين على الرسم نقطة تلاقي ارتفاعات
  هذا المثلث.»
- **تدرّب**:
  - ① «ارسم مثلثًا $ABC$ وارسم نقطة تلاقي ارتفاعاته $H$. ما نقطة تلاقي ارتفاعات
    كل من المثلثات $AHB$ و $AHC$ و $BHC$؟»
  - ② «في الشكل المجاور، $[BE]$ و $[CF]$ ارتفاعان في المثلث $ABC$. النقطة $J$ هي
    نقطة تلاقي ارتفاعات المثلث $ABC$. ما نقطة تلاقي ارتفاعات المثلث $AJB$؟ اشرح
    إجابتك.»
    - **Figure:** triangle $ABC$, $E$ on $AC$, $F$ on $AB$, altitudes $[BE]$,
      $[CF]$ meeting at $J$; segment $[AJ]$ drawn; right angles at $E$, $F$.
  - ④ «$ABCD$ مستطيل مركزه $O$. العمود المرسوم من $O$ على $(AC)$ يلاقي $(DC)$ في
    $N$ و $(AD)$ في $M$.
    1. ارسم شكلاً متفقًا مع معطيات النص.
    2. ما نقطة تلاقي ارتفاعات المثلث $AMC$؟
    3. ارسم الارتفاع الثالث لهذا المثلث.»
    - (No figure printed; the student draws it.)

### Lesson 2 — reading notes (nothing silently repaired)

1. **Printed numbering skips ③.** «تدرّب» items are labelled ①, , ④ in the
   source. The platform keeps the printed labels ①, ②, ④ verbatim.
2. **Proof quadrilaterals.** The source names $MACB$ and $BACN$ and asks to
   deduce $MA = AP$. $MACB$ gives $MA = BC$; the parallelogram that gives
   $AP = BC$ is $ABCP$ (same argument). $BACN$ gives $BN = AC$, which serves
   point $B$ (question 3). The platform reproduces the printed names verbatim
   and, in the derived solution, states the complete chain explicitly
   ($MACB \Rightarrow MA = BC$, $ABCP \Rightarrow AP = BC$, hence $MA = AP$;
   $BACN \Rightarrow BN = AC$ for $B$). This is a documented reading note, not a
   guessed correction; no printed word is altered.
3. **Definition foot letter.** The definition figure uses $P$ for the foot of
   the altitude from $A$; this is independent of the proof figure's $P$.
4. **Practice ④ rectangle.** With $A=(0,0), B=(a,0), C=(a,b), D=(0,b)$, $a>b$,
   the perpendicular from $O$ to $(AC)$ meets $(DC)$ at $N$ (on the segment) and
   $(AD)$ at $M$ (beyond $D$). The orthocenter of $AMC$ is $N$; the third
   altitude is the line $(AN)$ ⟂ $(MC)$. Verified in the geometry test.

### Lesson 2 — mathematical verification record

- Altitude from a vertex = line through the vertex ⟂ opposite side (computed as
  a perpendicular foot / direction).
- Concurrence: the three altitude lines meet at one point $H$ (orthocenter),
  computed as a line intersection; verified for acute (inside), obtuse (outside)
  and right (at the right-angle vertex) triangles.
- Proof figure: $M,A,P$ collinear with $A$ the midpoint of $[MP]$; $B$ midpoint
  of $[MN]$; $C$ midpoint of $[NP]$; the perpendicular bisectors of $MNP$ are
  exactly the altitudes of $ABC$; their concurrence $H$ is the circumcenter of
  $MNP$. All verified arithmetically.
- Example 2 / practice ①②: orthocenter of $AHC$ is $B$; of $AHB$ is $C$; of
  $BHC$ is $A$; of $AJB$ is $C$. Verified by perpendicularity of the relevant
  lines.

---

## Lesson 3 — «المتوسط في المثلث» (pages 59–61)

### Page 59 (image 4)

- **نشاط** subtitle: «ملاحظة ثم تأكيد أنّ متوسطات المثلث متلاقية».
- **معنى الكلمات**: «المتوسط المرسوم من $A$ في المثلث $ABC$، هو المستقيم المار
  بالنقطة $A$ ومنتصف الضلع المقابل $[BC]$.»
  - **Figure:** triangle $ABC$, red line through $A$ and the midpoint of $[BC]$
    (double ticks on both halves).
- **1 اختبار**:
  1. ارسم المثلثين $ABC$ و $EFJ$.
  2. ارسم المتوسطات الثلاثة لكل منهما.
  3. ماذا تلاحظ؟
  - **Figure:** two unlabelled triangles (left acute, right obtuse). The text
    names them $ABC$ and $EFJ$; the platform labels the solution figures
    accordingly (documented editorial assignment).
- **2 إثبات**: «$ABC$ مثلث، $I$ و $J$ منتصفا ضلعيه $[AC]$ و $[AB]$. نرمز إلى نقطة
  تقاطع متوسطيه $(BI)$ و $(CJ)$ بالرمز $G$. سنستعرض إثباتًا لكون $(AG)$ هو
  المتوسط الثالث لهذا المثلث.»
  1. ارسم الشكل المرافق.
  2. ارسم النقطة $D$ صورة $A$ وفق التناظر الذي مركزه $G$. ارمز إلى نقطة تقاطع
     $(AD)$ و $(BC)$ بالرمز $K$.
  3. في المثلث $ABD$، لماذا يمكن تأكيد أنّ $(BD) \parallel (JG)$؟ وتأكيد أنّ
     $BD = 2JG$؟
  4. ما القضايا التي يمكن تأكيدها في المثلث $(ACD)$ بمثل ما أكدت في المثلث
     $ABD$؟
  5. ما طبيعة الرباعي $BGCD$؟ اشرح إجابتك، ثم استنتج أنّ $(AK)$ هو المتوسط
     الثالث في المثلث $ABC$.
  6. اشرح لماذا: $BG = 2GI$ و $CG = 2GJ$ و $AG = 2GK$.
  7. اكتب الخواص التي اكتشفتها والمتعلقة بمتوسطات المثلث ونقطة تلاقيها.
  - **Figure:** triangle $ABC$, $J$ on $AB$ (single ticks), $I$ on $AC$ (double
    ticks), red medians $BI$, $CJ$ meeting at $G$.
- **معنى الكلمات (physics box)**: «في الفيزياء تسمى $G$ نقطة تلاقي متوسطات
  المثلث «مركز ثقل المثلث». إذا علقت صفيحة مثلثية متجانسة، من نقطة منها فإنّ
  الشاقول المار بنقطة التعليق يمر بالنقطة $G$.»
  - **Photo:** a suspended triangular plate with a plumb line through $G$.
    Reconstructed as an authored schematic (triangle hung from $A$, vertical
    plumb line through $A$ and $G$), captioned as a teaching redraw.

### Page 60 (image 5)

- **تعلّم — تعريف المتوسط**: «هو المستقيم المار بأحد رؤوس المثلث ومنتصف الضلع
  المقابل لهذا الرأس.»
  - 💡 «في الشكل المرسوم جانبًا، نقول إنّ القطعة المستقيمة $[AM]$ هي المتوسط
    المرسوم من $A$ في المثلث $ABC$.»
  - **Figure:** triangle $ABC$, red median $[AM]$, $M$ midpoint of $[BC]$
    (double ticks).
- **خاصة وتعريف**: «المتوسطات الثلاثة في المثلث تلتقي في نقطة واحدة $G$. تسمى هذه
  النقطة مركز ثقل المثلث.»
- **خواص**: «نقطة تلاقي متوسطات المثلث $ABC$، ولتكن $G$، تقع في نهاية الثلث
  الثاني لكل من المتوسطات $[AA']$ و $[BB']$ و $[CC']$، أي إنّ:
  $AG = \frac{2}{3}AA'$ و $BG = \frac{2}{3}BB'$ و $CG = \frac{2}{3}CC'$.»
  - **Figure:** triangle $ABC$, midpoints $A'\in BC$ (double ticks),
    $B'\in AC$, $C'\in AB$; red medians $AA'$, $BB'$, $CC'$ meeting at $G$.
- **اكتساب معارف**: «كيف نرسم مركز ثقل مثلث؟» — «لرسم مركز ثقل مثلث، يكفي رسم
  متوسطين فيه. نقطة تقاطعهما هي مركز الثقل.»
- **مثال**: «في المثلث $ABC$ المرسوم جانبًا: النقطة $M$ هي منتصف $[BC]$،
  $G \in [AM]$، $AG = 2.4\ \text{cm}$ و $GM = 1.2\ \text{cm}$. اشرح لماذا $G$ هي
  مركز ثقل المثلث $ABC$.»
  - 💡 «مركز ثقل المثلث هو النقطة الواقعة في نهاية الثلث الثاني من أحد
    المتوسطات بدءًا من رأس المثلث.»
  - **الحل**: «$M$ هي منتصف $[BC]$، إذن $[AM]$ هو متوسط في المثلث $ABC$.
    $AG = 2.4 = 2 \times 1.2 = 2GM$، أي إنّ $AG = \frac{2}{3}AM$. وبهذا تكون $G$
    مركز ثقل المثلث.»
  - **Figure:** triangle $ABC$, median $[AM]$, $G$ on $[AM]$.

### Page 61 (image 6)

- **مثال**: «$ABCD$ متوازي أضلاع مركزه $O$. النقطة $M$ هي منتصف $[AB]$، و $G$ هي
  نقطة تقاطع $(CM)$ و $(BD)$. اشرح لماذا $G$ هي مركز ثقل المثلث $ABC$.»
  - 💡 «مركز ثقل المثلث هو نقطة تقاطع إثنين من متوسطاته.»
  - **الحل**: «في المثلث $ABC$: $M$ هي منتصف $[AB]$، إذن $[CM]$ متوسط في هذا
    المثلث. $O$ هي منتصف $[AC]$، لأنّ قطري متوازي الأضلاع $[BD]$ و $[AC]$
    متناصفان في $O$، إذن $[BO]$ متوسط آخر في هذا المثلث. $G$ هي نقطة تقاطع
    المتوسطين $[CM]$ و $[BO]$ في المثلث $ABC$، فهو مركز ثقله.»
  - **Figure:** parallelogram $ABCD$ ($D$ top-left, $C$ top-right, $A$
    bottom-left, $B$ bottom-right), center $O$, $M$ midpoint of $[AB]$ (double
    ticks), $G = CM \cap BD$.
- **تحقّق من فهمك**: «ارسم مثلثًا $ABC$ فيه $AB = 7\ \text{cm}$ و
  $\widehat{A} = 70^\circ$ و $AC = 8\ \text{cm}$. ثم ارسم مركز ثقل هذا المثلث.»
- **تدرّب ①**: «في كل من الحالتين ① و ② الآتيتين اشرح لماذا $G$ هي مركز ثقل
  المثلث $ABC$.
  - ① النقطة $M$ هي منتصف الضلع $[BC]$ في المثلث $ABC$. $G \in [AM]$ وتحقق
    $AG = 3.4\ \text{cm}$ و $GM = 1.7\ \text{cm}$.
  - ② $AMCI$ متوازي أضلاع مركزه $J$. النقطة $I$ هي منتصف القطعة $[AB]$ و $G$ هي
    نقطة تقاطع المستقيمين $(BJ)$ و $(CI)$.»
  - **Figure ①:** $A$ left, $C$ top-right, $B$ bottom-right, $M$ midpoint of
    $[BC]$, $G$ on $[AM]$ with $AG=3.4$, $GM=1.7$ cm.
  - **Figure ②:** parallelogram $AMCI$ ($C$ top-left, $M$ top-right, $A$
    bottom-right, $I$ on $[BA]$), center $J$, $I$ midpoint of $[AB]$ (double
    ticks), $G = BJ \cap CI$.

### Lesson 3 — reading notes

1. **Proof question 3** prints $(BD) \parallel (JG)$ and $BD = 2JG$ (midsegment
   of triangle $ABD$). Confirmed at high zoom; it is $JG$, not $IG$.
2. **Midpoint marks on the properties figure (p.60):** the source marks the
   halves of $[AB]$ with a single stroke, the halves of $[AC]$ with a small
   cross, and the halves of $[BC]$ with a double stroke — three distinct marks
   so no cross-side equality is implied. The platform's tick vocabulary
   expresses the same distinction with 1 / 3 / 2 ticks respectively (documented
   editorial adaptation; the meaning — each side is bisected — is unchanged).
3. **Test triangles (p.59)** are printed without labels; labels $ABC$, $EFJ$
   come from the text and are applied only in solution figures.

### Lesson 3 — mathematical verification record

- Median from a vertex = line through the vertex and the midpoint of the
  opposite side.
- Centroid $G$ = average of the three vertices; concurrence of the three
  medians verified; $AG = \frac23 AA'$, $BG = \frac23 BB'$, $CG = \frac23 CC'$
  verified (equivalently $AG = 2GA'$, etc.).
- Proof: $D$ = reflection of $A$ in $G$; $JG \parallel BD$, $BD = 2JG$;
  $IG \parallel CD$, $CD = 2IG$; $BGCD$ a parallelogram; $K = AD \cap BC$ is the
  midpoint of $[BC]$; $AG = 2GK$, $BG = 2GI$, $CG = 2GJ$. All verified.
- Example p.61: $G = CM \cap BD$ is the centroid of $ABC$ (two medians).
- Practice ①: $AG = 2GM$ ⇒ centroid. Practice ②: $J$ midpoint of $[AC]$ ⇒ $BJ$
  median; $CI$ median; $G$ their intersection ⇒ centroid. Verified.

---

## Lesson 4 — «منصّف زاوية مثلث» (pages 62–63)

### Page 62 (image 7)

- **نشاط** subtitle: «ملاحظة ثم تأكيد أنّ منصفات زوايا المثلث متلاقية».
- **1 اختبار**:
  1. ارسم المثلثين $ABC$ و $EFJ$.
  2. ارسم منصفات الزوايا الثلاث في كل منهما. ماذا تلاحظ؟
  - **Figure:** two labelled triangles ($ABC$ left; $EFJ$ right, $E$ top-left,
    $F$ top-right, $J$ bottom).
- **2 إثبات**: «$ABC$ مثلث، $(d_1)$ و $(d_2)$ منصّفا زاويتيه $\widehat{B}$ و
  $\widehat{C}$. نرمز إلى نقطة تقاطع $(d_1)$ و $(d_2)$ بالرمز $I$. سنستعرض
  إثباتًا لكون $(AI)$ هو منصف الزاوية $\widehat{A}$.»
  1. ارسم الشكل المرافق.
  2. ارسم النقطة $L$ مسقط $I$ على $(BC)$. وضَع على $[BA]$ نقطة $H$ تحقق
     $BH = BL$.
  3. لماذا $(BI)$ هو محور تناظر للمثلث $BHL$؟ ولماذا هو محور ضلعه $[HL]$؟
     استنتج أنّ $IH = IL$ وأنّ $\widehat{IHB} = 90^\circ$.
  4. وضَع على $[AC]$ نقطة $K$ تحقق $CK = CL$. أثبت أنّ $IK = IL$ وأنّ
     $\widehat{IKC} = 90^\circ$.
  5. ما صفة النقطة $I$ في المثلث $HKL$؟ (سنقبل أنّ $AH = AK$، وإثبات ذلك هو حسب
     مبرهنة سترد في الفصل التالي). بعد هذا، بما يمكن أن نصف المستقيم $(AI)$
     بالنسبة إلى القطعة المستقيمة $[HK]$؟
  6. اشرح، إذن، لماذا $(AI)$ هو منصف الزاوية $\widehat{A}$؟
  7. ارسم الدائرة $\mathcal{C}$ التي مركزها $I$، والمارّة بالنقطة $L$.
  - 💡 «سنجد في وحدة قادمة، أنّ الدائرة $\mathcal{C}$ تمس داخلاً أضلاع $ABC$ في
    النقاط $L$ و $H$ و $K$ وتسمى الدائرة الماسة لأضلاع المثلث داخلاً.»
  - **Figure:** triangle $ABC$, red bisectors $(d_1)$ from $B$ and $(d_2)$ from
    $C$ meeting at $I$; $L$ foot of perpendicular from $I$ on $BC$ (right angle
    at $L$); $H$ on $AB$ with $BH = BL$ (double ticks); segments $IH$, $IL$.
    $K$ is constructed in step 4 (not in the given figure).

### Page 63 (image 8)

- **تعلّم — تعريف**: «منصف الزاوية $\widehat{A}$ هو المستقيم المار بالنقطة $A$
  ويقسم هذه الزاوية إلى زاويتين قياساهما متساويان.»
- **خاصة وتعريف**: «المنصفات الثلاثة لزوايا المثلث تلتقي في نقطة واحدة $I$.
  النقطة $I$ هي مركز الدائرة الماسة لأضلاع المثلث داخلاً.»
  - **Figure:** triangle $ABC$, three red angle bisectors meeting at $I$;
    inscribed circle tangent to the three sides; equal-half-angle marks at the
    vertices; right-angle marks at the tangency points.
- 💡 «لرسم الدائرة المارة برؤوس مثلث، يكفي رسم محوري إثنين من أضلاعه. نقطة
  تقاطعهما هي مركز تلك الدائرة.» (circumscribed-circle review)
- 💡 «لرسم الدائرة الماسة لأضلاع المثلث داخلاً، يكفي رسم منصفي إثنين من زواياه.
  نقطة تقاطعهما هي مركز تلك الدائرة.»
- **تحقّق من فهمك**: «$ABC$ مثلث فيه $BC = 7\ \text{cm}$ و
  $\widehat{CBA} = 36^\circ$ و $\widehat{BCA} = 64^\circ$. ارسم هذا المثلث وارسم
  منصفات زواياه الثلاث.»
- **تدرّب**:
  - ① «في الشكل المرسوم جانبًا: النقطة $C$ هي مركز الدائرة المرسومة في المثلث
    $ERT$. احسب قياس الزاوية $\widehat{RET}$. علّل إجابتك.»
    - **Figure:** triangle $ERT$ ($E$ top, $R$ bottom-left, $T$ bottom-right),
      incenter $C$, bisectors $RC$, $TC$; $\widehat{CRT} = 25^\circ$,
      $\widehat{CTR} = 31^\circ$.
  - ② «$ABC$ مثلث فيه $\widehat{ABC} = 84^\circ$ و $\widehat{ACB} = 62^\circ$.
    $J$ هي نقطة تقاطع منصفي هاتين الزاويتين.
    1. ارسم شكلاً متفقًا مع معطيات النص.
    2. احسب قياس الزاوية $\widehat{BAC}$.
    3. احسب قياسات زوايا كل من المثلثات $JAB$ و $JBC$ و $JCA$.»

### Lesson 4 — reading notes

1. The first 💡 on p.63 is about the **circumscribed** circle (review of
   Lesson 1); the second is about the **inscribed** circle. Both are printed and
   both are reproduced verbatim.
2. Angle notation: the source writes a wide arc over three letters
   (e.g. $\widehat{CBA}$). The platform uses `\widehat{CBA}` (never `∠`/`\angle`),
   per `docs/BIDI-AND-MATH.md`.
3. The proof's given figure shows $H$, $L$, $I$ and the two bisectors; $K$ and
   the inscribed circle appear only in the solution stages (steps 4–7).

### Lesson 4 — mathematical verification record

- Angle bisector from a vertex = ray dividing the angle into two equal angles
  (direction = normalized sum of the two unit side vectors).
- Incenter $I$ = intersection of two internal bisectors; verified to lie on the
  third; equal perpendicular distances to the three sides (inradius); the
  inscribed circle is tangent to all three sides.
- Proof: $L$ foot on $BC$; $H$ on $BA$ with $BH = BL$ ⇒ $IH = IL$,
  $\widehat{IHB} = 90^\circ$; $K$ on $AC$ with $CK = CL$ ⇒ $IK = IL$,
  $\widehat{IKC} = 90^\circ$; $I$ equidistant from $H,K,L$; with $AH = AK$
  (admitted), $(AI)$ is the perpendicular bisector of $[HK]$ and the bisector of
  $\widehat{A}$. Verified where the source proves it; $AH = AK$ is admitted as
  the source admits it (not re-proved).
- Check: $\widehat{A} = 180 - 36 - 64 = 80^\circ$.
- Practice ①: $\widehat{R} = 50^\circ$, $\widehat{T} = 62^\circ$,
  $\widehat{RET} = 68^\circ$.
- Practice ②: $\widehat{BAC} = 34^\circ$; triangle $JAB$: $17^\circ, 42^\circ,
  121^\circ$; $JBC$: $42^\circ, 31^\circ, 107^\circ$; $JCA$: $31^\circ, 17^\circ,
  132^\circ$ (sum about $J$ = $360^\circ$). Verified.

---

## Shared-test boundary updates (backward compatible)

Adding these lessons necessarily extends two existing boundary pins; no
existing assertion is weakened:

- `src/content/sourceFidelity.test.ts`: lesson count 13 → 16; Unit 3 lesson list
  extended; allowed source pages extended with 56–63 and the range labels
  `56–58`, `59–61`, `62–63`. All Units 1–2 and Lesson 13 assertions unchanged.
- `src/content/units/lesson-13-coverage.test.ts`: the Unit-3 registration array
  is extended to list lessons 13–16; every Lesson-13 content/figure/solution
  assertion is unchanged.

Renderer registration (`src/components/diagram/renderers/index.ts`) gains three
additive entries (`altitude-lab`, `median-lab`, `angle-bisector-lab`); no
existing renderer changes.
