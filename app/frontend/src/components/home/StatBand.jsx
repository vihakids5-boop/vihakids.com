const STATS = [
  { value: '5.0', label: 'rating on Google', sub: 'from 21 parent reviews' },
  { value: '1-on-1', label: 'every class', sub: 'never a crowded batch' },
  { value: '1–10', label: 'classes taught', sub: 'CBSE, ICSE & State Board' },
  { value: '₹0', label: 'for the first class', sub: 'no card, no commitment' },
];

export default function StatBand() {
  return (
    <section className="v2-stats" aria-label="Vihakids at a glance">
      <div className="wrap v2-stats-grid">
        {STATS.map((s) => (
          <div className="v2-stat" key={s.label}>
            <span className="v2-stat-value">{s.value}</span>
            <span className="v2-stat-label">{s.label}</span>
            <span className="v2-stat-sub">{s.sub}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
