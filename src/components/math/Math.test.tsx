import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Math } from './Math';
import { Fraction } from './Fraction';
import { LtrIsolate } from './LtrIsolate';
import { RichText } from './RichText';

describe('LTR/BIDI isolation', () => {
  it('marks isolated content with dir="ltr"', () => {
    render(<LtrIsolate>AB</LtrIsolate>);
    expect(screen.getByText('AB')).toHaveAttribute('dir', 'ltr');
  });

  it('renders inline maths inside an LTR-isolated element', () => {
    const { container } = render(<Math latex="a^2 + b^2 = c^2" />);
    const isolate = container.querySelector('[dir="ltr"]');
    expect(isolate).not.toBeNull();
    expect(container.querySelector('.katex')).not.toBeNull();
  });

  it('renders display maths with an optional Arabic label', () => {
    render(<Math latex="a^2 + b^2 = c^2" display label="قانون فيثاغورس" />);
    expect(screen.getByText('قانون فيثاغورس')).toBeInTheDocument();
  });

  it('does not throw on malformed LaTeX', () => {
    expect(() => render(<Math latex="\\frac{" />)).not.toThrow();
  });

  it('renders a semantic fraction with an Arabic aria-label', () => {
    render(<Fraction numerator="1" denominator="2" />);
    expect(screen.getByLabelText('1 على 2')).toBeInTheDocument();
  });
});

describe('RichText', () => {
  it('keeps Arabic prose as text and isolates $…$ maths', () => {
    const { container } = render(<RichText text="طول الضلع $AB$ يساوي خمسة" />);
    expect(container.textContent).toContain('طول الضلع');
    expect(container.querySelector('.katex')).not.toBeNull();
    expect(container.querySelector('[dir="ltr"]')).not.toBeNull();
  });

  it('renders plain Arabic without any maths markup', () => {
    const { container } = render(<RichText text="المثلث له ثلاثة أضلاع" />);
    expect(container.querySelector('.katex')).toBeNull();
  });
});
