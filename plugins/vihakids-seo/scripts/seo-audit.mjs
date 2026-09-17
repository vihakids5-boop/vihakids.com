#!/usr/bin/env node
// Audits the Vihakids site's pages. The SEO landing pages come from
// app/frontend/src/data/tuitionLandingPages.js and get metadata and copy
// checks; every other page is a route in App.jsx. Both are checked
// against sitemap.xml and llms.txt, and blog routes against the POSTS
// array the blog index renders. Pure node, no dependencies — the data file is plain ESM with
// no imports, so it can be imported directly.
//
//   node seo-audit.mjs [--root <repo>] [--json] [--quiet] [--fix]
//
// Exit 0 = no errors (warnings allowed), 1 = errors found, 2 = audit
// could not run.

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const DATA_REL = 'app/frontend/src/data/tuitionLandingPages.js';
const APP_REL = 'app/frontend/src/App.jsx';
const BLOG_INDEX_REL = 'app/frontend/src/pages/BlogIndexPage.jsx';
const ORIGIN = 'https://www.vihakids.com';

const CATEGORIES = ['board', 'class', 'subject', 'country', 'city'];
// Routes that deliberately stay out of the sitemap: the admin dashboard,
// and the legacy /index.html redirect.
const NO_INDEX_ROUTES = ['/admin', '/index.html'];
// Pages that belong in the sitemap but are deliberately left out of
// llms.txt — an assistant summarising the site gains nothing from them.
const SITEMAP_ONLY_ROUTES = ['/terms.html', '/privacy.html', '/cookies.html'];
// Matches what the existing sitemap.xml already uses per category.
const PRIORITY = { board: '0.8', subject: '0.8', city: '0.8', class: '0.7', country: '0.7' };

// Google truncates around these lengths; the bounds below are the point
// at which a title/description is likely to be cut off or too thin to
// earn a click, not hard SEO rules. They are warnings, never errors —
// errors are reserved for things that actually break a page or stop it
// being indexed (missing fields, duplicate metadata, sitemap gaps).
// MIN_WORDS is set just under the body length the existing pages use,
// so it catches a genuinely thin new page rather than every page.
const TITLE_MIN = 25;
const TITLE_MAX = 65;
const DESC_MIN = 110;
const DESC_SOFT_MAX = 160;
const DESC_HARD_MAX = 170;
const MIN_WORDS = 90;
const MIN_PARAGRAPHS = 2;
const MIN_HIGHLIGHTS = 3;

export function findRoot(startDir) {
  for (const candidate of [startDir, process.env.CLAUDE_PROJECT_DIR, process.cwd()]) {
    if (!candidate) continue;
    let dir = resolve(candidate);
    for (;;) {
      if (existsSync(join(dir, DATA_REL))) return dir;
      const parent = dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }
  }
  return null;
}

const words = (text) => text.trim().split(/\s+/).filter(Boolean).length;
const normalize = (text) => text.replace(/\s+/g, ' ').trim().toLowerCase();

// llms.txt describes some page families with a shell-style range
// ("online-tuition-class-{1..10}") rather than listing each URL, so
// expand those before checking coverage.
function expandRanges(text) {
  const out = [text];
  for (const line of text.split('\n')) {
    const match = line.match(/\{(\d+)\.\.(\d+)\}/);
    if (!match) continue;
    const [from, to] = [Number(match[1]), Number(match[2])];
    for (let n = from; n <= to; n += 1) out.push(line.replace(match[0], String(n)));
  }
  return out.join('\n');
}

function routesFromApp(source) {
  return new Set(
    [...source.matchAll(/path=["']([^"']+)["']/g)]
      .map((m) => m[1])
      .filter((p) => p !== '*')
      .map((p) => (p.startsWith('/') ? p : `/${p}`)),
  );
}

function sitemapEntry(slug, category) {
  return [
    '  <url>',
    `    <loc>${ORIGIN}/${slug}</loc>`,
    '    <changefreq>monthly</changefreq>',
    `    <priority>${PRIORITY[category] ?? '0.7'}</priority>`,
    '  </url>',
  ].join('\n');
}

export async function runAudit(root, { fix = false } = {}) {
  const findings = [];
  let otherRoutes = 0;
  const add = (level, code, where, message) => findings.push({ level, code, where, message });

  const data = await import(pathToFileURL(join(root, DATA_REL)).href);
  const pages = data.ALL_TUITION_PAGES ?? [];
  if (!pages.length) {
    add('error', 'no-pages', DATA_REL, 'ALL_TUITION_PAGES is empty or not exported.');
    return { findings, pages, fixed: [], otherRoutes };
  }

  const seen = { slug: new Map(), metaTitle: new Map(), metaDescription: new Map(), h1: new Map() };
  const paragraphOwners = new Map();

  for (const page of pages) {
    const where = page.slug ?? '(page with no slug)';

    for (const field of ['slug', 'category', 'metaTitle', 'metaDescription', 'eyebrow', 'h1', 'lead']) {
      if (typeof page[field] !== 'string' || !page[field].trim()) {
        add('error', 'missing-field', where, `Missing or empty "${field}".`);
      }
    }
    for (const field of ['paragraphs', 'highlights']) {
      if (!Array.isArray(page[field]) || page[field].length === 0) {
        add('error', 'missing-field', where, `Missing or empty "${field}" array.`);
      }
    }
    if (!page.slug) continue;

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(page.slug)) {
      add('error', 'bad-slug', where, 'Slug must be lowercase kebab-case with no leading/trailing slash.');
    }
    if (!CATEGORIES.includes(page.category)) {
      add('error', 'bad-category', where, `category "${page.category}" is not one of ${CATEGORIES.join(', ')}.`);
    }
    if ('showBoardBadges' in page && typeof page.showBoardBadges !== 'boolean') {
      add('warn', 'bad-field-type', where, 'showBoardBadges should be a boolean.');
    }

    if (typeof page.metaTitle === 'string') {
      const len = page.metaTitle.length;
      if (len > TITLE_MAX) add('warn', 'title-length', where, `metaTitle is ${len} chars — over ${TITLE_MAX}, Google will truncate it.`);
      if (len < TITLE_MIN) add('warn', 'title-length', where, `metaTitle is only ${len} chars — likely too thin.`);
      if (!page.metaTitle.endsWith('| Vihakids')) {
        add('warn', 'title-suffix', where, 'metaTitle does not end with "| Vihakids".');
      }
    }
    if (typeof page.metaDescription === 'string') {
      const len = page.metaDescription.length;
      if (len > DESC_HARD_MAX) add('warn', 'description-length', where, `metaDescription is ${len} chars — over ${DESC_HARD_MAX}, it will be cut mid-sentence.`);
      else if (len > DESC_SOFT_MAX) add('warn', 'description-length', where, `metaDescription is ${len} chars — over ${DESC_SOFT_MAX}, the tail may be dropped.`);
      if (len < DESC_MIN) add('warn', 'description-length', where, `metaDescription is only ${len} chars — under ${DESC_MIN}, wasted snippet space.`);
    }

    if (Array.isArray(page.paragraphs)) {
      if (page.paragraphs.length < MIN_PARAGRAPHS) {
        add('warn', 'thin-content', where, `Only ${page.paragraphs.length} paragraph(s) — aim for at least ${MIN_PARAGRAPHS}.`);
      }
      const count = words(page.paragraphs.join(' '));
      if (count < MIN_WORDS) {
        add('warn', 'thin-content', where, `Body copy is ${count} words — under ${MIN_WORDS}, reads as a doorway page.`);
      }
      for (const paragraph of page.paragraphs) {
        const key = normalize(paragraph);
        if (!paragraphOwners.has(key)) paragraphOwners.set(key, []);
        paragraphOwners.get(key).push(page.slug);
      }
    }
    if (Array.isArray(page.highlights) && page.highlights.length < MIN_HIGHLIGHTS) {
      add('warn', 'thin-content', where, `Only ${page.highlights.length} highlight(s) — aim for at least ${MIN_HIGHLIGHTS}.`);
    }

    for (const field of Object.keys(seen)) {
      const value = page[field];
      if (typeof value !== 'string') continue;
      const key = field === 'slug' ? value : normalize(value);
      if (!seen[field].has(key)) seen[field].set(key, []);
      seen[field].get(key).push(page.slug);
    }
  }

  for (const [field, index] of Object.entries(seen)) {
    for (const [value, slugs] of index) {
      if (slugs.length < 2) continue;
      const level = field === 'h1' ? 'warn' : 'error';
      add(level, 'duplicate', slugs.join(', '), `Duplicate ${field}: "${value.slice(0, 60)}${value.length > 60 ? '…' : ''}".`);
    }
  }
  for (const [paragraph, slugs] of paragraphOwners) {
    if (slugs.length < 2) continue;
    add('error', 'duplicate-copy', slugs.join(', '), `Identical paragraph reused across pages: "${paragraph.slice(0, 70)}…".`);
  }

  // ---- the two files that list pages, read once for the checks below ----
  const sitemapPath = join(root, 'sitemap.xml');
  const llmsPath = join(root, 'llms.txt');
  const appPath = join(root, APP_REL);
  const fixed = [];

  let sitemap = null;
  let locs = [];
  if (!existsSync(sitemapPath)) {
    add('error', 'missing-file', 'sitemap.xml', 'sitemap.xml not found at the repo root.');
  } else {
    sitemap = readFileSync(sitemapPath, 'utf8');
    locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  }

  let llms = null;
  if (!existsSync(llmsPath)) {
    add('warn', 'missing-file', 'llms.txt', 'llms.txt not found at the repo root.');
  } else {
    llms = expandRanges(readFileSync(llmsPath, 'utf8'));
  }

  const inSitemap = (pathname) => locs.includes(`${ORIGIN}${pathname}`);
  const inLlms = (pathname) => llms !== null && llms.includes(`${ORIGIN}${pathname}`);

  // ---- landing pages against sitemap.xml and llms.txt ----
  if (sitemap !== null) {
    const missing = pages.filter((p) => p.slug && !inSitemap(`/${p.slug}`));

    if (missing.length && fix) {
      const block = missing.map((p) => sitemapEntry(p.slug, p.category)).join('\n');
      sitemap = sitemap.replace(/<\/urlset>\s*$/, `${block}\n</urlset>\n`);
      writeFileSync(sitemapPath, sitemap);
      locs.push(...missing.map((p) => `${ORIGIN}/${p.slug}`));
      fixed.push(...missing.map((p) => `sitemap.xml: added ${ORIGIN}/${p.slug}`));
    } else {
      for (const page of missing) {
        add('error', 'sitemap-missing', page.slug, 'Not in sitemap.xml — search engines will not discover it. Run with --fix to add it.');
      }
    }

    const duplicateLocs = locs.filter((loc, i) => locs.indexOf(loc) !== i);
    for (const loc of new Set(duplicateLocs)) {
      add('error', 'sitemap-duplicate', loc, 'Listed more than once in sitemap.xml.');
    }
  }

  if (llms !== null) {
    for (const page of pages) {
      if (page.slug && !inLlms(`/${page.slug}`)) {
        add('warn', 'llms-missing', page.slug, 'Not listed in llms.txt (add the URL, or cover it with a {1..N} range line).');
      }
    }
  }

  // ---- every other page: core, legal, blog and resource routes ----
  // Landing pages are generated from data, so the checks above cover them
  // all. Everything else is a hand-written route in App.jsx with nothing
  // tying it to sitemap.xml or llms.txt — which is how the fees page and
  // the blog posts came to be missing from llms.txt.
  if (!existsSync(appPath)) {
    add('warn', 'missing-file', APP_REL, 'App.jsx not found — route coverage not checked.');
  } else {
    const appSource = readFileSync(appPath, 'utf8');
    const routes = routesFromApp(appSource);
    const landingRoutes = new Set(pages.filter((p) => p.slug).map((p) => `/${p.slug}`));

    for (const route of routes) {
      if (landingRoutes.has(route)) continue;
      otherRoutes += 1;
      if (NO_INDEX_ROUTES.includes(route)) {
        if (inSitemap(route)) {
          add('warn', 'sitemap-noindex', route, 'In sitemap.xml, but this route should not be indexed.');
        }
        continue;
      }
      if (sitemap !== null && !inSitemap(route)) {
        add('error', 'sitemap-missing', route, 'Route exists but is not in sitemap.xml — search engines will not discover it.');
      }
      if (llms !== null && !SITEMAP_ONLY_ROUTES.includes(route) && !inLlms(route)) {
        add('warn', 'llms-missing', route, 'Route exists but is not listed in llms.txt.');
      }
    }

    // Sitemap URLs pointing at nothing. Checked against the real routes
    // plus the landing slugs, since those routes are generated.
    for (const loc of locs) {
      let pathname;
      try {
        pathname = new URL(loc).pathname;
      } catch {
        add('error', 'sitemap-bad-url', loc, 'Not a valid URL.');
        continue;
      }
      if (pathname !== '/' && !routes.has(pathname) && !landingRoutes.has(pathname)) {
        add('warn', 'sitemap-orphan', loc, 'Sitemap URL has no matching route in App.jsx — it will redirect to "/".');
      }
    }

    // Blog posts exist twice: as a route in App.jsx and as an entry in the
    // POSTS array the blog index renders. In one but not the other means
    // the post is either unreachable or invisible on the blog.
    const blogIndexPath = join(root, BLOG_INDEX_REL);
    if (existsSync(blogIndexPath)) {
      const indexSource = readFileSync(blogIndexPath, 'utf8');
      const start = indexSource.indexOf('const POSTS = [');
      const listed = new Set(
        start < 0 ? [] : [...indexSource.slice(start).matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]),
      );
      if (!listed.size) {
        add('warn', 'blog-index-unreadable', BLOG_INDEX_REL, 'Could not read the POSTS array — blog coverage not checked.');
      }
      for (const slug of listed) {
        if (!routes.has(slug)) {
          add('error', 'blog-post-no-route', slug, 'Listed on the blog index but has no route in App.jsx — the link redirects to "/".');
        }
      }
      for (const route of routes) {
        if (route.startsWith('/blog-') && !listed.has(route)) {
          add('warn', 'blog-post-unlisted', route, 'Blog post route exists but the blog index does not link to it.');
        }
      }
    }
  }

  return { findings, pages, fixed, otherRoutes };
}

export function formatReport({ findings, pages, fixed, otherRoutes = 0 }, { quiet = false } = {}) {
  const errors = findings.filter((f) => f.level === 'error');
  const warnings = findings.filter((f) => f.level === 'warn');
  const lines = [];

  if (fixed.length) {
    lines.push(`Fixed ${fixed.length} item(s):`);
    for (const item of fixed) lines.push(`  + ${item}`);
    lines.push('');
  }

  if (!quiet) {
    for (const [label, group] of [['ERROR', errors], ['WARN', warnings]]) {
      if (!group.length) continue;
      lines.push(`${label} (${group.length})`);
      for (const f of group) lines.push(`  [${f.code}] ${f.where}: ${f.message}`);
      lines.push('');
    }
  }

  lines.push(`${pages.length} landing pages and ${otherRoutes} other routes checked — ${errors.length} error(s), ${warnings.length} warning(s).`);
  return lines.join('\n');
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const argv = process.argv.slice(2);
  const flag = (name) => argv.includes(`--${name}`);
  const rootArg = argv.indexOf('--root') >= 0 ? argv[argv.indexOf('--root') + 1] : null;

  const root = findRoot(rootArg);
  if (!root) {
    console.error(`Could not find a Vihakids checkout (no ${DATA_REL} in this directory or any parent).`);
    process.exit(2);
  }

  try {
    const result = await runAudit(root, { fix: flag('fix') });
    if (flag('json')) {
      console.log(JSON.stringify({ root, ...result }, null, 2));
    } else {
      console.log(formatReport(result, { quiet: flag('quiet') }));
    }
    process.exit(result.findings.some((f) => f.level === 'error') ? 1 : 0);
  } catch (error) {
    console.error(`Audit failed: ${error.message}`);
    process.exit(2);
  }
}
