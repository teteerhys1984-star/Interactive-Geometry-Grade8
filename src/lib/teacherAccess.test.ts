import { beforeEach, describe, expect, it } from 'vitest';
import { isTeacherUnlocked, lockTeacherArea, unlockTeacherArea } from './teacherAccess';

describe('teacher access gate (client-side only, NOT security)', () => {
  beforeEach(() => lockTeacherArea());

  it('starts locked', () => {
    expect(isTeacherUnlocked()).toBe(false);
  });

  it('rejects an incorrect passphrase', () => {
    expect(unlockTeacherArea('wrong')).toBe(false);
    expect(isTeacherUnlocked()).toBe(false);
  });

  it('unlocks with the shared passphrase and tolerates surrounding whitespace', () => {
    expect(unlockTeacherArea('  somer173 ')).toBe(true);
    expect(isTeacherUnlocked()).toBe(true);
  });

  it('can be locked again', () => {
    unlockTeacherArea('somer173');
    lockTeacherArea();
    expect(isTeacherUnlocked()).toBe(false);
  });
});
