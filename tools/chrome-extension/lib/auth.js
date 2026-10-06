// Firebase Auth without the Firebase SDK: the two REST calls the SDK makes
// underneath. Email + password sign-in gives an ID token (valid for an hour)
// and a refresh token; the refresh token mints new ID tokens from the
// background worker without asking for the password again.
//
// Tokens live in chrome.storage.local, which only this extension can read.
// Sign out wipes them.
import { FIREBASE_API_KEY } from './config.js';

const SIGN_IN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;
const REFRESH_URL = `https://securetoken.googleapis.com/v1/token?key=${FIREBASE_API_KEY}`;

const FRIENDLY = {
  INVALID_LOGIN_CREDENTIALS: 'Incorrect email or password.',
  INVALID_PASSWORD: 'Incorrect email or password.',
  EMAIL_NOT_FOUND: 'No account found with that email.',
  USER_DISABLED: 'This account has been disabled.',
  TOO_MANY_ATTEMPTS_TRY_LATER: 'Too many attempts. Please wait a few minutes and try again.',
  TOKEN_EXPIRED: 'Your sign-in has expired. Please sign in again.',
  USER_NOT_FOUND: 'Your sign-in has expired. Please sign in again.',
};

function friendly(code) {
  const key = String(code || '').split(' ')[0];
  return FRIENDLY[key] || 'Sign-in failed. Please try again.';
}

export async function signIn(email, password) {
  const res = await fetch(SIGN_IN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, returnSecureToken: true }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(friendly(body?.error?.message));
  await chrome.storage.local.set({
    session: {
      email: body.email,
      idToken: body.idToken,
      refreshToken: body.refreshToken,
      expiresAt: Date.now() + Number(body.expiresIn || 3600) * 1000,
    },
  });
  return body.email;
}

export async function signOut() {
  await chrome.storage.local.remove(['session', 'leads', 'seenIds', 'lastCheck', 'lastError']);
  await chrome.action.setBadgeText({ text: '' });
}

export async function getSession() {
  const { session } = await chrome.storage.local.get('session');
  return session || null;
}

// A valid ID token, refreshed if it has under two minutes left. Returns null
// when there is no session, or the refresh token itself has been revoked —
// the caller should then show the sign-in form.
export async function getIdToken() {
  const session = await getSession();
  if (!session) return null;
  if (session.expiresAt - Date.now() > 2 * 60 * 1000) return session.idToken;

  const res = await fetch(REFRESH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: session.refreshToken }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    // A revoked or expired refresh token cannot be recovered from here.
    await signOut();
    return null;
  }
  await chrome.storage.local.set({
    session: {
      ...session,
      idToken: body.id_token,
      refreshToken: body.refresh_token || session.refreshToken,
      expiresAt: Date.now() + Number(body.expires_in || 3600) * 1000,
    },
  });
  return body.id_token;
}
