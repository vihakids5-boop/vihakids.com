import MinimalPageLayout from '../components/MinimalPageLayout';
import { useDocumentHead } from '../lib/useDocumentHead';

export default function TermsPage() {
  useDocumentHead({
    title: 'Terms and Conditions | Vihakids',
    description: 'Terms and Conditions for Vihakids online Kannada, Hindi, Math and Science tuitions.',
  });

  return (
    <MinimalPageLayout backTo="/" backLabel="Back to home">
      <div className="content prose">
        <h1>Terms and Conditions</h1>
        <p className="updated">Last updated: 10 August 2026</p>

        <p>These Terms and Conditions ("Terms") govern the use of online tuition services in Kannada, Hindi, Mathematics and Science offered by Vihakids ("Vihakids", "we", "us", "our") to students and their parents or guardians ("you", "your"). By enrolling in or using our classes, you agree to these Terms.</p>

        <h2>1. About Vihakids</h2>
        <p>Vihakids provides live, online tuitions in Kannada, Hindi, Mathematics and Science for students from 1st to 10th Standard, covering CBSE, ICSE and Karnataka State Board syllabus. Classes are conducted one-on-one or in small batches over video call.</p>

        <h2>2. Enrollment</h2>
        <p>Enrollment is confirmed once a parent or guardian shares the student's grade, board and school details with us and a class schedule is agreed upon, typically over WhatsApp or phone call.</p>

        <h2>3. Fees and Payment</h2>
        <ul>
          <li>Tuition fees and payment schedules are communicated directly to parents/guardians before classes begin.</li>
          <li>Fees are due as per the agreed schedule to continue uninterrupted classes.</li>
          <li>Any change in fees will be communicated in advance and will not apply retroactively to already-paid periods.</li>
        </ul>

        <h2>4. Cancellations and Rescheduling</h2>
        <p>We understand school schedules can be unpredictable. Please inform us as early as possible if a class needs to be rescheduled or cancelled, so we can offer an alternative slot where possible. Repeated late cancellations may affect scheduling flexibility.</p>

        <h2>5. Refunds</h2>
        <p>Refund requests are handled on a case-by-case basis. Please reach out to us directly over WhatsApp or phone to discuss any concerns about fees already paid.</p>

        <h2>6. Conduct and Attendance</h2>
        <p>We ask that students join classes on time, with a stable internet connection, and in a quiet environment suitable for learning. Parents/guardians are encouraged to check in periodically on progress.</p>

        <h2>7. Parent/Guardian Responsibility</h2>
        <p>For students under 18, a parent or guardian is responsible for enrollment decisions, fee payments, and ensuring the student has the necessary device and internet access to attend online classes.</p>

        <h2>8. Intellectual Property</h2>
        <p>Any teaching material, worksheets, or resources shared by Vihakids during classes are for the personal learning use of the enrolled student only and may not be redistributed or resold without our permission.</p>

        <h2>9. Limitation of Liability</h2>
        <p>Vihakids strives to provide consistent, high-quality tuition but does not guarantee specific academic outcomes or exam results, as these also depend on the student's own effort and school environment.</p>

        <h2>10. Privacy</h2>
        <p>Information shared with us, such as contact details and school information, is used only to provide and coordinate tuition services and is not sold or shared with third parties for marketing purposes.</p>

        <h2>11. Changes to These Terms</h2>
        <p>We may update these Terms from time to time to reflect changes in how we operate. The "Last updated" date at the top of this page will reflect the most recent revision.</p>

        <h2>12. Contact Us</h2>
        <p>If you have any questions about these Terms, please reach out:</p>
        <ul>
          <li>Phone / WhatsApp: <a href="tel:+919972577828">+91 99725 77828</a></li>
          <li>Address: 349, Begur - Koppa Rd, near Eagle Ridge, Chikkakammana Halli, Bengaluru, Karnataka 560068</li>
        </ul>
      </div>
    </MinimalPageLayout>
  );
}
