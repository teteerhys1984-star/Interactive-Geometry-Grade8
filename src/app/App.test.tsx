import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';
import { allLessons, referenceFigures, subject } from '@/content/registry';
import { loadProgress } from '@/lib/progress';

function renderAt(route: string) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );
}

const lesson = allLessons[0]!.lesson;
const unit = allLessons[0]!.unit;
const lastLesson = allLessons[allLessons.length - 1]!.lesson;

/**
 * Renders at `route` and, when the Teacher Area gate is up, unlocks it with
 * the real passphrase. No-ops on routes that are not gated or when the
 * session is already unlocked.
 */
async function renderUnlocked(route: string) {
  const user = userEvent.setup();
  const view = renderAt(route);
  const input = screen.queryByLabelText('كلمة المرور المشتركة');
  if (input) {
    await user.type(input, 'somer173');
    await user.click(screen.getByRole('button', { name: 'دخول' }));
  }
  return { user, ...view };
}

describe('routing', () => {
  it('renders the home page with the course title', () => {
    renderAt('/');
    expect(screen.getAllByText(subject.title).length).toBeGreaterThan(0);
  });

  it('renders the subject page listing the authored unit', () => {
    renderAt(`/subject/${subject.id}`);
    expect(screen.getAllByText(unit.title).length).toBeGreaterThan(0);
  });

  it('renders the unit page listing Lesson 1', () => {
    renderAt(`/unit/${unit.id}`);
    expect(screen.getAllByText(lesson.title).length).toBeGreaterThan(0);
  });

  it('renders the lesson outline with every step', () => {
    renderAt(`/lesson/${lesson.id}`);
    expect(screen.getByText('مخطّط الدرس')).toBeInTheDocument();
    for (const step of lesson.steps) {
      expect(screen.getAllByText(step.title).length).toBeGreaterThan(0);
    }
  });

  it('renders a lesson step', () => {
    renderAt(`/lesson/${lesson.id}/step/1`);
    expect(screen.getAllByText(lesson.steps[0]!.title).length).toBeGreaterThan(0);
  });

  it('renders the completion page', () => {
    renderAt(`/lesson/${lesson.id}/done`);
    expect(screen.getByText('أحسنت! أكملت الدرس')).toBeInTheDocument();
  });

  it('renders the teacher area behind a passphrase gate', () => {
    renderAt('/teacher');
    expect(screen.getByLabelText('كلمة المرور المشتركة')).toBeInTheDocument();
    expect(screen.getByText('تنبيه أمني مهم')).toBeInTheDocument();
  });

  it('shows not-found for an unknown route', () => {
    renderAt('/this-route-does-not-exist');
    expect(screen.getByText('لم نعثر على هذه الصفحة')).toBeInTheDocument();
  });

  it('shows not-found for a lesson that has not been authored (unit exercises)', () => {
    renderAt('/lesson/unit-01-exercises-and-problems');
    expect(screen.getByText('لم نعثر على هذه الصفحة')).toBeInTheDocument();
  });

  it('shows not-found for a step beyond the end of the lesson', () => {
    renderAt(`/lesson/${lesson.id}/step/${lesson.steps.length + 1}`);
    expect(screen.getByText('لم نعثر على هذه الصفحة')).toBeInTheDocument();
  });

  it('shows not-found for an assessment that does not exist', () => {
    renderAt('/assessment/final');
    expect(screen.getByText('لم نعثر على هذه الصفحة')).toBeInTheDocument();
  });
});

describe('step-by-step navigation', () => {
  it('links the first step back to the lesson outline and forward to step 2', () => {
    renderAt(`/lesson/${lesson.id}/step/1`);
    const nav = screen.getByRole('navigation', { name: 'التنقّل بين الخطوات' });
    expect(within(nav).getByText('مخطّط الدرس')).toBeInTheDocument();
    expect(within(nav).getByText(lesson.steps[1]!.title)).toBeInTheDocument();
  });

  it('offers the final assessment as the next action on the final step', () => {
    renderAt(`/lesson/${lesson.id}/step/${lesson.steps.length}`);
    const nav = screen.getByRole('navigation', { name: 'التنقّل بين الخطوات' });
    expect(within(nav).getByText('الاختبار النهائي')).toBeInTheDocument();
  });

  it('walks forward through every step via Next', async () => {
    const user = userEvent.setup();
    renderAt(`/lesson/${lesson.id}/step/1`);

    for (let step = 1; step < lesson.steps.length; step += 1) {
      const nav = screen.getByRole('navigation', { name: 'التنقّل بين الخطوات' });
      await user.click(within(nav).getByText(lesson.steps[step]!.title));
      expect(screen.getAllByText(lesson.steps[step]!.title).length).toBeGreaterThan(0);
    }
  });

  it('reports progress as "n / total" for the current step', () => {
    renderAt(`/lesson/${lesson.id}/step/3`);
    const bar = screen.getByRole('progressbar', { name: 'خطوات الدرس' });
    expect(bar.getAttribute('aria-valuenow')).toBe(
      String(Math.round((3 / lesson.steps.length) * 100)),
    );
  });

  it('redirects a non-numeric step to step 1', () => {
    renderAt(`/lesson/${lesson.id}/step/abc`);
    expect(screen.getAllByText(lesson.steps[0]!.title).length).toBeGreaterThan(0);
  });

  it('shows the lesson outline sidebar with all step titles', () => {
    renderAt(`/lesson/${lesson.id}/step/1`);
    const sidebar = screen.getByRole('navigation', { name: 'مخطّط الدرس' });
    for (const step of lesson.steps) {
      expect(within(sidebar).getByText(step.title)).toBeInTheDocument();
    }
  });
});

describe('progress and completion', () => {
  it('records a step as viewed in localStorage', () => {
    renderAt(`/lesson/${lesson.id}/step/2`);
    expect(loadProgress().lessons[lesson.id]?.completedStepIds).toContain(lesson.steps[1]!.id);
  });

  it('marks the lesson completed on the completion screen', () => {
    renderAt(`/lesson/${lesson.id}/done`);
    expect(loadProgress().lessons[lesson.id]?.completed).toBe(true);
  });

  it('tells the learner this is the last available lesson', () => {
    renderAt(`/lesson/${lastLesson.id}/done`);
    expect(screen.getByText(/هذا آخر درس متاح حالياً/, { exact: false })).toBeInTheDocument();
  });
});

describe('reference figures in the rendered lesson', () => {
  it('shows the faithful placeholder with its textbook page', () => {
    // Step 1 is now the authored introduction; the first textbook step is 2.
    const stepIndex = lesson.steps.findIndex((step) => step.origin === 'source') + 1;
    renderAt(`/lesson/${lesson.id}/step/${stepIndex}`);
    expect(screen.getByText('يوجد رسم هنا — راجع الكتاب')).toBeInTheDocument();
    expect(screen.getAllByText('5').length).toBeGreaterThan(0);
  });

  it('never renders the unregistered-renderer defect notice', () => {
    for (let step = 1; step <= lesson.steps.length; step += 1) {
      const { unmount } = renderAt(`/lesson/${lesson.id}/step/${step}`);
      expect(screen.queryByText('الرسم غير متاح بعد')).toBeNull();
      unmount();
    }
  });

  it('exposes all reference figures to the teacher area, reported per lesson', async () => {
    expect(referenceFigures.length).toBeGreaterThan(0);
    const lessonIds = [...new Set(referenceFigures.map((figure) => figure.lesson.id))];
    for (const lessonId of lessonIds) {
      const { user, container, unmount } = await renderUnlocked(`/teacher/${lessonId}`);
      await user.click(screen.getByRole('tab', { name: 'تقرير الأشكال' }));
      const panel = container.querySelector('#teacher-panel-figures') as HTMLElement;
      const expected = referenceFigures.filter((figure) => figure.lesson.id === lessonId).length;
      expect(within(panel).getAllByRole('listitem')).toHaveLength(expected);
      unmount();
    }
  });
});

describe('instructor credit', () => {
  it('displays the instructor name and phone exactly as supplied', () => {
    renderAt('/');
    expect(screen.getByText('المهندس سومر شاهين')).toBeInTheDocument();
    const phone = screen.getByText('0930215022');
    expect(phone).toBeInTheDocument();
    // Digits must be LTR-isolated inside the Arabic footer.
    expect(phone).toHaveAttribute('dir', 'ltr');
  });
});

/**
 * ============================================================================
 *  PHASE 5 — authored teaching, final assessment, teacher resources
 * ============================================================================
 */

const assessment = lesson.assessment!;

describe('authored teaching material', () => {
  it('badges every authored step as platform-written, not textbook text', () => {
    for (const [index, step] of lesson.steps.entries()) {
      if (step.origin !== 'authored') continue;
      const { unmount } = renderAt(`/lesson/${lesson.id}/step/${index + 1}`);
      expect(screen.getAllByText('شرح المنصّة').length).toBeGreaterThan(0);
      unmount();
    }
  });

  it('renders authored constructed diagrams as real SVG, not placeholders', () => {
    const index = lesson.steps.findIndex((step) => step.id === 'teach-01-what-is-a-translation');
    const { container } = renderAt(`/lesson/${lesson.id}/step/${index + 1}`);
    expect(container.querySelector('svg[role="img"]')).not.toBeNull();
    expect(screen.queryByText('يوجد رسم هنا — راجع الكتاب')).toBeNull();
  });

  it('renders the notation with KaTeX rather than raw dollar delimiters', () => {
    const index = lesson.steps.findIndex(
      (step) => step.id === 'teach-04-why-properties-are-preserved',
    );
    const { container } = renderAt(`/lesson/${lesson.id}/step/${index + 1}`);
    expect(container.querySelectorAll('.katex').length).toBeGreaterThan(0);
    expect(container.textContent).not.toContain('$');
  });

  it('keeps every KaTeX span LTR-isolated inside the RTL page', () => {
    const index = lesson.steps.findIndex((step) => step.id === 'teach-07-recap-before-assessment');
    const { container } = renderAt(`/lesson/${lesson.id}/step/${index + 1}`);
    const maths = container.querySelectorAll('.katex');
    expect(maths.length).toBeGreaterThan(0);
    for (const node of maths) {
      // Either the node or an ancestor must force LTR.
      const isolated = node.closest('[dir="ltr"]');
      expect(isolated, `un-isolated maths: ${node.textContent}`).not.toBeNull();
    }
  });

  it('progressive-reveal cards hide their content until opened', async () => {
    const user = userEvent.setup();
    const index = lesson.steps.findIndex((step) => step.id === 'teach-01-what-is-a-translation');
    const { container } = renderAt(`/lesson/${lesson.id}/step/${index + 1}`);

    const toggle = screen.getByRole('button', { name: /فكّر أولاً، ثم اكشف الإجابة/ });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(container.textContent).not.toContain('لكن الاتجاه معاكس');

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(container.textContent).toContain('لكن الاتجاه معاكس');
  });
});

describe('final assessment', () => {
  it('shows the instructions and question count before starting', () => {
    renderAt(`/assessment/${assessment.id}`);
    expect(screen.getAllByText(assessment.title).length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: 'ابدأ الاختبار' })).toBeInTheDocument();
  });

  it('presents exactly one question at a time with a progress indicator', async () => {
    const user = userEvent.setup();
    renderAt(`/assessment/${assessment.id}`);
    await user.click(screen.getByRole('button', { name: 'ابدأ الاختبار' }));

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'التنقّل بين الأسئلة' })).toBeInTheDocument();
    // The second question's prompt must not be on screen yet.
    expect(screen.queryByText(/انسحاب ينقل النقطة \$A\$/)).toBeNull();
  });

  it('never leaks a teacher explanation to the student UI', async () => {
    const user = userEvent.setup();
    const { container } = renderAt(`/assessment/${assessment.id}`);
    await user.click(screen.getByRole('button', { name: 'ابدأ الاختبار' }));
    expect(container.textContent).not.toContain('خطأ شائع');
    expect(container.textContent).not.toContain('الإجابة الصحيحة');
  });

  it('grades a fully correct run as 100% and reports it', async () => {
    const user = userEvent.setup();
    renderAt(`/assessment/${assessment.id}`);
    await user.click(screen.getByRole('button', { name: 'ابدأ الاختبار' }));

    for (const question of assessment.questions) {
      if (question.type === 'multiple-choice') {
        const index = question.choices.findIndex((c) => c.id === question.correctChoiceId);
        await user.click(screen.getAllByRole('radio')[index]!);
      } else if (question.type === 'true-false') {
        await user.click(screen.getByRole('radio', { name: question.answer ? 'صح' : 'خطأ' }));
      } else {
        await user.type(screen.getByRole('spinbutton'), String(question.answer));
      }
      const nav = screen.getByRole('navigation', { name: 'التنقّل بين الأسئلة' });
      const last = question.id === assessment.questions.at(-1)!.id;
      await user.click(within(nav).getByText(last ? 'إنهاء وتسليم' : 'السؤال التالي'));
    }

    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText('أحسنت — لقد نجحت في الاختبار')).toBeInTheDocument();
    expect(screen.getByText(/الحلول التفصيلية متاحة للمعلّم فقط/)).toBeInTheDocument();
  });

  it('shows per-question marks but no explanations on the result screen', async () => {
    const user = userEvent.setup();
    const { container } = renderAt(`/assessment/${assessment.id}`);
    await user.click(screen.getByRole('button', { name: 'ابدأ الاختبار' }));

    // Jump to the last question and submit without answering anything.
    const dots = screen.getByRole('list', { name: 'الانتقال إلى سؤال' });
    await user.click(within(dots).getByRole('button', { name: 'السؤال 10' }));
    const nav = screen.getByRole('navigation', { name: 'التنقّل بين الأسئلة' });
    await user.click(within(nav).getByText('إنهاء وتسليم'));

    expect(screen.getByText('0%')).toBeInTheDocument();
    expect(container.textContent).toContain('لم تُجب');
    expect(container.textContent).not.toContain('خطأ شائع');
  });
});

/**
 * ============================================================================
 *  TEACHER AREA — organised by lesson
 * ============================================================================
 *
 *  The teacher area is two pages deep:
 *    /teacher            → lesson picker (no teacher-only content on it)
 *    /teacher/:lessonId  → one lesson's four sections, navigable as tabs
 *
 *  Both routes sit behind the same passphrase gate.
 * ============================================================================
 */

describe('teacher area — passphrase gate', () => {
  it('rejects a wrong passphrase and shows no teacher material', async () => {
    const user = userEvent.setup();
    const { container } = renderAt('/teacher');
    await user.type(screen.getByLabelText('كلمة المرور المشتركة'), 'wrong-pass');
    await user.click(screen.getByRole('button', { name: 'دخول' }));
    expect(screen.getByRole('alert')).toHaveTextContent('كلمة المرور غير صحيحة.');
    expect(container.textContent).not.toContain('فتح منطقة المعلم');
    expect(container.textContent).not.toContain('حلول المعلم');
  });

  it('rejects a wrong passphrase on the per-lesson page too', async () => {
    const user = userEvent.setup();
    const { container } = renderAt(`/teacher/${lesson.id}`);
    await user.type(screen.getByLabelText('كلمة المرور المشتركة'), 'wrong-pass');
    await user.click(screen.getByRole('button', { name: 'دخول' }));
    expect(screen.getByRole('alert')).toHaveTextContent('كلمة المرور غير صحيحة.');
    expect(screen.queryByRole('tab')).toBeNull();
    expect(container.textContent).not.toContain('الإجابة الصحيحة');
  });

  it('lets no teacher content into the DOM before authentication', () => {
    const { container } = renderAt(`/teacher/${lesson.id}`);
    expect(screen.getByLabelText('كلمة المرور المشتركة')).toBeInTheDocument();
    expect(screen.queryByRole('tab')).toBeNull();
    for (const solution of lesson.teacherResources?.textbookSolutions ?? []) {
      expect(container.textContent).not.toContain(solution.reference);
    }
    expect(container.textContent).not.toContain('الإجابة الصحيحة');
    expect(container.textContent).not.toContain('حلول المعلم (مستنتجة من المنصّة)');
  });

  it('keeps the static-site security disclaimer visible on the gate', () => {
    renderAt('/teacher');
    expect(screen.getByText('تنبيه أمني مهم')).toBeInTheDocument();
  });
});

describe('teacher area — lesson picker', () => {
  it('shows a «فتح منطقة المعلم» button for every authored lesson', async () => {
    await renderUnlocked('/teacher');
    expect(screen.getAllByRole('link', { name: 'فتح منطقة المعلم' })).toHaveLength(
      allLessons.length,
    );
    for (const { lesson: item, unit: itemUnit } of allLessons) {
      expect(screen.getAllByText(item.title).length).toBeGreaterThan(0);
      expect(screen.getAllByText(itemUnit.title).length).toBeGreaterThan(0);
    }
  });

  it('keeps solutions and answer keys one level down, off the picker page', async () => {
    const { container } = await renderUnlocked('/teacher');
    expect(screen.queryByRole('tab')).toBeNull();
    expect(container.textContent).not.toContain('حلول المعلم (مستنتجة من المنصّة)');
    expect(container.textContent).not.toContain('الإجابة الصحيحة');
  });

  it('opens each lesson’s teacher area from its card button — and back', async () => {
    const { user } = await renderUnlocked('/teacher');
    for (let index = 0; index < allLessons.length; index += 1) {
      const buttons = screen.getAllByRole('link', { name: 'فتح منطقة المعلم' });
      await user.click(buttons[index]!);
      expect(screen.getByRole('tablist', { name: 'أقسام منطقة المعلّم' })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'حلول أسئلة الكتاب' })).toHaveAttribute(
        'aria-selected',
        'true',
      );
      await user.click(screen.getByRole('link', { name: /كل الدروس/ }));
      expect(screen.getAllByRole('link', { name: 'فتح منطقة المعلم' })).toHaveLength(
        allLessons.length,
      );
    }
  });

  it('locks the area again from the picker', async () => {
    const { user } = await renderUnlocked('/teacher');
    await user.click(screen.getByRole('button', { name: 'قفل المنطقة' }));
    expect(screen.getByLabelText('كلمة المرور المشتركة')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'فتح منطقة المعلم' })).toBeNull();
  });
});

describe('teacher area — per-lesson sections', () => {
  const tabLabels = [
    'حلول أسئلة الكتاب',
    'مفتاح الاختبار النهائي',
    'تقرير الأشكال',
    'الملاحظات التربوية',
  ];

  it('exposes the four sections as tabs for every authored lesson', async () => {
    for (const { lesson: item } of allLessons) {
      const { unmount } = await renderUnlocked(`/teacher/${item.id}`);
      for (const label of tabLabels) {
        expect(screen.getByRole('tab', { name: label })).toBeInTheDocument();
      }
      unmount();
    }
  });

  it('labels every textbook solution as teacher-derived, never as printed answers', async () => {
    for (const { lesson: item } of allLessons) {
      const solutions = item.teacherResources?.textbookSolutions ?? [];
      const { container, unmount } = await renderUnlocked(`/teacher/${item.id}`);
      expect(screen.queryAllByText('حلول المعلم (مستنتجة من المنصّة)')).toHaveLength(
        solutions.length,
      );
      expect(container.textContent).toContain('لا تتضمّن إجابات مطبوعة');
      for (const solution of solutions) {
        // .trim(): one source reference carries a trailing space; the DOM
        // normaliser drops it, the string matcher would not.
        expect(screen.getAllByText(solution.reference.trim()).length).toBeGreaterThan(0);
      }
      unmount();
    }
  }, 15_000);

  it('flags every solution that depends on an unreadable figure', async () => {
    for (const { lesson: item } of allLessons) {
      const flagged = (item.teacherResources?.textbookSolutions ?? []).filter(
        (solution) => solution.limitation,
      );
      const { unmount } = await renderUnlocked(`/teacher/${item.id}`);
      expect(screen.queryAllByText('حدود هذا الحل')).toHaveLength(flagged.length);
      unmount();
    }
  });

  it('exposes the full answer key with explanations under its own tab', async () => {
    for (const { lesson: item } of allLessons) {
      const assessment = item.assessment!;
      const { user, container, unmount } = await renderUnlocked(`/teacher/${item.id}`);
      const panel = container.querySelector('#teacher-panel-assessment');
      expect(panel).toHaveAttribute('hidden');
      await user.click(screen.getByRole('tab', { name: 'مفتاح الاختبار النهائي' }));
      expect(panel).not.toHaveAttribute('hidden');
      expect(container.querySelector('#teacher-panel-solutions')).toHaveAttribute('hidden');
      // One disclosure per question, and the key is present.
      // (Explanations themselves may open with «الإجابة الصحيحة:» too, so the
      // sentence count is a lower bound, not an exact count.)
      expect(container.querySelectorAll('#teacher-panel-assessment details')).toHaveLength(
        assessment.questions.length,
      );
      expect(screen.getAllByText(/الإجابة الصحيحة:/).length).toBeGreaterThanOrEqual(
        assessment.questions.length,
      );
      expect(container.textContent).toContain('خطأ شائع');
      unmount();
    }
  });

  it('shows each lesson’s pedagogical notes under their own tab', async () => {
    const noteTitles: [string, string][] = [
      [allLessons[0]!.lesson.id, 'الحلول المرتبطة بأشكال غير مقروءة'],
      [allLessons[1]!.lesson.id, 'الشبكتان المُعاد رسمهما، والأشكال التي بقيت مرجعية'],
    ];
    for (const [lessonId, noteTitle] of noteTitles) {
      const { user, container, unmount } = await renderUnlocked(`/teacher/${lessonId}`);
      await user.click(screen.getByRole('tab', { name: 'الملاحظات التربوية' }));
      expect(container.querySelector('#teacher-panel-notes')).not.toHaveAttribute('hidden');
      expect(screen.getAllByText(noteTitle).length).toBeGreaterThan(0);
      unmount();
    }
  });

  it('never mixes one lesson’s teacher material into another’s', async () => {
    const firstRef = allLessons[0]!.lesson.teacherResources!.textbookSolutions[0]!.reference;
    const secondRef = allLessons[1]!.lesson.teacherResources!.textbookSolutions[0]!.reference;

    const first = await renderUnlocked(`/teacher/${allLessons[0]!.lesson.id}`);
    expect(first.container.textContent).toContain(firstRef);
    expect(first.container.textContent).not.toContain(secondRef);
    first.unmount();

    const second = await renderUnlocked(`/teacher/${allLessons[1]!.lesson.id}`);
    expect(second.container.textContent).toContain(secondRef);
    expect(second.container.textContent).not.toContain(firstRef);
    second.unmount();
  });

  it('locks the area again from the lesson page', async () => {
    const { user } = await renderUnlocked(`/teacher/${lesson.id}`);
    await user.click(screen.getByRole('button', { name: 'قفل المنطقة' }));
    expect(screen.getByLabelText('كلمة المرور المشتركة')).toBeInTheDocument();
    expect(screen.queryByRole('tab')).toBeNull();
  });
});

describe('teacher area — unknown lesson', () => {
  it('shows not-found for a lesson that does not exist, gate or no gate', async () => {
    // Locked session: the not-found page is not teacher content.
    const locked = renderAt('/teacher/lesson-99-no-such-lesson');
    expect(screen.getByText('لم نعثر على هذه الصفحة')).toBeInTheDocument();
    expect(screen.queryByLabelText('كلمة المرور المشتركة')).toBeNull();
    locked.unmount();

    // Unlocked session: still not-found, never an empty tab panel.
    const unlocked = await renderUnlocked(`/teacher/${lesson.id}`);
    unlocked.unmount();
    renderAt('/teacher/lesson-99-no-such-lesson');
    expect(screen.getByText('لم نعثر على هذه الصفحة')).toBeInTheDocument();
    expect(screen.queryByRole('tab')).toBeNull();
  });
});
