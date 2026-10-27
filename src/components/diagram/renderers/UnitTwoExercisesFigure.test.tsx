import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import {
  LESSON12_BATCH1_FIGURES,
  fig12bQ1CaseOne,
  fig12bQ1CaseThree,
  fig12bQ1CaseTwo,
  fig12bQ10CaseOne,
  fig12bQ10CaseTwo,
} from '@/content/units/lesson-12-batch1-figures';
import {
  LESSON12_FIGURES,
  fig12Q18CaseOne,
  fig12Q18CaseTwo,
  fig12Q19,
} from '@/content/units/lesson-12-figures';
import { UnitTwoExercisesFigure } from './UnitTwoExercisesFigure';

const stylesheet = readFileSync(
  join(
    process.cwd(),
    'src/components/diagram/renderers/UnitTwoExercisesFigure.module.css',
  ),
  'utf-8',
);

function renderFigure(figure: Parameters<typeof UnitTwoExercisesFigure>[0]['spec']) {
  const { container } = render(<UnitTwoExercisesFigure spec={figure} />);
  return container;
}

describe('every Batch 1 figure renders an SVG with its aria-label', () => {
  it('mounts all twenty Batch 1 figures without missing scenarios', () => {
    expect(LESSON12_BATCH1_FIGURES).toHaveLength(20);
    for (const figure of LESSON12_BATCH1_FIGURES) {
      const container = renderFigure(figure);
      const svg = container.querySelector('svg');
      expect(svg, `${figure.id} failed to render an <svg>`).not.toBeNull();
      expect(svg?.getAttribute('aria-label')?.length ?? 0, figure.id).toBeGreaterThan(5);
    }
  });
});

describe('the yellow-highlighted figure labels printed in Questions 1 and 10', () => {
  it('renders the yellow highlight box and printed label on every badged figure', () => {
    const cases = [
      { figure: fig12bQ1CaseOne, badge: '①' },
      { figure: fig12bQ1CaseTwo, badge: '②' },
      { figure: fig12bQ1CaseThree, badge: '③' },
      { figure: fig12bQ10CaseOne, badge: '①' },
      { figure: fig12bQ10CaseTwo, badge: '②' },
    ] as const;
    for (const { figure, badge } of cases) {
      const container = renderFigure(figure);
      expect(container.textContent, figure.id).toContain(badge);
      const rects = Array.from(container.querySelectorAll('rect'));
      const badgeRect = rects.find((rect) =>
        (rect.getAttribute('class') ?? '').toLowerCase().includes('badge'),
      );
      expect(badgeRect, `${figure.id} has no yellow highlight rect`).toBeDefined();
    }
  });

  it('paints the badge yellow in the stylesheet', () => {
    expect(stylesheet).toMatch(/\.badgeYellow\s*\{[^}]*fill:\s*#f7d846/);
    expect(stylesheet).toMatch(/\.badgeText\s*\{[^}]*text-anchor:\s*middle/);
  });
});

describe('the green line and red marks of Question 10', () => {
  it('draws the printed green line in both figures', () => {
    for (const figure of [fig12bQ10CaseOne, fig12bQ10CaseTwo]) {
      const container = renderFigure(figure);
      const green = Array.from(container.querySelectorAll('line, polyline')).filter((element) =>
        (element.getAttribute('class') ?? '').toLowerCase().includes('green'),
      );
      expect(green.length, figure.id).toBeGreaterThan(0);
    }
    expect(stylesheet).toMatch(/\.greenLine\s*\{[^}]*stroke:\s*#2e8b57/);
  });

  it('draws BOTH red right-angle squares (at B and at J) in figure ① of Question 10', () => {
    const container = renderFigure(fig12bQ10CaseOne);
    const squares = Array.from(container.querySelectorAll('path')).filter((element) =>
      (element.getAttribute('class') ?? '').toLowerCase().includes('rightangle'),
    );
    expect(squares).toHaveLength(2);
  });

  it('draws the two red angle arcs of figure ② inside the triangle (above [BC])', () => {
    const container = renderFigure(fig12bQ10CaseTwo);
    const arcs = Array.from(container.querySelectorAll('path')).filter((element) =>
      (element.getAttribute('class') ?? '').toLowerCase().includes('arc'),
    );
    expect(arcs).toHaveLength(2);
    for (const arc of arcs) {
      const d = arc.getAttribute('d') ?? '';
      // Every endpoint y-coordinate on the arc must lie at or above the base y = 290.
      const nums = Array.from(d.matchAll(/-?\d+(?:\.\d+)?/g)).map((m) => Number(m[0]));
      expect(nums[1]).toBeLessThanOrEqual(290.01);
      expect(nums[8]).toBeLessThanOrEqual(290.01);
    }
  });
});

describe('every Q18–Q34 interactive figure renders cleanly, including Batch 2 (Q18–Q19)', () => {
  it('mounts all fourteen interactive figures of Q18–Q34 without missing scenarios', () => {
    const interactive = LESSON12_FIGURES.filter((figure) => figure.kind === 'interactive');
    expect(interactive).toHaveLength(14);
    for (const figure of interactive) {
      const container = renderFigure(figure);
      const svg = container.querySelector('svg');
      expect(svg, `${figure.id} failed to render an <svg>`).not.toBeNull();
      expect(svg?.getAttribute('aria-label')?.length ?? 0, figure.id).toBeGreaterThan(5);
    }
  });

  it('renders Question 18 case ① with its dashed arrow and red lengths 5, 8, 32.5, and case ② with 3, 9, 8', () => {
    const c1 = renderFigure(fig12Q18CaseOne);
    for (const label of ['E', 'F', 'H', 'J', 'K', '5', '8', '32.5']) {
      expect(c1.textContent).toContain(label);
    }
    const dashed1 = Array.from(c1.querySelectorAll('line')).filter((el) =>
      (el.getAttribute('class') ?? '').toLowerCase().includes('dashed'),
    );
    expect(dashed1).toHaveLength(1);

    const c2 = renderFigure(fig12Q18CaseTwo);
    for (const label of ['M', 'E', 'B', 'J', 'A', '3', '9', '8']) {
      expect(c2.textContent).toContain(label);
    }
    const dashed2 = Array.from(c2.querySelectorAll('line')).filter((el) =>
      (el.getAttribute('class') ?? '').toLowerCase().includes('dashed'),
    );
    expect(dashed2).toHaveLength(0);
  });

  it('renders Question 19 with all seven point labels and seven red tick strokes (1+1+1+2+2)', () => {
    const c19 = renderFigure(fig12Q19);
    for (const label of ['A', 'I', 'J', 'B', 'D', 'C', 'K']) {
      expect(c19.textContent).toContain(label);
    }
    const redGroups = Array.from(c19.querySelectorAll('g')).filter((el) =>
      (el.getAttribute('class') ?? '').toLowerCase().includes('tickred'),
    );
    expect(redGroups).toHaveLength(5);
    const redTickLines = redGroups.flatMap((group) => Array.from(group.querySelectorAll('line')));
    expect(redTickLines).toHaveLength(7);
  });
});
