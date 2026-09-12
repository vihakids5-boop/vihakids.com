import RegisterForm from '../components/RegisterForm';

export default function RegisterPage() {
  return (
    <main className="booking-page">
      <div className="booking-shell">
        <section className="booking-visual">
          <div className="booking-visual-inner">
            <span className="eyebrow booking-eyebrow">Free demo class</span>
            <h1 className="booking-headline">
              Book your child&rsquo;s <em>free</em> demo class
            </h1>
            <p className="booking-sub">
              Takes 30 seconds. No payment, no commitment — we&rsquo;ll message you on WhatsApp to fix a time that works for you.
            </p>

            <ul className="booking-trust">
              <li><span className="booking-trust-icon">★</span>5.0 rated on Google, from real parents</li>
              <li><span className="booking-trust-icon">🌍</span>Online classes for students across India</li>
              <li><span className="booking-trust-icon">👩‍🏫</span>1-on-1 attention, not a crowded batch</li>
            </ul>

            <blockquote className="booking-quote">
              <p>&ldquo;Padma ma&rsquo;am from Vihakids is a wonderful teacher — my 7 year old daughter used to cry for Kannada homework, now she reads and writes on her own.&rdquo;</p>
              <cite>— Sridevi Ramesh, Google review</cite>
            </blockquote>
          </div>
        </section>

        <section className="booking-panel">
          <div className="booking-panel-inner">
            <RegisterForm variant="page" />
          </div>
        </section>
      </div>
    </main>
  );
}
