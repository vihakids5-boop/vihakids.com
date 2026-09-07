export default function ContactSection() {
  return (
    <section id="contact">
      <div className="wrap">
        <div className="cta-band">
          <h2>Let's find the right subject support for your child</h2>
          <p>Message us with your child's grade, school, and the subject you'd like help with — English, Hindi, Math, Science or Kannada — and we'll suggest the right starting point.</p>
          <div className="hero-ctas">
            <a
              className="btn btn-primary"
              href="https://wa.me/919972577828?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20English%2C%20Hindi%2C%20Math%2C%20Science%20and%20Kannada%20tuitions"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message on WhatsApp (opens in a new tab)"
            >
              Message on WhatsApp
            </a>
            <a className="btn btn-ghost" href="tel:+919972577828">Call 99725 77828</a>
          </div>
          <p className="trust-line"><strong>⭐ 5.0</strong> rated on Google · Online classes for students across India · No payment, no commitment for the free demo</p>
          <p className="phone-line">📞 <a href="tel:+919972577828">+91 99725 77828</a></p>
          <address className="phone-line" style={{ fontStyle: 'normal', fontSize: '0.95rem', fontWeight: 500, marginTop: 8 }}>
            Headquartered in Bengaluru: 349, Begur - Koppa Rd, near Eagle Ridge, Chikkakammana Halli, Bengaluru, Karnataka 560068
          </address>
        </div>
      </div>
    </section>
  );
}
