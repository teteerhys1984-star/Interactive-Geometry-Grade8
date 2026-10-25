import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import type { InteractiveDiagram } from '@/content/schema';
import { thalesRatioLabDiagram } from '@/content/units/lesson-10-figures';
import { L10_LAB_TRIANGLES } from '@/content/units/lesson-10-geometry';
import { ThalesRatioLab } from './ThalesRatioLab';

/**
 * ============================================================================
 *  THALES RATIO LAB — Behaviour & Geometry Contract (Lesson 10)
 * ============================================================================
 *
 *  Verifies the interactive counterpart of the page-36 discovery activity:
 *    • starts at the authored parallel state (tilt 0, ratio k = 0.40) with the
 *      three equal ratios and no tilted intersection point P;
 *    • any nonzero tilt introduces P ≠ N, flips the verdict and breaks the
 *      AP/AC ratio, answering activity question 2 empirically;
 *    • the ratio slider drives the common section ratio continuously;
 *    • all three triangle presets (acute / right / obtuse) switch cleanly;
 *    • the true-parallel toggle works and no raw `$` or KaTeX errors appear;
 *    • missing optional params fall back to safe authored defaults.
 * ============================================================================
 */

const renderLab = (spec: InteractiveDiagram = thalesRatioLabDiagram) =>
  render(<ThalesRatioLab spec={spec} />);

const svgLabels = (container: HTMLElement) =>
  [...container.querySelectorAll('svg text')].map((el) => el.textContent?.trim());

describe('ThalesRatioLab', () => {
  it('renders the initial exact-parallel state (k = 0.40, tilt 0°) with three equal ratios and points A B C M N only', () => {
    const { container } = renderLab();
    expect(container.textContent).not.toContain('$');
    expect(container.querySelector('.katex-error')).toBeNull();
    expect(container.textContent).toContain('k = 0.40');
    expect(container.textContent).toContain('0^\\circ');
    expect(container.textContent).toContain('الحالة الدقيقة');
    // Three equal ratios at the authored section ratio 0.4.
    expect(container.textContent).toContain('\\frac{AM}{AB} = 0.400');
    expect(container.textContent).toContain('\\frac{AN}{AC} = 0.400');
    expect(container.textContent).toContain('\\frac{MN}{BC} = 0.400');

    const labels = svgLabels(container);
    for (const expected of ['A', 'B', 'C', 'M', 'N']) {
      expect(labels).toContain(expected);
    }
    expect(labels).not.toContain('P');
  });

  it('snaps to a tilted state via the +10° preset: P appears, the verdict flips, and AP/AC drifts away from k', () => {
    const { container } = renderLab();
    const tiltButton = screen
      .getAllByRole('button')
      .find((button) => button.textContent?.includes('+10'))!;
    expect(tiltButton).toBeDefined();

    fireEvent.click(tiltButton);
    expect(tiltButton).toHaveAttribute('aria-pressed', 'true');
    expect(container.textContent).toContain('+10^\\circ');
    expect(container.textContent).toContain('لا يوازي');
    expect(svgLabels(container)).toContain('P');

    const apCard = container.textContent!.match(/\\frac\{AP\}\{AC\} = ([0-9.]+)/);
    expect(apCard).not.toBeNull();
    expect(Number(apCard![1])).not.toBeCloseTo(0.4, 6);
  });

  it('returns to exact parallelism through the 0° preset and hides P again', () => {
    const { container } = renderLab();
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons.find((button) => button.textContent?.includes('+10'))!);
    expect(svgLabels(container)).toContain('P');

    fireEvent.click(buttons.find((button) => button.textContent?.includes('توازٍ دقيق'))!);
    expect(container.textContent).toContain('الحالة الدقيقة');
    expect(svgLabels(container)).not.toContain('P');
  });

  it('updates the common ratio live when the section slider moves', () => {
    const { container } = renderLab();
    const sliders = screen.getAllByRole('slider') as HTMLInputElement[];
    expect(sliders).toHaveLength(2);
    const ratioSlider = sliders[0]!;

    fireEvent.change(ratioSlider, { target: { value: '0.7' } });
    expect(container.textContent).toContain('k = 0.70');
    expect(container.textContent).toContain('\\frac{AM}{AB} = 0.700');
    expect(container.textContent).toContain('\\frac{AN}{AC} = 0.700');
    // Zero tilt keeps the table proportional at the new ratio.
    expect(container.textContent).toContain('الحالة الدقيقة');
  });

  it('switches across all three triangle presets while keeping the parallel verdict at zero tilt', () => {
    const { container } = renderLab();
    const triangleButtons = screen
      .getAllByRole('button')
      .filter((button) => L10_LAB_TRIANGLES.some((tri) => button.textContent?.includes(tri.label)));
    expect(triangleButtons).toHaveLength(3);

    for (const button of triangleButtons) {
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-pressed', 'true');
      expect(container.textContent).toContain('الحالة الدقيقة');
      const labels = svgLabels(container);
      expect(labels).toContain('A');
      expect(labels).not.toContain('P');
    }
  });

  it('toggles the true-parallel reference line through the checkbox without breaking the render', () => {
    renderLab();
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  it('falls back safely to the default ratio/tilt when optional params are omitted', () => {
    const minimal: InteractiveDiagram = { ...thalesRatioLabDiagram, params: {} };
    const { container } = render(<ThalesRatioLab spec={minimal} />);
    expect(container.querySelector('svg')).not.toBeNull();
    expect(container.textContent).toContain('k = 0.40');
    expect(container.textContent).toContain('الحالة الدقيقة');
  });
});
