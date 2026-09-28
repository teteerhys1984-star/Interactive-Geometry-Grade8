/**
 * ============================================================================
 *  LEARNER PROGRESS — localStorage only
 * ============================================================================
 *
 *  This is a static GitHub Pages application: there is no backend, no database
 *  and no user account. Progress lives in the visitor's own browser and is
 *  neither synced nor authoritative. Clearing site data resets it.
 * ============================================================================
 */

const STORAGE_KEY = 'geometry-g8:progress:v1';

export interface LessonProgress {
  /** Ids of steps the learner has viewed. */
  completedStepIds: string[];
  /** Whether the learner reached the completion screen. */
  completed: boolean;
  /** Epoch milliseconds of the last interaction. */
  updatedAt: number;
}

export interface ProgressState {
  lessons: Record<string, LessonProgress>;
  /** Assessment id → best score percentage (0-100). */
  assessmentScores: Record<string, number>;
}

const emptyState: ProgressState = { lessons: {}, assessmentScores: {} };

function safeParse(raw: string | null): ProgressState {
  if (!raw) return { ...emptyState };
  try {
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      lessons: parsed.lessons ?? {},
      assessmentScores: parsed.assessmentScores ?? {},
    };
  } catch {
    return { ...emptyState };
  }
}

export function loadProgress(): ProgressState {
  if (typeof localStorage === 'undefined') return { ...emptyState };
  return safeParse(localStorage.getItem(STORAGE_KEY));
}

export function saveProgress(state: ProgressState): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* Quota or private-mode failures are non-fatal for a learning app. */
  }
}

export function markStepViewed(lessonId: string, stepId: string): ProgressState {
  const state = loadProgress();
  const current: LessonProgress = state.lessons[lessonId] ?? {
    completedStepIds: [],
    completed: false,
    updatedAt: Date.now(),
  };
  if (!current.completedStepIds.includes(stepId)) {
    current.completedStepIds = [...current.completedStepIds, stepId];
  }
  current.updatedAt = Date.now();
  const next: ProgressState = { ...state, lessons: { ...state.lessons, [lessonId]: current } };
  saveProgress(next);
  return next;
}

export function markLessonCompleted(lessonId: string): ProgressState {
  const state = loadProgress();
  const current: LessonProgress = state.lessons[lessonId] ?? {
    completedStepIds: [],
    completed: false,
    updatedAt: Date.now(),
  };
  const next: ProgressState = {
    ...state,
    lessons: {
      ...state.lessons,
      [lessonId]: { ...current, completed: true, updatedAt: Date.now() },
    },
  };
  saveProgress(next);
  return next;
}

export function recordAssessmentScore(assessmentId: string, score: number): ProgressState {
  const state = loadProgress();
  const best = Math.max(state.assessmentScores[assessmentId] ?? 0, score);
  const next: ProgressState = {
    ...state,
    assessmentScores: { ...state.assessmentScores, [assessmentId]: best },
  };
  saveProgress(next);
  return next;
}

export function resetProgress(): ProgressState {
  if (typeof localStorage !== 'undefined') localStorage.removeItem(STORAGE_KEY);
  return { ...emptyState };
}

export function isLessonCompleted(state: ProgressState, lessonId: string): boolean {
  return state.lessons[lessonId]?.completed ?? false;
}
