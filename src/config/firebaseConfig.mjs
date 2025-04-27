import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();


// Read and parse the JSON key
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'i-learn-app-a0baa.firebasestorage.app', // replace with yours
});

const bucket = admin.storage().bucket();

export default bucket;
