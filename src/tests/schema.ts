import { z } from 'zod';
import { contentBlockSchema, idSchema, sourceRefSchema } from '@/content/schema';

/**
 * ============================================================================
 *  TEST AREA — SCHEMA (the contract of the Test Domain)
 * ============================================================================
 *
 *  This domain is deliberately independent of the in-lesson assessment system.
 *  It owns the question, answer, scoring, session and worked-solution
 *  contracts used by the Test Area only.
 *
 *  Questions remain data: no question, lesson definition or worked solution is
 *  authored in this file. The schemas below make future authored content
 *  explicit and deterministically gradable without attempting to grade
 *  unrestricted mathematical prose.
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
  'true-false-justify',
  'short-answer',
  'fill-in',
  'numeric',
  'exact',
  'ordering',
  'matching',
  'classification',
  'justification',
  'multi-part',
  'diagram-reading',
  'transformation-application',
  'error-analysis',
]);
export type QuestionType = z.infer<typeof questionTypeSchema>;

export const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  'single-choice': 'اختيار من متعدد',
  'multi-select': 'اختيار متعدد الإجابات',
  'true-false': 'صح أو خطأ',
  'true-false-justify': 'صح أو خطأ مع تعليل',
  'short-answer': 'إجابة قصيرة مضبوطة',
  'fill-in': 'ملء الفراغات',
  numeric: 'إجابة عددية',
  exact: 'إجابة دقيقة (كسر)',
  ordering: 'ترتيب',
  matching: 'مطابقة',
  classification: 'تصنيف',
  justification: 'تبرير منظّم',
  'multi-part': 'سؤال متعدد الأجزاء',
  'diagram-reading': 'قراءة شكل هندسي',
  'transformation-application': 'تطبيق تحويل أو تطابق',
  'error-analysis': 'تحليل خطأ وتصحيحه',
};

/** How the learner answers — shown in the runner as a short instruction. */
export const ANSWER_INSTRUCTIONS: Record<QuestionType, string> = {
  'single-choice': 'اختر إجابة واحدة.',
  'multi-select': 'اختر كل الإجابات الصحيحة.',
  'true-false': 'حدّد ما إذا كانت العبارة صحيحة أم خاطئة.',
  'true-false-justify': 'حدّد صح أو خطأ، ثم اختر التصحيح أو التعليل المطلوب.',
  'short-answer': 'اكتب مصطلحاً أو عبارة قصيرة من الإجابات المقبولة.',
  'fill-in': 'املأ كل فراغ بإجابة مضبوطة من النوع المطلوب.',
  numeric: 'اكتب القيمة العددية.',
  exact: 'اكتب القيمة الدقيقة، ويقبل الشكل الكسري مثل 1/2 أو العشري مثل 0.5.',
  ordering: 'رتّب العناصر بالترتيب الصحيح.',
  matching: 'طابق كل عنصر في العمود الأول مع ما يناسبه.',
  classification: 'صنّف كل عنصر ضمن الفئة المناسبة.',
  justification: 'أكمل خطوات التبرير المنظّم باختيار الإجابة المناسبة لكل خطوة.',
  'multi-part': 'أجب عن كل جزء؛ لكل جزء درجة مستقلة.',
  'diagram-reading': 'اقرأ المعطيات المعلّمة في الشكل وأجب عن أجزائه المنظّمة.',
  'transformation-application': 'طبّق التحويل أو حالة التطابق عبر الأجزاء المنظّمة.',
  'error-analysis': 'حدّد موضع الخطأ، ثم اختر التصحيح والسبب إن وُجدا.',
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

/** A controlled choice sub-part used by justification/correction contracts. */
export const choicePartSchema = z.object({
  id: idSchema,
  prompt: promptBlocksSchema,
  choices: z.array(choiceSchema).min(2),
  answerId: idSchema,
  points: z.number().int().positive().default(1),
});
export type ChoicePart = z.infer<typeof choicePartSchema>;
export type ChoicePartInput = z.input<typeof choicePartSchema>;

/**
 * A controlled text blank. Accepted answers are authored explicitly; the
 * engine normalises terms only, never attempts to solve arbitrary mathematics.
 */
export const fillInBlankSchema = z.object({
  id: idSchema,
  label: z.string().min(1),
  acceptedAnswers: z.array(z.string().min(1)).min(1),
  normalization: z.enum(['term', 'exact-text']).default('term'),
  points: z.number().int().positive().default(1),
});
export type FillInBlank = z.infer<typeof fillInBlankSchema>;
export type FillInBlankInput = z.input<typeof fillInBlankSchema>;

const controlledTextFields = {
  acceptedAnswers: z.array(z.string().min(1)).min(1),
  normalization: z.enum(['term', 'exact-text']).default('term'),
};

/* ------------------------------------------------------------------------ */
/*  Nested multi-part items                                                  */
/* ------------------------------------------------------------------------ */

const partBase = {
  id: idSchema,
  prompt: promptBlocksSchema,
  points: z.number().int().positive().default(1),
};

export const multiPartChoiceSchema = z.object({
  ...partBase,
  type: z.literal('single-choice'),
  choices: z.array(choiceSchema).min(2),
  answerId: idSchema,
});

export const multiPartMultiSelectSchema = z.object({
  ...partBase,
  type: z.literal('multi-select'),
  choices: z.array(choiceSchema).min(2),
  answerIds: z.array(idSchema).min(1),
});

export const multiPartBooleanSchema = z.object({
  ...partBase,
  type: z.literal('true-false'),
  answer: z.boolean(),
});

export const multiPartNumericSchema = z.object({
  ...partBase,
  type: z.literal('numeric'),
  answer: z.number(),
  tolerance: z.number().nonnegative().default(0),
  unit: z.string().min(1).optional(),
});

export const multiPartExactSchema = z.object({
  ...partBase,
  type: z.literal('exact'),
  answer: fractionSchema,
  acceptEquivalentForms: z.boolean().default(true),
  unit: z.string().min(1).optional(),
});

export const multiPartOrderingSchema = z.object({
  ...partBase,
  type: z.literal('ordering'),
  items: z.array(choiceSchema).min(2),
  answerOrder: z.array(idSchema).min(2),
});

export const multiPartMatchingSchema = z.object({
  ...partBase,
  type: z.literal('matching'),
  left: z.array(choiceSchema).min(2),
  right: z.array(choiceSchema).min(2),
  pairs: z.record(idSchema, idSchema),
  allowReuse: z.boolean().default(false),
});

export const multiPartFillInSchema = z.object({
  ...partBase,
  type: z.literal('fill-in'),
  blanks: z.array(fillInBlankSchema).min(1),
});

export const multiPartShortAnswerSchema = z.object({
  ...partBase,
  type: z.literal('short-answer'),
  ...controlledTextFields,
});

export const multiPartItemSchema = z.discriminatedUnion('type', [
  multiPartChoiceSchema,
  multiPartMultiSelectSchema,
  multiPartBooleanSchema,
  multiPartNumericSchema,
  multiPartExactSchema,
  multiPartOrderingSchema,
  multiPartMatchingSchema,
  multiPartFillInSchema,
  multiPartShortAnswerSchema,
]);
export type MultiPartItem = z.infer<typeof multiPartItemSchema>;
export type MultiPartItemInput = z.input<typeof multiPartItemSchema>;

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

/**
 * A true/false verdict followed by one or both controlled sub-parts. A
 * correction is normally shown when the verdict is false; a justification may
 * be shown for either verdict. Each sub-part has its own points.
 */
export const trueFalseJustifyQuestionSchema = z
  .object({
    ...questionBase,
    type: z.literal('true-false-justify'),
    answer: z.boolean(),
    correction: choicePartSchema.optional(),
    justification: choicePartSchema.optional(),
  })
  .refine((question) => Boolean(question.correction || question.justification), {
    message: 'true-false-justify needs a correction or justification part',
  });

export const shortAnswerQuestionSchema = z.object({
  ...questionBase,
  type: z.literal('short-answer'),
  ...controlledTextFields,
});

export const fillInQuestionSchema = z.object({
  ...questionBase,
  type: z.literal('fill-in'),
  blanks: z.array(fillInBlankSchema).min(1),
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
 * `false` only when the FORM itself is part of what is being assessed.
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
  /** leftId → rightId. Every pair is required for a full answer. */
  pairs: z.record(idSchema, idSchema),
  /** Set true only when several left items may intentionally share a target. */
  allowReuse: z.boolean().default(false),
});

export const classificationQuestionSchema = z.object({
  ...questionBase,
  type: z.literal('classification'),
  categories: z.array(choiceSchema).min(2),
  items: z.array(choiceSchema).min(2),
  /** itemId → categoryId. Every item must be classified correctly. */
  assignment: z.record(idSchema, idSchema),
});

export const justificationQuestionSchema = z.object({
  ...questionBase,
  type: z.literal('justification'),
  /** Ordered reasoning steps, each independently scored. */
  steps: z.array(choicePartSchema).min(2),
});

export const multiPartQuestionSchema = z.object({
  ...questionBase,
  type: z.literal('multi-part'),
  /** Parts may be choices, controlled text, numeric, exact, matching or order. */
  parts: z.array(multiPartItemSchema).min(2),
});

/** Structured figure/geometry applications use the same independently scored
 * part contract, with a named type so blueprints can audit this pedagogy. */
export const diagramReadingQuestionSchema = z.object({
  ...questionBase,
  type: z.literal('diagram-reading'),
  parts: z.array(multiPartItemSchema).min(1),
});

export const transformationApplicationQuestionSchema = z.object({
  ...questionBase,
  type: z.literal('transformation-application'),
  parts: z.array(multiPartItemSchema).min(1),
});

/**
 * ERROR ANALYSIS — a deliberately flawed worked solution is displayed and the
 * learner identifies where it breaks down. The optional controlled correction
 * and justification make the error, correction and reason visible and
 * independently gradable without free-form mathematical auto-grading.
 */
export const errorAnalysisQuestionSchema = z.object({
  ...questionBase,
  type: z.literal('error-analysis'),
  /** The flawed reasoning, one step per entry, displayed in order. */
  steps: z.array(choiceSchema).min(2),
  choices: z.array(choiceSchema).min(2),
  answerId: idSchema,
  correction: choicePartSchema.optional(),
  justification: choicePartSchema.optional(),
});

function addIssue(ctx: z.RefinementCtx, path: (string | number)[], message: string) {
  ctx.addIssue({ code: 'custom', path, message });
}

function validateUniqueIds(
  values: { id: string }[],
  ctx: z.RefinementCtx,
  path: (string | number)[],
  label: string,
) {
  const ids = values.map((value) => value.id);
  if (new Set(ids).size !== ids.length) addIssue(ctx, path, `${label} ids must be unique`);
}

function validateChoicePartReferences(
  part: ChoicePart,
  ctx: z.RefinementCtx,
  path: (string | number)[],
) {
  validateUniqueIds(part.choices, ctx, [...path, 'choices'], 'choice');
  if (!part.choices.some((choice) => choice.id === part.answerId)) {
    addIssue(ctx, [...path, 'answerId'], 'answerId must reference one of the choices');
  }
}

function validateChoiceReferences(
  choices: Choice[],
  answerIds: string[],
  ctx: z.RefinementCtx,
  path: (string | number)[],
) {
  validateUniqueIds(choices, ctx, path, 'choice');
  const ids = new Set(choices.map((choice) => choice.id));
  for (const answerId of answerIds) {
    if (!ids.has(answerId))
      addIssue(ctx, [...path, 'answerIds'], `unknown choice id «${answerId}»`);
  }
  if (new Set(answerIds).size !== answerIds.length) {
    addIssue(ctx, [...path, 'answerIds'], 'answer ids must be unique');
  }
}

function validateItemIds(
  items: Choice[],
  answerOrder: string[],
  ctx: z.RefinementCtx,
  path: (string | number)[],
) {
  validateUniqueIds(items, ctx, [...path, 'items'], 'item');
  const ids = items.map((item) => item.id);
  if (
    new Set(answerOrder).size !== answerOrder.length ||
    answerOrder.some((id) => !ids.includes(id))
  ) {
    addIssue(ctx, [...path, 'answerOrder'], 'answerOrder must contain only unique item ids');
  }
  if (answerOrder.length !== ids.length || !ids.every((id) => answerOrder.includes(id))) {
    addIssue(ctx, [...path, 'answerOrder'], 'answerOrder must contain every item exactly once');
  }
}

function validateMapping(
  left: Choice[],
  right: Choice[],
  mapping: Record<string, string>,
  allowReuse: boolean,
  ctx: z.RefinementCtx,
  path: (string | number)[],
  leftLabel: string,
) {
  validateUniqueIds(left, ctx, [...path, 'left'], 'left item');
  validateUniqueIds(right, ctx, [...path, 'right'], 'right item');
  const leftIds = new Set(left.map((item) => item.id));
  const rightIds = new Set(right.map((item) => item.id));
  const keys = Object.keys(mapping);
  if (keys.length !== leftIds.size || keys.some((key) => !leftIds.has(key))) {
    addIssue(ctx, [...path, 'pairs'], `${leftLabel} mapping must cover every left id exactly once`);
  }
  for (const [key, value] of Object.entries(mapping)) {
    if (!rightIds.has(value)) addIssue(ctx, [...path, 'pairs', key], `unknown right id «${value}»`);
  }
  if (!allowReuse && new Set(Object.values(mapping)).size !== Object.values(mapping).length) {
    addIssue(ctx, [...path, 'pairs'], 'right ids may not be reused unless allowReuse is true');
  }
}

function validateMultiPartItemReferences(
  part: MultiPartItem,
  ctx: z.RefinementCtx,
  path: (string | number)[],
) {
  switch (part.type) {
    case 'single-choice':
      validateChoicePartReferences(
        {
          id: part.id,
          prompt: part.prompt,
          choices: part.choices,
          answerId: part.answerId,
          points: part.points,
        },
        ctx,
        path,
      );
      return;
    case 'multi-select':
      validateChoiceReferences(part.choices, part.answerIds, ctx, path);
      return;
    case 'true-false':
    case 'numeric':
    case 'exact':
    case 'fill-in':
    case 'short-answer':
      return;
    case 'ordering':
      validateItemIds(part.items, part.answerOrder, ctx, path);
      return;
    case 'matching':
      validateMapping(part.left, part.right, part.pairs, part.allowReuse, ctx, path, 'left item');
      return;
  }
}

/** Cross-field references are validated here rather than left to authoring convention. */
export const testQuestionSchema = z
  .discriminatedUnion('type', [
    singleChoiceQuestionSchema,
    multiSelectQuestionSchema,
    trueFalseQuestionSchema,
    trueFalseJustifyQuestionSchema,
    shortAnswerQuestionSchema,
    fillInQuestionSchema,
    numericQuestionSchema,
    exactQuestionSchema,
    orderingQuestionSchema,
    matchingQuestionSchema,
    classificationQuestionSchema,
    justificationQuestionSchema,
    multiPartQuestionSchema,
    diagramReadingQuestionSchema,
    transformationApplicationQuestionSchema,
    errorAnalysisQuestionSchema,
  ])
  .superRefine((question, ctx) => {
    switch (question.type) {
      case 'single-choice':
        validateChoiceReferences(question.choices, [question.answerId], ctx, ['choices']);
        return;
      case 'multi-select':
        validateChoiceReferences(question.choices, question.answerIds, ctx, ['choices']);
        return;
      case 'true-false-justify':
        if (question.correction)
          validateChoicePartReferences(question.correction, ctx, ['correction']);
        if (question.justification) {
          validateChoicePartReferences(question.justification, ctx, ['justification']);
        }
        return;
      case 'ordering':
        validateItemIds(question.items, question.answerOrder, ctx, []);
        return;
      case 'matching':
        validateMapping(
          question.left,
          question.right,
          question.pairs,
          question.allowReuse,
          ctx,
          [],
          'left item',
        );
        return;
      case 'classification':
        validateUniqueIds(question.categories, ctx, ['categories'], 'category');
        validateUniqueIds(question.items, ctx, ['items'], 'item');
        if (
          Object.keys(question.assignment).length !== question.items.length ||
          question.items.some(
            (item) => !Object.prototype.hasOwnProperty.call(question.assignment, item.id),
          )
        ) {
          addIssue(ctx, ['assignment'], 'assignment must cover every item exactly once');
        }
        for (const [itemId, categoryId] of Object.entries(question.assignment)) {
          if (!question.items.some((item) => item.id === itemId)) {
            addIssue(ctx, ['assignment', itemId], `unknown item id «${itemId}»`);
          }
          if (!question.categories.some((category) => category.id === categoryId)) {
            addIssue(ctx, ['assignment', itemId], `unknown category id «${categoryId}»`);
          }
        }
        return;
      case 'justification':
        question.steps.forEach((step, index) =>
          validateChoicePartReferences(step, ctx, ['steps', index]),
        );
        return;
      case 'multi-part':
      case 'diagram-reading':
      case 'transformation-application':
        validateUniqueIds(question.parts, ctx, ['parts'], 'part');
        question.parts.forEach((part, index) =>
          validateMultiPartItemReferences(part, ctx, ['parts', index]),
        );
        return;
      case 'error-analysis':
        validateUniqueIds(question.steps, ctx, ['steps'], 'step');
        validateChoiceReferences(question.choices, [question.answerId], ctx, ['choices']);
        if (question.correction)
          validateChoicePartReferences(question.correction, ctx, ['correction']);
        if (question.justification) {
          validateChoicePartReferences(question.justification, ctx, ['justification']);
        }
        return;
      case 'true-false':
      case 'short-answer':
      case 'fill-in':
      case 'numeric':
      case 'exact':
        return;
    }
  });
export type TestQuestion = z.infer<typeof testQuestionSchema>;

/** Authoring-side type: what you WRITE, before zod applies defaults. */
export type TestQuestionInput = z.input<typeof testQuestionSchema>;

/* ------------------------------------------------------------------------ */
/*  Solutions                                                                */
/* ------------------------------------------------------------------------ */

export const solutionProvenanceSchema = z
  .object({
    /** Statements directly checked against the supplied/source material. */
    sourceVerified: z.array(contentBlockSchema).default([]),
    /** Explanatory connections written by the platform author. */
    platformAuthored: z.array(contentBlockSchema).default([]),
  })
  .default({ sourceVerified: [], platformAuthored: [] });
export type SolutionProvenance = z.infer<typeof solutionProvenanceSchema>;
export type SolutionProvenanceInput = z.input<typeof solutionProvenanceSchema>;

export const scoringCriterionSchema = z.object({
  points: z.number().int().positive(),
  description: z.string().min(1),
});
export type ScoringCriterion = z.infer<typeof scoringCriterionSchema>;
export type ScoringCriterionInput = z.input<typeof scoringCriterionSchema>;

export const solutionPartSchema = z.object({
  id: idSchema,
  answerSummary: z.string().min(1),
  /** Givens or the data used specifically by this part. */
  given: z.array(contentBlockSchema).default([]),
  steps: z.array(contentBlockSchema).min(1),
  rule: z.string().min(1).optional(),
  check: z.string().min(1).optional(),
  commonError: z.string().min(1).optional(),
  diagramNotes: z.array(contentBlockSchema).default([]),
  scoringCriteria: z.array(scoringCriterionSchema).default([]),
  provenance: solutionProvenanceSchema,
  sourceRefs: z.array(sourceRefSchema).optional(),
});
export type SolutionPart = z.infer<typeof solutionPartSchema>;
export type SolutionPartInput = z.input<typeof solutionPartSchema>;

/**
 * A pedagogical solution — not an answer-key line. The defaults preserve the
 * existing authored solution files while giving future lesson/unit PRs a
 * complete structure for givens, source/platform distinction, diagrams and
 * per-part scoring.
 */
export const solutionSchema = z.object({
  /** Short answer statement, e.g. «الخيار (ب)» أو «$7.5$». */
  answerSummary: z.string().min(1),
  /** Givens, named data or the quantities read from a diagram. */
  given: z.array(contentBlockSchema).default([]),
  /** The reasoning, as typed blocks. */
  steps: z.array(contentBlockSchema).min(1),
  /** The rule / property / definition the question rests on. */
  rule: z.string().min(1).optional(),
  /** How to verify the result independently. */
  check: z.string().min(1).optional(),
  /** The mistake this question is designed to catch. */
  commonError: z.string().min(1).optional(),
  /** Explicit references to labelled points/relationships in a diagram. */
  diagramNotes: z.array(contentBlockSchema).default([]),
  /** Separates verified source statements from platform-authored explanation. */
  provenance: solutionProvenanceSchema,
  /** Overall or per-part deterministic scoring criteria for the teacher view. */
  scoringCriteria: z.array(scoringCriterionSchema).default([]),
  /** Independent worked entries for multi-part/justification/error questions. */
  parts: z.array(solutionPartSchema).default([]),
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
 * `solutionPolicy: detailed` is the opt-in contract used by future lesson and
 * Unit PRs; the current legacy content remains unchanged in this foundation PR.
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
   * comprehensive test. The registry resolves it against the content registry.
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
  /** Legacy preserves the current authored solution sets; future PRs use detailed. */
  solutionPolicy: z.enum(['legacy', 'detailed']).default('legacy'),
});
export type TestDefinition = z.infer<typeof testDefinitionSchema>;
export type TestDefinitionInput = z.input<typeof testDefinitionSchema>;

/* ------------------------------------------------------------------------ */
/*  Learner answers                                                          */
/* ------------------------------------------------------------------------ */

const singleAnswerSchema = z.object({ kind: z.literal('single'), optionId: z.string() });
const multiAnswerSchema = z.object({ kind: z.literal('multi'), optionIds: z.array(z.string()) });
const booleanAnswerSchema = z.object({ kind: z.literal('boolean'), value: z.boolean() });
const numericAnswerSchema = z.object({ kind: z.literal('numeric'), raw: z.string() });
const exactAnswerSchema = z.object({ kind: z.literal('exact'), raw: z.string() });
const orderAnswerSchema = z.object({ kind: z.literal('order'), itemIds: z.array(z.string()) });
const matchingAnswerSchema = z.object({
  kind: z.literal('matching'),
  pairs: z.record(z.string(), z.string()),
});
const classificationAnswerSchema = z.object({
  kind: z.literal('classification'),
  assignments: z.record(z.string(), z.string()),
});
const shortAnswerValueSchema = z.object({ kind: z.literal('short-answer'), raw: z.string() });
const fillInAnswerSchema = z.object({
  kind: z.literal('fill-in'),
  values: z.record(z.string(), z.string()),
});

const partAnswerSchemas = [
  singleAnswerSchema,
  multiAnswerSchema,
  booleanAnswerSchema,
  numericAnswerSchema,
  exactAnswerSchema,
  orderAnswerSchema,
  matchingAnswerSchema,
  shortAnswerValueSchema,
  fillInAnswerSchema,
] as const;

export const partAnswerValueSchema = z.discriminatedUnion('kind', partAnswerSchemas);
export type PartAnswerValue = z.infer<typeof partAnswerValueSchema>;

const trueFalseJustifyAnswerSchema = z.object({
  kind: z.literal('true-false-justify'),
  value: z.boolean(),
  correctionId: z.string().optional(),
  justificationId: z.string().optional(),
});
const justificationAnswerSchema = z.object({
  kind: z.literal('justification'),
  selections: z.record(z.string(), z.string()),
});
const multiPartAnswerSchema = z.object({
  kind: z.literal('multi-part'),
  parts: z.record(z.string(), partAnswerValueSchema),
});
const errorAnalysisAnswerSchema = z.object({
  kind: z.literal('error-analysis'),
  stepId: z.string(),
  correctionId: z.string().optional(),
  justificationId: z.string().optional(),
});

export const answerValueSchema = z.discriminatedUnion('kind', [
  ...partAnswerSchemas,
  classificationAnswerSchema,
  trueFalseJustifyAnswerSchema,
  justificationAnswerSchema,
  multiPartAnswerSchema,
  errorAnalysisAnswerSchema,
]);
export type AnswerValue = z.infer<typeof answerValueSchema>;

export type AnswerMap = Record<string, AnswerValue | undefined>;

/** Per-question outcome — computed, never stored as the source of truth. */
export const outcomeSchema = z.enum(['correct', 'partially-correct', 'incorrect', 'unanswered']);
export type Outcome = z.infer<typeof outcomeSchema>;
