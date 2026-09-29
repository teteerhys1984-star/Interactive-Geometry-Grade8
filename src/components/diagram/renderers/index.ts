import { registerConstructedRenderer, registerInteractiveRenderer } from '../registry';
import { TranslationFigure } from './TranslationFigure';
import { GridFigure } from './GridFigure';
import { ConstructionFigure } from './ConstructionFigure';
import { TranslationPlayground } from './TranslationPlayground';

/**
 * ============================================================================
 *  DIAGRAM RENDERERS
 * ============================================================================
 *
 *  Most registered renderers draw `origin: 'authored'` diagrams — teaching
 *  figures this platform designs itself, where the geometry is exact by
 *  construction.
 *
 *  A textbook figure is routed through a renderer ONLY when every coordinate
 *  it depends on was read from the scan and then verified arithmetically. That
 *  is the case for the two squared-paper figures of Lesson 2 (pages 8 and 10):
 *  the verification record is in docs/LESSON-02-FIGURES.md. Where geometry
 *  could not be verified, the figure stays a `reference` placeholder — see
 *  docs/LESSON-01-FIGURES.md.
 *
 *  This module is imported once from `src/main.tsx`, so registration is global.
 * ============================================================================
 */
registerConstructedRenderer('translation-figure', TranslationFigure);
registerInteractiveRenderer('grid-figure', GridFigure);
registerInteractiveRenderer('construction-figure', ConstructionFigure);
registerInteractiveRenderer('translation-playground', TranslationPlayground);

export { TranslationFigure, GridFigure, ConstructionFigure, TranslationPlayground };
