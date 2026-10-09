// Title/description for the non-data-driven React routes. Shared by the page
// components and scripts/prerender.mjs, which bakes them into per-route HTML
// so crawlers get the right head without executing JS.
export const STATIC_ROUTE_HEADS = {
  '/': {
    title: 'Vihakids — Confidence First. Online Tuitions in India',
    description: 'Live 1-on-1 online tuition in English, Hindi, Math, Science and Kannada for Classes 1–10, CBSE, ICSE and State Board. Free 30-minute demo, no commitment.',
  },
  '/register': {
    title: 'Book a Free Demo Class | Vihakids Online Tuitions',
    description: 'Book a free 30-minute online demo class for your child — Classes 1 to 10, CBSE, ICSE and State Board. Takes 30 seconds, no payment, no commitment.',
  },
  '/teach': {
    title: 'Teach with Vihakids | Online Tutor Jobs, Classes 1–10',
    description: 'Join Vihakids as an online tutor: flexible work-from-home hours teaching live 1-on-1 classes in English, Hindi, Math, Science or Kannada, Classes 1–10.',
  },
  '/fees': {
    title: 'Fees | Simple Monthly Fee, No Commitment | Vihakids',
    description: 'How Vihakids fees work: one monthly fee per subject for 8 or more 1-on-1 classes, no registration fee, no annual contract. You decide after a free demo.',
  },
  '/faq': {
    title: 'Parent FAQ | Online Tuition for Classes 1–10 — Vihakids',
    description: 'Straight answers to what parents ask before choosing online tuition for Classes 1–10: 1-on-1 vs batch, tutors, timings, missed classes, fees and safety.',
  },
  '/worksheets': {
    title: 'Free Printable Worksheets for Class 1–10 | Vihakids',
    description: 'Free colourful printable worksheets for Classes 1 to 10: tracing, grammar, fractions, equations, trigonometry, motion and chemistry. Answer keys included.',
  },
  '/hindi-varnamala-tracing-worksheet': {
    title: 'Free Hindi Varnamala Tracing Worksheet | Vihakids',
    description: 'Free printable Hindi Varnamala tracing worksheet: all 13 vowels, 33 consonants and the joined letters, for children starting Hindi. No sign-up needed.',
  },
  '/english-alphabet-tracing-worksheet': {
    title: 'Free A to Z Alphabet Tracing Worksheet | Vihakids',
    description: 'Free printable A to Z tracing worksheet with capital and small letters and a picture word for each, for nursery, LKG, UKG and Class 1. No sign-up needed.',
  },
  '/kannada-alphabet-tracing-worksheet': {
    title: 'Free Kannada Alphabet Tracing Worksheet | Vihakids',
    description: 'Free printable Kannada Varnamale tracing worksheet: all 15 vowels and 34 consonants, for children starting to read and write Kannada. No sign-up needed.',
  },
};
