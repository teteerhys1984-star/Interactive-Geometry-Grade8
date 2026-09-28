import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  /** 1-based current position. */
  current: number;
  total: number;
  label?: string;
}

export function ProgressBar({ current, total, label }: ProgressBarProps) {
  const safeTotal = Math.max(total, 1);
  const percent = Math.min(100, Math.round((current / safeTotal) * 100));
  return (
    <div className={styles.wrapper}>
      <div className={styles.meta}>
        <span>{label ?? 'التقدّم'}</span>
        {/* Numeric run isolated so "3 / 8" never reorders inside Arabic text. */}
        <span className="numeric" dir="ltr">
          {current} / {safeTotal}
        </span>
      </div>
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'التقدّم في الدرس'}
      >
        <div className={styles.fill} style={{ inlineSize: `${percent}%` }} />
      </div>
    </div>
  );
}
