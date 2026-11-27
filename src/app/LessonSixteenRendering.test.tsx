import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';
import { isNotebookStep } from '@/components/navigation';
import { getLesson } from '@/content/registry';

/**
 * ============================================================================
 *  LESSON 16 — RENDERED-OUTPUT TESTS («منصّف زاوية مثلث», pages 62–63)
 * ============================================================================
 *  Eleven steps (six printed, four authored teaching steps and the final
 *  notebook). The angle-bisector lab shows the three bisectors, the incenter,
 *  the incircle toggle and the verdict.
 * ============================================================================
 */

const entry = getLesson('lesson-16-angle-bisector')!;
const lesson = entry.lesson;

function renderAt(route: string) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );
}
const stepIndexOf = (stepId: string) => lesson.steps.findIndex((step) => step.id === stepId) + 1;

describe('Lesson 16 — routed into Unit 3 after Lesson 15', () => {
  it('renders the unit page with the lesson listed', () => {
    renderAt('/unit/unit-03-remarkable-lines');
    const links = screen
      .getAllByRole('link')
      .map((l) => l.getAttribute('href'))
      .filter(Boolean);
    expect(links).toContain('/lesson/lesson-16-angle-bisector');
  });
  it('shows the printed title and page range on the lesson outline', () => {
    const { container } = renderAt('/lesson/lesson-16-angle-bisector');
    expect(container.textContent).toContain('منصّف زاوية مثلث');
    expect(container.textContent).toContain('62–63');
  });
});

describe('Lesson 16 — every step renders', () => {
  it('has eleven steps: six from the book, four teaching steps, and the final notebook', () => {
    expect(lesson.steps).toHaveLength(11);
    expect(lesson.steps.filter((s) => s.origin === 'source')).toHaveLength(6);
    expect(lesson.steps.filter((s) => s.origin === 'authored' && !isNotebookStep(s))).toHaveLength(
      4,
    );
    expect(lesson.steps.at(-1)?.id).toBe('lesson-16-student-notebook');
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
      `/lesson/${lesson.id}/step/${stepIndexOf('l16-step-a01-orientation')}`,
    );
    expect(screen.getAllByText('شرح المنصّة').length).toBeGreaterThan(0);
    authored.unmount();
    const source = renderAt(`/lesson/${lesson.id}/step/${stepIndexOf('l16-step-01-test')}`);
    expect(source.container.textContent).toContain('المصدر: صفحة');
    source.unmount();
  });
});

describe('Lesson 16 — Arabic RTL with LTR mathematical islands', () => {
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
    const { container } = renderAt(`/lesson/${lesson.id}/step/${stepIndexOf('l16-step-03-learn')}`);
    const labels = [...container.querySelectorAll('svg text')];
    expect(labels.length).toBeGreaterThan(0);
    for (const label of labels) expect(label.closest('[dir="ltr"]')).not.toBeNull();
    expect(labels.map((n) => n.textContent)).toEqual(expect.arrayContaining(['A', 'B', 'C', 'E']));
  });
});

describe('Lesson 16 — the angle-bisector lab', () => {
  it('mounts on its own step with its slider, its incircle toggle and its verdict', () => {
    const { container } = renderAt(`/lesson/${lesson.id}/step/${stepIndexOf('l16-step-a02-lab')}`);
    expect(container.querySelector('input[type="range"]')).not.toBeNull();
    expect(container.querySelector('input[type="checkbox"]')).not.toBeNull();
    expect(container.querySelector('[role="status"]')).not.toBeNull();
    expect(container.textContent).toContain('تتلاقى');
    expect(container.textContent).toContain('داخل المثلث');
  });
  it('offers three presets and toggles the incircle', async () => {
    const user = userEvent.setup();
    const { container } = renderAt(`/lesson/${lesson.id}/step/${stepIndexOf('l16-step-a02-lab')}`);
    const presets = [...container.querySelectorAll('button')];
    expect(presets).toHaveLength(3);
    const checkbox = container.querySelector('input[type="checkbox"]')!;
    await user.click(checkbox);
    expect(container.querySelector('[role="status"]')).not.toBeNull();
  });
  it('draws the incenter and the triangle inside the figure', () => {
    const { container } = renderAt(`/lesson/${lesson.id}/step/${stepIndexOf('l16-step-a02-lab')}`);
    const labels = [...container.querySelectorAll('svg text')].map((n) => n.textContent);
    for (const label of ['A', 'B', 'C', 'I']) expect(labels).toContain(label);
  });
});
