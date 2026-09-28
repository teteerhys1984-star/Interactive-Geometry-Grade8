import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { constructedDiagramSchema } from '@/content/schema';
import { TranslationFigure } from './TranslationFigure';

/**
 * The authored translation renderer must be EXACT: the image of every vertex is
 * P + v, computed, never eyeballed. These tests pin that contract, because the
 * whole justification for letting this diagram be `constructed` rather than
 * `reference` is that we can guarantee its geometry.
 */
function build(construction: Record<string, unknown>) {
  return constructedDiagramSchema.parse({
    kind: 'constructed',
    origin: 'authored',
    id: 'auth-test-figure',
    renderer: 'translation-figure',
    alt: 'شكل وصورته وفق انسحاب',
    construction,
  });
}

describe('TranslationFigure', () => {
  it('translates every vertex by exactly the same vector', () => {
    const spec = build({
      shape: [
        [0, 0],
        [3, 0],
        [3, 2],
      ],
      vector: [5, 2],
      labels: ['A', 'B', 'C'],
      grid: false,
    });
    const { container } = render(<TranslationFigure spec={spec} />);

    const polygons = container.querySelectorAll('polygon');
    expect(polygons).toHaveLength(2);

    const parse = (node: Element) =>
      node
        .getAttribute('points')!
        .split(' ')
        .map((pair) => pair.split(',').map(Number) as [number, number]);

    const source = parse(polygons[0]!);
    const image = parse(polygons[1]!);

    // SVG y is flipped, so the image sits +5 in x and −2 in y.
    for (const [index, point] of source.entries()) {
      expect(image[index]![0] - point[0]).toBeCloseTo(5, 6);
      expect(image[index]![1] - point[1]).toBeCloseTo(-2, 6);
    }
  });

  it('labels the image with primes and the original without', () => {
    const spec = build({
      shape: [
        [0, 0],
        [2, 0],
        [1, 2],
      ],
      vector: [3, 1],
      labels: ['M', 'N', 'P'],
    });
    const { container } = render(<TranslationFigure spec={spec} />);
    const texts = [...container.querySelectorAll('text')].map((node) => node.textContent);
    expect(texts).toEqual(['M', 'N', 'P', 'M′', 'N′', 'P′']);
  });

  it('draws one translation arrow per vertex', () => {
    const spec = build({
      shape: [
        [0, 0],
        [2, 0],
        [1, 2],
      ],
      vector: [3, 1],
      grid: false,
    });
    const { container } = render(<TranslationFigure spec={spec} />);
    const arrows = [...container.querySelectorAll('line')].filter((line) =>
      line.getAttribute('marker-end'),
    );
    expect(arrows).toHaveLength(3);
  });

  it('strips $…$ delimiters from the accessible description', () => {
    const spec = constructedDiagramSchema.parse({
      kind: 'constructed',
      origin: 'authored',
      id: 'auth-test-alt',
      renderer: 'translation-figure',
      alt: 'مثلث $ABC$ وصورته',
      construction: {
        shape: [
          [0, 0],
          [1, 0],
          [0, 1],
        ],
        vector: [2, 0],
      },
    });
    const { container } = render(<TranslationFigure spec={spec} />);
    expect(container.querySelector('svg')!.getAttribute('aria-label')).toBe('مثلث ABC وصورته');
  });

  it('renders nothing when the construction is incomplete rather than guessing', () => {
    const spec = build({ vector: [1, 1] });
    const { container } = render(<TranslationFigure spec={spec} />);
    expect(container.querySelector('svg')).toBeNull();
  });
});
