module.exports = (server) => {
    const loginController = require("../controllers/loginController");

    server
        .post("/login", loginController.Login)
}