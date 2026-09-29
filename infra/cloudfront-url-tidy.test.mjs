// Exercises cloudfront-url-tidy.js before it is published to CloudFront, where
// a mistake would 301 real pages into oblivion for every visitor at once.
//
//   node infra/cloudfront-url-tidy.test.mjs
//
// The function source is plain ES5 with no imports (CloudFront's runtime has no
// module system), so it is evaluated here and the resulting handler called with
// the same event shape CloudFront passes on a viewer request.

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const source = readFileSync(path.join(here, 'cloudfront-url-tidy.js'), 'utf8');
// eslint-disable-next-line no-new-func
const handler = new Function(`${source}\nreturn handler;`)();

const req = (uri, querystring = {}) => ({ request: { uri, querystring, headers: {}, method: 'GET' } });

// [ uri, expected ] — a string means "301 to this", null means "pass through".
const CASES = [
  // The two shapes this exists for.
  ['/cbse-online-tuition.html', '/cbse-online-tuition'],
  ['/kannada-online-tuition.html', '/kannada-online-tuition'],
  ['/online-tuition-bengaluru.html', '/online-tuition-bengaluru'],
  ['/class-1-3-nouns-worksheet.html', '/class-1-3-nouns-worksheet'],
  ['/faq/', '/faq'],
  ['/fees/', '/fees'],
  ['/worksheets/', '/worksheets'],
  ['/online-tuition-chennai/', '/online-tuition-chennai'],

  // Old static files whose canonical URL is now the clean route.
  ['/register.html', '/register'],
  ['/teach.html', '/teach'],
  ['/admin.html', '/admin'],

  // The .html pages that are REAL pages — these must never be touched.
  ['/about.html', null],
  ['/blog.html', null],
  ['/terms.html', null],
  ['/privacy.html', null],
  ['/cookies.html', null],
  ['/blog-science-learning-tips.html', null],
  ['/blog-exam-stress-confidence.html', null],
  ['/blog-english-grammar-basics.html', null],
  ['/blog-kannada-reading-tips.html', null],
  ['/blog-choosing-online-math-tutor.html', null],
  ['/blog-cbse-icse-state-board-kannada-hindi.html', null],
  ['/index.html', null],
  ['/404.html', null],

  // Ordinary requests.
  ['/', null],
  ['/faq', null],
  ['/cbse-online-tuition', null],
  ['/assets/index-CvYZauBo.js', null],
  ['/assets/index-CZCstp1a.css', null],
  ['/sitemap.xml', null],
  ['/robots.txt', null],
  ['/llms.txt', null],
  ['/favicon.ico', null],

  // Made-up URLs: left alone, so CloudFront's error page answers 404.
  ['/this-page-does-not-exist', null],
  ['/this-page-does-not-exist.html', null],
  ['/cbse-online-tuition-typo.html', null],
  ['/nonsense/', null],

  // Edge shapes that must not crash or half-match.
  ['/.html', null],
  ['//', null],
];

let failed = 0;
for (const [uri, expected] of CASES) {
  const out = handler(req(uri));
  const got = out.statusCode === 301 ? out.headers.location.value : null;
  const ok = got === expected;
  if (!ok) {
    failed += 1;
    console.error(`FAIL ${uri}\n  expected: ${expected === null ? 'pass through' : `301 -> ${expected}`}\n  got:      ${got === null ? 'pass through' : `301 -> ${got}`}`);
  }
}

// Query strings survive the redirect.
const qsCases = [
  [{ utm_source: { value: 'facebook' } }, '/cbse-online-tuition?utm_source=facebook'],
  [{ gclid: { value: 'abc123' }, ref: { value: 'wa' } }, '/cbse-online-tuition?gclid=abc123&ref=wa'],
  [{ debug: { value: '' } }, '/cbse-online-tuition?debug'],
];
for (const [querystring, expected] of qsCases) {
  const out = handler(req('/cbse-online-tuition.html', querystring));
  const got = out.statusCode === 301 ? out.headers.location.value : null;
  if (got !== expected) {
    failed += 1;
    console.error(`FAIL query string\n  expected: ${expected}\n  got:      ${got}`);
  }
}

// A pass-through must return the request object itself, not a copy.
const passed = req('/about.html');
if (handler(passed) !== passed.request) {
  failed += 1;
  console.error('FAIL: pass-through did not return the original request object');
}

const total = CASES.length + qsCases.length + 1;
if (failed > 0) {
  console.error(`\n${failed} of ${total} checks failed`);
  process.exit(1);
}
console.log(`cloudfront-url-tidy: all ${total} checks passed`);
