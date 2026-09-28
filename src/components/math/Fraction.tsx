import { LtrIsolate } from './LtrIsolate';
import styles from './Fraction.module.css';

interface FractionProps {
  numerator: string;
  denominator: string;
  /** Optional whole-number part for mixed numbers. */
  whole?: string;
}

/**
 * A semantic, CSS-rendered fraction for simple cases where pulling in a full
 * LaTeX expression is unnecessary. Always LTR-isolated.
 *
 * For anything beyond a plain a/b (or a mixed number), use <Math latex="\frac{}{}" />.
 */
export function Fraction({ numerator, denominator, whole }: FractionProps) {
  return (
    <LtrIsolate className={styles.wrapper}>
      {whole ? <span className={styles.whole}>{whole}</span> : null}
      <span className={styles.fraction} role="math" aria-label={`${numerator} على ${denominator}`}>
        <span className={styles.numerator}>{numerator}</span>
        <span className={styles.bar} aria-hidden="true" />
        <span className={styles.denominator}>{denominator}</span>
      </span>
    </LtrIsolate>
  );
}
