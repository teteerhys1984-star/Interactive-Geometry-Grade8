import { useMemo, useState } from 'react';
import type { InteractiveDiagram } from '@/content/schema';
import { RichText } from '@/components/math';
import styles from './HintLadder.module.css';

/**
 * ============================================================================
 *  HINT LADDER — «حاول أولاً → تلميح → تلميح أعمق → الحل الكامل»
 * ============================================================================
 *
 *  A strictly monotone reveal: the learner opens one rung at a time and never
 *  receives a verdict on their own thinking, so it cannot degrade into a
 *  guess-and-check game. The final rung is the platform's full reasoning; it
 *  is never in the DOM before the learner asks for it.
 * ============================================================================
 */

function readStrings(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string' && item.length > 0)
    : [];
}

export function HintLadder({ spec }: { spec: InteractiveDiagram }) {
  const hints = useMemo(() => readStrings(spec.params.hints), [spec.params.hints]);
  const solution = useMemo(() => readStrings(spec.params.solution), [spec.params.solution]);
  const rungs = hints.length + (solution.length > 0 ? 1 : 0);
  const [revealed, setRevealed] = useState(0);

  const nextLabel = () => {
    if (revealed === 0) return 'اكشف التلميح الأول';
    if (revealed < hints.length) return 'أحتاج تلميحاً أعمق';
    return 'اكشف مسار الحل كاملاً';
  };

  return (
    <section
      className={styles.ladder}
      aria-label={spec.alt.replace(/\$([^$]+)\$/g, '$1')}
      dir="rtl"
    >
      <header className={styles.header}>
        <p className={styles.eyebrow}>سلّم التلميحات</p>
        <h3 className={styles.title}>
          <RichText text={String(spec.params.title ?? 'حاول أولاً قبل أي تلميح')} />
        </h3>
      </header>

      <p className={styles.note}>
        اكتب محاولتك في دفترك أولاً. كل درجة تُفتح بطلبك وحدك، ولا يُقيَّم اختيارك هنا.
      </p>

      <ol className={styles.rungs}>
        {hints.map((hint, index) => (
          <li key={index} className={index < revealed ? styles.rungOpen : styles.rungClosed}>
            <span className={styles.rungLabel}>
              تلميح <span dir="ltr">{index + 1}</span>
            </span>
            {index < revealed ? (
              <p className={styles.rungText}>
                <RichText text={hint} />
              </p>
            ) : (
              <p className={styles.rungHidden} aria-hidden="true">
                مغلق — حاول أولاً
              </p>
            )}
          </li>
        ))}

        {solution.length > 0 ? (
          <li className={revealed > hints.length ? styles.solutionOpen : styles.solutionClosed}>
            <span className={styles.rungLabel}>مسار الحل</span>
            {revealed > hints.length ? (
              <ol className={styles.solution}>
                {solution.map((line, index) => (
                  <li key={index}>
                    <RichText text={line} />
                  </li>
                ))}
              </ol>
            ) : (
              <p className={styles.rungHidden} aria-hidden="true">
                مغلق — استعمل التلميحات أولاً
              </p>
            )}
          </li>
        ) : null}
      </ol>

      <footer className={styles.actions}>
        {revealed < rungs ? (
          <button type="button" onClick={() => setRevealed((value) => value + 1)}>
            {nextLabel()}
          </button>
        ) : (
          <button type="button" className={styles.secondary} onClick={() => setRevealed(0)}>
            أغلق التلميحات وحاول مرة أخرى
          </button>
        )}
      </footer>
    </section>
  );
}
