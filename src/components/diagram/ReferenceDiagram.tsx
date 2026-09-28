import type { ReferenceDiagram as ReferenceDiagramSpec } from '@/content/schema';
import { RichText } from '@/components/math';
import styles from './ReferenceDiagram.module.css';

/**
 * FAITHFUL PLACEHOLDER — «يوجد رسم هنا — راجع الكتاب»
 *
 * Shown when a textbook figure cannot be reproduced faithfully and no approved
 * source image exists. It is a deliberate editorial outcome, not unfinished
 * work, so it is styled as an integrated part of the lesson rather than as a
 * warning. It always names the textbook page so the student knows where to look.
 */
export function ReferenceDiagram({ spec }: { spec: ReferenceDiagramSpec }) {
  return (
    <figure className={styles.figure}>
      <div className={styles.card}>
        <span className={styles.icon} aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H10a2 2 0 0 1 2 2v13a1.5 1.5 0 0 0-1.5-1.5H5.5A1.5 1.5 0 0 1 4 16V5.5Z" />
            <path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H14a2 2 0 0 0-2 2v13a1.5 1.5 0 0 1 1.5-1.5h5A1.5 1.5 0 0 0 20 16V5.5Z" />
          </svg>
        </span>

        <p className={styles.headline}>يوجد رسم هنا — راجع الكتاب</p>

        <p className={styles.page}>
          الصفحة{' '}
          <span className={styles.pageNumber} dir="ltr">
            {String(spec.source.page)}
          </span>
          {spec.source.locator ? (
            <span className={styles.locator}>{spec.source.locator}</span>
          ) : null}
        </p>

        <p className={styles.description}>
          <RichText text={spec.alt} />
        </p>
      </div>
      {spec.caption ? <figcaption className={styles.caption}>{spec.caption}</figcaption> : null}
    </figure>
  );
}
