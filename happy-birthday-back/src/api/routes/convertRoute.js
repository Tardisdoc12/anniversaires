const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
module.exports = (server) => {
    const convert = require("../controllers/convertController");
    server
        .post('/upload', upload.single('file') ,convert.convertFile)
}