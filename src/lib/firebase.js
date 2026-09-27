import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

/**
 * Firebase web configuration.
 * Every value comes from environment variables so no secrets live in source code.
 * Copy `.env` and fill in the `VITE_FIREBASE_*` values from your Firebase console
 * (Project settings -> General -> Your apps -> Web app -> firebaseConfig).
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const isConfigured = Boolean(firebaseConfig.projectId && firebaseConfig.appId);

let app = null;
let db = null;

if (isConfigured) {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} else {
  console.error(
    '[Firebase] Configuration missing. Fill VITE_FIREBASE_* in the .env file and restart the dev server.'
  );
}

export const firebaseReady = isConfigured;
export { app, db };
export const REQUESTS_COLLECTION = 'pickup_requests';
