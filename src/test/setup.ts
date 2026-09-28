import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
  localStorage.clear();
  sessionStorage.clear();
});

// jsdom does not implement window.scrollTo. Stub it so navigation in tests is
// silent rather than emitting "Not implemented" noise.
Object.defineProperty(window, 'scrollTo', { value: () => {}, writable: true });
