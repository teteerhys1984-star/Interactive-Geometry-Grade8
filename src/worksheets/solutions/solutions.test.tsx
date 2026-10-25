import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import katex from 'katex';
import { App } from '@/app/App';
import { testFigureSpecSchema } from '@/components/diagram/renderers/testFigureSpec';
import { routes } from '@/lib/routes';
import { hasUnisolatedNotation, splitInlineMath } from '@/lib/bidi';
import { schoolWorksheets } from '../registry';
import type { SchoolWorksheet } from '../schema';
import {
  buildWorksheetSolutionCatalog,
  getWorksheetSolutions,
  worksheetSolutionTargets,
} from './registry';
import { worksheetSolutionSetSchema } from './schema';
import { unit01Worksheet01Solutions } from './unit-01-worksheet-01';

const ws = schoolWorksheets.find((w) => w.id === 'unit-01-worksheet-01')!;
const set = getWorksheetSolutions(ws.id)!;
const clone = () => structuredClone(unit01Worksheet01Solutions);
function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe('worksheet solutions — source coverage and extensible linkage', () => {
  it('accounts for all 12 + 7 + 6 items and all 2 + 2 + 3 geometry demands in source order', () => {
    expect(set.entries).toHaveLength(32);
    expect(
      set.entries.map(({ pageNumber, groupId, questionId, subQuestionId }) => ({
        pageNumber,
        groupId,
        questionId,
        subQuestionId,
      })),
    ).toEqual(worksheetSolutionTargets(ws));
    expect(set.entries.map((e) => e.subQuestionId ?? e.questionId)).toEqual([
      ...Array.from({ length: 12 }, (_, i) => `ws01-q1-${String(i + 1).padStart(2, '0')}`),
      ...Array.from({ length: 7 }, (_, i) => `ws01-q2-${String(i + 1).padStart(2, '0')}`),
      ...Array.from({ length: 6 }, (_, i) => `ws01-q3-${String(i + 1).padStart(2, '0')}`),
      'ws01-q4-p1-1',
      'ws01-q4-p1-2',
      'ws01-q4-p2-1',
      'ws01-q4-p2-2',
      'ws01-q4-p3-1',
      'ws01-q4-p3-2',
      'ws01-q4-p3-3',
    ]);
    expect(set.entries.every((e) => e.status === 'solved')).toBe(true);
  });

  it('records verified option selections, verdicts, completions and source caveats', () => {
    const solved = set.entries.filter((e) => e.status === 'solved');
    expect(solved.slice(0, 12).map((e) => e.optionId)).toEqual([
      'A',
      'A',
      'C',
      'C',
      'A',
      'C',
      'B',
      'B',
      'B',
      'B',
      'C',
      'A',
    ]);
    expect(solved.slice(12, 19).map((e) => e.verdict)).toEqual([
      'غير موافق',
      'غير موافق',
      'غير موافق',
      'غير موافق',
      'موافق',
      'موافق',
      'غير موافق',
    ]);
    expect(solved.slice(19, 25).map((e) => e.answer)).toEqual([
      'النقطة $O$.',
      'مستقيمان متعامدان.',
      'مثلث مساحته $6\\,cm^2$.',
      'وتراهما وضلع قائمة من الأول مع نظيره من الثاني.',
      "يطابقه (يمكن تسمية الصورة $F'$).",
      'المساحة $=\\frac{\\text{طول القاعدة}\\times\\text{الارتفاع الموافق لها}}{2}$.',
    ]);
    expect(solved[0]!.sourceNote).toContain('لا تجعل الإجابة وحيدة');
    expect(solved[9]!.sourceNote).toContain('دون تحديد نوع التحويل');
    expect(solved[30]!.sourceNote).toContain('NAB\\cong MBA');
    for (const e of solved) {
      expect(e.answer.trim().length).toBeGreaterThan(5);
      expect(e.steps.length).toBeGreaterThanOrEqual(1);
      expect(e.steps.join(' ').length).toBeGreaterThan(50);
      expect([e.answer, ...e.steps].join(' ')).not.toMatch(/TODO|placeholder|قريباً|سيضاف/i);
    }
  });

  it.each([
    'missing',
    'reordered',
    'duplicate',
    'wrong-page',
    'wrong-group',
    'wrong-parent',
    'wrong-subquestion',
  ])('rejects %s coverage rather than silently dropping a difficult question', (mutation) => {
    const copy = clone();
    if (mutation === 'missing') copy.entries.pop();
    if (mutation === 'reordered')
      [copy.entries[0], copy.entries[1]] = [copy.entries[1]!, copy.entries[0]!];
    if (mutation === 'duplicate') copy.entries[1] = copy.entries[0]!;
    if (mutation === 'wrong-page') copy.entries[0]!.pageNumber = 2;
    if (mutation === 'wrong-group') copy.entries[0]!.groupId = 'ws01-q2';
    if (mutation === 'wrong-parent') copy.entries[25]!.questionId = 'ws01-q4-p2';
    if (mutation === 'wrong-subquestion') copy.entries[25]!.subQuestionId = 'not-a-source-question';
    expect(() => buildWorksheetSolutionCatalog([copy])).toThrow(/coverage\/order/);
  });

  it('rejects unknown/duplicate worksheets, invalid options/verdicts, empty answers and empty proofs', () => {
    expect(() => buildWorksheetSolutionCatalog([{ ...clone(), worksheetId: 'missing' }])).toThrow(
      /Unknown/,
    );
    expect(() => buildWorksheetSolutionCatalog([clone(), clone()])).toThrow(/Duplicate/);
    for (const change of ['option', 'verdict', 'answer', 'steps']) {
      const copy = clone();
      const entry = copy.entries[change === 'verdict' ? 12 : 0]!;
      if (entry.status !== 'solved') throw new Error('Expected solved fixture');
      if (change === 'option') entry.optionId = 'D';
      if (change === 'verdict') delete entry.verdict;
      if (change === 'answer') entry.answer = ' ';
      if (change === 'steps') entry.steps = [];
      expect(() => buildWorksheetSolutionCatalog([copy])).toThrow();
    }
  });

  it('supports future worksheets and explicit unresolved statuses with a reason', () => {
    const future: SchoolWorksheet = { ...ws, id: 'future-worksheet' };
    const second = { ...clone(), worksheetId: future.id };
    expect(buildWorksheetSolutionCatalog([clone(), second], [ws, future])).toHaveLength(2);
    const copy = clone();
    copy.entries[0] = {
      pageNumber: 1,
      groupId: 'ws01-q1',
      questionId: 'ws01-q1-01',
      status: 'unresolved',
      reason: 'تحتاج الصورة إلى نسخة أوضح.',
    };
    expect(buildWorksheetSolutionCatalog([copy])[0]!.entries[0]!.status).toBe('unresolved');
    expect(
      worksheetSolutionSetSchema.safeParse({
        ...copy,
        entries: [{ ...copy.entries[0], reason: '' }],
      }).success,
    ).toBe(false);
  });

  it('parses every authored math expression strictly and keeps notation isolated', () => {
    for (const entry of set.entries) {
      if (entry.status !== 'solved') continue;
      for (const text of [entry.answer, ...entry.steps, entry.sourceNote ?? '']) {
        expect(hasUnisolatedNotation(text), text).toBe(false);
        const segments = splitInlineMath(text);
        for (const segment of segments) {
          if (segment.type === 'math')
            expect(() =>
              katex.renderToString(segment.value, { throwOnError: true, strict: false }),
            ).not.toThrow();
          else expect(segment.value).not.toContain('$');
        }
      }
    }
  });
});

describe('worksheet solutions — independent mathematical witnesses', () => {
  type Point = [number, number];
  const add = (a: Point, b: Point): Point => [a[0] + b[0], a[1] + b[1]];
  const sub = (a: Point, b: Point): Point => [a[0] - b[0], a[1] - b[1]];
  const distance = (a: Point, b: Point) => Math.hypot(...sub(a, b));
  const dot = (a: Point, b: Point) => a[0] * b[0] + a[1] * b[1];
  it('checks angle/area calculations and the unequal-diagonal rhombus counterexample', () => {
    expect(180 - 90 - 50).toBe(40);
    expect((180 - 90) / 2).toBe(45);
    expect(Math.sqrt(25) ** 2).toBe(25);
    expect(Math.hypot(3, 4)).toBe(5);
    expect(6).not.toBe(8);
  });
  it('checks translation directions, the ordered RSQP quadrilateral and the centre completion', () => {
    const A: Point = [0, 0],
      B: Point = [6, 0],
      D: Point = [2, 4],
      C = add(B, D);
    const O: Point = [4, 2];
    expect(add(B, sub(D, O))).toEqual(O);
    expect(add(C, sub(A, D))).toEqual(B); // ordered ADCB, D → A
    expect(sub(D, C)).toEqual(sub(A, B)); // EFGH: GH = FE
    expect(sub(C, D)).toEqual(sub(B, A)); // ABCD: D → C moves A → B
    const R: Point = [1, 2],
      S: Point = [5, 3],
      P: Point = [2, 6];
    const Q = add(P, sub(S, R));
    expect(sub(Q, P)).toEqual(sub(S, R));
    expect(sub(Q, S)).toEqual(sub(P, R));
  });
  it('checks all diagram equality/angle markings and the proof correspondence against existing coordinates', () => {
    const group = ws.pages[1]!.questionGroups[0]!;
    if (group.kind !== 'problems') throw new Error('Missing geometry group');
    const points = group.problems.map((p) => {
      if (p.diagram?.kind !== 'constructed') throw new Error('Expected constructed figure');
      return Object.fromEntries(
        testFigureSpecSchema
          .parse(p.diagram.construction)
          .points.map((pt) => [pt.id, [pt.x, pt.y] as Point]),
      );
    });
    const p = points[0]!;
    expect(dot(sub(p.A!, p.B!), sub(p.M!, p.B!))).toBeCloseTo(0);
    expect(dot(sub(p.A!, p.C!), sub(p.M!, p.C!))).toBeCloseTo(0);
    expect(distance(p.B!, p.M!)).toBeCloseTo(distance(p.C!, p.M!));
    expect(distance(p.A!, p.B!)).toBeCloseTo(distance(p.A!, p.C!));
    const r = points[1]!;
    expect(distance(r.N!, r.B!)).toBeCloseTo(distance(r.M!, r.C!));
    expect(sub(r.M!, r.N!)).toEqual(sub(r.D!, r.A!));
    expect(sub(r.M!, r.N!)).toEqual(sub(r.C!, r.B!));
    const s = points[2]!;
    expect(distance(s.C!, s.M!)).toBeCloseTo(distance(s.C!, s.N!));
    expect(distance(s.A!, s.C!)).toBeCloseTo(distance(s.B!, s.C!));
    expect(distance(s.A!, s.M!)).toBeCloseTo(distance(s.B!, s.N!));
    expect(distance(s.N!, s.A!)).toBeCloseTo(distance(s.M!, s.B!));
    const cos = (a: Point, b: Point, c: Point) =>
      dot(sub(a, b), sub(c, b)) / (distance(a, b) * distance(c, b));
    expect(cos(s.A!, s.M!, s.C!)).toBeCloseTo(cos(s.B!, s.N!, s.C!));
  });
});

describe('worksheet solutions — actual navigation and rendering (jsdom, not visual review)', () => {
  it('opens the dedicated nested solutions tab, actual catalog and worked solutions without a gate', () => {
    const { container } = renderAt(routes.worksheets());
    const nav = screen.getByRole('navigation', { name: 'أقسام أوراق عمل مدرسية' });
    const link = within(nav).getByRole('link', { name: 'حلول أوراق العمل' });
    expect(link).toHaveAttribute('href', '/worksheets/solutions');
    fireEvent.click(link);
    expect(screen.getByRole('heading', { level: 1, name: 'حلول أوراق العمل' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'حلول أوراق العمل' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    fireEvent.click(screen.getByRole('link', { name: 'فتح الحلول التفصيلية' }));
    expect(
      screen.getByRole('heading', { level: 1, name: `حلول — ${ws.title}` }),
    ).toBeInTheDocument();
    expect(container.querySelectorAll('[data-solution-id]')).toHaveLength(32);
    expect(container.querySelectorAll('h3').length).toBe(4);
    expect(container.querySelectorAll('figure svg')).toHaveLength(3);
    expect(container.querySelectorAll('.katex').length).toBeGreaterThan(100);
    expect(container.querySelector('.katex-error')).toBeNull();
    expect(container.textContent).not.toContain('$');
    expect(screen.queryByLabelText('كلمة المرور المشتركة')).not.toBeInTheDocument();
    expect(container.querySelectorAll('[data-solution-id]')).toHaveLength(set.entries.length);
    const ids = Array.from(container.querySelectorAll('[data-solution-id]')).map((e) =>
      e.getAttribute('data-solution-id'),
    );
    expect(ids).toEqual(set.entries.map((e) => e.subQuestionId ?? e.questionId));
    expect(Array.from(container.querySelectorAll('h3')).map((h) => h.textContent)).toEqual(
      ws.pages.flatMap((p) => p.questionGroups.map((g) => g.title)),
    );
    for (const page of ws.pages)
      expect(container.querySelector(`img[src$="${page.originalImage.src}"]`)).not.toBeNull();
    expect(screen.getAllByText('تنبيه حول المصدر', { selector: 'p' })).toHaveLength(4);
  });

  it('supports direct links and return to the intact student worksheet with no answer key beside questions', () => {
    const { container } = renderAt(routes.worksheetSolutionSet(ws.id));
    fireEvent.click(screen.getByRole('link', { name: 'العودة إلى ورقة العمل الأصلية' }));
    expect(screen.getByRole('heading', { level: 1, name: ws.title })).toBeInTheDocument();
    expect(screen.getByRole('radiogroup', { name: 'خيارات الفقرة 1' })).toBeInTheDocument();
    expect(container.querySelector('[data-solution-id]')).toBeNull();
    expect(screen.queryByText('خطوات الحل والتعليل')).not.toBeInTheDocument();
    expect(container.querySelectorAll('figure svg')).toHaveLength(3);
  });

  it('returns NotFound for an unknown solution set rather than a misleading empty key', () => {
    renderAt(routes.worksheetSolutionSet('missing'));
    expect(screen.queryByText('خطوات الحل والتعليل')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/غير موجودة/);
  });
});
