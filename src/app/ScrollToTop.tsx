import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Resets scroll position on navigation — important for long lesson steps. */
export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // jsdom (tests) does not implement scrollTo; failing to scroll is harmless.
    if (typeof window.scrollTo !== 'function') return;
    try {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    } catch {
      /* no-op */
    }
  }, [pathname]);
  return null;
}
