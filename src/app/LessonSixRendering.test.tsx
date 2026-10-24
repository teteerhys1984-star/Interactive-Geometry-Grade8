import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';
import { allLessons, getLesson } from '@/content/registry';
import { lesson06Exercises } from '@/content/units/lesson-06-unit-exercises-continuation';
import { lockTeacherArea } from '@/lib/teacherAccess';

const lesson = getLesson('lesson-06-unit-one-exercises-continuation')!.lesson;
const lessonFive = getLesson('lesson-05-unit-one-exercises')!.lesson;

function renderAt(route: string) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );
}

beforeEach(() => lockTeacherArea());

describe('Lesson 6 — independent Q3–Q15 exercise lab', () => {
  it('follows Lesson 5 in the registry without changing the Q1–Q2 lesson', () => {
    const order = allLessons.map((entry) => entry.lesson.id);
    const index = order.indexOf(lesson.id);
    expect(order[index - 1]).toBe(lessonFive.id);
    expect(order[index + 1]).toBe('lesson-07-unit-one-exercises-final');
    // Lesson 5 presents its two printed questions as two source steps,
    // still carrying all nineteen printed parts and nineteen solutions.
    expect(
      lessonFive.steps.filter((step) => step.origin === 'source').map((step) => step.id),
    ).toEqual(['exercise-q1', 'exercise-q2']);
    expect(lessonFive.teacherResources?.textbookSolutions).toHaveLength(19);
    expect(lessonFive.steps.some((step) => step.kicker?.includes('السؤال 3'))).toBe(false);
  });

  it('renders the course home, unit card and lesson outline registration', () => {
    const home = renderAt('/');
    expect(screen.getByText(/7 دروس متاحة/)).toBeInTheDocument();
    home.unmount();

    const unit = renderAt('/unit/unit-01-parallelograms-and-translation');
    expect(screen.getByText(lesson.title)).toBeInTheDocument();
    unit.unmount();

    renderAt(`/lesson/${lesson.id}`);
    expect(screen.getByRole('heading', { name: lesson.title, level: 1 })).toBeInTheDocument();
    expect(screen.getAllByText(/تمرينات الوحدة الأولى — السؤال/)).toHaveLength(13);
  });

  it('renders every question as its own step with isolated math and registered renderers', () => {
    lesson.steps.forEach((step, index) => {
      const { container, unmount } = renderAt(`/lesson/${lesson.id}/step/${index + 1}`);
      expect(screen.getAllByText(step.title).length).toBeGreaterThan(0);
      expect(screen.getByText('نصّ السؤال المطبوع كاملاً')).toBeInTheDocument();
      expect(container.querySelector('article section[dir="rtl"][aria-label]')).not.toBeNull();
      expect(screen.queryByText('الرسم غير متاح بعد')).toBeNull();
      expect(container.textContent).not.toContain('$');
      for (const node of container.querySelectorAll('.katex')) {
        expect(node.closest('[dir="ltr"]')).not.toBeNull();
      }
      unmount();
    });
  });

  it('withholds all correctness feedback until the question activity is complete', async () => {
    const user = userEvent.setup();
    renderAt(`/lesson/${lesson.id}/step/1`);
    const lab = screen.getByRole('region', { name: /نشاط تفاعلي مجمّع للسؤال 3/ });
    const decisions = within(lab).getAllByRole('group');

    await user.click(within(decisions[0]!).getAllByRole('radio')[0]!);
    expect(within(lab).queryByText(/حصيلة السلسلة/)).toBeNull();
    expect(within(lab).queryByText(/اختيارك منسجم/)).toBeNull();
    expect(within(lab).getByRole('button', { name: 'تحقّق من السلسلة كاملة' })).toBeDisabled();

    await user.click(within(decisions[1]!).getAllByRole('radio')[0]!);
    await user.click(within(lab).getByRole('button', { name: 'تحقّق من السلسلة كاملة' }));
    expect(within(lab).getByText(/حصيلة السلسلة/)).toBeInTheDocument();
  });

  it('keeps the worked solution hidden until the learner opens it', async () => {
    const user = userEvent.setup();
    renderAt(`/lesson/${lesson.id}/step/13`);
    expect(document.body.textContent).not.toContain('الصورة مثلث قائم مطابق للأصل');
    await user.click(screen.getByRole('button', { name: 'حاول أولاً، ثم اكشف الحل والتحقق' }));
    expect(document.body.textContent).toContain('الصورة مثلث قائم مطابق للأصل');
  });

  it('reveals one solved branch per printed sub-part, in printed order', async () => {
    const user = userEvent.setup();
    const { unmount } = renderAt(`/lesson/${lesson.id}/step/1`);
    await user.click(screen.getByRole('button', { name: 'حاول أولاً، ثم اكشف الحل والتحقق' }));
    const revealed = document.body.textContent ?? '';
    expect(revealed).toContain('الفرع 1.');
    expect(revealed).toContain('الفرع 2.');
    expect(revealed.indexOf('الفرع 1.')).toBeLessThan(revealed.indexOf('الفرع 2.'));
    expect(revealed.match(/المطلوب في هذا الفرع/g)).toHaveLength(2);
    unmount();
  });

  it('reveals every branch with isolated maths on all thirteen questions', async () => {
    const user = userEvent.setup();
    for (const [index, step] of lesson.steps.entries()) {
      const { container, unmount } = renderAt(`/lesson/${lesson.id}/step/${index + 1}`);
      await user.click(screen.getByRole('button', { name: 'حاول أولاً، ثم اكشف الحل والتحقق' }));
      expect(container.textContent, step.id).not.toContain('$');
      for (const node of container.querySelectorAll('.katex')) {
        expect(node.closest('[dir="ltr"]')).not.toBeNull();
      }
      unmount();
    }
  });

  it('keeps the corrected Q6 vector in the revealed solution', async () => {
    const user = userEvent.setup();
    renderAt(`/lesson/${lesson.id}/step/4`);
    await user.click(screen.getByRole('button', { name: 'حاول أولاً، ثم اكشف الحل والتحقق' }));
    const revealed = document.body.textContent ?? '';
    expect(revealed).toContain('ثلاث خانات إلى اليسار');
    expect(revealed).toContain('خانتان إلى الأسفل');
    expect(revealed).not.toContain('وثلاث خانات إلى الأسفل');
    expect(revealed.match(/المطلوب في هذا الفرع/g)).toHaveLength(4);
  });

  it('keeps every one of the 46 branches out of the DOM until the solution is opened', async () => {
    const user = userEvent.setup();
    const { container } = renderAt(`/lesson/${lesson.id}/step/7`);
    expect(container.textContent).not.toContain('الفرع ');
    await user.click(screen.getByRole('button', { name: 'حاول أولاً، ثم اكشف الحل والتحقق' }));
    expect((container.textContent ?? '').match(/الفرع /g)).toHaveLength(6);
  });

  it('routes the final exercise directly to completion, not a duplicate final test', () => {
    renderAt(`/lesson/${lesson.id}/step/13`);
    const nav = screen.getByRole('navigation', { name: 'التنقّل بين الخطوات' });
    expect(within(nav).getByText('إنهاء الدرس')).toBeInTheDocument();
    expect(within(nav).queryByText('الاختبار النهائي')).toBeNull();
  });

  it('does not put teacher solutions in the DOM before authentication', async () => {
    const user = userEvent.setup();
    const { container } = renderAt(`/teacher/${lesson.id}`);
    expect(screen.getByLabelText('كلمة المرور المشتركة')).toBeInTheDocument();
    expect(container.querySelectorAll('details')).toHaveLength(0);
    expect(document.body.textContent).not.toContain('الخطوات حسب ترتيب فروع السؤال');

    await user.type(screen.getByLabelText('كلمة المرور المشتركة'), 'somer173');
    await user.click(screen.getByRole('button', { name: 'دخول' }));
    expect(container.querySelectorAll('details')).toHaveLength(13);
    expect(document.body.textContent).toContain('الخطوات حسب ترتيب فروع السؤال');
    // One branch block per printed sub-part, all 46 of them, in printed order.
    expect((document.body.textContent ?? '').match(/المطلوب في هذا الفرع/g)).toHaveLength(46);
    const branchAsides = [...container.querySelectorAll('aside')].filter((node) =>
      (node.textContent ?? '').includes('الفرع '),
    );
    expect(branchAsides).toHaveLength(46);
    // The solutions panel itself must never leak raw math delimiters.
    expect(container.querySelector('#teacher-panel-solutions')?.textContent).not.toContain('$');
  });

  /* ------------------------------------------------- placeholders */

  it('never renders a «راجع الكتاب» placeholder on any student step', () => {
    // Regression guard for the corrective pass: every Lesson 06 figure is now a
    // real SVG or an authored lab, so the faithful-placeholder card must never
    // reach a learner on this lesson.
    for (const [index, step] of lesson.steps.entries()) {
      const { container, unmount } = renderAt(`/lesson/${lesson.id}/step/${index + 1}`);
      expect(container.textContent, step.id).not.toContain('يوجد رسم هنا');
      expect(container.textContent, step.id).not.toContain('راجع الكتاب');
      unmount();
    }
  });

  it('keeps the placeholder out of the fully revealed solutions too', async () => {
    const user = userEvent.setup();
    const { container } = renderAt(`/lesson/${lesson.id}/step/1`);
    await user.click(screen.getByRole('button', { name: 'حاول أولاً، ثم اكشف الحل والتحقق' }));
    expect(container.textContent).not.toContain('يوجد رسم هنا');
    expect(container.textContent).not.toContain('راجع الكتاب');
  });

  it('draws every printed textbook figure as a real SVG, not a message', () => {
    // Questions 3, 4, 6, 9, 10, 11, 13 and 15 each print a figure; all eight
    // are now drawn in-platform. Questions 5, 7, 8, 12, 14 print no figure.
    const withFigure = lesson06Exercises.filter((exercise) => exercise.sourceFigure);
    expect(withFigure.map((exercise) => exercise.number)).toEqual([3, 4, 6, 9, 10, 11, 13, 15]);
    for (const exercise of withFigure) {
      const { container, unmount } = renderAt(`/lesson/${lesson.id}/step/${exercise.number - 2}`);
      const svg = container.querySelector('svg[role="img"]');
      expect(svg, `Q${exercise.number}`).not.toBeNull();
      // A real drawing, not an empty frame.
      expect(svg!.querySelectorAll('line, path, circle, rect, polygon').length).toBeGreaterThan(3);
      unmount();
    }
  });
});
