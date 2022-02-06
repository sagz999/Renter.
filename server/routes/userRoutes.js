const express = require('express');
const router = express.Router();
const { registerUser, verifyUser, userLogin, resendUserOtp, googleSignup, googleLogin } = require("../controller/userController");

router.post('/signup', registerUser);
router.post('/verifyUser', verifyUser);
router.post('/login', userLogin);
router.post("/resendOtp", resendUserOtp);
router.post("/googleSignup", googleSignup);
router.post("/googleLogin", googleLogin);



module.exports = router;