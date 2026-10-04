import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { App } from '@/app/App';
import { clearTestSession } from '@/tests/session';

function renderAt(route: string) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );
}

describe('Test Area UI and workflow', () => {
  beforeEach(() => {
    clearTestSession('lesson-01-test');
    clearTestSession('lesson-02-test');
  });

  it('renders the Test Area homepage at /tests', () => {
    renderAt('/tests');
    expect(screen.getByRole('heading', { level: 1, name: 'منطقة الاختبارات' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'اختبارات الدروس' })).toBeInTheDocument();
    expect(screen.getByText('اختبار الدرس الأول — الانسحاب وخواصه')).toBeInTheDocument();
  });

  it('renders the Solutions Area index at /tests/solutions', () => {
    renderAt('/tests/solutions');
    expect(screen.getByRole('heading', { level: 1, name: /حلول الاختبارات/ })).toBeInTheDocument();
    expect(screen.getByText('اختبار الدرس الأول — الانسحاب وخواصه')).toBeInTheDocument();
  });

  it('renders Lesson 1 solutions view at /tests/solutions/lesson-01-test', async () => {
    renderAt('/tests/solutions/lesson-01-test');
    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent(
      /حلول اختبار الدرس الأول/,
    );
    expect(await screen.findByText('السؤال 1')).toBeInTheDocument();
    expect(screen.getAllByText('الإجابة الصحيحة:').length).toBeGreaterThan(0);
  });

  it('renders the same audited question figure in the corresponding solutions prompt', async () => {
    const user = userEvent.setup();
    renderAt('/tests/solutions/lesson-02-test');
    expect(await screen.findByText('السؤال 1')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /6–10/ }));
    expect(
      await screen.findByRole('img', { name: /دائرتان إنشائيتان مركزاهما/ }),
    ).toBeInTheDocument();
  });

  it('shows a question figure in the active runner without exposing its solution', async () => {
    const user = userEvent.setup();
    renderAt('/tests/lesson-02-test');
    await user.click(screen.getByText('بدء الاختبار الآن'));
    await user.click(screen.getByRole('button', { name: 'السؤال 8' }));

    expect(screen.getByRole('img', { name: /دائرتان إنشائيتان مركزاهما/ })).toBeInTheDocument();
    expect(screen.queryByText('الإجابة الصحيحة:')).toBeNull();
    expect(screen.queryByText('التعليل وخطوات الحل:')).toBeNull();
  });

  it('active test runner never shows correct/incorrect feedback or solutions before submit', async () => {
    const user = userEvent.setup();
    renderAt('/tests/lesson-01-test');

    // Intro screen
    expect(screen.getByText('بدء الاختبار الآن')).toBeInTheDocument();
    await user.click(screen.getByText('بدء الاختبار الآن'));

    // Question 1 screen
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    // Verify no feedback badges exist
    expect(screen.queryByText('إجابة صحيحة')).toBeNull();
    expect(screen.queryByText('إجابة خاطئة')).toBeNull();
    expect(screen.queryByText('الإجابة الصحيحة:')).toBeNull();
    expect(screen.queryByText('التعليل وخطوات الحل:')).toBeNull();

    // Pick an option
    const radio = screen.getByLabelText(/أن كل نقطة من الشكل تنتقل بالمسافة نفسها/);
    await user.click(radio);

    // Still no feedback
    expect(screen.queryByText('إجابة صحيحة')).toBeNull();
    expect(screen.queryByText('إجابة خاطئة')).toBeNull();
  });
});
