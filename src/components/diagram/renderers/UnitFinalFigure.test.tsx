import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import type { InteractiveDiagram } from '@/content/schema';
import { UnitFinalFigure } from './UnitFinalFigure';

function spec(scenario: string, origin: 'textbook' | 'authored' = 'textbook'): InteractiveDiagram {
  return {
    kind: 'interactive',
    origin,
    id: `test-${scenario}`,
    renderer: 'unit-final-figure',
    alt: 'وصف عربي للشكل',
    params: { scenario },
  };
}

interface Point {
  x: number;
  y: number;
}

/** Every labelled vertex the figure draws, keyed by its printed label. */
function vertices(container: Element): Record<string, Point> {
  const found: Record<string, Point> = {};
  for (const group of container.querySelectorAll('svg g')) {
    const circle = group.querySelector('circle');
    const text = group.querySelector('text');
    if (!circle || !text || !text.textContent) continue;
    found[text.textContent] = {
      x: Number(circle.getAttribute('cx')),
      y: Number(circle.getAttribute('cy')),
    };
  }
  return found;
}

const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);
const midpoint = (a: Point, b: Point) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
const vector = (a: Point, b: Point) => ({ x: b.x - a.x, y: b.y - a.y });

function expectSamePoint(a: Point, b: Point) {
  expect(a.x).toBeCloseTo(b.x, 6);
  expect(a.y).toBeCloseTo(b.y, 6);
}

/**
 * These reconstructions carry no measured lengths from the scan — proportions
 * are editorial. What they MUST honour is the geometry the printed figure
 * asserts: which quadrilateral is a parallelogram, a rectangle or a rhombus,
 * which points are collinear, and which marked segments are equal. Each test
 * below checks exactly that, so a careless coordinate edit cannot silently
 * turn a rhombus into a kite.
 */
describe('UnitFinalFigure — source reconstructions honour the printed geometry', () => {
  it('Q16 ①: draws a parallelogram ANMD containing a rectangle ABCD', () => {
    const { container } = render(<UnitFinalFigure spec={spec('q16-parallelogram-rectangle')} />);
    const { A, N, M, D, B, C } = vertices(container) as Record<string, Point>;

    // ANMD is a parallelogram: vector AN equals vector DM.
    expectSamePoint(vector(A!, N!), vector(D!, M!));
    // ABCD is a rectangle: AB and DC vertical, AD and BC horizontal, equal.
    expect(A!.x).toBe(B!.x);
    expect(D!.x).toBe(C!.x);
    expect(A!.y).toBe(D!.y);
    expect(B!.y).toBe(C!.y);
    // N, B, C and M are collinear on the base line, in the printed order.
    expect(new Set([N!.y, B!.y, C!.y, M!.y]).size).toBe(1);
    expect(N!.x).toBeLessThan(B!.x);
    expect(B!.x).toBeLessThan(M!.x);
    expect(M!.x).toBeLessThan(C!.x);
  });

  it('Q16 authored: the translation N→M maps A to D and B to C', () => {
    const { container } = render(
      <UnitFinalFigure spec={spec('q16-translation-map', 'authored')} />,
    );
    const { A, N, M, D, B, C } = vertices(container) as Record<string, Point>;
    expectSamePoint(vector(N!, M!), vector(A!, D!));
    expectSamePoint(vector(N!, M!), vector(B!, C!));
  });

  it('Q20: draws a true rectangle with both diagonals and four right-angle marks', () => {
    const { container } = render(<UnitFinalFigure spec={spec('q20-rectangle-diagonals')} />);
    const { A, B, C, D } = vertices(container) as Record<string, Point>;
    expect(distance(A!, B!)).toBeCloseTo(distance(D!, C!), 6);
    expect(distance(A!, D!)).toBeCloseTo(distance(B!, C!), 6);
    expect(distance(A!, C!)).toBeCloseTo(distance(B!, D!), 6);
    expect(container.querySelectorAll('polyline')).toHaveLength(4);
  });

  it('Q24: draws a parallelogram whose diagonals meet at the drawn centre O', () => {
    const { container } = render(<UnitFinalFigure spec={spec('q24-parallelogram-diagonals')} />);
    const { A, B, C, D, O } = vertices(container) as Record<string, Point>;
    expectSamePoint(vector(A!, B!), vector(D!, C!));
    expectSamePoint(midpoint(A!, C!), O!);
    expectSamePoint(midpoint(B!, D!), O!);
  });

  it('Q25: draws only the printed diagonal [AC], never [BD]', () => {
    const { container } = render(<UnitFinalFigure spec={spec('q25-rectangle-diagonal')} />);
    const { A, B, C, D } = vertices(container) as Record<string, Point>;
    expect(A!.y).toBe(B!.y);
    expect(D!.y).toBe(C!.y);
    expect(A!.x).toBe(D!.x);
    expect(B!.x).toBe(C!.x);
    // One <line> only: the single diagonal the source prints.
    expect(container.querySelectorAll('svg line')).toHaveLength(1);
  });

  it('Q26: draws a genuine rhombus, four equal sides, centre on both diagonals', () => {
    const { container } = render(<UnitFinalFigure spec={spec('q26-rhombus-diagonals')} />);
    const { A, B, C, D, O } = vertices(container) as Record<string, Point>;
    const side = distance(A!, B!);
    expect(distance(B!, C!)).toBeCloseTo(side, 0);
    expect(distance(C!, D!)).toBeCloseTo(side, 0);
    expect(distance(D!, A!)).toBeCloseTo(side, 0);
    expectSamePoint(midpoint(A!, C!), O!);
    expectSamePoint(midpoint(B!, D!), O!);
  });

  it('Q27: keeps D, A, B, N collinear in printed order with DA = BN and CA = CB', () => {
    const { container } = render(<UnitFinalFigure spec={spec('q27-isosceles-extended')} />);
    const { A, B, C, D, N } = vertices(container) as Record<string, Point>;
    expect(new Set([D!.y, A!.y, B!.y, N!.y]).size).toBe(1);
    expect(D!.x).toBeLessThan(A!.x);
    expect(A!.x).toBeLessThan(B!.x);
    expect(B!.x).toBeLessThan(N!.x);
    expect(distance(D!, A!)).toBeCloseTo(distance(B!, N!), 6);
    expect(distance(C!, A!)).toBeCloseTo(distance(C!, B!), 6);
  });

  it('Q28: keeps (d) parallel to (d′) and puts angles 1 and 2 on opposite sides', () => {
    const { container } = render(<UnitFinalFigure spec={spec('q28-parallel-lines')} />);
    const { A, B } = vertices(container) as Record<string, Point>;
    const lines = [...container.querySelectorAll('svg line')];
    const [d, dPrime] = lines;
    expect(d!.getAttribute('y1')).toBe(d!.getAttribute('y2'));
    expect(dPrime!.getAttribute('y1')).toBe(dPrime!.getAttribute('y2'));
    // A sits on (d) and B on (d′); the transversal leans, so their x differ.
    expect(A!.y).toBe(Number(d!.getAttribute('y1')));
    expect(B!.y).toBe(Number(dPrime!.getAttribute('y1')));
    expect(A!.x).not.toBe(B!.x);
    expect(container.textContent).toContain('1');
    expect(container.textContent).toContain('2');
  });

  it('Q28 authored: the auxiliary line meets both parallels at the midpoint O of [AB]', () => {
    const { container } = render(
      <UnitFinalFigure spec={spec('q28-auxiliary-construction', 'authored')} />,
    );
    const { A, B, O, M, N } = vertices(container) as Record<string, Point>;
    expectSamePoint(midpoint(A!, B!), O!);
    // (MN) is perpendicular to the horizontal parallels, so it is vertical.
    expect(M!.x).toBe(O!.x);
    expect(N!.x).toBe(O!.x);
    // M and N lie on opposite sides of the transversal, as the proof requires.
    expect(M!.x).toBeLessThan(A!.x);
    expect(N!.x).toBeGreaterThan(B!.x);
  });

  it('Q22 authored: ACBA′ is a parallelogram whose diagonals share a midpoint', () => {
    const { container } = render(
      <UnitFinalFigure spec={spec('q22-parallelogram-acba', 'authored')} />,
    );
    const found = vertices(container) as Record<string, Point>;
    const { A, B, C } = found;
    const aPrime = found['A′']!;
    expectSamePoint(vector(A!, C!), vector(aPrime, B!));
    expectSamePoint(midpoint(A!, B!), midpoint(C!, aPrime));
  });

  it('Q23 authored: IAKB is a parallelogram and J is the midpoint of both diagonals', () => {
    const { container } = render(
      <UnitFinalFigure spec={spec('q23-parallelogram-iakb', 'authored')} />,
    );
    const { A, B, C, D, I, J, K } = vertices(container) as Record<string, Point>;
    expectSamePoint(midpoint(C!, D!), I!);
    expectSamePoint(midpoint(A!, B!), J!);
    expectSamePoint(vector(I!, A!), vector(B!, K!));
    expectSamePoint(midpoint(I!, K!), J!);
  });

  it('Q19 authored: draws the general case, where AB ≠ AC and ABC′C is a rectangle', () => {
    const { container } = render(<UnitFinalFigure spec={spec('q19-general-case', 'authored')} />);
    const found = vertices(container) as Record<string, Point>;
    const { A, B, C } = found;
    const bPrime = found['B′']!;
    const cPrime = found['C′']!;
    expect(distance(A!, B!)).not.toBeCloseTo(distance(A!, C!), 3);
    // Right angle at A: AB horizontal, AC vertical.
    expect(A!.y).toBe(B!.y);
    expect(A!.x).toBe(C!.x);
    // The translation A→B carries B to B′ and C to C′.
    expectSamePoint(vector(A!, B!), vector(B!, bPrime));
    expectSamePoint(vector(A!, B!), vector(C!, cPrime));
  });

  it('renders nothing at all for an unknown scenario', () => {
    const { container } = render(<UnitFinalFigure spec={spec('no-such-scenario')} />);
    expect(container.querySelectorAll('svg circle')).toHaveLength(0);
    expect(container.querySelectorAll('svg polygon')).toHaveLength(0);
  });

  it('strips math delimiters from its accessible name', () => {
    const custom = spec('q20-rectangle-diagonals');
    custom.alt = 'مستطيل $ABCD$ قطراه $[AC]$ و $[BD]$';
    const { getByRole } = render(<UnitFinalFigure spec={custom} />);
    expect(getByRole('img')).toHaveAttribute('aria-label', 'مستطيل ABCD قطراه [AC] و [BD]');
  });
});
