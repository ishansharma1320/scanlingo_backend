const { TextractClient, AnalyzeDocumentCommand } = require("@aws-sdk/client-textract"); 
require('dotenv').config();
const fs = require("fs");
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);


const client = new TextractClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      sessionToken: process.env.AWS_SESSION_TOKEN, // Include the session token here
    },
  });

  
// (async function(){
//     const buffer = await readFileAsync("./sampleImage.jpg")
//     // Use the buffer as needed
//     const input = { // AnalyzeDocumentRequest
//         Document: { // Document
//           Bytes: buffer
//           },
//           FeatureTypes: ["FORMS"]
//       };
//       const command = new AnalyzeDocumentCommand(input);
//       const response = await client.send(command);
//       console.log(response);      
// })();


async function extractTextFromImage(filePath) {
    const buffer = await readFileAsync(filePath)

    const input = {
        Document: {
            Bytes: buffer
        },
        FeatureTypes: ["FORMS"]
    };
    const command = new AnalyzeDocumentCommand(input);
    const response = await client.send(command);

    return response;
}

module.exports = { extractTextFromImage };