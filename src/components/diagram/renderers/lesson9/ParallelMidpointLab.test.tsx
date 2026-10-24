import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import type { InteractiveDiagram } from '@/content/schema';
import { parallelMidpointLabDiagram } from '@/content/units/lesson-09-figures';
import { L9_LAB_TRIANGLES } from '@/content/units/lesson-09-geometry';
import { ParallelMidpointLab } from './ParallelMidpointLab';

/**
 * ============================================================================
 *  PARALLEL-FROM-MIDPOINT LAB — Behaviour & Geometry Contract
 * ============================================================================
 *
 *  Verifies the interactive simulation of Salim's page-34 investigation:
 *    • starts at Salim's freehand tilt (+9°), showing non-parallel status
 *      and distinct points P and N;
 *    • snaps to exact parallelism (0°) via preset button or range slider,
 *      updating the readout to AP = PC = AN = NC and coincidence P = N;
 *    • switches cleanly across all three triangle presets (acute, right, obtuse);
 *    • toggles the true midline (d′) and midpoint N overlay;
 *    • renders all mathematical notation inside LTR KaTeX spans with zero raw
 *      `$` delimiters, and falls back safely when optional params are omitted.
 * ============================================================================
 */

const renderLab = (spec: InteractiveDiagram = parallelMidpointLabDiagram) =>
  render(<ParallelMidpointLab spec={spec} />);

describe('ParallelMidpointLab', () => {
  it('renders the initial Salim freehand state (+9°), status text, and SVG labels without raw $ delimiters', () => {
    const { container } = renderLab();
    expect(container.textContent).not.toContain('$');
    expect(container.querySelector('.katex-error')).toBeNull();
    expect(container.textContent).toContain('حالات سريعة للمقارنة');
    expect(container.textContent).toContain('+9^\\circ');
    expect(container.textContent).toContain('لا يوازي');

    const svgLabels = [...container.querySelectorAll('svg text')].map((el) =>
      el.textContent?.trim(),
    );
    for (const expected of ['A', 'B', 'C', 'M', 'N', 'P', '(d)', "(d')"]) {
      expect(svgLabels).toContain(expected);
    }
  });

  it('reaches exact parallelism (0°) via the preset button and proves P = N with AP = PC = AN', () => {
    const { container } = renderLab();
    const buttons = container.querySelectorAll('button[aria-pressed]');
    // First 3 buttons are angle presets: [0] Salim (+9°), [1] Exact (0°), [2] Downward (-8°)
    expect(buttons.length).toBe(6);

    fireEvent.click(buttons[1]!);
    expect(buttons[1]!).toHaveAttribute('aria-pressed', 'true');
    expect(container.textContent).toContain('الحالة الدقيقة');
    expect(container.textContent).toContain('3.41 \\; , \\; 3.41');

    const svgLabels = [...container.querySelectorAll('svg text')].map((el) =>
      el.textContent?.trim(),
    );
    expect(svgLabels).toContain('P=N');
    expect(svgLabels).toContain("(d)=(d')");
  });

  it('updates live measurements continuously when the angle slider moves between negative, zero, and positive tilts', () => {
    const { container } = renderLab();
    const slider = screen.getByRole('slider') as HTMLInputElement;

    fireEvent.change(slider, { target: { value: '-9' } });
    expect(container.textContent).toContain('-9^\\circ');
    expect(container.textContent).toContain('لا يوازي');

    fireEvent.change(slider, { target: { value: '0' } });
    expect(container.textContent).toContain('الحالة الدقيقة');

    fireEvent.change(slider, { target: { value: '8' } });
    expect(container.textContent).toContain('+8^\\circ');
    expect(container.textContent).toContain('لا يوازي');
  });

  it('switches across all three triangle presets (acute, right, obtuse) while preserving exact coincidence at 0°', () => {
    const { container } = renderLab();
    const buttons = container.querySelectorAll('button[aria-pressed]');
    fireEvent.click(buttons[1]!); // 0° exact parallel

    // Buttons [3..5] are triangle presets: acute, right, obtuse
    L9_LAB_TRIANGLES.forEach((_preset, idx) => {
      const triBtn = buttons[3 + idx]!;
      fireEvent.click(triBtn);
      expect(triBtn).toHaveAttribute('aria-pressed', 'true');
      expect(container.textContent).toContain('الحالة الدقيقة');
      const svgLabels = [...container.querySelectorAll('svg text')].map((el) =>
        el.textContent?.trim(),
      );
      expect(svgLabels).toContain('P=N');
    });
  });

  it('toggles visibility of the reference midline (d′) and midpoint N when unchecked in non-parallel mode', () => {
    const { container } = renderLab();
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);

    const hasLabelN = () =>
      [...container.querySelectorAll('svg text')].some((el) => el.textContent?.trim() === 'N');
    expect(hasLabelN()).toBe(true);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
    expect(hasLabelN()).toBe(false);
  });

  it('falls back safely to the default +9° acute scene when optional params are omitted', () => {
    const minimal: InteractiveDiagram = {
      ...parallelMidpointLabDiagram,
      params: {},
    };
    const { container } = render(<ParallelMidpointLab spec={minimal} />);
    expect(container.querySelector('svg')).not.toBeNull();
    expect(container.textContent).toContain('+9^\\circ');
  });
});
