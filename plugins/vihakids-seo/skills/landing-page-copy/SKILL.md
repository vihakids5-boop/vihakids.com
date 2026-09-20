---
name: landing-page-copy
description: House rules for the Vihakids SEO tuition landing pages — the field shape of an entry in app/frontend/src/data/tuitionLandingPages.js and the voice its copy is written in. Use when adding or editing board, class, subject, country or city landing pages, their metaTitle/metaDescription, or any copy rendered by TuitionLandingPage.jsx.
---

# Vihakids landing-page copy

45 tuition landing pages are rendered from one template
(`app/frontend/src/pages/TuitionLandingPage.jsx`) out of one data file
(`app/frontend/src/data/tuitionLandingPages.js`). Every page shares a
layout, a registration form and a full cross-link grid, so the **only**
thing that makes a page worth indexing is copy that is specifically true of
that board, class, subject, country or city.

## Entry shape

```js
{
  slug: 'online-tuition-nashik',        // lowercase kebab, no slash — becomes the route
  category: 'city',                     // board | class | subject | country | city
  city: 'Nashik',                       // + board / grade / subject / country per category
  metaTitle: '…| Vihakids',             // ≤65 chars, always ends "| Vihakids"
  metaDescription: '…Free demo class.', // 110–160 chars
  eyebrow: 'Nashik · Classes 1–10',     // small label above the h1
  h1: 'Online Tuition in Nashik',       // unique across all pages
  lead: '…',                            // one sentence, the page's angle
  paragraphs: ['…', '…'],               // 2 paragraphs, ~100–140 words total
  highlights: ['…', '…', '…', '…'],     // 4 bullets under "Why parents choose Vihakids for this"
  showBoardBadges: true,                // CBSE/ICSE/State Board badges — false for Cambridge/IB/GCSE
}
```

Adding the entry is all that is needed — `App.jsx` generates the route from
`ALL_TUITION_PAGES`, and the template builds the cross-links. Class pages
come from the `CLASS_CONTENT` map instead, which supplies `band`,
`bandRange`, `lead`, `paragraphs` and `highlights`; the rest is derived.

## Voice

Read two neighbouring entries before drafting — they are the real spec.
What holds across all of them:

- **Plain, parent-facing, specific.** Talk about the child, the textbook,
  the exam format and the timetable. Not "holistic learning journeys".
- **Honest about trade-offs.** The existing copy says IB's inquiry approach
  can leave exam-skill gaps, and that ICSE's depth can overwhelm without
  support. Keep that register — it is what makes the pages read as written
  by someone who teaches.
- **No superlatives, no fake numbers.** No "best", no "#1", no invented
  student counts, ratings or success rates.
- **Indian English, en dashes and `·` separators** as the existing entries
  use. Escape apostrophes in single-quoted strings (`child\'s`).
- **The subjects are fixed**: English, Hindi, Mathematics, Science and
  Kannada, Classes 1–10, one-on-one or small-batch, live and online.

## The thing to get right

Each page needs at least one paragraph of substance that could not be
copy-pasted onto any other page:

- **City** — which boards actually dominate there (Karnataka State Board /
  SSLC in Bengaluru, Maharashtra SSC in Mumbai), the local language
  situation, commute and work patterns that shape class timings.
- **Board** — the textbook, the exam paper format, the pace, what the board
  rewards in an answer.
- **Class** — what changes academically at that age, and what it is
  preparation for.
- **Subject** — what children typically get stuck on, and how it is taught.
- **Country** — time zones against Indian tutors, the curriculum children
  there follow, and keeping Hindi or Kannada alive abroad.

Reusing a paragraph verbatim across pages is what makes a set of city pages
look like doorway pages to Google. The audit treats it as an error.

Highlights may echo each other by design — the last bullet is usually the
"one-on-one, live and online — no travel needed" line — but the first two
should be page-specific.

## Before you finish

Run the audit and fix anything it reports on your page:

```bash
node "${CLAUDE_PLUGIN_ROOT}/scripts/seo-audit.mjs"
```

Then add the page to `sitemap.xml` (`--fix` does this) and to `llms.txt` by
hand, under the heading that matches its category.
