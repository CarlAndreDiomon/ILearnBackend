<<<<<<< HEAD
let serviceAccount;

// Try to get service account from environment variable first
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  // Fall back to file for local development
  try {
    serviceAccount = JSON.parse(fs.readFileSync('/app/src/config/serviceAccountKey.json', 'utf8'));
  } catch (error) {
    console.error('Failed to load service account key:', error);
    throw new Error('Firebase service account key not available');
  }
}
=======
import admin from 'firebase-admin';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

// Get __dirname equivalent in ES module
const __dirname = dirname(fileURLToPath(import.meta.url));

// Read and parse the JSON key
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'i-learn-app-a0baa.firebasestorage.app', // replace with yours
});

const bucket = admin.storage().bucket();

export default bucket;
>>>>>>> Development
