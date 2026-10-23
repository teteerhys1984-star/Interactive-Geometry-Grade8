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

  it('does not crash on malformed LaTeX and retains KaTeX’s visible error fallback', () => {
    const { container } = render(<Math latex="\\notacommand{" />);
    expect(container.querySelector('.katex-error')).not.toBeNull();
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

  it('renders powers, subscripts, angles, parentheses, overbars and geometry symbols', () => {
    const { container } = render(
      <RichText
        text={
          'الصيغ: $x^2$، $M_1$، $\\widehat{ABC}$، $(AB)$، $\\overline{AB}$، $\\overrightarrow{AB}$، و$\\parallel$.'
        }
      />,
    );

    expect(container.querySelectorAll('.katex')).toHaveLength(7);
    expect(container.querySelector('.katex-error')).toBeNull();
    expect(container.querySelector('msup')).not.toBeNull();
    expect(container.querySelector('msub')).not.toBeNull();
    expect(container.querySelectorAll('mover').length).toBeGreaterThanOrEqual(2);
    expect(container.querySelectorAll('[dir="ltr"]')).toHaveLength(7);
    expect(container.textContent).not.toContain('$');
  });

  it('preserves an intentional standalone dollar sign as ordinary text', () => {
    const { container } = render(<RichText text="السعر 5$، وليس جزءاً من صيغة رياضية." />);
    expect(container.textContent).toBe('السعر 5$، وليس جزءاً من صيغة رياضية.');
    expect(container.querySelector('.katex')).toBeNull();
  });

  it('keeps an unmatched delimiter visible as source text without breaking the page', () => {
    const { container } = render(<RichText text="صيغة غير مكتملة $x^2" />);
    expect(container.textContent).toBe('صيغة غير مكتملة $x^2');
    expect(container.querySelector('.katex')).toBeNull();
  });

  it('renders plain Arabic without any maths markup', () => {
    const { container } = render(<RichText text="المثلث له ثلاثة أضلاع" />);
    expect(container.querySelector('.katex')).toBeNull();
  });
});
