# vihakids-seo

Claude Code plugin for the Vihakids tuition landing pages — the 45
board / class / subject / country / city pages rendered from
`app/frontend/src/data/tuitionLandingPages.js`.

## Install

The repo's `.claude/settings.json` already registers the `vihakids`
marketplace (this repo) and enables this plugin, so once you trust the
folder you only need:

```
/plugin install vihakids-seo@vihakids
```

To work on the plugin itself against your local checkout rather than the
pushed one:

```
/plugin marketplace add .
/plugin install vihakids-seo@vihakids
```

## What it gives you

| Component | What it does |
|---|---|
| `/vihakids-seo:new-page <category> <topic>` | Scaffolds a new landing page: the data entry, the `sitemap.xml` block and the `llms.txt` listing. |
| `/vihakids-seo:audit [--fix]` | Audits all pages for metadata length, duplicate titles/descriptions/copy, and sitemap / llms.txt / route drift — landing pages and every other route in `App.jsx` alike. |
| `landing-page-copy` skill | House voice and field rules; loads on its own when landing-page copy is being written or edited. |
| PostToolUse hook | After an edit to the page data, `App.jsx`, the blog index, `sitemap.xml` or `llms.txt`, reports anything that would stop a page being discovered. Never blocks. |

## In CI

`.github/workflows/seo-audit.yml` runs the audit on pull requests that
touch the page data, the routes, the blog index, `sitemap.xml`, `llms.txt`
or this plugin. `deploy.yml` runs the same check before the S3 sync, so a
push to main that would publish a broken sitemap fails before anything
reaches the bucket. Both fail on errors only — copy-length warnings never
block a deploy.

## The audit script standalone

```bash
node plugins/vihakids-seo/scripts/seo-audit.mjs [--root <repo>] [--fix] [--json] [--quiet]
```

Exits 1 on errors (broken entry, duplicate metadata, a page missing from
the sitemap, a blog link with no route), 0 when only warnings remain
(length, thin copy, `llms.txt` gaps, an unlisted blog post), 2 if it could
not run. No dependencies — it imports the page data directly and reads
`App.jsx` and the blog index as text. Usable as a CI step.

Two policy lists live at the top of the script: `NO_INDEX_ROUTES` (routes
that must stay out of the sitemap) and `SITEMAP_ONLY_ROUTES` (pages in the
sitemap but deliberately absent from `llms.txt` — currently the legal
pages). Adjust those rather than silencing findings.
