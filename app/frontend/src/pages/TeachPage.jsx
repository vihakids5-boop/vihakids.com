import BookingHeroLayout from '../components/BookingHeroLayout';
import TeachForm from '../components/TeachForm';

const TRUST_ITEMS = [
  { icon: '🏠', text: 'Flexible, work-from-home hours' },
  { icon: '👩‍🏫', text: 'Live 1-on-1 & small-batch classes' },
  { icon: '📚', text: 'Kannada · Hindi · Math · Science' },
];

export default function TeachPage() {
  return (
    <BookingHeroLayout
      eyebrow="Are you a tutor?"
      headline="Teach with Vihakids"
      sub="We're always looking for patient, skilled English, Hindi, Math, Science and Kannada tutors for online classes — teach students from anywhere in India."
      trustItems={TRUST_ITEMS}
    >
      <TeachForm />
    </BookingHeroLayout>
  );
}
