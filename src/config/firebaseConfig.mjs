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