import fetch from "node-fetch";
import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

let isInitialized = false;

const getSecretsFromSecretManager = async () =>{
  let secretName = "scanlingo";
  let url = `http://localhost:2773/secretsmanager/get?secretId=${secretName}`;
  let apiResponseObject = await fetch(url,{
    method: "GET",
       headers: {
      "X-Aws-Parameters-Secrets-Token": process.env.AWS_SESSION_TOKEN,
    },
  })
  let content = await apiResponseObject.json();
  let secretsAsString = content.SecretString;
  let secretsAsJSON = JSON.parse(secretsAsString);
  return secretsAsJSON;
}

const initializeFirebase = async () => {
  if (!isInitialized) {
    isInitialized = true; 

    let secrets = await getSecretsFromSecretManager();
    let serviceAccountJson = JSON.parse(secrets['firebase-service-account'])
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccountJson),
      });
    }
  }
  
  
}

const verifyIdToken = async (idToken) =>{
    console.log({event: "Inside verifyIDToken", data: idToken, admin})
    const decodedToken = await admin.auth().verifyIdToken(idToken); 
    return decodedToken;
}




export const handler = async (event) => {
  
  console.log({event: "Received Lambda event",data: event})
  await initializeFirebase();
  
  let auth = "Deny"
  let uid = null;
  let decodedTokenData = null;
  if(event.authorizationToken){
    console.log(event.authorizationToken);
    decodedTokenData = await verifyIdToken(event.authorizationToken)
    auth = "Allow"
    uid = decodedTokenData.uid;
  }
  
  let authResponse = { "principalId": "USER_NOT_ALLOWED", "policyDocument": { "Version": "2012-10-17", "Statement": [{"Action": "execute-api:Invoke", "Resource": [process.env.AWS_API_GW], "Effect": auth}] }}
  if(uid !== null){
    authResponse["principalId"] = uid;
    // authResponse["context"] = {decodedToken: decodedTokenData}
  }
  
  console.log({event: "Created Inline Auth Response",data: JSON.stringify(authResponse)})
  
  return authResponse;
};







