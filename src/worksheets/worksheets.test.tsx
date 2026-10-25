import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from '@/app/App';
import { testFigureSpecSchema } from '@/components/diagram/renderers/testFigureSpec';
import { hasUnisolatedNotation } from '@/lib/bidi';
import { routes } from '@/lib/routes';
import {
  buildWorksheetCatalog,
  countWorksheetItems,
  countWorksheetQuestionGroups,
  getSchoolWorksheet,
  schoolWorksheets,
} from './registry';
import { unit01Worksheet01 } from './definitions/unit-01-worksheet-01';

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe('School Worksheets («أوراق عمل مدرسية») — Data, Fidelity & Math Audit', () => {
  it('registers the Unit 1 geometry worksheet with accurate metadata from the source images', () => {
    expect(schoolWorksheets.length).toBeGreaterThanOrEqual(1);
    const ws = getSchoolWorksheet('unit-01-worksheet-01');
    expect(ws).toBeDefined();
    expect(ws?.title).toBe('ورقة عمل الوحدة الأولى هندسة');
    expect(ws?.gradeLabel).toBe('الصف الثامن');
    expect(ws?.institutionLabel).toBe('آفاق المستقبل');
    expect(ws?.pages).toHaveLength(2);
    expect(countWorksheetQuestionGroups(ws!)).toBe(4);
    expect(countWorksheetItems(ws!)).toBe(12 + 7 + 6 + 3);
  });

  it('supports adding future worksheets via buildWorksheetCatalog and rejects duplicate IDs', () => {
    const secondWorksheet = {
      ...unit01Worksheet01,
      id: 'unit-01-worksheet-02',
      title: 'ورقة عمل إضافية تجريبية',
    };
    const catalog = buildWorksheetCatalog([unit01Worksheet01, secondWorksheet]);
    expect(catalog).toHaveLength(2);

    expect(() => buildWorksheetCatalog([unit01Worksheet01, unit01Worksheet01])).toThrow(
      /Duplicate school worksheet id/,
    );
  });

  it('preserves the exact question order and item counts across Page 1 and Page 2', () => {
    const ws = getSchoolWorksheet('unit-01-worksheet-01')!;
    const page1 = ws.pages[0]!;
    const page2 = ws.pages[1]!;

    expect(page1.pageNumber).toBe(1);
    expect(page1.questionGroups.map((g) => g.title)).toEqual([
      'السؤال الأول : اختر الإجابة الصحيحة لكل مما يلي :',
      'السؤال الثاني : أجب بموافق أو غير موافق معللاً عدم موافقتك :',
      'السؤال الثالث : املأ الفراغات التالية بما يناسبها :',
    ]);

    const q1 = page1.questionGroups[0]!;
    expect(q1.kind).toBe('multiple-choice');
    if (q1.kind === 'multiple-choice') {
      expect(q1.items.map((item) => item.number)).toEqual([
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
      ]);
      for (const item of q1.items) {
        expect(item.options.map((o) => o.id)).toEqual(['A', 'B', 'C']);
      }
    }

    const q2 = page1.questionGroups[1]!;
    expect(q2.kind).toBe('agree-disagree');
    if (q2.kind === 'agree-disagree') {
      expect(q2.items.map((item) => item.label)).toEqual([
        '١)',
        '٢)',
        '٣)',
        '٤)',
        '٥)',
        '٦)',
        '٧)',
      ]);
    }

    const q3 = page1.questionGroups[2]!;
    expect(q3.kind).toBe('fill-blanks');
    if (q3.kind === 'fill-blanks') {
      expect(q3.items.map((item) => item.label)).toEqual(['١)', '٢)', '٣)', '٤)', '٥)', '٦)']);
    }

    expect(page2.pageNumber).toBe(2);
    expect(page2.footerNote).toBe('== انتهت الأسئلة ==');
    expect(page2.questionGroups).toHaveLength(1);
    const q4 = page2.questionGroups[0]!;
    expect(q4.title).toBe('السؤال الرابع : حل كل من المسائل الآتية :');
    expect(q4.kind).toBe('problems');
    if (q4.kind === 'problems') {
      expect(q4.problems.map((p) => p.title)).toEqual([
        'المسألة الأولى :',
        'المسألة الثانية :',
        'المسألة الثالثة :',
      ]);
      expect(q4.problems[0]!.subItems.map((s) => s.label)).toEqual(['١)', '٢)']);
      expect(q4.problems[1]!.subItems.map((s) => s.label)).toEqual(['١)', '٢)']);
      expect(q4.problems[2]!.subItems.map((s) => s.label)).toEqual(['١)', '٢)', '٣)']);
    }
  });

  it('isolates all mathematical and geometric notation in $…$ with zero unisolated notation leaks', () => {
    for (const ws of schoolWorksheets) {
      for (const note of ws.sourceNotes) {
        expect(hasUnisolatedNotation(note), `Unisolated notation in note: ${note}`).toBe(false);
      }
      for (const page of ws.pages) {
        for (const group of page.questionGroups) {
          if (group.kind === 'multiple-choice') {
            for (const item of group.items) {
              expect(
                hasUnisolatedNotation(item.prompt),
                `Unisolated notation in ${item.id} prompt: ${item.prompt}`,
              ).toBe(false);
              for (const opt of item.options) {
                expect(
                  hasUnisolatedNotation(opt.text),
                  `Unisolated notation in ${item.id} option ${opt.id}: ${opt.text}`,
                ).toBe(false);
              }
            }
          } else if (group.kind === 'agree-disagree' || group.kind === 'fill-blanks') {
            for (const item of group.items) {
              expect(
                hasUnisolatedNotation(item.text),
                `Unisolated notation in ${item.id}: ${item.text}`,
              ).toBe(false);
            }
          } else if (group.kind === 'problems') {
            for (const problem of group.problems) {
              expect(
                hasUnisolatedNotation(problem.stem),
                `Unisolated notation in ${problem.id} stem: ${problem.stem}`,
              ).toBe(false);
              for (const sub of problem.subItems) {
                expect(
                  hasUnisolatedNotation(sub.text),
                  `Unisolated notation in ${sub.id}: ${sub.text}`,
                ).toBe(false);
              }
            }
          }
        }
      }
    }
  });

  it('validates all Page 2 geometric diagrams against testFigureSpecSchema and verifies original image assets exist', () => {
    const ws = getSchoolWorksheet('unit-01-worksheet-01')!;
    for (const page of ws.pages) {
      const publicFile = resolve(process.cwd(), 'public', page.originalImage.src);
      expect(existsSync(publicFile), `Missing asset: ${publicFile}`).toBe(true);

      for (const group of page.questionGroups) {
        if (group.kind === 'problems') {
          for (const problem of group.problems) {
            expect(problem.diagram).toBeDefined();
            expect(problem.diagram?.kind).toBe('constructed');
            if (problem.diagram?.kind === 'constructed') {
              const parsed = testFigureSpecSchema.safeParse(problem.diagram.construction);
              expect(
                parsed.success,
                `Invalid figure spec for ${problem.id}: ${JSON.stringify(parsed.error?.issues)}`,
              ).toBe(true);
            }
          }
        }
      }
    }
  });
});

describe('School Worksheets («أوراق عمل مدرسية») — Navigation & UI Rendering', () => {
  it('exposes «أوراق عمل مدرسية» in top-level navigation and on the HomePage', () => {
    renderAt(routes.home());
    const nav = screen.getByRole('navigation', { name: 'التنقل الرئيسي' });
    expect(within(nav).getByRole('link', { name: 'أوراق عمل مدرسية' })).toHaveAttribute(
      'href',
      '/worksheets',
    );
    expect(screen.getByRole('heading', { name: 'أوراق عمل مدرسية' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'تصفّح أوراق العمل' })).toHaveAttribute(
      'href',
      '/worksheets',
    );
  });

  it('renders the WorksheetsPage catalog and navigates to the worksheet detail page', () => {
    renderAt(routes.worksheets());
    expect(
      screen.getByRole('heading', { level: 1, name: 'أوراق عمل مدرسية' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'ورقة عمل الوحدة الأولى هندسة' }),
    ).toBeInTheDocument();
    expect(screen.getByText('آفاق المستقبل')).toBeInTheDocument();

    const openLink = screen.getByRole('link', { name: 'فتح ورقة العمل' });
    fireEvent.click(openLink);

    expect(
      screen.getByRole('heading', { level: 1, name: 'ورقة عمل الوحدة الأولى هندسة' }),
    ).toBeInTheDocument();
  });

  it('renders both pages in order with KaTeX math, SVG diagrams, original scan viewer, and interactive student inputs', () => {
    const { container } = renderAt(routes.worksheet('unit-01-worksheet-01'));

    // Both pages and all 4 question group headings are present in order
    const h3s = Array.from(container.querySelectorAll('h3')).map((el) => el.textContent?.trim());
    expect(h3s).toEqual([
      'السؤال الأول : اختر الإجابة الصحيحة لكل مما يلي :',
      'السؤال الثاني : أجب بموافق أو غير موافق معللاً عدم موافقتك :',
      'السؤال الثالث : املأ الفراغات التالية بما يناسبها :',
      'السؤال الرابع : حل كل من المسائل الآتية :',
    ]);

    // KaTeX math is rendered and no raw '$' delimiters leak into visible text
    const katexNodes = container.querySelectorAll('.katex');
    expect(katexNodes.length).toBeGreaterThan(25);
    expect(container.textContent).not.toContain('$');

    // All 3 geometric problems on Page 2 render SVG figures
    const figures = container.querySelectorAll('figure svg');
    expect(figures.length).toBe(3);

    // Footer note on Page 2
    expect(screen.getByText('== انتهت الأسئلة ==')).toBeInTheDocument();

    // Student workspace interaction (selecting an option & resetting)
    const firstQuestionGroup = screen.getByRole('radiogroup', { name: 'خيارات الفقرة 1' });
    const optionA = within(firstQuestionGroup).getByRole('radio', { name: /مستطيل/ });
    expect(optionA).not.toBeChecked();
    fireEvent.click(optionA);
    expect(optionA).toBeChecked();

    const resetBtn = screen.getByRole('button', { name: 'مسح مدخلاتي' });
    fireEvent.click(resetBtn);
    expect(optionA).not.toBeChecked();

    // Toggling original page scan image
    const showScanBtn = screen.getByRole('button', { name: 'عرض الصورة الأصلية للصفحة 1' });
    fireEvent.click(showScanBtn);
    expect(
      screen.getByText('نسخة الصفحة الأولى الأصلية كما وردت في ورقة العمل المدرسية.'),
    ).toBeInTheDocument();
  });
});
