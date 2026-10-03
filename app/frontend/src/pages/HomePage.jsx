import HeroV3 from '../components/home/HeroV3';
import BoardMarquee from '../components/home/BoardMarquee';
import StatBand from '../components/home/StatBand';
import InsideDemo from '../components/home/InsideDemo';
import ChooseSection from '../components/home/ChooseSection';
import ReviewsSection from '../components/ReviewsSection';
import SubjectsSection from '../components/SubjectsSection';
import ProgramsSection from '../components/ProgramsSection';
import FeesTeaserSection from '../components/FeesTeaserSection';
import FaqSection from '../components/FaqSection';
import ContactSection from '../components/ContactSection';
import StickyDemoBar from '../components/StickyDemoBar';
import { useDocumentHead } from '../lib/useDocumentHead';
import { STATIC_ROUTE_HEADS } from '../data/staticRouteHeads';

// Order is deliberate (see the homepage-conversion-layout memory): book, then
// proof, then detail. The 2026-10 version makes the booking itself the hero —
// a five-tap demo planner with a live pass (HeroV3) — and replaces the two
// "how it works" sections with one that says what the demo actually contains
// and the facts parents ask for first (InsideDemo).
export default function HomePage() {
  useDocumentHead(STATIC_ROUTE_HEADS['/']);
  return (
    <main id="top" className="v2">
      <HeroV3 />
      <BoardMarquee />
      <StatBand />
      <InsideDemo />
      <ReviewsSection />
      <SubjectsSection />
      <ChooseSection />
      <ProgramsSection />
      <FeesTeaserSection />
      <FaqSection />
      <ContactSection />
      <StickyDemoBar />
    </main>
  );
}
