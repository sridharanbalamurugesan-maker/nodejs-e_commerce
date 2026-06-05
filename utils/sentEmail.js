const nodemailer = require("nodemailer");

const sendMail = async (email, subject, html) => {
    try {
       const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});
const info=  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject,
    html,
  });
  console.log("Mail sent:", info.response);
    } catch (error) {
         console.log("Mail Error:", error);
    throw error;
    }
};

module.exports = sendMail;