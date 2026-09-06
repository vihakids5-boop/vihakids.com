import { useState } from 'react';
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { auth, firebaseConfigured } from '../lib/firebaseClient';

const ERROR_MESSAGES = {
  'auth/invalid-credential': 'Incorrect email or password.',
  'auth/user-not-found': 'No account found with that email.',
  'auth/wrong-password': 'Incorrect email or password.',
  'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
  'auth/network-request-failed': 'Network error. Check your connection and try again.',
};

export default function AdminLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!firebaseConfigured) {
    return (
      <div className="hf-card admin-login">
        <h2 className="hf-title">Admin login not set up</h2>
        <p>Set the VITE_FIREBASE_* variables in app/frontend/.env — see app/README.md.</p>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(ERROR_MESSAGES[err.code] || 'Sign-in failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="hf-card admin-login">
      <h2 className="hf-title">Admin login</h2>
      <form onSubmit={handleSubmit}>
        <div className="hf-field">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
        </div>
        <div className="hf-field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
        </div>
        <button type="submit" className="btn btn-primary hf-submit" disabled={submitting}>
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
        {error && <div className="hf-status show" role="alert">{error}</div>}
      </form>
    </div>
  );
}
