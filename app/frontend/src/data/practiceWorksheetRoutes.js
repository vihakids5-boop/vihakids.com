// Lightweight list of the answer-keyed practice worksheets: just what the
// router, the prerender step and the sitemap need. The questions themselves
// live in practiceWorksheets.js, which is only loaded on the worksheet pages.
// Keep the two in sync — scripts/prerender.mjs fails the build if a slug here
// has no worksheet data.

export const PRACTICE_WORKSHEET_ROUTES = [
  {
    slug: 'class-1-3-plurals-s-es-worksheet',
    metaTitle: 'Plurals Worksheet for Class 1–3: Add -s, -es or -ies (Free Printable with Answers) | Vihakids',
    metaDescription: 'Free colourful English worksheet for Classes 1 to 3: make plurals by adding -s, -es or -ies, sort words into baskets, with picture clues and a full answer key.',
  },
  {
    slug: 'class-1-3-nouns-worksheet',
    metaTitle: 'Nouns Worksheet for Class 1–3: Person, Place, Animal, Thing (Free Printable) | Vihakids',
    metaDescription: 'Free colourful English worksheet for Classes 1 to 3: read a short story, sort the nouns into person, place, animal and thing, then sort common and proper nouns. Answer key included.',
  },
  {
    slug: 'class-2-4-adjectives-comparatives-superlatives-worksheet',
    metaTitle: 'Adjectives Worksheet for Class 2–4: Comparatives and Superlatives (Free Printable) | Vihakids',
    metaDescription: 'Free colourful English worksheet for Classes 2 to 4: sort adjectives by colour, shape and size, then complete picture sentences with comparatives (-er) and superlatives (-est). Answer key included.',
  },
  {
    slug: 'class-2-4-contractions-worksheet',
    metaTitle: 'Contractions Worksheet for Class 2–4 with Answers (Free Printable) | Vihakids',
    metaDescription: 'Free colourful English worksheet for Classes 2 to 4: write contractions like it’s, don’t and we’re, use them in sentences, and expand them back. Full answer key included.',
  },
  {
    slug: 'class-2-4-prepositions-worksheet',
    metaTitle: 'Prepositions Worksheet for Class 2–4: In, On, Under, Between (Free Printable) | Vihakids',
    metaDescription: 'Free colourful English worksheet for Classes 2 to 4: look at the pictures and choose in, on, under, above, between, beside, behind or in front of, then describe your own room. Answer key included.',
  },
  {
    slug: 'class-4-5-multiplication-division-worksheet',
    metaTitle: 'Class 4–5 Multiplication and Division Worksheet with Answers (Free PDF Print) | Vihakids',
    metaDescription: 'Free printable Class 4 and 5 maths worksheet: 2-digit and 3-digit multiplication, division with remainders and real-life word problems, with a full answer key. CBSE, ICSE and State Board.',
  },
  {
    slug: 'class-5-6-fractions-decimals-worksheet',
    metaTitle: 'Class 5–6 Fractions and Decimals Worksheet with Answers (Free Printable) | Vihakids',
    metaDescription: 'Free printable Class 5 and 6 maths worksheet: simplifying fractions, adding and subtracting unlike fractions, multiplying and dividing fractions, decimals and conversions, with answer key.',
  },
  {
    slug: 'class-6-7-integers-bodmas-worksheet',
    metaTitle: 'Class 6–7 Integers and BODMAS Worksheet with Answers (Free Printable) | Vihakids',
    metaDescription: 'Free printable Class 6 and 7 maths worksheet on integers: addition, subtraction, multiplication and division of negative numbers, BODMAS order of operations and word problems, with answer key.',
  },
  {
    slug: 'class-7-8-linear-equations-worksheet',
    metaTitle: 'Class 7–8 Linear Equations in One Variable Worksheet with Answers | Vihakids',
    metaDescription: 'Free printable Class 7 and 8 maths worksheet: one-step and two-step equations, variables on both sides, equations with fractions and decimals, and word problems, with step-by-step answers.',
  },
  {
    slug: 'class-9-motion-numericals-worksheet',
    metaTitle: 'Class 9 Motion Numericals Worksheet with Answers — Equations of Motion | Vihakids',
    metaDescription: 'Free printable Class 9 science (physics) worksheet on motion: speed, velocity, acceleration, distance and displacement, and the three equations of motion, with worked answers. NCERT aligned.',
  },
  {
    slug: 'class-10-quadratic-equations-worksheet',
    metaTitle: 'Class 10 Quadratic Equations Worksheet with Answers (Free Printable) | Vihakids',
    metaDescription: 'Free printable Class 10 maths worksheet: solving quadratic equations by factorisation and the quadratic formula, nature of roots using the discriminant, and word problems, with full answer key.',
  },
  {
    slug: 'class-10-trigonometry-worksheet',
    metaTitle: 'Class 10 Trigonometry Worksheet with Answers — Ratios, Identities, Heights and Distances | Vihakids',
    metaDescription: 'Free printable Class 10 trigonometry worksheet: standard angle values, evaluating expressions, finding ratios, proving identities, and heights and distances problems, with worked answers.',
  },
  {
    slug: 'class-10-balancing-chemical-equations-worksheet',
    metaTitle: 'Class 10 Balancing Chemical Equations Worksheet with Answers | Vihakids',
    metaDescription: 'Free printable Class 10 chemistry worksheet: balance 14 chemical equations and identify combination, decomposition, displacement, double displacement and redox reactions, with answer key. NCERT aligned.',
  },
  {
    slug: 'class-5-8-verb-collocations-worksheet',
    metaTitle: 'Make, Do, Have, Take Collocations Worksheet for Class 5–8 (Free Printable) | Vihakids',
    metaDescription: 'Free colourful English worksheet for Classes 5 to 8: a study table of 20 everyday collocations with make, do, have and take, their meanings and examples, plus fill-in and multiple-choice practice with answers.',
  },
  {
    slug: 'class-5-8-english-tenses-worksheet',
    metaTitle: 'English Tenses Worksheet for Class 5–8 with Answers (Free Printable) | Vihakids',
    metaDescription: 'Free printable English grammar worksheet on tenses for Classes 5 to 8: fill in the correct verb form, correct the errors and name the tense, with a full answer key.',
  },
];
