import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { App } from './App';
import { allLessons } from '@/content/registry';
import { routes } from '@/lib/routes';
import { Blocks } from '@/components/content';

const lesson = allLessons[0]!.lesson;
const last = lesson.steps.length;
const open = (n: number) =>
  render(
    <MemoryRouter initialEntries={[routes.lessonStep(lesson.id, n)]}>
      <App />
    </MemoryRouter>,
  );
const sidebar = () => screen.getByRole('navigation', { name: 'مخطّط الدرس' });

describe('lesson 1 student notebook in existing navigation', () => {
  it('is the last station only in lesson 1 and renders every expression', () => {
    expect(lesson.steps.at(-1)?.id).toBe('student-notebook');
    expect(lesson.steps.at(-2)?.id).toBe('teach-07-recap-before-assessment');
    expect(
      allLessons
        .slice(1)
        .every(({ lesson: other }) => !other.steps.some((s) => s.id === 'student-notebook')),
    ).toBe(true);
    const { container } = render(<Blocks blocks={lesson.steps.at(-1)!.blocks} />);
    expect(container.querySelectorAll('.katex-error')).toHaveLength(0);
    expect(container.querySelectorAll('.katex-display')).toHaveLength(3);
    const properties = [...container.querySelectorAll('aside')].find((section) =>
      section.textContent?.includes('٤. خواص الانسحاب'),
    )!;
    expect(properties.querySelectorAll('ol')).toHaveLength(1);
    expect(properties.querySelectorAll('ol > li')).toHaveLength(4);
    expect(properties.querySelector('ol')!.textContent).not.toMatch(/[٢٣٤]\./);
    for (const word of ['الأطوال', 'الاستقامة', 'الزوايا', 'المساحات'])
      expect(container.textContent).toContain(word);
  });

  it('opens from the last original station, with visible mobile label and assessment next', () => {
    open(last - 1);
    const links = within(sidebar()).getAllByRole('link');
    expect(links.at(-1)).toHaveTextContent('📒 دفتر الطالب');
    fireEvent.click(links.at(-1)!);
    expect(screen.getByRole('heading', { level: 1, name: '📒 دفتر الطالب' })).toBeInTheDocument();
    const rail = screen.getByRole('navigation', { name: 'خطوات الدرس' });
    expect(within(rail).getByRole('link', { name: '📒 دفتر الطالب' })).toHaveAttribute(
      'aria-current',
      'step',
    );
    expect(screen.getByRole('link', { name: /الاختبار النهائي/ })).toHaveAttribute(
      'href',
      routes.assessment(lesson.assessment!.id),
    );
  });

  it('preserves the exact lab DOM node and its chosen value over repeated notebook visits', () => {
    const grid = lesson.steps.findIndex((s) => s.id === 'launch-grid') + 1;
    open(grid);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'EDGF' } });
    for (let i = 0; i < 2; i++) {
      fireEvent.click(within(sidebar()).getByRole('link', { name: /📒 دفتر الطالب/ }));
      expect(select.closest('[hidden]')).not.toBeNull();
      fireEvent.click(
        within(sidebar()).getByRole('link', { name: new RegExp(lesson.steps[grid - 1]!.title) }),
      );
      expect(screen.getByRole('combobox')).toBe(select);
      expect(select).toHaveValue('EDGF');
    }
  });
  it('removes inactive static content while retaining only stateful blocks', () => {
    const { container } = open(1);
    for (let step = 2; step <= last; step++) {
      fireEvent.click(within(sidebar()).getAllByRole('link')[step]!);
    }
    // A regression guard against the former 10,003-element accumulated DOM.
    expect(container.querySelectorAll('*').length).toBeLessThan(3000);
    const hidden = [...container.querySelectorAll('article > div[hidden]')];
    expect(hidden.length).toBeGreaterThan(0);
    for (const panel of hidden) {
      expect(panel.querySelector('select, input, button')).not.toBeNull();
    }
    expect(container.textContent).not.toContain('حلّ السؤال 2 — كيف نضمن أننا لم ننسَ شكلاً؟');
  });

  it('preserves an opened explanation without retaining the station prose', () => {
    const intro = lesson.steps.findIndex((s) => s.id === 'teach-01-what-is-a-translation') + 1;
    open(intro);
    fireEvent.click(screen.getByRole('button', { name: /فكّر أولاً، ثم اكشف الإجابة/ }));
    fireEvent.click(within(sidebar()).getByRole('link', { name: /📒 دفتر الطالب/ }));
    fireEvent.click(within(sidebar()).getAllByRole('link')[intro]!);
    expect(screen.getByRole('button', { name: /إخفاء الشرح/ })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });
});
