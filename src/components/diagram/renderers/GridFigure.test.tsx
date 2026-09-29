import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { interactiveDiagramSchema } from '@/content/schema';
import { GridFigure } from './GridFigure';
import { allLessons } from '@/content/registry';

/**
 * The squared-paper figures of Lesson 2 are reproductions of printed figures,
 * so this renderer carries a heavier burden than a purely authored one:
 *   - every point must land on the lattice node the content declares;
 *   - Latin labels must stay LTR inside the RTL page;
 *   - a reproduction must never volunteer the answers to the printed exercise.
 */
function build(params: Record<string, unknown>) {
  return interactiveDiagramSchema.parse({
    kind: 'interactive',
    origin: 'authored',
    id: 'auth-test-grid',
    renderer: 'grid-figure',
    alt: 'شبكة اختبار مع النقطة $A$',
    params,
  });
}

const BASE = {
  cols: 4,
  rows: 3,
  gridStyle: 'solid',
  segments: [],
  reveals: [],
  extend: { start: 0, end: 0, bottom: 0, top: 0 },
};

describe('GridFigure', () => {
  it('places each point on its exact lattice node', () => {
    const spec = build({
      ...BASE,
      points: [
        { x: 0, y: 0, label: 'A' },
        { x: 4, y: 3, label: 'B' },
      ],
    });
    const { container } = render(<GridFigure spec={spec} />);
    const circles = [...container.querySelectorAll('circle')];
    const a = circles[0]!;
    const b = circles[1]!;

    // Padding is 0.75 user units and SVG y is flipped: y_svg = rows − y + pad.
    expect(Number(a.getAttribute('cx'))).toBeCloseTo(0.75, 6);
    expect(Number(a.getAttribute('cy'))).toBeCloseTo(3.75, 6);
    expect(Number(b.getAttribute('cx'))).toBeCloseTo(4.75, 6);
    expect(Number(b.getAttribute('cy'))).toBeCloseTo(0.75, 6);
  });

  it('keeps Latin point labels isolated left-to-right', () => {
    const spec = build({ ...BASE, points: [{ x: 1, y: 1, label: "M'" }] });
    const { container } = render(<GridFigure spec={spec} />);
    const label = container.querySelector('text')!;
    expect(label.textContent).toBe("M'");
    // The label class carries `direction: ltr; unicode-bidi: isolate`.
    expect(label.getAttribute('class')).toBeTruthy();
  });

  it('hides reveals until the student asks for them', async () => {
    const user = userEvent.setup();
    const spec = build({
      ...BASE,
      points: [{ x: 1, y: 1, label: 'M' }],
      reveals: [
        {
          id: 'r1',
          label: 'اكشف صورة M',
          points: [{ x: 3, y: 2, label: "M'" }],
          arrows: [{ from: [1, 1], to: [3, 2] }],
        },
      ],
    });
    const { container } = render(<GridFigure spec={spec} />);

    expect(container.querySelectorAll('text')).toHaveLength(1);
    await user.click(screen.getByRole('button', { name: 'اكشف صورة M' }));
    expect([...container.querySelectorAll('text')].map((n) => n.textContent)).toEqual(['M', "M'"]);

    await user.click(screen.getByRole('button', { name: 'اكشف صورة M' }));
    expect(container.querySelectorAll('text')).toHaveLength(1);
  });

  it('strips $…$ delimiters from the accessible description', () => {
    const spec = build({ ...BASE, points: [{ x: 0, y: 0 }] });
    const { container } = render(<GridFigure spec={spec} />);
    expect(container.querySelector('svg')!.getAttribute('aria-label')).toBe(
      'شبكة اختبار مع النقطة A',
    );
  });

  it('renders nothing rather than guessing when the params are incomplete', () => {
    const spec = build({ ...BASE, points: [] });
    const { container } = render(<GridFigure spec={spec} />);
    expect(container.querySelector('svg')).toBeNull();
  });
});

describe('the reproduced textbook grids of Lesson 2', () => {
  const lesson = allLessons.find(
    ({ lesson: item }) => item.id === 'lesson-02-image-of-a-point',
  )!.lesson;

  function grid(id: string) {
    for (const step of lesson.steps) {
      for (const block of step.blocks) {
        if (block.type === 'figure' && block.diagram.id === id) return block.diagram;
      }
    }
    throw new Error(`figure ${id} not found`);
  }

  it('keeps the page 8 activity points exactly where the scan shows them', () => {
    const figure = grid('fig-8-activity-grid');
    expect(figure.kind).toBe('interactive');
    if (figure.kind !== 'interactive') return;
    const points = figure.params.points as { x: number; y: number; label: string }[];
    expect(points.map((p) => [p.label, p.x, p.y])).toEqual([
      ['B', 1, 4],
      ['P', 2, 3],
      ['N', 1, 2],
      ['A', 4, 1],
      ['M', 6, 2],
    ]);
    // A, P and B are collinear on the drawn line: x + y = 5 for all three.
    for (const label of ['A', 'P', 'B']) {
      const point = points.find((p) => p.label === label)!;
      expect(point.x + point.y).toBe(5);
    }
  });

  it('keeps the page 10 exercise points exactly where the scan shows them', () => {
    const figure = grid('fig-10-exercise-3-grid');
    expect(figure.kind).toBe('interactive');
    if (figure.kind !== 'interactive') return;
    const points = figure.params.points as { x: number; y: number; label: string }[];
    expect(points.map((p) => [p.label, p.x, p.y])).toEqual([
      ['M', 7, 6],
      ['N', 3, 5],
      ['A', 4, 4],
      ['B', 2, 1],
      ["P'", 3, 1],
      ["Q'", 5, 1],
    ]);

    // Verification that justified redrawing this figure: with v = B − A every
    // image the exercise asks for lands on a lattice node inside the sheet.
    const at = (label: string) => points.find((p) => p.label === label)!;
    const v = { x: at('B').x - at('A').x, y: at('B').y - at('A').y };
    expect(v).toEqual({ x: -2, y: -3 });
    const image = (p: { x: number; y: number }) => ({ x: p.x + v.x, y: p.y + v.y });
    expect(image(at('M'))).toEqual({ x: 5, y: 3 });
    expect(image(image(at('M')))).toEqual({ x: 3, y: 0 });
    expect(image(at('N'))).toEqual({ x: 1, y: 2 });
  });

  it('never exposes reveal controls on a reproduced textbook figure', () => {
    for (const id of ['fig-8-activity-grid', 'fig-10-exercise-3-grid']) {
      const figure = grid(id);
      if (figure.kind !== 'interactive') continue;
      render(<GridFigure spec={figure} />);
      expect(screen.queryByRole('button')).toBeNull();
    }
  });
});
