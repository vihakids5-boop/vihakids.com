const adminEmails = new Set(
  (process.env.ADMIN_EMAILS || 'vihakids5@gmail.com')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
);

export function isAdminEmail(email) {
  return typeof email === 'string' && adminEmails.has(email.toLowerCase());
}
