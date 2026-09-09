// Content for the dedicated board-wise, class-wise and subject-wise SEO
// landing pages. Kept as data (not JSX) so TuitionLandingPage.jsx can
// render all of them from one template, and App.jsx can generate routes
// from these arrays instead of hand-writing one <Route> per page.

export const BOARD_PAGES = [
  {
    slug: 'cbse-online-tuition',
    category: 'board',
    board: 'CBSE',
    metaTitle: 'CBSE Online Tuition for Classes 1–10 | Vihakids',
    metaDescription: 'Live online CBSE tuition for Classes 1–10 in English, Hindi, Math, Science and Kannada — NCERT-aligned lessons, patient tutors, free demo class. For students anywhere in India.',
    eyebrow: 'CBSE · Classes 1–10',
    h1: 'CBSE Online Tuition for Classes 1–10',
    lead: 'Live, one-on-one online classes built around the NCERT textbooks your child actually uses in school.',
    paragraphs: [
      'CBSE is followed by the widest range of schools across India, and its NCERT textbooks move at a brisk, structured pace — new concepts in Math and Science are introduced quickly, with less repetition than some other boards. Our CBSE tuition follows the same chapter sequence as your child\'s school, so classes reinforce what was just taught rather than confusing your child with a different approach.',
      'For English, Hindi and Kannada, we work on grammar, comprehension and writing in the exact format CBSE exams expect. For Math and Science, we focus on step-by-step problem-solving and NCERT-style diagrams and definitions, since CBSE\'s periodic tests and the Class 10 board exam reward clear working, not just the right final answer.',
    ],
    highlights: [
      'Lessons sequenced to match your child\'s NCERT textbook chapter by chapter',
      'Practice questions in the CBSE periodic-test and board-exam format',
      'Available for English, Hindi, Mathematics, Science and Kannada',
      'One-on-one or small-batch classes, live and online — no travel needed',
    ],
    showBoardBadges: true,
  },
  {
    slug: 'icse-online-tuition',
    category: 'board',
    board: 'ICSE',
    metaTitle: 'ICSE Online Tuition for Classes 1–10 | Vihakids',
    metaDescription: 'Live online ICSE tuition for Classes 1–10 in English, Hindi, Math, Science and Kannada — detailed, textbook-aligned support for ICSE\'s broader syllabus. Free demo class.',
    eyebrow: 'ICSE · Classes 1–10',
    h1: 'ICSE Online Tuition for Classes 1–10',
    lead: 'Extra support for a syllabus known for going deeper — especially in English and Science.',
    paragraphs: [
      'ICSE has a reputation for covering more ground than other boards, with strong emphasis on English language and literature, and Science taught in more analytical detail from an early age. That depth is a real strength for children who get consistent support, but it can feel overwhelming without it — especially in the years leading up to the Class 10 ICSE board exam.',
      'Our ICSE tuition matches your child\'s actual textbook and school pace, with focused practice on the composition, comprehension and grammar formats ICSE English papers expect, and clear, example-led explanations for Science and Math so nothing feels like it was skipped over too fast.',
    ],
    highlights: [
      'Extra attention to ICSE\'s stronger English composition and literature component',
      'Science and Math explained in the depth ICSE syllabus expects',
      'Available for English, Hindi, Mathematics, Science and Kannada',
      'One-on-one or small-batch classes, live and online — no travel needed',
    ],
    showBoardBadges: true,
  },
  {
    slug: 'state-board-online-tuition',
    category: 'board',
    board: 'State Board',
    metaTitle: 'State Board Online Tuition for Classes 1–10 | Vihakids',
    metaDescription: 'Live online State Board tuition for Classes 1–10 in English, Hindi, Math, Science and Kannada, including Karnataka State Board (SSLC). Free demo class.',
    eyebrow: 'State Board · Classes 1–10',
    h1: 'State Board Online Tuition for Classes 1–10',
    lead: 'Including Karnataka State Board — with lessons built around your child\'s own textbook, not a generic syllabus.',
    paragraphs: [
      'State Board textbooks vary from state to state, and being headquartered in Bengaluru, we work with Karnataka State Board students especially often — including Kannada as a first or second language, and the SSLC exam format in Class 10. For other states, we match our lessons to whichever State Board textbook your child\'s school follows.',
      'Because State Board classrooms can be large, one-on-one attention often makes the biggest difference here: going back over a concept the class already moved past, practising reading and writing in the regional language, and building steady exam-writing habits ahead of SSLC or the equivalent board exam.',
    ],
    highlights: [
      'Karnataka State Board (SSLC) support, including Kannada language and literature',
      'Lessons matched to your child\'s specific State Board textbook',
      'Available for English, Hindi, Mathematics, Science and Kannada',
      'One-on-one or small-batch classes, live and online — no travel needed',
    ],
    showBoardBadges: true,
  },
];

const CLASS_CONTENT = {
  1: {
    band: 'Foundation', bandRange: 'Classes 1–4',
    lead: 'Building the very first habits of reading, writing and counting — without pressure.',
    paragraphs: [
      'Class 1 is about comfort, not speed: recognising letters and numbers, forming them correctly, and starting to read small, familiar words aloud without hesitating.',
      'We keep sessions short and encouraging, with plenty of repetition in a way that feels like play rather than drilling — the goal is a child who\'s excited to sit down for the next class, not one who dreads it.',
    ],
    highlights: [
      'Alphabet and number recognition, formed correctly from the start',
      'Simple word reading aloud, at a pace that builds confidence',
      'Counting, basic addition and subtraction with objects and pictures',
      'Short, encouraging sessions suited to a first-grader\'s attention span',
    ],
  },
  2: {
    band: 'Foundation', bandRange: 'Classes 1–4',
    lead: 'Moving from single words to simple sentences — in reading, writing and Math.',
    paragraphs: [
      'Class 2 builds directly on Class 1: children start forming their own simple sentences, reading short paragraphs, and working with two-digit addition and subtraction.',
      'We focus on steady, correct habits here — proper letter formation, careful reading rather than guessing from pictures, and number work that\'s understood, not memorised — since these become much harder to unlearn later.',
    ],
    highlights: [
      'Simple sentence writing and short paragraph reading',
      'Two-digit addition and subtraction, understood step by step',
      'Vocabulary building through everyday words and short stories',
      'Regular, gentle correction so good habits form early',
    ],
  },
  3: {
    band: 'Foundation', bandRange: 'Classes 1–4',
    lead: 'Cursive writing, multiplication tables, and the first real grammar lessons.',
    paragraphs: [
      'Class 3 usually introduces cursive writing, multiplication tables, and the first formal grammar concepts — nouns, verbs, and simple sentence structure — alongside the first proper EVS (Environmental Studies) topics.',
      'This is often where a child either settles into a subject or starts to feel behind, so we spend real time on the basics that get glossed over quickly in a full classroom — making sure tables are actually understood, not just recited.',
    ],
    highlights: [
      'Cursive handwriting practice and multiplication tables',
      'First grammar concepts — nouns, verbs, simple sentences',
      'EVS topics explained with everyday, relatable examples',
      'Extra time on basics that move fast in a full classroom',
    ],
  },
  4: {
    band: 'Foundation', bandRange: 'Classes 1–4',
    lead: 'Paragraph writing, fractions, and more independent problem-solving.',
    paragraphs: [
      'Class 4 asks children to work more independently: writing full paragraphs, answering comprehension questions in their own words, and starting fractions and basic measurement in Math.',
      'We push gently for that independence in class — encouraging your child to attempt an answer first, then correcting and explaining — since Class 5 onward expects more self-driven work.',
    ],
    highlights: [
      'Paragraph writing and comprehension in the child\'s own words',
      'Fractions, measurement and multi-step arithmetic problems',
      'Encouraging independent attempts before correction',
      'Preparing for the step up in Class 5',
    ],
  },
  5: {
    band: 'Building blocks', bandRange: 'Classes 5–7',
    lead: 'The bridge year — grammar gets formal, and Math starts moving faster.',
    paragraphs: [
      'Class 5 is a turning point: grammar becomes more formal (tenses, punctuation, parts of speech), Math introduces fractions and decimals in more depth, and Science starts covering real scientific concepts rather than just EVS observation.',
      'Since many schools treat Class 5 as the milestone before middle school, we make sure the fundamentals are genuinely solid here — a shaky foundation in fractions or grammar in Class 5 tends to show up as real struggle by Class 7 or 8.',
    ],
    highlights: [
      'Formal grammar — tenses, punctuation, sentence structure',
      'Fractions and decimals explained with visual, practical examples',
      'Transition from EVS to structured Science topics',
      'Solidifying fundamentals before the middle-school pace picks up',
    ],
  },
  6: {
    band: 'Building blocks', bandRange: 'Classes 5–7',
    lead: 'Pre-algebra, longer comprehension passages, and the first real exam pattern.',
    paragraphs: [
      'Class 6 usually introduces integers and the first pre-algebra ideas in Math, longer and more analytical comprehension passages in English and Hindi, and Science topics that split more clearly into Physics, Chemistry and Biology themes.',
      'Periodic tests start to matter more from here, so alongside teaching the concept, we spend time on how to actually answer exam-style questions — showing working, structuring an answer, and managing time.',
    ],
    highlights: [
      'Integers and first pre-algebra concepts, explained step by step',
      'Longer comprehension passages with analytical questions',
      'Science divided into Physics, Chemistry and Biology themes',
      'Exam-answer structure and time management practice begins',
    ],
  },
  7: {
    band: 'Building blocks', bandRange: 'Classes 5–7',
    lead: 'Ratios, percentages, and building the study habits Class 8 will demand.',
    paragraphs: [
      'Class 7 brings ratio and proportion, percentages, and more layered word problems in Math, plus more demanding essay and letter-writing formats in English, Hindi and Kannada.',
      'We use this year to build real study habits — structured notes, regular revision, and comfort with slightly harder problems — since Class 8 onward moves at close to board-exam pace.',
    ],
    highlights: [
      'Ratio, proportion and percentage problems, explained practically',
      'Essay and letter-writing in the format exams expect',
      'Structured note-taking and revision habits',
      'Preparing for the board-exam pace that starts in Class 8',
    ],
  },
  8: {
    band: 'Board ready', bandRange: 'Classes 8–10',
    lead: 'Algebra, board-style questions, and a real step up in workload.',
    paragraphs: [
      'Class 8 introduces linear equations and more formal algebra, and exam questions start closely resembling the board-exam format your child will see in Class 10 — longer answers, applied problems, and less spoon-feeding.',
      'We treat this as preparation, not just current-year coursework: practising the exact answer formats examiners expect in English, Hindi and Kannada, and building genuine algebra fluency rather than memorised steps.',
    ],
    highlights: [
      'Linear equations and formal algebra, built on real understanding',
      'Practice in the board-exam-style answer format',
      'Essay and letter-writing polished to exam standard',
      'A steady step up in pace, without it feeling sudden',
    ],
  },
  9: {
    band: 'Board ready', bandRange: 'Classes 8–10',
    lead: 'The real foundation year for the Class 10 board exam.',
    paragraphs: [
      'Class 9 covers coordinate geometry, more advanced algebra, and Science and English content that\'s often tested again — in a more difficult form — in the Class 10 board exam itself. Many students underestimate Class 9 because it "doesn\'t count" for boards, and then struggle to catch up in Class 10.',
      'We treat Class 9 as board-exam preparation a year early: covering the concepts thoroughly now, and starting light exposure to previous years\' Class 10 question papers so nothing in the final year feels unfamiliar.',
    ],
    highlights: [
      'Coordinate geometry and advanced algebra, taught for real understanding',
      'Concepts that reappear — harder — in the Class 10 board exam',
      'Early, light exposure to board-exam question patterns',
      'No catching up needed once Class 10 actually starts',
    ],
  },
  10: {
    band: 'Board ready', bandRange: 'Classes 8–10',
    lead: 'Full board-exam preparation — previous years\' papers, revision, and exam technique.',
    paragraphs: [
      'Class 10 is exam year: we work through previous years\' board papers across English, Hindi, Mathematics, Science and Kannada, focus revision on the topics that come up most often, and practise the exact answer-writing style examiners reward.',
      'Alongside content, we work on the things that quietly cost marks — time management across a paper, presentation, and staying calm under exam conditions — so your child walks in prepared, not just informed.',
    ],
    highlights: [
      'Previous years\' board papers, worked through in detail',
      'Focused revision on high-weightage topics',
      'Exam-writing technique, presentation and time management',
      'Available for English, Hindi, Mathematics, Science and Kannada',
    ],
  },
};

export const CLASS_PAGES = Object.entries(CLASS_CONTENT).map(([grade, c]) => ({
  slug: `online-tuition-class-${grade}`,
  category: 'class',
  grade: Number(grade),
  metaTitle: `Online Tuition for Class ${grade} | English, Hindi, Math, Science & Kannada | Vihakids`,
  metaDescription: `Live online tuition for Class ${grade} in English, Hindi, Mathematics, Science and Kannada — CBSE, ICSE and State Board. ${c.lead} Free demo class.`,
  eyebrow: `${c.bandRange} · ${c.band}`,
  h1: `Online Tuition for Class ${grade}`,
  lead: c.lead,
  paragraphs: c.paragraphs,
  highlights: c.highlights,
  showBoardBadges: true,
}));

export const SUBJECT_PAGES = [
  {
    slug: 'english-online-tuition',
    category: 'subject',
    subject: 'English',
    metaTitle: 'English Online Tuition for Classes 1–10 | Vihakids',
    metaDescription: 'Live online English tuition for Classes 1–10 — phonics, grammar, comprehension, essay writing and spoken English. CBSE, ICSE and State Board. Free demo class.',
    eyebrow: 'English · Classes 1–10',
    h1: 'English Online Tuition for Classes 1–10',
    lead: 'From first letters to confident essay writing and spoken English.',
    paragraphs: [
      'For many families we work with, English isn\'t the language spoken at home — which means school often moves faster than a child is ready for. We start with phonics and confident reading aloud in the early classes, then build grammar, comprehension and vocabulary steadily as the syllabus demands more.',
      'By the middle and board years, the focus shifts to essay and letter-writing in the exact format exams expect, along with real spoken-English practice — because reading and writing well on paper doesn\'t always mean a child feels confident speaking it out loud, and we treat that as just as important.',
    ],
    highlights: [
      'Phonics and confident read-aloud practice for younger learners',
      'Grammar, comprehension and vocabulary building at every level',
      'Essay and letter-writing in the CBSE / ICSE / State Board exam format',
      'Spoken-English practice, not just reading and writing on paper',
    ],
  },
  {
    slug: 'hindi-online-tuition',
    category: 'subject',
    subject: 'Hindi',
    metaTitle: 'Hindi Online Tuition for Classes 1–10 | Vihakids',
    metaDescription: 'Live online Hindi tuition for Classes 1–10 — alphabet, grammar (vyakaran), comprehension and exam writing. CBSE, ICSE and State Board. Free demo class.',
    eyebrow: 'Hindi · Classes 1–10',
    h1: 'Hindi Online Tuition for Classes 1–10',
    lead: 'For children learning Hindi as a second (or third) language, not just a subject to pass.',
    paragraphs: [
      'A lot of the students we teach Hindi to don\'t speak it much at home, which makes it feel more foreign than it should. We start with the alphabet and basic reading and writing, building genuine comfort before moving on to grammar (vyakaran) and comprehension.',
      'In the exam years, we focus on essay and letter-writing in the format schools expect, and on reading comprehension passages carefully rather than guessing — since Hindi papers often reward precise, well-structured answers over long ones.',
    ],
    highlights: [
      'Alphabet, reading and writing basics for beginners',
      'Grammar (vyakaran), comprehension and vocabulary building',
      'Essay and letter-writing practice for CBSE / ICSE / State Board exams',
      'Extra patience for children who don\'t speak Hindi at home',
    ],
  },
  {
    slug: 'math-online-tuition',
    category: 'subject',
    subject: 'Mathematics',
    metaTitle: 'Math Online Tuition for Classes 1–10 | Vihakids',
    metaDescription: 'Live online Math tuition for Classes 1–10 — number sense, fractions, geometry, algebra and board-exam practice. CBSE, ICSE and State Board. Free demo class.',
    eyebrow: 'Mathematics · Classes 1–10',
    h1: 'Math Online Tuition for Classes 1–10',
    lead: 'Real step-by-step understanding — not shortcuts that fall apart under exam pressure.',
    paragraphs: [
      'Math is cumulative — a shaky concept in Class 4 fractions tends to resurface as real trouble in Class 8 algebra. We build from number sense and basic arithmetic in the early years through fractions, geometry and problem-solving, making sure each step is genuinely understood before moving to the next.',
      'In the board years, we shift toward exam-focused practice: algebra, geometry, and the kind of applied word problems that show up in CBSE, ICSE and State Board papers, with real emphasis on showing clear working, since that\'s where marks are often lost even when the final answer is right.',
    ],
    highlights: [
      'Number sense and arithmetic built on real understanding, not tricks',
      'Fractions, geometry and problem-solving explained step by step',
      'Algebra and applied word problems for the board years',
      'Practice on showing clear working — where exam marks are often lost',
    ],
  },
  {
    slug: 'science-online-tuition',
    category: 'subject',
    subject: 'Science',
    metaTitle: 'Science Online Tuition for Classes 1–10 | Vihakids',
    metaDescription: 'Live online Science tuition for Classes 1–10 — EVS basics through Physics, Chemistry and Biology fundamentals. CBSE, ICSE and State Board. Free demo class.',
    eyebrow: 'Science · Classes 1–10',
    h1: 'Science Online Tuition for Classes 1–10',
    lead: 'Everyday examples first, textbook definitions second — so the concept actually sticks.',
    paragraphs: [
      'We start Science with EVS in the early classes — plants, animals, the human body, everyday surroundings — using examples a child can actually see around them, before it becomes a more formal, definition-heavy subject.',
      'From the middle years onward, as topics split into Physics, Chemistry and Biology, we keep explaining concepts through everyday examples first, then connect them to the exact diagrams, definitions and terminology CBSE, ICSE and State Board exams expect — so answers aren\'t just memorised, they\'re understood.',
    ],
    highlights: [
      'EVS fundamentals explained through everyday surroundings',
      'Physics, Chemistry and Biology basics, taught with real-life examples',
      'Diagrams, definitions and terminology in the exact exam format',
      'Concepts understood first, then connected to textbook answers',
    ],
  },
  {
    slug: 'kannada-online-tuition',
    category: 'subject',
    subject: 'Kannada',
    metaTitle: 'Kannada Online Tuition for Classes 1–10 | Vihakids',
    metaDescription: 'Live online Kannada tuition for Classes 1–10 — Varnamale, grammar, reading, writing and exam-focused practice. CBSE, ICSE and Karnataka State Board. Free demo class.',
    eyebrow: 'Kannada · Classes 1–10',
    h1: 'Kannada Online Tuition for Classes 1–10',
    lead: 'From the Varnamale to confident reading, writing and exam answers — taught by native speakers.',
    paragraphs: [
      'Whether Kannada is your child\'s first language at school or a second language they\'re still building comfort with, we start with the Varnamale — the alphabet — and steady reading and writing practice, taught by tutors who speak the language natively.',
      'As the syllabus advances, we move into grammar (vyakarana), comprehension and composition, and — in the board years — poetry, prose and the specific essay and letter-writing formats CBSE, ICSE and Karnataka State Board exams expect.',
    ],
    highlights: [
      'Varnamale (alphabet) and reading/writing basics, taught natively',
      'Grammar (vyakarana), comprehension and composition',
      'Poetry, prose and exam-focused writing practice',
      'Support for both first-language and second-language Kannada learners',
    ],
  },
];

export const COUNTRY_PAGES = [
  {
    slug: 'online-tuition-usa',
    category: 'country',
    country: 'USA',
    metaTitle: 'CBSE & ICSE Online Tuition for Indian Students in the USA | Vihakids',
    metaDescription: 'Live online CBSE, ICSE and Karnataka State Board tuition for Indian and NRI students in the USA — English, Hindi, Math, Science and Kannada. Class times that land in the morning or midday, US time. Free demo class.',
    eyebrow: 'USA · NRI Families',
    h1: 'CBSE & ICSE Online Tuition for Indian Students in the USA',
    lead: 'Keep your child connected to the Indian curriculum, and to Hindi or Kannada — with classes timed to fit an American school day.',
    paragraphs: [
      'Many Indian families in the USA want their children to stay fluent in the CBSE or ICSE syllabus — whether because the family plans to move back to India, a sibling is still studying there, or the child is enrolled in an India-based school remotely. Doing that from another time zone, with a tutor who actually knows both curricula, isn\'t always easy to find locally.',
      'Because our tutors teach from India, an early-evening class back home (around 6–8pm IST) lands in the morning or midday across US time zones — well before or around the start of a US school day, with no need to keep a child up late. Alongside CBSE/ICSE subjects, we also teach Hindi and Kannada as a genuine second language for children growing up mostly speaking English, so that connection to home doesn\'t fade.',
    ],
    highlights: [
      'CBSE, ICSE and Karnataka State Board syllabus, taught by tutors who know the exact textbook',
      'Class times chosen to land in the morning or midday across US time zones',
      'Hindi and Kannada taught as a genuine second language, not just conversation practice',
      'One-on-one, live and online — no travel needed on either side',
    ],
    showBoardBadges: true,
  },
  {
    slug: 'online-tuition-uae',
    category: 'country',
    country: 'UAE',
    metaTitle: 'CBSE & ICSE Online Tuition for Indian Students in the UAE | Vihakids',
    metaDescription: 'Live online CBSE, ICSE and State Board tuition for Indian students in Dubai, Abu Dhabi and across the UAE — English, Hindi, Math, Science and Kannada. Same-evening class times as India. Free demo class.',
    eyebrow: 'UAE · NRI Families',
    h1: 'CBSE & ICSE Online Tuition for Indian Students in the UAE',
    lead: 'Dubai and Abu Dhabi are only ninety minutes behind India — so a tutor here fits your evening exactly like it would back home.',
    paragraphs: [
      'The UAE is home to one of the largest Indian communities outside India, and many children there are already enrolled in CBSE- or ICSE-affiliated Indian schools in Dubai, Abu Dhabi and Sharjah. A tutor who teaches the same syllabus, in the same kind of evening slot a family would use back in India, makes staying on top of schoolwork straightforward rather than one more thing to schedule around.',
      'Because the UAE is just an hour and a half behind India, a class at 6pm in Dubai is only 7:30pm in India — well within a normal after-school tutoring slot, no early mornings or late nights required. We teach the full range of subjects, including Kannada and Hindi for families keeping those languages alive at home.',
    ],
    highlights: [
      'Matches the CBSE, ICSE and State Board syllabus taught in UAE Indian schools',
      'Only a 90-minute time difference — normal after-school evening slots work',
      'English, Hindi, Mathematics, Science and Kannada, one tutor for the whole family',
      'One-on-one, live and online — no travel needed on either side',
    ],
    showBoardBadges: true,
  },
  {
    slug: 'online-tuition-uk',
    category: 'country',
    country: 'UK',
    metaTitle: 'CBSE & ICSE Online Tuition for Indian Students in the UK | Vihakids',
    metaDescription: 'Live online CBSE, ICSE and Karnataka State Board tuition for Indian and British-Indian students in the UK — English, Hindi, Math, Science and Kannada. Evening India-time classes that fit after a UK school day. Free demo class.',
    eyebrow: 'UK · NRI Families',
    h1: 'CBSE & ICSE Online Tuition for Indian Students in the UK',
    lead: 'For British-Indian families keeping the Indian curriculum, Hindi or Kannada going alongside a UK school day.',
    paragraphs: [
      'Some of the Indian families we work with in the UK have children who split time between British schooling and staying current with the CBSE or ICSE syllabus — often because of a planned move back to India, or because grandparents and cousins are still studying there. Others simply want their children to keep reading and writing Hindi or Kannada fluently, rather than losing it to daily life in English.',
      'India is four-and-a-half to five-and-a-half hours ahead of the UK depending on the season, which puts a late-afternoon or early-evening India-time class right around the end of the UK school day — an easy slot to fit in without disrupting homework or dinner. Our tutors teach the exact CBSE/ICSE/State Board syllabus, not a generic equivalent.',
    ],
    highlights: [
      'CBSE, ICSE and Karnataka State Board syllabus, matched to the exact textbook',
      'Class times land around the end of the UK school day, not late at night',
      'Hindi and Kannada taught for real fluency, not just conversation',
      'One-on-one, live and online — no travel needed on either side',
    ],
    showBoardBadges: true,
  },
  {
    slug: 'online-tuition-singapore',
    category: 'country',
    country: 'Singapore',
    metaTitle: 'CBSE & ICSE Online Tuition for Indian Students in Singapore | Vihakids',
    metaDescription: 'Live online CBSE, ICSE and State Board tuition for Indian students in Singapore — English, Hindi, Math, Science and Kannada. Classes timed for a Singapore evening. Free demo class.',
    eyebrow: 'Singapore · NRI Families',
    h1: 'CBSE & ICSE Online Tuition for Indian Students in Singapore',
    lead: 'Supplementary CBSE, ICSE and State Board support for Indian families in Singapore — timed for a Singapore evening, not an Indian one.',
    paragraphs: [
      'Singapore has a large, well-established Indian community, and many children there already attend CBSE-affiliated Indian international schools. Even so, a large class size and an unfamiliar accent or teaching style can leave gaps — especially in Mathematics and Science, where one missed step early on tends to compound.',
      'Singapore runs two-and-a-half hours ahead of India, so a comfortable after-dinner slot in Singapore — say 7 or 7:30pm — is only late afternoon in India, a normal tutoring hour on our end too. We also teach Hindi and Kannada for families who want their children reading and writing confidently in their mother tongue, not just speaking it at home.',
    ],
    highlights: [
      'Built around the CBSE, ICSE or State Board textbook your child\'s Singapore school actually uses',
      'Evening Singapore slots land in the late afternoon in India — a normal tutoring hour for us',
      'Extra depth in Mathematics and Science, where large class sizes leave the most gaps',
      'Hindi and Kannada taught for real reading and writing fluency',
    ],
    showBoardBadges: true,
  },
];

export const ALL_TUITION_PAGES = [...BOARD_PAGES, ...CLASS_PAGES, ...SUBJECT_PAGES, ...COUNTRY_PAGES];
