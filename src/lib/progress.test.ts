import { beforeEach, describe, expect, it } from 'vitest';
import {
  isLessonCompleted,
  loadProgress,
  markLessonCompleted,
  markStepViewed,
  recordAssessmentScore,
  resetProgress,
} from './progress';

describe('progress (localStorage only, no backend)', () => {
  beforeEach(() => resetProgress());

  it('starts empty', () => {
    expect(loadProgress()).toEqual({ lessons: {}, assessmentScores: {} });
  });

  it('records viewed steps without duplicates', () => {
    markStepViewed('lesson-a', 'step-1');
    markStepViewed('lesson-a', 'step-1');
    markStepViewed('lesson-a', 'step-2');
    expect(loadProgress().lessons['lesson-a']?.completedStepIds).toEqual(['step-1', 'step-2']);
  });

  it('marks a lesson completed', () => {
    markLessonCompleted('lesson-a');
    expect(isLessonCompleted(loadProgress(), 'lesson-a')).toBe(true);
    expect(isLessonCompleted(loadProgress(), 'lesson-b')).toBe(false);
  });

  it('keeps only the best assessment score', () => {
    recordAssessmentScore('final', 40);
    recordAssessmentScore('final', 90);
    recordAssessmentScore('final', 60);
    expect(loadProgress().assessmentScores['final']).toBe(90);
  });

  it('recovers from corrupted storage', () => {
    localStorage.setItem('geometry-g8:progress:v1', 'not json');
    expect(loadProgress()).toEqual({ lessons: {}, assessmentScores: {} });
  });
});
