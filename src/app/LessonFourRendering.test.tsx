import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';
import { getLesson, getLessonNeighbours } from '@/content/registry';

const lesson = getLesson('lesson-04-triangle-congruence')!.lesson;

function renderAt(route: string) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );
}

describe('Lesson 4 — source and flow', () => {
  it('has ten source steps and six clearly authored teaching steps', () => {
    expect(lesson.steps).toHaveLength(16);
    expect(lesson.steps.filter((step) => step.origin === 'source')).toHaveLength(10);
    expect(lesson.steps.filter((step) => step.origin === 'authored')).toHaveLength(6);
  });

  it('renders every step with no missing renderer and no raw math delimiters', () => {
    for (let step = 1; step <= lesson.steps.length; step += 1) {
      const { container, unmount } = renderAt(`/lesson/${lesson.id}/step/${step}`);
      expect(screen.queryByText('الرسم غير متاح بعد'), `step ${step}`).toBeNull();
      expect(container.textContent, `step ${step} leaks a $ delimiter`).not.toContain('$');
      unmount();
    }
  });

  it('shows Lesson 4 on its outline and ends at the shared final assessment', () => {
    const { unmount } = renderAt(`/lesson/${lesson.id}`);
    expect(screen.getByRole('heading', { name: lesson.title })).toBeInTheDocument();
    expect(screen.getAllByText('16', { selector: '[dir="ltr"]' }).length).toBeGreaterThan(0);
    unmount();

    renderAt(`/lesson/${lesson.id}/step/${lesson.steps.length}`);
    const nav = screen.getByRole('navigation', { name: 'التنقّل بين الخطوات' });
    expect(within(nav).getByText('الاختبار النهائي')).toBeInTheDocument();
  });

  it('follows Lesson 3 in curriculum order (previous/next wiring)', () => {
    expect(getLessonNeighbours('lesson-03-image-of-a-shape').next?.lesson.id).toBe(lesson.id);
    expect(getLessonNeighbours(lesson.id).previous?.lesson.id).toBe('lesson-03-image-of-a-shape');
    expect(getLessonNeighbours(lesson.id).next).toBeUndefined();
  });
});

describe('Lesson 4 — interactions and BiDi', () => {
  it('renders every mathematical run inside an LTR isolate', () => {
    for (let step = 1; step <= lesson.steps.length; step += 1) {
      const { container, unmount } = renderAt(`/lesson/${lesson.id}/step/${step}`);
      for (const node of container.querySelectorAll('.katex')) {
        expect(node.closest('[dir="ltr"]'), `step ${step}: unisolated math`).not.toBeNull();
      }
      unmount();
    }
  });

  it('keeps the printed congruent-pair notation in an LTR run', () => {
    const index =
      lesson.steps.findIndex((step) => step.id === 'step-03-case-one-two-sides-included-angle') + 1;
    const { container } = renderAt(`/lesson/${lesson.id}/step/${index}`);
    const runs = [...container.querySelectorAll('[dir="ltr"]')].map((node) =>
      node.textContent?.replace(/\s+/g, ''),
    );
    expect(runs.some((run) => run?.includes('EMF,AMB'))).toBe(true);
    expect(runs.some((run) => run?.includes('AM=ME=5'))).toBe(true);
  });

  it('offers the authored congruence-cases lab and progressive proof construction', async () => {
    const user = userEvent.setup();
    const labIndex = lesson.steps.findIndex((step) => step.id === 'teach-04-03-cases-lab') + 1;
    const { unmount } = renderAt(`/lesson/${lesson.id}/step/${labIndex}`);
    expect(screen.getByRole('button', { name: 'ضلعان والزاوية المحصورة' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'الأضلاع الثلاثة' }));
    expect(screen.getByRole('status').textContent).toContain('العناصر الستة');
    unmount();

    const constructionIndex =
      lesson.steps.findIndex((step) => step.id === 'teach-04-04-proof-writing') + 1;
    renderAt(`/lesson/${lesson.id}/step/${constructionIndex}`);
    expect(screen.getByRole('button', { name: 'الخطوة التالية' })).toBeEnabled();
  });

  it('does not reveal challenge answers before grouped submission', async () => {
    const user = userEvent.setup();
    const index =
      lesson.steps.findIndex((step) => step.id === 'teach-04-05-grouped-challenges') + 1;
    renderAt(`/lesson/${lesson.id}/step/${index}`);
    await user.click(screen.getByLabelText('ضلعان والزاوية المحصورة بينهما.'));
    expect(screen.queryByText('تحتاج إلى مراجعة.')).toBeNull();
    expect(screen.queryByText('إجابة موفّقة.')).toBeNull();
  });
});

describe('Lesson 4 — assessment and Teacher Area', () => {
  it('uses the shared assessment flow and hides the answer key from students', () => {
    const { container } = renderAt(`/assessment/${lesson.assessment!.id}`);
    expect(lesson.assessment!.questions).toHaveLength(12);
    expect(container.textContent).not.toContain('الإجابة الصحيحة:');
    expect(container.textContent).not.toContain('نص الحالة الأولى');
  });

  it('appears automatically on the registry-driven Teacher dashboard', async () => {
    const user = userEvent.setup();
    renderAt('/teacher');
    expect(screen.queryByText(lesson.title)).toBeNull();
    await user.type(screen.getByLabelText('كلمة المرور المشتركة'), 'somer173');
    await user.click(screen.getByRole('button', { name: 'دخول' }));
    const title = screen.getByText(lesson.title);
    expect(title).toBeInTheDocument();
    const card = title.closest('li');
    expect(card).not.toBeNull();
    expect(
      within(card as HTMLElement).getByRole('link', { name: 'فتح منطقة المعلم' }),
    ).toBeInTheDocument();
  });

  it('keeps Lesson 4 teacher solutions out of the DOM before authentication', () => {
    renderAt(`/teacher/${lesson.id}`);
    expect(screen.getByLabelText('كلمة المرور المشتركة')).toBeInTheDocument();
    expect(screen.queryByText(/بالحالة الثالثة \(الأضلاع الثلاثة\)/)).toBeNull();
  });
});
