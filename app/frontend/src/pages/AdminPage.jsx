import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, firebaseConfigured } from '../lib/firebaseClient';
import { api } from '../lib/api';
import { useAdminCollection } from '../lib/useAdminCollection';
import { downloadCsv } from '../lib/csv';
import { STATUSES, TEACH_STATUSES, GRADE_LABELS, EXPERIENCE_LABELS, ordinal } from '../constants/options';
import AdminLoginForm from '../components/AdminLoginForm';
import AdminStatsBar from '../components/AdminStatsBar';
import AdminToolbar from '../components/AdminToolbar';
import AdminTable from '../components/AdminTable';

const REG_COLUMNS = [
  { key: 'parentName', label: 'Parent', render: (r) => r.parentName },
  { key: 'phone', label: 'Phone', render: (r) => <a href={`tel:${r.phone}`}>{r.phone}</a> },
  { key: 'grade', label: 'Grade', render: (r) => `${ordinal(r.grade)} Std` },
  { key: 'subjects', label: 'Subjects', render: (r) => (r.subjects || []).map((s) => <span className="chip" key={s}>{s}</span>) },
  { key: 'source', label: 'Source', render: (r) => r.source || '—' },
];

const TEACH_COLUMNS = [
  { key: 'fullName', label: 'Name', render: (r) => r.fullName },
  { key: 'phone', label: 'Phone', render: (r) => <a href={`tel:${r.phone}`}>{r.phone}</a> },
  { key: 'email', label: 'Email', render: (r) => (r.email ? <a href={`mailto:${r.email}`}>{r.email}</a> : '—') },
  { key: 'subjects', label: 'Subjects', render: (r) => (r.subjects || []).map((s) => <span className="chip" key={s}>{s}</span>) },
  { key: 'grades', label: 'Grades', render: (r) => (r.grades || []).map((g) => GRADE_LABELS[g]).join(', ') },
  { key: 'experience', label: 'Experience', render: (r) => EXPERIENCE_LABELS[r.experience] || r.experience },
  { key: 'qualification', label: 'Qualification', render: (r) => r.qualification || '—' },
];

function filterRows(rows, query, status, searchableFields) {
  return rows.filter((r) => {
    if (status && (r.status || 'new') !== status) return false;
    if (!query) return true;
    const haystack = searchableFields.map((f) => String(r[f] ?? '')).join(' ').toLowerCase();
    return haystack.includes(query.toLowerCase());
  });
}

export default function AdminPage() {
  const [user, setUser] = useState(undefined);
  const [tab, setTab] = useState('registrations');
  const [regQuery, setRegQuery] = useState('');
  const [regStatus, setRegStatus] = useState('');
  const [teachQuery, setTeachQuery] = useState('');
  const [teachStatus, setTeachStatus] = useState('');
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (!firebaseConfigured) { setUser(null); return; }
    return onAuthStateChanged(auth, setUser);
  }, []);

  const reg = useAdminCollection(
    { list: api.listRegistrations, update: api.updateRegistration, remove: api.deleteRegistration },
    Boolean(user)
  );
  const teach = useAdminCollection(
    { list: api.listTeacherApplications, update: api.updateTeacherApplication, remove: api.deleteTeacherApplication },
    Boolean(user)
  );

  useEffect(() => {
    if (reg.error?.includes('Not authorized') || teach.error?.includes('Not authorized')) {
      setAuthError('This account is not an admin for Vihakids.');
    }
  }, [reg.error, teach.error]);

  const visibleReg = useMemo(
    () => filterRows(reg.rows, regQuery, regStatus, ['parentName', 'phone', 'subjects', 'grade', 'source', 'notes']),
    [reg.rows, regQuery, regStatus]
  );
  const visibleTeach = useMemo(
    () => filterRows(teach.rows, teachQuery, teachStatus, ['fullName', 'phone', 'email', 'subjects', 'experience', 'notes']),
    [teach.rows, teachQuery, teachStatus]
  );

  function exportRegCsv() {
    const headers = ['Date', 'Parent name', 'Phone', 'Grade', 'Subjects', 'Source', 'Status', 'Notes'];
    const rows = visibleReg.map((r) => [
      r.createdAt ? new Date(r.createdAt).toLocaleString() : '',
      r.parentName, r.phone, ordinal(r.grade) + ' Std', (r.subjects || []).join('; '),
      r.source || '', STATUSES[r.status || 'new'], r.notes || '',
    ]);
    downloadCsv(`vihakids-registrations-${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
  }

  function exportTeachCsv() {
    const headers = ['Date', 'Name', 'Phone', 'Email', 'Subjects', 'Grades', 'Experience', 'Qualification', 'Status', 'Notes'];
    const rows = visibleTeach.map((r) => [
      r.createdAt ? new Date(r.createdAt).toLocaleString() : '',
      r.fullName, r.phone, r.email || '', (r.subjects || []).join('; '),
      (r.grades || []).map((g) => GRADE_LABELS[g]).join('; '), EXPERIENCE_LABELS[r.experience] || r.experience,
      r.qualification || '', TEACH_STATUSES[r.status || 'new'], r.notes || '',
    ]);
    downloadCsv(`vihakids-teacher-applications-${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
  }

  if (user === undefined) return null; // waiting on auth state

  if (!user) {
    return (
      <main className="admin-shell">
        <div className="wrap">
          <div className="admin-topbar">
            <Link to="/" className="admin-back-link">&larr; Back to home</Link>
          </div>
          <AdminLoginForm />
        </div>
      </main>
    );
  }

  return (
    <main className="admin-shell">
      <div className="wrap">
        <div className="admin-topbar">
          <Link to="/" className="admin-back-link">&larr; Back to home</Link>
          <strong>Vihakids Admin</strong>
          <button type="button" className="btn btn-ghost" onClick={() => signOut(auth)}>Sign out</button>
        </div>

        {authError && <div className="hf-status show" role="alert">{authError}</div>}

        <div className="tabs">
          <button type="button" className={`tab${tab === 'registrations' ? ' active' : ''}`} onClick={() => setTab('registrations')}>
            Parent registrations
          </button>
          <button type="button" className={`tab${tab === 'teach' ? ' active' : ''}`} onClick={() => setTab('teach')}>
            Teacher applications
          </button>
        </div>

        {tab === 'registrations' && (
          <>
            <AdminStatsBar rows={reg.rows} highlightStatus="enrolled" highlightLabel="Enrolled" />
            <AdminToolbar
              query={regQuery} onQuery={setRegQuery}
              status={regStatus} onStatus={setRegStatus}
              statuses={STATUSES} onExport={exportRegCsv} onRefresh={reg.refresh}
            />
            {reg.loading ? <p>Loading…</p> : (
              <AdminTable rows={visibleReg} columns={REG_COLUMNS} statuses={STATUSES} onPatch={reg.patch} onDelete={reg.del} />
            )}
          </>
        )}

        {tab === 'teach' && (
          <>
            <AdminStatsBar rows={teach.rows} highlightStatus="hired" highlightLabel="Hired" />
            <AdminToolbar
              query={teachQuery} onQuery={setTeachQuery}
              status={teachStatus} onStatus={setTeachStatus}
              statuses={TEACH_STATUSES} onExport={exportTeachCsv} onRefresh={teach.refresh}
            />
            {teach.loading ? <p>Loading…</p> : (
              <AdminTable rows={visibleTeach} columns={TEACH_COLUMNS} statuses={TEACH_STATUSES} onPatch={teach.patch} onDelete={teach.del} />
            )}
          </>
        )}
      </div>
    </main>
  );
}
