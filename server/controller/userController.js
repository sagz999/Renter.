const asyncHandler = require("express-async-handler");
const userHelper = require("../helpers/userHelper");
const bcrypt = require("bcryptjs");
const mailOTP = require("../utils/VerificationNodeMailer");
const resetPasswordMailOTP = require("../utils/resetPasswordNodeMailer");

module.exports = {
  registerUser: asyncHandler(async (req, res) => {
    var userExist = await userHelper.UserExistCheck(req.body.email);

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
                res.status(200).json({
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

  resendUserOtp: asyncHandler(async (req, res) => {
    const { userEmail } = req.body;

    let { option, otp, transporter } = await mailOTP(userEmail);

    transporter.sendMail(option, async (error, info) => {
      if (error) {
        res.status(500).json({ message: "Unable to send OTP" });
      } else {
        userHelper.updateAuthUserOTP(userEmail, otp).then(() => {
          res.status(200).json({
            message: "OTP resend successfully",
          });
        });
      }
    });
  }),

  verifyUser: (req, res) => {
    userHelper
      .verifyUser(req.body)
      .then((userData) => {
        res.status(200).json(userData);
      })
      .catch(() => {
        res.status(400).json({ message: "Invalid OTP" });
      });
  },

  userLogin: (req, res) => {
    userHelper.UserExistCheck(req.body.email).then((user) => {
      if (user != null) {
        userHelper
          .userLoginCheck(req.body)
          .then((userData) => {
            if (userData == false) {
              res.status(400).json({
                message:
                  "Seems like you signed up with Google, Please sign in with Google to continue or click on forgot password to set a new password",
              });
            } else {
              res.status(200).json(userData);
            }
          })
          .catch(() => {
            res.status(400).json({ message: "Invalid Password" });
          });
      } else {
        res.status(404).json({ message: "User does not exist" });
      }
    });
  },

  googleSignup: (req, res) => {
    userHelper
      .googleUserSignUp(req.body)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch(() => {
        res.status(400).json({ message: "User Already exist" });
      });
  },

  googleLogin: (req, res) => {
    userHelper
      .googleUserLogin(req.body)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch(() => {
        res.status(404).json({ message: "User not found" });
      });
  },

  resetPassword: asyncHandler((req, res) => {
    userHelper.UserExistCheck(req.body.email).then(async (user) => {
      if (user) {
        let { option, otp, transporter } = await resetPasswordMailOTP(
          req.body.email
        );
        transporter.sendMail(option, async (error, info) => {
          if (error) {
            res.status(500).json({ message: "Unable to send OTP" });
          } else {
            userHelper.setOtpToResetPass(otp, user._id).then(() => {
              res.status(200).json(user.email);
            });
          }
        });
      } else {
        res.status(404).json({ message: "User doesn't exist" });
      }
    });
  }),

  resetPasswordAuth: (req, res) => {
    userHelper
      .resetPasswordAuthenticate(req.body)
      .then(() => {
        res.status(200).json({ mesage: "OTP Verified" });
      })
      .catch(() => {
        res.status(400).json({ message: "Invalid OTP" });
      });
  },

  changePassword:(req, res)=> {
    userHelper.changePassword(req.body)
  }
};
