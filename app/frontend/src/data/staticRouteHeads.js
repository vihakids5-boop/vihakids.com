// Title/description for the non-data-driven React routes. Shared by the page
// components and scripts/prerender.mjs, which bakes them into per-route HTML
// so crawlers get the right head without executing JS.
export const STATIC_ROUTE_HEADS = {
  '/': {
    title: 'Vihakids — Confidence First. Online Tuitions in India',
    description: 'Live 1-on-1 online tuitions in English, Hindi, Math, Science and Kannada for Classes 1 to 10 (CBSE, ICSE and State Board), anywhere in India. Patient tutors who teach from your child’s own textbook. Book a free 30-minute demo — no payment, no commitment.',
  },
  '/register': {
    title: 'Book a Free Demo Class | Vihakids Online Tuitions',
    description: 'Book a free online demo class for your child in English, Hindi, Math, Science or Kannada — Classes 1 to 10, CBSE, ICSE and State Board. Takes 30 seconds, no payment, no commitment.',
  },
  '/teach': {
    title: 'Teach with Vihakids | Online Tutor Jobs in English, Hindi, Math, Science & Kannada',
    description: 'Join Vihakids as an online tutor. Flexible work-from-home hours teaching live 1-on-1 and small-batch classes in English, Hindi, Math, Science and Kannada for Classes 1 to 10.',
  },
  '/fees': {
    title: 'Fees | Vihakids — Online English, Hindi, Math, Science & Kannada Tuitions',
    description: 'Simple, affordable monthly fees for Vihakids online tuitions — one clear price per subject, per month, with no registration fee and no annual contract. Built for every Indian family.',
  },
  '/faq': {
    title: 'Parent FAQ | Online Tuition for Classes 1–10 — Vihakids',
    description: 'Straight answers to the questions parents ask before choosing online tuition for Classes 1 to 10: 1-on-1 vs batch, who the tutor is, timings, missed classes, screen time, fees, refunds, no EMI, no sales calls, progress updates and safety.',
  },
  '/worksheets': {
    title: 'Free Printable Worksheets for Class 1 to 10 with Answers — Math, Science, English | Vihakids',
    description: 'Free colourful printable worksheets for Classes 1 to 10: alphabet tracing, plurals, nouns, adjectives, tenses, fractions, integers, linear and quadratic equations, trigonometry, motion and chemical equations. Answer keys included.',
  },
  '/hindi-varnamala-tracing-worksheet': {
    title: 'Free Hindi Varnamala Tracing Worksheet — Printable Swar & Vyanjan | Vihakids',
    description: 'A free, printable Hindi alphabet (Varnamala) tracing worksheet — all 13 vowels (swar), 33 consonants (vyanjan) and the joined letters क्ष, त्र, ज्ञ, श्र. For children starting Hindi. Print at home, no sign-up required.',
  },
  '/english-alphabet-tracing-worksheet': {
    title: 'Free English Alphabet Tracing Worksheet A to Z — Capital & Small Letters | Vihakids',
    description: 'A free, printable A to Z tracing worksheet with capital and small letters side by side and a picture word for each (A for apple). For nursery, LKG, UKG and Class 1. Print at home, no sign-up required.',
  },
  '/kannada-alphabet-tracing-worksheet': {
    title: 'Free Kannada Alphabet (Varnamale) Tracing Worksheet — Printable | Vihakids',
    description: 'A free, printable Kannada Varnamale tracing worksheet — all 15 vowels (swaragalu) and 34 consonants (vyanjanagalu), for children just starting to read and write Kannada. Print at home, no sign-up required.',
  },
};
