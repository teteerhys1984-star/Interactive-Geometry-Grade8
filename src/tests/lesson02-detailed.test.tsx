import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import '@/components/diagram/renderers';
import { QuestionRenderer } from '@/routes/tests/QuestionRenderer';
import {
  TEST_FIGURE_RENDERER,
  testFigureSpecSchema,
} from '@/components/diagram/renderers/testFigureSpec';
import { getTestEntry, loadSolutionSet, testDefinitions } from './registry';
import { solutionSetCompletenessIssues } from './solutionAudit';
import { answers, gradeQuestionDetailed, gradeTest } from './scoring';
import type { AnswerMap, TestQuestion } from './schema';

const TEST_ID = 'lesson-02-test';
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

describe('Lesson 2 — rebuilt test contract', () => {
  it('loads the complete unique Lesson 2 bank and keeps all question IDs local to the lesson', () => {
    expect(entry).toBeDefined();
    expect(entry!.questions).toHaveLength(20);
    expect(new Set(entry!.questions.map((question) => question.id)).size).toBe(20);
    expect(entry!.definition.questionIds).toEqual(entry!.questions.map((question) => question.id));
    expect(
      entry!.questions.every((question) => question.lessonId === 'lesson-02-image-of-a-point'),
    ).toBe(true);
    expect(entry!.questions.every((question) => question.sourceRefs.length > 0)).toBe(true);
    expect(
      entry!.questions
        .flatMap((question) => question.sourceRefs)
        .every((ref) => [8, 9, 10].includes(Number(ref.page))),
    ).toBe(true);
    expect(entry!.definition.solutionPolicy).toBe('detailed');
  });

  it('keeps the declared blueprint aligned with the actual Lesson 2 bank and no other lesson definition changes', () => {
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
      testDefinitions.find((definition) => definition.id === 'lesson-01-test')?.solutionPolicy,
    ).toBe('detailed');
    // Later lesson rebuilds opt in to the same detailed policy; this test only
    // guarantees that Lesson 2 itself stays opted in (no exclusivity claim).
    expect(
      testDefinitions
        .filter((definition) => definition.solutionPolicy === 'detailed')
        .map((definition) => definition.id),
    ).toContain(TEST_ID);
  });

  it('passes the strict detailed-solution audit with zero issues and cites printed pages', async () => {
    const solutions = await loadSolutionSet(TEST_ID);
    expect(solutions).toBeDefined();
    expect(solutionSetCompletenessIssues(entry!.definition, entry!.questions, solutions)).toEqual(
      [],
    );
    for (const question of entry!.questions) {
      const solution = solutions!.solutions[question.id]!;
      expect(
        solution.sourceRefs?.length,
        `${question.id} needs solution citations`,
      ).toBeGreaterThan(0);
      expect(
        solution.sourceRefs!.every(
          (reference) => [8, 9, 10].includes(Number(reference.page)) && Boolean(reference.locator),
        ),
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
        ).toBe(
          compositePartPoints(
            entry!.questions.find((candidate) => candidate.id === question.id)!,
          ).get(part.id),
        );
      }
    }
  });

  it('matches every solution rubric total to engine maximum points, including structured parts', async () => {
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
    expect(maximum).toBe(30);
  });

  it('explains q06 with the correct side and diagonal pairs and preserves its one-point answer', async () => {
    const question = entry!.questions.find((candidate) => candidate.id === 'geo-l02-t01-q06')!;
    if (question.type !== 'single-choice') throw new Error('Expected q06 to be single-choice');
    const grade = gradeQuestionDetailed(question, answers.single(question.answerId));
    expect(grade).toMatchObject({ outcome: 'correct', earnedPoints: 1, maxPoints: 1 });

    const solutions = await loadSolutionSet(TEST_ID);
    const solution = solutions!.solutions[question.id]!;
    expect(solution.scoringCriteria.reduce((sum, criterion) => sum + criterion.points, 0)).toBe(
      grade.maxPoints,
    );
    const explanation = solution.steps
      .map((step) => (step.type === 'paragraph' ? step.text : ''))
      .join(' ');
    expect(explanation).toContain('$[PQ]$ و$[NM]$');
    expect(explanation).toContain('$[QN]$ و$[MP]$');
    expect(explanation).toContain('$[QM]$ و$[NP]$ فهما قطرا الشكل');
    expect(explanation).not.toContain('$[QM]$ مقابلة لـ$[NP]$');
  });

  it('grades a fully correct sheet as 30/30 and applies the configured 60% pass mark', () => {
    const answerMap: AnswerMap = Object.fromEntries(
      entry!.questions.map((question) => [question.id, correctAnswer(question)]),
    );
    const result = gradeTest(TEST_ID, entry!.definition.passingScore, entry!.questions, answerMap);
    expect(result).toMatchObject({
      earnedPoints: 30,
      maxPoints: 30,
      score: 100,
      passed: true,
      unanswered: 0,
    });
    expect(result.outcomes).toHaveLength(20);
  });

  it('awards the expected partial and incorrect scores without changing shared scoring', () => {
    const q02 = entry!.questions.find((question) => question.id === 'geo-l02-t01-q02')!;
    expect(gradeQuestionDetailed(q02, answers.trueFalseJustify(true))).toMatchObject({
      outcome: 'partially-correct',
      earnedPoints: 1,
      maxPoints: 2,
    });

    const q10 = entry!.questions.find((question) => question.id === 'geo-l02-t01-q10')!;
    expect(gradeQuestionDetailed(q10, answers.matching({ l1: 'r1' }))).toMatchObject({
      outcome: 'partially-correct',
      earnedPoints: 1,
      maxPoints: 2,
    });

    const q16 = entry!.questions.find((question) => question.id === 'geo-l02-t01-q16')!;
    expect(
      gradeQuestionDetailed(q16, answers.errorAnalysis('s2', 'centre-m', 'radius-original')),
    ).toMatchObject({
      outcome: 'partially-correct',
      earnedPoints: 2,
      maxPoints: 3,
    });
    expect(
      gradeQuestionDetailed(q16, answers.errorAnalysis('s1', 'centre-b', 'radius-original')),
    ).toMatchObject({
      outcome: 'incorrect',
      earnedPoints: 0,
      maxPoints: 3,
    });
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

  it('validates and renders all Lesson 2 figure specifications as actual authored SVGs', () => {
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
      const points = new Map(parsed.points.map((point) => [point.id, point]));
      expect(parsed.circles).toHaveLength(2);
      for (const candidateId of ['X', 'Y']) {
        const candidate = points.get(candidateId);
        expect(candidate, `${candidateId} must be a labelled circle intersection`).toBeDefined();
        expect(candidate!.mark).toBe('open');
        for (const circle of parsed.circles ?? []) {
          const center = points.get(circle.center)!;
          expect(Math.hypot(candidate!.x - center.x, candidate!.y - center.y)).toBeCloseTo(
            circle.radius,
            8,
          );
        }
      }
    }
    const figureQuestion = entry!.questions.find((question) => question.id === 'geo-l02-t01-q08')!;
    const { container } = render(
      <QuestionRenderer question={figureQuestion} value={undefined} onChange={() => undefined} />,
    );
    const svg = container.querySelector('svg[role="img"]');
    expect(svg).not.toBeNull();
    expect(svg!.getAttribute('aria-label')).toContain('دائرتان');
    expect(svg!.querySelectorAll('circle').length).toBeGreaterThanOrEqual(2);
  });

  it('preserves matching, correction/justification, and classification answer data shapes', () => {
    const map: AnswerMap = Object.fromEntries(
      entry!.questions.map((question) => [question.id, correctAnswer(question)]),
    );
    expect(map['geo-l02-t01-q10']).toEqual({ kind: 'matching', pairs: { l1: 'r1', l2: 'r2' } });
    expect(map['geo-l02-t01-q02']).toEqual({
      kind: 'true-false-justify',
      value: true,
      justificationId: 'same-line',
    });
    expect(map['geo-l02-t01-q16']).toEqual({
      kind: 'error-analysis',
      stepId: 's2',
      correctionId: 'centre-m',
      justificationId: 'radius-image',
    });
    expect(map['geo-l02-t01-q11']).toMatchObject({
      kind: 'classification',
      assignments: { p1: 'cat-5', p3: 'cat-diff' },
    });
  });
});
