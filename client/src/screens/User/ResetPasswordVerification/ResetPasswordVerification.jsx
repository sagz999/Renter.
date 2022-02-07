import React from "react";
import ResetPasswordVerificationPage from "../../../components/ResetPasswordVerificationPage/ResetPasswordVerificationPage";
import UserVendorFooter from "../../../components/UserVendorFooter/UserVendorFooter";
import UserVendorHeader from "../../../components/UserVendorHeader/UserVendorHeader";

const ResetPasswordVerification = () => {
  return (
    <div>
      <UserVendorHeader />
      <ResetPasswordVerificationPage />
      <UserVendorFooter />
    </div>
  );
};

export default ResetPasswordVerification;
