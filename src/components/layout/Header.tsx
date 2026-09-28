import { Link, NavLink } from 'react-router-dom';
import { routes } from '@/lib/routes';
import { subject } from '@/content/registry';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to={routes.home()} className={styles.brand}>
          <span className={styles.brandMark} aria-hidden="true">
            △
          </span>
          <span>{subject.title}</span>
        </Link>
        <nav className={styles.nav} aria-label="التنقل الرئيسي">
          <NavLink
            to={routes.home()}
            end
            className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
          >
            الرئيسية
          </NavLink>
          <NavLink
            to={routes.subject(subject.id)}
            className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
          >
            المقرر
          </NavLink>
          <NavLink
            to={routes.teacher()}
            className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
          >
            منطقة المعلّم
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
