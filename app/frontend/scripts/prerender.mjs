// Generates one HTML file per React route in dist/prerendered/, each a copy
// of the built index.html with that route's title, description, canonical
// and social tags baked in AND the route's fully rendered body markup in
// <div id="root">. Without the head swap, every route is served the
// homepage's <head> (including canonical="/"), so search engines treat the
// landing pages as duplicates of the homepage and never index them. Without
// the body, non-JS crawlers see an empty page (no h1, no text, no links).
// The homepage itself is rendered into dist/index.html in place.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { ALL_TUITION_PAGES } from '../src/data/tuitionLandingPages.js';
import { STATIC_ROUTE_HEADS } from '../src/data/staticRouteHeads.js';
import { buildFaqJsonLd } from '../src/data/faqs.js';

const SITE_ORIGIN = 'https://www.vihakids.com';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const outDir = path.join(distDir, 'prerendered');

const template = readFileSync(path.join(distDir, 'index.html'), 'utf8');

// Built by `vite build --ssr` (see package.json "build").
const { render } = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href);

const routes = [
  ...Object.entries(STATIC_ROUTE_HEADS).map(([route, head]) => ({ route, ...head })),
  ...ALL_TUITION_PAGES.map((p) => ({ route: `/${p.slug}`, title: p.metaTitle, description: p.metaDescription })),
];

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function replaceOnce(html, pattern, replacement, label, route) {
  if (!pattern.test(html)) throw new Error(`prerender: could not find ${label} in index.html while building ${route}`);
  return html.replace(pattern, replacement);
}

mkdirSync(outDir, { recursive: true });

for (const { route, title, description } of routes) {
  const t = escapeHtml(title);
  const d = escapeHtml(description);
  const url = SITE_ORIGIN + route;

  let html = template;
  html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${t}</title>`, '<title>', route);
  html = replaceOnce(html, /(<meta name="description" content=")[^"]*(")/, `$1${d}$2`, 'meta description', route);
  html = replaceOnce(html, /(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`, 'canonical', route);
  html = replaceOnce(html, /(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`, 'og:url', route);
  html = replaceOnce(html, /(<meta property="og:title" content=")[^"]*(")/, `$1${t}$2`, 'og:title', route);
  html = replaceOnce(html, /(<meta property="og:description" content=")[^"]*(")/, `$1${d}$2`, 'og:description', route);
  html = replaceOnce(html, /(<meta name="twitter:title" content=")[^"]*(")/, `$1${t}$2`, 'twitter:title', route);
  html = replaceOnce(html, /(<meta name="twitter:description" content=")[^"]*(")/, `$1${d}$2`, 'twitter:description', route);

  // /faq carries the full parent FAQ as structured data. The template's own
  // FAQPage block describes the homepage FAQ, so swap it rather than emit two
  // FAQPage entities on one URL (Google only honours one per page).
  if (route === '/faq') {
    const jsonLd = JSON.stringify(buildFaqJsonLd()).replace(/</g, '\\u003c');
    html = replaceOnce(
      html,
      /<script type="application\/ld\+json">\s*\{\s*"@context": "https:\/\/schema.org",\s*"@type": "FAQPage",[\s\S]*?<\/script>/,
      `<script type="application/ld+json" id="faq-page-jsonld">${jsonLd}</script>`,
      'homepage FAQPage JSON-LD',
      route,
    );
  }

  // data-prerendered names the route this markup belongs to. CloudFront serves
  // index.html for any URL without its own file (/admin, /about.html, blog and
  // legal pages), so main.jsx must not hydrate homepage markup on those.
  // Replace the empty app shell (and its <noscript> fallback) with the
  // real rendered page. main.jsx hydrates this markup on the client.
  const body = await render(route);
  html = replaceOnce(html, /<div id="root">[\s\S]*?<\/div>(?=\s*<\/body>)/, `<div id="root" data-prerendered="${route}">${body}</div>`, '<div id="root">', route);

  const outFile = route === '/' ? path.join(distDir, 'index.html') : path.join(outDir, `${route.slice(1)}.html`);
  writeFileSync(outFile, html);
}

console.log(`prerendered ${routes.length} routes (homepage into dist/index.html, the rest into dist/prerendered/)`);
