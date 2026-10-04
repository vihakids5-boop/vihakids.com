import { useDocumentHead } from '../lib/useDocumentHead';
import { STATIC_ROUTE_HEADS } from '../data/staticRouteHeads';
import RegisterFormWizard from '../components/RegisterFormWizard';

// No amounts on this page, by the owner's decision (2026-10-05): the site says
// how fees work — monthly, 8 or more classes, no other commitment — and the
// actual figure is shared with the parent after the free demo. Do not add
// prices, per-class costs or "from ₹…" lines back without being asked.
export default function FeesPage() {
  useDocumentHead(STATIC_ROUTE_HEADS['/fees']);

  return (
    <main id="top">
      <div className="wrap">
        <div className="page-head">
          <span className="eyebrow">Fees</span>
          <h1>A simple monthly fee, and no other commitment</h1>
          <p className="lead">You pay month by month for the subject your child is taking. There is no registration fee, no annual contract and nothing to sign — and you only decide after the free demo class.</p>
        </div>

        <div className="page-body prose">
          <h2>How the fee works</h2>
          <ul className="checklist">
            <li><span className="mark">✓</span><span><strong>One monthly fee per subject.</strong> The same structure for English, Hindi, Math, Science and Kannada.</span></li>
            <li><span className="mark">✓</span><span><strong>8 or more classes a month.</strong> Every plan includes at least 8 live, 1-on-1 classes.</span></li>
            <li><span className="mark">✓</span><span><strong>No other commitment.</strong> No registration fee, no admission fee, no annual package and no material charges.</span></li>
            <li><span className="mark">✓</span><span><strong>Paid monthly.</strong> By UPI or bank transfer. No loans, no EMI plans, no finance agreements.</span></li>
          </ul>

          <h2>How many classes a month</h2>
          <p>Every child starts with 8 classes a month. The tutor suggests more only after the free demo, and only if your child&rsquo;s gaps call for it.</p>

          <div className="pace-grid">
            <div className="pace-card pace-steady">
              <span className="pace-tag">Steady Pace</span>
              <h3>8 classes / month</h3>
              <p>About 2 classes a week. Right for a child who&rsquo;s keeping up and just needs consistent, personal practice.</p>
            </div>
            <div className="pace-card pace-focus">
              <span className="pace-tag">Extra Support</span>
              <h3>Up to 12 classes / month</h3>
              <p>About 3 classes a week. For a child who&rsquo;s behind, prepping for boards, or needs closer attention.</p>
            </div>
          </div>

          <h2>How you find out the fee</h2>
          <p>The free demo class always comes first. Afterwards we send you one WhatsApp message with what the tutor noticed and the monthly fee for your child&rsquo;s class and subject. If it is not for you, you simply say so — nobody will call to persuade you.</p>

          <h2>Ground rules</h2>
          <ul className="checklist">
            <li><span className="mark">✓</span><span>Billed monthly. Stop any month by telling us before the next one begins — there is no cancellation fee.</span></li>
            <li><span className="mark">✓</span><span>Moving between 8 and 12 classes, or adding or dropping a subject, takes effect from the next billing month, with no penalty.</span></li>
            <li><span className="mark">✓</span><span>A missed class can be rescheduled within the same week, subject to tutor availability.</span></li>
            <li><span className="mark">✓</span><span>You can pause for exams or a holiday. When you come back, the same tutor picks up where your child left off.</span></li>
          </ul>
        </div>
      </div>

      <div className="page-form-wrap">
        <RegisterFormWizard />
      </div>
    </main>
  );
}
