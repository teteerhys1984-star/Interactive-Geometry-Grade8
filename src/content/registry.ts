import { subjectSchema } from './schema';
import type { ContentBlock, DiagramSpec, Lesson, ReferenceDiagram, Subject, Unit } from './schema';
import { units } from './units';

/**
 * ============================================================================
 *  CONTENT REGISTRY
 * ============================================================================
 *
 *  The subject shell below describes the COURSE CONTAINER only. It contains no
 *  curriculum content: `units` is sourced from `./units/index.ts`, which is
 *  currently an empty array.
 *
 *  The entire UI is driven by this object. Adding the first real textbook
 *  lesson requires editing `src/content/units/` only — no route, component or
 *  navigation change.
 * ============================================================================
 */

const subjectDefinition: Subject = subjectSchema.parse({
  id: 'geometry-grade-8',
  title: 'الهندسة — الصف الثامن',
  description: 'منصة تفاعلية لتعلّم الهندسة للصف الثامن، مبنية بالكامل على محتوى الكتاب المدرسي.',
  grade: 8,
  units,
});

export const subject: Subject = subjectDefinition;

/** True when no unit has been authored yet — drives the empty-course state. */
export const isCourseEmpty: boolean = subject.units.length === 0;

/** Every lesson in the course, flattened in curriculum order. */
export interface FlatLesson {
  unit: Unit;
  lesson: Lesson;
  /** Zero-based index across the whole course. */
  index: number;
}

export const allLessons: FlatLesson[] = subject.units
  .flatMap((unit) => unit.lessons.map((lesson) => ({ unit, lesson, index: -1 })))
  .map((entry, index) => ({ ...entry, index }));

export function getUnit(unitId: string): Unit | undefined {
  return subject.units.find((unit) => unit.id === unitId);
}

export function getLesson(lessonId: string): FlatLesson | undefined {
  return allLessons.find((entry) => entry.lesson.id === lessonId);
}

/** Previous / next lesson across unit boundaries, in curriculum order. */
export function getLessonNeighbours(lessonId: string): {
  previous: FlatLesson | undefined;
  next: FlatLesson | undefined;
} {
  const current = getLesson(lessonId);
  if (!current) return { previous: undefined, next: undefined };
  return {
    previous: allLessons[current.index - 1],
    next: allLessons[current.index + 1],
  };
}

/** Every diagram in a block tree, including those nested inside callouts. */
function collectDiagrams(blocks: ContentBlock[]): DiagramSpec[] {
  const output: DiagramSpec[] = [];
  for (const block of blocks) {
    if (block.type === 'figure') output.push(block.diagram);
    if (block.type === 'callout') output.push(...collectDiagrams(block.blocks));
    if (block.type === 'teaching') output.push(...collectDiagrams(block.blocks));
  }
  return output;
}

/** All diagrams in a lesson, in reading order. */
export function lessonDiagrams(lesson: Lesson): DiagramSpec[] {
  return lesson.steps.flatMap((step) => collectDiagrams(step.blocks));
}

export interface ReferenceFigureEntry {
  unit: Unit;
  lesson: Lesson;
  diagram: ReferenceDiagram;
}

/**
 * Every figure that resolved to the faithful `reference` placeholder.
 *
 * Surfaced in the Teacher Area so it is visible at a glance where the course
 * still depends on the printed book. A `reference` figure is a deliberate
 * editorial outcome, not unfinished work.
 */
export const referenceFigures: ReferenceFigureEntry[] = subject.units.flatMap((unit) =>
  unit.lessons.flatMap((lesson) =>
    lessonDiagrams(lesson)
      .filter((diagram): diagram is ReferenceDiagram => diagram.kind === 'reference')
      .map((diagram) => ({ unit, lesson, diagram })),
  ),
);

/** Resolve an assessment by id: lesson final, unit assessment, or course final. */
export function getAssessment(scopeId: string) {
  if (subject.finalAssessment && subject.finalAssessment.id === scopeId) {
    return {
      scope: 'final' as const,
      assessment: subject.finalAssessment,
      unit: undefined,
      lesson: undefined,
    };
  }
  for (const unit of subject.units) {
    if (unit.assessment && unit.assessment.id === scopeId) {
      return { scope: 'unit' as const, assessment: unit.assessment, unit, lesson: undefined };
    }
    for (const lesson of unit.lessons) {
      if (lesson.assessment && lesson.assessment.id === scopeId) {
        return { scope: 'lesson' as const, assessment: lesson.assessment, unit, lesson };
      }
    }
  }
  return undefined;
}
