// src/api/services/emailService.js

const transporter = require('../config/mailConfig');

exports.sendBirthdayEmail = async (user) => {
  const mailOptions = {
    from: 'jean.anquetil12@gmail.com',
    to: user.email,
    subject: 'Happy Birthday!',
    text: `Happy Birthday ${user.firstname} ${user.lastname}!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Birthday email sent to ${user.email}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
