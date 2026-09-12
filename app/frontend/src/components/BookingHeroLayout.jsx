// Shared split-screen shell for the /register and /teach flows: a gradient
// story panel (headline, trust points, optional quote) beside the form.
export default function BookingHeroLayout({ eyebrow, headline, sub, trustItems, quote, children }) {
  return (
    <main className="booking-page">
      <div className="booking-shell">
        <section className="booking-visual">
          <div className="booking-visual-inner">
            <span className="eyebrow booking-eyebrow">{eyebrow}</span>
            <h1 className="booking-headline">{headline}</h1>
            <p className="booking-sub">{sub}</p>

            {trustItems && (
              <ul className="booking-trust">
                {trustItems.map((item) => (
                  <li key={item.text}><span className="booking-trust-icon">{item.icon}</span>{item.text}</li>
                ))}
              </ul>
            )}

            {quote && (
              <blockquote className="booking-quote">
                <p>&ldquo;{quote.text}&rdquo;</p>
                <cite>{quote.cite}</cite>
              </blockquote>
            )}
          </div>
        </section>

        <section className="booking-panel">
          <div className="booking-panel-inner">{children}</div>
        </section>
      </div>
    </main>
  );
}
