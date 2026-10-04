import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import type { ConstructedDiagram } from '@/content/schema';
import { stripIsolates } from '@/lib/bidi';
import { Diagram } from '../Diagram';
import { __resetRegistry, registerConstructedRenderer } from '../registry';
import styles from './TestGeometryFigure.module.css';
import { TestGeometryFigure } from './TestGeometryFigure';
import { TEST_FIGURE_RENDERER } from './testFigureSpec';

const diagram: ConstructedDiagram = {
  kind: 'constructed',
  origin: 'authored',
  id: 'test-responsive-triangle',
  alt: 'مثلث ABC مع المعطى $AB=5$.',
  renderer: TEST_FIGURE_RENDERER,
  construction: {
    points: [
      { id: 'A', x: 0, y: 0 },
      { id: 'B', x: 4, y: 0 },
      { id: 'C', x: 0, y: 3 },
    ],
    segments: [
      { from: 'A', to: 'B' },
      { from: 'A', to: 'C' },
      { from: 'B', to: 'C' },
    ],
    rightAngles: [{ at: 'A', from: 'B', to: 'C' }],
    annotations: [{ x: 2, y: 0.4, text: '5' }],
    questionLabels: ['A', 'B', 'C'],
  },
};

beforeEach(() => {
  __resetRegistry();
  registerConstructedRenderer(TEST_FIGURE_RENDERER, TestGeometryFigure);
});

afterEach(() => __resetRegistry());

describe('TestGeometryFigure rendering and mobile controls', () => {
  it('renders an accessible, direction-isolated SVG with a responsive viewBox', () => {
    render(<Diagram spec={diagram} />);
    const svg = screen.getByRole('img', { name: /مثلث/ });

    expect(svg.tagName.toLowerCase()).toBe('svg');
    expect(svg).toHaveAttribute('preserveAspectRatio', 'xMidYMid meet');
    expect(svg.style.direction).toBe('ltr');
    expect(svg.style.unicodeBidi).toBe('isolate');
    expect(stripIsolates(svg.getAttribute('aria-label') ?? '')).toBe('مثلث ABC مع المعطى AB=5.');
    expect(styles.svg).toBeDefined();
    expect(styles.viewport).toBeDefined();
    if (styles.svg) expect(svg).toHaveClass(styles.svg);
    if (styles.viewport) expect(svg.parentElement).toHaveClass(styles.viewport);

    const text = svg.querySelector('text');
    expect(text).not.toBeNull();
    expect(text).toHaveAttribute('direction', 'ltr');
    expect(text).toHaveAttribute('unicode-bidi', 'isolate');

    const viewportBox = svg.getAttribute('viewBox')?.split(/\s+/).map(Number) ?? [];
    expect(viewportBox).toHaveLength(4);
    expect(viewportBox.every(Number.isFinite)).toBe(true);
  });

  it('offers keyboard-accessible zoom and an overflow viewport for narrow screens', () => {
    render(<Diagram spec={diagram} />);
    const svg = screen.getByRole('img', { name: /مثلث/ });
    const viewport = svg.parentElement;
    const zoomButton = screen.getByRole('button', { name: 'تكبير الرسم' });

    expect(viewport).toHaveAttribute('id', zoomButton.getAttribute('aria-controls'));
    expect(zoomButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(zoomButton);
    expect(screen.getByRole('button', { name: 'إعادة الحجم الأصلي' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(svg.getAttribute('class')).toContain('svgZoomed');

    fireEvent.click(screen.getByRole('button', { name: 'إعادة الحجم الأصلي' }));
    expect(screen.getByRole('button', { name: 'تكبير الرسم' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });
});
