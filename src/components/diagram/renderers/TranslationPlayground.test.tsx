import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { interactiveDiagramSchema } from '@/content/schema';
import { TranslationPlayground } from './TranslationPlayground';

/**
 * The playground makes a mathematical claim on screen ("this is a
 * parallelogram" / "these points are collinear"), so the claim itself is
 * tested: it is decided by an exact integer cross product, never by a
 * tolerance or by how the drawing looks.
 */
function build(params: Record<string, unknown>) {
  return interactiveDiagramSchema.parse({
    kind: 'interactive',
    origin: 'authored',
    id: 'auth-test-playground',
    renderer: 'translation-playground',
    alt: 'شبكة تفاعلية مع النقطة $M$',
    params,
  });
}

describe('TranslationPlayground', () => {
  it('reports the general case while M is off the line (AB)', () => {
    render(
      <TranslationPlayground
        spec={build({ cols: 10, rows: 7, a: [2, 2], b: [6, 3], start: [3, 5] })}
      />,
    );
    expect(screen.getByRole('status').textContent).toContain('الحالة العامة');
  });

  it('switches to the special case exactly when M reaches the line', async () => {
    const user = userEvent.setup();
    render(
      // v = (4, 1); the lattice point (6, 3) is B itself, which lies on (AB).
      <TranslationPlayground
        spec={build({ cols: 10, rows: 6, a: [2, 2], b: [6, 3], start: [2, 3] })}
      />,
    );
    expect(screen.getByRole('status').textContent).toContain('الحالة العامة');

    const handle = screen.getByRole('slider');
    handle.focus();
    // (2,3) → (2,2) = A, which is on the line by definition.
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('status').textContent).toContain('الحالة الخاصة');
  });

  it('moves M with the arrow keys and keeps it on the lattice', async () => {
    const user = userEvent.setup();
    render(
      <TranslationPlayground
        spec={build({ cols: 10, rows: 7, a: [2, 2], b: [6, 3], start: [3, 5] })}
      />,
    );
    const handle = screen.getByRole('slider');
    handle.focus();
    await user.keyboard('{ArrowRight}');
    expect(handle.getAttribute('aria-valuetext')).toBe('M عند العمود 4 والسطر 5');
    await user.keyboard('{ArrowDown}');
    expect(handle.getAttribute('aria-valuetext')).toBe('M عند العمود 4 والسطر 4');
  });

  it('never lets M leave the sheet, so the image stays drawable', async () => {
    const user = userEvent.setup();
    render(
      <TranslationPlayground
        spec={build({ cols: 6, rows: 4, a: [1, 1], b: [3, 2], start: [0, 0] })}
      />,
    );
    const handle = screen.getByRole('slider');
    handle.focus();
    await user.keyboard('{ArrowLeft}{ArrowLeft}{ArrowDown}{ArrowDown}');
    expect(handle.getAttribute('aria-valuetext')).toBe('M عند العمود 0 والسطر 0');
  });

  it('strips $…$ delimiters from the accessible description', () => {
    const { container } = render(
      <TranslationPlayground
        spec={build({ cols: 8, rows: 6, a: [1, 1], b: [3, 2], start: [2, 4] })}
      />,
    );
    expect(container.querySelector('svg')!.getAttribute('aria-label')).toBe(
      'شبكة تفاعلية مع النقطة M',
    );
  });
});
