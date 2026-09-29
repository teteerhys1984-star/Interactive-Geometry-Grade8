import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { interactiveDiagramSchema } from '@/content/schema';
import { CongruenceCasesLab } from './CongruenceCasesLab';

const spec = interactiveDiagramSchema.parse({
  kind: 'interactive',
  origin: 'authored',
  id: 'auth-test-congruence-lab',
  renderer: 'congruence-cases-lab',
  alt: 'مختبر حالات التطابق',
  params: {},
});

const parsePolygon = (node: Element) =>
  node
    .getAttribute('points')!
    .split(' ')
    .map((pair) => pair.split(',').map(Number) as [number, number]);

describe('CongruenceCasesLab', () => {
  it('draws two exactly congruent triangles (a strict translate)', () => {
    const { container } = render(<CongruenceCasesLab spec={spec} />);
    const [first, second] = [...container.querySelectorAll('svg polygon')].map(parsePolygon);
    expect(first).toHaveLength(3);
    const dx = second![0]![0] - first![0]![0];
    for (const [index, point] of first!.entries()) {
      expect(second![index]![0] - point[0]).toBeCloseTo(dx, 6);
      expect(second![index]![1] - point[1]).toBeCloseTo(0, 6);
    }
  });

  it('switches between the three printed congruence cases', async () => {
    const user = userEvent.setup();
    render(<CongruenceCasesLab spec={spec} />);
    expect(screen.getByRole('button', { name: 'ضلعان والزاوية المحصورة' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await user.click(screen.getByRole('button', { name: 'الأضلاع الثلاثة' }));
    expect(screen.getByRole('button', { name: 'الأضلاع الثلاثة' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByLabelText(/الضلع الثالث/)).toBeInTheDocument();
  });

  it('recomputes the derived elements when a given changes (SAS: law of cosines)', () => {
    const { container } = render(<CongruenceCasesLab spec={spec} />);
    // Defaults: b = 3, c = 4, angle A = 50°.
    fireEvent.change(screen.getByLabelText(/الزاوية المحصورة/), { target: { value: '90' } });
    // With a right angle the third side is exactly 5 (3-4-5 triangle).
    expect(container.textContent).toContain('5, 3, 4');
  });

  it('keeps the SSS givens inside the triangle inequality', () => {
    const { container } = render(<CongruenceCasesLab spec={spec} />);
    fireEvent.click(screen.getByRole('button', { name: 'الأضلاع الثلاثة' }));
    fireEvent.change(screen.getByLabelText(/الضلع الأول/), { target: { value: '2.5' } });
    fireEvent.change(screen.getByLabelText(/الضلع الثاني/), { target: { value: '2.5' } });
    fireEvent.change(screen.getByLabelText(/الضلع الثالث/), { target: { value: '6' } });
    // c is clamped to a + b − 0.5 = 4.5, so the drawn triangle stays real.
    const [first] = [...container.querySelectorAll('svg polygon')].map(parsePolygon);
    const [A, B, C] = first!;
    const area =
      Math.abs((B![0] - A![0]) * (C![1] - A![1]) - (C![0] - A![0]) * (B![1] - A![1])) / 2;
    expect(area).toBeGreaterThan(0.05);
  });
});
