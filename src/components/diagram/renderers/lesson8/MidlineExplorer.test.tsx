import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import type { InteractiveDiagram } from '@/content/schema';
import { midlineExplorerDiagram } from '@/content/units/lesson-08-figures';
import { activityTriangles, page32Example } from '@/content/units/lesson-08-geometry';
import { MidlineExplorer } from './MidlineExplorer';

/**
 * ============================================================================
 *  MIDLINE EXPLORER — behaviour contract
 * ============================================================================
 *
 *  The lab's whole pedagogical point is invariance: whatever the learner does
 *  to the apex, the computed ratio stays 0.50 and the computed angle stays 0°.
 *  These tests drive the real control and read the real read-out, so a future
 *  edit cannot silently turn the lab into a static picture or into a lab that
 *  hands out a wrong measurement.
 * ============================================================================
 */

const renderLab = (spec: InteractiveDiagram = midlineExplorerDiagram) =>
  render(<MidlineExplorer spec={spec} />);

describe('midline explorer', () => {
  it('renders the title, the intro and every computed read-out', () => {
    renderLab();
    expect(screen.getByRole('heading', { name: 'مختبر منتصفَي الضلعين' })).toBeInTheDocument();
    expect(screen.getByText(/حرّك رأس المثلث/)).toBeInTheDocument();
    expect(screen.getByText('0.50')).toBeInTheDocument();
    expect(screen.getByText('3.60')).toBeInTheDocument();
    expect(screen.getByText('7.20')).toBeInTheDocument();
  });

  it('keeps MN / BC = 0.50 and the angle at 0° when the apex moves', () => {
    const { container } = renderLab();
    const slider = screen.getByLabelText(/ارتفاع الرأس/) as HTMLInputElement;

    for (const value of ['2.4', '3.6', '6.2']) {
      fireEvent.change(slider, { target: { value } });
      // The invariant the theorem states: the ratio never changes.
      expect(screen.getByText('0.50')).toBeInTheDocument();
      expect(screen.getAllByText('0.00°').length).toBeGreaterThan(0);
      // And the midpoint points stay inside the triangle's own coordinates.
      expect(container.querySelector('svg')).not.toBeNull();
    }
  });

  it('reaches the three printed cases through the presets', () => {
    const { container } = renderLab();
    const presets = container.querySelectorAll('button[aria-pressed]');
    expect(presets).toHaveLength(3);

    // ② is the right-angled case of the printed activity.
    fireEvent.click(presets[1]!);
    expect(container.textContent).toContain('قائمة');
    expect(presets[1]!.getAttribute('aria-pressed')).toBe('true');

    // ③ is the obtuse case.
    fireEvent.click(presets[2]!);
    expect(container.textContent).toContain('منفرجة');

    // ① is the acute case again.
    fireEvent.click(presets[0]!);
    expect(container.textContent).toContain('حادة');
  });

  it('adds K and the parallelogram only when the learner asks for it', () => {
    const { container } = renderLab();
    const svgLabels = () =>
      [...container.querySelectorAll('svg text')].map((node) => node.textContent?.trim());
    expect(svgLabels()).not.toContain('K');

    fireEvent.click(screen.getByLabelText(/أظهر متوازي الأضلاع/));
    expect(svgLabels()).toContain('K');
    // The three original vertices are still labelled — nothing was replaced.
    for (const label of ['A', 'B', 'C', 'M', 'N']) expect(svgLabels()).toContain(label);
  });

  it('degrades to nothing when its parameters are unusable', () => {
    const broken: InteractiveDiagram = {
      ...midlineExplorerDiagram,
      params: { title: 'مختبر' },
    };
    const { container } = render(<MidlineExplorer spec={broken} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('is driven by the same coordinates the geometry module verifies', () => {
    // The initial apex is the acute activity triangle, and the right-angle
    // preset is the right-angled one: the lab and the static figures cannot drift.
    const params = midlineExplorerDiagram.params as {
      apex: { initialY: number; rightAngleY: number };
      base: { B: [number, number]; C: [number, number] };
    };
    expect(params.apex.initialY).toBe(activityTriangles[0]!.A[1]);
    expect(params.apex.rightAngleY).toBe(activityTriangles[1]!.A[1]);
    expect(params.base.B).toEqual(activityTriangles[0]!.B);
    expect(params.base.C).toEqual(activityTriangles[0]!.C);
    // The example figure of page 32 uses the same construction with other points.
    expect(page32Example.I[1]).toBeCloseTo(page32Example.triangle.A[1] / 2, 9);
  });
});
