import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { TestSolutionDetailPage } from './TestSolutionDetailPage';
import { getTestEntry, loadSolutionSet, type TestEntry } from '@/tests/registry';
import { solutionSetSchema, testQuestionSchema, type TestQuestion } from '@/tests/schema';

vi.mock('@/tests/registry', () => ({
  getTestEntry: vi.fn(),
  loadSolutionSet: vi.fn(),
}));

const mockedGetTestEntry = vi.mocked(getTestEntry);
const mockedLoadSolutionSet = vi.mocked(loadSolutionSet);

function makeQuestion(): TestQuestion {
  return testQuestionSchema.parse({
    id: 'q-solution-renderer',
    lessonId: 'lesson-foundation',
    concept: 'structured-response',
    difficulty: 'thinking',
    prompt: [{ type: 'paragraph', text: 'سؤال الحل التفصيلي' }],
    sourceRefs: [{ page: 5, locator: 'الشكل 1' }],
    type: 'single-choice',
    choices: [
      { id: 'choice-a', text: 'أ' },
      { id: 'choice-b', text: 'ب' },
    ],
    answerId: 'choice-b',
  });
}

function makeEntry(testId: string, question: TestQuestion): TestEntry {
  return {
    definition: {
      id: testId,
      title: 'اختبار الحلول التفصيلية',
      scope: 'lesson',
      targetId: 'lesson-foundation',
      summary: 'اختبار تجريبي.',
      instructions: 'أجب عن الأسئلة.',
      passingScore: 60,
      solutionGroupSize: 5,
      questionIds: [question.id],
      blueprint: {
        coverage: [{ concept: question.concept, label: 'مفهوم', count: 1 }],
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

function renderSolutions(testId: string) {
  return render(
    <MemoryRouter initialEntries={[`/tests/solutions/${testId}`]}>
      <Routes>
        <Route path="/tests/solutions/:testId" element={<TestSolutionDetailPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('Test solution detail renderer', () => {
  beforeEach(() => {
    mockedGetTestEntry.mockReset();
    mockedLoadSolutionSet.mockReset();
  });

  it('renders all detailed top-level and per-part solution metadata with distinct provenance labels', async () => {
    const question = makeQuestion();
    const testId = 'solution-renderer-test';
    mockedGetTestEntry.mockReturnValue(makeEntry(testId, question));
    mockedLoadSolutionSet.mockResolvedValue(
      solutionSetSchema.parse({
        testId,
        solutions: {
          [question.id]: {
            answerSummary: 'الخيار ب',
            given: [{ type: 'paragraph', text: 'المعطى العام.' }],
            steps: [{ type: 'paragraph', text: 'الخطوة العامة.' }],
            check: 'تحقق من النتيجة.',
            commonError: 'لا تخلط بين الاتجاهين.',
            diagramNotes: [{ type: 'paragraph', text: 'النقطة المعلّمة.' }],
            provenance: {
              sourceVerified: [{ type: 'paragraph', text: 'عبارة متحققة من المصدر.' }],
              platformAuthored: [{ type: 'paragraph', text: 'وصلة تفسيرية من المنصة.' }],
            },
            scoringCriteria: [{ points: 1, description: 'اختيار القيمة $x^2$ الصحيحة' }],
            sourceRefs: [{ page: 11, book: 'كتاب الهندسة', locator: 'التمرين 2' }],
            parts: [
              {
                id: 'part-a',
                answerSummary: 'إجابة الجزء أ',
                given: [{ type: 'paragraph', text: 'معطى الجزء.' }],
                steps: [{ type: 'paragraph', text: 'خطوة الجزء.' }],
                rule: 'قاعدة الجزء.',
                check: 'تحقق الجزء.',
                commonError: 'خطأ الجزء.',
                diagramNotes: [{ type: 'paragraph', text: 'ملاحظة شكل الجزء.' }],
                provenance: {
                  sourceVerified: [{ type: 'paragraph', text: 'مصدر الجزء المتحقق.' }],
                  platformAuthored: [{ type: 'paragraph', text: 'شرح الجزء المؤلف.' }],
                },
                scoringCriteria: [{ points: 1, description: 'درجة للقيمة $M_1$' }],
                sourceRefs: [{ page: 12, locator: 'الشكل 2' }],
              },
            ],
          },
        },
      }),
    );

    const { container } = renderSolutions(testId);

    expect(await screen.findByText('الإجابة الصحيحة:')).toBeInTheDocument();
    expect(screen.getByText('طريقة التحقق:')).toBeInTheDocument();
    expect(screen.getByText('خطأ شائع يجب الانتباه له:')).toBeInTheDocument();
    expect(screen.getByText('قراءة الشكل والعلاقات المعلّمة:')).toBeInTheDocument();
    expect(screen.getByText('بيان موثّق من المصدر:')).toBeInTheDocument();
    expect(screen.getByText('الشرح التحليلي من المنصّة:')).toBeInTheDocument();
    expect(screen.getByText('مراجع الحل الإضافية:')).toBeInTheDocument();
    expect(screen.getByText('مراجع السؤال في الكتاب:')).toBeInTheDocument();
    expect(screen.getByText('طريقة التحقق من الجزء:')).toBeInTheDocument();
    expect(screen.getByText('خطأ شائع في الجزء:')).toBeInTheDocument();
    expect(screen.getByText('ملاحظات شكل الجزء:')).toBeInTheDocument();
    expect(screen.getByText('بيان الجزء الموثّق من المصدر:')).toBeInTheDocument();
    expect(screen.getByText('شرح الجزء من المنصّة:')).toBeInTheDocument();
    expect(screen.getByText('مراجع مصدر الجزء:')).toBeInTheDocument();
    expect(screen.getByText('عبارة متحققة من المصدر.')).toBeInTheDocument();
    expect(screen.getByText('وصلة تفسيرية من المنصة.')).toBeInTheDocument();
    expect(screen.getByText('مصدر الجزء المتحقق.')).toBeInTheDocument();
    expect(screen.getByText('شرح الجزء المؤلف.')).toBeInTheDocument();
    expect(screen.getByText('ص. 11')).toBeInTheDocument();
    expect(screen.getByText('ص. 12')).toBeInTheDocument();
    const rubricItems = Array.from(container.querySelectorAll('li')).filter((item) =>
      item.querySelector('.katex'),
    );
    expect(rubricItems).toHaveLength(2);
    expect(rubricItems.map((item) => item.textContent).join(' ')).not.toContain('$');
  });

  it('keeps legacy solutions clean by omitting empty optional metadata sections', async () => {
    const question = makeQuestion();
    const testId = 'legacy-solution-renderer-test';
    mockedGetTestEntry.mockReturnValue(makeEntry(testId, question));
    mockedLoadSolutionSet.mockResolvedValue(
      solutionSetSchema.parse({
        testId,
        solutions: {
          [question.id]: {
            answerSummary: 'الخيار ب',
            steps: [{ type: 'paragraph', text: 'خطوة قديمة.' }],
          },
        },
      }),
    );

    renderSolutions(testId);

    expect(await screen.findByText('خطوة قديمة.')).toBeInTheDocument();
    expect(screen.queryByText('طريقة التحقق:')).toBeNull();
    expect(screen.queryByText('خطأ شائع يجب الانتباه له:')).toBeNull();
    expect(screen.queryByText('مراجع الحل الإضافية:')).toBeNull();
    expect(screen.queryByText('تفصيل الأجزاء والدرجات')).toBeNull();
  });
});
