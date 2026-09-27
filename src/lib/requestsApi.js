import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  getDocs,
  writeBatch,
} from 'firebase/firestore';
import { db, firebaseReady, REQUESTS_COLLECTION } from './firebase';

/** Firestore `pickup_requests` collection. Document id == pickup id (SWC-XXXX). */
const requestsRef = () => collection(db, REQUESTS_COLLECTION);

const notConfigured = (action) => {
  const err = new Error(
    `[Firestore] Cannot ${action}: Firebase is not configured (check VITE_FIREBASE_* in .env).`
  );
  console.error(err.message);
  return err;
};

/** Newest first, same ordering the app had with local data. */
const sortNewestFirst = (items) =>
  [...items].sort((a, b) => (b.createdAtMs || 0) - (a.createdAtMs || 0));

/**
 * Read - live subscription to all pickup requests.
 * Fires immediately with the local cache, then again on every server update.
 */
export function subscribeToRequests(onChange, onError) {
  if (!firebaseReady) {
    console.error(notConfigured('read requests').message);
    return () => {};
  }

  return onSnapshot(
    requestsRef(),
    (snapshot) => {
      const items = snapshot.docs.map((snapshotDoc) => ({
        id: snapshotDoc.id,
        ...snapshotDoc.data(),
      }));
      onChange(sortNewestFirst(items));
    },
    (error) => {
      console.error('[Firestore] subscription error:', error);
      if (onError) onError(error);
    }
  );
}

/** Create - saves one pickup request to Firestore and returns it. */
export async function createRequest(record) {
  if (!firebaseReady) throw notConfigured('create request');

  const reference = doc(db, REQUESTS_COLLECTION, record.id);
  await setDoc(reference, record);
  return record;
}

/** Update - transitions a request to a new status (used by the admin dashboard). */
export async function updateRequestStatus(id, status) {
  if (!firebaseReady) throw notConfigured('update request');

  await updateDoc(doc(db, REQUESTS_COLLECTION, id), {
    status,
    updatedAt: Date.now(),
  });
  return id;
}

/** Replace the whole collection (used by the existing "Reset Requests" action). */
export async function replaceAllRequests(records) {
  if (!firebaseReady) throw notConfigured('reset requests');

  const existing = await getDocs(requestsRef());
  const deleteBatch = writeBatch(db);
  existing.docs.forEach((snapshotDoc) => deleteBatch.delete(snapshotDoc.ref));
  await deleteBatch.commit();

  const seedBatch = writeBatch(db);
  records.forEach((record) => {
    seedBatch.set(doc(db, REQUESTS_COLLECTION, record.id), record);
  });
  await seedBatch.commit();

  return records.length;
}
