import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';
import { allLessons, getLesson } from '@/content/registry';
import { lockTeacherArea } from '@/lib/teacherAccess';

const lesson = getLesson('lesson-07-unit-one-exercises-final')!.lesson;
const lessonSix = getLesson('lesson-06-unit-one-exercises-continuation')!.lesson;
const lessonFive = getLesson('lesson-05-unit-one-exercises')!.lesson;

function renderAt(route: string) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );
}

beforeEach(() => lockTeacherArea());

describe('Lesson 7 — independent Q16–Q28 exercise lab', () => {
  it('follows Lesson 6 in the registry without touching Lessons 5 and 6', () => {
    expect(allLessons.at(-1)?.lesson.id).toBe(lesson.id);
    expect(allLessons.at(-2)?.lesson.id).toBe(lessonSix.id);
    expect(lessonSix.steps).toHaveLength(13);
    expect(lessonSix.teacherResources?.textbookSolutions).toHaveLength(13);
    expect(lessonFive.steps.filter((step) => step.origin === 'source')).toHaveLength(19);
    expect(lessonFive.teacherResources?.textbookSolutions).toHaveLength(19);
    expect(lesson.steps.some((step) => step.kicker?.includes('السؤال 15'))).toBe(false);
    expect(lessonSix.steps.some((step) => step.kicker?.includes('السؤال 16'))).toBe(false);
  });

  it('registers on the course home, the unit card and the lesson outline', () => {
    const home = renderAt('/');
    expect(screen.getByText(/7 دروس متاحة/)).toBeInTheDocument();
    home.unmount();

    const unit = renderAt('/unit/unit-01-parallelograms-and-translation');
    expect(screen.getByText(lesson.title)).toBeInTheDocument();
    unit.unmount();

    renderAt(`/lesson/${lesson.id}`);
    expect(screen.getByRole('heading', { name: lesson.title, level: 1 })).toBeInTheDocument();
    expect(screen.getAllByText(/تمرينات الوحدة الأولى — السؤال/)).toHaveLength(13);
    expect(screen.getAllByText('شرح المنصّة')).toHaveLength(2);
  });

  it('renders every step with isolated maths and registered renderers only', () => {
    lesson.steps.forEach((step, index) => {
      const { container, unmount } = renderAt(`/lesson/${lesson.id}/step/${index + 1}`);
      expect(screen.getAllByText(step.title).length).toBeGreaterThan(0);
      expect(screen.queryByText('الرسم غير متاح بعد')).toBeNull();
      expect(container.textContent).not.toContain('$');
      for (const node of container.querySelectorAll('.katex')) {
        expect(node.closest('[dir="ltr"]')).not.toBeNull();
      }
      unmount();
    });
  });

  it('shows the complete printed text of each question on its own step', () => {
    lesson.steps
      .filter((step) => step.origin === 'source')
      .forEach((step) => {
        const index = lesson.steps.indexOf(step);
        const { unmount } = renderAt(`/lesson/${lesson.id}/step/${index + 1}`);
        expect(screen.getByText('نصّ السؤال المطبوع كاملاً')).toBeInTheDocument();
        unmount();
      });
  });

  it('withholds every verdict until the whole workshop is complete', async () => {
    const user = userEvent.setup();
    // Step 6 is Question 20: two single-choice tasks and one ordering task.
    renderAt(`/lesson/${lesson.id}/step/6`);
    const lab = screen.getByRole('region', { name: /ورشة برهان للسؤال 20/ });

    expect(within(lab).queryByText(/حصيلة المختبر/)).toBeNull();
    const review = within(lab).getByRole('button', { name: 'راجع عملي كاملاً' });
    expect(review).toBeDisabled();

    const radios = within(lab).getAllByRole('radio');
    await user.click(radios[0]!);
    expect(within(lab).queryByText(/حصيلة المختبر/)).toBeNull();
    expect(within(lab).queryByText(/قرارك منسجم مع سلسلة البرهان/)).toBeNull();
    expect(within(lab).getByRole('button', { name: 'راجع عملي كاملاً' })).toBeDisabled();

    await user.click(within(lab).getAllByRole('radio').at(-1)!);
    expect(within(lab).queryByText(/حصيلة المختبر/)).toBeNull();

    // The ordering task only counts as answered once the learner moves a step.
    await user.click(within(lab).getAllByRole('button', { name: /حرّك الخطوة/ })[1]!);
    await user.click(within(lab).getByRole('button', { name: 'راجع عملي كاملاً' }));
    expect(within(lab).getByText(/حصيلة المختبر/)).toBeInTheDocument();
  });

  it('opens the hint ladder one rung at a time and never judges the learner', async () => {
    const user = userEvent.setup();
    // Step 8 is Question 22, which carries a hint ladder.
    renderAt(`/lesson/${lesson.id}/step/8`);
    const ladder = screen.getByRole('region', { name: /سلّم تلميحات للسؤال 22/ });

    expect(within(ladder).queryByText(/الرباعي .* متوازي أضلاع، لأنه رباعي/)).toBeNull();
    expect(document.body.textContent).not.toContain('وقطراه هما');

    await user.click(within(ladder).getByRole('button', { name: 'اكشف التلميح الأول' }));
    expect(document.body.textContent).not.toContain('وقطراه هما');

    await user.click(within(ladder).getByRole('button', { name: 'أحتاج تلميحاً أعمق' }));
    await user.click(within(ladder).getByRole('button', { name: 'اكشف مسار الحل كاملاً' }));
    expect(document.body.textContent).toContain('وقطراه هما');
  });

  it('keeps the worked solution collapsed until the learner opens it', async () => {
    const user = userEvent.setup();
    // Step 14 is Question 28, the last printed question.
    renderAt(`/lesson/${lesson.id}/step/14`);
    expect(document.body.textContent).not.toContain('الزاويتان المتبادلتان داخلاً بين متوازيين');
    await user.click(screen.getByRole('button', { name: 'حاول أولاً، ثم اكشف الحل والتحقق' }));
    expect(document.body.textContent).toContain('الزاويتان المتبادلتان داخلاً بين متوازيين');
  });

  it('routes the last step to completion, not to a duplicate final test', () => {
    renderAt(`/lesson/${lesson.id}/step/15`);
    const nav = screen.getByRole('navigation', { name: 'التنقّل بين الخطوات' });
    expect(within(nav).getByText('إنهاء الدرس')).toBeInTheDocument();
    expect(within(nav).queryByText('الاختبار النهائي')).toBeNull();
  });

  it('reproduces the printed reasoning table of Question 20 as a real table', () => {
    renderAt(`/lesson/${lesson.id}/step/6`);
    const table = screen.getByRole('table', { name: /الجدول المطبوع مع السؤال/ });
    expect(within(table).getByText('الفرض')).toBeInTheDocument();
    expect(within(table).getByText('الخاصة')).toBeInTheDocument();
    expect(within(table).getByText('النتيجة')).toBeInTheDocument();
    expect(within(table).getByText('قطرا المستطيل متساويا الطول')).toBeInTheDocument();
  });

  it('does not put teacher solutions in the DOM before authentication', async () => {
    const user = userEvent.setup();
    const { container } = renderAt(`/teacher/${lesson.id}`);
    expect(screen.getByLabelText('كلمة المرور المشتركة')).toBeInTheDocument();
    expect(container.querySelectorAll('details')).toHaveLength(0);
    expect(document.body.textContent).not.toContain('الخطوات حسب ترتيب فروع السؤال');
    expect(document.body.textContent).not.toContain('قطرا المعين متعامدان');

    await user.type(screen.getByLabelText('كلمة المرور المشتركة'), 'somer173');
    await user.click(screen.getByRole('button', { name: 'دخول' }));
    expect(container.querySelectorAll('details')).toHaveLength(13);
    expect(document.body.textContent).toContain('الخطوات حسب ترتيب فروع السؤال');
  });
});
