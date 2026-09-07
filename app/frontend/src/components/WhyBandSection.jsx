const ITEMS = [
  { strong: 'Experienced tutors', text: '— skilled English and Hindi teachers, native-speaking Kannada teachers, and skilled Math and Science educators.' },
  { strong: 'Personal attention', text: "— small batches, not a crowded classroom your child gets lost in." },
  { strong: 'Confidence first', text: '— reading and speaking practice, not just memorising for the exam.' },
  { strong: 'Clear communication', text: 'with parents on progress, difficulties, and what to practise at home.' },
];

export default function WhyBandSection() {
  return (
    <section className="why-band">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Why Vihakids</span>
          <h2>Patient teaching for subjects that shouldn't feel intimidating</h2>
        </div>
        <div className="why-list">
          {ITEMS.map((it) => (
            <div className="why-item" key={it.strong}>
              <span className="mark">✓</span>
              <p><strong>{it.strong}</strong> {it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
