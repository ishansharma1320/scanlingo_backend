const dynamoose = require('dynamoose');
require('dotenv').config();
// Set the AWS region (replace 'us-east-1' with your desired region)
const {DynamoDBClient} = require("@aws-sdk/client-dynamodb");

dynamoose.aws.sdk = 
    new DynamoDBClient({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            sessionToken: process.env.AWS_SESSION_TOKEN, // Include the session token here
          }
    });




module.exports = dynamoose;
