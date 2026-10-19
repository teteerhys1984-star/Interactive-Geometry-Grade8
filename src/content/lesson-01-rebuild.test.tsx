import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { allLessons } from './registry';
import { launchChoices, launchSteps } from './units/lesson-01-start';
import { lesson01TeacherSteps } from './units/lesson-01-exercises';
import {
  crossOutline,
  launchGrid,
  launchParallelograms,
  latticeFigures,
  latticeOutlines,
  pavementPoints,
  pavementTiles,
  shift,
  stripPolygon,
  stripPoints,
  type XY,
} from './units/lesson-01-geometry';
import { LessonOneLab } from '@/components/diagram/renderers/LessonOneLab';
import type { ContentBlock, InteractiveDiagram } from './schema';

const lesson = allLessons[0]!.lesson;
function strings(blocks: ContentBlock[]): string {
  return JSON.stringify(blocks);
}
const vector = (a: XY, b: XY): XY => [b[0] - a[0], b[1] - a[1]];
const area = (v: readonly XY[]) =>
  Math.abs(
    v.reduce((s, a, i) => {
      const b = v[(i + 1) % v.length]!;
      return s + a[0] * b[1] - a[1] * b[0];
    }, 0) / 2,
  );
const spec = (mode: string): InteractiveDiagram => ({
  kind: 'interactive',
  origin: 'authored',
  id: `test-${mode}`,
  alt: 'رسم تعليمي',
  renderer: 'lesson-one-lab',
  params: { mode },
});

describe('Lesson 1 source destinations and permanent worked reasoning', () => {
  it('contains all nine launch choices in printed order with three alternatives and reasoned solutions', () => {
    expect(launchChoices.map((q) => q.id)).toEqual(
      Array.from({ length: 9 }, (_, i) => `launch-1-${i + 1}`),
    );
    for (const q of launchChoices) {
      expect(q.options).toHaveLength(3);
      expect(q.solution).toHaveLength(3);
      expect(q.solution.every((s) => s.length > 65)).toBe(true);
      expect(strings(lesson.steps.flatMap((s) => s.blocks))).toContain(
        JSON.stringify(q.question).slice(1, -1),
      );
      for (const text of q.solution)
        expect(strings(lesson.steps.flatMap((s) => s.blocks))).toContain(
          JSON.stringify(text).slice(1, -1),
        );
    }
    expect(launchSteps.map((s) => s.source?.page)).toEqual([3, 3, 4, 4, 4, 4]);
  });
  it('keeps grid, both marked cases, both circle tasks and their solutions permanently visible', () => {
    for (const id of ['launch-grid', 'launch-marked', 'launch-circles']) {
      const step = lesson.steps.find((s) => s.id === id)!;
      expect(step).toBeDefined();
      const worked = step.blocks.filter((b) => b.type === 'teaching');
      expect(worked.length).toBeGreaterThanOrEqual(id === 'launch-grid' ? 1 : 2);
      for (const b of worked) if (b.type === 'teaching') expect(b.collapsible).toBe(false);
    }
    expect(strings(lesson.steps.find((s) => s.id === 'launch-circles')!.blocks)).toContain('30^');
    expect(strings(lesson.steps.find((s) => s.id === 'launch-grid')!.blocks)).toContain('21');
  });
  it('retains the ten check/practice prompts only in existing teacher resources, including all compound parts', () => {
    expect(lesson01TeacherSteps.map((s) => s.id)).toEqual([
      'step-05-check-fifteen-parallelograms',
      'step-06-check-why-not-a-translation',
      'step-07-practice-triangular-tiling',
      'step-08-practice-semicircle-area',
    ]);
    const student = strings(lesson.steps.flatMap((s) => s.blocks));
    const solutions = lesson.teacherResources!.textbookSolutions;
    expect(solutions).toHaveLength(10);
    for (const solution of solutions) {
      expect(student).not.toContain(solution.question);
      expect(solution.blocks.some((b) => b.type === 'figure')).toBe(true);
      const worked = solution.blocks.find((b) => b.type === 'teaching');
      expect(worked?.type === 'teaching' && worked.blocks.length >= 2).toBe(true);
    }
    expect(strings(solutions[6]!.blocks)).toContain('①');
    expect(strings(solutions[6]!.blocks)).toContain('④');
    expect(strings(solutions[7]!.blocks)).toContain('⑧');
    expect(strings(solutions[9]!.blocks)).toContain('18');
  });
  it('corrects the old source misreading: pavement activity 2 asks ⑧ to ⑪, not ⑩ to ⑧', () => {
    const activity = lesson.steps.find((s) => s.id === 'step-02-activity-another-translation')!;
    expect(strings(activity.blocks)).toContain('هل يوجد انسحاب ينقل الحجر ⑧ إلى الحجر ⑪');
    expect(strings(activity.blocks)).not.toContain('هل يوجد انسحاب ينقل الحجر ⑩ إلى الحجر ⑧');
  });
  it('publishes no source raster or book-reference placeholder in Lesson 1', () => {
    const data = JSON.stringify([lesson.steps, lesson.teacherResources]);
    expect(data).not.toContain('"kind":"reference"');
    expect(data).not.toContain('"kind":"image"');
    expect(data).toContain('ليس صورة من الكتاب');
  });
});

describe('source geometry independently checked', () => {
  it('enumerates exactly all seven nondegenerate parallelograms on the launch grid', () => {
    const labels = Object.keys(launchGrid),
      found = new Set<string>();
    for (const a of labels)
      for (const b of labels)
        for (const c of labels)
          for (const d of labels) {
            if (new Set([a, b, c, d]).size !== 4) continue;
            const [A, B, C, D] = [a, b, c, d].map((n) => launchGrid[n]!);
            if (A![0] + C![0] !== B![0] + D![0] || A![1] + C![1] !== B![1] + D![1]) continue;
            if (area([A!, B!, C!, D!]) === 0) continue;
            found.add([a, b, c, d].sort().join(''));
          }
    expect([...found].sort()).toEqual(
      launchParallelograms.map((s) => [...s].sort().join('')).sort(),
    );
  });
  it('verifies every numbered pavement answer by an identical displacement', () => {
    const first = vector(pavementPoints.A!, pavementPoints.B!);
    const second = vector(pavementPoints.A!, pavementPoints.M!);
    for (const [a, b] of [
      [1, 2],
      [4, 5],
      [9, 10],
    ])
      expect(shift(pavementTiles[a!]!, first)).toEqual(pavementTiles[b!]);
    for (const [a, b] of [
      [1, 4],
      [6, 11],
      [7, 10],
    ])
      expect(shift(pavementTiles[a!]!, second)).toEqual(pavementTiles[b!]);
    expect(shift(pavementPoints.C!, first)).toEqual(pavementPoints.D);
    expect(shift(pavementPoints.E!, first)).toEqual(pavementPoints.F);
    expect(shift(pavementPoints.C!, second)).toEqual(pavementPoints.N);
    expect(shift(pavementPoints.E!, second)).toEqual(pavementPoints.P);
    expect(shift(pavementTiles[8]!, vector(pavementPoints.B!, pavementPoints.M!))).toEqual(
      pavementTiles[11],
    );
    expect(area(crossOutline)).toBe(12);
  });
  it('checks every strip solution against all four corresponding polygon vertices', () => {
    const cases: [number, number, string, string][] = [
      [1, 10, 'A', 'D'],
      [2, 11, 'A', 'D'],
      [15, 6, 'F', 'C'],
      [11, 2, 'F', 'C'],
      [7, 9, 'D', "D'"],
      [13, 15, 'D', "D'"],
      [3, 7, "A'", 'C'],
      [4, 9, 'A', "B'"],
      [9, 13, "C'", 'E'],
    ];
    for (const [a, b, from, to] of cases) {
      const v = vector(stripPoints[from]!, stripPoints[to]!);
      expect(stripPolygon(a).map((p) => shift(p, v))).toEqual(stripPolygon(b));
    }
    for (let n = 1; n <= 15; n++) expect(area(stripPolygon(n))).toBe(4050);
  });
  it('checks the four lattice pairs have identical oriented outlines and all eight have equal area', () => {
    const pairs = [
      [1, 8],
      [2, 4],
      [3, 6],
      [5, 7],
    ];
    for (const [a, b] of pairs)
      expect(latticeFigures[a! - 1]!.shape).toBe(latticeFigures[b! - 1]!.shape);
    for (const outline of latticeOutlines) expect(area(outline)).toBe(5);
  });
});

describe('meaningful controls, not decorative animation', () => {
  it('moves the pavement copy by exactly the source displacement', () => {
    const { container } = render(<LessonOneLab spec={spec('pavement')} />);
    const before = container.querySelectorAll('polygon')[72]!.getAttribute('points');
    fireEvent.change(screen.getByRole('slider'), { target: { value: '100' } });
    const after = container.querySelectorAll('polygon')[72]!.getAttribute('points');
    const parse = (v: string | null) => v!.split(' ').map((s) => s.split(',').map(Number));
    parse(after).forEach((p, i) => {
      expect(p[0]! - parse(before)[i]![0]!).toBe(-192);
      expect(p[1]! - parse(before)[i]![1]!).toBe(0);
    });
  });
  it('changes the second radius without moving the common centre or changing 30 degrees', () => {
    const { container } = render(<LessonOneLab spec={spec('circles')} />);
    fireEvent.change(screen.getByRole('slider'), { target: { value: '100' } });
    const circles = container.querySelectorAll('circle');
    expect(circles[0]).toHaveAttribute('r', '130');
    expect(circles[1]).toHaveAttribute('r', '100');
    expect(circles[1]).toHaveAttribute('cx', '300');
    expect(within(screen.getByRole('img')).getByText('30°')).toBeInTheDocument();
  });
  it('draws the flag counterexample with opposite pole sides, not two translated copies', () => {
    const { container } = render(<LessonOneLab spec={spec('counter')} />);
    const paths = [...container.querySelectorAll('path')].map((p) => p.getAttribute('d'));
    // Blue pole is at the flag's right edge; red pole is at its left edge.
    expect(paths).toContain('M230 180V70H170V110H230');
    expect(paths).toContain('M260 180V70H320V110H260');
  });
  it('selects each valid grid polygon while keeping the seven source points fixed', () => {
    const { container } = render(<LessonOneLab spec={spec('grid')} />);
    const before = container.querySelector('polygon')!.getAttribute('points');
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'EDGF' } });
    expect(container.querySelector('polygon')!.getAttribute('points')).not.toBe(before);
    expect(container.querySelectorAll('circle')).toHaveLength(8);
    expect(screen.getByRole('combobox')).toHaveValue('EDGF');
  });
});
