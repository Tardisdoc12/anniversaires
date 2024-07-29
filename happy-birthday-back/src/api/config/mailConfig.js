// src/config/nodemailerConfig.js

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'jean.anquetil12@gmail.com',
    pass: 'Mds1f2mp!je99',
  },
});

module.exports = transporter;
