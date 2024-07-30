const parseService = require("../services/parseServiceRegister");
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    let result;
    const { firstname, lastname, email, password } = req.body
    console.log(req.body)
    const hashedPassword = await bcrypt.hash(password, 10);
    result = await parseService.parseServiceRegister(firstname, lastname, email, hashedPassword);
    if (result.success){
        res.json({
            success : true,
            message : result.message
        })
    }else{
        res.json({
            success : false,
            message : result.message
        })
    }
}