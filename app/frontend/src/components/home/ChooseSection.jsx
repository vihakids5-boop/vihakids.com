import { Link } from 'react-router-dom';

// "Which online tuition should I choose?" is one of the most-searched parent
// questions in this niche (vidIQ keyword research, Sep 2026) and nobody
// answers it honestly. Five checks, with our answer beside each.
const CHECKS = [
  {
    question: 'Is it really one-on-one?',
    theirs: 'Many platforms sell "personal attention" and then seat 15 children in a batch.',
    ours: 'One tutor, one child, every class. Small batches only if you ask for them.',
  },
  {
    question: 'Will the same tutor stay?',
    theirs: '"The teacher kept changing" is the most common complaint parents write in reviews.',
    ours: 'The tutor from your free demo is the tutor who continues.',
  },
  {
    question: 'Whose syllabus is taught?',
    theirs: 'A generic in-house course that runs ahead of or behind your child’s school.',
    ours: 'Your child’s own textbook, chapter by chapter, in your school’s order.',
  },
  {
    question: 'What happens if you stop?',
    theirs: 'Year-long packages, EMI plans and refunds you have to chase.',
    ours: 'Month to month. No registration fee, no lock-in, stop whenever you like.',
  },
  {
    question: 'How many sales calls follow?',
    theirs: 'One enquiry, then months of calls from a sales team.',
    ours: 'One honest WhatsApp message after the demo. If you say no, that is the end of it.',
  },
];

export default function ChooseSection() {
  return (
    <section id="choose" className="v2-section v2-choose">
      <div className="wrap">
        <div className="v2-head">
          <span className="v2-eyebrow">Choosing an online tuition</span>
          <h2 className="v2-h2">Five questions worth asking before you pay anyone</h2>
          <p className="v2-sub">
            Including us. Ask every tuition you are considering these five, and the differences show up fast.
          </p>
        </div>

        <ol className="v2-checks">
          {CHECKS.map((c, i) => (
            <li className="v2-check" key={c.question}>
              <span className="v2-check-n" aria-hidden="true">{i + 1}</span>
              <h3>{c.question}</h3>
              <p className="v2-check-theirs"><span aria-hidden="true">⚠️</span> {c.theirs}</p>
              <p className="v2-check-ours"><span aria-hidden="true">✅</span> <strong>At Vihakids:</strong> {c.ours}</p>
            </li>
          ))}
        </ol>

        <p className="v2-center v2-choose-foot">
          Still deciding? <Link to="/faq">Read the full parent FAQ</Link> — 31 straight answers, including fees and refunds.
        </p>
      </div>
    </section>
  );
}
