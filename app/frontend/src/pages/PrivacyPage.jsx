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
        <p className="updated">Last updated: 21 September 2026</p>

        <p>This Privacy Policy explains how Vihakids ("Vihakids", "we", "us", "our") collects, uses and protects information when you interact with our website or enroll in our online English, Hindi, Math, Science or Kannada tuition classes.</p>

        <h2>1. Information We Collect</h2>
        <p>Our website has no user accounts. We collect information when you fill in one of our website forms, use our chat assistant, or contact us over WhatsApp or phone.</p>
        <p><strong>Free demo registration.</strong> This covers the booking form on our pages, the registration page, and bookings made through the chat assistant. We collect:</p>
        <ul>
          <li>Parent/guardian name</li>
          <li>WhatsApp number</li>
          <li>Child's grade/standard (1 to 10)</li>
          <li>The subjects your child needs help with</li>
        </ul>
        <p><strong>Teacher applications</strong> (the "Teach with us" form). We collect:</p>
        <ul>
          <li>Full name and WhatsApp number</li>
          <li>The subjects and grades you can teach, and your teaching experience</li>
          <li>If you choose to add them: your email address, qualification and a message</li>
        </ul>
        <p>With each form, we also record which form or page it was sent from, and the date and time.</p>
        <p><strong>Chat assistant.</strong> "Viha", the chat assistant on our website, is an automated AI assistant, not a person. To write each reply, your chat messages are sent to Anthropic, the company that provides the AI model. Anthropic handles them under its own <a href="https://www.anthropic.com/legal/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>. We don't save chat conversations ourselves. If you ask the assistant to book a demo, it saves only the four registration details listed above, just as the form does. Please don't share sensitive personal information in the chat.</p>
        <p><strong>WhatsApp and phone.</strong> When you talk to us directly, you may also share details such as your child's name and school board (<strong>CBSE</strong>, <strong>ICSE</strong> or State Board), and anything else that helps us plan classes.</p>

        <h2>2. How We Use Information</h2>
        <p>Information you share is used only to:</p>
        <ul>
          <li>Respond to enquiries and schedule classes</li>
          <li>Plan lessons appropriate to the student's grade and board</li>
          <li>Communicate updates about classes, schedules, and progress</li>
          <li>Review teacher applications and contact applicants</li>
        </ul>
        <p>We do not sell or rent your information to third parties, and we do not use it for unrelated marketing.</p>
        <p>Form submissions are stored in Google Firebase (Cloud Firestore), a database service run by Google. Only the Vihakids team can see them, through a sign-in-protected admin page. The companies that help us run the website handle data only on our behalf: Google for data storage, Anthropic for the chat assistant, and Amazon Web Services for website hosting. Some of them may process data outside India.</p>

        <h2>3. Communication Channels</h2>
        <p>We communicate primarily via WhatsApp and phone calls. These platforms are operated by third parties (such as Meta, for WhatsApp) and are governed by their own privacy policies. Messages sent through them are subject to those platforms' terms.</p>

        <h2>4. Cookies and Website Data</h2>
        <p>Our website uses Google Analytics to understand how visitors use the site (such as which pages are viewed and how long visitors stay), so we can improve it. Google Analytics uses cookies and collects information like your approximate location, device and browser type, and pages visited. We see this data only in aggregated reports that do not identify you personally.</p>
        <p>We also use the Meta Pixel, a tool from Meta Platforms (the company behind Facebook and Instagram), to measure and improve our Facebook and Instagram ads. It sets cookies such as <code>_fbp</code> and sends Meta the following:</p>
        <ul>
          <li>The pages you visit on our site</li>
          <li>Your IP address and your browser and device details</li>
          <li>Whether you submitted one of our registration forms</li>
        </ul>
        <p>We do not send Meta your name, phone number, email address or your child's details. If you use Facebook or Instagram, Meta may link this activity to your account and use it to decide which ads to show you, including ours. You can turn this off in <a href="https://www.facebook.com/adpreferences/ad_settings" target="_blank" rel="noopener noreferrer">Meta's ad preferences</a> or by blocking cookies in your browser.</p>
        <p>Google Analytics and the Meta Pixel only load if you choose "Accept" on our cookie banner. If you choose "Decline", neither runs. You can change your choice at any time using the "Cookie settings" link at the bottom of every page. See our <Link to="/cookies.html">Cookies Policy</Link> for more detail.</p>
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
