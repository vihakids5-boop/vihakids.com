// Scrolling strip of the boards and subjects we cover. Duplicated once so the
// CSS animation can loop seamlessly; the copy is hidden from screen readers.
const ITEMS = ['CBSE', 'ICSE', 'Karnataka State Board', 'Cambridge', 'IB', 'GCSE', 'English', 'Hindi', 'Mathematics', 'Science', 'Kannada'];

export default function BoardMarquee() {
  return (
    <div className="v2-marquee">
      <div className="v2-marquee-track">
        {[0, 1].map((copy) => (
          <ul key={copy} className="v2-marquee-list" aria-hidden={copy === 1 ? 'true' : undefined}>
            {ITEMS.map((item) => (
              <li key={item}>
                {item}
                <span className="v2-marquee-dot" aria-hidden="true">•</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
