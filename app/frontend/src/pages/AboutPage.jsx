import { useDocumentHead } from '../lib/useDocumentHead';

const WHATSAPP_URL =
  'https://wa.me/919972577828?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20English%2C%20Hindi%2C%20Math%2C%20Science%20and%20Kannada%20tuitions';

export default function AboutPage() {
  useDocumentHead({
    title: 'About Us | Vihakids — Online English, Hindi, Math, Science & Kannada Tuitions',
    description: 'Vihakids offers live online tuitions in English, Hindi, Mathematics, Science and Kannada for 1st to 10th Std, CBSE, ICSE and State Board — for students anywhere in India. Learn about our mission and teaching approach.',
  });

  return (
    <main id="top">
      <div className="wrap">
        <div className="page-head">
          <span className="eyebrow">About Vihakids</span>
          <h1>Helping kids across India feel confident in English, Hindi, Math, Science and Kannada</h1>
          <p className="lead">Vihakids started with a simple observation: some school subjects need more one-on-one attention than a crowded classroom can give.</p>
        </div>

        <div className="page-body prose">
          <h2>Why We Exist</h2>
          <p>Many families across India speak a regional language at home, while their children are expected to read, write and score well in English or a second language at school — and Math concepts can move faster in class than a child is ready for. That gap is where Vihakids comes in — patient, one-on-one online support in subjects that can otherwise feel intimidating, wherever in India a family is based.</p>
          <p>We offer structured, grade-wise online classes in English, Hindi, Mathematics, Science and Kannada for students from 1st to 10th Standard, across <strong>CBSE</strong>, <strong>ICSE</strong> and State Board syllabus.</p>

          <h2>Our Mission</h2>
          <p><em>Inspire young minds</em> — our approach is to build genuine comfort and confidence in every subject we teach, not just exam scores. We want children to feel like English, Hindi, Math, Science and Kannada are things they can handle with ease, not subjects to be afraid of.</p>

          <h2>How We Teach</h2>
          <p>Every child starts at a different point, so our programs are grouped by grade band rather than one-size-fits-all:</p>
          <ul>
            <li><strong>Classes 1–4 (Foundation):</strong> English, Hindi and Kannada alphabets, simple words, confident reading aloud, basic arithmetic, and simple Science through everyday surroundings.</li>
            <li><strong>Classes 5–7 (Building blocks):</strong> grammar, comprehension, regular writing practice, fractions, geometry and problem-solving in Math, and Science concepts explained with everyday examples.</li>
            <li><strong>Classes 8–10 (Board ready):</strong> textbook-aligned lessons, previous-year papers, Physics, Chemistry and Biology fundamentals, and focused exam revision across all five subjects.</li>
          </ul>

          <h2>Why Parents Choose Us</h2>
          <div className="content-why-list">
            <div className="content-why-item">
              <span className="mark">✓</span>
              <p><strong>Experienced tutors</strong> — skilled English and Hindi teachers, native-speaking Kannada teachers, and skilled Math and Science educators.</p>
            </div>
            <div className="content-why-item">
              <span className="mark">✓</span>
              <p><strong>Personal attention</strong> — small batches, not a crowded classroom your child gets lost in.</p>
            </div>
            <div className="content-why-item">
              <span className="mark">✓</span>
              <p><strong>Confidence first</strong> — reading and speaking practice, not just memorising for the exam.</p>
            </div>
            <div className="content-why-item">
              <span className="mark">✓</span>
              <p><strong>Clear communication</strong> with parents on progress, difficulties, and what to practise at home.</p>
            </div>
          </div>

          <div className="cta-band">
            <h2>Let's find the right subject support for your child</h2>
            <p>Message us with your child's grade, school, and the subject you'd like help with, and we'll suggest the right starting point.</p>
            <a className="btn btn-primary" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Message on WhatsApp (opens in a new tab)">Message on WhatsApp</a>
          </div>
        </div>
      </div>
    </main>
  );
}
