import HeroV2 from '../components/home/HeroV2';
import BoardMarquee from '../components/home/BoardMarquee';
import StatBand from '../components/home/StatBand';
import DemoTimeline from '../components/home/DemoTimeline';
import ChooseSection from '../components/home/ChooseSection';
import ReviewsSection from '../components/ReviewsSection';
import SubjectsSection from '../components/SubjectsSection';
import ProgramsSection from '../components/ProgramsSection';
import HowItWorksSection from '../components/HowItWorksSection';
import FeesTeaserSection from '../components/FeesTeaserSection';
import FaqSection from '../components/FaqSection';
import ContactSection from '../components/ContactSection';
import StickyDemoBar from '../components/StickyDemoBar';
import { useDocumentHead } from '../lib/useDocumentHead';
import { STATIC_ROUTE_HEADS } from '../data/staticRouteHeads';

// Order is deliberate (see the homepage-conversion-layout memory): book, then
// proof, then detail. The 2026-09-23 redesign keeps that order and changes the
// visual language — glass hero, marquee, stat band, timeline steps.
export default function HomePage() {
  useDocumentHead(STATIC_ROUTE_HEADS['/']);
  return (
    <main id="top" className="v2">
      <HeroV2 />
      <BoardMarquee />
      <StatBand />
      <DemoTimeline />
      <ReviewsSection />
      <SubjectsSection />
      <ChooseSection />
      <HowItWorksSection />
      <ProgramsSection />
      <FeesTeaserSection />
      <FaqSection />
      <ContactSection />
      <StickyDemoBar />
    </main>
  );
}
