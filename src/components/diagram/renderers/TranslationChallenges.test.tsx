import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { interactiveDiagramSchema } from '@/content/schema';
import { TranslationChallenges } from './TranslationChallenges';

const spec = interactiveDiagramSchema.parse({
  kind: 'interactive',
  origin: 'authored',
  id: 'auth-test-challenges',
  renderer: 'translation-challenges',
  alt: 'تحديات صورة شكل',
  params: {},
});

describe('TranslationChallenges', () => {
  it('draws the correct candidate by one exact shared translation', () => {
    const { container } = render(<TranslationChallenges spec={spec} />);
    const polygons = container.querySelectorAll('svg polygon');
    const parse = (node: Element) =>
      node
        .getAttribute('points')!
        .split(' ')
        .map((pair) => pair.split(',').map(Number) as [number, number]);
    const source = parse(polygons[0]!);
    const correctCandidate = parse(polygons[2]!);
    for (const [index, point] of source.entries()) {
      expect(correctCandidate[index]![0] - point[0]).toBeCloseTo(4, 6);
      // SVG y is downward: one unit up is a difference of −1.
      expect(correctCandidate[index]![1] - point[1]).toBeCloseTo(-1, 6);
    }
  });

  it('does not reveal correctness after an individual click', async () => {
    const user = userEvent.setup();
    render(<TranslationChallenges spec={spec} />);
    await user.click(screen.getByLabelText('المثلث ①'));
    expect(screen.queryByText('إجابة موفّقة.')).toBeNull();
    expect(screen.queryByText('تحتاج إلى مراجعة.')).toBeNull();
    expect(screen.getByRole('button', { name: 'تحقق من المجموعة' })).toBeDisabled();
  });

  it('grades all three answers only after group submission', async () => {
    const user = userEvent.setup();
    render(<TranslationChallenges spec={spec} />);
    await user.click(screen.getByLabelText('المثلث ②'));
    await user.click(screen.getByLabelText('٣ يميناً و٢ أعلى'));
    await user.click(screen.getByLabelText('يجب أن تنتقل النقاط كلها بالحركة نفسها.'));
    await user.click(screen.getByRole('button', { name: 'تحقق من المجموعة' }));
    expect(screen.getAllByText('إجابة موفّقة.')).toHaveLength(3);
    expect(screen.getByRole('status').textContent).toContain('3 من 3');
  });

  it('supports a clean retry after submission', async () => {
    const user = userEvent.setup();
    render(<TranslationChallenges spec={spec} />);
    await user.click(screen.getByLabelText('المثلث ①'));
    await user.click(screen.getByLabelText('٣ يميناً و٢ أسفل'));
    await user.click(screen.getByLabelText('يجب تدوير الشكل بعد نقله.'));
    await user.click(screen.getByRole('button', { name: 'تحقق من المجموعة' }));
    await user.click(screen.getByRole('button', { name: 'محاولة جديدة' }));
    expect(screen.getByRole('button', { name: 'تحقق من المجموعة' })).toBeDisabled();
    expect(screen.queryByText('تحتاج إلى مراجعة.')).toBeNull();
  });
});
