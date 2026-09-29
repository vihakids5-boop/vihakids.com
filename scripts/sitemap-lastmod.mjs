// Rewrites the <lastmod> of every URL in sitemap.xml to the date that URL's
// content actually last changed, taken from git history.
//
// Why: the sitemap previously carried one hand-typed date for every page (or
// none at all). When every URL claims to have changed on the same day, and that
// day is simply "today", Google learns to ignore the dates altogether — so they
// stop earning faster re-crawls, which is the only reason to publish them.
//
// Run from the repo root:  node scripts/sitemap-lastmod.mjs
// Add --check to fail instead of writing (useful before a deploy).
//
// Each URL maps to the source files holding that page's own words; the date is
// the newest commit touching any of them. Shared templates (TuitionLandingPage,
// PracticeWorksheetPage) are deliberately left out — a layout or styling change
// there is not a change to what the page says, and counting them would stamp
// most of the sitemap with one date every time either file is touched.
// Uncommitted edits are invisible to git log, so run this after committing the
// change it is meant to describe.

import { execFileSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sitemapPath = path.join(root, 'sitemap.xml');
const check = process.argv.includes('--check');

const FE = 'app/frontend/src';

const LANDING_DATA = `${FE}/data/tuitionLandingPages.js`;

// Pages whose content lives in one or two obvious files.
const EXACT = {
  '/': [`${FE}/pages/HomePage.jsx`, `${FE}/components/home`, `${FE}/styles/v2.css`],
  '/register': [`${FE}/pages/RegisterPage.jsx`, `${FE}/components/RegisterFormWizard.jsx`, `${FE}/components/BookingLayoutV2.jsx`],
  '/teach': [`${FE}/pages/TeachPage.jsx`, `${FE}/components/TeachForm.jsx`],
  '/fees': [`${FE}/pages/FeesPage.jsx`],
  '/faq': [`${FE}/pages/FaqPage.jsx`, `${FE}/data/faqs.js`],
  '/about.html': [`${FE}/pages/AboutPage.jsx`, 'about.html'],
  '/terms.html': [`${FE}/pages/TermsPage.jsx`, 'terms.html'],
  '/privacy.html': [`${FE}/pages/PrivacyPage.jsx`, 'privacy.html'],
  '/cookies.html': [`${FE}/pages/CookiesPage.jsx`, 'cookies.html'],
  '/blog.html': [`${FE}/pages/BlogIndexPage.jsx`, 'blog.html'],
  '/worksheets': [`${FE}/pages/resources/WorksheetsHubPage.jsx`],
  '/kannada-alphabet-tracing-worksheet': [`${FE}/pages/resources/KannadaAlphabetWorksheetPage.jsx`, `${FE}/components/WorksheetTraceCard.jsx`],
  '/hindi-varnamala-tracing-worksheet': [`${FE}/pages/resources/HindiVarnamalaWorksheetPage.jsx`, `${FE}/components/WorksheetTraceCard.jsx`],
  '/english-alphabet-tracing-worksheet': [`${FE}/pages/resources/EnglishAlphabetWorksheetPage.jsx`, `${FE}/components/WorksheetTraceCard.jsx`],
};

// Blog posts: /blog-<name>.html → the page component that renders it.
const BLOG = {
  '/blog-exam-stress-confidence.html': 'BlogExamStressConfidencePage.jsx',
  '/blog-english-grammar-basics.html': 'BlogEnglishGrammarBasicsPage.jsx',
  '/blog-kannada-reading-tips.html': 'BlogKannadaReadingTipsPage.jsx',
  '/blog-cbse-icse-state-board-kannada-hindi.html': 'BlogCbseIcseStateBoardPage.jsx',
  '/blog-choosing-online-math-tutor.html': 'BlogChoosingMathTutorPage.jsx',
  '/blog-science-learning-tips.html': 'BlogScienceLearningTipsPage.jsx',
};

function sourcesFor(urlPath) {
  if (EXACT[urlPath]) return EXACT[urlPath];
  if (BLOG[urlPath]) return [`${FE}/pages/blog/${BLOG[urlPath]}`, urlPath.replace(/^\//, '')];
  if (/-worksheet$/.test(urlPath)) {
    return [`${FE}/data/practiceWorksheets.js`, `${FE}/data/practiceWorksheetNotes.js`];
  }
  if (/^\/online-tuition-/.test(urlPath) && !/^\/online-tuition-class-\d+$/.test(urlPath)) {
    // City and country pages carry their own local detail and questions.
    return [LANDING_DATA, `${FE}/data/cityPageDetails.js`, `${FE}/data/cityPageFaqs.js`];
  }
  // Board, class and subject landing pages.
  return [LANDING_DATA, `${FE}/data/tuitionPageFaqs.js`];
}

// Newest commit date (YYYY-MM-DD) across the given paths. Paths git has never
// seen simply contribute nothing, so a mistyped path shows up as a missing date
// rather than a silently wrong one.
function lastCommitDate(files) {
  const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...files], { cwd: root, encoding: 'utf8' }).trim();
  return out || null;
}

const xml = readFileSync(sitemapPath, 'utf8');
const blocks = xml.split(/(?=<url>)/);
let changed = 0;
const missing = [];

const updated = blocks
  .map((block) => {
    const loc = block.match(/<loc>https:\/\/www\.vihakids\.com([^<]*)<\/loc>/);
    if (!loc) return block;
    const urlPath = loc[1] === '' ? '/' : loc[1];
    const date = lastCommitDate(sourcesFor(urlPath));
    if (!date) {
      missing.push(urlPath);
      return block;
    }
    const withDate = block.includes('<lastmod>')
      ? block.replace(/<lastmod>[^<]*<\/lastmod>/, `<lastmod>${date}</lastmod>`)
      : block.replace(/(<\/loc>)/, `$1\n    <lastmod>${date}</lastmod>`);
    if (withDate !== block) changed += 1;
    return withDate;
  })
  .join('');

if (missing.length) {
  console.error(`sitemap-lastmod: no git date found for ${missing.length} URL(s):\n  ${missing.join('\n  ')}`);
  process.exit(1);
}

const dates = [...updated.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]);
const distinct = [...new Set(dates)].sort();

if (check) {
  if (updated !== xml) {
    console.error('sitemap-lastmod: sitemap.xml is out of date — run node scripts/sitemap-lastmod.mjs');
    process.exit(1);
  }
  console.log(`sitemap-lastmod: up to date (${dates.length} URLs, ${distinct.length} distinct dates)`);
} else {
  writeFileSync(sitemapPath, updated);
  console.log(`sitemap-lastmod: ${dates.length} URLs, ${changed} rewritten, ${distinct.length} distinct dates: ${distinct.join(', ')}`);
}
