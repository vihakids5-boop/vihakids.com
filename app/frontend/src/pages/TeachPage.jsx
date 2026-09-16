import BookingHeroLayout from '../components/BookingHeroLayout';
import TeachFormWizard from '../components/TeachFormWizard';
import { useDocumentHead } from '../lib/useDocumentHead';
import { STATIC_ROUTE_HEADS } from '../data/staticRouteHeads';

const TRUST_ITEMS = [
  { icon: '🏠', text: 'Flexible, work-from-home hours' },
  { icon: '👩‍🏫', text: 'Live 1-on-1 & small-batch classes' },
  { icon: '📚', text: 'Kannada · Hindi · Math · Science' },
];

export default function TeachPage() {
  useDocumentHead(STATIC_ROUTE_HEADS['/teach']);
  return (
    <BookingHeroLayout
      eyebrow="Are you a tutor?"
      headline="Teach with Vihakids"
      sub="We're always looking for patient, skilled English, Hindi, Math, Science and Kannada tutors for online classes — teach students from anywhere in India."
      trustItems={TRUST_ITEMS}
    >
      <TeachFormWizard />
    </BookingHeroLayout>
  );
}
