import admin from 'firebase-admin';

function buildCredential() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    const json = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_JSON, 'base64').toString('utf8');
    return admin.credential.cert(JSON.parse(json));
  }
  // Falls back to GOOGLE_APPLICATION_CREDENTIALS (a path to the downloaded
  // service-account JSON file) — see app/README.md for how to obtain it.
  return admin.credential.applicationDefault();
}

if (!admin.apps.length) {
  admin.initializeApp({ credential: buildCredential() });
}

export const db = admin.firestore();
export const auth = admin.auth();
export const FieldValue = admin.firestore.FieldValue;
