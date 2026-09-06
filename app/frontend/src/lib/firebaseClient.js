import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Auth-only: this app no longer talks to Firestore directly from the
// browser — the backend mediates that via the Admin SDK. Auth stays
// client-side so the admin login page can obtain an ID token to send to
// the backend's protected endpoints.
const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

export const firebaseConfigured = Boolean(config.apiKey && config.projectId);

export const firebaseApp = firebaseConfigured ? initializeApp(config) : null;
export const auth = firebaseConfigured ? getAuth(firebaseApp) : null;
