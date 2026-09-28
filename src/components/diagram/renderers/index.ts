import { registerConstructedRenderer } from '../registry';
import { TranslationFigure } from './TranslationFigure';

/**
 * ============================================================================
 *  DIAGRAM RENDERERS
 * ============================================================================
 *
 *  Registered renderers are used ONLY for `origin: 'authored'` diagrams —
 *  teaching figures this platform designs itself, where the geometry is exact
 *  by construction.
 *
 *  Textbook figures are never routed through a renderer unless their geometry
 *  has been verified from a legible scan. Where it has not, they remain
 *  `reference` placeholders. See docs/LESSON-01-FIGURES.md.
 *
 *  This module is imported once from `src/main.tsx`, so registration is global.
 * ============================================================================
 */
registerConstructedRenderer('translation-figure', TranslationFigure);

export { TranslationFigure };
