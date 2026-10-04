import { describe, expect, it } from 'vitest';
import type { Lesson, Subject, Unit } from '@/content/schema';
import { buildCatalog } from './registry';
import type { TestDefinition, TestQuestion } from './schema';

const sampleSubject: Subject = {
  id: 'geometry-grade-8',
  title: 'الهندسة — الصف الثامن',
  description: 'منصة تفاعلية',
  grade: 8,
  units: [
    {
      id: 'unit-01',
      title: 'الوحدة الأولى',
      lessons: [
        {
          id: 'lesson-01',
          title: 'الدرس الأول',
          steps: [],
          source: { page: 5 },
        } as unknown as Lesson,
        {
          id: 'lesson-02',
          title: 'الدرس الثاني',
          steps: [],
          source: { page: 8 },
        } as unknown as Lesson,
      ],
    } as unknown as Unit,
  ],
};

const qL1: TestQuestion = {
  id: 'q-l1-01',
  lessonId: 'lesson-01',
  concept: 'def',
  difficulty: 'basic',
  type: 'true-false',
  prompt: [{ type: 'paragraph', text: 'سؤال' }],
  sourceRefs: [{ page: 5 }],
  answer: true,
};

const defL1: TestDefinition = {
  id: 'lesson-01-test',
  title: 'اختبار الدرس 1',
  scope: 'lesson',
  targetId: 'lesson-01',
  summary: 'ملخص',
  instructions: 'تعليمات',
  passingScore: 60,
  solutionGroupSize: 5,
  questionIds: ['q-l1-01'],
  blueprint: {
    coverage: [{ concept: 'def', label: 'مفهوم', count: 1 }],
    difficulty: [{ level: 'basic', count: 1 }],
    types: [{ type: 'true-false', count: 1 }],
  },
};

describe('Test Discovery & Extensibility (Rule 75)', () => {
  it('automatically registers and discovers a new future lesson test without UI code changes', () => {
    // 1. Initial catalog has only Lesson 1 test
    const initialCatalog = buildCatalog({
      subject: sampleSubject,
      definitions: [defL1],
      questions: new Map([['q-l1-01', qL1]]),
    });
    expect(initialCatalog.lessonTests.length).toBe(1);
    expect(initialCatalog.lessonTests[0]!.definition.id).toBe('lesson-01-test');

    // 2. Future expansion: Author adds Lesson 2 test data (definition + questions)
    const qL2: TestQuestion = {
      id: 'q-l2-01',
      lessonId: 'lesson-02',
      concept: 'image-point',
      difficulty: 'medium',
      type: 'numeric',
      prompt: [{ type: 'paragraph', text: 'سؤال الدرس الثاني' }],
      sourceRefs: [{ page: 8 }],
      answer: 10,
      tolerance: 0,
    };

    const defL2: TestDefinition = {
      id: 'lesson-02-test',
      title: 'اختبار الدرس 2',
      scope: 'lesson',
      targetId: 'lesson-02',
      summary: 'ملخص الدرس الثاني',
      instructions: 'تعليمات',
      passingScore: 60,
      solutionGroupSize: 5,
      questionIds: ['q-l2-01'],
      blueprint: {
        coverage: [{ concept: 'image-point', label: 'صورة نقطة', count: 1 }],
        difficulty: [{ level: 'medium', count: 1 }],
        types: [{ type: 'numeric', count: 1 }],
      },
    };

    // 3. New catalog discovers both automatically
    const expandedCatalog = buildCatalog({
      subject: sampleSubject,
      definitions: [defL1, defL2],
      questions: new Map<string, TestQuestion>([
        ['q-l1-01', qL1],
        ['q-l2-01', qL2],
      ]),
    });

    expect(expandedCatalog.lessonTests.length).toBe(2);
    expect(expandedCatalog.lessonTests[0]!.definition.id).toBe('lesson-01-test');
    expect(expandedCatalog.lessonTests[1]!.definition.id).toBe('lesson-02-test');
    expect(expandedCatalog.lessonTests[1]!.lesson?.lesson.title).toBe('الدرس الثاني');
    expect(expandedCatalog.problems.length).toBe(0);
  });

  it('strictly rejects publishing a test for a non-existent lesson or unit (no fake cards)', () => {
    const fakeDef: TestDefinition = {
      id: 'lesson-99-test',
      title: 'اختبار درس وهمي',
      scope: 'lesson',
      targetId: 'lesson-99', // does NOT exist in sampleSubject
      summary: 'وهمي',
      instructions: 'وهمي',
      passingScore: 60,
      solutionGroupSize: 5,
      questionIds: ['q-l1-01'],
      blueprint: {
        coverage: [{ concept: 'def', label: 'مفهوم', count: 1 }],
        difficulty: [{ level: 'basic', count: 1 }],
        types: [{ type: 'true-false', count: 1 }],
      },
    };

    const catalogWithFake = buildCatalog({
      subject: sampleSubject,
      definitions: [defL1, fakeDef],
      questions: new Map([['q-l1-01', qL1]]),
    });

    // The fake test must NOT appear in lessonTests
    expect(catalogWithFake.lessonTests.length).toBe(1);
    expect(catalogWithFake.lessonTests[0]!.definition.id).toBe('lesson-01-test');
    expect(catalogWithFake.problems.some((p) => p.includes('lesson-99'))).toBe(true);
  });
});
