import { RichText } from '@/components/math';
import styles from './CompareTable.module.css';

interface CompareTableProps {
  title?: string;
  columns: [string, string];
  rows: [string, string][];
}

/** Two-column comparison table used by authored teaching material. */
export function CompareTable({ title, columns, rows }: CompareTableProps) {
  return (
    <div className={styles.wrapper}>
      {title ? <p className={styles.title}>{title}</p> : null}
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">{columns[0]}</th>
            <th scope="col">{columns[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <RichText text={row[0]} />
              </td>
              <td>
                <RichText text={row[1]} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
