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
        <p className="updated">Last updated: 11 August 2026</p>

        <p>This Cookies Policy explains how vihakids.com ("Vihakids", "we", "us", "our") uses cookies and similar technologies, and how you can control them.</p>

        <h2>1. What Are Cookies</h2>
        <p>Cookies are small text files placed on your device by a website you visit. They are commonly used to remember your preferences, keep you signed in, or measure how a site is used.</p>

        <h2>2. Cookies We Use</h2>
        <p>Vihakids.com does not set any first-party cookies of its own. We use Google Analytics, which sets cookies to help us understand how visitors use the site — for example, which pages are viewed and how long visitors stay. We don't use advertising or ad-retargeting cookies.</p>

        <h2>3. Third-Party Requests</h2>
        <p>Our website uses Google Analytics to measure site usage, and loads fonts from Google Fonts so that the page displays correctly. Both involve your browser making a request to Google's servers. This is governed by Google's own privacy policy and is not something Vihakids controls beyond the settings described below.</p>
        <table>
          <tbody>
            <tr><th>Service</th><th>Purpose</th><th>Data involved</th></tr>
            <tr><td>Google Analytics</td><td>Understanding site usage and traffic</td><td>Cookies, approximate location, device/browser type, pages visited</td></tr>
            <tr><td>Google Fonts</td><td>Loading website typefaces</td><td>IP address (handled by Google, not stored by us)</td></tr>
          </tbody>
        </table>

        <h2>4. Links to Other Sites</h2>
        <p>Our website links out to third-party platforms such as WhatsApp, Facebook, Instagram, YouTube and X. If you follow those links, their own cookies and privacy policies apply, not this one.</p>

        <h2>5. Managing Cookies</h2>
        <p>You can opt out of Google Analytics tracking using the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>, or block cookies generally through your browser settings. If you'd like to control cookies set by other third-party services (like the ones listed above), you can manage these through your browser settings or the respective platform's own privacy controls.</p>

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
