import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { TestRunnerPage } from './TestRunnerPage';
import { getTestEntry, type TestEntry } from '@/tests/registry';
import {
  ANSWER_INSTRUCTIONS,
  QUESTION_TYPE_LABELS,
  testQuestionSchema,
  type TestQuestion,
} from '@/tests/schema';

vi.mock('@/tests/registry', () => ({
  getTestEntry: vi.fn(),
}));

const mockedGetTestEntry = vi.mocked(getTestEntry);

const baseQuestion = {
  lessonId: 'lesson-foundation',
  concept: 'structured-response',
  difficulty: 'thinking' as const,
  sourceRefs: [{ page: 5 }],
};

function makeEntry(testId: string, question: TestQuestion): TestEntry {
  return {
    definition: {
      id: testId,
      title: 'اختبار أسئلة منظمة',
      scope: 'lesson',
      targetId: 'lesson-foundation',
      summary: 'اختبار تجريبي للتحقق من العرض.',
      instructions: 'أجب عن السؤال المنظم.',
      passingScore: 60,
      solutionGroupSize: 5,
      questionIds: [question.id],
      blueprint: {
        coverage: [{ concept: question.concept, label: 'إجابة منظمة', count: 1 }],
        difficulty: [{ level: question.difficulty, count: 1 }],
        types: [{ type: question.type, count: 1 }],
      },
      solutionPolicy: 'legacy',
    },
    questions: [question],
    coveredLessons: [],
    href: `/tests/${testId}`,
    solutionHref: `/tests/solutions/${testId}`,
  };
}

function renderRunner(question: TestQuestion) {
  const testId = `${question.id}-test`;
  mockedGetTestEntry.mockReturnValue(makeEntry(testId, question));
  return render(
    <MemoryRouter initialEntries={[`/tests/${testId}`]}>
      <Routes>
        <Route path="/tests/:testId" element={<TestRunnerPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('Test Runner structured question UI', () => {
  beforeEach(() => {
    sessionStorage.clear();
    mockedGetTestEntry.mockReset();
  });

  it('renders the diagram-reading type, its runner instruction and every structured part', async () => {
    const user = userEvent.setup();
    const question = testQuestionSchema.parse({
      ...baseQuestion,
      id: 'q-runner-diagram-reading',
      type: 'diagram-reading',
      prompt: [{ type: 'paragraph', text: 'اقرأ المعطيات المعلّمة.' }],
      parts: [
        {
          id: 'diagram-point',
          type: 'single-choice',
          prompt: [{ type: 'paragraph', text: 'حدّد صورة النقطة.' }],
          choices: [
            { id: 'point-a', text: 'النقطة أ' },
            { id: 'point-b', text: 'النقطة ب' },
          ],
          answerId: 'point-b',
        },
      ],
    });

    renderRunner(question);
    await user.click(screen.getByRole('button', { name: 'بدء الاختبار الآن' }));

    expect(screen.getByText(QUESTION_TYPE_LABELS['diagram-reading'])).toBeInTheDocument();
    expect(screen.getByText(ANSWER_INSTRUCTIONS['diagram-reading'])).toBeInTheDocument();
    expect(screen.getByText('اقرأ المعطيات المعلّمة.')).toBeInTheDocument();
    expect(screen.getByText('حدّد صورة النقطة.')).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'النقطة أ' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'النقطة ب' })).toBeInTheDocument();
  });

  it('renders the transformation-application type, its runner instruction and its numeric part', async () => {
    const user = userEvent.setup();
    const question = testQuestionSchema.parse({
      ...baseQuestion,
      id: 'q-runner-transformation',
      type: 'transformation-application',
      prompt: [{ type: 'paragraph', text: 'طبّق التحويل على النقطة.' }],
      parts: [
        {
          id: 'image-coordinate',
          type: 'numeric',
          prompt: [{ type: 'paragraph', text: 'اكتب إحداثي الصورة.' }],
          answer: 4,
          unit: 'سم',
        },
      ],
    });

    renderRunner(question);
    await user.click(screen.getByRole('button', { name: 'بدء الاختبار الآن' }));

    expect(
      screen.getByText(QUESTION_TYPE_LABELS['transformation-application']),
    ).toBeInTheDocument();
    expect(screen.getByText(ANSWER_INSTRUCTIONS['transformation-application'])).toBeInTheDocument();
    expect(screen.getByText('طبّق التحويل على النقطة.')).toBeInTheDocument();
    expect(screen.getByText('اكتب إحداثي الصورة.')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('اكتب القيمة العددية')).toBeInTheDocument();
    expect(screen.getByText('سم')).toBeInTheDocument();
  });
});
