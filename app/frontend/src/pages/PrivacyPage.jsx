import { Link } from 'react-router-dom';
import MinimalPageLayout from '../components/MinimalPageLayout';
import { useDocumentHead } from '../lib/useDocumentHead';

export default function PrivacyPage() {
  useDocumentHead({
    title: 'Privacy Policy | Vihakids',
    description: 'Privacy Policy for Vihakids online English, Hindi, Math, Science and Kannada tuitions, serving students across India.',
  });

  return (
    <MinimalPageLayout backTo="/" backLabel="Back to home">
      <div className="content prose">
        <h1>Privacy Policy</h1>
        <p className="updated">Last updated: 11 August 2026</p>

        <p>This Privacy Policy explains how Vihakids ("Vihakids", "we", "us", "our") collects, uses and protects information when you interact with our website or enroll in our online English, Hindi, Math, Science or Kannada tuition classes.</p>

        <h2>1. Information We Collect</h2>
        <p>Our website does not have sign-up forms or accounts. Information is collected directly when you contact us, typically over WhatsApp or phone, and may include:</p>
        <ul>
          <li>Parent/guardian name and contact number</li>
          <li>Student's name, grade/standard, and school board (<strong>CBSE</strong>, <strong>ICSE</strong>, or State Board)</li>
          <li>Any other details you choose to share to help us plan classes</li>
        </ul>

        <h2>2. How We Use Information</h2>
        <p>Information you share is used only to:</p>
        <ul>
          <li>Respond to enquiries and schedule classes</li>
          <li>Plan lessons appropriate to the student's grade and board</li>
          <li>Communicate updates about classes, schedules, and progress</li>
        </ul>
        <p>We do not sell or rent your information to third parties, and we do not use it for unrelated marketing.</p>

        <h2>3. Communication Channels</h2>
        <p>We communicate primarily via WhatsApp and phone calls. These platforms are operated by third parties (such as Meta, for WhatsApp) and are governed by their own privacy policies. Messages sent through them are subject to those platforms' terms.</p>

        <h2>4. Cookies and Website Data</h2>
        <p>Our website uses Google Analytics to understand how visitors use the site (such as which pages are viewed and how long visitors stay), so we can improve it. Google Analytics uses cookies and collects information like your approximate location, device and browser type, and pages visited. This data is aggregated and does not identify you personally. See our <Link to="/cookies.html">Cookies Policy</Link> for more detail.</p>
        <p>Our website also loads fonts from Google Fonts, which may involve your browser making a request to Google's servers; Google's handling of this is governed by Google's own privacy policy.</p>

        <h2>5. Children's Privacy</h2>
        <p>Our tuition services are designed for school-age children, and we work with parents/guardians directly for enrollment, scheduling, and payments. We do not knowingly collect information directly from children without a parent or guardian's involvement.</p>

        <h2>6. Data Retention</h2>
        <p>We retain contact and enrollment information for as long as needed to provide tuition services and to respond to any follow-up queries, and delete or anonymize it when it is no longer needed for these purposes.</p>

        <h2>7. Your Choices</h2>
        <p>You can ask us to update, correct, or delete the information we hold about you or your child at any time by contacting us directly using the details below.</p>

        <h2>8. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. The "Last updated" date at the top of this page will reflect the most recent revision.</p>

        <h2>9. Contact Us</h2>
        <p>If you have questions about this Privacy Policy or how your information is handled, please reach out:</p>
        <ul>
          <li>Phone / WhatsApp: <a href="tel:+919972577828">+91 99725 77828</a></li>
          <li>Address: 349, Begur - Koppa Rd, near Eagle Ridge, Chikkakammana Halli, Bengaluru, Karnataka 560068</li>
        </ul>
      </div>
    </MinimalPageLayout>
  );
}
