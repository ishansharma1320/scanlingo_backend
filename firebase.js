const admin = require('firebase-admin');
const { getFirebaseServiceAccountJson } = require("./awsSecrets");
const { getFirestore } = require('firebase-admin/firestore');

let isInitialized = false;
let db;

async function initializeFirebase() {
  if (!isInitialized) {
    isInitialized = true; 

    let serviceAccountJson = await getFirebaseServiceAccountJson();
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccountJson),
      });
    }
    db = getFirestore();
  }
}

initializeFirebase().catch((error) => {
  console.error("Error initializing Firebase:", error);
});

module.exports = { initializeFirebase, admin, db };