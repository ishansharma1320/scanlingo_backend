// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html

const {
    SecretsManagerClient,
    GetSecretValueCommand,
  } = require("@aws-sdk/client-secrets-manager");
  require('dotenv').config();


  const secret_name = "scanlingo";
  const client = new SecretsManagerClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      sessionToken: process.env.AWS_SESSION_TOKEN, // Include the session token here
    },
  });


const getFirebaseServiceAccountJson = async ()=>{
    let response;
    console.log("getting secrets");
    try {
      response = await client.send(
        new GetSecretValueCommand({
          SecretId: secret_name,
          VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
        })
      );
    } catch (error) {
      // For a list of exceptions thrown, see
      // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
      throw error;
    }
    
    const secret = response.SecretString;
    // console.log(secret);
    let data = JSON.parse(secret);
    return JSON.parse(data['firebase-service-account']);
}

// (async function(){
//   await getFirebaseServiceAccountJson();
// })();
module.exports = {getFirebaseServiceAccountJson}