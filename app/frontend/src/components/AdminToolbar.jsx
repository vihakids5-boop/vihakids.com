export default function AdminToolbar({ query, onQuery, status, onStatus, statuses, onExport, onRefresh }) {
  return (
    <div className="admin-toolbar">
      <input
        type="text"
        placeholder="Search…"
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        style={{ minWidth: 200 }}
      />
      <select value={status} onChange={(e) => onStatus(e.target.value)}>
        <option value="">All statuses</option>
        {Object.entries(statuses).map(([value, label]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
      <button type="button" className="btn btn-ghost" onClick={onRefresh}>Refresh</button>
      <button type="button" className="btn btn-ghost" onClick={onExport}>Download CSV</button>
    </div>
  );
}
