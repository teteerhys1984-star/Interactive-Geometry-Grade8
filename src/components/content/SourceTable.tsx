import { RichText } from '@/components/math';
import styles from './SourceTable.module.css';

interface SourceTableProps {
  title?: string;
  columns: string[];
  rows: string[][];
  caption?: string;
}

/**
 * A printed table reproduced as printed — any number of columns.
 *
 * Used for the «الفرض / الخاصة / النتيجة» proof-plan grids of the source. Cells
 * go through <RichText>, so every Latin label, measurement and segment bracket
 * inside them is LTR-isolated structurally and the RTL column order is handled
 * by the table's own `dir="rtl"`, never by reordering the authored data.
 */
export function SourceTable({ title, columns, rows, caption }: SourceTableProps) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table} dir="rtl">
        {title ? <caption className={styles.title}>{title}</caption> : null}
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} scope="col">
                <RichText text={column} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>
                  <RichText text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {caption ? <p className={styles.caption}>{caption}</p> : null}
    </div>
  );
}
