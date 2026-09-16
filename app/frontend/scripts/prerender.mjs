// Generates one HTML file per React route in dist/prerendered/, each a copy
// of the built index.html with that route's title, description, canonical
// and social tags baked in. Without this, every route is served the
// homepage's <head> (including canonical="/"), so search engines treat the
// landing pages as duplicates of the homepage and never index them.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { ALL_TUITION_PAGES } from '../src/data/tuitionLandingPages.js';
import { STATIC_ROUTE_HEADS } from '../src/data/staticRouteHeads.js';

const SITE_ORIGIN = 'https://www.vihakids.com';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const outDir = path.join(distDir, 'prerendered');

const template = readFileSync(path.join(distDir, 'index.html'), 'utf8');

const routes = [
  ...Object.entries(STATIC_ROUTE_HEADS)
    .filter(([route]) => route !== '/')
    .map(([route, head]) => ({ route, ...head })),
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

  writeFileSync(path.join(outDir, `${route.slice(1)}.html`), html);
}

console.log(`prerendered ${routes.length} routes into dist/prerendered/`);
