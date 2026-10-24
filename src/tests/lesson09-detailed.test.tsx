import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@/components/diagram/renderers';
import { QuestionRenderer } from '@/routes/tests/QuestionRenderer';
import { TestSolutionDetailPage } from '@/routes/tests/TestSolutionDetailPage';
import {
  TEST_FIGURE_RENDERER,
  testFigureSpecSchema,
} from '@/components/diagram/renderers/testFigureSpec';
import { catalog, getTestEntry, loadSolutionSet, testDefinitions } from './registry';
import { solutionSetCompletenessIssues } from './solutionAudit';
import { answers, gradeQuestionDetailed, gradeTest } from './scoring';
import type { AnswerMap, TestQuestion } from './schema';

const TEST_ID = 'lesson-09-test';
const LESSON_ID = 'lesson-09-parallel-from-midpoint';
const SOURCE_PAGES = [34, 35];
const ENGINE_MAXIMUM = 33;

const entry = getTestEntry(TEST_ID)!;

function correctAnswer(question: TestQuestion) {
  switch (question.type) {
    case 'single-choice':
      return answers.single(question.answerId);
    case 'multi-select':
      return answers.multi(question.answerIds);
    case 'true-false':
      return answers.boolean(question.answer);
    case 'true-false-justify':
      return answers.trueFalseJustify(
        question.answer,
        question.answer === false ? question.correction?.answerId : undefined,
        question.justification?.answerId,
      );
    case 'numeric':
      return answers.numeric(String(question.answer));
    case 'exact':
      return answers.exact(`${question.answer.numerator}/${question.answer.denominator}`);
    case 'fill-in':
      return answers.fillIn(
        Object.fromEntries(question.blanks.map((blank) => [blank.id, blank.acceptedAnswers[0]!])),
      );
    case 'ordering':
      return answers.order(question.answerOrder);
    case 'matching':
      return answers.matching(question.pairs);
    case 'classification':
      return answers.classification(question.assignment);
    case 'error-analysis':
      return answers.errorAnalysis(
        question.answerId,
        question.correction?.answerId,
        question.justification?.answerId,
      );
    default:
      throw new Error(`Unsupported question type in test helper: ${question.type}`);
  }
}

function questionById(id: string): TestQuestion {
  const found = entry.questions.find((q) => q.id === id);
  if (!found) throw new Error(`Missing question ${id}`);
  return found;
}

describe('Lesson 9 — dedicated 20-question test & detailed Arabic solutions («موازٍ لضلع من منتصف ضلع آخر»)', () => {
  it('registers lesson-09-test in the test catalog with 20 unique stable IDs scoped strictly to pages 34–35', () => {
    expect(entry).toBeDefined();
    expect(testDefinitions.some((def) => def.id === TEST_ID)).toBe(true);
    expect(catalog.lessonTests.some((item) => item.definition.id === TEST_ID)).toBe(true);
    expect(entry.definition.scope).toBe('lesson');
    expect(entry.definition.targetId).toBe(LESSON_ID);
    expect(entry.definition.solutionPolicy).toBe('detailed');
    expect(entry.questions).toHaveLength(20);
    expect(entry.definition.questionIds).toEqual(
      Array.from({ length: 20 }, (_, idx) => `geo-l09-t01-q${String(idx + 1).padStart(2, '0')}`),
    );
    expect(entry.questions.every((q) => q.lessonId === LESSON_ID)).toBe(true);

    const pages = [
      ...new Set(entry.questions.flatMap((q) => q.sourceRefs.map((ref) => Number(ref.page)))),
    ].sort((a, b) => a - b);
    expect(pages).toEqual(SOURCE_PAGES);
  });

  it('spans 11 distinct supported question types across conceptual, direct, multi-step, diagram, error-analysis, and unfamiliar reasoning', () => {
    const types = new Set(entry.questions.map((q) => q.type));
    expect(types.size).toBe(11);
    for (const expectedType of [
      'single-choice',
      'multi-select',
      'true-false',
      'true-false-justify',
      'fill-in',
      'numeric',
      'exact',
      'ordering',
      'matching',
      'classification',
      'error-analysis',
    ] as const) {
      expect(types.has(expectedType), `missing question type ${expectedType}`).toBe(true);
    }
  });

  it('grades an all-correct submission to 100% (33 / 33 points) and an empty submission to 0%', () => {
    const fullMap: AnswerMap = Object.fromEntries(
      entry.questions.map((q) => [q.id, correctAnswer(q)]),
    );
    const perfect = gradeTest(TEST_ID, entry.definition.passingScore, entry.questions, fullMap);
    expect(perfect.maxPoints).toBe(ENGINE_MAXIMUM);
    expect(perfect.earnedPoints).toBe(ENGINE_MAXIMUM);
    expect(perfect.correct).toBe(20);
    expect(perfect.partiallyCorrect).toBe(0);
    expect(perfect.incorrect).toBe(0);
    expect(perfect.unanswered).toBe(0);
    expect(perfect.score).toBe(100);
    expect(perfect.passed).toBe(true);

    const empty = gradeTest(TEST_ID, entry.definition.passingScore, entry.questions, {});
    expect(empty.earnedPoints).toBe(0);
    expect(empty.unanswered).toBe(20);
    expect(empty.score).toBe(0);
    expect(empty.passed).toBe(false);
  });

  it('awards exact partial credit on composite and multipart items (q02, q08, q09, q12, q16, q17, q19)', () => {
    // q02: true-false-justify (false + correction) -> right verdict, wrong valid correction => 1 / 2
    const q02 = questionById('geo-l09-t01-q02');
    if (q02.type !== 'true-false-justify' || !q02.correction) throw new Error('Expected tfj');
    const wrongCorr02 = q02.correction.choices.find((c) => c.id !== q02.correction!.answerId)!.id;
    const g02 = gradeQuestionDetailed(q02, answers.trueFalseJustify(false, wrongCorr02));
    expect(g02.outcome).toBe('partially-correct');
    expect(g02.earnedPoints).toBe(1);
    expect(g02.maxPoints).toBe(2);

    // q08: true-false-justify (true + justification) -> right verdict, wrong valid justification => 1 / 2
    const q08 = questionById('geo-l09-t01-q08');
    if (q08.type !== 'true-false-justify' || !q08.justification) throw new Error('Expected tfj');
    const wrongJust08 = q08.justification.choices.find(
      (c) => c.id !== q08.justification!.answerId,
    )!.id;
    const g08 = gradeQuestionDetailed(q08, answers.trueFalseJustify(true, undefined, wrongJust08));
    expect(g08.outcome).toBe('partially-correct');
    expect(g08.earnedPoints).toBe(1);
    expect(g08.maxPoints).toBe(2);

    // q09: fill-in (2 blanks) -> 1 right blank, 1 wrong blank => 1 / 2
    const q09 = questionById('geo-l09-t01-q09');
    if (q09.type !== 'fill-in') throw new Error('Expected fill-in');
    const g09 = gradeQuestionDetailed(
      q09,
      answers.fillIn({
        [q09.blanks[0]!.id]: q09.blanks[0]!.acceptedAnswers[0]!,
        [q09.blanks[1]!.id]: 'يعامد',
      }),
    );
    expect(g09.outcome).toBe('partially-correct');
    expect(g09.earnedPoints).toBe(1);
    expect(g09.maxPoints).toBe(2);

    // q12: ordering (4 steps) -> swap last two so 2 of 4 positions match => 2 / 4
    const q12 = questionById('geo-l09-t01-q12');
    if (q12.type !== 'ordering') throw new Error('Expected ordering');
    const [o0, o1, o2, o3] = q12.answerOrder;
    const g12 = gradeQuestionDetailed(q12, answers.order([o0!, o1!, o3!, o2!]));
    expect(g12.outcome).toBe('partially-correct');
    expect(g12.earnedPoints).toBe(2);
    expect(g12.maxPoints).toBe(4);

    // q15: 1-pt all-or-nothing classification (4 items) -> any mismatch scores 0 / 1
    const q15 = questionById('geo-l09-t01-q15');
    if (q15.type !== 'classification') throw new Error('Expected classification');
    const entries15 = Object.entries(q15.assignment);
    const otherCat = (catId: string) => q15.categories.find((c) => c.id !== catId)!.id;
    const g15 = gradeQuestionDetailed(
      q15,
      answers.classification({
        [entries15[0]![0]]: entries15[0]![1],
        [entries15[1]![0]]: entries15[1]![1],
        [entries15[2]![0]]: otherCat(entries15[2]![1]),
        [entries15[3]![0]]: otherCat(entries15[3]![1]),
      }),
    );
    expect(g15.outcome).toBe('incorrect');
    expect(g15.earnedPoints).toBe(0);
    expect(g15.maxPoints).toBe(1);

    // q16: matching (4 pairs) -> swap two pairs so 2 of 4 match => 2 / 4
    const q16 = questionById('geo-l09-t01-q16');
    if (q16.type !== 'matching') throw new Error('Expected matching');
    const entries16 = Object.entries(q16.pairs);
    const g16 = gradeQuestionDetailed(
      q16,
      answers.matching({
        [entries16[0]![0]]: entries16[0]![1],
        [entries16[1]![0]]: entries16[1]![1],
        [entries16[2]![0]]: entries16[3]![1],
        [entries16[3]![0]]: entries16[2]![1],
      }),
    );
    expect(g16.outcome).toBe('partially-correct');
    expect(g16.earnedPoints).toBe(2);
    expect(g16.maxPoints).toBe(4);

    // q17: matching (3 pairs) -> 2 right, 1 wrong valid right option => 2 / 3
    const q17 = questionById('geo-l09-t01-q17');
    if (q17.type !== 'matching') throw new Error('Expected matching');
    const pairEntries = Object.entries(q17.pairs);
    const wrongRight17 = q17.right.find((r) => r.id !== pairEntries[2]![1])!.id;
    const g17 = gradeQuestionDetailed(
      q17,
      answers.matching({
        [pairEntries[0]![0]]: pairEntries[0]![1],
        [pairEntries[1]![0]]: pairEntries[1]![1],
        [pairEntries[2]![0]]: wrongRight17,
      }),
    );
    expect(g17.outcome).toBe('partially-correct');
    expect(g17.earnedPoints).toBe(2);
    expect(g17.maxPoints).toBe(3);

    // q19: error-analysis (step + correction + justification) -> step + correction right => 2 / 3
    const q19 = questionById('geo-l09-t01-q19');
    if (q19.type !== 'error-analysis' || !q19.justification) throw new Error('Expected ea');
    const wrongJust19 = q19.justification.choices.find(
      (c) => c.id !== q19.justification!.answerId,
    )!.id;
    const g19 = gradeQuestionDetailed(
      q19,
      answers.errorAnalysis(q19.answerId, q19.correction?.answerId, wrongJust19),
    );
    expect(g19.outcome).toBe('partially-correct');
    expect(g19.earnedPoints).toBe(2);
    expect(g19.maxPoints).toBe(3);
  });

  it('validates audited TestFigureSpecs on q10 and q16 and includes diagramNotes in their solutions', async () => {
    const solutionSet = await loadSolutionSet(TEST_ID);
    expect(solutionSet).not.toBeNull();
    expect(solutionSetCompletenessIssues(entry.definition, entry.questions, solutionSet!)).toEqual(
      [],
    );

    for (const qId of ['geo-l09-t01-q10', 'geo-l09-t01-q16']) {
      const q = questionById(qId);
      const figBlocks = q.prompt.filter((b) => b.type === 'figure');
      expect(figBlocks).toHaveLength(1);
      const diagram = figBlocks[0]!.diagram;
      expect(diagram.kind).toBe('constructed');
      if (diagram.kind === 'constructed') {
        expect(diagram.renderer).toBe(TEST_FIGURE_RENDERER);
        const parsed = testFigureSpecSchema.safeParse(diagram.construction);
        expect(parsed.success, `${qId}: invalid TestFigureSpec`).toBe(true);
      }
      const notes = solutionSet!.solutions[qId]?.diagramNotes ?? [];
      expect(notes.length).toBeGreaterThan(0);
      const noteText = notes
        .map((block) => (block.type === 'paragraph' ? block.text : ''))
        .join(' ');
      expect(noteText.length).toBeGreaterThan(40);
    }
  });

  it('renders every question in QuestionRenderer and the live TestSolutionDetailPage without raw $ or KaTeX errors', async () => {
    for (const question of entry.questions) {
      const { container, unmount } = render(
        <QuestionRenderer question={question} value={undefined} onChange={() => undefined} />,
      );
      expect(container.textContent, `${question.id}: raw $`).not.toContain('$');
      expect(container.querySelector('.katex-error'), `${question.id}: katex error`).toBeNull();
      unmount();
    }

    const { container, findByRole, unmount } = render(
      <MemoryRouter initialEntries={[`/tests/solutions/${TEST_ID}`]}>
        <Routes>
          <Route path="/tests/solutions/:testId" element={<TestSolutionDetailPage />} />
        </Routes>
      </MemoryRouter>,
    );
    await findByRole('heading', { name: /حلول اختبار الدرس التاسع/ });
    expect(container.textContent).not.toContain('$');
    expect(container.querySelector('.katex-error')).toBeNull();
    unmount();
  });
});
