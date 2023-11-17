const nodeMailer = require("nodemailer");
const sendEmail = async (option) => {
  const transporter = nodeMailer.createTransport({
    // host:
    // port:
    // auth:{
    //    user:
    // pass:
    // }
  });

  const emailOptions={
    from:"e-commerce support<e-commerect@school.com>",
    to:option.email,
    subject:option.subject,
    text:option.message
  }

  await transporter.sendEmail(emailOptions)
};

module.exports = sendEmail;