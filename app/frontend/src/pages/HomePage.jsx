import RegisterForm from '../components/RegisterForm';
import RealitySection from '../components/RealitySection';
import SubjectsSection from '../components/SubjectsSection';
import ProgramsSection from '../components/ProgramsSection';
import HowItWorksSection from '../components/HowItWorksSection';
import WhyBandSection from '../components/WhyBandSection';
import ReviewsSection from '../components/ReviewsSection';
import ContactSection from '../components/ContactSection';

const WHATSAPP_URL =
  'https://wa.me/919972577828?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20English%2C%20Hindi%2C%20Math%2C%20Science%20and%20Kannada%20tuitions';

export default function HomePage() {
  return (
    <main id="top">
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow">Online · 1st to 10th Std · Anywhere in India</span>
            <h1><span className="kn">Learn with joy</span>No more exam stress</h1>
            <p className="lead">Live online tuitions in English, Hindi, Mathematics, Science and Kannada for school students across India — personal attention, patient tutors, and real progress.</p>
            <div className="hero-ctas">
              <a className="btn btn-primary" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Message on WhatsApp (opens in a new tab)">Message on WhatsApp</a>
              <a className="btn btn-ghost" href="tel:+919972577828">Call 99725 77828</a>
            </div>
            <p className="trust-line"><strong>⭐ 5.0</strong> rated on Google · Register takes 30 seconds — no payment required</p>
            <p className="hero-note">One-on-one and small-batch online classes · 1st to 10th Standard · Students across India</p>
            <div className="board-badges">
              <span className="board-badge b-cbse">CBSE</span>
              <span className="board-badge b-icse">ICSE</span>
              <span className="board-badge b-state">State Board</span>
            </div>
          </div>

          <div className="form-col">
            <RegisterForm variant="hero" />
          </div>
        </div>
      </section>

      <RealitySection />
      <SubjectsSection />
      <ProgramsSection />
      <HowItWorksSection />
      <WhyBandSection />
      <ReviewsSection />
      <ContactSection />
    </main>
  );
}
