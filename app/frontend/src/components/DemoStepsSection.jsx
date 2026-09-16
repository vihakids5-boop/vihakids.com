const STEPS = [
  {
    n: '1',
    color: 'oxide',
    title: 'Register in 30 seconds',
    text: "Your name, your child's class and the subject. No payment details, ever.",
  },
  {
    n: '2',
    color: 'marigold',
    title: 'We message you on WhatsApp the same day',
    text: "We fix a time that suits you and match a tutor to your child's board and class.",
  },
  {
    n: '3',
    color: 'lotus',
    title: 'Your child takes a free 30-minute class',
    text: 'You can sit in. Decide afterwards — continue only if your child enjoyed it.',
  },
];

export default function DemoStepsSection() {
  return (
    <section id="demo" className="demo-steps-section">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">How the free demo works</span>
          <h2>Three small steps. Nothing to pay, nothing to sign.</h2>
        </div>
        <ol className="demo-steps">
          {STEPS.map((s) => (
            <li className="demo-step" key={s.n} style={{ '--step-color': `var(--${s.color})`, '--step-soft': `var(--${s.color}-soft)` }}>
              <span className="demo-step-n" aria-hidden="true">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="demo-reassure">
          <span>No payment</span>
          <span>No commitment</span>
          <span>Cancel anytime</span>
          <span>Students anywhere in India</span>
        </p>
      </div>
    </section>
  );
}
