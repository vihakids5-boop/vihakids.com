// Per-city FAQs for the /online-tuition-<city> pages, rendered by
// TuitionLandingPage.jsx with FAQPage structured data (one block per page).
//
// These exist for the same reason as cityPageDetails.js: the city pages were
// near-duplicates of each other. Questions are picked to be the ones a parent in
// that specific city would actually ask — the state language, the board switch,
// the time zone — not the same three questions with the city name swapped in.
//
// Two answers must never drift from the truth: we teach English, Hindi,
// Mathematics, Science and Kannada only, and our tutors are in India (classes
// are online, so no tutor is claimed to be local to the city).

const TUTORS_ANSWER = (city) =>
  `Our tutors are based in India — Bengaluru mostly — and every class is live and online, one-on-one over video. So no, we do not send a tutor to your home in ${city}; what you get instead is a tutor who is free to be chosen for how well they teach your child’s board and subject rather than for living nearby.`;

const FEES_ANSWER =
  'The first class is a free 30-minute demo, with no payment details taken. Regular classes are a simple monthly fee for 8 or more classes, with no other commitment. The fee depends on the class and the number of subjects, so we share it with you on WhatsApp after the demo — you decide only then.';

export const CITY_PAGE_FAQS = {
  'online-tuition-bengaluru': [
    {
      q: 'Do you teach the Karnataka SSLC syllabus, or only CBSE and ICSE?',
      a: 'We teach all three. Karnataka SSLC is the board our tutors work with most, since we are based in Bengaluru, and we follow the KSEAB textbook your child’s school uses, chapter by chapter, in the school’s order.',
    },
    {
      q: 'My child is in an English-medium school but has to write Kannada exams. Can you help?',
      a: 'Yes, and it is one of our most common requests in Bengaluru. Many children speak Kannada at home yet cannot read or write it for marks. We teach Kannada reading and writing from your child’s school textbook, starting at whatever level they are actually at.',
    },
    { q: 'Are your tutors in Bengaluru, and do they come home?', a: TUTORS_ANSWER('Bengaluru') },
  ],

  'online-tuition-mumbai': [
    {
      q: 'Do you teach Marathi?',
      a: 'No. Marathi is a compulsory school language subject across Maharashtra, but we teach only English, Hindi, Mathematics, Science and Kannada — for Marathi you want a local tutor. Telling you that now is better than discovering it in the demo class.',
    },
    {
      q: 'Can you follow the Maharashtra SSC syllabus as well as CBSE and ICSE?',
      a: 'Yes. We teach from the exact textbook your child’s school uses, so SSC, CBSE and ICSE are all fine. For ICSE children in Mumbai we put extra weight on the English papers, which carry more marks in that board than in the others.',
    },
    { q: 'What do classes cost?', a: FEES_ANSWER },
  ],

  'online-tuition-delhi': [
    {
      q: 'My child speaks Hindi fluently but loses marks in the Hindi paper. Is that something you fix?',
      a: 'Yes, and it is the most common Hindi request we get from Delhi, Gurgaon and Noida. Speaking fluently and writing for marks are different skills — grammar, comprehension, formal letters and answer structure. We work through those in the school textbook rather than as conversation practice.',
    },
    {
      q: 'Do you teach Sanskrit, which our school adds from Class 6?',
      a: 'No. We teach English, Hindi, Mathematics, Science and Kannada only. Many NCR schools do add Sanskrit as a third language, and for that you will need a separate tutor.',
    },
    { q: 'Are your tutors in Delhi NCR, and do they come home?', a: TUTORS_ANSWER('Delhi NCR') },
  ],

  'online-tuition-hyderabad': [
    {
      q: 'Do you teach Telugu?',
      a: 'No. Telugu is a compulsory language subject in Telangana schools, but our five subjects are English, Hindi, Mathematics, Science and Kannada. For Telugu you want a local tutor.',
    },
    {
      q: 'We are moving our child from the state board to a CBSE school. Where will the gap be?',
      a: 'Usually Mathematics and Science rather than the languages — the NCERT books assume ground the previous syllabus may have covered later or lightly. The demo class is largely about finding exactly where that gap starts, so the first weeks fix the right thing.',
    },
    { q: 'What are the usual class timings?', a: 'Early morning, after school, evenings and weekends. After the demo we fix a regular weekly slot with you on WhatsApp, and that slot stays yours.' },
  ],

  'online-tuition-chennai': [
    {
      q: 'My child had no Hindi in a state school and now needs it in CBSE. Can you start from the beginning?',
      a: 'Yes. Tamil Nadu’s two-language pattern means many children meet Hindi for the first time when they move to a CBSE or ICSE school. We start from the alphabet and basic reading if that is where your child is, not from the chapter the class happens to be on.',
    },
    {
      q: 'Do you teach Tamil, or follow the Samacheer Kalvi books?',
      a: 'We follow the Samacheer Kalvi textbooks for Mathematics, Science and English, so state board children are well covered. Tamil itself we do not teach — our subjects are English, Hindi, Mathematics, Science and Kannada.',
    },
    { q: 'Are your tutors in Chennai, and do they come home?', a: TUTORS_ANSWER('Chennai') },
  ],

  'online-tuition-pune': [
    {
      q: 'Do you teach Marathi?',
      a: 'No — Marathi is a compulsory school language subject in Maharashtra, and it is outside our five subjects (English, Hindi, Mathematics, Science, Kannada). A local Marathi tutor is the right answer there.',
    },
    {
      q: 'Which classes and subjects do Pune families use you for most?',
      a: 'Mathematics and Science from about Class 6 onward, where both the SSC and CBSE syllabuses pick up pace, plus Hindi and English writing practice. We teach Classes 1 to 10.',
    },
    { q: 'What do classes cost?', a: FEES_ANSWER },
  ],

  'online-tuition-kolkata': [
    {
      q: 'Do you prepare children for the Madhyamik exam?',
      a: 'Yes. For WBBSE children we teach from the school textbook and, in Classes 9 and 10, add practice in the answer formats the Madhyamik paper expects — full working shown, answers structured for the marks available.',
    },
    {
      q: 'Do you teach Bengali?',
      a: 'No. Our subjects are English, Hindi, Mathematics, Science and Kannada. Bengali, taught as a language subject across the state, needs a local tutor.',
    },
    { q: 'Are your tutors in Kolkata, and do they come home?', a: TUTORS_ANSWER('Kolkata') },
  ],

  'online-tuition-ahmedabad': [
    {
      q: 'Do you teach Gujarati?',
      a: 'No. Gujarati is a school language subject across the state, including in many CBSE schools, and it is outside our five subjects — English, Hindi, Mathematics, Science and Kannada.',
    },
    {
      q: 'Can you teach a GSEB child and a CBSE child in the same family?',
      a: 'Yes, and we do it often. Each child gets their own one-on-one class taught from their own textbook, so the syllabuses never get mixed up. Families taking two or more subjects or children usually ask us about fees together — we share those on WhatsApp after the demo.',
    },
    { q: 'What are the usual class timings?', a: 'Early morning, after school, evenings and weekends. The slot is fixed with you on WhatsApp after the free demo class and stays yours week to week.' },
  ],

  'online-tuition-jaipur': [
    {
      q: 'My child studies in Hindi medium and is weak in English. Where do you start?',
      a: 'With the school English textbook, not a spoken-English course. Reading the chapter aloud, understanding it, then writing answers — so the marks and the confidence improve together. This is the most common request we get from Jaipur families.',
    },
    {
      q: 'Do you follow the RBSE syllabus?',
      a: 'Yes. We teach from your child’s own RBSE textbook and follow the school’s chapter order; we teach CBSE children in Jaipur the same way, from their NCERT books.',
    },
    { q: 'What do classes cost?', a: FEES_ANSWER },
  ],

  'online-tuition-lucknow': [
    {
      q: 'Do you prepare children for the UP Board High School exam?',
      a: 'Yes. For UPMSP children we teach from the school textbook and, in Classes 9 and 10, practise writing answers the way the High School paper rewards — complete steps in Mathematics, properly structured answers in Science and the languages.',
    },
    {
      q: 'Do you teach Sanskrit?',
      a: 'No. Sanskrit is common as an additional language in Lucknow schools, but our subjects are English, Hindi, Mathematics, Science and Kannada.',
    },
    { q: 'Are your tutors in Lucknow, and do they come home?', a: TUTORS_ANSWER('Lucknow') },
  ],

  'online-tuition-surat': [
    {
      q: 'Can classes work around a family business schedule?',
      a: 'Yes — that is the usual reason Surat families choose online over a centre. Early morning, late evening and weekend slots are all available, and because there is no travel, a busy evening at the shop does not cost the whole class.',
    },
    {
      q: 'Do you teach Gujarati?',
      a: 'No. Gujarati is a school language subject here and sits outside our five subjects — English, Hindi, Mathematics, Science and Kannada.',
    },
    { q: 'What do classes cost?', a: FEES_ANSWER },
  ],

  'online-tuition-nagpur': [
    {
      q: 'There are few specialist tutors near us. Does online actually work for Classes 9 and 10?',
      a: 'It is where online helps most: the tutor is chosen for how well they teach Class 9 and 10 Mathematics or Science, not for living within driving distance. Classes are live and one-on-one, with the tutor working through your child’s own textbook on screen.',
    },
    {
      q: 'Do you teach Marathi?',
      a: 'No. Marathi is a compulsory school language subject in Maharashtra and is outside our five subjects — English, Hindi, Mathematics, Science and Kannada.',
    },
    { q: 'Are your tutors in Nagpur, and do they come home?', a: TUTORS_ANSWER('Nagpur') },
  ],

  'online-tuition-indore': [
    {
      q: 'Is this coaching for competitive exams?',
      a: 'No. We teach the school syllabus — the MP Board or NCERT textbook your child actually studies from, one-on-one. Indore has plenty of competitive-exam coaching; our job is making sure the school material underneath it is genuinely understood first.',
    },
    {
      q: 'Do you follow the MP Board syllabus?',
      a: 'Yes, and CBSE too. The tutor teaches from the textbook your child’s school uses and follows the school’s chapter order rather than a plan of our own.',
    },
    { q: 'What do classes cost?', a: FEES_ANSWER },
  ],

  'online-tuition-visakhapatnam': [
    {
      q: 'Do you teach Telugu?',
      a: 'No. Telugu is a compulsory language subject in Andhra Pradesh schools, and our five subjects are English, Hindi, Mathematics, Science and Kannada.',
    },
    {
      q: 'My child has just started Hindi in a CBSE school. Can you teach it from scratch?',
      a: 'Yes. For many Vizag children Hindi begins only in a CBSE school, and starting mid-syllabus is what makes it feel impossible. We begin at your child’s actual level — reading and basic writing first — and catch up to the class from there.',
    },
    { q: 'Are your tutors in Visakhapatnam, and do they come home?', a: TUTORS_ANSWER('Visakhapatnam') },
  ],

  'online-tuition-patna': [
    {
      q: 'How is this different from the batch tuition everyone here uses?',
      a: 'Every class is one-on-one. In a batch of twenty or thirty, a child who is quietly lost stays lost, because the class has to move at the room’s pace. With one child on the call, the tutor cannot move on until yours has understood.',
    },
    {
      q: 'Do you prepare children for the BSEB Matric exam?',
      a: 'Yes. We teach from the Bihar Board textbook your child uses, and in Classes 9 and 10 add practice in writing answers the way the Matric paper rewards, with full working shown.',
    },
    { q: 'What do classes cost?', a: FEES_ANSWER },
  ],

  'online-tuition-coimbatore': [
    {
      q: 'Do you follow the Samacheer Kalvi books?',
      a: 'Yes, for Mathematics, Science and English. The tutor teaches from your child’s own copy and follows the school’s chapter order, so the class reinforces the week’s lesson instead of running ahead of it.',
    },
    {
      q: 'Can you teach Hindi to a child who has never studied it?',
      a: 'Yes. Because Tamil Nadu schools follow a two-language pattern, Hindi usually starts only in a CBSE or ICSE school. We begin from reading and basic writing at whatever level your child is actually at.',
    },
    { q: 'Are your tutors in Coimbatore, and do they come home?', a: TUTORS_ANSWER('Coimbatore') },
  ],

  'online-tuition-mysuru': [
    {
      q: 'Do you teach the Karnataka SSLC syllabus?',
      a: 'Yes — it is the board our tutors know best, since we are based in Bengaluru. We teach from your child’s KSEAB textbook and follow the school’s chapter order, and we teach CBSE and ICSE children in Mysuru the same way.',
    },
    {
      q: 'Can you help with Kannada reading and writing?',
      a: 'Yes. Kannada is one of the five subjects we teach, including for children in English-medium schools who speak it at home but struggle to read and write it for marks.',
    },
    { q: 'What do classes cost?', a: FEES_ANSWER },
  ],

  'online-tuition-kochi': [
    {
      q: 'Do you teach Malayalam?',
      a: 'No. Malayalam is a school language subject in Kerala and falls outside our five subjects — English, Hindi, Mathematics, Science and Kannada. Hindi, which Kerala schools do teach, is one of ours.',
    },
    {
      q: 'Do you follow the Kerala state syllabus as well as CBSE?',
      a: 'Yes. For SSLC children we teach from the Kerala textbook and follow the school’s order; for CBSE children, the NCERT book. The demo class is where we check which one your child is actually working from and where the gaps are.',
    },
    { q: 'Are your tutors in Kochi, and do they come home?', a: TUTORS_ANSWER('Kochi') },
  ],

  'online-tuition-bhubaneswar': [
    {
      q: 'Do you teach Odia?',
      a: 'No. Odia is a school language subject across Odisha, and our subjects are English, Hindi, Mathematics, Science and Kannada.',
    },
    {
      q: 'Can one tutor cover Mathematics and Science, or do we need two?',
      a: 'Most families take one subject per class slot, with the same tutor where they teach both. If your child needs Mathematics and Science, we usually set two weekly slots rather than splitting one class between subjects — half an hour each ends up helping neither.',
    },
    { q: 'What do classes cost?', a: FEES_ANSWER },
  ],

  'online-tuition-chandigarh': [
    {
      q: 'We move every few years with a posting. Can classes continue?',
      a: 'Yes — that is one of the real advantages of online. The same tutor continues wherever you are posted, and when the school changes we start by finding out exactly where the new school’s syllabus sits against the old one.',
    },
    {
      q: 'Do you teach Punjabi?',
      a: 'No. Punjabi is taught as a language subject in Chandigarh schools, and our five subjects are English, Hindi, Mathematics, Science and Kannada.',
    },
    { q: 'Are your tutors in Chandigarh, and do they come home?', a: TUTORS_ANSWER('Chandigarh') },
  ],

  'online-tuition-uae': [
    {
      q: 'What time would classes be in Dubai or Abu Dhabi?',
      a: 'India is 1 hour 30 minutes ahead, so almost any after-school hour works: a 6pm class in the UAE is 7.30pm in India. Morning slots before school are equally easy, and weekend timings are flexible.',
    },
    {
      q: 'Our school follows CBSE. Do you teach the same books?',
      a: 'Yes. Many Indian schools in the UAE follow CBSE, so the NCERT textbook is the one we work with every day. If your child’s school follows ICSE or a British curriculum, we teach from that material instead.',
    },
    {
      q: 'Can our child keep up Hindi or Kannada while living abroad?',
      a: 'Yes, and it is a common reason UAE families come to us. We teach both as school subjects and as reading and writing practice for children who speak the language at home but have never learnt to write it.',
    },
  ],

  'online-tuition-singapore': [
    {
      q: 'What time would classes be in Singapore?',
      a: 'Singapore is 2 hours 30 minutes ahead of India, so a 5.30pm class there is 3pm in India — a comfortable slot on both sides, which is why Singapore timings rarely need rescheduling.',
    },
    {
      q: 'Our child is in the Singapore national curriculum, not CBSE. Can you still help?',
      a: 'Yes. We teach from your child’s own school material rather than an Indian textbook. Mathematics and Science are where we help most in that case, alongside Hindi or Kannada as a home language.',
    },
    { q: 'What do classes cost?', a: FEES_ANSWER },
  ],

  'online-tuition-uk': [
    {
      q: 'What time would classes be in the UK?',
      a: 'India is 4 hours 30 minutes ahead in British Summer Time and 5 hours 30 minutes ahead in winter. Most UK families settle on a late-afternoon UK slot or a weekend morning, both of which land in a normal Indian evening.',
    },
    {
      q: 'Do you teach the GCSE syllabus?',
      a: 'We teach from your child’s own school material and specification rather than an Indian textbook. For GCSE Mathematics and Science that works well; we are not an exam board specialist, so we are upfront that our strength is explaining the underlying topics one-on-one.',
    },
    {
      q: 'Can our child learn Hindi or Kannada as a heritage language?',
      a: 'Yes. This is a frequent request from UK families — reading and writing a language the child hears at home but has never studied formally. We start from the alphabet if that is where they are.',
    },
  ],

  'online-tuition-usa': [
    {
      q: 'How do the timings work with the time difference?',
      a: 'India is roughly 9 hours 30 minutes ahead of US Eastern time and 12 hours 30 minutes ahead of Pacific, shifting an hour with daylight saving. Two patterns work: early morning before school US time, which is a normal Indian evening, or weekend mornings.',
    },
    {
      q: 'Our child is in a US school. Can you teach that curriculum?',
      a: 'We teach from your child’s own class material rather than an Indian textbook, and we are honest about the fit: Mathematics and Science support one-on-one is where we help most, plus Hindi or Kannada for children growing up away from the language.',
    },
    { q: 'What do classes cost?', a: FEES_ANSWER },
  ],
};
