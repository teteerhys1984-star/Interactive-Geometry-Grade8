import { describe, expect, it } from 'vitest';
import {
  deriveStats,
  getLessonTest,
  getTestEntry,
  testDefinitions,
  testQuestions,
} from './registry';
import { loadSolutionSet } from './registry';

const FORBIDDEN = [
  'todo',
  'tbd',
  'fixme',
  'lorem',
  'ipsum',
  'coming soon',
  'sample question',
  'placeholder',
  'قريباً',
  'تجريبي',
];

describe('test domain audit — definitions, questions and blueprints', () => {
  it('has unique question IDs across all authored questions', () => {
    const ids = new Set<string>();
    for (const q of testQuestions) {
      expect(ids.has(q.id)).toBe(false);
      ids.add(q.id);
    }
    expect(testQuestions.length).toBeGreaterThan(0);
  });

  it('has unique test definition IDs', () => {
    const ids = new Set<string>();
    for (const def of testDefinitions) {
      expect(ids.has(def.id)).toBe(false);
      ids.add(def.id);
    }
  });

  it('contains zero placeholder strings in questions and definitions', () => {
    for (const q of testQuestions) {
      const serialized = JSON.stringify(q).toLowerCase();
      for (const word of FORBIDDEN) {
        expect(serialized).not.toContain(word);
      }
    }
    for (const def of testDefinitions) {
      const serialized = JSON.stringify(def).toLowerCase();
      for (const word of FORBIDDEN) {
        expect(serialized).not.toContain(word);
      }
    }
  });

  it('enforces blueprint contract: actual questions match declared blueprint counts', () => {
    for (const def of testDefinitions) {
      const entry = getTestEntry(def.id);
      expect(entry).toBeDefined();
      const actualStats = deriveStats(entry!.questions);

      expect(actualStats.total).toBe(def.questionIds.length);

      // Coverage counts
      for (const declared of def.blueprint.coverage) {
        const found = actualStats.coverage.find((c) => c.concept === declared.concept);
        expect(found?.count, `Coverage count for concept ${declared.concept} in ${def.id}`).toBe(
          declared.count,
        );
      }

      // Difficulty counts
      for (const declared of def.blueprint.difficulty) {
        const found = actualStats.difficulty.find((d) => d.level === declared.level);
        expect(found?.count ?? 0, `Difficulty count for level ${declared.level} in ${def.id}`).toBe(
          declared.count,
        );
      }

      // Types counts
      for (const declared of def.blueprint.types) {
        const found = actualStats.types.find((t) => t.type === declared.type);
        expect(found?.count ?? 0, `Type count for ${declared.type} in ${def.id}`).toBe(
          declared.count,
        );
      }
    }
  });

  it('verifies Lesson 1 test exists, has 20 questions, and resolves correctly', () => {
    const l1Test = getLessonTest('lesson-01-translation-and-properties');
    expect(l1Test).toBeDefined();
    expect(l1Test!.definition.id).toBe('lesson-01-test');
    expect(l1Test!.questions.length).toBe(20);
  });

  it('verifies solution set loads lazily and has a solution for every question', async () => {
    for (const def of testDefinitions) {
      const solutionSet = await loadSolutionSet(def.id);
      expect(solutionSet, `Solution set for ${def.id} should load`).toBeDefined();
      expect(solutionSet!.testId).toBe(def.id);
      for (const qId of def.questionIds) {
        expect(
          solutionSet!.solutions[qId],
          `Solution for question ${qId} in ${def.id}`,
        ).toBeDefined();
      }
    }
  });
});
