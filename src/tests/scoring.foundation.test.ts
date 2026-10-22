import { describe, expect, it } from 'vitest';
import { answers, gradeQuestion, gradeQuestionDetailed } from './scoring';
import { testQuestionSchema, type TestQuestion } from './schema';

const base = {
  lessonId: 'lesson-foundation',
  concept: 'structured-response',
  difficulty: 'thinking' as const,
  prompt: [{ type: 'paragraph' as const, text: 'سؤال أساس' }],
  sourceRefs: [{ page: 5 }],
};

function parseQuestion(input: Record<string, unknown>): TestQuestion {
  return testQuestionSchema.parse({ ...base, ...input });
}

describe('Test Domain foundation scoring', () => {
  it('grades controlled short answers and fill-in blanks without free-form math grading', () => {
    const short = parseQuestion({
      id: 'q-short',
      type: 'short-answer',
      acceptedAnswers: ['الانسحاب', 'انسحاب'],
      normalization: 'term',
    });
    expect(gradeQuestion(short, answers.shortAnswer('الإنسحاب'))).toBe('correct');
    expect(gradeQuestion(short, answers.shortAnswer('دوران'))).toBe('incorrect');
    expect(gradeQuestion(short, answers.shortAnswer(''))).toBe('unanswered');

    const fill = parseQuestion({
      id: 'q-fill',
      type: 'fill-in',
      blanks: [
        { id: 'term', label: 'المصطلح', acceptedAnswers: ['انسحاب'], points: 1 },
        { id: 'property', label: 'الخاصية', acceptedAnswers: ['حفظ الأطوال'], points: 2 },
      ],
    });
    const partial = gradeQuestionDetailed(
      fill,
      answers.fillIn({ term: 'انسحاب', property: 'شيء آخر' }),
    );
    expect(partial).toMatchObject({ outcome: 'partially-correct', earnedPoints: 1, maxPoints: 3 });
    expect(gradeQuestion(fill, answers.fillIn({ term: 'انسحاب', property: 'حفظ الأطوال' }))).toBe(
      'correct',
    );
    expect(gradeQuestion(fill, answers.fillIn({ unknown: 'انسحاب' }))).toBe('incorrect');
  });

  it('scores verdict, correction and reason independently for true-false justification', () => {
    const question = parseQuestion({
      id: 'q-tfj',
      type: 'true-false-justify',
      answer: false,
      correction: {
        id: 'correction',
        prompt: [{ type: 'paragraph', text: 'التصحيح' }],
        choices: [
          { id: 'c-right', text: 'التصحيح الصحيح' },
          { id: 'c-wrong', text: 'تصحيح آخر' },
        ],
        answerId: 'c-right',
        points: 1,
      },
      justification: {
        id: 'reason',
        prompt: [{ type: 'paragraph', text: 'السبب' }],
        choices: [
          { id: 'j-right', text: 'السبب الصحيح' },
          { id: 'j-wrong', text: 'سبب آخر' },
        ],
        answerId: 'j-right',
        points: 1,
      },
    });

    expect(gradeQuestionDetailed(question, answers.trueFalseJustify(false))).toMatchObject({
      outcome: 'partially-correct',
      earnedPoints: 1,
      maxPoints: 3,
    });
    expect(
      gradeQuestionDetailed(question, answers.trueFalseJustify(false, 'c-right', 'j-wrong')),
    ).toMatchObject({ outcome: 'partially-correct', earnedPoints: 2, maxPoints: 3 });
    expect(gradeQuestion(question, answers.trueFalseJustify(false, 'c-right', 'j-right'))).toBe(
      'correct',
    );
  });

  it('gives each justification step and each multi-part response an independent score', () => {
    const justification = parseQuestion({
      id: 'q-justification',
      type: 'justification',
      steps: [
        {
          id: 'premise',
          prompt: [{ type: 'paragraph', text: 'المعطى' }],
          choices: [
            { id: 'p-right', text: 'المعطى الصحيح' },
            { id: 'p-wrong', text: 'معطى آخر' },
          ],
          answerId: 'p-right',
          points: 1,
        },
        {
          id: 'rule',
          prompt: [{ type: 'paragraph', text: 'القاعدة' }],
          choices: [
            { id: 'r-right', text: 'القاعدة الصحيحة' },
            { id: 'r-wrong', text: 'قاعدة أخرى' },
          ],
          answerId: 'r-right',
          points: 1,
        },
      ],
    });
    expect(
      gradeQuestionDetailed(justification, answers.justification({ premise: 'p-right' })),
    ).toMatchObject({ outcome: 'partially-correct', earnedPoints: 1, maxPoints: 2 });

    const multi = parseQuestion({
      id: 'q-multipart',
      type: 'multi-part',
      parts: [
        {
          id: 'choice',
          type: 'single-choice',
          prompt: [{ type: 'paragraph', text: 'اختيار' }],
          choices: [
            { id: 'a', text: 'أ' },
            { id: 'b', text: 'ب' },
          ],
          answerId: 'b',
          points: 1,
        },
        {
          id: 'order',
          type: 'ordering',
          prompt: [{ type: 'paragraph', text: 'رتّب' }],
          items: [
            { id: 'one', text: '1' },
            { id: 'two', text: '2' },
          ],
          answerOrder: ['two', 'one'],
          points: 2,
        },
      ],
    });
    const partial = gradeQuestionDetailed(
      multi,
      answers.multiPart({
        choice: answers.single('b'),
        order: answers.order(['two']),
      }),
    );
    expect(partial.outcome).toBe('partially-correct');
    expect(partial.earnedPoints).toBe(2);
    expect(partial.maxPoints).toBe(3);
  });

  it('supports named diagram-reading and transformation application types through structured parts', () => {
    const diagramQuestion = parseQuestion({
      id: 'q-diagram-reading',
      type: 'diagram-reading',
      prompt: [
        { type: 'paragraph', text: 'اقرأ الشكل' },
        {
          type: 'figure',
          diagram: {
            kind: 'reference',
            id: 'diagram-foundation',
            origin: 'authored',
            alt: 'شكل هندسي معلّم',
            source: { page: 5 },
          },
        },
      ],
      parts: [
        {
          id: 'read-point',
          type: 'single-choice',
          prompt: [{ type: 'paragraph', text: 'حدّد النقطة' }],
          choices: [
            { id: 'a', text: 'أ' },
            { id: 'b', text: 'ب' },
          ],
          answerId: 'b',
        },
      ],
    });
    expect(
      gradeQuestion(diagramQuestion, answers.multiPart({ 'read-point': answers.single('b') })),
    ).toBe('correct');

    const transformationQuestion = parseQuestion({
      id: 'q-transformation-application',
      type: 'transformation-application',
      parts: [
        {
          id: 'image-distance',
          type: 'numeric',
          prompt: [{ type: 'paragraph', text: 'احسب المسافة' }],
          answer: 4,
        },
      ],
    });
    expect(
      gradeQuestion(
        transformationQuestion,
        answers.multiPart({ 'image-distance': answers.numeric('4') }),
      ),
    ).toBe('correct');
  });

  it('rejects duplicate or unknown structured ids instead of awarding accidental partial credit', () => {
    const order = parseQuestion({
      id: 'q-malformed-order',
      type: 'ordering',
      items: [
        { id: 'a', text: 'أ' },
        { id: 'b', text: 'ب' },
        { id: 'c', text: 'ج' },
      ],
      answerOrder: ['a', 'b', 'c'],
    });
    expect(gradeQuestionDetailed(order, answers.order(['a', 'a', 'c']))).toMatchObject({
      outcome: 'incorrect',
      earnedPoints: 0,
      maxPoints: 3,
    });
  });

  it('scores error location, correction and reason while retaining the old single answer form', () => {
    const question = parseQuestion({
      id: 'q-error-structured',
      type: 'error-analysis',
      steps: [
        { id: 'step-one', text: 'الخطوة الأولى' },
        { id: 'step-two', text: 'الخطوة الثانية' },
      ],
      choices: [
        { id: 'step-one', text: 'الأولى' },
        { id: 'step-two', text: 'الثانية' },
      ],
      answerId: 'step-two',
      correction: {
        id: 'correction',
        prompt: [{ type: 'paragraph', text: 'صحّح' }],
        choices: [
          { id: 'right', text: 'الصحيح' },
          { id: 'wrong', text: 'غير صحيح' },
        ],
        answerId: 'right',
        points: 1,
      },
      justification: {
        id: 'reason',
        prompt: [{ type: 'paragraph', text: 'علّل' }],
        choices: [
          { id: 'reason-right', text: 'السبب' },
          { id: 'reason-wrong', text: 'سبب آخر' },
        ],
        answerId: 'reason-right',
        points: 1,
      },
    });
    expect(gradeQuestionDetailed(question, answers.errorAnalysis('step-two'))).toMatchObject({
      outcome: 'partially-correct',
      earnedPoints: 1,
      maxPoints: 3,
    });
    expect(
      gradeQuestion(question, answers.errorAnalysis('step-two', 'right', 'reason-right')),
    ).toBe('correct');
  });
});
