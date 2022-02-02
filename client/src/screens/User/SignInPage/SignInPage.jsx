import React from 'react';
import SignInForm from '../../../components/SignInForm/SignInForm';
import UserVendorFooter from '../../../components/UserVendorFooter/UserVendorFooter';
import UserVendorHeader from '../../../components/UserVendorHeader/UserVendorHeader';


const SignInPage = () => {

    return (
      <div>
        <UserVendorHeader />
        <SignInForm />
        <UserVendorFooter />
      </div>
    );

};

export default SignInPage;
