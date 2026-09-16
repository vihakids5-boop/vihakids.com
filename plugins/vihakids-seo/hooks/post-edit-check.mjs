#!/usr/bin/env node
// PostToolUse hook: after an edit to the landing-page data, the sitemap
// or llms.txt, re-run the structural half of the SEO audit and hand back
// anything that is now broken. Stays silent for every other edit, and
// never blocks — copy-quality warnings are left to /vihakids-seo:audit
// so routine edits do not drown in them.

import { readFileSync } from 'node:fs';
import { findRoot, runAudit } from '../scripts/seo-audit.mjs';

const WATCHED = ['tuitionLandingPages.js', 'sitemap.xml', 'llms.txt'];
// Warning codes worth interrupting for: they mean a page exists but will
// not be discovered, rather than that its copy could be better.
const WATCHED_WARNINGS = new Set(['llms-missing', 'sitemap-orphan', 'sitemap-bad-url']);
const MAX_LINES = 12;

function readStdin() {
  try {
    return JSON.parse(readFileSync(0, 'utf8'));
  } catch {
    return null;
  }
}

const input = readStdin();
const filePath = input?.tool_input?.file_path ?? '';
if (!filePath || !WATCHED.some((name) => filePath.endsWith(name))) process.exit(0);

const root = findRoot(input?.cwd);
if (!root) process.exit(0);

try {
  const { findings } = await runAudit(root);
  const relevant = findings.filter((f) => f.level === 'error' || WATCHED_WARNINGS.has(f.code));
  if (!relevant.length) process.exit(0);

  const shown = relevant.slice(0, MAX_LINES);
  const lines = shown.map((f) => `- [${f.level}] ${f.where}: ${f.message}`);
  if (relevant.length > shown.length) {
    lines.push(`- …and ${relevant.length - shown.length} more (run /vihakids-seo:audit for the full report).`);
  }

  const errors = relevant.filter((f) => f.level === 'error').length;
  console.log(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'PostToolUse',
      additionalContext: `SEO landing-page check found issues after editing ${filePath}:\n${lines.join('\n')}`,
      systemMessage: `vihakids-seo: ${errors} error(s), ${relevant.length - errors} discoverability warning(s)`,
    },
  }));
} catch {
  // A half-written data file mid-edit is expected; stay quiet.
}
process.exit(0);
