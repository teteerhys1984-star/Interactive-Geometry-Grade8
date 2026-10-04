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
  /** Per-lesson Teacher Area — solutions, answer key, figure report, notes. */
  teacherLesson: (lessonId: string) => `/teacher/${lessonId}`,
  /** Test Area home — lesson tests, unit tests and the Solutions Area. */
  tests: () => '/tests',
  /** One test: intro → questions → result, driven by its own definition id. */
  test: (testId: string) => `/tests/${testId}`,
  /** Solutions Area index. */
  testSolutions: () => '/tests/solutions',
  /** One test's worked solutions, grouped for reading. */
  testSolutionSet: (testId: string) => `/tests/solutions/${testId}`,
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
  teacherLesson: '/teacher/:lessonId',
  tests: '/tests',
  test: '/tests/:testId',
  testSolutions: '/tests/solutions',
  testSolutionSet: '/tests/solutions/:testId',
  notFound: '*',
} as const;
