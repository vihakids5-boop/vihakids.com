import { Link } from 'react-router-dom';

// No amounts here, by the owner's decision (2026-10-05) — see FeesPage.jsx.
export default function FeesTeaserSection() {
  return (
    <section id="fees-teaser" className="fees-teaser-section">
      <div className="wrap">
        <div className="fees-teaser">
          <div className="fees-teaser-copy">
            <span className="eyebrow">Simple monthly fees</span>
            <h2>One monthly fee. No other commitment.</h2>
            <p>You pay month by month for the subject your child takes, and you only decide after the free demo. We share the fee with you on WhatsApp once the tutor has met your child.</p>
            <Link to="/fees" className="btn btn-ghost">How the fees work &rarr;</Link>
          </div>
          <ul className="fees-teaser-points">
            <li><strong>Paid monthly</strong>, per subject</li>
            <li><strong>8 or more classes</strong> every month</li>
            <li><strong>No registration fee</strong>, no annual contract</li>
            <li><strong>Stop any month</strong> &mdash; nothing to cancel</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
