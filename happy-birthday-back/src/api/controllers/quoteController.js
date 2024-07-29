const parseService = require('../services/parseServiceQuote');
exports.getRandomQuote = async (req, res) => {
  const TODAYS_QUOTE = await parseService.parseFile();
  res.json({ ...TODAYS_QUOTE });
};
