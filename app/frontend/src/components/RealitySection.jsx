export default function RealitySection() {
  return (
    <section id="reality">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">A common classroom reality</span>
          <h2>Some subjects need more than a crowded classroom can give</h2>
          <p>English and Hindi are often not spoken much at home, regional languages like Kannada need steady practice, and Math concepts can move faster at school than a child is ready for. That gap is where kids fall behind, and where we start — for students anywhere in India.</p>
        </div>
        <div className="contrast">
          <div className="contrast-card" style={{ '--card-accent': 'var(--sky)' }}>
            <h3>In a crowded classroom</h3>
            <p>One teacher, many students — quiet questions about grammar or a tricky sum often go unanswered.</p>
          </div>
          <div className="vs">vs</div>
          <div className="contrast-card" style={{ '--card-accent': 'var(--oxide)' }}>
            <h3>With Vihakids</h3>
            <p>One-on-one or small-batch attention in English, Hindi, Math, Science or Kannada, at your child's own pace.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
