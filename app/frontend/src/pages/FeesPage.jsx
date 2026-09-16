import { useDocumentHead } from '../lib/useDocumentHead';
import { STATIC_ROUTE_HEADS } from '../data/staticRouteHeads';
import RegisterFormWizard from '../components/RegisterFormWizard';

const BANDS = [
  { name: 'Foundation', grades: 'Classes 1–4', steady: 1499, steadyPerClass: 187, focus: 2199, focusPerClass: 183 },
  { name: 'Building Blocks', grades: 'Classes 5–7', steady: 1799, steadyPerClass: 225, focus: 2599, focusPerClass: 216 },
  { name: 'Board Ready', grades: 'Classes 8–10', steady: 2199, steadyPerClass: 275, focus: 2999, focusPerClass: 250 },
];

const EXAMPLES = [
  { desc: <><strong>1 child</strong>, Class 6, English + Math, Steady Pace</>, amt: '₹3,598' },
  { desc: <><strong>1 child</strong>, Class 9, Math only, Extra Support before boards</>, amt: '₹2,999' },
  { desc: <><strong>2 children</strong>, both in Foundation grades, one subject each, Steady Pace</>, amt: '₹2,998' },
  { desc: <><strong>1 child</strong>, Class 4, Kannada + Hindi + English, Steady Pace</>, amt: '₹4,497' },
];

export default function FeesPage() {
  useDocumentHead(STATIC_ROUTE_HEADS['/fees']);

  return (
    <main id="top">
      <div className="wrap">
        <div className="page-head">
          <span className="eyebrow">Fees</span>
          <h1>A monthly fee built for every Indian family</h1>
          <p className="lead">One clear price per subject, per month — billed monthly with no lock-in. Every child gets steady, 1-on-1 attention; the pace adjusts to what they actually need, not a one-size-fits-all package.</p>
        </div>

        <div className="page-body prose">
          <h2>The two paces</h2>
          <p>Every plan starts on the Steady Pace track. Extra Support isn&rsquo;t something you pick off a menu — after the free demo class, the tutor will only recommend it if your child&rsquo;s specific gaps call for more frequent sessions.</p>

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

          <h2>Price per subject, per month</h2>
          <p>Same structure for English, Hindi, Math, Science and Kannada. Price rises slightly by grade band, reflecting more advanced content and exam stakes — not by subject.</p>

          <table className="board-table fee-table">
            <thead>
              <tr><th>Grade band</th><th>Steady Pace</th><th>Extra Support</th></tr>
            </thead>
            <tbody>
              {BANDS.map((b) => (
                <tr key={b.name}>
                  <td>{b.name}<span className="fee-band-grades">{b.grades}</span></td>
                  <td><span className="fee-price">₹{b.steady.toLocaleString('en-IN')}</span><span className="fee-per-class">≈ ₹{b.steadyPerClass} / class</span></td>
                  <td><span className="fee-price fee-price-focus">₹{b.focus.toLocaleString('en-IN')}</span><span className="fee-per-class">≈ ₹{b.focusPerClass} / class</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="fee-table-note">Per-class cost is lower on Extra Support in every band — committing to more consistent support is rewarded, not penalised.</p>

          <h2>What this looks like for a real family</h2>
          <div className="fee-example-list">
            {EXAMPLES.map((ex, i) => (
              <div className="fee-example" key={i}>
                <div className="fee-example-desc">{ex.desc}</div>
                <div className="fee-example-amt">{ex.amt} <span>/ mo</span></div>
              </div>
            ))}
          </div>

          <h2>Ground rules</h2>
          <ul className="checklist">
            <li><span className="mark">✓</span><span>Billed monthly. No registration fee, no annual contract, cancel anytime.</span></li>
            <li><span className="mark">✓</span><span>The free demo class always comes first — pricing is only discussed once the tutor knows your child.</span></li>
            <li><span className="mark">✓</span><span>Moving from Steady Pace to Extra Support (or back) takes effect from the next billing month, no penalty.</span></li>
            <li><span className="mark">✓</span><span>A missed class can be rescheduled within the same week, subject to tutor availability.</span></li>
          </ul>

          <p style={{ background: 'var(--paper-raised)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '16px 20px', marginBottom: '28px' }}>
            <strong>Why this holds up as &ldquo;affordable&rdquo;:</strong> a single subject on Steady Pace costs less per month than most families already spend on one week of local group tuition — while staying 1-on-1, online, and adjustable the moment your child needs more help.
          </p>
        </div>
      </div>

      <div className="page-form-wrap">
        <RegisterFormWizard />
      </div>
    </main>
  );
}
