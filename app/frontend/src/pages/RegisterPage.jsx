import BookingLayoutV2 from '../components/BookingLayoutV2';
import RegisterFormWizard from '../components/RegisterFormWizard';
import { useDocumentHead } from '../lib/useDocumentHead';
import { STATIC_ROUTE_HEADS } from '../data/staticRouteHeads';

const QUOTE = {
  text: 'Padma ma’am from Vihakids is a wonderful teacher — my 7 year old daughter used to cry for Kannada homework, now she reads and writes on her own.',
  cite: '— Sridevi Ramesh, Google review',
};

export default function RegisterPage() {
  useDocumentHead(STATIC_ROUTE_HEADS['/register']);
  return (
    <BookingLayoutV2
      eyebrow="Free demo class · No payment"
      headline={<>Book your child&rsquo;s <span className="v2-gradient-text v2-inline">free demo class</span></>}
      sub="It takes 30 seconds. Tell us your child’s class and the subject they find hardest, and we will do the rest."
      quote={QUOTE}
    >
      <RegisterFormWizard />
    </BookingLayoutV2>
  );
}
