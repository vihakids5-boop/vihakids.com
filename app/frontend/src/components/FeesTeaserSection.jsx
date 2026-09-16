import { Link } from 'react-router-dom';

export default function FeesTeaserSection() {
  return (
    <section id="fees-teaser" className="fees-teaser-section">
      <div className="wrap">
        <div className="fees-teaser">
          <div className="fees-teaser-copy">
            <span className="eyebrow">Clear monthly fees</span>
            <h2>One price per subject, per month. No surprises.</h2>
            <p>You will know exactly what you pay before you commit to anything — and you only decide after the free demo.</p>
            <Link to="/fees" className="btn btn-ghost">See the full fee structure &rarr;</Link>
          </div>
          <ul className="fees-teaser-points">
            <li><strong>From &#8377;1,499</strong> per subject, per month</li>
            <li><strong>8 classes</strong> a month on Steady Pace, up to <strong>12</strong> with Extra Support</li>
            <li><strong>No registration fee</strong>, no annual contract</li>
            <li><strong>Cancel anytime</strong> &mdash; billed month to month</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
