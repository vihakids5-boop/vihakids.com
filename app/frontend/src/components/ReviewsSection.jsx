const REVIEWS = [
  { color: 'oxide', initial: 'S', name: 'Sridevi Ramesh', quote: "Best Kannada tuition for kids in Bangalore. Padma ma'am from Vihakids is a wonderful teacher — my 7 year old daughter used to cry for Kannada homework, now she reads and writes on her own." },
  { color: 'peacock', initial: 'P', name: 'Parent', quote: 'She was pretty bad in Kannada and mam did an excellent work with her.' },
  { color: 'lotus', initial: 'P', name: 'Parent', quote: "Wonderful coaching, reasonable price. I'm happy — my child speaks Kannada so well now." },
  { color: 'banana', initial: 'P', name: 'Parent', quote: "It's the best tuition centre, with dedicated teachers and excellent coaching." },
  { color: 'sky', initial: 'A', name: 'Anjana Rajesh', quote: "Exceptional place for Kannada learning — I strongly recommend everyone who's interested." },
  { color: 'marigold', initial: 'S', name: 'Saravana', quote: 'Super coaching centre for Kannada.' },
];

export default function ReviewsSection() {
  return (
    <section id="reviews">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">What parents say</span>
          <h2>Real feedback from real Vihakids families</h2>
          <div className="rating-strip">
            <span className="stars" aria-hidden="true">★★★★★</span>
            <span className="rating-text">5.0</span>
            <span>on Google</span>
            <a
              href="https://www.google.com/maps/place/Vihakids/@12.8488091,77.6089813,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae6b50f8449457:0xcf4ac6428752843!8m2!3d12.8488091!4d77.6089813!16s%2Fg%2F11zwp42lc8"
              target="_blank"
              rel="noopener noreferrer"
            >
              See all reviews on Google →
            </a>
          </div>
        </div>
        <div className="review-grid">
          {REVIEWS.map((r) => (
            <div className="review-card" key={r.name + r.quote} style={{ '--card-accent': `var(--${r.color})` }}>
              <span className="stars" aria-hidden="true">★★★★★</span>
              <p>&ldquo;{r.quote}&rdquo;</p>
              <div className="reviewer">
                <span className="avatar">{r.initial}</span>
                <span className="who"><strong>{r.name}</strong><span>Google review</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
