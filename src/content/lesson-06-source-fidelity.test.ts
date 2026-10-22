import { describe, expect, it } from 'vitest';
import { getLesson, lessonDiagrams } from './registry';
import type { ContentBlock } from './schema';
import { lesson06Exercises } from './units/lesson-06-unit-exercises-continuation';

const lesson = getLesson('lesson-06-unit-one-exercises-continuation')!.lesson;

/** Independent transcription pinned to the supplied Q3–Q15 scans. */
const PRINTED_PROMPTS = [
  'في الشكل المجاور، $\\widehat{xAz}=\\widehat{yAz}$.\n1. أثبت أنّ المثلثين $ABM$، $AMC$ طبوقان.\n2. استنتج أنّ $CM=MB$.',
  'في كلٍّ من الشكلين ① و ② ثلاث نقاط $A$ و $B$ و $C$.\nانقل الشكل إلى صفحة بيضاء وأكمل في كل حالة متوازي الأضلاع $ABCD$.',
  '$AOB$ مثلث متساوي الساقين في $O$. والنقطتان $C$ و $D$ هما نظيرتا $A$ و $B$ على التوالي.\n1. ارسم شكلاً يحقق معطيات المسألة.\n2. أثبت أنّ الرباعي $ABCD$ هو متوازي أضلاع.',
  'تأمّل الشكل المرسوم جانباً:\n1. انقل هذا الشكل إلى صفحة سنتمترية.\n2. ارسم صورة الشكل ① ولتكن الشكل ② وفق الانسحاب الذي ينقل $A$ إلى $C$.\n3. استعمل الانسحاب ذاته لرسم صورة الشكل ② وارمز لهذه الصورة بالرمز ③.\n4. ممّ تكون قد تحققت؟',
  'في معلم متجانس:\n1. وضّع النقاط $A(-2,0)$ و $B(2,3)$ و $M(4,1)$.\n2. وضّع صورة النقطة $M$ واكتب إحداثييها:\n① وفق الانسحاب الذي ينقل $A$ إلى $B$.\n② وفق الانسحاب الذي ينقل $B$ إلى $A$.',
  '$REC$ مثلث قائم الزاوية في $R$.\nالنقطة $A$ هي صورة $E$ وفق الانسحاب الذي ينقل $R$ إلى $C$.\n1. ارسم شكلاً متّفقاً مع معطيات المسألة.\n2. ما طبيعة الرباعي $REAC$؟ اشرح إجابتك.\n3. وازن بين طولي $[EC]$ و $[RA]$. اشرح إجابتك.',
  'ارسم، في كلّ حالة، صورة المستقيم $(d)$ وفق الانسحاب الذي ينقل النقطة $A$ إلى النقطة $B$.',
  'في الشكل المرسوم جانباً، $C$ نقطة من المستقيم $(d)$.\n1. انقل هذا الشكل إلى دفترك.\n2. ارسم $C’$ صورة النقطة $C$ وفق الانسحاب الذي ينقل $B$ إلى $A$.\n3. وباستعمال الفرجار والمسطرة، ارسم $(d’)$ صورة المستقيم $(d)$ وفق ذلك الانسحاب. اشرح عملك.',
  'في الشكل المجاور، $ABC$ مثلث متساوي الساقين.\n1. أثبت أنّ المثلثين $CNA$، $CBN$ طبوقان.\n2. استنتج أنّ $AN=NB$.\n3. هل $\\widehat{ACN}=\\widehat{NCB}$ ولماذا؟',
  'ارسم مستقيماً مارّاً بنقطتين $U$ و $V$ ونقطة $J$ لا تنتمي إليه.\n1. ارسم $(\\Delta)$ صورة المستقيم $(UV)$ وفق الانسحاب الذي ينقل $V$ إلى $J$.\n2. ارسم $(d)$ صورة المستقيم $(UV)$ وفق التناظر الذي مركزه $J$.\n3. هل المستقيمان $(\\Delta)$ و $(d)$ متوازيان؟ اشرح إجابتك.',
  'تأمّل الشكل الآتي:\n1. وفق الانسحاب الذي ينقل $A$ إلى $B$، ما صورة:\n① النقطة $C$؟ ② النقطة $F$؟ ③ النقطة $H$؟ ④ النقطة $M$؟\n2. وفق الانسحاب الذي ينقل $A$ إلى $B$، ما النقطة التي:\n① صورتها $D$؟ ② صورتها $I$؟ ③ صورتها $H$؟\nحدّد وفق الانسحاب الذي ينقل $A$ إلى $B$، مثلثين طبوقين',
  '1. ارسم، باللون الأسود، مستطيلاً $ABCD$ بعداه $AB=2\\,cm$ و $AD=4\\,cm$.\n2. ارسم:\n① باللون الأزرق، صورة المستطيل $ABCD$ وفق الانسحاب الذي ينقل $A$ إلى $B$.\n② باللون الأحمر، صورة المستطيل $ABCD$ وفق الانسحاب الذي ينقل $D$ إلى $A$.\n③ باللون الأخضر، صورة المستطيل $ABCD$ وفق الانسحاب الذي ينقل $B$ إلى $D$.',
  'المثلث $ABC$ المرسوم جانباً، قائمٌ في $A$ و $AB=3\\,cm$ و $AC=2\\,cm$. $E$ نقطة من وتره $[BC]$، $CE=1\\,cm$.\nارسم هذا المثلث على دفترك، ثم ارسم صورته وفق الانسحاب الذي ينقل $C$ إلى $E$.',
] as const;

/** Printed sub-part labels, per main question, exactly as the source prints them. */
const BRANCH_LABELS: Record<number, string[]> = {
  3: ['1.', '2.'],
  4: ['①', '②'],
  5: ['1.', '2.'],
  6: ['1.', '2.', '3.', '4.'],
  7: ['1.', '2.①', '2.②'],
  8: ['1.', '2.', '3.'],
  9: ['(1)-①', '(1)-②', '(1)-③', '(2)-①', '(2)-②', '(2)-③'],
  10: ['1.', '2.', '3.'],
  11: ['1.', '2.', '3.'],
  12: ['التمهيد', '1.', '2.', '3.'],
  13: ['1.①', '1.②', '1.③', '1.④', '2.①', '2.②', '2.③', 'البند الثالث'],
  14: ['1.', '2.①', '2.②', '2.③'],
  15: ['رسم المثلث', 'رسم الصورة'],
};

/** Every callout title inside a block tree, in reading order. */
function calloutTitles(blocks: ContentBlock[]): string[] {
  const titles: string[] = [];
  for (const block of blocks) {
    if (block.type === 'callout') {
      if (block.title) titles.push(block.title);
      titles.push(...calloutTitles(block.blocks));
    } else if (block.type === 'teaching') {
      titles.push(...calloutTitles(block.blocks));
    }
  }
  return titles;
}

function branchTitlesOf(blocks: ContentBlock[]): string[] {
  return calloutTitles(blocks).filter((title) => title.startsWith('الفرع '));
}

describe('Lesson 6 — Q3–Q15 source fidelity', () => {
  it('is a separate 13-step lesson in exact question order', () => {
    expect(lesson.title).toBe('تتمة الدرس الخامس (1): تمرينات الوحدة الأولى — الأسئلة 3–15');
    expect(lesson.steps).toHaveLength(13);
    expect(lesson.steps.map((step) => step.id)).toEqual(
      Array.from({ length: 13 }, (_, index) => `exercise-q${index + 3}`),
    );
    expect(lesson.steps.every((step) => step.origin === 'source')).toBe(true);
  });

  it('keeps every complete printed prompt character-for-character', () => {
    expect(lesson06Exercises.map((exercise) => exercise.prompt)).toEqual(PRINTED_PROMPTS);
    const renderedPrompts = lesson.steps.map((step) => {
      const group = step.blocks.find((block) => block.type === 'questionGroup');
      return group?.type === 'questionGroup' ? group.items[0]?.text : undefined;
    });
    expect(renderedPrompts).toEqual(PRINTED_PROMPTS);
  });

  it('keeps the printed Q5 hint verbatim', () => {
    const q5 = lesson.steps[2]!;
    const serialized = JSON.stringify(q5.blocks);
    expect(serialized).toContain(
      'نقول إنّ المثلث $AOB$ متساوي الساقين في $O$، عندما تكون $O$ نقطة تقاطع ضلعيه المتساويين.',
    );
  });

  it('accounts for all 46 printed branches and construction tasks', () => {
    expect(lesson06Exercises.map((exercise) => exercise.printedTaskCount)).toEqual([
      2, 2, 2, 4, 3, 3, 6, 3, 3, 4, 8, 4, 2,
    ]);
    expect(lesson06Exercises.reduce((sum, exercise) => sum + exercise.printedTaskCount, 0)).toBe(
      46,
    );
  });

  it('adds no duplicate final test because the exercises are the assessment', () => {
    expect(lesson.assessment).toBeUndefined();
  });

  it('provides one detailed teacher solution per main question', () => {
    const solutions = lesson.teacherResources?.textbookSolutions ?? [];
    expect(solutions).toHaveLength(13);
    expect(solutions.map((solution) => solution.question)).toEqual(PRINTED_PROMPTS);
  });

  it('classifies all 26 diagram records exactly as documented', () => {
    const diagrams = lessonDiagrams(lesson);
    expect(diagrams).toHaveLength(26);
    // No Lesson 06 figure is a «راجع الكتاب» placeholder any more.
    expect(diagrams.filter((diagram) => diagram.kind === 'reference')).toHaveLength(0);
    expect(
      diagrams.filter((diagram) => diagram.origin === 'textbook' && diagram.kind !== 'reference'),
    ).toHaveLength(8);
    expect(diagrams.filter((diagram) => diagram.origin === 'authored')).toHaveLength(18);
  });

  it('keeps reconstructed source figures answer-free', () => {
    const reconstructed = lessonDiagrams(lesson).filter(
      (diagram) => diagram.origin === 'textbook' && diagram.kind !== 'reference',
    );
    expect(reconstructed.map((diagram) => diagram.id)).toEqual([
      'fig-ex6-q3-angle-bisector',
      'fig-ex6-q4-three-points',
      'fig-ex6-q6-grid-shape',
      'fig-ex6-q9-six-lines',
      'fig-ex6-q10-line-construction',
      'fig-ex6-q11-isosceles-altitude',
      'fig-ex6-q13-point-grid',
      'fig-ex6-q15-right-triangle',
    ]);
    for (const diagram of reconstructed) {
      if (diagram.kind !== 'interactive') continue;
      expect(diagram.params).not.toHaveProperty('answers');
      expect(diagram.params).not.toHaveProperty('reveals');
    }
  });

  /* ------------------------------------------------------------------ depth */

  it('solves every printed sub-part once, in printed order, with its own record', () => {
    expect(lesson06Exercises.flatMap((exercise) => exercise.branches)).toHaveLength(46);
    for (const exercise of lesson06Exercises) {
      const expected = BRANCH_LABELS[exercise.number];
      expect(expected, `missing label pin for Q${exercise.number}`).toBeDefined();
      expect(
        exercise.branches.map((branch) => branch.label),
        `Q${exercise.number}`,
      ).toEqual(expected);
      expect(exercise.branches).toHaveLength(exercise.printedTaskCount);
      for (const branch of exercise.branches) {
        expect(branch.aim.length, `Q${exercise.number} ${branch.label} aim`).toBeGreaterThan(0);
        expect(branch.steps.length, `Q${exercise.number} ${branch.label} steps`).toBeGreaterThan(0);
        expect(branch.result.length, `Q${exercise.number} ${branch.label} result`).toBeGreaterThan(
          0,
        );
        // A branch describes the task; it must not re-quote the printed prompt.
        expect(branch.aim).not.toBe(exercise.prompt);
        expect(branch.steps.join(' ')).not.toBe(exercise.prompt);
      }
    }
  });

  it('reveals every branch to the learner with the same labels and order', () => {
    lesson06Exercises.forEach((exercise, index) => {
      const step = lesson.steps[index]!;
      expect(step.id).toBe(`exercise-q${exercise.number}`);
      expect(branchTitlesOf(step.blocks)).toEqual(
        exercise.branches.map((branch) => `الفرع ${branch.label}`),
      );
    });
    // The branches stay inside the collapsible solution, never in the question card.
    for (const step of lesson.steps) {
      const first = step.blocks[0];
      expect(first?.type).toBe('questionGroup');
      if (first?.type !== 'questionGroup') continue;
      expect(JSON.stringify(first.items)).not.toContain('الفرع ');
    }
  });

  it('renders every branch inside its main-question teacher solution, in order', () => {
    const solutions = lesson.teacherResources?.textbookSolutions ?? [];
    expect(solutions).toHaveLength(13);
    lesson06Exercises.forEach((exercise, index) => {
      const solution = solutions[index]!;
      expect(solution.id).toBe(`teacher-sol-q${exercise.number}`);
      expect(solution.reference).toContain(`السؤال ${exercise.number}`);
      expect(branchTitlesOf(solution.blocks)).toEqual(
        exercise.branches.map((branch) => `الفرع ${branch.label}`),
      );
      expect(solution.question).toBe(exercise.prompt);
    });
  });

  it('flags the solutions whose answer depends on a reference figure or a documented reading', () => {
    const solutions = lesson.teacherResources?.textbookSolutions ?? [];
    const flagged = solutions.filter((solution) => solution.limitation).map((s) => s.id);
    expect(flagged).toEqual([
      'teacher-sol-q3',
      'teacher-sol-q4',
      'teacher-sol-q5',
      'teacher-sol-q6',
      'teacher-sol-q9',
      'teacher-sol-q10',
      'teacher-sol-q11',
    ]);
  });

  it('keeps typographic apostrophes out of the authored solution maths', () => {
    // The printed prompts keep the source's U+2019 verbatim; authored blocks use
    // ASCII primes so KaTeX typesets a real prime (′) instead of a text glyph.
    const solutions = lesson.teacherResources?.textbookSolutions ?? [];
    for (const solution of solutions) {
      const serialized = JSON.stringify(solution.blocks);
      expect(serialized, solution.id).not.toMatch(/\$[^$]*’[^$]*\$/);
    }
  });

  it('renders the six-case Q9 figure and accounts for every case', () => {
    const q9 = lesson06Exercises.find((exercise) => exercise.number === 9)!;
    expect(q9.sourceFigure?.type).toBe('reconstructed');
    expect(q9.sourceFigure?.scenario).toBe('q9-six-lines');
    expect(q9.sourceFigure?.alt).toContain('ست حالات');
    expect(q9.branches.map((branch) => branch.label)).toEqual([
      '(1)-①',
      '(1)-②',
      '(1)-③',
      '(2)-①',
      '(2)-②',
      '(2)-③',
    ]);
    expect(q9.printedTaskCount).toBe(q9.branches.length);
  });

  it('preserves both verified Q4 box layouts without inventing coordinates', () => {
    const q4 = lesson06Exercises.find((exercise) => exercise.number === 4)!;
    const alt = q4.sourceFigure?.alt ?? '';
    expect(alt).toContain('$A$ أعلى اليسار');
    expect(alt).toContain('$C$ وسط اليمين');
    expect(alt).toContain('$B$ أسفل الوسط');
    expect(alt).toContain('$B$ أسفل اليسار الأوسط');
    expect(alt).toContain('$C$ أسفل اليمين');
    expect(q4.sourceFigure?.type).toBe('reconstructed');
    expect(q4.sourceFigure?.scenario).toBe('q4-parallelogram-points');
    expect(q4.branches.map((branch) => branch.label)).toEqual(['①', '②']);
  });

  it('keeps the verified Q6 figure data and the 3-left / 2-down movement', () => {
    const q6 = lesson06Exercises.find((exercise) => exercise.number === 6)!;
    expect(q6.sourceFigure?.scenario).toBe('q6-source-grid');
    expect(q6.sourceFigure?.alt).toContain('الصف الرابع من أعلى الشبكة');
    expect(q6.branches[1]!.steps.join(' ')).toContain('ثلاث خانات إلى اليسار');
    expect(q6.branches[1]!.steps.join(' ')).toContain('خانتان إلى الأسفل');
    expect(q6.tasks[0]!.choices[0]!.label).toBe('3 خانات يساراً و2 إلى الأسفل');
    expect(q6.limitation).toContain('(4;2)');
  });

  it('keeps the Q6 item-4 transcription that the supplied scan confirms', () => {
    const q6 = lesson06Exercises.find((exercise) => exercise.number === 6)!;
    // Supplied crop: «4. ممّ تكون قد تحققت؟» — two joined meems, shadda + fatha
    // over the final meem, no alif. The alternative «مَ تكون» is not the source.
    expect(q6.prompt).toContain('4. ممّ تكون قد تحققت؟');
    expect(q6.prompt).not.toContain('مَ تكون');
    expect(q6.prompt).not.toContain('ممّا');
    expect(q6.limitation).toContain('ممّ');
    expect(q6.limitation).toContain('بقصّة صورة المصدر');
  });

  it('matches the second supplied crop, which prints Q12 item 3 rather than Q13 item 3', () => {
    // The crop reads «3. هل المستقيمان (Δ) و (d) متوازيان؟ اشرح إجابتك.» — that is
    // this lesson's Q12 item 3 verbatim. It contains neither «طبوقين» nor
    // «متطابقين», so it settles no part of Q13.
    const q12 = lesson06Exercises.find((exercise) => exercise.number === 12)!;
    expect(q12.prompt.split('\n').at(-1)).toBe(
      '3. هل المستقيمان $(\\Delta)$ و $(d)$ متوازيان؟ اشرح إجابتك.',
    );
    const q13 = lesson06Exercises.find((exercise) => exercise.number === 13)!;
    expect(q12.prompt).not.toBe(q13.prompt);
  });

  it('keeps Q13’s unnumbered closing item exactly as the supplied crop prints it', () => {
    const q13 = lesson06Exercises.find((exercise) => exercise.number === 13)!;
    const closing = q13.prompt.split('\n').at(-1) ?? '';
    // Supplied Q13 crop, last line:
    //   «حدد وفق الانسحاب الذي ينقل A إلى B، مثلثين طبوقين»
    // The adjective is «طبوقين» (ط + ب with one dot below), not «متطابقين»; the
    // item carries no leading numeral and the line ends without a period. The
    // crop shows no shadda over the leading verb, but a single crop cannot prove
    // the typesetting drops it, so the pinned «حدّد» is deliberately kept and the
    // observation is recorded in docs/LESSON-06-FIGURES.md.
    expect(closing).toBe('حدّد وفق الانسحاب الذي ينقل $A$ إلى $B$، مثلثين طبوقين');
    expect(closing).toContain('مثلثين طبوقين');
    expect(closing).not.toContain('متطابقين');
    expect(closing).not.toMatch(/^\d/);
    expect(closing.endsWith('.')).toBe(false);
  });

  it('keeps Q13’s third item without a leading numeral and Q14 immediately after it', () => {
    const q13 = lesson06Exercises.find((exercise) => exercise.number === 13)!;
    expect(q13.prompt).not.toContain('3. حدّد');
    expect(q13.branches.at(-1)?.label).toBe('البند الثالث');
    const q13Index = lesson.steps.findIndex((step) => step.id === 'exercise-q13');
    expect(lesson.steps[q13Index + 1]?.id).toBe('exercise-q14');
  });
});
