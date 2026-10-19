import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LessonOneLab } from './LessonOneLab';
import {
  latticeFigures,
  latticeOutlines,
  shift,
  type XY,
} from '@/content/units/lesson-01-geometry';
import type { InteractiveDiagram } from '@/content/schema';

const spec: InteractiveDiagram = {
  id: 'audit-7-b',
  kind: 'interactive',
  origin: 'authored',
  alt: 'الشبكة المثلثية والأشكال الثمانية',
  renderer: 'lesson-one-lab',
  params: { mode: 'lattice' },
};
const readPoints = (polygon: SVGPolygonElement): XY[] =>
  polygon
    .getAttribute('points')!
    .split(' ')
    .map((pair) => pair.split(',').map(Number) as unknown as XY);
const attr = (el: Element, name: string) => Number(el.getAttribute(name));
const EPS = 1e-7;

function inside(p: XY, polygon: XY[]) {
  let result = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const a = polygon[i]!,
      b = polygon[j]!;
    if (
      a[1] > p[1] !== b[1] > p[1] &&
      p[0] < ((b[0] - a[0]) * (p[1] - a[1])) / (b[1] - a[1]) + a[0]
    )
      result = !result;
  }
  return result;
}

describe('7-B rendered triangular lattice', () => {
  it('places every unchanged source vertex at the intersection of all three actual grid-line families', () => {
    const { container } = render(<LessonOneLab spec={spec} />);
    const lines = [...screen.getByTestId('lattice-grid').querySelectorAll('line')];
    const polygons = [...container.querySelectorAll('polygon')].slice(0, 8);
    const clip = container.querySelector('clipPath rect')!;
    expect(polygons).toHaveLength(8);
    expect(lines).toHaveLength(42);
    // Independently pin the intended equilateral geometry, origin and source outlines.
    const project = ([x, y]: XY): XY => [22 + x * 23, 25 + y * 23 * Math.sqrt(3)];
    polygons.forEach((polygon, index) => {
      const figure = latticeFigures[index]!;
      expect(readPoints(polygon)).toEqual(
        latticeOutlines[figure.shape]!.map((v) => project(shift(v, figure.at))),
      );
      for (const [x, y] of readPoints(polygon)) {
        // The three intersecting lines must also be visible at the vertex.
        expect(x).toBeGreaterThanOrEqual(attr(clip, 'x') - EPS);
        expect(x).toBeLessThanOrEqual(attr(clip, 'x') + attr(clip, 'width') + EPS);
        expect(y).toBeGreaterThanOrEqual(attr(clip, 'y') - EPS);
        expect(y).toBeLessThanOrEqual(attr(clip, 'y') + attr(clip, 'height') + EPS);
        const families = new Set<string>();
        for (const line of lines) {
          const ax = attr(line, 'x1'),
            ay = attr(line, 'y1'),
            bx = attr(line, 'x2'),
            by = attr(line, 'y2');
          const dx = bx - ax,
            dy = by - ay;
          if (Math.abs(dy) > EPS) expect(Math.abs(dy / dx)).toBeCloseTo(Math.sqrt(3), 12);
          if (Math.abs((x - ax) * dy - (y - ay) * dx) > EPS) continue;
          if (
            x < Math.min(ax, bx) - EPS ||
            x > Math.max(ax, bx) + EPS ||
            y < Math.min(ay, by) - EPS ||
            y > Math.max(ay, by) + EPS
          )
            continue;
          families.add(
            Math.abs(dy) < EPS ? 'horizontal' : dx * dy > 0 ? 'down-right' : 'down-left',
          );
        }
        expect([...families].sort(), `figure ${figure.n}, vertex ${x},${y}`).toEqual([
          'down-left',
          'down-right',
          'horizontal',
        ]);
      }
    });
  });

  it.each([3, 6])('places label %i inside its own yellow polygon, not the concave notch', (n) => {
    render(<LessonOneLab spec={spec} />);
    const label = screen.getByText(String(n), { selector: 'text' });
    const polygon = label.parentElement!.querySelector('polygon')!;
    const vertices = readPoints(polygon);
    const anchor: XY = [attr(label, 'x'), attr(label, 'y')];
    expect(inside(anchor, vertices)).toBe(true);
    // Check a conservative single-digit ink envelope for the configured 16px font.
    // This is a geometry check, not a browser font-metrics or visual-QA claim.
    for (const dx of [-8, 8])
      for (const dy of [-16, 4])
        expect(inside([anchor[0] + dx, anchor[1] + dy], vertices)).toBe(true);
    const figure = latticeFigures.find((f) => f.n === n)!;
    const oldAnchor: XY = [
      22 + 23 * (figure.at[0] + 2),
      25 + 23 * Math.sqrt(3) * (figure.at[1] + 1.7),
    ];
    expect(inside(oldAnchor, vertices)).toBe(false);
  });
});
