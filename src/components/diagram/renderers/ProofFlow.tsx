import { useMemo } from 'react';
import type { InteractiveDiagram } from '@/content/schema';
import { RichText } from '@/components/math';
import styles from './ProofFlow.module.css';

/**
 * ============================================================================
 *  PROOF FLOW — reproduction of a printed deduction chart
 * ============================================================================
 *
 *  Question 23 prints its proof plan as a flow chart of text boxes rather than
 *  a table. This renderer reproduces that chart: every box holds the printed
 *  wording verbatim, including the dotted blanks the student fills in, and the
 *  arrows follow the printed direction (top box → bottom box, with the side
 *  box feeding into the box it points at in the source).
 *
 *  It carries NO geometry, so nothing here is estimated: the only thing read
 *  from the scan is text and arrow direction. It therefore ships as a
 *  reconstruction rather than a `reference` placeholder.
 * ============================================================================
 */

interface FlowNode {
  id: string;
  text: string;
  note?: string;
}

interface FlowAside {
  text: string;
  targetId: string;
}

function readChain(value: unknown): FlowNode[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== 'object') return [];
    const record = item as Record<string, unknown>;
    if (typeof record.id !== 'string' || typeof record.text !== 'string') return [];
    return [
      {
        id: record.id,
        text: record.text,
        ...(typeof record.note === 'string' ? { note: record.note } : {}),
      },
    ];
  });
}

function readAside(value: unknown): FlowAside | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const record = value as Record<string, unknown>;
  if (typeof record.text !== 'string' || typeof record.targetId !== 'string') return undefined;
  return { text: record.text, targetId: record.targetId };
}

export function ProofFlow({ spec }: { spec: InteractiveDiagram }) {
  const chain = useMemo(() => readChain(spec.params.chain), [spec.params.chain]);
  const aside = useMemo(() => readAside(spec.params.aside), [spec.params.aside]);

  return (
    <section className={styles.flow} aria-label={spec.alt.replace(/\$([^$]+)\$/g, '$1')} dir="rtl">
      <ol className={styles.chain}>
        {chain.map((node, index) => {
          const hasAside = aside?.targetId === node.id;
          return (
            <li key={node.id} className={styles.row}>
              <div className={hasAside ? styles.pairWithAside : styles.pair}>
                {hasAside ? (
                  <div className={styles.aside}>
                    <div className={styles.asideBox}>
                      <RichText text={aside.text} />
                    </div>
                    <span className={styles.asideArrow} aria-hidden="true">
                      ⟵
                    </span>
                  </div>
                ) : null}

                <div className={styles.box}>
                  <RichText text={node.text} />
                </div>

                {node.note ? <span className={styles.note}>{node.note}</span> : null}
              </div>

              {index < chain.length - 1 ? (
                <span className={styles.arrow} aria-hidden="true">
                  ↓
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
