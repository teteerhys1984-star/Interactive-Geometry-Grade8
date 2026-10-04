import type { Lesson, Subject, Unit } from '@/content/schema';
import { subject as courseSubject } from '@/content/registry';
import { routes } from '@/lib/routes';
import {
  DIFFICULTY_ORDER,
  solutionSetSchema,
  testDefinitionSchema,
  testQuestionSchema,
  type Difficulty,
  type QuestionType,
  type SolutionSet,
  type SolutionSetInput,
  type TestDefinition,
  type TestQuestion,
  type TestQuestionInput,
} from './schema';

/**
 * ============================================================================
 *  TEST AREA — REGISTRY & DISCOVERY
 * ============================================================================
 *
 *  This is the ONLY place that assembles the Test Area. Pages never hard-code a
 *  lesson, a unit or a test id: they read the catalog below.
 *
 *  Everything is DISCOVERED, not enumerated:
 *
 *    src/tests/questions/*.ts     →  every file exports `questions`
 *    src/tests/definitions/*.ts   →  every file exports `definition`
 *                    ↓
 *            buildCatalog(subject, definitions, questions)
 *                    ↓
 *      catalog.lessonTests / unitTests / comprehensiveTests
 *
 *  Adding Lesson 8 to the course content and dropping its question bank and its
 *  test definition into those two folders publishes «اختبار الدرس 8» in the
 *  Test Area, in the Solutions Area, and in every count on the home page —
 *  with NO edit to any page component. See `registry.test.ts`.
 *
 *  A definition is only PUBLISHED when it resolves against real content:
 *    - its target lesson / unit exists in the content registry,
 *    - every question id it lists exists,
 *    - every question belongs to the scope it claims (a lesson test cannot
 *      contain another lesson's question).
 *  Otherwise it is reported in `problems` and shown NOWHERE — the Test Area
 *  never invents a lesson, a unit, or a placeholder card.
 * ============================================================================
 */

/* ------------------------------------------------------------------------ */
/*  Discovery                                                                */
/* ------------------------------------------------------------------------ */

type QuestionModule = { questions: TestQuestionInput[] };
type DefinitionModule = { definition: TestDefinition };
type SolutionModule = { solutionSet: SolutionSetInput };

const questionModules = import.meta.glob<QuestionModule>('./questions/*.ts', { eager: true });
const definitionModules = import.meta.glob<DefinitionModule>('./definitions/*.ts', {
  eager: true,
});
const solutionModules = import.meta.glob<SolutionModule>('./solutions/*.ts');

/** Stable order: by module path, never by filesystem enumeration order. */
function sortedPaths(modules: Record<string, unknown>): string[] {
  return Object.keys(modules).sort();
}

function parseQuestion(module: unknown, path: string): TestQuestion[] {
  const raw = (module as Partial<QuestionModule>).questions;
  if (!Array.isArray(raw)) {
    throw new Error(`Test question bank ${path} must export a \`questions\` array.`);
  }
  return raw.map((question, index) => {
    const result = testQuestionSchema.safeParse(question);
    if (!result.success) {
      throw new Error(
        `Invalid test question at ${path}[${index}]: ${result.error.issues
          .map((issue) => `${issue.path.join('.')} — ${issue.message}`)
          .join('; ')}`,
      );
    }
    return result.data;
  });
}

/** Every authored test question, in module-path order. Fails fast on bad data. */
export const testQuestions: TestQuestion[] = sortedPaths(questionModules).flatMap((path) =>
  parseQuestion(questionModules[path], path),
);

export const questionsById: ReadonlyMap<string, TestQuestion> = new Map(
  testQuestions.map((question) => [question.id, question]),
);

/** Every authored test definition. Fails fast on bad data. */
export const testDefinitions: TestDefinition[] = sortedPaths(definitionModules).map((path) => {
  const raw = (definitionModules[path] as Partial<DefinitionModule>).definition;
  if (!raw) throw new Error(`Test definition ${path} must export a \`definition\` object.`);
  return testDefinitionSchema.parse(raw);
});

export const testsById: ReadonlyMap<string, TestDefinition> = new Map(
  testDefinitions.map((definition) => [definition.id, definition]),
);

/* ------------------------------------------------------------------------ */
/*  Derived statistics (used by the audit, the UI and the report)             */
/* ------------------------------------------------------------------------ */

export interface DerivedStats {
  total: number;
  difficulty: { level: Difficulty; count: number }[];
  types: { type: QuestionType; count: number }[];
  coverage: { concept: string; count: number }[];
}

/** What the authored questions ACTUALLY contain, in a deterministic order. */
export function deriveStats(questions: TestQuestion[]): DerivedStats {
  const difficultyCounts = new Map<Difficulty, number>();
  const typeCounts = new Map<QuestionType, number>();
  const conceptCounts = new Map<string, number>();

  for (const question of questions) {
    difficultyCounts.set(question.difficulty, (difficultyCounts.get(question.difficulty) ?? 0) + 1);
    typeCounts.set(question.type, (typeCounts.get(question.type) ?? 0) + 1);
    conceptCounts.set(question.concept, (conceptCounts.get(question.concept) ?? 0) + 1);
  }

  return {
    total: questions.length,
    difficulty: DIFFICULTY_ORDER.filter((level) => difficultyCounts.has(level)).map((level) => ({
      level,
      count: difficultyCounts.get(level) ?? 0,
    })),
    types: [...typeCounts.entries()]
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => a.type.localeCompare(b.type)),
    coverage: [...conceptCounts.entries()].map(([concept, count]) => ({ concept, count })),
  };
}

/* ------------------------------------------------------------------------ */
/*  Catalog                                                                  */
/* ------------------------------------------------------------------------ */

export interface FlatLessonRef {
  unit: Unit;
  lesson: Lesson;
  /** Zero-based position in the unit. */
  indexInUnit: number;
  /** Zero-based position across the whole course. */
  indexInCourse: number;
}

export interface TestEntry {
  definition: TestDefinition;
  /** Resolved in the definition's own order. */
  questions: TestQuestion[];
  /** The lesson (lesson test) or unit (unit test) this test belongs to. */
  lesson?: FlatLessonRef;
  unit?: Unit;
  /** Every lesson the test draws questions from — one for a lesson test. */
  coveredLessons: FlatLessonRef[];
  href: string;
  solutionHref: string;
}

export interface TestCatalog {
  lessonTests: TestEntry[];
  unitTests: TestEntry[];
  comprehensiveTests: TestEntry[];
  all: TestEntry[];
  /** Unpublished definitions, with the reason — surfaced by the audit suite. */
  problems: string[];
}

export interface CatalogInput {
  subject: Subject;
  definitions: TestDefinition[];
  questions: ReadonlyMap<string, TestQuestion>;
}

function flattenLessons(subject: Subject): FlatLessonRef[] {
  const flat: FlatLessonRef[] = [];
  for (const unit of subject.units) {
    unit.lessons.forEach((lesson, indexInUnit) => {
      flat.push({ unit, lesson, indexInUnit, indexInCourse: flat.length });
    });
  }
  return flat;
}

/**
 * Pure catalog builder. Exported so a test can inject a synthetic lesson —
 * that is how the "a new lesson publishes its test automatically" guarantee is
 * proven without touching the real curriculum.
 */
export function buildCatalog({ subject, definitions, questions }: CatalogInput): TestCatalog {
  const flatLessons = flattenLessons(subject);
  const lessonById = new Map(flatLessons.map((entry) => [entry.lesson.id, entry]));
  const unitById = new Map(subject.units.map((unit) => [unit.id, unit]));

  const lessonTests: TestEntry[] = [];
  const unitTests: TestEntry[] = [];
  const comprehensiveTests: TestEntry[] = [];
  const problems: string[] = [];

  const sorted = [...definitions].sort((a, b) => a.id.localeCompare(b.id));

  for (const definition of sorted) {
    const resolved: TestQuestion[] = [];
    let missingQuestion = false;
    for (const questionId of definition.questionIds) {
      const question = questions.get(questionId);
      if (!question) {
        problems.push(`«${definition.id}»: السؤال ${questionId} غير موجود.`);
        missingQuestion = true;
        break;
      }
      resolved.push(question);
    }
    if (missingQuestion) continue;

    const entry = (target: { lesson?: FlatLessonRef; unit?: Unit }, covered: FlatLessonRef[]) =>
      ({
        definition,
        questions: resolved,
        ...target,
        coveredLessons: covered,
        href: routes.test(definition.id),
        solutionHref: routes.testSolutionSet(definition.id),
      }) satisfies TestEntry;

    if (definition.scope === 'lesson') {
      const lesson = lessonById.get(definition.targetId);
      if (!lesson) {
        problems.push(`«${definition.id}»: الدرس ${definition.targetId} غير موجود في المقرر.`);
        continue;
      }
      const foreign = resolved.find((question) => question.lessonId !== lesson.lesson.id);
      if (foreign) {
        problems.push(
          `«${definition.id}»: السؤال ${foreign.id} يخص الدرس ${foreign.lessonId} وليس ${lesson.lesson.id}.`,
        );
        continue;
      }
      lessonTests.push(entry({ lesson }, [lesson]));
      continue;
    }

    if (definition.scope === 'unit') {
      const unit = unitById.get(definition.targetId);
      if (!unit) {
        problems.push(`«${definition.id}»: الوحدة ${definition.targetId} غير موجودة في المقرر.`);
        continue;
      }
      const unitLessonIds = new Set(unit.lessons.map((lesson) => lesson.id));
      const foreign = resolved.find((question) => !unitLessonIds.has(question.lessonId));
      if (foreign) {
        problems.push(`«${definition.id}»: السؤال ${foreign.id} خارج نطاق الوحدة ${unit.id}.`);
        continue;
      }
      const covered = flatLessons.filter((entryItem) => entryItem.unit.id === unit.id);
      unitTests.push(entry({ unit }, covered));
      continue;
    }

    // comprehensive
    if (definition.targetId !== subject.id) {
      problems.push(
        `«${definition.id}»: الاختبار الشامل يجب أن يستهدف المقرر ${subject.id} لا ${definition.targetId}.`,
      );
      continue;
    }
    comprehensiveTests.push(entry({}, flatLessons));
  }

  const byLessonOrder = (a: TestEntry, b: TestEntry) =>
    (a.lesson?.indexInCourse ?? 0) - (b.lesson?.indexInCourse ?? 0);
  lessonTests.sort(byLessonOrder);

  return {
    lessonTests,
    unitTests,
    comprehensiveTests,
    all: [...lessonTests, ...unitTests, ...comprehensiveTests],
    problems,
  };
}

/** The live catalog, built from the real course content. */
export const catalog: TestCatalog = buildCatalog({
  subject: courseSubject,
  definitions: testDefinitions,
  questions: questionsById,
});

export function getTestEntry(testId: string | undefined): TestEntry | undefined {
  if (!testId) return undefined;
  return catalog.all.find((entry) => entry.definition.id === testId);
}

/** The published test of a lesson, if its question bank has been authored. */
export function getLessonTest(lessonId: string | undefined): TestEntry | undefined {
  if (!lessonId) return undefined;
  return catalog.lessonTests.find((entry) => entry.lesson?.lesson.id === lessonId);
}

export function getUnitTest(unitId: string | undefined): TestEntry | undefined {
  if (!unitId) return undefined;
  return catalog.unitTests.find((entry) => entry.unit?.id === unitId);
}

/** Total number of authored questions across the whole Test Area. */
export function totalQuestionCount(entries: TestEntry[] = catalog.all): number {
  return entries.reduce((total, entry) => total + entry.questions.length, 0);
}

/* ------------------------------------------------------------------------ */
/*  Solutions discovery (lazy)                                               */
/* ------------------------------------------------------------------------ */

/**
 * Solution sets are discovered by FILE NAME: `solutions/<testId>.ts`.
 * They are deliberately NOT imported eagerly — a file dropped in that folder
 * becomes its own JavaScript chunk, so reading a test never loads its answers'
 * explanations.
 */
export const solutionLoaders: ReadonlyMap<string, () => Promise<SolutionModule>> = new Map(
  sortedPaths(solutionModules).map((path) => {
    const testId = path.replace('./solutions/', '').replace(/\.ts$/, '');
    return [testId, solutionModules[path] as () => Promise<SolutionModule>] as const;
  }),
);

export function hasSolutionSet(testId: string): boolean {
  return solutionLoaders.has(testId);
}

/**
 * Load and validate one solution set. Rejects when no file exists for the test
 * or when the file declares a different `testId` — a mismatch can never reach
 * the learner as a wrong explanation attached to the wrong question.
 */
export async function loadSolutionSet(testId: string): Promise<SolutionSet | undefined> {
  const loader = solutionLoaders.get(testId);
  if (!loader) return undefined;
  const module = await loader();
  const parsed = solutionSetSchema.safeParse(module.solutionSet);
  if (!parsed.success) {
    throw new Error(`Invalid solution set for ${testId}: ${parsed.error.issues[0]?.message ?? ''}`);
  }
  if (parsed.data.testId !== testId) {
    throw new Error(
      `Solution set ${testId} declares testId «${parsed.data.testId}» — file name and testId must match.`,
    );
  }
  return parsed.data;
}
