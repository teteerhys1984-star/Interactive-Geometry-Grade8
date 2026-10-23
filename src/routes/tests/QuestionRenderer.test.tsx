import { describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QuestionRenderer } from './QuestionRenderer';
import { questionsById } from '@/tests/registry';
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

  it('renders matching targets as rich text, never as raw $…$ inside a native select', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const question = testQuestionSchema.parse({
      ...base,
      id: 'q-render-matching',
      type: 'matching',
      prompt: [{ type: 'paragraph', text: 'طابق كل عنصر مع نظيره' }],
      left: [
        { id: 'l-seg', text: 'قطعة مستقيمة $[AB]$ طولها $d$' },
        { id: 'l-ang', text: 'زاوية قياسها $60^\\circ$' },
      ],
      right: [
        { id: 'r-seg', text: "قطعة مستقيمة $[A'B']$ توازيها وطولها $d$" },
        { id: 'r-ang', text: 'زاوية صورتها قياسها $60^\\circ$' },
      ],
      pairs: { 'l-seg': 'r-seg', 'l-ang': 'r-ang' },
    });

    const { container } = render(
      <QuestionRenderer question={question} value={undefined} onChange={onChange} />,
    );

    // The regression this guards: a native <select> cannot hold KaTeX, so the
    // right column used to leak raw LaTeX source like "$[A'B']$" to learners.
    expect(container.querySelector('select')).toBeNull();
    expect(container.textContent).not.toContain('$');
    expect(container.querySelectorAll('.katex').length).toBeGreaterThan(0);

    // Every target is a real radio inside a row radiogroup labelled by its left item.
    const rows = screen.getAllByRole('radiogroup');
    expect(rows).toHaveLength(2);
    expect(rows[0]!.getAttribute('aria-label')).toContain('قطعة مستقيمة');
    expect(within(rows[0]!).getAllByRole('radio')).toHaveLength(2);

    // Choosing a target emits the structured matching answer for that row only.
    const secondTargetOfFirstRow = within(rows[0]!).getAllByRole('radio')[1]!;
    await user.click(secondTargetOfFirstRow);
    expect(onChange).toHaveBeenLastCalledWith({ kind: 'matching', pairs: { 'l-seg': 'r-ang' } });
  });

  it('renders the real Lesson 1 matching question with isolated maths in both columns', () => {
    const question = questionsById.get('geo-l01-t01-q11');
    expect(question, 'Lesson 1 bank must keep its audited matching question').toBeDefined();

    const { container } = render(
      <QuestionRenderer question={question!} value={undefined} onChange={vi.fn()} />,
    );

    expect(container.textContent).not.toContain('$');
    expect(container.textContent).not.toContain('$60');
    expect(container.querySelector('select')).toBeNull();
    // Left column (3 items) + right targets (3 per row) all pass through KaTeX.
    expect(container.querySelectorAll('.katex').length).toBeGreaterThanOrEqual(6);
    // Every maths run stays LTR-isolated inside the RTL page.
    expect(container.querySelectorAll('[dir="ltr"]').length).toBeGreaterThan(0);
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
