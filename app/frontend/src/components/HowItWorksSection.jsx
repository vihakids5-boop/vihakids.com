const FEATURES = [
  { bg: 'oxide-soft', fg: 'oxide-dark', icon: '1:1', title: 'Live and one-on-one, not recorded videos', text: 'A real tutor on a live video call, so your child can say “I didn’t get that” and hear it explained a different way, right then.' },
  { bg: 'sky-soft', fg: 'sky', icon: '⏰', title: 'Fixed slots that fit around school', text: 'We agree weekly timings with you after the demo. A missed class can be rescheduled within the same week.' },
  { bg: 'peacock-soft', fg: 'peacock', icon: 'K', title: 'Your child’s own textbook', text: "CBSE, ICSE or State Board — the tutor teaches from the same book your child carries to school, so tuition and class work stay in sync." },
  { bg: 'banana-soft', fg: 'banana', icon: '✓', title: 'You always know what is going on', text: "Regular WhatsApp updates on what was covered, where your child is stuck, and what to practise at home." },
];

export default function HowItWorksSection() {
  return (
    <section id="how">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">How classes work</span>
          <h2>Real tutors, live classes, a schedule that fits around school</h2>
        </div>
        <div className="features">
          {FEATURES.map((f) => (
            <div className="feature" key={f.title}>
              <div className="icon kn" style={{ '--icon-bg': `var(--${f.bg})`, '--icon-fg': `var(--${f.fg})` }}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
