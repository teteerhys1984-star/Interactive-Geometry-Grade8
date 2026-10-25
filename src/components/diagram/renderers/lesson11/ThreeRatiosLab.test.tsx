import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import type { InteractiveDiagram } from '@/content/schema';
import { threeRatiosLabDiagram } from '@/content/units/lesson-11-figures';
import { L11_LAB_TRIANGLES } from '@/content/units/lesson-11-geometry';
import { ThreeRatiosLab } from './ThreeRatiosLab';

/**
 * ============================================================================
 *  THREE-RATIO LAB — Behaviour & Geometry Contract (Lesson 11)
 * ============================================================================
 *
 *  Verifies the interactive counterpart of the page-39 activity:
 *    • it opens at the printed ratio k = 2/3, where all five printed
 *      conclusions hold and the verdict announces the textbook case;
 *    • moving the slider to another ratio keeps (MN) ∥ (BC), J's midpoint and
 *      the parallelogram, and drops exactly the conclusions that belong to
 *      2/3 (P, N's midpoint, the equal thirds);
 *    • the k = 1/2 preset reproduces Lesson 1's midpoint case;
 *    • the auxiliary-points toggle hides/shows I, J, P, R, S;
 *    • all three triangle presets switch cleanly;
 *    • no raw `$` and no KaTeX error anywhere, and missing params fall back.
 * ============================================================================
 */

const renderLab = (spec: InteractiveDiagram = threeRatiosLabDiagram) =>
  render(<ThreeRatiosLab spec={spec} />);

const svgLabels = (container: HTMLElement) =>
  [...container.querySelectorAll('svg text')].map((el) => el.textContent?.trim());

const buttonByText = (text: string) =>
  screen.getAllByRole('button').find((button) => button.textContent?.includes(text))!;

describe('ThreeRatiosLab', () => {
  it('opens at the printed ratio k = 2/3, where every printed conclusion holds', () => {
    const { container } = renderLab();
    expect(container.textContent).not.toContain('$');
    expect(container.querySelector('.katex-error')).toBeNull();
    expect(container.textContent).toContain('k = 0.667');
    expect(container.textContent).toContain('نسبة الكتاب');
    // The verdict announces the printed case rather than the generic one.
    expect(container.textContent).toContain('تتحقّق الحالات الخمس');
    expect(container.textContent).toContain('\\frac{AM}{AB} = 0.667');
    expect(container.textContent).toContain('\\frac{AN}{AC} = 0.667');
    expect(container.textContent).toContain('\\frac{MN}{BC} = 0.667');
    expect(container.textContent).toContain('\\frac{BS}{BC} = 0.667');

    // Exactly one ratio preset is active: the printed 2/3.
    expect(buttonByText('نسبة الكتاب')).toHaveAttribute('aria-pressed', 'true');
    expect(buttonByText('حالة المنتصفين')).toHaveAttribute('aria-pressed', 'false');

    const labels = svgLabels(container);
    for (const expected of ['A', 'B', 'C', 'I', 'J', 'M', 'N', 'P', 'R', 'S']) {
      expect(labels).toContain(expected);
    }
    // All five fact rows report the positive verdict.
    expect(screen.getAllByText('يتحقّق')).toHaveLength(5);
    expect(screen.queryAllByText('لا يتحقّق')).toHaveLength(0);
  });

  it('drops exactly the 2/3-specific conclusions once the ratio moves, keeping the three that hold for every k', () => {
    const { container } = renderLab();
    const slider = container.querySelector('input[type="range"]') as HTMLInputElement;
    fireEvent.change(slider, { target: { value: '0.5' } });

    expect(container.textContent).toContain('k = 0.500');
    expect(container.textContent).not.toContain('تتحقّق الحالات الخمس');
    expect(container.textContent).toContain('تختلّ الحالات الأخرى');
    expect(container.textContent).toContain('\\frac{AM}{AB} = 0.500');
    expect(container.textContent).toContain('\\frac{AN}{AC} = 0.500');
    expect(container.textContent).toContain('\\frac{MN}{BC} = 0.500');

    // Exactly two of the five rows still hold: J's midpoint and the parallelogram.
    expect(screen.getAllByText('يتحقّق')).toHaveLength(2);
    expect(screen.getAllByText('لا يتحقّق')).toHaveLength(3);
    // The base ratio 0.500 is no longer the printed 2/3.
    expect(container.textContent).toContain('\\frac{BS}{BC} = 0.500');
  });

  it('returns to the printed case through the k = 2/3 preset and repaints the equal thirds', () => {
    const { container } = renderLab();
    const slider = container.querySelector('input[type="range"]') as HTMLInputElement;
    fireEvent.change(slider, { target: { value: '0.8' } });
    expect(screen.getAllByText('لا يتحقّق')).toHaveLength(3);

    const printed = buttonByText('نسبة الكتاب');
    fireEvent.click(printed);
    expect(printed).toHaveAttribute('aria-pressed', 'true');
    expect(container.textContent).toContain('تتحقّق الحالات الخمس');
    expect(screen.getAllByText('يتحقّق')).toHaveLength(5);
    expect(container.textContent).toContain('\\frac{BS}{BC} = 0.667');
  });

  it('reproduces Lesson 1’s midpoint case through the k = 1/2 preset', () => {
    const { container } = renderLab();
    const half = buttonByText('حالة المنتصفين');
    fireEvent.click(half);
    expect(half).toHaveAttribute('aria-pressed', 'true');
    expect(container.textContent).toContain('k = 0.500');
    // At k = 1/2 the two midpoints on the transversal still hold, the thirds do not.
    expect(screen.getAllByText('يتحقّق')).toHaveLength(2);
  });

  it('hides and restores the five auxiliary points with the toggle', () => {
    const { container } = renderLab();
    const toggle = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(toggle.checked).toBe(true);
    expect(svgLabels(container)).toContain('J');

    fireEvent.click(toggle);
    expect(toggle.checked).toBe(false);
    const labels = svgLabels(container);
    for (const hidden of ['I', 'J', 'P', 'R', 'S']) {
      expect(labels).not.toContain(hidden);
    }
    for (const kept of ['A', 'B', 'C', 'M', 'N']) {
      expect(labels).toContain(kept);
    }
    // The measurement panel is independent of the drawing.
    expect(screen.getAllByText('يتحقّق')).toHaveLength(5);

    fireEvent.click(toggle);
    expect(svgLabels(container)).toContain('S');
  });

  it('switches between all three triangle presets without breaking the printed case', () => {
    const { container } = renderLab();
    for (const triangle of L11_LAB_TRIANGLES) {
      const button = buttonByText(triangle.label);
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-pressed', 'true');
      expect(container.querySelector('.katex-error')).toBeNull();
      expect(screen.getAllByText('يتحقّق')).toHaveLength(5);
      expect(svgLabels(container)).toEqual(expect.arrayContaining(['A', 'B', 'C', 'P']));
    }
  });

  it('falls back to the printed ratio when the diagram carries no params', () => {
    const bare: InteractiveDiagram = { ...threeRatiosLabDiagram, params: {} };
    const { container } = renderLab(bare);
    expect(container.textContent).toContain('k = 0.667');
    expect(container.textContent).toContain('تتحقّق الحالات الخمس');
    expect(container.textContent).not.toContain('$');
  });

  it('exposes an accessible stage description and a live status region', () => {
    const { container } = renderLab();
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('aria-label')?.length ?? 0).toBeGreaterThan(40);
    const status = screen.getByRole('status');
    expect(status.textContent?.length ?? 0).toBeGreaterThan(30);
  });
});
