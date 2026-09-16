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
| `/vihakids-seo:audit [--fix]` | Audits all pages for metadata length, duplicate titles/descriptions/copy, and sitemap / llms.txt / route drift. |
| `landing-page-copy` skill | House voice and field rules; loads on its own when landing-page copy is being written or edited. |
| PostToolUse hook | After an edit to the page data, `sitemap.xml` or `llms.txt`, reports anything that would stop a page being discovered. Never blocks. |

## The audit script standalone

```bash
node plugins/vihakids-seo/scripts/seo-audit.mjs [--root <repo>] [--fix] [--json] [--quiet]
```

Exits 1 on errors (broken entry, duplicate metadata, page missing from the
sitemap), 0 when only warnings remain (length, thin copy, `llms.txt` gaps),
2 if it could not run. No dependencies — it imports the page data directly.
Usable as a CI step on `app/frontend/src/data/tuitionLandingPages.js`.
