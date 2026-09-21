// Content for the answer-keyed practice worksheets (see practiceWorksheetRoutes.js
// for the slug list and <head> text). Everything here is deterministic, so the
// build-time render and the browser render always match.
//
// Arithmetic answers are computed from the question numbers below, never typed
// by hand. Algebra, trigonometry and physics answers are typed, and checked by
// substituting them back in (scratch verification script, run before deploy).
//
// Section types rendered by PracticeWorksheetPage:
//   rule      tip box              { title, points: [] }
//   story     reading passage      { text }
//   bank      word bank chips      { words: [] }
//   grid      small cards          { items: [{ prompt, emoji?, answer }], arrow? }
//   fill      numbered sentences   { items: [{ text (use ___ for the blank), hint?, emoji?, answer }] }
//   sort      columns to fill      { columns: [{ label, emoji?, answers: [] }], rows }
//   scenes    picture sentences    { items: [{ scene: { type, a, b, c? }, text, answer }] }
//   problems  work-space questions { items: [{ text, answer }], lines }
//   table     fill-in table        { head: [], rows: [[cell|null]], answerRows: [[]] }
//   writing   free writing         { prompt, lines, answer }

const MINUS = '−';
const fmt = (n) => (n < 0 ? MINUS + Math.abs(n) : String(n));
const neg = (n) => (n < 0 ? `(${fmt(n)})` : String(n));

// ---------- fractions ----------
const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));
function frac(n, d) {
  const g = gcd(n, d);
  return { n: n / g, d: d / g };
}
function fracText({ n, d }) {
  if (d === 1) return String(n);
  if (Math.abs(n) > d) {
    const whole = Math.trunc(n / d);
    const rest = Math.abs(n % d);
    return `${n / d > 0 ? '' : MINUS}${Math.abs(whole)} ${rest}/${d}`;
  }
  return `${n}/${d}`;
}
const add = (a, b) => frac(a.n * b.d + b.n * a.d, a.d * b.d);
const sub = (a, b) => frac(a.n * b.d - b.n * a.d, a.d * b.d);
const mul = (a, b) => frac(a.n * b.n, a.d * b.d);
const div = (a, b) => frac(a.n * b.d, a.d * b.n);
const F = (n, d = 1) => ({ n, d });
const show = ({ n, d }) => (d === 1 ? String(n) : `${n}/${d}`);
const mixed = (w, n, d) => ({ n: w * d + n, d, label: `${w} ${n}/${d}` });

// ---------- decimals (rounded to kill float noise like 2.5 × 1.2 = 3.0000000000000004) ----------
const dec = (x) => String(Number(x.toFixed(6)));

// ---------- chemistry ----------
const SUBSCRIPTS = '₀₁₂₃₄₅₆₇₈₉';
// No regex lookbehind here: it throws on older iPhones (Safari < 16.4).
const chem = (formula) => formula.replace(/([A-Za-z)])(\d+)/g, (_, before, digits) => before + [...digits].map((c) => SUBSCRIPTS[c]).join(''));
function equation(reactants, products, coeffs, note = '') {
  const side = (list, cs) => list.map((f, i) => `${cs && cs[i] > 1 ? cs[i] : ''}${chem(f)}`).join(' + ');
  const tail = note ? ` (${note})` : '';
  return {
    text: `${side(reactants)} → ${side(products)}${tail}`,
    answer: `${side(reactants, coeffs.slice(0, reactants.length))} → ${side(products, coeffs.slice(reactants.length))}`,
    // Kept for the verification script (atom counts must match on both sides).
    check: { reactants, products, coeffs },
  };
}

export const PRACTICE_WORKSHEETS = {
  // ============================ ENGLISH, CLASSES 1–4 ============================
  'class-1-3-plurals-s-es-worksheet': {
    subject: 'English',
    classes: 'Class 1–3',
    mascot: '🐝',
    title: 'Plurals: One or Many?',
    subtitle: 'Add -s, -es or -ies',
    minutes: 20,
    intro: 'Plurals are how we say "more than one". This worksheet starts with picture words, moves on to sorting, and ends with the trickier -y words.',
    tuition: { to: '/english-online-tuition', label: 'online English tuition' },
    sections: [
      {
        type: 'rule',
        title: 'Plural rules',
        points: [
          'Most words: just add -s. cat → cats',
          'Words ending in s, ss, sh, ch, x or z: add -es. bus → buses',
          'Consonant + y: change y to i and add -es. baby → babies',
          'Vowel + y: just add -s. boy → boys',
        ],
      },
      {
        type: 'grid',
        title: 'Write the plural',
        instructions: 'Look at the picture and write the word for many.',
        arrow: true,
        items: [
          ['🐝', 'bee', 'bees'], ['🥛', 'glass', 'glasses'], ['🐱', 'cat', 'cats'], ['🪁', 'kite', 'kites'],
          ['🍑', 'peach', 'peaches'], ['⭐', 'star', 'stars'], ['🪥', 'brush', 'brushes'], ['⚽', 'ball', 'balls'],
          ['📦', 'box', 'boxes'], ['✏️', 'pencil', 'pencils'], ['🌳', 'tree', 'trees'], ['🚌', 'bus', 'buses'],
          ['🎩', 'hat', 'hats'], ['🦊', 'fox', 'foxes'], ['🥪', 'sandwich', 'sandwiches'], ['👗', 'dress', 'dresses'],
        ].map(([emoji, prompt, answer]) => ({ emoji, prompt, answer })),
      },
      {
        type: 'sort',
        title: 'Fill the baskets',
        instructions: 'Does each word need -s or -es? Write its plural in the right basket.',
        bank: ['dog', 'church', 'cup', 'torch', 'pen', 'class', 'book', 'wish', 'frog', 'lunch', 'map', 'beach'],
        rows: 6,
        columns: [
          { label: 'Add -s', emoji: '🧺', answers: ['dogs', 'cups', 'pens', 'books', 'frogs', 'maps'] },
          { label: 'Add -es', emoji: '🧺', answers: ['churches', 'torches', 'classes', 'wishes', 'lunches', 'beaches'] },
        ],
      },
      {
        type: 'grid',
        title: 'Tricky -y words',
        instructions: 'Is there a vowel before the y? Choose -s or -ies.',
        arrow: true,
        items: [
          ['👶', 'baby', 'babies'], ['🧸', 'toy', 'toys'], ['🏙️', 'city', 'cities'], ['🔑', 'key', 'keys'],
          ['📖', 'story', 'stories'], ['☀️', 'day', 'days'], ['🐶', 'puppy', 'puppies'], ['🐒', 'monkey', 'monkeys'],
        ].map(([emoji, prompt, answer]) => ({ emoji, prompt, answer })),
      },
    ],
  },

  'class-1-3-nouns-worksheet': {
    subject: 'English',
    classes: 'Class 1–3',
    mascot: '🐄',
    title: 'Nouns Around Us',
    subtitle: 'Person, place, animal or thing?',
    minutes: 20,
    intro: 'A noun is the name of a person, place, animal or thing. Read the story, find the nouns, and sort them. Then sort common and proper nouns.',
    tuition: { to: '/english-online-tuition', label: 'online English tuition' },
    sections: [
      {
        type: 'story',
        title: 'Read the story',
        text: 'Meera and her grandfather went to the market. They saw a cow, a goat and many parrots. Grandfather bought mangoes, a basket and a new umbrella. Then they walked to the temple and the park. A farmer gave Meera a flower. At home, her mother made dosa, and the cat slept on the mat.',
      },
      {
        type: 'sort',
        title: 'Sort the nouns',
        instructions: 'Find the nouns in the story and write each one in the right column. Write each noun only once.',
        rows: 6,
        columns: [
          { label: 'Person', emoji: '🧑', answers: ['Meera', 'grandfather', 'farmer', 'mother'] },
          { label: 'Place', emoji: '🏠', answers: ['market', 'temple', 'park', 'home'] },
          { label: 'Animal', emoji: '🐐', answers: ['cow', 'goat', 'parrots', 'cat'] },
          { label: 'Thing', emoji: '🧺', answers: ['mangoes', 'basket', 'umbrella', 'flower', 'dosa', 'mat'] },
        ],
      },
      {
        type: 'rule',
        title: 'Common and proper nouns',
        points: [
          'A common noun is a general name: river, teacher, city.',
          'A proper noun is a special name and starts with a capital letter: Kaveri, Mrs Rao, Mysuru.',
        ],
      },
      {
        type: 'sort',
        title: 'Common or proper?',
        instructions: 'Write each word in the right column.',
        bank: ['Bengaluru', 'river', 'Diwali', 'teacher', 'Priya', 'India', 'school', 'Monday'],
        rows: 5,
        columns: [
          { label: 'Common noun', emoji: '📦', answers: ['river', 'teacher', 'school'] },
          { label: 'Proper noun', emoji: '🏷️', answers: ['Bengaluru', 'Diwali', 'Priya', 'India', 'Monday'] },
        ],
      },
    ],
  },

  'class-2-4-adjectives-comparatives-superlatives-worksheet': {
    subject: 'English',
    classes: 'Class 2–4',
    mascot: '🦒',
    title: 'Describing Words',
    subtitle: 'Adjectives, comparatives and superlatives',
    minutes: 25,
    intro: 'Adjectives describe nouns. We use comparatives (-er) to compare two things and superlatives (-est) to compare three or more.',
    tuition: { to: '/english-online-tuition', label: 'online English tuition' },
    sections: [
      {
        type: 'sort',
        title: 'Adjective sort',
        instructions: 'Is each adjective about colour, shape or size? Write it in the right column.',
        bank: ['red', 'round', 'tiny', 'green', 'square', 'huge', 'blue', 'oval', 'tall', 'yellow', 'triangular', 'short', 'pink', 'rectangular', 'little'],
        rows: 5,
        columns: [
          { label: 'Colour', emoji: '🎨', answers: ['red', 'green', 'blue', 'yellow', 'pink'] },
          { label: 'Shape', emoji: '🔺', answers: ['round', 'square', 'oval', 'triangular', 'rectangular'] },
          { label: 'Size', emoji: '📏', answers: ['tiny', 'huge', 'tall', 'short', 'little'] },
        ],
      },
      {
        type: 'rule',
        title: 'How to compare',
        points: [
          'Short words: add -er / -est. fast → faster → fastest',
          'Ends in e: add -r / -st. wide → wider → widest',
          'One vowel + one consonant: double it. big → bigger → biggest',
          'Ends in y: change to -ier / -iest. happy → happier → happiest',
          'Long words: use more / most. beautiful → more beautiful → most beautiful',
        ],
      },
      {
        type: 'fill',
        title: 'Compare two',
        instructions: 'Write the comparative form of the word in brackets.',
        items: [
          { emoji: '🐘 🐕', text: 'The elephant is ___ than the dog.', hint: 'heavy', answer: 'heavier' },
          { emoji: '🐎 🐌', text: 'The horse is ___ than the snail.', hint: 'fast', answer: 'faster' },
          { emoji: '🌴 🌷', text: 'The coconut tree is ___ than the flower.', hint: 'tall', answer: 'taller' },
          { emoji: '🐭 🐈', text: 'The mouse is ___ than the cat.', hint: 'small', answer: 'smaller' },
          { emoji: '☀️ ❄️', text: 'Summer is ___ than winter.', hint: 'hot', answer: 'hotter' },
          { emoji: '🍉 🍋', text: 'A watermelon is ___ than a lemon.', hint: 'big', answer: 'bigger' },
          { emoji: '🦁 🐑', text: 'The lion is ___ than the sheep.', hint: 'strong', answer: 'stronger' },
          { emoji: '📘 📗', text: 'This storybook is ___ than that one.', hint: 'interesting', answer: 'more interesting' },
        ],
      },
      {
        type: 'fill',
        title: 'The best of all',
        instructions: 'Write the superlative form of the word in brackets. Remember "the".',
        items: [
          { emoji: '🐋', text: 'The blue whale is ___ animal in the world.', hint: 'big', answer: 'the biggest' },
          { emoji: '🐆', text: 'The cheetah is ___ animal on land.', hint: 'fast', answer: 'the fastest' },
          { emoji: '🦒', text: 'The giraffe is ___ animal in the zoo.', hint: 'tall', answer: 'the tallest' },
          { emoji: '🏔️', text: 'Mount Everest is ___ mountain on Earth.', hint: 'high', answer: 'the highest' },
          { emoji: '😄', text: 'Priya is ___ girl in our class today.', hint: 'happy', answer: 'the happiest' },
          { emoji: '🌈', text: 'This is ___ rainbow I have ever seen.', hint: 'beautiful', answer: 'the most beautiful' },
        ],
      },
    ],
  },

  'class-2-4-contractions-worksheet': {
    subject: 'English',
    classes: 'Class 2–4',
    mascot: '✂️',
    title: 'Contractions',
    subtitle: 'Two words become one',
    minutes: 20,
    intro: 'A contraction joins two words into one. An apostrophe ( ’ ) takes the place of the missing letters: do not → don’t.',
    tuition: { to: '/english-online-tuition', label: 'online English tuition' },
    sections: [
      {
        type: 'rule',
        title: 'Remember',
        points: [
          'The apostrophe goes exactly where the letters were taken out: is not → isn’t.',
          'Two special ones: will not → won’t, and cannot → can’t.',
        ],
      },
      {
        type: 'grid',
        title: 'Squeeze them together',
        instructions: 'Write the contraction.',
        arrow: true,
        items: [
          ['it is', 'it’s'], ['what is', 'what’s'], ['I am', 'I’m'], ['do not', 'don’t'],
          ['cannot', 'can’t'], ['we are', 'we’re'], ['they have', 'they’ve'], ['she will', 'she’ll'],
          ['is not', 'isn’t'], ['you are', 'you’re'], ['let us', 'let’s'], ['would not', 'wouldn’t'],
        ].map(([prompt, answer]) => ({ prompt, answer })),
      },
      {
        type: 'bank',
        title: 'Word bank',
        words: ['It’s', 'I’m', 'don’t', 'They’re', 'can’t', 'She’s', 'Let’s', 'didn’t'],
      },
      {
        type: 'fill',
        title: 'Use it in a sentence',
        instructions: 'Replace the words in brackets with a contraction from the word bank.',
        items: [
          { emoji: '☔', text: '___ raining, so take your umbrella.', hint: 'It is', answer: 'It’s' },
          { emoji: '👵', text: '___ going to my grandmother’s house.', hint: 'I am', answer: 'I’m' },
          { emoji: '🏃', text: 'Please ___ run in the corridor.', hint: 'do not', answer: 'don’t' },
          { emoji: '⚽', text: '___ playing in the park.', hint: 'They are', answer: 'They’re' },
          { emoji: '🔑', text: 'We ___ find the key anywhere.', hint: 'cannot', answer: 'can’t' },
          { emoji: '👭', text: '___ my best friend.', hint: 'She is', answer: 'She’s' },
          { emoji: '🎵', text: '___ sing a song together.', hint: 'Let us', answer: 'Let’s' },
          { emoji: '🍱', text: 'He ___ finish his lunch.', hint: 'did not', answer: 'didn’t' },
        ],
      },
      {
        type: 'grid',
        title: 'Open them up',
        instructions: 'Write the two words that make each contraction.',
        arrow: true,
        items: [
          ['won’t', 'will not'], ['shouldn’t', 'should not'], ['we’ll', 'we will'],
          ['there’s', 'there is'], ['you’ve', 'you have'], ['aren’t', 'are not'],
        ].map(([prompt, answer]) => ({ prompt, answer })),
      },
    ],
  },

  'class-2-4-prepositions-worksheet': {
    subject: 'English',
    classes: 'Class 2–4',
    mascot: '🐱',
    title: 'Where Is It?',
    subtitle: 'Prepositions of place',
    minutes: 20,
    intro: 'Prepositions tell us where something is: in, on, under, above, between, beside, behind and in front of. Look carefully at each picture.',
    tuition: { to: '/english-online-tuition', label: 'online English tuition' },
    sections: [
      {
        type: 'bank',
        title: 'Word bank',
        words: ['on', 'under', 'in', 'above', 'between', 'beside', 'behind', 'in front of'],
      },
      {
        type: 'scenes',
        title: 'Look and write',
        instructions: 'Look at each picture and fill in the preposition.',
        items: [
          { scene: { type: 'on', a: '🐱', b: '📦' }, text: 'The cat is ___ the box.', answer: 'on' },
          { scene: { type: 'under', a: '⚽', b: '🪑' }, text: 'The ball is ___ the chair.', answer: 'under' },
          { scene: { type: 'in', a: '🍎', b: '🧺' }, text: 'The apple is ___ the basket.', answer: 'in' },
          { scene: { type: 'above', a: '🌙', b: '🏠' }, text: 'The moon is ___ the house.', answer: 'above' },
          { scene: { type: 'between', a: '🐶', b: '👦', c: '👧' }, text: 'The puppy is ___ the boy and the girl.', answer: 'between' },
          { scene: { type: 'beside', a: '🌳', b: '🏠' }, text: 'The tree is ___ the house.', answer: 'beside (or next to)' },
          { scene: { type: 'behind', a: '🐰', b: '🌳' }, text: 'The rabbit is hiding ___ the tree.', answer: 'behind' },
          { scene: { type: 'infront', a: '🚲', b: '🏫' }, text: 'The bicycle is ___ the school.', answer: 'in front of' },
        ],
      },
      {
        type: 'writing',
        title: 'My room',
        prompt: 'Write four sentences about things in your room. Use on, in, under and beside.',
        lines: 4,
        answer: 'Answers will vary. Example: My books are on the shelf. My shoes are under the bed.',
      },
    ],
  },

  // ============================ MATH ============================
  'class-4-5-multiplication-division-worksheet': {
    subject: 'Math',
    classes: 'Class 4–5',
    mascot: '🧮',
    title: 'Multiply and Divide',
    subtitle: 'Long multiplication, division with remainders and word problems',
    minutes: 40,
    intro: 'Show your working in the space given. Check each division by multiplying back: quotient × divisor + remainder = dividend.',
    tuition: { to: '/math-online-tuition', label: 'online Math tuition' },
    sections: [
      {
        type: 'problems',
        title: 'Multiply',
        compact: true,
        lines: 3,
        items: [[34, 12], [56, 23], [78, 19], [125, 4], [243, 6], [309, 8], [47, 35], [64, 58], [417, 7], [88, 26]]
          .map(([a, b]) => ({ text: `${a} × ${b} =`, answer: String(a * b) })),
      },
      {
        type: 'problems',
        title: 'Divide',
        instructions: 'Write the quotient and the remainder (R).',
        compact: true,
        lines: 3,
        items: [[96, 4], [125, 5], [347, 6], [500, 8], [729, 9], [1000, 7], [462, 11], [365, 12]]
          .map(([n, d]) => ({
            text: `${n} ÷ ${d} =`,
            answer: n % d === 0 ? String(n / d) : `${Math.floor(n / d)} R ${n % d}`,
          })),
      },
      {
        type: 'problems',
        title: 'Word problems',
        lines: 3,
        items: [
          { text: '🚌 A school bus carries 48 children. How many children can 7 such buses carry?', answer: `${48 * 7} children` },
          { text: '✏️ A box holds 24 pencils. How many boxes are needed for 600 pencils?', answer: `${600 / 24} boxes` },
          { text: '📚 Ravi reads 35 pages every day. How many pages does he read in 3 weeks?', answer: `35 × 21 = ${35 * 21} pages` },
          { text: '💰 ₹1,250 is shared equally among 5 friends. How much does each friend get?', answer: `₹${1250 / 5}` },
          { text: '🍪 A baker packs 150 cookies into packets of 12. How many full packets can she make, and how many cookies are left over?', answer: `${Math.floor(150 / 12)} packets, ${150 % 12} cookies left over` },
        ],
      },
    ],
  },

  'class-5-6-fractions-decimals-worksheet': {
    subject: 'Math',
    classes: 'Class 5–6',
    mascot: '🍕',
    title: 'Fractions and Decimals',
    subtitle: 'Simplify, add, subtract, multiply, divide and convert',
    minutes: 45,
    intro: 'Give fraction answers in their simplest form. Write improper fractions as mixed numbers.',
    tuition: { to: '/math-online-tuition', label: 'online Math tuition' },
    sections: [
      {
        type: 'rule',
        title: 'Quick reminders',
        points: [
          'Simplest form: divide top and bottom by their highest common factor (HCF).',
          'Adding unlike fractions: first make the denominators the same using the LCM.',
          'Dividing by a fraction: multiply by its reciprocal. a/b ÷ c/d = a/b × d/c',
        ],
      },
      {
        type: 'problems',
        title: 'Simplify',
        compact: true,
        lines: 1,
        items: [[12, 18], [15, 25], [45, 60], [14, 49], [36, 81], [20, 32]]
          .map(([n, d]) => ({ text: `${n}/${d} =`, answer: fracText(frac(n, d)) })),
      },
      {
        type: 'problems',
        title: 'Add and subtract',
        compact: true,
        lines: 2,
        items: [
          [F(1, 2), '+', F(1, 3)], [F(3, 4), MINUS, F(1, 6)], [F(2, 5), '+', F(3, 10)], [F(5, 6), MINUS, F(3, 8)],
          [mixed(1, 1, 2), '+', mixed(2, 2, 3)], [mixed(3, 1, 4), MINUS, mixed(1, 2, 3)],
        ].map(([a, op, b]) => ({
          text: `${a.label || show(a)} ${op} ${b.label || show(b)} =`,
          answer: fracText(op === '+' ? add(a, b) : sub(a, b)),
        })),
      },
      {
        type: 'problems',
        title: 'Multiply and divide',
        compact: true,
        lines: 2,
        items: [
          [F(2, 3), '×', F(3, 4)], [F(5, 6), '÷', F(5, 12)], [F(3, 5), '×', F(10)], [F(7, 8), '÷', F(2)],
          [F(4, 9), '×', F(3, 8)], [mixed(2, 1, 4), '÷', F(3, 4)],
        ].map(([a, op, b]) => ({
          text: `${a.label || show(a)} ${op} ${b.label || show(b)} =`,
          answer: fracText(op === '×' ? mul(a, b) : div(a, b)),
        })),
      },
      {
        type: 'problems',
        title: 'Decimals',
        compact: true,
        lines: 2,
        items: [
          { text: '3.75 + 2.6 =', answer: dec(3.75 + 2.6) },
          { text: `10 ${MINUS} 4.28 =`, answer: dec(10 - 4.28) },
          { text: '2.5 × 1.2 =', answer: dec(2.5 * 1.2) },
          { text: '7.2 ÷ 0.8 =', answer: dec(7.2 / 0.8) },
          { text: '0.45 × 100 =', answer: dec(0.45 * 100) },
          { text: '6.3 ÷ 10 =', answer: dec(6.3 / 10) },
        ],
      },
      {
        type: 'problems',
        title: 'Fraction to decimal and percent',
        compact: true,
        lines: 1,
        items: [[3, 4], [7, 8], [2, 5], [9, 20]].map(([n, d]) => ({
          text: `${n}/${d} = ____ = ____ %`,
          answer: `${dec(n / d)} = ${dec((n / d) * 100)}%`,
        })),
      },
      {
        type: 'problems',
        title: 'Word problems',
        lines: 3,
        items: [
          { text: '🍫 Anu ate 2/5 of a chocolate bar and her brother ate 1/4 of it. What fraction of the bar did they eat altogether?', answer: `2/5 + 1/4 = ${fracText(add(F(2, 5), F(1, 4)))}` },
          { text: '🥛 A jug holds 1 3/4 litres of milk. How many glasses of 1/4 litre can be filled?', answer: `1 3/4 ÷ 1/4 = ${fracText(div(F(7, 4), F(1, 4)))} glasses` },
          { text: '🛒 Rice costs ₹64.50 per kg. What is the cost of 2.5 kg?', answer: `₹${dec(64.5 * 2.5)}` },
        ],
      },
    ],
  },

  'class-6-7-integers-bodmas-worksheet': {
    subject: 'Math',
    classes: 'Class 6–7',
    mascot: '🌡️',
    title: 'Integers and BODMAS',
    subtitle: 'Positive and negative numbers, order of operations',
    minutes: 40,
    intro: 'Watch the signs carefully. For BODMAS, solve Brackets first, then Orders (powers), then Division and Multiplication from left to right, then Addition and Subtraction from left to right.',
    tuition: { to: '/math-online-tuition', label: 'online Math tuition' },
    sections: [
      {
        type: 'rule',
        title: 'Sign rules',
        points: [
          '(+) × (+) = +     (−) × (−) = +',
          '(+) × (−) = −     (−) × (+) = −   (the same rules work for division)',
          'Subtracting a negative is the same as adding: 5 − (−3) = 5 + 3',
        ],
      },
      {
        type: 'problems',
        title: 'Integer operations',
        compact: true,
        lines: 1,
        items: [
          [`${neg(-7)} + 12`, -7 + 12], [`${neg(-15)} ${MINUS} ${neg(-9)}`, -15 - -9], [`${neg(-8)} × 6`, -8 * 6],
          [`${neg(-72)} ÷ ${neg(-9)}`, -72 / -9], [`14 ${MINUS} ${neg(-6)}`, 14 - -6], [`${neg(-3)} × ${neg(-4)} × ${neg(-5)}`, -3 * -4 * -5],
          [`${neg(-100)} ÷ 25`, -100 / 25], [`0 ${MINUS} ${neg(-17)}`, 0 - -17],
        ].map(([t, v]) => ({ text: `${t} =`, answer: fmt(v) })),
      },
      {
        type: 'problems',
        title: 'BODMAS',
        compact: true,
        lines: 2,
        items: [
          [`18 ${MINUS} 3 × 4`, 18 - 3 * 4], [`(18 ${MINUS} 3) × 4`, (18 - 3) * 4], ['48 ÷ 6 × 2', (48 / 6) * 2],
          [`5 + 2 × (8 ${MINUS} 3)²`, 5 + 2 * (8 - 3) ** 2], ['100 ÷ (5 × 4) + 7', 100 / (5 * 4) + 7],
          [`3 × [12 ${MINUS} (2 + 4)]`, 3 * (12 - (2 + 4))], [`${MINUS}6 + 4 × ${neg(-3)}`, -6 + 4 * -3], [`${neg(-2)}³ + 10`, (-2) ** 3 + 10],
        ].map(([t, v]) => ({ text: `${t} =`, answer: fmt(v) })),
      },
      {
        type: 'problems',
        title: 'Word problems',
        lines: 3,
        items: [
          { text: `🌡️ At 5 a.m. the temperature in Shimla is ${MINUS}4°C. It rises by 3°C every hour. What is the temperature at 10 a.m.?`, answer: `${MINUS}4 + 5 × 3 = ${fmt(-4 + 5 * 3)}°C` },
          { text: `🌊 A submarine is at ${MINUS}120 m. It rises 45 m and then dives 30 m. Where is it now?`, answer: `${MINUS}120 + 45 ${MINUS} 30 = ${fmt(-120 + 45 - 30)} m` },
          { text: `🏆 In a quiz, a correct answer scores +5 and a wrong answer scores ${MINUS}2. Asha gets 8 right and 4 wrong. What is her score?`, answer: `8 × 5 + 4 × (${MINUS}2) = ${fmt(8 * 5 + 4 * -2)}` },
        ],
      },
    ],
  },

  'class-7-8-linear-equations-worksheet': {
    subject: 'Math',
    classes: 'Class 7–8',
    mascot: '⚖️',
    title: 'Linear Equations',
    subtitle: 'Equations in one variable',
    minutes: 50,
    intro: 'An equation is like a balance: whatever you do to one side, do to the other. Check every answer by putting it back into the equation.',
    tuition: { to: '/math-online-tuition', label: 'online Math tuition' },
    sections: [
      {
        type: 'problems',
        title: 'Warm-up',
        compact: true,
        lines: 2,
        items: [
          { text: 'x + 7 = 15', answer: 'x = 8' },
          { text: '3x = 42', answer: 'x = 14' },
          { text: `5x ${MINUS} 8 = 27`, answer: 'x = 7' },
          { text: 'x/4 + 3 = 9', answer: 'x = 24' },
          { text: '2(x + 5) = 26', answer: 'x = 8' },
          { text: `7 ${MINUS} 3x = ${MINUS}11`, answer: 'x = 6' },
        ],
      },
      {
        type: 'problems',
        title: 'Variables on both sides',
        compact: true,
        lines: 3,
        items: [
          { text: '5x + 4 = 2x + 19', answer: '3x = 15, so x = 5' },
          { text: `3(x ${MINUS} 2) = x + 10`, answer: `3x ${MINUS} 6 = x + 10, 2x = 16, so x = 8` },
          { text: `4x/3 ${MINUS} 5 = x + 1`, answer: 'x/3 = 6, so x = 18' },
          { text: `(x + 3)/2 = (2x ${MINUS} 1)/3`, answer: `3x + 9 = 4x ${MINUS} 2, so x = 11` },
          { text: '0.5x + 3 = 0.2x + 6', answer: '0.3x = 3, so x = 10' },
          { text: `6 ${MINUS} 2(x ${MINUS} 1) = 3x ${MINUS} 7`, answer: `8 ${MINUS} 2x = 3x ${MINUS} 7, 15 = 5x, so x = 3` },
        ],
      },
      {
        type: 'problems',
        title: 'Word problems',
        instructions: 'Let the unknown be x, write an equation, then solve it.',
        lines: 4,
        items: [
          { text: '🔢 The sum of three consecutive integers is 72. Find the integers.', answer: 'x + (x + 1) + (x + 2) = 72, x = 23. The integers are 23, 24 and 25.' },
          { text: '➕ One number is 12 more than twice another. Their sum is 57. Find the numbers.', answer: 'x + (2x + 12) = 57, x = 15. The numbers are 15 and 42.' },
          { text: '👨‍👦 A father is three times as old as his son. In 12 years he will be twice as old as his son. Find their present ages.', answer: '3x + 12 = 2(x + 12), x = 12. Son 12 years, father 36 years.' },
          { text: '📐 The perimeter of a rectangle is 64 cm. Its length is 8 cm more than its breadth. Find its length and breadth.', answer: '2(x + x + 8) = 64, x = 12. Breadth 12 cm, length 20 cm.' },
          { text: '🪢 A 40 m rope is cut into two pieces so that one piece is 3/5 of the other. Find the length of each piece.', answer: 'x + 3x/5 = 40, 8x/5 = 40, x = 25. The pieces are 25 m and 15 m.' },
        ],
      },
    ],
  },

  'class-10-quadratic-equations-worksheet': {
    subject: 'Math',
    classes: 'Class 10',
    mascot: '📈',
    title: 'Quadratic Equations',
    subtitle: 'Factorisation, the quadratic formula and nature of roots',
    minutes: 60,
    intro: 'A quadratic equation has the form ax² + bx + c = 0, where a ≠ 0. It has at most two roots.',
    tuition: { to: '/online-tuition-class-10', label: 'online tuition for Class 10' },
    sections: [
      {
        type: 'rule',
        title: 'Formula box',
        points: [
          `Quadratic formula: x = [${MINUS}b ± √(b² ${MINUS} 4ac)] / 2a`,
          `Discriminant D = b² ${MINUS} 4ac`,
          'D > 0: two distinct real roots.  D = 0: two equal real roots.  D < 0: no real roots.',
        ],
      },
      {
        type: 'problems',
        title: 'Solve by factorisation',
        compact: true,
        lines: 3,
        items: [
          { text: `x² ${MINUS} 5x + 6 = 0`, answer: `(x ${MINUS} 2)(x ${MINUS} 3) = 0, x = 2 or 3` },
          { text: `x² + x ${MINUS} 12 = 0`, answer: `(x + 4)(x ${MINUS} 3) = 0, x = 3 or ${MINUS}4` },
          { text: `2x² ${MINUS} 7x + 3 = 0`, answer: `(2x ${MINUS} 1)(x ${MINUS} 3) = 0, x = 1/2 or 3` },
          { text: `x² ${MINUS} 9 = 0`, answer: `x = 3 or ${MINUS}3` },
          { text: `6x² ${MINUS} x ${MINUS} 2 = 0`, answer: `(3x ${MINUS} 2)(2x + 1) = 0, x = 2/3 or ${MINUS}1/2` },
          { text: `x² ${MINUS} 8x + 16 = 0`, answer: `(x ${MINUS} 4)² = 0, x = 4 (equal roots)` },
        ],
      },
      {
        type: 'problems',
        title: 'Nature of roots',
        instructions: 'Find the discriminant and say what kind of roots each equation has.',
        compact: true,
        lines: 2,
        items: [
          { text: `2x² ${MINUS} 3x + 5 = 0`, answer: `D = 9 ${MINUS} 40 = ${MINUS}31 < 0, no real roots` },
          { text: `x² ${MINUS} 4x + 4 = 0`, answer: 'D = 16 − 16 = 0, two equal real roots' },
          { text: `3x² + 5x ${MINUS} 2 = 0`, answer: 'D = 25 + 24 = 49 > 0, two distinct real roots' },
          { text: 'x² + 2x + 3 = 0', answer: `D = 4 ${MINUS} 12 = ${MINUS}8 < 0, no real roots` },
          { text: `4x² ${MINUS} 12x + 9 = 0`, answer: 'D = 144 − 144 = 0, two equal real roots' },
        ],
      },
      {
        type: 'problems',
        title: 'Use the quadratic formula',
        compact: true,
        lines: 3,
        items: [
          { text: `x² ${MINUS} 4x ${MINUS} 1 = 0`, answer: 'D = 20, x = 2 ± √5' },
          { text: `2x² + 3x ${MINUS} 2 = 0`, answer: `D = 25, x = 1/2 or ${MINUS}2` },
          { text: 'x² + 6x + 4 = 0', answer: `D = 20, x = ${MINUS}3 ± √5` },
        ],
      },
      {
        type: 'problems',
        title: 'Find k',
        instructions: 'Find the value(s) of k for which each equation has two equal roots.',
        compact: true,
        lines: 2,
        items: [
          { text: '2x² + kx + 3 = 0', answer: `k² ${MINUS} 24 = 0, k = ±2√6` },
          { text: `kx² ${MINUS} 6x + 1 = 0`, answer: `36 ${MINUS} 4k = 0, k = 9` },
        ],
      },
      {
        type: 'problems',
        title: 'Word problems',
        lines: 4,
        items: [
          { text: '🔢 The product of two consecutive positive integers is 306. Find the integers.', answer: `x(x + 1) = 306, x² + x ${MINUS} 306 = 0, x = 17. The integers are 17 and 18.` },
          { text: '🌾 A rectangular plot is 3 m longer than it is wide, and its area is 180 m². Find its length and breadth.', answer: 'x(x + 3) = 180, x = 12. Breadth 12 m, length 15 m.' },
          { text: '🔄 The sum of a number and its reciprocal is 10/3. Find the number.', answer: `x + 1/x = 10/3, 3x² ${MINUS} 10x + 3 = 0, x = 3 or 1/3` },
        ],
      },
    ],
  },

  'class-10-trigonometry-worksheet': {
    subject: 'Math',
    classes: 'Class 10',
    mascot: '📐',
    title: 'Trigonometry',
    subtitle: 'Ratios, standard angles, identities, heights and distances',
    minutes: 60,
    intro: 'Learn the standard table first; almost every other question uses it. Take A as an acute angle throughout.',
    tuition: { to: '/online-tuition-class-10', label: 'online tuition for Class 10' },
    sections: [
      {
        type: 'table',
        title: 'Complete the table',
        instructions: 'Fill in the values. Write "not defined" where needed.',
        head: ['', '0°', '30°', '45°', '60°', '90°'],
        rows: [['sin A', null, null, null, null, null], ['cos A', null, null, null, null, null], ['tan A', null, null, null, null, null]],
        answerRows: [
          ['sin A', '0', '1/2', '1/√2', '√3/2', '1'],
          ['cos A', '1', '√3/2', '1/√2', '1/2', '0'],
          ['tan A', '0', '1/√3', '1', '√3', 'not defined'],
        ],
      },
      {
        type: 'problems',
        title: 'Evaluate',
        compact: true,
        lines: 3,
        items: [
          { text: 'sin 30° + cos 60°', answer: '1/2 + 1/2 = 1' },
          { text: `2 tan²45° + cos²30° ${MINUS} sin²60°`, answer: `2 + 3/4 ${MINUS} 3/4 = 2` },
          { text: 'sin 60° cos 30° + sin 30° cos 60°', answer: '3/4 + 1/4 = 1' },
          { text: `(1 ${MINUS} tan²45°) / (1 + tan²45°)`, answer: '0/2 = 0' },
          { text: 'cos 45° / (sec 30° + cosec 30°)', answer: `(3√2 ${MINUS} √6)/8` },
          { text: `(sin 30° + tan 45° ${MINUS} cosec 60°) / (sec 30° + cos 60° + cot 45°)`, answer: `(43 ${MINUS} 24√3)/11` },
        ],
      },
      {
        type: 'problems',
        title: 'Find the other ratios',
        compact: true,
        lines: 3,
        items: [
          { text: 'If sin A = 3/5, find cos A and tan A.', answer: 'cos A = 4/5, tan A = 3/4' },
          { text: 'If tan θ = 8/15, find sin θ and cos θ.', answer: 'sin θ = 8/17, cos θ = 15/17' },
          { text: 'If sec θ = 13/12, find sin θ and tan θ.', answer: 'cos θ = 12/13, sin θ = 5/13, tan θ = 5/12' },
        ],
      },
      {
        type: 'problems',
        title: 'Prove',
        lines: 4,
        items: [
          { text: `(1 ${MINUS} cos²A) cosec²A = 1`, answer: '1 − cos²A = sin²A, and sin²A × 1/sin²A = 1' },
          { text: '(sin θ + cos θ)² = 1 + 2 sin θ cos θ', answer: 'Expand: sin²θ + cos²θ + 2 sin θ cos θ, and sin²θ + cos²θ = 1' },
          { text: 'sin A/(1 + cos A) + (1 + cos A)/sin A = 2 cosec A', answer: 'LHS = [sin²A + (1 + cos A)²] / [sin A(1 + cos A)] = (2 + 2 cos A) / [sin A(1 + cos A)] = 2/sin A = 2 cosec A' },
        ],
      },
      {
        type: 'problems',
        title: 'Heights and distances',
        instructions: 'Draw a neat diagram for each. Use √3 = 1.732 where needed.',
        lines: 4,
        items: [
          { text: '🗼 From a point 30 m from the foot of a tower, the angle of elevation of its top is 30°. Find the height of the tower.', answer: 'h = 30 tan 30° = 30/√3 = 10√3 ≈ 17.32 m' },
          { text: '🪁 A kite is flying on a 60 m string that makes an angle of 60° with the ground. How high is the kite? (Assume the string is straight.)', answer: 'h = 60 sin 60° = 30√3 ≈ 51.96 m' },
          { text: '🪜 A ladder leans against a wall and makes an angle of 60° with the ground. Its foot is 2.5 m from the wall. Find the length of the ladder.', answer: 'L = 2.5 / cos 60° = 5 m' },
        ],
      },
    ],
  },

  // ============================ SCIENCE ============================
  'class-9-motion-numericals-worksheet': {
    subject: 'Science',
    classes: 'Class 9',
    mascot: '🚀',
    title: 'Motion Numericals',
    subtitle: 'Speed, velocity, acceleration and the equations of motion',
    minutes: 50,
    intro: 'Write the given values, the formula and the units for every answer. Take g = 10 m/s² and π = 22/7.',
    tuition: { to: '/science-online-tuition', label: 'online Science tuition' },
    sections: [
      {
        type: 'rule',
        title: 'Formula box',
        points: [
          'speed = distance / time      acceleration a = (v − u) / t',
          'v = u + at      s = ut + ½ at²      v² − u² = 2as',
          'To change km/h into m/s, multiply by 5/18.',
        ],
      },
      {
        type: 'problems',
        title: 'Speed and acceleration',
        lines: 3,
        items: [
          { text: '🚗 A car travels 150 km in 2.5 hours. Find its average speed.', answer: '150 / 2.5 = 60 km/h' },
          { text: '🏎️ Convert 72 km/h into m/s.', answer: '72 × 5/18 = 20 m/s' },
          { text: '🚌 A bus starts from rest and reaches 20 m/s in 10 s. Find its acceleration.', answer: '(20 − 0)/10 = 2 m/s²' },
          { text: '🚴 A cyclist rides 3 km east and then 4 km north in 30 minutes. Find the distance, the displacement, the average speed and the size of the average velocity.', answer: 'Distance 7 km, displacement 5 km (north-east), average speed 14 km/h, average velocity 10 km/h' },
          { text: '🏃 An athlete completes one round of a circular track of radius 70 m in 88 s. Find her speed. What is her displacement after one round?', answer: 'Circumference 2 × 22/7 × 70 = 440 m, speed 440/88 = 5 m/s. Displacement after one round = 0' },
        ],
      },
      {
        type: 'problems',
        title: 'Equations of motion',
        lines: 4,
        items: [
          { text: '🚆 A train moving at 25 m/s brakes with a retardation of 0.5 m/s². How long does it take to stop, and how far does it travel before stopping?', answer: 't = 25/0.5 = 50 s. s = 25² / (2 × 0.5) = 625 m' },
          { text: '🚙 A car moving at 10 m/s accelerates at 2 m/s² for 5 s. Find its final velocity and the distance covered in those 5 s.', answer: 'v = 10 + 2 × 5 = 20 m/s. s = 10 × 5 + ½ × 2 × 25 = 75 m' },
          { text: '🍎 A stone is dropped from rest from a cliff. Find its velocity after 3 s and the distance it has fallen.', answer: 'v = 0 + 10 × 3 = 30 m/s. s = ½ × 10 × 9 = 45 m' },
          { text: '⚾ A ball is thrown straight up at 20 m/s. Find the maximum height it reaches and the time it takes to get there.', answer: '0 = 20² − 2 × 10 × h, h = 20 m. t = 20/10 = 2 s' },
        ],
      },
    ],
  },

  'class-10-balancing-chemical-equations-worksheet': {
    subject: 'Science',
    classes: 'Class 10',
    mascot: '🧪',
    title: 'Chemical Equations',
    subtitle: 'Balancing and types of reactions',
    minutes: 45,
    intro: 'A balanced equation has the same number of atoms of each element on both sides. Change only the numbers in front of formulas, never the small numbers inside them.',
    tuition: { to: '/online-tuition-class-10', label: 'online tuition for Class 10' },
    sections: [
      {
        type: 'rule',
        title: 'How to balance',
        points: [
          'Count the atoms of each element on both sides.',
          'Start with the element that appears in the fewest formulas; leave hydrogen and oxygen for last.',
          'Adjust the coefficients until every element balances, then check once more.',
        ],
      },
      {
        type: 'problems',
        title: 'Balance these equations',
        compact: true,
        lines: 2,
        items: [
          equation(['H2', 'O2'], ['H2O'], [2, 1, 2]),
          equation(['Mg', 'O2'], ['MgO'], [2, 1, 2]),
          equation(['N2', 'H2'], ['NH3'], [1, 3, 2]),
          equation(['Zn', 'HCl'], ['ZnCl2', 'H2'], [1, 2, 1, 1]),
          equation(['Fe', 'H2O'], ['Fe3O4', 'H2'], [3, 4, 1, 4]),
          equation(['CH4', 'O2'], ['CO2', 'H2O'], [1, 2, 1, 2]),
          equation(['Al', 'O2'], ['Al2O3'], [4, 3, 2]),
          equation(['NaOH', 'H2SO4'], ['Na2SO4', 'H2O'], [2, 1, 1, 2]),
          equation(['BaCl2', 'H2SO4'], ['BaSO4', 'HCl'], [1, 1, 1, 2]),
          equation(['Fe2O3', 'Al'], ['Al2O3', 'Fe'], [1, 2, 1, 2]),
          equation(['KClO3'], ['KCl', 'O2'], [2, 2, 3], 'heat'),
          equation(['Pb(NO3)2'], ['PbO', 'NO2', 'O2'], [2, 2, 4, 1], 'heat'),
          equation(['C2H6', 'O2'], ['CO2', 'H2O'], [2, 7, 4, 6]),
          equation(['Na', 'H2O'], ['NaOH', 'H2'], [2, 2, 2, 1]),
        ].map(({ text, answer, check }) => ({ text, answer, check })),
      },
      {
        type: 'rule',
        title: 'Types of reactions',
        points: [
          'Combination: two or more substances form one product.',
          'Decomposition: one substance breaks into two or more (by heat, light or electricity).',
          'Displacement: a more reactive element pushes a less reactive one out of its compound.',
          'Double displacement: two compounds swap ions, often forming a precipitate.',
          'Redox: one substance is oxidised while another is reduced.',
        ],
      },
      {
        type: 'problems',
        title: 'Name the type of reaction',
        compact: true,
        lines: 1,
        items: [
          { text: `${chem('CaO')} + ${chem('H2O')} → ${chem('Ca(OH)2')}`, answer: 'Combination' },
          { text: `2${chem('FeSO4')} → ${chem('Fe2O3')} + ${chem('SO2')} + ${chem('SO3')} (heat)`, answer: 'Decomposition (thermal)' },
          { text: `Fe + ${chem('CuSO4')} → ${chem('FeSO4')} + Cu`, answer: 'Displacement' },
          { text: `${chem('Na2SO4')} + ${chem('BaCl2')} → ${chem('BaSO4')} + 2NaCl`, answer: 'Double displacement (precipitation)' },
          { text: `ZnO + C → Zn + CO`, answer: 'Redox: ZnO is reduced, C is oxidised' },
          { text: `2AgCl → 2Ag + ${chem('Cl2')} (sunlight)`, answer: 'Decomposition (by light)' },
        ],
      },
    ],
  },

  // ============================ ENGLISH, CLASSES 5–8 ============================
  'class-5-8-verb-collocations-worksheet': {
    subject: 'English',
    classes: 'Class 5–8',
    mascot: '🧩',
    title: 'Make, Do, Have, Take',
    subtitle: 'Everyday verb collocations',
    minutes: 35,
    intro: 'A collocation is a pair of words that naturally go together. We make a mistake, but we do our homework. Study the table, then try the practice.',
    tuition: { to: '/english-online-tuition', label: 'online English tuition' },
    sections: [
      {
        type: 'reference',
        title: 'Study table',
        head: ['Collocation', 'Meaning', 'Example'],
        groups: [
          {
            label: 'MAKE',
            rows: [
              ['make a mistake', 'do something wrong', 'I made a mistake in my spelling test.'],
              ['make a decision', 'decide', 'Dad made a decision to buy a bicycle.'],
              ['make friends', 'become friends with people', 'Tara made friends on her first day at school.'],
              ['make noise', 'be loud', 'Please don’t make noise in the library.'],
              ['make a wish', 'silently wish for something', 'Close your eyes and make a wish.'],
            ],
          },
          {
            label: 'DO',
            rows: [
              ['do homework', 'finish work set by the teacher', 'I do my homework after tea.'],
              ['do the dishes', 'wash the plates and pots', 'My brother does the dishes on Sundays.'],
              ['do your best', 'try as hard as you can', 'Just do your best in the exam.'],
              ['do a favour', 'help someone', 'Could you do me a favour and hold this?'],
              ['do exercise', 'move your body to stay fit', 'Grandpa does exercise every morning.'],
            ],
          },
          {
            label: 'HAVE',
            rows: [
              ['have breakfast', 'eat the morning meal', 'We have breakfast at seven o’clock.'],
              ['have fun', 'enjoy yourself', 'We had fun at the beach.'],
              ['have a bath', 'wash your whole body', 'The baby has a bath every evening.'],
              ['have a look', 'look at something quickly', 'Can I have a look at your drawing?'],
              ['have a chat', 'talk in a friendly way', 'The two friends had a chat after school.'],
            ],
          },
          {
            label: 'TAKE',
            rows: [
              ['take a photo', 'click a picture', 'Let’s take a photo near the lake.'],
              ['take a bus', 'travel by bus', 'I take a bus to school.'],
              ['take a break', 'rest for a short time', 'Let’s take a break after this chapter.'],
              ['take care of', 'look after', 'Please take care of your little sister.'],
              ['take an exam', 'sit a test', 'She will take her Class 10 exam in March.'],
            ],
          },
        ],
      },
      {
        type: 'bank',
        title: 'Word bank',
        words: ['make', 'made', 'do', 'have', 'had', 'take'],
      },
      {
        type: 'fill',
        title: 'Fill in the verb',
        instructions: 'Complete each sentence with make, do, have or take in the correct form.',
        items: [
          { emoji: '🎨', text: 'Please ___ your best in the drawing competition.', answer: 'do' },
          { emoji: '📗', text: 'Can I ___ a look at your new book?', answer: 'have' },
          { emoji: '🎉', text: 'We ___ a lot of noise at the party last night.', answer: 'made' },
          { emoji: '💧', text: 'Let’s ___ a break and drink some water.', answer: 'take' },
          { emoji: '📓', text: 'I always ___ my homework before dinner.', answer: 'do' },
          { emoji: '🦓', text: 'Did you ___ fun at the zoo?', answer: 'have' },
          { emoji: '➗', text: 'Rohan ___ a mistake in the last sum.', answer: 'made' },
          { emoji: '🪴', text: 'Remember to ___ care of your plants.', answer: 'take' },
          { emoji: '🎂', text: 'Blow out the candles and ___ a wish!', answer: 'make' },
          { emoji: '🍳', text: 'Yesterday they ___ breakfast at seven.', answer: 'had' },
        ],
      },
      {
        type: 'mcq',
        title: 'Choose the right verb',
        instructions: 'Circle the verb that goes with the words.',
        items: [
          { text: '___ the dishes', options: ['make', 'do', 'have', 'take'], answer: 1 },
          { text: '___ a photo', options: ['make', 'do', 'have', 'take'], answer: 3 },
          { text: '___ friends', options: ['make', 'do', 'have', 'take'], answer: 0 },
          { text: '___ a chat', options: ['make', 'do', 'have', 'take'], answer: 2 },
          { text: '___ a decision', options: ['make', 'do', 'have', 'take'], answer: 0 },
          { text: '___ exercise', options: ['make', 'do', 'have', 'take'], answer: 1 },
        ],
      },
    ],
  },

  'class-5-8-english-tenses-worksheet': {
    subject: 'English',
    classes: 'Class 5–8',
    mascot: '⏳',
    title: 'Tenses',
    subtitle: 'Past, present and future in action',
    minutes: 40,
    intro: 'Look for time clues in each sentence: every night, last summer, now, since, by next June. They tell you which tense to use.',
    tuition: { to: '/english-online-tuition', label: 'online English tuition' },
    sections: [
      {
        type: 'fill',
        title: 'Fill in the correct form',
        instructions: 'Write the correct form of the verb in brackets.',
        items: [
          { emoji: '👵', text: 'My grandmother ___ us a story every night.', hint: 'tell', answer: 'tells' },
          { emoji: '🏰', text: 'We ___ Mysuru last summer.', hint: 'visit', answer: 'visited' },
          { emoji: '👶', text: 'Listen! The baby ___.', hint: 'cry', answer: 'is crying' },
          { emoji: '🌶️', text: 'Riya ___ spicy food.', hint: 'not like', answer: 'does not like' },
          { emoji: '🚉', text: 'When I reached the station, the train ___ already ___.', hint: 'leave', answer: 'had … left' },
          { emoji: '📓', text: 'I ___ my homework. Can I go out now?', hint: 'finish', answer: 'have finished' },
          { emoji: '🏏', text: 'They ___ cricket when it started to rain.', hint: 'play', answer: 'were playing' },
          { emoji: '🌅', text: 'The sun ___ in the east.', hint: 'rise', answer: 'rises' },
          { emoji: '🎓', text: 'By next June, she ___ her course.', hint: 'complete', answer: 'will have completed' },
          { emoji: '🖊️', text: '___ you ___ my blue pen anywhere?', hint: 'see', answer: 'Have … seen' },
          { emoji: '🏙️', text: 'He ___ in Chennai since 2019.', hint: 'live', answer: 'has lived (or has been living)' },
          { emoji: '🌧️', text: 'Look at those dark clouds! It ___ soon.', hint: 'rain', answer: 'is going to rain' },
        ],
      },
      {
        type: 'mcq',
        title: 'Past simple or past perfect?',
        instructions: 'Choose the correct answer. Use the past perfect (had + past participle) for the action that happened first.',
        items: [
          { text: 'By the time we reached the cinema, the film ___.', options: ['started', 'had started', 'starts', 'is starting'], answer: 1 },
          { text: 'Last Sunday we ___ a picnic by the lake.', options: ['had had', 'have', 'had', 'having'], answer: 2 },
          { text: 'She ___ the book before she watched the film.', options: ['had read', 'reads', 'reading', 'has read'], answer: 0 },
          { text: 'Arjun could not pay because he ___ his wallet.', options: ['loses', 'had lost', 'losing', 'lose'], answer: 1 },
          { text: 'When I got to school, I realised I ___ my lunch box at home.', options: ['leave', 'leaving', 'had left', 'leaves'], answer: 2 },
          { text: 'Yesterday Meena ___ her grandparents in Mangaluru.', options: ['had visited', 'visits', 'visited', 'visiting'], answer: 2 },
          { text: 'The ground was wet because it ___ all night.', options: ['rained', 'had rained', 'rains', 'raining'], answer: 1 },
          { text: 'We ___ our tickets online two days ago.', options: ['had booked', 'booked', 'book', 'booking'], answer: 1 },
        ],
      },
      {
        type: 'problems',
        title: 'Correct the errors',
        instructions: 'Each sentence has one tense mistake. Rewrite it correctly.',
        lines: 1,
        items: [
          { text: 'She don’t know the answer.', answer: 'She doesn’t know the answer.' },
          { text: 'I have seen him yesterday.', answer: 'I saw him yesterday.' },
          { text: 'He is knowing the way.', answer: 'He knows the way.' },
          { text: 'We was playing in the park.', answer: 'We were playing in the park.' },
          { text: 'Did you went to school today?', answer: 'Did you go to school today?' },
          { text: 'The shop closes before we reached.', answer: 'The shop had closed before we reached.' },
        ],
      },
      {
        type: 'problems',
        title: 'Name the tense',
        compact: true,
        lines: 1,
        items: [
          { text: 'They have been waiting for an hour.', answer: 'Present perfect continuous' },
          { text: 'She will be travelling tomorrow.', answer: 'Future continuous' },
          { text: 'I had eaten before he came.', answer: 'Past perfect (had eaten)' },
          { text: 'Birds fly south in winter.', answer: 'Simple present' },
          { text: 'We were watching a film.', answer: 'Past continuous' },
          { text: 'He will call you tonight.', answer: 'Simple future' },
        ],
      },
    ],
  },
};

// Worksheets grouped for the /worksheets hub, youngest first. The three
// alphabet tracing sheets have their own pages but are listed here too.
export const WORKSHEET_HUB = [
  {
    band: 'Classes 1–3',
    items: [
      { to: '/kannada-alphabet-tracing-worksheet', subject: 'Kannada', classes: 'Class 1–2', mascot: 'ಅ', title: 'Kannada Varnamale tracing', blurb: 'All 49 letters to trace and copy.' },
      { to: '/hindi-varnamala-tracing-worksheet', subject: 'Hindi', classes: 'Class 1–2', mascot: 'अ', title: 'Hindi Varnamala tracing', blurb: 'Swar, vyanjan and joined letters.' },
      { to: '/english-alphabet-tracing-worksheet', subject: 'English', classes: 'Nursery–Class 1', mascot: '🔤', title: 'English A to Z tracing', blurb: 'Capital and small letters with picture words.' },
      { slug: 'class-1-3-plurals-s-es-worksheet' },
      { slug: 'class-1-3-nouns-worksheet' },
    ],
  },
  {
    band: 'Classes 2–5',
    items: [
      { slug: 'class-2-4-adjectives-comparatives-superlatives-worksheet' },
      { slug: 'class-2-4-contractions-worksheet' },
      { slug: 'class-2-4-prepositions-worksheet' },
      { slug: 'class-4-5-multiplication-division-worksheet' },
    ],
  },
  {
    band: 'Classes 5–8',
    items: [
      { slug: 'class-5-6-fractions-decimals-worksheet' },
      { slug: 'class-6-7-integers-bodmas-worksheet' },
      { slug: 'class-7-8-linear-equations-worksheet' },
      { slug: 'class-5-8-english-tenses-worksheet' },
      { slug: 'class-5-8-verb-collocations-worksheet' },
    ],
  },
  {
    band: 'Classes 9–10',
    items: [
      { slug: 'class-9-motion-numericals-worksheet' },
      { slug: 'class-10-quadratic-equations-worksheet' },
      { slug: 'class-10-trigonometry-worksheet' },
      { slug: 'class-10-balancing-chemical-equations-worksheet' },
    ],
  },
];

// Number of answerable questions, shown on the page and the hub cards.
export function questionCount(ws) {
  return ws.sections.reduce((n, s) => {
    if (s.items) return n + s.items.length;
    if (s.type === 'sort') return n + s.columns.reduce((m, c) => m + c.answers.length, 0);
    if (s.type === 'table') return n + s.rows.reduce((m, r) => m + r.filter((c) => c === null).length, 0);
    if (s.type === 'writing') return n + 1;
    return n;
  }, 0);
}
