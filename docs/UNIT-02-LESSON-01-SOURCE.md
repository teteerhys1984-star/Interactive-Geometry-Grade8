# Unit 2 · Lesson 1 — what was read from the source (pages 30–33)

This file is the provenance record for **«منتصفا ضلعين في المثلث»**
(`lesson-08-triangle-midpoints`), the first lesson of Unit 2
«مثلثات ومنصفات أضلاع ومستقيمات متوازية».

The four supplied page images were transcribed during the preflight of this
work. They are **not committed** to the repository (they stay outside the
workspace, and re-publishing the scan would need the publisher's permission),
so this document — not an image — is the auditable record.

## Page-by-page record

### Page 30 — «انطلاقة نشطة» (unit opener)

- It carries the unit title «الوحدة الثانية — مثلثات ومنصفات أضلاع ومستقيمات متوازية».
- It opens the unit with a rapid-review section named «انطلاقة نشطة».
- **Editorial decision: it is not reproduced and it is not the lesson title.**
  The task specification says so explicitly, and the wording of its questions
  could not be read continuously enough to reproduce them verbatim. A verbatim
  section that is 80 % legible is worse than no section, so page 30 appears only
  as context in the orientation step (`l8-step-a01-orientation`), with no page
  citation and no invented questions.
- Consequence, pinned by tests: no `source` step in this lesson claims page 30,
  and `lesson.title` is «منتصفا ضلعين في المثلث», not «انطلاقة نشطة».

### Page 31 — النشاط («منتصفا ضلعين في المثلث»)

Read and reproduced:

- the task of drawing **three triangles `ABC`** whose angle at `A` is acute in
  the first, obtuse in the second and right in the third;
- marking **`M`, the midpoint of `[AB]`**, and **`N`, the midpoint of `[AC]`**,
  then drawing `(MN)`;
- the construction of **`K`, the symmetric of `M` about `N`**;
- the three-step proof scaffold, each step ending on a dotted gap:
  1. `[AC]` and `[MK]` are the diagonals of `AMCK`, and `N` is the midpoint of
     both ⇒ `AMCK` is a parallelogram;
  2. `(CK) ∥ (AM)` and `CK = AM`; since `M` is the midpoint of `[AB]`,
     `AM = MB`, hence `(CK) ∥ (MB)` and `CK = MB` ⇒ `MBCK` is a parallelogram;
  3. hence `(MN) ∥ (BC)` and `MN = ½ BC`;
- the closing ask «هل يكفي ذلك؟ صغ إثباتاً…» with the theorem statement.

The figure was re-cropped and re-read at 5× to settle the marks: `[AM] = [MB]`
and `[AN] = [NC]` (two different tick counts on the two halves of each side) and
`[MN] = [NK]` (one tick), which is what makes `N` the midpoint of `[MK]` — the
hinge of the whole proof. The letters are placed as in the scan:
`M` and `N` inside the triangle, `K` to the right of `N`, `B` and `C` on the
base, `A` on top.

### Page 32 — «تعلّم — المبرهنة الأولى في المنتصفات» + مثال + اكتساب معارف

- The theorem, in its two printed sentences: the line through the midpoints of
  two sides is parallel to the third side; the segment joining those midpoints
  is half the third side.
- The worked example: `I` midpoint of `[AB]`, `J` midpoint of `[AC]` ⇒
  `(IJ) ∥ (BC)` and `IJ = ½ BC`.
- «معنى الكلمات»: name the triangle, then the two sides and their midpoints,
  then state that the two lines are parallel.
- «اكتساب معارف»: `ABC` is a triangle, `O` is the midpoint of `[AC]`, `I` is the
  symmetric of `C` about `B`; prove `(OB) ∥ (AI)`.

Reconstruction note, recorded rather than hidden: on both the example and
«اكتساب معارف» the printed sentence runs off the page edge in the scan. The
**givens and the required result are unambiguous**; the connective wording was
restored by the platform. Both source refs therefore carry a reviewer `note`
saying exactly that.

### Page 33 — «الحل» + «تحقّق من فهمك» + «تدرّب»

- The **one printed solution in the whole lesson**: because `I` is the symmetric
  of `C` about `B`, the point `B` is the midpoint of `[CI]`; with `O` the
  midpoint of `[AC]`, the midline theorem in triangle `ACI` gives
  `(OB) ∥ (AI)`. It is reproduced as a source step
  (`l8-step-06-knowledge-solution`), not re-derived.
- «تحقّق من فهمك»: two triangles `ABC` and `ADC` sharing `[AC]`, with `J`, `K`,
  `L`, `M`, `N` the midpoints of their sides, and five items: the positions of
  `(JK)`, `(KN)`, `(LN)`, `(JM)` and the relative position of `(LN)` and `(JM)`.
- «تدرّب ①»: a semicircle with centre `O` and diameter `[AB]`, `E` on it, `M`
  the midpoint of `[AE]`; prove `(OM) ∥ (BE)`.
- «تدرّب ②»: `B′` is the symmetric of `A` about `B`, `C′` the symmetric of `A`
  about `C`; prove `(CB) ∥ (C′B′)`.
- «تدرّب ③»: a rectangle `ABCD` inscribed in a circle of radius `3 cm`, `E`, `F`,
  `G`, `H` the midpoints of its sides; what is `EFGH`, and what is its perimeter?

## The one derived value

«تدرّب ③» asks for a perimeter, and the page prints **only the radius**. The
perimeter is therefore _derived_, and the derivation is short enough to check
by hand:

```
AC = 2 × 3 = 6 cm                     (the diagonal of the rectangle is a diameter)
EF = ½ AC = 3 cm                      (midline theorem in triangle ABC)
EF = FG = GH = HE = 3 cm              (same argument in the other three triangles)
perimeter = 4 × 3 = 12 cm = 2 × AC
```

`lesson-08-geometry.test.ts` re-measures all of it: the four sides equal 3, the
perimeter equals 12, `EFGH` is not a square (consecutive sides are not
perpendicular), and both diagonals equal 6. The Teacher Area states that the
value is derived, and the unit test bank uses `12` for the same figure.

**No other page in this lesson yields a numeric value.** Every drawing of
pages 31–33 is measurement-free, which is why every figure of this lesson is
badged as a platform drawing (`origin: 'authored'`) — see
`docs/UNIT-02-LESSON-01-FIGURES.md`.

## Wording policy (applies to every prompt in `lesson-08-questions.ts`)

1. The mathematical content — givens, asked relation, printed instruction — is
   transcribed from the scans. Nothing mathematical was added.
2. Where the scan is cut at the page edge, the connective wording was restored
   and the corresponding `source` carries a reviewer `note`.
3. Arabic-Indic numerals are used in prose (٣١–٣٣), while mathematical values
   stay inside `$…$` and use ASCII digits, as everywhere else in this course.
4. `L8_PRINTED_PROMPTS` holds the **17** printable prompts of the three pages;
   the coverage test requires exactly one Teacher Area record per prompt.
