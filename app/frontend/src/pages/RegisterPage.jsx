import BookingHeroLayout from '../components/BookingHeroLayout';
import RegisterForm from '../components/RegisterForm';

const TRUST_ITEMS = [
  { icon: '★', text: '5.0 rated on Google, from real parents' },
  { icon: '🌍', text: 'Online classes for students across India' },
  { icon: '👩‍🏫', text: '1-on-1 attention, not a crowded batch' },
];

const QUOTE = {
  text: "Padma ma’am from Vihakids is a wonderful teacher — my 7 year old daughter used to cry for Kannada homework, now she reads and writes on her own.",
  cite: '— Sridevi Ramesh, Google review',
};

export default function RegisterPage() {
  return (
    <BookingHeroLayout
      eyebrow="Free demo class"
      headline={<>Book your child&rsquo;s <em>free</em> demo class</>}
      sub="Takes 30 seconds. No payment, no commitment — we'll message you on WhatsApp to fix a time that works for you."
      trustItems={TRUST_ITEMS}
      quote={QUOTE}
    >
      <RegisterForm variant="page" />
    </BookingHeroLayout>
  );
}
