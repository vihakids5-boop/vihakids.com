// "What this sheet practises" and "Tips for parents" for each practice
// worksheet, shown below the sheet and hidden when printing (no-print).
//
// Added 2026-09-29: the worksheet pages were the thinnest pages on the site
// (353–532 rendered words, mostly the questions themselves), which gives a
// search engine little reason to index them and gives a parent no idea what the
// sheet is for before printing it. Every bullet below has to be specific to the
// questions actually on that sheet — generic study advice would just be padding.
//
// Keep goals phrased as what the child does, and tips as what the adult does,
// including the mistake that sheet tends to produce.

export const PRACTICE_WORKSHEET_NOTES = {
  'class-1-3-plurals-s-es-worksheet': {
    goals: [
      'Form regular plurals by adding -s, and hear when a word needs -es instead (bus → buses, box → boxes, branch → branches).',
      'Sort a mixed set of words into the -s and -es groups rather than following one rule mechanically.',
      'Handle words ending in -y: baby → babies after a consonant, but boy → boys after a vowel.',
    ],
    tips: [
      'Ask your child to say the plural aloud before writing it. If they hear an extra syllable — "bus-es" — the word needs -es.',
      'The -y words are where almost every child slips. "Babys" and "monkies" are the two errors to watch for, and both are worth a second attempt rather than a correction.',
      'For Class 1 children, splitting the sheet over two sittings works better than finishing it in one.',
    ],
  },

  'class-1-3-nouns-worksheet': {
    goals: [
      'Find nouns inside a real passage, not in a list — which is much harder than naming nouns on demand.',
      'Sort those nouns into person, place, animal and thing.',
      'Tell a common noun from a proper noun, and capitalise proper nouns correctly.',
    ],
    tips: [
      'Read the story aloud together once before your child starts hunting for nouns. Comprehension first, grammar second.',
      'The test that works at this age: "can you point to it or name it?" If yes, it is probably a noun.',
      'Missing capital letters on proper nouns is the usual lost mark in school tests — worth checking the last column carefully.',
    ],
  },

  'class-2-4-adjectives-comparatives-superlatives-worksheet': {
    goals: [
      'Pick out adjectives and recognise what they describe.',
      'Use -er to compare two things and -est to compare three or more.',
      'Use the irregular forms good/better/best and bad/worse/worst, which no rule produces.',
    ],
    tips: [
      'The word "than" in a sentence is a reliable signal that a comparative is needed — point that out once and it saves many corrections.',
      '"More taller" and "most best" are the two classic errors. The rule to state plainly: either -er/-est or more/most, never both.',
      'Longer adjectives take more/most (more beautiful, most careful), not -er/-est. Children who learn -er first tend to over-apply it.',
    ],
  },

  'class-2-4-contractions-worksheet': {
    goals: [
      'Join two words into a contraction and put the apostrophe exactly where the missing letters were.',
      'Expand contractions back into two words.',
      'Use contractions inside full sentences, which is where schools actually test them.',
    ],
    tips: [
      'Before writing the apostrophe, ask "which letters disappeared?" The apostrophe goes in their place — that one question prevents most mistakes.',
      'its and it\'s are worth a separate minute: it\'s means "it is", while its shows belonging and has no apostrophe.',
      'won\'t is the odd one out — it does not follow the pattern, and it is fine to simply learn it.',
    ],
  },

  'class-2-4-prepositions-worksheet': {
    goals: [
      'Use in, on, under, above, between, beside, behind and in front of to say exactly where something is.',
      'Read a picture and write a full sentence about it rather than a single word.',
      'Describe their own room in a few sentences, using several different prepositions.',
    ],
    tips: [
      'Do the first two or three with real objects — put a pencil under the book, ask for the sentence. Position words stick far better when the child has moved something.',
      '"Between" needs two things, one on each side. Children often use it for "beside".',
      'In the writing task, check for variety: five sentences that all use "on" mean the sheet has not done its job yet.',
    ],
  },

  'class-4-5-multiplication-division-worksheet': {
    goals: [
      'Work through long multiplication with carrying, showing each step.',
      'Divide with remainders, and check the answer instead of assuming it.',
      'Decide which operation a word problem needs before starting to calculate.',
    ],
    tips: [
      'Insist on the check written on the sheet: quotient × divisor + remainder = dividend. It turns division from guesswork into something the child can verify alone.',
      'Most errors at this stage are place-value slips, not table mistakes — keep the columns lined up and squared paper helps.',
      'After each word problem, ask what the remainder means in real terms (leftover sweets, an extra box). That is what the exam question is really testing.',
    ],
  },

  'class-5-6-fractions-decimals-worksheet': {
    goals: [
      'Simplify fractions to lowest terms, and write improper fractions as mixed numbers.',
      'Add and subtract fractions with unlike denominators using the LCM.',
      'Multiply and divide fractions, and convert between fractions, decimals and percentages.',
    ],
    tips: [
      'The single most common error is adding the denominators (1/2 + 1/3 = 2/5). If you see it, go back to a drawn diagram before more practice.',
      'For division, the rule to repeat aloud is "multiply by the reciprocal" — and then check the answer is bigger, which surprises children.',
      'Marks are lost for un-simplified answers even when the arithmetic is right. Treat "simplest form" as part of the answer, not a nicety.',
    ],
  },

  'class-6-7-integers-bodmas-worksheet': {
    goals: [
      'Add, subtract, multiply and divide positive and negative numbers with the sign rules in front of them.',
      'Apply BODMAS in the correct order, including brackets and powers.',
      'Handle word problems where negatives mean something real — temperature, floors below ground, money owed.',
    ],
    tips: [
      'Rewrite subtraction of a negative as addition before solving: 5 − (−3) becomes 5 + 3. Doing that conversion on paper prevents most sign errors.',
      'One step per line. Children who try to do two operations at once are the ones who lose marks, even when they understand the order.',
      'Division and multiplication are done left to right as they appear — not division first. The "DM" in BODMAS is a pair, not a sequence.',
    ],
  },

  'class-7-8-linear-equations-worksheet': {
    goals: [
      'Solve equations in one variable, keeping the two sides balanced.',
      'Collect variable terms on one side when they appear on both.',
      'Turn a word problem into an equation before solving it.',
    ],
    tips: [
      'Ask your child to write both sides on every line. Once steps happen in the head, an error becomes impossible to find later.',
      'Every answer can be checked by substituting it back — the sheet is built so that this always works. A child who checks their own work needs far less correcting.',
      'In word problems, the first line should be "let x be ...". Naming the unknown is half the marks in school exams.',
    ],
  },

  'class-10-quadratic-equations-worksheet': {
    goals: [
      'Solve quadratic equations by factorisation, and know when factorisation will not work.',
      'Use the discriminant b² − 4ac to state the nature of the roots without solving.',
      'Apply the quadratic formula accurately, and find the value of k for equal roots.',
    ],
    tips: [
      'Check b² − 4ac before choosing a method. If it is not a perfect square, stop trying to factorise and go to the formula.',
      'Sign errors in −b are the most commonly lost mark on this topic. Writing the formula out fully before substituting is worth the extra line.',
      'In word problems, reject roots that cannot be real — a negative age, length or number of children. Boards award a mark for saying why it is rejected.',
    ],
  },

  'class-10-trigonometry-worksheet': {
    goals: [
      'Recall the standard-angle table for 0°, 30°, 45°, 60° and 90° without hesitating.',
      'Find the remaining ratios when one is given, and prove identities.',
      'Solve heights-and-distances problems from a properly labelled diagram.',
    ],
    tips: [
      'The table comes first. Almost every other question on this sheet — and in the board paper — depends on it being automatic rather than re-derived.',
      'When proving an identity, work on one side only until it matches the other. Working on both sides at once is the habit examiners penalise.',
      'For heights and distances, no calculation until the diagram is drawn and labelled with the angle of elevation or depression. Most wrong answers are wrong diagrams.',
    ],
  },

  'class-9-motion-numericals-worksheet': {
    goals: [
      'Tell distance from displacement and speed from velocity, in problems where the difference changes the answer.',
      'Use v = u + at, s = ut + ½at² and v² = u² + 2as, choosing the one the given values fit.',
      'Keep units consistent, including converting km/h to m/s.',
    ],
    tips: [
      'Marks in Science numericals are awarded for the layout: given values, formula, substitution, then the answer with its unit. The sheet asks for all four — that is deliberate.',
      'Convert km/h to m/s (multiply by 5/18) before substituting, not after. Mixed units are the most common reason a correct method scores zero.',
      'The sheet says to take g = 10 m/s². If your child\'s school uses 9.8, the working stays identical and only the final number changes.',
    ],
  },

  'class-10-balancing-chemical-equations-worksheet': {
    goals: [
      'Balance equations by changing only the coefficients in front of formulas.',
      'Count atoms of every element on both sides and confirm they match.',
      'Name the reaction type: combination, decomposition, displacement, double displacement.',
    ],
    tips: [
      'Never change a subscript — H₂O cannot become H₂O₂ to make the sums work. This is the one rule that turns a correct method into a wrong one.',
      'A reliable order: metals first, then non-metals, then hydrogen, then oxygen last. Oxygen usually settles by itself.',
      'Before moving to the next equation, count each element out loud on both sides. Children who "look at it and it seems fine" are the ones who lose these marks.',
    ],
  },

  'class-5-8-verb-collocations-worksheet': {
    goals: [
      'Learn which of make, do, have and take goes with everyday nouns — a mistake, homework, a bath, a decision.',
      'Use those pairs inside sentences rather than in isolation.',
      'Spot the wrong verb among options, which is how exams test collocations.',
    ],
    tips: [
      'Collocations are memory work, not rule work. Reading the study table aloud twice does more than reasoning about it.',
      '"Do homework" but "make a mistake" is the pair that causes the most trouble for Indian English speakers — worth over-practising.',
      'Print the sheet twice and do it again a week later. Recall after a gap is what moves these into normal speech.',
    ],
  },

  'class-5-8-english-tenses-worksheet': {
    goals: [
      'Choose the tense from the time clues in a sentence — every night, last summer, since, by next June.',
      'Separate past simple from past perfect when two past events are involved.',
      'Find and fix tense errors, and name the tense of a given sentence.',
    ],
    tips: [
      'Have your child underline the time expression before writing anything. The clue almost always decides the tense.',
      'Past perfect is for the earlier of two past events — "the train had left before we reached". If there is only one past event, it is past simple.',
      '"Since" and "for" go with the present perfect. That single pairing fixes a large share of the errors in the correction exercise.',
    ],
  },
};
