import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import styles from './Breadcrumbs.module.css';

export interface Crumb {
  label: string;
  to?: string;
}

/**
 * Reflects the Home → Subject → Unit → Lesson hierarchy.
 * The separator is a logical "next" chevron that flips with RTL.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (items.length === 0) return null;
  return (
    <nav aria-label="مسار التنقّل" className={styles.nav}>
      <ol className={styles.list}>
        {items.map((item, index) => (
          <Fragment key={`${item.label}-${index}`}>
            <li className={styles.item}>
              {item.to ? (
                <Link to={item.to}>{item.label}</Link>
              ) : (
                <span aria-current="page">{item.label}</span>
              )}
            </li>
            {index < items.length - 1 ? (
              <li aria-hidden="true" className={styles.separator}>
                ‹
              </li>
            ) : null}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
