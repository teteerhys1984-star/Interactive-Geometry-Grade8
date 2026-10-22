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

  it('draws Q6 at the verified source nodes and the printed 3-left / 2-down vector', () => {
    const { container } = render(<UnitContinuationFigure spec={spec('q6-source-grid')} />);
    const dots = [...container.querySelectorAll('circle[r="6"]')].map(coordinates);
    expect(dots).toHaveLength(2);
    const [a, c] = dots as { x: number; y: number }[];
    // Renderer grid origin (80, 48), 52 px cells, top-left origin.
    expect(a).toEqual({ x: 80 + 7 * 52, y: 48 + 1 * 52 }); // A = (7,4) bottom-left
    expect(c).toEqual({ x: 80 + 4 * 52, y: 48 + 3 * 52 }); // C = (4,2) bottom-left
    expect((a!.x - c!.x) / 52).toBe(3); // three cells left
    expect((c!.y - a!.y) / 52).toBe(2); // two cells down
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

  /* ---------------------------------------- Q3 / Q4 / Q9 / Q10 / Q11 */

  const pointOf = (container: HTMLElement, label: string) => {
    const group = container.querySelector(`[data-point="${label}"]`);
    expect(group, `missing point ${label}`).not.toBeNull();
    return coordinates(group!.querySelector('circle')!);
  };

  it('draws Q3 with an exact bisector and two perpendicular feet', () => {
    const { container } = render(<UnitContinuationFigure spec={spec('q3-angle-bisector')} />);
    const a = pointOf(container, 'A');
    const b = pointOf(container, 'B');
    const c = pointOf(container, 'C');
    const m = pointOf(container, 'M');

    // B on the horizontal ray Ax, C on the oblique ray Ay, M on the bisector.
    expect(b.y).toBeCloseTo(a.y, 6);
    expect(c.y).toBeLessThan(a.y);
    // BM ⟂ Ax and CM ⟂ Ay. The cosine of each angle must be zero; a normalized
    // check keeps the assertion meaningful despite 0.01 px coordinate rounding.
    const dot = (u: { x: number; y: number }, v: { x: number; y: number }) => u.x * v.x + u.y * v.y;
    const cos = (u: { x: number; y: number }, v: { x: number; y: number }) =>
      dot(u, v) / (Math.hypot(u.x, u.y) * Math.hypot(v.x, v.y));
    const sub = (p1: { x: number; y: number }, p2: { x: number; y: number }) => ({
      x: p1.x - p2.x,
      y: p1.y - p2.y,
    });
    expect(Math.abs(cos(sub(m, b), sub(a, b)))).toBeLessThan(1e-3);
    expect(Math.abs(cos(sub(m, c), sub(a, c)))).toBeLessThan(1e-3);
    // Az bisects xÂy: the two half-angles are equal.
    const angle = (p: { x: number; y: number }) => Math.atan2(a.y - p.y, p.x - a.x);
    // Equal to well under a thousandth of a radian (0.01 px coordinate rounding).
    expect(angle(m)).toBeCloseTo((angle(c) - angle(b)) / 2 + angle(b), 4);

    // Both printed right angles and both equal-angle arcs are drawn.
    const marks = [...container.querySelectorAll('[data-mark]')].map((node) =>
      node.getAttribute('data-mark'),
    );
    expect(marks).toEqual(['right-B', 'right-C', 'angle-xAz', 'angle-zAy']);
    // The three ray names are labelled.
    for (const name of ['x', 'y', 'z']) {
      expect(
        [...container.querySelectorAll('text')].filter((node) => node.textContent === name),
      ).toHaveLength(1);
    }
  });

  it('draws both Q4 boxes at the verified relative layouts and no vertex D', () => {
    const { container } = render(<UnitContinuationFigure spec={spec('q4-parallelogram-points')} />);
    expect(container.querySelectorAll('[data-box]')).toHaveLength(2);
    expect(container.textContent).toContain('①');
    expect(container.textContent).toContain('②');
    // D is the exercise answer: it must not be drawn.
    expect(container.querySelector('[data-point="D"]')).toBeNull();

    const box = (id: string) => container.querySelector(`[data-box="${id}"]`) as HTMLElement;
    const point = (id: string, label: string) => {
      const group = box(id).querySelector(`[data-point="${label}"]`);
      expect(group, `${id}/${label}`).not.toBeNull();
      return coordinates(group!.querySelector('circle')!);
    };

    // ① A upper-left, C middle-right, B lower-middle.
    const a1 = point('①', 'A');
    const c1 = point('①', 'C');
    const b1 = point('①', 'B');
    expect(a1.x).toBeLessThan(c1.x);
    expect(a1.y).toBeLessThan(c1.y);
    expect(b1.x).toBeGreaterThan(a1.x);
    expect(b1.x).toBeLessThan(c1.x);
    expect(b1.y).toBeGreaterThan(c1.y);

    // ② A upper-left, B lower-middle-left, C lower-right.
    const a2 = point('②', 'A');
    const b2 = point('②', 'B');
    const c2 = point('②', 'C');
    expect(a2.y).toBeLessThan(b2.y);
    expect(a2.y).toBeLessThan(c2.y);
    expect(b2.x).toBeLessThan(c2.x);
    expect(b2.y).toBeGreaterThan(a2.y);
  });

  it('draws the six Q9 panels with every recorded relation preserved', () => {
    const { container } = render(<UnitContinuationFigure spec={spec('q9-six-lines')} />);
    const panels = [...container.querySelectorAll('[data-panel]')];
    expect(panels.map((panel) => panel.getAttribute('data-panel'))).toEqual([
      '(1)-①',
      '(1)-②',
      '(1)-③',
      '(2)-①',
      '(2)-②',
      '(2)-③',
    ]);
    // Row and panel numbering, exactly as printed.
    expect(container.textContent).toContain('(1)');
    expect(container.textContent).toContain('(2)');
    expect(
      panels.map(
        (panel) => panel.querySelector('.panelNumber, [class*="panelNumber"]')?.textContent,
      ),
    ).toEqual(['①', '②', '③', '①', '②', '③']);
    // Every panel prints the name of its line.
    for (const panel of panels) {
      expect(panel.textContent).toContain('(d)');
    }

    const solve = (id: string) => {
      const panel = container.querySelector(`[data-panel="${id}"]`) as SVGGElement;
      // jsdom implements no SVG transform matrix, so read the attribute itself.
      const [, tx = '0', ty = '0'] =
        /translate\(\s*(-?[\d.]+)[\s,]+(-?[\d.]+)\s*\)/.exec(
          panel.getAttribute('transform') ?? '',
        ) ?? [];
      const shift = (p: { x: number; y: number }) => ({
        x: p.x + Number(tx),
        y: p.y + Number(ty),
      });
      const local = (label: string) =>
        coordinates(panel.querySelector(`[data-point="${label}"] circle`)!);
      const line = panel.querySelector('[data-role="d"]')!;
      return {
        a: shift(local('A')),
        b: shift(local('B')),
        d1: shift({
          x: Number(line.getAttribute('x1')),
          y: Number(line.getAttribute('y1')),
        }),
        d2: shift({
          x: Number(line.getAttribute('x2')),
          y: Number(line.getAttribute('y2')),
        }),
      };
    };
    const distanceToLine = (
      point: { x: number; y: number },
      d1: { x: number; y: number },
      d2: { x: number; y: number },
    ) => {
      const dx = d2.x - d1.x;
      const dy = d2.y - d1.y;
      return Math.abs(dy * point.x - dx * point.y + d2.x * d1.y - d2.y * d1.x) / Math.hypot(dx, dy);
    };

    // (1)-① AB ∥ (d): both points at the same distance, on the same side.
    const p1 = solve('(1)-①');
    const dAB = distanceToLine(p1.a, p1.d1, p1.d2);
    expect(dAB).toBeCloseTo(distanceToLine(p1.b, p1.d1, p1.d2), 6);
    expect(dAB).toBeGreaterThan(20);
    const sideAB =
      (p1.d2.x - p1.d1.x) * (p1.a.y - p1.d1.y) - (p1.d2.y - p1.d1.y) * (p1.a.x - p1.d1.x);
    const sideABb =
      (p1.d2.x - p1.d1.x) * (p1.b.y - p1.d1.y) - (p1.d2.y - p1.d1.y) * (p1.b.x - p1.d1.x);
    expect(Math.sign(sideAB)).toBe(Math.sign(sideABb));

    // (1)-② no labelled point lies on (d).
    const p2 = solve('(1)-②');
    expect(distanceToLine(p2.a, p2.d1, p2.d2)).toBeGreaterThan(20);
    expect(distanceToLine(p2.b, p2.d1, p2.d2)).toBeGreaterThan(20);

    // (1)-③ A ∈ (d), B ∉ (d).
    const p3 = solve('(1)-③');
    expect(distanceToLine(p3.a, p3.d1, p3.d2)).toBeCloseTo(0, 6);
    expect(distanceToLine(p3.b, p3.d1, p3.d2)).toBeGreaterThan(20);

    // (2)-① B ∈ (d), A ∉ (d) and on the other side of the line.
    const p4 = solve('(2)-①');
    expect(distanceToLine(p4.b, p4.d1, p4.d2)).toBeCloseTo(0, 6);
    expect(distanceToLine(p4.a, p4.d1, p4.d2)).toBeGreaterThan(20);

    // (2)-② [AB] meets (d) at an unlabelled point: opposite sides, no label on (d).
    const p5 = solve('(2)-②');
    const sideA5 =
      (p5.d2.x - p5.d1.x) * (p5.a.y - p5.d1.y) - (p5.d2.y - p5.d1.y) * (p5.a.x - p5.d1.x);
    const sideB5 =
      (p5.d2.x - p5.d1.x) * (p5.b.y - p5.d1.y) - (p5.d2.y - p5.d1.y) * (p5.b.x - p5.d1.x);
    expect(Math.sign(sideA5)).toBe(-Math.sign(sideB5));
    expect(distanceToLine(p5.a, p5.d1, p5.d2)).toBeGreaterThan(10);
    expect(distanceToLine(p5.b, p5.d1, p5.d2)).toBeGreaterThan(10);

    // (2)-③ general case, both points strictly off (d).
    const p6 = solve('(2)-③');
    expect(distanceToLine(p6.a, p6.d1, p6.d2)).toBeGreaterThan(20);
    expect(distanceToLine(p6.b, p6.d1, p6.d2)).toBeGreaterThan(20);
  });

  it('draws Q10 with C on (d) and A, B on opposite sides of it', () => {
    const { container } = render(<UnitContinuationFigure spec={spec('q10-line-construction')} />);
    const a = pointOf(container, 'A');
    const b = pointOf(container, 'B');
    const c = pointOf(container, 'C');
    const line = container.querySelector('[data-role="d"]')!;
    const d1 = { x: Number(line.getAttribute('x1')), y: Number(line.getAttribute('y1')) };
    const d2 = { x: Number(line.getAttribute('x2')), y: Number(line.getAttribute('y2')) };
    const side = (p: { x: number; y: number }) =>
      (d2.x - d1.x) * (p.y - d1.y) - (d2.y - d1.y) * (p.x - d1.x);
    const distance = (p: { x: number; y: number }) =>
      Math.abs(side(p)) / Math.hypot(d2.x - d1.x, d2.y - d1.y);

    // C ∈ (d) exactly.
    expect(distance(c)).toBeCloseTo(0, 6);
    // B above the line, A below it (screen coordinates: smaller y is higher).
    expect(side(b)).toBeLessThan(0);
    expect(side(a)).toBeGreaterThan(0);
    expect(container.textContent).toContain('(d)');
  });

  it('draws Q11 with CA = CB, CN ⟂ AB, N on [AB] and no AN = NB tick', () => {
    const { container } = render(<UnitContinuationFigure spec={spec('q11-isosceles-altitude')} />);
    const a = pointOf(container, 'A');
    const b = pointOf(container, 'B');
    const c = pointOf(container, 'C');
    const n = pointOf(container, 'N');

    expect(distance(a, c)).toBeCloseTo(distance(b, c), 6);
    expect(n.y).toBeCloseTo(a.y, 6);
    expect(n.x).toBeGreaterThan(a.x);
    expect(n.x).toBeLessThan(b.x);
    // CN ⟂ AB.
    const dot = (u: { x: number; y: number }, v: { x: number; y: number }) => u.x * v.x + u.y * v.y;
    expect(dot({ x: n.x - c.x, y: n.y - c.y }, { x: b.x - a.x, y: b.y - a.y })).toBeCloseTo(0, 6);

    // Exactly the two equality ticks and one right angle: the printed marks only.
    const marks = [...container.querySelectorAll('[data-mark]')].map((node) =>
      node.getAttribute('data-mark'),
    );
    expect(marks).toEqual(['right-N', 'tick-CA', 'tick-CB']);
    // AN = NB is the result, so the halves stay unmarked.
    expect(container.querySelector('[data-mark="tick-AN"]')).toBeNull();
    expect(container.querySelector('[data-mark="tick-NB"]')).toBeNull();
  });

  it('draws no figure for an unknown scenario instead of faking one', () => {
    const { container } = render(<UnitContinuationFigure spec={spec('unknown-scenario')} />);
    expect(container.querySelectorAll('[data-point]')).toHaveLength(0);
  });
});
