// Fetches the registrations list from the Vihakids API and turns each record
// into what the popup shows. The API is the same one the admin page uses
// (GET /api/registrations, admin-only, Bearer token).
import { API_BASE } from './config.js';
import { getIdToken } from './auth.js';

export const STATUS_LABELS = { new: 'New', contacted: 'Contacted', demo: 'Demo scheduled', enrolled: 'Enrolled', closed: 'Closed' };

// Mirrors app/frontend/src/lib/demoPlan.js — the homepage planner stores its
// extra answers as query parameters on the record's `page` value.
const TIME_LABELS = { morning: 'Before school', afternoon: 'After school', evening: 'Evening', weekend: 'Weekend' };
const FOCUS_LABELS = {
  behind: 'Keep up with school lessons',
  exam: 'Get ready for a test or exam',
  marks: 'Score better marks',
  basics: 'Build strong basics',
  fear: 'Feel confident in the subject',
  homework: 'Help with homework',
};

export function demoPlan(page) {
  if (typeof page !== 'string' || !page.includes('?')) return [];
  const q = new URLSearchParams(page.slice(page.indexOf('?') + 1));
  const out = [];
  if (q.get('focus')) out.push(FOCUS_LABELS[q.get('focus')] || q.get('focus'));
  if (q.get('time')) out.push(TIME_LABELS[q.get('time')] || q.get('time'));
  if (q.get('lang')) out.push(`Explain in ${q.get('lang')}`);
  return out;
}

export function ordinal(n) {
  return n + (n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th');
}

export function timeAgo(iso) {
  if (!iso) return '';
  const mins = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} h ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days} d ago`;
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

// WhatsApp link for a stored number ("+919876543210" → wa.me/919876543210).
export function whatsappLink(phone) {
  const digits = String(phone || '').replace(/[^0-9]/g, '');
  return digits ? `https://wa.me/${digits}` : null;
}

export class NotSignedIn extends Error {}

export async function fetchLeads() {
  const token = await getIdToken();
  if (!token) throw new NotSignedIn('Not signed in');
  const res = await fetch(`${API_BASE}/api/registrations`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 401 || res.status === 403) throw new NotSignedIn('This account is not an admin, or the sign-in has expired.');
  if (!res.ok) throw new Error(`The Vihakids API answered ${res.status}.`);
  const rows = await res.json();
  // Newest first, as the admin page shows them.
  return rows.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
}
