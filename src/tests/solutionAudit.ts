import type {
  SolutionPart,
  SolutionSet,
  TestDefinition,
  TestQuestion,
  TestSolution,
} from './schema';

/** A stable, human-readable completeness problem for a future authoring PR. */
export interface SolutionAuditIssue {
  testId?: string;
  questionId: string;
  message: string;
}

function hasText(value: string | undefined): boolean {
  return typeof value === 'string' && value.trim() !== '';
}

function hasFigure(question: TestQuestion): boolean {
  return question.prompt.some((block) => block.type === 'figure');
}

function partIssues(questionId: string, part: SolutionPart | undefined, label: string): string[] {
  if (!part) return [`${label}: missing solution part`];
  const issues: string[] = [];
  if (!hasText(part.answerSummary)) issues.push(`${label}: missing answer summary`);
  if (part.given.length === 0) issues.push(`${label}: missing givens`);
  if (part.steps.length === 0) issues.push(`${label}: missing steps`);
  if (!hasText(part.rule)) issues.push(`${label}: missing rule/property/definition`);
  if (part.scoringCriteria.length === 0) issues.push(`${label}: missing scoring criteria`);
  if (part.provenance.sourceVerified.length === 0) {
    issues.push(`${label}: missing source-verified statement`);
  }
  if (part.provenance.platformAuthored.length === 0) {
    issues.push(`${label}: missing platform-authored explanation`);
  }
  return issues.map((message) => `${questionId}: ${message}`);
}

function expectedPartIds(question: TestQuestion): { id: string; label: string }[] {
  switch (question.type) {
    case 'true-false-justify':
      return [
        ...(question.answer === false && question.correction
          ? [{ id: question.correction.id, label: 'correction' }]
          : []),
        ...(question.justification
          ? [{ id: question.justification.id, label: 'justification' }]
          : []),
      ];
    case 'justification':
      return question.steps.map((step) => ({
        id: step.id,
        label: `justification step ${step.id}`,
      }));
    case 'multi-part':
    case 'diagram-reading':
    case 'transformation-application':
      return question.parts.map((part) => ({ id: part.id, label: `multi-part ${part.id}` }));
    case 'error-analysis':
      return [
        ...(question.correction ? [{ id: question.correction.id, label: 'correction' }] : []),
        ...(question.justification ? [{ id: question.justification.id, label: 'reason' }] : []),
      ];
    default:
      return [];
  }
}

/**
 * Validate the detailed solution contract used by future lesson and Unit PRs.
 * Legacy authored solution sets intentionally remain on the old policy and are
 * not rewritten by this foundation PR.
 */
export function solutionCompletenessIssues(
  question: TestQuestion,
  solution: TestSolution | undefined,
  strict = true,
): string[] {
  if (!solution) return [`${question.id}: missing solution`];
  if (!strict) return [];

  const issues: string[] = [];
  if (!hasText(solution.answerSummary)) issues.push(`${question.id}: missing answer summary`);
  if (solution.given.length === 0) issues.push(`${question.id}: missing givens`);
  if (solution.steps.length === 0) issues.push(`${question.id}: missing steps`);
  if (!hasText(solution.rule)) issues.push(`${question.id}: missing rule/property/definition`);
  if (solution.scoringCriteria.length === 0)
    issues.push(`${question.id}: missing scoring criteria`);
  if (solution.provenance.sourceVerified.length === 0) {
    issues.push(`${question.id}: missing source-verified statement`);
  }
  if (solution.provenance.platformAuthored.length === 0) {
    issues.push(`${question.id}: missing platform-authored explanation`);
  }
  if (hasFigure(question) && solution.diagramNotes.length === 0) {
    issues.push(`${question.id}: diagram question needs labelled diagram notes`);
  }
  if (question.type === 'diagram-reading' && !hasFigure(question)) {
    issues.push(`${question.id}: diagram-reading question needs a figure prompt`);
  }
  if (question.type === 'error-analysis') {
    if (!question.correction) issues.push(`${question.id}: error-analysis needs a correction part`);
    if (!question.justification) issues.push(`${question.id}: error-analysis needs a reason part`);
    if (!hasText(solution.commonError))
      issues.push(`${question.id}: error-analysis needs a common-error explanation`);
  }

  const expected = expectedPartIds(question);
  if (expected.length > 0) {
    const actualIds = solution.parts.map((part) => part.id);
    const expectedIds = expected.map((part) => part.id);
    if (
      actualIds.length !== expectedIds.length ||
      actualIds.some((id) => !expectedIds.includes(id)) ||
      new Set(actualIds).size !== actualIds.length
    ) {
      issues.push(`${question.id}: solution parts must match exactly [${expectedIds.join(', ')}]`);
    }
    for (const part of expected) {
      issues.push(
        ...partIssues(
          question.id,
          solution.parts.find((item) => item.id === part.id),
          part.label,
        ),
      );
    }
  }

  return issues;
}

/**
 * Validate one solution set against the resolved question list, not merely
 * against the existence of a solution file. This is the registry/audit entry
 * point future PRs should call.
 */
export function solutionSetCompletenessIssues(
  definition: TestDefinition,
  questions: TestQuestion[],
  solutionSet: SolutionSet | undefined,
): SolutionAuditIssue[] {
  const issues: SolutionAuditIssue[] = [];
  if (!solutionSet) {
    return definition.questionIds.map((questionId) => ({
      testId: definition.id,
      questionId,
      message: `${questionId}: missing solution set`,
    }));
  }
  if (solutionSet.testId !== definition.id) {
    issues.push({
      testId: definition.id,
      questionId: definition.id,
      message: `solution set testId «${solutionSet.testId}» does not match definition`,
    });
  }

  const questionById = new Map(questions.map((question) => [question.id, question]));
  const expectedIds = new Set(definition.questionIds);
  for (const questionId of definition.questionIds) {
    const question = questionById.get(questionId);
    const solution = solutionSet.solutions[questionId];
    if (!question) {
      issues.push({ testId: definition.id, questionId, message: 'question is not resolved' });
      continue;
    }
    for (const message of solutionCompletenessIssues(
      question,
      solution,
      definition.solutionPolicy === 'detailed',
    )) {
      issues.push({ testId: definition.id, questionId, message });
    }
  }
  for (const solutionId of Object.keys(solutionSet.solutions)) {
    if (!expectedIds.has(solutionId)) {
      issues.push({
        testId: definition.id,
        questionId: solutionId,
        message: 'solution has no corresponding question in the definition',
      });
    }
  }
  return issues;
}
