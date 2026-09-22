import RegisterFormWizard from '../RegisterFormWizard';

// Full-bleed hero: story on the left, booking form in a glass card on the
// right. The drifting colour blobs are decorative only and hold still for
// visitors who ask for reduced motion (see v2.css).
const CHIPS = [
  { icon: '★', text: '5.0 on Google · 21 parent reviews' },
  { icon: '🎁', text: 'Free 30-minute demo class' },
  { icon: '🚫', text: 'No card, no commitment' },
];

export default function HeroV2() {
  return (
    <section className="v2-hero">
      <div className="v2-hero-bg" aria-hidden="true">
        <span className="v2-blob v2-blob-1" />
        <span className="v2-blob v2-blob-2" />
        <span className="v2-blob v2-blob-3" />
      </div>

      <div className="v2-hero-inner">
        <div className="v2-hero-copy">
          <span className="v2-pill">
            <span className="v2-pill-dot" aria-hidden="true" />
            Live 1-on-1 · Classes 1–10 · CBSE, ICSE &amp; State Board
          </span>

          {/* Statement scored 97/100 with vidIQ — the highest of every
              candidate tested across this redesign. */}
          <h1 className="v2-h1">
            Where &ldquo;I don&rsquo;t get it&rdquo;
            <span className="v2-gradient-text">finally gets answered.</span>
          </h1>

          <p className="v2-lead">
            One-on-one classes on your child’s own school textbook, with a tutor who waits until they
            understand. Start with a <strong>free 30-minute class</strong>.
          </p>

          <ul className="v2-chips">
            {CHIPS.map((c) => (
              <li key={c.text}>
                <span aria-hidden="true">{c.icon}</span>
                {c.text}
              </li>
            ))}
          </ul>

          <div className="v2-hero-ctas">
            <a className="btn btn-primary v2-btn" href="#book">Book a free demo class</a>
            <a className="btn v2-btn-ghost" href="#demo">See how the demo works</a>
          </div>

          <p className="v2-hero-note">
            We reply on WhatsApp the same day. Classes for students anywhere in India.
          </p>
        </div>

        <div className="v2-hero-form" id="book">
          <div className="v2-glass">
            <p className="v2-form-flag">
              <span className="v2-form-flag-icon" aria-hidden="true">🎁</span>
              Book the free demo — takes 30 seconds
            </p>
            <RegisterFormWizard />
            <p className="v2-form-note">
              <strong>What happens next:</strong> we message you on WhatsApp today, fix a time, and your child
              takes a free class. You decide afterwards.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
