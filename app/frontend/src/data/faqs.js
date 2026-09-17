// The full parent FAQ shown on /faq. Answers are plain text (no JSX) so the
// same data can be baked into FAQPage JSON-LD by scripts/prerender.mjs.
//
// The questions come from reading what parents ask and complain about in
// public reviews of online tuition platforms for Classes 1–10 (1-on-1 vs
// batch, teacher changes, refunds, EMI pressure, sales calls, timing,
// screen time, progress updates, etc.), answered the Vihakids way.

export const FAQ_GROUPS = [
  {
    id: 'before-you-book',
    title: 'Before you book',
    intro: 'The things almost every parent checks first.',
    faqs: [
      {
        q: 'Is the demo class really free, or is it a sales call?',
        a: 'It is a real 30-minute class with a real tutor, not a presentation. There is no payment, no card details and no commitment. Your child does an actual lesson from their own textbook, you watch, and afterwards we tell you honestly what we noticed — including if we think your child does not need tuition right now.',
        link: { to: '/register', label: 'Book the free demo' },
      },
      {
        q: 'Are classes 1-on-1 or in a batch? How many children are in a class?',
        a: 'Our standard class is 1-on-1: one tutor, your child, for the full session. That is what parents in reviews of big platforms say they miss most — a child who just watches in a large batch does not learn. We also run small batches of two to four children for families who ask for it, usually siblings or friends at the same level, but we never quietly move a 1-on-1 child into a group.',
      },
      {
        q: 'Who will teach my child, and can I meet the tutor before paying?',
        a: 'Yes. The tutor who takes the free demo is the tutor your child continues with — the demo is how you meet them. Our tutors are experienced in teaching the CBSE, ICSE and State Board textbooks for their subject and are chosen for patience with children, not just qualifications. If the fit does not feel right after the demo, tell us and we will match a different tutor for another free demo.',
      },
      {
        q: 'Which classes, subjects and boards do you cover?',
        a: 'Classes 1 to 10 in English, Hindi, Mathematics, Science and Kannada, across CBSE, ICSE and State Board (including Karnataka State Board). We also support Cambridge, IB and GCSE students from Indian families abroad. Lessons follow your child’s own school textbook, so tuition and schoolwork stay in sync.',
      },
      {
        q: 'Do you follow my child’s school textbook or your own material?',
        a: 'Your child’s own textbook, chapter by chapter, in the order the school is teaching it. Practice worksheets and previous-year questions are added on top for Classes 8 to 10. Parents of children on big platforms often complain that the platform’s “generic” syllabus was ahead of, or behind, the school — we avoid that by teaching from the same book your child carries to school.',
      },
      {
        q: 'What language is the class taught in?',
        a: 'English, with explanations in Kannada or Hindi whenever that helps a child understand faster — many of our tutors are bilingual. For Kannada and Hindi tuition the class is in that language, with English support for children from non-native homes. Tell us your child’s comfort language when you book and we will match a tutor accordingly.',
      },
      {
        q: 'Can I read reviews from other parents?',
        a: 'Yes. Vihakids has a 5.0 rating on Google from parent reviews, and you can read them on our Google Business Profile before you book. We also share a few on our homepage. We do not pay for or write our own reviews.',
        link: { to: '/#reviews', label: 'Read parent reviews' },
      },
    ],
  },
  {
    id: 'classes-and-scheduling',
    title: 'Classes and scheduling',
    intro: 'How a normal week of Vihakids tuition actually works.',
    faqs: [
      {
        q: 'How long is each class, and how many classes a month?',
        a: 'A regular class is about an hour for Classes 5 to 10, and 45 minutes to an hour for younger children depending on attention span. Steady Pace is 8 classes a month (about two a week); Extra Support is up to 12 a month (about three a week) for a child who is behind or preparing for board exams. The tutor recommends the pace only after the free demo.',
        link: { to: '/fees', label: 'See the two paces and fees' },
      },
      {
        q: 'Which time slots are available? Can we choose the timing?',
        a: 'You choose. After the demo we agree fixed weekly slots with you on WhatsApp — early morning, after school, evenings and weekends are all available. Once fixed, your slot stays yours; we do not shift it without asking you first, which is a common complaint parents have about large platforms.',
      },
      {
        q: 'What happens if my child misses a class?',
        a: 'Tell us on WhatsApp and we reschedule it within the same week, with the same tutor. If the tutor ever has to cancel, the class is made up at no cost to you — you never lose a paid class because of us.',
      },
      {
        q: 'My child is in Class 1, 2 or 3. Can such a young child really focus online?',
        a: 'Yes, when the class is 1-on-1 and built for that age. Our Foundation classes for Classes 1 to 4 are shorter, use the child’s name constantly, mix reading aloud, writing in a notebook and quick games, and the tutor keeps the child talking rather than watching. A parent is welcome to sit beside a young child for the first few classes. Most children settle within two or three sessions.',
      },
      {
        q: 'I worry about screen time. How do you manage it?',
        a: 'A Vihakids class is active screen time — talking, reading aloud, writing in a notebook, solving on paper — not watching videos. Classes are limited to two or three sessions a week, homework is done on paper, not on an app, and we ask for a short break before class. Many parents find it replaces passive screen time rather than adding to it.',
      },
      {
        q: 'What do we need at home? Do I have to install an app?',
        a: 'A phone, tablet or laptop with a normal internet connection is enough. Classes run on a simple video link we send on WhatsApp — there is no app to install, no login to create and nothing to pay for. A notebook and pencil are needed for Math and writing practice.',
      },
      {
        q: 'Can my child ask doubts between classes?',
        a: 'Yes. Your child (or you) can send a photo of a doubt on WhatsApp and the tutor replies before the next class, or covers it at the start of the next session. There is no daily doubt limit and no chatbot — doubts are answered by the tutor who teaches your child.',
      },
      {
        q: 'Is there homework? How much?',
        a: 'A small amount, matched to what the school is already giving, so the child is not overloaded. For Classes 1 to 4 it is usually ten to fifteen minutes of reading or writing practice; for Classes 8 to 10 it is practice questions from the textbook and previous-year papers. The tutor checks it at the start of the next class.',
      },
    ],
  },
  {
    id: 'fees-and-commitment',
    title: 'Fees, payments and commitment',
    intro: 'The questions parents wish they had asked before paying elsewhere.',
    faqs: [
      {
        q: 'How much does it cost?',
        a: 'One clear monthly fee per subject, starting at ₹1,499 a month for 8 classes in Classes 1 to 4, and rising slightly by grade band. Every price is published on our fees page — there is nothing you have to call to find out.',
        link: { to: '/fees', label: 'See the full fee structure' },
      },
      {
        q: 'Are there any hidden charges, registration fees or annual packages?',
        a: 'No. There is no registration fee, no admission fee, no annual or multi-year package and no material charges. You pay the monthly fee for the subject your child is taking, and that is all.',
      },
      {
        q: 'Do I have to take a loan or EMI to pay?',
        a: 'Never. Fees are paid month by month, directly to Vihakids, by UPI or bank transfer. We do not partner with any loan company, we do not offer “EMI plans” and we will never ask you to sign a finance agreement. If a tuition provider ever asks you to, read the paperwork very carefully.',
      },
      {
        q: 'What is your cancellation and refund policy?',
        a: 'There is no lock-in. You are billed monthly, so if you want to stop, you simply tell us before the next month begins and nothing more is charged — there is no contract to cancel and no cancellation fee. Because you never pay for months in advance, there is no large amount sitting with us that you have to fight to get back. If something goes wrong mid-month, message us on WhatsApp and we will sort out a fair refund for the classes not taken.',
        link: { to: '/terms.html', label: 'Read the terms' },
      },
      {
        q: 'Will I get sales calls or pressure to renew?',
        a: 'No. We do not have a sales team. After the demo you get one honest WhatsApp message with what the tutor observed and the fee. If you say no, or do not reply, we do not call you again — and we never ask you for other parents’ phone numbers.',
      },
      {
        q: 'Will the fee change after I join?',
        a: 'Your monthly fee stays the same for the grade band your child is in. It changes only when your child moves up to the next band (for example from Class 4 to Class 5), and we tell you a month in advance. We do not run discounts for new parents that existing parents do not get.',
      },
      {
        q: 'Can we change the pace, add a subject or pause for a month?',
        a: 'Yes. Moving between Steady Pace and Extra Support, adding or dropping a subject, or pausing for exams or a holiday all take effect from the next billing month, with no penalty. Just tell us on WhatsApp. When you come back, the same tutor picks up where your child left off.',
      },
    ],
  },
  {
    id: 'progress-and-results',
    title: 'Progress, results and safety',
    intro: 'What happens after the first month.',
    faqs: [
      {
        q: 'How will I know whether my child is improving?',
        a: 'You hear from the tutor, not a dashboard. After each class the tutor sends a short WhatsApp note on what was covered and what to practise, and every month you get a plain-language update on where your child stands and what comes next. You can message the tutor any time with a question, and you can sit in on any class.',
      },
      {
        q: 'How soon will I see results?',
        a: 'Most parents notice a change in attitude first — the child stops dreading the subject and starts attempting questions on their own — within the first three or four weeks. Marks follow: reading fluency and basic arithmetic usually improve within a term, and Board Ready students see it in the next school test. If we do not see progress, we say so and change the approach, rather than quietly continuing to bill you.',
      },
      {
        q: 'Will the tutor keep changing?',
        a: 'No. The tutor your child meets in the demo stays with them — continuity is the single biggest reason a child settles and improves, and “teacher kept changing” is the most common complaint parents have about large platforms. If a tutor ever has to leave, we tell you in advance, introduce the new tutor with a free handover class and share your child’s notes so nothing is lost.',
      },
      {
        q: 'Can I sit in on the class?',
        a: 'Always. You are welcome in any class, especially for younger children. We would rather you see exactly how your child is being taught than take our word for it.',
      },
      {
        q: 'How do you keep my child safe online?',
        a: 'Classes are on a private video link shared only with you, a parent is welcome in every class, and tutors communicate with families through the Vihakids WhatsApp number, never through your child’s personal accounts. We collect only what we need to run the class — your name, WhatsApp number, and your child’s class and subjects — and never share it.',
        link: { to: '/privacy.html', label: 'Read our privacy policy' },
      },
      {
        q: 'What if my child does not get along with the tutor?',
        a: 'Tell us, and we match a different tutor — at no cost and without any awkwardness. A child learns from someone they are comfortable with, so a change of tutor at a parent’s request is normal for us, not a complaint.',
      },
    ],
  },
  {
    id: 'where-we-teach',
    title: 'Where we teach',
    intro: 'Vihakids is based in Bengaluru and teaches families everywhere.',
    faqs: [
      {
        q: 'Do you teach children outside Bengaluru?',
        a: 'Yes. Because classes are live online, we teach children across India — Mumbai, Delhi NCR, Hyderabad, Chennai, Pune, Kolkata, Ahmedabad and smaller towns alike. The tutor, the textbook and the fee are the same wherever you are.',
      },
      {
        q: 'We are an Indian family abroad. Can you teach us in our time zone?',
        a: 'Yes. We teach Indian families in the USA, UAE, UK and Singapore, with class slots that suit your evening or weekend rather than India’s. Kannada and Hindi classes for children growing up abroad are among our most requested, alongside Math and English for the local curriculum.',
        link: { to: '/online-tuition-usa', label: 'Online tuition for families abroad' },
      },
      {
        q: 'How do I get started?',
        a: 'Register for the free demo — it takes about thirty seconds. We reply on WhatsApp the same day, fix a slot that suits you, and your child has their first class. You decide only after you have seen it.',
        link: { to: '/register', label: 'Book a free demo class' },
      },
    ],
  },
];

export const ALL_FAQS = FAQ_GROUPS.flatMap((g) => g.faqs);

// schema.org FAQPage payload, shared by the /faq page and the prerender step.
export function buildFaqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://www.vihakids.com/faq#faqpage',
    mainEntity: ALL_FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
