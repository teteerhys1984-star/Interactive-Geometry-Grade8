import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { App } from './App';
import { Blocks } from '@/components/content';
import { isNotebookStep } from '@/components/navigation';
import { allLessons, getLesson } from '@/content/registry';
import type { ContentBlock } from '@/content/schema';
import { lesson03Notebook } from '@/content/units/lesson-03-notebook';
import { routes } from '@/lib/routes';

/** Lesson 3's independent writing station and its explicit, selective opt-in.
 * Earlier notebooks are read-only controls; their own state tests stay intact.
 */
const LESSON_ID = 'lesson-03-image-of-a-shape';
const NOTEBOOK_ID = 'lesson-03-student-notebook';
const TITLE = '📒 دفتر الطالب';
const lesson = getLesson(LESSON_ID)!.lesson;
const last = lesson.steps.length;
const notebook = lesson.steps.at(-1)!;

const openAt = (id: string, step: number) =>
  render(
    <MemoryRouter initialEntries={[routes.lessonStep(id, step)]}>
      <App />
    </MemoryRouter>,
  );
const open = (step: number) => openAt(LESSON_ID, step);
const station = (id: string) => lesson.steps.findIndex((step) => step.id === id) + 1;
const sidebar = () => screen.getByRole('navigation', { name: 'مخطّط الدرس' });
const notebookLink = () => within(sidebar()).getByRole('link', { name: new RegExp(TITLE) });
const goTo = (step: number) => fireEvent.click(within(sidebar()).getAllByRole('link')[step]!);
const toNotebookAndBack = (step: number) => {
  fireEvent.click(notebookLink());
  goTo(step);
};

function strings(blocks: ContentBlock[]): string[] {
  return blocks.flatMap((block) => {
    switch (block.type) {
      case 'paragraph':
        return [block.text];
      case 'list':
        return block.items;
      case 'questionGroup':
        return [...(block.title ? [block.title] : []), ...block.items.map((item) => item.text)];
      case 'math':
        return [block.latex, ...(block.label ? [block.label] : [])];
      case 'callout':
      case 'teaching':
        return [...(block.title ? [block.title] : []), ...strings(block.blocks)];
      default:
        return [];
    }
  });
}
function lists(blocks: ContentBlock[]): Extract<ContentBlock, { type: 'list' }>[] {
  return blocks.flatMap((block) =>
    block.type === 'list'
      ? [block]
      : block.type === 'callout' || block.type === 'teaching'
        ? lists(block.blocks)
        : [],
  );
}
const sourceText = (id: string) => strings(lesson.steps.find((step) => step.id === id)!.blocks);
const text = strings(notebook.blocks).join('\n');
const sections = notebook.blocks.filter(
  (block): block is Extract<ContentBlock, { type: 'callout' }> => block.type === 'callout',
);

describe('Lesson 3 notebook — concise, grounded writing material', () => {
  it('exports the correct authored station with five meaningful sections', () => {
    expect(lesson03Notebook.id).toBe(NOTEBOOK_ID);
    expect(lesson03Notebook.title).toBe(TITLE);
    expect(lesson03Notebook.origin).toBe('authored');
    expect(lesson03Notebook.kicker).toBe('شرح المنصّة');
    expect(lesson03Notebook.source).toBeUndefined();
    expect(lesson03Notebook.check).toBeUndefined();
    expect(sections.map((section) => section.title)).toEqual([
      '١. صورة شكل وفق انسحاب',
      '٢. صورة مستقيم والتوازي والتعامد',
      '٣. صور الأشكال الأساسية',
      '٤. إنشاء صورة مستقيم',
      '٥. قواعد وتنبيهات',
    ]);
    expect(notebook.blocks).toHaveLength(5);
    expect(sections[0]!.variant).toBe('definition');
    expect(sections.slice(1).every((section) => section.variant === 'note')).toBe(true);
    expect(text.split(/\s+/).length).toBeLessThan(400);
  });

  it('grounds the general principle in p.11 and the shape-as-points teaching', () => {
    const principle = 'وفق الانسحاب، أي شكل وصورته قابلان للانطباق.';
    expect(sourceText('step-01-line-image-conjecture').join(' ')).toContain(
      'وفق الانسحاب، أي شكل وصورته قابلان للانطباق،',
    );
    expect(text).toContain(principle);
    const teaching = sourceText('teach-03-01-shape-as-points').join(' ');
    expect(teaching).toContain('وفق الانسحاب ذاته');
    expect(teaching).toContain('لا يدور الشكل ولا ينعكس ولا يتغيّر حجمه؛ إنه ينتقل فقط.');
    expect(text).toContain('وفق الانسحاب نفسه');
    expect(text).toContain('تنتقل نقاط الشكل كلها وفق الانسحاب نفسه');
    expect(text).toContain('فلا يدور الشكل ولا ينعكس ولا يتغيّر حجمه');
    expect(text).toContain('ننقل النقاط المميّزة ونصل صورها بالترتيب نفسه');
    expect(sourceText('teach-03-06-recap').join(' ')).toContain(
      'ارسم صور نقاطه المميّزة، ثم صِلها بالترتيب نفسه',
    );
  });

  it('keeps the exact line rule, the coincident case and both image-line relations', () => {
    const rule = "صورة المستقيم $(d)$ وفق أي انسحاب هي مستقيم $(d')$ يوازي $(d)$.";
    expect(sourceText('step-04-image-of-a-line-rule')).toContain(rule);
    expect(text).toContain(rule);
    expect(sourceText('step-06-construct-line-image-parallel').join(' ')).toContain(
      "ينطبق المستقيم $(d)$ على المستقيم $(d')$",
    );
    expect(text).toContain('$(d)$ يوازي مستقيم الانسحاب $(AB)$');
    expect(text).toContain("$(d')$ ينطبق على $(d)$");
    expect(text).toContain("$(d) \\parallel (D)$، فإن $(d') \\parallel (D')$");
    expect(text).toContain("$(d) \\perp (D)$، فإن $(d') \\perp (D')$");
    const relations = sourceText('step-07-parallel-perpendicular-images');
    expect(relations).toContain('صورة مستقيمين متوازيين، هما مستقيمان متوازيان.');
    expect(relations).toContain('صورة مستقيمين متعامدين، هما مستقيمان متعامدان.');
  });

  it('distinguishes segment, ray and circle, and keeps the printed shape rules', () => {
    for (const notation of [
      '$[MN]$',
      "$[M'N']$",
      "$M'N'=MN$",
      '$[Mx)$',
      "$[M'x')$",
      '$H$',
      "$H'$",
      '$\\mathcal{C}$',
      "$\\mathcal{C}'$",
      '$O$',
      "$O'$",
      'نصف قطرها يساوي نصف قطر',
      'الاتجاه نفسه',
    ]) {
      expect(text, `missing notation: ${notation}`).toContain(notation);
    }
    expect(sourceText('step-08-image-of-a-segment').join(' ')).toContain("$[M'N']$ توازي $[MN]$");
    expect(sourceText('teach-03-06-recap').join(' ')).toContain('تساويه في الطول');
    expect(sourceText('step-09-image-of-ray-and-circle').join(' ')).toContain(
      "$[M'x')$ يوازي $[Mx)$",
    );
    expect(sourceText('teach-03-06-recap').join(' ')).toContain('وله الاتجاه نفسه');
    expect(sourceText('step-09-image-of-ray-and-circle').join(' ')).toContain(
      'نصف قطرها يساوي نصف قطر',
    );
    for (const rule of [
      'صورة مستطيل $F$ هي مستطيل يطابق $F$.',
      'صورة مثلث $R$ هي مثلث يطابق $R$.',
    ]) {
      expect(sourceText('step-09-image-of-ray-and-circle')).toContain(rule);
      expect(text).toContain(rule);
    }
    expect(sourceText('step-11-square-application').join(' ')).toContain(
      'الانسحاب يحافظ على الزوايا',
    );
    expect(sourceText('step-11-square-application').join(' ')).toContain(
      'الانسحاب يحافظ على الأطوال',
    );
    expect(text).toContain('الانسحاب يحافظ على الأطوال وقياس الزوايا.');
  });

  it('records one connected four-step construction supported by pp.12,14,16', () => {
    const ordered = lists(notebook.blocks).filter((list) => list.ordered);
    expect(ordered).toHaveLength(1);
    expect(ordered[0]!.items).toHaveLength(4);
    expect(ordered[0]!.items[0]).toContain('نقطتين مختلفتين $M$ و$N$');
    expect(ordered[0]!.items[1]).toContain("نرسم $M'$ و$N'$ صورتي $M$ و$N$ باستعمال الفرجار");
    expect(ordered[0]!.items[2]).toContain("المستقيم $(M'N')$ المار بالنقطتين $M'$ و$N'$");
    expect(ordered[0]!.items[3]).toContain("المستقيم $(M'N')$ هو $(d')$ صورة المستقيم $(d)$");
    expect(sourceText('step-05-construct-line-image-nonparallel').join(' ')).toContain(
      "نختار نقطتين $M$ و $N$ من المستقيم $(d)$ ونرسم صورتيهما $M'$ و $N'$",
    );
    expect(sourceText('step-10-how-to-draw-line-image')).toContain(
      'لرسم صورة مستقيم وفق انسحاب، نرسم صورتي نقطتين منه (باستعمال الفرجار)، ثم نرسم المستقيم المار بهاتين النقطتين.',
    );
    expect(sourceText('step-13-practice-one').join(' ')).toContain('فرجاراً ومسطرة غير مدرجة');
    expect(text).toContain('فرجار ومسطرة غير مدرجة');
  });

  it('keeps only cautions actually taught, without questions, answers or teacher material', () => {
    expect(sourceText('step-02-line-image-proof').join(' ')).toContain(
      'لا يجوز استنتاج الإجابة من الشكل، بل يجب أن تتم الإجابة بالبرهان',
    );
    const cautions = sourceText('teach-03-06-recap').join(' ');
    for (const warning of [
      'عكس اتجاه الانسحاب',
      'نقل بعض الرؤوس بمسافات مختلفة',
      'وصل صور الرؤوس بترتيب مختلف',
    ]) {
      expect(cautions).toContain(warning);
    }
    expect(text).toContain('لا نستنتج التوازي من مظهر الرسم');
    expect(text).toContain('نلتزم باتجاه الانسحاب المطلوب');
    expect(text).toContain('نطبّق الحركة نفسها على جميع نقاط الشكل');
    expect(text).toContain('نصل صور النقاط بالترتيب نفسه');
    for (const forbidden of [
      '؟',
      '........',
      'انقل الشكل',
      'ارسم هذا',
      'ما العلاقة العامة',
      'ما طول',
      'أي عبارة',
      'رسم غسان هو الشكل',
      'حلول المعلم',
      'تسلسل تدريس',
      'الجواب',
      'الحل',
      'تحقّق من فهمك',
      'تدرّب',
      'المساح',
      'الاستقامة',
      'إحداثي',
      'متجه',
      '\\vec',
      '\\overrightarrow',
    ]) {
      expect(text, `out-of-scope material: ${forbidden}`).not.toContain(forbidden);
    }
    const types = new Set<string>();
    const walk = (blocks: ContentBlock[]) => {
      for (const block of blocks) {
        types.add(block.type);
        if (block.type === 'callout' || block.type === 'teaching') walk(block.blocks);
      }
    };
    walk(notebook.blocks);
    expect([...types].sort()).toEqual(['callout', 'list', 'paragraph']);
  });

  it('is not a copy of either earlier notebook and leaves their identities intact', () => {
    const earlier = [allLessons[0]!.lesson.steps.at(-1)!, allLessons[1]!.lesson.steps.at(-1)!];
    for (const other of earlier) {
      expect(notebook.id).not.toBe(other.id);
      expect(JSON.stringify(notebook.blocks)).not.toBe(JSON.stringify(other.blocks));
      const earlierStrings = new Set(strings(other.blocks));
      for (const item of strings(notebook.blocks)) expect(earlierStrings.has(item)).toBe(false);
    }
    expect(allLessons[0]!.lesson.steps.at(-1)?.id).toBe('student-notebook');
    expect(allLessons[1]!.lesson.steps.at(-1)?.id).toBe('lesson-02-student-notebook');
    expect(
      allLessons
        .filter(({ lesson: item }) => item.steps.some((step) => step.title === TITLE))
        .map(({ lesson: item }) => item.id),
    ).toEqual([allLessons[0]!.lesson.id, allLessons[1]!.lesson.id, LESSON_ID]);
  });

  it('renders isolated KaTeX, correct primes and one four-item ordered list', () => {
    const { container } = render(<Blocks blocks={notebook.blocks} />);
    expect(container.querySelectorAll('.katex-error')).toHaveLength(0);
    expect(container.textContent).not.toContain('$');
    const runs = [...container.querySelectorAll('.katex')];
    expect(runs.length).toBeGreaterThan(20);
    for (const run of runs) expect(run.closest('[dir="ltr"]')).not.toBeNull();
    const rendered = runs.map((run) => run.textContent?.replace(/\s+/g, '') ?? '');
    for (const notation of ['(d′)', '[M′N′]', '[M′x′)', 'O′', '∥', '⊥']) {
      expect(
        rendered.some((run) => run.includes(notation)),
        notation,
      ).toBe(true);
    }
    expect(container.querySelectorAll('aside')).toHaveLength(5);
    expect(container.querySelectorAll('ol')).toHaveLength(1);
    expect(container.querySelectorAll('ol > li')).toHaveLength(4);
    expect(container.querySelectorAll('ul')).toHaveLength(3);
    expect(container.querySelectorAll('table, img, svg, pre, button, input')).toHaveLength(0);
  });
});

describe('Lesson 3 notebook — existing navigation and styling', () => {
  it('appears exactly once, after the recap and immediately before the assessment', () => {
    expect(last).toBe(23);
    expect(lesson.steps.filter((step) => step.id === NOTEBOOK_ID)).toHaveLength(1);
    expect(lesson.steps.at(-2)?.id).toBe('teach-03-06-recap');
    expect(notebook).toEqual(lesson03Notebook);
    expect(lesson.assessment?.id).toBe('lesson-03-final-assessment');
    expect(
      allLessons.flatMap(({ lesson: item }) =>
        item.steps.filter((step) => step.id === NOTEBOOK_ID),
      ),
    ).toHaveLength(1);
  });

  it('is discoverable in the outline, sidebar and StepRail with notebook styling', () => {
    const outline = render(
      <MemoryRouter initialEntries={[routes.lesson(LESSON_ID)]}>
        <App />
      </MemoryRouter>,
    );
    const outlineLinks = within(outline.container).getAllByRole('link', {
      name: new RegExp(TITLE),
    });
    expect(outlineLinks).toHaveLength(1);
    expect(outlineLinks[0]).toHaveAttribute('href', routes.lessonStep(LESSON_ID, last));
    outline.unmount();

    open(last - 1);
    expect(notebookLink()).toHaveAttribute('href', routes.lessonStep(LESSON_ID, last));
    fireEvent.click(notebookLink());
    expect(screen.getByRole('heading', { level: 1, name: TITLE })).toBeInTheDocument();
    const rail = screen.getByRole('navigation', { name: 'خطوات الدرس' });
    const railLink = within(rail).getByRole('link', { name: TITLE });
    expect(railLink).toHaveAttribute('aria-current', 'step');
    expect(railLink.className).toMatch(/notebook/);
    expect(notebookLink()).toHaveAttribute('aria-current', 'step');
    const panel = screen
      .getByRole('heading', { level: 1, name: TITLE })
      .closest('article')!
      .querySelector(':scope > div:not([hidden])')!;
    expect(panel.className).toMatch(/notebook/);
    expect(isNotebookStep({ id: NOTEBOOK_ID })).toBe(true);
    expect(isNotebookStep({ id: 'student-notebook' })).toBe(true);
    expect(isNotebookStep({ id: 'lesson-02-student-notebook' })).toBe(true);
    expect(isNotebookStep({ id: 'teach-03-06-recap' })).toBe(false);
    const nav = screen.getByRole('navigation', { name: 'التنقّل بين الخطوات' });
    expect(within(nav).getByRole('link', { name: /خلاصة قبل الاختبار النهائي/ })).toHaveAttribute(
      'href',
      routes.lessonStep(LESSON_ID, last - 1),
    );
    expect(within(nav).getByRole('link', { name: /^التالي/ })).toHaveAttribute(
      'href',
      routes.assessment(lesson.assessment!.id),
    );
  });

  it('returns to the recap and back without adding a route or tab system', () => {
    open(last);
    fireEvent.click(
      within(screen.getByRole('navigation', { name: 'التنقّل بين الخطوات' })).getByRole('link', {
        name: /خلاصة قبل الاختبار النهائي/,
      }),
    );
    expect(
      screen.getByRole('heading', { level: 1, name: 'خلاصة قبل الاختبار النهائي' }),
    ).toBeInTheDocument();
    fireEvent.click(notebookLink());
    expect(screen.getByRole('heading', { level: 1, name: TITLE })).toBeInTheDocument();
  });
});

describe('Lesson 3 notebook — selective state retention', () => {
  it('preserves the explorer node, shape, both sliders and phase over two round trips', () => {
    const step = station('teach-03-03-shape-explorer');
    const { container } = open(step);
    fireEvent.click(screen.getByRole('button', { name: 'دائرة' }));
    const sliders = screen.getAllByRole('slider');
    fireEvent.change(sliders[0]!, { target: { value: '4' } });
    fireEvent.change(sliders[1]!, { target: { value: '-1' } });
    fireEvent.click(screen.getByRole('button', { name: /الشكل الأصلي/ }));
    const svg = container.querySelector('svg[role="img"]')!;
    const status = screen.getByRole('status');
    const statusText = status.textContent;
    for (let visit = 0; visit < 2; visit += 1) {
      fireEvent.click(notebookLink());
      expect(svg.closest('[hidden]')).not.toBeNull();
      goTo(step);
      expect(container.querySelector('svg[role="img"]')).toBe(svg);
      expect(screen.getByRole('button', { name: 'دائرة' })).toHaveAttribute('aria-pressed', 'true');
      expect(screen.getAllByRole('slider')[0]).toHaveValue('4');
      expect(screen.getAllByRole('slider')[1]).toHaveValue('-1');
      expect(screen.getByRole('button', { name: /الشكل الأصلي/ })).toHaveAttribute(
        'aria-pressed',
        'true',
      );
      expect(screen.getByRole('status')).toBe(status);
      expect(status.textContent).toBe(statusText);
    }
  });

  it.each([
    ['teach-03-04-construction-sequence', 1],
    ['step-11-square-application', 2],
    ['step-14-practice-two', 1],
  ] as const)('preserves the construction stepper and its position in %s', (id, advances) => {
    const step = station(id);
    open(step);
    if (id === 'step-14-practice-two') {
      fireEvent.click(
        screen.getByRole('button', { name: 'افتح نموذج المعطيات بعد أن ترسم بنفسك' }),
      );
    }
    const next = screen.getByRole('button', { name: 'الخطوة التالية' });
    const figure = next.closest('figure')!;
    for (let click = 0; click < advances; click += 1) fireEvent.click(next);
    const caption = figure.querySelector('p')!.textContent;
    toNotebookAndBack(step);
    expect(screen.getByRole('button', { name: 'الخطوة التالية' }).closest('figure')).toBe(figure);
    expect(figure.querySelector('p')!.textContent).toBe(caption);
  });

  it('preserves grouped choices and the submitted result without putting them in the notebook', () => {
    const step = station('teach-03-05-grouped-challenges');
    const { container } = open(step);
    fireEvent.click(screen.getByLabelText('المثلث ②'));
    fireEvent.click(screen.getByLabelText('٣ يميناً و٢ أعلى'));
    const figure = container.querySelector('input[type="radio"]')!.closest('figure')!;
    toNotebookAndBack(step);
    expect(container.querySelector('input[type="radio"]')!.closest('figure')).toBe(figure);
    expect(container.querySelectorAll('input:checked')).toHaveLength(2);
    expect(screen.queryByRole('status')).toBeNull();
    fireEvent.click(screen.getByLabelText('يجب أن تنتقل النقاط كلها بالحركة نفسها.'));
    fireEvent.click(screen.getByRole('button', { name: 'تحقق من المجموعة' }));
    const result = screen.getByRole('status').textContent;
    toNotebookAndBack(step);
    expect(container.querySelectorAll('input:checked')).toHaveLength(3);
    expect(container.querySelectorAll('fieldset:disabled')).toHaveLength(3);
    expect(screen.getByRole('status').textContent).toBe(result);
    fireEvent.click(notebookLink());
    expect(screen.queryByRole('radio')).toBeNull();
    expect(screen.queryByRole('button', { name: 'محاولة جديدة' })).toBeNull();
  });

  it.each([
    ['step-14-practice-two', 'افتح نموذج المعطيات بعد أن ترسم بنفسك'],
    ['teach-03-06-recap', 'اكشف الأخطاء بعد أن تسمّيها بنفسك'],
  ] as const)('preserves the disclosure in %s', (id, label) => {
    const step = station(id);
    open(step);
    const button = screen.getByRole('button', { name: label });
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    toNotebookAndBack(step);
    expect(screen.getByRole('button', { name: 'إخفاء الشرح' })).toBe(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('unmounts static stations and crops, retains only six stateful panels, and has unique IDs', () => {
    const { container } = open(1);
    const before = container.querySelectorAll('*').length;
    for (let step = 2; step <= last; step += 1) goTo(step);
    const after = container.querySelectorAll('*').length;
    const hidden = [...container.querySelectorAll('article > div[hidden]')];
    expect(hidden).toHaveLength(6);
    for (const panel of hidden) {
      expect(panel.querySelector('input, button')).not.toBeNull();
      expect(panel.querySelector('img')).toBeNull();
    }
    expect(container.textContent).not.toContain('في الدرس السابق رسمنا صورة نقطة واحدة');
    expect(container.textContent).not.toContain('الشكل ① من نشاط التخمين');
    expect(after).toBeLessThan(6000);
    // Evidence is recorded in the browser report; this guard rejects wholesale
    // retention of all 22 preceding stations, not just an arbitrary slow render.
    expect(after).toBeGreaterThan(before);
    const ids = [...container.querySelectorAll('[id]')].map((element) => element.id);
    expect(ids.filter((id, index) => ids.indexOf(id) !== index)).toEqual([]);
  });

  it('leaves a non-opt-in lesson on its original unmount-and-reset path', () => {
    const other = getLesson('lesson-04-triangle-congruence')!.lesson;
    const step = other.steps.findIndex((item) => item.id === 'teach-04-03-choosing-case') + 1;
    const { container } = openAt(other.id, step);
    const reveal = screen.getByRole('button', { name: 'اعرض طريقة ضبط الترتيب' });
    fireEvent.click(reveal);
    expect(reveal).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(within(sidebar()).getAllByRole('link')[step + 1]!);
    fireEvent.click(within(sidebar()).getAllByRole('link')[step]!);
    expect(screen.getByRole('button', { name: 'اعرض طريقة ضبط الترتيب' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    expect(container.querySelectorAll('article > div[hidden]')).toHaveLength(0);
    expect(within(sidebar()).queryByRole('link', { name: new RegExp(TITLE) })).toBeNull();
  });
});
