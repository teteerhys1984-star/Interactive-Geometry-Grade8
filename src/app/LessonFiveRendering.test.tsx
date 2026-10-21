import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';
import { getLesson } from '@/content/registry';
import type { ContentBlock } from '@/content/schema';

const lesson = getLesson('lesson-05-unit-one-exercises')!.lesson;
const REVEAL = 'حاول أولاً، ثم اكشف التحليل والحل';

function renderAt(route: string) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );
}

function cardItems(stepId: string) {
  const step = lesson.steps.find((entry) => entry.id === stepId)!;
  const card = step.blocks[0] as Extract<ContentBlock, { type: 'questionGroup' }>;
  expect(card.type).toBe('questionGroup');
  return card.items;
}

describe('Lesson 5 batch one — two printed cards, exact scope and flow', () => {
  it('presents one source step per printed main question, with subparts nested', () => {
    expect(lesson.steps.filter((s) => s.origin === 'source').map((s) => s.id)).toEqual([
      'exercise-q1',
      'exercise-q2',
    ]);
    expect(lesson.steps.filter((s) => s.origin === 'authored')).toHaveLength(3);
    expect(lesson.teacherResources?.textbookSolutions).toHaveLength(19);
    expect(lesson.steps.some((s) => s.kicker?.includes('السؤال 3'))).toBe(false);
    // Parent/subpart structure: the ten printed cases of Q1 and the nine
    // printed parts of Q2 live inside their question card, in printed order.
    expect(cardItems('exercise-q1')).toHaveLength(10);
    expect(cardItems('exercise-q2')).toHaveLength(9);
    expect(cardItems('exercise-q1')[0]?.text).toBe('نجد الشكل وصورته وفق انسحاب في الحالة:');
    expect(cardItems('exercise-q2')[8]?.text).toContain('نظيرة $C$ بالنسبة إلى $A$');
  });

  it('renders every step without raw math or a missing renderer', () => {
    lesson.steps.forEach((_, index) => {
      const { container, unmount } = renderAt(`/lesson/${lesson.id}/step/${index + 1}`);
      expect(screen.queryByText('الرسم غير متاح بعد')).toBeNull();
      expect(container.textContent).not.toContain('$');
      for (const node of container.querySelectorAll('.katex'))
        expect(node.closest('[dir="ltr"]')).not.toBeNull();
      unmount();
    });
  });

  it('keeps all ten worked solutions of Question 1 hidden until the learner asks', async () => {
    const user = userEvent.setup();
    const index = lesson.steps.findIndex((s) => s.id === 'exercise-q1');
    renderAt(`/lesson/${lesson.id}/step/${index + 1}`);
    const reveals = screen.getAllByRole('button', { name: REVEAL });
    expect(reveals).toHaveLength(10);
    expect(document.body.textContent).not.toContain('الإجابة الصحيحة هي ③:');
    // Reveal the fourth printed case (المساحة تحت الانسحاب).
    await user.click(reveals[3]!);
    expect(document.body.textContent).toContain('الإجابة الصحيحة هي ③:');
  });

  it('keeps the two corrected source figures faithful to image 4', async () => {
    const user = userEvent.setup();

    const index = lesson.steps.findIndex((s) => s.id === 'exercise-q2');
    const view = renderAt(`/lesson/${lesson.id}/step/${index + 1}`);
    const svgs = view.container.querySelectorAll('figure svg');
    expect(svgs).toHaveLength(2);

    // A is the lower-left blue vertex in the source, not the lower-right one.
    expect(svgs[0]!.querySelector('circle[cx="24"][cy="38"]')).not.toBeNull();
    // The source has one arrow on each line and no invented diagonal movement arrow.
    expect(svgs[1]!.querySelectorAll('polyline')).toHaveLength(2);
    expect(svgs[1]!.querySelectorAll('line')).toHaveLength(2);

    await user.click(screen.getAllByRole('button', { name: REVEAL })[0]!);
    expect(document.body.textContent).toContain('غير موافق؛ العبارة خاطئة.');
    view.unmount();
  });

  it('gives no immediate feedback in the batch interaction', async () => {
    const user = userEvent.setup();
    const index = lesson.steps.findIndex((s) => s.id === 'exercise-q1-decision-lab');
    renderAt(`/lesson/${lesson.id}/step/${index + 1}`);
    const lab = screen.getByRole('region', { name: /لوحة تفاعلية/ });
    const first = within(lab).getAllByRole('listitem')[0]!;
    await user.click(within(first).getByText('②'));
    expect(screen.queryByText(/نتيجتك المجمّعة/)).toBeNull();
    expect(screen.queryByText(/راجع:/)).toBeNull();
    expect(screen.getByRole('button', { name: 'تحقّق من المجموعة' })).toBeDisabled();
  });
});
