import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';
import { isNotebookStep } from '@/components/navigation';
import { getLesson } from '@/content/registry';

/**
 * ============================================================================
 *  LESSON 14 — RENDERED-OUTPUT TESTS («ارتفاع مثلث», pages 56–58)
 * ============================================================================
 *  Renders every step through the real router and asserts on the DOM: the
 *  lesson is reachable from Unit 3 with its printed title and page range; all
 *  fifteen steps render with no missing-renderer notice and no leaked `$`;
 *  maths runs and SVG labels are LTR-isolated; the altitude lab mounts with its
 *  slider and verdict and answers to the three printed panels as presets.
 * ============================================================================
 */

const entry = getLesson('lesson-14-triangle-altitude')!;
const lesson = entry.lesson;

function renderAt(route: string) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );
}
const stepIndexOf = (stepId: string) => lesson.steps.findIndex((step) => step.id === stepId) + 1;

describe('Lesson 14 — routed into Unit 3 after Lesson 13', () => {
  it('renders the unit page with the lesson listed', () => {
    renderAt('/unit/unit-03-remarkable-lines');
    const links = screen
      .getAllByRole('link')
      .map((l) => l.getAttribute('href'))
      .filter(Boolean);
    expect(links).toContain('/lesson/lesson-14-triangle-altitude');
  });
  it('shows the printed title and page range on the lesson outline', () => {
    const { container } = renderAt('/lesson/lesson-14-triangle-altitude');
    expect(container.textContent).toContain('ارتفاع مثلث');
    expect(container.textContent).toContain('56–58');
  });
});

describe('Lesson 14 — every step renders', () => {
  it('has fifteen steps: ten from the book, four teaching steps, and the final notebook', () => {
    expect(lesson.steps).toHaveLength(15);
    expect(lesson.steps.filter((s) => s.origin === 'source')).toHaveLength(10);
    expect(lesson.steps.filter((s) => s.origin === 'authored' && !isNotebookStep(s))).toHaveLength(
      4,
    );
    expect(lesson.steps.at(-1)?.id).toBe('lesson-14-student-notebook');
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
      `/lesson/${lesson.id}/step/${stepIndexOf('l14-step-a01-orientation')}`,
    );
    expect(screen.getAllByText('شرح المنصّة').length).toBeGreaterThan(0);
    expect(authored.container.querySelector('article')!.textContent).not.toContain('المصدر: صفحة');
    authored.unmount();
    const source = renderAt(`/lesson/${lesson.id}/step/${stepIndexOf('l14-step-01-activity')}`);
    expect(source.container.textContent).toContain('المصدر: صفحة');
    source.unmount();
  });
});

describe('Lesson 14 — Arabic RTL with LTR mathematical islands', () => {
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
    const { container } = renderAt(`/lesson/${lesson.id}/step/${stepIndexOf('l14-step-03-learn')}`);
    const labels = [...container.querySelectorAll('svg text')];
    expect(labels.length).toBeGreaterThan(0);
    for (const label of labels) expect(label.closest('[dir="ltr"]')).not.toBeNull();
    expect(labels.map((n) => n.textContent)).toEqual(expect.arrayContaining(['A', 'B', 'C', 'P']));
  });
});

describe('Lesson 14 — the altitude lab', () => {
  it('mounts on its own step with its slider and its verdict', () => {
    const { container } = renderAt(`/lesson/${lesson.id}/step/${stepIndexOf('l14-step-a02-lab')}`);
    expect(container.querySelector('input[type="range"]')).not.toBeNull();
    expect(container.querySelector('[role="status"]')).not.toBeNull();
    expect(container.textContent).toContain('تتلاقى');
    expect(container.textContent).toContain('داخل المثلث');
  });
  it('answers to the three printed panels of page 57 as presets', async () => {
    const user = userEvent.setup();
    const { container } = renderAt(`/lesson/${lesson.id}/step/${stepIndexOf('l14-step-a02-lab')}`);
    const presets = [...container.querySelectorAll('button')];
    expect(presets).toHaveLength(3);
    const obtuse = presets.find((b) => b.textContent?.includes('منفرج'))!;
    await user.click(obtuse);
    expect(container.textContent).toContain('خارج المثلث');
    const right = presets.find((b) => b.textContent?.includes('قائم'))!;
    await user.click(right);
    expect(container.textContent).toContain('عند رأس الزاوية القائمة');
    const acute = presets.find((b) => b.textContent?.includes('حاد'))!;
    await user.click(acute);
    expect(container.textContent).toContain('داخل المثلث');
  });
  it('draws the orthocenter and the triangle inside the figure', () => {
    const { container } = renderAt(`/lesson/${lesson.id}/step/${stepIndexOf('l14-step-a02-lab')}`);
    const labels = [...container.querySelectorAll('svg text')].map((n) => n.textContent);
    for (const label of ['A', 'B', 'C', 'H']) expect(labels).toContain(label);
  });
});
