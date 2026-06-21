require('dotenv').config({ path: '.env' });
const nodemailer = require('nodemailer');

async function test() {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Campfly Test" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // send to self
      subject: 'Test Email from Zoho',
      text: 'If you get this, Zoho SMTP is working!',
    });

    console.log('Success:', info.messageId);
  } catch (error) {
    console.error('Error:', error);
  }
}
test();
