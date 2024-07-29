module.exports = (server) => {
    const birthdayController = require("../controllers/birthdayAddController");

    server
        .post("/addBirthday", birthdayController.addBirthday)
}