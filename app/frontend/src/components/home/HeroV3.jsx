import { useState } from 'react';
import DemoPlanner, { DemoPass, initialPlannerValues } from './DemoPlanner';

// Hero for the 2026-10 homepage: the booking is the hero. The parent plans the
// demo on the right and the pass on the left fills in as they answer, so the
// page shows what they are getting before it asks for a phone number.
const TRUST = [
  '★ 5.0 on Google · 21 parent reviews',
  'Your child’s own school textbook',
  'The demo tutor stays your tutor',
];

// Kannada leads: it is the subject parents are least likely to assume we
// teach, and the one most other online tuitions do not offer.
const SUBJECTS_TAUGHT = ['Kannada', 'English', 'Hindi', 'Mathematics', 'Science'];

// Shown under the booking card, filling the space beside the pass. Kept to a
// few words each on purpose — the detail lives in the sections below. Every
// line is a promise already made in src/data/faqs.js.
const PARENT_NOTES = [
  ['🎁', 'Free 30-minute class'],
  ['📚', 'Keep the school textbook ready'],
  ['👀', 'You can watch the class'],
  ['💬', 'We WhatsApp you today'],
  ['📱', 'Any phone or laptop, no app'],
  ['🚫', 'No card, no commitment'],
];

export default function HeroV3() {
  // State lives here so the pass (left) and the planner (right) share it.
  const [values, setValues] = useState(initialPlannerValues());
  const [reserved, setReserved] = useState(false);

  return (
    <section className="v3-hero">
      <div className="v3-hero-inner">
        <div className="v3-hero-copy">
          <p className="v3-eyebrow">Live 1-on-1 · Classes 1–10 · CBSE, ICSE &amp; State Board</p>
          <ul className="v3-subjects" aria-label="Subjects we teach">
            {SUBJECTS_TAUGHT.map((sub) => <li key={sub}>{sub}</li>)}
          </ul>
          <h1 className="v3-h1">
            Fix the gap now, <em>not the night before exams.</em>
          </h1>
          <p className="v3-lead">
            One tutor, one child, on the textbook your child carries to school. Start with a real
            30-minute class — free, and you decide only after you have watched it.
          </p>
          <DemoPass values={values} reserved={reserved} />
          <ul className="v3-trust">
            {TRUST.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>

        <div className="v3-hero-book" id="book">
          <p className="v3-book-flag">Plan your child’s free demo — about 30 seconds</p>
          <DemoPlanner values={values} setValues={setValues} reserved={reserved} setReserved={setReserved} />
          <aside className="v3-note" aria-label="A note for parents">
            <p className="v3-note-title">Good to know, parents</p>
            <ul>
              {PARENT_NOTES.map(([icon, text]) => (
                <li key={text}><span aria-hidden="true">{icon}</span>{text}</li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
