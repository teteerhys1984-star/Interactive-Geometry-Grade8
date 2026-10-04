import { z } from 'zod';
import { contentBlockSchema, idSchema, sourceRefSchema } from '@/content/schema';

/**
 * ============================================================================
 *  TEST AREA — SCHEMA (the contract of the Test Domain)
 * ============================================================================
 *
 *  ⚠️  This domain is INDEPENDENT of the in-lesson assessments
 *      (`Assessment` in `src/content/schema.ts`), which keep their own types,
 *      their own grading (`src/lib/grading.ts`) and their own UI
 *      (`src/routes/AssessmentPage.tsx`). Nothing here imports, rewrites or
 *      replaces them.
 *
 *  Everything below describes the SHAPE of the data only. No question lives in
 *  this file: questions are authored in `src/tests/questions/`, test metadata in
 *  `src/tests/definitions/`, and worked solutions in `src/tests/solutions/`
 *  (loaded lazily so an active test never holds solution text in memory).
 *
 *  The same pattern as the course content applies: extend the schema FIRST,
 *  then author the data — never the other way round.
 * ============================================================================
 */

/* ------------------------------------------------------------------------ */
/*  Difficulty                                                               */
/* ------------------------------------------------------------------------ */

export const difficultySchema = z.enum(['basic', 'medium', 'advanced', 'thinking']);
export type Difficulty = z.infer<typeof difficultySchema>;

/** Canonical order used by reports, blueprints and the UI legend. */
export const DIFFICULTY_ORDER = ['basic', 'medium', 'advanced', 'thinking'] as const;

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  basic: 'أساسي',
  medium: 'متوسط',
  advanced: 'متقدّم',
  thinking: 'تفكير',
};

/** One-line description of what each level measures. */
export const DIFFICULTY_DESCRIPTIONS: Record<Difficulty, string> = {
  basic: 'قياس الفهم المباشر للمفهوم أو التعريف كما ورد في الدرس.',
  medium: 'تطبيق قاعدة أو مفهوم في موقف جديد لم يرد حرفياً في الدرس.',
  advanced: 'ربط أكثر من مفهوم، أو التعامل مع حالة أكثر تعقيداً.',
  thinking: 'تحليل، استنتاج، كشف خطأ، مقارنة، تبرير، أو اختيار الحل الأنسب.',
};

/* ------------------------------------------------------------------------ */
/*  Question types                                                           */
/* ------------------------------------------------------------------------ */

export const questionTypeSchema = z.enum([
  'single-choice',
  'multi-select',
  'true-false',
  'numeric',
  'exact',
  'ordering',
  'matching',
  'classification',
  'error-analysis',
]);
export type QuestionType = z.infer<typeof questionTypeSchema>;

export const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  'single-choice': 'اختيار من متعدد',
  'multi-select': 'اختيار متعدد الإجابات',
  'true-false': 'صح أو خطأ',
  numeric: 'إجابة عددية',
  exact: 'إجابة دقيقة (كسر)',
  ordering: 'ترتيب',
  matching: 'مطابقة',
  classification: 'تصنيف',
  'error-analysis': 'تحليل خطأ',
};

/** How the learner answers — shown in the runner as a short instruction. */
export const ANSWER_INSTRUCTIONS: Record<QuestionType, string> = {
  'single-choice': 'اختر إجابة واحدة.',
  'multi-select': 'اختر كل الإجابات الصحيحة.',
  'true-false': 'حدّد ما إذا كانت العبارة صحيحة أم خاطئة.',
  numeric: 'اكتب القيمة العددية.',
  exact: 'اكتب القيمة الدقيقة، ويقبل الشكل الكسري مثل 1/2 أو العشري مثل 0.5.',
  ordering: 'رتّب العناصر بالترتيب الصحيح.',
  matching: 'طابق كل عنصر في العمود الأول مع ما يناسبه.',
  classification: 'صنّف كل عنصر ضمن الفئة المناسبة.',
  'error-analysis': 'حدّد موضع الخطأ في الحل المعروض.',
};

/* ------------------------------------------------------------------------ */
/*  Shared pieces                                                            */
/* ------------------------------------------------------------------------ */

/** `text` is Arabic prose and may embed inline maths with `$…$`. */
const choiceSchema = z.object({ id: idSchema, text: z.string().min(1) });
export type Choice = z.infer<typeof choiceSchema>;

const promptBlocksSchema = z.array(contentBlockSchema).min(1);

/** An exact rational value — the only shape an `exact` answer may take. */
const fractionSchema = z
  .object({
    numerator: z.number().int(),
    denominator: z.number().int(),
  })
  .refine((value) => value.denominator !== 0, { message: 'denominator must not be zero' });
export type Fraction = z.infer<typeof fractionSchema>;

const questionBase = {
  /** Stable, unique and human-readable — never an array index. */
  id: idSchema,
  /** The lesson this question assesses. Drives coverage reporting. */
  lessonId: idSchema,
  /** Concept slug (lowercase-dashed) used by the blueprint coverage audit. */
  concept: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'concept must be a slug'),
  difficulty: difficultySchema,
  /** Question text as typed content blocks (never JSX). */
  prompt: promptBlocksSchema,
  /** Textbook provenance. Required: every question is anchored to real pages. */
  sourceRefs: z.array(sourceRefSchema).min(1),
};

/* ------------------------------------------------------------------------ */
/*  Question variants                                                        */
/* ------------------------------------------------------------------------ */

export const singleChoiceQuestionSchema = z.object({
  ...questionBase,
  type: z.literal('single-choice'),
  choices: z.array(choiceSchema).min(2),
  answerId: idSchema,
});

export const multiSelectQuestionSchema = z.object({
  ...questionBase,
  type: z.literal('multi-select'),
  choices: z.array(choiceSchema).min(3),
  answerIds: z.array(idSchema).min(2),
});

export const trueFalseQuestionSchema = z.object({
  ...questionBase,
  type: z.literal('true-false'),
  answer: z.boolean(),
});

export const numericQuestionSchema = z.object({
  ...questionBase,
  type: z.literal('numeric'),
  answer: z.number(),
  /** Absolute tolerance. Zero unless a measurement genuinely justifies one. */
  tolerance: z.number().nonnegative().default(0),
  unit: z.string().min(1).optional(),
});

/**
 * Exact value question (fractions, decimals, integers).
 *
 * `acceptEquivalentForms` defaults to `true`: the learner may answer `1/2`,
 * `2/4` or `0.5` and all three are mathematically the same number. Set it to
 * `false` only when the FORM itself is part of what is being assessed (for
 * example: "give the result as a reduced fraction").
 */
export const exactQuestionSchema = z.object({
  ...questionBase,
  type: z.literal('exact'),
  answer: fractionSchema,
  acceptEquivalentForms: z.boolean().default(true),
  unit: z.string().min(1).optional(),
});

export const orderingQuestionSchema = z.object({
  ...questionBase,
  type: z.literal('ordering'),
  /** Items in the order they are DISPLAYED (never the correct order). */
  items: z.array(choiceSchema).min(3),
  /** The one fully correct sequence, by item id. */
  answerOrder: z.array(idSchema).min(3),
});

export const matchingQuestionSchema = z.object({
  ...questionBase,
  type: z.literal('matching'),
  left: z.array(choiceSchema).min(2),
  right: z.array(choiceSchema).min(2),
  /** leftId → rightId. Every pair is required for the answer to count. */
  pairs: z.record(idSchema, idSchema),
});

export const classificationQuestionSchema = z.object({
  ...questionBase,
  type: z.literal('classification'),
  categories: z.array(choiceSchema).min(2),
  items: z.array(choiceSchema).min(2),
  /** itemId → categoryId. Every item must be classified correctly. */
  assignment: z.record(idSchema, idSchema),
});

/**
 * ERROR ANALYSIS — a deliberately flawed worked solution is displayed and the
 * learner identifies where it breaks down. Deterministically gradable because
 * the answer is one of the offered options, not free prose.
 */
export const errorAnalysisQuestionSchema = z.object({
  ...questionBase,
  type: z.literal('error-analysis'),
  /** The flawed reasoning, one step per entry, displayed in order. */
  steps: z.array(choiceSchema).min(2),
  choices: z.array(choiceSchema).min(2),
  answerId: idSchema,
});

export const testQuestionSchema = z.discriminatedUnion('type', [
  singleChoiceQuestionSchema,
  multiSelectQuestionSchema,
  trueFalseQuestionSchema,
  numericQuestionSchema,
  exactQuestionSchema,
  orderingQuestionSchema,
  matchingQuestionSchema,
  classificationQuestionSchema,
  errorAnalysisQuestionSchema,
]);
export type TestQuestion = z.infer<typeof testQuestionSchema>;

/** Authoring-side type: what you WRITE, before zod applies defaults. */
export type TestQuestionInput = z.input<typeof testQuestionSchema>;

/* ------------------------------------------------------------------------ */
/*  Solutions                                                                */
/* ------------------------------------------------------------------------ */

/**
 * A pedagogical solution — not an answer key line.
 *
 * It states the answer, explains WHY, names the rule or concept used, and adds
 * a verification and/or the common error when those genuinely help. Solutions
 * live in `src/tests/solutions/` and are loaded lazily: the active test never
 * imports them.
 */
export const solutionSchema = z.object({
  /** Short answer statement, e.g. «الخيار (ب)» أو «$7.5$». */
  answerSummary: z.string().min(1),
  /** The reasoning, as typed blocks. */
  steps: z.array(contentBlockSchema).min(1),
  /** The rule / property / definition the question rests on. */
  rule: z.string().min(1).optional(),
  /** How to verify the result independently. */
  check: z.string().min(1).optional(),
  /** The mistake this question is designed to catch. */
  commonError: z.string().min(1).optional(),
  /** Only when the solution leans on different pages than the question. */
  sourceRefs: z.array(sourceRefSchema).optional(),
});
export type TestSolution = z.infer<typeof solutionSchema>;
export type TestSolutionInput = z.input<typeof solutionSchema>;

export const solutionSetSchema = z.object({
  /** Must match the test definition id — audited. */
  testId: idSchema,
  solutions: z.record(idSchema, solutionSchema),
});
export type SolutionSet = z.infer<typeof solutionSetSchema>;
export type SolutionSetInput = z.input<typeof solutionSetSchema>;

/* ------------------------------------------------------------------------ */
/*  Test definitions                                                         */
/* ------------------------------------------------------------------------ */

export const testScopeSchema = z.enum(['lesson', 'unit', 'comprehensive']);
export type TestScope = z.infer<typeof testScopeSchema>;

export const SCOPE_LABELS: Record<TestScope, string> = {
  lesson: 'اختبار درس',
  unit: 'اختبار وحدة',
  comprehensive: 'اختبار شامل',
};

/**
 * The declared plan of a test, audited against the actual questions.
 *
 * Blueprint numbers are a CONTRACT: `src/tests/audit.test.ts` fails if the
 * authored questions stop matching what the blueprint claims. That is what
 * keeps coverage, difficulty and type distribution honest.
 */
export const blueprintSchema = z.object({
  coverage: z
    .array(
      z.object({
        concept: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
        label: z.string().min(1),
        count: z.number().int().positive(),
      }),
    )
    .min(1),
  difficulty: z
    .array(z.object({ level: difficultySchema, count: z.number().int().nonnegative() }))
    .min(1),
  types: z
    .array(z.object({ type: questionTypeSchema, count: z.number().int().nonnegative() }))
    .min(1),
});
export type Blueprint = z.infer<typeof blueprintSchema>;

export const testDefinitionSchema = z.object({
  id: idSchema,
  title: z.string().min(1),
  scope: testScopeSchema,
  /**
   * `lessonId` for lesson tests, `unitId` for unit tests, `subjectId` for a
   * comprehensive test. The registry resolves it against the content registry
   * and refuses to publish a test that points at content that does not exist.
   */
  targetId: idSchema,
  summary: z.string().min(1),
  instructions: z.string().min(1),
  passingScore: z.number().min(0).max(100).default(60),
  /** Questions per group in the Solutions Area (lesson: 5, unit: 10). */
  solutionGroupSize: z.number().int().positive().default(5),
  /** Explicit, ordered list of question ids. Never positional identity. */
  questionIds: z.array(idSchema).min(1),
  blueprint: blueprintSchema,
});
export type TestDefinition = z.infer<typeof testDefinitionSchema>;
export type TestDefinitionInput = z.input<typeof testDefinitionSchema>;

/* ------------------------------------------------------------------------ */
/*  Learner answers                                                          */
/* ------------------------------------------------------------------------ */

/**
 * A typed answer payload. The answer map keys on the QUESTION id, so reordering
 * a test can never re-associate an answer with the wrong question.
 */
export type AnswerValue =
  | { kind: 'single'; optionId: string }
  | { kind: 'multi'; optionIds: string[] }
  | { kind: 'boolean'; value: boolean }
  | { kind: 'numeric'; raw: string }
  | { kind: 'exact'; raw: string }
  | { kind: 'order'; itemIds: string[] }
  | { kind: 'matching'; pairs: Record<string, string> }
  | { kind: 'classification'; assignments: Record<string, string> };

export type AnswerMap = Record<string, AnswerValue | undefined>;

/** Per-question outcome — computed, never stored as the source of truth. */
export const outcomeSchema = z.enum(['correct', 'incorrect', 'unanswered']);
export type Outcome = z.infer<typeof outcomeSchema>;
