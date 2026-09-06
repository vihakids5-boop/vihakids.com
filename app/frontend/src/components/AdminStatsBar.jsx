export default function AdminStatsBar({ rows, highlightStatus, highlightLabel }) {
  const total = rows.length;
  const newCount = rows.filter((r) => (r.status || 'new') === 'new').length;
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recent = rows.filter((r) => r.createdAt && new Date(r.createdAt).getTime() > weekAgo).length;
  const highlighted = rows.filter((r) => r.status === highlightStatus).length;

  return (
    <div className="stats">
      <div className="stat-card"><div className="n">{total}</div><div className="l">Total</div></div>
      <div className="stat-card"><div className="n">{newCount}</div><div className="l">New</div></div>
      <div className="stat-card"><div className="n">{recent}</div><div className="l">Last 7 days</div></div>
      <div className="stat-card"><div className="n">{highlighted}</div><div className="l">{highlightLabel}</div></div>
    </div>
  );
}
