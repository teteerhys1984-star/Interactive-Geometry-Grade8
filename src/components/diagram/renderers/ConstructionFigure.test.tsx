import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { interactiveDiagramSchema } from '@/content/schema';
import { ConstructionFigure } from './ConstructionFigure';

function build(params: Record<string, unknown>) {
  return interactiveDiagramSchema.parse({
    kind: 'interactive',
    origin: 'authored',
    id: 'auth-test-construction',
    renderer: 'construction-figure',
    alt: 'إنشاء هندسي فيه النقطة $M$',
    params,
  });
}

const ELEMENTS = [
  { kind: 'segment', from: [0, 0], to: [4, 1], step: 0 },
  { kind: 'point', at: [0, 0], label: 'G', step: 0 },
  { kind: 'circle', center: [1, 1], radius: 2, step: 1 },
  { kind: 'point', at: [4, 2], label: "M'", tone: 'image', step: 2 },
];

describe('ConstructionFigure', () => {
  it('reveals elements step by step instead of showing a finished picture', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <ConstructionFigure
        spec={build({
          elements: ELEMENTS,
          steps: ['المعطيات', 'الدائرة الأولى', 'النقطة المطلوبة'],
        })}
      />,
    );

    expect(container.querySelectorAll('circle')).toHaveLength(1); // the point G only
    expect(screen.getByText('المعطيات')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'الخطوة التالية' }));
    expect(container.querySelectorAll('circle')).toHaveLength(2); // + the drawn circle

    await user.click(screen.getByRole('button', { name: 'الخطوة التالية' }));
    expect(container.querySelectorAll('circle')).toHaveLength(3);
    expect(screen.getByRole('button', { name: 'الخطوة التالية' })).toBeDisabled();
  });

  it('can go back and reset', async () => {
    const user = userEvent.setup();
    render(
      <ConstructionFigure
        spec={build({ elements: ELEMENTS, steps: ['واحد', 'اثنان', 'ثلاثة'] })}
      />,
    );
    expect(screen.getByRole('button', { name: 'الخطوة السابقة' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'الخطوة التالية' }));
    await user.click(screen.getByRole('button', { name: 'الخطوة السابقة' }));
    expect(screen.getByText('واحد')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'إعادة' })).toBeDisabled();
  });

  it('shows everything at once when no steps are declared', () => {
    const { container } = render(<ConstructionFigure spec={build({ elements: ELEMENTS })} />);
    expect(container.querySelectorAll('circle')).toHaveLength(3);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('renders nothing rather than guessing when there is no geometry', () => {
    const { container } = render(<ConstructionFigure spec={build({ elements: [] })} />);
    expect(container.querySelector('svg')).toBeNull();
  });
});
