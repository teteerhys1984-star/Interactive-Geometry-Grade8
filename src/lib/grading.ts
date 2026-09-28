import type { Assessment, Question } from '@/content/schema';

/** A learner's raw response, keyed by question id. */
export type AnswerMap = Record<string, string>;

/** Has the learner supplied anything for this question? */
export function isAnswered(question: Question, answers: AnswerMap): boolean {
  const value = answers[question.id];
  return value !== undefined && value.trim() !== '';
}

/**
 * Grade a single question entirely in the browser.
 * There is no server, so this is the only grading path.
 */
export function isCorrect(question: Question, answers: AnswerMap): boolean {
  const given = answers[question.id]?.trim();
  if (given === undefined || given === '') return false;

  switch (question.type) {
    case 'multiple-choice':
      return given === question.correctChoiceId;
    case 'true-false':
      return given === String(question.answer);
    case 'numeric': {
      const value = Number(given);
      if (Number.isNaN(value)) return false;
      return Math.abs(value - question.answer) <= question.tolerance;
    }
    default:
      return false;
  }
}

export interface AssessmentResult {
  correctCount: number;
  total: number;
  /** Percentage 0–100, rounded. */
  score: number;
  passed: boolean;
  /** Per-question outcome, in question order. */
  outcomes: { question: Question; correct: boolean; answered: boolean }[];
}

export function gradeAssessment(assessment: Assessment, answers: AnswerMap): AssessmentResult {
  const outcomes = assessment.questions.map((question) => ({
    question,
    correct: isCorrect(question, answers),
    answered: isAnswered(question, answers),
  }));
  const correctCount = outcomes.filter((outcome) => outcome.correct).length;
  const total = assessment.questions.length;
  const score = total === 0 ? 0 : Math.round((correctCount / total) * 100);
  return {
    correctCount,
    total,
    score,
    passed: score >= assessment.passingScore,
    outcomes,
  };
}
