import { testFigure } from './authoring';
import type { SourceRef } from '@/content/schema';

/**
 * The two compass circles in a translation construction can meet in two
 * points. The display coordinates below are one schematic realization of the
 * two circle constraints; no coordinate grid or measurement is shown. The same scene is
 * reused for the lesson and unit questions with only the named translation
 * endpoints changed.
 */
export function compassIntersectionFigure(input: {
  id: string;
  startLabel: string;
  endLabel: string;
  alt: string;
  caption: string;
  sourceRefs: SourceRef[];
}) {
  const { startLabel, endLabel } = input;
  return testFigure({
    id: input.id,
    alt: input.alt,
    caption: input.caption,
    sourceRefs: input.sourceRefs,
    spec: {
      points: [
        { id: startLabel, x: 0, y: 0, labelSide: 'sw' },
        { id: endLabel, x: 4, y: 1, labelSide: 'e' },
        { id: 'M', x: 1, y: 3, labelSide: 'nw' },
        { id: 'X', x: 5, y: 4, mark: 'open', labelSide: 'ne' },
        { id: 'Y', x: 21 / 13, y: -14 / 13, mark: 'open', labelSide: 's' },
      ],
      circles: [
        { center: 'M', radius: Math.sqrt(17), dashed: true },
        { center: endLabel, radius: Math.sqrt(10), dashed: true },
      ],
      segments: [{ from: startLabel, to: endLabel, arrow: 'end' }],
      questionLabels: [startLabel, endLabel, 'M', 'X', 'Y'],
    },
  });
}
