import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { App } from './App';
import { allLessons, getLesson } from '@/content/registry';
import { routes } from '@/lib/routes';
import { Blocks } from '@/components/content';
import { lesson02Notebook } from '@/content/units/lesson-02-notebook';
import type { ContentBlock } from '@/content/schema';

/**
 * ============================================================================
 *  LESSON 2 — STUDENT NOTEBOOK
 * ============================================================================
 *  An independent second experiment: its own content file, its own station id,
 *  its own tests. Lesson 1 and its notebook are only read here, never changed.
 *  Covers placement, source fidelity of the writing material, numbering,
 *  navigation, retained lab state, DOM identity and the mobile layout guard.
 * ============================================================================
 */

const NOTEBOOK_ID = 'lesson-02-student-notebook';
const NOTEBOOK_TITLE = '📒 دفتر الطالب';
const lesson = getLesson('lesson-02-image-of-a-point')!.lesson;
const notebook = lesson.steps.at(-1)!;
const last = lesson.steps.length;

const open = (n: number) =>
  render(
    <MemoryRouter initialEntries={[routes.lessonStep(lesson.id, n)]}>
      <App />
    </MemoryRouter>,
  );
const sidebar = () => screen.getByRole('navigation', { name: 'مخطّط الدرس' });
const notebookLink = () =>
  within(sidebar()).getByRole('link', { name: new RegExp(NOTEBOOK_TITLE) });

function collect(blocks: ContentBlock[]): string {
  return JSON.stringify(blocks);
}
function lists(blocks: ContentBlock[]): Extract<ContentBlock, { type: 'list' }>[] {
  const found: Extract<ContentBlock, { type: 'list' }>[] = [];
  for (const block of blocks) {
    if (block.type === 'list') found.push(block);
    if (block.type === 'callout' || block.type === 'teaching') found.push(...lists(block.blocks));
  }
  return found;
}

describe('lesson 2 student notebook — placement and isolation', () => {
  it('is the last station of lesson 2 only, after the recap and before the assessment', () => {
    expect(notebook.id).toBe(NOTEBOOK_ID);
    expect(notebook.title).toBe(NOTEBOOK_TITLE);
    expect(notebook.origin).toBe('authored');
    expect(notebook.kicker).toBe('شرح المنصّة');
    expect(notebook.source).toBeUndefined();
    expect(lesson.steps.at(-2)?.id).toBe('teach-07-recap-and-self-check');
    expect(lesson.assessment?.id).toBe('assess-lesson-02-image-of-a-point');
    expect(
      allLessons
        .filter(({ lesson: other }) => other.steps.some((step) => step.id === NOTEBOOK_ID))
        .map(({ lesson: other }) => other.id),
    ).toEqual([lesson.id]);
    // Explicit preservation of Lessons 1–4 notebooks: each exists in its lesson
    // exactly once, carries its established ID, and sits at the final step —
    // while allowing additional lessons (such as Lesson 8+) to ship notebooks.
    const establishedNotebooks: readonly [string, string][] = [
      ['lesson-01-translation-and-properties', 'student-notebook'],
      [lesson.id, NOTEBOOK_ID],
      ['lesson-03-image-of-a-shape', 'lesson-03-student-notebook'],
      ['lesson-04-triangle-congruence', 'lesson-04-student-notebook'],
    ];
    for (const [expectedLessonId, expectedNotebookId] of establishedNotebooks) {
      const target = allLessons.find(({ lesson: item }) => item.id === expectedLessonId)?.lesson;
      expect(target, expectedLessonId).toBeDefined();
      expect(
        target!.steps.filter((step) => step.title === NOTEBOOK_TITLE),
        `${expectedLessonId} must have exactly one notebook title`,
      ).toHaveLength(1);
      expect(
        target!.steps.filter((step) => step.id === expectedNotebookId),
        `${expectedLessonId} must have its expected notebook ID once`,
      ).toHaveLength(1);
      expect(target!.steps.at(-1)?.id, `${expectedLessonId} notebook must stay last`).toBe(
        expectedNotebookId,
      );
    }
    for (const { lesson: item } of allLessons) {
      const notebooks = item.steps.filter((step) => step.title === NOTEBOOK_TITLE);
      expect(notebooks.length, `${item.id} cannot have duplicate notebooks`).toBeLessThanOrEqual(1);
      if (notebooks.length === 1) {
        expect(item.steps.at(-1)?.id, `${item.id} notebook must be final step`).toBe(
          notebooks[0]!.id,
        );
      }
    }
    expect(allLessons[0]!.lesson.steps.at(-1)?.id).toBe('student-notebook');
    expect(lesson02Notebook.id).toBe(NOTEBOOK_ID);
  });

  it('uses only the existing content blocks, with no new page, tab or figure', () => {
    const allowed = new Set(['callout', 'paragraph', 'math', 'list']);
    const types = new Set<string>();
    const walk = (blocks: ContentBlock[]) => {
      for (const block of blocks) {
        types.add(block.type);
        if (block.type === 'callout' || block.type === 'teaching') walk(block.blocks);
      }
    };
    walk(notebook.blocks);
    for (const type of types) expect(allowed.has(type)).toBe(true);
    expect(types.has('figure')).toBe(false);
    expect(types.has('questionGroup')).toBe(false);
    expect(types.has('teaching')).toBe(false);
  });
});

describe('lesson 2 student notebook — content, relations and notation', () => {
  const text = collect(notebook.blocks);

  it('keeps the definition, both diagonals and the special case, with the lesson’s notation', () => {
    for (const relation of [
      "ABM'M",
      "M'",
      '$(AB)$',
      "$[AM']$",
      '$[BM]$',
      'متناصفتان',
      'متوازي أضلاع',
      'على استقامة واحدة',
      'نقطة واحدة مشتركة',
      'الصورة',
      '$I$',
    ]) {
      expect(text, `missing: ${relation}`).toContain(relation);
    }
  });

  it('keeps the compass method, the two circles and the two radius equalities', () => {
    for (const item of [
      'فرجاراً ومسطرةً غير مدرجة',
      'ينقل الطول دون أن يقرأه',
      "$HGMM'$",
      'mathcal{C}_1',
      'mathcal{C}_2',
      'مركزها $M$',
      'مركزها $H$',
      '$GH$',
      '$GM$',
      "MM' = GH",
      "HM' = GM",
      'نصف قطر الدائرة الأولى',
      'نصف قطر الدائرة الثانية',
      'ض.ض.ض',
    ]) {
      expect(text, `missing: ${item}`).toContain(item);
    }
  });

  it('states the grid rule without inventing coordinates or numeric examples', () => {
    for (const rule of [
      'الأعمدة',
      'الأسطر',
      'زوج',
      'الشبكة المطبوعة ليست حدود الورقة',
      'هامش كافٍ',
    ]) {
      expect(text).toContain(rule);
    }
    for (const invented of [
      'أربعة أعمدة',
      'ثلاثة أسطر',
      'العمود 2',
      'السطر 4',
      '(4,1)',
      '(3,5)',
      'المتجه',
      '\\vec',
      'M + (H - G)',
    ]) {
      expect(text, `invented: ${invented}`).not.toContain(invented);
    }
  });

  it('copies no story, activity, printed question, exercise or worked answer', () => {
    for (const forbidden of [
      'انقل الشكل المرافق',
      'ما صورة النقطة',
      'وضَعْ وفق هذا الانسحاب',
      'اشرح العمل الذي قمت به',
      'أكمل العبارتين',
      '........',
      'ارسم مثلثاً',
      'انسخ الشبكة الآتية',
      'ارسمْ ( مستخدماً الفرجار )',
      'القاعدة المستعملة',
      'التحقّق',
      'حلول المعلم',
      'الجواب:',
      'أحسنت',
      'النقطة الصحيحة هي',
      'أظهر الأجوبة',
      '①',
      'في أحد أرصفة دمشق',
      'الانسحاب حركة تنقل جميع نقاط الشكل',
      'خطة الرحلة',
    ]) {
      expect(text, `copied: ${forbidden}`).not.toContain(forbidden);
    }
    expect(text).not.toContain('؟');
    // No printed solution heading or a teacher-only rule callout.
    expect(text).not.toContain('variant":"theorem"');
    expect(text).not.toContain('variant":"example"');
  });

  it('renders every expression with KaTeX, LTR-isolated and without raw $ markers', () => {
    const { container } = render(<Blocks blocks={notebook.blocks} />);
    expect(container.querySelectorAll('.katex-error')).toHaveLength(0);
    expect(container.querySelectorAll('.katex-display')).toHaveLength(2);
    expect(container.textContent).not.toContain('$');
    const runs = [...container.querySelectorAll('.katex')];
    expect(runs.length).toBeGreaterThan(10);
    for (const node of runs) {
      expect(node.closest('[dir="ltr"]'), 'a maths run is not isolated').not.toBeNull();
    }
    // The point order survives as one LTR run.
    expect(runs.some((run) => run.textContent?.replace(/\s+/g, '').includes('ABM′M'))).toBe(true);
  });
});

describe('lesson 2 student notebook — headings, numbering and lists', () => {
  const titles = notebook.blocks
    .filter(
      (block): block is Extract<ContentBlock, { type: 'callout' }> => block.type === 'callout',
    )
    .map((block) => block.title ?? '');

  it('numbers five sections consecutively with the same Arabic-Indic convention', () => {
    expect(titles).toEqual([
      '١. تعريف صورة نقطة وفق انسحاب',
      '٢. الحالة الخاصة',
      '٣. إنشاء صورة نقطة',
      '٤. العمل على الشبكة',
      '٥. قواعد وملاحظات التطبيق',
    ]);
    expect(titles.map((title) => title.charAt(0))).toEqual(['١', '٢', '٣', '٤', '٥']);
    expect(notebook.blocks[0]!.type).toBe('callout');
    expect(notebook.blocks[0]).toMatchObject({ variant: 'definition' });
  });

  it('keeps the construction steps in ONE connected ordered list of four items', () => {
    const all = lists(notebook.blocks);
    const ordered = all.filter((list) => list.ordered);
    expect(ordered).toHaveLength(1);
    expect(ordered[0]!.items).toHaveLength(4);
    expect(ordered[0]!.items[0]).toContain('$HGM$');
    expect(ordered[0]!.items[1]).toContain('\\mathcal{C}_1');
    expect(ordered[0]!.items[1]).toContain('$GH$');
    expect(ordered[0]!.items[2]).toContain('\\mathcal{C}_2');
    expect(ordered[0]!.items[2]).toContain('$GM$');
    expect(ordered[0]!.items[3]).toContain('تتقاطع الدائرتان');
    expect(ordered[0]!.items[3]).toContain("M'$");

    const { container } = render(<Blocks blocks={notebook.blocks} />);
    expect(container.querySelectorAll('ol')).toHaveLength(1);
    expect(container.querySelectorAll('ol > li')).toHaveLength(4);
    expect(container.querySelector('ol')!.textContent).not.toMatch(/[١٢٣٤]\./);
    expect(container.querySelectorAll('ul')).toHaveLength(1);
    expect(container.querySelectorAll('ul > li')).toHaveLength(5);
  });

  it('keeps wide constructs inside scrollable LTR islands (mobile overflow guard)', () => {
    const { container } = render(<Blocks blocks={notebook.blocks} />);
    // No fixed-width table, image or SVG is introduced by the notebook.
    expect(container.querySelectorAll('table, img, svg, pre')).toHaveLength(0);
    for (const display of container.querySelectorAll('.katex-display')) {
      expect(display.closest('[dir="ltr"]')).not.toBeNull();
    }
    // The 390px and 320px real-viewport checks are in the Chromium report.
  });
});

describe('lesson 2 student notebook — navigation', () => {
  it('appears in the outline, sidebar and phone rail, with the assessment next', () => {
    const outline = render(
      <MemoryRouter initialEntries={[routes.lesson(lesson.id)]}>
        <App />
      </MemoryRouter>,
    );
    expect(
      within(outline.container).getByRole('link', { name: new RegExp(NOTEBOOK_TITLE) }),
    ).toHaveAttribute('href', routes.lessonStep(lesson.id, last));
    outline.unmount();

    open(last - 1);
    const links = within(sidebar()).getAllByRole('link');
    expect(links.at(-1)).toHaveTextContent(NOTEBOOK_TITLE);
    fireEvent.click(links.at(-1)!);
    expect(screen.getByRole('heading', { level: 1, name: NOTEBOOK_TITLE })).toBeInTheDocument();
    const rail = screen.getByRole('navigation', { name: 'خطوات الدرس' });
    expect(within(rail).getByRole('link', { name: NOTEBOOK_TITLE })).toHaveAttribute(
      'aria-current',
      'step',
    );
    expect(within(rail).getByRole('link', { name: NOTEBOOK_TITLE })).toHaveTextContent(
      NOTEBOOK_TITLE,
    );
    expect(screen.getByRole('link', { name: /الاختبار النهائي/ })).toHaveAttribute(
      'href',
      routes.assessment(lesson.assessment!.id),
    );
  });

  it('returns to the recap and back to the notebook', () => {
    open(last - 1);
    fireEvent.click(notebookLink());
    const back = within(screen.getByRole('navigation', { name: 'التنقّل بين الخطوات' })).getByRole(
      'link',
      { name: /خلاصة الدرس قبل الاختبار/ },
    );
    fireEvent.click(back);
    expect(
      screen.getByRole('heading', { level: 1, name: 'خلاصة الدرس قبل الاختبار' }),
    ).toBeInTheDocument();
    fireEvent.click(notebookLink());
    expect(screen.getByRole('heading', { level: 1, name: NOTEBOOK_TITLE })).toBeInTheDocument();
  });
});

describe('lesson 2 student notebook — retained lab state and DOM hygiene', () => {
  it('preserves the exact compass stepper node and its current step over repeated visits', () => {
    const construction = lesson.steps.findIndex((s) => s.id === 'step-06-construction-method') + 1;
    open(construction);
    const status = screen.getByRole('status');
    fireEvent.click(screen.getAllByRole('button', { name: 'الخطوة التالية' })[0]!);
    const stepText = status.textContent;
    expect(stepText).toMatch(/نصف قطرها/);

    for (let i = 0; i < 2; i += 1) {
      fireEvent.click(notebookLink());
      expect(status.closest('[hidden]')).not.toBeNull();
      fireEvent.click(
        within(sidebar()).getByRole('link', {
          name: new RegExp(lesson.steps[construction - 1]!.title),
        }),
      );
      expect(screen.getByRole('status')).toBe(status);
      expect(status.textContent).toBe(stepText);
    }
  });

  it('preserves the two-case lab selection and an opened disclosure', () => {
    const twoCases = lesson.steps.findIndex((s) => s.id === 'teach-05-two-cases') + 1;
    const first = open(twoCases);
    const status = screen.getByRole('status');
    fireEvent.click(screen.getByRole('button', { name: 'ضع M على المستقيم (AB)' }));
    expect(status.textContent).toContain('الحالة الخاصة');
    fireEvent.click(notebookLink());
    fireEvent.click(
      within(sidebar()).getByRole('link', { name: new RegExp(lesson.steps[twoCases - 1]!.title) }),
    );
    expect(screen.getByRole('status')).toBe(status);
    expect(status.textContent).toContain('الحالة الخاصة');
    first.unmount();

    const reading = lesson.steps.findIndex((s) => s.id === 'teach-02-reading-the-vector') + 1;
    const back = render(
      <MemoryRouter initialEntries={[routes.lessonStep(lesson.id, reading)]}>
        <App />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByRole('button', { name: /لماذا؟/ }));
    fireEvent.click(notebookLink());
    fireEvent.click(within(sidebar()).getAllByRole('link')[reading]!);
    expect(screen.getByRole('button', { name: /إخفاء/ })).toHaveAttribute('aria-expanded', 'true');
    back.unmount();
  });

  it('keeps static prose out of the DOM, retains only stateful blocks, and has no duplicate ids', () => {
    const { container } = open(1);
    const before = container.querySelectorAll('*').length;
    for (let step = 2; step <= last; step += 1) {
      fireEvent.click(within(sidebar()).getAllByRole('link')[step]!);
    }
    const after = container.querySelectorAll('*').length;
    // Regression guard: visited panels must not accumulate whole static stations.
    // Measured on the final build: 619 → 2846 elements, 9 hidden panels;
    // the same 3000-element ceiling used by the Lesson 1 notebook guard.
    expect(after).toBeLessThan(3000);
    expect(after).toBeLessThan(before * 6);
    const hidden = [...container.querySelectorAll('article > div[hidden]')];
    expect(hidden.length).toBeGreaterThan(0);
    for (const panel of hidden) {
      expect(panel.querySelector('select, input, button')).not.toBeNull();
    }
    expect(container.textContent).not.toContain('في الدرس السابق حرّكنا شكلاً كاملاً');

    const ids = [...container.querySelectorAll('[id]')].map((element) => element.id);
    const duplicates = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
    expect(duplicates).toEqual([]);
  });
});
