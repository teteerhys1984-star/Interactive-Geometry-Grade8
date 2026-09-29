import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';
import { getLesson } from '@/content/registry';

/**
 * ============================================================================
 *  LESSON 2 — RENDERED-OUTPUT TESTS
 * ============================================================================
 *
 *  Reading the content files is not enough: these tests render every step of
 *  Lesson 2 through the real router and assert on the DOM the student gets.
 *
 *  What is pinned here:
 *    1. Every step renders, with no unregistered-renderer defect notice.
 *    2. No `$…$` delimiter ever leaks into visible text — i.e. all notation
 *       went through <Math>, which is the component that isolates it.
 *    3. Every maths run is inside an element with dir="ltr", so the Unicode
 *       bidi algorithm cannot reorder point names inside Arabic sentences.
 *    4. Latin point labels inside SVG figures are isolated the same way.
 *    5. The lesson flow ends in the final assessment, which never shows the
 *       teacher explanations.
 * ============================================================================
 */

const entry = getLesson('lesson-02-image-of-a-point')!;
const lesson = entry.lesson;

function renderAt(route: string) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );
}

describe('Lesson 2 — every step renders', () => {
  it('has eighteen steps: eleven from the book, seven from the platform', () => {
    expect(lesson.steps).toHaveLength(18);
    expect(lesson.steps.filter((step) => step.origin === 'source')).toHaveLength(11);
    expect(lesson.steps.filter((step) => step.origin === 'authored')).toHaveLength(7);
  });

  it('renders each step without a missing-renderer notice and without raw $ markers', () => {
    for (let step = 1; step <= lesson.steps.length; step += 1) {
      const { container, unmount } = renderAt(`/lesson/${lesson.id}/step/${step}`);
      expect(screen.queryByText('الرسم غير متاح بعد'), `step ${step}`).toBeNull();
      expect(container.textContent, `step ${step} leaks a $ delimiter`).not.toContain('$');
      unmount();
    }
  });

  it('badges platform-written steps so the book is never confused with our explanation', () => {
    const authoredIndex = lesson.steps.findIndex((step) => step.origin === 'authored') + 1;
    renderAt(`/lesson/${lesson.id}/step/${authoredIndex}`);
    expect(screen.getAllByText('شرح المنصّة').length).toBeGreaterThan(0);
  });

  it('shows the printed page on a source step and no page on an authored one', () => {
    const sourceIndex = lesson.steps.findIndex((step) => step.origin === 'source') + 1;
    const { container, unmount } = renderAt(`/lesson/${lesson.id}/step/${sourceIndex}`);
    expect(container.textContent).toContain('المصدر: صفحة');
    unmount();

    const authoredIndex = lesson.steps.findIndex((step) => step.origin === 'authored') + 1;
    const authored = renderAt(`/lesson/${lesson.id}/step/${authoredIndex}`);
    expect(authored.container.querySelector('article')!.textContent).not.toContain('المصدر: صفحة');
  });
});

describe('Lesson 2 — Arabic RTL with LTR mathematical islands', () => {
  it('renders every maths run inside a dir="ltr" island', () => {
    for (let step = 1; step <= lesson.steps.length; step += 1) {
      const { container, unmount } = renderAt(`/lesson/${lesson.id}/step/${step}`);
      const katexNodes = [...container.querySelectorAll('.katex')];
      for (const node of katexNodes) {
        expect(
          node.closest('[dir="ltr"]'),
          `step ${step}: maths run is not isolated`,
        ).not.toBeNull();
      }
      unmount();
    }
  });

  it('isolates the notation of the definition, keeping the point order intact', () => {
    const index = lesson.steps.findIndex((step) => step.id === 'step-03-definition') + 1;
    const { container } = renderAt(`/lesson/${lesson.id}/step/${index}`);

    const runs = [...container.querySelectorAll('[dir="ltr"]')].map((node) =>
      node.textContent?.replace(/\s+/g, ''),
    );
    // ABM'M must survive as one left-to-right run, in this order.
    expect(runs.some((run) => run?.includes('ABM′M') || run?.includes("ABM'M"))).toBe(true);
  });

  it('keeps Latin labels inside figures left-to-right', () => {
    const index = lesson.steps.findIndex((step) => step.id === 'step-11-practice-3') + 1;
    const { container } = renderAt(`/lesson/${lesson.id}/step/${index}`);
    const labels = [...container.querySelectorAll('svg text')];
    expect(labels.length).toBeGreaterThan(0);
    for (const label of labels) {
      // Figures render inside a canvas that is itself dir="ltr" isolated.
      expect(label.closest('[dir="ltr"]')).not.toBeNull();
    }
    expect(labels.map((node) => node.textContent)).toContain("Q'");
  });

  it('renders the reproduced page 8 grid, not a «راجع الكتاب» placeholder', () => {
    const index =
      lesson.steps.findIndex((step) => step.id === 'step-01-activity-squared-paper') + 1;
    const { container } = renderAt(`/lesson/${lesson.id}/step/${index}`);
    const labels = [...container.querySelectorAll('svg text')].map((node) => node.textContent);
    expect(labels).toEqual(expect.arrayContaining(['A', 'B', 'P', 'M', 'N']));
  });
});

describe('Lesson 2 — interactive teaching figures', () => {
  it('lets the student step through the compass construction', async () => {
    const user = userEvent.setup();
    const index = lesson.steps.findIndex((step) => step.id === 'teach-05-compass-step-by-step') + 1;
    renderAt(`/lesson/${lesson.id}/step/${index}`);

    const next = screen.getAllByRole('button', { name: 'الخطوة التالية' })[0]!;
    expect(next).toBeEnabled();
    await user.click(next);
    expect(screen.getAllByText(/الدائرة الأولى/).length).toBeGreaterThan(0);
  });

  it('updates the draggable model when M is moved onto the line', async () => {
    const user = userEvent.setup();
    const index = lesson.steps.findIndex((step) => step.id === 'teach-03-why-a-parallelogram') + 1;
    renderAt(`/lesson/${lesson.id}/step/${index}`);

    const status = screen.getByRole('status');
    expect(status.textContent).toContain('الحالة العامة');

    const handle = screen.getByRole('slider');
    handle.focus();
    // A = (2,2), B = (6,3), M starts at (3,5): three steps down puts M at (3,2)…
    await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}');
    expect(screen.getByRole('status').textContent).toContain('الحالة العامة');
    // …and (2,2) is A itself, which lies on (AB).
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('status').textContent).toContain('الحالة الخاصة');
  });
});

describe('Lesson 2 — final assessment', () => {
  it('flows from the last step into the assessment', () => {
    renderAt(`/lesson/${lesson.id}/step/${lesson.steps.length}`);
    const nav = screen.getByRole('navigation', { name: 'التنقّل بين الخطوات' });
    expect(within(nav).getByText('الاختبار النهائي')).toBeInTheDocument();
  });

  it('asks twelve questions and hides every teacher explanation', () => {
    const { container } = renderAt(`/assessment/${lesson.assessment!.id}`);
    expect(lesson.assessment!.questions).toHaveLength(12);
    expect(container.textContent).not.toContain('الإجابة الصحيحة:');
    expect(container.textContent).not.toContain('خطأ شائع');
  });
});
