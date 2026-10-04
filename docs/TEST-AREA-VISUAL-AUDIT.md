# Test Area — Visual Question Audit

## Scope and decision rules

This independent audit covers all **140 Lesson Test questions** (20 each for lessons 1–7) and all **60 Unit 1 questions**, 200 questions total. Each live question ID is listed below with its A/B/C classification and the rationale recorded in `src/tests/visualAudit.ts`. `src/tests/visualAudit.test.ts` verifies exact ID coverage, category totals, rationale presence, figure coverage, scene/source/label validity, and answer-leakage guardrails.

- **A — figure required:** a visual is needed to read the stated spatial configuration or construction candidates.
- **B — figure beneficial:** the text remains sufficient, but a restrained diagram materially helps orientation or correspondence.
- **C — text-only:** prose/data are complete; a picture would be redundant, invent unsupported geometry, or disclose the classification/result being assessed.

The audit treats a drawing as a representation of the stem, not as an extra source of facts. Every equality mark represents a stated equality; angle arcs without ticks indicate position only. A schematic is explicitly captioned as not to scale. No question is given an answer marker, solution-only figure, or active-session correctness feedback.

## Per-question inventory

**Final totals:** 11 required + 3 beneficial + 186 text-only = 200.

### Lesson 1 — «الانسحاب وخواصه» (20 questions; textbook pages 5–7)

| Question ID       | Class          | Audit basis                                                                             |
| ----------------- | -------------- | --------------------------------------------------------------------------------------- |
| `geo-l01-t01-q01` | C — text-only  | النص يحدد المفهوم/المعطيات كاملة؛ الرسم هنا سيكرر الخاصية أو يرسم ترتيباً يكشف المطلوب. |
| `geo-l01-t01-q02` | C — text-only  | النص يحدد المفهوم/المعطيات كاملة؛ الرسم هنا سيكرر الخاصية أو يرسم ترتيباً يكشف المطلوب. |
| `geo-l01-t01-q03` | C — text-only  | النص يحدد المفهوم/المعطيات كاملة؛ الرسم هنا سيكرر الخاصية أو يرسم ترتيباً يكشف المطلوب. |
| `geo-l01-t01-q04` | C — text-only  | النص يحدد المفهوم/المعطيات كاملة؛ الرسم هنا سيكرر الخاصية أو يرسم ترتيباً يكشف المطلوب. |
| `geo-l01-t01-q05` | C — text-only  | النص يحدد المفهوم/المعطيات كاملة؛ الرسم هنا سيكرر الخاصية أو يرسم ترتيباً يكشف المطلوب. |
| `geo-l01-t01-q06` | C — text-only  | النص يحدد المفهوم/المعطيات كاملة؛ الرسم هنا سيكرر الخاصية أو يرسم ترتيباً يكشف المطلوب. |
| `geo-l01-t01-q07` | C — text-only  | النص يحدد المفهوم/المعطيات كاملة؛ الرسم هنا سيكرر الخاصية أو يرسم ترتيباً يكشف المطلوب. |
| `geo-l01-t01-q08` | C — text-only  | النص يحدد المفهوم/المعطيات كاملة؛ الرسم هنا سيكرر الخاصية أو يرسم ترتيباً يكشف المطلوب. |
| `geo-l01-t01-q09` | C — text-only  | النص يحدد المفهوم/المعطيات كاملة؛ الرسم هنا سيكرر الخاصية أو يرسم ترتيباً يكشف المطلوب. |
| `geo-l01-t01-q10` | B — beneficial | رسم تخطيطي لهيئتين متطابقتين مختلفتي الاتجاه يوضح معنى شرط التوازي دون علامة إجابة.     |
| `geo-l01-t01-q11` | C — text-only  | النص يحدد المفهوم/المعطيات كاملة؛ الرسم هنا سيكرر الخاصية أو يرسم ترتيباً يكشف المطلوب. |
| `geo-l01-t01-q12` | C — text-only  | النص يحدد المفهوم/المعطيات كاملة؛ الرسم هنا سيكرر الخاصية أو يرسم ترتيباً يكشف المطلوب. |
| `geo-l01-t01-q13` | C — text-only  | النص يحدد المفهوم/المعطيات كاملة؛ الرسم هنا سيكرر الخاصية أو يرسم ترتيباً يكشف المطلوب. |
| `geo-l01-t01-q14` | C — text-only  | النص يحدد المفهوم/المعطيات كاملة؛ الرسم هنا سيكرر الخاصية أو يرسم ترتيباً يكشف المطلوب. |
| `geo-l01-t01-q15` | C — text-only  | النص يحدد المفهوم/المعطيات كاملة؛ الرسم هنا سيكرر الخاصية أو يرسم ترتيباً يكشف المطلوب. |
| `geo-l01-t01-q16` | C — text-only  | النص يحدد المفهوم/المعطيات كاملة؛ الرسم هنا سيكرر الخاصية أو يرسم ترتيباً يكشف المطلوب. |
| `geo-l01-t01-q17` | C — text-only  | النص يحدد المفهوم/المعطيات كاملة؛ الرسم هنا سيكرر الخاصية أو يرسم ترتيباً يكشف المطلوب. |
| `geo-l01-t01-q18` | C — text-only  | النص يحدد المفهوم/المعطيات كاملة؛ الرسم هنا سيكرر الخاصية أو يرسم ترتيباً يكشف المطلوب. |
| `geo-l01-t01-q19` | C — text-only  | النص يحدد المفهوم/المعطيات كاملة؛ الرسم هنا سيكرر الخاصية أو يرسم ترتيباً يكشف المطلوب. |
| `geo-l01-t01-q20` | C — text-only  | النص يحدد المفهوم/المعطيات كاملة؛ الرسم هنا سيكرر الخاصية أو يرسم ترتيباً يكشف المطلوب. |

### Lesson 2 — «صورة نقطة وفق انسحاب» (20 questions; textbook pages 8–10)

| Question ID       | Class         | Audit basis                                                                               |
| ----------------- | ------------- | ----------------------------------------------------------------------------------------- |
| `geo-l02-t01-q01` | C — text-only | الإحداثيات أو اتجاه الحركة معطيان نصاً؛ رسم الصورة سيكشف قيمة السؤال أو الاختيار المطلوب. |
| `geo-l02-t01-q02` | C — text-only | الإحداثيات أو اتجاه الحركة معطيان نصاً؛ رسم الصورة سيكشف قيمة السؤال أو الاختيار المطلوب. |
| `geo-l02-t01-q03` | C — text-only | الإحداثيات أو اتجاه الحركة معطيان نصاً؛ رسم الصورة سيكشف قيمة السؤال أو الاختيار المطلوب. |
| `geo-l02-t01-q04` | C — text-only | الإحداثيات أو اتجاه الحركة معطيان نصاً؛ رسم الصورة سيكشف قيمة السؤال أو الاختيار المطلوب. |
| `geo-l02-t01-q05` | C — text-only | الإحداثيات أو اتجاه الحركة معطيان نصاً؛ رسم الصورة سيكشف قيمة السؤال أو الاختيار المطلوب. |
| `geo-l02-t01-q06` | C — text-only | الإحداثيات أو اتجاه الحركة معطيان نصاً؛ رسم الصورة سيكشف قيمة السؤال أو الاختيار المطلوب. |
| `geo-l02-t01-q07` | C — text-only | الإحداثيات أو اتجاه الحركة معطيان نصاً؛ رسم الصورة سيكشف قيمة السؤال أو الاختيار المطلوب. |
| `geo-l02-t01-q08` | A — required  | تقاطع قوسي الفرجار له مرشحان مكانيان؛ يلزم إظهار المرشحين معاً دون تمييز الصحيح.          |
| `geo-l02-t01-q09` | C — text-only | الإحداثيات أو اتجاه الحركة معطيان نصاً؛ رسم الصورة سيكشف قيمة السؤال أو الاختيار المطلوب. |
| `geo-l02-t01-q10` | C — text-only | الإحداثيات أو اتجاه الحركة معطيان نصاً؛ رسم الصورة سيكشف قيمة السؤال أو الاختيار المطلوب. |
| `geo-l02-t01-q11` | C — text-only | الإحداثيات أو اتجاه الحركة معطيان نصاً؛ رسم الصورة سيكشف قيمة السؤال أو الاختيار المطلوب. |
| `geo-l02-t01-q12` | C — text-only | الإحداثيات أو اتجاه الحركة معطيان نصاً؛ رسم الصورة سيكشف قيمة السؤال أو الاختيار المطلوب. |
| `geo-l02-t01-q13` | C — text-only | الإحداثيات أو اتجاه الحركة معطيان نصاً؛ رسم الصورة سيكشف قيمة السؤال أو الاختيار المطلوب. |
| `geo-l02-t01-q14` | C — text-only | الإحداثيات أو اتجاه الحركة معطيان نصاً؛ رسم الصورة سيكشف قيمة السؤال أو الاختيار المطلوب. |
| `geo-l02-t01-q15` | C — text-only | الإحداثيات أو اتجاه الحركة معطيان نصاً؛ رسم الصورة سيكشف قيمة السؤال أو الاختيار المطلوب. |
| `geo-l02-t01-q16` | C — text-only | الإحداثيات أو اتجاه الحركة معطيان نصاً؛ رسم الصورة سيكشف قيمة السؤال أو الاختيار المطلوب. |
| `geo-l02-t01-q17` | C — text-only | الإحداثيات أو اتجاه الحركة معطيان نصاً؛ رسم الصورة سيكشف قيمة السؤال أو الاختيار المطلوب. |
| `geo-l02-t01-q18` | C — text-only | الإحداثيات أو اتجاه الحركة معطيان نصاً؛ رسم الصورة سيكشف قيمة السؤال أو الاختيار المطلوب. |
| `geo-l02-t01-q19` | C — text-only | الإحداثيات أو اتجاه الحركة معطيان نصاً؛ رسم الصورة سيكشف قيمة السؤال أو الاختيار المطلوب. |
| `geo-l02-t01-q20` | C — text-only | الإحداثيات أو اتجاه الحركة معطيان نصاً؛ رسم الصورة سيكشف قيمة السؤال أو الاختيار المطلوب. |

### Lesson 3 — «صورة شكل وفق انسحاب» (20 questions; textbook pages 11–16)

| Question ID       | Class         | Audit basis                                                                           |
| ----------------- | ------------- | ------------------------------------------------------------------------------------- |
| `geo-l03-t01-q01` | C — text-only | السؤال يختبر قاعدة عامة لصورة الشكل؛ إظهار الصورة الناتجة سيعطي الخاصية محل الاختبار. |
| `geo-l03-t01-q02` | C — text-only | السؤال يختبر قاعدة عامة لصورة الشكل؛ إظهار الصورة الناتجة سيعطي الخاصية محل الاختبار. |
| `geo-l03-t01-q03` | C — text-only | السؤال يختبر قاعدة عامة لصورة الشكل؛ إظهار الصورة الناتجة سيعطي الخاصية محل الاختبار. |
| `geo-l03-t01-q04` | C — text-only | السؤال يختبر قاعدة عامة لصورة الشكل؛ إظهار الصورة الناتجة سيعطي الخاصية محل الاختبار. |
| `geo-l03-t01-q05` | C — text-only | السؤال يختبر قاعدة عامة لصورة الشكل؛ إظهار الصورة الناتجة سيعطي الخاصية محل الاختبار. |
| `geo-l03-t01-q06` | C — text-only | السؤال يختبر قاعدة عامة لصورة الشكل؛ إظهار الصورة الناتجة سيعطي الخاصية محل الاختبار. |
| `geo-l03-t01-q07` | C — text-only | السؤال يختبر قاعدة عامة لصورة الشكل؛ إظهار الصورة الناتجة سيعطي الخاصية محل الاختبار. |
| `geo-l03-t01-q08` | C — text-only | السؤال يختبر قاعدة عامة لصورة الشكل؛ إظهار الصورة الناتجة سيعطي الخاصية محل الاختبار. |
| `geo-l03-t01-q09` | C — text-only | السؤال يختبر قاعدة عامة لصورة الشكل؛ إظهار الصورة الناتجة سيعطي الخاصية محل الاختبار. |
| `geo-l03-t01-q10` | C — text-only | السؤال يختبر قاعدة عامة لصورة الشكل؛ إظهار الصورة الناتجة سيعطي الخاصية محل الاختبار. |
| `geo-l03-t01-q11` | C — text-only | السؤال يختبر قاعدة عامة لصورة الشكل؛ إظهار الصورة الناتجة سيعطي الخاصية محل الاختبار. |
| `geo-l03-t01-q12` | C — text-only | السؤال يختبر قاعدة عامة لصورة الشكل؛ إظهار الصورة الناتجة سيعطي الخاصية محل الاختبار. |
| `geo-l03-t01-q13` | C — text-only | السؤال يختبر قاعدة عامة لصورة الشكل؛ إظهار الصورة الناتجة سيعطي الخاصية محل الاختبار. |
| `geo-l03-t01-q14` | C — text-only | السؤال يختبر قاعدة عامة لصورة الشكل؛ إظهار الصورة الناتجة سيعطي الخاصية محل الاختبار. |
| `geo-l03-t01-q15` | C — text-only | السؤال يختبر قاعدة عامة لصورة الشكل؛ إظهار الصورة الناتجة سيعطي الخاصية محل الاختبار. |
| `geo-l03-t01-q16` | A — required  | التمييز بين مركز الدائرة ونقطة على محيطها هو موضع الخطأ الهندسي نفسه.                 |
| `geo-l03-t01-q17` | C — text-only | السؤال يختبر قاعدة عامة لصورة الشكل؛ إظهار الصورة الناتجة سيعطي الخاصية محل الاختبار. |
| `geo-l03-t01-q18` | C — text-only | السؤال يختبر قاعدة عامة لصورة الشكل؛ إظهار الصورة الناتجة سيعطي الخاصية محل الاختبار. |
| `geo-l03-t01-q19` | C — text-only | السؤال يختبر قاعدة عامة لصورة الشكل؛ إظهار الصورة الناتجة سيعطي الخاصية محل الاختبار. |
| `geo-l03-t01-q20` | C — text-only | السؤال يختبر قاعدة عامة لصورة الشكل؛ إظهار الصورة الناتجة سيعطي الخاصية محل الاختبار. |

### Lesson 4 — «تطابق المثلثات» (20 questions; textbook pages 17–19)

| Question ID       | Class         | Audit basis                                                                                                              |
| ----------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `geo-l04-t01-q01` | C — text-only | السؤال مفاهيمي أو حسابي مكتمل نصاً؛ بعض الرسوم المحتملة ستوحي بعلاقة غير معلّمة أو تكشف النتيجة.                         |
| `geo-l04-t01-q02` | C — text-only | السؤال مفاهيمي أو حسابي مكتمل نصاً؛ بعض الرسوم المحتملة ستوحي بعلاقة غير معلّمة أو تكشف النتيجة.                         |
| `geo-l04-t01-q03` | C — text-only | السؤال مفاهيمي أو حسابي مكتمل نصاً؛ بعض الرسوم المحتملة ستوحي بعلاقة غير معلّمة أو تكشف النتيجة.                         |
| `geo-l04-t01-q04` | C — text-only | السؤال مفاهيمي أو حسابي مكتمل نصاً؛ بعض الرسوم المحتملة ستوحي بعلاقة غير معلّمة أو تكشف النتيجة.                         |
| `geo-l04-t01-q05` | C — text-only | السؤال مفاهيمي أو حسابي مكتمل نصاً؛ بعض الرسوم المحتملة ستوحي بعلاقة غير معلّمة أو تكشف النتيجة.                         |
| `geo-l04-t01-q06` | A — required  | الشكلان المسمّيان ومعطيات الضلع والزاويتين المتناظرة تحتاج خريطة بصرية للمقابلة.                                         |
| `geo-l04-t01-q07` | C — text-only | السؤال مفاهيمي أو حسابي مكتمل نصاً؛ بعض الرسوم المحتملة ستوحي بعلاقة غير معلّمة أو تكشف النتيجة.                         |
| `geo-l04-t01-q08` | A — required  | القطر AC يقسم متوازي الأضلاع إلى المثلثين المطلوب تحليل عناصرهما.                                                        |
| `geo-l04-t01-q09` | C — text-only | المعطيات تحدد زاوية الرأس والتساوي؛ رسم دقيق سيُظهر قياس زاوية القاعدة المطلوب، لذا تكفي المعالجة النصية دون صورة كاشفة. |
| `geo-l04-t01-q10` | C — text-only | السؤال مفاهيمي أو حسابي مكتمل نصاً؛ بعض الرسوم المحتملة ستوحي بعلاقة غير معلّمة أو تكشف النتيجة.                         |
| `geo-l04-t01-q11` | C — text-only | السؤال مفاهيمي أو حسابي مكتمل نصاً؛ بعض الرسوم المحتملة ستوحي بعلاقة غير معلّمة أو تكشف النتيجة.                         |
| `geo-l04-t01-q12` | C — text-only | السؤال مفاهيمي أو حسابي مكتمل نصاً؛ بعض الرسوم المحتملة ستوحي بعلاقة غير معلّمة أو تكشف النتيجة.                         |
| `geo-l04-t01-q13` | A — required  | الطائرة الورقية والقطر المشترك يحددان تكوين المثلثين؛ العلامات تقتصر على المساواة المعطاة.                               |
| `geo-l04-t01-q14` | C — text-only | السؤال مفاهيمي أو حسابي مكتمل نصاً؛ بعض الرسوم المحتملة ستوحي بعلاقة غير معلّمة أو تكشف النتيجة.                         |
| `geo-l04-t01-q15` | A — required  | تحديد الوتر والضلع القائم المناظرين في مثلثين قائمين هو لبّ المقارنة.                                                    |
| `geo-l04-t01-q16` | C — text-only | السؤال مفاهيمي أو حسابي مكتمل نصاً؛ بعض الرسوم المحتملة ستوحي بعلاقة غير معلّمة أو تكشف النتيجة.                         |
| `geo-l04-t01-q17` | A — required  | موضع المثلثين المتقابلين عند تقاطع مستقيمين ضروري لقراءة الزاويتين المتقابلتين بالرأس.                                   |
| `geo-l04-t01-q18` | C — text-only | السؤال مفاهيمي أو حسابي مكتمل نصاً؛ بعض الرسوم المحتملة ستوحي بعلاقة غير معلّمة أو تكشف النتيجة.                         |
| `geo-l04-t01-q19` | C — text-only | السؤال مفاهيمي أو حسابي مكتمل نصاً؛ بعض الرسوم المحتملة ستوحي بعلاقة غير معلّمة أو تكشف النتيجة.                         |
| `geo-l04-t01-q20` | C — text-only | السؤال مفاهيمي أو حسابي مكتمل نصاً؛ بعض الرسوم المحتملة ستوحي بعلاقة غير معلّمة أو تكشف النتيجة.                         |

### Lesson 5 — Unit 1 exercises, questions 1–2 (20 questions)

| Question ID       | Class         | Audit basis                                                                                |
| ----------------- | ------------- | ------------------------------------------------------------------------------------------ |
| `geo-l05-t01-q01` | C — text-only | المعطيات كافية نصاً؛ رسم التحويل أو الرباعي الناتج سيحسم الاختيار بدلاً من اختبار التعليل. |
| `geo-l05-t01-q02` | C — text-only | المعطيات كافية نصاً؛ رسم التحويل أو الرباعي الناتج سيحسم الاختيار بدلاً من اختبار التعليل. |
| `geo-l05-t01-q03` | A — required  | اتجاه المتجه داخل متوازي الأضلاع يعتمد على ترتيب الرؤوس المكاني.                           |
| `geo-l05-t01-q04` | C — text-only | المعطيات كافية نصاً؛ رسم التحويل أو الرباعي الناتج سيحسم الاختيار بدلاً من اختبار التعليل. |
| `geo-l05-t01-q05` | C — text-only | المعطيات كافية نصاً؛ رسم التحويل أو الرباعي الناتج سيحسم الاختيار بدلاً من اختبار التعليل. |
| `geo-l05-t01-q06` | C — text-only | المعطيات كافية نصاً؛ رسم التحويل أو الرباعي الناتج سيحسم الاختيار بدلاً من اختبار التعليل. |
| `geo-l05-t01-q07` | C — text-only | المعطيات كافية نصاً؛ رسم التحويل أو الرباعي الناتج سيحسم الاختيار بدلاً من اختبار التعليل. |
| `geo-l05-t01-q08` | C — text-only | المعطيات كافية نصاً؛ رسم التحويل أو الرباعي الناتج سيحسم الاختيار بدلاً من اختبار التعليل. |
| `geo-l05-t01-q09` | C — text-only | المعطيات كافية نصاً؛ رسم التحويل أو الرباعي الناتج سيحسم الاختيار بدلاً من اختبار التعليل. |
| `geo-l05-t01-q10` | C — text-only | المعطيات كافية نصاً؛ رسم التحويل أو الرباعي الناتج سيحسم الاختيار بدلاً من اختبار التعليل. |
| `geo-l05-t01-q11` | C — text-only | المعطيات كافية نصاً؛ رسم التحويل أو الرباعي الناتج سيحسم الاختيار بدلاً من اختبار التعليل. |
| `geo-l05-t01-q12` | C — text-only | المعطيات كافية نصاً؛ رسم التحويل أو الرباعي الناتج سيحسم الاختيار بدلاً من اختبار التعليل. |
| `geo-l05-t01-q13` | C — text-only | المعطيات كافية نصاً؛ رسم التحويل أو الرباعي الناتج سيحسم الاختيار بدلاً من اختبار التعليل. |
| `geo-l05-t01-q14` | C — text-only | المعطيات كافية نصاً؛ رسم التحويل أو الرباعي الناتج سيحسم الاختيار بدلاً من اختبار التعليل. |
| `geo-l05-t01-q15` | C — text-only | المعطيات كافية نصاً؛ رسم التحويل أو الرباعي الناتج سيحسم الاختيار بدلاً من اختبار التعليل. |
| `geo-l05-t01-q16` | C — text-only | المعطيات كافية نصاً؛ رسم التحويل أو الرباعي الناتج سيحسم الاختيار بدلاً من اختبار التعليل. |
| `geo-l05-t01-q17` | C — text-only | العلاقة بين الزاويتين تُستنتج من القائمة و35°؛ رسم مقيّس قد يُظهر 55° بصرياً، والنص كافٍ.  |
| `geo-l05-t01-q18` | C — text-only | المعطيات كافية نصاً؛ رسم التحويل أو الرباعي الناتج سيحسم الاختيار بدلاً من اختبار التعليل. |
| `geo-l05-t01-q19` | C — text-only | المعطيات كافية نصاً؛ رسم التحويل أو الرباعي الناتج سيحسم الاختيار بدلاً من اختبار التعليل. |
| `geo-l05-t01-q20` | C — text-only | المعطيات كافية نصاً؛ رسم التحويل أو الرباعي الناتج سيحسم الاختيار بدلاً من اختبار التعليل. |

### Lesson 6 — Unit 1 exercises, continuation (20 questions)

| Question ID       | Class          | Audit basis                                                                      |
| ----------------- | -------------- | -------------------------------------------------------------------------------- |
| `geo-l06-t01-q01` | C — text-only  | المسألة قاعدة أو حساب مكتمل؛ رسم النتيجة سيحوّل المظهر إلى دليل أو يكشف الإجابة. |
| `geo-l06-t01-q02` | C — text-only  | المسألة قاعدة أو حساب مكتمل؛ رسم النتيجة سيحوّل المظهر إلى دليل أو يكشف الإجابة. |
| `geo-l06-t01-q03` | C — text-only  | المسألة قاعدة أو حساب مكتمل؛ رسم النتيجة سيحوّل المظهر إلى دليل أو يكشف الإجابة. |
| `geo-l06-t01-q04` | C — text-only  | المسألة قاعدة أو حساب مكتمل؛ رسم النتيجة سيحوّل المظهر إلى دليل أو يكشف الإجابة. |
| `geo-l06-t01-q05` | C — text-only  | المسألة قاعدة أو حساب مكتمل؛ رسم النتيجة سيحوّل المظهر إلى دليل أو يكشف الإجابة. |
| `geo-l06-t01-q06` | A — required   | منصف الزاوية والضلع المشترك يحددان بنية البرهان في المثلثين المتجاورين.          |
| `geo-l06-t01-q07` | C — text-only  | المسألة قاعدة أو حساب مكتمل؛ رسم النتيجة سيحوّل المظهر إلى دليل أو يكشف الإجابة. |
| `geo-l06-t01-q08` | C — text-only  | المسألة قاعدة أو حساب مكتمل؛ رسم النتيجة سيحوّل المظهر إلى دليل أو يكشف الإجابة. |
| `geo-l06-t01-q09` | C — text-only  | المسألة قاعدة أو حساب مكتمل؛ رسم النتيجة سيحوّل المظهر إلى دليل أو يكشف الإجابة. |
| `geo-l06-t01-q10` | C — text-only  | المسألة قاعدة أو حساب مكتمل؛ رسم النتيجة سيحوّل المظهر إلى دليل أو يكشف الإجابة. |
| `geo-l06-t01-q11` | C — text-only  | المسألة قاعدة أو حساب مكتمل؛ رسم النتيجة سيحوّل المظهر إلى دليل أو يكشف الإجابة. |
| `geo-l06-t01-q12` | B — beneficial | مخطط متوازي الأضلاع والقطرين يساعد على تتبع خطوات البرهان دون علامات منتصف.      |
| `geo-l06-t01-q13` | C — text-only  | المسألة قاعدة أو حساب مكتمل؛ رسم النتيجة سيحوّل المظهر إلى دليل أو يكشف الإجابة. |
| `geo-l06-t01-q14` | C — text-only  | المسألة قاعدة أو حساب مكتمل؛ رسم النتيجة سيحوّل المظهر إلى دليل أو يكشف الإجابة. |
| `geo-l06-t01-q15` | C — text-only  | المسألة قاعدة أو حساب مكتمل؛ رسم النتيجة سيحوّل المظهر إلى دليل أو يكشف الإجابة. |
| `geo-l06-t01-q16` | C — text-only  | المسألة قاعدة أو حساب مكتمل؛ رسم النتيجة سيحوّل المظهر إلى دليل أو يكشف الإجابة. |
| `geo-l06-t01-q17` | C — text-only  | المسألة قاعدة أو حساب مكتمل؛ رسم النتيجة سيحوّل المظهر إلى دليل أو يكشف الإجابة. |
| `geo-l06-t01-q18` | C — text-only  | المسألة قاعدة أو حساب مكتمل؛ رسم النتيجة سيحوّل المظهر إلى دليل أو يكشف الإجابة. |
| `geo-l06-t01-q19` | C — text-only  | المسألة قاعدة أو حساب مكتمل؛ رسم النتيجة سيحوّل المظهر إلى دليل أو يكشف الإجابة. |
| `geo-l06-t01-q20` | C — text-only  | المسألة قاعدة أو حساب مكتمل؛ رسم النتيجة سيحوّل المظهر إلى دليل أو يكشف الإجابة. |

### Lesson 7 — Unit 1 exercises, final section (20 questions)

| Question ID       | Class         | Audit basis                                                                                                     |
| ----------------- | ------------- | --------------------------------------------------------------------------------------------------------------- |
| `geo-l07-t01-q01` | C — text-only | النص يكفي للاستدلال؛ إعادة رسم الخاصية أو علامة النتيجة ستتجاوز مهارة البرهان المقصودة.                         |
| `geo-l07-t01-q02` | C — text-only | النص يكفي للاستدلال؛ إعادة رسم الخاصية أو علامة النتيجة ستتجاوز مهارة البرهان المقصودة.                         |
| `geo-l07-t01-q03` | C — text-only | النص يكفي للاستدلال؛ إعادة رسم الخاصية أو علامة النتيجة ستتجاوز مهارة البرهان المقصودة.                         |
| `geo-l07-t01-q04` | C — text-only | النص يكفي للاستدلال؛ إعادة رسم الخاصية أو علامة النتيجة ستتجاوز مهارة البرهان المقصودة.                         |
| `geo-l07-t01-q05` | C — text-only | النص يكفي للاستدلال؛ إعادة رسم الخاصية أو علامة النتيجة ستتجاوز مهارة البرهان المقصودة.                         |
| `geo-l07-t01-q06` | C — text-only | النص يكفي للاستدلال؛ إعادة رسم الخاصية أو علامة النتيجة ستتجاوز مهارة البرهان المقصودة.                         |
| `geo-l07-t01-q07` | C — text-only | الرسم الدقيق لمستقيمين متوازيين سيجعل زاويتي التبادل الداخلي تبدوان متساويتين ويكشف حكم الصواب؛ النص وحده يكفي. |
| `geo-l07-t01-q08` | C — text-only | النص يكفي للاستدلال؛ إعادة رسم الخاصية أو علامة النتيجة ستتجاوز مهارة البرهان المقصودة.                         |
| `geo-l07-t01-q09` | C — text-only | النص يكفي للاستدلال؛ إعادة رسم الخاصية أو علامة النتيجة ستتجاوز مهارة البرهان المقصودة.                         |
| `geo-l07-t01-q10` | C — text-only | النص يكفي للاستدلال؛ إعادة رسم الخاصية أو علامة النتيجة ستتجاوز مهارة البرهان المقصودة.                         |
| `geo-l07-t01-q11` | C — text-only | النص يكفي للاستدلال؛ إعادة رسم الخاصية أو علامة النتيجة ستتجاوز مهارة البرهان المقصودة.                         |
| `geo-l07-t01-q12` | C — text-only | النص يكفي للاستدلال؛ إعادة رسم الخاصية أو علامة النتيجة ستتجاوز مهارة البرهان المقصودة.                         |
| `geo-l07-t01-q13` | C — text-only | النص يكفي للاستدلال؛ إعادة رسم الخاصية أو علامة النتيجة ستتجاوز مهارة البرهان المقصودة.                         |
| `geo-l07-t01-q14` | C — text-only | النص يكفي للاستدلال؛ إعادة رسم الخاصية أو علامة النتيجة ستتجاوز مهارة البرهان المقصودة.                         |
| `geo-l07-t01-q15` | C — text-only | النص يكفي للاستدلال؛ إعادة رسم الخاصية أو علامة النتيجة ستتجاوز مهارة البرهان المقصودة.                         |
| `geo-l07-t01-q16` | C — text-only | النص يكفي للاستدلال؛ إعادة رسم الخاصية أو علامة النتيجة ستتجاوز مهارة البرهان المقصودة.                         |
| `geo-l07-t01-q17` | C — text-only | النص يكفي للاستدلال؛ إعادة رسم الخاصية أو علامة النتيجة ستتجاوز مهارة البرهان المقصودة.                         |
| `geo-l07-t01-q18` | C — text-only | النص يكفي للاستدلال؛ إعادة رسم الخاصية أو علامة النتيجة ستتجاوز مهارة البرهان المقصودة.                         |
| `geo-l07-t01-q19` | C — text-only | الرسم المضاد غير المتوازي سيُظهر اختلاف زاويتي التبادل الداخلي ويكشف الخطأ المطلوب شرحه؛ يُحفظ السؤال نصياً.    |
| `geo-l07-t01-q20` | C — text-only | النص يكفي للاستدلال؛ إعادة رسم الخاصية أو علامة النتيجة ستتجاوز مهارة البرهان المقصودة.                         |

### Unit 1 Test (60 questions spanning lessons 1–7)

| Question ID       | Class          | Audit basis                                                                                   |
| ----------------- | -------------- | --------------------------------------------------------------------------------------------- |
| `geo-u01-t01-q01` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q02` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q03` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q04` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q05` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q06` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q07` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q08` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q09` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q10` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q11` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q12` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q13` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q14` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q15` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q16` | C — text-only  | الأوضاع الثلاثة مكتوبة مباشرة في بنود التصنيف؛ رسمها داخل السؤال سيكشف إسناد كل بند إلى فئته. |
| `geo-u01-t01-q17` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q18` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q19` | A — required   | الإنشاء بالفرجار يعرض نقطتي تقاطع محتملتين؛ لا يُشار بصرياً إلى أي اختيار.                    |
| `geo-u01-t01-q20` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q21` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q22` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q23` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q24` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q25` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q26` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q27` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q28` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q29` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q30` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q31` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q32` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q33` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q34` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q35` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q36` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q37` | A — required   | القطر AC يقسم الطائرة الورقية إلى مثلثين؛ العلامات لا تضيف إلا المساواة المذكورة.             |
| `geo-u01-t01-q38` | B — beneficial | مثلث قائم تخطيطي يحمل المساحة والضلع المعطيين فقط ولا يضع قياساً للضلع المطلوب.               |
| `geo-u01-t01-q39` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q40` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q41` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q42` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q43` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q44` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q45` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q46` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q47` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q48` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q49` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q50` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q51` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q52` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q53` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q54` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q55` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q56` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q57` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q58` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q59` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |
| `geo-u01-t01-q60` | C — text-only  | النص يحدد المعطيات كاملة؛ إضافة الرسم لن تضيف قيمة هندسية مستقلة.                             |

## Figure-source and geometry decisions

Figures are platform-authored SVGs attached only to the following **14 audited questions** (11 required + 3 beneficial). The stem remains the authority for its facts; coordinates used only to lay out schematic views are never exposed as a grid or claimed as measurements.

| Question          | Source checked                       | Visual content and answer-protection decision                                                                                                                                           |
| ----------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `geo-l01-t01-q10` | Lesson 1 pages 6–7                   | Two exactly congruent triangle outlines, one rotated 45° from the other; no length/angle marks or translation arrow.                                                                    |
| `geo-l02-t01-q08` | Lesson 2 page 9                      | Both compass-circle intersections X and Y are shown with identical open-point marks; only the stated G→H vector is arrowed. The prompt now names X/Y so the figure labels are explicit. |
| `geo-l03-t01-q16` | Lesson 3 pages 14–15                 | Original circle with K on its circumference and an unlabelled centre mark; no translated image is drawn.                                                                                |
| `geo-l04-t01-q06` | Lesson 4 pages 17–18                 | Corresponding labelled triangles; coordinates are derived from BC=EF=6 cm and the given 50°/70° angles. Side ticks show BC=EF only; angle arcs are unticked.                            |
| `geo-l04-t01-q08` | Lesson 4 page 18                     | Parallelogram ABCD with the stated diagonal AC; no side or angle marks.                                                                                                                 |
| `geo-l04-t01-q13` | Lesson 4 page 19                     | Kite ABCD and common diagonal AC; ticks encode AB=AD and CB=CD only.                                                                                                                    |
| `geo-l04-t01-q15` | Lesson 4 page 19                     | Two right triangles with right-angle marks and ticks on BC/EF and AB/DE only; the requested AC/DF sides carry no label or equality mark.                                                |
| `geo-l04-t01-q17` | Lesson 4 page 18                     | Intersecting lines and triangles AMB/EMF; ticks encode AM=ME and BM=MF only; no vertical-angle equality marks.                                                                          |
| `geo-l05-t01-q03` | Unit exercise source, Question 1     | Parallelogram MNPQ in the stated vertex order; no arrows are drawn on the answer-choice vectors.                                                                                        |
| `geo-l06-t01-q06` | Unit exercise source, Questions 3–15 | Isosceles triangle, the given equal-side ticks, and equal arcs for the angle bisector; no right-angle or midpoint mark.                                                                 |
| `geo-l06-t01-q12` | Unit exercise source, Questions 3–15 | Parallelogram and diagonals crossing at O; the prompt minimally clarifies that O is their intersection. No midpoint marks are added.                                                    |
| `geo-u01-t01-q19` | Unit 1 lesson 2, pages 8–10          | Same two-candidate compass construction; the prompt explicitly states the A→B translation and names X/Y.                                                                                |
| `geo-u01-t01-q37` | Unit 1 lesson 4, pages 17–19         | Kite ABCD and common diagonal AC; only the two given side equalities are marked.                                                                                                        |
| `geo-u01-t01-q38` | Unit 1 lesson 4, pages 17–19         | One unscaled representative right triangle; annotations show the given 5 cm leg and 15 cm² area, never the requested leg.                                                               |

The Lesson 3 translation/shape questions were prioritized in the visual review, but remain text-only where showing the translated image would disclose the invariant being tested. Likewise, the angle-computation items remain text-only because an accurately scaled drawing could reveal the requested result.

All three stem clarifications are deliberately small: (1) Lesson 2 q08 names the two already-mentioned compass intersections X and Y; (2) Lesson 6 q12 identifies O as the diagonals’ intersection, which its proof steps already assume; (3) Unit 1 q19 restates the A→B vector already used in its reasoning. No answer, choices, difficulty, question type, source references, solution content, scoring semantics, or assessment flow was changed.

## Automated audit and review

- **Coverage:** machine-readable classification map contains all 200 live IDs and tests require 11 A, 3 B, and 186 C questions. Every A/B question has exactly one figure; C questions have none.
- **Scene validity:** Zod checks finite coordinates/radii, unique point IDs and visible labels, valid primitive references, non-zero segments/polygons, valid angle rays, and geometrically perpendicular right-angle marks.
- **Label/reference consistency:** visible point labels must exactly match `questionLabels`, which must be present in the question prompt. Text annotations are checked against prompt notation; Latin letters/digits in alt text and captions must be inside inline-math isolates. Figure provenance must cite a source page already cited by that question.
- **SVG/mobile/accessibility:** tests cover responsive `viewBox` + `preserveAspectRatio`, LTR isolation inside RTL content, accessible names, keyboard-operable zoom, and the scrollable mobile zoom viewport.
- **Answer leakage:** tests ensure answers are absent from figure text/annotations, numeric results are not annotated, and compass candidates remain visually equivalent with only the given translation vector shown.
- **Manual source/math/pedagogy review:** checked question wording and cited lesson/source locations; reviewed each figure for label correspondence, no invented metric labels, no answer marks, no solution-only active-test content, and no modification to lesson assessments, Teacher Area, authentication, persistence/scoring, navigation, or lazy solution loading.

## Verification and pull request

Final verification results and the real pull-request number/URL, branch, commit hash, and CI status will be recorded here after the required commands run and the PR is opened.
