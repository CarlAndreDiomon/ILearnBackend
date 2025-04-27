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
