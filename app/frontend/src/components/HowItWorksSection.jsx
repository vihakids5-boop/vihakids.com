const FEATURES = [
  { bg: 'oxide-soft', fg: 'oxide-dark', icon: '1:1', title: 'Live, one-on-one or small batch', text: 'Real-time classes over video, not recorded lessons — so your child can ask questions as they come up.' },
  { bg: 'sky-soft', fg: 'sky', icon: '⏰', title: 'Flexible scheduling', text: 'Classes are timed around school hours and homework, not the other way around.' },
  { bg: 'peacock-soft', fg: 'peacock', icon: 'K', title: 'CBSE, ICSE & State Board', text: "Lessons follow your child's own textbook — CBSE, ICSE, or State Board, anywhere in India — so class work and tuition stay in sync." },
  { bg: 'banana-soft', fg: 'banana', icon: '✓', title: 'Parent updates', text: "Simple, regular updates on what was covered and how your child is progressing." },
];

export default function HowItWorksSection() {
  return (
    <section id="how">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">How classes work</span>
          <h2>Everything happens online, on a schedule that fits school</h2>
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
