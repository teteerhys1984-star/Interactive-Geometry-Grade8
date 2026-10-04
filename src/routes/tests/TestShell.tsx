import type { ReactNode } from 'react';
import { Breadcrumbs } from '@/components/layout';
import type { Crumb } from '@/components/layout/Breadcrumbs';
import styles from './TestShell.module.css';

interface TestShellProps {
  title: string;
  lead?: string;
  crumbs?: Crumb[];
  actions?: ReactNode;
  children: ReactNode;
  /** Limits the reading column for question and solution views. */
  narrow?: boolean;
  className?: string;
}

/**
 * Common layout shell for all screens in the Test Area:
 *   - /tests (Test Area Home)
 *   - /tests/:testId (Test Runner)
 *   - /tests/solutions (Solutions Area Home)
 *   - /tests/solutions/:testId (Worked Solutions)
 *
 * Keeps the platform's visual identity (breadcrumbs, font tokens, rtl isolation)
 * while framing the Test Area distinctly with subtle geometric background motifs.
 */
export function TestShell({
  title,
  lead,
  crumbs,
  actions,
  children,
  narrow = false,
  className,
}: TestShellProps) {
  return (
    <div className={`${styles.shell} ${narrow ? styles.narrow : ''} ${className ?? ''}`}>
      {crumbs ? <Breadcrumbs items={crumbs} /> : null}
      <header className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>{title}</h1>
          {lead ? <p className={styles.lead}>{lead}</p> : null}
        </div>
        {actions ? <div className={styles.actions}>{actions}</div> : null}
      </header>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
