/**
 * Centralised route builders.
 *
 * Components never hand-write URLs. Changing the URL shape is a single edit
 * here. Routes are consumed by HashRouter, so the deployed URLs look like
 * `https://<owner>.github.io/Interactive-Geometry-Grade8/#/unit/unit-01`.
 */
export const routes = {
  home: () => '/',
  subject: (subjectId: string) => `/subject/${subjectId}`,
  unit: (unitId: string) => `/unit/${unitId}`,
  lesson: (lessonId: string) => `/lesson/${lessonId}`,
  /** `step` is 1-based in the URL for human readability. */
  lessonStep: (lessonId: string, step: number) => `/lesson/${lessonId}/step/${step}`,
  lessonCompletion: (lessonId: string) => `/lesson/${lessonId}/done`,
  assessment: (scopeId: string) => `/assessment/${scopeId}`,
  teacher: () => '/teacher',
} as const;

/** Route path patterns used by the router definition. */
export const routePatterns = {
  home: '/',
  subject: '/subject/:subjectId',
  unit: '/unit/:unitId',
  lesson: '/lesson/:lessonId',
  lessonStep: '/lesson/:lessonId/step/:step',
  lessonCompletion: '/lesson/:lessonId/done',
  assessment: '/assessment/:scopeId',
  teacher: '/teacher',
  notFound: '*',
} as const;
