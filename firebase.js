const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');
admin.initializeApp({
    credential: admin.credential.cert(require("./csci-5409-s23-656f97b401b3.json")),
   
});
const db = getFirestore();

module.exports = { admin, db };