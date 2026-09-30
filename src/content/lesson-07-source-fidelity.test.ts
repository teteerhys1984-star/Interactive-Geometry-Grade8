import { describe, expect, it } from 'vitest';
import { getLesson, lessonDiagrams } from './registry';
import { lesson07Exercises } from './units/lesson-07-unit-exercises-final';

const lesson = getLesson('lesson-07-unit-one-exercises-final')!.lesson;

/** Independent transcription pinned to the supplied Q16–Q28 scans. */
const PRINTED_PROMPTS = [
  '① $ANMD$ متوازي أضلاع و $ABCD$ مستطيل.\n1. أثبت أنّ المثلثين $ANB$، $MCD$ طبوقان.\n2. ما صورة المثلث $ANB$ وفق الانسحاب الذي ينقل $N$ إلى $M$؟\n3. استنتج تعليلاً آخر لتطابق المثلثين $ANB$، $MCD$.\n② 1. أثبت أنّ المثلثين $NCB$، $MCA$ طبوقان.\n2. أثبت أنّ المثلثين $NAB$، $MBA$ طبوقان.\n3. ما نوع المثلث $CBA$؟',
  '1. أكمل التعريفات الآتية:\n① النقطة $B$ هي صورة النقطة $A$ وفق التناظر الذي مركزه $O$، معناه أنَّ ....................\n② النقطة $C$ هي صورة النقطة $D$ وفق الانسحاب الذي ينقل $I$ إلى $J$، معناه أنَّ ....................\n③ النقطة $E$ هي صورة النقطة $F$ وفق التناظر الذي محوره $(d)$، معناه أنَّ ....................\n2. انقل الأشكال إلى دفترك وأكمل رسم التحويلات.',
  'انقل الشكل في كلٍّ من الحالتين، ثم ارسم:\n① صورته وفق التناظر الذي مركزه $O$ باللون الأخضر.\n② صورته وفق الانسحاب الذي ينقل $A$ إلى $B$ باللون الأزرق.\n① صورته وفق التناظر الذي محوره $(d)$ باللون الأحمر.\nالحالة ① على ورقة سنتيمترية، والحالة ② على ورقة بيضاء.',
  'إليك نصّ التمرين الآتي:\n1. ارسم مثلثاً $ABC$ قائماً في $A$.\n2. ارسم $C’$ و $B’$ صورتَي $C$ و $B$ وفق الانسحاب الذي ينقل $A$ إلى $B$.\n3. ما طبيعة المثلث $BB’C’$؟\n4. ما طبيعة الرباعي $ABC’C$؟\nوإليك حلّ أحد التلاميذ وقد كُتبت عليه ملاحظات الأستاذ باللون الأحمر. صحّح الحلّ مستعيناً بهذه الملاحظات.',
  'الخاصة: قطرا المستطيل متساويا الطول.\n1. $MNPQ$ مستطيل، إذن .............. = ..............\n2. رباعي $ABCD$ فيه $AC=BD$، هل هو بالضرورة مستطيل؟ اشرح إجابتك.',
  'في الشكل المجاور، $MN = 2\\,cm$، والقطعة $[M’N’]$ هي صورة القطعة $[MN]$ وفق الانسحاب الذي ينقل $A$ إلى $B$.\n1. أثبت أنّ $M’N’ = 2\\,cm$.\n2. أكمل الجدول الآتي.',
  '$ABC$ مثلث كيفي. النقطة $A’$ هي صورة النقطة $A$ وفق الانسحاب الذي ينقل $C$ إلى $B$.\n1. ارسم الشكل.\n2. أثبت أنّ القطعتين $[AB]$ و $[A’C]$ متناصفتان.',
  '$ABCD$ رباعي. النقطة $I$ هي منتصف القطعة $[CD]$، والنقطة $J$ هي منتصف القطعة $[AB]$، والنقطة $K$ هي صورة النقطة $B$ وفق الانسحاب الذي ينقل $I$ إلى $A$.\n1. ارسم الشكل.\n2. أثبت أنّ $J$ هي منتصف القطعة $[IK]$.',
  'في الشكل المجاور، $ABCD$ متوازي أضلاع.\n1. أثبت أنّ المثلثين $ABO$، $ODC$ طبوقان.\n2. استنتج أنّ قطري متوازي الأضلاع متناصفان.',
  'في الشكل المجاور، $ABCD$ مستطيل.\n1. أثبت أنّ المثلثين $ABC$، $ADB$ طبوقان.\n2. استنتج أنّ قطري المستطيل متساويا الطول.',
  'في الشكل المجاور، $ABCD$ معين.\n1. أثبت أنّ المثلثين $ABO$، $ODA$ طبوقان.\n2. استنتج أنّ قطري المعين متعامدان.',
  'في الشكل المجاور، النقاط $D$ و $A$ و $B$ و $N$ على استقامة واحدة وبهذا الترتيب، و $DA = BN$، و $CA = CB$.\n1. أثبت أنّ المثلثين $CBN$، $CDA$ طبوقان.\n2. ما نوع المثلث $DCN$؟',
  'في الشكل المجاور، المستقيمان $(d)$ و $(d’)$ متوازيان، والزاويتان $\\widehat{1}$ و $\\widehat{2}$ متبادلتان داخلاً.\n1. ارسم من $O$ منتصف القطعة $[AB]$ مستقيماً يعامد $(d)$ في $M$ ويقطع $(d’)$ في $N$.\n2. استفد من الخاصة «العمود على أحد مستقيمين متوازيين عمود على الآخر» لتثبت أنّ المثلثين $OMA$، $ONB$ طبوقان.\n3. استنتج أنّ $\\widehat{1} = \\widehat{2}$.',
] as const;

describe('Lesson 7 — Q16–Q28 source fidelity', () => {
  it('is an independent lesson: one step per question, plus an opener and a recap', () => {
    expect(lesson.title).toBe('تتمة الدرس الخامس (2): تمرينات الوحدة الأولى — الأسئلة 16–28');
    expect(lesson.steps).toHaveLength(15);
    expect(lesson.steps.map((step) => step.id)).toEqual([
      'intro-unit-final-lab',
      ...Array.from({ length: 13 }, (_, index) => `exercise-q${index + 16}`),
      'recap-unit-final-map',
    ]);
    expect(lesson.steps.filter((step) => step.origin === 'source')).toHaveLength(13);
  });

  it('keeps every complete printed prompt character-for-character', () => {
    expect(lesson07Exercises.map((exercise) => exercise.prompt)).toEqual(PRINTED_PROMPTS);
    const renderedPrompts = lesson.steps
      .filter((step) => step.origin === 'source')
      .map((step) => {
        const group = step.blocks.find((block) => block.type === 'questionGroup');
        return group?.type === 'questionGroup' ? group.items[0]?.text : undefined;
      });
    expect(renderedPrompts).toEqual(PRINTED_PROMPTS);
  });

  it('accounts for all 39 printed branches and instructions', () => {
    expect(lesson07Exercises.map((exercise) => exercise.printedTaskCount)).toEqual([
      6, 4, 3, 4, 2, 2, 4, 3, 2, 2, 2, 2, 3,
    ]);
    expect(lesson07Exercises.reduce((sum, exercise) => sum + exercise.printedTaskCount, 0)).toBe(
      39,
    );
  });

  it('reproduces the printed reasoning tables with their blanks intact', () => {
    const tables = lesson.steps.flatMap((step) =>
      step.blocks.filter((block) => block.type === 'table'),
    );
    // Q19 (corrector's notes) + Q20 + Q21 + two for Q22 + the authored recap map.
    expect(tables).toHaveLength(6);
    for (const table of tables) {
      if (table.type !== 'table') continue;
      for (const row of table.rows) expect(row).toHaveLength(table.columns.length);
    }
    const q21 = lesson.steps.find((step) => step.id === 'exercise-q21')!;
    const serialized = JSON.stringify(q21.blocks);
    expect(serialized).toContain('....................');
    expect(serialized).not.toContain('الانسحاب يحافظ على الأطوال«');
  });

  it('reproduces the printed deduction chart of Q23 verbatim, blanks included', () => {
    const q23 = lesson.steps.find((step) => step.id === 'exercise-q23')!;
    const chart = q23.blocks.find(
      (block) => block.type === 'figure' && block.diagram.id === 'fig-ex7-q23-proof-flow',
    );
    expect(chart).toBeDefined();
    if (chart?.type !== 'figure' || chart.diagram.kind !== 'interactive') return;
    expect(chart.diagram.renderer).toBe('proof-flow');
    const serialized = JSON.stringify(chart.diagram.params);
    expect(serialized).toContain('لدينا من النص');
    expect(serialized).toContain('........... هو متوازي أضلاع');
    expect(serialized).toContain('خاصة ....................');
    // The answers to the two blanks are NOT in the printed chart.
    expect(serialized).not.toContain('$IAKB$ هو متوازي أضلاع');
  });

  it('adds no duplicate final test because the exercises are the assessment', () => {
    expect(lesson.assessment).toBeUndefined();
  });

  it('provides one detailed teacher solution per main question', () => {
    const solutions = lesson.teacherResources?.textbookSolutions ?? [];
    expect(solutions).toHaveLength(13);
    expect(solutions.map((solution) => solution.question)).toEqual(PRINTED_PROMPTS);
    expect(solutions.map((solution) => solution.id)).toEqual(
      Array.from({ length: 13 }, (_, index) => `teacher-sol-q${index + 16}`),
    );
  });

  it('flags exactly the solutions that lean on a figure kept as a reference', () => {
    const flagged = (lesson.teacherResources?.textbookSolutions ?? []).filter(
      (solution) => solution.limitation,
    );
    expect(flagged.map((solution) => solution.id)).toEqual([
      'teacher-sol-q16',
      'teacher-sol-q17',
      'teacher-sol-q18',
      'teacher-sol-q19',
      'teacher-sol-q21',
    ]);
  });

  it('classifies all 39 diagram records exactly as documented', () => {
    const diagrams = lessonDiagrams(lesson);
    expect(diagrams).toHaveLength(39);
    expect(diagrams.filter((diagram) => diagram.kind === 'reference')).toHaveLength(5);
    expect(
      diagrams.filter((diagram) => diagram.origin === 'textbook' && diagram.kind !== 'reference'),
    ).toHaveLength(8);
    expect(diagrams.filter((diagram) => diagram.origin === 'authored')).toHaveLength(26);
  });

  it('keeps reconstructed source figures answer-free and cites their page', () => {
    const reconstructed = lessonDiagrams(lesson).filter(
      (diagram) => diagram.origin === 'textbook' && diagram.kind !== 'reference',
    );
    expect(reconstructed.map((diagram) => diagram.id)).toEqual([
      'fig-ex7-q16-rect-parallelogram',
      'fig-ex7-q20-rectangle-diagonals',
      'fig-ex7-q23-proof-flow',
      'fig-ex7-q24-parallelogram',
      'fig-ex7-q25-rectangle',
      'fig-ex7-q26-rhombus',
      'fig-ex7-q27-isosceles',
      'fig-ex7-q28-parallels',
    ]);
    for (const diagram of reconstructed) {
      expect(diagram.source, `${diagram.id} must cite its page`).toBeDefined();
      if (diagram.kind !== 'interactive') continue;
      expect(diagram.params).not.toHaveProperty('answers');
      expect(diagram.params).not.toHaveProperty('reveals');
    }
  });

  it('never repeats the same interaction shape across the thirteen questions', () => {
    const signatures = lesson07Exercises.map((exercise) =>
      [
        exercise.tasks.map((task) => task.kind).join('+'),
        exercise.hintLadder ? 'ladder' : 'no-ladder',
      ].join('|'),
    );
    // Consecutive questions never share a signature.
    signatures.forEach((signature, index) => {
      if (index === 0) return;
      expect(signature, `question ${index + 16} repeats the previous activity shape`).not.toBe(
        signatures[index - 1],
      );
    });
    // Every one of the three task kinds is genuinely used.
    const kinds = new Set(lesson07Exercises.flatMap((e) => e.tasks.map((task) => task.kind)));
    expect([...kinds].sort()).toEqual(['choice', 'multi', 'order']);
  });

  it('never ships an ordering task already in its correct order', () => {
    for (const exercise of lesson07Exercises) {
      for (const task of exercise.tasks) {
        if (task.kind !== 'order') continue;
        const initial = task.items.map((item) => item.id);
        expect(initial, `${exercise.number}/${task.id} starts already solved`).not.toEqual(
          task.order,
        );
        expect([...initial].sort()).toEqual([...task.order].sort());
      }
    }
  });

  it('gives every multi-select task at least one genuine distractor', () => {
    for (const exercise of lesson07Exercises) {
      for (const task of exercise.tasks) {
        if (task.kind !== 'multi') continue;
        expect(task.answers.length).toBeLessThan(task.options.length);
        for (const answer of task.answers) {
          expect(task.options.map((option) => option.id)).toContain(answer);
        }
      }
    }
  });

  it('points every single-choice task at an option that exists', () => {
    for (const exercise of lesson07Exercises) {
      for (const task of exercise.tasks) {
        if (task.kind !== 'choice') continue;
        expect(task.options.map((option) => option.id)).toContain(task.answer);
        expect(task.options.length).toBeGreaterThanOrEqual(3);
      }
    }
  });

  it('keeps the full reasoning out of the hint rungs themselves', () => {
    for (const exercise of lesson07Exercises) {
      if (!exercise.hintLadder) continue;
      expect(exercise.hintLadder.hints.length).toBeGreaterThanOrEqual(2);
      expect(exercise.hintLadder.solution.length).toBeGreaterThanOrEqual(3);
    }
  });
});
