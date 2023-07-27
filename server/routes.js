const usersRoutes = require("./controllers/api/usersAPI/usersController");
const translationRoutes = require("./controllers/api/translationAPI/translationController");
module.exports.register = function (router){
    router.get("/user",usersRoutes.getUsersData);
    router.post("/user",usersRoutes.createUserData);
    router.put("/user",usersRoutes.updateUserData);
    router.post("/translate/text", translationRoutes.translateTextAPI);
    router.get("/translate/languages",translationRoutes.getSupportedLanguages);
}

