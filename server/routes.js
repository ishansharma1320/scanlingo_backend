const usersRoutes = require("./controllers/api/usersAPI/usersController");

module.exports.register = function (router){
    router.get("/user",usersRoutes.getUsersData);
    router.post("/user",usersRoutes.createUserData);
    router.put("/user",usersRoutes.updateUserData);
}

