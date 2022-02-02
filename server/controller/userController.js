const asyncHandler = require("express-async-handler");
const userHelper = require("../helpers/userHelper");
const bcrypt = require("bcryptjs");
const mailOTP = require("../utils/nodeMailer");

module.exports = {
  registerUser: asyncHandler(async (req, res) => {
    var userExist = await userHelper.duplicateUserCheck(req.body.email);

    if (userExist) {
      res.status(400);
      throw new Error("User already exists");
    } else {
      req.body.password = await bcrypt.hash(req.body.password, 10);

      let { option, otp, transporter } = await mailOTP(req.body.email);

      transporter.sendMail(option, async (error, info) => {
        if (error) {
          res.status(500).json({ message: "Unable to send OTP" });
        } else {
          let checkAuthUser = await userHelper.checkAuthUserExist(
            req.body.email
          );
          if (checkAuthUser) {
            userHelper
              .updateAuthUserData(checkAuthUser._id, otp, req.body)
              .then(() => {
                res
                  .status(200)
                  .json({
                    message: "OTP send to email",
                    email: req.body.email,
                  });
              });
          } else {
            userHelper.storeAuthUserData(req.body, otp).then(() => {
              res.status(200).json({
                message: "OTP send to email",
                email: req.body.email,
              });
            });
          }
        }
      });
    }
  }),
};
