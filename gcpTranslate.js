const {Translate} = require('@google-cloud/translate').v2;
const { getFirebaseServiceAccountJson } = require("./awsSecrets");


let translate;

(async function(){
    let serviceAccountJson = await getFirebaseServiceAccountJson();
    // console.log(serviceAccountJson);
    
    translate = new Translate({
        credentials: serviceAccountJson,
      });
    
    // const text = 'Hello, world!';
    // const target = 'hi';
    
    // await translateText(text,target);
    
    
})();



async function translateText(text,target) {
  let [_,translation] = await translate.translate(text, target);
  console.log(JSON.stringify(translation));
  return translation;
}
async function listLanguages() {
    const [languages] = await translate.getLanguages();
    return languages;
}
  
  

module.exports = { translateText,listLanguages }


