/**
 * ============================================================================
 *  FIGURE TYPOGRAPHY — one type scale for every Lesson 4 drawing
 * ============================================================================
 *
 *  A figure SVG is laid out by its WIDTH: the component is `inline-size: 100%`,
 *  so a length written in the drawing's user units appears on screen as
 *
 *      screenPx = userUnits × (renderedWidth / viewBox.w)
 *
 *  Sizing the lettering from `min(viewBox.w, viewBox.h)` — the previous rule —
 *  therefore made the same letter 10.9 px in one figure and 44 px in another,
 *  because the windows have very different aspect ratios. The only scale that
 *  is stable across figures is the window WIDTH, so every size below is
 *  expressed in CSS pixels at one reference width and converted with
 *  `unitsPerPixel = viewBox.w / REFERENCE_FIGURE_WIDTH`.
 *
 *  Sizes are split by role, because these are different kinds of ink. The
 *  values below are CSS pixels at the reference width:
 *
 *    vertex   16.0 px   A, B′, C…      a vertex letter is a name
 *    measure  15.5 px   14.4, 3, 8     a value printed for a side
 *    angle    15.0 px   35°, 85°       the value of one angle arc
 *    frame    14.0 px   ① ② ③         panel numbers, the quietest
 *
 *  The vertex size is deliberately the size of the page's own body text
 *  (1 rem = 16 px; prose sits at ≈ 16.5 px), so a name is READ, not displayed.
 *  A name larger than the sentence around it makes a diagram shout: the
 *  previous 19 px set a name 23 % larger than the value it labels (15.5 px)
 *  and 15 % larger than the prose. The weight does the distinguishing: vertex
 *  letters are semi-bold (600), values are not. The roles stay separate in
 *  size too, so a value is still quieter (15.5 px) than the name it belongs to.
 *
 *  `FigureSpec.labelScale` multiplies the MEASUREMENT roles (measure, angle,
 *  frame) for a figure that is measurably denser than usual. It deliberately
 *  does NOT touch vertex names. A name is a name: if the scale moved it too, a
 *  dense figure would draw its names smaller than the rest of the lesson's
 *  (at 16 px, «تدرّب ②»'s 0.82 would give 13.1 px — 0.4 px from
 *  the 12.7 px values it labels, so the roles would read as one size again).
 *  Crowding is a problem with the values, and that is what the scale adjusts.
 *  The one figure that uses it is documented, with the measurements behind the
 *  decision, in `lesson-04-figures.ts`.
 * ============================================================================
 */

import type { FigureSpec } from './geometryFigure';

/**
 * The width at which a figure is designed to be read: the lesson article's
 * inner width on a laptop (≈ 75 rem page, 17 rem sidebar, article padding).
 */
export const REFERENCE_FIGURE_WIDTH = 750;

/** Target on-screen sizes, in CSS pixels, at `REFERENCE_FIGURE_WIDTH`. */
export const TYPOGRAPHY_PX = {
  /**
   * Vertex names (A, B, C, A′). Body size on purpose: a name is read, not
   * displayed, and this is the one role `labelScale` never shrinks.
   */
  vertex: 16,
  /** Printed values (14.4, 3, 8). */
  measure: 15.5,
  /** Values of an angle arc (35°, 85°). */
  angle: 15,
  /** Panel numbers of a multi-panel figure (① ② ③). */
  frame: 14,
  /** Stroke width of a side. */
  stroke: 2.1,
  /** Radius of a printed vertex dot. */
  dotRadius: 3.4,
  /** Half-length of one equality tick. */
  tick: 5.4,
  /** Default radius of an angle arc. */
  arcRadius: 18,
  /** Half-size of the square that marks a right angle. */
  rightAngle: 13,
} as const;

export interface FigureTypography {
  /** Drawing units per CSS pixel at the reference width. */
  unitsPerPixel: number;
  vertex: number;
  measure: number;
  angle: number;
  frame: number;
  stroke: number;
  dotRadius: number;
  tick: number;
  arcRadius: number;
  rightAngle: number;
  /** `labelScale` — 1 unless the figure overrides it. */
  scale: number;
}

/**
 * All sizes for one figure. `labelScale` is applied to the measurement roles
 * only (see the header): a name keeps the lesson's one size, because a name
 * smaller than the value beside it is a defect, not a fit. Line weight, dots
 * and ticks describe the geometry, not the lettering, so a reading-size
 * override must not thicken the drawing either.
 */
export function figureTypography(spec: FigureSpec): FigureTypography {
  const unitsPerPixel = spec.viewBox.w / REFERENCE_FIGURE_WIDTH;
  const scale = spec.labelScale && spec.labelScale > 0 ? spec.labelScale : 1;
  /** Size in drawing units; `scaled` roles follow `labelScale`. */
  const type = (px: number, scaled = true) => px * unitsPerPixel * (scaled ? scale : 1);
  return {
    unitsPerPixel,
    // A name is a name whatever the drawing's density: the scale stops here.
    vertex: type(TYPOGRAPHY_PX.vertex, false),
    measure: type(TYPOGRAPHY_PX.measure),
    angle: type(TYPOGRAPHY_PX.angle),
    frame: type(TYPOGRAPHY_PX.frame),
    stroke: TYPOGRAPHY_PX.stroke * unitsPerPixel,
    dotRadius: TYPOGRAPHY_PX.dotRadius * unitsPerPixel,
    tick: TYPOGRAPHY_PX.tick * unitsPerPixel,
    arcRadius: TYPOGRAPHY_PX.arcRadius * unitsPerPixel,
    rightAngle: TYPOGRAPHY_PX.rightAngle * unitsPerPixel,
    scale,
  };
}

/**
 * The on-screen size a figure's type will actually have at a given render
 * width. Used by the tests that assert every figure keeps the same scale, and
 * by the audit in `docs/LESSON-04-LABEL-AUDIT.md`.
 */
export function onScreenFontSize(
  spec: FigureSpec,
  role: 'vertex' | 'measure' | 'angle' | 'frame' = 'vertex',
  renderWidth = REFERENCE_FIGURE_WIDTH,
): number {
  const typography = figureTypography(spec);
  return typography[role] * (renderWidth / spec.viewBox.w);
}

/**
 * Vertical extent of a label placed with `dominant-baseline: middle`.
 * Cap height plus descender, with a little air, expressed as a fraction of the
 * font size. A slightly oversized box is what keeps a haloed glyph off a line.
 */
export const LABEL_BOX_HEIGHT = 1.08;

/**
 * Height of one label box, in the figure's own drawing units. Content that
 * wants to put a value at a deliberate distance (an angle value inside its
 * angle, say) expresses that distance in label heights, so the layout keeps
 * its proportions at every figure width and font size.
 */
export function labelHeight(
  viewBoxWidth: number,
  role: 'vertex' | 'measure' | 'angle' | 'frame' = 'measure',
): number {
  return TYPOGRAPHY_PX[role] * (viewBoxWidth / REFERENCE_FIGURE_WIDTH) * LABEL_BOX_HEIGHT;
}

/* --------------------------------------------------------------------------
 *  Text metrics
 *  The renderer needs a box for every label before it can guarantee that the
 *  label clears the geometry. Browsers cannot measure text during a pure
 *  render, and a box that changes with the font would break the tests, so the
 *  widths are estimated from conservative per-character ratios of the font's
 *  em square. The estimates are deliberately generous: a label that is placed
 *  with a slightly larger box can only end up further from the ink.
 * ----------------------------------------------------------------------- */

const WIDTH_RATIO: Record<string, number> = {
  ' ': 0.3,
  '.': 0.3,
  ',': 0.3,
  ':': 0.3,
  '°': 0.48,
  '′': 0.34,
  '″': 0.42,
  '=': 0.62,
};

function widthRatio(character: string): number {
  const known = WIDTH_RATIO[character];
  if (known !== undefined) return known;
  if (/[0-9]/.test(character)) return 0.58;
  if (/[A-Z]/.test(character)) return 0.68;
  if (/[a-z]/.test(character)) return 0.52;
  // Arabic letters (the frame numbers are not Arabic, but captions inside a
  // figure may be): Naskh is wider than a Latin lowercase.
  if (/[\u0600-\u06ff]/.test(character)) return 0.56;
  return 0.62;
}

/** Estimated advance width of `text` at `fontSize`. */
export function textWidth(text: string, fontSize: number): number {
  let em = 0;
  for (const character of Array.from(text)) em += widthRatio(character);
  return em * fontSize;
}
