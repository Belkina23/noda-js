const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY, EMAIL_FROM, BASE_URL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  try {
    const mail = {
      to: data.email,
      from: EMAIL_FROM,
      subject: "Email verification",
      text: "Verification",
      html: `<p>To verify your email, <a target="_blank" href="${BASE_URL}/users/verify/${data.verificationToken}">follow this link</a></p>`,
    };
    await sgMail.send(mail);
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = sendEmail;
