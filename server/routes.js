const usersRoutes = require("./controllers/api/usersAPI/usersController");
const translationRoutes = require("./controllers/api/translationAPI/translationController");

console.log("Initialising routes");
module.exports.register = function (router, db, admin){
    router.get("/user",async (req,res)=>usersRoutes.getUsersData(req,res,db, admin));
    router.post("/user",async (req,res)=>usersRoutes.createUserData(req,res,db, admin))
    router.put("/user",async (req,res)=>usersRoutes.updateUserData(req,res,db, admin));
    router.post("/translate/text",async (req,res)=>translationRoutes.translateTextAPI(req,res,db, admin) );
    router.get("/translate/languages",async (req,res)=>translationRoutes.getSupportedLanguages(req,res,db, admin));
}

