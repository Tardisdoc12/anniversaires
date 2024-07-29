const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
module.exports = (server) => {
    const convert = require("../controllers/convertQuoteController");
    server
        .post('/convert-quote', upload.single('file') ,convert.convertQuoteFile)
}