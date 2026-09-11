import RegisterForm from '../components/RegisterForm';
import PhilosophySection from '../components/PhilosophySection';
import RealitySection from '../components/RealitySection';
import SubjectsSection from '../components/SubjectsSection';
import ProgramsSection from '../components/ProgramsSection';
import HowItWorksSection from '../components/HowItWorksSection';
import WhyBandSection from '../components/WhyBandSection';
import ReviewsSection from '../components/ReviewsSection';
import ContactSection from '../components/ContactSection';

export default function HomePage() {
  return (
    <main id="top">
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow">Online · 1st to 10th Std · Bangalore, Anywhere in India</span>
            <h1><span className="kn">Confidence first.</span>Grades will follow.</h1>
            <p className="lead"><span className="lead-highlight">Because you want your child to enjoy learning, not fear it.</span> Live <strong>1-on-1</strong> online tuitions in English, Hindi, Mathematics, Science and Kannada for school students across India — with patient tutors who turn exam stress into everyday confidence.</p>
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

      <PhilosophySection />
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
