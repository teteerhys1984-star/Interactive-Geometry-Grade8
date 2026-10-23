import type { ContentBlock, DiagramSpec, SourceRef } from '@/content/schema';
import type { TestFigureSpec } from '@/components/diagram/renderers/testFigureSpec';
import type {
  Choice,
  ChoicePartInput,
  Difficulty,
  FillInBlankInput,
  MultiPartItemInput,
  SolutionPartInput,
  TestQuestionInput,
  TestSolutionInput,
} from './schema';
import { TEST_FIGURE_RENDERER } from '@/components/diagram/renderers/testFigureSpec';

/**
 * ============================================================================
 *  TEST AREA — AUTHORING HELPERS
 * ============================================================================
 *
 *  Question banks are DATA, never JSX. These helpers keep that data readable
 *  and short while the zod schema in `./schema.ts` stays the single source of
 *  truth: every authored object is validated when the registry loads, and
 *  again by the audit suite.
 *
 *  Two conventions are worth knowing:
 *
 *  1. Arabic prose is written as plain strings. Any mathematical or geometric
 *     notation inside a string MUST be delimited with `$…$`, exactly as in the
 *     course content — the renderer isolates it LTR automatically.
 *
 *  2. A figure is an authored, declarative scene of labelled points. Because
 *     segments, polygons, circles and angle marks all reference those points by
 *     name, the drawing can never contradict the data it is generated from.
 * ============================================================================
 */

/* ------------------------------------------------------------------------ */
/*  Blocks                                                                   */
/* ------------------------------------------------------------------------ */

export function paragraph(text: string): ContentBlock {
  return { type: 'paragraph', text };
}

export function mathBlock(latex: string, label?: string): ContentBlock {
  return label ? { type: 'math', latex, label } : { type: 'math', latex };
}

/** Convert a mixed list of prose strings and ready-made blocks into blocks. */
export function toBlocks(items: (string | ContentBlock)[]): ContentBlock[] {
  return items.map((item) => (typeof item === 'string' ? paragraph(item) : item));
}

/* ------------------------------------------------------------------------ */
/*  Authored geometry figures                                                */
/* ------------------------------------------------------------------------ */

/**
 * Build an authored, mathematically exact figure from a declarative scene.
 * `spec` coordinates are the truth: the renderer draws exactly those points.
 */
export function testFigure(input: {
  /** Diagram id — unique across the whole platform. */
  id: string;
  alt: string;
  caption?: string;
  spec: TestFigureSpec;
  sourceRefs?: SourceRef[];
}): DiagramSpec {
  return {
    kind: 'constructed',
    renderer: TEST_FIGURE_RENDERER,
    origin: 'authored',
    id: input.id,
    alt: input.alt,
    ...(input.caption ? { caption: input.caption } : {}),
    ...(input.sourceRefs?.[0] ? { source: input.sourceRefs[0] } : {}),
    construction: input.spec as unknown as Record<string, unknown>,
  };
}

/** Embed a declarative Test Area figure in a question's typed prompt blocks. */
export function figureBlock(diagram: DiagramSpec): ContentBlock {
  return { type: 'figure', diagram };
}

/* ------------------------------------------------------------------------ */
/*  Question construction                                                    */
/* ------------------------------------------------------------------------ */

interface QuestionBaseInput {
  id: string;
  lessonId: string;
  /** Concept slug used by the blueprint coverage audit. */
  concept: string;
  difficulty: Difficulty;
  /** Prose strings, or ready-made blocks when a figure or math block is needed. */
  prompt: (string | ContentBlock)[];
  /** Textbook provenance of the question — at least one real page. */
  sourceRefs: SourceRef[];
}

function base(input: QuestionBaseInput) {
  return {
    id: input.id,
    lessonId: input.lessonId,
    concept: input.concept,
    difficulty: input.difficulty,
    prompt: toBlocks(input.prompt),
    sourceRefs: input.sourceRefs,
  };
}

export function singleChoice(
  input: QuestionBaseInput & { choices: Choice[]; answer: string },
): TestQuestionInput {
  return { ...base(input), type: 'single-choice', choices: input.choices, answerId: input.answer };
}

export function multiSelect(
  input: QuestionBaseInput & { choices: Choice[]; answers: string[] },
): TestQuestionInput {
  return {
    ...base(input),
    type: 'multi-select',
    choices: input.choices,
    answerIds: input.answers,
  };
}

export function trueFalse(input: QuestionBaseInput & { answer: boolean }): TestQuestionInput {
  return { ...base(input), type: 'true-false', answer: input.answer };
}

/** Build a controlled choice sub-part used by correction and justification questions. */
export function choicePart(input: {
  id: string;
  prompt: (string | ContentBlock)[];
  choices: Choice[];
  answer: string;
  points?: number;
}): ChoicePartInput {
  return {
    id: input.id,
    prompt: toBlocks(input.prompt),
    choices: input.choices,
    answerId: input.answer,
    ...(input.points === undefined ? {} : { points: input.points }),
  };
}

export function trueFalseJustify(
  input: QuestionBaseInput & {
    answer: boolean;
    correction?: ChoicePartInput;
    justification?: ChoicePartInput;
  },
): TestQuestionInput {
  return {
    ...base(input),
    type: 'true-false-justify',
    answer: input.answer,
    ...(input.correction ? { correction: input.correction } : {}),
    ...(input.justification ? { justification: input.justification } : {}),
  };
}

export function shortAnswer(
  input: QuestionBaseInput & {
    acceptedAnswers: string[];
    normalization?: 'term' | 'exact-text';
  },
): TestQuestionInput {
  return {
    ...base(input),
    type: 'short-answer',
    acceptedAnswers: input.acceptedAnswers,
    normalization: input.normalization ?? 'term',
  };
}

export function fillIn(
  input: QuestionBaseInput & { blanks: FillInBlankInput[] },
): TestQuestionInput {
  return { ...base(input), type: 'fill-in', blanks: input.blanks };
}

export function fillInBlank(input: {
  id: string;
  label: string;
  acceptedAnswers: string[];
  normalization?: 'term' | 'exact-text';
  points?: number;
}): FillInBlankInput {
  return {
    id: input.id,
    label: input.label,
    acceptedAnswers: input.acceptedAnswers,
    normalization: input.normalization ?? 'term',
    ...(input.points === undefined ? {} : { points: input.points }),
  };
}

export function justification(
  input: QuestionBaseInput & { steps: ChoicePartInput[] },
): TestQuestionInput {
  return { ...base(input), type: 'justification', steps: input.steps };
}

export function multiPart(
  input: QuestionBaseInput & { parts: MultiPartItemInput[] },
): TestQuestionInput {
  return { ...base(input), type: 'multi-part', parts: input.parts };
}

export function diagramReading(
  input: QuestionBaseInput & { parts: MultiPartItemInput[] },
): TestQuestionInput {
  return { ...base(input), type: 'diagram-reading', parts: input.parts };
}

export function transformationApplication(
  input: QuestionBaseInput & { parts: MultiPartItemInput[] },
): TestQuestionInput {
  return { ...base(input), type: 'transformation-application', parts: input.parts };
}

export function numeric(
  input: QuestionBaseInput & { answer: number; tolerance?: number; unit?: string },
): TestQuestionInput {
  return {
    ...base(input),
    type: 'numeric',
    answer: input.answer,
    tolerance: input.tolerance ?? 0,
    ...(input.unit ? { unit: input.unit } : {}),
  };
}

export function exact(
  input: QuestionBaseInput & {
    numerator: number;
    denominator: number;
    acceptEquivalentForms?: boolean;
    unit?: string;
  },
): TestQuestionInput {
  return {
    ...base(input),
    type: 'exact',
    answer: { numerator: input.numerator, denominator: input.denominator },
    acceptEquivalentForms: input.acceptEquivalentForms ?? true,
    ...(input.unit ? { unit: input.unit } : {}),
  };
}

export function ordering(
  input: QuestionBaseInput & { items: Choice[]; answerOrder: string[] },
): TestQuestionInput {
  return { ...base(input), type: 'ordering', items: input.items, answerOrder: input.answerOrder };
}

export function matching(
  input: QuestionBaseInput & {
    left: Choice[];
    right: Choice[];
    pairs: Record<string, string>;
    allowReuse?: boolean;
  },
): TestQuestionInput {
  return {
    ...base(input),
    type: 'matching',
    left: input.left,
    right: input.right,
    pairs: input.pairs,
    ...(input.allowReuse ? { allowReuse: true } : {}),
  };
}

export function classification(
  input: QuestionBaseInput & {
    categories: Choice[];
    items: Choice[];
    assignment: Record<string, string>;
  },
): TestQuestionInput {
  return {
    ...base(input),
    type: 'classification',
    categories: input.categories,
    items: input.items,
    assignment: input.assignment,
  };
}

export function errorAnalysis(
  input: QuestionBaseInput & {
    steps: Choice[];
    choices: Choice[];
    answer: string;
    correction?: ChoicePartInput;
    justification?: ChoicePartInput;
  },
): TestQuestionInput {
  return {
    ...base(input),
    type: 'error-analysis',
    steps: input.steps,
    choices: input.choices,
    answerId: input.answer,
    ...(input.correction ? { correction: input.correction } : {}),
    ...(input.justification ? { justification: input.justification } : {}),
  };
}

/* ------------------------------------------------------------------------ */
/*  Solutions                                                                */
/* ------------------------------------------------------------------------ */

/** Build one independently explained/scored solution part. */
export function solutionPart(input: {
  id: string;
  answer: string;
  given?: (string | ContentBlock)[];
  steps: (string | ContentBlock)[];
  rule?: string;
  check?: string;
  commonError?: string;
  diagramNotes?: (string | ContentBlock)[];
  scoringCriteria?: { points: number; description: string }[];
  sourceVerified?: (string | ContentBlock)[];
  platformAuthored?: (string | ContentBlock)[];
  provenance?: {
    sourceVerified?: (string | ContentBlock)[];
    platformAuthored?: (string | ContentBlock)[];
  };
  sourceRefs?: SourceRef[];
}): SolutionPartInput {
  const provenance = input.provenance ?? {};
  return {
    id: input.id,
    answerSummary: input.answer,
    given: toBlocks(input.given ?? []),
    steps: toBlocks(input.steps),
    ...(input.rule ? { rule: input.rule } : {}),
    ...(input.check ? { check: input.check } : {}),
    ...(input.commonError ? { commonError: input.commonError } : {}),
    diagramNotes: toBlocks(input.diagramNotes ?? []),
    scoringCriteria: input.scoringCriteria ?? [],
    provenance: {
      sourceVerified: toBlocks(input.sourceVerified ?? provenance.sourceVerified ?? []),
      platformAuthored: toBlocks(input.platformAuthored ?? provenance.platformAuthored ?? []),
    },
    ...(input.sourceRefs ? { sourceRefs: input.sourceRefs } : {}),
  };
}

/**
 * A pedagogical solution. `steps` explain WHY; `rule` names the property used;
 * `given`, `diagramNotes`, provenance and `parts` make future detailed
 * solutions explicit without changing the existing lesson solution files.
 */
export function solution(input: {
  answer: string;
  given?: (string | ContentBlock)[];
  steps: (string | ContentBlock)[];
  rule?: string;
  check?: string;
  commonError?: string;
  diagramNotes?: (string | ContentBlock)[];
  scoringCriteria?: { points: number; description: string }[];
  sourceVerified?: (string | ContentBlock)[];
  platformAuthored?: (string | ContentBlock)[];
  provenance?: {
    sourceVerified?: (string | ContentBlock)[];
    platformAuthored?: (string | ContentBlock)[];
  };
  parts?: SolutionPartInput[];
  sourceRefs?: SourceRef[];
}): TestSolutionInput {
  const provenance = input.provenance ?? {};
  return {
    answerSummary: input.answer,
    given: toBlocks(input.given ?? []),
    steps: toBlocks(input.steps),
    ...(input.rule ? { rule: input.rule } : {}),
    ...(input.check ? { check: input.check } : {}),
    ...(input.commonError ? { commonError: input.commonError } : {}),
    diagramNotes: toBlocks(input.diagramNotes ?? []),
    scoringCriteria: input.scoringCriteria ?? [],
    provenance: {
      sourceVerified: toBlocks(input.sourceVerified ?? provenance.sourceVerified ?? []),
      platformAuthored: toBlocks(input.platformAuthored ?? provenance.platformAuthored ?? []),
    },
    parts: input.parts ?? [],
    ...(input.sourceRefs ? { sourceRefs: input.sourceRefs } : {}),
  };
}
