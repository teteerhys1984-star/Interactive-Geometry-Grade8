import { describe, expect, it } from 'vitest';
import {
  primedFigure,
  readFigureSpec,
  translateFigure,
  type FigureSpec,
} from '@/lib/geometryFigure';
import {
  casesLabCases,
  casesLabDiagram,
  figureDefinitionPair,
  figureKite,
  figureKitePairs,
  figurePairs,
  figureTranslationImage,
  figureTranslationIntro,
  fig17Cases,
  fig18Asa,
  fig18Sas,
  fig18Sss,
  fig19Check,
  fig19Isosceles,
  fig19Kite,
  fig19Pairs,
  kiteLabDiagram,
  practicePairsDiagram,
  proofLabDiagram,
  teacherActivityFigure,
  teacherCheckFigure,
  teacherIsoscelesFigure,
  teacherKiteFigure,
} from '@/content/units/lesson-04-figures';
import type { InteractiveDiagram } from '@/content/schema';
import {
  readCases,
  readChoiceTasks,
  readFigure,
  readPairOptions,
  readPoint,
  readText,
} from './params';

/**
 * ============================================================================
 *  LESSON 4 — the reader side of the figure / lab contract
 * ============================================================================
 *
 *  The renderers receive their geometry through `DiagramSpec.params`, i.e. as
 *  plain JSON-shaped `unknown`. Every reader must return `null` (or a fallback)
 *  on malformed input rather than draw something misleading, and every figure
 *  authored for Lesson 4 must survive `readFigureSpec`.
 *
 *  The last block feeds the REAL content objects through the REAL readers, so a
 *  figure that stops being readable fails here instead of becoming an empty box
 *  inside the lesson.
 * ============================================================================
 */

const minimal: FigureSpec = {
  viewBox: { x: 0, y: 0, w: 6, h: 5 },
  points: [
    { at: [0, 0], label: 'A' },
    { at: [4, 0], label: 'B' },
    { at: [0, 3], label: 'C' },
  ],
  segments: [{ from: [0, 0], to: [4, 0] }],
};

describe('readFigureSpec — accepts well-formed figures', () => {
  it('keeps the viewBox, the points and the segments', () => {
    const figure = readFigureSpec(minimal);
    expect(figure).not.toBeNull();
    expect(figure!.viewBox).toEqual(minimal.viewBox);
    expect(figure!.points).toEqual(minimal.points);
    expect(figure!.segments).toEqual([{ from: [0, 0], to: [4, 0], dashed: false, arrow: false }]);
  });

  it('keeps polygons, angle arcs, right angles and free text', () => {
    const figure: FigureSpec = {
      ...minimal,
      polygons: [
        {
          points: [
            [0, 0],
            [4, 0],
            [0, 3],
          ],
          fill: true,
        },
      ],
      angles: [
        { at: [0, 0], from: [4, 0], to: [0, 3], label: '35°' },
        { at: [0, 3], from: [0, 0], to: [4, 0], right: true },
      ],
      texts: [{ at: [1, 1], text: 'توضيح' }],
      frames: [{ x: 0, y: 0, w: 6, h: 5, label: '①' }],
    };
    const read = readFigureSpec(figure)!;
    expect(read.polygons).toHaveLength(1);
    expect(read.angles).toHaveLength(2);
    expect(read.angles![1]!.right).toBe(true);
    expect(read.texts).toHaveLength(1);
    expect(read.frames).toHaveLength(1);
  });

  it('keeps equality ticks and dashes on a segment', () => {
    const read = readFigureSpec({
      ...minimal,
      segments: [{ from: [0, 0], to: [4, 0], ticks: 2, dashed: true }],
    })!;
    expect(read.segments![0]!.ticks).toBe(2);
    expect(read.segments![0]!.dashed).toBe(true);
  });
});

describe('readFigureSpec — rejects malformed figures', () => {
  it.each([
    ['null', null],
    ['a string', 'figure'],
    ['an array', []],
    ['no viewBox', { points: [] }],
    ['a partial viewBox', { viewBox: { x: 0, y: 0, w: 6 } }],
    ['a zero-width viewBox', { viewBox: { x: 0, y: 0, w: 0, h: 5 } }],
    ['a point with one coordinate', { ...minimal, points: [{ at: [0], label: 'A' }] }],
    [
      'a point with a NaN coordinate',
      { ...minimal, points: [{ at: [0, Number.NaN], label: 'A' }] },
    ],
    ['a point without a label', { ...minimal, points: [{ at: [0, 0] }] }],
    ['a segment without endpoints', { ...minimal, segments: [{}] }],
    ['a segment string', { ...minimal, segments: 'AB' }],
    [
      'a polygon with two vertices',
      {
        ...minimal,
        polygons: [
          {
            points: [
              [0, 0],
              [1, 1],
            ],
          },
        ],
      },
    ],
    ['an angle missing a side', { ...minimal, angles: [{ at: [0, 0], from: [1, 0] }] }],
  ])('returns null for %s', (_label, value) => {
    expect(readFigureSpec(value)).toBeNull();
  });

  it('invalidates the whole figure when ONE entry is bad', () => {
    // A drawing that silently drops a vertex or a right-angle mark is worse
    // than no drawing: the reader is deliberately all-or-nothing.
    const figure = {
      ...minimal,
      segments: [
        { from: [0, 0], to: [4, 0] },
        { from: [0, 0], to: 'B' },
      ],
    };
    expect(readFigureSpec(figure)).toBeNull();
  });
});

describe('translateFigure / primedFigure', () => {
  it('moves every coordinate by the same vector, leaving the source intact', () => {
    const moved = translateFigure(minimal, 2, 5);
    expect(moved.points!.map((point) => point.at)).toEqual([
      [2, 5],
      [6, 5],
      [2, 8],
    ]);
    expect(moved.segments![0]!.from).toEqual([2, 5]);
    // The source spec is never mutated.
    expect(minimal.points![0]!.at).toEqual([0, 0]);
  });

  it('renames every image point with a prime and keeps the segments', () => {
    const image = primedFigure(translateFigure(minimal, 2, 5));
    expect(image.points!.map((point) => point.label)).toEqual(['A′', 'B′', 'C′']);
    // The image is a rigid copy: all three sides keep their lengths.
    const lengths = (spec: FigureSpec) =>
      spec.points!.map((point, index) => {
        const next = spec.points![(index + 1) % spec.points!.length]!;
        return Math.hypot(next.at[0] - point.at[0], next.at[1] - point.at[1]);
      });
    lengths(image).forEach((value, index) => {
      expect(value).toBeCloseTo(lengths(minimal)[index]!, 10);
    });
  });
});

describe('lesson-4 param readers', () => {
  it('readText falls back on blank or non-string input', () => {
    expect(readText('نص', 'بديل')).toBe('نص');
    expect(readText('   ', 'بديل')).toBe('بديل');
    expect(readText(undefined, 'بديل')).toBe('بديل');
    expect(readText(7, 'بديل')).toBe('بديل');
  });

  it('readPoint accepts only a finite pair', () => {
    expect(readPoint([1, 2])).toEqual([1, 2]);
    expect(readPoint([1])).toBeNull();
    expect(readPoint(['1', 2])).toBeNull();
    expect(readPoint(null)).toBeNull();
  });

  it('readFigure is readFigureSpec', () => {
    expect(readFigure(minimal)).not.toBeNull();
    expect(readFigure({ viewBox: null })).toBeNull();
  });

  it('readChoiceTasks rejects a task whose answer is not one of its options', () => {
    const task = {
      id: 't1',
      prompt: 'أيّ حالة؟',
      answer: 'a',
      reason: 'لأن الضلعين والزاوية المحصورة بينهما.',
      options: [
        { id: 'a', label: 'ضلعان وزاوية محصورة' },
        { id: 'b', label: 'ثلاثة أضلاع' },
      ],
    };
    expect(readChoiceTasks([task])).toHaveLength(1);
    expect(readChoiceTasks([{ ...task, answer: 'zzz' }])).toBeNull();
    expect(readChoiceTasks([{ ...task, options: [{ id: 'a', label: 'x' }] }])).toBeNull();
    expect(readChoiceTasks([])).toBeNull();
    expect(readChoiceTasks('tasks')).toBeNull();
  });

  it('readPairOptions rejects a non-boolean verdict', () => {
    const options = [
      { id: 'p1', label: '①', answer: true, reason: 'ضلعان وزاوية محصورة.' },
      { id: 'p2', label: '②', answer: false, reason: 'زاوية غير محصورة.' },
    ];
    expect(readPairOptions(options)).toHaveLength(2);
    expect(readPairOptions([{ ...options[0]!, answer: 'yes' }, options[1]!])).toBeNull();
    expect(readPairOptions([options[0]!])).toBeNull();
  });

  it('readCases needs both figures, three points and an id/label', () => {
    const cases = readCases(casesLabCases)!;
    expect(cases).not.toBeNull();
    expect(cases).toHaveLength(casesLabCases.length);
    for (const item of cases) {
      expect(item.given.points!.length).toBeGreaterThan(0);
      expect(item.triangle.A).toHaveLength(2);
    }
    expect(readCases([{ ...casesLabCases[0], triangle: { A: [0, 0] } }])).toBeNull();
    expect(readCases('cases')).toBeNull();
  });
});

describe('every Lesson 4 figure and lab survives its reader', () => {
  const textbookFigures = {
    fig17Cases,
    fig18Sas,
    fig18Asa,
    fig18Sss,
    fig19Check,
    fig19Kite,
    fig19Pairs,
    fig19Isosceles,
  };

  const authoredFigures = {
    teacherActivityFigure,
    teacherCheckFigure,
    teacherKiteFigure,
    teacherIsoscelesFigure,
  };

  const rawFigures = {
    figureKite,
    figurePairs,
    figureKitePairs,
    figureTranslationIntro,
    figureTranslationImage,
    figureDefinitionPair,
  };

  it.each(Object.entries(textbookFigures))('reads the textbook spec of %s', (_name, spec) => {
    expect(readFigure(spec.construction)).not.toBeNull();
  });

  it.each(Object.entries(authoredFigures))('reads the authored overlay %s', (_name, spec) => {
    expect(readFigure(spec.construction)).not.toBeNull();
  });

  it.each(Object.entries(rawFigures))('reads the raw figure %s', (_name, spec) => {
    expect(readFigure(spec)).not.toBeNull();
  });

  it('reads and validates every lab case through its own reader', () => {
    const cases = readCases(casesLabDiagram.params!.cases)!;
    expect(cases).toHaveLength(3);
    expect(cases.map((item) => item.id)).toEqual(['sas', 'asa', 'sss']);
    // Only case ② is handed to the student unfinished — that is the panel the
    // book asks them to complete: its givens carry no vertex B, while the
    // completed figure closes the two printed rays at B.
    const hasB = (figure: { points?: { label: string }[] }) =>
      (figure.points ?? []).some((point) => point.label === 'B');
    const unfinished = cases.filter((item) => !hasB(item.given) && hasB(item.completed));
    expect(unfinished.map((item) => item.id)).toEqual(['asa']);
    for (const item of cases) {
      expect(item.name.length).toBeGreaterThan(0);
      expect(item.note.length).toBeGreaterThan(0);
      expect(item.completed.points!.length).toBeGreaterThanOrEqual(item.given.points!.length);
      // A completed drawing may never keep the open rays: they used to run past
      // B and cross outside the triangle.
      if (item.id === 'asa') {
        expect(item.given.segments).toHaveLength(4);
        expect(item.completed.segments).toHaveLength(4);
      }
    }
  });

  it('reads the tasks of both justification labs', () => {
    for (const [name, diagram] of [
      ['practicePairs', practicePairsDiagram],
      ['proof', proofLabDiagram],
    ] as [string, InteractiveDiagram][]) {
      const tasks = readChoiceTasks(diagram.params!.tasks)!;
      expect(tasks, name).not.toBeNull();
      expect(tasks.length, name).toBeGreaterThanOrEqual(3);
      for (const task of tasks) {
        expect(
          task.options.map((option) => option.id),
          name,
        ).toContain(task.answer);
      }
    }
    expect(readFigure(practicePairsDiagram.params!.figure)).not.toBeNull();
    expect(readFigure(proofLabDiagram.params!.figure)).not.toBeNull();
  });

  it('reads the kite lab options and keeps exactly three verdicts true', () => {
    const options = readPairOptions(kiteLabDiagram.params!.options)!;
    expect(options.length).toBeGreaterThanOrEqual(3);
    expect(options.filter((option) => option.answer)).toHaveLength(3);
    // Every verdict carries a reason: the lab may not grade without one.
    for (const option of options) expect(option.reason.length).toBeGreaterThan(10);
  });
});
