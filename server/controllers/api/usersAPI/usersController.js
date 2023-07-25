const {db} = require("../../../../firebase");
const getUsersData = async (req,res)=>{
    console.log(req.currentUser);
    const snapshot = await db.collection('users').get();
    snapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());
    });

    res.json({"success":true})
}

module.exports.getUsersData =getUsersData;