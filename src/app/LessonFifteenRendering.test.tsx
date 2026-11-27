import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';
import { isNotebookStep } from '@/components/navigation';
import { getLesson } from '@/content/registry';

/**
 * ============================================================================
 *  LESSON 15 — RENDERED-OUTPUT TESTS («المتوسط في المثلث», pages 59–61)
 * ============================================================================
 *  Sixteen steps (eleven printed, four authored teaching steps and the final
 *  notebook). The median lab shows the three medians, the centroid and the 2:1
 *  ratio, and the printed parallelogram panels are its presets.
 * ============================================================================
 */

const entry = getLesson('lesson-15-triangle-median')!;
const lesson = entry.lesson;

function renderAt(route: string) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );
}
const stepIndexOf = (stepId: string) => lesson.steps.findIndex((step) => step.id === stepId) + 1;

describe('Lesson 15 — routed into Unit 3 after Lesson 14', () => {
  it('renders the unit page with the lesson listed', () => {
    renderAt('/unit/unit-03-remarkable-lines');
    const links = screen
      .getAllByRole('link')
      .map((l) => l.getAttribute('href'))
      .filter(Boolean);
    expect(links).toContain('/lesson/lesson-15-triangle-median');
  });
  it('shows the printed title and page range on the lesson outline', () => {
    const { container } = renderAt('/lesson/lesson-15-triangle-median');
    expect(container.textContent).toContain('المتوسط في المثلث');
    expect(container.textContent).toContain('59–61');
  });
});

describe('Lesson 15 — every step renders', () => {
  it('has sixteen steps: eleven from the book, four teaching steps, and the final notebook', () => {
    expect(lesson.steps).toHaveLength(16);
    expect(lesson.steps.filter((s) => s.origin === 'source')).toHaveLength(11);
    expect(lesson.steps.filter((s) => s.origin === 'authored' && !isNotebookStep(s))).toHaveLength(
      4,
    );
    expect(lesson.steps.at(-1)?.id).toBe('lesson-15-student-notebook');
  });
  it('renders each step without a missing-renderer notice and without raw $ markers', () => {
    for (let step = 1; step <= lesson.steps.length; step += 1) {
      const { container, unmount } = renderAt(`/lesson/${lesson.id}/step/${step}`);
      expect(screen.queryByText('الرسم غير متاح بعد'), `step ${step}`).toBeNull();
      expect(container.textContent, `step ${step} leaks a $ delimiter`).not.toContain('$');
      expect(container.querySelector('.katex-error'), `step ${step}: bad KaTeX`).toBeNull();
      unmount();
    }
  });
  it('badges platform-written steps and prints the page on a source step', () => {
    const authored = renderAt(
      `/lesson/${lesson.id}/step/${stepIndexOf('l15-step-a01-orientation')}`,
    );
    expect(screen.getAllByText('شرح المنصّة').length).toBeGreaterThan(0);
    authored.unmount();
    const source = renderAt(`/lesson/${lesson.id}/step/${stepIndexOf('l15-step-01-meaning')}`);
    expect(source.container.textContent).toContain('المصدر: صفحة');
    source.unmount();
  });
});

describe('Lesson 15 — Arabic RTL with LTR mathematical islands', () => {
  it('renders every maths run inside a dir="ltr" island', () => {
    for (let step = 1; step <= lesson.steps.length; step += 1) {
      const { container, unmount } = renderAt(`/lesson/${lesson.id}/step/${step}`);
      for (const node of [...container.querySelectorAll('.katex')]) {
        expect(
          node.closest('[dir="ltr"]'),
          `step ${step}: maths run is not isolated`,
        ).not.toBeNull();
      }
      unmount();
    }
  });
  it('keeps the Latin point labels of the definition figure left-to-right', () => {
    const { container } = renderAt(`/lesson/${lesson.id}/step/${stepIndexOf('l15-step-05-learn')}`);
    const labels = [...container.querySelectorAll('svg text')];
    expect(labels.length).toBeGreaterThan(0);
    for (const label of labels) expect(label.closest('[dir="ltr"]')).not.toBeNull();
    expect(labels.map((n) => n.textContent)).toEqual(expect.arrayContaining(['A', 'B', 'C']));
  });
});

describe('Lesson 15 — the median lab', () => {
  it('mounts on its own step with its slider and its verdict', () => {
    const { container } = renderAt(`/lesson/${lesson.id}/step/${stepIndexOf('l15-step-a02-lab')}`);
    expect(container.querySelector('input[type="range"]')).not.toBeNull();
    expect(container.querySelector('[role="status"]')).not.toBeNull();
    expect(container.textContent).toContain('تتلاقى');
    expect(container.textContent).toContain('داخل المثلث');
  });
  it('offers the three printed parallelogram panels as presets', async () => {
    const user = userEvent.setup();
    const { container } = renderAt(`/lesson/${lesson.id}/step/${stepIndexOf('l15-step-a02-lab')}`);
    const presets = [...container.querySelectorAll('button')];
    expect(presets).toHaveLength(3);
    await user.click(presets[1]!);
    expect(container.querySelector('[role="status"]')).not.toBeNull();
  });
  it('draws the centroid and the triangle inside the figure', () => {
    const { container } = renderAt(`/lesson/${lesson.id}/step/${stepIndexOf('l15-step-a02-lab')}`);
    const labels = [...container.querySelectorAll('svg text')].map((n) => n.textContent);
    for (const label of ['A', 'B', 'C', 'G']) expect(labels).toContain(label);
  });
});
