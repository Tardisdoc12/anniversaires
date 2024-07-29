const { DateTime } = require("luxon");
const parseService = require("../services/parseServiceBirthday");


exports.getTodaysBirthday = async (req, res) => {
    let result;
    const todaysDate = DateTime.now().setLocale('fr').toFormat('dd/LL');

    result = await parseService.parseServiceBirthday(todaysDate);
    res.json({
        count_total: result.length,
        students_birthday : result,
        teachers_birthday : result
    })
}