import React from 'react';
import SignUpForm from '../../../components/SignUpForm/SignUpForm';
import UserVendorFooter from '../../../components/UserVendorFooter/UserVendorFooter';
import UserVendorHeader from '../../../components/UserVendorHeader/UserVendorHeader';


const SignUpPage = () => {
    return (
      <div>
        <UserVendorHeader />
        <SignUpForm />
        <UserVendorFooter />
      </div>
    );
};

export default SignUpPage;
