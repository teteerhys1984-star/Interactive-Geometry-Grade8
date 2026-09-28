import { Link } from 'react-router-dom';
import styles from './PrevNext.module.css';

export interface PrevNextTarget {
  label: string;
  to: string;
}

interface PrevNextProps {
  /** The logically PREVIOUS item (earlier in the curriculum). */
  previous?: PrevNextTarget;
  /** The logically NEXT item (later in the curriculum). */
  next?: PrevNextTarget;
}

/**
 * Previous / Next navigation.
 *
 * RTL note: "previous" is placed at the inline-start (visually the RIGHT in
 * Arabic) and "next" at the inline-end (visually the LEFT). This is handled by
 * flex order + logical properties, and the arrow glyphs point outward
 * accordingly, so the control reads naturally to an Arabic reader.
 */
export function PrevNext({ previous, next }: PrevNextProps) {
  if (!previous && !next) return null;
  return (
    <nav className={styles.nav} aria-label="التنقّل بين الخطوات">
      {previous ? (
        <Link to={previous.to} className={styles.previous} rel="prev">
          <span className={styles.arrow} aria-hidden="true">
            ›
          </span>
          <span className={styles.labels}>
            <span className={styles.kicker}>السابق</span>
            <span className={styles.label}>{previous.label}</span>
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link to={next.to} className={styles.next} rel="next">
          <span className={styles.labels}>
            <span className={styles.kicker}>التالي</span>
            <span className={styles.label}>{next.label}</span>
          </span>
          <span className={styles.arrow} aria-hidden="true">
            ‹
          </span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
