import { describe, expect, it } from 'vitest';
import { catalog, getTestEntry, getUnitTest, loadSolutionSet, testQuestions } from './registry';
import { solutionSetCompletenessIssues } from './solutionAudit';
import { answers, gradeQuestionDetailed, gradeTest } from './scoring';
import type { AnswerMap, PartAnswerValue, TestQuestion } from './schema';

/**
 * ============================================================================
 *  UNIT 1 COMPREHENSIVE TEST — REGRESSION GUARDS
 * ============================================================================
 *
 *  These guards pin the rebuilt `unit-01-test` from five directions:
 *
 *   1. BANK     — 60 stable ids, unit scope, no legacy policy.
 *   2. BLUEPRINT — the exact coverage / difficulty / type tables.
 *   3. POINTS   — 100 points, 20 per concept, 20 composite + 40 single.
 *   4. THRESHOLD — 60/100 passes, 59/100 fails, an empty sheet is 0.
 *   5. CONTENT  — detailed solutions, source pages 5–19 only, exactly the three
 *                 audited figures, and no prompt reused from a lesson test.
 * ============================================================================
 */

const TEST_ID = 'unit-01-test';
const LESSON_ID = 'unit-01-parallelograms-and-translation';
const ENGINE_MAXIMUM = 100;
const PASSING_SCORE = 60;

const entry = getTestEntry(TEST_ID)!;
const questionById = new Map(entry.questions.map((question) => [question.id, question]));

const PAGES_BY_LESSON: Record<string, number[]> = {
  'lesson-01-translation-and-properties': [5, 6, 7],
  'lesson-02-image-of-a-point': [8, 9, 10],
  'lesson-03-image-of-a-shape': [11, 12, 13, 14, 15, 16],
  'lesson-04-triangle-congruence': [17, 18, 19],
};

const FIGURE_QUESTION_IDS = ['geo-u01-t01-q19', 'geo-u01-t01-q37', 'geo-u01-t01-q38'];

/* ------------------------------------------------------------------------ */
/*  Helpers                                                                  */
/* ------------------------------------------------------------------------ */

function question(id: string): TestQuestion {
  const found = questionById.get(id);
  if (!found) throw new Error(`missing question ${id}`);
  return found;
}

function pagesOf(refs: { page: string | number }[] | undefined): number[] {
  return (refs ?? []).map((ref) => Number(ref.page)).filter((page) => Number.isFinite(page));
}

type PartAnswerValueInput =
  | { kind: 'single'; optionId: string }
  | { kind: 'numeric'; raw: string }
  | { kind: 'boolean'; value: boolean };

function partAnswer(part: PartAnswerValueInput): PartAnswerValue {
  return part as PartAnswerValue;
}

function correctAnswer(q: TestQuestion) {
  switch (q.type) {
    case 'single-choice':
      return answers.single(q.answerId);
    case 'multi-select':
      return answers.multi(q.answerIds);
    case 'true-false':
      return answers.boolean(q.answer);
    case 'true-false-justify':
      return answers.trueFalseJustify(
        q.answer,
        q.answer === false ? q.correction?.answerId : undefined,
        q.justification?.answerId,
      );
    case 'numeric':
      return answers.numeric(String(q.answer));
    case 'exact':
      return answers.exact(`${q.answer.numerator}/${q.answer.denominator}`);
    case 'ordering':
      return answers.order(q.answerOrder);
    case 'matching':
      return answers.matching(q.pairs);
    case 'classification':
      return answers.classification(q.assignment);
    case 'fill-in':
      return answers.fillIn(
        Object.fromEntries(q.blanks.map((blank) => [blank.id, blank.acceptedAnswers[0]!])),
      );
    case 'short-answer':
      return answers.shortAnswer(q.acceptedAnswers[0]!);
    case 'error-analysis':
      return answers.errorAnalysis(q.answerId, q.correction?.answerId, q.justification?.answerId);
    case 'justification':
      return answers.justification(
        Object.fromEntries(q.steps.map((step) => [step.id, step.answerId])),
      );
    case 'multi-part':
    case 'diagram-reading':
    case 'transformation-application':
      return answers.multiPart(
        Object.fromEntries(
          q.parts.map((part) => {
            if (part.type === 'single-choice')
              return [part.id, partAnswer({ kind: 'single', optionId: part.answerId })];
            if (part.type === 'numeric')
              return [part.id, partAnswer({ kind: 'numeric', raw: String(part.answer) })];
            if (part.type === 'true-false')
              return [part.id, partAnswer({ kind: 'boolean', value: part.answer })];
            throw new Error(`part type ${part.type} not used in this bank`);
          }),
        ),
      );
  }
}

function fullAnswerMap(): AnswerMap {
  return Object.fromEntries(entry.questions.map((q) => [q.id, correctAnswer(q)]));
}

function promptText(q: TestQuestion): string {
  const chunks: string[] = [];
  const visit = (block: TestQuestion['prompt'][number]) => {
    switch (block.type) {
      case 'paragraph':
        chunks.push(block.text);
        break;
      case 'list':
        chunks.push(...block.items);
        break;
      case 'math':
        chunks.push(block.latex);
        break;
      default:
        break;
    }
  };
  q.prompt.forEach(visit);
  return chunks.join(' ');
}

function contentTokens(text: string): Set<string> {
  return new Set(
    text
      .replace(/\$[^$]*\$/g, ' ')
      .replace(/[^\u0621-\u064A0-9 ]/g, ' ')
      .split(/\s+/)
      .filter((word) => word.length > 2),
  );
}

function jaccard(a: Set<string>, b: Set<string>): number {
  let intersection = 0;
  for (const token of a) if (b.has(token)) intersection += 1;
  const union = a.size + b.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

function figuresInPrompt(q: TestQuestion) {
  return q.prompt.filter((block) => block.type === 'figure');
}

/* ------------------------------------------------------------------------ */
/*  1. Bank integrity                                                        */
/* ------------------------------------------------------------------------ */

describe('Unit 1 test — bank and definition', () => {
  it('keeps the 60 stable ids in order, unique, and fully resolved', () => {
    const expectedIds = Array.from(
      { length: 60 },
      (_, i) => `geo-u01-t01-q${String(i + 1).padStart(2, '0')}`,
    );
    expect(entry.definition.id).toBe(TEST_ID);
    expect(entry.definition.questionIds).toEqual(expectedIds);
    expect(entry.questions.map((q) => q.id)).toEqual(expectedIds);
    expect(new Set(expectedIds).size).toBe(60);
  });

  it('is published as the unit test of the real unit, on the detailed solution policy', () => {
    expect(entry.definition.scope).toBe('unit');
    expect(entry.definition.targetId).toBe(LESSON_ID);
    expect(entry.definition.solutionPolicy).toBe('detailed');
    expect(entry.definition.passingScore).toBe(PASSING_SCORE);
    expect(entry.definition.solutionGroupSize).toBe(10);
    expect(getUnitTest(LESSON_ID)?.definition.id).toBe(TEST_ID);
    expect(catalog.problems).toEqual([]);
    expect(entry.coveredLessons.length).toBeGreaterThan(0);
    expect(entry.coveredLessons.every((lesson) => lesson.unit.id === LESSON_ID)).toBe(true);
  });

  it('keeps every question inside the unit and inside the four concept lessons', () => {
    for (const q of entry.questions) {
      expect(Object.keys(PAGES_BY_LESSON)).toContain(q.lessonId);
    }
  });
});

/* ------------------------------------------------------------------------ */
/*  2. Blueprint                                                             */
/* ------------------------------------------------------------------------ */

describe('Unit 1 test — blueprint', () => {
  it('declares the exact coverage table: four lessons plus integration', () => {
    expect(entry.definition.blueprint.coverage).toEqual([
      { concept: 'u1-translation-properties', label: expect.any(String), count: 12 },
      { concept: 'u1-image-point', label: expect.any(String), count: 12 },
      { concept: 'u1-image-shape', label: expect.any(String), count: 12 },
      { concept: 'u1-triangle-congruence', label: expect.any(String), count: 12 },
      { concept: 'u1-integration', label: expect.any(String), count: 12 },
    ]);
  });

  it('declares the exact difficulty table (14 / 22 / 18 / 6)', () => {
    expect(entry.definition.blueprint.difficulty).toEqual([
      { level: 'basic', count: 14 },
      { level: 'medium', count: 22 },
      { level: 'advanced', count: 18 },
      { level: 'thinking', count: 6 },
    ]);
  });

  it('declares all sixteen question types with the exact counts', () => {
    expect(entry.definition.blueprint.types).toEqual([
      { type: 'single-choice', count: 16 },
      { type: 'multi-select', count: 5 },
      { type: 'true-false', count: 8 },
      { type: 'true-false-justify', count: 4 },
      { type: 'short-answer', count: 1 },
      { type: 'fill-in', count: 2 },
      { type: 'numeric', count: 5 },
      { type: 'exact', count: 2 },
      { type: 'ordering', count: 3 },
      { type: 'matching', count: 3 },
      { type: 'classification', count: 1 },
      { type: 'justification', count: 2 },
      { type: 'multi-part', count: 2 },
      { type: 'diagram-reading', count: 1 },
      { type: 'transformation-application', count: 1 },
      { type: 'error-analysis', count: 4 },
    ]);
  });
});

/* ------------------------------------------------------------------------ */
/*  3. Points                                                                */
/* ------------------------------------------------------------------------ */

describe('Unit 1 test — point weights follow the engine', () => {
  it('assigns exactly 1 or 3 points, 100 in total', () => {
    const maxima = entry.questions.map((q) => gradeQuestionDetailed(q, undefined).maxPoints);
    for (const [index, max] of maxima.entries()) {
      expect([1, 3], `${entry.questions[index]!.id} max`).toContain(max);
      expect(max % 1).toBe(0);
    }
    expect(maxima.reduce((sum, value) => sum + value, 0)).toBe(ENGINE_MAXIMUM);
  });

  it('gives every concept exactly 20 points (a fifth of the test each)', () => {
    for (const concept of entry.definition.blueprint.coverage) {
      const total = entry.questions
        .filter((q) => q.concept === concept.concept)
        .reduce((sum, q) => sum + gradeQuestionDetailed(q, undefined).maxPoints, 0);
      expect(total, concept.concept).toBe(20);
    }
  });

  it('is made of 20 composite questions (3 points) and 40 single questions (1 point)', () => {
    const composite = entry.questions.filter(
      (q) => gradeQuestionDetailed(q, undefined).maxPoints === 3,
    );
    const single = entry.questions.filter(
      (q) => gradeQuestionDetailed(q, undefined).maxPoints === 1,
    );
    expect(composite).toHaveLength(20);
    expect(single).toHaveLength(40);
    expect(composite.every((q) => q.type !== 'classification')).toBe(true);
  });
});

/* ------------------------------------------------------------------------ */
/*  4. Grading and the pass threshold                                        */
/* ------------------------------------------------------------------------ */

describe('Unit 1 test — grading and threshold', () => {
  it('earns 100/100 and passes on a fully correct sheet', () => {
    const result = gradeTest(TEST_ID, PASSING_SCORE, entry.questions, fullAnswerMap());
    expect(result.earnedPoints).toBe(ENGINE_MAXIMUM);
    expect(result.maxPoints).toBe(ENGINE_MAXIMUM);
    expect(result.score).toBe(100);
    expect(result.passed).toBe(true);
  });

  it('scores an empty sheet as 0 with no question answered', () => {
    const result = gradeTest(TEST_ID, PASSING_SCORE, entry.questions, {});
    expect(result.earnedPoints).toBe(0);
    expect(result.score).toBe(0);
    expect(result.passed).toBe(false);
    expect(result.unanswered).toBe(60);
  });

  it('passes at exactly 60/100 and fails at 59/100', () => {
    const composite = entry.questions.filter(
      (q) => gradeQuestionDetailed(q, undefined).maxPoints === 3,
    );
    const single = entry.questions.filter(
      (q) => gradeQuestionDetailed(q, undefined).maxPoints === 1,
    );
    const base: AnswerMap = {};
    for (const q of composite.slice(0, 19)) base[q.id] = correctAnswer(q); // 57 points
    for (const q of single.slice(0, 3)) base[q.id] = correctAnswer(q); // + 3 = 60

    const passed = gradeTest(TEST_ID, PASSING_SCORE, entry.questions, base);
    expect(passed.earnedPoints).toBe(60);
    expect(passed.score).toBe(60);
    expect(passed.passed).toBe(true);

    const justBelow: AnswerMap = { ...base };
    delete justBelow[single[2]!.id];
    const failed = gradeTest(TEST_ID, PASSING_SCORE, entry.questions, justBelow);
    expect(failed.earnedPoints).toBe(59);
    expect(failed.score).toBe(59);
    expect(failed.passed).toBe(false);
  });

  it('keeps partial credit per composite part', () => {
    const verdictOnly = gradeQuestionDetailed(
      question('geo-u01-t01-q10'),
      answers.trueFalseJustify(false),
    );
    expect(verdictOnly.earnedPoints).toBe(1);
    expect(verdictOnly.maxPoints).toBe(3);

    const orderingWrong = gradeQuestionDetailed(
      question('geo-u01-t01-q06'),
      answers.order(['s2', 's1', 's3']),
    );
    expect(orderingWrong.earnedPoints).toBe(1);
    expect(orderingWrong.maxPoints).toBe(3);

    const onePartOfThree = gradeQuestionDetailed(
      question('geo-u01-t01-q24'),
      answers.multiPart({
        p1: partAnswer({ kind: 'single', optionId: 'a' }),
        p2: partAnswer({ kind: 'numeric', raw: '99' }),
        p3: partAnswer({ kind: 'numeric', raw: '99' }),
      }),
    );
    expect(onePartOfThree.earnedPoints).toBe(1);
    expect(onePartOfThree.maxPoints).toBe(3);

    const wholeMatch = gradeQuestionDetailed(
      question('geo-u01-t01-q07'),
      answers.matching({ l1: 'r1', l2: 'r3', l3: 'r2' }),
    );
    expect(wholeMatch.earnedPoints).toBe(1);
  });

  it('grades the control response types exactly as authored', () => {
    expect(
      gradeQuestionDetailed(question('geo-u01-t01-q43'), answers.exact('9/2')).earnedPoints,
    ).toBe(1);
    expect(
      gradeQuestionDetailed(question('geo-u01-t01-q43'), answers.exact('4.5')).earnedPoints,
    ).toBe(1);
    expect(
      gradeQuestionDetailed(question('geo-u01-t01-q43'), answers.exact('5.5')).earnedPoints,
    ).toBe(0);
    expect(
      gradeQuestionDetailed(question('geo-u01-t01-q20'), answers.fillIn({ b1: 'متوازي اضلاع' }))
        .earnedPoints,
    ).toBe(1);
    expect(
      gradeQuestionDetailed(question('geo-u01-t01-q31'), answers.shortAnswer('المربع'))
        .earnedPoints,
    ).toBe(1);
    expect(
      gradeQuestionDetailed(
        question('geo-u01-t01-q16'),
        answers.classification({
          i1: 'cat-always',
          i2: 'cat-always',
          i3: 'cat-sometimes',
          i4: 'cat-never',
        }),
      ).earnedPoints,
    ).toBe(1);
    expect(
      gradeQuestionDetailed(
        question('geo-u01-t01-q16'),
        answers.classification({
          i1: 'cat-always',
          i2: 'cat-always',
          i3: 'cat-always',
          i4: 'cat-never',
        }),
      ).earnedPoints,
    ).toBe(0);
  });
});

/* ------------------------------------------------------------------------ */
/*  5. Solutions                                                             */
/* ------------------------------------------------------------------------ */

describe('Unit 1 test — detailed solutions', () => {
  it('loads a complete detailed solution set with zero audit issues', async () => {
    const solutionSet = await loadSolutionSet(TEST_ID);
    expect(solutionSet).toBeDefined();
    expect(solutionSet!.testId).toBe(TEST_ID);
    expect(Object.keys(solutionSet!.solutions)).toHaveLength(60);
    expect(solutionSetCompletenessIssues(entry.definition, entry.questions, solutionSet)).toEqual(
      [],
    );
  });

  it('matches every rubric to the engine maximum, and every part rubric to its part', async () => {
    const solutionSet = await loadSolutionSet(TEST_ID);
    for (const q of entry.questions) {
      const solution = solutionSet!.solutions[q.id]!;
      const engineMaximum = gradeQuestionDetailed(q, undefined).maxPoints;
      const criteria = solution.scoringCriteria.reduce((sum, item) => sum + item.points, 0);
      expect(criteria, `${q.id}: rubric total`).toBe(engineMaximum);
      expect(solution.provenance.sourceVerified.length, `${q.id}: source`).toBeGreaterThan(0);
      expect(solution.provenance.platformAuthored.length, `${q.id}: authored`).toBeGreaterThan(0);

      if (q.type === 'justification') {
        for (const step of q.steps) {
          const part = solution.parts.find((item) => item.id === step.id);
          expect(part, `${q.id}/${step.id}`).toBeDefined();
          expect(part!.scoringCriteria.reduce((sum, item) => sum + item.points, 0)).toBe(1);
        }
      }
      if (
        q.type === 'multi-part' ||
        q.type === 'diagram-reading' ||
        q.type === 'transformation-application'
      ) {
        expect(solution.parts.map((part) => part.id)).toEqual(q.parts.map((part) => part.id));
        for (const part of q.parts) {
          const authored = solution.parts.find((item) => item.id === part.id)!;
          expect(
            authored.scoringCriteria.reduce((sum, item) => sum + item.points, 0),
            `${q.id}/${part.id}`,
          ).toBe(part.points);
        }
      }
    }
  });

  it('explains every figure question with diagram notes and every error item with a common error', async () => {
    const solutionSet = await loadSolutionSet(TEST_ID);
    for (const q of entry.questions) {
      const solution = solutionSet!.solutions[q.id]!;
      if (figuresInPrompt(q).length > 0) {
        expect(solution.diagramNotes.length, `${q.id}: diagram notes`).toBeGreaterThan(0);
      }
      if (q.type === 'error-analysis') {
        expect(solution.commonError, `${q.id}: common error`).toBeTruthy();
        expect(solution.parts.map((part) => part.id)).toEqual(['correction', 'reason']);
      }
    }
  });
});

/* ------------------------------------------------------------------------ */
/*  6. Sources                                                               */
/* ------------------------------------------------------------------------ */

describe('Unit 1 test — source provenance', () => {
  it('never cites a page outside the verified 5–19 range', async () => {
    const solutionSet = await loadSolutionSet(TEST_ID);
    for (const q of entry.questions) {
      for (const page of pagesOf(q.sourceRefs)) {
        expect(page, `${q.id} question page`).toBeGreaterThanOrEqual(5);
        expect(page, `${q.id} question page`).toBeLessThanOrEqual(19);
      }
      const solution = solutionSet!.solutions[q.id]!;
      for (const page of pagesOf(solution.sourceRefs)) {
        expect(page, `${q.id} solution page`).toBeLessThanOrEqual(19);
      }
      for (const part of solution.parts) {
        for (const page of pagesOf(part.sourceRefs)) {
          expect(page, `${q.id}/${part.id} page`).toBeLessThanOrEqual(19);
        }
      }
    }
  });

  it('anchors each lesson question inside its own lesson pages', () => {
    for (const q of entry.questions) {
      if (q.concept === 'u1-integration') continue;
      const allowed = PAGES_BY_LESSON[q.lessonId]!;
      const pages = pagesOf(q.sourceRefs);
      expect(pages.length, `${q.id}: needs a page`).toBeGreaterThan(0);
      for (const page of pages) {
        expect(allowed, `${q.id} cites ${page}`).toContain(page);
      }
    }
  });

  it('makes every integration question cite two different lessons', () => {
    const integration = entry.questions.filter((q) => q.concept === 'u1-integration');
    expect(integration).toHaveLength(12);
    for (const q of integration) {
      const lessons = new Set(
        pagesOf(q.sourceRefs).map(
          (page) =>
            Object.entries(PAGES_BY_LESSON).find(([, pages]) => pages.includes(page))?.[0] ?? '',
        ),
      );
      lessons.delete('');
      expect(lessons.size, `${q.id}: lessons cited`).toBeGreaterThanOrEqual(2);
    }
  });
});

/* ------------------------------------------------------------------------ */
/*  7. Figures                                                               */
/* ------------------------------------------------------------------------ */

describe('Unit 1 test — the three audited figures only', () => {
  it('attaches a figure to exactly q19, q37 and q38', () => {
    const withFigures = entry.questions
      .filter((q) => figuresInPrompt(q).length > 0)
      .map((q) => q.id);
    expect(withFigures).toEqual(FIGURE_QUESTION_IDS);
    for (const q of entry.questions) {
      expect(figuresInPrompt(q).length, `${q.id}: at most one figure`).toBeLessThanOrEqual(1);
    }
  });

  it('keeps the compass figure of q19 answer-neutral (two open candidates, one given vector)', () => {
    const figure = figuresInPrompt(question('geo-u01-t01-q19'))[0];
    expect(figure?.type).toBe('figure');
    if (figure?.type !== 'figure' || figure.diagram.kind !== 'constructed')
      throw new Error('figure');
    const scene = figure.diagram.construction as {
      points: { id: string; mark?: string }[];
      segments: { from: string; to: string; arrow?: string }[];
      circles?: unknown[];
      angles?: unknown[];
      annotations?: unknown[];
    };
    expect(scene.points.find((point) => point.id === 'X')?.mark).toBe('open');
    expect(scene.points.find((point) => point.id === 'Y')?.mark).toBe('open');
    expect(scene.segments).toHaveLength(1);
    expect(scene.segments[0]).toMatchObject({ from: 'A', to: 'B', arrow: 'end' });
    expect(scene.circles).toHaveLength(2);
    expect(scene.angles ?? []).toHaveLength(0);
    expect(scene.annotations ?? []).toHaveLength(0);
  });

  it('states the givens of the kite and the right triangle without leaking their answers', () => {
    const kite = figuresInPrompt(question('geo-u01-t01-q37'))[0];
    if (kite?.type !== 'figure') throw new Error('kite figure');
    expect(kite.diagram.alt).toContain('$');
    const rightTriangle = figuresInPrompt(question('geo-u01-t01-q38'))[0];
    if (rightTriangle?.type !== 'figure' || rightTriangle.diagram.kind !== 'constructed')
      throw new Error('right triangle figure');
    const scene = rightTriangle.diagram.construction as {
      annotations?: { text: string }[];
      questionLabels?: string[];
    };
    const annotationText = (scene.annotations ?? []).map((annotation) => annotation.text).join(' ');
    expect(annotationText).toContain('5');
    expect(annotationText).toContain('15');
    expect(annotationText).not.toContain('6');
    expect(scene.questionLabels ?? []).toHaveLength(0);
  });
});

/* ------------------------------------------------------------------------ */
/*  8. Non-duplication against the seven lesson banks                        */
/* ------------------------------------------------------------------------ */

describe('Unit 1 test — original items, not lesson-test copies', () => {
  const unitIds = new Set(entry.questions.map((q) => q.id));
  const lessonQuestions = testQuestions.filter((q) => !unitIds.has(q.id));
  const unitTokens = new Map(
    entry.questions.map((q) => [q.id, contentTokens(promptText(q))] as const),
  );
  const lessonTokens = lessonQuestions.map((q) => [q.id, contentTokens(promptText(q))] as const);

  it('never repeats a lesson prompt verbatim', () => {
    const lessonPrompts = new Set(lessonQuestions.map((q) => promptText(q)));
    for (const q of entry.questions) {
      expect(lessonPrompts.has(promptText(q)), `${q.id}: identical prompt`).toBe(false);
    }
  });

  it('keeps the maximum textual overlap with any lesson prompt below 0.7', () => {
    let worst = { id: '', score: 0, against: '' };
    for (const q of entry.questions) {
      const tokens = unitTokens.get(q.id)!;
      for (const [lessonId, lessonTokenSet] of lessonTokens) {
        const score = jaccard(tokens, lessonTokenSet);
        if (score > worst.score) worst = { id: q.id, score, against: lessonId };
      }
    }
    expect(worst.score, `worst overlap: ${worst.id} ~ ${worst.against}`).toBeLessThan(0.7);
  });

  it('separates the two pairs flagged during preflight', () => {
    const pairA = jaccard(
      unitTokens.get('geo-u01-t01-q18')!,
      contentTokens(promptText(question('geo-u01-t01-q18'))),
    );
    expect(pairA).toBe(1);
    const flagged = [
      ['geo-u01-t01-q18', 'geo-l02-t01-q14'],
      ['geo-u01-t01-q37', 'geo-l04-t01-q13'],
    ] as const;
    for (const [unitId, lessonId] of flagged) {
      const lesson = lessonQuestions.find((q) => q.id === lessonId)!;
      const score = jaccard(unitTokens.get(unitId)!, contentTokens(promptText(lesson)));
      expect(score, `${unitId} vs ${lessonId}`).toBeLessThan(0.6);
    }
  });
});
