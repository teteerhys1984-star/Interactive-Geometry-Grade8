import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { interactiveDiagramSchema } from '@/content/schema';
import { ShapeTranslationLab } from './ShapeTranslationLab';

const spec = interactiveDiagramSchema.parse({
  kind: 'interactive',
  origin: 'authored',
  id: 'auth-test-shape-lab',
  renderer: 'shape-translation-lab',
  alt: 'مختبر صورة شكل وفق انسحاب',
  params: {},
});

describe('ShapeTranslationLab', () => {
  it('switches between geometric shape types', async () => {
    const user = userEvent.setup();
    const { container } = render(<ShapeTranslationLab spec={spec} />);
    expect(screen.getByRole('button', { name: 'مثلث' })).toHaveAttribute('aria-pressed', 'true');
    await user.click(screen.getByRole('button', { name: 'دائرة' }));
    expect(screen.getByRole('button', { name: 'دائرة' })).toHaveAttribute('aria-pressed', 'true');
    expect(container.querySelectorAll('svg circle').length).toBeGreaterThanOrEqual(4);
  });

  it('reveals the construction progressively', async () => {
    const user = userEvent.setup();
    const { container } = render(<ShapeTranslationLab spec={spec} />);
    await user.click(screen.getByRole('button', { name: /الشكل الأصلي/ }));
    expect(container.textContent).not.toContain('A′');
    await user.click(screen.getByRole('button', { name: /الصورة الكاملة/ }));
    expect(container.textContent).toContain('A′');
  });

  it('updates the exact vector readout when a slider moves', () => {
    render(<ShapeTranslationLab spec={spec} />);
    const horizontal = screen.getByLabelText(/الحركة الأفقية/);
    fireEvent.change(horizontal, { target: { value: '4' } });
    expect(screen.getByRole('status').textContent).toContain('(4, 1)');
  });
});
