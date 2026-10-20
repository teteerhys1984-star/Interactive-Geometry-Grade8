import { useMemo } from 'react';
import type { ConstructedDiagram } from '@/content/schema';
import { plainText } from '@/lib/bidi';
import { readFigureSpec } from '@/lib/geometryFigure';
import { FigureSvg } from './FigureSvg';

/**
 * `congruence-figure` — the Lesson 4 constructed renderer.
 *
 * Reads the declarative spec from `construction`, validates it, and draws it.
 * Invalid data renders nothing at all (never a wrong drawing): the same
 * contract the Lesson 2 labs follow.
 */
export function CongruenceFigure({ spec }: { spec: ConstructedDiagram }) {
  const figure = useMemo(() => readFigureSpec(spec.construction), [spec.construction]);
  if (!figure) return null;
  return <FigureSvg spec={figure} ariaLabel={plainText(spec.alt)} />;
}
