import type { ReactNode } from 'react';
import { RichText } from '@/components/math';
import styles from './FigureFrame.module.css';

interface FigureFrameProps {
  children: ReactNode;
  /** Arabic caption rendered under the figure. */
  caption?: string;
  /** Intrinsic width / height ratio; reserves space and prevents layout shift. */
  aspectRatio?: number;
}

/**
 * Responsive container shared by every diagram kind.
 *
 * Mobile-friendly from the beginning:
 *   - fluid width, never overflows the viewport,
 *   - aspect-ratio box reserves vertical space so nothing jumps while loading,
 *   - the figure body is LTR (diagrams are drawn LTR) while the caption stays
 *     in the document's Arabic RTL flow, with any `$…$` run inside it isolated
 *     structurally like every other piece of prose on the page.
 */
export function FigureFrame({ children, caption, aspectRatio }: FigureFrameProps) {
  return (
    <figure className={styles.figure}>
      <div
        className={styles.canvas}
        dir="ltr"
        style={aspectRatio ? { aspectRatio: String(aspectRatio) } : undefined}
      >
        {children}
      </div>
      {caption ? (
        <figcaption className={styles.caption}>
          <RichText text={caption} />
        </figcaption>
      ) : null}
    </figure>
  );
}
