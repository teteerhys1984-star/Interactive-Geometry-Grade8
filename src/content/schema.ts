import { z } from 'zod';

/**
 * ============================================================================
 *  CONTENT SCHEMA — Interactive Geometry, Grade 8 (Arabic)
 * ============================================================================
 *
 *  This file is the single source of truth for the SHAPE of course content.
 *  It contains NO content itself.
 *
 *  Every authored item is validated against these schemas at registration time
 *  and in the source-fidelity test suite. If the real textbook requires a field
 *  that does not exist here, extend the schema FIRST, then author the content —
 *  never the other way around.
 * ============================================================================
 */

/** Slug-style identifier: lowercase letters, digits and dashes. */
export const idSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'id must be a lowercase dash-separated slug');

/**
 * Provenance of a piece of content in the printed textbook.
 *
 * SOURCE FIDELITY RULE: content must be traceable to a real page.
 *
 * `page` is REQUIRED — it is the only field we can always verify from a scan.
 * `book` is OPTIONAL by design: the supplied pages do not show the book's
 * title page, and inventing a title would violate source fidelity.
 */
export const sourceRefSchema = z.object({
  /** Printed page number. Required — the anchor of every fidelity check. */
  page: z.union([z.number().int().positive(), z.string().min(1)]),
  /** Book title, only when actually verified from the source. */
  book: z.string().min(1).optional(),
  /** Finer locator: exercise number, figure number, section heading. */
  locator: z.string().min(1).optional(),
  /** Reviewer note — never rendered to students. */
  note: z.string().min(1).optional(),
});
export type SourceRef = z.infer<typeof sourceRefSchema>;

/**
 * ----------------------------------------------------------------------------
 *  DIAGRAM SPEC — an extensible contract, NOT a rendering engine.
 * ----------------------------------------------------------------------------
 *  Decision tree agreed for this project:
 *
 *    Faithfully reproducible geometry  →  'constructed' / 'interactive'
 *    Approved, publishable source image →  'image'
 *    Otherwise                          →  'reference'  (faithful placeholder)
 *
 *  Never simplify, guess, redraw approximately, or alter a textbook figure
 *  merely to avoid 'reference'.
 */

const diagramBaseSchema = z.object({
  id: idSchema,
  /**
   * Provenance of the FIGURE itself.
   *   'textbook' — reproduces a figure printed in the source.
   *   'authored' — a platform-made teaching diagram, not from the book.
   * Authored diagrams may be `constructed` because we draw them ourselves and
   * can guarantee they are exact; textbook figures may not be guessed at.
   */
  origin: z.enum(['textbook', 'authored']).default('textbook'),
  /**
   * Arabic alternative text / description. Mandatory.
   * May contain `$…$` inline maths, which is stripped for the raw `alt`
   * attribute and rendered properly wherever the description is visible.
   */
  alt: z.string().min(1, 'every diagram needs an Arabic description'),
  /** Optional Arabic caption rendered under the figure. */
  caption: z.string().min(1).optional(),
  /** Intrinsic aspect ratio (width / height) used to reserve responsive space. */
  aspectRatio: z.number().positive().optional(),
  source: sourceRefSchema.optional(),
});

/** A scanned / exported figure. Only for images explicitly approved for use. */
export const imageDiagramSchema = diagramBaseSchema.extend({
  kind: z.literal('image'),
  /** Base-relative path, e.g. "diagrams/u1/fig-3.svg". No leading slash. */
  src: z
    .string()
    .min(1)
    .refine((s) => !s.startsWith('/'), {
      message: 'src must be base-relative so the GitHub Pages base path applies',
    }),
  srcSet: z.string().min(1).optional(),
});

/** A future interactive figure. Renderer resolved through the registry. */
export const interactiveDiagramSchema = diagramBaseSchema.extend({
  kind: z.literal('interactive'),
  renderer: z.string().min(1),
  params: z.record(z.string(), z.unknown()).default({}),
});

/** A future constructed / vector figure, drawn as SVG from a declarative spec. */
export const constructedDiagramSchema = diagramBaseSchema.extend({
  kind: z.literal('constructed'),
  renderer: z.string().min(1),
  construction: z.record(z.string(), z.unknown()).default({}),
});

/**
 * FAITHFUL PLACEHOLDER.
 *
 * Used when a textbook figure cannot be reproduced faithfully and no approved
 * source image exists. Renders «يوجد رسم هنا — راجع الكتاب» together with the
 * textbook page number, so the student knows exactly where to look.
 *
 * This is a deliberate editorial outcome, NOT unfinished work. It is therefore
 * visually and diagnostically distinct from an unregistered renderer.
 *
 * `source` is REQUIRED here (unlike every other variant): a placeholder that
 * says "consult the book" without naming the page would be useless.
 */
export const referenceDiagramSchema = diagramBaseSchema.extend({
  kind: z.literal('reference'),
  source: sourceRefSchema,
  /** Why faithful reproduction was not possible. Shown only in the Teacher Area. */
  reason: z.string().min(1).optional(),
});

export const diagramSpecSchema = z.discriminatedUnion('kind', [
  imageDiagramSchema,
  interactiveDiagramSchema,
  constructedDiagramSchema,
  referenceDiagramSchema,
]);
export type DiagramSpec = z.infer<typeof diagramSpecSchema>;
export type ImageDiagram = z.infer<typeof imageDiagramSchema>;
export type InteractiveDiagram = z.infer<typeof interactiveDiagramSchema>;
export type ConstructedDiagram = z.infer<typeof constructedDiagramSchema>;
export type ReferenceDiagram = z.infer<typeof referenceDiagramSchema>;

/**
 * ----------------------------------------------------------------------------
 *  RICH TEXT BLOCKS
 * ----------------------------------------------------------------------------
 *  Content is a list of typed blocks, never raw HTML, so the renderer can
 *  enforce RTL/LTR isolation mechanically instead of trusting the author.
 */

/** Arabic prose. May embed inline maths with `$…$` delimiters. */
export const paragraphBlockSchema = z.object({
  type: z.literal('paragraph'),
  text: z.string().min(1),
});

/** A display (block-level) mathematical expression, always LTR-isolated. */
export const mathBlockSchema = z.object({
  type: z.literal('math'),
  latex: z.string().min(1),
  label: z.string().min(1).optional(),
});

/** An ordered or unordered list of Arabic items (inline maths allowed). */
export const listBlockSchema = z.object({
  type: z.literal('list'),
  ordered: z.boolean().default(false),
  items: z.array(z.string().min(1)).min(1),
});

/** A highlighted callout. `hint` corresponds to the source's 💡 marginal notes. */
export const calloutBlockSchema = z.object({
  type: z.literal('callout'),
  variant: z.enum(['definition', 'theorem', 'note', 'warning', 'example', 'hint', 'activity']),
  title: z.string().min(1).optional(),
  blocks: z.lazy((): z.ZodType => z.array(contentBlockSchema).min(1)),
});

/** An embedded figure referencing a DiagramSpec. */
export const figureBlockSchema = z.object({
  type: z.literal('figure'),
  diagram: diagramSpecSchema,
});

/**
 * PLATFORM-AUTHORED TEACHING MATERIAL.
 *
 * Everything inside a `teaching` block is written by this platform to explain
 * the lesson. It is NEVER textbook text. The renderer badges it explicitly so a
 * student can always tell the difference between the book and our explanation.
 *
 * `collapsible` produces a progressive reveal (think first, then expand).
 */
export const teachingBlockSchema = z.object({
  type: z.literal('teaching'),
  variant: z.enum(['concept', 'why', 'example', 'pitfall', 'summary', 'tip']),
  title: z.string().min(1),
  collapsible: z.boolean().default(false),
  /** Label for the disclosure toggle when `collapsible` is true. */
  revealLabel: z.string().min(1).optional(),
  blocks: z.lazy((): z.ZodType => z.array(contentBlockSchema).min(1)),
});

/** A compact two-column comparison table (authored teaching aid). */
export const compareBlockSchema = z.object({
  type: z.literal('compare'),
  title: z.string().min(1).optional(),
  columns: z.tuple([z.string().min(1), z.string().min(1)]),
  rows: z.array(z.tuple([z.string().min(1), z.string().min(1)])).min(1),
});

/**
 * A group of textbook questions, reproduced verbatim.
 *
 * These are PROMPTS ONLY. The supplied pages contain open-response questions
 * with no printed answers, so no answer key is stored and none is invented.
 * `label` preserves the exact numbering printed in the source (e.g. "1." or "①").
 */
export const questionGroupBlockSchema = z.object({
  type: z.literal('questionGroup'),
  title: z.string().min(1).optional(),
  items: z
    .array(
      z.object({
        label: z.string().min(1).optional(),
        text: z.string().min(1),
      }),
    )
    .min(1),
});

export type ContentBlock =
  | z.infer<typeof paragraphBlockSchema>
  | z.infer<typeof mathBlockSchema>
  | z.infer<typeof listBlockSchema>
  | z.infer<typeof figureBlockSchema>
  | z.infer<typeof questionGroupBlockSchema>
  | z.infer<typeof compareBlockSchema>
  | { type: 'callout'; variant: string; title?: string; blocks: ContentBlock[] }
  | {
      type: 'teaching';
      variant: string;
      title: string;
      collapsible?: boolean;
      revealLabel?: string;
      blocks: ContentBlock[];
    };

export const contentBlockSchema: z.ZodType<ContentBlock> = z.lazy(() =>
  z.discriminatedUnion('type', [
    paragraphBlockSchema,
    mathBlockSchema,
    listBlockSchema,
    figureBlockSchema,
    questionGroupBlockSchema,
    compareBlockSchema,
    calloutBlockSchema,
    teachingBlockSchema,
  ]),
) as z.ZodType<ContentBlock>;

/**
 * ----------------------------------------------------------------------------
 *  ASSESSMENT
 * ----------------------------------------------------------------------------
 *  Questions carry an explicit `origin`:
 *    'textbook' — printed in the source; `source` is then REQUIRED.
 *    'authored' — written by this platform to assess understanding.
 *
 *  `explanation` is the TEACHER ANSWER KEY. It is rendered only in the Teacher
 *  Area, never to students.
 */

const questionBaseSchema = z.object({
  id: idSchema,
  prompt: z.array(contentBlockSchema).min(1),
  origin: z.enum(['textbook', 'authored']).default('authored'),
  source: sourceRefSchema.optional(),
  /** Teacher-only worked explanation. Never shown to students. */
  explanation: z.array(contentBlockSchema).optional(),
  /** Short Arabic tag used to report assessment coverage. */
  skill: z.string().min(1).optional(),
});

export const multipleChoiceQuestionSchema = questionBaseSchema.extend({
  type: z.literal('multiple-choice'),
  choices: z.array(z.object({ id: idSchema, blocks: z.array(contentBlockSchema).min(1) })).min(2),
  correctChoiceId: idSchema,
});

export const trueFalseQuestionSchema = questionBaseSchema.extend({
  type: z.literal('true-false'),
  answer: z.boolean(),
});

export const numericQuestionSchema = questionBaseSchema.extend({
  type: z.literal('numeric'),
  answer: z.number(),
  tolerance: z.number().nonnegative().default(0),
  unit: z.string().min(1).optional(),
});

export const questionSchema = z.discriminatedUnion('type', [
  multipleChoiceQuestionSchema,
  trueFalseQuestionSchema,
  numericQuestionSchema,
]);
export type Question = z.infer<typeof questionSchema>;

export const assessmentSchema = z.object({
  id: idSchema,
  title: z.string().min(1),
  /** Arabic instructions shown before the first question. */
  instructions: z.string().min(1).optional(),
  passingScore: z.number().min(0).max(100).default(60),
  questions: z.array(questionSchema).min(1),
});
export type Assessment = z.infer<typeof assessmentSchema>;
export type AssessmentInput = z.input<typeof assessmentSchema>;

/**
 * ----------------------------------------------------------------------------
 *  LESSON STRUCTURE
 * ----------------------------------------------------------------------------
 */

/** One screen of the step-by-step lesson flow. */
export const lessonStepSchema = z.object({
  id: idSchema,
  title: z.string().min(1),
  /**
   * 'source'   — reproduces textbook content verbatim; `source` is REQUIRED.
   * 'authored' — platform teaching material; has no textbook page.
   */
  origin: z.enum(['source', 'authored']).default('source'),
  /** Optional Arabic kicker shown above the title, e.g. the source section name. */
  kicker: z.string().min(1).optional(),
  blocks: z.array(contentBlockSchema).min(1),
  /** Page this step is taken from — enables per-step provenance. */
  source: sourceRefSchema.optional(),
  check: questionSchema.optional(),
});
export type LessonStep = z.infer<typeof lessonStepSchema>;
export type LessonStepInput = z.input<typeof lessonStepSchema>;

/**
 * `summary` and `objectives` are OPTIONAL.
 *
 * The supplied textbook pages do not print a lesson summary or a list of
 * learning objectives. Requiring them would force an author to invent content,
 * so the outline renders only the sections that genuinely exist in the source.
 */
/**
 * TEACHER-ONLY MATERIAL.
 *
 * The supplied pages print no answer key. These solutions are therefore derived
 * by this platform from the printed questions and figures, and are labelled as
 * «حلول المعلم» — never presented as printed textbook answers.
 *
 * `limitation` records, per solution, any part of the answer that depends on an
 * unreadable portion of a `reference` figure. Such parts are flagged, not guessed.
 */
export const teacherSolutionSchema = z.object({
  id: idSchema,
  /** Where the printed question lives, e.g. "صفحة 5 — النشاط 1 — السؤال 2". */
  reference: z.string().min(1),
  /** The printed question, verbatim. */
  question: z.string().min(1),
  blocks: z.array(contentBlockSchema).min(1),
  limitation: z.string().min(1).optional(),
});
export type TeacherSolution = z.infer<typeof teacherSolutionSchema>;

export const teacherResourcesSchema = z.object({
  notes: z.array(contentBlockSchema).default([]),
  textbookSolutions: z.array(teacherSolutionSchema).default([]),
});
export type TeacherResources = z.infer<typeof teacherResourcesSchema>;
export type TeacherResourcesInput = z.input<typeof teacherResourcesSchema>;

export const lessonSchema = z.object({
  id: idSchema,
  title: z.string().min(1),
  summary: z.string().min(1).optional(),
  objectives: z.array(z.string().min(1)).default([]),
  vocabulary: z
    .array(z.object({ term: z.string().min(1), definition: z.string().min(1) }))
    .default([]),
  steps: z.array(lessonStepSchema).min(1),
  /** End-of-lesson final assessment. */
  assessment: assessmentSchema.optional(),
  /** Teacher-only resources, rendered exclusively behind the Teacher Area gate. */
  teacherResources: teacherResourcesSchema.optional(),
  estimatedMinutes: z.number().int().positive().optional(),
  source: sourceRefSchema,
});
export type Lesson = z.infer<typeof lessonSchema>;
export type LessonInput = z.input<typeof lessonSchema>;

export const unitSchema = z.object({
  id: idSchema,
  title: z.string().min(1),
  summary: z.string().min(1).optional(),
  lessons: z.array(lessonSchema).default([]),
  assessment: assessmentSchema.optional(),
  source: sourceRefSchema.optional(),
});
export type Unit = z.infer<typeof unitSchema>;

/**
 * Authoring-side type: the shape you WRITE, before Zod applies defaults.
 * Content files should annotate with `UnitInput`, not `Unit`, so optional
 * fields with defaults (objectives, vocabulary, …) need not be spelled out.
 */
export type UnitInput = z.input<typeof unitSchema>;

export const subjectSchema = z.object({
  id: idSchema,
  title: z.string().min(1),
  description: z.string().min(1),
  grade: z.number().int().positive(),
  units: z.array(unitSchema).default([]),
  finalAssessment: assessmentSchema.optional(),
});
export type Subject = z.infer<typeof subjectSchema>;
