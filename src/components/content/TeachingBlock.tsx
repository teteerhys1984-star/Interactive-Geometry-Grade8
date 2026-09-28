import { useState } from 'react';
import type { ReactNode } from 'react';
import styles from './TeachingBlock.module.css';

export type TeachingVariant = 'concept' | 'why' | 'example' | 'pitfall' | 'summary' | 'tip';

const variantLabels: Record<TeachingVariant, string> = {
  concept: 'فكرة',
  why: 'لماذا؟',
  example: 'مثال محلول',
  pitfall: 'خطأ شائع',
  summary: 'خلاصة',
  tip: 'إرشاد',
};

const variantIcons: Record<TeachingVariant, string> = {
  concept: '◆',
  why: '؟',
  example: '✎',
  pitfall: '⚠',
  summary: '≡',
  tip: '★',
};

interface TeachingBlockProps {
  variant: TeachingVariant;
  title: string;
  collapsible?: boolean;
  revealLabel?: string;
  children: ReactNode;
}

/**
 * Platform-authored teaching material.
 *
 * Deliberately and visibly distinct from verbatim textbook content: it carries
 * a «شرح المنصّة» badge so a student always knows which words come from the book
 * and which are our explanation.
 */
export function TeachingBlock({
  variant,
  title,
  collapsible = false,
  revealLabel,
  children,
}: TeachingBlockProps) {
  const [open, setOpen] = useState(false);

  return (
    <section className={`${styles.block} ${styles[variant]}`}>
      <header className={styles.header}>
        <span className={styles.icon} aria-hidden="true">
          {variantIcons[variant]}
        </span>
        <div className={styles.headings}>
          <p className={styles.kind}>{variantLabels[variant]}</p>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <span className={styles.badge}>شرح المنصّة</span>
      </header>

      {collapsible ? (
        <>
          <button
            type="button"
            className={styles.reveal}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? 'إخفاء الشرح' : (revealLabel ?? 'فكّر أولاً ثم اكشف الشرح')}
            <span className={open ? styles.chevronOpen : styles.chevron} aria-hidden="true">
              ⌄
            </span>
          </button>
          {open ? <div className={styles.body}>{children}</div> : null}
        </>
      ) : (
        <div className={styles.body}>{children}</div>
      )}
    </section>
  );
}
