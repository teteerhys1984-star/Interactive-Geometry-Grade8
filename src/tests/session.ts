import type { AnswerMap, AnswerValue } from './schema';

/**
 * ============================================================================
 *  TEST AREA — SESSION STATE (sessionStorage)
 * ============================================================================
 *
 *  The whole platform is static: there is no backend, no account and no
 *  database. A learner's in-progress attempt lives in `sessionStorage` under a
 *  key UNIQUE PER TEST, so two tests can never mix their answers, and Restart
 *  can delete exactly one test's state without touching anything else.
 *
 *  Only RUNTIME data is stored: the typed answers, the current question index
 *  and whether the attempt was submitted. The result itself is never stored —
 *  it is always recomputed deterministically from the answers.
 * ============================================================================
 */

export const TEST_SESSION_PREFIX = 'geometry-g8:test-session:v1:';

export type TestSessionStatus = 'not-started' | 'in-progress' | 'submitted';

export interface TestSessionState {
  testId: string;
  answers: AnswerMap;
  /** Zero-based index of the question the learner is looking at. */
  currentIndex: number;
  submitted: boolean;
  updatedAt: number;
}

export function testSessionKey(testId: string): string {
  return `${TEST_SESSION_PREFIX}${testId}`;
}

const VALID_KINDS: ReadonlySet<string> = new Set<AnswerValue['kind']>([
  'single',
  'multi',
  'boolean',
  'numeric',
  'exact',
  'order',
  'matching',
  'classification',
]);

/** Keep only entries that at least LOOK like typed answers. */
function sanitiseAnswers(raw: unknown): AnswerMap {
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) return {};
  const output: AnswerMap = {};
  for (const [questionId, value] of Object.entries(raw as Record<string, unknown>)) {
    if (typeof value !== 'object' || value === null) continue;
    const kind = (value as { kind?: unknown }).kind;
    if (typeof kind !== 'string' || !VALID_KINDS.has(kind)) continue;
    output[questionId] = value as AnswerValue;
  }
  return output;
}

function sanitiseIndex(raw: unknown): number {
  if (typeof raw !== 'number' || !Number.isFinite(raw) || raw < 0) return 0;
  return Math.floor(raw);
}

export function loadTestSession(testId: string): TestSessionState | undefined {
  if (typeof sessionStorage === 'undefined') return undefined;
  const stored = sessionStorage.getItem(testSessionKey(testId));
  if (!stored) return undefined;
  try {
    const parsed = JSON.parse(stored) as Partial<TestSessionState>;
    if (!parsed || typeof parsed !== 'object') return undefined;
    return {
      testId,
      answers: sanitiseAnswers(parsed.answers),
      currentIndex: sanitiseIndex(parsed.currentIndex),
      submitted: parsed.submitted === true,
      updatedAt: typeof parsed.updatedAt === 'number' ? parsed.updatedAt : Date.now(),
    };
  } catch {
    return undefined;
  }
}

export function saveTestSession(state: Omit<TestSessionState, 'updatedAt'>): TestSessionState {
  const next: TestSessionState = { ...state, updatedAt: Date.now() };
  if (typeof sessionStorage !== 'undefined') {
    try {
      sessionStorage.setItem(testSessionKey(state.testId), JSON.stringify(next));
    } catch {
      /* Private mode / quota: an unfinished attempt may be lost, never fatal. */
    }
  }
  return next;
}

/** Removes one test's state — used by Restart and by "start over". */
export function clearTestSession(testId: string): void {
  if (typeof sessionStorage === 'undefined') return;
  sessionStorage.removeItem(testSessionKey(testId));
}

export function testSessionStatus(testId: string): TestSessionStatus {
  const session = loadTestSession(testId);
  if (!session) return 'not-started';
  if (session.submitted) return 'submitted';
  const hasAnswers = Object.keys(session.answers).length > 0;
  return hasAnswers || session.currentIndex > 0 ? 'in-progress' : 'not-started';
}

export const SESSION_STATUS_LABELS: Record<TestSessionStatus, string> = {
  'not-started': 'لم يبدأ',
  'in-progress': 'قيد الحل',
  submitted: 'مكتمل',
};

/**
 * Test-only helper: forget every test session in this browser profile.
 * Production code never calls this — Restart clears one test at a time.
 */
export function clearAllTestSessions(): void {
  if (typeof sessionStorage === 'undefined') return;
  const keys: string[] = [];
  for (let index = 0; index < sessionStorage.length; index += 1) {
    const key = sessionStorage.key(index);
    if (key && key.startsWith(TEST_SESSION_PREFIX)) keys.push(key);
  }
  for (const key of keys) sessionStorage.removeItem(key);
}
