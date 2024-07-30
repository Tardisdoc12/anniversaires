const parseService = require("../services/parseServiceLogin");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.Login = async (req, res) => {
    let result;
    const { email, password } = req.body
    console.log(req.body)
    //const hashedPassword = await bcrypt.hash(password, 10);
    result = await parseService.parseServiceLogin(email, password);
    if (result.success){
        const token = jwt.sign(
            {
              email : email,
              role : result.role
            },
            "M4f56OiT87G2hM6A9", //a mettre dans le .env
            { expiresIn: "1h" }
          );
      
        res.json({
            success : true,
            message : result.message,
            token : token
        })
    }else{
        res.json({
            success : false,
            message : result.message
        })
    }
}