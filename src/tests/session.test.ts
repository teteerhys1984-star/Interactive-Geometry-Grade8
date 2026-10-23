import { beforeEach, describe, expect, it } from 'vitest';
import {
  clearTestSession,
  loadTestSession,
  saveTestSession,
  testSessionKey,
  testSessionStatus,
} from './session';
import { answers } from './scoring';

beforeEach(() => {
  sessionStorage.clear();
});

describe('Test Domain session contract', () => {
  it('keeps the existing per-test sessionStorage key and round-trips new typed answers', () => {
    saveTestSession({
      testId: 'lesson-foundation-test',
      answers: {
        'q-short': answers.shortAnswer('انسحاب'),
        'q-fill': answers.fillIn({ first: 'أ', second: 'ب' }),
        'q-parts': answers.multiPart({
          first: answers.single('option-a'),
        }),
      },
      currentIndex: 2,
      submitted: false,
    });

    expect(sessionStorage.getItem(testSessionKey('lesson-foundation-test'))).toBeTruthy();
    expect(loadTestSession('lesson-foundation-test')).toMatchObject({
      testId: 'lesson-foundation-test',
      currentIndex: 2,
      submitted: false,
      answers: {
        'q-short': { kind: 'short-answer', raw: 'انسحاب' },
        'q-fill': { kind: 'fill-in', values: { first: 'أ', second: 'ب' } },
        'q-parts': { kind: 'multi-part' },
      },
    });
    expect(testSessionStatus('lesson-foundation-test')).toBe('in-progress');
  });

  it('sanitises malformed persisted answers without changing the v1 storage model', () => {
    sessionStorage.setItem(
      testSessionKey('legacy-test'),
      JSON.stringify({
        answers: {
          valid: { kind: 'short-answer', raw: 'مصطلح' },
          malformed: { kind: 'short-answer', raw: 12 },
          unknown: { kind: 'not-an-answer', value: true },
          malformedParts: { kind: 'multi-part', parts: { p: { kind: 'short-answer' } } },
        },
        currentIndex: 4.8,
        submitted: true,
      }),
    );

    expect(loadTestSession('legacy-test')).toMatchObject({
      currentIndex: 4,
      submitted: true,
      answers: { valid: { kind: 'short-answer', raw: 'مصطلح' } },
    });
    expect(testSessionStatus('legacy-test')).toBe('submitted');
  });

  it('clears one test only', () => {
    saveTestSession({ testId: 'test-a', answers: {}, currentIndex: 0, submitted: false });
    saveTestSession({ testId: 'test-b', answers: {}, currentIndex: 0, submitted: false });
    clearTestSession('test-a');
    expect(loadTestSession('test-a')).toBeUndefined();
    expect(loadTestSession('test-b')).toBeDefined();
  });
});
