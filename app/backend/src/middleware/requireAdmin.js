import { auth } from '../config/firebaseAdmin.js';
import { isAdminEmail } from '../config/adminEmails.js';

// Mirrors firestore.rules' isAdmin(): a valid Firebase ID token whose email
// is in the ADMIN_EMAILS allowlist. Attaches req.adminEmail on success.
export async function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: { message: 'Missing bearer token' } });
  }

  let decoded;
  try {
    decoded = await auth.verifyIdToken(token);
  } catch {
    return res.status(401).json({ error: { message: 'Invalid or expired token' } });
  }

  if (!isAdminEmail(decoded.email)) {
    return res.status(403).json({ error: { message: 'Not authorized' } });
  }

  req.adminEmail = decoded.email;
  next();
}
