/**
 * ============================================================================
 *  PER-LESSON COLOUR IDENTITY
 * ============================================================================
 *
 *  Each lesson may carry its own accent palette so a student can tell at a
 *  glance which lesson they are in, WITHOUT the platform losing its identity:
 *  a theme only re-points a handful of colour tokens (primary, accent and the
 *  teaching-card trio). Layout, spacing, typography and contrast rules are
 *  shared and never themed.
 *
 *  The value is written to `data-lesson-theme` on the page root; the palettes
 *  live in `src/styles/tokens.css`. A lesson with no entry here simply keeps
 *  the default palette — which is why Lesson 1 looks exactly as it did.
 * ============================================================================
 */
const LESSON_THEMES: Record<string, string> = {
  'lesson-02-image-of-a-point': 'teal',
  'lesson-03-image-of-a-shape': 'indigo',
  'lesson-05-unit-one-exercises': 'emerald',
  'lesson-06-unit-one-exercises-continuation': 'sunset',
};

export function lessonTheme(lessonId: string | undefined): string | undefined {
  if (!lessonId) return undefined;
  return LESSON_THEMES[lessonId];
}
