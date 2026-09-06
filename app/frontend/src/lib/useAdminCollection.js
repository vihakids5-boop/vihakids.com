import { useCallback, useEffect, useRef, useState } from 'react';

const POLL_MS = 25000;

// Fetch-on-mount + poll-while-visible replacement for admin.html's
// onSnapshot listeners, now that a REST API sits between the browser and
// Firestore. Inline edits update local state optimistically so there's no
// perceptible lag; the poll only picks up leads that arrive from elsewhere.
export function useAdminCollection({ list, update, remove }, enabled) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const timerRef = useRef(null);

  const refresh = useCallback(async () => {
    try {
      const data = await list();
      setRows(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [list]);

  useEffect(() => {
    if (!enabled) return;
    refresh();

    function tick() {
      if (document.visibilityState === 'visible') refresh();
    }
    timerRef.current = setInterval(tick, POLL_MS);
    window.addEventListener('focus', refresh);
    return () => {
      clearInterval(timerRef.current);
      window.removeEventListener('focus', refresh);
    };
  }, [enabled, refresh]);

  async function patch(id, changes) {
    const updated = await update(id, changes);
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...updated } : r)));
  }

  async function del(id) {
    await remove(id);
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  return { rows, loading, error, refresh, patch, del };
}
