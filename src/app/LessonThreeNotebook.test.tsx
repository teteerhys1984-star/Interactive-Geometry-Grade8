import { fireEvent, render, screen, within } from '@testing-library/react';
import { Link, MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { App } from './App';
import { Blocks } from '@/components/content';
import { isNotebookStep } from '@/components/navigation';
import { allLessons, getLesson, lessonDiagrams } from '@/content/registry';
import { lessonStepSchema } from '@/content/schema';
import type { ContentBlock } from '@/content/schema';
import { lesson01Notebook } from '@/content/units/lesson-01-notebook';
import { lesson02Notebook } from '@/content/units/lesson-02-notebook';
import { lesson03Notebook } from '@/content/units/lesson-03-notebook';
import { lessonThreeHasLocalState } from '@/routes/LessonStepPage';
import pageStyles from '@/routes/LessonStepPage.module.css';
import railStyles from '@/components/navigation/StepRail.module.css';
import { routes } from '@/lib/routes';

const lesson = getLesson('lesson-03-image-of-a-shape')!.lesson;
const notebook = lesson.steps.at(-1)!;
const last = lesson.steps.length;
const title = '📒 دفتر الطالب';
const numberOf = (id: string) => lesson.steps.findIndex((step) => step.id === id) + 1;
const sidebar = () => screen.getByRole('navigation', { name: 'مخطّط الدرس' });
const go = (number: number) => fireEvent.click(within(sidebar()).getAllByRole('link')[number]!);
const open = (number: number, lessonId = lesson.id) =>
  render(
    <MemoryRouter initialEntries={[routes.lessonStep(lessonId, number)]}>
      <App />
    </MemoryRouter>,
  );

function walk(blocks: ContentBlock[]): ContentBlock[] {
  return blocks.flatMap((block) => [
    block,
    ...(block.type === 'callout' || block.type === 'teaching' ? walk(block.blocks) : []),
  ]);
}
function strings(blocks: ContentBlock[]): string[] {
  return walk(blocks).flatMap((block) => {
    if (block.type === 'paragraph') return [block.text];
    if (block.type === 'list') return block.items;
    if (block.type === 'math') return [block.latex];
    return [];
  });
}
const text = strings(notebook.blocks).join('\n');

const originalStepIds = [
  'teach-03-01-shape-as-points',
  'step-01-line-image-conjecture',
  'step-02-line-image-proof',
  'teach-03-02-why-line-stays-parallel',
  'step-03-segment-ray-circle-activity',
  'step-04-image-of-a-line-rule',
  'step-05-construct-line-image-nonparallel',
  'step-06-construct-line-image-parallel',
  'step-07-parallel-perpendicular-images',
  'step-08-image-of-a-segment',
  'teach-03-03-shape-explorer',
  'step-09-image-of-ray-and-circle',
  'teach-03-04-construction-sequence',
  'step-10-how-to-draw-line-image',
  'step-11-square-application',
  'step-12-check-understanding',
  'teach-03-05-grouped-challenges',
  'step-13-practice-one',
  'step-14-practice-two',
  'step-15-practice-three',
  'step-16-practice-four',
  'teach-03-06-recap',
];

describe('Lesson 3 notebook — content and source boundary', () => {
  it('validates as its own authored LessonStepInput and is appended exactly once', () => {
    expect(notebook).toEqual(lessonStepSchema.parse(lesson03Notebook));
    expect(notebook).toMatchObject({
      id: 'lesson-03-student-notebook',
      title,
      origin: 'authored',
      kicker: 'شرح المنصّة',
    });
    expect(notebook.source).toBeUndefined();
    expect(notebook.check).toBeUndefined();
    expect(lesson.steps.map((step) => step.id)).toEqual([
      ...originalStepIds,
      'lesson-03-student-notebook',
    ]);
    expect(lesson.assessment?.id).toBe('lesson-03-final-assessment');
    expect(lesson.steps.filter((step) => step.id === notebook.id)).toHaveLength(1);
    expect(
      allLessons
        .filter(({ lesson: other }) => other.steps.some((step) => step.id === notebook.id))
        .map(({ lesson: other }) => other.id),
    ).toEqual([lesson.id]);
  });

  it('has five concise copying sections, not teaching cards or exercises', () => {
    expect(notebook.blocks.map((block) => block.type === 'callout' && block.title)).toEqual([
      '١. صورة الشكل',
      '٢. صور الأشكال الأساسية',
      '٣. حفظ التوازي والتعامد',
      '٤. إنشاء صورة مستقيم',
      '٥. قواعد لازمة للرسم والبرهان',
    ]);
    expect(new Set(walk(notebook.blocks).map((block) => block.type))).toEqual(
      new Set(['callout', 'paragraph', 'math', 'list']),
    );
    // A copying budget, not an article: no long explanations or numerical examples.
    expect(text.split(/\s+/).length).toBeLessThan(400);
    expect(text).not.toMatch(/؟|تمرين|مثال|الجواب|الحل|حلول المعلم|غسان|عدنان|عصام|\.{4}|①/);
    for (const question of lesson.assessment!.questions) {
      for (const prompt of strings(question.prompt)) expect(text).not.toContain(prompt);
    }
    for (const solution of lesson.teacherResources!.textbookSolutions) {
      expect(text).not.toContain(solution.question);
      expect(JSON.stringify(notebook)).not.toContain(solution.id);
    }
  });

  it('grounds the shape principle, congruence and invariants in this lesson only', () => {
    for (const item of [
      'صور نقاطه وفق الانسحاب نفسه',
      'بالاتجاه نفسه وبالمسافة نفسها',
      'أي شكل وصورته قابلان للانطباق',
      'فلا يدور الشكل ولا يتغيّر حجمه',
      'المثلث $R$ مثلث يطابق $R$',
      'المستطيل $F$ مستطيل يطابق $F$',
      'الأطوال وقياس الزوايا',
    ])
      expect(text).toContain(item);
    // p.11 / p.14 / p.15 and the opening teaching establish the statements above.
    expect(numberOf('step-01-line-image-conjecture')).toBeGreaterThan(0);
    expect(lesson.steps[numberOf('step-09-image-of-ray-and-circle') - 1]!.source?.page).toBe(14);
    expect(lesson.steps[numberOf('step-11-square-application') - 1]!.source?.page).toBe(15);
    expect(text).not.toMatch(/المساح|الاستقامة|إحداثي|متجه|\\vec|\\overrightarrow/);
    const earlier = new Set([
      ...strings(lessonStepSchema.parse(lesson01Notebook).blocks),
      ...strings(lessonStepSchema.parse(lesson02Notebook).blocks),
    ]);
    for (const item of strings(notebook.blocks)) expect(earlier.has(item), item).toBe(false);
    expect(text).not.toMatch(/HGMM|متناصفت|القطران|mathcal\{C\}_1|الأعمدة|الأسطر/);
  });

  it('distinguishes line, segment, ray and circle with the actual point/prime notation', () => {
    for (const relation of [
      "المستقيم $(d)$ مستقيم $(d')$ يوازيه",
      "إذا كان $(d)$ يوازي $(AB)$، فإن $(d')$ ينطبق على $(d)$",
      "$[MN]$ هي القطعة $[M'N']$",
      "$M'$ و$N'$ صورتا $M$ و$N$ على الترتيب",
      "$M'N'=MN$",
      "$[Mx)$ هي نصف المستقيم $[M'x')$",
      "$M'$ صورة المبدأ $M$، و$H'$ صورة نقطة أخرى $H$ منه",
      "$\\mathcal{C}'$ مركزها $O'$ صورة $O$",
      'ونصف قطرها يساوي نصف قطر $\\mathcal{C}$',
    ])
      expect(text).toContain(relation);
  });

  it('maps each original line to its own image before stating the two implications', () => {
    expect(text).toContain("$(d')$ و$(D')$ صورتَي المستقيمين $(d)$ و$(D)$ على الترتيب");
    const math = walk(notebook.blocks).filter((block) => block.type === 'math');
    expect(math.map((block) => block.latex)).toEqual([
      "(d) \\parallel (D) \\Longrightarrow (d') \\parallel (D')",
      "(d) \\perp (D) \\Longrightarrow (d') \\perp (D')",
    ]);
    expect(text).toContain('لا نستنتج التوازي من مظهر الرسم');
    expect(text).toContain('نصل صورها بالترتيب الموافق للأصل');
  });

  it('keeps the supported two-point construction in one continuous four-item ordered list', () => {
    const ordered = walk(notebook.blocks).filter((block) => block.type === 'list' && block.ordered);
    expect(ordered).toHaveLength(1);
    expect(ordered[0]).toMatchObject({
      items: [
        'نختار نقطتين مختلفتين $M$ و$N$ على المستقيم $(d)$.',
        "ننشئ صورتيهما $M'$ و$N'$ وفق الانسحاب نفسه، باستعمال الفرجار بالطريقة المتعلّمة سابقاً.",
        "نرسم المستقيم $(M'N')$ المار بصورتي النقطتين.",
        "نسمّيه $(d')$؛ وهو صورة المستقيم $(d)$ وفق هذا الانسحاب.",
      ],
    });
    expect(text).toContain('فرجاراً ومسطرة غير مدرجة');
    expect(text).not.toContain('نرسم الدائرة'); // No invented compass subprocedure.
    const { container } = render(<Blocks blocks={notebook.blocks} />);
    expect(container.querySelectorAll('ol')).toHaveLength(1);
    expect(container.querySelectorAll('ol > li')).toHaveLength(4);
    expect(container.querySelector('ol')!.textContent).not.toMatch(/[١٢٣٤]\./);
  });

  it('renders every expression as LTR-isolated KaTeX without raw delimiters or new figures', () => {
    const { container } = render(<Blocks blocks={notebook.blocks} />);
    expect(container.querySelectorAll('.katex-error, code, table, img, svg, pre')).toHaveLength(0);
    expect(container.textContent).not.toContain('$');
    expect(container.querySelectorAll('.katex-display')).toHaveLength(2);
    const runs = [...container.querySelectorAll('.katex')];
    expect(runs.length).toBeGreaterThan(30);
    for (const node of runs) expect(node.closest('[dir="ltr"]')).not.toBeNull();
    expect(container.querySelectorAll('aside')).toHaveLength(5);
  });
});

describe('Lesson 3 notebook — existing navigation and styling', () => {
  it('appears once as the final outline station with the existing assessment after it', () => {
    render(
      <MemoryRouter initialEntries={[routes.lesson(lesson.id)]}>
        <App />
      </MemoryRouter>,
    );
    const link = screen.getByRole('link', { name: new RegExp(title) });
    expect(link).toHaveAttribute('href', routes.lessonStep(lesson.id, 23));
    expect(link.closest('ol')!.lastElementChild).toBe(link.closest('li'));
    const assessmentLink = screen.getByRole('link', { name: /الاختبار النهائي —/ });
    expect(assessmentLink).toHaveAttribute('href', routes.assessment(lesson.assessment!.id));
    expect(
      link.compareDocumentPosition(assessmentLink) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).not.toBe(0);
  });

  it('walks recap → notebook → recap → notebook → assessment through the existing links', () => {
    const { container } = open(last - 1);
    const navigation = () =>
      within(screen.getByRole('navigation', { name: 'التنقّل بين الخطوات' }));
    expect(within(sidebar()).getAllByRole('link').at(-1)).toHaveTextContent(title);
    fireEvent.click(navigation().getByRole('link', { name: new RegExp(title) }));
    expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument();
    const panel = container.querySelector('article > div:not([hidden])')!;
    expect(panel).toHaveClass(pageStyles.notebook!);
    const rail = within(screen.getByRole('navigation', { name: 'خطوات الدرس' }));
    const notebookLink = rail.getByRole('link', { name: title });
    expect(notebookLink).toHaveClass(railStyles.notebook!);
    expect(notebookLink).toHaveAttribute('aria-current', 'step');
    expect(rail.getAllByRole('link').at(-1)).toBe(notebookLink);
    expect(within(sidebar()).getByRole('link', { name: new RegExp(title) })).toHaveAttribute(
      'aria-current',
      'step',
    );
    fireEvent.click(navigation().getByRole('link', { name: /خلاصة قبل الاختبار النهائي/ }));
    expect(panel).not.toBeInTheDocument(); // Static notebook is not retained either.
    go(last);
    const assessmentLink = navigation().getByRole('link', { name: /^التالي\s*الاختبار النهائي$/ });
    expect(assessmentLink).toHaveAttribute('href', routes.assessment(lesson.assessment!.id));
    fireEvent.click(assessmentLink);
    expect(screen.getByRole('button', { name: 'ابدأ الاختبار' })).toBeInTheDocument();
    expect(container.querySelector('article > div[hidden]')).toBeNull();
  });

  it('recognizes exactly the four explicit notebook IDs; Lessons 1/2 retain their content and counts', () => {
    const first = getLesson('lesson-01-translation-and-properties')!.lesson;
    const second = getLesson('lesson-02-image-of-a-point')!.lesson;
    expect(first.steps).toHaveLength(18);
    expect(second.steps).toHaveLength(19);
    expect(first.steps.at(-1)).toEqual(lessonStepSchema.parse(lesson01Notebook));
    expect(second.steps.at(-1)).toEqual(lessonStepSchema.parse(lesson02Notebook));
    for (const prior of [first, second, lesson])
      expect(isNotebookStep(prior.steps.at(-1)!)).toBe(true);
    expect(isNotebookStep({ id: 'lesson-04-student-notebook' })).toBe(true);
    expect(isNotebookStep({ id: 'teach-04-08-recap' })).toBe(false);
    expect(isNotebookStep({ id: 'teach-03-06-recap' })).toBe(false);
  });
});

describe('Lesson 3 — selective learner-state retention', () => {
  it('retains exactly six state-owning containers and rejects static/no-controls figures', () => {
    expect(
      lesson.steps
        .filter((step) => step.blocks.some(lessonThreeHasLocalState))
        .map((step) => step.id),
    ).toEqual([
      'teach-03-03-shape-explorer',
      'teach-03-04-construction-sequence',
      'step-11-square-application',
      'teach-03-05-grouped-challenges',
      'step-14-practice-two',
      'teach-03-06-recap',
    ]);
    const figures = lessonDiagrams(lesson);
    expect(
      figures
        .filter((diagram) => lessonThreeHasLocalState({ type: 'figure', diagram }))
        .map((diagram) => diagram.id),
    ).toEqual([
      'auth-03-shape-explorer',
      'auth-03-quadrilateral-construction',
      'auth-03-square-application-construction',
      'auth-03-grouped-challenges',
      'auth-03-practice-two-givens',
    ]);
    const construction = figures.find(
      (diagram) => diagram.id === 'auth-03-quadrilateral-construction',
    )!;
    if (construction.kind !== 'interactive') throw new Error('Expected stepped construction');
    for (const params of [{}, { steps: [] }]) {
      expect(
        lessonThreeHasLocalState({ type: 'figure', diagram: { ...construction, params } }),
      ).toBe(false);
    }
    expect(
      lessonThreeHasLocalState({
        type: 'figure',
        diagram: { ...construction, renderer: 'unknown' },
      }),
    ).toBe(false);
    expect(
      lessonThreeHasLocalState({
        type: 'callout',
        variant: 'note',
        blocks: [{ type: 'figure', diagram: construction }],
      }),
    ).toBe(true);
    expect(notebook.blocks.some(lessonThreeHasLocalState)).toBe(false);
  });

  it('preserves shape, both sliders, phase and exact DOM identity across repeated notebook visits', () => {
    const index = numberOf('teach-03-03-shape-explorer');
    open(index);
    const circle = screen.getByRole('button', { name: 'دائرة' });
    const sliders = screen.getAllByRole('slider');
    const phase = screen.getByRole('button', { name: /مسارات النقاط/ });
    fireEvent.click(circle);
    fireEvent.change(sliders[0]!, { target: { value: '4' } });
    fireEvent.change(sliders[1]!, { target: { value: '-1' } });
    fireEvent.click(phase);
    for (let visit = 0; visit < 2; visit++) {
      go(last);
      expect(circle.closest('[hidden]')).not.toBeNull();
      go(index);
      expect(screen.getByRole('button', { name: 'دائرة' })).toBe(circle);
      expect(circle).toHaveAttribute('aria-pressed', 'true');
      expect(screen.getAllByRole('slider')[0]).toBe(sliders[0]);
      expect(sliders[0]).toHaveValue('4');
      expect(sliders[1]).toHaveValue('-1');
      expect(phase).toHaveAttribute('aria-pressed', 'true');
    }
  });

  it.each([
    ['teach-03-04-construction-sequence', '2/4'],
    ['step-11-square-application', '2/4'],
    ['step-14-practice-two', '2/2'],
  ])('preserves the %s stepper, including the nested starter disclosure', (id, progress) => {
    const index = numberOf(id);
    open(index);
    if (id === 'step-14-practice-two') {
      fireEvent.click(screen.getByRole('button', { name: /افتح نموذج المعطيات/ }));
    }
    const next = screen.getByRole('button', { name: 'الخطوة التالية' });
    const figure = next.closest('figure')!;
    const svg = figure.querySelector('svg');
    fireEvent.click(next);
    expect(figure.textContent).toContain(progress);
    go(last);
    expect(next.closest('[hidden]')).not.toBeNull();
    go(index);
    expect(screen.getByRole('button', { name: 'الخطوة التالية' })).toBe(next);
    expect(figure.querySelector('svg')).toBe(svg);
    expect(figure.textContent).toContain(progress);
    if (id === 'step-14-practice-two') {
      expect(screen.getByRole('button', { name: /إخفاء الشرح/ })).toHaveAttribute(
        'aria-expanded',
        'true',
      );
    }
  });

  it('preserves draft challenge answers, then the submitted result and locked answers', () => {
    const index = numberOf('teach-03-05-grouped-challenges');
    open(index);
    const answer = screen.getByLabelText('المثلث ②');
    fireEvent.click(answer);
    go(last);
    go(index);
    expect(screen.getByLabelText('المثلث ②')).toBe(answer);
    expect(answer).toBeChecked();
    fireEvent.click(screen.getByLabelText('٣ يميناً و٢ أعلى'));
    fireEvent.click(screen.getByLabelText('يجب أن تنتقل النقاط كلها بالحركة نفسها.'));
    fireEvent.click(screen.getByRole('button', { name: 'تحقق من المجموعة' }));
    const result = screen.getByRole('status');
    const resultText = result.textContent;
    expect(resultText).toContain('النتيجة: 3 من 3');
    go(last);
    go(index);
    expect(screen.getByRole('status')).toBe(result);
    expect(result.textContent).toBe(resultText);
    expect(answer).toBeChecked();
    expect(answer).toBeDisabled();
  });

  it('preserves the recap disclosure but unmounts its separate static summary', () => {
    const { container } = open(last - 1);
    fireEvent.click(screen.getByRole('button', { name: /اكشف الأخطاء/ }));
    const toggle = screen.getByRole('button', { name: /إخفاء الشرح/ });
    const summary = screen.getByText('قائمة التحقّق').closest('section')!;
    go(last);
    expect(toggle.closest('[hidden]')).not.toBeNull();
    expect(summary).not.toBeInTheDocument();
    expect(container.textContent).not.toContain('قائمة التحقّق');
    go(last - 1);
    expect(screen.getByRole('button', { name: /إخفاء الشرح/ })).toBe(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('قائمة التحقّق').closest('section')).not.toBe(summary);
  });

  it('unmounts all source crops/static stations and avoids duplicate IDs after a complete traversal', () => {
    const { container } = open(1);
    const staticSvg = container.querySelector('svg[role="img"]')!;
    for (let number = 2; number <= last; number++) go(number);
    expect(staticSvg).not.toBeInTheDocument();
    expect(container.querySelectorAll('article img')).toHaveLength(0);
    expect(container.querySelectorAll('article > div[hidden]')).toHaveLength(6);
    for (const panel of container.querySelectorAll('article > div[hidden]')) {
      expect(panel.children).toHaveLength(1);
      expect(panel.querySelector('input, button')).not.toBeNull();
    }
    expect(container.textContent).not.toContain('قائمة التحقّق');
    expect(container.textContent).not.toContain('في الدرس السابق رسمنا صورة نقطة واحدة');
    expect(container.querySelector('#tf-arrow-auth-03-line-image')).toBeNull();
    const ids = [...container.querySelectorAll('[id]')].map((element) => element.id);
    expect(ids.length).toBe(new Set(ids).size);
  });

  it('does not opt any other lesson into hidden-panel retention', () => {
    for (const { lesson: other } of allLessons.slice(3)) {
      const { container, unmount } = open(1, other.id);
      fireEvent.click(within(sidebar()).getAllByRole('link').at(-1)!);
      expect(container.querySelectorAll('article > div[hidden]'), other.id).toHaveLength(0);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        other.steps.at(-1)!.title,
      );
      unmount();
    }
  });

  it('clears visited Lesson 3 panels when changing lessons rather than retaining them globally', () => {
    const index = numberOf('teach-03-03-shape-explorer');
    render(
      <MemoryRouter initialEntries={[routes.lessonStep(lesson.id, index)]}>
        <App />
        <Link to={routes.lessonStep(allLessons[3]!.lesson.id, 1)}>ضابط الدرس الرابع</Link>
        <Link to={routes.lessonStep(lesson.id, index)}>العودة إلى المختبر</Link>
      </MemoryRouter>,
    );
    const slider = screen.getAllByRole('slider')[0]!;
    fireEvent.change(slider, { target: { value: '4' } });
    fireEvent.click(screen.getByRole('link', { name: 'ضابط الدرس الرابع' }));
    expect(slider).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('link', { name: 'العودة إلى المختبر' }));
    expect(screen.getAllByRole('slider')[0]).not.toBe(slider);
    expect(screen.getAllByRole('slider')[0]).toHaveValue('3');
  });
});
