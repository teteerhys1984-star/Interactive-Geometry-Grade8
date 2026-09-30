import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';
import { allLessons, getLesson } from '@/content/registry';
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
    expect(allLessons.at(-3)?.lesson.id).toBe(lessonFive.id);
    expect(allLessons.at(-2)?.lesson.id).toBe(lesson.id);
    expect(lessonFive.steps.filter((step) => step.origin === 'source')).toHaveLength(19);
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
  });
});
