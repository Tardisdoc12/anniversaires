module.exports = (server) => {
    const registerController = require("../controllers/registerController");

    server
        .post("/register", registerController.register)
}