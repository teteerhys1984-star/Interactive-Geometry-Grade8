import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  casesLabDiagram,
  fig17Cases,
  fig18Asa,
  fig18Sas,
  fig18Sss,
  fig19Check,
  fig19Isosceles,
  fig19Kite,
  fig19Pairs,
  kiteLabDiagram,
  practicePairsDiagram,
  proofLabDiagram,
  teacherActivityFigure,
  teacherCheckFigure,
  teacherIsoscelesFigure,
  teacherKiteFigure,
} from '@/content/units/lesson-04-figures';
import {
  CaseJustifyLab,
  CongruenceCasesLab,
  CongruenceFigure,
  CongruenceProofLab,
  KitePairLab,
} from './index';

/**
 * ============================================================================
 *  LESSON 4 — render smoke tests (jsdom)
 * ============================================================================
 *
 *  Geometry can be arithmetically right and still render an empty box: the
 *  reader can reject a spec, the projection can divide by zero, a class map can
 *  resolve to `undefined`. These tests therefore render the REAL diagrams and
 *  count the SVG they actually produce.
 *
 *  This is not a substitute for looking at the page — jsdom does no layout and
 *  no paint — but it does prove every figure emits visible geometry and every
 *  lab emits its controls. The visual check limitation is recorded in
 *  docs/LESSON-04-FIGURES.md.
 * ============================================================================
 */

const constructed = {
  fig17Cases,
  fig18Sas,
  fig18Asa,
  fig18Sss,
  fig19Check,
  fig19Kite,
  fig19Pairs,
  fig19Isosceles,
  teacherActivityFigure,
  teacherCheckFigure,
  teacherKiteFigure,
  teacherIsoscelesFigure,
};

/** Elements that actually draw something on screen. */
function drawnShapes(container: HTMLElement) {
  return container.querySelectorAll('svg line, svg polyline, svg polygon, svg path, svg text');
}

describe('every Lesson 4 figure draws visible geometry', () => {
  it.each(Object.entries(constructed))('%s', (name, spec) => {
    const { container, unmount } = render(<CongruenceFigure spec={spec} />);
    const svg = container.querySelector('svg');
    expect(svg, `${name}: no svg`).not.toBeNull();
    // A figure always carries its alt text as the accessible name.
    expect(screen.getByRole('img').getAttribute('aria-label')!.length).toBeGreaterThan(10);
    // ... and real ink: a triangle alone is 3 sides + 3 letters.
    expect(drawnShapes(container).length, `${name}: nothing drawn`).toBeGreaterThanOrEqual(3);
    // Labels must never be blank: a missing letter would silently mislabel a
    // vertex, which is the worst possible failure for a congruence figure.
    for (const label of Array.from(container.querySelectorAll('svg text'))) {
      expect(label.textContent?.trim().length ?? 0, `${name}: blank label`).toBeGreaterThan(0);
    }
    unmount();
  });

  it('draws the activity panels inside labelled frames ① ② ③', () => {
    const { container, unmount } = render(<CongruenceFigure spec={fig17Cases} />);
    const texts = Array.from(container.querySelectorAll('svg text')).map((node) => node.textContent);
    for (const marker of ['①', '②', '③']) expect(texts).toContain(marker);
    // N and M are printed under every panel of the activity.
    expect(texts.filter((text) => text === 'N').length).toBe(3);
    expect(texts.filter((text) => text === 'M').length).toBe(3);
    unmount();
  });

  it('draws the kite with its printed measures', () => {
    const { container, unmount } = render(<CongruenceFigure spec={fig19Kite} />);
    const texts = Array.from(container.querySelectorAll('svg text')).map(
      (node) => node.textContent ?? '',
    );
    for (const value of ['14.4', '10', '12', '8', '6']) {
      expect(texts.some((text) => text.includes(value)), `kite: missing ${value}`).toBe(true);
    }
    unmount();
  });
});

describe('«مختبر الحالات» walks the printed activity in order', () => {
  it('starts on the given data of case ① and offers all three cases', () => {
    render(<CongruenceCasesLab spec={casesLabDiagram} />);
    const caseTabs = screen.getByRole('group', { name: 'حالات التطابق المطبوعة' });
    expect(within(caseTabs).getAllByRole('button')).toHaveLength(3);
    expect(within(caseTabs).getAllByRole('button')[0]).toHaveAttribute('aria-pressed', 'true');
    const stages = screen.getByRole('group', { name: 'مراحل البناء' });
    expect(within(stages).getAllByRole('button')).toHaveLength(3);
    // Nothing is measured before the student asks for the image.
    expect(screen.queryByRole('status')).toBeNull();
  });

  it('reports equal sides and equal angles once the image is drawn', async () => {
    const user = userEvent.setup();
    render(<CongruenceCasesLab spec={casesLabDiagram} />);
    await user.click(screen.getByRole('button', { name: /الصورة وفق الانسحاب/ }));
    const status = screen.getByRole('status');
    // All three side pairs agree to the printed precision.
    expect(status.textContent).toContain('AB');
    expect(status.textContent).toContain("A′");
    expect(status.textContent).not.toMatch(/✗|غير متساو/);
  });

  it('switches to the unfinished case ② and resets to its givens', async () => {
    const user = userEvent.setup();
    render(<CongruenceCasesLab spec={casesLabDiagram} />);
    await user.click(screen.getByRole('button', { name: /ضلع وزاويتان مجاورتان/ }));
    // The note states the printed data of that case, so the student cannot
    // mistake the two open rays for a finished triangle.
    expect(screen.getByText(/الزاويتان المجاورتان له/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /1 المعطيات المطبوعة/ })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });
});

describe('the two justification labs never leak an answer', () => {
  it.each([
    ['تدرّب ②', practicePairsDiagram, CaseJustifyLab, 3],
    ['برهان ③', proofLabDiagram, CongruenceProofLab, 4],
  ] as const)('%s', (_name, diagram, Lab, taskCount) => {
    const { container, unmount } = render(<Lab spec={diagram} />);
    expect(container.querySelectorAll('fieldset')).toHaveLength(taskCount);
    // No verdict before review: the review button is disabled until every task
    // is answered, and no explanation is on screen.
    const review = screen.getByRole('button', { name: /راجع/ });
    expect(review).toBeDisabled();
    expect(container.textContent).not.toContain('حصيلة المراجعة');
    unmount();
  });

  it('unlocks the review only after every task is answered', async () => {
    const user = userEvent.setup();
    render(<CaseJustifyLab spec={practicePairsDiagram} />);
    const radios = screen.getAllByRole('radio');
    const review = screen.getByRole('button', { name: /راجع أجوبتي/ });
    expect(review).toBeDisabled();

    // One answer per fieldset: the first option of each task.
    const fieldsets = screen.getAllByRole('group');
    for (const group of fieldsets) {
      const first = within(group).getAllByRole('radio')[0]!;
      await user.click(first);
    }
    expect(radios.length).toBeGreaterThanOrEqual(9);
    expect(screen.getByRole('button', { name: /راجع أجوبتي/ })).toBeEnabled();

    await user.click(screen.getByRole('button', { name: /راجع أجوبتي/ }));
    expect(screen.getByText(/حصيلة المراجعة/)).toBeInTheDocument();
  });
});

describe('the kite lab reviews a whole selection at once', () => {
  it('keeps the review disabled until something is selected, then explains each pair', async () => {
    const user = userEvent.setup();
    render(<KitePairLab spec={kiteLabDiagram} />);
    const review = screen.getByRole('button', { name: 'راجع اختياري' });
    expect(review).toBeDisabled();
    expect(screen.queryByText('المراجعة:')).toBeNull();

    await user.click(screen.getAllByRole('checkbox')[0]!);
    expect(screen.getByRole('button', { name: 'راجع اختياري' })).toBeEnabled();
    await user.click(screen.getByRole('button', { name: 'راجع اختياري' }));

    // The review is one block: the score, the verdict + reason for every
    // SELECTED pair, and the full list of correct pairs.
    expect(screen.getAllByText(/المراجعة:/)).toHaveLength(1);
    expect(screen.getByText(/من الأزواج الصحيحة/)).toBeInTheDocument();
    expect(screen.getByText(/الأزواج الصحيحة هي/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'أعد المحاولة' })).toBeInTheDocument();
  });
});
