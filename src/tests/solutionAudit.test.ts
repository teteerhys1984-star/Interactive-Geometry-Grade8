import { describe, expect, it } from 'vitest';
import { solutionCompletenessIssues, solutionSetCompletenessIssues } from './solutionAudit';
import { solutionSchema, testDefinitionSchema, testQuestionSchema } from './schema';

const questionBase = {
  id: 'q-audit',
  lessonId: 'lesson-foundation',
  concept: 'structured-response',
  difficulty: 'basic' as const,
  prompt: [{ type: 'paragraph' as const, text: 'سؤال' }],
  sourceRefs: [{ page: 5 }],
};

const completeSolution = solutionSchema.parse({
  answerSummary: 'الإجابة المحددة',
  given: [{ type: 'paragraph', text: 'المعطى' }],
  steps: [{ type: 'paragraph', text: 'خطوة 1' }],
  rule: 'خاصية هندسية موثقة',
  scoringCriteria: [{ points: 1, description: 'يحدد الإجابة مع التعليل' }],
  provenance: {
    sourceVerified: [{ type: 'paragraph', text: 'بيان من المصدر' }],
    platformAuthored: [{ type: 'paragraph', text: 'صلة البيان بالسؤال' }],
  },
});

describe('detailed Test Domain solution completeness', () => {
  it('rejects an incomplete future solution instead of treating a file as sufficient', () => {
    const question = testQuestionSchema.parse({
      ...questionBase,
      type: 'single-choice',
      choices: [
        { id: 'a', text: 'أ' },
        { id: 'b', text: 'ب' },
      ],
      answerId: 'b',
    });
    const incomplete = solutionSchema.parse({
      answerSummary: 'ب',
      steps: [{ type: 'paragraph', text: 'خطوة' }],
    });
    const issues = solutionCompletenessIssues(question, incomplete, true);
    expect(issues).toEqual(
      expect.arrayContaining([
        'q-audit: missing givens',
        'q-audit: missing rule/property/definition',
        'q-audit: missing scoring criteria',
        'q-audit: missing source-verified statement',
        'q-audit: missing platform-authored explanation',
      ]),
    );
  });

  it('requires exact independent solution parts for multi-part questions', () => {
    const question = testQuestionSchema.parse({
      ...questionBase,
      id: 'q-multi-audit',
      type: 'multi-part',
      parts: [
        {
          id: 'part-a',
          type: 'single-choice',
          prompt: [{ type: 'paragraph', text: 'الجزء أ' }],
          choices: [
            { id: 'a', text: 'أ' },
            { id: 'b', text: 'ب' },
          ],
          answerId: 'a',
        },
        {
          id: 'part-b',
          type: 'short-answer',
          prompt: [{ type: 'paragraph', text: 'الجزء ب' }],
          acceptedAnswers: ['مصطلح'],
        },
      ],
    });
    const solution = solutionSchema.parse({
      ...completeSolution,
      parts: [
        {
          id: 'part-a',
          answerSummary: 'أ',
          given: [{ type: 'paragraph', text: 'معطى أ' }],
          steps: [{ type: 'paragraph', text: 'حل أ' }],
          rule: 'قاعدة أ',
          scoringCriteria: [{ points: 1, description: 'الجزء أ صحيح' }],
          provenance: completeSolution.provenance,
        },
      ],
    });
    const issues = solutionCompletenessIssues(question, solution, true);
    expect(issues.some((issue) => issue.includes('solution parts must match exactly'))).toBe(true);
    expect(issues.some((issue) => issue.includes('multi-part part-b: missing solution part'))).toBe(
      true,
    );
  });

  it('audits question-to-solution correspondence for a detailed test definition', () => {
    const question = testQuestionSchema.parse({
      ...questionBase,
      type: 'single-choice',
      choices: [
        { id: 'a', text: 'أ' },
        { id: 'b', text: 'ب' },
      ],
      answerId: 'b',
    });
    const definition = testDefinitionSchema.parse({
      id: 'foundation-test',
      title: 'اختبار الأساس',
      scope: 'lesson',
      targetId: 'lesson-foundation',
      summary: 'اختبار',
      instructions: 'تعليمات',
      questionIds: ['q-audit', 'q-missing'],
      blueprint: {
        coverage: [{ concept: 'structured-response', label: 'استجابة', count: 2 }],
        difficulty: [{ level: 'basic', count: 2 }],
        types: [{ type: 'single-choice', count: 2 }],
      },
      solutionPolicy: 'detailed',
    });
    const issues = solutionSetCompletenessIssues(definition, [question], {
      testId: definition.id,
      solutions: { 'q-audit': completeSolution, extra: completeSolution },
    });
    expect(issues.some((issue) => issue.questionId === 'q-missing')).toBe(true);
    expect(issues.some((issue) => issue.questionId === 'extra')).toBe(true);
    expect(issues.some((issue) => issue.questionId === 'q-audit')).toBe(false);
  });
});
