import { RichText } from '@/components/math';
import styles from './QuestionGroup.module.css';

interface QuestionGroupProps {
  title?: string;
  items: { label?: string; text: string }[];
}

/**
 * Textbook questions reproduced verbatim as prompts.
 *
 * The supplied pages contain open-response questions with no printed answers,
 * so no answer key is stored and none is invented. `label` preserves the exact
 * numbering printed in the source.
 */
export function QuestionGroup({ title, items }: QuestionGroupProps) {
  return (
    <section className={styles.group} aria-label={title ?? 'أسئلة'}>
      {title ? <h3 className={styles.title}>{title}</h3> : null}
      <ol className={styles.list}>
        {items.map((item, index) => (
          <li key={index} className={styles.item}>
            <span className={styles.marker} aria-hidden="true" dir="ltr">
              {item.label ?? `${index + 1}.`}
            </span>
            <p className={styles.text}>
              <RichText text={item.text} />
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
