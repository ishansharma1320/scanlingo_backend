const {Translate} = require('@google-cloud/translate').v2;
const { getFirebaseServiceAccountJson } = require("./awsSecrets");

(async function(){
    let serviceAccountJson = await getFirebaseServiceAccountJson();
    console.log(serviceAccountJson);
    // console.log(admin);
    const translate = new Translate({
        credentials: serviceAccountJson,
      });
    
    const text = 'Hello, world!';
    const target = 'hi';
    
    await translateText(translate, text,target);
})();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// const text = 'The text to translate, e.g. Hello, world!';
// const target = 'The target language, e.g. ru';

async function translateText(translate, text,target) {
  // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.
  let translation = await translate.translate(text, target);
  console.log(translation);
}




