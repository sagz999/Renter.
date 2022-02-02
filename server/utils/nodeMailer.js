const nodemailer = require("nodemailer");

 function emailOTP(userEmail){
    console.log("Nodemailer")
  let OTP = parseInt(Math.random() * 1000000);
  let mailRes;
  let emailBody = `<p>OTP to verify your Renter. account. The code is valid for 10 minutes</p>
    <h3>Your OTP is</h3>
    <h1>${OTP}</h1>`;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "Gmail",

    auth: {
      user: process.env.GMAIL_ID,
      pass: process.env.GMAIL_PASS,
    }
  });
    
    let emailOptions = {
        from: `Renter. Account verification<${process.env.GMAIL_ID}>`,
        to: userEmail,
        subject: 'Renter account verification',
        text: "This mail contains OTP to verify your renter account",
        html:emailBody
    };
    
    
    transporter.sendMail(emailOptions, async (error, info) => {
      if (error) {
        return console.log(error);
      } else {
        return console.log(info);
      }
    });
};

module.exports = emailOTP;