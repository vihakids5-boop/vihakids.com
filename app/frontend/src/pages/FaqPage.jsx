import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentHead } from '../lib/useDocumentHead';
import { STATIC_ROUTE_HEADS } from '../data/staticRouteHeads';
import { FAQ_GROUPS, ALL_FAQS, buildFaqJsonLd } from '../data/faqs';

const WHATSAPP_URL =
  'https://wa.me/919972577828?text=Hi%2C%20I%20have%20a%20question%20about%20Vihakids%20online%20tuitions';

const JSONLD_ID = 'faq-page-jsonld';

// Adds the FAQPage structured data for client-side visits. The prerendered
// /faq HTML already carries the same payload baked in (scripts/prerender.mjs),
// so this only matters when a visitor navigates here from another route.
function useFaqJsonLd() {
  useEffect(() => {
    if (document.getElementById(JSONLD_ID)) return undefined;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = JSONLD_ID;
    script.text = JSON.stringify(buildFaqJsonLd());
    document.head.appendChild(script);
    return () => script.remove();
  }, []);
}

export default function FaqPage() {
  useDocumentHead(STATIC_ROUTE_HEADS['/faq']);
  useFaqJsonLd();

  return (
    <main id="top">
      <div className="wrap">
        <div className="page-head">
          <span className="eyebrow">Parent FAQ · {ALL_FAQS.length} questions</span>
          <h1>Everything parents ask before choosing online tuition</h1>
          <p className="lead">
            We read hundreds of parent reviews of online tuition platforms for Classes 1 to 10 — the praise and the complaints — and answered the questions that come up again and again. Straight answers, nothing hidden.
          </p>
        </div>

        <nav className="faq-toc" aria-label="FAQ sections">
          {FAQ_GROUPS.map((g) => (
            <a key={g.id} href={`#${g.id}`} className="faq-toc-link">{g.title}</a>
          ))}
        </nav>

        <div className="page-body faq-page-body">
          {FAQ_GROUPS.map((g) => (
            <section key={g.id} id={g.id} className="faq-group">
              <div className="faq-group-head">
                <h2>{g.title}</h2>
                <p>{g.intro}</p>
              </div>
              <div className="faq-list">
                {g.faqs.map((f) => (
                  <details className="faq-item" key={f.q}>
                    <summary>{f.q}</summary>
                    <div className="faq-answer">
                      <p>{f.a}</p>
                      {f.link && <Link to={f.link.to}>{f.link.label} &rarr;</Link>}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}

          <aside className="faq-still-asking">
            <h2>Still have a question?</h2>
            <p>Message us on WhatsApp and a real person from Vihakids replies the same day — no bot, no sales script.</p>
            <div className="faq-still-asking-ctas">
              <a className="btn btn-primary" href={WHATSAPP_URL} target="_blank" rel="noopener">Ask on WhatsApp</a>
              <Link className="btn btn-ghost" to="/register">Book a free demo</Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
