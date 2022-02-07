import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChangePassword from "./screens/User/changePassword/ChangePassword";
import ForgotPassword from "./screens/User/ForgotPassword/ForgotPassword";
import RentalInputPage from "./screens/User/RentalInputPage/RentalInputPage";
import ResetPasswordVerification from "./screens/User/ResetPasswordVerification/ResetPasswordVerification";
import SignInPage from "./screens/User/SignInPage/SignInPage";
import SignUpPage from "./screens/User/SignUpPage/SignUpPage";
import UserLandingPage from "./screens/User/UserLandingPage/UserLandingPage";
import VerifyAccount from "./screens/User/VerifyAccount/VerifyAccount";
import VendorLandingPage from "./screens/Vendor/VendorLandingPage/VendorLandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verifyAccount" element={<VerifyAccount />} />
        <Route path="/userRentalInput" element={<RentalInputPage />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPasswordVerification" element={<ResetPasswordVerification />}/>
        <Route path="/changePassword" element={<ChangePassword />} />

        <Route path="/vendor" element={<VendorLandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
