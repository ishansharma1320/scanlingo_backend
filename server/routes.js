const usersRoutes = require("./controllers/api/usersAPI/usersController");

module.exports.register = function (router){
    router.use("/users",usersRoutes.getUsersData)
}