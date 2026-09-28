import styles from './Footer.module.css';

/** Instructor credit is reproduced exactly as supplied. */
const INSTRUCTOR_NAME = 'المهندس سومر شاهين';
const INSTRUCTOR_PHONE = '0930215022';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.credit}>
          <span className={styles.creditName}>{INSTRUCTOR_NAME}</span>
          <span className={styles.sep} aria-hidden="true">
            :
          </span>
          {/* Phone digits isolated LTR so they never reorder inside Arabic text. */}
          <a className={styles.phone} href={`tel:${INSTRUCTOR_PHONE}`} dir="ltr">
            {INSTRUCTOR_PHONE}
          </a>
        </p>
        <p className={styles.line}>
          منصة تعليمية ثابتة — يُبنى محتواها بالكامل من الكتاب المدرسي المعتمد.
        </p>
        <p className={styles.note}>لا يتم إرسال أي بيانات إلى خادم؛ يُحفظ تقدّمك في متصفّحك فقط.</p>
      </div>
    </footer>
  );
}
