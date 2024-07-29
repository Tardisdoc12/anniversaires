const parseService = require("../services/parseServiceAddBirth");


exports.addBirthday = async (req, res) => {
    let result;
    const { birthday, firstname, lastname, email } = req.body

    result = await parseService.parseServiceAddBirthday(birthday, firstname, lastname, email);
    if (result){
        res.json({
            success : true,
        })
    }else{
        res.json({
            success : false,
        })
    }
}