const nodemailer = require("nodemailer");

function mailOTP(userEmail) {
  let OTP = Math.floor(1000 + Math.random() * 9000).toString();

  let emailBody = `<p>OTP to verify your Renter. account. The code is valid for 10 minutes</p>
    <h3>Your OTP is</h3>
    <h1>${OTP}</h1>`;

  let emailOptions = {
    from: `Renter. Account verification<${process.env.GMAIL_ID}>`,
    to: userEmail,
    subject: "Renter account verification",
    text: "This mail contains OTP to verify your renter account",
    html: emailBody,
  };
    
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "Gmail",

    auth: {
      user: process.env.GMAIL_ID,
      pass: process.env.GMAIL_PASS,
    },
  });
    
  return { option: emailOptions, otp: OTP, transporter: transporter };
}

module.exports = mailOTP;
