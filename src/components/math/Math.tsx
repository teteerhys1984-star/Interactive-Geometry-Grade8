import { useMemo } from 'react';
import katex from 'katex';
import { LtrIsolate } from './LtrIsolate';
import styles from './Math.module.css';

interface MathProps {
  /** LaTeX source. */
  latex: string;
  /** Display (block, centred) vs inline rendering. */
  display?: boolean;
  /** Optional Arabic label rendered beside a display expression. */
  label?: string;
}

/**
 * The ONLY component allowed to render mathematics.
 *
 * KaTeX is wrapped rather than used directly so that:
 *   - every expression is automatically LTR-isolated,
 *   - a rendering failure degrades to readable source instead of crashing,
 *   - the engine can be swapped later without touching content or routes.
 *
 * Digit convention is deliberately NOT forced here. Arabic-Indic vs Latin
 * digits will follow the actual textbook once real lessons are supplied; the
 * decision is a single change in this file plus `styles/tokens.css`.
 */
export function Math({ latex, display = false, label }: MathProps) {
  const { html, failed } = useMemo(() => {
    try {
      return {
        html: katex.renderToString(latex, {
          displayMode: display,
          throwOnError: false,
          strict: false,
          output: 'htmlAndMathml',
        }),
        failed: false,
      };
    } catch {
      return { html: '', failed: true };
    }
  }, [latex, display]);

  if (failed) {
    return (
      <LtrIsolate className={styles.fallback}>
        <code>{latex}</code>
      </LtrIsolate>
    );
  }

  if (display) {
    return (
      <div className={styles.displayRow}>
        <LtrIsolate as="div" className={styles.display}>
          <span dangerouslySetInnerHTML={{ __html: html }} />
        </LtrIsolate>
        {label ? <span className={styles.label}>{label}</span> : null}
      </div>
    );
  }

  return (
    <LtrIsolate className={styles.inline}>
      <span dangerouslySetInnerHTML={{ __html: html }} />
    </LtrIsolate>
  );
}
