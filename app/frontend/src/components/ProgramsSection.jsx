const CARDS = [
  {
    color: 'marigold', grade: 'Classes 1–4', title: 'Foundation',
    items: [
      'English, Hindi & Kannada alphabets, reading and writing basics',
      'Number sense, counting and basic arithmetic',
      'Simple Science — plants, animals, our body',
      'Making every subject feel familiar, not foreign',
    ],
  },
  {
    color: 'oxide', grade: 'Classes 5–7', title: 'Building blocks',
    items: [
      'Grammar in English, Hindi and Kannada, explained simply',
      'Fractions, geometry basics and problem-solving in Math',
      'Science concepts explained with everyday examples',
      'Regular practice with correction and feedback',
    ],
  },
  {
    color: 'banana', grade: 'Classes 8–10', title: 'Board ready',
    items: [
      'Textbook-aligned lessons and previous-year papers',
      'Essay and letter-writing practice in English, Hindi and Kannada',
      'Algebra, geometry and exam-focused Math practice',
      'Physics, Chemistry & Biology fundamentals for boards',
      'Focused revision closer to exams',
    ],
  },
];

export default function ProgramsSection() {
  return (
    <section id="programs">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Grade-wise programs</span>
          <h2>Built around where your child actually is, not where the syllabus says they should be</h2>
          <p>A Class 3 child who is scared of reading needs something very different from a Class 9 student staring at board exams. We teach by grade band — across English, Hindi, Mathematics, Science and Kannada — so younger kids build solid basics and older kids sharpen exam technique.</p>
        </div>
        <div className="programs">
          {CARDS.map((c) => (
            <div
              key={c.title}
              className="program-card"
              style={{ '--band-color': `var(--${c.color})`, '--band-soft': `var(--${c.color}-soft)` }}
            >
              <span className="grade">{c.grade}</span>
              <h3>{c.title}</h3>
              <ul>{c.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
