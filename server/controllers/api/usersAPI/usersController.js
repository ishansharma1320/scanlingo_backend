const {db} = require("../../../../firebase");
const getUsersData = async (req,res)=>{
    let code = 200;
    let response = {status: false, response: null}

    console.log(req.currentUser);
    try{
        const userRef = await db.collection('users').doc(req.currentUser.uid);
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
    }
    res.status(code).json(response)
}



const createUserData = async(req, res)=>{
    let code = 201;
    let response = {status: false, response: null}
    const {firstName, lastName, email } = req.body;
    console.log(req.currentUser);

    try{
        let userData = {user_id: req.currentUser.uid, firstName, lastName, email};
        await db.collection('users').doc(req.currentUser.uid).set(userData);
        response.status =true;
        response.response = {message: userData}
    } catch(err){
        console.error(err)
        response["error"] = err.message;
        code = 500;
    }

    res.status(code).json(response)
}

const updateUserData = async (req,res)=>{
    let code = 201;
    let response = {status: false, response: null};
    const {firstName, lastName} = req.body;

    try{
        let userData = {firstName, lastName};
        await db.collection('users').doc(req.currentUser.uid).update(userData);
        response.status =true;
        response.response = {message: {user_id: req.currentUser.uid,...userData}}
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
// getUserData
// createUser
// uploadImage (background upload to S3) // triggers textract and stores to DB
// uploading to S3 creates a thumbnail for images and creates URL stores them to DB
// text translate
// CRD for bookmarks
