import { describe, expect, it } from 'vitest';
import {
  LRI,
  PDI,
  hasUnisolatedNotation,
  isolateLtr,
  plainText,
  splitInlineMath,
  stripIsolates,
} from './bidi';

describe('isolateLtr', () => {
  it('wraps text in LRI…PDI control characters', () => {
    expect(isolateLtr('AB = 5')).toBe(`${LRI}AB = 5${PDI}`);
  });

  it('round-trips with stripIsolates', () => {
    expect(stripIsolates(isolateLtr('∠ABC'))).toBe('∠ABC');
  });
});

describe('splitInlineMath', () => {
  it('returns a single text segment when there is no math', () => {
    expect(splitInlineMath('المثلث متساوي الساقين')).toEqual([
      { type: 'text', value: 'المثلث متساوي الساقين' },
    ]);
  });

  it('extracts inline math runs in order', () => {
    expect(splitInlineMath('طول $AB$ يساوي $5$ سم')).toEqual([
      { type: 'text', value: 'طول ' },
      { type: 'math', value: 'AB' },
      { type: 'text', value: ' يساوي ' },
      { type: 'math', value: '5' },
      { type: 'text', value: ' سم' },
    ]);
  });

  it('handles math at the very start and end', () => {
    expect(splitInlineMath('$x$')).toEqual([{ type: 'math', value: 'x' }]);
  });
});

describe('hasUnisolatedNotation', () => {
  it('flags bare geometric symbols in Arabic prose', () => {
    expect(hasUnisolatedNotation('قياس الزاوية ∠ABC كبير')).toBe(true);
  });

  it('accepts notation wrapped in $…$ delimiters', () => {
    expect(hasUnisolatedNotation('قياس الزاوية $\\angle ABC$ كبير')).toBe(false);
  });

  it('accepts notation wrapped in Unicode isolates', () => {
    expect(hasUnisolatedNotation(`قياس ${isolateLtr('∠ABC')} كبير')`)).toBe(false);
  });

  it('accepts plain Arabic prose', () => {
    expect(hasUnisolatedNotation('المثلث شكل هندسي له ثلاثة أضلاع')).toBe(false);
  });
});

describe('enclosed numerals inside Arabic prose', () => {
  it('splits circled numerals into their own isolated segment', () => {
    expect(splitInlineMath('الحجر ① والحجر ②')).toEqual([
      { type: 'text', value: 'الحجر ' },
      { type: 'circled', value: '①' },
      { type: 'text', value: ' والحجر ' },
      { type: 'circled', value: '②' },
    ]);
  });

  it('keeps circled numerals alongside inline maths', () => {
    const segments = splitInlineMath('انسحاب ينقل $A$ إلى $B$ للحجر ⑦');
    expect(segments.map((s) => s.type)).toEqual([
      'text',
      'math',
      'text',
      'math',
      'text',
      'circled',
    ]);
  });
});

describe('plainText', () => {
  it('strips $…$ delimiters for use in alt attributes', () => {
    expect(plainText('طول الضلع $AB$ يساوي $5$ سم')).toBe('طول الضلع AB يساوي 5 سم');
  });
});
