/**
 * ============================================================================
 *  BIDI UTILITIES
 * ============================================================================
 *
 *  The page is Arabic RTL. Mathematical and geometric notation is inherently
 *  LTR. When the two mix in one paragraph the Unicode Bidirectional Algorithm
 *  will happily reorder "AB = 5 cm" into something wrong unless each LTR run is
 *  explicitly isolated.
 *
 *  Strategy (two complementary layers):
 *    1. STRUCTURAL — the <LtrIsolate> component wraps notation in an element
 *       with dir="ltr" and unicode-bidi: isolate. This is the primary mechanism.
 *    2. TEXTUAL — Unicode isolate control characters (LRI/PDI) for cases where
 *       an element boundary is unavailable (e.g. alt text, document titles,
 *       aria-labels).
 * ============================================================================
 */

/** U+2066 LEFT-TO-RIGHT ISOLATE */
export const LRI = '\u2066';
/** U+2067 RIGHT-TO-LEFT ISOLATE */
export const RLI = '\u2067';
/** U+2068 FIRST STRONG ISOLATE */
export const FSI = '\u2068';
/** U+2069 POP DIRECTIONAL ISOLATE */
export const PDI = '\u2069';

/**
 * Wrap a string in LRI…PDI so it renders left-to-right inside Arabic text
 * even when no HTML element boundary is available.
 */
export function isolateLtr(text: string): string {
  return `${LRI}${text}${PDI}`;
}

/** Wrap a string in FSI…PDI — direction inferred from its first strong character. */
export function isolateAuto(text: string): string {
  return `${FSI}${text}${PDI}`;
}

/** Remove any isolate control characters (useful for tests and comparisons). */
export function stripIsolates(text: string): string {
  return text.replace(/[\u2066\u2067\u2068\u2069\u202a-\u202e]/g, '');
}

/**
 * Characters that are direction-neutral or LTR and therefore dangerous when
 * they appear bare inside Arabic prose: geometric relations, Latin point
 * labels, digits with operators, etc.
 */
export const GEOMETRY_NOTATION_PATTERN = /[∠△∡⊾⟂∥≅≈≠≤≥→↔¯‾]|\b[A-Z]{2,4}\b|\d+\s*[°+\-×÷=]/u;

/**
 * Heuristic used by the source-fidelity tests: does this Arabic string contain
 * bare mathematical/geometric notation that is NOT already isolated?
 *
 * Inline math written with $…$ delimiters is considered safe, because the
 * renderer converts it into an isolated <Math> element.
 */
export function hasUnisolatedNotation(text: string): boolean {
  const withoutInlineMath = text.replace(/\$[^$]*\$/g, '');
  const withoutIsolatedRuns = withoutInlineMath.replace(/\u2066[^\u2069]*\u2069/g, '');
  return GEOMETRY_NOTATION_PATTERN.test(withoutIsolatedRuns);
}

/**
 * Split a string on `$…$` inline-math delimiters into ordered segments so the
 * renderer can isolate each math run structurally.
 */
export interface TextSegment {
  type: 'text' | 'math' | 'circled';
  value: string;
}

/**
 * Strip `$…$` delimiters, leaving the bare source. Used for contexts that
 * cannot contain markup, such as an `<img alt>` attribute.
 */
export function plainText(text: string): string {
  return text.replace(/\$([^$]+)\$/g, '$1');
}

/**
 * Enclosed alphanumerics (U+2460 ① … U+24FF) have Unicode bidi class L.
 * The textbook uses them heavily as object identifiers inside Arabic prose
 * ("الحجر ①", "متوازي الأضلاع ⑮"), so each run is isolated structurally to
 * keep it anchored where the author wrote it.
 */
export const CIRCLED_RUN_PATTERN = /[\u2460-\u24FF]+/g;

export function splitInlineMath(text: string): TextSegment[] {
  const segments: TextSegment[] = [];
  const pattern = /\$([^$]+)\$/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  const pushText = (value: string) => {
    if (!value) return;
    // Secondary pass: isolate runs of enclosed numerals (①②③ …) inside prose.
    let cursor = 0;
    let circled: RegExpExecArray | null;
    const circledPattern = new RegExp(CIRCLED_RUN_PATTERN.source, 'g');
    while ((circled = circledPattern.exec(value)) !== null) {
      if (circled.index > cursor) {
        segments.push({ type: 'text', value: value.slice(cursor, circled.index) });
      }
      segments.push({ type: 'circled', value: circled[0] });
      cursor = circled.index + circled[0].length;
    }
    if (cursor < value.length) segments.push({ type: 'text', value: value.slice(cursor) });
  };

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) pushText(text.slice(lastIndex, match.index));
    segments.push({ type: 'math', value: match[1] ?? '' });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) pushText(text.slice(lastIndex));
  return segments;
}
