// City-specific detail for the /online-tuition-<city> pages.
//
// Every city page otherwise shares one template, which left ~75% of the wording
// identical from page to page (measured with 5-word shingles, 2026-09-29) — the
// kind of near-duplication Google puts off indexing. This file gives each city
// the things that genuinely differ: the state board and what its Class 10 exam
// is called, which language subjects that state's schools require, and what
// that means for a family looking for tuition.
//
// Rules for anything added here:
//  - Facts about boards and school languages only, no invented local colour and
//    no made-up parent quotes.
//  - We teach English, Hindi, Mathematics, Science and Kannada. Where a state's
//    own language is something we do not teach, say so plainly — a parent who
//    finds that out in the demo class is a parent we have wasted time.
//  - No tutor is claimed to live in the city. Classes are online; the Bengaluru
//    page is the only one where being local is part of the story.

export const CITY_PAGE_DETAILS = {
  'online-tuition-bengaluru': {
    heading: 'Boards and languages in Bengaluru schools',
    paragraphs: [
      'Karnataka’s own board is the Karnataka School Examination and Assessment Board, and its Class 10 public exam is the SSLC. Bengaluru is unusual in that a single neighbourhood can have SSLC, CBSE and ICSE schools within a few streets of each other, so families often compare all three before admission — and children sometimes switch between them mid-school.',
      'Kannada is a compulsory language subject in Karnataka schools, whichever board the school follows. That catches out plenty of families: a child in an English-medium CBSE school may speak Kannada at home and still struggle to read and write it for marks. Kannada is one of the five subjects we teach, so this is the one state language we can take on directly.',
    ],
    facts: [
      ['State board', 'Karnataka School Examination and Assessment Board (KSEAB)'],
      ['Class 10 exam', 'SSLC'],
      ['Compulsory language subject', 'Kannada'],
      ['Subjects we teach here', 'English, Hindi, Mathematics, Science, Kannada'],
    ],
  },

  'online-tuition-mumbai': {
    heading: 'Boards and languages in Mumbai schools',
    paragraphs: [
      'Maharashtra’s state board is the MSBSHSE, and its Class 10 exam is called the SSC. Mumbai runs all three boards at scale — SSC, CBSE and ICSE — and ICSE in particular is well established here, which is why the English paper carries more weight for many Mumbai children than their cousins in other cities.',
      'Marathi is taught as a compulsory language subject in schools across Maharashtra, including CBSE and ICSE ones. We do not teach Marathi, so if that is the subject your child is behind in, a local Marathi tutor is the right choice. Where we help Mumbai families is English, Hindi, Mathematics and Science — and Hindi in particular, which many children here pick up by ear but lose marks on in writing.',
    ],
    facts: [
      ['State board', 'Maharashtra State Board (MSBSHSE)'],
      ['Class 10 exam', 'SSC'],
      ['Compulsory language subject', 'Marathi (we do not teach Marathi)'],
      ['Subjects we teach here', 'English, Hindi, Mathematics, Science, Kannada'],
    ],
  },

  'online-tuition-delhi': {
    heading: 'Boards and languages in Delhi NCR schools',
    paragraphs: [
      'Delhi, Gurgaon and Noida are overwhelmingly CBSE, so for most children here the Class 10 exam is the CBSE board exam and the textbooks are NCERT. That makes the syllabus easy for us to follow exactly — the same chapter, in the same order, as the school covered it that week.',
      'Hindi is normally the second language, and many NCR schools add Sanskrit as a third language from Class 6. Hindi is a subject we teach, and it is one of the most common reasons NCR parents call us: a child who converses fluently in Hindi can still lose marks on grammar, comprehension and formal letter writing. Sanskrit we do not teach.',
    ],
    facts: [
      ['Main board', 'CBSE (NCERT textbooks)'],
      ['Class 10 exam', 'CBSE board exam'],
      ['Usual language subjects', 'Hindi, often Sanskrit from Class 6 (no Sanskrit from us)'],
      ['Subjects we teach here', 'English, Hindi, Mathematics, Science, Kannada'],
    ],
  },

  'online-tuition-hyderabad': {
    heading: 'Boards and languages in Hyderabad schools',
    paragraphs: [
      'Telangana’s state board conducts the Class 10 SSC exam, and Hyderabad also has a large CBSE presence, especially in the newer school chains around the IT corridor. Families who move into the city for work often shift a child from a state board to CBSE, which usually means a harder Mathematics and Science jump than parents expect.',
      'Telugu is a compulsory language subject in Telangana schools. We do not teach Telugu — for that you want a local tutor. What we are asked for most in Hyderabad is Hindi and English for CBSE children, and Mathematics and Science support through the SSC syllabus for state board children.',
    ],
    facts: [
      ['State board', 'Board of Secondary Education, Telangana'],
      ['Class 10 exam', 'SSC'],
      ['Compulsory language subject', 'Telugu (we do not teach Telugu)'],
      ['Subjects we teach here', 'English, Hindi, Mathematics, Science, Kannada'],
    ],
  },

  'online-tuition-chennai': {
    heading: 'Samacheer Kalvi and the two-language rule in Chennai',
    paragraphs: [
      'Tamil Nadu’s state schools use the Samacheer Kalvi textbooks and sit the SSLC at the end of Class 10. Chennai also has strong CBSE and ICSE schools, so the same street can have children on three quite different Class 10 papers.',
      'Tamil Nadu follows a two-language pattern — Tamil and English — so Hindi usually appears only in CBSE and ICSE schools here. That is worth knowing if your child moves from a state school to CBSE mid-way: Hindi may start several years behind where the class is. We teach English, Hindi, Mathematics and Science, and Hindi from scratch is a common request from Chennai families. We do not teach Tamil.',
    ],
    facts: [
      ['State board', 'Tamil Nadu DGE (Samacheer Kalvi textbooks)'],
      ['Class 10 exam', 'SSLC'],
      ['Language pattern', 'Tamil + English; Hindi mainly in CBSE/ICSE schools (no Tamil from us)'],
      ['Subjects we teach here', 'English, Hindi, Mathematics, Science, Kannada'],
    ],
  },

  'online-tuition-pune': {
    heading: 'Boards and languages in Pune schools',
    paragraphs: [
      'Pune sits on the same Maharashtra State Board as Mumbai, with the Class 10 SSC exam, alongside a large number of CBSE and ICSE schools serving families who move into the city for work or study.',
      'Marathi is a compulsory language subject in Maharashtra schools, and we do not teach it — a local tutor is the better answer there. Pune parents most often come to us for Mathematics and Science from Class 6 onward, where the SSC and CBSE syllabuses both pick up pace, and for Hindi writing practice.',
    ],
    facts: [
      ['State board', 'Maharashtra State Board (MSBSHSE)'],
      ['Class 10 exam', 'SSC'],
      ['Compulsory language subject', 'Marathi (we do not teach Marathi)'],
      ['Subjects we teach here', 'English, Hindi, Mathematics, Science, Kannada'],
    ],
  },

  'online-tuition-kolkata': {
    heading: 'Madhyamik, boards and languages in Kolkata',
    paragraphs: [
      'West Bengal’s board exam at the end of Class 10 is the Madhyamik, conducted by the WBBSE — a name no other state uses, and one reason Kolkata parents are wary of tuition that talks in generic "board exam" terms. Kolkata also has a long ICSE tradition, so the English paper is often taken more seriously here than elsewhere.',
      'Bengali is taught as a language subject in schools across the state, and we do not teach Bengali. Where we help is English, Hindi, Mathematics and Science — including Hindi for children in CBSE and ICSE schools whose families speak Bengali or English at home.',
    ],
    facts: [
      ['State board', 'West Bengal Board of Secondary Education (WBBSE)'],
      ['Class 10 exam', 'Madhyamik'],
      ['Usual language subject', 'Bengali (we do not teach Bengali)'],
      ['Subjects we teach here', 'English, Hindi, Mathematics, Science, Kannada'],
    ],
  },

  'online-tuition-ahmedabad': {
    heading: 'Boards and languages in Ahmedabad schools',
    paragraphs: [
      'Gujarat’s state board, the GSEB, runs the Class 10 SSC exam, and Ahmedabad has a steady shift of families moving children into CBSE schools for the NCERT syllabus. Both routes are common enough here that a tutor has to ask which textbook is on the table before planning anything.',
      'Gujarati is taught as a language subject in schools across the state, including many CBSE ones, and it is not a subject we teach. Ahmedabad families come to us mainly for English — spoken confidence as well as written marks — plus Mathematics, Science and Hindi.',
    ],
    facts: [
      ['State board', 'Gujarat Secondary Education Board (GSEB)'],
      ['Class 10 exam', 'SSC'],
      ['Usual language subject', 'Gujarati (we do not teach Gujarati)'],
      ['Subjects we teach here', 'English, Hindi, Mathematics, Science, Kannada'],
    ],
  },

  'online-tuition-jaipur': {
    heading: 'Boards and languages in Jaipur schools',
    paragraphs: [
      'Rajasthan’s board, the RBSE at Ajmer, conducts the Class 10 Secondary Examination, and a large share of Jaipur schools teach in Hindi medium. CBSE schools are common too, particularly for families aiming at national entrance exams later.',
      'For Hindi-medium children, the subject that most often needs help is English — and that is the request we get most from Jaipur. We teach English from the school textbook rather than as a spoken-English course, so the marks and the confidence improve together. Mathematics, Science and Hindi are the other subjects we cover.',
    ],
    facts: [
      ['State board', 'Board of Secondary Education, Rajasthan (RBSE), Ajmer'],
      ['Class 10 exam', 'Secondary Examination'],
      ['Common medium', 'Hindi medium in many schools'],
      ['Subjects we teach here', 'English, Hindi, Mathematics, Science, Kannada'],
    ],
  },

  'online-tuition-lucknow': {
    heading: 'Boards and languages in Lucknow schools',
    paragraphs: [
      'Uttar Pradesh’s board, the UPMSP, calls its Class 10 exam the High School examination — not "SSC" or "SSLC" — and it is one of the largest school boards in the world by candidate numbers. Lucknow also has well-known CBSE and ICSE schools, so the mix within one family’s circle can be wide.',
      'Hindi is the main language subject, with Sanskrit common as an additional one. We teach Hindi and English; Sanskrit we do not. The most frequent ask from Lucknow parents is English for children in Hindi-medium or mixed-medium schools, where the syllabus assumes a fluency the classroom has not built.',
    ],
    facts: [
      ['State board', 'UP Board (UPMSP)'],
      ['Class 10 exam', 'High School examination'],
      ['Usual language subjects', 'Hindi, often Sanskrit (no Sanskrit from us)'],
      ['Subjects we teach here', 'English, Hindi, Mathematics, Science, Kannada'],
    ],
  },

  'online-tuition-surat': {
    heading: 'Boards and languages in Surat schools',
    paragraphs: [
      'Surat’s schools sit under the Gujarat board (GSEB) for the Class 10 SSC exam, with a growing number of CBSE schools. In a city built on family businesses, tuition often has to fit around a working evening at the shop or the unit rather than a fixed school-hours routine.',
      'Gujarati is a school language subject here and is not something we teach. Surat parents most often ask us for English and Mathematics, and for the kind of steady weekly slot that does not collapse the moment the business gets busy — which is easier online than at a centre across town.',
    ],
    facts: [
      ['State board', 'Gujarat Secondary Education Board (GSEB)'],
      ['Class 10 exam', 'SSC'],
      ['Usual language subject', 'Gujarati (we do not teach Gujarati)'],
      ['Subjects we teach here', 'English, Hindi, Mathematics, Science, Kannada'],
    ],
  },

  'online-tuition-nagpur': {
    heading: 'Boards and languages in Nagpur schools',
    paragraphs: [
      'Nagpur follows the Maharashtra State Board and its Class 10 SSC exam, with CBSE schools spread across the city. Being a long way from Mumbai and Pune, families here have fewer specialist tuition options locally — which is exactly where online classes remove the geography problem.',
      'Marathi is a compulsory school language subject and we do not teach it. What Nagpur parents ask us for is Mathematics and Science from the middle classes upward, and English writing practice — the two places where marks slip quietly before Class 10.',
    ],
    facts: [
      ['State board', 'Maharashtra State Board (MSBSHSE)'],
      ['Class 10 exam', 'SSC'],
      ['Compulsory language subject', 'Marathi (we do not teach Marathi)'],
      ['Subjects we teach here', 'English, Hindi, Mathematics, Science, Kannada'],
    ],
  },

  'online-tuition-indore': {
    heading: 'Boards and languages in Indore schools',
    paragraphs: [
      'Madhya Pradesh’s board, the MPBSE, conducts the Class 10 High School Certificate Examination, and Indore has a strong CBSE presence alongside it. The city’s coaching culture starts early, which can mean a child is pushed into competitive-exam material before the school syllabus itself is secure.',
      'Hindi is the main language subject, and we teach both Hindi and English. Our usual role in Indore is the unglamorous one: making sure the school textbook is genuinely understood — chapter by chapter, with working shown — before any exam-cracking layer is added on top.',
    ],
    facts: [
      ['State board', 'MP Board (MPBSE)'],
      ['Class 10 exam', 'High School Certificate Examination'],
      ['Usual language subject', 'Hindi'],
      ['Subjects we teach here', 'English, Hindi, Mathematics, Science, Kannada'],
    ],
  },

  'online-tuition-visakhapatnam': {
    heading: 'Boards and languages in Visakhapatnam schools',
    paragraphs: [
      'Andhra Pradesh’s board conducts the Class 10 SSC exam, and Vizag has a solid set of CBSE schools as well, particularly those attached to the port and steel-plant townships.',
      'Telugu is a compulsory language subject in Andhra Pradesh schools and is not one we teach. Vizag families come to us for English, Mathematics and Science, and for Hindi — which for many children here starts only in a CBSE school and can feel like a foreign language for a year or two.',
    ],
    facts: [
      ['State board', 'Board of Secondary Education, Andhra Pradesh'],
      ['Class 10 exam', 'SSC'],
      ['Compulsory language subject', 'Telugu (we do not teach Telugu)'],
      ['Subjects we teach here', 'English, Hindi, Mathematics, Science, Kannada'],
    ],
  },

  'online-tuition-patna': {
    heading: 'Boards and languages in Patna schools',
    paragraphs: [
      'Bihar’s board, the BSEB, runs the Class 10 Matriculation exam, and Patna has a well-known set of CBSE schools too. Competition for seats and for exam ranks is intense here, and tuition is often bought by the batch — thirty children in a room — which is the opposite of what a child who is quietly behind actually needs.',
      'Hindi is the main language subject, with Sanskrit a common additional one; we teach Hindi and English but not Sanskrit. One-on-one is the whole point of what we do: the tutor cannot move on until your child has understood, because there is nobody else in the class to move on for.',
    ],
    facts: [
      ['State board', 'Bihar School Examination Board (BSEB)'],
      ['Class 10 exam', 'Matriculation'],
      ['Usual language subjects', 'Hindi, often Sanskrit (no Sanskrit from us)'],
      ['Subjects we teach here', 'English, Hindi, Mathematics, Science, Kannada'],
    ],
  },

  'online-tuition-coimbatore': {
    heading: 'Samacheer Kalvi and languages in Coimbatore',
    paragraphs: [
      'Coimbatore’s state schools use the Samacheer Kalvi textbooks and sit the SSLC in Class 10, and the city has a long-standing set of CBSE and ICSE schools serving its textile and engineering families.',
      'Like the rest of Tamil Nadu, schools here follow a two-language pattern of Tamil and English, so Hindi generally appears only in CBSE and ICSE schools. We teach English, Hindi, Mathematics and Science — Hindi often from the very beginning for children who never had it in a state school. Tamil is not a subject we teach.',
    ],
    facts: [
      ['State board', 'Tamil Nadu DGE (Samacheer Kalvi textbooks)'],
      ['Class 10 exam', 'SSLC'],
      ['Language pattern', 'Tamil + English; Hindi mainly in CBSE/ICSE schools (no Tamil from us)'],
      ['Subjects we teach here', 'English, Hindi, Mathematics, Science, Kannada'],
    ],
  },

  'online-tuition-mysuru': {
    heading: 'Boards and languages in Mysuru schools',
    paragraphs: [
      'Mysuru sits on the same Karnataka board as Bengaluru — the SSLC in Class 10, conducted by KSEAB — alongside CBSE and ICSE schools. Being our home state board, it is the syllabus our tutors work with most.',
      'Kannada is a compulsory language subject in Karnataka schools, and it is one of the five subjects we teach, including reading and writing for children in English-medium schools. Mysuru families also come to us for Mathematics and Science, where the SSLC exam rewards clearly set-out working.',
    ],
    facts: [
      ['State board', 'Karnataka School Examination and Assessment Board (KSEAB)'],
      ['Class 10 exam', 'SSLC'],
      ['Compulsory language subject', 'Kannada'],
      ['Subjects we teach here', 'English, Hindi, Mathematics, Science, Kannada'],
    ],
  },

  'online-tuition-kochi': {
    heading: 'Boards and languages in Kochi schools',
    paragraphs: [
      'Kerala’s state schools sit the SSLC at the end of Class 10, and Kochi also has a large CBSE contingent. Kerala’s state syllabus is unusual in how early it pushes English, so children moving between boards here often find the language gap smaller than the Mathematics one.',
      'Malayalam is a school language subject in Kerala and is not one we teach. Hindi, unlike in Tamil Nadu, is taught in Kerala state schools as well as CBSE ones — and it is one of ours, along with English, Mathematics and Science.',
    ],
    facts: [
      ['State board', 'Kerala Board of Public Examinations (SCERT syllabus)'],
      ['Class 10 exam', 'SSLC'],
      ['Usual language subjects', 'Malayalam (not taught by us), Hindi, English'],
      ['Subjects we teach here', 'English, Hindi, Mathematics, Science, Kannada'],
    ],
  },

  'online-tuition-bhubaneswar': {
    heading: 'Boards and languages in Bhubaneswar schools',
    paragraphs: [
      'Odisha’s board, the BSE Odisha, conducts the Class 10 HSC examination, and Bhubaneswar has a growing set of CBSE schools around its technology and education campuses.',
      'Odia is taught as a school language subject across the state and is not one we teach. Bhubaneswar parents ask us mainly for Mathematics, Science and English, and for Hindi where a CBSE school expects it — a combination that is easier to arrange online than through separate local tutors for each subject.',
    ],
    facts: [
      ['State board', 'Board of Secondary Education, Odisha'],
      ['Class 10 exam', 'HSC examination'],
      ['Usual language subject', 'Odia (we do not teach Odia)'],
      ['Subjects we teach here', 'English, Hindi, Mathematics, Science, Kannada'],
    ],
  },

  'online-tuition-chandigarh': {
    heading: 'Boards and languages in Chandigarh schools',
    paragraphs: [
      'Chandigarh is a union territory whose schools are largely affiliated to CBSE, so for most children here Class 10 means the CBSE board exam and NCERT textbooks. Families frequently move in and out with government and defence postings, which makes a tutor who travels with the child — because the class is online — genuinely useful.',
      'Punjabi is taught as a language subject in Chandigarh schools, and we do not teach it. Hindi, English, Mathematics and Science are ours, and mid-year joiners are the case we handle most here: finding out exactly where the previous school stopped, and filling that gap before moving on.',
    ],
    facts: [
      ['Main board', 'CBSE (NCERT textbooks)'],
      ['Class 10 exam', 'CBSE board exam'],
      ['Usual language subjects', 'Hindi, Punjabi (we do not teach Punjabi)'],
      ['Subjects we teach here', 'English, Hindi, Mathematics, Science, Kannada'],
    ],
  },

  // ---------- outside India: the useful specifics are time zones and curriculum ----------

  'online-tuition-uae': {
    heading: 'Timings and curriculum for families in the UAE',
    paragraphs: [
      'India is 1 hour 30 minutes ahead of the UAE, which makes the UAE one of the easiest places for us to teach: a 6pm class in Dubai, Sharjah or Abu Dhabi is 7.30pm in India, comfortably inside a tutor’s normal evening.',
      'Many Indian schools in the UAE follow CBSE, so the textbook is usually the same NCERT one we work with every day; some follow ICSE or a British curriculum instead, and we teach from whichever book your child actually uses. Kannada and Hindi are a common request from UAE families who want a child to keep the language while growing up abroad.',
    ],
    facts: [
      ['Time difference', 'India is 1 hr 30 min ahead of the UAE'],
      ['Comfortable slots', 'Morning before school, or 4–8pm UAE time'],
      ['Usual curriculum', 'CBSE in many Indian schools; also ICSE and British curriculum'],
      ['Subjects we teach here', 'English, Hindi, Mathematics, Science, Kannada'],
    ],
  },

  'online-tuition-singapore': {
    heading: 'Timings and curriculum for families in Singapore',
    paragraphs: [
      'Singapore is 2 hours 30 minutes ahead of India, so an after-school class at 5.30pm in Singapore is 3pm in India — an easy slot to hold week after week, and one reason Singapore families rarely need to reschedule.',
      'Children here may be in the Singapore national curriculum or in an Indian-curriculum school following CBSE. We teach from the book in front of your child either way, and Hindi and Kannada are frequent requests from families who want the language kept up while living abroad.',
    ],
    facts: [
      ['Time difference', 'Singapore is 2 hr 30 min ahead of India'],
      ['Comfortable slots', '4–8pm Singapore time, or weekend mornings'],
      ['Usual curriculum', 'Singapore national curriculum, or CBSE in Indian-curriculum schools'],
      ['Subjects we teach here', 'English, Hindi, Mathematics, Science, Kannada'],
    ],
  },

  'online-tuition-uk': {
    heading: 'Timings and curriculum for families in the UK',
    paragraphs: [
      'India is 4 hours 30 minutes ahead of the UK in British Summer Time and 5 hours 30 minutes ahead in winter. An after-school class at 5pm in London is 10.30pm in India in winter, so UK families usually settle on late-afternoon UK slots, or weekend mornings, which land in a comfortable Indian evening.',
      'Most children here follow the English national curriculum towards GCSEs, which is structured differently from CBSE — so we teach from your child’s own school material and specification rather than an Indian textbook. Hindi and Kannada for heritage learners are a common request from UK families as well.',
    ],
    facts: [
      ['Time difference', 'India is 4 hr 30 min (summer) or 5 hr 30 min (winter) ahead of the UK'],
      ['Comfortable slots', 'Weekend mornings, or 3–5pm UK time'],
      ['Usual curriculum', 'English national curriculum / GCSE'],
      ['Subjects we teach here', 'English, Hindi, Mathematics, Science, Kannada'],
    ],
  },

  'online-tuition-usa': {
    heading: 'Timings and curriculum for families in the USA',
    paragraphs: [
      'The time gap is the thing to plan around: India is about 9 hours 30 minutes ahead of US Eastern time and about 12 hours 30 minutes ahead of Pacific time, shifting by an hour when daylight saving changes. In practice that means two workable patterns — early morning US time before school, which is a normal Indian evening, or weekend mornings.',
      'Children here follow a US school curriculum, so we teach from your child’s own class material rather than an Indian textbook, and we are honest about where that fits us best: Mathematics and Science support, and Hindi or Kannada for children growing up away from the language.',
    ],
    facts: [
      ['Time difference', 'India is about 9 hr 30 min (Eastern) to 12 hr 30 min (Pacific) ahead'],
      ['Comfortable slots', 'Before school US time, or weekend mornings'],
      ['Usual curriculum', 'US school curriculum (we teach from your child’s own material)'],
      ['Subjects we teach here', 'English, Hindi, Mathematics, Science, Kannada'],
    ],
  },
};
