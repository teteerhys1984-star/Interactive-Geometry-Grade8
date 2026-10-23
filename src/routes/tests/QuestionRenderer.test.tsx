import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QuestionRenderer } from './QuestionRenderer';
import { testQuestionSchema } from '@/tests/schema';

const base = {
  lessonId: 'lesson-foundation',
  concept: 'structured-response',
  difficulty: 'thinking' as const,
  prompt: [{ type: 'paragraph' as const, text: 'اقرأ السؤال' }],
  sourceRefs: [{ page: 5 }],
};

describe('Test Domain structured renderer', () => {
  it('renders error-analysis steps, correction and reason without leaking the answer key', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const question = testQuestionSchema.parse({
      ...base,
      id: 'q-render-error',
      type: 'error-analysis',
      steps: [
        { id: 'step-one', text: 'الخطوة الأولى المعروضة' },
        { id: 'step-two', text: 'الخطوة الثانية المعروضة' },
      ],
      choices: [
        { id: 'step-one', text: 'الخطوة الأولى' },
        { id: 'step-two', text: 'الخطوة الثانية' },
      ],
      answerId: 'step-two',
      correction: {
        id: 'correction',
        prompt: [{ type: 'paragraph', text: 'اختر التصحيح' }],
        choices: [
          { id: 'right-correction', text: 'التصحيح الصحيح' },
          { id: 'wrong-correction', text: 'تصحيح آخر' },
        ],
        answerId: 'right-correction',
      },
      justification: {
        id: 'reason',
        prompt: [{ type: 'paragraph', text: 'اختر السبب' }],
        choices: [
          { id: 'right-reason', text: 'السبب الصحيح' },
          { id: 'wrong-reason', text: 'سبب آخر' },
        ],
        answerId: 'right-reason',
      },
    });

    render(<QuestionRenderer question={question} value={undefined} onChange={onChange} />);
    expect(screen.getByText('الخطوة الأولى المعروضة')).toBeInTheDocument();
    expect(screen.getByText('الخطوة الثانية المعروضة')).toBeInTheDocument();
    expect(screen.getByText('اختر التصحيح')).toBeInTheDocument();
    expect(screen.getByText('اختر السبب')).toBeInTheDocument();
    expect(screen.queryByText('الإجابة الصحيحة:')).toBeNull();

    await user.click(screen.getByRole('radio', { name: 'الخطوة الثانية' }));
    expect(onChange).toHaveBeenLastCalledWith({
      kind: 'error-analysis',
      stepId: 'step-two',
    });
  });

  it('renders multi-part prompts and preserves independently typed part answers', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const question = testQuestionSchema.parse({
      ...base,
      id: 'q-render-multi',
      type: 'multi-part',
      parts: [
        {
          id: 'part-choice',
          type: 'single-choice',
          prompt: [{ type: 'paragraph', text: 'الجزء الأول' }],
          choices: [
            { id: 'choice-a', text: 'أ' },
            { id: 'choice-b', text: 'ب' },
          ],
          answerId: 'choice-b',
        },
        {
          id: 'part-text',
          type: 'short-answer',
          prompt: [{ type: 'paragraph', text: 'الجزء الثاني' }],
          acceptedAnswers: ['مصطلح'],
        },
      ],
    });

    const { rerender } = render(
      <QuestionRenderer question={question} value={undefined} onChange={onChange} />,
    );
    expect(screen.getByText('الجزء الأول')).toBeInTheDocument();
    expect(screen.getByText('الجزء الثاني')).toBeInTheDocument();
    expect(screen.getAllByText('1 درجة')).toHaveLength(2);

    await user.click(screen.getByRole('radio', { name: 'ب' }));
    expect(onChange).toHaveBeenLastCalledWith({
      kind: 'multi-part',
      parts: { 'part-choice': { kind: 'single', optionId: 'choice-b' } },
    });

    rerender(
      <QuestionRenderer
        question={question}
        value={{
          kind: 'multi-part',
          parts: { 'part-choice': { kind: 'single', optionId: 'choice-b' } },
        }}
        onChange={onChange}
      />,
    );
    expect(screen.getByPlaceholderText('اكتب المصطلح أو العبارة المقبولة')).toBeInTheDocument();
  });

  it('renders diagram-reading prompts through its structured parts and emits a part answer', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const question = testQuestionSchema.parse({
      ...base,
      id: 'q-render-diagram-reading',
      type: 'diagram-reading',
      prompt: [{ type: 'paragraph', text: 'اقرأ الشكل الهندسي' }],
      parts: [
        {
          id: 'diagram-point',
          type: 'single-choice',
          prompt: [{ type: 'paragraph', text: 'ما صورة النقطة؟' }],
          choices: [
            { id: 'point-a', text: 'النقطة أ' },
            { id: 'point-b', text: 'النقطة ب' },
          ],
          answerId: 'point-b',
        },
      ],
    });

    render(<QuestionRenderer question={question} value={undefined} onChange={onChange} />);
    expect(screen.getByText('اقرأ الشكل الهندسي')).toBeInTheDocument();
    expect(screen.getByText('ما صورة النقطة؟')).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'النقطة أ' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'النقطة ب' })).toBeInTheDocument();

    await user.click(screen.getByRole('radio', { name: 'النقطة ب' }));
    expect(onChange).toHaveBeenLastCalledWith({
      kind: 'multi-part',
      parts: { 'diagram-point': { kind: 'single', optionId: 'point-b' } },
    });
  });

  it('renders transformation-application prompts through its structured numeric part', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const question = testQuestionSchema.parse({
      ...base,
      id: 'q-render-transformation',
      type: 'transformation-application',
      prompt: [{ type: 'paragraph', text: 'طبّق التحويل الهندسي' }],
      parts: [
        {
          id: 'image-distance',
          type: 'numeric',
          prompt: [{ type: 'paragraph', text: 'ما إحداثي الصورة؟' }],
          answer: 4,
          unit: 'سم',
        },
      ],
    });

    render(<QuestionRenderer question={question} value={undefined} onChange={onChange} />);
    expect(screen.getByText('طبّق التحويل الهندسي')).toBeInTheDocument();
    expect(screen.getByText('ما إحداثي الصورة؟')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('اكتب القيمة العددية')).toBeInTheDocument();
    expect(screen.getByText('سم')).toBeInTheDocument();

    await user.type(screen.getByPlaceholderText('اكتب القيمة العددية'), '4');
    expect(onChange).toHaveBeenLastCalledWith({
      kind: 'multi-part',
      parts: { 'image-distance': { kind: 'numeric', raw: '4' } },
    });
  });
});
