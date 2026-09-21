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
import { takeSsrHead } from './lib/useDocumentHead.js';

export function render(url) {
  return new Promise((resolve, reject) => {
    // Keep the raw bytes and decode once at the end, so a multi-byte
    // character (’ · 🎓, Kannada, Hindi) split across two chunks still
    // decodes correctly.
    const chunks = [];
    const sink = new Writable({
      write(chunk, encoding, callback) {
        chunks.push(Buffer.isBuffer(chunk) ? Buffer.from(chunk) : Buffer.from(chunk, encoding));
        callback();
      },
    });
    // React's stream also pads a few chunk boundaries with NUL bytes just
    // before a multi-byte character (the character itself is intact). NUL is
    // never valid in HTML, so drop those bytes.
    sink.on('finish', () => {
      const bytes = Buffer.concat(chunks).filter((b) => b !== 0);
      resolve({ html: Buffer.from(bytes).toString('utf8'), head: takeSsrHead() });
    });

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
