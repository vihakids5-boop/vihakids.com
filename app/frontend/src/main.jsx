import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/global.css';
import { reloadOnceForStaleChunk } from './lib/lazyWithReload';

// Vite fires this when a preloaded chunk or its CSS 404s after a deploy.
window.addEventListener('vite:preloadError', (event) => {
  if (reloadOnceForStaleChunk()) event.preventDefault();
});

const container = document.getElementById('root');
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Production HTML is pre-rendered at build time (see src/entry-server.jsx
// and scripts/prerender.mjs), so attach to the existing markup instead of
// throwing it away and re-creating it. `vite dev` serves an empty root, so
// fall back to a normal mount there.
// Only hydrate when the markup was rendered for THIS url. index.html (the
// homepage render) is also what CloudFront returns for routes that have no
// file of their own, e.g. /admin or /about.html; hydrating the homepage there
// would mismatch, so clear it and mount normally instead.
const here = window.location.pathname.length > 1 ? window.location.pathname.replace(/\/+$/, '') : '/';
if (container.hasChildNodes() && container.dataset.prerendered === here) {
  ReactDOM.hydrateRoot(container, app);
} else {
  container.replaceChildren();
  ReactDOM.createRoot(container).render(app);
}
