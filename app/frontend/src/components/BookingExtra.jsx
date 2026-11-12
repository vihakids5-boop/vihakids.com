import { Link } from 'react-router-dom';
import { ALL_FAQS } from '../data/faqs';

// Reading content shown under the /register and /teach forms. Those pages
// were almost all form markup, so crawlers saw very little text on them.

// Reuses answers from the main parent FAQ so the two never drift apart.
const REGISTER_QUESTIONS = [
  'Is the demo class really free, or is it a sales call?',
  'Who will teach my child, and can I meet the tutor before paying?',
  'What do we need at home? Do I have to install an app?',
  'Will I get sales calls or pressure to renew?',
];

export function RegisterExtra() {
  const faqs = REGISTER_QUESTIONS.map((q) => ALL_FAQS.find((f) => f.q === q)).filter(Boolean);
  return (
    <section className="booking-extra" aria-labelledby="booking-extra-title">
      <div className="wrap">
        <h2 id="booking-extra-title">Before you book: what parents ask</h2>
        <div className="faq-list">
          {faqs.map((f) => (
            <details className="faq-item" key={f.q}>
              <summary>{f.q}</summary>
              <div className="faq-answer"><p>{f.a}</p></div>
            </details>
          ))}
        </div>
        <p className="faq-more">More questions? <Link to="/faq">Read the full parent FAQ &rarr;</Link></p>
      </div>
    </section>
  );
}

export function TeachExtra() {
  return (
    <section className="booking-extra" aria-labelledby="booking-extra-title">
      <div className="wrap prose">
        <h2 id="booking-extra-title">What teaching with Vihakids looks like</h2>
        <p>Vihakids is a Bengaluru-based online tuition service for Classes 1 to 10. Every class is live, and most are 1-on-1: one tutor and one child for the full session. Here is what the work involves, so you can decide whether it suits you before you apply.</p>
        <ul>
          <li><strong>One child at a time.</strong> Our standard class is 1-on-1. We also run small batches of two to four children when a family asks for it, usually siblings or friends at the same level.</li>
          <li><strong>The child&rsquo;s own school textbook.</strong> You teach chapter by chapter from the book the child carries to school, whether CBSE, ICSE or State Board, so tuition and schoolwork stay in sync.</li>
          <li><strong>Your students stay yours.</strong> The tutor who takes a child&rsquo;s free demo class continues with that child. Continuity is the biggest reason children settle and improve, so we do not keep changing tutors.</li>
          <li><strong>Parents hear from you.</strong> After each class you send the parent a short WhatsApp note on what was covered and what to practise, and a plain-language update every month.</li>
          <li><strong>Fixed weekly slots, from home.</strong> A class is about an hour, a little shorter for younger children, in slots agreed with the family: early mornings, after school, evenings and weekends.</li>
        </ul>
        <h2>Who we look for</h2>
        <p>We choose tutors for patience with children, not just qualifications. You should know the textbook for your subject and classes well, and be comfortable explaining the same idea a second and a third way. Tutors who can explain in Kannada or Hindi as well as English are especially welcome, because many children understand faster in the language they are most comfortable in.</p>
        <h2>How to apply</h2>
        <p>Fill in the short form on this page: your name and WhatsApp number, the subjects and classes you can teach, and your teaching experience. Once you submit it, we message you on WhatsApp.</p>
      </div>
    </section>
  );
}
