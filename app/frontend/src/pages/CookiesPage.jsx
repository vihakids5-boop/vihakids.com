import MinimalPageLayout from '../components/MinimalPageLayout';
import { useDocumentHead } from '../lib/useDocumentHead';

export default function CookiesPage() {
  useDocumentHead({
    title: 'Cookies Policy | Vihakids',
    description: 'Cookies Policy for Vihakids online English, Hindi, Math, Science and Kannada tuitions, serving students across India.',
  });

  return (
    <MinimalPageLayout backTo="/" backLabel="Back to home">
      <div className="content prose">
        <h1>Cookies Policy</h1>
        <p className="updated">Last updated: 21 September 2026</p>

        <p>This Cookies Policy explains how vihakids.com ("Vihakids", "we", "us", "our") uses cookies and similar technologies, and how you can control them.</p>

        <h2>1. What Are Cookies</h2>
        <p>Cookies are small text files placed on your device by a website you visit. They are commonly used to remember your preferences, keep you signed in, or measure how a site is used.</p>

        <h2>2. Cookies We Use</h2>
        <p>Vihakids.com has no cookies of its own. The cookies on our site come from two third-party tools we use, Google Analytics and the Meta Pixel. Their scripts set these cookies on the vihakids.com domain.</p>
        <p><strong>Google Analytics</strong> sets cookies to help us understand how visitors use the site. For example, it shows which pages are viewed and how long visitors stay.</p>
        <p><strong>Meta Pixel</strong> is a small piece of code from Meta Platforms, the company behind Facebook and Instagram. We use it to measure and improve our Facebook and Instagram ads. It tells us whether people who see or click our ads go on to visit the site or register for a free demo, and it helps Meta show our ads to people who are likely to find them useful. That can include people who have already visited our site. It sets a cookie called <code>_fbp</code>, which lasts about 90 days. If you arrive by clicking a Facebook or Instagram ad, it also sets <code>_fbc</code>. These are advertising cookies.</p>

        <h2>3. Third-Party Requests</h2>
        <p>Our website uses Google Analytics to measure site usage. It also loads fonts from Google Fonts so that the page displays correctly. Both involve your browser making a request to Google's servers, and Google's own privacy policy applies to these requests.</p>
        <p>The Meta Pixel makes your browser send a request to Meta's servers each time you open a page. Each request includes the page address, the page you came from, your IP address, your browser and device details, and the <code>_fbp</code>/<code>_fbc</code> cookie IDs. It also includes basic interactions, such as buttons clicked. If you submit our demo registration form, tutor application or chat registration, the Pixel tells Meta that a registration happened and which form was used. We do not send Meta your name, phone number, email address or any details about your child. If you use Facebook or Instagram, Meta may link this data to your account. Meta handles the data under its own <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</p>
        <p>Vihakids can only control these services through the settings described below.</p>
        <div className="table-scroll">
        <table>
          <tbody>
            <tr><th>Service</th><th>Purpose</th><th>Data involved</th></tr>
            <tr><td>Google Analytics</td><td>Understanding site usage and traffic</td><td>Cookies, approximate location, device/browser type, pages visited</td></tr>
            <tr><td>Meta Pixel (Meta Platforms)</td><td>Measuring and improving our Facebook and Instagram ads</td><td>Cookies (<code>_fbp</code>, <code>_fbc</code>), IP address, device/browser type, pages visited, whether a registration form was submitted</td></tr>
            <tr><td>Google Fonts</td><td>Loading website typefaces</td><td>IP address (handled by Google, not stored by us)</td></tr>
          </tbody>
        </table>
        </div>

        <h2>4. Links to Other Sites</h2>
        <p>Our website links out to third-party platforms such as WhatsApp, Facebook, Instagram, YouTube and X. If you follow those links, their own cookies and privacy policies apply, not this one.</p>

        <h2>5. Managing Cookies</h2>
        <p>You can opt out of Google Analytics tracking using the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>, or block cookies generally through your browser settings.</p>
        <p>To limit the Meta Pixel, you can block or clear cookies for vihakids.com in your browser settings, or use a browser or extension that blocks trackers. If you use Facebook or Instagram, you can also stop Meta from using our site activity to choose the ads you see. Go to <a href="https://www.facebook.com/adpreferences/ad_settings" target="_blank" rel="noopener noreferrer">Meta's ad preferences</a> and turn off "Activity information from ad partners" (in the apps: Settings → Accounts Center → Ad preferences).</p>
        <p>If you'd like to control cookies set by other third-party services (like the ones listed above), you can manage these through your browser settings or the respective platform's own privacy controls.</p>

        <h2>6. Changes to This Policy</h2>
        <p>If we add other analytics or cookie-based tools to this website in the future, we will update this page to reflect that. The "Last updated" date at the top will reflect the most recent revision.</p>

        <h2>7. Contact Us</h2>
        <p>If you have questions about this Cookies Policy, please reach out:</p>
        <ul>
          <li>Phone / WhatsApp: <a href="tel:+919972577828">+91 99725 77828</a></li>
          <li>Address: 349, Begur - Koppa Rd, near Eagle Ridge, Chikkakammana Halli, Bengaluru, Karnataka 560068</li>
        </ul>
      </div>
    </MinimalPageLayout>
  );
}
