import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';
import { getLesson } from '@/content/registry';

/**
 * ============================================================================
 *  LESSON 11 — RENDERED-OUTPUT TESTS («تساوي ثلاث نسب»)
 * ============================================================================
 *
 *  Reading the content files is not enough: these tests render every step of
 *  Lesson 11 through the real router and assert on the DOM the student gets.
 *
 *  What is pinned here:
 *    1. The lesson is reachable from the unit it belongs to, with its printed
 *       title and its page range shown as source.
 *    2. All fourteen steps render — eight printed, six platform-authored — with
 *       no unregistered-renderer notice and no leaked `$…$` delimiter.
 *    3. Every maths run sits inside a `dir="ltr"` island, and Latin point
 *       labels inside the SVG figures are isolated the same way.
 *    4. The interactive lab (`three-ratios-lab`) is mounted on its own step and
 *       answers to the keyboard-accessible controls it advertises.
 *    5. Platform-written steps are badged, and a printed step names its page.
 * ============================================================================
 */

const entry = getLesson('lesson-11-three-ratios')!;
const lesson = entry.lesson;

function renderAt(route: string) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );
}

const stepIndexOf = (stepId: string) => lesson.steps.findIndex((step) => step.id === stepId) + 1;

describe('Lesson 11 — routed into Unit 2 as the final lesson', () => {
  it('renders the unit page with the lesson listed after Lessons 1–3', () => {
    renderAt('/unit/unit-02-triangles-midpoints-parallels');
    const links = screen
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'))
      .filter(Boolean);
    expect(links).toContain('/lesson/lesson-11-three-ratios');
    expect(screen.getAllByText(/تساوي ثلاث نسب/).length).toBeGreaterThan(0);
  });

  it('shows the printed title and page range on the lesson outline', () => {
    const { container } = renderAt('/lesson/lesson-11-three-ratios');
    expect(container.textContent).toContain('تساوي ثلاث نسب');
    expect(container.textContent).toContain('39–41');
  });
});

describe('Lesson 11 — every step renders', () => {
  it('has fourteen steps: eight from the book, six from the platform', () => {
    expect(lesson.steps).toHaveLength(14);
    expect(lesson.steps.filter((step) => step.origin === 'source')).toHaveLength(8);
    expect(lesson.steps.filter((step) => step.origin === 'authored')).toHaveLength(6);
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
      `/lesson/${lesson.id}/step/${stepIndexOf('l11-step-a01-orientation')}`,
    );
    expect(screen.getAllByText('شرح المنصّة').length).toBeGreaterThan(0);
    expect(authored.container.querySelector('article')!.textContent).not.toContain('المصدر: صفحة');
    authored.unmount();

    const source = renderAt(`/lesson/${lesson.id}/step/${stepIndexOf('l11-step-01-activity')}`);
    expect(source.container.textContent).toContain('المصدر: صفحة');
    source.unmount();
  });
});

describe('Lesson 11 — Arabic RTL with LTR mathematical islands', () => {
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

  it('keeps the printed ratio and the Latin point labels left-to-right', () => {
    const { container } = renderAt(
      `/lesson/${lesson.id}/step/${stepIndexOf('l11-step-01-activity')}`,
    );
    const runs = [...container.querySelectorAll('[dir="ltr"]')].map((node) =>
      node.textContent?.replace(/\s+/g, ''),
    );
    // The page-39 claim AM/AB = 2/3 keeps its order inside the Arabic sentence.
    expect(runs.some((run) => run?.includes('AMAB=23'))).toBe(true);

    const labels = [...container.querySelectorAll('svg text')];
    expect(labels.length).toBeGreaterThan(0);
    for (const label of labels) {
      expect(label.closest('[dir="ltr"]')).not.toBeNull();
    }
    expect(labels.map((node) => node.textContent)).toEqual(
      expect.arrayContaining(['A', 'B', 'C', 'M', 'N']),
    );
  });
});

describe('Lesson 11 — the three-ratio lab', () => {
  it('mounts on its own step and answers to the printed-ratio preset', async () => {
    const user = userEvent.setup();
    const { container } = renderAt(`/lesson/${lesson.id}/step/${stepIndexOf('l11-step-a02-lab')}`);

    // The page owns its own live regions, so the lab's verdict is read from the
    // step body rather than through getByRole('status').
    const slider = container.querySelector('input[type="range"]');
    expect(slider).not.toBeNull();
    expect(container.querySelector('[role="status"]')).not.toBeNull();
    expect(container.textContent).toContain('تتحقّق الحالات الخمس');

    // Query by text rather than accessible name: the label contains a KaTeX
    // run, and jsdom's accessible-name computation cannot measure it.
    const halfPreset = [...container.querySelectorAll('button')].find((button) =>
      button.textContent?.includes('حالة المنتصفين'),
    )!;
    await user.click(halfPreset);
    expect(container.textContent).toContain('k = 0.500');
    expect(container.textContent).toContain('تختلّ الحالات الأخرى');
    for (const label of ['A', 'B', 'C', 'J', 'M', 'N']) {
      expect([...container.querySelectorAll('svg text')].map((node) => node.textContent)).toContain(
        label,
      );
    }
  });
});
