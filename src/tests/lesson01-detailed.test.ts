import { describe, expect, it } from 'vitest';
import { getTestEntry, loadSolutionSet, testDefinitions } from './registry';
import { solutionSetCompletenessIssues } from './solutionAudit';
import { answers, gradeQuestionDetailed } from './scoring';
import type { AnswerMap, TestQuestion } from './schema';

/**
 * ============================================================================
 *  LESSON 1 — DETAILED CONTRACT GUARDS
 * ============================================================================
 *
 *  Lesson 1 is the first test published under `solutionPolicy: 'detailed'`.
 *  These guards keep the three artefacts of every question aligned forever:
 *    the authored answer (scoring engine), the worked solution (Solutions
 *  Area) and the displayed scoring criteria (teacher/learner transparency).
 * ============================================================================
 */

const TEST_ID = 'lesson-01-test';

/** Expected question-part points for every composite question, by question id. */
function questionPartPoints(question: TestQuestion): Map<string, number> {
  const parts = new Map<string, number>();
  switch (question.type) {
    case 'true-false-justify':
    case 'error-analysis':
      if (question.correction) parts.set(question.correction.id, question.correction.points);
      if (question.justification)
        parts.set(question.justification.id, question.justification.points);
      break;
    case 'justification':
      for (const step of question.steps) parts.set(step.id, step.points);
      break;
    case 'multi-part':
    case 'diagram-reading':
    case 'transformation-application':
      for (const part of question.parts) parts.set(part.id, part.points);
      break;
    default:
      break;
  }
  return parts;
}

describe('Lesson 1 test — detailed solution contract', () => {
  const entry = getTestEntry(TEST_ID);

  it('declares the detailed solution policy and keeps 20 questions on pages 5–7', () => {
    expect(entry, `${TEST_ID} must be published`).toBeDefined();
    const definition = entry!.definition;
    expect(definition.solutionPolicy).toBe('detailed');
    expect(entry!.questions).toHaveLength(20);
    for (const question of entry!.questions) {
      expect(question.lessonId).toBe('lesson-01-translation-and-properties');
      for (const ref of question.sourceRefs) {
        expect([5, 6, 7], `${question.id} must cite real Lesson 1 pages`).toContain(ref.page);
      }
    }
  });

  it('passes the strict detailed audit with zero issues', async () => {
    const solutionSet = await loadSolutionSet(TEST_ID);
    expect(solutionSet).toBeDefined();
    expect(solutionSetCompletenessIssues(entry!.definition, entry!.questions, solutionSet)).toEqual(
      [],
    );
  });

  it('keeps the detailed policy unique to Lesson 1 until other lessons opt in', () => {
    const detailed = testDefinitions.filter(
      (definition) => definition.solutionPolicy === 'detailed',
    );
    expect(detailed.map((definition) => definition.id)).toEqual([TEST_ID]);
  });

  it('aligns scoring criteria with the engine maximum for every question and part', async () => {
    const solutionSet = await loadSolutionSet(TEST_ID);
    let totalMaxPoints = 0;

    for (const question of entry!.questions) {
      const solution = solutionSet!.solutions[question.id];
      expect(solution, `solution for ${question.id}`).toBeDefined();

      const engineMax = gradeQuestionDetailed(question, undefined).maxPoints;
      totalMaxPoints += engineMax;

      const criteriaSum = solution!.scoringCriteria.reduce((sum, item) => sum + item.points, 0);
      expect(criteriaSum, `${question.id}: criteria must sum to the engine maximum`).toBe(
        engineMax,
      );

      const expectedParts = questionPartPoints(question);
      const solutionPartIds = solution!.parts.map((part) => part.id);
      expect(solutionPartIds.sort(), `${question.id}: parts coverage`).toEqual(
        [...expectedParts.keys()].sort(),
      );
      for (const part of solution!.parts) {
        const partSum = part.scoringCriteria.reduce((sum, item) => sum + item.points, 0);
        expect(partSum, `${question.id}/${part.id}: part criteria must sum to its points`).toBe(
          expectedParts.get(part.id),
        );
      }
    }

    // 20 questions; composite parts raise the bank from 20 to exactly 40 points.
    expect(totalMaxPoints).toBe(40);
  });

  it('grades the fully correct answer sheet as 40/40', () => {
    // Build the fully correct answer map directly from the authored questions.
    const correct: AnswerMap = {};
    for (const question of entry!.questions) {
      switch (question.type) {
        case 'single-choice':
          correct[question.id] = answers.single(question.answerId);
          break;
        case 'multi-select':
          correct[question.id] = answers.multi(question.answerIds);
          break;
        case 'true-false':
          correct[question.id] = answers.boolean(question.answer);
          break;
        case 'true-false-justify':
          correct[question.id] = answers.trueFalseJustify(
            question.answer,
            question.answer === false ? question.correction?.answerId : undefined,
            question.justification?.answerId,
          );
          break;
        case 'numeric':
          correct[question.id] = answers.numeric(String(question.answer));
          break;
        case 'exact':
          correct[question.id] = answers.exact(
            `${question.answer.numerator}/${question.answer.denominator}`,
          );
          break;
        case 'fill-in':
          correct[question.id] = answers.fillIn(
            Object.fromEntries(
              question.blanks.map((blank) => [blank.id, blank.acceptedAnswers[0] ?? '']),
            ),
          );
          break;
        case 'ordering':
          correct[question.id] = answers.order(question.answerOrder);
          break;
        case 'matching':
          correct[question.id] = answers.matching(question.pairs);
          break;
        case 'classification':
          correct[question.id] = answers.classification(question.assignment);
          break;
        case 'justification':
          correct[question.id] = answers.justification(
            Object.fromEntries(question.steps.map((step) => [step.id, step.answerId])),
          );
          break;
        case 'error-analysis':
          correct[question.id] = answers.errorAnalysis(
            question.answerId,
            question.correction?.answerId,
            question.justification?.answerId,
          );
          break;
        case 'multi-part':
        case 'diagram-reading':
        case 'transformation-application':
          correct[question.id] = answers.multiPart(
            Object.fromEntries(
              question.parts.map((part) => {
                switch (part.type) {
                  case 'single-choice':
                    return [part.id, answers.single(part.answerId)];
                  case 'multi-select':
                    return [part.id, answers.multi(part.answerIds)];
                  case 'true-false':
                    return [part.id, answers.boolean(part.answer)];
                  case 'numeric':
                    return [part.id, answers.numeric(String(part.answer))];
                  case 'exact':
                    return [
                      part.id,
                      answers.exact(`${part.answer.numerator}/${part.answer.denominator}`),
                    ];
                  case 'ordering':
                    return [part.id, answers.order(part.answerOrder)];
                  case 'matching':
                    return [part.id, answers.matching(part.pairs)];
                  case 'fill-in':
                    return [
                      part.id,
                      answers.fillIn(
                        Object.fromEntries(
                          part.blanks.map((blank) => [blank.id, blank.acceptedAnswers[0] ?? '']),
                        ),
                      ),
                    ];
                  case 'short-answer':
                    return [part.id, answers.shortAnswer(part.acceptedAnswers[0] ?? '')];
                }
              }),
            ),
          );
          break;
      }
    }

    let earned = 0;
    let max = 0;
    for (const question of entry!.questions) {
      const grade = gradeQuestionDetailed(question, correct[question.id]);
      expect(grade.outcome, `${question.id} must be correct on its authored answer`).toBe(
        'correct',
      );
      earned += grade.earnedPoints;
      max += grade.maxPoints;
    }
    expect(earned).toBe(40);
    expect(max).toBe(40);
  });

  it('anchors q20 on the reflection counterexample, not the flawed 360° rotation', async () => {
    const question = entry!.questions.find((item) => item.id === 'geo-l01-t01-q20');
    expect(question?.type).toBe('true-false-justify');
    if (question?.type !== 'true-false-justify') return;

    expect(question.answer).toBe(false);
    const justification = question.justification;
    expect(justification).toBeDefined();
    const correctChoice = justification!.choices.find(
      (choice) => choice.id === justification!.answerId,
    );
    // The mathematically valid counterexample is the reflection across an axis
    // parallel to (AB); a 360° rotation is the identity — itself a translation.
    expect(correctChoice?.text).toContain('الانعكاس');
    const rotationDistractor = justification!.choices.find((choice) => choice.text.includes('360'));
    expect(rotationDistractor, 'the rotation trap must remain a distractor').toBeDefined();
    expect(rotationDistractor!.id).not.toBe(justification!.answerId);
  });
});
