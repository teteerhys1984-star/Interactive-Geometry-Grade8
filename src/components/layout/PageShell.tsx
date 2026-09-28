import type { ReactNode } from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import type { Crumb } from './Breadcrumbs';
import styles from './PageShell.module.css';

interface PageShellProps {
  title: string;
  lead?: string;
  crumbs?: Crumb[];
  actions?: ReactNode;
  children: ReactNode;
  /** Narrow reading column — used for lesson steps. */
  narrow?: boolean;
}

export function PageShell({ title, lead, crumbs, actions, children, narrow }: PageShellProps) {
  return (
    <div className={narrow ? `${styles.page} ${styles.narrow}` : styles.page}>
      {crumbs ? <Breadcrumbs items={crumbs} /> : null}
      <div className={styles.heading}>
        <div>
          <h1 className={styles.title}>{title}</h1>
          {lead ? <p className={styles.lead}>{lead}</p> : null}
        </div>
        {actions ? <div className={styles.actions}>{actions}</div> : null}
      </div>
      {children}
    </div>
  );
}
