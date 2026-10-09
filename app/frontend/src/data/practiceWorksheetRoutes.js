// Lightweight list of the answer-keyed practice worksheets: just what the
// router, the prerender step and the sitemap need. The questions themselves
// live in practiceWorksheets.js, which is only loaded on the worksheet pages.
// Keep the two in sync — scripts/prerender.mjs fails the build if a slug here
// has no worksheet data.

export const PRACTICE_WORKSHEET_ROUTES = [
  {
    slug: 'class-1-3-plurals-s-es-worksheet',
    metaTitle: 'Plurals Worksheet for Class 1–3: -s, -es, -ies | Vihakids',
    metaDescription: 'Free English worksheet for Classes 1–3: make plurals with -s, -es or -ies and sort words into baskets, with picture clues and a full answer key.',
  },
  {
    slug: 'class-1-3-nouns-worksheet',
    metaTitle: 'Nouns Worksheet for Class 1–3 (Free Printable) | Vihakids',
    metaDescription: 'Free English worksheet for Classes 1–3: read a story, sort nouns into person, place, animal and thing, then common and proper nouns. Answer key included.',
  },
  {
    slug: 'class-2-4-adjectives-comparatives-superlatives-worksheet',
    metaTitle: 'Adjectives Worksheet for Class 2–4 with Answers | Vihakids',
    metaDescription: 'Free English worksheet for Classes 2–4: sort adjectives, then complete picture sentences with comparatives (-er) and superlatives (-est). Answers included.',
  },
  {
    slug: 'class-2-4-contractions-worksheet',
    metaTitle: 'Contractions Worksheet for Class 2–4 | Vihakids',
    metaDescription: 'Free English worksheet for Classes 2–4: write contractions like it’s and don’t, use them in sentences and expand them back. Full answer key included.',
  },
  {
    slug: 'class-2-4-prepositions-worksheet',
    metaTitle: 'Prepositions Worksheet for Class 2–4 (Printable) | Vihakids',
    metaDescription: 'Free English worksheet for Classes 2–4: pick in, on, under, above, between, beside, behind or in front of from pictures, then describe your room. Answers.',
  },
  {
    slug: 'class-4-5-multiplication-division-worksheet',
    metaTitle: 'Class 4–5 Multiplication and Division Worksheet | Vihakids',
    metaDescription: 'Free Class 4–5 maths worksheet: 2- and 3-digit multiplication, division with remainders and real-life word problems, with a full answer key.',
  },
  {
    slug: 'class-5-6-fractions-decimals-worksheet',
    metaTitle: 'Class 5–6 Fractions and Decimals Worksheet | Vihakids',
    metaDescription: 'Free Class 5–6 maths worksheet: simplify, add, subtract, multiply and divide fractions, work with decimals and convert between them. Answer key included.',
  },
  {
    slug: 'class-6-7-integers-bodmas-worksheet',
    metaTitle: 'Class 6–7 Integers and BODMAS Worksheet | Vihakids',
    metaDescription: 'Free Class 6–7 maths worksheet: add, subtract, multiply and divide negative numbers, BODMAS order of operations and word problems, with answer key.',
  },
  {
    slug: 'class-7-8-linear-equations-worksheet',
    metaTitle: 'Class 7–8 Linear Equations Worksheet | Vihakids',
    metaDescription: 'Free Class 7–8 maths worksheet: one- and two-step equations, variables on both sides, fractions and decimals, and word problems, with step-by-step answers.',
  },
  {
    slug: 'class-9-motion-numericals-worksheet',
    metaTitle: 'Class 9 Motion Numericals Worksheet with Answers | Vihakids',
    metaDescription: 'Free Class 9 physics worksheet on motion: speed, velocity, acceleration, distance and displacement and the three equations of motion, with worked answers.',
  },
  {
    slug: 'class-10-quadratic-equations-worksheet',
    metaTitle: 'Class 10 Quadratic Equations Worksheet (Answers) | Vihakids',
    metaDescription: 'Free Class 10 maths worksheet: solve by factorisation and the quadratic formula, nature of roots and word problems, with a full answer key.',
  },
  {
    slug: 'class-10-trigonometry-worksheet',
    metaTitle: 'Class 10 Trigonometry Worksheet with Answers | Vihakids',
    metaDescription: 'Free Class 10 trigonometry worksheet: standard angles, evaluating ratios, proving identities, and heights and distances, with worked answers.',
  },
  {
    slug: 'class-10-balancing-chemical-equations-worksheet',
    metaTitle: 'Class 10 Balancing Chemical Equations Worksheet | Vihakids',
    metaDescription: 'Free Class 10 chemistry worksheet: balance 14 equations and name combination, decomposition, displacement and redox reactions. Answer key included.',
  },
  {
    slug: 'class-5-8-verb-collocations-worksheet',
    metaTitle: 'Make, Do, Have, Take Worksheet for Class 5–8 | Vihakids',
    metaDescription: 'Free English worksheet for Classes 5–8: 20 everyday collocations with make, do, have and take, with meanings, examples and practice with answers.',
  },
  {
    slug: 'class-5-8-english-tenses-worksheet',
    metaTitle: 'English Tenses Worksheet for Class 5–8 (Answers) | Vihakids',
    metaDescription: 'Free English grammar worksheet on tenses for Classes 5–8: fill in the correct verb form, correct the errors and name the tense, with a full answer key.',
  },
];
