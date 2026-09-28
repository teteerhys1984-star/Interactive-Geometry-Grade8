import type { ElementType, ReactNode } from 'react';
import styles from './LtrIsolate.module.css';

interface LtrIsolateProps {
  children: ReactNode;
  /** Render as inline `span` (default) or another element such as `div`. */
  as?: ElementType;
  className?: string;
}

/**
 * The single structural primitive for embedding left-to-right notation inside
 * Arabic right-to-left prose.
 *
 * It sets `dir="ltr"` and `unicode-bidi: isolate`, which makes the wrapped run
 * an opaque neutral object to the surrounding bidi algorithm. The run orders
 * internally as LTR while keeping its correct position in the RTL sentence.
 *
 * ALL math, geometric notation, Latin point labels and measurements must go
 * through this component (directly, or via <Math> / <Fraction> which use it).
 */
export function LtrIsolate({ children, as: Component = 'span', className }: LtrIsolateProps) {
  return (
    <Component dir="ltr" className={className ? `${styles.isolate} ${className}` : styles.isolate}>
      {children}
    </Component>
  );
}
