import { db, FieldValue } from '../config/firebaseAdmin.js';

const COLLECTION = 'registrations';

// Firestore Timestamps don't serialize usefully via res.json() by default —
// convert to ISO strings so the frontend can just `new Date(iso)`.
function serialize(doc) {
  const data = { id: doc.id, ...doc.data() };
  if (data.createdAt?.toDate) data.createdAt = data.createdAt.toDate().toISOString();
  if (data.updatedAt?.toDate) data.updatedAt = data.updatedAt.toDate().toISOString();
  return data;
}

export async function createRegistration(data) {
  const ref = await db.collection(COLLECTION).add({
    ...data,
    createdAt: FieldValue.serverTimestamp(),
  });
  return ref.id;
}

export async function listRegistrations() {
  const snap = await db.collection(COLLECTION).orderBy('createdAt', 'desc').get();
  return snap.docs.map(serialize);
}

export async function updateRegistration(id, patch) {
  const ref = db.collection(COLLECTION).doc(id);
  await ref.update({ ...patch, updatedAt: FieldValue.serverTimestamp() });
  return serialize(await ref.get());
}

export async function deleteRegistration(id) {
  await db.collection(COLLECTION).doc(id).delete();
}
