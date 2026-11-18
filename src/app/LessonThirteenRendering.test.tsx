import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';
import { isNotebookStep } from '@/components/navigation';
import { getLesson } from '@/content/registry';

/**
 * ============================================================================
 *  LESSON 13 — RENDERED-OUTPUT TESTS («محور ضلع في المثلث»)
 * ============================================================================
 *
 *  Reading the content files is not enough: these tests render every step of
 *  Lesson 13 through the real router and assert on the DOM the student gets.
 *
 *  What is pinned here:
 *    1. The lesson is reachable from Unit 3, with its printed title and its page
 *       range shown as source.
 *    2. All sixteen steps render — ten printed, five platform teaching steps and
 *       the final Student Notebook — with no unregistered-renderer notice and no
 *       leaked `$…$` delimiter.
 *    3. Every maths run sits inside a `dir="ltr"` island, and Latin point labels
 *       inside the SVG figures are isolated the same way.
 *    4. The interactive lab (`side-bisector-lab`) is mounted on its own step, and
 *       the three printed panels of page 55 are its presets.
 *    5. Platform-written steps are badged, and a printed step names its page.
 * ============================================================================
 */

const entry = getLesson('lesson-13-side-bisector')!;
const lesson = entry.lesson;

function renderAt(route: string) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );
}

const stepIndexOf = (stepId: string) => lesson.steps.findIndex((step) => step.id === stepId) + 1;

describe('Lesson 13 — routed into Unit 3 as its first lesson', () => {
  it('renders the unit page with the lesson listed', () => {
    renderAt('/unit/unit-03-remarkable-lines');
    const links = screen
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'))
      .filter(Boolean);
    expect(links).toContain('/lesson/lesson-13-side-bisector');
    expect(screen.getAllByText(/مستقيمات مميزة في المثلث/).length).toBeGreaterThan(0);
  });

  it('shows the printed title and page range on the lesson outline', () => {
    const { container } = renderAt('/lesson/lesson-13-side-bisector');
    expect(container.textContent).toContain('محور ضلع في المثلث');
    expect(container.textContent).toContain('53–55');
  });
});

describe('Lesson 13 — every step renders', () => {
  it('has sixteen steps: ten from the book, five teaching steps, and the final authored notebook', () => {
    expect(lesson.steps).toHaveLength(16);
    expect(lesson.steps.filter((step) => step.origin === 'source')).toHaveLength(10);
    expect(lesson.steps.filter((step) => step.origin === 'authored')).toHaveLength(6);
    expect(
      lesson.steps.filter((step) => step.origin === 'authored' && !isNotebookStep(step)),
    ).toHaveLength(5);
    expect(lesson.steps.at(-1)?.id).toBe('lesson-13-student-notebook');
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
      `/lesson/${lesson.id}/step/${stepIndexOf('l13-step-a01-orientation')}`,
    );
    expect(screen.getAllByText('شرح المنصّة').length).toBeGreaterThan(0);
    expect(authored.container.querySelector('article')!.textContent).not.toContain('المصدر: صفحة');
    authored.unmount();

    const source = renderAt(`/lesson/${lesson.id}/step/${stepIndexOf('l13-step-01-opener-lines')}`);
    expect(source.container.textContent).toContain('المصدر: صفحة');
    source.unmount();
  });
});

describe('Lesson 13 — Arabic RTL with LTR mathematical islands', () => {
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

  it('keeps the Latin point labels of the printed opener figure left-to-right', () => {
    const { container } = renderAt(
      `/lesson/${lesson.id}/step/${stepIndexOf('l13-step-01-opener-lines')}`,
    );
    const labels = [...container.querySelectorAll('svg text')];
    expect(labels.length).toBeGreaterThan(0);
    for (const label of labels) {
      expect(label.closest('[dir="ltr"]')).not.toBeNull();
    }
    expect(labels.map((node) => node.textContent)).toEqual(expect.arrayContaining(['A', 'B', 'C']));
  });
});

describe('Lesson 13 — the side-bisector lab', () => {
  it('mounts on its own step with its slider, its circle toggle and its verdict', () => {
    const { container } = renderAt(`/lesson/${lesson.id}/step/${stepIndexOf('l13-step-a02-lab')}`);

    expect(container.querySelector('input[type="range"]')).not.toBeNull();
    expect(container.querySelector('input[type="checkbox"]')).not.toBeNull();
    expect(container.querySelector('[role="status"]')).not.toBeNull();
    // On the bisector MB = MC always holds, which is the printed property.
    expect(container.textContent).toContain('لذلك');
    expect(container.textContent).toContain('داخل المثلث');
  });

  it('answers to the three printed panels of page 55 as presets', async () => {
    const user = userEvent.setup();
    const { container } = renderAt(`/lesson/${lesson.id}/step/${stepIndexOf('l13-step-a02-lab')}`);

    const presets = [...container.querySelectorAll('button')];
    expect(presets).toHaveLength(3);

    const obtuse = presets.find((button) => button.textContent?.includes('منفرج'))!;
    await user.click(obtuse);
    expect(container.textContent).toContain('خارج المثلث');

    const right = presets.find((button) => button.textContent?.includes('قائم'))!;
    await user.click(right);
    expect(container.textContent).toContain('على الوتر');

    const acute = presets.find((button) => button.textContent?.includes('حاد'))!;
    await user.click(acute);
    expect(container.textContent).toContain('داخل المثلث');
  });

  it('draws the moving point, the centre and the triangle inside the figure', () => {
    const { container } = renderAt(`/lesson/${lesson.id}/step/${stepIndexOf('l13-step-a02-lab')}`);
    const labels = [...container.querySelectorAll('svg text')].map((node) => node.textContent);
    for (const label of ['A', 'B', 'C', 'M', 'O']) {
      expect(labels).toContain(label);
    }
  });
});
