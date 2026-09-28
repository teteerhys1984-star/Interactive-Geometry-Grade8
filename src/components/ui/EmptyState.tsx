import type { ReactNode } from 'react';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

/**
 * Shown wherever content does not exist yet. The foundation ships with an
 * empty course, so this is a first-class state rather than an edge case.
 */
export function EmptyState({ title, description, children }: EmptyStateProps) {
  return (
    <div className={styles.wrapper} role="status">
      <h2 className={styles.title}>{title}</h2>
      {description ? <p className={styles.description}>{description}</p> : null}
      {children}
    </div>
  );
}
