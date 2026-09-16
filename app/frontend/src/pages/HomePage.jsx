import RegisterFormWizard from '../components/RegisterFormWizard';
import DemoStepsSection from '../components/DemoStepsSection';
import ReviewsSection from '../components/ReviewsSection';
import SubjectsSection from '../components/SubjectsSection';
import ProgramsSection from '../components/ProgramsSection';
import HowItWorksSection from '../components/HowItWorksSection';
import RealitySection from '../components/RealitySection';
import PhilosophySection from '../components/PhilosophySection';
import WhyBandSection from '../components/WhyBandSection';
import FeesTeaserSection from '../components/FeesTeaserSection';
import FaqSection from '../components/FaqSection';
import ContactSection from '../components/ContactSection';
import StickyDemoBar from '../components/StickyDemoBar';
import { useDocumentHead } from '../lib/useDocumentHead';
import { STATIC_ROUTE_HEADS } from '../data/staticRouteHeads';

const TRUST_ITEMS = [
  { icon: '★', text: '5.0 on Google, from 21 parent reviews' },
  { icon: '🎁', text: 'Free 30-minute demo — no payment, no card, no commitment' },
  { icon: '👩‍🏫', text: '1-on-1 with a tutor matched to your child’s board, class and textbook' },
];

const QUOTE = {
  text: 'My 7 year old daughter used to cry for Kannada homework, now she reads and writes on her own.',
  cite: '— Sridevi Ramesh, Google review',
};

export default function HomePage() {
  useDocumentHead(STATIC_ROUTE_HEADS['/']);
  return (
    <main id="top">
      <section className="hero">
        <div className="hero-visual">
          <div className="hero-visual-inner">
            <span className="eyebrow">Online 1-on-1 tuitions · Classes 1 to 10 · CBSE, ICSE & State Board</span>
            <h1><span className="kn">Confidence first.</span>Grades will follow.</h1>
            <p className="lead"><span className="lead-highlight">Does your child cry over homework, hide their marks, or say “I’m just bad at Math”?</span> A live 1-on-1 tutor who follows their own school textbook — and actually waits for them — changes that. English, Hindi, Math, Science and Kannada, for students anywhere in India. Try one class free and see the difference in 30 minutes.</p>

            <ul className="booking-trust">
              {TRUST_ITEMS.map((item) => (
                <li key={item.text}><span className="booking-trust-icon">{item.icon}</span>{item.text}</li>
              ))}
            </ul>

            <blockquote className="booking-quote">
              <p>&ldquo;{QUOTE.text}&rdquo;</p>
              <cite>{QUOTE.cite}</cite>
            </blockquote>
          </div>
        </div>

        <div className="hero-panel" id="book">
          <div className="hero-panel-inner">
            <RegisterFormWizard />
            <p className="hero-panel-note">
              <strong>What happens next:</strong> we WhatsApp you today to fix a time. Your child takes a free 30-minute class with a real tutor. If they enjoyed it, we continue. If not, there is nothing to pay and nothing to cancel.
            </p>
          </div>
        </div>
      </section>

      <DemoStepsSection />
      <ReviewsSection />
      <SubjectsSection />
      <ProgramsSection />
      <HowItWorksSection />
      <RealitySection />
      <PhilosophySection />
      <WhyBandSection />
      <FeesTeaserSection />
      <FaqSection />
      <ContactSection />
      <StickyDemoBar />
    </main>
  );
}
