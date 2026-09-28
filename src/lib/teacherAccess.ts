/**
 * ============================================================================
 *  TEACHER AREA ACCESS GATE
 * ============================================================================
 *
 *  ⚠️  THIS IS NOT REAL SECURITY.  ⚠️
 *
 *  This application is a STATIC site hosted on GitHub Pages. There is no
 *  backend, no database and no server-side authentication. Everything shipped
 *  to the browser — including the shared passphrase below — is public and can
 *  be read by anyone who opens the built JavaScript bundle or the repository.
 *
 *  The gate exists purely as a CONVENIENCE SPEED BUMP so that students do not
 *  casually wander into teacher-facing views. It must never be used to protect
 *  exam answers, grades, personal data, or anything genuinely confidential.
 *
 *  If real protection is ever required it needs a real backend with real
 *  authentication, which is explicitly out of scope for this project.
 * ============================================================================
 */

/**
 * Shared classroom passphrase. Public by design — see the warning above.
 */
export const TEACHER_PASSPHRASE = 'somer173';

const STORAGE_KEY = 'geometry-g8:teacher-unlocked:v1';

export function isTeacherUnlocked(): boolean {
  if (typeof sessionStorage === 'undefined') return false;
  return sessionStorage.getItem(STORAGE_KEY) === 'true';
}

/** Returns true when the passphrase matches and the session was unlocked. */
export function unlockTeacherArea(passphrase: string): boolean {
  const ok = passphrase.trim() === TEACHER_PASSPHRASE;
  if (ok && typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem(STORAGE_KEY, 'true');
  }
  return ok;
}

export function lockTeacherArea(): void {
  if (typeof sessionStorage === 'undefined') return;
  sessionStorage.removeItem(STORAGE_KEY);
}
