import { useMemo } from 'react';
import type { ConstructedDiagram } from '@/content/schema';
import { plainText } from '@/lib/bidi';
import { readFigureSpec } from '@/lib/geometryFigure';
import { FigureSvg } from '../lesson4/FigureSvg';

/**
 * `midline-figure` — the Lesson 8 constructed renderer.
 *
 * Reads the declarative spec from `construction`, validates it through the
 * shared `readFigureSpec` guard, and draws it with the shared `FigureSvg`.
 * Invalid data renders nothing at all: a malformed figure can degrade to
 * absence, never to a wrong drawing.
 */
export function MidlineFigure({ spec }: { spec: ConstructedDiagram }) {
  const figure = useMemo(() => readFigureSpec(spec.construction), [spec.construction]);
  if (!figure) return null;
  return <FigureSvg spec={figure} ariaLabel={plainText(spec.alt)} />;
}
