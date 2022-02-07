const express = require('express');
const router = express.Router();
const { registerUser, verifyUser, userLogin, resendUserOtp, googleSignup, googleLogin, resetPassword, resetPasswordAuth, changePassword } = require("../controller/userController");

router.post('/signup', registerUser);
router.post('/verifyUser', verifyUser);
router.post('/login', userLogin);
router.post("/resendOtp", resendUserOtp);
router.post("/googleSignup", googleSignup);
router.post("/googleLogin", googleLogin);
router.post("/resetPassword", resetPassword); ;
router.post("/resetPasswordAuth", resetPasswordAuth);
router.post("/changePassword", changePassword);




module.exports = router;