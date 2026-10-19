import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getLesson } from '@/content/registry';
import type { ContentBlock, DiagramSpec } from './schema';
import {
  figCompassConstruction,
  figCompassProof,
  figPage8Answers,
  figPage8Lab,
  figPage10Answers,
  figPracticeGrid,
  figPracticeParallelogram,
  figPracticeTriangle,
  figTwoCasesLab,
} from './units/lesson-02-figures';
import {
  imageOf,
  isParallelogram,
  page8,
  page8Images,
  page10Answers,
  practiceParallelogram,
  practiceTriangle,
  samePoint,
} from './units/lesson-02-geometry';
import { LatticePlacement } from '@/components/diagram/renderers/lesson2/LatticePlacement';
import { CompassLab } from '@/components/diagram/renderers/lesson2/CompassLab';
import { VectorChain } from '@/components/diagram/renderers/lesson2/VectorChain';
import { PointImageLab } from '@/components/diagram/renderers/lesson2/PointImageLab';

/**
 * ============================================================================
 *  LESSON 2 — REBUILD TESTS
 * ============================================================================
 *  These tests guard the *rebuild*, not the textbook: they assert that every
 *  authored figure agrees with the geometry module, that the labs answer with
 *  the method before the result, that the Teacher Area ships a complete
 *  solution per printed prompt, and that no printed answer leaks into the
 *  student flow.
 *
 *  Geometry itself (coordinates, collinearity, bisection, triangle chain) is
 *  verified independently in units/lesson-02-geometry.test.ts.
 * ============================================================================
 */

const lesson = getLesson('lesson-02-image-of-a-point')!.lesson;

type AnyDiagram = DiagramSpec;

function collectDiagrams(blocks: ContentBlock[]): AnyDiagram[] {
  const found: AnyDiagram[] = [];
  for (const block of blocks) {
    if (block.type === 'figure') found.push(block.diagram);
    if (block.type === 'callout' || block.type === 'teaching') {
      found.push(...collectDiagrams(block.blocks));
    }
  }
  return found;
}

function allLessonDiagrams(): AnyDiagram[] {
  const student = lesson.steps.flatMap((step) => collectDiagrams(step.blocks));
  const teacher = (lesson.teacherResources?.textbookSolutions ?? []).flatMap((solution) =>
    collectDiagrams(solution.blocks),
  );
  return [...student, ...teacher];
}

function paramsOf(diagram: AnyDiagram): Record<string, unknown> {
  if (diagram.kind !== 'interactive') throw new Error(`${diagram.id} is not interactive`);
  return diagram.params;
}

describe('Lesson 2 — structure of the rebuild', () => {
  it('is eighteen steps: eleven printed and seven platform steps', () => {
    expect(lesson.steps).toHaveLength(18);
    expect(lesson.steps.filter((step) => step.origin === 'source')).toHaveLength(11);
    expect(lesson.steps.filter((step) => step.origin === 'authored')).toHaveLength(7);
  });

  it('gives every platform step a teaching block, so each one teaches something', () => {
    for (const step of lesson.steps) {
      if (step.origin !== 'authored') continue;
      const teaching = step.blocks.filter((block) => block.type === 'teaching');
      expect(teaching.length, `${step.id} has no teaching block`).toBeGreaterThan(0);
    }
  });

  it('keeps every printed question on a source step and none on an authored step', () => {
    for (const step of lesson.steps) {
      const groups = step.blocks.filter((block) => block.type === 'questionGroup');
      if (step.origin === 'authored') expect(groups).toHaveLength(0);
    }
    // Six printed steps carry actual prompts (both activities, the check and the
    // three practice exercises); the definition, special case, example, method
    // and justification are statements, not questions.
    const withPrompts = lesson.steps.filter((step) =>
      step.blocks.some((block) => block.type === 'questionGroup'),
    );
    expect(withPrompts).toHaveLength(6);
    expect(withPrompts.every((step) => step.origin === 'source')).toBe(true);
  });

  it('no longer ships a single «راجع الكتاب» placeholder', () => {
    expect(allLessonDiagrams().filter((diagram) => diagram.kind === 'reference')).toEqual([]);
  });

  it('badges every authored diagram as the platform’s own drawing', () => {
    for (const diagram of allLessonDiagrams()) {
      if (diagram.origin !== 'authored') continue;
      const text = [diagram.caption ?? '', 'extendNote' in paramsOf(diagram) ? '' : ''].join(' ');
      expect(
        /إعداد المنصّ[ةه]/.test(text) || /المنصّ[ةه]/.test(text),
        `${diagram.id} is not badged: ${text}`,
      ).toBe(true);
    }
  });

  it('keeps the printed page reference on the textbook sheets', () => {
    const textbook = allLessonDiagrams().filter((diagram) => diagram.origin === 'textbook');
    expect(new Set(textbook.map((diagram) => diagram.id)).size).toBe(2);
    for (const diagram of textbook) {
      expect(diagram.source?.page).toBeGreaterThanOrEqual(8);
    }
  });
});

describe('Lesson 2 — interactive labs agree with the geometry module', () => {
  it('asks the page-8 lab exactly for the printed image and for N′', () => {
    const params = paramsOf(figPage8Lab);
    const tasks = params.tasks as { id: string; answer: { x: number; y: number } }[];
    const m = tasks.find((task) => task.id === 'page8-m-prime')!;
    const n = tasks.find((task) => task.id === 'page8-n-prime')!;
    expect(samePoint([m.answer.x, m.answer.y], page8Images.M)).toBe(true);
    expect(samePoint([n.answer.x, n.answer.y], page8Images.N)).toBe(true);
    // The printed sheet is the same one the textbook figure shows.
    const points = params.points as { x: number; y: number; label: string }[];
    expect(points.map((point) => point.label)).toEqual(['A', 'B', 'M', 'N', 'P']);
    expect(samePoint([points[0]!.x, points[0]!.y], page8.points.A)).toBe(true);
  });

  it('answers the six page-10 placements with the computed images', () => {
    const params = paramsOf(figPracticeGrid);
    const tasks = params.tasks as { id: string; answer: { x: number; y: number } }[];
    const expected: Record<string, readonly [number, number]> = {
      'page10-m-prime': page10Answers.MPrime,
      'page10-m-double-prime': page10Answers.MDoublePrime,
      'page10-n-prime': page10Answers.NPrime,
      'page10-n-double-prime': page10Answers.NDoublePrime,
      'page10-p': page10Answers.P,
      'page10-q': page10Answers.Q,
    };
    expect(Object.keys(expected)).toHaveLength(tasks.length);
    for (const task of tasks) {
      expect(samePoint([task.answer.x, task.answer.y], expected[task.id]!), task.id).toBe(true);
    }
    // Q is the only point outside the printed sheet, and the lab draws two
    // extra rows for it — the printed instruction asks for a wider notebook page.
    const extend = params.extend as { bottom: number };
    expect(page10Answers.Q[1]).toBeLessThan(0);
    expect(extend.bottom).toBeGreaterThanOrEqual(Math.abs(page10Answers.Q[1]));
  });

  it('keeps the page-8 answer sheet on the printed lattice plus the notebook margin', () => {
    const params = paramsOf(figPage8Answers);
    const extend = params.extend as { start: number; top: number };
    expect(extend.start).toBeGreaterThanOrEqual(Math.abs(page8Images.N[0]));
    expect(extend.top).toBeGreaterThanOrEqual(page8Images.P[1] - page8.rows);
    const points = params.points as { label: string; x: number; y: number }[];
    for (const label of ['M', 'N', 'P']) {
      const point = points.find((entry) => entry.label === label)!;
      expect(Number.isInteger(point.x) && Number.isInteger(point.y), label).toBe(true);
    }
  });

  it('places the page-10 image sheet inside the sheet plus two rows', () => {
    const points = paramsOf(figPage10Answers).points as { label: string; x: number }[];
    expect(points.find((point) => point.label === 'M')).toMatchObject({ x: 8 });
  });

  it('builds the triangle chain so that the third image returns to A', () => {
    const params = paramsOf(figPracticeTriangle);
    expect(samePoint(practiceTriangle.g, practiceTriangle.a)).toBe(true);
    expect(params.a).toEqual(practiceTriangle.a);
    expect(params.b).toEqual(practiceTriangle.b);
    expect(params.c).toEqual(practiceTriangle.c);
  });

  it('gives the parallelogram lab three tasks whose images are the printed answers', () => {
    const params = paramsOf(figPracticeParallelogram);
    const tasks = params.tasks as {
      from: [number, number];
      to: [number, number];
      applyTo: [number, number];
      imageLabel: string;
    }[];
    expect(tasks.map((task) => task.imageLabel)).toEqual(['C', 'A', 'M']);
    for (const task of tasks) {
      const image = imageOf(task.applyTo, task.from, task.to);
      expect(isParallelogram(task.from, task.to, image, task.applyTo)).toBe(true);
    }
    expect(
      samePoint(
        imageOf(practiceParallelogram.D, practiceParallelogram.A, practiceParallelogram.B),
        practiceParallelogram.C,
      ),
    ).toBe(true);
  });

  it('uses a genuinely collinear M in the two-case lab', () => {
    const params = paramsOf(figTwoCasesLab);
    const a = params.a as [number, number];
    const b = params.b as [number, number];
    const collinear = params.collinear as [number, number];
    const cross = (b[0] - a[0]) * (collinear[1] - a[1]) - (b[1] - a[1]) * (collinear[0] - a[0]);
    expect(Math.abs(cross)).toBeLessThan(1e-9);
    const general = params.general as [number, number];
    expect(
      samePoint(imageOf(general, a, b), [general[0] + b[0] - a[0], general[1] + b[1] - a[1]]),
    ).toBe(true);
  });
});

describe('Lesson 2 — labs teach before they answer', () => {
  it('turns a wrong click into a method hint, not into the answer', () => {
    render(<LatticePlacement spec={figPage8Lab} />);
    const wrong = document.querySelector('[data-node="-1,1"]')!;
    fireEvent.click(wrong);
    const feedback = screen.getByRole('status').textContent ?? '';
    expect(feedback).toContain('ليست هذه النقطة');
    expect(feedback).not.toContain('العمود 3 والسطر 5');
    // The hint names M inside maths delimiters; the lab must render them as
    // isolated maths, never as raw `$…$` in the middle of the sentence.
    expect(feedback).not.toContain('$');
  });

  it('accepts the correct node and then states the result', () => {
    render(<LatticePlacement spec={figPage8Lab} />);
    const right = document.querySelector('[data-node="3,5"]')!;
    fireEvent.click(right);
    expect(screen.getByRole('status').textContent).toContain('متوازي أضلاع');
    expect(screen.getByTestId("placed-M'")).toHaveAttribute('data-x', '3');
  });

  it('reveals the answer only after three failed attempts and an explicit request', async () => {
    const user = userEvent.setup();
    render(<LatticePlacement spec={figPage8Lab} />);
    for (const node of ['0,0', '1,0', '2,0']) {
      fireEvent.click(document.querySelector(`[data-node="${node}"]`)!);
    }
    const reveal = screen.getByRole('button', { name: 'أظهر الحل' });
    await user.click(reveal);
    expect(screen.getByRole('status').textContent).toContain('النقطة الصحيحة هي');
  });

  it('keeps the compass construction stepper and shows the proof without controls', async () => {
    const user = userEvent.setup();
    const construction = render(<CompassLab spec={figCompassConstruction} />);
    expect(screen.getByRole('status').textContent).toContain('لنكمل');
    await user.click(screen.getByRole('button', { name: 'الخطوة التالية' }));
    expect(screen.getByRole('status').textContent).toMatch(/نصف قطرها/);
    construction.unmount();

    render(<CompassLab spec={figCompassProof} />);
    expect(screen.queryByRole('button', { name: 'الخطوة التالية' })).toBeNull();
    expect(screen.getByText('لماذا يثبت الإنشاء؟')).toBeInTheDocument();
    expect(screen.getByRole('status').textContent).toContain('العلامة المفردة');
  });

  it('offers the rejected intersection only once it can be seen', () => {
    render(<CompassLab spec={figCompassConstruction} />);
    expect(screen.queryByLabelText('أظهر نقطة التقاطع الأخرى')).toBeNull();
  });

  it('steps the triangle chain and ends on the closed triangle', async () => {
    const user = userEvent.setup();
    render(<VectorChain spec={figPracticeTriangle} />);
    const next = screen.getByRole('button', { name: 'الخطوة التالية' });
    for (let index = 0; index < 3; index += 1) await user.click(next);
    expect(screen.getByTestId('chain-final').textContent).toContain('G');
  });

  it('shows the parallelogram image for the selected translation', async () => {
    const user = userEvent.setup();
    render(<VectorChain spec={figPracticeParallelogram} />);
    await user.click(screen.getByRole('button', { name: 'الحركة ①' }));
    expect(screen.getByRole('status').textContent).toContain('C (9, 4)');
    await user.click(screen.getByRole('button', { name: 'الحركة ③' }));
    expect(screen.getByRole('status').textContent).toContain('M (4.5, 2)');
  });

  it('keeps the draggable model honest when M is pushed onto (AB)', async () => {
    const user = userEvent.setup();
    render(<PointImageLab spec={figTwoCasesLab} />);
    expect(screen.getByRole('status').textContent).toContain('متوازي أضلاع');
    await user.click(screen.getByRole('button', { name: 'ضع M على المستقيم (AB)' }));
    expect(screen.getByRole('status').textContent).toContain('الحالة الخاصة');
  });
});

describe('Lesson 2 — Teacher Area completeness', () => {
  const solutions = lesson.teacherResources?.textbookSolutions ?? [];

  it('solves all seventeen printed prompts', () => {
    expect(solutions).toHaveLength(17);
  });

  it('gives every solution steps, a rule and an independent check', () => {
    for (const solution of solutions) {
      const types = solution.blocks.map((block) => block.type);
      expect(types, solution.id).toContain('list');
      const callouts = solution.blocks.filter((block) => block.type === 'callout');
      const titles = callouts.map((block) => (block.type === 'callout' ? block.title : ''));
      expect(titles, solution.id).toContain('القاعدة المستعملة');
      expect(titles, solution.id).toContain('التحقّق');
    }
  });

  it('cites the printed page and the item for every solution', () => {
    for (const solution of solutions) {
      expect(solution.reference, solution.id).toMatch(/صفحة (8|9|10)/);
    }
  });

  it('attaches a figure to every solution that needs one', () => {
    const withFigures = solutions.filter((solution) =>
      solution.blocks.some((block) => block.type === 'figure'),
    );
    // The two fill-in prompts on page 10 are answered by naming the
    // quadrilateral; every other prompt is a construction or a placement.
    expect(withFigures).toHaveLength(15);
  });

  it('flags exactly the two solutions that lean on our own distances', () => {
    expect(
      solutions.filter((solution) => solution.limitation).map((solution) => solution.id),
    ).toEqual(['sol-p8-a2-q1', 'sol-p8-a2-q2']);
  });
});

describe('Lesson 2 — assessment stays platform-made', () => {
  const questions = lesson.assessment?.questions ?? [];

  it('asks twelve questions of at least three kinds', () => {
    expect(questions).toHaveLength(12);
    expect(new Set(questions.map((question) => question.type)).size).toBeGreaterThanOrEqual(3);
  });

  it('marks every question as authored and keeps an explanation out of reach', () => {
    for (const question of questions) {
      expect(question.origin, question.id).toBe('authored');
      expect(question.explanation?.length, question.id).toBeGreaterThan(0);
      expect(question.source, question.id).toBeUndefined();
      expect(question.skill, question.id).toBeTruthy();
    }
  });
});
