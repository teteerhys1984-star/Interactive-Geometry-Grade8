import { Fragment } from 'react';
import { splitInlineMath } from '@/lib/bidi';
import { LtrIsolate } from './LtrIsolate';
import { Math } from './Math';

interface RichTextProps {
  /** Arabic text which may contain inline maths wrapped in `$…$` delimiters. */
  text: string;
}

/**
 * Renders Arabic prose, converting every `$…$` run into an isolated <Math>
 * element and isolating enclosed numerals (①②③) structurally.
 *
 * This is how authors embed notation safely: they write plain Arabic and
 * delimit maths, and BIDI isolation is applied mechanically.
 */
export function RichText({ text }: RichTextProps) {
  const segments = splitInlineMath(text);
  return (
    <>
      {segments.map((segment, index) => {
        if (segment.type === 'math') return <Math key={index} latex={segment.value} />;
        if (segment.type === 'circled') {
          return <LtrIsolate key={index}>{segment.value}</LtrIsolate>;
        }
        return <Fragment key={index}>{segment.value}</Fragment>;
      })}
    </>
  );
}
