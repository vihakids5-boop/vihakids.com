import { Link } from 'react-router-dom';

const STEPS = [
  {
    n: '01',
    tone: 'oxide',
    icon: '📝',
    title: 'Tell us about your child',
    text: 'Your name, your child’s class and the subject they find hardest. Thirty seconds, no card details.',
  },
  {
    n: '02',
    tone: 'marigold',
    icon: '💬',
    title: 'We WhatsApp you the same day',
    text: 'We fix a time that suits your family and hand-pick a tutor for your child’s board, class and textbook.',
  },
  {
    n: '03',
    tone: 'lotus',
    icon: '🎓',
    title: 'Your child takes a free class',
    text: 'Sit in if you like. Watch how the tutor explains, waits and encourages — then decide.',
  },
];

export default function DemoTimeline() {
  return (
    <section id="demo" className="v2-section v2-timeline-section">
      <div className="wrap">
        <div className="v2-head">
          <span className="v2-eyebrow">How the free demo works</span>
          <h2 className="v2-h2">Three small steps. Nothing to pay, nothing to sign.</h2>
        </div>

        <ol className="v2-timeline">
          {STEPS.map((s) => (
            <li className={`v2-step tone-${s.tone}`} key={s.n}>
              <span className="v2-step-icon" aria-hidden="true">{s.icon}</span>
              <span className="v2-step-n" aria-hidden="true">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>

        <p className="v2-reassure">
          <span>No payment</span>
          <span>No commitment</span>
          <span>Cancel anytime</span>
          <span>Students anywhere in India</span>
        </p>

        <div className="v2-center">
          <Link className="btn btn-primary v2-btn" to="/register">Book the free demo</Link>
        </div>
      </div>
    </section>
  );
}
