import { db, FieldValue } from '../config/firebaseAdmin.js';

const COLLECTION = 'teacherApplications';

function serialize(doc) {
  const data = { id: doc.id, ...doc.data() };
  if (data.createdAt?.toDate) data.createdAt = data.createdAt.toDate().toISOString();
  if (data.updatedAt?.toDate) data.updatedAt = data.updatedAt.toDate().toISOString();
  return data;
}

export async function createTeacherApplication(data) {
  const ref = await db.collection(COLLECTION).add({
    ...data,
    createdAt: FieldValue.serverTimestamp(),
  });
  return ref.id;
}

export async function listTeacherApplications() {
  const snap = await db.collection(COLLECTION).orderBy('createdAt', 'desc').get();
  return snap.docs.map(serialize);
}

export async function updateTeacherApplication(id, patch) {
  const ref = db.collection(COLLECTION).doc(id);
  await ref.update({ ...patch, updatedAt: FieldValue.serverTimestamp() });
  return serialize(await ref.get());
}

export async function deleteTeacherApplication(id) {
  await db.collection(COLLECTION).doc(id).delete();
}
