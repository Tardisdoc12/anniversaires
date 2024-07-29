// src/scheduler/birthdayScheduler.js

const cron = require('node-cron');
const mariadb = require('mariadb'); // Importez votre module de base de données
const emailService = require('../api/services/parseServiceEmail');

const pool = mariadb.createPool(
    {
        host: '127.0.0.1', 
        user: 'root', 
        database: "DrawDay",
        password: 'admin',
        connectionLimit: 5
});

const getTodaysBirthdays = async () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const todayFormatted = `${day}/${month}`;
  let conn;
  conn = await pool.getConnection();
  const query = 'SELECT * FROM Anniversaries WHERE SUBSTRING(birthday, 1, 5) = ?';
  const values = [todayFormatted];

  try {
    const results = await conn.query(query, [todayFormatted]);
    console.log(results)
    return results;
  } catch (error) {
    console.error('Error fetching birthdays:', error);
    return [];
  }finally{
    if (conn) conn.release();
  }
};

const scheduleBirthdayEmails = () => {
  cron.schedule('0 8 * * *', async () => {
    console.log('Running birthday email scheduler');
    const birthdays = await getTodaysBirthdays();
    console.log(birthdays)
    birthdays.forEach(async (user) => {
      await emailService.sendBirthdayEmail(user);
    });
  }, {
    timezone: "Europe/Paris" // GMT+1
  });
};

module.exports = scheduleBirthdayEmails;
