const asyncHandler = require("express-async-handler");
const userHelper = require("../helpers/userHelper");
const bcrypt = require("bcryptjs");
var userData;
const mailOTP = require('../utils/nodeMailer');


module.exports = {
  registerUser: asyncHandler(async (req, res) => {
    var userExist = await userHelper.duplicateUserCheck(req.body.email);

    if (userExist) {
      res.status(400);
      throw new Error("User already exists");
      
    } else {

      // userHelper.registerUser(req.body).then(() => {
      //   res.status(201);
      //   res.json({
      //     message: "inserted new user",
      //   });
      // });

      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
      userData = req.body;
      // console.log(userData)
      mailOTP(userData.email);

      

    }
  }),
};
