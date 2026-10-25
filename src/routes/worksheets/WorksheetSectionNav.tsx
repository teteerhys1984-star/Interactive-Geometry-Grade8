import { NavLink, useLocation } from 'react-router-dom';
import { routes } from '@/lib/routes';
import styles from './WorksheetDetailPage.module.css';
import solutionStyles from './WorksheetSolutions.module.css';

/** Route-backed subsection tabs: native links preserve deep-link/back/keyboard behaviour. */
export function WorksheetSectionNav() {
  const { pathname } = useLocation();
  const inSolutions =
    pathname === routes.worksheetSolutions() ||
    pathname.startsWith(`${routes.worksheetSolutions()}/`);
  return (
    <nav
      className={`${styles.viewTabs} ${solutionStyles.sectionNav}`}
      aria-label="أقسام أوراق عمل مدرسية"
    >
      {[
        { to: routes.worksheets(), label: 'أوراق العمل', active: !inSolutions },
        { to: routes.worksheetSolutions(), label: 'حلول أوراق العمل', active: inSolutions },
      ].map(({ to, label, active }) => (
        <NavLink
          key={to}
          to={to}
          aria-current={active ? 'page' : false}
          className={active ? styles.tabBtnActive : styles.tabBtn}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
