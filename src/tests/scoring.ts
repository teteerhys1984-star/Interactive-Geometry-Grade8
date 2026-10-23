import type {
  AnswerMap,
  AnswerValue,
  ChoicePart,
  FillInBlank,
  Fraction,
  MultiPartItem,
  Outcome,
  PartAnswerValue,
  TestQuestion,
} from './schema';

/**
 * ============================================================================
 *  TEST AREA — SCORING ENGINE
 * ============================================================================
 *
 *  Deterministic, typed and independent of React, storage and the Solutions
 *  Area. Free-form mathematical prose is never auto-graded. Text questions use
 *  authored accepted terms; numeric/exact questions use the existing strict
 *  numeric/rational parsers; structured parts are scored independently.
 *
 *  Partial-credit rules:
 *    ordering       one point per correct position (valid submitted subset)
 *    matching       one point per correct left→right pair (valid submitted subset)
 *    fill-in        each blank's authored points
 *    justification  each controlled step's authored points
 *    multi-part     sum of independently scaled part points
 *    true/false +   verdict and each applicable sub-part are separate points
 *    error analysis step, correction and reason are separate points
 *
 *  Duplicate/unknown ids and malformed maps receive zero for the affected
 *  structured response, never accidental credit.
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

/**
 * Normalise controlled vocabulary, not arbitrary mathematics. `term` removes
 * Arabic diacritics/tatweel and common alef variants so authored aliases remain
 * usable across keyboards; `exact-text` only trims/collapses whitespace.
 */
export function normalizeTextInput(raw: string, mode: 'term' | 'exact-text' = 'term'): string {
  let value = raw.normalize('NFKC').replace(/\s+/g, ' ').trim().toLocaleLowerCase();
  if (mode === 'term') {
    value = value
      .replace(/[\u064B-\u065F\u0670]/g, '')
      .replace(/ـ/g, '')
      .replace(/[أإآٱ]/g, 'ا')
      .replace(/ى/g, 'ي');
  }
  return value;
}

export function matchesAcceptedText(
  raw: string,
  acceptedAnswers: string[],
  mode: 'term' | 'exact-text' = 'term',
): boolean {
  const value = normalizeTextInput(raw, mode);
  return (
    value !== '' && acceptedAnswers.some((answer) => normalizeTextInput(answer, mode) === value)
  );
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
 * equal. `reduce: false` preserves the literal numerator and denominator.
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

function hasOnlyKnownKeys(record: Record<string, unknown>, known: Set<string>): boolean {
  return Object.keys(record).every((key) => known.has(key));
}

function hasDuplicate(values: string[]): boolean {
  return new Set(values).size !== values.length;
}

/* ------------------------------------------------------------------------ */
/*  Answer shape creation (used by the runner UI)                            */
/* ------------------------------------------------------------------------ */

export const answers = {
  single: (optionId: string): Extract<AnswerValue, { kind: 'single' }> => ({
    kind: 'single',
    optionId,
  }),
  multi: (optionIds: string[]): Extract<AnswerValue, { kind: 'multi' }> => ({
    kind: 'multi',
    optionIds,
  }),
  boolean: (value: boolean): Extract<AnswerValue, { kind: 'boolean' }> => ({
    kind: 'boolean',
    value,
  }),
  trueFalseJustify: (
    value: boolean,
    correctionId?: string,
    justificationId?: string,
  ): Extract<AnswerValue, { kind: 'true-false-justify' }> => ({
    kind: 'true-false-justify',
    value,
    ...(correctionId ? { correctionId } : {}),
    ...(justificationId ? { justificationId } : {}),
  }),
  shortAnswer: (raw: string): Extract<AnswerValue, { kind: 'short-answer' }> => ({
    kind: 'short-answer',
    raw,
  }),
  fillIn: (values: Record<string, string>): Extract<AnswerValue, { kind: 'fill-in' }> => ({
    kind: 'fill-in',
    values,
  }),
  numeric: (raw: string): Extract<AnswerValue, { kind: 'numeric' }> => ({ kind: 'numeric', raw }),
  exact: (raw: string): Extract<AnswerValue, { kind: 'exact' }> => ({ kind: 'exact', raw }),
  order: (itemIds: string[]): Extract<AnswerValue, { kind: 'order' }> => ({
    kind: 'order',
    itemIds,
  }),
  matching: (pairs: Record<string, string>): Extract<AnswerValue, { kind: 'matching' }> => ({
    kind: 'matching',
    pairs,
  }),
  classification: (
    assignments: Record<string, string>,
  ): Extract<AnswerValue, { kind: 'classification' }> => ({
    kind: 'classification',
    assignments,
  }),
  justification: (
    selections: Record<string, string>,
  ): Extract<AnswerValue, { kind: 'justification' }> => ({
    kind: 'justification',
    selections,
  }),
  multiPart: (
    parts: Record<string, PartAnswerValue>,
  ): Extract<AnswerValue, { kind: 'multi-part' }> => ({
    kind: 'multi-part',
    parts,
  }),
  errorAnalysis: (
    stepId: string,
    correctionId?: string,
    justificationId?: string,
  ): Extract<AnswerValue, { kind: 'error-analysis' }> => ({
    kind: 'error-analysis',
    stepId,
    ...(correctionId ? { correctionId } : {}),
    ...(justificationId ? { justificationId } : {}),
  }),
} as const;

/* ------------------------------------------------------------------------ */
/*  Raw grading primitives                                                   */
/* ------------------------------------------------------------------------ */

interface RawGrade {
  earnedPoints: number;
  maxPoints: number;
  answered: boolean;
  malformed?: boolean;
}

export interface QuestionGrade {
  outcome: Outcome;
  earnedPoints: number;
  maxPoints: number;
  answered: boolean;
}

function makeRaw(
  earnedPoints: number,
  maxPoints: number,
  answered: boolean,
  malformed = false,
): RawGrade {
  return { earnedPoints, maxPoints, answered, ...(malformed ? { malformed: true } : {}) };
}

function makeGrade(raw: RawGrade): QuestionGrade {
  if (!raw.answered) {
    return { outcome: 'unanswered', earnedPoints: 0, maxPoints: raw.maxPoints, answered: false };
  }
  if (raw.malformed) {
    return { outcome: 'incorrect', earnedPoints: 0, maxPoints: raw.maxPoints, answered: true };
  }
  if (raw.earnedPoints >= raw.maxPoints) {
    return {
      outcome: 'correct',
      earnedPoints: raw.maxPoints,
      maxPoints: raw.maxPoints,
      answered: true,
    };
  }
  return {
    outcome: raw.earnedPoints > 0 ? 'partially-correct' : 'incorrect',
    earnedPoints: raw.earnedPoints,
    maxPoints: raw.maxPoints,
    answered: true,
  };
}

function scaleRaw(raw: RawGrade, maxPoints: number): RawGrade {
  if (!raw.answered || raw.malformed || raw.maxPoints <= 0) {
    return makeRaw(0, maxPoints, raw.answered, raw.malformed);
  }
  return makeRaw((raw.earnedPoints / raw.maxPoints) * maxPoints, maxPoints, true);
}

function answerHasContent(given: AnswerValue | undefined): boolean {
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
    case 'short-answer':
      return nonEmptyText(given.raw);
    case 'fill-in':
      return Object.values(given.values).some((value) => nonEmptyText(value));
    case 'order':
      return given.itemIds.length > 0;
    case 'matching':
      return Object.keys(given.pairs).length > 0;
    case 'classification':
      return Object.keys(given.assignments).length > 0;
    case 'true-false-justify':
      return true;
    case 'justification':
      return Object.values(given.selections).some((value) => nonEmptyText(value));
    case 'multi-part':
      return Object.values(given.parts).some((part) => answerHasContent(part));
    case 'error-analysis':
      return nonEmptyText(given.stepId);
  }
}

/** Has the learner supplied anything at all for this question? */
export function isAnswered(_question: TestQuestion, given: AnswerValue | undefined): boolean {
  return answerHasContent(given);
}

function gradeChoice(given: AnswerValue | undefined, answerId: string, maxPoints = 1): RawGrade {
  const answered = answerHasContent(given);
  if (!answered) return makeRaw(0, maxPoints, false);
  if (!given || given.kind !== 'single') return makeRaw(0, maxPoints, true, true);
  return makeRaw(given.optionId === answerId ? maxPoints : 0, maxPoints, true);
}

function gradeMultiSelect(
  given: AnswerValue | undefined,
  answerIds: string[],
  maxPoints = 1,
): RawGrade {
  const answered = answerHasContent(given);
  if (!answered) return makeRaw(0, maxPoints, false);
  if (!given || given.kind !== 'multi') return makeRaw(0, maxPoints, true, true);
  return makeRaw(sameSet(given.optionIds, answerIds) ? maxPoints : 0, maxPoints, true);
}

function gradeBoolean(given: AnswerValue | undefined, answer: boolean, maxPoints = 1): RawGrade {
  const answered = answerHasContent(given);
  if (!answered) return makeRaw(0, maxPoints, false);
  if (!given || given.kind !== 'boolean') return makeRaw(0, maxPoints, true, true);
  return makeRaw(given.value === answer ? maxPoints : 0, maxPoints, true);
}

function gradeNumeric(
  given: AnswerValue | undefined,
  answer: number,
  tolerance: number,
  maxPoints = 1,
): RawGrade {
  const answered = answerHasContent(given);
  if (!answered) return makeRaw(0, maxPoints, false);
  if (!given || given.kind !== 'numeric') return makeRaw(0, maxPoints, true, true);
  const value = parseNumericInput(given.raw);
  return makeRaw(
    value !== undefined && Math.abs(value - answer) <= tolerance ? maxPoints : 0,
    maxPoints,
    true,
  );
}

function gradeExact(
  given: AnswerValue | undefined,
  answer: Fraction,
  acceptEquivalentForms: boolean,
  maxPoints = 1,
): RawGrade {
  const answered = answerHasContent(given);
  if (!answered) return makeRaw(0, maxPoints, false);
  if (!given || given.kind !== 'exact') return makeRaw(0, maxPoints, true, true);
  if (acceptEquivalentForms) {
    const value = parseRational(given.raw, true);
    return makeRaw(value && rationalsEqual(value, answer) ? maxPoints : 0, maxPoints, true);
  }
  const rawTrimmed = normalizeNumericInput(given.raw).trim().replace(/\s+/g, '');
  const fraction = /^([+-]?\d+)\/([+-]?\d+)$/.exec(rawTrimmed);
  if (!fraction) return makeRaw(0, maxPoints, true);
  const numerator = Number(fraction[1]);
  const denominator = Number(fraction[2]);
  return makeRaw(
    numerator === answer.numerator && denominator === answer.denominator ? maxPoints : 0,
    maxPoints,
    true,
  );
}

function gradeOrder(
  given: AnswerValue | undefined,
  answerOrder: string[],
  maxPoints = answerOrder.length,
): RawGrade {
  const answered = answerHasContent(given);
  if (!answered) return makeRaw(0, maxPoints, false);
  if (!given || given.kind !== 'order') return makeRaw(0, maxPoints, true, true);
  const expectedIds = new Set(answerOrder);
  if (hasDuplicate(given.itemIds) || given.itemIds.some((id) => !expectedIds.has(id))) {
    return makeRaw(0, maxPoints, true, true);
  }
  const correctPositions = given.itemIds.reduce(
    (count, id, index) => count + (answerOrder[index] === id ? 1 : 0),
    0,
  );
  return makeRaw(correctPositions, answerOrder.length, true);
}

function gradeMatching(
  given: AnswerValue | undefined,
  pairs: Record<string, string>,
  rightIds: Set<string>,
  allowReuse: boolean,
  maxPoints = Object.keys(pairs).length,
): RawGrade {
  const answered = answerHasContent(given);
  if (!answered) return makeRaw(0, maxPoints, false);
  if (!given || given.kind !== 'matching') return makeRaw(0, maxPoints, true, true);
  const expectedLeftIds = new Set(Object.keys(pairs));
  if (
    !hasOnlyKnownKeys(given.pairs, expectedLeftIds) ||
    Object.values(given.pairs).some((id) => !rightIds.has(id)) ||
    (!allowReuse && hasDuplicate(Object.values(given.pairs)))
  ) {
    return makeRaw(0, maxPoints, true, true);
  }
  const correctPairs = Object.entries(given.pairs).reduce(
    (count, [leftId, rightId]) => count + (pairs[leftId] === rightId ? 1 : 0),
    0,
  );
  return makeRaw(correctPairs, maxPoints, true);
}

function gradeClassification(
  given: AnswerValue | undefined,
  assignment: Record<string, string>,
  categoryIds: Set<string>,
  maxPoints = 1,
): RawGrade {
  const answered = answerHasContent(given);
  if (!answered) return makeRaw(0, maxPoints, false);
  if (!given || given.kind !== 'classification') return makeRaw(0, maxPoints, true, true);
  if (
    !hasOnlyKnownKeys(given.assignments, new Set(Object.keys(assignment))) ||
    Object.values(given.assignments).some((id) => !categoryIds.has(id))
  ) {
    return makeRaw(0, maxPoints, true, true);
  }
  return makeRaw(sameMapping(given.assignments, assignment) ? maxPoints : 0, maxPoints, true);
}

function sameMapping(a: Record<string, string>, b: Record<string, string>): boolean {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  return bKeys.every((key) => a[key] === b[key]);
}

function gradeText(
  given: AnswerValue | undefined,
  acceptedAnswers: string[],
  normalization: 'term' | 'exact-text',
  maxPoints = 1,
): RawGrade {
  const answered = answerHasContent(given);
  if (!answered) return makeRaw(0, maxPoints, false);
  if (!given || given.kind !== 'short-answer') return makeRaw(0, maxPoints, true, true);
  return makeRaw(
    matchesAcceptedText(given.raw, acceptedAnswers, normalization) ? maxPoints : 0,
    maxPoints,
    true,
  );
}

function gradeFillIn(
  given: AnswerValue | undefined,
  blanks: FillInBlank[],
  maxPoints = blanks.reduce((sum, blank) => sum + blank.points, 0),
): RawGrade {
  const answered = answerHasContent(given);
  if (!answered) return makeRaw(0, maxPoints, false);
  if (!given || given.kind !== 'fill-in') return makeRaw(0, maxPoints, true, true);
  const blankIds = new Set(blanks.map((blank) => blank.id));
  if (!hasOnlyKnownKeys(given.values, blankIds)) return makeRaw(0, maxPoints, true, true);
  const earnedPoints = blanks.reduce((sum, blank) => {
    const value = given.values[blank.id] ?? '';
    return (
      sum +
      (matchesAcceptedText(value, blank.acceptedAnswers, blank.normalization) ? blank.points : 0)
    );
  }, 0);
  return makeRaw(earnedPoints, maxPoints, true);
}

function gradeChoicePart(givenId: string | undefined, part: ChoicePart): RawGrade {
  if (!nonEmptyText(givenId)) return makeRaw(0, part.points, false);
  const choiceIds = new Set(part.choices.map((choice) => choice.id));
  if (!choiceIds.has(givenId!)) return makeRaw(0, part.points, true, true);
  return makeRaw(givenId === part.answerId ? part.points : 0, part.points, true);
}

function gradeTrueFalseJustify(
  question: Extract<TestQuestion, { type: 'true-false-justify' }>,
  given: AnswerValue | undefined,
): RawGrade {
  const maxPoints =
    1 +
    (question.answer === false ? (question.correction?.points ?? 0) : 0) +
    (question.justification?.points ?? 0);
  if (!answerHasContent(given)) return makeRaw(0, maxPoints, false);
  if (!given || given.kind !== 'true-false-justify') return makeRaw(0, maxPoints, true, true);

  const verdict = given.value === question.answer ? 1 : 0;
  let earnedPoints = verdict;
  let malformed = false;
  if (question.answer === false && question.correction) {
    const correction = gradeChoicePart(given.correctionId, question.correction);
    earnedPoints += correction.earnedPoints;
    malformed ||= Boolean(correction.malformed);
  }
  if (question.justification) {
    const justification = gradeChoicePart(given.justificationId, question.justification);
    earnedPoints += justification.earnedPoints;
    malformed ||= Boolean(justification.malformed);
  }
  return makeRaw(earnedPoints, maxPoints, true, malformed);
}

function gradeJustification(
  question: Extract<TestQuestion, { type: 'justification' }>,
  given: AnswerValue | undefined,
): RawGrade {
  const maxPoints = question.steps.reduce((sum, step) => sum + step.points, 0);
  if (!answerHasContent(given)) return makeRaw(0, maxPoints, false);
  if (!given || given.kind !== 'justification') return makeRaw(0, maxPoints, true, true);
  const stepIds = new Set(question.steps.map((step) => step.id));
  if (!hasOnlyKnownKeys(given.selections, stepIds)) return makeRaw(0, maxPoints, true, true);
  let earnedPoints = 0;
  for (const step of question.steps) {
    const selected = given.selections[step.id];
    if (selected === undefined) continue;
    const choiceIds = new Set(step.choices.map((choice) => choice.id));
    if (!choiceIds.has(selected)) return makeRaw(0, maxPoints, true, true);
    if (selected === step.answerId) earnedPoints += step.points;
  }
  return makeRaw(earnedPoints, maxPoints, true);
}

function gradeErrorAnalysis(
  question: Extract<TestQuestion, { type: 'error-analysis' }>,
  given: AnswerValue | undefined,
): RawGrade {
  const maxPoints = 1 + (question.correction?.points ?? 0) + (question.justification?.points ?? 0);
  if (!answerHasContent(given)) return makeRaw(0, maxPoints, false);

  if (given?.kind === 'single') {
    return makeRaw(given.optionId === question.answerId ? 1 : 0, maxPoints, true);
  }
  if (!given || given.kind !== 'error-analysis') return makeRaw(0, maxPoints, true, true);

  const validStepIds = new Set(question.steps.map((step) => step.id));
  const validErrorChoices = new Set(question.choices.map((choice) => choice.id));
  if (!validStepIds.has(given.stepId) && !validErrorChoices.has(given.stepId)) {
    return makeRaw(0, maxPoints, true, true);
  }

  let earnedPoints = given.stepId === question.answerId ? 1 : 0;
  let malformed = false;
  if (question.correction) {
    const correction = gradeChoicePart(given.correctionId, question.correction);
    earnedPoints += correction.earnedPoints;
    malformed ||= Boolean(correction.malformed);
  }
  if (question.justification) {
    const justification = gradeChoicePart(given.justificationId, question.justification);
    earnedPoints += justification.earnedPoints;
    malformed ||= Boolean(justification.malformed);
  }
  return makeRaw(earnedPoints, maxPoints, true, malformed);
}

/* ------------------------------------------------------------------------ */
/*  Multi-part grading                                                       */
/* ------------------------------------------------------------------------ */

function gradePartQuestion(part: MultiPartItem, given: PartAnswerValue | undefined): RawGrade {
  switch (part.type) {
    case 'single-choice':
      return scaleRaw(gradeChoice(given, part.answerId), part.points);
    case 'multi-select':
      return scaleRaw(gradeMultiSelect(given, part.answerIds), part.points);
    case 'true-false':
      return scaleRaw(gradeBoolean(given, part.answer), part.points);
    case 'numeric':
      return scaleRaw(gradeNumeric(given, part.answer, part.tolerance), part.points);
    case 'exact':
      return scaleRaw(gradeExact(given, part.answer, part.acceptEquivalentForms), part.points);
    case 'ordering':
      return scaleRaw(gradeOrder(given, part.answerOrder), part.points);
    case 'matching':
      return scaleRaw(
        gradeMatching(
          given,
          part.pairs,
          new Set(part.right.map((item) => item.id)),
          part.allowReuse,
        ),
        part.points,
      );
    case 'fill-in':
      return scaleRaw(gradeFillIn(given, part.blanks), part.points);
    case 'short-answer':
      return scaleRaw(gradeText(given, part.acceptedAnswers, part.normalization), part.points);
  }
}

type StructuredPartsQuestion = Extract<
  TestQuestion,
  { type: 'multi-part' | 'diagram-reading' | 'transformation-application' }
>;

function gradeMultiPart(
  question: StructuredPartsQuestion,
  given: AnswerValue | undefined,
): RawGrade {
  const maxPoints = question.parts.reduce((sum, part) => sum + part.points, 0);
  if (!answerHasContent(given)) return makeRaw(0, maxPoints, false);
  if (!given || given.kind !== 'multi-part') return makeRaw(0, maxPoints, true, true);
  const partIds = new Set(question.parts.map((part) => part.id));
  if (!hasOnlyKnownKeys(given.parts, partIds)) return makeRaw(0, maxPoints, true, true);

  let earnedPoints = 0;
  let malformed = false;
  for (const part of question.parts) {
    const result = gradePartQuestion(part, given.parts[part.id]);
    earnedPoints += result.earnedPoints;
    malformed ||= Boolean(result.malformed);
  }
  return makeRaw(earnedPoints, maxPoints, true, malformed);
}

/* ------------------------------------------------------------------------ */
/*  Public grading API                                                       */
/* ------------------------------------------------------------------------ */

export function gradeQuestionDetailed(
  question: TestQuestion,
  given: AnswerValue | undefined,
): QuestionGrade {
  let raw: RawGrade;
  switch (question.type) {
    case 'single-choice':
      raw = gradeChoice(given, question.answerId);
      break;
    case 'error-analysis':
      raw = gradeErrorAnalysis(question, given);
      break;
    case 'multi-select':
      raw = gradeMultiSelect(given, question.answerIds);
      break;
    case 'true-false':
      raw = gradeBoolean(given, question.answer);
      break;
    case 'true-false-justify':
      raw = gradeTrueFalseJustify(question, given);
      break;
    case 'short-answer':
      raw = gradeText(given, question.acceptedAnswers, question.normalization);
      break;
    case 'fill-in':
      raw = gradeFillIn(given, question.blanks);
      break;
    case 'numeric':
      raw = gradeNumeric(given, question.answer, question.tolerance);
      break;
    case 'exact':
      raw = gradeExact(given, question.answer, question.acceptEquivalentForms);
      break;
    case 'ordering':
      raw = gradeOrder(given, question.answerOrder);
      break;
    case 'matching':
      raw = gradeMatching(
        given,
        question.pairs,
        new Set(question.right.map((item) => item.id)),
        question.allowReuse,
      );
      break;
    case 'classification':
      raw = gradeClassification(
        given,
        question.assignment,
        new Set(question.categories.map((category) => category.id)),
      );
      break;
    case 'justification':
      raw = gradeJustification(question, given);
      break;
    case 'multi-part':
    case 'diagram-reading':
    case 'transformation-application':
      raw = gradeMultiPart(question, given);
      break;
  }
  return makeGrade(raw);
}

/** Backwards-compatible status-only API used by existing callers and tests. */
export function gradeQuestion(question: TestQuestion, given: AnswerValue | undefined): Outcome {
  return gradeQuestionDetailed(question, given).outcome;
}

export interface QuestionOutcome {
  questionId: string;
  lessonId: string;
  concept: string;
  outcome: Outcome;
  earnedPoints: number;
  maxPoints: number;
}

export interface TestResult {
  testId: string;
  /** Number of questions, retained for existing result views. */
  total: number;
  correct: number;
  partiallyCorrect: number;
  incorrect: number;
  unanswered: number;
  earnedPoints: number;
  maxPoints: number;
  /** Percentage 0–100, rounded from earnedPoints / maxPoints. */
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
  const outcomes: QuestionOutcome[] = questions.map((question) => {
    const grade = gradeQuestionDetailed(question, given[question.id]);
    return {
      questionId: question.id,
      lessonId: question.lessonId,
      concept: question.concept,
      outcome: grade.outcome,
      earnedPoints: grade.earnedPoints,
      maxPoints: grade.maxPoints,
    };
  });

  const correct = outcomes.filter((entry) => entry.outcome === 'correct').length;
  const partiallyCorrect = outcomes.filter((entry) => entry.outcome === 'partially-correct').length;
  const incorrect = outcomes.filter((entry) => entry.outcome === 'incorrect').length;
  const unanswered = outcomes.filter((entry) => entry.outcome === 'unanswered').length;
  const earnedPoints = outcomes.reduce((sum, entry) => sum + entry.earnedPoints, 0);
  const maxPoints = outcomes.reduce((sum, entry) => sum + entry.maxPoints, 0);
  const score = maxPoints === 0 ? 0 : Math.round((earnedPoints / maxPoints) * 100);

  return {
    testId,
    total: questions.length,
    correct,
    partiallyCorrect,
    incorrect,
    unanswered,
    earnedPoints,
    maxPoints,
    score,
    passed: score >= passingScore,
    outcomes,
  };
}

/** Convenience for the Solutions Area: render a fraction back as `p/q`. */
export function formatFraction(value: Fraction): string {
  return `${value.numerator}/${value.denominator}`;
}
