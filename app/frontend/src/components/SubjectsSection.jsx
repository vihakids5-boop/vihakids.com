const CARDS = [
  {
    color: 'peacock', grade: 'Aa', title: 'English',
    items: [
      'Phonics, alphabet and confident reading aloud',
      'Grammar, comprehension and vocabulary building',
      'Essay, letter-writing and spoken-English practice',
    ],
  },
  {
    color: 'lotus', grade: 'Aa', title: 'Hindi',
    items: [
      'Hindi alphabet, reading and writing basics',
      'Grammar, comprehension and vocabulary building',
      'Essay and letter-writing practice for exams',
    ],
  },
  {
    color: 'banana', grade: 'Math', title: 'Mathematics',
    items: [
      'Number sense, counting and basic arithmetic',
      'Fractions, geometry and problem-solving',
      'Algebra and exam-focused practice for board years',
    ],
  },
  {
    color: 'sky', grade: 'Science', title: 'Science',
    items: [
      'EVS basics — plants, animals, our body and surroundings',
      'Everyday-example explanations of Physics, Chemistry and Biology',
      'Diagrams, definitions and exam-focused practice for board years',
    ],
  },
  {
    color: 'oxide', grade: 'Aa', title: 'Kannada',
    items: [
      'Varnamale — the alphabet, read and written properly',
      'Grammar (vyakarana), comprehension and composition',
      'Poetry, prose and exam-focused writing practice',
    ],
  },
];

export default function SubjectsSection() {
  return (
    <section id="subjects">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">What we teach</span>
          <h2>Five subjects, one patient approach</h2>
          <p>Every subject gets the same personal attention — real-time classes, textbook-aligned lessons, and steady progress your child can feel, wherever in India you're learning from.</p>
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
