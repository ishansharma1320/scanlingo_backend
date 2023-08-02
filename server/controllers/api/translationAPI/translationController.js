const {listLanguages, translateText} = require("../../../../gcpTranslate");
const {Translation} = require("../../../models/TranslationModel");
const { v4: uuidv4 } = require('uuid');



const translateTextAPI = async (req, res, db,admin)=>{
    let code = 200;
    let response = {status: false, response: null}
    let decodedTokenData; 
    if(req.headers["x-firebase-decoded-token"]){
        decodedTokenData = JSON.parse(req.headers["x-firebase-decoded-token"]).decodedToken;
    } else {
        let authorizationToken = req.headers.authorizationtoken;
        console.log(authorizationToken);
        decodedTokenData = await admin.auth().verifyIdToken(authorizationToken); 
    }

    let { sourceText, targetLanguage } = req.body;

    try{
        let translation = await translateText(sourceText,targetLanguage);
        if(translation && translation.data && Array.isArray(translation.data.translations) && translation.data.translations.length > 0){
            // {"data":{"translations":[{"translatedText":"हैलो वर्ल्ड!","detectedSourceLanguage":"en"}]}}
            let translatedData = translation.data.translations[0];
            let translationObject = {text: {source: { utterance: sourceText, lang: translatedData.detectedSourceLanguage}, translated: {utterance: translatedData.translatedText, lang: targetLanguage}}};
            const uniqueId = uuidv4();
            const newTranslation = new Translation({type: "Text", translation_id: uniqueId, user_id: decodedTokenData.uid || '', created_at: new Date(), ...translationObject});
            await newTranslation.save();
            console.log(newTranslation.translation_id);
            console.log('New user created:', newTranslation);
            response.response = {message: translatedData};
        }
        response.status = true;
        
    } catch(err){
        console.error(err)
        response["error"] = err.message;
        code = 500;
    }

    res.status(code).json(response);

}


const getSupportedLanguages = async (req, res, db,admin) =>{
    let code = 200;
    let response = {status: false, response: null}
    
    try{
        const languages = await listLanguages();
        response.status = true;
        response.response = {message: languages};
    } catch(err){
        console.error(err)
        response["error"] = err.message;
        code = 500;
    }

    res.status(code).json(response);
}


module.exports = {translateTextAPI,getSupportedLanguages};