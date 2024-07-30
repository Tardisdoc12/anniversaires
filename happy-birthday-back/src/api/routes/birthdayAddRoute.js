const verifyToken = require('../../middleware/middleware');

module.exports = (server) => {
    const birthdayController = require("../controllers/birthdayAddController");

    server
        .post("/addBirthday", verifyToken, birthdayController.addBirthday)
}