import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';
import { getLesson } from '@/content/registry';

const lesson = getLesson('lesson-05-unit-one-exercises')!.lesson;
function renderAt(route: string) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );
}

describe('Lesson 5 batch one — exact scope and flow', () => {
  it('contains exactly 10 + 9 source exercise parts and 3 authored lab steps', () => {
    expect(lesson.steps.filter((s) => s.origin === 'source')).toHaveLength(19);
    expect(lesson.steps.filter((s) => s.origin === 'authored')).toHaveLength(3);
    expect(lesson.teacherResources?.textbookSolutions).toHaveLength(19);
    expect(lesson.steps.some((s) => s.kicker?.includes('السؤال 3'))).toBe(false);
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

  it('keeps worked solutions hidden until the learner asks', async () => {
    const user = userEvent.setup();
    const index = lesson.steps.findIndex((s) => s.id === 'exercise-q1-4');
    renderAt(`/lesson/${lesson.id}/step/${index + 1}`);
    expect(document.body.textContent).not.toContain('الإجابة الصحيحة هي ③:');
    await user.click(screen.getByRole('button', { name: 'حاول أولاً، ثم اكشف التحليل والحل' }));
    expect(document.body.textContent).toContain('الإجابة الصحيحة هي ③:');
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
