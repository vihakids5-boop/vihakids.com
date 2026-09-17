import { Link } from 'react-router-dom';

const FAQS = [
  {
    q: 'Is the demo class really free?',
    a: 'Yes — completely. There is no payment, no card details and no commitment. It is a proper 30-minute class with a real tutor, so you and your child can see whether it clicks before deciding anything.',
  },
  {
    q: 'What if my child does not like the demo?',
    a: 'Then you simply do not continue. There is nothing to cancel and nothing to pay. We would rather you find the right fit for your child than sign up unsure — and we will tell you honestly if we think a different subject or pace would help more.',
  },
  {
    q: 'How soon can the demo happen?',
    a: 'We reply on WhatsApp the same day you register and fix the earliest slot that suits your family — evenings and weekends included. You choose the time; we bring the tutor.',
  },
  {
    q: 'What do we need at home?',
    a: 'A phone, tablet or laptop with an internet connection is enough. Classes run on a simple video link we send on WhatsApp — nothing to install. A notebook and pencil help for Math and language writing practice.',
  },
  {
    q: 'My child is shy or gets nervous in class. Will 1-on-1 work?',
    a: 'This is exactly where 1-on-1 helps. There is no crowd to feel judged by, the tutor works at your child’s pace, and quiet questions actually get answered. Most shy children open up within the first two or three classes.',
  },
  {
    q: 'Which classes and boards do you cover?',
    a: 'Classes 1 to 10 across CBSE, ICSE and State Board (including Karnataka State Board), in English, Hindi, Mathematics, Science and Kannada. Lessons follow your child’s own school textbook, so tuition and schoolwork stay in sync.',
  },
  {
    q: 'What does it cost after the demo?',
    a: 'One clear monthly fee per subject, starting at ₹1,499 a month for 8 classes, with no registration fee and no annual contract. You can see every price on our fees page before you book anything.',
    link: { to: '/fees', label: 'See the full fee structure' },
  },
  {
    q: 'How are classes scheduled?',
    a: 'Around school hours and homework, not the other way around. After the demo we agree on fixed weekly slots with you on WhatsApp, and a missed class can be rescheduled within the same week.',
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="faq-section">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Questions parents ask</span>
          <h2>Everything parents ask before booking the free demo</h2>
        </div>
        <div className="faq-list">
          {FAQS.map((f) => (
            <details className="faq-item" key={f.q}>
              <summary>{f.q}</summary>
              <div className="faq-answer">
                <p>{f.a}</p>
                {f.link && <Link to={f.link.to}>{f.link.label} &rarr;</Link>}
              </div>
            </details>
          ))}
        </div>
        <p className="faq-more">
          Have a different question? <Link to="/faq">Read the full parent FAQ &rarr;</Link>
        </p>
      </div>
    </section>
  );
}
