const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

async function request(path, { method = 'GET', body, admin = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  if (admin) {
    // Loaded on demand so the ~100KB+ Firebase Auth SDK only ships to
    // visitors who actually hit an admin-authenticated endpoint, instead
    // of bundling it into every public page's chunk.
    const { auth } = await import('./firebaseClient');
    const user = auth?.currentUser;
    if (!user) throw new Error('Not signed in');
    // Fetched fresh on every call (never cached) so long admin sessions
    // (ID tokens expire hourly) keep working without a re-login.
    headers.Authorization = `Bearer ${await user.getIdToken()}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (res.status === 204) return null;

  const payload = await res.json().catch(() => null);
  if (!res.ok) {
    const message = payload?.error?.message || `Request failed (${res.status})`;
    const error = new Error(message);
    error.fields = payload?.error?.fields;
    error.status = res.status;
    throw error;
  }
  return payload;
}

export const api = {
  createRegistration: (data) => request('/api/registrations', { method: 'POST', body: data }),
  listRegistrations: () => request('/api/registrations', { admin: true }),
  updateRegistration: (id, patch) =>
    request(`/api/registrations/${id}`, { method: 'PATCH', body: patch, admin: true }),
  deleteRegistration: (id) => request(`/api/registrations/${id}`, { method: 'DELETE', admin: true }),

  createTeacherApplication: (data) =>
    request('/api/teacher-applications', { method: 'POST', body: data }),
  listTeacherApplications: () => request('/api/teacher-applications', { admin: true }),
  updateTeacherApplication: (id, patch) =>
    request(`/api/teacher-applications/${id}`, { method: 'PATCH', body: patch, admin: true }),
  deleteTeacherApplication: (id) =>
    request(`/api/teacher-applications/${id}`, { method: 'DELETE', admin: true }),

  sendChatMessage: (messages) => request('/api/chat', { method: 'POST', body: { messages } }),
};
