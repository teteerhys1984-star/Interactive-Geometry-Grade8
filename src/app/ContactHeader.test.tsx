import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { allLessons } from '@/content/registry';
import { routes } from '@/lib/routes';
import { App } from './App';

const contactName =
  'التواصل مع المهندس سومر شاهين عبر WhatsApp على الرقم 0930215022 (يفتح في علامة تبويب جديدة)';

function renderAt(route: string) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );
}

describe('shared contact header', () => {
  it.each([
    routes.home(),
    routes.lesson(allLessons[0]!.lesson.id),
    routes.tests(),
    routes.teacher(),
  ])('renders exactly once, above navigation and outside content at %s', (route) => {
    renderAt(route);
    const header = screen.getByRole('navigation', { name: 'التنقل الرئيسي' }).closest('header')!;
    const name = within(header).getByText('المهندس سومر شاهين:');
    const link = within(header).getByRole('link', { name: contactName });
    const contact = header.firstElementChild;

    expect(contact).toContainElement(name);
    expect(contact).toContainElement(link);
    expect(contact).toHaveTextContent('المهندس سومر شاهين: 0930215022');
    expect(contact).toHaveAttribute('dir', 'rtl');
    expect(contact).not.toContainElement(
      screen.getByRole('navigation', { name: 'التنقل الرئيسي' }),
    );
    expect(screen.getAllByRole('link', { name: contactName })).toHaveLength(1);
    expect(screen.getByRole('main')).not.toContainElement(link);
    expect(name.closest('a')).toBeNull();
  });

  it('uses the direct international WhatsApp URL and safe new-tab attributes', () => {
    renderAt(routes.home());
    const link = screen.getByRole('link', { name: contactName });
    expect(link).toHaveAttribute('href', 'https://wa.me/963930215022');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveTextContent(/^0930215022$/);
    // Uses the existing [dir="ltr"] bidi isolation, without hidden control characters.
    expect(link).toHaveAttribute('dir', 'ltr');
    expect(within(link).getByText('0930215022').textContent).toBe('0930215022');
    expect(link.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(link.querySelector('svg')).toHaveAttribute('focusable', 'false');
  });

  it('is keyboard reachable immediately after the skip link', async () => {
    const user = userEvent.setup();
    renderAt(routes.home());
    await user.tab();
    expect(screen.getByRole('link', { name: 'تخطّي إلى المحتوى' })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('link', { name: contactName })).toHaveFocus();
  });
});
