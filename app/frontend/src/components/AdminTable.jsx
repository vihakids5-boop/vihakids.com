import { useRef, useState } from 'react';

const NOTES_DEBOUNCE_MS = 700;

// One generic table for both the registrations and teacher-application
// tabs, driven by `columns` — replaces admin.html's two near-identical
// hand-rolled tables.
export default function AdminTable({ rows, columns, statuses, onPatch, onDelete }) {
  const timers = useRef({});
  const [saveFlags, setSaveFlags] = useState({});
  const [notesDraft, setNotesDraft] = useState({});

  function flagSaved(id, ok) {
    setSaveFlags((f) => ({ ...f, [id]: ok ? 'ok' : 'err' }));
    setTimeout(() => setSaveFlags((f) => ({ ...f, [id]: undefined })), 2000);
  }

  async function handleStatus(row, status) {
    try {
      await onPatch(row.id, { status });
      flagSaved(row.id, true);
    } catch {
      flagSaved(row.id, false);
    }
  }

  function handleNotesChange(row, value) {
    setNotesDraft((d) => ({ ...d, [row.id]: value }));
    clearTimeout(timers.current[row.id]);
    timers.current[row.id] = setTimeout(async () => {
      try {
        await onPatch(row.id, { notes: value });
        flagSaved(row.id, true);
      } catch {
        flagSaved(row.id, false);
      }
    }, NOTES_DEBOUNCE_MS);
  }

  async function handleDelete(row) {
    if (!window.confirm('Delete this entry? This cannot be undone.')) return;
    await onDelete(row.id);
  }

  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>When</th>
            {columns.map((c) => <th key={c.key}>{c.label}</th>)}
            <th>Status</th>
            <th>Notes</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.createdAt ? new Date(row.createdAt).toLocaleString() : '—'}</td>
              {columns.map((c) => <td key={c.key}>{c.render(row)}</td>)}
              <td>
                <select value={row.status || 'new'} onChange={(e) => handleStatus(row, e.target.value)}>
                  {Object.entries(statuses).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </td>
              <td>
                <textarea
                  value={notesDraft[row.id] ?? row.notes ?? ''}
                  onChange={(e) => handleNotesChange(row, e.target.value)}
                />
                {saveFlags[row.id] === 'ok' && <span className="save-flag ok">Saved</span>}
                {saveFlags[row.id] === 'err' && <span className="save-flag err">Not saved</span>}
              </td>
              <td>
                <button type="button" className="btn btn-ghost" onClick={() => handleDelete(row)}>Delete</button>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td colSpan={columns.length + 4}>No entries.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
