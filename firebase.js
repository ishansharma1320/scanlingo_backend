const admin = require('firebase-admin');
const { getFirebaseServiceAccountJson } = require("./awsSecrets");
const { getFirestore } = require('firebase-admin/firestore');

let isInitialized = false;


async function initializeFirebase() {
  
  console.log("Initialising firebase");
  if (!isInitialized) {
    isInitialized = true; 
    
    try {
      let serviceAccountJson = await getFirebaseServiceAccountJson();
      if (!admin.apps.length) {
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccountJson),
        });
      }
      
      // console.log(db);
    } catch (error) {
      console.error("Error initializing Firebase:", error);
      // Handle the error as needed
    }
  }

  let db = getFirestore();
  
  return {db, admin};
}

module.exports = {initializeFirebase};

