import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@/components/diagram/renderers';
import { QuestionRenderer } from '@/routes/tests/QuestionRenderer';
import { TestSolutionDetailPage } from '@/routes/tests/TestSolutionDetailPage';
import {
  TEST_FIGURE_RENDERER,
  testFigureSpecSchema,
} from '@/components/diagram/renderers/testFigureSpec';
import {
  L4_CASE_ONE,
  L4_CASE_THREE,
  L4_PRACTICE_THREE_INTRO,
  L4_PRACTICE_THREE_NOTE,
  L4_PRACTICE_THREE_QUESTIONS,
  L4_RIGHT_TRIANGLES_ITEMS,
} from '@/content/units/lesson-04-questions';
import { catalog, getTestEntry, loadSolutionSet, testDefinitions } from './registry';
import { solutionSetCompletenessIssues } from './solutionAudit';
import { answers, gradeQuestionDetailed, gradeTest } from './scoring';
import type { AnswerMap, TestQuestion } from './schema';

const TEST_ID = 'lesson-04-test';
const LESSON_ID = 'lesson-04-triangle-congruence';
const SOURCE_PAGES = [17, 18, 19];
const ENGINE_MAXIMUM = 31;

const entry = getTestEntry(TEST_ID)!;

function correctAnswer(question: TestQuestion) {
  switch (question.type) {
    case 'single-choice':
      return answers.single(question.answerId);
    case 'multi-select':
      return answers.multi(question.answerIds);
    case 'true-false':
      return answers.boolean(question.answer);
    case 'true-false-justify':
      return answers.trueFalseJustify(
        question.answer,
        question.answer === false ? question.correction?.answerId : undefined,
        question.justification?.answerId,
      );
    case 'numeric':
      return answers.numeric(String(question.answer));
    case 'exact':
      return answers.exact(`${question.answer.numerator}/${question.answer.denominator}`);
    case 'ordering':
      return answers.order(question.answerOrder);
    case 'matching':
      return answers.matching(question.pairs);
    case 'classification':
      return answers.classification(question.assignment);
    case 'error-analysis':
      return answers.errorAnalysis(
        question.answerId,
        question.correction?.answerId,
        question.justification?.answerId,
      );
  }
}

function compositePartPoints(question: TestQuestion): Map<string, number> {
  const points = new Map<string, number>();
  if (question.type === 'true-false-justify') {
    if (question.correction) points.set(question.correction.id, question.correction.points);
    if (question.justification)
      points.set(question.justification.id, question.justification.points);
  } else if (question.type === 'error-analysis') {
    if (question.correction) points.set(question.correction.id, question.correction.points);
    if (question.justification)
      points.set(question.justification.id, question.justification.points);
  }
  return points;
}

function questionById(id: string): TestQuestion {
  const question = entry.questions.find((candidate) => candidate.id === id);
  if (!question) throw new Error(`Missing question ${id}`);
  return question;
}

function promptText(question: TestQuestion): string {
  return question.prompt
    .filter((block) => block.type === 'paragraph')
    .map((block) => block.text)
    .join(' ');
}

function pagesOf(refs: readonly { page: number | string }[] | undefined): number[] {
  return [...new Set((refs ?? []).map((ref) => Number(ref.page)))].sort((a, b) => a - b);
}

describe('Lesson 4 — rebuilt test contract («تطابق المثلثات»)', () => {
  it('publishes all 20 stable Lesson 4 question IDs scoped strictly to textbook pages 17–19', () => {
    expect(entry).toBeDefined();
    expect(entry.definition.id).toBe(TEST_ID);
    expect(entry.definition.scope).toBe('lesson');
    expect(entry.definition.targetId).toBe(LESSON_ID);
    expect(entry.definition.questionIds).toHaveLength(20);
    expect(entry.questions).toHaveLength(20);
    expect(new Set(entry.questions.map((question) => question.id)).size).toBe(20);
    expect(entry.definition.questionIds).toEqual(entry.questions.map((question) => question.id));
    expect(entry.definition.questionIds).toEqual(
      Array.from(
        { length: 20 },
        (_, index) => `geo-l04-t01-q${String(index + 1).padStart(2, '0')}`,
      ),
    );
    expect(entry.questions.every((question) => question.lessonId === LESSON_ID)).toBe(true);
    expect(entry.questions.every((question) => question.sourceRefs.length > 0)).toBe(true);
    expect(
      entry.questions
        .flatMap((question) => question.sourceRefs)
        .every((reference) => SOURCE_PAGES.includes(Number(reference.page))),
    ).toBe(true);
    expect(entry.definition.solutionPolicy).toBe('detailed');
    expect(entry.definition.solutionGroupSize).toBe(5);
    expect(entry.definition.passingScore).toBe(60);
  });

  it('keeps the declared blueprint, non-trivial option ordering, and Test Area isolation intact', () => {
    expect(entry.definition.blueprint.coverage).toEqual([
      { concept: 'congruence-cases', label: 'حالات تطابق مثلثين الثلاث الأساسية', count: 7 },
      { concept: 'right-triangle-cases', label: 'تطابق المثلثات القائمة', count: 5 },
      {
        concept: 'proofs-reasoning',
        label: 'البراهين والاستنتاجات في متوازي الأضلاع والمضلعات',
        count: 4,
      },
      {
        concept: 'kite-isosceles',
        label: 'تطبيقات الطائرة الورقية والمثلث المتساوي الساقين',
        count: 4,
      },
    ]);
    expect(entry.definition.blueprint.difficulty).toEqual([
      { level: 'basic', count: 5 },
      { level: 'medium', count: 8 },
      { level: 'advanced', count: 5 },
      { level: 'thinking', count: 2 },
    ]);
    expect(entry.definition.blueprint.types).toEqual([
      { type: 'single-choice', count: 7 },
      { type: 'true-false-justify', count: 3 },
      { type: 'multi-select', count: 2 },
      { type: 'numeric', count: 2 },
      { type: 'exact', count: 1 },
      { type: 'ordering', count: 1 },
      { type: 'matching', count: 1 },
      { type: 'classification', count: 1 },
      { type: 'error-analysis', count: 2 },
    ]);
    expect(
      testDefinitions
        .filter((definition) => definition.solutionPolicy === 'detailed')
        .map((definition) => definition.id),
    ).toContain(TEST_ID);
    expect(catalog.lessonTests).toHaveLength(8);
    expect(catalog.unitTests).toHaveLength(1);
    expect(catalog.problems).toEqual([]);

    // Ordering (q12) must not display items in already-solved order.
    const q12 = questionById('geo-l04-t01-q12');
    if (q12.type !== 'ordering') throw new Error('Expected q12 to be ordering');
    expect(q12.items.map((item) => item.id)).not.toEqual(q12.answerOrder);

    // Matching (q10) must not list right-hand targets in trivial 1-to-1 row order.
    const q10 = questionById('geo-l04-t01-q10');
    if (q10.type !== 'matching') throw new Error('Expected q10 to be matching');
    expect(q10.right.map((item) => item.id)).not.toEqual(
      q10.left.map((item) => q10.pairs[item.id]),
    );

    // Single-choice items vary the position of the keyed choice across the bank.
    const singleChoicePositions = entry.questions
      .filter(
        (q): q is Extract<TestQuestion, { type: 'single-choice' }> => q.type === 'single-choice',
      )
      .map((q) => q.choices.findIndex((c) => c.id === q.answerId));
    expect(new Set(singleChoicePositions).size).toBeGreaterThanOrEqual(3);
  });

  it('passes the strict detailed-solution audit and keeps question/solution page citations 1-to-1', async () => {
    const solutions = await loadSolutionSet(TEST_ID);
    expect(solutions).toBeDefined();
    expect(solutions!.testId).toBe(TEST_ID);
    expect(solutionSetCompletenessIssues(entry.definition, entry.questions, solutions)).toEqual([]);
    expect(Object.keys(solutions!.solutions)).toHaveLength(20);

    for (const question of entry.questions) {
      const solution = solutions!.solutions[question.id]!;
      expect(solution.sourceRefs?.length, `${question.id} solution refs`).toBeGreaterThan(0);
      expect(
        solution.sourceRefs!.every(
          (ref) => SOURCE_PAGES.includes(Number(ref.page)) && Boolean(ref.locator),
        ),
        `${question.id} cites an out-of-scope page`,
      ).toBe(true);
      expect(pagesOf(solution.sourceRefs), `${question.id} page alignment`).toEqual(
        pagesOf(question.sourceRefs),
      );
      expect(solution.provenance.sourceVerified.length, question.id).toBeGreaterThan(0);
      expect(solution.provenance.platformAuthored.length, question.id).toBeGreaterThan(0);
      expect(solution.check, `${question.id} check`).toBeTruthy();
      expect(solution.commonError, `${question.id} commonError`).toBeTruthy();
    }

    // Verify exact textbook page boundaries are respected (no proximity over-citation).
    expect(L4_CASE_ONE).toContain('المحصورة');
    expect(pagesOf(questionById('geo-l04-t01-q01').sourceRefs)).toEqual([17]);
    expect(L4_CASE_THREE).toContain('أضلاع');
    expect(pagesOf(questionById('geo-l04-t01-q03').sourceRefs)).toEqual([18]);
    expect(L4_RIGHT_TRIANGLES_ITEMS[0]).toContain('وتر وضلع قائمة');
    expect(pagesOf(questionById('geo-l04-t01-q05').sourceRefs)).toEqual([19]);
    expect(pagesOf(questionById('geo-l04-t01-q08').sourceRefs)).toEqual([18]);
    expect(pagesOf(questionById('geo-l04-t01-q14').sourceRefs)).toEqual([17, 19]);
  });

  it('matches every rubric total to the engine maximum and totals 31 points', async () => {
    const solutions = await loadSolutionSet(TEST_ID);
    let maximum = 0;
    for (const question of entry.questions) {
      const engineMaximum = gradeQuestionDetailed(question, undefined).maxPoints;
      maximum += engineMaximum;
      const solution = solutions!.solutions[question.id]!;
      const criteria = solution.scoringCriteria.reduce((sum, item) => sum + item.points, 0);
      expect(criteria, question.id).toBe(engineMaximum);

      const expectedParts = compositePartPoints(question);
      expect(solution.parts.map((part) => part.id).sort()).toEqual(
        [...expectedParts.keys()].sort(),
      );
      for (const part of solution.parts) {
        expect(part.sourceRefs?.length, `${question.id}/${part.id}`).toBeGreaterThan(0);
        expect(
          part.scoringCriteria.reduce((sum, item) => sum + item.points, 0),
          `${question.id}/${part.id} rubric`,
        ).toBe(expectedParts.get(part.id));
      }
    }
    expect(maximum).toBe(ENGINE_MAXIMUM);

    const perQuestion = Object.fromEntries(
      entry.questions.map((question) => [
        question.id,
        gradeQuestionDetailed(question, undefined).maxPoints,
      ]),
    );
    expect(perQuestion).toEqual({
      'geo-l04-t01-q01': 1,
      'geo-l04-t01-q02': 2,
      'geo-l04-t01-q03': 1,
      'geo-l04-t01-q04': 1,
      'geo-l04-t01-q05': 1,
      'geo-l04-t01-q06': 1,
      'geo-l04-t01-q07': 2,
      'geo-l04-t01-q08': 1,
      'geo-l04-t01-q09': 1,
      'geo-l04-t01-q10': 3,
      'geo-l04-t01-q11': 1,
      'geo-l04-t01-q12': 3,
      'geo-l04-t01-q13': 1,
      'geo-l04-t01-q14': 1,
      'geo-l04-t01-q15': 1,
      'geo-l04-t01-q16': 3,
      'geo-l04-t01-q17': 1,
      'geo-l04-t01-q18': 1,
      'geo-l04-t01-q19': 3,
      'geo-l04-t01-q20': 2,
    });
  });

  it('grades a full sheet as 31/31 (100%), an empty sheet as 0/31, and lands the 60% pass mark on 19/31', () => {
    const fullSheet: AnswerMap = Object.fromEntries(
      entry.questions.map((question) => [question.id, correctAnswer(question)]),
    );
    expect(
      gradeTest(TEST_ID, entry.definition.passingScore, entry.questions, fullSheet),
    ).toMatchObject({
      earnedPoints: 31,
      maxPoints: 31,
      score: 100,
      passed: true,
      correct: 20,
      partiallyCorrect: 0,
      incorrect: 0,
      unanswered: 0,
    });
    expect(gradeTest(TEST_ID, entry.definition.passingScore, entry.questions, {})).toMatchObject({
      earnedPoints: 0,
      maxPoints: 31,
      score: 0,
      passed: false,
      unanswered: 20,
    });

    // 18/31 -> 58% (fails); 19/31 -> 61% (passes).
    const eighteen: AnswerMap = {};
    for (const id of [
      'geo-l04-t01-q01',
      'geo-l04-t01-q03',
      'geo-l04-t01-q04',
      'geo-l04-t01-q05',
      'geo-l04-t01-q06',
      'geo-l04-t01-q08',
      'geo-l04-t01-q09',
      'geo-l04-t01-q11',
      'geo-l04-t01-q13',
      'geo-l04-t01-q14',
      'geo-l04-t01-q15',
      'geo-l04-t01-q17',
      'geo-l04-t01-q18',
      'geo-l04-t01-q02',
      'geo-l04-t01-q10',
    ]) {
      eighteen[id] = correctAnswer(questionById(id));
    }
    expect(
      gradeTest(TEST_ID, entry.definition.passingScore, entry.questions, eighteen),
    ).toMatchObject({
      earnedPoints: 18,
      maxPoints: 31,
      score: 58,
      passed: false,
    });

    eighteen['geo-l04-t01-q12'] = answers.order(['s1', 's3', 's2']);
    expect(
      gradeTest(TEST_ID, entry.definition.passingScore, entry.questions, eighteen),
    ).toMatchObject({
      earnedPoints: 19,
      maxPoints: 31,
      score: 61,
      passed: true,
    });
  });

  it('q02 & q07: verify source-faithful true/false claims and independent part scoring', async () => {
    const solutions = await loadSolutionSet(TEST_ID);

    // q02: three equal angles do NOT force congruence; provenance separates printed rules from platform counterexample.
    const q02 = questionById('geo-l04-t01-q02');
    if (q02.type !== 'true-false-justify') throw new Error('Expected q02 to be true-false-justify');
    expect(q02.answer).toBe(false);
    expect(q02.correction?.answerId).toBe('fix-side');
    const sol02 = solutions!.solutions['geo-l04-t01-q02']!;
    expect(JSON.stringify(sol02.provenance.sourceVerified)).not.toContain('التشابه');
    expect(gradeQuestionDetailed(q02, answers.trueFalseJustify(false, 'fix-side'))).toMatchObject({
      outcome: 'correct',
      earnedPoints: 2,
      maxPoints: 2,
    });
    expect(gradeQuestionDetailed(q02, answers.trueFalseJustify(false))).toMatchObject({
      outcome: 'partially-correct',
      earnedPoints: 1,
      maxPoints: 2,
    });
    expect(
      gradeQuestionDetailed(q02, answers.trueFalseJustify(false, 'fix-two-angles')),
    ).toMatchObject({ outcome: 'partially-correct', earnedPoints: 1, maxPoints: 2 });
    expect(gradeQuestionDetailed(q02, answers.trueFalseJustify(true, 'fix-sum'))).toMatchObject({
      outcome: 'incorrect',
      earnedPoints: 0,
      maxPoints: 2,
    });

    // q07: hypotenuse + acute angle is true, justified via 180° angle sum + Case 2.
    const q07 = questionById('geo-l04-t01-q07');
    if (q07.type !== 'true-false-justify') throw new Error('Expected q07 to be true-false-justify');
    expect(q07.answer).toBe(true);
    expect(q07.justification?.answerId).toBe('acute-asa');
    expect(
      gradeQuestionDetailed(q07, answers.trueFalseJustify(true, undefined, 'acute-asa')),
    ).toMatchObject({ outcome: 'correct', earnedPoints: 2, maxPoints: 2 });
    expect(gradeQuestionDetailed(q07, answers.trueFalseJustify(true))).toMatchObject({
      outcome: 'partially-correct',
      earnedPoints: 1,
      maxPoints: 2,
    });
  });

  it('q04 & q14: verify explicit hypotenuse-leg instruction, pedagogical provenance, exact geometry, and rational grading', async () => {
    const solutions = await loadSolutionSet(TEST_ID);

    // q04 must give AC = 7.5 cm (not AB = 7.5 cm directly) so isosceles + correspondence are both required.
    const q04 = questionById('geo-l04-t01-q04');
    const q04Text = promptText(q04);
    expect(q04Text).toContain('AC = 7.5');
    expect(q04Text).not.toContain('AB = AC = 7.5');
    expect(gradeQuestionDetailed(q04, answers.numeric('7.5'))).toMatchObject({
      outcome: 'correct',
      earnedPoints: 1,
    });
    expect(gradeQuestionDetailed(q04, answers.numeric('5'))).toMatchObject({
      outcome: 'incorrect',
      earnedPoints: 0,
    });

    // q14: right triangles ABC (at A) and DEF (at D), BC = EF, AB = DE = 4 cm, Area(ABC) = 15 cm²,
    // explicitly asking to compute leg [DF] using «الوتر وضلع القائمة» -> 15/2 = 7.5 cm (NOT area 15!).
    const q14 = questionById('geo-l04-t01-q14');
    if (q14.type !== 'exact') throw new Error('Expected q14 to be exact');
    const q14Text = promptText(q14);
    expect(q14Text).toContain('BC = EF');
    expect(q14Text).not.toContain('8.5');
    expect(q14Text).toContain('AB = DE = 4');
    expect(q14Text).toContain('15\\ \\mathrm{cm}^2');
    expect(q14Text).toContain('طول الضلع القائم $[DF]$');
    expect(q14Text).toContain('«الوتر وضلع القائمة»');
    expect(q14.unit).toBe('cm');
    expect(q14.answer).toEqual({ numerator: 15, denominator: 2 });

    // Solution & provenance must acknowledge the Pythagorean path and frame congruence as the pedagogical goal,
    // never claiming congruence is the sole mathematical route.
    const sol14 = solutions!.solutions['geo-l04-t01-q14']!;
    const sol14Authored = JSON.stringify(sol14.provenance.platformAuthored);
    expect(sol14.check).toContain('فيثاغورس');
    expect(sol14Authored).toContain('فيثاغورس');
    expect(sol14Authored).toContain('الهدف التعليمي');
    expect(sol14Authored).not.toContain('ضرورياً للانتقال');

    // Arithmetic & Euclidean right-triangle verification: (4, 7.5, 8.5) via both congruence and Pythagoras.
    const legAB = 4;
    const areaABC = 15;
    const legAC = (2 * areaABC) / legAB;
    expect(legAC).toBe(7.5);
    const hypotenuse = Math.hypot(legAB, legAC);
    expect(hypotenuse).toBe(8.5);
    expect(hypotenuse).toBeGreaterThan(legAC);
    expect(Math.sqrt(hypotenuse ** 2 - legAB ** 2)).toBe(7.5);

    // Grading checks: equivalent fractions/decimals pass; area (15) or missing factor-1/2 (15/4 = 3.75) fail.
    for (const valid of ['15/2', '7.5', '30/4', '7,5']) {
      expect(gradeQuestionDetailed(q14, answers.exact(valid)), valid).toMatchObject({
        outcome: 'correct',
        earnedPoints: 1,
        maxPoints: 1,
      });
    }
    for (const invalid of ['15', '15/4', '3.75', '4', '8.5']) {
      expect(gradeQuestionDetailed(q14, answers.exact(invalid)), invalid).toMatchObject({
        outcome: 'incorrect',
        earnedPoints: 0,
        maxPoints: 1,
      });
    }
  });

  it('q16 & q19: localize the student error to s3 alone and award 0/3, 1/3, 2/3, 3/3 deterministically', async () => {
    const solutions = await loadSolutionSet(TEST_ID);

    // q16: SSA non-included angle error in s3.
    const q16 = questionById('geo-l04-t01-q16');
    if (q16.type !== 'error-analysis') throw new Error('Expected q16 to be error-analysis');
    expect(q16.steps.map((s) => s.id)).toEqual(['s1', 's2', 's3']);
    expect(q16.steps[0]!.text).toContain('AB = DE');
    expect(q16.steps[1]!.text).toContain('\\widehat{A} = \\widehat{D}');
    expect(q16.steps[2]!.text).toContain('الحالة الأولى');
    const q16Step3Choices = q16.choices.filter((c) => c.text.includes('الخطوة 3'));
    expect(q16Step3Choices.map((c) => c.id)).toEqual(['c-err']);
    expect(q16.answerId).toBe('c-err');
    expect(
      gradeQuestionDetailed(q16, answers.errorAnalysis('c-err', 'fix-included', 'why-included')),
    ).toMatchObject({ outcome: 'correct', earnedPoints: 3, maxPoints: 3 });
    expect(
      gradeQuestionDetailed(q16, answers.errorAnalysis('c-err', 'fix-keep', 'why-included')),
    ).toMatchObject({ outcome: 'partially-correct', earnedPoints: 2, maxPoints: 3 });
    expect(
      gradeQuestionDetailed(q16, answers.errorAnalysis('c-err', 'fix-keep', 'why-perimeter')),
    ).toMatchObject({ outcome: 'partially-correct', earnedPoints: 1, maxPoints: 3 });
    expect(
      gradeQuestionDetailed(q16, answers.errorAnalysis('c-ok', 'fix-keep', 'why-perimeter')),
    ).toMatchObject({ outcome: 'incorrect', earnedPoints: 0, maxPoints: 3 });

    // q19: false converse (equal perimeter & equal area => congruence) in s3, plus verified integer counterexample.
    const q19 = questionById('geo-l04-t01-q19');
    if (q19.type !== 'error-analysis') throw new Error('Expected q19 to be error-analysis');
    expect(q19.steps.map((s) => s.id)).toEqual(['s1', 's2', 's3']);
    expect(q19.steps[0]!.text).toContain('طبوقين');
    expect(q19.steps[1]!.text).toContain('المحيطين متساويين');
    expect(q19.steps[2]!.text).toContain('إذن');
    const q19Step3Choices = q19.choices.filter((c) => c.text.includes('الخطوة 3'));
    expect(q19Step3Choices.map((c) => c.id)).toEqual(['ch-err']);
    expect(q19.answerId).toBe('ch-err');

    // Verify the counterexample (29, 29, 40) vs (37, 37, 24) documented in q19's check!
    const sol19Check = solutions!.solutions['geo-l04-t01-q19']!.check ?? '';
    expect(sol19Check).toContain('(29, 29, 40)');
    expect(sol19Check).toContain('(37, 37, 24)');
    expect(29 + 29 + 40).toBe(98);
    expect(37 + 37 + 24).toBe(98);
    expect(0.5 * 40 * Math.sqrt(29 ** 2 - 20 ** 2)).toBe(420);
    expect(0.5 * 24 * Math.sqrt(37 ** 2 - 12 ** 2)).toBe(420);

    expect(
      gradeQuestionDetailed(q19, answers.errorAnalysis('ch-err', 'fix-cases', 'why-converse')),
    ).toMatchObject({ outcome: 'correct', earnedPoints: 3, maxPoints: 3 });
    expect(
      gradeQuestionDetailed(q19, answers.errorAnalysis('ch-s1', 'fix-cases', 'why-converse')),
    ).toMatchObject({ outcome: 'partially-correct', earnedPoints: 2, maxPoints: 3 });
  });

  it('q18 & q20: match textbook Practice ③ on page 19 and respect the Unit 3 boundary note', async () => {
    const solutions = await loadSolutionSet(TEST_ID);

    // Textbook p. 19 explicitly defers standalone isosceles-altitude theorems to Unit 3;
    // q18 must record that boundary honestly in provenance and derive via right-triangle congruence.
    expect(L4_PRACTICE_THREE_NOTE).toContain('الوحدة الثالثة');
    const sol18 = solutions!.solutions['geo-l04-t01-q18']!;
    expect(JSON.stringify(sol18.provenance.sourceVerified)).toContain('الوحدة الثالثة');

    // Textbook p. 19 Practice ③ proves AB = AC via midpoint M of [BC] and perpendiculars ME ⊥ (AB), MF ⊥ (AC)
    // through MEB ≅ MFC then MEA ≅ MFA — NOT by dropping altitude [AH] and assuming hypotenuse equality!
    expect(L4_PRACTICE_THREE_INTRO).toContain('BM = MC');
    expect(L4_PRACTICE_THREE_QUESTIONS[0]!.text).toContain('MEB');
    expect(L4_PRACTICE_THREE_QUESTIONS[1]!.text).toContain('MEA');
    expect(L4_PRACTICE_THREE_QUESTIONS[2]!.text).toContain('متساوي الساقين');

    const q20 = questionById('geo-l04-t01-q20');
    if (q20.type !== 'true-false-justify') throw new Error('Expected q20 to be true-false-justify');
    const q20Text = promptText(q20);
    expect(q20Text).toContain('ME \\perp (AB)');
    expect(q20Text).toContain('MF \\perp (AC)');
    expect(q20Text).toContain('MEB');
    expect(q20Text).toContain('MEA');
    expect(q20Text).not.toContain('بإسقاط ارتفاع');
    expect(q20.answer).toBe(true);
    expect(q20.justification?.answerId).toBe('two-step-proof');

    // Grading & circular-reasoning distractor check on q20:
    expect(
      gradeQuestionDetailed(q20, answers.trueFalseJustify(true, undefined, 'two-step-proof')),
    ).toMatchObject({ outcome: 'correct', earnedPoints: 2, maxPoints: 2 });
    expect(
      gradeQuestionDetailed(q20, answers.trueFalseJustify(true, undefined, 'circular-hyp')),
    ).toMatchObject({ outcome: 'partially-correct', earnedPoints: 1, maxPoints: 2 });
    expect(
      gradeQuestionDetailed(q20, answers.trueFalseJustify(false, undefined, 'circular-hyp')),
    ).toMatchObject({ outcome: 'incorrect', earnedPoints: 0, maxPoints: 2 });
  });

  it('keeps the 5 audited figures geometrically exact and renders all questions & detailed solutions cleanly', async () => {
    const figureQuestions = entry.questions.filter((q) =>
      q.prompt.some((block) => block.type === 'figure'),
    );
    expect(figureQuestions.map((q) => q.id)).toEqual([
      'geo-l04-t01-q06',
      'geo-l04-t01-q08',
      'geo-l04-t01-q13',
      'geo-l04-t01-q15',
      'geo-l04-t01-q17',
    ]);

    for (const question of figureQuestions) {
      const figBlock = question.prompt.find((b) => b.type === 'figure')!;
      expect(figBlock.diagram.kind).toBe('constructed');
      if (figBlock.diagram.kind !== 'constructed') throw new Error('Expected constructed figure');
      expect(figBlock.diagram.renderer).toBe(TEST_FIGURE_RENDERER);
      expect(figBlock.diagram.origin).toBe('authored');
      testFigureSpecSchema.parse(figBlock.diagram.construction);
    }

    // Render every question in QuestionRenderer without raw '$' or KaTeX errors.
    for (const question of entry.questions) {
      const { container, unmount } = render(
        <QuestionRenderer question={question} value={undefined} onChange={() => undefined} />,
      );
      expect(container.textContent, `${question.id} raw $`).not.toContain('$');
      expect(container.querySelector('.katex-error'), `${question.id} katex-error`).toBeNull();
      if (figureQuestions.some((fq) => fq.id === question.id)) {
        expect(container.querySelector('svg[role="img"]'), `${question.id} svg`).not.toBeNull();
      }
      unmount();
    }

    // Render the detailed solution page for Lesson 4 and verify group 1–5 loads with detailed rubrics & provenance.
    const { container, unmount } = render(
      <MemoryRouter initialEntries={[`/tests/solutions/${TEST_ID}`]}>
        <Routes>
          <Route path="/tests/solutions/:testId" element={<TestSolutionDetailPage />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(await screen.findAllByText('بيان موثّق من المصدر:')).toHaveLength(5);
    expect(screen.getAllByText('الشرح التحليلي من المنصّة:')).toHaveLength(5);
    expect(container.textContent).not.toContain('$');
    expect(container.querySelector('.katex-error')).toBeNull();
    unmount();
  });
});
