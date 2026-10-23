import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import '@/components/diagram/renderers';
import { QuestionRenderer } from '@/routes/tests/QuestionRenderer';
import {
  TEST_FIGURE_RENDERER,
  testFigureSpecSchema,
} from '@/components/diagram/renderers/testFigureSpec';
import { catalog, getTestEntry, loadSolutionSet, testDefinitions } from './registry';
import { solutionSetCompletenessIssues } from './solutionAudit';
import { answers, gradeQuestionDetailed, gradeTest } from './scoring';
import type { AnswerMap, TestQuestion } from './schema';

const TEST_ID = 'lesson-03-test';
const LESSON_ID = 'lesson-03-image-of-a-shape';
const SOURCE_PAGES = [11, 12, 13, 14, 15, 16];
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
  const question = entry!.questions.find((candidate) => candidate.id === id);
  if (!question) throw new Error(`Missing question ${id}`);
  return question;
}

describe('Lesson 3 — rebuilt test contract', () => {
  it('publishes exactly the 20 stable Lesson 3 question IDs, all scoped to pages 11–16', () => {
    expect(entry).toBeDefined();
    expect(entry!.definition.id).toBe(TEST_ID);
    expect(entry!.definition.scope).toBe('lesson');
    expect(entry!.definition.targetId).toBe(LESSON_ID);
    expect(entry!.definition.questionIds).toHaveLength(20);
    expect(entry!.questions).toHaveLength(20);
    expect(new Set(entry!.questions.map((question) => question.id)).size).toBe(20);
    expect(entry!.definition.questionIds).toEqual(entry!.questions.map((question) => question.id));
    expect(entry!.definition.questionIds).toEqual(
      Array.from(
        { length: 20 },
        (_, index) => `geo-l03-t01-q${String(index + 1).padStart(2, '0')}`,
      ),
    );
    expect(entry!.questions.every((question) => question.lessonId === LESSON_ID)).toBe(true);
    expect(entry!.questions.every((question) => question.sourceRefs.length > 0)).toBe(true);
    expect(
      entry!.questions
        .flatMap((question) => question.sourceRefs)
        .every((reference) => SOURCE_PAGES.includes(Number(reference.page))),
    ).toBe(true);
    expect(entry!.definition.solutionPolicy).toBe('detailed');
    expect(entry!.definition.solutionGroupSize).toBe(5);
    expect(entry!.definition.passingScore).toBe(60);
  });

  it('keeps the declared blueprint aligned with the actual bank and stays inside the Test Area', () => {
    expect(entry!.definition.blueprint.types).toEqual([
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
    // The rebuild adds no lesson test, no unit test and no new bank.
    expect(catalog.lessonTests).toHaveLength(7);
    expect(catalog.unitTests).toHaveLength(1);
    expect(catalog.problems).toEqual([]);
  });

  it('passes the strict detailed-solution audit with zero issues', async () => {
    const solutions = await loadSolutionSet(TEST_ID);
    expect(solutions).toBeDefined();
    expect(solutions!.testId).toBe(TEST_ID);
    expect(solutionSetCompletenessIssues(entry!.definition, entry!.questions, solutions)).toEqual(
      [],
    );
    expect(Object.keys(solutions!.solutions)).toHaveLength(20);
  });

  it('gives every solution a printed page, an explicit source/platform split and a sourced rubric', async () => {
    const solutions = await loadSolutionSet(TEST_ID);
    for (const question of entry!.questions) {
      const solution = solutions!.solutions[question.id]!;
      expect(
        solution.sourceRefs?.length,
        `${question.id} needs solution citations`,
      ).toBeGreaterThan(0);
      expect(
        solution.sourceRefs!.every(
          (reference) =>
            SOURCE_PAGES.includes(Number(reference.page)) && Boolean(reference.locator),
        ),
        `${question.id} cites an unsupported page`,
      ).toBe(true);
      expect(solution.provenance.sourceVerified.length, question.id).toBeGreaterThan(0);
      expect(solution.provenance.platformAuthored.length, question.id).toBeGreaterThan(0);
      for (const part of solution.parts) {
        expect(
          part.sourceRefs?.length,
          `${question.id}/${part.id} source references`,
        ).toBeGreaterThan(0);
        expect(
          part.scoringCriteria.reduce((sum, criterion) => sum + criterion.points, 0),
          `${question.id}/${part.id} rubric`,
        ).toBe(compositePartPoints(question).get(part.id));
      }
    }
  });

  it('matches every rubric total to the engine maximum and to the documented 31 points', async () => {
    const solutions = await loadSolutionSet(TEST_ID);
    let maximum = 0;
    for (const question of entry!.questions) {
      const engineMaximum = gradeQuestionDetailed(question, undefined).maxPoints;
      maximum += engineMaximum;
      const criteria = solutions!.solutions[question.id]!.scoringCriteria.reduce(
        (sum, criterion) => sum + criterion.points,
        0,
      );
      expect(criteria, question.id).toBe(engineMaximum);
      const expectedParts = compositePartPoints(question);
      expect(solutions!.solutions[question.id]!.parts.map((part) => part.id).sort()).toEqual(
        [...expectedParts.keys()].sort(),
      );
      for (const part of solutions!.solutions[question.id]!.parts) {
        expect(
          part.scoringCriteria.reduce((sum, criterion) => sum + criterion.points, 0),
          `${question.id}/${part.id}`,
        ).toBe(expectedParts.get(part.id));
      }
    }
    expect(maximum).toBe(ENGINE_MAXIMUM);

    const perQuestion = new Map(
      entry!.questions.map((question) => [
        question.id,
        gradeQuestionDetailed(question, undefined).maxPoints,
      ]),
    );
    expect(Object.fromEntries(perQuestion)).toEqual({
      'geo-l03-t01-q01': 1,
      'geo-l03-t01-q02': 2,
      'geo-l03-t01-q03': 1,
      'geo-l03-t01-q04': 1,
      'geo-l03-t01-q05': 1,
      'geo-l03-t01-q06': 1,
      'geo-l03-t01-q07': 2,
      'geo-l03-t01-q08': 1,
      'geo-l03-t01-q09': 1,
      'geo-l03-t01-q10': 3,
      'geo-l03-t01-q11': 1,
      'geo-l03-t01-q12': 3,
      'geo-l03-t01-q13': 1,
      'geo-l03-t01-q14': 1,
      'geo-l03-t01-q15': 1,
      'geo-l03-t01-q16': 3,
      'geo-l03-t01-q17': 1,
      'geo-l03-t01-q18': 1,
      'geo-l03-t01-q19': 3,
      'geo-l03-t01-q20': 2,
    });
  });

  it('grades a fully correct sheet as 31/31 and applies the configured 60% pass mark', () => {
    const answerMap: AnswerMap = Object.fromEntries(
      entry!.questions.map((question) => [question.id, correctAnswer(question)]),
    );
    const result = gradeTest(TEST_ID, entry!.definition.passingScore, entry!.questions, answerMap);
    expect(result).toMatchObject({
      earnedPoints: 31,
      maxPoints: 31,
      score: 100,
      passed: true,
      unanswered: 0,
    });
    expect(result.outcomes).toHaveLength(20);

    const empty = gradeTest(TEST_ID, entry!.definition.passingScore, entry!.questions, {});
    expect(empty).toMatchObject({ earnedPoints: 0, maxPoints: 31, score: 0, passed: false });
  });

  it('awards the expected partial and incorrect scores without changing shared scoring', () => {
    // q02: correct verdict, missing justification → 1/2.
    expect(
      gradeQuestionDetailed(questionById('geo-l03-t01-q02'), answers.trueFalseJustify(true)),
    ).toMatchObject({ outcome: 'partially-correct', earnedPoints: 1, maxPoints: 2 });

    // q07: correct verdict «false», missing correction → 1/2.
    expect(
      gradeQuestionDetailed(questionById('geo-l03-t01-q07'), answers.trueFalseJustify(false)),
    ).toMatchObject({ outcome: 'partially-correct', earnedPoints: 1, maxPoints: 2 });

    // q16: right error location, wrong correction, right reason → 2/3.
    expect(
      gradeQuestionDetailed(
        questionById('geo-l03-t01-q16'),
        answers.errorAnalysis('ch-centre', 'centre-o', 'image-of-centre'),
      ),
    ).toMatchObject({ outcome: 'partially-correct', earnedPoints: 2, maxPoints: 3 });

    // q16: wrong location, wrong correction, wrong reason → 0/3.
    expect(
      gradeQuestionDetailed(
        questionById('geo-l03-t01-q16'),
        answers.errorAnalysis('ch-none', 'centre-k', 'radius-doubles'),
      ),
    ).toMatchObject({ outcome: 'incorrect', earnedPoints: 0, maxPoints: 3 });

    // q10: one of three matching pairs → 1/3.
    expect(
      gradeQuestionDetailed(
        questionById('geo-l03-t01-q10'),
        answers.matching({ 'l-ray': 'r-ray' }),
      ),
    ).toMatchObject({ outcome: 'partially-correct', earnedPoints: 1, maxPoints: 3 });

    // q12: only the first step stays in place → 1/3.
    expect(
      gradeQuestionDetailed(questionById('geo-l03-t01-q12'), answers.order(['s1', 's3', 's2'])),
    ).toMatchObject({ outcome: 'partially-correct', earnedPoints: 1, maxPoints: 3 });

    // q14: exact answer accepted in both authored forms.
    expect(
      gradeQuestionDetailed(questionById('geo-l03-t01-q14'), answers.exact('10.8')),
    ).toMatchObject({ outcome: 'correct', earnedPoints: 1, maxPoints: 1 });
    expect(
      gradeQuestionDetailed(questionById('geo-l03-t01-q14'), answers.exact('54/5')),
    ).toMatchObject({ outcome: 'correct', earnedPoints: 1, maxPoints: 1 });
    expect(
      gradeQuestionDetailed(questionById('geo-l03-t01-q14'), answers.exact('5.4')),
    ).toMatchObject({ outcome: 'incorrect', earnedPoints: 0, maxPoints: 1 });
  });

  it('renders every question through the existing KaTeX/RTL renderer without raw delimiters', () => {
    for (const question of entry!.questions) {
      const { container, unmount } = render(
        <QuestionRenderer question={question} value={undefined} onChange={() => undefined} />,
      );
      expect(container.textContent, `${question.id}: raw math delimiters`).not.toContain('$');
      expect(container.querySelector('.katex-error'), `${question.id}: invalid math`).toBeNull();
      if (container.querySelector('.katex')) {
        expect(
          container.querySelector('[dir="ltr"]'),
          `${question.id}: math lacks LTR isolation`,
        ).not.toBeNull();
      }
      unmount();
    }
  });

  it('keeps the single audited figure required by q16 and renders it as an authored SVG', () => {
    const figureBlocks = entry!.questions.flatMap((question) =>
      question.prompt.filter((block) => block.type === 'figure'),
    );
    expect(figureBlocks).toHaveLength(1);
    for (const block of figureBlocks) {
      expect(block.diagram.kind).toBe('constructed');
      if (block.diagram.kind !== 'constructed') throw new Error('Expected a constructed figure');
      expect(block.diagram.renderer).toBe(TEST_FIGURE_RENDERER);
      expect(block.diagram.origin).toBe('authored');
      const parsed = testFigureSpecSchema.parse(block.diagram.construction);
      expect(parsed.circles).toHaveLength(1);
      expect(parsed.circles?.[0]?.radius).toBe(3);
      expect(parsed.questionLabels).toEqual(['K']);
      const points = new Map(parsed.points.map((point) => [point.id, point]));
      const rim = points.get('K')!;
      const centre = points.get('center')!;
      expect(centre.showLabel).toBe(false);
      expect(Math.hypot(rim.x - centre.x, rim.y - centre.y)).toBeCloseTo(3, 10);
    }

    const { container } = render(
      <QuestionRenderer
        question={questionById('geo-l03-t01-q16')}
        value={undefined}
        onChange={() => undefined}
      />,
    );
    const svg = container.querySelector('svg[role="img"]');
    expect(svg).not.toBeNull();
    expect(svg!.getAttribute('aria-label')).toContain('دائرة');
    expect(svg!.querySelectorAll('circle').length).toBeGreaterThanOrEqual(1);
  });

  it('preserves matching, correction/justification and classification answer data shapes', () => {
    const map: AnswerMap = Object.fromEntries(
      entry!.questions.map((question) => [question.id, correctAnswer(question)]),
    );
    expect(map['geo-l03-t01-q10']).toEqual({
      kind: 'matching',
      pairs: { 'l-ray': 'r-ray', 'l-seg': 'r-seg', 'l-cir': 'r-cir' },
    });
    expect(map['geo-l03-t01-q02']).toEqual({
      kind: 'true-false-justify',
      value: true,
      justificationId: 'preserve',
    });
    expect(map['geo-l03-t01-q07']).toEqual({
      kind: 'true-false-justify',
      value: false,
      correctionId: 'perp',
    });
    expect(map['geo-l03-t01-q16']).toEqual({
      kind: 'error-analysis',
      stepId: 'ch-centre',
      correctionId: 'centre-o-image',
      justificationId: 'image-of-centre',
    });
    expect(map['geo-l03-t01-q11']).toMatchObject({
      kind: 'classification',
      assignments: { i1: 'cat-parallel', i3: 'cat-not-parallel' },
    });
  });
});
