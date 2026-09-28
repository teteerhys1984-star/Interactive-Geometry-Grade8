import type { ReactNode } from 'react';
import styles from './Callout.module.css';

export type CalloutVariant =
  'definition' | 'theorem' | 'note' | 'warning' | 'example' | 'hint' | 'activity';

/** Default Arabic headings. `hint` mirrors the source's 💡 marginal notes. */
const defaultTitles: Record<CalloutVariant, string> = {
  definition: 'تعريف',
  theorem: 'نظرية',
  note: 'ملاحظة',
  warning: 'تنبيه',
  example: 'مثال',
  hint: 'إرشاد',
  activity: 'نشاط',
};

const icons: Record<CalloutVariant, string> = {
  definition: '✦',
  theorem: '▣',
  note: '❯',
  warning: '!',
  example: '✎',
  hint: '💡',
  activity: '✂',
};

interface CalloutProps {
  variant: CalloutVariant;
  title?: string;
  children: ReactNode;
}

export function Callout({ variant, title, children }: CalloutProps) {
  return (
    <aside className={`${styles.callout} ${styles[variant]}`}>
      <p className={styles.title}>
        <span className={styles.icon} aria-hidden="true">
          {icons[variant]}
        </span>
        {title ?? defaultTitles[variant]}
      </p>
      <div className={styles.body}>{children}</div>
    </aside>
  );
}
