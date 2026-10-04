import { describe, expect, it } from 'vitest';
import {
  answers,
  formatFraction,
  gradeQuestion,
  gradeTest,
  isAnswered,
  normalizeNumericInput,
  parseNumericInput,
  parseRational,
  rationalsEqual,
  reduceRational,
} from './scoring';
import type { TestQuestion } from './schema';

const baseQuestion = {
  lessonId: 'lesson-01-translation-and-properties',
  concept: 'definition',
  difficulty: 'basic' as const,
  prompt: [{ type: 'paragraph' as const, text: 'سؤال تجريبي' }],
  sourceRefs: [{ page: 5 }],
};

describe('scoring engine — inputs and rationals', () => {
  it('normalises Arabic-Indic digits and Arabic decimal marks', () => {
    expect(normalizeNumericInput('٤٫٥')).toBe('4.5');
    expect(normalizeNumericInput('١٢')).toBe('12');
    expect(normalizeNumericInput('٠')).toBe('0');
    expect(normalizeNumericInput('3,5')).toBe('3.5');
  });

  it('parses valid numeric inputs and rejects invalid strings', () => {
    expect(parseNumericInput('4.5')).toBe(4.5);
    expect(parseNumericInput('-3.2')).toBe(-3.2);
    expect(parseNumericInput('٤٫٥')).toBe(4.5);
    expect(parseNumericInput('.75')).toBe(0.75);
    expect(parseNumericInput('abc')).toBeUndefined();
    expect(parseNumericInput('4.5.6')).toBeUndefined();
    expect(parseNumericInput('')).toBeUndefined();
  });

  it('reduces rationals to lowest terms keeping sign on numerator', () => {
    expect(reduceRational({ numerator: 4, denominator: 8 })).toEqual({
      numerator: 1,
      denominator: 2,
    });
    expect(reduceRational({ numerator: 3, denominator: -9 })).toEqual({
      numerator: -1,
      denominator: 3,
    });
  });

  it('parses fractions, decimals, integers and tests rational equality', () => {
    const halfFraction = parseRational('1/2');
    const halfDecimal = parseRational('0.5');
    const halfNonReduced = parseRational('2/4');
    expect(halfFraction).toBeDefined();
    expect(halfDecimal).toBeDefined();
    expect(halfNonReduced).toBeDefined();
    expect(rationalsEqual(halfFraction!, halfDecimal!)).toBe(true);
    expect(rationalsEqual(halfFraction!, halfNonReduced!)).toBe(true);

    const arabicDecimal = parseRational('٠٫٥');
    expect(arabicDecimal).toBeDefined();
    expect(rationalsEqual(halfFraction!, arabicDecimal!)).toBe(true);

    expect(formatFraction({ numerator: 3, denominator: 4 })).toBe('3/4');
  });
});

describe('scoring engine — all question types', () => {
  it('grades single-choice questions', () => {
    const q: TestQuestion = {
      ...baseQuestion,
      id: 'q-sc',
      type: 'single-choice',
      choices: [
        { id: 'opt-a', text: 'أ' },
        { id: 'opt-b', text: 'ب' },
      ],
      answerId: 'opt-b',
    };
    expect(gradeQuestion(q, undefined)).toBe('unanswered');
    expect(gradeQuestion(q, answers.single(''))).toBe('unanswered');
    expect(gradeQuestion(q, answers.single('opt-a'))).toBe('incorrect');
    expect(gradeQuestion(q, answers.single('opt-b'))).toBe('correct');
  });

  it('grades multi-select questions with exact-set semantics (order independent, extras incorrect)', () => {
    const q: TestQuestion = {
      ...baseQuestion,
      id: 'q-ms',
      type: 'multi-select',
      choices: [
        { id: 'a', text: 'أ' },
        { id: 'b', text: 'ب' },
        { id: 'c', text: 'ج' },
      ],
      answerIds: ['a', 'c'],
    };
    expect(gradeQuestion(q, answers.multi([]))).toBe('unanswered');
    expect(gradeQuestion(q, answers.multi(['a']))).toBe('incorrect');
    expect(gradeQuestion(q, answers.multi(['a', 'b', 'c']))).toBe('incorrect');
    expect(gradeQuestion(q, answers.multi(['a', 'c']))).toBe('correct');
    expect(gradeQuestion(q, answers.multi(['c', 'a']))).toBe('correct');
  });

  it('grades true-false questions', () => {
    const q: TestQuestion = {
      ...baseQuestion,
      id: 'q-tf',
      type: 'true-false',
      answer: true,
    };
    expect(gradeQuestion(q, undefined)).toBe('unanswered');
    expect(gradeQuestion(q, answers.boolean(false))).toBe('incorrect');
    expect(gradeQuestion(q, answers.boolean(true))).toBe('correct');
  });

  it('grades numeric questions with tolerance', () => {
    const q: TestQuestion = {
      ...baseQuestion,
      id: 'q-num',
      type: 'numeric',
      answer: 4.5,
      tolerance: 0.1,
    };
    expect(gradeQuestion(q, answers.numeric(''))).toBe('unanswered');
    expect(gradeQuestion(q, answers.numeric('4.5'))).toBe('correct');
    expect(gradeQuestion(q, answers.numeric('٤٫٥'))).toBe('correct');
    expect(gradeQuestion(q, answers.numeric('4.55'))).toBe('correct');
    expect(gradeQuestion(q, answers.numeric('4.7'))).toBe('incorrect');
  });

  it('grades exact questions supporting equivalent forms or requiring literal form', () => {
    const qEquivalent: TestQuestion = {
      ...baseQuestion,
      id: 'q-ex-eq',
      type: 'exact',
      answer: { numerator: 1, denominator: 2 },
      acceptEquivalentForms: true,
    };
    expect(gradeQuestion(qEquivalent, answers.exact('1/2'))).toBe('correct');
    expect(gradeQuestion(qEquivalent, answers.exact('2/4'))).toBe('correct');
    expect(gradeQuestion(qEquivalent, answers.exact('0.5'))).toBe('correct');
    expect(gradeQuestion(qEquivalent, answers.exact('٠٫٥'))).toBe('correct');
    expect(gradeQuestion(qEquivalent, answers.exact('1/3'))).toBe('incorrect');

    const qStrict: TestQuestion = {
      ...baseQuestion,
      id: 'q-ex-strict',
      type: 'exact',
      answer: { numerator: 1, denominator: 2 },
      acceptEquivalentForms: false,
    };
    expect(gradeQuestion(qStrict, answers.exact('1/2'))).toBe('correct');
    expect(gradeQuestion(qStrict, answers.exact('2/4'))).toBe('incorrect');
    expect(gradeQuestion(qStrict, answers.exact('0.5'))).toBe('incorrect');
  });

  it('grades ordering questions requiring full correct sequence', () => {
    const q: TestQuestion = {
      ...baseQuestion,
      id: 'q-ord',
      type: 'ordering',
      items: [
        { id: 'step-1', text: '1' },
        { id: 'step-2', text: '2' },
        { id: 'step-3', text: '3' },
      ],
      answerOrder: ['step-2', 'step-1', 'step-3'],
    };
    expect(gradeQuestion(q, answers.order([]))).toBe('unanswered');
    expect(gradeQuestion(q, answers.order(['step-1', 'step-2', 'step-3']))).toBe('incorrect');
    expect(gradeQuestion(q, answers.order(['step-2', 'step-1']))).toBe('incorrect');
    expect(gradeQuestion(q, answers.order(['step-2', 'step-1', 'step-3']))).toBe('correct');
  });

  it('grades matching questions requiring every pair', () => {
    const q: TestQuestion = {
      ...baseQuestion,
      id: 'q-match',
      type: 'matching',
      left: [
        { id: 'l1', text: 'A' },
        { id: 'l2', text: 'B' },
      ],
      right: [
        { id: 'r1', text: '1' },
        { id: 'r2', text: '2' },
      ],
      pairs: { l1: 'r2', l2: 'r1' },
    };
    expect(gradeQuestion(q, answers.matching({}))).toBe('unanswered');
    expect(gradeQuestion(q, answers.matching({ l1: 'r2' }))).toBe('incorrect');
    expect(gradeQuestion(q, answers.matching({ l1: 'r1', l2: 'r2' }))).toBe('incorrect');
    expect(gradeQuestion(q, answers.matching({ l1: 'r2', l2: 'r1' }))).toBe('correct');
  });

  it('grades classification questions requiring every assignment', () => {
    const q: TestQuestion = {
      ...baseQuestion,
      id: 'q-class',
      type: 'classification',
      categories: [
        { id: 'cat-a', text: 'A' },
        { id: 'cat-b', text: 'B' },
      ],
      items: [
        { id: 'it-1', text: '1' },
        { id: 'it-2', text: '2' },
      ],
      assignment: { 'it-1': 'cat-a', 'it-2': 'cat-b' },
    };
    expect(gradeQuestion(q, answers.classification({}))).toBe('unanswered');
    expect(gradeQuestion(q, answers.classification({ 'it-1': 'cat-a' }))).toBe('incorrect');
    expect(gradeQuestion(q, answers.classification({ 'it-1': 'cat-b', 'it-2': 'cat-a' }))).toBe(
      'incorrect',
    );
    expect(gradeQuestion(q, answers.classification({ 'it-1': 'cat-a', 'it-2': 'cat-b' }))).toBe(
      'correct',
    );
  });

  it('grades error-analysis questions', () => {
    const q: TestQuestion = {
      ...baseQuestion,
      id: 'q-err',
      type: 'error-analysis',
      steps: [
        { id: 's1', text: 'الخطوة 1' },
        { id: 's2', text: 'الخطوة 2' },
      ],
      choices: [
        { id: 's1', text: 'الخطوة 1 خاطئة' },
        { id: 's2', text: 'الخطوة 2 خاطئة' },
      ],
      answerId: 's2',
    };
    expect(gradeQuestion(q, answers.single('s1'))).toBe('incorrect');
    expect(gradeQuestion(q, answers.single('s2'))).toBe('correct');
  });

  it('computes full deterministic TestResult and isAnswered checks', () => {
    const q1: TestQuestion = {
      ...baseQuestion,
      id: 'q1',
      type: 'true-false',
      answer: true,
    };
    const q2: TestQuestion = {
      ...baseQuestion,
      id: 'q2',
      type: 'true-false',
      answer: false,
    };

    expect(isAnswered(q1, undefined)).toBe(false);
    expect(isAnswered(q1, answers.boolean(true))).toBe(true);

    const result = gradeTest('test-demo', 60, [q1, q2], {
      q1: answers.boolean(true),
      q2: answers.boolean(true), // incorrect
    });
    expect(result.total).toBe(2);
    expect(result.correct).toBe(1);
    expect(result.incorrect).toBe(1);
    expect(result.unanswered).toBe(0);
    expect(result.score).toBe(50);
    expect(result.passed).toBe(false);
  });
});
