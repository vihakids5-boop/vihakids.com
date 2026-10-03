// What actually happens in the free demo, and the facts a parent checks before
// booking. Every statement here is taken from the answers in src/data/faqs.js —
// if one of those changes, change it here too. Nothing on this page should
// promise more than the FAQ does.

const BEATS = [
  {
    when: 'Before',
    title: 'We match a tutor',
    text: 'For your child’s board, class and textbook — and their comfort language. We message you on WhatsApp the same day to fix a time.',
  },
  {
    when: 'In class',
    title: 'A real lesson, not a pitch',
    text: 'Thirty minutes from your child’s own textbook, one-on-one. No app to install — just a video link on a phone, tablet or laptop.',
  },
  {
    when: 'You',
    title: 'Watch the whole thing',
    text: 'Sit beside your child or listen from the next room. See how the tutor explains, waits, and gets your child talking.',
  },
  {
    when: 'After',
    title: 'An honest read',
    text: 'We tell you what we noticed — including if we think your child does not need tuition right now. You decide; nothing to pay until then.',
  },
];

const FACTS = [
  { k: 'Class size', v: 'One tutor, one child', d: 'Small batches of 2–4 only if you ask — siblings or friends.' },
  { k: 'Same tutor', v: 'Every class', d: 'The tutor from the demo continues with your child.' },
  { k: 'Class length', v: 'About an hour', d: '45–60 minutes for younger children, two or three times a week.' },
  { k: 'Syllabus', v: 'Your school’s textbook', d: 'Chapter by chapter, in the order the school teaches it.' },
  { k: 'After each class', v: 'A WhatsApp note', d: 'What was covered and what to practise, plus a monthly update.' },
  { k: 'Doubts', v: 'Send a photo', d: 'Answered by your child’s tutor before the next class.' },
  { k: 'Missed a class?', v: 'Rescheduled', d: 'Within the same week, with the same tutor.' },
  { k: 'You need', v: 'Any phone or laptop', d: 'No app, no login. A notebook and pencil for Math.' },
];

export default function InsideDemo() {
  return (
    <section id="demo" className="v3-section">
      <div className="wrap">
        <div className="v3-head">
          <p className="v3-eyebrow">Inside the free demo</p>
          <h2 className="v3-h2">What your 30 minutes actually look like</h2>
        </div>
        <ol className="v3-beats">
          {BEATS.map((b) => (
            <li key={b.when}>
              <span className="v3-beat-when">{b.when}</span>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </li>
          ))}
        </ol>

        <div className="v3-head v3-head-facts">
          <p className="v3-eyebrow">The answers parents ask for first</p>
          <h2 className="v3-h2">How Vihakids works, at a glance</h2>
        </div>
        <dl className="v3-facts">
          {FACTS.map((f) => (
            <div key={f.k}>
              <dt>{f.k}</dt>
              <dd><strong>{f.v}</strong>{f.d}</dd>
            </div>
          ))}
        </dl>
        <p className="v3-center"><a className="btn btn-primary v3-btn" href="#book">Plan the free demo</a></p>
      </div>
    </section>
  );
}
