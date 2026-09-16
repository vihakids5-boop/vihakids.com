export default function ContactSection() {
  return (
    <section id="contact">
      <div className="wrap">
        <div className="cta-band">
          <h2>One free class can change how your child feels about a subject</h2>
          <p>Book a free 30-minute demo in English, Hindi, Math, Science or Kannada. We match a patient tutor to your child's class, board and textbook. No payment, no commitment — you decide only after you have seen your child in the class.</p>
          <div className="hero-ctas">
            <a className="btn btn-primary" href="#book">Book a free demo</a>
            <a
              className="btn btn-ghost"
              href="https://wa.me/919972577828?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20English%2C%20Hindi%2C%20Math%2C%20Science%20and%20Kannada%20tuitions"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message on WhatsApp (opens in a new tab)"
            >
              Ask on WhatsApp
            </a>
          </div>
          <p className="trust-line"><strong>⭐ 5.0</strong> rated on Google · Online classes for students across India · No payment, no commitment for the free demo</p>
          <address className="phone-line" style={{ fontStyle: 'normal', fontSize: '0.95rem', fontWeight: 500, marginTop: 8 }}>
            Headquartered in Bengaluru: 349, Begur - Koppa Rd, near Eagle Ridge, Chikkakammana Halli, Bengaluru, Karnataka 560068
          </address>
        </div>
      </div>
    </section>
  );
}
