import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { interactiveDiagramSchema } from '@/content/schema';
import { CongruenceChallenges } from './CongruenceChallenges';

const spec = interactiveDiagramSchema.parse({
  kind: 'interactive',
  origin: 'authored',
  id: 'auth-test-congruence-challenges',
  renderer: 'congruence-challenges',
  alt: 'تحديات تطابق المثلثات',
  params: {},
});

describe('CongruenceChallenges', () => {
  it('draws every paired triangle as an exact translate of its partner', () => {
    const { container } = render(<CongruenceChallenges spec={spec} />);
    const polygons = [...container.querySelectorAll('svg polygon')];
    expect(polygons.length).toBe(6); // three challenges × two triangles
    const parse = (node: Element) =>
      node
        .getAttribute('points')!
        .split(' ')
        .map((pair) => pair.split(',').map(Number) as [number, number]);
    for (let index = 0; index < polygons.length; index += 2) {
      const source = parse(polygons[index]!);
      const pair = parse(polygons[index + 1]!);
      for (const [i, point] of source.entries()) {
        expect(pair[i]![0] - point[0]).toBeCloseTo(6.2, 6);
        expect(pair[i]![1] - point[1]).toBeCloseTo(0, 6);
      }
    }
  });

  it('does not reveal correctness after an individual click', async () => {
    const user = userEvent.setup();
    render(<CongruenceChallenges spec={spec} />);
    await user.click(screen.getByLabelText('ضلعان والزاوية المحصورة بينهما.'));
    expect(screen.queryByText('إجابة موفّقة.')).toBeNull();
    expect(screen.queryByText('تحتاج إلى مراجعة.')).toBeNull();
    expect(screen.getByRole('button', { name: 'تحقق من المجموعة' })).toBeDisabled();
  });

  it('grades all three answers only after group submission', async () => {
    const user = userEvent.setup();
    render(<CongruenceChallenges spec={spec} />);
    await user.click(screen.getByLabelText('ضلعان والزاوية المحصورة بينهما.'));
    await user.click(
      screen.getByLabelText('تساوي الزاوية المجاورة الأخرى للضلع نفسه مع مقابلتها.'),
    );
    await user.click(screen.getByLabelText('الزاوية المظللة غير محصورة بين الضلعين المعلومين.'));
    await user.click(screen.getByRole('button', { name: 'تحقق من المجموعة' }));
    expect(screen.getAllByText('إجابة موفّقة.')).toHaveLength(3);
    expect(screen.getByRole('status').textContent).toContain('3 من 3');
  });

  it('supports a clean retry after submission', async () => {
    const user = userEvent.setup();
    render(<CongruenceChallenges spec={spec} />);
    await user.click(screen.getByLabelText('الأضلاع الثلاثة.'));
    await user.click(screen.getByLabelText('تساوي الزاوية المقابلة للضلع مع مقابلتها.'));
    await user.click(screen.getByLabelText('لا يوجد خطأ؛ الاستنتاج سليم.'));
    await user.click(screen.getByRole('button', { name: 'تحقق من المجموعة' }));
    await user.click(screen.getByRole('button', { name: 'محاولة جديدة' }));
    expect(screen.getByRole('button', { name: 'تحقق من المجموعة' })).toBeDisabled();
    expect(screen.queryByText('تحتاج إلى مراجعة.')).toBeNull();
  });
});
