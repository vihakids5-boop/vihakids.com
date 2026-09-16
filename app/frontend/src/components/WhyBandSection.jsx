const ITEMS = [
  { strong: 'Tutors who teach from the school textbook', text: '— experienced English, Hindi, Math and Science teachers and native-speaking Kannada teachers, so tuition helps with tomorrow’s class, not some other syllabus.' },
  { strong: 'One child at a time', text: '— no batch to hide in, no waiting for a turn to ask, no comparing with the child next door.' },
  { strong: 'Confidence before marks', text: '— reading aloud, speaking, solving out loud. When the fear goes, the marks follow.' },
  { strong: 'No guessing for parents', text: '— regular WhatsApp updates on progress, difficulties, and what to practise at home.' },
];

export default function WhyBandSection() {
  return (
    <section className="why-band">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Why Vihakids</span>
          <h2>Why parents choose Vihakids, and why they stay</h2>
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
