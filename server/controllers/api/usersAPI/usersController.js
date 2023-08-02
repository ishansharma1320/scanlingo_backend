
const getUsersData = async (req,res,db,admin)=>{
    let code = 200;
    let response = {status: false, response: null}
    
    let decodedTokenData; 
    if(req.headers["x-firebase-decoded-token"]){
        decodedTokenData = JSON.parse(req.headers["x-firebase-decoded-token"]).decodedToken;
    } else {
        let authorizationToken = req.headers.authorizationToken;
        decodedTokenData = await admin.auth().verifyIdToken(authorizationToken); 
    }
    
    console.log(decodedTokenData);
    
    try{
        const userRef = await db.collection('users').doc(decodedTokenData.uid);
        const doc = await userRef.get();
        if(!doc.exists){
            response["error"] = "No User found";

            code = 404
        } else {
            response.response = {message: doc.data()};            
            code = 200
        }
        response.status = true;
    } catch(err){
        console.error(err)
        response["error"] = err.message;
        code = 500;
    }
    res.status(code).json(response)
}



const createUserData = async(req,res,db,admin)=>{
    let code = 201;
    let response = {status: false, response: null}
    const {firstName, lastName, email } = req.body;
    
    let decodedTokenData; 
    if(req.headers["x-firebase-decoded-token"]){
        decodedTokenData = JSON.parse(req.headers["x-firebase-decoded-token"]).decodedToken;
    } else {
        let authorizationToken = req.headers.authorizationToken;
        decodedTokenData = await admin.auth().verifyIdToken(authorizationToken); 
    }

    try{
        let userData = {user_id: decodedTokenData.uid, firstName, lastName, email};
        await db.collection('users').doc(decodedTokenData.uid).set(userData);
        response.status =true;
        response.response = {message: userData}
    } catch(err){
        console.error(err)
        response["error"] = err.message;
        code = 500;
    }

    res.status(code).json(response)
}

const updateUserData = async (req,res,db,admin)=>{
    console.log(body);
    let code = 201;
    let response = {status: false, response: null};
    const {firstName, lastName} = req.body;
    
    let decodedTokenData; 
    if(req.headers["x-firebase-decoded-token"]){
        decodedTokenData = JSON.parse(req.headers["x-firebase-decoded-token"]).decodedToken;
    } else {
        let authorizationToken = req.headers.authorizationToken;
        decodedTokenData = await admin.auth().verifyIdToken(authorizationToken); 
    }

    try{
        let userData = {firstName, lastName};
        await db.collection('users').doc(decodedTokenData.uid).update(userData);
        response.status =true;
        response.response = {message: {user_id: decodedTokenData.uid,...userData}}
    } catch(err){
        console.error(err)
        response["error"] = err.message;
        code = 500;
    }

    res.status(code).json(response)
}
module.exports.getUsersData =getUsersData;
module.exports.createUserData = createUserData;
module.exports.updateUserData = updateUserData;
// getUserData - Done
// createUser - Done
// textTranslation Done
// gettingLanguageList Done
// lambda authorizer with firebase
// uploadImage (background upload to S3) // triggers textract and stores to DB
// uploading to S3 creates a thumbnail for images and creates URL stores them to DB
// CRD for bookmarks
