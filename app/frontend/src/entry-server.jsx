// Build-time renderer used by scripts/prerender.mjs. Renders one route of
// the app to an HTML string so every page ships its real content (h1,
// copy, internal links) in the initial response instead of an empty
// <div id="root">. Crawlers that do not execute JavaScript — and audit
// tools like Semrush with JS rendering off — otherwise see a blank page.
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Writable } from 'node:stream';
import App from './App.jsx';

export function render(url) {
  return new Promise((resolve, reject) => {
    let html = '';
    const sink = new Writable({
      write(chunk, _encoding, callback) {
        html += chunk.toString();
        callback();
      },
    });
    sink.on('finish', () => resolve(html));

    const { pipe } = renderToPipeableStream(
      <React.StrictMode>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </React.StrictMode>,
      {
        // Wait for every lazy-loaded route chunk to resolve so the output
        // is the complete page, not the Suspense fallback.
        onAllReady() {
          pipe(sink);
        },
        onError(err) {
          reject(err);
        },
      },
    );
  });
}
