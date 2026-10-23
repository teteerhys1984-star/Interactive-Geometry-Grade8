import { describe, expect, it } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Blocks } from '@/components/content';
import { allLessons } from '@/content/registry';
import { catalog, hasSolutionSet, testQuestions, solutionLoaders } from '@/tests/registry';
import { QuestionRenderer } from '@/routes/tests/QuestionRenderer';
import { TestSolutionDetailPage } from '@/routes/tests/TestSolutionDetailPage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

interface StringFinding {
  path: string;
  text: string;
  classification: 'paired-math' | 'unmatched-or-empty-marker' | 'literal-candidate';
}

type DollarClassification = StringFinding['classification'];

// A number followed by `$` at a prose boundary is a likely literal currency marker.
function isPostfixCurrencyDollar(text: string, index: number): boolean {
  const before = text.slice(0, index);
  const after = text.slice(index + 1);
  const followsAmount = /(?:^|[\s([{])\d+(?:[.,]\d+)?\s*$/.test(before);
  const precedesTextBoundary = /^(?:$|[\s,،.;:!?)}\]])/.test(after);

  return followsAmount && precedesTextBoundary;
}

// Flag clear LaTeX/operator fragments as malformed; ambiguous bare dollars remain review candidates.
function looksLikeUnclosedMath(text: string, index: number): boolean {
  const left = text.slice(0, index).trimEnd().split(/\s+/).at(-1) ?? '';
  const right =
    text
      .slice(index + 1)
      .trimStart()
      .split(/\s+/)[0] ?? '';
  const nearby = `${left} ${right}`;

  return ['\\', '^', '_', '=', '{', '}', '[', ']'].some((token) => nearby.includes(token));
}

function classifyDollarMarkers(text: string): DollarClassification[] {
  const classifications: DollarClassification[] = [];
  let opening = -1;

  for (let index = text.indexOf('$'); index !== -1; index = text.indexOf('$', index + 1)) {
    if (opening === -1 && isPostfixCurrencyDollar(text, index)) {
      classifications.push('literal-candidate');
      continue;
    }

    if (opening === -1) {
      opening = index;
      continue;
    }

    const expression = text.slice(opening + 1, index);
    classifications.push(expression.trim() ? 'paired-math' : 'unmatched-or-empty-marker');
    opening = -1;
  }

  if (opening !== -1) {
    classifications.push(
      looksLikeUnclosedMath(text, opening) ? 'unmatched-or-empty-marker' : 'literal-candidate',
    );
  }

  return classifications;
}

function collectStrings(
  value: unknown,
  path: string,
  output: StringFinding[] = [],
): StringFinding[] {
  if (typeof value === 'string') {
    if (!value.includes('$')) return output;
    for (const classification of classifyDollarMarkers(value)) {
      output.push({ path, text: value, classification });
    }
    return output;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => collectStrings(item, `${path}[${index}]`, output));
  } else if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, item]) => collectStrings(item, `${path}.${key}`, output));
  }
  return output;
}

function renderQuestion(question: (typeof testQuestions)[number]) {
  return render(
    <QuestionRenderer question={question} value={undefined} onChange={() => undefined} />,
  );
}

describe('platform math-rendering audit', () => {
  it('distinguishes literal-dollar candidates, malformed math, and complete math', () => {
    const classificationsFor = (text: string) =>
      collectStrings(text, 'fixture').map((finding) => finding.classification);

    expect(classificationsFor('ثمنه 5$، والصيغة $x^2$')).toEqual([
      'literal-candidate',
      'paired-math',
    ]);
    expect(classificationsFor('صيغة غير مكتملة $x^2')).toEqual(['unmatched-or-empty-marker']);
    expect(classificationsFor('$x^2$')).toEqual(['paired-math']);
  });

  it('rejects empty and whitespace-only math delimiters', () => {
    const classificationsFor = (text: string) =>
      collectStrings(text, 'fixture').map((finding) => finding.classification);

    expect(classificationsFor('$$')).toEqual(['unmatched-or-empty-marker']);
    expect(classificationsFor('$ $')).toEqual(['unmatched-or-empty-marker']);
    expect(classificationsFor('$x^2$')).toEqual(['paired-math']);
  });

  it('classifies dollar-marked source strings before content changes', async () => {
    const roots: { path: string; value: unknown }[] = [
      { path: 'test questions', value: testQuestions },
      { path: 'lesson content', value: allLessons },
    ];

    for (const [testId, load] of solutionLoaders) {
      roots.push({ path: `solutions/${testId}`, value: (await load()).solutionSet });
    }

    const findings = roots.flatMap(({ path, value }) => collectStrings(value, path));
    const malformed = findings.filter(
      (finding) => finding.classification === 'unmatched-or-empty-marker',
    );
    const math = findings.filter((finding) => finding.classification === 'paired-math');
    const literalCandidates = findings.filter(
      (finding) => finding.classification === 'literal-candidate',
    );

    // All authored $…$ source is classified rather than stripped or rewritten.
    // Empty/unmatched delimiters need an editorial source correction before they
    // can be safely treated as math; paired source is left intact for rendering.
    expect(malformed, JSON.stringify(malformed, null, 2)).toEqual([]);
    expect(math.length).toBeGreaterThan(0);
    // No current content uses a dollar sign as ordinary prose. Keep this separate
    // from the math assertion so future literal-dollar copy is reviewed explicitly.
    expect(literalCandidates, JSON.stringify(literalCandidates, null, 2)).toEqual([]);
  });

  it('renders every question in the live banks through the component UI without raw delimiters', () => {
    for (const question of testQuestions) {
      const { container, unmount } = renderQuestion(question);
      expect(container.textContent, `${question.id}: raw $ delimiters`).not.toContain('$');
      expect(container.querySelector('.katex-error'), `${question.id}: invalid KaTeX`).toBeNull();
      if (container.querySelector('.katex')) {
        expect(
          container.querySelector('[dir="ltr"]'),
          `${question.id}: missing LTR isolation`,
        ).not.toBeNull();
      }
      unmount();
    }
  }, 30_000);

  it('renders all lesson step content blocks without exposing inline-math delimiters', () => {
    for (const { lesson } of allLessons) {
      const blockTrees = [
        ...lesson.steps.map((step) => ({ label: step.id, blocks: step.blocks })),
        ...(lesson.teacherResources?.textbookSolutions ?? []).map((solution) => ({
          label: solution.id,
          blocks: solution.blocks,
        })),
      ];
      for (const { label, blocks } of blockTrees) {
        const { container, unmount } = render(<Blocks blocks={blocks} />);
        expect(container.textContent, `${lesson.id}/${label}: raw $ delimiters`).not.toContain('$');
        expect(
          container.querySelector('.katex-error'),
          `${lesson.id}/${label}: invalid KaTeX`,
        ).toBeNull();
        unmount();
      }
    }
  }, 30_000);

  it('renders every published detailed-solution group and its rubric math in the live page', async () => {
    const user = userEvent.setup();
    let foundRenderedRubricMath = false;

    for (const entry of catalog.all.filter(({ definition }) => hasSolutionSet(definition.id))) {
      const { container, unmount } = render(
        <MemoryRouter initialEntries={[`/tests/solutions/${entry.definition.id}`]}>
          <Routes>
            <Route path="/tests/solutions/:testId" element={<TestSolutionDetailPage />} />
          </Routes>
        </MemoryRouter>,
      );

      const groups = await waitFor(() => {
        const tabs = Array.from(container.querySelectorAll('button')).filter((button) =>
          button.textContent?.includes('الأسئلة'),
        );
        if (
          !container.querySelector('article') ||
          container.textContent?.includes('جارٍ تحميل الحلول')
        ) {
          throw new Error(`Solutions for ${entry.definition.id} have not loaded yet.`);
        }
        return tabs;
      });

      for (const [index, group] of groups.entries()) {
        if (index > 0) await user.click(group);
        await waitFor(() => expect(container.querySelector('article')).not.toBeNull());
        expect(container.textContent, `${entry.definition.id}: raw $ delimiters`).not.toContain(
          '$',
        );
        expect(
          container.querySelector('.katex-error'),
          `${entry.definition.id}: invalid KaTeX`,
        ).toBeNull();
        if (container.querySelector('[class*="criteriaRow"] .katex'))
          foundRenderedRubricMath = true;
      }
      unmount();
    }

    expect(foundRenderedRubricMath).toBe(true);
  }, 30_000);
});
