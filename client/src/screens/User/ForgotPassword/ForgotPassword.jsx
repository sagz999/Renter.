import React from 'react';
import UserVendorFooter from "../../../components/UserVendorFooter/UserVendorFooter";
import UserVendorHeader from "../../../components/UserVendorHeader/UserVendorHeader";
import ForgotPasswordPage from "../../../components/ForgotPassword/ForgotPasswordPage";


const ForgotPassword = () => {
    return (
      <div>
        <UserVendorHeader />
        <ForgotPasswordPage />
        <UserVendorFooter />
      </div>
    );
};

export default ForgotPassword;
