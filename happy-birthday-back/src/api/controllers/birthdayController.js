const { DateTime } = require("luxon");
const parseService = require("../services/parseServiceBirthday");


exports.getTodaysBirthday = async (req, res) => {
    const todaysDate = DateTime.now().setLocale('fr').toFormat('dd/LL');

    const [result] = await parseServiceBirthday(todaysDate);
    
    res.json({
        count_total: [result].length,
        students_birthday : result,
        teachers_birthday : result
    })
}