import { Link } from 'react-router-dom';

// Split-screen shell for /register: the form sits in a glass card on a soft
// gradient, with the reassurance a parent wants beside it (what happens next,
// proof, and a WhatsApp escape hatch).
const NEXT_STEPS = [
  { icon: '💬', title: 'We WhatsApp you today', text: 'Usually within a few hours, from a real person — never a bot.' },
  { icon: '🗓️', title: 'You pick the time', text: 'Evenings, weekends, early mornings. The slot that suits your family.' },
  { icon: '🎓', title: 'A free 30-minute class', text: 'With a tutor matched to your child’s class, board and textbook.' },
  { icon: '🤝', title: 'You decide afterwards', text: 'Continue only if your child enjoyed it. Nothing to pay, nothing to cancel.' },
];

const WHATSAPP_URL =
  'https://wa.me/919972577828?text=Hi%2C%20I%27d%20like%20to%20book%20a%20free%20demo%20class%20for%20my%20child';

export default function BookingLayoutV2({ eyebrow, headline, sub, quote, children, showSteps = true }) {
  return (
    <main id="top" className="v2-booking">
      <div className="v2-booking-bg" aria-hidden="true">
        <span className="v2-blob v2-blob-1" />
        <span className="v2-blob v2-blob-2" />
      </div>

      <div className="v2-booking-inner">
        <section className="v2-booking-copy">
          <Link to="/" className="v2-back">← Back to home</Link>
          <span className="v2-pill v2-pill-light">
            <span className="v2-pill-dot" aria-hidden="true" />
            {eyebrow}
          </span>
          <h1 className="v2-h1 v2-h1-booking">{headline}</h1>
          <p className="v2-lead">{sub}</p>

          {showSteps && (
            <ol className="v2-next">
              {NEXT_STEPS.map((s) => (
                <li key={s.title}>
                  <span className="v2-next-icon" aria-hidden="true">{s.icon}</span>
                  <span>
                    <strong>{s.title}</strong>
                    {s.text}
                  </span>
                </li>
              ))}
            </ol>
          )}

          {quote && (
            <blockquote className="v2-quote">
              <span className="v2-stars" aria-hidden="true">★★★★★</span>
              <p>&ldquo;{quote.text}&rdquo;</p>
              <cite>{quote.cite}</cite>
            </blockquote>
          )}

          <p className="v2-booking-alt">
            Prefer to chat first? <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Message us on WhatsApp →</a>
          </p>
        </section>

        <section className="v2-booking-form">
          <div className="v2-glass">{children}</div>
          <p className="v2-booking-safe">
            🔒 We use your number only to arrange the class. No spam, no sharing.
          </p>
        </section>
      </div>
    </main>
  );
}
