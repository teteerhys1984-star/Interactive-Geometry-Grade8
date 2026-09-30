import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import type { InteractiveDiagram } from '@/content/schema';
import { UnitContinuationFigure } from './UnitContinuationFigure';

function spec(scenario: string): InteractiveDiagram {
  return {
    kind: 'interactive',
    origin: 'textbook',
    id: `test-${scenario}`,
    renderer: 'unit-continuation-figure',
    alt: 'وصف عربي للشكل',
    params: { scenario },
  };
}

function coordinates(element: Element) {
  return {
    x: Number(element.getAttribute('cx')),
    y: Number(element.getAttribute('cy')),
  };
}

function distance(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

describe('UnitContinuationFigure source reconstructions', () => {
  it('keeps the Q6 source figure to five printed cells and no answer copies', () => {
    const { container } = render(<UnitContinuationFigure spec={spec('q6-source-grid')} />);
    // The only rectangles are the five yellow source cells; shapes ② and ③ are not drawn.
    expect(container.querySelectorAll('svg rect')).toHaveLength(5);
    expect(container.textContent).toContain('①');
    expect(container.textContent).not.toContain('②');
    expect(container.textContent).not.toContain('③');
  });

  it('places every Q13 grid label once and draws no answer arrows', () => {
    const { container } = render(<UnitContinuationFigure spec={spec('q13-source-grid')} />);
    for (const label of ['F', 'L', 'A', 'G', 'H', 'B', 'I', 'J', 'K', 'C', 'D', 'E', 'M', 'N']) {
      expect(
        [...container.querySelectorAll('text')].filter((node) => node.textContent === label),
      ).toHaveLength(1);
    }
    expect(container.querySelectorAll('line[marker-end]')).toHaveLength(0);
  });

  it('reconstructs Q15 at an exact scale from AB=3, AC=2 and CE=1', () => {
    const { container } = render(<UnitContinuationFigure spec={spec('q15-source-triangle')} />);
    const dots = [...container.querySelectorAll('circle[r="2.5"]')];
    expect(dots).toHaveLength(4);
    const [a, b, c, e] = dots.map(coordinates);
    expect(distance(a!, b!)).toBeCloseTo(336, 8);
    expect(distance(a!, c!)).toBeCloseTo(224, 8);
    expect(distance(c!, e!)).toBeCloseTo(112, 8);
  });

  it('strips math delimiters from its accessible name', () => {
    const custom = spec('q15-source-triangle');
    custom.alt = 'مثلث $ABC$ قائم في $A$';
    const { getByRole } = render(<UnitContinuationFigure spec={custom} />);
    expect(getByRole('img')).toHaveAttribute('aria-label', 'مثلث ABC قائم في A');
  });
});
