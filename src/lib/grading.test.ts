import { describe, expect, it } from 'vitest';
import { assessmentSchema } from '@/content/schema';
import { gradeAssessment, isAnswered, isCorrect } from './grading';

const assessment = assessmentSchema.parse({
  id: 'assess-test',
  title: 'اختبار',
  passingScore: 70,
  questions: [
    {
      id: 'q-mcq',
      type: 'multiple-choice',
      prompt: [{ type: 'paragraph', text: 'سؤال' }],
      choices: [
        { id: 'c-a', blocks: [{ type: 'paragraph', text: 'أ' }] },
        { id: 'c-b', blocks: [{ type: 'paragraph', text: 'ب' }] },
      ],
      correctChoiceId: 'c-b',
    },
    {
      id: 'q-tf',
      type: 'true-false',
      prompt: [{ type: 'paragraph', text: 'سؤال' }],
      answer: false,
    },
    {
      id: 'q-num',
      type: 'numeric',
      prompt: [{ type: 'paragraph', text: 'سؤال' }],
      answer: 4.5,
      tolerance: 0.01,
    },
    {
      id: 'q-exact',
      type: 'numeric',
      prompt: [{ type: 'paragraph', text: 'سؤال' }],
      answer: 18,
    },
  ],
});

const [mcq, tf, num, exact] = assessment.questions;

describe('isAnswered', () => {
  it('treats a missing or blank answer as unanswered', () => {
    expect(isAnswered(mcq!, {})).toBe(false);
    expect(isAnswered(num!, { 'q-num': '' })).toBe(false);
    expect(isAnswered(num!, { 'q-num': '   ' })).toBe(false);
  });

  it('treats zero as a real answer', () => {
    expect(isAnswered(num!, { 'q-num': '0' })).toBe(true);
  });
});

describe('isCorrect', () => {
  it('grades multiple choice by choice id', () => {
    expect(isCorrect(mcq!, { 'q-mcq': 'c-b' })).toBe(true);
    expect(isCorrect(mcq!, { 'q-mcq': 'c-a' })).toBe(false);
  });

  it('grades true/false', () => {
    expect(isCorrect(tf!, { 'q-tf': 'false' })).toBe(true);
    expect(isCorrect(tf!, { 'q-tf': 'true' })).toBe(false);
  });

  it('honours the numeric tolerance', () => {
    expect(isCorrect(num!, { 'q-num': '4.5' })).toBe(true);
    expect(isCorrect(num!, { 'q-num': '4.505' })).toBe(true);
    expect(isCorrect(num!, { 'q-num': '4.6' })).toBe(false);
  });

  it('requires an exact match when the tolerance is zero', () => {
    expect(isCorrect(exact!, { 'q-exact': '18' })).toBe(true);
    expect(isCorrect(exact!, { 'q-exact': '18.1' })).toBe(false);
  });

  it('never marks a non-numeric string correct', () => {
    expect(isCorrect(num!, { 'q-num': 'أربعة' })).toBe(false);
  });
});

describe('gradeAssessment', () => {
  it('scores an empty run as zero and fails it', () => {
    const result = gradeAssessment(assessment, {});
    expect(result.correctCount).toBe(0);
    expect(result.score).toBe(0);
    expect(result.passed).toBe(false);
    expect(result.outcomes.every((outcome) => !outcome.answered)).toBe(true);
  });

  it('scores a perfect run as 100 and passes it', () => {
    const result = gradeAssessment(assessment, {
      'q-mcq': 'c-b',
      'q-tf': 'false',
      'q-num': '4.5',
      'q-exact': '18',
    });
    expect(result.score).toBe(100);
    expect(result.passed).toBe(true);
  });

  it('rounds the percentage and applies the passing score', () => {
    const result = gradeAssessment(assessment, { 'q-mcq': 'c-b', 'q-tf': 'false', 'q-num': '4.5' });
    expect(result.correctCount).toBe(3);
    expect(result.score).toBe(75);
    expect(result.passed).toBe(true);
  });
});
