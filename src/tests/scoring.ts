import type { AnswerMap, AnswerValue, Fraction, Outcome, TestQuestion } from './schema';

/**
 * ============================================================================
 *  TEST AREA — SCORING ENGINE
 * ============================================================================
 *
 *  Deterministic, typed and completely independent of React, of storage and of
 *  the Solutions Area. Every rule below is covered by `scoring.test.ts`.
 *
 *  Grading rules (all-or-nothing — no invented partial credit):
 *    single-choice   exact option id
 *    multi-select    exact SET of option ids (order irrelevant, extras wrong)
 *    true-false      exactly true or exactly false
 *    numeric         |given − answer| ≤ tolerance
 *    exact           mathematical equality of rationals (1/2 = 2/4 = 0.5),
 *                    unless the question demands a specific form
 *    ordering        the FULL sequence must be correct
 *    matching        EVERY pair must match
 *    classification  EVERY item must be classified correctly
 *    error-analysis  exact option id (which step is wrong)
 * ============================================================================
 */

/* ------------------------------------------------------------------------ */
/*  Input normalisation                                                      */
/* ------------------------------------------------------------------------ */

/** Arabic-Indic and extended Arabic-Indic digits → Latin digits. */
const ARABIC_INDIC_ZERO = 0x0660;
const EXTENDED_ARABIC_INDIC_ZERO = 0x06f0;

/**
 * Normalise what a learner actually types on an Arabic keyboard:
 *   - Arabic-Indic digits ٤٫٥        → 4.5
 *   - Arabic decimal separator ٫     → .
 *   - Arabic thousands separator ٬   → removed
 *   - comma decimal separator 1,5     → 1.5
 *   - non-breaking / narrow spaces     → removed
 */
export function normalizeNumericInput(raw: string): string {
  let output = '';
  for (const character of raw.trim()) {
    const code = character.codePointAt(0) ?? 0;
    if (code >= ARABIC_INDIC_ZERO && code <= ARABIC_INDIC_ZERO + 9) {
      output += String(code - ARABIC_INDIC_ZERO);
      continue;
    }
    if (code >= EXTENDED_ARABIC_INDIC_ZERO && code <= EXTENDED_ARABIC_INDIC_ZERO + 9) {
      output += String(code - EXTENDED_ARABIC_INDIC_ZERO);
      continue;
    }
    if (character === '\u066b' || character === '\u066c' || character === ',') {
      output += character === '\u066c' ? '' : '.';
      continue;
    }
    if (character === '\u00a0' || character === '\u202f' || character === '\u200f') continue;
    output += character;
  }
  return output;
}

/**
 * Parse a numeric answer. Accepts an optional sign and one decimal separator.
 * Returns `undefined` for anything that is not a plain decimal number — a
 * malformed answer is graded as incorrect, never as 0.
 */
export function parseNumericInput(raw: string): number | undefined {
  const normalized = normalizeNumericInput(raw).trim();
  if (!/^[+-]?(\d+(\.\d*)?|\.\d+)$/.test(normalized)) return undefined;
  const value = Number(normalized);
  return Number.isFinite(value) ? value : undefined;
}

/* ------------------------------------------------------------------------ */
/*  Exact rationals                                                          */
/* ------------------------------------------------------------------------ */

export interface Rational {
  numerator: number;
  denominator: number;
}

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const remainder = x % y;
    x = y;
    y = remainder;
  }
  return x === 0 ? 1 : x;
}

/** Reduce to lowest terms, keeping the sign on the numerator. */
export function reduceRational(value: Rational): Rational {
  if (value.denominator === 0) return { numerator: 0, denominator: 1 };
  const sign = value.denominator < 0 ? -1 : 1;
  const divisor = gcd(value.numerator, value.denominator);
  return {
    numerator: (value.numerator / divisor) * sign,
    denominator: Math.abs(value.denominator / divisor),
  };
}

/**
 * Parse `p/q`, a decimal (`0.5`, `.5`, `1,5`) or an integer into a rational.
 * `reduce: true` (default) reduces to lowest terms so `1/2` and `2/4` compare
 * equal. `reduce: false` preserves the literal numerator and denominator for
 * questions where the written form itself is assessed.
 */
export function parseRational(raw: string, reduce = true): Rational | undefined {
  const normalized = normalizeNumericInput(raw).trim().replace(/\s+/g, '');
  if (!normalized) return undefined;

  const fraction = /^([+-]?\d+)\/([+-]?\d+)$/.exec(normalized);
  if (fraction) {
    const numerator = Number(fraction[1]);
    const denominator = Number(fraction[2]);
    if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) {
      return undefined;
    }
    const rational = { numerator, denominator };
    return reduce ? reduceRational(rational) : rational;
  }

  const decimal = /^([+-]?)(\d*)(?:\.(\d*))?$/.exec(normalized);
  if (!decimal || (decimal[2] === '' && (decimal[3] ?? '') === '')) return undefined;
  const sign = decimal[1] === '-' ? -1 : 1;
  const whole = decimal[2] ?? '';
  const fractionDigits = decimal[3] ?? '';
  const denominator = 10 ** fractionDigits.length;
  const numerator = Number(`${whole || '0'}${fractionDigits}` || '0');
  if (!Number.isFinite(numerator)) return undefined;
  const rational = { numerator: sign * numerator, denominator };
  return reduce ? reduceRational(rational) : rational;
}

export function rationalsEqual(a: Rational, b: Rational): boolean {
  return a.numerator * b.denominator === b.numerator * a.denominator;
}

/* ------------------------------------------------------------------------ */
/*  Small helpers                                                            */
/* ------------------------------------------------------------------------ */

function nonEmptyText(value: string | undefined): boolean {
  return typeof value === 'string' && value.trim() !== '';
}

function sameSet(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const left = [...a].sort();
  const right = [...b].sort();
  return left.every((value, index) => value === right[index]);
}

function sameOrder(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function sameMapping(a: Record<string, string>, b: Record<string, string>): boolean {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  return bKeys.every((key) => a[key] === b[key]);
}

/* ------------------------------------------------------------------------ */
/*  Answer shape creation (used by the runner UI)                            */
/* ------------------------------------------------------------------------ */

export const answers = {
  single: (optionId: string): AnswerValue => ({ kind: 'single', optionId }),
  multi: (optionIds: string[]): AnswerValue => ({ kind: 'multi', optionIds }),
  boolean: (value: boolean): AnswerValue => ({ kind: 'boolean', value }),
  numeric: (raw: string): AnswerValue => ({ kind: 'numeric', raw }),
  exact: (raw: string): AnswerValue => ({ kind: 'exact', raw }),
  order: (itemIds: string[]): AnswerValue => ({ kind: 'order', itemIds }),
  matching: (pairs: Record<string, string>): AnswerValue => ({ kind: 'matching', pairs }),
  classification: (assignments: Record<string, string>): AnswerValue => ({
    kind: 'classification',
    assignments,
  }),
} as const;

/* ------------------------------------------------------------------------ */
/*  Grading                                                                  */
/* ------------------------------------------------------------------------ */

/** Has the learner supplied anything at all for this question? */
export function isAnswered(_question: TestQuestion, given: AnswerValue | undefined): boolean {
  if (!given) return false;
  switch (given.kind) {
    case 'single':
      return nonEmptyText(given.optionId);
    case 'multi':
      return given.optionIds.length > 0;
    case 'boolean':
      return true;
    case 'numeric':
    case 'exact':
      return nonEmptyText(given.raw);
    case 'order':
      return given.itemIds.length > 0;
    case 'matching':
      return Object.keys(given.pairs).length > 0;
    case 'classification':
      return Object.keys(given.assignments).length > 0;
  }
}

function isCorrectAnswer(question: TestQuestion, given: AnswerValue): boolean {
  switch (question.type) {
    case 'single-choice':
    case 'error-analysis':
      return given.kind === 'single' && given.optionId === question.answerId;

    case 'multi-select':
      return given.kind === 'multi' && sameSet(given.optionIds, question.answerIds);

    case 'true-false':
      return given.kind === 'boolean' && given.value === question.answer;

    case 'numeric': {
      if (given.kind !== 'numeric') return false;
      const value = parseNumericInput(given.raw);
      if (value === undefined) return false;
      return Math.abs(value - question.answer) <= question.tolerance;
    }

    case 'exact': {
      if (given.kind !== 'exact') return false;
      if (question.acceptEquivalentForms) {
        const value = parseRational(given.raw, true);
        if (!value) return false;
        return rationalsEqual(value, question.answer);
      }
      // The written fraction form itself is assessed: must be a fraction
      // matching the stored numerator and denominator literally.
      const rawTrimmed = normalizeNumericInput(given.raw).trim().replace(/\s+/g, '');
      const fraction = /^([+-]?\d+)\/([+-]?\d+)$/.exec(rawTrimmed);
      if (!fraction) return false;
      const numerator = Number(fraction[1]);
      const denominator = Number(fraction[2]);
      return numerator === question.answer.numerator && denominator === question.answer.denominator;
    }

    case 'ordering':
      return given.kind === 'order' && sameOrder(given.itemIds, question.answerOrder);

    case 'matching':
      return given.kind === 'matching' && sameMapping(given.pairs, question.pairs);

    case 'classification':
      return given.kind === 'classification' && sameMapping(given.assignments, question.assignment);
  }
}

export function gradeQuestion(question: TestQuestion, given: AnswerValue | undefined): Outcome {
  if (!isAnswered(question, given)) return 'unanswered';
  if (!given) return 'unanswered';
  return isCorrectAnswer(question, given) ? 'correct' : 'incorrect';
}

export interface QuestionOutcome {
  questionId: string;
  lessonId: string;
  concept: string;
  outcome: Outcome;
}

export interface TestResult {
  testId: string;
  total: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  /** Percentage 0–100, rounded. Every question is worth one point. */
  score: number;
  passed: boolean;
  /** Per-question outcome, in test order. */
  outcomes: QuestionOutcome[];
}

/**
 * Grade a whole test. Pure: the same questions and answers always produce the
 * same result, and re-arranging `questions` cannot change any per-question
 * outcome (answers are keyed by question id).
 */
export function gradeTest(
  testId: string,
  passingScore: number,
  questions: TestQuestion[],
  given: AnswerMap,
): TestResult {
  const outcomes: QuestionOutcome[] = questions.map((question) => ({
    questionId: question.id,
    lessonId: question.lessonId,
    concept: question.concept,
    outcome: gradeQuestion(question, given[question.id]),
  }));

  const correct = outcomes.filter((entry) => entry.outcome === 'correct').length;
  const incorrect = outcomes.filter((entry) => entry.outcome === 'incorrect').length;
  const unanswered = outcomes.filter((entry) => entry.outcome === 'unanswered').length;
  const total = questions.length;
  const score = total === 0 ? 0 : Math.round((correct / total) * 100);

  return {
    testId,
    total,
    correct,
    incorrect,
    unanswered,
    score,
    passed: score >= passingScore,
    outcomes,
  };
}

/** Convenience for the Solutions Area: render a fraction back as `p/q`. */
export function formatFraction(value: Fraction): string {
  return `${value.numerator}/${value.denominator}`;
}
