import React from 'react';
import ChangePasswordPage from '../../../components/changePasswordPage/ChangePasswordPage';
import UserVendorFooter from '../../../components/UserVendorFooter/UserVendorFooter';
import UserVendorHeader from '../../../components/UserVendorHeader/UserVendorHeader';

const ChangePassword = () => {
    return (
      <div>
        <UserVendorHeader />
        <ChangePasswordPage />
        <UserVendorFooter />
      </div>
    );
};

export default ChangePassword;
