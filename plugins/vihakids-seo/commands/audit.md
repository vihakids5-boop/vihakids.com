---
description: Audit every Vihakids SEO landing page for metadata, duplicate copy and sitemap/llms.txt drift.
argument-hint: "[--fix] [slug or category to focus on]"
allowed-tools: Bash(node "${CLAUDE_PLUGIN_ROOT}/scripts/seo-audit.mjs":*)
---

Run the landing-page audit and act on what it finds.

```bash
node "${CLAUDE_PLUGIN_ROOT}/scripts/seo-audit.mjs" $ARGUMENTS
```

The script checks `app/frontend/src/data/tuitionLandingPages.js` against
`sitemap.xml`, `llms.txt` and the routes in `App.jsx`. It exits 1 on errors,
0 when only warnings remain. `--fix` adds missing `sitemap.xml` entries (the
only fix that is safe to make mechanically); `--json` gives machine-readable
findings.

## What the finding codes mean

**Errors — the page is broken or will not be indexed correctly:**

- `missing-field`, `bad-slug`, `bad-category` — the entry will not render
  correctly through `TuitionLandingPage.jsx`.
- `duplicate` on `slug`, `metaTitle` or `metaDescription` — two pages
  compete for the same query; Google picks one and may drop the other.
- `duplicate-copy` — the same paragraph on more than one page. This is the
  one that gets a set of city pages classed as doorway pages. Rewrite the
  copy so each page says something only true of that city/board/class.
- `sitemap-missing` — the page exists but nothing links search engines to
  it. Re-run with `--fix`.

**Warnings — worth fixing, but nothing is broken:**

- `title-length` / `description-length` — Google truncates the tail. Rewrite
  so the useful part comes first; do not just chop it.
- `thin-content` — under the body length the rest of the site uses.
- `llms-missing` — the page is not in `llms.txt`, so AI assistants
  summarising the site will not know it exists. Add it under the right
  heading by hand.
- `sitemap-orphan` — a sitemap URL with no route in `App.jsx`; it redirects
  to `/`, which wastes crawl budget. Either add the route or drop the URL.

## How to report

If `$ARGUMENTS` names a slug or category, filter to that and ignore the
rest. Otherwise summarise by code rather than listing all findings, and fix
errors first. Do not rewrite copy in bulk to satisfy a length warning
without saying what you changed — this is live marketing copy.
