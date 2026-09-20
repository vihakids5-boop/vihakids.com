---
description: Scaffold a new Vihakids SEO tuition landing page end to end — page data, sitemap entry and llms.txt listing.
argument-hint: <category> <topic>, e.g. "city Nashik" or "subject Social Science"
allowed-tools: Bash(node "${CLAUDE_PLUGIN_ROOT}/scripts/seo-audit.mjs":*), Read, Edit, Write, Grep, Glob
---

Add a new tuition landing page for: **$ARGUMENTS**

These pages are data, not JSX. One entry in the right exported array gives
you the route, the rendered page and the cross-links automatically — so the
work is writing genuinely page-specific copy and keeping the three files
that list pages in sync.

## 1. Work out what is being added

Parse `$ARGUMENTS` into a category and a topic. Categories and their arrays
in `app/frontend/src/data/tuitionLandingPages.js`:

| Category  | Array           | Slug pattern                   |
|-----------|-----------------|--------------------------------|
| `board`   | `BOARD_PAGES`   | `<board>-online-tuition`       |
| `class`   | `CLASS_CONTENT` | `online-tuition-class-<n>`     |
| `subject` | `SUBJECT_PAGES` | `<subject>-online-tuition`     |
| `country` | `COUNTRY_PAGES` | `online-tuition-<country>`     |
| `city`    | `CITY_PAGES`    | `online-tuition-<city>`        |

If the category is ambiguous, ask before writing anything. Read the two or
three nearest existing entries in that array first — they are the spec for
tone, length and field shape.

Class pages are different: they are generated from the `CLASS_CONTENT` map,
so you add a `CLASS_CONTENT` entry (`band`, `bandRange`, `lead`,
`paragraphs`, `highlights`) and the slug, meta and `h1` are derived.

## 2. Write the entry

Follow the `landing-page-copy` skill for the house voice and the field
rules — read it before drafting. Insert the entry in the array in a
position that matches how the array is already ordered (cities are roughly
by size, classes ascending, subjects in the order the site lists them).

## 3. Sync the files that list pages

- **`sitemap.xml`** (repo root) — add a `<url>` block. `node
  "${CLAUDE_PLUGIN_ROOT}/scripts/seo-audit.mjs" --fix` adds it with the
  `changefreq`/`priority` the other pages of that category use.
- **`llms.txt`** (repo root) — add the URL under the matching "By board /
  By subject / By class / By city / Tuition abroad" heading, or extend the
  range line if the section uses one.
- **`TuitionLandingPage.jsx`** — only if a blog post or resource genuinely
  fits this page, add it to `RELATED_BLOG_POSTS`. Skip it otherwise; a
  wrong link is worse than none.

You do **not** add a route — `App.jsx` generates one route per entry in
`ALL_TUITION_PAGES`.

## 4. Verify

```bash
node "${CLAUDE_PLUGIN_ROOT}/scripts/seo-audit.mjs"
```

Fix every new error and every new warning on the slug you just added. Then
confirm the page renders:

```bash
cd app && npm run dev   # then open http://localhost:5173/<slug>
```

Report the slug, where the entry went, which files you touched, and what
the audit says.
