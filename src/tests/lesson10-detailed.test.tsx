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
import { catalog, deriveStats, getTestEntry, loadSolutionSet, testDefinitions } from './registry';
import { solutionSetCompletenessIssues } from './solutionAudit';
import { answers, gradeQuestionDetailed, gradeTest } from './scoring';
import type { AnswerMap, TestQuestion } from './schema';

const TEST_ID = 'lesson-10-test';
const LESSON_ID = 'lesson-10-parallel-lines-transversals';
const SOURCE_PAGES = [36, 37, 38];
const ENGINE_MAXIMUM = 20;

const entry = getTestEntry(TEST_ID)!;

function correctAnswer(question: TestQuestion) {
  switch (question.type) {
    case 'single-choice':
      return answers.single(question.answerId);
    case 'true-false':
      return answers.boolean(question.answer);
    case 'numeric':
      return answers.numeric(String(question.answer));
    default:
      throw new Error(`Unsupported question type in Lesson 10 bank: ${question.type}`);
  }
}

function questionById(id: string): TestQuestion {
  const found = entry.questions.find((q) => q.id === id);
  if (!found) throw new Error(`Missing question ${id}`);
  return found;
}

describe('Lesson 10 — dedicated 20-question test & detailed Arabic solutions («مستقيمات متوازية وقاطعان»)', () => {
  it('registers lesson-10-test in the catalog with 20 unique stable IDs scoped strictly to pages 36–38', () => {
    expect(entry).toBeDefined();
    expect(testDefinitions.some((def) => def.id === TEST_ID)).toBe(true);
    expect(catalog.lessonTests.some((item) => item.definition.id === TEST_ID)).toBe(true);
    expect(entry.definition.scope).toBe('lesson');
    expect(entry.definition.targetId).toBe(LESSON_ID);
    expect(entry.definition.solutionPolicy).toBe('detailed');
    expect(entry.questions).toHaveLength(20);
    expect(entry.definition.questionIds).toEqual(
      Array.from({ length: 20 }, (_, idx) => `geo-l10-t01-q${String(idx + 1).padStart(2, '0')}`),
    );
    expect(new Set(entry.definition.questionIds).size).toBe(20);
    expect(entry.questions.every((q) => q.lessonId === LESSON_ID)).toBe(true);

    const pages = [
      ...new Set(entry.questions.flatMap((q) => q.sourceRefs.map((ref) => Number(ref.page)))),
    ].sort((a, b) => a - b);
    expect(pages).toEqual(SOURCE_PAGES);
  });

  it('uses only the three controlled types single-choice (9), true-false (5) and numeric (6)', () => {
    const stats = deriveStats(entry.questions);
    expect(new Set(stats.types.map((item) => item.type))).toEqual(
      new Set(['single-choice', 'true-false', 'numeric']),
    );
    const countFor = (type: string) => stats.types.find((item) => item.type === type)?.count ?? 0;
    expect(countFor('single-choice')).toBe(9);
    expect(countFor('true-false')).toBe(5);
    expect(countFor('numeric')).toBe(6);

    // Blueprint coverage and difficulty match the authored bank exactly.
    const coverage = new Map(stats.coverage.map((item) => [item.concept, item.count]));
    expect(coverage.get('equal-ratio-property')).toBe(5);
    expect(coverage.get('correspondence-and-tables')).toBe(4);
    expect(coverage.get('length-computation')).toBe(6);
    expect(coverage.get('combined-and-midpoint')).toBe(5);
    const difficulty = new Map(stats.difficulty.map((item) => [item.level, item.count]));
    expect(difficulty.get('basic')).toBe(6);
    expect(difficulty.get('medium')).toBe(8);
    expect(difficulty.get('advanced')).toBe(4);
    expect(difficulty.get('thinking')).toBe(2);
  });

  it('locks the independently verified numeric answers of every numeric question', () => {
    const expected: Record<string, number> = {
      'geo-l10-t01-q11': 12,
      'geo-l10-t01-q12': 4,
      'geo-l10-t01-q13': 9,
      'geo-l10-t01-q14': 6,
      'geo-l10-t01-q16': 10,
      'geo-l10-t01-q17': 1.5,
    };
    for (const [id, value] of Object.entries(expected)) {
      const question = questionById(id);
      if (question.type !== 'numeric') throw new Error(`${id} must be numeric`);
      expect(question.answer, id).toBe(value);
      expect(question.tolerance).toBe(0);
    }
  });

  it('grades an all-correct submission to 100% (20 / 20 points) and an empty submission to 0%', () => {
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

  it('grades every item as one all-or-nothing point: a wrong valid choice/numeric entry scores 0 / 1', () => {
    const q01 = questionById('geo-l10-t01-q01');
    if (q01.type !== 'single-choice') throw new Error('q01 must be single-choice');
    const wrongId = q01.choices.find((choice) => choice.id !== q01.answerId)!.id;
    const g01 = gradeQuestionDetailed(q01, answers.single(wrongId));
    expect(g01.outcome).toBe('incorrect');
    expect(g01.earnedPoints).toBe(0);
    expect(g01.maxPoints).toBe(1);

    const q02 = questionById('geo-l10-t01-q02');
    if (q02.type !== 'true-false') throw new Error('q02 must be true-false');
    const g02 = gradeQuestionDetailed(q02, answers.boolean(!q02.answer));
    expect(g02.outcome).toBe('incorrect');
    expect(g02.earnedPoints).toBe(0);
    expect(g02.maxPoints).toBe(1);

    const q11 = questionById('geo-l10-t01-q11');
    if (q11.type !== 'numeric') throw new Error('q11 must be numeric');
    const g11 = gradeQuestionDetailed(q11, answers.numeric('99'));
    expect(g11.outcome).toBe('incorrect');
    expect(g11.earnedPoints).toBe(0);
    expect(g11.maxPoints).toBe(1);
  });

  it('validates the three audited TestFigureSpecs (q10, q13, q16) and requires diagramNotes in their solutions', async () => {
    const solutionSet = await loadSolutionSet(TEST_ID);
    expect(solutionSet).not.toBeNull();
    expect(solutionSetCompletenessIssues(entry.definition, entry.questions, solutionSet!)).toEqual(
      [],
    );

    for (const qId of ['geo-l10-t01-q10', 'geo-l10-t01-q13', 'geo-l10-t01-q16']) {
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

    // Text-only questions must carry no figures.
    const figureIds = entry.questions
      .filter((q) => q.prompt.some((block) => block.type === 'figure'))
      .map((q) => q.id)
      .sort();
    expect(figureIds).toEqual(['geo-l10-t01-q10', 'geo-l10-t01-q13', 'geo-l10-t01-q16']);
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
    await findByRole('heading', { name: /حلول اختبار الدرس العاشر/ });
    expect(container.textContent).not.toContain('$');
    expect(container.querySelector('.katex-error')).toBeNull();
    unmount();
  });
});
