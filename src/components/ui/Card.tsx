import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

interface CardProps {
  title: string;
  description?: string;
  to?: string;
  meta?: ReactNode;
  badge?: ReactNode;
}

export function Card({ title, description, to, meta, badge }: CardProps) {
  const body = (
    <>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {badge}
      </div>
      {description ? <p className={styles.description}>{description}</p> : null}
      {meta ? <div className={styles.meta}>{meta}</div> : null}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`${styles.card} ${styles.interactive}`}>
        {body}
      </Link>
    );
  }
  return <div className={styles.card}>{body}</div>;
}
