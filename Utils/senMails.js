const nodemailer = require('nodemailer');

const sendMails = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: 'My Application <noreply@myapplication.com>',
      to,
      subject,
      text,
    });

    console.log(`Email sent to ${to}: ${info.messageId}`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = sendMails;