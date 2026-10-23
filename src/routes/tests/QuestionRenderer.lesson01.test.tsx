import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// Side-effect import: registers the constructed diagram renderers exactly as
// App.tsx does at startup, so question figures resolve in this isolated test.
import '@/components/diagram/renderers';
import { QuestionRenderer } from './QuestionRenderer';
import { getTestEntry } from '@/tests/registry';

/**
 * ============================================================================
 *  LESSON 1 — RENDER GUARDS
 * ============================================================================
 *
 *  These tests render the REAL Lesson 1 bank through the REAL runner renderer
 *  and lock the presentation contract of the rebuilt test:
 *    • no authored `$…$` run ever reaches the learner as raw source;
 *    • every figure question actually draws its SVG scene;
 *    • the new structured interactions (true/false + correction, fill-in,
 *      diagram-reading parts, grid transformation parts) emit typed answers.
 * ============================================================================
 */

const entry = getTestEntry('lesson-01-test');
const questions = entry!.questions;

function renderQuestion(id: string) {
  const question = questions.find((item) => item.id === id);
  expect(question, `${id} must exist in the Lesson 1 bank`).toBeDefined();
  const onChange = vi.fn();
  const result = render(
    <QuestionRenderer question={question!} value={undefined} onChange={onChange} />,
  );
  return { ...result, onChange };
}

describe('Lesson 1 bank renders through the runner without raw maths source', () => {
  it.each(questions.map((question) => [question.id, question.type] as const))(
    '%s (%s) contains no raw $ delimiters and isolates its notation',
    (id) => {
      const { container } = renderQuestion(id);
      expect(container.textContent, `${id} leaks raw inline-math delimiters`).not.toContain('$');
      expect(container.querySelector('option'), `${id} must not use native options`).toBeNull();
      // Any question that authors maths must render it through KaTeX + LTR isolation.
      if (container.querySelectorAll('.katex').length > 0) {
        expect(container.querySelectorAll('[dir="ltr"]').length).toBeGreaterThan(0);
      }
    },
  );

  it.each(['geo-l01-t01-q06', 'geo-l01-t01-q07', 'geo-l01-t01-q10', 'geo-l01-t01-q15'])(
    '%s draws its authored SVG figure',
    (id) => {
      const { container } = renderQuestion(id);
      const figure = container.querySelector('svg[role="img"]');
      expect(figure, `${id} must render its test figure`).not.toBeNull();
      expect(figure!.getAttribute('aria-label')!.length).toBeGreaterThan(10);
    },
  );
});

describe('Lesson 1 structured interactions', () => {
  it('q02 — true/false with correction: the correction stays locked until «خطأ»', async () => {
    const user = userEvent.setup();
    const { container, onChange } = renderQuestion('geo-l01-t01-q02');

    // The correction part exists in the DOM but is disabled until verdict=false.
    const correctionSection = container.querySelector('section[aria-label="correction"]');
    expect(correctionSection).not.toBeNull();
    expect(within(correctionSection as HTMLElement).getAllByRole('radio')[0]).toBeDisabled();

    // Click the «خطأ» verdict. (Name-based queries are avoided here: computing
    // accessible names walks into the KaTeX/MathML of the correction choices,
    // which trips a jsdom getComputedStyle bug.)
    const khataLabel = screen.getByText('خطأ').closest('label') as HTMLElement;
    await user.click(within(khataLabel).getByRole('radio'));
    expect(onChange).toHaveBeenLastCalledWith({ kind: 'true-false-justify', value: false });
  });

  it('q02 — selecting a correction choice emits the structured sub-answer', async () => {
    const user = userEvent.setup();
    const question = questions.find((item) => item.id === 'geo-l01-t01-q02')!;
    const onChange = vi.fn();
    const { container } = render(
      <QuestionRenderer
        question={question}
        value={{ kind: 'true-false-justify', value: false }}
        onChange={onChange}
      />,
    );

    expect(screen.getByText('اختر العبارة الصحيحة:')).toBeInTheDocument();
    const correctionSection = container.querySelector(
      'section[aria-label="correction"]',
    ) as HTMLElement;
    const firstCorrection = within(correctionSection).getAllByRole('radio')[0]!;
    expect(firstCorrection).toBeEnabled();
    await user.click(firstCorrection);

    expect(onChange).toHaveBeenLastCalledWith({
      kind: 'true-false-justify',
      value: false,
      correctionId: 'fix-a',
    });
  });

  it('q05 — fill-in renders one labelled field per property and emits typed values', () => {
    const { container, onChange } = renderQuestion('geo-l01-t01-q05');

    const inputs = container.querySelectorAll('input[type="text"]');
    expect(inputs).toHaveLength(4);

    fireEvent.change(inputs[0]!, { target: { value: 'الأطوال' } });
    expect(onChange).toHaveBeenLastCalledWith({
      kind: 'fill-in',
      values: { 'b-lengths': 'الأطوال' },
    });
  });

  it('q06 — diagram-reading shows three scored parts over its figure', () => {
    const { container } = renderQuestion('geo-l01-t01-q06');
    expect(container.querySelector('svg[role="img"]')).not.toBeNull();
    expect(screen.getAllByText('1 درجة')).toHaveLength(3);
  });

  it('q15 — transformation-application shows four numeric coordinate fields', async () => {
    const user = userEvent.setup();
    const { container, onChange } = renderQuestion('geo-l01-t01-q15');

    const numericInputs = container.querySelectorAll('input[inputmode="decimal"]');
    expect(numericInputs).toHaveLength(4);

    await user.type(numericInputs[0]!, '6');
    expect(onChange).toHaveBeenLastCalledWith({
      kind: 'multi-part',
      parts: { 'p-x1': { kind: 'numeric', raw: '6' } },
    });
  });

  it('q19 — justification renders three independent reasoning steps', () => {
    renderQuestion('geo-l01-t01-q19');
    expect(
      screen.getByText('أولاً: هل يضمن تساوي المساحة والمحيط أن يكون الشكلان متطابقين؟'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'ثانياً: إذا كان الشكلان متطابقين، فهل يلزم أن يوجد انسحاب ينقل أحدهما إلى الآخر؟',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('الخلاصة: ما الحكم النهائي على ادعاء التلميذ؟')).toBeInTheDocument();
  });

  it('q16 — error-analysis keeps its flawed steps visible and adds correction + reason', () => {
    const { container } = renderQuestion('geo-l01-t01-q16');
    expect(screen.getByText(/بما أن الأطوال والزوايا محفوظة/)).toBeInTheDocument();
    expect(screen.getByText('اختر العبارة التي تصحّح الحل المعروض:')).toBeInTheDocument();
    expect(
      screen.getByText('لماذا لا يكفي حفظ الأطوال والزوايا للحكم بأن الحركة انسحاب؟'),
    ).toBeInTheDocument();
    expect(container.querySelector('section[aria-label="correction"]')).not.toBeNull();
    expect(container.querySelector('section[aria-label="justification"]')).not.toBeNull();
  });
});
