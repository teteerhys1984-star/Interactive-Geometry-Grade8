import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { App } from '@/app/App';

// KaTeX stylesheet — required for correct maths layout.
import 'katex/dist/katex.min.css';
import '@/styles/global.css';

const container = document.getElementById('root');
if (!container) throw new Error('Root container #root was not found.');

createRoot(container).render(
  <StrictMode>
    {/*
      HashRouter, not BrowserRouter: GitHub Pages serves static files with no
      rewrite rules, so deep links like /lesson/x/step/2 would 404. Hash routing
      keeps every route resolvable from index.html alone.
    */}
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
